/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2021 SAP SE. All rights reserved
 */
sap.ui.define(["sap/ui/core/mvc/ControllerExtension", "sap/fe/core/controllerextensions/ControllerExtensionMetadata", "../helpers/ClassSupport", "sap/fe/core/CommonUtils", "sap/fe/macros/field/FieldRuntime", "sap/base/Log"], function (ControllerExtension, ControllerExtensionMetadata, ClassSupport, CommonUtils, FieldRuntime, Log) {
  "use strict";

  var _dec, _dec2, _class, _class2;

  var getFieldStateOnChange = FieldRuntime.getFieldStateOnChange;
  var Private = ClassSupport.Private;
  var Final = ClassSupport.Final;
  var Public = ClassSupport.Public;
  var Override = ClassSupport.Override;
  var UI5Class = ClassSupport.UI5Class;

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

  function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  var SideEffectsControllerExtension = (_dec = UI5Class("sap.fe.core.controllerextensions.SideEffects", ControllerExtensionMetadata), _dec2 = Override(), _dec(_class = (_class2 = /*#__PURE__*/function (_ControllerExtension) {
    _inherits(SideEffectsControllerExtension, _ControllerExtension);

    var _super = _createSuper(SideEffectsControllerExtension);

    function SideEffectsControllerExtension() {
      _classCallCheck(this, SideEffectsControllerExtension);

      return _super.apply(this, arguments);
    }

    _createClass(SideEffectsControllerExtension, [{
      key: "onInit",
      value: function onInit() {
        this._oView = this.base.getView();
        this._oAppComponent = CommonUtils.getAppComponent(this._oView);
        this._oSideEffectsService = this._oAppComponent.getSideEffectsService();
        this._mFieldGroupQueue = {};
        this._aSourcePropertiesFailure = new Set();
        this._mFailedSideEffects = {};
      }
      /**
       * Clear recorded validation status for all properties.
       *
       * @function
       * @name clearPropertiesStatus
       */

    }, {
      key: "clearPropertiesStatus",
      value: function clearPropertiesStatus() {
        this._aSourcePropertiesFailure.clear();
      }
      /**
       * Gets failed SideEffects.
       *
       * @function
       * @name getRegisteredFailedRequests
       * @returns {object} Registered SideEffects requests that have failed
       */

    }, {
      key: "getRegisteredFailedRequests",
      value: function getRegisteredFailedRequests() {
        return this._mFailedSideEffects;
      }
      /**
       * Manages the workflow for SideEffects with related changes to a field
       * The following scenarios are managed:
       *  - Execute: triggers immediate SideEffects requests if the promise for the field event is fulfilled
       *  - Register: caches deferred SideEffects that will be executed when the FieldGroup is unfocused.
       *
       * @function
       * @name handleFieldChange
       * @param {object} oEvent SAPUI5 event that comes from a field change
       * @param {object} oFieldGroupPreRequisite Promise to be fulfilled before executing deferred SideEffects
       * @returns {object}  Promise on SideEffects request(s)
       */

    }, {
      key: "handleFieldChange",
      value: function handleFieldChange(oEvent, oFieldGroupPreRequisite) {
        var _this = this;

        var mEventFieldProperties = this._getFieldProperties(oEvent),
            aImmediateSideEffectsProperties = this._initializeFieldSideEffects(mEventFieldProperties, oFieldGroupPreRequisite);

        var bIsImmediateTriggered = false;
        return this._generateImmediatePromise(mEventFieldProperties).then(function () {
          bIsImmediateTriggered = true;
          return Promise.all(aImmediateSideEffectsProperties.map(function (mSideEffectsProperty) {
            return _this.requestSideEffects(mSideEffectsProperty.sideEffects, mSideEffectsProperty.context);
          }) || []);
        }).catch(function (oError) {
          if (bIsImmediateTriggered) {
            Log.debug("Error while processing Field SideEffects", oError);
          } else {
            /**
             * SideEffects have not been triggered since preRequisite validation fails so we need
             * to keep previously failed request as Failed request (to be retrigger on next change)
             */
            aImmediateSideEffectsProperties.filter(function (mImmediateSideEffects) {
              return mImmediateSideEffects.previouslyFailed === true;
            }).forEach(function (mImmediateSideEffects) {
              return _this._addFailedSideEffects(mImmediateSideEffects.sideEffects, mImmediateSideEffects.context);
            });
          }
        });
      }
      /**
       * Manages SideEffects with a related 'focus out' to a field group.
       *
       * @function
       * @name handleFieldGroupChange
       * @param {object} oEvent SAPUI5 Event
       * @returns {object} Promise on SideEffects request(s)
       */

    }, {
      key: "handleFieldGroupChange",
      value: function handleFieldGroupChange(oEvent) {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        var that = this,
            aDeferredSideEffects = [],
            aFieldGroupIds = oEvent.getParameter("fieldGroupIds");

        var getFieldGroupRequestPromise = function (oDeferredSideEffect) {
          var bIsRequestsTriggered = false;
          var oSideEffectProperty = oDeferredSideEffect.sideEffectProperty;
          var oContext = oSideEffectProperty.context;
          var sContextPath = oContext.getPath();

          var sEntityType = that._oSideEffectsService.getEntityTypeFromContext(oContext);

          var mEntityType = that._getEntityTypeFromFQN(sEntityType);

          return Promise.all(oDeferredSideEffect.promises).then(function () {
            bIsRequestsTriggered = true; //Deferred SideEffects are executed only if all sourceProperties have no registered failure.

            if (mEntityType && oSideEffectProperty.sideEffects.SourceProperties.every(function (sourceProperty) {
              if (sourceProperty.type === "PropertyPath") {
                var sId = that._generateStatusIndex(mEntityType, sourceProperty.value, oContext);

                if (sId) {
                  return !that._aSourcePropertiesFailure.has(sId);
                }
              }

              return true;
            })) {
              return that.requestSideEffects(oSideEffectProperty.sideEffects, oSideEffectProperty.context);
            }

            return null;
          }).catch(function (oError) {
            if (bIsRequestsTriggered) {
              Log.debug("Error while processing FieldGroup SideEffects on context " + sContextPath, oError);
            }
          }).finally(function () {
            delete that._mFieldGroupQueue[oSideEffectProperty.name][sContextPath];
          });
        };

        aFieldGroupIds.forEach(function (sFieldGroupId) {
          var _that$_mFieldGroupQue;

          /**
           * string "$$ImmediateRequest" is added to the SideEffects name during templating to know
           * if this SideEffects must be immediately executed requested (on field change) or must
           * be deferred (on field group focus out)
           *
           */
          var sSideEffectName = sFieldGroupId.replace("$$ImmediateRequest", "");
          var mContextDeferredSideEffects = (_that$_mFieldGroupQue = that._mFieldGroupQueue) === null || _that$_mFieldGroupQue === void 0 ? void 0 : _that$_mFieldGroupQue[sSideEffectName];

          if (mContextDeferredSideEffects) {
            Object.keys(mContextDeferredSideEffects).forEach(function (sContextPath) {
              var oDeferredSideEffect = mContextDeferredSideEffects[sContextPath];

              if (!oDeferredSideEffect.processStarted) {
                oDeferredSideEffect.processStarted = true;
                aDeferredSideEffects.push(oDeferredSideEffect);
              }
            });
          }
        });
        return Promise.all(aDeferredSideEffects.map(function (oDeferredSideEffect) {
          return getFieldGroupRequestPromise(oDeferredSideEffect);
        }));
      }
      /**
       * Adds a SideEffects control.
       *
       * @function
       * @name addControlSideEffects
       * @param {string} sEntityType Name of the entity where the SideEffects control will be registered
       * @param {object} oSideEffects SideEffects to register. Ensure the sourceControlId matches the associated SAPUI5 control ID.
       *
       */

    }, {
      key: "addControlSideEffects",
      value: function addControlSideEffects(sEntityType, oSideEffects) {
        this._oSideEffectsService.addControlSideEffects(sEntityType, oSideEffects);
      }
      /**
       * Removes the queue containing the failed SideEffects.
       *
       * @function
       * @name removeFailedSideEffects
       */

    }, {
      key: "removeFailedSideEffects",
      value: function removeFailedSideEffects() {
        this._mFailedSideEffects = {};
      }
      /**
       * Request SideEffects on a specific context.
       *
       * @function
       * @name requestSideEffects
       * @param {object} oSideEffects SideEffects to be executed
       * @param {object} oContext Context where SideEffects need to be executed
       * @returns {object} SideEffects request on SAPUI5 context
       */

    }, {
      key: "requestSideEffects",
      value: function requestSideEffects(oSideEffects, oContext) {
        var _this2 = this;

        var fResolver, fRejector;
        var oPromise = new Promise(function (resolve, reject) {
          fResolver = resolve;
          fRejector = reject;
        });
        var aTargets = (oSideEffects.TargetEntities || []).concat(oSideEffects.TargetProperties || []),
            sTriggerAction = oSideEffects.TriggerAction;

        if (sTriggerAction) {
          this._oSideEffectsService.executeAction(sTriggerAction, oContext);
        }

        this._oSideEffectsService.requestSideEffects(aTargets, oContext).then(function () {
          return fResolver();
        }).catch(function (oError) {
          _this2._addFailedSideEffects(oSideEffects, oContext);

          fRejector(oError);
        });

        return oPromise;
      }
      /**
       * Removes SideEffects created by a control.
       *
       * @function
       * @name removeControlSideEffects
       * @param {object} oControl SAPUI5 Control
       */

    }, {
      key: "removeControlSideEffects",
      value: function removeControlSideEffects(oControl) {
        var sControlId = oControl && oControl.isA && oControl.isA("sap.ui.base.ManagedObject") && oControl.getId();

        if (sControlId) {
          this._oSideEffectsService.removeControlSideEffects(sControlId);
        }
      }
      /**
       * Adds SideEffects to the queue of the failed SideEffects
       * The SideEffects will be retriggered on the next change on the same context.
       *
       * @function
       * @name _addFailedSideEffects
       * @param {object} oSideEffects SideEffects that need to be retriggered
       * @param {object} oContext Context where SideEffects have failed
       */

    }, {
      key: "_addFailedSideEffects",
      value: function _addFailedSideEffects(oSideEffects, oContext) {
        var sContextPath = oContext.getPath();
        this._mFailedSideEffects[sContextPath] = this._mFailedSideEffects[sContextPath] || [];

        var bIsNotAlreadyListed = this._mFailedSideEffects[sContextPath].every(function (mFailedSideEffects) {
          return oSideEffects.fullyQualifiedName !== mFailedSideEffects.fullyQualifiedName;
        });

        if (bIsNotAlreadyListed) {
          this._mFailedSideEffects[sContextPath].push(oSideEffects);
        }
      }
      /**
       * Generates the promise for the field group that is required before requesting SideEffects.
       * If the promise is rejected and only the field requires the SideEffects on this context, the SideEffects are removed from the
       * SideEffects queue.
       *
       * @function
       * @name _generateFieldGroupPromise
       * @param {object} mEventFieldProperties Field properties
       * @returns {object} Promise to be used for the validation of the field
       */

    }, {
      key: "_generateFieldGroupPromise",
      value: function _generateFieldGroupPromise(mEventFieldProperties) {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        var that = this;
        var bPromiseSuccess = true;
        return mEventFieldProperties.promise.then(function () {
          return bPromiseSuccess;
        }).catch(function () {
          bPromiseSuccess = false;
          return bPromiseSuccess;
        }).finally(function () {
          /**
           * Need to store the status of properties related to this field for deferred SideEffects
           * since all SourceProperties for this kind of SideEffects must be valid
           */
          that._saveFieldPropertiesStatus(mEventFieldProperties.field, bPromiseSuccess);
        });
      }
      /**
       * Generates the promise for the field that is required before requesting immediate SideEffects.
       *
       * @function
       * @name _generateImmediatePromise
       * @param {object} mEventFieldProperties Field properties
       * @returns {object} Promise to be used for the validation of the field
       */

    }, {
      key: "_generateImmediatePromise",
      value: function _generateImmediatePromise(mEventFieldProperties) {
        var oPromise = mEventFieldProperties.promise;
        return oPromise.then(function () {
          /**
           * If the field gets a FieldHelper, we need to wait until all fields changed by this FieldHelper have been set.
           * To achieve this, we ensure that all related bindings have been resolved.
           *
           * This resolution process is not managed by the Field Event Promise, so for fast user actions (like automation) it can lock the model
           * and no request can be executed.
           */
          var oField = mEventFieldProperties.field;
          var sFieldHelperId = oField.getFieldHelp && oField.getFieldHelp();

          if (sFieldHelperId) {
            var oFilterHelp = sap.ui.getCore().byId(sFieldHelperId);

            if (oFilterHelp) {
              return Promise.all(oFilterHelp.getOutParameters().map(function (oOutParameter) {
                var oBinding = oOutParameter.getBinding("value");
                return oBinding ? oBinding.requestValue() : Promise.resolve();
              }));
            }
          }

          return Promise.all([]);
        });
      }
      /**
       * Generates a status index.
       *
       * @function
       * @name _generateStatusIndex
       * @param {object} mEntityType The entity type
       * @param {string} sPropertyPath The property path
       * @param {object} oContext SAPUI5 Context
       * @returns {string | undefined} Index
       */

    }, {
      key: "_generateStatusIndex",
      value: function _generateStatusIndex(mEntityType, sPropertyPath, oContext) {
        var sContextPath = oContext.getPath();
        var mProperty = mEntityType.resolvePath(sPropertyPath);

        if (mProperty) {
          if (mProperty && mProperty._type === "Property") {
            return [mProperty.fullyQualifiedName, sContextPath].join("__");
          }
        }

        return undefined;
      }
      /**
       * Gets the appropriate context on which SideEffects can be requested.
       * The correct one must have the binding parameter $$patchWithoutSideEffects.
       *
       * @function
       * @name _getContextForSideEffects
       * @param {object} oSourceField Field
       * @param {string} sSideEffectEntityType Target entity type of the SideEffects annotation
       * @returns {object} SAPUI5 Context
       */

    }, {
      key: "_getContextForSideEffects",
      value: function _getContextForSideEffects(oSourceField, sSideEffectEntityType) {
        var oBindingContext = oSourceField.getBindingContext();

        var oContextForSideEffects = oBindingContext,
            sEntityType = this._oSideEffectsService.getEntityTypeFromContext(oBindingContext);

        if (sSideEffectEntityType !== sEntityType) {
          oContextForSideEffects = oBindingContext.getBinding().getContext();

          if (oContextForSideEffects) {
            sEntityType = this._oSideEffectsService.getEntityTypeFromContext(oContextForSideEffects);

            if (sSideEffectEntityType !== sEntityType) {
              oContextForSideEffects = oContextForSideEffects.getBinding().getContext();

              if (oContextForSideEffects) {
                sEntityType = this._oSideEffectsService.getEntityTypeFromContext(oContextForSideEffects);

                if (sSideEffectEntityType !== sEntityType) {
                  return undefined;
                }
              }
            }
          }
        }

        return oContextForSideEffects || undefined;
      }
      /**
       * Retrieves the EntityType based on its fully-qualified name.
       *
       * @param {string} sFullyQualifiedName The fully-qualified name
       * @returns {object} The entity type
       */

    }, {
      key: "_getEntityTypeFromFQN",
      value: function _getEntityTypeFromFQN(sFullyQualifiedName) {
        var mEntityType = this._oSideEffectsService.getConvertedMetaModel().entityTypes.find(function (oEntityType) {
          return oEntityType.fullyQualifiedName === sFullyQualifiedName;
        });

        return mEntityType;
      }
      /**
       * Gets the promise of the field validation that is required for the SideEffects process.
       *
       * @function
       * @name _getFieldPromise
       * @param {object} oEvent Field change event
       * @returns {object} Field promise
       */

    }, {
      key: "_getFieldPromise",
      value: function _getFieldPromise(oEvent) {
        var promise = oEvent.getParameter("promise") || Promise.resolve();
        return promise.then(function () {
          var oPromise = new Promise(function (resolve, reject) {
            if (!getFieldStateOnChange(oEvent).state.validity) {
              reject();
            } else {
              resolve(true);
            }
          });
          return oPromise;
        });
      }
      /**
       * Gets the properties of the field that are required for the SideEffects process.
       *
       * @function
       * @name _getFieldProperties
       * @param {object} oEvent Field change event
       * @returns {object} Field properties (event change promise, field, SideEffects related to this field)
       */

    }, {
      key: "_getFieldProperties",
      value: function _getFieldProperties(oEvent) {
        var oField = oEvent.getSource();
        return {
          promise: this._getFieldPromise(oEvent),
          field: oField,
          sideEffectsMap: this._getFieldSideEffectsMap(oField)
        };
      }
      /**
       * Gets the SideEffects map
       * These SideEffects are
       * - listed into FieldGroupIds (coming from an OData Service)
       * - generated by a control or controls and that configure this field as SourceProperties.
       *
       * @function
       * @name _getFieldSideEffectsMap
       * @param {object} oField Field
       * @returns {object} SideEffects map
       */

    }, {
      key: "_getFieldSideEffectsMap",
      value: function _getFieldSideEffectsMap(oField) {
        var _this3 = this;

        var mSideEffectsMap = {},
            aFieldGroupIds = oField.getFieldGroupIds(),
            sViewEntitySetSetName = this._oView.getViewData().entitySet,
            oViewEntitySet = this._oSideEffectsService.getConvertedMetaModel().entitySets.find(function (oEntitySet) {
          return oEntitySet.name === sViewEntitySetSetName;
        }); // SideEffects coming from an OData Service


        aFieldGroupIds.forEach(function (sFieldGroupId) {
          var _this3$_oSideEffectsS;

          var bIsImmediate = sFieldGroupId.indexOf("$$ImmediateRequest") !== -1,
              sName = sFieldGroupId.replace("$$ImmediateRequest", ""),
              aSideEffectParts = sName.split("#"),
              sSideEffectEntityType = aSideEffectParts[0],
              sSideEffectPath = sSideEffectEntityType + "@com.sap.vocabularies.Common.v1.SideEffects" + (aSideEffectParts.length === 2 ? "#" + aSideEffectParts[1] : ""),
              oSideEffect = (_this3$_oSideEffectsS = _this3._oSideEffectsService.getODataEntitySideEffects(sSideEffectEntityType)) === null || _this3$_oSideEffectsS === void 0 ? void 0 : _this3$_oSideEffectsS[sSideEffectPath],
              oContext = _this3._getContextForSideEffects(oField, sSideEffectEntityType);

          if (oSideEffect && oContext) {
            mSideEffectsMap[sName] = {
              name: sName,
              immediate: bIsImmediate,
              sideEffects: oSideEffect,
              context: oContext
            };
          }
        }); //SideEffects coming from control(s)

        if (sViewEntitySetSetName && oViewEntitySet) {
          var sViewEntityType = oViewEntitySet.entityType.fullyQualifiedName,
              mFieldPath = oField.getAggregation("customData").find(function (oCustomData) {
            return oCustomData.getKey() === "sourcePath";
          }),
              oContext = this._getContextForSideEffects(oField, sViewEntityType);

          if (mFieldPath && oContext) {
            var sFieldPath = mFieldPath.getValue().replace("/" + sViewEntitySetSetName + "/", ""),
                mControlEntityType = this._oSideEffectsService.getControlEntitySideEffects(sViewEntityType);

            Object.keys(mControlEntityType).forEach(function (sControlName) {
              var oControlSideEffects = mControlEntityType[sControlName];

              if (oControlSideEffects.SourceProperties.includes(sFieldPath)) {
                var sName = sControlName + "::" + sViewEntityType;
                mSideEffectsMap[sName] = {
                  name: sName,
                  immediate: true,
                  sideEffects: oControlSideEffects,
                  context: oContext
                };
              }
            });
          }
        }

        return mSideEffectsMap;
      }
      /**
       * Manages the SideEffects with related changes to a field
       * List: gets immediate SideEffects requests
       * Register: caches deferred SideEffects that will be executed when the FieldGroup is unfocused.
       *
       * @function
       * @name _initializeFieldSideEffects
       * @param {object} mEventFieldProperties Field event properties
       * @param {object} oFieldGroupPreRequisite Promise to be fulfilled before executing deferred SideEffects
       * @returns {Array}  Array of immediate SideEffects
       */

    }, {
      key: "_initializeFieldSideEffects",
      value: function _initializeFieldSideEffects(mEventFieldProperties, oFieldGroupPreRequisite) {
        var _this4 = this;

        var mFieldSideEffectsMap = mEventFieldProperties.sideEffectsMap,
            oFieldPromiseForFieldGroup = this._generateFieldGroupPromise(mEventFieldProperties),
            // Promise managing FieldGroup requests if Field promise fails
        mFailedSideEffectsName = {},
            aImmediateSideEffectsProperties = [];

        oFieldGroupPreRequisite = oFieldGroupPreRequisite || Promise.resolve();
        Object.keys(mFieldSideEffectsMap).forEach(function (sSideEffectName) {
          var oSideEffectProperty = mFieldSideEffectsMap[sSideEffectName],
              sSideEffectContextPath = oSideEffectProperty.context.getPath(),
              aFailedSideEffects = _this4._mFailedSideEffects[sSideEffectContextPath]; // Check if there is any previously failed request for this context

          if (aFailedSideEffects) {
            delete _this4._mFailedSideEffects[sSideEffectContextPath];
            mFailedSideEffectsName[sSideEffectContextPath] = {};
            aFailedSideEffects.forEach(function (mFailedSideEffects) {
              mFailedSideEffectsName[sSideEffectContextPath][mFailedSideEffects.fullyQualifiedName] = true;
              aImmediateSideEffectsProperties.push({
                name: sSideEffectName,
                previouslyFailed: true,
                sideEffects: mFailedSideEffects,
                context: oSideEffectProperty.context
              });
            });
          }

          if (oSideEffectProperty.immediate) {
            var _mFailedSideEffectsNa;

            // SideEffects will be executed immediately after event promise validation
            if (!((_mFailedSideEffectsNa = mFailedSideEffectsName[sSideEffectContextPath]) === null || _mFailedSideEffectsNa === void 0 ? void 0 : _mFailedSideEffectsNa[oSideEffectProperty.sideEffects.fullyQualifiedName])) {
              aImmediateSideEffectsProperties.push({
                name: sSideEffectName,
                sideEffects: oSideEffectProperty.sideEffects,
                context: oSideEffectProperty.context
              });
            }
          } else {
            // Add deferred SideEffects to the related dictionary
            _this4._mFieldGroupQueue[sSideEffectName] = _this4._mFieldGroupQueue[sSideEffectName] || {};
            var mSideEffectContextPath = _this4._mFieldGroupQueue[sSideEffectName][sSideEffectContextPath] || {
              promises: [],
              sideEffectProperty: oSideEffectProperty,
              processStarted: false
            };
            mSideEffectContextPath.promises = mSideEffectContextPath.promises.concat([oFieldPromiseForFieldGroup, oFieldGroupPreRequisite]);
            _this4._mFieldGroupQueue[sSideEffectName][sSideEffectContextPath] = mSideEffectContextPath;
          }
        });
        return aImmediateSideEffectsProperties;
      }
      /**
       * Saves the validation status of properties related to a field control.
       *
       * @param {object} oField Field
       * @param {boolean} bSuccess Status of the field validation
       */

    }, {
      key: "_saveFieldPropertiesStatus",
      value: function _saveFieldPropertiesStatus(oField, bSuccess) {
        var _this5 = this;

        var oBindingContext = oField.getBindingContext();

        var sEntityType = this._oSideEffectsService.getEntityTypeFromContext(oBindingContext);

        var mEntityType = this._getEntityTypeFromFQN(sEntityType);

        if (mEntityType) {
          // Retrieves all properties used by the field
          var oFieldBinding = this._getBindingForField(oField);

          var aFieldPaths = oFieldBinding.isA("sap.ui.model.CompositeBinding") ? (oFieldBinding.getBindings() || []).map(function (oBinding) {
            return oBinding.sPath;
          }) : [oFieldBinding.getPath()]; // Stores status for all properties

          aFieldPaths.forEach(function (sFieldPath) {
            var sId = _this5._generateStatusIndex(mEntityType, sFieldPath, oBindingContext);

            if (sId) {
              _this5._aSourcePropertiesFailure[bSuccess ? "delete" : "add"](sId);
            }
          });
        }
      }
      /**
       * Retrieves the property binding to the value of the field.
       *
       * @param oField Field
       * @returns {Binding}  Binding to the value
       */

    }, {
      key: "_getBindingForField",
      value: function _getBindingForField(oField) {
        var oBinding;

        if (oField.isA("sap.m.CheckBox")) {
          oBinding = oField.getBinding("selected");
        } else {
          oBinding = oField.getBinding("value");
        }

        return oBinding;
      }
    }]);

    return SideEffectsControllerExtension;
  }(ControllerExtension), (_applyDecoratedDescriptor(_class2.prototype, "onInit", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "onInit"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "clearPropertiesStatus", [Public, Final], Object.getOwnPropertyDescriptor(_class2.prototype, "clearPropertiesStatus"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getRegisteredFailedRequests", [Public, Final], Object.getOwnPropertyDescriptor(_class2.prototype, "getRegisteredFailedRequests"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "handleFieldChange", [Public, Final], Object.getOwnPropertyDescriptor(_class2.prototype, "handleFieldChange"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "handleFieldGroupChange", [Public, Final], Object.getOwnPropertyDescriptor(_class2.prototype, "handleFieldGroupChange"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "addControlSideEffects", [Public, Final], Object.getOwnPropertyDescriptor(_class2.prototype, "addControlSideEffects"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "removeFailedSideEffects", [Public, Final], Object.getOwnPropertyDescriptor(_class2.prototype, "removeFailedSideEffects"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "requestSideEffects", [Public, Final], Object.getOwnPropertyDescriptor(_class2.prototype, "requestSideEffects"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "removeControlSideEffects", [Public, Final], Object.getOwnPropertyDescriptor(_class2.prototype, "removeControlSideEffects"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_addFailedSideEffects", [Private, Final], Object.getOwnPropertyDescriptor(_class2.prototype, "_addFailedSideEffects"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_getContextForSideEffects", [Private, Final], Object.getOwnPropertyDescriptor(_class2.prototype, "_getContextForSideEffects"), _class2.prototype)), _class2)) || _class);
  return SideEffectsControllerExtension;
}, false);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNpZGVFZmZlY3RzLnRzIl0sIm5hbWVzIjpbIlNpZGVFZmZlY3RzQ29udHJvbGxlckV4dGVuc2lvbiIsIlVJNUNsYXNzIiwiQ29udHJvbGxlckV4dGVuc2lvbk1ldGFkYXRhIiwiT3ZlcnJpZGUiLCJfb1ZpZXciLCJiYXNlIiwiZ2V0VmlldyIsIl9vQXBwQ29tcG9uZW50IiwiQ29tbW9uVXRpbHMiLCJnZXRBcHBDb21wb25lbnQiLCJfb1NpZGVFZmZlY3RzU2VydmljZSIsImdldFNpZGVFZmZlY3RzU2VydmljZSIsIl9tRmllbGRHcm91cFF1ZXVlIiwiX2FTb3VyY2VQcm9wZXJ0aWVzRmFpbHVyZSIsIlNldCIsIl9tRmFpbGVkU2lkZUVmZmVjdHMiLCJjbGVhciIsIm9FdmVudCIsIm9GaWVsZEdyb3VwUHJlUmVxdWlzaXRlIiwibUV2ZW50RmllbGRQcm9wZXJ0aWVzIiwiX2dldEZpZWxkUHJvcGVydGllcyIsImFJbW1lZGlhdGVTaWRlRWZmZWN0c1Byb3BlcnRpZXMiLCJfaW5pdGlhbGl6ZUZpZWxkU2lkZUVmZmVjdHMiLCJiSXNJbW1lZGlhdGVUcmlnZ2VyZWQiLCJfZ2VuZXJhdGVJbW1lZGlhdGVQcm9taXNlIiwidGhlbiIsIlByb21pc2UiLCJhbGwiLCJtYXAiLCJtU2lkZUVmZmVjdHNQcm9wZXJ0eSIsInJlcXVlc3RTaWRlRWZmZWN0cyIsInNpZGVFZmZlY3RzIiwiY29udGV4dCIsImNhdGNoIiwib0Vycm9yIiwiTG9nIiwiZGVidWciLCJmaWx0ZXIiLCJtSW1tZWRpYXRlU2lkZUVmZmVjdHMiLCJwcmV2aW91c2x5RmFpbGVkIiwiZm9yRWFjaCIsIl9hZGRGYWlsZWRTaWRlRWZmZWN0cyIsInRoYXQiLCJhRGVmZXJyZWRTaWRlRWZmZWN0cyIsImFGaWVsZEdyb3VwSWRzIiwiZ2V0UGFyYW1ldGVyIiwiZ2V0RmllbGRHcm91cFJlcXVlc3RQcm9taXNlIiwib0RlZmVycmVkU2lkZUVmZmVjdCIsImJJc1JlcXVlc3RzVHJpZ2dlcmVkIiwib1NpZGVFZmZlY3RQcm9wZXJ0eSIsInNpZGVFZmZlY3RQcm9wZXJ0eSIsIm9Db250ZXh0Iiwic0NvbnRleHRQYXRoIiwiZ2V0UGF0aCIsInNFbnRpdHlUeXBlIiwiZ2V0RW50aXR5VHlwZUZyb21Db250ZXh0IiwibUVudGl0eVR5cGUiLCJfZ2V0RW50aXR5VHlwZUZyb21GUU4iLCJwcm9taXNlcyIsIlNvdXJjZVByb3BlcnRpZXMiLCJldmVyeSIsInNvdXJjZVByb3BlcnR5IiwidHlwZSIsInNJZCIsIl9nZW5lcmF0ZVN0YXR1c0luZGV4IiwidmFsdWUiLCJoYXMiLCJmaW5hbGx5IiwibmFtZSIsInNGaWVsZEdyb3VwSWQiLCJzU2lkZUVmZmVjdE5hbWUiLCJyZXBsYWNlIiwibUNvbnRleHREZWZlcnJlZFNpZGVFZmZlY3RzIiwiT2JqZWN0Iiwia2V5cyIsInByb2Nlc3NTdGFydGVkIiwicHVzaCIsIm9TaWRlRWZmZWN0cyIsImFkZENvbnRyb2xTaWRlRWZmZWN0cyIsImZSZXNvbHZlciIsImZSZWplY3RvciIsIm9Qcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImFUYXJnZXRzIiwiVGFyZ2V0RW50aXRpZXMiLCJjb25jYXQiLCJUYXJnZXRQcm9wZXJ0aWVzIiwic1RyaWdnZXJBY3Rpb24iLCJUcmlnZ2VyQWN0aW9uIiwiZXhlY3V0ZUFjdGlvbiIsIm9Db250cm9sIiwic0NvbnRyb2xJZCIsImlzQSIsImdldElkIiwicmVtb3ZlQ29udHJvbFNpZGVFZmZlY3RzIiwiYklzTm90QWxyZWFkeUxpc3RlZCIsIm1GYWlsZWRTaWRlRWZmZWN0cyIsImZ1bGx5UXVhbGlmaWVkTmFtZSIsImJQcm9taXNlU3VjY2VzcyIsInByb21pc2UiLCJfc2F2ZUZpZWxkUHJvcGVydGllc1N0YXR1cyIsImZpZWxkIiwib0ZpZWxkIiwic0ZpZWxkSGVscGVySWQiLCJnZXRGaWVsZEhlbHAiLCJvRmlsdGVySGVscCIsInNhcCIsInVpIiwiZ2V0Q29yZSIsImJ5SWQiLCJnZXRPdXRQYXJhbWV0ZXJzIiwib091dFBhcmFtZXRlciIsIm9CaW5kaW5nIiwiZ2V0QmluZGluZyIsInJlcXVlc3RWYWx1ZSIsInNQcm9wZXJ0eVBhdGgiLCJtUHJvcGVydHkiLCJyZXNvbHZlUGF0aCIsIl90eXBlIiwiam9pbiIsInVuZGVmaW5lZCIsIm9Tb3VyY2VGaWVsZCIsInNTaWRlRWZmZWN0RW50aXR5VHlwZSIsIm9CaW5kaW5nQ29udGV4dCIsImdldEJpbmRpbmdDb250ZXh0Iiwib0NvbnRleHRGb3JTaWRlRWZmZWN0cyIsImdldENvbnRleHQiLCJzRnVsbHlRdWFsaWZpZWROYW1lIiwiZ2V0Q29udmVydGVkTWV0YU1vZGVsIiwiZW50aXR5VHlwZXMiLCJmaW5kIiwib0VudGl0eVR5cGUiLCJnZXRGaWVsZFN0YXRlT25DaGFuZ2UiLCJzdGF0ZSIsInZhbGlkaXR5IiwiZ2V0U291cmNlIiwiX2dldEZpZWxkUHJvbWlzZSIsInNpZGVFZmZlY3RzTWFwIiwiX2dldEZpZWxkU2lkZUVmZmVjdHNNYXAiLCJtU2lkZUVmZmVjdHNNYXAiLCJnZXRGaWVsZEdyb3VwSWRzIiwic1ZpZXdFbnRpdHlTZXRTZXROYW1lIiwiZ2V0Vmlld0RhdGEiLCJlbnRpdHlTZXQiLCJvVmlld0VudGl0eVNldCIsImVudGl0eVNldHMiLCJvRW50aXR5U2V0IiwiYklzSW1tZWRpYXRlIiwiaW5kZXhPZiIsInNOYW1lIiwiYVNpZGVFZmZlY3RQYXJ0cyIsInNwbGl0Iiwic1NpZGVFZmZlY3RQYXRoIiwibGVuZ3RoIiwib1NpZGVFZmZlY3QiLCJnZXRPRGF0YUVudGl0eVNpZGVFZmZlY3RzIiwiX2dldENvbnRleHRGb3JTaWRlRWZmZWN0cyIsImltbWVkaWF0ZSIsInNWaWV3RW50aXR5VHlwZSIsImVudGl0eVR5cGUiLCJtRmllbGRQYXRoIiwiZ2V0QWdncmVnYXRpb24iLCJvQ3VzdG9tRGF0YSIsImdldEtleSIsInNGaWVsZFBhdGgiLCJnZXRWYWx1ZSIsIm1Db250cm9sRW50aXR5VHlwZSIsImdldENvbnRyb2xFbnRpdHlTaWRlRWZmZWN0cyIsInNDb250cm9sTmFtZSIsIm9Db250cm9sU2lkZUVmZmVjdHMiLCJpbmNsdWRlcyIsIm1GaWVsZFNpZGVFZmZlY3RzTWFwIiwib0ZpZWxkUHJvbWlzZUZvckZpZWxkR3JvdXAiLCJfZ2VuZXJhdGVGaWVsZEdyb3VwUHJvbWlzZSIsIm1GYWlsZWRTaWRlRWZmZWN0c05hbWUiLCJzU2lkZUVmZmVjdENvbnRleHRQYXRoIiwiYUZhaWxlZFNpZGVFZmZlY3RzIiwibVNpZGVFZmZlY3RDb250ZXh0UGF0aCIsImJTdWNjZXNzIiwib0ZpZWxkQmluZGluZyIsIl9nZXRCaW5kaW5nRm9yRmllbGQiLCJhRmllbGRQYXRocyIsImdldEJpbmRpbmdzIiwic1BhdGgiLCJDb250cm9sbGVyRXh0ZW5zaW9uIiwiUHVibGljIiwiRmluYWwiLCJQcml2YXRlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztNQW9ETUEsOEIsV0FETEMsUUFBUSxDQUFDLDhDQUFELEVBQWlEQywyQkFBakQsQyxVQVNQQyxRQUFRLEU7Ozs7Ozs7Ozs7Ozs7K0JBQ087QUFDZixhQUFLQyxNQUFMLEdBQWUsSUFBRCxDQUFjQyxJQUFkLENBQW1CQyxPQUFuQixFQUFkO0FBQ0EsYUFBS0MsY0FBTCxHQUFzQkMsV0FBVyxDQUFDQyxlQUFaLENBQTRCLEtBQUtMLE1BQWpDLENBQXRCO0FBQ0EsYUFBS00sb0JBQUwsR0FBNEIsS0FBS0gsY0FBTCxDQUFvQkkscUJBQXBCLEVBQTVCO0FBQ0EsYUFBS0MsaUJBQUwsR0FBeUIsRUFBekI7QUFDQSxhQUFLQyx5QkFBTCxHQUFpQyxJQUFJQyxHQUFKLEVBQWpDO0FBQ0EsYUFBS0MsbUJBQUwsR0FBMkIsRUFBM0I7QUFDQTtBQUVEOzs7Ozs7Ozs7OENBUXFDO0FBQ3BDLGFBQUtGLHlCQUFMLENBQStCRyxLQUEvQjtBQUNBO0FBRUQ7Ozs7Ozs7Ozs7b0RBU2lFO0FBQ2hFLGVBQU8sS0FBS0QsbUJBQVo7QUFDQTtBQUVEOzs7Ozs7Ozs7Ozs7Ozs7d0NBY3lCRSxNLEVBQWtCQyx1QixFQUFzRDtBQUFBOztBQUNoRyxZ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O0lBNW5CMkN3RSxtQiw2TkF3QjNDQyxNLEVBQ0FDLEssaUxBWUFELE0sRUFDQUMsSyw2S0FpQkFELE0sRUFDQUMsSyx3S0E2Q0FELE0sRUFDQUMsSyw0S0FrRkFELE0sRUFDQUMsSyw2S0FXQUQsTSxFQUNBQyxLLDBLQWNBRCxNLEVBQ0FDLEssMktBZ0NBRCxNLEVBQ0FDLEssOEtBa0JBQyxPLEVBQ0FELEssK0tBOEdBQyxPLEVBQ0FELEs7U0F3UWEzTCw4QiIsInNvdXJjZVJvb3QiOiIuIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29udHJvbGxlckV4dGVuc2lvbiB9IGZyb20gXCJzYXAvdWkvY29yZS9tdmNcIjtcbmltcG9ydCB7IEJpbmRpbmcsIENvbnRleHQgfSBmcm9tIFwic2FwL3VpL21vZGVsXCI7XG5pbXBvcnQgeyBDb250cm9sbGVyRXh0ZW5zaW9uTWV0YWRhdGEgfSBmcm9tIFwic2FwL2ZlL2NvcmUvY29udHJvbGxlcmV4dGVuc2lvbnNcIjtcbmltcG9ydCB7IFVJNUNsYXNzLCBPdmVycmlkZSwgUHVibGljLCBGaW5hbCwgUHJpdmF0ZSB9IGZyb20gXCIuLi9oZWxwZXJzL0NsYXNzU3VwcG9ydFwiO1xuaW1wb3J0IHsgQXBwQ29tcG9uZW50LCBDb21tb25VdGlscyB9IGZyb20gXCJzYXAvZmUvY29yZVwiO1xuaW1wb3J0IHsgQ29udHJvbCB9IGZyb20gXCJzYXAvdWkvY29yZVwiO1xuaW1wb3J0IHtcblx0U2lkZUVmZmVjdHNUeXBlLFxuXHRDb250cm9sU2lkZUVmZmVjdHNUeXBlLFxuXHRPRGF0YVNpZGVFZmZlY3RzVHlwZSxcblx0Q29udHJvbFNpZGVFZmZlY3RzRW50aXR5RGljdGlvbmFyeVxufSBmcm9tIFwic2FwL2ZlL2NvcmUvc2VydmljZXMvU2lkZUVmZmVjdHNTZXJ2aWNlRmFjdG9yeVwiO1xuaW1wb3J0IHsgZ2V0RmllbGRTdGF0ZU9uQ2hhbmdlIH0gZnJvbSBcInNhcC9mZS9tYWNyb3MvZmllbGQvRmllbGRSdW50aW1lXCI7XG5pbXBvcnQgeyBDb252ZXJ0ZXJPdXRwdXQsIFByb3BlcnR5UGF0aCwgRW50aXR5VHlwZSB9IGZyb20gXCJAc2FwLXV4L3ZvY2FidWxhcmllcy10eXBlc1wiO1xuaW1wb3J0IHsgTG9nIH0gZnJvbSBcInNhcC9iYXNlXCI7XG5cbnR5cGUgRmllbGRDb250cm9sID0gQ29udHJvbCAmIHtcblx0Z2V0RmllbGRIZWxwKCk6IHN0cmluZztcblx0Z2V0RmllbGRHcm91cElkcygpOiBzdHJpbmdbXTtcbn07XG5cbnR5cGUgRmllbGRFdmVudFByb3BlcnR5VHlwZSA9IHtcblx0cHJvbWlzZTogUHJvbWlzZTxhbnk+O1xuXHRmaWVsZDogRmllbGRDb250cm9sO1xuXHRzaWRlRWZmZWN0c01hcDogRmllbGRTaWRlRWZmZWN0RGljdGlvbmFyeTtcbn07XG5cbnR5cGUgRmllbGRTaWRlRWZmZWN0UHJvcGVydHlUeXBlID0ge1xuXHRuYW1lOiBzdHJpbmc7XG5cdGltbWVkaWF0ZT86IGJvb2xlYW47XG5cdGNvbnRleHQ6IENvbnRleHQ7XG5cdHNpZGVFZmZlY3RzOiBTaWRlRWZmZWN0c1R5cGU7XG5cdHByZXZpb3VzbHlGYWlsZWQ/OiBib29sZWFuO1xufTtcblxudHlwZSBGaWVsZFNpZGVFZmZlY3REaWN0aW9uYXJ5ID0gUmVjb3JkPHN0cmluZywgRmllbGRTaWRlRWZmZWN0UHJvcGVydHlUeXBlPjtcblxudHlwZSBGYWlsZWRTaWRlRWZmZWN0RGljdGlvbmFyeSA9IFJlY29yZDxzdHJpbmcsIFNpZGVFZmZlY3RzVHlwZVtdPjtcblxudHlwZSBGaWVsZEdyb3VwU2lkZUVmZmVjdFR5cGUgPSB7XG5cdHByb21pc2VzOiBQcm9taXNlPGFueT5bXTtcblx0c2lkZUVmZmVjdFByb3BlcnR5OiBGaWVsZFNpZGVFZmZlY3RQcm9wZXJ0eVR5cGU7XG5cdHByb2Nlc3NTdGFydGVkPzogYm9vbGVhbjtcbn07XG5cbnR5cGUgRmllbGRHcm91cFF1ZXVlTWFwVHlwZSA9IHtcblx0W3NpZGVFZmZlY3ROYW1lOiBzdHJpbmddOiB7XG5cdFx0W2NvbnRleHRQYXRoOiBzdHJpbmddOiBGaWVsZEdyb3VwU2lkZUVmZmVjdFR5cGU7XG5cdH07XG59O1xuXG5AVUk1Q2xhc3MoXCJzYXAuZmUuY29yZS5jb250cm9sbGVyZXh0ZW5zaW9ucy5TaWRlRWZmZWN0c1wiLCBDb250cm9sbGVyRXh0ZW5zaW9uTWV0YWRhdGEpXG5jbGFzcyBTaWRlRWZmZWN0c0NvbnRyb2xsZXJFeHRlbnNpb24gZXh0ZW5kcyBDb250cm9sbGVyRXh0ZW5zaW9uIHtcblx0cHJpdmF0ZSBfb1ZpZXc6IGFueTtcblx0cHJpdmF0ZSBfb0FwcENvbXBvbmVudCE6IEFwcENvbXBvbmVudDtcblx0cHJpdmF0ZSBfbUZpZWxkR3JvdXBRdWV1ZSE6IEZpZWxkR3JvdXBRdWV1ZU1hcFR5cGU7XG5cdHByaXZhdGUgX2FTb3VyY2VQcm9wZXJ0aWVzRmFpbHVyZSE6IFNldDxzdHJpbmc+O1xuXHRwcml2YXRlIF9vU2lkZUVmZmVjdHNTZXJ2aWNlITogYW55O1xuXHRwcml2YXRlIF9tRmFpbGVkU2lkZUVmZmVjdHMhOiBGYWlsZWRTaWRlRWZmZWN0RGljdGlvbmFyeTtcblxuXHRAT3ZlcnJpZGUoKVxuXHRwdWJsaWMgb25Jbml0KCkge1xuXHRcdHRoaXMuX29WaWV3ID0gKHRoaXMgYXMgYW55KS5iYXNlLmdldFZpZXcoKTtcblx0XHR0aGlzLl9vQXBwQ29tcG9uZW50ID0gQ29tbW9uVXRpbHMuZ2V0QXBwQ29tcG9uZW50KHRoaXMuX29WaWV3KTtcblx0XHR0aGlzLl9vU2lkZUVmZmVjdHNTZXJ2aWNlID0gdGhpcy5fb0FwcENvbXBvbmVudC5nZXRTaWRlRWZmZWN0c1NlcnZpY2UoKTtcblx0XHR0aGlzLl9tRmllbGRHcm91cFF1ZXVlID0ge307XG5cdFx0dGhpcy5fYVNvdXJjZVByb3BlcnRpZXNGYWlsdXJlID0gbmV3IFNldCgpO1xuXHRcdHRoaXMuX21GYWlsZWRTaWRlRWZmZWN0cyA9IHt9O1xuXHR9XG5cblx0LyoqXG5cdCAqIENsZWFyIHJlY29yZGVkIHZhbGlkYXRpb24gc3RhdHVzIGZvciBhbGwgcHJvcGVydGllcy5cblx0ICpcblx0ICogQGZ1bmN0aW9uXG5cdCAqIEBuYW1lIGNsZWFyUHJvcGVydGllc1N0YXR1c1xuXHQgKi9cblx0QFB1YmxpY1xuXHRARmluYWxcblx0cHVibGljIGNsZWFyUHJvcGVydGllc1N0YXR1cygpOiB2b2lkIHtcblx0XHR0aGlzLl9hU291cmNlUHJvcGVydGllc0ZhaWx1cmUuY2xlYXIoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBHZXRzIGZhaWxlZCBTaWRlRWZmZWN0cy5cblx0ICpcblx0ICogQGZ1bmN0aW9uXG5cdCAqIEBuYW1lIGdldFJlZ2lzdGVyZWRGYWlsZWRSZXF1ZXN0c1xuXHQgKiBAcmV0dXJucyB7b2JqZWN0fSBSZWdpc3RlcmVkIFNpZGVFZmZlY3RzIHJlcXVlc3RzIHRoYXQgaGF2ZSBmYWlsZWRcblx0ICovXG5cdEBQdWJsaWNcblx0QEZpbmFsXG5cdHB1YmxpYyBnZXRSZWdpc3RlcmVkRmFpbGVkUmVxdWVzdHMoKTogRmFpbGVkU2lkZUVmZmVjdERpY3Rpb25hcnkge1xuXHRcdHJldHVybiB0aGlzLl9tRmFpbGVkU2lkZUVmZmVjdHM7XG5cdH1cblxuXHQvKipcblx0ICogTWFuYWdlcyB0aGUgd29ya2Zsb3cgZm9yIFNpZGVFZmZlY3RzIHdpdGggcmVsYXRlZCBjaGFuZ2VzIHRvIGEgZmllbGRcblx0ICogVGhlIGZvbGxvd2luZyBzY2VuYXJpb3MgYXJlIG1hbmFnZWQ6XG5cdCAqICAtIEV4ZWN1dGU6IHRyaWdnZXJzIGltbWVkaWF0ZSBTaWRlRWZmZWN0cyByZXF1ZXN0cyBpZiB0aGUgcHJvbWlzZSBmb3IgdGhlIGZpZWxkIGV2ZW50IGlzIGZ1bGZpbGxlZFxuXHQgKiAgLSBSZWdpc3RlcjogY2FjaGVzIGRlZmVycmVkIFNpZGVFZmZlY3RzIHRoYXQgd2lsbCBiZSBleGVjdXRlZCB3aGVuIHRoZSBGaWVsZEdyb3VwIGlzIHVuZm9jdXNlZC5cblx0ICpcblx0ICogQGZ1bmN0aW9uXG5cdCAqIEBuYW1lIGhhbmRsZUZpZWxkQ2hhbmdlXG5cdCAqIEBwYXJhbSB7b2JqZWN0fSBvRXZlbnQgU0FQVUk1IGV2ZW50IHRoYXQgY29tZXMgZnJvbSBhIGZpZWxkIGNoYW5nZVxuXHQgKiBAcGFyYW0ge29iamVjdH0gb0ZpZWxkR3JvdXBQcmVSZXF1aXNpdGUgUHJvbWlzZSB0byBiZSBmdWxmaWxsZWQgYmVmb3JlIGV4ZWN1dGluZyBkZWZlcnJlZCBTaWRlRWZmZWN0c1xuXHQgKiBAcmV0dXJucyB7b2JqZWN0fSAgUHJvbWlzZSBvbiBTaWRlRWZmZWN0cyByZXF1ZXN0KHMpXG5cdCAqL1xuXHRAUHVibGljXG5cdEBGaW5hbFxuXHRwdWJsaWMgaGFuZGxlRmllbGRDaGFuZ2Uob0V2ZW50OiBVSTVFdmVudCwgb0ZpZWxkR3JvdXBQcmVSZXF1aXNpdGU/OiBQcm9taXNlPGFueT4pOiBQcm9taXNlPGFueT4ge1xuXHRcdGNvbnN0IG1FdmVudEZpZWxkUHJvcGVydGllcyA9IHRoaXMuX2dldEZpZWxkUHJvcGVydGllcyhvRXZlbnQpLFxuXHRcdFx0YUltbWVkaWF0ZVNpZGVFZmZlY3RzUHJvcGVydGllczogRmllbGRTaWRlRWZmZWN0UHJvcGVydHlUeXBlW10gPSB0aGlzLl9pbml0aWFsaXplRmllbGRTaWRlRWZmZWN0cyhcblx0XHRcdFx0bUV2ZW50RmllbGRQcm9wZXJ0aWVzLFxuXHRcdFx0XHRvRmllbGRHcm91cFByZVJlcXVpc2l0ZVxuXHRcdFx0KTtcblxuXHRcdGxldCBiSXNJbW1lZGlhdGVUcmlnZ2VyZWQgPSBmYWxzZTtcblxuXHRcdHJldHVybiB0aGlzLl9nZW5lcmF0ZUltbWVkaWF0ZVByb21pc2UobUV2ZW50RmllbGRQcm9wZXJ0aWVzKVxuXHRcdFx0LnRoZW4oKCkgPT4ge1xuXHRcdFx0XHRiSXNJbW1lZGlhdGVUcmlnZ2VyZWQgPSB0cnVlO1xuXHRcdFx0XHRyZXR1cm4gUHJvbWlzZS5hbGwoXG5cdFx0XHRcdFx0YUltbWVkaWF0ZVNpZGVFZmZlY3RzUHJvcGVydGllcy5tYXAobVNpZGVFZmZlY3RzUHJvcGVydHkgPT4ge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHRoaXMucmVxdWVzdFNpZGVFZmZlY3RzKG1TaWRlRWZmZWN0c1Byb3BlcnR5LnNpZGVFZmZlY3RzLCBtU2lkZUVmZmVjdHNQcm9wZXJ0eS5jb250ZXh0KTtcblx0XHRcdFx0XHR9KSB8fCBbXVxuXHRcdFx0XHQpO1xuXHRcdFx0fSlcblx0XHRcdC5jYXRjaChvRXJyb3IgPT4ge1xuXHRcdFx0XHRpZiAoYklzSW1tZWRpYXRlVHJpZ2dlcmVkKSB7XG5cdFx0XHRcdFx0TG9nLmRlYnVnKFwiRXJyb3Igd2hpbGUgcHJvY2Vzc2luZyBGaWVsZCBTaWRlRWZmZWN0c1wiLCBvRXJyb3IpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdC8qKlxuXHRcdFx0XHRcdCAqIFNpZGVFZmZlY3RzIGhhdmUgbm90IGJlZW4gdHJpZ2dlcmVkIHNpbmNlIHByZVJlcXVpc2l0ZSB2YWxpZGF0aW9uIGZhaWxzIHNvIHdlIG5lZWRcblx0XHRcdFx0XHQgKiB0byBrZWVwIHByZXZpb3VzbHkgZmFpbGVkIHJlcXVlc3QgYXMgRmFpbGVkIHJlcXVlc3QgKHRvIGJlIHJldHJpZ2dlciBvbiBuZXh0IGNoYW5nZSlcblx0XHRcdFx0XHQgKi9cblxuXHRcdFx0XHRcdGFJbW1lZGlhdGVTaWRlRWZmZWN0c1Byb3BlcnRpZXNcblx0XHRcdFx0XHRcdC5maWx0ZXIobUltbWVkaWF0ZVNpZGVFZmZlY3RzID0+IG1JbW1lZGlhdGVTaWRlRWZmZWN0cy5wcmV2aW91c2x5RmFpbGVkID09PSB0cnVlKVxuXHRcdFx0XHRcdFx0LmZvckVhY2gobUltbWVkaWF0ZVNpZGVFZmZlY3RzID0+XG5cdFx0XHRcdFx0XHRcdHRoaXMuX2FkZEZhaWxlZFNpZGVFZmZlY3RzKG1JbW1lZGlhdGVTaWRlRWZmZWN0cy5zaWRlRWZmZWN0cywgbUltbWVkaWF0ZVNpZGVFZmZlY3RzLmNvbnRleHQpXG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBNYW5hZ2VzIFNpZGVFZmZlY3RzIHdpdGggYSByZWxhdGVkICdmb2N1cyBvdXQnIHRvIGEgZmllbGQgZ3JvdXAuXG5cdCAqXG5cdCAqIEBmdW5jdGlvblxuXHQgKiBAbmFtZSBoYW5kbGVGaWVsZEdyb3VwQ2hhbmdlXG5cdCAqIEBwYXJhbSB7b2JqZWN0fSBvRXZlbnQgU0FQVUk1IEV2ZW50XG5cdCAqIEByZXR1cm5zIHtvYmplY3R9IFByb21pc2Ugb24gU2lkZUVmZmVjdHMgcmVxdWVzdChzKVxuXHQgKi9cblx0QFB1YmxpY1xuXHRARmluYWxcblx0cHVibGljIGhhbmRsZUZpZWxkR3JvdXBDaGFuZ2Uob0V2ZW50OiBVSTVFdmVudCk6IFByb21pc2U8YW55PiB7XG5cdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby10aGlzLWFsaWFzXG5cdFx0Y29uc3QgdGhhdCA9IHRoaXMsXG5cdFx0XHRhRGVmZXJyZWRTaWRlRWZmZWN0czogRmllbGRHcm91cFNpZGVFZmZlY3RUeXBlW10gPSBbXSxcblx0XHRcdGFGaWVsZEdyb3VwSWRzOiBzdHJpbmdbXSA9IG9FdmVudC5nZXRQYXJhbWV0ZXIoXCJmaWVsZEdyb3VwSWRzXCIpO1xuXG5cdFx0Y29uc3QgZ2V0RmllbGRHcm91cFJlcXVlc3RQcm9taXNlID0gZnVuY3Rpb24ob0RlZmVycmVkU2lkZUVmZmVjdDogRmllbGRHcm91cFNpZGVFZmZlY3RUeXBlKSB7XG5cdFx0XHRsZXQgYklzUmVxdWVzdHNUcmlnZ2VyZWQgPSBmYWxzZTtcblx0XHRcdGNvbnN0IG9TaWRlRWZmZWN0UHJvcGVydHkgPSBvRGVmZXJyZWRTaWRlRWZmZWN0LnNpZGVFZmZlY3RQcm9wZXJ0eTtcblx0XHRcdGNvbnN0IG9Db250ZXh0ID0gb1NpZGVFZmZlY3RQcm9wZXJ0eS5jb250ZXh0O1xuXHRcdFx0Y29uc3Qgc0NvbnRleHRQYXRoID0gb0NvbnRleHQuZ2V0UGF0aCgpO1xuXHRcdFx0Y29uc3Qgc0VudGl0eVR5cGUgPSB0aGF0Ll9vU2lkZUVmZmVjdHNTZXJ2aWNlLmdldEVudGl0eVR5cGVGcm9tQ29udGV4dChvQ29udGV4dCk7XG5cdFx0XHRjb25zdCBtRW50aXR5VHlwZSA9IHRoYXQuX2dldEVudGl0eVR5cGVGcm9tRlFOKHNFbnRpdHlUeXBlKTtcblxuXHRcdFx0cmV0dXJuIFByb21pc2UuYWxsKG9EZWZlcnJlZFNpZGVFZmZlY3QucHJvbWlzZXMpXG5cdFx0XHRcdC50aGVuKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdGJJc1JlcXVlc3RzVHJpZ2dlcmVkID0gdHJ1ZTtcblxuXHRcdFx0XHRcdC8vRGVmZXJyZWQgU2lkZUVmZmVjdHMgYXJlIGV4ZWN1dGVkIG9ubHkgaWYgYWxsIHNvdXJjZVByb3BlcnRpZXMgaGF2ZSBubyByZWdpc3RlcmVkIGZhaWx1cmUuXG5cdFx0XHRcdFx0aWYgKFxuXHRcdFx0XHRcdFx0bUVudGl0eVR5cGUgJiZcblx0XHRcdFx0XHRcdChvU2lkZUVmZmVjdFByb3BlcnR5LnNpZGVFZmZlY3RzLlNvdXJjZVByb3BlcnRpZXMgYXMgUHJvcGVydHlQYXRoW10pLmV2ZXJ5KHNvdXJjZVByb3BlcnR5ID0+IHtcblx0XHRcdFx0XHRcdFx0aWYgKHNvdXJjZVByb3BlcnR5LnR5cGUgPT09IFwiUHJvcGVydHlQYXRoXCIpIHtcblx0XHRcdFx0XHRcdFx0XHRjb25zdCBzSWQgPSB0aGF0Ll9nZW5lcmF0ZVN0YXR1c0luZGV4KG1FbnRpdHlUeXBlLCBzb3VyY2VQcm9wZXJ0eS52YWx1ZSwgb0NvbnRleHQpO1xuXHRcdFx0XHRcdFx0XHRcdGlmIChzSWQpIHtcblx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiAhdGhhdC5fYVNvdXJjZVByb3BlcnRpZXNGYWlsdXJlLmhhcyhzSWQpO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gdGhhdC5yZXF1ZXN0U2lkZUVmZmVjdHMob1NpZGVFZmZlY3RQcm9wZXJ0eS5zaWRlRWZmZWN0cywgb1NpZGVFZmZlY3RQcm9wZXJ0eS5jb250ZXh0KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0XHRcdH0pXG5cdFx0XHRcdC5jYXRjaChvRXJyb3IgPT4ge1xuXHRcdFx0XHRcdGlmIChiSXNSZXF1ZXN0c1RyaWdnZXJlZCkge1xuXHRcdFx0XHRcdFx0TG9nLmRlYnVnKFwiRXJyb3Igd2hpbGUgcHJvY2Vzc2luZyBGaWVsZEdyb3VwIFNpZGVFZmZlY3RzIG9uIGNvbnRleHQgXCIgKyBzQ29udGV4dFBhdGgsIG9FcnJvcik7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KVxuXHRcdFx0XHQuZmluYWxseSgoKSA9PiB7XG5cdFx0XHRcdFx0ZGVsZXRlIHRoYXQuX21GaWVsZEdyb3VwUXVldWVbb1NpZGVFZmZlY3RQcm9wZXJ0eS5uYW1lXVtzQ29udGV4dFBhdGhdO1xuXHRcdFx0XHR9KTtcblx0XHR9O1xuXG5cdFx0YUZpZWxkR3JvdXBJZHMuZm9yRWFjaChzRmllbGRHcm91cElkID0+IHtcblx0XHRcdC8qKlxuXHRcdFx0ICogc3RyaW5nIFwiJCRJbW1lZGlhdGVSZXF1ZXN0XCIgaXMgYWRkZWQgdG8gdGhlIFNpZGVFZmZlY3RzIG5hbWUgZHVyaW5nIHRlbXBsYXRpbmcgdG8ga25vd1xuXHRcdFx0ICogaWYgdGhpcyBTaWRlRWZmZWN0cyBtdXN0IGJlIGltbWVkaWF0ZWx5IGV4ZWN1dGVkIHJlcXVlc3RlZCAob24gZmllbGQgY2hhbmdlKSBvciBtdXN0XG5cdFx0XHQgKiBiZSBkZWZlcnJlZCAob24gZmllbGQgZ3JvdXAgZm9jdXMgb3V0KVxuXHRcdFx0ICpcblx0XHRcdCAqL1xuXHRcdFx0Y29uc3Qgc1NpZGVFZmZlY3ROYW1lOiBzdHJpbmcgPSBzRmllbGRHcm91cElkLnJlcGxhY2UoXCIkJEltbWVkaWF0ZVJlcXVlc3RcIiwgXCJcIik7XG5cdFx0XHRjb25zdCBtQ29udGV4dERlZmVycmVkU2lkZUVmZmVjdHMgPSB0aGF0Ll9tRmllbGRHcm91cFF1ZXVlPy5bc1NpZGVFZmZlY3ROYW1lXTtcblx0XHRcdGlmIChtQ29udGV4dERlZmVycmVkU2lkZUVmZmVjdHMpIHtcblx0XHRcdFx0T2JqZWN0LmtleXMobUNvbnRleHREZWZlcnJlZFNpZGVFZmZlY3RzKS5mb3JFYWNoKHNDb250ZXh0UGF0aCA9PiB7XG5cdFx0XHRcdFx0Y29uc3Qgb0RlZmVycmVkU2lkZUVmZmVjdCA9IG1Db250ZXh0RGVmZXJyZWRTaWRlRWZmZWN0c1tzQ29udGV4dFBhdGhdO1xuXHRcdFx0XHRcdGlmICghb0RlZmVycmVkU2lkZUVmZmVjdC5wcm9jZXNzU3RhcnRlZCkge1xuXHRcdFx0XHRcdFx0b0RlZmVycmVkU2lkZUVmZmVjdC5wcm9jZXNzU3RhcnRlZCA9IHRydWU7XG5cdFx0XHRcdFx0XHRhRGVmZXJyZWRTaWRlRWZmZWN0cy5wdXNoKG9EZWZlcnJlZFNpZGVFZmZlY3QpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gUHJvbWlzZS5hbGwoXG5cdFx0XHRhRGVmZXJyZWRTaWRlRWZmZWN0cy5tYXAob0RlZmVycmVkU2lkZUVmZmVjdCA9PiB7XG5cdFx0XHRcdHJldHVybiBnZXRGaWVsZEdyb3VwUmVxdWVzdFByb21pc2Uob0RlZmVycmVkU2lkZUVmZmVjdCk7XG5cdFx0XHR9KVxuXHRcdCk7XG5cdH1cblxuXHQvKipcblx0ICogQWRkcyBhIFNpZGVFZmZlY3RzIGNvbnRyb2wuXG5cdCAqXG5cdCAqIEBmdW5jdGlvblxuXHQgKiBAbmFtZSBhZGRDb250cm9sU2lkZUVmZmVjdHNcblx0ICogQHBhcmFtIHtzdHJpbmd9IHNFbnRpdHlUeXBlIE5hbWUgb2YgdGhlIGVudGl0eSB3aGVyZSB0aGUgU2lkZUVmZmVjdHMgY29udHJvbCB3aWxsIGJlIHJlZ2lzdGVyZWRcblx0ICogQHBhcmFtIHtvYmplY3R9IG9TaWRlRWZmZWN0cyBTaWRlRWZmZWN0cyB0byByZWdpc3Rlci4gRW5zdXJlIHRoZSBzb3VyY2VDb250cm9sSWQgbWF0Y2hlcyB0aGUgYXNzb2NpYXRlZCBTQVBVSTUgY29udHJvbCBJRC5cblx0ICpcblx0ICovXG5cdEBQdWJsaWNcblx0QEZpbmFsXG5cdHB1YmxpYyBhZGRDb250cm9sU2lkZUVmZmVjdHMoc0VudGl0eVR5cGU6IHN0cmluZywgb1NpZGVFZmZlY3RzOiBPbWl0PENvbnRyb2xTaWRlRWZmZWN0c1R5cGUsIFwiZnVsbHlRdWFsaWZpZWROYW1lXCI+KTogdm9pZCB7XG5cdFx0dGhpcy5fb1NpZGVFZmZlY3RzU2VydmljZS5hZGRDb250cm9sU2lkZUVmZmVjdHMoc0VudGl0eVR5cGUsIG9TaWRlRWZmZWN0cyk7XG5cdH1cblxuXHQvKipcblx0ICogUmVtb3ZlcyB0aGUgcXVldWUgY29udGFpbmluZyB0aGUgZmFpbGVkIFNpZGVFZmZlY3RzLlxuXHQgKlxuXHQgKiBAZnVuY3Rpb25cblx0ICogQG5hbWUgcmVtb3ZlRmFpbGVkU2lkZUVmZmVjdHNcblx0ICovXG5cdEBQdWJsaWNcblx0QEZpbmFsXG5cdHB1YmxpYyByZW1vdmVGYWlsZWRTaWRlRWZmZWN0cygpOiB2b2lkIHtcblx0XHR0aGlzLl9tRmFpbGVkU2lkZUVmZmVjdHMgPSB7fTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXF1ZXN0IFNpZGVFZmZlY3RzIG9uIGEgc3BlY2lmaWMgY29udGV4dC5cblx0ICpcblx0ICogQGZ1bmN0aW9uXG5cdCAqIEBuYW1lIHJlcXVlc3RTaWRlRWZmZWN0c1xuXHQgKiBAcGFyYW0ge29iamVjdH0gb1NpZGVFZmZlY3RzIFNpZGVFZmZlY3RzIHRvIGJlIGV4ZWN1dGVkXG5cdCAqIEBwYXJhbSB7b2JqZWN0fSBvQ29udGV4dCBDb250ZXh0IHdoZXJlIFNpZGVFZmZlY3RzIG5lZWQgdG8gYmUgZXhlY3V0ZWRcblx0ICogQHJldHVybnMge29iamVjdH0gU2lkZUVmZmVjdHMgcmVxdWVzdCBvbiBTQVBVSTUgY29udGV4dFxuXHQgKi9cblx0QFB1YmxpY1xuXHRARmluYWxcblx0cHVibGljIHJlcXVlc3RTaWRlRWZmZWN0cyhvU2lkZUVmZmVjdHM6IFNpZGVFZmZlY3RzVHlwZSwgb0NvbnRleHQ6IENvbnRleHQpOiBQcm9taXNlPGFueT4ge1xuXHRcdGxldCBmUmVzb2x2ZXI6IGFueSwgZlJlamVjdG9yOiBhbnk7XG5cdFx0Y29uc3Qgb1Byb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcblx0XHRcdGZSZXNvbHZlciA9IHJlc29sdmU7XG5cdFx0XHRmUmVqZWN0b3IgPSByZWplY3Q7XG5cdFx0fSk7XG5cdFx0Y29uc3QgYVRhcmdldHM6IGFueVtdID0gKChvU2lkZUVmZmVjdHMuVGFyZ2V0RW50aXRpZXMgYXMgYW55W10pIHx8IFtdKS5jb25jYXQoKG9TaWRlRWZmZWN0cy5UYXJnZXRQcm9wZXJ0aWVzIGFzIGFueVtdKSB8fCBbXSksXG5cdFx0XHRzVHJpZ2dlckFjdGlvbjogU3RyaW5nIHwgdW5kZWZpbmVkID0gKG9TaWRlRWZmZWN0cyBhcyBPRGF0YVNpZGVFZmZlY3RzVHlwZSkuVHJpZ2dlckFjdGlvbjtcblxuXHRcdGlmIChzVHJpZ2dlckFjdGlvbikge1xuXHRcdFx0dGhpcy5fb1NpZGVFZmZlY3RzU2VydmljZS5leGVjdXRlQWN0aW9uKHNUcmlnZ2VyQWN0aW9uLCBvQ29udGV4dCk7XG5cdFx0fVxuXG5cdFx0dGhpcy5fb1NpZGVFZmZlY3RzU2VydmljZVxuXHRcdFx0LnJlcXVlc3RTaWRlRWZmZWN0cyhhVGFyZ2V0cywgb0NvbnRleHQpXG5cdFx0XHQudGhlbigoKSA9PiBmUmVzb2x2ZXIoKSlcblx0XHRcdC5jYXRjaCgob0Vycm9yOiBhbnkpID0+IHtcblx0XHRcdFx0dGhpcy5fYWRkRmFpbGVkU2lkZUVmZmVjdHMob1NpZGVFZmZlY3RzLCBvQ29udGV4dCk7XG5cdFx0XHRcdGZSZWplY3RvcihvRXJyb3IpO1xuXHRcdFx0fSk7XG5cblx0XHRyZXR1cm4gb1Byb21pc2U7XG5cdH1cblxuXHQvKipcblx0ICogUmVtb3ZlcyBTaWRlRWZmZWN0cyBjcmVhdGVkIGJ5IGEgY29udHJvbC5cblx0ICpcblx0ICogQGZ1bmN0aW9uXG5cdCAqIEBuYW1lIHJlbW92ZUNvbnRyb2xTaWRlRWZmZWN0c1xuXHQgKiBAcGFyYW0ge29iamVjdH0gb0NvbnRyb2wgU0FQVUk1IENvbnRyb2xcblx0ICovXG5cdEBQdWJsaWNcblx0QEZpbmFsXG5cdHB1YmxpYyByZW1vdmVDb250cm9sU2lkZUVmZmVjdHMob0NvbnRyb2w6IENvbnRyb2wpOiB2b2lkIHtcblx0XHRjb25zdCBzQ29udHJvbElkID0gb0NvbnRyb2wgJiYgb0NvbnRyb2wuaXNBICYmIG9Db250cm9sLmlzQShcInNhcC51aS5iYXNlLk1hbmFnZWRPYmplY3RcIikgJiYgb0NvbnRyb2wuZ2V0SWQoKTtcblxuXHRcdGlmIChzQ29udHJvbElkKSB7XG5cdFx0XHR0aGlzLl9vU2lkZUVmZmVjdHNTZXJ2aWNlLnJlbW92ZUNvbnRyb2xTaWRlRWZmZWN0cyhzQ29udHJvbElkKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogQWRkcyBTaWRlRWZmZWN0cyB0byB0aGUgcXVldWUgb2YgdGhlIGZhaWxlZCBTaWRlRWZmZWN0c1xuXHQgKiBUaGUgU2lkZUVmZmVjdHMgd2lsbCBiZSByZXRyaWdnZXJlZCBvbiB0aGUgbmV4dCBjaGFuZ2Ugb24gdGhlIHNhbWUgY29udGV4dC5cblx0ICpcblx0ICogQGZ1bmN0aW9uXG5cdCAqIEBuYW1lIF9hZGRGYWlsZWRTaWRlRWZmZWN0c1xuXHQgKiBAcGFyYW0ge29iamVjdH0gb1NpZGVFZmZlY3RzIFNpZGVFZmZlY3RzIHRoYXQgbmVlZCB0byBiZSByZXRyaWdnZXJlZFxuXHQgKiBAcGFyYW0ge29iamVjdH0gb0NvbnRleHQgQ29udGV4dCB3aGVyZSBTaWRlRWZmZWN0cyBoYXZlIGZhaWxlZFxuXHQgKi9cblx0QFByaXZhdGVcblx0QEZpbmFsXG5cdHByaXZhdGUgX2FkZEZhaWxlZFNpZGVFZmZlY3RzKG9TaWRlRWZmZWN0czogU2lkZUVmZmVjdHNUeXBlLCBvQ29udGV4dDogQ29udGV4dCk6IHZvaWQge1xuXHRcdGNvbnN0IHNDb250ZXh0UGF0aDogc3RyaW5nID0gb0NvbnRleHQuZ2V0UGF0aCgpO1xuXHRcdHRoaXMuX21GYWlsZWRTaWRlRWZmZWN0c1tzQ29udGV4dFBhdGhdID0gdGhpcy5fbUZhaWxlZFNpZGVFZmZlY3RzW3NDb250ZXh0UGF0aF0gfHwgW107XG5cdFx0Y29uc3QgYklzTm90QWxyZWFkeUxpc3RlZCA9IHRoaXMuX21GYWlsZWRTaWRlRWZmZWN0c1tzQ29udGV4dFBhdGhdLmV2ZXJ5KFxuXHRcdFx0bUZhaWxlZFNpZGVFZmZlY3RzID0+IG9TaWRlRWZmZWN0cy5mdWxseVF1YWxpZmllZE5hbWUgIT09IG1GYWlsZWRTaWRlRWZmZWN0cy5mdWxseVF1YWxpZmllZE5hbWVcblx0XHQpO1xuXHRcdGlmIChiSXNOb3RBbHJlYWR5TGlzdGVkKSB7XG5cdFx0XHR0aGlzLl9tRmFpbGVkU2lkZUVmZmVjdHNbc0NvbnRleHRQYXRoXS5wdXNoKG9TaWRlRWZmZWN0cyk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIEdlbmVyYXRlcyB0aGUgcHJvbWlzZSBmb3IgdGhlIGZpZWxkIGdyb3VwIHRoYXQgaXMgcmVxdWlyZWQgYmVmb3JlIHJlcXVlc3RpbmcgU2lkZUVmZmVjdHMuXG5cdCAqIElmIHRoZSBwcm9taXNlIGlzIHJlamVjdGVkIGFuZCBvbmx5IHRoZSBmaWVsZCByZXF1aXJlcyB0aGUgU2lkZUVmZmVjdHMgb24gdGhpcyBjb250ZXh0LCB0aGUgU2lkZUVmZmVjdHMgYXJlIHJlbW92ZWQgZnJvbSB0aGVcblx0ICogU2lkZUVmZmVjdHMgcXVldWUuXG5cdCAqXG5cdCAqIEBmdW5jdGlvblxuXHQgKiBAbmFtZSBfZ2VuZXJhdGVGaWVsZEdyb3VwUHJvbWlzZVxuXHQgKiBAcGFyYW0ge29iamVjdH0gbUV2ZW50RmllbGRQcm9wZXJ0aWVzIEZpZWxkIHByb3BlcnRpZXNcblx0ICogQHJldHVybnMge29iamVjdH0gUHJvbWlzZSB0byBiZSB1c2VkIGZvciB0aGUgdmFsaWRhdGlvbiBvZiB0aGUgZmllbGRcblx0ICovXG5cdHByaXZhdGUgX2dlbmVyYXRlRmllbGRHcm91cFByb21pc2UobUV2ZW50RmllbGRQcm9wZXJ0aWVzOiBGaWVsZEV2ZW50UHJvcGVydHlUeXBlKTogUHJvbWlzZTxhbnk+IHtcblx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXRoaXMtYWxpYXNcblx0XHRjb25zdCB0aGF0ID0gdGhpcztcblxuXHRcdGxldCBiUHJvbWlzZVN1Y2Nlc3MgPSB0cnVlO1xuXHRcdHJldHVybiBtRXZlbnRGaWVsZFByb3BlcnRpZXMucHJvbWlzZVxuXHRcdFx0LnRoZW4oZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJldHVybiBiUHJvbWlzZVN1Y2Nlc3M7XG5cdFx0XHR9KVxuXHRcdFx0LmNhdGNoKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRiUHJvbWlzZVN1Y2Nlc3MgPSBmYWxzZTtcblx0XHRcdFx0cmV0dXJuIGJQcm9taXNlU3VjY2Vzcztcblx0XHRcdH0pXG5cdFx0XHQuZmluYWxseSgoKSA9PiB7XG5cdFx0XHRcdC8qKlxuXHRcdFx0XHQgKiBOZWVkIHRvIHN0b3JlIHRoZSBzdGF0dXMgb2YgcHJvcGVydGllcyByZWxhdGVkIHRvIHRoaXMgZmllbGQgZm9yIGRlZmVycmVkIFNpZGVFZmZlY3RzXG5cdFx0XHRcdCAqIHNpbmNlIGFsbCBTb3VyY2VQcm9wZXJ0aWVzIGZvciB0aGlzIGtpbmQgb2YgU2lkZUVmZmVjdHMgbXVzdCBiZSB2YWxpZFxuXHRcdFx0XHQgKi9cblx0XHRcdFx0dGhhdC5fc2F2ZUZpZWxkUHJvcGVydGllc1N0YXR1cyhtRXZlbnRGaWVsZFByb3BlcnRpZXMuZmllbGQsIGJQcm9taXNlU3VjY2Vzcyk7XG5cdFx0XHR9KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBHZW5lcmF0ZXMgdGhlIHByb21pc2UgZm9yIHRoZSBmaWVsZCB0aGF0IGlzIHJlcXVpcmVkIGJlZm9yZSByZXF1ZXN0aW5nIGltbWVkaWF0ZSBTaWRlRWZmZWN0cy5cblx0ICpcblx0ICogQGZ1bmN0aW9uXG5cdCAqIEBuYW1lIF9nZW5lcmF0ZUltbWVkaWF0ZVByb21pc2Vcblx0ICogQHBhcmFtIHtvYmplY3R9IG1FdmVudEZpZWxkUHJvcGVydGllcyBGaWVsZCBwcm9wZXJ0aWVzXG5cdCAqIEByZXR1cm5zIHtvYmplY3R9IFByb21pc2UgdG8gYmUgdXNlZCBmb3IgdGhlIHZhbGlkYXRpb24gb2YgdGhlIGZpZWxkXG5cdCAqL1xuXHRwcml2YXRlIF9nZW5lcmF0ZUltbWVkaWF0ZVByb21pc2UobUV2ZW50RmllbGRQcm9wZXJ0aWVzOiBGaWVsZEV2ZW50UHJvcGVydHlUeXBlKTogUHJvbWlzZTxhbnk+IHtcblx0XHRjb25zdCBvUHJvbWlzZSA9IG1FdmVudEZpZWxkUHJvcGVydGllcy5wcm9taXNlO1xuXHRcdHJldHVybiBvUHJvbWlzZS50aGVuKGZ1bmN0aW9uKCkge1xuXHRcdFx0LyoqXG5cdFx0XHQgKiBJZiB0aGUgZmllbGQgZ2V0cyBhIEZpZWxkSGVscGVyLCB3ZSBuZWVkIHRvIHdhaXQgdW50aWwgYWxsIGZpZWxkcyBjaGFuZ2VkIGJ5IHRoaXMgRmllbGRIZWxwZXIgaGF2ZSBiZWVuIHNldC5cblx0XHRcdCAqIFRvIGFjaGlldmUgdGhpcywgd2UgZW5zdXJlIHRoYXQgYWxsIHJlbGF0ZWQgYmluZGluZ3MgaGF2ZSBiZWVuIHJlc29sdmVkLlxuXHRcdFx0ICpcblx0XHRcdCAqIFRoaXMgcmVzb2x1dGlvbiBwcm9jZXNzIGlzIG5vdCBtYW5hZ2VkIGJ5IHRoZSBGaWVsZCBFdmVudCBQcm9taXNlLCBzbyBmb3IgZmFzdCB1c2VyIGFjdGlvbnMgKGxpa2UgYXV0b21hdGlvbikgaXQgY2FuIGxvY2sgdGhlIG1vZGVsXG5cdFx0XHQgKiBhbmQgbm8gcmVxdWVzdCBjYW4gYmUgZXhlY3V0ZWQuXG5cdFx0XHQgKi9cblx0XHRcdGNvbnN0IG9GaWVsZCA9IG1FdmVudEZpZWxkUHJvcGVydGllcy5maWVsZDtcblx0XHRcdGNvbnN0IHNGaWVsZEhlbHBlcklkID0gb0ZpZWxkLmdldEZpZWxkSGVscCAmJiBvRmllbGQuZ2V0RmllbGRIZWxwKCk7XG5cdFx0XHRpZiAoc0ZpZWxkSGVscGVySWQpIHtcblx0XHRcdFx0Y29uc3Qgb0ZpbHRlckhlbHA6IGFueSA9IHNhcC51aS5nZXRDb3JlKCkuYnlJZChzRmllbGRIZWxwZXJJZCk7XG5cdFx0XHRcdGlmIChvRmlsdGVySGVscCkge1xuXHRcdFx0XHRcdHJldHVybiBQcm9taXNlLmFsbChcblx0XHRcdFx0XHRcdChvRmlsdGVySGVscC5nZXRPdXRQYXJhbWV0ZXJzKCkgYXMgYW55W10pLm1hcChvT3V0UGFyYW1ldGVyID0+IHtcblx0XHRcdFx0XHRcdFx0Y29uc3Qgb0JpbmRpbmcgPSBvT3V0UGFyYW1ldGVyLmdldEJpbmRpbmcoXCJ2YWx1ZVwiKTtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIG9CaW5kaW5nID8gb0JpbmRpbmcucmVxdWVzdFZhbHVlKCkgOiBQcm9taXNlLnJlc29sdmUoKTtcblx0XHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIFByb21pc2UuYWxsKFtdKTtcblx0XHR9KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBHZW5lcmF0ZXMgYSBzdGF0dXMgaW5kZXguXG5cdCAqXG5cdCAqIEBmdW5jdGlvblxuXHQgKiBAbmFtZSBfZ2VuZXJhdGVTdGF0dXNJbmRleFxuXHQgKiBAcGFyYW0ge29iamVjdH0gbUVudGl0eVR5cGUgVGhlIGVudGl0eSB0eXBlXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBzUHJvcGVydHlQYXRoIFRoZSBwcm9wZXJ0eSBwYXRoXG5cdCAqIEBwYXJhbSB7b2JqZWN0fSBvQ29udGV4dCBTQVBVSTUgQ29udGV4dFxuXHQgKiBAcmV0dXJucyB7c3RyaW5nIHwgdW5kZWZpbmVkfSBJbmRleFxuXHQgKi9cblx0cHJpdmF0ZSBfZ2VuZXJhdGVTdGF0dXNJbmRleChtRW50aXR5VHlwZTogRW50aXR5VHlwZSwgc1Byb3BlcnR5UGF0aDogc3RyaW5nLCBvQ29udGV4dDogQ29udGV4dCk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG5cdFx0Y29uc3Qgc0NvbnRleHRQYXRoID0gb0NvbnRleHQuZ2V0UGF0aCgpO1xuXHRcdGNvbnN0IG1Qcm9wZXJ0eSA9IG1FbnRpdHlUeXBlLnJlc29sdmVQYXRoKHNQcm9wZXJ0eVBhdGgpO1xuXHRcdGlmIChtUHJvcGVydHkpIHtcblx0XHRcdGlmIChtUHJvcGVydHkgJiYgbVByb3BlcnR5Ll90eXBlID09PSBcIlByb3BlcnR5XCIpIHtcblx0XHRcdFx0cmV0dXJuIFttUHJvcGVydHkuZnVsbHlRdWFsaWZpZWROYW1lLCBzQ29udGV4dFBhdGhdLmpvaW4oXCJfX1wiKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHVuZGVmaW5lZDtcblx0fVxuXG5cdC8qKlxuXHQgKiBHZXRzIHRoZSBhcHByb3ByaWF0ZSBjb250ZXh0IG9uIHdoaWNoIFNpZGVFZmZlY3RzIGNhbiBiZSByZXF1ZXN0ZWQuXG5cdCAqIFRoZSBjb3JyZWN0IG9uZSBtdXN0IGhhdmUgdGhlIGJpbmRpbmcgcGFyYW1ldGVyICQkcGF0Y2hXaXRob3V0U2lkZUVmZmVjdHMuXG5cdCAqXG5cdCAqIEBmdW5jdGlvblxuXHQgKiBAbmFtZSBfZ2V0Q29udGV4dEZvclNpZGVFZmZlY3RzXG5cdCAqIEBwYXJhbSB7b2JqZWN0fSBvU291cmNlRmllbGQgRmllbGRcblx0ICogQHBhcmFtIHtzdHJpbmd9IHNTaWRlRWZmZWN0RW50aXR5VHlwZSBUYXJnZXQgZW50aXR5IHR5cGUgb2YgdGhlIFNpZGVFZmZlY3RzIGFubm90YXRpb25cblx0ICogQHJldHVybnMge29iamVjdH0gU0FQVUk1IENvbnRleHRcblx0ICovXG5cdEBQcml2YXRlXG5cdEBGaW5hbFxuXHRwcml2YXRlIF9nZXRDb250ZXh0Rm9yU2lkZUVmZmVjdHMob1NvdXJjZUZpZWxkOiBGaWVsZENvbnRyb2wsIHNTaWRlRWZmZWN0RW50aXR5VHlwZTogc3RyaW5nKTogQ29udGV4dCB8IHVuZGVmaW5lZCB7XG5cdFx0Y29uc3Qgb0JpbmRpbmdDb250ZXh0ID0gb1NvdXJjZUZpZWxkLmdldEJpbmRpbmdDb250ZXh0KCk7XG5cdFx0bGV0IG9Db250ZXh0Rm9yU2lkZUVmZmVjdHMgPSBvQmluZGluZ0NvbnRleHQsXG5cdFx0XHRzRW50aXR5VHlwZSA9IHRoaXMuX29TaWRlRWZmZWN0c1NlcnZpY2UuZ2V0RW50aXR5VHlwZUZyb21Db250ZXh0KG9CaW5kaW5nQ29udGV4dCk7XG5cblx0XHRpZiAoc1NpZGVFZmZlY3RFbnRpdHlUeXBlICE9PSBzRW50aXR5VHlwZSkge1xuXHRcdFx0b0NvbnRleHRGb3JTaWRlRWZmZWN0cyA9IChvQmluZGluZ0NvbnRleHQgYXMgYW55KS5nZXRCaW5kaW5nKCkuZ2V0Q29udGV4dCgpO1xuXHRcdFx0aWYgKG9Db250ZXh0Rm9yU2lkZUVmZmVjdHMpIHtcblx0XHRcdFx0c0VudGl0eVR5cGUgPSB0aGlzLl9vU2lkZUVmZmVjdHNTZXJ2aWNlLmdldEVudGl0eVR5cGVGcm9tQ29udGV4dChvQ29udGV4dEZvclNpZGVFZmZlY3RzKTtcblx0XHRcdFx0aWYgKHNTaWRlRWZmZWN0RW50aXR5VHlwZSAhPT0gc0VudGl0eVR5cGUpIHtcblx0XHRcdFx0XHRvQ29udGV4dEZvclNpZGVFZmZlY3RzID0gKG9Db250ZXh0Rm9yU2lkZUVmZmVjdHMgYXMgYW55KS5nZXRCaW5kaW5nKCkuZ2V0Q29udGV4dCgpO1xuXHRcdFx0XHRcdGlmIChvQ29udGV4dEZvclNpZGVFZmZlY3RzKSB7XG5cdFx0XHRcdFx0XHRzRW50aXR5VHlwZSA9IHRoaXMuX29TaWRlRWZmZWN0c1NlcnZpY2UuZ2V0RW50aXR5VHlwZUZyb21Db250ZXh0KG9Db250ZXh0Rm9yU2lkZUVmZmVjdHMpO1xuXHRcdFx0XHRcdFx0aWYgKHNTaWRlRWZmZWN0RW50aXR5VHlwZSAhPT0gc0VudGl0eVR5cGUpIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHVuZGVmaW5lZDtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gb0NvbnRleHRGb3JTaWRlRWZmZWN0cyB8fCB1bmRlZmluZWQ7XG5cdH1cblxuXHQvKipcblx0ICogUmV0cmlldmVzIHRoZSBFbnRpdHlUeXBlIGJhc2VkIG9uIGl0cyBmdWxseS1xdWFsaWZpZWQgbmFtZS5cblx0ICpcblx0ICogQHBhcmFtIHtzdHJpbmd9IHNGdWxseVF1YWxpZmllZE5hbWUgVGhlIGZ1bGx5LXF1YWxpZmllZCBuYW1lXG5cdCAqIEByZXR1cm5zIHtvYmplY3R9IFRoZSBlbnRpdHkgdHlwZVxuXHQgKi9cblx0cHJpdmF0ZSBfZ2V0RW50aXR5VHlwZUZyb21GUU4oc0Z1bGx5UXVhbGlmaWVkTmFtZTogc3RyaW5nKTogRW50aXR5VHlwZSB8IHVuZGVmaW5lZCB7XG5cdFx0Y29uc3QgbUVudGl0eVR5cGUgPSAodGhpcy5fb1NpZGVFZmZlY3RzU2VydmljZS5nZXRDb252ZXJ0ZWRNZXRhTW9kZWwoKSBhcyBDb252ZXJ0ZXJPdXRwdXQpLmVudGl0eVR5cGVzLmZpbmQob0VudGl0eVR5cGUgPT4ge1xuXHRcdFx0cmV0dXJuIG9FbnRpdHlUeXBlLmZ1bGx5UXVhbGlmaWVkTmFtZSA9PT0gc0Z1bGx5UXVhbGlmaWVkTmFtZTtcblx0XHR9KTtcblx0XHRyZXR1cm4gbUVudGl0eVR5cGU7XG5cdH1cblxuXHQvKipcblx0ICogR2V0cyB0aGUgcHJvbWlzZSBvZiB0aGUgZmllbGQgdmFsaWRhdGlvbiB0aGF0IGlzIHJlcXVpcmVkIGZvciB0aGUgU2lkZUVmZmVjdHMgcHJvY2Vzcy5cblx0ICpcblx0ICogQGZ1bmN0aW9uXG5cdCAqIEBuYW1lIF9nZXRGaWVsZFByb21pc2Vcblx0ICogQHBhcmFtIHtvYmplY3R9IG9FdmVudCBGaWVsZCBjaGFuZ2UgZXZlbnRcblx0ICogQHJldHVybnMge29iamVjdH0gRmllbGQgcHJvbWlzZVxuXHQgKi9cblx0cHJpdmF0ZSBfZ2V0RmllbGRQcm9taXNlKG9FdmVudDogVUk1RXZlbnQpOiBQcm9taXNlPGFueT4ge1xuXHRcdGNvbnN0IHByb21pc2UgPSBvRXZlbnQuZ2V0UGFyYW1ldGVyKFwicHJvbWlzZVwiKSB8fCBQcm9taXNlLnJlc29sdmUoKTtcblxuXHRcdHJldHVybiBwcm9taXNlLnRoZW4oKCkgPT4ge1xuXHRcdFx0Y29uc3Qgb1Byb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcblx0XHRcdFx0aWYgKCFnZXRGaWVsZFN0YXRlT25DaGFuZ2Uob0V2ZW50KS5zdGF0ZS52YWxpZGl0eSkge1xuXHRcdFx0XHRcdHJlamVjdCgpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHJlc29sdmUodHJ1ZSk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdFx0cmV0dXJuIG9Qcm9taXNlO1xuXHRcdH0pO1xuXHR9XG5cblx0LyoqXG5cdCAqIEdldHMgdGhlIHByb3BlcnRpZXMgb2YgdGhlIGZpZWxkIHRoYXQgYXJlIHJlcXVpcmVkIGZvciB0aGUgU2lkZUVmZmVjdHMgcHJvY2Vzcy5cblx0ICpcblx0ICogQGZ1bmN0aW9uXG5cdCAqIEBuYW1lIF9nZXRGaWVsZFByb3BlcnRpZXNcblx0ICogQHBhcmFtIHtvYmplY3R9IG9FdmVudCBGaWVsZCBjaGFuZ2UgZXZlbnRcblx0ICogQHJldHVybnMge29iamVjdH0gRmllbGQgcHJvcGVydGllcyAoZXZlbnQgY2hhbmdlIHByb21pc2UsIGZpZWxkLCBTaWRlRWZmZWN0cyByZWxhdGVkIHRvIHRoaXMgZmllbGQpXG5cdCAqL1xuXHRwcml2YXRlIF9nZXRGaWVsZFByb3BlcnRpZXMob0V2ZW50OiBVSTVFdmVudCk6IEZpZWxkRXZlbnRQcm9wZXJ0eVR5cGUge1xuXHRcdGNvbnN0IG9GaWVsZDogRmllbGRDb250cm9sID0gb0V2ZW50LmdldFNvdXJjZSgpO1xuXG5cdFx0cmV0dXJuIHtcblx0XHRcdHByb21pc2U6IHRoaXMuX2dldEZpZWxkUHJvbWlzZShvRXZlbnQpLFxuXHRcdFx0ZmllbGQ6IG9GaWVsZCxcblx0XHRcdHNpZGVFZmZlY3RzTWFwOiB0aGlzLl9nZXRGaWVsZFNpZGVFZmZlY3RzTWFwKG9GaWVsZClcblx0XHR9O1xuXHR9XG5cblx0LyoqXG5cdCAqIEdldHMgdGhlIFNpZGVFZmZlY3RzIG1hcFxuXHQgKiBUaGVzZSBTaWRlRWZmZWN0cyBhcmVcblx0ICogLSBsaXN0ZWQgaW50byBGaWVsZEdyb3VwSWRzIChjb21pbmcgZnJvbSBhbiBPRGF0YSBTZXJ2aWNlKVxuXHQgKiAtIGdlbmVyYXRlZCBieSBhIGNvbnRyb2wgb3IgY29udHJvbHMgYW5kIHRoYXQgY29uZmlndXJlIHRoaXMgZmllbGQgYXMgU291cmNlUHJvcGVydGllcy5cblx0ICpcblx0ICogQGZ1bmN0aW9uXG5cdCAqIEBuYW1lIF9nZXRGaWVsZFNpZGVFZmZlY3RzTWFwXG5cdCAqIEBwYXJhbSB7b2JqZWN0fSBvRmllbGQgRmllbGRcblx0ICogQHJldHVybnMge29iamVjdH0gU2lkZUVmZmVjdHMgbWFwXG5cdCAqL1xuXHRwcml2YXRlIF9nZXRGaWVsZFNpZGVFZmZlY3RzTWFwKG9GaWVsZDogRmllbGRDb250cm9sKTogRmllbGRTaWRlRWZmZWN0RGljdGlvbmFyeSB7XG5cdFx0Y29uc3QgbVNpZGVFZmZlY3RzTWFwOiBGaWVsZFNpZGVFZmZlY3REaWN0aW9uYXJ5ID0ge30sXG5cdFx0XHRhRmllbGRHcm91cElkczogc3RyaW5nW10gPSBvRmllbGQuZ2V0RmllbGRHcm91cElkcygpLFxuXHRcdFx0c1ZpZXdFbnRpdHlTZXRTZXROYW1lID0gdGhpcy5fb1ZpZXcuZ2V0Vmlld0RhdGEoKS5lbnRpdHlTZXQsXG5cdFx0XHRvVmlld0VudGl0eVNldCA9ICh0aGlzLl9vU2lkZUVmZmVjdHNTZXJ2aWNlLmdldENvbnZlcnRlZE1ldGFNb2RlbCgpIGFzIENvbnZlcnRlck91dHB1dCkuZW50aXR5U2V0cy5maW5kKG9FbnRpdHlTZXQgPT4ge1xuXHRcdFx0XHRyZXR1cm4gb0VudGl0eVNldC5uYW1lID09PSBzVmlld0VudGl0eVNldFNldE5hbWU7XG5cdFx0XHR9KTtcblxuXHRcdC8vIFNpZGVFZmZlY3RzIGNvbWluZyBmcm9tIGFuIE9EYXRhIFNlcnZpY2Vcblx0XHRhRmllbGRHcm91cElkcy5mb3JFYWNoKHNGaWVsZEdyb3VwSWQgPT4ge1xuXHRcdFx0Y29uc3QgYklzSW1tZWRpYXRlOiBib29sZWFuID0gc0ZpZWxkR3JvdXBJZC5pbmRleE9mKFwiJCRJbW1lZGlhdGVSZXF1ZXN0XCIpICE9PSAtMSxcblx0XHRcdFx0c05hbWU6IHN0cmluZyA9IHNGaWVsZEdyb3VwSWQucmVwbGFjZShcIiQkSW1tZWRpYXRlUmVxdWVzdFwiLCBcIlwiKSxcblx0XHRcdFx0YVNpZGVFZmZlY3RQYXJ0czogc3RyaW5nW10gPSBzTmFtZS5zcGxpdChcIiNcIiksXG5cdFx0XHRcdHNTaWRlRWZmZWN0RW50aXR5VHlwZTogc3RyaW5nID0gYVNpZGVFZmZlY3RQYXJ0c1swXSxcblx0XHRcdFx0c1NpZGVFZmZlY3RQYXRoOiBzdHJpbmcgPVxuXHRcdFx0XHRcdHNTaWRlRWZmZWN0RW50aXR5VHlwZSArXG5cdFx0XHRcdFx0XCJAY29tLnNhcC52b2NhYnVsYXJpZXMuQ29tbW9uLnYxLlNpZGVFZmZlY3RzXCIgK1xuXHRcdFx0XHRcdChhU2lkZUVmZmVjdFBhcnRzLmxlbmd0aCA9PT0gMiA/IFwiI1wiICsgYVNpZGVFZmZlY3RQYXJ0c1sxXSA6IFwiXCIpLFxuXHRcdFx0XHRvU2lkZUVmZmVjdDogU2lkZUVmZmVjdHNUeXBlIHwgdW5kZWZpbmVkID0gdGhpcy5fb1NpZGVFZmZlY3RzU2VydmljZS5nZXRPRGF0YUVudGl0eVNpZGVFZmZlY3RzKHNTaWRlRWZmZWN0RW50aXR5VHlwZSk/Lltcblx0XHRcdFx0XHRzU2lkZUVmZmVjdFBhdGhcblx0XHRcdFx0XSxcblx0XHRcdFx0b0NvbnRleHQ6IENvbnRleHQgfCB1bmRlZmluZWQgPSB0aGlzLl9nZXRDb250ZXh0Rm9yU2lkZUVmZmVjdHMob0ZpZWxkLCBzU2lkZUVmZmVjdEVudGl0eVR5cGUpO1xuXHRcdFx0aWYgKG9TaWRlRWZmZWN0ICYmIG9Db250ZXh0KSB7XG5cdFx0XHRcdG1TaWRlRWZmZWN0c01hcFtzTmFtZV0gPSB7XG5cdFx0XHRcdFx0bmFtZTogc05hbWUsXG5cdFx0XHRcdFx0aW1tZWRpYXRlOiBiSXNJbW1lZGlhdGUsXG5cdFx0XHRcdFx0c2lkZUVmZmVjdHM6IG9TaWRlRWZmZWN0LFxuXHRcdFx0XHRcdGNvbnRleHQ6IG9Db250ZXh0XG5cdFx0XHRcdH07XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHQvL1NpZGVFZmZlY3RzIGNvbWluZyBmcm9tIGNvbnRyb2wocylcblx0XHRpZiAoc1ZpZXdFbnRpdHlTZXRTZXROYW1lICYmIG9WaWV3RW50aXR5U2V0KSB7XG5cdFx0XHRjb25zdCBzVmlld0VudGl0eVR5cGUgPSBvVmlld0VudGl0eVNldC5lbnRpdHlUeXBlLmZ1bGx5UXVhbGlmaWVkTmFtZSxcblx0XHRcdFx0bUZpZWxkUGF0aDogYW55ID0gKG9GaWVsZC5nZXRBZ2dyZWdhdGlvbihcImN1c3RvbURhdGFcIikgYXMgYW55W10pLmZpbmQob0N1c3RvbURhdGEgPT4ge1xuXHRcdFx0XHRcdHJldHVybiBvQ3VzdG9tRGF0YS5nZXRLZXkoKSA9PT0gXCJzb3VyY2VQYXRoXCI7XG5cdFx0XHRcdH0pLFxuXHRcdFx0XHRvQ29udGV4dDogQ29udGV4dCB8IHVuZGVmaW5lZCA9IHRoaXMuX2dldENvbnRleHRGb3JTaWRlRWZmZWN0cyhvRmllbGQsIHNWaWV3RW50aXR5VHlwZSk7XG5cblx0XHRcdGlmIChtRmllbGRQYXRoICYmIG9Db250ZXh0KSB7XG5cdFx0XHRcdGNvbnN0IHNGaWVsZFBhdGggPSBtRmllbGRQYXRoLmdldFZhbHVlKCkucmVwbGFjZShcIi9cIiArIHNWaWV3RW50aXR5U2V0U2V0TmFtZSArIFwiL1wiLCBcIlwiKSxcblx0XHRcdFx0XHRtQ29udHJvbEVudGl0eVR5cGUgPSB0aGlzLl9vU2lkZUVmZmVjdHNTZXJ2aWNlLmdldENvbnRyb2xFbnRpdHlTaWRlRWZmZWN0cyhcblx0XHRcdFx0XHRcdHNWaWV3RW50aXR5VHlwZVxuXHRcdFx0XHRcdCkgYXMgQ29udHJvbFNpZGVFZmZlY3RzRW50aXR5RGljdGlvbmFyeTtcblx0XHRcdFx0T2JqZWN0LmtleXMobUNvbnRyb2xFbnRpdHlUeXBlKS5mb3JFYWNoKHNDb250cm9sTmFtZSA9PiB7XG5cdFx0XHRcdFx0Y29uc3Qgb0NvbnRyb2xTaWRlRWZmZWN0czogU2lkZUVmZmVjdHNUeXBlID0gbUNvbnRyb2xFbnRpdHlUeXBlW3NDb250cm9sTmFtZV07XG5cdFx0XHRcdFx0aWYgKChvQ29udHJvbFNpZGVFZmZlY3RzLlNvdXJjZVByb3BlcnRpZXMgYXMgc3RyaW5nW10pLmluY2x1ZGVzKHNGaWVsZFBhdGgpKSB7XG5cdFx0XHRcdFx0XHRjb25zdCBzTmFtZSA9IHNDb250cm9sTmFtZSArIFwiOjpcIiArIHNWaWV3RW50aXR5VHlwZTtcblx0XHRcdFx0XHRcdG1TaWRlRWZmZWN0c01hcFtzTmFtZV0gPSB7XG5cdFx0XHRcdFx0XHRcdG5hbWU6IHNOYW1lLFxuXHRcdFx0XHRcdFx0XHRpbW1lZGlhdGU6IHRydWUsXG5cdFx0XHRcdFx0XHRcdHNpZGVFZmZlY3RzOiBvQ29udHJvbFNpZGVFZmZlY3RzLFxuXHRcdFx0XHRcdFx0XHRjb250ZXh0OiBvQ29udGV4dFxuXHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gbVNpZGVFZmZlY3RzTWFwO1xuXHR9XG5cblx0LyoqXG5cdCAqIE1hbmFnZXMgdGhlIFNpZGVFZmZlY3RzIHdpdGggcmVsYXRlZCBjaGFuZ2VzIHRvIGEgZmllbGRcblx0ICogTGlzdDogZ2V0cyBpbW1lZGlhdGUgU2lkZUVmZmVjdHMgcmVxdWVzdHNcblx0ICogUmVnaXN0ZXI6IGNhY2hlcyBkZWZlcnJlZCBTaWRlRWZmZWN0cyB0aGF0IHdpbGwgYmUgZXhlY3V0ZWQgd2hlbiB0aGUgRmllbGRHcm91cCBpcyB1bmZvY3VzZWQuXG5cdCAqXG5cdCAqIEBmdW5jdGlvblxuXHQgKiBAbmFtZSBfaW5pdGlhbGl6ZUZpZWxkU2lkZUVmZmVjdHNcblx0ICogQHBhcmFtIHtvYmplY3R9IG1FdmVudEZpZWxkUHJvcGVydGllcyBGaWVsZCBldmVudCBwcm9wZXJ0aWVzXG5cdCAqIEBwYXJhbSB7b2JqZWN0fSBvRmllbGRHcm91cFByZVJlcXVpc2l0ZSBQcm9taXNlIHRvIGJlIGZ1bGZpbGxlZCBiZWZvcmUgZXhlY3V0aW5nIGRlZmVycmVkIFNpZGVFZmZlY3RzXG5cdCAqIEByZXR1cm5zIHtBcnJheX0gIEFycmF5IG9mIGltbWVkaWF0ZSBTaWRlRWZmZWN0c1xuXHQgKi9cblx0cHJpdmF0ZSBfaW5pdGlhbGl6ZUZpZWxkU2lkZUVmZmVjdHMoXG5cdFx0bUV2ZW50RmllbGRQcm9wZXJ0aWVzOiBGaWVsZEV2ZW50UHJvcGVydHlUeXBlLFxuXHRcdG9GaWVsZEdyb3VwUHJlUmVxdWlzaXRlPzogUHJvbWlzZTxhbnk+XG5cdCk6IEZpZWxkU2lkZUVmZmVjdFByb3BlcnR5VHlwZVtdIHtcblx0XHRjb25zdCBtRmllbGRTaWRlRWZmZWN0c01hcCA9IG1FdmVudEZpZWxkUHJvcGVydGllcy5zaWRlRWZmZWN0c01hcCxcblx0XHRcdG9GaWVsZFByb21pc2VGb3JGaWVsZEdyb3VwID0gdGhpcy5fZ2VuZXJhdGVGaWVsZEdyb3VwUHJvbWlzZShtRXZlbnRGaWVsZFByb3BlcnRpZXMpLCAvLyBQcm9taXNlIG1hbmFnaW5nIEZpZWxkR3JvdXAgcmVxdWVzdHMgaWYgRmllbGQgcHJvbWlzZSBmYWlsc1xuXHRcdFx0bUZhaWxlZFNpZGVFZmZlY3RzTmFtZTogYW55ID0ge30sXG5cdFx0XHRhSW1tZWRpYXRlU2lkZUVmZmVjdHNQcm9wZXJ0aWVzOiBGaWVsZFNpZGVFZmZlY3RQcm9wZXJ0eVR5cGVbXSA9IFtdO1xuXG5cdFx0b0ZpZWxkR3JvdXBQcmVSZXF1aXNpdGUgPSBvRmllbGRHcm91cFByZVJlcXVpc2l0ZSB8fCBQcm9taXNlLnJlc29sdmUoKTtcblxuXHRcdE9iamVjdC5rZXlzKG1GaWVsZFNpZGVFZmZlY3RzTWFwKS5mb3JFYWNoKHNTaWRlRWZmZWN0TmFtZSA9PiB7XG5cdFx0XHRjb25zdCBvU2lkZUVmZmVjdFByb3BlcnR5OiBGaWVsZFNpZGVFZmZlY3RQcm9wZXJ0eVR5cGUgPSBtRmllbGRTaWRlRWZmZWN0c01hcFtzU2lkZUVmZmVjdE5hbWVdLFxuXHRcdFx0XHRzU2lkZUVmZmVjdENvbnRleHRQYXRoID0gb1NpZGVFZmZlY3RQcm9wZXJ0eS5jb250ZXh0LmdldFBhdGgoKSxcblx0XHRcdFx0YUZhaWxlZFNpZGVFZmZlY3RzID0gdGhpcy5fbUZhaWxlZFNpZGVFZmZlY3RzW3NTaWRlRWZmZWN0Q29udGV4dFBhdGhdO1xuXG5cdFx0XHQvLyBDaGVjayBpZiB0aGVyZSBpcyBhbnkgcHJldmlvdXNseSBmYWlsZWQgcmVxdWVzdCBmb3IgdGhpcyBjb250ZXh0XG5cdFx0XHRpZiAoYUZhaWxlZFNpZGVFZmZlY3RzKSB7XG5cdFx0XHRcdGRlbGV0ZSB0aGlzLl9tRmFpbGVkU2lkZUVmZmVjdHNbc1NpZGVFZmZlY3RDb250ZXh0UGF0aF07XG5cdFx0XHRcdG1GYWlsZWRTaWRlRWZmZWN0c05hbWVbc1NpZGVFZmZlY3RDb250ZXh0UGF0aF0gPSB7fTtcblx0XHRcdFx0YUZhaWxlZFNpZGVFZmZlY3RzLmZvckVhY2gobUZhaWxlZFNpZGVFZmZlY3RzID0+IHtcblx0XHRcdFx0XHRtRmFpbGVkU2lkZUVmZmVjdHNOYW1lW3NTaWRlRWZmZWN0Q29udGV4dFBhdGhdW21GYWlsZWRTaWRlRWZmZWN0cy5mdWxseVF1YWxpZmllZE5hbWVdID0gdHJ1ZTtcblx0XHRcdFx0XHRhSW1tZWRpYXRlU2lkZUVmZmVjdHNQcm9wZXJ0aWVzLnB1c2goe1xuXHRcdFx0XHRcdFx0bmFtZTogc1NpZGVFZmZlY3ROYW1lLFxuXHRcdFx0XHRcdFx0cHJldmlvdXNseUZhaWxlZDogdHJ1ZSxcblx0XHRcdFx0XHRcdHNpZGVFZmZlY3RzOiBtRmFpbGVkU2lkZUVmZmVjdHMsXG5cdFx0XHRcdFx0XHRjb250ZXh0OiBvU2lkZUVmZmVjdFByb3BlcnR5LmNvbnRleHRcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0XHRpZiAob1NpZGVFZmZlY3RQcm9wZXJ0eS5pbW1lZGlhdGUpIHtcblx0XHRcdFx0Ly8gU2lkZUVmZmVjdHMgd2lsbCBiZSBleGVjdXRlZCBpbW1lZGlhdGVseSBhZnRlciBldmVudCBwcm9taXNlIHZhbGlkYXRpb25cblx0XHRcdFx0aWYgKCFtRmFpbGVkU2lkZUVmZmVjdHNOYW1lW3NTaWRlRWZmZWN0Q29udGV4dFBhdGhdPy5bb1NpZGVFZmZlY3RQcm9wZXJ0eS5zaWRlRWZmZWN0cy5mdWxseVF1YWxpZmllZE5hbWVdKSB7XG5cdFx0XHRcdFx0YUltbWVkaWF0ZVNpZGVFZmZlY3RzUHJvcGVydGllcy5wdXNoKHtcblx0XHRcdFx0XHRcdG5hbWU6IHNTaWRlRWZmZWN0TmFtZSxcblx0XHRcdFx0XHRcdHNpZGVFZmZlY3RzOiBvU2lkZUVmZmVjdFByb3BlcnR5LnNpZGVFZmZlY3RzLFxuXHRcdFx0XHRcdFx0Y29udGV4dDogb1NpZGVFZmZlY3RQcm9wZXJ0eS5jb250ZXh0XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdC8vIEFkZCBkZWZlcnJlZCBTaWRlRWZmZWN0cyB0byB0aGUgcmVsYXRlZCBkaWN0aW9uYXJ5XG5cdFx0XHRcdHRoaXMuX21GaWVsZEdyb3VwUXVldWVbc1NpZGVFZmZlY3ROYW1lXSA9IHRoaXMuX21GaWVsZEdyb3VwUXVldWVbc1NpZGVFZmZlY3ROYW1lXSB8fCB7fTtcblx0XHRcdFx0Y29uc3QgbVNpZGVFZmZlY3RDb250ZXh0UGF0aCA9IHRoaXMuX21GaWVsZEdyb3VwUXVldWVbc1NpZGVFZmZlY3ROYW1lXVtzU2lkZUVmZmVjdENvbnRleHRQYXRoXSB8fCB7XG5cdFx0XHRcdFx0cHJvbWlzZXM6IFtdLFxuXHRcdFx0XHRcdHNpZGVFZmZlY3RQcm9wZXJ0eTogb1NpZGVFZmZlY3RQcm9wZXJ0eSxcblx0XHRcdFx0XHRwcm9jZXNzU3RhcnRlZDogZmFsc2Vcblx0XHRcdFx0fTtcblx0XHRcdFx0bVNpZGVFZmZlY3RDb250ZXh0UGF0aC5wcm9taXNlcyA9IG1TaWRlRWZmZWN0Q29udGV4dFBhdGgucHJvbWlzZXMuY29uY2F0KFtcblx0XHRcdFx0XHRvRmllbGRQcm9taXNlRm9yRmllbGRHcm91cCxcblx0XHRcdFx0XHRvRmllbGRHcm91cFByZVJlcXVpc2l0ZSBhcyBQcm9taXNlPGFueT5cblx0XHRcdFx0XSk7XG5cdFx0XHRcdHRoaXMuX21GaWVsZEdyb3VwUXVldWVbc1NpZGVFZmZlY3ROYW1lXVtzU2lkZUVmZmVjdENvbnRleHRQYXRoXSA9IG1TaWRlRWZmZWN0Q29udGV4dFBhdGg7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0cmV0dXJuIGFJbW1lZGlhdGVTaWRlRWZmZWN0c1Byb3BlcnRpZXM7XG5cdH1cblxuXHQvKipcblx0ICogU2F2ZXMgdGhlIHZhbGlkYXRpb24gc3RhdHVzIG9mIHByb3BlcnRpZXMgcmVsYXRlZCB0byBhIGZpZWxkIGNvbnRyb2wuXG5cdCAqXG5cdCAqIEBwYXJhbSB7b2JqZWN0fSBvRmllbGQgRmllbGRcblx0ICogQHBhcmFtIHtib29sZWFufSBiU3VjY2VzcyBTdGF0dXMgb2YgdGhlIGZpZWxkIHZhbGlkYXRpb25cblx0ICovXG5cdHByaXZhdGUgX3NhdmVGaWVsZFByb3BlcnRpZXNTdGF0dXMob0ZpZWxkOiBGaWVsZENvbnRyb2wsIGJTdWNjZXNzOiBib29sZWFuKTogdm9pZCB7XG5cdFx0Y29uc3Qgb0JpbmRpbmdDb250ZXh0ID0gb0ZpZWxkLmdldEJpbmRpbmdDb250ZXh0KCk7XG5cdFx0Y29uc3Qgc0VudGl0eVR5cGUgPSB0aGlzLl9vU2lkZUVmZmVjdHNTZXJ2aWNlLmdldEVudGl0eVR5cGVGcm9tQ29udGV4dChvQmluZGluZ0NvbnRleHQpO1xuXHRcdGNvbnN0IG1FbnRpdHlUeXBlID0gdGhpcy5fZ2V0RW50aXR5VHlwZUZyb21GUU4oc0VudGl0eVR5cGUpO1xuXHRcdGlmIChtRW50aXR5VHlwZSkge1xuXHRcdFx0Ly8gUmV0cmlldmVzIGFsbCBwcm9wZXJ0aWVzIHVzZWQgYnkgdGhlIGZpZWxkXG5cdFx0XHRjb25zdCBvRmllbGRCaW5kaW5nID0gdGhpcy5fZ2V0QmluZGluZ0ZvckZpZWxkKG9GaWVsZCk7XG5cdFx0XHRjb25zdCBhRmllbGRQYXRocyA9IG9GaWVsZEJpbmRpbmcuaXNBKFwic2FwLnVpLm1vZGVsLkNvbXBvc2l0ZUJpbmRpbmdcIilcblx0XHRcdFx0PyAoKG9GaWVsZEJpbmRpbmcgYXMgYW55KS5nZXRCaW5kaW5ncygpIHx8IFtdKS5tYXAoKG9CaW5kaW5nOiBhbnkpID0+IG9CaW5kaW5nLnNQYXRoKVxuXHRcdFx0XHQ6IFtvRmllbGRCaW5kaW5nLmdldFBhdGgoKV07XG5cblx0XHRcdC8vIFN0b3JlcyBzdGF0dXMgZm9yIGFsbCBwcm9wZXJ0aWVzXG5cdFx0XHRhRmllbGRQYXRocy5mb3JFYWNoKChzRmllbGRQYXRoOiBzdHJpbmcpID0+IHtcblx0XHRcdFx0Y29uc3Qgc0lkID0gdGhpcy5fZ2VuZXJhdGVTdGF0dXNJbmRleChtRW50aXR5VHlwZSwgc0ZpZWxkUGF0aCwgb0JpbmRpbmdDb250ZXh0KTtcblx0XHRcdFx0aWYgKHNJZCkge1xuXHRcdFx0XHRcdHRoaXMuX2FTb3VyY2VQcm9wZXJ0aWVzRmFpbHVyZVtiU3VjY2VzcyA/IFwiZGVsZXRlXCIgOiBcImFkZFwiXShzSWQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogUmV0cmlldmVzIHRoZSBwcm9wZXJ0eSBiaW5kaW5nIHRvIHRoZSB2YWx1ZSBvZiB0aGUgZmllbGQuXG5cdCAqXG5cdCAqIEBwYXJhbSBvRmllbGQgRmllbGRcblx0ICogQHJldHVybnMge0JpbmRpbmd9ICBCaW5kaW5nIHRvIHRoZSB2YWx1ZVxuXHQgKi9cblx0cHJpdmF0ZSBfZ2V0QmluZGluZ0ZvckZpZWxkKG9GaWVsZDogRmllbGRDb250cm9sKTogQmluZGluZyB7XG5cdFx0bGV0IG9CaW5kaW5nOiBCaW5kaW5nO1xuXHRcdGlmIChvRmllbGQuaXNBKFwic2FwLm0uQ2hlY2tCb3hcIikpIHtcblx0XHRcdG9CaW5kaW5nID0gb0ZpZWxkLmdldEJpbmRpbmcoXCJzZWxlY3RlZFwiKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0b0JpbmRpbmcgPSBvRmllbGQuZ2V0QmluZGluZyhcInZhbHVlXCIpO1xuXHRcdH1cblx0XHRyZXR1cm4gb0JpbmRpbmc7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU2lkZUVmZmVjdHNDb250cm9sbGVyRXh0ZW5zaW9uO1xuIl19