sap.ui.define(["sap/ui/webc/common/thirdparty/base/UI5Element","sap/ui/webc/common/thirdparty/base/renderer/LitRenderer","sap/ui/webc/common/thirdparty/base/types/Integer","sap/ui/webc/common/thirdparty/base/Keys","sap/ui/webc/common/thirdparty/base/i18nBundle","sap/ui/webc/common/thirdparty/base/delegate/ScrollEnablement","sap/ui/webc/common/thirdparty/base/delegate/ResizeHandler","sap/ui/webc/common/thirdparty/base/Render","sap/ui/webc/common/thirdparty/base/Device","sap/ui/webc/common/thirdparty/base/types/AnimationMode","sap/ui/webc/common/thirdparty/base/config/AnimationMode","./generated/i18n/i18n-defaults","./types/CarouselArrowsPlacement","./generated/templates/CarouselTemplate.lit","sap/ui/webc/common/thirdparty/icons/slim-arrow-left","sap/ui/webc/common/thirdparty/icons/slim-arrow-right","./Button","./Label","./generated/themes/Carousel.css"],function(e,t,i,s,n,a,r,o,h,d,c,u,l,g,f,m,p,_,v){"use strict";function I(e){return e&&typeof e==="object"&&"default"in e?e["default"]:e}var w=I(e);var P=I(t);var x=I(i);var y=I(a);var b=I(r);var R=I(d);const A={tag:"ui5-carousel",languageAware:true,properties:{cyclic:{type:Boolean},itemsPerPageS:{type:x,defaultValue:1},itemsPerPageM:{type:x,defaultValue:1},itemsPerPageL:{type:x,defaultValue:1},hideNavigationArrows:{type:Boolean},hidePageIndicator:{type:Boolean},_selectedIndex:{type:x,defaultValue:0},arrowsPlacement:{type:l,defaultValue:l.Content},_width:{type:x},_itemWidth:{type:x},_visibleNavigationArrows:{type:Boolean,noAttribute:true}},managedSlots:true,slots:{default:{propertyName:"content",type:HTMLElement,individualSlots:true}},events:{navigate:{detail:{selectedIndex:{type:x}}}}};class L extends w{static get metadata(){return A}static get render(){return P}static get styles(){return v}static get template(){return g}static get pageTypeLimit(){return 9}constructor(){super();this._scrollEnablement=new y(this);this._scrollEnablement.attachEvent("touchend",e=>{this._updateScrolling(e)});this.i18nBundle=n.getI18nBundle("@ui5/webcomponents");this._onResizeBound=this._onResize.bind(this);this._resizing=false;this._lastFocusedElements=[];this._orderOfLastFocusedPages=[]}onBeforeRendering(){if(this.arrowsPlacement===l.Navigation){this._visibleNavigationArrows=true}this.validateSelectedIndex()}onAfterRendering(){this._scrollEnablement.scrollContainer=this.getDomRef();this._resizing=false}onEnterDOM(){b.register(this,this._onResizeBound)}onExitDOM(){b.deregister(this,this._onResizeBound)}validateSelectedIndex(){if(!this.isIndexInRange(this._selectedIndex)){this._selectedIndex=0}}_onResize(){const e=this.effectiveItemsPerPage;this._resizing=true;this._width=this.offsetWidth;this._itemWidth=Math.floor(this._width/this.effectiveItemsPerPage);if(this.effectiveItemsPerPage===e){return}if(this._selectedIndex>this.pagesCount-1){this._selectedIndex=this.pagesCount-1;this.fireEvent("navigate",{selectedIndex:this._selectedIndex})}}_updateScrolling(e){if(!e){return}if(e.isLeft){this.navigateLeft()}else if(e.isRight){this.navigateRight()}}async _onkeydown(e){if(s.isF7(e)){this._handleF7Key(e);return}if(e.target!==this.getDomRef()){return}if(s.isLeft(e)||s.isDown(e)){this.navigateLeft();await o.renderFinished();this.getDomRef().focus()}else if(s.isRight(e)||s.isUp(e)){this.navigateRight();await o.renderFinished();this.getDomRef().focus()}}_onfocusin(e){if(e.target===this.getDomRef()){return}let t=-1;for(let i=0;i<this.content.length;i++){if(this.content[i].contains(e.target)){t=i;break}}if(t===-1){return}this._lastFocusedElements[t]=e.target;const i=this._orderOfLastFocusedPages.indexOf(t);if(i===-1){this._orderOfLastFocusedPages.unshift(t)}else{this._orderOfLastFocusedPages.splice(0,0,this._orderOfLastFocusedPages.splice(i,1)[0])}}_onmouseout(){if(this.arrowsPlacement===l.Content){this._visibleNavigationArrows=false}}_onmouseover(){if(this.arrowsPlacement===l.Content){this._visibleNavigationArrows=true}}_handleF7Key(e){const t=this._lastFocusedElements[this._getLastFocusedActivePageIndex];if(e.target===this.getDomRef()&&t){t.focus()}else{this.getDomRef().focus()}}get _getLastFocusedActivePageIndex(){for(let e=0;e<this._orderOfLastFocusedPages.length;e++){const t=this._orderOfLastFocusedPages[e];if(this.isItemInViewport(t)){return t}}return this._selectedIndex}navigateLeft(){this._resizing=false;const e=this._selectedIndex;if(this._selectedIndex-1<0){if(this.cyclic){this._selectedIndex=this.pagesCount-1}}else{--this._selectedIndex}if(e!==this._selectedIndex){this.fireEvent("navigate",{selectedIndex:this._selectedIndex})}}navigateRight(){this._resizing=false;const e=this._selectedIndex;if(this._selectedIndex+1>this.pagesCount-1){if(this.cyclic){this._selectedIndex=0}else{return}}else{++this._selectedIndex}if(e!==this._selectedIndex){this.fireEvent("navigate",{selectedIndex:this._selectedIndex})}}navigateTo(e){this._resizing=false;this._selectedIndex=e}get items(){return this.content.map((e,t)=>{const i=this.isItemInViewport(t);return{id:`${this._id}-carousel-item-${t+1}`,item:e,tabIndex:i?"0":"-1",posinset:t+1,setsize:this.content.length,width:this._itemWidth,classes:i?"":"ui5-carousel-item--hidden"}})}get effectiveItemsPerPage(){if(this._width<=640){return this.itemsPerPageS}if(this._width<=1024){return this.itemsPerPageM}return this.itemsPerPageL}isItemInViewport(e){return e>=this._selectedIndex&&e<=this._selectedIndex+this.effectiveItemsPerPage-1}isIndexInRange(e){return e>=0&&e<=this.pagesCount-1}get renderNavigation(){if(!this.hasManyPages){return false}if(this.arrowsPlacement===l.Navigation&&!this.hideNavigationArrows){return true}if(this.hidePageIndicator){return false}return true}get hasManyPages(){return this.pagesCount>1}get styles(){return{content:{transform:`translateX(${this._isRTL?"":"-"}${this._selectedIndex*this._itemWidth}px`}}}get classes(){return{viewport:{"ui5-carousel-viewport":true,"ui5-carousel-viewport--single":this.pagesCount===1},content:{"ui5-carousel-content":true,"ui5-carousel-content-no-animation":this.suppressAnimation,"ui5-carousel-content-has-navigation":this.renderNavigation,"ui5-carousel-content-has-navigation-and-buttons":this.renderNavigation&&this.arrowsPlacement===l.Navigation&&!this.hideNavigationArrows},navigation:{"ui5-carousel-navigation-wrapper":true,"ui5-carousel-navigation-with-buttons":this.renderNavigation&&this.arrowsPlacement===l.Navigation&&!this.hideNavigationArrows},navPrevButton:{"ui5-carousel-navigation-button--hidden":!this.hasPrev},navNextButton:{"ui5-carousel-navigation-button--hidden":!this.hasNext}}}get pagesCount(){const e=this.content.length;return e>this.effectiveItemsPerPage?e-this.effectiveItemsPerPage+1:1}get isPageTypeDots(){return this.pagesCount<L.pageTypeLimit}get dots(){const e=[];const t=this.pagesCount;for(let i=0;i<t;i++){e.push({active:i===this._selectedIndex,ariaLabel:this.i18nBundle.getText(u.CAROUSEL_DOT_TEXT,[i+1],[t])})}return e}get arrows(){const e=this._visibleNavigationArrows&&this.hasManyPages&&h.isDesktop();return{content:!this.hideNavigationArrows&&e&&this.arrowsPlacement===l.Content,navigation:!this.hideNavigationArrows&&e&&this.arrowsPlacement===l.Navigation}}get hasPrev(){return this.cyclic||this._selectedIndex-1>=0}get hasNext(){return this.cyclic||this._selectedIndex+1<=this.pagesCount-1}get suppressAnimation(){return this._resizing||c.getAnimationMode()===R.None}get _isRTL(){return this.effectiveDir==="rtl"}get selectedIndexToShow(){return this._isRTL?this.pagesCount-(this.pagesCount-this._selectedIndex)+1:this._selectedIndex+1}get ofText(){return this.i18nBundle.getText(u.CAROUSEL_OF_TEXT)}get ariaActiveDescendant(){return this.content.length?`${this._id}-carousel-item-${this._selectedIndex+1}`:undefined}get nextPageText(){return this.i18nBundle.getText(u.CAROUSEL_NEXT_ARROW_TEXT)}get previousPageText(){return this.i18nBundle.getText(u.CAROUSEL_PREVIOUS_ARROW_TEXT)}get visibleItemsIndices(){const e=[];this.items.forEach((t,i)=>{if(this.isItemInViewport(i)){e.push(i)}});return e}static get dependencies(){return[p,_]}static async onDefine(){await n.fetchI18nBundle("@ui5/webcomponents")}}L.define();return L});