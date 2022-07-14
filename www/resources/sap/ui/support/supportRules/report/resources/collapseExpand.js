/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
window.sapUiSupportReport=window.sapUiSupportReport||{};window.sapUiSupportReport.collapseExpand=(function(){'use strict';function c(e){var t=this.getAttribute('data-expandableElement');var b=document.getElementById(t);var d=b.classList.contains('collapsed');if(d){b.classList.remove('collapsed');b.classList.add('expanded');this.classList.remove('collapsed-content');this.classList.add('expanded-content');}else{b.classList.remove('expanded');b.classList.add('collapsed');this.classList.remove('expanded-content');this.classList.add('collapsed-content');}}function a(){try{var e=document.getElementsByClassName('expandable-control');if(!e){return;}for(var i=0;i<e.length;i++){e[i].addEventListener('click',c);var b=e[i].getAttribute('data-expandableElement');var d=document.getElementById(b);if(e[i].classList.contains('collapsed-content')){d.classList.add('collapsed');}else{d.classList.add('expanded');}e[i].style='cursor: pointer;';}}catch(f){console.log('There was a problem initializing collapse/expand functionality.');}}return{init:a};}());
