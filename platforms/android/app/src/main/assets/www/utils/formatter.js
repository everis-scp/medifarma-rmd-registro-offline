sap.ui.define([
	"sap/ui/model/json/JSONModel"
], function (JSONModel) {
	"use strict";

	const sIdVerificacionCheck = 432,
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
		sIdDatoFijo = 0,
		sIdFormula = 445,
		sIdSintipodedato = 446,
		sIdNotificacion = 447,
		iIdMuestraCC = 448,
		iIdLote = 444,
		iIdEntrega = 450,
        iIdFechaVencimiento = 449;

	return {
		onGetStateProduction: function (status) {
			if (status === 456) {
				return "PENDIENTE";
			} else if (status === 457 || status === 458) {
				return "ENVIADO";
			} else if (status === 459 || status === 460) {
				return "RECHAZADO";
			} else if (status === 461) {
				return "APROBADO";
			} else {
				return "None";
			}
        },

        onGetState: function (status) {
			if (status === 456 || status === 457 || status === 458) {
				return "Warning";
			} else if (status === 459 || status === 460) {
				return "Error";
			} else if (status === 461) {
				return "Success";
			} else {
				return "None";
			}
        },
        
        onGetI18nText: function (oThat, sText) {
			return oThat.oView.getModel("i18n") === undefined ? oThat.getOwnerComponent().getModel("i18n").getResourceBundle().getText(sText) :
				oThat.oView.getModel("i18n").getResourceBundle().getText(sText);
		},
		selectedColor:function(textRol){

			let objectColor =  {

				"rmd_registrador":"TextStyleNone",
				"rmd_jefe_prod":"TextStyleJefe",
				"rmd_gerente_prod":"TextStyleNone",
				"rmd_jefe_dt":"TextStyleNone",
				"RMD_AUXILIAR":"TextStyleAuxiliar",
				"RMD_SUPERVISOR":"TextStyleSupervisor",
				"RMD_CONTROL_CALIDAD":"TextStyleControlCalidad",
				"RMD_CONTROL_PROCESO":"TextStyleControlProcesos",
				"USUARIOSAP":"TextStyleUsuarioSAP"
			};

			return objectColor[textRol];

			// if(element.ultimaAccion.rol == "rmd_registrador"){
			// 	nameClass = "TextStyleNone";
			// }else if(element.ultimaAccion.rol == "rmd_jefe_prod"){
			// 	nameClass = "TextStyleJefe";
			// }else if(element.ultimaAccion.rol == "rmd_gerente_prod"){
			// 	nameClass = "TextStyleNone";
			// }else if(element.ultimaAccion.rol == "rmd_jefe_dt"){
			// 	nameClass = "TextStyleNone";
			// }else if(element.ultimaAccion.rol == "RMD_AUXILIAR"){
			// 	nameClass = "TextStyleAuxiliar";
			// }else if(element.ultimaAccion.rol == "CP_SUPERVISOR_PROD"){
			// 	nameClass = "TextStyleSupervisor";
			// }else if(element.ultimaAccion.rol == "RMD_CONTROL_CALIDAD"){
			// 	nameClass = "TextStyleControlCalidad";
			// }else if(element.ultimaAccion.rol == "RMD_CONTROL_PROCESO"){
			// 	nameClass = "TextStyleControlProcesos";
			// }
		}, 
		formatDateTime : function (oDate) {
			return (`${
                oDate.getHours().toString().padStart(2, '0')}:${
				oDate.getMinutes().toString().padStart(2, '0')}:${
				oDate.getSeconds().toString().padStart(2, '0')}`);
		},
		
		formatDateFooter : function (oDate) {
            return (`${
                oDate.getFullYear().toString().padStart(4, '0')}-${
				(oDate.getMonth()+1).toString().padStart(2, '0')}-${
				oDate.getDate().toString().padStart(2, '0')} ${
                oDate.getHours().toString().padStart(2, '0')}:${
                oDate.getMinutes().toString().padStart(2, '0')}`);
        },

		formatDateFooterEspecificaciones: function (oDate) {
			return (`${
                oDate.getFullYear().toString().padStart(4, '0')}-${
				(oDate.getMonth()+1).toString().padStart(2, '0')}-${
				oDate.getDate().toString().padStart(2, '0')}`);
		},

		onFormatDateSAP: function (dDate) {
			return (`${
                dDate.getFullYear().toString().padStart(4, '0')}-${
				(dDate.getMonth()+1).toString().padStart(2, '0')}-${
				dDate.getDate().toString().padStart(2, '0')}T${
                dDate.getHours().toString().padStart(2, '0')}:${
                dDate.getMinutes().toString().padStart(2, '0')}:${
				dDate.getSeconds().toString().padStart(2, '0')}.${
				dDate.getMilliseconds().toString().padStart(2, '0')}`);
		},

		onFormatoTipoDatoInput: function (aPaso) {
			let sDato = '';
			
			if (aPaso.tipoDatoId_iMaestraId === sIdTexto) {
				sDato = aPaso.texto === null ? '' : aPaso.texto;
			} else if (aPaso.tipoDatoId_iMaestraId === sIdCantidad) {
				sDato = aPaso.cantidad === null ? '' : (parseFloat(aPaso.cantidad)).toFixed(aPaso.decimales ? aPaso.decimales : 0);
			} else if (aPaso.tipoDatoId_iMaestraId === sIdNumeros) {
				sDato = aPaso.cantidad === null ? '' : (parseFloat(aPaso.cantidad)).toFixed(aPaso.decimales ? aPaso.decimales : 0);
			} else if (aPaso.tipoDatoId_iMaestraId === sIdFecha) {
				sDato = aPaso.fecha === null ? '' : `${
					aPaso.fecha.getFullYear().toString().padStart(4, '0')}/${
					(aPaso.fecha.getMonth()+1).toString().padStart(2, '0')}/${
					aPaso.fecha.getUTCDate().toString().padStart(2, '0')}`;
			} else if (aPaso.tipoDatoId_iMaestraId === sIdFechayHora) {
				sDato = aPaso.fechaHora === null ? '' : `${
					aPaso.fechaHora.getFullYear().toString().padStart(4, '0')}/${
					(aPaso.fechaHora.getMonth()+1).toString().padStart(2, '0')}/${
					aPaso.fechaHora.getDate().toString().padStart(2, '0')} ${
					aPaso.fechaHora.getHours().toString().padStart(2, '0')}:${
					aPaso.fechaHora.getMinutes().toString().padStart(2, '0')}`;
			} else if (aPaso.tipoDatoId_iMaestraId === sIdHora) {
				sDato = aPaso.hora === null ? '' : `${ 
					new Date(aPaso.hora.ms).getUTCHours().toString().padStart(2, '0')}:${
					new Date(aPaso.hora.ms).getUTCMinutes().toString().padStart(2, '0')}`;
			} else if (aPaso.tipoDatoId_iMaestraId === sIdDatoFijo) {
				sDato = aPaso.datoFijo === null ? '' : aPaso.datoFijo;
			} else if (aPaso.tipoDatoId_iMaestraId === sIdRango) {
				sDato = aPaso.rango === null ? '' : (parseFloat(aPaso.rango)).toFixed(aPaso.decimales ? aPaso.decimales : 0);
			} else if (aPaso.tipoDatoId_iMaestraId === sIdFormula) {
				sDato = aPaso.formula === null ? '' : (parseFloat(aPaso.formula)).toFixed(0);
			} else if (aPaso.tipoDatoId_iMaestraId === sIdSintipodedato) {
				sDato = '';
			} else if (aPaso.tipoDatoId_iMaestraId === sIdNotificacion) {
				sDato = aPaso.fechaHora === null ? '' : `${
					aPaso.fechaHora.getFullYear().toString().padStart(4, '0')}/${
					(aPaso.fechaHora.getMonth()+1).toString().padStart(2, '0')}/${
					aPaso.fechaHora.getDate().toString().padStart(2, '0')} ${
					aPaso.fechaHora.getHours().toString().padStart(2, '0')}:${
					aPaso.fechaHora.getMinutes().toString().padStart(2, '0')}`;
			} else if (aPaso.tipoDatoId_iMaestraId === iIdMuestraCC){
				sDato = aPaso.cantidad === null ? '' : (parseFloat(aPaso.cantidad)).toFixed(aPaso.decimales ? aPaso.decimales : 0);
			} else if (aPaso.tipoDatoId_iMaestraId === iIdEntrega){
				sDato = aPaso.cantidad === null ? '' : (parseFloat(aPaso.cantidad)).toFixed(aPaso.decimales ? aPaso.decimales : 0);
			} else if (aPaso.tipoDatoId_iMaestraId === iIdLote) {
				sDato = aPaso.texto === null ? '' : aPaso.texto;
			} else if (aPaso.tipoDatoId_iMaestraId === iIdFechaVencimiento ) {
				sDato = aPaso.fecha === null ? '' : `${
					aPaso.fecha.getUTCFullYear().toString().padStart(4, '0')}/${
					(aPaso.fecha.getUTCMonth()+1).toString().padStart(2, '0')}/${
					aPaso.fecha.getUTCDate().toString().padStart(2, '0')}`;
			}

			return sDato;
		},

		onFormatoTipoDatoCheckBox: function (aPaso) {
			let sDato = false;
			
			if (aPaso.tipoDatoId_iMaestraId === sIdVerificacionCheck) {
				sDato = aPaso.verifCheck === null ? false : aPaso.verifCheck;
			} else if (aPaso.tipoDatoId_iMaestraId === sIdVistobueno) {
				sDato = aPaso.vistoBueno === null ? false : aPaso.vistoBueno;
			} else if (aPaso.tipoDatoId_iMaestraId === sIdRealizadoporyVistobueno) {
				sDato = aPaso.vistoBueno === null ? false : aPaso.vistoBueno;
			} else if (aPaso.tipoDatoId_iMaestraId === sIdMultiplecheck) {
				sDato = aPaso.multiCheck === null ? false : aPaso.multiCheck;
			} else if (aPaso.tipoDatoId_iMaestraId === sIdRealizadopor) {
				sDato = aPaso.realizadoPor === null ? false : aPaso.realizadoPor;
			}

			return sDato;
		},

		onFormatoTipoDatoType: function (tipoDato) {
			let sDato = 'Text';
			
			if (tipoDato === sIdTexto) {
				sDato = 'Text';
			} else if (tipoDato === sIdCantidad) {
				// sDato = 'Number';
				sDato = 'Text';
			} else if (tipoDato === sIdNumeros) {
				// sDato = 'Number';
				sDato = 'Text';
			} else if (tipoDato === sIdRango) {
				// sDato = 'Number';
				sDato = 'Text';
			}

			return sDato;
		},

		onFormatoTipoDatoVisibleInput: function (tipoDato) {
			let sDato = false;
			
			if (tipoDato === sIdTexto) {
				sDato = true;
			} else if (tipoDato === sIdCantidad) {
				sDato = true;
			} else if (tipoDato === sIdNumeros) {
				sDato = true;
			} else if (tipoDato === sIdRango) {
				sDato = true;
			}

			return sDato;
		},

		onFormatoVisibleDeleteAuto: function (oPaso) {
			let sDato = false;
			if (oPaso.tipoDatoId_iMaestraId === sIdNotificacion || oPaso.tipoDatoId_iMaestraId === sIdFechayHora) {
				sDato = true;
			}
			return sDato;
		},

		onFormatoTipoDatoVisibleText: function (tipoDato) {
			let sDato = false;
			
			if (tipoDato === sIdFecha) {
				sDato = true;
			} else if (tipoDato === sIdFechayHora) {
				sDato = true;
			} else if (tipoDato === sIdHora) {
				sDato = true;
			} else if (tipoDato === sIdDatoFijo) {
				sDato = true;
			} else if (tipoDato === sIdFormula) {
				sDato = true;
			} else if (tipoDato === sIdSintipodedato) {
				sDato = true;
			} else if (tipoDato === sIdNotificacion) {
				sDato = true;
			} else if (tipoDato === iIdMuestraCC) {
				sDato = true;
			} else if (tipoDato === iIdEntrega) {
				sDato = true;
			} else if (tipoDato === iIdLote) {
				sDato = true;
			} else if (tipoDato === iIdFechaVencimiento) {
				sDato = true;
			}
			return sDato;
		},

		onFormatoTipoDatoVisibleCheckBox: function (tipoDato) {
			let sDato = false;
			
			if (tipoDato === sIdVerificacionCheck) {
				sDato = true;
			} else if (tipoDato === sIdVistobueno) {
				sDato = true;
			} else if (tipoDato === sIdRealizadoporyVistobueno) {
				sDato = true;
			}

			return sDato;
		},

		onFormatoTipoDatoVisibleRefresh: function (tipoDato) {
			let sDato = false;
			
			if (tipoDato === iIdMuestraCC) {
				sDato = true;
			} else if (tipoDato === iIdEntrega) {
				sDato = true;
			}

			return sDato;
		},

		onFormatoTipoDatoVisibleToggleButton: function (tipoDato) {
			let sDato = false;
			
			if (tipoDato === sIdRealizadopor) {
				sDato = true;
			} else if (tipoDato === sIdRealizadoporyVistobueno) {
				sDato = true;
			}

			return sDato;
		},

		onFormatoTipoDatoVisibleToggleButtonMultiCheck: function (sTipoDato) {
			let sDato = false;
			
			if (sTipoDato === sIdMultiplecheck) {
				sDato = true;
			}

			return sDato;
		},

		onFormatoTipoDatoVisibleSaveButton: function (tipoDato) {
			let sDato = true;
			
			if (tipoDato === sIdRealizadopor) {
				sDato = false;
			} else if (tipoDato === sIdRealizadoporyVistobueno) {
				sDato = false;
			} else if (tipoDato === sIdVerificacionCheck) {
				sDato = false;
			} else if (tipoDato === sIdVistobueno) {
				sDato = false;
			} else if (tipoDato === sIdMultiplecheck) {
				sDato = false;
			} else if (tipoDato === sIdSintipodedato) {
				sDato = false;
			} else if (tipoDato === iIdMuestraCC) {
				sDato = false;
			} else if (tipoDato === iIdEntrega) {
				sDato = false;
			}

			return sDato;
		},

		onGetModifOrNoApply: function (bAplica, bModify) {
			let sText = '';
			if (bModify) {
				sText = 'Modificado';
			}

			if (!bAplica) {
				sText = '(No Aplica)';
			}

			return sText;
		},

		onGetModifOrNoApplyStyles: function (bAplica, bModify) {
			let sText = 'None';
			if (bModify) {
				sText = 'Indication03';
			}

			if (!bAplica) {
				sText = 'Indication03';
			}

			return sText;
		},

		onGetUserStyles: function (sStyleUser) {
			let obj = {
				"TextStyleNone":"None",
				"TextStyleJefe":"Indication05",
				//OFFLINE se cambia de  indicador, la libreria Kapsel-ui5 solo tiene 5 disponibles
				"TextStyleAuxiliar":"Indication04",
				"TextStyleSupervisor":"Indication02",
				// "TextStyleAuxiliar":"Indication06",
				// "TextStyleSupervisor":"Indication08",
				"TextStyleControlCalidad":"Indication01",
				"TextStyleControlProcesos":"None",
				"TextStyleUsuarioSAP":"Indication01"
			}
			return obj[sStyleUser];
		},

		onFormatoEnabledSaveButton: function (oPaso, oFuncionUsuario, aListPasos) {
			let sResponse = true;
			let responseAnt = false;

			if (oPaso.pasoId.tipoCondicionId_iMaestraId === 482 || oPaso.pasoId.tipoCondicionId_iMaestraId === 481) {
				if (oPaso.clvModelo === "SETPRE" && oPaso.pasoId.tipoCondicionId_iMaestraId === 481) { // setup pre inicio
					let pasoEncontrado = aListPasos.find(itm=>itm.clvModelo === "SETPRE" && itm.pasoId.tipoCondicionId_iMaestraId === 482 && itm.puestoTrabajo === oPaso.puestoTrabajo);
					if (pasoEncontrado) {
						if (pasoEncontrado.fechaHora){
							sResponse = false;
						} else {
							sResponse = true;
						}
					}
				} else if (oPaso.clvModelo === "SETPRE" && oPaso.pasoId.tipoCondicionId_iMaestraId === 482) { //setup pre fin
					let pasoEncontrado = aListPasos.find(itm=>itm.clvModelo === "PROCESO" && itm.pasoId.tipoCondicionId_iMaestraId === 481 && itm.puestoTrabajo === oPaso.puestoTrabajo);
					if (pasoEncontrado) {
						if (pasoEncontrado.fechaHora){
							sResponse = false;
						} else {
							sResponse = true;
						}
					}
					
					let pasoEncontradoAnt = aListPasos.find(item => item.clvModelo === "SETPRE" && item.pasoId.tipoCondicionId_iMaestraId ===481 && item.puestoTrabajo === oPaso.puestoTrabajo);
					if(pasoEncontradoAnt){
						if(pasoEncontradoAnt.fechaHora){
							responseAnt = true;
						} else {
							responseAnt = false;
						}
					}
					sResponse = (sResponse && responseAnt) ? true : false;
				} else if (oPaso.clvModelo === "PROCESO" && oPaso.pasoId.tipoCondicionId_iMaestraId === 481) { //proceso inicio
					let pasoEncontrado = aListPasos.find(itm=>itm.clvModelo === "PROCESO" && itm.pasoId.tipoCondicionId_iMaestraId === 482 && itm.puestoTrabajo === oPaso.puestoTrabajo);
					if (pasoEncontrado) {
						if (pasoEncontrado.fechaHora){
							sResponse = false;
						} else {
							sResponse = true;
						}
					}

					let pasoEncontradoAnt = aListPasos.find(item => item.clvModelo === "SETPRE" && item.pasoId.tipoCondicionId_iMaestraId ===482 && item.puestoTrabajo === oPaso.puestoTrabajo);
					if(pasoEncontradoAnt){
						if(pasoEncontradoAnt.fechaHora){
							responseAnt = true;
						} else {
							responseAnt = false;
						}
					}
					sResponse = (sResponse && responseAnt) ? true : false;
				} else if (oPaso.clvModelo === "PROCESO" && oPaso.pasoId.tipoCondicionId_iMaestraId === 482) { //proceso fin
					let pasoEncontrado = aListPasos.find(itm=>itm.clvModelo === "SETPOST" && itm.pasoId.tipoCondicionId_iMaestraId === 481 && itm.puestoTrabajo === oPaso.puestoTrabajo);
					if (pasoEncontrado) {
						if (pasoEncontrado.fechaHora){
							sResponse = false;
						} else {
							sResponse = true;
						}
					}

					let pasoEncontradoAnt = aListPasos.find(itm=>itm.clvModelo === "PROCESO" && itm.pasoId.tipoCondicionId_iMaestraId === 481 && itm.puestoTrabajo === oPaso.puestoTrabajo);
					if(pasoEncontradoAnt){
						if(pasoEncontradoAnt.fechaHora){
							responseAnt = true;
						} else {
							responseAnt = false;
						}
					}
					sResponse = (sResponse && responseAnt) ? true : false;
				} else if (oPaso.clvModelo === "SETPOST" && oPaso.pasoId.tipoCondicionId_iMaestraId === 481) { //setup post Inicio
					let pasoEncontrado = aListPasos.find(itm=>itm.clvModelo === "SETPOST" && itm.pasoId.tipoCondicionId_iMaestraId === 482 && itm.puestoTrabajo === oPaso.puestoTrabajo);
					if (pasoEncontrado) {
						if (pasoEncontrado.fechaHora){
							sResponse = false;
						} else {
							sResponse = true;
						}
					}
					let pasoEncontradoAnt = aListPasos.find(itm=>itm.clvModelo === "PROCESO" && itm.pasoId.tipoCondicionId_iMaestraId === 482 && itm.puestoTrabajo === oPaso.puestoTrabajo);
					if(pasoEncontradoAnt){
						if(pasoEncontradoAnt.fechaHora){
							responseAnt = true;
						} else {
							responseAnt = false;
						}
					}
					sResponse = (sResponse && responseAnt) ? true : false;
				} else if (oPaso.clvModelo === "SETPOST" && oPaso.pasoId.tipoCondicionId_iMaestraId === 482) { //setup post fin
					sResponse = true;

					let pasoEncontradoAnt = aListPasos.find(itm=>itm.clvModelo === "SETPOST" && itm.pasoId.tipoCondicionId_iMaestraId === 481 && itm.puestoTrabajo === oPaso.puestoTrabajo);
					if(pasoEncontradoAnt){
						if(pasoEncontradoAnt.fechaHora){
							responseAnt = true;
						} else {
							responseAnt = false;
						}
					}
					sResponse = (sResponse && responseAnt) ? true : false;
				}
			}
			if (sResponse) {
				if (oFuncionUsuario.registroCC) {
					sResponse = oPaso.estadoCC ? true : false; 
				}
				if (oFuncionUsuario.registroCP) {
					sResponse = oPaso.estadoMov ? true : false; 
				}
				if (oFuncionUsuario.registroP) {
					sResponse = true; 
				}
			}
			return sResponse;
		},

		onFormatoEnabledSaveButtonItem: function (oFuncionUsuario) {
			let sResponse = false;
			if (oFuncionUsuario.registroP) {
				sResponse = true; 
			}
			return sResponse;
		},

		onFormatoEnabledSaveButtonItemEspecificaciones: function (oFuncionUsuario, oEspecificacion) {
			let sResponse = false;
			if (oFuncionUsuario.registroCP && oEspecificacion.ensayoPadreSAP === null) {
				sResponse = true;
			}
			return sResponse;
		},

		onValidatePaso: function (aPaso) {
			let sDato = false;
			
			if (aPaso.tipoDatoId_iMaestraId === sIdTexto) {
				sDato = aPaso.texto === null || aPaso.texto === "" ? false : true;
			} else if (aPaso.tipoDatoId_iMaestraId === sIdCantidad) {
				sDato = aPaso.cantidad === null || aPaso.cantidad === "" ? false : true;
			} else if (aPaso.tipoDatoId_iMaestraId === sIdNumeros) {
				sDato = aPaso.cantidad === null || aPaso.cantidad === "" ? false : true;
			} else if (aPaso.tipoDatoId_iMaestraId === sIdFecha) {
				sDato = aPaso.fecha === null || aPaso.fecha === "" ? false : true;
			} else if (aPaso.tipoDatoId_iMaestraId === sIdFechayHora) {
				sDato = aPaso.fechaHora === null || aPaso.fechaHora === "" ? false : true;
			} else if (aPaso.tipoDatoId_iMaestraId === sIdHora) {
				sDato = aPaso.hora === null || aPaso.hora === "" ? false : true;
			} else if (aPaso.tipoDatoId_iMaestraId === sIdDatoFijo) {
				sDato = aPaso.datoFijo === null || aPaso.datoFijo === "" ? false : true;
			} else if (aPaso.tipoDatoId_iMaestraId === sIdRango) {
				sDato = aPaso.rango === null || aPaso.rango === "" ? false : true;
			} else if (aPaso.tipoDatoId_iMaestraId === sIdFormula) {
				sDato = aPaso.formula === null || aPaso.formula === "" ? false : true;
			} else if (aPaso.tipoDatoId_iMaestraId === sIdSintipodedato) {
				sDato = true;
			} else if (aPaso.tipoDatoId_iMaestraId === sIdRealizadopor) {
				sDato = aPaso.realizadoPorUser === null || aPaso.realizadoPorUser === "" ? false : true;
			} else if (aPaso.tipoDatoId_iMaestraId === sIdMultiplecheck) {
				sDato = aPaso.multiCheckUser === null || aPaso.multiCheckUser === "" ? false : true;
			} else if (aPaso.tipoDatoId_iMaestraId === sIdVistobueno) {
				//sDato = aPaso.vistoBueno === null || aPaso.vistoBueno === "" ? false : true;
				sDato = aPaso.vistoBueno === null || aPaso.vistoBueno === "" || aPaso.vistoBueno === false ? false : true;
			} else if (aPaso.tipoDatoId_iMaestraId === sIdVerificacionCheck) {
				//sDato = aPaso.verifCheck === null || aPaso.verifCheck === "" ? false : true;
				sDato = aPaso.vistoBueno === null || aPaso.vistoBueno === "" || aPaso.vistoBueno === false ? false : true;
			} else if (aPaso.tipoDatoId_iMaestraId === sIdNotificacion) {
				sDato = aPaso.fechaHora === null || aPaso.fechaHora === "" ? false : true;
			} else if (aPaso.tipoDatoId_iMaestraId === sIdRealizadoporyVistobueno) {
				let sDato1 = aPaso.realizadoPorUser !== null || aPaso.realizadoPorUser !== "" ? true : false;
				//let sDato2 = aPaso.vistoBueno !== null || aPaso.vistoBueno !== "" ? true : false;
				let sDato2 = aPaso.vistoBueno !== null || aPaso.vistoBueno !== "" || aPaso.vistoBueno !== false ? true : false;
				if (sDato1 && sDato2) {
					sDato = true;
				} else {
					sDato = false;
				}
			} else if (aPaso.tipoDatoId_iMaestraId === iIdMuestraCC) {
				sDato = aPaso.cantidad === null || aPaso.cantidad === "" ? false : true;
			} else if (aPaso.tipoDatoId_iMaestraId === iIdEntrega) {
				sDato = aPaso.cantidad === null || aPaso.cantidad === "" ? false : true;
			} else if (aPaso.tipoDatoId_iMaestraId === iIdLote) {
				sDato = aPaso.texto === null || aPaso.texto === "" ? false : true;
			} else if (aPaso.tipoDatoId_iMaestraId === iIdFechaVencimiento) {
				//sDato = aPaso.fechaHora === null || aPaso.fechaHora === "" ? false : true;
				sDato = aPaso.fecha === null || aPaso.fecha === "" ? false : true;
			}

			return sDato;
		},

		onFormatoEnabledPredecesor: function (pasoPredecesor)  {
			let sDato = true;
			//let bPasoCompletado = this.onValidatePaso(pasoPredecesor);
			let bPasoCompletado = false;
			if(!pasoPredecesor.aplica) {
				bPasoCompletado = true;
			} else if (pasoPredecesor.aplica) {
				bPasoCompletado = this.onValidatePaso(pasoPredecesor);
			}
			if(bPasoCompletado) {
				sDato = true;
			} else {
				sDato = false;
			}
			return sDato;
		},

		onEnabledNotificationManual: function (lapsoManual) {
			let bReturn = false;
			if (lapsoManual) {
				if (lapsoManual.fechaInicio && !lapsoManual.notifFinal) {
					bReturn = true;
				}
			}
			return bReturn;
		},

		numberUserInterval: function (aListPasosInterval) {
			let iNumberUser = [];
			let bFlagError = true;
			aListPasosInterval.forEach(function(oPaso){
				if (oPaso.tipoDatoId_iMaestraId === sIdRealizadopor) {
					if (oPaso.realizadoPorUser) {
						let aUsers = oPaso.realizadoPorUser.split(",");
						aUsers.forEach(function(oUser){
							let findUser = iNumberUser.find(itm=>itm === oUser);
							if (!findUser){
								iNumberUser.push(oUser);
							}
						});
					} else {
						bFlagError = false;
					}
				} else if (oPaso.tipoDatoId_iMaestraId === sIdMultiplecheck) {
					//OFFLINE MULTICHECK
					if(oPaso.multiCheckUser){
					let aUsers = oPaso.multiCheckUser.split(",");
					aUsers.forEach(function(oUser){
						let findUser = iNumberUser.find(itm=>itm === oUser);
						if (!findUser){
							iNumberUser.push(oUser);
						}
					});
					}
					//else {
					//	bFlagError = false;
					//}
				} else {
					if(oPaso.styleUser === "TextStyleAuxiliar"){
						if (oPaso.usuarioActualiza) {
							let findUser = iNumberUser.find(itm=>itm === oPaso.usuarioActualiza);
							if (!findUser){
								iNumberUser.push(oPaso.usuarioActualiza);
							}
						}
					}
				}
			});
			//if(bFlagError){
				iNumberUser = iNumberUser.filter((value, index, self) => self.indexOf(value) === index);
				return iNumberUser.length;
			//} else {
			//	return false;
			//}
		},

		obtenerCorrelativoMuestra: function(iLastCorrelativo, width) {
			let iNewCorrelativo = iLastCorrelativo + 1;
			let numberOutput = Math.abs(iNewCorrelativo);
			let length = iNewCorrelativo.toString().length;
			let zero = "0";
			
			if (width <= length) {
				if (iNewCorrelativo < 0) {
					return ("-" + numberOutput.toString()); 
				} else {
					return numberOutput.toString(); 
				}
			} else {
				if (iNewCorrelativo < 0) {
					return ("-" + (zero.repeat(width - length)) + numberOutput.toString()); 
				} else {
					return ((zero.repeat(width - length)) + numberOutput.toString()); 
				}
			}
		},

		formatFlag: function (nValue) {
			let bFlag = false;
			if (nValue === 0) {
				bFlag = false;
			} else if (nValue === 1) {
				bFlag = true;
			}

			return bFlag;
		},

		onVerifNotif: function (lapsoManual) {
			let bReturn = false;
			if (lapsoManual) {
				if (lapsoManual.fechaFin) {
					bReturn = true;
				}
			}
			return bReturn;
		},
		onStatusNotifica: function(status){
			let sReturn = "";
			if(status){
				sReturn = "NOTIFICADO"
			}else{
				sReturn = "ELIMINADO"
			}

			return sReturn;
		},
		onGetAplicaPrincipalAndPM: function (aList, oPrincipal) {
			if (oPrincipal) {
				let sResponse;
				let aPrincipal = aList.find(itm=>itm.descripcion === oPrincipal);
				let bFlag = true;
				bFlag = aPrincipal.aplica;
				let aProcesosMenores;
				if (aPrincipal.rmdEstructuraPasoId) {
					aProcesosMenores = aList.filter(itm=>itm.pasoId_rmdEstructuraPasoId === aPrincipal.rmdEstructuraPasoId);
					aProcesosMenores.forEach(function(oPM){
						if (oPM.tipoDatoId_iMaestraId !== sIdSintipodedato) {
							bFlag = oPM.aplica;
						}
					});
				}
				return sResponse = bFlag ? 'No aplica paso' : 'Si aplica paso';
			}
		},
		onGetAplicaPrincipalAndPMSigno: function (aList, oPrincipal) {
			if (oPrincipal) {
				let sResponse;
				let aPrincipal = aList.find(itm=>itm.descripcion === oPrincipal);
				let bFlag = true;
				bFlag = aPrincipal.aplica;
				let aProcesosMenores;
				if (aPrincipal.rmdEstructuraPasoId) {
					aProcesosMenores = aList.filter(itm=>itm.pasoId_rmdEstructuraPasoId === aPrincipal.rmdEstructuraPasoId);
					aProcesosMenores.forEach(function(oPM){
						if (oPM.tipoDatoId_iMaestraId !== sIdSintipodedato) {
							bFlag = oPM.aplica;
						}
					});
				}
				return sResponse = bFlag ? 'sap-icon://less' : 'sap-icon://add';
			}
		},
		onGetTableFormatterLines: function(TipoTable){
			switch(TipoTable){
				case "PROCEDIMIENTO": 
					var aProcesoTable = {};
					aProcesoTable.aProcedimiento = [{
								width: "55%",
								hAlign: "Left",
								vAlign: "Middle",
								minScreenWidth: "Tablet",
								demandPopin: "true",
								popinDisplay: "Inline",
								header: "Product Name",
								demandPopin: false,
								minScreenWidth: "",
								styleClass: "cellBorderLeft cellBorderRight"
							}, {
								width: "15%",
								hAlign: "Center",
								vAlign: "Middle",
								minScreenWidth: "Tablet",
								demandPopin: "true",
								popinDisplay: "Inline",
								header: "Supplier Name",
								demandPopin: false,
								minScreenWidth: "",
								styleClass: "cellBorderRight"
							},{
								width: "15%",
								hAlign: "Center",
								vAlign: "Middle",
								minScreenWidth: "Tablet",
								demandPopin: "true",
								popinDisplay: "Inline",
								header: "Supplier Name",
								demandPopin: false,
								minScreenWidth: "",
								styleClass: "cellBorderRight"
							}, {
								width: "15%",
								hAlign: "Left",
								vAlign: "Middle",
								minScreenWidth: "Tablet",
								demandPopin: "true",
								popinDisplay: "Inline",
								header: "Description",
								demandPopin: true,
								minScreenWidth: "Tablet",
								styleClass: "cellBorderRight"
							}
						]
						return aProcesoTable;
			  default:
				break;
			}
		},
		//OFFLINE CAMBIO
		onSincrorniceOffline:function(sRegistro){
			let output;
			if(sRegistro === "" || !sRegistro){
				output = "pendiente (Sincronizar)";
			}else{
				output = sRegistro;
			}
			return output;
		},
		onSincrorniceOffline2:function(orden,rueck){
			let output;
			if(rueck===""){
				output = orden + " (Pendiente Sincronizar)"
			}else{
				output = orden;
			}
			return output;
		},
		onSincrorniceOfflineAviso:function(QMNUM,tipo){
			let output;
			if(QMNUM === "" || !QMNUM){
				if(tipo === "Afectado"){
					output = QMNUM;
				}else{
					output = "pendiente (Sincronizar)";
				}
			}else{
				output = QMNUM;
			}
			return output;
		},
		onFormatcolor:function(sTipo){
			let output;
			if(sTipo === "ONLINE"){
				output= "#008000";
			}else{
				output= "#808080";
			}
		}
	};
});