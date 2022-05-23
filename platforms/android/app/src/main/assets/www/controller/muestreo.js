sap.ui.define([
	"sap/ui/base/ManagedObject"
], function(ManagedObject) {
	"use strict";
    return {
        onFormatterDate: function (dDate) {
            return (`${
                dDate.getFullYear().toString().padStart(4, '0')}-${
				(dDate.getMonth()+1).toString().padStart(2, '0')}-${
                dDate.getDate().toString().padStart(2, '0')}`);
        },
        onValidateTipoEtiqueta: function (sMotivoDesv) {
            let sValue = "";
            if (sMotivoDesv === "Muestra Fisico Quimico") {
                sValue = "F";
            } else if (sMotivoDesv === "Muestra Microbiologia") {
                sValue = "M";
            } else if (sMotivoDesv === "Muestra Compartida MB/FQ") {
                sValue = "F/M";
            }
            return sValue;
        },
        onGeneratePdf: async function (lineaSeleccionadaMuestreo, lineaRMD) {
            var oThat = this;
            var imageLogo = "data:image/jpeg;base64,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";
            let jDefinition = {
                pageSize: {width:100, height: 73},
                pageMargins: [40, 100, 26, 0],
                header: {},
                content: [],
                styles: {
                header: {
                    fontSize: 18,
                    bold: true,
                    margin: [0, 0, 0, 10],
                },
                subheader: {
                    fontSize: 10,
                    bold: true,
                    margin: [0, 10, 0, 5],
                },
                tableExample: {
                    margin: [0, 5, 0, 15],
                },
                tableOpacityExample: {
                    margin: [0, 5, 0, 15],
                    color: "blue",
                    fillOpacity: 0.3,
                },
                tablePrincipalHeader: {
                    bold: true,
                    fontSize: 11,
                    color: "black",
                },
                tablePrincipalData: {
                    bold: true,
                    fontSize: 11,
                    color: "black",
                },
                tablePrincipalDataMarginMiddle: {
                    bold: true,
                    fontSize: 9,
                    color: "black",
                    margin: [0, 10]
                },
                tablePrincipalDataRegister: {
                    bold: true,
                    fontSize: 9,
                    color: "black",
                },
                tableHeader: {
                    bold: true,
                    fontSize: 9,
                    decoration: "underline",
                    alignment: "center",
                    color: "black",
                },
                tableData: {
                    bold: false,
                    fontSize: 10,
                    alignment: "left",
                    color: "black",
                },
                tableDataProceso: {
                    bold: false,
                    fontSize: 11,
                    margin: [0, 10,0,10],
                    alignment: "left",
                    color: "black",
                },
                tableColocarCheck: {
                    bold: false,
                    fontSize: 9,
                    margin: [0, 10,0,10],
                    alignment: "left",
                    color: "black",
                },
                tablePaso: {
                    fontSize: 9,
                    color: "black",
                    margin: [15, 0]
                },
                TableDataRealiz: {
                    bold: true,
                    fontSize: 8,
                    alignment: "center",
                    color: "black",
                },
                tableDataCantidad: {
                    bold: false,
                    fontSize: 11,
                    alignment: "right",
                    color: "black",
                },
                tableVerify: {
                    bold: true,
                    fontSize: 10,
                    alignment: "left",
                    color: "black",
                    margin: [0, 10, 0, 5]
                },
                tableVerifyFirma: {
                    bold: true,
                    fontSize: 10,
                    alignment: "center",
                    color: "black",
                }
                },
                defaultStyle: {
                    alignment: "justify",
                },
                patterns: {
                    stripe45d: {
                        boundingBox: [1, 1, 4, 4],
                        xStep: 3,
                        yStep: 3,
                        pattern: "1 w 0 1 m 4 5 l s 2 0 m 5 3 l s",
                    },
                },
            };

            var tReimpresion = null;
            if(!!lineaSeleccionadaMuestreo.impresion || lineaSeleccionadaMuestreo.impresion === 1){
                tReimpresion = lineaSeleccionadaMuestreo.reimpresion ? ("Reimpresión # "+(lineaSeleccionadaMuestreo.reimpresion+1)) : "Reimpresión # 1";
            }else {
                tReimpresion = "";
            }


            jDefinition.header = {
                columns: [
                {
                    style: 'tableExample',
                    color: '#444',
                    fontSize: 2,
                    margin: [5,0,0,0],
                    table: {
                    widths: [17,15,15,17],
                    heights: [1,1,1,1,1,1,1,1,1,1],
                    // headerRows: 2,
                    // keepWithHeaderRows: 1,
                    body: [
                        [
                            {
                                image: imageLogo, width: '15'
                            },
                            {
                                text: lineaSeleccionadaMuestreo.correlativoMuestra + "/" + lineaSeleccionadaMuestreo.anio,
                                fontSize: 4, 
                                colSpan: 2, 
                                alignment: 'center',
                                bold: true
                            },
                            {
                                text:' ',
                                fontSize:1
                            },
                            {
                                fontSize: 2,
                                table: {
                                    widths: [9],
                                    heights: [1],
                                    body: [
                                        [
                                            {
                                                fontSize: 4,
                                                bold: true,
                                                text: oThat.onValidateTipoEtiqueta(lineaSeleccionadaMuestreo.motivoDesv),
                                                alignment: 'center'
                                            }
                                        ]
                                    ]
                                }, 
                                layout: oThat.onValidateTipoEtiqueta(lineaSeleccionadaMuestreo.motivoDesv) === "" ? 'noBorders': 'Borders'
                            }
                        ],
                        [
                            {
                                colSpan:4,
                                text:'DPTO. CONTROL DE CALIDAD',
                                fontSize: 2
                            },
                            '', 
                            '', 
                            ''
                        ],
                        [
                            {
                                colSpan:4,
                                text: 'PRODUCTO: ' + lineaRMD.descripcion,
                                bold: true,
                                fontSize: 2
                            }, 
                            '', 
                            {
                                text:' ',
                                fontSize: 2,
                                colSpan:2
                            }, 
                            ''    
                        ],
                        [
                            {
                                colSpan:1,
                                text:'N° LOTE: ' + lineaRMD.lote,
                                fontSize: 2
                            }, 
                            {
                                colSpan:2,
                                text:'O.P: ' + lineaRMD.ordenSAP,
                                fontSize: 2
                            }, 
                            '',
                            {
                                text:'Orden de: ' + lineaRMD.etapa,
                                fontSize: 2, 
                                colSpan:1
                            }
                        ],
                        [
                            {
                                colSpan:2,
                                text:'CANTIDAD DE MUESTRA: ',
                                fontSize: 2
                            }, 
                            '',
                            {
                                colSpan:2,
                                text:'CANTIDAD DEL LOTE: ',
                                fontSize: 2
                            },
                            ''
                        ],
                        [
                            {
                                colSpan:2,
                                text:'ENVASADO: ' + lineaSeleccionadaMuestreo.cantRechazo + " " + (lineaRMD.aReceta.results[0].recetaId.Meins ? lineaRMD.aReceta.results[0].recetaId.Meins : ''),
                                bold: true,
                                fontSize: 2
                            },
                            '',
                            {
                                colSpan:2,
                                text:'ENVASADO: ' + lineaRMD.vfmng + " " + (lineaRMD.aReceta.results[0].recetaId.Meins ? lineaRMD.aReceta.results[0].recetaId.Meins : ''),
                                bold: true,
                                fontSize: 2
                            }, 
                            ''
                        ],
                        [
                            {
                                colSpan:4,
                                text:'CONDICIONES DE ALMACENAMIENTO:  ',
                                fontSize: 2
                            }, 
                            '', 
                            '', 
                            ''
                        ],
                        [
                            {
                                colSpan:4,
                                text:'T°C./H.R.(%): ' + lineaRMD.aReceta.results[0].recetaId.Atwrt2,
                                fontSize: 2
                            }, 
                            '', 
                            '', 
                            ''
                        ],
                        [
                            {
                                colSpan:4,
                                text:'OBS: ' + lineaSeleccionadaMuestreo.ConfText,
                                fontSize: 2
                            }, 
                            '',
                            '', 
                            ''
                        ],
                        [
                            {
                                colSpan:2,
                                text:'FECHA: ' + oThat.onFormatterDate(lineaSeleccionadaMuestreo.fechaRegistro),
                                bold: true,
                                fontSize: 2
                            }, 
                            '', 
                            {
                                colSpan:2,
                                text:'MUESTREADO POR: ' + lineaSeleccionadaMuestreo.usuarioRegistro,
                                bold: true,
                                fontSize: 2
                            }, 
                            ''
                        ],
                        [
                            {
                                colSpan:3,
                                text:'',
                                fontSize: 2
                            }, 
                            '', 
                            '',
                            {
                                colSpan:1,
                                text: tReimpresion,
                                fontSize: 2
                            }
                        ]
                    ]
                    },
                    layout: 'noBorders'
                },
                ]
            }



            let docDefinition = jDefinition;

            pdfMake.tableLayouts = {
                exampleLayout: {
                hLineWidth: function (i, node) {
                    if (i === 0 || i === node.table.body.length) {
                    return 0;
                    }
                    return i === node.table.headerRows ? 2 : 1;
                },
                vLineWidth: function (i) {
                    return 0;
                },
                hLineColor: function (i) {
                    return i === 1 ? "black" : "#aaa";
                },
                paddingLeft: function (i) {
                    return i === 0 ? 0 : 8;
                },
                paddingRight: function (i, node) {
                    return i === node.table.widths.length - 1 ? 0 : 8;
                },
                },
            };
            // pdfMake.createPdf(docDefinition).open();

            return new Promise(function (resolve, reject) {
                const pdfDocGenerator = pdfMake.createPdf(docDefinition);
                Promise.all([pdfDocGenerator.getBase64()]).then( function(data64) {
                    var texto = '';
                    texto = "data:application/pdf;base64,"+encodeURI(data64[0]);
                    // if (sendPrint) {
                    // } else {
                    //   texto = encodeURI(data64[0]);
                    // }
                    resolve (texto);
                }).catch(function (oError) {
                    oThat.onErrorMessage(oError, "errorSave");
                });
            });
        },

        onValidarInfo: function(aDataEstructuras,Estructura){
            let BusquedaEstructuras = Estructura.split(".");
            let data = aDataEstructuras;
            BusquedaEstructuras.forEach(function(info){
                if(data){
                data = data[info];
                }else {
                return ' ';
                }
            })
            return data? data : ' ';
        },
    };
});