// Copyright (c) 2009-2017 SAP SE, All Rights Reserved
sap.ui.define(["sap/ui/thirdparty/jquery","sap/ushell/bootstrap/common/common.util"],function(q,u){"use strict";var m={start:s,initXhrLogonIgnoreList:i,createUi5ConnectedXhrLogger:c};return m;function c(){return["error","warning","info","debug"].reduce(function(x,l){x[l]=function(M){return q.sap.log[l](M);};return x;},{});}function i(x){var o=u.getLocationOrigin(),U=q.sap.getModulePath("");if(U&&U.indexOf(o+"/")===-1){x.ignore.add(U);}}function s(S,x){x.start();m.initXhrLogonIgnoreList(x.XHRLogonManager.getInstance());XMLHttpRequest.logger=c();S.oFrameLogonManager=x.FrameLogonManager.getInstance();}});