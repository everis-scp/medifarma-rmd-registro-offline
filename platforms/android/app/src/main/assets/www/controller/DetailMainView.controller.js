jQuery.sap.require("sap.ndc.BarcodeScanner");
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "mif/rmd/registro/utils/util",
    "mif/rmd/registro/services/registro",
    "sap/ui/core/BusyIndicator",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/format/DateFormat",
    "mif/rmd/registro/utils/formatter",
    "sap/m/Button",
    'sap/m/ColorPalettePopover',
    'sap/ui/unified/ColorPickerDisplayMode',
    'sap/m/ResponsivePopover',
    'sap/ui/unified/ColorPicker',
    'sap/ui/unified/library',
    'sap/ui/unified/ColorPickerPopover',
    "sap/m/MessageToast",
    '../controller/etiquetas',
    '../controller/muestreo',
    "sap/ui/model/FilterType",
    'sap/ui/core/library',
    '../services/external/IAS',
    'sap/m/Dialog',
    'sap/m/library',
	"sap/m/Label",
    'sap/m/TextArea'
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
  function (Controller, MessageBox, util, registroService, BusyIndicator, Filter, FilterOperator, JSONModel, DateFormat,formatter, Button,ColorPalettePopover,ColorPickerDisplayMode,ResponsivePopover,ColorPicker,unifiedLibrary,ColorPickerPopover,MessageToast, etiquetasPDF, muestreoPdf, FilterType,coreLibrary,IAS,Dialog,mobileLibrary,Label,TextArea) {
    "use strict";
    var ColorPickerMode = unifiedLibrary.ColorPickerMode;
    const rootPath = "mif.rmd.registro";
    const sIdTipoEquipo = 472,
        sIdTipoUtensilio = 471,
        sIdTipoEstructuraCondAmbiente = 483,
        sIdTipoEstructuraCuadro = 484,
        sIdTipoEstructuraEquipo = 485,
        sIdTipoEstructuraEspecificaciones = 486,
        sIdTipoEstructuraProceso = 487,
        sIdTipoEstructuraFormula = 488,
        sIdTipoEstructuraFirmas = 489,
        sIdNivelFabricacion = 13,
        sIdNivelRecubrimiento = 17,
        sIdTipoDato = 6,
        sTxtTipoEquipo = "EQUIPO",
        iMaxLengthArchivos = 2,
        sIdVerificacionCheck = 432,
        sIdTexto = 433,
        sIdCantidad = 434,
        sIdFecha = 435,
        sIdFechayHora = 436,
        sIdHora = 437,
        sIdNumeros = 438,
        sIdRealizadopor = 439,
        sIdVistobueno = 440,
        sIdRealizadoporyVistobueno = 441,
        sIdMultiplecheck = 442,
        sIdRango = 443,
        sIdDatoFijo = 449,
        sIdFormula = 445,
        sIdSintipodedato = 446,
        sIdNotificacion = 447,
        iIdMuestraCC = 448,
        iIdLote = 444,
        iIdEntrega = 450,
        iIdFechaVencimiento = 449,
        iStateProcess=475,
        sEtapaRMD='ACON',
        SGrupoArticuloPari = 'PARIHUELA',
        sGrupoArticuloZS2 = 'ZSEB00002',
        sGrupoArticuloZS1 = 'ZSEB00001',
        sGrupoArticuloZT1 = 'ZTER00001',
        sGrupoArticuloZT1EAN13 = 'ZTER00001EAN13',
        sGrupoArticuloZT1EAN14 = 'ZTER00001EAN14',
        idRolAuxiliar = '2be255d3-f5bf-4b0d-988c-6253de8fd578',
        idRolJefeProduccion = 'bcab2349-051b-40e9-9332-a97de5a9bb57';
    let oThat,
        oThatConf,
        aListControls = [],
        sCurrentStep = "",
        codigoUserPrueba = 0,
        oInfoUsuario,
        ValueState = coreLibrary.ValueState,
        sInterval,
        EanValue;
    return Controller.extend("mif.rmd.registro.controller.DetailMainView", {
        formatter: formatter,
        onInit: function () {
            if (sap.ushell) {
                sap.ui.getCore().byId("backBtn").onclick = function(e) {
                    clearInterval(sInterval);
                    if(oThat.modelGeneral) {
                        oThat.modelGeneral.setProperty("/selectFraccionRmdId","");
                        this.vcount = 0;
                    }
                    oThat.getOwnerComponent().getRouter().navTo("RouteMainView");
                };
            }

            oThat = this;
            oThatConf = this;
            this.vcount = 0;
            this.oOwnerComponent = this.getOwnerComponent();
            this.oRouter = this.oOwnerComponent.getRouter();
            this.oRouter.getRoute("RouteDetailMainView").attachPatternMatched(this.onRouteMatched, this);
        },

        onAfterRendering: function (aThat) {
            this.modelGeneral = this.getView().getModel("modelGeneral");
            this.modelGeneral.setSizeLimit(999999999);
            this.modelEstructura = this.getView().getModel("modelEstructura");
            this.modelNecesidad = this.getView().getModel("NECESIDADESRMD_SRV");
            this.modelCentralPesadas = this.getView().getModel("CENTRALPESADAS_SRV");
            this.mainModelv2 = this.getView().getModel("mainModelv2");
            oInfoUsuario = this.modelGeneral.getProperty("/oInfoUsuario");
            this.onGetDataInitial();
        },


        onRouteMatched: async function(){
            this.modelGeneral = this.getView().getModel("modelGeneral");
            this.modelEstructura = this.getView().getModel("modelEstructura");
            this.mainModelv2 = this.getView().getModel("mainModelv2");
            //OFFLINECAMBIO
            if(this.getView().getModel("i18n")){
                this.i18n = this.getView().getModel("i18n").getResourceBundle();
            }else{
                
            }
            const lstItems = this.getView().byId("idEstructuraWizard");
            this.modelGeneral.setSizeLimit(999999999);

            // lstItems.removeAllItems();

            let oDataGeneral = oThat.getOwnerComponent().getModel("asociarDatos");
            if (!oDataGeneral) {
                oThat.onNavPress();
            } else {
                // BusyIndicator.show(0);
                // await oThat.onUpdateEnsayoSap();
                // BusyIndicator.hide();
                let aDataGeneral = oDataGeneral.getData();
                let aDataEstructuras = aDataGeneral.aEstructura.results;
                if (aDataGeneral.estadoIdRmd_iMaestraId === 478) {
                    oThat.onState(false, "generalModelState");
                } else {
                    oThat.onState(true, "generalModelState");
                }
                aDataEstructuras.sort(function (a, b) {
                    return a.orden - b.orden;
                });

                let aListPrincipalStructure = [];
                let orden = 0;
                for await (const item of aDataEstructuras) {
                    if (item.estructuraId.numeracion) {
                        orden = orden + 1;
                        item.ordenFinal = orden; 
                    } else {
                        item.ordenFinal = null;
                    }
                    aListPrincipalStructure.push({item});
                    let ictfEstructuras = new sap.m.IconTabFilter({"icon": "", "iconColor": "Default", "text": item.estructuraId.descripcion, "count": item.ordenFinal, "design": "Horizontal",
                                            "showAll": true, "textDirection": "Inherit", "enabled": true, "visible": true, "iconDensityAware": false, "key": item.orden});
                    let oContent = await this.itemsCreateTableRefactory(item);
                    ictfEstructuras.addContent(oContent);
                    lstItems.addItem(ictfEstructuras);
                }
                //OFFLINE se quita este intervalo
                sInterval = setInterval(function(){
                    oThat.onGetRefresh();
                }, 60000);
            }
        },

        onGetDataInitial: function () {
            Promise.all([oThatConf.onGetMdEsEquipo(), oThatConf.onGetMdEsUtensilio()]).then(values => {
                let oModelEquipo = new JSONModel(values[0].results);
                oModelEquipo.setSizeLimit(999999999);
                oThatConf.getView().setModel(oModelEquipo, "listMdEsEquipo");
                oThatConf.getView().getModel("listMdEsEquipo").refresh(true);

                let oModelUtensilio = new JSONModel(values[1].results);
                oModelUtensilio.setSizeLimit(999999999);
                oThatConf.getView().setModel(oModelUtensilio, "listMdEsUtensilio");
                oThatConf.getView().getModel("listMdEsUtensilio").refresh(true);

                sap.ui.core.BusyIndicator.hide();
            }).catch(function (oError) {
                sap.ui.core.BusyIndicator.hide();
                oThatConf.onErrorMessage(oError, "errorSave");
            })
        },
        onGetMdEsEquipo: function () {
            return new Promise(function (resolve, reject) {
                var mdId = oThatConf.getView().getModel("modelGeneral").getData().LineaActualMD.mdId;

                if(mdId){
                    var aFilters = [];
                    aFilters.push(new Filter("mdId_mdId", "EQ", mdId));
                    //let sExpand = "mdId,estructuraId,equipoId($expand=tipoId)";
                    //OFFLINE por al guna razon no funciona el $expand para la peticion
                    let sExpand = "mdId,estructuraId,equipoId/tipoId";
                    registroService.onGetDataGeneralFiltersExpand(oThatConf.mainModelv2, "MD_ES_EQUIPO", aFilters, sExpand).then(function (oListMdPaso) {
                        resolve(oListMdPaso);
                    }).catch(function (oError) {
                        reject(oError);
                    })
                }else{
                    resolve([]);
                }
            });
        },
        onGetMdEsUtensilio: function () {
            return new Promise(function (resolve, reject) {
                sap.ui.core.BusyIndicator.show(0);
                var mdId = oThatConf.getView().getModel("modelGeneral").getData().LineaActualMD.mdId;
                if(mdId){
                    var aFilters = [];
                    aFilters.push(new Filter("mdId_mdId", "EQ", mdId));
                    //let sExpand = "mdId,estructuraId,utensilioId($expand=estadoId,tipoId)";
                    //OFFLINE por alguna razon no funcion el $expand
                    let sExpand = "mdId,estructuraId,utensilioId/estadoId,utensilioId/tipoId";
                    registroService.onGetDataGeneralFiltersExpand(oThatConf.mainModelv2, "MD_ES_UTENSILIO", aFilters, sExpand).then(function (oListMdPaso) {
                        resolve(oListMdPaso);
                    }).catch(function (oError) {
                        reject(oError);
                    })
                }else{
                    resolve([]);
                }
            });
        },

        itemsListFactory: function(sId, oContext) {
            var aListFragments = oThat.modelGeneral.getProperty("/fragments");
            var aFindFrag = aListFragments.find(item => item.tipo === oContext.getProperty("tipo"));

            let oTable = new sap.m.Table({
                                            title: oContext.getProperty("title")
                                            })
            
            switch (aFindFrag.fragment) {
                case "Cuadros":
                    var tblCuadros =  oThat.modelGeneral.getProperty("/tblCuadros" + this.vcount);
                    var cuadrosColumn = oThat.modelGeneral.getProperty("/cuadrosColumn");
                    oThat.createColumn(cuadrosColumn, oTable);

                    if(tblCuadros){
                        oThat.createCellCuadros(tblCuadros, oTable);
                    }else{
                        const aCells = [];
                        const oRow = new sap.m.ColumnListItem({
                                    cells: aCells 
                            });

                        oTable.addItem(oRow);
                    }
                    break;
                case "Equipos":
                    //Kessiel
                    var tblEquipos =  oThat.modelGeneral.getProperty("/tblEquipos" + this.vcount);
                    var equiposColumn = oThat.modelGeneral.getProperty("/equiposColumn");
                    oThat.createColumn(equiposColumn, oTable);
                    
                    if(tblEquipos){
                        oThat.createCellEquipos(tblEquipos, oTable);
                    }else{
                        const aCells = [];
                        const oRow = new sap.m.ColumnListItem({
                                    cells: aCells 
                            });

                        oTable.addItem(oRow);
                    }
                    break;
                case "Especificaciones":
                    var tblEspecificacion=  oThat.modelGeneral.getProperty("/tblEspecificacion" + this.vcount);
                    var especificacionColumn = oThat.modelGeneral.getProperty("/especificacionColumn");
                    oThat.createColumn(especificacionColumn, oTable);

                    if(tblEspecificacion){
                        oThat.createCellEspecificacion(tblEspecificacion, oTable);
                    }else{
                        const aCells = [];
                        const oRow = new sap.m.ColumnListItem({
                                    cells: aCells 
                            });

                        oTable.addItem(oRow);
                    }
                    break 
                case "Formulas":
                    var tblFormula = oThat.modelGeneral.getProperty("/tblFormula" + this.vcount);
                    var formulaColumn = oThat.modelGeneral.getProperty("/formulaColumn");
                    oThat.createColumn(formulaColumn, oTable);

                    if(tblFormula){
                        oThat.createCellFormula(tblFormula, oTable);
                    }else{
                        const aCells = [];
                        const oRow = new sap.m.ColumnListItem({
                                    cells: aCells 
                            });

                        oTable.addItem(oRow);
                    }
                    break;
                case "CondicionesAmbientales":
                    var tblEspecificacion=  oThat.modelGeneral.getProperty("/tblCondicionesAmbientales" + this.vcount);
                    var especificacionColumn = oThat.modelGeneral.getProperty("/condicionesAmbientalesColumn");
                    oThat.createColumn(especificacionColumn, oTable);
                    //Comentado Temporal
                    if(tblEspecificacion){
                        oThat.createCellCondicionAmbiental(tblEspecificacion, oTable);
                    }else{
                        const aCells = [];
                        const oRow = new sap.m.ColumnListItem({
                                    cells: aCells 
                            });

                        oTable.addItem(oRow);
                    }
                    break 
                case "Procesos":
                    var tblProceso=  oThat.modelGeneral.getProperty("/tblProceso" + this.vcount);
                    var procesoColumn = oThat.modelGeneral.getProperty("/procesoColumn");
                    oThat.createColumnProceso(procesoColumn, oTable);

                    if(tblProceso){
                        oThat.createCellProceso(tblProceso, oTable);
                    }else{
                        const aCells = [];
                        const oRow = new sap.m.ColumnListItem({
                                    cells: aCells 
                            });

                        oTable.addItem(oRow);
                    }
                    break;
                case "VerificacionFirmas":
                    //Comentado Temporal
                    oTable = new sap.m.Table({
                        title: oContext.getProperty("title")
                    })
                    var tblVerificacionFirmas =  oThat.modelGeneral.getProperty("/tblVerificaFirmas" + this.vcount);
                    var verificacionFirmasColumn = oThat.modelGeneral.getProperty("/verificacionFirmasColumn");
                    
                    // let oModel = new JSONModel(oTable);
                    // oThat.getView().setModel(oModel, "tblVerificacionFirmas");
                    oThat.createColumn(verificacionFirmasColumn, oTable);
                    
                    if(tblVerificacionFirmas){
                        oThat.createCellVerificacionFirmas(tblVerificacionFirmas, oTable);
                    }else{
                        const aCells = [];
                        const oRow = new sap.m.ColumnListItem({
                                    cells: aCells 
                            });

                        oTable.addItem(oRow);
                    }
                    break;
                default:
                    break;
            }

            
            this.modelEstructura.setProperty("/listControls", aListControls);
            this.vcount = this.vcount + 1;

            const oUIControl = new sap.m.WizardStep(sId + (new Date()).getTime(), {
                content : oTable,
                title: oContext.getProperty("title"), nextStep: [oThat.onStepActivate]
            });
            return oUIControl;
        },

        // Fragment Tipo Estructura Cuadro
        onAddTableCuadro: function () {
            let mOptions = {
                name: rootPath + ".view.fragment.editarRM.tipoEstructura.BodyCuadro",
                type: "XML",
                controller: this
            };

            return sap.ui.core.Fragment.load(mOptions);
        },

        // Fragment Tipo Estructura Proceso
        onAddTableProceso: function () {
            let mOptions = {
                name: rootPath + ".view.fragment.editarRM.tipoEstructura.BodyProcedimiento",
                type: "XML",
                controller: this
            };

            return sap.ui.core.Fragment.load(mOptions);
        },

        // Fragment Tipo Estructura Equipo
        onAddTableEquipo: function () {
            let mOptions = {
                name: rootPath + ".view.fragment.editarRM.tipoEstructura.BodyEquipo",
                type: "XML",
                controller: this
            };

            return sap.ui.core.Fragment.load(mOptions);
        },

        // Fragment Tipo Estructura Condicion Ambiental
        onAddTableCondicionAmbiental: function () {
            let mOptions = {
                name: rootPath + ".view.fragment.editarRM.tipoEstructura.BodyCondicionAmbiental",
                type: "XML",
                controller: this
            };

            return sap.ui.core.Fragment.load(mOptions);
        },

        // Fragment Tipo Estructura Cuadro
        onAddTableEspecificacion: function () {
            let mOptions = {
                name: rootPath + ".view.fragment.editarRM.tipoEstructura.BodyEspecificacion",
                type: "XML",
                controller: this
            };

            return sap.ui.core.Fragment.load(mOptions);
        },
        // Fragment Tipo Estructura Verificaci??n de Firmas
        onAddTableVerificacionFirmas: function () {
            let mOptions = {
                name: rootPath + ".view.fragment.editarRM.tipoEstructura.BodyVerificacionFirmas",
                type: "XML",
                controller: this
            };

            return sap.ui.core.Fragment.load(mOptions);
        },

        // Fragment Tipo Estructura Formula
        onAddTableFormula: function () {
            let mOptions = {
                name: rootPath + ".view.fragment.editarRM.tipoEstructura.BodyFormula",
                type: "XML",
                controller: this
            };

            return sap.ui.core.Fragment.load(mOptions);
        },

        // Se esta Reestructurando la parte del wizard.
        itemsCreateTableRefactory: async function(oDataEstructura) {
            let oDataSeleccionada = oThat.getOwnerComponent().getModel("asociarDatos");
            let fraccionActual = oDataSeleccionada.getData().aEstructura.results[0].fraccion;
            let frgTipoEstructura,
                aUsuarios = [],
                aFechas = [];
            if (oDataEstructura.estructuraId.tipoEstructuraId_iMaestraId === sIdTipoEstructuraCuadro) {
                frgTipoEstructura = this.onAddTableCuadro();
                let aData = [];
                if (oDataEstructura.aPaso.results) {
                    oDataEstructura.aPaso.results.sort(function (a, b) {
                        return a.orden - b.orden;
                    });
                    aData = oDataEstructura.aPaso.results;
                }
                if (oDataEstructura.orden === 1) {
                    for await (const item of aData) {
                        item.sTipo = 'CUADRO';
                        item.descripcion = item.pasoId.descripcion;
                        item.generalInput = formatter.onFormatoTipoDatoInput(item);
                        item.generalCheckBox = formatter.onFormatoTipoDatoCheckBox(item);
                        item.generalType = formatter.onFormatoTipoDatoType(item.tipoDatoId_iMaestraId);
                        item.generalVisibleInput = formatter.onFormatoTipoDatoVisibleInput(item.tipoDatoId_iMaestraId);
                        item.generalVisibleText = formatter.onFormatoTipoDatoVisibleText(item.tipoDatoId_iMaestraId);
                        item.generalVisibleCheckBox = formatter.onFormatoTipoDatoVisibleCheckBox(item.tipoDatoId_iMaestraId);
                        item.generalVisibleSaveButton = formatter.onFormatoTipoDatoVisibleSaveButton(item.tipoDatoId_iMaestraId);
                        item.generalEnabledSaveButton= formatter.onFormatoEnabledSaveButton(item, oInfoUsuario.funcionUsuario, aData);
                        item.generalVisibleToggleButton = formatter.onFormatoTipoDatoVisibleToggleButton(item.tipoDatoId_iMaestraId);
                        item.onFormatoTipoDatoVisibleToggleButtonMultiCheck = formatter.onFormatoTipoDatoVisibleToggleButtonMultiCheck(item.tipoDatoId_iMaestraId);
                        item.generalEnabledPredecesor = true;
                        if (item.dependeRmdEstructuraPasoId) {
                            let itemPredecesor = {};
                            itemPredecesor = aData.find(itm=>itm.mdEstructuraPasoIdDepende === item.dependeRmdEstructuraPasoId);
                            if(!itemPredecesor) {
                                let aFilter = [];
                                aFilter.push(new Filter("mdEstructuraPasoIdDepende", "EQ", item.dependeRmdEstructuraPasoId));
                                aFilter.push(new Filter("rmdId_rmdId", "EQ", oDataSeleccionada.getData().rmdId));
                                aFilter.push(new Filter("fraccion", "EQ", fraccionActual));
                                let sExpand = "tipoDatoId,pasoId";
                                let itemResponse = await registroService.onGetDataGeneralFiltersExpand(oThat.mainModelv2, "RMD_ES_PASO", aFilter, sExpand);
                                itemPredecesor = itemResponse.results[0];
                                if (itemPredecesor) {
                                    item.generalEnabledPredecesor = formatter.onFormatoEnabledPredecesor(itemPredecesor);
                                }
                            } else {
                                item.generalEnabledPredecesor = formatter.onFormatoEnabledPredecesor(itemPredecesor);
                            }
                        }    
                        if (item.usuarioActualiza) {
                            aUsuarios.push(item.usuarioActualiza);
                        }

                        if (item.realizadoPorUser) {
                            let arrayUser = item.realizadoPorUser.split(",");
                            arrayUser.forEach(function(oUsuario){
                                aUsuarios.push(oUsuario)
                            });
                        }

                        if (item.multiCheckUser) {
                            let arrayUser = item.multiCheckUser.split(",");
                            arrayUser.forEach(function(oUsuario){
                                aUsuarios.push(oUsuario)
                            });
                        }

                        if (item.firstFechaActualiza) {
                            aFechas.push(item.firstFechaActualiza.getTime());
                        }
                    }
                
                    let oFooter = {
                        usuario: '',
                        fecha: ''
                    }
        
                    if (aUsuarios.length > 0) {
                        let oUsuarioActualizaFooter = aUsuarios.filter((value, index, self) => self.indexOf(value) === index);
                        oFooter.usuario = oUsuarioActualizaFooter.join();
                    }
                    if (aFechas.length > 0) {
                        oFooter.fecha = formatter.formatDateFooter(new Date(Math.min(...aFechas)));
                    }
                    
                    let oModelFooter = new JSONModel(oFooter);
                    oThat.getView().setModel(oModelFooter, "aFooter");
                    oThat.getView().getModel("aFooter").refresh(true);

                    let oModelCuadro = new JSONModel(aData);
                    oThat.getView().setModel(oModelCuadro, "aListPasoAssignResponsive");
                    oThat.getView().getModel("aListPasoAssignResponsive").refresh(true);
                }
            }

            if (oDataEstructura.estructuraId.tipoEstructuraId_iMaestraId === sIdTipoEstructuraProceso) {
                let oEstructuraSeleccionada = oDataEstructura;
                frgTipoEstructura = this.onAddTableProceso();
                let aProcesoData = [];
                oEstructuraSeleccionada.aEtiqueta.results.sort(function (a, b) {
                    return a.orden - b.orden;
                });
                if (oDataEstructura.orden === 1) {
                    let contador = 0;
                    for await (const oEtiqueta of oEstructuraSeleccionada.aEtiqueta.results) {
                        oEtiqueta.sTipo = "PROCEDIMIENTO";
                        oEtiqueta.descripcion = oEstructuraSeleccionada.ordenFinal + '.' + oEtiqueta.orden + '.- ' + oEtiqueta.etiquetaId.descripcion;
                        oEtiqueta.designLabel= 'Bold';
                        oEtiqueta.generalVisibleMenuButton= false;
                        oEtiqueta.generalVisibleSaveButton= false;
                        oEtiqueta.generalEnabledSaveButton= false;
                        oEtiqueta.generalVisibleText= false;
                        oEtiqueta.generalVisibleInput= false;
                        oEtiqueta.generalVisibleToggleButton= false;
                        oEtiqueta.generalVisibleCheckBox= false;
                        oEtiqueta.generalVisibleTextUsuario= false;
                        oEtiqueta.generalVisibleTextAdic= false;
                        oEtiqueta.generalEnabledPredecesor=false;
                        oEtiqueta.generalVisibleRefresh=false;
                        contador = contador + 1; 
                        oEtiqueta.contador = contador;
                        aProcesoData.push(oEtiqueta);
                        let aPasosEtiqueta = oEstructuraSeleccionada.aPaso.results.filter(itm=>itm.pasoId.etiquetaId_etiquetaId === oEtiqueta.etiquetaId_etiquetaId);
                        aPasosEtiqueta.sort(function (a, b) {
                            return a.orden - b.orden;
                        });
                        for await (const oPasoEtiqueta of aPasosEtiqueta) {
                            oPasoEtiqueta.sTipo = "PROCEDIMIENTO";
                            oPasoEtiqueta.descripcion = oEstructuraSeleccionada.ordenFinal + '.' + oEtiqueta.orden + '.' + oPasoEtiqueta.orden + '.- ' + oPasoEtiqueta.pasoId.descripcion;
                            oPasoEtiqueta.generalInput = formatter.onFormatoTipoDatoInput(oPasoEtiqueta);
                            oPasoEtiqueta.generalCheckBox = formatter.onFormatoTipoDatoCheckBox(oPasoEtiqueta);
                            oPasoEtiqueta.generalType = formatter.onFormatoTipoDatoType(oPasoEtiqueta.tipoDatoId_iMaestraId);
                            oPasoEtiqueta.generalVisibleInput = formatter.onFormatoTipoDatoVisibleInput(oPasoEtiqueta.tipoDatoId_iMaestraId);
                            oPasoEtiqueta.generalVisibleText = formatter.onFormatoTipoDatoVisibleText(oPasoEtiqueta.tipoDatoId_iMaestraId);
                            oPasoEtiqueta.generalVisibleCheckBox = formatter.onFormatoTipoDatoVisibleCheckBox(oPasoEtiqueta.tipoDatoId_iMaestraId);
                            oPasoEtiqueta.generalVisibleSaveButton = formatter.onFormatoTipoDatoVisibleSaveButton(oPasoEtiqueta.tipoDatoId_iMaestraId);
                            oPasoEtiqueta.generalEnabledSaveButton= formatter.onFormatoEnabledSaveButton(oPasoEtiqueta, oInfoUsuario.funcionUsuario, oEstructuraSeleccionada.aPaso.results);
                            oPasoEtiqueta.generalVisibleToggleButton = formatter.onFormatoTipoDatoVisibleToggleButton(oPasoEtiqueta.tipoDatoId_iMaestraId);
                            oPasoEtiqueta.onFormatoTipoDatoVisibleToggleButtonMultiCheck = formatter.onFormatoTipoDatoVisibleToggleButtonMultiCheck(oPasoEtiqueta.tipoDatoId_iMaestraId);
                            oPasoEtiqueta.generalVisibleMenuButton= true;
                            oPasoEtiqueta.generalEnabledPredecesor=true;
                            oPasoEtiqueta.generalVisibleRefresh= formatter.onFormatoTipoDatoVisibleRefresh(oPasoEtiqueta.tipoDatoId_iMaestraId);
                            if (oPasoEtiqueta.dependeRmdEstructuraPasoId) {
                                let oPasoEtiquetaPredecesor = {};
                                oPasoEtiquetaPredecesor = aPasosEtiqueta.find(itm=>itm.mdEstructuraPasoIdDepende === oPasoEtiqueta.dependeRmdEstructuraPasoId);
                                if(!oPasoEtiquetaPredecesor) {
                                    let aFilter = [];
                                    aFilter.push(new Filter("mdEstructuraPasoIdDepende", "EQ", oPasoEtiqueta.dependeRmdEstructuraPasoId));
                                    aFilter.push(new Filter("rmdId_rmdId", "EQ", oDataSeleccionada.getData().rmdId));
                                    aFilter.push(new Filter("fraccion", "EQ", fraccionActual));
                                    let sExpand = "tipoDatoId,pasoId";
                                    let itemResponse = await registroService.onGetDataGeneralFiltersExpand(oThat.mainModelv2, "RMD_ES_PASO", aFilter, sExpand);
                                    oPasoEtiquetaPredecesor = itemResponse.results[0];
                                    if (oPasoEtiquetaPredecesor) {
                                        oPasoEtiqueta.generalEnabledPredecesor = formatter.onFormatoEnabledPredecesor(oPasoEtiquetaPredecesor);
                                    }
                                } else {
                                    oPasoEtiqueta.generalEnabledPredecesor = formatter.onFormatoEnabledPredecesor(oPasoEtiquetaPredecesor);
                                }
                            }
                            if (oPasoEtiqueta.usuarioActualiza) {
                                aUsuarios.push(oPasoEtiqueta.usuarioActualiza);
                            }
                            if (oPasoEtiqueta.firstFechaActualiza) {
                                aFechas.push(oPasoEtiqueta.firstFechaActualiza.getTime());
                            }
                            contador = contador + 1; 
                            oPasoEtiqueta.contador = contador;
                            aProcesoData.push(oPasoEtiqueta);
                            let aExistePasoMenor = oEstructuraSeleccionada.aPasoInsumoPaso.results.filter(itm=>itm.pasoId_rmdEstructuraPasoId === oPasoEtiqueta.rmdEstructuraPasoId);
                            aExistePasoMenor.sort(function (a, b) {
                                return a.orden - b.orden;
                            });
                            aExistePasoMenor.forEach(function(oPasoInsumoPaso){
                                let descripcion;
                                if (oPasoInsumoPaso.rmdEstructuraRecetaInsumoId_rmdEstructuraRecetaInsumoId) {
                                    descripcion = oPasoInsumoPaso.rmdEstructuraRecetaInsumoId.Maktx;
                                } else if (oPasoInsumoPaso.pasoHijoId_pasoId) {
                                    descripcion = oPasoInsumoPaso.pasoHijoId.descripcion;     
                                }
                                oPasoInsumoPaso.sTipo = "PROCEDIMIENTOPM";
                                oPasoInsumoPaso.descripcion= oEstructuraSeleccionada.ordenFinal + '.' + oEtiqueta.orden + '.' + oPasoEtiqueta.orden + '.' + oPasoInsumoPaso.orden + '.- ' + descripcion;
                                oPasoInsumoPaso.generalInput= formatter.onFormatoTipoDatoInput(oPasoInsumoPaso);
                                oPasoInsumoPaso.generalCheckBox= formatter.onFormatoTipoDatoCheckBox(oPasoInsumoPaso);
                                oPasoInsumoPaso.generalType= formatter.onFormatoTipoDatoType(oPasoInsumoPaso.tipoDatoId_iMaestraId);
                                oPasoInsumoPaso.generalVisibleInput= formatter.onFormatoTipoDatoVisibleInput(oPasoInsumoPaso.tipoDatoId_iMaestraId);
                                oPasoInsumoPaso.generalVisibleText= formatter.onFormatoTipoDatoVisibleText(oPasoInsumoPaso.tipoDatoId_iMaestraId);
                                oPasoInsumoPaso.generalVisibleCheckBox= formatter.onFormatoTipoDatoVisibleCheckBox(oPasoInsumoPaso.tipoDatoId_iMaestraId);
                                oPasoInsumoPaso.generalVisibleSaveButton= formatter.onFormatoTipoDatoVisibleSaveButton(oPasoInsumoPaso.tipoDatoId_iMaestraId);
                                oPasoInsumoPaso.generalEnabledSaveButton= formatter.onFormatoEnabledSaveButton(oPasoInsumoPaso, oInfoUsuario.funcionUsuario, oEstructuraSeleccionada.aPaso.results);
                                oPasoInsumoPaso.generalVisibleToggleButton= formatter.onFormatoTipoDatoVisibleToggleButton(oPasoInsumoPaso.tipoDatoId_iMaestraId);
                                oPasoInsumoPaso.onFormatoTipoDatoVisibleToggleButtonMultiCheck = formatter.onFormatoTipoDatoVisibleToggleButtonMultiCheck(oPasoInsumoPaso.tipoDatoId_iMaestraId);
                                oPasoInsumoPaso.generalVisibleMenuButton= false;
                                oPasoInsumoPaso.generalEnabledPredecesor= oPasoEtiqueta.generalEnabledPredecesor;
                                oPasoInsumoPaso.generalVisibleRefresh= formatter.onFormatoTipoDatoVisibleRefresh(oPasoInsumoPaso.tipoDatoId_iMaestraId);
                                if (oPasoInsumoPaso.usuarioActualiza) {
                                    aUsuarios.push(oPasoInsumoPaso.usuarioActualiza);
                                }
                                if (oPasoInsumoPaso.realizadoPorUser) {
                                    let arrayUser = oPasoInsumoPaso.realizadoPorUser.split(",");
                                    arrayUser.forEach(function(oUsuario){
                                        aUsuarios.push(oUsuario)
                                    });
                                }
        
                                if (oPasoInsumoPaso.multiCheckUser) {
                                    let arrayUser = oPasoInsumoPaso.multiCheckUser.split(",");
                                    arrayUser.forEach(function(oUsuario){
                                        aUsuarios.push(oUsuario)
                                    });
                                }
                                if (oPasoInsumoPaso.firstFechaActualiza) {
                                    aFechas.push(oPasoInsumoPaso.firstFechaActualiza.getTime());
                                }
                                contador = contador + 1; 
                                oPasoInsumoPaso.contador = contador;
                                aProcesoData.push(oPasoInsumoPaso);
                            });
                        }
                    }
                    let oFooter = {
                        usuario: '',
                        fecha: ''
                    }

                    if (aUsuarios.length > 0) {
                        let oUsuarioActualizaFooter = aUsuarios.filter((value, index, self) => self.indexOf(value) === index);
                        oFooter.usuario = oUsuarioActualizaFooter.join();
                    }
                    if (aFechas.length > 0) {
                        oFooter.fecha = formatter.formatDateFooter(new Date(Math.min(...aFechas)));
                    }
                    
                    let oModelFooter = new JSONModel(oFooter);
                    oThat.getView().setModel(oModelFooter, "aFooter");

                    let oModelProcess = new JSONModel(aProcesoData);
                    oModelProcess.setSizeLimit(999999999);
                    oThat.getView().setModel(oModelProcess, "aListProcessAssignResponsive");
                }
            }

            if (oDataEstructura.estructuraId.tipoEstructuraId_iMaestraId === sIdTipoEstructuraEquipo) {
                frgTipoEstructura = this.onAddTableEquipo();
                let aDataEquipo = [],
                    aDataUtensilio = [],
                    dDate = new Date(),
                    dTime = dDate.getTime();
                if (oDataEstructura.aEquipo.results) {
                    oDataEstructura.aEquipo.results.sort(function (a, b) {
                        return a.orden - b.orden;
                    });
                    aDataEquipo = oDataEstructura.aEquipo.results;
                }

                if (oDataEstructura.aUtensilio.results) {
                    oDataEstructura.aUtensilio.results.sort(function (a, b) {
                        return a.orden - b.orden;
                    });
                    aDataUtensilio = oDataEstructura.aUtensilio.results;
                }

                if (oDataEstructura.orden === 1) {
                    let aRmDEquipoUtensilio = aDataEquipo.concat(aDataUtensilio);
                    let aRmDEquipoUtensilios = [];
                    aRmDEquipoUtensilio.forEach(function(oRmDEquipoUtensilio){
                        let oRmDEquipoUtensilios = {};
                        let stateCalibracion = 'Success';
                        oRmDEquipoUtensilios.generalEnabledSaveButton= formatter.onFormatoEnabledSaveButtonItem(oInfoUsuario.funcionUsuario);
                        if(oRmDEquipoUtensilio.equipoId_equipoId) {
                            oRmDEquipoUtensilios.sTipo = 'EQUIPO';
                            oRmDEquipoUtensilios.rmdEstructuraEquipoId = oRmDEquipoUtensilio.rmdEstructuraEquipoId;
                            oRmDEquipoUtensilios.tipoDatoId_iMaestraId = sIdVerificacionCheck;
                            oRmDEquipoUtensilios.equipoId = oRmDEquipoUtensilio.equipoId_equipoId;
                            oRmDEquipoUtensilios.datosGenerales = oRmDEquipoUtensilio.equipoId;
                            oRmDEquipoUtensilios.codigo = oRmDEquipoUtensilio.equipoId.equnr;
                            oRmDEquipoUtensilios.descripcion = oRmDEquipoUtensilio.equipoId.eqktx;
                            oRmDEquipoUtensilios.estado = oRmDEquipoUtensilio.equipoId.estat;
                            oRmDEquipoUtensilios.ctext = oRmDEquipoUtensilio.equipoId.ctext;
                            oRmDEquipoUtensilios.tipo = oRmDEquipoUtensilio.equipoId.tipoId.contenido;
                            oRmDEquipoUtensilios.tipoId = oRmDEquipoUtensilio.equipoId.tipoId_iMaestraId;
                            oRmDEquipoUtensilios.dateCalibracion = oRmDEquipoUtensilio.equipoId.gstrp ? formatter.formatDateFooter(new Date(oRmDEquipoUtensilio.equipoId.gstrp)) : "";
                            oRmDEquipoUtensilios.descCalibracion = oRmDEquipoUtensilio.equipoId.ktext;
                            if (oRmDEquipoUtensilio.equipoId.gstrp) {
                                if(oRmDEquipoUtensilio.equipoId.gstrp.getTime()>=dTime){
                                    stateCalibracion="Success";
                                }else{
                                    stateCalibracion='Error';
                                }
                            }
                            oRmDEquipoUtensilios.stateCalibracion = stateCalibracion;
                            oRmDEquipoUtensilios.usuarioActualiza = oRmDEquipoUtensilio.usuarioActualiza;
                            oRmDEquipoUtensilios.fechaActualiza = oRmDEquipoUtensilio.fechaActualiza;
                            oRmDEquipoUtensilios.firstFechaActualiza = oRmDEquipoUtensilio.firstFechaActualiza;
                            oRmDEquipoUtensilios.verifCheck = oRmDEquipoUtensilio.verifCheck;
                            oRmDEquipoUtensilios.aplica = oRmDEquipoUtensilio.aplica;
                            oRmDEquipoUtensilios.generalCheckBox = oRmDEquipoUtensilio.verifCheck;
                            aRmDEquipoUtensilios.push(oRmDEquipoUtensilios);
                        } else {
                            if (oRmDEquipoUtensilios.agrupadorId_clasificacionUtensilioId) {
                                oRmDEquipoUtensilios.tipoDatoId_iMaestraId = sIdVerificacionCheck;
                                oRmDEquipoUtensilios.codigo = '';
                                oRmDEquipoUtensilios.descripcion = oRmDEquipoUtensilio.agrupadorId.descripcion;
                                oRmDEquipoUtensilios.estado = '';
                                oRmDEquipoUtensilios.ctext = '';
                                oRmDEquipoUtensilios.tipo = 'AGRUPADOR';
                                oRmDEquipoUtensilios.dateCalibracion = '';
                                oRmDEquipoUtensilios.descCalibracion = '';
                                oRmDEquipoUtensilios.stateCalibracion = stateCalibracion;
                                oRmDEquipoUtensilios.generalCheckBox = oRmDEquipoUtensilio.verifCheck;aa
                                aRmDEquipoUtensilios.push(oRmDEquipoUtensilios);
                            } else if (oRmDEquipoUtensilio.utensilioId_utensilioId){
                                oRmDEquipoUtensilios.sTipo = 'UTENSILIO';
                                oRmDEquipoUtensilios.rmdEstructuraUtensilioId = oRmDEquipoUtensilio.rmdEstructuraUtensilioId;
                                oRmDEquipoUtensilios.utensilioId = oRmDEquipoUtensilio.utensilioId_utensilioId;
                                oRmDEquipoUtensilios.tipoDatoId_iMaestraId = sIdVerificacionCheck;
                                oRmDEquipoUtensilios.datosGenerales = oRmDEquipoUtensilio.utensilioId;
                                oRmDEquipoUtensilios.codigo = oRmDEquipoUtensilio.utensilioId.codigo;
                                oRmDEquipoUtensilios.descripcion = oRmDEquipoUtensilio.utensilioId.descripcion;
                                oRmDEquipoUtensilios.estado = oRmDEquipoUtensilio.utensilioId.estadoId.contenido;
                                oRmDEquipoUtensilios.ctext = '';
                                oRmDEquipoUtensilios.tipo = oRmDEquipoUtensilio.utensilioId.tipoId.contenido;
                                oRmDEquipoUtensilios.tipoId = oRmDEquipoUtensilio.utensilioId.tipoId_iMaestraId;
                                oRmDEquipoUtensilios.dateCalibracion = '';
                                oRmDEquipoUtensilios.descCalibracion = '';
                                oRmDEquipoUtensilios.stateCalibracion = '';
                                oRmDEquipoUtensilios.usuarioActualiza = oRmDEquipoUtensilio.usuarioActualiza;
                                oRmDEquipoUtensilios.fechaActualiza = oRmDEquipoUtensilio.fechaActualiza;
                                oRmDEquipoUtensilios.firstFechaActualiza = oRmDEquipoUtensilio.firstFechaActualiza;
                                oRmDEquipoUtensilios.verifCheck = oRmDEquipoUtensilio.verifCheck;
                                oRmDEquipoUtensilios.aplica = oRmDEquipoUtensilio.aplica;
                                oRmDEquipoUtensilios.generalCheckBox = oRmDEquipoUtensilio.verifCheck;
                                aRmDEquipoUtensilios.push(oRmDEquipoUtensilios);
                            }
                        }
    
                        if (oRmDEquipoUtensilio.usuarioActualiza) {
                            aUsuarios.push(oRmDEquipoUtensilio.usuarioActualiza);
                        }
                        if (oRmDEquipoUtensilio.realizadoPorUser) {
                            let arrayUser = oRmDEquipoUtensilio.realizadoPorUser.split(",");
                            arrayUser.forEach(function(oUsuario){
                                aUsuarios.push(oUsuario)
                            });
                        }

                        if (oRmDEquipoUtensilio.multiCheckUser) {
                            let arrayUser = oRmDEquipoUtensilio.multiCheckUser.split(",");
                            arrayUser.forEach(function(oUsuario){
                                aUsuarios.push(oUsuario)
                            });
                        }
                        if (oRmDEquipoUtensilio.firstFechaActualiza) {
                            aFechas.push(oRmDEquipoUtensilio.firstFechaActualiza.getTime());
                        }
                    });

                    let oFooter = {
                        usuario: '',
                        fecha: ''
                    }
    
                    if (aUsuarios.length > 0) {
                        let oUsuarioActualizaFooter = aUsuarios.filter((value, index, self) => self.indexOf(value) === index);
                        oFooter.usuario = oUsuarioActualizaFooter.join();
                    }
                    if (aFechas.length > 0) {
                        oFooter.fecha = formatter.formatDateFooter(new Date(Math.min(...aFechas)));
                    }
                    
                    let oModelFooter = new JSONModel(oFooter);
                    oThat.getView().setModel(oModelFooter, "aFooter");

                    aRmDEquipoUtensilio.sort(function (a, b) {
                        return a.orden - b.orden;
                    });

                    let oModelEquipoUten = new JSONModel(aRmDEquipoUtensilio);
                    oModelEquipoUten.setSizeLimit(999999999);
                    oThat.getView().setModel(oModelEquipoUten, "aListEquipoAssignResponsive");
                }
            }

            if (oDataEstructura.estructuraId.tipoEstructuraId_iMaestraId === sIdTipoEstructuraCondAmbiente) {
                frgTipoEstructura = this.onAddTableCondicionAmbiental();
                let aData = [];
                if (oDataEstructura.aPaso.results) {
                    oDataEstructura.aPaso.results.sort(function (a, b) {
                        return a.orden - b.orden;
                    });
                    aData = oDataEstructura.aPaso.results;
                }
                if (oDataEstructura.orden === 1) {
                    for await (const item of aData) {
                        item.sTipo = 'CONDICIONAMBIENTAL';
                        item.descripcion = item.pasoId.descripcion;
                        item.generalInput = formatter.onFormatoTipoDatoInput(item);
                        item.generalCheckBox = formatter.onFormatoTipoDatoCheckBox(item);
                        item.generalType = formatter.onFormatoTipoDatoType(item.tipoDatoId_iMaestraId);
                        item.generalVisibleInput = formatter.onFormatoTipoDatoVisibleInput(item.tipoDatoId_iMaestraId);
                        item.generalVisibleText = formatter.onFormatoTipoDatoVisibleText(item.tipoDatoId_iMaestraId);
                        item.generalVisibleCheckBox = formatter.onFormatoTipoDatoVisibleCheckBox(item.tipoDatoId_iMaestraId);
                        item.generalVisibleSaveButton = formatter.onFormatoTipoDatoVisibleSaveButton(item.tipoDatoId_iMaestraId);
                        item.generalVisibleToggleButton = formatter.onFormatoTipoDatoVisibleToggleButton(item.tipoDatoId_iMaestraId);
                        item.onFormatoTipoDatoVisibleToggleButtonMultiCheck = formatter.onFormatoTipoDatoVisibleToggleButtonMultiCheck(item.tipoDatoId_iMaestraId);
                        if (item.usuarioActualiza) {
                            aUsuarios.push(item.usuarioActualiza);
                        }
                        if (item.realizadoPorUser) {
                            let arrayUser = item.realizadoPorUser.split(",");
                            arrayUser.forEach(function(oUsuario){
                                aUsuarios.push(oUsuario)
                            });
                        }

                        if (item.multiCheckUser) {
                            let arrayUser = item.multiCheckUser.split(",");
                            arrayUser.forEach(function(oUsuario){
                                aUsuarios.push(oUsuario)
                            });
                        }
                        if (item.firstFechaActualiza) {
                            aFechas.push(item.firstFechaActualiza.getTime());
                        }
                    }
                
                    let oFooter = {
                        usuario: '',
                        fecha: ''
                    }

                    if (aUsuarios.length > 0) {
                        let oUsuarioActualizaFooter = aUsuarios.filter((value, index, self) => self.indexOf(value) === index);
                        oFooter.usuario = oUsuarioActualizaFooter.join();
                    }
                    if (aFechas.length > 0) {
                        oFooter.fecha = formatter.formatDateFooter(new Date(Math.min(...aFechas)));
                    }
                    
                    let oModelFooter = new JSONModel(oFooter);
                    oThat.getView().setModel(oModelFooter, "aFooter");

                    let oModelCondicionAmbiental = new JSONModel(aData);
                    oModelCondicionAmbiental.setSizeLimit(999999999);
                    oThat.getView().setModel(oModelCondicionAmbiental, "aListPasoAssignResponsive");
                    oThat.getView().getModel("aListPasoAssignResponsive").refresh(true);
                }      
            }

            if (oDataEstructura.estructuraId.tipoEstructuraId_iMaestraId === sIdTipoEstructuraEspecificaciones) {
                frgTipoEstructura = this.onAddTableEspecificacion();
                let aData = [];
                if (oDataEstructura.aEspecificacion.results) {
                    oDataEstructura.aEspecificacion.results.sort(function (a, b) {
                        return a.orden - b.orden;
                    });
                    aData = oDataEstructura.aEspecificacion.results;
                }
                if (oDataEstructura.orden === 1) {
                    for await (const item of aData) {
                        item.sTipo = 'ESPECIFICACIONES';
                        item.generalEnabledSaveButton= formatter.onFormatoEnabledSaveButtonItem(oInfoUsuario.funcionUsuario);
                        // item.descripcion = item.pasoId.descripcion;
    
                        if (item.usuarioActualiza) {
                            aUsuarios.push(item.usuarioActualiza);
                        }

                        if (item.realizadoPorUser) {
                            let arrayUser = item.realizadoPorUser.split(",");
                            arrayUser.forEach(function(oUsuario){
                                aUsuarios.push(oUsuario)
                            });
                        }

                        if (item.multiCheckUser) {
                            let arrayUser = item.multiCheckUser.split(",");
                            arrayUser.forEach(function(oUsuario){
                                aUsuarios.push(oUsuario)
                            });
                        }

                        if (item.firstFechaActualiza) {
                            aFechas.push(item.firstFechaActualiza.getTime());
                        }
                    }
                
                    let oFooter = {
                        usuario: '',
                        fecha: ''
                    }

                    if (aUsuarios.length > 0) {
                        let oUsuarioActualizaFooter = aUsuarios.filter((value, index, self) => self.indexOf(value) === index);
                        oFooter.usuario = oUsuarioActualizaFooter.join();
                    }
                    if (aFechas.length > 0) {
                        oFooter.fecha = formatter.formatDateFooter(new Date(Math.min(...aFechas)));
                    }
                    
                    let oModelFooter = new JSONModel(oFooter);
                    oThat.getView().setModel(oModelFooter, "aFooter");

                    let oModelEspecificacion = new JSONModel(aData);
                    oModelEspecificacion.setSizeLimit(999999999);
                    oThat.getView().setModel(oModelEspecificacion, "aListEspecificacionAssignResponsive");
                    oThat.getView().getModel("aListEspecificacionAssignResponsive").refresh(true);
                }      
            }

            if (oDataEstructura.estructuraId.tipoEstructuraId_iMaestraId === sIdTipoEstructuraFirmas) {
                frgTipoEstructura = this.onAddTableVerificacionFirmas();
                if (oDataEstructura.orden === 1) {
                    let aFilters = [];
                    aFilters.push(new Filter("fraccion", "EQ", oDataEstructura.fraccion));
                    aFilters.push(new Filter("rmdId_rmdId", "EQ", oDataEstructura.rmdId_rmdId));
                    let sExpand = "usuarioId"
                    let aUsuariosResponse = await registroService.onGetDataGeneralFiltersExpand(oThat.mainModelv2, "RMD_USUARIO", aFilters, sExpand);
                    let oModelVerificacionFirmas = new JSONModel(aUsuariosResponse.results);
                    oModelVerificacionFirmas.setSizeLimit(999999999);
                    oThat.getView().setModel(oModelVerificacionFirmas, "aListVerifFirmasAssignResponsive");
                    oThat.getView().getModel("aListVerifFirmasAssignResponsive").refresh(true);
                }
            }
                
            if (oDataEstructura.estructuraId.tipoEstructuraId_iMaestraId === sIdTipoEstructuraFormula) {
                frgTipoEstructura = this.onAddTableFormula();
                let aData = [];
                if (oDataEstructura.aInsumo.results) {
                    oDataEstructura.aInsumo.results.sort(function (a, b) {
                        return a.ItemNo - b.ItemNo;
                    });
                    aData = oDataEstructura.aInsumo.results;
                }
                if (oDataEstructura.orden === 1) {
                    for await (const item of aData) {
                        item.generalEnabledSaveButton= formatter.onFormatoEnabledSaveButtonItem(oInfoUsuario.funcionUsuario);
                        item.sTipo = 'FORMULA';
    
                        if (item.usuarioActualiza) {
                            aUsuarios.push(item.usuarioActualiza);
                        }
                        if (item.realizadoPorUser) {
                            let arrayUser = item.realizadoPorUser.split(",");
                            arrayUser.forEach(function(oUsuario){
                                aUsuarios.push(oUsuario)
                            });
                        }
                        if (item.multiCheckUser) {
                            let arrayUser = item.multiCheckUser.split(",");
                            arrayUser.forEach(function(oUsuario){
                                aUsuarios.push(oUsuario)
                            });
                        }
                        if (item.firstFechaActualiza) {
                            aFechas.push(item.firstFechaActualiza.getTime());
                        }
                    }
                
                    let oFooter = {
                        usuario: '',
                        fecha: ''
                    }

                    if (aUsuarios.length > 0) {
                        let oUsuarioActualizaFooter = aUsuarios.filter((value, index, self) => self.indexOf(value) === index);
                        oFooter.usuario = oUsuarioActualizaFooter.join();
                    }
                    if (aFechas.length > 0) {
                        oFooter.fecha = formatter.formatDateFooter(new Date(Math.min(...aFechas)));
                    }
                    
                    let oModelFooter = new JSONModel(oFooter);
                    oThat.getView().setModel(oModelFooter, "aFooter");

                    let oModelFormula = new JSONModel(aData);
                    oModelFormula.setSizeLimit(999999999);
                    oThat.getView().setModel(oModelFormula, "aListInsumosAssignResponsive");
                    oThat.getView().getModel("aListInsumosAssignResponsive").refresh(true);
                }      
            }
            
            return frgTipoEstructura;
        },

        // Se esta Reestructurando la parte del wizard.
        itemsListFactoryRefactory: function() {
            var aListFragments = oThat.modelGeneral.getProperty("/fragments");
            var aFindFrag = aListFragments.find(item => item.tipo === oContext.tipo);

            let oTable = new sap.m.Table({title: oContext.title})
            
            switch (aFindFrag.fragment) {
                case "Cuadros":
                    var tblCuadros =  oThat.modelGeneral.getProperty("/tblCuadros" + oContext.orden);
                    var cuadrosColumn = oThat.modelGeneral.getProperty("/cuadrosColumn");
                    oThat.createColumn(cuadrosColumn, oTable);

                    if(tblCuadros){
                        oThat.createCellCuadros(tblCuadros, oTable);
                    }else{
                        const aCells = [];
                        const oRow = new sap.m.ColumnListItem({
                                    cells: aCells 
                            });

                        oTable.addItem(oRow);
                    }
                    break;
                case "Equipos":
                    //Kessiel
                    var tblEquipos =  oThat.modelGeneral.getProperty("/tblEquipos" + oContext.orden);
                    var equiposColumn = oThat.modelGeneral.getProperty("/equiposColumn");
                    oThat.createColumn(equiposColumn, oTable);
                    
                    if(tblEquipos){
                        oThat.createCellEquipos(tblEquipos, oTable);
                    }else{
                        const aCells = [];
                        const oRow = new sap.m.ColumnListItem({
                                    cells: aCells 
                            });

                        oTable.addItem(oRow);
                    }
                    break;
                case "Especificaciones":
                    var tblEspecificacion=  oThat.modelGeneral.getProperty("/tblEspecificacion" + oContext.orden);
                    var especificacionColumn = oThat.modelGeneral.getProperty("/especificacionColumn");
                    oThat.createColumn(especificacionColumn, oTable);

                    if(tblEspecificacion){
                        oThat.createCellEspecificacion(tblEspecificacion, oTable);
                    }else{
                        const aCells = [];
                        const oRow = new sap.m.ColumnListItem({
                                    cells: aCells 
                            });

                        oTable.addItem(oRow);
                    }
                    break 
                case "Formulas":
                    var tblFormula = oThat.modelGeneral.getProperty("/tblFormula" + oContext.orden);
                    var formulaColumn = oThat.modelGeneral.getProperty("/formulaColumn");
                    oThat.createColumn(formulaColumn, oTable);

                    if(tblFormula){
                        oThat.createCellFormula(tblFormula, oTable);
                    }else{
                        const aCells = [];
                        const oRow = new sap.m.ColumnListItem({
                                    cells: aCells 
                            });

                        oTable.addItem(oRow);
                    }
                    break;
                case "CondicionesAmbientales":
                    var tblEspecificacion=  oThat.modelGeneral.getProperty("/tblCondicionesAmbientales" + oContext.orden);
                    var especificacionColumn = oThat.modelGeneral.getProperty("/condicionesAmbientalesColumn");
                    oThat.createColumn(especificacionColumn, oTable);
                    //Comentado Temporal
                    if(tblEspecificacion){
                        oThat.createCellCondicionAmbiental(tblEspecificacion, oTable);
                    }else{
                        const aCells = [];
                        const oRow = new sap.m.ColumnListItem({
                                    cells: aCells 
                            });

                        oTable.addItem(oRow);
                    }
                    break 
                case "Procesos":
                    var tblProceso=  oThat.modelGeneral.getProperty("/tblProceso" + oContext.orden);
                    var procesoColumn = oThat.modelGeneral.getProperty("/procesoColumn");
                    oThat.createColumnProceso(procesoColumn, oTable);

                    if(tblProceso){
                        oThat.createCellProceso(tblProceso, oTable);
                    }else{
                        const aCells = [];
                        const oRow = new sap.m.ColumnListItem({
                                    cells: aCells 
                            });

                        oTable.addItem(oRow);
                    }
                    break;
                case "VerificacionFirmas":
                    //Comentado Temporal
                    oTable = new sap.m.Table({
                        title: oContext.title
                    })
                    var tblVerificacionFirmas =  oThat.modelGeneral.getProperty("/tblVerificaFirmas" + oContext.orden);
                    var verificacionFirmasColumn = oThat.modelGeneral.getProperty("/verificacionFirmasColumn");
                    
                    // let oModel = new JSONModel(oTable);
                    // oThat.getView().setModel(oModel, "tblVerificacionFirmas");
                    oThat.createColumn(verificacionFirmasColumn, oTable);
                    
                    if(tblVerificacionFirmas){
                        oThat.createCellVerificacionFirmas(tblVerificacionFirmas, oTable);
                    }else{
                        const aCells = [];
                        const oRow = new sap.m.ColumnListItem({
                                    cells: aCells 
                            });

                        oTable.addItem(oRow);
                    }
                    break;
                default:
                    break;
            }

            
            this.modelEstructura.setProperty("/listControls", aListControls);

            // const oUIControl = new sap.m.WizardStep(sId + (new Date()).getTime(), {
            //     content : oTable,
            //     title: oContext.getProperty("title"), nextStep: [oThat.onStepActivate]
            // });
            return oTable;
        },
        createColumn: function (array, oTable) {

            array.forEach(element => {
                if(element.Cod == "chk"){
                    const oColumn = new sap.m.Column({
                        width: "1em",
                        hAlign: "Center",
                        header: new sap.m.Label({
                            text: element.text
                        })
                    });
                    oTable.addColumn(oColumn);
                }else{
                    const oColumn = new sap.m.Column({
                        width: "1em",
                        header: new sap.m.Label({
                            text: element.text
                        })
                    });
                    oTable.addColumn(oColumn);
                }
            
            });
            
        },
        createCellCuadros: async function (array, oTable) {
            let arrValidate = ["VerificacionCheck"];
            var regitroLector = oThat.modelGeneral.getProperty("/oInfoUsuario/funcionUsuario/registroLector");
            // let oInfoUsuario = oThat.modelGeneral.getProperty("/oInfoUsuario");
            var butonEnabledGeneral = false;
            if(regitroLector){
                butonEnabledGeneral = false; 
            }else{
                butonEnabledGeneral = true;
            }
            var aListTiposDatos = oThat.modelGeneral.getProperty("/tiposDatos");

            var usuarioActualizaFooter = "";
            var oUsuarioActualizaFooter = [];
            var oFechaFooter = [];
            for await (const element of array) {
                const aCells = [];
                let cell4Save;
                var cell1 = new sap.m.Text({text: element.description});

                var aFindTipoDato = aListTiposDatos.find(item => item.tipo === element.tipodato);

                var cell2 = null;
                if (aFindTipoDato){
                    var oCellDinamic = await oThat.createCellDinamic(aFindTipoDato.control, element.oPaso);

                    aListControls.push({rmdEstructuraPasoId: oCellDinamic.rmdEstructuraPasoId, sControl: oCellDinamic.sControl, sValue: oCellDinamic.sValue});
                    
                    if(element.fechaActualiza){
                        oFechaFooter.push(element.fechaActualiza.getTime());
                    }
                    var usuarioActualiza = "";

                    if(element.usuarioActualiza){
                        usuarioActualiza = element.usuarioActualiza;
                        oUsuarioActualizaFooter.push(element.usuarioActualiza);
                    }

                    cell2 = oCellDinamic.oControl;
                }else{
                    cell2 = new sap.m.Label({
                        text: ""
                    })
                }
                
                var cell3 = oThat.createMenu(element.oPaso,element.formato,element.imagen);

                var booleanSaveLineaActualPaso = element.oPaso.aplica;
                //mcode
                let componetChildren = null;
                if(!arrValidate.includes(aFindTipoDato.control)){
                    
                    componetChildren = new sap.m.Button({
                        enabled: booleanSaveLineaActualPaso,
                        icon: "sap-icon://save", 
                        press: [oThat.onSaveLineaActualPaso]
                    });
                }else{
                    componetChildren=new sap.m.Title({
                        text:""
                    }); 
                }
                
                usuarioActualiza = element.usuarioActualiza
                var nameClass, nameClassModificado, Modificado;
                nameClass = element.styleUser ? element.styleUser : "TextStyleNone"; 
                Modificado = "Modificado";
                nameClassModificado = "TextStyleModificar";

                const oLabelUsuarioActual = new sap.m.Title({
                    text: usuarioActualiza
                })
                oLabelUsuarioActual.addStyleClass(nameClass);

                const oLabelModificado = new sap.m.Title({
                    text: Modificado
                })
                oLabelModificado.addStyleClass(nameClassModificado);
                
                // var cell4Save = sap.ui.getCore().byId("cellSave_" + element.oPaso.rmdEstructuraId_rmdEstructuraId + "_" + element.oPaso.rmdEstructuraPasoId)
                // if(arrValidate.includes(aFindTipoDato.control)){
                //     cell4Save = sap.ui.getCore().byId("c_"+ element.oPaso.rmdEstructuraId_rmdEstructuraId + "_" + element.oPaso.rmdEstructuraPasoId);
                // }else{
                    //CREACION DE BTN SAVE
                    cell4Save = sap.ui.getCore().byId("cellSave_" + element.oPaso.rmdEstructuraId_rmdEstructuraId + "_" + element.oPaso.rmdEstructuraPasoId);
                // }




                if (!cell4Save){
                    // id: "cellVBox_" + element.oPaso.rmdEstructuraId_rmdEstructuraId + "_" + element.oPaso.rmdEstructuraPasoId,
                    cell4Save =  new sap.m.VBox({
                        id:"cellSave_" + element.oPaso.rmdEstructuraId_rmdEstructuraId + "_" + element.oPaso.rmdEstructuraPasoId,
                        items: [componetChildren],
                        justifyContent: sap.m.FlexJustifyContent.Center,
                        alignItems: sap.m.FlexAlignItems.Center
                    })
                }

                if(arrValidate.includes(aFindTipoDato.control)){
                    if(cell4Save){
                        cell4Save.removeItem(1);
                        cell4Save.removeItem(2);
                    }

                    //validamos que sea de tipo checkobox
                    let __cell  = oCellDinamic.oControl;
                    if(oCellDinamic.oControl){
                        if (element.oPaso.usuarioActualiza){
                            __cell.removeItem(1);
                            __cell.addItem(oLabelUsuarioActual);
                        }
                        if (element.oPaso.flagEditado){
                            __cell.removeItem(2);
                            __cell.addItem(oLabelModificado);
                            
                        }
                    }
                }else{

                    
                    if (element.oPaso.usuarioActualiza){
                        cell4Save.removeItem(1);
                        cell4Save.addItem(oLabelUsuarioActual);
                    }
                    if (element.oPaso.flagEditado){
                        cell4Save.removeItem(2);
                        cell4Save.addItem(oLabelModificado);
                    }
                    
                }
                //mcode
                // if(!arrValidate.includes(aFindTipoDato.control)){

                   
                    // ;
                    
                    // if (element.oPaso.flagEditado && !element.oPaso.verifCheck){
                    // }
                // }else{

                // }
                if(regitroLector){
                    // btnSave.setEnabled(butonEnabledGeneral);
                }

                aCells.push(cell1);
                aCells.push(cell2);
                aCells.push(cell4Save);
                aCells.push(cell3);

                const oRow = new sap.m.ColumnListItem({
                    cells: aCells 
                });
                 
                oRow.oParam = {
                    sControl: aFindTipoDato ? aFindTipoDato.control : "",
                    sPasoId: element.pasoId,
                    rmdEstructuraId_rmdEstructuraId: element.rmdEstructuraId_rmdEstructuraId,
                    bAplica: true,
                    valorFinal:element.valorFinal,
                    valorInicial:element.valorInicial,
                    margen:element.margen,
                    decimales:element.decimales,
                    rmdId_rmdId:element.rmdId_rmdId,
                    usuarioActualiza:element.usuarioActualiza,
                    fechaActualiza:element.fechaActualiza
                };
                oTable.addItem(oRow);
            }

            const aCellsFooter = [];

            const oLabelVerificado = new sap.m.Label({
                design: "Bold",
                text: "Verificado por : "
            });
            
            if(oUsuarioActualizaFooter.length > 0){
                oUsuarioActualizaFooter = oUsuarioActualizaFooter.filter((value, index, self) => self.indexOf(value) === index);
                usuarioActualizaFooter = oUsuarioActualizaFooter.join();
            }

            const oLabelUsuarioActualFooter = new sap.m.Label({
                text: usuarioActualizaFooter
            })

            var cell1Footer =  new sap.m.HBox({
                items: [oLabelVerificado, oLabelUsuarioActualFooter]
            })

            var cell2Footer =  new sap.m.Label({
                text: ""
            })

            const oLabelFecha = new sap.m.Label({
                design: "Bold",
                text: "Fecha : "
            })

            var FechaFooter = "";
            if(oFechaFooter.length > 0){
                var dateFormat = sap.ui.core.format.DateFormat.getDateInstance({pattern : "dd-MM-YYYY HH:MM" });
                FechaFooter = formatter.formatDateFooter(new Date(Math.min(...oFechaFooter)));
            }

            const oLabelFechaFooter = new sap.m.Label({
                text: FechaFooter
            })

            var cell3Footer =  new sap.m.HBox({
                items: [oLabelFecha, oLabelFechaFooter]
            });

            aCellsFooter.push(cell1Footer);
            aCellsFooter.push(cell2Footer);
            aCellsFooter.push(cell3Footer);

            const oRowFooter = new sap.m.ColumnListItem({
                cells: aCellsFooter
            });
            
            oTable.addItem(oRowFooter);
        },
        createCellEquipos: function (array, oTable) {
            var aListTiposDatos = oThat.modelGeneral.getProperty("/tiposDatos");
            // comentario temporal
            // var butonEnable = oThat.modelGeneral.getProperty("/oInfoUsuario/funcionUsuario/registroCC");
            var butonEnable = oThat.modelGeneral.getProperty("/oInfoUsuario/funcionUsuario/registroP");
            var regitroLector = oThat.modelGeneral.getProperty("/oInfoUsuario/funcionUsuario/registroLector");
            var butonEnabledGeneral = false;
            if(regitroLector){
                butonEnabledGeneral = false;
                butonEnable=false;
            }else{
                butonEnabledGeneral = true;
            }
            array.forEach(element => {
                const aCells = [];

                var oTollbar = [];

                var ToolbarSpacer = new sap.m.ToolbarSpacer({});

                var ToolbarSeparator = new sap.m.ToolbarSeparator({})
                
                var bAplicaGeneral = new sap.m.Button({
                    enabled: butonEnabledGeneral,
                    text: "Aplica General", 
                    icon: "sap-icon://accept", 
                    press: [oThat.onAppliesGeneral]
                });

                var ToolbarSeparator2 = new sap.m.ToolbarSeparator({})

                var bAgregar = new sap.m.Button({
                    enabled: butonEnable,
                    text: "Agregar", 
                    icon: "sap-icon://add", 
                    press: [oThat.onAddEquipo]
                });

                oTollbar.push(ToolbarSpacer);
                oTollbar.push(ToolbarSeparator);
                oTollbar.push(bAplicaGeneral);
                oTollbar.push(ToolbarSeparator2);
                oTollbar.push(bAgregar);

                var oToolBar = new sap.m.Toolbar({
                    content:oTollbar
                });

                var cell1 = new sap.m.Text({
                    text: element.description
                });

                var cell2 = new sap.m.Text({
                    text: element.descriptionTipo
                });

                var cell3 = new sap.m.ObjectStatus({
                    text: element.dateCalibracion,
                    state: element.stateCalibracion,
                });

                var cell4 = new sap.m.Text({
                    text: element.code
                });
                
                var cell5 = new sap.m.VBox({
                    alignItems: "Center"
                });

                let bVerificationCheck = false;

                if(element.aplica){
                    bVerificationCheck = element.vistoBueno;
                }else{
                    bVerificationCheck = element.aplica;
                }

                if(regitroLector){
                    var chekcBoxAprovador = new sap.m.CheckBox({
                        enabled: butonEnabledGeneral,
                        text: "",
                        selected: bVerificationCheck,
                        select: [oThat.onSaveCheckAprov]
                    });
                }else{
                    var chekcBoxAprovador = new sap.m.CheckBox({
                        enabled: element.aplica,
                        text: "",
                        selected: bVerificationCheck,
                        select: [oThat.onSaveCheckAprov]
                    });
                }
                
                var usuarioActualiza = "";
                var nameClass = "TextStyleNone";

                if(element.historico.length>0){
                    if(bVerificationCheck){
                        usuarioActualiza = element.usuarioActualiza
                
                        // if(element.ultimaAccion.rol == "rmd_registrador"){
                        //     nameClass = "TextStyleNone";
                        // }else if(element.ultimaAccion.rol == "rmd_jefe_prod"){
                        //     nameClass = "TextStyleJefe";
                        // }else if(element.ultimaAccion.rol == "rmd_gerente_prod"){
                        //     nameClass = "TextStyleNone";
                        // }else if(element.ultimaAccion.rol == "rmd_jefe_dt"){
                        //     nameClass = "TextStyleNone";
                        // }else if(element.ultimaAccion.rol == "RMD_AUXILIAR"){
                        //     nameClass = "TextStyleAuxiliar";
                        // }else if(element.ultimaAccion.rol == "CP_SUPERVISOR_PROD"){
                        //     nameClass = "TextStyleSupervisor";
                        // }else if(element.ultimaAccion.rol == "RMD_CONTROL_CALIDAD"){
                        //     nameClass = "TextStyleControlCalidad";
                        // }else if(element.ultimaAccion.rol == "RMD_CONTROL_PROCESO"){
                        //     nameClass = "TextStyleControlProcesos";
                        // }
                        //mcode
                        nameClass = formatter.selectedColor(element.ultimaAccion.rol);
                    }else{
                        usuarioActualiza = "Modificado";
                        nameClass = "TextStyleModificar";
                    }
                }else{
                    if(bVerificationCheck){
                        usuarioActualiza = element.usuarioActualiza
                    }
                }

                // if(bVerificationCheck){
                //     usuarioActualiza = element.usuarioActualiza
                // }
                var textAprovador = new sap.m.Title({
                    level:"H2",
                    text: usuarioActualiza
                });
                textAprovador.addStyleClass(nameClass);

                cell5.addItem(chekcBoxAprovador);
                cell5.addItem(textAprovador);

                var cell6 = oThat.createMenuEquipo(element.code, element.aplica);

                aCells.push(cell1);
                aCells.push(cell2);
                aCells.push(cell3);
                aCells.push(cell4);
                aCells.push(cell5);
                aCells.push(cell6);

                const oRow = new sap.m.ColumnListItem({
                    cells: aCells ,
                });

                oRow.oParam = {
                    // sControl: aFindTipoDato.control,
                    sCode: element.Id,
                    sPasoId: element.Id,
                    sTipo: element.tipo,
                    bVisto: element.vistoBueno,
                    sUsuario: element.usuarioActualiza,
                    sDescripcion: element.description,
                    rmdEstructuraId_rmdEstructuraId: element.rmdEstructuraId_rmdEstructuraId,
                    bAplica: true
                };
                oTable.setHeaderToolbar(oToolBar);
                oTable.addItem(oRow);
            });
        },
        createCellEspecificacion: function(array, oTable){
            var regitroLector = oThat.modelGeneral.getProperty("/oInfoUsuario/funcionUsuario/registroLector");
            var butonEnabledGeneral = false;
            if(regitroLector){
                butonEnabledGeneral = false;
            }else{
                butonEnabledGeneral = true;
            }
            var aListTiposDatos = oThat.modelGeneral.getProperty("/tiposDatos");
            var usuarioActualizaFooter = "";
            var oUsuarioActualizaFooter = [];
            var oFechaFooter = [];
            var oRmdEstructuraId = [];
            array.forEach(element => {
                const aCells = [];
                oRmdEstructuraId.push(element.rmdEstructuraId_rmdEstructuraId);

                if(element.fechaActualiza){
                    oFechaFooter.push(element.fechaActualiza.getTime());
                }

                var aFindTipoDato = aListTiposDatos.find(item => item.tipo === element.tipodato);

                var cell1 = new sap.m.VBox({});

                var cell2 = new sap.m.Text({
                    text: element.especificacion
                });

                var cell3 = new sap.m.TextArea({
                    enabled:butonEnabledGeneral,
                    value: element.resultados
                });

                var enableSaveButton = true;

                if(element.usuarioActualiza){
                    enableSaveButton = false;
                }

                 var btnSave = new sap.m.Button({
                    icon: "sap-icon://save",
                    enabled: enableSaveButton, 
                    press: [oThat.onSaveLineaActualEspecificacion]
                });

                var usuarioActualiza = "";

                if(element.usuarioActualiza){
                    usuarioActualiza = element.usuarioActualiza;
                    oUsuarioActualizaFooter.push(element.usuarioActualiza);
                }

                const oLabelUsuarioActual = new sap.m.Text({
                    text: usuarioActualiza
                })



                var cell4Save =  new sap.m.VBox({
                        hAlign: "Center",
                        justifyContent: "Center",
                        alignItems: "Center",
                        items: [btnSave, oLabelUsuarioActual]
                    });

                var textPadre = new sap.m.Label({
                    text: element.descripcion,
                    design: "Bold"
                });

                var textHijo = new sap.m.Text({
                    text: element.ensayoHijo
                });

                if(regitroLector){
                    btnSave.setEnabled(butonEnabledGeneral);
                }

                cell1.addItem(textPadre);
                cell1.addItem(textHijo);

                aCells.push(cell1);
                aCells.push(cell2);
                aCells.push(cell3);
                aCells.push(cell4Save);

                const oRow = new sap.m.ColumnListItem({
                    cells: aCells 
                });

                oRow.oParam = {
                    sControl: aFindTipoDato.control,
                    rmdEstructuraId_rmdEstructuraId: element.rmdEstructuraId_rmdEstructuraId,
                    sEspecificacionId: element.Id,
                    bAplica: true
                };

                oTable.addItem(oRow);
               
            });

            const aCellsFooter = [];

            const oLabelVerificado = new sap.m.Label({
                design: "Bold",
                text: "Verificado por : "
            });

            if(oUsuarioActualizaFooter.length > 0){
                usuarioActualizaFooter = oUsuarioActualizaFooter.join();
            }

            const oLabelUsuarioActualFooter = new sap.m.Text({
                text: usuarioActualizaFooter
            })

            var cell1Footer =  new sap.m.HBox({
                wrap: "Wrap",
                items: [oLabelVerificado, oLabelUsuarioActualFooter]
            })

            var cell2Footer =  new sap.m.Label({
                text: ""
            })

            const oLabelFecha = new sap.m.Label({
                design: "Bold",
                text: "Fecha : "
            })

            var FechaFooter = "";
            if(oFechaFooter.length > 0){
                var dateFormat = sap.ui.core.format.DateFormat.getDateInstance({pattern : "dd-MM-YYYY HH:MM" });
                FechaFooter = formatter.formatDateFooter(new Date(Math.min(...oFechaFooter)));
            }

            const oLabelFechaFooter = new sap.m.Label({
                text: FechaFooter
            })

            var cell3Footer =  new sap.m.HBox({
                items: [oLabelFecha, oLabelFechaFooter]
            });

            var cell4Footer =  oThat.createMenuHistorialFooter();

            aCellsFooter.push(cell1Footer);
            aCellsFooter.push(cell2Footer);
            aCellsFooter.push(cell3Footer);
            aCellsFooter.push(cell4Footer);

            const oRowFooter = new sap.m.ColumnListItem({
                cells: aCellsFooter
            });

            oRowFooter.oParam = {
                oModel: "/RMD_ES_ESPECIFICACION_HISTORIAL",
                rmdEstructuraId_rmdEstructuraId: oRmdEstructuraId,
                bAplica: true
            };

             oTable.addItem(oRowFooter);
        },
        
        createCellCondicionAmbiental: function(array, oTable){
            var regitroLector = oThat.modelGeneral.getProperty("/oInfoUsuario/funcionUsuario/registroLector");
            var butonEnabledGeneral = false;
            if(regitroLector){
                butonEnabledGeneral = false;
            }else{
                butonEnabledGeneral = true;
            }
            var aListTiposDatos = oThat.modelGeneral.getProperty("/tiposDatos");

            var usuarioActualizaFooter = "";
            var oUsuarioActualizaFooter = [];
            var oFechaFooter = [];
            array.forEach(element => {
                const aCells = [];
                var cell1 = new sap.m.Text({
                                            text: element.description
                                            });

                var aFindTipoDato = aListTiposDatos.find(item => item.tipo === element.tipodato);
                
                var cell2 = null;
                if (aFindTipoDato){
                    if(element.fechaActualiza){
                        oFechaFooter.push(element.fechaActualiza.getTime());
                    }
                    var usuarioActualiza = "";
    
                    if(element.usuarioActualiza){
                        usuarioActualiza = element.usuarioActualiza;
                        oUsuarioActualizaFooter.push(element.usuarioActualiza);
                    }
                    
                    var oCellDinamic = oThat.createCellDinamic(aFindTipoDato.control, element.oPaso);
    
                    aListControls.push({rmdEstructuraPasoId: oCellDinamic.rmdEstructuraPasoId, sControl: oCellDinamic.sControl, sValue: oCellDinamic.sValue});
                    
                    cell2 = oCellDinamic.oControl;
                }else{
                    cell2 = new sap.m.Label({
                        text: ""
                    })
                }
                
                var cell3 = oThat.createMenu(element.oPaso, element.formato, element.imagen);
                
                if (element.oPaso.depende){
                    cell3.setEnabled(false);
                }
                //Comentado temporal
                var btnSave = new sap.m.Button({
                                icon: "sap-icon://save", 
                                press: [oThat.onSaveLineaActualPaso],
                            });
                
                
                var oLabelUsuarioActual = new sap.m.Text({
                    text: element.oPaso.usuarioActualiza
                })
                var oLabelModificado = new sap.m.Text({
                    text: element.oPaso.usuarioActualiza ? "(Modificado)" : ""
                })
                
                if (element.oPaso.depende){
                    btnSave.setEnabled(false);
                }

                var cell4Save = sap.ui.getCore().byId("cellSave_" + element.oPaso.rmdEstructuraId_rmdEstructuraId + "_" + element.oPaso.rmdEstructuraPasoId)
                if (!cell4Save){
                    cell4Save =  new sap.m.VBox({
                        id: "cellSave_" + element.oPaso.rmdEstructuraId_rmdEstructuraId + "_" + element.oPaso.rmdEstructuraPasoId,
                        items: [btnSave],
                        justifyContent: sap.m.FlexJustifyContent.Center,
                        alignItems: sap.m.FlexAlignItems.Center
                    })
                }

                if (element.oPaso.usuarioActualiza){
                    cell4Save.removeItem(1);
                    cell4Save.addItem(oLabelUsuarioActual);
                    //cell4Save.removeItem(2);
                    //cell4Save.addItem(oLabelModificado);
                } 

                var oFilterDet = [];
                oFilterDet.push(new Filter("rmdEstructuraPasoId_rmdEstructuraPasoId", FilterOperator.EQ, element.oPaso.rmdEstructuraPasoId));
                let aListPasoUsuarioRP = registroService.getDataExpand(oThat.mainModelv2, "/RMD_ES_PASO_USUARIO", "rmdUsuarioId", oFilterDet);
                
                const oButton = new sap.m.ToggleButton({
                    enabled:butonEnabledGeneral,
                    icon: "sap-icon://accidental-leave",
                    tooltip: oThat.i18n.getText("lblDoFor"),
                    press: [oThat.abrirSeleccionUsuarios]
                });
                oButton.setEnabled(element.oPaso.aplica);
                
                if (element.oPaso.depende){
                    oButton.setEnabled(false);
                }

                var oRealizadoPor = sap.ui.getCore().byId("cellRealizadoPor_" + element.oPaso.rmdEstructuraId_rmdEstructuraId + "_" + element.oPaso.rmdEstructuraPasoId); 
                if (!oRealizadoPor){
                    oRealizadoPor = new sap.m.VBox({
                        items: [oButton],
                        id: "cellRealizadoPor_" + element.oPaso.rmdEstructuraId_rmdEstructuraId + "_" + element.oPaso.rmdEstructuraPasoId,
                        justifyContent: sap.m.FlexJustifyContent.Center,
                        alignItems: sap.m.FlexAlignItems.Center
                    })
                }
                
                const oLabel = new sap.m.Text({
                    text: ""
                })

                var aPasoUsuarioCodigoRP = []
                aListPasoUsuarioRP.then(r => {
                    r.results.forEach(function(d, i){
                        aPasoUsuarioCodigoRP.push(d.rmdUsuarioId.codigo);
                        oLabel.setText(aPasoUsuarioCodigoRP.join("\n"));
                    })
                    if (aPasoUsuarioCodigoRP.length > 0) oButton.setPressed(true);
                    if (aPasoUsuarioCodigoRP.length > 0) {
                        oRealizadoPor.removeItem(1);
                        oRealizadoPor.addItem(oLabel);
                    } 
                });

                if(regitroLector){
                    btnSave.setEnabled(butonEnabledGeneral);
                    cell3.setEnabled(butonEnabledGeneral);
                    oButton.setEnabled(butonEnabledGeneral);
                }

                aCells.push(cell1);
                aCells.push(cell2);
                aCells.push(oRealizadoPor);
                aCells.push(cell4Save);
                aCells.push(cell3);


                const oRow = new sap.m.ColumnListItem({
                    cells: aCells 
                });

                oRow.oParam = {
                    sControl: aFindTipoDato ? aFindTipoDato.control : "",
                    sPasoId: element.pasoId,
                    margen: element.margen,
                    decimales: element.decimales,
                    depende: element.depende,
                    estadoCC: element.estadoCC,
                    rmdEstructuraId_rmdEstructuraId: element.rmdEstructuraId_rmdEstructuraId,
                    bAplica: true
                };

                oTable.addItem(oRow);
            });
            
            const aCellsFooter = [];

            const oLabelVerificado = new sap.m.Label({
                design: "Bold",
                text: "Verificado por : "
            });

            if(oUsuarioActualizaFooter.length > 0){
                oUsuarioActualizaFooter = oUsuarioActualizaFooter.filter((value, index, self) => self.indexOf(value) === index);
                usuarioActualizaFooter = oUsuarioActualizaFooter.join();
            }
            
            const oLabelUsuarioActualFooter = new sap.m.Label({
                text: usuarioActualizaFooter
            })

            var cell1Footer =  new sap.m.HBox({
                items: [oLabelVerificado, oLabelUsuarioActualFooter]
            })

            var cell2Footer =  new sap.m.Label({
                text: ""
            })

            const oLabelFecha = new sap.m.Label({
                design: "Bold",
                text: "Fecha : "
            })

            var FechaFooter = "";
            if(oFechaFooter.length > 0){
                var dateFormat = sap.ui.core.format.DateFormat.getDateInstance({pattern : "dd-MM-YYYY HH:MM" });
                FechaFooter = formatter.formatDateFooter(new Date(Math.min(...oFechaFooter)));
            }

            const oLabelFechaFooter = new sap.m.Label({
                text: FechaFooter
            })

            var cell3Footer =  new sap.m.HBox({
                items: [oLabelFecha, oLabelFechaFooter]
            });

            aCellsFooter.push(cell1Footer);
            aCellsFooter.push(cell2Footer);
            aCellsFooter.push(cell3Footer);

            const oRowFooter = new sap.m.ColumnListItem({
                cells: aCellsFooter
            });
            oTable.addItem(oRowFooter);
        },
        createCellVerificacionFirmas: function(array, oTable){
            var regitroLector = oThat.modelGeneral.getProperty("/oInfoUsuario/funcionUsuario/registroLector");
            var butonEnabledGeneral = false;
            if(regitroLector){
                butonEnabledGeneral = false;
            }else{
                butonEnabledGeneral = true;
            }
            var aListTiposDatos = oThat.modelGeneral.getProperty("/tiposDatos");
            var usuarioActualizaFooter = "";
            var oUsuarioActualizaFooter = [];
            var oFechaFooter = [];
            var oTollbar = [];

                var ToolbarSpacer = new sap.m.ToolbarSpacer({});

                var bAgregar = new sap.m.Button({
                    enabled: butonEnabledGeneral,
                    text: "Agregar", 
                    icon: "sap-icon://add", 
                    press: [oThat.abrirSeleccionUsuariosFirma]
                });

                oTollbar.push(ToolbarSpacer);
                oTollbar.push(bAgregar);

                var oToolBar = new sap.m.Toolbar({
                    content:oTollbar
                });
                array.forEach(element => {
                    const aCells = [];
                    
                    var cell1 = new sap.m.CheckBox({
                        text: "",
                        enabled: false,
                        selected: element.realizadoPor
                    })

                    var cell2 = new sap.m.CheckBox({
                        text: "",
                        enabled: false,
                        selected: element.supervisadoPor
                    })

                    var cell3 = new sap.m.Label({
                        text: element.nombres
                    });

                    var cell4 = new sap.m.Label({
                        text: element.firma
                    });
                    
                    aCells.push(cell1);
                    aCells.push(cell2);
                    aCells.push(cell3);
                    aCells.push(cell4);

                    const oRow = new sap.m.ColumnListItem({
                        cells: aCells 
                    });


                    oTable.addItem(oRow);
                
                });
                oTable.setHeaderToolbar(oToolBar);
        },
        onNoAplica: async function(oEvent){
            var oInfoUsuario = oThat.modelGeneral.getProperty("/oInfoUsuario");
            const oRows = oEvent.getSource().getParent().getParent().getParent().getParent().mAggregations.items;
            let aUsuarios = [];
            let aFechas = [];
            var oFooter = oRows[oRows.length-1];
            const oLabelUserVer = oFooter.getCells()[0].getItems()[1];
            const oLabelFecha = oFooter.getCells()[2].getItems()[1];

            const oParam = oEvent.getSource().getParent().getParent().getParent().oParam;
            var sOptionText = oEvent.getSource().getText("text");
            var sOptionTextNoApplyStep = oThat.i18n.getText("mnNoApplyStep");
            var sOptionTextApplyStep = oThat.i18n.getText("mnApplyStep");
            var bNoAplica = sOptionText == sOptionTextNoApplyStep;
            let oContext = oEvent.getSource();
            const oCells = oEvent.getSource().getParent().getParent().getParent().mAggregations.cells;
            var oDialogNoAplica = new sap.m.Dialog({
                title: bNoAplica ? "Motivo No Aplica Paso" : "Motivo Aplica Paso",
                type: "Message",
                content: [
                    new sap.m.Label({
                        text: "Ingrese el motivo de modificaci??n",
                        labelFor: "submitDialogTextarea"
                    }),
                    new sap.m.TextArea("submitDialogTextareaNoAplica", {
                        liveChange: function (oEvent) {
                            var parent = oEvent.getSource().getParent();
                            parent.getBeginButton().setEnabled(true);
                        },
                        width: "100%",
                        required: true
                    })
                ],
                beginButton: new sap.m.Button({
                    type: sap.m.ButtonType.Emphasized,
                    text: "Confirmar",
                    enabled: false,
                    press: async function () {
                        var sText = sap.ui.getCore().byId("submitDialogTextareaNoAplica").getValue();
                        MessageBox.confirm("??Desea guardar la acci??n realizada?", {
                            onClose : async function(sButton) {
                                if (sButton === MessageBox.Action.OK) {
                                    oRows.forEach(function(oRow){
                                        if (oRow.oParam) {
                                            if (oRow.oParam.usuarioActualiza){
                                                aUsuarios.push(oRow.oParam.usuarioActualiza);
                                            }
                                            if (oRow.oParam.fechaActualiza) {
                                                aFechas.push(oRow.oParam.fechaActualiza.getTime());
                                            }  
                                        }     
                                    });
                                    aUsuarios.push(oInfoUsuario.data.usuario);
                                    aFechas.push(new Date().getTime());
                                    if (aUsuarios.length > 0) {
                                        var oUsuarioActualizaFooter = aUsuarios.filter((value, index, self) => self.indexOf(value) === index);
                                        var usuarioActualizaFooter = oUsuarioActualizaFooter.join();
                                    }
                                    if (aFechas.length > 0) {
                                        var dateFormat = sap.ui.core.format.DateFormat.getDateInstance({pattern : "dd-MM-YYYY HH:MM" });
                                        var FechaFooter = formatter.formatDateFooter(new Date(Math.min(...aFechas)));
                                    }
                                    oLabelUserVer.setText(usuarioActualizaFooter);
                                    oLabelFecha.setText(FechaFooter);

                                    oContext.setText(bNoAplica ? sOptionTextApplyStep : sOptionTextNoApplyStep);
                                    oCells.forEach(function(ctrl, iCells){
                                        if (iCells !== oCells.length-1){
                                            if (ctrl.mProperties.value){
                                                ctrl.setEnabled(!bNoAplica);      
                                            } else if (ctrl.mAggregations.items) {
                                                if(ctrl.mAggregations.items.length >= 1) {
                                                    ctrl.mAggregations.items[0].setEnabled(!bNoAplica);
                                                } 
                                            }
                                        }
                                    })
                                    oParam.bAplica = !bNoAplica;
                                    await oThat.saveLineaPasoNoAplica(oParam, sText);
                                    sap.ui.getCore().byId("submitDialogTextareaNoAplica").setValue("");
                                    oDialogNoAplica.close();
                                }
                            }
                        });
                    }
                }),
                endButton: new sap.m.Button({
                    type: sap.m.ButtonType.Reject,
                    text: "Cancelar",
                    enabled: true,
                    press: function () {
                        sap.ui.getCore().byId("submitDialogTextareaNoAplica").setValue("");
                        oDialogNoAplica.close();
                    }
                }),
                afterClose: function () {
                    oDialogNoAplica.destroy();
                }
            });
    
            oDialogNoAplica.open();
        },

        saveLineaPasoNoAplica: async function (oParam, sMotivoModif)  {
            var oInfoUsuario = oThat.modelGeneral.getProperty("/oInfoUsuario");
            var nameClass;
           
            nameClass = formatter.selectedColor(oInfoUsuario.rol[codigoUserPrueba].codigo);
            const oLabelUsuarioActual = new sap.m.Title({
                text: oInfoUsuario.data.usuario
            })
            oLabelUsuarioActual.addStyleClass(nameClass);
            var cellSave = sap.ui.getCore().byId("cellSave_" + oParam.rmdEstructuraId_rmdEstructuraId + "_" + oParam.sPasoId);
            let bModificacion = cellSave.mAggregations.items.length !== 1 ? true : false;
            let oEsPaso = {
                usuarioActualiza : oInfoUsuario.data.usuario,
                fechaActualiza : new Date(),
                aplica : oParam.bAplica,
                rmdEstructuraPasoId : oParam.sPasoId,
                styleUser : nameClass,
                flagEditado : bModificacion
            };
            await registroService.updateEsPasosRmd(oThat.mainModelv2, "/RMD_ES_PASO", oEsPaso);
            if(cellSave.mAggregations.items.length === 3) {
                cellSave.removeItem(2);
            }
            if (cellSave.mAggregations.items.length > 1) {
                cellSave.removeItem(1);
            }
            cellSave.addItem(oLabelUsuarioActual);
            if (bModificacion) {
                var Modificado = "Modificado";
                var nameClassModificado = "TextStyleModificar";
                const oLabelModificado = new sap.m.Title({
                    text: Modificado
                })
                oLabelModificado.addStyleClass(nameClassModificado);                   
                cellSave.addItem(oLabelModificado);
            }
            this.saveLineaActualPasoHistorial(oEsPaso, String(oEsPaso.aplica), "No Aplica", sMotivoModif);
        },

        saveLineaActualPaso: async function(oParam, oControls, sMotivoModif, bModificacion){
            var oInfoUsuario = oThat.modelGeneral.getProperty("/oInfoUsuario");
            var oDesPaso = oControls[0];
            var oControl = oControls[1];
            const sPasoId = oParam.sPasoId;
            const sControl = oParam.sControl;
            const sUsuario = oInfoUsuario.data.usuario;
            BusyIndicator.show(0);
            let oEsPaso = {};
            
            
            if (oInfoUsuario.funcionUsuario.registroCC || oInfoUsuario.funcionUsuario.registroCP){ 
                if (!oParam.estadoCC){
                    MessageBox.warning(
                        oThat.getView().getModel("i18n").getResourceBundle().getText("actionNotAllowed"))
                    BusyIndicator.hide();
                    return;
                }
            }

            oEsPaso.rmdEstructuraPasoId = sPasoId;
            oEsPaso.usuarioActualiza = oInfoUsuario.data.usuario;
            oEsPaso.margen = oParam.margen;
            oEsPaso.decimales = oParam.decimales;
            oEsPaso.valorInicial = oParam.valorInicial;
            oEsPaso.valorFinal = oParam.valorFinal;
            oEsPaso.rmdEstructuraId_rmdEstructuraId = oParam.rmdEstructuraId_rmdEstructuraId;
            oEsPaso.fechaActualiza = new Date();
            oEsPaso.flagEditado = bModificacion;
            if(oThat.modelGeneral.getProperty("/colorHex")){
                oEsPaso.colorHex = oThat.modelGeneral.getProperty("/colorHex");
            }
            if(oThat.modelGeneral.getProperty("/colorRgb")){
                oEsPaso.colorRgb = oThat.modelGeneral.getProperty("/colorRgb");
            }
            
            oEsPaso.aplica = oParam.bAplica;
            //obtener cell2
            var bUsuarioSeleccion = false;
            
            var oListControls = this.modelEstructura.getProperty("/listControls");
            var oControlValue = oListControls.find(d => d.rmdEstructuraPasoId == oEsPaso.rmdEstructuraPasoId);
            
            var sValue = "";
            switch (sControl) {
                case "Texto":
                    oEsPaso.texto = oControl.getValue();
                    sValue = oEsPaso.texto;
                    break;
                case "Cantidad":
                    oEsPaso.cantidad = oControl.getValue();
                    sValue = oEsPaso.cantidad;
                    var regexp;
                    if (oEsPaso.decimales === 0) {
                        regexp = /^\d+\.\d{0,0}$/;
                    } else if (oEsPaso.decimales === 1) {
                        regexp = /^\d+\.\d{0,1}$/;
                    } else if (oEsPaso.decimales === 2) {
                        regexp = /^\d+\.\d{0,2}$/;
                    } else if (oEsPaso.decimales === 3) {
                        regexp = /^\d+\.\d{0,3}$/;
                    } else if (oEsPaso.decimales === 4) {
                        regexp = /^\d+\.\d{0,4}$/;
                    } else if (oEsPaso.decimales === 5) {
                        regexp = /^\d+\.\d{0,5}$/;
                    }

                    if(!regexp.test(oEsPaso.cantidad)){
                        oControl.setValueState(sap.ui.core.ValueState.Error);
                        BusyIndicator.hide();
                        return;
                    }else{
                        oControl.setValueState(sap.ui.core.ValueState.none);
                    }
                    break;
                case "Numeros":
                    oEsPaso.cantidad = oControl.getValue();
                    sValue = oEsPaso.cantidad;
                    
                    var regexp;
                    if (oEsPaso.decimales === 0) {
                        regexp = /^\d+\.\d{0,0}$/;
                    } else if (oEsPaso.decimales === 1) {
                        regexp = /^\d+\.\d{0,1}$/;
                    } else if (oEsPaso.decimales === 2) {
                        regexp = /^\d+\.\d{0,2}$/;
                    } else if (oEsPaso.decimales === 3) {
                        regexp = /^\d+\.\d{0,3}$/;
                    } else if (oEsPaso.decimales === 4) {
                        regexp = /^\d+\.\d{0,4}$/;
                    } else if (oEsPaso.decimales === 5) {
                        regexp = /^\d+\.\d{0,5}$/;
                    }

                    if(!regexp.test(oEsPaso.cantidad)){
                        oControl.setValueState(sap.ui.core.ValueState.Error);
                        BusyIndicator.hide();
                        return;
                    }else{
                        oControl.setValueState(sap.ui.core.ValueState.none);
                    }
                    break;
                case "Fecha":
                    oEsPaso.fecha = new Date();
                    oControl.setText(oEsPaso.fecha.toLocaleDateString());
                    sValue = oEsPaso.fecha;
                    break;
                case "FechaHora":
                    oEsPaso.fechaHora = new Date();
                    oControl.setText(oEsPaso.fechaHora.toLocaleString());
                    sValue = oEsPaso.fechaHora;
                    break;
                case "Hora":
                    oEsPaso.hora = new Date().toLocaleTimeString();
                    oControl.setText(oEsPaso.hora);
                    sValue = oEsPaso.hora;
                    break;
                case "RealizadoPor":
                    bUsuarioSeleccion = true;
                    if (oParam.aUsuarios != null){
                        sValue = oParam.aUsuarios;
                    }else{
                        sValue = oControlValue.sValue;
                    }
                    sValue = sValue.map(d => d.nombre).sort();
                    //sValue = sValue.join(",");
                    oControlValue.sValue = oControlValue.sValue.sort().join(",")
                    oEsPaso.realizadoPor = sValue.length > 0;
                    break;
                case "VistoBueno":
                    oEsPaso.vistoBueno = oControl.getProperty("selected");
                    sValue = oEsPaso.vistoBueno;
                    oEsPaso.vistoBuenoId_rmdUsuarioId = oThat.modelGeneral.getProperty("/UsuarioLoginVB");
                    break;
                case "RealizadoPorVistoBueno":
                    //Guardar En tabla detalle de usuario
                    break;
                case "VerificacionCheck":
                    // oEsPaso.verifCheck = oControl.getProperty("selected");
                    oEsPaso.verifCheck = oControls[1].mAggregations.items[0].getSelected(); // actualizaci??n de check
                    sValue = oEsPaso.verifCheck;
                    // oEsPaso.verifCheckId_rmdUsuarioId = "c841c44f-e1bb-4280-ba6a-63a8f37d858d";
                    break;
                case "MultipleCheck":
                    bUsuarioSeleccion = true;
                    if (oParam.aUsuarios != null){
                        sValue = oParam.aUsuarios;
                    }else{
                        sValue = oControlValue.sValue;
                    }
                    
                    sValue = sValue.map(d => d.nombre).sort();
                    //sValue = sValue.join(",");
                    oControlValue.sValue = oControlValue.sValue.sort().join(",")
                    oEsPaso.multiCheck = sValue.length > 0;
                    break;
                case "Rango":
                    oEsPaso.rango = oControl.getValue();
                    sValue = oEsPaso.rango;
                    
                    var sRangoMargenMin = (parseInt(oEsPaso.valorInicial) - parseInt(oEsPaso.margen)).toString();
                    var sRangoMargenMax = (parseInt(oEsPaso.valorFinal) + parseInt(oEsPaso.margen)).toString();
                    if(!(parseInt(sValue) >= parseInt(sRangoMargenMin) && parseInt(sValue) <= parseInt(sRangoMargenMax))){
                        MessageBox.information("El valor ingresado esta fuera del rango [" + oEsPaso.valorInicial + " - " + oEsPaso.valorFinal + "], que cuenta con un margen de +/- " + parseFloat(oEsPaso.margen).toFixed(oEsPaso.decimales).toString());
                        BusyIndicator.hide();
                        return;
                    }
                    break;
                case "DatoFijo":
                    oEsPaso.datoFijo = oControl.getText();
                    sValue = oEsPaso.datoFijo;
                    break;
                case "Sin tipo de dato":
                    // oEsPaso.datoFijo = oControl.getText();
                    sValue = '';
                    break;
                default:
                    break;
            }
            var nameClass;
            let cellSave;

            nameClass = formatter.selectedColor(oInfoUsuario.rol[codigoUserPrueba].codigo);
            // let idTemp = sap.ui.getCore().byId("c_"+ oEsPaso.rmdEstructuraId_rmdEstructuraId + "_" + oEsPaso.rmdEstructuraPasoId) || sap.ui.getCore().byId("cellSave_" + oEsPaso.rmdEstructuraId_rmdEstructuraId + "_" + oEsPaso.rmdEstructuraPasoId);
            cellSave = sap.ui.getCore().byId("c_"+ oEsPaso.rmdEstructuraId_rmdEstructuraId + "_" + oEsPaso.rmdEstructuraPasoId);
            
            if(sControl !="VerificacionCheck"){
                cellSave = sap.ui.getCore().byId("cellSave_" + oEsPaso.rmdEstructuraId_rmdEstructuraId + "_" + oEsPaso.rmdEstructuraPasoId);
            };
            // cellSave = idTemp;
            if (!sMotivoModif) {
               
                //validamos que exista
                if(cellSave){

                    //mcode eliminamos para validar que este limpio el  campo
                    cellSave.removeItem(2);
                    cellSave.removeItem(1);
                    const oLabelUsuarioActual = new sap.m.Title({
                        text: oEsPaso.usuarioActualiza
                    })
                    oLabelUsuarioActual.addStyleClass(nameClass);
                    //mcode se comento para que no se pueda eliminar ning??n registro
                    // if (cellSave.mAggregations.items.length > 1)cellSave.removeItem(1);
                    cellSave.addItem(oLabelUsuarioActual);
                }
            } else {
      
                if(cellSave){
                    if(cellSave.mAggregations.items.length === 3 ) {
                        cellSave.removeItem(2);
                    }
                    if (cellSave.mAggregations.items.length > 1) {
                        cellSave.removeItem(1);
                    }
                    const oLabelUsuarioActual = new sap.m.Title({
                        text: oEsPaso.usuarioActualiza
                    })
                    oLabelUsuarioActual.addStyleClass(nameClass);
                  
                    cellSave.addItem(oLabelUsuarioActual);
                }
             
                
            }
            let Modificado = "Modificado";
            let nameClassModificado = "TextStyleModificar";
            // if(!cellSave.mAggregations.items[0].getSelected()){
                const oLabelModificado = new sap.m.Title({
                            text: Modificado
                        })
            // if (oEsPaso.flagEditado) {
            //    
                if(oEsPaso.flagEditado){
                    
                    oLabelModificado.addStyleClass(nameClassModificado);                 
                    cellSave.addItem(oLabelModificado)
                }
            // }
            oEsPaso.styleUser = nameClass;
                var sValueRealizadoPor = "";
            var sValueRealizadoPor = "";
            var oRealizadoPor = [];
            // var bCondicionesAmbientales = false;
            if (oParam.aUsuariosRealizadoPor){
                oEsPaso.realizadoPor = true;
                bUsuarioSeleccion = true;
                bCondicionesAmbientales = true;
                if (oParam.aUsuariosRealizadoPor){
                    oRealizadoPor = oParam.aUsuariosRealizadoPor;
                    sValueRealizadoPor = oRealizadoPor.map(d => d.nombre).sort();
                    sValueRealizadoPor = sValueRealizadoPor.join(",");
                }
            }
            
            await registroService.updateEsPasosRmd(oThat.mainModelv2, "/RMD_ES_PASO", oEsPaso);
            
            var sDesPaso = oDesPaso.getText();
                
            if (bUsuarioSeleccion){
                if (oParam.aUsuariosRealizadoPor){
                    oParam.aUsuarios = oParam.aUsuariosRealizadoPor
                    sDesPaso = oThat.getView().getModel("i18n").getResourceBundle().getText("lblDoFor");
                }
                console.log(oParam.aUsuarios);
                if (oParam.aUsuarios && oParam.aUsuarios.length > 0){
                    let aUsuarios = [];
                    oParam.aUsuarios.forEach(function(d, i){
                        if (d.seleccionado == false || d.seleccionado == true){
                            var oEsPasoUsuario = {};
                            oEsPasoUsuario.rmdPasoUsuarioId = util.onGetUUIDV4();
                            oEsPasoUsuario.terminal = null;
                            oEsPasoUsuario.fechaRegistro = new Date();
                            oEsPasoUsuario.activo = d.seleccionado;
                            oEsPasoUsuario.usuarioRegistro = d.nombre;
                            oEsPasoUsuario.rmdEstructuraPasoId_rmdEstructuraPasoId = oEsPaso.rmdEstructuraPasoId;
                            oEsPasoUsuario.rmdUsuarioId_rmdUsuarioId = d.rmdUsuarioId;
                            aUsuarios.push(oEsPasoUsuario);
                        }
                    });
                    sMotivoModif = sMotivoModif || "";
                    let oParamEsPasoUsuario = {rmdEstructuraPasoId: oEsPaso.rmdEstructuraPasoId, sDescriptionPaso: sDesPaso, aUsuarios: aUsuarios, sMotivoModif: sMotivoModif};
                    await registroService.createEsPasoUsuarioRmdFunction(oThat.mainModelv2, oParamEsPasoUsuario) 
                }
            }
            // if (oControlValue.sValue != sValue){
                this.saveLineaActualPasoHistorial(oEsPaso, String(sValue), sControl, sMotivoModif);
                if (!bUsuarioSeleccion){
                    oControlValue.sValue = String(sValue);
                }else{
                    oControlValue.sValue = oParam.aUsuarios;
                }
            // }
            
            //sap.ui.getCore().byId("lblUsuarioModifica_" + oEsPaso.rmdEstructuraId_rmdEstructuraId + "_" + oEsPaso.rmdEstructuraPasoId).setText(oEsPaso.usuarioActualiza);
            
            MessageBox.success(oThat.getView().getModel("i18n").getResourceBundle().getText("successUpdatePaso"));
            BusyIndicator.hide();
        },

        saveLineaActualPasoHistorial:async function(oEsPaso, sValor, sDesPaso, sMotivoModif){
            var oEsPasoHistorial = {};
            oEsPasoHistorial.rmdHistorialPasoId  = util.onGetUUIDV4();
            oEsPasoHistorial.rmdEstructuraPasoId_rmdEstructuraPasoId = oEsPaso.rmdEstructuraPasoId;
            oEsPasoHistorial.descripcion         = sDesPaso;
            oEsPasoHistorial.terminal            = '';
            oEsPasoHistorial.valor               = sValor;
            oEsPasoHistorial.usuarioRegistro     = oInfoUsuario.data.usuario;
            oEsPasoHistorial.fechaRegistro       = new Date();
            oEsPasoHistorial.activo              = true;
            oEsPasoHistorial.motivoModif         = sMotivoModif;
            
            await registroService.createData(oThat.mainModelv2, "/RMD_ES_PASO_HISTORIAL", oEsPasoHistorial).then(function () {
                
            }.bind(oThat), function (error) {
                console.log(error);
                MessageBox.error(oThat.getView().getModel("i18n").getResourceBundle().getText("errorCreateLapso"));
                BusyIndicator.hide();
            });

        },
        
        onSaveLineaActualPasoDepende: function (oParam, oRows) {
            oRows.forEach(function(d, i){
                if (d.oParam) {
                    if (d.oParam.depende == oParam.sPasoId){
                        var oCells = d.mAggregations.cells;
                        oCells.forEach(function(d, i){
                            var iCells = i;
                            var ctrl = oCells[iCells];
                            var iItems = ctrl.mAggregations.items ? ctrl.mAggregations.items.length : 1;
                            if (iCells > 0){
                                if (!ctrl.mAggregations.items){
                                    ctrl.setEnabled(true);
                                }else{
                                    ctrl.mAggregations.items[0].setEnabled(true);
                                }
                            }
                        })
                    }
                }
            })
        },
        onConfirmUpdateRmdCheckBoxValid: function(oEvent){
            try {
                // oThat.oEventValid = oEvent.mParameters.id;
                // const oEventdata = oEvent;
                oThat.modelGeneral.setProperty("/oEvent", oEvent.mParameters.id);
                oThat.modelGeneral.setProperty("/vCheckVB", oEvent.getSource().getSelected() ? false : true);
                let checkBox = oEvent.getSource().getSelected();
                this.modelGeneral.setProperty("/checkBoxState", checkBox);
                // var aListRmdItem = oEvent.getSource().getBindingContext("aListPasoAssignResponsive").getObject();
                let oModel = oEvent.getSource().getParent().getParent().getParent().mBindingInfos.items.model,
                    aListRmdItem = oEvent.getSource().getParent().getBindingContext(oModel).getObject();
                if (aListRmdItem.tipoDatoId_iMaestraId === sIdVistobueno || aListRmdItem.tipoDatoId_iMaestraId === sIdRealizadoporyVistobueno) {
                    if (oInfoUsuario.rol[0].codigo === "rmd_jefe_prod") {
                        oThat.modelGeneral.setProperty("/usuarioLoginVB", oInfoUsuario.data.usuario);
                        oThat.modelGeneral.setProperty("/usuarioLoginVBStyle", "TextStyleJefe");
                        this.onConfirmUpdateRmdCheckBox(oEvent, false);
                    } else {  
                        this.onOpenVeridLoginVB();
                    }
                }else {
                    this.onConfirmUpdateRmdCheckBox(oEvent, false);
                }
            } catch (oError) {
                MessageBox.error(oError.responseText);
            }
        },
        onOpenVeridLoginVB: function(){
            oThat.modelGeneral.setProperty("/UsuarioLoginVB", "");
            oThat.modelGeneral.setProperty("/PasswordLoginVB", "");

            oThat.onLoginVerid = sap.ui.xmlfragment(
                "frgLoginVerid",
                rootPath + ".view.dialog.LoginVerid",
                oThat
            );
            oThat.getView().addDependent(oThat.onLoginVerid);
            
            oThat.onLoginVerid.open();
        },
        onConfirmVeridLoginVB: async function(oEvent){
            let oDataSeleccionada = oThat.getOwnerComponent().getModel("asociarDatos");
            let UsuarioLoginVB = oThat.modelGeneral.getProperty("/UsuarioLoginVB"),
                PasswordLoginVB = oThat.modelGeneral.getProperty("/PasswordLoginVB"), 
                oInfoUsuario = oThat.modelGeneral.getProperty("/oInfoUsuario");
            let aFilterUsuario = [];
            aFilterUsuario.push(new Filter("activo", "EQ", true));
            aFilterUsuario.push(new Filter("rol", "EQ", "JEFE_PROD"));
            aFilterUsuario.push(new Filter("rmdId_rmdId", "EQ", oDataSeleccionada.getData().rmdId));
            var aUsuarios = await registroService.getDataExpand(oThat.mainModelv2, "/RMD_USUARIO", "usuarioId", aFilterUsuario);
            
           // valida Inputs contienen valores
            if(UsuarioLoginVB && PasswordLoginVB){
                // Valida data en table usuarios
                if(aUsuarios.results.length > 0){
                    aUsuarios.results.forEach(function(oUsuario){
                        oUsuario.usuarioCortado = oUsuario.usuarioId.correo.split("@")[0];
                    });
                    var filtroUsuario = aUsuarios.results.filter(item => item.usuarioCortado.toLowerCase() === UsuarioLoginVB.toLowerCase() && item.rol === "JEFE_PROD");
                    if (filtroUsuario.length > 0){
                        // Valida ROL jefe
                        let oUsuarioFinal = UsuarioLoginVB.toLowerCase() + "@medifarma.com.pe";
                        IAS.GetUserValidation(oUsuarioFinal,PasswordLoginVB).then(function (ValidUserIAS) {
                            if(ValidUserIAS.mail){   
                                var event = oThat.modelGeneral.getProperty("/oEvent");
                                var source = sap.ui.getCore().byId(event);
                                oThat.modelGeneral.setProperty("/usuarioLoginVB", filtroUsuario[0].codigo);
                                oThat.modelGeneral.setProperty("/usuarioLoginVBStyle", "TextStyleJefe");
                                oThat.onConfirmUpdateRmdCheckBox(source, true);
                                oThat.onLoginVerid.close();
                            } else {
                                MessageBox.warning(
                                    oThat.getView().getModel("i18n").getResourceBundle().getText("vbLoginErrorPass"))
                                return;
                            }
                        }).catch(function (oError) {
                            MessageBox.warning(
                                oThat.getView().getModel("i18n").getResourceBundle().getText("vbLoginErrorPass"))
                            return;
                        });
                    } else {
                        MessageBox.warning(
                            oThat.getView().getModel("i18n").getResourceBundle().getText("vbLoginErrorRol"))
                        return;
                    }
                } else {
                    MessageBox.warning(
                        oThat.getView().getModel("i18n").getResourceBundle().getText("vbLoginErrorNoTableData"))
                    return;
                }

            } else {
                MessageBox.warning(
                    oThat.getView().getModel("i18n").getResourceBundle().getText("vbLoginErrorInputVacio"))
                return;
            }
            
            // oThat.onLoginVerid.close();
        },
        onCancelVeridLoginVB: function () {
            this.onLoginVerid.close();
            var event = oThat.modelGeneral.getProperty("/oEvent");
            var source = sap.ui.getCore().byId(event);
            source.setSelected(oThat.modelGeneral.getProperty("/vCheckVB"));

        },

        onConfirmUpdateRmdCheckBox:async function (oEvent,bFlag) {
            try {
                let oDataSeleccionada = oThat.getOwnerComponent().getModel("asociarDatos");
                let fraccionActual = oDataSeleccionada.getData().aEstructura.results[0].fraccion;
                let dataRmd = oDataSeleccionada.getData();
                let oModel,aDataModelEstructura,aListRmdItem,oDataEstructura,oSource,bCheckBox;
                if(!bFlag){
                    oModel = oEvent.getSource().getParent().getParent().getParent().mBindingInfos.items.model;
                        aDataModelEstructura = oThat.getView().getModel(oModel);
                        aListRmdItem = oEvent.getSource().getParent().getBindingContext(oModel).getObject();
                        oDataEstructura = aDataModelEstructura.getData();
                        oSource = oEvent.getSource();
                        bCheckBox = oThat.modelGeneral.getProperty("/checkBoxState");;
                }else{
                    oModel = oEvent.getParent().getParent().getParent().mBindingInfos.items.model;
                        aDataModelEstructura = oThat.getView().getModel(oModel);
                        aListRmdItem = oEvent.getParent().getBindingContext(oModel).getObject();
                        oDataEstructura = aDataModelEstructura.getData();
                        oSource = oEvent;
                        bCheckBox = oThat.modelGeneral.getProperty("/checkBoxState");
                }

                if (aListRmdItem.usuarioActualiza && !bCheckBox){
                    var oDialog = new sap.m.Dialog({
                        title: formatter.onGetI18nText(oThat, "sMesaggeModificationReason"),
                        type: "Message",
                        content: [
                            new sap.m.Label({
                                text: formatter.onGetI18nText(oThat, "sMessageAgreeReason"),
                                labelFor: "submitDialogTextarea"
                            }),
                            new sap.m.TextArea("submitDialogTextarea", {
                                liveChange: function (oEvent) {
                                    var parent = oEvent.getSource().getParent();
                                    parent.getBeginButton().setEnabled(true);
                                },
                                width: "100%",
                                required: true
                            })
                        ],
                        beginButton: new sap.m.Button({
                            type: sap.m.ButtonType.Emphasized,
                            text: "Confirmar",
                            enabled: false,
                            press: async function () {
                                var sText = sap.ui.getCore().byId("submitDialogTextarea").getValue();
                                if (aListRmdItem.tipoDatoId_iMaestraId === sIdVistobueno || aListRmdItem.tipoDatoId_iMaestraId === sIdRealizadoporyVistobueno) {
                                    aListRmdItem.usuarioActualiza = oThat.modelGeneral.getProperty("/usuarioLoginVB");
                                    aListRmdItem.styleUser = oThat.modelGeneral.getProperty("/usuarioLoginVBStyle");    
                                } else {
                                    aListRmdItem.usuarioActualiza = oInfoUsuario.data.usuario;
                                    aListRmdItem.styleUser = formatter.selectedColor(oInfoUsuario.rol[0].codigo);
                                }
                                let aUsuarios = [],
                                    aFechas = [];

                                oDataEstructura.forEach(function(oRow){
                                    if (oRow.usuarioActualiza) {
                                        aUsuarios.push(oRow.usuarioActualiza);
                                    }
                                    if (oRow.realizadoPorUser) {
                                        let arrayUser = oRow.realizadoPorUser.split(",");
                                        arrayUser.forEach(function(oUsuario){
                                            aUsuarios.push(oUsuario)
                                        });
                                    }
                                    if (oRow.multiCheckUser) {
                                        let arrayUser = oRow.multiCheckUser.split(",");
                                        arrayUser.forEach(function(oUsuario){
                                            aUsuarios.push(oUsuario)
                                        });
                                    }
                                    if (oRow.firstFechaActualiza) {
                                        aFechas.push(oRow.firstFechaActualiza.getTime());
                                    }
                                });
                                if (aListRmdItem.tipoDatoId_iMaestraId === sIdVistobueno || aListRmdItem.tipoDatoId_iMaestraId === sIdRealizadoporyVistobueno) {
                                    aUsuarios.push(oThat.modelGeneral.getProperty("/usuarioLoginVB"));
                                } else {
                                    aUsuarios.push(oInfoUsuario.data.usuario);
                                }
                                aFechas.push(new Date().getTime());

                                let oFooter = {
                                    usuario: '',
                                    fecha: ''
                                }

                                if (aUsuarios.length > 0) {
                                    let oUsuarioActualizaFooter = aUsuarios.filter((value, index, self) => self.indexOf(value) === index);
                                    oFooter.usuario = oUsuarioActualizaFooter.join();
                                }
                                if (aFechas.length > 0) {
                                    oFooter.fecha = formatter.formatDateFooter(new Date(Math.min(...aFechas)));
                                }
                                
                                let oModelFooter = new JSONModel(oFooter);
                                oThat.getView().setModel(oModelFooter, "aFooter");

                                await oThat.onUpdateRmdPaso(aListRmdItem, sText, true);
                                // SE GRABA DEPENDE, REVISAR // GRPR
                                // await oThat.onSaveLineaActualPasoDepende(oParam, oRows);
                                sap.ui.getCore().byId("submitDialogTextarea").setValue("");
                                BusyIndicator.show(0);
                                await sap.ui.controller("mif.rmd.registro.controller.MainView").getEstructurasRmdRefactory(fraccionActual);
                                await oThat.onChangeEstructura();
                                
                                let aFilter = [];
                                aFilter.push(new Filter("usuarioId_usuarioId", "EQ", oInfoUsuario.data.usuarioId));
                                aFilter.push(new Filter("rmdId_rmdId", "EQ", dataRmd.rmdId));
                                aFilter.push(new Filter("fraccion", "EQ", fraccionActual));
                                let aLapsoSelected = await registroService.onGetDataGeneralFilters(oThat.mainModelv2, "RMD_VERIFICACION_FIRMAS", aFilter);
                                if(aLapsoSelected.results.length === 0){
                                    var oDataFirmaVerif = {}
                                    oDataFirmaVerif.rmdId           = dataRmd.rmdId;
                                    oDataFirmaVerif.fraccionActual  = fraccionActual;

                                    oThat.onRMD_VERIFICACION_FIRMAS(oDataFirmaVerif);
                                }

                                BusyIndicator.hide();
                                oDialog.close();
                            }
                        }),
                        endButton: new sap.m.Button({
                            type: sap.m.ButtonType.Reject,
                            text: "Cancelar",
                            enabled: true,
                            press: function () {
                                sap.ui.getCore().byId("submitDialogTextarea").setValue("");
                                oSource.setSelected(false);
                                oDialog.close();
                            }
                        }),
                        afterClose: function () {
                            oDialog.destroy();
                        }
                    });
            
                    oDialog.open();
                } else if (aListRmdItem.usuarioActualiza && bCheckBox) {
                    if (aListRmdItem.tipoDatoId_iMaestraId === sIdVistobueno || aListRmdItem.tipoDatoId_iMaestraId === sIdRealizadoporyVistobueno) {
                        aListRmdItem.usuarioActualiza = oThat.modelGeneral.getProperty("/usuarioLoginVB");
                        aListRmdItem.styleUser = oThat.modelGeneral.getProperty("/usuarioLoginVBStyle");    
                    } else {
                        aListRmdItem.usuarioActualiza = oInfoUsuario.data.usuario;
                        aListRmdItem.styleUser = formatter.selectedColor(oInfoUsuario.rol[0].codigo);
                    }
                    let aUsuarios = [],
                        aFechas = [];

                    oDataEstructura.forEach(function(oRow){
                        if (oRow.usuarioActualiza) {
                            aUsuarios.push(oRow.usuarioActualiza);
                        }
                        if (oRow.realizadoPorUser) {
                            let arrayUser = oRow.realizadoPorUser.split(",");
                            arrayUser.forEach(function(oUsuario){
                                aUsuarios.push(oUsuario)
                            });
                        }
                        if (oRow.multiCheckUser) {
                            let arrayUser = oRow.multiCheckUser.split(",");
                            arrayUser.forEach(function(oUsuario){
                                aUsuarios.push(oUsuario)
                            });
                        }
                        if (oRow.firstFechaActualiza) {
                            aFechas.push(oRow.firstFechaActualiza.getTime());
                        }
                    });

                    if (aListRmdItem.tipoDatoId_iMaestraId === sIdVistobueno || aListRmdItem.tipoDatoId_iMaestraId === sIdRealizadoporyVistobueno) {
                        aUsuarios.push(oThat.modelGeneral.getProperty("/usuarioLoginVB"));
                    } else {
                        aUsuarios.push(oInfoUsuario.data.usuario);
                    }
                    aFechas.push(new Date().getTime());

                    let oFooter = {
                        usuario: '',
                        fecha: ''
                    }

                    if (aUsuarios.length > 0) {
                        let oUsuarioActualizaFooter = aUsuarios.filter((value, index, self) => self.indexOf(value) === index);
                        oFooter.usuario = oUsuarioActualizaFooter.join();
                    }
                    if (aFechas.length > 0) {
                        oFooter.fecha = formatter.formatDateFooter(new Date(Math.min(...aFechas)));
                    }
                    
                    let oModelFooter = new JSONModel(oFooter);
                    oThat.getView().setModel(oModelFooter, "aFooter");

                    await oThat.onUpdateRmdPaso(aListRmdItem, '', true);
                    BusyIndicator.show(0);
                    await sap.ui.controller("mif.rmd.registro.controller.MainView").getEstructurasRmdRefactory(fraccionActual);
                    await oThat.onChangeEstructura();

                    let aFilter = [];
                    aFilter.push(new Filter("usuarioId_usuarioId", "EQ", oInfoUsuario.data.usuarioId));
                    aFilter.push(new Filter("rmdId_rmdId", "EQ", dataRmd.rmdId));
                    aFilter.push(new Filter("fraccion", "EQ", fraccionActual));
                    let aLapsoSelected = await registroService.onGetDataGeneralFilters(oThat.mainModelv2, "RMD_VERIFICACION_FIRMAS", aFilter);
                    if(aLapsoSelected.results.length === 0){
                        var oDataFirmaVerif = {}
                        oDataFirmaVerif.rmdId           = dataRmd.rmdId;
                        oDataFirmaVerif.fraccionActual  = fraccionActual;

                        oThat.onRMD_VERIFICACION_FIRMAS(oDataFirmaVerif);
                    }

                    BusyIndicator.hide();
                    // SE GRABA DEPENDE, REVISAR // GRPR
                    // oThat.onUpdateRmdPasoDepende(oParam, oRows);
                } else {
                    // Actualizar estado del RMD a "En Proceso".
                    let oDataGeneralBack = oThat.getOwnerComponent().getModel("asociarDatos"),
                        aDataGeneralBack = oDataGeneralBack.getData();
                    let aFilters= [];
                    aFilters.push(new Filter("rmdId", "EQ", aDataGeneralBack.rmdId));
                    let aRmdResponse = await registroService.onGetDataGeneralFilters(oThat.mainModelv2, "RMD", aFilters);
                    if (!aRmdResponse.results[0].bFlagInitial) {
                        let oChange = {
                            estadoIdRmd_iMaestraId: iStateProcess,
                            bFlagInitial: true,
                            fechaInicioRegistro: new Date()
                        }
                        await registroService.onUpdateDataGeneral(oThat.mainModelv2, "RMD", oChange, aDataGeneralBack.rmdId);  
                    }
                    if (aListRmdItem.tipoDatoId_iMaestraId === sIdVistobueno || aListRmdItem.tipoDatoId_iMaestraId === sIdRealizadoporyVistobueno) {
                        aListRmdItem.usuarioActualiza = oThat.modelGeneral.getProperty("/usuarioLoginVB");
                        aListRmdItem.styleUser = oThat.modelGeneral.getProperty("/usuarioLoginVBStyle");    
                    } else {
                        aListRmdItem.usuarioActualiza = oInfoUsuario.data.usuario;
                        aListRmdItem.styleUser = formatter.selectedColor(oInfoUsuario.rol[0].codigo);
                    }
                    let aUsuarios = [],
                        aFechas = [];

                    oDataEstructura.forEach(function(oRow){
                        if (oRow.usuarioActualiza) {
                            aUsuarios.push(oRow.usuarioActualiza);
                        }
                        if (oRow.realizadoPorUser) {
                            let arrayUser = oRow.realizadoPorUser.split(",");
                            arrayUser.forEach(function(oUsuario){
                                aUsuarios.push(oUsuario)
                            });
                        }
                        if (oRow.multiCheckUser) {
                            let arrayUser = oRow.multiCheckUser.split(",");
                            arrayUser.forEach(function(oUsuario){
                                aUsuarios.push(oUsuario)
                            });
                        }
                        if (oRow.firstFechaActualiza) {
                            aFechas.push(oRow.firstFechaActualiza.getTime());
                        }
                    });

                    if (aListRmdItem.tipoDatoId_iMaestraId === sIdVistobueno || aListRmdItem.tipoDatoId_iMaestraId === sIdRealizadoporyVistobueno) {
                        aUsuarios.push(oThat.modelGeneral.getProperty("/usuarioLoginVB"));
                    } else {
                        aUsuarios.push(oInfoUsuario.data.usuario);
                    }
                    aFechas.push(new Date().getTime());

                    let oFooter = {
                        usuario: '',
                        fecha: ''
                    }

                    if (aUsuarios.length > 0) {
                        let oUsuarioActualizaFooter = aUsuarios.filter((value, index, self) => self.indexOf(value) === index);
                        oFooter.usuario = oUsuarioActualizaFooter.join();
                    }
                    if (aFechas.length > 0) {
                        oFooter.fecha = formatter.formatDateFooter(new Date(Math.min(...aFechas)));
                    }
                    
                    let oModelFooter = new JSONModel(oFooter);
                    oThat.getView().setModel(oModelFooter, "aFooter");

                    await oThat.onUpdateRmdPaso(aListRmdItem, '', false);
                    BusyIndicator.show(0);
                    await sap.ui.controller("mif.rmd.registro.controller.MainView").getEstructurasRmdRefactory(fraccionActual);
                    await oThat.onChangeEstructura();

                    let aFilter = [];
                    aFilter.push(new Filter("usuarioId_usuarioId", "EQ", oInfoUsuario.data.usuarioId));
                    aFilter.push(new Filter("rmdId_rmdId", "EQ", dataRmd.rmdId));
                    aFilter.push(new Filter("fraccion", "EQ", fraccionActual));
                    let aLapsoSelected = await registroService.onGetDataGeneralFilters(oThat.mainModelv2, "RMD_VERIFICACION_FIRMAS", aFilter);
                    if(aLapsoSelected.results.length === 0){
                        var oDataFirmaVerif = {}
                        oDataFirmaVerif.rmdId           = dataRmd.rmdId;
                        oDataFirmaVerif.fraccionActual  = fraccionActual;

                        oThat.onRMD_VERIFICACION_FIRMAS(oDataFirmaVerif);
                    }

                    BusyIndicator.hide();
                    // SE GRABA DEPENDE, REVISAR // GRPR
                    // oThat.onUpdateRmdPasoDepende(oParam, oRows);
                }
            } catch (oError) {
                MessageBox.error(oError.responseText);
            }
        },
        
        onConfirmUpdateItem: function (oEvent) {
            try {
                let oDataSeleccionada = oThat.getOwnerComponent().getModel("asociarDatos");
                let fraccionActual = oDataSeleccionada.getData().aEstructura.results[0].fraccion;
                let dataRmd = oDataSeleccionada.getData();
                let oModel = oEvent.getSource().getParent().getParent().getParent().mBindingInfos.items.model,
                    aListaRmdItem = oEvent.getSource().getBindingContext(oModel).getObject(),
                    aDataModelEstructura = oThat.getView().getModel(oModel),
                    oDataEstructura = aDataModelEstructura.getData();

                if(!aListaRmdItem.generalInput && ( aListaRmdItem.tipoDatoId_iMaestraId === sIdTexto || 
                                                    aListaRmdItem.tipoDatoId_iMaestraId === sIdCantidad ||
                                                    aListaRmdItem.tipoDatoId_iMaestraId === sIdNumeros || 
                                                    aListaRmdItem.tipoDatoId_iMaestraId === sIdRango )){
                    MessageBox.warning("Se debe colocar un valor para poder realizar esta acci??n.");
                    return;
                }
                
                if (aListaRmdItem.usuarioActualiza){
                    var oDialog = new sap.m.Dialog({
                        title: formatter.onGetI18nText(oThat, "sMesaggeModificationReason"),
                        type: "Message",
                        content: [
                            new sap.m.Label({
                                text: formatter.onGetI18nText(oThat, "sMessageAgreeReason"),
                                labelFor: "submitDialogTextarea"
                            }),
                            new sap.m.TextArea("submitDialogTextarea", {
                                liveChange: function (oEvent) {
                                    var parent = oEvent.getSource().getParent();
                                    parent.getBeginButton().setEnabled(true);
                                },
                                width: "100%",
                                required: true
                            })
                        ],
                        beginButton: new sap.m.Button({
                            type: sap.m.ButtonType.Emphasized,
                            text: "Confirmar",
                            enabled: false,
                            press: async function () {
                                var sText = sap.ui.getCore().byId("submitDialogTextarea").getValue();
                                MessageBox.confirm(formatter.onGetI18nText(oThat, "sMessageSaveAction"), {
                                    onClose : async function(sButton) {
                                        if (sButton === MessageBox.Action.OK) {
                                            aListaRmdItem.usuarioActualiza = oInfoUsuario.data.usuario;
                                            aListaRmdItem.styleUser = formatter.selectedColor(oInfoUsuario.rol[0].codigo);
                                            let aUsuarios = [],
                                                aFechas = [];

                                            oDataEstructura.forEach(function(oRow){
                                                if (oRow.usuarioActualiza) {
                                                    aUsuarios.push(oRow.usuarioActualiza);
                                                }
                                                if (oRow.realizadoPorUser) {
                                                    let arrayUser = oRow.realizadoPorUser.split(",");
                                                    arrayUser.forEach(function(oUsuario){
                                                        aUsuarios.push(oUsuario)
                                                    });
                                                }
                                                if (oRow.multiCheckUser) {
                                                    let arrayUser = oRow.multiCheckUser.split(",");
                                                    arrayUser.forEach(function(oUsuario){
                                                        aUsuarios.push(oUsuario)
                                                    });
                                                }
                                                if (oRow.firstFechaActualiza) {
                                                    aFechas.push(oRow.firstFechaActualiza.getTime());
                                                }
                                            });

                                            aUsuarios.push(oInfoUsuario.data.usuario);
                                            aFechas.push(new Date().getTime());

                                            let oFooter = {
                                                usuario: '',
                                                fecha: ''
                                            }

                                            if (aUsuarios.length > 0) {
                                                let oUsuarioActualizaFooter = aUsuarios.filter((value, index, self) => self.indexOf(value) === index);
                                                oFooter.usuario = oUsuarioActualizaFooter.join();
                                            }
                                            if (aFechas.length > 0) {
                                                oFooter.fecha = formatter.formatDateFooter(new Date(Math.min(...aFechas)));
                                            }
                                            
                                            let oModelFooter = new JSONModel(oFooter);
                                            oThat.getView().setModel(oModelFooter, "aFooter");

                                            let bValidate = await oThat.onUpdateRmdPaso(aListaRmdItem, sText, true);
                                            if (bValidate !== false) {
                                                sap.ui.getCore().byId("submitDialogTextarea").setValue("");
                                                BusyIndicator.show(0);
                                                await sap.ui.controller("mif.rmd.registro.controller.MainView").getEstructurasRmdRefactory(fraccionActual);
                                                await oThat.onChangeEstructura();
                                                BusyIndicator.hide();
                                                oDialog.close();

                                                let aFilter = [];
                                                aFilter.push(new Filter("usuarioId_usuarioId", "EQ", oInfoUsuario.data.usuarioId));
                                                aFilter.push(new Filter("rmdId_rmdId", "EQ", dataRmd.rmdId));
                                                aFilter.push(new Filter("fraccion", "EQ", fraccionActual));
                                                let aLapsoSelected = await registroService.onGetDataGeneralFilters(oThat.mainModelv2, "RMD_VERIFICACION_FIRMAS", aFilter);
                                                if(aLapsoSelected.results.length === 0){
                                                    var oDataFirmaVerif = {}
                                                    oDataFirmaVerif.rmdId           = dataRmd.rmdId;
                                                    oDataFirmaVerif.fraccionActual  = fraccionActual;
        
                                                    oThat.onRMD_VERIFICACION_FIRMAS(oDataFirmaVerif);
                                                }
                                            } else {
                                                return false;
                                            }
                                        }
                                    }
                                });
                            }
                        }),
                        endButton: new sap.m.Button({
                            type: sap.m.ButtonType.Reject,
                            text: "Cancelar",
                            enabled: true,
                            press: function () {
                                sap.ui.getCore().byId("submitDialogTextarea").setValue("");
                                oDialog.close();
                            }
                        }),
                        afterClose: function () {
                            oDialog.destroy();
                        }
                    });
            
                    oDialog.open();
                } else {
                    MessageBox.confirm(formatter.onGetI18nText(oThat, "sMessageSaveAction"), {
                        onClose : async function(sButton) {
                            if (sButton === MessageBox.Action.OK) {
                                // Actualizar estado del RMD a "En Proceso".
                                let oDataGeneralBack = oThat.getOwnerComponent().getModel("asociarDatos"),
                                    aDataGeneralBack = oDataGeneralBack.getData();
                                let aFilters= [];
                                aFilters.push(new Filter("rmdId", "EQ", aDataGeneralBack.rmdId));
                                let aRmdResponse = await registroService.onGetDataGeneralFilters(oThat.mainModelv2, "RMD", aFilters);
                                if (!aRmdResponse.results[0].bFlagInitial) {
                                    let oChange = {
                                        estadoIdRmd_iMaestraId: iStateProcess,
                                        bFlagInitial: true,
                                        fechaInicioRegistro: new Date()
                                    }
                                    await registroService.onUpdateDataGeneral(oThat.mainModelv2, "RMD", oChange, aDataGeneralBack.rmdId);  
                                }
                                aListaRmdItem.usuarioActualiza = oInfoUsuario.data.usuario;
                                aListaRmdItem.styleUser = formatter.selectedColor(oInfoUsuario.rol[0].codigo);
                                let aUsuarios = [],
                                    aFechas = [];

                                oDataEstructura.forEach(function(oRow){
                                    if (oRow.usuarioActualiza) {
                                        aUsuarios.push(oRow.usuarioActualiza);
                                    }
                                    if (oRow.realizadoPorUser) {
                                        let arrayUser = oRow.realizadoPorUser.split(",");
                                        arrayUser.forEach(function(oUsuario){
                                            aUsuarios.push(oUsuario)
                                        });
                                    }
                                    if (oRow.multiCheckUser) {
                                        let arrayUser = oRow.multiCheckUser.split(",");
                                        arrayUser.forEach(function(oUsuario){
                                            aUsuarios.push(oUsuario)
                                        });
                                    }
                                    if (oRow.firstFechaActualiza) {
                                        aFechas.push(oRow.firstFechaActualiza.getTime());
                                    }
                                });

                                aUsuarios.push(oInfoUsuario.data.usuario);
                                aFechas.push(new Date().getTime());

                                let oFooter = {
                                    usuario: '',
                                    fecha: ''
                                }

                                if (aUsuarios.length > 0) {
                                    let oUsuarioActualizaFooter = aUsuarios.filter((value, index, self) => self.indexOf(value) === index);
                                    oFooter.usuario = oUsuarioActualizaFooter.join();
                                }
                                if (aFechas.length > 0) {
                                    oFooter.fecha = formatter.formatDateFooter(new Date(Math.min(...aFechas)));
                                }
                                
                                let oModelFooter = new JSONModel(oFooter);
                                oThat.getView().setModel(oModelFooter, "aFooter");


                                let bValidate = await oThat.onUpdateRmdPaso(aListaRmdItem, '', false);
                                if (bValidate !== false) {
                                    BusyIndicator.show(0);
                                    await sap.ui.controller("mif.rmd.registro.controller.MainView").getEstructurasRmdRefactory(fraccionActual);
                                    await oThat.onChangeEstructura();
                                    BusyIndicator.hide();

                                    let aFilter = [];
                                    aFilter.push(new Filter("usuarioId_usuarioId", "EQ", oInfoUsuario.data.usuarioId));
                                    aFilter.push(new Filter("rmdId_rmdId", "EQ", dataRmd.rmdId));
                                    aFilter.push(new Filter("fraccion", "EQ", fraccionActual));
                                    let aLapsoSelected = await registroService.onGetDataGeneralFilters(oThat.mainModelv2, "RMD_VERIFICACION_FIRMAS", aFilter);
                                    if(aLapsoSelected.results.length === 0){
                                        var oDataFirmaVerif = {}
                                        oDataFirmaVerif.rmdId           = dataRmd.rmdId;
                                        oDataFirmaVerif.fraccionActual  = fraccionActual;

                                        oThat.onRMD_VERIFICACION_FIRMAS(oDataFirmaVerif);
                                    }
                                } else {
                                    return false;
                                }
                            }
                        }
                    });
                }
            } catch (oError) {
                MessageBox.error(oError.responseText);
            }
        },

        onRMD_VERIFICACION_FIRMAS: async function(oDataFirmaVerif, sTipo, oUsuario, oRol){
            let oObj = {};
            if (sTipo === "ENSAYO") {
                let nombreRol = oRol.oRol ? oRol.oRol.nombre : '';
                oObj= {
                    usuarioRegistro     : oUsuario.usuario ? oUsuario.usuario : 'SYSTEM',
                    fechaRegistro       : new Date(),
                    activo              : true,
                    rmdFirmaVerif       : util.onGetUUIDV4(),
                    rmdId_rmdId         : oDataFirmaVerif.rmdId,
                    fraccion            : oDataFirmaVerif.fraccionActual,
                    rol                 : nombreRol,
                    usuarioId_usuarioId : oUsuario.usuarioId,
                    usuarioSap          : oDataFirmaVerif.usuarioSap
                }  
            } else {
                oObj = {
                    usuarioRegistro : oInfoUsuario.data.usuario,
                    fechaRegistro   : new Date(),
                    activo          : true,
                    rmdFirmaVerif   : util.onGetUUIDV4(),
                    rmdId_rmdId     : oDataFirmaVerif.rmdId,
                    fraccion        : oDataFirmaVerif.fraccionActual,
                    rol             : oInfoUsuario.rol[0].nombre,
                    usuarioId_usuarioId : oInfoUsuario.data.usuarioId
                }
            }
            await registroService.onSaveDataGeneral(oThat.mainModelv2, "RMD_VERIFICACION_FIRMAS", oObj);
        },

        onRMD_VERIFICACION_FIRMAS_MULTIPLE: async function(oDataFirmaVerif){
            let oObj = {
                usuarioRegistro : oInfoUsuario.data.usuario,
                fechaRegistro   : new Date(),
                activo          : true,

                rmdFirmaVerif   : util.onUUID(),
                rmdId_rmdId     : oDataFirmaVerif.rmdId,
                fraccion        : oDataFirmaVerif.fraccionActual,
                rol             : oDataFirmaVerif.rol,
                usuarioId_usuarioId : oDataFirmaVerif.usuarioVerif
            }
            await registroService.onSaveDataGeneral(oThat.mainModelv2, "RMD_VERIFICACION_FIRMAS", oObj);
        },

        onUpdateRmdPaso: async function(aListRmdItem, sMotivoModif, bModificable){
            try {
                BusyIndicator.show(0);
                let oDataSeleccionada = oThat.getOwnerComponent().getModel("asociarDatos");
                let fraccionActual = oDataSeleccionada.getData().aEstructura.results[0].fraccion;
                let sEntity, idTable, idFormula,
                    oParam = {};

                if (aListRmdItem.sTipo === 'PROCEDIMIENTO') {
                    sEntity = 'RMD_ES_PASO';
                    idTable = aListRmdItem.rmdEstructuraPasoId;
                    idFormula = aListRmdItem.mdEstructuraPasoIdDepende;
                } else if (aListRmdItem.sTipo === 'PROCEDIMIENTOPM') {
                    sEntity = 'RMD_ES_PASO_INSUMO_PASO';
                    idTable = aListRmdItem.rmdEstructuraPasoInsumoPasoId;
                    idFormula = aListRmdItem.mdEstructuraPasoInsumoPasoIdAct;
                } else if (aListRmdItem.sTipo === 'CUADRO' || aListRmdItem.sTipo === 'CONDICIONAMBIENTAL') {
                    sEntity = 'RMD_ES_PASO';
                    idTable = aListRmdItem.rmdEstructuraPasoId;
                    idFormula = aListRmdItem.mdEstructuraPasoIdDepende;
                } else if (aListRmdItem.sTipo === 'EQUIPO') {
                    sEntity = 'RMD_ES_EQUIPO';
                    idTable = aListRmdItem.rmdEstructuraEquipoId; 
                } else if (aListRmdItem.sTipo === 'UTENSILIO') {
                    sEntity = 'RMD_ES_UTENSILIO';
                    idTable = aListRmdItem.rmdEstructuraUtensilioId; 
                } else if (aListRmdItem.sTipo === 'ESPECIFICACIONES') {
                    sEntity = 'RMD_ES_ESPECIFICACION';
                    idTable = aListRmdItem.rmdEstructuraEspecificacionId;
                    oParam.resultados = aListRmdItem.resultados;
                }

                if (aListRmdItem.tipoDatoId_iMaestraId === sIdVistobueno || aListRmdItem.tipoDatoId_iMaestraId === sIdRealizadoporyVistobueno) {
                    oParam.usuarioActualiza = oThat.modelGeneral.getProperty("/usuarioLoginVB");
                    oParam.styleUser = oThat.modelGeneral.getProperty("/usuarioLoginVBStyle");    
                } else {
                    oParam.usuarioActualiza = oInfoUsuario.data.usuario;
                    oParam.styleUser = formatter.selectedColor(oInfoUsuario.rol[0].codigo);
                }
                oParam.fechaActualiza = new Date();
                oParam.flagEditado = bModificable;

                if (!aListRmdItem.firstFechaActualiza) {
                    oParam.firstFechaActualiza = new Date();
                }

                let sDatoIngresado = '';
                let sDialogOpen = "false";
                let checkBoxState = oThat.modelGeneral.getProperty("/checkBoxState");
                if (aListRmdItem.tipoDatoId_iMaestraId === sIdTexto) {
                    oParam.texto = aListRmdItem.generalInput;
                    sDatoIngresado = oParam.texto;
                } else if (aListRmdItem.tipoDatoId_iMaestraId === sIdCantidad) {
                    oParam.cantidad = parseFloat(parseFloat(aListRmdItem.generalInput).toFixed(aListRmdItem.decimales));
                    sDatoIngresado = oParam.cantidad;
                } else if (aListRmdItem.tipoDatoId_iMaestraId === sIdNumeros) {
                    oParam.cantidad = parseFloat(parseFloat(aListRmdItem.generalInput).toFixed(aListRmdItem.decimales));
                    sDatoIngresado = oParam.cantidad;
                } else if (aListRmdItem.tipoDatoId_iMaestraId === sIdFecha) {
                    oParam.fecha = new Date();
                    sDatoIngresado = oParam.fecha.toLocaleDateString();
                } else if (aListRmdItem.tipoDatoId_iMaestraId === sIdFechayHora) {
                    oParam.fechaHora = new Date();
                    sDatoIngresado = oParam.fechaHora.toLocaleString();
                } else if (aListRmdItem.tipoDatoId_iMaestraId === sIdHora) {
                    oParam.hora = new Date().toLocaleTimeString();
                    sDatoIngresado = oParam.hora;
                } else if (aListRmdItem.tipoDatoId_iMaestraId === sIdVerificacionCheck) {
                    oParam.verifCheck = checkBoxState;
                    sDatoIngresado = oParam.verifCheck;
                } else if (aListRmdItem.tipoDatoId_iMaestraId === sIdVistobueno) {
                    oParam.vistoBueno = checkBoxState;
                    sDatoIngresado = oParam.vistoBueno;
                }  else if (aListRmdItem.tipoDatoId_iMaestraId === sIdRealizadoporyVistobueno) {
                    oParam.vistoBueno = checkBoxState;
                    sDatoIngresado = oParam.vistoBueno;
                } else if (aListRmdItem.tipoDatoId_iMaestraId === sIdRango) {
                    let sRangoMargenMin = (parseInt(aListRmdItem.valorInicial) - parseInt(aListRmdItem.margen)).toString();
                    let sRangoMargenMax = (parseInt(aListRmdItem.valorFinal) + parseInt(aListRmdItem.margen)).toString();
                    if(!(parseFloat(aListRmdItem.generalInput) >= parseInt(sRangoMargenMin) && parseFloat(aListRmdItem.generalInput) <= parseInt(sRangoMargenMax))){
                        MessageBox.information("El valor ingresado esta fuera del rango [" + aListRmdItem.valorInicial + " - " + aListRmdItem.valorFinal + "], que cuenta con un margen de +/- " + parseFloat(aListRmdItem.margen).toFixed(aListRmdItem.decimales).toString());
                        BusyIndicator.hide();
                        return false;
                    }
                    oParam.rango = parseFloat(aListRmdItem.generalInput);
                    sDatoIngresado = oParam.rango;
                } else if (aListRmdItem.tipoDatoId_iMaestraId === sIdDatoFijo) {
                    oParam.datoFijo = aListRmdItem.generalInput;
                    sDatoIngresado = oParam.datoFijo;
                } else if (aListRmdItem.tipoDatoId_iMaestraId === sIdFormula) {
                    let aFilter = [];
                    aFilter.push(new Filter("pasoPadreId_mdEstructuraPasoId", "EQ", idFormula));
                    aFilter.push(new Filter("activo", "EQ", true));
                    let obtenerFormula = await registroService.onGetDataGeneralFilters(oThat.mainModelv2, "MD_ES_FORMULA_PASO", aFilter);
                    let sFormula = null;
                    if(obtenerFormula.results.length > 0) {
                        obtenerFormula.results.sort(function (a, b) {
                            return a.orden - b.orden;
                        });
                        let formulaResult = "";
                        for await (const e of obtenerFormula.results) {
                            if(e.esPaso){
                                let aFilters = [];
                                aFilters.push(new Filter("mdEstructuraPasoIdDepende", "EQ", e.pasoFormulaId_mdEstructuraPasoId));
                                aFilters.push(new Filter("rmdId_rmdId", "EQ", oDataSeleccionada.getData().rmdId));
                                let pasoSelected = await registroService.onGetDataGeneralFilters(oThat.mainModelv2, "RMD_ES_PASO", aFilters);
                                let valorPaso = formatter.onFormatoTipoDatoInput(pasoSelected.results[0]);
                                formulaResult = formulaResult + valorPaso;
                            } else {
                                e.valor = e.valor === 'CT' ? oDataSeleccionada.getData().vfmng : e.valor;
                                formulaResult = formulaResult + e.valor;
                            }
                        }
    
                        sFormula = eval(formulaResult);
                        sFormula = parseFloat(sFormula).toFixed(3);
                    } else {
                        BusyIndicator.hide();
                        MessageBox.warning("No se configur?? una f??rmula para este paso.");
                        return;
                    }
                    oParam.formula = sFormula;
                    sDatoIngresado = oParam.formula;
                } else if (aListRmdItem.tipoDatoId_iMaestraId === sIdSintipodedato) {
                    oParam.texto = '';
                } else if (aListRmdItem.tipoDatoId_iMaestraId === sIdNotificacion) {
                    oParam.fechaHora = new Date();
                    let diaActual = new Date().getDate();
                    // if (aListRmdItem.pasoId.tipoCondicionId_iMaestraId === 482 && aListRmdItem.clvModelo === "SETPOST" && diaActual === 1) { //PARA CUANDO SOLO SE MANDE CUANDO SEA EL 1 DE CADA MES
                    if (aListRmdItem.pasoId.tipoCondicionId_iMaestraId === 482 && aListRmdItem.clvModelo === "SETPOST") {
                        sDialogOpen = "true";
                        let date = new Date(oParam.fechaHora).getDate();
                        let month = new Date(oParam.fechaHora).getMonth() + 1;
                        let year = new Date(oParam.fechaHora).getFullYear();
                        var oDialog = new sap.m.Dialog({
                            title: "Fecha de Notificaci??n",
                            type: "Message",
                            content: [
                                new sap.m.Label({
                                    text: "Seleccione la fecha",
                                    labelFor: "submitDialogTextarea"
                                }),
                                new sap.m.DatePicker("submitDialogDatePicker", {
                                    valueFormat: "yyyy/MM/dd",
                                    displayFormat: "yyyy/MM/dd",
                                    width: "100%",
                                    required: true,
                                    value: year + "/" + month + "/" + date
                                })
                            ],
                            beginButton: new sap.m.Button({
                                type: sap.m.ButtonType.Emphasized,
                                text: "Confirmar",
                                enabled: true,
                                press: async function () {
                                    var dDate = sap.ui.getCore().byId("submitDialogDatePicker").getValue();
                                    MessageBox.confirm("??Desea guardar la acci??n realizada?", {
                                        onClose : async function(sButton) {
                                            if (sButton === MessageBox.Action.OK) {
                                                BusyIndicator.show(0);
                                                oParam.fechaHora = new Date();
                                                oDialog.close();
                                                let bValidate = await oThat.onUpdateRMDLapso(aListRmdItem, oDataSeleccionada, fraccionActual, new Date(dDate));
                                                if (bValidate) {
                                                    sDatoIngresado = oParam.fechaHora.toLocaleString();
                                                    await registroService.onUpdateDataGeneral(oThat.mainModelv2, sEntity, oParam, idTable);
                                                    let sControl = '';
                                                    if (aListRmdItem.sTipo === 'EQUIPO' || aListRmdItem.sTipo === 'UTENSILIO') {
                                                        sControl = 'VerificacionCheck';
                                                    } else {
                                                        sControl = aListRmdItem.tipoDatoId.contenido;
                                                    }
                                                    await oThat.saveLineaActualHistorial(aListRmdItem, String(sDatoIngresado), sControl, sMotivoModif);
                                                    await sap.ui.controller("mif.rmd.registro.controller.MainView").getEstructurasRmdRefactory(fraccionActual);
                                                    await oThat.onChangeEstructura();
                                                    let aFilter = [];
                                                    aFilter.push(new Filter("usuarioId_usuarioId", "EQ", oInfoUsuario.data.usuarioId));
                                                    aFilter.push(new Filter("rmdId_rmdId", "EQ", oDataSeleccionada.getData().rmdId));
                                                    aFilter.push(new Filter("fraccion", "EQ", fraccionActual));
                                                    let aLapsoSelected = await registroService.onGetDataGeneralFilters(oThat.mainModelv2, "RMD_VERIFICACION_FIRMAS", aFilter);
                                                    if(aLapsoSelected.results.length === 0){
                                                        var oDataFirmaVerif = {}
                                                        oDataFirmaVerif.rmdId           = oDataSeleccionada.getData().rmdId;
                                                        oDataFirmaVerif.fraccionActual  = fraccionActual;

                                                        oThat.onRMD_VERIFICACION_FIRMAS(oDataFirmaVerif);
                                                    }
                                                    BusyIndicator.hide();
                                                } else {
                                                    BusyIndicator.hide();
                                                    return false;
                                                }
                                            }
                                        }
                                    });
                                }
                            }),
                            endButton: new sap.m.Button({
                                type: sap.m.ButtonType.Reject,
                                text: "Cancelar",
                                enabled: true,
                                press: function () {
                                    oDialog.close();
                                }
                            }),
                            afterClose: function () {
                                oDialog.destroy();
                            }
                        });
                        oDialog.open();
                    } else {
                        let bValidate = await oThat.onUpdateRMDLapso(aListRmdItem, oDataSeleccionada, fraccionActual, oParam.fechaHora);
                        if (bValidate) {
                            sDatoIngresado = oParam.fechaHora.toLocaleString();
                        } else {
                            BusyIndicator.hide();
                            return false;
                        }
                    }
                } else if (aListRmdItem.tipoDatoId_iMaestraId === iIdMuestraCC) {
                    let aFilter = [];
                    aFilter.push(new Filter("activo", "EQ", true));
                    aFilter.push(new Filter("rmdId_rmdId", "EQ", oDataSeleccionada.getData().rmdId));
                    aFilter.push(new Filter("fraccion", "EQ", fraccionActual));
                    aFilter.push(new Filter("cantRechazo", "NE", "0"));
                    aFilter.push(new Filter("motivoDesv", "NE", "Merma Propia del Proceso"));
                    let sExpand = "rmdId";
                    let aListNotificaciones = await registroService.onGetDataGeneralFiltersExpand(oThat.mainModelv2, "RMD_TABLA_CONTROL", aFilter, sExpand);
                    aListNotificaciones.results = aListNotificaciones.results.filter(itm=>itm.rol === "RMD_CONTROL_PROCESO" || itm.rol === "RMD_CONTROL_CALIDAD");
                    oParam.cantidad = 0;
                    aListNotificaciones.results.forEach(function(oNotif){
                        oParam.cantidad = oParam.cantidad + parseFloat(oNotif.cantRechazo);
                    });
                    sDatoIngresado = oParam.cantidad;
                } else if (aListRmdItem.tipoDatoId_iMaestraId === iIdLote) {
                    oParam.texto = oDataSeleccionada.getData().lote;
                    sDatoIngresado = oParam.texto;
                } else if (aListRmdItem.tipoDatoId_iMaestraId === iIdFechaVencimiento) {
                    oParam.fechaHora = oDataSeleccionada.getData().expira;
                    sDatoIngresado = oParam.fechaHora.toLocaleString();
                }
                if (sDialogOpen === "false") {
                    await registroService.onUpdateDataGeneral(oThat.mainModelv2, sEntity, oParam, idTable);
                    let sControl = '';
                    if (aListRmdItem.sTipo === 'EQUIPO' || aListRmdItem.sTipo === 'UTENSILIO') {
                        sControl = 'VerificacionCheck';
                    } else {
                        sControl = aListRmdItem.tipoDatoId.contenido;
                    }
                    await this.saveLineaActualHistorial(aListRmdItem, String(sDatoIngresado), sControl, sMotivoModif);
                }
                BusyIndicator.hide();
            } catch (oError) {
                MessageBox.error(oError.responseText);
            }
        },

        onUpdateRMDLapso: async function (aListRmdItem, oDataSeleccionada, fraccionActual, fechaNotificacion){
            let bDato = true;
            if (aListRmdItem.pasoId) {
                if(aListRmdItem.pasoId.tipoCondicionId_iMaestraId === 481) {
                    let aFilter = [];
                    aFilter.push(new Filter("pasoId_mdEstructuraPasoId", "EQ", aListRmdItem.mdEstructuraPasoIdDepende));
                    aFilter.push(new Filter("rmdId_rmdId", "EQ", oDataSeleccionada.getData().rmdId));
                    aFilter.push(new Filter("fraccion", "EQ", fraccionActual));
                    let aLapsoSelected = await registroService.onGetDataGeneralFilters(oThat.mainModelv2, "RMD_LAPSO", aFilter);
                    let oParam = {
                        fechaActualiza: new Date(),
                        fechaInicio: new Date(),
                        usuarioRegistro: oInfoUsuario.data.usuario
                    }
                    await registroService.onUpdateDataGeneral(oThat.mainModelv2, "RMD_LAPSO", oParam, aLapsoSelected.results[0].rmdLapsoId);
                } else if (aListRmdItem.pasoId.tipoCondicionId_iMaestraId === 482) {
                    let aFilter = [];
                    aFilter.push(new Filter("pasoIdFin_mdEstructuraPasoId", "EQ", aListRmdItem.mdEstructuraPasoIdDepende));
                    aFilter.push(new Filter("rmdId_rmdId", "EQ", oDataSeleccionada.getData().rmdId));
                    aFilter.push(new Filter("fraccion", "EQ", fraccionActual));
                    let sExpand = "pasoIdFin,pasoId";
                    let aLapsoSelected = await registroService.onGetDataGeneralFiltersExpand(oThat.mainModelv2, "RMD_LAPSO", aFilter, sExpand);
                    let oLapso = aLapsoSelected.results[0];
                    let oParam = {
                        usuarioActualiza: oInfoUsuario.data.usuario,
                        fechaActualiza: new Date(),
                        fechaFin: new Date()
                    }
                    if (!oLapso.automatico) {
                        await registroService.onUpdateDataGeneral(oThat.mainModelv2, "RMD_LAPSO", oParam, oLapso.rmdLapsoId);
                    }
                    if (oLapso.automatico) {
                        oLapso.fechaFin = oParam.fechaFin;
                        let validate = await oThat.onPressNotifications(oLapso, true, fechaNotificacion);
                        if (validate !== false) {
                            await registroService.onUpdateDataGeneral(oThat.mainModelv2, "RMD_LAPSO", oParam, oLapso.rmdLapsoId);
                            if(aListRmdItem.clvModelo === "SETPOST") {
                                let oParamFechaFin = {
                                    fechaActualiza: new Date(),
                                    usuarioActualiza: oInfoUsuario.data.usuario,
                                    fechaFinRegistro: new Date()
                                }
                                await registroService.onUpdateDataGeneral(oThat.mainModelv2, "RMD", oParamFechaFin, oDataSeleccionada.getData().rmdId)
                            }
                        } else {
                            bDato = false;
                        }
                    }
                }
            }
            return bDato;
        },
        onGuardarMotivoCierre: function(oEvent){
            var modificacionFecha = oEvent.getSource().getBindingContext("modelGeneral").getObject();
            var oDialog = new sap.m.Dialog({
                title: "Motivo Modificaci??n",
                type: "Message",
                content: [
                    new sap.m.Label({
                        text: "Ingrese el motivo de modificaci??n",
                        labelFor: "submitDialogTextarea"
                    }),
                    new sap.m.TextArea("submitDialogTextarea", {
                        liveChange: function (oEvent) {
                            var parent = oEvent.getSource().getParent();
                            parent.getBeginButton().setEnabled(true);
                        },
                        width: "100%",
                        required: true
                    })
                ],
                beginButton: new sap.m.Button({
                    type: sap.m.ButtonType.Emphasized,
                    text: "Confirmar",
                    enabled: false,
                    press: async function () {
                        var sText = sap.ui.getCore().byId("submitDialogTextarea").getValue();
                        MessageBox.confirm("??Desea guardar la acci??n realizada?", {
                            onClose : async function(sButton) {
                                if (sButton === MessageBox.Action.OK) {
                                    BusyIndicator.show(0);
                                    let oChange = {
                                        fechaFin: modificacionFecha.fechaFin
                                    }
                                    registroService.onUpdateDataGeneral(oThat.mainModelv2, "RMD_LAPSO", oChange, modificacionFecha.rmdLapsoId).then(async function (oResult) {
                                        console.log(oResult);
                                        let oSetData = {
                                            rmdMotivoCierre:    util.onGetUUIDV4(),
                                            usuarioRegistro:    oInfoUsuario.data.usuario,
                                            fechaRegistro:      new Date(),
                                            activo:             true,
                                            fraccion:           modificacionFecha.fraccion,
                                            rmdId_rmdId:        modificacionFecha.rmdId_rmdId,
                                            rmdLapsoId_rmdLapsoId: modificacionFecha.rmdLapsoId,
                                            motivoEdit:         sText
                                        }
                                        registroService.onSaveDataGeneral(oThat.mainModelv2, "RMD_MOTIVO_EDIT_CIERRE_LAPSO", oSetData).then(async function (oResult) {
                                            console.log(oResult);
                                            oThat.getLapsosRMD();
                                            BusyIndicator.hide();
                                            oDialog.close();
                                        });
                                        
                                    });
                                }
                            }
                        });
                    }
                }),
                endButton: new sap.m.Button({
                    type: sap.m.ButtonType.Reject,
                    text: "Cancelar",
                    enabled: true,
                    press: function () {
                        sap.ui.getCore().byId("submitDialogTextarea").setValue("");
                        oDialog.close();
                    }
                }),
                afterClose: function () {
                    oDialog.destroy();
                }
            });
            
            oDialog.open();
        },

        onSaveLineaActualPaso: async function (oEvent) {
            var oInfoUsuario = oThat.modelGeneral.getProperty("/oInfoUsuario");
            const oRows = oEvent.getSource().getParent().getParent().getParent().mAggregations.items;
            const oParam = oEvent.getSource().getParent().getParent().oParam;
            const oControl = oEvent.getSource().getParent().getParent().getCells();
            let aUsuarios = [];
            let aFechas = [];
            var oFooter = oRows[oRows.length-1];
            const oLabelUserVer = oFooter.getCells()[0].getItems()[1];
            const oLabelFecha = oFooter.getCells()[2].getItems()[1];
            let lineaActualRMD = oThat.modelGeneral.getProperty("/LineaActualMD");
            let oChange = {
                estadoIdRmd_iMaestraId: iStateProcess,
                bFlagInitial: true
            }
            await registroService.onUpdateDataGeneral(oThat.mainModelv2, "RMD", oChange, lineaActualRMD.rmdId);  
            if(oControl[2].mAggregations.items.length > 1){
                var oDialog = new sap.m.Dialog({
                    title: "Motivo Modificaci??n",
                    type: "Message",
                    content: [
                        new sap.m.Label({
                            text: "Ingrese el motivo de modificaci??n",
                            labelFor: "submitDialogTextarea"
                        }),
                        new sap.m.TextArea("submitDialogTextarea", {
                            liveChange: function (oEvent) {
                                var parent = oEvent.getSource().getParent();
                                parent.getBeginButton().setEnabled(true);
                            },
                            width: "100%",
                            required: true
                        })
                    ],
                    beginButton: new sap.m.Button({
                        type: sap.m.ButtonType.Emphasized,
                        text: "Confirmar",
                        enabled: false,
                        press: async function () {
                            var sText = sap.ui.getCore().byId("submitDialogTextarea").getValue();
                            MessageBox.confirm("??Desea guardar la acci??n realizada?", {
                                onClose : async function(sButton) {
                                    if (sButton === MessageBox.Action.OK) {
                                        oRows.forEach(function(oRow){
                                            if (oRow.oParam) {
                                                if (oRow.oParam.usuarioActualiza){
                                                    aUsuarios.push(oRow.oParam.usuarioActualiza);
                                                }
                                                if (oRow.oParam.fechaActualiza) {
                                                    aFechas.push(oRow.oParam.fechaActualiza.getTime());
                                                }  
                                            }     
                                        });
                                        aUsuarios.push(oInfoUsuario.data.usuario);
                                        aFechas.push(new Date().getTime());
                                        if (aUsuarios.length > 0) {
                                            var oUsuarioActualizaFooter = aUsuarios.filter((value, index, self) => self.indexOf(value) === index);
                                            var usuarioActualizaFooter = oUsuarioActualizaFooter.join();
                                        }
                                        if (aFechas.length > 0) {
                                            var dateFormat = sap.ui.core.format.DateFormat.getDateInstance({pattern : "dd-MM-YYYY HH:MM" });
                                            var FechaFooter = formatter.formatDateFooter(new Date(Math.min(...aFechas)));
                                        }
                                        oLabelUserVer.setText(usuarioActualizaFooter);
                                        oLabelFecha.setText(FechaFooter);

                                        let bModificacion = true;
                                        await oThat.saveLineaActualPaso(oParam, oControl, sText, bModificacion);
                                        await oThat.onSaveLineaActualPasoDepende(oParam, oRows);
                                        sap.ui.getCore().byId("submitDialogTextarea").setValue("");
                                        oDialog.close();
                                    }
                                }
                            });
                        }
                    }),
                    endButton: new sap.m.Button({
                        type: sap.m.ButtonType.Reject,
                        text: "Cancelar",
                        enabled: true,
                        press: function () {
                            sap.ui.getCore().byId("submitDialogTextarea").setValue("");
                            oDialog.close();
                        }
                    }),
                    afterClose: function () {
                        oDialog.destroy();
                    }
                });
        
                oDialog.open();
            } else {
                MessageBox.confirm("??Desea guardar la acci??n realizada?", {
                    onClose : async function(sButton) {
                        if (sButton === MessageBox.Action.OK) {
                            oRows.forEach(function(oRow){
                                if (oRow.oParam) {
                                    if (oRow.oParam.usuarioActualiza){
                                        aUsuarios.push(oRow.oParam.usuarioActualiza);
                                    }
                                    if (oRow.oParam.fechaActualiza) {
                                        aFechas.push(oRow.oParam.fechaActualiza.getTime());
                                    }  
                                }     
                            });
                            aUsuarios.push(oInfoUsuario.data.usuario);
                            aFechas.push(new Date().getTime());
                            if (aUsuarios.length > 0) {
                                var oUsuarioActualizaFooter = aUsuarios.filter((value, index, self) => self.indexOf(value) === index);
                                var usuarioActualizaFooter = oUsuarioActualizaFooter.join();
                            }
                            if (aFechas.length > 0) {
                                var dateFormat = sap.ui.core.format.DateFormat.getDateInstance({pattern : "dd-MM-YYYY HH:MM" });
                                var FechaFooter = formatter.formatDateFooter(new Date(Math.min(...aFechas)));
                            }
                            oLabelUserVer.setText(usuarioActualizaFooter);
                            oLabelFecha.setText(FechaFooter);

                            await oThat.saveLineaActualPaso(oParam, oControl, '', false);
                            oThat.onSaveLineaActualPasoDepende(oParam, oRows);
                        }
                    }
                });
            } 
        },

        onSaveLineaActualCondicionesAmbiental: function (oEvent) {
            const oParam = oEvent.getSource().getParent().getParent().oParam;
            const oControl = oEvent.getSource().getParent().getParent().getCells();
            MessageBox.confirm("??Desea guardar la acci??n realizada?", {
                onClose : async function(sButton) {
                    if (sButton === MessageBox.Action.OK) {
                        let lineaActualRMD = oThat.modelGeneral.getProperty("/LineaActualMD");
                        let oChange = {
                            estadoIdRmd_iMaestraId: iStateProcess
                        }
                        await registroService.onUpdateDataGeneral(oThat.mainModelv2, "RMD", oChange, lineaActualRMD.rmdId);
                        await oThat.saveLineaActualPaso(oParam, oControl, '', false)
                    }
                }
            });
            
        },

        onSaveLineaActualEspecificacion: async function (oEvent) {
            var VBox = oEvent.getSource().getParent();
            var row = oEvent.getSource().getParent().getParent();
            var oItems = oEvent.getSource().getParent().getParent().getParent().getItems();
            var oFooter = oItems[oItems.length-1];
            const oParam = row.oParam;
            const sControl = oParam.sControl;
            
            const oControl2 = row.getCells()[2];
            const oControl3 = row.getCells()[3];
            const sValue = oControl2.getValue();
            const oButtonGuardar = oControl3.getItems()[0];
            const oLabelBtnGuardar = oControl3.getItems()[1];
            const oLabelUserVer = oFooter.getCells()[0].getItems()[1];
            const oLabelFecha = oFooter.getCells()[2].getItems()[1];

            MessageBox.confirm("??Desea guardar la acci??n realizada?", {
                onClose : async function(sButton) {
                    if (sButton === MessageBox.Action.OK) {
                        let lineaActualRMD = oThat.modelGeneral.getProperty("/LineaActualMD");
                        let oChange = {
                            estadoIdRmd_iMaestraId: iStateProcess
                        }
                        await registroService.onUpdateDataGeneral(oThat.mainModelv2, "RMD", oChange, lineaActualRMD.rmdId);
                        const sEspecificacionId = oParam.sEspecificacionId;
                        const sUsuario = oInfoUsuario.data.usuario;
                        BusyIndicator.show(0);
                        let oEsEspecificacion = {};
                        
                        oEsEspecificacion.rmdEstructuraEspecificacionId = sEspecificacionId;
                        oEsEspecificacion.usuarioActualiza = oInfoUsuario.data.usuario;
                        
                        oEsEspecificacion.fechaActualiza = new Date();
                        oEsEspecificacion.aplica = oParam.bAplica;
                        //obtener cell2
                        var bUsuarioSeleccion = false;
            
                        oEsEspecificacion.resultados = sValue;

                        oThat.saveLineaActualEspecificacionHistorial(oParam, String(sValue), "TEXTAREA");
                        
                        await registroService.updateEsEspecificacionRmd(oThat.mainModelv2, "/RMD_ES_ESPECIFICACION", oEsEspecificacion);
                        if (bUsuarioSeleccion){
                            if (oParam.aUsuarios.length > 0){
                                let aUsuarios = [];
                                oParam.aUsuarios.forEach(function(d, i){
                                    var oEsPasoUsuario = {};
                                    oEsPasoUsuario.rmdPasoUsuarioId = util.onGetUUIDV4();
                                    oEsPasoUsuario.terminal = null;
                                    oEsPasoUsuario.fechaRegistro = new Date();
                                    oEsPasoUsuario.activo = true;
                                    oEsPasoUsuario.usuarioRegistro = sUsuario;
                                    oEsPasoUsuario.rmdEstructuraPasoId_rmdEstructuraPasoId = oEsPaso.rmdEstructuraPasoId;
                                    oEsPasoUsuario.rmdUsuarioId_rmdUsuarioId = d.rmdUsuarioId;
                                    aUsuarios.push(oEsPasoUsuario);
                                });
                                
                                let oParamEsPasoUsuario = {rmdEstructuraPasoId: oEsPaso.rmdEstructuraPasoId, aUsuarios: aUsuarios};
                                await registroService.createEsPasoUsuarioRmdFunction(oThat.mainModelv2, oParamEsPasoUsuario) 
                            }
                        }
                        
                        var aListEspecificacion = await registroService.getDataExpand(oThat.mainModelv2, "/RMD_ES_ESPECIFICACION", "ensayoPadreId,tipoDatoId", []);
                        var oUsuarioActualizaFooter = [];
                        var usuarioActualizaFooter = "";
                        var oFechaFooter = [];
                        var FechaFooter = "";

                        aListEspecificacion.results.forEach(element => {
                            if(element.usuarioActualiza){
                                oUsuarioActualizaFooter.push(element.usuarioActualiza);
                            }
                            if(element.fechaActualiza){
                                oFechaFooter.push(element.fechaActualiza.getTime());
                            }
                        });

                        if(oUsuarioActualizaFooter.length > 0){
                            usuarioActualizaFooter = oUsuarioActualizaFooter.join();
                        }

                        if(oFechaFooter.length > 0){
                            var dateFormat = sap.ui.core.format.DateFormat.getDateInstance({pattern : "dd-MM-YYYY HH:MM" });
                            FechaFooter = formatter.formatDateFooter(new Date(Math.min(...oFechaFooter)));
                        }

                        oButtonGuardar.setEnabled(false);

                        oLabelBtnGuardar.setText(oEsEspecificacion.usuarioActualiza);

                        oLabelUserVer.setText(usuarioActualizaFooter);

                        oLabelFecha.setText(FechaFooter);


                        MessageBox.success(oThat.getView().getModel("i18n").getResourceBundle().getText("successUpdatePaso"));
                        BusyIndicator.hide();
                    }
                }
            });
        },
        saveLineaActualEspecificacionHistorial:function(oEsEspecificacion, sValor, sDesPaso){
            var oEsHistorico = {};
            var oEsEspecificacionHistorial = {};
            oEsEspecificacionHistorial.rmdHistorialEspecificacionId  = util.onGetUUIDV4();
            oEsEspecificacionHistorial.descripcion         = sDesPaso;
            oEsEspecificacionHistorial.terminal            = '';
            oEsEspecificacionHistorial.valor               = sValor;
            oEsEspecificacionHistorial.usuarioRegistro     = oInfoUsuario.data.usuario;
            oEsEspecificacionHistorial.fechaRegistro       = new Date();
            oEsEspecificacionHistorial.activo              = true;
            
            oEsHistorico = oEsEspecificacion;
            oEsEspecificacionHistorial.rmdEstructuraEspecificacionId_rmdEstructuraEspecificacionId = oEsHistorico.sEspecificacionId;
            oEsEspecificacionHistorial.rmdEstructuraId_rmdEstructuraId = oEsHistorico.rmdEstructuraId_rmdEstructuraId;

                registroService.createData(oThat.mainModelv2, "/RMD_ES_ESPECIFICACION_HISTORIAL", oEsEspecificacionHistorial).then(function () {
                    
                }.bind(oThat), function (error) {
                    console.log(error);
                    MessageBox.error(oThat.getView().getModel("i18n").getResourceBundle().getText("errorCreateLapso"));
                    BusyIndicator.hide();
                });
        },

        onUsuarioConfirmar: async function(oEvent){
            let oDataSeleccionada = oThat.getOwnerComponent().getModel("asociarDatos");
            let fraccionActual = oDataSeleccionada.getData().aEstructura.results[0].fraccion;
            let dataRmd = oDataSeleccionada.getData();
            let oDataPaso = oThat.modelGeneral.getProperty("/lineaSeleccionadaToUser");
            // let sEntity = oThat.modelGeneral.getProperty("/entitySeleccionadaToUser");
            let id;
            let sEntity;
            if(oDataPaso.rmdEstructuraPasoId){
                id = oDataPaso.rmdEstructuraPasoId;
                sEntity = "RMD_ES_PASO";
            } else {
                id = oDataPaso.rmdEstructuraPasoInsumoPasoId;
                sEntity = "RMD_ES_PASO_INSUMO_PASO";
            }
            let sControl = oDataPaso.tipoDatoId.contenido;
            let aListUserPrevio = [];
            if (oDataPaso.tipoDatoId_iMaestraId === sIdMultiplecheck) {
                if(oDataPaso.multiCheckUser) {
                    aListUserPrevio = oDataPaso.multiCheckUser.split(",");
                } 
            } else {
                if(oDataPaso.realizadoPorUser) {
                    aListUserPrevio = oDataPaso.realizadoPorUser.split(",");
                } 
            }
            if(oEvent.mParameters.selectedItems.length > 0){
                oEvent.mParameters.selectedItems.forEach(async function(oUser){
                    aListUserPrevio.push(oUser.getTitle());
                    var oUserData = oUser.getBindingContext("modelGeneral").getObject();
                    let aFilter = [];
                    aFilter.push(new Filter("usuarioId_usuarioId", "EQ", oUserData.usuarioId_usuarioId));
                    aFilter.push(new Filter("rmdId_rmdId", "EQ", oUserData.rmdId_rmdId));
                    aFilter.push(new Filter("fraccion", "EQ", fraccionActual));
                    let aLapsoSelected = await registroService.onGetDataGeneralFilters(oThat.mainModelv2, "RMD_VERIFICACION_FIRMAS", aFilter);
                        if(aLapsoSelected.results.length === 0){
                            var oDataFirmaVerif = {}
                            oDataFirmaVerif.usuarioVerif    = oUserData.usuarioId_usuarioId;
                            oDataFirmaVerif.rmdId           = oUserData.rmdId_rmdId;
                            oDataFirmaVerif.fraccionActual  = fraccionActual;
                            oDataFirmaVerif.rol             = oUserData.rol;

                            oThat.onRMD_VERIFICACION_FIRMAS_MULTIPLE(oDataFirmaVerif);
                        }

                });
                let oObj = {};
                if(oDataPaso.tipoDatoId_iMaestraId === sIdMultiplecheck){
                    oObj = {
                        fechaActualiza: new Date(),
                        multiCheckUser: aListUserPrevio.join()
                    }
                } else {
                    oObj = {
                        fechaActualiza: new Date(),
                        realizadoPorUser: aListUserPrevio.join()
                    }
                }
                if (!oDataPaso.firstFechaActualiza) {
                    oObj.firstFechaActualiza = new Date();
                }
                BusyIndicator.show(0);
                let aDataGeneralBack = oDataSeleccionada.getData();
                let aFilters= [];
                    aFilters.push(new Filter("rmdId", "EQ", aDataGeneralBack.rmdId));
                    let aRmdResponse = await registroService.onGetDataGeneralFilters(oThat.mainModelv2, "RMD", aFilters);
                if (!aRmdResponse.results[0].bFlagInitial) {
                    let oChange = {
                        estadoIdRmd_iMaestraId: iStateProcess,
                        bFlagInitial: true,
                        fechaInicioRegistro: new Date()
                    }
                    await registroService.onUpdateDataGeneral(oThat.mainModelv2, "RMD", oChange, aDataGeneralBack.rmdId);
                }
                await registroService.onUpdateDataGeneral(oThat.mainModelv2, sEntity, oObj, id);
                await oThat.saveLineaActualHistorial(oDataPaso, String(aListUserPrevio.join()), sControl, '');
                await sap.ui.controller("mif.rmd.registro.controller.MainView").getEstructurasRmdRefactory(fraccionActual);
                await oThat.onChangeEstructura();

                // oEvent.mParameters.selectedItems.forEach(async function(itemSelected){
                // let aFilter = [];
                // var oUserData = itemSelected.getBindingContext("modelGeneral").getObject();
                // aFilter.push(new Filter("usuarioId_usuarioId", "EQ", oUserData.usuarioId_usuarioId));
                // aFilter.push(new Filter("rmdId_rmdId", "EQ", oUserData.rmdId_rmdId));
                // aFilter.push(new Filter("fraccion", "EQ", fraccionActual));
                // let aLapsoSelected = await registroService.onGetDataGeneralFilters(oThat.mainModelv2, "RMD_VERIFICACION_FIRMAS", aFilter);
                //     if(aLapsoSelected.results.length === 0){
                //         var oDataFirmaVerif = {}
                //         oDataFirmaVerif.usuarioVerif    = oUserData.usuarioId_usuarioId;
                //         oDataFirmaVerif.rmdId           = oUserData.rmdId_rmdId;
                //         oDataFirmaVerif.fraccionActual  = fraccionActual;
                //         oDataFirmaVerif.rol             = oUserData.rol;

                //         oThat.onRMD_VERIFICACION_FIRMAS_MULTIPLE(oDataFirmaVerif);
                //     }
                // });
                
                BusyIndicator.hide();
            } else {
                MessageBox.warning("Debe seleccionar almenos un usuario.");
            }
        },

        abrirSeleccionUsuarios: async function(oEvent){
            let oModel = oEvent.getSource().getParent().getParent().getParent().getParent().mBindingInfos.items.model;
            let oEsPaso = oEvent.getSource().getParent().getBindingContext(oModel).getObject();
            // let entity;
            // if(oModel === "aListPasoAssignResponsive"){
            //     entity = "MD_ES_PASO";
            // } else {
            //     entity = "MD_ES_PASO_INSUMO_PASO";
            // }
            oThat.modelGeneral.setProperty("/lineaSeleccionadaToUser", oEsPaso);
            // oThat.modelGeneral.setProperty("/entitySeleccionadaToUser", entity);
            let aFilterUsuario = [];
            aFilterUsuario.push(new Filter("activo", "EQ", true));
            aFilterUsuario.push(new Filter("rmdId_rmdId", "EQ", oEsPaso.rmdId_rmdId));
            aFilterUsuario.push(new Filter("rol", "EQ", "AUXILIAR"));
            let aListUserPrevios = [];
            if(oEsPaso.realizadoPorUser) {
                aListUserPrevios = oEsPaso.realizadoPorUser.split(",");
            }
            if (oEsPaso.multiCheckUser) {
                aListUserPrevios = oEsPaso.multiCheckUser.split(",");
            }
            var aUsuarios = await registroService.getDataFilter(oThat.mainModelv2, "/RMD_USUARIO", aFilterUsuario);
            aListUserPrevios.forEach(function(oUsuario){
                aUsuarios.results = aUsuarios.results.filter(itm=>itm.codigo !== oUsuario);
            });
              
            oThat.modelGeneral.setProperty("/Usuarios", aUsuarios.results);
    
            if (!oThat.oUsuarios) {
                oThat.oUsuarios = sap.ui.xmlfragment(
                    "frgUsuarios",
                    rootPath + ".view.fragment.detail.Usuarios",
                    oThat
                );
                oThat.getView().addDependent(oThat.oUsuarios);
            }
            oThat.oUsuarios.open();
        },

        abrirSeleccionUsuariosFirma: async function(oEvent){
            oThat.lineaActual = oEvent.getSource().getParent().getParent();
            let aFilterUsuario = [];
            aFilterUsuario.push(new Filter("activo", "EQ", true));
            aFilterUsuario.push(new Filter("rmdId_rmdId", "EQ", oThat.lineaActual.oParam.rmdId_rmdId));
            aFilterUsuario.push(new Filter("rol", "EQ", "AUXILIAR"));
            var aUsuarios = await registroService.getDataFilter(oThat.mainModelv2, "/RMD_USUARIO", aFilterUsuario);
            oThat.modelGeneral.setProperty("/Usuarios", aUsuarios.results);
            
            if (!oThat.oUsuarios) {
                oThat.oUsuarios = sap.ui.xmlfragment(
                    "frgUsuarios",
                    rootPath + ".view.fragment.detail.Usuarios",
                    oThat
                );
                oThat.getView().addDependent(oThat.oUsuarios);
            }
            oThat.oUsuarios.open();
        },
        createCellDinamic: async function (control, oEsPaso) {
            var regitroLector = oThat.modelGeneral.getProperty("/oInfoUsuario/funcionUsuario/registroLector");
            var butonEnabledGeneral = false;
            if(regitroLector){
                butonEnabledGeneral = false;
            }else{
                butonEnabledGeneral = true;
            }
            var oControlValue = {};
            oControlValue.sControl = control;
            oControlValue.rmdEstructuraPasoId = oEsPaso.rmdEstructuraPasoId;

            var oCtrl = sap.ui.getCore().byId("c_" + oEsPaso.rmdEstructuraId_rmdEstructuraId + "_" + oEsPaso.rmdEstructuraPasoId);
            if (!oCtrl) {
                oCtrl = null;
            }   
            switch (control) {
                case "Texto":
                    const sTexto = oEsPaso.texto

                    oControlValue.sValue = sTexto;
                    oControlValue.oControl = oCtrl
                    if (!oControlValue.oControl){
                        oControlValue.oControl = new sap.m.Input({
                            type: "Text",
                            id: "c_" + oEsPaso.rmdEstructuraId_rmdEstructuraId + "_" + oEsPaso.rmdEstructuraPasoId,
                            value: sTexto
                        })
                    }
                    
                    oControlValue.oControl.setEnabled(oEsPaso.aplica);

                    if (oEsPaso.depende){
                        oControlValue.oControl.setEnabled(false);
                    }

                    if(regitroLector){
                        oControlValue.oControl.setEnabled(butonEnabledGeneral);
                    }

                    break;
                case "Cantidad":
                    const sCantidad = parseFloat(oEsPaso.cantidad).toFixed(2);
                    oControlValue.sValue = sCantidad;
                    var input = oCtrl
                    if (!input){
                        input = new sap.m.Input({
                            type: "Number",
                            value: sCantidad,
                            id: "c_" + oEsPaso.rmdEstructuraId_rmdEstructuraId + "_" + oEsPaso.rmdEstructuraPasoId
                        })
                    }
                    
                    input.addEventDelegate({
                        onfocusout: util.onFocusOut
                    });
                    oControlValue.oControl = input;
                    oControlValue.oControl.setEnabled(oEsPaso.aplica);
                    
                    if (oEsPaso.depende){
                        oControlValue.oControl.setEnabled(false);
                    }

                    if(regitroLector){
                        oControlValue.oControl.setEnabled(butonEnabledGeneral);
                    }

                    break;
                case "Numeros":
                    const sNumero = parseFloat(oEsPaso.cantidad).toFixed(2);
                    oControlValue.sValue = sNumero;
                    var input = oCtrl
                    if (!input){
                        input = new sap.m.Input({
                            type: "Number",
                            value: sNumero,
                            id: "c_" + oEsPaso.rmdEstructuraId_rmdEstructuraId + "_" + oEsPaso.rmdEstructuraPasoId
                        })
                    }
                    
                    input.addEventDelegate({
                        onfocusout: util.onFocusOut
                    });
                    oControlValue.oControl = input;
                    oControlValue.oControl.setEnabled(oEsPaso.aplica);
                    
                    if (oEsPaso.depende){
                        oControlValue.oControl.setEnabled(false);
                    }

                    if(regitroLector){
                        oControlValue.oControl.setEnabled(butonEnabledGeneral);
                    }

                    break;
                case "Fecha":
                    const dFecha = oEsPaso.fecha;
                    let sFechaFormato;
                    if (oEsPaso.fecha) {
                        sFechaFormato = (new Date(oEsPaso.fecha).getUTCDate()).toString() + "/" + (new Date(oEsPaso.fecha).getUTCMonth() + 1).toString() + "/" + (new Date(oEsPaso.fecha).getUTCFullYear()).toString();
                        oControlValue.sValue = sFechaFormato;
                    } else {
                        sFechaFormato = "";
                    }

                    oControlValue.oControl = new sap.m.Label({
                        text: sFechaFormato ? sFechaFormato : ""
                    })
                    break;
                case "FechaHora":
                    const dFechaHora = oEsPaso.fechaHora
                    oControlValue.sValue = dFechaHora;
                    /*oControlValue.oControl = new sap.m.DateTimePicker({
                        valueFormat: "dd-MM-yyyy-hh-mm-ss",
                        value: dFechaHora
                    })*/
                    oControlValue.oControl = new sap.m.Label({
                        text: dFechaHora ? dFechaHora.toLocaleString() : ""
                    })
                    break;
                case "Hora":
                    const sHora = oEsPaso.hora
                    let sHoraFormat;
                    if (oEsPaso.hora) {
                        sHoraFormat = new Date(oEsPaso.hora.ms).getUTCHours().toString() + ":" + new Date(oEsPaso.hora.ms).getUTCMinutes().toString() + ":" + new Date(oEsPaso.hora.ms).getUTCSeconds().toString();
                        oControlValue.sValue = sHoraFormat;
                    } else {
                        sHoraFormat = "";
                    }
                    oControlValue.oControl = new sap.m.Label({
                        text: sHoraFormat ? sHoraFormat : ""
                    })
                    break;

                case "RealizadoPor":
                    var oFilterDet = [];
                    oFilterDet.push(new Filter("rmdEstructuraPasoId_rmdEstructuraPasoId", FilterOperator.EQ, oEsPaso.rmdEstructuraPasoId));
                    let aListPasoUsuarioRP = registroService.getDataExpand(oThat.mainModelv2, "/RMD_ES_PASO_USUARIO", "rmdUsuarioId", oFilterDet);
                    var aPasoUsuarioCodigoRP = [];

                    const oButton = new sap.m.ToggleButton({
                        icon: "sap-icon://accidental-leave",
                        tooltip: oThat.i18n.getText("lblAssignUser"),
                        press: [oThat.abrirSeleccionUsuarios]
                    });
                    
                    
                    const oLabel = new sap.m.Text({
                        text: ""
                    })

                    aListPasoUsuarioRP.then(r => {
                        r.results.forEach(function(d, i){
                            aPasoUsuarioCodigoRP.push(d.rmdUsuarioId.codigo);
                            oLabel.setText(aPasoUsuarioCodigoRP.join("\n"));
                            if (aPasoUsuarioCodigoRP.length > 0) oButton.setPressed(true);
                        })
                    });
                    oLabel.addStyleClass("sapUiTinyMargin");
                    
                    oControlValue.sValue = aPasoUsuarioCodigoRP;
                    
                    oButton.setEnabled(oEsPaso.aplica);
                    
                    if (oEsPaso.depende){
                        oButton.setEnabled(false);
                    }

                    if(regitroLector){
                        oButton.setEnabled(butonEnabledGeneral);
                    }

                    oControlValue.oControl = oCtrl;
                    if (!oControlValue.oControl){
                        oControlValue.oControl = new sap.m.VBox({
                            items: [oButton],
                            id: "c_" + oEsPaso.rmdEstructuraId_rmdEstructuraId + "_" + oEsPaso.rmdEstructuraPasoId,
                        })
                    }
                   
                    if (aPasoUsuarioCodigoRP.length > 0) oControlValue.oControl.addItem(oLabel);
                    break;
                case "VistoBueno":
                    const bVistoBueno = oEsPaso.vistoBueno;
                    
                    oControlValue.sValue = bVistoBueno;
                    oControlValue.oControl = oCtrl;
                    if (!oControlValue.oControl){
                        oControlValue.oControl = new sap.m.CheckBox({
                            text: "",
                            select: [oThat.onLoginVB],
                            id: "c_" + oEsPaso.rmdEstructuraId_rmdEstructuraId + "_" + oEsPaso.rmdEstructuraPasoId,
                        })
                    }
                    
                    oControlValue.oControl.setSelected(bVistoBueno);
                    //oControlValue.oControl = chk;
                    oControlValue.oControl.setEnabled(oEsPaso.aplica);
                    
                    if (oEsPaso.depende){
                        oControlValue.oControl.setEnabled(false);
                    }

                    if(regitroLector){
                        oControlValue.oControl.setEnabled(butonEnabledGeneral);
                    }

                    break;
                case "RealizadoPorVistoBueno":
                    // var oFilterDet = [];
                    // oFilterDet.push(new Filter("rmdEstructuraPasoId_rmdEstructuraPasoId", FilterOperator.EQ, oEsPaso.rmdEstructuraPasoId));
                    // let aListPasoUsuarioRP = registroService.getDataExpand(oThat.mainModelv2, "/RMD_ES_PASO_USUARIO", "rmdUsuarioId", oFilterDet);
                    // var aPasoUsuarioCodigoRP = [];

                    // const oButton = new sap.m.ToggleButton({
                    //     icon: "sap-icon://accidental-leave",
                    //     tooltip: oThat.i18n.getText("lblAssignUser"),
                    //     press: [oThat.abrirSeleccionUsuarios]
                    // });
                    
                    
                    // const oLabel = new sap.m.Text({
                    //     text: ""
                    // })

                    // aListPasoUsuarioRP.then(r => {
                    //     r.results.forEach(function(d, i){
                    //         aPasoUsuarioCodigoRP.push(d.rmdUsuarioId.codigo);
                    //         oLabel.setText(aPasoUsuarioCodigoRP.join("\n"));
                    //         if (aPasoUsuarioCodigoRP.length > 0) oButton.setPressed(true);
                    //     })
                    // });
                    // oLabel.addStyleClass("sapUiTinyMargin");
                    
                    // oControlValue.sValue = aPasoUsuarioCodigoRP;
                    
                    // oButton.setEnabled(oEsPaso.aplica);
                    
                    // if (oEsPaso.depende){
                    //     oButton.setEnabled(false);
                    // }

                    // if(regitroLector){
                    //     oButton.setEnabled(butonEnabledGeneral);
                    // }

                    // oControlValue.oControl = oCtrl;
                    // if (!oControlValue.oControl){
                    //     oControlValue.oControl = new sap.m.VBox({
                    //         items: [oButton],
                    //         id: "c_" + oEsPaso.rmdEstructuraId_rmdEstructuraId + "_" + oEsPaso.rmdEstructuraPasoId,
                    //     })
                    // }
                   
                    // if (aPasoUsuarioCodigoRP.length > 0) oControlValue.oControl.addItem(oLabel);

                    break;
                case "VerificacionCheck":
                    // ;
                    const bVerificationCheck = oEsPaso.verifCheck;
                    
                    oControlValue.sValue = !!bVerificationCheck;

                    oControlValue.oControl = oCtrl;
                   let componentCheckbox = new sap.m.CheckBox({
                        selected: !!bVerificationCheck,
                        select:[oThat.oncheckSave]
                    })
                    //mcode
                    //validamos el id
                    if (!oControlValue.oControl){
                        oControlValue.oControl =  new sap.m.VBox({
                            // id: "cellSave_" + oEsPaso.rmdEstructuraId_rmdEstructuraId + "_" + oEsPaso.rmdEstructuraPasoId,
                            id: "c_" + oEsPaso.rmdEstructuraId_rmdEstructuraId + "_" + oEsPaso.rmdEstructuraPasoId,
                        items: [componentCheckbox],
                        justifyContent: sap.m.FlexJustifyContent.Center,
                        alignItems: sap.m.FlexAlignItems.Center
                    })
                        
                    }
                    
                    componentCheckbox.setEnabled(oEsPaso.aplica);
                    
                    if (oEsPaso.depende){
                        componentCheckbox.setEnabled(false);
                    }
                    
                    if(regitroLector){
                        componentCheckbox.setEnabled(butonEnabledGeneral);
                    }
                    let usuarioActualiza = oEsPaso.usuarioActualiza;
                    let modificado = "Modificado";
                    //  + Math.floor(Math.random()*10);
                 
                    let nameClass= "TextStyleNone";
                    let oLabelUsuarioActual = new sap.m.Title({
                        text: usuarioActualiza
                    })
                    let oLabelModificado = new sap.m.Title({
                        text: modificado
                    })
                    
                    // if(oEsPaso.usuarioActualiza){
                    //     oControlValue.oControl.removeItem(1);
                     
                    //     oLabelUsuarioActual.addStyleClass(nameClass);

                    //     oControlValue.oControl.addItem(oLabelUsuarioActual)
        
                    // }

                 
    
                    // if (oEsPaso.flagEditado){
                    //     oControlValue.oControl.removeItem(2);
                    //     oControlValue.oControl.addItem(oLabelModificado);
                    // }
    
                    if(regitroLector){
                        componentCheckbox.setEnabled(butonEnabledGeneral);
                    }


                    break;
                case "MultipleCheck":
                    var oFilterDet = [];
                    oFilterDet.push(new Filter("rmdEstructuraPasoId_rmdEstructuraPasoId", FilterOperator.EQ, oEsPaso.rmdEstructuraPasoId));
                    let aListPasoUsuario = registroService.getDataExpand(oThat.mainModelv2, "/RMD_ES_PASO_USUARIO", "rmdUsuarioId", oFilterDet);
                    var aPasoUsuarioCodigo = [];
                    
                    let oButtonMultipleCheck = oCtrl;
                    if (!oButtonMultipleCheck){
                        // Comentado temporal
                        oButtonMultipleCheck = new sap.m.ToggleButton({
                            icon: "sap-icon://accidental-leave",
                            tooltip: oThat.i18n.getText("lblAssignUser"),
                            id: "c_" + oEsPaso.rmdEstructuraId_rmdEstructuraId + "_" + oEsPaso.rmdEstructuraPasoId,
                            press: [oThat.abrirSeleccionUsuarios]
                        });
                    }
                    oControlValue.oControl = oButtonMultipleCheck
                    
                    const oLabelMultipleCheck = new sap.m.Text({
                        text: ""
                    })
                    oLabelMultipleCheck.addStyleClass("sapUiTinyMargin");
                    aListPasoUsuario.then(r => {
                        r.results.forEach(function(d, i){
                            aPasoUsuarioCodigo.push(d.rmdUsuarioId.codigo);
                            oLabelMultipleCheck.setText(aPasoUsuarioCodigo.join("\n"));
                            if (aPasoUsuarioCodigo.length > 0) oButtonMultipleCheck.setPressed(true);
                        })
                    });
                    oControlValue.sValue = aPasoUsuarioCodigo;
                    oControlValue.oControl = new sap.m.HBox({
                        items: [oButtonMultipleCheck, oLabelMultipleCheck]
                    })
                    // oButtonMultipleCheck.setEnabled(oEsPaso.aplica);
                    
                    if (oEsPaso.depende){
                        oControlValue.oControl.setEnabled(false);
                    }
                    break;
                case "Rango":
                    var sRango = (oEsPaso.rango ? oEsPaso.rango : 0);
                    sRango = parseFloat(sRango).toFixed(oEsPaso.decimales);

                    var oInputRango = oCtrl;
                    if (!oInputRango){
                        oInputRango = new sap.m.Input({
                            type: "Number",
                            id: "c_" + oEsPaso.rmdEstructuraId_rmdEstructuraId + "_" + oEsPaso.rmdEstructuraPasoId,
                            value: sRango
                        })
                    }
                     
                    oInputRango.addEventDelegate({
                        onfocusout: util.onFocusOutRango
                    });
                    
                    oControlValue.sValue = sRango;
                    oControlValue.oControl = oInputRango
                    oControlValue.oControl.setEnabled(oEsPaso.aplica);
                    
                    if (oEsPaso.depende){
                        oControlValue.oControl.setEnabled(false);
                    }

                    if(regitroLector){
                        oControlValue.oControl.setEnabled(butonEnabledGeneral);
                    }

                    break;
                case "DatoFijo":
                    const sDatoFijo = oEsPaso.datoFijo;
                    //Comentado Temporal
                    oControlValue.sValue = sDatoFijo;
                    oControlValue.oControl = new sap.m.Text({
                        text: sDatoFijo,
                    })
                    // oControlValue.oControl.setEnabled(oEsPaso.aplica);
                    
                    if (oEsPaso.depende){
                        // oControlValue.oControl.setEnabled(false);
                    }
                    break;
                case "Sin tipo de dato":
                    const sSinTipoDato = '';
                    //Comentado Temporal
                    oControlValue.sValue = sSinTipoDato;
                    oControlValue.oControl = new sap.m.Text({
                        text: sSinTipoDato,
                    })
                    break;
                case "Formula":
                    var sExpand = "rmdPasoFormulaId";
                    var aFilter = [];
                    aFilter.push(new Filter("rmdPasoUsuarioId_rmdEstructuraPasoId", "EQ", oEsPaso.rmdEstructuraPasoId));
                    var obtenerFormula = await registroService.onGetDataGeneralFiltersExpand(oThat.mainModelv2, "MD_ES_FORMULA_PASO", aFilter, sExpand);

                    obtenerFormula.results.sort(function (a, b) {
                        return a.orden - b.orden;
                    });
                    var formulaResult = "";
                    obtenerFormula.results.forEach(function(e){
                        if(e.esPaso){
                            formulaResult = formulaResult + e.rmdPasoFormulaId.cantidad;
                        } else {
                            formulaResult = formulaResult + e.valor;
                        }
                    });

                    const sFormula = eval(formulaResult);
                    oControlValue.sValue = sFormula;
                    oControlValue.oControl = new sap.m.Text({
                        text: sFormula,
                    })
                    // oControlValue.oControl.setEnabled(false);
                    break;
                default:
                    break;
            }

            return oControlValue;
        },
        createMenu: function (Paso, formato, imagen) {
            let oInfoUsuario = oThat.modelGeneral.getProperty("/oInfoUsuario");
            var regitroLector = oThat.modelGeneral.getProperty("/oInfoUsuario/funcionUsuario/registroLector");
            var butonEnabledGeneral = false;
            if(regitroLector){
                butonEnabledGeneral = false;
            }else{
                butonEnabledGeneral = true;
            }
            var aMenu = []
                var oMenuitem1 = new sap.m.MenuItem({
                                                    text: oThat.i18n.getText("mnObservationXStep"),
                                                    icon: "sap-icon://show",
                                                    title: "ss",
                                                    press: [oThat.onAddObservationLineal]
                                                });

                var oMenuitem2 = new sap.m.MenuItem({
                                                    text: oThat.i18n.getText("mnHistoryXStep"),
                                                    icon: "sap-icon://activity-items",
                                                    press: [oThat.onGetHistoryStep]
                                                });
                                                
                var oMenuitem3 = new sap.m.MenuItem({
                                                    text: Paso.aplica ? oThat.i18n.getText("mnNoApplyStep") : oThat.i18n.getText("mnApplyStep"),
                                                    icon: "sap-icon://less",
                                                    press: [oThat.onNoAplica],
                                                    visible: oInfoUsuario.rol[codigoUserPrueba].codigo == "rmd_jefe_prod" ? true : false
                                                });
                                                
                aMenu.push(oMenuitem1);
                aMenu.push(oMenuitem2);
                aMenu.push(oMenuitem3);

                var oMenu = new sap.m.Menu({ 
                    items: aMenu
                });
                
                return new sap.m.MenuButton({
                                                enabled:butonEnabledGeneral,
                                                icon: "sap-icon://text-align-justified",
                                                tooltip: oThat.i18n.getText("lblOption"),
                                                menu: oMenu
                                            });
        },
        createMenuEquipo: function (PasoId, aplica) {
            let oInfoUsuario = oThat.modelGeneral.getProperty("/oInfoUsuario");
                var regitroLector = oThat.modelGeneral.getProperty("/oInfoUsuario/funcionUsuario/registroLector");
                var butonEnabledGeneral = false;
                if(regitroLector){
                    butonEnabledGeneral = false;
                }else{
                    butonEnabledGeneral = true;
                }

                var aMenu = []
                    var oMenuitem1 = new sap.m.MenuItem({
                                                        text: oThat.i18n.getText("mnObservationXStep"),
                                                        icon: "sap-icon://show",
                                                        title: "ss",
                                                        press: [oThat.onAddObservationLineal]
                                                    });

                    var oMenuitem2 = new sap.m.MenuItem({
                                                        text: oThat.i18n.getText("mnHistoryXStep"),
                                                        icon: "sap-icon://activity-items",
                                                        press: [oThat.onGetHistoryStepEquipo]
                                                    });
                    
                    var i18nAplica = oThat.i18n.getText("mnNoApplyStep");
                    var iconAplica =  "sap-icon://less";
                    if(!aplica){
                        i18nAplica = oThat.i18n.getText("mnApplyActivateStep");
                        iconAplica =  "sap-icon://add";
                    }
                                                    
                    var oMenuitem3 = new sap.m.MenuItem({
                                                        text: i18nAplica,
                                                        icon: iconAplica,
                                                        press: [oThat.onNoAplicaEquipo],
                                                        visible: oInfoUsuario.rol[codigoUserPrueba].codigo == "rmd_jefe_prod" ? true : false
                                                    });
                                                    
                    aMenu.push(oMenuitem1);
                    aMenu.push(oMenuitem2);
                    aMenu.push(oMenuitem3);

                    var oMenu = new sap.m.Menu({ 
                        items: aMenu
                    });
                    
                    return new sap.m.MenuButton({
                                                    enabled:butonEnabledGeneral,
                                                    icon: "sap-icon://text-align-justified",
                                                    tooltip: oThat.i18n.getText("lblOption"),
                                                    menu: oMenu
                                                });
        },
      
        onNavPress: function () {
            // const lstItems = this.getView().byId("idEstructuraWizard");
            // lstItems.destroy();
            clearInterval(sInterval);
            if(oThat.modelGeneral) {
                oThat.modelGeneral.setProperty("/selectFraccionRmdId","");
                this.vcount = 0;
            }
            oThat.getOwnerComponent().getRouter().navTo("RouteMainView");
        },
        onLoadStep: function (oEvent) {
            var indice =  oEvent.getSource()._iCurrentStep - 1
            var estructura = oThat.modelEstructura.getProperty("/estructuras/" + indice);
            var aListFragments = oThat.modelGeneral.getProperty("/fragments");
            var aFindFrag = aListFragments.find(item => item.tipo === estructura.tipo);
            
            sCurrentStep = aFindFrag.fragment;
        },
        onStepActivate: function (oEvent) {
            var indice = oEvent.getParameter('index');
            var estructuras = oThat.modelEstructura.getProperty("/estructuras/" + (indice-1));
            
            var aListFragments = oThat.modelGeneral.getProperty("/fragments");
            var aFindFrag = aListFragments.find(item => item.tipo === estructuras.tipo);
            
            sCurrentStep = aFindFrag.fragment;
            
            if(estructuras.control === "mif.rmd.registro.view.fragment.detail.Cuadros"){
            var data = oThat.modelGeneral.getProperty("/tblCuadros" + (indice-1));
            oThat.modelGeneral.setProperty("/tblCuadros", data); 
            }else if(estructuras.control === "mif.rmd.registro.view.fragment.detail.Equipos"){
                var data = oThat.modelGeneral.getProperty("/tblEquipos" + (indice-1));
            oThat.modelGeneral.setProperty("/tblEquipos", data); 
            }

            oThat.modelGeneral.refresh(true);
        },

        onAddFraction: function () {
            MessageBox.confirm(
                oThat.getView().getModel("i18n").getResourceBundle().getText("confirmAddFraction"), {
                styleClass: "sapUiSizeCompact",
                actions: [MessageBox.Action.YES, MessageBox.Action.NO],
                onClose: async function (oAction) {
                if (oAction === "YES") {
                    Promise.all([oThatConf.onAsignToEstructuraNewFraction()]).then(values => {
                        MessageBox.success(oThat.getView().getModel("i18n").getResourceBundle().getText("successAddFraction"));
                        sap.ui.core.BusyIndicator.hide();
                    }).catch(function (oError) {
                        sap.ui.core.BusyIndicator.hide();
                        oThatConf.onErrorMessage(oError, "errorSave");
                    })
                    
                    let oDataSeleccionada = oThat.getOwnerComponent().getModel("asociarDatos");
                    let fraccionActual = oDataSeleccionada.getData().aEstructura.results[0].fraccion;
                    let dataRmd = oDataSeleccionada.getData();

                    let aFilter = [];
                    aFilter.push(new Filter("usuarioId_usuarioId", "EQ", oInfoUsuario.data.usuarioId));
                    aFilter.push(new Filter("rmdId_rmdId", "EQ", dataRmd.rmdId));
                    aFilter.push(new Filter("fraccion", "EQ", fraccionActual));
                    let aLapsoSelected = await registroService.onGetDataGeneralFilters(oThat.mainModelv2, "RMD_VERIFICACION_FIRMAS", aFilter);
                    if(aLapsoSelected.results.length === 0){
                        var oDataFirmaVerif = {}
                        oDataFirmaVerif.rmdId           = dataRmd.rmdId;
                        oDataFirmaVerif.fraccionActual  = fraccionActual;

                        oThat.onRMD_VERIFICACION_FIRMAS(oDataFirmaVerif);
                    }

                }
            }
            }
            );
        },

        onAddObservationGeneral: function () {
            oThat.modelGeneral.setProperty("/sDesPaso", "");
            if (!this.onAddObservation) {
            this.onAddObservation = sap.ui.xmlfragment(
                "frgAddObservation",
                rootPath + ".view.dialog.AddObservation",
                this
            );
            this.getView().addDependent(this.onAddObservation);
            }
            oThat.modelGeneral.setProperty("/observacionesPaso", []);
            this.onAddObservation.open();
        },

        onCancelObservation: function () {
            this.getObservacionesRMD();
            this.onAddObservation.close();
            oThat.modelGeneral.setProperty("/ObservacionRMD", ""); 
        },

        onConfirmObservation: function () {
            let oDataSeleccionada = oThat.getOwnerComponent().getModel("asociarDatos");
            let fraccionActual = oDataSeleccionada.getData().aEstructura.results[0].fraccion;
            let dataRmd = oDataSeleccionada.getData();
            var LineaActual = oThat.modelGeneral.getProperty("/LineaActualMD"); 
            var ObservacionRMD = oThat.modelGeneral.getProperty("/ObservacionRMD"); 
            var sDesPaso = oThat.modelGeneral.getProperty("/sDesPaso"); 
            var sPasoIdObs = oThat.modelGeneral.getProperty("/sPasoIdObs");
            var sEquipoIdObs = oThat.modelGeneral.getProperty("/sEquipoIdObs");
            var sUtensilioIdObs = oThat.modelGeneral.getProperty("/sUtensilioIdObs");
            
            var sobject = {
                usuarioRegistro: oInfoUsuario.data.usuario,
                fechaRegistro: new Date(),
                activo: true,
                rmdObservacionId: util.onGetUUIDV4(),
                rmdId_rmdId: LineaActual.rmdId,
                nombre: oInfoUsuario.data.nombre,
                apellido: oInfoUsuario.data.apellidoPaterno,
                observacion: sDesPaso + " - " + ObservacionRMD,
                fraccion: fraccionActual
            }
            
            if (sPasoIdObs != ""){
                sobject.rmdEstructuraPasoId_rmdEstructuraPasoId = sPasoIdObs;
            } else {
                sobject.rmdEstructuraPasoId_rmdEstructuraPasoId = null;
            }
            if (sEquipoIdObs != ""){
                sobject.rmdEstructuraEquipoId_rmdEstructuraEquipoId = sEquipoIdObs;
            } else {
                sobject.rmdEstructuraEquipoId_rmdEstructuraEquipoId = null;
            }
            if (sUtensilioIdObs != ""){
                sobject.rmdEstructuraUtensilioId_rmdEstructuraUtensilioId = sUtensilioIdObs;
            } else {
                sobject.rmdEstructuraUtensilioId_rmdEstructuraUtensilioId = null;
            }

            BusyIndicator.show(0);
            registroService.createData(oThat.mainModelv2, "/RMD_OBSERVACION", sobject).then( async function () {

                let aFilter = [];
                aFilter.push(new Filter("usuarioId_usuarioId", "EQ", oInfoUsuario.data.usuarioId));
                aFilter.push(new Filter("rmdId_rmdId", "EQ", dataRmd.rmdId));
                aFilter.push(new Filter("fraccion", "EQ", fraccionActual));
                let aLapsoSelected = await registroService.onGetDataGeneralFilters(oThat.mainModelv2, "RMD_VERIFICACION_FIRMAS", aFilter);
                if(aLapsoSelected.results.length === 0){
                    var oDataFirmaVerif = {}
                    oDataFirmaVerif.rmdId           = dataRmd.rmdId;
                    oDataFirmaVerif.fraccionActual  = fraccionActual;

                    oThat.onRMD_VERIFICACION_FIRMAS(oDataFirmaVerif);
                }
                oThat.onCancelObservation();
                // oThat.getObservacionesRMD();
                MessageBox.success(oThat.getView().getModel("i18n").getResourceBundle().getText("successCreateObservation"));
                BusyIndicator.hide();
            }.bind(oThat), function (error) {
                MessageBox.error(oThat.getView().getModel("i18n").getResourceBundle().getText("errorObservationRMD"));
                BusyIndicator.hide();
            });
        },

        getObservacionesRMD: async function () {
            let oDataSeleccionada = oThat.getOwnerComponent().getModel("asociarDatos");
            let fraccionActual = oDataSeleccionada.getData().aEstructura.results[0].fraccion;
            var oInfoUsuario = oThat.modelGeneral.getProperty("/oInfoUsuario");
            var LineaActual = oThat.modelGeneral.getProperty("/LineaActualMD"); 
            var oFilter = [];

            BusyIndicator.show(0);
            oFilter.push(new Filter("rmdId_rmdId", FilterOperator.EQ, LineaActual.rmdId));
            oFilter.push(new Filter("fraccion", FilterOperator.EQ, fraccionActual));
            var aListObservacionesRMD = await registroService.getDataFilter(oThat.mainModelv2, "/RMD_OBSERVACION", oFilter);
            var v_dia, v_mes, v_anio, dateEx, v_hora, v_minutos;
            aListObservacionesRMD.results.forEach(element => {
                var oMatchRol = oInfoUsuario.rol.filter(itm=>itm.nombre === "JEFE DE PRODUCCION")
                if(oMatchRol.length > 0){
                    element.flagBV = true;
                } else {
                    element.flagBV = false;
                }
                
                if (element.fechaRegistro !== null) {
                    dateEx = new Date(element.fechaRegistro);
                    element.fechaRegistro = new Date(dateEx.getFullYear(), dateEx.getMonth(), dateEx.getDate(), dateEx.getHours(),
                    dateEx.getUTCMinutes(), dateEx.getUTCSeconds());

                    v_dia = element.fechaRegistro.getDate();
                    if(v_dia <= 9){
                        v_dia = '0' + v_dia;
                    }
                    v_mes = element.fechaRegistro.getMonth() + 1;
                    if(v_mes <= 9){
                        v_mes = '0' + v_mes;	
                    }
                    v_anio = element.fechaRegistro.getFullYear();

                    v_hora = element.fechaRegistro.getHours()
                    v_minutos = element.fechaRegistro.getMinutes()

                    element.fechaRegistro = v_dia + "-" + v_mes + "-" + v_anio + " " + v_hora + ":" + v_minutos;
                }
            });

            oThat.modelGeneral.setProperty("/observacionesRMD", aListObservacionesRMD.results);
            BusyIndicator.hide();
        },

        onListObservationGeneral: function () {
            this.getObservacionesRMD();

            if (!this.onListObservation) {
            this.onListObservation = sap.ui.xmlfragment(
                "frgListObservation",
                rootPath + ".view.dialog.ListObservation",
                this
            );
            this.getView().addDependent(this.onListObservation);
            }

            this.onListObservation.open();
        },

        onAddObservationLineal: async function (oEvent) {
            let oDataSeleccionada = oThat.getOwnerComponent().getModel("asociarDatos");
            let fraccionActual = oDataSeleccionada.getData().aEstructura.results[0].fraccion;
            oThat.modelGeneral.setProperty("/esPaso", false);
            var oTbl = oEvent.getSource().getParent().getParent().getParent();
            var oParam = oTbl.oParam;
            var sPasoDescription = oTbl.mAggregations.cells[0].getProperty("text");

            if(oParam.sTipo == "EQUIPO" || oParam.sTipo == "UTENSILIO"){
                oThat.modelGeneral.setProperty("/sPasoIdObs", "");
                oThat.modelGeneral.setProperty("/sDesPaso", sPasoDescription);
                var oFilter = [];
                if (oParam.sTipo == "EQUIPO") {
                    oFilter.push(new Filter("rmdEstructuraEquipoId_rmdEstructuraEquipoId", FilterOperator.EQ, oParam.sPasoId));
                    oThat.modelGeneral.setProperty("/sEquipoIdObs", oParam.sPasoId);
                } else {
                    oFilter.push(new Filter("rmdEstructuraUtensilioId_rmdEstructuraUtensilioId", FilterOperator.EQ, oParam.sPasoId));
                    That.modelGeneral.setProperty("/sUtensilioIdObs", oParam.sPasoId);
                }
                oFilter.push(new Filter("fraccion", FilterOperator.EQ, fraccionActual));
                
                var aListObservacionesPaso = await registroService.getDataFilter(oThat.mainModelv2, "/RMD_OBSERVACION", oFilter);
                oThat.modelGeneral.setProperty("/observacionesPaso", aListObservacionesPaso.results);
                if (!oThat.onAddObservation) {
                oThat.onAddObservation = sap.ui.xmlfragment(
                    "frgAddObservation",
                    rootPath + ".view.dialog.AddObservation",
                    oThat
                );
                oThat.getView().addDependent(oThat.onAddObservation);
                }

                oThat.onAddObservation.open();
            }else{
                oThat.modelGeneral.setProperty("/sPasoIdObs", oParam.sPasoId);
                oThat.modelGeneral.setProperty("/sDesPaso", sPasoDescription);
                var oFilter = [];
                oFilter.push(new Filter("rmdEstructuraPasoId_rmdEstructuraPasoId", FilterOperator.EQ, oParam.sPasoId));
                oFilter.push(new Filter("fraccion", FilterOperator.EQ, fraccionActual));
                var aListObservacionesPaso = await registroService.getDataFilter(oThat.mainModelv2, "/RMD_OBSERVACION", oFilter);
                oThat.modelGeneral.setProperty("/observacionesPaso", aListObservacionesPaso.results);

                if (!oThat.onAddObservation) {
                    oThat.onAddObservation = sap.ui.xmlfragment(
                        "frgAddObservation",
                        rootPath + ".view.dialog.AddObservation",
                        oThat
                    );
                    oThat.getView().addDependent(oThat.onAddObservation);
                }

                oThat.onAddObservation.open();
            }
        },
        onCancelObservationList: function () {
            this.onListObservation.close();
        },
        onLoginVB: function(oEvent){
            var oInfoUsuario = oThat.modelGeneral.getProperty("/oInfoUsuario");

            if (!oInfoUsuario.funcionUsuario.registroP && !oInfoUsuario.funcionUsuario.registroVB){ 
                MessageBox.warning(
                    oThat.getView().getModel("i18n").getResourceBundle().getText("actionNotAllowed"))
                return;
            }

            oThat.onLogin = sap.ui.xmlfragment(
                "frgLogin",
                rootPath + ".view.dialog.Login",
                oThat
            );
            oThat.getView().addDependent(oThat.onLogin);
            
            oThat.onLogin.open();
        },
        onConfirmLoginVB: function(){
            var UsuarioLoginVB = oThat.modelGeneral.getProperty("/UsuarioLoginVB"); 
            var oFilterDet = [];
            oFilterDet.push(new Filter("usuario", FilterOperator.EQ, UsuarioLoginVB));
            let aListUsuarioVB = registroService.getDataExpand(oThat.mainModelv2, "/MIF_ADMIN_HDI_USUARIO", "", oFilterDet);
            aListUsuarioVB.then(r => {
                r.results.forEach(function(d, i){
                    oThat.modelGeneral.setProperty("/UsuarioLoginVB", d.rmdUsuarioId); 
                })
            });
            oThat.onLogin.close();
        },
        onCancelLoginVB: function () {
            this.onLogin.close();
        },

        getTipoMotivosLapso: async function () {
            BusyIndicator.show(0);
            let sExpandTipoMaestro = "oMaestraTipo";
            var LineaActual = oThat.modelGeneral.getProperty("/LineaActualMD"); 
            var oFilter = [];
            oFilter.push(new Filter("oMaestraTipo_maestraTipoId", FilterOperator.EQ, "46"));
            var aListTipo = await registroService.getDataExpand(oThat.mainModelv2, "/MAESTRA", sExpandTipoMaestro, oFilter);
            
            oThat.modelGeneral.setProperty("/tiposMotivosLapso", aListTipo.results);
        },

        getMotivosLapso: async function () {
            BusyIndicator.show(0);
            let sExpandTipoMaestro = "oMaestraTipo";
            let aFilter= [];
            aFilter.push(new Filter("activo", "EQ", true));
            var aListMotivos = await registroService.getDataFilter(oThat.mainModelv2, "/MOTIVO_LAPSO", aFilter);
            var aListTipo = await registroService.getDataExpand(oThat.mainModelv2, "/MAESTRA", sExpandTipoMaestro, aFilter);
            //funcion para tipo resta
            var aListMotivosResta=[];
            
            oThat.modelGeneral.setProperty("/ComentarioLapso", "");
            
            aListMotivos.results.forEach(function(val1,index){
                aListTipo.results.forEach(function(val2){
                    if(val2.iMaestraId == val1.tipoId_iMaestraId){
                        if(val2.contenido == "R" ){
                            aListMotivosResta.push(val1);
                        }
                    }
                });
            });
            
            oThat.modelGeneral.setProperty("/motivosLapso", aListMotivosResta);
            // oThat.modelGeneral.setProperty("/motivosLapso", aListMotivos.results);
            BusyIndicator.hide();
        },

        onAddLapsoGeneral: function () {
            this.getTipoMotivosLapso();
            this.getMotivosLapso();

            let aModelEquiposAfectados = new JSONModel([]);
                
            oThat.getView().setModel(aModelEquiposAfectados, "aModelEquiposAfectados");
                
            if (!this.onAddLapso) {
                
                var selectMotivo = {
                    "codigo": "0",
                    "descripcion": ""
                };

                var selectTipoMotivo = {
                    "codigo": "0",
                    "contenido": ""
                };
                
                oThat.modelGeneral.setProperty("/selectMotivo", selectMotivo);
                oThat.modelGeneral.setProperty("/selectTipoMotivo", selectTipoMotivo);
                this.onAddLapso = sap.ui.xmlfragment(
                    "frgAddLapso",
                    rootPath + ".view.dialog.AddLapso",
                    this
                    );
                this.getView().addDependent(this.onAddLapso);
            }
            
            this.onAddLapso.open();
        },

        onSelectMotivosLapso: async function(oEvent){
            var oSource = oEvent.getSource();
            var selectItem = oSource.getSelectedItem();
            var value = oSource.getValue();
            if (value) {
                if (!selectItem) {
                    MessageBox.error(oThat.getView().getModel("i18n").getResourceBundle().getText("errorSelectMotivoLapso"));
                    oSource.setValue("");
                    oThat.modelGeneral.setProperty("/selectMotivo/codigo","");
                    oThat.modelGeneral.setProperty("/selectMotivo/descripcion","");
                    oThat.modelGeneral.refresh(true);
                    return;
                }
                
                if (selectItem.getKey() == "") {
                    oThat.modelGeneral.setProperty("/selectMotivo/codigo","");
                    oThat.modelGeneral.setProperty("/selectMotivo/descripcion","");
                } else {
                    oThat.modelGeneral.setProperty("/selectMotivo/codigo",selectItem.getKey());
                    oThat.modelGeneral.setProperty("/selectMotivo/descripcion",selectItem.getText());
                    let aFilter = [];
                    aFilter.push(new Filter("motivoLapsoId", 'EQ', selectItem.getKey()))
                    let verificarMotivoLapsoResponse = await registroService.getDataFilter(oThat.mainModelv2, "/MOTIVO_LAPSO", aFilter);
                    if (verificarMotivoLapsoResponse.results[0].indicador) {
                        oThat.modelGeneral.setProperty("/bNoAvisoMant", true);
                        oThat.modelGeneral.setProperty("/bAvisoMant", true);
                        await oThat.onEquipoDialog();
                    } else {
                        oThat.modelGeneral.setProperty("/bNoAvisoMant", true);
                        oThat.modelGeneral.setProperty("/bAvisoMant", false);
                    }
                }
                oThat.modelGeneral.setProperty("/equipoSelected", {});
                oThat.modelGeneral.setProperty("/aObjetosEquipo", []);
                oThat.modelGeneral.setProperty("/aSintomasEquipo", []);
                oThat.modelGeneral.setProperty("/aCausasEquipo", []);
                oThat.modelGeneral.setProperty("/oObjObjetoEquipo", {});
                oThat.modelGeneral.setProperty("/oObjSintomaEquipo", {});
                oThat.modelGeneral.setProperty("/oObjCausaEquipo", {});
                await oThat.onCheckMotivos();
            } else {
                oThat.modelGeneral.setProperty("/bNoAvisoMant", false);
                oThat.modelGeneral.setProperty("/bAvisoMant", false);
                oThat.modelGeneral.setProperty("/equipoSelected", {});
                oThat.modelGeneral.setProperty("/aObjetosEquipo", []);
                oThat.modelGeneral.setProperty("/aSintomasEquipo", []);
                oThat.modelGeneral.setProperty("/aCausasEquipo", []);
                oThat.modelGeneral.setProperty("/oObjObjetoEquipo", {});
                oThat.modelGeneral.setProperty("/oObjSintomaEquipo", {});
                oThat.modelGeneral.setProperty("/oObjCausaEquipo", {});
            }
        },

        onCheckMotivos: function () {
            let aEquipoSeleccionado = oThat.modelGeneral.getProperty("/equipoSelected");
            let ComentarioLapso = sap.ui.core.Fragment.byId("frgAddLapso", "tAreaMotivo");
            let cMotivo = sap.ui.core.Fragment.byId("frgAddLapso", "comboMotivo");
            let objObjetosEquipo = oThat.modelGeneral.getProperty("/aObjetosEquipo");
            let objSintomasEquipo = oThat.modelGeneral.getProperty("/aSintomasEquipo");
            let objCausasEquipo = oThat.modelGeneral.getProperty("/aCausasEquipo");
            let objObjeto = oThat.modelGeneral.getProperty("/oObjObjetoEquipo");
            let objSintoma = oThat.modelGeneral.getProperty("/oObjSintomaEquipo");
            let objCausa = oThat.modelGeneral.getProperty("/oObjCausaEquipo");
            let bValue1 = true;
            let bValue2 = false;
            let bValue3 = true;
            let bValue4 = false;
            // if (objObjetosEquipo.length > 0) {
            //     if (objObjeto.Equnr) {
            //         bValue1 = true;
            //     } else {
            //         bValue1 = false;
            //     }
            // } else {
            //     bValue1 = true;
            // }
            if (objSintomasEquipo.length > 0) {
                if (objSintoma.Equnr) {
                    bValue2 = true;
                } else {
                    bValue2 = false;
                }
            } else {
                bValue2 = true;
            }
            // if (objCausasEquipo.length > 0) {
            //     if (objCausa.Equnr) {
            //         bValue3 = true;
            //     } else {
            //         bValue3 = false;
            //     }
            // } else {
            //     bValue3 = true;
            // }
            let bAviso = oThat.modelGeneral.getProperty("/bAvisoMant");
            if (bAviso) {
                if (cMotivo.getSelectedItem() && ComentarioLapso.getValue() && aEquipoSeleccionado.id) {
                    bValue4 = true;
                } else {
                    bValue4 = false;
                }
            } else {
                if (cMotivo.getSelectedItem() && ComentarioLapso.getValue()) {
                    bValue4 = true;
                } else {
                    bValue4 = false;
                }
            }
            
            if (bValue1 && bValue2 && bValue3 && bValue4) {
                oThat.modelGeneral.setProperty("/addLapsoEnabled",true);
            } else {
                oThat.modelGeneral.setProperty("/addLapsoEnabled",false);
            }
        },

        onSelectTipoMotivosLapso: function(oEvent){
            var that=this;
            var oView=this.getView();
            var oSource = oEvent.getSource();
            var selectItem = oSource.getSelectedItem();
            var value = oSource.getValue();
            var selectMotivo = oThat.modelGeneral.getProperty("/selectTipoMotivo");
            if(value){
                if(!selectItem){
                    MessageBox.error(oThat.getView().getModel("i18n").getResourceBundle().getText("errorSelectTipoMotivoLapso"));
                    oSource.setValue("");
                    oThat.modelGeneral.setProperty("/selectTipoMotivo/codigo","");
                    oThat.modelGeneral.setProperty("/selectTipoMotivo/contenido","");
                    oThat.modelGeneral.refresh(true);
                    return;
                }
                
                if(selectItem.getKey() == ""){
                    oThat.modelGeneral.setProperty("/selectTipoMotivo/codigo","");
                    oThat.modelGeneral.setProperty("/selectTipoMotivo/contenido","");
                }else{
                    oThat.modelGeneral.setProperty("/selectTipoMotivo/codigo",selectItem.getKey());
                    oThat.modelGeneral.setProperty("/selectTipoMotivo/contenido",selectItem.getText());
                }
            }
    
        },

        onCancelLapso: function () {
            oThat.modelGeneral.setProperty("/addLapsoEnabled",false);
            sap.ui.core.Fragment.byId("frgAddLapso", "comboMotivo").clearSelection();
            sap.ui.core.Fragment.byId("frgAddLapso", "comboMotivo").setValue();
            oThat.modelGeneral.setProperty("/bNoAvisoMant", false);
            oThat.modelGeneral.setProperty("/bAvisoMant", false);
            oThat.modelGeneral.setProperty("/aObjetosEquipo", []);
            oThat.modelGeneral.setProperty("/aSintomasEquipo", []);
            oThat.modelGeneral.setProperty("/aCausasEquipo", []);
            oThat.modelGeneral.setProperty("/oObjObjetoEquipo", {});
            oThat.modelGeneral.setProperty("/oObjSintomaEquipo", {});
            oThat.modelGeneral.setProperty("/oObjCausaEquipo", {});
            this.onAddLapso.destroy();
            this.onAddLapso = undefined;
        },

        onConfirmLapso: async function () {
            let oDataSeleccionada = oThat.getOwnerComponent().getModel("asociarDatos");
            let fraccionActual = oDataSeleccionada.getData().aEstructura.results[0].fraccion;
            let selectMotivo = oThat.modelGeneral.getProperty("/selectMotivo");
            let aListaEquiposAfectados = oThat.modelGeneral.getProperty("/aListaEquiposAfectados");
            let sTextoComentario = oThat.modelGeneral.getProperty("/ComentarioLapso");
            let lineaSeleccionada = oThat.modelGeneral.getProperty("/equipoSelected");
            let equipoIdSelected = lineaSeleccionada.id;
            let aFilter = [];
            aFilter.push(new Filter("motivoLapsoId", 'EQ', selectMotivo.codigo))
            let verificarMotivoLapsoResponse = await registroService.getDataFilter(oThat.mainModelv2, "/MOTIVO_LAPSO", aFilter);
            if(verificarMotivoLapsoResponse.results[0].indicador){
                await oThat.onConfirmWithEquipo();
                //OFFLINE
                // if(aListaEquiposAfectados.length > 0) {
                //     for await (const oEquipo of aListaEquiposAfectados){
                //         let sobject = {
                //             usuarioRegistro: oInfoUsuario.data.usuario,
                //             fechaRegistro: new Date(),
                //             activo: true,
                //             equipoId_equipoId: oEquipo,
                //             tipoLapsoId_motivoLapsoId: selectMotivo.codigo,
                //             rmdId_rmdId: oDataSeleccionada.getData().rmdId,
                //             rmdLapsoId: util.onGetUUIDV4(),
                //             comentario: sTextoComentario,
                //             Anular: false,
                //             fechaInicio: new Date(),
                //             fraccion: fraccionActual,
                //             tipo: "Afectado",
                //             equipoPrincipal: equipoIdSelected,
                //             bAfectado: true
                //         }
                //         await registroService.createData(oThat.mainModelv2, "/RMD_LAPSO", sobject);
                //     }
                // }
            } else {
                await oThat.onConfirmNotEquipo();
            }
        },

        onConfirmWithEquipo: function () {
            if (oInfoUsuario.rol[0].codigo === "RMD_AUXILIAR") { //COMO AUXILIAR
                oThat.onCrearLapsoAuxiliar();
            } else if (oInfoUsuario.rol[0].codigo === "rmd_jefe_prod") { //COMO JEFE DE PRODUCCI??N
                oThat.onCrearLapsoJefe();
            }
        },

        onCrearLapsoAuxiliar: function () {
            let oDataSeleccionada = oThat.getOwnerComponent().getModel("asociarDatos");
            let fraccionActual = oDataSeleccionada.getData().aEstructura.results[0].fraccion;
            let oDataRMD = oDataSeleccionada.getData();
            let lineaSeleccionada = oThat.modelGeneral.getProperty("/equipoSelected");
            let sTextoComentario = oThat.modelGeneral.getProperty("/ComentarioLapso");
            let equipoIdSelected = lineaSeleccionada.id;
            let selectMotivo = oThat.modelGeneral.getProperty("/selectMotivo");
            if (equipoIdSelected) {
                MessageBox.confirm("??Desea crear Lapso?", {
                    onClose : async function(sButton) {
                        if (sButton === MessageBox.Action.OK) {
                            BusyIndicator.show(0);
                            let sobject = {
                                usuarioRegistro: oInfoUsuario.data.usuario,
                                fechaRegistro: new Date(),
                                activo: true,
                                equipoId_equipoId: equipoIdSelected,
                                tipoLapsoId_motivoLapsoId: selectMotivo.codigo,
                                rmdId_rmdId: oDataRMD.rmdId,
                                rmdLapsoId: util.onGetUUIDV4(),
                                comentario: sTextoComentario,
                                Anular: false,
                                fechaInicio: new Date(),
                                fraccion: fraccionActual,
                                tipo: "Pendiente"
                            };
                            if(oDataRMD.rmdId){
                                registroService.createData(oThat.mainModelv2, "/RMD_LAPSO", sobject).then( async function () {
                                    let objParada = {
                                        usuarioActualiza: oInfoUsuario.data.usuario,
                                        fechaActualiza: new Date(),
                                        estadoIdRmd_iMaestraId: 476
                                    }
                                    await registroService.onUpdateDataGeneral(oThat.mainModelv2, "RMD", objParada, oDataRMD.rmdId);
                                    await oThat.onSendMail(oDataSeleccionada.getData(), lineaSeleccionada);
                                    await oThat.onSaveCatalogoBTP(sobject.rmdLapsoId);
                                    let aFilter = [];
                                    aFilter.push(new Filter("usuarioId_usuarioId", "EQ", oInfoUsuario.data.usuarioId));
                                    aFilter.push(new Filter("rmdId_rmdId", "EQ", oDataSeleccionada.getData().rmdId));
                                    aFilter.push(new Filter("fraccion", "EQ", fraccionActual));
                                    let aLapsoSelected = await registroService.onGetDataGeneralFilters(oThat.mainModelv2, "RMD_VERIFICACION_FIRMAS", aFilter);
                                    if(aLapsoSelected.results.length === 0){
                                        var oDataFirmaVerif = {}
                                        oDataFirmaVerif.rmdId           = oDataRMD.rmdId;
                                        oDataFirmaVerif.fraccionActual  = fraccionActual;
                
                                        oThat.onRMD_VERIFICACION_FIRMAS(oDataFirmaVerif);
                                    }
                                    oThat.onCancelLapso();
                                    BusyIndicator.hide();
                                    MessageBox.success("Se cre?? satisfactoriamente el lapso por falla de m??quina");
                                }.bind(oThat), function (error) {
                                    MessageBox.error(oThat.getView().getModel("i18n").getResourceBundle().getText("errorCreateLapso"));
                                    BusyIndicator.hide();
                                });
                            } else{
                                MessageBox.error(oThat.getView().getModel("i18n").getResourceBundle().getText("errorCreateLapso"));
                                BusyIndicator.hide();
                            }                                     
                            //OFFLINE
                            await oThat.onEquipoAfectado();
                        }
                    }
                });
            } else{
                MessageBox.error(oThat.getView().getModel("i18n").getResourceBundle().getText("errorCreateLapso"));
                BusyIndicator.hide();
            }
        },

        onCrearLapsoJefe: async function () {
            let oDataSeleccionada = oThat.getOwnerComponent().getModel("asociarDatos");
            let fraccionActual = oDataSeleccionada.getData().aEstructura.results[0].fraccion;
            let oDataRMD = oDataSeleccionada.getData();
            let lineaSeleccionada = oThat.modelGeneral.getProperty("/equipoSelected");
            let sTextoComentario = oThat.modelGeneral.getProperty("/ComentarioLapso");
            let sText = lineaSeleccionada.value;
            if (sText.length > 40) {
                sText = sText.substring(0, 40);
            }
            let equipoIdSelected = lineaSeleccionada.id;
            let equipoSelected = lineaSeleccionada.additionalText;
            let oObjObjetoEquipo = oThat.modelGeneral.getProperty("/oObjObjetoEquipo");
            let oObjSintomaEquipo = oThat.modelGeneral.getProperty("/oObjSintomaEquipo");
            let oObjCausaEquipo = oThat.modelGeneral.getProperty("/oObjCausaEquipo");
            if (equipoIdSelected) {
                MessageBox.confirm("??Desea crear lapso por falla de maquina y enviar aviso a mantenimiento?", {
                    onClose : async function(sButton) {
                        if (sButton === MessageBox.Action.OK) {
                            BusyIndicator.show(0);
                            let sKeyAviso = util.onGetUUIDV4();
                            let oParam = {
                                Qmnum : "",
                                Qmart : "A2",
                                Equnr : equipoSelected,
                                Qmtxt : sText,
                                Priok : "C",
                                Qmnam : oInfoUsuario.data.usuario,
                                Planplant : "",
                                LocAcc : "",
                                Priotype : "",
                                ObjectNo : "",
                                Prilang : "",
                                CatType : "",
                                Maintplant : "",
                                CoArea : "",
                                CompCode : "",
                                Texto: sTextoComentario,
                                //AvisoMensajeSet: [],
                                Catalogoset: [],
                                //OFFLINE
                                Sincronizado:"0",
                                Keyaviso: sKeyAviso
                            }
                            if (oObjObjetoEquipo.Equnr) {
                                oParam.Catalogoset.push({
                                    Qmnum: oObjObjetoEquipo.Qmnum,
                                    Qmart: oObjObjetoEquipo.Qmart,
                                    Equnr: oObjObjetoEquipo.Equnr,
                                    CatTyp: oObjObjetoEquipo.CatType,
                                    CodeGroup: oObjObjetoEquipo.CodeGroup,
                                    Code: oObjObjetoEquipo.Code,
                                    Version: oObjObjetoEquipo.Version,
                                    Valid: oObjObjetoEquipo.Valid,
                                    Langu: oObjObjetoEquipo.Langu,
                                    Shorttxtgr: oObjObjetoEquipo.Shorttxtgr,
                                    Shorttxtcd: oObjObjetoEquipo.Shorttxtcd,
                                    Texto: oObjObjetoEquipo.Texto
                                });
                            }
                            if (oObjSintomaEquipo.Equnr) {
                                oParam.Catalogoset.push({
                                    Qmnum: oObjSintomaEquipo.Qmnum,
                                    Qmart: oObjSintomaEquipo.Qmart,
                                    Equnr: oObjSintomaEquipo.Equnr,
                                    CatTyp: oObjSintomaEquipo.CatTyp ? oObjSintomaEquipo.CatTyp : oObjSintomaEquipo.CatType,
                                    CodeGroup: oObjSintomaEquipo.CodeGroup,
                                    Code: oObjSintomaEquipo.Code,
                                    Version: oObjSintomaEquipo.Version,
                                    Valid: oObjSintomaEquipo.Valid,
                                    Langu: oObjSintomaEquipo.Langu,
                                    Shorttxtgr: oObjSintomaEquipo.Shorttxtgr,
                                    Shorttxtcd: oObjSintomaEquipo.Shorttxtcd,
                                    Texto: oObjSintomaEquipo.Texto
                                });
                            }
                            if (oObjCausaEquipo.Equnr) {
                                oParam.Catalogoset.push({
                                    Qmnum: oObjCausaEquipo.Qmnum,
                                    Qmart: oObjCausaEquipo.Qmart,
                                    Equnr: oObjCausaEquipo.Equnr,
                                    CatTyp: oObjCausaEquipo.CatType,
                                    CodeGroup: oObjCausaEquipo.CodeGroup,
                                    Code: oObjCausaEquipo.Code,
                                    Version: oObjCausaEquipo.Version,
                                    Valid: oObjCausaEquipo.Valid,
                                    Langu: oObjCausaEquipo.Langu,
                                    Shorttxtgr: oObjCausaEquipo.Shorttxtgr,
                                    Shorttxtcd: oObjCausaEquipo.Shorttxtcd,
                                    Texto: oObjCausaEquipo.Texto
                                });
                            }
                           /*  oParam.AvisoMensajeSet.push({
                                Qmnum: "",
                                Type: "",
                                Id: "",
                                Number: "",
                                Message: "",
                                LogNo: "",
                                LogMsgNo: "",
                                MessageV1: "",
                                MessageV2: "",
                                MessageV3: "",
                                MessageV4: "",
                                Parameter: "",
                                Row: 0,
                                Field: "",
                                System: ""
                            }); */
                            //OFFLINE CAMBIO
                            //let oAvisoResponse = await registroService.createData(oThat.modelNecesidad, "/AvisoSet", oParam);
                            //let oNewJsonCatalogo = JSON.parse(JSON.stringify(oParam.CatalogoSet));
                            oParam.Catalogoset = "" + JSON.stringify(oParam.Catalogoset);

                            let oAvisoResponse = await registroService.createData(oThat.modelNecesidad, "/AvisoOfflineSet", oParam);

                            await registroService.oDataRemove(oThat.modelNecesidad, "/AvisoOfflineSet", sKeyAviso);

                            let selectMotivo = oThat.modelGeneral.getProperty("/selectMotivo");
                            let ComentarioLapso = sap.ui.core.Fragment.byId("frgAddLapso", "tAreaMotivo").getProperty("value");
                            let sobject = {
                                usuarioRegistro: oInfoUsuario.data.usuario,
                                fechaRegistro: new Date(),
                                activo: true,
                                equipoId_equipoId: equipoIdSelected,
                                tipoLapsoId_motivoLapsoId: selectMotivo.codigo,
                                rmdId_rmdId: oDataRMD.rmdId,
                                rmdLapsoId: sKeyAviso,
                                comentario: ComentarioLapso,
                                Anular: false,
                                fechaInicio: new Date(),
                                fraccion: fraccionActual,
                                tipo: "Completado",
                                Qmnum: oAvisoResponse.Qmnum
                            };
                            if(oDataRMD.rmdId){
                                registroService.createData(oThat.mainModelv2, "/RMD_LAPSO", sobject).then( async function () {
                                    let objParada = {
                                        usuarioActualiza: oInfoUsuario.data.usuario,
                                        fechaActualiza: new Date(),
                                        estadoIdRmd_iMaestraId: 476
                                    }
                                    await registroService.onUpdateDataGeneral(oThat.mainModelv2, "RMD", objParada, oDataRMD.rmdId);
                                    await oThat.onSaveCatalogoBTP(sobject.rmdLapsoId);
                                    let aFilter = [];
                                    aFilter.push(new Filter("usuarioId_usuarioId", "EQ", oInfoUsuario.data.usuarioId));
                                    aFilter.push(new Filter("rmdId_rmdId", "EQ", oDataRMD.rmdId));
                                    aFilter.push(new Filter("fraccion", "EQ", fraccionActual));
                                    let aLapsoSelected = await registroService.onGetDataGeneralFilters(oThat.mainModelv2, "RMD_VERIFICACION_FIRMAS", aFilter);
                                    if(aLapsoSelected.results.length === 0){
                                        var oDataFirmaVerif = {}
                                        oDataFirmaVerif.rmdId           = oDataRMD.rmdId;
                                        oDataFirmaVerif.fraccionActual  = fraccionActual;
            
                                        oThat.onRMD_VERIFICACION_FIRMAS(oDataFirmaVerif);
                                    }
                                    oThat.onCancelLapso();
                                    BusyIndicator.hide();
                                    MessageBox.success("La petici??n se puso en cola ");
                                    //MessageBox.success("Se cre?? satisfactoriamente el lapso por falla de m??quina y se envi?? aviso a mantenimiento\n Nro. Notificaci??n: " + oAvisoResponse.Qmnum);
                                }.bind(oThat), function (error) {
                                    MessageBox.error(oThat.getView().getModel("i18n").getResourceBundle().getText("errorCreateLapso"));
                                    BusyIndicator.hide();
                                });
                            }else{
                                MessageBox.error(oThat.getView().getModel("i18n").getResourceBundle().getText("errorCreateLapso"));
                                BusyIndicator.hide();
                            }
                            //OFFLINE
                            await oThat.onEquipoAfectado();         
                        }
                    }
                });
            } else {
                MessageBox.error(oThat.getView().getModel("i18n").getResourceBundle().getText("errorCreateLapso"));
                BusyIndicator.hide();
            }
        },

        onConfirmNotEquipo: function () {
            let oDataSeleccionada = oThat.getOwnerComponent().getModel("asociarDatos");
            let fraccionActual = oDataSeleccionada.getData().aEstructura.results[0].fraccion;
            let selectMotivo = oThat.modelGeneral.getProperty("/selectMotivo");
            let oDataRMD = oDataSeleccionada.getData();
            let ComentarioLapso = sap.ui.core.Fragment.byId("frgAddLapso", "tAreaMotivo").getProperty("value");
            MessageBox.confirm("??Desea guardar la acci??n realizada?", {
                onClose : async function(sButton) {
                    if (sButton === MessageBox.Action.OK) {
                        BusyIndicator.show(0);
                        let sobject = {
                            usuarioRegistro: oInfoUsuario.data.usuario,
                            fechaRegistro: new Date(),
                            activo: true,
                            tipoLapsoId_motivoLapsoId: selectMotivo.codigo,
                            rmdId_rmdId: oDataRMD.rmdId,
                            rmdLapsoId: util.onGetUUIDV4(),
                            comentario: ComentarioLapso,
                            Anular: false,
                            fechaInicio: new Date(),
                            fraccion: fraccionActual,
                            tipo: "Sin Equipo"
                        }
                        if(oDataRMD.rmdId){
                            registroService.createData(oThat.mainModelv2, "/RMD_LAPSO", sobject).then(async function () {
                                let objParada = {
                                    usuarioActualiza: oInfoUsuario.data.usuario,
                                    fechaActualiza: new Date(),
                                    estadoIdRmd_iMaestraId: 476
                                }
                                await registroService.onUpdateDataGeneral(oThat.mainModelv2, "RMD", objParada, oDataRMD.rmdId);

                                let aFilter = [];
                                aFilter.push(new Filter("usuarioId_usuarioId", "EQ", oInfoUsuario.data.usuarioId));
                                aFilter.push(new Filter("rmdId_rmdId", "EQ", oDataRMD.rmdId));
                                aFilter.push(new Filter("fraccion", "EQ", fraccionActual));
                                let aLapsoSelected = await registroService.onGetDataGeneralFilters(oThat.mainModelv2, "RMD_VERIFICACION_FIRMAS", aFilter);
                                if(aLapsoSelected.results.length === 0){
                                    let oDataFirmaVerif = {}
                                    oDataFirmaVerif.rmdId           = oDataRMD.rmdId;
                                    oDataFirmaVerif.fraccionActual  = fraccionActual;

                                    oThat.onRMD_VERIFICACION_FIRMAS(oDataFirmaVerif);
                                }

                                oThat.onCancelLapso();
                                MessageBox.success(oThat.getView().getModel("i18n").getResourceBundle().getText("successCreateLapso"));
                                oThat.getLapsosRMD();
                                BusyIndicator.hide();
                            }.bind(oThat), function (error) {
                                MessageBox.error(oThat.getView().getModel("i18n").getResourceBundle().getText("errorCreateLapso"));
                                BusyIndicator.hide();
                            });
                        }else{
                            MessageBox.error(oThat.getView().getModel("i18n").getResourceBundle().getText("errorCreateLapso"));
                            BusyIndicator.hide();
                        }        
                    }
                }
            });
        },

        setInitialInputs: function(mAggregations) {
            oThat.modelGeneral.setProperty("/aObjetosEquipo", []);
            oThat.modelGeneral.setProperty("/aSintomasEquipo", []);
            oThat.modelGeneral.setProperty("/aCausasEquipo", []);
            oThat.modelGeneral.setProperty("/oObjObjetoEquipo", {});
            oThat.modelGeneral.setProperty("/oObjSintomaEquipo", {});
            oThat.modelGeneral.setProperty("/oObjCausaEquipo", {});
            mAggregations.getFormElements()[2].mAggregations.fields[0].setValue("");
            mAggregations.getFormElements()[2].mAggregations.fields[0].clearSelection("");
            // mAggregations.getFormElements()[3].mAggregations.fields[0].setValue("");
            // mAggregations.getFormElements()[3].mAggregations.fields[0].clearSelection("");
            // mAggregations.getFormElements()[4].mAggregations.fields[0].setValue("");
            // mAggregations.getFormElements()[4].mAggregations.fields[0].clearSelection("");
        },

        onChangeEquipoCheck: async function (oEvent) {
            let oContext = oEvent.getSource();
            oThat.setInitialInputs(oEvent.getSource().getParent().getParent());
            let obj = {
                id: oContext.getProperty("selectedKey"),
                value: oContext.getProperty("value")
            }
            //nuevo
             if(obj.id) {
                let aListEquipos = oThat.getView().getModel("aModelEquipos").getData();
                aListEquipos = aListEquipos.filter(itm=>itm.equipoId_equipoId !== obj.id);
                let aModelEquiposAfectados = new JSONModel(aListEquipos);
                aModelEquiposAfectados.setSizeLimit(999999999);
                oThat.getView().setModel(aModelEquiposAfectados, "aModelEquiposAfectados");
            } else {
                let aModelEquiposAfectados = new JSONModel([]);
                oThat.getView().setModel(aModelEquiposAfectados, "aModelEquiposAfectados");
            }
            //fin
            let oContAdd = oEvent.getSource().mAggregations.items.find(itm=>itm.mProperties.key === obj.id);
            if(oContAdd){
                obj.additionalText  = oContAdd.getProperty("additionalText");
            }
            oThat.modelGeneral.setProperty("/equipoSelected", obj);
            if (obj.additionalText) {
                //OBTENEMOS OBJETOS DEL EQUIPO
                // let aFilterObj = [];
                // aFilterObj.push(new Filter("Equnr", "EQ", obj.additionalText));
                // aFilterObj.push(new Filter("Qmart", "EQ", "A2"));
                // aFilterObj.push(new Filter("CatTyp", "EQ", "B"));
                // let aObjetoResponse = await registroService.onGetDataGeneralFilters(oThat.modelNecesidad, "CatalogoSet", aFilterObj);
                oThat.modelGeneral.setProperty("/aObjetosEquipo", []);
                //OBTENEMOS SINTOMAS DEL EQUIPO
                let aFilterSint = [];
                aFilterSint.push(new Filter("Equnr", "EQ", obj.additionalText));
                aFilterSint.push(new Filter("Qmart", "EQ", "A2"));
                aFilterSint.push(new Filter("CatTyp", "EQ", "C"));
                //prueba
                let aCatalogoAll = await registroService.getDataAll(oThat.modelNecesidad, "/CatalogoSet");
                let aSintomaResponse = await registroService.onGetDataGeneralFilters(oThat.modelNecesidad, "CatalogoSet", aFilterSint);
                oThat.modelGeneral.setProperty("/aSintomasEquipo", aSintomaResponse.results);
                //OBTENEMOS CAUSAS DEL EQUIPO
                // let aFilterCau = [];
                // aFilterCau.push(new Filter("Equnr", "EQ", obj.additionalText));
                // aFilterCau.push(new Filter("Qmart", "EQ", "A2"));
                // aFilterCau.push(new Filter("CatTyp", "EQ", "5"));
                // let aCausasResponse = await registroService.onGetDataGeneralFilters(oThat.modelNecesidad, "CatalogoSet", aFilterCau);
                oThat.modelGeneral.setProperty("/aCausasEquipo", []);
            }
            await oThat.onCheckMotivos();
        },

        onConfirmEquipo: async function () {
            let oDataSeleccionada = oThat.getOwnerComponent().getModel("asociarDatos");
            let fraccionActual = oDataSeleccionada.getData().aEstructura.results[0].fraccion;
            let dataRmd = oDataSeleccionada.getData();
            let lineaSeleccionada = oThat.modelGeneral.getProperty("/equipoSelected");
            let sTextoComentario = oThat.modelGeneral.getProperty("/ComentarioLapso");
            let sText = lineaSeleccionada.value;
            if (sText.length > 40) {
                sText = sText.substring(0, 40);
            }
            let equipoIdSelected = lineaSeleccionada.id;
            let equipoSelected = lineaSeleccionada.additionalText;
            let sKeyAviso = util.onGetUUIDV4();
            if (equipoIdSelected) {
                let oParam = {
                    Qmnum : "",
                    Qmart : "A2",
                    Equnr : equipoSelected,
                    Qmtxt : sText,
                    Priok : "C",
                    Qmnam : oInfoUsuario.data.usuario,
                    Planplant : "",
                    LocAcc : "",
                    Priotype : "",
                    ObjectNo : "",
                    Prilang : "",
                    CatType : "",
                    Maintplant : "",
                    CoArea : "",
                    CompCode : "",
                    Texto: sTextoComentario,
                    //AvisoMensajeSet: []
                    Catalogoset:"",
                    //OFFLINE
                    Sincronizado:"0",
                    Keyaviso: sKeyAviso

                }
              /*   oParam.AvisoMensajeSet.push({
                    Qmnum: "",
                    Type: "",
                    Id: "",
                    Number: "",
                    Message: "",
                    LogNo: "",
                    LogMsgNo: "",
                    MessageV1: "",
                    MessageV2: "",
                    MessageV3: "",
                    MessageV4: "",
                    Parameter: "",
                    Row: 0,
                    Field: "",
                    System: ""
                }); */
                //await registroService.createData(oThat.modelNecesidad, "/AvisoSet", oParam);
                await registroService.createData(oThat.modelNecesidad, "/AvisoOfflineSet", oParam);

                await registroService.oDataRemove(oThat.modelNecesidad, "/AvisoOfflineSet", sKeyAviso);

                let LineaActual = oThat.modelGeneral.getProperty("/LineaActualMD"); 
                let selectMotivo = oThat.modelGeneral.getProperty("/selectMotivo"); 
                let selectTipoMotivo = oThat.modelGeneral.getProperty("/selectTipoMotivo"); 
                // let ComentarioLapso = oThat.modelGeneral.getProperty("/ComentarioLapso");
                let ComentarioLapso = sap.ui.core.Fragment.byId("frgAddLapso", "tAreaMotivo").getProperty("value");
                if(!selectTipoMotivo.codigo){
                    MessageBox.success(oThat.getView().getModel("i18n").getResourceBundle().getText("errorMotivoNoSelectedLapso"));
                    return;
                }
                let sobject = {};
                sobject.usuarioRegistro           = oInfoUsuario.data.usuario;
                sobject.fechaRegistro             = new Date();
                sobject.activo                    = true;
                sobject.equipoId_equipoId         = equipoIdSelected;
                sobject.tipoLapsoId_motivoLapsoId = selectMotivo.codigo;
                sobject.rmdId_rmdId               = LineaActual.rmdId;
                sobject.rmdLapsoId                = sKeyAviso;
                sobject.comentario                = ComentarioLapso;
                sobject.Anular                    = false;
                sobject.fechaInicio               = new Date();
                sobject.fraccion                  = fraccionActual;
        
                BusyIndicator.show(0);
                if(LineaActual.rmdId){
                    registroService.createData(oThat.mainModelv2, "/RMD_LAPSO", sobject).then( async function () {
                        let aFilter = [];
                        aFilter.push(new Filter("usuarioId_usuarioId", "EQ", oInfoUsuario.data.usuarioId));
                        aFilter.push(new Filter("rmdId_rmdId", "EQ", dataRmd.rmdId));
                        aFilter.push(new Filter("fraccion", "EQ", fraccionActual));
                        let aLapsoSelected = await registroService.onGetDataGeneralFilters(oThat.mainModelv2, "RMD_VERIFICACION_FIRMAS", aFilter);
                        if(aLapsoSelected.results.length === 0){
                            var oDataFirmaVerif = {}
                            oDataFirmaVerif.rmdId           = dataRmd.rmdId;
                            oDataFirmaVerif.fraccionActual  = fraccionActual;

                            oThat.onRMD_VERIFICACION_FIRMAS(oDataFirmaVerif);
                        }
                        oThat.onCerrarEquipos();
                        oThat.onCancelLapso();
                        MessageBox.success("La petici??n se puso en cola ");
                        //MessageBox.success(oThat.getView().getModel("i18n").getResourceBundle().getText("successCreateLapso"));
                        BusyIndicator.hide();
                    }.bind(oThat), function (error) {
                        MessageBox.error(oThat.getView().getModel("i18n").getResourceBundle().getText("errorCreateLapso"));
                        BusyIndicator.hide();
                    });
                }else{
                    MessageBox.error(oThat.getView().getModel("i18n").getResourceBundle().getText("errorCreateLapso"));
                    BusyIndicator.hide();
                }
            } else {
                MessageBox.error(oThat.getView().getModel("i18n").getResourceBundle().getText("errorSelectEquipo"));
            }
        },

        onCerrarEquipos: function (){
            oThat.oListEquipo.close();
        },

        onEquipoDialog: async function () {
            let oDataSeleccionada = oThat.getOwnerComponent().getModel("asociarDatos");
            let fraccionActual = oDataSeleccionada.getData().aEstructura.results[0].fraccion;
            let aFilters = [];
            aFilters.push(new Filter("fraccion", "EQ", fraccionActual));
            aFilters.push(new Filter("rmdId_rmdId", "EQ", oDataSeleccionada.getData().rmdId));
            aFilters.push(new Filter("verifCheck", "EQ", true));
            let sExpand = "equipoId"
            let aEquiposResult = await registroService.onGetDataGeneralFiltersExpand(oThat.mainModelv2, "RMD_ES_EQUIPO", aFilters, sExpand);
            let aModelEquipos = new JSONModel(aEquiposResult.results);
            aModelEquipos.setSizeLimit(999999999);
            oThat.getView().setModel(aModelEquipos, "aModelEquipos");
        },

        getLapsosRMD: async function(){
            var LineaActual = oThat.modelGeneral.getProperty("/LineaActualMD"); 
            var oFilter = [];
            var Lapsos = [];
            let oDataSeleccionada = oThat.getOwnerComponent().getModel("asociarDatos");
            let fraccionActual = oDataSeleccionada.getData().aEstructura.results[0].fraccion;
            BusyIndicator.show(0);
            oFilter.push(new Filter("rmdId_rmdId", FilterOperator.EQ, LineaActual.rmdId));
            oFilter.push(new Filter("fraccion", FilterOperator.EQ, fraccionActual));
            oFilter.push(new Filter("activo", FilterOperator.EQ, true));
            let expand = "tipoLapsoId,pasoId,pasoIdFin,equipoId,aListCatalogFalla"
            var aListLapsosRMD = await registroService.getDataExpand(oThat.mainModelv2, "/RMD_LAPSO", expand, oFilter);
            //var aListMotivoLapso = await registroService.getDataExpand(oThat.mainModelv2, "/RMD_MOTIVO_EDIT_CIERRE_LAPSO", "", oFilter);
            var aListMotivoLapso = await registroService.getDataFilter(oThat.mainModelv2, "/RMD_MOTIVO_EDIT_CIERRE_LAPSO", oFilter);
            var v_dia, v_mes, v_anio, dateEx, v_hora, v_minutos;
            aListLapsosRMD.results.forEach(element => {
                if (element.fechaRegistro !== null) {
                    dateEx = new Date(element.fechaRegistro);
                    element.fechaRegistro = new Date(dateEx.getUTCFullYear(), dateEx.getUTCMonth(), dateEx.getUTCDate(), dateEx.getUTCHours(),
                    dateEx.getUTCMinutes(), dateEx.getUTCSeconds());

                    v_dia = element.fechaRegistro.getDate();
                    if(v_dia <= 9){
                        v_dia = '0' + v_dia;
                    }
                    v_mes = element.fechaRegistro.getMonth() + 1;
                    if(v_mes <= 9){
                        v_mes = '0' + v_mes;	
                    }
                    v_anio = element.fechaRegistro.getFullYear();

                    v_hora = element.fechaRegistro.getHours()
                    v_minutos = element.fechaRegistro.getMinutes()

                    element.fechaRegistro = v_dia + "-" + v_mes + "-" + v_anio + " " + v_hora + ":" + v_minutos;

                    element.descriptionTipo = "";
                    if(element.tipoId){
                        element.descriptionTipo = element.tipoId.contenido;
                    }
                }
                if(element.rmdLapsoId){
                    let filterMotivosEdit = aListMotivoLapso.results.filter(e => e.rmdLapsoId_rmdLapsoId === element.rmdLapsoId);
                    if(filterMotivosEdit.length > 0){
                        filterMotivosEdit = filterMotivosEdit.sort(function(a, b) {
                            return a.fechaRegistro - b.fechaRegistro;
                        });
                        element.MotivoEdit = filterMotivosEdit[filterMotivosEdit.length-1].motivoEdit;
                    }
                }
            })

            //SE AGREGA FILTRO LAPSO
            aListLapsosRMD.results.forEach(function(e){
                if(!e.pasoIdFin_mdEstructuraPasoId  && !e.pasoId_mdEstructuraPasoId){
                    Lapsos.push(e); 
                }
            })

            oThat.modelGeneral.setProperty("/tblListLapso", Lapsos);
            BusyIndicator.hide();
        },

        onListLapsoGeneral: function () {
            this.getLapsosRMD();

            if (!this.onListLapso) {
            this.onListLapso = sap.ui.xmlfragment(
                "frgListLapso",
                rootPath + ".view.dialog.ListLapso",
                this
            );
            this.getView().addDependent(this.onListLapso);
            }

            this.onListLapso.open();
        },

        onCancelLapsoList: function () {
            this.onListLapso.close();
        },

        onGetHistoryStep: function (oEvent) {
            var oTbl = oEvent.getSource().getParent().getParent().getParent();
            var oParam = oEvent.getSource().getParent().getParent().getParent().oParam;
            var sPasoDescription = oTbl.mAggregations.cells[0].getProperty("text");
            var oFilterDet = [];
            oFilterDet.push(new Filter("rmdEstructuraPasoId_rmdEstructuraPasoId", FilterOperator.EQ, oParam.sPasoId));
            let aListHistory = registroService.getDataExpand(oThat.mainModelv2, "/RMD_ES_PASO_HISTORIAL", "rmdEstructuraPasoId", oFilterDet);
            oThat.modelGeneral.setProperty("/sDesPaso", sPasoDescription);
            aListHistory.then(r => {
                
                r.results = r.results.sort(function(a, b) {
                    return a.fechaRegistro - b.fechaRegistro;
                });
                oThat.modelGeneral.setProperty("/tblHistorial", r.results);
                
                if (!oThat.onHistoryStep || oThat.onHistoryStep.length == 0) {
                    oThat.onHistoryStep = sap.ui.xmlfragment(
                        "frgHistoryStep",
                        rootPath + ".view.dialog.History",
                        oThat
                    );
                    oThat.getView().addDependent(oThat.onHistoryStep);
                }

                oThat.onHistoryStep.open();
            });
        },
        onGetHistoryStepEquipo: function (oEvent) {
            var oParam = oEvent.getSource().getParent().getParent().getParent().oParam;
            var oFilterDet = [];
            let aListHistory = [];
            if(oParam.sTipo == "EQUIPO"){
                oFilterDet.push(new Filter("rmdEstructuraEquipoId_rmdEstructuraEquipoId", FilterOperator.EQ, oParam.sPasoId));
                oFilterDet.push(new Filter("rmdEstructuraId_rmdEstructuraId", FilterOperator.EQ, oParam.rmdEstructuraId_rmdEstructuraId));
                aListHistory = registroService.getDataExpand(oThat.mainModelv2, "/RMD_ES_EQUIPO_HISTORIAL", "rmdEstructuraEquipoId", oFilterDet);
            }else if(oParam.sTipo == "UTENSILIO"){
                oFilterDet.push(new Filter("rmdEstructuraUtensilioId_rmdEstructuraUtensilioId", FilterOperator.EQ, oParam.sPasoId));
                oFilterDet.push(new Filter("rmdEstructuraId_rmdEstructuraId", FilterOperator.EQ, oParam.rmdEstructuraId_rmdEstructuraId));
                aListHistory = registroService.getDataExpand(oThat.mainModelv2, "/RMD_ES_EQUIPO_HISTORIAL", "rmdEstructuraUtensilioId", oFilterDet);
            }
            
            aListHistory.then(r => {
                r.results = r.results.sort(function(a, b) {
                    return a.fechaRegistro - b.fechaRegistro;
                });
                oThat.modelGeneral.setProperty("/tblHistorial", r.results);
            
                if (!oThat.onHistoryStep) {
                    oThat.onHistoryStep = sap.ui.xmlfragment(
                        "frgHistoryStep",
                        rootPath + ".view.dialog.History",
                        oThat
                    );
                    oThat.getView().addDependent(oThat.onHistoryStep);
                }

                oThat.onHistoryStep.open();
            });
        },

        onCancelHistoryStep: function () {
            this.onHistoryStep.close();
        },

        onAssignUserStep: function () {
            if (!this.onUserStep) {
            this.onUserStep = sap.ui.xmlfragment(
                "frgUserStep",
                rootPath + ".view.dialog.addAssignUserStep",
                this
            );
            this.getView().addDependent(this.onUserStep);
            }

            this.onUserStep.open();
        },

        onCancelUserStep: function () {
            this.onUserStep.close();
        },

        onRememberPassword: function () {
            if (!this.onPassword) {
            this.onPassword = sap.ui.xmlfragment(
                "frgPassword",
                rootPath + ".view.dialog.Password",
                this
            );
            this.getView().addDependent(this.onPassword);
            }

            this.onPassword.open();
        },

        onCancelPassword: function () {
            this.onPassword.close();
        },

        onPrintTicket: async function (nType) {
            try {
                // Para Copias en Parihuela
                let oDataListEtiquetas = oThat.getView().getModel("modelGeneral").getProperty("/ListaEtiqueta"),
                    oDataImpresion = oThat.modelGeneral.getProperty("/oDataImpresion");
                if (oDataListEtiquetas.length > 0) {
                    let nCopia = 0;
                    if (oDataListEtiquetas[0].tipo === SGrupoArticuloPari) {
                        oThat.onState(true, "copias");
                        nCopia = 3;
                    } else {
                        oThat.onState(false, "copias");
                        nCopia = 0;
                    }
                    this.modelGeneral.setProperty("/oDataImpresion", {
                        hu: nType,
                        copia: nCopia
                    });
                    let oDataSeleccionada = oThat.getOwnerComponent().getModel("asociarDatos");
                    var aFilters = [];
                    // aFilters.push(new Filter("Area", "EQ", oDataSeleccionada.getData().mdId.areaRmdTxt));
                    aFilters.push(new Filter("Area", "EQ", "ACONDICIONADO"));
                    await registroService.onGetDataGeneralFilters(oThat.modelNecesidad, "ImpresoraSet", aFilters).then(aImpresoras => {
                        oThat.modelGeneral.setProperty("/Impresoras", aImpresoras.results);
                        oThat.modelGeneral.refresh(true);
                    }).catch(function (oError) {
                        console.log(oError);
                        sap.ui.core.BusyIndicator.hide();
                    });
                    if (!oThat.onTicket) {
                        oThat.onTicket = sap.ui.xmlfragment(
                        "frgPdfViewerTicket",
                        rootPath + ".view.dialog.PDFViewerTicket",
                        oThat
                    );
                        oThat.getView().addDependent(oThat.onTicket);
                    }
    
                    oThat.onTicket.open();
                }
            } catch (oError) {
                oThatConf.onErrorMessage(oError, "errorSave");
            }
        },

        onCancelPDFViewerTicket: function () {
            // this.modelGeneral.setProperty("/oDataImpresion", {
            //     hu: 0
            // });
            this.modelGeneral.setProperty("/tipoDatoId_iMaestraId", null);
            this.onTicket.close();
        },
        
        onMenuApplyAction: async function (oEvent) {
            let press = oEvent.mParameters.item.getProperty("text");
            if (press === "Si Aplica") {
                oThat.onAppliesGeneral(true);
            } else if (press === "No Aplica") {
                oThat.onAppliesGeneral(false);
            }
        },

        onAppliesGeneral:async function(bAplica){
            let oListEquipoAssignResponsive = this.getView().getModel("aListEquipoAssignResponsive"),
                aListEquipoAssignResponsive = oListEquipoAssignResponsive.getData(),
                oDataSeleccionada = oThat.getOwnerComponent().getModel("asociarDatos"),
                fraccionActual = oDataSeleccionada.getData().aEstructura.results[0].fraccion,
                nameClass = formatter.selectedColor(oInfoUsuario.rol[0].codigo),
                sDescripcionAccion = 'NO APLICA';

                BusyIndicator.show(0);
                for await (const oItem of aListEquipoAssignResponsive) {
                    var oData = {};
                    if (oItem.aplica !== bAplica) {
                        if(oItem.sTipo == "EQUIPO"){
                            oData.usuarioActualiza = oInfoUsuario.data.usuario;
                            oData.fechaActualiza = new Date();
                            if (!oItem.firstFechaActualiza) {
                                oData.firstFechaActualiza = new Date();
                            }
                            oData.aplica = bAplica;
                            oData.styleUser = nameClass;
                            oItem.aplica = bAplica;
    
                            await registroService.onUpdateDataGeneral(oThat.mainModelv2, "RMD_ES_EQUIPO", oData, oItem.rmdEstructuraEquipoId);
                            await oThat.saveLineaActualHistorial(oItem, bAplica, sDescripcionAccion, '');
                        } else if(oItem.sTipo == "UTENSILIO"){
                            oData.usuarioActualiza = oInfoUsuario.data.usuario;
                            oData.fechaActualiza = new Date();
                            if (!oItem.firstFechaActualiza) {
                                oData.firstFechaActualiza = new Date();
                            }
                            oData.aplica = bAplica;
                            oData.styleUser = nameClass;
                            oItem.aplica = bAplica;
    
                            await registroService.onUpdateDataGeneral(oThat.mainModelv2, "RMD_ES_UTENSILIO", oData, oItem.rmdEstructuraUtensilioId);
                            await oThat.saveLineaActualHistorial(oItem, bAplica, sDescripcionAccion, '');
                        }
                    }
                }
                await sap.ui.controller("mif.rmd.registro.controller.MainView").getEstructurasRmdRefactory(fraccionActual);
                await oThat.onChangeEstructura();
                BusyIndicator.hide();
        },

        onSaveCheckAprov:async function(oEvent, confirm){
            let oInfoUsuario = oThat.modelGeneral.getProperty("/oInfoUsuario");
            oEvent.getSource().setSelected(!oEvent.getSource().getSelected());
            //   oThat.modelGeneral.setProperty("/oEventVistoBueno",oEvent.getSource());
            //   oThat.modelGeneral.setProperty("/passwordValidate","");
            //   if(!confirm){
            //       var evento = oEvent;
            //       if(!oThat.onValidateUser){
            //           oThat.onValidateUser = sap.ui.xmlfragment(
            //               "frgListUser",
            //               rootPath + ".view.dialog.ValidationUser",
            //               oThat
            //           );
            //           oThat.getView().addDependent(oThat.onValidateUser);
            //       }
            //       oThat.onValidateUser.open();
                
            //       return;
            //   }
            const oSource = oEvent.getSource();
            //   const oSource = oThat.modelGeneral.getProperty("/oEventVistoBueno");
            oSource.setSelected(!oSource.getSelected());
            const oParam = oSource.getParent().getParent().oParam;
                

            var VBox = oSource.getParent();
                var row = oSource.getParent().getParent();
                var oItems = oSource.getParent().getParent().getParent().getItems();
            const sId = oParam.sCode;
            const sTipo = oParam.sTipo;
            const sUsuario = "USUARIOVB";

                BusyIndicator.show(0);
                let oEsEquipo = {};
                let oEsUtensilio = {};

                var nameClass="TextStyleNone";
            /*  if(oInfoUsuario.rol[codigoUserPrueba].codigo == "rmd_registrador"){
                    nameClass = "TextStyleNone";
                }else if(oInfoUsuario.rol[codigoUserPrueba].codigo == "rmd_jefe_prod"){
                    nameClass = "TextStyleJefe";
                }else if(oInfoUsuario.rol[codigoUserPrueba].codigo == "rmd_gerente_prod"){
                    nameClass = "TextStyleNone";
                }else if(oInfoUsuario.rol[codigoUserPrueba].codigo == "rmd_jefe_dt"){
                    nameClass = "TextStyleNone";
                }else if(oInfoUsuario.rol[codigoUserPrueba].codigo == "RMD_AUXILIAR"){
                    nameClass = "TextStyleAuxiliar";
                }else if(oInfoUsuario.rol[codigoUserPrueba].codigo == "CP_SUPERVISOR_PROD"){
                    nameClass = "TextStyleSupervisor";
                }else if(oInfoUsuario.rol[codigoUserPrueba].codigo == "RMD_CONTROL_CALIDAD"){
                    nameClass = "TextStyleControlCalidad";
                }else if(oInfoUsuario.rol[codigoUserPrueba].codigo == "RMD_CONTROL_PROCESO"){
                    nameClass = "TextStyleControlProcesos";
                } */
                nameClass = formatter.selectedColor(oInfoUsuario.rol[codigoUserPrueba].codigo);
                if(sTipo == "EQUIPO" ){
                    oEsEquipo.rmdEstructuraEquipoId = sId;
                    oEsEquipo.usuarioActualiza = oInfoUsuario.data.usuario;
                    oEsEquipo.fechaActualiza = new Date();
                    oEsEquipo.vistoBueno = oSource.getSelected();

                    await registroService.updateEsEquipoRmd(oThat.mainModelv2, "/RMD_ES_EQUIPO", oEsEquipo);
                    if(oSource.getSelected()){
                        VBox.getItems()[1].removeStyleClass("TextStyleModificar TextStyleJefe TextStyleAuxiliar TextStyleSupervisor TextStyleControlCalidad TextStyleControlProcesos TextStyleNone");
                        VBox.getItems()[1].setText(oInfoUsuario.data.usuario);
                        VBox.getItems()[1].addStyleClass(nameClass);
                    }else{
                        VBox.getItems()[1].removeStyleClass("TextStyleModificar TextStyleJefe TextStyleAuxiliar TextStyleSupervisor TextStyleControlCalidad TextStyleControlProcesos TextStyleNone");
                        VBox.getItems()[1].setText("Modificado");
                        VBox.getItems()[1].addStyleClass("TextStyleModificar");
                    }

                }else if(sTipo == "UTENSILIO"){
                    oEsUtensilio.rmdEstructuraUtensilioId = sId;
                    oEsUtensilio.usuarioActualiza = oInfoUsuario.data.usuario;
                    oEsUtensilio.fechaActualiza = new Date();
                    oEsUtensilio.vistoBueno = oSource.getSelected();

                    await registroService.updateEsUtensilioRmd(oThat.mainModelv2, "/RMD_ES_UTENSILIO", oEsUtensilio);
                    if(oSource.getSelected()){
                        VBox.getItems()[1].removeStyleClass("TextStyleModificar TextStyleJefe TextStyleAuxiliar TextStyleSupervisor TextStyleControlCalidad TextStyleControlProcesos TextStyleNone");
                        VBox.getItems()[1].setText(oInfoUsuario.data.usuario);
                        VBox.getItems()[1].addStyleClass(nameClass);
                    }else{
                        VBox.getItems()[1].removeStyleClass("TextStyleModificar TextStyleJefe TextStyleAuxiliar TextStyleSupervisor TextStyleControlCalidad TextStyleControlProcesos TextStyleNone");
                        VBox.getItems()[1].setText("Modificado");
                        VBox.getItems()[1].addStyleClass("TextStyleModificar");
                    }

                }

                oThat.saveLineaActualEquipoHistorial(oEsEquipo, oEsUtensilio, oParam, String(oSource.getSelected()), "VERIFICACHECK");
                
                BusyIndicator.hide(0);
        },
        saveLineaActualEquipoHistorial:function(oEsEquipo, oEsUtensilio, oParam, sValor, sDesPaso){
            var oEsHistorico = {};
            var oEsEquipoHistorial = {};
            let oInfoUsuario = oThat.modelGeneral.getProperty("/oInfoUsuario");
            oEsEquipoHistorial.rmdHistorialEquipoId  = util.onGetUUIDV4();
            oEsEquipoHistorial.descripcion         = sDesPaso;
            oEsEquipoHistorial.terminal            = '';
            oEsEquipoHistorial.valor               = sValor;
            oEsEquipoHistorial.usuarioRegistro     = oInfoUsuario.data.usuario;
            oEsEquipoHistorial.fechaRegistro       = new Date();
            oEsEquipoHistorial.activo              = true;
            oEsEquipoHistorial.rol                  = oInfoUsuario.rol[codigoUserPrueba].codigo;
            if(Object.keys(oEsEquipo).length>0){
                oEsHistorico = oEsEquipo;
                oEsEquipoHistorial.rmdEstructuraEquipoId_rmdEstructuraEquipoId = oEsHistorico.rmdEstructuraEquipoId;
                oEsEquipoHistorial.rmdEstructuraId_rmdEstructuraId = oParam.rmdEstructuraId_rmdEstructuraId;
            }else if(Object.keys(oEsUtensilio).length>0){
                oEsHistorico = oEsUtensilio
                oEsEquipoHistorial.rmdEstructuraUtensilioId_rmdEstructuraUtensilioId = oEsHistorico.rmdEstructuraUtensilioId;
                oEsEquipoHistorial.rmdEstructuraId_rmdEstructuraId = oParam.rmdEstructuraId_rmdEstructuraId;
            }

            registroService.createData(oThat.mainModelv2, "/RMD_ES_EQUIPO_HISTORIAL", oEsEquipoHistorial).then(function () {
                
            }.bind(oThat), function (error) {
                console.log(error);
                MessageBox.error(oThat.getView().getModel("i18n").getResourceBundle().getText("errorCreateLapso"));
                BusyIndicator.hide();
            });
        },

        setEstructurasRmdEquipo: async function(aDataEstEquipment,sId){
            var oFilterRmd = [];
            let oInfoUsuario = oThat.modelGeneral.getProperty("/oInfoUsuario");
            var LineaActual = oThat.modelGeneral.getProperty("/LineaActualMD");

            oFilterRmd.push(new Filter("rmdId_rmdId", FilterOperator.EQ, LineaActual.rmdId));
            oFilterRmd.push(new Filter("estructuraId_estructuraId", FilterOperator.EQ, aDataEstEquipment[0].estructuraId));
            var aListEstructuraRmd = await registroService.getDataFilter(oThat.mainModelv2, "/RMD_ESTRUCTURA", oFilterRmd);

            // var estructuras = oThat.modelEstructura.getProperty("/estructuras");
            // estructuras.forEach(function(x){
            //     if(x.fragment == "Equipos" ){
            //         rmdEstructuraEquipo = x.rmdEstructuraId;
            //     }
            // });

            var sobject = {};
            sobject.terminal                  = null;
            sobject.usuarioRegistro           = oInfoUsuario.data.usuario;
            sobject.fechaRegistro             = new Date();
            sobject.activo                    = true;
            sobject.aEstructura = [];
            sobject.aPaso = [];
            sobject.aEquipo = [];
            sobject.aUtensilio = [];
            sobject.aEspecificacion = [];
            sobject.aReceta = [];
            sobject.aInsumo = [];
            sobject.Id = util.onGetUUIDV4();

            if(aDataEstEquipment[0].aEquipo.length>0){
                // aEquipoTotal.forEach(function(x){
                    aDataEstEquipment[0].aEquipo.forEach(function(y){
                        // if(y.equipoId_equipoId == x.equipoId_equipoId){
                            y.rmdEstructuraEquipoId = util.onGetUUIDV4();
                            y.rmdEstructuraId_rmdEstructuraId = aListEstructuraRmd.results[0].rmdEstructuraId;
                            
                            delete y["equipoId"];
                            delete y["estructuraId"];
                            delete y["mdId"];
                            delete y["mdId_mdId"];
                            delete y["mdEstructuraEquipoId"];
                            delete y["estructuraId_estructuraId"];
                            delete y["__metadata"];
                            sobject.aEquipo.push(y);
                        // }
                    });
                // });
            }

            if(aDataEstEquipment[1].aUtensilio.length>0){
                // aUtensilioTotal.forEach(function(x){
                    aDataEstEquipment[1].aUtensilio.forEach(function(y){
                        y.rmdEstructuraUtensilioId = util.onGetUUIDV4();
                        y.rmdEstructuraId_rmdEstructuraId = aListEstructuraRmd.results[0].rmdEstructuraId;

                        delete y["mdEstructuraUtensilioId"];
                        delete y["utensilioId"];
                        delete y["estructuraId"];
                        delete y["mdId"];
                        delete y["mdId_mdId"];
                        delete y["estructuraId_estructuraId"];
                        delete y["__metadata"];
                        // if(y.equipoId_equipoId == x.equipoId_equipoId){
                        sobject.aUtensilio.push(y);
                        // }
                    // });
                });
            }

            registroService.createData(oThat.mainModelv2, "/RMD_ESTRUCTURA_SKIP", sobject).then(function (oData) {
                oThatConf.onCancelAddEquipoEditRM();
                oThatConf.onGetDataInitial();
                MessageBox.success(formatter.onGetI18nText(oThat, "sSaveCorrectMDEquipment"));
                sap.ui.core.BusyIndicator.hide();
                // resolve(sobject);
            }.bind(oThat), function (error) {
                MessageBox.error("Ocurri?? un error al registrar las estructuras RMD seleccionados.");
                BusyIndicator.hide();
            });       
        },
        onSaveEquipoRmd: function (oEquipoData) {
            return new Promise(function (resolve, reject) {
                sap.ui.core.BusyIndicator.show(0);
                var sobject = {};
                sobject.terminal                  = null;
                sobject.usuarioRegistro           = oInfoUsuario.data.usuario;
                sobject.fechaRegistro             = new Date();
                sobject.activo                    = true;
                sobject.aEstructura = [];
                sobject.aPaso = [];
                sobject.aEquipo = [];
                sobject.aUtensilio = [];
                sobject.aEspecificacion = [];
                sobject.aReceta = [];
                sobject.aInsumo = [];
                sobject.aEquipo = oEquipoData;
                
                registroService.createData(oThat.mainModelv2, "/RMD_ESTRUCTURA_SKIP", sobject).then(function () {
                }.bind(oThat), function (error) {
                    MessageBox.error("Ocurri?? un error al registrar las estructuras RMD seleccionados.");
                    BusyIndicator.hide();
                });
            });
        },
        
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
                            if (sErrorDetails) {
                                if (typeof (sErrorDetails[0].message) === 'object') {
                                    MessageBox.error(sErrorDetails[0].message.value);
                                } else {
                                    MessageBox.error(sErrorDetails[0].message);
                                }
                            } else {
                                sErrorDetails = oErrorRes.error.message.value;
                                if (sErrorDetails) {
                                    // MessageBox.error(sErrorDetails); Descomentar una vez que se haya hecho el cambio en SAP.
                                    oThatConf.onErrorMessage("", "msgNoDataInsumo");
                                } else {
                                    oThatConf.onErrorMessage("", "errorSave");
                                }
                            }
                        } else {
                            oThatConf.onErrorMessage("", "errorSave");
                        }
                    } catch (oError) {
                        MessageBox.error(oError.responseText);
                    }
                } else if (oError.message) {
                    MessageBox.error(oError.message);
                } else {
                    MessageBox.error(this.getView().getModel("i18n").getResourceBundle().getText(textoI18n));
                }
            } catch (oErrorT) {
                oThatConf.onErrorMessage(oErrorT, "errorSave");
            }
        },
        

        createCellFormula: function(array, oTable){
            var regitroLector = oThat.modelGeneral.getProperty("/oInfoUsuario/funcionUsuario/registroLector");
            var butonEnabledGeneral = false;
            if(regitroLector){
                butonEnabledGeneral = false;
            }else{
                butonEnabledGeneral = true;
            }
            var aListTiposDatos = oThat.modelGeneral.getProperty("/tiposDatos");
            let oInfoUsuario = oThat.modelGeneral.getProperty("/oInfoUsuario");
            var usuarioActualizaFooter = "";
            var oUsuarioActualizaFooter = [];
            var oFechaFooter = [];
            var oRmdEstructuraId = [];
            
            var ejecutaAccion=false;
            oInfoUsuario.rol.forEach(function(e){
                if(e.codigo == "rmd_registrador" ){

                }
            });

            array.forEach(element => {
                const aCells = [];
                oRmdEstructuraId.push(element.rmdEstructuraId_rmdEstructuraId);

                if(element.fechaActualiza){
                    oFechaFooter.push(element.fechaActualiza.getTime());
                }

                var usuarioActualiza = "";

                var aFindTipoDato = aListTiposDatos.find(item => item.tipo === element.tipodato);

                var cell1 = new sap.m.Text({
                    text: element.descripcion
                });

                var cell2 = new sap.m.Text({
                    text: element.codigo
                });

                var cell3 = new sap.m.Text({
                    text: element.um
                });

                var cell4 = new sap.m.Text({
                    text: element.cantidadReceta
                });

                var cell5 = new sap.m.ObjectStatus({
                    text: element.cantidadRm,
                    state: element.stateText
                });

                var cell6 = new sap.m.Input({
                    enabled: false,
                    value: element.numeroBultos,
                    type: "Number"
                });

                var cell7 = new sap.m.VBox({
                    alignItems: "Center"
                });

                var cell8 = new sap.m.Button({
                    text: "",
                    type: "Emphasized",
                    icon: "sap-icon://bar-code",
                    iconFirst: true,
                    width: "auto",
                    visible: true,
                    iconDensityAware: false,
                    press: oThat.onOpenBarcode,
                });

                const bVerificationCheck = element.vistoBueno;

                var chekcBoxAprovador = new sap.m.CheckBox({
                    enabled: false,
                    text: "",
                    selected: bVerificationCheck,
                    select: [oThat.onSaveCheckAprovInsumo]
                });

                var usuarioActualiza = "";
                var nameClass = "TextStyleNone";
                if(element.historico.length>0){
                    if(bVerificationCheck){
                        usuarioActualiza = element.usuarioActualiza
                        oUsuarioActualizaFooter.push(element.usuarioActualiza);

                      /*   if(element.ultimaAccion.rol == "rmd_registrador"){
                            nameClass = "TextStyleNone";
                        }else if(element.ultimaAccion.rol == "rmd_jefe_prod"){
                            nameClass = "TextStyleJefe";
                        }else if(element.ultimaAccion.rol == "rmd_gerente_prod"){
                            nameClass = "TextStyleNone";
                        }else if(element.ultimaAccion.rol == "rmd_jefe_dt"){
                            nameClass = "TextStyleNone";
                        }else if(element.ultimaAccion.rol == "RMD_AUXILIAR"){
                            nameClass = "TextStyleAuxiliar";
                        }else if(element.ultimaAccion.rol == "CP_SUPERVISOR_PROD"){
                            nameClass = "TextStyleSupervisor";
                        }else if(element.ultimaAccion.rol == "RMD_CONTROL_CALIDAD"){
                            nameClass = "TextStyleControlCalidad";
                        }else if(element.ultimaAccion.rol == "RMD_CONTROL_PROCESO"){
                            nameClass = "TextStyleControlProcesos";
                        } */

                        nameClass = formatter.selectedColor(element.ultimaAccion.rol);
                    }else{
                        usuarioActualiza = "Modificado";
                        nameClass = "TextStyleModificar";
                    }
                }else{
                    if(bVerificationCheck){
                        usuarioActualiza = element.usuarioActualiza
                        oUsuarioActualizaFooter.push(element.usuarioActualiza);
                    }
                }



                var textAprovador = new sap.m.Title({
                    level:"H2",
                    text: usuarioActualiza
                });
                textAprovador.addStyleClass(nameClass);

                cell7.addItem(chekcBoxAprovador);
                cell7.addItem(textAprovador);

                aCells.push(cell1);
                aCells.push(cell2);
                aCells.push(cell3);
                aCells.push(cell4);
                aCells.push(cell5);
                aCells.push(cell6);
                aCells.push(cell7);
                aCells.push(cell8);

                const oRow = new sap.m.ColumnListItem({
                    cells: aCells 
                });

                oRow.oParam = {
                    // sControl: aFindTipoDato.control,
                    rmdEstructuraId_rmdEstructuraId: element.rmdEstructuraId_rmdEstructuraId,
                    sId: element.Id,
                    cantidadBarCode: element.cantidadBarCode,
                    numeroBultos: element.numeroBultos,
                    cantidadRm: element.cantidadRm,
                    bAplica: true
                };

                oTable.addItem(oRow);
               
            });

            const aCellsFooter = [];

            const oLabelVerificado = new sap.m.Label({
                design: "Bold",
                text: "Verificado por : "
            });

            if(oUsuarioActualizaFooter.length > 0){
                usuarioActualizaFooter = oUsuarioActualizaFooter.join();
            }

            const oLabelUsuarioActualFooter = new sap.m.Text({
                text: usuarioActualizaFooter,
                wrapping: true
            })

            var cell1Footer =  new sap.m.HBox({
                wrap: "Wrap",
                items: [oLabelVerificado, oLabelUsuarioActualFooter]
            })

            const oLabelFecha = new sap.m.Label({
                design: "Bold",
                text: "Fecha : "
            })

            var FechaFooter = "";
            if(oFechaFooter.length > 0){
                var dateFormat = sap.ui.core.format.DateFormat.getDateInstance({pattern : "dd-MM-YYYY HH:MM" });
                FechaFooter = formatter.formatDateFooter(new Date(Math.min(...oFechaFooter)));
            }

            const oLabelFechaFooter = new sap.m.Label({
                text: FechaFooter
            })

            var cell2Footer =  new sap.m.HBox({
                items: [oLabelFecha, oLabelFechaFooter]
            });

            var cell3Footer =  new sap.m.Label({
                text: ""
            })

            var cell4Footer =  new sap.m.Label({
                text: ""
            })

            var cell5Footer =  new sap.m.Label({
                text: ""
            })

            var cell6Footer =  new sap.m.Label({
                text: ""
            })

            var cell7Footer =  oThat.createMenuHistorialFooter();

            aCellsFooter.push(cell1Footer);
            aCellsFooter.push(cell2Footer);
            aCellsFooter.push(cell3Footer);
            aCellsFooter.push(cell4Footer);
            aCellsFooter.push(cell5Footer);
            aCellsFooter.push(cell6Footer);
            aCellsFooter.push(cell7Footer);

            const oRowFooter = new sap.m.ColumnListItem({
                cells: aCellsFooter
            });

            oRowFooter.oParam = {
                oModel: "/RMD_ES_INSUMO_HISTORIAL",
                rmdEstructuraId_rmdEstructuraId: oRmdEstructuraId,
                bAplica: true
            };

            oTable.addItem(oRowFooter);


        },
        onSaveCheckAprovInsumo:async function(oEvent, confirm){
            oThat.modelGeneral.setProperty("/passwordValidate","");
          if(!confirm){
              var evento = oEvent;
              if(!oThat.onValidateUserInsumo){
                  oThat.onValidateUserInsumo = sap.ui.xmlfragment(
                      "frgListUser",
                      rootPath + ".view.dialog.ValidationUserInsumo",
                      oThat
                  );
                  oThat.getView().addDependent(oThat.onValidateUserInsumo);
              }
              oThat.onValidateUserInsumo.open();
              oEvent.getSource().setSelected(!oEvent.getSource().getSelected());
              oThat.modelGeneral.setProperty("/oEventVistoBueno",evento.getSource());
              return;
          }

        //   const oSource = oEvent.getSource();
            const oSource = oThat.modelGeneral.getProperty("/oEventVistoBueno");
            oSource.setSelected(!oSource.getSelected());
          const oParam = oSource.getParent().getParent().oParam;

          let oInfoUsuario = oThat.modelGeneral.getProperty("/oInfoUsuario");

          var VBox = oSource.getParent();
          var row = oSource.getParent().getParent();
          var oItems = oSource.getParent().getParent().getParent().getItems();
          const oControl2 = row.getCells()[5];
          var oFooter = oItems[oItems.length-1];

          const oLabelUserVer = oFooter.getCells()[0].getItems()[1];
          const oLabelFecha = oFooter.getCells()[1].getItems()[1];

          const sId = oParam.sId;
          const sUsuario = "USUARIOVB";
          BusyIndicator.show(0);
          let oEsEstructura = {};
            oEsEstructura.rmdEstructuraRecetaInsumoId = sId;
            oEsEstructura.usuarioActualiza = oInfoUsuario.data.usuario;
            oEsEstructura.fechaActualiza = new Date();
            oEsEstructura.vistoBueno = oSource.getSelected();
            oEsEstructura.numeroBultos = "";
            if(oSource.getSelected()){
                oEsEstructura.numeroBultos = oControl2.getValue();
            }

            var oFilterDet = [];
            oFilterDet.splice(0, oFilterDet.length);
            oFilterDet.push(new Filter("rmdEstructuraId_rmdEstructuraId", FilterOperator.EQ, oParam.rmdEstructuraId_rmdEstructuraId));

            // var oFilterDet2 = [];
            // oFilterDet2.splice(0, oFilterDet.length);
            // oFilterDet2.push(new Filter("rmdEstructuraId_rmdEstructuraId", FilterOperator.EQ, oParam.rmdEstructuraId_rmdEstructuraId));
            // oFilterDet2.push(new Filter("rmdEstructuraRecetaInsumoId_rmdEstructuraRecetaInsumoId", FilterOperator.EQ, oParam.sId));

            oThat.saveLineaActualInsumoHistorial(oParam, String(oSource.getSelected()), "VERIFICACHECK");
            
            await registroService.updateEsInsumoRmd(oThat.mainModelv2, "/RMD_ES_RE_INSUMO", oEsEstructura);
            
            var aListInsumo= await registroService.getDataExpand(oThat.mainModelv2, "/RMD_ES_RE_INSUMO", "rmdEstructuraId,rmdRecetaId", oFilterDet);
            // var aListInsumoHistorico= await registroService.getDataExpand(oThat.mainModelv2, "/RMD_ES_INSUMO_HISTORIAL", "rmdEstructuraId", oFilterDet2);

            var oUsuarioActualizaFooter = [];
            var usuarioActualizaFooter = "";
            var oFechaFooter = [];
            var FechaFooter = "";

            aListInsumo.results.forEach(element => {
                if(element.vistoBueno){
                    if(element.usuarioActualiza){
                        oUsuarioActualizaFooter.push(element.usuarioActualiza);
                    }
                    if(element.fechaActualiza){
                        oFechaFooter.push(element.fechaActualiza.getTime());
                    }
                }
            });

            var nameClass="TextStyleNone";

          /*   if(oInfoUsuario.rol[codigoUserPrueba].codigo == "rmd_registrador"){
                nameClass = "TextStyleNone";
            }else if(oInfoUsuario.rol[codigoUserPrueba].codigo == "rmd_jefe_prod"){
                nameClass = "TextStyleJefe";
            }else if(oInfoUsuario.rol[codigoUserPrueba].codigo == "rmd_gerente_prod"){
                nameClass = "TextStyleNone";
            }else if(oInfoUsuario.rol[codigoUserPrueba].codigo == "rmd_jefe_dt"){
                nameClass = "TextStyleNone";
            }else if(oInfoUsuario.rol[codigoUserPrueba].codigo == "RMD_AUXILIAR"){
                nameClass = "TextStyleAuxiliar";
            }else if(oInfoUsuario.rol[codigoUserPrueba].codigo == "CP_SUPERVISOR_PROD"){
                nameClass = "TextStyleSupervisor";
            }else if(oInfoUsuario.rol[codigoUserPrueba].codigo == "RMD_CONTROL_CALIDAD"){
                nameClass = "TextStyleControlCalidad";
            }else if(oInfoUsuario.rol[codigoUserPrueba].codigo == "RMD_CONTROL_PROCESO"){
                nameClass = "TextStyleControlProcesos";
            } */
            nameClass = formatter.selectedColor(oInfoUsuario.rol[codigoUserPrueba].codigo);
            if(oUsuarioActualizaFooter.length > 0){
                usuarioActualizaFooter = oUsuarioActualizaFooter.join();
            }
            
            if(oFechaFooter.length > 0){
                var dateFormat = sap.ui.core.format.DateFormat.getDateInstance({pattern : "dd-MM-YYYY HH:MM" });
                FechaFooter = formatter.formatDateFooter(new Date(Math.min(...oFechaFooter)));
            }

            if(oSource.getSelected()){
                VBox.getItems()[1].removeStyleClass("TextStyleModificar TextStyleJefe TextStyleAuxiliar TextStyleSupervisor TextStyleControlCalidad TextStyleControlProcesos TextStyleNone");
                VBox.getItems()[1].setText(oEsEstructura.usuarioActualiza);
                VBox.getItems()[1].addStyleClass(nameClass);
            }else{
                VBox.getItems()[1].removeStyleClass("TextStyleModificar TextStyleJefe TextStyleAuxiliar TextStyleSupervisor TextStyleControlCalidad TextStyleControlProcesos TextStyleNone");
                VBox.getItems()[1].setText("Modificado");
                VBox.getItems()[1].addStyleClass("TextStyleModificar");
            }

            oLabelUserVer.setText(usuarioActualizaFooter);

            oLabelFecha.setText(FechaFooter);

            BusyIndicator.hide();
        },
        saveLineaActualInsumoHistorial:function(oEsEstructura, sValor, sDesPaso){
            var oEsHistorico = {};
            var oEsEstructuraHistorial = {};
            let oInfoUsuario = oThat.modelGeneral.getProperty("/oInfoUsuario");
            oEsEstructuraHistorial.rmdHistorialInsumoId  = util.onGetUUIDV4();
            oEsEstructuraHistorial.descripcion         = sDesPaso;
            oEsEstructuraHistorial.terminal            = '';
            oEsEstructuraHistorial.valor               = sValor;
            oEsEstructuraHistorial.usuarioRegistro     =  oInfoUsuario.data.usuario;
            oEsEstructuraHistorial.fechaRegistro       = new Date();
            oEsEstructuraHistorial.activo              = true;
            oEsEstructuraHistorial.rol                  = oInfoUsuario.rol[codigoUserPrueba].codigo;
            oEsEstructuraHistorial.rmdEstructuraId_rmdEstructuraId = oEsEstructura.rmdEstructuraId_rmdEstructuraId;
            oEsEstructuraHistorial.rmdEstructuraRecetaInsumoId_rmdEstructuraRecetaInsumoId = oEsEstructura.sId;

                registroService.createData(oThat.mainModelv2, "/RMD_ES_INSUMO_HISTORIAL", oEsEstructuraHistorial).then(function () {
                    
                }.bind(oThat), function (error) {
                    console.log(error);
                    MessageBox.error(oThat.getView().getModel("i18n").getResourceBundle().getText("errorCreateLapso"));
                    BusyIndicator.hide();
                });
        },
        createMenuHistorialFooter: function () {
            var regitroLector = oThat.modelGeneral.getProperty("/oInfoUsuario/funcionUsuario/registroLector");
            var butonEnabledGeneral = false;
            if(regitroLector){
                butonEnabledGeneral = false;
            }else{
                butonEnabledGeneral = true;
            }
            var aMenu = []
                var oMenuitem1 = new sap.m.MenuItem({
                    text: oThat.i18n.getText("mnHistoryXStep"),
                    icon: "sap-icon://activity-items",
                    press: [oThat.onGetHistoryStepHistorialFooter]
                });
                                                
                aMenu.push(oMenuitem1);

                var oMenu = new sap.m.Menu({ 
                    items: aMenu
                });
                
                return new sap.m.MenuButton({
                    enabled:butonEnabledGeneral,
                    icon: "sap-icon://text-align-justified",
                    tooltip: oThat.i18n.getText("lblOption"),
                    menu: oMenu
                });
        },
        onGetHistoryStepHistorialFooter: function (oEvent) {
            var oParam = oEvent.getSource().getParent().getParent().getParent().oParam;
            var oFilterDet = [];
            oParam.rmdEstructuraId_rmdEstructuraId.filter(function(item, index, array) {
                return array.indexOf(item) === index;
            }).forEach(function(x){
                oFilterDet.push(new Filter("rmdEstructuraId_rmdEstructuraId", FilterOperator.EQ, x));
            })

            let aListHistory = [];
            let aListHistory2 = [];
            if(oParam.oModel){
                aListHistory = registroService.getDataExpand(oThat.mainModelv2, oParam.oModel, "rmdEstructuraId", oFilterDet);
            }
            if(oParam.oModel2){
                aListHistory2 = registroService.getDataExpand(oThat.mainModelv2, oParam.oModel2, "rmdEstructuraId", oFilterDet);
            }
            
            aListHistory.then(r => {
                r.results = r.results.sort(function(a, b) {
                    return a.fechaRegistro - b.fechaRegistro;
                });
                oThat.modelGeneral.setProperty("/tblHistorial", r.results);
            
                if (!oThat.onHistoryStep) {
                    oThat.onHistoryStep = sap.ui.xmlfragment(
                        "frgHistoryStep",
                        rootPath + ".view.dialog.History",
                        oThat
                    );
                    oThat.getView().addDependent(oThat.onHistoryStep);
                }

                oThat.onHistoryStep.open();
            });
        },
        onNoAplicaEquipo: async function(oEvent){
            let oInfoUsuario = oThat.modelGeneral.getProperty("/oInfoUsuario");
            let sExpand = "estructuraId",
                sExpandPaso = "pasoId",
                sExpandEquipo = "equipoId",
                sExpandUtensilio = "utensilioId";
            const oParam = oEvent.getSource().getParent().getParent().getParent().oParam;
            oParam.bAplica = false
            const VBoxChek = oEvent.getSource().getParent().getParent().getParent().getCells()[4].getItems();
            const Chek = VBoxChek[0];
            const textUser = VBoxChek[1];
            const oRows = oEvent.getSource().getParent().getParent().getParent().getParent().mAggregations.items;

            const sId = oParam.sCode;
            const sTipo = oParam.sTipo;
            const sUsuario = "USUARIOVB";
            BusyIndicator.show(0);
            let oEsEquipo = {};
            let oEsUtensilio = {};
            var booleanSelect = Chek.getEnabled();

            var oFilterDet = [];
            oFilterDet.splice(0, oFilterDet.length);
            
            if(booleanSelect){
                Chek.setEnabled(oParam.bAplica);
                oEvent.getSource().setText(oThat.i18n.getText("mnApplyActivateStep"));
                oEvent.getSource().setIcon("sap-icon://add");
            }else if(!booleanSelect){
                Chek.setEnabled(!oParam.bAplica);
                oEvent.getSource().setText(oThat.i18n.getText("mnNoApplyStep"));
                oEvent.getSource().setIcon("sap-icon://less");
            }

            if(sTipo == "EQUIPO" ){
                oEsEquipo.rmdEstructuraEquipoId = sId;
                oEsEquipo.usuarioActualiza = oInfoUsuario.data.usuario;
                oEsEquipo.fechaActualiza = new Date();
                oEsEquipo.aplica = !booleanSelect;

                await registroService.updateEsEquipoRmd(oThat.mainModelv2, "/RMD_ES_EQUIPO", oEsEquipo);
                
                oFilterDet.push(new Filter("rmdEstructuraEquipoId", FilterOperator.EQ, oParam.sCode));
                var aList = await registroService.getDataExpand(oThat.mainModelv2, "/RMD_ES_EQUIPO", sExpandEquipo, oFilterDet);
            }else if(sTipo == "UTENSILIO"){
                oEsUtensilio.rmdEstructuraUtensilioId = sId;
                oEsUtensilio.usuarioActualiza = oInfoUsuario.data.usuario;
                oEsUtensilio.fechaActualiza = new Date();
                oEsUtensilio.aplica = !booleanSelect;

                await registroService.updateEsUtensilioRmd(oThat.mainModelv2, "/RMD_ES_UTENSILIO", oEsUtensilio);
                
                oFilterDet.push(new Filter("rmdEstructuraUtensilioId", FilterOperator.EQ, oParam.sCode));
                var aList = await registroService.getDataExpand(oThat.mainModelv2, "/RMD_ES_UTENSILIO", sExpandUtensilio, oFilterDet);
            }
            
            if(booleanSelect){
                Chek.setSelected(oParam.bAplica);
                textUser.setText("");
            }else if(!booleanSelect){
                Chek.setSelected(aList.results[0].vistoBueno);
                let usuarioActualiza = "";
                if(aList.results[0].vistoBueno){
                    usuarioActualiza = aList.results[0].usuarioActualiza;
                }
                textUser.setText(usuarioActualiza);
            }
            oThat.saveLineaActualEquipoHistorial(oEsEquipo, oEsUtensilio, String(!oParam.bAplica), "APLICAPASO");
            
            

            BusyIndicator.hide(0);
        },
        onAsignToEstructuraNewFraction: function(){
            return new Promise(async function (resolve, reject) {
                BusyIndicator.show(0);
                let sExpand = "estadoIdRmd";
                let oFilterRmd = [];

                let LineaActual = oThat.modelGeneral.getProperty("/LineaActualMD");

                oFilterRmd.push(new Filter("rmdId", FilterOperator.EQ, LineaActual.rmdId));

                let aResponseRMD = await registroService.getDataExpand(oThat.mainModelv2, "/RMD", sExpand, oFilterRmd);
                let ultimaFraccion = aResponseRMD.results[0].fraccion;

                let oParam = {
                    usuarioActualiza: oInfoUsuario.data.usuario,
                    fechaActualiza: new Date(),
                    fraccion: ultimaFraccion + 1
                }
                await registroService.onUpdateDataGeneral(oThat.mainModelv2, "RMD", oParam, LineaActual.rmdId);
                oThatConf.vcount = 0;
                oThat.modelGeneral.setProperty("/Fraccion", oParam.fraccion);
                await sap.ui.controller("mif.rmd.registro.controller.MainView").createEstructura(aResponseRMD.results[0], aResponseRMD.results[0], oParam.fraccion);                
                resolve(oParam);
            });
        },
        onSaveRMD: function (aObject) {
            return new Promise(async function (resolve, reject) {
                registroService.createData(oThat.mainModelv2, "/RMD", aObject).then(function (oDataSaved) {
                    resolve(oDataSaved);
                }.bind(oThat), function (error) {
                    MessageBox.error("Ocurri?? un error al registrar nueva fracci??n.");
                    BusyIndicator.hide();
                });
            });
        },
        setEstructurasRmd: async function(LineaActual){
            var oFilter = [];

            oFilter.push(new Filter("mdId_mdId", FilterOperator.EQ, LineaActual.mdId_mdId));

            var aListEstructura = await registroService.getDataFilter(oThat.mainModelv2, "/MD_ESTRUCTURA", oFilter);
            var aListPaso = await registroService.getDataFilter(oThat.mainModelv2, "/MD_ES_PASO", oFilter);
            var aListEquipo = await registroService.getDataFilter(oThat.mainModelv2, "/MD_ES_EQUIPO", oFilter);
            var aListUtensilio = await registroService.getDataFilter(oThat.mainModelv2, "/MD_ES_UTENSILIO", oFilter);
            var aListEspecificacion = await registroService.getDataFilter(oThat.mainModelv2, "/MD_ES_ESPECIFICACION", oFilter);
            var aListInsumoEquals = await registroService.getDataFilter(oThat.mainModelv2, "/MD_ES_RE_INSUMO", oFilter);
            var aListInsumo = await registroService.getDataFilter(oThat.mainModelv2, "/MD_ES_RE_INSUMO", oFilter);
            var aListEtiqueta = await registroService.getDataFilter(oThat.mainModelv2, "/MD_ES_ETIQUETA", oFilter);
            var aListPasoInsumoPaso = await registroService.getDataFilter(oThat.mainModelv2, "/MD_ES_PASO_INSUMO_PASO", oFilter);

            var sobject = {};
            sobject.terminal                  = null;
            sobject.usuarioRegistro           = oInfoUsuario.data.usuario;
            sobject.fechaRegistro             = new Date();
            sobject.activo                    = true;
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

            var listInsumos=[];
            aListEstructura.results.forEach(element => {

                var tListPaso = aListPaso.results.filter(item => item.mdId_mdId === element.mdId_mdId && item.estructuraId_estructuraId === element.estructuraId_estructuraId);
                var tListEquipo = aListEquipo.results.filter(item => item.mdId_mdId === element.mdId_mdId && item.estructuraId_estructuraId === element.estructuraId_estructuraId);
                var tListUtensilio = aListUtensilio.results.filter(item => item.mdId_mdId === element.mdId_mdId && item.estructuraId_estructuraId === element.estructuraId_estructuraId);
        
                var tListEspecificacion = aListEspecificacion.results.filter(item => item.mdId_mdId === element.mdId_mdId && item.estructuraId_estructuraId === element.estructuraId_estructuraId);
                var tListInsumo = aListInsumo.results.filter(item => item.mdId_mdId === element.mdId_mdId && item.estructuraId_estructuraId === element.estructuraId_estructuraId);
                var tListInsumoEqual = aListInsumoEquals.results.filter(item => item.mdId_mdId === element.mdId_mdId && item.estructuraId_estructuraId === element.estructuraId_estructuraId);
                var tListEtiqueta = aListEtiqueta.results.filter(item => item.mdId_mdId === element.mdId_mdId && item.estructuraId_estructuraId === element.estructuraId_estructuraId);
                var tListPasoInsumoPaso = aListPasoInsumoPaso.results.filter(item => item.mdId_mdId === element.mdId_mdId && item.estructuraId_estructuraId === element.estructuraId_estructuraId);
        
                delete element["mdEstructuraId"];
                delete element["estructuraId"];
                delete element["mdId"];
                delete element["mdId_mdId"];
                delete element["__metadata"];
        
                var sobjectEs = element;
                sobjectEs.terminal           = null;
                sobjectEs.fechaActualiza     = null;
                sobjectEs.usuarioActualiza            = null;
                sobjectEs.usuarioRegistro    = oInfoUsuario.data.usuario;
                sobjectEs.fechaRegistro      = new Date();
                sobjectEs.activo             = true;
        
                sobjectEs.rmdEstructuraId = util.onGetUUIDV4();
                sobjectEs.rmdId_rmdId = LineaActual.rmdId;
        
                sobject.aEstructura.push(sobjectEs);
        
                tListPaso.forEach(element => {
                    delete element["pasoId"];
                    delete element["flagModif"];
                    delete element["mdEstructuraPasoId"];
                    delete element["mdId"];
                    delete element["mdId_mdId"];
                    delete element["estructuraId"];
                    delete element["estructuraId_estructuraId"];
                    delete element["__metadata"];
        
                    var sobjectP = element;
                    sobjectP.terminal           = null;
                    sobjectP.fechaActualiza     = null;
                    sobjectP.usuarioActualiza   = null;
                    sobjectP.usuarioRegistro    = oInfoUsuario.data.usuario;
                    sobjectP.fechaRegistro      = new Date();
                    sobjectP.activo             = true;
        
                    sobjectP.rmdEstructuraPasoId = util.onGetUUIDV4();
                    sobjectP.rmdEstructuraId_rmdEstructuraId = sobjectEs.rmdEstructuraId;
                    sobjectP.aplica = true;
        
                    sobject.aPaso.push(sobjectP);
                });
                
                tListEquipo.forEach(element => {
                    delete element["equipoId"];
                    delete element["estructuraId"];
                    delete element["mdId"];
                    delete element["mdId_mdId"];
                    delete element["mdEstructuraEquipoId"];
                    delete element["estructuraId_estructuraId"];
                    delete element["__metadata"];
        
                    var sobjectE = element;
                    sobjectE.terminal           = null;
                    sobjectE.fechaActualiza     = null;
                    sobjectE.usuarioActualiza   = null;
                    sobjectE.usuarioRegistro    = oInfoUsuario.data.usuario;
                    sobjectE.fechaRegistro      = new Date();
                    sobjectE.activo             = true;
        
                    sobjectE.rmdEstructuraEquipoId = util.onGetUUIDV4();
                    sobjectE.rmdEstructuraId_rmdEstructuraId = sobjectEs.rmdEstructuraId;
                    sobjectE.aplica = true;
        
                    sobject.aEquipo.push(sobjectE);
                });
        
                tListUtensilio.forEach(element => {
                    delete element["utensilioId"];
                    delete element["estructuraId"];
                    delete element["mdId"];
                    delete element["mdId_mdId"];
                    delete element["mdEstructuraUtensilioId"];
                    delete element["estructuraId_estructuraId"];
                    delete element["__metadata"];
                    
                    var sobjectU = element;
                    sobjectU.terminal           = null;
                    sobjectU.fechaActualiza     = null;
                    sobjectU.usuarioActualiza   = null;
                    sobjectU.usuarioRegistro    = oInfoUsuario.data.usuario;
                    sobjectU.fechaRegistro      = new Date();
                    sobjectU.activo             = true;
        
                    sobjectU.rmdEstructuraUtensilioId = util.onGetUUIDV4();
                    sobjectU.rmdEstructuraId_rmdEstructuraId = sobjectEs.rmdEstructuraId;
                    sobjectU.aplica = true;
        
                    sobject.aUtensilio.push(sobjectU);
                });
        
                tListInsumo.forEach(element => {
                    var rmdEstructuraRecetaInsumoId = util.onGetUUIDV4();
                    var estructuraRecetaInsumoId =  element.estructuraRecetaInsumoId;
                    var obj = {
                        "rmdEstructuraRecetaInsumoId" : rmdEstructuraRecetaInsumoId,
                        "estructuraRecetaInsumoId": estructuraRecetaInsumoId,
                    };
                    listInsumos.push(obj);
                    delete element["estructuraRecetaInsumoId"];
                    delete element["mdId"];
                    delete element["mdId_mdId"];
                    delete element["estructuraId"];
                    delete element["mdRecetaId_mdRecetaId"];
                    delete element["mdRecetaId"];
                    //nuevos campos
                    // delete element["Matnr"];
                    // delete element["Werks"];
                    // delete element["Maktx"];
                    // delete element["ItemCateg"];
                    // delete element["ItemNo"];
                    // delete element["Component"];
                    // delete element["CompQty"];
                    // delete element["CompUnit"];
                    // delete element["ItemText1"];
                    // delete element["ItemText2"];
                    //nuevos campos
                    delete element["estructuraId_estructuraId"];
                    // delete element["recetaId_recetaId"];
                    delete element["recetaId"];
                    delete element["__metadata"];
                
                    var sobjectI = element;
                    sobjectI.terminal           = null;
                    sobjectI.fechaActualiza     = null;
                    sobjectI.usuarioActualiza   = null;
                    sobjectI.usuarioRegistro    = oInfoUsuario.data.usuario;
                    sobjectI.fechaRegistro      = new Date();
                    sobjectI.activo             = true;
                
                    sobjectI.rmdEstructuraRecetaInsumoId = rmdEstructuraRecetaInsumoId;
                    sobjectI.rmdEstructuraId_rmdEstructuraId = sobjectEs.rmdEstructuraId;
                    sobjectI.rmdRecetaId_rmdRecetaId = sobjectEs.rmdRecetaId;
                    // sobjectI.recetaId_recetaId = "f0d1f326-c7b6-4861-9f3a-2b22882fda65";
                    sobjectI.rmdId_rmdId = LineaActual.rmdId;
                    // sobjectI.aplica = true;
                    sobject.aInsumo.push(sobjectI);
                });
        
                // tListInsumoEqual.forEach(element => {
                //     listInsumos.push(element);
                // });
        
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
                    sobjectEp.terminal           = null;
                    sobjectEp.fechaActualiza     = null;
                    sobjectEp.usuarioActualiza   = null;
                    sobjectEp.usuarioRegistro    = oInfoUsuario.data.usuario;
                    sobjectEp.fechaRegistro      = new Date();
                    sobjectEp.activo             = true;
        
                    sobjectEp.rmdEstructuraEspecificacionId = util.onGetUUIDV4();
                    sobjectEp.rmdEstructuraId_rmdEstructuraId = sobjectEs.rmdEstructuraId;
                    sobjectEp.rmdId_rmdId = LineaActual.rmdId;
                    sobjectEp.aplica = true;
        
                    sobject.aEspecificacion.push(sobjectEp);
                });
        
                tListEtiqueta.forEach(element => {
                    delete element["mdId"];
                    delete element["mdId_mdId"];
                    delete element["estructuraId"];
                    delete element["estructuraId_estructuraId"];
                    delete element["mdEsEtiquetaId"];
                    delete element["__metadata"];
        
                    var sobjectE = element;
                    sobjectE.terminal           = null;
                    sobjectE.fechaActualiza     = null;
                    sobjectE.usuarioActualiza   = null;
                    sobjectE.usuarioRegistro    = oInfoUsuario.data.usuario;
                    sobjectE.fechaRegistro      = new Date();
                    sobjectE.activo             = true;
        
                    sobjectE.rmdEsEtiquetaId = util.onGetUUIDV4();
                    sobjectE.rmdEstructuraId_rmdEstructuraId = sobjectEs.rmdEstructuraId;
                    sobjectE.rmdId_rmdId = LineaActual.rmdId;
                    // sobjectI.aplica = true;
        
                    sobject.aEtiqueta.push(sobjectE);
                });
        
                tListPasoInsumoPaso.forEach(element => {
                    var nuevotList = listInsumos.filter(item => item.mdId_mdId === element.mdId_mdId && item.estructuraId_estructuraId === element.estructuraId_estructuraId);
                
                    var rmdEstructuraRecetaInsumoId = element.estructuraRecetaInsumoId_estructuraRecetaInsumoId;
                    delete element["mdId"];
                    delete element["mdId_mdId"];
                    delete element["estructuraId"];
                    delete element["estructuraId_estructuraId"];
                    delete element["mdEstructuraPasoInsumoPasoId"];
                    delete element["estructuraRecetaInsumoId_estructuraRecetaInsumoId"];
                    delete element["estructuraRecetaInsumoId"];
                    delete element["__metadata"];
        
                    var sobjectPasIns = element;
                    sobjectPasIns.terminal           = null;
                    sobjectPasIns.fechaActualiza     = null;
                    sobjectPasIns.usuarioActualiza   = null;
                    sobjectPasIns.usuarioRegistro    = oInfoUsuario.data.usuario;
                    sobjectPasIns.fechaRegistro      = new Date();
                    sobjectPasIns.activo             = true;
                    sobjectPasIns.aplica             = true;
        
                    sobjectPasIns.rmdEstructuraPasoInsumoPasoId = util.onGetUUIDV4();
                    sobjectPasIns.rmdEstructuraId_rmdEstructuraId = sobjectEs.rmdEstructuraId;
                    sobjectPasIns.rmdEstructuraRecetaInsumoId_rmdEstructuraRecetaInsumoId = rmdEstructuraRecetaInsumoId;
                    sobjectPasIns.rmdId_rmdId = LineaActual.rmdId;
                    // sobjectI.aplica = true;
        
                    sobject.aPasoInsumoPaso.push(sobjectPasIns);
                });
        
            });

            sobject.aPasoInsumoPaso.forEach(element => {
                if(element.rmdEstructuraRecetaInsumoId_rmdEstructuraRecetaInsumoId){
                    var tList = listInsumos.filter(item => item.estructuraRecetaInsumoId === element.rmdEstructuraRecetaInsumoId_rmdEstructuraRecetaInsumoId);
                    if(tList && tList.length>0){
                        element.rmdEstructuraRecetaInsumoId_rmdEstructuraRecetaInsumoId = tList[0].rmdEstructuraRecetaInsumoId;
                    } 
                }
            });
            
            return new Promise(async function (resolve, reject) {
                registroService.createData(oThat.mainModelv2, "/RMD_ESTRUCTURA_SKIP", sobject).then(async function (oDataSaved) {
                    // await oThat.getEstructurasRmd(LineaActual);
                    resolve(oDataSaved);
                }.bind(oThat), function (error) {
                    MessageBox.error("Ocurri?? un error al registrar las estructuras RMD seleccionados.");
                    BusyIndicator.hide();
                }); 
            });   
        },
        getEstructurasRmd: async function(LineaActual){
            var oFilterEst = [],
                oFilterDet = [],
                oFilterRmd = [],
                oFilterForm = [];
                let sExpand = "estructuraId",
                sExpandPaso = "pasoId",
                sExpandEquipo = "equipoId",
                sExpandUtensilio = "utensilioId",
                sExpandEspecificacion = "ensayoPadreId,tipoDatoId",
                sExpandInsumo = "rmdEstructuraId,recetaId",
                sExpandReceta = "",
                sExpandRmdReceta = "recetaId",
                sExpandRmdEquipo = "rmdEstructuraEquipoId,rmdEstructuraUtensilioId",
                sExpandTipoMaestro = "oMaestraTipo",
                sExpandEtiqueta = "rmdEstructuraId,etiquetaId",
                sExpandPasoInsumo = "rmdEstructuraId,etiquetaId,pasoId,pasoHijoId,rmdEstructuraRecetaInsumoId";
            
            const lstItems = this.getView().byId("idEstructuraWizard");
            // lstItems.removeAllSteps();
            // lstItems.removeAllAggregation("steps");

            oFilterEst.push(new Filter("rmdId_rmdId", FilterOperator.EQ, LineaActual.rmdId));
            var aListEstructura = await registroService.getDataExpand(oThat.mainModelv2, "/RMD_ESTRUCTURA", sExpand, oFilterEst);
            var t_estructuras = [];
            var aListFragments = oThat.modelGeneral.getProperty("/fragments");

            oFilterRmd.push(new Filter("rmdId", FilterOperator.EQ, LineaActual.rmdId));
            var aListFraccion = await registroService.getDataExpand(oThat.mainModelv2, "/RMD", 'estadoIdRmd', oFilterRmd);
            if(aListFraccion.results.length>0){
                oThat.modelGeneral.setProperty("/Fraccion", aListFraccion.results[0].fraccion);
            }

            //aListEstructura,sort();

            for (let i = 0; i < aListEstructura.results.length; i++) {
                const element = aListEstructura.results[i];
    
                var aFindFrag = aListFragments.find(item => item.tipo === element.estructuraId.tipoEstructuraId_iMaestraId);
    
                var sobjectE = {};
                sobjectE.id = i;
                sobjectE.tipo = element.estructuraId.tipoEstructuraId_iMaestraId;
                sobjectE.title = element.estructuraId.descripcion;
                sobjectE.rmdEstructuraId = element.rmdEstructuraId;
                sobjectE.fragment = aFindFrag.fragment;
                //sobjectE.control = "mif.rmd.registro.view.fragment.detail." + aFindFrag.fragment;
                t_estructuras.push(sobjectE);
    
                oFilterDet.splice(0, oFilterDet.length)
                oFilterDet.push(new Filter("rmdEstructuraId_rmdEstructuraId", FilterOperator.EQ, element.rmdEstructuraId));
    
                var oFilterDetCuadro = [];
                oFilterDetCuadro.push(new Filter("rmdEstructuraPasoId_rmdEstructuraPasoId", FilterOperator.EQ, element.rmdEstructuraPasoId));
    
                switch (aFindFrag.fragment) {
                    case "Cuadros":
                        var aListPaso = await registroService.getDataExpand(oThat.mainModelv2, "/RMD_ES_PASO", sExpandPaso, oFilterDet);
                        
                        var aListPasoHistorico = await registroService.getDataExpand(oThat.mainModelv2, "/RMD_ES_PASO_HISTORIAL", "rmdEstructuraPasoId", oFilterDetCuadro);
    
                        oThat.getPasos(aListPaso, aListPasoHistorico, "/tblCuadros" + i);
                        break;
                    case "Equipos":
                        var aListTipo = await registroService.getDataExpand(oThat.mainModelv2, "/MAESTRA", sExpandTipoMaestro, []);
                        var aListEquipo = await registroService.getDataExpand(oThat.mainModelv2, "/RMD_ES_EQUIPO", sExpandEquipo, oFilterDet);
                        var aListUtensilio = await registroService.getDataExpand(oThat.mainModelv2, "/RMD_ES_UTENSILIO", sExpandUtensilio, oFilterDet);
                        var aListEquipoHistorico = await registroService.getDataExpand(oThat.mainModelv2, "/RMD_ES_EQUIPO_HISTORIAL", sExpandRmdEquipo, oFilterDet);
                        oThat.getEquipos(aListEquipo, aListUtensilio, aListEquipoHistorico, aListTipo, "/tblEquipos" + i);
                        
                        oThat.modelGeneral.setProperty("/estructuraEquipo",element.estructuraId_estructuraId);
                        break;
                    case "Formulas":
                        var aListInsumo = await registroService.getDataExpand(oThat.mainModelv2, "/RMD_ES_RE_INSUMO", sExpandInsumo, oFilterDet);
    
                        var aListInsumoHistorico= await registroService.getDataExpand(oThat.mainModelv2, "/RMD_ES_INSUMO_HISTORIAL", "rmdEstructuraId", oFilterDet);
    
                        // oFilterForm.push(new Filter("rmdRecetaId", FilterOperator.EQ, element.rmdEstructuraId));
    
                        // var aListRmdReceta = await registroService.getDataExpand(oThat.mainModelv2, "/RMD_RECETA", sExpandRmdReceta, []);
                        // var aListReceta = await registroService.getDataExpand(oThat.mainModelv2, "/RECETA", sExpandReceta, []);
                        oThat.getFormulas(aListInsumo, aListInsumoHistorico, "/tblFormula" + i);
                        break;
                    case "CondicionesAmbientales":
                        var aListPasoca = await registroService.getDataExpand(oThat.mainModelv2, "/RMD_ES_PASO", sExpandPaso, oFilterDet);
                        var aListPasoHistorico = [];
                        oThat.getPasos(aListPasoca, aListPasoHistorico, "/tblCondicionesAmbientales" + i);
                        break;
                    case "Procesos":
                        var aListEtiqueta = await registroService.getDataExpand(oThat.mainModelv2, "/RMD_ES_ETIQUETA", sExpandEtiqueta, oFilterDet);
                        var aListPasoInsumo = await registroService.getDataExpand(oThat.mainModelv2, "/RMD_ES_PASO_INSUMO_PASO", sExpandPasoInsumo, oFilterDet);
                        
                        // var aListEtiquetaHistorico= await registroService.getDataExpand(oThat.mainModelv2, "/RMD_ES_ETIQUETA_HISTORIAL", "rmdEstructuraId", oFilterDet);
                        var aListPasoHistorico= await registroService.getDataExpand(oThat.mainModelv2, "/RMD_ES_PASO_INSUMO_PASO_HISTORIAL", "rmdEstructuraId", oFilterDet);
    
                        // oThat.getProcesos(aListEtiqueta, aListPasoInsumo, aListEtiquetaHistorico, aListPasoHistorico, "/tblProceso" + i);
                        oThat.getProcesos(aListEtiqueta, aListPasoInsumo, aListPasoHistorico, "/tblProceso" + i);
                        //ETIQUETAS
                        break;
                    case "Especificaciones":
                        var aListEspecificacion = await registroService.getDataExpand(oThat.mainModelv2, "/RMD_ES_ESPECIFICACION", sExpandEspecificacion, oFilterDet);
                        oThat.getEspecificacion(aListEspecificacion, "/tblEspecificacion" + i);
                        break;
                    case "VerificacionFirmas":
                        var aListVerificacionFirmas = await registroService.getDataExpand(oThat.mainModelv2, "/RMD_ES_PASO_USUARIO", "rmdUsuarioId,rmdEstructuraPasoId", []);
                        util.getVerificacionFirmas(aListVerificacionFirmas, "/tblVerificaFirmas" + i, oThat);
                        break;
                    default:
                        break;
                }
            }

            // const lstItems = oThat.getView().byId("idEstructuraWizard");
            // lstItems.removeAllAggregation("steps");
            lstItems.destroy();
            var sId = this.createId("idEstructuraWizard")
            var wizard = new sap.m.Wizard(sId, {
                showNextButton: true,
                stepActivate: oThat.onStepActivate,
                class: "sapUiResponsivePadding--header sapUiResponsivePadding--content"
            });
            oThat.getView().byId("page").addContent(wizard);
            wizard.mAggregations._progressNavigator.attachStepChanged(oThat.onLoadStep);
            wizard.bindAggregation("steps", "modelEstructura>/estructuras", this.itemsListFactory.bind(this));
            window.setTimeout(function(){wizard.setRenderMode("Page");}, 1000);
            
            oThat.modelEstructura.setProperty("/listControls", [])
            this.vcount = 0;
            oThat.modelEstructura.setProperty("/estructuras", t_estructuras);

            if (wizard.mAggregations.steps.length > 0){
                var indice = 0;
                var estructura = oThat.modelEstructura.getProperty("/estructuras/" + indice);
                var aListFragments = oThat.modelGeneral.getProperty("/fragments");
                var aFindFrag = aListFragments.find(item => item.tipo === estructura.tipo);
                
                sCurrentStep = aFindFrag.fragment;
            }
            BusyIndicator.hide();
        },
        
        getPasos:function(aListPaso, model){
            var aListObjectCase = [];
            aListPaso.results = aListPaso.results.sort(function(a, b) {
                return a.orden - b.orden;
            });
            aListPaso.results.forEach(e => {
                var sobjectCase = {}
                sobjectCase.oPaso = e;
                sobjectCase.pasoId = e.rmdEstructuraPasoId;
                sobjectCase.description = e.pasoId.descripcion;
                sobjectCase.margen = e.pasoId.margen;
                sobjectCase.decimales = e.pasoId.decimales;
                sobjectCase.fechaActualiza = e.fechaActualiza;
                sobjectCase.usuarioActualiza = e.usuarioActualiza;
                sobjectCase.rmdEstructuraId_rmdEstructuraId = e.rmdEstructuraId_rmdEstructuraId;
                sobjectCase.tipodato = e.tipoDatoId_iMaestraId;
                sobjectCase.depende = e.depende;
                aListObjectCase.push(sobjectCase);
            });

            oThat.modelGeneral.setProperty(model, aListObjectCase);
        },

        getEquipos:function(aListEquipo, aListUtensilio, aListInsumoHistorico, aListTipo, model){
            var aListObjectCase = [];
            var date = new Date();
            var time = date.getTime();
            var dateFormat = sap.ui.core.format.DateFormat.getDateInstance({pattern : "dd-MM-YYYY HH:MM" });
            aListEquipo.results.sort((a,b) => a.orden-b.orden);
    
            aListEquipo.results.forEach(eq => {
                var sobjectCase = {}
                sobjectCase.Id = eq.rmdEstructuraEquipoId;
                sobjectCase.tipoId_iMaestraId = "";
                sobjectCase.description = "";
                sobjectCase.code = "";
                sobjectCase.rmdEstructuraId_rmdEstructuraId = eq.rmdEstructuraId_rmdEstructuraId;
                var stateCalibracion = "None";
                if(eq.equipoId){
                    sobjectCase.tipoId_iMaestraId = eq.equipoId.tipoId_iMaestraId;
                    sobjectCase.description = eq.equipoId.eqktx;
                    sobjectCase.code = eq.equipoId.equnr;
                    sobjectCase.dateCalibracion=formatter.formatDateFooter(new Date(eq.equipoId.gltrp));
                    sobjectCase.descCalibracion=eq.equipoId.ktext;
                    if(eq.equipoId.gstrp.getTime()>=time){
                        stateCalibracion="Success";
                    }else{
                        stateCalibracion='Error';
                    }
                    sobjectCase.stateCalibracion = stateCalibracion;
                }
                sobjectCase.vistoBueno = eq.vistoBueno;
                sobjectCase.aplica = eq.aplica === null ? true:eq.aplica;
                sobjectCase.tipo = "EQUIPO";
                 sobjectCase.descriptionTipo = "";
                 sobjectCase.usuarioActualiza = eq.usuarioActualiza;
                 
                var tListInsumoHistorico = aListInsumoHistorico.results.filter(item => item.rmdEstructuraEquipoId_rmdEstructuraEquipoId === eq.rmdEstructuraEquipoId && item.rmdEstructuraId_rmdEstructuraId === eq.rmdEstructuraId_rmdEstructuraId);
    
                // var tListInsumoHistorico = [];
    
                var tUltimoListInsumoHistorico = {};
    
                if(tListInsumoHistorico.length>0){
                    tListInsumoHistorico.sort((a,b) => a.fechaRegistro.getTime()-b.fechaRegistro.getTime());
                    tUltimoListInsumoHistorico = tListInsumoHistorico[tListInsumoHistorico.length - 1];
                }
    
                sobjectCase.historico = tListInsumoHistorico;
                sobjectCase.ultimaAccion = tUltimoListInsumoHistorico;
    
               /* type = tipoId expand
                calification = viene de sap no hay campo*/
                aListObjectCase.push(sobjectCase);
            });
            
            aListUtensilio.results.sort((a,b) => a.orden-b.orden);
    
            aListUtensilio.results.forEach(u => {
                var sobjectCase = {}
                sobjectCase.Id = u.rmdEstructuraUtensilioId;
                sobjectCase.tipoId_iMaestraId = "";
                sobjectCase.description = "";
                sobjectCase.code = "";
                sobjectCase.rmdEstructuraId_rmdEstructuraId = u.rmdEstructuraId_rmdEstructuraId;
                if(u.utensilioId){
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
    
                if(tListInsumoHistorico.length>0){
                    tListInsumoHistorico.sort((a,b) => a.fechaRegistro.getTime()-b.fechaRegistro.getTime());
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
                    if(val.iMaestraId == eq.tipoId_iMaestraId){
                        eq.descriptionTipo = val.contenido;
                    }
                });
            });
    
            oThat.modelGeneral.setProperty(model, aListObjectCase);
          },

          getFormulas:function(aListInsumo, aListInsumoHistorico, model){
            var aListObjectCase = [];
            var textoVerificado = "";
    
            aListInsumo.results.sort((a,b) => a.orden-b.orden);
    
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
                if(eq.cantidadReceta != eq.cantidadRm){
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
    
                if(tListInsumoHistorico.length>0){
                    tListInsumoHistorico.sort((a,b) => a.fechaRegistro.getTime()-b.fechaRegistro.getTime());
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

          getEspecificacion:function(aListEspecificacion, model){
            var aListObjectCase = [];
            var textoVerificado = "";
    
            aListEspecificacion.results.sort((a,b) => a.orden-b.orden);
    
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
                if(eq.ensayoPadreId){
                    sobjectCase.descripcion = eq.ensayoPadreId.descripcion;
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

          getProcesos:function(aListEtiqueta, aListPasoInsumo, aListPasoHistorico, model){
            var aListObjectCase = [];
            var textoVerificado = "";
    
            aListEtiqueta.results.sort((a,b) => a.orden-b.orden);
    
            aListEtiqueta.results.forEach(eq => {
                var sobjectCase = {}
                sobjectCase.Id = eq.rmdEsEtiquetaId;
                sobjectCase.rmdEstructuraId_rmdEstructuraId = eq.rmdEstructuraId_rmdEstructuraId;
                sobjectCase.rmdEsEtiquetaId = eq.rmdEsEtiquetaId;
                sobjectCase.fechaActualiza = eq.fechaActualiza;
                sobjectCase.rmdEstructuraId = eq.rmdEstructuraId;
                sobjectCase.vistoBueno = eq.vistoBueno;
    
                if(eq.etiquetaId){
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
                    if(eq.etiquetaId_etiquetaId == value.etiquetaId_etiquetaId){
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
                eq.arrId=arrId;
            });
    
            $.each(aListObjectCase, function (x, y) {
                var paso = [];
    
                y.paso.sort((a,b) => a.orden-b.orden);
    
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
                        "vistoBueno": datay[0].vistoBuenoPaso === null ? false:datay[0].vistoBuenoPaso,
                        "vistoBuenoPaso": datay[0].vistoBuenoPaso === null ? false:datay[0].vistoBuenoPaso,
                        "usuarioActualiza": datay[0].usuarioActualiza,
                        "fechaActualizaPaso": datay[0].fechaActualizaPaso,
                        "etiquetaId_etiquetaId": datay[0].etiquetaId_etiquetaId,
                        "rmdEsEtiquetaId": y.rmdEsEtiquetaId,
                        "pasoHijo": []
                    };
    
                    $.each(datay, function (hijox, hijoy) {
                        var objHijoPaso = {
                            "estructura":"",
                        };
    
                        objHijoPaso.rmdEstructuraPasoInsumoPasoId = hijoy.rmdEstructuraPasoInsumoPasoId;
                        objHijoPaso.aplica = hijoy.aplica;
                        objHijoPaso.vistoBueno = hijoy.vistoBueno;
                        objHijoPaso.usuarioActualiza = hijoy.usuarioActualiza;
                        objHijoPaso.fechaActualizaPaso = hijoy.fechaActualiza;
    
                        if(hijoy.pasoHijoId){
                            objHijoPaso.id=hijoy.pasoHijoId_pasoId;
                            objHijoPaso.estructura="hijo";
                            objHijoPaso.decimales = hijoy.pasoHijoId.decimales;
                            objHijoPaso.codigo = hijoy.pasoHijoId.codigo;
                            objHijoPaso.descripcion = hijoy.pasoHijoId.descripcion;
                            objHijoPaso.fechaActualiza = hijoy.pasoHijoId.fechaActualiza;
                            objHijoPaso.estadoId_iMaestraId = hijoy.pasoHijoId.estadoId_iMaestraId;
                            objHijoPaso.margen = hijoy.pasoHijoId.margen;
                            objHijoPaso.numeracion = hijoy.pasoHijoId.numeracion;
                            objHijoPaso.valorFinal = hijoy.pasoHijoId.valorFinal;
                            objHijoPaso.valorInicial = hijoy.pasoHijoId.valorInicial;
                        }else if(hijoy.rmdEstructuraRecetaInsumoId){
                            objHijoPaso.id=hijoy.rmdEstructuraRecetaInsumoId_rmdEstructuraRecetaInsumoId;
                            objHijoPaso.estructura="receta";
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
                sobjectEstructuraCase.num=numEtiqueta+".";
                sobjectEstructuraCase.estructura="etiqueta";
                sobjectEstructuraCase.visible=false;
                sobjectEstructuraCase.id=y.Id;
                sobjectEstructuraCase.vistoBueno=y.vistoBueno === null ? false:y.vistoBueno;
                sobjectEstructuraCase.rmdEstructuraId_rmdEstructuraId=y.rmdEstructuraId_rmdEstructuraId;
                sobjectEstructuraCase.descripcion=y.descripcionEtiqueta;
                aEstructuraEtiqueta.push(sobjectEstructuraCase);
                $.each(y.paso, function (datax, datay) {
                    var sobjectEstructuraPasoCase = {};
                    var numEtiquetaPaso = numEtiqueta  + "." + (parseInt(datax)+1).toString();
                    sobjectEstructuraPasoCase.num = numEtiquetaPaso+".";
                    sobjectEstructuraPasoCase.estructura="paso";
                    sobjectEstructuraPasoCase.visible=true;
                    sobjectEstructuraPasoCase.id=datay.pasoId_pasoId;
                    sobjectEstructuraPasoCase.arrId=y.arrId;
                    sobjectEstructuraPasoCase.rmdEstructuraId_rmdEstructuraId=datay.rmdEstructuraId_rmdEstructuraId;
                    sobjectEstructuraPasoCase.descripcion = datay.descripcion;
                    sobjectEstructuraPasoCase.vistoBueno = datay.vistoBueno;
                    sobjectEstructuraPasoCase.vistoBuenoPaso = datay.vistoBuenoPaso;
                    sobjectEstructuraPasoCase.aplica = datay.aplica === null ? true:datay.aplica;
                    sobjectEstructuraPasoCase.etiquetaId = datay.etiquetaId_etiquetaId;
                    sobjectEstructuraPasoCase.rmdEsEtiquetaId = datay.rmdEsEtiquetaId;
                    sobjectEstructuraPasoCase.usuarioActualiza = datay.usuarioActualiza;
                    sobjectEstructuraPasoCase.fechaActualiza = datay.fechaActualiza;
                    aEstructuraEtiqueta.push(sobjectEstructuraPasoCase);
                    $.each(datay.pasoHijo, function (datahijox, datahijoy) {
                        var sobjectEstructuraHijoPasoCase = {};
                        var numEtiquetaHijoPaso = numEtiquetaPaso  + "." + (parseInt(datahijox)+1).toString();
                        sobjectEstructuraHijoPasoCase.num = numEtiquetaHijoPaso+".";
                        sobjectEstructuraHijoPasoCase.estructura=datahijoy.estructura;
                        sobjectEstructuraHijoPasoCase.visible=true;
                        sobjectEstructuraHijoPasoCase.id=datahijoy.id;
                        sobjectEstructuraHijoPasoCase.rmdEstructuraPasoInsumoPasoId=datahijoy.rmdEstructuraPasoInsumoPasoId;
                        sobjectEstructuraHijoPasoCase.descripcion = datahijoy.descripcion;
                        sobjectEstructuraHijoPasoCase.vistoBueno = datahijoy.vistoBueno;
                        sobjectEstructuraHijoPasoCase.aplica = datahijoy.aplica === null ? true:datahijoy.aplica;
                        sobjectEstructuraHijoPasoCase.rmdEstructuraId_rmdEstructuraId=datay.rmdEstructuraId_rmdEstructuraId;
                        sobjectEstructuraHijoPasoCase.usuarioActualiza = datahijoy.usuarioActualiza;
                        sobjectEstructuraHijoPasoCase.fechaActualiza = datahijoy.fechaActualizaPaso;
                        aEstructuraEtiqueta.push(sobjectEstructuraHijoPasoCase);
                    });
                });
            });
    
            $.each(aEstructuraEtiqueta, function (x, y) {
                var tListInsumoHistorico = [];
                if(y.estructura == "paso"){
                    tListInsumoHistorico = aListPasoHistorico.results.filter(item => item.pasoId_pasoId === y.id && item.rmdEstructuraId_rmdEstructuraId === y.rmdEstructuraId_rmdEstructuraId);
                }else if(y.estructura == "receta"){
                    tListInsumoHistorico = aListPasoHistorico.results.filter(item => item.rmdEstructuraRecetaInsumoId_rmdEstructuraRecetaInsumoId === y.id && item.rmdEstructuraId_rmdEstructuraId === y.rmdEstructuraId_rmdEstructuraId);
                }else if(y.estructura == "hijo"){
                    tListInsumoHistorico = aListPasoHistorico.results.filter(item => item.pasoHijoId_pasoId === y.id && item.rmdEstructuraId_rmdEstructuraId === y.rmdEstructuraId_rmdEstructuraId);
                }
    
                var tUltimoListInsumoHistorico = {};
    
                if(tListInsumoHistorico.length>0){
                    tListInsumoHistorico.sort((a,b) => a.fechaRegistro.getTime()-b.fechaRegistro.getTime());
                    tUltimoListInsumoHistorico = tListInsumoHistorico[tListInsumoHistorico.length - 1];
                }
                y.historico = tListInsumoHistorico;
                y.ultimaAccion = tUltimoListInsumoHistorico;
            });
    
            // oThat.modelGeneral.setProperty(model, aListObjectCase);
            oThat.modelGeneral.setProperty(model, aEstructuraEtiqueta);
    
          },

        onListFraction: async function () {
            let oFilterRmd = [];
            var LineaActual = oThat.modelGeneral.getProperty("/LineaActualMD");

            // oFilterRmd.push(new Filter("productoId", FilterOperator.EQ, LineaActual.productoId));
            oFilterRmd.push(new Filter("rmdId", FilterOperator.EQ, LineaActual.rmdId));
            let aListRMD = await registroService.getDataFilter(oThat.mainModelv2, "/RMD", oFilterRmd);
            let sUltimaFraccion = aListRMD.results[0].fraccion;
            // var aListRMD = await registroService.getDataExpand(oThat.mainModelv2, "/RMD", sExpand, oFilterRmd);

            let aListFracciones = [];
            for (let i = 0; i < sUltimaFraccion; i++) {
                let obj = {
                    rmdId : LineaActual.rmdId,
                    fraccion : i + 1
                }
                aListFracciones.push(obj);
            }
            oThat.modelGeneral.setProperty("/cmbFraction", aListFracciones);            

            if (!this.onFractionDetail) {
                this.onFractionDetail = sap.ui.xmlfragment(
                    "frgFraction",
                    rootPath + ".view.dialog.ListFraction",
                    this
                );
                this.getView().addDependent(this.onFractionDetail);
            }

            this.onFractionDetail.open();
        },

        onListFractionDelete: async function () {
            let oFilterRmd = [];
            var LineaActual = oThat.modelGeneral.getProperty("/LineaActualMD");

            // oFilterRmd.push(new Filter("productoId", FilterOperator.EQ, LineaActual.productoId));
            oFilterRmd.push(new Filter("rmdId", FilterOperator.EQ, LineaActual.rmdId));
            let aListRMD = await registroService.getDataFilter(oThat.mainModelv2, "/RMD", oFilterRmd);
            let sUltimaFraccion = aListRMD.results[0].fraccion;
            // var aListRMD = await registroService.getDataExpand(oThat.mainModelv2, "/RMD", sExpand, oFilterRmd);

            let aListFracciones = [];
            for (let i = 0; i < sUltimaFraccion; i++) {
                let obj = {
                    rmdId : LineaActual.rmdId,
                    fraccion : i + 1
                }
                aListFracciones.push(obj);
            }
            oThat.modelGeneral.setProperty("/cmbFractionDelete", aListFracciones);            

            if (!this.onFractionDetailDelete) {
                this.onFractionDetailDelete = sap.ui.xmlfragment(
                    "frgFractionDelete",
                    rootPath + ".view.dialog.ListFractionDelete",
                    this
                );
                this.getView().addDependent(this.onFractionDetailDelete);
            }

            this.onFractionDetailDelete.open();
        },

        onCancelFractionDelete: function () {
            this.onFractionDetailDelete.close();
        },

        onCancelFraction: function () {
            this.onFractionDetail.close();
        },

        onConfirmFraction: async function () {
            let oDataSeleccionada = oThat.getOwnerComponent().getModel("asociarDatos");
            let fraccionActual = oDataSeleccionada.getData().aEstructura.results[0].fraccion;
            let selectFraccion = oThat.modelGeneral.getProperty("/selectFraccionRmdId");
            if(selectFraccion == fraccionActual){
                this.onFractionDetail.close();
                return;
            }
            BusyIndicator.show(0);
            await sap.ui.controller("mif.rmd.registro.controller.MainView").getEstructurasRmdRefactory(selectFraccion);
            await oThat.onChangeEstructura();
            BusyIndicator.hide();
            this.onFractionDetail.close();
        },

        onConfirmFractionDelete: async function () {
            try {
                let oDataSeleccionada = oThat.getOwnerComponent().getModel("asociarDatos");
                let fraccionActual = oDataSeleccionada.getData().aEstructura.results[0].fraccion;
                let selectFraccion = oThat.modelGeneral.getProperty("/selectFraccionDelete");
                if (selectFraccion) {
                    selectFraccion = parseInt(selectFraccion);
                    if(selectFraccion == fraccionActual){
                        MessageBox.warning("No puede eliminar la fracci??n actual");
                        return;
                    }
                    let aFilters = [];
                    aFilters.push(new Filter("rmdId_rmdId", "EQ", oDataSeleccionada.getData().rmdId));
                    aFilters.push(new Filter("fraccion", "EQ", selectFraccion));
                    let aResponseDatos = await registroService.onGetDataGeneralFilters(oThat.mainModelv2, "RMD_VERIFICACION_FIRMAS", aFilters);
                    let aResponseEtiquetas = await registroService.onGetDataGeneralFilters(oThat.mainModelv2, "RMD_TABLA_CONTROL", aFilters);
                    let bFlag = true;
                    if (aResponseDatos.results.length === 0 && aResponseEtiquetas.results.length === 0) {
                        bFlag = true;
                    } else {
                        bFlag = false;
                    }
                    if (bFlag) {
                        BusyIndicator.show(0);
                        await oThat.onDeleteFraccion(selectFraccion);
                        BusyIndicator.hide();
                        oThat.modelGeneral.setProperty("/selectFraccionDelete", "");
                        oThat.onCancelFractionDelete();
                        MessageBox.success("La fracci??n se elimin?? correctamente.");
                    } else {
                        MessageBox.warning("No se puede eliminar la fracci??n seleccionada.");
                    }
                } else {
                    MessageBox.warning("Debe seleccionar la fracci??n a eliminar.");
                }
            } catch (oError) {
                MessageBox.error(oError.responseText);
            }
        },

        createColumnProceso: function (array, oTable) {
            array.forEach(element => {
                if(element.Cod == "code"){
                    const oColumn = new sap.m.Column({
                        width: "8%",
                        hAlign: "Begin",
                        header: new sap.m.Label({
                            text: element.text
                        })
                    });
                    oTable.addColumn(oColumn);
                }else if(element.Cod == "codeCenter"){
                    const oColumn = new sap.m.Column({
                        width: "18%",
                        hAlign: "Center",
                        header: new sap.m.Label({
                            text: element.text
                        })
                    });
                    oTable.addColumn(oColumn);
                }else{
                    const oColumn = new sap.m.Column({
                        width: "auto",
                        header: new sap.m.Label({
                            text: element.text
                        })
                    });
                    oTable.addColumn(oColumn);
                }
            
            });
        },

        createCellProceso: function (array, oTable) {
            var regitroLector = oThat.modelGeneral.getProperty("/oInfoUsuario/funcionUsuario/registroLector");
            var butonEnabledGeneral = false;
            if(regitroLector){
                butonEnabledGeneral = false;
            }else{
                butonEnabledGeneral = true;
            }
            var aListTiposDatos = oThat.modelGeneral.getProperty("/tiposDatos");
            var usuarioActualizaFooter = "";
            var oUsuarioActualizaFooter = [];
            var oFechaFooter = [];
            var oRmdEstructuraId = [];
            array.forEach(element => {
                if(element.fechaActualiza){
                    oFechaFooter.push(element.fechaActualiza.getTime());
                }

                if(element.rmdEstructuraId_rmdEstructuraId){
                    oRmdEstructuraId.push(element.rmdEstructuraId_rmdEstructuraId);
                }
                const aCells = [];

                var cell1 = new sap.m.Text({
                    text: element.num
                });

                var cell2 = new sap.m.Text({
                    text: element.descripcion
                });

                var cell3 = new sap.m.VBox({
                    visible: element.visible,
                    alignItems: "Center"
                });

                let bVerificationCheck = false;

                if(element.estructura == "paso"){
                    bVerificationCheck = element.vistoBuenoPaso;
                }else{
                    bVerificationCheck = element.vistoBueno;
                }

                var chekcBoxAprovador = new sap.m.CheckBox({
                    enabled: element.aplica,
                    text: "",
                    selected: bVerificationCheck,
                    select: [oThat.onSaveCheckAprovProceso]
                });
                
                var usuarioActualiza = "";

                var nameClass = "TextStyleNone";
                if(element.historico.length>0){
                    if(bVerificationCheck){
                        usuarioActualiza = element.usuarioActualiza
                        oUsuarioActualizaFooter.push(element.usuarioActualiza);

                        // if(element.ultimaAccion.rol == "rmd_registrador"){
                        //     nameClass = "TextStyleNone";
                        // }else if(element.ultimaAccion.rol == "rmd_jefe_prod"){
                        //     nameClass = "TextStyleJefe";
                        // }else if(element.ultimaAccion.rol == "rmd_gerente_prod"){
                        //     nameClass = "TextStyleNone";
                        // }else if(element.ultimaAccion.rol == "rmd_jefe_dt"){
                        //     nameClass = "TextStyleNone";
                        // }else if(element.ultimaAccion.rol == "RMD_AUXILIAR"){
                        //     nameClass = "TextStyleAuxiliar";
                        // }else if(element.ultimaAccion.rol == "CP_SUPERVISOR_PROD"){
                        //     nameClass = "TextStyleSupervisor";
                        // }else if(element.ultimaAccion.rol == "RMD_CONTROL_CALIDAD"){
                        //     nameClass = "TextStyleControlCalidad";
                        // }else if(element.ultimaAccion.rol == "RMD_CONTROL_PROCESO"){
                        //     nameClass = "TextStyleControlProcesos";
                        // }
                        nameClass = formatter.selectedColor(element.ultimaAccion.rol);
                    }else{
                        usuarioActualiza = "Modificado";
                        nameClass = "TextStyleModificar";
                    }
                }else{
                    if(bVerificationCheck){
                        usuarioActualiza = element.usuarioActualiza
                        oUsuarioActualizaFooter.push(element.usuarioActualiza);
                    }
                }

                var textAprovador = new sap.m.Title({
                    text: usuarioActualiza
                });
                textAprovador.addStyleClass(nameClass)

                cell3.addItem(chekcBoxAprovador);
                cell3.addItem(textAprovador);

                var cell4 = oThat.createMenuProceso(element.code, element.aplica, element.visible);
                
                if(regitroLector){
                    chekcBoxAprovador.setEnabled(butonEnabledGeneral);
                    cell4.setEnabled(butonEnabledGeneral);
                }

                aCells.push(cell1);
                aCells.push(cell2);
                aCells.push(cell3);
                aCells.push(cell4);

                const oRow = new sap.m.ColumnListItem({
                    cells: aCells ,
                });

                oRow.oParam = {
                    // sControl: aFindTipoDato.control,
                    sCode: element.id,
                    rmdEstructuraId_rmdEstructuraId: element.rmdEstructuraId_rmdEstructuraId,
                    sPasoId: element.rmdEstructuraPasoInsumoPasoId,
                    sPasoIdArr: element.arrId,
                    sTipo: element.estructura,
                    sEstructura: element.estructura,
                    sDescripcion: element.description,
                    rmdEsEtiquetaId: element.rmdEsEtiquetaId,
                    etiquetaId: element.etiquetaId,
                    bAplica: true
                };
                oTable.addItem(oRow);
            });

            const aCellsFooter = [];

            const oLabelVerificado = new sap.m.Label({
                design: "Bold",
                text: "Verificado por : "
            });

            if(oUsuarioActualizaFooter.length > 0){
                usuarioActualizaFooter = oUsuarioActualizaFooter.join();
            }

            const oLabelUsuarioActualFooter = new sap.m.Text({
                text: usuarioActualizaFooter
            })

            var cell1Footer =  new sap.m.Label({
                text: ""
            })

            var cell2Footer =  new sap.m.HBox({
                wrap: "Wrap",
                items: [oLabelVerificado, oLabelUsuarioActualFooter]
            })

            const oLabelFecha = new sap.m.Label({
                design: "Bold",
                text: "Fecha : "
            })

            var FechaFooter = "";
            if(oFechaFooter.length > 0){
                var dateFormat = sap.ui.core.format.DateFormat.getDateInstance({pattern : "dd-MM-YYYY HH:MM" });
                FechaFooter = formatter.formatDateFooter(new Date(Math.min(...oFechaFooter)));
            }

            const oLabelFechaFooter = new sap.m.Label({
                text: FechaFooter
            })

            var cell3Footer =  new sap.m.HBox({
                items: [oLabelFecha, oLabelFechaFooter]
            });

            var cell4Footer =  oThat.createMenuHistorialFooter();

            aCellsFooter.push(cell1Footer);
            aCellsFooter.push(cell2Footer);
            aCellsFooter.push(cell3Footer);
            aCellsFooter.push(cell4Footer);

            const oRowFooter = new sap.m.ColumnListItem({
                cells: aCellsFooter
            });

            oRowFooter.oParam = {
                oModel: "/RMD_ES_PASO_INSUMO_PASO_HISTORIAL",
                rmdEstructuraId_rmdEstructuraId: oRmdEstructuraId,
                bAplica: true
            };

             oTable.addItem(oRowFooter);
        },

        createMenuProceso: function (PasoId, aplica, visible) {
            let oInfoUsuario = oThat.modelGeneral.getProperty("/oInfoUsuario");
            var regitroLector = oThat.modelGeneral.getProperty("/oInfoUsuario/funcionUsuario/registroLector");
            var butonEnabledGeneral = false;
            if(regitroLector){
                butonEnabledGeneral = false;
            }else{
                butonEnabledGeneral = true;
            }
            var aMenu = []
            var oMenuitem1 = new sap.m.MenuItem({
                                                text: oThat.i18n.getText("mnObservationXStep"),
                                                icon: "sap-icon://show",
                                                title: "ss",
                                                press: [oThat.onAddObservationLineal]
                                            });

            var oMenuitem2 = new sap.m.MenuItem({
                                                text: oThat.i18n.getText("mnHistoryXStep"),
                                                icon: "sap-icon://activity-items",
                                                press: [oThat.onGetHistoryStepProceso]
                                            });
            
            var i18nAplica = oThat.i18n.getText("mnApplyStep");
            var iconAplica =  "sap-icon://less";
            if(!aplica){
                i18nAplica = oThat.i18n.getText("mnApplyActivateStep");
                iconAplica =  "sap-icon://add";
            }
                                            
            var oMenuitem3 = new sap.m.MenuItem({
                                                enabled:butonEnabledGeneral,
                                                text: i18nAplica,
                                                icon: iconAplica,
                                                press: [oThat.onNoAplicaProceso],
                                                visible: oInfoUsuario.rol[codigoUserPrueba].codigo == "rmd_jefe_prod" ? true : false
                                            });
                                            
            aMenu.push(oMenuitem1);
            aMenu.push(oMenuitem2);
            aMenu.push(oMenuitem3);

            var oMenu = new sap.m.Menu({ 
                items: aMenu
            });
            
            return new sap.m.MenuButton({
                visible: visible,             
                icon: "sap-icon://text-align-justified",
                tooltip: oThat.i18n.getText("lblOption"),
                menu: oMenu
            });
        },

        onSaveCheckAprovProceso:async function(oEvent, confirm){
            oThat.modelGeneral.setProperty("/passwordValidate","");
          if(!confirm){
              var evento = oEvent;
              if(!oThat.onValidateUserProceso){
                  oThat.onValidateUserProceso = sap.ui.xmlfragment(
                      "frgListUser",
                      rootPath + ".view.dialog.ValidationUserProceso",
                      oThat
                  );
                  oThat.getView().addDependent(oThat.onValidateUserProceso);
              }
              oThat.onValidateUserProceso.open();
              oEvent.getSource().setSelected(!oEvent.getSource().getSelected());
              oThat.modelGeneral.setProperty("/oEventVistoBueno",evento.getSource());
              return;
          }

            // const oSource = oEvent.getSource();
            const oSource = oThat.modelGeneral.getProperty("/oEventVistoBueno");
            oSource.setSelected(!oSource.getSelected());
            const oParam = oSource.getParent().getParent().oParam;

            let oInfoUsuario = oThat.modelGeneral.getProperty("/oInfoUsuario");
  
            var VBox = oSource.getParent();
            var row = oSource.getParent().getParent();
            var oItems = oSource.getParent().getParent().getParent().getItems();
            const oControl2 = row.getCells()[2];
            var oFooter = oItems[oItems.length-1];
  
            const oLabelUserVer = oFooter.getCells()[1].getItems()[1];
            const oLabelFecha = oFooter.getCells()[2].getItems()[1];
  
            const sId = oParam.sId;
            const sPasoId = oParam.sPasoId;
            const sUsuario = "USUARIOVB";
            BusyIndicator.show(0);
            let oEsEstructura = {};
              oEsEstructura.usuarioActualiza = oInfoUsuario.data.usuario;
              oEsEstructura.fechaActualiza = new Date();
  
              var oFilterDet = [];
              oFilterDet.splice(0, oFilterDet.length);
              oFilterDet.push(new Filter("rmdEstructuraId_rmdEstructuraId", FilterOperator.EQ, oParam.rmdEstructuraId_rmdEstructuraId));
  
              oThat.saveLineaActualProcesoHistorial(oParam, String(oSource.getSelected()), "VERIFICACHECK");

              if(oParam.sTipo=="paso"){
                  oEsEstructura.vistoBuenoPaso = oSource.getSelected();
                  for(var i=0;i<oParam.sPasoIdArr.length;i++){
                    oEsEstructura.rmdEstructuraPasoInsumoPasoId =oParam.sPasoIdArr[i];
                    await registroService.updateEsPasoInsumoRmd(oThat.mainModelv2, "/RMD_ES_PASO_INSUMO_PASO", oEsEstructura);
                }
              }else if(oParam.sTipo=="receta"){
                    oEsEstructura.vistoBueno = oSource.getSelected();
                    oEsEstructura.rmdEstructuraPasoInsumoPasoId = sPasoId;
                  await registroService.updateEsPasoInsumoRmd(oThat.mainModelv2, "/RMD_ES_PASO_INSUMO_PASO", oEsEstructura);
              }else if(oParam.sTipo=="hijo"){
                oEsEstructura.vistoBueno = oSource.getSelected();
                oEsEstructura.rmdEstructuraPasoInsumoPasoId = sPasoId;
                await registroService.updateEsPasoInsumoRmd(oThat.mainModelv2, "/RMD_ES_PASO_INSUMO_PASO", oEsEstructura);
              }
              
              var aListInsumo= await registroService.getDataExpand(oThat.mainModelv2, "/RMD_ES_PASO_INSUMO_PASO", "rmdEstructuraId", oFilterDet);
  
              var oUsuarioActualizaFooter = [];
              var usuarioActualizaFooter = "";
              var oFechaFooter = [];
              var FechaFooter = "";

                $.each(aListInsumo.results.groupBy('etiquetaId_etiquetaId'), function (datax, datay) {
                    if(datay[0].vistoBuenoPaso){
                        if(datay[0].usuarioActualiza){
                            oUsuarioActualizaFooter.push(datay[0].usuarioActualiza);
                        }
                        if(datay[0].fechaActualiza){
                            oFechaFooter.push(datay[0].fechaActualiza.getTime());
                        }
                    }
                });
            
              aListInsumo.results.forEach(element => {
                    if(element.vistoBueno){
                        if(element.usuarioActualiza){
                            oUsuarioActualizaFooter.push(element.usuarioActualiza);
                        }
                        if(element.fechaActualiza){
                            oFechaFooter.push(element.fechaActualiza.getTime());
                        }
                    }
              });

              var nameClass="TextStyleNone";

            /*     if(oInfoUsuario.rol[1].codigo == "rmd_registrador"){
                    nameClass = "TextStyleNone";
                }else if(oInfoUsuario.rol[1].codigo == "rmd_jefe_prod"){
                    nameClass = "TextStyleJefe";
                }else if(oInfoUsuario.rol[1].codigo == "rmd_gerente_prod"){
                    nameClass = "TextStyleNone";
                }else if(oInfoUsuario.rol[1].codigo == "rmd_jefe_dt"){
                    nameClass = "TextStyleNone";
                }else if(oInfoUsuario.rol[1].codigo == "RMD_AUXILIAR"){
                    nameClass = "TextStyleAuxiliar";
                }else if(oInfoUsuario.rol[1].codigo == "CP_SUPERVISOR_PROD"){
                    nameClass = "TextStyleSupervisor";
                }else if(oInfoUsuario.rol[1].codigo == "RMD_CONTROL_CALIDAD"){
                    nameClass = "TextStyleControlCalidad";
                }else if(oInfoUsuario.rol[1].codigo == "RMD_CONTROL_PROCESO"){
                    nameClass = "TextStyleControlProcesos";
                } */
                formatter
              if(oUsuarioActualizaFooter.length > 0){
                  usuarioActualizaFooter = oUsuarioActualizaFooter.join();
              }

                if(oFechaFooter.length > 0){
                    var dateFormat = sap.ui.core.format.DateFormat.getDateInstance({pattern : "dd-MM-YYYY HH:MM" });
                    FechaFooter = formatter.formatDateFooter(new Date(Math.min(...oFechaFooter)));
                }
  
              if(oSource.getSelected()){
                VBox.getItems()[1].removeStyleClass("TextStyleModificar TextStyleJefe TextStyleAuxiliar TextStyleSupervisor TextStyleControlCalidad TextStyleControlProcesos TextStyleNone");
                VBox.getItems()[1].setText(oEsEstructura.usuarioActualiza);
                VBox.getItems()[1].addStyleClass(nameClass);
              }else{
                VBox.getItems()[1].removeStyleClass("TextStyleModificar TextStyleJefe TextStyleAuxiliar TextStyleSupervisor TextStyleControlCalidad TextStyleControlProcesos TextStyleNone");
                VBox.getItems()[1].setText("Modificado");
                VBox.getItems()[1].addStyleClass("TextStyleModificar");
              }
  
              oLabelUserVer.setText(usuarioActualizaFooter);

              oLabelFecha.setText(FechaFooter);
  
              BusyIndicator.hide();
        },

        onGetHistoryStepProceso: function (oEvent) {
            var oParam = oEvent.getSource().getParent().getParent().getParent().oParam;
            var oFilterDet = [];
            let aListHistory = [];

            if(oParam.sTipo == "receta"){
                oFilterDet.push(new Filter("rmdEstructuraRecetaInsumoId_rmdEstructuraRecetaInsumoId", FilterOperator.EQ, oParam.sCode));
                oFilterDet.push(new Filter("rmdEstructuraId_rmdEstructuraId", FilterOperator.EQ, oParam.rmdEstructuraId_rmdEstructuraId));
                aListHistory = registroService.getDataExpand(oThat.mainModelv2, "/RMD_ES_PASO_INSUMO_PASO_HISTORIAL", "rmdEstructuraRecetaInsumoId", oFilterDet);
            }else if(oParam.sTipo == "hijo"){
                oFilterDet.push(new Filter("pasoHijoId_pasoId", FilterOperator.EQ, oParam.sCode));
                oFilterDet.push(new Filter("rmdEstructuraId_rmdEstructuraId", FilterOperator.EQ, oParam.rmdEstructuraId_rmdEstructuraId));
                aListHistory = registroService.getDataExpand(oThat.mainModelv2, "/RMD_ES_PASO_INSUMO_PASO_HISTORIAL", "pasoHijoId", oFilterDet);
            }else if(oParam.sTipo == "paso"){
                oFilterDet.push(new Filter("pasoId_pasoId", FilterOperator.EQ, oParam.sCode));
                oFilterDet.push(new Filter("rmdEstructuraId_rmdEstructuraId", FilterOperator.EQ, oParam.rmdEstructuraId_rmdEstructuraId));
                aListHistory = registroService.getDataExpand(oThat.mainModelv2, "/RMD_ES_PASO_INSUMO_PASO_HISTORIAL", "pasoId", oFilterDet);
            }

            aListHistory.then(r => {
                r.results = r.results.sort(function(a, b) {
                    return a.fechaRegistro - b.fechaRegistro;
                });
                oThat.modelGeneral.setProperty("/tblHistorial", r.results);
            
                if (!oThat.onHistoryStep) {
                    oThat.onHistoryStep = sap.ui.xmlfragment(
                        "frgHistoryStep",
                        rootPath + ".view.dialog.History",
                        oThat
                    );
                    oThat.getView().addDependent(oThat.onHistoryStep);
                }

                oThat.onHistoryStep.open();
            });
        },

        saveLineaActualProcesoHistorial:function(oEsEstructura, sValor, sDesPaso){
            var oEsHistorico = {};
            var oEsEstructuraHistorial = {};
            let oInfoUsuario = oThat.modelGeneral.getProperty("/oInfoUsuario");
            oEsEstructuraHistorial.descripcion         = sDesPaso;
            oEsEstructuraHistorial.terminal            = '';
            oEsEstructuraHistorial.valor               = sValor;
            oEsEstructuraHistorial.usuarioRegistro     = oInfoUsuario.data.usuario;
            oEsEstructuraHistorial.fechaRegistro       = new Date();
            oEsEstructuraHistorial.activo              = true;
            oEsEstructuraHistorial.rol                  = oInfoUsuario.rol[codigoUserPrueba].codigo;
            oEsEstructuraHistorial.rmdEstructuraId_rmdEstructuraId = oEsEstructura.rmdEstructuraId_rmdEstructuraId;
            if(oEsEstructura.sTipo == "receta" ){
                oEsEstructuraHistorial.rmdHistoriaEstructuraPasoInsumoPasoId  = util.onGetUUIDV4();
                oEsEstructuraHistorial.rmdEstructuraRecetaInsumoId_rmdEstructuraRecetaInsumoId = oEsEstructura.sCode;
                registroService.createData(oThat.mainModelv2, "/RMD_ES_PASO_INSUMO_PASO_HISTORIAL", oEsEstructuraHistorial).then(function () {
                
                }.bind(oThat), function (error) {
                    console.log(error);
                    MessageBox.error(oThat.getView().getModel("i18n").getResourceBundle().getText("errorCreateLapso"));
                    BusyIndicator.hide();
                });
            }else if (oEsEstructura.sTipo == "hijo" ){
                oEsEstructuraHistorial.rmdHistoriaEstructuraPasoInsumoPasoId  = util.onGetUUIDV4();
                oEsEstructuraHistorial.pasoHijoId_pasoId = oEsEstructura.sCode;
                registroService.createData(oThat.mainModelv2, "/RMD_ES_PASO_INSUMO_PASO_HISTORIAL", oEsEstructuraHistorial).then(function () {
                
                }.bind(oThat), function (error) {
                    console.log(error);
                    MessageBox.error(oThat.getView().getModel("i18n").getResourceBundle().getText("errorCreateLapso"));
                    BusyIndicator.hide();
                });
            }else if(oEsEstructura.sTipo == "paso" ){
                oEsEstructuraHistorial.rmdHistoriaEstructuraPasoInsumoPasoId  = util.onGetUUIDV4();
                oEsEstructuraHistorial.pasoId_pasoId = oEsEstructura.sCode;

                registroService.createData(oThat.mainModelv2, "/RMD_ES_PASO_INSUMO_PASO_HISTORIAL", oEsEstructuraHistorial).then(function () {
                
                }.bind(oThat), function (error) {
                    console.log(error);
                    MessageBox.error(oThat.getView().getModel("i18n").getResourceBundle().getText("errorCreateLapso"));
                    BusyIndicator.hide();
                });
            }

            
        },
            
        onNoAplicaProceso: async function(oEvent){
            const oParam = oEvent.getSource().getParent().getParent().getParent().oParam;
            let oInfoUsuario = oThat.modelGeneral.getProperty("/oInfoUsuario");

            oParam.bAplica = false
            const VBoxChek = oEvent.getSource().getParent().getParent().getParent().getCells()[2].getItems();
            const Chek = VBoxChek[0];
            const oRows = oEvent.getSource().getParent().getParent().getParent().getParent().mAggregations.items;

            const sId = oParam.sCode;
            const sTipo = oParam.sTipo;
            const sUsuario = "USUARIOVB";
            const sPasoId = oParam.sPasoId;
            BusyIndicator.show(0);
            let oEsProceso = {};
            var booleanSelect = Chek.getEnabled();

            if(booleanSelect){
                Chek.setEnabled(oParam.bAplica);
                oEvent.getSource().setText(oThat.i18n.getText("mnApplyActivateStep"));
                oEvent.getSource().setIcon("sap-icon://add");
            }else if(!booleanSelect){
                Chek.setEnabled(!oParam.bAplica);
                oEvent.getSource().setText(oThat.i18n.getText("mnApplyStep"));
                oEvent.getSource().setIcon("sap-icon://less");
            }

            oEsProceso.usuarioActualiza = oInfoUsuario.data.usuario;
            oEsProceso.fechaActualiza = new Date();
            oEsProceso.aplica = !booleanSelect;

            oThat.saveLineaActualProcesoHistorial(oParam, String(!booleanSelect), "APLICAPASO");

            if(oParam.sTipo=="paso"){
                oEsProceso.rmdEstructuraPasoInsumoPasoId = sPasoId;
                await registroService.updateEsPasoInsumoRmd(oThat.mainModelv2, "/RMD_ES_PASO_INSUMO_PASO", oEsProceso);
            }else if(oParam.sTipo=="receta"){
                oEsProceso.rmdEstructuraPasoInsumoPasoId = sPasoId;
                await registroService.updateEsPasoInsumoRmd(oThat.mainModelv2, "/RMD_ES_PASO_INSUMO_PASO", oEsProceso);
            }else if(oParam.sTipo=="hijo"){
                oEsProceso.rmdEstructuraPasoInsumoPasoId = sPasoId;
                await registroService.updateEsPasoInsumoRmd(oThat.mainModelv2, "/RMD_ES_PASO_INSUMO_PASO", oEsProceso);
            }
            
            BusyIndicator.hide(0);
        },

        openFullColorSample: function (oEvent) {
            var oTbl = oEvent.getSource().getParent().getParent().getParent();
            var oParam = oTbl.oParam;

            oThat.modelGeneral.setProperty("/colorHex", "");
			oThat.modelGeneral.setProperty("/colorRgb", "");

            if(!oThat.onListColor){
                oThat.onListColor = sap.ui.xmlfragment(
                    "frgListColor",
                    rootPath + ".view.dialog.SelectColor",
                    oThat
                );
                oThat.getView().addDependent(oThat.onListColor);
            }
            oThat.onListColor.open();
		},

        openImagenSample: function (oEvent) {
            var oTbl = oEvent.getSource().getParent().getParent().getParent();
            var oParam = oTbl.oParam;
            oThat.modelGeneral.setProperty("/pasoImagenSelected", oParam);
            var oEstructura = oEvent.getSource().getBindingContext("modelEstructura").getObject();
            oThat.modelGeneral.setProperty("/estructuraImagenSelected", oEstructura);
            if(!oThat.onImagen){
                oThat.onImagen = sap.ui.xmlfragment(
                    "frgListImagen",
                    rootPath + ".view.dialog.SelectImagen",
                    oThat
                );
                oThat.getView().addDependent(oThat.onImagen);
            }
            oThat.onImagen.open();
        },

        onUploadImagen: function (oEvent) {
            var oFile = oEvent.getParameter("files")[0];
            oThat.modelGeneral.setProperty("/aListaImagen", []);
            if (oFile) {
                if(oFile.size / 1000000 <= iMaxLengthArchivos){
                    var reader = new FileReader();
                    reader.onload = function (result) {
                        var byteArray = new Uint8Array(result.target.result);
                        var obj = {
                            'name': oFile.name,
                            'fileData': byteArray
                        }
                        var aListaArchivos = oThat.modelGeneral.getProperty("/aListaImagen");
                        if(!aListaArchivos.imagen) {
                            aListaArchivos.imagen = [];
                        }
                        aListaArchivos.imagen.push(obj);
                        oThat.modelGeneral.refresh(true);
                    };
                    reader.readAsArrayBuffer(oFile);
                } else {
                    MessageToast.show("El archivo supera el tama??o m??ximo permitido.")
                    sap.ui.core.Fragment.byId("frgListImagen", "fu_selectImagen").setValue(null);
                }
            }
        },

        onConfirmSelectImagen: function() {
			var aListaImagen = oThat.modelGeneral.getProperty("/aListaImagen");
            var lineaSeleccionada = oThat.modelGeneral.getProperty("/LineaActualMD");
            let oInfoUsuario = oThat.modelGeneral.getProperty("/oInfoUsuario");
            var pasoSelected = oThat.modelGeneral.getProperty("/pasoImagenSelected");
            var estructuraSelected = oThat.modelGeneral.getProperty("/estructuraImagenSelected");
            aListaImagen.imagen.forEach(async function(e){
                e.origen = "ImagenRMD";
                e.mdId = lineaSeleccionada.rmdId;
                e.estructuraId = estructuraSelected.rmdEstructuraId;
                e.pasoId = pasoSelected.sPasoId;

                var oParam = {
                    usuarioActualiza    : oInfoUsuario.data.usuario,
                    fechaActualiza      : new Date(),
                    archivoMD           : JSON.stringify(e)
                }
                // await registroService.onUpdateDataGeneral(oThat.mainModelv2, "/MD", oParam, lineaSeleccionada.rmdId);
            });
            oThat.onCancelSelectImagen();
		},

        onCancelSelectImagen: function () {
            oThat.onImagen.close();
            sap.ui.core.Fragment.byId("frgListImagen", "fu_selectImagen").setValue(null);
        },

        onConfirmSelectColor: function(color) {
			oThat.modelGeneral.setProperty("/colorHex", oThat.onListColor.getContent()[0].Color.hex);
			oThat.modelGeneral.setProperty("/colorRgb", oThat.onListColor.getContent()[0].getColorString());
            oThat.onListColor.close();
		},

        onCancelSelectColor: function () {
            oThat.onListColor.close();
            oThat.modelGeneral.setProperty("/colorHex", "");
			oThat.modelGeneral.setProperty("/colorRgb", "");
          },
        
        // Para los insumos, el Barcode.
        onOpenBarcode: function() {
            try {
                let oDataSeleccionada = oThat.getOwnerComponent().getModel("asociarDatos"),
                    fraccionActual = oDataSeleccionada.getData().aEstructura.results[0].fraccion;
                sap.ndc.BarcodeScanner.scan(
                    async function (oResult) {
                        if (!oResult.cancelled && oResult.text) {
                            let sCodigo = oResult.text;
                            // if(oResult.text.length != 18){
                            // 	Message.showMessage1([{
                            //     	MESSAGE : "La cantidad del material con el lote debe ser de 18 caracteres.",
                            //     	TYPE: "E"
                            //     }]);
                            //     sap.ui.core.BusyIndicator.hide();
                            //     return false;
                            // }

                            let aCodigo = sCodigo.split("$"),
                                sIdBulto = aCodigo[0],
                                sIdInsumo = aCodigo[1],
                                sLote = aCodigo[2];
                            sap.ui.core.BusyIndicator.show(0);
                            oThat.onGetDataInsumoBultoPedido(sIdBulto, sIdInsumo, sLote).then(async function(aDataPedido){
                                let aListInsumosAssignResponsive = oThat.getView().getModel("aListInsumosAssignResponsive"),
                                    oInsumosAssignResponsive;
                                for await (const oItem of aListInsumosAssignResponsive.getData()) {
                                    if (oItem.Component === sIdInsumo) {
                                        oInsumosAssignResponsive = oItem;
                                    }
                                }
                                if (!oInsumosAssignResponsive) {
                                    MessageBox.warning(formatter.onGetI18nText(oThat, "sNoRegistroSeleccionado"));
                                    sap.ui.core.BusyIndicator.hide();
                                    return false;
                                }
                                if (aDataPedido.d.results.length > 0) {
                                    let oDataPedido = aDataPedido.d.results[0];
                                    oThat.onGetDataInsumoBulto(oDataPedido).then(async function(aDataInsumo){
                                        if (aDataInsumo.value.length > 0) {
                                            oInsumosAssignResponsive.cantidadBarCode = oInsumosAssignResponsive.cantidadBarCode + aDataInsumo.value[0].cantPedida;
                                            if (!oInsumosAssignResponsive.numeroBultos || oInsumosAssignResponsive.numeroBultos === '') {
                                                oInsumosAssignResponsive.numeroBultos = 0;
                                            }

                                            // Actualizar los datos scanneados por el codigo QR.
                                            let oDatainsumo = {
                                                numeroBultos: oInsumosAssignResponsive.numeroBultos + 1,
                                                verifCheck: true,
                                                usuarioActualiza: oInfoUsuario.data.usuario,
                                                fechaActualiza: new Date()
                                            }
                                            await registroService.onUpdateDataGeneral(oThat.mainModelv2, "RMD_ES_RE_INSUMO", oDatainsumo, oInsumosAssignResponsive.rmdEstructuraRecetaInsumoId);

                                            // Validar las cantidades por fracciones.
                                            let aFilters = [];
                                            aFilters.push(new Filter("rmdId_rmdId", "EQ", oInsumosAssignResponsive.rmdId_rmdId));
                                            aFilters.push(new Filter("rmdEstructuraId_rmdEstructuraId", "EQ", oInsumosAssignResponsive.rmdEstructuraId_rmdEstructuraId));
                                            aFilters.push(new Filter("rmdRecetaId_rmdRecetaId", "EQ", oInsumosAssignResponsive.rmdRecetaId_rmdRecetaId));
                                            let aListInsumos = await registroService.onGetDataGeneralFilters(oThat.mainModelv2, "RMD_ES_RE_INSUMO", aFilters);
                                            let nCantidadTotal = 0;
                                            
                                            // Se suman de todas las fracciones para ver si cumplen en conjunto el tope indicado.
                                            for await (const oItem of aListInsumos.results) {
                                                nCantidadTotal = nCantidadTotal + Number(oItem.cantidadBarCode);
                                            }

                                            // Se actualiza el check a cada una de las fracciones si cumple con la condicion.
                                            if (Number(nCantidadTotal) >= Number(oInsumosAssignResponsive.cantidadRm)) {
                                                for await (const oItem of aListInsumos.results) {
                                                    let oData = {
                                                        verifCheck: true,
                                                        usuarioActualiza: oInfoUsuario.data.usuario,
                                                        fechaActualiza: new Date()
                                                    }
                                                    await registroService.onUpdateDataGeneral(oThat.mainModelv2, "RMD_ES_RE_INSUMO", oData, oItem.rmdEstructuraRecetaInsumoId);
                                                    MessageBox.success(oThat.i18n.getText("msgCompleteDataInsumo"));
                                                }
                                            }
                                            BusyIndicator.show(0);
                                            await sap.ui.controller("mif.rmd.registro.controller.MainView").getEstructurasRmdRefactory(fraccionActual);
                                            await oThat.onChangeEstructura();
                                            BusyIndicator.hide();
                                        } else {
                                            MessageBox.error(oThat.i18n.getText("msgNoDataInsumo"));
                                            sap.ui.core.BusyIndicator.hide();
                                        }
                                    }).catch(function(reject){
                                        oThatConf.onErrorMessage(reject, "errorSave");
                                        sap.ui.core.BusyIndicator.hide();
                                    });
                                }
                            }).catch(function(reject){
                                oThatConf.onErrorMessage(reject, "errorSave");
                                sap.ui.core.BusyIndicator.hide();
                            });
                        } else {
                            MessageBox.error(oThat.i18n.getText("msgNoDataInsumoQR"));
                            sap.ui.core.BusyIndicator.hide();
                        }
                    },
                    function (oError) {
                        MessageBox.error(oError);
                        sap.ui.core.BusyIndicator.hide();
                    },
                    function (mLive) { 
                        if (mLive.newValue && mLive.newValue.length > 0) {
                            // alert(JSON.stringify(mLive));
                        }
                    }
                );
            } catch (oError) {
                oThatConf.onErrorMessage(oError, "errorSave");
            }
		},

        onSearch: function () {
            try {
                var sTable = sap.ui.getCore().byId("frgAdicNewMdEquipment--idTblEquipment");
                var oDataFilter = oThat.modelGeneral.getProperty("/oDataFilterEquipoUtensilio");
                var aFilter = [];
                if (oDataFilter.codigo) {
                    aFilter.push(new Filter("equnr", FilterOperator.Contains, oDataFilter.codigo));
                }
                if (oDataFilter.descript) {
                    aFilter.push(new Filter("eqktx", FilterOperator.Contains, oDataFilter.descript));
                }
                if (oDataFilter.codGaci) {
                    aFilter.push(new Filter("abckz", FilterOperator.Contains, oDataFilter.codGaci));
                }
                if (oDataFilter.estado) {
                    aFilter.push(new Filter("estat", FilterOperator.Contains, oDataFilter.estado));
                }
                sTable.getBinding("items").filter(aFilter, FilterType.Application);
            } catch (oError) {
                oThatConf.onErrorMessage(oError, "errorSave");
            }
        },

        onOpenDialogEstado: async function () {
            var sOptionTextApplyStep = oThat.i18n.getText("mnApplyStep");
            let aFilter = [];
            aFilter.push(new Filter("oMaestraTipo_maestraTipoId", "EQ", "44"));
            let consultarEstadoRMDResponse = await registroService.getDataFilter(oThat.mainModelv2, "/MAESTRA", aFilter);
            let dataEstado = [];
            consultarEstadoRMDResponse.results.sort(function (a, b) {
                return a.orden - b.orden;
            });
            consultarEstadoRMDResponse.results.forEach(function(oEstado){
                var oParam = {
                    number : oEstado.orden,
                    estado : oEstado.contenido,
                    responsable : oEstado.campo1,
                    comentario : oEstado.descripcion.split("/")[0],
                    comentario2 : oEstado.descripcion.split("/")[1] ? oEstado.descripcion.split("/")[1] : "",
                    comentario3 : oEstado.descripcion.split("/")[2] ? oEstado.descripcion.split("/")[2] : ""
                }
                dataEstado.push(oParam);
            });
            oThat.modelGeneral.setProperty("/tblEstado", dataEstado);

            if(!oThat.onListEstado){
                oThat.onListEstado = sap.ui.xmlfragment(
                    "frgListEstado",
                    rootPath + ".view.dialog.Estado",
                    oThat
                );
                oThat.getView().addDependent(oThat.onListEstado);
            }
            oThat.onListEstado.open();
        },
        
        onCancelEstadoStep:function(){
            oThat.onListEstado.close();
        },
        onCancelValidationUserStep:function(){
            if(oThat.onValidateUser){
                oThat.onValidateUser.close();
            }
            if(oThat.onValidateUserProceso){
                oThat.onValidateUserProceso.close();
            }
            if(oThat.onValidateUserInsumo){
                oThat.onValidateUserInsumo.close();
            }
        },
        onConfirmValidationUser:async function(){
            let oInfoUsuario = oThat.modelGeneral.getProperty("/oInfoUsuario");
            let password = oInfoUsuario.data.clave;
            let input = oThat.modelGeneral.getProperty("/passwordValidate");
            let booleanclave = await registroService.onGetClaveCryptoRmdFunction(this.mainModelv2, password, input);
            let evento = oThat.modelGeneral.getProperty("/oEventVistoBueno");
            if(booleanclave.crypto){
                console.log("exito");
                if(oThat.onValidateUser){
                    oThat.onValidateUser.close();
                }
                if(oThat.onValidateUserProceso){
                    oThat.onValidateUserProceso.close();
                }
                if(oThat.onValidateUserInsumo){
                    oThat.onValidateUserInsumo.close();
                }
                oThat.onSaveCheckAprov(evento, true);
            }else{
                MessageBox.error(oThat.i18n.getText("errorValidateUser"), {
                    styleClass: "sapUiSizeCompact",
                    actions: [MessageBox.Action.OK],
                    onClose: async function (oAction) {
                        if(oThat.onValidateUser){
                            oThat.onValidateUser.close();
                        }
                        if(oThat.onValidateUserProceso){
                            oThat.onValidateUserProceso.close();
                        }
                        if(oThat.onValidateUserInsumo){
                            oThat.onValidateUserInsumo.close();
                        }
                    }
                });
            }
        },
        onConfirmValidationUserProceso:async function(){
            let oInfoUsuario = oThat.modelGeneral.getProperty("/oInfoUsuario");
            let password = oInfoUsuario.data.clave;
            let input = oThat.modelGeneral.getProperty("/passwordValidate");
            let booleanclave = await registroService.onGetClaveCryptoRmdFunction(this.mainModelv2, password, input);
            let evento = oThat.modelGeneral.getProperty("/oEventVistoBueno");
            if(booleanclave.crypto){
                console.log("exito");
                if(oThat.onValidateUser){
                    oThat.onValidateUser.close();
                }
                if(oThat.onValidateUserProceso){
                    oThat.onValidateUserProceso.close();
                }
                if(oThat.onValidateUserInsumo){
                    oThat.onValidateUserInsumo.close();
                }
                oThat.onSaveCheckAprovProceso(evento, true);
            }else{
                MessageBox.error(oThat.i18n.getText("errorValidateUser"), {
                    styleClass: "sapUiSizeCompact",
                    actions: [MessageBox.Action.OK],
                    onClose: async function (oAction) {
                        if(oThat.onValidateUser){
                            oThat.onValidateUser.close();
                        }
                        if(oThat.onValidateUserProceso){
                            oThat.onValidateUserProceso.close();
                        }
                        if(oThat.onValidateUserInsumo){
                            oThat.onValidateUserInsumo.close();
                        }
                    }
                });
            }
        },
        onConfirmValidationUserInsumo:async function(){
            let oInfoUsuario = oThat.modelGeneral.getProperty("/oInfoUsuario");
            let password = oInfoUsuario.data.clave;
            let input = oThat.modelGeneral.getProperty("/passwordValidate");

            let booleanclave = await registroService.onGetClaveCryptoRmdFunction(this.mainModelv2, password, input);

            let evento = oThat.modelGeneral.getProperty("/oEventVistoBueno");
            if(booleanclave.crypto){
                console.log("exito");
                if(oThat.onValidateUser){
                    oThat.onValidateUser.close();
                }
                if(oThat.onValidateUserProceso){
                    oThat.onValidateUserProceso.close();
                }
                if(oThat.onValidateUserInsumo){
                    oThat.onValidateUserInsumo.close();
                }

                oThat.onSaveCheckAprovInsumo(evento, true);
            }else{
                MessageBox.error(oThat.i18n.getText("errorValidateUser"), {
                    styleClass: "sapUiSizeCompact",
                    actions: [MessageBox.Action.OK],
                    onClose: async function (oAction) {
                        if(oThat.onValidateUser){
                            oThat.onValidateUser.close();
                        }
                        if(oThat.onValidateUserProceso){
                            oThat.onValidateUserProceso.close();
                        }
                        if(oThat.onValidateUserInsumo){
                            oThat.onValidateUserInsumo.close();
                        }
                    }
                });
            }
        },

        onGetDataInsumoBulto: function (oDataPedido) {
            return new Promise(function (resolve, reject) {
                var aFilters = [];
                aFilters.push(new Filter("Pedido", "EQ", oDataPedido.Pedido));
                aFilters.push(new Filter("Orden", "EQ", oDataPedido.Orden));
                aFilters.push(new Filter("CodigoInsumo", "EQ", oDataPedido.CodigoInsumo));
                aFilters.push(new Filter("Lote", "EQ", oDataPedido.Lote));
                aFilters.push(new Filter("IdPos", "EQ", oDataPedido.IdPos === '' ? '1' : oDataPedido.IdPos));
                registroService.onGetDataGeneralFilters(oThatConf.mainModelv2, "VIEW_PEDIDO_CONSOLIDADO", aFilters).then(function (oDataInsumoBulto) {
                    resolve(oDataInsumoBulto);
                }).catch(function (oError) {
                    reject(oError);
                })
            });
        },

        // Consumir servicio oData de Central de Pesadas para obtener cierta data.
        onGetDataInsumoBultoPedido: function (sIdBulto, sIdInsumo, sLote) {
            return new Promise(async function (resolve, reject) {
                var aFilters = [];
                aFilters.push(new Filter("IdBulto", "EQ", sIdBulto));
                aFilters.push(new Filter("CodigoInsumo", "EQ", sIdInsumo));
                aFilters.push(new Filter("Lote", "EQ", sLote));
                await registroService.onGetDataGeneralFilters(oThat.modelCentralPesadas, "AtendidoItemSet", aFilters).then(function (aListPedido) {
                    resolve(aListPedido);
                }).catch(function (oError) {
                    reject(oError);
                })
            });
        },

        onCloseRMD: function () {
            MessageBox.confirm(oThat.getView().getModel("i18n").getResourceBundle().getText("confirmCloseRMD"), {
                styleClass: "sapUiSizeCompact",
                actions: [MessageBox.Action.YES, MessageBox.Action.NO],
                onClose: function (oAction) {
                    if (oAction === "YES") {
                        oThat.onValidateEsPasos();
                        // MessageBox.success(oThat.getView().getModel("i18n").getResourceBundle().getText("successCloseRMD"));
                    }
                }
            });
        },
        onValidateEsPasos:async function(){
            BusyIndicator.show(0);
            var LineaActual = oThat.modelGeneral.getProperty("/LineaActualMD");
            let aFilters = [];
            aFilters.push(new Filter("rmdId_rmdId", "EQ", LineaActual.rmdId));
            let oResponseEquipo = await registroService.onGetDataGeneralFilters(oThat.mainModelv2, "RMD_ES_EQUIPO", aFilters);
            let oResponseUtensilio = await registroService.onGetDataGeneralFilters(oThat.mainModelv2, "RMD_ES_UTENSILIO", aFilters);
            let oResponsePaso = await registroService.onGetDataGeneralFilters(oThat.mainModelv2, "RMD_ES_PASO", aFilters);
            let oResponsePasoInsumo = await registroService.onGetDataGeneralFilters(oThat.mainModelv2, "RMD_ES_PASO_INSUMO_PASO", aFilters);
            let oResponseEspecificacion = await registroService.onGetDataGeneralFilters(oThat.mainModelv2, "RMD_ES_ESPECIFICACION", aFilters);
            let oResponseInsumo = await registroService.onGetDataGeneralFilters(oThat.mainModelv2, "RMD_ES_RE_INSUMO", aFilters);

            let onValidatePaso = oThat.validatePaso(oResponsePaso);
            let onValidatePasoInsumo = oThat.validatePasoInsumo(oResponsePasoInsumo);
            let onValidateEspecificacion = oThat.validateEspecificaciones(oResponseEspecificacion);
            let onValidateEquipoUtensilio = oThat.validateEquipo(oResponseEquipo,oResponseUtensilio);
            let onValidateInsumo = oThat.validateInsumo(oResponseInsumo);

            if(onValidatePaso.length>0){
                MessageBox.error(oThat.getView().getModel("i18n").getResourceBundle().getText("errorCloseRMDPaso"));
                sap.ui.core.BusyIndicator.hide();
                return;
            }
            if(onValidatePasoInsumo.length>0){
                MessageBox.error(oThat.getView().getModel("i18n").getResourceBundle().getText("errorCloseRMDPasoInsumo"));
                sap.ui.core.BusyIndicator.hide();
                return;
            }
            if(onValidateInsumo.length>0){
                MessageBox.error(oThat.getView().getModel("i18n").getResourceBundle().getText("errorCloseRMDInsumo"));
                sap.ui.core.BusyIndicator.hide();
                return;
            }
            if(onValidateEspecificacion.length>0){
                MessageBox.error(oThat.getView().getModel("i18n").getResourceBundle().getText("errorCloseRMDEspecificacion"));
                sap.ui.core.BusyIndicator.hide();
                return;
            }

            if(onValidateEquipoUtensilio.oNoEquiposTotal.length>0){
                MessageBox.information(oThat.getView().getModel("i18n").getResourceBundle().getText("informationCloseRMDEquipos"), {
                    actions: ["OK", MessageBox.Action.CLOSE],
                    emphasizedAction: "Manage Products",
                    onClose: function (sAction) {
                        if(sAction == "OK"){
                            Promise.all([oThatConf.onUpdateEquipo(oNoEquipoTotal.oNoEquipo), oThatConf.onUpdateUtensilio(oNoEquipoTotal.oNoUtensilio)]).then(async function (values) {
                                let sobject = {};
                                sobject.fechaActualiza = new Date();
                                sobject.usuarioActualiza = oInfoUsuario.data.usuario;
                                sobject.rmdId = LineaActual.rmdId;
                                sobject.estadoIdRmd_iMaestraId = 478;
                                oThatConf.setUpdateRmd(sobject);
                                oThat.onState(false, "generalModelState");
                                await oThat.onUpdateEnsayoSap();
                                BusyIndicator.hide();
                                MessageBox.success(oThat.getView().getModel("i18n").getResourceBundle().getText("successCloseRMD"));
                            }).catch(function (oError) {
                                sap.ui.core.BusyIndicator.hide();
                                oThatConf.onErrorMessage(oError, "errorSave");
                            })   
                        }
                    }
                });
            } else {
                let sobject = {};           
                sobject.fechaActualiza = new Date();
                sobject.usuarioActualiza = oInfoUsuario.data.usuario;
                sobject.rmdId = LineaActual.rmdId;
                sobject.estadoIdRmd_iMaestraId = 478;
                oThatConf.setUpdateRmd(sobject);
                oThat.onState(false, "generalModelState");
                await oThat.onUpdateEnsayoSap();
                BusyIndicator.hide();
                MessageBox.success(oThat.getView().getModel("i18n").getResourceBundle().getText("successCloseRMD"));            
            }
        },

        validatePaso: function(aListPaso){
            var oNoPaso = [];
            aListPaso.results.forEach(oPaso => {
                let validate= formatter.onValidatePaso(oPaso);
                if(!validate){
                    oNoPaso.push(oPaso);
                }
            });
            return oNoPaso;

        },

        validatePasoInsumo: function (aListaPasoInsumo) {
            var oNoPasoInsumo = [];
            aListaPasoInsumo.results.forEach(oPasoInsumo => {
                let validate= formatter.onValidatePaso(oPasoInsumo);
                if(!validate){
                    oNoPasoInsumo.push(oPasoInsumo);
                }
            });
            return oNoPasoInsumo;
        },

        validateEquipo: function(aListEquipo,aListUtensilio){
            var oNoEquiposTotal = [];
            var oNoEquipo = [];
            aListEquipo.results.forEach(eq => {
                if(!eq.verifCheck){
                    oNoEquipo.push(eq);
                    oNoEquiposTotal.push(eq);
                }
            });

            var oNoUtensilio = [];
            aListUtensilio.results.forEach(eq => {
                if(!eq.verifCheck){
                    oNoUtensilio.push(eq);
                    oNoEquiposTotal.push(eq);
                }
            });

            var objEquipos={
                "oNoEquiposTotal": oNoEquiposTotal,
                "oNoEquipo":oNoEquipo,
                "oNoUtensilio": oNoUtensilio
            }

            return objEquipos;
        },
        validateInsumo: function(aListInsumo){
            var oNoInsumo= [];
            aListInsumo.results.forEach(eq => {
                if(!eq.verifCheck){
                    oNoInsumo.push(eq);
                }
            });
            return oNoInsumo;
        },
        validateProcesos: function(aListEtiqueta,aListPasoInsumo){
            var oNoProceso=[];
            $.each(aListPasoInsumo.results.groupBy('etiquetaId_etiquetaId'), function (datax, datay) {
                if(!datay[0].vistoBuenoPaso){
                    oNoProceso.push(datay[0])
                }
            });
        
            aListPasoInsumo.results.forEach(element => {
                if(!element.vistoBueno){
                    oNoProceso.push(element)
                }
          });

          return oNoProceso;
        },
        validateEspecificaciones: function(aListEspecificacion){
            aListEspecificacion.results.sort((a,b) => a.orden-b.orden);
            var oNoEspecificacion= [];
            aListEspecificacion.results.forEach(eq => {
                if(!eq.resultados){
                    oNoEspecificacion.push(eq);
                }
            });
            return oNoEspecificacion;
        },
        onUpdateEquipo: function(oNoEquipo){
            let oInfoUsuario = oThat.modelGeneral.getProperty("/oInfoUsuario");
 
            return new Promise(function (resolve, reject) {
                oNoEquipo.forEach(async function(x){
                    let oEsEquipo = {};
                    oEsEquipo.rmdEstructuraEquipoId = x.rmdEstructuraEquipoId;
                    oEsEquipo.usuarioActualiza =  oInfoUsuario.data.usuario;
                    oEsEquipo.fechaActualiza = new Date();
                    oEsEquipo.verifCheck = true;
    
                    await registroService.updateEsEquipoRmd(oThat.mainModelv2, "/RMD_ES_EQUIPO", oEsEquipo);
                });
                resolve("exito equipo");
            });
        },
        onUpdateUtensilio: function(oNoUtensilio){
            let oInfoUsuario = oThat.modelGeneral.getProperty("/oInfoUsuario");
 
            return new Promise(function (resolve, reject) {
                oNoUtensilio.forEach(async function(x){
                    let oEsUtensilio = {};
                    oEsUtensilio.rmdEstructuraUtensilioId = x.rmdEstructuraUtensilioId;
                    oEsUtensilio.usuarioActualiza =  oInfoUsuario.data.usuario;
                    oEsUtensilio.fechaActualiza = new Date();
                    oEsUtensilio.verifCheck = true;
    
                    await registroService.updateEsUtensilioRmd(oThat.mainModelv2, "/RMD_ES_UTENSILIO", oEsUtensilio);
                });
                resolve("exito utensilio");
            });
        },
        setUpdateRmd: async function(sobject){
            var sUpdate = await registroService.updateStatusRmd(oThat.mainModelv2, "/RMD", sobject);
          },

        onSetNotasImportantes : function () {
            let oDataSeleccionada = oThat.getOwnerComponent().getModel("asociarDatos");
            let fraccionActual = oDataSeleccionada.getData().aEstructura.results[0].fraccion;
            var lineaActual = this.modelGeneral.getProperty("/LineaActualMD");
            let oInfoUsuario = oThat.modelGeneral.getProperty("/oInfoUsuario");
            var oDialogNotas = new sap.m.Dialog({
                title: "Ingresar Nota Importante",
                type: "Message",
                content: [
                    new sap.m.Label({
                        text: "Ingrese una nota importante",
                        labelFor: "submitDialogTextarea"
                    }),
                    new sap.m.TextArea("submitDialogTextarea", {
                        liveChange: function (oEvent) {
                            var parent = oEvent.getSource().getParent();
                            parent.getBeginButton().setEnabled(true);
                        },
                        width: "100%",
                        required: true
                    })
                ],
                beginButton: new sap.m.Button({
                    type: sap.m.ButtonType.Emphasized,
                    text: "Confirmar",
                    enabled: false,
                    press: async function () {
                        var sText = sap.ui.getCore().byId("submitDialogTextarea").getValue();
                        var sobject = {
                            usuarioRegistro : oInfoUsuario.data.usuario,
                            fechaRegistro : new Date(),
                            activo : true,
                            rmdObservacionId : util.onGetUUIDV4(),
                            tipo    : "CONFIGURACION",
                            rmdId_rmdId : lineaActual.rmdId,
                            mdId_mdId : lineaActual.mdId,
                            nombre : oInfoUsuario.data.nombre,
                            apellido : oInfoUsuario.data.apellidoPaterno,
                            observacion : sText,
                            fraccion: fraccionActual
                        }
                        await registroService.createData(oThat.mainModelv2, "/RMD_OBSERVACION", sobject);  
                        sap.ui.getCore().byId("submitDialogTextarea").setValue("");
                        oDialogNotas.close();                   
                    }
                }),
                endButton: new sap.m.Button({
                    type: sap.m.ButtonType.Reject,
                    text: "Cancelar",
                    enabled: true,
                    press: function () {
                        sap.ui.getCore().byId("submitDialogTextarea").setValue("");
                        oDialogNotas.close();
                    }
                }),
                afterClose: function () {
                    oDialogNotas.destroy();
                }
            });
    
            oDialogNotas.open();
        },

        onAgregarFechaFin: function (oEvent) {
            var lineaActual = this.modelGeneral.getProperty("/LineaActualMD");
            let oSource = oEvent.getSource();
            var oPath = oSource.getParent().getParent().getBindingContextPath(); 
            var lineaSeleccionada = this.modelGeneral.getProperty(oPath);
            if (lineaSeleccionada.fechaFin === null) {
                MessageBox.confirm("??Desea registrar la Fecha Fin?", {
                    onClose : async function(sButton) {
                        if (sButton === MessageBox.Action.OK) {
                            var oParam = {
                                fechaActualiza      : new Date(),
                                usuarioActualiza    : oInfoUsuario.data.usuario,
                                fechaFin            : new Date()
                            }
                            await registroService.onUpdateDataGeneral(oThat.mainModelv2, "RMD_LAPSO", oParam, lineaSeleccionada.rmdLapsoId);
                            lineaSeleccionada.fechaFin = new Date();
                            // lineaSeleccionada.refresh();
                            await oThat.getLapsosRMD();
                            let aListLapsos = oThat.modelGeneral.getProperty("/tblListLapso");
                            let aListLapsoFilter = aListLapsos.filter(itm=>itm.tipoDatoId === null && itm.fechaFin === null);
                            if(aListLapsoFilter.length === 0) {
                                let oParamLapso = {
                                    fechaActualiza: new Date(),
                                    usuarioActualiza: oInfoUsuario.data.usuario,
                                    estadoIdRmd_iMaestraId: iStateProcess,
                                    bFlagInitial: true
                                }
                                await registroService.onUpdateDataGeneral(oThat.mainModelv2, "RMD", oParamLapso, lineaActual.rmdId);
                            }
                            // let sDescripcion = lineaSeleccionada.descripcion;
                            // let setupPost = 'setup post';
                            // if (sDescripcion.toLowerCase().includes(setupPost)) {
                            //     let oParamFechaFin = {
                            //         fechaActualiza: new Date(),
                            //         usuarioActualiza: oInfoUsuario.data.usuario,
                            //         fechaFinRegistro: new Date()
                            //     }
                            //     await registroService.onUpdateDataGeneral(oThat.mainModelv2, "RMD", oParamFechaFin, lineaActual.rmdId)
                            // }
                            MessageBox.success("Se registro la Fecha Fin correctamente.");
                        }
                    }
                });
            } else {
                MessageBox.warning("Ya se registr?? una Fecha Fin para este Lapso.");
            }
        },

        onPressBV: function(oEvent) {
            let oDataSeleccionada = oThat.getOwnerComponent().getModel("asociarDatos");
            let fraccionActual = oDataSeleccionada.getData().aEstructura.results[0].fraccion;
            var oSource = oEvent.getSource();
            var oPath = oSource.getParent().getBindingContextPath(); 
            var lineaSeleccionada = this.modelGeneral.getProperty(oPath);
            MessageBox.confirm("??Est?? seguro de cambiar Visto Bueno?", {
                onClose : async function(sButton) {
                    if (sButton === MessageBox.Action.OK) {
                        var oParam = {
                            fechaActualiza : new Date(),
                            usuarioActualiza : oInfoUsuario.data.usuario,
                            VB    : lineaSeleccionada.VB,
                            fraccion: fraccionActual
                        }
                        await registroService.onUpdateDataGeneral(oThat.mainModelv2, "RMD_OBSERVACION", oParam, lineaSeleccionada.rmdObservacionId);
                        MessageBox.success("Se actualiz?? VB correctamente.");
                    }
                }
            });
        },
        _getListActivities: async function(lineaSeleccionada) {
            let oDataSeleccionada = oThat.getOwnerComponent().getModel("asociarDatos");
            let oPasosProceso = oThat.getView().getModel("aListProcessAssignResponsive").getData();
            let aListActividadesTeoricas = await oThat.obtenerActividadesTeoricas(lineaSeleccionada);
            let fraccionActual = oDataSeleccionada.getData().aEstructura.results[0].fraccion;
            let aFiltersPaso = [];
            aFiltersPaso.push(new Filter("clvModelo", "EQ", lineaSeleccionada.pasoIdFin.clvModelo));
            aFiltersPaso.push(new Filter("puestoTrabajo", "EQ", lineaSeleccionada.pasoIdFin.puestoTrabajo));
            aFiltersPaso.push(new Filter("fraccion", "EQ", fraccionActual));
            aFiltersPaso.push(new Filter("rmdId_rmdId", "EQ", oDataSeleccionada.getData().rmdId));
            let aPasosSelected = await registroService.onGetDataGeneralFilters(oThat.mainModelv2, "RMD_ES_PASO", aFiltersPaso);
            aPasosSelected.results.sort(function (a, b) {
                return a.orden - b.orden;
            });
            let pasoInicioSetUp = oPasosProceso.find(oPaso=>oPaso.rmdEstructuraPasoId === aPasosSelected.results[0].rmdEstructuraPasoId);
            let pasoFinSetUp = oPasosProceso.find(oPaso=>oPaso.rmdEstructuraPasoId === aPasosSelected.results[1].rmdEstructuraPasoId);
            let aListPasosInterval = oPasosProceso.filter(oPasos=>oPasos.contador > pasoInicioSetUp.contador && oPasos.contador < pasoFinSetUp.contador);
            let iNumberUsers = formatter.numberUserInterval(aListPasosInterval);
            await oThat.getLapsosRMD();
            let arrListLapsos = this.getView().getModel("modelGeneral").getProperty("/tblListLapso");
            let fInicio = new Date(lineaSeleccionada.fechaInicio).getTime();
            let fFin = new Date(lineaSeleccionada.fechaFin).getTime();
            let arrActivities = [];
            let flagError = true;
            let aListaLapsos = 0;
            arrListLapsos.map(item => {
                //validamos que el item no tenga tipoDato sIdNotificacion y que tenga una fechaFin
                if(item.tipoDatoId != sIdNotificacion){
                    const {fechaInicio,fechaFin} = item;
                    let _fInicio =  new Date(fechaInicio).getTime();
                    if (fInicio <= _fInicio){
                        if(!fechaFin){
                            flagError = false;
                        } else {
                            let _fFin = new Date(fechaFin).getTime();
                            //validamos que la fechas del items este dentro de la fecha de inicio y fin del lapso
                            if (fFin >= _fFin && fInicio <= _fInicio) {
                                let x = new Date(_fInicio);
                                let y = new Date(_fFin);
    
                                let diff = y.getTime() - x.getTime();
                                aListaLapsos = aListaLapsos + diff;
                            }
                        }
                    }
                }
            });
            if (!flagError) {
                MessageBox.warning("Debe finalizar los lapsos para poder notificar.");
                return false;
            } else {
                let hours;
                let timeBetwenTotalProceso = fFin - fInicio;
                let timeMandarSap = timeBetwenTotalProceso - aListaLapsos;
                hours = ((timeMandarSap / 60000) / 60).toFixed(3);
                let actividadTeorica1 = aListActividadesTeoricas.find(itm=>itm.descripcion === "Activity 1");
                if (actividadTeorica1) {
                    let restaTeorico = (parseFloat(hours) * iNumberUsers) - parseFloat(actividadTeorica1.hours);
                    if (restaTeorico > 0){
                        let obj ={
                            hours:(restaTeorico).toFixed(3),
                            descripcion:"Activity 1",
                            unidad:"HRA"
                        }
                        arrActivities.push(obj);
                    } else {
                        flagError = false;
                    }
                } else {
                    let obj ={
                        hours:(parseFloat(hours) * iNumberUsers).toFixed(3),
                        descripcion:"Activity 1",
                        unidad:"HRA"
                    }
                    arrActivities.push(obj);
                }
                let actividadTeorica2 = aListActividadesTeoricas.find(itm=>itm.descripcion === "Activity 2");
                if (actividadTeorica2) {
                    let restaTeorico = parseFloat(hours) - parseFloat(actividadTeorica2.hours);
                    if (restaTeorico > 0){
                        let obj2 ={
                            hours: (restaTeorico).toFixed(3),
                            descripcion:"Activity 2",
                            unidad:"HRA"
                        }
                        arrActivities.push(obj2);
                    } else {
                        flagError = false;
                    }
                } else {
                    let obj2 ={
                        hours: hours,
                        descripcion:"Activity 2",
                        unidad:"HRA"
                    }
                    arrActivities.push(obj2);
                }
                let actividadTeorica3 = aListActividadesTeoricas.find(itm=>itm.descripcion === "Activity 3");
                if (actividadTeorica3) {
                    let restaTeorico = parseFloat(hours) - parseFloat(actividadTeorica3.hours);
                    if (restaTeorico > 0){
                        let obj3 ={
                            hours: (restaTeorico).toFixed(3),
                            descripcion:"Activity 3",
                            unidad:"HRA"
                        }
                        arrActivities.push(obj3);
                    } else {
                        flagError = false;
                    }
                } else {
                    let obj3 ={
                        hours: hours,
                        descripcion:"Activity 3",
                        unidad:"HRA"
                    }
                    arrActivities.push(obj3);
                }
                let actividadTeorica4 = aListActividadesTeoricas.find(itm=>itm.descripcion === "Activity 4");
                if (actividadTeorica4) {
                    let restaTeorico = parseFloat(hours) - parseFloat(actividadTeorica4.hours);
                    if (restaTeorico > 0){
                        let obj4 ={
                            hours: (restaTeorico).toFixed(3),
                            descripcion:"Activity 4",
                            unidad:"HRA"
                        }
                        arrActivities.push(obj4);
                    } else {
                        flagError = false;
                    }
                } else {
                    let obj4 ={
                        hours: hours,
                        descripcion:"Activity 4",
                        unidad:"HRA"
                    }
                    arrActivities.push(obj4);
                }

                if (!flagError) {
                    MessageBox.warning("No se pueden notificar Actividades negativas.");
                    return false;
                } else {
                    return arrActivities;
                }
            }
        },

        obtenerActividadesTeoricas: async function (lineaSeleccionada) {
            let lineaActual = oThat.modelGeneral.getProperty("/LineaActualRMD");
            let Airbpl = lineaSeleccionada.pasoIdFin.puestoTrabajo;
            let Ktsch = lineaSeleccionada.pasoIdFin.clvModelo;
            let obtenerFase = await oThat.getFaseNotification(Airbpl,Ktsch);
            lineaSeleccionada.Vornr = obtenerFase.Vornr;
            lineaSeleccionada.Steus = obtenerFase.Steus; 
            let aListCantidadesParciales = await oThat.obtenerCantidadesParciales(lineaSeleccionada.pasoIdFin.puestoTrabajo);
            if (aListCantidadesParciales.results.length > 0) {
                let sumaTeorica = 0;
                aListCantidadesParciales.results.forEach(function(oParcial){
                    sumaTeorica = sumaTeorica + parseFloat(oParcial.cantBuena);
                });
                let aFilters = [];
                aFilters.push(new Filter("Orderid", "EQ", lineaActual.Aufnr));
                aFilters.push(new Filter("Phase", "EQ", lineaSeleccionada.Vornr));
                aFilters.push(new Filter("Yield", "EQ", (sumaTeorica).toFixed(3)));
                //OFFLINE
                let aListActivities = await registroService.onGetDataGeneralFilters(oThat.modelNecesidad, "ActividadOfflineSet", aFilters);
                //let aListActivities = await registroService.getDataAjax("/ActividadSet", aFilters);
                let arrActivities = [];
                aListActivities.results.forEach(function(oActivity){
                //aListActivities.forEach(function(oActivity){
                    let obj ={
                        hours: oActivity.ConfActivity1,
                        descripcion: "Activity 1",
                        unidad: oActivity.ConfActiUnit1
                    }
                    arrActivities.push(obj);
                    let obj1 ={
                        hours: oActivity.ConfActivity2,
                        descripcion: "Activity 2",
                        unidad: oActivity.ConfActiUnit2
                    }
                    arrActivities.push(obj1);
                    let obj2 ={
                        hours: oActivity.ConfActivity3,
                        descripcion: "Activity 3",
                        unidad: oActivity.ConfActiUnit3
                    }
                    arrActivities.push(obj2);
                    let obj3 ={
                        hours: oActivity.ConfActivity4,
                        descripcion: "Activity 4",
                        unidad: oActivity.ConfActiUnit4
                    }
                    arrActivities.push(obj3);
                });
                return arrActivities;
            } else {
                return [];
            }   
        },

        obtenerCantidadesParciales: async function (puestoTrabajo) {
            let oDataSeleccionada = oThat.getOwnerComponent().getModel("asociarDatos");
            let fraccionActual = oDataSeleccionada.getData().aEstructura.results[0].fraccion;
            let aFilters = [];
            aFilters.push(new Filter("puestoTrabajo", "EQ", puestoTrabajo));
            aFilters.push(new Filter("cantBuena", "NE", "0"));
            aFilters.push(new Filter("rmdId_rmdId", "EQ", oDataSeleccionada.getData().rmdId));
            aFilters.push(new Filter("fraccion", "EQ", fraccionActual));
            aFilters.push(new Filter("activo", "EQ", true));
            let aListCantidadesParciales = await registroService.onGetDataGeneralFilters(oThat.mainModelv2, "RMD_TABLA_CONTROL", aFilters);
            return aListCantidadesParciales;
        },

        getFaseNotification:function(Airbpl,Ktsch){
            let aFilters = [];
            let data =  oThat.modelGeneral.getProperty("/LineaActualRMD");
            // aFilters.push(new Filter("Aufnr", "EQ", "100000060")) //ORDEN
            // aFilters.push(new Filter("Arbpl", "EQ", "I_MEAT02"))  //PUESTO TRABAJO
            // aFilters.push(new Filter("Ktsch", "EQ", "")) //SCHEDULE
            aFilters.push(new Filter("Aufnr", "EQ", data.Aufnr)) //ORDEN
            aFilters.push(new Filter("Arbpl", "EQ", Airbpl))  //PUESTO TRABAJO
            aFilters.push(new Filter("Ktsch", "EQ", Ktsch)) //SCHEDULE
            //promise
            return new Promise((resolve, reject) => {
            
                registroService.getDataFilter(this.modelNecesidad,"/FaseNotSet",aFilters)
                .then(function(payload){
                    resolve(payload.results[0]);
                })
                .catch(function(err){
                    reject(err);
                })
            })
        },
        onPressNotifications: async function (oEvent, bFlag, fechaNotificacion) {
            var lineaSeleccionada;
            let bFlagNotifFinal;
            if(!bFlag){
                let oDataSeleccionada = oThat.getOwnerComponent().getModel("asociarDatos");
                bFlagNotifFinal = oThat.modelGeneral.getProperty("/bFlagNotifFinal");
                let fraccionActual = oDataSeleccionada.getData().aEstructura.results[0].fraccion;
                let aFilter = [];
                aFilter.push(new Filter("rmdId_rmdId", "EQ", oDataSeleccionada.getData().rmdId));
                aFilter.push(new Filter("automatico", "EQ", false));
                aFilter.push(new Filter("fraccion", "EQ", fraccionActual));
                aFilter.push(new Filter("fechaInicio", "NE", null));
                aFilter.push(new Filter("notifFinal", "NE", true));
                let sExpand = "pasoIdFin,pasoId";
                let oResponseLapsoManual = await registroService.onGetDataGeneralFiltersExpand(oThat.mainModelv2, "RMD_LAPSO", aFilter, sExpand);
                lineaSeleccionada = oResponseLapsoManual.results[0];
            } else {
                lineaSeleccionada = oEvent;
            }
            let Airbpl = lineaSeleccionada.pasoIdFin.puestoTrabajo;
            let Ktsch = lineaSeleccionada.pasoIdFin.clvModelo;
            let obtenerFase = await oThat.getFaseNotification(Airbpl,Ktsch);
            lineaSeleccionada.Vornr = obtenerFase.Vornr;
            lineaSeleccionada.Steus = obtenerFase.Steus; 
            let activities;
            await oThat.onChangeEstructura("NOTIF");
            if (!lineaSeleccionada.automatico && bFlagNotifFinal){                      // MANUAL Y FINAL
                activities = await this._getListActivities(lineaSeleccionada);  
            } else if (lineaSeleccionada.automatico) {
                activities = await this.getTimeActivitiesAuto(lineaSeleccionada);  // AUTOMATICO
            }

            if (!activities && bFlagNotifFinal) {
                return false;
            }
            if (!activities && lineaSeleccionada.automatico) {
                return false;
            }

            if(!oThat.onNotification){
                oThat.onNotification = sap.ui.xmlfragment(
                    "frgNotification",
                    rootPath + ".view.fragment.detail.Notificaciones",
                    oThat
                );
                oThat.getView().addDependent(oThat.onNotification);
            }
            let lineaActual = this.modelGeneral.getProperty("/LineaActualMD");
            let aFilter = [];
            aFilter.push(new Filter("Werks", "EQ", lineaActual.sucursalId.codigo));
            var oResponse = await registroService.getDataFilter(oThat.modelNecesidad, "/MotivosNotSet", aFilter);
            if (oInfoUsuario.funcionUsuario.registroMuestreo) {
                oResponse.results = oResponse.results.filter(itm=>itm.Grund !== "0001");
            } else {
                oResponse.results = oResponse.results.filter(itm=>itm.Grund === "0001");
            }
    
            //puesto de trabajo y clv modelo
            oThat.modelGeneral.setProperty("/LineaActualRMD/Vornr",lineaSeleccionada.Vornr)
            oThat.modelGeneral.setProperty("/aListaCausas", oResponse.results);
            oThat.modelGeneral.setProperty("/aListActivities", activities);
            oThat.modelGeneral.setProperty("/LineaActualseleccionada", lineaSeleccionada);
            oThat.modelGeneral.setProperty("/LineaActualRMD/cantBuenda", "");
            oThat.modelGeneral.setProperty("/LineaActualRMD/rechazo", "");
            oThat.modelGeneral.setProperty("/LineaActualRMD/causadesv", "");
            oThat.modelGeneral.setProperty("/LineaActualRMD/textoNotif", "");
            if (!lineaSeleccionada.automatico) {
                oThat.onNotification.open();
            } else {
                oThat._crearNotificacion(fechaNotificacion);      
            }
        },

        _crearNotificacion: async function(fechaNotificacion){
            BusyIndicator.show(0);
            let oDataSeleccionada = oThat.getOwnerComponent().getModel("asociarDatos");
            let fraccionActual = oDataSeleccionada.getData().aEstructura.results[0].fraccion;
            let pasoSeleccionado = oThat.modelGeneral.getProperty("/LineaActualseleccionada");
            let lineaActual = oThat.modelGeneral.getProperty("/LineaActualRMD");
            let aListActivities = oThat.modelGeneral.getProperty("/aListActivities");
            let aListCausas = oThat.modelGeneral.getProperty("/aListaCausas");
            let bFlagNotifFinal = oThat.modelGeneral.getProperty("/bFlagNotifFinal");
            let fechaNotif;
            if(fechaNotificacion) {
                fechaNotif = fechaNotificacion;
            } else {
                fechaNotif = new Date();
            }
            fechaNotif = formatter.onFormatDateSAP(fechaNotif);
            if (pasoSeleccionado.Steus === "PI03") {
                let oObj = {
                    Material: lineaActual.Matnr,
                    Batch: lineaActual.Charg,
                    Plant: lineaActual.Pwerk,
                    Proddate: fechaNotif,
                    Message: "",
                    Key:util.onGetUUIDV4()
                }
                await registroService.onSaveDataGeneral(oThat.modelNecesidad, "FechaProdSet", oObj);
            }
            //Key Notificacion
            let sNotificationKey = util.onGetUUIDV4();
            let obj = {
                "Rueck": "",    //RMD
                "Rmzhl": "", //
                "Orderid": lineaActual.Aufnr,
                "Phase": lineaActual.Vornr,    //Fase a notificar
                "PostgDate": fechaNotif, 
                "DevReason":"", //merma
                "ConfText": lineaActual.textoNotif ? lineaActual.textoNotif : "", //texto de la confirmacion x
                "ExCreatedBy": oDataSeleccionada.getData().mdId.codigo,
                "Scrap": pasoSeleccionado.automatico ? "0" : lineaActual.rechazo ? lineaActual.rechazo : "0",
                "Yield": pasoSeleccionado.automatico ? lineaActual.Vfmng : lineaActual.cantBuenda ? lineaActual.cantBuenda : "0",
                "Notificacionkey": sNotificationKey,

                //"NotificacionMensajeSet":[]
            }
            if (aListActivities.length > 0) {
                aListActivities.map((item,i)=>{
                    obj[`ConfActiUnit${i+1}`]= item.unidad;
                    obj[`ConfActivity${i+1}`]= item.hours;
                });
            }            
            //manual
            let causaDesv = {};
            if(!pasoSeleccionado.automatico && obj.Scrap !== "0"){
                if(lineaActual.causadesv === undefined || lineaActual.causadesv === ""){
                    MessageBox.warning("Debes seleccionar una causa");
                    BusyIndicator.hide();
                    return;
                }
                causaDesv = aListCausas.find(item => item.Grund === lineaActual.causadesv);
                obj.Scrap= lineaActual.rechazo; //cantidad de merma o muestra x
                obj.DevReason= causaDesv.Grund; //merma
                obj.ConfText= causaDesv.Grdtx;//texto de la confirmacion x
            }
            if (pasoSeleccionado.automatico) {
                if (pasoSeleccionado.fechaFin) {
                    obj.Zflag = "4";
                    obj.Notificacionkey = util.onGetUUIDV4();
                    let response = await registroService.createData(this.modelNecesidad, "/NotificacionOfflineSet", obj);
                    //let response = await registroService.createData(this.modelNecesidad, "/NotificacionSet", obj);
                    obj.Notificacionkey  = sNotificationKey;
                    obj.Zflag = "1";
                    //OFFLINE 
                    //if(response.NotificacionMensajeSet.results.length > 0) {
                    //    if (response.NotificacionMensajeSet.results[0].Type !== "E") {
                    let payload = await registroService.createData(this.modelNecesidad, "/NotificacionOfflineSet", obj);
                    var msg = "La solicitud para crear la notificacion se puso en cola";
                    await registroService.oDataRemove(this.modelNecesidad, "/NotificacionOfflineSet", sNotificationKey);
                            //var msg = payload.NotificacionMensajeSet.results[0].Message;
                    //    }
                    //} else {
                    //    let payload = await registroService.createData(this.modelNecesidad, "/NotificacionSet", obj);
                        //var msg = payload.NotificacionMensajeSet.results[0].Message;   
                    //}
                    BusyIndicator.hide();
                    MessageBox.information(msg);
                } else {
                    obj.Zflag = "1";
                    //registroService.createData(this.modelNecesidad,"/NotificacionSet",obj).then((payload)=>{
                    registroService.createData(this.modelNecesidad,"/NotificacionOfflineSet",obj).then((payload)=>{
                        console.log(payload);
                        //let msg = payload.NotificacionMensajeSet.results[0].Message;
                        var msg = "La solicitud para crear la notificacion se puso en cola";
                        
                        registroService.oDataRemove(this.modelNecesidad, "/NotificacionOfflineSet", sNotificationKey).then((res)=>{
                            console.log("remove succes");
                        });

                        BusyIndicator.hide();
                        MessageBox.information(msg);
                    }).catch((err)=>{
                        console.log(err);
                        BusyIndicator.hide();
                    })
                }
            } else {
                obj.Zflag = "1";
                //registroService.createData(this.modelNecesidad,"/NotificacionSet",obj).then(async function(payload){
                registroService.createData(this.modelNecesidad,"/NotificacionOfflineSet",obj).then(async function(payload){
                    console.log(payload);
                    //OFFLINE
                    var msg = "La solicitud para crear la notificacion se puso en cola";
                    await registroService.oDataRemove(oThat.modelNecesidad, "/NotificacionOfflineSet", sNotificationKey);
                    //let msg = payload.NotificacionMensajeSet.results[0].Message;
                    //if (payload.NotificacionMensajeSet.results[0].Type !== "E") {
                        let sCorrelativo = "";
                        let anioActual = new Date().getFullYear();
                        if (lineaActual.rechazo && (oInfoUsuario.rol[0].codigo === "RMD_CONTROL_PROCESO" || oInfoUsuario.rol[0].codigo === "RMD_CONTROL_CALIDAD")) {
                            let aFilters = [];
                            aFilters.push(new Filter("cantRechazo", "NE", "0"));
                            aFilters.push(new Filter("anio", "EQ", anioActual.toString()));
                            aFilters.push(new Filter("centro", "EQ", oDataSeleccionada.getData().centro));
                            aFilters.push(new Filter("motivoDesv", "NE", "Merma Propia del Proceso"));
                            let aListNotificaciones = await registroService.onGetDataGeneralFilters(oThat.mainModelv2, "RMD_TABLA_CONTROL", aFilters);
                            aListNotificaciones.results = aListNotificaciones.results.filter(itm=>itm.rol === "RMD_CONTROL_PROCESO" || itm.rol === "RMD_CONTROL_CALIDAD");
                            sCorrelativo = formatter.obtenerCorrelativoMuestra(aListNotificaciones.results.length, 5);
                        }
                        let oObjNew = {
                            usuarioRegistro: oInfoUsuario.data.usuario,
                            fechaRegistro: new Date(),
                            activo : true,
                            rmdControlRechazo: sNotificationKey,
                            rmdId_rmdId: oDataSeleccionada.getData().rmdId,
                            fraccion: fraccionActual,
                            orden: obj.Orderid,
                            operacion: bFlagNotifFinal ? "FINAL" : "PARCIAL",     
                            puestoTrabajo: pasoSeleccionado.pasoId.puestoTrabajo,
                            clvModelo: pasoSeleccionado.pasoId.clvModelo,
                            cantBuena: lineaActual.cantBuenda ? lineaActual.cantBuenda : "0",
                            cantRechazo: lineaActual.rechazo ? lineaActual.rechazo : "0",
                            motivoDesv: causaDesv.Grdtx,
                            fase: lineaActual.Vornr,
                            Rmzhl: payload.Rmzhl,
                            Rueck: payload.Rueck,
                            ConfText: lineaActual.textoNotif ? lineaActual.textoNotif : "",
                            rol: oInfoUsuario.rol[0].codigo,
                            styleUser: formatter.selectedColor(oInfoUsuario.rol[0].codigo),
                            anio: anioActual.toString(),
                            correlativoMuestra: sCorrelativo,
                            centro: oDataSeleccionada.getData().centro
                        }
                        await registroService.onSaveDataGeneral(oThat.mainModelv2, "RMD_TABLA_CONTROL", oObjNew);
                        if (lineaActual.rechazo && (oInfoUsuario.rol[0].codigo === "RMD_CONTROL_PROCESO" || oInfoUsuario.rol[0].codigo === "RMD_CONTROL_CALIDAD")) {
                            await oThat.onUpdateSumatoriaMuestreo();
                        }
                        if (bFlagNotifFinal) {
                            let objNotifFinal = {
                                notifFinal: true
                            }
                            await registroService.onUpdateDataGeneral(oThat.mainModelv2, "RMD_LAPSO", objNotifFinal, pasoSeleccionado.rmdLapsoId);
                        }
                    //}
                    oThat.onNotification.close();
                    oThat.onCancelNotificationsList();
                    BusyIndicator.hide();
                    MessageBox.information(msg);
                }).catch((err)=>{
                    console.log(err);
                    MessageBox.error(JSON.parse(err.responseText).error.message.value)
                    BusyIndicator.hide();
                })
            }
        },
        onConfirmNotification: function () {
            // ;

            oThat._crearNotificacion();            
            // MessageBox.success("Se cre?? la notificaci??n correctamente.");
            // this.onCancelNotification();
        },

        onCancelNotification: function () {
            oThat.onNotification.close();
        },

        onOpenConEnlace: function (nType) {
            try {
                let oDataSeleccionada = oThat.getOwnerComponent().getModel("asociarDatos"),
                    oLineaActualMD = oThat.getView().getModel("modelGeneral").getProperty("/LineaActualMD"),
                    Matkl = oThat.onValidarInfo(oLineaActualMD,"aReceta.results.0.recetaId.Matkl"),
                    oLineaActualRMD = oThat.getView().getModel("modelGeneral").getProperty("/LineaActualRMD");

                if (nType === 1) {
                    if (oDataSeleccionada.getData().etapa !== sEtapaRMD) {
                        MessageBox.error(formatter.onGetI18nText(oThat, "msgNoParihuela"));
                        return false;
                    }
                } else if (nType === 2) {
                    if (Matkl !== sGrupoArticuloZS2) {
                        MessageBox.error(formatter.onGetI18nText(oThat, "msgNoMaterialEmbalaje"));
                        return false;
                    }
                }
                oThat.getView().getModel("modelGeneral").setProperty("/CantidadConHUOp",{
                    cantidad: oLineaActualRMD.Psmng
                });
                oThat.nType = nType;
                if(!oThat.onConEnlace){
                    oThat.onConEnlace = sap.ui.xmlfragment(
                        "frgConEnlace",
                        rootPath + ".view.fragment.detail.EtiquetaConEnlace",
                        oThat
                    );
                    oThat.getView().addDependent(oThat.onConEnlace);
                }
                oThat.onConEnlace.open();
            } catch (oError) {
                MessageBox.error(oError.responseText);
            }
        },

        onConfirmConEnlace: function () {
            try {
                MessageBox.confirm(formatter.onGetI18nText(oThat, "msgConfirmHUTickets"), {
                    onClose : async function(sButton) {
                        if (sButton === MessageBox.Action.OK) {
                            var oLineaActualRMD = oThat.getView().getModel("modelGeneral").getProperty("/LineaActualRMD"),
                                oCantidadHU = oThat.getView().getModel("modelGeneral").getProperty("/CantidadConHUOp");

                            var oData = {
                                "Vpobjkey": oLineaActualRMD.Aufnr,
                                "Maxqua": oCantidadHU.cantidad,
                                // "Vpobjkey": "200000580",//TEST_ETIQUETA
                                "Zflag": "1",//CREAR HU
                                "Hukey": util.onGetUUIDV4()
                                //"HUMensajeSet":
                                //    [
                                //    ]
                            }
                            // oData.HUMensajeSet.push({
                            //     "Venum": "",
                            //     "Vepos": "",
                            //     "Vpobjkey": "",
                            //     "Exidv": "",
                            //     "Type": "",
                            //     "Id": "",
                            //     "Number": "",
                            //     "Message": "",
                            //     "LogNo": "",
                            //     "LogMsgNo": "",
                            //     "MessageV1": "",
                            //     "MessageV2": "",
                            //     "MessageV3": "",
                            //     "MessageV4": "",
                            //     "Parameter": "",
                            //     "Row": 0,
                            //     "Field": "",
                            //     "System": ""
                            // });
                            var oModel = oThat.getOwnerComponent().getModel("NECESIDADESRMD_SRV");

                            //registroService.createData(oModel, "/HUSet", oData).then(async function(result) {
                            registroService.createData(oModel, "/HuOfflineSet", oData).then(async function(result) {
                                console.log(result);
                                //OFFLINE CAMBIO
                                // var aMessage = result.HUMensajeSet.results;
                                // if (aMessage.length > 0) {
                                //     let aMensajesError = '';
                                //     let aMensajesSuccess = '';
                                //     for await (const oMessage of aMessage) {
                                //         if (oMessage.Type === 'E' || oMessage.Type === 'I') {
                                //             aMensajesError = aMensajesError + '\n' + oMessage.Message;
                                //         }

                                //         if (oMessage.Type === 'S') {
                                //             aMensajesSuccess = aMensajesSuccess + '\n' + oMessage.Message
                                //         }
                                //     }

                                //     if (aMensajesError !== '') {
                                //         MessageBox.error(aMensajesError);
                                //     }

                                //     if (aMensajesSuccess !== '') {
                                MessageBox.success("La petici??n se puso en cola");
                                //oThat.onGetListHuAndCreateHana();
                                //     }
                                // } else {
                                //     oThat.onGetListHuAndCreateHana();
                                // }
                                
                                oThat.onConEnlace.close();

                                let oDataSeleccionada = oThat.getOwnerComponent().getModel("asociarDatos");
                                let fraccionActual = oDataSeleccionada.getData().aEstructura.results[0].fraccion;
                                let dataRmd = oDataSeleccionada.getData();

                                let aFilter = [];
                                aFilter.push(new Filter("usuarioId_usuarioId", "EQ", oInfoUsuario.data.usuarioId));
                                aFilter.push(new Filter("rmdId_rmdId", "EQ", dataRmd.rmdId));
                                aFilter.push(new Filter("fraccion", "EQ", fraccionActual));
                                let aLapsoSelected = await registroService.onGetDataGeneralFilters(oThat.mainModelv2, "RMD_VERIFICACION_FIRMAS", aFilter);
                                if(aLapsoSelected.results.length === 0){
                                    var oDataFirmaVerif = {}
                                    oDataFirmaVerif.rmdId           = dataRmd.rmdId;
                                    oDataFirmaVerif.fraccionActual  = fraccionActual;

                                    oThat.onRMD_VERIFICACION_FIRMAS(oDataFirmaVerif);
                                }

                            }).catch(function (oError) {
                                MessageBox.error("Ocurrio un error al crear el HU");
                                console.log(oError);
                                oThat.onConEnlace.close();
                                //sap.ui.core.BusyIndicator.hide();
                            })
                        }
                    }
                });
                this.onCancelConEnlace();
            } catch (oError) {
                MessageBox.error(oError.responseText);
            }
        },

        onCancelConEnlace: function () {
            oThat.onConEnlace.close();
        },

        onOpenSinEnlace:async function (nType) {
            try {
                let oLineaActualMD = oThat.getView().getModel("modelGeneral").getProperty("/LineaActualMD"),
                    Matkl = oThat.onValidarInfo(oLineaActualMD,"aReceta.results.0.recetaId.Matkl"),
                    oDataSeleccionada = oThat.getOwnerComponent().getModel("asociarDatos"),
                    oLineaActualRMD = oThat.getView().getModel("modelGeneral").getProperty("/LineaActualRMD"),
                    oEtiquetasSinEnlace = oThat.modelGeneral.getProperty("/EtiquetaSinEnlace");

                EanValue = null;
                if (nType === 1) {
                    if (Matkl !== sGrupoArticuloZS1) {
                        MessageBox.error(formatter.onGetI18nText(oThat, "msgNoAGranel"));
                        return false;
                    }
                } else if (nType === 2) {
                    let ObtenerEan = await this.getEanData(oLineaActualRMD.Matnr, '13');
                    if (ObtenerEan === '') {
                        MessageBox.error(formatter.onGetI18nText(oThat, "msgNoEAN13"));
                        return false;
                    } else {
                        if (ObtenerEan.results[0].Eantp !== "13"){
                            MessageBox.error(formatter.onGetI18nText(oThat, "msgNoEAN13"));
                            return false;
                        } else {
                            EanValue = ObtenerEan.results[0].Ean11;
                        }
                    }
                } else if (nType === 3) {
                    if (Matkl !== sGrupoArticuloZT1) {
                        MessageBox.error(formatter.onGetI18nText(oThat, "msgNoCajasEAN14"));
                        return false;
                    } else {
                        let ObtenerEan = await this.getEanData(oLineaActualRMD.Matnr, '14');
                        if (ObtenerEan === '') {
                            MessageBox.error(formatter.onGetI18nText(oThat, "msgNoCajasEAN14"));
                            return false;
                        } else {
                            if (ObtenerEan.results[0].Eantp !== "14"){
                                MessageBox.error(formatter.onGetI18nText(oThat, "msgNoCajasEAN14"));
                                return false;
                            } else {
                                EanValue = ObtenerEan.results[0].Ean11;
                            }
                        }
                    }
                } else if (nType === 4) {
                    if (Matkl !== sGrupoArticuloZT1) {
                        MessageBox.error(formatter.onGetI18nText(oThat, "msgNoCajasNoEAN14"));
                        return false;
                    }
                }
                oThat.nType = nType;
                if (nType === 1??||??nType === 2) {
                    if(!oThat.onSinEnlace){
                        oThat.onSinEnlace = sap.ui.xmlfragment(
                            "frgSinEnlace",
                            rootPath + ".view.fragment.detail.EtiquetaSinEnlace",
                            oThat
                        );
                        oThat.getView().addDependent(oThat.onSinEnlace);
                    }
                    oThat.onState(formatter.onGetI18nText(oThat, "lblCantidadEtiqueta"), "cantidadUnidadesI18n");
                    oThat.onState(true, "cantidadUnidades");
                    oThat.onState(false, "cantidadEtiqueta");
                    oThat.onState(false, "controlTicketsObs");
                    oEtiquetasSinEnlace.cantEtiqueta = 1;
                    oThat.modelGeneral.refresh(true);
                    oThat.onSinEnlace.open();
                } else if (nType === 3 || nType === 4) {
                    // let entity = "/CEMBSet('" + oDataSeleccionada.getData().productoId + "')";
                    // let entity = "/CEMBSet('6000010062')";
                    // await registroService.getDataAll(oThat.modelNecesidad, entity).then(aDataCemb => {
                        if (oLineaActualRMD.Umrez1) {
                            oEtiquetasSinEnlace.cantUnidades = parseFloat(oLineaActualRMD.Umrez1) / parseFloat(oLineaActualRMD.Umrez2);
        
                            if (oEtiquetasSinEnlace.cantUnidades && oEtiquetasSinEnlace.cantUnidades !== '' && oLineaActualRMD.Psmng && oLineaActualRMD.Psmng !== '') {
                                if (parseFloat(oEtiquetasSinEnlace.cantUnidades) === 0) {
                                    oEtiquetasSinEnlace.cantEtiqueta = 0;
                                } else {
                                    oEtiquetasSinEnlace.cantEtiqueta = Math.ceil(parseFloat(oLineaActualRMD.Psmng) / parseFloat(oEtiquetasSinEnlace.cantUnidades));
                                }
                            }
                            oThat.modelGeneral.refresh(true);
                        }

                        oThat.onState(formatter.onGetI18nText(oThat, "lblCantidadUnidades"), "cantidadUnidadesI18n");
                        oThat.onState(false, "cantidadUnidades");
                        oThat.onState(true, "cantidadEtiqueta");
                        oThat.onState(true, "controlTicketsObs");

                        if(!oThat.onSinEnlace){
                            oThat.onSinEnlace = sap.ui.xmlfragment(
                                "frgSinEnlace",
                                rootPath + ".view.fragment.detail.EtiquetaSinEnlace",
                                oThat
                            );
                            oThat.getView().addDependent(oThat.onSinEnlace);
                        }
                        oThat.onSinEnlace.open();
                    // }).catch(function (oError) {
                    //     oThatConf.onErrorMessage(oError, "errorSave");
                    //     sap.ui.core.BusyIndicator.hide();
                    // });
                }
            } catch (oError) {
                sap.ui.core.BusyIndicator.hide(0);
                MessageBox.error(oError.responseText);
            }
        },

        onConfirmSinEnlace:async function () {
            try {
                let oEtiquetaSinEnlace = oThat.getView().getModel("modelGeneral").getProperty("/EtiquetaSinEnlace"),
                    oLineaActualRMD = oThat.getView().getModel("modelGeneral").getProperty("/LineaActualRMD");

                var nType = '';
                if (oThat.nType === 1) {
                    nType = sGrupoArticuloZS1;
                } else if (oThat.nType === 2) {
                    nType = sGrupoArticuloZT1EAN13;
                } else if (oThat.nType === 3) {
                    nType = sGrupoArticuloZT1EAN14;
                } else if (oThat.nType === 4) {
                    nType = sGrupoArticuloZT1;
                }

                if (!oEtiquetaSinEnlace.cantEtiqueta || oEtiquetaSinEnlace.cantEtiqueta === '') {
                    MessageBox.warning(formatter.onGetI18nText(oThat, "msgValidateCantTickets"));
                    return false;
                }
                if (oEtiquetaSinEnlace.cantUnidades === null  || oEtiquetaSinEnlace.cantUnidades === '' || oEtiquetaSinEnlace.cantUnidades === undefined) {
                    MessageBox.warning(formatter.onGetI18nText(oThat, "msgValidateCantUn"));
                    return false;
                }
                let aFilter = [];
                aFilter.push(new Filter("orden", "EQ", oLineaActualRMD.Aufnr));
                aFilter.push(new Filter("tipo", "EQ", nType));
                sap.ui.core.BusyIndicator.show(0);
                let aEtiquetasControl = await registroService.getDataFilter(oThat.mainModelv2, "/ETIQUETAS_CONTROL", aFilter);
                if (aEtiquetasControl.results.length > 0) {
                    MessageBox.warning(formatter.onGetI18nText(oThat, "msgValidateRepeat"));
                    sap.ui.core.BusyIndicator.hide();
                    return false;
                }
                MessageBox.confirm(formatter.onGetI18nText(oThat, "msgConfirmNoHUTickets"), {
                    onClose : async function(sButton) {
                        sap.ui.core.BusyIndicator.show();
                        if (sButton === MessageBox.Action.OK) {
                            let oLineaActualRMD = oThat.getView().getModel("modelGeneral").getProperty("/LineaActualRMD");
                            //Este String aleatorio debe ajustarse para el hu , podria causar errores mas adelante
                            let sAleatorio = util.getRandomString();
                            let aSecuencia = [];
                            
                            for (let nSec = 1; nSec <= parseInt(oEtiquetaSinEnlace.cantEtiqueta); nSec++) {
                                let uuID = util.onUUID();
                                let oData = {
                                    etiquetasControlId: uuID,
                                    usuarioRegistro: oInfoUsuario.data.usuario,
                                    activo: true,
                                    orden: oLineaActualRMD.Aufnr,
                                    // orden: "200000580", //TEST_ETIQUETAS
                                    enlace: false,
                                    cantidadOrden: oLineaActualRMD.Psmng,
                                    cantidadUnidad: oEtiquetaSinEnlace.cantUnidades,
                                    secuencia: nSec,
                                    observacion: oEtiquetaSinEnlace.obsLicitacion,
                                    hu: sAleatorio,
                                    fechaRegistro: new Date(),
                                    tipo: nType,
                                    ean: EanValue,
                                    um: oLineaActualRMD.Amein
                                }
                                aSecuencia.push(oData);

                                registroService.onSaveDataGeneral(oThat.mainModelv2, "ETIQUETAS_CONTROL", oData).then(function (oResult) {
                                    console.log(oResult);
                                    //sap.ui.core.BusyIndicator.hide();
                                }).catch(function (oError) {
                                    //sap.ui.core.BusyIndicator.hide();
                                    throw oError;
                                });
                            }

                            let oTablaArrayInsert = {};
                                oTablaArrayInsert.terminal         = null;
                                oTablaArrayInsert.usuarioRegistro  = oInfoUsuario.data.usuario;
                                oTablaArrayInsert.fechaRegistro    = new Date();
                                oTablaArrayInsert.activo           = true;
                                //oTablaArrayInsert.aEtiquetasControl= aSecuencia;
                                oTablaArrayInsert.id               = util.onGetUUIDV4();

                            await oThat.onCrearEtiquetaGeneralHana(oThat.mainModelv2, "/TABLAS_ARRAY_MD_SKIP", oTablaArrayInsert);
                            
                            let oDataSeleccionada = oThat.getOwnerComponent().getModel("asociarDatos");
                            let fraccionActual = oDataSeleccionada.getData().aEstructura.results[0].fraccion;
                            let dataRmd = oDataSeleccionada.getData();
                            let aFilter = [];
                            aFilter.push(new Filter("usuarioId_usuarioId", "EQ", oInfoUsuario.data.usuarioId));
                            aFilter.push(new Filter("rmdId_rmdId", "EQ", dataRmd.rmdId));
                            aFilter.push(new Filter("fraccion", "EQ", fraccionActual));
                            let aLapsoSelected = await registroService.onGetDataGeneralFilters(oThat.mainModelv2, "RMD_VERIFICACION_FIRMAS", aFilter);
                            if(aLapsoSelected.results.length === 0){
                                var oDataFirmaVerif = {}
                                oDataFirmaVerif.rmdId           = dataRmd.rmdId;
                                oDataFirmaVerif.fraccionActual  = fraccionActual;

                                oThat.onRMD_VERIFICACION_FIRMAS(oDataFirmaVerif);
                            }
                            sap.ui.core.BusyIndicator.hide();
                            oThat.onCancelSinEnlace();
                        }
                        sap.ui.core.BusyIndicator.hide();
                    }
                });
            } catch (oError) {
                sap.ui.core.BusyIndicator.hide(0);
                oThatConf.onErrorMessage(oError, "errorSave");
            }
        },

        onCancelSinEnlace: function () {
            var oEtiquetaSinEnlace = oThat.getView().getModel("modelGeneral").getProperty("/EtiquetaSinEnlace");
            oEtiquetaSinEnlace.cantEtiqueta = '';
            oEtiquetaSinEnlace.cantUnidades = '';
            oEtiquetaSinEnlace.obsLicitacion = '';
            oThat.getView().getModel("modelGeneral").refresh(true);
            oThat.nType = '';
            oThat.onSinEnlace.close();
        },

        onChangeImprimir: function (oEvent) {
            let nSelected = oEvent.getSource().getSelectedIndex();
            if (nSelected === 0) {
                this.modelGeneral.setProperty("/ImprimirRango", false);
            } else if (nSelected === 1) {
                this.modelGeneral.setProperty("/ImprimirRango", true);
            }
        },

        onVisualizarTicket: async function (sendPrint) {
            try {
                sap.ui.core.BusyIndicator.show(0);
                let that = this;
                oThat.oLineaActualRMD = oThat.getView().getModel("modelGeneral").getProperty("/LineaActualRMD");
                oThat.oLineaActualMD = oThat.getView().getModel("modelGeneral").getProperty("/LineaActualMD");
                oThat.oLineaActualRMDdata = oThat.getView().getModel("modelGeneral").getProperty("/LineaActualRMDdata");
                oThat.oInfoUsuario = oThat.modelGeneral.getProperty("/oInfoUsuario");
                let oDataListEtiquetas = oThat.getView().getModel("modelGeneral").getProperty("/ListaEtiqueta");
                var aFilter = [];

                var oDataImpresion = oThat.getView().getModel("modelGeneral").getProperty("/oDataImpresion");
                var oLineaDeste = oDataImpresion.desde;
                var oLineaHasta = oDataImpresion.hasta;
                var oLineaCopia = oDataImpresion.copia;
                var rdbHU = oThat.getView().getModel("modelGeneral").getProperty("/oDataImpresion/hu");
                var oSelectedRango = oThat.getView().getModel("modelGeneral").getProperty("/ImprimirRango");
                // var oSelectedPrinter = oThat.getView().getModel("modelGeneral").getProperty("/selectedPrinterKey");
                // oThat.oSelectedPrinter = oThat.getView().getModel("modelGeneral").getProperty("/tipoDatoId_iMaestraId");
                if(oSelectedRango){
                    if(oLineaDeste && oLineaHasta){
                        aFilter.push(new Filter("secuencia", "BT", oLineaDeste<oLineaHasta?oLineaDeste : oLineaHasta, oLineaDeste<oLineaHasta?oLineaHasta : oLineaDeste));
                    }else{
                        sap.ui.core.BusyIndicator.hide();
                        MessageBox.warning(formatter.onGetI18nText(oThat, "errorVisualizaTicketRango"));
                        return;
                    }
                }
                if(!oThat.oSelectedPrinter){
                    sap.ui.core.BusyIndicator.hide();
                    MessageBox.warning(formatter.onGetI18nText(oThat, "errorPrinterSelected"));
                    return;
                }
                
                oThat.Matkl = oThat.onValidarInfo(oThat.oLineaActualMD,"aReceta.results.0.recetaId.Matkl");

                //Primero verifico las etiquetas que existen para la orden
                // aFilter.push(new Filter("orden", "EQ", "200000580"));//TEST_ETIQUETA
                aFilter.push(new Filter("orden", "EQ", oThat.oLineaActualRMD.Aufnr));//TEST_ETIQUETA
                aFilter.push(new Filter("activo", "EQ", true));

                if (rdbHU === 0) {
                    aFilter.push(new Filter("enlace", "EQ", true));
                } else {
                    aFilter.push(new Filter("enlace", "EQ", false));
                    if (oDataListEtiquetas.length > 0) {
                        aFilter.push(new Filter("tipo", "EQ", oDataListEtiquetas[0].tipo));
                    }
                }

                registroService.getDataFilter(oThat.mainModelv2, "/ETIQUETAS_CONTROL", aFilter).then(async function (oValue) {
                    if(oValue.results.length === 0){
                        sap.ui.core.BusyIndicator.hide();
                        MessageBox.warning(formatter.onGetI18nText(oThat, "errorNoData")+" "+oThat.oLineaActualRMD.Aufnr);
                        return;
                    }

                    if(sendPrint){
                        // if (!oThat.onVisualizeEtiqueta) {
                            oThat.onVisualizeEtiqueta = sap.ui.xmlfragment(
                                "frgVisualizeEnlace",
                                rootPath + ".view.dialog.visualizeEtiqueta",
                                oThat
                            );
                            oThat.getView().addDependent(oThat.onVisualizeEtiqueta);
                        // }
                        oThat.onVisualizeEtiqueta.open();
                        // sap.ui.getCore().byId(sap.ui.core.Fragment.createId("frgVisualizeEnlace", "carouselData")).destroyPages();
                    }

                    //-------- LOGICA PARA MOSTRAR ETIQUETAS ----------//

                    var oEtiquetas = null;
                    var fechaExpira = that.onValidarInfo(that.oLineaActualRMD, "VfdatBTP") != " " ? that.onFormatterDate(that.oLineaActualRMD.VfdatBTP) : "";
                    oValue.results.sort(function (a, b) {
                        return a.secuencia - b.secuencia;
                    });

                    let bFlag = true;

                    for await (const etiControl of oValue.results) {
                    // oValue.results.forEach(async function(etiControl){
                        if (etiControl.tipo === SGrupoArticuloPari) {
                            oEtiquetas = [2];
                        } else if (etiControl.tipo === sGrupoArticuloZS2) {
                            oEtiquetas = [1];
                        } else if (etiControl.tipo === sGrupoArticuloZS1) {
                            oEtiquetas = [3];
                        } else if (etiControl.tipo === sGrupoArticuloZT1EAN14 && fechaExpira !== '' && etiControl.observacion === '' ) {
                            oEtiquetas = [4];
                        } else if (etiControl.tipo === sGrupoArticuloZT1 && fechaExpira !== '' && etiControl.observacion === '' ) {
                            oEtiquetas = [5];
                        } else if (etiControl.tipo === sGrupoArticuloZT1EAN14 && fechaExpira === '' && etiControl.observacion === '' ) {
                            oEtiquetas = [6];
                        } else if (etiControl.tipo === sGrupoArticuloZT1 && fechaExpira === '' && etiControl.observacion === '' ) {
                            oEtiquetas = [7];
                        } else if (etiControl.tipo === sGrupoArticuloZT1EAN14 && fechaExpira !== '' && etiControl.observacion !== '' ) {
                            oEtiquetas = [8];
                        } else if (etiControl.tipo === sGrupoArticuloZT1 && fechaExpira !== '' && etiControl.observacion !== '' ) {
                            oEtiquetas = [9];
                        } else if (etiControl.tipo === sGrupoArticuloZT1EAN14 && fechaExpira === '' && etiControl.observacion !== '' ) {
                            oEtiquetas = [10];
                        } else if (etiControl.tipo === sGrupoArticuloZT1 && fechaExpira === '' && etiControl.observacion !== '' ) {
                            oEtiquetas = [11];
                        } else if (etiControl.tipo === sGrupoArticuloZT1EAN13){
                            oEtiquetas = [12];
                        }

                        if (oEtiquetas) {
                            await oThat.onObtenerEtiquetas(oEtiquetas,oThat.oLineaActualMD, oThat.oLineaActualRMDdata, oThat.oInfoUsuario, etiControl, sendPrint, oThat.oSelectedPrinter, fechaExpira, oLineaCopia);
                        } else {
                            bFlag = false;
                        }
                    }

                    if(!bFlag){
                        MessageBox.error(formatter.onGetI18nText(oThat, "msgNoEtiquetasPrint"));
                    }

                    sap.ui.core.BusyIndicator.hide();
                    if (!sendPrint) {
                        oThat.onCancelPDFViewerTicket();
                        oThat.onCancelListEtiquetaSinEnlace();
                        oThat.onCancelVisualizeEtiqueta();
                        MessageBox.success(formatter.onGetI18nText(oThat, "msgEtiquetasPrint"));
                    }
                }).catch(function (oError) {
                    sap.ui.core.BusyIndicator.hide();
                    MessageBox.error(oError);
                    console.log(oError);
                });
            } catch (oError) {
                sap.ui.core.BusyIndicator.hide();
                MessageBox.error(oError.responseText);
            }
        },
        onFormatterDate: function (dDate) {
            dDate = new Date(dDate);
            const sYear = dDate.getUTCFullYear();
            const sMonth = (dDate.getUTCMonth() + 1) < 10 ? '0' + (dDate.getUTCMonth() + 1) : (dDate.getUTCMonth() + 1);
            const sDay = dDate.getUTCDate() < 10 ? '0' + dDate.getUTCDate() : dDate.getUTCDate();
            
            const sFecha = sDay + "-" + sMonth + "-" + sYear;
            
          return sFecha;
        },
        onObtenerEtiquetas:async function(oEtiquetas, LineaMD, LineaRMD, iUsuario, etiControl, sendPrint, oSelectedPrinter, fechaExpira, oLineaCopia){
            try {
                var countEtiquetas = 0;
                for await (const valEtiquetas of oEtiquetas) {
                // oEtiquetas.forEach( async function(valEtiquetas){
                    countEtiquetas++;
                    var base64Etiqueta = await etiquetasPDF.onGeneratePdf(valEtiquetas,LineaMD,LineaRMD, iUsuario, etiControl, fechaExpira, sendPrint);
                    if(!sendPrint){
                        let copias = etiControl.cantidadUnidad === 0 ? 1 : etiControl.cantidadUnidad;
                        if (parseInt(oLineaCopia) !== 0) {
                            copias = oLineaCopia;
                        }
                        var oData = {
                            "Base64" : base64Etiqueta,
                            "Padest": oSelectedPrinter,
                            "Copias": copias,
                            "NameEti": "",
                            "Extension": "",
                            "Return": ""
                        }
                        await registroService.createData(oThat.modelNecesidad, "/EtiquetaPrintSet", oData).then(async function(oDataPrint){
                            if (oDataPrint.Subrc !== '00') {
                                MessageBox.error(oDataPrint.Return);
                            }
                            // Actualizar Etiquetas Control, los datos de impresi??n
                            let impresion;
                            let fechaImpresion;
                            let reimpresion = 0;
                            let fechaReimpresion;
                            
                            if (etiControl.impresion) {
                                impresion = etiControl.impresion;
                                fechaImpresion = etiControl.fechaImpresion;
                                reimpresion = etiControl.reimpresion ? etiControl.reimpresion + 1 : 0 + 1;
                                fechaReimpresion = new Date();
                            } else {
                                impresion = 1;
                                fechaImpresion = new Date();
                                fechaReimpresion = null;
                            }
                            let oDataEtiquetaControl = {
                                fechaActualiza: new Date(),
                                usuarioActualiza: oInfoUsuario.data.usuario,
                                impresion: impresion,
                                fechaImpresion: fechaImpresion,
                                reimpresion: reimpresion,
                                fechaReimpresion: fechaReimpresion
                            }

                            await registroService.onUpdateDataGeneral(oThat.mainModelv2, "ETIQUETAS_CONTROL", oDataEtiquetaControl, etiControl.etiquetasControlId);
                        })
                        .catch(function(err){
                            sap.ui.core.BusyIndicator.hide();
                            if (err.responseText) {
                                let messageJson = JSON.parse(err.responseText);
                                if (messageJson.error) {
                                    if (messageJson.error.message) {
                                        if (messageJson.error.message.value) {
                                            MessageBox.error(messageJson.error.message.value);
                                        }
                                    }
                                }
                            } else {
                                MessageBox.error(err.message);
                            }
                            return false;
                        })
                    } else {
                        //AbrirCAROUSEL PDF
                        var oHtmlChange = new sap.ui.core.HTML({
                            content: "<iframe src=" + base64Etiqueta + " width='430' height='380'></iframe>"
                        });
                        sap.ui.getCore().byId(sap.ui.core.Fragment.createId("frgVisualizeEnlace", "carouselData")).addPage(oHtmlChange);
                    }
                }
            } catch (oError) {
                sap.ui.core.BusyIndicator.hide();
                MessageBox.error(oError.responseText);
            }
        },
        onValidarInfo: function(aDataEstructuras,Estructura){
            let BusquedaEstructuras = Estructura.split(".");
            let data = aDataEstructuras;
            BusquedaEstructuras.forEach(function(info){
                // var data = aDataEstructuras[info];
                if(data){
                data = data[info];
                }else {
                return ' ';
                }
            })
            return data? data : ' ';
        },
        getEanData:function(Matnr, Ean){
            try {
                let aFilters = [];
                // aFilters.push(new Filter("Matnr", "EQ", '6000000007')); //ORDEN
                aFilters.push(new Filter("Matnr", "EQ", Matnr)); //ORDEN
                aFilters.push(new Filter("Eantp", "EQ", Ean));  //PUESTO TRABAJO
                // aFilters.push(new Filter("Ktsch", "EQ", "")) //SCHEDULE

                //promise
                return new Promise((resolve, reject) => {
                
                    registroService.getDataFilter(this.modelNecesidad,"/EANSet",aFilters)
                    .then(function(payload){
                        resolve(payload);
                    })
                    .catch(function(err){
                        resolve("");
                    })
                })
            } catch (oError) {
                MessageBox.error(oError.responseText);
            }
        },

        onCancelVisualizeEtiqueta:function(){
            sap.ui.getCore().byId(sap.ui.core.Fragment.createId("frgVisualizeEnlace", "carouselData")).removeAllPages();
            oThat.onVisualizeEtiqueta.destroy();
        },

        onImprimirTicket: function () {
            MessageBox.confirm("??Est?? seguro imprimir el ticket?", {
                onClose : async function(sButton) {
                    if (sButton === MessageBox.Action.OK) {
                        // oThat.onImprimirEtiquetaControl();
                        oThat.onVisualizarTicket(false);
                        // oThat.onCancelPDFViewerTicket();
                    }
                }
            });
        },
        onVisualizarTicketObj: function(){
            oThat.oSelectedPrinter = oThat.getView().getModel("modelGeneral").getProperty("/tipoDatoId_iMaestraId");
            oThat.onVisualizarTicket(true);
        },

        onOpenListEtiquetaConEnlace: async function () {
            //MODELO FECHA ACTUAL
            var FechaActual = new Date();
            oThat.getView().setModel(new JSONModel({ "FechaActual": FechaActual }), "FechaActualModel");

            //MODELO FILTROS
            var aFiltros = {
                Hu: "",
                Material: "",
                UM: "",
                Lote: ""
            }
            oThat.getView().setModel(new JSONModel(aFiltros), "FiltersModel");

            if (!oThat.onListEtiquetaConEnlace) {
                oThat.onListEtiquetaConEnlace = sap.ui.xmlfragment(
                    "frgListEnlace",
                    rootPath + ".view.fragment.detail.ListaEtiquetasConEnlace",
                    oThat
                );
                oThat.getView().addDependent(oThat.onListEtiquetaConEnlace);
            }
            oThat.onListEtiquetaConEnlace.open();

            //OBTENER DATA LISTA DE ETIQUETAS
            oThat.onObtenerListEtiqueta();
        },
        //OBTENER DATA LISTA DE ETIQUETAS
        onObtenerListEtiqueta:async function () {
            var oLineaActualRMD = oThat.getView().getModel("modelGeneral").getProperty("/LineaActualRMD");
            var aFilters = [];
            aFilters.push(new Filter("Vpobjkey", "EQ", oLineaActualRMD.Aufnr));
            // aFilters.push(new Filter("Vpobjkey", "EQ", "200000580"));//TEST_ETIQUETA

            sap.ui.core.BusyIndicator.show(0);
            //OFFLINE CAMBIO
            //await registroService.onGetDataGeneralFilters(oThat.modelNecesidad, "HUSet", aFilters).then(async function (aHu) {
            await registroService.onGetDataGeneralFilters(oThat.modelNecesidad, "HuOfflineSet", aFilters).then(async function (aHu) {
                for await (const oItem of aHu.results) {
                    var aFilter = [];
                    aFilter.push(new Filter("hu", "EQ", oItem.Exidv));
                    aFilter.push(new Filter("orden", "EQ", oLineaActualRMD.Aufnr));
                    aFilter.push(new Filter("Venum", "EQ", oItem.Venum));
                    aFilter.push(new Filter("activo", "EQ", true));
    
                    let oDataEtiquetasControl = await registroService.getDataFilter(oThat.mainModelv2, "/ETIQUETAS_CONTROL", aFilter);
                    if (oDataEtiquetasControl.results.length > 0) {
                        oItem.Umrez = oDataEtiquetasControl.results[0].cantidadUnidad;
                        oItem.tipo = oDataEtiquetasControl.results[0].tipo;
                    }
                }
                
                oThat.getView().getModel("modelGeneral").setProperty("/ListaEtiqueta", aHu.results);
                sap.ui.core.BusyIndicator.hide();
            }).catch(function (oError) {
                console.log(oError);
                oThat.getView().getModel("modelGeneral").setProperty("/ListaEtiqueta", []);
                sap.ui.core.BusyIndicator.hide();
            })
        },
        onOpenListEtiquetaSinEnlace: async function (nType) {
            //MODELO FECHA ACTUAL
            var FechaActual = new Date();
            oThat.getView().setModel(new JSONModel({ "FechaActual": FechaActual }), "FechaActualModel");

            //MODELO FILTROS
            var aFiltros = {
                Hu: "",
                Material: "",
                UM: "",
                Lote: ""
            }
            oThat.getView().setModel(new JSONModel(aFiltros), "FiltersModel");

            if (nType === 1 || nType === 2) {
                oThat.onState(false, "visibleAddControlTickets");
            } else if (nType === 3 || nType === 4) {
                oThat.onState(true, "visibleAddControlTickets");
            }

            if (!oThat.onListEtiquetaSinEnlace) {
                oThat.onListEtiquetaSinEnlace = sap.ui.xmlfragment(
                    "frgListEnlace",
                    rootPath + ".view.fragment.detail.ListaEtiquetasSinEnlace",
                    oThat
                );
                oThat.getView().addDependent(oThat.onListEtiquetaSinEnlace);
            }
            oThat.onListEtiquetaSinEnlace.open();

            //OBTENER DATA LISTA DE ETIQUETAS
            oThat.onObtenerListEtiquetaSinEnlace(nType);
        },
        onObtenerListEtiquetaSinEnlace:async function (nType) {
            var oLineaActualRMD = oThat.getView().getModel("modelGeneral").getProperty("/LineaActualRMD");
            var aFilters = [];
            aFilters.push(new Filter("orden", "EQ", oLineaActualRMD.Aufnr));
            oThat.nType = nType;
            if (nType === 1) {
                aFilters.push(new Filter("tipo", "EQ", sGrupoArticuloZS1));
            } else if (nType === 2) {
                aFilters.push(new Filter("tipo", "EQ", sGrupoArticuloZT1EAN13));
            } else if (nType === 3) {
                aFilters.push(new Filter("tipo", "EQ", sGrupoArticuloZT1EAN14));
            } else if (nType === 4) {
                aFilters.push(new Filter("tipo", "EQ", sGrupoArticuloZT1));
            }
            // aFilters.push(new Filter("Vpobjkey", "EQ", "200000580"));//TEST_ETIQUETA

            sap.ui.core.BusyIndicator.show(0);
            await registroService.getDataFilter(oThat.mainModelv2, "/ETIQUETAS_CONTROL", aFilters).then(function (oValue) {
                sap.ui.core.BusyIndicator.hide();
                if (oValue.results.length > 0) {
                    oValue.results.sort(function (a, b) {
                        return a.secuencia - b.secuencia;
                    });
                }
                
                oThat.getView().getModel("modelGeneral").setProperty("/ListaEtiqueta", oValue.results);
                oThat.getView().getModel("modelGeneral").refresh(true);
            }).catch(function (oError) {
                //sap.ui.core.BusyIndicator.hide();
                console.log(oError);
            });
        },

        onCancelListEtiquetaConEnlace: function () {
            oThat.nType = '';
            oThat.onListEtiquetaConEnlace.close();
        },

        onCancelListEtiquetaSinEnlace: function () {
            oThat.nType = '';
            if (oThat.onListEtiquetaSinEnlace) {
                oThat.onListEtiquetaSinEnlace.close();
            }
            if (oThat.onListEtiquetaConEnlace) {
                oThat.onListEtiquetaConEnlace.close();
            }
        },

        //EDITAR ETIQUETA
        onPressEditEtiqueta: function (oEvent) {
            var oCell = oEvent.getSource().getParent();
            var oDataFila = oCell.getBindingContext("modelGeneral").getObject();

            oThat.getView().setModel(new JSONModel(oDataFila), "dataModel");

            if (!oThat.onFragmentEditEtiqueta) {
                oThat.onFragmentEditEtiqueta = sap.ui.xmlfragment(
                    "frgEditEtiqueta",
                    rootPath + ".view.dialog.editEtiqueta",
                    oThat
                );
                oThat.getView().addDependent(this.onFragmentEditEtiqueta);
            }
            oThat.onFragmentEditEtiqueta.open();

        },
        onConfirmDialogEtiqueta:async function () {
            var oDataModel = oThat.getView().getModel("dataModel");
            let oLineaActualRMD = oThat.getView().getModel("modelGeneral").getProperty("/LineaActualRMD");
            var oDataFila = oDataModel.getData();
            let nHumng = oDataFila.Resu1 * oDataFila.Umrez;
            //OFFLINE CAMBIO
            var oData = {
                "Exidv": oDataFila.Exidv,
                "Humng": nHumng.toString(),
                "Zflag": "2",//Editar Cantidad
                "Hukey": util.onGetUUIDV4()
                // "HUMensajeSet":
                //     [
                //     ]
            }
            var oModel = oThat.getOwnerComponent().getModel("NECESIDADESRMD_SRV");
            sap.ui.core.BusyIndicator.show(0);
            //await registroService.onSaveDataGeneral(oModel, "/HUSet", oData).then(async function (result) {
            await registroService.onSaveDataGeneral(oModel, "/HuOfflineSet", oData).then(async function (result) {
                sap.ui.core.BusyIndicator.hide();
                console.log(result);
                // var aMessage = result.HUMensajeSet.results;
                // var item = aMessage.length - 1;
                // var oMessageFinal = aMessage[item];

                // if (oMessageFinal.Type === "E") {
                //     MessageBox.error(oMessageFinal.Message);
                // } else {
                    // Actualizar las cantidades en Etiquetas Control
                    var aFilter = [];
                    aFilter.push(new Filter("hu", "EQ", oDataFila.Exidv));
                    aFilter.push(new Filter("orden", "EQ", oLineaActualRMD.Aufnr));
                    aFilter.push(new Filter("Venum", "EQ", oDataFila.Venum));
                    aFilter.push(new Filter("activo", "EQ", true));

                    let oDataEtiquetasControl = await registroService.getDataFilter(oThat.mainModelv2, "/ETIQUETAS_CONTROL", aFilter);
                    if (oDataEtiquetasControl.results.length > 0) {
                        let oDataUpdate = {
                            fechaActualiza: new Date(),
                            usuarioActualiza: oInfoUsuario.data.usuario,
                            cantidadOrden: oDataFila.Resu1
                        }
        
                        await registroService.onUpdateDataGeneral(oThat.mainModelv2, "ETIQUETAS_CONTROL", oDataUpdate, oDataEtiquetasControl.results[0].etiquetasControlId);
                    }
                    // await oThat.onEditCantHana(oThat.mainModelv2, oDataFila);
                    MessageBox.success(oMessageFinal.Message);
                    await oThat.onObtenerListEtiqueta();
                // }
                this.onFragmentEditEtiqueta.close();

            }).catch(function (oError) {
                console.log(oError);
                this.onFragmentEditEtiqueta.close();
                sap.ui.core.BusyIndicator.hide();
            })
        },
        onCancelDialogEtiqueta: function () {
            this.onFragmentEditEtiqueta.close();
        },

        //ELIMINAR ETIQUETA MASIVO
        onDeleteEtiquetaMasivo: async function(oEvent){
            var btable = oEvent.getSource().getParent().getParent();
            var aSelectedItems = btable.getSelectedItems();

            if(aSelectedItems.length === 0){
                MessageBox.warning("Debe seleccionar por lo menos 1 etiqueta para poder eliminar en masivo.");
                return;
            }
            var error = 0, success = 0;
            MessageBox.warning("??Esta seguro de que desea eliminar el registro?", {
                actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
                emphasizedAction: MessageBox.Action.OK,
                onClose:async function (sAction) {
                    if (sAction === "OK") {
                        sap.ui.core.BusyIndicator.show(0);
                        for await (const line of aSelectedItems) {
                            var oDataFila = line.getBindingContext("modelGeneral").getObject()
                            //Eliminar en SAP
                            var oModel = oThat.getOwnerComponent().getModel("NECESIDADESRMD_SRV");
                            //OFFLINE CAMBIO
                            var oData = {
                                "Exidv": oDataFila.Exidv,
                                "Zflag": "4",//Eliminar
                                "Hukey":util.onGetUUIDV4()
                                // "HUMensajeSet":
                                //     [
                                //     ]
                            }
                            //await registroService.onSaveDataGeneral(oModel, "/HUSet", oData).then(async function (result) {
                            await registroService.onSaveDataGeneral(oModel, "/HuOfflineSet", oData).then(async function (result) {    
                                //Elimina la etiqueta en Hana si es que existe
                                await oThat.onDeleteHana(oThat.mainModelv2, oDataFila);

                                // var aMessage = result.HUMensajeSet.results;
                                // var item = aMessage.length - 1;
                                // var oMessageFinal = aMessage[item];

                                // if (oMessageFinal.Type === "E") {
                                //     error++;
                                // } else {
                                //     success++;
                                // }
                                console.log(result);
                                // MessageToast.show("Registro Eliminado");
                            }).catch(function (oError) {
                                error++;
                                console.log(oError);
                            });
                        }
                        sap.ui.core.BusyIndicator.hide();
                        await oThat.onObtenerListEtiqueta();
                        btable.removeSelections(true);
                        let sMensaje = "Se borraron "+ success + " de "+ (success+error)+" etiquetas seleccionadas.";
                        if(success != 0){
                            MessageBox.success(sMensaje);
                        }else {
                            MessageBox.error(sMensaje);
                        }

                    }
                }
            });
        },

        //ELIMINAR ETIQUETA
        onPressDeleteEtiqueta: function (oEvent) {
            var oCell = oEvent.getSource().getParent();
            var oDataFila = oCell.getBindingContext("modelGeneral").getObject();
            MessageBox.warning("??Esta seguro de que desea eliminar el registro?", {
                actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
                emphasizedAction: MessageBox.Action.OK,
                onClose:async function (sAction) {
                    if (sAction === "OK") {

                        //Elimina la etiqueta en Hana si es que existe
                        await oThat.onDeleteHana(oThat.mainModelv2, oDataFila);

                        //Eliminar en SAP
                        //OFFLINE CAMBIO
                        var oModel = oThat.getOwnerComponent().getModel("NECESIDADESRMD_SRV");
                        var oData = {
                            "Exidv": oDataFila.Exidv,
                            "Zflag": "4",//Eliminar
                            "Hukey": util.onGetUUIDV4()
                            // "HUMensajeSet":
                            //     [
                            //     ]
                        }
                        sap.ui.core.BusyIndicator.show(0);
                        //await registroService.onSaveDataGeneral(oModel, "/HUSet", oData).then(async function (result) {
                        await registroService.onSaveDataGeneral(oModel, "/HuOfflineSet", oData).then(async function (result) {
                            console.log(result);
                            MessageToast.show("Registro Eliminado");
                            sap.ui.core.BusyIndicator.hide();
                            await oThat.onObtenerListEtiqueta();
                        }).catch(function (oError) {
                            console.log(oError);
                            sap.ui.core.BusyIndicator.hide();
                        });
                    }
                }
            });
        },

        //CERRAR O EMBALAR ETIQUETA
        onPressCerrarEtiqueta: function (oEvent) {
            var oCell = oEvent.getSource().getParent();
            var oDataFila = oCell.getBindingContext("modelGeneral").getObject();

            oThat.getView().setModel(new JSONModel(oDataFila), "dataModel");

            if (!oThat.onFragmentEmbalarEtiqueta) {
                oThat.onFragmentEmbalarEtiqueta = sap.ui.xmlfragment(
                    "frgEmbalarEtiqueta",
                    rootPath + ".view.dialog.embalarEtiqueta",
                    oThat
                );
                oThat.getView().addDependent(this.onFragmentEmbalarEtiqueta);
            }
            oThat.onFragmentEmbalarEtiqueta.open();
        },

        onConfirmEmbalarEtiqueta: function () {
            MessageBox.information("??Desea cerrar registro?", {
                actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
                emphasizedAction: MessageBox.Action.OK,
                onClose: function (sAction) {
                    if (sAction === "OK") {
                        var oDateCont = oThat.getView().getModel("FechaActualModel");
                        oDateCont = oDateCont.getData();
                        var sDateSap = util.onConvertDateForSap(oDateCont.FechaActual);

                        var oDataModel = oThat.getView().getModel("dataModel");
                        var oDataFila = oDataModel.getData();
                        //OFFLINE CAMBIO
                        var oData = {
                            "Exidv": oDataFila.Exidv,
                            "Budat": sDateSap,
                            "Proddate": sDateSap,
                            "Zflag": "3",//Cerrar o Embalar
                            "Hukey": util.onGetUUIDV4()
                            // "HUMensajeSet":
                            //     [
                            //     ]
                        }
                        var oModel = oThat.getOwnerComponent().getModel("NECESIDADESRMD_SRV");
                        sap.ui.core.BusyIndicator.show(0);
                        //registroService.onSaveDataGeneral(oModel, "/HUSet", oData).then(async function (result) {
                        registroService.onSaveDataGeneral(oModel, "/HuOfflineSet", oData).then(async function (result) {
                            sap.ui.core.BusyIndicator.hide();
                            console.log(result);
                            // var aMessage = result.HUMensajeSet.results;
                            // var item = aMessage.length - 1;
                            // var oMessageFinal = aMessage[item];

                            // if (oMessageFinal.Type === "E") {
                            //     MessageBox.error(oMessageFinal.Message);
                            // } else {
                                 MessageBox.success("La peticion se puson en cola");
                            // }
                            await oThat.onObtenerListEtiqueta();
                            oThat.onFragmentEmbalarEtiqueta.close();

                        }).catch(function (oError) {
                            sap.ui.core.BusyIndicator.hide();
                            console.log(oError);
                            oThat.onFragmentEmbalarEtiqueta.close();
                        })
                    }
                }
            });
        },
        onCancelEmbalarEtiqueta: function () {
            oThat.onFragmentEmbalarEtiqueta.close();
        },

        //FILTROS
        onSearchFilter: function (oEvent) {
            var oModelFilters = this.getView().getModel("FiltersModel");
            var oDataFilers = oModelFilters.getData();

            var aFilter = [];

            if (oDataFilers.Hu)
                aFilter.push(new Filter("Exidv", "EQ", oDataFilers.Hu));

            //if( oDataFilers.Material)
            //aFilter.push(new Filter("Matnr", "EQ", oDataFilers.Material));

            var allFilter = new Filter({
                filters: aFilter,
                and: false
            })

            //TABLA
            var oTableEtiquetas = oEvent.getSource().getParent().getContent()[1].getContent()[0];

            if (aFilter.length) {
                oTableEtiquetas.getBinding("items").filter(allFilter);
            } else {
                oTableEtiquetas.getBinding("items").filter();
            }
        },
        
        onChangeCountTickets: function () {
            try {
                let oEtiquetaSinEnlace = oThat.getView().getModel("modelGeneral").getProperty("/EtiquetaSinEnlace"),
                    oLineaActualRMD = oThat.getView().getModel("modelGeneral").getProperty("/LineaActualRMD");
                if (oEtiquetaSinEnlace.cantUnidades && oEtiquetaSinEnlace.cantUnidades !== '' && oLineaActualRMD.Psmng && oLineaActualRMD.Psmng !== '') {
                    if (parseFloat(oEtiquetaSinEnlace.cantUnidades) === 0) {
                        oEtiquetaSinEnlace.cantEtiqueta = 0;
                    } else {
                        oEtiquetaSinEnlace.cantEtiqueta = Math.ceil(parseFloat(oLineaActualRMD.Psmng) / parseFloat(oEtiquetaSinEnlace.cantUnidades));
                    }
                }
            } catch (oError) {
                MessageBox.error(oError.responseText);
            }
        },

        //RESTAURAR FILTROS
        onRestoreFilters: function (oEvent) {
            try {
                var aFiltros = {
                    Hu: "",
                    Material: "",
                    UM: "",
                    Lote: ""
                }
                this.getView().setModel(new JSONModel(aFiltros), "FiltersModel");

                var oTableEtiquetas = oEvent.getSource().getParent().getContent()[1].getContent()[0];
                oTableEtiquetas.getBinding("items").filter();
            } catch (oError) {
                MessageBox.error(oError.responseText);
            }
        },

        onCrearEtiquetaGeneralHana: function (Modelo, Entidad, oData) {
            try {
                sap.ui.core.BusyIndicator.show(0);
                registroService.createData(Modelo, Entidad, oData).then(function (oDataSaved) {
                    sap.ui.core.BusyIndicator.hide();
                    console.log(oDataSaved);
                    //MessageBox.success("Se cre?? la etiqueta correctamente.");
                }).catch(function (oError) {
                    MessageBox.error("Ocurrio un error al crear etiqueta en Hana");
                    console.log(oError);
                    sap.ui.core.BusyIndicator.hide();
                });
            } catch (oError) {
                MessageBox.error(oError.responseText);
            }
        },

        onDeleteHana: function (oModel, oDataFila) {
            try {
                //Primero verifico si existe el HU en HANA
                var aFilter = [];
                //oDataFila.Exidv = "50000001";
                aFilter.push(new Filter("hu", "EQ", oDataFila.Exidv));
                aFilter.push(new Filter("Venum", "EQ", oDataFila.Venum));
                aFilter.push(new Filter("activo", "EQ", true));

                registroService.getDataFilter(oModel, "/ETIQUETAS_CONTROL", aFilter).then(function (oValue) {
                    if (oValue.results.length) {
                        oValue.results[0].activo = false;
                        oValue.results[0].usuarioActualiza = oInfoUsuario.data.usuario;
                        delete oValue.results[0].__metadata;

                        registroService.onUpdateDataGeneral(oModel, "ETIQUETAS_CONTROL", oValue.results[0], oValue.results[0].etiquetasControlId).then(function (oResult) {
                            console.log(oResult);
                        });
                    }
                }).catch(function (oError) {
                    //sap.ui.core.BusyIndicator.hide();
                    console.log(oError);
                });
            } catch (oError) {
                MessageBox.error(oError.responseText);
            }
        },
        onEditCantHana: function (oModel, oDataFila) {
            try {
                //Primero verifico si existe el HU en HANA
                var aFilter = [];
                //oDataFila.Exidv = "50000001";//TEST_ETIQUETA
                aFilter.push(new Filter("hu", "EQ", oDataFila.Exidv));
                aFilter.push(new Filter("activo", "EQ", true));

                registroService.getDataFilter(oModel, "/ETIQUETAS_CONTROL", aFilter).then(function (oValue) {
                    if (oValue.results.length) {
                        oValue.results[0].cantidad = oDataFila.Vemng;
                        oValue.results[0].usuarioActualiza = oInfoUsuario.data.usuario;
                        oValue.results[0].fechaActualiza = new Date();
                        delete oValue.results[0].__metadata;

                        registroService.onUpdateDataGeneral(oModel, "/ETIQUETAS_CONTROL", oValue.results[0], oValue.results[0].etiquetasControlId).then(function (oResult) {
                            console.log(oResult);
                        });
                    }
                }).catch(function (oError) {
                    //sap.ui.core.BusyIndicator.hide();
                    console.log(oError);
                });
            } catch (oError) {
                MessageBox.error(oError.responseText);
            }
        },

        //Obtener lista de Hu y crear en HANA
        onGetListHuAndCreateHana: function () {
            try {
                sap.ui.core.BusyIndicator.show();
                let oLineaActualRMD = oThat.getView().getModel("modelGeneral").getProperty("/LineaActualRMD");
                let aFilters = [];
                aFilters.push(new Filter("Vpobjkey", "EQ", oLineaActualRMD.Aufnr));
                // aFilters.push(new Filter("Vpobjkey", "EQ", "200000580"));//TEST_ETIQUETA
                //registroService.onGetDataGeneralFilters(oThat.modelNecesidad, "HUSet", aFilters).then(async function(result) {
                registroService.onGetDataGeneralFilters(oThat.modelNecesidad, "HuOfflineSet", aFilters).then(async function(result) {
                    let aListHus = result.results;
                    let oHuCreado = aListHus[aListHus.length-1];
                    let aSecuencia = [];
                    let nType = '';
                    if (oThat.nType === 1) {
                        nType = SGrupoArticuloPari;
                    } else if (oThat.nType === 2) {
                        nType = sGrupoArticuloZS2;
                    }
                    var aFilter = [];
                    aFilter.push(new Filter("orden", "EQ", oLineaActualRMD.Aufnr));
                    aFilter.push(new Filter("enlace", "EQ", true));
                    aFilter.push(new Filter("activo", "EQ", true));

                    let oDataEtiquetasControl = await registroService.getDataFilter(oThat.mainModelv2, "/ETIQUETAS_CONTROL", aFilter);
                    for (let nSec = 0; nSec < aListHus.length; nSec++) {
                        let oDataHu = oDataEtiquetasControl.results.find(itm=>itm.Venum === aListHus[nSec].Venum);
                        
                        if (!oDataHu) {
                            let uuID = util.onUUID();
                            let oData = {
                                etiquetasControlId: uuID,
                                hu: aListHus[nSec].Exidv,
                                usuarioRegistro: oInfoUsuario.data.usuario,
                                activo: true,
                                orden: aListHus[nSec].Vpobjkey,
                                enlace: true,
                                cantidadOrden: aListHus[nSec].Resu1,
                                cantidadUnidad: aListHus[nSec].Umrez,
                                secuencia: nSec + 1,
                                impresion: 0,
                                observacion: "",
                                fechaRegistro: new Date(),
                                tipo: nType,
                                um: aListHus[nSec].Altme,
                                Venum: aListHus[nSec].Venum
                            }
                            aSecuencia.push(oData);
                        }
                    }
                    let oTablaArrayInsert = {};
                        oTablaArrayInsert.terminal         = null;
                        oTablaArrayInsert.usuarioRegistro  = oInfoUsuario.data.usuario;
                        oTablaArrayInsert.fechaRegistro    = new Date();
                        oTablaArrayInsert.activo           = true;
                        oTablaArrayInsert.aEtiquetasControl= aSecuencia;
                        oTablaArrayInsert.id               = util.onGetUUIDV4();

                    oThat.onCrearEtiquetaGeneralHana(oThat.mainModelv2, "/TABLAS_ARRAY_MD_SKIP", oTablaArrayInsert);

                }).catch(function (oError) {
                    console.log(oError);
                    sap.ui.core.BusyIndicator.hide();
                });
            } catch (oError) {
                MessageBox.error(oError.responseText);
            }
        },

        onImprimirEtiquetaControl:function(){
            try {
                var oLineaActualRMD = oThat.getView().getModel("modelGeneral").getProperty("/LineaActualRMD");
                
                //Primero verifico las etiquetas que existen para la orden
                var aFilter = [];
                //oDataFila.Exidv = "50000001";//TEST_ETIQUETA
                //aFilter.push(new Filter("orden", "EQ", oLineaActualRMD.Aufnr));
                aFilter.push(new Filter("orden", "EQ", "200000580"));//TEST_ETIQUETA
                aFilter.push(new Filter("activo", "EQ", true));

                registroService.getDataFilter(oThat.mainModelv2, "/ETIQUETAS_CONTROL", aFilter).then(function (oValue) {
                    console.log(oValue);
                    if (oValue.results.length) {
                        var iCant = oValue.results.length;
                        if(oValue.results[iCant-1].impresion !== 1){
                            oValue.results[iCant-1].impresion = 1;
                            oValue.results[iCant-1].usuarioActualiza = oInfoUsuario.data.usuario;
                            oValue.results[iCant-1].fechaActualiza = new Date();
                        }else{
                            oValue.results[iCant-1].reimpresion++;
                            oValue.results[iCant-1].usuarioActualiza = oInfoUsuario.data.usuario;
                            oValue.results[iCant-1].fechaActualiza = new Date();
                        }
                        delete oValue.results[iCant-1].__metadata;

                        registroService.onUpdateDataGeneral(oThat.mainModelv2, "/ETIQUETAS_CONTROL", oValue.results[iCant-1], oValue.results[iCant-1].etiquetasControlId).then(function (oResult) {
                            MessageBox.success("Se realiz?? la impresi??n correctamente.");
                            console.log(oResult);
                        });
                    }
                }).catch(function (oError) {
                    //sap.ui.core.BusyIndicator.hide();
                    console.log(oError);
                });
            } catch (oError) {
                MessageBox.error(oError.responseText);
            }
        },

        // Para poder agregar agrupadores a la estructura de equipos.
        onAddAgrupador: function () {
            try {
                if (!this.oAddAgrupador) {
                    this.oAddAgrupador = sap.ui.xmlfragment(
                        "frgAddAgrupador",
                        rootPath + ".view.fragment.editarRM.body.BodyAddAgrupador",
                        this
                    );
                    oThat.getView().addDependent(this.oAddAgrupador);
                }

                this.oAddAgrupador.open();
            } catch (oError) {
                MessageBox.error(oError.responseText);
            }
        },

        onConfirmAddAgrupador: function () {
            let oDataSeleccionada = oThat.getOwnerComponent().getModel("asociarDatos");
            let fraccionActual = oDataSeleccionada.getData().aEstructura.results[0].fraccion;
            let key = oThat.getView().byId("idEstructuraWizard").getSelectedKey();
            let oEstructuraSeleccionada = oDataSeleccionada.getData().aEstructura.results.find(itm=>itm.orden === Number(key));
            let oTable = sap.ui.core.Fragment.byId("frgAddAgrupador", "tblAgrupador");
            let aListSelectedPaths = oTable._aSelectedPaths;
            if (aListSelectedPaths.length > 0) {
                MessageBox.confirm(formatter.onGetI18nText(oThat, "sMesaggeSaveAgrupadorUtensilio"), {
                    actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
                    emphasizedAction: MessageBox.Action.OK,
                    onClose: async function (sAction) {
                        if (sAction === "OK") {
                            BusyIndicator.show(0);
                            aListSelectedPaths.forEach(async function(sPath){
                                let oUtensilioAgrupador = oThat.mainModelv2.getProperty(sPath);
                                let oObj = {
                                    usuarioRegistro: oInfoUsuario.data.usuario,
                                    fechaRegistro: new Date(),
                                    activo: true,
                                    rmdEstructuraUtensilioId : util.onGetUUIDV4(),
                                    rmdEstructuraId_rmdEstructuraId: oEstructuraSeleccionada.rmdEstructuraId,
                                    rmdId_rmdId: oDataSeleccionada.getData().rmdId,
                                    fraccion: fraccionActual,
                                    agrupadorId_clasificacionUtensilioId : oUtensilioAgrupador.clasificacionUtensilioId,
                                    aplica: true
                                }
                                await registroService.onSaveDataGeneral(oThat.mainModelv2, "RMD_ES_UTENSILIO", oObj);
                            });
                            oTable.removeSelections();
                            oThat.onCerrarAddAgrupador();
                            oThat.onCancelAddEquipoEditRM();
                            MessageBox.success(oThat.getView().getModel("i18n").getResourceBundle().getText("successCreated"));
                            BusyIndicator.hide();  
                        }
                    },
                });
            } else {
                MessageBox.success(formatter.onGetI18nText(oThat, "sNoRegistroSeleccionado"));
            }
        },
        onCerrarAddAgrupador: function () {
            this.oAddAgrupador.close();
        },
        oncheckSave: async function(oEvent){
            // console.log("oEvent");
            var oInfoUsuario = oThat.modelGeneral.getProperty("/oInfoUsuario");
            let oRows = oEvent.getSource().getParent().getParent().getParent().mAggregations.items;
            let oParam = oEvent.getSource().getParent().getParent().oParam;
            let oControl = oEvent.getSource().getParent().getParent().getCells();
            let aUsuarios = [];
            let aFechas = [];
            var oFooter = oRows[oRows.length-1];
            const oLabelUserVer = oFooter.getCells()[0].getItems()[1];
            const oLabelFecha = oFooter.getCells()[2].getItems()[1];

          

            if(oControl[1].mAggregations.items.length > 1){
                if(!oEvent.getParameters().selected){
                    console.log("Actualizar");
                var oDialog = new sap.m.Dialog({
                    title: "Motivo Modificaci??n",
                    type: "Message",
                    content: [
                        new sap.m.Label({
                            text: "Ingrese el motivo de modificaci??n",
                            labelFor: "submitDialogTextarea"
                        }),
                        new sap.m.TextArea("submitDialogTextarea", {
                            liveChange: function (oEvent) {
                                var parent = oEvent.getSource().getParent();
                                parent.getBeginButton().setEnabled(true);
                            },
                            width: "100%",
                            required: true
                        })
                    ],
                    beginButton: new sap.m.Button({
                        type: sap.m.ButtonType.Emphasized,
                        text: "Confirmar",
                        enabled: false,
                        press: async function () {
                            var sText = sap.ui.getCore().byId("submitDialogTextarea").getValue();
                            MessageBox.confirm("??Desea guardar la acci??n realizada?", {
                                onClose : async function(sButton) {
                                    if (sButton === MessageBox.Action.OK) {
                                        oRows.forEach(function(oRow){
                                            if (oRow.oParam) {
                                                if (oRow.oParam.usuarioActualiza){
                                                    aUsuarios.push(oRow.oParam.usuarioActualiza);
                                                }
                                                if (oRow.oParam.fechaActualiza) {
                                                    aFechas.push(oRow.oParam.fechaActualiza.getTime());
                                                }  
                                            }     
                                        });
                                        aUsuarios.push(oInfoUsuario.data.usuario);
                                        aFechas.push(new Date().getTime());
                                        if (aUsuarios.length > 0) {
                                            var oUsuarioActualizaFooter = aUsuarios.filter((value, index, self) => self.indexOf(value) === index);
                                            var usuarioActualizaFooter = oUsuarioActualizaFooter.join();
                                        }
                                        if (aFechas.length > 0) {
                                            var dateFormat = sap.ui.core.format.DateFormat.getDateInstance({pattern : "dd-MM-YYYY HH:MM" });
                                            var FechaFooter = formatter.formatDateFooter(new Date(Math.min(...aFechas)));
                                        }
                                        oLabelUserVer.setText(usuarioActualizaFooter);
                                        oLabelFecha.setText(FechaFooter);

                                        let bModificacion = true;
                                        await oThat.saveLineaActualPaso(oParam, oControl, sText, bModificacion);
                                        await oThat.onSaveLineaActualPasoDepende(oParam, oRows);
                                        sap.ui.getCore().byId("submitDialogTextarea").setValue("");
                                        oDialog.close();
                                    }
                                }
                            });
                        }
                    }),
                    endButton: new sap.m.Button({
                        type: sap.m.ButtonType.Reject,
                        text: "Cancelar",
                        enabled: true,
                        press: function () {
                            sap.ui.getCore().byId("submitDialogTextarea").setValue("");
                            oDialog.close();
                        }
                    }),
                    afterClose: function () {
                        oDialog.destroy();
                    }
                });
        
                oDialog.open();
                }
                else{
                    oRows.forEach(function(oRow){
                        if (oRow.oParam) {
                            if (oRow.oParam.usuarioActualiza){
                                aUsuarios.push(oRow.oParam.usuarioActualiza);
                            }
                            if (oRow.oParam.fechaActualiza) {
                                aFechas.push(oRow.oParam.fechaActualiza.getTime());
                            }  
                        }     
                    });
                    aUsuarios.push(oInfoUsuario.data.usuario);
                    aFechas.push(new Date().getTime());
                    if (aUsuarios.length > 0) {
                        var oUsuarioActualizaFooter = aUsuarios.filter((value, index, self) => self.indexOf(value) === index);
                        var usuarioActualizaFooter = oUsuarioActualizaFooter.join();
                    }
                    if (aFechas.length > 0) {
                        var dateFormat = sap.ui.core.format.DateFormat.getDateInstance({pattern : "dd-MM-YYYY HH:MM" });
                        var FechaFooter = formatter.formatDateFooter(new Date(Math.min(...aFechas)));
                    }
                    oLabelUserVer.setText(usuarioActualizaFooter);
                    oLabelFecha.setText(FechaFooter);
                    await oThat.saveLineaActualPaso(oParam, oControl, null, true);
                    await oThat.onSaveLineaActualPasoDepende(oParam, oRows);
                }
             
            }
            else{
                MessageBox.confirm("??Desea guardar la acci??n realizada?", {
                    onClose : async function(sButton) {
                        if (sButton === MessageBox.Action.OK) {
                            oRows.forEach(function(oRow){
                                if (oRow.oParam) {
                                    if (oRow.oParam.usuarioActualiza){
                                        aUsuarios.push(oRow.oParam.usuarioActualiza);
                                    }
                                    if (oRow.oParam.fechaActualiza) {
                                        aFechas.push(oRow.oParam.fechaActualiza.getTime());
                                    }  
                                }     
                            });
                            aUsuarios.push(oInfoUsuario.data.usuario);
                            aFechas.push(new Date().getTime());
                            if (aUsuarios.length > 0) {
                                var oUsuarioActualizaFooter = aUsuarios.filter((value, index, self) => self.indexOf(value) === index);
                                var usuarioActualizaFooter = oUsuarioActualizaFooter.join();
                            }
                            if (aFechas.length > 0) {
                                var dateFormat = sap.ui.core.format.DateFormat.getDateInstance({pattern : "dd-MM-YYYY HH:MM" });
                                var FechaFooter = dateFormat.format(new Date(Math.min(...aFechas)));
                            }
                            oLabelUserVer.setText(usuarioActualizaFooter);
                            oLabelFecha.setText(FechaFooter);
                           
                            await oThat.saveLineaActualPaso(oParam, oControl, '', false);
                            oThat.onSaveLineaActualPasoDepende(oParam, oRows);
                        }
                    }
                });
            }
        },

        onChangeEstructura: async function (bFlagNotificacion) {
            // BusyIndicator.show(0);
            let oDataSeleccionada = oThat.getOwnerComponent().getModel("asociarDatos");
            let fraccionActual = oDataSeleccionada.getData().aEstructura.results[0].fraccion;
            let key = oThat.getView().byId("idEstructuraWizard").getSelectedKey();
            let oDataGeneral = oThat.getOwnerComponent().getModel("asociarDatos").getData();
            let oEstructuraSeleccionada
            if (bFlagNotificacion === "NOTIF") {
                oEstructuraSeleccionada = oDataGeneral.aEstructura.results.find(itm=>itm.estructuraId.tipoEstructuraId_iMaestraId  === sIdTipoEstructuraProceso);
            } else {
                oEstructuraSeleccionada = oDataGeneral.aEstructura.results.find(itm=>itm.orden === Number(key));
            }
            let aFechas = [],
                aUsuarios = [];
            if (oEstructuraSeleccionada.estructuraId.tipoEstructuraId_iMaestraId === sIdTipoEstructuraProceso) {
                let aProcesoData = [];
                oEstructuraSeleccionada.aEtiqueta.results.sort(function (a, b) {
                    return a.orden - b.orden;
                });
                let contador = 0;
                for await (const oEtiqueta of oEstructuraSeleccionada.aEtiqueta.results) {
                    oEtiqueta.sTipo = "PROCEDIMIENTO";
                    oEtiqueta.descripcion = oEstructuraSeleccionada.ordenFinal + '.' + oEtiqueta.orden + '.- ' + oEtiqueta.etiquetaId.descripcion;
                    oEtiqueta.designLabel= 'Bold';
                    oEtiqueta.generalVisibleMenuButton= false;
                    oEtiqueta.generalVisibleSaveButton= false;
                    oEtiqueta.generalEnabledSaveButton= false;
                    oEtiqueta.generalVisibleText= false;
                    oEtiqueta.generalVisibleInput= false;
                    oEtiqueta.generalVisibleToggleButton= false;
                    oEtiqueta.generalVisibleCheckBox= false;
                    oEtiqueta.generalVisibleTextUsuario= false;
                    oEtiqueta.generalVisibleTextAdic= false;
                    oEtiqueta.onFormatoTipoDatoVisibleToggleButtonMultiCheck=false;
                    oEtiqueta.generalVisibleRefresh= false;
                    contador = contador + 1; 
                    oEtiqueta.contador = contador;
                    aProcesoData.push(oEtiqueta);
                    let aPasosEtiqueta = oEstructuraSeleccionada.aPaso.results.filter(itm=>itm.pasoId.etiquetaId_etiquetaId === oEtiqueta.etiquetaId_etiquetaId);
                    aPasosEtiqueta.sort(function (a, b) {
                        return a.orden - b.orden;
                    });
                    for await (const oPasoEtiqueta of aPasosEtiqueta) {
                        oPasoEtiqueta.sTipo = "PROCEDIMIENTO";
                        oPasoEtiqueta.descripcion = oEstructuraSeleccionada.ordenFinal + '.' + oEtiqueta.orden + '.' + oPasoEtiqueta.orden + '.- ' + oPasoEtiqueta.pasoId.descripcion;
                        oPasoEtiqueta.generalInput = formatter.onFormatoTipoDatoInput(oPasoEtiqueta);
                        oPasoEtiqueta.generalCheckBox = formatter.onFormatoTipoDatoCheckBox(oPasoEtiqueta);
                        oPasoEtiqueta.generalType = formatter.onFormatoTipoDatoType(oPasoEtiqueta.tipoDatoId_iMaestraId);
                        oPasoEtiqueta.generalVisibleInput = formatter.onFormatoTipoDatoVisibleInput(oPasoEtiqueta.tipoDatoId_iMaestraId);
                        oPasoEtiqueta.generalVisibleText = formatter.onFormatoTipoDatoVisibleText(oPasoEtiqueta.tipoDatoId_iMaestraId);
                        oPasoEtiqueta.generalVisibleCheckBox = formatter.onFormatoTipoDatoVisibleCheckBox(oPasoEtiqueta.tipoDatoId_iMaestraId);
                        oPasoEtiqueta.generalVisibleSaveButton = formatter.onFormatoTipoDatoVisibleSaveButton(oPasoEtiqueta.tipoDatoId_iMaestraId);
                        oPasoEtiqueta.generalEnabledSaveButton= formatter.onFormatoEnabledSaveButton(oPasoEtiqueta, oInfoUsuario.funcionUsuario, oEstructuraSeleccionada.aPaso.results);
                        oPasoEtiqueta.generalVisibleToggleButton = formatter.onFormatoTipoDatoVisibleToggleButton(oPasoEtiqueta.tipoDatoId_iMaestraId);
                        oPasoEtiqueta.onFormatoTipoDatoVisibleToggleButtonMultiCheck = formatter.onFormatoTipoDatoVisibleToggleButtonMultiCheck(oPasoEtiqueta.tipoDatoId_iMaestraId);
                        oPasoEtiqueta.generalVisibleMenuButton= true;
                        oPasoEtiqueta.generalEnabledPredecesor = true;
                        oPasoEtiqueta.generalVisibleRefresh= formatter.onFormatoTipoDatoVisibleRefresh(oPasoEtiqueta.tipoDatoId_iMaestraId);
                        if (oPasoEtiqueta.dependeRmdEstructuraPasoId) {
                            let oPasoEtiquetaPredecesor = {};
                            oPasoEtiquetaPredecesor = aPasosEtiqueta.find(itm=>itm.mdEstructuraPasoIdDepende === oPasoEtiqueta.dependeRmdEstructuraPasoId);
                            if(!oPasoEtiquetaPredecesor) {
                                let aFilter = [];
                                aFilter.push(new Filter("mdEstructuraPasoIdDepende", "EQ", oPasoEtiqueta.dependeRmdEstructuraPasoId));
                                aFilter.push(new Filter("rmdId_rmdId", "EQ", oDataSeleccionada.getData().rmdId));
                                aFilter.push(new Filter("fraccion", "EQ", fraccionActual));
                                let sExpand = "tipoDatoId,pasoId";
                                let itemResponse = await registroService.onGetDataGeneralFiltersExpand(oThat.mainModelv2, "RMD_ES_PASO", aFilter, sExpand);
                                oPasoEtiquetaPredecesor = itemResponse.results[0];
                                if (oPasoEtiquetaPredecesor) {
                                    oPasoEtiqueta.generalEnabledPredecesor = formatter.onFormatoEnabledPredecesor(oPasoEtiquetaPredecesor);
                                }
                            } else {
                                oPasoEtiqueta.generalEnabledPredecesor = formatter.onFormatoEnabledPredecesor(oPasoEtiquetaPredecesor);
                            }
                        }
                        if (oPasoEtiqueta.usuarioActualiza) {
                            aUsuarios.push(oPasoEtiqueta.usuarioActualiza);
                        }
                        if (oPasoEtiqueta.realizadoPorUser) {
                            let arrayUser = oPasoEtiqueta.realizadoPorUser.split(",");
                            arrayUser.forEach(function(oUsuario){
                                aUsuarios.push(oUsuario)
                            });
                        }
                        if (oPasoEtiqueta.multiCheckUser) {
                            let arrayUser = oPasoEtiqueta.multiCheckUser.split(",");
                            arrayUser.forEach(function(oUsuario){
                                aUsuarios.push(oUsuario)
                            });
                        }
                        if (oPasoEtiqueta.firstFechaActualiza) {
                            aFechas.push(oPasoEtiqueta.firstFechaActualiza.getTime());
                        }
                        contador = contador + 1; 
                        oPasoEtiqueta.contador = contador;
                        aProcesoData.push(oPasoEtiqueta);
                        let aExistePasoMenor = oEstructuraSeleccionada.aPasoInsumoPaso.results.filter(itm=>itm.pasoId_rmdEstructuraPasoId === oPasoEtiqueta.rmdEstructuraPasoId);
                        aExistePasoMenor.sort(function (a, b) {
                            return a.orden - b.orden;
                        });
                        aExistePasoMenor.forEach(function(oPasoInsumoPaso){
                            let descripcion;
                            if (oPasoInsumoPaso.rmdEstructuraRecetaInsumoId_rmdEstructuraRecetaInsumoId) {
                                descripcion = oPasoInsumoPaso.rmdEstructuraRecetaInsumoId.Maktx;
                            } else if (oPasoInsumoPaso.pasoHijoId_pasoId) {
                                descripcion = oPasoInsumoPaso.pasoHijoId.descripcion;     
                            }
                            oPasoInsumoPaso.sTipo = "PROCEDIMIENTOPM";
                            oPasoInsumoPaso.descripcion= oEstructuraSeleccionada.ordenFinal + '.' + oEtiqueta.orden + '.' + oPasoEtiqueta.orden + '.' + oPasoInsumoPaso.orden + '.- ' + descripcion;
                            oPasoInsumoPaso.generalInput= formatter.onFormatoTipoDatoInput(oPasoInsumoPaso);
                            oPasoInsumoPaso.generalCheckBox= formatter.onFormatoTipoDatoCheckBox(oPasoInsumoPaso);
                            oPasoInsumoPaso.generalType= formatter.onFormatoTipoDatoType(oPasoInsumoPaso.tipoDatoId_iMaestraId);
                            oPasoInsumoPaso.generalVisibleInput= formatter.onFormatoTipoDatoVisibleInput(oPasoInsumoPaso.tipoDatoId_iMaestraId);
                            oPasoInsumoPaso.generalVisibleText= formatter.onFormatoTipoDatoVisibleText(oPasoInsumoPaso.tipoDatoId_iMaestraId);
                            oPasoInsumoPaso.generalVisibleCheckBox= formatter.onFormatoTipoDatoVisibleCheckBox(oPasoInsumoPaso.tipoDatoId_iMaestraId);
                            oPasoInsumoPaso.generalVisibleSaveButton= formatter.onFormatoTipoDatoVisibleSaveButton(oPasoInsumoPaso.tipoDatoId_iMaestraId);
                            oPasoInsumoPaso.generalEnabledSaveButton= formatter.onFormatoEnabledSaveButton(oPasoInsumoPaso, oInfoUsuario.funcionUsuario, oEstructuraSeleccionada.aPaso.results);
                            oPasoInsumoPaso.generalVisibleToggleButton= formatter.onFormatoTipoDatoVisibleToggleButton(oPasoInsumoPaso.tipoDatoId_iMaestraId);
                            oPasoInsumoPaso.onFormatoTipoDatoVisibleToggleButtonMultiCheck = formatter.onFormatoTipoDatoVisibleToggleButtonMultiCheck(oPasoInsumoPaso.tipoDatoId_iMaestraId);
                            oPasoInsumoPaso.generalVisibleMenuButton= false;
                            oPasoInsumoPaso.generalEnabledPredecesor= oPasoEtiqueta.generalEnabledPredecesor;
                            oPasoInsumoPaso.generalVisibleRefresh= formatter.onFormatoTipoDatoVisibleRefresh(oPasoInsumoPaso.tipoDatoId_iMaestraId);
                            if (oPasoInsumoPaso.usuarioActualiza) {
                                aUsuarios.push(oPasoInsumoPaso.usuarioActualiza);
                            }
                            if (oPasoInsumoPaso.realizadoPorUser) {
                                let arrayUser = oPasoInsumoPaso.realizadoPorUser.split(",");
                                arrayUser.forEach(function(oUsuario){
                                    aUsuarios.push(oUsuario)
                                });
                            }
                            if (oPasoInsumoPaso.multiCheckUser) {
                                let arrayUser = oPasoInsumoPaso.multiCheckUser.split(",");
                                arrayUser.forEach(function(oUsuario){
                                    aUsuarios.push(oUsuario)
                                });
                            }
                            if (oPasoInsumoPaso.firstFechaActualiza) {
                                aFechas.push(oPasoInsumoPaso.firstFechaActualiza.getTime());
                            }
                            contador = contador + 1; 
                            oPasoInsumoPaso.contador = contador;
                            aProcesoData.push(oPasoInsumoPaso);
                        });
                    }
                }
                let oModelProcess = new JSONModel(aProcesoData);
                oModelProcess.setSizeLimit(999999999);
                oThat.getView().setModel(oModelProcess, "aListProcessAssignResponsive");
            }

            if (oEstructuraSeleccionada.estructuraId.tipoEstructuraId_iMaestraId === sIdTipoEstructuraCuadro) {
                let aData = [];
                if (oEstructuraSeleccionada.aPaso.results) {
                    oEstructuraSeleccionada.aPaso.results.sort(function (a, b) {
                        return a.orden - b.orden;
                    });
                    aData = oEstructuraSeleccionada.aPaso.results;
                }
                for await (const item of aData) {
                    item.sTipo = 'CUADRO';
                    item.descripcion = item.pasoId.descripcion;
                    item.generalInput = formatter.onFormatoTipoDatoInput(item);
                    item.generalCheckBox = formatter.onFormatoTipoDatoCheckBox(item);
                    item.generalType = formatter.onFormatoTipoDatoType(item.tipoDatoId_iMaestraId);
                    item.generalVisibleInput = formatter.onFormatoTipoDatoVisibleInput(item.tipoDatoId_iMaestraId);
                    item.generalVisibleText = formatter.onFormatoTipoDatoVisibleText(item.tipoDatoId_iMaestraId);
                    item.generalVisibleCheckBox = formatter.onFormatoTipoDatoVisibleCheckBox(item.tipoDatoId_iMaestraId);
                    item.generalVisibleSaveButton = formatter.onFormatoTipoDatoVisibleSaveButton(item.tipoDatoId_iMaestraId);
                    item.generalEnabledSaveButton= formatter.onFormatoEnabledSaveButton(item, oInfoUsuario.funcionUsuario, aData);
                    item.generalVisibleToggleButton = formatter.onFormatoTipoDatoVisibleToggleButton(item.tipoDatoId_iMaestraId);
                    item.onFormatoTipoDatoVisibleToggleButtonMultiCheck = formatter.onFormatoTipoDatoVisibleToggleButtonMultiCheck(item.tipoDatoId_iMaestraId);
                    item.generalEnabledPredecesor = true;
                    if (item.dependeRmdEstructuraPasoId) {
                        let itemPredecesor = {};
                        itemPredecesor = aData.find(itm=>itm.mdEstructuraPasoIdDepende === item.dependeRmdEstructuraPasoId);
                        if(!itemPredecesor) {
                            let aFilter = [];
                            aFilter.push(new Filter("mdEstructuraPasoIdDepende", "EQ", item.dependeRmdEstructuraPasoId));
                            aFilter.push(new Filter("rmdId_rmdId", "EQ", oDataSeleccionada.getData().rmdId));
                            aFilter.push(new Filter("fraccion", "EQ", fraccionActual));
                            let sExpand = "tipoDatoId,pasoId";
                            let itemResponse = await registroService.onGetDataGeneralFiltersExpand(oThat.mainModelv2, "RMD_ES_PASO", aFilter, sExpand);
                            itemPredecesor = itemResponse.results[0];
                            if (itemPredecesor) {
                                item.generalEnabledPredecesor = formatter.onFormatoEnabledPredecesor(itemPredecesor);
                            }
                        } else {
                            item.generalEnabledPredecesor = formatter.onFormatoEnabledPredecesor(itemPredecesor);
                        }
                    }
                    if (item.usuarioActualiza) {
                        aUsuarios.push(item.usuarioActualiza);
                    }
                    if (item.realizadoPorUser) {
                        let arrayUser = item.realizadoPorUser.split(",");
                        arrayUser.forEach(function(oUsuario){
                            aUsuarios.push(oUsuario)
                        });
                    }
                    if (item.multiCheckUser) {
                        let arrayUser = item.multiCheckUser.split(",");
                        arrayUser.forEach(function(oUsuario){
                            aUsuarios.push(oUsuario)
                        });
                    }
                    if (item.firstFechaActualiza) {
                        aFechas.push(item.firstFechaActualiza.getTime());
                    }
                }
            
                let oModelCuadro = new JSONModel(aData);
                oModelCuadro.setSizeLimit(999999999);
                oThat.getView().setModel(oModelCuadro, "aListPasoAssignResponsive");
                oThat.getView().getModel("aListPasoAssignResponsive").refresh(true);  
            }

            if (oEstructuraSeleccionada.estructuraId.tipoEstructuraId_iMaestraId === sIdTipoEstructuraEquipo) {
                let aDataEquipo = [],
                    aDataUtensilio = [],
                    dDate = new Date(),
                    dTime = dDate.getTime();
                if (oEstructuraSeleccionada.aEquipo.results) {
                    oEstructuraSeleccionada.aEquipo.results.sort(function (a, b) {
                        return a.orden - b.orden;
                    });
                    aDataEquipo = oEstructuraSeleccionada.aEquipo.results;
                }

                if (oEstructuraSeleccionada.aUtensilio.results) {
                    oEstructuraSeleccionada.aUtensilio.results.sort(function (a, b) {
                        return a.orden - b.orden;
                    });
                    aDataUtensilio = oEstructuraSeleccionada.aUtensilio.results;
                }

                let aRmDEquipoUtensilio = aDataEquipo.concat(aDataUtensilio);
                let aRmDEquipoUtensilios = [];
                aRmDEquipoUtensilio.forEach(function(oRmDEquipoUtensilio){
                    let oRmDEquipoUtensilios = {};
                    oRmDEquipoUtensilios.generalEnabledSaveButton= formatter.onFormatoEnabledSaveButtonItem(oInfoUsuario.funcionUsuario);
                    let stateCalibracion = 'Success';
                    if(oRmDEquipoUtensilio.equipoId_equipoId) {
                        oRmDEquipoUtensilios.sTipo = 'EQUIPO';
                        oRmDEquipoUtensilios.rmdEstructuraEquipoId = oRmDEquipoUtensilio.rmdEstructuraEquipoId;
                        oRmDEquipoUtensilios.equipoId = oRmDEquipoUtensilio.equipoId_equipoId;
                        oRmDEquipoUtensilios.tipoDatoId_iMaestraId = sIdVerificacionCheck;
                        oRmDEquipoUtensilios.datosGenerales = oRmDEquipoUtensilio.equipoId;
                        oRmDEquipoUtensilios.codigo = oRmDEquipoUtensilio.equipoId.equnr;
                        oRmDEquipoUtensilios.descripcion = oRmDEquipoUtensilio.equipoId.eqktx;
                        oRmDEquipoUtensilios.estado = oRmDEquipoUtensilio.equipoId.estat;
                        oRmDEquipoUtensilios.ctext = oRmDEquipoUtensilio.equipoId.ctext;
                        oRmDEquipoUtensilios.tipo = oRmDEquipoUtensilio.equipoId.tipoId.contenido;
                        oRmDEquipoUtensilios.dateCalibracion = oRmDEquipoUtensilio.equipoId.gstrp ? formatter.formatDateFooter(new Date(oRmDEquipoUtensilio.equipoId.gstrp)) : "";
                        oRmDEquipoUtensilios.descCalibracion = oRmDEquipoUtensilio.equipoId.ktext;
                        if (oRmDEquipoUtensilio.equipoId.gstrp) {
                            if(oRmDEquipoUtensilio.equipoId.gstrp.getTime()>=dTime){
                                stateCalibracion="Success";
                            }else{
                                stateCalibracion='Error';
                            }
                        }
                        oRmDEquipoUtensilios.stateCalibracion = stateCalibracion;
                        oRmDEquipoUtensilios.usuarioActualiza = oRmDEquipoUtensilio.usuarioActualiza;
                        oRmDEquipoUtensilios.fechaActualiza = oRmDEquipoUtensilio.fechaActualiza;
                        oRmDEquipoUtensilios.firstFechaActualiza = oRmDEquipoUtensilio.firstFechaActualiza;
                        oRmDEquipoUtensilios.verifCheck = oRmDEquipoUtensilio.verifCheck;
                        oRmDEquipoUtensilios.styleUser = oRmDEquipoUtensilio.styleUser;
                        oRmDEquipoUtensilios.flagEditado = oRmDEquipoUtensilio.flagEditado;
                        oRmDEquipoUtensilios.aplica = oRmDEquipoUtensilio.aplica;
                        oRmDEquipoUtensilios.generalCheckBox = oRmDEquipoUtensilio.verifCheck;
                        aRmDEquipoUtensilios.push(oRmDEquipoUtensilios);
                    } else {
                        if (oRmDEquipoUtensilios.agrupadorId_clasificacionUtensilioId) {
                            oRmDEquipoUtensilios.tipoDatoId_iMaestraId = sIdVerificacionCheck;
                            oRmDEquipoUtensilios.codigo = '';
                            oRmDEquipoUtensilios.descripcion = oRmDEquipoUtensilio.agrupadorId.descripcion;
                            oRmDEquipoUtensilios.estado = '';
                            oRmDEquipoUtensilios.ctext = '';
                            oRmDEquipoUtensilios.tipo = 'AGRUPADOR';
                            oRmDEquipoUtensilios.dateCalibracion = '';
                            oRmDEquipoUtensilios.descCalibracion = '';
                            oRmDEquipoUtensilios.stateCalibracion = 'Success';
                            oRmDEquipoUtensilios.firstFechaActualiza = oRmDEquipoUtensilio.firstFechaActualiza;
                            oRmDEquipoUtensilios.verifCheck = oRmDEquipoUtensilio.verifCheck;
                            oRmDEquipoUtensilios.styleUser = oRmDEquipoUtensilio.styleUser;
                            oRmDEquipoUtensilios.flagEditado = oRmDEquipoUtensilio.flagEditado;
                            oRmDEquipoUtensilios.aplica = oRmDEquipoUtensilio.aplica;
                            oRmDEquipoUtensilios.generalCheckBox = oRmDEquipoUtensilio.verifCheck;
                            aRmDEquipoUtensilios.push(oRmDEquipoUtensilios);
                        } else if (oRmDEquipoUtensilio.utensilioId_utensilioId){
                            oRmDEquipoUtensilios.sTipo = 'UTENSILIO';
                            oRmDEquipoUtensilios.rmdEstructuraUtensilioId = oRmDEquipoUtensilio.rmdEstructuraUtensilioId;
                            oRmDEquipoUtensilios.utensilioId = oRmDEquipoUtensilio.utensilioId_utensilioId;
                            oRmDEquipoUtensilios.tipoDatoId_iMaestraId = sIdVerificacionCheck;
                            oRmDEquipoUtensilios.datosGenerales = oRmDEquipoUtensilio.utensilioId;
                            oRmDEquipoUtensilios.codigo = oRmDEquipoUtensilio.utensilioId.codigo;
                            oRmDEquipoUtensilios.descripcion = oRmDEquipoUtensilio.utensilioId.descripcion;
                            oRmDEquipoUtensilios.estado = oRmDEquipoUtensilio.utensilioId.estadoId.contenido;
                            oRmDEquipoUtensilios.ctext = '';
                            oRmDEquipoUtensilios.tipo = oRmDEquipoUtensilio.utensilioId.tipoId.contenido;
                            oRmDEquipoUtensilios.dateCalibracion = '';
                            oRmDEquipoUtensilios.descCalibracion = '';
                            oRmDEquipoUtensilios.stateCalibracion = 'Success';
                            oRmDEquipoUtensilios.usuarioActualiza = oRmDEquipoUtensilio.usuarioActualiza;
                            oRmDEquipoUtensilios.fechaActualiza = oRmDEquipoUtensilio.fechaActualiza;
                            oRmDEquipoUtensilios.firstFechaActualiza = oRmDEquipoUtensilio.firstFechaActualiza;
                            oRmDEquipoUtensilios.verifCheck = oRmDEquipoUtensilio.verifCheck;
                            oRmDEquipoUtensilios.styleUser = oRmDEquipoUtensilio.styleUser;
                            oRmDEquipoUtensilios.flagEditado = oRmDEquipoUtensilio.flagEditado;
                            oRmDEquipoUtensilios.aplica = oRmDEquipoUtensilio.aplica;
                            oRmDEquipoUtensilios.generalCheckBox = oRmDEquipoUtensilio.verifCheck;
                            aRmDEquipoUtensilios.push(oRmDEquipoUtensilios);
                        }
                    }

                    if (oRmDEquipoUtensilios.usuarioActualiza) {
                        aUsuarios.push(oRmDEquipoUtensilios.usuarioActualiza);
                    }
                    if (oRmDEquipoUtensilios.firstFechaActualiza) {
                        aFechas.push(oRmDEquipoUtensilios.firstFechaActualiza.getTime());
                    }
                });

                aRmDEquipoUtensilios.sort(function (a, b) {
                    return a.orden - b.orden;
                });

                let oModelEquipoUten = new JSONModel(aRmDEquipoUtensilios);
                oModelEquipoUten.setSizeLimit(999999999);
                oThat.getView().setModel(oModelEquipoUten, "aListEquipoAssignResponsive");
            }

            if (oEstructuraSeleccionada.estructuraId.tipoEstructuraId_iMaestraId === sIdTipoEstructuraCondAmbiente) {
                let aData = [];
                if (oEstructuraSeleccionada.aPaso.results) {
                    oEstructuraSeleccionada.aPaso.results.sort(function (a, b) {
                        return a.orden - b.orden;
                    });
                    aData = oEstructuraSeleccionada.aPaso.results;
                }
                for await (const item of aData) {
                    item.sTipo = 'CONDICIONAMBIENTAL';
                    item.descripcion = item.pasoId.descripcion;
                    item.generalInput = formatter.onFormatoTipoDatoInput(item);
                    item.generalCheckBox = formatter.onFormatoTipoDatoCheckBox(item);
                    item.generalType = formatter.onFormatoTipoDatoType(item.tipoDatoId_iMaestraId);
                    item.generalVisibleInput = formatter.onFormatoTipoDatoVisibleInput(item.tipoDatoId_iMaestraId);
                    item.generalVisibleText = formatter.onFormatoTipoDatoVisibleText(item.tipoDatoId_iMaestraId);
                    item.generalVisibleCheckBox = formatter.onFormatoTipoDatoVisibleCheckBox(item.tipoDatoId_iMaestraId);
                    item.generalVisibleSaveButton = formatter.onFormatoTipoDatoVisibleSaveButton(item.tipoDatoId_iMaestraId);
                    item.generalVisibleToggleButton = formatter.onFormatoTipoDatoVisibleToggleButton(item.tipoDatoId_iMaestraId);
                    item.onFormatoTipoDatoVisibleToggleButtonMultiCheck = formatter.onFormatoTipoDatoVisibleToggleButtonMultiCheck(item.tipoDatoId_iMaestraId);
                    if (item.usuarioActualiza) {
                        aUsuarios.push(item.usuarioActualiza);
                    }
                    if (item.realizadoPorUser) {
                        let arrayUser = item.realizadoPorUser.split(",");
                        arrayUser.forEach(function(oUsuario){
                            aUsuarios.push(oUsuario)
                        });
                    }
                    if (item.multiCheckUser) {
                        let arrayUser = item.multiCheckUser.split(",");
                        arrayUser.forEach(function(oUsuario){
                            aUsuarios.push(oUsuario)
                        });
                    }
                    if (item.firstFechaActualiza) {
                        aFechas.push(item.firstFechaActualiza.getTime());
                    }
                }
            
                let oModelCondicionAmbiental = new JSONModel(aData);
                oModelCondicionAmbiental.setSizeLimit(999999999);
                oThat.getView().setModel(oModelCondicionAmbiental, "aListPasoAssignResponsive");
                oThat.getView().getModel("aListPasoAssignResponsive").refresh(true);  
            }

            if (oEstructuraSeleccionada.estructuraId.tipoEstructuraId_iMaestraId === sIdTipoEstructuraEspecificaciones) {
                let aData = [];
                if (oEstructuraSeleccionada.aEspecificacion.results) {
                    await oThat.onUpdateEnsayoSap();
                    
                    oEstructuraSeleccionada.aEspecificacion.results.sort(function (a, b) {
                        return a.orden - b.orden;
                    });
                    aData = oEstructuraSeleccionada.aEspecificacion.results;
                }
                for await (const item of aData) {
                    item.generalEnabledSaveButton= formatter.onFormatoEnabledSaveButtonItemEspecificaciones(oInfoUsuario.funcionUsuario, item);
                    item.sTipo = 'ESPECIFICACIONES';
                    // item.descripcion = item.pasoId.descripcion;

                    if (item.usuarioActualiza) {
                        aUsuarios.push(item.usuarioActualiza);
                    }
                    if (item.firstFechaActualiza) {
                        aFechas.push(item.firstFechaActualiza.getTime());
                    }
                }
            
                let oModelEspecificacion = new JSONModel(aData);
                oModelEspecificacion.setSizeLimit(999999999);
                oThat.getView().setModel(oModelEspecificacion, "aListEspecificacionAssignResponsive");
                oThat.getView().getModel("aListEspecificacionAssignResponsive").refresh(true);  
            }

            if (oEstructuraSeleccionada.estructuraId.tipoEstructuraId_iMaestraId === sIdTipoEstructuraFormula) {
                let aData = [];
                if (oEstructuraSeleccionada.aInsumo.results) {
                    oEstructuraSeleccionada.aInsumo.results.sort(function (a, b) {
                        return a.ItemNo - b.ItemNo;
                    });
                    aData = oEstructuraSeleccionada.aInsumo.results;
                }
                for await (const item of aData) {
                    item.generalEnabledSaveButton= formatter.onFormatoEnabledSaveButtonItem(oInfoUsuario.funcionUsuario);
                    item.sTipo = 'FORMULA';

                    if (item.usuarioActualiza) {
                        aUsuarios.push(item.usuarioActualiza);
                    }
                    if (item.firstFechaActualiza) {
                        aFechas.push(item.firstFechaActualiza.getTime());
                    }
                }
            
                let oModelFormula = new JSONModel(aData);
                oModelFormula.setSizeLimit(999999999);
                oThat.getView().setModel(oModelFormula, "aListInsumosAssignResponsive");
                oThat.getView().getModel("aListInsumosAssignResponsive").refresh(true);  
            }
            
            if (oEstructuraSeleccionada.estructuraId.tipoEstructuraId_iMaestraId === sIdTipoEstructuraFirmas) {
                // let aFilters = [];
                // aFilters.push(new Filter("rmdId_rmdId", "EQ", oEstructuraSeleccionada.rmdId_rmdId));
                // let sExpand = "usuarioId"
                // let aUsuariosResponse = await registroService.onGetDataGeneralFiltersExpand(oThat.mainModelv2, "RMD_USUARIO", aFilters, sExpand);
                // let oModelVerificacionFirmas = new JSONModel(aUsuariosResponse.results);
                // oThat.getView().setModel(oModelVerificacionFirmas, "aListVerifFirmasAssignResponsive");
                // oThat.getView().getModel("aListVerifFirmasAssignResponsive").refresh(true);
                
                let aFilters = [];
                let sExpand = "usuarioId"
                aFilters.push(new Filter("rmdId_rmdId", "EQ", oEstructuraSeleccionada.rmdId_rmdId));
                aFilters.push(new Filter("fraccion", "EQ", fraccionActual));
                let aLapsoSelected = await registroService.onGetDataGeneralFiltersExpand(oThat.mainModelv2, "RMD_VERIFICACION_FIRMAS", aFilters,sExpand);
                // if(aLapsoSelected.results.length >0){
                //     let aFilters = [];
                //     let arrayFind = [];
                //     let sExpand = "usuarioId"
                //     // aFilters.push(new Filter("rmdId_rmdId", "EQ", oEstructuraSeleccionada.rmdId_rmdId));
                //     let aUsuariosResponse = await registroService.onGetDataGeneralFiltersExpand(oThat.mainModelv2, "RMD_USUARIO", aFilters, sExpand);
                //     aLapsoSelected.results.forEach( function(e){
                //         let finder = aUsuariosResponse.results.find(u=>u.usuarioId_usuarioId === e.usuarioId_usuarioId);
                //         arrayFind.push(finder);
                //     })
                    let oModelVerificacionFirmas = new JSONModel(aLapsoSelected.results);
                    oModelVerificacionFirmas.setSizeLimit(999999999);
                    oThat.getView().setModel(oModelVerificacionFirmas, "aListVerifFirmasAssignResponsive");
                    oThat.getView().getModel("aListVerifFirmasAssignResponsive").refresh(true);
                // }
            }
            
            // if (oDataEstructura.estructuraId.tipoEstructuraId_iMaestraId === sIdTipoEstructuraFormula) {
            //     let aData = [];
            //     if (oDataEstructura.aInsumo.results) {
            //         oDataEstructura.aInsumo.results.sort(function (a, b) {
            //             return a.orden - b.orden;
            //         });
            //         aData = oDataEstructura.aInsumo.results;
            //     }
            //     if (oDataEstructura.orden === 1) {
            //         for await (const item of aData) {
            //             item.sTipo = 'FORMULA';
    
            //             if (item.usuarioActualiza) {
            //                 aUsuarios.push(item.usuarioActualiza);
            //             }
            //             if (item.firstFechaActualiza) {
            //                 aFechas.push(item.firstFechaActualiza.getTime());
            //             }
            //         }
                
            //         let oModelFormula = new JSONModel(aData);
            //         oThat.getView().setModel(oModelFormula, "aListInsumosAssignResponsive");
            //         oThat.getView().getModel("aListInsumosAssignResponsive").refresh(true);  
            //     }      
            // }
            if (bFlagNotificacion !== "NOTIF") {
                let oFooter = {
                    usuario: '',
                    fecha: ''
                }
    
                if (aUsuarios.length > 0) {
                    let oUsuarioActualizaFooter = aUsuarios.filter((value, index, self) => self.indexOf(value) === index);
                    oFooter.usuario = oUsuarioActualizaFooter.join();
                }
                if (aFechas.length > 0) {
                    if(oEstructuraSeleccionada.estructuraId.tipoEstructuraId_iMaestraId === sIdTipoEstructuraEspecificaciones){
                        oFooter.fecha = formatter.formatDateFooterEspecificaciones(new Date(Math.min(...aFechas)));
                    } else {
                        oFooter.fecha = formatter.formatDateFooter(new Date(Math.min(...aFechas)));
                    }
                }
                
                let oModelFooter = new JSONModel(oFooter);
                oThat.getView().setModel(oModelFooter, "aFooter");
            }
            // BusyIndicator.hide();
        },        

        onMenuAction: async function (oEvent) {
            let press = oEvent.mParameters.item.getProperty("text");
            let oModel = oEvent.getSource().getParent().getParent().getParent().mBindingInfos.items.model;
            let aDataModelEstructura = oThat.getView().getModel(oModel).getData();
            let lineaSeleccionada = oEvent.getSource().getParent().getBindingContext(oModel).getObject();
            if (press === "Observaci??n por paso") {
                oThat.onGetObservacionesToItem(lineaSeleccionada);
            } else if (press === "Historial por paso") {
                oThat.onGetHistorialToItem(lineaSeleccionada);
            } else if (press === "No aplica paso") {
                oThat.onNoAplicaItem(lineaSeleccionada, aDataModelEstructura, false);
            } else if (press === "Si aplica paso") {
                oThat.onNoAplicaItem(lineaSeleccionada, aDataModelEstructura, true);
            }
        },

        onNoAplicaItem: function (lineaSeleccionada, aDataModelEstructura, bAplica) {
            lineaSeleccionada.aplica
            let aUsuarios = [],
                aFechas = [];
            let sOptionTextNoApplyStep = oThat.i18n.getText("mnMotivoNoApplyStep");
            let sOptionTextApplyStep = oThat.i18n.getText("mnMotivoApplyStep");

            
            // // Se agrega nuevo combobox en content
            var modelCombo = [{value: "EQUIPO / ACCESORIO ALTERNATIVO", id: 1},
            {value: "PASO ALTERNATIVO CON EQUIPO", id: 2},
            {value: "PASO ALTERNATIVO METODO MANUAL", id: 3},
            {value: "PASO NO APLICA AL MATERIAL", id: 4},
            {value: "PASO POR ACTUALIZAR EN EL RMD", id: 5}];

            // let oModelFooter = new sap.ui.model.json.JSONModel({ items: modelCombo});
            // // oThat.getView().setModel(oModelFooter, "ComboModel");

            // oThat.modelGeneral.setProperty("/Comboboxdata", modelCombo);
            // // this.getView().getModel("ComboModel").refresh(true);
            
            // var contentCombobox = [new sap.m.ComboBox( "comboId", {
            //     items: {
            //         path: 'modelGeneral>/Comboboxdata',
            //         template: new sap.ui.core.Item({
            //             key: "{modelGeneral>id}",
            //             text: "{modelGeneral>value}"
            //         })
            //     },
            //     value : ""
            // })];


            var oSelect = new sap.m.Select( "submitDialogTextareaNoAplica", {
                    forceSelection: false,
                    customData: {
                        value: "{ID}"
                    },
                    change: function (oEvent) {
                        var parent = oEvent.getSource().getParent();
                        parent.getBeginButton().setEnabled(true);
                    },
                });
            var indexAfter = 0;
            oSelect.addEventDelegate({
            onAfterRendering: function(oEvent) {
                var src = oEvent.srcControl;
                
                if(indexAfter === 0){
                    indexAfter++;
                    modelCombo.forEach(function(i) {
                        src.addItem(new sap.ui.core.Item({
                            text: i.value,
                            value: i.value,
                            key: i.id
                        }));
                    });
                }
            }
            });

            // var contentTextArea = [
            //     new sap.m.Label({
            //         text: "Ingrese el motivo de modificaci??n",
            //         labelFor: "submitDialogTextarea"
            //     }),
            //     new sap.m.TextArea("submitDialogTextareaNoAplica", {
            //         liveChange: function (oEvent) {
            //             var parent = oEvent.getSource().getParent();
            //             parent.getBeginButton().setEnabled(true);
            //         },
            //         width: "100%",
            //         required: true
            //     })
            // ];

            let oDialogNoAplica = new sap.m.Dialog({
                title: lineaSeleccionada.aplica ? sOptionTextNoApplyStep : sOptionTextApplyStep,
                type: "Message",
                content: oSelect,
                beginButton: new sap.m.Button({
                    type: sap.m.ButtonType.Emphasized,
                    text: "Confirmar",
                    enabled: false,
                    press: async function () {
                        // var sText = sap.ui.getCore().byId("submitDialogTextareaNoAplica").getValue();
                        var sText = sap.ui.getCore().byId("submitDialogTextareaNoAplica").getSelectedItem().getText();
                        MessageBox.confirm("??Desea guardar la acci??n realizada?", {
                            onClose : async function(sButton) {
                                if (sButton === MessageBox.Action.OK) {
                                    aDataModelEstructura.forEach(function(oItem){
                                        if (oItem.usuarioActualiza){
                                            aUsuarios.push(oItem.usuarioActualiza);
                                        }
                                        if (oItem.realizadoPorUser) {
                                            let arrayUser = oItem.realizadoPorUser.split(",");
                                            arrayUser.forEach(function(oUsuario){
                                                aUsuarios.push(oUsuario)
                                            });
                                        }
                                        if (oItem.multiCheckUser) {
                                            let arrayUser = oItem.multiCheckUser.split(",");
                                            arrayUser.forEach(function(oUsuario){
                                                aUsuarios.push(oUsuario)
                                            });
                                        }
                                        if (oItem.firstFechaActualiza) {
                                            aFechas.push(oItem.firstFechaActualiza.getTime());
                                        }     
                                    });
                                    aUsuarios.push(oInfoUsuario.data.usuario);
                                    aFechas.push(new Date().getTime());
                                    let oFooter = {
                                        usuario: '',
                                        fecha: ''
                                    }
                                    if (aUsuarios.length > 0) {
                                        let oUsuarioActualizaFooter = aUsuarios.filter((value, index, self) => self.indexOf(value) === index);
                                        oFooter.usuario = oUsuarioActualizaFooter.join();
                                    }
                                    if (aFechas.length > 0) {
                                        oFooter.fecha = formatter.formatDateFooter(new Date(Math.min(...aFechas)));
                                    }
                                    let oModelFooter = new JSONModel(oFooter);
                                    oThat.getView().setModel(oModelFooter, "aFooter");
                                    await oThat.saveLineaItemNoAplica(lineaSeleccionada, sText, bAplica);
                                    // await oThat.saveLineaPasoNoAplica(oParam, sText);
                                    // sap.ui.getCore().byId("submitDialogTextareaNoAplica").setValue("");
                                    oDialogNoAplica.close();
                                }
                            }
                        });
                    }
                }),
                endButton: new sap.m.Button({
                    type: sap.m.ButtonType.Reject,
                    text: "Cancelar",
                    enabled: true,
                    press: function () {
                        // sap.ui.getCore().byId("submitDialogTextareaNoAplica").setValue("");
                        oDialogNoAplica.close();
                    }
                }),
                afterClose: function () {
                    oDialogNoAplica.destroy();
                }
            });
            
            oDialogNoAplica.open();    
        },

        onGetObservacionesToItem : async function (lineaSeleccionada) {
            try {
                let oDataSeleccionada = oThat.getOwnerComponent().getModel("asociarDatos");
                let fraccionActual = oDataSeleccionada.getData().aEstructura.results[0].fraccion;
                if (!oThat.onAddObservation) {
                    oThat.onAddObservation = sap.ui.xmlfragment(
                        "frgAddObservation",
                        rootPath + ".view.dialog.AddObservation",
                        oThat
                    );
                    oThat.getView().addDependent(oThat.onAddObservation);
                }
                // oThat.modelGeneral.setProperty("/esPaso", false);
                if (lineaSeleccionada.sTipo == "EQUIPO"){
                    oThat.modelGeneral.setProperty("/sEquipoIdObs", lineaSeleccionada.rmdEstructuraEquipoId);
                    oThat.modelGeneral.setProperty("/sDesPaso", lineaSeleccionada.descripcion);
                    var aFilter = [];
                    aFilter.push(new Filter("rmdEstructuraEquipoId_rmdEstructuraEquipoId", FilterOperator.EQ, lineaSeleccionada.rmdEstructuraEquipoId));
                    var aListObservacionesPaso = await registroService.getDataFilter(oThat.mainModelv2, "/RMD_OBSERVACION", aFilter);
                    oThat.modelGeneral.setProperty("/observacionesPaso", aListObservacionesPaso.results);
                } else if (lineaSeleccionada.sTipo == "UTENSILIO"){
                    oThat.modelGeneral.setProperty("/sUtensilioIdObs", lineaSeleccionada.rmdEstructuraUtensilioId);
                    oThat.modelGeneral.setProperty("/sDesPaso", lineaSeleccionada.descripcion);
                    var aFilter = [];
                    aFilter.push(new Filter("rmdEstructuraUtensilioId_rmdEstructuraUtensilioId", FilterOperator.EQ, lineaSeleccionada.rmdEstructuraUtensilioId));
                    var aListObservacionesPaso = await registroService.getDataFilter(oThat.mainModelv2, "/RMD_OBSERVACION", aFilter);
                    oThat.modelGeneral.setProperty("/observacionesPaso", aListObservacionesPaso.results);   
                } else if (lineaSeleccionada.sTipo == "PROCEDIMIENTO" || lineaSeleccionada.sTipo == "CUADRO" || lineaSeleccionada.sTipo == "CONDICIONAMBIENTAL") {
                    oThat.modelGeneral.setProperty("/sPasoIdObs", lineaSeleccionada.rmdEstructuraPasoId);
                    oThat.modelGeneral.setProperty("/sDesPaso", lineaSeleccionada.descripcion);
                    var aFilter = [];
                    aFilter.push(new Filter("rmdEstructuraPasoId_rmdEstructuraPasoId", FilterOperator.EQ, lineaSeleccionada.rmdEstructuraPasoId));
                    aFilter.push(new Filter("fraccion", FilterOperator.EQ, fraccionActual));
                    var aListObservacionesPaso = await registroService.getDataFilter(oThat.mainModelv2, "/RMD_OBSERVACION", aFilter);
                    oThat.modelGeneral.setProperty("/observacionesPaso", aListObservacionesPaso.results);   
                }
                oThat.onAddObservation.open();
            } catch (oError) {
                MessageBox.error(oError.responseText);
            }
        },

        onGetHistorialToItem: function (lineaSeleccionada) {
            try {
                if (!oThat.onHistoryStep) {
                    oThat.onHistoryStep = sap.ui.xmlfragment(
                        "frgHistoryStep",
                        rootPath + ".view.dialog.History",
                        oThat
                    );
                    oThat.getView().addDependent(oThat.onHistoryStep);
                }
                oThat.modelGeneral.setProperty("/sDesPaso", lineaSeleccionada.descripcion);
                oThat.onGetHistorial(lineaSeleccionada);
                oThat.onHistoryStep.open();
            } catch (oError) {
                MessageBox.error(oError.responseText);
            }
        },

        onGetHistorial: async function (lineaSeleccionada) {
            try {
                let aFilter = [];
                if (lineaSeleccionada.sTipo === 'PROCEDIMIENTO' || lineaSeleccionada.sTipo === 'CUADRO' || lineaSeleccionada.sTipo === 'CONDICIONAMBIENTAL') {
                    aFilter.push(new Filter("rmdEstructuraPasoId_rmdEstructuraPasoId", "EQ" , lineaSeleccionada.rmdEstructuraPasoId));    
                } else if (lineaSeleccionada.sTipo === 'PROCEDIMIENTOPM') {
                    aFilter.push(new Filter("rmdEstructuraPasoInsumoPasoId_rmdEstructuraPasoInsumoPasoId", "EQ" , lineaSeleccionada.rmdEstructuraPasoInsumoPasoId));  
                } else if (lineaSeleccionada.sTipo === 'EQUIPO') {
                    aFilter.push(new Filter("rmdEstructuraEquipoId_rmdEstructuraEquipoId", "EQ" , lineaSeleccionada.rmdEstructuraEquipoId));  
                } else if (lineaSeleccionada.sTipo === 'UTENSILIO') {
                    aFilter.push(new Filter("rmdEstructuraUtensilioId_rmdEstructuraUtensilioId", "EQ" , lineaSeleccionada.rmdEstructuraUtensilioId));  
                } else {
                    console.log.warning("AQUI PONER LOS DIFERENTES FILTROS CAOSITAS :D", "MARIN: ");
                }
                // let aListHistorial = await registroService.onGetDataGeneralFilters(oThat.mainModelv2, "RMD_ES_HISTORIAL", aFilter);
                
                let sExpand = "rmdEstructuraPasoInsumoPasoId"
                let aListHistorial = await registroService.onGetDataGeneralFiltersExpand(oThat.mainModelv2, "RMD_ES_HISTORIAL", aFilter, sExpand);
                aListHistorial.results.sort((a, b) => {
                    if(a.rmdEstructuraPasoInsumoPasoId && b.rmdEstructuraPasoInsumoPasoId){
                        return (
                            a.rmdEstructuraPasoInsumoPasoId.orden - b.rmdEstructuraPasoInsumoPasoId.orden
                        );
                    }
                });

                oThat.modelGeneral.setProperty("/tblHistorial", aListHistorial.results);
            } catch (oError) {
                MessageBox.error(oError.responseText);
            }
        },

        saveLineaItemNoAplica: async function (lineaSeleccionada, sMotivoModif, bAplica) {
            try {
                let oDataSeleccionada = oThat.getOwnerComponent().getModel("asociarDatos");
                let fraccionActual = oDataSeleccionada.getData().aEstructura.results[0].fraccion;
                let nameClass,
                    sDescripcionAccion = 'NO APLICA';
                nameClass = formatter.selectedColor(oInfoUsuario.rol[0].codigo);
                let oEsItem;
                if (lineaSeleccionada.sTipo === "PROCEDIMIENTO" || lineaSeleccionada.sTipo === "CUADRO" || lineaSeleccionada.sTipo === "CONDICIONAMBIENTAL") {
                    oEsItem = {
                        usuarioActualiza : oInfoUsuario.data.usuario,
                        fechaActualiza : new Date(),
                        aplica : bAplica,
                        rmdEstructuraPasoId : lineaSeleccionada.rmdEstructuraPasoId,
                        styleUser : nameClass,
                        flagEditado : bAplica,
                    };
                    await registroService.updateEsPasosRmd(oThat.mainModelv2, "/RMD_ES_PASO", oEsItem);
                    oEsItem.pasoId = lineaSeleccionada.pasoId;
                } else if (lineaSeleccionada.sTipo === "PROCEDIMIENTOPM") {
                    oEsItem = {
                        usuarioActualiza : oInfoUsuario.data.usuario,
                        fechaActualiza : new Date(),
                        aplica : bAplica,
                        rmdEstructuraPasoInsumoPasoId : lineaSeleccionada.rmdEstructuraPasoInsumoPasoId,
                        styleUser : nameClass,
                        flagEditado : bAplica,
                    };
                    await registroService.updateEsPasosRmd(oThat.mainModelv2, "/RMD_ES_PASO_INSUMO_PASO", oEsItem);
                    oEsItem.pasoHijoId = lineaSeleccionada.pasoHijoId;
                    oEsItem.rmdEstructuraPasoInsumoPasoId = lineaSeleccionada.rmdEstructuraPasoInsumoPasoId;
                } else if (lineaSeleccionada.sTipo === "EQUIPO") {
                    oEsItem = {
                        usuarioActualiza : oInfoUsuario.data.usuario,
                        fechaActualiza : new Date(),
                        aplica : bAplica,
                        rmdEstructuraEquipoId : lineaSeleccionada.rmdEstructuraEquipoId,
                        styleUser : nameClass,
                        flagEditado : bAplica,
                    };
                    await registroService.onUpdateDataGeneral(oThat.mainModelv2, "/RMD_ES_EQUIPO", oEsItem, lineaSeleccionada.rmdEstructuraEquipoId);
                    oEsItem.descripcion = lineaSeleccionada.descripcion;
                } else if (lineaSeleccionada.sTipo === "UTENSILIO") {
                    oEsItem = {
                        usuarioActualiza : oInfoUsuario.data.usuario,
                        fechaActualiza : new Date(),
                        aplica : bAplica,
                        rmdEstructuraUtensilioId : lineaSeleccionada.rmdEstructuraUtensilioId,
                        styleUser : nameClass,
                        flagEditado : bAplica,
                    };
                    await registroService.onUpdateDataGeneral(oThat.mainModelv2, "/RMD_ES_UTENSILIO", oEsItem, lineaSeleccionada.rmdEstructuraUtensilioId);
                    oEsItem.descripcion = lineaSeleccionada.descripcion;
                }
                await oThat.saveLineaActualHistorial(oEsItem, oEsItem.aplica, sDescripcionAccion, sMotivoModif);
                BusyIndicator.show(0); 
                await sap.ui.controller("mif.rmd.registro.controller.MainView").getEstructurasRmdRefactory(fraccionActual);
                await oThat.onChangeEstructura();
                BusyIndicator.hide();
            } catch (oError) {
                MessageBox.error(oError.responseText);
            }
        },

        saveLineaActualHistorial: async function (oEsItem, sValor, sDesPaso, sMotivoModif) {
            try {
                let usuarioRegistro;
                if(oEsItem.tipoDatoId_iMaestraId === sIdVistobueno || oEsItem.tipoDatoId_iMaestraId === sIdRealizadoporyVistobueno) {
                    usuarioRegistro = oThat.modelGeneral.getProperty("/usuarioLoginVB");
                    if(!usuarioRegistro) {
                        usuarioRegistro = oInfoUsuario.data.usuario;
                    }
                } else {
                    usuarioRegistro = oInfoUsuario.data.usuario;
                }
                let sDescripcionItem = "";
                if (oEsItem.rmdEstructuraPasoId) {
                    sDescripcionItem = oEsItem.pasoId.descripcion;
                }
                if (oEsItem.rmdEstructuraEquipoId) {
                    sDescripcionItem = oEsItem.descripcion;
                }
                if (oEsItem.rmdEstructuraUtensilioId) {
                    sDescripcionItem = oEsItem.descripcion;
                }
                if (oEsItem.rmdEstructuraPasoInsumoPasoId) {
                    if(oEsItem.pasoHijoId){
                        sDescripcionItem = oEsItem.pasoHijoId.descripcion;
                    } else if (oEsItem.rmdEstructuraRecetaInsumoId) {
                        sDescripcionItem = oEsItem.rmdEstructuraRecetaInsumoId.Maktx;
                    }
                    
                }
                if (sValor === "true") {
                    sValor = 'ACTIVADO';
                } else if (sValor === "false") {
                    sValor = 'DESACTIVADO';
                }
                if (sDesPaso === 'NO APLICA') {
                    sValor = oEsItem.aplica === true ? 'ACTIVADO': 'DESACTIVADO';
                }
                let oParam = {
                    rmdHistorialId: util.onGetUUIDV4(),
                    rmdEstructuraPasoId_rmdEstructuraPasoId: oEsItem.rmdEstructuraPasoId === undefined ? null : oEsItem.rmdEstructuraPasoId,
                    rmdEstructuraEquipoId_rmdEstructuraEquipoId: oEsItem.rmdEstructuraEquipoId === undefined ? null : oEsItem.rmdEstructuraEquipoId,
                    rmdEstructuraUtensilioId_rmdEstructuraUtensilioId: oEsItem.rmdEstructuraUtensilioId === undefined ? null : oEsItem.rmdEstructuraUtensilioId,
                    rmdEstructuraEspecificacionId_rmdEstructuraEspecificacionId: oEsItem.rmdEstructuraEspecificacionId === undefined ? null : oEsItem.rmdEstructuraEspecificacionId,
                    rmdEstructuraRecetaInsumoId_rmdEstructuraRecetaInsumoId: oEsItem.rmdEstructuraRecetaInsumoId === undefined ? null : oEsItem.rmdEstructuraRecetaInsumoId_rmdEstructuraRecetaInsumoId,
                    rmdEstructuraPasoInsumoPasoId_rmdEstructuraPasoInsumoPasoId: oEsItem.rmdEstructuraPasoInsumoPasoId === undefined ? null : oEsItem.rmdEstructuraPasoInsumoPasoId,
                    usuarioRegistro: usuarioRegistro,
                    fechaRegistro: new Date(),
                    activo: true,
                    descripcionItem: sDescripcionItem,
                    descripcion: sDesPaso,
                    valor: sValor,
                    motivoModif: sMotivoModif 
                }
                if (oEsItem.rmdEstructuraPasoInsumoPasoId) {
                    oParam.rmdEstructuraPasoId_rmdEstructuraPasoId = oEsItem.pasoId_rmdEstructuraPasoId;
                }
                await registroService.createData(oThat.mainModelv2, "/RMD_ES_HISTORIAL", oParam);
            } catch (oError) {
                MessageBox.error(oError.responseText);
            }
        },

        onGetFormat: function (oEvent) {
            try {
                let oModel = oEvent.getSource().getParent().getParent().getParent().mBindingInfos.items.model;
                let lineaSeleccionada = oEvent.getSource().getParent().getBindingContext(oModel).getObject();
                if (lineaSeleccionada.tipoDatoId_iMaestraId === sIdCantidad || lineaSeleccionada.tipoDatoId_iMaestraId === sIdNumeros || lineaSeleccionada.tipoDatoId_iMaestraId === sIdRango){
                    let sValor = lineaSeleccionada.generalInput;
                    sValor = sValor.replace(/[^0-9\.]+/g, "");
                    let decimales = lineaSeleccionada.decimales;
                    // sValor = sValor == "" ? 0 : sValor;
                    if (sValor) {
                        lineaSeleccionada.generalInput = (parseFloat(sValor).toFixed(decimales));
                    }
                }
            } catch (oError) {
                MessageBox.error(oError.responseText);
            }
        },

        onSelectFraccion: function (oEvent) {
            try {
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
            } catch (oError) {
                MessageBox.error(oError.responseText);
            }
        },
        onSelectFraccionDelete: function (oEvent) {
            try {
                let oSource = oEvent.getSource();
                let selectItem = oSource.getSelectedItem();
                let value = oSource.getValue();
                if (value) {
                    if (!selectItem) {
                        MessageBox.error(oThat.getView().getModel("i18n").getResourceBundle().getText("errorRmdSelected"));
                        oSource.setValue("");
                        oThat.modelGeneral.setProperty("/selectFraccionDelete", "");
                        oThat.modelGeneral.refresh(true);
                        return;
                    }

                    if (selectItem.getKey() == "") {
                        oThat.modelGeneral.setProperty("/selectFraccionDelete", "");
                    } else {
                        oThat.modelGeneral.setProperty("/selectFraccionDelete", value);
                    }
                } else {
                    oThat.modelGeneral.setProperty("/selectFraccionDelete", "");
                }
            } catch (oError) {
                MessageBox.error(oError.responseText);
            }
        },

        onAddEquipoResponsive: function () {
            BusyIndicator.show(0);
            Promise.all([oThatConf.onGetEquipo(), oThatConf.onGetUtensilio()]).then(async values => {
                let aEquipo = values[0].results;
                let aUtensilio = values[1].results;
                let aListEquipoAssignResponsive = oThat.getView().getModel("aListEquipoAssignResponsive");
                let aEquiposNoAsign = [];
                let aUtensiliosNoAsign = [];
                let aDataEquipoGeneral = [];
            
                aEquipo.forEach(function (element) {
                    let bFlag = true;
                    aListEquipoAssignResponsive.getData().forEach(function (item) {
                        if (item.sTipo === 'EQUIPO') {
                            if (element.Equnr === item.codigo) {
                                bFlag = false;
                                return false;
                            }
                        }
                    });
            
                    if (bFlag) {
                        aEquiposNoAsign.push(element);
                    }
                });
            
                aUtensilio.forEach(function (element) {
                    let bFlag = true;
                    aListEquipoAssignResponsive.getData().forEach(function (item) {
                        if (item.sTipo === 'UTENSILIO') {
                            if (element.utensilioId === item.utensilioId) {
                                bFlag = false;
                                return false;
                            }
                        }
                    });
            
                    if (bFlag) {
                        aUtensiliosNoAsign.push(element);
                    }
                });
            
                for await (const item of aEquiposNoAsign) {
                    aDataEquipoGeneral.push({
                        id: item.Equipment,
                        aufnr: item.Aufnr,
                        werks: item.Werks,
                        auart: item.Auart,
                        ktext: item.Ktext,
                        ilart: item.Ilart,
                        sstat: item.Sstat,
                        ustat: item.Ustat,
                        ecali: item.Ecali,
                        gstrp: item.Gstrp,
                        gltrp: item.Gltrp,
                        tplnr: item.Tplnr,
                        pltxt: item.Pltxt,
                        equnr: item.Equnr,
                        eqtyp: item.Eqtyp,
                        estat: item.Estat,
                        eqktx: item.Eqktx,
                        inbdt: item.Inbdt,
                        ctext: item.Ctext,
                        abckz: item.Abckz,
                        denom: item.Denom,
                        tipoId: sIdTipoEquipo,
                        tipo: sTxtTipoEquipo
                    });
                }
            
                for await (const item of aUtensiliosNoAsign) {
                    aDataEquipoGeneral.push({
                        id: item.utensilioId,
                        aufnr: "",
                        werks: "",
                        auart: "",
                        ktext: "",
                        ilart: "",
                        sstat: "",
                        ustat: "",
                        ecali: "",
                        gstrp: "",
                        gltrp: "",
                        tplnr: "",
                        pltxt: "",
                        equnr: item.codigo,
                        eqtyp: "",
                        estat: item.estadoId.contenido,
                        eqktx: item.descripcion,
                        inbdt: "",
                        ctext: "",
                        abckz: "",
                        denom: "",
                        tipoId: item.tipoId_iMaestraId,
                        tipo: item.tipoId.contenido
                    });
                }
            
                let oModelEqp = new JSONModel(aDataEquipoGeneral);
                oModelEqp.setSizeLimit(999999999);
                oThat.getView().setModel(oModelEqp, "aListEquipoUtensilio");
            
                oThatConf.onAddEquipoEditRM();
                BusyIndicator.hide();
            }).catch(function (oError) {
                BusyIndicator.hide();
                oThatConf.onErrorMessage(oError, "errorSave");
            });
        },
        // Obtener la lista de la tabla de los equipos de SAP.
        onGetEquipo: function () {
            return new Promise(async function (resolve, reject) {
                sap.ui.core.BusyIndicator.show(0);
                let oDataSeleccionada = oThat.getView().getModel("asociarDatos");
                var aFilters = [];
                    aFilters.push(new Filter("Aufnr", "EQ", ''));
                    aFilters.push(new Filter("Werks", "EQ", oDataSeleccionada.getData().centro));
                    aFilters.push(new Filter("Equnr", "EQ", ''));
                    await registroService.onGetDataGeneralFilters(oThat.modelNecesidad, "EquipoCalSet", aFilters).then(function (oListEquipment) {
                    resolve(oListEquipment);
                }).catch(function (oError) {
                    reject(oError);
                })
            });
        },

        onGetUtensilio: function () {
            return new Promise(async function (resolve, reject) {
                sap.ui.core.BusyIndicator.show(0);
                let sExpand = "estadoId,tipoId";
                await registroService.onGetDataGeneralExpand(oThat.mainModelv2, "UTENSILIO", sExpand).then(function (oListMdEstructura) {
                    resolve(oListMdEstructura);
                }).catch(function (oError) {
                    reject(oError);
                })
            });
        },

        onAddEquipoEditRM: function () {
            try {
                if (!this.oAddEquipoEditRM) {
                    this.oAddEquipoEditRM = sap.ui.xmlfragment(
                        "frgAdicNewMdEquipment",
                        rootPath + ".view.fragment.editarRM.AdicEquipo",
                        this
                    );
                    oThat.getView().addDependent(oThat.oAddEquipoEditRM);
                }
                this.oAddEquipoEditRM.open();
            } catch (oError) {
                MessageBox.error(oError.responseText);
            }
        },

        onCancelAddEquipoEditRM: function () {
            oThat.modelGeneral.setProperty("/oDataFilterEquipoUtensilio", {});
            // this.oAddEquipoEditRM.close();
            this.oAddEquipoEditRM.destroy();
            this.oAddEquipoEditRM = undefined;
        },

        onConfirmAddEquipment: function () {
            try {
                let oMDSeleccionada = oThat.getOwnerComponent().getModel("asociarDatos"),
                    fraccionActual = oMDSeleccionada.getData().aEstructura.results[0].fraccion;
                MessageBox.confirm(formatter.onGetI18nText(oThat, "sMesaggeSaveMdEquipment"), {
                    actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
                    emphasizedAction: MessageBox.Action.OK,
                    onClose:async function (sAction) {
                        if (sAction === "OK") {
                            sap.ui.core.BusyIndicator.show(0);
                            Promise.all([oThatConf.onAsignEquipoToEstructura(), oThatConf.onAsignUtensilioToEstructura()]).then(async function (values) {
                                await sap.ui.controller("mif.rmd.registro.controller.MainView").getEstructurasRmdRefactory(fraccionActual);
                                await oThat.onChangeEstructura();
                                sap.ui.core.BusyIndicator.hide();
                                oThat.onCancelAddEquipoEditRM();
                            }).catch(function (oError) {
                                sap.ui.core.BusyIndicator.hide();
                                oThatConf.onErrorMessage(oError, "errorSave");
                            })
                        }
                    },
                });
            } catch (oError) {
                MessageBox.error(oError.responseText);
            }
        },
        onAsignEquipoToEstructura: function () {
            try {
                return new Promise(async function (resolve, reject) {
                    let oTblEquipment = sap.ui.getCore().byId("frgAdicNewMdEquipment--idTblEquipment"),
                        aPaths = oTblEquipment._aSelectedPaths,
                        oListEquipment = oThat.getView().getModel("aListEquipoUtensilio"),
                        aListDataEquipment = oListEquipment.getData(),
                        oMDSeleccionada = oThat.getOwnerComponent().getModel("asociarDatos"),
                        aListRmdEquipo = oThat.getView().getModel("aListEquipoAssignResponsive"),
                        fraccionActual = oMDSeleccionada.getData().aEstructura.results[0].fraccion,
                        key = oThat.getView().byId("idEstructuraWizard").getSelectedKey(),
                        oEstructuraSeleccionada = oMDSeleccionada.getData().aEstructura.results.find(itm=>itm.orden === Number(key));

                    if (aPaths.length === 0) {
                        MessageBox.warning(formatter.onGetI18nText(oThat, "sNoRegistroSeleccionado"));
                        sap.ui.core.BusyIndicator.hide();
                        return false;
                    }

                    let aDataEstEquipment = {
                            Id: util.onGetUUIDV4(),
                            aEquipo: []
                        },
                        aEquipo = [],
                        nPosicion = 0,
                        dDate = new Date();

                    let oTablaArrayInsert = {};
                        oTablaArrayInsert.aEquipo = [];
                        oTablaArrayInsert.id = util.onGetUUIDV4();

                    $.each(aPaths, function (k, v) {
                        if (aListDataEquipment[v.split("/")[1]].tipoId === sIdTipoEquipo) {
                            nPosicion = nPosicion + 1;
                            let sId = util.onGetUUIDV4();
                            aEquipo.push({
                                terminal: null,
                                fechaRegistro: dDate,
                                usuarioRegistro: oInfoUsuario.data.usuario,
                                activo: true,
                                equipoId: sId,
                                tipoId_iMaestraId: sIdTipoEquipo,
                                aufnr: aListDataEquipment[v.split("/")[1]].aufnr,
                                werks: aListDataEquipment[v.split("/")[1]].werks,
                                auart: aListDataEquipment[v.split("/")[1]].auart,
                                ktext: aListDataEquipment[v.split("/")[1]].ktext,
                                ilart: aListDataEquipment[v.split("/")[1]].ilart,
                                sstat: aListDataEquipment[v.split("/")[1]].sstat,
                                ustat: aListDataEquipment[v.split("/")[1]].ustat,
                                ecali: aListDataEquipment[v.split("/")[1]].ecali,
                                gstrp: aListDataEquipment[v.split("/")[1]].gstrp,
                                gltrp: aListDataEquipment[v.split("/")[1]].gltrp,
                                tplnr: aListDataEquipment[v.split("/")[1]].tplnr,
                                pltxt: aListDataEquipment[v.split("/")[1]].pltxt,
                                equnr: aListDataEquipment[v.split("/")[1]].equnr,
                                eqtyp: aListDataEquipment[v.split("/")[1]].eqtyp,
                                estat: aListDataEquipment[v.split("/")[1]].estat,
                                eqktx: aListDataEquipment[v.split("/")[1]].eqktx,
                                inbdt: aListDataEquipment[v.split("/")[1]].inbdt,
                                ctext: aListDataEquipment[v.split("/")[1]].ctext,
                                abckz: aListDataEquipment[v.split("/")[1]].abckz,
                                denom: aListDataEquipment[v.split("/")[1]].denom
                            });

                            aDataEstEquipment.aEquipo.push(
                                {
                                    terminal: null,
                                    fechaRegistro: dDate,
                                    usuarioRegistro: oInfoUsuario.data.usuario,
                                    activo: true,
                                    rmdEstructuraEquipoId: util.onGetUUIDV4(),
                                    rmdEstructuraId_rmdEstructuraId: oEstructuraSeleccionada.rmdEstructuraId,
                                    rmdId_rmdId: oMDSeleccionada.getData().rmdId,
                                    equipoId_equipoId: sId,
                                    orden: aListRmdEquipo.getData().length + nPosicion,
                                    fraccion: fraccionActual,
                                    aplica: true
                                }
                            );
                        }
                    });

                    oTablaArrayInsert.aEquipo = aEquipo;

                    if (oTablaArrayInsert.aEquipo.length > 0) {
                        await oThatConf.onSaveEquipo(oTablaArrayInsert);
                        await registroService.onSaveDataGeneral(oThat.mainModelv2, "RMD_ESTRUCTURA_SKIP", aDataEstEquipment).then(function (oDataSaved) {
                            // resolve(oDataSaved);
                            resolve(aDataEstEquipment);
                        }).catch(function (oError) {
                            reject(oError);
                            sap.ui.core.BusyIndicator.hide();
                        });
                    } else {
                        resolve(true);
                    }
                });
            } catch (oError) {
                MessageBox.error(oError.responseText);
            }
        },
        onAsignUtensilioToEstructura: function () {
            try {
                return new Promise(async function (resolve, reject) {
                    let oTblEquipment = sap.ui.getCore().byId("frgAdicNewMdEquipment--idTblEquipment"),
                        aPaths = oTblEquipment._aSelectedPaths,
                        oListEquipment = oThat.getView().getModel("aListEquipoUtensilio"),
                        aListDataEquipment = oListEquipment.getData(),
                        oMDSeleccionada = oThat.getOwnerComponent().getModel("asociarDatos"),
                        aListRmdEquipo = oThat.getView().getModel("aListEquipoAssignResponsive"),
                        fraccionActual = oMDSeleccionada.getData().aEstructura.results[0].fraccion,
                        key = oThat.getView().byId("idEstructuraWizard").getSelectedKey(),
                        oEstructuraSeleccionada = oMDSeleccionada.getData().aEstructura.results.find(itm=>itm.orden === Number(key));

                    if (aPaths.length === 0) {
                        MessageBox.warning(formatter.onGetI18nText(oThat, "sNoRegistroSeleccionado"));
                        sap.ui.core.BusyIndicator.hide();
                        return false;
                    }

                    let aDataEstEquipment = {
                            Id: util.onGetUUIDV4(),
                            aUtensilio: []
                        },
                        nPosicion = 0,
                        dDate = new Date();

                    $.each(aPaths, function (k, v) {
                        if (aListDataEquipment[v.split("/")[1]].tipoId === sIdTipoUtensilio) {
                            nPosicion = nPosicion + 1;
                            aDataEstEquipment.aUtensilio.push(
                                {
                                    terminal: null,
                                    fechaRegistro: dDate,
                                    usuarioRegistro: oInfoUsuario.data.usuario,
                                    activo: true,
                                    rmdEstructuraUtensilioId: util.onGetUUIDV4(),
                                    rmdEstructuraId_rmdEstructuraId: oEstructuraSeleccionada.rmdEstructuraId,
                                    rmdId_rmdId: oMDSeleccionada.getData().rmdId,
                                    utensilioId_utensilioId: aListDataEquipment[v.split("/")[1]].id,
                                    orden: aListRmdEquipo.getData().length + nPosicion,
                                    fraccion: fraccionActual,
                                    aplica: true
                                }
                            );
                        }
                    });

                    if (aDataEstEquipment.aUtensilio.length > 0) {
                        await registroService.onSaveDataGeneral(oThatConf.mainModelv2, "RMD_ESTRUCTURA_SKIP", aDataEstEquipment).then(function (oDataSaved) {
                            resolve(aDataEstEquipment);
                            // resolve(oDataSaved);
                        }).catch(function (oError) {
                            reject(oError);
                        });
                    } else {
                        resolve(true);
                    }
                });
            } catch (oError) {
                MessageBox.error(oError.responseText);
            }
        },
        
        onOpenAgrupador: async function () {
            let oDataSeleccionada = oThat.getOwnerComponent().getModel("asociarDatos");
            let fraccionActual = oDataSeleccionada.getData().aEstructura.results[0].fraccion;
            if (!oThat.oListAgrupador) {
                oThat.oListAgrupador = sap.ui.xmlfragment(
                    "frgAgrupador",
                    rootPath + ".view.dialog.ListAgrupador",
                    oThat
                );
                oThat.getView().addDependent(oThat.oListAgrupador);
            }
            let aFilters = [];
            aFilters.push(new Filter("fraccion", "EQ", fraccionActual));
            aFilters.push(new Filter("rmdId_rmdId", "EQ", oDataSeleccionada.getData().rmdId));
            aFilters.push(new Filter("agrupadorId_clasificacionUtensilioId", "NE", null ));
            let sExpand = "agrupadorId"
            let aAgrupadoresResult = await registroService.onGetDataGeneralFiltersExpand(oThat.mainModelv2, "RMD_ES_UTENSILIO", aFilters, sExpand)
            oThat.modelGeneral.setProperty("/tblListAgrupador", aAgrupadoresResult.results);
            oThat.oListAgrupador.open();
        },

        onCerrarAgrupador: function () {
            oThat.oListAgrupador.close();
        },

        onSelectAgrupador: async  function (oEvent) {
            let sPath = oEvent.getSource().getBindingContext("modelGeneral").sPath;
            let oLineaSeleccionada = oThat.modelGeneral.getProperty(sPath);
            let aFilterAgrupadores = [];
            aFilterAgrupadores.push(new Filter("clasificacionId_clasificacionUtensilioId", "EQ", oLineaSeleccionada.agrupadorId_clasificacionUtensilioId));
            let aUtensiliosResponse = await registroService.onGetDataGeneralFilters(oThat.mainModelv2, "UTENSILIO", aFilterAgrupadores);
            oThat.modelGeneral.setProperty("/aListUtensiliosAgrupador", aUtensiliosResponse.results);
            if (!oThat.oListUtensilios) {
                oThat.oListUtensilios = sap.ui.xmlfragment(
                    "frgUtensilios",
                    rootPath + ".view.dialog.ListAgrupadorUtensilios",
                    oThat
                );
                oThat.getView().addDependent(oThat.oListUtensilios);
            }
            oThat.oListUtensilios.open();
        },

        onSearchUtensilio: function (oEvent) {
            let aFilters = [];
            let sQuery = oEvent.getParameter("value");
            let filter1, filter2;
            if (sQuery) {
                filter1 = new Filter("utensilioId", FilterOperator.Contains, sQuery);
                filter2 = new Filter("descripcion", FilterOperator.Contains, sQuery);
            } else {
                filter1 = new Filter("utensilioId", FilterOperator.Contains, '');
                filter2 = new Filter("descripcion", FilterOperator.Contains, '');
            }
            aFilters = new Filter([filter1, filter2]);
            let oBinding = oEvent.getParameter("itemsBinding");
            oBinding.filter(aFilters, "Application");
        },

        onSearchUsuarios: function (oEvent) {
            let aFilters = [];
            let sQuery = oEvent.getParameter("value");
            let filter1, filter2;
            if (sQuery) {
                filter1 = new Filter("usuario", FilterOperator.Contains, sQuery);
                filter2 = new Filter("nombre", FilterOperator.Contains, sQuery);
            } else {
                filter1 = new Filter("usuario", FilterOperator.Contains, '');
                filter2 = new Filter("nombre", FilterOperator.Contains, '');
            }
            aFilters = new Filter([filter1, filter2]);
            let oBinding = oEvent.getParameter("itemsBinding");
            oBinding.filter(aFilters, "Application");
        },

        onSearchUsuariosButton: function (oEvent) {
            let aFilters = [];
            let sQuery = oEvent.getParameter("value");
            let filter1, filter2;
            if (sQuery) {
                filter1 = new Filter("codigo", FilterOperator.Contains, sQuery);
                filter2 = new Filter("nombre", FilterOperator.Contains, sQuery);
            } else {
                filter1 = new Filter("codigo", FilterOperator.Contains, '');
                filter2 = new Filter("nombre", FilterOperator.Contains, '');
            }
            aFilters = new Filter([filter1, filter2]);
            let oBinding = oEvent.getParameter("itemsBinding");
            oBinding.filter(aFilters, "Application");
        },

        onConfirmAddUtensilio: async function (oEvent) {
            BusyIndicator.show(0);
            let aListSelected = oEvent.mParameters.selectedItems;
            let oDataSeleccionada = oThat.getOwnerComponent().getModel("asociarDatos");
            let fraccionActual = oDataSeleccionada.getData().aEstructura.results[0].fraccion;
            let key = oThat.getView().byId("idEstructuraWizard").getSelectedKey();
            let oEstructuraSeleccionada = oDataSeleccionada.getData().aEstructura.results.find(itm=>itm.orden === Number(key));
            let aMaxLength = oEstructuraSeleccionada.aEquipo.results.concat(oEstructuraSeleccionada.aUtensilio.results);
            let index = 0;
            for await (const oUtensilio of aListSelected) {
                index ++;
                let utensilioIdSelected = oUtensilio.getProperty("title");
                let oObj = {
                    usuarioRegistro: oInfoUsuario.data.usuario,
                    fechaRegistro: new Date(),
                    activo: true,
                    rmdEstructuraUtensilioId : util.onGetUUIDV4(),
                    rmdEstructuraId_rmdEstructuraId: oEstructuraSeleccionada.rmdEstructuraId,
                    utensilioId_utensilioId: utensilioIdSelected,
                    rmdId_rmdId: oDataSeleccionada.getData().rmdId,
                    orden: aMaxLength.length + index,
                    fraccion: fraccionActual,
                    aplica: true
                }
                await registroService.onSaveDataGeneral(oThat.mainModelv2, "RMD_ES_UTENSILIO", oObj);
            }
            await sap.ui.controller("mif.rmd.registro.controller.MainView").getEstructurasRmdRefactory(fraccionActual);
            await oThat.onChangeEstructura();
            oThat.onCerrarAgrupador();
            MessageBox.success(oThat.getView().getModel("i18n").getResourceBundle().getText("successCreated"));
            BusyIndicator.hide();
        },

        // Registrar equipos que se van asignando a una estructura.
        onSaveEquipo: function (oEquipoData) {
            return new Promise(async function (resolve, reject) {
                sap.ui.core.BusyIndicator.show(0);
                await registroService.onSaveDataGeneral(oThat.mainModelv2, "TABLAS_ARRAY_MD_SKIP", oEquipoData).then(function (oDataSaved) {
                    sap.ui.core.BusyIndicator.hide();
                    resolve(oDataSaved);
                }).catch(function (oError) {
                    sap.ui.core.BusyIndicator.hide();
                    reject(oError);
                });
            });
        },

        // M??ximo caracter del Text Area de Especificaciones
        handleLiveChange: function (oEvent) {
			var oTextArea = oEvent.getSource(),
				iValueLength = oTextArea.getValue().length,
				iMaxLength = oTextArea.getMaxLength(),
				sState = iValueLength > iMaxLength ? ValueState.Warning : ValueState.None;

			oTextArea.setValueState(sState);
		},

        onOpenAddUsers: async   function () {
            BusyIndicator.show(0);
            if (!oThat.oListUsers) {
                oThat.oListUsers = sap.ui.xmlfragment(
                    "frgAddUsuarios",
                    rootPath + ".view.dialog.asignarUsuarioDetail",
                    oThat
                );
                oThat.getView().addDependent(oThat.oListUsers);
            }
            var oFilterUser = [];
            var oFilterCalificadoUser = [];
            var oFilterUserRol = [];
            var LineaActualMD = oThat.modelGeneral.getProperty("/LineaActualMD");

            oFilterUser.push(new Filter("rmdId_rmdId", FilterOperator.EQ, LineaActualMD.rmdId));
            oFilterUser.push(new Filter("rol", FilterOperator.EQ, "AUXILIAR"));
            oFilterCalificadoUser.push(new Filter("oMaestraNivel", FilterOperator.Contains, LineaActualMD.nivelTxt));
            oFilterUserRol.push(new Filter("oRol_rolId", FilterOperator.EQ, idRolAuxiliar));

            var aListUserRMD = await registroService.getDataFilter(oThat.mainModelv2, "/RMD_USUARIO", oFilterUser);

            var aListUserAbap = await registroService.getDataFilter(oThat.mainModelv2, "/USUARIO", oFilterCalificadoUser);

            var aListUsersRol = await registroService.getDataFilter(oThat.mainModelv2, "/UsuarioRol", oFilterUserRol);

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
            oThat.modelGeneral.setProperty("/usuariosAbap", aListUserAbapRolAux);
            oThat.oListUsers.open();
            BusyIndicator.hide();
        },

        onConfirmAddUsuarios: async function (oEvent) {
            var LineaActualMD = oThat.modelGeneral.getProperty("/LineaActualMD");
            let aSelecteds = oEvent.mParameters.selectedItems;
            let oDataSeleccionada = oThat.getOwnerComponent().getModel("asociarDatos");
            let fraccionActual = oDataSeleccionada.getData().aEstructura.results[0].fraccion;
            for await (const oUsuario of aSelecteds) {
                let infoUser = oUsuario.getBindingContext("modelGeneral").getObject();
                let v_user = {};
                v_user.usuarioRegistro = oInfoUsuario.data.usuario;
                v_user.fechaRegistro = new Date();
                v_user.activo = true;
                v_user.rmdUsuarioId = util.onGetUUIDV4();
                v_user.rmdId_rmdId = LineaActualMD.rmdId;
                v_user.codigo = infoUser.usuario;
                v_user.nombre = infoUser.nombre;
                v_user.rol = "AUXILIAR";
                v_user.usuarioId_usuarioId = infoUser.usuarioId;
                await registroService.onSaveDataGeneral(oThat.mainModelv2, "RMD_USUARIO", v_user);
            }
            BusyIndicator.show(0);
            await sap.ui.controller("mif.rmd.registro.controller.MainView").getEstructurasRmdRefactory(fraccionActual);
            await oThat.onChangeEstructura();
            BusyIndicator.hide();
            MessageBox.success("Se registraron los usuarios correctamente");
        },

        onState: function (bState, modelo) {
            var oModel = new JSONModel({
                "state": bState
            });
            if (oThat.getView().getModel(modelo)) {
                oThat.getView().getModel(modelo).setProperty("/state", bState);
            } else {
                oThat.getView().setModel(oModel, modelo);
            }
            // oThat.getView().setModel(oModel, modelo);
            oThat.getView().getModel(modelo).refresh(true);
        },

        onReaperturarRMD: function () {
            MessageBox.confirm(oThat.getView().getModel("i18n").getResourceBundle().getText("confirmReaperturaRMD"), {
                styleClass: "sapUiSizeCompact",
                actions: [MessageBox.Action.YES, MessageBox.Action.NO],
                onClose: async function (oAction) {
                    if (oAction === "YES") {
                        let oDataSeleccionada = oThat.getOwnerComponent().getModel("asociarDatos");
                        let fraccionActual = oDataSeleccionada.getData().aEstructura.results[0].fraccion;
                        let dataRmd = oDataSeleccionada.getData();
                        let sobject = {};           
                        sobject.fechaActualiza = new Date();
                        sobject.usuarioActualiza = oInfoUsuario.data.usuario;
                        sobject.rmdId = LineaActual.rmdId;
                        sobject.estadoIdRmd_iMaestraId = 477;
                        oThatConf.setUpdateRmd(sobject);
                        oThat.onState(true, "generalModelState");

                        let aFilter = [];
                        aFilter.push(new Filter("usuarioId_usuarioId", "EQ", oInfoUsuario.data.usuarioId));
                        aFilter.push(new Filter("fraccion", "EQ", fraccionActual));
                        let aLapsoSelected = await registroService.onGetDataGeneralFilters(oThat.mainModelv2, "RMD_VERIFICACION_FIRMAS", aFilter);
                        if(aLapsoSelected.results.length === 0){
                            var oDataFirmaVerif = {}
                            oDataFirmaVerif.rmdId           = dataRmd.rmdId;
                            oDataFirmaVerif.fraccionActual  = fraccionActual;

                            oThat.onRMD_VERIFICACION_FIRMAS(oDataFirmaVerif);
                        }
                        MessageBox.success(oThat.getView().getModel("i18n").getResourceBundle().getText("successReaperturaRMD"));
                    }
                }
            }); 
        },

        onGetRefresh:async function () {
            let oDataSeleccionada = oThat.getOwnerComponent().getModel("asociarDatos");
            if(oDataSeleccionada.getData()){
                if(oDataSeleccionada.getData().aEstructura.results) {
                    let fraccionActual = oDataSeleccionada.getData().aEstructura.results[0].fraccion;
                    if (fraccionActual) {
                        await sap.ui.controller("mif.rmd.registro.controller.MainView").getEstructurasRmdRefactory(fraccionActual);
                        await oThat.onChangeEstructura();
                    }   
                }
            }
        },

        getTimeActivities: async function (lineaSeleccionada, sTipo) {
            let lineaActual = oThat.modelGeneral.getProperty("/LineaActualRMD");            
            let aFilters = [];
            aFilters.push(new Filter("Orderid", "EQ", lineaActual.Aufnr));
            aFilters.push(new Filter("Phase", "EQ", lineaSeleccionada.Vornr ? lineaSeleccionada.Vornr : lineaActual.Vornr));
            if (sTipo !== undefined && sTipo !== "SETUP") {
                aFilters.push(new Filter("Yield", "EQ", parseFloat(sTipo)));
            } else {
                aFilters.push(new Filter("Yield", "EQ", parseFloat(lineaActual.Vfmng)));
            }
            //OFFLINE
            let aActividades = await registroService.onGetDataGeneral(oThat.modelNecesidad, "ActividadOfflineSet");
            let aListActivities = await registroService.onGetDataGeneralFilters(oThat.modelNecesidad, "ActividadOfflineSet", aFilters);
            //let aListActivities = await registroService.getDataAjax("/ActividadSet", aFilters);
            let arrActivities = [];
            aListActivities.results.forEach(function(oActivity){
            //aListActivities.forEach(function(oActivity){
                let obj ={
                    hours: oActivity.ConfActivity1,
                    descripcion: "Activity 1",
                    unidad: oActivity.ConfActiUnit1
                }
                arrActivities.push(obj);
                let obj1 ={
                    hours: oActivity.ConfActivity2,
                    descripcion: "Activity 2",
                    unidad: oActivity.ConfActiUnit2
                }
                arrActivities.push(obj1);
                let obj2 ={
                    hours: oActivity.ConfActivity3,
                    descripcion: "Activity 3",
                    unidad: oActivity.ConfActiUnit3
                }
                arrActivities.push(obj2);
                let obj3 ={
                    hours: oActivity.ConfActivity4,
                    descripcion: "Activity 4",
                    unidad: oActivity.ConfActiUnit4
                }
                arrActivities.push(obj3);
            });
            
            return arrActivities;
        },

        onPressNotificationsList: async function () {
            BusyIndicator.show(0);
            let oDataSeleccionada = oThat.getOwnerComponent().getModel("asociarDatos");
            let fraccionActual = oDataSeleccionada.getData().aEstructura.results[0].fraccion;
            let aFilters = [];
			aFilters.push(new Filter("rmdId_rmdId", "EQ", oDataSeleccionada.getData().rmdId));
			aFilters.push(new Filter("automatico", "EQ", false));
			aFilters.push(new Filter("fraccion", "EQ", fraccionActual));
            aFilters.push(new Filter("fechaInicio", "NE", null));
            aFilters.push(new Filter("notifFinal", "NE", true));
			let sExpands = "pasoIdFin,pasoId";
			let oResponseLapsoManual = await registroService.onGetDataGeneralFiltersExpand(oThat.mainModelv2, "RMD_LAPSO", aFilters, sExpands);
			let lineaSeleccionada = oResponseLapsoManual.results;
            oThat.modelGeneral.setProperty("/lapsoManual", lineaSeleccionada);
            let bTipo = formatter.onVerifNotif(lineaSeleccionada[0]);
            oThat.modelGeneral.setProperty("/bFlagNotifFinal", bTipo);
            if (!oThat.oListNotifications) {
                oThat.oListNotifications = sap.ui.xmlfragment(
                    "frgNotificaciones",
                    rootPath + ".view.dialog.ListNotifications",
                    oThat
                );
                oThat.getView().addDependent(oThat.oListNotifications);
            }
            let aFilter = [];
            //aFilter.push(new Filter("activo", "EQ", true));
            aFilter.push(new Filter("rmdId_rmdId", "EQ", oDataSeleccionada.getData().rmdId));
            aFilter.push(new Filter("fraccion", "EQ", fraccionActual));
            let sExpand = "rmdId";
            let aListNotificaciones = await registroService.onGetDataGeneralFiltersExpand(oThat.mainModelv2, "RMD_TABLA_CONTROL", aFilter, sExpand);
            aListNotificaciones.results.forEach(function(oNotif){
                oNotif.cantBuena = (parseFloat(oNotif.cantBuena)).toFixed(3);
                oNotif.cantRechazo = (parseFloat(oNotif.cantRechazo)).toFixed(3);
            });
            //TEST_NOTIF
            // aListNotificaciones.results.push({
            //     "orden":"300000554",
            //     "fase":"0030",
            //     "puestoTrabajo":"FSELFA01",
            //     "cantBuena":100,
            //     "cantRechazo":0,
            //     "motivoDesv":"xx",
            //     "usuarioRegistro":"jdiazpine",
            //     "fechaRegistro":null,
            //     "usuarioActualiza":"jdiazpine2",
            //     "fechaActualiza":null,
            //     "activo":true,
            //     "ConfTextAnulac":"Pruebasddddsklaldsd asdaklj"
            // });
            // aListNotificaciones.results.push({
            //     "orden":"300000554",
            //     "fase":"0030",
            //     "puestoTrabajo":"FSELFA01",
            //     "cantBuena":59,
            //     "cantRechazo":0,
            //     "motivoDesv":"xx",
            //     "usuarioRegistro":"jdiazpine",
            //     "fechaRegistro":null,
            //     "usuarioActualiza":"jdiazpine2",
            //     "fechaActualiza":null,
            //     "activo":false,
            //     "ConfTextAnulac":"asdasdllfkl lsklsjdlddl"
            // })
            //
            let oModel = new JSONModel(aListNotificaciones.results);
            oModel.setSizeLimit(999999999);
            oThat.getOwnerComponent().setModel(oModel, "tblListNotifications");
            oThat.oListNotifications.open();
            BusyIndicator.hide();
        },

        onCancelNotificationsList: function () {
            oThat.oListNotifications.close();
        },

        onDeleteNotificacion: async function (oEvent) {
            let oModel = oEvent.getSource().getParent().getParent().getParent().mBindingInfos.items.model;
            let oContext = oEvent.getSource().getParent().getBindingContext(oModel).getObject();
            let oDataSeleccionada = oThat.getOwnerComponent().getModel("asociarDatos");
            let fraccionActual = oDataSeleccionada.getData().aEstructura.results[0].fraccion;
            let aFilter = [];
            aFilter.push(new Filter("rmdId_rmdId", "EQ", oDataSeleccionada.getData().rmdId));
            aFilter.push(new Filter("automatico", "EQ", false));
            aFilter.push(new Filter("fraccion", "EQ", fraccionActual));
            aFilter.push(new Filter("fechaInicio", "NE", null));
            aFilter.push(new Filter("notifFinal", "EQ", true));
            let sExpand = "pasoIdFin,pasoId";
            let oResponseLapsoManual = await registroService.onGetDataGeneralFiltersExpand(oThat.mainModelv2, "RMD_LAPSO", aFilter, sExpand);
            let pasoSelected = oResponseLapsoManual.results.find(itm=>itm.pasoIdFin.puestoTrabajo === oContext.puestoTrabajo);
            let pasoSeleccionado = pasoSelected;

            
            var oDialogDeleteNotif = new sap.m.Dialog({
					type: "Message",
					title: "Confirmar",
					content: [
						new Label({
							text: oThat.getView().getModel("i18n").getResourceBundle().getText("confirmDeleteNotif"),
							labelFor: "submitDialogTextarea"
						}),
						new TextArea("submitDialogTextarea", {
							liveChange: function (oEvent) {
                                var parent = oEvent.getSource().getParent();
                                parent.getBeginButton().setEnabled(true);
                            },
                            width: "100%",
                            required: true
						})
					],
					beginButton: new Button({
						type: mobileLibrary.ButtonType.Emphasized,
						text: "Aceptar",
						enabled: false,
						press: function () {
							var sMotivoEliminacion = sap.ui.getCore().byId("submitDialogTextarea").getValue();
							BusyIndicator.show(0);
                            
                            let obj = {
                                Rueck: oContext.Rueck,
                                Rmzhl: oContext.Rmzhl,
                                Orderid: (oContext.orden).toString(),
                                Phase: oContext.fase,
                                PostgDate: new Date().toISOString().slice(0,-1),
                                ConfText: sMotivoEliminacion,
                                Zflag: "5",
                                NotificacionOfflineSet: util.onGetUUIDV4()
                                //NotificacionMensajeSet: []
                            }
                            //registroService.createData(oThat.modelNecesidad,"/NotificacionSet",obj).then(async function(payload){
                            registroService.createData(oThat.modelNecesidad,"/NotificacionOfflineSet",obj).then(async function(payload){
                                console.log(payload);
                                //let msg = payload.NotificacionMensajeSet.results[0].Message;
                                //if (payload.NotificacionMensajeSet.results[0].Type !== "E") {
                                    if (oContext.operacion === "FINAL") {
                                        if (pasoSelected) {
                                            let objNotifFinal = {
                                                notifFinal: false
                                            }
                                            await registroService.onUpdateDataGeneral(oThat.mainModelv2, "RMD_LAPSO", objNotifFinal, pasoSeleccionado.rmdLapsoId);
                                        } 
                                    }
                                    let objBTP = {
                                        usuarioActualiza: oInfoUsuario.data.usuario,
                                        fechaActualiza: new Date(),
                                        activo: false,
                                        ConfTextAnulac: sMotivoEliminacion
                                    }
                                    await registroService.onUpdateDataGeneral(oThat.mainModelv2, "RMD_TABLA_CONTROL", objBTP, oContext.rmdControlRechazo);
                                    await oThat.onUpdateSumatoriaMuestreo();
                                    MessageBox.success("Se elimin?? correctamente la notificaci??n");
                                //} else {
                                //    MessageBox.information(msg);
                                //}
                                if (oModel === "tblListNotifications") {
                                    oThat.onCancelNotificationsList();
                                } else {
                                    oThat.onCancelMuestreo();
                                }
                            
                                BusyIndicator.hide();
                            }).catch((err)=>{
                                console.log(err);
                                MessageBox.warning("Ocurri?? un error al eliminar la notificaci??n");
                                BusyIndicator.hide();
                            })
                            sap.ui.getCore().byId("submitDialogTextarea").setValue("");
                            oDialogDeleteNotif.close();  
						}

					}),
					endButton: new Button({
						text: "Cancel",
						press: function () {
                            sap.ui.getCore().byId("submitDialogTextarea").setValue("");
							oThat.oSubmitDialog.close();
						}
					}),
                    afterClose: function () {
                        oDialogDeleteNotif.destroy();
                    }
			});
			

			oDialogDeleteNotif.open();

            // MessageBox.confirm(oThat.getView().getModel("i18n").getResourceBundle().getText("confirmDeleteNotif"), {
            //     styleClass: "sapUiSizeCompact",
            //     actions: [MessageBox.Action.YES, MessageBox.Action.NO],
            //     onClose: async function (oAction) {
            //         if (oAction === "YES") {
            //             BusyIndicator.show(0);
            //             let obj = {
            //                 Rueck: oContext.Rueck,
            //                 Rmzhl: oContext.Rmzhl,
            //                 Orderid: (oContext.orden).toString(),
            //                 Phase: oContext.fase,
            //                 PostgDate: new Date().toISOString().slice(0,-1),
            //                 Zflag: "5",
            //                 NotificacionMensajeSet: []
            //             }
            //             registroService.createData(oThat.modelNecesidad,"/NotificacionSet",obj).then(async function(payload){
            //                 console.log(payload);
            //                 let msg = payload.NotificacionMensajeSet.results[0].Message;
            //                 if (payload.NotificacionMensajeSet.results[0].Type !== "E") {
            //                     if (oContext.operacion === "FINAL") {
            //                         if (pasoSelected) {
            //                             let objNotifFinal = {
            //                                 notifFinal: false
            //                             }
            //                             await registroService.onUpdateDataGeneral(oThat.mainModelv2, "RMD_LAPSO", objNotifFinal, pasoSeleccionado.rmdLapsoId);
            //                         } 
            //                     }
            //                     let objBTP = {
            //                         usuarioActualiza: oInfoUsuario.data.usuario,
            //                         fechaActualiza: new Date(),
            //                         activo: false
            //                     }
            //                     await registroService.onUpdateDataGeneral(oThat.mainModelv2, "RMD_TABLA_CONTROL", objBTP, oContext.rmdControlRechazo);
            //                     await oThat.onUpdateSumatoriaMuestreo();
            //                     MessageBox.success("Se elimin?? correctamente la notificaci??n");
            //                 } else {
            //                     MessageBox.information(msg);
            //                 }
            //                 if (oModel === "tblListNotifications") {
            //                     oThat.onCancelNotificationsList();
            //                 } else {
            //                     oThat.onCancelMuestreo();
            //                 }
                            
            //                 BusyIndicator.hide();
            //             }).catch((err)=>{
            //                 console.log(err);
            //                 MessageBox.warning("Ocurri?? un error al eliminar la notificaci??n");
            //                 BusyIndicator.hide();
            //             })
            //         }
            //     }
            // });        
        },

        onChangeCantBuena: async function (oEvent) {
            let bFlagNotifFinal = oThat.modelGeneral.getProperty("/bFlagNotifFinal");
            BusyIndicator.show(0);
            let oContext;
            if (oEvent === "PARCIAL") {
                oContext = "PARCIAL";
            } else if (oEvent === "FINAL") {
                oContext = "FINAL"
            } else {
                oContext = oEvent.getSource().getValue();
                oThat.modelGeneral.setProperty("/LineaActualRMD/rechazo", "");
                oThat.modelGeneral.setProperty("/LineaActualRMD/causadesv", "");
                let bValidateCantBuena = await oThat.onValidarItem(oContext);
                if(!bValidateCantBuena){
                    oThat.modelGeneral.setProperty("/LineaActualRMD/cantBuenda", "");
                    oThat.modelGeneral.setProperty("/aListActivities", []);
                    MessageBox.error("La cantidad ingresada supera la cantidad permitida.");
                    BusyIndicator.hide();
                    return;
                }
            }
            let oDataSeleccionada = oThat.getOwnerComponent().getModel("asociarDatos");
            let fraccionActual = oDataSeleccionada.getData().aEstructura.results[0].fraccion;
            let aFilter = [];
            aFilter.push(new Filter("rmdId_rmdId", "EQ", oDataSeleccionada.getData().rmdId));
            aFilter.push(new Filter("automatico", "EQ", false));
            aFilter.push(new Filter("fraccion", "EQ", fraccionActual));
            aFilter.push(new Filter("fechaInicio", "NE", null));
            aFilter.push(new Filter("notifFinal", "NE", true));
            let sExpand = "pasoIdFin,pasoId";
            let oResponseLapsoManual = await registroService.onGetDataGeneralFiltersExpand(oThat.mainModelv2, "RMD_LAPSO", aFilter, sExpand);
            let lineaSeleccionada = oResponseLapsoManual.results[0];
            if(oContext === "PARCIAL" || oContext === "FINAL" || oContext === "" || oContext === "0"){
                oThat.modelGeneral.setProperty("/aListActivities", []);
            } else {
                let activities
                if (bFlagNotifFinal){ 
                    activities = await this._getListActivities(lineaSeleccionada);
                } else {
                    activities = await this.getTimeActivities(lineaSeleccionada, oContext);
                }
                oThat.modelGeneral.setProperty("/aListActivities", activities);
            }
            BusyIndicator.hide();
        },

        onChangeCantidadRechazo: async function () {
            let bFlagNotifFinal = oThat.modelGeneral.getProperty("/bFlagNotifFinal");
            oThat.modelGeneral.setProperty("/LineaActualRMD/cantBuenda", "");
            let bValidateCantRechazo = await oThat.onValidarItem(oThat.modelGeneral.getProperty("/LineaActualRMD/rechazo"));
            if(!bValidateCantRechazo){
                oThat.modelGeneral.setProperty("/LineaActualRMD/rechazo", "");
                MessageBox.error("La cantidad ingresada supera la cantidad permitida.");
                return;
            }
            if (bFlagNotifFinal) {
                oThat.onChangeCantBuena("FINAL");
            } else {
                oThat.onChangeCantBuena("PARCIAL");
            }
        },

        onValidarItem: async function (iCant) {
            let bResponse = true;
            let oDataSeleccionada = oThat.getOwnerComponent().getModel("asociarDatos");
            let fraccionActual = oDataSeleccionada.getData().aEstructura.results[0].fraccion;
            let aListPasosProceso = oThat.getView().getModel("aListProcessAssignResponsive");
            let aFilterLapso = [];
            aFilterLapso.push(new Filter("rmdId_rmdId", "EQ", oDataSeleccionada.getData().rmdId));
            aFilterLapso.push(new Filter("automatico", "EQ", false));
            aFilterLapso.push(new Filter("fraccion", "EQ", fraccionActual));
            let aLapsoManualResponse = await registroService.onGetDataGeneralFilters(oThat.mainModelv2, "RMD_LAPSO", aFilterLapso);
            let pasosSelected = [];
            aLapsoManualResponse.results.forEach(function(oLapso){
                pasosSelected.push(aListPasosProceso.getData().find(itm=>itm.mdEstructuraPasoIdDepende === oLapso.pasoIdFin_mdEstructuraPasoId));
            });
            pasosSelected.sort(function (a, b) {
                return b.contador - a.contador;
            });
            let aFilter = [];
            aFilter.push(new Filter("activo", "EQ", true));
            aFilter.push(new Filter("rmdId_rmdId", "EQ", oDataSeleccionada.getData().rmdId));
            aFilter.push(new Filter("fraccion", "EQ", fraccionActual));
            aFilter.push(new Filter("clvModelo", "EQ", pasosSelected[0].clvModelo));
            aFilter.push(new Filter("puestoTrabajo", "EQ", pasosSelected[0].puestoTrabajo));
            let aListNotificaciones = await registroService.onGetDataGeneralFilters(oThat.mainModelv2, "RMD_TABLA_CONTROL", aFilter);
            let cantidad = 0;
            aListNotificaciones.results.forEach(function(oNotif){
                cantidad = cantidad + parseFloat(oNotif.cantRechazo) + parseFloat(oNotif.cantBuena);
            });
            let aFilterSap = [];
            //OFFLINE
            //aFilterSap.push(new Filter("Charg", "EQ", ""));
            aFilterSap.push(new Filter("Aufnr", "EQ", oDataSeleccionada.getData().ordenSAP));
            let ordenResponse = await registroService.onGetDataGeneralFilters(oThat.modelNecesidad, "OrdenSet", aFilterSap);
            let teoricoInicial = parseFloat(oDataSeleccionada.getData().vfmng);
            let tolerancia = ordenResponse.results[0].Uebto ? parseFloat(ordenResponse.results[0].Uebto) : 0;
            let cantTeorica = teoricoInicial + (teoricoInicial * (tolerancia / 100));
            if (parseFloat(cantTeorica) - (cantidad + parseFloat(iCant)) >= 0) {
                bResponse = true;
            } else {
                bResponse = false;
            }
            return bResponse;
        },

        onLimpiarInput: function (oEvent) {
            var oInput = oEvent.getSource().getValue();
            if(Number(oInput) === 0){
                if (oInput.split(".")[1]){
                    if (oInput.split(".")[1].length > 3) {
                        oEvent.getSource().setValue(Number(oInput).toFixed(3));
                    }
                }
            } else if (!Number(oInput)) {
                oEvent.getSource().setValue(oInput.substring(0, oInput.length - 1));  
            } else {
                if (oInput.split(".")[1]){
                    if (oInput.split(".")[1].length > 3) {
                        oEvent.getSource().setValue(Number(oInput).toFixed(3));
                    }
                }
            }
        },

        onShowListMuestreo: async function () {
            BusyIndicator.show(0);
            let oDataSeleccionada = oThat.getOwnerComponent().getModel("asociarDatos");
            let fraccionActual = oDataSeleccionada.getData().aEstructura.results[0].fraccion;
            if (!oThat.oListMuestreo) {
                oThat.oListMuestreo = sap.ui.xmlfragment(
                    "frgMuestreo",
                    rootPath + ".view.dialog.ListMuestreo",
                    oThat
                );
                oThat.getView().addDependent(oThat.oListMuestreo);
            }
            let aFilter = [];
            aFilter.push(new Filter("activo", "EQ", true));
            aFilter.push(new Filter("rmdId_rmdId", "EQ", oDataSeleccionada.getData().rmdId));
            aFilter.push(new Filter("fraccion", "EQ", fraccionActual));
            aFilter.push(new Filter("cantRechazo", "NE", "0"));
            aFilter.push(new Filter("motivoDesv", "NE", "Merma Propia del Proceso"));
            let sExpand = "rmdId";
            let aListNotificaciones = await registroService.onGetDataGeneralFiltersExpand(oThat.mainModelv2, "RMD_TABLA_CONTROL", aFilter, sExpand);
            aListNotificaciones.results = aListNotificaciones.results.filter(itm=>itm.rol === "RMD_CONTROL_PROCESO" || itm.rol === "RMD_CONTROL_CALIDAD");
            aListNotificaciones.results.forEach(function(oNotif){
                oNotif.cantBuena = (parseFloat(oNotif.cantBuena)).toFixed(3);
                oNotif.cantRechazo = (parseFloat(oNotif.cantRechazo)).toFixed(3);
            });
            let oModel = new JSONModel(aListNotificaciones.results);
            oModel.setSizeLimit(999999999);
            oThat.getOwnerComponent().setModel(oModel, "tblListMuestreo");
            oThat.oListMuestreo.open();
            BusyIndicator.hide();
        },

        onCancelMuestreo: function () {
            oThat.oListMuestreo.close();
        },

        onPrintNotificationMuestreo: async function (oEvent) {
            BusyIndicator.show(0);
            let lineaSeleccionada = oEvent.getSource().getBindingContext("tblListMuestreo").getObject();
            let lineaRMD = oThat.getOwnerComponent().getModel("asociarDatos").getData();
            if(!oThat.onVisualizeEtiquetaMuestreo){
                oThat.onVisualizeEtiquetaMuestreo = sap.ui.xmlfragment(
                    "frgVisualizeMuestreo",
                    rootPath + ".view.dialog.VisualizeEtiquetaMuestreo",
                    oThat
                );
                oThat.getView().addDependent(oThat.onVisualizeEtiquetaMuestreo);
            }
            let base64Etiqueta = await muestreoPdf.onGeneratePdf(lineaSeleccionada, lineaRMD);
            oThat.modelGeneral.setProperty("/base64MuestraSelected", base64Etiqueta);
            oThat.modelGeneral.setProperty("/muestraSelected", lineaSeleccionada);
            let oHtmlChange = new sap.ui.core.HTML({
                content: "<iframe src=" + base64Etiqueta + " width='430' height='380'></iframe>"
            });
            oThat.onVisualizeEtiquetaMuestreo.open();
            sap.ui.getCore().byId(sap.ui.core.Fragment.createId("frgVisualizeMuestreo", "carouselDataMuestreo")).addPage(oHtmlChange);
            BusyIndicator.hide();
        },

        onCancelVisualizeEtiquetaMuestreo: function () {
            sap.ui.getCore().byId(sap.ui.core.Fragment.createId("frgVisualizeMuestreo", "carouselDataMuestreo")).removeAllPages();
            oThat.modelGeneral.setProperty("/base64MuestraSelected", "");
            oThat.modelGeneral.setProperty("/muestraSelected", "");
            oThat.onVisualizeEtiquetaMuestreo.close();
        },

        onConfirmPrintEtiquetaMuestreo: async function () {
            let oDataSeleccionada = oThat.getOwnerComponent().getModel("asociarDatos");
            BusyIndicator.show(0);
            var aFilters = [];
            // aFilters.push(new Filter("Area", "EQ", oDataSeleccionada.getData().mdId.areaRmdTxt));
            aFilters.push(new Filter("Area", "EQ", "ACONDICIONADO"));
            await registroService.onGetDataGeneralFilters(oThat.modelNecesidad, "ImpresoraSet", aFilters).then(aImpresoras => {
                oThat.modelGeneral.setProperty("/ImpresorasMuestra", aImpresoras.results);
            }).catch(function (oError) {
                console.log(oError);
                BusyIndicator.hide();
            });
            if (!oThat.onPrintMuestra) {
                oThat.onPrintMuestra = sap.ui.xmlfragment(
                "frgPrintMuestra",
                rootPath + ".view.dialog.printMuestra",
                oThat);
                oThat.getView().addDependent(oThat.onPrintMuestra);
            }
            oThat.onPrintMuestra.open();
            BusyIndicator.hide();
        },

        onCancelImprimirTicketMuestra: function () {
            oThat.modelGeneral.setProperty("/impresoraSelected", "")
            oThat.onPrintMuestra.close();
        },

        onImprimirTicketMuestra: async function () {
            BusyIndicator.show(0);
            try {
                let oSelectedPrinter = oThat.modelGeneral.getProperty("/impresoraSelected");
                let base64Etiqueta = oThat.modelGeneral.getProperty("/base64MuestraSelected");
                let muestraSeleccionada = oThat.modelGeneral.getProperty("/muestraSelected");
                let base64Print = base64Etiqueta.substring(28, base64Etiqueta.length);
                let oData = {
                    "Base64" : base64Print,
                    "Padest": oSelectedPrinter,
                    "Copias": 1,
                    "NameEti": "",
                    "Extension": "",
                    "Return": ""
                }
                await registroService.createData(oThat.modelNecesidad, "/EtiquetaPrintSet", oData).then(async function(oDataPrint){
                    if (oDataPrint.Subrc !== '00') {
                        MessageBox.error(oDataPrint.Return);
                    } else {
                        let oObj= {};
                        if (muestraSeleccionada.impresion) {
                            oObj = {
                                reimpresion: muestraSeleccionada.reimpresion ? muestraSeleccionada.reimpresion + 1 : 0 + 1,
                                fechaReimpresion: new Date()
                            }
                        } else {
                            oObj = {
                                impresion: 1,
                                fechaImpresion: new Date()
                            }
                        }
                        await registroService.onUpdateDataGeneral(oThat.mainModelv2, "RMD_TABLA_CONTROL", oObj, muestraSeleccionada.rmdControlRechazo);
                        MessageBox.success(oDataPrint.Return);
                    }
                    oThat.onCancelImprimirTicketMuestra();
                    oThat.onCancelVisualizeEtiquetaMuestreo();
                    oThat.onCancelMuestreo();
                    BusyIndicator.hide();
                })
                .catch(function(err){
                    BusyIndicator.hide();
                    MessageBox.error(err.message);
                    return false;
                })  
            } catch (oError) {
                BusyIndicator.hide();
                MessageBox.error(oError.responseText);
            }
        },

        onUpdateSumatoriaMuestreo: async function ()  {
            let oDataSeleccionada = oThat.getOwnerComponent().getModel("asociarDatos");
            let fraccionActual = oDataSeleccionada.getData().aEstructura.results[0].fraccion;
            let aFilter = [];
            aFilter.push(new Filter("activo", "EQ", true));
            aFilter.push(new Filter("rmdId_rmdId", "EQ", oDataSeleccionada.getData().rmdId));
            aFilter.push(new Filter("fraccion", "EQ", fraccionActual));
            aFilter.push(new Filter("cantRechazo", "NE", "0"));
            aFilter.push(new Filter("motivoDesv", "NE", "Merma Propia del Proceso"));
            let aListNotificaciones = await registroService.onGetDataGeneralFilters(oThat.mainModelv2, "RMD_TABLA_CONTROL", aFilter);
            aListNotificaciones.results = aListNotificaciones.results.filter(itm=>itm.rol === "RMD_CONTROL_PROCESO" || itm.rol === "RMD_CONTROL_CALIDAD");
            let cantidad = 0;
            aListNotificaciones.results.forEach(function(oNotif){
                cantidad = cantidad + parseFloat(oNotif.cantRechazo);
            });
            //OBTENEMOS LOS PASOS QUE SEAN TIPO DE DATO MUESTRACC
            let aFilterPaso = [];
            aFilterPaso.push(new Filter("activo", "EQ", true));
            aFilterPaso.push(new Filter("rmdId_rmdId", "EQ", oDataSeleccionada.getData().rmdId));
            aFilterPaso.push(new Filter("fraccion", "EQ", fraccionActual));
            aFilterPaso.push(new Filter("tipoDatoId_iMaestraId", "EQ", iIdMuestraCC));
            let aListPasos = await registroService.onGetDataGeneralFilters(oThat.mainModelv2, "RMD_ES_PASO", aFilterPaso);
            let aListPM = await registroService.onGetDataGeneralFilters(oThat.mainModelv2, "RMD_ES_PASO_INSUMO_PASO", aFilterPaso);
            for await (const oPaso of aListPasos.results) {
                let oObj = {
                    cantidad: cantidad
                }
                await registroService.onUpdateDataGeneral(oThat.mainModelv2, "RMD_ES_PASO", oObj, oPaso.rmdEstructuraPasoId);
            }
            for await (const oPasoMenor of aListPM.results) {
                let oObj = {
                    cantidad: cantidad
                }
                await registroService.onUpdateDataGeneral(oThat.mainModelv2, "RMD_ES_PASO_INSUMO_PASO", oObj, oPasoMenor.rmdEstructuraPasoInsumoPasoId);
            }
        },

        onDeleteEtiquetaControl:async function (oEvent) {
            try {
                let oData = oEvent.getSource().getParent().getBindingContext("modelGeneral").getObject();
                MessageBox.confirm(formatter.onGetI18nText(oThat, "sMesaggeConfirmDelete"), {
                    onClose : async function(sButton) {
                        if (sButton === MessageBox.Action.OK) {
                            sap.ui.core.BusyIndicator.show(0);
                            let oDataUpdate = {
                                fechaActualiza: new Date(),
                                usuarioActualiza: oInfoUsuario.data.usuario,
                                activo: false
                            }

                            await registroService.onUpdateDataGeneral(oThat.mainModelv2, "ETIQUETAS_CONTROL", oDataUpdate, oData.etiquetasControlId).then(function (oResult) {
                                sap.ui.core.BusyIndicator.hide();
                                oThat.onObtenerListEtiquetaSinEnlace(oThat.nType);
                                MessageBox.success(formatter.onGetI18nText(oThat, "sMesaggeDeteleSuccess"));
                            }).catch(function (oError) {
                                sap.ui.core.BusyIndicator.hide();
                                throw oError;
                            });
                        }
                    }
                });
            } catch (oError) {
                sap.ui.core.BusyIndicator.hide();
                MessageBox.error(oError.responseText);
            }
        },

        onEditEtiquetaControlHu: async function (oEvent) {
            try {
                sap.ui.core.BusyIndicator.show(0);
                let oData = oEvent.getSource().getParent().getBindingContext("modelGeneral").getObject(),
                    oLineaActualRMD = oThat.getView().getModel("modelGeneral").getProperty("/LineaActualRMD");

                var aFilter = [];
                aFilter.push(new Filter("hu", "EQ", oData.Exidv));
                aFilter.push(new Filter("orden", "EQ", oLineaActualRMD.Aufnr));
                aFilter.push(new Filter("Venum", "EQ", oData.Venum));
                aFilter.push(new Filter("activo", "EQ", true));

                let oDataEtiquetasControl = await registroService.getDataFilter(oThat.mainModelv2, "/ETIQUETAS_CONTROL", aFilter);
                if (oDataEtiquetasControl.results.length > 0) {
                    let oDataUpdate = {
                        fechaActualiza: new Date(),
                        usuarioActualiza: oInfoUsuario.data.usuario,
                        cantidadUnidad: oData.Umrez
                    }
    
                    await registroService.onUpdateDataGeneral(oThat.mainModelv2, "ETIQUETAS_CONTROL", oDataUpdate, oDataEtiquetasControl.results[0].etiquetasControlId);
                    MessageBox.success(formatter.onGetI18nText(oThat, "sMesaggeUpdateSuccess"));
                } else {
                    sap.ui.core.BusyIndicator.hide();
                    MessageBox.error("No se pudo desplegar por que no se encontr?? el registro.");
                }
                sap.ui.core.BusyIndicator.hide();
            } catch (oError) {
                sap.ui.core.BusyIndicator.hide();
                MessageBox.error(oError.responseText);
            }
        },

        onEditEtiquetaControl:async function (oEvent) {
            try {
                sap.ui.core.BusyIndicator.show(0);
                let oData = oEvent.getSource().getParent().getBindingContext("modelGeneral").getObject();
                let oDataUpdate = {
                    fechaActualiza: new Date(),
                    usuarioActualiza: oInfoUsuario.data.usuario,
                    cantidadUnidad: oData.cantidadUnidad
                }

                await registroService.onUpdateDataGeneral(oThat.mainModelv2, "ETIQUETAS_CONTROL", oDataUpdate, oData.etiquetasControlId).then(function (oResult) {
                    sap.ui.core.BusyIndicator.hide();
                    oThat.onObtenerListEtiquetaSinEnlace(oThat.nType);
                    MessageBox.success(formatter.onGetI18nText(oThat, "sMesaggeUpdateSuccess"));
                }).catch(function (oError) {
                    sap.ui.core.BusyIndicator.hide();
                    throw oError;
                });
            } catch (oError) {
                sap.ui.core.BusyIndicator.hide();
                MessageBox.error(oError.responseText);
            }
        },

        onAddEtiquetaControl: function (oEvent) {
            try {
                if (!this.oAddControlTickets) {
                    this.oAddControlTickets = sap.ui.xmlfragment(
                        "frgAdicNewMdPasos",
                        rootPath + ".view.dialog.AddControlTickets",
                        this
                    );
                    oThat.getView().addDependent(this.oAddControlTickets);
                }

                this.oAddControlTickets.open();
            } catch (oError) {
                sap.ui.core.BusyIndicator.hide();
                MessageBox.error(oError.responseText);
            }
        },

        onSaveControlTikets:async function () {
            try {
                sap.ui.core.BusyIndicator.show(0);
                var oDataListEtiquetas = oThat.getView().getModel("modelGeneral").getProperty("/ListaEtiqueta");
                let oDataEtiquetaSinEnlace = oThat.getView().getModel("modelGeneral").getProperty("/EtiquetaSinEnlaceAdd");
                let lineaActualRMD = oThat.modelGeneral.getProperty("/LineaActualMD");
                let sAleatorio = util.getRandomString();
                let uuID = util.onUUID();
                let oDataCreate = {
                    etiquetasControlId: uuID,
                    usuarioRegistro: oInfoUsuario.data.usuario,
                    activo: true,
                    orden: oDataListEtiquetas[0].orden,
                    enlace: false,
                    cantidadOrden: oDataListEtiquetas[0].cantidadOrden,
                    cantidadUnidad: oDataEtiquetaSinEnlace.cantUnidades,
                    secuencia: parseInt(oDataListEtiquetas[oDataListEtiquetas.length - 1].secuencia) + 1,
                    observacion: oDataListEtiquetas[0].observacion,
                    hu: sAleatorio,
                    fechaRegistro: new Date(),
                    tipo: oDataListEtiquetas[0].tipo,
                    ean: EanValue,
                    um: lineaActualRMD.Amein
                }

                await registroService.onSaveDataGeneral(oThat.mainModelv2, "ETIQUETAS_CONTROL", oDataCreate).then(function (oResult) {
                    sap.ui.core.BusyIndicator.hide();
                    oThat.onObtenerListEtiquetaSinEnlace(oThat.nType);
                    oThat.onCancelControlTikets();
                    MessageBox.success(formatter.onGetI18nText(oThat, "sMesaggeUpdateSuccess"));
                }).catch(function (oError) {
                    sap.ui.core.BusyIndicator.hide();
                    throw oError;
                });
            } catch (oError) {
                sap.ui.core.BusyIndicator.hide();
                MessageBox.error(oError.responseText);
            }
        },

        onCancelControlTikets: function () {
            this.oAddControlTickets.close();
        },

        getTimeActivitiesAuto: async function (lineaSeleccionada) {
            let oDataSeleccionada = oThat.getOwnerComponent().getModel("asociarDatos");
            let oPasosProceso = oThat.getView().getModel("aListProcessAssignResponsive").getData();
            let fraccionActual = oDataSeleccionada.getData().aEstructura.results[0].fraccion;
            let aFiltersPaso = [];
            aFiltersPaso.push(new Filter("clvModelo", "EQ", lineaSeleccionada.pasoIdFin.clvModelo));
            aFiltersPaso.push(new Filter("puestoTrabajo", "EQ", lineaSeleccionada.pasoIdFin.puestoTrabajo));
            aFiltersPaso.push(new Filter("fraccion", "EQ", fraccionActual));
            aFiltersPaso.push(new Filter("rmdId_rmdId", "EQ", oDataSeleccionada.getData().rmdId));
            let aPasosSelected = await registroService.onGetDataGeneralFilters(oThat.mainModelv2, "RMD_ES_PASO", aFiltersPaso);
            aPasosSelected.results.sort(function (a, b) {
                return a.orden - b.orden;
            });
            let pasoInicioSetUp = oPasosProceso.find(oPaso=>oPaso.rmdEstructuraPasoId === aPasosSelected.results[0].rmdEstructuraPasoId);
            let pasoFinSetUp = oPasosProceso.find(oPaso=>oPaso.rmdEstructuraPasoId === aPasosSelected.results[1].rmdEstructuraPasoId);
            let aListPasosInterval = oPasosProceso.filter(oPasos=>oPasos.contador > pasoInicioSetUp.contador && oPasos.contador < pasoFinSetUp.contador);
            let iNumberUsers = formatter.numberUserInterval(aListPasosInterval);
            await oThat.getLapsosRMD();
            let arrListLapsos = this.getView().getModel("modelGeneral").getProperty("/tblListLapso");
            let fInicio = new Date(lineaSeleccionada.fechaInicio).getTime();
            let fFin = new Date(lineaSeleccionada.fechaFin).getTime();
            let arrActivities = [];
            let flagError = true;
            let aListaLapsos = 0;
            arrListLapsos.map(item => {
                //validamos que el item no tenga tipoDato sIdNotificacion y que tenga una fechaFin
                if(item.tipoDatoId != sIdNotificacion){
                    const {fechaInicio,fechaFin} = item;
                    let _fInicio =  new Date(fechaInicio).getTime();
                    if (fInicio <= _fInicio){
                        if(!fechaFin){
                            flagError = false;
                        } else {
                            let _fFin = new Date(fechaFin).getTime();
                            //validamos que la fechas del items este dentro de la fecha de inicio y fin del lapso
                            if (fFin >= _fFin && fInicio <= _fInicio) {
                                let x = new Date(_fInicio);
                                let y = new Date(_fFin);
    
                                let diff = y.getTime() - x.getTime();
                                aListaLapsos = aListaLapsos + diff;
                            }
                        }
                    }
                }
            });
            if (!flagError) {
                MessageBox.warning("Debe finalizar los lapsos para poder notificar.");
                return false;
            } else {
                let hours;
                let timeBetwenTotalProceso = fFin - fInicio;
                let timeMandarSap = timeBetwenTotalProceso - aListaLapsos;
                hours = ((timeMandarSap / 60000) / 60).toFixed(3);
                let obj ={
                    hours:(parseFloat(hours) * iNumberUsers).toFixed(3),
                    descripcion:"Activity 1",
                    unidad:"HRA"
                }
                arrActivities.push(obj);
                return arrActivities;
            }
        },

        onChangeSwitch: function (oEvent) {
            oThat.modelGeneral.setProperty("/bFlagNotifFinal", oEvent.getSource().getValue());
        },

        onRefrescarCC: async function (oEvent) {
            BusyIndicator.show(0);
            let oModel = oEvent.getSource().getParent().getParent().getParent().mBindingInfos.items.model;
            let aListPasosProceso = oThat.getView().getModel("aListProcessAssignResponsive");
            let aListaRmdItem = oEvent.getSource().getBindingContext(oModel).getObject();
            let oDataSeleccionada = oThat.getOwnerComponent().getModel("asociarDatos");
            let fraccionActual = oDataSeleccionada.getData().aEstructura.results[0].fraccion;
            let cantidad = 0;
            let aFilterLapso = [];
                aFilterLapso.push(new Filter("rmdId_rmdId", "EQ", oDataSeleccionada.getData().rmdId));
                aFilterLapso.push(new Filter("automatico", "EQ", false));
                aFilterLapso.push(new Filter("fraccion", "EQ", fraccionActual));
            let aLapsoManualResponse = await registroService.onGetDataGeneralFilters(oThat.mainModelv2, "RMD_LAPSO", aFilterLapso);
            if (aListaRmdItem.tipoDatoId_iMaestraId === iIdMuestraCC) {
                let aFilter = [];
                aFilter.push(new Filter("activo", "EQ", true));
                aFilter.push(new Filter("rmdId_rmdId", "EQ", oDataSeleccionada.getData().rmdId));
                aFilter.push(new Filter("fraccion", "EQ", fraccionActual));
                aFilter.push(new Filter("cantRechazo", "NE", "0"));
                aFilter.push(new Filter("motivoDesv", "NE", "Merma Propia del Proceso"));
                if (aLapsoManualResponse.results.length > 1) {
                    let pasosSelected = [];
                    aLapsoManualResponse.results.forEach(function(oLapso){
                        pasosSelected.push(aListPasosProceso.getData().find(itm=>itm.mdEstructuraPasoIdDepende === oLapso.pasoIdFin_mdEstructuraPasoId));
                    });
                    pasosSelected.sort(function (a, b) {
                        return b.contador - a.contador;
                    });
                    aFilter.push(new Filter("clvModelo", "EQ", pasosSelected[0].clvModelo));
                    aFilter.push(new Filter("puestoTrabajo", "EQ", pasosSelected[0].puestoTrabajo));   
                }
                let aListNotificaciones = await registroService.onGetDataGeneralFilters(oThat.mainModelv2, "RMD_TABLA_CONTROL", aFilter);
                aListNotificaciones.results = aListNotificaciones.results.filter(itm=>itm.rol === "RMD_CONTROL_PROCESO" || itm.rol === "RMD_CONTROL_CALIDAD");
                aListNotificaciones.results.forEach(function(oNotif){
                    cantidad = cantidad + parseFloat(oNotif.cantRechazo);
                });
            } else if (aListaRmdItem.tipoDatoId_iMaestraId === iIdEntrega) {
                let aFilter = [];
                    aFilter.push(new Filter("activo", "EQ", true));
                    aFilter.push(new Filter("rmdId_rmdId", "EQ", oDataSeleccionada.getData().rmdId));
                    aFilter.push(new Filter("fraccion", "EQ", fraccionActual));
                    aFilter.push(new Filter("cantBuena", "NE", "0"));
                if (aLapsoManualResponse.results.length > 1) {
                    let pasosSelected = [];
                    aLapsoManualResponse.results.forEach(function(oLapso){
                        pasosSelected.push(aListPasosProceso.getData().find(itm=>itm.mdEstructuraPasoIdDepende === oLapso.pasoIdFin_mdEstructuraPasoId));
                    });
                    pasosSelected.sort(function (a, b) {
                        return b.contador - a.contador;
                    });
                    aFilter.push(new Filter("clvModelo", "EQ", pasosSelected[0].clvModelo));
                    aFilter.push(new Filter("puestoTrabajo", "EQ", pasosSelected[0].puestoTrabajo));
                }
                let aListNotificaciones = await registroService.onGetDataGeneralFilters(oThat.mainModelv2, "RMD_TABLA_CONTROL", aFilter);
                aListNotificaciones.results.forEach(function(oNotif){
                    cantidad = cantidad + parseFloat(oNotif.cantBuena);
                });
            }
            let oObj = {
                cantidad: cantidad
            }
            await registroService.onUpdateDataGeneral(oThat.mainModelv2, "RMD_ES_PASO", oObj, aListaRmdItem.rmdEstructuraPasoId);
            await sap.ui.controller("mif.rmd.registro.controller.MainView").getEstructurasRmdRefactory(fraccionActual);
            await oThat.onChangeEstructura();
            BusyIndicator.hide();
        },

        onUpdateEnsayoSap: async function () {
            let oDataSeleccionada = oThat.getOwnerComponent().getModel("asociarDatos");
            let fraccionActual = oDataSeleccionada.getData().aEstructura.results[0].fraccion;
            let oObtenerData = await oThat.onGetEnsayoSAP();
            let aResponseEnsayoSAP = [];
            if (oObtenerData !== '') {
                aResponseEnsayoSAP = oObtenerData.results;
            }
            let aFilterBTP = [];
            aFilterBTP.push(new Filter("rmdId_rmdId", "EQ", oDataSeleccionada.getData().rmdId));
            aFilterBTP.push(new Filter("activo", "EQ", true));
            aFilterBTP.push(new Filter("fraccion", "EQ", fraccionActual));
            aFilterBTP.push(new Filter("ensayoPadreSAP", "NE", null));
            let aResponseEnsayoSAPBTP = await registroService.onGetDataGeneralFilters(oThat.mainModelv2, "RMD_ES_ESPECIFICACION", aFilterBTP);

            for await (const oEnsayoSAPBTP of aResponseEnsayoSAPBTP.results) {
                let oEnsayoSAPMatch = aResponseEnsayoSAP.find(oEsy=>oEsy.Inspchar === oEnsayoSAPBTP.Merknr);
                if (oEnsayoSAPMatch) {
                    if (oEnsayoSAPMatch.Kurztext !== ''){
                        let date = oEnsayoSAPMatch.StartDate.getUTCDate();
                        let month = oEnsayoSAPMatch.StartDate.getUTCMonth() + 1;
                        let year = oEnsayoSAPMatch.StartDate.getUTCFullYear();
                        let oObj = {
                            fechaActualiza: new Date(year + "/" + month + "/" +  date),
                            resultados: oEnsayoSAPMatch.Kurztext.split(" ").join(""),
                            usuarioActualiza: oEnsayoSAPMatch.Inspector,
                            styleUser: formatter.selectedColor("USUARIOSAP")
                        }
                        if (!oEnsayoSAPBTP.firstFechaActualiza) {
                            oObj.firstFechaActualiza = new Date(year + "/" + month + "/" +  date);
                        }
                        // console.log(oEnsayoSAPBTP.ensayoHijo, oObj);
                        await registroService.onUpdateDataGeneral(oThat.mainModelv2, "RMD_ES_ESPECIFICACION", oObj, oEnsayoSAPBTP.rmdEstructuraEspecificacionId);

                        let aFiterAdmin = [];
                        aFiterAdmin.push(new Filter("loginSap", "EQ", oEnsayoSAPMatch.Inspector));
                        aFiterAdmin.push(new Filter("activo", "EQ", true));
                        let aUserAdminResponse = await registroService.onGetDataGeneralFilters(oThat.mainModelv2, "USUARIO", aFiterAdmin);
                        let aLapsoSelected = [];
                        let oUser = {};
                        if (aUserAdminResponse.results.length > 0) {
                            var oFilter = [];
                            oFilter.push(new Filter("oUsuario_usuarioId", 'EQ', aUserAdminResponse.results[0].usuarioId));
                            let sExpand = "oRol($select=rolId,codigo,nombre,descripcion)";
                            oUser.results = [];
                            oUser.results = await registroService.getDataExpand(oThat.mainModelv2, "/UsuarioRol", sExpand, oFilter);
                            let aFilter = [];
                            aFilter.push(new Filter("usuarioId_usuarioId", "EQ", aUserAdminResponse.results[0].usuarioId));
                            aFilter.push(new Filter("fraccion", "EQ", fraccionActual));
                            aFilter.push(new Filter("rmdId_rmdId", "EQ", oDataSeleccionada.getData().rmdId));
                            aLapsoSelected = await registroService.onGetDataGeneralFilters(oThat.mainModelv2, "RMD_VERIFICACION_FIRMAS", aFilter);
                        } else {
                            oUser = {
                                results: []
                            }
                            let aFilter = [];
                            aFilter.push(new Filter("usuarioSap", "EQ", oEnsayoSAPMatch.Inspector));
                            aFilter.push(new Filter("fraccion", "EQ", fraccionActual));
                            aFilter.push(new Filter("rmdId_rmdId", "EQ", oDataSeleccionada.getData().rmdId));
                            aLapsoSelected = await registroService.onGetDataGeneralFilters(oThat.mainModelv2, "RMD_VERIFICACION_FIRMAS", aFilter);
                        }
                        if (aLapsoSelected.results.length === 0) {
                            var oDataFirmaVerif = {}
                            oDataFirmaVerif.rmdId           = oDataSeleccionada.getData().rmdId;
                            oDataFirmaVerif.fraccionActual  = fraccionActual;
                            oDataFirmaVerif.usuarioSap = oEnsayoSAPMatch.Inspector;
                            await oThat.onRMD_VERIFICACION_FIRMAS(oDataFirmaVerif, "ENSAYO", aUserAdminResponse.results.length > 0 ? aUserAdminResponse.results[0] : [], oUser.results.length > 0 ? oUser.results[0] : []);
                        }
                    }
                }
            }
        },

        onGetEnsayoSAP: function () {
            try {
                let oDataSeleccionada = oThat.getOwnerComponent().getModel("asociarDatos");
                let aFilterSAP = [];
                aFilterSAP.push(new Filter("Aufnr", "EQ", oDataSeleccionada.getData().ordenSAP));
                return new Promise ((resolve, reject) => {
                    registroService.onGetDataGeneralFilters(oThat.modelNecesidad, "EnsayoSet", aFilterSAP).then(function(payload){
                        resolve(payload);
                    }).catch(function(err){
                        resolve("");
                    })
                });
            } catch (oError) {
                MessageBox.error(oError.responseText);
            }
        },
        
        onSelectObjetoEquipo: async function (oEvent) {
            let oCont = oEvent.getSource().mAggregations.items.find(itm=>itm.mProperties.key === oEvent.getSource().getSelectedKey());
            if (oEvent.getSource().getSelectedKey()) {
                let oContext = oCont.getBindingContext("modelGeneral").getObject();
                oThat.modelGeneral.setProperty("/oObjObjetoEquipo", oContext);
            } else {
                oThat.modelGeneral.setProperty("/oObjObjetoEquipo", {});
            }
            await oThat.onCheckMotivos();
        },

        onSelectSintomaEquipo: async function (oEvent) {
            let oCont = oEvent.getSource().mAggregations.items.find(itm=>itm.mProperties.key === oEvent.getSource().getSelectedKey());
            if (oEvent.getSource().getSelectedKey()) {
                let oContext = oCont.getBindingContext("modelGeneral").getObject();
                oThat.modelGeneral.setProperty("/oObjSintomaEquipo", oContext);
            } else {
                oThat.modelGeneral.setProperty("/oObjSintomaEquipo", {});
            }
            await oThat.onCheckMotivos();
        },

        onSelectCausaEquipo: async function (oEvent) {
            let oCont = oEvent.getSource().mAggregations.items.find(itm=>itm.mProperties.key === oEvent.getSource().getSelectedKey());
            if (oEvent.getSource().getSelectedKey()) {
                let oContext = oCont.getBindingContext("modelGeneral").getObject();
                oThat.modelGeneral.setProperty("/oObjCausaEquipo", oContext);
            } else {
                oThat.modelGeneral.setProperty("/oObjCausaEquipo", {});
            }
            await oThat.onCheckMotivos();
        },

        onSelectObjetoEquipoEdit: async function (oEvent) {
            let oCont = oEvent.getSource().mAggregations.items.find(itm=>itm.mProperties.key === oEvent.getSource().getSelectedKey());
            if (oEvent.getSource().getSelectedKey()) {
                let oContext = oCont.getBindingContext("modelGeneral").getObject();
                oThat.modelGeneral.setProperty("/oObjObjetoEquipo", oContext);
            } else {
                oThat.modelGeneral.setProperty("/oObjObjetoEquipo", {});
            }
            await oThat.onCheckMotivosEdit();
        },

        onSelectSintomaEquipoEdit: async function (oEvent) {
            let oCont = oEvent.getSource().mAggregations.items.find(itm=>itm.mProperties.key === oEvent.getSource().getSelectedKey())
            if (oEvent.getSource().getSelectedKey()) {
                let oContext = JSON.stringify(oCont.getBindingContext("modelGeneral").getObject());
                oContext = JSON.parse(oContext);
                oThat.modelGeneral.setProperty("/oObjSintomaEquipo", oContext);
            } else {
                oThat.modelGeneral.setProperty("/oObjSintomaEquipo", {});
            }
            await oThat.onCheckMotivosEdit();
        },

        onSelectCausaEquipoEdit: async function (oEvent) {
            let oCont = oEvent.getSource().mAggregations.items.find(itm=>itm.mProperties.key === oEvent.getSource().getSelectedKey())
            if (oEvent.getSource().getSelectedKey()) {
                let oContext = oCont.getBindingContext("modelGeneral").getObject();
                oThat.modelGeneral.setProperty("/oObjCausaEquipo", oContext);
            } else {
                oThat.modelGeneral.setProperty("/oObjCausaEquipo", {});
            }
            await oThat.onCheckMotivosEdit();
        },

        onSaveCatalogoBTP: async function (rmdLapsoId) {
            let oDataSeleccionada = oThat.getOwnerComponent().getModel("asociarDatos");
            let fraccionActual = oDataSeleccionada.getData().aEstructura.results[0].fraccion;
            let oObjObjetoEquipo = oThat.modelGeneral.getProperty("/oObjObjetoEquipo");
            let oObjSintomaEquipo = oThat.modelGeneral.getProperty("/oObjSintomaEquipo");
            let oObjCausaEquipo = oThat.modelGeneral.getProperty("/oObjCausaEquipo");
            if (oObjObjetoEquipo.Equnr) {
                let oParam = {
                    usuarioRegistro: oInfoUsuario.data.usuario,
                    fechaRegistro: new Date(),
                    activo: true,
                    rmdLapsoCatalogoFalla: util.onGetUUIDV4(),
                    rmdId_rmdId: oDataSeleccionada.getData().rmdId,
                    fraccion: fraccionActual,
                    rmdLapsoId_rmdLapsoId: rmdLapsoId,
                    tipo: "OBJETO",
                    Qmnum: oObjObjetoEquipo.Qmnum,
                    Qmart: oObjObjetoEquipo.Qmart,
                    Equnr: oObjObjetoEquipo.Equnr,
                    CatType: oObjObjetoEquipo.CatTyp,
                    CodeGroup: oObjObjetoEquipo.CodeGroup,
                    Code: oObjObjetoEquipo.Code,
                    Version: oObjObjetoEquipo.Version,
                    Valid: oObjObjetoEquipo.Valid,
                    Langu: oObjObjetoEquipo.Langu,
                    Shorttxtgr: oObjObjetoEquipo.Shorttxtgr,
                    Shorttxtcd: oObjObjetoEquipo.Shorttxtcd,
                    Texto: oObjObjetoEquipo.Texto
                }
                await registroService.onSaveDataGeneral(oThat.mainModelv2, "RMD_LAPSO_CATALOGO_FALLA", oParam);
            }
            if (oObjSintomaEquipo.Equnr) {
                let oParam = {
                    usuarioRegistro: oInfoUsuario.data.usuario,
                    fechaRegistro: new Date(),
                    activo: true,
                    rmdLapsoCatalogoFalla: util.onGetUUIDV4(),
                    rmdId_rmdId: oDataSeleccionada.getData().rmdId,
                    fraccion: fraccionActual,
                    rmdLapsoId_rmdLapsoId: rmdLapsoId,
                    tipo: "SINTOMA",
                    Qmnum: oObjSintomaEquipo.Qmnum,
                    Qmart: oObjSintomaEquipo.Qmart,
                    Equnr: oObjSintomaEquipo.Equnr,
                    CatType: oObjSintomaEquipo.CatTyp,
                    CodeGroup: oObjSintomaEquipo.CodeGroup,
                    Code: oObjSintomaEquipo.Code,
                    Version: oObjSintomaEquipo.Version,
                    Valid: oObjSintomaEquipo.Valid,
                    Langu: oObjSintomaEquipo.Langu,
                    Shorttxtgr: oObjSintomaEquipo.Shorttxtgr,
                    Shorttxtcd: oObjSintomaEquipo.Shorttxtcd,
                    Texto: oObjSintomaEquipo.Texto
                }
                await registroService.onSaveDataGeneral(oThat.mainModelv2, "RMD_LAPSO_CATALOGO_FALLA", oParam);
            }
            if (oObjCausaEquipo.Equnr) {
                let oParam = {
                    usuarioRegistro: oInfoUsuario.data.usuario,
                    fechaRegistro: new Date(),
                    activo: true,
                    rmdLapsoCatalogoFalla: util.onGetUUIDV4(),
                    rmdId_rmdId: oDataSeleccionada.getData().rmdId,
                    fraccion: fraccionActual,
                    rmdLapsoId_rmdLapsoId: rmdLapsoId,
                    tipo: "CAUSA",
                    Qmnum: oObjCausaEquipo.Qmnum,
                    Qmart: oObjCausaEquipo.Qmart,
                    Equnr: oObjCausaEquipo.Equnr,
                    CatType: oObjCausaEquipo.CatTyp,
                    CodeGroup: oObjCausaEquipo.CodeGroup,
                    Code: oObjCausaEquipo.Code,
                    Version: oObjCausaEquipo.Version,
                    Valid: oObjCausaEquipo.Valid,
                    Langu: oObjCausaEquipo.Langu,
                    Shorttxtgr: oObjCausaEquipo.Shorttxtgr,
                    Shorttxtcd: oObjCausaEquipo.Shorttxtcd,
                    Texto: oObjCausaEquipo.Texto
                }
                await registroService.onSaveDataGeneral(oThat.mainModelv2, "RMD_LAPSO_CATALOGO_FALLA", oParam);
            }
        },

        onSendMail: async function (oDataRMD, sEquipo) {
            BusyIndicator.show(0);
            let oDataSeleccionada = oThat.getOwnerComponent().getModel("asociarDatos");
            // let areaRMD = oDataSeleccionada.getData().areaRmdTxt;
            // let sExpandJefe = "oUsuario";
            // let aFilterJefes = [];
            // aFilterJefes.push(new Filter("oRol_rolId", "EQ", idRolJefeProduccion));
            // let  aUsuariosJefe = await registroService.onGetDataGeneralFiltersExpand(oThat.mainModelv2, "UsuarioRol", aFilterJefes, sExpandJefe);
            let sExpand="usuarioId";
            let aFilter = [];
            aFilter.push(new Filter("rol", "EQ", "JEFE_PROD"));
            aFilter.push(new Filter("rmdId_rmdId", "EQ", oDataRMD.rmdId));
            let aUsuariosResponse = await registroService.onGetDataGeneralFiltersExpand(oThat.mainModelv2, "RMD_USUARIO", aFilter, sExpand);
            let oBody = {
                subject: "AVISO MANTENIMIENTO POR FALLA DE MAQUINA - LOTE [ " + oDataSeleccionada.getData().lote  + " ] - ORDEN [" + oDataSeleccionada.getData().ordenSAP + "]",
                text: "Sres. Jefes de Producci??n,\nSe cre?? un lapso por falla de m??quina para el equipo:\n"+ "[" + sEquipo.additionalText + "] " + sEquipo.value +"\nLote: "+ oDataSeleccionada.getData().lote + "\nOrden: "+ oDataSeleccionada.getData().ordenSAP + "\nProducto: ["+ oDataSeleccionada.getData().productoId + "] " + oDataSeleccionada.getData().descripcion + "\nEtapa: "+ oDataSeleccionada.getData().etapa + "\nFavor revisar,\nSaludos cordiales.",
                destinatarios: []
            }
            // aUsuariosJefe.results.forEach(function(oUsuarioRol){
            //     if (oUsuarioRol.oUsuario.seccionTxt  === areaRMD) {
            //         oBody.destinatarios.push(oUsuarioRol.oUsuario.correo);
            //     }
            // });
            aUsuariosResponse.results.forEach(function(oUsuario){
                oBody.destinatarios.push(oUsuario.usuarioId.correo);
            });
            return new Promise(function (resolve, reject) {
                $.ajax({
                    type: "POST",
                    xhrFields: {
                        responseType: 'blob'
                    },
                    url: "/srv_api/api/v1/rmd/sendMail",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    data: JSON.stringify(oBody),
                    success: function (data) {
                        BusyIndicator.hide();
                        resolve(data);
                    },
                    error: function (xhr, status, error) {
                        BusyIndicator.hide();
                        reject(error);
                    }
                });
            });
        },

        onEditLapsoCatalogo: async function  (oEvent) {
            BusyIndicator.show(0);
            let oContext = oEvent.getSource().getBindingContext("modelGeneral").getObject();
            if(!oThat.onLapsoCatalogo){
                oThat.onLapsoCatalogo = sap.ui.xmlfragment(
                    "frgListImagen",
                    rootPath + ".view.dialog.EditLapsoCatalogo",
                    oThat
                );
                oThat.getView().addDependent(oThat.onLapsoCatalogo);
            }
            await oThat.getMotivosLapso();
            await oThat.onEquipoDialog();
            await oThat.onGetCatalogoMant(oContext.equipoId.equnr);
            let oObjObjetoEquipo = oContext.aListCatalogFalla.results.find(itm=>itm.CatType === "B");
            oThat.modelGeneral.setProperty("/oObjObjetoEquipo", oObjObjetoEquipo ? oObjObjetoEquipo : {});
            let oObjSintomaEquipo = oContext.aListCatalogFalla.results.find(itm=>itm.CatType === "C");
            oThat.modelGeneral.setProperty("/oObjSintomaEquipo", oObjSintomaEquipo ? oObjSintomaEquipo : {});
            let oObjCausaEquipo = oContext.aListCatalogFalla.results.find(itm=>itm.CatType === "5");
            oThat.modelGeneral.setProperty("/oObjCausaEquipo", oObjCausaEquipo ? oObjCausaEquipo : {});
            oThat.modelGeneral.setProperty("/objEdit", oContext);          
            oThat.onLapsoCatalogo.open();
            BusyIndicator.hide();
        },

        onCancelLapsoEdit: function () {
            oThat.modelGeneral.setProperty("/aObjetosEquipo", []);
            oThat.modelGeneral.setProperty("/aSintomasEquipo", []);
            oThat.modelGeneral.setProperty("/aCausasEquipo", []);
            oThat.modelGeneral.setProperty("/oObjObjetoEquipo", {});
            oThat.modelGeneral.setProperty("/oObjSintomaEquipo", {});
            oThat.modelGeneral.setProperty("/oObjCausaEquipo", {});
            oThat.onLapsoCatalogo.close();
        },

        onGetCatalogoMant: async function (equipoId) {
            //OBTENEMOS OBJETOS DEL EQUIPO
            // let aFilterObj = [];
            // aFilterObj.push(new Filter("Equnr", "EQ", equipoId));
            // aFilterObj.push(new Filter("Qmart", "EQ", "A2"));
            // aFilterObj.push(new Filter("CatTyp", "EQ", "B"));
            // let aObjetoResponse = await registroService.onGetDataGeneralFilters(oThat.modelNecesidad, "CatalogoSet", aFilterObj);
            oThat.modelGeneral.setProperty("/aObjetosEquipo", []);
            //OBTENEMOS SINTOMAS DEL EQUIPO
            let aFilterSint = [];
            aFilterSint.push(new Filter("Equnr", "EQ", equipoId));
            aFilterSint.push(new Filter("Qmart", "EQ", "A2"));
            aFilterSint.push(new Filter("CatTyp", "EQ", "C"));
            let aSintomaResponse = await registroService.onGetDataGeneralFilters(oThat.modelNecesidad, "CatalogoSet", aFilterSint);
            oThat.modelGeneral.setProperty("/aSintomasEquipo", aSintomaResponse.results);
            //OBTENEMOS CAUSAS DEL EQUIPO
            // let aFilterCau = [];
            // aFilterCau.push(new Filter("Equnr", "EQ", equipoId));
            // aFilterCau.push(new Filter("Qmart", "EQ", "A2"));
            // aFilterCau.push(new Filter("CatTyp", "EQ", "5"));
            // let aCausasResponse = await registroService.onGetDataGeneralFilters(oThat.modelNecesidad, "CatalogoSet", aFilterCau);
            oThat.modelGeneral.setProperty("/aCausasEquipo", []);
        },

        onSaveAvisoMant: async function (oEvent) {
            let oContext = oEvent.getSource().getBindingContext("modelGeneral").getObject();
            // let lineaSeleccionada = oThat.modelGeneral.getProperty("/equipoSelected");
            let sText = oContext.equipoId.eqktx;
            if (sText.length > 40) {
                sText = sText.substring(0, 40);
            }
            let equipoSelected = oContext.equipoId.equnr;
            MessageBox.confirm("??Desea enviar aviso a mantenimiento?", {
                actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
                emphasizedAction: MessageBox.Action.OK,
                onClose:async function (sAction) {
                    if (sAction === "OK") {
                        BusyIndicator.show(0);
                        let oParam = {
                            Qmnum : "",
                            Qmart : "A2",
                            Equnr : equipoSelected,
                            Qmtxt : sText,
                            Priok : "C",
                            Qmnam : oInfoUsuario.data.usuario,
                            Planplant : "",
                            LocAcc : "",
                            Priotype : "",
                            ObjectNo : "",
                            Prilang : "",
                            CatType : "",
                            Maintplant : "",
                            CoArea : "",
                            CompCode : "",
                            Texto: oContext.comentario,
                            //AvisoMensajeSet: [],
                            Catalogoset: [],
                            //OFFLINE
                            Sincronizado:"0",
                            Keyaviso : oContext.rmdLapsoId
                        }
                        let oObjObjetoEquipo = oContext.aListCatalogFalla.results.find(itm=>itm.CatType === "B");
                        if (oObjObjetoEquipo) {
                            oParam.Catalogoset.push({
                                Qmnum: oObjObjetoEquipo.Qmnum,
                                Qmart: oObjObjetoEquipo.Qmart,
                                Equnr: oObjObjetoEquipo.Equnr,
                                CatTyp: oObjObjetoEquipo.CatType,
                                CodeGroup: oObjObjetoEquipo.CodeGroup,
                                Code: oObjObjetoEquipo.Code,
                                Version: oObjObjetoEquipo.Version,
                                Valid: oObjObjetoEquipo.Valid,
                                Langu: oObjObjetoEquipo.Langu,
                                Shorttxtgr: oObjObjetoEquipo.Shorttxtgr,
                                Shorttxtcd: oObjObjetoEquipo.Shorttxtcd,
                                Texto: oObjObjetoEquipo.Texto
                            });
                        }
                        let oObjSintomaEquipo = oContext.aListCatalogFalla.results.find(itm=>itm.CatType === "C");
                        if (oObjSintomaEquipo) {
                            oParam.Catalogoset.push({
                                Qmnum: oObjSintomaEquipo.Qmnum,
                                Qmart: oObjSintomaEquipo.Qmart,
                                Equnr: oObjSintomaEquipo.Equnr,
                                CatTyp: oObjSintomaEquipo.CatType,
                                CodeGroup: oObjSintomaEquipo.CodeGroup,
                                Code: oObjSintomaEquipo.Code,
                                Version: oObjSintomaEquipo.Version,
                                Valid: oObjSintomaEquipo.Valid,
                                Langu: oObjSintomaEquipo.Langu,
                                Shorttxtgr: oObjSintomaEquipo.Shorttxtgr,
                                Shorttxtcd: oObjSintomaEquipo.Shorttxtcd,
                                Texto: oObjSintomaEquipo.Texto
                            });
                        }
                        let oObjCausaEquipo = oContext.aListCatalogFalla.results.find(itm=>itm.CatType === "5");
                        if (oObjCausaEquipo) {
                            oParam.Catalogoset.push({
                                Qmnum: oObjCausaEquipo.Qmnum,
                                Qmart: oObjCausaEquipo.Qmart,
                                Equnr: oObjCausaEquipo.Equnr,
                                CatTyp: oObjCausaEquipo.CatType,
                                CodeGroup: oObjCausaEquipo.CodeGroup,
                                Code: oObjCausaEquipo.Code,
                                Version: oObjCausaEquipo.Version,
                                Valid: oObjCausaEquipo.Valid,
                                Langu: oObjCausaEquipo.Langu,
                                Shorttxtgr: oObjCausaEquipo.Shorttxtgr,
                                Shorttxtcd: oObjCausaEquipo.Shorttxtcd,
                                Texto: oObjCausaEquipo.Texto
                            });
                        }
                       /*  oParam.AvisoMensajeSet.push({
                            Qmnum: "",
                            Type: "",
                            Id: "",
                            Number: "",
                            Message: "",
                            LogNo: "",
                            LogMsgNo: "",
                            MessageV1: "",
                            MessageV2: "",
                            MessageV3: "",
                            MessageV4: "",
                            Parameter: "",
                            Row: 0,
                            Field: "",
                            System: ""
                        }); */
                        //let oAvisoResponse = await registroService.createData(oThat.modelNecesidad, "/AvisoSet", oParam);
                        oParam.Catalogoset = "" + JSON.stringify(oParam.Catalogoset);                        
                        let oAvisoResponse = await registroService.createData(oThat.modelNecesidad, "/AvisoOfflineSet", oParam);

                        await registroService.oDataRemove(oThat.modelNecesidad, "/AvisoOfflineSet", oContext.rmdLapsoId);

                        let oObj = {
                            tipo: "Completado",
                            Qmnum: oAvisoResponse.Qmnum
                        }
                        await registroService.onUpdateDataGeneral(oThat.mainModelv2, "RMD_LAPSO", oObj, oContext.rmdLapsoId);
                        BusyIndicator.hide();
                        oThat.onCancelLapsoList();
                        MessageBox.success("La petici??n se puso en cola ");
                        //MessageBox.success("Se envi?? satisfactoriamente el aviso a mantenimiento.\n Nro. Notificaci??n: " + oAvisoResponse.Qmnum);       
                    }
                },
            });
        },

        onCheckMotivosEdit: function () {
            let oPasoSeleccionado = oThat.modelGeneral.getProperty("/objEdit");
            let objObjetosEquipo = oThat.modelGeneral.getProperty("/aObjetosEquipo");
            let objSintomasEquipo = oThat.modelGeneral.getProperty("/aSintomasEquipo");
            let objCausasEquipo = oThat.modelGeneral.getProperty("/aCausasEquipo");
            let objObjeto = oThat.modelGeneral.getProperty("/oObjObjetoEquipo");
            let objSintoma = oThat.modelGeneral.getProperty("/oObjSintomaEquipo");
            let objCausa = oThat.modelGeneral.getProperty("/oObjCausaEquipo");
            let bValue1 = true;
            let bValue2 = false;
            let bValue3 = true;
            let bValue4 = false;
            // if (objObjetosEquipo.length > 0) {
            //     if (objObjeto.Equnr) {
            //         bValue1 = true;
            //     } else {
            //         bValue1 = false;
            //     }
            // } else {
            //     bValue1 = true;
            // }
            if (objSintomasEquipo.length > 0) {
                if (objSintoma.Equnr) {
                    bValue2 = true;
                } else {
                    bValue2 = false;
                }
            } else {
                bValue2 = true;
            }
            // if (objCausasEquipo.length > 0) {
            //     if (objCausa.Equnr) {
            //         bValue3 = true;
            //     } else {
            //         bValue3 = false;
            //     }
            // } else {
            //     bValue3 = true;
            // }
            if (oPasoSeleccionado.tipoLapsoId_motivoLapsoId && oPasoSeleccionado.comentario && oPasoSeleccionado.equipoId_equipoId) {
                bValue4 = true;
            } else {
                bValue4 = false;
            }
            if (bValue1 && bValue2 && bValue3 && bValue4) {
                oThat.modelGeneral.setProperty("/addLapsoEnabledEdit",true);
            } else {
                oThat.modelGeneral.setProperty("/addLapsoEnabledEdit",false);
            }
        },

        onChangeEquipoCheckEdit: async function (oEvent) {
            let oContext = oEvent.getSource();
            let obj = {
                id: oContext.getProperty("selectedKey"),
                value: oContext.getProperty("value")
            }
            let oContAdd = oEvent.getSource().mAggregations.items.find(itm=>itm.mProperties.key === obj.id);
            if(oContAdd){
                obj.additionalText  = oContAdd.getProperty("additionalText");
            }
            oThat.modelGeneral.setProperty("/equipoSelected", obj);
            if (obj.additionalText) {
                //OBTENEMOS OBJETOS DEL EQUIPO
                // let aFilterObj = [];
                // aFilterObj.push(new Filter("Equnr", "EQ", obj.additionalText));
                // aFilterObj.push(new Filter("Qmart", "EQ", "A2"));
                // aFilterObj.push(new Filter("CatTyp", "EQ", "B"));
                // let aObjetoResponse = await registroService.onGetDataGeneralFilters(oThat.modelNecesidad, "CatalogoSet", aFilterObj);
                oThat.modelGeneral.setProperty("/aObjetosEquipo", []);
                //OBTENEMOS SINTOMAS DEL EQUIPO
                let aFilterSint = [];
                aFilterSint.push(new Filter("Equnr", "EQ", obj.additionalText));
                aFilterSint.push(new Filter("Qmart", "EQ", "A2"));
                aFilterSint.push(new Filter("CatTyp", "EQ", "C"));
                let aSintomaResponse = await registroService.onGetDataGeneralFilters(oThat.modelNecesidad, "CatalogoSet", aFilterSint);
                oThat.modelGeneral.setProperty("/aSintomasEquipo", aSintomaResponse.results);
                //OBTENEMOS CAUSAS DEL EQUIPO
                // let aFilterCau = [];
                // aFilterCau.push(new Filter("Equnr", "EQ", obj.additionalText));
                // aFilterCau.push(new Filter("Qmart", "EQ", "A2"));
                // aFilterCau.push(new Filter("CatTyp", "EQ", "5"));
                // let aCausasResponse = await registroService.onGetDataGeneralFilters(oThat.modelNecesidad, "CatalogoSet", aFilterCau);
                oThat.modelGeneral.setProperty("/aCausasEquipo", []);
            }
            await oThat.onCheckMotivosEdit();
        },

        onSaveChangesEdit: function () {
            let oDataGeneral = oThat.getOwnerComponent().getModel("asociarDatos");
            let fraccionActual = oDataGeneral.getData().aEstructura.results[0].fraccion;
            let oDataEdit = oThat.modelGeneral.getProperty("/objEdit");
            let oObjObjetoEquipo = oThat.modelGeneral.getProperty("/oObjObjetoEquipo");
            let oObjSintomaEquipo = oThat.modelGeneral.getProperty("/oObjSintomaEquipo");
            let oObjCausaEquipo = oThat.modelGeneral.getProperty("/oObjCausaEquipo");
            MessageBox.confirm(formatter.onGetI18nText(oThat, "sMesaggeSaveModifLapso"), {
                actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
                emphasizedAction: MessageBox.Action.OK,
                onClose:async function (sAction) {
                    if (sAction === "OK") {
                        BusyIndicator.show(0);
                        let oObj = {
                            comentario: oDataEdit.comentario,
                            tipoLapsoId_motivoLapsoId: oDataEdit.tipoLapsoId_motivoLapsoId,
                            equipoId_equipoId: oDataEdit.equipoId_equipoId,
                        }
                        await registroService.onUpdateDataGeneral(oThat.mainModelv2, "RMD_LAPSO", oObj, oDataEdit.rmdLapsoId);
                        if (oObjObjetoEquipo.Equnr) {
                            let oObj1 = {
                                Qmnum: oObjObjetoEquipo.Qmnum,
                                Qmart: oObjObjetoEquipo.Qmart,
                                Equnr: oObjObjetoEquipo.Equnr,
                                CatType: oObjObjetoEquipo.CatTyp,
                                CodeGroup: oObjObjetoEquipo.CodeGroup,
                                Code: oObjObjetoEquipo.Code,
                                Version: oObjObjetoEquipo.Version,
                                Valid: oObjObjetoEquipo.Valid,
                                Langu: oObjObjetoEquipo.Langu,
                                Shorttxtgr: oObjObjetoEquipo.Shorttxtgr,
                                Shorttxtcd: oObjObjetoEquipo.Shorttxtcd,
                                Texto: oObjObjetoEquipo.Texto
                            }
                            let idCatalogoFalla = oDataEdit.aListCatalogFalla.results.find(itm=>itm.CatType === oObj1.CatType);
                            if (idCatalogoFalla) {
                                await registroService.onUpdateDataGeneral(oThat.mainModelv2, "RMD_LAPSO_CATALOGO_FALLA", oObj1, idCatalogoFalla.rmdLapsoCatalogoFalla);
                            } else {
                                oObj1.usuarioRegistro = oInfoUsuario.data.usuario;
                                oObj1.fechaRegistro = new Date();
                                oObj1.activo = true;
                                oObj1.rmdId_rmdId = oDataGeneral.getData().rmdId;
                                oObj1.fraccion = fraccionActual;
                                oObj1.rmdLapsoId_rmdLapsoId = oDataEdit.rmdLapsoId;
                                oObj1.tipo = "Pendiente";
                                await registroService.onSaveDataGeneral(oThat.mainModelv2, "RMD_LAPSO_CATALOGO_FALLA", oObj1);
                            }
                        }
                        if (oObjSintomaEquipo.Equnr) {
                            let oObj2 = {
                                Qmnum: oObjSintomaEquipo.Qmnum,
                                Qmart: oObjSintomaEquipo.Qmart,
                                Equnr: oObjSintomaEquipo.Equnr,
                                CatType: oObjSintomaEquipo.CatTyp ? oObjSintomaEquipo.CatTyp : oObjSintomaEquipo.CatType,
                                CodeGroup: oObjSintomaEquipo.CodeGroup,
                                Code: oObjSintomaEquipo.Code,
                                Version: oObjSintomaEquipo.Version,
                                Valid: oObjSintomaEquipo.Valid,
                                Langu: oObjSintomaEquipo.Langu,
                                Shorttxtgr: oObjSintomaEquipo.Shorttxtgr,
                                Shorttxtcd: oObjSintomaEquipo.Shorttxtcd,
                                Texto: oObjSintomaEquipo.Texto
                            }
                            let idCatalogoFalla = oDataEdit.aListCatalogFalla.results.find(itm=>itm.CatType === oObj2.CatType);
                            if (idCatalogoFalla) {
                                await registroService.onUpdateDataGeneral(oThat.mainModelv2, "RMD_LAPSO_CATALOGO_FALLA", oObj2, idCatalogoFalla.rmdLapsoCatalogoFalla);
                            } else {
                                oObj2.usuarioRegistro = oInfoUsuario.data.usuario;
                                oObj2.fechaRegistro = new Date();
                                oObj2.activo = true;
                                oObj2.rmdLapsoCatalogoFalla = util.onGetUUIDV4();
                                oObj2.rmdId_rmdId = oDataGeneral.getData().rmdId;
                                oObj2.fraccion = fraccionActual;
                                oObj2.rmdLapsoId_rmdLapsoId = oDataEdit.rmdLapsoId;
                                oObj2.tipo = "Pendiente";
                                await registroService.onSaveDataGeneral(oThat.mainModelv2, "RMD_LAPSO_CATALOGO_FALLA", oObj2);
                            }
                            
                        }
                        if (oObjCausaEquipo.Equnr) {
                            let oObj3 = {
                                Qmnum: oObjCausaEquipo.Qmnum,
                                Qmart: oObjCausaEquipo.Qmart,
                                Equnr: oObjCausaEquipo.Equnr,
                                CatType: oObjCausaEquipo.CatTyp,
                                CodeGroup: oObjCausaEquipo.CodeGroup,
                                Code: oObjCausaEquipo.Code,
                                Version: oObjCausaEquipo.Version,
                                Valid: oObjCausaEquipo.Valid,
                                Langu: oObjCausaEquipo.Langu,
                                Shorttxtgr: oObjCausaEquipo.Shorttxtgr,
                                Shorttxtcd: oObjCausaEquipo.Shorttxtcd,
                                Texto: oObjCausaEquipo.Texto
                            }
                            let idCatalogoFalla = oDataEdit.aListCatalogFalla.results.find(itm=>itm.CatType === oObj3.CatType);
                            if (idCatalogoFalla) {
                                await registroService.onUpdateDataGeneral(oThat.mainModelv2, "RMD_LAPSO_CATALOGO_FALLA", oObj3, idCatalogoFalla.rmdLapsoCatalogoFalla);
                            } else {
                                oObj3.usuarioRegistro = oInfoUsuario.data.usuario;
                                oObj3.fechaRegistro = new Date();
                                oObj3.activo = true;
                                oObj3.rmdId_rmdId = oDataGeneral.getData().rmdId;
                                oObj3.fraccion = fraccionActual;
                                oObj3.rmdLapsoId_rmdLapsoId = oDataEdit.rmdLapsoId;
                                oObj3.tipo = "Pendiente";
                                await registroService.onSaveDataGeneral(oThat.mainModelv2, "RMD_LAPSO_CATALOGO_FALLA", oObj3);
                            }  
                        }
                        oThat.onCancelLapsoEdit();
                        oThat.onCancelLapsoList();
                        BusyIndicator.hide();
                        MessageBox.success(formatter.onGetI18nText(oThat, "sMessageSuccessEdit"));
                    }
                },
            });
        },

        onDeleteFraccion: async function (iFraccion) {
            let oDataSeleccionada = oThat.getOwnerComponent().getModel("asociarDatos");
            let oData = {
                usuarioActualiza: oInfoUsuario.data.usuario,
                fechaActualiza: new Date(),
                sTipo: "ELIMINAR",
                rmdId_rmdId: oDataSeleccionada.getData().rmdId,
                fraccion: iFraccion
            }
            //OFFLINE CAMBIO
            //oData = JSON.stringify(oData);
            //await registroService.onGetFunction(oThat.mainModelv2, "onUpdateFraction", oData);
            await oThat.onGetFunctionOffline(oData);
            let aListFractionUpdate = [];
            for (let i = iFraccion + 1; i <= oDataSeleccionada.getData().fraccion; i ++) {
                aListFractionUpdate.push(i);
            }
            for await (const iCont of aListFractionUpdate) {
                let oDataUpd = {
                    usuarioActualiza: oInfoUsuario.data.usuario,
                    fechaActualiza: new Date(),
                    sTipo: "ACTUALIZAR",
                    rmdId_rmdId: oDataSeleccionada.getData().rmdId,
                    fraccion: iCont
                }
                //oDataUpd = JSON.stringify(oDataUpd);
                //await registroService.onGetFunction(oThat.mainModelv2, "onUpdateFraction", oDataUpd);
                await oThat.onGetFunctionOffline(oDataUpd);
            }
            let oFilterRmd = [];
            oFilterRmd.push(new Filter("rmdId", FilterOperator.EQ, oDataSeleccionada.getData().rmdId));
            let aListRMD = await registroService.getDataFilter(oThat.mainModelv2, "/RMD", oFilterRmd);
            let sUltimaFraccion = aListRMD.results[0].fraccion;
            let oObj = {
                fraccion : sUltimaFraccion - 1 
            }
            await registroService.onUpdateDataGeneral(oThat.mainModelv2, "RMD", oObj, oDataSeleccionada.getData().rmdId);
        },
        //OFFLINE

        onEquipoAfectado:async function(){
            let aListaEquiposAfectados = oThat.modelGeneral.getProperty("/aListaEquiposAfectados");
            let selectMotivo = oThat.modelGeneral.getProperty("/selectMotivo");
            let oDataSeleccionada = oThat.getOwnerComponent().getModel("asociarDatos");
            let fraccionActual = oDataSeleccionada.getData().aEstructura.results[0].fraccion;
            let sTextoComentario = oThat.modelGeneral.getProperty("/ComentarioLapso");
            let lineaSeleccionada = oThat.modelGeneral.getProperty("/equipoSelected");
            let equipoIdSelected = lineaSeleccionada.id;

            if(aListaEquiposAfectados.length > 0) {
                for await (const oEquipo of aListaEquiposAfectados){
                    let sobject = {
                        usuarioRegistro: oInfoUsuario.data.usuario,
                        fechaRegistro: new Date(),
                        activo: true,
                        equipoId_equipoId: oEquipo,
                        tipoLapsoId_motivoLapsoId: selectMotivo.codigo,
                        rmdId_rmdId: oDataSeleccionada.getData().rmdId,
                        rmdLapsoId: util.onGetUUIDV4(),
                        comentario: sTextoComentario,
                        Anular: false,
                        fechaInicio: new Date(),
                        fraccion: fraccionActual,
                        tipo: "Afectado",
                        equipoPrincipal: equipoIdSelected,
                        bAfectado: true
                    }
                    await registroService.createData(oThat.mainModelv2, "/RMD_LAPSO", sobject);
                }
            }
        },

        //Funcion para eliminar Fraccion
        onGetFunctionOffline: async function(oData){
            let oSet;
            if(oData.sTipo === "ELIMINAR") {
                oSet = {  
                    activo: false,
                    fraccion: oData.fraccion,
                    fechaActualiza: oData.fechaActualiza,
                    usuarioActualiza: oData.usuarioActualiza
                }
            } else if (oData.sTipo === "ACTUALIZAR") {
                oSet = {
                    fraccion: oData.fraccion - 1,
                    fechaActualiza: oData.fechaActualiza,
                    usuarioActualiza: oData.usuarioActualiza
                }
            }
            var aFilters = [];
            aFilters.push(new Filter("rmdId_rmdId", "EQ", oData.rmdId_rmdId));
            aFilters.push(new Filter("fraccion", "EQ", oSet.fraccion));
            aFilters.push(new Filter("activo", "EQ", true));

            var aUsuarios = await registroService.getDataFilter(oThat.mainModelv2,"/RMD_USUARIO", aFilters);
            var aEstructuras = await registroService.getDataFilter(oThat.mainModelv2,"/RMD_ESTRUCTURA", aFilters);
            var aEtiquetas = await registroService.getDataFilter(oThat.mainModelv2,"/RMD_ES_ETIQUETA", aFilters); 
            var aPasos = await registroService.getDataFilter(oThat.mainModelv2,"/RMD_ES_PASO", aFilters); 
            var aPasoInsumos = await registroService.getDataFilter(oThat.mainModelv2,"/RMD_ES_PASO_INSUMO_PASO", aFilters);
            var aRecetas = await registroService.getDataFilter(oThat.mainModelv2,"/RMD_RECETA", aFilters);
            var aInsumos = await registroService.getDataFilter(oThat.mainModelv2,"/RMD_ES_RE_INSUMO", aFilters); 
            var aEspecificaciones = await registroService.getDataFilter(oThat.mainModelv2,"/RMD_ES_ESPECIFICACION", aFilters); 
            var aUtensilios = await registroService.getDataFilter(oThat.mainModelv2,"/RMD_ES_UTENSILIO", aFilters); 
            var aEquipos = await registroService.getDataFilter(oThat.mainModelv2,"/RMD_ES_EQUIPO", aFilters); 
            var aTablaControles = await registroService.getDataFilter(oThat.mainModelv2,"/RMD_TABLA_CONTROL", aFilters);
            var aVerificacionesFirmas = await registroService.getDataFilter(oThat.mainModelv2,"/RMD_VERIFICACION_FIRMAS", aFilters);
            var aMotivoEditCierreLapsos = await registroService.getDataFilter(oThat.mainModelv2,"/RMD_MOTIVO_EDIT_CIERRE_LAPSO", aFilters); 
            var aObservaciones = await registroService.getDataFilter(oThat.mainModelv2,"/RMD_OBSERVACION", aFilters);
            var aLapsos = await registroService.getDataFilter(oThat.mainModelv2,"/RMD_LAPSO", aFilters);
            var aLapsoCatalogoFallas = await registroService.getDataFilter(oThat.mainModelv2,"/RMD_LAPSO_CATALOGO_FALLA", aFilters);
            
            for await( const oUser of aUsuarios.results){
                delete oUser.rmdId;
                delete oUser.usuarioId;
                delete oUser.__metadata;

                oUser.fechaActualiza = oSet.fechaActualiza;
                oUser.usuarioActualiza = oSet.usuarioActualiza

                if(oData.sTipo === "ELIMINAR"){
                    oUser.activo = oSet.activo;
                }else if(oData.sTipo === "ACTUALIZAR"){
                    oUser.fraccion = oSet.fraccion;
                }

                await registroService.onUpdateDataGeneral(oThat.mainModelv2, "RMD_USUARIO", oUser, oUser.rmdUsuarioId);
            };

            for await( const oEstructura of aEstructuras.results){
                delete oEstructura.aEquipo;
                delete oEstructura.aEspecificacion;
                delete oEstructura.aEtiqueta;
                delete oEstructura.aInsumo;
                delete oEstructura.aPaso;
                delete oEstructura.aPasoInsumoPaso;
                delete oEstructura.aUtensilio;
                delete oEstructura.estructuraId;
                delete oEstructura.rmdId;
                delete oEstructura.__metadata;

                oEstructura.fechaActualiza = oSet.fechaActualiza;
                oEstructura.usuarioActualiza = oSet.usuarioActualiza

                if(oData.sTipo === "ELIMINAR"){
                    oEstructura.activo = oSet.activo;
                }else if(oData.sTipo === "ACTUALIZAR"){
                    oEstructura.fraccion = oSet.fraccion;
                }

                await registroService.onUpdateDataGeneral(oThat.mainModelv2, "RMD_ESTRUCTURA", oEstructura, oEstructura.rmdEstructuraId);
            };

            for await( const oEtiqueta of aEtiquetas.results){
                delete oEtiqueta.etiquetaId;
                delete oEtiqueta.rmdEstructuraId;
                delete oEtiqueta.rmdId;
                delete oEtiqueta.vistoBuenoId;
                delete oEtiqueta.etiquetaId;
                delete oEtiqueta.__metadata;

                oEtiqueta.fechaActualiza = oSet.fechaActualiza;
                oEtiqueta.usuarioActualiza = oSet.usuarioActualiza

                if(oData.sTipo === "ELIMINAR"){
                    oEtiqueta.activo = oSet.activo;
                }else if(oData.sTipo === "ACTUALIZAR"){
                    oEtiqueta.fraccion = oSet.fraccion;
                }
                
                await registroService.onUpdateDataGeneral(oThat.mainModelv2, "RMD_ES_ETIQUETA", oEtiqueta, oEtiqueta.rmdEsEtiquetaId); 
            };

            for await( const oPaso of aPasos.results){
                delete oPaso.pasoId;
                delete oPaso.rmdEstructuraId;
                delete oPaso.rmdId;
                delete oPaso.tipoDatoId;
                delete oPaso.verifCheckId;
                delete oPaso.vistoBuenoId;
                delete oPaso.__metadata;

                oPaso.fechaActualiza = oSet.fechaActualiza;
                oPaso.usuarioActualiza = oSet.usuarioActualiza

                if(oData.sTipo === "ELIMINAR"){
                    oPaso.activo = oSet.activo;
                }else if(oData.sTipo === "ACTUALIZAR"){
                    oPaso.fraccion = oSet.fraccion;
                }

                await registroService.onUpdateDataGeneral(oThat.mainModelv2, "RMD_ES_PASO", oPaso, oPaso.rmdEstructuraPasoId);
            };

            for await( const oPasoInsumo of aPasoInsumos.results){
                delete oPasoInsumo.etiquetaId;
                delete oPasoInsumo.pasoHijoId;
                delete oPasoInsumo.pasoId;
                delete oPasoInsumo.rmdEstructuraId;
                delete oPasoInsumo.rmdEstructuraRecetaInsumoId;
                delete oPasoInsumo.rmdId;
                delete oPasoInsumo.tipoDatoId;
                delete oPasoInsumo.verifCheckId;
                delete oPasoInsumo.vistoBuenoId;
                delete oPasoInsumo.__metadata;

                
                oPasoInsumo.fechaActualiza = oSet.fechaActualiza;
                oPasoInsumo.usuarioActualiza = oSet.usuarioActualiza

                if(oData.sTipo === "ELIMINAR"){
                    oPasoInsumo.activo = oSet.activo;
                }else if(oData.sTipo === "ACTUALIZAR"){
                    oPasoInsumo.fraccion = oSet.fraccion;
                }

                await registroService.onUpdateDataGeneral(oThat.mainModelv2, "RMD_ES_PASO_INSUMO_PASO", oPasoInsumo, oPasoInsumo.rmdEstructuraPasoInsumoPasoId); 
            };

            for await( const oReceta of aRecetas.results){
                delete oReceta.aInsumo;
                delete oReceta.recetaId;
                delete oReceta.rmdId;
                delete oReceta.__metadata;

                oReceta.fechaActualiza = oSet.fechaActualiza;
                oReceta.usuarioActualiza = oSet.usuarioActualiza

                if(oData.sTipo === "ELIMINAR"){
                    oReceta.activo = oSet.activo;
                }else if(oData.sTipo === "ACTUALIZAR"){
                    oReceta.fraccion = oSet.fraccion;
                }

                await registroService.onUpdateDataGeneral(oThat.mainModelv2, "RMD_RECETA", oReceta, oReceta.rmdRecetaId); 
            };

            for await( const oInsumo of aInsumos.results){
                delete oInsumo.rmdEstructuraId;
                delete oInsumo.rmdId;
                delete oInsumo.rmdRecetaId;
                delete oInsumo.verifCheckId;
                delete oInsumo.__metadata;

                oInsumo.fechaActualiza = oSet.fechaActualiza;
                oInsumo.usuarioActualiza = oSet.usuarioActualiza

                if(oData.sTipo === "ELIMINAR"){
                    oInsumo.activo = oSet.activo;
                }else if(oData.sTipo === "ACTUALIZAR"){
                    oInsumo.fraccion = oSet.fraccion;
                }

                await registroService.onUpdateDataGeneral(oThat.mainModelv2, "RMD_ES_RE_INSUMO", oInsumo, oInsumo.rmdEstructuraRecetaInsumoId);
            };

            for await( const oEspecificacion of aEspecificaciones.results){
                delete oEspecificacion.ensayoPadreId;
                delete oEspecificacion.rmdEstructuraId;
                delete oEspecificacion.rmdId;
                delete oEspecificacion.tipoDatoId;
                delete oEspecificacion.verifCheckId;
                delete oEspecificacion.vistoBuenoId;
                delete oEspecificacion.__metadata;

                oEspecificacion.fechaActualiza = oSet.fechaActualiza;
                oEspecificacion.usuarioActualiza = oSet.usuarioActualiza

                if(oData.sTipo === "ELIMINAR"){
                    oEspecificacion.activo = oSet.activo;
                }else if(oData.sTipo === "ACTUALIZAR"){
                    oEspecificacion.fraccion = oSet.fraccion;
                }

                await registroService.onUpdateDataGeneral(oThat.mainModelv2, "RMD_ES_ESPECIFICACION", oEspecificacion, oEspecificacion.rmdEstructuraEspecificacionId); 
            };

            for await( const oUtensilio of aUtensilios.results){
                delete oUtensilio.agrupadorId;
                delete oUtensilio.rmdEstructuraId;
                delete oUtensilio.rmdId;
                delete oUtensilio.utensilioId;
                delete oUtensilio.verifCheckId;
                delete oUtensilio.vistoBuenoId;
                delete oUtensilio.__metadata;

                oUtensilio.fechaActualiza = oSet.fechaActualiza;
                oUtensilio.usuarioActualiza = oSet.usuarioActualiza

                if(oData.sTipo === "ELIMINAR"){
                    oUtensilio.activo = oSet.activo;
                }else if(oData.sTipo === "ACTUALIZAR"){
                    oUtensilio.fraccion = oSet.fraccion;
                }

                await registroService.onUpdateDataGeneral(oThat.mainModelv2, "RMD_ES_UTENSILIO", oUtensilio, oUtensilio.rmdEstructuraUtensilioId); 
            };

            for await( const oEquipo of aEquipos.results){
                delete oEquipo.equipoId;
                delete oEquipo.rmdEstructuraId;
                delete oEquipo.rmdId;
                delete oEquipo.verifCheckId;
                delete oEquipo.vistoBuenoId;
                delete oEquipo.__metadata;

                oEquipo.fechaActualiza = oSet.fechaActualiza;
                oEquipo.usuarioActualiza = oSet.usuarioActualiza

                if(oData.sTipo === "ELIMINAR"){
                    oEquipo.activo = oSet.activo;
                }else if(oData.sTipo === "ACTUALIZAR"){
                    oEquipo.fraccion = oSet.fraccion;
                }

                await registroService.onUpdateDataGeneral(oThat.mainModelv2, "RMD_ES_EQUIPO", oSet, oEquipo.rmdEstructuraEquipoId); 
            };

            for await( const oTablaControl of aTablaControles.results){
                delete oTablaControl.rmdId;
                delete oTablaControl.__metadata;

                oTablaControl.fechaActualiza = oSet.fechaActualiza;
                oTablaControl.usuarioActualiza = oSet.usuarioActualiza

                if(oData.sTipo === "ELIMINAR"){
                    oTablaControl.activo = oSet.activo;
                }else if(oData.sTipo === "ACTUALIZAR"){
                    oTablaControl.fraccion = oSet.fraccion;
                }

                await registroService.onUpdateDataGeneral(oThat.mainModelv2, "RMD_TABLA_CONTROL", oTablaControl, oTablaControl.rmdControlRechazo); 
            };

            for await( const oVerificacionFirma of aVerificacionesFirmas.results){
                delete oVerificacionFirma.rmdId;
                delete oVerificacionFirma.usuarioId;
                delete oVerificacionFirma.__metadata;

                oVerificacionFirma.fechaActualiza = oSet.fechaActualiza;
                oVerificacionFirma.usuarioActualiza = oSet.usuarioActualiza

                if(oData.sTipo === "ELIMINAR"){
                    oVerificacionFirma.activo = oSet.activo;
                }else if(oData.sTipo === "ACTUALIZAR"){
                    oVerificacionFirma.fraccion = oSet.fraccion;
                }

                await registroService.onUpdateDataGeneral(oThat.mainModelv2, "RMD_VERIFICACION_FIRMAS", oVerificacionFirma, oVerificacionFirma.rmdFirmaVerif);
            };

            for await( const oMotivoEditCierreLap of aMotivoEditCierreLapsos.results){
                delete oMotivoEditCierreLap.rmdId;
                delete oMotivoEditCierreLap.rmdLapsoId;
                delete oMotivoEditCierreLap.__metadata;

                oMotivoEditCierreLap.fechaActualiza = oSet.fechaActualiza;
                oMotivoEditCierreLap.usuarioActualiza = oSet.usuarioActualiza

                if(oData.sTipo === "ELIMINAR"){
                    oMotivoEditCierreLap.activo = oSet.activo;
                }else if(oData.sTipo === "ACTUALIZAR"){
                    oMotivoEditCierreLap.fraccion = oSet.fraccion;
                }

                await registroService.onUpdateDataGeneral(oThat.mainModelv2, "RMD_MOTIVO_EDIT_CIERRE_LAPSO", oMotivoEditCierreLap, oMotivoEditCierreLap.rmdMotivoCierre);
            };

            for await( const oObservacion of aObservaciones.results){
                delete oObservacion.mdId;
                delete oObservacion.rmdEstructuraEquipoId;
                delete oObservacion.rmdEstructuraPasoId;
                delete oObservacion.rmdEstructuraUtensilioId;
                delete oObservacion.rmdId;
                delete oObservacion.__metadata;

                oObservacion.fechaActualiza = oSet.fechaActualiza;
                oObservacion.usuarioActualiza = oSet.usuarioActualiza

                if(oData.sTipo === "ELIMINAR"){
                    oObservacion.activo = oSet.activo;
                }else if(oData.sTipo === "ACTUALIZAR"){
                    oObservacion.fraccion = oSet.fraccion;
                }

                await registroService.onUpdateDataGeneral(oThat.mainModelv2, "RMD_OBSERVACION", oObservacion, oObservacion.rmdObservacionId);
            };

            for await( const oLapso of aLapsos.results){
                delete oLapso.aListCatalogFalla;
                delete oLapso.equipoId;
                delete oLapso.pasoId;
                delete oLapso.pasoIdFin;
                delete oLapso.rmdId;
                delete oLapso.tipoLapsoId;
                delete oLapso.__metadata;

                oLapso.fechaActualiza = oSet.fechaActualiza;
                oLapso.usuarioActualiza = oSet.usuarioActualiza

                if(oData.sTipo === "ELIMINAR"){
                    oLapso.activo = oSet.activo;
                }else if(oData.sTipo === "ACTUALIZAR"){
                    oLapso.fraccion = oSet.fraccion;
                }
                
                await registroService.onUpdateDataGeneral(oThat.mainModelv2, "RMD_LAPSO", oLapso, oLapso.rmdLapsoId);  
            };

            for await( const oLapsoCatalogoFalla of aLapsoCatalogoFallas.results){
                delete oLapsoCatalogoFalla.rmdId;
                delete oLapsoCatalogoFalla.rmdLapsoId;
                delete oLapsoCatalogoFalla.__metadata;

                oLapsoCatalogoFalla.fechaActualiza = oSet.fechaActualiza;
                oLapsoCatalogoFalla.usuarioActualiza = oSet.usuarioActualiza

                if(oData.sTipo === "ELIMINAR"){
                    oLapsoCatalogoFalla.activo = oSet.activo;
                }else if(oData.sTipo === "ACTUALIZAR"){
                    oLapsoCatalogoFalla.fraccion = oSet.fraccion;
                }

                await registroService.onUpdateDataGeneral(oThat.mainModelv2, "RMD_LAPSO_CATALOGO_FALLA", oLapsoCatalogoFalla, oLapsoCatalogoFalla.rmdLapsoCatalogoFalla); 
            };

        },

        //Obtener lista de Hu y crear en HANA Offline
        onGetListHuAndCreateHanaOffline: function () {
            try {
                sap.ui.core.BusyIndicator.show();
                let oLineaActualRMD = oThat.getView().getModel("modelGeneral").getProperty("/LineaActualRMD");
                let aFilters = [];
                aFilters.push(new Filter("Vpobjkey", "EQ", oLineaActualRMD.Aufnr));
                // aFilters.push(new Filter("Vpobjkey", "EQ", "200000580"));//TEST_ETIQUETA
                //registroService.onGetDataGeneralFilters(oThat.modelNecesidad, "HUSet", aFilters).then(async function(result) {
                registroService.onGetDataGeneralFilters(oThat.modelNecesidad, "HuOfflineSet", aFilters).then(async function(result) {
                    let aListHus = result.results;
                    let oHuCreado = aListHus[aListHus.length-1];
                    let aSecuencia = [];
                    let nType = '';
                    if (oThat.nType === 1) {
                        nType = SGrupoArticuloPari;
                    } else if (oThat.nType === 2) {
                        nType = sGrupoArticuloZS2;
                    }
                    var aFilter = [];
                    aFilter.push(new Filter("orden", "EQ", oLineaActualRMD.Aufnr));
                    aFilter.push(new Filter("enlace", "EQ", true));
                    aFilter.push(new Filter("activo", "EQ", true));

                    let oDataEtiquetasControl = await registroService.getDataFilter(oThat.mainModelv2, "/ETIQUETAS_CONTROL", aFilter);
                    for (let nSec = 0; nSec < aListHus.length; nSec++) {
                        
                        if(aListHus[nSec].Hukey== ""){
                            let oDataHu = oDataEtiquetasControl.results.find(itm=>itm.Venum === aListHus[nSec].Venum);
                        
                            if (!oDataHu) {
                                let uuID = util.onUUID();
                                let oData = {
                                    etiquetasControlId: uuID,
                                    hu: aListHus[nSec].Exidv,
                                    usuarioRegistro: oInfoUsuario.data.usuario,
                                    activo: true,
                                    orden: aListHus[nSec].Vpobjkey,
                                    enlace: true,
                                    cantidadOrden: aListHus[nSec].Resu1,
                                    cantidadUnidad: aListHus[nSec].Umrez,
                                    secuencia: nSec + 1,
                                    impresion: 0,
                                    observacion: "",
                                    fechaRegistro: new Date(),
                                    tipo: nType,
                                    um: aListHus[nSec].Altme,
                                    Venum: aListHus[nSec].Venum
                                }
                                aSecuencia.push(oData);
                            }
                            registroService.onSaveDataGeneral(oThat.mainModelv2, "ETIQUETAS_CONTROL", oData).then(function (oResult) {
                                sap.ui.core.BusyIndicator.hide();
                            }).catch(function (oError) {
                                sap.ui.core.BusyIndicator.hide();
                                throw oError;
                            });

                        }else{
                            registroService.oDataRemove(oThat.modelNecesidad, "/HuOfflineSet", aListHus[nSec].Hukey).then((res)=>{
                                console.log("remove succes");
                            });
                        }
                    }
                    if(aListHus.length>0){
                        let oTablaArrayInsert = {};
                        oTablaArrayInsert.terminal         = null;
                        oTablaArrayInsert.usuarioRegistro  = oInfoUsuario.data.usuario;
                        oTablaArrayInsert.fechaRegistro    = new Date();
                        oTablaArrayInsert.activo           = true;
                        //oTablaArrayInsert.aEtiquetasControl= aSecuencia;
                        oTablaArrayInsert.id               = util.onGetUUIDV4();

                        oThat.onCrearEtiquetaGeneralHana(oThat.mainModelv2, "/TABLAS_ARRAY_MD_SKIP", oTablaArrayInsert);
                    }

                }).catch(function (oError) {
                    console.log(oError);
                    sap.ui.core.BusyIndicator.hide();
                });
            } catch (oError) {
                MessageBox.error(oError.responseText);
            }
        },

        onRefreshButton:function() {
            var oThat = this;
            if (typeof sap.hybrid !== 'undefined') {
                sap.hybrid.refreshStore().then(function(result){
                    if(result){
                        oThat.onSynchronizeNotificationAviso();
                        oThat.onGetListHuAndCreateHanaOffline();
                    }
                }, function (error) {
					console.log("odataError SAP");

				});
            }      
        },
        
        onFlushButton: function() {
            if (typeof sap.hybrid !== 'undefined') {
                sap.hybrid.flushStore().then(function(result){
                    if(result){
                        console.log("Flush Complete");
                    }
                },function(error){
                    console.log("error Flush");
                });
            }
        },

        onSynchronizeNotificationAviso:async function(){
            let aFilterSAP= [];
            aFilterSAP.push(new Filter("Zflag", "EQ", "1"));
            aFilterSAP.push(new Filter("Sincronizado", "EQ", "0"));
            let aNotificaciones = await registroService.onGetDataGeneralFilters(oThat.modelNecesidad, "NotificacionOfflineSet",aFilterSAP);
            
            let aFilterAvisoSap = [];
            aFilterAvisoSap.push(new Filter("Sincronizado", "EQ", "0"));
            let aAviso = await registroService.onGetDataGeneralFilters(oThat.modelNecesidad,"AvisoOfflineSet",aFilterAvisoSap);

            BusyIndicator.show(0);
            
            for await (const oNotification of aNotificaciones.results) {
                
                if(oNotification.Rmzhl !== ""){
                    let aFilter = [];             
                    aFilter.push(new Filter("rmdControlRechazo", "EQ", oNotification.Notificacionkey));
                
                    let oNotifiHana = await registroService.onGetDataGeneralFilters(oThat.mainModelv2, "RMD_TABLA_CONTROL", aFilter);

                    oNotifiHana.results[0].Rmzhl = oNotification.Rmzhl;
                    oNotifiHana.results[0].Rueck = oNotification.Rueck;
                    delete oNotifiHana.results[0].__metadata;
                    delete oNotifiHana.results[0].rmdId;

                    await registroService.onUpdateDataGeneral(oThat.mainModelv2, "RMD_TABLA_CONTROL", oNotifiHana.results[0], oNotification.Notificacionkey);

                    oNotification.Sincronizado = "1";
                
                    delete oNotification.__metadata;
                    oNotification.PostgDate = formatter.onFormatDateSAP(oNotification.PostgDate);

                    await registroService.onUpdateDataGeneral(oThat.modelNecesidad, "NotificacionOfflineSet", oNotification, oNotification.Notificacionkey);
                }
            }

            for await (const oAviso of aAviso.results) {
                
                if(oAviso.Qmnum !== ""){
                    let aFilter = [];             
                    aFilter.push(new Filter("rmdLapsoId", "EQ", oAviso.Keyaviso));
                
                    let oLapsoHana = await registroService.onGetDataGeneralFilters(oThat.mainModelv2, "RMD_LAPSO", aFilter);

                    oLapsoHana.results[0].Qmnum = oAviso.Qmnum;

                    delete oLapsoHana.results[0].__metadata;
                    delete oLapsoHana.results[0].aListCatalogFalla;
                    delete oLapsoHana.results[0].equipoId;
                    delete oLapsoHana.results[0].pasoId;
                    delete oLapsoHana.results[0].pasoIdFin;
                    delete oLapsoHana.results[0].rmdId;
                    delete oLapsoHana.results[0].tipoLapsoId;

                    await registroService.onUpdateDataGeneral(oThat.mainModelv2, "RMD_LAPSO", oLapsoHana.results[0], oAviso.Keyaviso);

                    oAviso.Sincronizado = "1";
                
                    delete oAviso.__metadata;
                    if( oAviso.Valid){
                        oAviso.Valid = formatter.onFormatDateSAP(oAviso.Valid);
                    }
                    await registroService.onUpdateDataGeneral(oThat.modelNecesidad, "AvisoOfflineSet", oAviso, oAviso.Keyaviso);
                }
            }
            //Nuevamente un flush
            if (typeof sap.hybrid !== 'undefined') {
                if (typeof sap.hybrid !== 'undefined') {
                    sap.hybrid.flushStore().then(function(result){
                        if(result){
                            console.log("Flush Complete");
                        }
                    },function(error){
                        console.log("error Flush");
                    });
                }
            }
            BusyIndicator.hide();
        }

    });
  });