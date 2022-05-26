/* hybrid capacity bootstrap
 *
 * This has to happen after sapui5 bootstrap, and before first application page is loaded.
 */

sap.hybrid = {
	loadCordova: false,

	setCordova: function () {
		sap.hybrid.loadCordova = true;
	},

	packUrl: function (url, route) {
		var result;
		if (route.manual) { // routes requires a manually created Mobile Destination with Rewrite on Backend and via CP App set
			result = route.path; // keep the original path
		} else { // OData routes that can be proxied through the automatically created CP Destination
			var connection = (fiori_client_appConfig.appID + "_" + route.destination).substr(0, 63); // max length cap by SCPms DB
			result = "/" + connection;
		}
		var path = url.substring(route.path.endsWith("/") ? route.path.length - 1 : route.path.length); // the remaining URL path
		result += (route.entryPath ? route.entryPath : "") + path;
		return result;
	},

	appLogon: function (appConfig) {
		var context = {};
		var url = appConfig.fioriURL;
		if (url && (url.indexOf("https://") === 0 || url.indexOf("http://") === 0)) {
			if (url.indexOf("https://") === 0) {
				context.https = true;
				url = url.substring("https://".length);
			} else {
				context.https = false;
				url = url.substring("http://".length);
			}

			if (url.indexOf("?") >= 0) {
				url = url.substring(0, url.indexOf("?"));
			}
			if (url.indexOf("/") >= 0) {
				url = url.split("/")[0];
			}
			if (url.indexOf(":") >= 0) {
				context.serverHost = url.split(":")[0];
				context.serverPort = url.split(":")[1];
			}
		}

		// set auth element
		if (appConfig.auth) {
			context.auth = appConfig.auth;
		}

		// If communicatorId is set then use it to be compatible with existing values. Otherwise, use the default "REST". 
		// By doing so logon core does not need to send ping request to server root URL, which will cause authentication issue. 
		// It occurs when the root URL uses a different auth method from the application's endpoint URL, as application can only handle authentication on its own endpoint URL.
		context.communicatorId = appConfig.communicatorId ? appConfig.communicatorId : "REST";

		// Set disablePasscode to true if you want to hide the passcode screen
		context.custom = {
			disablePasscode: false
		};

		if ("serverHost" in context && "serverPort" in context && "https" in context) {
			// start SCPms logon
			//sap.hybrid.kapsel.doLogonInit(context, appConfig.appID, sap.hybrid.startApp);
			sap.hybrid.kapsel.doLogonInit(context, appConfig.appID, sap.hybrid.openStore);
		} else {
			console.error("context data for logon are not complete");
		}
	},

	bootStrap: function () {
		if (sap.hybrid.loadCordova) {
			// bind to Cordova event
			document.addEventListener("deviceready", function () {
				// check if app configuration is available
				if (fiori_client_appConfig && fiori_client_appConfig.appID && fiori_client_appConfig.fioriURL) {
					if (window.webkit && window.webkit.messageHandlers) { // iOS WkWebView
						jQuery.sap.require("sap.ui.thirdparty.datajs");
						OData.defaultHttpClient = sap.AuthProxy.generateODataHttpClient2(); // use AuthProxy to send cross domain OData requests
					}
					sap.hybrid.appLogon(fiori_client_appConfig);
				} else {
					console.error("Can't find app configuration probably due to a missing appConfig.js in the app binary.");
				}
			}, false);
		} else {
			console.error("Cordova is not loaded");
		}
	},

	loadComponent: function (componentName) {
		sap.ui.getCore().attachInit(function () {
			// not support sap.ushell navigation
			sap.ui.require([
				"sap/m/Shell",
				"sap/ui/core/ComponentContainer"
			], function (Shell, ComponentContainer) {
				// initialize the UI component
				new Shell({
					app: new ComponentContainer({
						height: "100%",
						name: componentName
					})
				}).placeAt("content");
			});
		});
	},
	//Inicializar OFFLINE
	openStore: function () {
		console.log("In openStore");
		jQuery.sap.require("sap.ui.thirdparty.datajs"); //Required when using SAPUI5 and the Kapsel Offline Store

		var HANAproperties = {
			"name": "store_HANA",
			"host": sap.hybrid.kapsel.appContext.registrationContext.serverHost,
			"port": sap.hybrid.kapsel.appContext.registrationContext.serverPort,
			"https": sap.hybrid.kapsel.appContext.registrationContext.https,
			"serviceRoot": fiori_client_appConfig.appID + "_RMD_SRV_TEST/v2/browse/",

			"definingRequests": {
				"MD": "/MD?$filter=activo eq true",
				"RMD": "/RMD?$expand=mdId/estadoIdRmd,estadoIdRmd,aReceta/recetaId&$filter=activo eq true",
				"MAESTRA": "/MAESTRA?$expand=oMaestraTipo&$filter=activo eq true",
				"MD_RECETA": "/MD_RECETA?$filter=activo eq true",
				"RMD_RECETA": "/RMD_RECETA?$filter=activo eq true",
				"RMD_OBSERVACION": "/RMD_OBSERVACION?$filter=activo eq true",
				"MD_ESTRUCTURA": "/MD_ESTRUCTURA?$filter=activo eq true",
				"RMD_USUARIO":"RMD_USUARIO?$expand=usuarioId&$filter=activo eq true",
				"USUARIO":"/USUARIO?$filter=activo eq true",
				"UsuarioRol":"UsuarioRol?$expand=oRol&$filter=activo eq true",
				"RolAppAcciones":"/RolAppAcciones?$expand=oMaestraAccion&$filter=activo eq true",
				"MD_ES_EQUIPO":"/MD_ES_EQUIPO?$expand=mdId,estructuraId,equipoId($expand=tipoId)&$filter=activo eq true",
				"MD_ES_UTENSILIO":"/MD_ES_UTENSILIO?$expand=mdId,estructuraId,utensilioId($expand=estadoId,tipoId)&$filter=activo eq true",
				"MD_ES_ESPECIFICACION":"/MD_ES_ESPECIFICACION?$filter=activo eq true",
				"MD_ES_PASO":"/MD_ES_PASO?$filter=activo eq true",
				"RMD_ESTRUCTURA":"/RMD_ESTRUCTURA?$expand=rmdId($expand=estadoIdRmd),estructuraId($expand=tipoEstructuraId)&$filter=activo eq true",
				"MD_ES_RE_INSUMO":"/MD_ES_RE_INSUMO?$filter=activo eq true",
				"MD_ES_ETIQUETA":"/MD_ES_ETIQUETA?$filter=activo eq true",
				"MD_ES_PASO_INSUMO_PASO":"/MD_ES_PASO_INSUMO_PASO?$filter=activo eq true",
				"RMD_ES_EQUIPO":"RMD_ES_EQUIPO?$expand=rmdId,rmdEstructuraId,equipoId/tipoId&$filter=activo eq true",
				"RMD_ES_UTENSILIO":"/RMD_ES_UTENSILIO?$expand=rmdId,rmdEstructuraId,utensilioId($expand=estadoId),utensilioId($expand=estadoId),agrupadorId&$filter=activo eq true",
				"RMD_ES_RE_INSUMO":"/RMD_ES_RE_INSUMO?$expand=rmdEstructuraId,rmdRecetaId&$filter=activo eq true",
				"RMD_ES_ESPECIFICACION":"/RMD_ES_ESPECIFICACION?$expand=rmdEstructuraId,rmdId,ensayoPadreId&$filter=activo eq true",
				"RMD_ES_PASO_INSUMO_PASO":"/RMD_ES_PASO_INSUMO_PASO?$expand=rmdId,rmdEstructuraId,etiquetaId,pasoId($expand=tipoDatoId,pasoId($expand=estadoId)),pasoHijoId($expand=tipoDatoId,estadoId),rmdEstructuraRecetaInsumoId&$filter=activo eq true",
				"RMD_ES_PASO":"/RMD_ES_PASO?$expand=rmdId,rmdEstructuraId,tipoDatoId,pasoId($expand=tipoDatoId,estadoId,tipoLapsoId,tipoCondicionId,etiquetaId)&$filter=activo eq true",
				"RMD_ES_ETIQUETA":"/RMD_ES_ETIQUETA?$expand=rmdId,rmdEstructuraId,etiquetaId($expand=estructuraId($expand=tipoEstructuraId))&$filter=activo eq true",
				"RMD_LAPSO":"/RMD_LAPSO?$expand=tipoLapsoId,pasoId,pasoIdFin,equipoId,aListCatalogFalla&$filter=activo eq true",
				"RMD_MOTIVO_EDIT_CIERRE_LAPSO":"/RMD_MOTIVO_EDIT_CIERRE_LAPSO?$filter=activo eq true",
				"RMD_ES_PASO_USUARIO":"/RMD_ES_PASO_USUARIO?$expand=rmdUsuarioId&$filter=activo eq true",
				//"RMD_ES_PASO_HISTORIAL":"/RMD_ES_PASO_HISTORIAL",
				"RMD_VERIFICACION_FIRMAS":"/RMD_VERIFICACION_FIRMAS?$filter=activo eq true",
				"MD_ES_FORMULA_PASO":"/MD_ES_FORMULA_PASO?$filter=activo eq true",
				"RMD_TABLA_CONTROL":"/RMD_TABLA_CONTROL?$filter=activo eq true",
				//"RMD_ES_ESPECIFICACION_HISTORIAL":"/RMD_ES_ESPECIFICACION_HISTORIAL",
				//"MIF_ADMIN_HDI_USUARIO":"/MIF_ADMIN_HDI_USUARIO",
				"MOTIVO_LAPSO":"/MOTIVO_LAPSO?$filter=activo eq true",
				//"RMD_ES_EQUIPO_HISTORIAL":"/RMD_ES_EQUIPO_HISTORIAL",
				//"RMD_ESTRUCTURA_SKIP":"/RMD_ESTRUCTURA_SKIP",
				//"RMD_ES_INSUMO_HISTORIAL":"/RMD_ES_INSUMO_HISTORIAL",
				//"RMD_ES_PASO_INSUMO_PASO_HISTORIAL":"/RMD_ES_PASO_INSUMO_PASO_HISTORIAL",
				"ETIQUETAS_CONTROL":"/ETIQUETAS_CONTROL?$filter=activo eq true",
				//"TABLAS_ARRAY_MD_SKIP":"/TABLAS_ARRAY_MD_SKIP",
				"RMD_ES_HISTORIAL":"/RMD_ES_HISTORIAL?$filter=activo eq true",
				"UTENSILIO":"/UTENSILIO?$expand=estadoId,tipoId&$filter=activo eq true",
				"RMD_LAPSO_CATALOGO_FALLA":"/RMD_LAPSO_CATALOGO_FALLA?$filter=activo eq true"
				//"ABAP_USUARIO": "/ABAP_USUARIO",
				//"ABAP_ORDEN":"/ABAP_ORDEN",
				//"MAESTRA_ADMIN":"/MAESTRA_ADMIN",
			}
		};

		storeHANA = sap.OData.createOfflineStore(HANAproperties);

		var openStoreHANASuccessCallback = function () {
			console.log("In openStoreSuccessCallback");
			sap.OData.applyHttpClient(); //Offline OData calls can now be made against datajs.
			sap.Xhook.disable(); // temporary workaround to ensure the offline app can work in WKWebView

			//Una vez obtenido los datos de RMD HANA, obtengo los filtros para ImpresionSet 
			var uri = sap.hybrid.kapsel.appContext.applicationEndpointURL + "_RMD_SRV_TEST/v2/browse/RMD?$filter=activo eq true and estadoIdRmd_iMaestraId ne 478";  //JSON format is less verbose than atom/xml
			var oHeaders = {};
			var request = {
					headers: oHeaders,
					requestUri: uri,
					method: "GET"
				};

			OData.read(request, function (odata) {
				console.log("RMD");
				console.log(odata);
				var aOrdenes = odata.results;
				var filterOrdenes = "";

				var aOrdenArray = [];

				for (var i = 0; i < aOrdenes.length; i++) {
					aOrdenArray.push(aOrdenes[i].ordenSAP);
				}

				aOrdenArray = aOrdenArray.sort();
				let aResultOrden = aOrdenArray.filter((item,index)=>{
					return aOrdenArray.indexOf(item) === index;
				});

				for (var i = 0; i < aResultOrden.length; i++) {
					filterOrdenes += " Aufnr eq '" + aResultOrden[i] + "'";

					if (i != aResultOrden.length - 1) {
						filterOrdenes += " or";
					}
				}

				var SAP_ImpresionOrd_properties = {
					"name": "store_SAP_Impresion",
					"host": sap.hybrid.kapsel.appContext.registrationContext.serverHost,
					"port": sap.hybrid.kapsel.appContext.registrationContext.serverPort,
					"https": sap.hybrid.kapsel.appContext.registrationContext.https,
					"serviceRoot": fiori_client_appConfig.appID + "_S4H_TEST/sap/opu/odata/sap/Z_PP_IMPRESIONORD_SRV/",
		
					"definingRequests": {
						"OrdenSet": "/OrdenSet?$filter="+filterOrdenes
					}
				};

				storeSAPImpresion = sap.OData.createOfflineStore(SAP_ImpresionOrd_properties);
				
				sap.ui.core.BusyIndicator.show(0);
				storeSAPImpresion.open( function (res){
					sap.ui.core.BusyIndicator.hide();
					console.log("In openStoreSuccessCallback Z_PP_IMPRESION_SRV");
					sap.OData.applyHttpClient(); //Offline OData calls can now be made against datajs.
					sap.Xhook.disable(); // temporary workaround to ensure the offline app can work in WKWebView
					sap.hybrid.startApp();
				}, openStoreErrorCallback);

				//Cargar tienda fuera de linea de SAP NECESIDADES RMD

				var SAP_NecesidadesRMD_properties = {
					"name": "store_SAP_Necesidades",
					"host": sap.hybrid.kapsel.appContext.registrationContext.serverHost,
					"port": sap.hybrid.kapsel.appContext.registrationContext.serverPort,
					"https": sap.hybrid.kapsel.appContext.registrationContext.https,
					"serviceRoot": fiori_client_appConfig.appID + "_S4H_TEST/sap/opu/odata/sap/Z_PP_NECESIDADESRMD_SRV/",
		
					"definingRequests": {
						"OrdenSet": "/OrdenSet?$filter=("+filterOrdenes+") and Charg eq ''",
						"CalibracionSet": "/CalibracionSet",
						//"HUSet": "/HUSet?$filter=Vpobjkey eq ''",
						"HuOfflSet": "/HuOfflSet?$filter=Vpobjkey eq ''",
						"MotivosNotSet": "/MotivosNotSet?$filter=Werks eq ''",
						"EANSet": "/EANSet?$filter=Matnr eq '' and Eantp eq ''",
						"NotificacionSet": "/NotificacionSet",
						"NotificacionMensajeSet": "/NotificacionMensajeSet",
						"FechaProdSet":"/FechaProdSet",
						"ActividadOfflineSet":"/ActividadOfflineSet",
						"NotificacionOfflineSet": "/NotificacionOfflineSet",
						"FaseNotSet": "/FaseNotSet?$filter=Aufnr eq '' and Arbpl eq '' and Ktsch eq ''",
						"EquipoCalSet": "/EquipoCalSet?$filter=(Werks eq '1020' or Werks eq '1021') and Aufnr eq '' and Equnr eq ''",
						"CatalogoSet":"/CatalogoSet",
						"AvisoOfflSet":"/AvisoOfflSet"
						//"AvisoSet":"/AvisoSet",
						//"AvisoMensajeSet":"/AvisoMensajeSet",
						//Por el momento este filtro trae todos los registros pero se tendra que configurar ....
					}
				};
				storeSAPNecesidadesRMD = sap.OData.createOfflineStore(SAP_NecesidadesRMD_properties);

				var openStoreNecesidadesRMDSuccessCallback = function () {
					console.log("In openStoreSuccessCallback");
					sap.OData.applyHttpClient(); //Offline OData calls can now be made against datajs.
					sap.Xhook.disable(); // temporary workaround to ensure the offline app can work in WKWebView
				}
				var openStoreErrorCallback = function (error) {
					console.log("In openStoreErrorCallback");
					console.log(error);
					alert("An error occurred" + JSON.stringify(error));
				}

				storeSAPNecesidadesRMD.open(openStoreNecesidadesRMDSuccessCallback, openStoreErrorCallback);

				
			}, function (error) {
				console.log("odataError OrdenSet");
			});

			var uriProduccion = sap.hybrid.kapsel.appContext.applicationEndpointURL + "_RMD_SRV_TEST/v2/browse/MAESTRA?$filter=oMaestraTipo_maestraTipoId eq 18";  //JSON format is less verbose than atom/xml
			var oHeadersProduccion = {};
			var requestProduccion = {
				headers: oHeadersProduccion,
				requestUri: uriProduccion,
				method: "GET"
			};

			OData.read(requestProduccion, function (odataMaestra) {
					console.log("RMD");
					console.log(odataMaestra);
					var aPlantas = odataMaestra.results;
					var filterPlantas = "";
					
	
					for (var i = 0; i < aPlantas.length; i++) {
						filterPlantas += " Werks eq '" + aPlantas[i].codigoSap + "'";
	
						if (i != aPlantas.length - 1) {
							filterPlantas += " or";
						}
					}
	
					var SAP_Produccion_properties = {
						"name": "store_SAP_Produccion",
						"host": sap.hybrid.kapsel.appContext.registrationContext.serverHost,
						"port": sap.hybrid.kapsel.appContext.registrationContext.serverPort,
						"https": sap.hybrid.kapsel.appContext.registrationContext.https,
						"serviceRoot": fiori_client_appConfig.appID + "_S4H_TEST/sap/opu/odata/sap/Z_PP_PRODUCCION_SRV/",
			
						"definingRequests": {
							"ProduccionSet": "/ProduccionSet?$filter="+filterPlantas
						}
					};
	
					storeSAPProduccion = sap.OData.createOfflineStore(SAP_Produccion_properties);
					sap.ui.core.BusyIndicator.show(0);
					storeSAPProduccion.open(function (res){
						sap.ui.core.BusyIndicator.hide();
						console.log("In openStoreSuccessCallback");
						sap.OData.applyHttpClient(); //Offline OData calls can now be made against datajs.
						sap.Xhook.disable(); // temporary workaround to ensure the offline app can work in WKWebView
					} , openStoreErrorCallback);
					
				}, function (error) {
					console.log("odataError ProduccionSet");
				});
			//sap.hybrid.startApp();
		}

		var openStoreSAPImpresionSuccessCallback = function () {
			console.log("In openStoreSuccessCallback");
			sap.OData.applyHttpClient(); //Offline OData calls can now be made against datajs.
			sap.Xhook.disable(); // temporary workaround to ensure the offline app can work in WKWebView
			sap.hybrid.startApp();
		}
		var openStoreSAPProduccionSuccessCallback= function(){
			console.log("In openStoreSuccessCallback");
			sap.OData.applyHttpClient(); //Offline OData calls can now be made against datajs.
			sap.Xhook.disable(); // temporary workaround to ensure the offline app can work in WKWebView
		}

		var openStoreErrorCallback = function (error) {
			console.log("In openStoreErrorCallback");
			console.log(error);
			alert("An error occurred" + JSON.stringify(error));
		}

		storeHANA.open(openStoreHANASuccessCallback, openStoreErrorCallback);
	},

	//USAR POST DELETE ,ACTUALIZAR 
	refreshStore: function () {
		return new Promise(function (resolve, reject) {
			if (!storeSAPNecesidadesRMD) {
				console.log("The store must be open before it can be refreshed");
				return
			}
			sap.ui.core.BusyIndicator.show(0);
			//storeSAPNecesidadesRMD.refresh(sap.hybrid.refreshStoreCallback, sap.hybrid.errorCallback, null, sap.hybrid.progressCallback);
			//storeHANA.refresh(sap.hybrid.refreshStoreCallback, sap.hybrid.errorCallback, null, sap.hybrid.progressCallback);
			storeSAPImpresion.refresh(sap.hybrid.refreshStoreCallback, sap.hybrid.errorCallback, null, sap.hybrid.progressCallback);
			storeSAPProduccion.refresh(sap.hybrid.refreshStoreCallback, sap.hybrid.errorCallback, null, sap.hybrid.progressCallback);
			
			storeSAPNecesidadesRMD.refresh(function () {
				console.log("Offline events: SAP refreshStoreCallback");
				
				storeHANA.refresh(function (res){
					console.log("Offline events: HANA refreshStoreCallback");
					resolve(true);
					sap.ui.core.BusyIndicator.hide();
				}, function (err){
					console.log("Offline refresh events: HANA errorCallback");
					console.log("An error occurred: " + JSON.stringify(error));
					reject(false);
					sap.ui.core.BusyIndicator.hide();
				}, null, sap.hybrid.progressCallback);
				
			}, function (error) {
				console.log("Offline refresh events: SAP  errorCallback");
				console.log("An error occurred: " + JSON.stringify(error));
				reject(false);
				sap.ui.core.BusyIndicator.hide();
			}, null, sap.hybrid.progressCallback);	
		});
	},

	refreshStoreCallback: function () {
		console.log("Offline events: refreshStoreCallback");
	},

	flushStore: function () {
		console.log("Offline events: flushStore");
		if (!storeSAPNecesidadesRMD) {
			console.log("The store of Necesidades RMD must be open before it can be flushed");
			return;
		}
		if (!storeHANA) {
			console.log("The store of HANA must be open before it can be flushed");
			return;
		}
		if (!storeSAPImpresion) {
			console.log("The store of Impresion SAP must be open before it can be flushed");
			return;
		}
		if (!storeSAPProduccion) {
			console.log("The store of Produccion SAP must be open before it can be flushed");
			return;
		}
		return new Promise(function (resolve, reject){
		
			//sap.ui.core.BusyIndicator.show();
			//storeSAPNecesidadesRMD.flush(sap.hybrid.flushStoreCallback, sap.hybrid.errorCallback, null, sap.hybrid.progressCallback);
			//storeHANA.flush(sap.hybrid.flushStoreCallback, sap.hybrid.errorCallback, null, sap.hybrid.progressCallback);
			storeSAPImpresion.flush(sap.hybrid.flushStoreCallback, sap.hybrid.errorCallback, null, sap.hybrid.progressCallback);
			storeSAPProduccion.flush(sap.hybrid.flushStoreCallback, sap.hybrid.errorCallback, null, sap.hybrid.progressCallback);

			storeSAPNecesidadesRMD.flush(function () {
				console.log("Offline events: SAP flushStoreCallback");
				
				storeHANA.flush(function (res){
					console.log("Offline events: HANA flushStoreCallback");
					resolve(true);
					//sap.ui.core.BusyIndicator.hide();
				}, function (err){
					console.log("Offline events: HANA flushStoreCallback");
					reject(false);
					//sap.ui.core.BusyIndicator.hide();	
				}, null, sap.hybrid.progressCallback);

			}, function (error) {
				console.log("Offline events: SAP flushStoreCallback");
				reject(false);
				//sap.ui.core.BusyIndicator.hide();

			}, null, sap.hybrid.progressCallback);
		});
	},

	flushStoreCallback: function () {
		//sap.ui.core.BusyIndicator.hide();
		console.log("Offline events: flushStoreCallback");
	},

	errorCallback: function (error) {
		sap.ui.core.BusyIndicator.hide();
		console.log("Offline events: errorCallback");
		alert("An error occurred: " + JSON.stringify(error));
	},

	progressCallback: function (progressStatus) {
		// console.log("Offline events: progressCallback");
		var status = progressStatus.progressState;
		var lead = "unknown";
		if (status === sap.OfflineStore.ProgressState.STORE_DOWNLOADING) {
			lead = "Downloading ";
		} else if (status === sap.OfflineStore.ProgressState.REFRESH) {
			lead = "Refreshing ";
		} else if (status === sap.OfflineStore.ProgressState.FLUSH_REQUEST_QUEUE) {
			lead = "Flushing ";
		} else if (status === sap.OfflineStore.ProgressState.DONE) {
			lead = "Complete ";
		} else {
			alert("Unknown status in progressCallback");
		}
		console.log(lead + "Sent: " + progressStatus.bytesSent + "  Received: " + progressStatus.bytesRecv + "   File Size: " +
			progressStatus.fileSize);
	},
};