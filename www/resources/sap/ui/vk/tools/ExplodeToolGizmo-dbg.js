/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

        (c) Copyright 2009-2015 SAP SE. All rights reserved
    
 */

// Provides control sap.ui.vk.tools.ExplodeToolGizmo
sap.ui.define([
	"../getResourceBundle",
	"../thirdparty/three",
	"./Gizmo",
	"./AxisColours",
	"./ExplodeAxis",
	"./ExplodeDirection",
	"../AnimationTrackType",
	"sap/base/assert",
	"sap/base/Log"
], function(
	getResourceBundle,
	threejs,
	Gizmo,
	AxisColours,
	ExplodeAxis,
	ExplodeDirection,
	AnimationTrackType,
	assert,
	Log
) {
	"use strict";

	/**
	 * Constructor for a new ExplodeToolGizmo.
	 *
	 * @param {string} [sId] ID for the new control, generated automatically if no ID is given
	 * @param {object} [mSettings] Initial settings for the new control
	 *
	 * @class
	 * Provides handles for move objects tool
	 * @extends sap.ui.vk.tools.Gizmo
	 *
	 * @author SAP SE
	 * @version 1.93.2
	 *
	 * @constructor
	 * @private
	 * @alias sap.ui.vk.tools.ExplodeToolGizmo
	 * @ui5-metamodel This control/element also will be described in the UI5 (legacy) designtime metamodel
	 */
	var ExplodeToolGizmo = Gizmo.extend("sap.ui.vk.tools.ExplodeToolGizmo", /** @lends sap.ui.vk.tools.ExplodeToolGizmo.prototype */ {
		metadata: {
			library: "sap.ui.vk"
		}
	});

	var GIZMO_SIZE = 96;
	var TOUCH_RADIUS = 48;
	var HANDLES = {
		PositiveX: 0,
		PositiveY: 1,
		PositiveZ: 2,
		NegativeX: 3,
		NegativeY: 4,
		NegativeZ: 5,
		ResetAdjustment: 6,
		AdjustUp: 7,
		AdjustDown: 8,
		MoveUp: 9,
		MoveDown: 10
	};
	ExplodeToolGizmo.prototype.init = function() {
		if (Gizmo.prototype.init) {
			Gizmo.prototype.init.apply(this);
		}

		this._createEditingForm(getResourceBundle().getText("TOOL_UNITS_MM"), 84);
		this._moveDelta = new THREE.Vector3();
		this._axisDirection = new THREE.Vector3();
		this._axisColor = 0;
		this._magnitude = 0;

		this._viewport = null;
		this._tool = null;
		this._groups = [];
		this._nodes = [];
		this._groupsMap = new Map();
		this._sceneGizmo = new THREE.Scene();

		var ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.5);
		ambientLight.layers.enableAll();
		this._sceneGizmo.add(ambientLight);

		var directionalLight = new THREE.DirectionalLight(0xFFFFFF, 0.5);
		directionalLight.position.set(1, 3, 2);
		directionalLight.layers.enableAll();
		this._sceneGizmo.add(directionalLight);

		this._gizmo = new THREE.Group();
		this._touchAreas = new THREE.Group();
		this._touchAreas2 = new THREE.Group();
		this._sceneGizmo.add(this._gizmo);
		// this._sceneGizmo.add(this._touchAreas);
		// this._sceneGizmo.add(this._touchAreas2);
		this._matViewProj = new THREE.Matrix4();

		var touchMaterial = new THREE.MeshLambertMaterial({ color: 0x0080FF, transparent: true, opacity: 0.2 });

		function createGizmoArrow(arrowLength, dir, color, touchAreas) {
			var lineRadius = 1,
				coneRadius = 4,
				coneHeight = 24;

			var material = new THREE.MeshLambertMaterial({ color: color });
			var lineGeometry = new THREE.CylinderBufferGeometry(lineRadius, lineRadius, arrowLength - coneHeight, 4);
			var d1 = new THREE.Vector3(dir.y, dir.z, dir.x);
			var d2 = new THREE.Vector3(dir.z, dir.x, dir.y);
			var m = dir.x < 0 || dir.y < 0 || dir.z < 0 ? new THREE.Matrix4().makeBasis(d2, dir, d1) : new THREE.Matrix4().makeBasis(d1, dir, d2);
			m.setPosition(dir.clone().multiplyScalar((arrowLength - coneHeight) * 0.5));
			lineGeometry.applyMatrix4(m);
			var line = new THREE.Mesh(lineGeometry, material);
			line.matrixAutoUpdate = false;
			line.userData.color = color;

			var coneGeometry = new THREE.CylinderBufferGeometry(0, coneRadius, coneHeight, 12, 1);
			m.setPosition(dir.clone().multiplyScalar(arrowLength - coneHeight * 0.5));
			coneGeometry.applyMatrix4(m);
			var cone = new THREE.Mesh(coneGeometry, material);
			cone.matrixAutoUpdate = false;
			line.add(cone);

			if (touchAreas) {
				var touchGeometry = new THREE.CylinderGeometry(TOUCH_RADIUS * 0.5, TOUCH_RADIUS * 0.5, arrowLength - TOUCH_RADIUS + coneHeight * 0.5, 12, 1);
				m.setPosition(dir.clone().multiplyScalar(TOUCH_RADIUS + touchGeometry.parameters.height * 0.5));
				touchGeometry.applyMatrix4(m);
				var touchGeometry2 = new THREE.CylinderGeometry(TOUCH_RADIUS * 0.5, 0, TOUCH_RADIUS, 12, 1);
				m.setPosition(dir.clone().multiplyScalar(TOUCH_RADIUS * 0.5));
				touchGeometry.merge(touchGeometry2, m);
				touchAreas.add(new THREE.Mesh(touchGeometry, touchMaterial));
			}

			return line;
		}

		// create 3 arrows
		this._gizmo.add(createGizmoArrow(GIZMO_SIZE, new THREE.Vector3(1, 0, 0), AxisColours.x, this._touchAreas));
		this._gizmo.add(createGizmoArrow(GIZMO_SIZE, new THREE.Vector3(0, 1, 0), AxisColours.y, this._touchAreas));
		this._gizmo.add(createGizmoArrow(GIZMO_SIZE, new THREE.Vector3(0, 0, 1), AxisColours.z, this._touchAreas));
		this._gizmo.add(createGizmoArrow(GIZMO_SIZE, new THREE.Vector3(-1, 0, 0), AxisColours.x, this._touchAreas));
		this._gizmo.add(createGizmoArrow(GIZMO_SIZE, new THREE.Vector3(0, -1, 0), AxisColours.y, this._touchAreas));
		this._gizmo.add(createGizmoArrow(GIZMO_SIZE, new THREE.Vector3(0, 0, -1), AxisColours.z, this._touchAreas));

		this._axisTitles = this._createAxisTitles(undefined, undefined, false, true);
		this._sceneGizmo.add(this._axisTitles);

		var d = 32;
		var d2 = d * 1.75;
		this._groupGizmo = new THREE.Group();
		this._sceneGizmo.add(this._groupGizmo);
		var sphere = new THREE.Mesh(
			new THREE.IcosahedronBufferGeometry(8, 1),
			new THREE.MeshLambertMaterial()
		);
		this._groupGizmo.add(sphere); // ResetAdjustment
		this._groupGizmo.add(createGizmoArrow(d * 1.5, new THREE.Vector3(0, 1, 0), 0xFFFFFF)); // AdjustUp
		this._groupGizmo.add(createGizmoArrow(d * 1.5, new THREE.Vector3(0, -1, 0), 0xFFFFFF)); // AdjustDown

		var dconeHeight = 16;
		var doubleCone = new THREE.CylinderGeometry(0, 6, dconeHeight, 16).applyMatrix4(new THREE.Matrix4().setPosition(0, d2 + dconeHeight * 0.5, 0));
		doubleCone.merge(new THREE.CylinderGeometry(0, 6, dconeHeight, 16), new THREE.Matrix4().setPosition(0, d2 + dconeHeight * 1.5, 0));

		this._groupGizmo.add(new THREE.Mesh(new THREE.BufferGeometry().fromGeometry(doubleCone), new THREE.MeshLambertMaterial()));
		this._groupGizmo.add(new THREE.Mesh(new THREE.BufferGeometry().fromGeometry(doubleCone.rotateX(Math.PI)), new THREE.MeshLambertMaterial()));

		this._groupGizmo.add(new THREE.Mesh(
			new THREE.CylinderGeometry(16, 16, d * 6, 12, 1),
			new THREE.MeshBasicMaterial({ color: 0xFFFFFF, transparent: true, opacity: 0.5, side: THREE.BackSide })
		)); // background

		function addTouchCylinder(a, b, touchAreas) {
			// var touchGeometry = new THREE.CylinderGeometry(TOUCH_RADIUS * 0.5, TOUCH_RADIUS * 0.5, b - a, 12, 1);
			var touchGeometry = new THREE.IcosahedronGeometry(TOUCH_RADIUS * 0.5, 1);
			touchGeometry.applyMatrix4(new THREE.Matrix4().setPosition(0, (a + b) * 0.5, 0));
			touchAreas.add(new THREE.Mesh(touchGeometry, touchMaterial));
		}
		addTouchCylinder(d * -0.5, d * 0.5, this._touchAreas2); // ResetAdjustment
		addTouchCylinder(d * 0.5, d * 1.5, this._touchAreas2); // AdjustUp
		addTouchCylinder(d * -1.5, d * -0.5, this._touchAreas2); // AdjustDown
		addTouchCylinder(d2, d2 + d, this._touchAreas2); // MoveUp
		addTouchCylinder(-d2 - d, -d2, this._touchAreas2); // MoveDown

		function enableAllLayer(obj) {
			obj.traverse(function(child) {
				child.layers.enableAll();
			});
		}
		function updateLayers(obj) {
			obj.children.forEach(function(child, index) {
				child.traverse(function(node) {
					node.layers.enable(Math.min(index, 6) + 1);
				});
			});
		}
		updateLayers(this._gizmo);
		updateLayers(this._axisTitles);
		updateLayers(this._touchAreas);
		enableAllLayer(this._groupGizmo);
		enableAllLayer(this._touchAreas2);
	};

	ExplodeToolGizmo.prototype.hasDomElement = function() {
		return false;
	};

	ExplodeToolGizmo.prototype.show = function(viewport, tool) {
		this._viewport = viewport;
		this._tool = tool;
		this._nodes.length = 0;
		// this._updateSelection(viewport._viewStateManager);
		// var nodesProperties = this._getNodesProperties();
		// this._tool.fireEvent("moving", { x: 0, y: 0, z: 0, nodesProperties: nodesProperties }, true);
		this._handleGroupsChanged();
	};

	ExplodeToolGizmo.prototype.hide = function() {
		this._cleanTempData();

		this._viewport = null;
		this._tool = null;
		this._updateEditingForm(false);
	};

	ExplodeToolGizmo.prototype.getGizmoCount = function() {
		if (!this._groups.length) {
			return 0;
		}
		return this._getActiveAxisIndex() >= 0 && this._getSelectedItem() ? 2 : 1;
	};

	ExplodeToolGizmo.prototype.getTouchObject = function(i) {
		if (i === 0) {
			this._updateGizmoObjectTransformation(this._touchAreas);
			return this._touchAreas;
		} else {
			this._updateGroupGizmoTransformation(this._touchAreas2);
			return this._touchAreas2;
		}
	};

	ExplodeToolGizmo.prototype._handleGroupsChanged = function(event) {
		// var vsm = this._viewport._viewStateManager;

		this._setMagnitude(0);

		// var selected = new Set();
		var groupsMap = this._groupsMap;
		groupsMap.clear();

		this._groups = this._tool.getItems().slice();
		var nodes = this._nodes = [];
		this._groups.forEach(function(group) {
			var items = group.getItems();
			for (var i = 0; i < items.length; i++) {
				var node = items[ i ].getNodeRef();
				// selected.add(node);
				groupsMap.set(node, group);
				nodes.push({
					node: node,
					group: group,
					local: new THREE.Vector3().setFromMatrixPosition(node.matrix),
					origin: new THREE.Vector3().setFromMatrixPosition(node.matrixWorld),
					matParentInv: node.parent ? new THREE.Matrix4().getInverse(node.parent.matrixWorld) : new THREE.Matrix4()
				});
			}
		});

		// var unselected = [];
		// vsm.enumerateSelection(function(node) {
		// 	if (!selected.has(node)) {
		// 		unselected.push(node);
		// 	}
		// });

		// vsm.setSelectionStates(Array.from(selected), unselected, false);

		this._calculateGroupOffsets();
		this._setMagnitude(this._tool.getMagnitude());
	};

	ExplodeToolGizmo.prototype._getSelectedItem = function() {
		return sap.ui.getCore().byId(this._tool.getSelectedItem());
	};

	ExplodeToolGizmo.prototype._handleSelectedItemChanged = function() {
		var vsm = this._viewport._viewStateManager;

		var outlined = new Set();
		var selectedItem = this._getSelectedItem(); // get control for associated control
		if (selectedItem) {
			selectedItem.getItems().forEach(function(item) {
				outlined.add(item.getNodeRef());
			});
		}

		var unoutlined = [];
		vsm.enumerateOutlinedNodes(function(node) {
			if (!outlined.has(node)) {
				unoutlined.push(node);
			}
		});

		vsm.setOutliningStates(Array.from(outlined), unoutlined, false);
	};

	ExplodeToolGizmo.prototype.highlightHandle = function(index, hoverMode) {
		this._handleIndex = index;

		this._gizmo.children.forEach(function(arrow, i) {
			var highlight = index === i;
			var color = highlight ? 0xFFFF00 : arrow.userData.color;
			arrow.material.color.setHex(color);
			this._axisTitles.children[ i ].material.color.setHex(color);
		}.bind(this));

		for (var i = 0; i < 5; i++) {
			this._groupGizmo.children[i].material.color.setHex(i + 6 === index ? 0xFFFF00 : this._axisColor);
		}
	};

	ExplodeToolGizmo.prototype._calculateGroupOffsets = function() {
		var dir = new THREE.Vector3(Math.abs(this._axisDirection.x), Math.abs(this._axisDirection.y), Math.abs(this._axisDirection.z));
		var size = new THREE.Vector3();
		var length = 0, totalLength = 0;
		this._groups.forEach(function(group, index) {
			var bbox = group.getBoundingBox();
			bbox.getCenter(group._center);
			bbox.getSize(size);
			length = dir.dot(size);
			if (index > 0) {
				totalLength += length * 0.5;
			}
			group._offset = totalLength;
			group._deltaOffset = length * 0.5;
			totalLength += length * 0.5;
			// console.log(index, group.sId, length);
		});
		totalLength += length * 0.5;

		var offsetScale = totalLength > 0 ? 1 / totalLength : 1;
		this._groups.forEach(function(group) {
			group._offset = 1 - group._offset * offsetScale;
			group._deltaOffset *= offsetScale;
		});
	};

	ExplodeToolGizmo.prototype._getActiveAxisIndex = function() {
		var axis = this._tool.getAxis();
		var direction = this._tool.getDirection();
		var index = axis && direction ? [ ExplodeAxis.X, ExplodeAxis.Y, ExplodeAxis.Z ].indexOf(axis) : -1;
		if (index >= 0 && direction === ExplodeDirection.Negative) {
			index += 3;
		}
		return index;
	};

	ExplodeToolGizmo.prototype._updateAxis = function() {
		var index = this._getActiveAxisIndex();
		if (index >= 0) {
			this._updateGizmoObjectTransformation(this._gizmo);
			this._axisDirection.setFromMatrixColumn(this._gizmo.matrixWorld, index % 3).normalize().multiplyScalar(index < 3 ? 1 : -1);
			this._axisColor = this._gizmo.children[index].userData.color;
			for (var i = 0; i < 5; i++) {
				this._groupGizmo.children[ i ].material.color.setHex(this._axisColor);
			}

			this._setMagnitude(0);
			this._calculateGroupOffsets();
			this._setMagnitude(this._tool.getMagnitude());

			this._viewport.setShouldRenderFrame();
		}
	};

	ExplodeToolGizmo.prototype._moveSelectedGroup = function(delta) {
		var selectedItem = this._getSelectedItem();
		var items = this._tool.getItems();
		var index = items.indexOf(selectedItem);
		if (index >= 0 && index + delta >= 0 && index + delta < items.length) {
			this._tool.removeItem(selectedItem);
			this._tool.insertItem(selectedItem, index + delta);
		}
	};

	ExplodeToolGizmo.prototype._setMagnitudeAdjustmentMultiplier = function(value) {
		var selectedItem = this._getSelectedItem();
		if (selectedItem) {
			selectedItem.setMagnitudeAdjustmentMultiplier(value);
			this._updatePositions();
		}
	};

	ExplodeToolGizmo.prototype._beginGesture = function() {
		this._moveDelta.setScalar(0);
		this._beginMagnitude = this._magnitude;

		switch (this._handleIndex) {
			case HANDLES.ResetAdjustment:
				this._setMagnitudeAdjustmentMultiplier(0);
				break;
			case HANDLES.AdjustUp:
			case HANDLES.AdjustDown:
				var selectedItem = this._getSelectedItem();
				this._magnitudeAdjustmentMultiplier = selectedItem ? selectedItem.getMagnitudeAdjustmentMultiplier() : 0;
				break;
			case HANDLES.MoveUp:
				this._moveSelectedGroup(-1);
				break;
			case HANDLES.MoveDown:
				this._moveSelectedGroup(+1);
				break;
			default:
				if (this._handleIndex < 6 && (!this._tool.getAxis() || !this._tool.getDirection())) {
					this._tool.setAxis([ ExplodeAxis.X, ExplodeAxis.Y, ExplodeAxis.Z ][ this._handleIndex % 3 ]);
					this._tool.setDirection(this._handleIndex < 3 ? ExplodeDirection.Positive : ExplodeDirection.Negative);
				}
				break;
		}
	};

	ExplodeToolGizmo.prototype._setMagnitude = function(magnitude) {
		magnitude = Math.max(magnitude, 0);
		this._magnitude = magnitude;
		this._groups.forEach(function(group) {
			group._magnitude = magnitude;
		});
		this._updatePositions();
	};

	ExplodeToolGizmo.prototype._setOffset = function(offset) {
		if (this._handleIndex < 6) {
			this._tool.setMagnitude(this._beginMagnitude + offset);
		} else if (this._handleIndex === HANDLES.AdjustUp || this._handleIndex === HANDLES.AdjustDown) {
			var selectedItem = this._getSelectedItem();
			if (selectedItem && this._magnitude > 0) {
				this._setMagnitudeAdjustmentMultiplier(Math.min(Math.max(this._magnitudeAdjustmentMultiplier + offset / (this._magnitude * selectedItem._deltaOffset), -1), 1));
			}
		}
	};

	ExplodeToolGizmo.prototype._updatePositions = function() {
		var position = new THREE.Vector3();
		var axisDirection = this._axisDirection;
		// console.log("_updatePositions", this._magnitude);
		// console.log(this._axisDirection, this._magnitude);
		this._nodes.forEach(function(nodeInfo) {
			var node = nodeInfo.node;
			// console.log(node, nodeInfo.group.getMagnitude());
			position.copy(axisDirection).multiplyScalar(nodeInfo.group.getMagnitude()).add(nodeInfo.origin);
			node.matrixWorld.setPosition(position);
			node.matrix.multiplyMatrices(nodeInfo.matParentInv, node.matrixWorld);
			node.position.setFromMatrixPosition(node.matrix);
			node.updateMatrixWorld(true);
		});

		this._viewport.setShouldRenderFrame();
	};

	ExplodeToolGizmo.prototype._endGesture = function() {
		// this._tool.fireMoved({ x: offsetInParam.x, y: offsetInParam.y, z: offsetInParam.z, nodesProperties: nodesProperties });
	};

	ExplodeToolGizmo.prototype._getNodesProperties = function() {
		var nodesProperties = [];
		this._nodes.forEach(function(nodeInfo) {
			var node = nodeInfo.node;
			var property = {};
			property.node = node;
			var parent = this._getEffectiveParent(node);
			var pMat = new THREE.Matrix4();

			if (parent === node.parent) { // not joint node
				var rtransform = this._viewport._viewStateManager.getRelativeTransformation(node);
				property.offsetToRestInParent = rtransform.translation.slice();

				if (node.parent) {
					pMat = new THREE.Matrix4().extractRotation(node.parent.matrixWorld);
				}
				// var offsetInWorld = new THREE.Vector3(property.offsetToRest[0], property.offsetToRest[1], property.offsetToRest[2]).applyMatrix4(pMat);
				property.offsetToPreviousInParent = property.offsetToRestInParent.slice();

				var sequenceOffset;
				if (this._playback) {
					sequenceOffset = this._viewport._viewStateManager._getEndPropertyInPreviousPlayback(node, AnimationTrackType.Translate, this._playback);
					if (sequenceOffset) {
						property.offsetToPreviousInParent[ 0 ] -= sequenceOffset[ 0 ];
						property.offsetToPreviousInParent[ 1 ] -= sequenceOffset[ 1 ];
						property.offsetToPreviousInParent[ 2 ] -= sequenceOffset[ 2 ];
					}
				}

				var restTrans = this._viewport._viewStateManager.getRestTransformation(node);
				var previous = [ restTrans.translation[ 0 ], restTrans.translation[ 1 ], restTrans.translation[ 2 ] ];
				if (sequenceOffset) {
					previous[ 0 ] += sequenceOffset[ 0 ];
					previous[ 1 ] += sequenceOffset[ 1 ];
					previous[ 2 ] += sequenceOffset[ 2 ];
				}

				var quat = new THREE.Quaternion();
				var scale = new THREE.Vector3();
				var position = new THREE.Vector3();
				node.matrix.decompose(position, quat, scale);
				var MatPreviousTInv = new THREE.Matrix4().makeTranslation(-previous[ 0 ], -previous[ 1 ], -previous[ 2 ]);
				var MatRestTInv = new THREE.Matrix4().makeTranslation(-restTrans.translation[ 0 ], -restTrans.translation[ 1 ], -restTrans.translation[ 2 ]);

				if (scale.x === 0.0 || scale.y === 0.0 || scale.z === 0.0) {
					scale.x = 1;
					scale.y = 1;
					scale.z = 1;
				}
				var MatSInv = new THREE.Matrix4().makeScale(1 / scale.x, 1 / scale.y, 1 / scale.z);
				var MatRInv = new THREE.Matrix4().makeRotationFromQuaternion(quat.inverse());

				var MatTOffsetToPrevious = MatSInv.clone().multiply(MatRInv).multiply(MatPreviousTInv).multiply(node.matrix);
				MatTOffsetToPrevious.decompose(position, quat, scale);
				property.offsetToPrevious = position.toArray();

				var MatTOffsetToRest = MatSInv.multiply(MatRInv).multiply(MatRestTInv).multiply(node.matrix);
				MatTOffsetToRest.decompose(position, quat, scale);
				property.offsetToRest = position.toArray();
			} else { // joint
				if (node.userData.skipUpdateJointNode) {
					this._viewport._viewStateManager._setJointNodeOffsets(node, AnimationTrackType.Translate);
				}

				if (node.userData && node.userData.offsetTranslation) {
					property.offsetToRestInParent = node.userData.offsetTranslation.slice();
				} else {
					property.offsetToRestInParent = [ 0, 0, 0 ];
				}
				property.offsetToPreviousInParent = property.offsetToRestInParent.slice();

				if (node.userData.skipUpdateJointNode) {
					node.userData.skipUpdateJointNode = false;
					this._viewport._viewStateManager._setJointNodeMatrix();
					node.userData.skipUpdateJointNode = true;
				}

				var joint = this._viewport._viewStateManager.getRestTransformationUsingJoint(node);

				var pos = new THREE.Vector3();
				var sc = new THREE.Vector3(joint.scale[ 0 ], joint.scale[ 1 ], joint.scale[ 2 ]);
				var qu = new THREE.Quaternion(joint.quaternion[ 0 ], joint.quaternion[ 1 ], joint.quaternion[ 2 ], joint.quaternion[ 3 ]);
				if (node.userData.offsetScale) {
					sc.x *= node.userData.offsetScale[ 0 ];
					sc.y *= node.userData.offsetScale[ 1 ];
					sc.z *= node.userData.offsetScale[ 2 ];
				}
				if (node.userData.offsetQuaternion) {
					var offsetQuat = new THREE.Quaternion(node.userData.offsetQuaternion[ 0 ],
						node.userData.offsetQuaternion[ 1 ],
						node.userData.offsetQuaternion[ 2 ],
						node.userData.offsetQuaternion[ 3 ]);
					qu.multiply(offsetQuat);
				}
				var matRot = new THREE.Matrix4().makeRotationFromQuaternion(qu);
				var matTrans = new THREE.Matrix4().makeTranslation(joint.translation[ 0 ], joint.translation[ 1 ], joint.translation[ 2 ]);

				var matRest = parent.matrixWorld.clone().multiply(matTrans).multiply(matRot).scale(sc);
				var matT = new THREE.Matrix4().getInverse(matRest).multiply(node.matrixWorld);

				matT.decompose(pos, qu, sc);
				property.offsetToPrevious = pos.toArray();
				property.offsetToRest = pos.toArray();
			}

			var transform = this._viewport._viewStateManager.getTransformation(node);
			property.absolute = [ transform.translation[ 0 ], transform.translation[ 1 ], transform.translation[ 2 ] ];

			var wtrans = this._viewport._viewStateManager.getTransformationWorld(node);
			property.world = wtrans.translation;

			var userData;
			if (this._nodeUserDataMap) {
				userData = this._nodeUserDataMap.get(node);
			}

			if (userData && userData.initialTranslation) {
				property.restDifference = [ transform.translation[ 0 ] - userData.initialTranslation[ 0 ],
				transform.translation[ 1 ] - userData.initialTranslation[ 1 ],
				transform.translation[ 2 ] - userData.initialTranslation[ 2 ] ];
				var restDifferenceInWorld = new THREE.Vector3(property.restDifference[ 0 ], property.restDifference[ 1 ], property.restDifference[ 2 ]).applyMatrix4(pMat);
				property.restDifferenceInCoordinates = restDifferenceInWorld.toArray();
			}
			nodesProperties.push(property);
		}.bind(this));

		return nodesProperties;
	};

	ExplodeToolGizmo.prototype.expandBoundingBox = function(boundingBox) {
		if (this._viewport) {
			this._expandBoundingBox(boundingBox, this._viewport.getCamera().getCameraRef(), true);
		}
	};

	ExplodeToolGizmo.prototype._updateGizmoObjectTransformation = function(obj) {
		obj.matrix.fromArray(this._tool.getAnchor());
		obj.matrix.decompose(obj.position, obj.quaternion, obj.scale);

		var scale = this._getGizmoScale(obj.position);
		obj.scale.setScalar(scale);
		obj.matrixAutoUpdate = true;
		obj.updateMatrixWorld(true);
		return scale;
	};

	ExplodeToolGizmo.prototype._updateGroupGizmoTransformation = function(obj) {
		var axisIndex = this._getActiveAxisIndex();
		var selectedItem = axisIndex >= 0 ? this._getSelectedItem() : null; // get control for associated control
		obj.visible = !!selectedItem;
		if (selectedItem) {
			obj.position.copy(this._axisDirection).multiplyScalar(selectedItem.getMagnitude()).add(selectedItem._center);
			obj.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), this._axisDirection);
			obj.scale.setScalar(this._getGizmoScale(obj.position));
			obj.updateMatrix();
			obj.updateMatrixWorld();
		}
	};

	ExplodeToolGizmo.prototype._updateGizmoTransformation = function(i, camera) {
		this._updateGizmoObjectTransformation(this._gizmo);
	};

	ExplodeToolGizmo.prototype._getCameraLayersMask = function() {
		var mask = 0 | 0;
		var axisIndex = this._getActiveAxisIndex();
		mask = 1 << (axisIndex + 1);
		if (axisIndex >= 0 && this._getSelectedItem()) {
			mask |= 1 << 7;
		}
		return mask;
	};

	ExplodeToolGizmo.prototype.render = function() {
		assert(this._viewport && this._viewport.getMetadata().getName() === "sap.ui.vk.threejs.Viewport", "Can't render gizmo without sap.ui.vk.threejs.Viewport");

		if (this._tool && this._groups.length > 0) {
			var renderer = this._viewport.getRenderer(),
				camera = this._viewport.getCamera().getCameraRef();

			this._matViewProj.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);

			renderer.clearDepth();

			var scale = this._updateGizmoObjectTransformation(this._gizmo);
			this._updateAxisTitles(this._axisTitles, this._gizmo, camera, GIZMO_SIZE + 18, scale);

			this._updateGroupGizmoTransformation(this._groupGizmo);

			var mask = camera.layers.mask;
			camera.layers.mask = this._getCameraLayersMask();
			renderer.render(this._sceneGizmo, camera);
			camera.layers.mask = mask;
		}
	};

	return ExplodeToolGizmo;

});
