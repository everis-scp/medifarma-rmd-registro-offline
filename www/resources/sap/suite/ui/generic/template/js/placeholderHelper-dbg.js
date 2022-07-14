sap.ui.define(["sap/ui/model/odata/AnnotationHelper",
	"sap/base/util/isEmptyObject",
	"sap/base/util/extend"
], function (AnnotationHelperModel,isEmptyObject,extend) {
	"use strict";

	var placeholderHelper = {

		/*
		This method is used to reset the placeholders to components
		*/

		resetPlaceHolders: function(oTemplateUtils){	
			var oTemplatePrivateGlobal = oTemplateUtils.oComponentUtils.getTemplatePrivateGlobalModel();
			if (!(isEmptyObject(oTemplatePrivateGlobal.getProperty("/generic/placeholdersShown")))){
				oTemplatePrivateGlobal.setProperty("/generic/placeholdersShown", {"":true});
			}
		},

	
		// return if placeholder is active
		isPlaceHolderInactive: function(oTemplatePrivateGlobalModel){
			if (oTemplatePrivateGlobalModel.getProperty("/generic/placeholdersShown") !== undefined){
				return isEmptyObject(oTemplatePrivateGlobalModel.getProperty("/generic/placeholdersShown"));
			} else {
				return false;
			}
			
		},

		setPlaceHolderPreconditions: function(oTemplatePrivateGlobalModel){
			oTemplatePrivateGlobalModel.setProperty("/generic/repeatPlaceholder", true);
		},

		setPlaceholder: function(oIdentity, oFlexibleColumnLayoutHandler, oTemplatePrivateGlobalModel, oRoutingTree){
			var mPlaceholders = Object.create(null);
			var bIsMultiColumn = oFlexibleColumnLayoutHandler && !oFlexibleColumnLayoutHandler.hasIdentityFullscreenLayout(oIdentity);
			var mPlaceholdersOld = oTemplatePrivateGlobalModel.getProperty("/generic/placeholdersShown");
			extend(mPlaceholders, mPlaceholdersOld); 
			var bEnablePlaceholder = oTemplatePrivateGlobalModel.getProperty("/generic/enablePlaceholder");
			// This function is not removing placeholders. It only decides whether new ones need to be set
			for (var oTreeNode = oIdentity.treeNode; oTreeNode; oTreeNode = bIsMultiColumn && oTreeNode.fCLLevel && oRoutingTree[oTreeNode.parentRoute]){
				if (oTreeNode.behaviour.getPlaceholderInfo() && bEnablePlaceholder){
					if (!oTreeNode.componentId ){ // setting place holder when LR and OP is opened for first time
						mPlaceholders[oTreeNode.sRouteName] = true;
					} else if (oTemplatePrivateGlobalModel.getProperty("/generic/repeatPlaceholder") === true && oTreeNode.sRouteName !== "root"){ // setting placeholder, when OP is not opened first time, but still placeholder is required.
						mPlaceholders[oTreeNode.sRouteName] = true;
					}
					oTemplatePrivateGlobalModel.setProperty("/generic/repeatPlaceholder", false);	   
				}
			}
			oTemplatePrivateGlobalModel.setProperty("/generic/placeholdersShown", mPlaceholders);

		}

	};

	return placeholderHelper;
}, /* bExport= */ true);
