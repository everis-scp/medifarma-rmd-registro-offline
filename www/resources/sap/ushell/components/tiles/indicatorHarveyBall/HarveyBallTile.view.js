// Copyright (c) 2009-2017 SAP SE, All Rights Reserved
sap.ui.require(["sap/ca/ui/model/format/NumberFormat","sap/ui/model/analytics/odata4analytics","sap/ushell/components/tiles/indicatorTileUtils/smartBusinessUtil","sap/suite/ui/commons/HarveyBallMicroChart","sap/suite/ui/commons/HarveyBallMicroChartItem","sap/suite/ui/commons/TileContent","sap/suite/ui/commons/GenericTile"],function(N,o,s,H,a,T,G){"use strict";sap.ui.getCore().loadLibrary("sap.suite.ui.commons");sap.ui.jsview("tiles.indicatorHarveyBall.HarveyBallTile",{getControllerName:function(){},createContent:function(){var m=new H({total:"{/value}",size:"{/size}",totalLabel:"{/totalLabel}",items:[new a({fraction:"{/fractionValue}",fractionLabel:"{/fractionLabel}",color:"{/color}"})]});var t=new T({size:"{/size}",content:m});this.oTile=new G({subheader:"{/subheader}",frameType:"{/frameType}",size:"{/size}",header:"{/header}",tileContent:[t]});}});});