/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
        (c) Copyright 2009-2021 SAP SE. All rights reserved
    
 */
sap.ui.define([],function(){"use strict";return{getShowBoundMessagesInMessageDialog:function(){return(!this.base.getModel("ui").getProperty("/isEditable")||this.base.getView().getBindingContext("internal").getProperty("isActionParameterDialogOpen"));}};});
