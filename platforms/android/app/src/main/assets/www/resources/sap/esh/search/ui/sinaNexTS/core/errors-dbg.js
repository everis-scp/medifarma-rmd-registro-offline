/*! 
 * SAPUI5

		(c) Copyright 2009-2021 SAP SE. All rights reserved
	 
 */

/* global Proxy, Reflect, Symbol */

(function(){
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
sap.ui.define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.InBetweenConditionInConsistent = exports.QueryIsReadOnlyError = exports.NoValidEnterpriseSearchAPIConfigurationFoundError = exports.DataSourceAttributeMetadataNotFoundError = exports.DataSourceInURLDoesNotExistError = exports.CanNotCreateAlreadyExistingDataSourceError = exports.CanOnlyAutoInsertComplexConditionError = exports.SubProviderError = exports.DateConversionError = exports.TimeConversionError = exports.WhyFoundAttributeMetadataMissingError = exports.FacetsParseError = exports.ESHNotActiveError = exports.InternalServerError = exports.UnknownConditionTypeError = exports.UnknownDataTypeError = exports.UnknownPresentationUsageError = exports.UnknownLogicalOperatorError = exports.UnknownComparisonOperatorError = exports.UnknownAttributeTypeError = exports.NotImplementedError = exports.TimeOutError = exports.NoJSONDateError = exports.AjaxError = exports.InternalESHClientError = exports.ESHClientError = void 0;
    var ESHClientError = /** @class */ (function (_super) {
        __extends(ESHClientError, _super);
        function ESHClientError(properties) {
            var _a, _b;
            var _this = _super.call(this, properties.message) || this;
            _this.message = (_a = properties.message) !== null && _a !== void 0 ? _a : "Unspecified ESH Client Error";
            _this.name = (_b = properties.name) !== null && _b !== void 0 ? _b : "ESHClientError";
            _this.previous = properties.previous;
            return _this;
        }
        ESHClientError.prototype.toString = function () {
            return this.name + ": " + this.message;
        };
        return ESHClientError;
    }(Error));
    exports.ESHClientError = ESHClientError;
    // =========================================================================
    // List of all Sina Exceptions
    // =========================================================================
    var InternalESHClientError = /** @class */ (function (_super) {
        __extends(InternalESHClientError, _super);
        function InternalESHClientError(message) {
            var _this = this;
            var properties = {
                name: "InternalESHClientError",
                message: message !== null && message !== void 0 ? message : "Internal ESH Client Error",
            };
            _this = _super.call(this, properties) || this;
            return _this;
        }
        return InternalESHClientError;
    }(ESHClientError));
    exports.InternalESHClientError = InternalESHClientError;
    var AjaxError = /** @class */ (function (_super) {
        __extends(AjaxError, _super);
        function AjaxError(xhttp, responseHeaders) {
            var _a, _b;
            var _this = this;
            var status = xhttp.status;
            var statusText = (_a = xhttp.statusText) !== null && _a !== void 0 ? _a : "";
            var responseText = (_b = xhttp.responseText) !== null && _b !== void 0 ? _b : "";
            // let headers = "";
            // if (typeof xhttp.getAllResponseHeaders !== "undefined") {
            //     headers = xhttp.getAllResponseHeaders();
            // }
            _this = _super.call(this, {
                message: status + ": " + statusText + " - " + responseText,
                name: "ESHAjaxError",
            }) || this;
            _this.xhttp = xhttp;
            _this.responseHeaders = responseHeaders;
            return _this;
        }
        return AjaxError;
    }(ESHClientError));
    exports.AjaxError = AjaxError;
    var NoJSONDateError = /** @class */ (function (_super) {
        __extends(NoJSONDateError, _super);
        function NoJSONDateError(message) {
            var _this = this;
            var properties = {
                name: "NoJSONDateError",
                message: message !== null && message !== void 0 ? message : "No JSON Date",
            };
            _this = _super.call(this, properties) || this;
            return _this;
        }
        return NoJSONDateError;
    }(ESHClientError));
    exports.NoJSONDateError = NoJSONDateError;
    var TimeOutError = /** @class */ (function (_super) {
        __extends(TimeOutError, _super);
        function TimeOutError(message) {
            var _this = this;
            var properties = {
                name: "TimeOutError",
                message: message !== null && message !== void 0 ? message : "Time out",
            };
            _this = _super.call(this, properties) || this;
            return _this;
        }
        return TimeOutError;
    }(ESHClientError));
    exports.TimeOutError = TimeOutError;
    var NotImplementedError = /** @class */ (function (_super) {
        __extends(NotImplementedError, _super);
        function NotImplementedError() {
            return _super.call(this, { message: "Not implemented", name: "ESHNotImplementedError" }) || this;
        }
        return NotImplementedError;
    }(ESHClientError));
    exports.NotImplementedError = NotImplementedError;
    var UnknownAttributeTypeError = /** @class */ (function (_super) {
        __extends(UnknownAttributeTypeError, _super);
        function UnknownAttributeTypeError(message) {
            var _this = this;
            var properties = {
                name: "UnknownAttributeTypeError",
                message: message !== null && message !== void 0 ? message : "Unknown attribute type",
            };
            _this = _super.call(this, properties) || this;
            return _this;
        }
        return UnknownAttributeTypeError;
    }(ESHClientError));
    exports.UnknownAttributeTypeError = UnknownAttributeTypeError;
    var UnknownComparisonOperatorError = /** @class */ (function (_super) {
        __extends(UnknownComparisonOperatorError, _super);
        function UnknownComparisonOperatorError(message) {
            var _this = this;
            var properties = {
                name: "UnknownComparisonOperatorError",
                message: message !== null && message !== void 0 ? message : "Unknown comparison operator",
            };
            _this = _super.call(this, properties) || this;
            return _this;
        }
        return UnknownComparisonOperatorError;
    }(ESHClientError));
    exports.UnknownComparisonOperatorError = UnknownComparisonOperatorError;
    var UnknownLogicalOperatorError = /** @class */ (function (_super) {
        __extends(UnknownLogicalOperatorError, _super);
        function UnknownLogicalOperatorError(message) {
            var _this = this;
            var properties = {
                name: "UnknownLogicalOperatorError",
                message: message !== null && message !== void 0 ? message : "Unknown logical operator",
            };
            _this = _super.call(this, properties) || this;
            return _this;
        }
        return UnknownLogicalOperatorError;
    }(ESHClientError));
    exports.UnknownLogicalOperatorError = UnknownLogicalOperatorError;
    var UnknownPresentationUsageError = /** @class */ (function (_super) {
        __extends(UnknownPresentationUsageError, _super);
        function UnknownPresentationUsageError(message) {
            var _this = this;
            var properties = {
                name: "UnknownPresentationUsageError",
                message: message !== null && message !== void 0 ? message : "Unknown presentation usage",
            };
            _this = _super.call(this, properties) || this;
            return _this;
        }
        return UnknownPresentationUsageError;
    }(ESHClientError));
    exports.UnknownPresentationUsageError = UnknownPresentationUsageError;
    var UnknownDataTypeError = /** @class */ (function (_super) {
        __extends(UnknownDataTypeError, _super);
        function UnknownDataTypeError(message) {
            var _this = this;
            var properties = {
                name: "UnknownDataTypeError",
                message: message !== null && message !== void 0 ? message : "Unknown data type",
            };
            _this = _super.call(this, properties) || this;
            return _this;
        }
        return UnknownDataTypeError;
    }(ESHClientError));
    exports.UnknownDataTypeError = UnknownDataTypeError;
    var UnknownConditionTypeError = /** @class */ (function (_super) {
        __extends(UnknownConditionTypeError, _super);
        function UnknownConditionTypeError(message) {
            var _this = this;
            var properties = {
                name: "UnknownConditionTypeError",
                message: message !== null && message !== void 0 ? message : "Unknown condition type",
            };
            _this = _super.call(this, properties) || this;
            return _this;
        }
        return UnknownConditionTypeError;
    }(ESHClientError));
    exports.UnknownConditionTypeError = UnknownConditionTypeError;
    var InternalServerError = /** @class */ (function (_super) {
        __extends(InternalServerError, _super);
        function InternalServerError(message) {
            var _this = this;
            var properties = {
                name: "InternalServerError",
                message: message !== null && message !== void 0 ? message : "Internal server error",
            };
            _this = _super.call(this, properties) || this;
            return _this;
        }
        return InternalServerError;
    }(ESHClientError));
    exports.InternalServerError = InternalServerError;
    var ESHNotActiveError = /** @class */ (function (_super) {
        __extends(ESHNotActiveError, _super);
        function ESHNotActiveError(message) {
            var _this = this;
            var properties = {
                name: "ESHNotActiveError",
                message: message !== null && message !== void 0 ? message : "Enterprise Search is not active",
            };
            _this = _super.call(this, properties) || this;
            return _this;
        }
        return ESHNotActiveError;
    }(ESHClientError));
    exports.ESHNotActiveError = ESHNotActiveError;
    var FacetsParseError = /** @class */ (function (_super) {
        __extends(FacetsParseError, _super);
        function FacetsParseError(message) {
            var _this = this;
            var properties = {
                name: "FacetsParseError",
                message: message !== null && message !== void 0 ? message : "Facets parse error",
            };
            _this = _super.call(this, properties) || this;
            return _this;
        }
        return FacetsParseError;
    }(ESHClientError));
    exports.FacetsParseError = FacetsParseError;
    var WhyFoundAttributeMetadataMissingError = /** @class */ (function (_super) {
        __extends(WhyFoundAttributeMetadataMissingError, _super);
        function WhyFoundAttributeMetadataMissingError(message) {
            var _this = this;
            var properties = {
                name: "WhyFoundAttributeMetadataMissingError",
                message: message !== null && message !== void 0 ? message : "Why found attribute metadata missing",
            };
            _this = _super.call(this, properties) || this;
            return _this;
        }
        return WhyFoundAttributeMetadataMissingError;
    }(ESHClientError));
    exports.WhyFoundAttributeMetadataMissingError = WhyFoundAttributeMetadataMissingError;
    var TimeConversionError = /** @class */ (function (_super) {
        __extends(TimeConversionError, _super);
        function TimeConversionError(message) {
            var _this = this;
            var properties = {
                name: "TimeConversionError",
                message: message !== null && message !== void 0 ? message : "Time conversion error",
            };
            _this = _super.call(this, properties) || this;
            return _this;
        }
        return TimeConversionError;
    }(ESHClientError));
    exports.TimeConversionError = TimeConversionError;
    var DateConversionError = /** @class */ (function (_super) {
        __extends(DateConversionError, _super);
        function DateConversionError(message) {
            var _this = this;
            var properties = {
                name: "DateConversionError",
                message: message !== null && message !== void 0 ? message : "Date conversion error",
            };
            _this = _super.call(this, properties) || this;
            return _this;
        }
        return DateConversionError;
    }(ESHClientError));
    exports.DateConversionError = DateConversionError;
    var SubProviderError = /** @class */ (function (_super) {
        __extends(SubProviderError, _super);
        function SubProviderError(message) {
            var _this = this;
            var properties = {
                name: "SubProviderError",
                message: message !== null && message !== void 0 ? message : "subprovider error",
            };
            _this = _super.call(this, properties) || this;
            return _this;
        }
        return SubProviderError;
    }(ESHClientError));
    exports.SubProviderError = SubProviderError;
    var CanOnlyAutoInsertComplexConditionError = /** @class */ (function (_super) {
        __extends(CanOnlyAutoInsertComplexConditionError, _super);
        function CanOnlyAutoInsertComplexConditionError(message) {
            var _this = this;
            var properties = {
                name: "CanOnlyAutoInsertComplexConditionError",
                message: message !== null && message !== void 0 ? message : "Can only insert complex condition",
            };
            _this = _super.call(this, properties) || this;
            return _this;
        }
        return CanOnlyAutoInsertComplexConditionError;
    }(ESHClientError));
    exports.CanOnlyAutoInsertComplexConditionError = CanOnlyAutoInsertComplexConditionError;
    var CanNotCreateAlreadyExistingDataSourceError = /** @class */ (function (_super) {
        __extends(CanNotCreateAlreadyExistingDataSourceError, _super);
        function CanNotCreateAlreadyExistingDataSourceError(message) {
            var _this = this;
            var properties = {
                name: "CanNotCreateAlreadyExistingDataSourceError",
                message: message !== null && message !== void 0 ? message : "Can not create already existing data source",
            };
            _this = _super.call(this, properties) || this;
            return _this;
        }
        return CanNotCreateAlreadyExistingDataSourceError;
    }(ESHClientError));
    exports.CanNotCreateAlreadyExistingDataSourceError = CanNotCreateAlreadyExistingDataSourceError;
    var DataSourceInURLDoesNotExistError = /** @class */ (function (_super) {
        __extends(DataSourceInURLDoesNotExistError, _super);
        function DataSourceInURLDoesNotExistError(message) {
            var _this = this;
            var properties = {
                name: "DataSourceInURLDoesNotExistError",
                message: message !== null && message !== void 0 ? message : "Data source in url does not exist",
            };
            _this = _super.call(this, properties) || this;
            return _this;
        }
        return DataSourceInURLDoesNotExistError;
    }(ESHClientError));
    exports.DataSourceInURLDoesNotExistError = DataSourceInURLDoesNotExistError;
    var DataSourceAttributeMetadataNotFoundError = /** @class */ (function (_super) {
        __extends(DataSourceAttributeMetadataNotFoundError, _super);
        function DataSourceAttributeMetadataNotFoundError(message) {
            var _this = this;
            var properties = {
                name: "DataSourceAttributeMetadataNotFoundError",
                message: message !== null && message !== void 0 ? message : "data source attribute metadata not found",
            };
            _this = _super.call(this, properties) || this;
            return _this;
        }
        return DataSourceAttributeMetadataNotFoundError;
    }(ESHClientError));
    exports.DataSourceAttributeMetadataNotFoundError = DataSourceAttributeMetadataNotFoundError;
    var NoValidEnterpriseSearchAPIConfigurationFoundError = /** @class */ (function (_super) {
        __extends(NoValidEnterpriseSearchAPIConfigurationFoundError, _super);
        function NoValidEnterpriseSearchAPIConfigurationFoundError(providersTried) {
            var _this = this;
            var properties = {
                name: "NoValidEnterpriseSearchAPIConfigurationFoundError",
                message: "Tried following providers: " + providersTried,
            };
            _this = _super.call(this, properties) || this;
            return _this;
        }
        return NoValidEnterpriseSearchAPIConfigurationFoundError;
    }(ESHClientError));
    exports.NoValidEnterpriseSearchAPIConfigurationFoundError = NoValidEnterpriseSearchAPIConfigurationFoundError;
    var QueryIsReadOnlyError = /** @class */ (function (_super) {
        __extends(QueryIsReadOnlyError, _super);
        function QueryIsReadOnlyError(message) {
            var _this = this;
            var properties = {
                name: "QueryIsReadOnlyError",
                message: message !== null && message !== void 0 ? message : "Query is read only",
            };
            _this = _super.call(this, properties) || this;
            return _this;
        }
        return QueryIsReadOnlyError;
    }(ESHClientError));
    exports.QueryIsReadOnlyError = QueryIsReadOnlyError;
    var InBetweenConditionInConsistent = /** @class */ (function (_super) {
        __extends(InBetweenConditionInConsistent, _super);
        function InBetweenConditionInConsistent(message) {
            var _this = this;
            var properties = {
                name: "InBetweenConditionInConsistent",
                message: message !== null && message !== void 0 ? message : "In between condition is inconsistent",
            };
            _this = _super.call(this, properties) || this;
            return _this;
        }
        return InBetweenConditionInConsistent;
    }(ESHClientError));
    exports.InBetweenConditionInConsistent = InBetweenConditionInConsistent;
});
})();