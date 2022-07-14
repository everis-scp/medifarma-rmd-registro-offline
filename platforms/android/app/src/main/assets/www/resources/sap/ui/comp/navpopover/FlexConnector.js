/*
 * ! SAPUI5

		(c) Copyright 2009-2021 SAP SE. All rights reserved
	
 */
sap.ui.define(['sap/ui/comp/library','sap/ui/comp/navpopover/flexibility/changes/AddLink','sap/ui/comp/navpopover/flexibility/changes/RemoveLink','sap/base/Log'],function(C,A,R,L){"use strict";var a=C.navpopover.ChangeHandlerType;return{createAndSaveChangesForControl:function(m,M,c){if(!m.length&&!M.length){return Promise.resolve();}return this._createChangesForControl(M.concat(m),c).then(function(b){return this._saveChangesForControl(c,b);}.bind(this),function(e){return Promise.reject(e);});},_getControlPersonalizationWriteAPI:function(){return sap.ui.getCore().loadLibrary('sap.ui.fl',{async:true}).then(function(){return new Promise(function(r){sap.ui.require(["sap/ui/fl/write/api/ControlPersonalizationWriteAPI"],function(b){r(b);});});});},discardChangesForControl:function(c){return this._getControlPersonalizationWriteAPI().then(function(b){return b.reset({selectors:[c]});});},_saveChangesForControl:function(c,b){return this._getControlPersonalizationWriteAPI().then(function(d){return d.save({selector:c,changes:b});});},_createChangesForControl:function(m,c){if(!m.length){return[];}var p=[];m.forEach(function(M){var P={selectorElement:c,changeSpecificData:{changeType:M.visible?a.addLink:a.removeLink,content:M,isUserDependent:true}};p.push(P);});return this._getControlPersonalizationWriteAPI().then(function(b){return b.add({changes:p});});},activateApplyChangeStatistics:function(){var t=this;this.aStatistics=[];var w=function(o,n){if(t.aStatistics.findIndex(function(s){return s.stableId===n.getId()&&s.changeId===o.getId();})<0){var e=n.getAvailableActions().find(function(g){return g.getKey()===o.getContent().key;});t.aStatistics.push({stableId:n.getId(),changeId:o.getId(),layer:o.getLayer(),key:o.getContent().key,text:e?e.getText():'',changeType:o.getChangeType()});}};var d=function(l){t.aStatistics=t.aStatistics.filter(function(s){return s.layer!==l;});};var f=A.applyChange.bind(A);A.applyChange=function(o,n,p){w(o,n);f(o,n,p);};var r=R.applyChange.bind(R);R.applyChange=function(o,n,p){w(o,n);r(o,n,p);};var b=A.discardChangesOfLayer.bind(A);A.discardChangesOfLayer=function(l,n){d(l);b(l,n);};var c=R.discardChangesOfLayer.bind(R);R.discardChangesOfLayer=function(l,n){d(l);c(l,n);};},_formatStatistic:function(s){var l=s.layer;switch(s.layer){case"VENDOR":l=""+l;break;case"CUSTOMER":l="        "+l;break;case"USER":l="                "+l;break;default:l=""+l;}var v;switch(s.changeType){case a.addLink:v="On";break;case a.removeLink:v="Off";break;default:v="";}return{formattedLayer:l,formattedValue:v};},printStatisticAll:function(){if(!this.aStatistics){L.info("Please activate with sap.ui.comp.navpopover.FlexConnector.activateApplyChangeStatistics()");return;}var t=this;L.info("idx - VENDOR ------------ CUSTOMER ----------- USER --------------------------------------");this.aStatistics.forEach(function(s,i){var f=t._formatStatistic(s);L.info(i+" "+s.stableId+" "+f.formattedLayer+" '"+s.text+"' "+f.formattedValue);});}};},true);
