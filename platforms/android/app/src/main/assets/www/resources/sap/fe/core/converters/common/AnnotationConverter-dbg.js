/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2021 SAP SE. All rights reserved
 */
sap.ui.define([], function () {
  "use strict";

  var _exports = {};

  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

  function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

  function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableRest(); }

  function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

  function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  var Path = function Path(pathExpression, targetName, annotationsTerm, annotationType, term) {
    _classCallCheck(this, Path);

    this.path = pathExpression.Path;
    this.type = "Path";
    this.$target = targetName;
    this.term = term, this.annotationType = annotationType, this.annotationsTerm = annotationsTerm;
  };

  var TermToTypes;

  (function (TermToTypes) {
    TermToTypes["Org.OData.Authorization.V1.SecuritySchemes"] = "Org.OData.Authorization.V1.SecurityScheme";
    TermToTypes["Org.OData.Authorization.V1.Authorizations"] = "Org.OData.Authorization.V1.Authorization";
    TermToTypes["Org.OData.Core.V1.Revisions"] = "Org.OData.Core.V1.RevisionType";
    TermToTypes["Org.OData.Core.V1.Links"] = "Org.OData.Core.V1.Link";
    TermToTypes["Org.OData.Core.V1.Example"] = "Org.OData.Core.V1.ExampleValue";
    TermToTypes["Org.OData.Core.V1.Messages"] = "Org.OData.Core.V1.MessageType";
    TermToTypes["Org.OData.Core.V1.ValueException"] = "Org.OData.Core.V1.ValueExceptionType";
    TermToTypes["Org.OData.Core.V1.ResourceException"] = "Org.OData.Core.V1.ResourceExceptionType";
    TermToTypes["Org.OData.Core.V1.DataModificationException"] = "Org.OData.Core.V1.DataModificationExceptionType";
    TermToTypes["Org.OData.Core.V1.IsLanguageDependent"] = "Org.OData.Core.V1.Tag";
    TermToTypes["Org.OData.Core.V1.DereferenceableIDs"] = "Org.OData.Core.V1.Tag";
    TermToTypes["Org.OData.Core.V1.ConventionalIDs"] = "Org.OData.Core.V1.Tag";
    TermToTypes["Org.OData.Core.V1.Permissions"] = "Org.OData.Core.V1.Permission";
    TermToTypes["Org.OData.Core.V1.DefaultNamespace"] = "Org.OData.Core.V1.Tag";
    TermToTypes["Org.OData.Core.V1.Immutable"] = "Org.OData.Core.V1.Tag";
    TermToTypes["Org.OData.Core.V1.Computed"] = "Org.OData.Core.V1.Tag";
    TermToTypes["Org.OData.Core.V1.ComputedDefaultValue"] = "Org.OData.Core.V1.Tag";
    TermToTypes["Org.OData.Core.V1.IsURL"] = "Org.OData.Core.V1.Tag";
    TermToTypes["Org.OData.Core.V1.IsMediaType"] = "Org.OData.Core.V1.Tag";
    TermToTypes["Org.OData.Core.V1.ContentDisposition"] = "Org.OData.Core.V1.ContentDispositionType";
    TermToTypes["Org.OData.Core.V1.OptimisticConcurrency"] = "Edm.PropertyPath";
    TermToTypes["Org.OData.Core.V1.AdditionalProperties"] = "Org.OData.Core.V1.Tag";
    TermToTypes["Org.OData.Core.V1.AutoExpand"] = "Org.OData.Core.V1.Tag";
    TermToTypes["Org.OData.Core.V1.AutoExpandReferences"] = "Org.OData.Core.V1.Tag";
    TermToTypes["Org.OData.Core.V1.MayImplement"] = "Org.OData.Core.V1.QualifiedTypeName";
    TermToTypes["Org.OData.Core.V1.Ordered"] = "Org.OData.Core.V1.Tag";
    TermToTypes["Org.OData.Core.V1.PositionalInsert"] = "Org.OData.Core.V1.Tag";
    TermToTypes["Org.OData.Core.V1.AlternateKeys"] = "Org.OData.Core.V1.AlternateKey";
    TermToTypes["Org.OData.Core.V1.OptionalParameter"] = "Org.OData.Core.V1.OptionalParameterType";
    TermToTypes["Org.OData.Core.V1.OperationAvailable"] = "Edm.Boolean";
    TermToTypes["Org.OData.Core.V1.SymbolicName"] = "Org.OData.Core.V1.SimpleIdentifier";
    TermToTypes["Org.OData.Capabilities.V1.ConformanceLevel"] = "Org.OData.Capabilities.V1.ConformanceLevelType";
    TermToTypes["Org.OData.Capabilities.V1.AsynchronousRequestsSupported"] = "Org.OData.Core.V1.Tag";
    TermToTypes["Org.OData.Capabilities.V1.BatchContinueOnErrorSupported"] = "Org.OData.Core.V1.Tag";
    TermToTypes["Org.OData.Capabilities.V1.IsolationSupported"] = "Org.OData.Capabilities.V1.IsolationLevel";
    TermToTypes["Org.OData.Capabilities.V1.CrossJoinSupported"] = "Org.OData.Core.V1.Tag";
    TermToTypes["Org.OData.Capabilities.V1.CallbackSupported"] = "Org.OData.Capabilities.V1.CallbackType";
    TermToTypes["Org.OData.Capabilities.V1.ChangeTracking"] = "Org.OData.Capabilities.V1.ChangeTrackingType";
    TermToTypes["Org.OData.Capabilities.V1.CountRestrictions"] = "Org.OData.Capabilities.V1.CountRestrictionsType";
    TermToTypes["Org.OData.Capabilities.V1.NavigationRestrictions"] = "Org.OData.Capabilities.V1.NavigationRestrictionsType";
    TermToTypes["Org.OData.Capabilities.V1.IndexableByKey"] = "Org.OData.Core.V1.Tag";
    TermToTypes["Org.OData.Capabilities.V1.TopSupported"] = "Org.OData.Core.V1.Tag";
    TermToTypes["Org.OData.Capabilities.V1.SkipSupported"] = "Org.OData.Core.V1.Tag";
    TermToTypes["Org.OData.Capabilities.V1.ComputeSupported"] = "Org.OData.Core.V1.Tag";
    TermToTypes["Org.OData.Capabilities.V1.SelectSupport"] = "Org.OData.Capabilities.V1.SelectSupportType";
    TermToTypes["Org.OData.Capabilities.V1.BatchSupported"] = "Org.OData.Core.V1.Tag";
    TermToTypes["Org.OData.Capabilities.V1.BatchSupport"] = "Org.OData.Capabilities.V1.BatchSupportType";
    TermToTypes["Org.OData.Capabilities.V1.FilterRestrictions"] = "Org.OData.Capabilities.V1.FilterRestrictionsType";
    TermToTypes["Org.OData.Capabilities.V1.SortRestrictions"] = "Org.OData.Capabilities.V1.SortRestrictionsType";
    TermToTypes["Org.OData.Capabilities.V1.ExpandRestrictions"] = "Org.OData.Capabilities.V1.ExpandRestrictionsType";
    TermToTypes["Org.OData.Capabilities.V1.SearchRestrictions"] = "Org.OData.Capabilities.V1.SearchRestrictionsType";
    TermToTypes["Org.OData.Capabilities.V1.KeyAsSegmentSupported"] = "Org.OData.Core.V1.Tag";
    TermToTypes["Org.OData.Capabilities.V1.QuerySegmentSupported"] = "Org.OData.Core.V1.Tag";
    TermToTypes["Org.OData.Capabilities.V1.InsertRestrictions"] = "Org.OData.Capabilities.V1.InsertRestrictionsType";
    TermToTypes["Org.OData.Capabilities.V1.DeepInsertSupport"] = "Org.OData.Capabilities.V1.DeepInsertSupportType";
    TermToTypes["Org.OData.Capabilities.V1.UpdateRestrictions"] = "Org.OData.Capabilities.V1.UpdateRestrictionsType";
    TermToTypes["Org.OData.Capabilities.V1.DeepUpdateSupport"] = "Org.OData.Capabilities.V1.DeepUpdateSupportType";
    TermToTypes["Org.OData.Capabilities.V1.DeleteRestrictions"] = "Org.OData.Capabilities.V1.DeleteRestrictionsType";
    TermToTypes["Org.OData.Capabilities.V1.CollectionPropertyRestrictions"] = "Org.OData.Capabilities.V1.CollectionPropertyRestrictionsType";
    TermToTypes["Org.OData.Capabilities.V1.OperationRestrictions"] = "Org.OData.Capabilities.V1.OperationRestrictionsType";
    TermToTypes["Org.OData.Capabilities.V1.AnnotationValuesInQuerySupported"] = "Org.OData.Core.V1.Tag";
    TermToTypes["Org.OData.Capabilities.V1.ModificationQueryOptions"] = "Org.OData.Capabilities.V1.ModificationQueryOptionsType";
    TermToTypes["Org.OData.Capabilities.V1.ReadRestrictions"] = "Org.OData.Capabilities.V1.ReadRestrictionsType";
    TermToTypes["Org.OData.Capabilities.V1.CustomHeaders"] = "Org.OData.Capabilities.V1.CustomParameter";
    TermToTypes["Org.OData.Capabilities.V1.CustomQueryOptions"] = "Org.OData.Capabilities.V1.CustomParameter";
    TermToTypes["Org.OData.Capabilities.V1.MediaLocationUpdateSupported"] = "Org.OData.Core.V1.Tag";
    TermToTypes["Org.OData.Aggregation.V1.ApplySupported"] = "Org.OData.Aggregation.V1.ApplySupportedType";
    TermToTypes["Org.OData.Aggregation.V1.Groupable"] = "Org.OData.Core.V1.Tag";
    TermToTypes["Org.OData.Aggregation.V1.Aggregatable"] = "Org.OData.Core.V1.Tag";
    TermToTypes["Org.OData.Aggregation.V1.ContextDefiningProperties"] = "Edm.PropertyPath";
    TermToTypes["Org.OData.Aggregation.V1.LeveledHierarchy"] = "Edm.PropertyPath";
    TermToTypes["Org.OData.Aggregation.V1.RecursiveHierarchy"] = "Org.OData.Aggregation.V1.RecursiveHierarchyType";
    TermToTypes["Org.OData.Aggregation.V1.AvailableOnAggregates"] = "Org.OData.Aggregation.V1.AvailableOnAggregatesType";
    TermToTypes["Org.OData.Validation.V1.Minimum"] = "Edm.PrimitiveType";
    TermToTypes["Org.OData.Validation.V1.Maximum"] = "Edm.PrimitiveType";
    TermToTypes["Org.OData.Validation.V1.Exclusive"] = "Org.OData.Core.V1.Tag";
    TermToTypes["Org.OData.Validation.V1.AllowedValues"] = "Org.OData.Validation.V1.AllowedValue";
    TermToTypes["Org.OData.Validation.V1.MultipleOf"] = "Edm.Decimal";
    TermToTypes["Org.OData.Validation.V1.Constraint"] = "Org.OData.Validation.V1.ConstraintType";
    TermToTypes["Org.OData.Validation.V1.ItemsOf"] = "Org.OData.Validation.V1.ItemsOfType";
    TermToTypes["Org.OData.Validation.V1.OpenPropertyTypeConstraint"] = "Org.OData.Core.V1.QualifiedTypeName";
    TermToTypes["Org.OData.Validation.V1.DerivedTypeConstraint"] = "Org.OData.Core.V1.QualifiedTypeName";
    TermToTypes["Org.OData.Validation.V1.AllowedTerms"] = "Org.OData.Core.V1.QualifiedTermName";
    TermToTypes["Org.OData.Validation.V1.ApplicableTerms"] = "Org.OData.Core.V1.QualifiedTermName";
    TermToTypes["Org.OData.Validation.V1.MaxItems"] = "Edm.Int64";
    TermToTypes["Org.OData.Validation.V1.MinItems"] = "Edm.Int64";
    TermToTypes["Org.OData.Measures.V1.Scale"] = "Edm.Byte";
    TermToTypes["Org.OData.Measures.V1.DurationGranularity"] = "Org.OData.Measures.V1.DurationGranularityType";
    TermToTypes["com.sap.vocabularies.Analytics.v1.Dimension"] = "Org.OData.Core.V1.Tag";
    TermToTypes["com.sap.vocabularies.Analytics.v1.Measure"] = "Org.OData.Core.V1.Tag";
    TermToTypes["com.sap.vocabularies.Analytics.v1.AccumulativeMeasure"] = "Org.OData.Core.V1.Tag";
    TermToTypes["com.sap.vocabularies.Analytics.v1.RolledUpPropertyCount"] = "Edm.Int16";
    TermToTypes["com.sap.vocabularies.Analytics.v1.PlanningAction"] = "Org.OData.Core.V1.Tag";
    TermToTypes["com.sap.vocabularies.Analytics.v1.AggregatedProperties"] = "com.sap.vocabularies.Analytics.v1.AggregatedPropertyType";
    TermToTypes["com.sap.vocabularies.Common.v1.ServiceVersion"] = "Edm.Int32";
    TermToTypes["com.sap.vocabularies.Common.v1.ServiceSchemaVersion"] = "Edm.Int32";
    TermToTypes["com.sap.vocabularies.Common.v1.TextFor"] = "Edm.PropertyPath";
    TermToTypes["com.sap.vocabularies.Common.v1.IsLanguageIdentifier"] = "Org.OData.Core.V1.Tag";
    TermToTypes["com.sap.vocabularies.Common.v1.TextFormat"] = "com.sap.vocabularies.Common.v1.TextFormatType";
    TermToTypes["com.sap.vocabularies.Common.v1.IsDigitSequence"] = "Org.OData.Core.V1.Tag";
    TermToTypes["com.sap.vocabularies.Common.v1.IsUpperCase"] = "Org.OData.Core.V1.Tag";
    TermToTypes["com.sap.vocabularies.Common.v1.IsCurrency"] = "Org.OData.Core.V1.Tag";
    TermToTypes["com.sap.vocabularies.Common.v1.IsUnit"] = "Org.OData.Core.V1.Tag";
    TermToTypes["com.sap.vocabularies.Common.v1.UnitSpecificScale"] = "Edm.PrimitiveType";
    TermToTypes["com.sap.vocabularies.Common.v1.UnitSpecificPrecision"] = "Edm.PrimitiveType";
    TermToTypes["com.sap.vocabularies.Common.v1.SecondaryKey"] = "Edm.PropertyPath";
    TermToTypes["com.sap.vocabularies.Common.v1.MinOccurs"] = "Edm.Int64";
    TermToTypes["com.sap.vocabularies.Common.v1.MaxOccurs"] = "Edm.Int64";
    TermToTypes["com.sap.vocabularies.Common.v1.AssociationEntity"] = "Edm.NavigationPropertyPath";
    TermToTypes["com.sap.vocabularies.Common.v1.DerivedNavigation"] = "Edm.NavigationPropertyPath";
    TermToTypes["com.sap.vocabularies.Common.v1.Masked"] = "Org.OData.Core.V1.Tag";
    TermToTypes["com.sap.vocabularies.Common.v1.MaskedAlways"] = "Org.OData.Core.V1.Tag";
    TermToTypes["com.sap.vocabularies.Common.v1.SemanticObjectMapping"] = "com.sap.vocabularies.Common.v1.SemanticObjectMappingType";
    TermToTypes["com.sap.vocabularies.Common.v1.IsInstanceAnnotation"] = "Org.OData.Core.V1.Tag";
    TermToTypes["com.sap.vocabularies.Common.v1.FilterExpressionRestrictions"] = "com.sap.vocabularies.Common.v1.FilterExpressionRestrictionType";
    TermToTypes["com.sap.vocabularies.Common.v1.FieldControl"] = "com.sap.vocabularies.Common.v1.FieldControlType";
    TermToTypes["com.sap.vocabularies.Common.v1.Application"] = "com.sap.vocabularies.Common.v1.ApplicationType";
    TermToTypes["com.sap.vocabularies.Common.v1.Timestamp"] = "Edm.DateTimeOffset";
    TermToTypes["com.sap.vocabularies.Common.v1.ErrorResolution"] = "com.sap.vocabularies.Common.v1.ErrorResolutionType";
    TermToTypes["com.sap.vocabularies.Common.v1.Messages"] = "Edm.ComplexType";
    TermToTypes["com.sap.vocabularies.Common.v1.numericSeverity"] = "com.sap.vocabularies.Common.v1.NumericMessageSeverityType";
    TermToTypes["com.sap.vocabularies.Common.v1.MaximumNumericMessageSeverity"] = "com.sap.vocabularies.Common.v1.NumericMessageSeverityType";
    TermToTypes["com.sap.vocabularies.Common.v1.IsActionCritical"] = "Edm.Boolean";
    TermToTypes["com.sap.vocabularies.Common.v1.Attributes"] = "Edm.PropertyPath";
    TermToTypes["com.sap.vocabularies.Common.v1.RelatedRecursiveHierarchy"] = "Edm.AnnotationPath";
    TermToTypes["com.sap.vocabularies.Common.v1.Interval"] = "com.sap.vocabularies.Common.v1.IntervalType";
    TermToTypes["com.sap.vocabularies.Common.v1.ResultContext"] = "Org.OData.Core.V1.Tag";
    TermToTypes["com.sap.vocabularies.Common.v1.WeakReferentialConstraint"] = "com.sap.vocabularies.Common.v1.WeakReferentialConstraintType";
    TermToTypes["com.sap.vocabularies.Common.v1.IsNaturalPerson"] = "Org.OData.Core.V1.Tag";
    TermToTypes["com.sap.vocabularies.Common.v1.ValueList"] = "com.sap.vocabularies.Common.v1.ValueListType";
    TermToTypes["com.sap.vocabularies.Common.v1.ValueListRelevantQualifiers"] = "com.sap.vocabularies.Common.v1.SimpleIdentifier";
    TermToTypes["com.sap.vocabularies.Common.v1.ValueListWithFixedValues"] = "Org.OData.Core.V1.Tag";
    TermToTypes["com.sap.vocabularies.Common.v1.ValueListMapping"] = "com.sap.vocabularies.Common.v1.ValueListMappingType";
    TermToTypes["com.sap.vocabularies.Common.v1.IsCalendarYear"] = "Org.OData.Core.V1.Tag";
    TermToTypes["com.sap.vocabularies.Common.v1.IsCalendarHalfyear"] = "Org.OData.Core.V1.Tag";
    TermToTypes["com.sap.vocabularies.Common.v1.IsCalendarQuarter"] = "Org.OData.Core.V1.Tag";
    TermToTypes["com.sap.vocabularies.Common.v1.IsCalendarMonth"] = "Org.OData.Core.V1.Tag";
    TermToTypes["com.sap.vocabularies.Common.v1.IsCalendarWeek"] = "Org.OData.Core.V1.Tag";
    TermToTypes["com.sap.vocabularies.Common.v1.IsDayOfCalendarMonth"] = "Org.OData.Core.V1.Tag";
    TermToTypes["com.sap.vocabularies.Common.v1.IsDayOfCalendarYear"] = "Org.OData.Core.V1.Tag";
    TermToTypes["com.sap.vocabularies.Common.v1.IsCalendarYearHalfyear"] = "Org.OData.Core.V1.Tag";
    TermToTypes["com.sap.vocabularies.Common.v1.IsCalendarYearQuarter"] = "Org.OData.Core.V1.Tag";
    TermToTypes["com.sap.vocabularies.Common.v1.IsCalendarYearMonth"] = "Org.OData.Core.V1.Tag";
    TermToTypes["com.sap.vocabularies.Common.v1.IsCalendarYearWeek"] = "Org.OData.Core.V1.Tag";
    TermToTypes["com.sap.vocabularies.Common.v1.IsCalendarDate"] = "Org.OData.Core.V1.Tag";
    TermToTypes["com.sap.vocabularies.Common.v1.IsFiscalYear"] = "Org.OData.Core.V1.Tag";
    TermToTypes["com.sap.vocabularies.Common.v1.IsFiscalPeriod"] = "Org.OData.Core.V1.Tag";
    TermToTypes["com.sap.vocabularies.Common.v1.IsFiscalYearPeriod"] = "Org.OData.Core.V1.Tag";
    TermToTypes["com.sap.vocabularies.Common.v1.IsFiscalQuarter"] = "Org.OData.Core.V1.Tag";
    TermToTypes["com.sap.vocabularies.Common.v1.IsFiscalYearQuarter"] = "Org.OData.Core.V1.Tag";
    TermToTypes["com.sap.vocabularies.Common.v1.IsFiscalWeek"] = "Org.OData.Core.V1.Tag";
    TermToTypes["com.sap.vocabularies.Common.v1.IsFiscalYearWeek"] = "Org.OData.Core.V1.Tag";
    TermToTypes["com.sap.vocabularies.Common.v1.IsDayOfFiscalYear"] = "Org.OData.Core.V1.Tag";
    TermToTypes["com.sap.vocabularies.Common.v1.IsFiscalYearVariant"] = "Org.OData.Core.V1.Tag";
    TermToTypes["com.sap.vocabularies.Common.v1.MutuallyExclusiveTerm"] = "Org.OData.Core.V1.Tag";
    TermToTypes["com.sap.vocabularies.Common.v1.DraftRoot"] = "com.sap.vocabularies.Common.v1.DraftRootType";
    TermToTypes["com.sap.vocabularies.Common.v1.DraftNode"] = "com.sap.vocabularies.Common.v1.DraftNodeType";
    TermToTypes["com.sap.vocabularies.Common.v1.DraftActivationVia"] = "com.sap.vocabularies.Common.v1.SimpleIdentifier";
    TermToTypes["com.sap.vocabularies.Common.v1.EditableFieldFor"] = "Edm.PropertyPath";
    TermToTypes["com.sap.vocabularies.Common.v1.SemanticKey"] = "Edm.PropertyPath";
    TermToTypes["com.sap.vocabularies.Common.v1.SideEffects"] = "com.sap.vocabularies.Common.v1.SideEffectsType";
    TermToTypes["com.sap.vocabularies.Common.v1.DefaultValuesFunction"] = "com.sap.vocabularies.Common.v1.QualifiedName";
    TermToTypes["com.sap.vocabularies.Common.v1.FilterDefaultValue"] = "Edm.PrimitiveType";
    TermToTypes["com.sap.vocabularies.Common.v1.FilterDefaultValueHigh"] = "Edm.PrimitiveType";
    TermToTypes["com.sap.vocabularies.Common.v1.SortOrder"] = "com.sap.vocabularies.Common.v1.SortOrderType";
    TermToTypes["com.sap.vocabularies.Common.v1.RecursiveHierarchy"] = "com.sap.vocabularies.Common.v1.RecursiveHierarchyType";
    TermToTypes["com.sap.vocabularies.Common.v1.CreatedAt"] = "Edm.DateTimeOffset";
    TermToTypes["com.sap.vocabularies.Common.v1.CreatedBy"] = "com.sap.vocabularies.Common.v1.UserID";
    TermToTypes["com.sap.vocabularies.Common.v1.ChangedAt"] = "Edm.DateTimeOffset";
    TermToTypes["com.sap.vocabularies.Common.v1.ChangedBy"] = "com.sap.vocabularies.Common.v1.UserID";
    TermToTypes["com.sap.vocabularies.Common.v1.ApplyMultiUnitBehaviorForSortingAndFiltering"] = "Org.OData.Core.V1.Tag";
    TermToTypes["com.sap.vocabularies.CodeList.v1.CurrencyCodes"] = "com.sap.vocabularies.CodeList.v1.CodeListSource";
    TermToTypes["com.sap.vocabularies.CodeList.v1.UnitsOfMeasure"] = "com.sap.vocabularies.CodeList.v1.CodeListSource";
    TermToTypes["com.sap.vocabularies.CodeList.v1.StandardCode"] = "Edm.PropertyPath";
    TermToTypes["com.sap.vocabularies.CodeList.v1.ExternalCode"] = "Edm.PropertyPath";
    TermToTypes["com.sap.vocabularies.CodeList.v1.IsConfigurationDeprecationCode"] = "Edm.Boolean";
    TermToTypes["com.sap.vocabularies.Communication.v1.Contact"] = "com.sap.vocabularies.Communication.v1.ContactType";
    TermToTypes["com.sap.vocabularies.Communication.v1.Address"] = "com.sap.vocabularies.Communication.v1.AddressType";
    TermToTypes["com.sap.vocabularies.Communication.v1.IsEmailAddress"] = "Org.OData.Core.V1.Tag";
    TermToTypes["com.sap.vocabularies.Communication.v1.IsPhoneNumber"] = "Org.OData.Core.V1.Tag";
    TermToTypes["com.sap.vocabularies.Communication.v1.Event"] = "com.sap.vocabularies.Communication.v1.EventData";
    TermToTypes["com.sap.vocabularies.Communication.v1.Task"] = "com.sap.vocabularies.Communication.v1.TaskData";
    TermToTypes["com.sap.vocabularies.Communication.v1.Message"] = "com.sap.vocabularies.Communication.v1.MessageData";
    TermToTypes["com.sap.vocabularies.Hierarchy.v1.RecursiveHierarchy"] = "com.sap.vocabularies.Hierarchy.v1.RecursiveHierarchyType";
    TermToTypes["com.sap.vocabularies.PersonalData.v1.EntitySemantics"] = "com.sap.vocabularies.PersonalData.v1.EntitySemanticsType";
    TermToTypes["com.sap.vocabularies.PersonalData.v1.FieldSemantics"] = "com.sap.vocabularies.PersonalData.v1.FieldSemanticsType";
    TermToTypes["com.sap.vocabularies.PersonalData.v1.IsPotentiallyPersonal"] = "Org.OData.Core.V1.Tag";
    TermToTypes["com.sap.vocabularies.PersonalData.v1.IsPotentiallySensitive"] = "Org.OData.Core.V1.Tag";
    TermToTypes["com.sap.vocabularies.Session.v1.StickySessionSupported"] = "com.sap.vocabularies.Session.v1.StickySessionSupportedType";
    TermToTypes["com.sap.vocabularies.UI.v1.HeaderInfo"] = "com.sap.vocabularies.UI.v1.HeaderInfoType";
    TermToTypes["com.sap.vocabularies.UI.v1.Identification"] = "com.sap.vocabularies.UI.v1.DataFieldAbstract";
    TermToTypes["com.sap.vocabularies.UI.v1.Badge"] = "com.sap.vocabularies.UI.v1.BadgeType";
    TermToTypes["com.sap.vocabularies.UI.v1.LineItem"] = "com.sap.vocabularies.UI.v1.DataFieldAbstract";
    TermToTypes["com.sap.vocabularies.UI.v1.StatusInfo"] = "com.sap.vocabularies.UI.v1.DataFieldAbstract";
    TermToTypes["com.sap.vocabularies.UI.v1.FieldGroup"] = "com.sap.vocabularies.UI.v1.FieldGroupType";
    TermToTypes["com.sap.vocabularies.UI.v1.ConnectedFields"] = "com.sap.vocabularies.UI.v1.ConnectedFieldsType";
    TermToTypes["com.sap.vocabularies.UI.v1.GeoLocations"] = "com.sap.vocabularies.UI.v1.GeoLocationType";
    TermToTypes["com.sap.vocabularies.UI.v1.GeoLocation"] = "com.sap.vocabularies.UI.v1.GeoLocationType";
    TermToTypes["com.sap.vocabularies.UI.v1.Contacts"] = "Edm.AnnotationPath";
    TermToTypes["com.sap.vocabularies.UI.v1.MediaResource"] = "com.sap.vocabularies.UI.v1.MediaResourceType";
    TermToTypes["com.sap.vocabularies.UI.v1.DataPoint"] = "com.sap.vocabularies.UI.v1.DataPointType";
    TermToTypes["com.sap.vocabularies.UI.v1.KPI"] = "com.sap.vocabularies.UI.v1.KPIType";
    TermToTypes["com.sap.vocabularies.UI.v1.Chart"] = "com.sap.vocabularies.UI.v1.ChartDefinitionType";
    TermToTypes["com.sap.vocabularies.UI.v1.ValueCriticality"] = "com.sap.vocabularies.UI.v1.ValueCriticalityType";
    TermToTypes["com.sap.vocabularies.UI.v1.CriticalityLabels"] = "com.sap.vocabularies.UI.v1.CriticalityLabelType";
    TermToTypes["com.sap.vocabularies.UI.v1.SelectionFields"] = "Edm.PropertyPath";
    TermToTypes["com.sap.vocabularies.UI.v1.Facets"] = "com.sap.vocabularies.UI.v1.Facet";
    TermToTypes["com.sap.vocabularies.UI.v1.HeaderFacets"] = "com.sap.vocabularies.UI.v1.Facet";
    TermToTypes["com.sap.vocabularies.UI.v1.QuickViewFacets"] = "com.sap.vocabularies.UI.v1.Facet";
    TermToTypes["com.sap.vocabularies.UI.v1.QuickCreateFacets"] = "com.sap.vocabularies.UI.v1.Facet";
    TermToTypes["com.sap.vocabularies.UI.v1.FilterFacets"] = "com.sap.vocabularies.UI.v1.ReferenceFacet";
    TermToTypes["com.sap.vocabularies.UI.v1.SelectionPresentationVariant"] = "com.sap.vocabularies.UI.v1.SelectionPresentationVariantType";
    TermToTypes["com.sap.vocabularies.UI.v1.PresentationVariant"] = "com.sap.vocabularies.UI.v1.PresentationVariantType";
    TermToTypes["com.sap.vocabularies.UI.v1.SelectionVariant"] = "com.sap.vocabularies.UI.v1.SelectionVariantType";
    TermToTypes["com.sap.vocabularies.UI.v1.ThingPerspective"] = "Org.OData.Core.V1.Tag";
    TermToTypes["com.sap.vocabularies.UI.v1.IsSummary"] = "Org.OData.Core.V1.Tag";
    TermToTypes["com.sap.vocabularies.UI.v1.PartOfPreview"] = "Org.OData.Core.V1.Tag";
    TermToTypes["com.sap.vocabularies.UI.v1.Map"] = "Org.OData.Core.V1.Tag";
    TermToTypes["com.sap.vocabularies.UI.v1.Gallery"] = "Org.OData.Core.V1.Tag";
    TermToTypes["com.sap.vocabularies.UI.v1.IsImageURL"] = "Org.OData.Core.V1.Tag";
    TermToTypes["com.sap.vocabularies.UI.v1.IsImage"] = "Org.OData.Core.V1.Tag";
    TermToTypes["com.sap.vocabularies.UI.v1.MultiLineText"] = "Org.OData.Core.V1.Tag";
    TermToTypes["com.sap.vocabularies.UI.v1.TextArrangement"] = "com.sap.vocabularies.UI.v1.TextArrangementType";
    TermToTypes["com.sap.vocabularies.UI.v1.Importance"] = "com.sap.vocabularies.UI.v1.ImportanceType";
    TermToTypes["com.sap.vocabularies.UI.v1.Hidden"] = "Org.OData.Core.V1.Tag";
    TermToTypes["com.sap.vocabularies.UI.v1.CreateHidden"] = "Org.OData.Core.V1.Tag";
    TermToTypes["com.sap.vocabularies.UI.v1.UpdateHidden"] = "Org.OData.Core.V1.Tag";
    TermToTypes["com.sap.vocabularies.UI.v1.DeleteHidden"] = "Org.OData.Core.V1.Tag";
    TermToTypes["com.sap.vocabularies.UI.v1.HiddenFilter"] = "Org.OData.Core.V1.Tag";
    TermToTypes["com.sap.vocabularies.UI.v1.DataFieldDefault"] = "com.sap.vocabularies.UI.v1.DataFieldAbstract";
    TermToTypes["com.sap.vocabularies.UI.v1.Criticality"] = "com.sap.vocabularies.UI.v1.CriticalityType";
    TermToTypes["com.sap.vocabularies.UI.v1.CriticalityCalculation"] = "com.sap.vocabularies.UI.v1.CriticalityCalculationType";
    TermToTypes["com.sap.vocabularies.UI.v1.Emphasized"] = "Org.OData.Core.V1.Tag";
    TermToTypes["com.sap.vocabularies.UI.v1.OrderBy"] = "Edm.PropertyPath";
    TermToTypes["com.sap.vocabularies.UI.v1.ParameterDefaultValue"] = "Edm.PrimitiveType";
    TermToTypes["com.sap.vocabularies.UI.v1.RecommendationState"] = "com.sap.vocabularies.UI.v1.RecommendationStateType";
    TermToTypes["com.sap.vocabularies.UI.v1.RecommendationList"] = "com.sap.vocabularies.UI.v1.RecommendationListType";
    TermToTypes["com.sap.vocabularies.UI.v1.ExcludeFromNavigationContext"] = "Org.OData.Core.V1.Tag";
    TermToTypes["com.sap.vocabularies.HTML5.v1.CssDefaults"] = "com.sap.vocabularies.HTML5.v1.CssDefaultsType";
  })(TermToTypes || (TermToTypes = {}));

  var defaultReferences = [{
    alias: "Capabilities",
    namespace: "Org.OData.Capabilities.V1",
    uri: ""
  }, {
    alias: "Aggregation",
    namespace: "Org.OData.Aggregation.V1",
    uri: ""
  }, {
    alias: "Validation",
    namespace: "Org.OData.Validation.V1",
    uri: ""
  }, {
    namespace: "Org.OData.Core.V1",
    alias: "Core",
    uri: ""
  }, {
    namespace: "Org.OData.Measures.V1",
    alias: "Measures",
    uri: ""
  }, {
    namespace: "com.sap.vocabularies.Common.v1",
    alias: "Common",
    uri: ""
  }, {
    namespace: "com.sap.vocabularies.UI.v1",
    alias: "UI",
    uri: ""
  }, {
    namespace: "com.sap.vocabularies.Session.v1",
    alias: "Session",
    uri: ""
  }, {
    namespace: "com.sap.vocabularies.Analytics.v1",
    alias: "Analytics",
    uri: ""
  }, {
    namespace: "com.sap.vocabularies.CodeList.v1",
    alias: "CodeList",
    uri: ""
  }, {
    namespace: "com.sap.vocabularies.PersonalData.v1",
    alias: "PersonalData",
    uri: ""
  }, {
    namespace: "com.sap.vocabularies.Communication.v1",
    alias: "Communication",
    uri: ""
  }, {
    namespace: "com.sap.vocabularies.HTML5.v1",
    alias: "HTML5",
    uri: ""
  }];
  _exports.defaultReferences = defaultReferences;

  function alias(references, unaliasedValue) {
    if (!references.reverseReferenceMap) {
      references.reverseReferenceMap = references.reduce(function (map, reference) {
        map[reference.namespace] = reference;
        return map;
      }, {});
    }

    if (!unaliasedValue) {
      return unaliasedValue;
    }

    var lastDotIndex = unaliasedValue.lastIndexOf(".");
    var namespace = unaliasedValue.substr(0, lastDotIndex);
    var value = unaliasedValue.substr(lastDotIndex + 1);
    var reference = references.reverseReferenceMap[namespace];

    if (reference) {
      return "".concat(reference.alias, ".").concat(value);
    } else {
      // Try to see if it's an annotation Path like to_SalesOrder/@UI.LineItem
      if (unaliasedValue.indexOf("@") !== -1) {
        var _unaliasedValue$split = unaliasedValue.split("@"),
            _unaliasedValue$split2 = _toArray(_unaliasedValue$split),
            preAlias = _unaliasedValue$split2[0],
            postAlias = _unaliasedValue$split2.slice(1);

        return "".concat(preAlias, "@").concat(alias(references, postAlias.join("@")));
      } else {
        return unaliasedValue;
      }
    }
  }

  function unalias(references, aliasedValue) {
    if (!references.referenceMap) {
      references.referenceMap = references.reduce(function (map, reference) {
        map[reference.alias] = reference;
        return map;
      }, {});
    }

    if (!aliasedValue) {
      return aliasedValue;
    }

    var _aliasedValue$split = aliasedValue.split("."),
        _aliasedValue$split2 = _toArray(_aliasedValue$split),
        alias = _aliasedValue$split2[0],
        value = _aliasedValue$split2.slice(1);

    var reference = references.referenceMap[alias];

    if (reference) {
      return "".concat(reference.namespace, ".").concat(value.join("."));
    } else {
      // Try to see if it's an annotation Path like to_SalesOrder/@UI.LineItem
      if (aliasedValue.indexOf("@") !== -1) {
        var _aliasedValue$split3 = aliasedValue.split("@"),
            _aliasedValue$split4 = _toArray(_aliasedValue$split3),
            preAlias = _aliasedValue$split4[0],
            postAlias = _aliasedValue$split4.slice(1);

        return "".concat(preAlias, "@").concat(unalias(references, postAlias.join("@")));
      } else {
        return aliasedValue;
      }
    }
  }

  function buildObjectMap(parserOutput) {
    var objectMap = {};

    if (parserOutput.schema.entityContainer && parserOutput.schema.entityContainer.fullyQualifiedName) {
      objectMap[parserOutput.schema.entityContainer.fullyQualifiedName] = parserOutput.schema.entityContainer;
    }

    parserOutput.schema.entitySets.forEach(function (entitySet) {
      objectMap[entitySet.fullyQualifiedName] = entitySet;
    });
    parserOutput.schema.actions.forEach(function (action) {
      objectMap[action.fullyQualifiedName] = action;
      objectMap[action.fullyQualifiedName.split("(")[0]] = action;
      action.parameters.forEach(function (parameter) {
        objectMap[parameter.fullyQualifiedName] = parameter;
      });
    });
    parserOutput.schema.complexTypes.forEach(function (complexType) {
      objectMap[complexType.fullyQualifiedName] = complexType;
      complexType.properties.forEach(function (property) {
        objectMap[property.fullyQualifiedName] = property;
      });
    });
    parserOutput.schema.entityTypes.forEach(function (entityType) {
      objectMap[entityType.fullyQualifiedName] = entityType;
      entityType.entityProperties.forEach(function (property) {
        objectMap[property.fullyQualifiedName] = property;

        if (property.type.indexOf("Edm") === -1) {
          // Handle complex types
          var complexTypeDefinition = objectMap[property.type];

          if (complexTypeDefinition && complexTypeDefinition.properties) {
            complexTypeDefinition.properties.forEach(function (complexTypeProp) {
              var complexTypePropTarget = Object.assign(complexTypeProp, {
                _type: "Property",
                fullyQualifiedName: property.fullyQualifiedName + "/" + complexTypeProp.name
              });
              objectMap[complexTypePropTarget.fullyQualifiedName] = complexTypePropTarget;
            });
          }
        }
      });
      entityType.navigationProperties.forEach(function (navProperty) {
        objectMap[navProperty.fullyQualifiedName] = navProperty;
      });
    });
    Object.keys(parserOutput.schema.annotations).forEach(function (annotationSource) {
      parserOutput.schema.annotations[annotationSource].forEach(function (annotationList) {
        var currentTargetName = unalias(parserOutput.references, annotationList.target);
        annotationList.annotations.forEach(function (annotation) {
          var annotationFQN = "".concat(currentTargetName, "@").concat(unalias(parserOutput.references, annotation.term));

          if (annotation.qualifier) {
            annotationFQN += "#".concat(annotation.qualifier);
          }

          if (typeof annotation !== "object") {
            debugger;
          }

          objectMap[annotationFQN] = annotation;
          annotation.fullyQualifiedName = annotationFQN;
        });
      });
    });
    return objectMap;
  }

  function combinePath(currentTarget, path) {
    if (path.startsWith("@")) {
      return currentTarget + unalias(defaultReferences, path);
    } else {
      return currentTarget + "/" + path;
    }
  }

  function addAnnotationErrorMessage(path, oErrorMsg) {
    if (!ALL_ANNOTATION_ERRORS[path]) {
      ALL_ANNOTATION_ERRORS[path] = [oErrorMsg];
    } else {
      ALL_ANNOTATION_ERRORS[path].push(oErrorMsg);
    }
  }

  function resolveTarget(objectMap, currentTarget, path) {
    var pathOnly = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    var includeVisitedObjects = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
    var annotationType = arguments.length > 5 ? arguments[5] : undefined;
    var annotationsTerm = arguments.length > 6 ? arguments[6] : undefined;

    if (!path) {
      return undefined;
    } //const propertyPath = path;


    var aVisitedObjects = [];

    if (currentTarget && currentTarget._type === "Property") {
      currentTarget = objectMap[currentTarget.fullyQualifiedName.split("/")[0]];
    }

    path = combinePath(currentTarget.fullyQualifiedName, path);
    var pathSplit = path.split("/");
    var targetPathSplit = [];
    pathSplit.forEach(function (pathPart) {
      // Separate out the annotation
      if (pathPart.indexOf("@") !== -1) {
        var _pathPart$split = pathPart.split("@"),
            _pathPart$split2 = _slicedToArray(_pathPart$split, 2),
            _path = _pathPart$split2[0],
            annotationPath = _pathPart$split2[1];

        targetPathSplit.push(_path);
        targetPathSplit.push("@".concat(annotationPath));
      } else {
        targetPathSplit.push(pathPart);
      }
    });
    var currentPath = path;
    var currentContext = currentTarget;
    var target = targetPathSplit.reduce(function (currentValue, pathPart) {
      if (pathPart === "$Type" && currentValue._type === "EntityType") {
        return currentValue;
      }

      if (pathPart.length === 0) {
        // Empty Path after an entitySet means entityType
        if (currentValue && currentValue._type === "EntitySet" && currentValue.entityType) {
          if (includeVisitedObjects) {
            aVisitedObjects.push(currentValue);
          }

          currentValue = currentValue.entityType;
        }

        if (currentValue && currentValue._type === "NavigationProperty" && currentValue.targetType) {
          if (includeVisitedObjects) {
            aVisitedObjects.push(currentValue);
          }

          currentValue = currentValue.targetType;
        }

        return currentValue;
      }

      if (includeVisitedObjects && currentValue !== null && currentValue !== undefined) {
        aVisitedObjects.push(currentValue);
      }

      if (!currentValue) {
        currentPath = pathPart;
      } else if (currentValue._type === "EntitySet" && pathPart === "$Type") {
        currentValue = currentValue.targetType;
        return currentValue;
      } else if (currentValue._type === "EntitySet" && currentValue.entityType) {
        currentPath = combinePath(currentValue.entityTypeName, pathPart);
      } else if (currentValue._type === "NavigationProperty" && currentValue.targetTypeName) {
        currentPath = combinePath(currentValue.targetTypeName, pathPart);
      } else if (currentValue._type === "NavigationProperty" && currentValue.targetType) {
        currentPath = combinePath(currentValue.targetType.fullyQualifiedName, pathPart);
      } else if (currentValue._type === "Property") {
        // ComplexType or Property
        if (currentValue.targetType) {
          currentPath = combinePath(currentValue.targetType.fullyQualifiedName, pathPart);
        } else {
          currentPath = combinePath(currentValue.fullyQualifiedName, pathPart);
        }
      } else if (currentValue._type === "Action" && currentValue.isBound) {
        currentPath = combinePath(currentValue.fullyQualifiedName, pathPart);

        if (!objectMap[currentPath]) {
          currentPath = combinePath(currentValue.sourceType, pathPart);
        }
      } else if (currentValue._type === "ActionParameter" && currentValue.isEntitySet) {
        currentPath = combinePath(currentValue.type, pathPart);
      } else if (currentValue._type === "ActionParameter" && !currentValue.isEntitySet) {
        currentPath = combinePath(currentTarget.fullyQualifiedName.substr(0, currentTarget.fullyQualifiedName.lastIndexOf("/")), pathPart);

        if (!objectMap[currentPath]) {
          var lastIdx = currentTarget.fullyQualifiedName.lastIndexOf("/");

          if (lastIdx === -1) {
            lastIdx = currentTarget.fullyQualifiedName.length;
          }

          currentPath = combinePath(objectMap[currentTarget.fullyQualifiedName.substr(0, lastIdx)].sourceType, pathPart);
        }
      } else {
        currentPath = combinePath(currentValue.fullyQualifiedName, pathPart);

        if (pathPart !== "name" && currentValue[pathPart] !== undefined) {
          return currentValue[pathPart];
        } else if (pathPart === "$AnnotationPath" && currentValue.$target) {
          var _currentContext = objectMap[currentValue.fullyQualifiedName.split("@")[0]];
          var subTarget = resolveTarget(objectMap, _currentContext, currentValue.value, false, true);
          subTarget.visitedObjects.forEach(function (visitedSubObject) {
            if (aVisitedObjects.indexOf(visitedSubObject) === -1) {
              aVisitedObjects.push(visitedSubObject);
            }
          });
          return subTarget.target;
        } else if (pathPart === "$Path" && currentValue.$target) {
          currentContext = aVisitedObjects.concat().reverse().find(function (obj) {
            return obj._type === "EntityType" || obj._type === "EntitySet" || obj._type === "NavigationProperty";
          });

          if (currentContext) {
            var _subTarget = resolveTarget(objectMap, currentContext, currentValue.path, false, true);

            _subTarget.visitedObjects.forEach(function (visitedSubObject) {
              if (aVisitedObjects.indexOf(visitedSubObject) === -1) {
                aVisitedObjects.push(visitedSubObject);
              }
            });

            return _subTarget.target;
          }

          return currentValue.$target;
        } else if (pathPart.startsWith("$Path") && currentValue.$target) {
          var intermediateTarget = currentValue.$target;
          currentPath = combinePath(intermediateTarget.fullyQualifiedName, pathPart.substr(5));
        } else if (currentValue.hasOwnProperty("$Type") && !objectMap[currentPath]) {
          // This is now an annotation value
          var entityType = objectMap[currentValue.fullyQualifiedName.split("@")[0]];

          if (entityType) {
            currentPath = combinePath(entityType.fullyQualifiedName, pathPart);
          }
        }
      }

      return objectMap[currentPath];
    }, null);

    if (!target) {
      if (annotationsTerm && annotationType) {
        var oErrorMsg = {
          message: "Unable to resolve the path expression: " + "\n" + path + "\n" + "\n" + "Hint: Check and correct the path values under the following structure in the metadata (annotation.xml file or CDS annotations for the application): \n\n" + "<Annotation Term = " + annotationsTerm + ">" + "\n" + "<Record Type = " + annotationType + ">" + "\n" + "<AnnotationPath = " + path + ">"
        };
        addAnnotationErrorMessage(path, oErrorMsg);
      } else {
        var oErrorMsg = {
          message: "Unable to resolve the path expression: " + path + "\n" + "\n" + "Hint: Check and correct the path values under the following structure in the metadata (annotation.xml file or CDS annotations for the application): \n\n" + "<Annotation Term = " + pathSplit[0] + ">" + "\n" + "<PropertyValue  Path= " + pathSplit[1] + ">"
        };
        addAnnotationErrorMessage(path, oErrorMsg);
      } // console.log("Missing target " + path);

    }

    if (pathOnly) {
      return currentPath;
    }

    if (includeVisitedObjects) {
      return {
        visitedObjects: aVisitedObjects,
        target: target
      };
    }

    return target;
  }

  function isAnnotationPath(pathStr) {
    return pathStr.indexOf("@") !== -1;
  }

  function parseValue(propertyValue, valueFQN, parserOutput, currentTarget, objectMap, toResolve, annotationSource, unresolvedAnnotations, annotationType, annotationsTerm) {
    if (propertyValue === undefined) {
      return undefined;
    }

    switch (propertyValue.type) {
      case "String":
        return propertyValue.String;

      case "Int":
        return propertyValue.Int;

      case "Bool":
        return propertyValue.Bool;

      case "Decimal":
        return propertyValue.Decimal;

      case "Date":
        return propertyValue.Date;

      case "EnumMember":
        return alias(parserOutput.references, propertyValue.EnumMember);

      case "PropertyPath":
        return {
          type: "PropertyPath",
          value: propertyValue.PropertyPath,
          fullyQualifiedName: valueFQN,
          $target: resolveTarget(objectMap, currentTarget, propertyValue.PropertyPath, false, false, annotationType, annotationsTerm)
        };

      case "NavigationPropertyPath":
        return {
          type: "NavigationPropertyPath",
          value: propertyValue.NavigationPropertyPath,
          fullyQualifiedName: valueFQN,
          $target: resolveTarget(objectMap, currentTarget, propertyValue.NavigationPropertyPath, false, false, annotationType, annotationsTerm)
        };

      case "AnnotationPath":
        var annotationTarget = resolveTarget(objectMap, currentTarget, unalias(parserOutput.references, propertyValue.AnnotationPath), true, false, annotationType, annotationsTerm);
        var annotationPath = {
          type: "AnnotationPath",
          value: propertyValue.AnnotationPath,
          fullyQualifiedName: valueFQN,
          $target: annotationTarget,
          annotationType: annotationType,
          annotationsTerm: annotationsTerm,
          term: "",
          path: ""
        };
        toResolve.push({
          inline: false,
          toResolve: annotationPath
        });
        return annotationPath;

      case "Path":
        var $target = resolveTarget(objectMap, currentTarget, propertyValue.Path, true, false, annotationType, annotationsTerm);
        var path = new Path(propertyValue, $target, annotationsTerm, annotationType, "");
        toResolve.push({
          inline: isAnnotationPath(propertyValue.Path),
          toResolve: path
        });
        return path;

      case "Record":
        return parseRecord(propertyValue.Record, valueFQN, parserOutput, currentTarget, objectMap, toResolve, annotationSource, unresolvedAnnotations, annotationType, annotationsTerm);

      case "Collection":
        return parseCollection(propertyValue.Collection, valueFQN, parserOutput, currentTarget, objectMap, toResolve, annotationSource, unresolvedAnnotations, annotationType, annotationsTerm);

      case "Apply":
      case "Not":
      case "Eq":
      case "Ne":
      case "Gt":
      case "Ge":
      case "Lt":
      case "Le":
      case "If":
      case "And":
      case "Or":
        return propertyValue;
    }
  }

  function inferTypeFromTerm(annotationsTerm, parserOutput, annotationTarget) {
    var targetType = TermToTypes[annotationsTerm];
    var oErrorMsg = {
      isError: false,
      message: "The type of the record used within the term ".concat(annotationsTerm, " was not defined and was inferred as ").concat(targetType, ".\nHint: If possible, try to maintain the Type property for each Record.\n<Annotations Target=\"").concat(annotationTarget, "\">\n\t<Annotation Term=\"").concat(annotationsTerm, "\">\n\t\t<Record>...</Record>\n\t</Annotation>\n</Annotations>")
    };
    addAnnotationErrorMessage(annotationTarget + "/" + annotationsTerm, oErrorMsg);
    return targetType;
  }

  function parseRecord(recordDefinition, currentFQN, parserOutput, currentTarget, objectMap, toResolve, annotationSource, unresolvedAnnotations, annotationType, annotationsTerm) {
    var targetType;

    if (!recordDefinition.type && annotationsTerm) {
      targetType = inferTypeFromTerm(annotationsTerm, parserOutput, currentTarget.fullyQualifiedName);
    } else {
      targetType = unalias(parserOutput.references, recordDefinition.type);
    }

    var annotationTerm = {
      $Type: targetType,
      fullyQualifiedName: currentFQN
    };
    var annotationContent = {};

    if (recordDefinition.annotations && Array.isArray(recordDefinition.annotations)) {
      var subAnnotationList = {
        target: currentFQN,
        annotations: recordDefinition.annotations,
        __source: annotationSource
      };
      unresolvedAnnotations.push(subAnnotationList);
    }

    recordDefinition.propertyValues.forEach(function (propertyValue) {
      annotationContent[propertyValue.name] = parseValue(propertyValue.value, "".concat(currentFQN, "/").concat(propertyValue.name), parserOutput, currentTarget, objectMap, toResolve, annotationSource, unresolvedAnnotations, annotationType, annotationsTerm);

      if (propertyValue.annotations && Array.isArray(propertyValue.annotations)) {
        var _subAnnotationList = {
          target: "".concat(currentFQN, "/").concat(propertyValue.name),
          annotations: propertyValue.annotations,
          __source: annotationSource
        };
        unresolvedAnnotations.push(_subAnnotationList);
      }

      if (annotationContent.hasOwnProperty("Action") && (annotationTerm.$Type === "com.sap.vocabularies.UI.v1.DataFieldForAction" || annotationTerm.$Type === "com.sap.vocabularies.UI.v1.DataFieldWithAction")) {
        annotationContent.ActionTarget = currentTarget.actions && currentTarget.actions[annotationContent.Action] || objectMap[annotationContent.Action];

        if (!annotationContent.ActionTarget) {
          // Add to diagnostics debugger;
          ANNOTATION_ERRORS.push({
            message: "Unable to resolve the action " + annotationContent.Action + " defined for " + annotationTerm.fullyQualifiedName
          });
        }
      }
    });
    return Object.assign(annotationTerm, annotationContent);
  }

  function getOrInferCollectionType(collectionDefinition) {
    var type = collectionDefinition.type;

    if (type === undefined && collectionDefinition.length > 0) {
      var firstColItem = collectionDefinition[0];

      if (firstColItem.hasOwnProperty("PropertyPath")) {
        type = "PropertyPath";
      } else if (firstColItem.hasOwnProperty("Path")) {
        type = "Path";
      } else if (firstColItem.hasOwnProperty("AnnotationPath")) {
        type = "AnnotationPath";
      } else if (firstColItem.hasOwnProperty("NavigationPropertyPath")) {
        type = "NavigationPropertyPath";
      } else if (typeof firstColItem === "object" && (firstColItem.hasOwnProperty("type") || firstColItem.hasOwnProperty("propertyValues"))) {
        type = "Record";
      } else if (typeof firstColItem === "string") {
        type = "String";
      }
    } else if (type === undefined) {
      type = "EmptyCollection";
    }

    return type;
  }

  function parseCollection(collectionDefinition, parentFQN, parserOutput, currentTarget, objectMap, toResolve, annotationSource, unresolvedAnnotations, annotationType, annotationsTerm) {
    var collectionDefinitionType = getOrInferCollectionType(collectionDefinition);

    switch (collectionDefinitionType) {
      case "PropertyPath":
        return collectionDefinition.map(function (propertyPath, propertyIdx) {
          return {
            type: "PropertyPath",
            value: propertyPath.PropertyPath,
            fullyQualifiedName: "".concat(parentFQN, "/").concat(propertyIdx),
            $target: resolveTarget(objectMap, currentTarget, propertyPath.PropertyPath, false, false, annotationType, annotationsTerm)
          };
        });

      case "Path":
        return collectionDefinition.map(function (pathValue) {
          var $target = resolveTarget(objectMap, currentTarget, pathValue.Path, true, false, annotationType, annotationsTerm);
          var path = new Path(pathValue, $target, annotationsTerm, annotationType, "");
          toResolve.push({
            inline: isAnnotationPath(pathValue.Path),
            toResolve: path
          });
          return path;
        });

      case "AnnotationPath":
        return collectionDefinition.map(function (annotationPath, annotationIdx) {
          var annotationTarget = resolveTarget(objectMap, currentTarget, annotationPath.AnnotationPath, true, false, annotationType, annotationsTerm);
          var annotationCollectionElement = {
            type: "AnnotationPath",
            value: annotationPath.AnnotationPath,
            fullyQualifiedName: "".concat(parentFQN, "/").concat(annotationIdx),
            $target: annotationTarget,
            annotationType: annotationType,
            annotationsTerm: annotationsTerm,
            term: "",
            path: ""
          };
          toResolve.push({
            inline: false,
            toResolve: annotationCollectionElement
          });
          return annotationCollectionElement;
        });

      case "NavigationPropertyPath":
        return collectionDefinition.map(function (navPropertyPath, navPropIdx) {
          return {
            type: "NavigationPropertyPath",
            value: navPropertyPath.NavigationPropertyPath,
            fullyQualifiedName: "".concat(parentFQN, "/").concat(navPropIdx),
            $target: resolveTarget(objectMap, currentTarget, navPropertyPath.NavigationPropertyPath, false, false, annotationType, annotationsTerm)
          };
        });

      case "Record":
        return collectionDefinition.map(function (recordDefinition, recordIdx) {
          return parseRecord(recordDefinition, "".concat(parentFQN, "/").concat(recordIdx), parserOutput, currentTarget, objectMap, toResolve, annotationSource, unresolvedAnnotations, annotationType, annotationsTerm);
        });

      case "Apply":
      case "If":
      case "Eq":
      case "Ne":
      case "Lt":
      case "Gt":
      case "Le":
      case "Ge":
      case "Not":
      case "And":
      case "Or":
        return collectionDefinition.map(function (ifValue) {
          return ifValue;
        });

      case "String":
        return collectionDefinition.map(function (stringValue) {
          if (typeof stringValue === "string") {
            return stringValue;
          } else if (stringValue === undefined) {
            return stringValue;
          } else {
            return stringValue.String;
          }
        });

      default:
        if (collectionDefinition.length === 0) {
          return [];
        }

        throw new Error("Unsupported case");
    }
  }

  function convertAnnotation(annotation, parserOutput, currentTarget, objectMap, toResolve, annotationSource, unresolvedAnnotations) {
    if (annotation.record) {
      var annotationType = annotation.record.type ? unalias(parserOutput.references, annotation.record.type) : inferTypeFromTerm(annotation.term, parserOutput, currentTarget.fullyQualifiedName);
      var annotationTerm = {
        $Type: annotationType,
        fullyQualifiedName: annotation.fullyQualifiedName,
        qualifier: annotation.qualifier
      };
      var annotationContent = {};
      annotation.record.propertyValues.forEach(function (propertyValue) {
        annotationContent[propertyValue.name] = parseValue(propertyValue.value, "".concat(annotation.fullyQualifiedName, "/").concat(propertyValue.name), parserOutput, currentTarget, objectMap, toResolve, annotationSource, unresolvedAnnotations, annotationType, annotation.term);

        if (annotationContent.hasOwnProperty("Action") && (!annotation.record || annotationTerm.$Type === "com.sap.vocabularies.UI.v1.DataFieldForAction" || annotationTerm.$Type === "com.sap.vocabularies.UI.v1.DataFieldWithAction")) {
          annotationContent.ActionTarget = currentTarget.actions && currentTarget.actions[annotationContent.Action] || objectMap[annotationContent.Action];

          if (!annotationContent.ActionTarget) {
            ANNOTATION_ERRORS.push({
              message: "Unable to resolve the action " + annotationContent.Action + " defined for " + annotation.fullyQualifiedName
            }); // Add to diagnostics
            // debugger;
          }
        }
      });
      return Object.assign(annotationTerm, annotationContent);
    } else if (annotation.collection === undefined) {
      if (annotation.value) {
        return parseValue(annotation.value, annotation.fullyQualifiedName, parserOutput, currentTarget, objectMap, toResolve, annotationSource, unresolvedAnnotations, "", annotation.term);
      } else {
        return true;
      }
    } else if (annotation.collection) {
      var collection = parseCollection(annotation.collection, annotation.fullyQualifiedName, parserOutput, currentTarget, objectMap, toResolve, annotationSource, unresolvedAnnotations, "", annotation.term);
      collection.fullyQualifiedName = annotation.fullyQualifiedName;
      return collection;
    } else {
      throw new Error("Unsupported case");
    }
  }

  function createResolvePathFn(entityType, objectMap) {
    return function (relativePath, includeVisitedObjects) {
      var annotationTerm = "";
      var annotationType = "";
      return resolveTarget(objectMap, entityType, relativePath, false, includeVisitedObjects, annotationType, annotationTerm);
    };
  }

  function resolveNavigationProperties(entityTypes, associations, objectMap) {
    entityTypes.forEach(function (entityType) {
      entityType.navigationProperties = entityType.navigationProperties.map(function (navProp) {
        var outNavProp = {
          _type: "NavigationProperty",
          name: navProp.name,
          fullyQualifiedName: navProp.fullyQualifiedName,
          partner: navProp.hasOwnProperty("partner") ? navProp.partner : undefined,
          // targetTypeName: FullyQualifiedName;
          // targetType: EntityType;
          isCollection: navProp.hasOwnProperty("isCollection") ? navProp.isCollection : false,
          containsTarget: navProp.hasOwnProperty("containsTarget") ? navProp.containsTarget : false,
          referentialConstraint: navProp.referentialConstraint ? navProp.referentialConstraint : [],
          annotations: {}
        };

        if (navProp.targetTypeName) {
          outNavProp.targetType = objectMap[navProp.targetTypeName];
        } else if (navProp.relationship) {
          var targetAssociation = associations.find(function (association) {
            return association.fullyQualifiedName === navProp.relationship;
          });

          if (targetAssociation) {
            var associationEnd = targetAssociation.associationEnd.find(function (end) {
              return end.role === navProp.toRole;
            });

            if (associationEnd) {
              outNavProp.targetType = objectMap[associationEnd.type];
              outNavProp.isCollection = associationEnd.multiplicity === "*";
            }
          }
        }

        if (outNavProp.targetType) {
          outNavProp.targetTypeName = outNavProp.targetType.fullyQualifiedName;
        }

        var outNavPropReq = outNavProp;
        objectMap[outNavPropReq.fullyQualifiedName] = outNavPropReq;
        return outNavPropReq;
      });
      entityType.resolvePath = createResolvePathFn(entityType, objectMap);
    });
  }

  function linkActionsToEntityType(namespace, actions, objectMap) {
    actions.forEach(function (action) {
      if (!action.annotations) {
        action.annotations = {};
      }

      if (action.isBound) {
        var sourceEntityType = objectMap[action.sourceType];
        action.sourceEntityType = sourceEntityType;

        if (sourceEntityType) {
          if (!sourceEntityType.actions) {
            sourceEntityType.actions = {};
          }

          sourceEntityType.actions[action.name] = action;
          sourceEntityType.actions["".concat(namespace, ".").concat(action.name)] = action;
        }

        action.returnEntityType = objectMap[action.returnType];
      }
    });
  }

  function linkEntityTypeToEntitySet(entitySets, objectMap, references) {
    entitySets.forEach(function (entitySet) {
      entitySet.entityType = objectMap[entitySet.entityTypeName];

      if (!entitySet.entityType) {
        entitySet.entityType = objectMap[unalias(references, entitySet.entityTypeName)];
      }

      if (!entitySet.annotations) {
        entitySet.annotations = {};
      }

      if (!entitySet.entityType.annotations) {
        entitySet.entityType.annotations = {};
      }

      entitySet.entityType.keys.forEach(function (keyProp) {
        keyProp.isKey = true;
      });
    });
  }

  function linkEntityTypeToSingleton(singletons, objectMap, references) {
    singletons.forEach(function (singleton) {
      singleton.type = objectMap[singleton.typeName];

      if (!singleton.type) {
        singleton.type = objectMap[unalias(references, singleton.typeName)];
      }

      if (!singleton.annotations) {
        singleton.annotations = {};
      }

      if (!singleton.type.annotations) {
        singleton.type.annotations = {};
      }

      singleton.type.keys.forEach(function (keyProp) {
        keyProp.isKey = true;
      });
    });
  }

  function linkPropertiesToComplexTypes(entityTypes, objectMap) {
    entityTypes.forEach(function (entityType) {
      entityType.entityProperties.forEach(function (entityProperty) {
        if (!entityProperty.annotations) {
          entityProperty.annotations = {};
        }

        if (entityProperty.type.indexOf("Edm") === -1) {
          if (entityProperty.type.startsWith("Collection")) {
            var complexTypeName = entityProperty.type.substr(11, entityProperty.type.length - 12);
            var complexType = objectMap[complexTypeName];

            if (complexType) {
              entityProperty.targetType = complexType;
            }
          } else {
            var _complexType = objectMap[entityProperty.type];

            if (_complexType) {
              entityProperty.targetType = _complexType;
            }
          }
        }
      });
    });
  }

  function prepareComplexTypes(complexTypes, associations, objectMap) {
    complexTypes.forEach(function (complexType) {
      complexType.annotations = {};
      complexType.properties.forEach(function (property) {
        if (!property.annotations) {
          property.annotations = {};
        }
      });
      complexType.navigationProperties = complexType.navigationProperties.map(function (navProp) {
        if (!navProp.annotations) {
          navProp.annotations = {};
        }

        var outNavProp = {
          _type: "NavigationProperty",
          name: navProp.name,
          fullyQualifiedName: navProp.fullyQualifiedName,
          partner: navProp.hasOwnProperty("partner") ? navProp.partner : undefined,
          // targetTypeName: FullyQualifiedName;
          // targetType: EntityType;
          isCollection: navProp.hasOwnProperty("isCollection") ? navProp.isCollection : false,
          containsTarget: navProp.hasOwnProperty("containsTarget") ? navProp.containsTarget : false,
          referentialConstraint: navProp.referentialConstraint ? navProp.referentialConstraint : []
        };

        if (navProp.targetTypeName) {
          outNavProp.targetType = objectMap[navProp.targetTypeName];
        } else if (navProp.relationship) {
          var targetAssociation = associations.find(function (association) {
            return association.fullyQualifiedName === navProp.relationship;
          });

          if (targetAssociation) {
            var associationEnd = targetAssociation.associationEnd.find(function (end) {
              return end.role === navProp.toRole;
            });

            if (associationEnd) {
              outNavProp.targetType = objectMap[associationEnd.type];
              outNavProp.isCollection = associationEnd.multiplicity === "*";
            }
          }
        }

        if (outNavProp.targetType) {
          outNavProp.targetTypeName = outNavProp.targetType.fullyQualifiedName;
        }

        var outNavPropReq = outNavProp;
        objectMap[outNavPropReq.fullyQualifiedName] = outNavPropReq;
        return outNavPropReq;
      });
    });
  }

  function splitTerm(references, termValue) {
    var aliasedTerm = alias(references, termValue);
    var lastDot = aliasedTerm.lastIndexOf(".");
    var termAlias = aliasedTerm.substr(0, lastDot);
    var term = aliasedTerm.substr(lastDot + 1);
    return [termAlias, term];
  }
  /**
   * Resolve a specific path
   * @param sPath
   */


  function createGlobalResolve(convertedOutput, objectMap) {
    return function resolvePath(sPath) {
      var aPathSplit = sPath.split("/");

      if (aPathSplit.shift() !== "") {
        throw new Error("Cannot deal with relative path");
      }

      var entitySetName = aPathSplit.shift();
      var entitySet = convertedOutput.entitySets.find(function (et) {
        return et.name === entitySetName;
      });

      if (!entitySet) {
        return {
          target: convertedOutput.entityContainer,
          objectPath: [convertedOutput.entityContainer]
        };
      }

      if (aPathSplit.length === 0) {
        return {
          target: entitySet,
          objectPath: [convertedOutput.entityContainer, entitySet]
        };
      } else {
        var targetResolution = resolveTarget(objectMap, entitySet, "/" + aPathSplit.join("/"), false, true);

        if (targetResolution.target) {
          targetResolution.visitedObjects.push(targetResolution.target);
        }

        return {
          target: targetResolution.target,
          objectPath: targetResolution.visitedObjects
        };
      }
    };
  }

  var ANNOTATION_ERRORS = [];
  var ALL_ANNOTATION_ERRORS = {};

  function convertTypes(parserOutput) {
    ANNOTATION_ERRORS = [];
    var objectMap = buildObjectMap(parserOutput);
    resolveNavigationProperties(parserOutput.schema.entityTypes, parserOutput.schema.associations, objectMap);

    if (!parserOutput.schema.entityContainer.annotations) {
      parserOutput.schema.entityContainer.annotations = {};
    }

    linkActionsToEntityType(parserOutput.schema.namespace, parserOutput.schema.actions, objectMap);
    linkEntityTypeToEntitySet(parserOutput.schema.entitySets, objectMap, parserOutput.references);
    linkEntityTypeToSingleton(parserOutput.schema.singletons, objectMap, parserOutput.references);
    linkPropertiesToComplexTypes(parserOutput.schema.entityTypes, objectMap);
    prepareComplexTypes(parserOutput.schema.complexTypes, parserOutput.schema.associations, objectMap);
    var toResolve = [];
    var unresolvedAnnotations = [];
    Object.keys(parserOutput.schema.annotations).forEach(function (annotationSource) {
      parserOutput.schema.annotations[annotationSource].forEach(function (annotationList) {
        var currentTargetName = unalias(parserOutput.references, annotationList.target);
        var currentTarget = objectMap[currentTargetName];

        if (!currentTarget) {
          if (currentTargetName && currentTargetName.indexOf("@") !== -1) {
            annotationList.__source = annotationSource;
            unresolvedAnnotations.push(annotationList);
          }
        } else if (typeof currentTarget === "object") {
          if (!currentTarget.annotations) {
            currentTarget.annotations = {};
          }

          annotationList.annotations.forEach(function (annotation) {
            var _splitTerm = splitTerm(defaultReferences, annotation.term),
                _splitTerm2 = _slicedToArray(_splitTerm, 2),
                vocAlias = _splitTerm2[0],
                vocTerm = _splitTerm2[1];

            if (!currentTarget.annotations[vocAlias]) {
              currentTarget.annotations[vocAlias] = {};
            }

            if (!currentTarget.annotations._annotations) {
              currentTarget.annotations._annotations = {};
            }

            var vocTermWithQualifier = "".concat(vocTerm).concat(annotation.qualifier ? "#".concat(annotation.qualifier) : "");
            currentTarget.annotations[vocAlias][vocTermWithQualifier] = convertAnnotation(annotation, parserOutput, currentTarget, objectMap, toResolve, annotationSource, unresolvedAnnotations);

            switch (typeof currentTarget.annotations[vocAlias][vocTermWithQualifier]) {
              case "string":
                currentTarget.annotations[vocAlias][vocTermWithQualifier] = new String(currentTarget.annotations[vocAlias][vocTermWithQualifier]);
                break;

              case "boolean":
                currentTarget.annotations[vocAlias][vocTermWithQualifier] = new Boolean(currentTarget.annotations[vocAlias][vocTermWithQualifier]);
                break;
            }

            if (currentTarget.annotations[vocAlias][vocTermWithQualifier] !== null && typeof currentTarget.annotations[vocAlias][vocTermWithQualifier] === "object") {
              currentTarget.annotations[vocAlias][vocTermWithQualifier].term = unalias(defaultReferences, "".concat(vocAlias, ".").concat(vocTerm));
              currentTarget.annotations[vocAlias][vocTermWithQualifier].qualifier = annotation.qualifier;
              currentTarget.annotations[vocAlias][vocTermWithQualifier].__source = annotationSource;
            }

            var annotationTarget = "".concat(currentTargetName, "@").concat(unalias(defaultReferences, vocAlias + "." + vocTermWithQualifier));

            if (annotation.annotations && Array.isArray(annotation.annotations)) {
              var subAnnotationList = {
                target: annotationTarget,
                annotations: annotation.annotations,
                __source: annotationSource
              };
              unresolvedAnnotations.push(subAnnotationList);
            } else if (annotation.annotations && !currentTarget.annotations[vocAlias][vocTermWithQualifier].annotations) {
              currentTarget.annotations[vocAlias][vocTermWithQualifier].annotations = annotation.annotations;
            }

            currentTarget.annotations._annotations["".concat(vocAlias, ".").concat(vocTermWithQualifier)] = currentTarget.annotations[vocAlias][vocTermWithQualifier];
            objectMap[annotationTarget] = currentTarget.annotations[vocAlias][vocTermWithQualifier];
          });
        }
      });
    });
    var extraUnresolvedAnnotations = [];
    unresolvedAnnotations.forEach(function (annotationList) {
      var currentTargetName = unalias(parserOutput.references, annotationList.target);

      var _currentTargetName$sp = currentTargetName.split("@"),
          _currentTargetName$sp2 = _slicedToArray(_currentTargetName$sp, 2),
          baseObj = _currentTargetName$sp2[0],
          annotationPart = _currentTargetName$sp2[1];

      var targetSplit = annotationPart.split("/");
      baseObj = baseObj + "@" + targetSplit[0];
      var currentTarget = targetSplit.slice(1).reduce(function (currentObj, path) {
        if (!currentObj) {
          return null;
        }

        return currentObj[path];
      }, objectMap[baseObj]);

      if (!currentTarget) {
        ANNOTATION_ERRORS.push({
          message: "The following annotation target was not found on the service " + currentTargetName
        }); // console.log("Missing target again " + currentTargetName);
      } else if (typeof currentTarget === "object") {
        if (!currentTarget.annotations) {
          currentTarget.annotations = {};
        }

        annotationList.annotations.forEach(function (annotation) {
          var _splitTerm3 = splitTerm(defaultReferences, annotation.term),
              _splitTerm4 = _slicedToArray(_splitTerm3, 2),
              vocAlias = _splitTerm4[0],
              vocTerm = _splitTerm4[1];

          if (!currentTarget.annotations[vocAlias]) {
            currentTarget.annotations[vocAlias] = {};
          }

          if (!currentTarget.annotations._annotations) {
            currentTarget.annotations._annotations = {};
          }

          var vocTermWithQualifier = "".concat(vocTerm).concat(annotation.qualifier ? "#".concat(annotation.qualifier) : "");
          currentTarget.annotations[vocAlias][vocTermWithQualifier] = convertAnnotation(annotation, parserOutput, currentTarget, objectMap, toResolve, annotationList.__source, extraUnresolvedAnnotations);

          if (currentTarget.annotations[vocAlias][vocTermWithQualifier] !== null && typeof currentTarget.annotations[vocAlias][vocTermWithQualifier] === "object") {
            currentTarget.annotations[vocAlias][vocTermWithQualifier].term = unalias(defaultReferences, "".concat(vocAlias, ".").concat(vocTerm));
            currentTarget.annotations[vocAlias][vocTermWithQualifier].qualifier = annotation.qualifier;
            currentTarget.annotations[vocAlias][vocTermWithQualifier].__source = annotationList.__source;
          }

          currentTarget.annotations._annotations["".concat(vocAlias, ".").concat(vocTermWithQualifier)] = currentTarget.annotations[vocAlias][vocTermWithQualifier];
          objectMap["".concat(currentTargetName, "@").concat(unalias(defaultReferences, vocAlias + "." + vocTermWithQualifier))] = currentTarget.annotations[vocAlias][vocTermWithQualifier];
        });
      }
    });
    toResolve.forEach(function (resolveable) {
      var toResolve = resolveable.toResolve;
      var targetStr = toResolve.$target;
      var resolvedTarget = objectMap[targetStr];
      var annotationsTerm = toResolve.annotationsTerm,
          annotationType = toResolve.annotationType;
      delete toResolve.annotationType;
      delete toResolve.annotationsTerm;

      if (resolveable.inline && !(resolvedTarget instanceof String)) {
        // inline the resolved target
        var keys;

        for (keys in toResolve) {
          delete toResolve[keys];
        }

        Object.assign(toResolve, resolvedTarget);
      } else {
        // assign the resolved target
        toResolve.$target = resolvedTarget;
      }

      if (!resolvedTarget) {
        toResolve.targetString = targetStr;

        if (annotationsTerm && annotationType) {
          var oErrorMsg = {
            message: "Unable to resolve the path expression: " + targetStr + "\n" + "\n" + "Hint: Check and correct the path values under the following structure in the metadata (annotation.xml file or CDS annotations for the application): \n\n" + "<Annotation Term = " + annotationsTerm + ">" + "\n" + "<Record Type = " + annotationType + ">" + "\n" + "<AnnotationPath = " + targetStr + ">"
          };
          addAnnotationErrorMessage(targetStr, oErrorMsg);
        } else {
          var _property = toResolve.term;
          var path = toResolve.path;
          var termInfo = targetStr ? targetStr.split("/")[0] : targetStr;
          var _oErrorMsg = {
            message: "Unable to resolve the path expression: " + targetStr + "\n" + "\n" + "Hint: Check and correct the path values under the following structure in the metadata (annotation.xml file or CDS annotations for the application): \n\n" + "<Annotation Term = " + termInfo + ">" + "\n" + "<PropertyValue Property = " + _property + "        Path= " + path + ">"
          };
          addAnnotationErrorMessage(targetStr, _oErrorMsg);
        }
      }
    });

    for (var property in ALL_ANNOTATION_ERRORS) {
      ANNOTATION_ERRORS.push(ALL_ANNOTATION_ERRORS[property][0]);
    }

    parserOutput.entitySets = parserOutput.schema.entitySets;
    var convertedOutput = {
      version: parserOutput.version,
      annotations: parserOutput.schema.annotations,
      namespace: parserOutput.schema.namespace,
      entityContainer: parserOutput.schema.entityContainer,
      actions: parserOutput.schema.actions,
      entitySets: parserOutput.schema.entitySets,
      singletons: parserOutput.schema.singletons,
      entityTypes: parserOutput.schema.entityTypes,
      complexTypes: parserOutput.schema.complexTypes,
      references: defaultReferences,
      diagnostics: ANNOTATION_ERRORS.concat()
    };
    convertedOutput.resolvePath = createGlobalResolve(convertedOutput, objectMap);
    return convertedOutput;
  }

  _exports.convertTypes = convertTypes;

  function revertValueToGenericType(references, value) {
    var result;

    if (typeof value === "string") {
      var valueMatches = value.match(/(\w+)\.\w+\/.*/);

      if (valueMatches && references.find(function (ref) {
        return ref.alias === valueMatches[1];
      })) {
        result = {
          type: "EnumMember",
          EnumMember: value
        };
      } else {
        result = {
          type: "String",
          String: value
        };
      }
    } else if (Array.isArray(value)) {
      result = {
        type: "Collection",
        Collection: value.map(function (anno) {
          return revertCollectionItemToGenericType(references, anno);
        })
      };
    } else if (typeof value === "boolean") {
      result = {
        type: "Bool",
        Bool: value
      };
    } else if (typeof value === "number") {
      if (value.toString() === value.toFixed()) {
        result = {
          type: "Int",
          Int: value
        };
      } else {
        result = {
          type: "Decimal",
          Decimal: value
        };
      }
    } else if (typeof value === "object" && value.isDecimal && value.isDecimal()) {
      result = {
        type: "Decimal",
        Decimal: value.valueOf()
      };
    } else if (value.type === "Path") {
      result = {
        type: "Path",
        Path: value.path
      };
    } else if (value.type === "AnnotationPath") {
      result = {
        type: "AnnotationPath",
        AnnotationPath: value.value
      };
    } else if (value.type === "PropertyPath") {
      result = {
        type: "PropertyPath",
        PropertyPath: value.value
      };
    } else if (value.type === "NavigationPropertyPath") {
      result = {
        type: "NavigationPropertyPath",
        NavigationPropertyPath: value.value
      };
    } else if (Object.prototype.hasOwnProperty.call(value, "$Type")) {
      result = {
        type: "Record",
        Record: revertCollectionItemToGenericType(references, value)
      };
    }

    return result;
  }

  function revertCollectionItemToGenericType(references, collectionItem) {
    if (typeof collectionItem === "string") {
      return collectionItem;
    } else if (typeof collectionItem === "object") {
      if (collectionItem.hasOwnProperty("$Type")) {
        // Annotation Record
        var outItem = {
          type: collectionItem.$Type,
          propertyValues: []
        }; // Could validate keys and type based on $Type

        Object.keys(collectionItem).forEach(function (collectionKey) {
          if (collectionKey !== "$Type" && collectionKey !== "term" && collectionKey !== "__source" && collectionKey !== "qualifier" && collectionKey !== "ActionTarget" && collectionKey !== "fullyQualifiedName" && collectionKey !== "annotations") {
            var value = collectionItem[collectionKey];
            outItem.propertyValues.push({
              name: collectionKey,
              value: revertValueToGenericType(references, value)
            });
          } else if (collectionKey === "annotations") {
            var annotations = collectionItem[collectionKey];
            outItem.annotations = [];
            Object.keys(annotations).filter(function (key) {
              return key !== "_annotations";
            }).forEach(function (key) {
              Object.keys(annotations[key]).forEach(function (term) {
                var _outItem$annotations;

                var parsedAnnotation = revertTermToGenericType(references, annotations[key][term]);

                if (!parsedAnnotation.term) {
                  var unaliasedTerm = unalias(references, "".concat(key, ".").concat(term));

                  if (unaliasedTerm) {
                    var qualifiedSplit = unaliasedTerm.split("#");
                    parsedAnnotation.term = qualifiedSplit[0];

                    if (qualifiedSplit.length > 1) {
                      parsedAnnotation.qualifier = qualifiedSplit[1];
                    }
                  }
                }

                (_outItem$annotations = outItem.annotations) === null || _outItem$annotations === void 0 ? void 0 : _outItem$annotations.push(parsedAnnotation);
              });
            });
          }
        });
        return outItem;
      } else if (collectionItem.type === "PropertyPath") {
        return {
          type: "PropertyPath",
          PropertyPath: collectionItem.value
        };
      } else if (collectionItem.type === "AnnotationPath") {
        return {
          type: "AnnotationPath",
          AnnotationPath: collectionItem.value
        };
      } else if (collectionItem.type === "NavigationPropertyPath") {
        return {
          type: "NavigationPropertyPath",
          NavigationPropertyPath: collectionItem.value
        };
      }
    }
  }

  function revertTermToGenericType(references, annotation) {
    var baseAnnotation = {
      term: annotation.term,
      qualifier: annotation.qualifier
    };

    if (Array.isArray(annotation)) {
      // Collection
      if (annotation.hasOwnProperty("annotations")) {
        baseAnnotation.annotations = [];
        var currentAnnotations = annotation.annotations;
        Object.keys(currentAnnotations).filter(function (key) {
          return key !== "_annotations";
        }).forEach(function (key) {
          Object.keys(currentAnnotations[key]).forEach(function (term) {
            var _baseAnnotation$annot;

            var parsedAnnotation = revertTermToGenericType(references, currentAnnotations[key][term]);

            if (!parsedAnnotation.term) {
              var unaliasedTerm = unalias(references, "".concat(key, ".").concat(term));

              if (unaliasedTerm) {
                var qualifiedSplit = unaliasedTerm.split("#");
                parsedAnnotation.term = qualifiedSplit[0];

                if (qualifiedSplit.length > 1) {
                  parsedAnnotation.qualifier = qualifiedSplit[1];
                }
              }
            }

            (_baseAnnotation$annot = baseAnnotation.annotations) === null || _baseAnnotation$annot === void 0 ? void 0 : _baseAnnotation$annot.push(parsedAnnotation);
          });
        });
      }

      return _objectSpread(_objectSpread({}, baseAnnotation), {}, {
        collection: annotation.map(function (anno) {
          return revertCollectionItemToGenericType(references, anno);
        })
      });
    } else if (annotation.hasOwnProperty("$Type")) {
      return _objectSpread(_objectSpread({}, baseAnnotation), {}, {
        record: revertCollectionItemToGenericType(references, annotation)
      });
    } else {
      return _objectSpread(_objectSpread({}, baseAnnotation), {}, {
        value: revertValueToGenericType(references, annotation)
      });
    }
  }

  _exports.revertTermToGenericType = revertTermToGenericType;
  return _exports;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9zYXAvZmUvY29yZS9jb252ZXJ0ZXJzL2NvbW1vbi9Bbm5vdGF0aW9uQ29udmVydGVyLnRzIl0sIm5hbWVzIjpbIlBhdGgiLCJwYXRoRXhwcmVzc2lvbiIsInRhcmdldE5hbWUiLCJhbm5vdGF0aW9uc1Rlcm0iLCJhbm5vdGF0aW9uVHlwZSIsInRlcm0iLCJwYXRoIiwidHlwZSIsIiR0YXJnZXQiLCJUZXJtVG9UeXBlcyIsImRlZmF1bHRSZWZlcmVuY2VzIiwiYWxpYXMiLCJuYW1lc3BhY2UiLCJ1cmkiLCJyZWZlcmVuY2VzIiwidW5hbGlhc2VkVmFsdWUiLCJyZXZlcnNlUmVmZXJlbmNlTWFwIiwicmVkdWNlIiwibWFwIiwicmVmZXJlbmNlIiwibGFzdERvdEluZGV4IiwibGFzdEluZGV4T2YiLCJzdWJzdHIiLCJ2YWx1ZSIsImluZGV4T2YiLCJzcGxpdCIsInByZUFsaWFzIiwicG9zdEFsaWFzIiwiam9pbiIsInVuYWxpYXMiLCJhbGlhc2VkVmFsdWUiLCJyZWZlcmVuY2VNYXAiLCJidWlsZE9iamVjdE1hcCIsInBhcnNlck91dHB1dCIsIm9iamVjdE1hcCIsInNjaGVtYSIsImVudGl0eUNvbnRhaW5lciIsImZ1bGx5UXVhbGlmaWVkTmFtZSIsImVudGl0eVNldHMiLCJmb3JFYWNoIiwiZW50aXR5U2V0IiwiYWN0aW9ucyIsImFjdGlvbiIsInBhcmFtZXRlcnMiLCJwYXJhbWV0ZXIiLCJjb21wbGV4VHlwZXMiLCJjb21wbGV4VHlwZSIsInByb3BlcnRpZXMiLCJwcm9wZXJ0eSIsImVudGl0eVR5cGVzIiwiZW50aXR5VHlwZSIsImVudGl0eVByb3BlcnRpZXMiLCJjb21wbGV4VHlwZURlZmluaXRpb24iLCJjb21wbGV4VHlwZVByb3AiLCJjb21wbGV4VHlwZVByb3BUYXJnZXQiLCJPYmplY3QiLCJhc3NpZ24iLCJfdHlwZSIsIm5hbWUiLCJuYXZpZ2F0aW9uUHJvcGVydGllcyIsIm5hdlByb3BlcnR5Iiwia2V5cyIsImFubm90YXRpb25zIiwiYW5ub3RhdGlvblNvdXJjZSIsImFubm90YXRpb25MaXN0IiwiY3VycmVudFRhcmdldE5hbWUiLCJ0YXJnZXQiLCJhbm5vdGF0aW9uIiwiYW5ub3RhdGlvbkZRTiIsInF1YWxpZmllciIsImNvbWJpbmVQYXRoIiwiY3VycmVudFRhcmdldCIsInN0YXJ0c1dpdGgiLCJhZGRBbm5vdGF0aW9uRXJyb3JNZXNzYWdlIiwib0Vycm9yTXNnIiwiQUxMX0FOTk9UQVRJT05fRVJST1JTIiwicHVzaCIsInJlc29sdmVUYXJnZXQiLCJwYXRoT25seSIsImluY2x1ZGVWaXNpdGVkT2JqZWN0cyIsInVuZGVmaW5lZCIsImFWaXNpdGVkT2JqZWN0cyIsInBhdGhTcGxpdCIsInRhcmdldFBhdGhTcGxpdCIsInBhdGhQYXJ0IiwiYW5ub3RhdGlvblBhdGgiLCJjdXJyZW50UGF0aCIsImN1cnJlbnRDb250ZXh0IiwiY3VycmVudFZhbHVlIiwibGVuZ3RoIiwidGFyZ2V0VHlwZSIsImVudGl0eVR5cGVOYW1lIiwidGFyZ2V0VHlwZU5hbWUiLCJpc0JvdW5kIiwic291cmNlVHlwZSIsImlzRW50aXR5U2V0IiwibGFzdElkeCIsInN1YlRhcmdldCIsInZpc2l0ZWRPYmplY3RzIiwidmlzaXRlZFN1Yk9iamVjdCIsImNvbmNhdCIsInJldmVyc2UiLCJmaW5kIiwib2JqIiwiaW50ZXJtZWRpYXRlVGFyZ2V0IiwiaGFzT3duUHJvcGVydHkiLCJtZXNzYWdlIiwiaXNBbm5vdGF0aW9uUGF0aCIsInBhdGhTdHIiLCJwYXJzZVZhbHVlIiwicHJvcGVydHlWYWx1ZSIsInZhbHVlRlFOIiwidG9SZXNvbHZlIiwidW5yZXNvbHZlZEFubm90YXRpb25zIiwiU3RyaW5nIiwiSW50IiwiQm9vbCIsIkRlY2ltYWwiLCJEYXRlIiwiRW51bU1lbWJlciIsIlByb3BlcnR5UGF0aCIsIk5hdmlnYXRpb25Qcm9wZXJ0eVBhdGgiLCJhbm5vdGF0aW9uVGFyZ2V0IiwiQW5ub3RhdGlvblBhdGgiLCJpbmxpbmUiLCJwYXJzZVJlY29yZCIsIlJlY29yZCIsInBhcnNlQ29sbGVjdGlvbiIsIkNvbGxlY3Rpb24iLCJpbmZlclR5cGVGcm9tVGVybSIsImlzRXJyb3IiLCJyZWNvcmREZWZpbml0aW9uIiwiY3VycmVudEZRTiIsImFubm90YXRpb25UZXJtIiwiJFR5cGUiLCJhbm5vdGF0aW9uQ29udGVudCIsIkFycmF5IiwiaXNBcnJheSIsInN1YkFubm90YXRpb25MaXN0IiwiX19zb3VyY2UiLCJwcm9wZXJ0eVZhbHVlcyIsIkFjdGlvblRhcmdldCIsIkFjdGlvbiIsIkFOTk9UQVRJT05fRVJST1JTIiwiZ2V0T3JJbmZlckNvbGxlY3Rpb25UeXBlIiwiY29sbGVjdGlvbkRlZmluaXRpb24iLCJmaXJzdENvbEl0ZW0iLCJwYXJlbnRGUU4iLCJjb2xsZWN0aW9uRGVmaW5pdGlvblR5cGUiLCJwcm9wZXJ0eVBhdGgiLCJwcm9wZXJ0eUlkeCIsInBhdGhWYWx1ZSIsImFubm90YXRpb25JZHgiLCJhbm5vdGF0aW9uQ29sbGVjdGlvbkVsZW1lbnQiLCJuYXZQcm9wZXJ0eVBhdGgiLCJuYXZQcm9wSWR4IiwicmVjb3JkSWR4IiwiaWZWYWx1ZSIsInN0cmluZ1ZhbHVlIiwiRXJyb3IiLCJjb252ZXJ0QW5ub3RhdGlvbiIsInJlY29yZCIsImNvbGxlY3Rpb24iLCJjcmVhdGVSZXNvbHZlUGF0aEZuIiwicmVsYXRpdmVQYXRoIiwicmVzb2x2ZU5hdmlnYXRpb25Qcm9wZXJ0aWVzIiwiYXNzb2NpYXRpb25zIiwibmF2UHJvcCIsIm91dE5hdlByb3AiLCJwYXJ0bmVyIiwiaXNDb2xsZWN0aW9uIiwiY29udGFpbnNUYXJnZXQiLCJyZWZlcmVudGlhbENvbnN0cmFpbnQiLCJyZWxhdGlvbnNoaXAiLCJ0YXJnZXRBc3NvY2lhdGlvbiIsImFzc29jaWF0aW9uIiwiYXNzb2NpYXRpb25FbmQiLCJlbmQiLCJyb2xlIiwidG9Sb2xlIiwibXVsdGlwbGljaXR5Iiwib3V0TmF2UHJvcFJlcSIsInJlc29sdmVQYXRoIiwibGlua0FjdGlvbnNUb0VudGl0eVR5cGUiLCJzb3VyY2VFbnRpdHlUeXBlIiwicmV0dXJuRW50aXR5VHlwZSIsInJldHVyblR5cGUiLCJsaW5rRW50aXR5VHlwZVRvRW50aXR5U2V0Iiwia2V5UHJvcCIsImlzS2V5IiwibGlua0VudGl0eVR5cGVUb1NpbmdsZXRvbiIsInNpbmdsZXRvbnMiLCJzaW5nbGV0b24iLCJ0eXBlTmFtZSIsImxpbmtQcm9wZXJ0aWVzVG9Db21wbGV4VHlwZXMiLCJlbnRpdHlQcm9wZXJ0eSIsImNvbXBsZXhUeXBlTmFtZSIsInByZXBhcmVDb21wbGV4VHlwZXMiLCJzcGxpdFRlcm0iLCJ0ZXJtVmFsdWUiLCJhbGlhc2VkVGVybSIsImxhc3REb3QiLCJ0ZXJtQWxpYXMiLCJjcmVhdGVHbG9iYWxSZXNvbHZlIiwiY29udmVydGVkT3V0cHV0Iiwic1BhdGgiLCJhUGF0aFNwbGl0Iiwic2hpZnQiLCJlbnRpdHlTZXROYW1lIiwiZXQiLCJvYmplY3RQYXRoIiwidGFyZ2V0UmVzb2x1dGlvbiIsImNvbnZlcnRUeXBlcyIsInZvY0FsaWFzIiwidm9jVGVybSIsIl9hbm5vdGF0aW9ucyIsInZvY1Rlcm1XaXRoUXVhbGlmaWVyIiwiQm9vbGVhbiIsImV4dHJhVW5yZXNvbHZlZEFubm90YXRpb25zIiwiYmFzZU9iaiIsImFubm90YXRpb25QYXJ0IiwidGFyZ2V0U3BsaXQiLCJzbGljZSIsImN1cnJlbnRPYmoiLCJyZXNvbHZlYWJsZSIsInRhcmdldFN0ciIsInJlc29sdmVkVGFyZ2V0IiwidGFyZ2V0U3RyaW5nIiwidGVybUluZm8iLCJ2ZXJzaW9uIiwiZGlhZ25vc3RpY3MiLCJyZXZlcnRWYWx1ZVRvR2VuZXJpY1R5cGUiLCJyZXN1bHQiLCJ2YWx1ZU1hdGNoZXMiLCJtYXRjaCIsInJlZiIsImFubm8iLCJyZXZlcnRDb2xsZWN0aW9uSXRlbVRvR2VuZXJpY1R5cGUiLCJ0b1N0cmluZyIsInRvRml4ZWQiLCJpc0RlY2ltYWwiLCJ2YWx1ZU9mIiwicHJvdG90eXBlIiwiY2FsbCIsImNvbGxlY3Rpb25JdGVtIiwib3V0SXRlbSIsImNvbGxlY3Rpb25LZXkiLCJmaWx0ZXIiLCJrZXkiLCJwYXJzZWRBbm5vdGF0aW9uIiwicmV2ZXJ0VGVybVRvR2VuZXJpY1R5cGUiLCJ1bmFsaWFzZWRUZXJtIiwicXVhbGlmaWVkU3BsaXQiLCJiYXNlQW5ub3RhdGlvbiIsImN1cnJlbnRBbm5vdGF0aW9ucyJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O01Bc0NNQSxJLEdBUUwsY0FDQ0MsY0FERCxFQUVDQyxVQUZELEVBR0NDLGVBSEQsRUFJQ0MsY0FKRCxFQUtDQyxJQUxELEVBTUU7QUFBQTs7QUFDRCxTQUFLQyxJQUFMLEdBQVlMLGNBQWMsQ0FBQ0QsSUFBM0I7QUFDQSxTQUFLTyxJQUFMLEdBQVksTUFBWjtBQUNBLFNBQUtDLE9BQUwsR0FBZU4sVUFBZjtBQUNDLFNBQUtHLElBQUwsR0FBWUEsSUFBYixFQUFxQixLQUFLRCxjQUFMLEdBQXNCQSxjQUEzQyxFQUE2RCxLQUFLRCxlQUFMLEdBQXVCQSxlQUFwRjtBQUNBLEc7O01BR0dNLFc7O2FBQUFBLFc7QUFBQUEsSUFBQUEsVztBQUFBQSxJQUFBQSxXO0FBQUFBLElBQUFBLFc7QUFBQUEsSUFBQUEsVztBQUFBQSxJQUFBQSxXO0FBQUFBLElBQUFBLFc7QUFBQUEsSUFBQUEsVztBQUFBQSxJQUFBQSxXO0FBQUFBLElBQUFBLFc7QUFBQUEsSUFBQUEsVztBQUFBQSxJQUFBQSxXO0FBQUFBLElBQUFBLFc7QUFBQUEsSUFBQUEsVztBQUFBQSxJQUFBQSxXO0FBQUFBLElBQUFBLFc7QUFBQUEsSUFBQUEsVztBQUFBQSxJQUFBQSxXO0FBQUFBLElBQUFBLFc7QUFBQUEsSUFBQUEsVztBQUFBQSxJQUFBQSxXO0FBQUFBLElBQUFBLFc7QUFBQUEsSUFBQUEsVztBQUFBQSxJQUFBQSxXO0FBQUFBLElBQUFBLFc7QUFBQUEsSUFBQUEsVztBQUFBQSxJQUFBQSxXO0FBQUFBLElBQUFBLFc7QUFBQUEsSUFBQUEsVztBQUFBQSxJQUFBQSxXO0FBQUFBLElBQUFBLFc7QUFBQUEsSUFBQUEsVztBQUFBQSxJQUFBQSxXO0FBQUFBLElBQUFBLFc7QUFBQUEsSUFBQUEsVztBQUFBQSxJQUFBQSxXO0FBQUFBLElBQUFBLFc7QUFBQUEsSUFBQUEsVztBQUFBQSxJQUFBQSxXO0FBQUFBLElBQUFBLFc7QUFBQUEsSUFBQUEsVztBQUFBQSxJQUFBQSxXO0FBQUFBLElBQUFBLFc7QUFBQUEsSUFBQUEsVztBQUFBQSxJQUFBQSxXO0FBQUFBLElBQUFBLFc7QUFBQUEsSUFBQUEsVztBQUFBQSxJQUFBQSxXO0FBQUFBLElBQUFBLFc7QUFBQUEsSUFBQUEsVztBQUFBQSxJQUFBQSxXO0FBQUFBLElBQUFBLFc7QUFBQUEsSUFBQUEsVztBQUFBQSxJQUFBQSxXO0FBQUFBLElBQUFBLFc7QUFBQUEsSUFBQUEsVztBQUFBQSxJQUFBQSxXO0FBQUFBLElBQUFBLFc7QUFBQUEsSUFBQUEsVztBQUFBQSxJQUFBQSxXO0FBQUFBLElBQUFBLFc7QUFBQUEsSUFBQUEsVztBQUFBQSxJQUFBQSxXO0FBQUFBLElBQUFBLFc7QUFBQUEsSUFBQUEsVztBQUFBQSxJQUFBQSxXO0FBQUFBLElBQUFBLFc7QUFBQUEsSUFBQUEsVztBQUFBQSxJQUFBQSxXO0FBQUFBLElBQUFBLFc7QUFBQUEsSUFBQUEsVztBQUFBQSxJQUFBQSxXO0FBQUFBLElBQUFBLFc7QUFBQUEsSUFBQUEsVztBQUFBQSxJQUFBQSxXO0FBQUFBLElBQUFBLFc7QUFBQUEsSUFBQUEsVztBQUFBQSxJQUFBQSxXO0FBQUFBLElBQUFBLFc7QUFBQUEsSUFBQUEsVztBQUFBQSxJQUFBQSxXO0FBQUFBLElBQUFBLFc7QUFBQUEsSUFBQUEsVztBQUFBQSxJQUFBQSxXO0FBQUFBLElBQUFBLFc7QUFBQUEsSUFBQUEsVztBQUFBQSxJQUFBQSxXO0FBQUFBLElBQUFBLFc7QUFBQUEsSUFBQUEsVztBQUFBQSxJQUFBQSxXO0FBQUFBLElBQUFBLFc7QUFBQUEsSUFBQUEsVztBQUFBQSxJQUFBQSxXO0FBQUFBLElBQUFBLFc7QUFBQUEsSUFBQUEsVztBQUFBQSxJQUFBQSxXO0FBQUFBLElBQUFBLFc7QUFBQUEsSUFBQUEsVztBQUFBQSxJQUFBQSxXO0FBQUFBLElBQUFBLFc7QUFBQUEsSUFBQUEsVztBQUFBQSxJQUFBQSxXO0FBQUFBLElBQUFBLFc7QUFBQUEsSUFBQUEsVztBQUFBQSxJQUFBQSxXO0FBQUFBLElBQUFBLFc7QUFBQUEsSUFBQUEsVztBQUFBQSxJQUFBQSxXO0FBQUFBLElBQUFBLFc7QUFBQUEsSUFBQUEsVztBQUFBQSxJQUFBQSxXO0FBQUFBLElBQUFBLFc7QUFBQUEsSUFBQUEsVztBQUFBQSxJQUFBQSxXO0FBQUFBLElBQUFBLFc7QUFBQUEsSUFBQUEsVztBQUFBQSxJQUFBQSxXO0FBQUFBLElBQUFBLFc7QUFBQUEsSUFBQUEsVztBQUFBQSxJQUFBQSxXO0FBQUFBLElBQUFBLFc7QUFBQUEsSUFBQUEsVztBQUFBQSxJQUFBQSxXO0FBQUFBLElBQUFBLFc7QUFBQUEsSUFBQUEsVztBQUFBQSxJQUFBQSxXO0FBQUFBLElBQUFBLFc7QUFBQUEsSUFBQUEsVztBQUFBQSxJQUFBQSxXO0FBQUFBLElBQUFBLFc7QUFBQUEsSUFBQUEsVztBQUFBQSxJQUFBQSxXO0FBQUFBLElBQUFBLFc7QUFBQUEsSUFBQUEsVztBQUFBQSxJQUFBQSxXO0FBQUFBLElBQUFBLFc7QUFBQUEsSUFBQUEsVztBQUFBQSxJQUFBQSxXO0FBQUFBLElBQUFBLFc7QUFBQUEsSUFBQUEsVztBQUFBQSxJQUFBQSxXO0FBQUFBLElBQUFBLFc7QUFBQUEsSUFBQUEsVztBQUFBQSxJQUFBQSxXO0FBQUFBLElBQUFBLFc7QUFBQUEsSUFBQUEsVztBQUFBQSxJQUFBQSxXO0FBQUFBLElBQUFBLFc7QUFBQUEsSUFBQUEsVztBQUFBQSxJQUFBQSxXO0FBQUFBLElBQUFBLFc7QUFBQUEsSUFBQUEsVztBQUFBQSxJQUFBQSxXO0FBQUFBLElBQUFBLFc7QUFBQUEsSUFBQUEsVztBQUFBQSxJQUFBQSxXO0FBQUFBLElBQUFBLFc7QUFBQUEsSUFBQUEsVztBQUFBQSxJQUFBQSxXO0FBQUFBLElBQUFBLFc7QUFBQUEsSUFBQUEsVztBQUFBQSxJQUFBQSxXO0FBQUFBLElBQUFBLFc7QUFBQUEsSUFBQUEsVztBQUFBQSxJQUFBQSxXO0FBQUFBLElBQUFBLFc7QUFBQUEsSUFBQUEsVztBQUFBQSxJQUFBQSxXO0FBQUFBLElBQUFBLFc7QUFBQUEsSUFBQUEsVztBQUFBQSxJQUFBQSxXO0FBQUFBLElBQUFBLFc7QUFBQUEsSUFBQUEsVztBQUFBQSxJQUFBQSxXO0FBQUFBLElBQUFBLFc7QUFBQUEsSUFBQUEsVztBQUFBQSxJQUFBQSxXO0FBQUFBLElBQUFBLFc7QUFBQUEsSUFBQUEsVztBQUFBQSxJQUFBQSxXO0FBQUFBLElBQUFBLFc7QUFBQUEsSUFBQUEsVztBQUFBQSxJQUFBQSxXO0FBQUFBLElBQUFBLFc7QUFBQUEsSUFBQUEsVztBQUFBQSxJQUFBQSxXO0FBQUFBLElBQUFBLFc7QUFBQUEsSUFBQUEsVztBQUFBQSxJQUFBQSxXO0FBQUFBLElBQUFBLFc7QUFBQUEsSUFBQUEsVztBQUFBQSxJQUFBQSxXO0FBQUFBLElBQUFBLFc7QUFBQUEsSUFBQUEsVztBQUFBQSxJQUFBQSxXO0FBQUFBLElBQUFBLFc7QUFBQUEsSUFBQUEsVztBQUFBQSxJQUFBQSxXO0FBQUFBLElBQUFBLFc7QUFBQUEsSUFBQUEsVztBQUFBQSxJQUFBQSxXO0FBQUFBLElBQUFBLFc7QUFBQUEsSUFBQUEsVztBQUFBQSxJQUFBQSxXO0FBQUFBLElBQUFBLFc7QUFBQUEsSUFBQUEsVztBQUFBQSxJQUFBQSxXO0FBQUFBLElBQUFBLFc7QUFBQUEsSUFBQUEsVztBQUFBQSxJQUFBQSxXO0FBQUFBLElBQUFBLFc7QUFBQUEsSUFBQUEsVztBQUFBQSxJQUFBQSxXO0FBQUFBLElBQUFBLFc7QUFBQUEsSUFBQUEsVztBQUFBQSxJQUFBQSxXO0FBQUFBLElBQUFBLFc7QUFBQUEsSUFBQUEsVztBQUFBQSxJQUFBQSxXO0FBQUFBLElBQUFBLFc7QUFBQUEsSUFBQUEsVztBQUFBQSxJQUFBQSxXO0FBQUFBLElBQUFBLFc7QUFBQUEsSUFBQUEsVztBQUFBQSxJQUFBQSxXO0FBQUFBLElBQUFBLFc7QUFBQUEsSUFBQUEsVztBQUFBQSxJQUFBQSxXO0FBQUFBLElBQUFBLFc7QUFBQUEsSUFBQUEsVztBQUFBQSxJQUFBQSxXO0FBQUFBLElBQUFBLFc7QUFBQUEsSUFBQUEsVztBQUFBQSxJQUFBQSxXO0FBQUFBLElBQUFBLFc7QUFBQUEsSUFBQUEsVztBQUFBQSxJQUFBQSxXO0FBQUFBLElBQUFBLFc7QUFBQUEsSUFBQUEsVztBQUFBQSxJQUFBQSxXO0tBQUFBLFcsS0FBQUEsVzs7QUFrUEUsTUFBTUMsaUJBQW9DLEdBQUcsQ0FDbkQ7QUFBRUMsSUFBQUEsS0FBSyxFQUFFLGNBQVQ7QUFBeUJDLElBQUFBLFNBQVMsRUFBRSwyQkFBcEM7QUFBaUVDLElBQUFBLEdBQUcsRUFBRTtBQUF0RSxHQURtRCxFQUVuRDtBQUFFRixJQUFBQSxLQUFLLEVBQUUsYUFBVDtBQUF3QkMsSUFBQUEsU0FBUyxFQUFFLDBCQUFuQztBQUErREMsSUFBQUEsR0FBRyxFQUFFO0FBQXBFLEdBRm1ELEVBR25EO0FBQUVGLElBQUFBLEtBQUssRUFBRSxZQUFUO0FBQXVCQyxJQUFBQSxTQUFTLEVBQUUseUJBQWxDO0FBQTZEQyxJQUFBQSxHQUFHLEVBQUU7QUFBbEUsR0FIbUQsRUFJbkQ7QUFBRUQsSUFBQUEsU0FBUyxFQUFFLG1CQUFiO0FBQWtDRCxJQUFBQSxLQUFLLEVBQUUsTUFBekM7QUFBaURFLElBQUFBLEdBQUcsRUFBRTtBQUF0RCxHQUptRCxFQUtuRDtBQUFFRCxJQUFBQSxTQUFTLEVBQUUsdUJBQWI7QUFBc0NELElBQUFBLEtBQUssRUFBRSxVQUE3QztBQUF5REUsSUFBQUEsR0FBRyxFQUFFO0FBQTlELEdBTG1ELEVBTW5EO0FBQUVELElBQUFBLFNBQVMsRUFBRSxnQ0FBYjtBQUErQ0QsSUFBQUEsS0FBSyxFQUFFLFFBQXREO0FBQWdFRSxJQUFBQSxHQUFHLEVBQUU7QUFBckUsR0FObUQsRUFPbkQ7QUFBRUQsSUFBQUEsU0FBUyxFQUFFLDRCQUFiO0FBQTJDRCxJQUFBQSxLQUFLLEVBQUUsSUFBbEQ7QUFBd0RFLElBQUFBLEdBQUcsRUFBRTtBQUE3RCxHQVBtRCxFQVFuRDtBQUFFRCxJQUFBQSxTQUFTLEVBQUUsaUNBQWI7QUFBZ0RELElBQUFBLEtBQUssRUFBRSxTQUF2RDtBQUFrRUUsSUFBQUEsR0FBRyxFQUFFO0FBQXZFLEdBUm1ELEVBU25EO0FBQUVELElBQUFBLFNBQVMsRUFBRSxtQ0FBYjtBQUFrREQsSUFBQUEsS0FBSyxFQUFFLFdBQXpEO0FBQXNFRSxJQUFBQSxHQUFHLEVBQUU7QUFBM0UsR0FUbUQsRUFVbkQ7QUFBRUQsSUFBQUEsU0FBUyxFQUFFLGtDQUFiO0FBQWlERCxJQUFBQSxLQUFLLEVBQUUsVUFBeEQ7QUFBb0VFLElBQUFBLEdBQUcsRUFBRTtBQUF6RSxHQVZtRCxFQVduRDtBQUFFRCxJQUFBQSxTQUFTLEVBQUUsc0NBQWI7QUFBcURELElBQUFBLEtBQUssRUFBRSxjQUE1RDtBQUE0RUUsSUFBQUEsR0FBRyxFQUFFO0FBQWpGLEdBWG1ELEVBWW5EO0FBQUVELElBQUFBLFNBQVMsRUFBRSx1Q0FBYjtBQUFzREQsSUFBQUEsS0FBSyxFQUFFLGVBQTdEO0FBQThFRSxJQUFBQSxHQUFHLEVBQUU7QUFBbkYsR0FabUQsRUFhbkQ7QUFBRUQsSUFBQUEsU0FBUyxFQUFFLCtCQUFiO0FBQThDRCxJQUFBQSxLQUFLLEVBQUUsT0FBckQ7QUFBOERFLElBQUFBLEdBQUcsRUFBRTtBQUFuRSxHQWJtRCxDQUE3Qzs7O0FBcUJQLFdBQVNGLEtBQVQsQ0FBZUcsVUFBZixFQUE4Q0MsY0FBOUMsRUFBOEU7QUFDN0UsUUFBSSxDQUFDRCxVQUFVLENBQUNFLG1CQUFoQixFQUFxQztBQUNwQ0YsTUFBQUEsVUFBVSxDQUFDRSxtQkFBWCxHQUFpQ0YsVUFBVSxDQUFDRyxNQUFYLENBQWtCLFVBQUNDLEdBQUQsRUFBaUNDLFNBQWpDLEVBQStDO0FBQ2pHRCxRQUFBQSxHQUFHLENBQUNDLFNBQVMsQ0FBQ1AsU0FBWCxDQUFILEdBQTJCTyxTQUEzQjtBQUNBLGVBQU9ELEdBQVA7QUFDQSxPQUhnQyxFQUc5QixFQUg4QixDQUFqQztBQUlBOztBQUNELFFBQUksQ0FBQ0gsY0FBTCxFQUFxQjtBQUNwQixhQUFPQSxjQUFQO0FBQ0E7O0FBQ0QsUUFBTUssWUFBWSxHQUFHTCxjQUFjLENBQUNNLFdBQWYsQ0FBMkIsR0FBM0IsQ0FBckI7QUFDQSxRQUFNVCxTQUFTLEdBQUdHLGNBQWMsQ0FBQ08sTUFBZixDQUFzQixDQUF0QixFQUF5QkYsWUFBekIsQ0FBbEI7QUFDQSxRQUFNRyxLQUFLLEdBQUdSLGNBQWMsQ0FBQ08sTUFBZixDQUFzQkYsWUFBWSxHQUFHLENBQXJDLENBQWQ7QUFDQSxRQUFNRCxTQUFTLEdBQUdMLFVBQVUsQ0FBQ0UsbUJBQVgsQ0FBK0JKLFNBQS9CLENBQWxCOztBQUNBLFFBQUlPLFNBQUosRUFBZTtBQUNkLHVCQUFVQSxTQUFTLENBQUNSLEtBQXBCLGNBQTZCWSxLQUE3QjtBQUNBLEtBRkQsTUFFTztBQUNOO0FBQ0EsVUFBSVIsY0FBYyxDQUFDUyxPQUFmLENBQXVCLEdBQXZCLE1BQWdDLENBQUMsQ0FBckMsRUFBd0M7QUFBQSxvQ0FDTlQsY0FBYyxDQUFDVSxLQUFmLENBQXFCLEdBQXJCLENBRE07QUFBQTtBQUFBLFlBQ2hDQyxRQURnQztBQUFBLFlBQ25CQyxTQURtQjs7QUFFdkMseUJBQVVELFFBQVYsY0FBc0JmLEtBQUssQ0FBQ0csVUFBRCxFQUFhYSxTQUFTLENBQUNDLElBQVYsQ0FBZSxHQUFmLENBQWIsQ0FBM0I7QUFDQSxPQUhELE1BR087QUFDTixlQUFPYixjQUFQO0FBQ0E7QUFDRDtBQUNEOztBQUVELFdBQVNjLE9BQVQsQ0FBaUJmLFVBQWpCLEVBQWdEZ0IsWUFBaEQsRUFBc0c7QUFDckcsUUFBSSxDQUFDaEIsVUFBVSxDQUFDaUIsWUFBaEIsRUFBOEI7QUFDN0JqQixNQUFBQSxVQUFVLENBQUNpQixZQUFYLEdBQTBCakIsVUFBVSxDQUFDRyxNQUFYLENBQWtCLFVBQUNDLEdBQUQsRUFBaUNDLFNBQWpDLEVBQStDO0FBQzFGRCxRQUFBQSxHQUFHLENBQUNDLFNBQVMsQ0FBQ1IsS0FBWCxDQUFILEdBQXVCUSxTQUF2QjtBQUNBLGVBQU9ELEdBQVA7QUFDQSxPQUh5QixFQUd2QixFQUh1QixDQUExQjtBQUlBOztBQUNELFFBQUksQ0FBQ1ksWUFBTCxFQUFtQjtBQUNsQixhQUFPQSxZQUFQO0FBQ0E7O0FBVG9HLDhCQVUzRUEsWUFBWSxDQUFDTCxLQUFiLENBQW1CLEdBQW5CLENBVjJFO0FBQUE7QUFBQSxRQVU5RmQsS0FWOEY7QUFBQSxRQVVwRlksS0FWb0Y7O0FBV3JHLFFBQU1KLFNBQVMsR0FBR0wsVUFBVSxDQUFDaUIsWUFBWCxDQUF3QnBCLEtBQXhCLENBQWxCOztBQUNBLFFBQUlRLFNBQUosRUFBZTtBQUNkLHVCQUFVQSxTQUFTLENBQUNQLFNBQXBCLGNBQWlDVyxLQUFLLENBQUNLLElBQU4sQ0FBVyxHQUFYLENBQWpDO0FBQ0EsS0FGRCxNQUVPO0FBQ047QUFDQSxVQUFJRSxZQUFZLENBQUNOLE9BQWIsQ0FBcUIsR0FBckIsTUFBOEIsQ0FBQyxDQUFuQyxFQUFzQztBQUFBLG1DQUNKTSxZQUFZLENBQUNMLEtBQWIsQ0FBbUIsR0FBbkIsQ0FESTtBQUFBO0FBQUEsWUFDOUJDLFFBRDhCO0FBQUEsWUFDakJDLFNBRGlCOztBQUVyQyx5QkFBVUQsUUFBVixjQUFzQkcsT0FBTyxDQUFDZixVQUFELEVBQWFhLFNBQVMsQ0FBQ0MsSUFBVixDQUFlLEdBQWYsQ0FBYixDQUE3QjtBQUNBLE9BSEQsTUFHTztBQUNOLGVBQU9FLFlBQVA7QUFDQTtBQUNEO0FBQ0Q7O0FBRUQsV0FBU0UsY0FBVCxDQUF3QkMsWUFBeEIsRUFBeUU7QUFDeEUsUUFBTUMsU0FBYyxHQUFHLEVBQXZCOztBQUNBLFFBQUlELFlBQVksQ0FBQ0UsTUFBYixDQUFvQkMsZUFBcEIsSUFBdUNILFlBQVksQ0FBQ0UsTUFBYixDQUFvQkMsZUFBcEIsQ0FBb0NDLGtCQUEvRSxFQUFtRztBQUNsR0gsTUFBQUEsU0FBUyxDQUFDRCxZQUFZLENBQUNFLE1BQWIsQ0FBb0JDLGVBQXBCLENBQW9DQyxrQkFBckMsQ0FBVCxHQUFvRUosWUFBWSxDQUFDRSxNQUFiLENBQW9CQyxlQUF4RjtBQUNBOztBQUNESCxJQUFBQSxZQUFZLENBQUNFLE1BQWIsQ0FBb0JHLFVBQXBCLENBQStCQyxPQUEvQixDQUF1QyxVQUFBQyxTQUFTLEVBQUk7QUFDbkROLE1BQUFBLFNBQVMsQ0FBQ00sU0FBUyxDQUFDSCxrQkFBWCxDQUFULEdBQTBDRyxTQUExQztBQUNBLEtBRkQ7QUFHQVAsSUFBQUEsWUFBWSxDQUFDRSxNQUFiLENBQW9CTSxPQUFwQixDQUE0QkYsT0FBNUIsQ0FBb0MsVUFBQUcsTUFBTSxFQUFJO0FBQzdDUixNQUFBQSxTQUFTLENBQUNRLE1BQU0sQ0FBQ0wsa0JBQVIsQ0FBVCxHQUF1Q0ssTUFBdkM7QUFDQVIsTUFBQUEsU0FBUyxDQUFDUSxNQUFNLENBQUNMLGtCQUFQLENBQTBCWixLQUExQixDQUFnQyxHQUFoQyxFQUFxQyxDQUFyQyxDQUFELENBQVQsR0FBcURpQixNQUFyRDtBQUNBQSxNQUFBQSxNQUFNLENBQUNDLFVBQVAsQ0FBa0JKLE9BQWxCLENBQTBCLFVBQUFLLFNBQVMsRUFBSTtBQUN0Q1YsUUFBQUEsU0FBUyxDQUFDVSxTQUFTLENBQUNQLGtCQUFYLENBQVQsR0FBMENPLFNBQTFDO0FBQ0EsT0FGRDtBQUdBLEtBTkQ7QUFPQVgsSUFBQUEsWUFBWSxDQUFDRSxNQUFiLENBQW9CVSxZQUFwQixDQUFpQ04sT0FBakMsQ0FBeUMsVUFBQU8sV0FBVyxFQUFJO0FBQ3ZEWixNQUFBQSxTQUFTLENBQUNZLFdBQVcsQ0FBQ1Qsa0JBQWIsQ0FBVCxHQUE0Q1MsV0FBNUM7QUFDQUEsTUFBQUEsV0FBVyxDQUFDQyxVQUFaLENBQXVCUixPQUF2QixDQUErQixVQUFBUyxRQUFRLEVBQUk7QUFDMUNkLFFBQUFBLFNBQVMsQ0FBQ2MsUUFBUSxDQUFDWCxrQkFBVixDQUFULEdBQXlDVyxRQUF6QztBQUNBLE9BRkQ7QUFHQSxLQUxEO0FBTUFmLElBQUFBLFlBQVksQ0FBQ0UsTUFBYixDQUFvQmMsV0FBcEIsQ0FBZ0NWLE9BQWhDLENBQXdDLFVBQUFXLFVBQVUsRUFBSTtBQUNyRGhCLE1BQUFBLFNBQVMsQ0FBQ2dCLFVBQVUsQ0FBQ2Isa0JBQVosQ0FBVCxHQUEyQ2EsVUFBM0M7QUFDQUEsTUFBQUEsVUFBVSxDQUFDQyxnQkFBWCxDQUE0QlosT0FBNUIsQ0FBb0MsVUFBQVMsUUFBUSxFQUFJO0FBQy9DZCxRQUFBQSxTQUFTLENBQUNjLFFBQVEsQ0FBQ1gsa0JBQVYsQ0FBVCxHQUF5Q1csUUFBekM7O0FBQ0EsWUFBSUEsUUFBUSxDQUFDekMsSUFBVCxDQUFjaUIsT0FBZCxDQUFzQixLQUF0QixNQUFpQyxDQUFDLENBQXRDLEVBQXlDO0FBQ3hDO0FBQ0EsY0FBTTRCLHFCQUFxQixHQUFHbEIsU0FBUyxDQUFDYyxRQUFRLENBQUN6QyxJQUFWLENBQXZDOztBQUNBLGNBQUk2QyxxQkFBcUIsSUFBSUEscUJBQXFCLENBQUNMLFVBQW5ELEVBQStEO0FBQzlESyxZQUFBQSxxQkFBcUIsQ0FBQ0wsVUFBdEIsQ0FBaUNSLE9BQWpDLENBQXlDLFVBQUFjLGVBQWUsRUFBSTtBQUMzRCxrQkFBTUMscUJBQXFDLEdBQUdDLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjSCxlQUFkLEVBQStCO0FBQzVFSSxnQkFBQUEsS0FBSyxFQUFFLFVBRHFFO0FBRTVFcEIsZ0JBQUFBLGtCQUFrQixFQUFFVyxRQUFRLENBQUNYLGtCQUFULEdBQThCLEdBQTlCLEdBQW9DZ0IsZUFBZSxDQUFDSztBQUZJLGVBQS9CLENBQTlDO0FBSUF4QixjQUFBQSxTQUFTLENBQUNvQixxQkFBcUIsQ0FBQ2pCLGtCQUF2QixDQUFULEdBQXNEaUIscUJBQXREO0FBQ0EsYUFORDtBQU9BO0FBQ0Q7QUFDRCxPQWZEO0FBZ0JBSixNQUFBQSxVQUFVLENBQUNTLG9CQUFYLENBQWdDcEIsT0FBaEMsQ0FBd0MsVUFBQXFCLFdBQVcsRUFBSTtBQUN0RDFCLFFBQUFBLFNBQVMsQ0FBQzBCLFdBQVcsQ0FBQ3ZCLGtCQUFiLENBQVQsR0FBNEN1QixXQUE1QztBQUNBLE9BRkQ7QUFHQSxLQXJCRDtBQXVCQUwsSUFBQUEsTUFBTSxDQUFDTSxJQUFQLENBQVk1QixZQUFZLENBQUNFLE1BQWIsQ0FBb0IyQixXQUFoQyxFQUE2Q3ZCLE9BQTdDLENBQXFELFVBQUF3QixnQkFBZ0IsRUFBSTtBQUN4RTlCLE1BQUFBLFlBQVksQ0FBQ0UsTUFBYixDQUFvQjJCLFdBQXBCLENBQWdDQyxnQkFBaEMsRUFBa0R4QixPQUFsRCxDQUEwRCxVQUFBeUIsY0FBYyxFQUFJO0FBQzNFLFlBQU1DLGlCQUFpQixHQUFHcEMsT0FBTyxDQUFDSSxZQUFZLENBQUNuQixVQUFkLEVBQTBCa0QsY0FBYyxDQUFDRSxNQUF6QyxDQUFqQztBQUNBRixRQUFBQSxjQUFjLENBQUNGLFdBQWYsQ0FBMkJ2QixPQUEzQixDQUFtQyxVQUFBNEIsVUFBVSxFQUFJO0FBQ2hELGNBQUlDLGFBQWEsYUFBTUgsaUJBQU4sY0FBMkJwQyxPQUFPLENBQUNJLFlBQVksQ0FBQ25CLFVBQWQsRUFBMEJxRCxVQUFVLENBQUM5RCxJQUFyQyxDQUFsQyxDQUFqQjs7QUFDQSxjQUFJOEQsVUFBVSxDQUFDRSxTQUFmLEVBQTBCO0FBQ3pCRCxZQUFBQSxhQUFhLGVBQVFELFVBQVUsQ0FBQ0UsU0FBbkIsQ0FBYjtBQUNBOztBQUNELGNBQUksT0FBT0YsVUFBUCxLQUFzQixRQUExQixFQUFvQztBQUNuQztBQUNBOztBQUNEakMsVUFBQUEsU0FBUyxDQUFDa0MsYUFBRCxDQUFULEdBQTJCRCxVQUEzQjtBQUNDQSxVQUFBQSxVQUFELENBQTJCOUIsa0JBQTNCLEdBQWdEK0IsYUFBaEQ7QUFDQSxTQVZEO0FBV0EsT0FiRDtBQWNBLEtBZkQ7QUFnQkEsV0FBT2xDLFNBQVA7QUFDQTs7QUFFRCxXQUFTb0MsV0FBVCxDQUFxQkMsYUFBckIsRUFBNENqRSxJQUE1QyxFQUFrRTtBQUNqRSxRQUFJQSxJQUFJLENBQUNrRSxVQUFMLENBQWdCLEdBQWhCLENBQUosRUFBMEI7QUFDekIsYUFBT0QsYUFBYSxHQUFHMUMsT0FBTyxDQUFDbkIsaUJBQUQsRUFBb0JKLElBQXBCLENBQTlCO0FBQ0EsS0FGRCxNQUVPO0FBQ04sYUFBT2lFLGFBQWEsR0FBRyxHQUFoQixHQUFzQmpFLElBQTdCO0FBQ0E7QUFDRDs7QUFFRCxXQUFTbUUseUJBQVQsQ0FBbUNuRSxJQUFuQyxFQUFpRG9FLFNBQWpELEVBQWlFO0FBQ2hFLFFBQUksQ0FBQ0MscUJBQXFCLENBQUNyRSxJQUFELENBQTFCLEVBQWtDO0FBQ2pDcUUsTUFBQUEscUJBQXFCLENBQUNyRSxJQUFELENBQXJCLEdBQThCLENBQUNvRSxTQUFELENBQTlCO0FBQ0EsS0FGRCxNQUVPO0FBQ05DLE1BQUFBLHFCQUFxQixDQUFDckUsSUFBRCxDQUFyQixDQUE0QnNFLElBQTVCLENBQWlDRixTQUFqQztBQUNBO0FBQ0Q7O0FBRUQsV0FBU0csYUFBVCxDQUNDM0MsU0FERCxFQUVDcUMsYUFGRCxFQUdDakUsSUFIRCxFQVFFO0FBQUEsUUFKRHdFLFFBSUMsdUVBSm1CLEtBSW5CO0FBQUEsUUFIREMscUJBR0MsdUVBSGdDLEtBR2hDO0FBQUEsUUFGRDNFLGNBRUM7QUFBQSxRQURERCxlQUNDOztBQUNELFFBQUksQ0FBQ0csSUFBTCxFQUFXO0FBQ1YsYUFBTzBFLFNBQVA7QUFDQSxLQUhBLENBSUQ7OztBQUNBLFFBQUlDLGVBQXNCLEdBQUcsRUFBN0I7O0FBQ0EsUUFBSVYsYUFBYSxJQUFJQSxhQUFhLENBQUNkLEtBQWQsS0FBd0IsVUFBN0MsRUFBeUQ7QUFDeERjLE1BQUFBLGFBQWEsR0FBR3JDLFNBQVMsQ0FBQ3FDLGFBQWEsQ0FBQ2xDLGtCQUFkLENBQWlDWixLQUFqQyxDQUF1QyxHQUF2QyxFQUE0QyxDQUE1QyxDQUFELENBQXpCO0FBQ0E7O0FBQ0RuQixJQUFBQSxJQUFJLEdBQUdnRSxXQUFXLENBQUNDLGFBQWEsQ0FBQ2xDLGtCQUFmLEVBQW1DL0IsSUFBbkMsQ0FBbEI7QUFFQSxRQUFNNEUsU0FBUyxHQUFHNUUsSUFBSSxDQUFDbUIsS0FBTCxDQUFXLEdBQVgsQ0FBbEI7QUFDQSxRQUFNMEQsZUFBeUIsR0FBRyxFQUFsQztBQUNBRCxJQUFBQSxTQUFTLENBQUMzQyxPQUFWLENBQWtCLFVBQUE2QyxRQUFRLEVBQUk7QUFDN0I7QUFDQSxVQUFJQSxRQUFRLENBQUM1RCxPQUFULENBQWlCLEdBQWpCLE1BQTBCLENBQUMsQ0FBL0IsRUFBa0M7QUFBQSw4QkFDRjRELFFBQVEsQ0FBQzNELEtBQVQsQ0FBZSxHQUFmLENBREU7QUFBQTtBQUFBLFlBQzFCbkIsS0FEMEI7QUFBQSxZQUNwQitFLGNBRG9COztBQUVqQ0YsUUFBQUEsZUFBZSxDQUFDUCxJQUFoQixDQUFxQnRFLEtBQXJCO0FBQ0E2RSxRQUFBQSxlQUFlLENBQUNQLElBQWhCLFlBQXlCUyxjQUF6QjtBQUNBLE9BSkQsTUFJTztBQUNORixRQUFBQSxlQUFlLENBQUNQLElBQWhCLENBQXFCUSxRQUFyQjtBQUNBO0FBQ0QsS0FURDtBQVVBLFFBQUlFLFdBQVcsR0FBR2hGLElBQWxCO0FBQ0EsUUFBSWlGLGNBQWMsR0FBR2hCLGFBQXJCO0FBQ0EsUUFBTUwsTUFBTSxHQUFHaUIsZUFBZSxDQUFDbEUsTUFBaEIsQ0FBdUIsVUFBQ3VFLFlBQUQsRUFBb0JKLFFBQXBCLEVBQWlDO0FBQ3RFLFVBQUlBLFFBQVEsS0FBSyxPQUFiLElBQXdCSSxZQUFZLENBQUMvQixLQUFiLEtBQXVCLFlBQW5ELEVBQWlFO0FBQ2hFLGVBQU8rQixZQUFQO0FBQ0E7O0FBQ0QsVUFBSUosUUFBUSxDQUFDSyxNQUFULEtBQW9CLENBQXhCLEVBQTJCO0FBQzFCO0FBQ0EsWUFBSUQsWUFBWSxJQUFJQSxZQUFZLENBQUMvQixLQUFiLEtBQXVCLFdBQXZDLElBQXNEK0IsWUFBWSxDQUFDdEMsVUFBdkUsRUFBbUY7QUFDbEYsY0FBSTZCLHFCQUFKLEVBQTJCO0FBQzFCRSxZQUFBQSxlQUFlLENBQUNMLElBQWhCLENBQXFCWSxZQUFyQjtBQUNBOztBQUNEQSxVQUFBQSxZQUFZLEdBQUdBLFlBQVksQ0FBQ3RDLFVBQTVCO0FBQ0E7O0FBQ0QsWUFBSXNDLFlBQVksSUFBSUEsWUFBWSxDQUFDL0IsS0FBYixLQUF1QixvQkFBdkMsSUFBK0QrQixZQUFZLENBQUNFLFVBQWhGLEVBQTRGO0FBQzNGLGNBQUlYLHFCQUFKLEVBQTJCO0FBQzFCRSxZQUFBQSxlQUFlLENBQUNMLElBQWhCLENBQXFCWSxZQUFyQjtBQUNBOztBQUNEQSxVQUFBQSxZQUFZLEdBQUdBLFlBQVksQ0FBQ0UsVUFBNUI7QUFDQTs7QUFDRCxlQUFPRixZQUFQO0FBQ0E7O0FBQ0QsVUFBSVQscUJBQXFCLElBQUlTLFlBQVksS0FBSyxJQUExQyxJQUFrREEsWUFBWSxLQUFLUixTQUF2RSxFQUFrRjtBQUNqRkMsUUFBQUEsZUFBZSxDQUFDTCxJQUFoQixDQUFxQlksWUFBckI7QUFDQTs7QUFDRCxVQUFJLENBQUNBLFlBQUwsRUFBbUI7QUFDbEJGLFFBQUFBLFdBQVcsR0FBR0YsUUFBZDtBQUNBLE9BRkQsTUFFTyxJQUFJSSxZQUFZLENBQUMvQixLQUFiLEtBQXVCLFdBQXZCLElBQXNDMkIsUUFBUSxLQUFLLE9BQXZELEVBQWdFO0FBQ3RFSSxRQUFBQSxZQUFZLEdBQUdBLFlBQVksQ0FBQ0UsVUFBNUI7QUFDQSxlQUFPRixZQUFQO0FBQ0EsT0FITSxNQUdBLElBQUlBLFlBQVksQ0FBQy9CLEtBQWIsS0FBdUIsV0FBdkIsSUFBc0MrQixZQUFZLENBQUN0QyxVQUF2RCxFQUFtRTtBQUN6RW9DLFFBQUFBLFdBQVcsR0FBR2hCLFdBQVcsQ0FBQ2tCLFlBQVksQ0FBQ0csY0FBZCxFQUE4QlAsUUFBOUIsQ0FBekI7QUFDQSxPQUZNLE1BRUEsSUFBSUksWUFBWSxDQUFDL0IsS0FBYixLQUF1QixvQkFBdkIsSUFBK0MrQixZQUFZLENBQUNJLGNBQWhFLEVBQWdGO0FBQ3RGTixRQUFBQSxXQUFXLEdBQUdoQixXQUFXLENBQUNrQixZQUFZLENBQUNJLGNBQWQsRUFBOEJSLFFBQTlCLENBQXpCO0FBQ0EsT0FGTSxNQUVBLElBQUlJLFlBQVksQ0FBQy9CLEtBQWIsS0FBdUIsb0JBQXZCLElBQStDK0IsWUFBWSxDQUFDRSxVQUFoRSxFQUE0RTtBQUNsRkosUUFBQUEsV0FBVyxHQUFHaEIsV0FBVyxDQUFDa0IsWUFBWSxDQUFDRSxVQUFiLENBQXdCckQsa0JBQXpCLEVBQTZDK0MsUUFBN0MsQ0FBekI7QUFDQSxPQUZNLE1BRUEsSUFBSUksWUFBWSxDQUFDL0IsS0FBYixLQUF1QixVQUEzQixFQUF1QztBQUM3QztBQUNBLFlBQUkrQixZQUFZLENBQUNFLFVBQWpCLEVBQTZCO0FBQzVCSixVQUFBQSxXQUFXLEdBQUdoQixXQUFXLENBQUNrQixZQUFZLENBQUNFLFVBQWIsQ0FBd0JyRCxrQkFBekIsRUFBNkMrQyxRQUE3QyxDQUF6QjtBQUNBLFNBRkQsTUFFTztBQUNORSxVQUFBQSxXQUFXLEdBQUdoQixXQUFXLENBQUNrQixZQUFZLENBQUNuRCxrQkFBZCxFQUFrQytDLFFBQWxDLENBQXpCO0FBQ0E7QUFDRCxPQVBNLE1BT0EsSUFBSUksWUFBWSxDQUFDL0IsS0FBYixLQUF1QixRQUF2QixJQUFtQytCLFlBQVksQ0FBQ0ssT0FBcEQsRUFBNkQ7QUFDbkVQLFFBQUFBLFdBQVcsR0FBR2hCLFdBQVcsQ0FBQ2tCLFlBQVksQ0FBQ25ELGtCQUFkLEVBQWtDK0MsUUFBbEMsQ0FBekI7O0FBQ0EsWUFBSSxDQUFDbEQsU0FBUyxDQUFDb0QsV0FBRCxDQUFkLEVBQTZCO0FBQzVCQSxVQUFBQSxXQUFXLEdBQUdoQixXQUFXLENBQUNrQixZQUFZLENBQUNNLFVBQWQsRUFBMEJWLFFBQTFCLENBQXpCO0FBQ0E7QUFDRCxPQUxNLE1BS0EsSUFBSUksWUFBWSxDQUFDL0IsS0FBYixLQUF1QixpQkFBdkIsSUFBNEMrQixZQUFZLENBQUNPLFdBQTdELEVBQTBFO0FBQ2hGVCxRQUFBQSxXQUFXLEdBQUdoQixXQUFXLENBQUNrQixZQUFZLENBQUNqRixJQUFkLEVBQW9CNkUsUUFBcEIsQ0FBekI7QUFDQSxPQUZNLE1BRUEsSUFBSUksWUFBWSxDQUFDL0IsS0FBYixLQUF1QixpQkFBdkIsSUFBNEMsQ0FBQytCLFlBQVksQ0FBQ08sV0FBOUQsRUFBMkU7QUFDakZULFFBQUFBLFdBQVcsR0FBR2hCLFdBQVcsQ0FDeEJDLGFBQWEsQ0FBQ2xDLGtCQUFkLENBQWlDZixNQUFqQyxDQUF3QyxDQUF4QyxFQUEyQ2lELGFBQWEsQ0FBQ2xDLGtCQUFkLENBQWlDaEIsV0FBakMsQ0FBNkMsR0FBN0MsQ0FBM0MsQ0FEd0IsRUFFeEIrRCxRQUZ3QixDQUF6Qjs7QUFJQSxZQUFJLENBQUNsRCxTQUFTLENBQUNvRCxXQUFELENBQWQsRUFBNkI7QUFDNUIsY0FBSVUsT0FBTyxHQUFHekIsYUFBYSxDQUFDbEMsa0JBQWQsQ0FBaUNoQixXQUFqQyxDQUE2QyxHQUE3QyxDQUFkOztBQUNBLGNBQUkyRSxPQUFPLEtBQUssQ0FBQyxDQUFqQixFQUFvQjtBQUNuQkEsWUFBQUEsT0FBTyxHQUFHekIsYUFBYSxDQUFDbEMsa0JBQWQsQ0FBaUNvRCxNQUEzQztBQUNBOztBQUNESCxVQUFBQSxXQUFXLEdBQUdoQixXQUFXLENBQ3ZCcEMsU0FBUyxDQUFDcUMsYUFBYSxDQUFDbEMsa0JBQWQsQ0FBaUNmLE1BQWpDLENBQXdDLENBQXhDLEVBQTJDMEUsT0FBM0MsQ0FBRCxDQUFWLENBQTJFRixVQURuRCxFQUV4QlYsUUFGd0IsQ0FBekI7QUFJQTtBQUNELE9BZk0sTUFlQTtBQUNORSxRQUFBQSxXQUFXLEdBQUdoQixXQUFXLENBQUNrQixZQUFZLENBQUNuRCxrQkFBZCxFQUFrQytDLFFBQWxDLENBQXpCOztBQUNBLFlBQUlBLFFBQVEsS0FBSyxNQUFiLElBQXVCSSxZQUFZLENBQUNKLFFBQUQsQ0FBWixLQUEyQkosU0FBdEQsRUFBaUU7QUFDaEUsaUJBQU9RLFlBQVksQ0FBQ0osUUFBRCxDQUFuQjtBQUNBLFNBRkQsTUFFTyxJQUFJQSxRQUFRLEtBQUssaUJBQWIsSUFBa0NJLFlBQVksQ0FBQ2hGLE9BQW5ELEVBQTREO0FBQ2xFLGNBQU0rRSxlQUFjLEdBQUdyRCxTQUFTLENBQUNzRCxZQUFZLENBQUNuRCxrQkFBYixDQUFnQ1osS0FBaEMsQ0FBc0MsR0FBdEMsRUFBMkMsQ0FBM0MsQ0FBRCxDQUFoQztBQUNBLGNBQU13RSxTQUFjLEdBQUdwQixhQUFhLENBQUMzQyxTQUFELEVBQVlxRCxlQUFaLEVBQTRCQyxZQUFZLENBQUNqRSxLQUF6QyxFQUFnRCxLQUFoRCxFQUF1RCxJQUF2RCxDQUFwQztBQUNBMEUsVUFBQUEsU0FBUyxDQUFDQyxjQUFWLENBQXlCM0QsT0FBekIsQ0FBaUMsVUFBQzRELGdCQUFELEVBQTJCO0FBQzNELGdCQUFJbEIsZUFBZSxDQUFDekQsT0FBaEIsQ0FBd0IyRSxnQkFBeEIsTUFBOEMsQ0FBQyxDQUFuRCxFQUFzRDtBQUNyRGxCLGNBQUFBLGVBQWUsQ0FBQ0wsSUFBaEIsQ0FBcUJ1QixnQkFBckI7QUFDQTtBQUNELFdBSkQ7QUFLQSxpQkFBT0YsU0FBUyxDQUFDL0IsTUFBakI7QUFDQSxTQVRNLE1BU0EsSUFBSWtCLFFBQVEsS0FBSyxPQUFiLElBQXdCSSxZQUFZLENBQUNoRixPQUF6QyxFQUFrRDtBQUN4RCtFLFVBQUFBLGNBQWMsR0FBR04sZUFBZSxDQUM5Qm1CLE1BRGUsR0FFZkMsT0FGZSxHQUdmQyxJQUhlLENBSWYsVUFBQUMsR0FBRztBQUFBLG1CQUNGQSxHQUFHLENBQUM5QyxLQUFKLEtBQWMsWUFBZCxJQUNBOEMsR0FBRyxDQUFDOUMsS0FBSixLQUFjLFdBRGQsSUFFQThDLEdBQUcsQ0FBQzlDLEtBQUosS0FBYyxvQkFIWjtBQUFBLFdBSlksQ0FBakI7O0FBU0EsY0FBSThCLGNBQUosRUFBb0I7QUFDbkIsZ0JBQU1VLFVBQWMsR0FBR3BCLGFBQWEsQ0FBQzNDLFNBQUQsRUFBWXFELGNBQVosRUFBNEJDLFlBQVksQ0FBQ2xGLElBQXpDLEVBQStDLEtBQS9DLEVBQXNELElBQXRELENBQXBDOztBQUNBMkYsWUFBQUEsVUFBUyxDQUFDQyxjQUFWLENBQXlCM0QsT0FBekIsQ0FBaUMsVUFBQzRELGdCQUFELEVBQTJCO0FBQzNELGtCQUFJbEIsZUFBZSxDQUFDekQsT0FBaEIsQ0FBd0IyRSxnQkFBeEIsTUFBOEMsQ0FBQyxDQUFuRCxFQUFzRDtBQUNyRGxCLGdCQUFBQSxlQUFlLENBQUNMLElBQWhCLENBQXFCdUIsZ0JBQXJCO0FBQ0E7QUFDRCxhQUpEOztBQUtBLG1CQUFPRixVQUFTLENBQUMvQixNQUFqQjtBQUNBOztBQUNELGlCQUFPc0IsWUFBWSxDQUFDaEYsT0FBcEI7QUFDQSxTQXBCTSxNQW9CQSxJQUFJNEUsUUFBUSxDQUFDWixVQUFULENBQW9CLE9BQXBCLEtBQWdDZ0IsWUFBWSxDQUFDaEYsT0FBakQsRUFBMEQ7QUFDaEUsY0FBTWdHLGtCQUFrQixHQUFHaEIsWUFBWSxDQUFDaEYsT0FBeEM7QUFDQThFLFVBQUFBLFdBQVcsR0FBR2hCLFdBQVcsQ0FBQ2tDLGtCQUFrQixDQUFDbkUsa0JBQXBCLEVBQXdDK0MsUUFBUSxDQUFDOUQsTUFBVCxDQUFnQixDQUFoQixDQUF4QyxDQUF6QjtBQUNBLFNBSE0sTUFHQSxJQUFJa0UsWUFBWSxDQUFDaUIsY0FBYixDQUE0QixPQUE1QixLQUF3QyxDQUFDdkUsU0FBUyxDQUFDb0QsV0FBRCxDQUF0RCxFQUFxRTtBQUMzRTtBQUNBLGNBQU1wQyxVQUFVLEdBQUdoQixTQUFTLENBQUNzRCxZQUFZLENBQUNuRCxrQkFBYixDQUFnQ1osS0FBaEMsQ0FBc0MsR0FBdEMsRUFBMkMsQ0FBM0MsQ0FBRCxDQUE1Qjs7QUFDQSxjQUFJeUIsVUFBSixFQUFnQjtBQUNmb0MsWUFBQUEsV0FBVyxHQUFHaEIsV0FBVyxDQUFDcEIsVUFBVSxDQUFDYixrQkFBWixFQUFnQytDLFFBQWhDLENBQXpCO0FBQ0E7QUFDRDtBQUNEOztBQUNELGFBQU9sRCxTQUFTLENBQUNvRCxXQUFELENBQWhCO0FBQ0EsS0E1R2MsRUE0R1osSUE1R1ksQ0FBZjs7QUE2R0EsUUFBSSxDQUFDcEIsTUFBTCxFQUFhO0FBQ1osVUFBSS9ELGVBQWUsSUFBSUMsY0FBdkIsRUFBdUM7QUFDdEMsWUFBSXNFLFNBQVMsR0FBRztBQUNmZ0MsVUFBQUEsT0FBTyxFQUNOLDRDQUNBLElBREEsR0FFQXBHLElBRkEsR0FHQSxJQUhBLEdBSUEsSUFKQSxHQUtBLDBKQUxBLEdBTUEscUJBTkEsR0FPQUgsZUFQQSxHQVFBLEdBUkEsR0FTQSxJQVRBLEdBVUEsaUJBVkEsR0FXQUMsY0FYQSxHQVlBLEdBWkEsR0FhQSxJQWJBLEdBY0Esb0JBZEEsR0FlQUUsSUFmQSxHQWdCQTtBQWxCYyxTQUFoQjtBQW9CQW1FLFFBQUFBLHlCQUF5QixDQUFDbkUsSUFBRCxFQUFPb0UsU0FBUCxDQUF6QjtBQUNBLE9BdEJELE1Bc0JPO0FBQ04sWUFBSUEsU0FBUyxHQUFHO0FBQ2ZnQyxVQUFBQSxPQUFPLEVBQ04sNENBQ0FwRyxJQURBLEdBRUEsSUFGQSxHQUdBLElBSEEsR0FJQSwwSkFKQSxHQUtBLHFCQUxBLEdBTUE0RSxTQUFTLENBQUMsQ0FBRCxDQU5ULEdBT0EsR0FQQSxHQVFBLElBUkEsR0FTQSx3QkFUQSxHQVVBQSxTQUFTLENBQUMsQ0FBRCxDQVZULEdBV0E7QUFiYyxTQUFoQjtBQWVBVCxRQUFBQSx5QkFBeUIsQ0FBQ25FLElBQUQsRUFBT29FLFNBQVAsQ0FBekI7QUFDQSxPQXhDVyxDQXlDWjs7QUFDQTs7QUFDRCxRQUFJSSxRQUFKLEVBQWM7QUFDYixhQUFPUSxXQUFQO0FBQ0E7O0FBQ0QsUUFBSVAscUJBQUosRUFBMkI7QUFDMUIsYUFBTztBQUNObUIsUUFBQUEsY0FBYyxFQUFFakIsZUFEVjtBQUVOZixRQUFBQSxNQUFNLEVBQUVBO0FBRkYsT0FBUDtBQUlBOztBQUNELFdBQU9BLE1BQVA7QUFDQTs7QUFFRCxXQUFTeUMsZ0JBQVQsQ0FBMEJDLE9BQTFCLEVBQW9EO0FBQ25ELFdBQU9BLE9BQU8sQ0FBQ3BGLE9BQVIsQ0FBZ0IsR0FBaEIsTUFBeUIsQ0FBQyxDQUFqQztBQUNBOztBQUVELFdBQVNxRixVQUFULENBQ0NDLGFBREQsRUFFQ0MsUUFGRCxFQUdDOUUsWUFIRCxFQUlDc0MsYUFKRCxFQUtDckMsU0FMRCxFQU1DOEUsU0FORCxFQU9DakQsZ0JBUEQsRUFRQ2tELHFCQVJELEVBU0M3RyxjQVRELEVBVUNELGVBVkQsRUFXRTtBQUNELFFBQUkyRyxhQUFhLEtBQUs5QixTQUF0QixFQUFpQztBQUNoQyxhQUFPQSxTQUFQO0FBQ0E7O0FBQ0QsWUFBUThCLGFBQWEsQ0FBQ3ZHLElBQXRCO0FBQ0MsV0FBSyxRQUFMO0FBQ0MsZUFBT3VHLGFBQWEsQ0FBQ0ksTUFBckI7O0FBQ0QsV0FBSyxLQUFMO0FBQ0MsZUFBT0osYUFBYSxDQUFDSyxHQUFyQjs7QUFDRCxXQUFLLE1BQUw7QUFDQyxlQUFPTCxhQUFhLENBQUNNLElBQXJCOztBQUNELFdBQUssU0FBTDtBQUNDLGVBQU9OLGFBQWEsQ0FBQ08sT0FBckI7O0FBQ0QsV0FBSyxNQUFMO0FBQ0MsZUFBT1AsYUFBYSxDQUFDUSxJQUFyQjs7QUFDRCxXQUFLLFlBQUw7QUFDQyxlQUFPM0csS0FBSyxDQUFDc0IsWUFBWSxDQUFDbkIsVUFBZCxFQUEwQmdHLGFBQWEsQ0FBQ1MsVUFBeEMsQ0FBWjs7QUFDRCxXQUFLLGNBQUw7QUFDQyxlQUFPO0FBQ05oSCxVQUFBQSxJQUFJLEVBQUUsY0FEQTtBQUVOZ0IsVUFBQUEsS0FBSyxFQUFFdUYsYUFBYSxDQUFDVSxZQUZmO0FBR05uRixVQUFBQSxrQkFBa0IsRUFBRTBFLFFBSGQ7QUFJTnZHLFVBQUFBLE9BQU8sRUFBRXFFLGFBQWEsQ0FDckIzQyxTQURxQixFQUVyQnFDLGFBRnFCLEVBR3JCdUMsYUFBYSxDQUFDVSxZQUhPLEVBSXJCLEtBSnFCLEVBS3JCLEtBTHFCLEVBTXJCcEgsY0FOcUIsRUFPckJELGVBUHFCO0FBSmhCLFNBQVA7O0FBY0QsV0FBSyx3QkFBTDtBQUNDLGVBQU87QUFDTkksVUFBQUEsSUFBSSxFQUFFLHdCQURBO0FBRU5nQixVQUFBQSxLQUFLLEVBQUV1RixhQUFhLENBQUNXLHNCQUZmO0FBR05wRixVQUFBQSxrQkFBa0IsRUFBRTBFLFFBSGQ7QUFJTnZHLFVBQUFBLE9BQU8sRUFBRXFFLGFBQWEsQ0FDckIzQyxTQURxQixFQUVyQnFDLGFBRnFCLEVBR3JCdUMsYUFBYSxDQUFDVyxzQkFITyxFQUlyQixLQUpxQixFQUtyQixLQUxxQixFQU1yQnJILGNBTnFCLEVBT3JCRCxlQVBxQjtBQUpoQixTQUFQOztBQWNELFdBQUssZ0JBQUw7QUFDQyxZQUFNdUgsZ0JBQWdCLEdBQUc3QyxhQUFhLENBQ3JDM0MsU0FEcUMsRUFFckNxQyxhQUZxQyxFQUdyQzFDLE9BQU8sQ0FBQ0ksWUFBWSxDQUFDbkIsVUFBZCxFQUEwQmdHLGFBQWEsQ0FBQ2EsY0FBeEMsQ0FIOEIsRUFJckMsSUFKcUMsRUFLckMsS0FMcUMsRUFNckN2SCxjQU5xQyxFQU9yQ0QsZUFQcUMsQ0FBdEM7QUFTQSxZQUFNa0YsY0FBYyxHQUFHO0FBQ3RCOUUsVUFBQUEsSUFBSSxFQUFFLGdCQURnQjtBQUV0QmdCLFVBQUFBLEtBQUssRUFBRXVGLGFBQWEsQ0FBQ2EsY0FGQztBQUd0QnRGLFVBQUFBLGtCQUFrQixFQUFFMEUsUUFIRTtBQUl0QnZHLFVBQUFBLE9BQU8sRUFBRWtILGdCQUphO0FBS3RCdEgsVUFBQUEsY0FBYyxFQUFFQSxjQUxNO0FBTXRCRCxVQUFBQSxlQUFlLEVBQUVBLGVBTks7QUFPdEJFLFVBQUFBLElBQUksRUFBRSxFQVBnQjtBQVF0QkMsVUFBQUEsSUFBSSxFQUFFO0FBUmdCLFNBQXZCO0FBVUEwRyxRQUFBQSxTQUFTLENBQUNwQyxJQUFWLENBQWU7QUFBRWdELFVBQUFBLE1BQU0sRUFBRSxLQUFWO0FBQWlCWixVQUFBQSxTQUFTLEVBQUUzQjtBQUE1QixTQUFmO0FBQ0EsZUFBT0EsY0FBUDs7QUFDRCxXQUFLLE1BQUw7QUFDQyxZQUFNN0UsT0FBTyxHQUFHcUUsYUFBYSxDQUM1QjNDLFNBRDRCLEVBRTVCcUMsYUFGNEIsRUFHNUJ1QyxhQUFhLENBQUM5RyxJQUhjLEVBSTVCLElBSjRCLEVBSzVCLEtBTDRCLEVBTTVCSSxjQU40QixFQU81QkQsZUFQNEIsQ0FBN0I7QUFTQSxZQUFNRyxJQUFJLEdBQUcsSUFBSU4sSUFBSixDQUFTOEcsYUFBVCxFQUF3QnRHLE9BQXhCLEVBQWlDTCxlQUFqQyxFQUFrREMsY0FBbEQsRUFBa0UsRUFBbEUsQ0FBYjtBQUNBNEcsUUFBQUEsU0FBUyxDQUFDcEMsSUFBVixDQUFlO0FBQ2RnRCxVQUFBQSxNQUFNLEVBQUVqQixnQkFBZ0IsQ0FBQ0csYUFBYSxDQUFDOUcsSUFBZixDQURWO0FBRWRnSCxVQUFBQSxTQUFTLEVBQUUxRztBQUZHLFNBQWY7QUFJQSxlQUFPQSxJQUFQOztBQUVELFdBQUssUUFBTDtBQUNDLGVBQU91SCxXQUFXLENBQ2pCZixhQUFhLENBQUNnQixNQURHLEVBRWpCZixRQUZpQixFQUdqQjlFLFlBSGlCLEVBSWpCc0MsYUFKaUIsRUFLakJyQyxTQUxpQixFQU1qQjhFLFNBTmlCLEVBT2pCakQsZ0JBUGlCLEVBUWpCa0QscUJBUmlCLEVBU2pCN0csY0FUaUIsRUFVakJELGVBVmlCLENBQWxCOztBQVlELFdBQUssWUFBTDtBQUNDLGVBQU80SCxlQUFlLENBQ3JCakIsYUFBYSxDQUFDa0IsVUFETyxFQUVyQmpCLFFBRnFCLEVBR3JCOUUsWUFIcUIsRUFJckJzQyxhQUpxQixFQUtyQnJDLFNBTHFCLEVBTXJCOEUsU0FOcUIsRUFPckJqRCxnQkFQcUIsRUFRckJrRCxxQkFScUIsRUFTckI3RyxjQVRxQixFQVVyQkQsZUFWcUIsQ0FBdEI7O0FBWUQsV0FBSyxPQUFMO0FBQ0EsV0FBSyxLQUFMO0FBQ0EsV0FBSyxJQUFMO0FBQ0EsV0FBSyxJQUFMO0FBQ0EsV0FBSyxJQUFMO0FBQ0EsV0FBSyxJQUFMO0FBQ0EsV0FBSyxJQUFMO0FBQ0EsV0FBSyxJQUFMO0FBQ0EsV0FBSyxJQUFMO0FBQ0EsV0FBSyxLQUFMO0FBQ0EsV0FBSyxJQUFMO0FBQ0MsZUFBTzJHLGFBQVA7QUF2SEY7QUF5SEE7O0FBRUQsV0FBU21CLGlCQUFULENBQTJCOUgsZUFBM0IsRUFBb0Q4QixZQUFwRCxFQUFnRnlGLGdCQUFoRixFQUEwRztBQUN6RyxRQUFNaEMsVUFBVSxHQUFJakYsV0FBRCxDQUFxQk4sZUFBckIsQ0FBbkI7QUFDQSxRQUFJdUUsU0FBUyxHQUFHO0FBQ2Z3RCxNQUFBQSxPQUFPLEVBQUUsS0FETTtBQUVmeEIsTUFBQUEsT0FBTyx3REFBaUR2RyxlQUFqRCxrREFBd0d1RixVQUF4Ryw2R0FFY2dDLGdCQUZkLHVDQUdZdkgsZUFIWjtBQUZRLEtBQWhCO0FBVUFzRSxJQUFBQSx5QkFBeUIsQ0FBQ2lELGdCQUFnQixHQUFHLEdBQW5CLEdBQXlCdkgsZUFBMUIsRUFBMkN1RSxTQUEzQyxDQUF6QjtBQUNBLFdBQU9nQixVQUFQO0FBQ0E7O0FBRUQsV0FBU21DLFdBQVQsQ0FDQ00sZ0JBREQsRUFFQ0MsVUFGRCxFQUdDbkcsWUFIRCxFQUlDc0MsYUFKRCxFQUtDckMsU0FMRCxFQU1DOEUsU0FORCxFQU9DakQsZ0JBUEQsRUFRQ2tELHFCQVJELEVBU0M3RyxjQVRELEVBVUNELGVBVkQsRUFXRTtBQUNELFFBQUl1RixVQUFKOztBQUNBLFFBQUksQ0FBQ3lDLGdCQUFnQixDQUFDNUgsSUFBbEIsSUFBMEJKLGVBQTlCLEVBQStDO0FBQzlDdUYsTUFBQUEsVUFBVSxHQUFHdUMsaUJBQWlCLENBQUM5SCxlQUFELEVBQWtCOEIsWUFBbEIsRUFBZ0NzQyxhQUFhLENBQUNsQyxrQkFBOUMsQ0FBOUI7QUFDQSxLQUZELE1BRU87QUFDTnFELE1BQUFBLFVBQVUsR0FBRzdELE9BQU8sQ0FBQ0ksWUFBWSxDQUFDbkIsVUFBZCxFQUEwQnFILGdCQUFnQixDQUFDNUgsSUFBM0MsQ0FBcEI7QUFDQTs7QUFDRCxRQUFNOEgsY0FBbUIsR0FBRztBQUMzQkMsTUFBQUEsS0FBSyxFQUFFNUMsVUFEb0I7QUFFM0JyRCxNQUFBQSxrQkFBa0IsRUFBRStGO0FBRk8sS0FBNUI7QUFJQSxRQUFNRyxpQkFBc0IsR0FBRyxFQUEvQjs7QUFDQSxRQUFJSixnQkFBZ0IsQ0FBQ3JFLFdBQWpCLElBQWdDMEUsS0FBSyxDQUFDQyxPQUFOLENBQWNOLGdCQUFnQixDQUFDckUsV0FBL0IsQ0FBcEMsRUFBaUY7QUFDaEYsVUFBTTRFLGlCQUFpQixHQUFHO0FBQ3pCeEUsUUFBQUEsTUFBTSxFQUFFa0UsVUFEaUI7QUFFekJ0RSxRQUFBQSxXQUFXLEVBQUVxRSxnQkFBZ0IsQ0FBQ3JFLFdBRkw7QUFHekI2RSxRQUFBQSxRQUFRLEVBQUU1RTtBQUhlLE9BQTFCO0FBS0FrRCxNQUFBQSxxQkFBcUIsQ0FBQ3JDLElBQXRCLENBQTJCOEQsaUJBQTNCO0FBQ0E7O0FBQ0RQLElBQUFBLGdCQUFnQixDQUFDUyxjQUFqQixDQUFnQ3JHLE9BQWhDLENBQXdDLFVBQUN1RSxhQUFELEVBQWtDO0FBQ3pFeUIsTUFBQUEsaUJBQWlCLENBQUN6QixhQUFhLENBQUNwRCxJQUFmLENBQWpCLEdBQXdDbUQsVUFBVSxDQUNqREMsYUFBYSxDQUFDdkYsS0FEbUMsWUFFOUM2RyxVQUY4QyxjQUVoQ3RCLGFBQWEsQ0FBQ3BELElBRmtCLEdBR2pEekIsWUFIaUQsRUFJakRzQyxhQUppRCxFQUtqRHJDLFNBTGlELEVBTWpEOEUsU0FOaUQsRUFPakRqRCxnQkFQaUQsRUFRakRrRCxxQkFSaUQsRUFTakQ3RyxjQVRpRCxFQVVqREQsZUFWaUQsQ0FBbEQ7O0FBWUEsVUFBSTJHLGFBQWEsQ0FBQ2hELFdBQWQsSUFBNkIwRSxLQUFLLENBQUNDLE9BQU4sQ0FBYzNCLGFBQWEsQ0FBQ2hELFdBQTVCLENBQWpDLEVBQTJFO0FBQzFFLFlBQU00RSxrQkFBaUIsR0FBRztBQUN6QnhFLFVBQUFBLE1BQU0sWUFBS2tFLFVBQUwsY0FBbUJ0QixhQUFhLENBQUNwRCxJQUFqQyxDQURtQjtBQUV6QkksVUFBQUEsV0FBVyxFQUFFZ0QsYUFBYSxDQUFDaEQsV0FGRjtBQUd6QjZFLFVBQUFBLFFBQVEsRUFBRTVFO0FBSGUsU0FBMUI7QUFLQWtELFFBQUFBLHFCQUFxQixDQUFDckMsSUFBdEIsQ0FBMkI4RCxrQkFBM0I7QUFDQTs7QUFDRCxVQUNDSCxpQkFBaUIsQ0FBQzlCLGNBQWxCLENBQWlDLFFBQWpDLE1BQ0M0QixjQUFjLENBQUNDLEtBQWYsS0FBeUIsK0NBQXpCLElBQ0FELGNBQWMsQ0FBQ0MsS0FBZixLQUF5QixnREFGMUIsQ0FERCxFQUlFO0FBQ0RDLFFBQUFBLGlCQUFpQixDQUFDTSxZQUFsQixHQUNFdEUsYUFBYSxDQUFDOUIsT0FBZCxJQUF5QjhCLGFBQWEsQ0FBQzlCLE9BQWQsQ0FBc0I4RixpQkFBaUIsQ0FBQ08sTUFBeEMsQ0FBMUIsSUFDQTVHLFNBQVMsQ0FBQ3FHLGlCQUFpQixDQUFDTyxNQUFuQixDQUZWOztBQUdBLFlBQUksQ0FBQ1AsaUJBQWlCLENBQUNNLFlBQXZCLEVBQXFDO0FBQ3BDO0FBQ0FFLFVBQUFBLGlCQUFpQixDQUFDbkUsSUFBbEIsQ0FBdUI7QUFDdEI4QixZQUFBQSxPQUFPLEVBQ04sa0NBQ0E2QixpQkFBaUIsQ0FBQ08sTUFEbEIsR0FFQSxlQUZBLEdBR0FULGNBQWMsQ0FBQ2hHO0FBTE0sV0FBdkI7QUFPQTtBQUNEO0FBQ0QsS0F4Q0Q7QUF5Q0EsV0FBT2tCLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjNkUsY0FBZCxFQUE4QkUsaUJBQTlCLENBQVA7QUFDQTs7QUFzQkQsV0FBU1Msd0JBQVQsQ0FBa0NDLG9CQUFsQyxFQUErRTtBQUM5RSxRQUFJMUksSUFBb0IsR0FBSTBJLG9CQUFELENBQThCMUksSUFBekQ7O0FBQ0EsUUFBSUEsSUFBSSxLQUFLeUUsU0FBVCxJQUFzQmlFLG9CQUFvQixDQUFDeEQsTUFBckIsR0FBOEIsQ0FBeEQsRUFBMkQ7QUFDMUQsVUFBTXlELFlBQVksR0FBR0Qsb0JBQW9CLENBQUMsQ0FBRCxDQUF6Qzs7QUFDQSxVQUFJQyxZQUFZLENBQUN6QyxjQUFiLENBQTRCLGNBQTVCLENBQUosRUFBaUQ7QUFDaERsRyxRQUFBQSxJQUFJLEdBQUcsY0FBUDtBQUNBLE9BRkQsTUFFTyxJQUFJMkksWUFBWSxDQUFDekMsY0FBYixDQUE0QixNQUE1QixDQUFKLEVBQXlDO0FBQy9DbEcsUUFBQUEsSUFBSSxHQUFHLE1BQVA7QUFDQSxPQUZNLE1BRUEsSUFBSTJJLFlBQVksQ0FBQ3pDLGNBQWIsQ0FBNEIsZ0JBQTVCLENBQUosRUFBbUQ7QUFDekRsRyxRQUFBQSxJQUFJLEdBQUcsZ0JBQVA7QUFDQSxPQUZNLE1BRUEsSUFBSTJJLFlBQVksQ0FBQ3pDLGNBQWIsQ0FBNEIsd0JBQTVCLENBQUosRUFBMkQ7QUFDakVsRyxRQUFBQSxJQUFJLEdBQUcsd0JBQVA7QUFDQSxPQUZNLE1BRUEsSUFDTixPQUFPMkksWUFBUCxLQUF3QixRQUF4QixLQUNDQSxZQUFZLENBQUN6QyxjQUFiLENBQTRCLE1BQTVCLEtBQXVDeUMsWUFBWSxDQUFDekMsY0FBYixDQUE0QixnQkFBNUIsQ0FEeEMsQ0FETSxFQUdMO0FBQ0RsRyxRQUFBQSxJQUFJLEdBQUcsUUFBUDtBQUNBLE9BTE0sTUFLQSxJQUFJLE9BQU8ySSxZQUFQLEtBQXdCLFFBQTVCLEVBQXNDO0FBQzVDM0ksUUFBQUEsSUFBSSxHQUFHLFFBQVA7QUFDQTtBQUNELEtBbEJELE1Ba0JPLElBQUlBLElBQUksS0FBS3lFLFNBQWIsRUFBd0I7QUFDOUJ6RSxNQUFBQSxJQUFJLEdBQUcsaUJBQVA7QUFDQTs7QUFDRCxXQUFPQSxJQUFQO0FBQ0E7O0FBRUQsV0FBU3dILGVBQVQsQ0FDQ2tCLG9CQURELEVBRUNFLFNBRkQsRUFHQ2xILFlBSEQsRUFJQ3NDLGFBSkQsRUFLQ3JDLFNBTEQsRUFNQzhFLFNBTkQsRUFPQ2pELGdCQVBELEVBUUNrRCxxQkFSRCxFQVNDN0csY0FURCxFQVVDRCxlQVZELEVBV0U7QUFDRCxRQUFNaUosd0JBQXdCLEdBQUdKLHdCQUF3QixDQUFDQyxvQkFBRCxDQUF6RDs7QUFDQSxZQUFRRyx3QkFBUjtBQUNDLFdBQUssY0FBTDtBQUNDLGVBQU9ILG9CQUFvQixDQUFDL0gsR0FBckIsQ0FBeUIsVUFBQ21JLFlBQUQsRUFBZUMsV0FBZixFQUErQjtBQUM5RCxpQkFBTztBQUNOL0ksWUFBQUEsSUFBSSxFQUFFLGNBREE7QUFFTmdCLFlBQUFBLEtBQUssRUFBRThILFlBQVksQ0FBQzdCLFlBRmQ7QUFHTm5GLFlBQUFBLGtCQUFrQixZQUFLOEcsU0FBTCxjQUFrQkcsV0FBbEIsQ0FIWjtBQUlOOUksWUFBQUEsT0FBTyxFQUFFcUUsYUFBYSxDQUNyQjNDLFNBRHFCLEVBRXJCcUMsYUFGcUIsRUFHckI4RSxZQUFZLENBQUM3QixZQUhRLEVBSXJCLEtBSnFCLEVBS3JCLEtBTHFCLEVBTXJCcEgsY0FOcUIsRUFPckJELGVBUHFCO0FBSmhCLFdBQVA7QUFjQSxTQWZNLENBQVA7O0FBZ0JELFdBQUssTUFBTDtBQUNDLGVBQU84SSxvQkFBb0IsQ0FBQy9ILEdBQXJCLENBQXlCLFVBQUFxSSxTQUFTLEVBQUk7QUFDNUMsY0FBTS9JLE9BQU8sR0FBR3FFLGFBQWEsQ0FDNUIzQyxTQUQ0QixFQUU1QnFDLGFBRjRCLEVBRzVCZ0YsU0FBUyxDQUFDdkosSUFIa0IsRUFJNUIsSUFKNEIsRUFLNUIsS0FMNEIsRUFNNUJJLGNBTjRCLEVBTzVCRCxlQVA0QixDQUE3QjtBQVNBLGNBQU1HLElBQUksR0FBRyxJQUFJTixJQUFKLENBQVN1SixTQUFULEVBQW9CL0ksT0FBcEIsRUFBNkJMLGVBQTdCLEVBQThDQyxjQUE5QyxFQUE4RCxFQUE5RCxDQUFiO0FBQ0E0RyxVQUFBQSxTQUFTLENBQUNwQyxJQUFWLENBQWU7QUFDZGdELFlBQUFBLE1BQU0sRUFBRWpCLGdCQUFnQixDQUFDNEMsU0FBUyxDQUFDdkosSUFBWCxDQURWO0FBRWRnSCxZQUFBQSxTQUFTLEVBQUUxRztBQUZHLFdBQWY7QUFJQSxpQkFBT0EsSUFBUDtBQUNBLFNBaEJNLENBQVA7O0FBaUJELFdBQUssZ0JBQUw7QUFDQyxlQUFPMkksb0JBQW9CLENBQUMvSCxHQUFyQixDQUF5QixVQUFDbUUsY0FBRCxFQUFpQm1FLGFBQWpCLEVBQW1DO0FBQ2xFLGNBQU05QixnQkFBZ0IsR0FBRzdDLGFBQWEsQ0FDckMzQyxTQURxQyxFQUVyQ3FDLGFBRnFDLEVBR3JDYyxjQUFjLENBQUNzQyxjQUhzQixFQUlyQyxJQUpxQyxFQUtyQyxLQUxxQyxFQU1yQ3ZILGNBTnFDLEVBT3JDRCxlQVBxQyxDQUF0QztBQVNBLGNBQU1zSiwyQkFBMkIsR0FBRztBQUNuQ2xKLFlBQUFBLElBQUksRUFBRSxnQkFENkI7QUFFbkNnQixZQUFBQSxLQUFLLEVBQUU4RCxjQUFjLENBQUNzQyxjQUZhO0FBR25DdEYsWUFBQUEsa0JBQWtCLFlBQUs4RyxTQUFMLGNBQWtCSyxhQUFsQixDQUhpQjtBQUluQ2hKLFlBQUFBLE9BQU8sRUFBRWtILGdCQUowQjtBQUtuQ3RILFlBQUFBLGNBQWMsRUFBRUEsY0FMbUI7QUFNbkNELFlBQUFBLGVBQWUsRUFBRUEsZUFOa0I7QUFPbkNFLFlBQUFBLElBQUksRUFBRSxFQVA2QjtBQVFuQ0MsWUFBQUEsSUFBSSxFQUFFO0FBUjZCLFdBQXBDO0FBVUEwRyxVQUFBQSxTQUFTLENBQUNwQyxJQUFWLENBQWU7QUFDZGdELFlBQUFBLE1BQU0sRUFBRSxLQURNO0FBRWRaLFlBQUFBLFNBQVMsRUFBRXlDO0FBRkcsV0FBZjtBQUlBLGlCQUFPQSwyQkFBUDtBQUNBLFNBekJNLENBQVA7O0FBMEJELFdBQUssd0JBQUw7QUFDQyxlQUFPUixvQkFBb0IsQ0FBQy9ILEdBQXJCLENBQXlCLFVBQUN3SSxlQUFELEVBQWtCQyxVQUFsQixFQUFpQztBQUNoRSxpQkFBTztBQUNOcEosWUFBQUEsSUFBSSxFQUFFLHdCQURBO0FBRU5nQixZQUFBQSxLQUFLLEVBQUVtSSxlQUFlLENBQUNqQyxzQkFGakI7QUFHTnBGLFlBQUFBLGtCQUFrQixZQUFLOEcsU0FBTCxjQUFrQlEsVUFBbEIsQ0FIWjtBQUlObkosWUFBQUEsT0FBTyxFQUFFcUUsYUFBYSxDQUNyQjNDLFNBRHFCLEVBRXJCcUMsYUFGcUIsRUFHckJtRixlQUFlLENBQUNqQyxzQkFISyxFQUlyQixLQUpxQixFQUtyQixLQUxxQixFQU1yQnJILGNBTnFCLEVBT3JCRCxlQVBxQjtBQUpoQixXQUFQO0FBY0EsU0FmTSxDQUFQOztBQWdCRCxXQUFLLFFBQUw7QUFDQyxlQUFPOEksb0JBQW9CLENBQUMvSCxHQUFyQixDQUF5QixVQUFDaUgsZ0JBQUQsRUFBbUJ5QixTQUFuQixFQUFpQztBQUNoRSxpQkFBTy9CLFdBQVcsQ0FDakJNLGdCQURpQixZQUVkZ0IsU0FGYyxjQUVEUyxTQUZDLEdBR2pCM0gsWUFIaUIsRUFJakJzQyxhQUppQixFQUtqQnJDLFNBTGlCLEVBTWpCOEUsU0FOaUIsRUFPakJqRCxnQkFQaUIsRUFRakJrRCxxQkFSaUIsRUFTakI3RyxjQVRpQixFQVVqQkQsZUFWaUIsQ0FBbEI7QUFZQSxTQWJNLENBQVA7O0FBY0QsV0FBSyxPQUFMO0FBQ0EsV0FBSyxJQUFMO0FBQ0EsV0FBSyxJQUFMO0FBQ0EsV0FBSyxJQUFMO0FBQ0EsV0FBSyxJQUFMO0FBQ0EsV0FBSyxJQUFMO0FBQ0EsV0FBSyxJQUFMO0FBQ0EsV0FBSyxJQUFMO0FBQ0EsV0FBSyxLQUFMO0FBQ0EsV0FBSyxLQUFMO0FBQ0EsV0FBSyxJQUFMO0FBQ0MsZUFBTzhJLG9CQUFvQixDQUFDL0gsR0FBckIsQ0FBeUIsVUFBQTJJLE9BQU8sRUFBSTtBQUMxQyxpQkFBT0EsT0FBUDtBQUNBLFNBRk0sQ0FBUDs7QUFHRCxXQUFLLFFBQUw7QUFDQyxlQUFPWixvQkFBb0IsQ0FBQy9ILEdBQXJCLENBQXlCLFVBQUE0SSxXQUFXLEVBQUk7QUFDOUMsY0FBSSxPQUFPQSxXQUFQLEtBQXVCLFFBQTNCLEVBQXFDO0FBQ3BDLG1CQUFPQSxXQUFQO0FBQ0EsV0FGRCxNQUVPLElBQUlBLFdBQVcsS0FBSzlFLFNBQXBCLEVBQStCO0FBQ3JDLG1CQUFPOEUsV0FBUDtBQUNBLFdBRk0sTUFFQTtBQUNOLG1CQUFPQSxXQUFXLENBQUM1QyxNQUFuQjtBQUNBO0FBQ0QsU0FSTSxDQUFQOztBQVNEO0FBQ0MsWUFBSStCLG9CQUFvQixDQUFDeEQsTUFBckIsS0FBZ0MsQ0FBcEMsRUFBdUM7QUFDdEMsaUJBQU8sRUFBUDtBQUNBOztBQUNELGNBQU0sSUFBSXNFLEtBQUosQ0FBVSxrQkFBVixDQUFOO0FBM0hGO0FBNkhBOztBQWNELFdBQVNDLGlCQUFULENBQ0M3RixVQURELEVBRUNsQyxZQUZELEVBR0NzQyxhQUhELEVBSUNyQyxTQUpELEVBS0M4RSxTQUxELEVBTUNqRCxnQkFORCxFQU9Da0QscUJBUEQsRUFRTztBQUNOLFFBQUk5QyxVQUFVLENBQUM4RixNQUFmLEVBQXVCO0FBQ3RCLFVBQU03SixjQUFjLEdBQUcrRCxVQUFVLENBQUM4RixNQUFYLENBQWtCMUosSUFBbEIsR0FDcEJzQixPQUFPLENBQUNJLFlBQVksQ0FBQ25CLFVBQWQsRUFBMEJxRCxVQUFVLENBQUM4RixNQUFYLENBQWtCMUosSUFBNUMsQ0FEYSxHQUVwQjBILGlCQUFpQixDQUFDOUQsVUFBVSxDQUFDOUQsSUFBWixFQUFrQjRCLFlBQWxCLEVBQWdDc0MsYUFBYSxDQUFDbEMsa0JBQTlDLENBRnBCO0FBR0EsVUFBTWdHLGNBQW1CLEdBQUc7QUFDM0JDLFFBQUFBLEtBQUssRUFBRWxJLGNBRG9CO0FBRTNCaUMsUUFBQUEsa0JBQWtCLEVBQUU4QixVQUFVLENBQUM5QixrQkFGSjtBQUczQmdDLFFBQUFBLFNBQVMsRUFBRUYsVUFBVSxDQUFDRTtBQUhLLE9BQTVCO0FBS0EsVUFBTWtFLGlCQUFzQixHQUFHLEVBQS9CO0FBQ0FwRSxNQUFBQSxVQUFVLENBQUM4RixNQUFYLENBQWtCckIsY0FBbEIsQ0FBaUNyRyxPQUFqQyxDQUF5QyxVQUFDdUUsYUFBRCxFQUFrQztBQUMxRXlCLFFBQUFBLGlCQUFpQixDQUFDekIsYUFBYSxDQUFDcEQsSUFBZixDQUFqQixHQUF3Q21ELFVBQVUsQ0FDakRDLGFBQWEsQ0FBQ3ZGLEtBRG1DLFlBRTlDNEMsVUFBVSxDQUFDOUIsa0JBRm1DLGNBRWJ5RSxhQUFhLENBQUNwRCxJQUZELEdBR2pEekIsWUFIaUQsRUFJakRzQyxhQUppRCxFQUtqRHJDLFNBTGlELEVBTWpEOEUsU0FOaUQsRUFPakRqRCxnQkFQaUQsRUFRakRrRCxxQkFSaUQsRUFTakQ3RyxjQVRpRCxFQVVqRCtELFVBQVUsQ0FBQzlELElBVnNDLENBQWxEOztBQVlBLFlBQ0NrSSxpQkFBaUIsQ0FBQzlCLGNBQWxCLENBQWlDLFFBQWpDLE1BQ0MsQ0FBQ3RDLFVBQVUsQ0FBQzhGLE1BQVosSUFDQTVCLGNBQWMsQ0FBQ0MsS0FBZixLQUF5QiwrQ0FEekIsSUFFQUQsY0FBYyxDQUFDQyxLQUFmLEtBQXlCLGdEQUgxQixDQURELEVBS0U7QUFDREMsVUFBQUEsaUJBQWlCLENBQUNNLFlBQWxCLEdBQ0V0RSxhQUFhLENBQUM5QixPQUFkLElBQXlCOEIsYUFBYSxDQUFDOUIsT0FBZCxDQUFzQjhGLGlCQUFpQixDQUFDTyxNQUF4QyxDQUExQixJQUNBNUcsU0FBUyxDQUFDcUcsaUJBQWlCLENBQUNPLE1BQW5CLENBRlY7O0FBR0EsY0FBSSxDQUFDUCxpQkFBaUIsQ0FBQ00sWUFBdkIsRUFBcUM7QUFDcENFLFlBQUFBLGlCQUFpQixDQUFDbkUsSUFBbEIsQ0FBdUI7QUFDdEI4QixjQUFBQSxPQUFPLEVBQ04sa0NBQ0E2QixpQkFBaUIsQ0FBQ08sTUFEbEIsR0FFQSxlQUZBLEdBR0EzRSxVQUFVLENBQUM5QjtBQUxVLGFBQXZCLEVBRG9DLENBUXBDO0FBQ0E7QUFDQTtBQUNEO0FBQ0QsT0FsQ0Q7QUFtQ0EsYUFBT2tCLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjNkUsY0FBZCxFQUE4QkUsaUJBQTlCLENBQVA7QUFDQSxLQTlDRCxNQThDTyxJQUFJcEUsVUFBVSxDQUFDK0YsVUFBWCxLQUEwQmxGLFNBQTlCLEVBQXlDO0FBQy9DLFVBQUliLFVBQVUsQ0FBQzVDLEtBQWYsRUFBc0I7QUFDckIsZUFBT3NGLFVBQVUsQ0FDaEIxQyxVQUFVLENBQUM1QyxLQURLLEVBRWhCNEMsVUFBVSxDQUFDOUIsa0JBRkssRUFHaEJKLFlBSGdCLEVBSWhCc0MsYUFKZ0IsRUFLaEJyQyxTQUxnQixFQU1oQjhFLFNBTmdCLEVBT2hCakQsZ0JBUGdCLEVBUWhCa0QscUJBUmdCLEVBU2hCLEVBVGdCLEVBVWhCOUMsVUFBVSxDQUFDOUQsSUFWSyxDQUFqQjtBQVlBLE9BYkQsTUFhTztBQUNOLGVBQU8sSUFBUDtBQUNBO0FBQ0QsS0FqQk0sTUFpQkEsSUFBSThELFVBQVUsQ0FBQytGLFVBQWYsRUFBMkI7QUFDakMsVUFBTUEsVUFBZSxHQUFHbkMsZUFBZSxDQUN0QzVELFVBQVUsQ0FBQytGLFVBRDJCLEVBRXRDL0YsVUFBVSxDQUFDOUIsa0JBRjJCLEVBR3RDSixZQUhzQyxFQUl0Q3NDLGFBSnNDLEVBS3RDckMsU0FMc0MsRUFNdEM4RSxTQU5zQyxFQU90Q2pELGdCQVBzQyxFQVF0Q2tELHFCQVJzQyxFQVN0QyxFQVRzQyxFQVV0QzlDLFVBQVUsQ0FBQzlELElBVjJCLENBQXZDO0FBWUE2SixNQUFBQSxVQUFVLENBQUM3SCxrQkFBWCxHQUFnQzhCLFVBQVUsQ0FBQzlCLGtCQUEzQztBQUNBLGFBQU82SCxVQUFQO0FBQ0EsS0FmTSxNQWVBO0FBQ04sWUFBTSxJQUFJSCxLQUFKLENBQVUsa0JBQVYsQ0FBTjtBQUNBO0FBQ0Q7O0FBRUQsV0FBU0ksbUJBQVQsQ0FBNkJqSCxVQUE3QixFQUFxRGhCLFNBQXJELEVBQXFGO0FBQ3BGLFdBQU8sVUFBU2tJLFlBQVQsRUFBK0JyRixxQkFBL0IsRUFBb0U7QUFDMUUsVUFBTXNELGNBQXNCLEdBQUcsRUFBL0I7QUFDQSxVQUFNakksY0FBc0IsR0FBRyxFQUEvQjtBQUNBLGFBQU95RSxhQUFhLENBQ25CM0MsU0FEbUIsRUFFbkJnQixVQUZtQixFQUduQmtILFlBSG1CLEVBSW5CLEtBSm1CLEVBS25CckYscUJBTG1CLEVBTW5CM0UsY0FObUIsRUFPbkJpSSxjQVBtQixDQUFwQjtBQVNBLEtBWkQ7QUFhQTs7QUFFRCxXQUFTZ0MsMkJBQVQsQ0FDQ3BILFdBREQsRUFFQ3FILFlBRkQsRUFHQ3BJLFNBSEQsRUFJUTtBQUNQZSxJQUFBQSxXQUFXLENBQUNWLE9BQVosQ0FBb0IsVUFBQVcsVUFBVSxFQUFJO0FBQ2pDQSxNQUFBQSxVQUFVLENBQUNTLG9CQUFYLEdBQWtDVCxVQUFVLENBQUNTLG9CQUFYLENBQWdDekMsR0FBaEMsQ0FBb0MsVUFBQXFKLE9BQU8sRUFBSTtBQUNoRixZQUFNQyxVQUF1QyxHQUFHO0FBQy9DL0csVUFBQUEsS0FBSyxFQUFFLG9CQUR3QztBQUUvQ0MsVUFBQUEsSUFBSSxFQUFFNkcsT0FBTyxDQUFDN0csSUFGaUM7QUFHL0NyQixVQUFBQSxrQkFBa0IsRUFBRWtJLE9BQU8sQ0FBQ2xJLGtCQUhtQjtBQUkvQ29JLFVBQUFBLE9BQU8sRUFBR0YsT0FBRCxDQUFpQjlELGNBQWpCLENBQWdDLFNBQWhDLElBQThDOEQsT0FBRCxDQUFpQkUsT0FBOUQsR0FBd0V6RixTQUpsQztBQUsvQztBQUNBO0FBQ0EwRixVQUFBQSxZQUFZLEVBQUdILE9BQUQsQ0FBaUI5RCxjQUFqQixDQUFnQyxjQUFoQyxJQUFtRDhELE9BQUQsQ0FBaUJHLFlBQW5FLEdBQWtGLEtBUGpEO0FBUS9DQyxVQUFBQSxjQUFjLEVBQUdKLE9BQUQsQ0FBaUI5RCxjQUFqQixDQUFnQyxnQkFBaEMsSUFDWjhELE9BQUQsQ0FBaUJJLGNBREosR0FFYixLQVY0QztBQVcvQ0MsVUFBQUEscUJBQXFCLEVBQUdMLE9BQUQsQ0FBaUJLLHFCQUFqQixHQUNuQkwsT0FBRCxDQUFpQksscUJBREcsR0FFcEIsRUFiNEM7QUFjL0M5RyxVQUFBQSxXQUFXLEVBQUU7QUFka0MsU0FBaEQ7O0FBZ0JBLFlBQUt5RyxPQUFELENBQXVDM0UsY0FBM0MsRUFBMkQ7QUFDMUQ0RSxVQUFBQSxVQUFVLENBQUM5RSxVQUFYLEdBQXdCeEQsU0FBUyxDQUFFcUksT0FBRCxDQUFrQzNFLGNBQW5DLENBQWpDO0FBQ0EsU0FGRCxNQUVPLElBQUsyRSxPQUFELENBQWtDTSxZQUF0QyxFQUFvRDtBQUMxRCxjQUFNQyxpQkFBaUIsR0FBR1IsWUFBWSxDQUFDaEUsSUFBYixDQUN6QixVQUFBeUUsV0FBVztBQUFBLG1CQUFJQSxXQUFXLENBQUMxSSxrQkFBWixLQUFvQ2tJLE9BQUQsQ0FBa0NNLFlBQXpFO0FBQUEsV0FEYyxDQUExQjs7QUFHQSxjQUFJQyxpQkFBSixFQUF1QjtBQUN0QixnQkFBTUUsY0FBYyxHQUFHRixpQkFBaUIsQ0FBQ0UsY0FBbEIsQ0FBaUMxRSxJQUFqQyxDQUN0QixVQUFBMkUsR0FBRztBQUFBLHFCQUFJQSxHQUFHLENBQUNDLElBQUosS0FBY1gsT0FBRCxDQUFrQ1ksTUFBbkQ7QUFBQSxhQURtQixDQUF2Qjs7QUFHQSxnQkFBSUgsY0FBSixFQUFvQjtBQUNuQlIsY0FBQUEsVUFBVSxDQUFDOUUsVUFBWCxHQUF3QnhELFNBQVMsQ0FBQzhJLGNBQWMsQ0FBQ3pLLElBQWhCLENBQWpDO0FBQ0FpSyxjQUFBQSxVQUFVLENBQUNFLFlBQVgsR0FBMEJNLGNBQWMsQ0FBQ0ksWUFBZixLQUFnQyxHQUExRDtBQUNBO0FBQ0Q7QUFDRDs7QUFDRCxZQUFJWixVQUFVLENBQUM5RSxVQUFmLEVBQTJCO0FBQzFCOEUsVUFBQUEsVUFBVSxDQUFDNUUsY0FBWCxHQUE0QjRFLFVBQVUsQ0FBQzlFLFVBQVgsQ0FBc0JyRCxrQkFBbEQ7QUFDQTs7QUFDRCxZQUFNZ0osYUFBYSxHQUFHYixVQUF0QjtBQUNBdEksUUFBQUEsU0FBUyxDQUFDbUosYUFBYSxDQUFDaEosa0JBQWYsQ0FBVCxHQUE4Q2dKLGFBQTlDO0FBQ0EsZUFBT0EsYUFBUDtBQUNBLE9BdkNpQyxDQUFsQztBQXdDQ25JLE1BQUFBLFVBQUQsQ0FBMkJvSSxXQUEzQixHQUF5Q25CLG1CQUFtQixDQUFDakgsVUFBRCxFQUEyQmhCLFNBQTNCLENBQTVEO0FBQ0EsS0ExQ0Q7QUEyQ0E7O0FBRUQsV0FBU3FKLHVCQUFULENBQWlDM0ssU0FBakMsRUFBb0Q2QixPQUFwRCxFQUF1RVAsU0FBdkUsRUFBNkc7QUFDNUdPLElBQUFBLE9BQU8sQ0FBQ0YsT0FBUixDQUFnQixVQUFBRyxNQUFNLEVBQUk7QUFDekIsVUFBSSxDQUFDQSxNQUFNLENBQUNvQixXQUFaLEVBQXlCO0FBQ3hCcEIsUUFBQUEsTUFBTSxDQUFDb0IsV0FBUCxHQUFxQixFQUFyQjtBQUNBOztBQUNELFVBQUlwQixNQUFNLENBQUNtRCxPQUFYLEVBQW9CO0FBQ25CLFlBQU0yRixnQkFBZ0IsR0FBR3RKLFNBQVMsQ0FBQ1EsTUFBTSxDQUFDb0QsVUFBUixDQUFsQztBQUNBcEQsUUFBQUEsTUFBTSxDQUFDOEksZ0JBQVAsR0FBMEJBLGdCQUExQjs7QUFDQSxZQUFJQSxnQkFBSixFQUFzQjtBQUNyQixjQUFJLENBQUNBLGdCQUFnQixDQUFDL0ksT0FBdEIsRUFBK0I7QUFDOUIrSSxZQUFBQSxnQkFBZ0IsQ0FBQy9JLE9BQWpCLEdBQTJCLEVBQTNCO0FBQ0E7O0FBQ0QrSSxVQUFBQSxnQkFBZ0IsQ0FBQy9JLE9BQWpCLENBQXlCQyxNQUFNLENBQUNnQixJQUFoQyxJQUF3Q2hCLE1BQXhDO0FBQ0E4SSxVQUFBQSxnQkFBZ0IsQ0FBQy9JLE9BQWpCLFdBQTRCN0IsU0FBNUIsY0FBeUM4QixNQUFNLENBQUNnQixJQUFoRCxLQUEwRGhCLE1BQTFEO0FBQ0E7O0FBQ0RBLFFBQUFBLE1BQU0sQ0FBQytJLGdCQUFQLEdBQTBCdkosU0FBUyxDQUFDUSxNQUFNLENBQUNnSixVQUFSLENBQW5DO0FBQ0E7QUFDRCxLQWhCRDtBQWlCQTs7QUFFRCxXQUFTQyx5QkFBVCxDQUNDckosVUFERCxFQUVDSixTQUZELEVBR0NwQixVQUhELEVBSVE7QUFDUHdCLElBQUFBLFVBQVUsQ0FBQ0MsT0FBWCxDQUFtQixVQUFBQyxTQUFTLEVBQUk7QUFDL0JBLE1BQUFBLFNBQVMsQ0FBQ1UsVUFBVixHQUF1QmhCLFNBQVMsQ0FBQ00sU0FBUyxDQUFDbUQsY0FBWCxDQUFoQzs7QUFDQSxVQUFJLENBQUNuRCxTQUFTLENBQUNVLFVBQWYsRUFBMkI7QUFDMUJWLFFBQUFBLFNBQVMsQ0FBQ1UsVUFBVixHQUF1QmhCLFNBQVMsQ0FBQ0wsT0FBTyxDQUFDZixVQUFELEVBQWEwQixTQUFTLENBQUNtRCxjQUF2QixDQUFSLENBQWhDO0FBQ0E7O0FBQ0QsVUFBSSxDQUFDbkQsU0FBUyxDQUFDc0IsV0FBZixFQUE0QjtBQUMzQnRCLFFBQUFBLFNBQVMsQ0FBQ3NCLFdBQVYsR0FBd0IsRUFBeEI7QUFDQTs7QUFDRCxVQUFJLENBQUN0QixTQUFTLENBQUNVLFVBQVYsQ0FBcUJZLFdBQTFCLEVBQXVDO0FBQ3RDdEIsUUFBQUEsU0FBUyxDQUFDVSxVQUFWLENBQXFCWSxXQUFyQixHQUFtQyxFQUFuQztBQUNBOztBQUNEdEIsTUFBQUEsU0FBUyxDQUFDVSxVQUFWLENBQXFCVyxJQUFyQixDQUEwQnRCLE9BQTFCLENBQWtDLFVBQUNxSixPQUFELEVBQXVCO0FBQ3hEQSxRQUFBQSxPQUFPLENBQUNDLEtBQVIsR0FBZ0IsSUFBaEI7QUFDQSxPQUZEO0FBR0EsS0FkRDtBQWVBOztBQUVELFdBQVNDLHlCQUFULENBQ0NDLFVBREQsRUFFQzdKLFNBRkQsRUFHQ3BCLFVBSEQsRUFJUTtBQUNQaUwsSUFBQUEsVUFBVSxDQUFDeEosT0FBWCxDQUFtQixVQUFBeUosU0FBUyxFQUFJO0FBQy9CQSxNQUFBQSxTQUFTLENBQUN6TCxJQUFWLEdBQWlCMkIsU0FBUyxDQUFDOEosU0FBUyxDQUFDQyxRQUFYLENBQTFCOztBQUNBLFVBQUksQ0FBQ0QsU0FBUyxDQUFDekwsSUFBZixFQUFxQjtBQUNwQnlMLFFBQUFBLFNBQVMsQ0FBQ3pMLElBQVYsR0FBaUIyQixTQUFTLENBQUNMLE9BQU8sQ0FBQ2YsVUFBRCxFQUFha0wsU0FBUyxDQUFDQyxRQUF2QixDQUFSLENBQTFCO0FBQ0E7O0FBQ0QsVUFBSSxDQUFDRCxTQUFTLENBQUNsSSxXQUFmLEVBQTRCO0FBQzNCa0ksUUFBQUEsU0FBUyxDQUFDbEksV0FBVixHQUF3QixFQUF4QjtBQUNBOztBQUNELFVBQUksQ0FBQ2tJLFNBQVMsQ0FBQ3pMLElBQVYsQ0FBZXVELFdBQXBCLEVBQWlDO0FBQ2hDa0ksUUFBQUEsU0FBUyxDQUFDekwsSUFBVixDQUFldUQsV0FBZixHQUE2QixFQUE3QjtBQUNBOztBQUNEa0ksTUFBQUEsU0FBUyxDQUFDekwsSUFBVixDQUFlc0QsSUFBZixDQUFvQnRCLE9BQXBCLENBQTRCLFVBQUNxSixPQUFELEVBQXVCO0FBQ2xEQSxRQUFBQSxPQUFPLENBQUNDLEtBQVIsR0FBZ0IsSUFBaEI7QUFDQSxPQUZEO0FBR0EsS0FkRDtBQWVBOztBQUVELFdBQVNLLDRCQUFULENBQXNDakosV0FBdEMsRUFBaUVmLFNBQWpFLEVBQWlHO0FBQ2hHZSxJQUFBQSxXQUFXLENBQUNWLE9BQVosQ0FBb0IsVUFBQVcsVUFBVSxFQUFJO0FBQ2pDQSxNQUFBQSxVQUFVLENBQUNDLGdCQUFYLENBQTRCWixPQUE1QixDQUFvQyxVQUFBNEosY0FBYyxFQUFJO0FBQ3JELFlBQUksQ0FBQ0EsY0FBYyxDQUFDckksV0FBcEIsRUFBaUM7QUFDaENxSSxVQUFBQSxjQUFjLENBQUNySSxXQUFmLEdBQTZCLEVBQTdCO0FBQ0E7O0FBQ0QsWUFBSXFJLGNBQWMsQ0FBQzVMLElBQWYsQ0FBb0JpQixPQUFwQixDQUE0QixLQUE1QixNQUF1QyxDQUFDLENBQTVDLEVBQStDO0FBQzlDLGNBQUkySyxjQUFjLENBQUM1TCxJQUFmLENBQW9CaUUsVUFBcEIsQ0FBK0IsWUFBL0IsQ0FBSixFQUFrRDtBQUNqRCxnQkFBTTRILGVBQWUsR0FBR0QsY0FBYyxDQUFDNUwsSUFBZixDQUFvQmUsTUFBcEIsQ0FBMkIsRUFBM0IsRUFBK0I2SyxjQUFjLENBQUM1TCxJQUFmLENBQW9Ca0YsTUFBcEIsR0FBNkIsRUFBNUQsQ0FBeEI7QUFDQSxnQkFBTTNDLFdBQVcsR0FBR1osU0FBUyxDQUFDa0ssZUFBRCxDQUE3Qjs7QUFDQSxnQkFBSXRKLFdBQUosRUFBaUI7QUFDZnFKLGNBQUFBLGNBQUQsQ0FBNkJ6RyxVQUE3QixHQUEwQzVDLFdBQTFDO0FBQ0E7QUFDRCxXQU5ELE1BTU87QUFDTixnQkFBTUEsWUFBVyxHQUFHWixTQUFTLENBQUNpSyxjQUFjLENBQUM1TCxJQUFoQixDQUE3Qjs7QUFDQSxnQkFBSXVDLFlBQUosRUFBaUI7QUFDZnFKLGNBQUFBLGNBQUQsQ0FBNkJ6RyxVQUE3QixHQUEwQzVDLFlBQTFDO0FBQ0E7QUFDRDtBQUNEO0FBQ0QsT0FsQkQ7QUFtQkEsS0FwQkQ7QUFxQkE7O0FBRUQsV0FBU3VKLG1CQUFULENBQ0N4SixZQURELEVBRUN5SCxZQUZELEVBR0NwSSxTQUhELEVBSUU7QUFDRFcsSUFBQUEsWUFBWSxDQUFDTixPQUFiLENBQXFCLFVBQUFPLFdBQVcsRUFBSTtBQUNsQ0EsTUFBQUEsV0FBRCxDQUE2QmdCLFdBQTdCLEdBQTJDLEVBQTNDO0FBQ0FoQixNQUFBQSxXQUFXLENBQUNDLFVBQVosQ0FBdUJSLE9BQXZCLENBQStCLFVBQUFTLFFBQVEsRUFBSTtBQUMxQyxZQUFJLENBQUVBLFFBQUQsQ0FBdUJjLFdBQTVCLEVBQXlDO0FBQ3ZDZCxVQUFBQSxRQUFELENBQXVCYyxXQUF2QixHQUFxQyxFQUFyQztBQUNBO0FBQ0QsT0FKRDtBQUtBaEIsTUFBQUEsV0FBVyxDQUFDYSxvQkFBWixHQUFtQ2IsV0FBVyxDQUFDYSxvQkFBWixDQUFpQ3pDLEdBQWpDLENBQXFDLFVBQUFxSixPQUFPLEVBQUk7QUFDbEYsWUFBSSxDQUFFQSxPQUFELENBQWdDekcsV0FBckMsRUFBa0Q7QUFDaER5RyxVQUFBQSxPQUFELENBQWdDekcsV0FBaEMsR0FBOEMsRUFBOUM7QUFDQTs7QUFDRCxZQUFNMEcsVUFBdUMsR0FBRztBQUMvQy9HLFVBQUFBLEtBQUssRUFBRSxvQkFEd0M7QUFFL0NDLFVBQUFBLElBQUksRUFBRTZHLE9BQU8sQ0FBQzdHLElBRmlDO0FBRy9DckIsVUFBQUEsa0JBQWtCLEVBQUVrSSxPQUFPLENBQUNsSSxrQkFIbUI7QUFJL0NvSSxVQUFBQSxPQUFPLEVBQUdGLE9BQUQsQ0FBaUI5RCxjQUFqQixDQUFnQyxTQUFoQyxJQUE4QzhELE9BQUQsQ0FBaUJFLE9BQTlELEdBQXdFekYsU0FKbEM7QUFLL0M7QUFDQTtBQUNBMEYsVUFBQUEsWUFBWSxFQUFHSCxPQUFELENBQWlCOUQsY0FBakIsQ0FBZ0MsY0FBaEMsSUFBbUQ4RCxPQUFELENBQWlCRyxZQUFuRSxHQUFrRixLQVBqRDtBQVEvQ0MsVUFBQUEsY0FBYyxFQUFHSixPQUFELENBQWlCOUQsY0FBakIsQ0FBZ0MsZ0JBQWhDLElBQ1o4RCxPQUFELENBQWlCSSxjQURKLEdBRWIsS0FWNEM7QUFXL0NDLFVBQUFBLHFCQUFxQixFQUFHTCxPQUFELENBQWlCSyxxQkFBakIsR0FDbkJMLE9BQUQsQ0FBaUJLLHFCQURHLEdBRXBCO0FBYjRDLFNBQWhEOztBQWVBLFlBQUtMLE9BQUQsQ0FBdUMzRSxjQUEzQyxFQUEyRDtBQUMxRDRFLFVBQUFBLFVBQVUsQ0FBQzlFLFVBQVgsR0FBd0J4RCxTQUFTLENBQUVxSSxPQUFELENBQWtDM0UsY0FBbkMsQ0FBakM7QUFDQSxTQUZELE1BRU8sSUFBSzJFLE9BQUQsQ0FBa0NNLFlBQXRDLEVBQW9EO0FBQzFELGNBQU1DLGlCQUFpQixHQUFHUixZQUFZLENBQUNoRSxJQUFiLENBQ3pCLFVBQUF5RSxXQUFXO0FBQUEsbUJBQUlBLFdBQVcsQ0FBQzFJLGtCQUFaLEtBQW9Da0ksT0FBRCxDQUFrQ00sWUFBekU7QUFBQSxXQURjLENBQTFCOztBQUdBLGNBQUlDLGlCQUFKLEVBQXVCO0FBQ3RCLGdCQUFNRSxjQUFjLEdBQUdGLGlCQUFpQixDQUFDRSxjQUFsQixDQUFpQzFFLElBQWpDLENBQ3RCLFVBQUEyRSxHQUFHO0FBQUEscUJBQUlBLEdBQUcsQ0FBQ0MsSUFBSixLQUFjWCxPQUFELENBQWtDWSxNQUFuRDtBQUFBLGFBRG1CLENBQXZCOztBQUdBLGdCQUFJSCxjQUFKLEVBQW9CO0FBQ25CUixjQUFBQSxVQUFVLENBQUM5RSxVQUFYLEdBQXdCeEQsU0FBUyxDQUFDOEksY0FBYyxDQUFDekssSUFBaEIsQ0FBakM7QUFDQWlLLGNBQUFBLFVBQVUsQ0FBQ0UsWUFBWCxHQUEwQk0sY0FBYyxDQUFDSSxZQUFmLEtBQWdDLEdBQTFEO0FBQ0E7QUFDRDtBQUNEOztBQUNELFlBQUlaLFVBQVUsQ0FBQzlFLFVBQWYsRUFBMkI7QUFDMUI4RSxVQUFBQSxVQUFVLENBQUM1RSxjQUFYLEdBQTRCNEUsVUFBVSxDQUFDOUUsVUFBWCxDQUFzQnJELGtCQUFsRDtBQUNBOztBQUNELFlBQU1nSixhQUFhLEdBQUdiLFVBQXRCO0FBQ0F0SSxRQUFBQSxTQUFTLENBQUNtSixhQUFhLENBQUNoSixrQkFBZixDQUFULEdBQThDZ0osYUFBOUM7QUFDQSxlQUFPQSxhQUFQO0FBQ0EsT0F6Q2tDLENBQW5DO0FBMENBLEtBakREO0FBa0RBOztBQUVELFdBQVNpQixTQUFULENBQW1CeEwsVUFBbkIsRUFBa0R5TCxTQUFsRCxFQUFxRTtBQUNwRSxRQUFNQyxXQUFXLEdBQUc3TCxLQUFLLENBQUNHLFVBQUQsRUFBYXlMLFNBQWIsQ0FBekI7QUFDQSxRQUFNRSxPQUFPLEdBQUdELFdBQVcsQ0FBQ25MLFdBQVosQ0FBd0IsR0FBeEIsQ0FBaEI7QUFDQSxRQUFJcUwsU0FBUyxHQUFHRixXQUFXLENBQUNsTCxNQUFaLENBQW1CLENBQW5CLEVBQXNCbUwsT0FBdEIsQ0FBaEI7QUFDQSxRQUFJcE0sSUFBSSxHQUFHbU0sV0FBVyxDQUFDbEwsTUFBWixDQUFtQm1MLE9BQU8sR0FBRyxDQUE3QixDQUFYO0FBQ0EsV0FBTyxDQUFDQyxTQUFELEVBQVlyTSxJQUFaLENBQVA7QUFDQTtBQUVEO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQSxXQUFTc00sbUJBQVQsQ0FBNkJDLGVBQTdCLEVBQStEMUssU0FBL0QsRUFBK0Y7QUFDOUYsV0FBTyxTQUFTb0osV0FBVCxDQUEyRHVCLEtBQTNELEVBQStGO0FBQ3JHLFVBQU1DLFVBQVUsR0FBR0QsS0FBSyxDQUFDcEwsS0FBTixDQUFZLEdBQVosQ0FBbkI7O0FBQ0EsVUFBSXFMLFVBQVUsQ0FBQ0MsS0FBWCxPQUF1QixFQUEzQixFQUErQjtBQUM5QixjQUFNLElBQUloRCxLQUFKLENBQVUsZ0NBQVYsQ0FBTjtBQUNBOztBQUNELFVBQU1pRCxhQUFhLEdBQUdGLFVBQVUsQ0FBQ0MsS0FBWCxFQUF0QjtBQUNBLFVBQU12SyxTQUFTLEdBQUdvSyxlQUFlLENBQUN0SyxVQUFoQixDQUEyQmdFLElBQTNCLENBQWdDLFVBQUEyRyxFQUFFO0FBQUEsZUFBSUEsRUFBRSxDQUFDdkosSUFBSCxLQUFZc0osYUFBaEI7QUFBQSxPQUFsQyxDQUFsQjs7QUFDQSxVQUFJLENBQUN4SyxTQUFMLEVBQWdCO0FBQ2YsZUFBTztBQUNOMEIsVUFBQUEsTUFBTSxFQUFFMEksZUFBZSxDQUFDeEssZUFEbEI7QUFFTjhLLFVBQUFBLFVBQVUsRUFBRSxDQUFDTixlQUFlLENBQUN4SyxlQUFqQjtBQUZOLFNBQVA7QUFJQTs7QUFDRCxVQUFJMEssVUFBVSxDQUFDckgsTUFBWCxLQUFzQixDQUExQixFQUE2QjtBQUM1QixlQUFPO0FBQ052QixVQUFBQSxNQUFNLEVBQUUxQixTQURGO0FBRU4wSyxVQUFBQSxVQUFVLEVBQUUsQ0FBQ04sZUFBZSxDQUFDeEssZUFBakIsRUFBa0NJLFNBQWxDO0FBRk4sU0FBUDtBQUlBLE9BTEQsTUFLTztBQUNOLFlBQU0ySyxnQkFBcUIsR0FBR3RJLGFBQWEsQ0FBQzNDLFNBQUQsRUFBWU0sU0FBWixFQUF1QixNQUFNc0ssVUFBVSxDQUFDbEwsSUFBWCxDQUFnQixHQUFoQixDQUE3QixFQUFtRCxLQUFuRCxFQUEwRCxJQUExRCxDQUEzQzs7QUFDQSxZQUFJdUwsZ0JBQWdCLENBQUNqSixNQUFyQixFQUE2QjtBQUM1QmlKLFVBQUFBLGdCQUFnQixDQUFDakgsY0FBakIsQ0FBZ0N0QixJQUFoQyxDQUFxQ3VJLGdCQUFnQixDQUFDakosTUFBdEQ7QUFDQTs7QUFDRCxlQUFPO0FBQ05BLFVBQUFBLE1BQU0sRUFBRWlKLGdCQUFnQixDQUFDakosTUFEbkI7QUFFTmdKLFVBQUFBLFVBQVUsRUFBRUMsZ0JBQWdCLENBQUNqSDtBQUZ2QixTQUFQO0FBSUE7QUFDRCxLQTVCRDtBQTZCQTs7QUFFRCxNQUFJNkMsaUJBQXdDLEdBQUcsRUFBL0M7QUFDQSxNQUFJcEUscUJBQTBCLEdBQUcsRUFBakM7O0FBRU8sV0FBU3lJLFlBQVQsQ0FBc0JuTCxZQUF0QixFQUFtRTtBQUN6RThHLElBQUFBLGlCQUFpQixHQUFHLEVBQXBCO0FBQ0EsUUFBTTdHLFNBQVMsR0FBR0YsY0FBYyxDQUFDQyxZQUFELENBQWhDO0FBQ0FvSSxJQUFBQSwyQkFBMkIsQ0FDMUJwSSxZQUFZLENBQUNFLE1BQWIsQ0FBb0JjLFdBRE0sRUFFMUJoQixZQUFZLENBQUNFLE1BQWIsQ0FBb0JtSSxZQUZNLEVBRzFCcEksU0FIMEIsQ0FBM0I7O0FBS0EsUUFBSSxDQUFFRCxZQUFZLENBQUNFLE1BQWIsQ0FBb0JDLGVBQXJCLENBQXlEMEIsV0FBOUQsRUFBMkU7QUFDekU3QixNQUFBQSxZQUFZLENBQUNFLE1BQWIsQ0FBb0JDLGVBQXJCLENBQXlEMEIsV0FBekQsR0FBdUUsRUFBdkU7QUFDQTs7QUFDRHlILElBQUFBLHVCQUF1QixDQUFDdEosWUFBWSxDQUFDRSxNQUFiLENBQW9CdkIsU0FBckIsRUFBZ0NxQixZQUFZLENBQUNFLE1BQWIsQ0FBb0JNLE9BQXBELEVBQXlFUCxTQUF6RSxDQUF2QjtBQUNBeUosSUFBQUEseUJBQXlCLENBQUMxSixZQUFZLENBQUNFLE1BQWIsQ0FBb0JHLFVBQXJCLEVBQWdESixTQUFoRCxFQUEyREQsWUFBWSxDQUFDbkIsVUFBeEUsQ0FBekI7QUFDQWdMLElBQUFBLHlCQUF5QixDQUFDN0osWUFBWSxDQUFDRSxNQUFiLENBQW9CNEosVUFBckIsRUFBZ0Q3SixTQUFoRCxFQUEyREQsWUFBWSxDQUFDbkIsVUFBeEUsQ0FBekI7QUFDQW9MLElBQUFBLDRCQUE0QixDQUFDakssWUFBWSxDQUFDRSxNQUFiLENBQW9CYyxXQUFyQixFQUFrRGYsU0FBbEQsQ0FBNUI7QUFDQW1LLElBQUFBLG1CQUFtQixDQUFDcEssWUFBWSxDQUFDRSxNQUFiLENBQW9CVSxZQUFyQixFQUFvRFosWUFBWSxDQUFDRSxNQUFiLENBQW9CbUksWUFBeEUsRUFBc0ZwSSxTQUF0RixDQUFuQjtBQUNBLFFBQU04RSxTQUF3QixHQUFHLEVBQWpDO0FBQ0EsUUFBTUMscUJBQXVDLEdBQUcsRUFBaEQ7QUFFQTFELElBQUFBLE1BQU0sQ0FBQ00sSUFBUCxDQUFZNUIsWUFBWSxDQUFDRSxNQUFiLENBQW9CMkIsV0FBaEMsRUFBNkN2QixPQUE3QyxDQUFxRCxVQUFBd0IsZ0JBQWdCLEVBQUk7QUFDeEU5QixNQUFBQSxZQUFZLENBQUNFLE1BQWIsQ0FBb0IyQixXQUFwQixDQUFnQ0MsZ0JBQWhDLEVBQWtEeEIsT0FBbEQsQ0FBMEQsVUFBQXlCLGNBQWMsRUFBSTtBQUMzRSxZQUFNQyxpQkFBaUIsR0FBR3BDLE9BQU8sQ0FBQ0ksWUFBWSxDQUFDbkIsVUFBZCxFQUEwQmtELGNBQWMsQ0FBQ0UsTUFBekMsQ0FBakM7QUFDQSxZQUFNSyxhQUFhLEdBQUdyQyxTQUFTLENBQUMrQixpQkFBRCxDQUEvQjs7QUFDQSxZQUFJLENBQUNNLGFBQUwsRUFBb0I7QUFDbkIsY0FBSU4saUJBQWlCLElBQUlBLGlCQUFpQixDQUFDekMsT0FBbEIsQ0FBMEIsR0FBMUIsTUFBbUMsQ0FBQyxDQUE3RCxFQUFnRTtBQUM5RHdDLFlBQUFBLGNBQUQsQ0FBd0IyRSxRQUF4QixHQUFtQzVFLGdCQUFuQztBQUNBa0QsWUFBQUEscUJBQXFCLENBQUNyQyxJQUF0QixDQUEyQlosY0FBM0I7QUFDQTtBQUNELFNBTEQsTUFLTyxJQUFJLE9BQU9PLGFBQVAsS0FBeUIsUUFBN0IsRUFBdUM7QUFDN0MsY0FBSSxDQUFDQSxhQUFhLENBQUNULFdBQW5CLEVBQWdDO0FBQy9CUyxZQUFBQSxhQUFhLENBQUNULFdBQWQsR0FBNEIsRUFBNUI7QUFDQTs7QUFDREUsVUFBQUEsY0FBYyxDQUFDRixXQUFmLENBQTJCdkIsT0FBM0IsQ0FBbUMsVUFBQTRCLFVBQVUsRUFBSTtBQUFBLDZCQUNwQm1JLFNBQVMsQ0FBQzVMLGlCQUFELEVBQW9CeUQsVUFBVSxDQUFDOUQsSUFBL0IsQ0FEVztBQUFBO0FBQUEsZ0JBQ3pDZ04sUUFEeUM7QUFBQSxnQkFDL0JDLE9BRCtCOztBQUVoRCxnQkFBSSxDQUFDL0ksYUFBYSxDQUFDVCxXQUFkLENBQTBCdUosUUFBMUIsQ0FBTCxFQUEwQztBQUN6QzlJLGNBQUFBLGFBQWEsQ0FBQ1QsV0FBZCxDQUEwQnVKLFFBQTFCLElBQXNDLEVBQXRDO0FBQ0E7O0FBQ0QsZ0JBQUksQ0FBQzlJLGFBQWEsQ0FBQ1QsV0FBZCxDQUEwQnlKLFlBQS9CLEVBQTZDO0FBQzVDaEosY0FBQUEsYUFBYSxDQUFDVCxXQUFkLENBQTBCeUosWUFBMUIsR0FBeUMsRUFBekM7QUFDQTs7QUFFRCxnQkFBTUMsb0JBQW9CLGFBQU1GLE9BQU4sU0FBZ0JuSixVQUFVLENBQUNFLFNBQVgsY0FBMkJGLFVBQVUsQ0FBQ0UsU0FBdEMsSUFBb0QsRUFBcEUsQ0FBMUI7QUFDQUUsWUFBQUEsYUFBYSxDQUFDVCxXQUFkLENBQTBCdUosUUFBMUIsRUFBb0NHLG9CQUFwQyxJQUE0RHhELGlCQUFpQixDQUM1RTdGLFVBRDRFLEVBRTVFbEMsWUFGNEUsRUFHNUVzQyxhQUg0RSxFQUk1RXJDLFNBSjRFLEVBSzVFOEUsU0FMNEUsRUFNNUVqRCxnQkFONEUsRUFPNUVrRCxxQkFQNEUsQ0FBN0U7O0FBU0Esb0JBQVEsT0FBTzFDLGFBQWEsQ0FBQ1QsV0FBZCxDQUEwQnVKLFFBQTFCLEVBQW9DRyxvQkFBcEMsQ0FBZjtBQUNDLG1CQUFLLFFBQUw7QUFDQ2pKLGdCQUFBQSxhQUFhLENBQUNULFdBQWQsQ0FBMEJ1SixRQUExQixFQUFvQ0csb0JBQXBDLElBQTRELElBQUl0RyxNQUFKLENBQzNEM0MsYUFBYSxDQUFDVCxXQUFkLENBQTBCdUosUUFBMUIsRUFBb0NHLG9CQUFwQyxDQUQyRCxDQUE1RDtBQUdBOztBQUNELG1CQUFLLFNBQUw7QUFDQ2pKLGdCQUFBQSxhQUFhLENBQUNULFdBQWQsQ0FBMEJ1SixRQUExQixFQUFvQ0csb0JBQXBDLElBQTRELElBQUlDLE9BQUosQ0FDM0RsSixhQUFhLENBQUNULFdBQWQsQ0FBMEJ1SixRQUExQixFQUFvQ0csb0JBQXBDLENBRDJELENBQTVEO0FBR0E7QUFWRjs7QUFZQSxnQkFDQ2pKLGFBQWEsQ0FBQ1QsV0FBZCxDQUEwQnVKLFFBQTFCLEVBQW9DRyxvQkFBcEMsTUFBOEQsSUFBOUQsSUFDQSxPQUFPakosYUFBYSxDQUFDVCxXQUFkLENBQTBCdUosUUFBMUIsRUFBb0NHLG9CQUFwQyxDQUFQLEtBQXFFLFFBRnRFLEVBR0U7QUFDRGpKLGNBQUFBLGFBQWEsQ0FBQ1QsV0FBZCxDQUEwQnVKLFFBQTFCLEVBQW9DRyxvQkFBcEMsRUFBMERuTixJQUExRCxHQUFpRXdCLE9BQU8sQ0FDdkVuQixpQkFEdUUsWUFFcEUyTSxRQUZvRSxjQUV4REMsT0FGd0QsRUFBeEU7QUFJQS9JLGNBQUFBLGFBQWEsQ0FBQ1QsV0FBZCxDQUEwQnVKLFFBQTFCLEVBQW9DRyxvQkFBcEMsRUFBMERuSixTQUExRCxHQUFzRUYsVUFBVSxDQUFDRSxTQUFqRjtBQUNBRSxjQUFBQSxhQUFhLENBQUNULFdBQWQsQ0FBMEJ1SixRQUExQixFQUFvQ0csb0JBQXBDLEVBQTBEN0UsUUFBMUQsR0FBcUU1RSxnQkFBckU7QUFDQTs7QUFDRCxnQkFBTTJELGdCQUFnQixhQUFNekQsaUJBQU4sY0FBMkJwQyxPQUFPLENBQ3ZEbkIsaUJBRHVELEVBRXZEMk0sUUFBUSxHQUFHLEdBQVgsR0FBaUJHLG9CQUZzQyxDQUFsQyxDQUF0Qjs7QUFJQSxnQkFBSXJKLFVBQVUsQ0FBQ0wsV0FBWCxJQUEwQjBFLEtBQUssQ0FBQ0MsT0FBTixDQUFjdEUsVUFBVSxDQUFDTCxXQUF6QixDQUE5QixFQUFxRTtBQUNwRSxrQkFBTTRFLGlCQUFpQixHQUFHO0FBQ3pCeEUsZ0JBQUFBLE1BQU0sRUFBRXdELGdCQURpQjtBQUV6QjVELGdCQUFBQSxXQUFXLEVBQUVLLFVBQVUsQ0FBQ0wsV0FGQztBQUd6QjZFLGdCQUFBQSxRQUFRLEVBQUU1RTtBQUhlLGVBQTFCO0FBS0FrRCxjQUFBQSxxQkFBcUIsQ0FBQ3JDLElBQXRCLENBQTJCOEQsaUJBQTNCO0FBQ0EsYUFQRCxNQU9PLElBQ052RSxVQUFVLENBQUNMLFdBQVgsSUFDQSxDQUFDUyxhQUFhLENBQUNULFdBQWQsQ0FBMEJ1SixRQUExQixFQUFvQ0csb0JBQXBDLEVBQTBEMUosV0FGckQsRUFHTDtBQUNEUyxjQUFBQSxhQUFhLENBQUNULFdBQWQsQ0FBMEJ1SixRQUExQixFQUFvQ0csb0JBQXBDLEVBQTBEMUosV0FBMUQsR0FBd0VLLFVBQVUsQ0FBQ0wsV0FBbkY7QUFDQTs7QUFDRFMsWUFBQUEsYUFBYSxDQUFDVCxXQUFkLENBQTBCeUosWUFBMUIsV0FBMENGLFFBQTFDLGNBQXNERyxvQkFBdEQsS0FDQ2pKLGFBQWEsQ0FBQ1QsV0FBZCxDQUEwQnVKLFFBQTFCLEVBQW9DRyxvQkFBcEMsQ0FERDtBQUVBdEwsWUFBQUEsU0FBUyxDQUFDd0YsZ0JBQUQsQ0FBVCxHQUE4Qm5ELGFBQWEsQ0FBQ1QsV0FBZCxDQUEwQnVKLFFBQTFCLEVBQW9DRyxvQkFBcEMsQ0FBOUI7QUFDQSxXQTlERDtBQStEQTtBQUNELE9BNUVEO0FBNkVBLEtBOUVEO0FBK0VBLFFBQU1FLDBCQUE0QyxHQUFHLEVBQXJEO0FBQ0F6RyxJQUFBQSxxQkFBcUIsQ0FBQzFFLE9BQXRCLENBQThCLFVBQUF5QixjQUFjLEVBQUk7QUFDL0MsVUFBTUMsaUJBQWlCLEdBQUdwQyxPQUFPLENBQUNJLFlBQVksQ0FBQ25CLFVBQWQsRUFBMEJrRCxjQUFjLENBQUNFLE1BQXpDLENBQWpDOztBQUQrQyxrQ0FFZkQsaUJBQWlCLENBQUN4QyxLQUFsQixDQUF3QixHQUF4QixDQUZlO0FBQUE7QUFBQSxVQUUxQ2tNLE9BRjBDO0FBQUEsVUFFakNDLGNBRmlDOztBQUcvQyxVQUFNQyxXQUFXLEdBQUdELGNBQWMsQ0FBQ25NLEtBQWYsQ0FBcUIsR0FBckIsQ0FBcEI7QUFDQWtNLE1BQUFBLE9BQU8sR0FBR0EsT0FBTyxHQUFHLEdBQVYsR0FBZ0JFLFdBQVcsQ0FBQyxDQUFELENBQXJDO0FBQ0EsVUFBTXRKLGFBQWEsR0FBR3NKLFdBQVcsQ0FBQ0MsS0FBWixDQUFrQixDQUFsQixFQUFxQjdNLE1BQXJCLENBQTRCLFVBQUM4TSxVQUFELEVBQWF6TixJQUFiLEVBQXNCO0FBQ3ZFLFlBQUksQ0FBQ3lOLFVBQUwsRUFBaUI7QUFDaEIsaUJBQU8sSUFBUDtBQUNBOztBQUNELGVBQU9BLFVBQVUsQ0FBQ3pOLElBQUQsQ0FBakI7QUFDQSxPQUxxQixFQUtuQjRCLFNBQVMsQ0FBQ3lMLE9BQUQsQ0FMVSxDQUF0Qjs7QUFNQSxVQUFJLENBQUNwSixhQUFMLEVBQW9CO0FBQ25Cd0UsUUFBQUEsaUJBQWlCLENBQUNuRSxJQUFsQixDQUF1QjtBQUN0QjhCLFVBQUFBLE9BQU8sRUFBRSxrRUFBa0V6QztBQURyRCxTQUF2QixFQURtQixDQUluQjtBQUNBLE9BTEQsTUFLTyxJQUFJLE9BQU9NLGFBQVAsS0FBeUIsUUFBN0IsRUFBdUM7QUFDN0MsWUFBSSxDQUFDQSxhQUFhLENBQUNULFdBQW5CLEVBQWdDO0FBQy9CUyxVQUFBQSxhQUFhLENBQUNULFdBQWQsR0FBNEIsRUFBNUI7QUFDQTs7QUFDREUsUUFBQUEsY0FBYyxDQUFDRixXQUFmLENBQTJCdkIsT0FBM0IsQ0FBbUMsVUFBQTRCLFVBQVUsRUFBSTtBQUFBLDRCQUNwQm1JLFNBQVMsQ0FBQzVMLGlCQUFELEVBQW9CeUQsVUFBVSxDQUFDOUQsSUFBL0IsQ0FEVztBQUFBO0FBQUEsY0FDekNnTixRQUR5QztBQUFBLGNBQy9CQyxPQUQrQjs7QUFFaEQsY0FBSSxDQUFDL0ksYUFBYSxDQUFDVCxXQUFkLENBQTBCdUosUUFBMUIsQ0FBTCxFQUEwQztBQUN6QzlJLFlBQUFBLGFBQWEsQ0FBQ1QsV0FBZCxDQUEwQnVKLFFBQTFCLElBQXNDLEVBQXRDO0FBQ0E7O0FBQ0QsY0FBSSxDQUFDOUksYUFBYSxDQUFDVCxXQUFkLENBQTBCeUosWUFBL0IsRUFBNkM7QUFDNUNoSixZQUFBQSxhQUFhLENBQUNULFdBQWQsQ0FBMEJ5SixZQUExQixHQUF5QyxFQUF6QztBQUNBOztBQUVELGNBQU1DLG9CQUFvQixhQUFNRixPQUFOLFNBQWdCbkosVUFBVSxDQUFDRSxTQUFYLGNBQTJCRixVQUFVLENBQUNFLFNBQXRDLElBQW9ELEVBQXBFLENBQTFCO0FBQ0FFLFVBQUFBLGFBQWEsQ0FBQ1QsV0FBZCxDQUEwQnVKLFFBQTFCLEVBQW9DRyxvQkFBcEMsSUFBNER4RCxpQkFBaUIsQ0FDNUU3RixVQUQ0RSxFQUU1RWxDLFlBRjRFLEVBRzVFc0MsYUFINEUsRUFJNUVyQyxTQUo0RSxFQUs1RThFLFNBTDRFLEVBTTNFaEQsY0FBRCxDQUF3QjJFLFFBTm9ELEVBTzVFK0UsMEJBUDRFLENBQTdFOztBQVNBLGNBQ0NuSixhQUFhLENBQUNULFdBQWQsQ0FBMEJ1SixRQUExQixFQUFvQ0csb0JBQXBDLE1BQThELElBQTlELElBQ0EsT0FBT2pKLGFBQWEsQ0FBQ1QsV0FBZCxDQUEwQnVKLFFBQTFCLEVBQW9DRyxvQkFBcEMsQ0FBUCxLQUFxRSxRQUZ0RSxFQUdFO0FBQ0RqSixZQUFBQSxhQUFhLENBQUNULFdBQWQsQ0FBMEJ1SixRQUExQixFQUFvQ0csb0JBQXBDLEVBQTBEbk4sSUFBMUQsR0FBaUV3QixPQUFPLENBQ3ZFbkIsaUJBRHVFLFlBRXBFMk0sUUFGb0UsY0FFeERDLE9BRndELEVBQXhFO0FBSUEvSSxZQUFBQSxhQUFhLENBQUNULFdBQWQsQ0FBMEJ1SixRQUExQixFQUFvQ0csb0JBQXBDLEVBQTBEbkosU0FBMUQsR0FBc0VGLFVBQVUsQ0FBQ0UsU0FBakY7QUFDQUUsWUFBQUEsYUFBYSxDQUFDVCxXQUFkLENBQTBCdUosUUFBMUIsRUFDQ0csb0JBREQsRUFFRTdFLFFBRkYsR0FFYzNFLGNBQUQsQ0FBd0IyRSxRQUZyQztBQUdBOztBQUNEcEUsVUFBQUEsYUFBYSxDQUFDVCxXQUFkLENBQTBCeUosWUFBMUIsV0FBMENGLFFBQTFDLGNBQXNERyxvQkFBdEQsS0FDQ2pKLGFBQWEsQ0FBQ1QsV0FBZCxDQUEwQnVKLFFBQTFCLEVBQW9DRyxvQkFBcEMsQ0FERDtBQUVBdEwsVUFBQUEsU0FBUyxXQUFJK0IsaUJBQUosY0FBeUJwQyxPQUFPLENBQUNuQixpQkFBRCxFQUFvQjJNLFFBQVEsR0FBRyxHQUFYLEdBQWlCRyxvQkFBckMsQ0FBaEMsRUFBVCxHQUNDakosYUFBYSxDQUFDVCxXQUFkLENBQTBCdUosUUFBMUIsRUFBb0NHLG9CQUFwQyxDQUREO0FBRUEsU0FwQ0Q7QUFxQ0E7QUFDRCxLQTFERDtBQTJEQXhHLElBQUFBLFNBQVMsQ0FBQ3pFLE9BQVYsQ0FBa0IsVUFBQXlMLFdBQVcsRUFBSTtBQUNoQyxVQUFNaEgsU0FBUyxHQUFHZ0gsV0FBVyxDQUFDaEgsU0FBOUI7QUFDQSxVQUFNaUgsU0FBUyxHQUFHakgsU0FBUyxDQUFDeEcsT0FBNUI7QUFDQSxVQUFNME4sY0FBYyxHQUFHaE0sU0FBUyxDQUFDK0wsU0FBRCxDQUFoQztBQUhnQyxVQUl4QjlOLGVBSndCLEdBSVk2RyxTQUpaLENBSXhCN0csZUFKd0I7QUFBQSxVQUlQQyxjQUpPLEdBSVk0RyxTQUpaLENBSVA1RyxjQUpPO0FBS2hDLGFBQU80RyxTQUFTLENBQUM1RyxjQUFqQjtBQUNBLGFBQU80RyxTQUFTLENBQUM3RyxlQUFqQjs7QUFFQSxVQUFJNk4sV0FBVyxDQUFDcEcsTUFBWixJQUFzQixFQUFFc0csY0FBYyxZQUFZaEgsTUFBNUIsQ0FBMUIsRUFBK0Q7QUFDOUQ7QUFDQSxZQUFJckQsSUFBSjs7QUFDQSxhQUFLQSxJQUFMLElBQWFtRCxTQUFiO0FBQXdCLGlCQUFPQSxTQUFTLENBQUNuRCxJQUFELENBQWhCO0FBQXhCOztBQUVBTixRQUFBQSxNQUFNLENBQUNDLE1BQVAsQ0FBY3dELFNBQWQsRUFBeUJrSCxjQUF6QjtBQUNBLE9BTkQsTUFNTztBQUNOO0FBQ0FsSCxRQUFBQSxTQUFTLENBQUN4RyxPQUFWLEdBQW9CME4sY0FBcEI7QUFDQTs7QUFFRCxVQUFJLENBQUNBLGNBQUwsRUFBcUI7QUFDcEJsSCxRQUFBQSxTQUFTLENBQUNtSCxZQUFWLEdBQXlCRixTQUF6Qjs7QUFDQSxZQUFJOU4sZUFBZSxJQUFJQyxjQUF2QixFQUF1QztBQUN0QyxjQUFNc0UsU0FBUyxHQUFHO0FBQ2pCZ0MsWUFBQUEsT0FBTyxFQUNOLDRDQUNBdUgsU0FEQSxHQUVBLElBRkEsR0FHQSxJQUhBLEdBSUEsMEpBSkEsR0FLQSxxQkFMQSxHQU1BOU4sZUFOQSxHQU9BLEdBUEEsR0FRQSxJQVJBLEdBU0EsaUJBVEEsR0FVQUMsY0FWQSxHQVdBLEdBWEEsR0FZQSxJQVpBLEdBYUEsb0JBYkEsR0FjQTZOLFNBZEEsR0FlQTtBQWpCZ0IsV0FBbEI7QUFtQkF4SixVQUFBQSx5QkFBeUIsQ0FBQ3dKLFNBQUQsRUFBWXZKLFNBQVosQ0FBekI7QUFDQSxTQXJCRCxNQXFCTztBQUNOLGNBQU0xQixTQUFRLEdBQUdnRSxTQUFTLENBQUMzRyxJQUEzQjtBQUNBLGNBQU1DLElBQUksR0FBRzBHLFNBQVMsQ0FBQzFHLElBQXZCO0FBQ0EsY0FBTThOLFFBQVEsR0FBR0gsU0FBUyxHQUFHQSxTQUFTLENBQUN4TSxLQUFWLENBQWdCLEdBQWhCLEVBQXFCLENBQXJCLENBQUgsR0FBNkJ3TSxTQUF2RDtBQUNBLGNBQU12SixVQUFTLEdBQUc7QUFDakJnQyxZQUFBQSxPQUFPLEVBQ04sNENBQ0F1SCxTQURBLEdBRUEsSUFGQSxHQUdBLElBSEEsR0FJQSwwSkFKQSxHQUtBLHFCQUxBLEdBTUFHLFFBTkEsR0FPQSxHQVBBLEdBUUEsSUFSQSxHQVNBLDRCQVRBLEdBVUFwTCxTQVZBLEdBV0EsZ0JBWEEsR0FZQTFDLElBWkEsR0FhQTtBQWZnQixXQUFsQjtBQWlCQW1FLFVBQUFBLHlCQUF5QixDQUFDd0osU0FBRCxFQUFZdkosVUFBWixDQUF6QjtBQUNBO0FBQ0Q7QUFDRCxLQWxFRDs7QUFtRUEsU0FBSyxJQUFJMUIsUUFBVCxJQUFxQjJCLHFCQUFyQixFQUE0QztBQUMzQ29FLE1BQUFBLGlCQUFpQixDQUFDbkUsSUFBbEIsQ0FBdUJELHFCQUFxQixDQUFDM0IsUUFBRCxDQUFyQixDQUFnQyxDQUFoQyxDQUF2QjtBQUNBOztBQUNBZixJQUFBQSxZQUFELENBQXNCSyxVQUF0QixHQUFtQ0wsWUFBWSxDQUFDRSxNQUFiLENBQW9CRyxVQUF2RDtBQUVBLFFBQU1zSyxlQUF5QyxHQUFHO0FBQ2pEeUIsTUFBQUEsT0FBTyxFQUFFcE0sWUFBWSxDQUFDb00sT0FEMkI7QUFFakR2SyxNQUFBQSxXQUFXLEVBQUU3QixZQUFZLENBQUNFLE1BQWIsQ0FBb0IyQixXQUZnQjtBQUdqRGxELE1BQUFBLFNBQVMsRUFBRXFCLFlBQVksQ0FBQ0UsTUFBYixDQUFvQnZCLFNBSGtCO0FBSWpEd0IsTUFBQUEsZUFBZSxFQUFFSCxZQUFZLENBQUNFLE1BQWIsQ0FBb0JDLGVBSlk7QUFLakRLLE1BQUFBLE9BQU8sRUFBRVIsWUFBWSxDQUFDRSxNQUFiLENBQW9CTSxPQUxvQjtBQU1qREgsTUFBQUEsVUFBVSxFQUFFTCxZQUFZLENBQUNFLE1BQWIsQ0FBb0JHLFVBTmlCO0FBT2pEeUosTUFBQUEsVUFBVSxFQUFFOUosWUFBWSxDQUFDRSxNQUFiLENBQW9CNEosVUFQaUI7QUFRakQ5SSxNQUFBQSxXQUFXLEVBQUVoQixZQUFZLENBQUNFLE1BQWIsQ0FBb0JjLFdBUmdCO0FBU2pESixNQUFBQSxZQUFZLEVBQUVaLFlBQVksQ0FBQ0UsTUFBYixDQUFvQlUsWUFUZTtBQVVqRC9CLE1BQUFBLFVBQVUsRUFBRUosaUJBVnFDO0FBV2pENE4sTUFBQUEsV0FBVyxFQUFFdkYsaUJBQWlCLENBQUMzQyxNQUFsQjtBQVhvQyxLQUFsRDtBQWFBd0csSUFBQUEsZUFBZSxDQUFDdEIsV0FBaEIsR0FBOEJxQixtQkFBbUIsQ0FBQ0MsZUFBRCxFQUFxQzFLLFNBQXJDLENBQWpEO0FBQ0EsV0FBTzBLLGVBQVA7QUFDQTs7OztBQUVELFdBQVMyQix3QkFBVCxDQUFrQ3pOLFVBQWxDLEVBQTJEUyxLQUEzRCxFQUErRjtBQUM5RixRQUFJaU4sTUFBSjs7QUFDQSxRQUFJLE9BQU9qTixLQUFQLEtBQWlCLFFBQXJCLEVBQStCO0FBQzlCLFVBQU1rTixZQUFZLEdBQUdsTixLQUFLLENBQUNtTixLQUFOLENBQVksZ0JBQVosQ0FBckI7O0FBQ0EsVUFBSUQsWUFBWSxJQUFJM04sVUFBVSxDQUFDd0YsSUFBWCxDQUFnQixVQUFBcUksR0FBRztBQUFBLGVBQUlBLEdBQUcsQ0FBQ2hPLEtBQUosS0FBYzhOLFlBQVksQ0FBQyxDQUFELENBQTlCO0FBQUEsT0FBbkIsQ0FBcEIsRUFBMkU7QUFDMUVELFFBQUFBLE1BQU0sR0FBRztBQUNSak8sVUFBQUEsSUFBSSxFQUFFLFlBREU7QUFFUmdILFVBQUFBLFVBQVUsRUFBRWhHO0FBRkosU0FBVDtBQUlBLE9BTEQsTUFLTztBQUNOaU4sUUFBQUEsTUFBTSxHQUFHO0FBQ1JqTyxVQUFBQSxJQUFJLEVBQUUsUUFERTtBQUVSMkcsVUFBQUEsTUFBTSxFQUFFM0Y7QUFGQSxTQUFUO0FBSUE7QUFDRCxLQWJELE1BYU8sSUFBSWlILEtBQUssQ0FBQ0MsT0FBTixDQUFjbEgsS0FBZCxDQUFKLEVBQTBCO0FBQ2hDaU4sTUFBQUEsTUFBTSxHQUFHO0FBQ1JqTyxRQUFBQSxJQUFJLEVBQUUsWUFERTtBQUVSeUgsUUFBQUEsVUFBVSxFQUFFekcsS0FBSyxDQUFDTCxHQUFOLENBQVUsVUFBQTBOLElBQUk7QUFBQSxpQkFBSUMsaUNBQWlDLENBQUMvTixVQUFELEVBQWE4TixJQUFiLENBQXJDO0FBQUEsU0FBZDtBQUZKLE9BQVQ7QUFJQSxLQUxNLE1BS0EsSUFBSSxPQUFPck4sS0FBUCxLQUFpQixTQUFyQixFQUFnQztBQUN0Q2lOLE1BQUFBLE1BQU0sR0FBRztBQUNSak8sUUFBQUEsSUFBSSxFQUFFLE1BREU7QUFFUjZHLFFBQUFBLElBQUksRUFBRTdGO0FBRkUsT0FBVDtBQUlBLEtBTE0sTUFLQSxJQUFJLE9BQU9BLEtBQVAsS0FBaUIsUUFBckIsRUFBK0I7QUFDckMsVUFBSUEsS0FBSyxDQUFDdU4sUUFBTixPQUFxQnZOLEtBQUssQ0FBQ3dOLE9BQU4sRUFBekIsRUFBMEM7QUFDekNQLFFBQUFBLE1BQU0sR0FBRztBQUNSak8sVUFBQUEsSUFBSSxFQUFFLEtBREU7QUFFUjRHLFVBQUFBLEdBQUcsRUFBRTVGO0FBRkcsU0FBVDtBQUlBLE9BTEQsTUFLTztBQUNOaU4sUUFBQUEsTUFBTSxHQUFHO0FBQ1JqTyxVQUFBQSxJQUFJLEVBQUUsU0FERTtBQUVSOEcsVUFBQUEsT0FBTyxFQUFFOUY7QUFGRCxTQUFUO0FBSUE7QUFDRCxLQVpNLE1BWUEsSUFBSSxPQUFPQSxLQUFQLEtBQWlCLFFBQWpCLElBQTZCQSxLQUFLLENBQUN5TixTQUFuQyxJQUFnRHpOLEtBQUssQ0FBQ3lOLFNBQU4sRUFBcEQsRUFBdUU7QUFDN0VSLE1BQUFBLE1BQU0sR0FBRztBQUNSak8sUUFBQUEsSUFBSSxFQUFFLFNBREU7QUFFUjhHLFFBQUFBLE9BQU8sRUFBRTlGLEtBQUssQ0FBQzBOLE9BQU47QUFGRCxPQUFUO0FBSUEsS0FMTSxNQUtBLElBQUkxTixLQUFLLENBQUNoQixJQUFOLEtBQWUsTUFBbkIsRUFBMkI7QUFDakNpTyxNQUFBQSxNQUFNLEdBQUc7QUFDUmpPLFFBQUFBLElBQUksRUFBRSxNQURFO0FBRVJQLFFBQUFBLElBQUksRUFBRXVCLEtBQUssQ0FBQ2pCO0FBRkosT0FBVDtBQUlBLEtBTE0sTUFLQSxJQUFJaUIsS0FBSyxDQUFDaEIsSUFBTixLQUFlLGdCQUFuQixFQUFxQztBQUMzQ2lPLE1BQUFBLE1BQU0sR0FBRztBQUNSak8sUUFBQUEsSUFBSSxFQUFFLGdCQURFO0FBRVJvSCxRQUFBQSxjQUFjLEVBQUVwRyxLQUFLLENBQUNBO0FBRmQsT0FBVDtBQUlBLEtBTE0sTUFLQSxJQUFJQSxLQUFLLENBQUNoQixJQUFOLEtBQWUsY0FBbkIsRUFBbUM7QUFDekNpTyxNQUFBQSxNQUFNLEdBQUc7QUFDUmpPLFFBQUFBLElBQUksRUFBRSxjQURFO0FBRVJpSCxRQUFBQSxZQUFZLEVBQUVqRyxLQUFLLENBQUNBO0FBRlosT0FBVDtBQUlBLEtBTE0sTUFLQSxJQUFJQSxLQUFLLENBQUNoQixJQUFOLEtBQWUsd0JBQW5CLEVBQTZDO0FBQ25EaU8sTUFBQUEsTUFBTSxHQUFHO0FBQ1JqTyxRQUFBQSxJQUFJLEVBQUUsd0JBREU7QUFFUmtILFFBQUFBLHNCQUFzQixFQUFFbEcsS0FBSyxDQUFDQTtBQUZ0QixPQUFUO0FBSUEsS0FMTSxNQUtBLElBQUlnQyxNQUFNLENBQUMyTCxTQUFQLENBQWlCekksY0FBakIsQ0FBZ0MwSSxJQUFoQyxDQUFxQzVOLEtBQXJDLEVBQTRDLE9BQTVDLENBQUosRUFBMEQ7QUFDaEVpTixNQUFBQSxNQUFNLEdBQUc7QUFDUmpPLFFBQUFBLElBQUksRUFBRSxRQURFO0FBRVJ1SCxRQUFBQSxNQUFNLEVBQUUrRyxpQ0FBaUMsQ0FBQy9OLFVBQUQsRUFBYVMsS0FBYjtBQUZqQyxPQUFUO0FBSUE7O0FBQ0QsV0FBT2lOLE1BQVA7QUFDQTs7QUFFRCxXQUFTSyxpQ0FBVCxDQUNDL04sVUFERCxFQUVDc08sY0FGRCxFQVVhO0FBQ1osUUFBSSxPQUFPQSxjQUFQLEtBQTBCLFFBQTlCLEVBQXdDO0FBQ3ZDLGFBQU9BLGNBQVA7QUFDQSxLQUZELE1BRU8sSUFBSSxPQUFPQSxjQUFQLEtBQTBCLFFBQTlCLEVBQXdDO0FBQzlDLFVBQUlBLGNBQWMsQ0FBQzNJLGNBQWYsQ0FBOEIsT0FBOUIsQ0FBSixFQUE0QztBQUMzQztBQUNBLFlBQU00SSxPQUF5QixHQUFHO0FBQ2pDOU8sVUFBQUEsSUFBSSxFQUFFNk8sY0FBYyxDQUFDOUcsS0FEWTtBQUVqQ00sVUFBQUEsY0FBYyxFQUFFO0FBRmlCLFNBQWxDLENBRjJDLENBTTNDOztBQUNBckYsUUFBQUEsTUFBTSxDQUFDTSxJQUFQLENBQVl1TCxjQUFaLEVBQTRCN00sT0FBNUIsQ0FBb0MsVUFBQStNLGFBQWEsRUFBSTtBQUNwRCxjQUNDQSxhQUFhLEtBQUssT0FBbEIsSUFDQUEsYUFBYSxLQUFLLE1BRGxCLElBRUFBLGFBQWEsS0FBSyxVQUZsQixJQUdBQSxhQUFhLEtBQUssV0FIbEIsSUFJQUEsYUFBYSxLQUFLLGNBSmxCLElBS0FBLGFBQWEsS0FBSyxvQkFMbEIsSUFNQUEsYUFBYSxLQUFLLGFBUG5CLEVBUUU7QUFDRCxnQkFBTS9OLEtBQUssR0FBRzZOLGNBQWMsQ0FBQ0UsYUFBRCxDQUE1QjtBQUNBRCxZQUFBQSxPQUFPLENBQUN6RyxjQUFSLENBQXVCaEUsSUFBdkIsQ0FBNEI7QUFDM0JsQixjQUFBQSxJQUFJLEVBQUU0TCxhQURxQjtBQUUzQi9OLGNBQUFBLEtBQUssRUFBRWdOLHdCQUF3QixDQUFDek4sVUFBRCxFQUFhUyxLQUFiO0FBRkosYUFBNUI7QUFJQSxXQWRELE1BY08sSUFBSStOLGFBQWEsS0FBSyxhQUF0QixFQUFxQztBQUMzQyxnQkFBTXhMLFdBQVcsR0FBR3NMLGNBQWMsQ0FBQ0UsYUFBRCxDQUFsQztBQUNBRCxZQUFBQSxPQUFPLENBQUN2TCxXQUFSLEdBQXNCLEVBQXRCO0FBQ0FQLFlBQUFBLE1BQU0sQ0FBQ00sSUFBUCxDQUFZQyxXQUFaLEVBQ0V5TCxNQURGLENBQ1MsVUFBQUMsR0FBRztBQUFBLHFCQUFJQSxHQUFHLEtBQUssY0FBWjtBQUFBLGFBRFosRUFFRWpOLE9BRkYsQ0FFVSxVQUFBaU4sR0FBRyxFQUFJO0FBQ2ZqTSxjQUFBQSxNQUFNLENBQUNNLElBQVAsQ0FBWUMsV0FBVyxDQUFDMEwsR0FBRCxDQUF2QixFQUE4QmpOLE9BQTlCLENBQXNDLFVBQUFsQyxJQUFJLEVBQUk7QUFBQTs7QUFDN0Msb0JBQU1vUCxnQkFBZ0IsR0FBR0MsdUJBQXVCLENBQUM1TyxVQUFELEVBQWFnRCxXQUFXLENBQUMwTCxHQUFELENBQVgsQ0FBaUJuUCxJQUFqQixDQUFiLENBQWhEOztBQUNBLG9CQUFJLENBQUNvUCxnQkFBZ0IsQ0FBQ3BQLElBQXRCLEVBQTRCO0FBQzNCLHNCQUFNc1AsYUFBYSxHQUFHOU4sT0FBTyxDQUFDZixVQUFELFlBQWdCME8sR0FBaEIsY0FBdUJuUCxJQUF2QixFQUE3Qjs7QUFDQSxzQkFBSXNQLGFBQUosRUFBbUI7QUFDbEIsd0JBQU1DLGNBQWMsR0FBR0QsYUFBYSxDQUFDbE8sS0FBZCxDQUFvQixHQUFwQixDQUF2QjtBQUNBZ08sb0JBQUFBLGdCQUFnQixDQUFDcFAsSUFBakIsR0FBd0J1UCxjQUFjLENBQUMsQ0FBRCxDQUF0Qzs7QUFDQSx3QkFBSUEsY0FBYyxDQUFDbkssTUFBZixHQUF3QixDQUE1QixFQUErQjtBQUM5QmdLLHNCQUFBQSxnQkFBZ0IsQ0FBQ3BMLFNBQWpCLEdBQTZCdUwsY0FBYyxDQUFDLENBQUQsQ0FBM0M7QUFDQTtBQUNEO0FBQ0Q7O0FBQ0Qsd0NBQUFQLE9BQU8sQ0FBQ3ZMLFdBQVIsOEVBQXFCYyxJQUFyQixDQUEwQjZLLGdCQUExQjtBQUNBLGVBYkQ7QUFjQSxhQWpCRjtBQWtCQTtBQUNELFNBckNEO0FBc0NBLGVBQU9KLE9BQVA7QUFDQSxPQTlDRCxNQThDTyxJQUFJRCxjQUFjLENBQUM3TyxJQUFmLEtBQXdCLGNBQTVCLEVBQTRDO0FBQ2xELGVBQU87QUFDTkEsVUFBQUEsSUFBSSxFQUFFLGNBREE7QUFFTmlILFVBQUFBLFlBQVksRUFBRTRILGNBQWMsQ0FBQzdOO0FBRnZCLFNBQVA7QUFJQSxPQUxNLE1BS0EsSUFBSTZOLGNBQWMsQ0FBQzdPLElBQWYsS0FBd0IsZ0JBQTVCLEVBQThDO0FBQ3BELGVBQU87QUFDTkEsVUFBQUEsSUFBSSxFQUFFLGdCQURBO0FBRU5vSCxVQUFBQSxjQUFjLEVBQUV5SCxjQUFjLENBQUM3TjtBQUZ6QixTQUFQO0FBSUEsT0FMTSxNQUtBLElBQUk2TixjQUFjLENBQUM3TyxJQUFmLEtBQXdCLHdCQUE1QixFQUFzRDtBQUM1RCxlQUFPO0FBQ05BLFVBQUFBLElBQUksRUFBRSx3QkFEQTtBQUVOa0gsVUFBQUEsc0JBQXNCLEVBQUUySCxjQUFjLENBQUM3TjtBQUZqQyxTQUFQO0FBSUE7QUFDRDtBQUNEOztBQUVNLFdBQVNtTyx1QkFBVCxDQUFpQzVPLFVBQWpDLEVBQTBEcUQsVUFBMUQsRUFBMEc7QUFDaEgsUUFBTTBMLGNBQTZCLEdBQUc7QUFDckN4UCxNQUFBQSxJQUFJLEVBQUU4RCxVQUFVLENBQUM5RCxJQURvQjtBQUVyQ2dFLE1BQUFBLFNBQVMsRUFBRUYsVUFBVSxDQUFDRTtBQUZlLEtBQXRDOztBQUlBLFFBQUltRSxLQUFLLENBQUNDLE9BQU4sQ0FBY3RFLFVBQWQsQ0FBSixFQUErQjtBQUM5QjtBQUNBLFVBQUlBLFVBQVUsQ0FBQ3NDLGNBQVgsQ0FBMEIsYUFBMUIsQ0FBSixFQUE4QztBQUM3Q29KLFFBQUFBLGNBQWMsQ0FBQy9MLFdBQWYsR0FBNkIsRUFBN0I7QUFDQSxZQUFNZ00sa0JBQWtCLEdBQUkzTCxVQUFELENBQW9CTCxXQUEvQztBQUNBUCxRQUFBQSxNQUFNLENBQUNNLElBQVAsQ0FBWWlNLGtCQUFaLEVBQ0VQLE1BREYsQ0FDUyxVQUFBQyxHQUFHO0FBQUEsaUJBQUlBLEdBQUcsS0FBSyxjQUFaO0FBQUEsU0FEWixFQUVFak4sT0FGRixDQUVVLFVBQUFpTixHQUFHLEVBQUk7QUFDZmpNLFVBQUFBLE1BQU0sQ0FBQ00sSUFBUCxDQUFZaU0sa0JBQWtCLENBQUNOLEdBQUQsQ0FBOUIsRUFBcUNqTixPQUFyQyxDQUE2QyxVQUFBbEMsSUFBSSxFQUFJO0FBQUE7O0FBQ3BELGdCQUFNb1AsZ0JBQWdCLEdBQUdDLHVCQUF1QixDQUFDNU8sVUFBRCxFQUFhZ1Asa0JBQWtCLENBQUNOLEdBQUQsQ0FBbEIsQ0FBd0JuUCxJQUF4QixDQUFiLENBQWhEOztBQUNBLGdCQUFJLENBQUNvUCxnQkFBZ0IsQ0FBQ3BQLElBQXRCLEVBQTRCO0FBQzNCLGtCQUFNc1AsYUFBYSxHQUFHOU4sT0FBTyxDQUFDZixVQUFELFlBQWdCME8sR0FBaEIsY0FBdUJuUCxJQUF2QixFQUE3Qjs7QUFDQSxrQkFBSXNQLGFBQUosRUFBbUI7QUFDbEIsb0JBQU1DLGNBQWMsR0FBR0QsYUFBYSxDQUFDbE8sS0FBZCxDQUFvQixHQUFwQixDQUF2QjtBQUNBZ08sZ0JBQUFBLGdCQUFnQixDQUFDcFAsSUFBakIsR0FBd0J1UCxjQUFjLENBQUMsQ0FBRCxDQUF0Qzs7QUFDQSxvQkFBSUEsY0FBYyxDQUFDbkssTUFBZixHQUF3QixDQUE1QixFQUErQjtBQUM5QmdLLGtCQUFBQSxnQkFBZ0IsQ0FBQ3BMLFNBQWpCLEdBQTZCdUwsY0FBYyxDQUFDLENBQUQsQ0FBM0M7QUFDQTtBQUNEO0FBQ0Q7O0FBQ0QscUNBQUFDLGNBQWMsQ0FBQy9MLFdBQWYsZ0ZBQTRCYyxJQUE1QixDQUFpQzZLLGdCQUFqQztBQUNBLFdBYkQ7QUFjQSxTQWpCRjtBQWtCQTs7QUFDRCw2Q0FDSUksY0FESjtBQUVDM0YsUUFBQUEsVUFBVSxFQUFFL0YsVUFBVSxDQUFDakQsR0FBWCxDQUFlLFVBQUEwTixJQUFJO0FBQUEsaUJBQUlDLGlDQUFpQyxDQUFDL04sVUFBRCxFQUFhOE4sSUFBYixDQUFyQztBQUFBLFNBQW5CO0FBRmI7QUFJQSxLQTVCRCxNQTRCTyxJQUFJekssVUFBVSxDQUFDc0MsY0FBWCxDQUEwQixPQUExQixDQUFKLEVBQXdDO0FBQzlDLDZDQUFZb0osY0FBWjtBQUE0QjVGLFFBQUFBLE1BQU0sRUFBRTRFLGlDQUFpQyxDQUFDL04sVUFBRCxFQUFhcUQsVUFBYjtBQUFyRTtBQUNBLEtBRk0sTUFFQTtBQUNOLDZDQUFZMEwsY0FBWjtBQUE0QnRPLFFBQUFBLEtBQUssRUFBRWdOLHdCQUF3QixDQUFDek4sVUFBRCxFQUFhcUQsVUFBYjtBQUEzRDtBQUNBO0FBQ0QiLCJzb3VyY2VSb290IjoiLiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG5cdEFubm90YXRpb24gYXMgRWRtQW5ub3RhdGlvbixcblx0QW5ub3RhdGlvbkxpc3QsXG5cdEFubm90YXRpb25SZWNvcmQsXG5cdEFubm90YXRpb25UZXJtLFxuXHRDb252ZXJ0ZXJPdXRwdXQsXG5cdEV4cHJlc3Npb24sXG5cdFBhcnNlck91dHB1dCxcblx0UGF0aEV4cHJlc3Npb24sXG5cdFByb3BlcnR5UGF0aCxcblx0UHJvcGVydHlWYWx1ZSxcblx0QW5ub3RhdGlvblBhdGhFeHByZXNzaW9uLFxuXHROYXZpZ2F0aW9uUHJvcGVydHlQYXRoRXhwcmVzc2lvbixcblx0UHJvcGVydHlQYXRoRXhwcmVzc2lvblxufSBmcm9tIFwiQHNhcC11eC92b2NhYnVsYXJpZXMtdHlwZXNcIjtcbmltcG9ydCB7XG5cdEFzc29jaWF0aW9uLFxuXHRHZW5lcmljTmF2aWdhdGlvblByb3BlcnR5LFxuXHRSZWZlcmVuY2UsXG5cdFByb3BlcnR5IGFzIFBhcnNlclByb3BlcnR5LFxuXHRFbnRpdHlUeXBlIGFzIFBhcnNlckVudGl0eVR5cGUsXG5cdENvbXBsZXhUeXBlIGFzIFBhcnNlckNvbXBsZXhUeXBlLFxuXHRWMk5hdmlnYXRpb25Qcm9wZXJ0eSxcblx0VjROYXZpZ2F0aW9uUHJvcGVydHlcbn0gZnJvbSBcIkBzYXAtdXgvdm9jYWJ1bGFyaWVzLXR5cGVzL2Rpc3QvUGFyc2VyXCI7XG5pbXBvcnQge1xuXHRBbm5vdGF0aW9uLFxuXHRFbnRpdHlUeXBlLFxuXHRDb21wbGV4VHlwZSxcblx0QWN0aW9uLFxuXHRFbnRpdHlTZXQsXG5cdFNpbmdsZXRvbixcblx0UHJvcGVydHksXG5cdE5hdmlnYXRpb25Qcm9wZXJ0eSxcblx0RW50aXR5Q29udGFpbmVyLFxuXHRTZXJ2aWNlT2JqZWN0QW5kQW5ub3RhdGlvbixcblx0UmVzb2x1dGlvblRhcmdldFxufSBmcm9tIFwiQHNhcC11eC92b2NhYnVsYXJpZXMtdHlwZXMvZGlzdC9Db252ZXJ0ZXJcIjtcbmltcG9ydCB7IHBhcnNlIH0gZnJvbSBcInRzLW5vZGVcIjtcblxuY2xhc3MgUGF0aCB7XG5cdHBhdGg6IHN0cmluZztcblx0JHRhcmdldDogc3RyaW5nO1xuXHR0eXBlOiBzdHJpbmc7XG5cdGFubm90YXRpb25zVGVybTogc3RyaW5nO1xuXHRhbm5vdGF0aW9uVHlwZTogc3RyaW5nO1xuXHR0ZXJtOiBzdHJpbmc7XG5cblx0Y29uc3RydWN0b3IoXG5cdFx0cGF0aEV4cHJlc3Npb246IFBhdGhFeHByZXNzaW9uLFxuXHRcdHRhcmdldE5hbWU6IHN0cmluZyxcblx0XHRhbm5vdGF0aW9uc1Rlcm06IHN0cmluZyxcblx0XHRhbm5vdGF0aW9uVHlwZTogc3RyaW5nLFxuXHRcdHRlcm06IHN0cmluZ1xuXHQpIHtcblx0XHR0aGlzLnBhdGggPSBwYXRoRXhwcmVzc2lvbi5QYXRoO1xuXHRcdHRoaXMudHlwZSA9IFwiUGF0aFwiO1xuXHRcdHRoaXMuJHRhcmdldCA9IHRhcmdldE5hbWU7XG5cdFx0KHRoaXMudGVybSA9IHRlcm0pLCAodGhpcy5hbm5vdGF0aW9uVHlwZSA9IGFubm90YXRpb25UeXBlKSwgKHRoaXMuYW5ub3RhdGlvbnNUZXJtID0gYW5ub3RhdGlvbnNUZXJtKTtcblx0fVxufVxuXG5lbnVtIFRlcm1Ub1R5cGVzIHtcblx0XCJPcmcuT0RhdGEuQXV0aG9yaXphdGlvbi5WMS5TZWN1cml0eVNjaGVtZXNcIiA9IFwiT3JnLk9EYXRhLkF1dGhvcml6YXRpb24uVjEuU2VjdXJpdHlTY2hlbWVcIixcblx0XCJPcmcuT0RhdGEuQXV0aG9yaXphdGlvbi5WMS5BdXRob3JpemF0aW9uc1wiID0gXCJPcmcuT0RhdGEuQXV0aG9yaXphdGlvbi5WMS5BdXRob3JpemF0aW9uXCIsXG5cdFwiT3JnLk9EYXRhLkNvcmUuVjEuUmV2aXNpb25zXCIgPSBcIk9yZy5PRGF0YS5Db3JlLlYxLlJldmlzaW9uVHlwZVwiLFxuXHRcIk9yZy5PRGF0YS5Db3JlLlYxLkxpbmtzXCIgPSBcIk9yZy5PRGF0YS5Db3JlLlYxLkxpbmtcIixcblx0XCJPcmcuT0RhdGEuQ29yZS5WMS5FeGFtcGxlXCIgPSBcIk9yZy5PRGF0YS5Db3JlLlYxLkV4YW1wbGVWYWx1ZVwiLFxuXHRcIk9yZy5PRGF0YS5Db3JlLlYxLk1lc3NhZ2VzXCIgPSBcIk9yZy5PRGF0YS5Db3JlLlYxLk1lc3NhZ2VUeXBlXCIsXG5cdFwiT3JnLk9EYXRhLkNvcmUuVjEuVmFsdWVFeGNlcHRpb25cIiA9IFwiT3JnLk9EYXRhLkNvcmUuVjEuVmFsdWVFeGNlcHRpb25UeXBlXCIsXG5cdFwiT3JnLk9EYXRhLkNvcmUuVjEuUmVzb3VyY2VFeGNlcHRpb25cIiA9IFwiT3JnLk9EYXRhLkNvcmUuVjEuUmVzb3VyY2VFeGNlcHRpb25UeXBlXCIsXG5cdFwiT3JnLk9EYXRhLkNvcmUuVjEuRGF0YU1vZGlmaWNhdGlvbkV4Y2VwdGlvblwiID0gXCJPcmcuT0RhdGEuQ29yZS5WMS5EYXRhTW9kaWZpY2F0aW9uRXhjZXB0aW9uVHlwZVwiLFxuXHRcIk9yZy5PRGF0YS5Db3JlLlYxLklzTGFuZ3VhZ2VEZXBlbmRlbnRcIiA9IFwiT3JnLk9EYXRhLkNvcmUuVjEuVGFnXCIsXG5cdFwiT3JnLk9EYXRhLkNvcmUuVjEuRGVyZWZlcmVuY2VhYmxlSURzXCIgPSBcIk9yZy5PRGF0YS5Db3JlLlYxLlRhZ1wiLFxuXHRcIk9yZy5PRGF0YS5Db3JlLlYxLkNvbnZlbnRpb25hbElEc1wiID0gXCJPcmcuT0RhdGEuQ29yZS5WMS5UYWdcIixcblx0XCJPcmcuT0RhdGEuQ29yZS5WMS5QZXJtaXNzaW9uc1wiID0gXCJPcmcuT0RhdGEuQ29yZS5WMS5QZXJtaXNzaW9uXCIsXG5cdFwiT3JnLk9EYXRhLkNvcmUuVjEuRGVmYXVsdE5hbWVzcGFjZVwiID0gXCJPcmcuT0RhdGEuQ29yZS5WMS5UYWdcIixcblx0XCJPcmcuT0RhdGEuQ29yZS5WMS5JbW11dGFibGVcIiA9IFwiT3JnLk9EYXRhLkNvcmUuVjEuVGFnXCIsXG5cdFwiT3JnLk9EYXRhLkNvcmUuVjEuQ29tcHV0ZWRcIiA9IFwiT3JnLk9EYXRhLkNvcmUuVjEuVGFnXCIsXG5cdFwiT3JnLk9EYXRhLkNvcmUuVjEuQ29tcHV0ZWREZWZhdWx0VmFsdWVcIiA9IFwiT3JnLk9EYXRhLkNvcmUuVjEuVGFnXCIsXG5cdFwiT3JnLk9EYXRhLkNvcmUuVjEuSXNVUkxcIiA9IFwiT3JnLk9EYXRhLkNvcmUuVjEuVGFnXCIsXG5cdFwiT3JnLk9EYXRhLkNvcmUuVjEuSXNNZWRpYVR5cGVcIiA9IFwiT3JnLk9EYXRhLkNvcmUuVjEuVGFnXCIsXG5cdFwiT3JnLk9EYXRhLkNvcmUuVjEuQ29udGVudERpc3Bvc2l0aW9uXCIgPSBcIk9yZy5PRGF0YS5Db3JlLlYxLkNvbnRlbnREaXNwb3NpdGlvblR5cGVcIixcblx0XCJPcmcuT0RhdGEuQ29yZS5WMS5PcHRpbWlzdGljQ29uY3VycmVuY3lcIiA9IFwiRWRtLlByb3BlcnR5UGF0aFwiLFxuXHRcIk9yZy5PRGF0YS5Db3JlLlYxLkFkZGl0aW9uYWxQcm9wZXJ0aWVzXCIgPSBcIk9yZy5PRGF0YS5Db3JlLlYxLlRhZ1wiLFxuXHRcIk9yZy5PRGF0YS5Db3JlLlYxLkF1dG9FeHBhbmRcIiA9IFwiT3JnLk9EYXRhLkNvcmUuVjEuVGFnXCIsXG5cdFwiT3JnLk9EYXRhLkNvcmUuVjEuQXV0b0V4cGFuZFJlZmVyZW5jZXNcIiA9IFwiT3JnLk9EYXRhLkNvcmUuVjEuVGFnXCIsXG5cdFwiT3JnLk9EYXRhLkNvcmUuVjEuTWF5SW1wbGVtZW50XCIgPSBcIk9yZy5PRGF0YS5Db3JlLlYxLlF1YWxpZmllZFR5cGVOYW1lXCIsXG5cdFwiT3JnLk9EYXRhLkNvcmUuVjEuT3JkZXJlZFwiID0gXCJPcmcuT0RhdGEuQ29yZS5WMS5UYWdcIixcblx0XCJPcmcuT0RhdGEuQ29yZS5WMS5Qb3NpdGlvbmFsSW5zZXJ0XCIgPSBcIk9yZy5PRGF0YS5Db3JlLlYxLlRhZ1wiLFxuXHRcIk9yZy5PRGF0YS5Db3JlLlYxLkFsdGVybmF0ZUtleXNcIiA9IFwiT3JnLk9EYXRhLkNvcmUuVjEuQWx0ZXJuYXRlS2V5XCIsXG5cdFwiT3JnLk9EYXRhLkNvcmUuVjEuT3B0aW9uYWxQYXJhbWV0ZXJcIiA9IFwiT3JnLk9EYXRhLkNvcmUuVjEuT3B0aW9uYWxQYXJhbWV0ZXJUeXBlXCIsXG5cdFwiT3JnLk9EYXRhLkNvcmUuVjEuT3BlcmF0aW9uQXZhaWxhYmxlXCIgPSBcIkVkbS5Cb29sZWFuXCIsXG5cdFwiT3JnLk9EYXRhLkNvcmUuVjEuU3ltYm9saWNOYW1lXCIgPSBcIk9yZy5PRGF0YS5Db3JlLlYxLlNpbXBsZUlkZW50aWZpZXJcIixcblx0XCJPcmcuT0RhdGEuQ2FwYWJpbGl0aWVzLlYxLkNvbmZvcm1hbmNlTGV2ZWxcIiA9IFwiT3JnLk9EYXRhLkNhcGFiaWxpdGllcy5WMS5Db25mb3JtYW5jZUxldmVsVHlwZVwiLFxuXHRcIk9yZy5PRGF0YS5DYXBhYmlsaXRpZXMuVjEuQXN5bmNocm9ub3VzUmVxdWVzdHNTdXBwb3J0ZWRcIiA9IFwiT3JnLk9EYXRhLkNvcmUuVjEuVGFnXCIsXG5cdFwiT3JnLk9EYXRhLkNhcGFiaWxpdGllcy5WMS5CYXRjaENvbnRpbnVlT25FcnJvclN1cHBvcnRlZFwiID0gXCJPcmcuT0RhdGEuQ29yZS5WMS5UYWdcIixcblx0XCJPcmcuT0RhdGEuQ2FwYWJpbGl0aWVzLlYxLklzb2xhdGlvblN1cHBvcnRlZFwiID0gXCJPcmcuT0RhdGEuQ2FwYWJpbGl0aWVzLlYxLklzb2xhdGlvbkxldmVsXCIsXG5cdFwiT3JnLk9EYXRhLkNhcGFiaWxpdGllcy5WMS5Dcm9zc0pvaW5TdXBwb3J0ZWRcIiA9IFwiT3JnLk9EYXRhLkNvcmUuVjEuVGFnXCIsXG5cdFwiT3JnLk9EYXRhLkNhcGFiaWxpdGllcy5WMS5DYWxsYmFja1N1cHBvcnRlZFwiID0gXCJPcmcuT0RhdGEuQ2FwYWJpbGl0aWVzLlYxLkNhbGxiYWNrVHlwZVwiLFxuXHRcIk9yZy5PRGF0YS5DYXBhYmlsaXRpZXMuVjEuQ2hhbmdlVHJhY2tpbmdcIiA9IFwiT3JnLk9EYXRhLkNhcGFiaWxpdGllcy5WMS5DaGFuZ2VUcmFja2luZ1R5cGVcIixcblx0XCJPcmcuT0RhdGEuQ2FwYWJpbGl0aWVzLlYxLkNvdW50UmVzdHJpY3Rpb25zXCIgPSBcIk9yZy5PRGF0YS5DYXBhYmlsaXRpZXMuVjEuQ291bnRSZXN0cmljdGlvbnNUeXBlXCIsXG5cdFwiT3JnLk9EYXRhLkNhcGFiaWxpdGllcy5WMS5OYXZpZ2F0aW9uUmVzdHJpY3Rpb25zXCIgPSBcIk9yZy5PRGF0YS5DYXBhYmlsaXRpZXMuVjEuTmF2aWdhdGlvblJlc3RyaWN0aW9uc1R5cGVcIixcblx0XCJPcmcuT0RhdGEuQ2FwYWJpbGl0aWVzLlYxLkluZGV4YWJsZUJ5S2V5XCIgPSBcIk9yZy5PRGF0YS5Db3JlLlYxLlRhZ1wiLFxuXHRcIk9yZy5PRGF0YS5DYXBhYmlsaXRpZXMuVjEuVG9wU3VwcG9ydGVkXCIgPSBcIk9yZy5PRGF0YS5Db3JlLlYxLlRhZ1wiLFxuXHRcIk9yZy5PRGF0YS5DYXBhYmlsaXRpZXMuVjEuU2tpcFN1cHBvcnRlZFwiID0gXCJPcmcuT0RhdGEuQ29yZS5WMS5UYWdcIixcblx0XCJPcmcuT0RhdGEuQ2FwYWJpbGl0aWVzLlYxLkNvbXB1dGVTdXBwb3J0ZWRcIiA9IFwiT3JnLk9EYXRhLkNvcmUuVjEuVGFnXCIsXG5cdFwiT3JnLk9EYXRhLkNhcGFiaWxpdGllcy5WMS5TZWxlY3RTdXBwb3J0XCIgPSBcIk9yZy5PRGF0YS5DYXBhYmlsaXRpZXMuVjEuU2VsZWN0U3VwcG9ydFR5cGVcIixcblx0XCJPcmcuT0RhdGEuQ2FwYWJpbGl0aWVzLlYxLkJhdGNoU3VwcG9ydGVkXCIgPSBcIk9yZy5PRGF0YS5Db3JlLlYxLlRhZ1wiLFxuXHRcIk9yZy5PRGF0YS5DYXBhYmlsaXRpZXMuVjEuQmF0Y2hTdXBwb3J0XCIgPSBcIk9yZy5PRGF0YS5DYXBhYmlsaXRpZXMuVjEuQmF0Y2hTdXBwb3J0VHlwZVwiLFxuXHRcIk9yZy5PRGF0YS5DYXBhYmlsaXRpZXMuVjEuRmlsdGVyUmVzdHJpY3Rpb25zXCIgPSBcIk9yZy5PRGF0YS5DYXBhYmlsaXRpZXMuVjEuRmlsdGVyUmVzdHJpY3Rpb25zVHlwZVwiLFxuXHRcIk9yZy5PRGF0YS5DYXBhYmlsaXRpZXMuVjEuU29ydFJlc3RyaWN0aW9uc1wiID0gXCJPcmcuT0RhdGEuQ2FwYWJpbGl0aWVzLlYxLlNvcnRSZXN0cmljdGlvbnNUeXBlXCIsXG5cdFwiT3JnLk9EYXRhLkNhcGFiaWxpdGllcy5WMS5FeHBhbmRSZXN0cmljdGlvbnNcIiA9IFwiT3JnLk9EYXRhLkNhcGFiaWxpdGllcy5WMS5FeHBhbmRSZXN0cmljdGlvbnNUeXBlXCIsXG5cdFwiT3JnLk9EYXRhLkNhcGFiaWxpdGllcy5WMS5TZWFyY2hSZXN0cmljdGlvbnNcIiA9IFwiT3JnLk9EYXRhLkNhcGFiaWxpdGllcy5WMS5TZWFyY2hSZXN0cmljdGlvbnNUeXBlXCIsXG5cdFwiT3JnLk9EYXRhLkNhcGFiaWxpdGllcy5WMS5LZXlBc1NlZ21lbnRTdXBwb3J0ZWRcIiA9IFwiT3JnLk9EYXRhLkNvcmUuVjEuVGFnXCIsXG5cdFwiT3JnLk9EYXRhLkNhcGFiaWxpdGllcy5WMS5RdWVyeVNlZ21lbnRTdXBwb3J0ZWRcIiA9IFwiT3JnLk9EYXRhLkNvcmUuVjEuVGFnXCIsXG5cdFwiT3JnLk9EYXRhLkNhcGFiaWxpdGllcy5WMS5JbnNlcnRSZXN0cmljdGlvbnNcIiA9IFwiT3JnLk9EYXRhLkNhcGFiaWxpdGllcy5WMS5JbnNlcnRSZXN0cmljdGlvbnNUeXBlXCIsXG5cdFwiT3JnLk9EYXRhLkNhcGFiaWxpdGllcy5WMS5EZWVwSW5zZXJ0U3VwcG9ydFwiID0gXCJPcmcuT0RhdGEuQ2FwYWJpbGl0aWVzLlYxLkRlZXBJbnNlcnRTdXBwb3J0VHlwZVwiLFxuXHRcIk9yZy5PRGF0YS5DYXBhYmlsaXRpZXMuVjEuVXBkYXRlUmVzdHJpY3Rpb25zXCIgPSBcIk9yZy5PRGF0YS5DYXBhYmlsaXRpZXMuVjEuVXBkYXRlUmVzdHJpY3Rpb25zVHlwZVwiLFxuXHRcIk9yZy5PRGF0YS5DYXBhYmlsaXRpZXMuVjEuRGVlcFVwZGF0ZVN1cHBvcnRcIiA9IFwiT3JnLk9EYXRhLkNhcGFiaWxpdGllcy5WMS5EZWVwVXBkYXRlU3VwcG9ydFR5cGVcIixcblx0XCJPcmcuT0RhdGEuQ2FwYWJpbGl0aWVzLlYxLkRlbGV0ZVJlc3RyaWN0aW9uc1wiID0gXCJPcmcuT0RhdGEuQ2FwYWJpbGl0aWVzLlYxLkRlbGV0ZVJlc3RyaWN0aW9uc1R5cGVcIixcblx0XCJPcmcuT0RhdGEuQ2FwYWJpbGl0aWVzLlYxLkNvbGxlY3Rpb25Qcm9wZXJ0eVJlc3RyaWN0aW9uc1wiID0gXCJPcmcuT0RhdGEuQ2FwYWJpbGl0aWVzLlYxLkNvbGxlY3Rpb25Qcm9wZXJ0eVJlc3RyaWN0aW9uc1R5cGVcIixcblx0XCJPcmcuT0RhdGEuQ2FwYWJpbGl0aWVzLlYxLk9wZXJhdGlvblJlc3RyaWN0aW9uc1wiID0gXCJPcmcuT0RhdGEuQ2FwYWJpbGl0aWVzLlYxLk9wZXJhdGlvblJlc3RyaWN0aW9uc1R5cGVcIixcblx0XCJPcmcuT0RhdGEuQ2FwYWJpbGl0aWVzLlYxLkFubm90YXRpb25WYWx1ZXNJblF1ZXJ5U3VwcG9ydGVkXCIgPSBcIk9yZy5PRGF0YS5Db3JlLlYxLlRhZ1wiLFxuXHRcIk9yZy5PRGF0YS5DYXBhYmlsaXRpZXMuVjEuTW9kaWZpY2F0aW9uUXVlcnlPcHRpb25zXCIgPSBcIk9yZy5PRGF0YS5DYXBhYmlsaXRpZXMuVjEuTW9kaWZpY2F0aW9uUXVlcnlPcHRpb25zVHlwZVwiLFxuXHRcIk9yZy5PRGF0YS5DYXBhYmlsaXRpZXMuVjEuUmVhZFJlc3RyaWN0aW9uc1wiID0gXCJPcmcuT0RhdGEuQ2FwYWJpbGl0aWVzLlYxLlJlYWRSZXN0cmljdGlvbnNUeXBlXCIsXG5cdFwiT3JnLk9EYXRhLkNhcGFiaWxpdGllcy5WMS5DdXN0b21IZWFkZXJzXCIgPSBcIk9yZy5PRGF0YS5DYXBhYmlsaXRpZXMuVjEuQ3VzdG9tUGFyYW1ldGVyXCIsXG5cdFwiT3JnLk9EYXRhLkNhcGFiaWxpdGllcy5WMS5DdXN0b21RdWVyeU9wdGlvbnNcIiA9IFwiT3JnLk9EYXRhLkNhcGFiaWxpdGllcy5WMS5DdXN0b21QYXJhbWV0ZXJcIixcblx0XCJPcmcuT0RhdGEuQ2FwYWJpbGl0aWVzLlYxLk1lZGlhTG9jYXRpb25VcGRhdGVTdXBwb3J0ZWRcIiA9IFwiT3JnLk9EYXRhLkNvcmUuVjEuVGFnXCIsXG5cdFwiT3JnLk9EYXRhLkFnZ3JlZ2F0aW9uLlYxLkFwcGx5U3VwcG9ydGVkXCIgPSBcIk9yZy5PRGF0YS5BZ2dyZWdhdGlvbi5WMS5BcHBseVN1cHBvcnRlZFR5cGVcIixcblx0XCJPcmcuT0RhdGEuQWdncmVnYXRpb24uVjEuR3JvdXBhYmxlXCIgPSBcIk9yZy5PRGF0YS5Db3JlLlYxLlRhZ1wiLFxuXHRcIk9yZy5PRGF0YS5BZ2dyZWdhdGlvbi5WMS5BZ2dyZWdhdGFibGVcIiA9IFwiT3JnLk9EYXRhLkNvcmUuVjEuVGFnXCIsXG5cdFwiT3JnLk9EYXRhLkFnZ3JlZ2F0aW9uLlYxLkNvbnRleHREZWZpbmluZ1Byb3BlcnRpZXNcIiA9IFwiRWRtLlByb3BlcnR5UGF0aFwiLFxuXHRcIk9yZy5PRGF0YS5BZ2dyZWdhdGlvbi5WMS5MZXZlbGVkSGllcmFyY2h5XCIgPSBcIkVkbS5Qcm9wZXJ0eVBhdGhcIixcblx0XCJPcmcuT0RhdGEuQWdncmVnYXRpb24uVjEuUmVjdXJzaXZlSGllcmFyY2h5XCIgPSBcIk9yZy5PRGF0YS5BZ2dyZWdhdGlvbi5WMS5SZWN1cnNpdmVIaWVyYXJjaHlUeXBlXCIsXG5cdFwiT3JnLk9EYXRhLkFnZ3JlZ2F0aW9uLlYxLkF2YWlsYWJsZU9uQWdncmVnYXRlc1wiID0gXCJPcmcuT0RhdGEuQWdncmVnYXRpb24uVjEuQXZhaWxhYmxlT25BZ2dyZWdhdGVzVHlwZVwiLFxuXHRcIk9yZy5PRGF0YS5WYWxpZGF0aW9uLlYxLk1pbmltdW1cIiA9IFwiRWRtLlByaW1pdGl2ZVR5cGVcIixcblx0XCJPcmcuT0RhdGEuVmFsaWRhdGlvbi5WMS5NYXhpbXVtXCIgPSBcIkVkbS5QcmltaXRpdmVUeXBlXCIsXG5cdFwiT3JnLk9EYXRhLlZhbGlkYXRpb24uVjEuRXhjbHVzaXZlXCIgPSBcIk9yZy5PRGF0YS5Db3JlLlYxLlRhZ1wiLFxuXHRcIk9yZy5PRGF0YS5WYWxpZGF0aW9uLlYxLkFsbG93ZWRWYWx1ZXNcIiA9IFwiT3JnLk9EYXRhLlZhbGlkYXRpb24uVjEuQWxsb3dlZFZhbHVlXCIsXG5cdFwiT3JnLk9EYXRhLlZhbGlkYXRpb24uVjEuTXVsdGlwbGVPZlwiID0gXCJFZG0uRGVjaW1hbFwiLFxuXHRcIk9yZy5PRGF0YS5WYWxpZGF0aW9uLlYxLkNvbnN0cmFpbnRcIiA9IFwiT3JnLk9EYXRhLlZhbGlkYXRpb24uVjEuQ29uc3RyYWludFR5cGVcIixcblx0XCJPcmcuT0RhdGEuVmFsaWRhdGlvbi5WMS5JdGVtc09mXCIgPSBcIk9yZy5PRGF0YS5WYWxpZGF0aW9uLlYxLkl0ZW1zT2ZUeXBlXCIsXG5cdFwiT3JnLk9EYXRhLlZhbGlkYXRpb24uVjEuT3BlblByb3BlcnR5VHlwZUNvbnN0cmFpbnRcIiA9IFwiT3JnLk9EYXRhLkNvcmUuVjEuUXVhbGlmaWVkVHlwZU5hbWVcIixcblx0XCJPcmcuT0RhdGEuVmFsaWRhdGlvbi5WMS5EZXJpdmVkVHlwZUNvbnN0cmFpbnRcIiA9IFwiT3JnLk9EYXRhLkNvcmUuVjEuUXVhbGlmaWVkVHlwZU5hbWVcIixcblx0XCJPcmcuT0RhdGEuVmFsaWRhdGlvbi5WMS5BbGxvd2VkVGVybXNcIiA9IFwiT3JnLk9EYXRhLkNvcmUuVjEuUXVhbGlmaWVkVGVybU5hbWVcIixcblx0XCJPcmcuT0RhdGEuVmFsaWRhdGlvbi5WMS5BcHBsaWNhYmxlVGVybXNcIiA9IFwiT3JnLk9EYXRhLkNvcmUuVjEuUXVhbGlmaWVkVGVybU5hbWVcIixcblx0XCJPcmcuT0RhdGEuVmFsaWRhdGlvbi5WMS5NYXhJdGVtc1wiID0gXCJFZG0uSW50NjRcIixcblx0XCJPcmcuT0RhdGEuVmFsaWRhdGlvbi5WMS5NaW5JdGVtc1wiID0gXCJFZG0uSW50NjRcIixcblx0XCJPcmcuT0RhdGEuTWVhc3VyZXMuVjEuU2NhbGVcIiA9IFwiRWRtLkJ5dGVcIixcblx0XCJPcmcuT0RhdGEuTWVhc3VyZXMuVjEuRHVyYXRpb25HcmFudWxhcml0eVwiID0gXCJPcmcuT0RhdGEuTWVhc3VyZXMuVjEuRHVyYXRpb25HcmFudWxhcml0eVR5cGVcIixcblx0XCJjb20uc2FwLnZvY2FidWxhcmllcy5BbmFseXRpY3MudjEuRGltZW5zaW9uXCIgPSBcIk9yZy5PRGF0YS5Db3JlLlYxLlRhZ1wiLFxuXHRcImNvbS5zYXAudm9jYWJ1bGFyaWVzLkFuYWx5dGljcy52MS5NZWFzdXJlXCIgPSBcIk9yZy5PRGF0YS5Db3JlLlYxLlRhZ1wiLFxuXHRcImNvbS5zYXAudm9jYWJ1bGFyaWVzLkFuYWx5dGljcy52MS5BY2N1bXVsYXRpdmVNZWFzdXJlXCIgPSBcIk9yZy5PRGF0YS5Db3JlLlYxLlRhZ1wiLFxuXHRcImNvbS5zYXAudm9jYWJ1bGFyaWVzLkFuYWx5dGljcy52MS5Sb2xsZWRVcFByb3BlcnR5Q291bnRcIiA9IFwiRWRtLkludDE2XCIsXG5cdFwiY29tLnNhcC52b2NhYnVsYXJpZXMuQW5hbHl0aWNzLnYxLlBsYW5uaW5nQWN0aW9uXCIgPSBcIk9yZy5PRGF0YS5Db3JlLlYxLlRhZ1wiLFxuXHRcImNvbS5zYXAudm9jYWJ1bGFyaWVzLkFuYWx5dGljcy52MS5BZ2dyZWdhdGVkUHJvcGVydGllc1wiID0gXCJjb20uc2FwLnZvY2FidWxhcmllcy5BbmFseXRpY3MudjEuQWdncmVnYXRlZFByb3BlcnR5VHlwZVwiLFxuXHRcImNvbS5zYXAudm9jYWJ1bGFyaWVzLkNvbW1vbi52MS5TZXJ2aWNlVmVyc2lvblwiID0gXCJFZG0uSW50MzJcIixcblx0XCJjb20uc2FwLnZvY2FidWxhcmllcy5Db21tb24udjEuU2VydmljZVNjaGVtYVZlcnNpb25cIiA9IFwiRWRtLkludDMyXCIsXG5cdFwiY29tLnNhcC52b2NhYnVsYXJpZXMuQ29tbW9uLnYxLlRleHRGb3JcIiA9IFwiRWRtLlByb3BlcnR5UGF0aFwiLFxuXHRcImNvbS5zYXAudm9jYWJ1bGFyaWVzLkNvbW1vbi52MS5Jc0xhbmd1YWdlSWRlbnRpZmllclwiID0gXCJPcmcuT0RhdGEuQ29yZS5WMS5UYWdcIixcblx0XCJjb20uc2FwLnZvY2FidWxhcmllcy5Db21tb24udjEuVGV4dEZvcm1hdFwiID0gXCJjb20uc2FwLnZvY2FidWxhcmllcy5Db21tb24udjEuVGV4dEZvcm1hdFR5cGVcIixcblx0XCJjb20uc2FwLnZvY2FidWxhcmllcy5Db21tb24udjEuSXNEaWdpdFNlcXVlbmNlXCIgPSBcIk9yZy5PRGF0YS5Db3JlLlYxLlRhZ1wiLFxuXHRcImNvbS5zYXAudm9jYWJ1bGFyaWVzLkNvbW1vbi52MS5Jc1VwcGVyQ2FzZVwiID0gXCJPcmcuT0RhdGEuQ29yZS5WMS5UYWdcIixcblx0XCJjb20uc2FwLnZvY2FidWxhcmllcy5Db21tb24udjEuSXNDdXJyZW5jeVwiID0gXCJPcmcuT0RhdGEuQ29yZS5WMS5UYWdcIixcblx0XCJjb20uc2FwLnZvY2FidWxhcmllcy5Db21tb24udjEuSXNVbml0XCIgPSBcIk9yZy5PRGF0YS5Db3JlLlYxLlRhZ1wiLFxuXHRcImNvbS5zYXAudm9jYWJ1bGFyaWVzLkNvbW1vbi52MS5Vbml0U3BlY2lmaWNTY2FsZVwiID0gXCJFZG0uUHJpbWl0aXZlVHlwZVwiLFxuXHRcImNvbS5zYXAudm9jYWJ1bGFyaWVzLkNvbW1vbi52MS5Vbml0U3BlY2lmaWNQcmVjaXNpb25cIiA9IFwiRWRtLlByaW1pdGl2ZVR5cGVcIixcblx0XCJjb20uc2FwLnZvY2FidWxhcmllcy5Db21tb24udjEuU2Vjb25kYXJ5S2V5XCIgPSBcIkVkbS5Qcm9wZXJ0eVBhdGhcIixcblx0XCJjb20uc2FwLnZvY2FidWxhcmllcy5Db21tb24udjEuTWluT2NjdXJzXCIgPSBcIkVkbS5JbnQ2NFwiLFxuXHRcImNvbS5zYXAudm9jYWJ1bGFyaWVzLkNvbW1vbi52MS5NYXhPY2N1cnNcIiA9IFwiRWRtLkludDY0XCIsXG5cdFwiY29tLnNhcC52b2NhYnVsYXJpZXMuQ29tbW9uLnYxLkFzc29jaWF0aW9uRW50aXR5XCIgPSBcIkVkbS5OYXZpZ2F0aW9uUHJvcGVydHlQYXRoXCIsXG5cdFwiY29tLnNhcC52b2NhYnVsYXJpZXMuQ29tbW9uLnYxLkRlcml2ZWROYXZpZ2F0aW9uXCIgPSBcIkVkbS5OYXZpZ2F0aW9uUHJvcGVydHlQYXRoXCIsXG5cdFwiY29tLnNhcC52b2NhYnVsYXJpZXMuQ29tbW9uLnYxLk1hc2tlZFwiID0gXCJPcmcuT0RhdGEuQ29yZS5WMS5UYWdcIixcblx0XCJjb20uc2FwLnZvY2FidWxhcmllcy5Db21tb24udjEuTWFza2VkQWx3YXlzXCIgPSBcIk9yZy5PRGF0YS5Db3JlLlYxLlRhZ1wiLFxuXHRcImNvbS5zYXAudm9jYWJ1bGFyaWVzLkNvbW1vbi52MS5TZW1hbnRpY09iamVjdE1hcHBpbmdcIiA9IFwiY29tLnNhcC52b2NhYnVsYXJpZXMuQ29tbW9uLnYxLlNlbWFudGljT2JqZWN0TWFwcGluZ1R5cGVcIixcblx0XCJjb20uc2FwLnZvY2FidWxhcmllcy5Db21tb24udjEuSXNJbnN0YW5jZUFubm90YXRpb25cIiA9IFwiT3JnLk9EYXRhLkNvcmUuVjEuVGFnXCIsXG5cdFwiY29tLnNhcC52b2NhYnVsYXJpZXMuQ29tbW9uLnYxLkZpbHRlckV4cHJlc3Npb25SZXN0cmljdGlvbnNcIiA9IFwiY29tLnNhcC52b2NhYnVsYXJpZXMuQ29tbW9uLnYxLkZpbHRlckV4cHJlc3Npb25SZXN0cmljdGlvblR5cGVcIixcblx0XCJjb20uc2FwLnZvY2FidWxhcmllcy5Db21tb24udjEuRmllbGRDb250cm9sXCIgPSBcImNvbS5zYXAudm9jYWJ1bGFyaWVzLkNvbW1vbi52MS5GaWVsZENvbnRyb2xUeXBlXCIsXG5cdFwiY29tLnNhcC52b2NhYnVsYXJpZXMuQ29tbW9uLnYxLkFwcGxpY2F0aW9uXCIgPSBcImNvbS5zYXAudm9jYWJ1bGFyaWVzLkNvbW1vbi52MS5BcHBsaWNhdGlvblR5cGVcIixcblx0XCJjb20uc2FwLnZvY2FidWxhcmllcy5Db21tb24udjEuVGltZXN0YW1wXCIgPSBcIkVkbS5EYXRlVGltZU9mZnNldFwiLFxuXHRcImNvbS5zYXAudm9jYWJ1bGFyaWVzLkNvbW1vbi52MS5FcnJvclJlc29sdXRpb25cIiA9IFwiY29tLnNhcC52b2NhYnVsYXJpZXMuQ29tbW9uLnYxLkVycm9yUmVzb2x1dGlvblR5cGVcIixcblx0XCJjb20uc2FwLnZvY2FidWxhcmllcy5Db21tb24udjEuTWVzc2FnZXNcIiA9IFwiRWRtLkNvbXBsZXhUeXBlXCIsXG5cdFwiY29tLnNhcC52b2NhYnVsYXJpZXMuQ29tbW9uLnYxLm51bWVyaWNTZXZlcml0eVwiID0gXCJjb20uc2FwLnZvY2FidWxhcmllcy5Db21tb24udjEuTnVtZXJpY01lc3NhZ2VTZXZlcml0eVR5cGVcIixcblx0XCJjb20uc2FwLnZvY2FidWxhcmllcy5Db21tb24udjEuTWF4aW11bU51bWVyaWNNZXNzYWdlU2V2ZXJpdHlcIiA9IFwiY29tLnNhcC52b2NhYnVsYXJpZXMuQ29tbW9uLnYxLk51bWVyaWNNZXNzYWdlU2V2ZXJpdHlUeXBlXCIsXG5cdFwiY29tLnNhcC52b2NhYnVsYXJpZXMuQ29tbW9uLnYxLklzQWN0aW9uQ3JpdGljYWxcIiA9IFwiRWRtLkJvb2xlYW5cIixcblx0XCJjb20uc2FwLnZvY2FidWxhcmllcy5Db21tb24udjEuQXR0cmlidXRlc1wiID0gXCJFZG0uUHJvcGVydHlQYXRoXCIsXG5cdFwiY29tLnNhcC52b2NhYnVsYXJpZXMuQ29tbW9uLnYxLlJlbGF0ZWRSZWN1cnNpdmVIaWVyYXJjaHlcIiA9IFwiRWRtLkFubm90YXRpb25QYXRoXCIsXG5cdFwiY29tLnNhcC52b2NhYnVsYXJpZXMuQ29tbW9uLnYxLkludGVydmFsXCIgPSBcImNvbS5zYXAudm9jYWJ1bGFyaWVzLkNvbW1vbi52MS5JbnRlcnZhbFR5cGVcIixcblx0XCJjb20uc2FwLnZvY2FidWxhcmllcy5Db21tb24udjEuUmVzdWx0Q29udGV4dFwiID0gXCJPcmcuT0RhdGEuQ29yZS5WMS5UYWdcIixcblx0XCJjb20uc2FwLnZvY2FidWxhcmllcy5Db21tb24udjEuV2Vha1JlZmVyZW50aWFsQ29uc3RyYWludFwiID0gXCJjb20uc2FwLnZvY2FidWxhcmllcy5Db21tb24udjEuV2Vha1JlZmVyZW50aWFsQ29uc3RyYWludFR5cGVcIixcblx0XCJjb20uc2FwLnZvY2FidWxhcmllcy5Db21tb24udjEuSXNOYXR1cmFsUGVyc29uXCIgPSBcIk9yZy5PRGF0YS5Db3JlLlYxLlRhZ1wiLFxuXHRcImNvbS5zYXAudm9jYWJ1bGFyaWVzLkNvbW1vbi52MS5WYWx1ZUxpc3RcIiA9IFwiY29tLnNhcC52b2NhYnVsYXJpZXMuQ29tbW9uLnYxLlZhbHVlTGlzdFR5cGVcIixcblx0XCJjb20uc2FwLnZvY2FidWxhcmllcy5Db21tb24udjEuVmFsdWVMaXN0UmVsZXZhbnRRdWFsaWZpZXJzXCIgPSBcImNvbS5zYXAudm9jYWJ1bGFyaWVzLkNvbW1vbi52MS5TaW1wbGVJZGVudGlmaWVyXCIsXG5cdFwiY29tLnNhcC52b2NhYnVsYXJpZXMuQ29tbW9uLnYxLlZhbHVlTGlzdFdpdGhGaXhlZFZhbHVlc1wiID0gXCJPcmcuT0RhdGEuQ29yZS5WMS5UYWdcIixcblx0XCJjb20uc2FwLnZvY2FidWxhcmllcy5Db21tb24udjEuVmFsdWVMaXN0TWFwcGluZ1wiID0gXCJjb20uc2FwLnZvY2FidWxhcmllcy5Db21tb24udjEuVmFsdWVMaXN0TWFwcGluZ1R5cGVcIixcblx0XCJjb20uc2FwLnZvY2FidWxhcmllcy5Db21tb24udjEuSXNDYWxlbmRhclllYXJcIiA9IFwiT3JnLk9EYXRhLkNvcmUuVjEuVGFnXCIsXG5cdFwiY29tLnNhcC52b2NhYnVsYXJpZXMuQ29tbW9uLnYxLklzQ2FsZW5kYXJIYWxmeWVhclwiID0gXCJPcmcuT0RhdGEuQ29yZS5WMS5UYWdcIixcblx0XCJjb20uc2FwLnZvY2FidWxhcmllcy5Db21tb24udjEuSXNDYWxlbmRhclF1YXJ0ZXJcIiA9IFwiT3JnLk9EYXRhLkNvcmUuVjEuVGFnXCIsXG5cdFwiY29tLnNhcC52b2NhYnVsYXJpZXMuQ29tbW9uLnYxLklzQ2FsZW5kYXJNb250aFwiID0gXCJPcmcuT0RhdGEuQ29yZS5WMS5UYWdcIixcblx0XCJjb20uc2FwLnZvY2FidWxhcmllcy5Db21tb24udjEuSXNDYWxlbmRhcldlZWtcIiA9IFwiT3JnLk9EYXRhLkNvcmUuVjEuVGFnXCIsXG5cdFwiY29tLnNhcC52b2NhYnVsYXJpZXMuQ29tbW9uLnYxLklzRGF5T2ZDYWxlbmRhck1vbnRoXCIgPSBcIk9yZy5PRGF0YS5Db3JlLlYxLlRhZ1wiLFxuXHRcImNvbS5zYXAudm9jYWJ1bGFyaWVzLkNvbW1vbi52MS5Jc0RheU9mQ2FsZW5kYXJZZWFyXCIgPSBcIk9yZy5PRGF0YS5Db3JlLlYxLlRhZ1wiLFxuXHRcImNvbS5zYXAudm9jYWJ1bGFyaWVzLkNvbW1vbi52MS5Jc0NhbGVuZGFyWWVhckhhbGZ5ZWFyXCIgPSBcIk9yZy5PRGF0YS5Db3JlLlYxLlRhZ1wiLFxuXHRcImNvbS5zYXAudm9jYWJ1bGFyaWVzLkNvbW1vbi52MS5Jc0NhbGVuZGFyWWVhclF1YXJ0ZXJcIiA9IFwiT3JnLk9EYXRhLkNvcmUuVjEuVGFnXCIsXG5cdFwiY29tLnNhcC52b2NhYnVsYXJpZXMuQ29tbW9uLnYxLklzQ2FsZW5kYXJZZWFyTW9udGhcIiA9IFwiT3JnLk9EYXRhLkNvcmUuVjEuVGFnXCIsXG5cdFwiY29tLnNhcC52b2NhYnVsYXJpZXMuQ29tbW9uLnYxLklzQ2FsZW5kYXJZZWFyV2Vla1wiID0gXCJPcmcuT0RhdGEuQ29yZS5WMS5UYWdcIixcblx0XCJjb20uc2FwLnZvY2FidWxhcmllcy5Db21tb24udjEuSXNDYWxlbmRhckRhdGVcIiA9IFwiT3JnLk9EYXRhLkNvcmUuVjEuVGFnXCIsXG5cdFwiY29tLnNhcC52b2NhYnVsYXJpZXMuQ29tbW9uLnYxLklzRmlzY2FsWWVhclwiID0gXCJPcmcuT0RhdGEuQ29yZS5WMS5UYWdcIixcblx0XCJjb20uc2FwLnZvY2FidWxhcmllcy5Db21tb24udjEuSXNGaXNjYWxQZXJpb2RcIiA9IFwiT3JnLk9EYXRhLkNvcmUuVjEuVGFnXCIsXG5cdFwiY29tLnNhcC52b2NhYnVsYXJpZXMuQ29tbW9uLnYxLklzRmlzY2FsWWVhclBlcmlvZFwiID0gXCJPcmcuT0RhdGEuQ29yZS5WMS5UYWdcIixcblx0XCJjb20uc2FwLnZvY2FidWxhcmllcy5Db21tb24udjEuSXNGaXNjYWxRdWFydGVyXCIgPSBcIk9yZy5PRGF0YS5Db3JlLlYxLlRhZ1wiLFxuXHRcImNvbS5zYXAudm9jYWJ1bGFyaWVzLkNvbW1vbi52MS5Jc0Zpc2NhbFllYXJRdWFydGVyXCIgPSBcIk9yZy5PRGF0YS5Db3JlLlYxLlRhZ1wiLFxuXHRcImNvbS5zYXAudm9jYWJ1bGFyaWVzLkNvbW1vbi52MS5Jc0Zpc2NhbFdlZWtcIiA9IFwiT3JnLk9EYXRhLkNvcmUuVjEuVGFnXCIsXG5cdFwiY29tLnNhcC52b2NhYnVsYXJpZXMuQ29tbW9uLnYxLklzRmlzY2FsWWVhcldlZWtcIiA9IFwiT3JnLk9EYXRhLkNvcmUuVjEuVGFnXCIsXG5cdFwiY29tLnNhcC52b2NhYnVsYXJpZXMuQ29tbW9uLnYxLklzRGF5T2ZGaXNjYWxZZWFyXCIgPSBcIk9yZy5PRGF0YS5Db3JlLlYxLlRhZ1wiLFxuXHRcImNvbS5zYXAudm9jYWJ1bGFyaWVzLkNvbW1vbi52MS5Jc0Zpc2NhbFllYXJWYXJpYW50XCIgPSBcIk9yZy5PRGF0YS5Db3JlLlYxLlRhZ1wiLFxuXHRcImNvbS5zYXAudm9jYWJ1bGFyaWVzLkNvbW1vbi52MS5NdXR1YWxseUV4Y2x1c2l2ZVRlcm1cIiA9IFwiT3JnLk9EYXRhLkNvcmUuVjEuVGFnXCIsXG5cdFwiY29tLnNhcC52b2NhYnVsYXJpZXMuQ29tbW9uLnYxLkRyYWZ0Um9vdFwiID0gXCJjb20uc2FwLnZvY2FidWxhcmllcy5Db21tb24udjEuRHJhZnRSb290VHlwZVwiLFxuXHRcImNvbS5zYXAudm9jYWJ1bGFyaWVzLkNvbW1vbi52MS5EcmFmdE5vZGVcIiA9IFwiY29tLnNhcC52b2NhYnVsYXJpZXMuQ29tbW9uLnYxLkRyYWZ0Tm9kZVR5cGVcIixcblx0XCJjb20uc2FwLnZvY2FidWxhcmllcy5Db21tb24udjEuRHJhZnRBY3RpdmF0aW9uVmlhXCIgPSBcImNvbS5zYXAudm9jYWJ1bGFyaWVzLkNvbW1vbi52MS5TaW1wbGVJZGVudGlmaWVyXCIsXG5cdFwiY29tLnNhcC52b2NhYnVsYXJpZXMuQ29tbW9uLnYxLkVkaXRhYmxlRmllbGRGb3JcIiA9IFwiRWRtLlByb3BlcnR5UGF0aFwiLFxuXHRcImNvbS5zYXAudm9jYWJ1bGFyaWVzLkNvbW1vbi52MS5TZW1hbnRpY0tleVwiID0gXCJFZG0uUHJvcGVydHlQYXRoXCIsXG5cdFwiY29tLnNhcC52b2NhYnVsYXJpZXMuQ29tbW9uLnYxLlNpZGVFZmZlY3RzXCIgPSBcImNvbS5zYXAudm9jYWJ1bGFyaWVzLkNvbW1vbi52MS5TaWRlRWZmZWN0c1R5cGVcIixcblx0XCJjb20uc2FwLnZvY2FidWxhcmllcy5Db21tb24udjEuRGVmYXVsdFZhbHVlc0Z1bmN0aW9uXCIgPSBcImNvbS5zYXAudm9jYWJ1bGFyaWVzLkNvbW1vbi52MS5RdWFsaWZpZWROYW1lXCIsXG5cdFwiY29tLnNhcC52b2NhYnVsYXJpZXMuQ29tbW9uLnYxLkZpbHRlckRlZmF1bHRWYWx1ZVwiID0gXCJFZG0uUHJpbWl0aXZlVHlwZVwiLFxuXHRcImNvbS5zYXAudm9jYWJ1bGFyaWVzLkNvbW1vbi52MS5GaWx0ZXJEZWZhdWx0VmFsdWVIaWdoXCIgPSBcIkVkbS5QcmltaXRpdmVUeXBlXCIsXG5cdFwiY29tLnNhcC52b2NhYnVsYXJpZXMuQ29tbW9uLnYxLlNvcnRPcmRlclwiID0gXCJjb20uc2FwLnZvY2FidWxhcmllcy5Db21tb24udjEuU29ydE9yZGVyVHlwZVwiLFxuXHRcImNvbS5zYXAudm9jYWJ1bGFyaWVzLkNvbW1vbi52MS5SZWN1cnNpdmVIaWVyYXJjaHlcIiA9IFwiY29tLnNhcC52b2NhYnVsYXJpZXMuQ29tbW9uLnYxLlJlY3Vyc2l2ZUhpZXJhcmNoeVR5cGVcIixcblx0XCJjb20uc2FwLnZvY2FidWxhcmllcy5Db21tb24udjEuQ3JlYXRlZEF0XCIgPSBcIkVkbS5EYXRlVGltZU9mZnNldFwiLFxuXHRcImNvbS5zYXAudm9jYWJ1bGFyaWVzLkNvbW1vbi52MS5DcmVhdGVkQnlcIiA9IFwiY29tLnNhcC52b2NhYnVsYXJpZXMuQ29tbW9uLnYxLlVzZXJJRFwiLFxuXHRcImNvbS5zYXAudm9jYWJ1bGFyaWVzLkNvbW1vbi52MS5DaGFuZ2VkQXRcIiA9IFwiRWRtLkRhdGVUaW1lT2Zmc2V0XCIsXG5cdFwiY29tLnNhcC52b2NhYnVsYXJpZXMuQ29tbW9uLnYxLkNoYW5nZWRCeVwiID0gXCJjb20uc2FwLnZvY2FidWxhcmllcy5Db21tb24udjEuVXNlcklEXCIsXG5cdFwiY29tLnNhcC52b2NhYnVsYXJpZXMuQ29tbW9uLnYxLkFwcGx5TXVsdGlVbml0QmVoYXZpb3JGb3JTb3J0aW5nQW5kRmlsdGVyaW5nXCIgPSBcIk9yZy5PRGF0YS5Db3JlLlYxLlRhZ1wiLFxuXHRcImNvbS5zYXAudm9jYWJ1bGFyaWVzLkNvZGVMaXN0LnYxLkN1cnJlbmN5Q29kZXNcIiA9IFwiY29tLnNhcC52b2NhYnVsYXJpZXMuQ29kZUxpc3QudjEuQ29kZUxpc3RTb3VyY2VcIixcblx0XCJjb20uc2FwLnZvY2FidWxhcmllcy5Db2RlTGlzdC52MS5Vbml0c09mTWVhc3VyZVwiID0gXCJjb20uc2FwLnZvY2FidWxhcmllcy5Db2RlTGlzdC52MS5Db2RlTGlzdFNvdXJjZVwiLFxuXHRcImNvbS5zYXAudm9jYWJ1bGFyaWVzLkNvZGVMaXN0LnYxLlN0YW5kYXJkQ29kZVwiID0gXCJFZG0uUHJvcGVydHlQYXRoXCIsXG5cdFwiY29tLnNhcC52b2NhYnVsYXJpZXMuQ29kZUxpc3QudjEuRXh0ZXJuYWxDb2RlXCIgPSBcIkVkbS5Qcm9wZXJ0eVBhdGhcIixcblx0XCJjb20uc2FwLnZvY2FidWxhcmllcy5Db2RlTGlzdC52MS5Jc0NvbmZpZ3VyYXRpb25EZXByZWNhdGlvbkNvZGVcIiA9IFwiRWRtLkJvb2xlYW5cIixcblx0XCJjb20uc2FwLnZvY2FidWxhcmllcy5Db21tdW5pY2F0aW9uLnYxLkNvbnRhY3RcIiA9IFwiY29tLnNhcC52b2NhYnVsYXJpZXMuQ29tbXVuaWNhdGlvbi52MS5Db250YWN0VHlwZVwiLFxuXHRcImNvbS5zYXAudm9jYWJ1bGFyaWVzLkNvbW11bmljYXRpb24udjEuQWRkcmVzc1wiID0gXCJjb20uc2FwLnZvY2FidWxhcmllcy5Db21tdW5pY2F0aW9uLnYxLkFkZHJlc3NUeXBlXCIsXG5cdFwiY29tLnNhcC52b2NhYnVsYXJpZXMuQ29tbXVuaWNhdGlvbi52MS5Jc0VtYWlsQWRkcmVzc1wiID0gXCJPcmcuT0RhdGEuQ29yZS5WMS5UYWdcIixcblx0XCJjb20uc2FwLnZvY2FidWxhcmllcy5Db21tdW5pY2F0aW9uLnYxLklzUGhvbmVOdW1iZXJcIiA9IFwiT3JnLk9EYXRhLkNvcmUuVjEuVGFnXCIsXG5cdFwiY29tLnNhcC52b2NhYnVsYXJpZXMuQ29tbXVuaWNhdGlvbi52MS5FdmVudFwiID0gXCJjb20uc2FwLnZvY2FidWxhcmllcy5Db21tdW5pY2F0aW9uLnYxLkV2ZW50RGF0YVwiLFxuXHRcImNvbS5zYXAudm9jYWJ1bGFyaWVzLkNvbW11bmljYXRpb24udjEuVGFza1wiID0gXCJjb20uc2FwLnZvY2FidWxhcmllcy5Db21tdW5pY2F0aW9uLnYxLlRhc2tEYXRhXCIsXG5cdFwiY29tLnNhcC52b2NhYnVsYXJpZXMuQ29tbXVuaWNhdGlvbi52MS5NZXNzYWdlXCIgPSBcImNvbS5zYXAudm9jYWJ1bGFyaWVzLkNvbW11bmljYXRpb24udjEuTWVzc2FnZURhdGFcIixcblx0XCJjb20uc2FwLnZvY2FidWxhcmllcy5IaWVyYXJjaHkudjEuUmVjdXJzaXZlSGllcmFyY2h5XCIgPSBcImNvbS5zYXAudm9jYWJ1bGFyaWVzLkhpZXJhcmNoeS52MS5SZWN1cnNpdmVIaWVyYXJjaHlUeXBlXCIsXG5cdFwiY29tLnNhcC52b2NhYnVsYXJpZXMuUGVyc29uYWxEYXRhLnYxLkVudGl0eVNlbWFudGljc1wiID0gXCJjb20uc2FwLnZvY2FidWxhcmllcy5QZXJzb25hbERhdGEudjEuRW50aXR5U2VtYW50aWNzVHlwZVwiLFxuXHRcImNvbS5zYXAudm9jYWJ1bGFyaWVzLlBlcnNvbmFsRGF0YS52MS5GaWVsZFNlbWFudGljc1wiID0gXCJjb20uc2FwLnZvY2FidWxhcmllcy5QZXJzb25hbERhdGEudjEuRmllbGRTZW1hbnRpY3NUeXBlXCIsXG5cdFwiY29tLnNhcC52b2NhYnVsYXJpZXMuUGVyc29uYWxEYXRhLnYxLklzUG90ZW50aWFsbHlQZXJzb25hbFwiID0gXCJPcmcuT0RhdGEuQ29yZS5WMS5UYWdcIixcblx0XCJjb20uc2FwLnZvY2FidWxhcmllcy5QZXJzb25hbERhdGEudjEuSXNQb3RlbnRpYWxseVNlbnNpdGl2ZVwiID0gXCJPcmcuT0RhdGEuQ29yZS5WMS5UYWdcIixcblx0XCJjb20uc2FwLnZvY2FidWxhcmllcy5TZXNzaW9uLnYxLlN0aWNreVNlc3Npb25TdXBwb3J0ZWRcIiA9IFwiY29tLnNhcC52b2NhYnVsYXJpZXMuU2Vzc2lvbi52MS5TdGlja3lTZXNzaW9uU3VwcG9ydGVkVHlwZVwiLFxuXHRcImNvbS5zYXAudm9jYWJ1bGFyaWVzLlVJLnYxLkhlYWRlckluZm9cIiA9IFwiY29tLnNhcC52b2NhYnVsYXJpZXMuVUkudjEuSGVhZGVySW5mb1R5cGVcIixcblx0XCJjb20uc2FwLnZvY2FidWxhcmllcy5VSS52MS5JZGVudGlmaWNhdGlvblwiID0gXCJjb20uc2FwLnZvY2FidWxhcmllcy5VSS52MS5EYXRhRmllbGRBYnN0cmFjdFwiLFxuXHRcImNvbS5zYXAudm9jYWJ1bGFyaWVzLlVJLnYxLkJhZGdlXCIgPSBcImNvbS5zYXAudm9jYWJ1bGFyaWVzLlVJLnYxLkJhZGdlVHlwZVwiLFxuXHRcImNvbS5zYXAudm9jYWJ1bGFyaWVzLlVJLnYxLkxpbmVJdGVtXCIgPSBcImNvbS5zYXAudm9jYWJ1bGFyaWVzLlVJLnYxLkRhdGFGaWVsZEFic3RyYWN0XCIsXG5cdFwiY29tLnNhcC52b2NhYnVsYXJpZXMuVUkudjEuU3RhdHVzSW5mb1wiID0gXCJjb20uc2FwLnZvY2FidWxhcmllcy5VSS52MS5EYXRhRmllbGRBYnN0cmFjdFwiLFxuXHRcImNvbS5zYXAudm9jYWJ1bGFyaWVzLlVJLnYxLkZpZWxkR3JvdXBcIiA9IFwiY29tLnNhcC52b2NhYnVsYXJpZXMuVUkudjEuRmllbGRHcm91cFR5cGVcIixcblx0XCJjb20uc2FwLnZvY2FidWxhcmllcy5VSS52MS5Db25uZWN0ZWRGaWVsZHNcIiA9IFwiY29tLnNhcC52b2NhYnVsYXJpZXMuVUkudjEuQ29ubmVjdGVkRmllbGRzVHlwZVwiLFxuXHRcImNvbS5zYXAudm9jYWJ1bGFyaWVzLlVJLnYxLkdlb0xvY2F0aW9uc1wiID0gXCJjb20uc2FwLnZvY2FidWxhcmllcy5VSS52MS5HZW9Mb2NhdGlvblR5cGVcIixcblx0XCJjb20uc2FwLnZvY2FidWxhcmllcy5VSS52MS5HZW9Mb2NhdGlvblwiID0gXCJjb20uc2FwLnZvY2FidWxhcmllcy5VSS52MS5HZW9Mb2NhdGlvblR5cGVcIixcblx0XCJjb20uc2FwLnZvY2FidWxhcmllcy5VSS52MS5Db250YWN0c1wiID0gXCJFZG0uQW5ub3RhdGlvblBhdGhcIixcblx0XCJjb20uc2FwLnZvY2FidWxhcmllcy5VSS52MS5NZWRpYVJlc291cmNlXCIgPSBcImNvbS5zYXAudm9jYWJ1bGFyaWVzLlVJLnYxLk1lZGlhUmVzb3VyY2VUeXBlXCIsXG5cdFwiY29tLnNhcC52b2NhYnVsYXJpZXMuVUkudjEuRGF0YVBvaW50XCIgPSBcImNvbS5zYXAudm9jYWJ1bGFyaWVzLlVJLnYxLkRhdGFQb2ludFR5cGVcIixcblx0XCJjb20uc2FwLnZvY2FidWxhcmllcy5VSS52MS5LUElcIiA9IFwiY29tLnNhcC52b2NhYnVsYXJpZXMuVUkudjEuS1BJVHlwZVwiLFxuXHRcImNvbS5zYXAudm9jYWJ1bGFyaWVzLlVJLnYxLkNoYXJ0XCIgPSBcImNvbS5zYXAudm9jYWJ1bGFyaWVzLlVJLnYxLkNoYXJ0RGVmaW5pdGlvblR5cGVcIixcblx0XCJjb20uc2FwLnZvY2FidWxhcmllcy5VSS52MS5WYWx1ZUNyaXRpY2FsaXR5XCIgPSBcImNvbS5zYXAudm9jYWJ1bGFyaWVzLlVJLnYxLlZhbHVlQ3JpdGljYWxpdHlUeXBlXCIsXG5cdFwiY29tLnNhcC52b2NhYnVsYXJpZXMuVUkudjEuQ3JpdGljYWxpdHlMYWJlbHNcIiA9IFwiY29tLnNhcC52b2NhYnVsYXJpZXMuVUkudjEuQ3JpdGljYWxpdHlMYWJlbFR5cGVcIixcblx0XCJjb20uc2FwLnZvY2FidWxhcmllcy5VSS52MS5TZWxlY3Rpb25GaWVsZHNcIiA9IFwiRWRtLlByb3BlcnR5UGF0aFwiLFxuXHRcImNvbS5zYXAudm9jYWJ1bGFyaWVzLlVJLnYxLkZhY2V0c1wiID0gXCJjb20uc2FwLnZvY2FidWxhcmllcy5VSS52MS5GYWNldFwiLFxuXHRcImNvbS5zYXAudm9jYWJ1bGFyaWVzLlVJLnYxLkhlYWRlckZhY2V0c1wiID0gXCJjb20uc2FwLnZvY2FidWxhcmllcy5VSS52MS5GYWNldFwiLFxuXHRcImNvbS5zYXAudm9jYWJ1bGFyaWVzLlVJLnYxLlF1aWNrVmlld0ZhY2V0c1wiID0gXCJjb20uc2FwLnZvY2FidWxhcmllcy5VSS52MS5GYWNldFwiLFxuXHRcImNvbS5zYXAudm9jYWJ1bGFyaWVzLlVJLnYxLlF1aWNrQ3JlYXRlRmFjZXRzXCIgPSBcImNvbS5zYXAudm9jYWJ1bGFyaWVzLlVJLnYxLkZhY2V0XCIsXG5cdFwiY29tLnNhcC52b2NhYnVsYXJpZXMuVUkudjEuRmlsdGVyRmFjZXRzXCIgPSBcImNvbS5zYXAudm9jYWJ1bGFyaWVzLlVJLnYxLlJlZmVyZW5jZUZhY2V0XCIsXG5cdFwiY29tLnNhcC52b2NhYnVsYXJpZXMuVUkudjEuU2VsZWN0aW9uUHJlc2VudGF0aW9uVmFyaWFudFwiID0gXCJjb20uc2FwLnZvY2FidWxhcmllcy5VSS52MS5TZWxlY3Rpb25QcmVzZW50YXRpb25WYXJpYW50VHlwZVwiLFxuXHRcImNvbS5zYXAudm9jYWJ1bGFyaWVzLlVJLnYxLlByZXNlbnRhdGlvblZhcmlhbnRcIiA9IFwiY29tLnNhcC52b2NhYnVsYXJpZXMuVUkudjEuUHJlc2VudGF0aW9uVmFyaWFudFR5cGVcIixcblx0XCJjb20uc2FwLnZvY2FidWxhcmllcy5VSS52MS5TZWxlY3Rpb25WYXJpYW50XCIgPSBcImNvbS5zYXAudm9jYWJ1bGFyaWVzLlVJLnYxLlNlbGVjdGlvblZhcmlhbnRUeXBlXCIsXG5cdFwiY29tLnNhcC52b2NhYnVsYXJpZXMuVUkudjEuVGhpbmdQZXJzcGVjdGl2ZVwiID0gXCJPcmcuT0RhdGEuQ29yZS5WMS5UYWdcIixcblx0XCJjb20uc2FwLnZvY2FidWxhcmllcy5VSS52MS5Jc1N1bW1hcnlcIiA9IFwiT3JnLk9EYXRhLkNvcmUuVjEuVGFnXCIsXG5cdFwiY29tLnNhcC52b2NhYnVsYXJpZXMuVUkudjEuUGFydE9mUHJldmlld1wiID0gXCJPcmcuT0RhdGEuQ29yZS5WMS5UYWdcIixcblx0XCJjb20uc2FwLnZvY2FidWxhcmllcy5VSS52MS5NYXBcIiA9IFwiT3JnLk9EYXRhLkNvcmUuVjEuVGFnXCIsXG5cdFwiY29tLnNhcC52b2NhYnVsYXJpZXMuVUkudjEuR2FsbGVyeVwiID0gXCJPcmcuT0RhdGEuQ29yZS5WMS5UYWdcIixcblx0XCJjb20uc2FwLnZvY2FidWxhcmllcy5VSS52MS5Jc0ltYWdlVVJMXCIgPSBcIk9yZy5PRGF0YS5Db3JlLlYxLlRhZ1wiLFxuXHRcImNvbS5zYXAudm9jYWJ1bGFyaWVzLlVJLnYxLklzSW1hZ2VcIiA9IFwiT3JnLk9EYXRhLkNvcmUuVjEuVGFnXCIsXG5cdFwiY29tLnNhcC52b2NhYnVsYXJpZXMuVUkudjEuTXVsdGlMaW5lVGV4dFwiID0gXCJPcmcuT0RhdGEuQ29yZS5WMS5UYWdcIixcblx0XCJjb20uc2FwLnZvY2FidWxhcmllcy5VSS52MS5UZXh0QXJyYW5nZW1lbnRcIiA9IFwiY29tLnNhcC52b2NhYnVsYXJpZXMuVUkudjEuVGV4dEFycmFuZ2VtZW50VHlwZVwiLFxuXHRcImNvbS5zYXAudm9jYWJ1bGFyaWVzLlVJLnYxLkltcG9ydGFuY2VcIiA9IFwiY29tLnNhcC52b2NhYnVsYXJpZXMuVUkudjEuSW1wb3J0YW5jZVR5cGVcIixcblx0XCJjb20uc2FwLnZvY2FidWxhcmllcy5VSS52MS5IaWRkZW5cIiA9IFwiT3JnLk9EYXRhLkNvcmUuVjEuVGFnXCIsXG5cdFwiY29tLnNhcC52b2NhYnVsYXJpZXMuVUkudjEuQ3JlYXRlSGlkZGVuXCIgPSBcIk9yZy5PRGF0YS5Db3JlLlYxLlRhZ1wiLFxuXHRcImNvbS5zYXAudm9jYWJ1bGFyaWVzLlVJLnYxLlVwZGF0ZUhpZGRlblwiID0gXCJPcmcuT0RhdGEuQ29yZS5WMS5UYWdcIixcblx0XCJjb20uc2FwLnZvY2FidWxhcmllcy5VSS52MS5EZWxldGVIaWRkZW5cIiA9IFwiT3JnLk9EYXRhLkNvcmUuVjEuVGFnXCIsXG5cdFwiY29tLnNhcC52b2NhYnVsYXJpZXMuVUkudjEuSGlkZGVuRmlsdGVyXCIgPSBcIk9yZy5PRGF0YS5Db3JlLlYxLlRhZ1wiLFxuXHRcImNvbS5zYXAudm9jYWJ1bGFyaWVzLlVJLnYxLkRhdGFGaWVsZERlZmF1bHRcIiA9IFwiY29tLnNhcC52b2NhYnVsYXJpZXMuVUkudjEuRGF0YUZpZWxkQWJzdHJhY3RcIixcblx0XCJjb20uc2FwLnZvY2FidWxhcmllcy5VSS52MS5Dcml0aWNhbGl0eVwiID0gXCJjb20uc2FwLnZvY2FidWxhcmllcy5VSS52MS5Dcml0aWNhbGl0eVR5cGVcIixcblx0XCJjb20uc2FwLnZvY2FidWxhcmllcy5VSS52MS5Dcml0aWNhbGl0eUNhbGN1bGF0aW9uXCIgPSBcImNvbS5zYXAudm9jYWJ1bGFyaWVzLlVJLnYxLkNyaXRpY2FsaXR5Q2FsY3VsYXRpb25UeXBlXCIsXG5cdFwiY29tLnNhcC52b2NhYnVsYXJpZXMuVUkudjEuRW1waGFzaXplZFwiID0gXCJPcmcuT0RhdGEuQ29yZS5WMS5UYWdcIixcblx0XCJjb20uc2FwLnZvY2FidWxhcmllcy5VSS52MS5PcmRlckJ5XCIgPSBcIkVkbS5Qcm9wZXJ0eVBhdGhcIixcblx0XCJjb20uc2FwLnZvY2FidWxhcmllcy5VSS52MS5QYXJhbWV0ZXJEZWZhdWx0VmFsdWVcIiA9IFwiRWRtLlByaW1pdGl2ZVR5cGVcIixcblx0XCJjb20uc2FwLnZvY2FidWxhcmllcy5VSS52MS5SZWNvbW1lbmRhdGlvblN0YXRlXCIgPSBcImNvbS5zYXAudm9jYWJ1bGFyaWVzLlVJLnYxLlJlY29tbWVuZGF0aW9uU3RhdGVUeXBlXCIsXG5cdFwiY29tLnNhcC52b2NhYnVsYXJpZXMuVUkudjEuUmVjb21tZW5kYXRpb25MaXN0XCIgPSBcImNvbS5zYXAudm9jYWJ1bGFyaWVzLlVJLnYxLlJlY29tbWVuZGF0aW9uTGlzdFR5cGVcIixcblx0XCJjb20uc2FwLnZvY2FidWxhcmllcy5VSS52MS5FeGNsdWRlRnJvbU5hdmlnYXRpb25Db250ZXh0XCIgPSBcIk9yZy5PRGF0YS5Db3JlLlYxLlRhZ1wiLFxuXHRcImNvbS5zYXAudm9jYWJ1bGFyaWVzLkhUTUw1LnYxLkNzc0RlZmF1bHRzXCIgPSBcImNvbS5zYXAudm9jYWJ1bGFyaWVzLkhUTUw1LnYxLkNzc0RlZmF1bHRzVHlwZVwiXG59XG5cbmV4cG9ydCBjb25zdCBkZWZhdWx0UmVmZXJlbmNlczogUmVmZXJlbmNlc1dpdGhNYXAgPSBbXG5cdHsgYWxpYXM6IFwiQ2FwYWJpbGl0aWVzXCIsIG5hbWVzcGFjZTogXCJPcmcuT0RhdGEuQ2FwYWJpbGl0aWVzLlYxXCIsIHVyaTogXCJcIiB9LFxuXHR7IGFsaWFzOiBcIkFnZ3JlZ2F0aW9uXCIsIG5hbWVzcGFjZTogXCJPcmcuT0RhdGEuQWdncmVnYXRpb24uVjFcIiwgdXJpOiBcIlwiIH0sXG5cdHsgYWxpYXM6IFwiVmFsaWRhdGlvblwiLCBuYW1lc3BhY2U6IFwiT3JnLk9EYXRhLlZhbGlkYXRpb24uVjFcIiwgdXJpOiBcIlwiIH0sXG5cdHsgbmFtZXNwYWNlOiBcIk9yZy5PRGF0YS5Db3JlLlYxXCIsIGFsaWFzOiBcIkNvcmVcIiwgdXJpOiBcIlwiIH0sXG5cdHsgbmFtZXNwYWNlOiBcIk9yZy5PRGF0YS5NZWFzdXJlcy5WMVwiLCBhbGlhczogXCJNZWFzdXJlc1wiLCB1cmk6IFwiXCIgfSxcblx0eyBuYW1lc3BhY2U6IFwiY29tLnNhcC52b2NhYnVsYXJpZXMuQ29tbW9uLnYxXCIsIGFsaWFzOiBcIkNvbW1vblwiLCB1cmk6IFwiXCIgfSxcblx0eyBuYW1lc3BhY2U6IFwiY29tLnNhcC52b2NhYnVsYXJpZXMuVUkudjFcIiwgYWxpYXM6IFwiVUlcIiwgdXJpOiBcIlwiIH0sXG5cdHsgbmFtZXNwYWNlOiBcImNvbS5zYXAudm9jYWJ1bGFyaWVzLlNlc3Npb24udjFcIiwgYWxpYXM6IFwiU2Vzc2lvblwiLCB1cmk6IFwiXCIgfSxcblx0eyBuYW1lc3BhY2U6IFwiY29tLnNhcC52b2NhYnVsYXJpZXMuQW5hbHl0aWNzLnYxXCIsIGFsaWFzOiBcIkFuYWx5dGljc1wiLCB1cmk6IFwiXCIgfSxcblx0eyBuYW1lc3BhY2U6IFwiY29tLnNhcC52b2NhYnVsYXJpZXMuQ29kZUxpc3QudjFcIiwgYWxpYXM6IFwiQ29kZUxpc3RcIiwgdXJpOiBcIlwiIH0sXG5cdHsgbmFtZXNwYWNlOiBcImNvbS5zYXAudm9jYWJ1bGFyaWVzLlBlcnNvbmFsRGF0YS52MVwiLCBhbGlhczogXCJQZXJzb25hbERhdGFcIiwgdXJpOiBcIlwiIH0sXG5cdHsgbmFtZXNwYWNlOiBcImNvbS5zYXAudm9jYWJ1bGFyaWVzLkNvbW11bmljYXRpb24udjFcIiwgYWxpYXM6IFwiQ29tbXVuaWNhdGlvblwiLCB1cmk6IFwiXCIgfSxcblx0eyBuYW1lc3BhY2U6IFwiY29tLnNhcC52b2NhYnVsYXJpZXMuSFRNTDUudjFcIiwgYWxpYXM6IFwiSFRNTDVcIiwgdXJpOiBcIlwiIH1cbl07XG5cbnR5cGUgUmVmZXJlbmNlc1dpdGhNYXAgPSBSZWZlcmVuY2VbXSAmIHtcblx0cmVmZXJlbmNlTWFwPzogUmVjb3JkPHN0cmluZywgUmVmZXJlbmNlPjtcblx0cmV2ZXJzZVJlZmVyZW5jZU1hcD86IFJlY29yZDxzdHJpbmcsIFJlZmVyZW5jZT47XG59O1xuXG5mdW5jdGlvbiBhbGlhcyhyZWZlcmVuY2VzOiBSZWZlcmVuY2VzV2l0aE1hcCwgdW5hbGlhc2VkVmFsdWU6IHN0cmluZyk6IHN0cmluZyB7XG5cdGlmICghcmVmZXJlbmNlcy5yZXZlcnNlUmVmZXJlbmNlTWFwKSB7XG5cdFx0cmVmZXJlbmNlcy5yZXZlcnNlUmVmZXJlbmNlTWFwID0gcmVmZXJlbmNlcy5yZWR1Y2UoKG1hcDogUmVjb3JkPHN0cmluZywgUmVmZXJlbmNlPiwgcmVmZXJlbmNlKSA9PiB7XG5cdFx0XHRtYXBbcmVmZXJlbmNlLm5hbWVzcGFjZV0gPSByZWZlcmVuY2U7XG5cdFx0XHRyZXR1cm4gbWFwO1xuXHRcdH0sIHt9KTtcblx0fVxuXHRpZiAoIXVuYWxpYXNlZFZhbHVlKSB7XG5cdFx0cmV0dXJuIHVuYWxpYXNlZFZhbHVlO1xuXHR9XG5cdGNvbnN0IGxhc3REb3RJbmRleCA9IHVuYWxpYXNlZFZhbHVlLmxhc3RJbmRleE9mKFwiLlwiKTtcblx0Y29uc3QgbmFtZXNwYWNlID0gdW5hbGlhc2VkVmFsdWUuc3Vic3RyKDAsIGxhc3REb3RJbmRleCk7XG5cdGNvbnN0IHZhbHVlID0gdW5hbGlhc2VkVmFsdWUuc3Vic3RyKGxhc3REb3RJbmRleCArIDEpO1xuXHRjb25zdCByZWZlcmVuY2UgPSByZWZlcmVuY2VzLnJldmVyc2VSZWZlcmVuY2VNYXBbbmFtZXNwYWNlXTtcblx0aWYgKHJlZmVyZW5jZSkge1xuXHRcdHJldHVybiBgJHtyZWZlcmVuY2UuYWxpYXN9LiR7dmFsdWV9YDtcblx0fSBlbHNlIHtcblx0XHQvLyBUcnkgdG8gc2VlIGlmIGl0J3MgYW4gYW5ub3RhdGlvbiBQYXRoIGxpa2UgdG9fU2FsZXNPcmRlci9AVUkuTGluZUl0ZW1cblx0XHRpZiAodW5hbGlhc2VkVmFsdWUuaW5kZXhPZihcIkBcIikgIT09IC0xKSB7XG5cdFx0XHRjb25zdCBbcHJlQWxpYXMsIC4uLnBvc3RBbGlhc10gPSB1bmFsaWFzZWRWYWx1ZS5zcGxpdChcIkBcIik7XG5cdFx0XHRyZXR1cm4gYCR7cHJlQWxpYXN9QCR7YWxpYXMocmVmZXJlbmNlcywgcG9zdEFsaWFzLmpvaW4oXCJAXCIpKX1gO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4gdW5hbGlhc2VkVmFsdWU7XG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIHVuYWxpYXMocmVmZXJlbmNlczogUmVmZXJlbmNlc1dpdGhNYXAsIGFsaWFzZWRWYWx1ZTogc3RyaW5nIHwgdW5kZWZpbmVkKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcblx0aWYgKCFyZWZlcmVuY2VzLnJlZmVyZW5jZU1hcCkge1xuXHRcdHJlZmVyZW5jZXMucmVmZXJlbmNlTWFwID0gcmVmZXJlbmNlcy5yZWR1Y2UoKG1hcDogUmVjb3JkPHN0cmluZywgUmVmZXJlbmNlPiwgcmVmZXJlbmNlKSA9PiB7XG5cdFx0XHRtYXBbcmVmZXJlbmNlLmFsaWFzXSA9IHJlZmVyZW5jZTtcblx0XHRcdHJldHVybiBtYXA7XG5cdFx0fSwge30pO1xuXHR9XG5cdGlmICghYWxpYXNlZFZhbHVlKSB7XG5cdFx0cmV0dXJuIGFsaWFzZWRWYWx1ZTtcblx0fVxuXHRjb25zdCBbYWxpYXMsIC4uLnZhbHVlXSA9IGFsaWFzZWRWYWx1ZS5zcGxpdChcIi5cIik7XG5cdGNvbnN0IHJlZmVyZW5jZSA9IHJlZmVyZW5jZXMucmVmZXJlbmNlTWFwW2FsaWFzXTtcblx0aWYgKHJlZmVyZW5jZSkge1xuXHRcdHJldHVybiBgJHtyZWZlcmVuY2UubmFtZXNwYWNlfS4ke3ZhbHVlLmpvaW4oXCIuXCIpfWA7XG5cdH0gZWxzZSB7XG5cdFx0Ly8gVHJ5IHRvIHNlZSBpZiBpdCdzIGFuIGFubm90YXRpb24gUGF0aCBsaWtlIHRvX1NhbGVzT3JkZXIvQFVJLkxpbmVJdGVtXG5cdFx0aWYgKGFsaWFzZWRWYWx1ZS5pbmRleE9mKFwiQFwiKSAhPT0gLTEpIHtcblx0XHRcdGNvbnN0IFtwcmVBbGlhcywgLi4ucG9zdEFsaWFzXSA9IGFsaWFzZWRWYWx1ZS5zcGxpdChcIkBcIik7XG5cdFx0XHRyZXR1cm4gYCR7cHJlQWxpYXN9QCR7dW5hbGlhcyhyZWZlcmVuY2VzLCBwb3N0QWxpYXMuam9pbihcIkBcIikpfWA7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiBhbGlhc2VkVmFsdWU7XG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIGJ1aWxkT2JqZWN0TWFwKHBhcnNlck91dHB1dDogUGFyc2VyT3V0cHV0KTogUmVjb3JkPHN0cmluZywgYW55PiB7XG5cdGNvbnN0IG9iamVjdE1hcDogYW55ID0ge307XG5cdGlmIChwYXJzZXJPdXRwdXQuc2NoZW1hLmVudGl0eUNvbnRhaW5lciAmJiBwYXJzZXJPdXRwdXQuc2NoZW1hLmVudGl0eUNvbnRhaW5lci5mdWxseVF1YWxpZmllZE5hbWUpIHtcblx0XHRvYmplY3RNYXBbcGFyc2VyT3V0cHV0LnNjaGVtYS5lbnRpdHlDb250YWluZXIuZnVsbHlRdWFsaWZpZWROYW1lXSA9IHBhcnNlck91dHB1dC5zY2hlbWEuZW50aXR5Q29udGFpbmVyO1xuXHR9XG5cdHBhcnNlck91dHB1dC5zY2hlbWEuZW50aXR5U2V0cy5mb3JFYWNoKGVudGl0eVNldCA9PiB7XG5cdFx0b2JqZWN0TWFwW2VudGl0eVNldC5mdWxseVF1YWxpZmllZE5hbWVdID0gZW50aXR5U2V0O1xuXHR9KTtcblx0cGFyc2VyT3V0cHV0LnNjaGVtYS5hY3Rpb25zLmZvckVhY2goYWN0aW9uID0+IHtcblx0XHRvYmplY3RNYXBbYWN0aW9uLmZ1bGx5UXVhbGlmaWVkTmFtZV0gPSBhY3Rpb247XG5cdFx0b2JqZWN0TWFwW2FjdGlvbi5mdWxseVF1YWxpZmllZE5hbWUuc3BsaXQoXCIoXCIpWzBdXSA9IGFjdGlvbjtcblx0XHRhY3Rpb24ucGFyYW1ldGVycy5mb3JFYWNoKHBhcmFtZXRlciA9PiB7XG5cdFx0XHRvYmplY3RNYXBbcGFyYW1ldGVyLmZ1bGx5UXVhbGlmaWVkTmFtZV0gPSBwYXJhbWV0ZXI7XG5cdFx0fSk7XG5cdH0pO1xuXHRwYXJzZXJPdXRwdXQuc2NoZW1hLmNvbXBsZXhUeXBlcy5mb3JFYWNoKGNvbXBsZXhUeXBlID0+IHtcblx0XHRvYmplY3RNYXBbY29tcGxleFR5cGUuZnVsbHlRdWFsaWZpZWROYW1lXSA9IGNvbXBsZXhUeXBlO1xuXHRcdGNvbXBsZXhUeXBlLnByb3BlcnRpZXMuZm9yRWFjaChwcm9wZXJ0eSA9PiB7XG5cdFx0XHRvYmplY3RNYXBbcHJvcGVydHkuZnVsbHlRdWFsaWZpZWROYW1lXSA9IHByb3BlcnR5O1xuXHRcdH0pO1xuXHR9KTtcblx0cGFyc2VyT3V0cHV0LnNjaGVtYS5lbnRpdHlUeXBlcy5mb3JFYWNoKGVudGl0eVR5cGUgPT4ge1xuXHRcdG9iamVjdE1hcFtlbnRpdHlUeXBlLmZ1bGx5UXVhbGlmaWVkTmFtZV0gPSBlbnRpdHlUeXBlO1xuXHRcdGVudGl0eVR5cGUuZW50aXR5UHJvcGVydGllcy5mb3JFYWNoKHByb3BlcnR5ID0+IHtcblx0XHRcdG9iamVjdE1hcFtwcm9wZXJ0eS5mdWxseVF1YWxpZmllZE5hbWVdID0gcHJvcGVydHk7XG5cdFx0XHRpZiAocHJvcGVydHkudHlwZS5pbmRleE9mKFwiRWRtXCIpID09PSAtMSkge1xuXHRcdFx0XHQvLyBIYW5kbGUgY29tcGxleCB0eXBlc1xuXHRcdFx0XHRjb25zdCBjb21wbGV4VHlwZURlZmluaXRpb24gPSBvYmplY3RNYXBbcHJvcGVydHkudHlwZV0gYXMgQ29tcGxleFR5cGU7XG5cdFx0XHRcdGlmIChjb21wbGV4VHlwZURlZmluaXRpb24gJiYgY29tcGxleFR5cGVEZWZpbml0aW9uLnByb3BlcnRpZXMpIHtcblx0XHRcdFx0XHRjb21wbGV4VHlwZURlZmluaXRpb24ucHJvcGVydGllcy5mb3JFYWNoKGNvbXBsZXhUeXBlUHJvcCA9PiB7XG5cdFx0XHRcdFx0XHRjb25zdCBjb21wbGV4VHlwZVByb3BUYXJnZXQ6IFBhcnNlclByb3BlcnR5ID0gT2JqZWN0LmFzc2lnbihjb21wbGV4VHlwZVByb3AsIHtcblx0XHRcdFx0XHRcdFx0X3R5cGU6IFwiUHJvcGVydHlcIixcblx0XHRcdFx0XHRcdFx0ZnVsbHlRdWFsaWZpZWROYW1lOiBwcm9wZXJ0eS5mdWxseVF1YWxpZmllZE5hbWUgKyBcIi9cIiArIGNvbXBsZXhUeXBlUHJvcC5uYW1lXG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdG9iamVjdE1hcFtjb21wbGV4VHlwZVByb3BUYXJnZXQuZnVsbHlRdWFsaWZpZWROYW1lXSA9IGNvbXBsZXhUeXBlUHJvcFRhcmdldDtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdGVudGl0eVR5cGUubmF2aWdhdGlvblByb3BlcnRpZXMuZm9yRWFjaChuYXZQcm9wZXJ0eSA9PiB7XG5cdFx0XHRvYmplY3RNYXBbbmF2UHJvcGVydHkuZnVsbHlRdWFsaWZpZWROYW1lXSA9IG5hdlByb3BlcnR5O1xuXHRcdH0pO1xuXHR9KTtcblxuXHRPYmplY3Qua2V5cyhwYXJzZXJPdXRwdXQuc2NoZW1hLmFubm90YXRpb25zKS5mb3JFYWNoKGFubm90YXRpb25Tb3VyY2UgPT4ge1xuXHRcdHBhcnNlck91dHB1dC5zY2hlbWEuYW5ub3RhdGlvbnNbYW5ub3RhdGlvblNvdXJjZV0uZm9yRWFjaChhbm5vdGF0aW9uTGlzdCA9PiB7XG5cdFx0XHRjb25zdCBjdXJyZW50VGFyZ2V0TmFtZSA9IHVuYWxpYXMocGFyc2VyT3V0cHV0LnJlZmVyZW5jZXMsIGFubm90YXRpb25MaXN0LnRhcmdldCk7XG5cdFx0XHRhbm5vdGF0aW9uTGlzdC5hbm5vdGF0aW9ucy5mb3JFYWNoKGFubm90YXRpb24gPT4ge1xuXHRcdFx0XHRsZXQgYW5ub3RhdGlvbkZRTiA9IGAke2N1cnJlbnRUYXJnZXROYW1lfUAke3VuYWxpYXMocGFyc2VyT3V0cHV0LnJlZmVyZW5jZXMsIGFubm90YXRpb24udGVybSl9YDtcblx0XHRcdFx0aWYgKGFubm90YXRpb24ucXVhbGlmaWVyKSB7XG5cdFx0XHRcdFx0YW5ub3RhdGlvbkZRTiArPSBgIyR7YW5ub3RhdGlvbi5xdWFsaWZpZXJ9YDtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAodHlwZW9mIGFubm90YXRpb24gIT09IFwib2JqZWN0XCIpIHtcblx0XHRcdFx0XHRkZWJ1Z2dlcjtcblx0XHRcdFx0fVxuXHRcdFx0XHRvYmplY3RNYXBbYW5ub3RhdGlvbkZRTl0gPSBhbm5vdGF0aW9uO1xuXHRcdFx0XHQoYW5ub3RhdGlvbiBhcyBBbm5vdGF0aW9uKS5mdWxseVF1YWxpZmllZE5hbWUgPSBhbm5vdGF0aW9uRlFOO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH0pO1xuXHRyZXR1cm4gb2JqZWN0TWFwO1xufVxuXG5mdW5jdGlvbiBjb21iaW5lUGF0aChjdXJyZW50VGFyZ2V0OiBzdHJpbmcsIHBhdGg6IHN0cmluZyk6IHN0cmluZyB7XG5cdGlmIChwYXRoLnN0YXJ0c1dpdGgoXCJAXCIpKSB7XG5cdFx0cmV0dXJuIGN1cnJlbnRUYXJnZXQgKyB1bmFsaWFzKGRlZmF1bHRSZWZlcmVuY2VzLCBwYXRoKTtcblx0fSBlbHNlIHtcblx0XHRyZXR1cm4gY3VycmVudFRhcmdldCArIFwiL1wiICsgcGF0aDtcblx0fVxufVxuXG5mdW5jdGlvbiBhZGRBbm5vdGF0aW9uRXJyb3JNZXNzYWdlKHBhdGg6IHN0cmluZywgb0Vycm9yTXNnOiBhbnkpIHtcblx0aWYgKCFBTExfQU5OT1RBVElPTl9FUlJPUlNbcGF0aF0pIHtcblx0XHRBTExfQU5OT1RBVElPTl9FUlJPUlNbcGF0aF0gPSBbb0Vycm9yTXNnXTtcblx0fSBlbHNlIHtcblx0XHRBTExfQU5OT1RBVElPTl9FUlJPUlNbcGF0aF0ucHVzaChvRXJyb3JNc2cpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHJlc29sdmVUYXJnZXQoXG5cdG9iamVjdE1hcDogYW55LFxuXHRjdXJyZW50VGFyZ2V0OiBhbnksXG5cdHBhdGg6IHN0cmluZyxcblx0cGF0aE9ubHk6IGJvb2xlYW4gPSBmYWxzZSxcblx0aW5jbHVkZVZpc2l0ZWRPYmplY3RzOiBib29sZWFuID0gZmFsc2UsXG5cdGFubm90YXRpb25UeXBlPzogc3RyaW5nLFxuXHRhbm5vdGF0aW9uc1Rlcm0/OiBzdHJpbmdcbikge1xuXHRpZiAoIXBhdGgpIHtcblx0XHRyZXR1cm4gdW5kZWZpbmVkO1xuXHR9XG5cdC8vY29uc3QgcHJvcGVydHlQYXRoID0gcGF0aDtcblx0bGV0IGFWaXNpdGVkT2JqZWN0czogYW55W10gPSBbXTtcblx0aWYgKGN1cnJlbnRUYXJnZXQgJiYgY3VycmVudFRhcmdldC5fdHlwZSA9PT0gXCJQcm9wZXJ0eVwiKSB7XG5cdFx0Y3VycmVudFRhcmdldCA9IG9iamVjdE1hcFtjdXJyZW50VGFyZ2V0LmZ1bGx5UXVhbGlmaWVkTmFtZS5zcGxpdChcIi9cIilbMF1dO1xuXHR9XG5cdHBhdGggPSBjb21iaW5lUGF0aChjdXJyZW50VGFyZ2V0LmZ1bGx5UXVhbGlmaWVkTmFtZSwgcGF0aCk7XG5cblx0Y29uc3QgcGF0aFNwbGl0ID0gcGF0aC5zcGxpdChcIi9cIik7XG5cdGNvbnN0IHRhcmdldFBhdGhTcGxpdDogc3RyaW5nW10gPSBbXTtcblx0cGF0aFNwbGl0LmZvckVhY2gocGF0aFBhcnQgPT4ge1xuXHRcdC8vIFNlcGFyYXRlIG91dCB0aGUgYW5ub3RhdGlvblxuXHRcdGlmIChwYXRoUGFydC5pbmRleE9mKFwiQFwiKSAhPT0gLTEpIHtcblx0XHRcdGNvbnN0IFtwYXRoLCBhbm5vdGF0aW9uUGF0aF0gPSBwYXRoUGFydC5zcGxpdChcIkBcIik7XG5cdFx0XHR0YXJnZXRQYXRoU3BsaXQucHVzaChwYXRoKTtcblx0XHRcdHRhcmdldFBhdGhTcGxpdC5wdXNoKGBAJHthbm5vdGF0aW9uUGF0aH1gKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGFyZ2V0UGF0aFNwbGl0LnB1c2gocGF0aFBhcnQpO1xuXHRcdH1cblx0fSk7XG5cdGxldCBjdXJyZW50UGF0aCA9IHBhdGg7XG5cdGxldCBjdXJyZW50Q29udGV4dCA9IGN1cnJlbnRUYXJnZXQ7XG5cdGNvbnN0IHRhcmdldCA9IHRhcmdldFBhdGhTcGxpdC5yZWR1Y2UoKGN1cnJlbnRWYWx1ZTogYW55LCBwYXRoUGFydCkgPT4ge1xuXHRcdGlmIChwYXRoUGFydCA9PT0gXCIkVHlwZVwiICYmIGN1cnJlbnRWYWx1ZS5fdHlwZSA9PT0gXCJFbnRpdHlUeXBlXCIpIHtcblx0XHRcdHJldHVybiBjdXJyZW50VmFsdWU7XG5cdFx0fVxuXHRcdGlmIChwYXRoUGFydC5sZW5ndGggPT09IDApIHtcblx0XHRcdC8vIEVtcHR5IFBhdGggYWZ0ZXIgYW4gZW50aXR5U2V0IG1lYW5zIGVudGl0eVR5cGVcblx0XHRcdGlmIChjdXJyZW50VmFsdWUgJiYgY3VycmVudFZhbHVlLl90eXBlID09PSBcIkVudGl0eVNldFwiICYmIGN1cnJlbnRWYWx1ZS5lbnRpdHlUeXBlKSB7XG5cdFx0XHRcdGlmIChpbmNsdWRlVmlzaXRlZE9iamVjdHMpIHtcblx0XHRcdFx0XHRhVmlzaXRlZE9iamVjdHMucHVzaChjdXJyZW50VmFsdWUpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGN1cnJlbnRWYWx1ZSA9IGN1cnJlbnRWYWx1ZS5lbnRpdHlUeXBlO1xuXHRcdFx0fVxuXHRcdFx0aWYgKGN1cnJlbnRWYWx1ZSAmJiBjdXJyZW50VmFsdWUuX3R5cGUgPT09IFwiTmF2aWdhdGlvblByb3BlcnR5XCIgJiYgY3VycmVudFZhbHVlLnRhcmdldFR5cGUpIHtcblx0XHRcdFx0aWYgKGluY2x1ZGVWaXNpdGVkT2JqZWN0cykge1xuXHRcdFx0XHRcdGFWaXNpdGVkT2JqZWN0cy5wdXNoKGN1cnJlbnRWYWx1ZSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0Y3VycmVudFZhbHVlID0gY3VycmVudFZhbHVlLnRhcmdldFR5cGU7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gY3VycmVudFZhbHVlO1xuXHRcdH1cblx0XHRpZiAoaW5jbHVkZVZpc2l0ZWRPYmplY3RzICYmIGN1cnJlbnRWYWx1ZSAhPT0gbnVsbCAmJiBjdXJyZW50VmFsdWUgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0YVZpc2l0ZWRPYmplY3RzLnB1c2goY3VycmVudFZhbHVlKTtcblx0XHR9XG5cdFx0aWYgKCFjdXJyZW50VmFsdWUpIHtcblx0XHRcdGN1cnJlbnRQYXRoID0gcGF0aFBhcnQ7XG5cdFx0fSBlbHNlIGlmIChjdXJyZW50VmFsdWUuX3R5cGUgPT09IFwiRW50aXR5U2V0XCIgJiYgcGF0aFBhcnQgPT09IFwiJFR5cGVcIikge1xuXHRcdFx0Y3VycmVudFZhbHVlID0gY3VycmVudFZhbHVlLnRhcmdldFR5cGU7XG5cdFx0XHRyZXR1cm4gY3VycmVudFZhbHVlO1xuXHRcdH0gZWxzZSBpZiAoY3VycmVudFZhbHVlLl90eXBlID09PSBcIkVudGl0eVNldFwiICYmIGN1cnJlbnRWYWx1ZS5lbnRpdHlUeXBlKSB7XG5cdFx0XHRjdXJyZW50UGF0aCA9IGNvbWJpbmVQYXRoKGN1cnJlbnRWYWx1ZS5lbnRpdHlUeXBlTmFtZSwgcGF0aFBhcnQpO1xuXHRcdH0gZWxzZSBpZiAoY3VycmVudFZhbHVlLl90eXBlID09PSBcIk5hdmlnYXRpb25Qcm9wZXJ0eVwiICYmIGN1cnJlbnRWYWx1ZS50YXJnZXRUeXBlTmFtZSkge1xuXHRcdFx0Y3VycmVudFBhdGggPSBjb21iaW5lUGF0aChjdXJyZW50VmFsdWUudGFyZ2V0VHlwZU5hbWUsIHBhdGhQYXJ0KTtcblx0XHR9IGVsc2UgaWYgKGN1cnJlbnRWYWx1ZS5fdHlwZSA9PT0gXCJOYXZpZ2F0aW9uUHJvcGVydHlcIiAmJiBjdXJyZW50VmFsdWUudGFyZ2V0VHlwZSkge1xuXHRcdFx0Y3VycmVudFBhdGggPSBjb21iaW5lUGF0aChjdXJyZW50VmFsdWUudGFyZ2V0VHlwZS5mdWxseVF1YWxpZmllZE5hbWUsIHBhdGhQYXJ0KTtcblx0XHR9IGVsc2UgaWYgKGN1cnJlbnRWYWx1ZS5fdHlwZSA9PT0gXCJQcm9wZXJ0eVwiKSB7XG5cdFx0XHQvLyBDb21wbGV4VHlwZSBvciBQcm9wZXJ0eVxuXHRcdFx0aWYgKGN1cnJlbnRWYWx1ZS50YXJnZXRUeXBlKSB7XG5cdFx0XHRcdGN1cnJlbnRQYXRoID0gY29tYmluZVBhdGgoY3VycmVudFZhbHVlLnRhcmdldFR5cGUuZnVsbHlRdWFsaWZpZWROYW1lLCBwYXRoUGFydCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRjdXJyZW50UGF0aCA9IGNvbWJpbmVQYXRoKGN1cnJlbnRWYWx1ZS5mdWxseVF1YWxpZmllZE5hbWUsIHBhdGhQYXJ0KTtcblx0XHRcdH1cblx0XHR9IGVsc2UgaWYgKGN1cnJlbnRWYWx1ZS5fdHlwZSA9PT0gXCJBY3Rpb25cIiAmJiBjdXJyZW50VmFsdWUuaXNCb3VuZCkge1xuXHRcdFx0Y3VycmVudFBhdGggPSBjb21iaW5lUGF0aChjdXJyZW50VmFsdWUuZnVsbHlRdWFsaWZpZWROYW1lLCBwYXRoUGFydCk7XG5cdFx0XHRpZiAoIW9iamVjdE1hcFtjdXJyZW50UGF0aF0pIHtcblx0XHRcdFx0Y3VycmVudFBhdGggPSBjb21iaW5lUGF0aChjdXJyZW50VmFsdWUuc291cmNlVHlwZSwgcGF0aFBhcnQpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSBpZiAoY3VycmVudFZhbHVlLl90eXBlID09PSBcIkFjdGlvblBhcmFtZXRlclwiICYmIGN1cnJlbnRWYWx1ZS5pc0VudGl0eVNldCkge1xuXHRcdFx0Y3VycmVudFBhdGggPSBjb21iaW5lUGF0aChjdXJyZW50VmFsdWUudHlwZSwgcGF0aFBhcnQpO1xuXHRcdH0gZWxzZSBpZiAoY3VycmVudFZhbHVlLl90eXBlID09PSBcIkFjdGlvblBhcmFtZXRlclwiICYmICFjdXJyZW50VmFsdWUuaXNFbnRpdHlTZXQpIHtcblx0XHRcdGN1cnJlbnRQYXRoID0gY29tYmluZVBhdGgoXG5cdFx0XHRcdGN1cnJlbnRUYXJnZXQuZnVsbHlRdWFsaWZpZWROYW1lLnN1YnN0cigwLCBjdXJyZW50VGFyZ2V0LmZ1bGx5UXVhbGlmaWVkTmFtZS5sYXN0SW5kZXhPZihcIi9cIikpLFxuXHRcdFx0XHRwYXRoUGFydFxuXHRcdFx0KTtcblx0XHRcdGlmICghb2JqZWN0TWFwW2N1cnJlbnRQYXRoXSkge1xuXHRcdFx0XHRsZXQgbGFzdElkeCA9IGN1cnJlbnRUYXJnZXQuZnVsbHlRdWFsaWZpZWROYW1lLmxhc3RJbmRleE9mKFwiL1wiKTtcblx0XHRcdFx0aWYgKGxhc3RJZHggPT09IC0xKSB7XG5cdFx0XHRcdFx0bGFzdElkeCA9IGN1cnJlbnRUYXJnZXQuZnVsbHlRdWFsaWZpZWROYW1lLmxlbmd0aDtcblx0XHRcdFx0fVxuXHRcdFx0XHRjdXJyZW50UGF0aCA9IGNvbWJpbmVQYXRoKFxuXHRcdFx0XHRcdChvYmplY3RNYXBbY3VycmVudFRhcmdldC5mdWxseVF1YWxpZmllZE5hbWUuc3Vic3RyKDAsIGxhc3RJZHgpXSBhcyBBY3Rpb24pLnNvdXJjZVR5cGUsXG5cdFx0XHRcdFx0cGF0aFBhcnRcblx0XHRcdFx0KTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0Y3VycmVudFBhdGggPSBjb21iaW5lUGF0aChjdXJyZW50VmFsdWUuZnVsbHlRdWFsaWZpZWROYW1lLCBwYXRoUGFydCk7XG5cdFx0XHRpZiAocGF0aFBhcnQgIT09IFwibmFtZVwiICYmIGN1cnJlbnRWYWx1ZVtwYXRoUGFydF0gIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRyZXR1cm4gY3VycmVudFZhbHVlW3BhdGhQYXJ0XTtcblx0XHRcdH0gZWxzZSBpZiAocGF0aFBhcnQgPT09IFwiJEFubm90YXRpb25QYXRoXCIgJiYgY3VycmVudFZhbHVlLiR0YXJnZXQpIHtcblx0XHRcdFx0Y29uc3QgY3VycmVudENvbnRleHQgPSBvYmplY3RNYXBbY3VycmVudFZhbHVlLmZ1bGx5UXVhbGlmaWVkTmFtZS5zcGxpdChcIkBcIilbMF1dO1xuXHRcdFx0XHRjb25zdCBzdWJUYXJnZXQ6IGFueSA9IHJlc29sdmVUYXJnZXQob2JqZWN0TWFwLCBjdXJyZW50Q29udGV4dCwgY3VycmVudFZhbHVlLnZhbHVlLCBmYWxzZSwgdHJ1ZSk7XG5cdFx0XHRcdHN1YlRhcmdldC52aXNpdGVkT2JqZWN0cy5mb3JFYWNoKCh2aXNpdGVkU3ViT2JqZWN0OiBhbnkpID0+IHtcblx0XHRcdFx0XHRpZiAoYVZpc2l0ZWRPYmplY3RzLmluZGV4T2YodmlzaXRlZFN1Yk9iamVjdCkgPT09IC0xKSB7XG5cdFx0XHRcdFx0XHRhVmlzaXRlZE9iamVjdHMucHVzaCh2aXNpdGVkU3ViT2JqZWN0KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRyZXR1cm4gc3ViVGFyZ2V0LnRhcmdldDtcblx0XHRcdH0gZWxzZSBpZiAocGF0aFBhcnQgPT09IFwiJFBhdGhcIiAmJiBjdXJyZW50VmFsdWUuJHRhcmdldCkge1xuXHRcdFx0XHRjdXJyZW50Q29udGV4dCA9IGFWaXNpdGVkT2JqZWN0c1xuXHRcdFx0XHRcdC5jb25jYXQoKVxuXHRcdFx0XHRcdC5yZXZlcnNlKClcblx0XHRcdFx0XHQuZmluZChcblx0XHRcdFx0XHRcdG9iaiA9PlxuXHRcdFx0XHRcdFx0XHRvYmouX3R5cGUgPT09IFwiRW50aXR5VHlwZVwiIHx8XG5cdFx0XHRcdFx0XHRcdG9iai5fdHlwZSA9PT0gXCJFbnRpdHlTZXRcIiB8fFxuXHRcdFx0XHRcdFx0XHRvYmouX3R5cGUgPT09IFwiTmF2aWdhdGlvblByb3BlcnR5XCJcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHRpZiAoY3VycmVudENvbnRleHQpIHtcblx0XHRcdFx0XHRjb25zdCBzdWJUYXJnZXQ6IGFueSA9IHJlc29sdmVUYXJnZXQob2JqZWN0TWFwLCBjdXJyZW50Q29udGV4dCwgY3VycmVudFZhbHVlLnBhdGgsIGZhbHNlLCB0cnVlKTtcblx0XHRcdFx0XHRzdWJUYXJnZXQudmlzaXRlZE9iamVjdHMuZm9yRWFjaCgodmlzaXRlZFN1Yk9iamVjdDogYW55KSA9PiB7XG5cdFx0XHRcdFx0XHRpZiAoYVZpc2l0ZWRPYmplY3RzLmluZGV4T2YodmlzaXRlZFN1Yk9iamVjdCkgPT09IC0xKSB7XG5cdFx0XHRcdFx0XHRcdGFWaXNpdGVkT2JqZWN0cy5wdXNoKHZpc2l0ZWRTdWJPYmplY3QpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdHJldHVybiBzdWJUYXJnZXQudGFyZ2V0O1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBjdXJyZW50VmFsdWUuJHRhcmdldDtcblx0XHRcdH0gZWxzZSBpZiAocGF0aFBhcnQuc3RhcnRzV2l0aChcIiRQYXRoXCIpICYmIGN1cnJlbnRWYWx1ZS4kdGFyZ2V0KSB7XG5cdFx0XHRcdGNvbnN0IGludGVybWVkaWF0ZVRhcmdldCA9IGN1cnJlbnRWYWx1ZS4kdGFyZ2V0O1xuXHRcdFx0XHRjdXJyZW50UGF0aCA9IGNvbWJpbmVQYXRoKGludGVybWVkaWF0ZVRhcmdldC5mdWxseVF1YWxpZmllZE5hbWUsIHBhdGhQYXJ0LnN1YnN0cig1KSk7XG5cdFx0XHR9IGVsc2UgaWYgKGN1cnJlbnRWYWx1ZS5oYXNPd25Qcm9wZXJ0eShcIiRUeXBlXCIpICYmICFvYmplY3RNYXBbY3VycmVudFBhdGhdKSB7XG5cdFx0XHRcdC8vIFRoaXMgaXMgbm93IGFuIGFubm90YXRpb24gdmFsdWVcblx0XHRcdFx0Y29uc3QgZW50aXR5VHlwZSA9IG9iamVjdE1hcFtjdXJyZW50VmFsdWUuZnVsbHlRdWFsaWZpZWROYW1lLnNwbGl0KFwiQFwiKVswXV07XG5cdFx0XHRcdGlmIChlbnRpdHlUeXBlKSB7XG5cdFx0XHRcdFx0Y3VycmVudFBhdGggPSBjb21iaW5lUGF0aChlbnRpdHlUeXBlLmZ1bGx5UXVhbGlmaWVkTmFtZSwgcGF0aFBhcnQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBvYmplY3RNYXBbY3VycmVudFBhdGhdO1xuXHR9LCBudWxsKTtcblx0aWYgKCF0YXJnZXQpIHtcblx0XHRpZiAoYW5ub3RhdGlvbnNUZXJtICYmIGFubm90YXRpb25UeXBlKSB7XG5cdFx0XHR2YXIgb0Vycm9yTXNnID0ge1xuXHRcdFx0XHRtZXNzYWdlOlxuXHRcdFx0XHRcdFwiVW5hYmxlIHRvIHJlc29sdmUgdGhlIHBhdGggZXhwcmVzc2lvbjogXCIgK1xuXHRcdFx0XHRcdFwiXFxuXCIgK1xuXHRcdFx0XHRcdHBhdGggK1xuXHRcdFx0XHRcdFwiXFxuXCIgK1xuXHRcdFx0XHRcdFwiXFxuXCIgK1xuXHRcdFx0XHRcdFwiSGludDogQ2hlY2sgYW5kIGNvcnJlY3QgdGhlIHBhdGggdmFsdWVzIHVuZGVyIHRoZSBmb2xsb3dpbmcgc3RydWN0dXJlIGluIHRoZSBtZXRhZGF0YSAoYW5ub3RhdGlvbi54bWwgZmlsZSBvciBDRFMgYW5ub3RhdGlvbnMgZm9yIHRoZSBhcHBsaWNhdGlvbik6IFxcblxcblwiICtcblx0XHRcdFx0XHRcIjxBbm5vdGF0aW9uIFRlcm0gPSBcIiArXG5cdFx0XHRcdFx0YW5ub3RhdGlvbnNUZXJtICtcblx0XHRcdFx0XHRcIj5cIiArXG5cdFx0XHRcdFx0XCJcXG5cIiArXG5cdFx0XHRcdFx0XCI8UmVjb3JkIFR5cGUgPSBcIiArXG5cdFx0XHRcdFx0YW5ub3RhdGlvblR5cGUgK1xuXHRcdFx0XHRcdFwiPlwiICtcblx0XHRcdFx0XHRcIlxcblwiICtcblx0XHRcdFx0XHRcIjxBbm5vdGF0aW9uUGF0aCA9IFwiICtcblx0XHRcdFx0XHRwYXRoICtcblx0XHRcdFx0XHRcIj5cIlxuXHRcdFx0fTtcblx0XHRcdGFkZEFubm90YXRpb25FcnJvck1lc3NhZ2UocGF0aCwgb0Vycm9yTXNnKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dmFyIG9FcnJvck1zZyA9IHtcblx0XHRcdFx0bWVzc2FnZTpcblx0XHRcdFx0XHRcIlVuYWJsZSB0byByZXNvbHZlIHRoZSBwYXRoIGV4cHJlc3Npb246IFwiICtcblx0XHRcdFx0XHRwYXRoICtcblx0XHRcdFx0XHRcIlxcblwiICtcblx0XHRcdFx0XHRcIlxcblwiICtcblx0XHRcdFx0XHRcIkhpbnQ6IENoZWNrIGFuZCBjb3JyZWN0IHRoZSBwYXRoIHZhbHVlcyB1bmRlciB0aGUgZm9sbG93aW5nIHN0cnVjdHVyZSBpbiB0aGUgbWV0YWRhdGEgKGFubm90YXRpb24ueG1sIGZpbGUgb3IgQ0RTIGFubm90YXRpb25zIGZvciB0aGUgYXBwbGljYXRpb24pOiBcXG5cXG5cIiArXG5cdFx0XHRcdFx0XCI8QW5ub3RhdGlvbiBUZXJtID0gXCIgK1xuXHRcdFx0XHRcdHBhdGhTcGxpdFswXSArXG5cdFx0XHRcdFx0XCI+XCIgK1xuXHRcdFx0XHRcdFwiXFxuXCIgK1xuXHRcdFx0XHRcdFwiPFByb3BlcnR5VmFsdWUgIFBhdGg9IFwiICtcblx0XHRcdFx0XHRwYXRoU3BsaXRbMV0gK1xuXHRcdFx0XHRcdFwiPlwiXG5cdFx0XHR9O1xuXHRcdFx0YWRkQW5ub3RhdGlvbkVycm9yTWVzc2FnZShwYXRoLCBvRXJyb3JNc2cpO1xuXHRcdH1cblx0XHQvLyBjb25zb2xlLmxvZyhcIk1pc3NpbmcgdGFyZ2V0IFwiICsgcGF0aCk7XG5cdH1cblx0aWYgKHBhdGhPbmx5KSB7XG5cdFx0cmV0dXJuIGN1cnJlbnRQYXRoO1xuXHR9XG5cdGlmIChpbmNsdWRlVmlzaXRlZE9iamVjdHMpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0dmlzaXRlZE9iamVjdHM6IGFWaXNpdGVkT2JqZWN0cyxcblx0XHRcdHRhcmdldDogdGFyZ2V0XG5cdFx0fTtcblx0fVxuXHRyZXR1cm4gdGFyZ2V0O1xufVxuXG5mdW5jdGlvbiBpc0Fubm90YXRpb25QYXRoKHBhdGhTdHI6IHN0cmluZyk6IGJvb2xlYW4ge1xuXHRyZXR1cm4gcGF0aFN0ci5pbmRleE9mKFwiQFwiKSAhPT0gLTE7XG59XG5cbmZ1bmN0aW9uIHBhcnNlVmFsdWUoXG5cdHByb3BlcnR5VmFsdWU6IEV4cHJlc3Npb24sXG5cdHZhbHVlRlFOOiBzdHJpbmcsXG5cdHBhcnNlck91dHB1dDogUGFyc2VyT3V0cHV0LFxuXHRjdXJyZW50VGFyZ2V0OiBhbnksXG5cdG9iamVjdE1hcDogYW55LFxuXHR0b1Jlc29sdmU6IFJlc29sdmVhYmxlW10sXG5cdGFubm90YXRpb25Tb3VyY2U6IHN0cmluZyxcblx0dW5yZXNvbHZlZEFubm90YXRpb25zOiBBbm5vdGF0aW9uTGlzdFtdLFxuXHRhbm5vdGF0aW9uVHlwZTogc3RyaW5nLFxuXHRhbm5vdGF0aW9uc1Rlcm06IHN0cmluZ1xuKSB7XG5cdGlmIChwcm9wZXJ0eVZhbHVlID09PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gdW5kZWZpbmVkO1xuXHR9XG5cdHN3aXRjaCAocHJvcGVydHlWYWx1ZS50eXBlKSB7XG5cdFx0Y2FzZSBcIlN0cmluZ1wiOlxuXHRcdFx0cmV0dXJuIHByb3BlcnR5VmFsdWUuU3RyaW5nO1xuXHRcdGNhc2UgXCJJbnRcIjpcblx0XHRcdHJldHVybiBwcm9wZXJ0eVZhbHVlLkludDtcblx0XHRjYXNlIFwiQm9vbFwiOlxuXHRcdFx0cmV0dXJuIHByb3BlcnR5VmFsdWUuQm9vbDtcblx0XHRjYXNlIFwiRGVjaW1hbFwiOlxuXHRcdFx0cmV0dXJuIHByb3BlcnR5VmFsdWUuRGVjaW1hbDtcblx0XHRjYXNlIFwiRGF0ZVwiOlxuXHRcdFx0cmV0dXJuIHByb3BlcnR5VmFsdWUuRGF0ZTtcblx0XHRjYXNlIFwiRW51bU1lbWJlclwiOlxuXHRcdFx0cmV0dXJuIGFsaWFzKHBhcnNlck91dHB1dC5yZWZlcmVuY2VzLCBwcm9wZXJ0eVZhbHVlLkVudW1NZW1iZXIpO1xuXHRcdGNhc2UgXCJQcm9wZXJ0eVBhdGhcIjpcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdHR5cGU6IFwiUHJvcGVydHlQYXRoXCIsXG5cdFx0XHRcdHZhbHVlOiBwcm9wZXJ0eVZhbHVlLlByb3BlcnR5UGF0aCxcblx0XHRcdFx0ZnVsbHlRdWFsaWZpZWROYW1lOiB2YWx1ZUZRTixcblx0XHRcdFx0JHRhcmdldDogcmVzb2x2ZVRhcmdldChcblx0XHRcdFx0XHRvYmplY3RNYXAsXG5cdFx0XHRcdFx0Y3VycmVudFRhcmdldCxcblx0XHRcdFx0XHRwcm9wZXJ0eVZhbHVlLlByb3BlcnR5UGF0aCxcblx0XHRcdFx0XHRmYWxzZSxcblx0XHRcdFx0XHRmYWxzZSxcblx0XHRcdFx0XHRhbm5vdGF0aW9uVHlwZSxcblx0XHRcdFx0XHRhbm5vdGF0aW9uc1Rlcm1cblx0XHRcdFx0KVxuXHRcdFx0fTtcblx0XHRjYXNlIFwiTmF2aWdhdGlvblByb3BlcnR5UGF0aFwiOlxuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0dHlwZTogXCJOYXZpZ2F0aW9uUHJvcGVydHlQYXRoXCIsXG5cdFx0XHRcdHZhbHVlOiBwcm9wZXJ0eVZhbHVlLk5hdmlnYXRpb25Qcm9wZXJ0eVBhdGgsXG5cdFx0XHRcdGZ1bGx5UXVhbGlmaWVkTmFtZTogdmFsdWVGUU4sXG5cdFx0XHRcdCR0YXJnZXQ6IHJlc29sdmVUYXJnZXQoXG5cdFx0XHRcdFx0b2JqZWN0TWFwLFxuXHRcdFx0XHRcdGN1cnJlbnRUYXJnZXQsXG5cdFx0XHRcdFx0cHJvcGVydHlWYWx1ZS5OYXZpZ2F0aW9uUHJvcGVydHlQYXRoLFxuXHRcdFx0XHRcdGZhbHNlLFxuXHRcdFx0XHRcdGZhbHNlLFxuXHRcdFx0XHRcdGFubm90YXRpb25UeXBlLFxuXHRcdFx0XHRcdGFubm90YXRpb25zVGVybVxuXHRcdFx0XHQpXG5cdFx0XHR9O1xuXHRcdGNhc2UgXCJBbm5vdGF0aW9uUGF0aFwiOlxuXHRcdFx0Y29uc3QgYW5ub3RhdGlvblRhcmdldCA9IHJlc29sdmVUYXJnZXQoXG5cdFx0XHRcdG9iamVjdE1hcCxcblx0XHRcdFx0Y3VycmVudFRhcmdldCxcblx0XHRcdFx0dW5hbGlhcyhwYXJzZXJPdXRwdXQucmVmZXJlbmNlcywgcHJvcGVydHlWYWx1ZS5Bbm5vdGF0aW9uUGF0aCkgYXMgc3RyaW5nLFxuXHRcdFx0XHR0cnVlLFxuXHRcdFx0XHRmYWxzZSxcblx0XHRcdFx0YW5ub3RhdGlvblR5cGUsXG5cdFx0XHRcdGFubm90YXRpb25zVGVybVxuXHRcdFx0KTtcblx0XHRcdGNvbnN0IGFubm90YXRpb25QYXRoID0ge1xuXHRcdFx0XHR0eXBlOiBcIkFubm90YXRpb25QYXRoXCIsXG5cdFx0XHRcdHZhbHVlOiBwcm9wZXJ0eVZhbHVlLkFubm90YXRpb25QYXRoLFxuXHRcdFx0XHRmdWxseVF1YWxpZmllZE5hbWU6IHZhbHVlRlFOLFxuXHRcdFx0XHQkdGFyZ2V0OiBhbm5vdGF0aW9uVGFyZ2V0LFxuXHRcdFx0XHRhbm5vdGF0aW9uVHlwZTogYW5ub3RhdGlvblR5cGUsXG5cdFx0XHRcdGFubm90YXRpb25zVGVybTogYW5ub3RhdGlvbnNUZXJtLFxuXHRcdFx0XHR0ZXJtOiBcIlwiLFxuXHRcdFx0XHRwYXRoOiBcIlwiXG5cdFx0XHR9O1xuXHRcdFx0dG9SZXNvbHZlLnB1c2goeyBpbmxpbmU6IGZhbHNlLCB0b1Jlc29sdmU6IGFubm90YXRpb25QYXRoIH0pO1xuXHRcdFx0cmV0dXJuIGFubm90YXRpb25QYXRoO1xuXHRcdGNhc2UgXCJQYXRoXCI6XG5cdFx0XHRjb25zdCAkdGFyZ2V0ID0gcmVzb2x2ZVRhcmdldChcblx0XHRcdFx0b2JqZWN0TWFwLFxuXHRcdFx0XHRjdXJyZW50VGFyZ2V0LFxuXHRcdFx0XHRwcm9wZXJ0eVZhbHVlLlBhdGgsXG5cdFx0XHRcdHRydWUsXG5cdFx0XHRcdGZhbHNlLFxuXHRcdFx0XHRhbm5vdGF0aW9uVHlwZSxcblx0XHRcdFx0YW5ub3RhdGlvbnNUZXJtXG5cdFx0XHQpO1xuXHRcdFx0Y29uc3QgcGF0aCA9IG5ldyBQYXRoKHByb3BlcnR5VmFsdWUsICR0YXJnZXQsIGFubm90YXRpb25zVGVybSwgYW5ub3RhdGlvblR5cGUsIFwiXCIpO1xuXHRcdFx0dG9SZXNvbHZlLnB1c2goe1xuXHRcdFx0XHRpbmxpbmU6IGlzQW5ub3RhdGlvblBhdGgocHJvcGVydHlWYWx1ZS5QYXRoKSxcblx0XHRcdFx0dG9SZXNvbHZlOiBwYXRoXG5cdFx0XHR9KTtcblx0XHRcdHJldHVybiBwYXRoO1xuXG5cdFx0Y2FzZSBcIlJlY29yZFwiOlxuXHRcdFx0cmV0dXJuIHBhcnNlUmVjb3JkKFxuXHRcdFx0XHRwcm9wZXJ0eVZhbHVlLlJlY29yZCxcblx0XHRcdFx0dmFsdWVGUU4sXG5cdFx0XHRcdHBhcnNlck91dHB1dCxcblx0XHRcdFx0Y3VycmVudFRhcmdldCxcblx0XHRcdFx0b2JqZWN0TWFwLFxuXHRcdFx0XHR0b1Jlc29sdmUsXG5cdFx0XHRcdGFubm90YXRpb25Tb3VyY2UsXG5cdFx0XHRcdHVucmVzb2x2ZWRBbm5vdGF0aW9ucyxcblx0XHRcdFx0YW5ub3RhdGlvblR5cGUsXG5cdFx0XHRcdGFubm90YXRpb25zVGVybVxuXHRcdFx0KTtcblx0XHRjYXNlIFwiQ29sbGVjdGlvblwiOlxuXHRcdFx0cmV0dXJuIHBhcnNlQ29sbGVjdGlvbihcblx0XHRcdFx0cHJvcGVydHlWYWx1ZS5Db2xsZWN0aW9uLFxuXHRcdFx0XHR2YWx1ZUZRTixcblx0XHRcdFx0cGFyc2VyT3V0cHV0LFxuXHRcdFx0XHRjdXJyZW50VGFyZ2V0LFxuXHRcdFx0XHRvYmplY3RNYXAsXG5cdFx0XHRcdHRvUmVzb2x2ZSxcblx0XHRcdFx0YW5ub3RhdGlvblNvdXJjZSxcblx0XHRcdFx0dW5yZXNvbHZlZEFubm90YXRpb25zLFxuXHRcdFx0XHRhbm5vdGF0aW9uVHlwZSxcblx0XHRcdFx0YW5ub3RhdGlvbnNUZXJtXG5cdFx0XHQpO1xuXHRcdGNhc2UgXCJBcHBseVwiOlxuXHRcdGNhc2UgXCJOb3RcIjpcblx0XHRjYXNlIFwiRXFcIjpcblx0XHRjYXNlIFwiTmVcIjpcblx0XHRjYXNlIFwiR3RcIjpcblx0XHRjYXNlIFwiR2VcIjpcblx0XHRjYXNlIFwiTHRcIjpcblx0XHRjYXNlIFwiTGVcIjpcblx0XHRjYXNlIFwiSWZcIjpcblx0XHRjYXNlIFwiQW5kXCI6XG5cdFx0Y2FzZSBcIk9yXCI6XG5cdFx0XHRyZXR1cm4gcHJvcGVydHlWYWx1ZTtcblx0fVxufVxuXG5mdW5jdGlvbiBpbmZlclR5cGVGcm9tVGVybShhbm5vdGF0aW9uc1Rlcm06IHN0cmluZywgcGFyc2VyT3V0cHV0OiBQYXJzZXJPdXRwdXQsIGFubm90YXRpb25UYXJnZXQ6IHN0cmluZykge1xuXHRjb25zdCB0YXJnZXRUeXBlID0gKFRlcm1Ub1R5cGVzIGFzIGFueSlbYW5ub3RhdGlvbnNUZXJtXTtcblx0dmFyIG9FcnJvck1zZyA9IHtcblx0XHRpc0Vycm9yOiBmYWxzZSxcblx0XHRtZXNzYWdlOiBgVGhlIHR5cGUgb2YgdGhlIHJlY29yZCB1c2VkIHdpdGhpbiB0aGUgdGVybSAke2Fubm90YXRpb25zVGVybX0gd2FzIG5vdCBkZWZpbmVkIGFuZCB3YXMgaW5mZXJyZWQgYXMgJHt0YXJnZXRUeXBlfS5cbkhpbnQ6IElmIHBvc3NpYmxlLCB0cnkgdG8gbWFpbnRhaW4gdGhlIFR5cGUgcHJvcGVydHkgZm9yIGVhY2ggUmVjb3JkLlxuPEFubm90YXRpb25zIFRhcmdldD1cIiR7YW5ub3RhdGlvblRhcmdldH1cIj5cblx0PEFubm90YXRpb24gVGVybT1cIiR7YW5ub3RhdGlvbnNUZXJtfVwiPlxuXHRcdDxSZWNvcmQ+Li4uPC9SZWNvcmQ+XG5cdDwvQW5ub3RhdGlvbj5cbjwvQW5ub3RhdGlvbnM+YFxuXHR9O1xuXHRhZGRBbm5vdGF0aW9uRXJyb3JNZXNzYWdlKGFubm90YXRpb25UYXJnZXQgKyBcIi9cIiArIGFubm90YXRpb25zVGVybSwgb0Vycm9yTXNnKTtcblx0cmV0dXJuIHRhcmdldFR5cGU7XG59XG5cbmZ1bmN0aW9uIHBhcnNlUmVjb3JkKFxuXHRyZWNvcmREZWZpbml0aW9uOiBBbm5vdGF0aW9uUmVjb3JkLFxuXHRjdXJyZW50RlFOOiBzdHJpbmcsXG5cdHBhcnNlck91dHB1dDogUGFyc2VyT3V0cHV0LFxuXHRjdXJyZW50VGFyZ2V0OiBhbnksXG5cdG9iamVjdE1hcDogYW55LFxuXHR0b1Jlc29sdmU6IFJlc29sdmVhYmxlW10sXG5cdGFubm90YXRpb25Tb3VyY2U6IHN0cmluZyxcblx0dW5yZXNvbHZlZEFubm90YXRpb25zOiBBbm5vdGF0aW9uTGlzdFtdLFxuXHRhbm5vdGF0aW9uVHlwZTogc3RyaW5nLFxuXHRhbm5vdGF0aW9uc1Rlcm06IHN0cmluZ1xuKSB7XG5cdGxldCB0YXJnZXRUeXBlO1xuXHRpZiAoIXJlY29yZERlZmluaXRpb24udHlwZSAmJiBhbm5vdGF0aW9uc1Rlcm0pIHtcblx0XHR0YXJnZXRUeXBlID0gaW5mZXJUeXBlRnJvbVRlcm0oYW5ub3RhdGlvbnNUZXJtLCBwYXJzZXJPdXRwdXQsIGN1cnJlbnRUYXJnZXQuZnVsbHlRdWFsaWZpZWROYW1lKTtcblx0fSBlbHNlIHtcblx0XHR0YXJnZXRUeXBlID0gdW5hbGlhcyhwYXJzZXJPdXRwdXQucmVmZXJlbmNlcywgcmVjb3JkRGVmaW5pdGlvbi50eXBlKTtcblx0fVxuXHRjb25zdCBhbm5vdGF0aW9uVGVybTogYW55ID0ge1xuXHRcdCRUeXBlOiB0YXJnZXRUeXBlLFxuXHRcdGZ1bGx5UXVhbGlmaWVkTmFtZTogY3VycmVudEZRTlxuXHR9O1xuXHRjb25zdCBhbm5vdGF0aW9uQ29udGVudDogYW55ID0ge307XG5cdGlmIChyZWNvcmREZWZpbml0aW9uLmFubm90YXRpb25zICYmIEFycmF5LmlzQXJyYXkocmVjb3JkRGVmaW5pdGlvbi5hbm5vdGF0aW9ucykpIHtcblx0XHRjb25zdCBzdWJBbm5vdGF0aW9uTGlzdCA9IHtcblx0XHRcdHRhcmdldDogY3VycmVudEZRTixcblx0XHRcdGFubm90YXRpb25zOiByZWNvcmREZWZpbml0aW9uLmFubm90YXRpb25zLFxuXHRcdFx0X19zb3VyY2U6IGFubm90YXRpb25Tb3VyY2Vcblx0XHR9O1xuXHRcdHVucmVzb2x2ZWRBbm5vdGF0aW9ucy5wdXNoKHN1YkFubm90YXRpb25MaXN0KTtcblx0fVxuXHRyZWNvcmREZWZpbml0aW9uLnByb3BlcnR5VmFsdWVzLmZvckVhY2goKHByb3BlcnR5VmFsdWU6IFByb3BlcnR5VmFsdWUpID0+IHtcblx0XHRhbm5vdGF0aW9uQ29udGVudFtwcm9wZXJ0eVZhbHVlLm5hbWVdID0gcGFyc2VWYWx1ZShcblx0XHRcdHByb3BlcnR5VmFsdWUudmFsdWUsXG5cdFx0XHRgJHtjdXJyZW50RlFOfS8ke3Byb3BlcnR5VmFsdWUubmFtZX1gLFxuXHRcdFx0cGFyc2VyT3V0cHV0LFxuXHRcdFx0Y3VycmVudFRhcmdldCxcblx0XHRcdG9iamVjdE1hcCxcblx0XHRcdHRvUmVzb2x2ZSxcblx0XHRcdGFubm90YXRpb25Tb3VyY2UsXG5cdFx0XHR1bnJlc29sdmVkQW5ub3RhdGlvbnMsXG5cdFx0XHRhbm5vdGF0aW9uVHlwZSxcblx0XHRcdGFubm90YXRpb25zVGVybVxuXHRcdCk7XG5cdFx0aWYgKHByb3BlcnR5VmFsdWUuYW5ub3RhdGlvbnMgJiYgQXJyYXkuaXNBcnJheShwcm9wZXJ0eVZhbHVlLmFubm90YXRpb25zKSkge1xuXHRcdFx0Y29uc3Qgc3ViQW5ub3RhdGlvbkxpc3QgPSB7XG5cdFx0XHRcdHRhcmdldDogYCR7Y3VycmVudEZRTn0vJHtwcm9wZXJ0eVZhbHVlLm5hbWV9YCxcblx0XHRcdFx0YW5ub3RhdGlvbnM6IHByb3BlcnR5VmFsdWUuYW5ub3RhdGlvbnMsXG5cdFx0XHRcdF9fc291cmNlOiBhbm5vdGF0aW9uU291cmNlXG5cdFx0XHR9O1xuXHRcdFx0dW5yZXNvbHZlZEFubm90YXRpb25zLnB1c2goc3ViQW5ub3RhdGlvbkxpc3QpO1xuXHRcdH1cblx0XHRpZiAoXG5cdFx0XHRhbm5vdGF0aW9uQ29udGVudC5oYXNPd25Qcm9wZXJ0eShcIkFjdGlvblwiKSAmJlxuXHRcdFx0KGFubm90YXRpb25UZXJtLiRUeXBlID09PSBcImNvbS5zYXAudm9jYWJ1bGFyaWVzLlVJLnYxLkRhdGFGaWVsZEZvckFjdGlvblwiIHx8XG5cdFx0XHRcdGFubm90YXRpb25UZXJtLiRUeXBlID09PSBcImNvbS5zYXAudm9jYWJ1bGFyaWVzLlVJLnYxLkRhdGFGaWVsZFdpdGhBY3Rpb25cIilcblx0XHQpIHtcblx0XHRcdGFubm90YXRpb25Db250ZW50LkFjdGlvblRhcmdldCA9XG5cdFx0XHRcdChjdXJyZW50VGFyZ2V0LmFjdGlvbnMgJiYgY3VycmVudFRhcmdldC5hY3Rpb25zW2Fubm90YXRpb25Db250ZW50LkFjdGlvbl0pIHx8XG5cdFx0XHRcdG9iamVjdE1hcFthbm5vdGF0aW9uQ29udGVudC5BY3Rpb25dO1xuXHRcdFx0aWYgKCFhbm5vdGF0aW9uQ29udGVudC5BY3Rpb25UYXJnZXQpIHtcblx0XHRcdFx0Ly8gQWRkIHRvIGRpYWdub3N0aWNzIGRlYnVnZ2VyO1xuXHRcdFx0XHRBTk5PVEFUSU9OX0VSUk9SUy5wdXNoKHtcblx0XHRcdFx0XHRtZXNzYWdlOlxuXHRcdFx0XHRcdFx0XCJVbmFibGUgdG8gcmVzb2x2ZSB0aGUgYWN0aW9uIFwiICtcblx0XHRcdFx0XHRcdGFubm90YXRpb25Db250ZW50LkFjdGlvbiArXG5cdFx0XHRcdFx0XHRcIiBkZWZpbmVkIGZvciBcIiArXG5cdFx0XHRcdFx0XHRhbm5vdGF0aW9uVGVybS5mdWxseVF1YWxpZmllZE5hbWVcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9KTtcblx0cmV0dXJuIE9iamVjdC5hc3NpZ24oYW5ub3RhdGlvblRlcm0sIGFubm90YXRpb25Db250ZW50KTtcbn1cblxuZXhwb3J0IHR5cGUgQ29sbGVjdGlvblR5cGUgPVxuXHR8IFwiUHJvcGVydHlQYXRoXCJcblx0fCBcIlBhdGhcIlxuXHR8IFwiSWZcIlxuXHR8IFwiQXBwbHlcIlxuXHR8IFwiQW5kXCJcblx0fCBcIkVxXCJcblx0fCBcIk5lXCJcblx0fCBcIk5vdFwiXG5cdHwgXCJHdFwiXG5cdHwgXCJHZVwiXG5cdHwgXCJMdFwiXG5cdHwgXCJMZVwiXG5cdHwgXCJPclwiXG5cdHwgXCJBbm5vdGF0aW9uUGF0aFwiXG5cdHwgXCJOYXZpZ2F0aW9uUHJvcGVydHlQYXRoXCJcblx0fCBcIlJlY29yZFwiXG5cdHwgXCJTdHJpbmdcIlxuXHR8IFwiRW1wdHlDb2xsZWN0aW9uXCI7XG5cbmZ1bmN0aW9uIGdldE9ySW5mZXJDb2xsZWN0aW9uVHlwZShjb2xsZWN0aW9uRGVmaW5pdGlvbjogYW55W10pOiBDb2xsZWN0aW9uVHlwZSB7XG5cdGxldCB0eXBlOiBDb2xsZWN0aW9uVHlwZSA9IChjb2xsZWN0aW9uRGVmaW5pdGlvbiBhcyBhbnkpLnR5cGU7XG5cdGlmICh0eXBlID09PSB1bmRlZmluZWQgJiYgY29sbGVjdGlvbkRlZmluaXRpb24ubGVuZ3RoID4gMCkge1xuXHRcdGNvbnN0IGZpcnN0Q29sSXRlbSA9IGNvbGxlY3Rpb25EZWZpbml0aW9uWzBdO1xuXHRcdGlmIChmaXJzdENvbEl0ZW0uaGFzT3duUHJvcGVydHkoXCJQcm9wZXJ0eVBhdGhcIikpIHtcblx0XHRcdHR5cGUgPSBcIlByb3BlcnR5UGF0aFwiO1xuXHRcdH0gZWxzZSBpZiAoZmlyc3RDb2xJdGVtLmhhc093blByb3BlcnR5KFwiUGF0aFwiKSkge1xuXHRcdFx0dHlwZSA9IFwiUGF0aFwiO1xuXHRcdH0gZWxzZSBpZiAoZmlyc3RDb2xJdGVtLmhhc093blByb3BlcnR5KFwiQW5ub3RhdGlvblBhdGhcIikpIHtcblx0XHRcdHR5cGUgPSBcIkFubm90YXRpb25QYXRoXCI7XG5cdFx0fSBlbHNlIGlmIChmaXJzdENvbEl0ZW0uaGFzT3duUHJvcGVydHkoXCJOYXZpZ2F0aW9uUHJvcGVydHlQYXRoXCIpKSB7XG5cdFx0XHR0eXBlID0gXCJOYXZpZ2F0aW9uUHJvcGVydHlQYXRoXCI7XG5cdFx0fSBlbHNlIGlmIChcblx0XHRcdHR5cGVvZiBmaXJzdENvbEl0ZW0gPT09IFwib2JqZWN0XCIgJiZcblx0XHRcdChmaXJzdENvbEl0ZW0uaGFzT3duUHJvcGVydHkoXCJ0eXBlXCIpIHx8IGZpcnN0Q29sSXRlbS5oYXNPd25Qcm9wZXJ0eShcInByb3BlcnR5VmFsdWVzXCIpKVxuXHRcdCkge1xuXHRcdFx0dHlwZSA9IFwiUmVjb3JkXCI7XG5cdFx0fSBlbHNlIGlmICh0eXBlb2YgZmlyc3RDb2xJdGVtID09PSBcInN0cmluZ1wiKSB7XG5cdFx0XHR0eXBlID0gXCJTdHJpbmdcIjtcblx0XHR9XG5cdH0gZWxzZSBpZiAodHlwZSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0dHlwZSA9IFwiRW1wdHlDb2xsZWN0aW9uXCI7XG5cdH1cblx0cmV0dXJuIHR5cGU7XG59XG5cbmZ1bmN0aW9uIHBhcnNlQ29sbGVjdGlvbihcblx0Y29sbGVjdGlvbkRlZmluaXRpb246IGFueVtdLFxuXHRwYXJlbnRGUU46IHN0cmluZyxcblx0cGFyc2VyT3V0cHV0OiBQYXJzZXJPdXRwdXQsXG5cdGN1cnJlbnRUYXJnZXQ6IGFueSxcblx0b2JqZWN0TWFwOiBhbnksXG5cdHRvUmVzb2x2ZTogUmVzb2x2ZWFibGVbXSxcblx0YW5ub3RhdGlvblNvdXJjZTogc3RyaW5nLFxuXHR1bnJlc29sdmVkQW5ub3RhdGlvbnM6IEFubm90YXRpb25MaXN0W10sXG5cdGFubm90YXRpb25UeXBlOiBzdHJpbmcsXG5cdGFubm90YXRpb25zVGVybTogc3RyaW5nXG4pIHtcblx0Y29uc3QgY29sbGVjdGlvbkRlZmluaXRpb25UeXBlID0gZ2V0T3JJbmZlckNvbGxlY3Rpb25UeXBlKGNvbGxlY3Rpb25EZWZpbml0aW9uKTtcblx0c3dpdGNoIChjb2xsZWN0aW9uRGVmaW5pdGlvblR5cGUpIHtcblx0XHRjYXNlIFwiUHJvcGVydHlQYXRoXCI6XG5cdFx0XHRyZXR1cm4gY29sbGVjdGlvbkRlZmluaXRpb24ubWFwKChwcm9wZXJ0eVBhdGgsIHByb3BlcnR5SWR4KSA9PiB7XG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0dHlwZTogXCJQcm9wZXJ0eVBhdGhcIixcblx0XHRcdFx0XHR2YWx1ZTogcHJvcGVydHlQYXRoLlByb3BlcnR5UGF0aCxcblx0XHRcdFx0XHRmdWxseVF1YWxpZmllZE5hbWU6IGAke3BhcmVudEZRTn0vJHtwcm9wZXJ0eUlkeH1gLFxuXHRcdFx0XHRcdCR0YXJnZXQ6IHJlc29sdmVUYXJnZXQoXG5cdFx0XHRcdFx0XHRvYmplY3RNYXAsXG5cdFx0XHRcdFx0XHRjdXJyZW50VGFyZ2V0LFxuXHRcdFx0XHRcdFx0cHJvcGVydHlQYXRoLlByb3BlcnR5UGF0aCxcblx0XHRcdFx0XHRcdGZhbHNlLFxuXHRcdFx0XHRcdFx0ZmFsc2UsXG5cdFx0XHRcdFx0XHRhbm5vdGF0aW9uVHlwZSxcblx0XHRcdFx0XHRcdGFubm90YXRpb25zVGVybVxuXHRcdFx0XHRcdClcblx0XHRcdFx0fTtcblx0XHRcdH0pO1xuXHRcdGNhc2UgXCJQYXRoXCI6XG5cdFx0XHRyZXR1cm4gY29sbGVjdGlvbkRlZmluaXRpb24ubWFwKHBhdGhWYWx1ZSA9PiB7XG5cdFx0XHRcdGNvbnN0ICR0YXJnZXQgPSByZXNvbHZlVGFyZ2V0KFxuXHRcdFx0XHRcdG9iamVjdE1hcCxcblx0XHRcdFx0XHRjdXJyZW50VGFyZ2V0LFxuXHRcdFx0XHRcdHBhdGhWYWx1ZS5QYXRoLFxuXHRcdFx0XHRcdHRydWUsXG5cdFx0XHRcdFx0ZmFsc2UsXG5cdFx0XHRcdFx0YW5ub3RhdGlvblR5cGUsXG5cdFx0XHRcdFx0YW5ub3RhdGlvbnNUZXJtXG5cdFx0XHRcdCk7XG5cdFx0XHRcdGNvbnN0IHBhdGggPSBuZXcgUGF0aChwYXRoVmFsdWUsICR0YXJnZXQsIGFubm90YXRpb25zVGVybSwgYW5ub3RhdGlvblR5cGUsIFwiXCIpO1xuXHRcdFx0XHR0b1Jlc29sdmUucHVzaCh7XG5cdFx0XHRcdFx0aW5saW5lOiBpc0Fubm90YXRpb25QYXRoKHBhdGhWYWx1ZS5QYXRoKSxcblx0XHRcdFx0XHR0b1Jlc29sdmU6IHBhdGhcblx0XHRcdFx0fSk7XG5cdFx0XHRcdHJldHVybiBwYXRoO1xuXHRcdFx0fSk7XG5cdFx0Y2FzZSBcIkFubm90YXRpb25QYXRoXCI6XG5cdFx0XHRyZXR1cm4gY29sbGVjdGlvbkRlZmluaXRpb24ubWFwKChhbm5vdGF0aW9uUGF0aCwgYW5ub3RhdGlvbklkeCkgPT4ge1xuXHRcdFx0XHRjb25zdCBhbm5vdGF0aW9uVGFyZ2V0ID0gcmVzb2x2ZVRhcmdldChcblx0XHRcdFx0XHRvYmplY3RNYXAsXG5cdFx0XHRcdFx0Y3VycmVudFRhcmdldCxcblx0XHRcdFx0XHRhbm5vdGF0aW9uUGF0aC5Bbm5vdGF0aW9uUGF0aCxcblx0XHRcdFx0XHR0cnVlLFxuXHRcdFx0XHRcdGZhbHNlLFxuXHRcdFx0XHRcdGFubm90YXRpb25UeXBlLFxuXHRcdFx0XHRcdGFubm90YXRpb25zVGVybVxuXHRcdFx0XHQpO1xuXHRcdFx0XHRjb25zdCBhbm5vdGF0aW9uQ29sbGVjdGlvbkVsZW1lbnQgPSB7XG5cdFx0XHRcdFx0dHlwZTogXCJBbm5vdGF0aW9uUGF0aFwiLFxuXHRcdFx0XHRcdHZhbHVlOiBhbm5vdGF0aW9uUGF0aC5Bbm5vdGF0aW9uUGF0aCxcblx0XHRcdFx0XHRmdWxseVF1YWxpZmllZE5hbWU6IGAke3BhcmVudEZRTn0vJHthbm5vdGF0aW9uSWR4fWAsXG5cdFx0XHRcdFx0JHRhcmdldDogYW5ub3RhdGlvblRhcmdldCxcblx0XHRcdFx0XHRhbm5vdGF0aW9uVHlwZTogYW5ub3RhdGlvblR5cGUsXG5cdFx0XHRcdFx0YW5ub3RhdGlvbnNUZXJtOiBhbm5vdGF0aW9uc1Rlcm0sXG5cdFx0XHRcdFx0dGVybTogXCJcIixcblx0XHRcdFx0XHRwYXRoOiBcIlwiXG5cdFx0XHRcdH07XG5cdFx0XHRcdHRvUmVzb2x2ZS5wdXNoKHtcblx0XHRcdFx0XHRpbmxpbmU6IGZhbHNlLFxuXHRcdFx0XHRcdHRvUmVzb2x2ZTogYW5ub3RhdGlvbkNvbGxlY3Rpb25FbGVtZW50XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRyZXR1cm4gYW5ub3RhdGlvbkNvbGxlY3Rpb25FbGVtZW50O1xuXHRcdFx0fSk7XG5cdFx0Y2FzZSBcIk5hdmlnYXRpb25Qcm9wZXJ0eVBhdGhcIjpcblx0XHRcdHJldHVybiBjb2xsZWN0aW9uRGVmaW5pdGlvbi5tYXAoKG5hdlByb3BlcnR5UGF0aCwgbmF2UHJvcElkeCkgPT4ge1xuXHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdHR5cGU6IFwiTmF2aWdhdGlvblByb3BlcnR5UGF0aFwiLFxuXHRcdFx0XHRcdHZhbHVlOiBuYXZQcm9wZXJ0eVBhdGguTmF2aWdhdGlvblByb3BlcnR5UGF0aCxcblx0XHRcdFx0XHRmdWxseVF1YWxpZmllZE5hbWU6IGAke3BhcmVudEZRTn0vJHtuYXZQcm9wSWR4fWAsXG5cdFx0XHRcdFx0JHRhcmdldDogcmVzb2x2ZVRhcmdldChcblx0XHRcdFx0XHRcdG9iamVjdE1hcCxcblx0XHRcdFx0XHRcdGN1cnJlbnRUYXJnZXQsXG5cdFx0XHRcdFx0XHRuYXZQcm9wZXJ0eVBhdGguTmF2aWdhdGlvblByb3BlcnR5UGF0aCxcblx0XHRcdFx0XHRcdGZhbHNlLFxuXHRcdFx0XHRcdFx0ZmFsc2UsXG5cdFx0XHRcdFx0XHRhbm5vdGF0aW9uVHlwZSxcblx0XHRcdFx0XHRcdGFubm90YXRpb25zVGVybVxuXHRcdFx0XHRcdClcblx0XHRcdFx0fTtcblx0XHRcdH0pO1xuXHRcdGNhc2UgXCJSZWNvcmRcIjpcblx0XHRcdHJldHVybiBjb2xsZWN0aW9uRGVmaW5pdGlvbi5tYXAoKHJlY29yZERlZmluaXRpb24sIHJlY29yZElkeCkgPT4ge1xuXHRcdFx0XHRyZXR1cm4gcGFyc2VSZWNvcmQoXG5cdFx0XHRcdFx0cmVjb3JkRGVmaW5pdGlvbixcblx0XHRcdFx0XHRgJHtwYXJlbnRGUU59LyR7cmVjb3JkSWR4fWAsXG5cdFx0XHRcdFx0cGFyc2VyT3V0cHV0LFxuXHRcdFx0XHRcdGN1cnJlbnRUYXJnZXQsXG5cdFx0XHRcdFx0b2JqZWN0TWFwLFxuXHRcdFx0XHRcdHRvUmVzb2x2ZSxcblx0XHRcdFx0XHRhbm5vdGF0aW9uU291cmNlLFxuXHRcdFx0XHRcdHVucmVzb2x2ZWRBbm5vdGF0aW9ucyxcblx0XHRcdFx0XHRhbm5vdGF0aW9uVHlwZSxcblx0XHRcdFx0XHRhbm5vdGF0aW9uc1Rlcm1cblx0XHRcdFx0KTtcblx0XHRcdH0pO1xuXHRcdGNhc2UgXCJBcHBseVwiOlxuXHRcdGNhc2UgXCJJZlwiOlxuXHRcdGNhc2UgXCJFcVwiOlxuXHRcdGNhc2UgXCJOZVwiOlxuXHRcdGNhc2UgXCJMdFwiOlxuXHRcdGNhc2UgXCJHdFwiOlxuXHRcdGNhc2UgXCJMZVwiOlxuXHRcdGNhc2UgXCJHZVwiOlxuXHRcdGNhc2UgXCJOb3RcIjpcblx0XHRjYXNlIFwiQW5kXCI6XG5cdFx0Y2FzZSBcIk9yXCI6XG5cdFx0XHRyZXR1cm4gY29sbGVjdGlvbkRlZmluaXRpb24ubWFwKGlmVmFsdWUgPT4ge1xuXHRcdFx0XHRyZXR1cm4gaWZWYWx1ZTtcblx0XHRcdH0pO1xuXHRcdGNhc2UgXCJTdHJpbmdcIjpcblx0XHRcdHJldHVybiBjb2xsZWN0aW9uRGVmaW5pdGlvbi5tYXAoc3RyaW5nVmFsdWUgPT4ge1xuXHRcdFx0XHRpZiAodHlwZW9mIHN0cmluZ1ZhbHVlID09PSBcInN0cmluZ1wiKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHN0cmluZ1ZhbHVlO1xuXHRcdFx0XHR9IGVsc2UgaWYgKHN0cmluZ1ZhbHVlID09PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHRyZXR1cm4gc3RyaW5nVmFsdWU7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cmV0dXJuIHN0cmluZ1ZhbHVlLlN0cmluZztcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0ZGVmYXVsdDpcblx0XHRcdGlmIChjb2xsZWN0aW9uRGVmaW5pdGlvbi5sZW5ndGggPT09IDApIHtcblx0XHRcdFx0cmV0dXJuIFtdO1xuXHRcdFx0fVxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiVW5zdXBwb3J0ZWQgY2FzZVwiKTtcblx0fVxufVxuXG50eXBlIFJlc29sdmVhYmxlID0ge1xuXHRpbmxpbmU6IGJvb2xlYW47XG5cdHRvUmVzb2x2ZToge1xuXHRcdCR0YXJnZXQ6IHN0cmluZztcblx0XHR0YXJnZXRTdHJpbmc/OiBzdHJpbmc7XG5cdFx0YW5ub3RhdGlvbnNUZXJtOiBzdHJpbmc7XG5cdFx0YW5ub3RhdGlvblR5cGU6IHN0cmluZztcblx0XHR0ZXJtOiBzdHJpbmc7XG5cdFx0cGF0aDogc3RyaW5nO1xuXHR9O1xufTtcblxuZnVuY3Rpb24gY29udmVydEFubm90YXRpb24oXG5cdGFubm90YXRpb246IEFubm90YXRpb24sXG5cdHBhcnNlck91dHB1dDogUGFyc2VyT3V0cHV0LFxuXHRjdXJyZW50VGFyZ2V0OiBhbnksXG5cdG9iamVjdE1hcDogYW55LFxuXHR0b1Jlc29sdmU6IFJlc29sdmVhYmxlW10sXG5cdGFubm90YXRpb25Tb3VyY2U6IHN0cmluZyxcblx0dW5yZXNvbHZlZEFubm90YXRpb25zOiBBbm5vdGF0aW9uTGlzdFtdXG4pOiBhbnkge1xuXHRpZiAoYW5ub3RhdGlvbi5yZWNvcmQpIHtcblx0XHRjb25zdCBhbm5vdGF0aW9uVHlwZSA9IGFubm90YXRpb24ucmVjb3JkLnR5cGVcblx0XHRcdD8gdW5hbGlhcyhwYXJzZXJPdXRwdXQucmVmZXJlbmNlcywgYW5ub3RhdGlvbi5yZWNvcmQudHlwZSlcblx0XHRcdDogaW5mZXJUeXBlRnJvbVRlcm0oYW5ub3RhdGlvbi50ZXJtLCBwYXJzZXJPdXRwdXQsIGN1cnJlbnRUYXJnZXQuZnVsbHlRdWFsaWZpZWROYW1lKTtcblx0XHRjb25zdCBhbm5vdGF0aW9uVGVybTogYW55ID0ge1xuXHRcdFx0JFR5cGU6IGFubm90YXRpb25UeXBlLFxuXHRcdFx0ZnVsbHlRdWFsaWZpZWROYW1lOiBhbm5vdGF0aW9uLmZ1bGx5UXVhbGlmaWVkTmFtZSxcblx0XHRcdHF1YWxpZmllcjogYW5ub3RhdGlvbi5xdWFsaWZpZXJcblx0XHR9O1xuXHRcdGNvbnN0IGFubm90YXRpb25Db250ZW50OiBhbnkgPSB7fTtcblx0XHRhbm5vdGF0aW9uLnJlY29yZC5wcm9wZXJ0eVZhbHVlcy5mb3JFYWNoKChwcm9wZXJ0eVZhbHVlOiBQcm9wZXJ0eVZhbHVlKSA9PiB7XG5cdFx0XHRhbm5vdGF0aW9uQ29udGVudFtwcm9wZXJ0eVZhbHVlLm5hbWVdID0gcGFyc2VWYWx1ZShcblx0XHRcdFx0cHJvcGVydHlWYWx1ZS52YWx1ZSxcblx0XHRcdFx0YCR7YW5ub3RhdGlvbi5mdWxseVF1YWxpZmllZE5hbWV9LyR7cHJvcGVydHlWYWx1ZS5uYW1lfWAsXG5cdFx0XHRcdHBhcnNlck91dHB1dCxcblx0XHRcdFx0Y3VycmVudFRhcmdldCxcblx0XHRcdFx0b2JqZWN0TWFwLFxuXHRcdFx0XHR0b1Jlc29sdmUsXG5cdFx0XHRcdGFubm90YXRpb25Tb3VyY2UsXG5cdFx0XHRcdHVucmVzb2x2ZWRBbm5vdGF0aW9ucyxcblx0XHRcdFx0YW5ub3RhdGlvblR5cGUsXG5cdFx0XHRcdGFubm90YXRpb24udGVybVxuXHRcdFx0KTtcblx0XHRcdGlmIChcblx0XHRcdFx0YW5ub3RhdGlvbkNvbnRlbnQuaGFzT3duUHJvcGVydHkoXCJBY3Rpb25cIikgJiZcblx0XHRcdFx0KCFhbm5vdGF0aW9uLnJlY29yZCB8fFxuXHRcdFx0XHRcdGFubm90YXRpb25UZXJtLiRUeXBlID09PSBcImNvbS5zYXAudm9jYWJ1bGFyaWVzLlVJLnYxLkRhdGFGaWVsZEZvckFjdGlvblwiIHx8XG5cdFx0XHRcdFx0YW5ub3RhdGlvblRlcm0uJFR5cGUgPT09IFwiY29tLnNhcC52b2NhYnVsYXJpZXMuVUkudjEuRGF0YUZpZWxkV2l0aEFjdGlvblwiKVxuXHRcdFx0KSB7XG5cdFx0XHRcdGFubm90YXRpb25Db250ZW50LkFjdGlvblRhcmdldCA9XG5cdFx0XHRcdFx0KGN1cnJlbnRUYXJnZXQuYWN0aW9ucyAmJiBjdXJyZW50VGFyZ2V0LmFjdGlvbnNbYW5ub3RhdGlvbkNvbnRlbnQuQWN0aW9uXSkgfHxcblx0XHRcdFx0XHRvYmplY3RNYXBbYW5ub3RhdGlvbkNvbnRlbnQuQWN0aW9uXTtcblx0XHRcdFx0aWYgKCFhbm5vdGF0aW9uQ29udGVudC5BY3Rpb25UYXJnZXQpIHtcblx0XHRcdFx0XHRBTk5PVEFUSU9OX0VSUk9SUy5wdXNoKHtcblx0XHRcdFx0XHRcdG1lc3NhZ2U6XG5cdFx0XHRcdFx0XHRcdFwiVW5hYmxlIHRvIHJlc29sdmUgdGhlIGFjdGlvbiBcIiArXG5cdFx0XHRcdFx0XHRcdGFubm90YXRpb25Db250ZW50LkFjdGlvbiArXG5cdFx0XHRcdFx0XHRcdFwiIGRlZmluZWQgZm9yIFwiICtcblx0XHRcdFx0XHRcdFx0YW5ub3RhdGlvbi5mdWxseVF1YWxpZmllZE5hbWVcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHQvLyBBZGQgdG8gZGlhZ25vc3RpY3Ncblx0XHRcdFx0XHQvLyBkZWJ1Z2dlcjtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdHJldHVybiBPYmplY3QuYXNzaWduKGFubm90YXRpb25UZXJtLCBhbm5vdGF0aW9uQ29udGVudCk7XG5cdH0gZWxzZSBpZiAoYW5ub3RhdGlvbi5jb2xsZWN0aW9uID09PSB1bmRlZmluZWQpIHtcblx0XHRpZiAoYW5ub3RhdGlvbi52YWx1ZSkge1xuXHRcdFx0cmV0dXJuIHBhcnNlVmFsdWUoXG5cdFx0XHRcdGFubm90YXRpb24udmFsdWUsXG5cdFx0XHRcdGFubm90YXRpb24uZnVsbHlRdWFsaWZpZWROYW1lLFxuXHRcdFx0XHRwYXJzZXJPdXRwdXQsXG5cdFx0XHRcdGN1cnJlbnRUYXJnZXQsXG5cdFx0XHRcdG9iamVjdE1hcCxcblx0XHRcdFx0dG9SZXNvbHZlLFxuXHRcdFx0XHRhbm5vdGF0aW9uU291cmNlLFxuXHRcdFx0XHR1bnJlc29sdmVkQW5ub3RhdGlvbnMsXG5cdFx0XHRcdFwiXCIsXG5cdFx0XHRcdGFubm90YXRpb24udGVybVxuXHRcdFx0KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXHR9IGVsc2UgaWYgKGFubm90YXRpb24uY29sbGVjdGlvbikge1xuXHRcdGNvbnN0IGNvbGxlY3Rpb246IGFueSA9IHBhcnNlQ29sbGVjdGlvbihcblx0XHRcdGFubm90YXRpb24uY29sbGVjdGlvbixcblx0XHRcdGFubm90YXRpb24uZnVsbHlRdWFsaWZpZWROYW1lLFxuXHRcdFx0cGFyc2VyT3V0cHV0LFxuXHRcdFx0Y3VycmVudFRhcmdldCxcblx0XHRcdG9iamVjdE1hcCxcblx0XHRcdHRvUmVzb2x2ZSxcblx0XHRcdGFubm90YXRpb25Tb3VyY2UsXG5cdFx0XHR1bnJlc29sdmVkQW5ub3RhdGlvbnMsXG5cdFx0XHRcIlwiLFxuXHRcdFx0YW5ub3RhdGlvbi50ZXJtXG5cdFx0KTtcblx0XHRjb2xsZWN0aW9uLmZ1bGx5UXVhbGlmaWVkTmFtZSA9IGFubm90YXRpb24uZnVsbHlRdWFsaWZpZWROYW1lO1xuXHRcdHJldHVybiBjb2xsZWN0aW9uO1xuXHR9IGVsc2Uge1xuXHRcdHRocm93IG5ldyBFcnJvcihcIlVuc3VwcG9ydGVkIGNhc2VcIik7XG5cdH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlUmVzb2x2ZVBhdGhGbihlbnRpdHlUeXBlOiBFbnRpdHlUeXBlLCBvYmplY3RNYXA6IFJlY29yZDxzdHJpbmcsIGFueT4pIHtcblx0cmV0dXJuIGZ1bmN0aW9uKHJlbGF0aXZlUGF0aDogc3RyaW5nLCBpbmNsdWRlVmlzaXRlZE9iamVjdHM6IGJvb2xlYW4pOiBhbnkge1xuXHRcdGNvbnN0IGFubm90YXRpb25UZXJtOiBzdHJpbmcgPSBcIlwiO1xuXHRcdGNvbnN0IGFubm90YXRpb25UeXBlOiBzdHJpbmcgPSBcIlwiO1xuXHRcdHJldHVybiByZXNvbHZlVGFyZ2V0KFxuXHRcdFx0b2JqZWN0TWFwLFxuXHRcdFx0ZW50aXR5VHlwZSxcblx0XHRcdHJlbGF0aXZlUGF0aCxcblx0XHRcdGZhbHNlLFxuXHRcdFx0aW5jbHVkZVZpc2l0ZWRPYmplY3RzLFxuXHRcdFx0YW5ub3RhdGlvblR5cGUsXG5cdFx0XHRhbm5vdGF0aW9uVGVybVxuXHRcdCk7XG5cdH07XG59XG5cbmZ1bmN0aW9uIHJlc29sdmVOYXZpZ2F0aW9uUHJvcGVydGllcyhcblx0ZW50aXR5VHlwZXM6IFBhcnNlckVudGl0eVR5cGVbXSxcblx0YXNzb2NpYXRpb25zOiBBc3NvY2lhdGlvbltdLFxuXHRvYmplY3RNYXA6IFJlY29yZDxzdHJpbmcsIGFueT5cbik6IHZvaWQge1xuXHRlbnRpdHlUeXBlcy5mb3JFYWNoKGVudGl0eVR5cGUgPT4ge1xuXHRcdGVudGl0eVR5cGUubmF2aWdhdGlvblByb3BlcnRpZXMgPSBlbnRpdHlUeXBlLm5hdmlnYXRpb25Qcm9wZXJ0aWVzLm1hcChuYXZQcm9wID0+IHtcblx0XHRcdGNvbnN0IG91dE5hdlByb3A6IFBhcnRpYWw8TmF2aWdhdGlvblByb3BlcnR5PiA9IHtcblx0XHRcdFx0X3R5cGU6IFwiTmF2aWdhdGlvblByb3BlcnR5XCIsXG5cdFx0XHRcdG5hbWU6IG5hdlByb3AubmFtZSxcblx0XHRcdFx0ZnVsbHlRdWFsaWZpZWROYW1lOiBuYXZQcm9wLmZ1bGx5UXVhbGlmaWVkTmFtZSxcblx0XHRcdFx0cGFydG5lcjogKG5hdlByb3AgYXMgYW55KS5oYXNPd25Qcm9wZXJ0eShcInBhcnRuZXJcIikgPyAobmF2UHJvcCBhcyBhbnkpLnBhcnRuZXIgOiB1bmRlZmluZWQsXG5cdFx0XHRcdC8vIHRhcmdldFR5cGVOYW1lOiBGdWxseVF1YWxpZmllZE5hbWU7XG5cdFx0XHRcdC8vIHRhcmdldFR5cGU6IEVudGl0eVR5cGU7XG5cdFx0XHRcdGlzQ29sbGVjdGlvbjogKG5hdlByb3AgYXMgYW55KS5oYXNPd25Qcm9wZXJ0eShcImlzQ29sbGVjdGlvblwiKSA/IChuYXZQcm9wIGFzIGFueSkuaXNDb2xsZWN0aW9uIDogZmFsc2UsXG5cdFx0XHRcdGNvbnRhaW5zVGFyZ2V0OiAobmF2UHJvcCBhcyBhbnkpLmhhc093blByb3BlcnR5KFwiY29udGFpbnNUYXJnZXRcIilcblx0XHRcdFx0XHQ/IChuYXZQcm9wIGFzIGFueSkuY29udGFpbnNUYXJnZXRcblx0XHRcdFx0XHQ6IGZhbHNlLFxuXHRcdFx0XHRyZWZlcmVudGlhbENvbnN0cmFpbnQ6IChuYXZQcm9wIGFzIGFueSkucmVmZXJlbnRpYWxDb25zdHJhaW50XG5cdFx0XHRcdFx0PyAobmF2UHJvcCBhcyBhbnkpLnJlZmVyZW50aWFsQ29uc3RyYWludFxuXHRcdFx0XHRcdDogW10sXG5cdFx0XHRcdGFubm90YXRpb25zOiB7fVxuXHRcdFx0fTtcblx0XHRcdGlmICgobmF2UHJvcCBhcyBHZW5lcmljTmF2aWdhdGlvblByb3BlcnR5KS50YXJnZXRUeXBlTmFtZSkge1xuXHRcdFx0XHRvdXROYXZQcm9wLnRhcmdldFR5cGUgPSBvYmplY3RNYXBbKG5hdlByb3AgYXMgVjROYXZpZ2F0aW9uUHJvcGVydHkpLnRhcmdldFR5cGVOYW1lXTtcblx0XHRcdH0gZWxzZSBpZiAoKG5hdlByb3AgYXMgVjJOYXZpZ2F0aW9uUHJvcGVydHkpLnJlbGF0aW9uc2hpcCkge1xuXHRcdFx0XHRjb25zdCB0YXJnZXRBc3NvY2lhdGlvbiA9IGFzc29jaWF0aW9ucy5maW5kKFxuXHRcdFx0XHRcdGFzc29jaWF0aW9uID0+IGFzc29jaWF0aW9uLmZ1bGx5UXVhbGlmaWVkTmFtZSA9PT0gKG5hdlByb3AgYXMgVjJOYXZpZ2F0aW9uUHJvcGVydHkpLnJlbGF0aW9uc2hpcFxuXHRcdFx0XHQpO1xuXHRcdFx0XHRpZiAodGFyZ2V0QXNzb2NpYXRpb24pIHtcblx0XHRcdFx0XHRjb25zdCBhc3NvY2lhdGlvbkVuZCA9IHRhcmdldEFzc29jaWF0aW9uLmFzc29jaWF0aW9uRW5kLmZpbmQoXG5cdFx0XHRcdFx0XHRlbmQgPT4gZW5kLnJvbGUgPT09IChuYXZQcm9wIGFzIFYyTmF2aWdhdGlvblByb3BlcnR5KS50b1JvbGVcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdGlmIChhc3NvY2lhdGlvbkVuZCkge1xuXHRcdFx0XHRcdFx0b3V0TmF2UHJvcC50YXJnZXRUeXBlID0gb2JqZWN0TWFwW2Fzc29jaWF0aW9uRW5kLnR5cGVdO1xuXHRcdFx0XHRcdFx0b3V0TmF2UHJvcC5pc0NvbGxlY3Rpb24gPSBhc3NvY2lhdGlvbkVuZC5tdWx0aXBsaWNpdHkgPT09IFwiKlwiO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0aWYgKG91dE5hdlByb3AudGFyZ2V0VHlwZSkge1xuXHRcdFx0XHRvdXROYXZQcm9wLnRhcmdldFR5cGVOYW1lID0gb3V0TmF2UHJvcC50YXJnZXRUeXBlLmZ1bGx5UXVhbGlmaWVkTmFtZTtcblx0XHRcdH1cblx0XHRcdGNvbnN0IG91dE5hdlByb3BSZXEgPSBvdXROYXZQcm9wIGFzIE5hdmlnYXRpb25Qcm9wZXJ0eTtcblx0XHRcdG9iamVjdE1hcFtvdXROYXZQcm9wUmVxLmZ1bGx5UXVhbGlmaWVkTmFtZV0gPSBvdXROYXZQcm9wUmVxO1xuXHRcdFx0cmV0dXJuIG91dE5hdlByb3BSZXE7XG5cdFx0fSk7XG5cdFx0KGVudGl0eVR5cGUgYXMgRW50aXR5VHlwZSkucmVzb2x2ZVBhdGggPSBjcmVhdGVSZXNvbHZlUGF0aEZuKGVudGl0eVR5cGUgYXMgRW50aXR5VHlwZSwgb2JqZWN0TWFwKTtcblx0fSk7XG59XG5cbmZ1bmN0aW9uIGxpbmtBY3Rpb25zVG9FbnRpdHlUeXBlKG5hbWVzcGFjZTogc3RyaW5nLCBhY3Rpb25zOiBBY3Rpb25bXSwgb2JqZWN0TWFwOiBSZWNvcmQ8c3RyaW5nLCBhbnk+KTogdm9pZCB7XG5cdGFjdGlvbnMuZm9yRWFjaChhY3Rpb24gPT4ge1xuXHRcdGlmICghYWN0aW9uLmFubm90YXRpb25zKSB7XG5cdFx0XHRhY3Rpb24uYW5ub3RhdGlvbnMgPSB7fTtcblx0XHR9XG5cdFx0aWYgKGFjdGlvbi5pc0JvdW5kKSB7XG5cdFx0XHRjb25zdCBzb3VyY2VFbnRpdHlUeXBlID0gb2JqZWN0TWFwW2FjdGlvbi5zb3VyY2VUeXBlXTtcblx0XHRcdGFjdGlvbi5zb3VyY2VFbnRpdHlUeXBlID0gc291cmNlRW50aXR5VHlwZTtcblx0XHRcdGlmIChzb3VyY2VFbnRpdHlUeXBlKSB7XG5cdFx0XHRcdGlmICghc291cmNlRW50aXR5VHlwZS5hY3Rpb25zKSB7XG5cdFx0XHRcdFx0c291cmNlRW50aXR5VHlwZS5hY3Rpb25zID0ge307XG5cdFx0XHRcdH1cblx0XHRcdFx0c291cmNlRW50aXR5VHlwZS5hY3Rpb25zW2FjdGlvbi5uYW1lXSA9IGFjdGlvbjtcblx0XHRcdFx0c291cmNlRW50aXR5VHlwZS5hY3Rpb25zW2Ake25hbWVzcGFjZX0uJHthY3Rpb24ubmFtZX1gXSA9IGFjdGlvbjtcblx0XHRcdH1cblx0XHRcdGFjdGlvbi5yZXR1cm5FbnRpdHlUeXBlID0gb2JqZWN0TWFwW2FjdGlvbi5yZXR1cm5UeXBlXTtcblx0XHR9XG5cdH0pO1xufVxuXG5mdW5jdGlvbiBsaW5rRW50aXR5VHlwZVRvRW50aXR5U2V0KFxuXHRlbnRpdHlTZXRzOiBFbnRpdHlTZXRbXSxcblx0b2JqZWN0TWFwOiBSZWNvcmQ8c3RyaW5nLCBhbnk+LFxuXHRyZWZlcmVuY2VzOiBSZWZlcmVuY2VzV2l0aE1hcFxuKTogdm9pZCB7XG5cdGVudGl0eVNldHMuZm9yRWFjaChlbnRpdHlTZXQgPT4ge1xuXHRcdGVudGl0eVNldC5lbnRpdHlUeXBlID0gb2JqZWN0TWFwW2VudGl0eVNldC5lbnRpdHlUeXBlTmFtZV07XG5cdFx0aWYgKCFlbnRpdHlTZXQuZW50aXR5VHlwZSkge1xuXHRcdFx0ZW50aXR5U2V0LmVudGl0eVR5cGUgPSBvYmplY3RNYXBbdW5hbGlhcyhyZWZlcmVuY2VzLCBlbnRpdHlTZXQuZW50aXR5VHlwZU5hbWUpIGFzIHN0cmluZ107XG5cdFx0fVxuXHRcdGlmICghZW50aXR5U2V0LmFubm90YXRpb25zKSB7XG5cdFx0XHRlbnRpdHlTZXQuYW5ub3RhdGlvbnMgPSB7fTtcblx0XHR9XG5cdFx0aWYgKCFlbnRpdHlTZXQuZW50aXR5VHlwZS5hbm5vdGF0aW9ucykge1xuXHRcdFx0ZW50aXR5U2V0LmVudGl0eVR5cGUuYW5ub3RhdGlvbnMgPSB7fTtcblx0XHR9XG5cdFx0ZW50aXR5U2V0LmVudGl0eVR5cGUua2V5cy5mb3JFYWNoKChrZXlQcm9wOiBQcm9wZXJ0eSkgPT4ge1xuXHRcdFx0a2V5UHJvcC5pc0tleSA9IHRydWU7XG5cdFx0fSk7XG5cdH0pO1xufVxuXG5mdW5jdGlvbiBsaW5rRW50aXR5VHlwZVRvU2luZ2xldG9uKFxuXHRzaW5nbGV0b25zOiBTaW5nbGV0b25bXSxcblx0b2JqZWN0TWFwOiBSZWNvcmQ8c3RyaW5nLCBhbnk+LFxuXHRyZWZlcmVuY2VzOiBSZWZlcmVuY2VzV2l0aE1hcFxuKTogdm9pZCB7XG5cdHNpbmdsZXRvbnMuZm9yRWFjaChzaW5nbGV0b24gPT4ge1xuXHRcdHNpbmdsZXRvbi50eXBlID0gb2JqZWN0TWFwW3NpbmdsZXRvbi50eXBlTmFtZV07XG5cdFx0aWYgKCFzaW5nbGV0b24udHlwZSkge1xuXHRcdFx0c2luZ2xldG9uLnR5cGUgPSBvYmplY3RNYXBbdW5hbGlhcyhyZWZlcmVuY2VzLCBzaW5nbGV0b24udHlwZU5hbWUpIGFzIHN0cmluZ107XG5cdFx0fVxuXHRcdGlmICghc2luZ2xldG9uLmFubm90YXRpb25zKSB7XG5cdFx0XHRzaW5nbGV0b24uYW5ub3RhdGlvbnMgPSB7fTtcblx0XHR9XG5cdFx0aWYgKCFzaW5nbGV0b24udHlwZS5hbm5vdGF0aW9ucykge1xuXHRcdFx0c2luZ2xldG9uLnR5cGUuYW5ub3RhdGlvbnMgPSB7fTtcblx0XHR9XG5cdFx0c2luZ2xldG9uLnR5cGUua2V5cy5mb3JFYWNoKChrZXlQcm9wOiBQcm9wZXJ0eSkgPT4ge1xuXHRcdFx0a2V5UHJvcC5pc0tleSA9IHRydWU7XG5cdFx0fSk7XG5cdH0pO1xufVxuXG5mdW5jdGlvbiBsaW5rUHJvcGVydGllc1RvQ29tcGxleFR5cGVzKGVudGl0eVR5cGVzOiBFbnRpdHlUeXBlW10sIG9iamVjdE1hcDogUmVjb3JkPHN0cmluZywgYW55Pikge1xuXHRlbnRpdHlUeXBlcy5mb3JFYWNoKGVudGl0eVR5cGUgPT4ge1xuXHRcdGVudGl0eVR5cGUuZW50aXR5UHJvcGVydGllcy5mb3JFYWNoKGVudGl0eVByb3BlcnR5ID0+IHtcblx0XHRcdGlmICghZW50aXR5UHJvcGVydHkuYW5ub3RhdGlvbnMpIHtcblx0XHRcdFx0ZW50aXR5UHJvcGVydHkuYW5ub3RhdGlvbnMgPSB7fTtcblx0XHRcdH1cblx0XHRcdGlmIChlbnRpdHlQcm9wZXJ0eS50eXBlLmluZGV4T2YoXCJFZG1cIikgPT09IC0xKSB7XG5cdFx0XHRcdGlmIChlbnRpdHlQcm9wZXJ0eS50eXBlLnN0YXJ0c1dpdGgoXCJDb2xsZWN0aW9uXCIpKSB7XG5cdFx0XHRcdFx0Y29uc3QgY29tcGxleFR5cGVOYW1lID0gZW50aXR5UHJvcGVydHkudHlwZS5zdWJzdHIoMTEsIGVudGl0eVByb3BlcnR5LnR5cGUubGVuZ3RoIC0gMTIpO1xuXHRcdFx0XHRcdGNvbnN0IGNvbXBsZXhUeXBlID0gb2JqZWN0TWFwW2NvbXBsZXhUeXBlTmFtZV0gYXMgQ29tcGxleFR5cGU7XG5cdFx0XHRcdFx0aWYgKGNvbXBsZXhUeXBlKSB7XG5cdFx0XHRcdFx0XHQoZW50aXR5UHJvcGVydHkgYXMgUHJvcGVydHkpLnRhcmdldFR5cGUgPSBjb21wbGV4VHlwZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Y29uc3QgY29tcGxleFR5cGUgPSBvYmplY3RNYXBbZW50aXR5UHJvcGVydHkudHlwZV0gYXMgQ29tcGxleFR5cGU7XG5cdFx0XHRcdFx0aWYgKGNvbXBsZXhUeXBlKSB7XG5cdFx0XHRcdFx0XHQoZW50aXR5UHJvcGVydHkgYXMgUHJvcGVydHkpLnRhcmdldFR5cGUgPSBjb21wbGV4VHlwZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KTtcblx0fSk7XG59XG5cbmZ1bmN0aW9uIHByZXBhcmVDb21wbGV4VHlwZXMoXG5cdGNvbXBsZXhUeXBlczogUGFyc2VyQ29tcGxleFR5cGVbXSxcblx0YXNzb2NpYXRpb25zOiBBc3NvY2lhdGlvbltdLFxuXHRvYmplY3RNYXA6IFJlY29yZDxzdHJpbmcsIGFueT5cbikge1xuXHRjb21wbGV4VHlwZXMuZm9yRWFjaChjb21wbGV4VHlwZSA9PiB7XG5cdFx0KGNvbXBsZXhUeXBlIGFzIENvbXBsZXhUeXBlKS5hbm5vdGF0aW9ucyA9IHt9O1xuXHRcdGNvbXBsZXhUeXBlLnByb3BlcnRpZXMuZm9yRWFjaChwcm9wZXJ0eSA9PiB7XG5cdFx0XHRpZiAoIShwcm9wZXJ0eSBhcyBQcm9wZXJ0eSkuYW5ub3RhdGlvbnMpIHtcblx0XHRcdFx0KHByb3BlcnR5IGFzIFByb3BlcnR5KS5hbm5vdGF0aW9ucyA9IHt9O1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdGNvbXBsZXhUeXBlLm5hdmlnYXRpb25Qcm9wZXJ0aWVzID0gY29tcGxleFR5cGUubmF2aWdhdGlvblByb3BlcnRpZXMubWFwKG5hdlByb3AgPT4ge1xuXHRcdFx0aWYgKCEobmF2UHJvcCBhcyBOYXZpZ2F0aW9uUHJvcGVydHkpLmFubm90YXRpb25zKSB7XG5cdFx0XHRcdChuYXZQcm9wIGFzIE5hdmlnYXRpb25Qcm9wZXJ0eSkuYW5ub3RhdGlvbnMgPSB7fTtcblx0XHRcdH1cblx0XHRcdGNvbnN0IG91dE5hdlByb3A6IFBhcnRpYWw8TmF2aWdhdGlvblByb3BlcnR5PiA9IHtcblx0XHRcdFx0X3R5cGU6IFwiTmF2aWdhdGlvblByb3BlcnR5XCIsXG5cdFx0XHRcdG5hbWU6IG5hdlByb3AubmFtZSxcblx0XHRcdFx0ZnVsbHlRdWFsaWZpZWROYW1lOiBuYXZQcm9wLmZ1bGx5UXVhbGlmaWVkTmFtZSxcblx0XHRcdFx0cGFydG5lcjogKG5hdlByb3AgYXMgYW55KS5oYXNPd25Qcm9wZXJ0eShcInBhcnRuZXJcIikgPyAobmF2UHJvcCBhcyBhbnkpLnBhcnRuZXIgOiB1bmRlZmluZWQsXG5cdFx0XHRcdC8vIHRhcmdldFR5cGVOYW1lOiBGdWxseVF1YWxpZmllZE5hbWU7XG5cdFx0XHRcdC8vIHRhcmdldFR5cGU6IEVudGl0eVR5cGU7XG5cdFx0XHRcdGlzQ29sbGVjdGlvbjogKG5hdlByb3AgYXMgYW55KS5oYXNPd25Qcm9wZXJ0eShcImlzQ29sbGVjdGlvblwiKSA/IChuYXZQcm9wIGFzIGFueSkuaXNDb2xsZWN0aW9uIDogZmFsc2UsXG5cdFx0XHRcdGNvbnRhaW5zVGFyZ2V0OiAobmF2UHJvcCBhcyBhbnkpLmhhc093blByb3BlcnR5KFwiY29udGFpbnNUYXJnZXRcIilcblx0XHRcdFx0XHQ/IChuYXZQcm9wIGFzIGFueSkuY29udGFpbnNUYXJnZXRcblx0XHRcdFx0XHQ6IGZhbHNlLFxuXHRcdFx0XHRyZWZlcmVudGlhbENvbnN0cmFpbnQ6IChuYXZQcm9wIGFzIGFueSkucmVmZXJlbnRpYWxDb25zdHJhaW50XG5cdFx0XHRcdFx0PyAobmF2UHJvcCBhcyBhbnkpLnJlZmVyZW50aWFsQ29uc3RyYWludFxuXHRcdFx0XHRcdDogW11cblx0XHRcdH07XG5cdFx0XHRpZiAoKG5hdlByb3AgYXMgR2VuZXJpY05hdmlnYXRpb25Qcm9wZXJ0eSkudGFyZ2V0VHlwZU5hbWUpIHtcblx0XHRcdFx0b3V0TmF2UHJvcC50YXJnZXRUeXBlID0gb2JqZWN0TWFwWyhuYXZQcm9wIGFzIFY0TmF2aWdhdGlvblByb3BlcnR5KS50YXJnZXRUeXBlTmFtZV07XG5cdFx0XHR9IGVsc2UgaWYgKChuYXZQcm9wIGFzIFYyTmF2aWdhdGlvblByb3BlcnR5KS5yZWxhdGlvbnNoaXApIHtcblx0XHRcdFx0Y29uc3QgdGFyZ2V0QXNzb2NpYXRpb24gPSBhc3NvY2lhdGlvbnMuZmluZChcblx0XHRcdFx0XHRhc3NvY2lhdGlvbiA9PiBhc3NvY2lhdGlvbi5mdWxseVF1YWxpZmllZE5hbWUgPT09IChuYXZQcm9wIGFzIFYyTmF2aWdhdGlvblByb3BlcnR5KS5yZWxhdGlvbnNoaXBcblx0XHRcdFx0KTtcblx0XHRcdFx0aWYgKHRhcmdldEFzc29jaWF0aW9uKSB7XG5cdFx0XHRcdFx0Y29uc3QgYXNzb2NpYXRpb25FbmQgPSB0YXJnZXRBc3NvY2lhdGlvbi5hc3NvY2lhdGlvbkVuZC5maW5kKFxuXHRcdFx0XHRcdFx0ZW5kID0+IGVuZC5yb2xlID09PSAobmF2UHJvcCBhcyBWMk5hdmlnYXRpb25Qcm9wZXJ0eSkudG9Sb2xlXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRpZiAoYXNzb2NpYXRpb25FbmQpIHtcblx0XHRcdFx0XHRcdG91dE5hdlByb3AudGFyZ2V0VHlwZSA9IG9iamVjdE1hcFthc3NvY2lhdGlvbkVuZC50eXBlXTtcblx0XHRcdFx0XHRcdG91dE5hdlByb3AuaXNDb2xsZWN0aW9uID0gYXNzb2NpYXRpb25FbmQubXVsdGlwbGljaXR5ID09PSBcIipcIjtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGlmIChvdXROYXZQcm9wLnRhcmdldFR5cGUpIHtcblx0XHRcdFx0b3V0TmF2UHJvcC50YXJnZXRUeXBlTmFtZSA9IG91dE5hdlByb3AudGFyZ2V0VHlwZS5mdWxseVF1YWxpZmllZE5hbWU7XG5cdFx0XHR9XG5cdFx0XHRjb25zdCBvdXROYXZQcm9wUmVxID0gb3V0TmF2UHJvcCBhcyBOYXZpZ2F0aW9uUHJvcGVydHk7XG5cdFx0XHRvYmplY3RNYXBbb3V0TmF2UHJvcFJlcS5mdWxseVF1YWxpZmllZE5hbWVdID0gb3V0TmF2UHJvcFJlcTtcblx0XHRcdHJldHVybiBvdXROYXZQcm9wUmVxO1xuXHRcdH0pO1xuXHR9KTtcbn1cblxuZnVuY3Rpb24gc3BsaXRUZXJtKHJlZmVyZW5jZXM6IFJlZmVyZW5jZXNXaXRoTWFwLCB0ZXJtVmFsdWU6IHN0cmluZykge1xuXHRjb25zdCBhbGlhc2VkVGVybSA9IGFsaWFzKHJlZmVyZW5jZXMsIHRlcm1WYWx1ZSk7XG5cdGNvbnN0IGxhc3REb3QgPSBhbGlhc2VkVGVybS5sYXN0SW5kZXhPZihcIi5cIik7XG5cdGxldCB0ZXJtQWxpYXMgPSBhbGlhc2VkVGVybS5zdWJzdHIoMCwgbGFzdERvdCk7XG5cdGxldCB0ZXJtID0gYWxpYXNlZFRlcm0uc3Vic3RyKGxhc3REb3QgKyAxKTtcblx0cmV0dXJuIFt0ZXJtQWxpYXMsIHRlcm1dO1xufVxuXG4vKipcbiAqIFJlc29sdmUgYSBzcGVjaWZpYyBwYXRoXG4gKiBAcGFyYW0gc1BhdGhcbiAqL1xuZnVuY3Rpb24gY3JlYXRlR2xvYmFsUmVzb2x2ZShjb252ZXJ0ZWRPdXRwdXQ6IENvbnZlcnRlck91dHB1dCwgb2JqZWN0TWFwOiBSZWNvcmQ8c3RyaW5nLCBhbnk+KSB7XG5cdHJldHVybiBmdW5jdGlvbiByZXNvbHZlUGF0aDxUIGV4dGVuZHMgU2VydmljZU9iamVjdEFuZEFubm90YXRpb24+KHNQYXRoOiBzdHJpbmcpOiBSZXNvbHV0aW9uVGFyZ2V0PFQ+IHtcblx0XHRjb25zdCBhUGF0aFNwbGl0ID0gc1BhdGguc3BsaXQoXCIvXCIpO1xuXHRcdGlmIChhUGF0aFNwbGl0LnNoaWZ0KCkgIT09IFwiXCIpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcihcIkNhbm5vdCBkZWFsIHdpdGggcmVsYXRpdmUgcGF0aFwiKTtcblx0XHR9XG5cdFx0Y29uc3QgZW50aXR5U2V0TmFtZSA9IGFQYXRoU3BsaXQuc2hpZnQoKTtcblx0XHRjb25zdCBlbnRpdHlTZXQgPSBjb252ZXJ0ZWRPdXRwdXQuZW50aXR5U2V0cy5maW5kKGV0ID0+IGV0Lm5hbWUgPT09IGVudGl0eVNldE5hbWUpO1xuXHRcdGlmICghZW50aXR5U2V0KSB7XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHR0YXJnZXQ6IGNvbnZlcnRlZE91dHB1dC5lbnRpdHlDb250YWluZXIsXG5cdFx0XHRcdG9iamVjdFBhdGg6IFtjb252ZXJ0ZWRPdXRwdXQuZW50aXR5Q29udGFpbmVyXVxuXHRcdFx0fSBhcyBSZXNvbHV0aW9uVGFyZ2V0PFQ+O1xuXHRcdH1cblx0XHRpZiAoYVBhdGhTcGxpdC5sZW5ndGggPT09IDApIHtcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdHRhcmdldDogZW50aXR5U2V0LFxuXHRcdFx0XHRvYmplY3RQYXRoOiBbY29udmVydGVkT3V0cHV0LmVudGl0eUNvbnRhaW5lciwgZW50aXR5U2V0XVxuXHRcdFx0fSBhcyBSZXNvbHV0aW9uVGFyZ2V0PFQ+O1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb25zdCB0YXJnZXRSZXNvbHV0aW9uOiBhbnkgPSByZXNvbHZlVGFyZ2V0KG9iamVjdE1hcCwgZW50aXR5U2V0LCBcIi9cIiArIGFQYXRoU3BsaXQuam9pbihcIi9cIiksIGZhbHNlLCB0cnVlKTtcblx0XHRcdGlmICh0YXJnZXRSZXNvbHV0aW9uLnRhcmdldCkge1xuXHRcdFx0XHR0YXJnZXRSZXNvbHV0aW9uLnZpc2l0ZWRPYmplY3RzLnB1c2godGFyZ2V0UmVzb2x1dGlvbi50YXJnZXQpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0dGFyZ2V0OiB0YXJnZXRSZXNvbHV0aW9uLnRhcmdldCxcblx0XHRcdFx0b2JqZWN0UGF0aDogdGFyZ2V0UmVzb2x1dGlvbi52aXNpdGVkT2JqZWN0c1xuXHRcdFx0fTtcblx0XHR9XG5cdH07XG59XG5cbmxldCBBTk5PVEFUSU9OX0VSUk9SUzogeyBtZXNzYWdlOiBzdHJpbmcgfVtdID0gW107XG5sZXQgQUxMX0FOTk9UQVRJT05fRVJST1JTOiBhbnkgPSB7fTtcblxuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnRUeXBlcyhwYXJzZXJPdXRwdXQ6IFBhcnNlck91dHB1dCk6IENvbnZlcnRlck91dHB1dCB7XG5cdEFOTk9UQVRJT05fRVJST1JTID0gW107XG5cdGNvbnN0IG9iamVjdE1hcCA9IGJ1aWxkT2JqZWN0TWFwKHBhcnNlck91dHB1dCk7XG5cdHJlc29sdmVOYXZpZ2F0aW9uUHJvcGVydGllcyhcblx0XHRwYXJzZXJPdXRwdXQuc2NoZW1hLmVudGl0eVR5cGVzIGFzIEVudGl0eVR5cGVbXSxcblx0XHRwYXJzZXJPdXRwdXQuc2NoZW1hLmFzc29jaWF0aW9ucyxcblx0XHRvYmplY3RNYXBcblx0KTtcblx0aWYgKCEocGFyc2VyT3V0cHV0LnNjaGVtYS5lbnRpdHlDb250YWluZXIgYXMgRW50aXR5Q29udGFpbmVyKS5hbm5vdGF0aW9ucykge1xuXHRcdChwYXJzZXJPdXRwdXQuc2NoZW1hLmVudGl0eUNvbnRhaW5lciBhcyBFbnRpdHlDb250YWluZXIpLmFubm90YXRpb25zID0ge307XG5cdH1cblx0bGlua0FjdGlvbnNUb0VudGl0eVR5cGUocGFyc2VyT3V0cHV0LnNjaGVtYS5uYW1lc3BhY2UsIHBhcnNlck91dHB1dC5zY2hlbWEuYWN0aW9ucyBhcyBBY3Rpb25bXSwgb2JqZWN0TWFwKTtcblx0bGlua0VudGl0eVR5cGVUb0VudGl0eVNldChwYXJzZXJPdXRwdXQuc2NoZW1hLmVudGl0eVNldHMgYXMgRW50aXR5U2V0W10sIG9iamVjdE1hcCwgcGFyc2VyT3V0cHV0LnJlZmVyZW5jZXMpO1xuXHRsaW5rRW50aXR5VHlwZVRvU2luZ2xldG9uKHBhcnNlck91dHB1dC5zY2hlbWEuc2luZ2xldG9ucyBhcyBTaW5nbGV0b25bXSwgb2JqZWN0TWFwLCBwYXJzZXJPdXRwdXQucmVmZXJlbmNlcyk7XG5cdGxpbmtQcm9wZXJ0aWVzVG9Db21wbGV4VHlwZXMocGFyc2VyT3V0cHV0LnNjaGVtYS5lbnRpdHlUeXBlcyBhcyBFbnRpdHlUeXBlW10sIG9iamVjdE1hcCk7XG5cdHByZXBhcmVDb21wbGV4VHlwZXMocGFyc2VyT3V0cHV0LnNjaGVtYS5jb21wbGV4VHlwZXMgYXMgQ29tcGxleFR5cGVbXSwgcGFyc2VyT3V0cHV0LnNjaGVtYS5hc3NvY2lhdGlvbnMsIG9iamVjdE1hcCk7XG5cdGNvbnN0IHRvUmVzb2x2ZTogUmVzb2x2ZWFibGVbXSA9IFtdO1xuXHRjb25zdCB1bnJlc29sdmVkQW5ub3RhdGlvbnM6IEFubm90YXRpb25MaXN0W10gPSBbXTtcblxuXHRPYmplY3Qua2V5cyhwYXJzZXJPdXRwdXQuc2NoZW1hLmFubm90YXRpb25zKS5mb3JFYWNoKGFubm90YXRpb25Tb3VyY2UgPT4ge1xuXHRcdHBhcnNlck91dHB1dC5zY2hlbWEuYW5ub3RhdGlvbnNbYW5ub3RhdGlvblNvdXJjZV0uZm9yRWFjaChhbm5vdGF0aW9uTGlzdCA9PiB7XG5cdFx0XHRjb25zdCBjdXJyZW50VGFyZ2V0TmFtZSA9IHVuYWxpYXMocGFyc2VyT3V0cHV0LnJlZmVyZW5jZXMsIGFubm90YXRpb25MaXN0LnRhcmdldCkgYXMgc3RyaW5nO1xuXHRcdFx0Y29uc3QgY3VycmVudFRhcmdldCA9IG9iamVjdE1hcFtjdXJyZW50VGFyZ2V0TmFtZV07XG5cdFx0XHRpZiAoIWN1cnJlbnRUYXJnZXQpIHtcblx0XHRcdFx0aWYgKGN1cnJlbnRUYXJnZXROYW1lICYmIGN1cnJlbnRUYXJnZXROYW1lLmluZGV4T2YoXCJAXCIpICE9PSAtMSkge1xuXHRcdFx0XHRcdChhbm5vdGF0aW9uTGlzdCBhcyBhbnkpLl9fc291cmNlID0gYW5ub3RhdGlvblNvdXJjZTtcblx0XHRcdFx0XHR1bnJlc29sdmVkQW5ub3RhdGlvbnMucHVzaChhbm5vdGF0aW9uTGlzdCk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSBpZiAodHlwZW9mIGN1cnJlbnRUYXJnZXQgPT09IFwib2JqZWN0XCIpIHtcblx0XHRcdFx0aWYgKCFjdXJyZW50VGFyZ2V0LmFubm90YXRpb25zKSB7XG5cdFx0XHRcdFx0Y3VycmVudFRhcmdldC5hbm5vdGF0aW9ucyA9IHt9O1xuXHRcdFx0XHR9XG5cdFx0XHRcdGFubm90YXRpb25MaXN0LmFubm90YXRpb25zLmZvckVhY2goYW5ub3RhdGlvbiA9PiB7XG5cdFx0XHRcdFx0Y29uc3QgW3ZvY0FsaWFzLCB2b2NUZXJtXSA9IHNwbGl0VGVybShkZWZhdWx0UmVmZXJlbmNlcywgYW5ub3RhdGlvbi50ZXJtKTtcblx0XHRcdFx0XHRpZiAoIWN1cnJlbnRUYXJnZXQuYW5ub3RhdGlvbnNbdm9jQWxpYXNdKSB7XG5cdFx0XHRcdFx0XHRjdXJyZW50VGFyZ2V0LmFubm90YXRpb25zW3ZvY0FsaWFzXSA9IHt9O1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAoIWN1cnJlbnRUYXJnZXQuYW5ub3RhdGlvbnMuX2Fubm90YXRpb25zKSB7XG5cdFx0XHRcdFx0XHRjdXJyZW50VGFyZ2V0LmFubm90YXRpb25zLl9hbm5vdGF0aW9ucyA9IHt9O1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGNvbnN0IHZvY1Rlcm1XaXRoUXVhbGlmaWVyID0gYCR7dm9jVGVybX0ke2Fubm90YXRpb24ucXVhbGlmaWVyID8gYCMke2Fubm90YXRpb24ucXVhbGlmaWVyfWAgOiBcIlwifWA7XG5cdFx0XHRcdFx0Y3VycmVudFRhcmdldC5hbm5vdGF0aW9uc1t2b2NBbGlhc11bdm9jVGVybVdpdGhRdWFsaWZpZXJdID0gY29udmVydEFubm90YXRpb24oXG5cdFx0XHRcdFx0XHRhbm5vdGF0aW9uIGFzIEFubm90YXRpb24sXG5cdFx0XHRcdFx0XHRwYXJzZXJPdXRwdXQsXG5cdFx0XHRcdFx0XHRjdXJyZW50VGFyZ2V0LFxuXHRcdFx0XHRcdFx0b2JqZWN0TWFwLFxuXHRcdFx0XHRcdFx0dG9SZXNvbHZlLFxuXHRcdFx0XHRcdFx0YW5ub3RhdGlvblNvdXJjZSxcblx0XHRcdFx0XHRcdHVucmVzb2x2ZWRBbm5vdGF0aW9uc1xuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0c3dpdGNoICh0eXBlb2YgY3VycmVudFRhcmdldC5hbm5vdGF0aW9uc1t2b2NBbGlhc11bdm9jVGVybVdpdGhRdWFsaWZpZXJdKSB7XG5cdFx0XHRcdFx0XHRjYXNlIFwic3RyaW5nXCI6XG5cdFx0XHRcdFx0XHRcdGN1cnJlbnRUYXJnZXQuYW5ub3RhdGlvbnNbdm9jQWxpYXNdW3ZvY1Rlcm1XaXRoUXVhbGlmaWVyXSA9IG5ldyBTdHJpbmcoXG5cdFx0XHRcdFx0XHRcdFx0Y3VycmVudFRhcmdldC5hbm5vdGF0aW9uc1t2b2NBbGlhc11bdm9jVGVybVdpdGhRdWFsaWZpZXJdXG5cdFx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0Y2FzZSBcImJvb2xlYW5cIjpcblx0XHRcdFx0XHRcdFx0Y3VycmVudFRhcmdldC5hbm5vdGF0aW9uc1t2b2NBbGlhc11bdm9jVGVybVdpdGhRdWFsaWZpZXJdID0gbmV3IEJvb2xlYW4oXG5cdFx0XHRcdFx0XHRcdFx0Y3VycmVudFRhcmdldC5hbm5vdGF0aW9uc1t2b2NBbGlhc11bdm9jVGVybVdpdGhRdWFsaWZpZXJdXG5cdFx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0XHRjdXJyZW50VGFyZ2V0LmFubm90YXRpb25zW3ZvY0FsaWFzXVt2b2NUZXJtV2l0aFF1YWxpZmllcl0gIT09IG51bGwgJiZcblx0XHRcdFx0XHRcdHR5cGVvZiBjdXJyZW50VGFyZ2V0LmFubm90YXRpb25zW3ZvY0FsaWFzXVt2b2NUZXJtV2l0aFF1YWxpZmllcl0gPT09IFwib2JqZWN0XCJcblx0XHRcdFx0XHQpIHtcblx0XHRcdFx0XHRcdGN1cnJlbnRUYXJnZXQuYW5ub3RhdGlvbnNbdm9jQWxpYXNdW3ZvY1Rlcm1XaXRoUXVhbGlmaWVyXS50ZXJtID0gdW5hbGlhcyhcblx0XHRcdFx0XHRcdFx0ZGVmYXVsdFJlZmVyZW5jZXMsXG5cdFx0XHRcdFx0XHRcdGAke3ZvY0FsaWFzfS4ke3ZvY1Rlcm19YFxuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdGN1cnJlbnRUYXJnZXQuYW5ub3RhdGlvbnNbdm9jQWxpYXNdW3ZvY1Rlcm1XaXRoUXVhbGlmaWVyXS5xdWFsaWZpZXIgPSBhbm5vdGF0aW9uLnF1YWxpZmllcjtcblx0XHRcdFx0XHRcdGN1cnJlbnRUYXJnZXQuYW5ub3RhdGlvbnNbdm9jQWxpYXNdW3ZvY1Rlcm1XaXRoUXVhbGlmaWVyXS5fX3NvdXJjZSA9IGFubm90YXRpb25Tb3VyY2U7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGNvbnN0IGFubm90YXRpb25UYXJnZXQgPSBgJHtjdXJyZW50VGFyZ2V0TmFtZX1AJHt1bmFsaWFzKFxuXHRcdFx0XHRcdFx0ZGVmYXVsdFJlZmVyZW5jZXMsXG5cdFx0XHRcdFx0XHR2b2NBbGlhcyArIFwiLlwiICsgdm9jVGVybVdpdGhRdWFsaWZpZXJcblx0XHRcdFx0XHQpfWA7XG5cdFx0XHRcdFx0aWYgKGFubm90YXRpb24uYW5ub3RhdGlvbnMgJiYgQXJyYXkuaXNBcnJheShhbm5vdGF0aW9uLmFubm90YXRpb25zKSkge1xuXHRcdFx0XHRcdFx0Y29uc3Qgc3ViQW5ub3RhdGlvbkxpc3QgPSB7XG5cdFx0XHRcdFx0XHRcdHRhcmdldDogYW5ub3RhdGlvblRhcmdldCxcblx0XHRcdFx0XHRcdFx0YW5ub3RhdGlvbnM6IGFubm90YXRpb24uYW5ub3RhdGlvbnMsXG5cdFx0XHRcdFx0XHRcdF9fc291cmNlOiBhbm5vdGF0aW9uU291cmNlXG5cdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdFx0dW5yZXNvbHZlZEFubm90YXRpb25zLnB1c2goc3ViQW5ub3RhdGlvbkxpc3QpO1xuXHRcdFx0XHRcdH0gZWxzZSBpZiAoXG5cdFx0XHRcdFx0XHRhbm5vdGF0aW9uLmFubm90YXRpb25zICYmXG5cdFx0XHRcdFx0XHQhY3VycmVudFRhcmdldC5hbm5vdGF0aW9uc1t2b2NBbGlhc11bdm9jVGVybVdpdGhRdWFsaWZpZXJdLmFubm90YXRpb25zXG5cdFx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0XHRjdXJyZW50VGFyZ2V0LmFubm90YXRpb25zW3ZvY0FsaWFzXVt2b2NUZXJtV2l0aFF1YWxpZmllcl0uYW5ub3RhdGlvbnMgPSBhbm5vdGF0aW9uLmFubm90YXRpb25zO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRjdXJyZW50VGFyZ2V0LmFubm90YXRpb25zLl9hbm5vdGF0aW9uc1tgJHt2b2NBbGlhc30uJHt2b2NUZXJtV2l0aFF1YWxpZmllcn1gXSA9XG5cdFx0XHRcdFx0XHRjdXJyZW50VGFyZ2V0LmFubm90YXRpb25zW3ZvY0FsaWFzXVt2b2NUZXJtV2l0aFF1YWxpZmllcl07XG5cdFx0XHRcdFx0b2JqZWN0TWFwW2Fubm90YXRpb25UYXJnZXRdID0gY3VycmVudFRhcmdldC5hbm5vdGF0aW9uc1t2b2NBbGlhc11bdm9jVGVybVdpdGhRdWFsaWZpZXJdO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9KTtcblx0fSk7XG5cdGNvbnN0IGV4dHJhVW5yZXNvbHZlZEFubm90YXRpb25zOiBBbm5vdGF0aW9uTGlzdFtdID0gW107XG5cdHVucmVzb2x2ZWRBbm5vdGF0aW9ucy5mb3JFYWNoKGFubm90YXRpb25MaXN0ID0+IHtcblx0XHRjb25zdCBjdXJyZW50VGFyZ2V0TmFtZSA9IHVuYWxpYXMocGFyc2VyT3V0cHV0LnJlZmVyZW5jZXMsIGFubm90YXRpb25MaXN0LnRhcmdldCkgYXMgc3RyaW5nO1xuXHRcdGxldCBbYmFzZU9iaiwgYW5ub3RhdGlvblBhcnRdID0gY3VycmVudFRhcmdldE5hbWUuc3BsaXQoXCJAXCIpO1xuXHRcdGNvbnN0IHRhcmdldFNwbGl0ID0gYW5ub3RhdGlvblBhcnQuc3BsaXQoXCIvXCIpO1xuXHRcdGJhc2VPYmogPSBiYXNlT2JqICsgXCJAXCIgKyB0YXJnZXRTcGxpdFswXTtcblx0XHRjb25zdCBjdXJyZW50VGFyZ2V0ID0gdGFyZ2V0U3BsaXQuc2xpY2UoMSkucmVkdWNlKChjdXJyZW50T2JqLCBwYXRoKSA9PiB7XG5cdFx0XHRpZiAoIWN1cnJlbnRPYmopIHtcblx0XHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gY3VycmVudE9ialtwYXRoXTtcblx0XHR9LCBvYmplY3RNYXBbYmFzZU9ial0pO1xuXHRcdGlmICghY3VycmVudFRhcmdldCkge1xuXHRcdFx0QU5OT1RBVElPTl9FUlJPUlMucHVzaCh7XG5cdFx0XHRcdG1lc3NhZ2U6IFwiVGhlIGZvbGxvd2luZyBhbm5vdGF0aW9uIHRhcmdldCB3YXMgbm90IGZvdW5kIG9uIHRoZSBzZXJ2aWNlIFwiICsgY3VycmVudFRhcmdldE5hbWVcblx0XHRcdH0pO1xuXHRcdFx0Ly8gY29uc29sZS5sb2coXCJNaXNzaW5nIHRhcmdldCBhZ2FpbiBcIiArIGN1cnJlbnRUYXJnZXROYW1lKTtcblx0XHR9IGVsc2UgaWYgKHR5cGVvZiBjdXJyZW50VGFyZ2V0ID09PSBcIm9iamVjdFwiKSB7XG5cdFx0XHRpZiAoIWN1cnJlbnRUYXJnZXQuYW5ub3RhdGlvbnMpIHtcblx0XHRcdFx0Y3VycmVudFRhcmdldC5hbm5vdGF0aW9ucyA9IHt9O1xuXHRcdFx0fVxuXHRcdFx0YW5ub3RhdGlvbkxpc3QuYW5ub3RhdGlvbnMuZm9yRWFjaChhbm5vdGF0aW9uID0+IHtcblx0XHRcdFx0Y29uc3QgW3ZvY0FsaWFzLCB2b2NUZXJtXSA9IHNwbGl0VGVybShkZWZhdWx0UmVmZXJlbmNlcywgYW5ub3RhdGlvbi50ZXJtKTtcblx0XHRcdFx0aWYgKCFjdXJyZW50VGFyZ2V0LmFubm90YXRpb25zW3ZvY0FsaWFzXSkge1xuXHRcdFx0XHRcdGN1cnJlbnRUYXJnZXQuYW5ub3RhdGlvbnNbdm9jQWxpYXNdID0ge307XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKCFjdXJyZW50VGFyZ2V0LmFubm90YXRpb25zLl9hbm5vdGF0aW9ucykge1xuXHRcdFx0XHRcdGN1cnJlbnRUYXJnZXQuYW5ub3RhdGlvbnMuX2Fubm90YXRpb25zID0ge307XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRjb25zdCB2b2NUZXJtV2l0aFF1YWxpZmllciA9IGAke3ZvY1Rlcm19JHthbm5vdGF0aW9uLnF1YWxpZmllciA/IGAjJHthbm5vdGF0aW9uLnF1YWxpZmllcn1gIDogXCJcIn1gO1xuXHRcdFx0XHRjdXJyZW50VGFyZ2V0LmFubm90YXRpb25zW3ZvY0FsaWFzXVt2b2NUZXJtV2l0aFF1YWxpZmllcl0gPSBjb252ZXJ0QW5ub3RhdGlvbihcblx0XHRcdFx0XHRhbm5vdGF0aW9uIGFzIEFubm90YXRpb24sXG5cdFx0XHRcdFx0cGFyc2VyT3V0cHV0LFxuXHRcdFx0XHRcdGN1cnJlbnRUYXJnZXQsXG5cdFx0XHRcdFx0b2JqZWN0TWFwLFxuXHRcdFx0XHRcdHRvUmVzb2x2ZSxcblx0XHRcdFx0XHQoYW5ub3RhdGlvbkxpc3QgYXMgYW55KS5fX3NvdXJjZSxcblx0XHRcdFx0XHRleHRyYVVucmVzb2x2ZWRBbm5vdGF0aW9uc1xuXHRcdFx0XHQpO1xuXHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0Y3VycmVudFRhcmdldC5hbm5vdGF0aW9uc1t2b2NBbGlhc11bdm9jVGVybVdpdGhRdWFsaWZpZXJdICE9PSBudWxsICYmXG5cdFx0XHRcdFx0dHlwZW9mIGN1cnJlbnRUYXJnZXQuYW5ub3RhdGlvbnNbdm9jQWxpYXNdW3ZvY1Rlcm1XaXRoUXVhbGlmaWVyXSA9PT0gXCJvYmplY3RcIlxuXHRcdFx0XHQpIHtcblx0XHRcdFx0XHRjdXJyZW50VGFyZ2V0LmFubm90YXRpb25zW3ZvY0FsaWFzXVt2b2NUZXJtV2l0aFF1YWxpZmllcl0udGVybSA9IHVuYWxpYXMoXG5cdFx0XHRcdFx0XHRkZWZhdWx0UmVmZXJlbmNlcyxcblx0XHRcdFx0XHRcdGAke3ZvY0FsaWFzfS4ke3ZvY1Rlcm19YFxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0Y3VycmVudFRhcmdldC5hbm5vdGF0aW9uc1t2b2NBbGlhc11bdm9jVGVybVdpdGhRdWFsaWZpZXJdLnF1YWxpZmllciA9IGFubm90YXRpb24ucXVhbGlmaWVyO1xuXHRcdFx0XHRcdGN1cnJlbnRUYXJnZXQuYW5ub3RhdGlvbnNbdm9jQWxpYXNdW1xuXHRcdFx0XHRcdFx0dm9jVGVybVdpdGhRdWFsaWZpZXJcblx0XHRcdFx0XHRdLl9fc291cmNlID0gKGFubm90YXRpb25MaXN0IGFzIGFueSkuX19zb3VyY2U7XG5cdFx0XHRcdH1cblx0XHRcdFx0Y3VycmVudFRhcmdldC5hbm5vdGF0aW9ucy5fYW5ub3RhdGlvbnNbYCR7dm9jQWxpYXN9LiR7dm9jVGVybVdpdGhRdWFsaWZpZXJ9YF0gPVxuXHRcdFx0XHRcdGN1cnJlbnRUYXJnZXQuYW5ub3RhdGlvbnNbdm9jQWxpYXNdW3ZvY1Rlcm1XaXRoUXVhbGlmaWVyXTtcblx0XHRcdFx0b2JqZWN0TWFwW2Ake2N1cnJlbnRUYXJnZXROYW1lfUAke3VuYWxpYXMoZGVmYXVsdFJlZmVyZW5jZXMsIHZvY0FsaWFzICsgXCIuXCIgKyB2b2NUZXJtV2l0aFF1YWxpZmllcil9YF0gPVxuXHRcdFx0XHRcdGN1cnJlbnRUYXJnZXQuYW5ub3RhdGlvbnNbdm9jQWxpYXNdW3ZvY1Rlcm1XaXRoUXVhbGlmaWVyXTtcblx0XHRcdH0pO1xuXHRcdH1cblx0fSk7XG5cdHRvUmVzb2x2ZS5mb3JFYWNoKHJlc29sdmVhYmxlID0+IHtcblx0XHRjb25zdCB0b1Jlc29sdmUgPSByZXNvbHZlYWJsZS50b1Jlc29sdmU7XG5cdFx0Y29uc3QgdGFyZ2V0U3RyID0gdG9SZXNvbHZlLiR0YXJnZXQ7XG5cdFx0Y29uc3QgcmVzb2x2ZWRUYXJnZXQgPSBvYmplY3RNYXBbdGFyZ2V0U3RyXTtcblx0XHRjb25zdCB7IGFubm90YXRpb25zVGVybSwgYW5ub3RhdGlvblR5cGUgfSA9IHRvUmVzb2x2ZTtcblx0XHRkZWxldGUgdG9SZXNvbHZlLmFubm90YXRpb25UeXBlO1xuXHRcdGRlbGV0ZSB0b1Jlc29sdmUuYW5ub3RhdGlvbnNUZXJtO1xuXG5cdFx0aWYgKHJlc29sdmVhYmxlLmlubGluZSAmJiAhKHJlc29sdmVkVGFyZ2V0IGluc3RhbmNlb2YgU3RyaW5nKSkge1xuXHRcdFx0Ly8gaW5saW5lIHRoZSByZXNvbHZlZCB0YXJnZXRcblx0XHRcdGxldCBrZXlzOiBrZXlvZiB0eXBlb2YgdG9SZXNvbHZlO1xuXHRcdFx0Zm9yIChrZXlzIGluIHRvUmVzb2x2ZSkgZGVsZXRlIHRvUmVzb2x2ZVtrZXlzXTtcblxuXHRcdFx0T2JqZWN0LmFzc2lnbih0b1Jlc29sdmUsIHJlc29sdmVkVGFyZ2V0KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly8gYXNzaWduIHRoZSByZXNvbHZlZCB0YXJnZXRcblx0XHRcdHRvUmVzb2x2ZS4kdGFyZ2V0ID0gcmVzb2x2ZWRUYXJnZXQ7XG5cdFx0fVxuXG5cdFx0aWYgKCFyZXNvbHZlZFRhcmdldCkge1xuXHRcdFx0dG9SZXNvbHZlLnRhcmdldFN0cmluZyA9IHRhcmdldFN0cjtcblx0XHRcdGlmIChhbm5vdGF0aW9uc1Rlcm0gJiYgYW5ub3RhdGlvblR5cGUpIHtcblx0XHRcdFx0Y29uc3Qgb0Vycm9yTXNnID0ge1xuXHRcdFx0XHRcdG1lc3NhZ2U6XG5cdFx0XHRcdFx0XHRcIlVuYWJsZSB0byByZXNvbHZlIHRoZSBwYXRoIGV4cHJlc3Npb246IFwiICtcblx0XHRcdFx0XHRcdHRhcmdldFN0ciArXG5cdFx0XHRcdFx0XHRcIlxcblwiICtcblx0XHRcdFx0XHRcdFwiXFxuXCIgK1xuXHRcdFx0XHRcdFx0XCJIaW50OiBDaGVjayBhbmQgY29ycmVjdCB0aGUgcGF0aCB2YWx1ZXMgdW5kZXIgdGhlIGZvbGxvd2luZyBzdHJ1Y3R1cmUgaW4gdGhlIG1ldGFkYXRhIChhbm5vdGF0aW9uLnhtbCBmaWxlIG9yIENEUyBhbm5vdGF0aW9ucyBmb3IgdGhlIGFwcGxpY2F0aW9uKTogXFxuXFxuXCIgK1xuXHRcdFx0XHRcdFx0XCI8QW5ub3RhdGlvbiBUZXJtID0gXCIgK1xuXHRcdFx0XHRcdFx0YW5ub3RhdGlvbnNUZXJtICtcblx0XHRcdFx0XHRcdFwiPlwiICtcblx0XHRcdFx0XHRcdFwiXFxuXCIgK1xuXHRcdFx0XHRcdFx0XCI8UmVjb3JkIFR5cGUgPSBcIiArXG5cdFx0XHRcdFx0XHRhbm5vdGF0aW9uVHlwZSArXG5cdFx0XHRcdFx0XHRcIj5cIiArXG5cdFx0XHRcdFx0XHRcIlxcblwiICtcblx0XHRcdFx0XHRcdFwiPEFubm90YXRpb25QYXRoID0gXCIgK1xuXHRcdFx0XHRcdFx0dGFyZ2V0U3RyICtcblx0XHRcdFx0XHRcdFwiPlwiXG5cdFx0XHRcdH07XG5cdFx0XHRcdGFkZEFubm90YXRpb25FcnJvck1lc3NhZ2UodGFyZ2V0U3RyLCBvRXJyb3JNc2cpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Y29uc3QgcHJvcGVydHkgPSB0b1Jlc29sdmUudGVybTtcblx0XHRcdFx0Y29uc3QgcGF0aCA9IHRvUmVzb2x2ZS5wYXRoO1xuXHRcdFx0XHRjb25zdCB0ZXJtSW5mbyA9IHRhcmdldFN0ciA/IHRhcmdldFN0ci5zcGxpdChcIi9cIilbMF0gOiB0YXJnZXRTdHI7XG5cdFx0XHRcdGNvbnN0IG9FcnJvck1zZyA9IHtcblx0XHRcdFx0XHRtZXNzYWdlOlxuXHRcdFx0XHRcdFx0XCJVbmFibGUgdG8gcmVzb2x2ZSB0aGUgcGF0aCBleHByZXNzaW9uOiBcIiArXG5cdFx0XHRcdFx0XHR0YXJnZXRTdHIgK1xuXHRcdFx0XHRcdFx0XCJcXG5cIiArXG5cdFx0XHRcdFx0XHRcIlxcblwiICtcblx0XHRcdFx0XHRcdFwiSGludDogQ2hlY2sgYW5kIGNvcnJlY3QgdGhlIHBhdGggdmFsdWVzIHVuZGVyIHRoZSBmb2xsb3dpbmcgc3RydWN0dXJlIGluIHRoZSBtZXRhZGF0YSAoYW5ub3RhdGlvbi54bWwgZmlsZSBvciBDRFMgYW5ub3RhdGlvbnMgZm9yIHRoZSBhcHBsaWNhdGlvbik6IFxcblxcblwiICtcblx0XHRcdFx0XHRcdFwiPEFubm90YXRpb24gVGVybSA9IFwiICtcblx0XHRcdFx0XHRcdHRlcm1JbmZvICtcblx0XHRcdFx0XHRcdFwiPlwiICtcblx0XHRcdFx0XHRcdFwiXFxuXCIgK1xuXHRcdFx0XHRcdFx0XCI8UHJvcGVydHlWYWx1ZSBQcm9wZXJ0eSA9IFwiICtcblx0XHRcdFx0XHRcdHByb3BlcnR5ICtcblx0XHRcdFx0XHRcdFwiICAgICAgICBQYXRoPSBcIiArXG5cdFx0XHRcdFx0XHRwYXRoICtcblx0XHRcdFx0XHRcdFwiPlwiXG5cdFx0XHRcdH07XG5cdFx0XHRcdGFkZEFubm90YXRpb25FcnJvck1lc3NhZ2UodGFyZ2V0U3RyLCBvRXJyb3JNc2cpO1xuXHRcdFx0fVxuXHRcdH1cblx0fSk7XG5cdGZvciAodmFyIHByb3BlcnR5IGluIEFMTF9BTk5PVEFUSU9OX0VSUk9SUykge1xuXHRcdEFOTk9UQVRJT05fRVJST1JTLnB1c2goQUxMX0FOTk9UQVRJT05fRVJST1JTW3Byb3BlcnR5XVswXSk7XG5cdH1cblx0KHBhcnNlck91dHB1dCBhcyBhbnkpLmVudGl0eVNldHMgPSBwYXJzZXJPdXRwdXQuc2NoZW1hLmVudGl0eVNldHM7XG5cblx0Y29uc3QgY29udmVydGVkT3V0cHV0OiBQYXJ0aWFsPENvbnZlcnRlck91dHB1dD4gPSB7XG5cdFx0dmVyc2lvbjogcGFyc2VyT3V0cHV0LnZlcnNpb24sXG5cdFx0YW5ub3RhdGlvbnM6IHBhcnNlck91dHB1dC5zY2hlbWEuYW5ub3RhdGlvbnMsXG5cdFx0bmFtZXNwYWNlOiBwYXJzZXJPdXRwdXQuc2NoZW1hLm5hbWVzcGFjZSxcblx0XHRlbnRpdHlDb250YWluZXI6IHBhcnNlck91dHB1dC5zY2hlbWEuZW50aXR5Q29udGFpbmVyIGFzIEVudGl0eUNvbnRhaW5lcixcblx0XHRhY3Rpb25zOiBwYXJzZXJPdXRwdXQuc2NoZW1hLmFjdGlvbnMgYXMgQWN0aW9uW10sXG5cdFx0ZW50aXR5U2V0czogcGFyc2VyT3V0cHV0LnNjaGVtYS5lbnRpdHlTZXRzIGFzIEVudGl0eVNldFtdLFxuXHRcdHNpbmdsZXRvbnM6IHBhcnNlck91dHB1dC5zY2hlbWEuc2luZ2xldG9ucyBhcyBTaW5nbGV0b25bXSxcblx0XHRlbnRpdHlUeXBlczogcGFyc2VyT3V0cHV0LnNjaGVtYS5lbnRpdHlUeXBlcyBhcyBFbnRpdHlUeXBlW10sXG5cdFx0Y29tcGxleFR5cGVzOiBwYXJzZXJPdXRwdXQuc2NoZW1hLmNvbXBsZXhUeXBlcyBhcyBDb21wbGV4VHlwZVtdLFxuXHRcdHJlZmVyZW5jZXM6IGRlZmF1bHRSZWZlcmVuY2VzLFxuXHRcdGRpYWdub3N0aWNzOiBBTk5PVEFUSU9OX0VSUk9SUy5jb25jYXQoKVxuXHR9O1xuXHRjb252ZXJ0ZWRPdXRwdXQucmVzb2x2ZVBhdGggPSBjcmVhdGVHbG9iYWxSZXNvbHZlKGNvbnZlcnRlZE91dHB1dCBhcyBDb252ZXJ0ZXJPdXRwdXQsIG9iamVjdE1hcCk7XG5cdHJldHVybiBjb252ZXJ0ZWRPdXRwdXQgYXMgQ29udmVydGVyT3V0cHV0O1xufVxuXG5mdW5jdGlvbiByZXZlcnRWYWx1ZVRvR2VuZXJpY1R5cGUocmVmZXJlbmNlczogUmVmZXJlbmNlW10sIHZhbHVlOiBhbnkpOiBFeHByZXNzaW9uIHwgdW5kZWZpbmVkIHtcblx0bGV0IHJlc3VsdDogRXhwcmVzc2lvbiB8IHVuZGVmaW5lZDtcblx0aWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIikge1xuXHRcdGNvbnN0IHZhbHVlTWF0Y2hlcyA9IHZhbHVlLm1hdGNoKC8oXFx3KylcXC5cXHcrXFwvLiovKTtcblx0XHRpZiAodmFsdWVNYXRjaGVzICYmIHJlZmVyZW5jZXMuZmluZChyZWYgPT4gcmVmLmFsaWFzID09PSB2YWx1ZU1hdGNoZXNbMV0pKSB7XG5cdFx0XHRyZXN1bHQgPSB7XG5cdFx0XHRcdHR5cGU6IFwiRW51bU1lbWJlclwiLFxuXHRcdFx0XHRFbnVtTWVtYmVyOiB2YWx1ZVxuXHRcdFx0fTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmVzdWx0ID0ge1xuXHRcdFx0XHR0eXBlOiBcIlN0cmluZ1wiLFxuXHRcdFx0XHRTdHJpbmc6IHZhbHVlXG5cdFx0XHR9O1xuXHRcdH1cblx0fSBlbHNlIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuXHRcdHJlc3VsdCA9IHtcblx0XHRcdHR5cGU6IFwiQ29sbGVjdGlvblwiLFxuXHRcdFx0Q29sbGVjdGlvbjogdmFsdWUubWFwKGFubm8gPT4gcmV2ZXJ0Q29sbGVjdGlvbkl0ZW1Ub0dlbmVyaWNUeXBlKHJlZmVyZW5jZXMsIGFubm8pKSBhcyBhbnlbXVxuXHRcdH07XG5cdH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSBcImJvb2xlYW5cIikge1xuXHRcdHJlc3VsdCA9IHtcblx0XHRcdHR5cGU6IFwiQm9vbFwiLFxuXHRcdFx0Qm9vbDogdmFsdWVcblx0XHR9O1xuXHR9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIikge1xuXHRcdGlmICh2YWx1ZS50b1N0cmluZygpID09PSB2YWx1ZS50b0ZpeGVkKCkpIHtcblx0XHRcdHJlc3VsdCA9IHtcblx0XHRcdFx0dHlwZTogXCJJbnRcIixcblx0XHRcdFx0SW50OiB2YWx1ZVxuXHRcdFx0fTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmVzdWx0ID0ge1xuXHRcdFx0XHR0eXBlOiBcIkRlY2ltYWxcIixcblx0XHRcdFx0RGVjaW1hbDogdmFsdWVcblx0XHRcdH07XG5cdFx0fVxuXHR9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiAmJiB2YWx1ZS5pc0RlY2ltYWwgJiYgdmFsdWUuaXNEZWNpbWFsKCkpIHtcblx0XHRyZXN1bHQgPSB7XG5cdFx0XHR0eXBlOiBcIkRlY2ltYWxcIixcblx0XHRcdERlY2ltYWw6IHZhbHVlLnZhbHVlT2YoKVxuXHRcdH07XG5cdH0gZWxzZSBpZiAodmFsdWUudHlwZSA9PT0gXCJQYXRoXCIpIHtcblx0XHRyZXN1bHQgPSB7XG5cdFx0XHR0eXBlOiBcIlBhdGhcIixcblx0XHRcdFBhdGg6IHZhbHVlLnBhdGhcblx0XHR9O1xuXHR9IGVsc2UgaWYgKHZhbHVlLnR5cGUgPT09IFwiQW5ub3RhdGlvblBhdGhcIikge1xuXHRcdHJlc3VsdCA9IHtcblx0XHRcdHR5cGU6IFwiQW5ub3RhdGlvblBhdGhcIixcblx0XHRcdEFubm90YXRpb25QYXRoOiB2YWx1ZS52YWx1ZVxuXHRcdH07XG5cdH0gZWxzZSBpZiAodmFsdWUudHlwZSA9PT0gXCJQcm9wZXJ0eVBhdGhcIikge1xuXHRcdHJlc3VsdCA9IHtcblx0XHRcdHR5cGU6IFwiUHJvcGVydHlQYXRoXCIsXG5cdFx0XHRQcm9wZXJ0eVBhdGg6IHZhbHVlLnZhbHVlXG5cdFx0fTtcblx0fSBlbHNlIGlmICh2YWx1ZS50eXBlID09PSBcIk5hdmlnYXRpb25Qcm9wZXJ0eVBhdGhcIikge1xuXHRcdHJlc3VsdCA9IHtcblx0XHRcdHR5cGU6IFwiTmF2aWdhdGlvblByb3BlcnR5UGF0aFwiLFxuXHRcdFx0TmF2aWdhdGlvblByb3BlcnR5UGF0aDogdmFsdWUudmFsdWVcblx0XHR9O1xuXHR9IGVsc2UgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh2YWx1ZSwgXCIkVHlwZVwiKSkge1xuXHRcdHJlc3VsdCA9IHtcblx0XHRcdHR5cGU6IFwiUmVjb3JkXCIsXG5cdFx0XHRSZWNvcmQ6IHJldmVydENvbGxlY3Rpb25JdGVtVG9HZW5lcmljVHlwZShyZWZlcmVuY2VzLCB2YWx1ZSkgYXMgQW5ub3RhdGlvblJlY29yZFxuXHRcdH07XG5cdH1cblx0cmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gcmV2ZXJ0Q29sbGVjdGlvbkl0ZW1Ub0dlbmVyaWNUeXBlKFxuXHRyZWZlcmVuY2VzOiBSZWZlcmVuY2VbXSxcblx0Y29sbGVjdGlvbkl0ZW06IGFueVxuKTpcblx0fCBBbm5vdGF0aW9uUmVjb3JkXG5cdHwgc3RyaW5nXG5cdHwgUHJvcGVydHlQYXRoRXhwcmVzc2lvblxuXHR8IFBhdGhFeHByZXNzaW9uXG5cdHwgTmF2aWdhdGlvblByb3BlcnR5UGF0aEV4cHJlc3Npb25cblx0fCBBbm5vdGF0aW9uUGF0aEV4cHJlc3Npb25cblx0fCB1bmRlZmluZWQge1xuXHRpZiAodHlwZW9mIGNvbGxlY3Rpb25JdGVtID09PSBcInN0cmluZ1wiKSB7XG5cdFx0cmV0dXJuIGNvbGxlY3Rpb25JdGVtO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBjb2xsZWN0aW9uSXRlbSA9PT0gXCJvYmplY3RcIikge1xuXHRcdGlmIChjb2xsZWN0aW9uSXRlbS5oYXNPd25Qcm9wZXJ0eShcIiRUeXBlXCIpKSB7XG5cdFx0XHQvLyBBbm5vdGF0aW9uIFJlY29yZFxuXHRcdFx0Y29uc3Qgb3V0SXRlbTogQW5ub3RhdGlvblJlY29yZCA9IHtcblx0XHRcdFx0dHlwZTogY29sbGVjdGlvbkl0ZW0uJFR5cGUsXG5cdFx0XHRcdHByb3BlcnR5VmFsdWVzOiBbXSBhcyBhbnlbXVxuXHRcdFx0fTtcblx0XHRcdC8vIENvdWxkIHZhbGlkYXRlIGtleXMgYW5kIHR5cGUgYmFzZWQgb24gJFR5cGVcblx0XHRcdE9iamVjdC5rZXlzKGNvbGxlY3Rpb25JdGVtKS5mb3JFYWNoKGNvbGxlY3Rpb25LZXkgPT4ge1xuXHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0Y29sbGVjdGlvbktleSAhPT0gXCIkVHlwZVwiICYmXG5cdFx0XHRcdFx0Y29sbGVjdGlvbktleSAhPT0gXCJ0ZXJtXCIgJiZcblx0XHRcdFx0XHRjb2xsZWN0aW9uS2V5ICE9PSBcIl9fc291cmNlXCIgJiZcblx0XHRcdFx0XHRjb2xsZWN0aW9uS2V5ICE9PSBcInF1YWxpZmllclwiICYmXG5cdFx0XHRcdFx0Y29sbGVjdGlvbktleSAhPT0gXCJBY3Rpb25UYXJnZXRcIiAmJlxuXHRcdFx0XHRcdGNvbGxlY3Rpb25LZXkgIT09IFwiZnVsbHlRdWFsaWZpZWROYW1lXCIgJiZcblx0XHRcdFx0XHRjb2xsZWN0aW9uS2V5ICE9PSBcImFubm90YXRpb25zXCJcblx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0Y29uc3QgdmFsdWUgPSBjb2xsZWN0aW9uSXRlbVtjb2xsZWN0aW9uS2V5XTtcblx0XHRcdFx0XHRvdXRJdGVtLnByb3BlcnR5VmFsdWVzLnB1c2goe1xuXHRcdFx0XHRcdFx0bmFtZTogY29sbGVjdGlvbktleSxcblx0XHRcdFx0XHRcdHZhbHVlOiByZXZlcnRWYWx1ZVRvR2VuZXJpY1R5cGUocmVmZXJlbmNlcywgdmFsdWUpIGFzIEV4cHJlc3Npb25cblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fSBlbHNlIGlmIChjb2xsZWN0aW9uS2V5ID09PSBcImFubm90YXRpb25zXCIpIHtcblx0XHRcdFx0XHRjb25zdCBhbm5vdGF0aW9ucyA9IGNvbGxlY3Rpb25JdGVtW2NvbGxlY3Rpb25LZXldO1xuXHRcdFx0XHRcdG91dEl0ZW0uYW5ub3RhdGlvbnMgPSBbXTtcblx0XHRcdFx0XHRPYmplY3Qua2V5cyhhbm5vdGF0aW9ucylcblx0XHRcdFx0XHRcdC5maWx0ZXIoa2V5ID0+IGtleSAhPT0gXCJfYW5ub3RhdGlvbnNcIilcblx0XHRcdFx0XHRcdC5mb3JFYWNoKGtleSA9PiB7XG5cdFx0XHRcdFx0XHRcdE9iamVjdC5rZXlzKGFubm90YXRpb25zW2tleV0pLmZvckVhY2godGVybSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0Y29uc3QgcGFyc2VkQW5ub3RhdGlvbiA9IHJldmVydFRlcm1Ub0dlbmVyaWNUeXBlKHJlZmVyZW5jZXMsIGFubm90YXRpb25zW2tleV1bdGVybV0pO1xuXHRcdFx0XHRcdFx0XHRcdGlmICghcGFyc2VkQW5ub3RhdGlvbi50ZXJtKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRjb25zdCB1bmFsaWFzZWRUZXJtID0gdW5hbGlhcyhyZWZlcmVuY2VzLCBgJHtrZXl9LiR7dGVybX1gKTtcblx0XHRcdFx0XHRcdFx0XHRcdGlmICh1bmFsaWFzZWRUZXJtKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0IHF1YWxpZmllZFNwbGl0ID0gdW5hbGlhc2VkVGVybS5zcGxpdChcIiNcIik7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHBhcnNlZEFubm90YXRpb24udGVybSA9IHF1YWxpZmllZFNwbGl0WzBdO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAocXVhbGlmaWVkU3BsaXQubGVuZ3RoID4gMSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHBhcnNlZEFubm90YXRpb24ucXVhbGlmaWVyID0gcXVhbGlmaWVkU3BsaXRbMV07XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0b3V0SXRlbS5hbm5vdGF0aW9ucz8ucHVzaChwYXJzZWRBbm5vdGF0aW9uKTtcblx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gb3V0SXRlbTtcblx0XHR9IGVsc2UgaWYgKGNvbGxlY3Rpb25JdGVtLnR5cGUgPT09IFwiUHJvcGVydHlQYXRoXCIpIHtcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdHR5cGU6IFwiUHJvcGVydHlQYXRoXCIsXG5cdFx0XHRcdFByb3BlcnR5UGF0aDogY29sbGVjdGlvbkl0ZW0udmFsdWVcblx0XHRcdH07XG5cdFx0fSBlbHNlIGlmIChjb2xsZWN0aW9uSXRlbS50eXBlID09PSBcIkFubm90YXRpb25QYXRoXCIpIHtcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdHR5cGU6IFwiQW5ub3RhdGlvblBhdGhcIixcblx0XHRcdFx0QW5ub3RhdGlvblBhdGg6IGNvbGxlY3Rpb25JdGVtLnZhbHVlXG5cdFx0XHR9O1xuXHRcdH0gZWxzZSBpZiAoY29sbGVjdGlvbkl0ZW0udHlwZSA9PT0gXCJOYXZpZ2F0aW9uUHJvcGVydHlQYXRoXCIpIHtcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdHR5cGU6IFwiTmF2aWdhdGlvblByb3BlcnR5UGF0aFwiLFxuXHRcdFx0XHROYXZpZ2F0aW9uUHJvcGVydHlQYXRoOiBjb2xsZWN0aW9uSXRlbS52YWx1ZVxuXHRcdFx0fTtcblx0XHR9XG5cdH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJldmVydFRlcm1Ub0dlbmVyaWNUeXBlKHJlZmVyZW5jZXM6IFJlZmVyZW5jZVtdLCBhbm5vdGF0aW9uOiBBbm5vdGF0aW9uVGVybTxhbnk+KTogRWRtQW5ub3RhdGlvbiB7XG5cdGNvbnN0IGJhc2VBbm5vdGF0aW9uOiBFZG1Bbm5vdGF0aW9uID0ge1xuXHRcdHRlcm06IGFubm90YXRpb24udGVybSxcblx0XHRxdWFsaWZpZXI6IGFubm90YXRpb24ucXVhbGlmaWVyXG5cdH07XG5cdGlmIChBcnJheS5pc0FycmF5KGFubm90YXRpb24pKSB7XG5cdFx0Ly8gQ29sbGVjdGlvblxuXHRcdGlmIChhbm5vdGF0aW9uLmhhc093blByb3BlcnR5KFwiYW5ub3RhdGlvbnNcIikpIHtcblx0XHRcdGJhc2VBbm5vdGF0aW9uLmFubm90YXRpb25zID0gW107XG5cdFx0XHRjb25zdCBjdXJyZW50QW5ub3RhdGlvbnMgPSAoYW5ub3RhdGlvbiBhcyBhbnkpLmFubm90YXRpb25zO1xuXHRcdFx0T2JqZWN0LmtleXMoY3VycmVudEFubm90YXRpb25zKVxuXHRcdFx0XHQuZmlsdGVyKGtleSA9PiBrZXkgIT09IFwiX2Fubm90YXRpb25zXCIpXG5cdFx0XHRcdC5mb3JFYWNoKGtleSA9PiB7XG5cdFx0XHRcdFx0T2JqZWN0LmtleXMoY3VycmVudEFubm90YXRpb25zW2tleV0pLmZvckVhY2godGVybSA9PiB7XG5cdFx0XHRcdFx0XHRjb25zdCBwYXJzZWRBbm5vdGF0aW9uID0gcmV2ZXJ0VGVybVRvR2VuZXJpY1R5cGUocmVmZXJlbmNlcywgY3VycmVudEFubm90YXRpb25zW2tleV1bdGVybV0pO1xuXHRcdFx0XHRcdFx0aWYgKCFwYXJzZWRBbm5vdGF0aW9uLnRlcm0pIHtcblx0XHRcdFx0XHRcdFx0Y29uc3QgdW5hbGlhc2VkVGVybSA9IHVuYWxpYXMocmVmZXJlbmNlcywgYCR7a2V5fS4ke3Rlcm19YCk7XG5cdFx0XHRcdFx0XHRcdGlmICh1bmFsaWFzZWRUZXJtKSB7XG5cdFx0XHRcdFx0XHRcdFx0Y29uc3QgcXVhbGlmaWVkU3BsaXQgPSB1bmFsaWFzZWRUZXJtLnNwbGl0KFwiI1wiKTtcblx0XHRcdFx0XHRcdFx0XHRwYXJzZWRBbm5vdGF0aW9uLnRlcm0gPSBxdWFsaWZpZWRTcGxpdFswXTtcblx0XHRcdFx0XHRcdFx0XHRpZiAocXVhbGlmaWVkU3BsaXQubGVuZ3RoID4gMSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0cGFyc2VkQW5ub3RhdGlvbi5xdWFsaWZpZXIgPSBxdWFsaWZpZWRTcGxpdFsxXTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGJhc2VBbm5vdGF0aW9uLmFubm90YXRpb25zPy5wdXNoKHBhcnNlZEFubm90YXRpb24pO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9KTtcblx0XHR9XG5cdFx0cmV0dXJuIHtcblx0XHRcdC4uLmJhc2VBbm5vdGF0aW9uLFxuXHRcdFx0Y29sbGVjdGlvbjogYW5ub3RhdGlvbi5tYXAoYW5ubyA9PiByZXZlcnRDb2xsZWN0aW9uSXRlbVRvR2VuZXJpY1R5cGUocmVmZXJlbmNlcywgYW5ubykpIGFzIGFueVtdXG5cdFx0fTtcblx0fSBlbHNlIGlmIChhbm5vdGF0aW9uLmhhc093blByb3BlcnR5KFwiJFR5cGVcIikpIHtcblx0XHRyZXR1cm4geyAuLi5iYXNlQW5ub3RhdGlvbiwgcmVjb3JkOiByZXZlcnRDb2xsZWN0aW9uSXRlbVRvR2VuZXJpY1R5cGUocmVmZXJlbmNlcywgYW5ub3RhdGlvbikgYXMgYW55IH07XG5cdH0gZWxzZSB7XG5cdFx0cmV0dXJuIHsgLi4uYmFzZUFubm90YXRpb24sIHZhbHVlOiByZXZlcnRWYWx1ZVRvR2VuZXJpY1R5cGUocmVmZXJlbmNlcywgYW5ub3RhdGlvbikgfTtcblx0fVxufVxuIl19