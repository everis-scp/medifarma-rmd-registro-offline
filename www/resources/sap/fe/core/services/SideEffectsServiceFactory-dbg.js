/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2021 SAP SE. All rights reserved
 */
sap.ui.define(["sap/ui/core/service/ServiceFactory", "sap/ui/core/service/Service", "sap/fe/core/converters/MetaModelConverter", "sap/base/Log"], function (ServiceFactory, Service, MetaModelConverter, Log) {
  "use strict";

  var convertTypes = MetaModelConverter.convertTypes;

  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

  var SideEffectsService = /*#__PURE__*/function (_Service) {
    _inherits(SideEffectsService, _Service);

    var _super = _createSuper(SideEffectsService);

    function SideEffectsService() {
      _classCallCheck(this, SideEffectsService);

      return _super.apply(this, arguments);
    }

    _createClass(SideEffectsService, [{
      key: "init",
      // !: means that we know it will be assigned before usage
      value: function init() {
        this._oSideEffectsType = {
          oData: {
            entities: {},
            actions: {}
          },
          control: {}
        };
        this._bInitialized = false;
        this.initPromise = Promise.resolve(this);
      }
      /**
       * Adds a SideEffects control
       * SideEffects definition is added by a control to keep data up to date
       * These SideEffects get limited scope compared with SideEffects coming from an OData service:
       * - Only one SideEffects definition can be defined for the combination entity type - control Id
       * - Only SideEffects source properties are recognized and used to trigger SideEffects
       *
       * Ensure the sourceControlId matches the associated SAPUI5 control ID.
       *
       * @private
       * @ui5-restricted
       * @param {string} sEntityType Name of the entity type
       * @param {object} oSideEffect SideEffects definition
       */

    }, {
      key: "addControlSideEffects",
      value: function addControlSideEffects(sEntityType, oSideEffect) {
        if (oSideEffect.sourceControlId) {
          var oControlSideEffect = _objectSpread({}, oSideEffect, {
            fullyQualifiedName: sEntityType + "/SideEffectsForControl/" + oSideEffect.sourceControlId
          });

          var mEntityControlSideEffects = this._oSideEffectsType.control[sEntityType] || {};
          mEntityControlSideEffects[oControlSideEffect.sourceControlId] = oControlSideEffect;
          this._oSideEffectsType.control[sEntityType] = mEntityControlSideEffects;
        }
      }
      /**
       * Executes SideEffects action.
       *
       * @private
       * @ui5-restricted
       * @param {string} sTriggerAction Name of the action
       * @param {object} oContext Context
       * @param {string} sGroupId The group ID to be used for the request
       */

    }, {
      key: "executeAction",
      value: function executeAction(sTriggerAction, oContext, sGroupId) {
        var oTriggerAction = oContext.getModel().bindContext(sTriggerAction + "(...)", oContext);
        oTriggerAction.execute(sGroupId || oContext.getBinding().getUpdateGroupId());
      }
      /**
       * Gets converted OData metaModel.
       *
       * @private
       * @ui5-restricted
       * @returns {object} Converted OData metaModel
       */

    }, {
      key: "getConvertedMetaModel",
      value: function getConvertedMetaModel() {
        var oContext = this.getContext();
        var oComponent = oContext.scopeObject;
        var oMetaModel = oComponent.getModel().getMetaModel();
        return convertTypes(oMetaModel, this._oCapabilities);
      }
      /**
       * Gets the entity type of a context.
       *
       * @function
       * @name getEntityTypeFromContext
       * @param {object} oContext Context
       * @returns {string | undefined } Entity Type
       */

    }, {
      key: "getEntityTypeFromContext",
      value: function getEntityTypeFromContext(oContext) {
        var oMetaModel = oContext.getModel().getMetaModel(),
            sMetaPath = oMetaModel.getMetaPath(oContext.getPath()),
            sEntityType = oMetaModel.getObject(sMetaPath)["$Type"];
        return sEntityType;
      }
      /**
       * Gets the SideEffects that come from an OData service.
       *
       * @private
       * @ui5-restricted
       * @param {string} sEntityTypeName Name of the entity type
       * @returns {object} SideEffects dictionary
       */

    }, {
      key: "getODataEntitySideEffects",
      value: function getODataEntitySideEffects(sEntityTypeName) {
        return this._oSideEffectsType.oData.entities[sEntityTypeName] || {};
      }
      /**
       * Gets the SideEffects that come from an OData service.
       *
       * @private
       * @ui5-restricted
       * @param {string} sActionName Name of the action
       * @param {object} oContext Context
       * @returns {object} SideEffects definition
       */

    }, {
      key: "getODataActionSideEffects",
      value: function getODataActionSideEffects(sActionName, oContext) {
        if (oContext) {
          var sEntityType = this.getEntityTypeFromContext(oContext);

          if (sEntityType) {
            var _this$_oSideEffectsTy;

            return (_this$_oSideEffectsTy = this._oSideEffectsType.oData.actions[sEntityType]) === null || _this$_oSideEffectsTy === void 0 ? void 0 : _this$_oSideEffectsTy[sActionName];
          }
        }

        return undefined;
      }
      /**
       * Generates the dictionary for the SideEffects.
       *
       * @private
       * @ui5-restricted
       * @param oCapabilities The current capabilities
       */

    }, {
      key: "initializeSideEffects",
      value: function initializeSideEffects(oCapabilities) {
        var _this = this;

        this._oCapabilities = oCapabilities;

        if (!this._bInitialized) {
          var oConvertedMetaModel = this.getConvertedMetaModel();
          oConvertedMetaModel.entityTypes.forEach(function (entityType) {
            _this._oSideEffectsType.oData.entities[entityType.fullyQualifiedName] = _this._retrieveODataEntitySideEffects(entityType);
            _this._oSideEffectsType.oData.actions[entityType.fullyQualifiedName] = _this._retrieveODataActionsSideEffects(entityType); // only bound actions are analyzed since unbound ones don't get SideEffects
          });
          this._bInitialized = true;
        }
      }
      /**
       * Removes all SideEffects related to a control.
       *
       * @private
       * @ui5-restricted
       * @param {string} sControlId Control Id
       */

    }, {
      key: "removeControlSideEffects",
      value: function removeControlSideEffects(sControlId) {
        var _this2 = this;

        Object.keys(this._oSideEffectsType.control).forEach(function (sEntityType) {
          if (_this2._oSideEffectsType.control[sEntityType][sControlId]) {
            delete _this2._oSideEffectsType.control[sEntityType][sControlId];
          }
        });
      }
      /**
       * Request SideEffects on a specific context.
       *
       * @function
       * @name requestSideEffects
       * @param {Array} aPathExpressions Targets of SideEffects to be executed
       * @param {object} oContext Context where SideEffects need to be executed
       * @param {string} sGroupId The group ID to be used for the request
       * @returns {Promise} Promise on SideEffects request
       */

    }, {
      key: "requestSideEffects",
      value: function requestSideEffects(aPathExpressions, oContext, sGroupId) {
        this._logRequest(aPathExpressions, oContext);

        var oPromise;
        /**
         * Context.requestSideEffects either returns a promise or throws a new error. This return is caught if an error is thrown
         * to avoid breaking the promise chain.
         */

        try {
          oPromise = oContext.requestSideEffects(aPathExpressions, sGroupId);
        } catch (e) {
          oPromise = Promise.reject(e);
        }

        return oPromise;
      }
      /**
       * Request SideEffects for a navigation property on a specific context.
       *
       * @function
       * @name requestSideEffectsForNavigationProperty
       * @param {string} sNavigationProperty Navigation property
       * @param {object} oContext Context where SideEffects need to be executed
       * @returns {object} SideEffects request on SAPUI5 context
       */

    }, {
      key: "requestSideEffectsForNavigationProperty",
      value: function requestSideEffectsForNavigationProperty(sNavigationProperty, oContext) {
        var _this3 = this;

        var sBaseEntityType = this.getEntityTypeFromContext(oContext);

        if (sBaseEntityType) {
          var aSideEffects = this.getODataEntitySideEffects(sBaseEntityType);
          var aTargets = [];
          Object.keys(aSideEffects).filter( // Keep relevant SideEffects
          function (sAnnotationName) {
            var oSideEffects = aSideEffects[sAnnotationName];
            return (oSideEffects.SourceProperties || []).some(function (oPropertyPath) {
              return oPropertyPath.value.indexOf(sNavigationProperty) > -1;
            }) || (oSideEffects.SourceEntities || []).some(function (oNavigationPropertyPath) {
              return oNavigationPropertyPath.value === sNavigationProperty;
            });
          }).forEach(function (sAnnotationName) {
            var oSideEffects = aSideEffects[sAnnotationName];

            if (oSideEffects.TriggerAction) {
              _this3.executeAction(oSideEffects.TriggerAction, oContext);
            }

            (oSideEffects.TargetEntities || []).concat(oSideEffects.TargetProperties || []).forEach(function (mTarget) {
              return aTargets.push(mTarget);
            });
          }); // Remove duplicate properties

          aTargets = this._removeDuplicateTargets(aTargets);

          if (aTargets.length > 0) {
            return this.requestSideEffects(aTargets, oContext).catch(function (oError) {
              return Log.error("SideEffects - Error while processing SideEffects for Navigation Property " + sNavigationProperty, oError);
            });
          }
        }

        return Promise.resolve();
      }
      /**
       * Gets the SideEffects that come from controls.
       *
       * @private
       * @ui5-restricted
       * @param {string} sEntityTypeName Entity type Name
       * @returns {object} SideEffects dictionary
       */

    }, {
      key: "getControlEntitySideEffects",
      value: function getControlEntitySideEffects(sEntityTypeName) {
        return this._oSideEffectsType.control[sEntityTypeName] || {};
      }
      /**
       * Adds the text properties required for SideEffects
       * If a property has an associated text then this text needs to be added as targetProperties.
       *
       * @private
       * @ui5-restricted
       * @param {object} oSideEffect SideEffects definition
       * @param {object} mEntityType Entity type
       * @returns {object} SideEffects definition with added text properties
       */

    }, {
      key: "_addRequiredTextProperties",
      value: function _addRequiredTextProperties(oSideEffect, mEntityType) {
        var aInitialProperties = oSideEffect.TargetProperties || [],
            aEntitiesRequested = (oSideEffect.TargetEntities || []).map(function (navigation) {
          return navigation.$NavigationPropertyPath;
        });
        var aDerivedProperties = [];
        aInitialProperties.forEach(function (sPropertyPath) {
          var bIsStarProperty = sPropertyPath.endsWith("*"),
              // Can be '*' or '.../navProp/*'
          sNavigationPropertyPath = sPropertyPath.substring(0, sPropertyPath.lastIndexOf("/")),
              sRelativePath = sNavigationPropertyPath ? sNavigationPropertyPath + "/" : "",
              mTarget = mEntityType.resolvePath(sNavigationPropertyPath) || mEntityType;

          if (mTarget) {
            var _targetType;

            // mTarget can be an entity type, navigationProperty or or a complexType
            var aTargetEntityProperties = mTarget.entityProperties || ((_targetType = mTarget.targetType) === null || _targetType === void 0 ? void 0 : _targetType.properties) || mTarget.targetType.entityProperties;

            if (aTargetEntityProperties) {
              if (bIsStarProperty) {
                if (aTargetEntityProperties) {
                  // Add all required properties behind the *
                  aEntitiesRequested.push(sNavigationPropertyPath);
                  aDerivedProperties = aDerivedProperties.concat(aTargetEntityProperties.map(function (mProperty) {
                    return {
                      navigationPath: sRelativePath,
                      property: mProperty
                    };
                  }));
                }
              } else {
                aDerivedProperties.push({
                  property: aTargetEntityProperties.find(function (mProperty) {
                    return mProperty.name === sPropertyPath.split("/").pop();
                  }),
                  navigationPath: sRelativePath
                });
              }
            } else {
              Log.info("SideEffects - The entity type associated to property path " + sPropertyPath + " cannot be resolved");
            }
          } else {
            Log.info("SideEffects - The property path " + sPropertyPath + " cannot be resolved");
          }
        });
        aDerivedProperties.forEach(function (mPropertyInfo) {
          if (mPropertyInfo.property) {
            var _ref, _mPropertyInfo$proper, _mPropertyInfo$proper2;

            var sTargetTextPath = (_ref = (_mPropertyInfo$proper = mPropertyInfo.property.annotations) === null || _mPropertyInfo$proper === void 0 ? void 0 : (_mPropertyInfo$proper2 = _mPropertyInfo$proper.Common) === null || _mPropertyInfo$proper2 === void 0 ? void 0 : _mPropertyInfo$proper2.Text) === null || _ref === void 0 ? void 0 : _ref.path,
                sTextPathFromInitialEntity = mPropertyInfo.navigationPath + sTargetTextPath;
            /**
             * The property Text must be added only if the property is
             * - not part of a star property (.i.e '*' or 'navigation/*') or a targeted Entity
             * - not include into the initial targeted properties of SideEffects
             *  Indeed in the two listed cases, the property containing text will be/is requested by initial SideEffects configuration.
             */

            if (sTargetTextPath && aEntitiesRequested.indexOf(sTextPathFromInitialEntity.substring(0, sTextPathFromInitialEntity.lastIndexOf("/"))) === -1 && aInitialProperties.indexOf(sTextPathFromInitialEntity) === -1) {
              oSideEffect.TargetProperties.push(sTextPathFromInitialEntity);
            }
          }
        });
        return oSideEffect;
      }
      /**
       * Converts SideEffects to expected format
       *  - Converts SideEffects targets to expected format
       *  - Removes binding parameter from SideEffects targets properties
       *  - Adds the text properties
       *  - Replaces TargetProperties having reference to Source Properties for a SideEffects.
       *
       * @private
       * @ui5-restricted
       * @param {object} oSideEffects SideEffects definition
       * @param {string} sEntityType Name of the entity type
       * @param {string} sBindingParameter Name of the binding parameter
       * @returns {object} SideEffects definition
       */

    }, {
      key: "_convertSideEffects",
      value: function _convertSideEffects(oSideEffects, sEntityType, sBindingParameter) {
        var mEntityType = this.getConvertedMetaModel().entityTypes.find(function (oEntityType) {
          return oEntityType.fullyQualifiedName === sEntityType;
        });

        var oTempSideEffects = this._removeBindingParameter(this._convertTargetsFormat(oSideEffects), sBindingParameter);

        return mEntityType ? this._replaceReferencedProperties(this._addRequiredTextProperties(oTempSideEffects, mEntityType), mEntityType) : oTempSideEffects;
      }
      /**
       * Converts SideEffects targets (TargetEntities and TargetProperties) to expected format
       *  - TargetProperties as array of string
       *  - TargetEntities as array of object with property $NavigationPropertyPath.
       *
       * @private
       * @ui5-restricted
       * @param {object} oSideEffects SideEffects definition
       * @returns {object} Converted SideEffects
       */

    }, {
      key: "_convertTargetsFormat",
      value: function _convertTargetsFormat(oSideEffects) {
        var TargetProperties = (oSideEffects.TargetProperties || []).reduce(function (aTargetProperties, vTarget) {
          var sTarget = typeof vTarget === "string" && vTarget || vTarget.type === "PropertyPath" && vTarget.value;

          if (sTarget) {
            aTargetProperties.push(sTarget);
          } else {
            Log.error("SideEffects - Error while processing TargetProperties for SideEffects" + oSideEffects.fullyQualifiedName);
          }

          return aTargetProperties;
        }, []),
            TargetEntities = (oSideEffects.TargetEntities || []).map(function (mTargetEntity) {
          /**
           *  SideEffects that comes from SAP FE get TargetEntities with $NavigationPropertyPath whereas
           *  ones coming from the converted OData model gets a NavigationPropertyPath format
           *
           */
          return {
            "$NavigationPropertyPath": mTargetEntity.$NavigationPropertyPath || mTargetEntity.value || ""
          };
        });
        return _objectSpread({}, oSideEffects, {}, {
          TargetProperties: TargetProperties,
          TargetEntities: TargetEntities
        });
      }
      /**
       * Gets SideEffects related to an entity type or action that come from an OData Service
       * Internal routine to get, from converted oData metaModel, SideEffects related to a specific entity type or action
       * and to convert these SideEffects with expected format.
       *
       * @private
       * @ui5-restricted
       * @param {object} oSource Entity type or action
       * @returns {object} Array of SideEffects
       */

    }, {
      key: "_getSideEffectsFromSource",
      value: function _getSideEffectsFromSource(oSource) {
        var _this4 = this;

        var aSideEffects = [];
        var authorizedTypes = ["EntityType", "Action"];

        if (oSource._type && authorizedTypes.indexOf(oSource._type) > -1) {
          var mEntityType = oSource._type === "EntityType" ? oSource : oSource.sourceEntityType;

          if (mEntityType) {
            var _oSource$annotations;

            var mCommonAnnotation = ((_oSource$annotations = oSource.annotations) === null || _oSource$annotations === void 0 ? void 0 : _oSource$annotations.Common) || {};
            var mBindingParameter = (oSource.parameters || []).find(function (mParameter) {
              return mParameter.type === (mEntityType || oSource).fullyQualifiedName;
            });
            var sBindingParameter = mBindingParameter ? mBindingParameter.fullyQualifiedName.split("/")[1] : "";
            Object.keys(mCommonAnnotation).filter(function (sAnnotationName) {
              return mCommonAnnotation[sAnnotationName].$Type === "com.sap.vocabularies.Common.v1.SideEffectsType";
            }).forEach(function (sAnnotationName) {
              aSideEffects.push(_this4._convertSideEffects(mCommonAnnotation[sAnnotationName], mEntityType.fullyQualifiedName, sBindingParameter));
            });
          }
        }

        return aSideEffects;
      }
      /**
       * Logs SideEffects request.
       *
       * @private
       * @ui5-restricted
       * @param {Array} aPathExpressions SideEffects targets
       * @param {object} oContext Context
       */

    }, {
      key: "_logRequest",
      value: function _logRequest(aPathExpressions, oContext) {
        var sTargetPaths = aPathExpressions.reduce(function (sPaths, mTarget) {
          return sPaths + "\n\t\t" + (mTarget.$NavigationPropertyPath || mTarget || "");
        }, "");
        Log.debug("SideEffects - Request:\n\tContext path : " + oContext.getPath() + "\n\tProperty paths :" + sTargetPaths);
      }
      /**
       * Removes name of binding parameter on SideEffects targets.
       *
       * @private
       * @ui5-restricted
       * @param {object} oSideEffects SideEffects definition
       * @param {string} sBindingParameterName Name of binding parameter
       * @returns {object} SideEffects definition
       */

    }, {
      key: "_removeBindingParameter",
      value: function _removeBindingParameter(oSideEffects, sBindingParameterName) {
        if (sBindingParameterName) {
          var aTargets = ["TargetProperties", "TargetEntities"];
          aTargets.forEach(function (sTarget) {
            var mTarget = oSideEffects[sTarget];

            if (mTarget) {
              mTarget = mTarget.map(function (mProperty) {
                var bNavigationPropertyPath = mProperty.$NavigationPropertyPath !== undefined; // Need to test with undefined since  mProperty.$NavigationPropertyPath could be "" (empty string)

                var sValue = (bNavigationPropertyPath ? mProperty.$NavigationPropertyPath : mProperty).replace(new RegExp("^" + sBindingParameterName + "?."), "");
                return bNavigationPropertyPath ? {
                  $NavigationPropertyPath: sValue
                } : sValue;
              });
            }

            oSideEffects[sTarget] = mTarget;
          });
        }

        return oSideEffects;
      }
      /**
       * Remove duplicates in SideEffects targets.
       *
       * @private
       * @ui5-restricted
       * @param {Array} aTargets SideEffects targets
       * @returns {Array} SideEffects targets without duplicates
       */

    }, {
      key: "_removeDuplicateTargets",
      value: function _removeDuplicateTargets(aTargets) {
        return aTargets.filter(function (mTarget, iIndex, aTargets) {
          return aTargets.findIndex(function (mSearchTarget) {
            return mSearchTarget === mTarget || // PropertyPath
            mTarget.$NavigationPropertyPath && mSearchTarget.$NavigationPropertyPath === mTarget.$NavigationPropertyPath // NavigationPropertyPath
            ;
          }) === iIndex;
        });
      }
      /**
       * Replaces TargetProperties having reference to Source Properties for a SideEffects
       * If a SideEffects Source Property is an navigation entity reference, the SideEffects Target Properties cannot be a property of this navigation entity.
       * Indeed this configuration leads to error into the OData V4 Model since response cannot be processed because this would mean that we merge properties of the new target into the old target of the navigation property.
       * In order to request new value of these target properties the SideEffects will request for the entire Entity instead of just a set of properties.
       * For the first version, we remove all navigation properties and replace them by targetEntities. This change could be improved in next version.
       *
       * @private
       * @ui5-restricted
       * @param {object} oSideEffect SideEffects definition
       * @param {object} mEntityType  Entity type
       * @returns {object} SideEffects definition without referenced target properties
       */

    }, {
      key: "_replaceReferencedProperties",
      value: function _replaceReferencedProperties(oSideEffect, mEntityType) {
        var bSideEffectsChanged = false;
        var aEntities = (oSideEffect.TargetEntities || []).map(function (mNavigation) {
          return mNavigation.$NavigationPropertyPath;
        }) || [],
            aProperties = [];
        oSideEffect.TargetProperties.forEach(function (sPropertyPath) {
          var bTargetChanged = false;
          var iLastPathSeparatorIndex = sPropertyPath.lastIndexOf("/");

          if (iLastPathSeparatorIndex !== -1) {
            var sNavigationPath = sPropertyPath.substring(0, iLastPathSeparatorIndex);
            var oTarget = mEntityType.resolvePath(sNavigationPath);

            if (oTarget && oTarget._type === "NavigationProperty") {
              //Test if it's not a property bound on complexType (_ComplexType/MyProperty)
              bSideEffectsChanged = true;
              bTargetChanged = true;

              if (!aEntities.includes(sNavigationPath)) {
                aEntities.push(sNavigationPath);
              }
            }
          }

          if (!bTargetChanged) {
            aProperties.push(sPropertyPath);
          }
        });

        if (bSideEffectsChanged) {
          oSideEffect.TargetProperties = aProperties;
          oSideEffect.TargetEntities = aEntities.map(function (sNavigationPath) {
            return {
              $NavigationPropertyPath: sNavigationPath
            };
          });
        }

        return oSideEffect;
      }
      /**
       * Gets SideEffects action type that come from an OData Service
       * Internal routine to get, from converted oData metaModel, SideEffects on actions
       * related to a specific entity type and to convert these SideEffects with
       * expected format.
       *
       * @private
       * @ui5-restricted
       * @param {object} mEntityType Entity type
       * @returns {object} Entity type SideEffects dictionary
       */

    }, {
      key: "_retrieveODataActionsSideEffects",
      value: function _retrieveODataActionsSideEffects(mEntityType) {
        var _this5 = this;

        var oSideEffects = {};
        var aActions = mEntityType.actions;

        if (aActions) {
          Object.keys(aActions).forEach(function (sActionName) {
            var oAction = mEntityType.actions[sActionName];
            var triggerActions = [];
            var pathExpressions = [];
            var aTargets = [];

            _this5._getSideEffectsFromSource(oAction).forEach(function (oSideEffect) {
              var sTriggerAction = oSideEffect.TriggerAction;
              aTargets = aTargets.concat(oSideEffect.TargetEntities || []).concat(oSideEffect.TargetProperties || []);

              if (sTriggerAction && triggerActions.indexOf(sTriggerAction) === -1) {
                triggerActions.push(sTriggerAction);
              }
            });

            pathExpressions = _this5._removeDuplicateTargets(aTargets);
            oSideEffects[sActionName] = {
              pathExpressions: pathExpressions,
              triggerActions: triggerActions
            };
          });
        }

        return oSideEffects;
      }
      /**
       * Gets SideEffects entity type that come from an OData Service
       * Internal routine to get, from converted oData metaModel, SideEffects
       * related to a specific entity type and to convert these SideEffects with
       * expected format.
       *
       * @private
       * @ui5-restricted
       * @param {object} mEntityType Entity type
       * @returns {object} Entity type SideEffects dictionary
       */

    }, {
      key: "_retrieveODataEntitySideEffects",
      value: function _retrieveODataEntitySideEffects(mEntityType) {
        var oEntitySideEffects = {};

        this._getSideEffectsFromSource(mEntityType).forEach(function (oSideEffects) {
          oEntitySideEffects[oSideEffects.fullyQualifiedName] = oSideEffects;
        });

        return oEntitySideEffects;
      }
    }, {
      key: "getInterface",
      value: function getInterface() {
        return this;
      }
    }]);

    return SideEffectsService;
  }(Service);

  var SideEffectsServiceFactory = /*#__PURE__*/function (_ServiceFactory) {
    _inherits(SideEffectsServiceFactory, _ServiceFactory);

    var _super2 = _createSuper(SideEffectsServiceFactory);

    function SideEffectsServiceFactory() {
      _classCallCheck(this, SideEffectsServiceFactory);

      return _super2.apply(this, arguments);
    }

    _createClass(SideEffectsServiceFactory, [{
      key: "createInstance",
      value: function createInstance(oServiceContext) {
        var SideEffectsServiceService = new SideEffectsService(oServiceContext);
        return SideEffectsServiceService.initPromise;
      }
    }]);

    return SideEffectsServiceFactory;
  }(ServiceFactory);

  return SideEffectsServiceFactory;
}, false);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNpZGVFZmZlY3RzU2VydmljZUZhY3RvcnkudHMiXSwibmFtZXMiOlsiU2lkZUVmZmVjdHNTZXJ2aWNlIiwiX29TaWRlRWZmZWN0c1R5cGUiLCJvRGF0YSIsImVudGl0aWVzIiwiYWN0aW9ucyIsImNvbnRyb2wiLCJfYkluaXRpYWxpemVkIiwiaW5pdFByb21pc2UiLCJQcm9taXNlIiwicmVzb2x2ZSIsInNFbnRpdHlUeXBlIiwib1NpZGVFZmZlY3QiLCJzb3VyY2VDb250cm9sSWQiLCJvQ29udHJvbFNpZGVFZmZlY3QiLCJmdWxseVF1YWxpZmllZE5hbWUiLCJtRW50aXR5Q29udHJvbFNpZGVFZmZlY3RzIiwic1RyaWdnZXJBY3Rpb24iLCJvQ29udGV4dCIsInNHcm91cElkIiwib1RyaWdnZXJBY3Rpb24iLCJnZXRNb2RlbCIsImJpbmRDb250ZXh0IiwiZXhlY3V0ZSIsImdldEJpbmRpbmciLCJnZXRVcGRhdGVHcm91cElkIiwiZ2V0Q29udGV4dCIsIm9Db21wb25lbnQiLCJzY29wZU9iamVjdCIsIm9NZXRhTW9kZWwiLCJnZXRNZXRhTW9kZWwiLCJjb252ZXJ0VHlwZXMiLCJfb0NhcGFiaWxpdGllcyIsInNNZXRhUGF0aCIsImdldE1ldGFQYXRoIiwiZ2V0UGF0aCIsImdldE9iamVjdCIsInNFbnRpdHlUeXBlTmFtZSIsInNBY3Rpb25OYW1lIiwiZ2V0RW50aXR5VHlwZUZyb21Db250ZXh0IiwidW5kZWZpbmVkIiwib0NhcGFiaWxpdGllcyIsIm9Db252ZXJ0ZWRNZXRhTW9kZWwiLCJnZXRDb252ZXJ0ZWRNZXRhTW9kZWwiLCJlbnRpdHlUeXBlcyIsImZvckVhY2giLCJlbnRpdHlUeXBlIiwiX3JldHJpZXZlT0RhdGFFbnRpdHlTaWRlRWZmZWN0cyIsIl9yZXRyaWV2ZU9EYXRhQWN0aW9uc1NpZGVFZmZlY3RzIiwic0NvbnRyb2xJZCIsIk9iamVjdCIsImtleXMiLCJhUGF0aEV4cHJlc3Npb25zIiwiX2xvZ1JlcXVlc3QiLCJvUHJvbWlzZSIsInJlcXVlc3RTaWRlRWZmZWN0cyIsImUiLCJyZWplY3QiLCJzTmF2aWdhdGlvblByb3BlcnR5Iiwic0Jhc2VFbnRpdHlUeXBlIiwiYVNpZGVFZmZlY3RzIiwiZ2V0T0RhdGFFbnRpdHlTaWRlRWZmZWN0cyIsImFUYXJnZXRzIiwiZmlsdGVyIiwic0Fubm90YXRpb25OYW1lIiwib1NpZGVFZmZlY3RzIiwiU291cmNlUHJvcGVydGllcyIsInNvbWUiLCJvUHJvcGVydHlQYXRoIiwidmFsdWUiLCJpbmRleE9mIiwiU291cmNlRW50aXRpZXMiLCJvTmF2aWdhdGlvblByb3BlcnR5UGF0aCIsIlRyaWdnZXJBY3Rpb24iLCJleGVjdXRlQWN0aW9uIiwiVGFyZ2V0RW50aXRpZXMiLCJjb25jYXQiLCJUYXJnZXRQcm9wZXJ0aWVzIiwibVRhcmdldCIsInB1c2giLCJfcmVtb3ZlRHVwbGljYXRlVGFyZ2V0cyIsImxlbmd0aCIsImNhdGNoIiwib0Vycm9yIiwiTG9nIiwiZXJyb3IiLCJtRW50aXR5VHlwZSIsImFJbml0aWFsUHJvcGVydGllcyIsImFFbnRpdGllc1JlcXVlc3RlZCIsIm1hcCIsIm5hdmlnYXRpb24iLCIkTmF2aWdhdGlvblByb3BlcnR5UGF0aCIsImFEZXJpdmVkUHJvcGVydGllcyIsInNQcm9wZXJ0eVBhdGgiLCJiSXNTdGFyUHJvcGVydHkiLCJlbmRzV2l0aCIsInNOYXZpZ2F0aW9uUHJvcGVydHlQYXRoIiwic3Vic3RyaW5nIiwibGFzdEluZGV4T2YiLCJzUmVsYXRpdmVQYXRoIiwicmVzb2x2ZVBhdGgiLCJhVGFyZ2V0RW50aXR5UHJvcGVydGllcyIsImVudGl0eVByb3BlcnRpZXMiLCJ0YXJnZXRUeXBlIiwicHJvcGVydGllcyIsIm1Qcm9wZXJ0eSIsIm5hdmlnYXRpb25QYXRoIiwicHJvcGVydHkiLCJmaW5kIiwibmFtZSIsInNwbGl0IiwicG9wIiwiaW5mbyIsIm1Qcm9wZXJ0eUluZm8iLCJzVGFyZ2V0VGV4dFBhdGgiLCJhbm5vdGF0aW9ucyIsIkNvbW1vbiIsIlRleHQiLCJwYXRoIiwic1RleHRQYXRoRnJvbUluaXRpYWxFbnRpdHkiLCJzQmluZGluZ1BhcmFtZXRlciIsIm9FbnRpdHlUeXBlIiwib1RlbXBTaWRlRWZmZWN0cyIsIl9yZW1vdmVCaW5kaW5nUGFyYW1ldGVyIiwiX2NvbnZlcnRUYXJnZXRzRm9ybWF0IiwiX3JlcGxhY2VSZWZlcmVuY2VkUHJvcGVydGllcyIsIl9hZGRSZXF1aXJlZFRleHRQcm9wZXJ0aWVzIiwicmVkdWNlIiwiYVRhcmdldFByb3BlcnRpZXMiLCJ2VGFyZ2V0Iiwic1RhcmdldCIsInR5cGUiLCJtVGFyZ2V0RW50aXR5Iiwib1NvdXJjZSIsImF1dGhvcml6ZWRUeXBlcyIsIl90eXBlIiwic291cmNlRW50aXR5VHlwZSIsIm1Db21tb25Bbm5vdGF0aW9uIiwibUJpbmRpbmdQYXJhbWV0ZXIiLCJwYXJhbWV0ZXJzIiwibVBhcmFtZXRlciIsIiRUeXBlIiwiX2NvbnZlcnRTaWRlRWZmZWN0cyIsInNUYXJnZXRQYXRocyIsInNQYXRocyIsImRlYnVnIiwic0JpbmRpbmdQYXJhbWV0ZXJOYW1lIiwiYk5hdmlnYXRpb25Qcm9wZXJ0eVBhdGgiLCJzVmFsdWUiLCJyZXBsYWNlIiwiUmVnRXhwIiwiaUluZGV4IiwiZmluZEluZGV4IiwibVNlYXJjaFRhcmdldCIsImJTaWRlRWZmZWN0c0NoYW5nZWQiLCJhRW50aXRpZXMiLCJtTmF2aWdhdGlvbiIsImFQcm9wZXJ0aWVzIiwiYlRhcmdldENoYW5nZWQiLCJpTGFzdFBhdGhTZXBhcmF0b3JJbmRleCIsInNOYXZpZ2F0aW9uUGF0aCIsIm9UYXJnZXQiLCJpbmNsdWRlcyIsImFBY3Rpb25zIiwib0FjdGlvbiIsInRyaWdnZXJBY3Rpb25zIiwicGF0aEV4cHJlc3Npb25zIiwiX2dldFNpZGVFZmZlY3RzRnJvbVNvdXJjZSIsIm9FbnRpdHlTaWRlRWZmZWN0cyIsIlNlcnZpY2UiLCJTaWRlRWZmZWN0c1NlcnZpY2VGYWN0b3J5Iiwib1NlcnZpY2VDb250ZXh0IiwiU2lkZUVmZmVjdHNTZXJ2aWNlU2VydmljZSIsIlNlcnZpY2VGYWN0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c0Q7QUFDcEUsWUFBTUMseUJBQXlCLEdBQUcsSUFBSTNLLGtCQUFKLENBQXVCMEssZUFBdkIsQ0FBbEM7QUFDQSxlQUFPQyx5QkFBeUIsQ0FBQ3BLLFdBQWpDO0FBQ0E7Ozs7SUFKc0NxSyxjOztTQU96QkgseUIiLCJzb3VyY2VSb290IjoiLiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNlcnZpY2VGYWN0b3J5LCBTZXJ2aWNlLCBTZXJ2aWNlQ29udGV4dCB9IGZyb20gXCJzYXAvdWkvY29yZS9zZXJ2aWNlXCI7XG5pbXBvcnQgeyBDb252ZXJ0ZXJPdXRwdXQsIEVudGl0eVR5cGUsIE5hdmlnYXRpb25Qcm9wZXJ0eSwgUHJvcGVydHkgfSBmcm9tIFwiQHNhcC11eC9hbm5vdGF0aW9uLWNvbnZlcnRlclwiO1xuaW1wb3J0IHsgQ29udGV4dCwgT0RhdGFNZXRhTW9kZWwgfSBmcm9tIFwic2FwL3VpL21vZGVsL29kYXRhL3Y0XCI7XG5pbXBvcnQgeyBjb252ZXJ0VHlwZXMsIEVudmlyb25tZW50Q2FwYWJpbGl0aWVzIH0gZnJvbSBcInNhcC9mZS9jb3JlL2NvbnZlcnRlcnMvTWV0YU1vZGVsQ29udmVydGVyXCI7XG5pbXBvcnQgeyBDb21tb25Bbm5vdGF0aW9uVHlwZXMsIFF1YWxpZmllZE5hbWUgfSBmcm9tIFwiQHNhcC11eC92b2NhYnVsYXJpZXMtdHlwZXMvZGlzdC9nZW5lcmF0ZWQvQ29tbW9uXCI7XG5pbXBvcnQgeyBBY3Rpb24sIE5hdmlnYXRpb25Qcm9wZXJ0eVBhdGgsIFByb3BlcnR5UGF0aCB9IGZyb20gXCJAc2FwLXV4L3ZvY2FidWxhcmllcy10eXBlc1wiO1xuaW1wb3J0IHsgTG9nIH0gZnJvbSBcInNhcC9iYXNlXCI7XG5cbnR5cGUgU2lkZUVmZmVjdHNTZXR0aW5ncyA9IHt9O1xuXG50eXBlIFNpZGVFZmZlY3RzVGFyZ2V0RW50aXR5VHlwZSA9IHtcblx0JE5hdmlnYXRpb25Qcm9wZXJ0eVBhdGg6IHN0cmluZztcbn07XG50eXBlIFNpZGVFZmZlY3RzVGFyZ2V0ID0gU2lkZUVmZmVjdHNUYXJnZXRFbnRpdHlUeXBlIHwgc3RyaW5nO1xuXG50eXBlIFNpZGVFZmZlY3RzVGFyZ2V0VHlwZSA9IHtcblx0VGFyZ2V0UHJvcGVydGllczogc3RyaW5nW107XG5cdFRhcmdldEVudGl0aWVzOiBTaWRlRWZmZWN0c1RhcmdldEVudGl0eVR5cGVbXTtcbn07XG5cbnR5cGUgQmFzZUFubm90YXRpb25TaWRlRWZmZWN0c1R5cGUgPSB7XG5cdFRhcmdldFByb3BlcnRpZXM6IHN0cmluZ1tdO1xuXHRUYXJnZXRFbnRpdGllczogTmF2aWdhdGlvblByb3BlcnR5UGF0aFtdO1xuXHRmdWxseVF1YWxpZmllZE5hbWU6IHN0cmluZztcbn07XG5cbnR5cGUgQmFzZVNpZGVFZmZlY3RzVHlwZSA9IHtcblx0ZnVsbHlRdWFsaWZpZWROYW1lOiBzdHJpbmc7XG59ICYgU2lkZUVmZmVjdHNUYXJnZXRUeXBlO1xuXG50eXBlIEFjdGlvblNpZGVFZmZlY3RzVHlwZSA9IHtcblx0cGF0aEV4cHJlc3Npb25zOiBTaWRlRWZmZWN0c1RhcmdldFtdO1xuXHR0cmlnZ2VyQWN0aW9ucz86IFF1YWxpZmllZE5hbWVbXTtcbn07XG5cbmV4cG9ydCB0eXBlIENvbnRyb2xTaWRlRWZmZWN0c1R5cGUgPSBQYXJ0aWFsPEJhc2VTaWRlRWZmZWN0c1R5cGU+ICYge1xuXHRmdWxseVF1YWxpZmllZE5hbWU6IHN0cmluZztcblx0U291cmNlUHJvcGVydGllczogc3RyaW5nW107XG5cdHNvdXJjZUNvbnRyb2xJZDogc3RyaW5nO1xufTtcblxuZXhwb3J0IHR5cGUgT0RhdGFTaWRlRWZmZWN0c1R5cGUgPSBCYXNlU2lkZUVmZmVjdHNUeXBlICYge1xuXHRTb3VyY2VQcm9wZXJ0aWVzPzogUHJvcGVydHlQYXRoW107XG5cdFNvdXJjZUVudGl0aWVzPzogTmF2aWdhdGlvblByb3BlcnR5UGF0aFtdO1xuXHRUcmlnZ2VyQWN0aW9uPzogUXVhbGlmaWVkTmFtZTtcbn07XG5cbmV4cG9ydCB0eXBlIFNpZGVFZmZlY3RzVHlwZSA9IENvbnRyb2xTaWRlRWZmZWN0c1R5cGUgfCBPRGF0YVNpZGVFZmZlY3RzVHlwZTtcblxuZXhwb3J0IHR5cGUgT0RhdGFTaWRlRWZmZWN0c0VudGl0eURpY3Rpb25hcnkgPSBSZWNvcmQ8c3RyaW5nLCBPRGF0YVNpZGVFZmZlY3RzVHlwZT47XG5leHBvcnQgdHlwZSBPRGF0YVNpZGVFZmZlY3RzQWN0aW9uRGljdGlvbmFyeSA9IFJlY29yZDxzdHJpbmcsIEFjdGlvblNpZGVFZmZlY3RzVHlwZT47XG5leHBvcnQgdHlwZSBDb250cm9sU2lkZUVmZmVjdHNFbnRpdHlEaWN0aW9uYXJ5ID0gUmVjb3JkPHN0cmluZywgQ29udHJvbFNpZGVFZmZlY3RzVHlwZT47XG5cbnR5cGUgU2lkZUVmZmVjdHNPcmlnaW5SZWdpc3RyeSA9IHtcblx0b0RhdGE6IHtcblx0XHRlbnRpdGllczoge1xuXHRcdFx0W2VudGl0eTogc3RyaW5nXTogUmVjb3JkPHN0cmluZywgT0RhdGFTaWRlRWZmZWN0c1R5cGU+O1xuXHRcdH07XG5cdFx0YWN0aW9uczoge1xuXHRcdFx0W2VudGl0eTogc3RyaW5nXTogUmVjb3JkPHN0cmluZywgQWN0aW9uU2lkZUVmZmVjdHNUeXBlPjtcblx0XHR9O1xuXHR9O1xuXHRjb250cm9sOiB7XG5cdFx0W2VudGl0eTogc3RyaW5nXTogUmVjb3JkPHN0cmluZywgQ29udHJvbFNpZGVFZmZlY3RzVHlwZT47XG5cdH07XG59O1xuXG50eXBlIEV4dHJhY3RvclByb3BlcnR5SW5mbyA9IHtcblx0cHJvcGVydHk6IFByb3BlcnR5O1xuXHRuYXZpZ2F0aW9uUGF0aD86IHN0cmluZztcbn07XG5cbmNsYXNzIFNpZGVFZmZlY3RzU2VydmljZSBleHRlbmRzIFNlcnZpY2U8U2lkZUVmZmVjdHNTZXR0aW5ncz4ge1xuXHRpbml0UHJvbWlzZSE6IFByb21pc2U8YW55Pjtcblx0X29TaWRlRWZmZWN0c1R5cGUhOiBTaWRlRWZmZWN0c09yaWdpblJlZ2lzdHJ5O1xuXHRfb0NhcGFiaWxpdGllcyE6IEVudmlyb25tZW50Q2FwYWJpbGl0aWVzIHwgdW5kZWZpbmVkO1xuXHRfYkluaXRpYWxpemVkITogQm9vbGVhbjtcblx0Ly8gITogbWVhbnMgdGhhdCB3ZSBrbm93IGl0IHdpbGwgYmUgYXNzaWduZWQgYmVmb3JlIHVzYWdlXG5cdGluaXQoKSB7XG5cdFx0dGhpcy5fb1NpZGVFZmZlY3RzVHlwZSA9IHtcblx0XHRcdG9EYXRhOiB7XG5cdFx0XHRcdGVudGl0aWVzOiB7fSxcblx0XHRcdFx0YWN0aW9uczoge31cblx0XHRcdH0sXG5cdFx0XHRjb250cm9sOiB7fVxuXHRcdH07XG5cdFx0dGhpcy5fYkluaXRpYWxpemVkID0gZmFsc2U7XG5cdFx0dGhpcy5pbml0UHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZSh0aGlzKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBBZGRzIGEgU2lkZUVmZmVjdHMgY29udHJvbFxuXHQgKiBTaWRlRWZmZWN0cyBkZWZpbml0aW9uIGlzIGFkZGVkIGJ5IGEgY29udHJvbCB0byBrZWVwIGRhdGEgdXAgdG8gZGF0ZVxuXHQgKiBUaGVzZSBTaWRlRWZmZWN0cyBnZXQgbGltaXRlZCBzY29wZSBjb21wYXJlZCB3aXRoIFNpZGVFZmZlY3RzIGNvbWluZyBmcm9tIGFuIE9EYXRhIHNlcnZpY2U6XG5cdCAqIC0gT25seSBvbmUgU2lkZUVmZmVjdHMgZGVmaW5pdGlvbiBjYW4gYmUgZGVmaW5lZCBmb3IgdGhlIGNvbWJpbmF0aW9uIGVudGl0eSB0eXBlIC0gY29udHJvbCBJZFxuXHQgKiAtIE9ubHkgU2lkZUVmZmVjdHMgc291cmNlIHByb3BlcnRpZXMgYXJlIHJlY29nbml6ZWQgYW5kIHVzZWQgdG8gdHJpZ2dlciBTaWRlRWZmZWN0c1xuXHQgKlxuXHQgKiBFbnN1cmUgdGhlIHNvdXJjZUNvbnRyb2xJZCBtYXRjaGVzIHRoZSBhc3NvY2lhdGVkIFNBUFVJNSBjb250cm9sIElELlxuXHQgKlxuXHQgKiBAcHJpdmF0ZVxuXHQgKiBAdWk1LXJlc3RyaWN0ZWRcblx0ICogQHBhcmFtIHtzdHJpbmd9IHNFbnRpdHlUeXBlIE5hbWUgb2YgdGhlIGVudGl0eSB0eXBlXG5cdCAqIEBwYXJhbSB7b2JqZWN0fSBvU2lkZUVmZmVjdCBTaWRlRWZmZWN0cyBkZWZpbml0aW9uXG5cdCAqL1xuXHRwdWJsaWMgYWRkQ29udHJvbFNpZGVFZmZlY3RzKHNFbnRpdHlUeXBlOiBzdHJpbmcsIG9TaWRlRWZmZWN0OiBPbWl0PENvbnRyb2xTaWRlRWZmZWN0c1R5cGUsIFwiZnVsbHlRdWFsaWZpZWROYW1lXCI+KTogdm9pZCB7XG5cdFx0aWYgKG9TaWRlRWZmZWN0LnNvdXJjZUNvbnRyb2xJZCkge1xuXHRcdFx0Y29uc3Qgb0NvbnRyb2xTaWRlRWZmZWN0OiBDb250cm9sU2lkZUVmZmVjdHNUeXBlID0ge1xuXHRcdFx0XHQuLi5vU2lkZUVmZmVjdCxcblx0XHRcdFx0ZnVsbHlRdWFsaWZpZWROYW1lOiBzRW50aXR5VHlwZSArIFwiL1NpZGVFZmZlY3RzRm9yQ29udHJvbC9cIiArIG9TaWRlRWZmZWN0LnNvdXJjZUNvbnRyb2xJZFxuXHRcdFx0fTtcblx0XHRcdGNvbnN0IG1FbnRpdHlDb250cm9sU2lkZUVmZmVjdHMgPSB0aGlzLl9vU2lkZUVmZmVjdHNUeXBlLmNvbnRyb2xbc0VudGl0eVR5cGVdIHx8IHt9O1xuXHRcdFx0bUVudGl0eUNvbnRyb2xTaWRlRWZmZWN0c1tvQ29udHJvbFNpZGVFZmZlY3Quc291cmNlQ29udHJvbElkXSA9IG9Db250cm9sU2lkZUVmZmVjdDtcblx0XHRcdHRoaXMuX29TaWRlRWZmZWN0c1R5cGUuY29udHJvbFtzRW50aXR5VHlwZV0gPSBtRW50aXR5Q29udHJvbFNpZGVFZmZlY3RzO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBFeGVjdXRlcyBTaWRlRWZmZWN0cyBhY3Rpb24uXG5cdCAqXG5cdCAqIEBwcml2YXRlXG5cdCAqIEB1aTUtcmVzdHJpY3RlZFxuXHQgKiBAcGFyYW0ge3N0cmluZ30gc1RyaWdnZXJBY3Rpb24gTmFtZSBvZiB0aGUgYWN0aW9uXG5cdCAqIEBwYXJhbSB7b2JqZWN0fSBvQ29udGV4dCBDb250ZXh0XG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBzR3JvdXBJZCBUaGUgZ3JvdXAgSUQgdG8gYmUgdXNlZCBmb3IgdGhlIHJlcXVlc3Rcblx0ICovXG5cdHB1YmxpYyBleGVjdXRlQWN0aW9uKHNUcmlnZ2VyQWN0aW9uOiBTdHJpbmcsIG9Db250ZXh0OiBDb250ZXh0LCBzR3JvdXBJZD86IHN0cmluZykge1xuXHRcdGNvbnN0IG9UcmlnZ2VyQWN0aW9uOiBhbnkgPSBvQ29udGV4dC5nZXRNb2RlbCgpLmJpbmRDb250ZXh0KHNUcmlnZ2VyQWN0aW9uICsgXCIoLi4uKVwiLCBvQ29udGV4dCk7XG5cdFx0b1RyaWdnZXJBY3Rpb24uZXhlY3V0ZShzR3JvdXBJZCB8fCAob0NvbnRleHQgYXMgYW55KS5nZXRCaW5kaW5nKCkuZ2V0VXBkYXRlR3JvdXBJZCgpKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBHZXRzIGNvbnZlcnRlZCBPRGF0YSBtZXRhTW9kZWwuXG5cdCAqXG5cdCAqIEBwcml2YXRlXG5cdCAqIEB1aTUtcmVzdHJpY3RlZFxuXHQgKiBAcmV0dXJucyB7b2JqZWN0fSBDb252ZXJ0ZWQgT0RhdGEgbWV0YU1vZGVsXG5cdCAqL1xuXHRwdWJsaWMgZ2V0Q29udmVydGVkTWV0YU1vZGVsKCk6IENvbnZlcnRlck91dHB1dCB7XG5cdFx0Y29uc3Qgb0NvbnRleHQgPSB0aGlzLmdldENvbnRleHQoKTtcblx0XHRjb25zdCBvQ29tcG9uZW50ID0gb0NvbnRleHQuc2NvcGVPYmplY3QgYXMgYW55O1xuXHRcdGNvbnN0IG9NZXRhTW9kZWw6IE9EYXRhTWV0YU1vZGVsID0gb0NvbXBvbmVudC5nZXRNb2RlbCgpLmdldE1ldGFNb2RlbCgpO1xuXHRcdHJldHVybiBjb252ZXJ0VHlwZXMob01ldGFNb2RlbCwgdGhpcy5fb0NhcGFiaWxpdGllcyk7XG5cdH1cblxuXHQvKipcblx0ICogR2V0cyB0aGUgZW50aXR5IHR5cGUgb2YgYSBjb250ZXh0LlxuXHQgKlxuXHQgKiBAZnVuY3Rpb25cblx0ICogQG5hbWUgZ2V0RW50aXR5VHlwZUZyb21Db250ZXh0XG5cdCAqIEBwYXJhbSB7b2JqZWN0fSBvQ29udGV4dCBDb250ZXh0XG5cdCAqIEByZXR1cm5zIHtzdHJpbmcgfCB1bmRlZmluZWQgfSBFbnRpdHkgVHlwZVxuXHQgKi9cblx0cHVibGljIGdldEVudGl0eVR5cGVGcm9tQ29udGV4dChvQ29udGV4dDogQ29udGV4dCk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG5cdFx0Y29uc3Qgb01ldGFNb2RlbCA9IG9Db250ZXh0LmdldE1vZGVsKCkuZ2V0TWV0YU1vZGVsKCksXG5cdFx0XHRzTWV0YVBhdGggPSAob01ldGFNb2RlbCBhcyBhbnkpLmdldE1ldGFQYXRoKG9Db250ZXh0LmdldFBhdGgoKSksXG5cdFx0XHRzRW50aXR5VHlwZSA9IG9NZXRhTW9kZWwuZ2V0T2JqZWN0KHNNZXRhUGF0aClbXCIkVHlwZVwiXTtcblx0XHRyZXR1cm4gc0VudGl0eVR5cGU7XG5cdH1cblxuXHQvKipcblx0ICogR2V0cyB0aGUgU2lkZUVmZmVjdHMgdGhhdCBjb21lIGZyb20gYW4gT0RhdGEgc2VydmljZS5cblx0ICpcblx0ICogQHByaXZhdGVcblx0ICogQHVpNS1yZXN0cmljdGVkXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBzRW50aXR5VHlwZU5hbWUgTmFtZSBvZiB0aGUgZW50aXR5IHR5cGVcblx0ICogQHJldHVybnMge29iamVjdH0gU2lkZUVmZmVjdHMgZGljdGlvbmFyeVxuXHQgKi9cblx0cHVibGljIGdldE9EYXRhRW50aXR5U2lkZUVmZmVjdHMoc0VudGl0eVR5cGVOYW1lOiBzdHJpbmcpOiBSZWNvcmQ8c3RyaW5nLCBPRGF0YVNpZGVFZmZlY3RzVHlwZT4ge1xuXHRcdHJldHVybiB0aGlzLl9vU2lkZUVmZmVjdHNUeXBlLm9EYXRhLmVudGl0aWVzW3NFbnRpdHlUeXBlTmFtZV0gfHwge307XG5cdH1cblxuXHQvKipcblx0ICogR2V0cyB0aGUgU2lkZUVmZmVjdHMgdGhhdCBjb21lIGZyb20gYW4gT0RhdGEgc2VydmljZS5cblx0ICpcblx0ICogQHByaXZhdGVcblx0ICogQHVpNS1yZXN0cmljdGVkXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBzQWN0aW9uTmFtZSBOYW1lIG9mIHRoZSBhY3Rpb25cblx0ICogQHBhcmFtIHtvYmplY3R9IG9Db250ZXh0IENvbnRleHRcblx0ICogQHJldHVybnMge29iamVjdH0gU2lkZUVmZmVjdHMgZGVmaW5pdGlvblxuXHQgKi9cblx0cHVibGljIGdldE9EYXRhQWN0aW9uU2lkZUVmZmVjdHMoc0FjdGlvbk5hbWU6IHN0cmluZywgb0NvbnRleHQ/OiBDb250ZXh0KTogQWN0aW9uU2lkZUVmZmVjdHNUeXBlIHwgdW5kZWZpbmVkIHtcblx0XHRpZiAob0NvbnRleHQpIHtcblx0XHRcdGNvbnN0IHNFbnRpdHlUeXBlID0gdGhpcy5nZXRFbnRpdHlUeXBlRnJvbUNvbnRleHQob0NvbnRleHQpO1xuXHRcdFx0aWYgKHNFbnRpdHlUeXBlKSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLl9vU2lkZUVmZmVjdHNUeXBlLm9EYXRhLmFjdGlvbnNbc0VudGl0eVR5cGVdPy5bc0FjdGlvbk5hbWVdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gdW5kZWZpbmVkO1xuXHR9XG5cblx0LyoqXG5cdCAqIEdlbmVyYXRlcyB0aGUgZGljdGlvbmFyeSBmb3IgdGhlIFNpZGVFZmZlY3RzLlxuXHQgKlxuXHQgKiBAcHJpdmF0ZVxuXHQgKiBAdWk1LXJlc3RyaWN0ZWRcblx0ICogQHBhcmFtIG9DYXBhYmlsaXRpZXMgVGhlIGN1cnJlbnQgY2FwYWJpbGl0aWVzXG5cdCAqL1xuXHRwdWJsaWMgaW5pdGlhbGl6ZVNpZGVFZmZlY3RzKG9DYXBhYmlsaXRpZXM/OiBFbnZpcm9ubWVudENhcGFiaWxpdGllcyk6IHZvaWQge1xuXHRcdHRoaXMuX29DYXBhYmlsaXRpZXMgPSBvQ2FwYWJpbGl0aWVzO1xuXHRcdGlmICghdGhpcy5fYkluaXRpYWxpemVkKSB7XG5cdFx0XHRjb25zdCBvQ29udmVydGVkTWV0YU1vZGVsID0gdGhpcy5nZXRDb252ZXJ0ZWRNZXRhTW9kZWwoKTtcblx0XHRcdG9Db252ZXJ0ZWRNZXRhTW9kZWwuZW50aXR5VHlwZXMuZm9yRWFjaChlbnRpdHlUeXBlID0+IHtcblx0XHRcdFx0dGhpcy5fb1NpZGVFZmZlY3RzVHlwZS5vRGF0YS5lbnRpdGllc1tlbnRpdHlUeXBlLmZ1bGx5UXVhbGlmaWVkTmFtZV0gPSB0aGlzLl9yZXRyaWV2ZU9EYXRhRW50aXR5U2lkZUVmZmVjdHMoZW50aXR5VHlwZSk7XG5cdFx0XHRcdHRoaXMuX29TaWRlRWZmZWN0c1R5cGUub0RhdGEuYWN0aW9uc1tlbnRpdHlUeXBlLmZ1bGx5UXVhbGlmaWVkTmFtZV0gPSB0aGlzLl9yZXRyaWV2ZU9EYXRhQWN0aW9uc1NpZGVFZmZlY3RzKGVudGl0eVR5cGUpOyAvLyBvbmx5IGJvdW5kIGFjdGlvbnMgYXJlIGFuYWx5emVkIHNpbmNlIHVuYm91bmQgb25lcyBkb24ndCBnZXQgU2lkZUVmZmVjdHNcblx0XHRcdH0pO1xuXHRcdFx0dGhpcy5fYkluaXRpYWxpemVkID0gdHJ1ZTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogUmVtb3ZlcyBhbGwgU2lkZUVmZmVjdHMgcmVsYXRlZCB0byBhIGNvbnRyb2wuXG5cdCAqXG5cdCAqIEBwcml2YXRlXG5cdCAqIEB1aTUtcmVzdHJpY3RlZFxuXHQgKiBAcGFyYW0ge3N0cmluZ30gc0NvbnRyb2xJZCBDb250cm9sIElkXG5cdCAqL1xuXHRwdWJsaWMgcmVtb3ZlQ29udHJvbFNpZGVFZmZlY3RzKHNDb250cm9sSWQ6IHN0cmluZyk6IHZvaWQge1xuXHRcdE9iamVjdC5rZXlzKHRoaXMuX29TaWRlRWZmZWN0c1R5cGUuY29udHJvbCkuZm9yRWFjaChzRW50aXR5VHlwZSA9PiB7XG5cdFx0XHRpZiAodGhpcy5fb1NpZGVFZmZlY3RzVHlwZS5jb250cm9sW3NFbnRpdHlUeXBlXVtzQ29udHJvbElkXSkge1xuXHRcdFx0XHRkZWxldGUgdGhpcy5fb1NpZGVFZmZlY3RzVHlwZS5jb250cm9sW3NFbnRpdHlUeXBlXVtzQ29udHJvbElkXTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXF1ZXN0IFNpZGVFZmZlY3RzIG9uIGEgc3BlY2lmaWMgY29udGV4dC5cblx0ICpcblx0ICogQGZ1bmN0aW9uXG5cdCAqIEBuYW1lIHJlcXVlc3RTaWRlRWZmZWN0c1xuXHQgKiBAcGFyYW0ge0FycmF5fSBhUGF0aEV4cHJlc3Npb25zIFRhcmdldHMgb2YgU2lkZUVmZmVjdHMgdG8gYmUgZXhlY3V0ZWRcblx0ICogQHBhcmFtIHtvYmplY3R9IG9Db250ZXh0IENvbnRleHQgd2hlcmUgU2lkZUVmZmVjdHMgbmVlZCB0byBiZSBleGVjdXRlZFxuXHQgKiBAcGFyYW0ge3N0cmluZ30gc0dyb3VwSWQgVGhlIGdyb3VwIElEIHRvIGJlIHVzZWQgZm9yIHRoZSByZXF1ZXN0XG5cdCAqIEByZXR1cm5zIHtQcm9taXNlfSBQcm9taXNlIG9uIFNpZGVFZmZlY3RzIHJlcXVlc3Rcblx0ICovXG5cdHB1YmxpYyByZXF1ZXN0U2lkZUVmZmVjdHMoYVBhdGhFeHByZXNzaW9uczogU2lkZUVmZmVjdHNUYXJnZXRbXSwgb0NvbnRleHQ6IENvbnRleHQsIHNHcm91cElkPzogc3RyaW5nKTogUHJvbWlzZTxhbnk+IHtcblx0XHR0aGlzLl9sb2dSZXF1ZXN0KGFQYXRoRXhwcmVzc2lvbnMsIG9Db250ZXh0KTtcblx0XHRsZXQgb1Byb21pc2U6IFByb21pc2U8YW55Pjtcblx0XHQvKipcblx0XHQgKiBDb250ZXh0LnJlcXVlc3RTaWRlRWZmZWN0cyBlaXRoZXIgcmV0dXJucyBhIHByb21pc2Ugb3IgdGhyb3dzIGEgbmV3IGVycm9yLiBUaGlzIHJldHVybiBpcyBjYXVnaHQgaWYgYW4gZXJyb3IgaXMgdGhyb3duXG5cdFx0ICogdG8gYXZvaWQgYnJlYWtpbmcgdGhlIHByb21pc2UgY2hhaW4uXG5cdFx0ICovXG5cdFx0dHJ5IHtcblx0XHRcdG9Qcm9taXNlID0gKG9Db250ZXh0IGFzIGFueSkucmVxdWVzdFNpZGVFZmZlY3RzKGFQYXRoRXhwcmVzc2lvbnMsIHNHcm91cElkKSBhcyBQcm9taXNlPGFueT47XG5cdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0b1Byb21pc2UgPSBQcm9taXNlLnJlamVjdChlKTtcblx0XHR9XG5cdFx0cmV0dXJuIG9Qcm9taXNlO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJlcXVlc3QgU2lkZUVmZmVjdHMgZm9yIGEgbmF2aWdhdGlvbiBwcm9wZXJ0eSBvbiBhIHNwZWNpZmljIGNvbnRleHQuXG5cdCAqXG5cdCAqIEBmdW5jdGlvblxuXHQgKiBAbmFtZSByZXF1ZXN0U2lkZUVmZmVjdHNGb3JOYXZpZ2F0aW9uUHJvcGVydHlcblx0ICogQHBhcmFtIHtzdHJpbmd9IHNOYXZpZ2F0aW9uUHJvcGVydHkgTmF2aWdhdGlvbiBwcm9wZXJ0eVxuXHQgKiBAcGFyYW0ge29iamVjdH0gb0NvbnRleHQgQ29udGV4dCB3aGVyZSBTaWRlRWZmZWN0cyBuZWVkIHRvIGJlIGV4ZWN1dGVkXG5cdCAqIEByZXR1cm5zIHtvYmplY3R9IFNpZGVFZmZlY3RzIHJlcXVlc3Qgb24gU0FQVUk1IGNvbnRleHRcblx0ICovXG5cdHB1YmxpYyByZXF1ZXN0U2lkZUVmZmVjdHNGb3JOYXZpZ2F0aW9uUHJvcGVydHkoc05hdmlnYXRpb25Qcm9wZXJ0eTogc3RyaW5nLCBvQ29udGV4dDogQ29udGV4dCk6IFByb21pc2U8YW55PiB7XG5cdFx0Y29uc3Qgc0Jhc2VFbnRpdHlUeXBlID0gdGhpcy5nZXRFbnRpdHlUeXBlRnJvbUNvbnRleHQob0NvbnRleHQpO1xuXHRcdGlmIChzQmFzZUVudGl0eVR5cGUpIHtcblx0XHRcdGNvbnN0IGFTaWRlRWZmZWN0cyA9IHRoaXMuZ2V0T0RhdGFFbnRpdHlTaWRlRWZmZWN0cyhzQmFzZUVudGl0eVR5cGUpO1xuXHRcdFx0bGV0IGFUYXJnZXRzOiBTaWRlRWZmZWN0c1RhcmdldFtdID0gW107XG5cdFx0XHRPYmplY3Qua2V5cyhhU2lkZUVmZmVjdHMpXG5cdFx0XHRcdC5maWx0ZXIoXG5cdFx0XHRcdFx0Ly8gS2VlcCByZWxldmFudCBTaWRlRWZmZWN0c1xuXHRcdFx0XHRcdHNBbm5vdGF0aW9uTmFtZSA9PiB7XG5cdFx0XHRcdFx0XHRjb25zdCBvU2lkZUVmZmVjdHM6IE9EYXRhU2lkZUVmZmVjdHNUeXBlID0gYVNpZGVFZmZlY3RzW3NBbm5vdGF0aW9uTmFtZV07XG5cdFx0XHRcdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHRcdFx0XHQob1NpZGVFZmZlY3RzLlNvdXJjZVByb3BlcnRpZXMgfHwgW10pLnNvbWUoXG5cdFx0XHRcdFx0XHRcdFx0b1Byb3BlcnR5UGF0aCA9PiBvUHJvcGVydHlQYXRoLnZhbHVlLmluZGV4T2Yoc05hdmlnYXRpb25Qcm9wZXJ0eSkgPiAtMVxuXHRcdFx0XHRcdFx0XHQpIHx8XG5cdFx0XHRcdFx0XHRcdChvU2lkZUVmZmVjdHMuU291cmNlRW50aXRpZXMgfHwgW10pLnNvbWUoXG5cdFx0XHRcdFx0XHRcdFx0b05hdmlnYXRpb25Qcm9wZXJ0eVBhdGggPT4gb05hdmlnYXRpb25Qcm9wZXJ0eVBhdGgudmFsdWUgPT09IHNOYXZpZ2F0aW9uUHJvcGVydHlcblx0XHRcdFx0XHRcdFx0KVxuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdClcblx0XHRcdFx0LmZvckVhY2goc0Fubm90YXRpb25OYW1lID0+IHtcblx0XHRcdFx0XHRjb25zdCBvU2lkZUVmZmVjdHM6IE9EYXRhU2lkZUVmZmVjdHNUeXBlID0gYVNpZGVFZmZlY3RzW3NBbm5vdGF0aW9uTmFtZV07XG5cdFx0XHRcdFx0aWYgKG9TaWRlRWZmZWN0cy5UcmlnZ2VyQWN0aW9uKSB7XG5cdFx0XHRcdFx0XHR0aGlzLmV4ZWN1dGVBY3Rpb24ob1NpZGVFZmZlY3RzLlRyaWdnZXJBY3Rpb24sIG9Db250ZXh0KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0KChvU2lkZUVmZmVjdHMuVGFyZ2V0RW50aXRpZXMgYXMgYW55W10pIHx8IFtdKVxuXHRcdFx0XHRcdFx0LmNvbmNhdCgob1NpZGVFZmZlY3RzLlRhcmdldFByb3BlcnRpZXMgYXMgYW55W10pIHx8IFtdKVxuXHRcdFx0XHRcdFx0LmZvckVhY2gobVRhcmdldCA9PiBhVGFyZ2V0cy5wdXNoKG1UYXJnZXQpKTtcblx0XHRcdFx0fSk7XG5cdFx0XHQvLyBSZW1vdmUgZHVwbGljYXRlIHByb3BlcnRpZXNcblx0XHRcdGFUYXJnZXRzID0gdGhpcy5fcmVtb3ZlRHVwbGljYXRlVGFyZ2V0cyhhVGFyZ2V0cyk7XG5cdFx0XHRpZiAoYVRhcmdldHMubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5yZXF1ZXN0U2lkZUVmZmVjdHMoYVRhcmdldHMsIG9Db250ZXh0KS5jYXRjaChvRXJyb3IgPT5cblx0XHRcdFx0XHRMb2cuZXJyb3IoXCJTaWRlRWZmZWN0cyAtIEVycm9yIHdoaWxlIHByb2Nlc3NpbmcgU2lkZUVmZmVjdHMgZm9yIE5hdmlnYXRpb24gUHJvcGVydHkgXCIgKyBzTmF2aWdhdGlvblByb3BlcnR5LCBvRXJyb3IpXG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBHZXRzIHRoZSBTaWRlRWZmZWN0cyB0aGF0IGNvbWUgZnJvbSBjb250cm9scy5cblx0ICpcblx0ICogQHByaXZhdGVcblx0ICogQHVpNS1yZXN0cmljdGVkXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBzRW50aXR5VHlwZU5hbWUgRW50aXR5IHR5cGUgTmFtZVxuXHQgKiBAcmV0dXJucyB7b2JqZWN0fSBTaWRlRWZmZWN0cyBkaWN0aW9uYXJ5XG5cdCAqL1xuXHRwdWJsaWMgZ2V0Q29udHJvbEVudGl0eVNpZGVFZmZlY3RzKHNFbnRpdHlUeXBlTmFtZTogc3RyaW5nKTogUmVjb3JkPHN0cmluZywgQ29udHJvbFNpZGVFZmZlY3RzVHlwZT4ge1xuXHRcdHJldHVybiB0aGlzLl9vU2lkZUVmZmVjdHNUeXBlLmNvbnRyb2xbc0VudGl0eVR5cGVOYW1lXSB8fCB7fTtcblx0fVxuXG5cdC8qKlxuXHQgKiBBZGRzIHRoZSB0ZXh0IHByb3BlcnRpZXMgcmVxdWlyZWQgZm9yIFNpZGVFZmZlY3RzXG5cdCAqIElmIGEgcHJvcGVydHkgaGFzIGFuIGFzc29jaWF0ZWQgdGV4dCB0aGVuIHRoaXMgdGV4dCBuZWVkcyB0byBiZSBhZGRlZCBhcyB0YXJnZXRQcm9wZXJ0aWVzLlxuXHQgKlxuXHQgKiBAcHJpdmF0ZVxuXHQgKiBAdWk1LXJlc3RyaWN0ZWRcblx0ICogQHBhcmFtIHtvYmplY3R9IG9TaWRlRWZmZWN0IFNpZGVFZmZlY3RzIGRlZmluaXRpb25cblx0ICogQHBhcmFtIHtvYmplY3R9IG1FbnRpdHlUeXBlIEVudGl0eSB0eXBlXG5cdCAqIEByZXR1cm5zIHtvYmplY3R9IFNpZGVFZmZlY3RzIGRlZmluaXRpb24gd2l0aCBhZGRlZCB0ZXh0IHByb3BlcnRpZXNcblx0ICovXG5cdHByaXZhdGUgX2FkZFJlcXVpcmVkVGV4dFByb3BlcnRpZXMob1NpZGVFZmZlY3Q6IEJhc2VTaWRlRWZmZWN0c1R5cGUsIG1FbnRpdHlUeXBlOiBFbnRpdHlUeXBlKTogQmFzZVNpZGVFZmZlY3RzVHlwZSB7XG5cdFx0Y29uc3QgYUluaXRpYWxQcm9wZXJ0aWVzOiBzdHJpbmdbXSA9IChvU2lkZUVmZmVjdC5UYXJnZXRQcm9wZXJ0aWVzIHx8IFtdKSBhcyBzdHJpbmdbXSxcblx0XHRcdGFFbnRpdGllc1JlcXVlc3RlZDogc3RyaW5nW10gPSAob1NpZGVFZmZlY3QuVGFyZ2V0RW50aXRpZXMgfHwgW10pLm1hcChuYXZpZ2F0aW9uID0+IG5hdmlnYXRpb24uJE5hdmlnYXRpb25Qcm9wZXJ0eVBhdGgpO1xuXHRcdGxldCBhRGVyaXZlZFByb3BlcnRpZXM6IEV4dHJhY3RvclByb3BlcnR5SW5mb1tdID0gW107XG5cblx0XHRhSW5pdGlhbFByb3BlcnRpZXMuZm9yRWFjaChzUHJvcGVydHlQYXRoID0+IHtcblx0XHRcdGNvbnN0IGJJc1N0YXJQcm9wZXJ0eSA9IHNQcm9wZXJ0eVBhdGguZW5kc1dpdGgoXCIqXCIpLCAvLyBDYW4gYmUgJyonIG9yICcuLi4vbmF2UHJvcC8qJ1xuXHRcdFx0XHRzTmF2aWdhdGlvblByb3BlcnR5UGF0aDogc3RyaW5nID0gc1Byb3BlcnR5UGF0aC5zdWJzdHJpbmcoMCwgc1Byb3BlcnR5UGF0aC5sYXN0SW5kZXhPZihcIi9cIikpLFxuXHRcdFx0XHRzUmVsYXRpdmVQYXRoID0gc05hdmlnYXRpb25Qcm9wZXJ0eVBhdGggPyBzTmF2aWdhdGlvblByb3BlcnR5UGF0aCArIFwiL1wiIDogXCJcIixcblx0XHRcdFx0bVRhcmdldDogYW55ID0gbUVudGl0eVR5cGUucmVzb2x2ZVBhdGgoc05hdmlnYXRpb25Qcm9wZXJ0eVBhdGgpIHx8IG1FbnRpdHlUeXBlO1xuXG5cdFx0XHRpZiAobVRhcmdldCkge1xuXHRcdFx0XHQvLyBtVGFyZ2V0IGNhbiBiZSBhbiBlbnRpdHkgdHlwZSwgbmF2aWdhdGlvblByb3BlcnR5IG9yIG9yIGEgY29tcGxleFR5cGVcblx0XHRcdFx0Y29uc3QgYVRhcmdldEVudGl0eVByb3BlcnRpZXM6IFByb3BlcnR5W10gPVxuXHRcdFx0XHRcdChtVGFyZ2V0IGFzIEVudGl0eVR5cGUpLmVudGl0eVByb3BlcnRpZXMgfHxcblx0XHRcdFx0XHQobVRhcmdldCBhcyBQcm9wZXJ0eSkudGFyZ2V0VHlwZT8ucHJvcGVydGllcyB8fFxuXHRcdFx0XHRcdChtVGFyZ2V0IGFzIE5hdmlnYXRpb25Qcm9wZXJ0eSkudGFyZ2V0VHlwZS5lbnRpdHlQcm9wZXJ0aWVzO1xuXHRcdFx0XHRpZiAoYVRhcmdldEVudGl0eVByb3BlcnRpZXMpIHtcblx0XHRcdFx0XHRpZiAoYklzU3RhclByb3BlcnR5KSB7XG5cdFx0XHRcdFx0XHRpZiAoYVRhcmdldEVudGl0eVByb3BlcnRpZXMpIHtcblx0XHRcdFx0XHRcdFx0Ly8gQWRkIGFsbCByZXF1aXJlZCBwcm9wZXJ0aWVzIGJlaGluZCB0aGUgKlxuXHRcdFx0XHRcdFx0XHRhRW50aXRpZXNSZXF1ZXN0ZWQucHVzaChzTmF2aWdhdGlvblByb3BlcnR5UGF0aCk7XG5cdFx0XHRcdFx0XHRcdGFEZXJpdmVkUHJvcGVydGllcyA9IGFEZXJpdmVkUHJvcGVydGllcy5jb25jYXQoXG5cdFx0XHRcdFx0XHRcdFx0YVRhcmdldEVudGl0eVByb3BlcnRpZXMubWFwKG1Qcm9wZXJ0eSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRuYXZpZ2F0aW9uUGF0aDogc1JlbGF0aXZlUGF0aCxcblx0XHRcdFx0XHRcdFx0XHRcdFx0cHJvcGVydHk6IG1Qcm9wZXJ0eVxuXHRcdFx0XHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRhRGVyaXZlZFByb3BlcnRpZXMucHVzaCh7XG5cdFx0XHRcdFx0XHRcdHByb3BlcnR5OiBhVGFyZ2V0RW50aXR5UHJvcGVydGllcy5maW5kKFxuXHRcdFx0XHRcdFx0XHRcdG1Qcm9wZXJ0eSA9PiBtUHJvcGVydHkubmFtZSA9PT0gc1Byb3BlcnR5UGF0aC5zcGxpdChcIi9cIikucG9wKClcblx0XHRcdFx0XHRcdFx0KSBhcyBQcm9wZXJ0eSxcblx0XHRcdFx0XHRcdFx0bmF2aWdhdGlvblBhdGg6IHNSZWxhdGl2ZVBhdGhcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRMb2cuaW5mbyhcIlNpZGVFZmZlY3RzIC0gVGhlIGVudGl0eSB0eXBlIGFzc29jaWF0ZWQgdG8gcHJvcGVydHkgcGF0aCBcIiArIHNQcm9wZXJ0eVBhdGggKyBcIiBjYW5ub3QgYmUgcmVzb2x2ZWRcIik7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdExvZy5pbmZvKFwiU2lkZUVmZmVjdHMgLSBUaGUgcHJvcGVydHkgcGF0aCBcIiArIHNQcm9wZXJ0eVBhdGggKyBcIiBjYW5ub3QgYmUgcmVzb2x2ZWRcIik7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHRhRGVyaXZlZFByb3BlcnRpZXMuZm9yRWFjaChtUHJvcGVydHlJbmZvID0+IHtcblx0XHRcdGlmIChtUHJvcGVydHlJbmZvLnByb3BlcnR5KSB7XG5cdFx0XHRcdGNvbnN0IHNUYXJnZXRUZXh0UGF0aCA9IChtUHJvcGVydHlJbmZvLnByb3BlcnR5LmFubm90YXRpb25zPy5Db21tb24/LlRleHQgYXMgYW55KT8ucGF0aCxcblx0XHRcdFx0XHRzVGV4dFBhdGhGcm9tSW5pdGlhbEVudGl0eSA9IG1Qcm9wZXJ0eUluZm8ubmF2aWdhdGlvblBhdGggKyBzVGFyZ2V0VGV4dFBhdGg7XG5cdFx0XHRcdC8qKlxuXHRcdFx0XHQgKiBUaGUgcHJvcGVydHkgVGV4dCBtdXN0IGJlIGFkZGVkIG9ubHkgaWYgdGhlIHByb3BlcnR5IGlzXG5cdFx0XHRcdCAqIC0gbm90IHBhcnQgb2YgYSBzdGFyIHByb3BlcnR5ICguaS5lICcqJyBvciAnbmF2aWdhdGlvbi8qJykgb3IgYSB0YXJnZXRlZCBFbnRpdHlcblx0XHRcdFx0ICogLSBub3QgaW5jbHVkZSBpbnRvIHRoZSBpbml0aWFsIHRhcmdldGVkIHByb3BlcnRpZXMgb2YgU2lkZUVmZmVjdHNcblx0XHRcdFx0ICogIEluZGVlZCBpbiB0aGUgdHdvIGxpc3RlZCBjYXNlcywgdGhlIHByb3BlcnR5IGNvbnRhaW5pbmcgdGV4dCB3aWxsIGJlL2lzIHJlcXVlc3RlZCBieSBpbml0aWFsIFNpZGVFZmZlY3RzIGNvbmZpZ3VyYXRpb24uXG5cdFx0XHRcdCAqL1xuXG5cdFx0XHRcdGlmIChcblx0XHRcdFx0XHRzVGFyZ2V0VGV4dFBhdGggJiZcblx0XHRcdFx0XHRhRW50aXRpZXNSZXF1ZXN0ZWQuaW5kZXhPZihzVGV4dFBhdGhGcm9tSW5pdGlhbEVudGl0eS5zdWJzdHJpbmcoMCwgc1RleHRQYXRoRnJvbUluaXRpYWxFbnRpdHkubGFzdEluZGV4T2YoXCIvXCIpKSkgPT09XG5cdFx0XHRcdFx0XHQtMSAmJlxuXHRcdFx0XHRcdGFJbml0aWFsUHJvcGVydGllcy5pbmRleE9mKHNUZXh0UGF0aEZyb21Jbml0aWFsRW50aXR5KSA9PT0gLTFcblx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0b1NpZGVFZmZlY3QuVGFyZ2V0UHJvcGVydGllcy5wdXNoKHNUZXh0UGF0aEZyb21Jbml0aWFsRW50aXR5KTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIG9TaWRlRWZmZWN0O1xuXHR9XG5cdC8qKlxuXHQgKiBDb252ZXJ0cyBTaWRlRWZmZWN0cyB0byBleHBlY3RlZCBmb3JtYXRcblx0ICogIC0gQ29udmVydHMgU2lkZUVmZmVjdHMgdGFyZ2V0cyB0byBleHBlY3RlZCBmb3JtYXRcblx0ICogIC0gUmVtb3ZlcyBiaW5kaW5nIHBhcmFtZXRlciBmcm9tIFNpZGVFZmZlY3RzIHRhcmdldHMgcHJvcGVydGllc1xuXHQgKiAgLSBBZGRzIHRoZSB0ZXh0IHByb3BlcnRpZXNcblx0ICogIC0gUmVwbGFjZXMgVGFyZ2V0UHJvcGVydGllcyBoYXZpbmcgcmVmZXJlbmNlIHRvIFNvdXJjZSBQcm9wZXJ0aWVzIGZvciBhIFNpZGVFZmZlY3RzLlxuXHQgKlxuXHQgKiBAcHJpdmF0ZVxuXHQgKiBAdWk1LXJlc3RyaWN0ZWRcblx0ICogQHBhcmFtIHtvYmplY3R9IG9TaWRlRWZmZWN0cyBTaWRlRWZmZWN0cyBkZWZpbml0aW9uXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBzRW50aXR5VHlwZSBOYW1lIG9mIHRoZSBlbnRpdHkgdHlwZVxuXHQgKiBAcGFyYW0ge3N0cmluZ30gc0JpbmRpbmdQYXJhbWV0ZXIgTmFtZSBvZiB0aGUgYmluZGluZyBwYXJhbWV0ZXJcblx0ICogQHJldHVybnMge29iamVjdH0gU2lkZUVmZmVjdHMgZGVmaW5pdGlvblxuXHQgKi9cblx0cHJpdmF0ZSBfY29udmVydFNpZGVFZmZlY3RzKFxuXHRcdG9TaWRlRWZmZWN0czogQmFzZVNpZGVFZmZlY3RzVHlwZSB8IEJhc2VBbm5vdGF0aW9uU2lkZUVmZmVjdHNUeXBlLFxuXHRcdHNFbnRpdHlUeXBlOiBzdHJpbmcgfCB1bmRlZmluZWQsXG5cdFx0c0JpbmRpbmdQYXJhbWV0ZXI/OiBzdHJpbmdcblx0KTogT0RhdGFTaWRlRWZmZWN0c1R5cGUge1xuXHRcdGNvbnN0IG1FbnRpdHlUeXBlID0gKHRoaXMuZ2V0Q29udmVydGVkTWV0YU1vZGVsKCkgYXMgQ29udmVydGVyT3V0cHV0KS5lbnRpdHlUeXBlcy5maW5kKG9FbnRpdHlUeXBlID0+IHtcblx0XHRcdHJldHVybiBvRW50aXR5VHlwZS5mdWxseVF1YWxpZmllZE5hbWUgPT09IHNFbnRpdHlUeXBlO1xuXHRcdH0pO1xuXHRcdGNvbnN0IG9UZW1wU2lkZUVmZmVjdHMgPSB0aGlzLl9yZW1vdmVCaW5kaW5nUGFyYW1ldGVyKHRoaXMuX2NvbnZlcnRUYXJnZXRzRm9ybWF0KG9TaWRlRWZmZWN0cyksIHNCaW5kaW5nUGFyYW1ldGVyKTtcblx0XHRyZXR1cm4gbUVudGl0eVR5cGVcblx0XHRcdD8gdGhpcy5fcmVwbGFjZVJlZmVyZW5jZWRQcm9wZXJ0aWVzKHRoaXMuX2FkZFJlcXVpcmVkVGV4dFByb3BlcnRpZXMob1RlbXBTaWRlRWZmZWN0cywgbUVudGl0eVR5cGUpLCBtRW50aXR5VHlwZSlcblx0XHRcdDogb1RlbXBTaWRlRWZmZWN0cztcblx0fVxuXG5cdC8qKlxuXHQgKiBDb252ZXJ0cyBTaWRlRWZmZWN0cyB0YXJnZXRzIChUYXJnZXRFbnRpdGllcyBhbmQgVGFyZ2V0UHJvcGVydGllcykgdG8gZXhwZWN0ZWQgZm9ybWF0XG5cdCAqICAtIFRhcmdldFByb3BlcnRpZXMgYXMgYXJyYXkgb2Ygc3RyaW5nXG5cdCAqICAtIFRhcmdldEVudGl0aWVzIGFzIGFycmF5IG9mIG9iamVjdCB3aXRoIHByb3BlcnR5ICROYXZpZ2F0aW9uUHJvcGVydHlQYXRoLlxuXHQgKlxuXHQgKiBAcHJpdmF0ZVxuXHQgKiBAdWk1LXJlc3RyaWN0ZWRcblx0ICogQHBhcmFtIHtvYmplY3R9IG9TaWRlRWZmZWN0cyBTaWRlRWZmZWN0cyBkZWZpbml0aW9uXG5cdCAqIEByZXR1cm5zIHtvYmplY3R9IENvbnZlcnRlZCBTaWRlRWZmZWN0c1xuXHQgKi9cblx0cHJpdmF0ZSBfY29udmVydFRhcmdldHNGb3JtYXQob1NpZGVFZmZlY3RzOiBCYXNlU2lkZUVmZmVjdHNUeXBlIHwgQmFzZUFubm90YXRpb25TaWRlRWZmZWN0c1R5cGUpOiBCYXNlU2lkZUVmZmVjdHNUeXBlIHtcblx0XHRjb25zdCBUYXJnZXRQcm9wZXJ0aWVzOiBzdHJpbmdbXSA9ICgob1NpZGVFZmZlY3RzLlRhcmdldFByb3BlcnRpZXMgYXMgYW55W10pIHx8IFtdKS5yZWR1Y2UoZnVuY3Rpb24oYVRhcmdldFByb3BlcnRpZXMsIHZUYXJnZXQpIHtcblx0XHRcdFx0Y29uc3Qgc1RhcmdldCA9ICh0eXBlb2YgdlRhcmdldCA9PT0gXCJzdHJpbmdcIiAmJiB2VGFyZ2V0KSB8fCAodlRhcmdldC50eXBlID09PSBcIlByb3BlcnR5UGF0aFwiICYmIHZUYXJnZXQudmFsdWUpO1xuXHRcdFx0XHRpZiAoc1RhcmdldCkge1xuXHRcdFx0XHRcdGFUYXJnZXRQcm9wZXJ0aWVzLnB1c2goc1RhcmdldCk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0TG9nLmVycm9yKFwiU2lkZUVmZmVjdHMgLSBFcnJvciB3aGlsZSBwcm9jZXNzaW5nIFRhcmdldFByb3BlcnRpZXMgZm9yIFNpZGVFZmZlY3RzXCIgKyBvU2lkZUVmZmVjdHMuZnVsbHlRdWFsaWZpZWROYW1lKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gYVRhcmdldFByb3BlcnRpZXM7XG5cdFx0XHR9LCBbXSksXG5cdFx0XHRUYXJnZXRFbnRpdGllczogU2lkZUVmZmVjdHNUYXJnZXRFbnRpdHlUeXBlW10gPSAoKG9TaWRlRWZmZWN0cy5UYXJnZXRFbnRpdGllcyBhcyBhbnlbXSkgfHwgW10pLm1hcChtVGFyZ2V0RW50aXR5ID0+IHtcblx0XHRcdFx0LyoqXG5cdFx0XHRcdCAqICBTaWRlRWZmZWN0cyB0aGF0IGNvbWVzIGZyb20gU0FQIEZFIGdldCBUYXJnZXRFbnRpdGllcyB3aXRoICROYXZpZ2F0aW9uUHJvcGVydHlQYXRoIHdoZXJlYXNcblx0XHRcdFx0ICogIG9uZXMgY29taW5nIGZyb20gdGhlIGNvbnZlcnRlZCBPRGF0YSBtb2RlbCBnZXRzIGEgTmF2aWdhdGlvblByb3BlcnR5UGF0aCBmb3JtYXRcblx0XHRcdFx0ICpcblx0XHRcdFx0ICovXG5cdFx0XHRcdHJldHVybiB7IFwiJE5hdmlnYXRpb25Qcm9wZXJ0eVBhdGhcIjogbVRhcmdldEVudGl0eS4kTmF2aWdhdGlvblByb3BlcnR5UGF0aCB8fCBtVGFyZ2V0RW50aXR5LnZhbHVlIHx8IFwiXCIgfTtcblx0XHRcdH0pO1xuXHRcdHJldHVybiB7IC4uLm9TaWRlRWZmZWN0cywgLi4ueyBUYXJnZXRQcm9wZXJ0aWVzLCBUYXJnZXRFbnRpdGllcyB9IH07XG5cdH1cblxuXHQvKipcblx0ICogR2V0cyBTaWRlRWZmZWN0cyByZWxhdGVkIHRvIGFuIGVudGl0eSB0eXBlIG9yIGFjdGlvbiB0aGF0IGNvbWUgZnJvbSBhbiBPRGF0YSBTZXJ2aWNlXG5cdCAqIEludGVybmFsIHJvdXRpbmUgdG8gZ2V0LCBmcm9tIGNvbnZlcnRlZCBvRGF0YSBtZXRhTW9kZWwsIFNpZGVFZmZlY3RzIHJlbGF0ZWQgdG8gYSBzcGVjaWZpYyBlbnRpdHkgdHlwZSBvciBhY3Rpb25cblx0ICogYW5kIHRvIGNvbnZlcnQgdGhlc2UgU2lkZUVmZmVjdHMgd2l0aCBleHBlY3RlZCBmb3JtYXQuXG5cdCAqXG5cdCAqIEBwcml2YXRlXG5cdCAqIEB1aTUtcmVzdHJpY3RlZFxuXHQgKiBAcGFyYW0ge29iamVjdH0gb1NvdXJjZSBFbnRpdHkgdHlwZSBvciBhY3Rpb25cblx0ICogQHJldHVybnMge29iamVjdH0gQXJyYXkgb2YgU2lkZUVmZmVjdHNcblx0ICovXG5cdHByaXZhdGUgX2dldFNpZGVFZmZlY3RzRnJvbVNvdXJjZShvU291cmNlOiBhbnkpOiBPRGF0YVNpZGVFZmZlY3RzVHlwZVtdIHtcblx0XHRjb25zdCBhU2lkZUVmZmVjdHM6IE9EYXRhU2lkZUVmZmVjdHNUeXBlW10gPSBbXTtcblx0XHRjb25zdCBhdXRob3JpemVkVHlwZXMgPSBbXCJFbnRpdHlUeXBlXCIsIFwiQWN0aW9uXCJdO1xuXHRcdGlmIChvU291cmNlLl90eXBlICYmIGF1dGhvcml6ZWRUeXBlcy5pbmRleE9mKG9Tb3VyY2UuX3R5cGUpID4gLTEpIHtcblx0XHRcdGNvbnN0IG1FbnRpdHlUeXBlOiBFbnRpdHlUeXBlIHwgdW5kZWZpbmVkID0gb1NvdXJjZS5fdHlwZSA9PT0gXCJFbnRpdHlUeXBlXCIgPyBvU291cmNlIDogb1NvdXJjZS5zb3VyY2VFbnRpdHlUeXBlO1xuXHRcdFx0aWYgKG1FbnRpdHlUeXBlKSB7XG5cdFx0XHRcdGNvbnN0IG1Db21tb25Bbm5vdGF0aW9uOiBhbnkgPSBvU291cmNlLmFubm90YXRpb25zPy5Db21tb24gfHwge307XG5cdFx0XHRcdGNvbnN0IG1CaW5kaW5nUGFyYW1ldGVyID0gKChvU291cmNlIGFzIEFjdGlvbikucGFyYW1ldGVycyB8fCBbXSkuZmluZChcblx0XHRcdFx0XHRtUGFyYW1ldGVyID0+IG1QYXJhbWV0ZXIudHlwZSA9PT0gKG1FbnRpdHlUeXBlIHx8IG9Tb3VyY2UpLmZ1bGx5UXVhbGlmaWVkTmFtZVxuXHRcdFx0XHQpO1xuXHRcdFx0XHRjb25zdCBzQmluZGluZ1BhcmFtZXRlciA9IG1CaW5kaW5nUGFyYW1ldGVyID8gbUJpbmRpbmdQYXJhbWV0ZXIuZnVsbHlRdWFsaWZpZWROYW1lLnNwbGl0KFwiL1wiKVsxXSA6IFwiXCI7XG5cdFx0XHRcdE9iamVjdC5rZXlzKG1Db21tb25Bbm5vdGF0aW9uKVxuXHRcdFx0XHRcdC5maWx0ZXIoc0Fubm90YXRpb25OYW1lID0+IG1Db21tb25Bbm5vdGF0aW9uW3NBbm5vdGF0aW9uTmFtZV0uJFR5cGUgPT09IENvbW1vbkFubm90YXRpb25UeXBlcy5TaWRlRWZmZWN0c1R5cGUpXG5cdFx0XHRcdFx0LmZvckVhY2goc0Fubm90YXRpb25OYW1lID0+IHtcblx0XHRcdFx0XHRcdGFTaWRlRWZmZWN0cy5wdXNoKFxuXHRcdFx0XHRcdFx0XHR0aGlzLl9jb252ZXJ0U2lkZUVmZmVjdHMobUNvbW1vbkFubm90YXRpb25bc0Fubm90YXRpb25OYW1lXSwgbUVudGl0eVR5cGUuZnVsbHlRdWFsaWZpZWROYW1lLCBzQmluZGluZ1BhcmFtZXRlcilcblx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBhU2lkZUVmZmVjdHM7XG5cdH1cblxuXHQvKipcblx0ICogTG9ncyBTaWRlRWZmZWN0cyByZXF1ZXN0LlxuXHQgKlxuXHQgKiBAcHJpdmF0ZVxuXHQgKiBAdWk1LXJlc3RyaWN0ZWRcblx0ICogQHBhcmFtIHtBcnJheX0gYVBhdGhFeHByZXNzaW9ucyBTaWRlRWZmZWN0cyB0YXJnZXRzXG5cdCAqIEBwYXJhbSB7b2JqZWN0fSBvQ29udGV4dCBDb250ZXh0XG5cdCAqL1xuXHRwcml2YXRlIF9sb2dSZXF1ZXN0KGFQYXRoRXhwcmVzc2lvbnM6IFNpZGVFZmZlY3RzVGFyZ2V0W10sIG9Db250ZXh0OiBDb250ZXh0KSB7XG5cdFx0Y29uc3Qgc1RhcmdldFBhdGhzID0gYVBhdGhFeHByZXNzaW9ucy5yZWR1Y2UoZnVuY3Rpb24oc1BhdGhzLCBtVGFyZ2V0KSB7XG5cdFx0XHRyZXR1cm4gc1BhdGhzICsgXCJcXG5cXHRcXHRcIiArICgobVRhcmdldCBhcyBTaWRlRWZmZWN0c1RhcmdldEVudGl0eVR5cGUpLiROYXZpZ2F0aW9uUHJvcGVydHlQYXRoIHx8IG1UYXJnZXQgfHwgXCJcIik7XG5cdFx0fSwgXCJcIik7XG5cdFx0TG9nLmRlYnVnKFwiU2lkZUVmZmVjdHMgLSBSZXF1ZXN0OlxcblxcdENvbnRleHQgcGF0aCA6IFwiICsgb0NvbnRleHQuZ2V0UGF0aCgpICsgXCJcXG5cXHRQcm9wZXJ0eSBwYXRocyA6XCIgKyBzVGFyZ2V0UGF0aHMpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJlbW92ZXMgbmFtZSBvZiBiaW5kaW5nIHBhcmFtZXRlciBvbiBTaWRlRWZmZWN0cyB0YXJnZXRzLlxuXHQgKlxuXHQgKiBAcHJpdmF0ZVxuXHQgKiBAdWk1LXJlc3RyaWN0ZWRcblx0ICogQHBhcmFtIHtvYmplY3R9IG9TaWRlRWZmZWN0cyBTaWRlRWZmZWN0cyBkZWZpbml0aW9uXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBzQmluZGluZ1BhcmFtZXRlck5hbWUgTmFtZSBvZiBiaW5kaW5nIHBhcmFtZXRlclxuXHQgKiBAcmV0dXJucyB7b2JqZWN0fSBTaWRlRWZmZWN0cyBkZWZpbml0aW9uXG5cdCAqL1xuXHRwcml2YXRlIF9yZW1vdmVCaW5kaW5nUGFyYW1ldGVyKG9TaWRlRWZmZWN0czogQmFzZVNpZGVFZmZlY3RzVHlwZSwgc0JpbmRpbmdQYXJhbWV0ZXJOYW1lPzogc3RyaW5nKTogQmFzZVNpZGVFZmZlY3RzVHlwZSB7XG5cdFx0aWYgKHNCaW5kaW5nUGFyYW1ldGVyTmFtZSkge1xuXHRcdFx0Y29uc3QgYVRhcmdldHMgPSBbXCJUYXJnZXRQcm9wZXJ0aWVzXCIsIFwiVGFyZ2V0RW50aXRpZXNcIl07XG5cdFx0XHRhVGFyZ2V0cy5mb3JFYWNoKHNUYXJnZXQgPT4ge1xuXHRcdFx0XHRsZXQgbVRhcmdldCA9IChvU2lkZUVmZmVjdHMgYXMgYW55KVtzVGFyZ2V0XTtcblx0XHRcdFx0aWYgKG1UYXJnZXQpIHtcblx0XHRcdFx0XHRtVGFyZ2V0ID0gbVRhcmdldC5tYXAoKG1Qcm9wZXJ0eTogYW55KSA9PiB7XG5cdFx0XHRcdFx0XHRjb25zdCBiTmF2aWdhdGlvblByb3BlcnR5UGF0aCA9IG1Qcm9wZXJ0eS4kTmF2aWdhdGlvblByb3BlcnR5UGF0aCAhPT0gdW5kZWZpbmVkOyAvLyBOZWVkIHRvIHRlc3Qgd2l0aCB1bmRlZmluZWQgc2luY2UgIG1Qcm9wZXJ0eS4kTmF2aWdhdGlvblByb3BlcnR5UGF0aCBjb3VsZCBiZSBcIlwiIChlbXB0eSBzdHJpbmcpXG5cdFx0XHRcdFx0XHRjb25zdCBzVmFsdWUgPSAoYk5hdmlnYXRpb25Qcm9wZXJ0eVBhdGggPyBtUHJvcGVydHkuJE5hdmlnYXRpb25Qcm9wZXJ0eVBhdGggOiBtUHJvcGVydHkpLnJlcGxhY2UoXG5cdFx0XHRcdFx0XHRcdG5ldyBSZWdFeHAoXCJeXCIgKyBzQmluZGluZ1BhcmFtZXRlck5hbWUgKyBcIj8uXCIpLFxuXHRcdFx0XHRcdFx0XHRcIlwiXG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0cmV0dXJuIGJOYXZpZ2F0aW9uUHJvcGVydHlQYXRoID8geyAkTmF2aWdhdGlvblByb3BlcnR5UGF0aDogc1ZhbHVlIH0gOiBzVmFsdWU7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0KG9TaWRlRWZmZWN0cyBhcyBhbnkpW3NUYXJnZXRdID0gbVRhcmdldDtcblx0XHRcdH0pO1xuXHRcdH1cblx0XHRyZXR1cm4gb1NpZGVFZmZlY3RzO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJlbW92ZSBkdXBsaWNhdGVzIGluIFNpZGVFZmZlY3RzIHRhcmdldHMuXG5cdCAqXG5cdCAqIEBwcml2YXRlXG5cdCAqIEB1aTUtcmVzdHJpY3RlZFxuXHQgKiBAcGFyYW0ge0FycmF5fSBhVGFyZ2V0cyBTaWRlRWZmZWN0cyB0YXJnZXRzXG5cdCAqIEByZXR1cm5zIHtBcnJheX0gU2lkZUVmZmVjdHMgdGFyZ2V0cyB3aXRob3V0IGR1cGxpY2F0ZXNcblx0ICovXG5cdHByaXZhdGUgX3JlbW92ZUR1cGxpY2F0ZVRhcmdldHMoYVRhcmdldHM6IFNpZGVFZmZlY3RzVGFyZ2V0W10pOiBTaWRlRWZmZWN0c1RhcmdldFtdIHtcblx0XHRyZXR1cm4gYVRhcmdldHMuZmlsdGVyKFxuXHRcdFx0KG1UYXJnZXQ6IGFueSwgaUluZGV4LCBhVGFyZ2V0cykgPT5cblx0XHRcdFx0YVRhcmdldHMuZmluZEluZGV4KChtU2VhcmNoVGFyZ2V0OiBhbnkpID0+IHtcblx0XHRcdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHRcdFx0bVNlYXJjaFRhcmdldCA9PT0gbVRhcmdldCB8fCAvLyBQcm9wZXJ0eVBhdGhcblx0XHRcdFx0XHRcdChtVGFyZ2V0LiROYXZpZ2F0aW9uUHJvcGVydHlQYXRoICYmIG1TZWFyY2hUYXJnZXQuJE5hdmlnYXRpb25Qcm9wZXJ0eVBhdGggPT09IG1UYXJnZXQuJE5hdmlnYXRpb25Qcm9wZXJ0eVBhdGgpIC8vIE5hdmlnYXRpb25Qcm9wZXJ0eVBhdGhcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHR9KSA9PT0gaUluZGV4XG5cdFx0KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXBsYWNlcyBUYXJnZXRQcm9wZXJ0aWVzIGhhdmluZyByZWZlcmVuY2UgdG8gU291cmNlIFByb3BlcnRpZXMgZm9yIGEgU2lkZUVmZmVjdHNcblx0ICogSWYgYSBTaWRlRWZmZWN0cyBTb3VyY2UgUHJvcGVydHkgaXMgYW4gbmF2aWdhdGlvbiBlbnRpdHkgcmVmZXJlbmNlLCB0aGUgU2lkZUVmZmVjdHMgVGFyZ2V0IFByb3BlcnRpZXMgY2Fubm90IGJlIGEgcHJvcGVydHkgb2YgdGhpcyBuYXZpZ2F0aW9uIGVudGl0eS5cblx0ICogSW5kZWVkIHRoaXMgY29uZmlndXJhdGlvbiBsZWFkcyB0byBlcnJvciBpbnRvIHRoZSBPRGF0YSBWNCBNb2RlbCBzaW5jZSByZXNwb25zZSBjYW5ub3QgYmUgcHJvY2Vzc2VkIGJlY2F1c2UgdGhpcyB3b3VsZCBtZWFuIHRoYXQgd2UgbWVyZ2UgcHJvcGVydGllcyBvZiB0aGUgbmV3IHRhcmdldCBpbnRvIHRoZSBvbGQgdGFyZ2V0IG9mIHRoZSBuYXZpZ2F0aW9uIHByb3BlcnR5LlxuXHQgKiBJbiBvcmRlciB0byByZXF1ZXN0IG5ldyB2YWx1ZSBvZiB0aGVzZSB0YXJnZXQgcHJvcGVydGllcyB0aGUgU2lkZUVmZmVjdHMgd2lsbCByZXF1ZXN0IGZvciB0aGUgZW50aXJlIEVudGl0eSBpbnN0ZWFkIG9mIGp1c3QgYSBzZXQgb2YgcHJvcGVydGllcy5cblx0ICogRm9yIHRoZSBmaXJzdCB2ZXJzaW9uLCB3ZSByZW1vdmUgYWxsIG5hdmlnYXRpb24gcHJvcGVydGllcyBhbmQgcmVwbGFjZSB0aGVtIGJ5IHRhcmdldEVudGl0aWVzLiBUaGlzIGNoYW5nZSBjb3VsZCBiZSBpbXByb3ZlZCBpbiBuZXh0IHZlcnNpb24uXG5cdCAqXG5cdCAqIEBwcml2YXRlXG5cdCAqIEB1aTUtcmVzdHJpY3RlZFxuXHQgKiBAcGFyYW0ge29iamVjdH0gb1NpZGVFZmZlY3QgU2lkZUVmZmVjdHMgZGVmaW5pdGlvblxuXHQgKiBAcGFyYW0ge29iamVjdH0gbUVudGl0eVR5cGUgIEVudGl0eSB0eXBlXG5cdCAqIEByZXR1cm5zIHtvYmplY3R9IFNpZGVFZmZlY3RzIGRlZmluaXRpb24gd2l0aG91dCByZWZlcmVuY2VkIHRhcmdldCBwcm9wZXJ0aWVzXG5cdCAqL1xuXHRwcml2YXRlIF9yZXBsYWNlUmVmZXJlbmNlZFByb3BlcnRpZXMob1NpZGVFZmZlY3Q6IEJhc2VTaWRlRWZmZWN0c1R5cGUsIG1FbnRpdHlUeXBlOiBFbnRpdHlUeXBlKTogQmFzZVNpZGVFZmZlY3RzVHlwZSB7XG5cdFx0bGV0IGJTaWRlRWZmZWN0c0NoYW5nZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblx0XHRjb25zdCBhRW50aXRpZXM6IHN0cmluZ1tdID1cblx0XHRcdFx0KG9TaWRlRWZmZWN0LlRhcmdldEVudGl0aWVzIHx8IFtdKS5tYXAobU5hdmlnYXRpb24gPT4ge1xuXHRcdFx0XHRcdHJldHVybiBtTmF2aWdhdGlvbi4kTmF2aWdhdGlvblByb3BlcnR5UGF0aDtcblx0XHRcdFx0fSkgfHwgW10sXG5cdFx0XHRhUHJvcGVydGllczogc3RyaW5nW10gPSBbXTtcblxuXHRcdG9TaWRlRWZmZWN0LlRhcmdldFByb3BlcnRpZXMuZm9yRWFjaChzUHJvcGVydHlQYXRoID0+IHtcblx0XHRcdGxldCBiVGFyZ2V0Q2hhbmdlZCA9IGZhbHNlO1xuXHRcdFx0Y29uc3QgaUxhc3RQYXRoU2VwYXJhdG9ySW5kZXggPSBzUHJvcGVydHlQYXRoLmxhc3RJbmRleE9mKFwiL1wiKTtcblx0XHRcdGlmIChpTGFzdFBhdGhTZXBhcmF0b3JJbmRleCAhPT0gLTEpIHtcblx0XHRcdFx0Y29uc3Qgc05hdmlnYXRpb25QYXRoID0gc1Byb3BlcnR5UGF0aC5zdWJzdHJpbmcoMCwgaUxhc3RQYXRoU2VwYXJhdG9ySW5kZXgpO1xuXHRcdFx0XHRjb25zdCBvVGFyZ2V0ID0gbUVudGl0eVR5cGUucmVzb2x2ZVBhdGgoc05hdmlnYXRpb25QYXRoKTtcblx0XHRcdFx0aWYgKG9UYXJnZXQgJiYgb1RhcmdldC5fdHlwZSA9PT0gXCJOYXZpZ2F0aW9uUHJvcGVydHlcIikge1xuXHRcdFx0XHRcdC8vVGVzdCBpZiBpdCdzIG5vdCBhIHByb3BlcnR5IGJvdW5kIG9uIGNvbXBsZXhUeXBlIChfQ29tcGxleFR5cGUvTXlQcm9wZXJ0eSlcblx0XHRcdFx0XHRiU2lkZUVmZmVjdHNDaGFuZ2VkID0gdHJ1ZTtcblx0XHRcdFx0XHRiVGFyZ2V0Q2hhbmdlZCA9IHRydWU7XG5cdFx0XHRcdFx0aWYgKCFhRW50aXRpZXMuaW5jbHVkZXMoc05hdmlnYXRpb25QYXRoKSkge1xuXHRcdFx0XHRcdFx0YUVudGl0aWVzLnB1c2goc05hdmlnYXRpb25QYXRoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGlmICghYlRhcmdldENoYW5nZWQpIHtcblx0XHRcdFx0YVByb3BlcnRpZXMucHVzaChzUHJvcGVydHlQYXRoKTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdGlmIChiU2lkZUVmZmVjdHNDaGFuZ2VkKSB7XG5cdFx0XHRvU2lkZUVmZmVjdC5UYXJnZXRQcm9wZXJ0aWVzID0gYVByb3BlcnRpZXM7XG5cdFx0XHRvU2lkZUVmZmVjdC5UYXJnZXRFbnRpdGllcyA9IGFFbnRpdGllcy5tYXAoc05hdmlnYXRpb25QYXRoID0+IHtcblx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHQkTmF2aWdhdGlvblByb3BlcnR5UGF0aDogc05hdmlnYXRpb25QYXRoXG5cdFx0XHRcdH07XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRyZXR1cm4gb1NpZGVFZmZlY3Q7XG5cdH1cblxuXHQvKipcblx0ICogR2V0cyBTaWRlRWZmZWN0cyBhY3Rpb24gdHlwZSB0aGF0IGNvbWUgZnJvbSBhbiBPRGF0YSBTZXJ2aWNlXG5cdCAqIEludGVybmFsIHJvdXRpbmUgdG8gZ2V0LCBmcm9tIGNvbnZlcnRlZCBvRGF0YSBtZXRhTW9kZWwsIFNpZGVFZmZlY3RzIG9uIGFjdGlvbnNcblx0ICogcmVsYXRlZCB0byBhIHNwZWNpZmljIGVudGl0eSB0eXBlIGFuZCB0byBjb252ZXJ0IHRoZXNlIFNpZGVFZmZlY3RzIHdpdGhcblx0ICogZXhwZWN0ZWQgZm9ybWF0LlxuXHQgKlxuXHQgKiBAcHJpdmF0ZVxuXHQgKiBAdWk1LXJlc3RyaWN0ZWRcblx0ICogQHBhcmFtIHtvYmplY3R9IG1FbnRpdHlUeXBlIEVudGl0eSB0eXBlXG5cdCAqIEByZXR1cm5zIHtvYmplY3R9IEVudGl0eSB0eXBlIFNpZGVFZmZlY3RzIGRpY3Rpb25hcnlcblx0ICovXG5cdHByaXZhdGUgX3JldHJpZXZlT0RhdGFBY3Rpb25zU2lkZUVmZmVjdHMobUVudGl0eVR5cGU6IEVudGl0eVR5cGUpOiBSZWNvcmQ8c3RyaW5nLCBBY3Rpb25TaWRlRWZmZWN0c1R5cGU+IHtcblx0XHRjb25zdCBvU2lkZUVmZmVjdHM6IFJlY29yZDxzdHJpbmcsIEFjdGlvblNpZGVFZmZlY3RzVHlwZT4gPSB7fTtcblx0XHRjb25zdCBhQWN0aW9ucyA9IG1FbnRpdHlUeXBlLmFjdGlvbnM7XG5cdFx0aWYgKGFBY3Rpb25zKSB7XG5cdFx0XHRPYmplY3Qua2V5cyhhQWN0aW9ucykuZm9yRWFjaChzQWN0aW9uTmFtZSA9PiB7XG5cdFx0XHRcdGNvbnN0IG9BY3Rpb24gPSBtRW50aXR5VHlwZS5hY3Rpb25zW3NBY3Rpb25OYW1lXTtcblx0XHRcdFx0Y29uc3QgdHJpZ2dlckFjdGlvbnM6IFN0cmluZ1tdID0gW107XG5cdFx0XHRcdGxldCBwYXRoRXhwcmVzc2lvbnM6IFNpZGVFZmZlY3RzVGFyZ2V0W10gPSBbXTtcblx0XHRcdFx0bGV0IGFUYXJnZXRzOiBTaWRlRWZmZWN0c1RhcmdldFtdID0gW107XG5cblx0XHRcdFx0dGhpcy5fZ2V0U2lkZUVmZmVjdHNGcm9tU291cmNlKG9BY3Rpb24pLmZvckVhY2gob1NpZGVFZmZlY3QgPT4ge1xuXHRcdFx0XHRcdGNvbnN0IHNUcmlnZ2VyQWN0aW9uID0gb1NpZGVFZmZlY3QuVHJpZ2dlckFjdGlvbjtcblx0XHRcdFx0XHRhVGFyZ2V0cyA9IGFUYXJnZXRzLmNvbmNhdChvU2lkZUVmZmVjdC5UYXJnZXRFbnRpdGllcyB8fCBbXSkuY29uY2F0KChvU2lkZUVmZmVjdC5UYXJnZXRQcm9wZXJ0aWVzIGFzIGFueVtdKSB8fCBbXSk7XG5cdFx0XHRcdFx0aWYgKHNUcmlnZ2VyQWN0aW9uICYmIHRyaWdnZXJBY3Rpb25zLmluZGV4T2Yoc1RyaWdnZXJBY3Rpb24pID09PSAtMSkge1xuXHRcdFx0XHRcdFx0dHJpZ2dlckFjdGlvbnMucHVzaChzVHJpZ2dlckFjdGlvbik7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdFx0cGF0aEV4cHJlc3Npb25zID0gdGhpcy5fcmVtb3ZlRHVwbGljYXRlVGFyZ2V0cyhhVGFyZ2V0cyk7XG5cdFx0XHRcdG9TaWRlRWZmZWN0c1tzQWN0aW9uTmFtZV0gPSB7IHBhdGhFeHByZXNzaW9ucywgdHJpZ2dlckFjdGlvbnMgfTtcblx0XHRcdH0pO1xuXHRcdH1cblx0XHRyZXR1cm4gb1NpZGVFZmZlY3RzO1xuXHR9XG5cblx0LyoqXG5cdCAqIEdldHMgU2lkZUVmZmVjdHMgZW50aXR5IHR5cGUgdGhhdCBjb21lIGZyb20gYW4gT0RhdGEgU2VydmljZVxuXHQgKiBJbnRlcm5hbCByb3V0aW5lIHRvIGdldCwgZnJvbSBjb252ZXJ0ZWQgb0RhdGEgbWV0YU1vZGVsLCBTaWRlRWZmZWN0c1xuXHQgKiByZWxhdGVkIHRvIGEgc3BlY2lmaWMgZW50aXR5IHR5cGUgYW5kIHRvIGNvbnZlcnQgdGhlc2UgU2lkZUVmZmVjdHMgd2l0aFxuXHQgKiBleHBlY3RlZCBmb3JtYXQuXG5cdCAqXG5cdCAqIEBwcml2YXRlXG5cdCAqIEB1aTUtcmVzdHJpY3RlZFxuXHQgKiBAcGFyYW0ge29iamVjdH0gbUVudGl0eVR5cGUgRW50aXR5IHR5cGVcblx0ICogQHJldHVybnMge29iamVjdH0gRW50aXR5IHR5cGUgU2lkZUVmZmVjdHMgZGljdGlvbmFyeVxuXHQgKi9cblx0cHJpdmF0ZSBfcmV0cmlldmVPRGF0YUVudGl0eVNpZGVFZmZlY3RzKG1FbnRpdHlUeXBlOiBFbnRpdHlUeXBlKTogUmVjb3JkPHN0cmluZywgT0RhdGFTaWRlRWZmZWN0c1R5cGU+IHtcblx0XHRjb25zdCBvRW50aXR5U2lkZUVmZmVjdHM6IFJlY29yZDxzdHJpbmcsIE9EYXRhU2lkZUVmZmVjdHNUeXBlPiA9IHt9O1xuXHRcdHRoaXMuX2dldFNpZGVFZmZlY3RzRnJvbVNvdXJjZShtRW50aXR5VHlwZSkuZm9yRWFjaChvU2lkZUVmZmVjdHMgPT4ge1xuXHRcdFx0b0VudGl0eVNpZGVFZmZlY3RzW29TaWRlRWZmZWN0cy5mdWxseVF1YWxpZmllZE5hbWVdID0gb1NpZGVFZmZlY3RzO1xuXHRcdH0pO1xuXHRcdHJldHVybiBvRW50aXR5U2lkZUVmZmVjdHM7XG5cdH1cblxuXHRnZXRJbnRlcmZhY2UoKTogYW55IHtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxufVxuXG5jbGFzcyBTaWRlRWZmZWN0c1NlcnZpY2VGYWN0b3J5IGV4dGVuZHMgU2VydmljZUZhY3Rvcnk8U2lkZUVmZmVjdHNTZXR0aW5ncz4ge1xuXHRjcmVhdGVJbnN0YW5jZShvU2VydmljZUNvbnRleHQ6IFNlcnZpY2VDb250ZXh0PFNpZGVFZmZlY3RzU2V0dGluZ3M+KSB7XG5cdFx0Y29uc3QgU2lkZUVmZmVjdHNTZXJ2aWNlU2VydmljZSA9IG5ldyBTaWRlRWZmZWN0c1NlcnZpY2Uob1NlcnZpY2VDb250ZXh0KTtcblx0XHRyZXR1cm4gU2lkZUVmZmVjdHNTZXJ2aWNlU2VydmljZS5pbml0UHJvbWlzZTtcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBTaWRlRWZmZWN0c1NlcnZpY2VGYWN0b3J5O1xuIl19