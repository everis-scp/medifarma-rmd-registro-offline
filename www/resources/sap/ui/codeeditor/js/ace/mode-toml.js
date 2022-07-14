ace.define("ace/mode/toml_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(r,e,m){"use strict";var o=r("../lib/oop");var T=r("./text_highlight_rules").TextHighlightRules;var a=function(){var k=this.createKeywordMapper({"constant.language.boolean":"true|false"},"identifier");var i="[a-zA-Z\\$_\u00a1-\uffff][a-zA-Z\\d\\$_\u00a1-\uffff]*\\b";this.$rules={"start":[{token:"comment.toml",regex:/#.*$/},{token:"string",regex:'"(?=.)',next:"qqstring"},{token:["variable.keygroup.toml"],regex:"(?:^\\s*)(\\[\\[([^\\]]+)\\]\\])"},{token:["variable.keygroup.toml"],regex:"(?:^\\s*)(\\[([^\\]]+)\\])"},{token:k,regex:i},{token:"support.date.toml",regex:"\\d{4}-\\d{2}-\\d{2}(T)\\d{2}:\\d{2}:\\d{2}(Z)"},{token:"constant.numeric.toml",regex:"-?\\d+(\\.?\\d+)?"}],"qqstring":[{token:"string",regex:"\\\\$",next:"qqstring"},{token:"constant.language.escape",regex:'\\\\[0tnr"\\\\]'},{token:"string",regex:'"|$',next:"start"},{defaultToken:"string"}]};};o.inherits(a,T);e.TomlHighlightRules=a;});ace.define("ace/mode/folding/ini",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"],function(r,e,a){"use strict";var o=r("../../lib/oop");var R=r("../../range").Range;var B=r("./fold_mode").FoldMode;var F=e.FoldMode=function(){};o.inherits(F,B);(function(){this.foldingStartMarker=/^\s*\[([^\])]*)]\s*(?:$|[;#])/;this.getFoldWidgetRange=function(s,f,b){var c=this.foldingStartMarker;var l=s.getLine(b);var m=l.match(c);if(!m)return;var d=m[1]+".";var g=l.length;var h=s.getLength();var i=b;var j=b;while(++b<h){l=s.getLine(b);if(/^\s*$/.test(l))continue;m=l.match(c);if(m&&m[1].lastIndexOf(d,0)!==0)break;j=b;}if(j>i){var k=s.getLine(j).length;return new R(i,g,j,k);}};}).call(F.prototype);});ace.define("ace/mode/toml",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/toml_highlight_rules","ace/mode/folding/ini"],function(r,e,m){"use strict";var o=r("../lib/oop");var T=r("./text").Mode;var a=r("./toml_highlight_rules").TomlHighlightRules;var F=r("./folding/ini").FoldMode;var M=function(){this.HighlightRules=a;this.foldingRules=new F();this.$behaviour=this.$defaultBehaviour;};o.inherits(M,T);(function(){this.lineCommentStart="#";this.$id="ace/mode/toml";}).call(M.prototype);e.Mode=M;});(function(){ace.require(["ace/mode/toml"],function(m){if(typeof module=="object"&&typeof exports=="object"&&module){module.exports=m;}});})();
