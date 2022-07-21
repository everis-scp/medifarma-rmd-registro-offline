sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "mif/rmd/registro/services/registro",
    "sap/ui/core/BusyIndicator",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "mif/rmd/registro/utils/util",
    '../controller/table',
    "sap/ui/model/json/JSONModel",
    'mif/rmd/registro/services/external/sharepoint',
    "sap/m/Dialog",
	"sap/m/Button",
    "sap/m/MessageToast",
	"sap/m/TextArea",
    "sap/m/library",
    "sap/m/Label",
    "mif/rmd/registro/utils/formatter"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageBox, registroService, BusyIndicator, Filter, FilterOperator, util, tablePdf, JSONModel,sharepointService,Dialog,Button,MessageToast,TextArea,mobilelibrary,Label,formatter) {
        "use strict";
        JsBarcode:true;
        const rootPath = "mif.rmd.registro";
        let oThat;
        let sCodAgua = "codAgua01";
        const oAplicacionRMDId = '7ebffa02-4fe1-4160-8a80-f252547d2ca4';
        const oNivelReproceso = "68";
        const idEstadoHabilitado = 474;
        const stipoDatoFormula = 445;
        const stipoDatoCantidad = 434;
        const stipoDatoDatoFijo = 449;
        const stipoDatoNumeros = 438;
        const stipoDatoNotificacion = 447;
        const sIdTipoEstructuraProceso = 487;
        const sIdInicioCondicion = 481;
        const sIdFinCondicion = 482;
        const sTipoEstructuraEspecificaciones = 486;
        const sEstadoAutorizado = 465;
        const idRolAuxiliar = '2be255d3-f5bf-4b0d-988c-6253de8fd578';
        let oInfoUsuario;
        let bInterneInit = true;
        let bflushCargando = false;
        let bRefreshCargando = false;
        return Controller.extend("mif.rmd.registro.controller.MainView", {
            formatter:formatter,
            onInit: function () {
                oThat = this;
                Array.prototype.groupBy = function (prop) {
                    return this.reduce(function (groups, item) {
                        const val = item[prop]
                        groups[val] = groups[val] || []
                        groups[val].push(item)
                        return groups
                    }, {})
                }
                //OFFLINE
                let identificadorTiempoEspera
                function temporizadorIntervalo(){
                    identificadorTiempoEspera = setInterval(preguntarOffline,3000)
                }
                function preguntarOffline(){
                    let oTypeLine = {}; 
                    if (navigator.onLine) {
                        fetch('https://postman-echo.com/get?foo1=bar1&foo2=bar2').then(function(response) {

                            if(!response.ok) {
                                // Parece que hay acceso a Internet,
                                // pero la respuesta no ha sido ok
                                // También se puede comprobar el código de estado con response.status
                                // Y hacer algo específico según el estado exacto recibido
                            throw Error(response.statusText);
                        }
                        return response;
                     }).then(function(response) {
                        // response.ok fue true
                        //console.log('ok');
                        oTypeLine.type = "ONLINE";
                        oTypeLine.color = "#008000";
                        bInterneInit = true;
                        oThat.getView().setModel(new JSONModel(oTypeLine),"oModelOffline");

                    }).catch(function(error) {
                        //console.log('Problema al realizar la solicitud: ' + error.message);
                        oTypeLine.type = "OFFLINE";
                        oTypeLine.color = "#808080";
                        bInterneInit = false;
                        oThat.getView().setModel(new JSONModel(oTypeLine),"oModelOffline");
                    });
                        //oThat.onFlushButton(); 
                    } else {
                        oTypeLine.type = "OFFLINE";
                        oTypeLine.color = "#808080";
                        bInterneInit = false;
                        oThat.getView().setModel(new JSONModel(oTypeLine),"oModelOffline");
                    }
                }

                temporizadorIntervalo();

                // //FLUSH TEMPORIZADOR
                // let identificadorTiempoEsperaFlush;
                // function temporizadorIntervaloFlush(){
                //     identificadorTiempoEsperaFlush = setInterval(cargarFlush,5000)
                // }
                // function cargarFlush (){
                //     if(bInterneInit){
                //         oThat.onFlushButton();
                //     }else{
                //         //console.log("Flush no se esta cargando (Sin internet )");
                //     }
                // }

                // temporizadorIntervaloFlush();

                // ///REFRESH TEMPORIZADOR
                // let identificadorTiempoEsperaRefresh;
                // function temporizadorIntervaloRefresh(){
                //     identificadorTiempoEsperaRefresh = setInterval(cargarRefresh,10000)
                // }
                // function cargarRefresh (){
                //     if(bInterneInit){
                //         oThat.onRefreshAutomatico();
                //     }else{
                //         //console.log("Refresh no se esta cargando (Sin internet )");
                //     }
                // }

                // temporizadorIntervaloRefresh();

                //FLUSH AND REFRESH
                let identificadorTiempoEsperaFlushRefresh;
                function temporizadorIntervaloFlushRefresh(){
                    identificadorTiempoEsperaFlushRefresh = setInterval(cargarFlushRefresh,10000)
                }
                function cargarFlushRefresh (){
                    if(bInterneInit){
                        oThat.onFlushAndRefreshAutomatico();
                    }else{
                        //console.log("Refresh no se esta cargando (Sin internet )");
                    }
                }

                temporizadorIntervaloFlushRefresh();

            },

            onAfterRendering: async function () {
                this.modelGeneral = this.getView().getModel("modelGeneral");
                this.mainModelv2 = this.getView().getModel("mainModelv2");
                this.modelEstructura = this.getView().getModel("modelEstructura");
                this.modelNecesidad = this.getView().getModel("NECESIDADESRMD_SRV");
                this.modelCentralPesadas = this.getView().getModel("CENTRALPESADAS_SRV");
                this.modelImpresion = this.getView().getModel("IMPRESIONORD_SRV");
                this.modelProduccion = this.getView().getModel("PRODUCCION_SRV");
                this.i18n = this.getView().getModel("i18n").getResourceBundle();
                this.modelNecesidadOnline = this.getView().getModel("NECESIDADESRMD_SRV_ONL");
                this.modelImpresionOnline = this.getView().getModel("IMPRESIONORD_SRV_ONL");
                this.modelProduccionOnline = this.getView().getModel("PRODUCCION_SRV_ONL");
                this.mainModelv2Online = this.getView().getModel("mainModelv2_onl");

                var oUser;
                await sap.Settings.getConfigPropertyMap(
                    function(oResult){
                    console.log(oResult);
                    oUser = oResult; 
                },function(oError){
                    console.log(oError)
                });
                // OFFLINE
                if (oUser) {
                    //var user = new sap.ushell.Container.getService("UserInfo").getUser();
                    //var emailUser = user.getEmail();
                    
                    var emailUser = oUser.UserName;
                    if(emailUser === "jdiapine@everis.com"){
                        emailUser = "cmacalupu@medifarma.com.pe";
                    }
                    this.onGetUserData(emailUser);
                } else {
                    this.valideUserEmail();
                    // var emailUser = "gianfranco.romano.paoli.rosas@everis.nttdata.com";
                    //var emailUser = "cmacalupu@medifarma.com.pe";**
                    // var emailUser = "marineduardo.floressilvestre.sa@everis.nttdata.com";
                    // var emailUser = "jperezj@medifarma.com.pe";
                    // var emailUser = "jcornejo@medifarma.com.pe";
                    // var emailUser = "roci0906@hotmail.com";
                    // var emailUser = "pricaldi@medifarma.com.pe";
                }
            },

            onGetUserData:async function(emailUser){
                var UserFilter = [];
                UserFilter.push(new Filter("correo", 'EQ', emailUser));
                
                let oUsuario;
                if(bInterneInit === true){
                    oUsuario = await registroService.getDataFilter(this.mainModelv2Online, "/USUARIO", UserFilter);
                }else{//OFFLINE MODEL
                    oUsuario = await registroService.getDataFilter(this.mainModelv2, "/USUARIO", UserFilter);
                }
                

                if (oUsuario.results.length > 0) {
                    var oFilter = [];
                    oFilter.push(new Filter("oUsuario_usuarioId", 'EQ', oUsuario.results[0].usuarioId));
                    
                    let sExpand,oUser;
                    if(bInterneInit === true){
                        sExpand = "oRol($select=rolId,codigo,nombre,descripcion)";
                        oUser = await registroService.getDataExpand(this.mainModelv2Online, "/UsuarioRol", sExpand, oFilter);
                    }else{//OFFLINE MODEL
                        //let sExpand = "oRol($select=rolId,codigo,nombre,descripcion)";
                        //OFFLINE: por alguna razon no admite el SELECT :/
                        sExpand = "oRol";
                        oUser = await registroService.getDataExpand(this.mainModelv2, "/UsuarioRol", sExpand, oFilter);
                    }

                    if (oUser.results.length > 0) {
                        oInfoUsuario = {
                            data: oUsuario.results[0],
                            rol: [],
                            funcionUsuario: {
                                habilitarRMD: false,
                                registroCC: false,
                                registroCP: false,
                                registroP: false,
                                registroVB: false,
                                cierreRMD: false,
                                agregarEquipo: false,
                                reaperturaRMD: false,
                                registroLector: false,
                                asignarUsuarioRMD: false,
                                verificarInsumoFab: false,
                                verificarInsumoAcEnv: false,
                                aplicaNoAplica: false,
                                crearFraccion: false,
                                crarParcial: false,
                                crearLapso: false,
                                crearReproceso: false,
                                generarEtiquetaHU: false,
                                imprimirEtiqueta: false,
                                generarNotificacionesRMD: false,
                                observacionPaso: false,
                                observacionHistorialPaso: false,
                                registroMuestreo: false
                            }
                        }

                        var aFilterAcc = [];
                        oUser.results.forEach(function (e) {
                            var oColorStatus = {
                                "color": "",
                                "colorHex": "",
                                "colorRgb": ""
                            };

                            if (e.codigo == "rmd_registrador") {
                                oColorStatus.color = "Negro";
                                oColorStatus.colorHex = "000000";
                                oColorStatus.colorRgb = "0, 0, 0";
                            } else if (e.codigo == "rmd_jefe_prod") {
                                oColorStatus.color = "Azul";
                                oColorStatus.colorHex = "#0000ff";
                                oColorStatus.colorRgb = "0, 0, 255";
                            } else if (e.codigo == "rmd_gerente_prod") {
                                oColorStatus.color = "Negro";
                                oColorStatus.colorHex = "000000";
                                oColorStatus.colorRgb = "0, 0, 0";
                            } else if (e.codigo == "rmd_jefe_dt") {
                                oColorStatus.color = "Negro";
                                oColorStatus.colorHex = "000000";
                                oColorStatus.colorRgb = "0, 0, 0";
                            } else if (e.codigo == "RMD_AUXILIAR") {
                                oColorStatus.color = "Turquesa";
                                oColorStatus.colorHex = "#5dc1b9";
                                oColorStatus.colorRgb = "93, 193, 185";
                            } else if (e.codigo == "RMD_SUPERVISOR") {
                                oColorStatus.color = "Morado";
                                oColorStatus.colorHex = "#8c004b";
                                oColorStatus.colorRgb = "140, 0, 75";
                            } else if (e.codigo == "RMD_CONTROL_CALIDAD") {
                                oColorStatus.color = "Rojo";
                                oColorStatus.colorHex = "#FF0000";
                                oColorStatus.colorRgb = "255, 0, 0";
                            } else if (e.codigo == "RMD_CONTROL_PROCESO") {
                                oColorStatus.color = "Negro";
                                oColorStatus.colorHex = "#000000";
                                oColorStatus.colorRgb = "0, 0, 0";
                            } else {
                                oColorStatus.color = "Negro";
                                oColorStatus.colorHex = "000000";
                                oColorStatus.colorRgb = "0, 0, 0";
                            }

                            e.oRol.oColorStatus = oColorStatus;
                            oInfoUsuario.rol.push(e.oRol);
                            aFilterAcc.push(new Filter("oRol_rolId", 'EQ', e.oRol.rolId));
                        });
                        var mExpand = "oMaestraAccion";
                        aFilterAcc.push(new Filter("oAplicacion_aplicacionId", 'EQ', oAplicacionRMDId));
                        
                        var infoAccionUsuario;
                        
                        if(bInterneInit === true){
                            infoAccionUsuario = await registroService.getDataExpand(this.mainModelv2Online, "/RolAppAcciones", mExpand, aFilterAcc);
                        }else{//OFFLINE MODEL
                            infoAccionUsuario = await registroService.getDataExpand(this.mainModelv2, "/RolAppAcciones", mExpand, aFilterAcc);
                        }                      

                        infoAccionUsuario.results.forEach(function (e) {
                            if (e.oMaestraAccion.codigo === "ACCSTATE") {
                                oInfoUsuario.funcionUsuario.habilitarRMD = true;
                            }
                            if (e.oMaestraAccion.codigo === "ACCREGISTERCC") {
                                oInfoUsuario.funcionUsuario.registroCC = true;
                            }
                            if (e.oMaestraAccion.codigo === "ACCREGISTERCP") {
                                oInfoUsuario.funcionUsuario.registroCP = true;
                            }
                            if (e.oMaestraAccion.codigo === "ACCREGISTER") {
                                oInfoUsuario.funcionUsuario.registroP = true;
                            }
                            if (e.oMaestraAccion.codigo === "ACCREGISTERVB") {
                                oInfoUsuario.funcionUsuario.registroVB = true;
                            }
                            if (e.oMaestraAccion.codigo === "ACCCIERRERMD") {
                                oInfoUsuario.funcionUsuario.cierreRMD = true;
                            }
                            if(e.oMaestraAccion.codigo === "ACCADDEQ") {
                                oInfoUsuario.funcionUsuario.agregarEquipo = true;
                            }
                            if(e.oMaestraAccion.codigo === "ACCOPENING") {
                                oInfoUsuario.funcionUsuario.reaperturaRMD = true;
                            }
                            if (e.oMaestraAccion.codigo === "ACCLECTOR") {
                                oInfoUsuario.funcionUsuario.registroLector = true;
                            }
                            if (e.oMaestraAccion.codigo === "ACCASIGNUSER") {
                                oInfoUsuario.funcionUsuario.asignarUsuarioRMD = true;
                            }
                            if (e.oMaestraAccion.codigo === "ACCVERIFYINSF") {
                                oInfoUsuario.funcionUsuario.verificarInsumoFab = true;
                            }
                            if (e.oMaestraAccion.codigo === "ACCVERIFYINSAE") {
                                oInfoUsuario.funcionUsuario.verificarInsumoAcEnv = true;
                            }
                            if (e.oMaestraAccion.codigo === "ACCAPPLY") {
                                oInfoUsuario.funcionUsuario.aplicaNoAplica = true;
                            }
                            if (e.oMaestraAccion.codigo === "ACCFRACTION") {
                                oInfoUsuario.funcionUsuario.crearFraccion = true;
                            }
                            if (e.oMaestraAccion.codigo === "ACCPARCIAL") {
                                oInfoUsuario.funcionUsuario.crarParcial = true;
                            }
                            if (e.oMaestraAccion.codigo === "ACCLAPSOS") {
                                oInfoUsuario.funcionUsuario.crearLapso = true;
                            }
                            if (e.oMaestraAccion.codigo === "ACCREPROCESS") {
                                oInfoUsuario.funcionUsuario.crearReproceso = true;
                            }
                            if (e.oMaestraAccion.codigo === "ACCTICKET") {
                                oInfoUsuario.funcionUsuario.generarEtiquetaHU = true;
                            }
                            if (e.oMaestraAccion.codigo === "ACCPRINT") {
                                oInfoUsuario.funcionUsuario.imprimirEtiqueta = true;
                            }
                            if (e.oMaestraAccion.codigo === "ACCNOTIFICATION") {
                                oInfoUsuario.funcionUsuario.generarNotificacionesRMD = true;
                            }
                            if (e.oMaestraAccion.codigo === "ACCOBSPASO") {
                                oInfoUsuario.funcionUsuario.observacionPaso = true;
                            }
                            if (e.oMaestraAccion.codigo === "ACCHISTORIAL") {
                                oInfoUsuario.funcionUsuario.observacionHistorialPaso = true;
                            }
                            if (e.oMaestraAccion.codigo === "ACCMUESTREO") {
                                oInfoUsuario.funcionUsuario.registroMuestreo = true;
                            }
                        });

                        this.modelGeneral.setProperty("/oInfoUsuario", oInfoUsuario);
                    } else {
                        MessageBox.error("El usuario no tiene un rol asignado.", {
                            styleClass: "sapUiSizeCompact",
                            actions: [MessageBox.Action.OK],
                            onClose: async function (oAction) {
                                if (oAction === "OK") {
                                    window.history.back();
                                }
                            }
                        });
                    }
                }
                //OFFLINE CAMBIO
                var oOrdenesOfline;
                var oFilterOrdnOffline = [];
                oFilterOrdnOffline.push(new Filter("correoUsuario", 'EQ', emailUser));

                if(bInterneInit ===true){
                    oOrdenesOfline = await registroService.getDataFilter(this.mainModelv2Online, "/ORDEN_OFFLINE", oFilterOrdnOffline);
                }else{//OFFLINE MODEL
                    oOrdenesOfline = await registroService.getDataFilter(this.mainModelv2, "/ORDEN_OFFLINE", oFilterOrdnOffline);
                } 
                this.getView().setModel(new JSONModel(oOrdenesOfline.results),"modelOrdenOffline");
            },

            onSearchLote: function () {
                oThat.onOrdenesABAP();
            },

            onOrdenesABAP: async function () {
                if(bInterneInit === true){

                    var v_lote = oThat.modelGeneral.getProperty("/loteFilter");

                    if (v_lote === "") {
                        MessageBox.warning(oThat.i18n.getText("loteObligatorio"));
                        return;
                    }
                    v_lote = v_lote.toUpperCase();

                    var oFilter = [];
                    BusyIndicator.show();
                    oFilter.push(new Filter("Charg", FilterOperator.EQ, v_lote));
                    oFilter.push(new Filter("Aufnr", FilterOperator.EQ, ""));

                    await registroService.getDataFilter(oThat.modelNecesidadOnline,"/OrdenSet",oFilter).then(function (oListOrden){
                        oListOrden.results.forEach(element => {
                            if (element.Vfdat !== null) {
                                //let fechaExpira = element.Vfdat.split("(")[1].split(")")[0];
                                //element.VfdatBTP = new Date(Number(fechaExpira));

                                let fechaExpira = element.Vfdat;
                                element.VfdatBTP = fechaExpira;
                            }
                        });
                        oThat.modelGeneral.setProperty("/ordenesAbap", oListOrden.results);
                        sap.ui.core.BusyIndicator.hide();
                    }).catch(function(oError){
                        console.log(oError);
                        sap.ui.core.BusyIndicator.hide();
                    });

                }else{ //OFFLINE MODEL
                    var v_lote = oThat.modelGeneral.getProperty("/loteFilter");

                    if (v_lote === "") {
                        MessageBox.warning(oThat.i18n.getText("loteObligatorio"));
                        return;
                    }
                    v_lote = v_lote.toUpperCase();

                    var oFilter = [];
                    BusyIndicator.show();
                    oFilter.push(new Filter("Charg", FilterOperator.EQ, v_lote));
                    //OFFLINE - 
                    //oFilter.push(new Filter("Aufnr", FilterOperator.EQ, ""));

                await registroService.getDataFilter(oThat.modelNecesidad,"/OrdenSet",oFilter).then(function (oListOrden){
                    oListOrden.results.forEach(element => {
                        if (element.Vfdat !== null) {
                            //let fechaExpira = element.Vfdat.split("(")[1].split(")")[0];
                            //element.VfdatBTP = new Date(Number(fechaExpira));

                            let fechaExpira = element.Vfdat;
                            element.VfdatBTP = fechaExpira;
                        }
                    });
                    oThat.modelGeneral.setProperty("/ordenesAbap", oListOrden.results);
                    sap.ui.core.BusyIndicator.hide();
                }).catch(function(oError){
                    console.log(oError);
                    sap.ui.core.BusyIndicator.hide();
                });

                }
            },

            onMdList: async function (LineaActual) {
                let sExpand = "estadoIdRmd,mdId/estadoIdRmd";
                let sExpandNivel = "estadoIdRmd,nivelId,sucursalId,aReceta/recetaId";
                var oFilterMd = [],
                    oFilterRmd = [];
                oFilterMd.push(new Filter("estadoIdRmd_iMaestraId", FilterOperator.EQ, sEstadoAutorizado));
                oFilterRmd.push(new Filter("productoId", FilterOperator.EQ, LineaActual.Matnr));
                oFilterRmd.push(new Filter("ordenSAP", FilterOperator.EQ, LineaActual.Aufnr));
                
                //Pregunta si hay internet, sino usa la bd local
                let aListMD,aListRMD;
                if(bInterneInit === true){
                    aListMD = await registroService.getDataExpand(oThat.mainModelv2Online, "/MD", sExpandNivel, oFilterMd);
                    aListRMD = await registroService.getDataExpand(oThat.mainModelv2Online, "/RMD", sExpand, oFilterRmd);
                }else{// OFFLINE MODEL
                    aListMD = await registroService.getDataExpand(oThat.mainModelv2, "/MD", sExpandNivel, oFilterMd);
                    aListRMD = await registroService.getDataExpand(oThat.mainModelv2, "/RMD", sExpand, oFilterRmd);
                }
             
                oThat.modelGeneral.setProperty("/LineaActualRMDdata", aListRMD);
                let aListMDFinal = [];
                let aListMDTable = [];
                if(aListRMD.results.length > 0){
                    //NUEVO MARIN
                    // aListRMD.results.forEach(function(oRMD){
                    //     oRMD.Matnr = LineaActual.Matnr;
                    //     oRMD.rm = "A";  
                    //     oRMD.rmdId = oRMD.rmdId;
                    //     oRMD.estadoIdRmd = oRMD.estadoIdRmd_iMaestraId;
                    //     if (oRMD.estadoIdRmd_iMaestraId != null) {
                    //         oRMD.stateRMD = oRMD.estadoIdRmd.contenido;
                    //     }
                    //     aListMDTable.push(oRMD);
                    // });
                    //FIN NUEVO MARIN
                    let aFilter= [];
                    aFilter.push(new Filter("mdId", "EQ", aListRMD.results[0].mdId_mdId));
                    let aMdResponse;
                    if(bInterneInit === true){
                        aMdResponse = await registroService.onGetDataGeneralFiltersExpand(oThat.mainModelv2Online, "MD", aFilter, sExpandNivel);
                    }else{//OFFLINE MODEL
                        aMdResponse = await registroService.onGetDataGeneralFiltersExpand(oThat.mainModelv2, "MD", aFilter, sExpandNivel);
                    }
                    aMdResponse.results.forEach(function(oMd){
                        oMd.Matnr = LineaActual.Matnr;
                        oMd.rm = oMd.estadoIdRmd.codigo !== "A" ? "A" : oMd.estadoIdRmd.codigo;
                        oMd.rmdId = "";
                        oMd.estadoIdRmd = "";
                        oMd.stateRMD = "";
                        let aListRMDTable = aListRMD.results;
                        aListRMDTable.forEach(function(oRMD){
                            oMd.rmdId = oRMD.rmdId;
                            oMd.estadoIdRmd = oRMD.estadoIdRmd_iMaestraId;
                            if (oRMD.estadoIdRmd_iMaestraId != null) {
                                oMd.stateRMD = oRMD.estadoIdRmd.contenido;
                            }
                            aListMDTable.push(oMd);
                        });
                    });
                } else {
                    aListMD.results.forEach(function (oMd) {
                        oMd.aReceta.results.forEach(function (oReceta) {
                            if (oReceta.recetaId.Matnr === LineaActual.Matnr && oReceta.recetaId.Verid === LineaActual.Verid) {
                                aListMDFinal.push(oMd);
                            }
                        });
                    });
                    aListMDFinal.forEach(function(oMd){
                        oMd.Matnr = LineaActual.Matnr;
                        oMd.rm = oMd.estadoIdRmd.codigo !== "A" ? "A" : oMd.estadoIdRmd.codigo;
                        oMd.rmdId = "";
                        oMd.estadoIdRmd = "";
                        oMd.stateRMD = "";
                        let aListRMDTable = aListRMD.results.filter(itm=>itm.mdId_mdId === oMd.mdId);
                        if(aListRMDTable.length === 0) {
                            aListMDTable.push(oMd);
                        } else {
                            aListRMDTable.forEach(function(oRMD){
                                oMd.rmdId = oRMD.rmdId;
                                oMd.estadoIdRmd = oRMD.estadoIdRmd_iMaestraId;
                                if (oRMD.estadoIdRmd_iMaestraId != null) {
                                    oMd.stateRMD = oRMD.estadoIdRmd.contenido;
                                }
                                aListMDTable.push(oMd);
                            });
                        }
                    });
                }
                oThat.modelGeneral.setProperty("/Mds", aListMDTable);
                oThat.modelGeneral.setProperty("/LineaActualRMD", LineaActual);
            },

            onDetailRmd: function (oEvent) {
                var LineaActual = oEvent.getParameter("listItem").getBindingContext("modelGeneral").getObject();

                this.onMdList(LineaActual);
                if(bInterneInit === true){
                    return new Promise(function (resolve, reject) {
                        sap.ui.core.BusyIndicator.show(0);
                        let aFilter = [];
                        aFilter.push(new Filter("Aufnr", FilterOperator.EQ, LineaActual.Aufnr));
                        registroService.getDataFilter(oThat.modelImpresionOnline,"/OrdenSet",aFilter).then(function (oListOrden) {
                            LineaActual.Pdf64 = "";
                            oListOrden.results.forEach(function (values) {
                                if (LineaActual.Aufnr == values.Aufnr) {
                                    LineaActual.Pdf64 = values.Pdf64;
                                }
                            });
    
                            sap.ui.core.BusyIndicator.hide();
                            if (!oThat.onMds) {
                                oThat.onMds = sap.ui.xmlfragment(
                                    "frgMds",
                                    rootPath + ".view.dialog.Mds",
                                    oThat
                                );
                                oThat.getView().addDependent(oThat.onMds);
                            }
                            oThat.onMds.open();
    
                        }).catch(function (oError) {
                            console.log(oError);
                            sap.ui.core.BusyIndicator.hide();
                        })
    
    
                    });   
                }else{ //OFFLINE MODEL
                    return new Promise(function (resolve, reject) {
                        sap.ui.core.BusyIndicator.show(0);
    
                        //OFFLINE se deben utilizar modelos para el offline
                        let aFilter = [];
                        aFilter.push(new Filter("Aufnr", FilterOperator.EQ, LineaActual.Aufnr));
                        registroService.getDataFilter(oThat.modelImpresion,"/OrdenSet",aFilter).then(function (oListOrden) {
                            LineaActual.Pdf64 = "";
                            oListOrden.results.forEach(function (values) {
                                if (LineaActual.Aufnr == values.Aufnr) {
                                    LineaActual.Pdf64 = values.Pdf64;
                                }
                            });
    
                            sap.ui.core.BusyIndicator.hide();
                            if (!oThat.onMds) {
                                oThat.onMds = sap.ui.xmlfragment(
                                    "frgMds",
                                    rootPath + ".view.dialog.Mds",
                                    oThat
                                );
                                oThat.getView().addDependent(oThat.onMds);
                            }
                            oThat.onMds.open();
    
                        }).catch(function (oError) {
                            console.log(oError);
                            sap.ui.core.BusyIndicator.hide();
                        })
    
                    });
                }

            },

            onDetailRmdGo: async function (oEvent) {
                var LineaActual = oEvent.getParameter("listItem").getBindingContext("modelGeneral").getObject();
                if (!(LineaActual.rm === "A" || LineaActual.rm === "SS")) {
                    MessageBox.warning("El RMD no está Autorizado.");
                    return;
                }
                let aFilterUser = [];
                aFilterUser.push(new Filter("rmdId_rmdId", FilterOperator.EQ, LineaActual.rmdId));
                aFilterUser.push(new Filter("rol", FilterOperator.EQ, "AUXILIAR"));
                let aListUserRMD;
                if (bInterneInit === true){
                    aListUserRMD = await registroService.getDataFilter(oThat.mainModelv2Online, "/RMD_USUARIO", aFilterUser);
                }else{//OFFLINE
                    aListUserRMD = await registroService.getDataFilter(oThat.mainModelv2, "/RMD_USUARIO", aFilterUser);
                }

                if (oInfoUsuario.funcionUsuario.habilitarRMD){
                    if (aListUserRMD.results.length === 0) {
                        let sMessage = LineaActual.stateRMD === "Habilitado" || LineaActual.stateRMD === "En Proceso" || LineaActual.stateRMD === 'Cerrado' || LineaActual.stateRMD === 'Reaperturado' || LineaActual.stateRMD === 'Parada' ? "Debe asignar algún usuario antes de continuar al Registro de Manufactura Digital." : "Debe asignar algún usuario antes de Habilitar el Registro de Manufactura Digital.";
                        MessageBox.warning(sMessage);
                        return;
                    }
                } else {
                    if (oInfoUsuario.rol[0].codigo == "RMD_AUXILIAR") {
                        let perteneceUsuario = aListUserRMD.results.find(itm=>itm.codigo === oInfoUsuario.data.usuario);
                        if (!perteneceUsuario) {
                            MessageBox.warning("Su usuario no ha sido asignado para el RMD.");
                            return;    
                        }
                    }
                    if (aListUserRMD.results.length === 0) {
                        let sMessage = LineaActual.stateRMD === "Habilitado" || LineaActual.stateRMD === "En Proceso" || LineaActual.stateRMD === 'Cerrado' || LineaActual.stateRMD === 'Reaperturado' || LineaActual.stateRMD === 'Parada' ? "Se debe asignar algún usuario antes de continuar al Registro de Manufactura Digital." : "Se debe Habilitar el Registro de Manufactura Digital para que pueda continuar.";
                        MessageBox.warning(sMessage);
                        return;
                    }
                }
                oThat.modelGeneral.setProperty("/LineaActualMD", LineaActual);
                let aFiltersRMD = [];
                aFiltersRMD.push(new Filter("rmdId", "EQ", LineaActual.rmdId));
                let sExpand = "mdId/estadoIdRmd,estadoIdRmd,aReceta/recetaId";
                let aResponseRMD;
                if (bInterneInit === true){
                    aResponseRMD = await registroService.getDataExpand(oThat.mainModelv2Online, "/RMD", sExpand, aFiltersRMD);
                }else{//OFFLINE
                    aResponseRMD = await registroService.getDataExpand(oThat.mainModelv2, "/RMD", sExpand, aFiltersRMD);
                }

                let oModel = new JSONModel(aResponseRMD.results[0]);
                oThat.getOwnerComponent().setModel(oModel, "asociarDatos");

                if (LineaActual.estadoIdRmd === null) {
                    if (oInfoUsuario.funcionUsuario.habilitarRMD) {
                        MessageBox.confirm(
                            oThat.getView().getModel("i18n").getResourceBundle().getText("confirmAvailable"), {
                            styleClass: "sapUiSizeCompact",
                            actions: [MessageBox.Action.YES, MessageBox.Action.NO],
                            onClose: async function (oAction) {
                                if (oAction === "YES") {
                                    var date = new Date();
                                    var time = date.getTime();
                                    var aFilter = [];
                                    var aEquiposError = [];
                                    var sMensajeError  = null;
                                    aFilter.push(new Filter("mdId_mdId", FilterOperator.EQ, LineaActual.mdId));
                                    
                                    var aListEquipo;
                                    if (bInterneInit === true){
                                        aListEquipo = await registroService.getDataExpand(oThat.mainModelv2Online, "/MD_ES_EQUIPO", "equipoId", aFilter);
                                    }else{//OFFLINE
                                        aListEquipo = await registroService.getDataExpand(oThat.mainModelv2, "/MD_ES_EQUIPO", "equipoId", aFilter);
                                    }
                                    var booleanValidateCalibre = false;
                                    for await (const element of aListEquipo.results) {
                                        let entity = "/CalibracionSet('" + element.equipoId.equnr + "')";
                                        let oEquipoSap;
                                        if (bInterneInit === true){
                                            oEquipoSap = await registroService.getDataAll(oThat.modelNecesidadOnline, entity);
                                        }else{//OFFLINE
                                            oEquipoSap = await registroService.getDataAll(oThat.modelNecesidad, entity);
                                        }
                                       
                                        if(oEquipoSap.Nplda) {
                                            if (time > oEquipoSap.Nplda.getTime()) {
                                                booleanValidateCalibre = true;
                                                let obj = {
                                                    eqktx : element.equipoId.eqktx,
                                                    equnr : element.equipoId.equnr,
                                                };
                                                aEquiposError.push(obj);
                                            } else {
                                                let oData = {
                                                    gstrp : oEquipoSap.Nplda
                                                }
                                                if (bInterneInit === true){
                                                    await registroService.onUpdateDataGeneral(oThat.mainModelv2Online, "EQUIPO", oData, element.equipoId_equipoId);
                                                }else{//OFFLINE
                                                    await registroService.onUpdateDataGeneral(oThat.mainModelv2, "EQUIPO", oData, element.equipoId_equipoId);
                                                }
                                            }
                                        }    
                                    }
                                    if (booleanValidateCalibre) {
                                        aEquiposError.forEach( function(e){
                                            sMensajeError = sMensajeError ? (sMensajeError +"\n"+e.equnr + "-" + e.eqktx) : e.equnr + " - " + e.eqktx;
                                        })
                                        MessageBox.error((oThat.i18n.getText("errorValidateCalibracionCalificacion") + (sMensajeError ? "\n" + sMensajeError : "")));
                                        return;
                                    }
                                    BusyIndicator.show(0);
                                    oThat.onMds.close();
                                    await oThat.setEstructurasRmd(LineaActual);
                                    BusyIndicator.hide();
                                }
                            }
                        }
                        );
                    } else {
                        MessageBox.warning(
                            oThat.getView().getModel("i18n").getResourceBundle().getText("actionNotAllowedRol"))
                    }

                } else {
                    if (oInfoUsuario) {
                        if (oInfoUsuario.funcionUsuario.registroCC || oInfoUsuario.funcionUsuario.registroCP
                            || oInfoUsuario.funcionUsuario.registroP || oInfoUsuario.funcionUsuario.registroVB
                            || oInfoUsuario.funcionUsuario.registroLector || oInfoUsuario.funcionUsuario.cierreRMD
                            || oInfoUsuario.funcionUsuario.agregarEquipo || oInfoUsuario.funcionUsuario.reaperturaRMD
                            || oInfoUsuario.funcionUsuario.habilitarRMD) {

                            oThat.onMds.close();
                            oThat.onListFraction(LineaActual);
                            // oThat.getEstructurasRmd(LineaActual);
                        } else {
                            MessageBox.warning(
                                oThat.getView().getModel("i18n").getResourceBundle().getText("actionNotAllowed"))
                        }
                    }
                }
            },
            setEstructurasRmdInsumo: async function (LineaActual) {
                var oFilter = [];

                oFilter.push(new Filter("mdId_mdId", FilterOperator.EQ, LineaActual.mdId));

                var aListEstructura = await registroService.getDataFilter(oThat.mainModelv2, "/MD_ESTRUCTURA", oFilter);
                var aListPaso = await registroService.getDataFilter(oThat.mainModelv2, "/MD_ES_PASO", oFilter);
                var aListEquipo = await registroService.getDataFilter(oThat.mainModelv2, "/MD_ES_EQUIPO", oFilter);
                var aListUtensilio = await registroService.getDataFilter(oThat.mainModelv2, "/MD_ES_UTENSILIO", oFilter);
                var aListEspecificacion = await registroService.getDataFilter(oThat.mainModelv2, "/MD_ES_ESPECIFICACION", oFilter);
                var aListReceta = await registroService.getDataFilter(oThat.mainModelv2, "/MD_RECETA", oFilter);
                var aListInsumo = await registroService.getDataFilter(oThat.mainModelv2, "/MD_ES_RE_INSUMO", oFilter);

                var sobject = {};
                sobject.terminal = null;
                //sobject.usuarioRegistro = "USUARIOTEST";
                sobject.usuarioRegistro = oInfoUsuario.data.usuario;
                sobject.fechaRegistro = new Date();
                sobject.activo = true;
                sobject.aEstructura = [];
                sobject.aPaso = [];
                sobject.aEquipo = [];
                sobject.aUtensilio = [];
                sobject.aEspecificacion = [];
                sobject.aReceta = [];
                sobject.aInsumo = [];
                sobject.Id = util.onGetUUIDV4();

                var tListReceta = aListReceta.results;
                tListReceta.forEach(element => {
                    delete element["mdRecetaId"];
                    delete element["mdEstructuraRecetaId"];
                    delete element["mdId"];
                    delete element["mdId_mdId"];
                    delete element["estructuraId"];
                    delete element["estructuraId_estructuraId"];
                    delete element["aplica"];
                    delete element["__metadata"];
                    // delete element["recetaId_recetaId"]
                    // delete element["recetaId"]
                    // delete element["rmdId_rmdId"]

                    var sobjectR = element;
                    sobjectR.terminal = null;
                    sobjectR.fechaActualiza = null;
                    sobjectR.usuarioActualiza = null;
                    //sobjectR.usuarioRegistro = "USUARIOTEST";
                    sobjectR.usuarioRegistro = oInfoUsuario.data.usuario;
                    sobjectR.fechaRegistro = new Date();
                    sobjectR.activo = true;

                    sobjectR.rmdRecetaId = util.onGetUUIDV4();
                    sobjectR.rmdId_rmdId = LineaActual.rmdId;
                    // sobjectR.rmdId_rmdId = LineaActual.rmdId;

                    // sobject.aReceta.push(sobjectR);
                });


                aListEstructura.results.forEach(element => {

                    var tListPaso = aListPaso.results.filter(item => item.mdId_mdId === element.mdId_mdId && item.estructuraId_estructuraId === element.estructuraId_estructuraId);
                    var tListEquipo = aListEquipo.results.filter(item => item.mdId_mdId === element.mdId_mdId && item.estructuraId_estructuraId === element.estructuraId_estructuraId);
                    var tListUtensilio = aListUtensilio.results.filter(item => item.mdId_mdId === element.mdId_mdId && item.estructuraId_estructuraId === element.estructuraId_estructuraId);
                    var tListEspecificacion = aListEspecificacion.results.filter(item => item.mdId_mdId === element.mdId_mdId && item.estructuraId_estructuraId === element.estructuraId_estructuraId);
                    var tListInsumo = aListInsumo.results.filter(item => item.mdId_mdId === element.mdId_mdId && item.estructuraId_estructuraId === element.estructuraId_estructuraId);

                    delete element["mdEstructuraId"];
                    delete element["estructuraId"];
                    delete element["mdId"];
                    delete element["mdId_mdId"];
                    delete element["__metadata"];

                    var sobjectEs = element;
                    sobjectEs.terminal = null;
                    sobjectEs.fechaActualiza = null;
                    sobjectEs.usuarioActualiza = null;
                    //sobjectEs.usuarioRegistro = "USUARIOTEST";
                    sobjectEs.usuarioRegistro = oInfoUsuario.data.usuario;
                    sobjectEs.fechaRegistro = new Date();
                    sobjectEs.activo = true;

                    // sobjectEs.rmdEstructuraId = util.onGetUUIDV4();
                    sobjectEs.rmdEstructuraId = "b0686a97-7fa4-4b6a-9e77-da37a97e503f";
                    sobjectEs.rmdId_rmdId = LineaActual.rmdId;

                    sobject.aEstructura = [];

                    // sobject.aEstructura.push(sobjectEs);

                    tListInsumo.forEach(element => {
                        delete element["estructuraRecetaInsumoId"];
                        delete element["mdId"];
                        delete element["mdId_mdId"];
                        delete element["estructuraId"];
                        delete element["estructuraId_estructuraId"];
                        delete element["mdEstructuraId_mdEstructuraId"];
                        delete element["mdEstructuraId"];
                        delete element["__metadata"];
                        delete element["mdRecetaId_mdRecetaId"];
                        delete element["mdRecetaId"];

                        var sobjectI = element;
                        sobjectI.terminal = null;
                        sobjectI.fechaActualiza = null;
                        sobjectI.usuarioActualiza = null;
                        //sobjectI.usuarioRegistro = "USUARIOTEST";
                        sobjectI.usuarioRegistro = oInfoUsuario.data.usuario;
                        sobjectI.fechaRegistro = new Date();
                        sobjectI.activo = true;

                        sobjectI.rmdEstructuraRecetaInsumoId = util.onGetUUIDV4();
                        sobjectI.rmdEstructuraId_rmdEstructuraId = sobjectEs.rmdEstructuraId;
                        sobjectI.rmdRecetaId_recetaId = "f0d1f326-c7b6-4861-9f3a-2b22882fda65";
                        sobjectI.rmdId_rmdId = LineaActual.rmdId;
                        // sobjectI.aplica = true;

                        sobject.aInsumo.push(sobjectI);
                    });

                });

                registroService.createData(oThat.mainModelv2, "/RMD_ESTRUCTURA_SKIP", sobject).then(function () {
                    oThat.getEstructurasRmd(LineaActual);
                }.bind(oThat), function (error) {
                    MessageBox.error("Ocurrió un error al registrar las estructuras RMD seleccionados.");
                    BusyIndicator.hide();
                });
            },
            setEstructurasRmdPrueba: async function (LineaActual) {
                var oFilter = [];

                oFilter.push(new Filter("mdId_mdId", FilterOperator.EQ, LineaActual.mdId));

                var aListEstructura = await registroService.getDataFilter(oThat.mainModelv2, "/MD_ESTRUCTURA", oFilter);
                var aListPaso = await registroService.getDataFilter(oThat.mainModelv2, "/MD_ES_PASO", oFilter);
                var aListEquipo = await registroService.getDataFilter(oThat.mainModelv2, "/MD_ES_EQUIPO", oFilter);
                var aListUtensilio = await registroService.getDataFilter(oThat.mainModelv2, "/MD_ES_UTENSILIO", oFilter);
                var aListEspecificacion = await registroService.getDataFilter(oThat.mainModelv2, "/MD_ES_ESPECIFICACION", oFilter);

                var sobject = {};
                sobject.terminal = null;
                //sobject.usuarioRegistro = "USUARIOTEST";
                sobject.usuarioRegistro = oInfoUsuario.data.usuario;
                sobject.fechaRegistro = new Date();
                sobject.activo = true;
                sobject.aEstructura = [];
                sobject.aPaso = [];
                sobject.aEquipo = [];
                sobject.aUtensilio = [];
                sobject.aEspecificacion = [];
                sobject.Id = util.onGetUUIDV4();

                aListEstructura.results.forEach(element => {

                    var tListPaso = aListPaso.results.filter(item => item.mdId_mdId === element.mdId_mdId && item.estructuraId_estructuraId === element.estructuraId_estructuraId);
                    var tListEquipo = aListEquipo.results.filter(item => item.mdId_mdId === element.mdId_mdId && item.estructuraId_estructuraId === element.estructuraId_estructuraId);
                    var tListUtensilio = aListUtensilio.results.filter(item => item.mdId_mdId === element.mdId_mdId && item.estructuraId_estructuraId === element.estructuraId_estructuraId);
                    var tListEspecificacion = aListEspecificacion.results.filter(item => item.mdId_mdId === element.mdId_mdId && item.estructuraId_estructuraId === element.estructuraId_estructuraId);

                    delete element["mdEstructuraId"];
                    delete element["estructuraId"];
                    delete element["mdId"];
                    delete element["mdId_mdId"];
                    delete element["__metadata"];

                    var sobjectEs = element;
                    sobjectEs.terminal = null;
                    sobjectEs.fechaActualiza = null;
                    sobjectEs.usuarioActualiza = null;
                    //sobjectEs.usuarioRegistro = "USUARIOTEST";
                    sobjectEs.usuarioRegistro = oInfoUsuario.data.usuario;
                    sobjectEs.fechaRegistro = new Date();
                    sobjectEs.activo = true;

                    // sobjectEs.rmdEstructuraId = util.onGetUUIDV4();
                    sobjectEs.rmdEstructuraId = "ef8d5600-c136-4a30-8e33-d886ffbb026b";
                    sobjectEs.rmdId_rmdId = LineaActual.rmdId;

                    sobject.aEstructura = [];

                    // sobject.aEstructura.push(sobjectEs);

                    tListEspecificacion.forEach(element => {
                        delete element["especificaionId"];
                        delete element["estructuraId"];
                        delete element["mdId"];
                        delete element["mdId_mdId"];
                        delete element["mdEstructuraEspecificacionId"];
                        // delete element["ensayoPadreId_ensayoPadreId"];
                        // delete element["ensayoHijo"];
                        // delete element["especificacion"];
                        // delete element["tipoDatoId_iMaestraId"];
                        // delete element["valorInicial"];
                        // delete element["valorFinal"];
                        // delete element["margen"];
                        // delete element["decimales"];
                        // delete element["ensayoPadreId"];
                        // delete element["tipoDatoId"];
                        delete element["estructuraId_estructuraId"];
                        delete element["mdEstructuraId_mdEstructuraId"];
                        delete element["mdEstructuraId"];
                        delete element["__metadata"];

                        var sobjectEp = element;
                        sobjectEp.terminal = null;
                        sobjectEp.fechaActualiza = null;
                        sobjectEp.usuarioActualiza = null;
                        //sobjectEp.usuarioRegistro = "USUARIOTEST";
                        sobjectEp.usuarioRegistro = oInfoUsuario.data.usuario;
                        sobjectEp.fechaRegistro = new Date();
                        sobjectEp.activo = true;

                        sobjectEp.rmdEstructuraEspecificacionId = util.onGetUUIDV4();
                        sobjectEp.rmdEstructuraId_rmdEstructuraId = sobjectEs.rmdEstructuraId;
                        sobjectEp.rmdId_rmdId = LineaActual.rmdId;
                        sobjectEp.aplica = true;

                        sobject.aEspecificacion.push(sobjectEp);
                    });

                });

                registroService.createData(oThat.mainModelv2, "/RMD_ESTRUCTURA_SKIP", sobject).then(function () {
                    oThat.getEstructurasRmd(LineaActual);
                }.bind(oThat), function (error) {
                    MessageBox.error("Ocurrió un error al registrar las estructuras RMD seleccionados.");
                    BusyIndicator.hide();
                });
            },
            setEstructurasRmd: async function (LineaActual) {
                let aFilterReceta = [];
                aFilterReceta.push(new Filter("mdId_mdId", "EQ", LineaActual.mdId));
                let sExpandReceta = "aInsumos";

                let aRecetaMD;
                if (bInterneInit === true){
                    aRecetaMD = await registroService.onGetDataGeneralFiltersExpand(oThat.mainModelv2Online, "MD_RECETA", aFilterReceta, sExpandReceta);
                }else{//OFFLINE
                    aRecetaMD = await registroService.onGetDataGeneralFiltersExpand(oThat.mainModelv2, "MD_RECETA", aFilterReceta, sExpandReceta);
                }
                let aFilter = [];
                aFilter.push(new Filter("mdId_mdId", FilterOperator.EQ, LineaActual.mdId));
                let sExpand = "aPaso/pasoId,aEquipo,aUtensilio,aEtiqueta,aPasoInsumoPaso,aEspecificacion,aInsumo,estructuraId";
                
                let aEstructuraMD;
                if (bInterneInit === true){
                    aEstructuraMD = await registroService.onGetDataGeneralFiltersExpand(oThat.mainModelv2Online, "MD_ESTRUCTURA", aFilter, sExpand);
                }else{//OFFLINE
                    aEstructuraMD = await registroService.onGetDataGeneralFiltersExpand(oThat.mainModelv2, "MD_ESTRUCTURA", aFilter, sExpand);
                }

                let oEstructuraProceso = aEstructuraMD.results.find(itm=>itm.estructuraId.tipoEstructuraId_iMaestraId === sIdTipoEstructuraProceso);
                //let aPasosNotificacion = oEstructuraProceso.aPaso.results.filter(itm=>itm.tipoDatoId_iMaestraId === stipoDatoNotificacion);
                let bFlagErrorNotif = true;
                
                if (oEstructuraProceso) {	
                    let aPasosNotificacion = oEstructuraProceso.aPaso.results.filter(itm=>itm.tipoDatoId_iMaestraId === stipoDatoNotificacion);	
                    if (aPasosNotificacion.length > 0) {	
                        let helper = {};	
                        let aPuestoTrabajoPasos = aPasosNotificacion.reduce(function(r, o) {	
                            let key = o.puestoTrabajo;	
                            if (!helper[key]) {	
                                helper[key] = {"puestoTrabajo" : o.puestoTrabajo, aPasos: [o]};	
                                r.push(helper[key]);	
                            } else {	
                                helper[key].aPasos.push(o);	
                            }	
                            return r;	
                        }, []);	
                        if (aPuestoTrabajoPasos.length === 0) {	
                            bFlagErrorNotif = false;	
                        } else {	
                            aPuestoTrabajoPasos.forEach(function(oPuestoTrabajo) {	
                                let helper = {};	
                                let aClvModeloPasos = oPuestoTrabajo.aPasos.reduce(function(r, o) {	
                                    let key = o.clvModelo;	
                                    if (!helper[key]) {	
                                        helper[key] = {"puestoTrabajo" : o.puestoTrabajo, "clvModelo" : o.clvModelo, aPasos: [o]};	
                                        r.push(helper[key]);	
                                    } else {	
                                        helper[key].aPasos.push(o);	
                                    }	
                                    return r;	
                                }, []);	
                                let oFidClvPre = aClvModeloPasos.find(itm=>itm.clvModelo === 'SETPRE');	
                                let oFidClvProceso = aClvModeloPasos.find(itm=>itm.clvModelo === 'PROCESO');	
                                let oFidClvPost = aClvModeloPasos.find(itm=>itm.clvModelo === 'SETPOST');	
                                if (oFidClvPre && oFidClvProceso && oFidClvPost) {	
                                    bFlagErrorNotif = true;	
                                } else {	
                                    bFlagErrorNotif = false;	
                                }	
                                aClvModeloPasos.forEach(function(oCvlModelo){	
                                    let oFindPasoInicio = oCvlModelo.aPasos.find(itm=>itm.pasoId.tipoCondicionId_iMaestraId === sIdInicioCondicion);	
                                    let oFindPasoFin = oCvlModelo.aPasos.find(itm=>itm.pasoId.tipoCondicionId_iMaestraId === sIdFinCondicion);	
                                    if (!oFindPasoInicio || !oFindPasoFin) {	
                                        bFlagErrorNotif = false;	
                                    }	
                                });	
                            });	
                        }	
                    }	
                }

                // if (aPasosNotificacion.length > 0) {
                //     let helper = {};
                //     let aPuestoTrabajoPasos = aPasosNotificacion.reduce(function(r, o) {
                //         let key = o.puestoTrabajo;
                //         if (!helper[key]) {
                //             helper[key] = {"puestoTrabajo" : o.puestoTrabajo, aPasos: [o]};
                //             r.push(helper[key]);
                //         } else {
                //             helper[key].aPasos.push(o);
                //         }
                //         return r;
                //     }, []);
                //     if (aPuestoTrabajoPasos.length === 0) {
                //         bFlagErrorNotif = false;
                //     } else {
                //         aPuestoTrabajoPasos.forEach(function(oPuestoTrabajo) {
                //             let helper = {};
                //             let aClvModeloPasos = oPuestoTrabajo.aPasos.reduce(function(r, o) {
                //                 let key = o.clvModelo;
                //                 if (!helper[key]) {
                //                     helper[key] = {"puestoTrabajo" : o.puestoTrabajo, "clvModelo" : o.clvModelo, aPasos: [o]};
                //                     r.push(helper[key]);
                //                 } else {
                //                     helper[key].aPasos.push(o);
                //                 }
                //                 return r;
                //             }, []);
                //             let oFidClvPre = aClvModeloPasos.find(itm=>itm.clvModelo === 'SETPRE');
                //             let oFidClvProceso = aClvModeloPasos.find(itm=>itm.clvModelo === 'PROCESO');
                //             let oFidClvPost = aClvModeloPasos.find(itm=>itm.clvModelo === 'SETPOST');
                //             if (oFidClvPre && oFidClvProceso && oFidClvPost) {
                //                 bFlagErrorNotif = true;
                //             } else {
                //                 bFlagErrorNotif = false;
                //             }
                //             aClvModeloPasos.forEach(function(oCvlModelo){
                //                 let oFindPasoInicio = oCvlModelo.aPasos.find(itm=>itm.pasoId.tipoCondicionId_iMaestraId === sIdInicioCondicion);
                //                 let oFindPasoFin = oCvlModelo.aPasos.find(itm=>itm.pasoId.tipoCondicionId_iMaestraId === sIdFinCondicion);
                //                 if (!oFindPasoInicio || !oFindPasoFin) {
                //                     bFlagErrorNotif = false;
                //                 }
                //             });
                //         });
                //     }
                // }
                if (bFlagErrorNotif){
                    let sobject = {
                        fechaActualiza : new Date(),
                        usuarioActualiza : oInfoUsuario.data.usuario,
                        rmdId : LineaActual.rmdId,
                        fraccion : 1,
                        estadoIdRmd_iMaestraId : idEstadoHabilitado,
                        fechaHabilita: new Date(),
                        usuarioHabilita: oInfoUsuario.data.usuario
                    };
                    if (bInterneInit === true){
                        await registroService.updateStatusRmd(oThat.mainModelv2Online, "/RMD", sobject);
                    }else{//OFFLINE MODEL
                        await registroService.updateStatusRmd(oThat.mainModelv2, "/RMD", sobject);
                    }

                    let oUsuarioParam =  {
                        usuarioRegistro: oInfoUsuario.data.usuario,
                        fechaRegistro: new Date(),
                        activo: true,
                        rmdUsuarioId : util.onGetUUIDV4(),
                        rmdId_rmdId  : LineaActual.rmdId,
                        codigo       : oInfoUsuario.data.usuario,
                        nombre       : oInfoUsuario.data.nombre,
                        usuarioId_usuarioId : oInfoUsuario.data.usuarioId,
                        rol          : "JEFE_PROD"
                    }
                    if (bInterneInit === true){
                        await registroService.onSaveDataGeneral(oThat.mainModelv2Online, "RMD_USUARIO", oUsuarioParam);
                    }else{//OFFLINE MODEL
                        await registroService.onSaveDataGeneral(oThat.mainModelv2, "RMD_USUARIO", oUsuarioParam);
                    }

                    let aListIdsReceta = [];
                    for await (const oReceta of aRecetaMD.results) {
                        let oParamReceta = {
                            usuarioRegistro: oInfoUsuario.data.usuario,
                            fechaRegistro: new Date(),
                            activo: true,
                            fraccion: 1,
                            rmdRecetaId: util.onGetUUIDV4(),
                            rmdId_rmdId: LineaActual.rmdId,
                            recetaId_recetaId : oReceta.recetaId_recetaId,
                            orden : oReceta.orden
                        }
                        let objIdReceta = {
                            mdRecetaId : oReceta.mdRecetaId,
                            rmdRecetaId : oParamReceta.rmdRecetaId
                        }
                        aListIdsReceta.push(objIdReceta);

                        if (bInterneInit === true){
                            await registroService.onSaveDataGeneral(oThat.mainModelv2, "RMD_RECETA", oParamReceta);
                        }else{//OFFLINE MODEL
                            await registroService.onSaveDataGeneral(oThat.mainModelv2, "RMD_RECETA", oParamReceta);
                        }
                    }

                    let aListEstructurasRMD = [];
                    let aListIdsInsumos = [];
                    for await (const oEstructuraOnlyInsumo of aEstructuraMD.results) {
                        if(oEstructuraOnlyInsumo.aInsumo.results.length > 0){
                            let oParam = {
                                usuarioRegistro: oInfoUsuario.data.usuario,
                                fechaRegistro: new Date(),
                                activo: true,
                                fraccion: 1,
                                rmdEstructuraId: util.onGetUUIDV4(),
                                orden: oEstructuraOnlyInsumo.orden,
                                rmdId_rmdId: LineaActual.rmdId,
                                estructuraId_estructuraId: oEstructuraOnlyInsumo.estructuraId_estructuraId,
                                aPaso: [],
                                aEquipo : [],
                                aUtensilio : [],
                                aEtiqueta: [],
                                aPasoInsumoPaso: [],
                                aEspecificacion: [],
                                aInsumo: []
                            }

                            //REGISTRAMOS LOS INSUMOS
                            if (oEstructuraOnlyInsumo.aInsumo.results.length > 0) {
                                for await (const oInsumo of oEstructuraOnlyInsumo.aInsumo.results) {
                                    let matchRecetaId = aListIdsReceta.find(itm=>itm.mdRecetaId === oInsumo.mdRecetaId_mdRecetaId);
                                    let oInsumoObj = {
                                        usuarioRegistro: oInfoUsuario.data.usuario,
                                        fechaRegistro: new Date(),
                                        activo: true,
                                        rmdEstructuraRecetaInsumoId: util.onGetUUIDV4(),
                                        rmdId_rmdId: LineaActual.rmdId,
                                        rmdEstructuraId_rmdEstructuraId: oParam.rmdEstructuraId,
                                        rmdRecetaId_rmdRecetaId : matchRecetaId.rmdRecetaId,
                                        cantidadRm : oInsumo.cantidadRm,
                                        cantidadBarCode : oInsumo.cantidadBarCode,
                                        Matnr : oInsumo.Matnr,
                                        Werks : oInsumo.Werks,                
                                        Maktx : oInsumo.Maktx,               
                                        ItemCateg : oInsumo.ItemCateg,               
                                        ItemNo : oInsumo.ItemNo,             
                                        Component : oInsumo.Component,           
                                        CompQty : oInsumo.CompQty,          
                                        CompUnit : oInsumo.CompUnit,           
                                        ItemText1 : oInsumo.ItemText1,           
                                        ItemText2 : oInsumo.ItemText2,
                                        fraccion: 1
                                    }
                                    let objInsumoIds = {
                                        estructuraRecetaInsumoId : oInsumo.estructuraRecetaInsumoId,
                                        rmdEstructuraRecetaInsumoId : oInsumoObj.rmdEstructuraRecetaInsumoId
                                    }
                                    aListIdsInsumos.push(objInsumoIds);
                                    oParam.aInsumo.push(oInsumoObj);
                                }
                            }
                            //OFFLINE es un depp entity se debe revisar la logica nen HANA para replicarlo sin deep entity
                            BusyIndicator.hide();
                            if (bInterneInit === true){
                                await registroService.onSaveDataGeneral(oThat.mainModelv2Online, "RMD_ESTRUCTURA", oParam);
                            }else{//OFFLINE MODEL
                                await registroService.onSaveDataGeneral(oThat.mainModelv2, "RMD_ESTRUCTURA", oParam);
                            }
                        }
                    }
                    for await (const oEstructura of aEstructuraMD.results) {
                        if (oEstructura.aInsumo.results.length === 0) {
                            let oParam = {
                                usuarioRegistro: oInfoUsuario.data.usuario,
                                fechaRegistro: new Date(),
                                activo: true,
                                fraccion: 1,
                                rmdEstructuraId: util.onGetUUIDV4(),
                                orden: oEstructura.orden,
                                rmdId_rmdId: LineaActual.rmdId,
                                estructuraId_estructuraId: oEstructura.estructuraId_estructuraId,
                                aPaso: [],
                                aEquipo : [],
                                aUtensilio : [],
                                aEtiqueta: [],
                                aPasoInsumoPaso: [],
                                aEspecificacion: [],
                                aInsumo: []
                            }
                            aListEstructurasRMD.push(oParam);
        
                            //AGREGAMOS LOS PASOS A LA ESTRUCTURA
                            let aListIdPaso = [];
                            if (oEstructura.aPaso.results.length > 0) {
                                for await (const oPaso of oEstructura.aPaso.results) {
                                    if (oPaso.tipoDatoId_iMaestraId === stipoDatoNotificacion) { //SE REGISTRA LAPSO
                                        let oPasoObj = {
                                            usuarioRegistro: oInfoUsuario.data.usuario,
                                            fechaRegistro: new Date(),
                                            activo: true,
                                            rmdEstructuraPasoId: util.onGetUUIDV4(),
                                            rmdEstructuraId_rmdEstructuraId: oParam.rmdEstructuraId,
                                            rmdId_rmdId: LineaActual.rmdId,
                                            pasoId_pasoId: oPaso.pasoId_pasoId,
                                            orden: oPaso.orden,
                                            valorInicial: oPaso.valorInicial,
                                            valorFinal: oPaso.valorFinal,
                                            margen: oPaso.margen,
                                            decimales: oPaso.decimales,
                                            mdEstructuraPasoIdDepende: oPaso.mdEstructuraPasoIdDepende,
                                            depende: oPaso.depende,
                                            dependeRmdEstructuraPasoId: oPaso.dependeMdEstructuraPasoId,
                                            estadoCC: oPaso.estadoCC,
                                            estadoMov: oPaso.estadoMov,
                                            pmop: oPaso.pmop,
                                            genpp: oPaso.genpp,
                                            tab: oPaso.tab,
                                            edit: oPaso.edit,
                                            rpor: oPaso.rpor,
                                            vb: oPaso.vb,
                                            formato : oPaso.formato,
                                            imagen : false,
                                            tipoDatoId_iMaestraId: oPaso.tipoDatoId_iMaestraId,
                                            puestoTrabajo : oPaso.puestoTrabajo,
                                            clvModelo : oPaso.clvModelo,
                                            automatico : oPaso.automatico,
                                            aplica: true,
                                            fraccion: 1
                                        }
                                        oParam.aPaso.push(oPasoObj);
                                        if (oPaso.pasoId.tipoCondicionId_iMaestraId === sIdInicioCondicion) {
                                            let pasoLapsoFin = oEstructura.aPaso.results.find(itm=>itm.clvModelo === oPaso.clvModelo && itm.puestoTrabajo === oPaso.puestoTrabajo && itm.pasoId.tipoCondicionId_iMaestraId === sIdFinCondicion); 
                                            if(pasoLapsoFin){
                                                let sobjectTrama = {
                                                    usuarioRegistro: oInfoUsuario.data.usuario,
                                                    fechaRegistro: new Date(),
                                                    activo : true,
                                                    rmdLapsoId : util.onGetUUIDV4(),
                                                    rmdId_rmdId : LineaActual.rmdId,
                                                    Anular : false,
                                                    descripcion: oPaso.pasoId.descripcion + " - " + pasoLapsoFin.pasoId.descripcion,
                                                    tipoDatoId: (oPaso.tipoDatoId_iMaestraId).toString(),
                                                    automatico: pasoLapsoFin.automatico === null ? false : pasoLapsoFin.automatico,
                                                    pasoId_mdEstructuraPasoId: oPaso.mdEstructuraPasoId,
                                                    pasoIdFin_mdEstructuraPasoId: pasoLapsoFin.mdEstructuraPasoId,
                                                    fraccion: 1
                                                };
                                                if (bInterneInit === true){
                                                    await registroService.createData(oThat.mainModelv2Online, "/RMD_LAPSO", sobjectTrama);
                                                }else{//OFFLINE MODEL
                                                    await registroService.createData(oThat.mainModelv2, "/RMD_LAPSO", sobjectTrama);
                                                }
                                            }
                                        }
                                    } else {
                                        let oPasoObj = {
                                            usuarioRegistro: oInfoUsuario.data.usuario,
                                            fechaRegistro: new Date(),
                                            activo: true,
                                            rmdEstructuraPasoId: util.onGetUUIDV4(),
                                            rmdEstructuraId_rmdEstructuraId: oParam.rmdEstructuraId,
                                            rmdId_rmdId: LineaActual.rmdId,
                                            pasoId_pasoId: oPaso.pasoId_pasoId,
                                            orden: oPaso.orden,
                                            valorInicial: oPaso.valorInicial,
                                            valorFinal: oPaso.valorFinal,
                                            margen: oPaso.margen,
                                            decimales: oPaso.decimales,
                                            mdEstructuraPasoIdDepende: oPaso.mdEstructuraPasoIdDepende,
                                            depende: oPaso.depende,
                                            dependeRmdEstructuraPasoId: oPaso.dependeMdEstructuraPasoId,
                                            estadoCC: oPaso.estadoCC,
                                            estadoMov: oPaso.estadoMov,
                                            pmop: oPaso.pmop,
                                            genpp: oPaso.genpp,
                                            tab: oPaso.tab,
                                            edit: oPaso.edit,
                                            rpor: oPaso.rpor,
                                            vb: oPaso.vb,
                                            formato : oPaso.formato,
                                            imagen : false,
                                            tipoDatoId_iMaestraId: oPaso.tipoDatoId_iMaestraId,
                                            puestoTrabajo : oPaso.puestoTrabajo,
                                            clvModelo : oPaso.clvModelo,
                                            automatico : oPaso.automatico,
                                            aplica: true,
                                            fraccion: 1
                                        }
                                        let objPaso = {
                                            mdEstructuraPasoId : oPaso.mdEstructuraPasoId,
                                            rmdEstructuraPasoId : oPasoObj.rmdEstructuraPasoId
                                        }
                                        aListIdPaso.push(objPaso);
                                        oParam.aPaso.push(oPasoObj);
                                    }
                                    if (oPaso.tipoDatoId_iMaestraId === stipoDatoFormula) {
                                        let aFilter = [];
                                        aFilter.push(new Filter("pasoPadreId_mdEstructuraPasoId", "EQ", oPaso.mdEstructuraPasoId));

                                        let aListaPasosFormula;
                                        if (bInterneInit === true){
                                            aListaPasosFormula = await registroService.getDataFilter(oThat.mainModelv2Online, "/MD_ES_FORMULA_PASO", aFilter);
                                        }else{//OFFLINE MODEL
                                            aListaPasosFormula = await registroService.getDataFilter(oThat.mainModelv2, "/MD_ES_FORMULA_PASO", aFilter);
                                        }
                                       
                                        aListaPasosFormula.results.forEach(async function (e) {
                                            let oParam = {
                                                fechaActualiza: new Date(),
                                                rmdPasoUsuarioId_rmdEstructuraPasoId: oPasoObj.rmdEstructuraPasoId
                                            }
                                            if (bInterneInit === true){
                                                await registroService.onUpdateDataGeneral(oThat.mainModelv2Online, "MD_ES_FORMULA_PASO", oParam, e.mdFormulaPaso);
                                            }else{//OFFLINE MODEL
                                                await registroService.onUpdateDataGeneral(oThat.mainModelv2, "MD_ES_FORMULA_PASO", oParam, e.mdFormulaPaso);
                                            }
                                            
                                        });
                                    }
                                    if (oPaso.tipoDatoId_iMaestraId === stipoDatoFormula || oPaso.tipoDatoId_iMaestraId === stipoDatoCantidad || oPaso.tipoDatoId_iMaestraId === stipoDatoDatoFijo || oPaso.tipoDatoId_iMaestraId === stipoDatoNumeros) {
                                        var aFilterF = [];
                                        aFilterF.push(new Filter("pasoFormulaId_mdEstructuraPasoId", "EQ", oPaso.mdEstructuraPasoId));

                                        var aListaPasosFormula;
                                        if (bInterneInit === true){
                                            aListaPasosFormula = await registroService.getDataFilter(oThat.mainModelv2, "/MD_ES_FORMULA_PASO", aFilterF);
                                        }else{//OFFLINE MODEL
                                            aListaPasosFormula = await registroService.getDataFilter(oThat.mainModelv2, "/MD_ES_FORMULA_PASO", aFilterF);
                                        }
                                        
                                        aListaPasosFormula.results.forEach(async function (e) {
                                            var oParam = {
                                                fechaActualiza: new Date(),
                                                rmdPasoFormulaId_rmdEstructuraPasoId: oPasoObj.rmdEstructuraPasoId
                                            }
                                            if (bInterneInit === true){
                                                await registroService.onUpdateDataGeneral(oThat.mainModelv2Online, "MD_ES_FORMULA_PASO", oParam, e.mdFormulaPaso);
                                            }else{//OFFLINE MODEL
                                                await registroService.onUpdateDataGeneral(oThat.mainModelv2, "MD_ES_FORMULA_PASO", oParam, e.mdFormulaPaso);
                                            }
                                            
                                        });
                                    }
                                }
                            }
        
                            //AGREGAMOS LOS EQUIPOS A LA ESTRUCTURA
                            if (oEstructura.aEquipo.results.length > 0) {
                                oEstructura.aEquipo.results.forEach(async function (oEquipo) {
                                    let oEquipoObj = {
                                        usuarioRegistro: oInfoUsuario.data.usuario,
                                        fechaRegistro: new Date(),
                                        activo: true,
                                        rmdEstructuraEquipoId: util.onGetUUIDV4(),
                                        rmdEstructuraId_rmdEstructuraId: oParam.rmdEstructuraId,
                                        rmdId_rmdId: LineaActual.rmdId,
                                        equipoId_equipoId: oEquipo.equipoId_equipoId,
                                        orden: oEquipo.orden,
                                        aplica: true,
                                        fraccion: 1
                                    }
                                    oParam.aEquipo.push(oEquipoObj);
                                });
                            }
                
                            //AGREGAMOS LOS UTENSILIOS A LA ESTRUCTURA
                            if (oEstructura.aUtensilio.results.length > 0) {
                                oEstructura.aUtensilio.results.forEach(async function (oUtensilio) {
                                    let oUtensiliooBJ = {
                                        usuarioRegistro: oInfoUsuario.data.usuario,
                                        fechaRegistro: new Date(),
                                        activo: true,
                                        rmdEstructuraUtensilioId: util.onGetUUIDV4(),
                                        rmdEstructuraId_rmdEstructuraId: oParam.rmdEstructuraId,
                                        rmdId_rmdId: LineaActual.rmdId,
                                        utensilioId_utensilioId: oUtensilio.utensilioId_utensilioId,
                                        agrupadorId_clasificacionUtensilioId : oUtensilio.agrupadorId_clasificacionUtensilioId,
                                        orden: oUtensilio.orden,
                                        aplica: true,
                                        fraccion: 1
                                    }
                                    oParam.aUtensilio.push(oUtensiliooBJ);
                                });
                            }
                
                            //AGREGAMOS LAS ETIQUETAS A LA ESTRUCTURA
                            if (oEstructura.aEtiqueta.results.length > 0) {
                                oEstructura.aEtiqueta.results.forEach(async function (oEtiqueta) {
                                    let oEtiquetaObj = {
                                        usuarioRegistro: oInfoUsuario.data.usuario,
                                        fechaRegistro: new Date(),
                                        activo: true,
                                        rmdEsEtiquetaId: util.onGetUUIDV4(),
                                        rmdEstructuraId_rmdEstructuraId: oParam.rmdEstructuraId,
                                        rmdId_rmdId: LineaActual.rmdId,
                                        etiquetaId_etiquetaId: oEtiqueta.etiquetaId_etiquetaId,
                                        orden: oEtiqueta.orden,
                                        conforme: oEtiqueta.conforme,
                                        procesoMenor: oEtiqueta.procesoMenor,
                                        fraccion: 1
                                    }
                                    oParam.aEtiqueta.push(oEtiquetaObj);
                                });
                            }
                
                            //AGREGAMOS  LOS PROCESOS MENORES A LOS PASOS DE LA ETIQUETA DE LA ESTRUCTURA
                            if (oEstructura.aPasoInsumoPaso.results.length > 0) {
                                for await (const oProcesoMenor of oEstructura.aPasoInsumoPaso.results) {
                                    let existePasoPadre = aListIdPaso.find(itm=>itm.mdEstructuraPasoId === oProcesoMenor.pasoId_mdEstructuraPasoId)
                                    let existeInsumo = aListIdsInsumos.find(itm=>itm.estructuraRecetaInsumoId === oProcesoMenor.estructuraRecetaInsumoId_estructuraRecetaInsumoId);
                                    let estructuraRecta = null;
                                    if (existeInsumo) {
                                        estructuraRecta = existeInsumo.rmdEstructuraRecetaInsumoId;
                                    }
                                    let oProcesoMenorObj = {
                                        usuarioRegistro: oInfoUsuario.data.usuario,
                                        fechaRegistro: new Date(),
                                        activo: true,
                                        rmdEstructuraPasoInsumoPasoId: util.onGetUUIDV4(),
                                        rmdEstructuraId_rmdEstructuraId: oParam.rmdEstructuraId,
                                        rmdId_rmdId: LineaActual.rmdId,
                                        pasoId_rmdEstructuraPasoId: existePasoPadre.rmdEstructuraPasoId,
                                        pasoHijoId_pasoId : oProcesoMenor.pasoHijoId_pasoId !== null ? oProcesoMenor.pasoHijoId_pasoId : null,
                                        tipoDatoId_iMaestraId : oProcesoMenor.tipoDatoId_iMaestraId,
                                        rmdEstructuraRecetaInsumoId_rmdEstructuraRecetaInsumoId : estructuraRecta,
                                        mdEstructuraPasoInsumoPasoIdAct: oProcesoMenor.mdEstructuraPasoInsumoPasoIdAct,
                                        etiquetaId_etiquetaId: oProcesoMenor.etiquetaId_etiquetaId,
                                        orden : oProcesoMenor.orden,
                                        valorInicial : oProcesoMenor.valorInicial,
                                        valorFinal : oProcesoMenor.valorFinal,
                                        margen : oProcesoMenor.margen,
                                        cantidadInsumo : oProcesoMenor.cantidadInsumo,
                                        decimales : oProcesoMenor.decimales,
                                        estadoCC : oProcesoMenor.estadoCC,
                                        estadoMov : oProcesoMenor.estadoMov,
                                        genpp : oProcesoMenor.genpp,
                                        edit : oProcesoMenor.edit,
                                        tab : oProcesoMenor.tab,
                                        aplica: true,
                                        fraccion: 1,
                                        Component: oProcesoMenor.Component,
                                        Matnr: oProcesoMenor.Matnr,
                                        Maktx: oProcesoMenor.Maktx,
                                        CompUnit: oProcesoMenor.CompUnit
                                    }
                                    oParam.aPasoInsumoPaso.push(oProcesoMenorObj);
                                }
                            }
        
                            //AGREGAMOS LAS ESPECIFICACIONES LA ESTRUCTURA
                            if (oEstructura.aEspecificacion.results.length > 0) {
                                oEstructura.aEspecificacion.results.forEach(async function (oEspecificacion) {
                                    let oEspecificacionObj = {
                                        usuarioRegistro : oInfoUsuario.data.usuario,
                                        fechaRegistro : new Date(),
                                        activo : true,
                                        rmdEstructuraEspecificacionId : util.onGetUUIDV4(),
                                        rmdEstructuraId_rmdEstructuraId : oParam.rmdEstructuraId,
                                        rmdId_rmdId: LineaActual.rmdId,
                                        //ensayoPadreId_ensayoPadreId : oEspecificacion.ensayoPadreId_ensayoPadreId,
                                        ensayoPadrId_iMaestraId : oEspecificacion.ensayoPadreId_iMaestraId,
                                        ensayoPadreSAP : oEspecificacion.ensayoPadreSAP,
                                        ensayoHijo : oEspecificacion.ensayoHijo,
                                        especificacion: oEspecificacion.especificacion,
                                        tipoDatoId_iMaestraId : oEspecificacion.tipoDatoId_iMaestraId,
                                        valorInicial : oEspecificacion.valorInicial,
                                        valorFinal : oEspecificacion.valorFinal,
                                        margen : oEspecificacion.margen,
                                        decimales : oEspecificacion.decimales,
                                        orden : oEspecificacion.orden,
                                        aplica : true,
                                        Merknr : oEspecificacion.Merknr,
                                        fraccion: 1
                                    }
                                    oParam.aEspecificacion.push(oEspecificacionObj);
                                });
                            }
                            if( bInterneInit === true){
                                await registroService.onSaveDataGeneral(oThat.mainModelv2Online, "RMD_ESTRUCTURA", oParam);
                            }else{//OFFLINE MODEL
                                await registroService.onSaveDataGeneral(oThat.mainModelv2, "RMD_ESTRUCTURA", oParam);
                            }
                        }
                    }
                    await oThat.getEstructurasRmdRefactory(1);
                    oThat.onRouteDetailView();
                } else {
                    MessageBox.error("No se puede habilitar el RMD debido a que los pasos de Notificación están incorrectos.")
                    return false;
                }
            },

            getFormulas: function (aListInsumo, aListInsumoHistorico, model) {
                var aListObjectCase = [];
                var textoVerificado = "";

                aListInsumo.results.sort((a, b) => a.orden - b.orden);

                aListInsumo.results.forEach(eq => {
                    var sobjectCase = {}
                    sobjectCase.Id = eq.rmdEstructuraRecetaInsumoId;
                    sobjectCase.rmdEstructuraId_rmdEstructuraId = eq.rmdEstructuraId_rmdEstructuraId;
                    sobjectCase.fechaActualiza = eq.fechaActualiza;
                    sobjectCase.rmdEstructuraId = eq.rmdEstructuraId;
                    sobjectCase.recetaId = eq.rmdRecetaId_recetaId;
                    sobjectCase.numeroBultos = eq.numeroBultos;
                    sobjectCase.vistoBueno = eq.vistoBueno;

                    sobjectCase.cantidadReceta = eq.CompQty;
                    sobjectCase.cantidadRm = eq.cantidadRm;
                    sobjectCase.stateText = "None";
                    if (eq.cantidadReceta != eq.cantidadRm) {
                        sobjectCase.stateText = "Warning";
                    }
                    sobjectCase.codigo = eq.Component;
                    sobjectCase.descripcion = eq.Maktx;
                    sobjectCase.orden = eq.Component;
                    sobjectCase.um = eq.CompUnit;
                    sobjectCase.usuarioActualiza = eq.usuarioActualiza;
                    sobjectCase.cantidadBarCode = eq.cantidadBarCode;

                    var tListInsumoHistorico = aListInsumoHistorico.results.filter(item => item.rmdEstructuraRecetaInsumoId_rmdEstructuraRecetaInsumoId === eq.rmdEstructuraRecetaInsumoId && item.rmdEstructuraId_rmdEstructuraId === eq.rmdEstructuraId_rmdEstructuraId);

                    var tUltimoListInsumoHistorico = {};

                    if (tListInsumoHistorico.length > 0) {
                        tListInsumoHistorico.sort((a, b) => a.fechaRegistro.getTime() - b.fechaRegistro.getTime());
                        tUltimoListInsumoHistorico = tListInsumoHistorico[tListInsumoHistorico.length - 1];
                    }

                    sobjectCase.historico = tListInsumoHistorico;
                    sobjectCase.ultimaAccion = tUltimoListInsumoHistorico;
                    /* type = tipoId expand
                    calification = viene de sap no hay campo*/
                    aListObjectCase.push(sobjectCase);
                });

                oThat.modelGeneral.setProperty(model, aListObjectCase);

            },

            getEspecificacion: function (aListEspecificacion, model) {
                var aListObjectCase = [];
                var textoVerificado = "";

                aListEspecificacion.results.sort((a, b) => a.orden - b.orden);

                aListEspecificacion.results.forEach(eq => {
                    var sobjectCase = {}
                    sobjectCase.Id = eq.rmdEstructuraEspecificacionId;
                    sobjectCase.rmdEstructuraId_rmdEstructuraId = eq.rmdEstructuraId_rmdEstructuraId;
                    sobjectCase.descripcion = "";
                    sobjectCase.activo = "";
                    sobjectCase.codigo = "";
                    sobjectCase.resultados = eq.resultados;
                    sobjectCase.tipodato = eq.tipoDatoId_iMaestraId;
                    sobjectCase.fechaActualiza = eq.fechaActualiza;
                    if (eq.ensayoPadreId) {
                        //sobjectCase.descripcion = eq.ensayoPadreId.descripcion;
                        sobjectCase.descripcion = eq.ensayoPadreId.contenido;
                        sobjectCase.activo = eq.ensayoPadreId.activo;
                        sobjectCase.codigo = eq.ensayoPadreId.codigo;
                    }
                    sobjectCase.ensayoHijo = eq.ensayoHijo;
                    sobjectCase.especificacion = eq.especificacion;
                    sobjectCase.usuarioActualiza = eq.usuarioActualiza;
                    /* type = tipoId expand
                     calification = viene de sap no hay campo*/
                    aListObjectCase.push(sobjectCase);
                });

                oThat.modelGeneral.setProperty(model, aListObjectCase);

            },

            //   getProcesos:function(aListEtiqueta, aListPasoInsumo, aListEtiquetaHistorico, aListPasoHistorico, model){
            getProcesos: function (aListEtiqueta, aListPasoInsumo, aListPasoHistorico, model) {
                var aListObjectCase = [];
                var textoVerificado = "";

                aListEtiqueta.results.sort((a, b) => a.orden - b.orden);

                aListEtiqueta.results.forEach(eq => {
                    var sobjectCase = {}
                    sobjectCase.Id = eq.rmdEsEtiquetaId;
                    sobjectCase.rmdEstructuraId_rmdEstructuraId = eq.rmdEstructuraId_rmdEstructuraId;
                    sobjectCase.rmdEsEtiquetaId = eq.rmdEsEtiquetaId;
                    sobjectCase.fechaActualiza = eq.fechaActualiza;
                    sobjectCase.rmdEstructuraId = eq.rmdEstructuraId;
                    sobjectCase.vistoBueno = eq.vistoBueno;

                    if (eq.etiquetaId) {
                        sobjectCase.codigoEtiqueta = eq.etiquetaId.codigo;
                        sobjectCase.descripcionEtiqueta = eq.etiquetaId.descripcion;
                    }
                    sobjectCase.orden = eq.orden;
                    sobjectCase.um = eq.um;
                    sobjectCase.usuarioActualiza = eq.usuarioActualiza;
                    sobjectCase.paso = [];
                    /* type = tipoId expand
                     calification = viene de sap no hay campo*/

                    aListPasoInsumo.results.forEach(value => {
                        var sobjectCase2 = {};
                        if (eq.etiquetaId_etiquetaId == value.etiquetaId_etiquetaId) {
                            sobjectCase.paso.push(value);
                        }
                    });

                    aListObjectCase.push(sobjectCase);
                });

                aListObjectCase.forEach(eq => {
                    var arrId = [];
                    eq.paso.forEach(eq2 => {
                        arrId.push(eq2.rmdEstructuraPasoInsumoPasoId);
                    });
                    eq.arrId = arrId;
                });

                $.each(aListObjectCase, function (x, y) {
                    var paso = [];

                    y.paso.sort((a, b) => a.orden - b.orden);

                    $.each(y.paso.groupBy('pasoId_pasoId'), function (datax, datay) {
                        var hijopaso = [];
                        var objPaso = {
                            "id": datay[0].rmdEstructuraPasoInsumoPasoId,
                            "rmdEstructuraId_rmdEstructuraId": datay[0].rmdEstructuraId_rmdEstructuraId,
                            "pasoId_pasoId": datay[0].pasoId_pasoId,
                            "codigo": datay[0].pasoId.codigo,
                            "decimales": datay[0].pasoId.decimales,
                            "descripcion": datay[0].pasoId.descripcion,
                            "margen": datay[0].pasoId.margen,
                            "numeracion": datay[0].pasoId.numeracion,
                            "tipoLapsoId_motivoLapsoId": datay[0].pasoId.tipoLapsoId_motivoLapsoId,
                            "usuarioActualiza": datay[0].pasoId.usuarioActualiza,
                            "usuarioRegistro": datay[0].pasoId.usuarioRegistro,
                            "valorFinal": datay[0].pasoId.valorFinal,
                            "valorInicial": datay[0].pasoId.valorInicial,
                            "orden": datay[0].orden,
                            "aplica": datay[0].aplica,
                            "vistoBueno": datay[0].vistoBuenoPaso === null ? false : datay[0].vistoBuenoPaso,
                            "vistoBuenoPaso": datay[0].vistoBuenoPaso === null ? false : datay[0].vistoBuenoPaso,
                            "usuarioActualiza": datay[0].usuarioActualiza,
                            "fechaActualizaPaso": datay[0].fechaActualizaPaso,
                            "etiquetaId_etiquetaId": datay[0].etiquetaId_etiquetaId,
                            "rmdEsEtiquetaId": y.rmdEsEtiquetaId,
                            "pasoHijo": []
                        };

                        $.each(datay, function (hijox, hijoy) {
                            var objHijoPaso = {
                                "estructura": "",
                            };

                            objHijoPaso.rmdEstructuraPasoInsumoPasoId = hijoy.rmdEstructuraPasoInsumoPasoId;
                            objHijoPaso.aplica = hijoy.aplica;
                            objHijoPaso.vistoBueno = hijoy.vistoBueno;
                            objHijoPaso.usuarioActualiza = hijoy.usuarioActualiza;
                            objHijoPaso.fechaActualizaPaso = hijoy.fechaActualiza;

                            if (hijoy.pasoHijoId) {
                                objHijoPaso.id = hijoy.pasoHijoId_pasoId;
                                objHijoPaso.estructura = "hijo";
                                objHijoPaso.decimales = hijoy.pasoHijoId.decimales;
                                objHijoPaso.codigo = hijoy.pasoHijoId.codigo;
                                objHijoPaso.descripcion = hijoy.pasoHijoId.descripcion;
                                objHijoPaso.fechaActualiza = hijoy.pasoHijoId.fechaActualiza;
                                objHijoPaso.estadoId_iMaestraId = hijoy.pasoHijoId.estadoId_iMaestraId;
                                objHijoPaso.margen = hijoy.pasoHijoId.margen;
                                objHijoPaso.numeracion = hijoy.pasoHijoId.numeracion;
                                objHijoPaso.valorFinal = hijoy.pasoHijoId.valorFinal;
                                objHijoPaso.valorInicial = hijoy.pasoHijoId.valorInicial;
                            } else if (hijoy.rmdEstructuraRecetaInsumoId) {
                                objHijoPaso.id = hijoy.rmdEstructuraRecetaInsumoId_rmdEstructuraRecetaInsumoId;
                                objHijoPaso.estructura = "receta";
                                // objHijoPaso.cantidadReceta = hijoy.rmdEstructuraRecetaInsumoId.cantidadReceta;
                                // objHijoPaso.codigo = hijoy.rmdEstructuraRecetaInsumoId.codigo;
                                // objHijoPaso.descripcion = hijoy.rmdEstructuraRecetaInsumoId.descripcion;
                                // objHijoPaso.fechaActualiza = hijoy.rmdEstructuraRecetaInsumoId.fechaActualiza;
                                // objHijoPaso.numeroBultos = hijoy.rmdEstructuraRecetaInsumoId.numeroBultos;
                                // objHijoPaso.orden = hijoy.rmdEstructuraRecetaInsumoId.orden;
                                // objHijoPaso.sustituto = hijoy.rmdEstructuraRecetaInsumoId.sustituto;
                                // objHijoPaso.um = hijoy.rmdEstructuraRecetaInsumoId.um;
                                // objHijoPaso.valorFinal = hijoy.rmdEstructuraRecetaInsumoId.valorFinal;
                                // objHijoPaso.valorInicial = hijoy.rmdEstructuraRecetaInsumoId.valorInicial;
                                objHijoPaso.cantidadReceta = hijoy.rmdEstructuraRecetaInsumoId.CompQty;
                                objHijoPaso.codigo = hijoy.rmdEstructuraRecetaInsumoId.Component;
                                objHijoPaso.descripcion = hijoy.rmdEstructuraRecetaInsumoId.Maktx;
                                objHijoPaso.fechaActualiza = hijoy.rmdEstructuraRecetaInsumoId.fechaActualiza;
                                objHijoPaso.numeroBultos = hijoy.rmdEstructuraRecetaInsumoId.numeroBultos;
                                objHijoPaso.orden = hijoy.rmdEstructuraRecetaInsumoId.Maktx;
                                objHijoPaso.sustituto = hijoy.rmdEstructuraRecetaInsumoId.sustituto;
                                objHijoPaso.um = hijoy.rmdEstructuraRecetaInsumoId.CompUnit;
                                objHijoPaso.valorFinal = hijoy.rmdEstructuraRecetaInsumoId.valorFinal;
                                objHijoPaso.valorInicial = hijoy.rmdEstructuraRecetaInsumoId.valorInicial;
                            }

                            hijopaso.push(objHijoPaso);
                        });

                        objPaso.pasoHijo = hijopaso;

                        paso.push(objPaso);
                    });
                    y.paso = paso;
                });

                var aEstructuraEtiqueta = [];

                $.each(aListObjectCase, function (x, y) {
                    var sobjectEstructuraCase = {};
                    var numEtiqueta = y.codigoEtiqueta.toString();
                    sobjectEstructuraCase.num = numEtiqueta + ".";
                    sobjectEstructuraCase.estructura = "etiqueta";
                    sobjectEstructuraCase.visible = false;
                    sobjectEstructuraCase.id = y.Id;
                    sobjectEstructuraCase.vistoBueno = y.vistoBueno === null ? false : y.vistoBueno;
                    sobjectEstructuraCase.rmdEstructuraId_rmdEstructuraId = y.rmdEstructuraId_rmdEstructuraId;
                    sobjectEstructuraCase.descripcion = y.descripcionEtiqueta;
                    aEstructuraEtiqueta.push(sobjectEstructuraCase);
                    $.each(y.paso, function (datax, datay) {
                        var sobjectEstructuraPasoCase = {};
                        var numEtiquetaPaso = numEtiqueta + "." + (parseInt(datax) + 1).toString();
                        sobjectEstructuraPasoCase.num = numEtiquetaPaso + ".";
                        sobjectEstructuraPasoCase.estructura = "paso";
                        sobjectEstructuraPasoCase.visible = true;
                        sobjectEstructuraPasoCase.id = datay.pasoId_pasoId;
                        sobjectEstructuraPasoCase.arrId = y.arrId;
                        sobjectEstructuraPasoCase.rmdEstructuraId_rmdEstructuraId = datay.rmdEstructuraId_rmdEstructuraId;
                        sobjectEstructuraPasoCase.descripcion = datay.descripcion;
                        sobjectEstructuraPasoCase.vistoBueno = datay.vistoBueno;
                        sobjectEstructuraPasoCase.vistoBuenoPaso = datay.vistoBuenoPaso;
                        sobjectEstructuraPasoCase.aplica = datay.aplica === null ? true : datay.aplica;
                        sobjectEstructuraPasoCase.etiquetaId = datay.etiquetaId_etiquetaId;
                        sobjectEstructuraPasoCase.rmdEsEtiquetaId = datay.rmdEsEtiquetaId;
                        sobjectEstructuraPasoCase.usuarioActualiza = datay.usuarioActualiza;
                        sobjectEstructuraPasoCase.fechaActualiza = datay.fechaActualiza;
                        aEstructuraEtiqueta.push(sobjectEstructuraPasoCase);
                        $.each(datay.pasoHijo, function (datahijox, datahijoy) {
                            var sobjectEstructuraHijoPasoCase = {};
                            var numEtiquetaHijoPaso = numEtiquetaPaso + "." + (parseInt(datahijox) + 1).toString();
                            sobjectEstructuraHijoPasoCase.num = numEtiquetaHijoPaso + ".";;
                            sobjectEstructuraHijoPasoCase.estructura = datahijoy.estructura;
                            sobjectEstructuraHijoPasoCase.visible = true;
                            sobjectEstructuraHijoPasoCase.id = datahijoy.id;
                            sobjectEstructuraHijoPasoCase.rmdEstructuraPasoInsumoPasoId = datahijoy.rmdEstructuraPasoInsumoPasoId;
                            sobjectEstructuraHijoPasoCase.descripcion = datahijoy.descripcion;
                            sobjectEstructuraHijoPasoCase.vistoBueno = datahijoy.vistoBueno;
                            sobjectEstructuraHijoPasoCase.aplica = datahijoy.aplica === null ? true : datahijoy.aplica;
                            sobjectEstructuraHijoPasoCase.rmdEstructuraId_rmdEstructuraId = datay.rmdEstructuraId_rmdEstructuraId;
                            sobjectEstructuraHijoPasoCase.usuarioActualiza = datahijoy.usuarioActualiza;
                            sobjectEstructuraHijoPasoCase.fechaActualiza = datahijoy.fechaActualizaPaso;
                            aEstructuraEtiqueta.push(sobjectEstructuraHijoPasoCase);
                        });
                    });
                });

                $.each(aEstructuraEtiqueta, function (x, y) {
                    var tListInsumoHistorico = [];
                    if (y.estructura == "paso") {
                        tListInsumoHistorico = aListPasoHistorico.results.filter(item => item.pasoId_pasoId === y.id && item.rmdEstructuraId_rmdEstructuraId === y.rmdEstructuraId_rmdEstructuraId);
                    } else if (y.estructura == "receta") {
                        tListInsumoHistorico = aListPasoHistorico.results.filter(item => item.rmdEstructuraRecetaInsumoId_rmdEstructuraRecetaInsumoId === y.id && item.rmdEstructuraId_rmdEstructuraId === y.rmdEstructuraId_rmdEstructuraId);
                    } else if (y.estructura == "hijo") {
                        tListInsumoHistorico = aListPasoHistorico.results.filter(item => item.pasoHijoId_pasoId === y.id && item.rmdEstructuraId_rmdEstructuraId === y.rmdEstructuraId_rmdEstructuraId);
                    }

                    var tUltimoListInsumoHistorico = {};

                    if (tListInsumoHistorico.length > 0) {
                        tListInsumoHistorico.sort((a, b) => a.fechaRegistro.getTime() - b.fechaRegistro.getTime());
                        tUltimoListInsumoHistorico = tListInsumoHistorico[tListInsumoHistorico.length - 1];
                    }
                    y.historico = tListInsumoHistorico;
                    y.ultimaAccion = tUltimoListInsumoHistorico;
                });

                // oThat.modelGeneral.setProperty(model, aListObjectCase);
                oThat.modelGeneral.setProperty(model, aEstructuraEtiqueta);

            },

            getPasos: function (aListPaso, aListPasoHistorico, model) {
                var aListObjectCase = [];
                aListPaso.results = aListPaso.results.sort(function (a, b) {
                    return a.orden - b.orden;
                });
                aListPaso.results.forEach(e => {
                    var sobjectCase = {}
                    sobjectCase.oPaso = e;
                    sobjectCase.formato = e.formato === null ? false : e.formato;
                    sobjectCase.imagen = e.imagen === null ? false : e.imagen;
                    sobjectCase.pasoId = e.rmdEstructuraPasoId;
                    sobjectCase.description = e.pasoId.descripcion;
                    sobjectCase.margen = e.margen;
                    sobjectCase.decimales = e.decimales;
                    sobjectCase.fechaActualiza = e.fechaActualiza;
                    sobjectCase.usuarioActualiza = e.usuarioActualiza;
                    sobjectCase.rmdEstructuraId_rmdEstructuraId = e.rmdEstructuraId_rmdEstructuraId;
                    sobjectCase.tipodato = e.tipoDatoId_iMaestraId;
                    sobjectCase.depende = e.depende;
                    sobjectCase.estadoCC = e.estadoCC;
                    sobjectCase.valorInicial = e.valorInicial;
                    sobjectCase.valorFinal = e.valorFinal;
                    sobjectCase.styleUser = e.styleUser;
                    sobjectCase.rmdId_rmdId = e.rmdId_rmdId;
                    aListObjectCase.push(sobjectCase);
                });

                oThat.modelGeneral.setProperty(model, aListObjectCase);
            },

            getEquipos: function (aListEquipo, aListUtensilio, aListInsumoHistorico, aListTipo, model) {
                var aListObjectCase = [];
                var date = new Date();
                var time = date.getTime();
                var dateFormat = sap.ui.core.format.DateFormat.getDateInstance({ pattern: "dd-MM-YYYY HH:MM" });
                aListEquipo.results.sort((a, b) => a.orden - b.orden);

                aListEquipo.results.forEach(eq => {
                    var sobjectCase = {}
                    sobjectCase.Id = eq.rmdEstructuraEquipoId;
                    sobjectCase.tipoId_iMaestraId = "";
                    sobjectCase.description = "";
                    sobjectCase.code = "";
                    sobjectCase.rmdEstructuraId_rmdEstructuraId = eq.rmdEstructuraId_rmdEstructuraId;
                    sobjectCase.equipoId = eq.equipoId_equipoId;
                    var stateCalibracion = "None";
                    if (eq.equipoId) {
                        sobjectCase.tipoId_iMaestraId = eq.equipoId.tipoId_iMaestraId;
                        sobjectCase.description = eq.equipoId.eqktx;
                        sobjectCase.code = eq.equipoId.equnr;
                        sobjectCase.dateCalibracion = dateFormat.format(new Date(eq.equipoId.gstrp));
                        sobjectCase.descCalibracion = eq.equipoId.ktext;
                        if (eq.equipoId.gstrp.getTime() >= time) {
                            stateCalibracion = "Success";
                        } else {
                            stateCalibracion = 'Error';
                        }
                        sobjectCase.stateCalibracion = stateCalibracion;
                    }
                    sobjectCase.vistoBueno = eq.vistoBueno;
                    sobjectCase.aplica = eq.aplica === null ? true : eq.aplica;
                    sobjectCase.tipo = "EQUIPO";
                    sobjectCase.descriptionTipo = "";
                    sobjectCase.usuarioActualiza = eq.usuarioActualiza;

                    var tListInsumoHistorico = aListInsumoHistorico.results.filter(item => item.rmdEstructuraEquipoId_rmdEstructuraEquipoId === eq.rmdEstructuraEquipoId && item.rmdEstructuraId_rmdEstructuraId === eq.rmdEstructuraId_rmdEstructuraId);

                    // var tListInsumoHistorico = [];

                    var tUltimoListInsumoHistorico = {};

                    if (tListInsumoHistorico.length > 0) {
                        tListInsumoHistorico.sort((a, b) => a.fechaRegistro.getTime() - b.fechaRegistro.getTime());
                        tUltimoListInsumoHistorico = tListInsumoHistorico[tListInsumoHistorico.length - 1];
                    }

                    sobjectCase.historico = tListInsumoHistorico;
                    sobjectCase.ultimaAccion = tUltimoListInsumoHistorico;

                    /* type = tipoId expand
                     calification = viene de sap no hay campo*/
                    aListObjectCase.push(sobjectCase);
                });

                aListUtensilio.results.sort((a, b) => a.orden - b.orden);

                aListUtensilio.results.forEach(u => {
                    var sobjectCase = {}
                    sobjectCase.Id = u.rmdEstructuraUtensilioId;
                    sobjectCase.tipoId_iMaestraId = "";
                    sobjectCase.description = "";
                    sobjectCase.code = "";
                    sobjectCase.rmdEstructuraId_rmdEstructuraId = u.rmdEstructuraId_rmdEstructuraId;
                    if (u.utensilioId) {
                        sobjectCase.tipoId_iMaestraId = u.utensilioId.tipoId_iMaestraId;
                        sobjectCase.description = u.utensilioId.descripcion;
                        sobjectCase.code = u.utensilioId.codigo;
                    }
                    sobjectCase.vistoBueno = u.vistoBueno;
                    sobjectCase.tipo = "UTENSILIO";
                    sobjectCase.descriptionTipo = "";
                    sobjectCase.usuarioActualiza = u.usuarioActualiza;
                    sobjectCase.aplica = u.aplica;

                    // var tListInsumoHistorico = aListInsumoHistorico.results.filter(item => item.rmdEstructuraRecetaInsumoId_rmdEstructuraRecetaInsumoId === eq.rmdEstructuraRecetaInsumoId && item.rmdEstructuraId_rmdEstructuraId === eq.rmdEstructuraId_rmdEstructuraId);

                    var tListInsumoHistorico = [];

                    var tUltimoListInsumoHistorico = {};

                    if (tListInsumoHistorico.length > 0) {
                        tListInsumoHistorico.sort((a, b) => a.fechaRegistro.getTime() - b.fechaRegistro.getTime());
                        tUltimoListInsumoHistorico = tListInsumoHistorico[tListInsumoHistorico.length - 1];
                    }

                    sobjectCase.historico = tListInsumoHistorico;
                    sobjectCase.ultimaAccion = tUltimoListInsumoHistorico;
                    /* type = tipoId expand
                    calification = viene de sap no hay campo*/

                    aListObjectCase.push(sobjectCase);
                });


                aListTipo.results.forEach(val => {
                    aListObjectCase.forEach(eq => {
                        if (val.iMaestraId == eq.tipoId_iMaestraId) {
                            eq.descriptionTipo = val.contenido;
                        }
                    });
                });

                oThat.modelGeneral.setProperty(model, aListObjectCase);
            },

            onCancelMds: function (sobject) {
                this.onMds.close();
            },

            setUpdateRmd: async function (sobject) {
                var sUpdate;
                if(bInterneInit === true){
                    sUpdate = await registroService.updateStatusRmd(oThat.mainModelv2Online, "/RMD", sobject);
                }else{//OFFLINE MODEL
                    sUpdate = await registroService.updateStatusRmd(oThat.mainModelv2, "/RMD", sobject);
                }
                
            },

            onGetUsers: async function () {
                BusyIndicator.show(0);
                var oFilterUser = [];
                var oFilterCalificadoUser = [];
                var oFilterUserRol = [];
                var LineaActualMD = oThat.modelGeneral.getProperty("/LineaActualMD");

                oFilterUser.push(new Filter("rmdId_rmdId", FilterOperator.EQ, LineaActualMD.rmdId));
                oFilterUser.push(new Filter("rol", FilterOperator.EQ, "AUXILIAR"));
                oFilterCalificadoUser.push(new Filter("oMaestraNivel", FilterOperator.Contains, LineaActualMD.nivelTxt));
                oFilterUserRol.push(new Filter("oRol_rolId", FilterOperator.EQ, idRolAuxiliar));

                var aListUserRMD ,aListUserAbap ,aListUsersRol;
                if(bInterneInit === true){
                    aListUserRMD = await registroService.getDataFilter(oThat.mainModelv2Online, "/RMD_USUARIO", oFilterUser);
                    aListUserAbap = await registroService.getDataFilter(oThat.mainModelv2Online, "/USUARIO", oFilterCalificadoUser);
                    aListUsersRol = await registroService.getDataFilter(oThat.mainModelv2Online, "/UsuarioRol", oFilterUserRol);
                }else{//OFFLINE MODEL
                    aListUserRMD = await registroService.getDataFilter(oThat.mainModelv2, "/RMD_USUARIO", oFilterUser);
                    aListUserAbap = await registroService.getDataFilter(oThat.mainModelv2, "/USUARIO", oFilterCalificadoUser);
                    aListUsersRol = await registroService.getDataFilter(oThat.mainModelv2, "/UsuarioRol", oFilterUserRol);
                }

                var aListUserABAP = [];

                aListUserAbap.results.forEach(element => {
                    var ofindRMD = aListUserRMD.results.find(item => item.codigo === element.usuario);

                    if (!ofindRMD) {
                        aListUserABAP.push(element);
                    }
                });

                //Validar Rol Auxiliar
                var aListUserAbapRolAux = [];

                aListUserABAP.forEach(element => {
                    var ofindRol = aListUsersRol.results.find(item => item.oUsuario_usuarioId === element.usuarioId)

                    if (ofindRol) {
                        aListUserAbapRolAux.push(element);
                    }
                });
                
                oThat.modelGeneral.setProperty("/usuariosRmd", aListUserRMD.results);
                oThat.modelGeneral.setProperty("/usuariosAbap", aListUserAbapRolAux);

                oThat.modelGeneral.refresh(true);
                BusyIndicator.hide();
            },

            onAssignUser: function (oEvent) {
                var LineaActual = oEvent.getSource().getBindingContext("modelGeneral").getObject();
                oThat.modelGeneral.setProperty("/LineaActualMD", LineaActual);

                oThat.onGetUsers();
                if (!this.onListUser) {
                    this.onListUser = sap.ui.xmlfragment(
                        "frgListUser",
                        rootPath + ".view.dialog.ListUserAssign",
                        this
                    );
                    this.getView().addDependent(this.onListUser);
                }
                this.onListUser.open();

                sap.ui.core.Fragment.byId("frgListUser", "idtableUserRmd").removeSelections(true);
            },

            onRefreshUsers: function () {
                oThat.onGetUsers();
            },

            onSearchUsers: function (oEvent) {
                var filtroTablaUser = [];
                var sQuery = oEvent.getParameter("query");
                var oDataFilter = this.getView().getModel("oDataFilter");
                var aFilter = [];
                if (oDataFilter.getData().code) {
                    aFilter.push(
                        new Filter(
                            "usuario",
                            FilterOperator.Contains,
                            oDataFilter.getData().code
                        )
                    );
                }
                if (oDataFilter.getData().name) {
                    aFilter.push(
                        new Filter(
                            "nombre",
                            FilterOperator.Contains,
                            oDataFilter.getData().name
                        )
                    );
                }
                if (oDataFilter.getData().planta) {
                    aFilter.push(
                        new Filter(
                            "oMaestraSucursal_codigo",
                            FilterOperator.Contains,
                            oDataFilter.getData().codePlanta
                        )
                    );
                }
                if (oDataFilter.getData().area) {
                    aFilter.push(
                        new Filter(
                            "seccionId",
                            FilterOperator.Contains,
                            oDataFilter.getData().area
                        )
                    );
                }
                // if (sQuery !== "") {
                //     var oFilter = new Filter({
                //         filters: [
                //         (new Filter("codigo", FilterOperator.Contains, sQuery)),
                //         (new Filter("nombre", FilterOperator.Contains, sQuery))
                //         ]
                //     });
                //     filtroTablaUser.push(oFilter);
                // }

                var tablaUser = sap.ui.core.Fragment.byId("frgAddUser", "idTableUsersABAP");
                var binding = tablaUser.getBinding("items");
                binding.filter(aFilter);

                oThat.modelGeneral.refresh(true);
            },

            onAddUsers: function () {
                var table = sap.ui.core.Fragment.byId("frgAddUser", "idTableUsersABAP");
                var rowItems = table.getSelectedItems();
                var aObject = {};
                var aObjectList = [];
                var LineaActualRMD = oThat.modelGeneral.getProperty("/LineaActualRMD");
                var LineaActualMD = oThat.modelGeneral.getProperty("/LineaActualMD");

                if (rowItems.length === 0) {
                    MessageBox.warning("Debe seleccionar al menos un auxiliar.");
                    return;
                }

                BusyIndicator.show(0);
                if (LineaActualMD.rmdId === "") {
                    aObject.terminal = null;
                    //aObject.usuarioRegistro = "USUARIOTEST";
                    aObject.usuarioRegistro = oInfoUsuario.data.usuario;
                    aObject.fechaRegistro = new Date();
                    aObject.activo = true;
                    aObject.rmdId = util.onGetUUIDV4();
                    aObject.ordenSAP = LineaActualRMD.Aufnr;
                    aObject.centro = LineaActualRMD.Pwerk;
                    aObject.etapa = LineaActualRMD.Dauat;
                    aObject.vte = LineaActualRMD.vte
                    aObject.productoId = LineaActualRMD.Matnr;
                    aObject.descripcion = LineaActualRMD.Maktx;
                    aObject.lote = LineaActualRMD.Charg;
                    aObject.fechaInicio = new Date();
                    aObject.expira = LineaActualRMD.VfdatBTP;
                    aObject.mdId_mdId = LineaActualMD.mdId;
                    aObject.estadoIdOP = LineaActualRMD.estadoIdOP;
                    aObject.areaRmdTxt = LineaActualMD.areaRmdTxt;
                    aObject.aUsuarioRmd = [];
                    aObject.fraccion = 1;
                    aObject.dauart = LineaActualRMD.Dauat;
                    aObject.lgort = LineaActualRMD.Lgort;
                    aObject.posnr = LineaActualRMD.Posnr;
                    aObject.stats = LineaActualRMD.Stats;
                    aObject.verid = LineaActualRMD.Verid;
                    if (LineaActualRMD.Vfdat !== null) {
                        let fechaExpira = LineaActualRMD.Vfdat.split("(")[1].split(")")[0];
                        LineaActualRMD.VfdatBTP = new Date(Number(fechaExpira));
                        aObject.vfdat = LineaActualRMD.VfdatBTP;
                    }
                    aObject.vfmng = LineaActualRMD.Vfmng;
                    aObject.Sbmng = LineaActualRMD.Sbmng;
                    aObject.Sbmeh = LineaActualRMD.Sbmeh;
                    aObject.Amein = LineaActualRMD.Amein;
                    aObject.Psmng = LineaActualRMD.Psmng;
                    aObject.Umrez1 = LineaActualRMD.Umrez1;
                    aObject.Umrez2 = LineaActualRMD.Umrez2;
                    for (var i = 0; i < rowItems.length; i++) {
                        let infoUser = rowItems[i].getBindingContext("modelGeneral").getObject();
                        var v_user = {};
                        v_user.terminal = null;
                        //v_user.usuarioRegistro = "USUARIOTEST";
                        v_user.usuarioRegistro = oInfoUsuario.data.usuario;
                        v_user.fechaRegistro = new Date();
                        v_user.activo = true;
                        v_user.rmdUsuarioId = util.onGetUUIDV4();
                        v_user.rmdId_rmdId = aObject.rmdId;
                        v_user.codigo = rowItems[i].mAggregations.cells[0].getProperty("text");
                        v_user.nombre = rowItems[i].mAggregations.cells[1].getProperty("text");
                        v_user.rol = "AUXILIAR";
                        v_user.usuarioId_usuarioId = infoUser.usuarioId;
                        aObject.aUsuarioRmd.push(v_user)
                    }

                    if(bInterneInit === true){
                        registroService.createData(oThat.mainModelv2Online, "/RMD", aObject).then(function () {
                            oThat.modelGeneral.setProperty("/LineaActualMD/rmdId", aObject.rmdId);
                            oThat.onAddUser.close();
                            oThat.onGetUsers();
                            oThat.onMdList(LineaActualRMD);
                            BusyIndicator.hide();
                            MessageBox.success("Se registraron correctamente los usuarios seleccionados.")
                        }.bind(oThat), function (error) {
                            MessageBox.error("Ocurrió un error al registrar los usuarios seleccionados.");
                            BusyIndicator.hide();
                        });;
                    }else{//OFFLINE MODEL
                        registroService.createData(oThat.mainModelv2, "/RMD", aObject).then(function () {
                            oThat.modelGeneral.setProperty("/LineaActualMD/rmdId", aObject.rmdId);
                            oThat.onAddUser.close();
                            oThat.onGetUsers();
                            oThat.onMdList(LineaActualRMD);
                            BusyIndicator.hide();
                            MessageBox.success("Se registraron correctamente los usuarios seleccionados.")
                        }.bind(oThat), function (error) {
                            MessageBox.error("Ocurrió un error al registrar los usuarios seleccionados.");
                            BusyIndicator.hide();
                        });;
                    }
                    
                } else {
                    for (var i = 0; i < rowItems.length; i++) {
                        let infoUser = rowItems[i].getBindingContext("modelGeneral").getObject();
                        var v_user = {};
                        v_user.terminal = null;
                        //v_user.usuarioRegistro = "USUARIOTEST";
                        v_user.usuarioRegistro = oInfoUsuario.data.usuario;
                        v_user.fechaRegistro = new Date();
                        v_user.activo = true;
                        v_user.rmdUsuarioId = util.onGetUUIDV4();
                        v_user.rmdId_rmdId = LineaActualMD.rmdId;
                        v_user.codigo = rowItems[i].mAggregations.cells[0].getProperty("text");
                        v_user.nombre = rowItems[i].mAggregations.cells[1].getProperty("text");
                        v_user.rol = "AUXILIAR";
                        v_user.usuarioId_usuarioId = infoUser.usuarioId;
                        aObjectList.push(v_user)
                    }

                    if(bInterneInit === true){
                        registroService.createMultipleUsersFunction(oThat.mainModelv2Online, aObjectList).then(function () {
                            oThat.onAddUser.close();
                            oThat.onMdList(LineaActualRMD);
                            oThat.onGetUsers();
                            BusyIndicator.hide();
                            MessageBox.success("Se registraron correctamente los usuarios seleccionados.")
                        }.bind(oThat), function (error) {
                            MessageBox.error("Ocurrió un error al registrar los usuarios seleccionados.");
                            BusyIndicator.hide();
                        });;
                    }else{//OFFLINE MODEL
                        registroService.createMultipleUsersFunction(oThat.mainModelv2, aObjectList).then(function () {
                            oThat.onAddUser.close();
                            oThat.onMdList(LineaActualRMD);
                            oThat.onGetUsers();
                            BusyIndicator.hide();
                            MessageBox.success("Se registraron correctamente los usuarios seleccionados.")
                        }.bind(oThat), function (error) {
                            MessageBox.error("Ocurrió un error al registrar los usuarios seleccionados.");
                            BusyIndicator.hide();
                        });;
                    }
                    
                }
            },

            onDeleteUsers: async function () {
                var table = sap.ui.core.Fragment.byId("frgListUser", "idtableUserRmd");
                var rowItems = table.getSelectedItems();

                if (rowItems.length === 0) {
                    MessageBox.warning("Debe seleccionar al menos un usuario asignado.");
                    return;
                }
                BusyIndicator.show(0);
                for (var i = 0; i < rowItems.length; i++) {
                    var sobject = {};
                    var linea = rowItems[i].getBindingContext("modelGeneral").getObject();

                    sobject.activo = false;
                    sobject.fechaActualiza = new Date();
                    //sobject.usuarioActualiza = "USUARIOTEST";
                    sobject.usuarioActualiza = oInfoUsuario.data.usuario;
                    sobject.rmdUsuarioId = linea.rmdUsuarioId;

                    if(bInterneInit === true){
                        await registroService.updateUserMrd(oThat.mainModelv2Online, "/RMD_USUARIO", sobject);
                    }else{//OFFLINE MODEL
                        await registroService.updateUserMrd(oThat.mainModelv2, "/RMD_USUARIO", sobject);
                    }

                }

                oThat.onListUser.close();
                oThat.onOrdenesABAP();
                MessageBox.success("Se eliminaron correctamente los usuarios seleccionados.");
                BusyIndicator.hide();
            },

            onCancelListUser: function () {
                this.onListUser.close();
            },

            onAddUserToAssign: function () {
                if (!this.onAddUser) {
                    this.onAddUser = sap.ui.xmlfragment(
                        "frgAddUser",
                        rootPath + ".view.dialog.AssignUser",
                        this
                    );
                    this.getView().addDependent(this.onAddUser);
                }
                this.onAddUser.open();
                sap.ui.core.Fragment.byId("frgAddUser", "idTableUsersABAP").removeSelections(true);
            },

            onCancelAddUser: function () {
                this.onAddUser.close();
            },

            onAssignCorrect: function () {
                MessageBox.success(oThat.getView().getModel("i18n").getResourceBundle().getText("successAssignUser"));
            },

            onDeleteUser: function () {
                this.onCancelListUser();
                MessageBox.success(oThat.getView().getModel("i18n").getResourceBundle().getText("successDeleteUser"));
            },

            onGetPdfViewerOpp: function () {
                var oBundle = this.getView().getModel("i18n").getResourceBundle();
                var sTitle = oBundle.getText("tltPdfOpp");
                var LineaActual = oThat.modelGeneral.getProperty("/LineaActualRMD");
                var base64EncodedPDF = LineaActual.Pdf64;

                var decodedPdfContent = atob(base64EncodedPDF);
                var byteArray = new Uint8Array(decodedPdfContent.length)
                for (var i = 0; i < decodedPdfContent.length; i++) {
                    byteArray[i] = decodedPdfContent.charCodeAt(i);
                }
                var blob = new Blob([byteArray.buffer], { type: 'application/pdf' });
                // var _pdfurl = URL.createObjectURL(blob);

                // this._PDFViewer = new sap.m.PDFViewer({
                //     title: sTitle,
                //     width: "auto",
                //     source: _pdfurl // my blob url
                // });
                // jQuery.sap.addUrlWhitelist("blob"); // register blob url as whitelist
                // this._PDFViewer.open();
                const downloadFile = (blob, fileName) => {
                    const link = document.createElement('a');
                    // create a blobURI pointing to our Blob
                    link.href = URL.createObjectURL(blob);
                    link.download = fileName;
                    // some browser needs the anchor to be in the doc
                    document.body.append(link);
                    link.click();
                    link.remove();
                    // in case the Blob uses a lot of memory
                    setTimeout(() => URL.revokeObjectURL(link.href), 7000);
                  };
                  
                  
                downloadFile(blob, sTitle);

                // if (!this.onPdfViewerOpp) {
                //   this.onPdfViewerOpp = sap.ui.xmlfragment(
                //     "frgPdfViewerOpp",
                //     rootPath + ".view.dialog.PDFViewerOpp",
                //     this
                //   );
                //   this.getView().addDependent(this.onPdfViewerOpp);
                // }

                // this.onPdfViewerOpp.open();
            },

            onCancelPDFViewerOpp: function () {
                this.onPdfViewerOpp.close();
            },

            //   onGetPdfViewerRmo: function () {
            //     if (!this.onPdfViewerRmo) {
            //       this.onPdfViewerRmo = sap.ui.xmlfragment(
            //         "frgPdfViewerRmo",
            //         rootPath + ".view.dialog.PDFViewerRmo",
            //         this
            //       );
            //       this.getView().addDependent(this.onPdfViewerRmo);
            //     }

            //     this.onPdfViewerRmo.open();
            //   },

            //   onCancelPdfViewerRmo: function () {
            //     this.onPdfViewerRmo.close();
            //   },

            onGenerateReProcess: function (oEvent) {
                let lineaSeleccionada = oEvent.getSource().getBindingContext("modelGeneral").getObject();
                MessageBox.confirm(
                    oThat.getView().getModel("i18n").getResourceBundle().getText("confirmReprocess"), {
                    styleClass: "sapUiSizeCompact",
                    actions: [MessageBox.Action.YES, MessageBox.Action.NO],
                    onClose: async function (oAction) {
                        if (oAction === "YES") {
                            BusyIndicator.show(0);
                            let aFilter = [];
                            aFilter.push(new Filter("rmdId", "EQ", lineaSeleccionada.rmdId));
                            let sExpand = "aUsuarioRmd";
                            let aRMD;
                            if(bInterneInit === true){
                                aRMD = await registroService.onGetDataGeneralFiltersExpand(oThat.mainModelv2Online, "RMD", aFilter, sExpand);
                            }else{//OFFLINE MODEL
                                aRMD = await registroService.onGetDataGeneralFiltersExpand(oThat.mainModelv2, "RMD", aFilter, sExpand);
                            }
                            
                            let oRMD = aRMD.results[0];
                            let fechaExpira;
                            oRMD.VfdatBTP = null;
                            if (oRMD.Vfdat !== null) {
                                fechaExpira = oRMD.Vfdat.split("(")[1].split(")")[0];
                                oRMD.VfdatBTP = new Date(Number(fechaExpira));
                            }
                            let oParam = {
                                usuarioRegistro: oInfoUsuario.data.usuario,
                                fechaRegistro: new Date(),
                                activo: true,
                                rmdId: util.onGetUUIDV4(),
                                fraccion: 1,
                                codigo: oRMD.codigo,
                                ordenSAP: oRMD.ordenSAP,
                                centro: oRMD.centro,
                                etapa: oRMD.etapa,
                                vte: oRMD.vte,
                                productoId: oRMD.productoId,
                                descripcion: oRMD.descripcion + "(Reproceso)",
                                lote: oRMD.lote,
                                expira: oRMD.expira,
                                estadoIdOP: oRMD.estadoIdOP,
                                mdId_mdId: oRMD.mdId_mdId,
                                estadoIdRmd_iMaestraId: idEstadoHabilitado,
                                fechaInicio: new Date(),
                                dauart: oRMD.Dauat,
                                lgort: oRMD.Lgort,
                                posnr: oRMD.Posnr,
                                stats: oRMD.Stats,
                                verid: oRMD.Verid,
                                vfdat: oRMD.VfdatBTP,
                                vfmng: oRMD.Vfmng,
                                Sbmng: oRMD.Sbmng,
                                Sbmeh: oRMD.Sbmeh,
                                Amein: oRMD.Amein,
                                Psmng: oRMD.Psmng,
                                Umrez1: oRMD.Umrez1,
                                Umrez2: oRMD.Umrez2,
                                aUsuarioRmd: []
                            }
                            oRMD.aUsuarioRmd.results.forEach(function (oUsuario) {
                                let oObjUsuario = {
                                    usuarioRegistro: oInfoUsuario.data.usuario,
                                    fechaRegistro: new Date(),
                                    activo: true,
                                    rmdUsuarioId: util.onGetUUIDV4(),
                                    rmdId_rmdId: oParam.rmdId,
                                    codigo: oUsuario.codigo,
                                    nombre: oUsuario.nombre,
                                    rol: oUsuario.rol,
                                    usuarioId_usuarioId: oUsuario.usuarioId_usuarioId
                                }
                                oParam.aUsuarioRmd.push(oObjUsuario);
                            });
                            if(bInterneInit === true){
                                await registroService.createData(oThat.mainModelv2Online, "/RMD", oParam);
                            }else{//OFFLINE MODEL
                                await registroService.createData(oThat.mainModelv2, "/RMD", oParam);
                            }
                            
                            await oThat.createEstructura(lineaSeleccionada, oParam, oParam.fraccion);
                            BusyIndicator.hide();
                            MessageBox.success(oThat.getView().getModel("i18n").getResourceBundle().getText("successReprocess"));
                        }
                    }
                });
            },

            onGenerateParcial: function (oEvent) {
                let lineaSeleccionada = oEvent.getSource().getBindingContext("modelGeneral").getObject();
                MessageBox.confirm(
                    oThat.getView().getModel("i18n").getResourceBundle().getText("confirmParcial"), {
                    styleClass: "sapUiSizeCompact",
                    actions: [MessageBox.Action.YES, MessageBox.Action.NO],
                    onClose: async function (oAction) {
                        if (oAction === "YES") {
                            BusyIndicator.show(0);
                            let aFilter = [];
                            aFilter.push(new Filter("rmdId", "EQ", lineaSeleccionada.rmdId));
                            let sExpand = "aUsuarioRmd";
                            let aRMD;
                            if(bInterneInit === true){
                                aRMD = await registroService.onGetDataGeneralFiltersExpand(oThat.mainModelv2Online, "RMD", aFilter, sExpand);
                            }else{//OFFLINE MODEL
                                aRMD = await registroService.onGetDataGeneralFiltersExpand(oThat.mainModelv2, "RMD", aFilter, sExpand);
                            }
                            
                            let oRMD = aRMD.results[0];
                            let fechaExpira;
                            oRMD.VfdatBTP = null;
                            if (oRMD.Vfdat !== null) {
                                fechaExpira = oRMD.Vfdat.split("(")[1].split(")")[0];
                                oRMD.VfdatBTP = new Date(Number(fechaExpira));
                            }
                            let oParam = {
                                usuarioRegistro: oInfoUsuario.data.usuario,
                                fechaRegistro: new Date(),
                                activo: true,
                                rmdId: util.onGetUUIDV4(),
                                fraccion: 1,
                                codigo: oRMD.codigo,
                                ordenSAP: oRMD.ordenSAP,
                                centro: oRMD.centro,
                                etapa: oRMD.etapa,
                                vte: oRMD.vte,
                                productoId: oRMD.productoId,
                                descripcion: oRMD.descripcion,
                                lote: oRMD.lote,
                                expira: oRMD.expira,
                                estadoIdOP: oRMD.estadoIdOP,
                                mdId_mdId: oRMD.mdId_mdId,
                                estadoIdRmd_iMaestraId: idEstadoHabilitado,
                                fechaInicio: new Date(),
                                dauart: oRMD.Dauat,
                                lgort: oRMD.Lgort,
                                posnr: oRMD.Posnr,
                                stats: oRMD.Stats,
                                verid: oRMD.Verid,
                                vfdat: oRMD.VfdatBTP,
                                vfmng: oRMD.Vfmng,
                                Sbmng: oRMD.Sbmng,
                                Sbmeh: oRMD.Sbmeh,
                                Amein: oRMD.Amein,
                                Psmng: oRMD.Psmng,
                                Umrez1: oRMD.Umrez1,
                                Umrez2: oRMD.Umrez2,
                                aUsuarioRmd: []
                            }
                            oRMD.aUsuarioRmd.results.forEach(function (oUsuario) {
                                let oObjUsuario = {
                                    usuarioRegistro: oInfoUsuario.data.usuario,
                                    fechaRegistro: new Date(),
                                    activo: true,
                                    rmdUsuarioId: util.onGetUUIDV4(),
                                    rmdId_rmdId: oParam.rmdId,
                                    codigo: oUsuario.codigo,
                                    nombre: oUsuario.nombre,
                                    rol: oUsuario.rol,
                                    usuarioId_usuarioId: oUsuario.usuarioId_usuarioId
                                }
                                oParam.aUsuarioRmd.push(oObjUsuario);
                            });
                            if(bInterneInit === true){
                                await registroService.createData(oThat.mainModelv2Online, "/RMD", oParam);
                            }else{//OFFLINE MODEL
                                await registroService.createData(oThat.mainModelv2, "/RMD", oParam);
                            }
                            
                            await oThat.createEstructura(lineaSeleccionada, oParam, oParam.fraccion);
                            BusyIndicator.hide();
                            MessageBox.success(oThat.getView().getModel("i18n").getResourceBundle().getText("successParcial"));
                        }
                    }
                });
            },

            onListFraction: async function () {
                var oFilterMd = [],
                    oFilterRmd = [];
                // let sExpand = "estadoIdRmd";

                oThat.onMds.close();

                var LineaActual = oThat.modelGeneral.getProperty("/LineaActualMD");

                // oFilterRmd.push(new Filter("productoId", FilterOperator.EQ, LineaActual.productoId));
                // oFilterRmd.push(new Filter("mdId_mdId", FilterOperator.EQ, LineaActual.mdId));
                oFilterRmd.push(new Filter("rmdId", FilterOperator.EQ, LineaActual.rmdId));
                let aListRMD;
                if(bInterneInit === true){
                    aListRMD = await registroService.getDataFilter(oThat.mainModelv2Online, "/RMD", oFilterRmd);
                }else{//OFFLINE MODEL
                    aListRMD = await registroService.getDataFilter(oThat.mainModelv2, "/RMD", oFilterRmd);
                }
                
                let sUltimaFraccion = aListRMD.results[0].fraccion;
                // aListRMD.results = aListRMD.results.sort(function (a, b) {
                //     return a.fraccion - b.fraccion;
                // });


                if (sUltimaFraccion > 1) {
                    let aListFracciones = [];
                    for (let i = 0; i < sUltimaFraccion; i++) {
                        let obj = {
                            rmdId : LineaActual.rmdId,
                            fraccion : i + 1
                        }
                        aListFracciones.push(obj);
                    }
                    oThat.modelGeneral.setProperty("/cmbFraction", aListFracciones);

                    if (!this.onFraction) {
                        this.onFraction = sap.ui.xmlfragment(
                            "frgFraction",
                            rootPath + ".view.dialog.ListFraction",
                            this
                        );
                        this.getView().addDependent(this.onFraction);
                    }

                    this.onFraction.open();
                } else {
                    oThat.onMds.close();
                    BusyIndicator.show(0);
                    await oThat.getEstructurasRmdRefactory(1);
                    BusyIndicator.hide();
                    oThat.onRouteDetailView();
                }

            },

            onCancelFraction: function () {
                this.onFraction.close();
            },

            onSelectFraccion: function (oEvent) {
                let oSource = oEvent.getSource();
                let selectItem = oSource.getSelectedItem();
                let value = oSource.getValue();
                if (value) {
                    if (!selectItem) {
                        MessageBox.error(oThat.getView().getModel("i18n").getResourceBundle().getText("errorRmdSelected"));
                        oSource.setValue("");
                        oThat.modelGeneral.setProperty("/selectFraccionRmdId", "");
                        oThat.modelGeneral.refresh(true);
                        return;
                    }

                    if (selectItem.getKey() == "") {
                        oThat.modelGeneral.setProperty("/selectFraccionRmdId", "");
                    } else {
                        oThat.modelGeneral.setProperty("/selectFraccionRmdId", value);
                    }
                }

            },

            onConfirmFraction: async function () {
                //OFFLINE CAMBIO
                    // if(bInterneInit == true){
                    //     var RmdId  = oThat.getOwnerComponent().getModel("asociarDatos").getData().rmdId;
                    //     var oDataRmdId = [];
                        
                    //     oDataRmdId.push(RmdId);
                    //     sap.hybrid.openStoreRegister(oDataRmdId);
                    // }
                //

                let selectFraccion = oThat.modelGeneral.getProperty("/selectFraccionRmdId");
                BusyIndicator.show(0);
                await oThat.getEstructurasRmdRefactory(parseInt(selectFraccion));
                BusyIndicator.hide();
                oThat.onRouteDetailView();
            },
            
            setEstructurasRmdProcesos: async function (LineaActual) {
                var oFilter = [];

                oFilter.push(new Filter("mdId_mdId", FilterOperator.EQ, LineaActual.mdId));
                var aListEstructura , aListPaso ,aListEquipo,aListUtensilio,aListEspecificacion,aListReceta,aListInsumo ,aListEtiqueta,aListPasoInsumoPaso;

                if(bInterneInit === true){
                    aListEstructura = await registroService.getDataFilter(oThat.mainModelv2Online, "/MD_ESTRUCTURA", oFilter);
                    aListPaso = await registroService.getDataFilter(oThat.mainModelv2Online, "/MD_ES_PASO", oFilter);
                    aListEquipo = await registroService.getDataFilter(oThat.mainModelv2Online, "/MD_ES_EQUIPO", oFilter);
                    aListUtensilio = await registroService.getDataFilter(oThat.mainModelv2Online, "/MD_ES_UTENSILIO", oFilter);
                    aListEspecificacion = await registroService.getDataFilter(oThat.mainModelv2Online, "/MD_ES_ESPECIFICACION", oFilter);
                    aListReceta = await registroService.getDataFilter(oThat.mainModelv2Online, "/MD_RECETA", oFilter);
                    aListInsumo = await registroService.getDataFilter(oThat.mainModelv2Online, "/MD_ES_RE_INSUMO", oFilter);
                    aListEtiqueta = await registroService.getDataFilter(oThat.mainModelv2Online, "/MD_ES_ETIQUETA", oFilter);
                    aListPasoInsumoPaso = await registroService.getDataFilter(oThat.mainModelv2Online, "/MD_ES_PASO_INSUMO_PASO", oFilter);
                }else{//OFFLINE MODEL
                    aListEstructura = await registroService.getDataFilter(oThat.mainModelv2, "/MD_ESTRUCTURA", oFilter);
                    aListPaso = await registroService.getDataFilter(oThat.mainModelv2, "/MD_ES_PASO", oFilter);
                    aListEquipo = await registroService.getDataFilter(oThat.mainModelv2, "/MD_ES_EQUIPO", oFilter);
                    aListUtensilio = await registroService.getDataFilter(oThat.mainModelv2, "/MD_ES_UTENSILIO", oFilter);
                    aListEspecificacion = await registroService.getDataFilter(oThat.mainModelv2, "/MD_ES_ESPECIFICACION", oFilter);
                    aListReceta = await registroService.getDataFilter(oThat.mainModelv2, "/MD_RECETA", oFilter);
                    aListInsumo = await registroService.getDataFilter(oThat.mainModelv2, "/MD_ES_RE_INSUMO", oFilter);
                    aListEtiqueta = await registroService.getDataFilter(oThat.mainModelv2, "/MD_ES_ETIQUETA", oFilter);
                    aListPasoInsumoPaso = await registroService.getDataFilter(oThat.mainModelv2, "/MD_ES_PASO_INSUMO_PASO", oFilter);
                }

                var sobject = {};
                sobject.terminal = null;
                //sobject.usuarioRegistro = "USUARIOTEST";
                sobject.usuarioRegistro = oInfoUsuario.data.usuario;
                sobject.fechaRegistro = new Date();
                sobject.activo = true;
                sobject.aEstructura = [];
                sobject.aPaso = [];
                sobject.aEquipo = [];
                sobject.aUtensilio = [];
                sobject.aEspecificacion = [];
                sobject.aReceta = [];
                sobject.aInsumo = [];
                sobject.aEtiqueta = [];
                sobject.aPasoInsumoPaso = [];
                sobject.Id = util.onGetUUIDV4();

                aListEstructura.results.forEach(element => {

                    var tListPaso = aListPaso.results.filter(item => item.mdId_mdId === element.mdId_mdId && item.estructuraId_estructuraId === element.estructuraId_estructuraId);
                    var tListEquipo = aListEquipo.results.filter(item => item.mdId_mdId === element.mdId_mdId && item.estructuraId_estructuraId === element.estructuraId_estructuraId);
                    var tListUtensilio = aListUtensilio.results.filter(item => item.mdId_mdId === element.mdId_mdId && item.estructuraId_estructuraId === element.estructuraId_estructuraId);
                    var tListEspecificacion = aListEspecificacion.results.filter(item => item.mdId_mdId === element.mdId_mdId && item.estructuraId_estructuraId === element.estructuraId_estructuraId);
                    var tListInsumo = aListInsumo.results.filter(item => item.mdId_mdId === element.mdId_mdId && item.estructuraId_estructuraId === element.estructuraId_estructuraId);
                    var tListEtiqueta = aListEtiqueta.results.filter(item => item.mdId_mdId === element.mdId_mdId && item.estructuraId_estructuraId === element.estructuraId_estructuraId);
                    var tListPasoInsumoPaso = aListPasoInsumoPaso.results.filter(item => item.mdId_mdId === element.mdId_mdId && item.estructuraId_estructuraId === element.estructuraId_estructuraId);


                    delete element["mdEstructuraId"];
                    delete element["estructuraId"];
                    delete element["mdId"];
                    delete element["mdId_mdId"];
                    delete element["__metadata"];

                    var sobjectEs = element;
                    sobjectEs.terminal = null;
                    sobjectEs.fechaActualiza = null;
                    sobjectEs.usuarioActualiza = null;
                    //sobjectEs.usuarioRegistro = "USUARIOTEST";
                    sobjectEs.usuarioRegistro = oInfoUsuario.data.usuario;
                    sobjectEs.fechaRegistro = new Date();
                    sobjectEs.activo = true;

                    // sobjectEs.rmdEstructuraId = util.onGetUUIDV4();
                    sobjectEs.rmdEstructuraId = "b0686a97-7fa4-4b6a-9e77-da37a97e503f";
                    sobjectEs.rmdId_rmdId = LineaActual.rmdId;

                    sobject.aEstructura = [];

                    // sobject.aEstructura.push(sobjectEs);

                    // tListEtiqueta.forEach(element => {
                    //     delete element["mdId"];
                    //     delete element["mdId_mdId"];
                    //     delete element["estructuraId"];
                    //     delete element["estructuraId_estructuraId"];
                    //     delete element["mdEsEtiquetaId"];
                    //     delete element["__metadata"];

                    //     var sobjectE = element;
                    //     sobjectE.terminal           = null;
                    //     sobjectE.fechaActualiza     = null;
                    //     sobjectE.usuarioActualiza   = null;
                    //     sobjectE.usuarioRegistro    = "USUARIOTEST";
                    //     sobjectE.fechaRegistro      = new Date();
                    //     sobjectE.activo             = true;

                    //     sobjectE.rmdEsEtiquetaId = util.onGetUUIDV4();
                    //     sobjectE.rmdEstructuraId_rmdEstructuraId = sobjectEs.rmdEstructuraId;
                    //     sobjectE.rmdId_rmdId = LineaActual.rmdId;
                    //     // sobjectI.aplica = true;

                    //     sobject.aEtiqueta.push(sobjectE);
                    // });

                    // tListPasoInsumoPaso.forEach(element => {
                    //     var rmdEstructuraRecetaInsumoId = element.estructuraRecetaInsumoId_estructuraRecetaInsumoId;
                    //     delete element["mdId"];
                    //     delete element["mdId_mdId"];
                    //     delete element["estructuraId"];
                    //     delete element["estructuraId_estructuraId"];
                    //     delete element["mdEstructuraPasoInsumoPasoId"];
                    //     delete element["estructuraRecetaInsumoId_estructuraRecetaInsumoId"];
                    //     delete element["estructuraRecetaInsumoId"];
                    //     delete element["__metadata"];

                    //     var sobjectPasIns = element;
                    //     sobjectPasIns.terminal           = null;
                    //     sobjectPasIns.fechaActualiza     = null;
                    //     sobjectPasIns.usuarioActualiza   = null;
                    //     sobjectPasIns.usuarioRegistro    = "USUARIOTEST";
                    //     sobjectPasIns.fechaRegistro      = new Date();
                    //     sobjectPasIns.activo             = true;
                    //     sobjectPasIns.aplica             = true;

                    //     sobjectPasIns.rmdEstructuraPasoInsumoPasoId = util.onGetUUIDV4();
                    //     sobjectPasIns.rmdEstructuraId_rmdEstructuraId = sobjectEs.rmdEstructuraId;
                    //     sobjectPasIns.rmdEstructuraRecetaInsumoId_rmdEstructuraRecetaInsumoId = rmdEstructuraRecetaInsumoId;
                    //     sobjectPasIns.rmdId_rmdId = LineaActual.rmdId;
                    //     // sobjectI.aplica = true;

                    //     sobject.aPasoInsumoPaso.push(sobjectPasIns);
                    // });

                });
                if(bInterneInit === true){
                    registroService.createData(oThat.mainModelv2Online, "/RMD_ESTRUCTURA_SKIP", sobject).then(function () {
                        oThat.getEstructurasRmd(LineaActual);
                    }.bind(oThat), function (error) {
                        MessageBox.error("Ocurrió un error al registrar las estructuras RMD seleccionados.");
                        BusyIndicator.hide();
                    });
                }else{ //OFFLINE MODEL
                    registroService.createData(oThat.mainModelv2, "/RMD_ESTRUCTURA_SKIP", sobject).then(function () {
                        oThat.getEstructurasRmd(LineaActual);
                    }.bind(oThat), function (error) {
                        MessageBox.error("Ocurrió un error al registrar las estructuras RMD seleccionados.");
                        BusyIndicator.hide();
                    });
                }
               
            },
            _groupBy: function (array, groups, valueKey) {
                var map = new Map;
                groups = [].concat(groups);
                return array.reduce((r, o) => {
                    groups.reduce((m, k, i, {
                        length
                    }) => {
                        var child;
                        if (m.has(o[k])) return m.get(o[k]);
                        if (i + 1 === length) {
                            child = Object.assign(...groups.map(k => ({
                                [k]: o[k]
                            })), {
                                [valueKey]: 0
                            });
                            r.push(child);
                        } else {
                            child = new Map;
                        }
                        m.set(o[k], child);
                        return child;
                    }, map)[valueKey] += +o[valueKey];
                    return r;
                }, [])
            },
            onChangePlanta: function (oEvent) {
                var oCodigoSelected = oEvent.getSource().getSelectedItem().getProperty("additionalText");
                var oDataFilter = oThat.getView().getModel("oDataFilter");
                oDataFilter.getData().codePlanta = oCodigoSelected;
                oDataFilter.refresh(true);
                var oFilter = [];
                oFilter.push(new Filter("Werks", 'EQ', oCodigoSelected));
                return new Promise(function (resolve, reject) {
                    sap.ui.core.BusyIndicator.show(0);

                    // registroService.getDataAjaxFilter(oCodigoSelected).then(function (oListArea) {
                    //     oThat.modelGeneral.setProperty("/aListaSecciones", oListArea);
                    //     sap.ui.core.BusyIndicator.hide();
                    // }).catch(function (oError) {
                    //     console.log(oError);
                    //     sap.ui.core.BusyIndicator.hide();
                    // })
                    //OFFLINE se cambia ajax por modelo para las peticiones
                    if(bInterneInit === true){
                        registroService.getDataFilter(oThat.modelProduccionOnline,"/ProduccionSet",oFilter).then(function (oListArea){
                            oThat.modelGeneral.setProperty("/aListaSecciones", oListArea.results);
                            sap.ui.core.BusyIndicator.hide();
                        }).catch(function(oError){
                            console.log(oError);
                            sap.ui.core.BusyIndicator.hide();
                        });
                    }else{//OFFLINE MODEL
                        registroService.getDataFilter(oThat.modelProduccion,"/ProduccionSet",oFilter).then(function (oListArea){
                            oThat.modelGeneral.setProperty("/aListaSecciones", oListArea.results);
                            sap.ui.core.BusyIndicator.hide();
                        }).catch(function(oError){
                            console.log(oError);
                            sap.ui.core.BusyIndicator.hide();
                        });
                    }
                    
                });
            },
            // Se agrega PDF
            onGetRmd: function (rmdId) {
                return new Promise(function (resolve, reject) {
                    sap.ui.core.BusyIndicator.show(0);
                    let oFilterRmd = [];
                    oFilterRmd.push(new Filter("rmdId", FilterOperator.EQ, rmdId));
                    let sExpand = "mdId/estadoIdRmd,aReceta/recetaId,aEstructura/estructuraId,aEstructura/aEquipo/equipoId,aEstructura/aPaso/pasoId,aEstructura/aUtensilio/utensilioId,aEstructura/aEspecificacion,aEstructura/aInsumo,aEstructura/aEtiqueta/etiquetaId,aEstructura/aPasoInsumoPaso/pasoHijoId,aEstructura/aPasoInsumoPaso/rmdEstructuraRecetaInsumoId";
                    
                    if(bInterneInit === true){
                        registroService.getDataExpand(oThat.mainModelv2Online, "/RMD", sExpand, oFilterRmd).then(async function (oListRMD) {
                            resolve(oListRMD);
                        }).catch(function (oError) {
                            reject(oError);
                        })
                    }else{//OFFLINE MODEL
                        registroService.getDataExpand(oThat.mainModelv2, "/RMD", sExpand, oFilterRmd).then(async function (oListRMD) {
                            resolve(oListRMD);
                        }).catch(function (oError) {
                            reject(oError);
                        })
                    }
                    
                });
            },
            onDownloadPdfRmd: async function(oEvent){
                oThat.onGetPdfViewerRmo(oEvent, true);
            },
            
            onGetPdfViewerRmo: function (oEvent, descargarPDF) {
                oThat.oSelectedObject = oEvent.getSource().getBindingContext("modelGeneral").getObject();
                let arrayFind = [];

                Promise.all([this.onGetRmd(oThat.oSelectedObject.rmdId)]).then( async function(value) {
                    var oDataSeleccionada = value[0].results[0].aEstructura;
                    let sMaterial = value[0].results[0].productoId;	
                    let sVersion = value[0].results[0].verid;   	
                    let aRecetaSelected = value[0].results[0].aReceta.results.find(itm=>itm.recetaId.Matnr === sMaterial && itm.recetaId.Verid === sVersion);
                    if(oDataSeleccionada.results.length > 0){
                        var especificacionEstructura = oDataSeleccionada.results.find(e => e.estructuraId.tipoEstructuraId_iMaestraId === sTipoEstructuraEspecificaciones);
                        if(especificacionEstructura){
                            if(especificacionEstructura.aEspecificacion.results.length > 0){
                                let existeSap = especificacionEstructura.aEspecificacion.results.filter(itm=>itm.ensayoPadreSAP !== null).length > 0 ? true : false;	
                                let noExisteSap = especificacionEstructura.aEspecificacion.results.filter(itm=>itm.ensayoPadreSAP === null).length > 0 ? true : false;	
                                if (noExisteSap && !existeSap) {	
                                    await especificacionEstructura.aEspecificacion.results.sort((a, b) => {	
                                        return (	
                                            a.fechaRegistro - b.fechaRegistro	
                                        );	
                                    });	
                                } else if (existeSap && !noExisteSap) {	
                                    await especificacionEstructura.aEspecificacion.results.sort((a, b) => {	
                                        return (	
                                            a.Merknr - b.Merknr	
                                        );	
                                    });	
                                } else if (existeSap && noExisteSap) {	
                                    await especificacionEstructura.aEspecificacion.results.sort((a, b) => {	
                                        return (	
                                            a.Merknr - b.Merknr &&	
                                            a.fechaRegistro - b.fechaRegistro	
                                        );	
                                    });	
                                }
                                // especificacionEstructura.aEspecificacion.results.sort((a, b) => {
                                //     return (
                                //         a.Merknr - b.Merknr &&
                                //         a.fechaRegistro - b.fechaRegistro
                                //     );
                                // });
                            }
                        }
                    }
                    var fracciones = [];
                    oDataSeleccionada.results.reduce(function (previousValue, currentValue) {
                        if(previousValue != currentValue.fraccion){
                            return fracciones.push(currentValue.fraccion);
                        }else {
                            return currentValue.fraccion;
                        }
                    },[]);

                    for await (const fraccionActual of fracciones){
                        let aFilters = [];
                        let sExpand = "usuarioId";
                        aFilters.push(new Filter("rmdId_rmdId", "EQ", oThat.oSelectedObject.rmdId));
                        aFilters.push(new Filter("fraccion", "EQ", fraccionActual));
                        var aLapsoSelected ;
                        if(bInterneInit === true){
                            aLapsoSelected = await registroService.onGetDataGeneralFiltersExpand(oThat.mainModelv2Online, "RMD_VERIFICACION_FIRMAS", aFilters, sExpand);
                        }else{//OFFLINE MODEL
                            aLapsoSelected = await registroService.onGetDataGeneralFiltersExpand(oThat.mainModelv2, "RMD_VERIFICACION_FIRMAS", aFilters, sExpand);
                        }
                        
                        if(aLapsoSelected.results){
                            if(aLapsoSelected.results.length >0){
                                aLapsoSelected.results.forEach( function(e){
                                    arrayFind.push(e);
                                })
                            }
                        }
                        // if(aLapsoSelected.results.length >0){
                        //     let aFilters = [];
                        //     let sExpand = "usuarioId"
                        //     // aFilters.push(new Filter("rmdId_rmdId", "EQ", oEstructuraSeleccionada.rmdId_rmdId));
                        //     let aUsuariosResponse = await registroService.onGetDataGeneralFiltersExpand(oThat.mainModelv2, "RMD_USUARIO", aFilters, sExpand);
                        //     aLapsoSelected.results.forEach( function(e){
                        //         let finder = aUsuariosResponse.results.find(u=>u.usuarioId_usuarioId === e.usuarioId_usuarioId);
                        //         if (finder) {
                        //             finder.fraccion = fraccionActual;
                        //             arrayFind.push(finder);
                        //         }
                        //     })
                        // }
                    }
                    

                    
                    oDataSeleccionada.results = oDataSeleccionada.results.sort(function (a, b) {
                        return a.orden - b.orden;
                    });

                    for await (const oData of oDataSeleccionada.results){
                        //ETIQUETA
                        if (oData.aEtiqueta.results.length > 0) {
                            //  oData.aEtiqueta.results = oData.estructuraId.aEtiqueta.results.filter(obj => obj.rmdId_rmdId == oThat.oSelectedObject.rmdId);
                            oData.aEtiqueta.results.sort(function (a, b) {
                                return a.orden - b.orden;
                            });
                        }
                        //PASO
                        if (oData.aPaso.results.length > 0) {
                            //  oData.aPaso.results = oData.aPaso.results.filter(obj => obj.rmdId_rmdId == oThat.oSelectedObject.rmdId);
                            BusyIndicator.show(0);
                            for await (const oPasoData of oData.aPaso.results){
                                if(oPasoData.imagen){
                                    let oData = {
                                        origen  : "ImagenMD",
                                        url     :  oPasoData.imagenRuta
                                    }
                                    let oImagenCargada;
                                    if(bInterneInit === true){
                                        oImagenCargada = await sharepointService.sharePointGetGeneral(oThat.mainModelv2Online, oData);
                                    }else{//OFFLINE MODEL
                                        oImagenCargada = await sharepointService.sharePointGetGeneral(oThat.mainModelv2, oData);
                                    }
                                    
                                    if(oImagenCargada.length>0){
                                    let oDownloadImage = {
                                        origen  : "ImagenMD",
                                        codigoRM : oPasoData.imagenRuta,
                                        Name : oImagenCargada[0].Name
                                    }
                                    let oImagenResult;
                                    if(bInterneInit === true){
                                        oImagenResult= await sharepointService.sharePointDownloadGeneral(oThat.mainModelv2Online, oDownloadImage);
                                    }else{//OFFLINE MODEL
                                        oImagenResult= await sharepointService.sharePointDownloadGeneral(oThat.mainModelv2, oDownloadImage);
                                    }
                                    
                                    let len = oImagenResult.length;
                                    let bytes = new Uint8Array(len);
                                    for (let i = 0; i <len; i++) {
                                        bytes[i]= oImagenResult.charCodeAt(i);
                                    }
                                    let arrBuffer =bytes.buffer;
                                    let base64 = btoa(new Uint8Array(arrBuffer).reduce((data, byte) => data + String.fromCharCode(byte), ''));
                                    let format = '';
                                        if ((oImagenCargada[0].Name).indexOf("jpg") !== -1) {
                                            format = "data:image/jpg;base64,"
                                        } else {
                                            format = "data:image/png;base64,"
                                        }
                                    let img = format + base64;
                                    oPasoData.imagenBase64 = img;
                                    }
                                }
                            }
                            BusyIndicator.hide();
                            oData.aPaso.results.sort(function (a, b) {
                                return a.orden - b.orden;
                            });
                        }
                        //PASOINSUMOPASO
                        if (oData.aPasoInsumoPaso.results.length > 0) {
                            //  oData.aPasoInsumoPaso.results = oData.estructuraId.aPasoInsumoPaso.results.filter(obj => obj.rmdId_rmdId == oThat.oSelectedObject.rmdId);
                            oData.aPasoInsumoPaso.results.sort(function (a, b) {
                                return a.orden - b.orden;
                            });
                        }
                        //EQUIPO
                        if (oData.aEquipo.results.length > 0) {
                            //  oData.aEquipo.results = oData.aEquipo.results.filter(obj => obj.rmdId_rmdId == oThat.oSelectedObject.rmdId);
                            oData.aEquipo.results.sort(function (a, b) {
                                return a.orden - b.orden;
                            });
                        }
                        //UTENSILIO
                        if (oData.aUtensilio.results.length > 0) {
                            //  oData.aUtensilio.results = oData.aUtensilio.results.filter(obj => obj.rmdId_rmdId == oThat.oSelectedObject.rmdId);
                            oData.aUtensilio.results.sort(function (a, b) {
                                return a.orden - b.orden;
                            });
                        }
                        //INSUMO
                        if (oData.aInsumo.results.length > 0) {
                            oData.aInsumo.results = oData.aInsumo.results.filter(obj => obj.rmdId_rmdId == oThat.oSelectedObject.rmdId);
                            
                            oData.aInsumo.results.sort(function (a, b) {
                                return a.ItemNo - b.ItemNo;
                            });
                        }
                    }

                    oDataSeleccionada.results = oDataSeleccionada.results.sort(function (a, b) {
                        return a.fraccion - b.fraccion;
                    });

                    //tablePdf.onGeneratePdf2();


                    if(descargarPDF){
                        tablePdf.onGeneratePdf(value[0].results[0],false, oThat.modelGeneral.getProperty("/oInfoUsuario"), oThat.modelGeneral.getProperty("/LineaActualRMD"),arrayFind,"OFFLINE", arrayFind);          
                     }else {    
                        tablePdf.onGeneratePdf(value[0].results[0],false, oThat.modelGeneral.getProperty("/oInfoUsuario"), oThat.modelGeneral.getProperty("/LineaActualRMD"),arrayFind,"OFFLINE", arrayFind);              
                        //tablePdf.onGeneratePdf2();
                     }

                    //OFFLINE CAMBIO para visualizar y descargar el pdf
                    
                     //BusyIndicator.show(0);
                     //tablePdf.onGeneratePdf(value[0].results[0],false, oThat.modelGeneral.getProperty("/oInfoUsuario"), oThat.modelGeneral.getProperty("/LineaActualRMD"),arrayFind,"OFFLINE", arrayFind);
                     //BusyIndicator.hide();
                    // var sTitle = value[0].results[0].descripcion;

                    // var decodedPdfContent = atob(base64);
                    // //var  decodedPdfContent = Buffer.from(base64);
                    // var byteArrays = [];
                    // var sliceSize = 512;
                    // for (let offset = 0; offset < decodedPdfContent.length; offset += sliceSize) {
                    //     const slice = decodedPdfContent.slice(offset, offset + sliceSize);

                    //     const byteNumbers = new Array(slice.length);
                    //     for (let i = 0; i < slice.length; i++) {
                    //         byteNumbers[i] = slice.charCodeAt(i);
                    //     }

                    //     const byteArray = new Uint8Array(byteNumbers);
                    //     byteArrays.push(byteArray);
                    // }
                    // var blob = new Blob(byteArrays, { type: 'application/pdf' });

                    // const downloadFile = (blob, fileName) => {
                    //     const link = document.createElement('a');
                    //     // create a blobURI pointing to our Blob
                    //     link.href = URL.createObjectURL(blob);
                    //     link.download = fileName;
                    //     // some browser needs the anchor to be in the doc
                    //     document.body.append(link);
                    //     link.click();
                    //     link.remove();
                    //     // in case the Blob uses a lot of memory
                    //     setTimeout(() => URL.revokeObjectURL(link.href), 1000000);
                    //   };
                      
                      
                    // downloadFile(blob, sTitle);
                    //var byteArray = new Uint8Array(decodedPdfContent.length)
                    //for (var i = 0; i < decodedPdfContent.length; i++) {
                    //    byteArray[i] = decodedPdfContent.charCodeAt(i);
                    //}

                    // var _pdfurl = URL.createObjectURL(blob);

                    // oThat._PDFViewerRMO = new sap.m.PDFViewer({
                    //     title: sTitle,
                    //     width: "auto",
                    //     displayType:"Auto",
                    //     source: _pdfurl // my blob url
                    // });
                    // jQuery.sap.addUrlWhitelist("blob"); // register blob url as whitelist
                    // oThat._PDFViewerRMO.open();

                    

                    // set the blog type to final pdf

                // process to auto download it
                //OTRA FORMA 
                // const fileURL = URL.createObjectURL(blob);
                // const link = document.createElement('a');
                // link.href = fileURL;
                // link.download = sTitle + ".pdf";
                // link.click();

                    sap.ui.core.BusyIndicator.hide();
                })
                //.catch(function (oError) {
                //    sap.ui.core.BusyIndicator.hide();
                //    oThat.onErrorMessage(oError, "errorSave");
                //});
            },

            onRestoreFilters: function () {
                this.modelGeneral.getData().loteFilter = '';
                this.modelGeneral.getData().ordenesAbap = []
            },

            // REESTRUCTURACION GENERAL

            // GRPR - Actualización de obtención de datos del RMD.
            getEstructurasRmdRefactory: async function (sFraccion) {
                //BusyIndicator.show(0);
                await oThat.onGetRmdReceta(sFraccion);
                await Promise.all([oThat.onGetRmdEstructura(sFraccion), oThat.onGetRmdEsPaso(sFraccion), oThat.onGetRmdEsEquipo(sFraccion), oThat.onGetRmdEsUtensilio(sFraccion), 
                    oThat.onGetRmdEsEtiqueta(sFraccion), oThat.onGetRmdEsReInsumo(sFraccion), oThat.onGetRmdEsEspecificacion(sFraccion), oThat.onGetRmdEsPasoInsumoPaso(sFraccion)])
                    .then(async function(values) {
                    let oModelEst = new JSONModel(values[0].results);
                    oModelEst.setSizeLimit(999999999);
                    oThat.getView().setModel(oModelEst, "listRmdEstructura");
                    oThat.getView().getModel("listRmdEstructura").refresh(true);

                    let oModelPaso = new JSONModel(values[1].results);
                    oModelPaso.setSizeLimit(999999999);
                    oThat.getView().setModel(oModelPaso, "listRmdEsPaso");
                    oThat.getView().getModel("listRmdEsPaso").refresh(true);

                    let oModelEquipo = new JSONModel(values[2].results);
                    oModelEquipo.setSizeLimit(999999999);
                    oThat.getView().setModel(oModelEquipo, "listRmdEsEquipo");
                    oThat.getView().getModel("listRmdEsEquipo").refresh(true);

                    let oModelUtensilio = new JSONModel(values[3].results);
                    oModelUtensilio.setSizeLimit(999999999);
                    oThat.getView().setModel(oModelUtensilio, "listRmdEsUtensilio");
                    oThat.getView().getModel("listRmdEsUtensilio").refresh(true);

                    let oModelEtiqueta = new JSONModel(values[4].results);
                    oModelEtiqueta.setSizeLimit(999999999);
                    oThat.getView().setModel(oModelEtiqueta, "listRmdEsEtiqueta");
                    oThat.getView().getModel("listRmdEsEtiqueta").refresh(true);

                    let oModelInsumo = new JSONModel(values[5].results);
                    oModelInsumo.setSizeLimit(999999999);
                    oThat.getView().setModel(oModelInsumo, "listRmdEsReInsumo");
                    oThat.getView().getModel("listRmdEsReInsumo").refresh(true);

                    let oModelEspecificacion = new JSONModel(values[6].results);
                    oModelEspecificacion.setSizeLimit(999999999);
                    oThat.getView().setModel(oModelEspecificacion, "listRmdEsEspecificacion");
                    oThat.getView().getModel("listRmdEsEspecificacion").refresh(true);

                    let oModelEsPasoInsumoPaso = new JSONModel(values[7].results);
                    oModelEsPasoInsumoPaso.setSizeLimit(999999999);
                    oThat.getView().setModel(oModelEsPasoInsumoPaso, "listEsPasoInsumoPasoGeneral");
                    oThat.getView().getModel("listEsPasoInsumoPasoGeneral").refresh(true);
                    await oThat.onCompletarAsociarDatos();

                    sap.ui.core.BusyIndicator.hide();
                }).catch(function (oError) {
                    sap.ui.core.BusyIndicator.hide();
                    oThat.onErrorMessage(oError, "errorSave");
                });

                // BusyIndicator.hide();
            },

            onRouteDetailView: function () {
                if (sap.ui.getCore().byId("frgAdicNewMdEquipment--idTblEquipment")) {
                    sap.ui.getCore().byId("frgAdicNewMdEquipment--idTblEquipment").destroy();
                }
                var router = oThat.getOwnerComponent().getRouter();
                if (router._oViews._oCache.view["mif.rmd.registro.view.DetailMainView"]) {
                    delete router._oViews._oCache.view["mif.rmd.registro.view.DetailMainView"];
                }
                //OFFLINE
                bflushCargando = false;
                bRefreshCargando = false;
                /////
                oThat.getOwnerComponent().getRouter().navTo("RouteDetailMainView");
                bflushCargando = false;
                bRefreshCargando = false;
            },

            onGetRmdEstructura: function (sFraccion) {
                return new Promise(async function (resolve, reject) {
                    // sap.ui.core.BusyIndicator.show(0);
                    let oDataSeleccionada = oThat.getOwnerComponent().getModel("asociarDatos");
                    var aFilters = [];

                    if(bInterneInit === true){
                        aFilters.push(new Filter("rmdId_rmdId", "EQ", oDataSeleccionada.getData().rmdId));
                        aFilters.push(new Filter("fraccion", "EQ", sFraccion));
                        let sExpand = "rmdId($expand=estadoIdRmd),estructuraId($expand=tipoEstructuraId)";

                        await registroService.onGetDataGeneralFiltersExpand(oThat.mainModelv2Online, "RMD_ESTRUCTURA", aFilters, sExpand).then(function (oListRmdEstructura) {
                            resolve(oListRmdEstructura);
                        }).catch(function (oError) {
                            reject(oError);
                        })
                    }else{//OFFLINE MODEL
                        aFilters.push(new Filter("rmdId_rmdId", "EQ", oDataSeleccionada.getData().rmdId));
                        aFilters.push(new Filter("fraccion", "EQ", sFraccion));
                        //let sExpand = "rmdId($expand=estadoIdRmd),estructuraId($expand=tipoEstructuraId)";
                        //OFFLINE : por alguna razon no funciona el $expand cuando haces la peticion a traves del modelo :/
                        let sExpand = "rmdId/estadoIdRmd,estructuraId/tipoEstructuraId";
                        await registroService.onGetDataGeneralFiltersExpand(oThat.mainModelv2, "RMD_ESTRUCTURA", aFilters, sExpand).then(function (oListRmdEstructura) {
                            resolve(oListRmdEstructura);
                        }).catch(function (oError) {
                            reject(oError);
                        })
                    }
                });
            },

            onGetRmdEsPaso: function (sFraccion) {
                return new Promise(async function (resolve, reject) {
                    // sap.ui.core.BusyIndicator.show(0);
                    let oDataSeleccionada = oThat.getOwnerComponent().getModel("asociarDatos");
                    var aFilters = [];
                    if(bInterneInit === true){
                        aFilters.push(new Filter("rmdId_rmdId", "EQ", oDataSeleccionada.getData().rmdId));
                        aFilters.push(new Filter("fraccion", "EQ", sFraccion));
                        let sExpand = "rmdId,rmdEstructuraId,tipoDatoId,pasoId($expand=tipoDatoId,estadoId,tipoLapsoId,tipoCondicionId,etiquetaId)";
                        await registroService.onGetDataGeneralFiltersExpand(oThat.mainModelv2Online, "RMD_ES_PASO", aFilters, sExpand).then(function (oListRmdPaso) {
                            resolve(oListRmdPaso);
                        }).catch(function (oError) {
                            reject(oError);
                        })
                    }else{//OFFLINE MODEL
                        aFilters.push(new Filter("rmdId_rmdId", "EQ", oDataSeleccionada.getData().rmdId));
                        aFilters.push(new Filter("fraccion", "EQ", sFraccion));
                        //let sExpand = "rmdId,rmdEstructuraId,tipoDatoId,pasoId($expand=tipoDatoId,estadoId,tipoLapsoId,tipoCondicionId,etiquetaId)";
                        //OFFLINE : por alguna razon no funciona el $expand cuando haces la peticion a traves del modelo :/
                        let sExpand = "rmdId,rmdEstructuraId,tipoDatoId,pasoId/tipoDatoId,pasoId/estadoId,pasoId/tipoLapsoId,pasoId/tipoCondicionId,pasoId/etiquetaId";
                        await registroService.onGetDataGeneralFiltersExpand(oThat.mainModelv2, "RMD_ES_PASO", aFilters, sExpand).then(function (oListRmdPaso) {
                            resolve(oListRmdPaso);
                        }).catch(function (oError) {
                            reject(oError);
                        })
                    }
                });
            },

            onGetRmdEsEquipo: function (sFraccion) {
                return new Promise(async function (resolve, reject) {
                    // sap.ui.core.BusyIndicator.show(0);
                    let oDataSeleccionada = oThat.getOwnerComponent().getModel("asociarDatos");
                    var aFilters = [];
                    if(bInterneInit === true){
                        aFilters.push(new Filter("rmdId_rmdId", "EQ", oDataSeleccionada.getData().rmdId));
                        aFilters.push(new Filter("fraccion", "EQ", sFraccion));
                        let sExpand = "rmdId,rmdEstructuraId,equipoId/tipoId";
                        await registroService.onGetDataGeneralFiltersExpand(oThat.mainModelv2Online, "RMD_ES_EQUIPO", aFilters, sExpand).then(function (oListRmdPaso) {
                            resolve(oListRmdPaso);
                        }).catch(function (oError) {
                            reject(oError);
                        })
                    }else{//OFFLINE MODEL
                        aFilters.push(new Filter("rmdId_rmdId", "EQ", oDataSeleccionada.getData().rmdId));
                        aFilters.push(new Filter("fraccion", "EQ", sFraccion));
                        let sExpand = "rmdId,rmdEstructuraId,equipoId/tipoId";
                        await registroService.onGetDataGeneralFiltersExpand(oThat.mainModelv2, "RMD_ES_EQUIPO", aFilters, sExpand).then(function (oListRmdPaso) {
                            resolve(oListRmdPaso);
                        }).catch(function (oError) {
                            reject(oError);
                        })
                    }
                });
            },

            onGetRmdEsUtensilio: function (sFraccion) {
                return new Promise(async function (resolve, reject) {
                    // sap.ui.core.BusyIndicator.show(0);
                    let oDataSeleccionada = oThat.getOwnerComponent().getModel("asociarDatos");
                    var aFilters = [];
                    if(bInterneInit === true){
                        aFilters.push(new Filter("rmdId_rmdId", "EQ", oDataSeleccionada.getData().rmdId));
                        aFilters.push(new Filter("fraccion", "EQ", sFraccion));
                        let sExpand = "rmdId,rmdEstructuraId,utensilioId/estadoId,utensilioId/tipoId,agrupadorId";
                        await registroService.onGetDataGeneralFiltersExpand(oThat.mainModelv2Online, "RMD_ES_UTENSILIO", aFilters, sExpand).then(function (oListRmdPaso) {
                            resolve(oListRmdPaso);
                        }).catch(function (oError) {
                            reject(oError);
                        })
                    }else{ //OFFLINE MODEL
                        aFilters.push(new Filter("rmdId_rmdId", "EQ", oDataSeleccionada.getData().rmdId));
                        aFilters.push(new Filter("fraccion", "EQ", sFraccion));
                        let sExpand = "rmdId,rmdEstructuraId,utensilioId/estadoId,utensilioId/tipoId,agrupadorId";
                        await registroService.onGetDataGeneralFiltersExpand(oThat.mainModelv2, "RMD_ES_UTENSILIO", aFilters, sExpand).then(function (oListRmdPaso) {
                            resolve(oListRmdPaso);
                        }).catch(function (oError) {
                            reject(oError);
                        })
                    }
                });
            },

            onGetRmdEsEtiqueta: function (sFraccion) {
                return new Promise(async function (resolve, reject) {
                    // sap.ui.core.BusyIndicator.show(0);
                    let oDataSeleccionada = oThat.getOwnerComponent().getModel("asociarDatos");
                    var aFilters = [];
                    
                    if(bInterneInit === true){
                        aFilters.push(new Filter("rmdId_rmdId", "EQ", oDataSeleccionada.getData().rmdId));
                        aFilters.push(new Filter("fraccion", "EQ", sFraccion));
                        let sExpand = "rmdId,rmdEstructuraId,etiquetaId($expand=estructuraId($expand=tipoEstructuraId))";

                        await registroService.onGetDataGeneralFiltersExpand(oThat.mainModelv2Online, "RMD_ES_ETIQUETA", aFilters, sExpand).then(function (oListRmdPaso) {
                            resolve(oListRmdPaso);
                        }).catch(function (oError) {
                            reject(oError);
                        })
                    }else{//OFFLINE MODEL
                        aFilters.push(new Filter("rmdId_rmdId", "EQ", oDataSeleccionada.getData().rmdId));
                        aFilters.push(new Filter("fraccion", "EQ", sFraccion));
                        //let sExpand = "rmdId,rmdEstructuraId,etiquetaId($expand=estructuraId($expand=tipoEstructuraId))";
                        //OFFLINE : por alguna razon no funciona el $expand cuando haces la peticion a traves del modelo :/
                        let sExpand = "rmdId,rmdEstructuraId,etiquetaId/estructuraId/tipoEstructuraId";
                        await registroService.onGetDataGeneralFiltersExpand(oThat.mainModelv2, "RMD_ES_ETIQUETA", aFilters, sExpand).then(function (oListRmdPaso) {
                            resolve(oListRmdPaso);
                        }).catch(function (oError) {
                            reject(oError);
                        })
                    }
                });
            },

            onGetRmdEsReInsumo: function (sFraccion) {
                return new Promise(async function (resolve, reject) {
                    // sap.ui.core.BusyIndicator.show(0);
                    let oDataSeleccionada = oThat.getOwnerComponent().getModel("asociarDatos");

                    let sMaterial = oDataSeleccionada.getData().productoId;	
                    let sVersion = oDataSeleccionada.getData().verid;
                    //OFFLINE SE CAMBIA LA LOGICA
                    let aRecetaSelected;
                    if(oDataSeleccionada.getData().aReceta.results[0].recetaId === null){

                        MessageBox.information("Debe conectarse para visualizar el RMD");
                        sap.ui.core.BusyIndicator.hide(0);
                        return;
                    }else{   	
                        aRecetaSelected = oDataSeleccionada.getData().aReceta.results.find(itm=>itm.recetaId.Matnr === sMaterial && itm.recetaId.Verid === sVersion);
                    }
                    var aFilters = [];
                    aFilters.push(new Filter("rmdId_rmdId", "EQ", oDataSeleccionada.getData().rmdId));
                    aFilters.push(new Filter("fraccion", "EQ", sFraccion));
                    aFilters.push(new Filter("rmdRecetaId_rmdRecetaId", "EQ", aRecetaSelected.rmdRecetaId));
                    let sExpand = "rmdEstructuraId,rmdRecetaId";

                    if(bInterneInit === true){

                        await registroService.onGetDataGeneralFiltersExpand(oThat.mainModelv2Online, "RMD_ES_RE_INSUMO", aFilters, sExpand).then(function (oListRmdEsReInsumo) {
                            resolve(oListRmdEsReInsumo);
                        }).catch(function (oError) {
                            reject(oError);
                        })
                    }else{//OFFLINE MODEL

                        await registroService.onGetDataGeneralFiltersExpand(oThat.mainModelv2, "RMD_ES_RE_INSUMO", aFilters, sExpand).then(function (oListRmdEsReInsumo) {
                            resolve(oListRmdEsReInsumo);
                        }).catch(function (oError) {
                            reject(oError);
                        })
                    }
                   
                });
            },

            onGetRmdEsEspecificacion: function (sFraccion) {
                return new Promise(async function (resolve, reject) {
                    // sap.ui.core.BusyIndicator.show(0);
                    let oDataSeleccionada = oThat.getOwnerComponent().getModel("asociarDatos");
                    var aFilters = [];
                    aFilters.push(new Filter("rmdId_rmdId", "EQ", oDataSeleccionada.getData().rmdId));
                    aFilters.push(new Filter("fraccion", "EQ", sFraccion));
                    let sExpand = "rmdEstructuraId,rmdId,ensayoPadreId";
                    if (bInterneInit === true){
                        await registroService.onGetDataGeneralFiltersExpand(oThat.mainModelv2Online, "RMD_ES_ESPECIFICACION", aFilters, sExpand).then(function (oListRmdEsEspecificacion) {
                            resolve(oListRmdEsEspecificacion);
                        }).catch(function (oError) {
                            reject(oError);
                        })    
                    }else {//OFFLINE MODEL
                        await registroService.onGetDataGeneralFiltersExpand(oThat.mainModelv2, "RMD_ES_ESPECIFICACION", aFilters, sExpand).then(function (oListRmdEsEspecificacion) {
                            resolve(oListRmdEsEspecificacion);
                        }).catch(function (oError) {
                            reject(oError);
                        })
                    }
                });
            },

            onGetRmdEsPasoInsumoPaso: function (sFraccion) {
                return new Promise(function (resolve, reject) {
                    // sap.ui.core.BusyIndicator.show(0);
                    let oDataSeleccionada = oThat.getOwnerComponent().getModel("asociarDatos");
                    let aFilters = [];
                    aFilters.push(new Filter("rmdId_rmdId", "EQ", oDataSeleccionada.getData().rmdId));
                    aFilters.push(new Filter("fraccion", "EQ", sFraccion));
                    let sExpand = "rmdEstructuraId,etiquetaId,tipoDatoId,pasoId,pasoId/pasoId,pasoHijoId,rmdEstructuraRecetaInsumoId";
                    if ( bInterneInit === true){
                        registroService.onGetDataGeneralFiltersExpand(oThat.mainModelv2Online, "RMD_ES_PASO_INSUMO_PASO", aFilters, sExpand).then(function (oListRmdEsPasoInsumoPaso) {
                            resolve(oListRmdEsPasoInsumoPaso);
                        }).catch(function (oError) {
                            reject(oError);
                        })
                    }else{ // OFFLINE MODEL
                        registroService.onGetDataGeneralFiltersExpand(oThat.mainModelv2, "RMD_ES_PASO_INSUMO_PASO", aFilters, sExpand).then(function (oListRmdEsPasoInsumoPaso) {
                            resolve(oListRmdEsPasoInsumoPaso);
                        }).catch(function (oError) {
                            reject(oError);
                        })
                    }               
                });
            },

            onGetRmdReceta: function (sFraccion) {	
                return new Promise(function (resolve, reject) {	
                    // sap.ui.core.BusyIndicator.show(0);	
                    let oDataSeleccionada = oThat.getOwnerComponent().getModel("asociarDatos");	
                    let aFilters = [];	
                    aFilters.push(new Filter("rmdId_rmdId", "EQ", oDataSeleccionada.getData().rmdId));	
                    aFilters.push(new Filter("fraccion", "EQ", sFraccion));	
                    let sExpand = "recetaId";
                    if( bInterneInit === true){
                        registroService.onGetDataGeneralFiltersExpand(oThat.mainModelv2Online, "RMD_RECETA", aFilters, sExpand).then(function (oListRmdReceta) {	
                            oDataSeleccionada.getData().aReceta = oListRmdReceta;	
                            oDataSeleccionada.refresh(true);	
                            resolve(oListRmdReceta);	
                        }).catch(function (oError) {	
                            reject(oError);	
                        })	
                    }else{//OFFLINE MODEL
                        registroService.onGetDataGeneralFiltersExpand(oThat.mainModelv2, "RMD_RECETA", aFilters, sExpand).then(function (oListRmdReceta) {	
                            oDataSeleccionada.getData().aReceta = oListRmdReceta;	
                            oDataSeleccionada.refresh(true);	
                            resolve(oListRmdReceta);	
                        }).catch(function (oError) {	
                            reject(oError);	
                        })	
                    }	
                });	
            },

            onCompletarAsociarDatos: async function () {
                let oModelRmdEstructura = oThat.getView().getModel("listRmdEstructura"),
                    oModelRmdEsPaso = oThat.getView().getModel("listRmdEsPaso"),
                    oModelRmdEsEquipo = oThat.getView().getModel("listRmdEsEquipo"),
                    oModelRmdEsUtensilio = oThat.getView().getModel("listRmdEsUtensilio"),
                    oModelRmdEsEtiqueta = oThat.getView().getModel("listRmdEsEtiqueta"),
                    oModelRmdEsReInsumo = oThat.getView().getModel("listRmdEsReInsumo"),
                    oModelRmdEsEspecificacion = oThat.getView().getModel("listRmdEsEspecificacion"),
                    oModelRmdEsPasoInsumoPaso = oThat.getView().getModel("listEsPasoInsumoPasoGeneral"),
                    oDataSeleccionada = oThat.getOwnerComponent().getModel("asociarDatos");
                    oDataSeleccionada.getData().aEstructura.results = [];
                
                let orden = 0;
                oModelRmdEstructura.getData().sort(function (a, b) {
                    return a.orden - b.orden;
                });
                
                for await (const item of oModelRmdEstructura.getData()) {
                    //OFFLINE CAMBIO
                    if(!item.estructuraId){
                        item.estructuraId = {};
                        item.estructuraId.numeracion = null;
                    }
                    //
                    if (item.estructuraId.numeracion) {
                        orden = orden + 1;
                        item.ordenFinal = orden; 
                    } else {
                        item.ordenFinal = null;
                    }
                    const aFilterMdPaso = await oModelRmdEsPaso.getData().filter((oItem) => {
                        return item.rmdEstructuraId === oItem.rmdEstructuraId_rmdEstructuraId;
                    });

                    const aFilterMdEquipo = await oModelRmdEsEquipo.getData().filter((oItem) => {
                        return item.rmdEstructuraId === oItem.rmdEstructuraId_rmdEstructuraId;
                    });

                    const aFilterMdUtensilio = await oModelRmdEsUtensilio.getData().filter((oItem) => {
                        return item.rmdEstructuraId === oItem.rmdEstructuraId_rmdEstructuraId;
                    });

                    const aFilterMdEtiqueta = await oModelRmdEsEtiqueta.getData().filter((oItem) => {
                        return item.rmdEstructuraId === oItem.rmdEstructuraId_rmdEstructuraId;
                    });

                    const aFilterMdReInsumo = await oModelRmdEsReInsumo.getData().filter((oItem) => {
                        return item.rmdEstructuraId === oItem.rmdEstructuraId_rmdEstructuraId;
                    });

                    const aFilterMdEspecificacion = await oModelRmdEsEspecificacion.getData().filter((oItem) => {
                        return item.rmdEstructuraId === oItem.rmdEstructuraId_rmdEstructuraId;
                    });

                    const aFilterMdEsPasoInsumoPaso = await oModelRmdEsPasoInsumoPaso.getData().filter((oItem) => {
                        return item.rmdEstructuraId === oItem.rmdEstructuraId_rmdEstructuraId;
                    });
                    
                    item.aPaso.results = [];
                    item.aEquipo.results = [];
                    item.aUtensilio.results = [];
                    item.aEtiqueta.results = [];
                    item.aPasoInsumoPaso.results = [];
                    item.aInsumo.results = [];
                    item.aEspecificacion.results = [];

                    item.aPaso.results = aFilterMdPaso;
                    item.aEquipo.results = aFilterMdEquipo;
                    item.aUtensilio.results = aFilterMdUtensilio;
                    item.aEtiqueta.results = aFilterMdEtiqueta;
                    item.aPasoInsumoPaso.results = aFilterMdEsPasoInsumoPaso;
                    item.aInsumo.results = aFilterMdReInsumo;
                    item.aEspecificacion.results = aFilterMdEspecificacion;
                    oDataSeleccionada.getData().aEstructura.results.push(item);
                };                
                oThat.getView().getModel("asociarDatos").refresh(true);
            },

            // Mensajes de error.
            onErrorMessage: function (oError, textoI18n) {
                try {
                    if (oError.responseJSON) {
                        if (oError.responseJSON.error) {
                            MessageBox.error(oError.responseJSON.error.message.value);
                        } else {
                            if (oError.responseJSON[0]) {
                                if (oError.responseJSON[0].description) {
                                    MessageBox.error(oError.responseJSON[0].description);
                                } else {
                                    MessageBox.error(this.getView().getModel("i18n").getResourceBundle().getText(textoI18n));
                                }
                            } else {
                                if (oError.responseJSON.message) {
                                    MessageBox.error(oError.responseJSON.message);
                                } else {
                                    MessageBox.error(oError.responseJSON.response.description);
                                }
                            }
                        }
                    } else if (oError.responseText) {
                        try {
                            if (oError.responseText) {
                                var oErrorRes = JSON.parse(oError.responseText),
                                    sErrorDetails = oErrorRes.error.innererror.errordetails;
                                if (typeof (sErrorDetails[0].message) === 'object') {
                                    MessageBox.error(sErrorDetails[0].message.value);
                                } else {
                                    MessageBox.error(sErrorDetails[0].message);
                                }
                            } else {
                                oThat.onErrorMessage("", "errorSave");
                            }
                        } catch (error) {
                            MessageBox.error(oError.responseText);
                        }
                    } else if (oError.message) {
                        MessageBox.error(oError.message);
                    } else {
                        MessageBox.error(this.getView().getModel("i18n").getResourceBundle().getText(textoI18n));
                    }
                } catch (oErrorT) {
                    oThat.onErrorMessage(oErrorT, "errorSave");
                }
            },

            createEstructura: async function (oData, rmdNew, sFraccion) {
                let aFilterReceta = [];
                aFilterReceta.push(new Filter("rmdId_rmdId", "EQ", oData.rmdId));
                aFilterReceta.push(new Filter("fraccion", "EQ", 1));
                let aRecetaMD;
                if(bInterneInit === true){
                    aRecetaMD = await registroService.onGetDataGeneralFilters(oThat.mainModelv2Online, "RMD_RECETA", aFilterReceta);
                }else{//OFFLINE MODEL
                    aRecetaMD = await registroService.onGetDataGeneralFilters(oThat.mainModelv2, "RMD_RECETA", aFilterReceta);
                }

                let aListIdsReceta = [];
                for await (const oReceta of aRecetaMD.results) {
                    let oParamReceta = {
                        usuarioRegistro: oInfoUsuario.data.usuario,
                        fechaRegistro: new Date(),
                        activo: true,
                        fraccion: sFraccion,
                        rmdRecetaId: util.onGetUUIDV4(),
                        rmdId_rmdId: rmdNew.rmdId,
                        recetaId_recetaId : oReceta.recetaId_recetaId,
                        orden : oReceta.orden
                    }
                    let objIdReceta = {
                        mdRecetaId : oReceta.mdRecetaId,
                        rmdRecetaId : oParamReceta.rmdRecetaId
                    }
                    aListIdsReceta.push(objIdReceta);

                    if(bInterneInit === true){
                        await registroService.onSaveDataGeneral(oThat.mainModelv2Online, "RMD_RECETA", oParamReceta);
                    }else{//OFFLINE MODEL
                        await registroService.onSaveDataGeneral(oThat.mainModelv2, "RMD_RECETA", oParamReceta);
                    }
                    
                }

                let aFilter = [];
                aFilter.push(new Filter("rmdId_rmdId", FilterOperator.EQ, oData.rmdId));
                aFilter.push(new Filter("fraccion", "EQ", 1));
                let sExpand = "aPaso/pasoId,aEquipo,aUtensilio,aEtiqueta,aPasoInsumoPaso,aEspecificacion,aInsumo";

                let aEstructuraMD ;
                if(bInterneInit === true){
                    aEstructuraMD = await registroService.onGetDataGeneralFiltersExpand(oThat.mainModelv2Online, "RMD_ESTRUCTURA", aFilter, sExpand);
                }else{//OFFLINE MODEL
                    aEstructuraMD = await registroService.onGetDataGeneralFiltersExpand(oThat.mainModelv2, "RMD_ESTRUCTURA", aFilter, sExpand);
                }
                
                let aListEstructurasRMD = [];
                let aListIdsInsumos = [];
                for await (const oEstructuraOnlyInsumo of aEstructuraMD.results) {
                    if(oEstructuraOnlyInsumo.aInsumo.results.length > 0){
                        let oParam = {
                            usuarioRegistro: oInfoUsuario.data.usuario,
                            fraccion: sFraccion, 
                            fechaRegistro: new Date(),
                            activo: true,
                            rmdEstructuraId: util.onGetUUIDV4(),
                            orden: oEstructuraOnlyInsumo.orden,
                            rmdId_rmdId: rmdNew.rmdId,
                            estructuraId_estructuraId: oEstructuraOnlyInsumo.estructuraId_estructuraId,
                            aPaso: [],
                            aEquipo : [],
                            aUtensilio : [],
                            aEtiqueta: [],
                            aPasoInsumoPaso: [],
                            aEspecificacion: [],
                            aInsumo: []
                        }

                        //REGISTRAMOS LOS INSUMOS
                        if (oEstructuraOnlyInsumo.aInsumo.results.length > 0) {
                            for await (const oInsumo of oEstructuraOnlyInsumo.aInsumo.results) {
                                let matchRecetaId = aListIdsReceta.find(itm=>itm.mdRecetaId === oInsumo.mdRecetaId_mdRecetaId);
                                let oInsumoObj = {
                                    usuarioRegistro: oInfoUsuario.data.usuario,
                                    fechaRegistro: new Date(),
                                    activo: true,
                                    rmdEstructuraRecetaInsumoId: util.onGetUUIDV4(),
                                    rmdId_rmdId: rmdNew.rmdId,
                                    rmdEstructuraId_rmdEstructuraId: oParam.rmdEstructuraId,
                                    rmdRecetaId_rmdRecetaId : matchRecetaId.rmdRecetaId,
                                    cantidadRm : oInsumo.cantidadRm,
                                    cantidadBarCode : oInsumo.cantidadBarCode,
                                    Matnr : oInsumo.Matnr,
                                    Werks : oInsumo.Werks,                
                                    Maktx : oInsumo.Maktx,               
                                    ItemCateg : oInsumo.ItemCateg,               
                                    ItemNo : oInsumo.ItemNo,             
                                    Component : oInsumo.Component,           
                                    CompQty : oInsumo.CompQty,          
                                    CompUnit : oInsumo.CompUnit,           
                                    ItemText1 : oInsumo.ItemText1,           
                                    ItemText2 : oInsumo.ItemText2,
                                    fraccion: sFraccion
                                }
                                let objInsumoIds = {
                                    estructuraRecetaInsumoId : oInsumo.rmdEstructuraRecetaInsumoId,
                                    rmdEstructuraRecetaInsumoId : oInsumoObj.rmdEstructuraRecetaInsumoId
                                }
                                aListIdsInsumos.push(objInsumoIds);

                                if(bInterneInit === true ){
                                    oParam.aInsumo.push(oInsumoObj);
                                }else{//OFFLINE MODEL
                                     //OFFLINE Agrego los insumos directamente con un create
                                    await registroService.onSaveDataGeneral(oThat.mainModelv2, "RMD_ES_RE_INSUMO", oInsumoObj)
                                    oParam.aInsumo.push(oInsumoObj);
                                }

                               
                            }
                        }
                        //OFFLINE
                        if(bInterneInit === true){
                            await registroService.onSaveDataGeneral(oThat.mainModelv2Online, "RMD_ESTRUCTURA", oParam);
                        }else{//OFFLINE MODEL
                            delete oParam.aInsumo;
                            delete oParam.aPaso;
                            delete oParam.aEquipo;
                            delete oParam.aUtensilio;
                            delete oParam.aEtiqueta;
                            delete oParam.aPasoInsumoPaso;
                            delete oParam.aEspecificacion;
                            await registroService.onSaveDataGeneral(oThat.mainModelv2, "RMD_ESTRUCTURA", oParam);
                        }
                            
                    }
                }
                for await (const oEstructura of aEstructuraMD.results) {
                    if (oEstructura.aInsumo.results.length === 0) {
                        let oParam = {
                            usuarioRegistro: oInfoUsuario.data.usuario,
                            fraccion: sFraccion, 
                            fechaRegistro: new Date(),
                            activo: true,
                            rmdEstructuraId: util.onGetUUIDV4(),
                            orden: oEstructura.orden,
                            rmdId_rmdId: rmdNew.rmdId,
                            estructuraId_estructuraId: oEstructura.estructuraId_estructuraId,
                            aPaso: [],
                            aEquipo : [],
                            aUtensilio : [],
                            aEtiqueta: [],
                            aPasoInsumoPaso: [],
                            aEspecificacion: [],
                            aInsumo: []
                        }
                        aListEstructurasRMD.push(oParam);
    
                        //AGREGAMOS LOS PASOS A LA ESTRUCTURA
                        let aListIdPaso = [];
                        if (oEstructura.aPaso.results.length > 0) {
                            for await (const oPaso of oEstructura.aPaso.results) {
                                if (oPaso.tipoDatoId_iMaestraId === stipoDatoNotificacion) { //SE REGISTRA LAPSO
                                    let oPasoObj = {
                                        usuarioRegistro: oInfoUsuario.data.usuario,
                                        fechaRegistro: new Date(),
                                        activo: true,
                                        rmdEstructuraPasoId: util.onGetUUIDV4(),
                                        rmdEstructuraId_rmdEstructuraId: oParam.rmdEstructuraId,
                                        rmdId_rmdId: rmdNew.rmdId,
                                        pasoId_pasoId: oPaso.pasoId_pasoId,
                                        orden: oPaso.orden,
                                        valorInicial: oPaso.valorInicial,
                                        valorFinal: oPaso.valorFinal,
                                        margen: oPaso.margen,
                                        decimales: oPaso.decimales,
                                        mdEstructuraPasoIdDepende: oPaso.mdEstructuraPasoIdDepende,
                                        depende: oPaso.depende,
                                        dependeRmdEstructuraPasoId: oPaso.dependeMdEstructuraPasoId,
                                        estadoCC: oPaso.estadoCC,
                                        estadoMov: oPaso.estadoMov,
                                        pmop: oPaso.pmop,
                                        genpp: oPaso.genpp,
                                        tab: oPaso.tab,
                                        edit: oPaso.edit,
                                        rpor: oPaso.rpor,
                                        vb: oPaso.vb,
                                        formato : oPaso.formato,
                                        imagen : false,
                                        tipoDatoId_iMaestraId: oPaso.tipoDatoId_iMaestraId,
                                        puestoTrabajo : oPaso.puestoTrabajo,
                                        clvModelo : oPaso.clvModelo,
                                        automatico : oPaso.automatico,
                                        aplica: true,
                                        fraccion: sFraccion
                                    }
                                  
                                    let objPaso = {	
                                        mdEstructuraPasoId : oPaso.rmdEstructuraPasoId,	
                                        rmdEstructuraPasoId : oPasoObj.rmdEstructuraPasoId	
                                    }
                                    aListIdPaso.push(objPaso);
                                    oParam.aPaso.push(oPasoObj);

                                    if(bInterneInit === true){
                                        //
                                    }else{//OFFLINE MODEL
                                          //OFFLINE SE Agrega Directamente el PASO
                                        await registroService.onSaveDataGeneral(oThat.mainModelv2, "RMD_ES_PASO", oPasoObj);
                                    }
                                   
                                    
                                    if (oPaso.pasoId.tipoCondicionId_iMaestraId === sIdInicioCondicion) {
                                        let pasoLapsoFin = oEstructura.aPaso.results.find(itm=>itm.clvModelo === oPaso.clvModelo && itm.puestoTrabajo === oPaso.puestoTrabajo && itm.pasoId.tipoCondicionId_iMaestraId === sIdFinCondicion); 
                                        if(pasoLapsoFin){
                                            let sobjectTrama = {
                                                usuarioRegistro: oInfoUsuario.data.usuario,
                                                fechaRegistro: new Date(),
                                                activo : true,
                                                rmdLapsoId : util.onGetUUIDV4(),
                                                rmdId_rmdId : rmdNew.rmdId,
                                                Anular : false,
                                                descripcion: oPaso.pasoId.descripcion + " - " + pasoLapsoFin.pasoId.descripcion,
                                                tipoDatoId: (oPaso.tipoDatoId_iMaestraId).toString(),
                                                automatico: pasoLapsoFin.automatico === null ? false : pasoLapsoFin.automatico,

                                                //asoId_mdEstructuraPasoId: oPaso.mdEstructuraPasoIdDepende,	
                                                pasoIdFin_mdEstructuraPasoId: pasoLapsoFin.mdEstructuraPasoIdDepende,

                                                pasoId_mdEstructuraPasoId: oPaso.mdEstructuraPasoId,
                                                //pasoIdFin_mdEstructuraPasoId: pasoLapsoFin.mdEstructuraPasoId,
                                                fraccion: sFraccion
                                            };
                                            if(bInterneInit === true ){
                                                await registroService.createData(oThat.mainModelv2Online, "/RMD_LAPSO", sobjectTrama);
                                            }else{
                                                await registroService.createData(oThat.mainModelv2, "/RMD_LAPSO", sobjectTrama);
                                            }
                                            
                                        }
                                    }
                                } else {
                                    let oPasoObj = {
                                        usuarioRegistro: oInfoUsuario.data.usuario,
                                        fechaRegistro: new Date(),
                                        activo: true,
                                        rmdEstructuraPasoId: util.onGetUUIDV4(),
                                        rmdEstructuraId_rmdEstructuraId: oParam.rmdEstructuraId,
                                        rmdId_rmdId: rmdNew.rmdId,
                                        pasoId_pasoId: oPaso.pasoId_pasoId,
                                        orden: oPaso.orden,
                                        valorInicial: oPaso.valorInicial,
                                        valorFinal: oPaso.valorFinal,
                                        margen: oPaso.margen,
                                        decimales: oPaso.decimales,
                                        mdEstructuraPasoIdDepende: oPaso.mdEstructuraPasoIdDepende,

                                        depende: oPaso.depende,
                                        mdEstructuraPasoIdDepende: oPaso.mdEstructuraPasoIdDepende,

                                        estadoCC: oPaso.estadoCC,
                                        estadoMov: oPaso.estadoMov,
                                        pmop: oPaso.pmop,
                                        genpp: oPaso.genpp,
                                        tab: oPaso.tab,
                                        edit: oPaso.edit,
                                        rpor: oPaso.rpor,
                                        vb: oPaso.vb,
                                        formato : oPaso.formato,
                                        imagen : false,
                                        tipoDatoId_iMaestraId: oPaso.tipoDatoId_iMaestraId,
                                        puestoTrabajo : oPaso.puestoTrabajo,
                                        clvModelo : oPaso.clvModelo,
                                        automatico : oPaso.automatico,
                                        aplica: true,
                                        fraccion: sFraccion
                                    }
                                    let objPaso = {
                                        mdEstructuraPasoId : oPaso.rmdEstructuraPasoId,
                                        rmdEstructuraPasoId : oPasoObj.rmdEstructuraPaso
                                    }
                                    aListIdPaso.push(objPaso); 
                                    oParam.aPaso.push(oPasoObj);
                                    
                                    if(bInterneInit === true){

                                    }else{//OFFLINE MODEL
                                        //OFFLINE SE Agrega Directamente el PASO
                                        await registroService.onSaveDataGeneral(oThat.mainModelv2, "RMD_ES_PASO", oPasoObj);
                                    }
                                    
                                }
                                // if (oPaso.tipoDatoId_iMaestraId === stipoDatoFormula) {
                                //     let aFilter = [];
                                //     aFilter.push(new Filter("pasoPadreId_mdEstructuraPasoId", "EQ", oPaso.mdEstructuraPasoId));
                                //     let aListaPasosFormula = await registroService.getDataFilter(oThat.mainModelv2, "/MD_ES_FORMULA_PASO", aFilter);
                                //     aListaPasosFormula.results.forEach(async function (e) {
                                //         let oParam = {
                                //             fechaActualiza: new Date(),
                                //             rmdPasoUsuarioId_rmdEstructuraPasoId: oPasoObj.rmdEstructuraPasoId
                                //         }
                                //         await registroService.onUpdateDataGeneral(oThat.mainModelv2, "MD_ES_FORMULA_PASO", oParam, e.mdFormulaPaso);
                                //     });
                                // }
                                // if (oPaso.tipoDatoId_iMaestraId === stipoDatoFormula || oPaso.tipoDatoId_iMaestraId === stipoDatoCantidad || oPaso.tipoDatoId_iMaestraId === stipoDatoDatoFijo || oPaso.tipoDatoId_iMaestraId === stipoDatoNumeros) {
                                //     var aFilterF = [];
                                //     aFilterF.push(new Filter("pasoFormulaId_mdEstructuraPasoId", "EQ", oPaso.mdEstructuraPasoId));
                                //     var aListaPasosFormula = await registroService.getDataFilter(oThat.mainModelv2, "/MD_ES_FORMULA_PASO", aFilterF);
                                //     aListaPasosFormula.results.forEach(async function (e) {
                                //         var oParam = {
                                //             fechaActualiza: new Date(),
                                //             rmdPasoFormulaId_rmdEstructuraPasoId: oPasoObj.rmdEstructuraPasoId
                                //         }
                                //         await registroService.onUpdateDataGeneral(oThat.mainModelv2, "MD_ES_FORMULA_PASO", oParam, e.mdFormulaPaso);
                                //     });
                                // }
                            }
                        }
    
                        //AGREGAMOS LOS EQUIPOS A LA ESTRUCTURA
                        if (oEstructura.aEquipo.results.length > 0) {
                            oEstructura.aEquipo.results.forEach(async function (oEquipo) {
                                let oEquipoObj = {
                                    usuarioRegistro: oInfoUsuario.data.usuario,
                                    fechaRegistro: new Date(),
                                    activo: true,
                                    rmdEstructuraEquipoId: util.onGetUUIDV4(),
                                    rmdEstructuraId_rmdEstructuraId: oParam.rmdEstructuraId,
                                    rmdId_rmdId: rmdNew.rmdId,
                                    equipoId_equipoId: oEquipo.equipoId_equipoId,
                                    orden: oEquipo.orden,
                                    aplica: true,
                                    fraccion: sFraccion
                                }

                                oParam.aEquipo.push(oEquipoObj);

                                if(bInterneInit === true){

                                }else{//OFFLINE MODEL
                                    //OFFLINE SE Agrega Directamente el Equipo
                                    await registroService.onSaveDataGeneral(oThat.mainModelv2, "RMD_ES_EQUIPO", oEquipoObj);
                                }
                                
                            });
                        }
            
                        //AGREGAMOS LOS UTENSILIOS A LA ESTRUCTURA
                        if (oEstructura.aUtensilio.results.length > 0) {
                            oEstructura.aUtensilio.results.forEach(async function (oUtensilio) {
                                let oUtensiliooBJ = {
                                    usuarioRegistro: oInfoUsuario.data.usuario,
                                    fechaRegistro: new Date(),
                                    activo: true,
                                    rmdEstructuraUtensilioId: util.onGetUUIDV4(),
                                    rmdEstructuraId_rmdEstructuraId: oParam.rmdEstructuraId,
                                    rmdId_rmdId: rmdNew.rmdId,
                                    utensilioId_utensilioId: oUtensilio.utensilioId_utensilioId,
                                    agrupadorId_clasificacionUtensilioId : oUtensilio.agrupadorId_clasificacionUtensilioId,
                                    orden: oUtensilio.orden,
                                    aplica: true,
                                    fraccion: sFraccion
                                }
                                oParam.aUtensilio.push(oUtensiliooBJ);
                                if(bInterneInit === true){

                                }else{//OFFLINE MODEL
                                    //OFFLINE SE Agrega Directamente utensilios
                                    await registroService.onSaveDataGeneral(oThat.mainModelv2, "RMD_ES_UTENSILIO", oUtensiliooBJ);
                                }

                            });
                        }
            
                        //AGREGAMOS LAS ETIQUETAS A LA ESTRUCTURA
                        if (oEstructura.aEtiqueta.results.length > 0) {
                            oEstructura.aEtiqueta.results.forEach(async function (oEtiqueta) {
                                let oEtiquetaObj = {
                                    usuarioRegistro: oInfoUsuario.data.usuario,
                                    fechaRegistro: new Date(),
                                    activo: true,
                                    rmdEsEtiquetaId: util.onGetUUIDV4(),
                                    rmdEstructuraId_rmdEstructuraId: oParam.rmdEstructuraId,
                                    rmdId_rmdId: rmdNew.rmdId,
                                    etiquetaId_etiquetaId: oEtiqueta.etiquetaId_etiquetaId,
                                    orden: oEtiqueta.orden,
                                    conforme: oEtiqueta.conforme,
                                    procesoMenor: oEtiqueta.procesoMenor,
                                    fraccion: sFraccion
                                }
                                
                                oParam.aEtiqueta.push(oEtiquetaObj);

                                if(bInterneInit === true){

                                }else{//OFFLINE MODEL
                                    //OFFLINE SE Agrega Directamente etiquetas
                                    await registroService.onSaveDataGeneral(oThat.mainModelv2, "RMD_ES_ETIQUETA", oEtiquetaObj);
                                }             
                                
                            });
                        }
            
                        //AGREGAMOS  LOS PROCESOS MENORES A LOS PASOS DE LA ETIQUETA DE LA ESTRUCTURA
                        if (oEstructura.aPasoInsumoPaso.results.length > 0) {
                            for await (const oProcesoMenor of oEstructura.aPasoInsumoPaso.results) {
                                //let existePasoPadre = aListIdPaso.find(itm=>itm.mdEstructuraPasoId === oProcesoMenor.pasoId_mdEstructuraPasoId)
                                let existePasoPadre = aListIdPaso.find(itm=>itm.mdEstructuraPasoId === oProcesoMenor.pasoId_rmdEstructuraPasoId)
                                let existeInsumo = aListIdsInsumos.find(itm=>itm.estructuraRecetaInsumoId === oProcesoMenor.rmdEstructuraRecetaInsumoId_rmdEstructuraRecetaInsumoId);
                                let estructuraRecta = null;
                                if (existeInsumo) {
                                    estructuraRecta = existeInsumo.rmdEstructuraRecetaInsumoId;
                                }
                                let oProcesoMenorObj = {
                                    usuarioRegistro: oInfoUsuario.data.usuario,
                                    fechaRegistro: new Date(),
                                    activo: true,
                                    rmdEstructuraPasoInsumoPasoId: util.onGetUUIDV4(),
                                    rmdEstructuraId_rmdEstructuraId: oParam.rmdEstructuraId,
                                    rmdId_rmdId: rmdNew.rmdId,
                                    pasoId_rmdEstructuraPasoId: existePasoPadre.rmdEstructuraPasoId,
                                    pasoHijoId_pasoId : oProcesoMenor.pasoHijoId_pasoId !== null ? oProcesoMenor.pasoHijoId_pasoId : null,
                                    tipoDatoId_iMaestraId : oProcesoMenor.tipoDatoId_iMaestraId,
                                    rmdEstructuraRecetaInsumoId_rmdEstructuraRecetaInsumoId : estructuraRecta,
                                    etiquetaId_etiquetaId: oProcesoMenor.etiquetaId_etiquetaId,
                                    orden : oProcesoMenor.orden,
                                    valorInicial : oProcesoMenor.valorInicial,
                                    valorFinal : oProcesoMenor.valorFinal,
                                    margen : oProcesoMenor.margen,
                                    cantidadInsumo : oProcesoMenor.cantidadInsumo,
                                    decimales : oProcesoMenor.decimales,
                                    estadoCC : oProcesoMenor.estadoCC,
                                    estadoMov : oProcesoMenor.estadoMov,
                                    genpp : oProcesoMenor.genpp,
                                    edit : oProcesoMenor.edit,
                                    tab : oProcesoMenor.tab,
                                    aplica: true,
                                    fraccion: sFraccion,
                                    Component: oProcesoMenor.Component,	
                                    Matnr: oProcesoMenor.Matnr,	
                                    Maktx: oProcesoMenor.Maktx,	
                                    CompUnit: oProcesoMenor.CompUnit
                                }
                                
                                oParam.aPasoInsumoPaso.push(oProcesoMenorObj);
                                if(bInterneInit === true){

                                }else{//OFFLINE MODEL
                                    //OFFLINE SE Agrega Directamente pasos menores
                                    await registroService.onSaveDataGeneral(oThat.mainModelv2, "RMD_ES_PASO_INSUMO_PASO", oProcesoMenorObj);
                                }
                               
                                
                            }
                        }
    
                        //AGREGAMOS LAS ESPECIFICACIONES LA ESTRUCTURA
                        if (oEstructura.aEspecificacion.results.length > 0) {
                            oEstructura.aEspecificacion.results.forEach(async function (oEspecificacion) {
                                let oEspecificacionObj = {
                                    usuarioRegistro : oInfoUsuario.data.usuario,
                                    fechaRegistro : new Date(),
                                    activo : true,
                                    rmdEstructuraEspecificacionId : util.onGetUUIDV4(),
                                    rmdEstructuraId_rmdEstructuraId : oParam.rmdEstructuraId,
                                    rmdId_rmdId: rmdNew.rmdId,
                                    ensayoPadreId_iMaestraId : oEspecificacion.ensayoPadreId_iMaestraId,
                                    //ensayoPadreId_ensayoPadreId : oEspecificacion.ensayoPadreId_ensayoPadreId,
                                    ensayoPadreSAP : oEspecificacion.ensayoPadreSAP,
                                    ensayoHijo : oEspecificacion.ensayoHijo,
                                    especificacion: oEspecificacion.especificacion,
                                    tipoDatoId_iMaestraId : oEspecificacion.tipoDatoId_iMaestraId,
                                    valorInicial : oEspecificacion.valorInicial,
                                    valorFinal : oEspecificacion.valorFinal,
                                    margen : oEspecificacion.margen,
                                    decimales : oEspecificacion.decimales,
                                    orden : oEspecificacion.orden,
                                    aplica : true,
                                    Merknr : oEspecificacion.Merknr,
                                    fraccion: sFraccion
                                }
                                
                                oParam.aEspecificacion.push(oEspecificacionObj);
                                if(bInterneInit === true){

                                }else{//OFFLINE MODEL
                                    //OFFLINE SE Agrega Directamente especificaciones
                                    await registroService.onSaveDataGeneral(oThat.mainModelv2, "RMD_ES_ESPECIFICACION", oEspecificacionObj);
                                }
                                
                                
                            });
                        }
                        //OFFLINE
                        if(bInterneInit === true){
                            await registroService.onSaveDataGeneral(oThat.mainModelv2Online, "RMD_ESTRUCTURA", oParam);
                        }else{//OFFLINE MODEL
                            delete oParam.aInsumo;
                            delete oParam.aPaso;
                            delete oParam.aEquipo;
                            delete oParam.aUtensilio;
                            delete oParam.aEtiqueta;
                            delete oParam.aPasoInsumoPaso;
                            delete oParam.aEspecificacion;
                            await registroService.onSaveDataGeneral(oThat.mainModelv2, "RMD_ESTRUCTURA", oParam);
                        }
                    }
                }
            },

            onChangeEstructuraIndividual: async function (aListaRmdItem) {
                try {
                    let sEntity;
                    let aFilter = [], sExpand;
                    let aModelPaso = oThat.getView().getModel("listRmdEsPaso").getData();
                    let aModelEquipo = oThat.getView().getModel("listRmdEsEquipo").getData();
                    let aModelUtensilio = oThat.getView().getModel("listRmdEsUtensilio").getData();
                    let aModelPasoInsumoPaso = oThat.getView().getModel("listEsPasoInsumoPasoGeneral").getData();
                    let aModelEspecificacion = oThat.getView().getModel("listRmdEsEspecificacion").getData(); 

                    if (aListaRmdItem.sTipo === 'PROCEDIMIENTO' || aListaRmdItem.sTipo === 'CUADRO' || aListaRmdItem.sTipo === 'CONDICIONAMBIENTAL') {
                        sEntity = 'RMD_ES_PASO';
                        aFilter.push(new Filter ("rmdEstructuraPasoId", "EQ", aListaRmdItem.rmdEstructuraPasoId));
                        sExpand = "tipoDatoId,pasoId";
                    } else if (aListaRmdItem.sTipo === 'PROCEDIMIENTOPM') {
                        sEntity = 'RMD_ES_PASO_INSUMO_PASO';
                        aFilter.push(new Filter ("rmdEstructuraPasoInsumoPasoId", "EQ", aListaRmdItem.rmdEstructuraPasoInsumoPasoId));
                        sExpand = "rmdEstructuraId,etiquetaId,pasoId,pasoId/pasoId,pasoHijoId,rmdEstructuraRecetaInsumoId";
                    } else if (aListaRmdItem.sTipo === 'EQUIPO') {
                        sEntity = 'RMD_ES_EQUIPO';
                        aFilter.push(new Filter ("rmdEstructuraEquipoId", "EQ", aListaRmdItem.rmdEstructuraEquipoId));
                        sExpand = "equipoId/tipoId";
                    } else if (aListaRmdItem.sTipo === 'UTENSILIO') {
                        sEntity = 'RMD_ES_UTENSILIO';
                        aFilter.push(new Filter ("rmdEstructuraUtensilioId", "EQ", aListaRmdItem.rmdEstructuraUtensilioId));
                        sExpand = "utensilioId/estadoId,utensilioId/tipoId,agrupadorId";
                    } else if (aListaRmdItem.sTipo === 'ESPECIFICACIONES') {
                        sEntity = 'RMD_ES_ESPECIFICACION';
                        aFilter.push(new Filter ("rmdEstructuraEspecificacionId", "EQ", aListaRmdItem.rmdEstructuraEspecificacionId));
                        sExpand = "rmdEstructuraId,ensayoPadreId";
                    }
                    let oResponse;
                    if(bInterneInit === true){
                        oResponse = await registroService.onGetDataGeneralFiltersExpand(oThat.mainModelv2Online, sEntity, aFilter, sExpand);
                    }else{//MODEL OFFLINE
                        oResponse = await registroService.onGetDataGeneralFiltersExpand(oThat.mainModelv2, sEntity, aFilter, sExpand);
                    }
                    
                    let aResponse;
                    if (aListaRmdItem.sTipo === 'PROCEDIMIENTO' || aListaRmdItem.sTipo === 'CUADRO' || aListaRmdItem.sTipo === 'CONDICIONAMBIENTAL') {
                        aResponse = aModelPaso.map(obj => oResponse.results.find(o => o.rmdEstructuraPasoId === obj.rmdEstructuraPasoId) || obj);
                        let oModelPaso = new JSONModel(aResponse);
                        oModelPaso.setSizeLimit(999999999);
                        oThat.getView().setModel(oModelPaso, "listRmdEsPaso");
                        oThat.getView().getModel("listRmdEsPaso").refresh(true);
                    } else if (aListaRmdItem.sTipo === 'PROCEDIMIENTOPM') {
                        aResponse = aModelPasoInsumoPaso.map(obj => oResponse.results.find(o => o.rmdEstructuraPasoInsumoPasoId === obj.rmdEstructuraPasoInsumoPasoId) || obj);
                        let oModelPaso = new JSONModel(aResponse);
                        oModelPaso.setSizeLimit(999999999);
                        oThat.getView().setModel(oModelPaso, "listEsPasoInsumoPasoGeneral");
                        oThat.getView().getModel("listEsPasoInsumoPasoGeneral").refresh(true);
                    } else if (aListaRmdItem.sTipo === 'EQUIPO') {
                        aResponse = aModelEquipo.map(obj => oResponse.results.find(o => o.rmdEstructuraEquipoId === obj.rmdEstructuraEquipoId) || obj);
                        let oModelPaso = new JSONModel(aResponse);
                        oModelPaso.setSizeLimit(999999999);
                        oThat.getView().setModel(oModelPaso, "listRmdEsEquipo");
                        oThat.getView().getModel("listRmdEsEquipo").refresh(true);
                    } else if (aListaRmdItem.sTipo === 'UTENSILIO') {
                        aResponse = aModelUtensilio.map(obj => oResponse.results.find(o => o.rmdEstructuraUtensilioId === obj.rmdEstructuraUtensilioId) || obj);
                        let oModelPaso = new JSONModel(aResponse);
                        oModelPaso.setSizeLimit(999999999);
                        oThat.getView().setModel(oModelPaso, "listRmdEsUtensilio");
                        oThat.getView().getModel("listRmdEsUtensilio").refresh(true);
                    } else if (aListaRmdItem.sTipo === 'ESPECIFICACIONES') {
                        aResponse = aModelEspecificacion.map(obj => oResponse.results.find(o => o.rmdEstructuraEspecificacionId === obj.rmdEstructuraEspecificacionId) || obj);
                        let oModelPaso = new JSONModel(aResponse);
                        oModelPaso.setSizeLimit(999999999);
                        oThat.getView().setModel(oModelPaso, "listRmdEsEspecificacion");
                        oThat.getView().getModel("listRmdEsEspecificacion").refresh(true);
                    }
                    await oThat.onCompletarAsociarDatos();
                } catch (oError) {
                    MessageBox.error(oError);
                }
            },
            //OFFLINE
            valideUserEmail:async function(){
                var that =this;
                var oDialogValidEmail = new sap.m.Dialog({
                    title: "Verificacion de Correo",
                    type: "Message",
                    content: [
                        new sap.m.Label({
                            text: "Sin internet,por favor verifique su correo",
                            labelFor: "submissionNote"
                        }),
                        new TextArea("submissionNoteAreaEmail", {
                            width: "100%",
                            placeholder: "Ingresar correo (requerido)",
                            liveChange: function (oEvent) {
                                var sText = oEvent.getParameter("value");
                                oDialogValidEmail.getBeginButton().setEnabled(sText.length > 0);
                            }.bind(that)
                        })
                    ],
                    beginButton: new sap.m.Button({
                        type: sap.m.ButtonType.Emphasized,
                        text: "Verificar",
                        enabled: true,
                        press: async function () {            
                                var sCorreo= sap.ui.getCore().byId("submissionNoteAreaEmail").getValue();
                                var UserFiltro =[];
                                UserFiltro.push(new Filter("correo", 'EQ', sCorreo));
                                let oUsuarioReg = await registroService.getDataFilter(that.mainModelv2, "/USUARIO", UserFiltro);
                                        
                                if(oUsuarioReg.results.length){
                                    MessageToast.show("Correo verificado");
                                    oDialogValidEmail.close();
                                    that.onGetUserData(sCorreo);
                                }else{
                                    MessageToast.show("No se encontro registro con el correo proporcionado, ingrese un correo valido");
                                }
                        }
                    }),
                    afterClose: function () {
                        oDialogValidEmail.destroy();
                    }
                });
                oDialogValidEmail.open();
            },
            onRefreshButton: function() {
                if (typeof sap.hybrid !== 'undefined') {
                    sap.hybrid.refreshStore();
                }
            },
            
            onFlushButton: function() {
                if (bflushCargando == false){
                    if (typeof sap.hybrid !== 'undefined') {
                        bflushCargando = true;
                        sap.hybrid.flushStore().then(function(result){
                            bflushCargando = false;
                            if(result){
                                console.log("Flush Complete");
                                storeSAPNecesidadesRMD.clear();
                                storeHANA.clear();
                                storeSAPProduccion.clear();
                                storeSAPImpresion.clear();
                            }
                        },function(error){
                            console.log("error Flush");
                            bflushCargando = false;
                        });
                    }
                }
            },

            onRefreshAutomatico:  function(){
                var oThat = this;
                //if(bRefreshCargando === false){
                    if (typeof sap.hybrid !== 'undefined') {
                        //bRefreshCargando = true;
                        sap.hybrid.refreshStoreAutomatico().then(function(result){
                            bRefreshCargando = false;
                            if(result){
                                console.log("Refresh Complete");
                                storeSAPNecesidadesRMD.clear();
                                storeHANA.clear();
                                storeSAPProduccion.clear();
                                storeSAPImpresion.clear();
                            }
                        }, function (error) {
                            bRefreshCargando = false;
                            console.log("error Refresh");
                            storeHANA.cancelFlush();
                            storeSAPNecesidadesRMD.cancelFlush();
                            storeSAPProduccion.cancelFlush();
                            storeSAPImpresion.cancelFlush();
                        });
                    }      
                //}
            },
            onFlushAndRefreshAutomatico: function(){
                if (bflushCargando == false && bRefreshCargando === false){
                    if (typeof sap.hybrid !== 'undefined') {
                        bflushCargando = true;
                        sap.hybrid.flushStore().then(function(result){
                            bflushCargando = false;

                            if(bRefreshCargando === false){
                                if (typeof sap.hybrid !== 'undefined') {
                                    //bRefreshCargando = true;
                                    sap.hybrid.refreshStoreAutomatico().then(function(result){
                                        console.log("Flush Complete");
                                        bRefreshCargando = false;
                                        if(result){
                                            console.log("Refresh Complete");
                                            storeSAPNecesidadesRMD.clear();
                                            storeHANA.clear();
                                            storeSAPProduccion.clear();
                                            storeSAPImpresion.clear();
                                        }
                                    }, function (error) {
                                        bRefreshCargando = false;
                                        console.log("error Refresh");
                                        storeHANA.cancelFlush();
                                        storeSAPNecesidadesRMD.cancelFlush();
                                        storeSAPProduccion.cancelFlush();
                                        storeSAPImpresion.cancelFlush();
                                    });
                                }      
                            }              
                        },function(error){
                            console.log("error Flush");
                            bflushCargando = false;
                        });
                    }
                }
            },
            onChangeCheckOffline:async function(oEvent){
                //var aOrdenes = oThat.getOwnerComponent().getModel("modelOffline").getData().ordenes;
                var aOrdenes = this.getView().getModel("modelOrdenOffline").getData();
                var oCheck = oEvent.getSource();
                var bSelected = oEvent.getSource().getSelected();
                var sCorreoUser = oThat.modelGeneral.getProperty("/oInfoUsuario").data.correo;
                var sUsuario = oThat.modelGeneral.getProperty("/oInfoUsuario").data.usuario

                var sOrdenSeleccionada = oEvent.getSource().getParent().getParent().getBindingContext("modelGeneral").getObject().Aufnr;

                if(bSelected === true){
                    let oDataOffline ={};
                    oDataOffline.registroId = util.onGetUUIDV4();
                    oDataOffline.orden = sOrdenSeleccionada;
                    oDataOffline.correoUsuario = sCorreoUser;
                    oDataOffline.activo = true
                    oDataOffline.usuarioRegistro = sUsuario;

                    if(bInterneInit == true){
                        
                        await registroService.createData(oThat.mainModelv2Online, "/ORDEN_OFFLINE", oDataOffline);

                        let oFilterOrdnOffline = [];
                        oFilterOrdnOffline.push(new Filter("correoUsuario", 'EQ', sCorreoUser));
                        oFilterOrdnOffline.push(new Filter("activo", 'EQ', true));

                        let oOrdenesOfline = await registroService.getDataFilter(this.mainModelv2Online, "/ORDEN_OFFLINE", oFilterOrdnOffline);
                        this.getView().setModel(new JSONModel(oOrdenesOfline.results),"modelOrdenOffline");
                        
                     }else{
                        oCheck.setSelected(!bSelected);
                     }

                    //funcion de crear nuevos filtros
                }else{
                    //buscando el path ()
                    let oFilter = [];
                        oFilter.push(new Filter("correoUsuario", 'EQ', sCorreoUser));
                        oFilter.push(new Filter("activo", 'EQ', true));
                        oFilter.push(new Filter("orden", 'EQ', parseInt(sOrdenSeleccionada)));
                    
                    let oObject =  await registroService.getDataFilter(oThat.mainModelv2Online, "/ORDEN_OFFLINE", oFilter);
                    
                    let oParam;
                    if(oObject.results){
                        oParam = oObject.results[0];
                        delete oParam.__metadata;
                        oParam.activo = false;
                    }

                    if(bInterneInit == true){
                        
                        await registroService.onUpdateDataGeneral(oThat.mainModelv2Online, "ORDEN_OFFLINE", oParam, oParam.registroId);

                        let oFilterOrdnOffline = [];
                        oFilterOrdnOffline.push(new Filter("correoUsuario", 'EQ', sCorreoUser));
                        oFilterOrdnOffline.push(new Filter("activo", 'EQ', true));

                        let oOrdenesOfline = await registroService.getDataFilter(oThat.mainModelv2Online, "/ORDEN_OFFLINE", oFilterOrdnOffline);
                        this.getView().setModel(new JSONModel(oOrdenesOfline.results),"modelOrdenOffline");

                       
                        //aOrdenes.splice(path,1);
                        //sap.hybrid.openStoreRegister(aOrdenes);
                    }else{
                        oCheck.setSelected(!bSelected);
                    }

                }
                
            },

            onSincronizeOffline:async function(){
                //var aOrdenes = oThat.getOwnerComponent().getModel("modelOffline").getData().ordenes;
                //var aOrdenes = this.getView().getModel("modelOrdenOffline").getData();
                sap.ui.core.BusyIndicator.show();
                var oOrdenesOfline;
                var sCorreoUser = oThat.modelGeneral.getProperty("/oInfoUsuario").data.correo;
                var oFilterOrdnOffline = [];
                oFilterOrdnOffline.push(new Filter("correoUsuario", 'EQ', sCorreoUser));
                oFilterOrdnOffline.push(new Filter("activo", 'EQ', true));

                if(bInterneInit === true){
                    oOrdenesOfline = await registroService.getDataFilter(this.mainModelv2Online, "/ORDEN_OFFLINE", oFilterOrdnOffline);
                    sap.hybrid.openStoreRegister(oOrdenesOfline.results);
                }
                
            },
            onCloseSession:function(){
                MessageBox.confirm(
                    "¿Desea cerrar sesión?", {
                    styleClass: "sapUiSizeCompact",
                    actions: [MessageBox.Action.YES, MessageBox.Action.NO],
                    onClose: async function (oAction) {
                        if (oAction === "YES") {
                            if (!navigator.onLine) {
                                sap.m.MessageToast.show(this.getI18nText("closeSession"), {
                                    duration: 20000
                                });
                            } else {
                                sap.Logon.core.deleteRegistration(
                                    function (res) {
                                        console.log(res);
                                        // //	sap.AppUpdate.reset();
                                        // function closeStore() {
                                        //     return new Promise(function (resolve, reject) {
                                        //         store.close(function () {
                                        //             var bValidateERP = false;
                                        //             sap.hybrid.closeStoreSuccessCallback().then(function () {
                                        //                 console.log("ERP store closed!");
                
                                        //                 localStorage.removeItem("Centers");
                                        //                 localStorage.removeItem("PVSO_Uname");
                                        //                 localStorage.removeItem("nextOrderIdOffline");
                                        //                 localStorage.removeItem("userCurrent");
                                        //                 //	localStorage.clear();
                                        //                 console.log("doDeleteRegistration() Success");
                                        //                 console.log("Unregister result: " + JSON.stringify(res));
                                        //                 //Set appContext to null so the app will know it's not registered
                                        //                 sap.hybrid.kapsel.appContext = null;
                                        //                 //reset the app to its original packaged version
                                        //                 //(remove all updates retrieved by the AppUpdate plugin)
                
                                        //                 sap.Logon.core.loadStartPage();
                                        //                 console.log("success store clear");
                                        //                 resolve(bValidateERP);
                                        //             }, function (error) {
                                        //                 console.log("error store clear");
                                        //             });
                
                                        //         }, function (error) {
                                        //             console.log("An error occurred: " + JSON.stringify(error));
                                        //         }, null, sap.hybrid.progressCallback);
                
                                        //     });
                                        // }
                                        // closeStore().then(function (resolve) {
                                        //     console.log("se cerro la tienda");
                                        //     console.log(resolve);
                                        // }, function (error) {
                                        //     console.log("no se cerro la tienda");
                                        //     console.log(error);
                                        // });
                
                                    },function (errObj) {
                                        //	localStorage.clear();
                                        //sap.hybrid.kapsel.appContext = null;
                                        //reset the app to its original packaged version
                                        //(remove all updates retrieved by the AppUpdate plugin)
                                        //sap.Logon.core.loadStartPage();
                                        console.error("doDeleteRegistration() Error");
                                        console.error(JSON.stringify(errObj));
                                    });
                            }
                        }
                    }
                });
            }
            //storeHANA.cancelDownload()
            //storeHANA.cancelFlush()
        });
    });
