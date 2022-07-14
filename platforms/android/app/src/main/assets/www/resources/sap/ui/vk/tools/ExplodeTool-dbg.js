/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

        (c) Copyright 2009-2015 SAP SE. All rights reserved
    
 */

// Provides control sap.ui.vk.tools.ExplodeTool
sap.ui.define([
	"./Tool",
	"./ExplodeAxis",
	"./ExplodeDirection",
	"./ExplodeItemGroup",
	"./ExplodeType",
	"./ExplodeToolHandler",
	"./ExplodeToolGizmo",
	"../AnimationPlayback",
	"../AnimationTrackType",
	"../AnimationTrackValueType",
	"sap/ui/base/ManagedObjectObserver"
], function(
	Tool,
	ExplodeAxis,
	ExplodeDirection,
	ExplodeItemGroup,
	ExplodeType,
	ExplodeToolHandler,
	ExplodeToolGizmo,
	AnimationPlayback,
	AnimationTrackType,
	AnimationTrackValueType,
	ManagedObjectObserver
) {
	"use strict";

	/**
	 * Constructor for a new ExplodeTool.
	 *
	 * @class
	 * Tool used to move objects in 3D space

	 * @param {string} [sId] ID of the new tool instance. <code>sId</code>is generated automatically if no non-empty ID is given.
	 *                       Note: this can be omitted, regardless of whether <code>mSettings</code> will be provided or not.
	 * @param {object} [mSettings] An optional map/JSON object with initial property values, aggregated objects etc. for the new tool instance.
	 * @public
	 * @author SAP SE
	 * @version 1.93.2
	 * @extends sap.ui.vk.tools.Tool
	 * @alias sap.ui.vk.tools.ExplodeTool
	 */
	var ExplodeTool = Tool.extend("sap.ui.vk.tools.ExplodeTool", /** @lends sap.ui.vk.tools.ExplodeTool.prototype */ {
		metadata: {
			properties: {
				// it is expected that type, axis and direction properties cannot be set
				// after user drags the gizmo and/or application sets a non-zero maginitude value
				type: { type: "sap.ui.vk.tools.ExplodeType", defaultValue: ExplodeType.Linear },
				axis: { type: "sap.ui.vk.tools.ExplodeAxis" },
				direction: { type: "sap.ui.vk.tools.ExplodeDirection" },

				magnitude: { type: "float", defaultValue: 0.0 },

				// anchor transformation matrix
				anchor: { type: "float[]", defaultValue: [ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ] }
			},
			aggregations: {
				items: { type: "sap.ui.vk.tools.ExplodeItemGroup", multiple: true }
			},
			associations: {
				selectedItem: { type: "sap.ui.vk.tools.ExplodeItemGroup", multiple: false }
			},
			events: {
				magnitudeChanging: {
					parameters: {
						type: { type: "sap.ui.vk.tools.ExplodeType" },
						axis: { type: "sap.ui.vk.tools.ExplodeAxis" },
						direction: { type: "sap.ui.vk.tools.ExplodeDirection" },
						magnitude: { type: "float" }
					}
				},
				magnitudeChanged: {
					parameters: {
						type: { type: "sap.ui.vk.tools.ExplodeType" },
						axis: { type: "sap.ui.vk.tools.ExplodeAxis" },
						direction: { type: "sap.ui.vk.tools.ExplodeDirection" },
						magnitude: { type: "float" }
					}
				},
				itemSequenceChangePressed: {
					parameters: {
						item: { type: "sap.ui.vk.tools.ExplodeItemGroup" },
						moveUp: { type: "boolean" }
					}
				},
				itemPositionAdjusting: {
					parameters: {
						item: { type: "sap.ui.vk.tools.ExplodeItemGroup" },
						magnitudeAdjustmentMultiplier: { type: "float" }
					}
				},
				itemPositionAdjusted: {
					parameters: {
						item: { type: "sap.ui.vk.tools.ExplodeItemGroup" },
						magnitudeAdjustmentMultiplier: { type: "float" }
					}
				}
			}
		},

		constructor: function(sId, mSettings) {
			Tool.apply(this, arguments);

			// Configure dependencies
			this._viewport = null;
			this._handler = new ExplodeToolHandler(this);
			this._gizmo = null;
		}
	});

	ExplodeTool.prototype.init = function() {
		if (Tool.prototype.init) {
			Tool.prototype.init.call(this);
		}

		// set footprint for tool
		this.setFootprint([ "sap.ui.vk.threejs.Viewport" ]);

		this.setAggregation("gizmo", new ExplodeToolGizmo());

		this._groupObserver = new ManagedObjectObserver(this._onGroupChanged.bind(this));
		this._groupsObserver = new ManagedObjectObserver(this._onGroupsChanged.bind(this));
		this._groupsObserver.observe(this, { aggregations: [ "items" ] });
	};

	ExplodeTool.prototype.destroy = function() {
		ExplodeTool._cleanAssociatedLoaders();
		this._groupsObserver.disconnect();
		this._groupsObserver = null;
		this._groupObserver.disconnect();
		this._groupObserver = null;
	};

	// Override the active property setter so that we execute activation / deactivation code at the same time
	ExplodeTool.prototype.setActive = function(value, activeViewport, gizmoContainer) {
		Tool.prototype.setActive.call(this, value, activeViewport, gizmoContainer);

		if (this._viewport) {
			if (value) {
				this._gizmo = this.getGizmo();
				this._gizmo.show(this._viewport, this);

				this._addLocoHandler();
			} else {
				this._removeLocoHandler();

				if (this._gizmo) {
					this._gizmo.hide();
					this._gizmo = null;
				}
			}
		}

		return this;
	};

	/** MOVE TO BASE
	 * Queues a command for execution during the rendering cycle. All gesture operations should be called using this method.
	 *
	 * @param {function} command The command to be executed.
	 * @returns {sap.ui.vk.tools.ExplodeTool} <code>this</code> to allow method chaining.
	 * @public
	 */
	ExplodeTool.prototype.queueCommand = function(command) {
		if (this._addLocoHandler()) {
			if (this.isViewportType("sap.ui.vk.threejs.Viewport")) {
				command();
			}
		}
		return this;
	};

	ExplodeTool.prototype.setAxis = function(value) {
		this.setProperty("axis", value, true);
		if (this._gizmo) {
			this._gizmo._updateAxis();
		}
	};

	ExplodeTool.prototype.setDirection = function(value) {
		this.setProperty("direction", value, true);
		if (this._gizmo) {
			this._gizmo._updateAxis();
		}
	};

	ExplodeTool.prototype.setAnchor = function(value) {
		this.setProperty("anchor", value, true);
		if (this._gizmo) {
			this._gizmo._updateAxis();
		}
	};

	ExplodeTool.prototype.pickAnchorFromNodesList = function(nodeRefs) {
		if (!Array.isArray(nodeRefs)){
			nodeRefs = [ nodeRefs ];
		}

		var getBoxSize = function(nodeRef){
			var boundingBox = new THREE.Box3();
			nodeRef._expandBoundingBox(boundingBox, false, true, true);
			return boundingBox.getSize(new THREE.Vector3()).manhattanLength();
		};

		var target = nodeRefs.reduce(function(maxNode, nodeRef){
			var size = getBoxSize(nodeRef);
			if (size > getBoxSize(maxNode)){
				maxNode = nodeRef;
			}
			return maxNode;
		});

		this.setAnchor(target.matrixWorld.elements.slice());
	};

	ExplodeTool.prototype.setMagnitude = function(value) {
		this.setProperty("magnitude", value, true);
		if (this._gizmo) {
			this._gizmo._setMagnitude(value);
		}
	};

	ExplodeTool.prototype.setSelectedItem = function(value) {
		this.setAssociation("selectedItem", value);
		if (this._gizmo) {
			this._gizmo._handleSelectedItemChanged();
		}
	};

	ExplodeTool.prototype._onGroupsChanged = function(event) {
		// console.log("_onGroupsChanged", event.object, event.child);
		this._groupObserver.disconnect();
		this.getItems().forEach(function(item) {
			this._groupObserver.observe(item, { aggregations: [ "items" ] });
		}.bind(this));

		if (this._gizmo) {
			this._gizmo._handleGroupsChanged(event);
		}
	};

	ExplodeTool.prototype._onGroupChanged = function(event) {
		// console.log("_onGroupChanged", event.object, event.child);
		if (this._gizmo) {
			this._gizmo._handleGroupsChanged(event);
		}
	};

	ExplodeTool.prototype.reset = function() {
	};

	ExplodeTool.prototype._activateView = function(index) {
		var scene = this._viewport.getScene();
		var vsm = scene.getViewStateManager();
		var view = scene.getViews()[index];
		vsm.activateView(view);
		var animationPlayer = this._viewport._viewStateManager.getAnimationPlayer();
		if (animationPlayer) {
			setTimeout(function() { animationPlayer.play(); }, 100);
		}
	};


	ExplodeTool.prototype._createView = function(currentView, name, json, originalMap, offsetMap) {
		var scene = this._viewport.getScene();
		var vsm = scene.getViewStateManager();
		var view = scene.createView({ name: name });
		var targetInfos = [];
		if (currentView) {
			var infos = currentView.getNodeInfos();
			infos.forEach(function(info) {
				var nodeInfo = {
					target: info.target,
					transform: info.transform ? info.transform.slice() : null,
					meshId: info.meshId,
					materialId: info.materialId,
					visible: info.visible,
					opacity: info.opacity
				};
				targetInfos.push(nodeInfo);
			});
		} else {
			var hierarchy = vsm.getNodeHierarchy();
			var enumerateR = function(node) {
				if (node.visible) {
					targetInfos.push({
						target: node,
						visible: node.visible
					});
				}
				hierarchy.enumerateChildren(node, enumerateR, false, true);
			};
			hierarchy.enumerateChildren(null, enumerateR, false, true);
		}
		view.setNodeInfos(targetInfos);

		var viewdata = { name: name, nodes: [] };
		if (currentView) {
			viewdata.sourceId = currentView.getId();
			var animationPlayer = this._viewport._viewStateManager.getAnimationPlayer();
			if (animationPlayer) {
				viewdata.time = animationPlayer.getTime();
			}
		}
		targetInfos = [];
		this._gizmo._nodes.forEach(function(node) {
			var nodeRef = node.node;
			var te = nodeRef.matrix.elements;
			var offset = [ node.local.x, node.local.y, node.local.z ];
			if (offsetMap) {
				var nodeOffset = offsetMap.get(node.node);
				if (nodeOffset != null) {
					offset = nodeOffset;
				}
			}
			var transform = [ te[0], te[4], te[8], offset[0], te[1], te[5], te[9], offset[1], te[2], te[6], te[10], offset[2] ];
			viewdata.nodes.push({
				sid: scene.nodeRefToPersistentId(nodeRef),
				transform: transform
			});
			targetInfos.push({
				target: nodeRef,
				transform: transform
			});
		});
		view.updateNodeInfos(targetInfos);

		if (json) {
			json.views.push(viewdata);
		}
		return view;
	};


	// False: target is before current
	// True: target is after current
	ExplodeTool.prototype._compareGroup = function(target, current) {
		var items = this.getItems();
		for (var i = 0; i < items.length; i++) {
			var group = items[i];
			if (group == target) {
				return false;
			} else if (group == current) {
				return true;
			}
		}
	};

	/**
	* Generates JSON describing the current state of explosion suitable for passing to the Storage Service
	* @param {any} options options for JSON generation
	* @param {string} options.viewPrefix name prefix for generated view(s)
	* @param {any} options.animation animation options
	* @param {boolean} options.animation.enabled generate animation data
	* @param {boolean} options.animation.separateAnimations generate separate animation for each explosion group
	* @param {boolean} options.animation.separateViews generate a view for each animation sequence
	*                  When animation.separateViews option set, view definition will have a single playback for a particular
	*                  explosion group.
	*                  The view definition should also contain initial positions for all nodes included in previous groups.
	* @returns {any} JSON data for view and animation creation
	*/
	ExplodeTool.prototype.generateRequestData = function(options) {
		var prefix = options ? options.viewPrefix : null;
		if (!prefix) {
			prefix = "";
		}
		var request = { views: [] };
		var duration = 1.0;
		var scene = this._viewport.getScene();
		var currentView = this._viewport.getCurrentView();
		var nodeOriginals = new Map();
		var nodePositions = new Map();

		if (options && options.animation && options.animation.enabled) {
			// Record node end positions
			this.getItems().forEach(function(group) {
				group.getItems().forEach(function(nodeProxy) {
					var nodeRef = nodeProxy.getNodeRef();
					var te = nodeRef.matrix.elements;
					var position = { x: te[12], y: te[13], z: te[14] };
					nodePositions.set(nodeRef.uuid, position);
				});
			});

			// Restore node transforms for track initial positions
			this._gizmo._nodes.forEach(function(node) {
				var nodeRef = node.node;
				nodeRef.matrix.elements[12] = node.local.x;
				nodeRef.matrix.elements[13] = node.local.y;
				nodeRef.matrix.elements[14] = node.local.z;
				nodeRef.position.setFromMatrixPosition(nodeRef.matrix);
				nodeRef.updateMatrixWorld(true);
				nodeOriginals.set(nodeRef, [ node.local.x, node.local.y, node.local.z ]);
			});
		}

		var view = this._createView(currentView, prefix + "Explode View", request, nodeOriginals);
		var jsonView = request.views[request.views.length - 1];

		if (options && options.animation && options.animation.enabled) {
			// Animated
			var groupId = 1;
			var offsetMap = new Map();
			var sequence = null;
			request.tracks = [];
			request.sequences = [];
			var seqNodes = [];

			this.getItems().forEach(function(group) {
				jsonView = request.views[request.views.length - 1];
				if (options.animation.separateAnimations || options.animation.separateViews || groupId == 1) {
					// Separate animations/views per group
					sequence = scene.createSequence(view.getId() + "_seq" + groupId, { name: "Explode " + groupId, duration: duration });
					var playback = new AnimationPlayback({
						sequence: sequence
					});
					if (seqNodes.length > 0) {
						request.sequences.push({ nodes: seqNodes });
						seqNodes = [];
					}
					view.addPlayback(playback);
					view.resetPlaybacksStartTimes();
					if (!jsonView.playbacks) {
						jsonView.playbacks = [];
					}
					jsonView.playbacks.push({ start: 0, sequence: request.sequences.length });
				}
				var track = scene.createTrack(null, {
					trackValueType: AnimationTrackValueType.Vector3,
					isAbsoluteValue: false
				});
				this._gizmo._nodes.forEach(function(node) {
					if (node.group == group) {
						var final = nodePositions.get(node.node.uuid);
						if (track.getKeysCount() == 0) {
							var offset = [ final.x - node.local.x, final.y - node.local.y, final.z - node.local.z ];
							track.insertKey(0, [ 0, 0, 0 ]);
							track.insertKey(duration, offset);
							request.tracks.push({
								time: [ 0, duration ],
								vector3: [ 0, 0, 0, offset[0], offset[1], offset[2] ]
							});
						}
						sequence.setNodeAnimation(node.node, AnimationTrackType.Translate, track);
						seqNodes.push({
							sid: scene.nodeRefToPersistentId(node.node),
							rtranslate: {
								track: request.tracks.length - 1
							}
						});
						offsetMap.set(node.node, [ final.x, final.y, final.z ]);
					}
				});

				groupId++;
				// Generate a new view per sequence
				if (options.animation.separateViews && groupId <= this.getItems().length) {
					view = this._createView(currentView, prefix + "Explode View " + groupId, request, nodeOriginals, offsetMap);
				}
			}.bind(this));
			if (seqNodes.length > 0) {
				request.sequences.push({ nodes: seqNodes });
			}
		} else {
			// Static view
			var nodeInfos = [];
			jsonView.nodes = [];
			this.getItems().forEach(function(group) {
				group.getItems().forEach(function(nodeProxy) {
					var nodeRef = nodeProxy.getNodeRef();
					var te = nodeRef.matrix.elements;
					var transform = [ te[0], te[4], te[8], te[12], te[1], te[5], te[9], te[13], te[2], te[6], te[10], te[14] ];
					nodeInfos.push({
						target: nodeRef,
						transform: transform
					});
					jsonView.nodes.push({
						sid: scene.nodeRefToPersistentId(nodeRef),
						transform: transform
					});
				});
			});
			view.updateNodeInfos(nodeInfos);
		}

		return request;
	};

	return ExplodeTool;
});
