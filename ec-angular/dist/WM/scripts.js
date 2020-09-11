/*! jQuery v3.4.1 | (c) JS Foundation and other contributors | jquery.org/license */
!function(e,t){"use strict";"object"==typeof module&&"object"==typeof module.exports?module.exports=e.document?t(e,!0):function(e){if(!e.document)throw new Error("jQuery requires a window with a document");return t(e)}:t(e)}("undefined"!=typeof window?window:this,function(C,e){"use strict";var t=[],E=C.document,r=Object.getPrototypeOf,s=t.slice,g=t.concat,u=t.push,i=t.indexOf,n={},o=n.toString,v=n.hasOwnProperty,a=v.toString,l=a.call(Object),y={},m=function(e){return"function"==typeof e&&"number"!=typeof e.nodeType},x=function(e){return null!=e&&e===e.window},c={type:!0,src:!0,nonce:!0,noModule:!0};function b(e,t,n){var r,i,o=(n=n||E).createElement("script");if(o.text=e,t)for(r in c)(i=t[r]||t.getAttribute&&t.getAttribute(r))&&o.setAttribute(r,i);n.head.appendChild(o).parentNode.removeChild(o)}function w(e){return null==e?e+"":"object"==typeof e||"function"==typeof e?n[o.call(e)]||"object":typeof e}var f="3.4.1",k=function(e,t){return new k.fn.init(e,t)},p=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;function d(e){var t=!!e&&"length"in e&&e.length,n=w(e);return!m(e)&&!x(e)&&("array"===n||0===t||"number"==typeof t&&0<t&&t-1 in e)}k.fn=k.prototype={jquery:f,constructor:k,length:0,toArray:function(){return s.call(this)},get:function(e){return null==e?s.call(this):e<0?this[e+this.length]:this[e]},pushStack:function(e){var t=k.merge(this.constructor(),e);return t.prevObject=this,t},each:function(e){return k.each(this,e)},map:function(n){return this.pushStack(k.map(this,function(e,t){return n.call(e,t,e)}))},slice:function(){return this.pushStack(s.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(e){var t=this.length,n=+e+(e<0?t:0);return this.pushStack(0<=n&&n<t?[this[n]]:[])},end:function(){return this.prevObject||this.constructor()},push:u,sort:t.sort,splice:t.splice},k.extend=k.fn.extend=function(){var e,t,n,r,i,o,a=arguments[0]||{},s=1,u=arguments.length,l=!1;for("boolean"==typeof a&&(l=a,a=arguments[s]||{},s++),"object"==typeof a||m(a)||(a={}),s===u&&(a=this,s--);s<u;s++)if(null!=(e=arguments[s]))for(t in e)r=e[t],"__proto__"!==t&&a!==r&&(l&&r&&(k.isPlainObject(r)||(i=Array.isArray(r)))?(n=a[t],o=i&&!Array.isArray(n)?[]:i||k.isPlainObject(n)?n:{},i=!1,a[t]=k.extend(l,o,r)):void 0!==r&&(a[t]=r));return a},k.extend({expando:"jQuery"+(f+Math.random()).replace(/\D/g,""),isReady:!0,error:function(e){throw new Error(e)},noop:function(){},isPlainObject:function(e){var t,n;return!(!e||"[object Object]"!==o.call(e))&&(!(t=r(e))||"function"==typeof(n=v.call(t,"constructor")&&t.constructor)&&a.call(n)===l)},isEmptyObject:function(e){var t;for(t in e)return!1;return!0},globalEval:function(e,t){b(e,{nonce:t&&t.nonce})},each:function(e,t){var n,r=0;if(d(e)){for(n=e.length;r<n;r++)if(!1===t.call(e[r],r,e[r]))break}else for(r in e)if(!1===t.call(e[r],r,e[r]))break;return e},trim:function(e){return null==e?"":(e+"").replace(p,"")},makeArray:function(e,t){var n=t||[];return null!=e&&(d(Object(e))?k.merge(n,"string"==typeof e?[e]:e):u.call(n,e)),n},inArray:function(e,t,n){return null==t?-1:i.call(t,e,n)},merge:function(e,t){for(var n=+t.length,r=0,i=e.length;r<n;r++)e[i++]=t[r];return e.length=i,e},grep:function(e,t,n){for(var r=[],i=0,o=e.length,a=!n;i<o;i++)!t(e[i],i)!==a&&r.push(e[i]);return r},map:function(e,t,n){var r,i,o=0,a=[];if(d(e))for(r=e.length;o<r;o++)null!=(i=t(e[o],o,n))&&a.push(i);else for(o in e)null!=(i=t(e[o],o,n))&&a.push(i);return g.apply([],a)},guid:1,support:y}),"function"==typeof Symbol&&(k.fn[Symbol.iterator]=t[Symbol.iterator]),k.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),function(e,t){n["[object "+t+"]"]=t.toLowerCase()});var h=function(n){var e,d,b,o,i,h,f,g,w,u,l,T,C,a,E,v,s,c,y,k="sizzle"+1*new Date,m=n.document,S=0,r=0,p=ue(),x=ue(),N=ue(),A=ue(),D=function(e,t){return e===t&&(l=!0),0},j={}.hasOwnProperty,t=[],q=t.pop,L=t.push,H=t.push,O=t.slice,P=function(e,t){for(var n=0,r=e.length;n<r;n++)if(e[n]===t)return n;return-1},R="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",M="[\\x20\\t\\r\\n\\f]",I="(?:\\\\.|[\\w-]|[^\0-\\xa0])+",W="\\["+M+"*("+I+")(?:"+M+"*([*^$|!~]?=)"+M+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+I+"))|)"+M+"*\\]",$=":("+I+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+W+")*)|.*)\\)|)",F=new RegExp(M+"+","g"),B=new RegExp("^"+M+"+|((?:^|[^\\\\])(?:\\\\.)*)"+M+"+$","g"),_=new RegExp("^"+M+"*,"+M+"*"),z=new RegExp("^"+M+"*([>+~]|"+M+")"+M+"*"),U=new RegExp(M+"|>"),X=new RegExp($),V=new RegExp("^"+I+"$"),G={ID:new RegExp("^#("+I+")"),CLASS:new RegExp("^\\.("+I+")"),TAG:new RegExp("^("+I+"|[*])"),ATTR:new RegExp("^"+W),PSEUDO:new RegExp("^"+$),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+M+"*(even|odd|(([+-]|)(\\d*)n|)"+M+"*(?:([+-]|)"+M+"*(\\d+)|))"+M+"*\\)|)","i"),bool:new RegExp("^(?:"+R+")$","i"),needsContext:new RegExp("^"+M+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+M+"*((?:-\\d)?\\d*)"+M+"*\\)|)(?=[^-]|$)","i")},Y=/HTML$/i,Q=/^(?:input|select|textarea|button)$/i,J=/^h\d$/i,K=/^[^{]+\{\s*\[native \w/,Z=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,ee=/[+~]/,te=new RegExp("\\\\([\\da-f]{1,6}"+M+"?|("+M+")|.)","ig"),ne=function(e,t,n){var r="0x"+t-65536;return r!=r||n?t:r<0?String.fromCharCode(r+65536):String.fromCharCode(r>>10|55296,1023&r|56320)},re=/([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,ie=function(e,t){return t?"\0"===e?"\ufffd":e.slice(0,-1)+"\\"+e.charCodeAt(e.length-1).toString(16)+" ":"\\"+e},oe=function(){T()},ae=be(function(e){return!0===e.disabled&&"fieldset"===e.nodeName.toLowerCase()},{dir:"parentNode",next:"legend"});try{H.apply(t=O.call(m.childNodes),m.childNodes),t[m.childNodes.length].nodeType}catch(e){H={apply:t.length?function(e,t){L.apply(e,O.call(t))}:function(e,t){var n=e.length,r=0;while(e[n++]=t[r++]);e.length=n-1}}}function se(t,e,n,r){var i,o,a,s,u,l,c,f=e&&e.ownerDocument,p=e?e.nodeType:9;if(n=n||[],"string"!=typeof t||!t||1!==p&&9!==p&&11!==p)return n;if(!r&&((e?e.ownerDocument||e:m)!==C&&T(e),e=e||C,E)){if(11!==p&&(u=Z.exec(t)))if(i=u[1]){if(9===p){if(!(a=e.getElementById(i)))return n;if(a.id===i)return n.push(a),n}else if(f&&(a=f.getElementById(i))&&y(e,a)&&a.id===i)return n.push(a),n}else{if(u[2])return H.apply(n,e.getElementsByTagName(t)),n;if((i=u[3])&&d.getElementsByClassName&&e.getElementsByClassName)return H.apply(n,e.getElementsByClassName(i)),n}if(d.qsa&&!A[t+" "]&&(!v||!v.test(t))&&(1!==p||"object"!==e.nodeName.toLowerCase())){if(c=t,f=e,1===p&&U.test(t)){(s=e.getAttribute("id"))?s=s.replace(re,ie):e.setAttribute("id",s=k),o=(l=h(t)).length;while(o--)l[o]="#"+s+" "+xe(l[o]);c=l.join(","),f=ee.test(t)&&ye(e.parentNode)||e}try{return H.apply(n,f.querySelectorAll(c)),n}catch(e){A(t,!0)}finally{s===k&&e.removeAttribute("id")}}}return g(t.replace(B,"$1"),e,n,r)}function ue(){var r=[];return function e(t,n){return r.push(t+" ")>b.cacheLength&&delete e[r.shift()],e[t+" "]=n}}function le(e){return e[k]=!0,e}function ce(e){var t=C.createElement("fieldset");try{return!!e(t)}catch(e){return!1}finally{t.parentNode&&t.parentNode.removeChild(t),t=null}}function fe(e,t){var n=e.split("|"),r=n.length;while(r--)b.attrHandle[n[r]]=t}function pe(e,t){var n=t&&e,r=n&&1===e.nodeType&&1===t.nodeType&&e.sourceIndex-t.sourceIndex;if(r)return r;if(n)while(n=n.nextSibling)if(n===t)return-1;return e?1:-1}function de(t){return function(e){return"input"===e.nodeName.toLowerCase()&&e.type===t}}function he(n){return function(e){var t=e.nodeName.toLowerCase();return("input"===t||"button"===t)&&e.type===n}}function ge(t){return function(e){return"form"in e?e.parentNode&&!1===e.disabled?"label"in e?"label"in e.parentNode?e.parentNode.disabled===t:e.disabled===t:e.isDisabled===t||e.isDisabled!==!t&&ae(e)===t:e.disabled===t:"label"in e&&e.disabled===t}}function ve(a){return le(function(o){return o=+o,le(function(e,t){var n,r=a([],e.length,o),i=r.length;while(i--)e[n=r[i]]&&(e[n]=!(t[n]=e[n]))})})}function ye(e){return e&&"undefined"!=typeof e.getElementsByTagName&&e}for(e in d=se.support={},i=se.isXML=function(e){var t=e.namespaceURI,n=(e.ownerDocument||e).documentElement;return!Y.test(t||n&&n.nodeName||"HTML")},T=se.setDocument=function(e){var t,n,r=e?e.ownerDocument||e:m;return r!==C&&9===r.nodeType&&r.documentElement&&(a=(C=r).documentElement,E=!i(C),m!==C&&(n=C.defaultView)&&n.top!==n&&(n.addEventListener?n.addEventListener("unload",oe,!1):n.attachEvent&&n.attachEvent("onunload",oe)),d.attributes=ce(function(e){return e.className="i",!e.getAttribute("className")}),d.getElementsByTagName=ce(function(e){return e.appendChild(C.createComment("")),!e.getElementsByTagName("*").length}),d.getElementsByClassName=K.test(C.getElementsByClassName),d.getById=ce(function(e){return a.appendChild(e).id=k,!C.getElementsByName||!C.getElementsByName(k).length}),d.getById?(b.filter.ID=function(e){var t=e.replace(te,ne);return function(e){return e.getAttribute("id")===t}},b.find.ID=function(e,t){if("undefined"!=typeof t.getElementById&&E){var n=t.getElementById(e);return n?[n]:[]}}):(b.filter.ID=function(e){var n=e.replace(te,ne);return function(e){var t="undefined"!=typeof e.getAttributeNode&&e.getAttributeNode("id");return t&&t.value===n}},b.find.ID=function(e,t){if("undefined"!=typeof t.getElementById&&E){var n,r,i,o=t.getElementById(e);if(o){if((n=o.getAttributeNode("id"))&&n.value===e)return[o];i=t.getElementsByName(e),r=0;while(o=i[r++])if((n=o.getAttributeNode("id"))&&n.value===e)return[o]}return[]}}),b.find.TAG=d.getElementsByTagName?function(e,t){return"undefined"!=typeof t.getElementsByTagName?t.getElementsByTagName(e):d.qsa?t.querySelectorAll(e):void 0}:function(e,t){var n,r=[],i=0,o=t.getElementsByTagName(e);if("*"===e){while(n=o[i++])1===n.nodeType&&r.push(n);return r}return o},b.find.CLASS=d.getElementsByClassName&&function(e,t){if("undefined"!=typeof t.getElementsByClassName&&E)return t.getElementsByClassName(e)},s=[],v=[],(d.qsa=K.test(C.querySelectorAll))&&(ce(function(e){a.appendChild(e).innerHTML="<a id='"+k+"'></a><select id='"+k+"-\r\\' msallowcapture=''><option selected=''></option></select>",e.querySelectorAll("[msallowcapture^='']").length&&v.push("[*^$]="+M+"*(?:''|\"\")"),e.querySelectorAll("[selected]").length||v.push("\\["+M+"*(?:value|"+R+")"),e.querySelectorAll("[id~="+k+"-]").length||v.push("~="),e.querySelectorAll(":checked").length||v.push(":checked"),e.querySelectorAll("a#"+k+"+*").length||v.push(".#.+[+~]")}),ce(function(e){e.innerHTML="<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";var t=C.createElement("input");t.setAttribute("type","hidden"),e.appendChild(t).setAttribute("name","D"),e.querySelectorAll("[name=d]").length&&v.push("name"+M+"*[*^$|!~]?="),2!==e.querySelectorAll(":enabled").length&&v.push(":enabled",":disabled"),a.appendChild(e).disabled=!0,2!==e.querySelectorAll(":disabled").length&&v.push(":enabled",":disabled"),e.querySelectorAll("*,:x"),v.push(",.*:")})),(d.matchesSelector=K.test(c=a.matches||a.webkitMatchesSelector||a.mozMatchesSelector||a.oMatchesSelector||a.msMatchesSelector))&&ce(function(e){d.disconnectedMatch=c.call(e,"*"),c.call(e,"[s!='']:x"),s.push("!=",$)}),v=v.length&&new RegExp(v.join("|")),s=s.length&&new RegExp(s.join("|")),t=K.test(a.compareDocumentPosition),y=t||K.test(a.contains)?function(e,t){var n=9===e.nodeType?e.documentElement:e,r=t&&t.parentNode;return e===r||!(!r||1!==r.nodeType||!(n.contains?n.contains(r):e.compareDocumentPosition&&16&e.compareDocumentPosition(r)))}:function(e,t){if(t)while(t=t.parentNode)if(t===e)return!0;return!1},D=t?function(e,t){if(e===t)return l=!0,0;var n=!e.compareDocumentPosition-!t.compareDocumentPosition;return n||(1&(n=(e.ownerDocument||e)===(t.ownerDocument||t)?e.compareDocumentPosition(t):1)||!d.sortDetached&&t.compareDocumentPosition(e)===n?e===C||e.ownerDocument===m&&y(m,e)?-1:t===C||t.ownerDocument===m&&y(m,t)?1:u?P(u,e)-P(u,t):0:4&n?-1:1)}:function(e,t){if(e===t)return l=!0,0;var n,r=0,i=e.parentNode,o=t.parentNode,a=[e],s=[t];if(!i||!o)return e===C?-1:t===C?1:i?-1:o?1:u?P(u,e)-P(u,t):0;if(i===o)return pe(e,t);n=e;while(n=n.parentNode)a.unshift(n);n=t;while(n=n.parentNode)s.unshift(n);while(a[r]===s[r])r++;return r?pe(a[r],s[r]):a[r]===m?-1:s[r]===m?1:0}),C},se.matches=function(e,t){return se(e,null,null,t)},se.matchesSelector=function(e,t){if((e.ownerDocument||e)!==C&&T(e),d.matchesSelector&&E&&!A[t+" "]&&(!s||!s.test(t))&&(!v||!v.test(t)))try{var n=c.call(e,t);if(n||d.disconnectedMatch||e.document&&11!==e.document.nodeType)return n}catch(e){A(t,!0)}return 0<se(t,C,null,[e]).length},se.contains=function(e,t){return(e.ownerDocument||e)!==C&&T(e),y(e,t)},se.attr=function(e,t){(e.ownerDocument||e)!==C&&T(e);var n=b.attrHandle[t.toLowerCase()],r=n&&j.call(b.attrHandle,t.toLowerCase())?n(e,t,!E):void 0;return void 0!==r?r:d.attributes||!E?e.getAttribute(t):(r=e.getAttributeNode(t))&&r.specified?r.value:null},se.escape=function(e){return(e+"").replace(re,ie)},se.error=function(e){throw new Error("Syntax error, unrecognized expression: "+e)},se.uniqueSort=function(e){var t,n=[],r=0,i=0;if(l=!d.detectDuplicates,u=!d.sortStable&&e.slice(0),e.sort(D),l){while(t=e[i++])t===e[i]&&(r=n.push(i));while(r--)e.splice(n[r],1)}return u=null,e},o=se.getText=function(e){var t,n="",r=0,i=e.nodeType;if(i){if(1===i||9===i||11===i){if("string"==typeof e.textContent)return e.textContent;for(e=e.firstChild;e;e=e.nextSibling)n+=o(e)}else if(3===i||4===i)return e.nodeValue}else while(t=e[r++])n+=o(t);return n},(b=se.selectors={cacheLength:50,createPseudo:le,match:G,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){return e[1]=e[1].replace(te,ne),e[3]=(e[3]||e[4]||e[5]||"").replace(te,ne),"~="===e[2]&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(e){return e[1]=e[1].toLowerCase(),"nth"===e[1].slice(0,3)?(e[3]||se.error(e[0]),e[4]=+(e[4]?e[5]+(e[6]||1):2*("even"===e[3]||"odd"===e[3])),e[5]=+(e[7]+e[8]||"odd"===e[3])):e[3]&&se.error(e[0]),e},PSEUDO:function(e){var t,n=!e[6]&&e[2];return G.CHILD.test(e[0])?null:(e[3]?e[2]=e[4]||e[5]||"":n&&X.test(n)&&(t=h(n,!0))&&(t=n.indexOf(")",n.length-t)-n.length)&&(e[0]=e[0].slice(0,t),e[2]=n.slice(0,t)),e.slice(0,3))}},filter:{TAG:function(e){var t=e.replace(te,ne).toLowerCase();return"*"===e?function(){return!0}:function(e){return e.nodeName&&e.nodeName.toLowerCase()===t}},CLASS:function(e){var t=p[e+" "];return t||(t=new RegExp("(^|"+M+")"+e+"("+M+"|$)"))&&p(e,function(e){return t.test("string"==typeof e.className&&e.className||"undefined"!=typeof e.getAttribute&&e.getAttribute("class")||"")})},ATTR:function(n,r,i){return function(e){var t=se.attr(e,n);return null==t?"!="===r:!r||(t+="","="===r?t===i:"!="===r?t!==i:"^="===r?i&&0===t.indexOf(i):"*="===r?i&&-1<t.indexOf(i):"$="===r?i&&t.slice(-i.length)===i:"~="===r?-1<(" "+t.replace(F," ")+" ").indexOf(i):"|="===r&&(t===i||t.slice(0,i.length+1)===i+"-"))}},CHILD:function(h,e,t,g,v){var y="nth"!==h.slice(0,3),m="last"!==h.slice(-4),x="of-type"===e;return 1===g&&0===v?function(e){return!!e.parentNode}:function(e,t,n){var r,i,o,a,s,u,l=y!==m?"nextSibling":"previousSibling",c=e.parentNode,f=x&&e.nodeName.toLowerCase(),p=!n&&!x,d=!1;if(c){if(y){while(l){a=e;while(a=a[l])if(x?a.nodeName.toLowerCase()===f:1===a.nodeType)return!1;u=l="only"===h&&!u&&"nextSibling"}return!0}if(u=[m?c.firstChild:c.lastChild],m&&p){d=(s=(r=(i=(o=(a=c)[k]||(a[k]={}))[a.uniqueID]||(o[a.uniqueID]={}))[h]||[])[0]===S&&r[1])&&r[2],a=s&&c.childNodes[s];while(a=++s&&a&&a[l]||(d=s=0)||u.pop())if(1===a.nodeType&&++d&&a===e){i[h]=[S,s,d];break}}else if(p&&(d=s=(r=(i=(o=(a=e)[k]||(a[k]={}))[a.uniqueID]||(o[a.uniqueID]={}))[h]||[])[0]===S&&r[1]),!1===d)while(a=++s&&a&&a[l]||(d=s=0)||u.pop())if((x?a.nodeName.toLowerCase()===f:1===a.nodeType)&&++d&&(p&&((i=(o=a[k]||(a[k]={}))[a.uniqueID]||(o[a.uniqueID]={}))[h]=[S,d]),a===e))break;return(d-=v)===g||d%g==0&&0<=d/g}}},PSEUDO:function(e,o){var t,a=b.pseudos[e]||b.setFilters[e.toLowerCase()]||se.error("unsupported pseudo: "+e);return a[k]?a(o):1<a.length?(t=[e,e,"",o],b.setFilters.hasOwnProperty(e.toLowerCase())?le(function(e,t){var n,r=a(e,o),i=r.length;while(i--)e[n=P(e,r[i])]=!(t[n]=r[i])}):function(e){return a(e,0,t)}):a}},pseudos:{not:le(function(e){var r=[],i=[],s=f(e.replace(B,"$1"));return s[k]?le(function(e,t,n,r){var i,o=s(e,null,r,[]),a=e.length;while(a--)(i=o[a])&&(e[a]=!(t[a]=i))}):function(e,t,n){return r[0]=e,s(r,null,n,i),r[0]=null,!i.pop()}}),has:le(function(t){return function(e){return 0<se(t,e).length}}),contains:le(function(t){return t=t.replace(te,ne),function(e){return-1<(e.textContent||o(e)).indexOf(t)}}),lang:le(function(n){return V.test(n||"")||se.error("unsupported lang: "+n),n=n.replace(te,ne).toLowerCase(),function(e){var t;do{if(t=E?e.lang:e.getAttribute("xml:lang")||e.getAttribute("lang"))return(t=t.toLowerCase())===n||0===t.indexOf(n+"-")}while((e=e.parentNode)&&1===e.nodeType);return!1}}),target:function(e){var t=n.location&&n.location.hash;return t&&t.slice(1)===e.id},root:function(e){return e===a},focus:function(e){return e===C.activeElement&&(!C.hasFocus||C.hasFocus())&&!!(e.type||e.href||~e.tabIndex)},enabled:ge(!1),disabled:ge(!0),checked:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&!!e.checked||"option"===t&&!!e.selected},selected:function(e){return e.parentNode&&e.parentNode.selectedIndex,!0===e.selected},empty:function(e){for(e=e.firstChild;e;e=e.nextSibling)if(e.nodeType<6)return!1;return!0},parent:function(e){return!b.pseudos.empty(e)},header:function(e){return J.test(e.nodeName)},input:function(e){return Q.test(e.nodeName)},button:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&"button"===e.type||"button"===t},text:function(e){var t;return"input"===e.nodeName.toLowerCase()&&"text"===e.type&&(null==(t=e.getAttribute("type"))||"text"===t.toLowerCase())},first:ve(function(){return[0]}),last:ve(function(e,t){return[t-1]}),eq:ve(function(e,t,n){return[n<0?n+t:n]}),even:ve(function(e,t){for(var n=0;n<t;n+=2)e.push(n);return e}),odd:ve(function(e,t){for(var n=1;n<t;n+=2)e.push(n);return e}),lt:ve(function(e,t,n){for(var r=n<0?n+t:t<n?t:n;0<=--r;)e.push(r);return e}),gt:ve(function(e,t,n){for(var r=n<0?n+t:n;++r<t;)e.push(r);return e})}}).pseudos.nth=b.pseudos.eq,{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})b.pseudos[e]=de(e);for(e in{submit:!0,reset:!0})b.pseudos[e]=he(e);function me(){}function xe(e){for(var t=0,n=e.length,r="";t<n;t++)r+=e[t].value;return r}function be(s,e,t){var u=e.dir,l=e.next,c=l||u,f=t&&"parentNode"===c,p=r++;return e.first?function(e,t,n){while(e=e[u])if(1===e.nodeType||f)return s(e,t,n);return!1}:function(e,t,n){var r,i,o,a=[S,p];if(n){while(e=e[u])if((1===e.nodeType||f)&&s(e,t,n))return!0}else while(e=e[u])if(1===e.nodeType||f)if(i=(o=e[k]||(e[k]={}))[e.uniqueID]||(o[e.uniqueID]={}),l&&l===e.nodeName.toLowerCase())e=e[u]||e;else{if((r=i[c])&&r[0]===S&&r[1]===p)return a[2]=r[2];if((i[c]=a)[2]=s(e,t,n))return!0}return!1}}function we(i){return 1<i.length?function(e,t,n){var r=i.length;while(r--)if(!i[r](e,t,n))return!1;return!0}:i[0]}function Te(e,t,n,r,i){for(var o,a=[],s=0,u=e.length,l=null!=t;s<u;s++)(o=e[s])&&(n&&!n(o,r,i)||(a.push(o),l&&t.push(s)));return a}function Ce(d,h,g,v,y,e){return v&&!v[k]&&(v=Ce(v)),y&&!y[k]&&(y=Ce(y,e)),le(function(e,t,n,r){var i,o,a,s=[],u=[],l=t.length,c=e||function(e,t,n){for(var r=0,i=t.length;r<i;r++)se(e,t[r],n);return n}(h||"*",n.nodeType?[n]:n,[]),f=!d||!e&&h?c:Te(c,s,d,n,r),p=g?y||(e?d:l||v)?[]:t:f;if(g&&g(f,p,n,r),v){i=Te(p,u),v(i,[],n,r),o=i.length;while(o--)(a=i[o])&&(p[u[o]]=!(f[u[o]]=a))}if(e){if(y||d){if(y){i=[],o=p.length;while(o--)(a=p[o])&&i.push(f[o]=a);y(null,p=[],i,r)}o=p.length;while(o--)(a=p[o])&&-1<(i=y?P(e,a):s[o])&&(e[i]=!(t[i]=a))}}else p=Te(p===t?p.splice(l,p.length):p),y?y(null,t,p,r):H.apply(t,p)})}function Ee(e){for(var i,t,n,r=e.length,o=b.relative[e[0].type],a=o||b.relative[" "],s=o?1:0,u=be(function(e){return e===i},a,!0),l=be(function(e){return-1<P(i,e)},a,!0),c=[function(e,t,n){var r=!o&&(n||t!==w)||((i=t).nodeType?u(e,t,n):l(e,t,n));return i=null,r}];s<r;s++)if(t=b.relative[e[s].type])c=[be(we(c),t)];else{if((t=b.filter[e[s].type].apply(null,e[s].matches))[k]){for(n=++s;n<r;n++)if(b.relative[e[n].type])break;return Ce(1<s&&we(c),1<s&&xe(e.slice(0,s-1).concat({value:" "===e[s-2].type?"*":""})).replace(B,"$1"),t,s<n&&Ee(e.slice(s,n)),n<r&&Ee(e=e.slice(n)),n<r&&xe(e))}c.push(t)}return we(c)}return me.prototype=b.filters=b.pseudos,b.setFilters=new me,h=se.tokenize=function(e,t){var n,r,i,o,a,s,u,l=x[e+" "];if(l)return t?0:l.slice(0);a=e,s=[],u=b.preFilter;while(a){for(o in n&&!(r=_.exec(a))||(r&&(a=a.slice(r[0].length)||a),s.push(i=[])),n=!1,(r=z.exec(a))&&(n=r.shift(),i.push({value:n,type:r[0].replace(B," ")}),a=a.slice(n.length)),b.filter)!(r=G[o].exec(a))||u[o]&&!(r=u[o](r))||(n=r.shift(),i.push({value:n,type:o,matches:r}),a=a.slice(n.length));if(!n)break}return t?a.length:a?se.error(e):x(e,s).slice(0)},f=se.compile=function(e,t){var n,v,y,m,x,r,i=[],o=[],a=N[e+" "];if(!a){t||(t=h(e)),n=t.length;while(n--)(a=Ee(t[n]))[k]?i.push(a):o.push(a);(a=N(e,(v=o,m=0<(y=i).length,x=0<v.length,r=function(e,t,n,r,i){var o,a,s,u=0,l="0",c=e&&[],f=[],p=w,d=e||x&&b.find.TAG("*",i),h=S+=null==p?1:Math.random()||.1,g=d.length;for(i&&(w=t===C||t||i);l!==g&&null!=(o=d[l]);l++){if(x&&o){a=0,t||o.ownerDocument===C||(T(o),n=!E);while(s=v[a++])if(s(o,t||C,n)){r.push(o);break}i&&(S=h)}m&&((o=!s&&o)&&u--,e&&c.push(o))}if(u+=l,m&&l!==u){a=0;while(s=y[a++])s(c,f,t,n);if(e){if(0<u)while(l--)c[l]||f[l]||(f[l]=q.call(r));f=Te(f)}H.apply(r,f),i&&!e&&0<f.length&&1<u+y.length&&se.uniqueSort(r)}return i&&(S=h,w=p),c},m?le(r):r))).selector=e}return a},g=se.select=function(e,t,n,r){var i,o,a,s,u,l="function"==typeof e&&e,c=!r&&h(e=l.selector||e);if(n=n||[],1===c.length){if(2<(o=c[0]=c[0].slice(0)).length&&"ID"===(a=o[0]).type&&9===t.nodeType&&E&&b.relative[o[1].type]){if(!(t=(b.find.ID(a.matches[0].replace(te,ne),t)||[])[0]))return n;l&&(t=t.parentNode),e=e.slice(o.shift().value.length)}i=G.needsContext.test(e)?0:o.length;while(i--){if(a=o[i],b.relative[s=a.type])break;if((u=b.find[s])&&(r=u(a.matches[0].replace(te,ne),ee.test(o[0].type)&&ye(t.parentNode)||t))){if(o.splice(i,1),!(e=r.length&&xe(o)))return H.apply(n,r),n;break}}}return(l||f(e,c))(r,t,!E,n,!t||ee.test(e)&&ye(t.parentNode)||t),n},d.sortStable=k.split("").sort(D).join("")===k,d.detectDuplicates=!!l,T(),d.sortDetached=ce(function(e){return 1&e.compareDocumentPosition(C.createElement("fieldset"))}),ce(function(e){return e.innerHTML="<a href='#'></a>","#"===e.firstChild.getAttribute("href")})||fe("type|href|height|width",function(e,t,n){if(!n)return e.getAttribute(t,"type"===t.toLowerCase()?1:2)}),d.attributes&&ce(function(e){return e.innerHTML="<input/>",e.firstChild.setAttribute("value",""),""===e.firstChild.getAttribute("value")})||fe("value",function(e,t,n){if(!n&&"input"===e.nodeName.toLowerCase())return e.defaultValue}),ce(function(e){return null==e.getAttribute("disabled")})||fe(R,function(e,t,n){var r;if(!n)return!0===e[t]?t.toLowerCase():(r=e.getAttributeNode(t))&&r.specified?r.value:null}),se}(C);k.find=h,k.expr=h.selectors,k.expr[":"]=k.expr.pseudos,k.uniqueSort=k.unique=h.uniqueSort,k.text=h.getText,k.isXMLDoc=h.isXML,k.contains=h.contains,k.escapeSelector=h.escape;var T=function(e,t,n){var r=[],i=void 0!==n;while((e=e[t])&&9!==e.nodeType)if(1===e.nodeType){if(i&&k(e).is(n))break;r.push(e)}return r},S=function(e,t){for(var n=[];e;e=e.nextSibling)1===e.nodeType&&e!==t&&n.push(e);return n},N=k.expr.match.needsContext;function A(e,t){return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase()}var D=/^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;function j(e,n,r){return m(n)?k.grep(e,function(e,t){return!!n.call(e,t,e)!==r}):n.nodeType?k.grep(e,function(e){return e===n!==r}):"string"!=typeof n?k.grep(e,function(e){return-1<i.call(n,e)!==r}):k.filter(n,e,r)}k.filter=function(e,t,n){var r=t[0];return n&&(e=":not("+e+")"),1===t.length&&1===r.nodeType?k.find.matchesSelector(r,e)?[r]:[]:k.find.matches(e,k.grep(t,function(e){return 1===e.nodeType}))},k.fn.extend({find:function(e){var t,n,r=this.length,i=this;if("string"!=typeof e)return this.pushStack(k(e).filter(function(){for(t=0;t<r;t++)if(k.contains(i[t],this))return!0}));for(n=this.pushStack([]),t=0;t<r;t++)k.find(e,i[t],n);return 1<r?k.uniqueSort(n):n},filter:function(e){return this.pushStack(j(this,e||[],!1))},not:function(e){return this.pushStack(j(this,e||[],!0))},is:function(e){return!!j(this,"string"==typeof e&&N.test(e)?k(e):e||[],!1).length}});var q,L=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;(k.fn.init=function(e,t,n){var r,i;if(!e)return this;if(n=n||q,"string"==typeof e){if(!(r="<"===e[0]&&">"===e[e.length-1]&&3<=e.length?[null,e,null]:L.exec(e))||!r[1]&&t)return!t||t.jquery?(t||n).find(e):this.constructor(t).find(e);if(r[1]){if(t=t instanceof k?t[0]:t,k.merge(this,k.parseHTML(r[1],t&&t.nodeType?t.ownerDocument||t:E,!0)),D.test(r[1])&&k.isPlainObject(t))for(r in t)m(this[r])?this[r](t[r]):this.attr(r,t[r]);return this}return(i=E.getElementById(r[2]))&&(this[0]=i,this.length=1),this}return e.nodeType?(this[0]=e,this.length=1,this):m(e)?void 0!==n.ready?n.ready(e):e(k):k.makeArray(e,this)}).prototype=k.fn,q=k(E);var H=/^(?:parents|prev(?:Until|All))/,O={children:!0,contents:!0,next:!0,prev:!0};function P(e,t){while((e=e[t])&&1!==e.nodeType);return e}k.fn.extend({has:function(e){var t=k(e,this),n=t.length;return this.filter(function(){for(var e=0;e<n;e++)if(k.contains(this,t[e]))return!0})},closest:function(e,t){var n,r=0,i=this.length,o=[],a="string"!=typeof e&&k(e);if(!N.test(e))for(;r<i;r++)for(n=this[r];n&&n!==t;n=n.parentNode)if(n.nodeType<11&&(a?-1<a.index(n):1===n.nodeType&&k.find.matchesSelector(n,e))){o.push(n);break}return this.pushStack(1<o.length?k.uniqueSort(o):o)},index:function(e){return e?"string"==typeof e?i.call(k(e),this[0]):i.call(this,e.jquery?e[0]:e):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(e,t){return this.pushStack(k.uniqueSort(k.merge(this.get(),k(e,t))))},addBack:function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}}),k.each({parent:function(e){var t=e.parentNode;return t&&11!==t.nodeType?t:null},parents:function(e){return T(e,"parentNode")},parentsUntil:function(e,t,n){return T(e,"parentNode",n)},next:function(e){return P(e,"nextSibling")},prev:function(e){return P(e,"previousSibling")},nextAll:function(e){return T(e,"nextSibling")},prevAll:function(e){return T(e,"previousSibling")},nextUntil:function(e,t,n){return T(e,"nextSibling",n)},prevUntil:function(e,t,n){return T(e,"previousSibling",n)},siblings:function(e){return S((e.parentNode||{}).firstChild,e)},children:function(e){return S(e.firstChild)},contents:function(e){return"undefined"!=typeof e.contentDocument?e.contentDocument:(A(e,"template")&&(e=e.content||e),k.merge([],e.childNodes))}},function(r,i){k.fn[r]=function(e,t){var n=k.map(this,i,e);return"Until"!==r.slice(-5)&&(t=e),t&&"string"==typeof t&&(n=k.filter(t,n)),1<this.length&&(O[r]||k.uniqueSort(n),H.test(r)&&n.reverse()),this.pushStack(n)}});var R=/[^\x20\t\r\n\f]+/g;function M(e){return e}function I(e){throw e}function W(e,t,n,r){var i;try{e&&m(i=e.promise)?i.call(e).done(t).fail(n):e&&m(i=e.then)?i.call(e,t,n):t.apply(void 0,[e].slice(r))}catch(e){n.apply(void 0,[e])}}k.Callbacks=function(r){var e,n;r="string"==typeof r?(e=r,n={},k.each(e.match(R)||[],function(e,t){n[t]=!0}),n):k.extend({},r);var i,t,o,a,s=[],u=[],l=-1,c=function(){for(a=a||r.once,o=i=!0;u.length;l=-1){t=u.shift();while(++l<s.length)!1===s[l].apply(t[0],t[1])&&r.stopOnFalse&&(l=s.length,t=!1)}r.memory||(t=!1),i=!1,a&&(s=t?[]:"")},f={add:function(){return s&&(t&&!i&&(l=s.length-1,u.push(t)),function n(e){k.each(e,function(e,t){m(t)?r.unique&&f.has(t)||s.push(t):t&&t.length&&"string"!==w(t)&&n(t)})}(arguments),t&&!i&&c()),this},remove:function(){return k.each(arguments,function(e,t){var n;while(-1<(n=k.inArray(t,s,n)))s.splice(n,1),n<=l&&l--}),this},has:function(e){return e?-1<k.inArray(e,s):0<s.length},empty:function(){return s&&(s=[]),this},disable:function(){return a=u=[],s=t="",this},disabled:function(){return!s},lock:function(){return a=u=[],t||i||(s=t=""),this},locked:function(){return!!a},fireWith:function(e,t){return a||(t=[e,(t=t||[]).slice?t.slice():t],u.push(t),i||c()),this},fire:function(){return f.fireWith(this,arguments),this},fired:function(){return!!o}};return f},k.extend({Deferred:function(e){var o=[["notify","progress",k.Callbacks("memory"),k.Callbacks("memory"),2],["resolve","done",k.Callbacks("once memory"),k.Callbacks("once memory"),0,"resolved"],["reject","fail",k.Callbacks("once memory"),k.Callbacks("once memory"),1,"rejected"]],i="pending",a={state:function(){return i},always:function(){return s.done(arguments).fail(arguments),this},"catch":function(e){return a.then(null,e)},pipe:function(){var i=arguments;return k.Deferred(function(r){k.each(o,function(e,t){var n=m(i[t[4]])&&i[t[4]];s[t[1]](function(){var e=n&&n.apply(this,arguments);e&&m(e.promise)?e.promise().progress(r.notify).done(r.resolve).fail(r.reject):r[t[0]+"With"](this,n?[e]:arguments)})}),i=null}).promise()},then:function(t,n,r){var u=0;function l(i,o,a,s){return function(){var n=this,r=arguments,e=function(){var e,t;if(!(i<u)){if((e=a.apply(n,r))===o.promise())throw new TypeError("Thenable self-resolution");t=e&&("object"==typeof e||"function"==typeof e)&&e.then,m(t)?s?t.call(e,l(u,o,M,s),l(u,o,I,s)):(u++,t.call(e,l(u,o,M,s),l(u,o,I,s),l(u,o,M,o.notifyWith))):(a!==M&&(n=void 0,r=[e]),(s||o.resolveWith)(n,r))}},t=s?e:function(){try{e()}catch(e){k.Deferred.exceptionHook&&k.Deferred.exceptionHook(e,t.stackTrace),u<=i+1&&(a!==I&&(n=void 0,r=[e]),o.rejectWith(n,r))}};i?t():(k.Deferred.getStackHook&&(t.stackTrace=k.Deferred.getStackHook()),C.setTimeout(t))}}return k.Deferred(function(e){o[0][3].add(l(0,e,m(r)?r:M,e.notifyWith)),o[1][3].add(l(0,e,m(t)?t:M)),o[2][3].add(l(0,e,m(n)?n:I))}).promise()},promise:function(e){return null!=e?k.extend(e,a):a}},s={};return k.each(o,function(e,t){var n=t[2],r=t[5];a[t[1]]=n.add,r&&n.add(function(){i=r},o[3-e][2].disable,o[3-e][3].disable,o[0][2].lock,o[0][3].lock),n.add(t[3].fire),s[t[0]]=function(){return s[t[0]+"With"](this===s?void 0:this,arguments),this},s[t[0]+"With"]=n.fireWith}),a.promise(s),e&&e.call(s,s),s},when:function(e){var n=arguments.length,t=n,r=Array(t),i=s.call(arguments),o=k.Deferred(),a=function(t){return function(e){r[t]=this,i[t]=1<arguments.length?s.call(arguments):e,--n||o.resolveWith(r,i)}};if(n<=1&&(W(e,o.done(a(t)).resolve,o.reject,!n),"pending"===o.state()||m(i[t]&&i[t].then)))return o.then();while(t--)W(i[t],a(t),o.reject);return o.promise()}});var $=/^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;k.Deferred.exceptionHook=function(e,t){C.console&&C.console.warn&&e&&$.test(e.name)&&C.console.warn("jQuery.Deferred exception: "+e.message,e.stack,t)},k.readyException=function(e){C.setTimeout(function(){throw e})};var F=k.Deferred();function B(){E.removeEventListener("DOMContentLoaded",B),C.removeEventListener("load",B),k.ready()}k.fn.ready=function(e){return F.then(e)["catch"](function(e){k.readyException(e)}),this},k.extend({isReady:!1,readyWait:1,ready:function(e){(!0===e?--k.readyWait:k.isReady)||(k.isReady=!0)!==e&&0<--k.readyWait||F.resolveWith(E,[k])}}),k.ready.then=F.then,"complete"===E.readyState||"loading"!==E.readyState&&!E.documentElement.doScroll?C.setTimeout(k.ready):(E.addEventListener("DOMContentLoaded",B),C.addEventListener("load",B));var _=function(e,t,n,r,i,o,a){var s=0,u=e.length,l=null==n;if("object"===w(n))for(s in i=!0,n)_(e,t,s,n[s],!0,o,a);else if(void 0!==r&&(i=!0,m(r)||(a=!0),l&&(a?(t.call(e,r),t=null):(l=t,t=function(e,t,n){return l.call(k(e),n)})),t))for(;s<u;s++)t(e[s],n,a?r:r.call(e[s],s,t(e[s],n)));return i?e:l?t.call(e):u?t(e[0],n):o},z=/^-ms-/,U=/-([a-z])/g;function X(e,t){return t.toUpperCase()}function V(e){return e.replace(z,"ms-").replace(U,X)}var G=function(e){return 1===e.nodeType||9===e.nodeType||!+e.nodeType};function Y(){this.expando=k.expando+Y.uid++}Y.uid=1,Y.prototype={cache:function(e){var t=e[this.expando];return t||(t={},G(e)&&(e.nodeType?e[this.expando]=t:Object.defineProperty(e,this.expando,{value:t,configurable:!0}))),t},set:function(e,t,n){var r,i=this.cache(e);if("string"==typeof t)i[V(t)]=n;else for(r in t)i[V(r)]=t[r];return i},get:function(e,t){return void 0===t?this.cache(e):e[this.expando]&&e[this.expando][V(t)]},access:function(e,t,n){return void 0===t||t&&"string"==typeof t&&void 0===n?this.get(e,t):(this.set(e,t,n),void 0!==n?n:t)},remove:function(e,t){var n,r=e[this.expando];if(void 0!==r){if(void 0!==t){n=(t=Array.isArray(t)?t.map(V):(t=V(t))in r?[t]:t.match(R)||[]).length;while(n--)delete r[t[n]]}(void 0===t||k.isEmptyObject(r))&&(e.nodeType?e[this.expando]=void 0:delete e[this.expando])}},hasData:function(e){var t=e[this.expando];return void 0!==t&&!k.isEmptyObject(t)}};var Q=new Y,J=new Y,K=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,Z=/[A-Z]/g;function ee(e,t,n){var r,i;if(void 0===n&&1===e.nodeType)if(r="data-"+t.replace(Z,"-$&").toLowerCase(),"string"==typeof(n=e.getAttribute(r))){try{n="true"===(i=n)||"false"!==i&&("null"===i?null:i===+i+""?+i:K.test(i)?JSON.parse(i):i)}catch(e){}J.set(e,t,n)}else n=void 0;return n}k.extend({hasData:function(e){return J.hasData(e)||Q.hasData(e)},data:function(e,t,n){return J.access(e,t,n)},removeData:function(e,t){J.remove(e,t)},_data:function(e,t,n){return Q.access(e,t,n)},_removeData:function(e,t){Q.remove(e,t)}}),k.fn.extend({data:function(n,e){var t,r,i,o=this[0],a=o&&o.attributes;if(void 0===n){if(this.length&&(i=J.get(o),1===o.nodeType&&!Q.get(o,"hasDataAttrs"))){t=a.length;while(t--)a[t]&&0===(r=a[t].name).indexOf("data-")&&(r=V(r.slice(5)),ee(o,r,i[r]));Q.set(o,"hasDataAttrs",!0)}return i}return"object"==typeof n?this.each(function(){J.set(this,n)}):_(this,function(e){var t;if(o&&void 0===e)return void 0!==(t=J.get(o,n))?t:void 0!==(t=ee(o,n))?t:void 0;this.each(function(){J.set(this,n,e)})},null,e,1<arguments.length,null,!0)},removeData:function(e){return this.each(function(){J.remove(this,e)})}}),k.extend({queue:function(e,t,n){var r;if(e)return t=(t||"fx")+"queue",r=Q.get(e,t),n&&(!r||Array.isArray(n)?r=Q.access(e,t,k.makeArray(n)):r.push(n)),r||[]},dequeue:function(e,t){t=t||"fx";var n=k.queue(e,t),r=n.length,i=n.shift(),o=k._queueHooks(e,t);"inprogress"===i&&(i=n.shift(),r--),i&&("fx"===t&&n.unshift("inprogress"),delete o.stop,i.call(e,function(){k.dequeue(e,t)},o)),!r&&o&&o.empty.fire()},_queueHooks:function(e,t){var n=t+"queueHooks";return Q.get(e,n)||Q.access(e,n,{empty:k.Callbacks("once memory").add(function(){Q.remove(e,[t+"queue",n])})})}}),k.fn.extend({queue:function(t,n){var e=2;return"string"!=typeof t&&(n=t,t="fx",e--),arguments.length<e?k.queue(this[0],t):void 0===n?this:this.each(function(){var e=k.queue(this,t,n);k._queueHooks(this,t),"fx"===t&&"inprogress"!==e[0]&&k.dequeue(this,t)})},dequeue:function(e){return this.each(function(){k.dequeue(this,e)})},clearQueue:function(e){return this.queue(e||"fx",[])},promise:function(e,t){var n,r=1,i=k.Deferred(),o=this,a=this.length,s=function(){--r||i.resolveWith(o,[o])};"string"!=typeof e&&(t=e,e=void 0),e=e||"fx";while(a--)(n=Q.get(o[a],e+"queueHooks"))&&n.empty&&(r++,n.empty.add(s));return s(),i.promise(t)}});var te=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,ne=new RegExp("^(?:([+-])=|)("+te+")([a-z%]*)$","i"),re=["Top","Right","Bottom","Left"],ie=E.documentElement,oe=function(e){return k.contains(e.ownerDocument,e)},ae={composed:!0};ie.getRootNode&&(oe=function(e){return k.contains(e.ownerDocument,e)||e.getRootNode(ae)===e.ownerDocument});var se=function(e,t){return"none"===(e=t||e).style.display||""===e.style.display&&oe(e)&&"none"===k.css(e,"display")},ue=function(e,t,n,r){var i,o,a={};for(o in t)a[o]=e.style[o],e.style[o]=t[o];for(o in i=n.apply(e,r||[]),t)e.style[o]=a[o];return i};function le(e,t,n,r){var i,o,a=20,s=r?function(){return r.cur()}:function(){return k.css(e,t,"")},u=s(),l=n&&n[3]||(k.cssNumber[t]?"":"px"),c=e.nodeType&&(k.cssNumber[t]||"px"!==l&&+u)&&ne.exec(k.css(e,t));if(c&&c[3]!==l){u/=2,l=l||c[3],c=+u||1;while(a--)k.style(e,t,c+l),(1-o)*(1-(o=s()/u||.5))<=0&&(a=0),c/=o;c*=2,k.style(e,t,c+l),n=n||[]}return n&&(c=+c||+u||0,i=n[1]?c+(n[1]+1)*n[2]:+n[2],r&&(r.unit=l,r.start=c,r.end=i)),i}var ce={};function fe(e,t){for(var n,r,i,o,a,s,u,l=[],c=0,f=e.length;c<f;c++)(r=e[c]).style&&(n=r.style.display,t?("none"===n&&(l[c]=Q.get(r,"display")||null,l[c]||(r.style.display="")),""===r.style.display&&se(r)&&(l[c]=(u=a=o=void 0,a=(i=r).ownerDocument,s=i.nodeName,(u=ce[s])||(o=a.body.appendChild(a.createElement(s)),u=k.css(o,"display"),o.parentNode.removeChild(o),"none"===u&&(u="block"),ce[s]=u)))):"none"!==n&&(l[c]="none",Q.set(r,"display",n)));for(c=0;c<f;c++)null!=l[c]&&(e[c].style.display=l[c]);return e}k.fn.extend({show:function(){return fe(this,!0)},hide:function(){return fe(this)},toggle:function(e){return"boolean"==typeof e?e?this.show():this.hide():this.each(function(){se(this)?k(this).show():k(this).hide()})}});var pe=/^(?:checkbox|radio)$/i,de=/<([a-z][^\/\0>\x20\t\r\n\f]*)/i,he=/^$|^module$|\/(?:java|ecma)script/i,ge={option:[1,"<select multiple='multiple'>","</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};function ve(e,t){var n;return n="undefined"!=typeof e.getElementsByTagName?e.getElementsByTagName(t||"*"):"undefined"!=typeof e.querySelectorAll?e.querySelectorAll(t||"*"):[],void 0===t||t&&A(e,t)?k.merge([e],n):n}function ye(e,t){for(var n=0,r=e.length;n<r;n++)Q.set(e[n],"globalEval",!t||Q.get(t[n],"globalEval"))}ge.optgroup=ge.option,ge.tbody=ge.tfoot=ge.colgroup=ge.caption=ge.thead,ge.th=ge.td;var me,xe,be=/<|&#?\w+;/;function we(e,t,n,r,i){for(var o,a,s,u,l,c,f=t.createDocumentFragment(),p=[],d=0,h=e.length;d<h;d++)if((o=e[d])||0===o)if("object"===w(o))k.merge(p,o.nodeType?[o]:o);else if(be.test(o)){a=a||f.appendChild(t.createElement("div")),s=(de.exec(o)||["",""])[1].toLowerCase(),u=ge[s]||ge._default,a.innerHTML=u[1]+k.htmlPrefilter(o)+u[2],c=u[0];while(c--)a=a.lastChild;k.merge(p,a.childNodes),(a=f.firstChild).textContent=""}else p.push(t.createTextNode(o));f.textContent="",d=0;while(o=p[d++])if(r&&-1<k.inArray(o,r))i&&i.push(o);else if(l=oe(o),a=ve(f.appendChild(o),"script"),l&&ye(a),n){c=0;while(o=a[c++])he.test(o.type||"")&&n.push(o)}return f}me=E.createDocumentFragment().appendChild(E.createElement("div")),(xe=E.createElement("input")).setAttribute("type","radio"),xe.setAttribute("checked","checked"),xe.setAttribute("name","t"),me.appendChild(xe),y.checkClone=me.cloneNode(!0).cloneNode(!0).lastChild.checked,me.innerHTML="<textarea>x</textarea>",y.noCloneChecked=!!me.cloneNode(!0).lastChild.defaultValue;var Te=/^key/,Ce=/^(?:mouse|pointer|contextmenu|drag|drop)|click/,Ee=/^([^.]*)(?:\.(.+)|)/;function ke(){return!0}function Se(){return!1}function Ne(e,t){return e===function(){try{return E.activeElement}catch(e){}}()==("focus"===t)}function Ae(e,t,n,r,i,o){var a,s;if("object"==typeof t){for(s in"string"!=typeof n&&(r=r||n,n=void 0),t)Ae(e,s,n,r,t[s],o);return e}if(null==r&&null==i?(i=n,r=n=void 0):null==i&&("string"==typeof n?(i=r,r=void 0):(i=r,r=n,n=void 0)),!1===i)i=Se;else if(!i)return e;return 1===o&&(a=i,(i=function(e){return k().off(e),a.apply(this,arguments)}).guid=a.guid||(a.guid=k.guid++)),e.each(function(){k.event.add(this,t,i,r,n)})}function De(e,i,o){o?(Q.set(e,i,!1),k.event.add(e,i,{namespace:!1,handler:function(e){var t,n,r=Q.get(this,i);if(1&e.isTrigger&&this[i]){if(r.length)(k.event.special[i]||{}).delegateType&&e.stopPropagation();else if(r=s.call(arguments),Q.set(this,i,r),t=o(this,i),this[i](),r!==(n=Q.get(this,i))||t?Q.set(this,i,!1):n={},r!==n)return e.stopImmediatePropagation(),e.preventDefault(),n.value}else r.length&&(Q.set(this,i,{value:k.event.trigger(k.extend(r[0],k.Event.prototype),r.slice(1),this)}),e.stopImmediatePropagation())}})):void 0===Q.get(e,i)&&k.event.add(e,i,ke)}k.event={global:{},add:function(t,e,n,r,i){var o,a,s,u,l,c,f,p,d,h,g,v=Q.get(t);if(v){n.handler&&(n=(o=n).handler,i=o.selector),i&&k.find.matchesSelector(ie,i),n.guid||(n.guid=k.guid++),(u=v.events)||(u=v.events={}),(a=v.handle)||(a=v.handle=function(e){return"undefined"!=typeof k&&k.event.triggered!==e.type?k.event.dispatch.apply(t,arguments):void 0}),l=(e=(e||"").match(R)||[""]).length;while(l--)d=g=(s=Ee.exec(e[l])||[])[1],h=(s[2]||"").split(".").sort(),d&&(f=k.event.special[d]||{},d=(i?f.delegateType:f.bindType)||d,f=k.event.special[d]||{},c=k.extend({type:d,origType:g,data:r,handler:n,guid:n.guid,selector:i,needsContext:i&&k.expr.match.needsContext.test(i),namespace:h.join(".")},o),(p=u[d])||((p=u[d]=[]).delegateCount=0,f.setup&&!1!==f.setup.call(t,r,h,a)||t.addEventListener&&t.addEventListener(d,a)),f.add&&(f.add.call(t,c),c.handler.guid||(c.handler.guid=n.guid)),i?p.splice(p.delegateCount++,0,c):p.push(c),k.event.global[d]=!0)}},remove:function(e,t,n,r,i){var o,a,s,u,l,c,f,p,d,h,g,v=Q.hasData(e)&&Q.get(e);if(v&&(u=v.events)){l=(t=(t||"").match(R)||[""]).length;while(l--)if(d=g=(s=Ee.exec(t[l])||[])[1],h=(s[2]||"").split(".").sort(),d){f=k.event.special[d]||{},p=u[d=(r?f.delegateType:f.bindType)||d]||[],s=s[2]&&new RegExp("(^|\\.)"+h.join("\\.(?:.*\\.|)")+"(\\.|$)"),a=o=p.length;while(o--)c=p[o],!i&&g!==c.origType||n&&n.guid!==c.guid||s&&!s.test(c.namespace)||r&&r!==c.selector&&("**"!==r||!c.selector)||(p.splice(o,1),c.selector&&p.delegateCount--,f.remove&&f.remove.call(e,c));a&&!p.length&&(f.teardown&&!1!==f.teardown.call(e,h,v.handle)||k.removeEvent(e,d,v.handle),delete u[d])}else for(d in u)k.event.remove(e,d+t[l],n,r,!0);k.isEmptyObject(u)&&Q.remove(e,"handle events")}},dispatch:function(e){var t,n,r,i,o,a,s=k.event.fix(e),u=new Array(arguments.length),l=(Q.get(this,"events")||{})[s.type]||[],c=k.event.special[s.type]||{};for(u[0]=s,t=1;t<arguments.length;t++)u[t]=arguments[t];if(s.delegateTarget=this,!c.preDispatch||!1!==c.preDispatch.call(this,s)){a=k.event.handlers.call(this,s,l),t=0;while((i=a[t++])&&!s.isPropagationStopped()){s.currentTarget=i.elem,n=0;while((o=i.handlers[n++])&&!s.isImmediatePropagationStopped())s.rnamespace&&!1!==o.namespace&&!s.rnamespace.test(o.namespace)||(s.handleObj=o,s.data=o.data,void 0!==(r=((k.event.special[o.origType]||{}).handle||o.handler).apply(i.elem,u))&&!1===(s.result=r)&&(s.preventDefault(),s.stopPropagation()))}return c.postDispatch&&c.postDispatch.call(this,s),s.result}},handlers:function(e,t){var n,r,i,o,a,s=[],u=t.delegateCount,l=e.target;if(u&&l.nodeType&&!("click"===e.type&&1<=e.button))for(;l!==this;l=l.parentNode||this)if(1===l.nodeType&&("click"!==e.type||!0!==l.disabled)){for(o=[],a={},n=0;n<u;n++)void 0===a[i=(r=t[n]).selector+" "]&&(a[i]=r.needsContext?-1<k(i,this).index(l):k.find(i,this,null,[l]).length),a[i]&&o.push(r);o.length&&s.push({elem:l,handlers:o})}return l=this,u<t.length&&s.push({elem:l,handlers:t.slice(u)}),s},addProp:function(t,e){Object.defineProperty(k.Event.prototype,t,{enumerable:!0,configurable:!0,get:m(e)?function(){if(this.originalEvent)return e(this.originalEvent)}:function(){if(this.originalEvent)return this.originalEvent[t]},set:function(e){Object.defineProperty(this,t,{enumerable:!0,configurable:!0,writable:!0,value:e})}})},fix:function(e){return e[k.expando]?e:new k.Event(e)},special:{load:{noBubble:!0},click:{setup:function(e){var t=this||e;return pe.test(t.type)&&t.click&&A(t,"input")&&De(t,"click",ke),!1},trigger:function(e){var t=this||e;return pe.test(t.type)&&t.click&&A(t,"input")&&De(t,"click"),!0},_default:function(e){var t=e.target;return pe.test(t.type)&&t.click&&A(t,"input")&&Q.get(t,"click")||A(t,"a")}},beforeunload:{postDispatch:function(e){void 0!==e.result&&e.originalEvent&&(e.originalEvent.returnValue=e.result)}}}},k.removeEvent=function(e,t,n){e.removeEventListener&&e.removeEventListener(t,n)},k.Event=function(e,t){if(!(this instanceof k.Event))return new k.Event(e,t);e&&e.type?(this.originalEvent=e,this.type=e.type,this.isDefaultPrevented=e.defaultPrevented||void 0===e.defaultPrevented&&!1===e.returnValue?ke:Se,this.target=e.target&&3===e.target.nodeType?e.target.parentNode:e.target,this.currentTarget=e.currentTarget,this.relatedTarget=e.relatedTarget):this.type=e,t&&k.extend(this,t),this.timeStamp=e&&e.timeStamp||Date.now(),this[k.expando]=!0},k.Event.prototype={constructor:k.Event,isDefaultPrevented:Se,isPropagationStopped:Se,isImmediatePropagationStopped:Se,isSimulated:!1,preventDefault:function(){var e=this.originalEvent;this.isDefaultPrevented=ke,e&&!this.isSimulated&&e.preventDefault()},stopPropagation:function(){var e=this.originalEvent;this.isPropagationStopped=ke,e&&!this.isSimulated&&e.stopPropagation()},stopImmediatePropagation:function(){var e=this.originalEvent;this.isImmediatePropagationStopped=ke,e&&!this.isSimulated&&e.stopImmediatePropagation(),this.stopPropagation()}},k.each({altKey:!0,bubbles:!0,cancelable:!0,changedTouches:!0,ctrlKey:!0,detail:!0,eventPhase:!0,metaKey:!0,pageX:!0,pageY:!0,shiftKey:!0,view:!0,"char":!0,code:!0,charCode:!0,key:!0,keyCode:!0,button:!0,buttons:!0,clientX:!0,clientY:!0,offsetX:!0,offsetY:!0,pointerId:!0,pointerType:!0,screenX:!0,screenY:!0,targetTouches:!0,toElement:!0,touches:!0,which:function(e){var t=e.button;return null==e.which&&Te.test(e.type)?null!=e.charCode?e.charCode:e.keyCode:!e.which&&void 0!==t&&Ce.test(e.type)?1&t?1:2&t?3:4&t?2:0:e.which}},k.event.addProp),k.each({focus:"focusin",blur:"focusout"},function(e,t){k.event.special[e]={setup:function(){return De(this,e,Ne),!1},trigger:function(){return De(this,e),!0},delegateType:t}}),k.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(e,i){k.event.special[e]={delegateType:i,bindType:i,handle:function(e){var t,n=e.relatedTarget,r=e.handleObj;return n&&(n===this||k.contains(this,n))||(e.type=r.origType,t=r.handler.apply(this,arguments),e.type=i),t}}}),k.fn.extend({on:function(e,t,n,r){return Ae(this,e,t,n,r)},one:function(e,t,n,r){return Ae(this,e,t,n,r,1)},off:function(e,t,n){var r,i;if(e&&e.preventDefault&&e.handleObj)return r=e.handleObj,k(e.delegateTarget).off(r.namespace?r.origType+"."+r.namespace:r.origType,r.selector,r.handler),this;if("object"==typeof e){for(i in e)this.off(i,t,e[i]);return this}return!1!==t&&"function"!=typeof t||(n=t,t=void 0),!1===n&&(n=Se),this.each(function(){k.event.remove(this,e,n,t)})}});var je=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,qe=/<script|<style|<link/i,Le=/checked\s*(?:[^=]|=\s*.checked.)/i,He=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;function Oe(e,t){return A(e,"table")&&A(11!==t.nodeType?t:t.firstChild,"tr")&&k(e).children("tbody")[0]||e}function Pe(e){return e.type=(null!==e.getAttribute("type"))+"/"+e.type,e}function Re(e){return"true/"===(e.type||"").slice(0,5)?e.type=e.type.slice(5):e.removeAttribute("type"),e}function Me(e,t){var n,r,i,o,a,s,u,l;if(1===t.nodeType){if(Q.hasData(e)&&(o=Q.access(e),a=Q.set(t,o),l=o.events))for(i in delete a.handle,a.events={},l)for(n=0,r=l[i].length;n<r;n++)k.event.add(t,i,l[i][n]);J.hasData(e)&&(s=J.access(e),u=k.extend({},s),J.set(t,u))}}function Ie(n,r,i,o){r=g.apply([],r);var e,t,a,s,u,l,c=0,f=n.length,p=f-1,d=r[0],h=m(d);if(h||1<f&&"string"==typeof d&&!y.checkClone&&Le.test(d))return n.each(function(e){var t=n.eq(e);h&&(r[0]=d.call(this,e,t.html())),Ie(t,r,i,o)});if(f&&(t=(e=we(r,n[0].ownerDocument,!1,n,o)).firstChild,1===e.childNodes.length&&(e=t),t||o)){for(s=(a=k.map(ve(e,"script"),Pe)).length;c<f;c++)u=e,c!==p&&(u=k.clone(u,!0,!0),s&&k.merge(a,ve(u,"script"))),i.call(n[c],u,c);if(s)for(l=a[a.length-1].ownerDocument,k.map(a,Re),c=0;c<s;c++)u=a[c],he.test(u.type||"")&&!Q.access(u,"globalEval")&&k.contains(l,u)&&(u.src&&"module"!==(u.type||"").toLowerCase()?k._evalUrl&&!u.noModule&&k._evalUrl(u.src,{nonce:u.nonce||u.getAttribute("nonce")}):b(u.textContent.replace(He,""),u,l))}return n}function We(e,t,n){for(var r,i=t?k.filter(t,e):e,o=0;null!=(r=i[o]);o++)n||1!==r.nodeType||k.cleanData(ve(r)),r.parentNode&&(n&&oe(r)&&ye(ve(r,"script")),r.parentNode.removeChild(r));return e}k.extend({htmlPrefilter:function(e){return e.replace(je,"<$1></$2>")},clone:function(e,t,n){var r,i,o,a,s,u,l,c=e.cloneNode(!0),f=oe(e);if(!(y.noCloneChecked||1!==e.nodeType&&11!==e.nodeType||k.isXMLDoc(e)))for(a=ve(c),r=0,i=(o=ve(e)).length;r<i;r++)s=o[r],u=a[r],void 0,"input"===(l=u.nodeName.toLowerCase())&&pe.test(s.type)?u.checked=s.checked:"input"!==l&&"textarea"!==l||(u.defaultValue=s.defaultValue);if(t)if(n)for(o=o||ve(e),a=a||ve(c),r=0,i=o.length;r<i;r++)Me(o[r],a[r]);else Me(e,c);return 0<(a=ve(c,"script")).length&&ye(a,!f&&ve(e,"script")),c},cleanData:function(e){for(var t,n,r,i=k.event.special,o=0;void 0!==(n=e[o]);o++)if(G(n)){if(t=n[Q.expando]){if(t.events)for(r in t.events)i[r]?k.event.remove(n,r):k.removeEvent(n,r,t.handle);n[Q.expando]=void 0}n[J.expando]&&(n[J.expando]=void 0)}}}),k.fn.extend({detach:function(e){return We(this,e,!0)},remove:function(e){return We(this,e)},text:function(e){return _(this,function(e){return void 0===e?k.text(this):this.empty().each(function(){1!==this.nodeType&&11!==this.nodeType&&9!==this.nodeType||(this.textContent=e)})},null,e,arguments.length)},append:function(){return Ie(this,arguments,function(e){1!==this.nodeType&&11!==this.nodeType&&9!==this.nodeType||Oe(this,e).appendChild(e)})},prepend:function(){return Ie(this,arguments,function(e){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var t=Oe(this,e);t.insertBefore(e,t.firstChild)}})},before:function(){return Ie(this,arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this)})},after:function(){return Ie(this,arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this.nextSibling)})},empty:function(){for(var e,t=0;null!=(e=this[t]);t++)1===e.nodeType&&(k.cleanData(ve(e,!1)),e.textContent="");return this},clone:function(e,t){return e=null!=e&&e,t=null==t?e:t,this.map(function(){return k.clone(this,e,t)})},html:function(e){return _(this,function(e){var t=this[0]||{},n=0,r=this.length;if(void 0===e&&1===t.nodeType)return t.innerHTML;if("string"==typeof e&&!qe.test(e)&&!ge[(de.exec(e)||["",""])[1].toLowerCase()]){e=k.htmlPrefilter(e);try{for(;n<r;n++)1===(t=this[n]||{}).nodeType&&(k.cleanData(ve(t,!1)),t.innerHTML=e);t=0}catch(e){}}t&&this.empty().append(e)},null,e,arguments.length)},replaceWith:function(){var n=[];return Ie(this,arguments,function(e){var t=this.parentNode;k.inArray(this,n)<0&&(k.cleanData(ve(this)),t&&t.replaceChild(e,this))},n)}}),k.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(e,a){k.fn[e]=function(e){for(var t,n=[],r=k(e),i=r.length-1,o=0;o<=i;o++)t=o===i?this:this.clone(!0),k(r[o])[a](t),u.apply(n,t.get());return this.pushStack(n)}});var $e=new RegExp("^("+te+")(?!px)[a-z%]+$","i"),Fe=function(e){var t=e.ownerDocument.defaultView;return t&&t.opener||(t=C),t.getComputedStyle(e)},Be=new RegExp(re.join("|"),"i");function _e(e,t,n){var r,i,o,a,s=e.style;return(n=n||Fe(e))&&(""!==(a=n.getPropertyValue(t)||n[t])||oe(e)||(a=k.style(e,t)),!y.pixelBoxStyles()&&$e.test(a)&&Be.test(t)&&(r=s.width,i=s.minWidth,o=s.maxWidth,s.minWidth=s.maxWidth=s.width=a,a=n.width,s.width=r,s.minWidth=i,s.maxWidth=o)),void 0!==a?a+"":a}function ze(e,t){return{get:function(){if(!e())return(this.get=t).apply(this,arguments);delete this.get}}}!function(){function e(){if(u){s.style.cssText="position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0",u.style.cssText="position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%",ie.appendChild(s).appendChild(u);var e=C.getComputedStyle(u);n="1%"!==e.top,a=12===t(e.marginLeft),u.style.right="60%",o=36===t(e.right),r=36===t(e.width),u.style.position="absolute",i=12===t(u.offsetWidth/3),ie.removeChild(s),u=null}}function t(e){return Math.round(parseFloat(e))}var n,r,i,o,a,s=E.createElement("div"),u=E.createElement("div");u.style&&(u.style.backgroundClip="content-box",u.cloneNode(!0).style.backgroundClip="",y.clearCloneStyle="content-box"===u.style.backgroundClip,k.extend(y,{boxSizingReliable:function(){return e(),r},pixelBoxStyles:function(){return e(),o},pixelPosition:function(){return e(),n},reliableMarginLeft:function(){return e(),a},scrollboxSize:function(){return e(),i}}))}();var Ue=["Webkit","Moz","ms"],Xe=E.createElement("div").style,Ve={};function Ge(e){var t=k.cssProps[e]||Ve[e];return t||(e in Xe?e:Ve[e]=function(e){var t=e[0].toUpperCase()+e.slice(1),n=Ue.length;while(n--)if((e=Ue[n]+t)in Xe)return e}(e)||e)}var Ye=/^(none|table(?!-c[ea]).+)/,Qe=/^--/,Je={position:"absolute",visibility:"hidden",display:"block"},Ke={letterSpacing:"0",fontWeight:"400"};function Ze(e,t,n){var r=ne.exec(t);return r?Math.max(0,r[2]-(n||0))+(r[3]||"px"):t}function et(e,t,n,r,i,o){var a="width"===t?1:0,s=0,u=0;if(n===(r?"border":"content"))return 0;for(;a<4;a+=2)"margin"===n&&(u+=k.css(e,n+re[a],!0,i)),r?("content"===n&&(u-=k.css(e,"padding"+re[a],!0,i)),"margin"!==n&&(u-=k.css(e,"border"+re[a]+"Width",!0,i))):(u+=k.css(e,"padding"+re[a],!0,i),"padding"!==n?u+=k.css(e,"border"+re[a]+"Width",!0,i):s+=k.css(e,"border"+re[a]+"Width",!0,i));return!r&&0<=o&&(u+=Math.max(0,Math.ceil(e["offset"+t[0].toUpperCase()+t.slice(1)]-o-u-s-.5))||0),u}function tt(e,t,n){var r=Fe(e),i=(!y.boxSizingReliable()||n)&&"border-box"===k.css(e,"boxSizing",!1,r),o=i,a=_e(e,t,r),s="offset"+t[0].toUpperCase()+t.slice(1);if($e.test(a)){if(!n)return a;a="auto"}return(!y.boxSizingReliable()&&i||"auto"===a||!parseFloat(a)&&"inline"===k.css(e,"display",!1,r))&&e.getClientRects().length&&(i="border-box"===k.css(e,"boxSizing",!1,r),(o=s in e)&&(a=e[s])),(a=parseFloat(a)||0)+et(e,t,n||(i?"border":"content"),o,r,a)+"px"}function nt(e,t,n,r,i){return new nt.prototype.init(e,t,n,r,i)}k.extend({cssHooks:{opacity:{get:function(e,t){if(t){var n=_e(e,"opacity");return""===n?"1":n}}}},cssNumber:{animationIterationCount:!0,columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,gridArea:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnStart:!0,gridRow:!0,gridRowEnd:!0,gridRowStart:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{},style:function(e,t,n,r){if(e&&3!==e.nodeType&&8!==e.nodeType&&e.style){var i,o,a,s=V(t),u=Qe.test(t),l=e.style;if(u||(t=Ge(s)),a=k.cssHooks[t]||k.cssHooks[s],void 0===n)return a&&"get"in a&&void 0!==(i=a.get(e,!1,r))?i:l[t];"string"===(o=typeof n)&&(i=ne.exec(n))&&i[1]&&(n=le(e,t,i),o="number"),null!=n&&n==n&&("number"!==o||u||(n+=i&&i[3]||(k.cssNumber[s]?"":"px")),y.clearCloneStyle||""!==n||0!==t.indexOf("background")||(l[t]="inherit"),a&&"set"in a&&void 0===(n=a.set(e,n,r))||(u?l.setProperty(t,n):l[t]=n))}},css:function(e,t,n,r){var i,o,a,s=V(t);return Qe.test(t)||(t=Ge(s)),(a=k.cssHooks[t]||k.cssHooks[s])&&"get"in a&&(i=a.get(e,!0,n)),void 0===i&&(i=_e(e,t,r)),"normal"===i&&t in Ke&&(i=Ke[t]),""===n||n?(o=parseFloat(i),!0===n||isFinite(o)?o||0:i):i}}),k.each(["height","width"],function(e,u){k.cssHooks[u]={get:function(e,t,n){if(t)return!Ye.test(k.css(e,"display"))||e.getClientRects().length&&e.getBoundingClientRect().width?tt(e,u,n):ue(e,Je,function(){return tt(e,u,n)})},set:function(e,t,n){var r,i=Fe(e),o=!y.scrollboxSize()&&"absolute"===i.position,a=(o||n)&&"border-box"===k.css(e,"boxSizing",!1,i),s=n?et(e,u,n,a,i):0;return a&&o&&(s-=Math.ceil(e["offset"+u[0].toUpperCase()+u.slice(1)]-parseFloat(i[u])-et(e,u,"border",!1,i)-.5)),s&&(r=ne.exec(t))&&"px"!==(r[3]||"px")&&(e.style[u]=t,t=k.css(e,u)),Ze(0,t,s)}}}),k.cssHooks.marginLeft=ze(y.reliableMarginLeft,function(e,t){if(t)return(parseFloat(_e(e,"marginLeft"))||e.getBoundingClientRect().left-ue(e,{marginLeft:0},function(){return e.getBoundingClientRect().left}))+"px"}),k.each({margin:"",padding:"",border:"Width"},function(i,o){k.cssHooks[i+o]={expand:function(e){for(var t=0,n={},r="string"==typeof e?e.split(" "):[e];t<4;t++)n[i+re[t]+o]=r[t]||r[t-2]||r[0];return n}},"margin"!==i&&(k.cssHooks[i+o].set=Ze)}),k.fn.extend({css:function(e,t){return _(this,function(e,t,n){var r,i,o={},a=0;if(Array.isArray(t)){for(r=Fe(e),i=t.length;a<i;a++)o[t[a]]=k.css(e,t[a],!1,r);return o}return void 0!==n?k.style(e,t,n):k.css(e,t)},e,t,1<arguments.length)}}),((k.Tween=nt).prototype={constructor:nt,init:function(e,t,n,r,i,o){this.elem=e,this.prop=n,this.easing=i||k.easing._default,this.options=t,this.start=this.now=this.cur(),this.end=r,this.unit=o||(k.cssNumber[n]?"":"px")},cur:function(){var e=nt.propHooks[this.prop];return e&&e.get?e.get(this):nt.propHooks._default.get(this)},run:function(e){var t,n=nt.propHooks[this.prop];return this.options.duration?this.pos=t=k.easing[this.easing](e,this.options.duration*e,0,1,this.options.duration):this.pos=t=e,this.now=(this.end-this.start)*t+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),n&&n.set?n.set(this):nt.propHooks._default.set(this),this}}).init.prototype=nt.prototype,(nt.propHooks={_default:{get:function(e){var t;return 1!==e.elem.nodeType||null!=e.elem[e.prop]&&null==e.elem.style[e.prop]?e.elem[e.prop]:(t=k.css(e.elem,e.prop,""))&&"auto"!==t?t:0},set:function(e){k.fx.step[e.prop]?k.fx.step[e.prop](e):1!==e.elem.nodeType||!k.cssHooks[e.prop]&&null==e.elem.style[Ge(e.prop)]?e.elem[e.prop]=e.now:k.style(e.elem,e.prop,e.now+e.unit)}}}).scrollTop=nt.propHooks.scrollLeft={set:function(e){e.elem.nodeType&&e.elem.parentNode&&(e.elem[e.prop]=e.now)}},k.easing={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2},_default:"swing"},k.fx=nt.prototype.init,k.fx.step={};var rt,it,ot,at,st=/^(?:toggle|show|hide)$/,ut=/queueHooks$/;function lt(){it&&(!1===E.hidden&&C.requestAnimationFrame?C.requestAnimationFrame(lt):C.setTimeout(lt,k.fx.interval),k.fx.tick())}function ct(){return C.setTimeout(function(){rt=void 0}),rt=Date.now()}function ft(e,t){var n,r=0,i={height:e};for(t=t?1:0;r<4;r+=2-t)i["margin"+(n=re[r])]=i["padding"+n]=e;return t&&(i.opacity=i.width=e),i}function pt(e,t,n){for(var r,i=(dt.tweeners[t]||[]).concat(dt.tweeners["*"]),o=0,a=i.length;o<a;o++)if(r=i[o].call(n,t,e))return r}function dt(o,e,t){var n,a,r=0,i=dt.prefilters.length,s=k.Deferred().always(function(){delete u.elem}),u=function(){if(a)return!1;for(var e=rt||ct(),t=Math.max(0,l.startTime+l.duration-e),n=1-(t/l.duration||0),r=0,i=l.tweens.length;r<i;r++)l.tweens[r].run(n);return s.notifyWith(o,[l,n,t]),n<1&&i?t:(i||s.notifyWith(o,[l,1,0]),s.resolveWith(o,[l]),!1)},l=s.promise({elem:o,props:k.extend({},e),opts:k.extend(!0,{specialEasing:{},easing:k.easing._default},t),originalProperties:e,originalOptions:t,startTime:rt||ct(),duration:t.duration,tweens:[],createTween:function(e,t){var n=k.Tween(o,l.opts,e,t,l.opts.specialEasing[e]||l.opts.easing);return l.tweens.push(n),n},stop:function(e){var t=0,n=e?l.tweens.length:0;if(a)return this;for(a=!0;t<n;t++)l.tweens[t].run(1);return e?(s.notifyWith(o,[l,1,0]),s.resolveWith(o,[l,e])):s.rejectWith(o,[l,e]),this}}),c=l.props;for(!function(e,t){var n,r,i,o,a;for(n in e)if(i=t[r=V(n)],o=e[n],Array.isArray(o)&&(i=o[1],o=e[n]=o[0]),n!==r&&(e[r]=o,delete e[n]),(a=k.cssHooks[r])&&"expand"in a)for(n in o=a.expand(o),delete e[r],o)n in e||(e[n]=o[n],t[n]=i);else t[r]=i}(c,l.opts.specialEasing);r<i;r++)if(n=dt.prefilters[r].call(l,o,c,l.opts))return m(n.stop)&&(k._queueHooks(l.elem,l.opts.queue).stop=n.stop.bind(n)),n;return k.map(c,pt,l),m(l.opts.start)&&l.opts.start.call(o,l),l.progress(l.opts.progress).done(l.opts.done,l.opts.complete).fail(l.opts.fail).always(l.opts.always),k.fx.timer(k.extend(u,{elem:o,anim:l,queue:l.opts.queue})),l}k.Animation=k.extend(dt,{tweeners:{"*":[function(e,t){var n=this.createTween(e,t);return le(n.elem,e,ne.exec(t),n),n}]},tweener:function(e,t){m(e)?(t=e,e=["*"]):e=e.match(R);for(var n,r=0,i=e.length;r<i;r++)n=e[r],dt.tweeners[n]=dt.tweeners[n]||[],dt.tweeners[n].unshift(t)},prefilters:[function(e,t,n){var r,i,o,a,s,u,l,c,f="width"in t||"height"in t,p=this,d={},h=e.style,g=e.nodeType&&se(e),v=Q.get(e,"fxshow");for(r in n.queue||(null==(a=k._queueHooks(e,"fx")).unqueued&&(a.unqueued=0,s=a.empty.fire,a.empty.fire=function(){a.unqueued||s()}),a.unqueued++,p.always(function(){p.always(function(){a.unqueued--,k.queue(e,"fx").length||a.empty.fire()})})),t)if(i=t[r],st.test(i)){if(delete t[r],o=o||"toggle"===i,i===(g?"hide":"show")){if("show"!==i||!v||void 0===v[r])continue;g=!0}d[r]=v&&v[r]||k.style(e,r)}if((u=!k.isEmptyObject(t))||!k.isEmptyObject(d))for(r in f&&1===e.nodeType&&(n.overflow=[h.overflow,h.overflowX,h.overflowY],null==(l=v&&v.display)&&(l=Q.get(e,"display")),"none"===(c=k.css(e,"display"))&&(l?c=l:(fe([e],!0),l=e.style.display||l,c=k.css(e,"display"),fe([e]))),("inline"===c||"inline-block"===c&&null!=l)&&"none"===k.css(e,"float")&&(u||(p.done(function(){h.display=l}),null==l&&(c=h.display,l="none"===c?"":c)),h.display="inline-block")),n.overflow&&(h.overflow="hidden",p.always(function(){h.overflow=n.overflow[0],h.overflowX=n.overflow[1],h.overflowY=n.overflow[2]})),u=!1,d)u||(v?"hidden"in v&&(g=v.hidden):v=Q.access(e,"fxshow",{display:l}),o&&(v.hidden=!g),g&&fe([e],!0),p.done(function(){for(r in g||fe([e]),Q.remove(e,"fxshow"),d)k.style(e,r,d[r])})),u=pt(g?v[r]:0,r,p),r in v||(v[r]=u.start,g&&(u.end=u.start,u.start=0))}],prefilter:function(e,t){t?dt.prefilters.unshift(e):dt.prefilters.push(e)}}),k.speed=function(e,t,n){var r=e&&"object"==typeof e?k.extend({},e):{complete:n||!n&&t||m(e)&&e,duration:e,easing:n&&t||t&&!m(t)&&t};return k.fx.off?r.duration=0:"number"!=typeof r.duration&&(r.duration in k.fx.speeds?r.duration=k.fx.speeds[r.duration]:r.duration=k.fx.speeds._default),null!=r.queue&&!0!==r.queue||(r.queue="fx"),r.old=r.complete,r.complete=function(){m(r.old)&&r.old.call(this),r.queue&&k.dequeue(this,r.queue)},r},k.fn.extend({fadeTo:function(e,t,n,r){return this.filter(se).css("opacity",0).show().end().animate({opacity:t},e,n,r)},animate:function(t,e,n,r){var i=k.isEmptyObject(t),o=k.speed(e,n,r),a=function(){var e=dt(this,k.extend({},t),o);(i||Q.get(this,"finish"))&&e.stop(!0)};return a.finish=a,i||!1===o.queue?this.each(a):this.queue(o.queue,a)},stop:function(i,e,o){var a=function(e){var t=e.stop;delete e.stop,t(o)};return"string"!=typeof i&&(o=e,e=i,i=void 0),e&&!1!==i&&this.queue(i||"fx",[]),this.each(function(){var e=!0,t=null!=i&&i+"queueHooks",n=k.timers,r=Q.get(this);if(t)r[t]&&r[t].stop&&a(r[t]);else for(t in r)r[t]&&r[t].stop&&ut.test(t)&&a(r[t]);for(t=n.length;t--;)n[t].elem!==this||null!=i&&n[t].queue!==i||(n[t].anim.stop(o),e=!1,n.splice(t,1));!e&&o||k.dequeue(this,i)})},finish:function(a){return!1!==a&&(a=a||"fx"),this.each(function(){var e,t=Q.get(this),n=t[a+"queue"],r=t[a+"queueHooks"],i=k.timers,o=n?n.length:0;for(t.finish=!0,k.queue(this,a,[]),r&&r.stop&&r.stop.call(this,!0),e=i.length;e--;)i[e].elem===this&&i[e].queue===a&&(i[e].anim.stop(!0),i.splice(e,1));for(e=0;e<o;e++)n[e]&&n[e].finish&&n[e].finish.call(this);delete t.finish})}}),k.each(["toggle","show","hide"],function(e,r){var i=k.fn[r];k.fn[r]=function(e,t,n){return null==e||"boolean"==typeof e?i.apply(this,arguments):this.animate(ft(r,!0),e,t,n)}}),k.each({slideDown:ft("show"),slideUp:ft("hide"),slideToggle:ft("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(e,r){k.fn[e]=function(e,t,n){return this.animate(r,e,t,n)}}),k.timers=[],k.fx.tick=function(){var e,t=0,n=k.timers;for(rt=Date.now();t<n.length;t++)(e=n[t])()||n[t]!==e||n.splice(t--,1);n.length||k.fx.stop(),rt=void 0},k.fx.timer=function(e){k.timers.push(e),k.fx.start()},k.fx.interval=13,k.fx.start=function(){it||(it=!0,lt())},k.fx.stop=function(){it=null},k.fx.speeds={slow:600,fast:200,_default:400},k.fn.delay=function(r,e){return r=k.fx&&k.fx.speeds[r]||r,e=e||"fx",this.queue(e,function(e,t){var n=C.setTimeout(e,r);t.stop=function(){C.clearTimeout(n)}})},ot=E.createElement("input"),at=E.createElement("select").appendChild(E.createElement("option")),ot.type="checkbox",y.checkOn=""!==ot.value,y.optSelected=at.selected,(ot=E.createElement("input")).value="t",ot.type="radio",y.radioValue="t"===ot.value;var ht,gt=k.expr.attrHandle;k.fn.extend({attr:function(e,t){return _(this,k.attr,e,t,1<arguments.length)},removeAttr:function(e){return this.each(function(){k.removeAttr(this,e)})}}),k.extend({attr:function(e,t,n){var r,i,o=e.nodeType;if(3!==o&&8!==o&&2!==o)return"undefined"==typeof e.getAttribute?k.prop(e,t,n):(1===o&&k.isXMLDoc(e)||(i=k.attrHooks[t.toLowerCase()]||(k.expr.match.bool.test(t)?ht:void 0)),void 0!==n?null===n?void k.removeAttr(e,t):i&&"set"in i&&void 0!==(r=i.set(e,n,t))?r:(e.setAttribute(t,n+""),n):i&&"get"in i&&null!==(r=i.get(e,t))?r:null==(r=k.find.attr(e,t))?void 0:r)},attrHooks:{type:{set:function(e,t){if(!y.radioValue&&"radio"===t&&A(e,"input")){var n=e.value;return e.setAttribute("type",t),n&&(e.value=n),t}}}},removeAttr:function(e,t){var n,r=0,i=t&&t.match(R);if(i&&1===e.nodeType)while(n=i[r++])e.removeAttribute(n)}}),ht={set:function(e,t,n){return!1===t?k.removeAttr(e,n):e.setAttribute(n,n),n}},k.each(k.expr.match.bool.source.match(/\w+/g),function(e,t){var a=gt[t]||k.find.attr;gt[t]=function(e,t,n){var r,i,o=t.toLowerCase();return n||(i=gt[o],gt[o]=r,r=null!=a(e,t,n)?o:null,gt[o]=i),r}});var vt=/^(?:input|select|textarea|button)$/i,yt=/^(?:a|area)$/i;function mt(e){return(e.match(R)||[]).join(" ")}function xt(e){return e.getAttribute&&e.getAttribute("class")||""}function bt(e){return Array.isArray(e)?e:"string"==typeof e&&e.match(R)||[]}k.fn.extend({prop:function(e,t){return _(this,k.prop,e,t,1<arguments.length)},removeProp:function(e){return this.each(function(){delete this[k.propFix[e]||e]})}}),k.extend({prop:function(e,t,n){var r,i,o=e.nodeType;if(3!==o&&8!==o&&2!==o)return 1===o&&k.isXMLDoc(e)||(t=k.propFix[t]||t,i=k.propHooks[t]),void 0!==n?i&&"set"in i&&void 0!==(r=i.set(e,n,t))?r:e[t]=n:i&&"get"in i&&null!==(r=i.get(e,t))?r:e[t]},propHooks:{tabIndex:{get:function(e){var t=k.find.attr(e,"tabindex");return t?parseInt(t,10):vt.test(e.nodeName)||yt.test(e.nodeName)&&e.href?0:-1}}},propFix:{"for":"htmlFor","class":"className"}}),y.optSelected||(k.propHooks.selected={get:function(e){var t=e.parentNode;return t&&t.parentNode&&t.parentNode.selectedIndex,null},set:function(e){var t=e.parentNode;t&&(t.selectedIndex,t.parentNode&&t.parentNode.selectedIndex)}}),k.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){k.propFix[this.toLowerCase()]=this}),k.fn.extend({addClass:function(t){var e,n,r,i,o,a,s,u=0;if(m(t))return this.each(function(e){k(this).addClass(t.call(this,e,xt(this)))});if((e=bt(t)).length)while(n=this[u++])if(i=xt(n),r=1===n.nodeType&&" "+mt(i)+" "){a=0;while(o=e[a++])r.indexOf(" "+o+" ")<0&&(r+=o+" ");i!==(s=mt(r))&&n.setAttribute("class",s)}return this},removeClass:function(t){var e,n,r,i,o,a,s,u=0;if(m(t))return this.each(function(e){k(this).removeClass(t.call(this,e,xt(this)))});if(!arguments.length)return this.attr("class","");if((e=bt(t)).length)while(n=this[u++])if(i=xt(n),r=1===n.nodeType&&" "+mt(i)+" "){a=0;while(o=e[a++])while(-1<r.indexOf(" "+o+" "))r=r.replace(" "+o+" "," ");i!==(s=mt(r))&&n.setAttribute("class",s)}return this},toggleClass:function(i,t){var o=typeof i,a="string"===o||Array.isArray(i);return"boolean"==typeof t&&a?t?this.addClass(i):this.removeClass(i):m(i)?this.each(function(e){k(this).toggleClass(i.call(this,e,xt(this),t),t)}):this.each(function(){var e,t,n,r;if(a){t=0,n=k(this),r=bt(i);while(e=r[t++])n.hasClass(e)?n.removeClass(e):n.addClass(e)}else void 0!==i&&"boolean"!==o||((e=xt(this))&&Q.set(this,"__className__",e),this.setAttribute&&this.setAttribute("class",e||!1===i?"":Q.get(this,"__className__")||""))})},hasClass:function(e){var t,n,r=0;t=" "+e+" ";while(n=this[r++])if(1===n.nodeType&&-1<(" "+mt(xt(n))+" ").indexOf(t))return!0;return!1}});var wt=/\r/g;k.fn.extend({val:function(n){var r,e,i,t=this[0];return arguments.length?(i=m(n),this.each(function(e){var t;1===this.nodeType&&(null==(t=i?n.call(this,e,k(this).val()):n)?t="":"number"==typeof t?t+="":Array.isArray(t)&&(t=k.map(t,function(e){return null==e?"":e+""})),(r=k.valHooks[this.type]||k.valHooks[this.nodeName.toLowerCase()])&&"set"in r&&void 0!==r.set(this,t,"value")||(this.value=t))})):t?(r=k.valHooks[t.type]||k.valHooks[t.nodeName.toLowerCase()])&&"get"in r&&void 0!==(e=r.get(t,"value"))?e:"string"==typeof(e=t.value)?e.replace(wt,""):null==e?"":e:void 0}}),k.extend({valHooks:{option:{get:function(e){var t=k.find.attr(e,"value");return null!=t?t:mt(k.text(e))}},select:{get:function(e){var t,n,r,i=e.options,o=e.selectedIndex,a="select-one"===e.type,s=a?null:[],u=a?o+1:i.length;for(r=o<0?u:a?o:0;r<u;r++)if(((n=i[r]).selected||r===o)&&!n.disabled&&(!n.parentNode.disabled||!A(n.parentNode,"optgroup"))){if(t=k(n).val(),a)return t;s.push(t)}return s},set:function(e,t){var n,r,i=e.options,o=k.makeArray(t),a=i.length;while(a--)((r=i[a]).selected=-1<k.inArray(k.valHooks.option.get(r),o))&&(n=!0);return n||(e.selectedIndex=-1),o}}}}),k.each(["radio","checkbox"],function(){k.valHooks[this]={set:function(e,t){if(Array.isArray(t))return e.checked=-1<k.inArray(k(e).val(),t)}},y.checkOn||(k.valHooks[this].get=function(e){return null===e.getAttribute("value")?"on":e.value})}),y.focusin="onfocusin"in C;var Tt=/^(?:focusinfocus|focusoutblur)$/,Ct=function(e){e.stopPropagation()};k.extend(k.event,{trigger:function(e,t,n,r){var i,o,a,s,u,l,c,f,p=[n||E],d=v.call(e,"type")?e.type:e,h=v.call(e,"namespace")?e.namespace.split("."):[];if(o=f=a=n=n||E,3!==n.nodeType&&8!==n.nodeType&&!Tt.test(d+k.event.triggered)&&(-1<d.indexOf(".")&&(d=(h=d.split(".")).shift(),h.sort()),u=d.indexOf(":")<0&&"on"+d,(e=e[k.expando]?e:new k.Event(d,"object"==typeof e&&e)).isTrigger=r?2:3,e.namespace=h.join("."),e.rnamespace=e.namespace?new RegExp("(^|\\.)"+h.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,e.result=void 0,e.target||(e.target=n),t=null==t?[e]:k.makeArray(t,[e]),c=k.event.special[d]||{},r||!c.trigger||!1!==c.trigger.apply(n,t))){if(!r&&!c.noBubble&&!x(n)){for(s=c.delegateType||d,Tt.test(s+d)||(o=o.parentNode);o;o=o.parentNode)p.push(o),a=o;a===(n.ownerDocument||E)&&p.push(a.defaultView||a.parentWindow||C)}i=0;while((o=p[i++])&&!e.isPropagationStopped())f=o,e.type=1<i?s:c.bindType||d,(l=(Q.get(o,"events")||{})[e.type]&&Q.get(o,"handle"))&&l.apply(o,t),(l=u&&o[u])&&l.apply&&G(o)&&(e.result=l.apply(o,t),!1===e.result&&e.preventDefault());return e.type=d,r||e.isDefaultPrevented()||c._default&&!1!==c._default.apply(p.pop(),t)||!G(n)||u&&m(n[d])&&!x(n)&&((a=n[u])&&(n[u]=null),k.event.triggered=d,e.isPropagationStopped()&&f.addEventListener(d,Ct),n[d](),e.isPropagationStopped()&&f.removeEventListener(d,Ct),k.event.triggered=void 0,a&&(n[u]=a)),e.result}},simulate:function(e,t,n){var r=k.extend(new k.Event,n,{type:e,isSimulated:!0});k.event.trigger(r,null,t)}}),k.fn.extend({trigger:function(e,t){return this.each(function(){k.event.trigger(e,t,this)})},triggerHandler:function(e,t){var n=this[0];if(n)return k.event.trigger(e,t,n,!0)}}),y.focusin||k.each({focus:"focusin",blur:"focusout"},function(n,r){var i=function(e){k.event.simulate(r,e.target,k.event.fix(e))};k.event.special[r]={setup:function(){var e=this.ownerDocument||this,t=Q.access(e,r);t||e.addEventListener(n,i,!0),Q.access(e,r,(t||0)+1)},teardown:function(){var e=this.ownerDocument||this,t=Q.access(e,r)-1;t?Q.access(e,r,t):(e.removeEventListener(n,i,!0),Q.remove(e,r))}}});var Et=C.location,kt=Date.now(),St=/\?/;k.parseXML=function(e){var t;if(!e||"string"!=typeof e)return null;try{t=(new C.DOMParser).parseFromString(e,"text/xml")}catch(e){t=void 0}return t&&!t.getElementsByTagName("parsererror").length||k.error("Invalid XML: "+e),t};var Nt=/\[\]$/,At=/\r?\n/g,Dt=/^(?:submit|button|image|reset|file)$/i,jt=/^(?:input|select|textarea|keygen)/i;function qt(n,e,r,i){var t;if(Array.isArray(e))k.each(e,function(e,t){r||Nt.test(n)?i(n,t):qt(n+"["+("object"==typeof t&&null!=t?e:"")+"]",t,r,i)});else if(r||"object"!==w(e))i(n,e);else for(t in e)qt(n+"["+t+"]",e[t],r,i)}k.param=function(e,t){var n,r=[],i=function(e,t){var n=m(t)?t():t;r[r.length]=encodeURIComponent(e)+"="+encodeURIComponent(null==n?"":n)};if(null==e)return"";if(Array.isArray(e)||e.jquery&&!k.isPlainObject(e))k.each(e,function(){i(this.name,this.value)});else for(n in e)qt(n,e[n],t,i);return r.join("&")},k.fn.extend({serialize:function(){return k.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var e=k.prop(this,"elements");return e?k.makeArray(e):this}).filter(function(){var e=this.type;return this.name&&!k(this).is(":disabled")&&jt.test(this.nodeName)&&!Dt.test(e)&&(this.checked||!pe.test(e))}).map(function(e,t){var n=k(this).val();return null==n?null:Array.isArray(n)?k.map(n,function(e){return{name:t.name,value:e.replace(At,"\r\n")}}):{name:t.name,value:n.replace(At,"\r\n")}}).get()}});var Lt=/%20/g,Ht=/#.*$/,Ot=/([?&])_=[^&]*/,Pt=/^(.*?):[ \t]*([^\r\n]*)$/gm,Rt=/^(?:GET|HEAD)$/,Mt=/^\/\//,It={},Wt={},$t="*/".concat("*"),Ft=E.createElement("a");function Bt(o){return function(e,t){"string"!=typeof e&&(t=e,e="*");var n,r=0,i=e.toLowerCase().match(R)||[];if(m(t))while(n=i[r++])"+"===n[0]?(n=n.slice(1)||"*",(o[n]=o[n]||[]).unshift(t)):(o[n]=o[n]||[]).push(t)}}function _t(t,i,o,a){var s={},u=t===Wt;function l(e){var r;return s[e]=!0,k.each(t[e]||[],function(e,t){var n=t(i,o,a);return"string"!=typeof n||u||s[n]?u?!(r=n):void 0:(i.dataTypes.unshift(n),l(n),!1)}),r}return l(i.dataTypes[0])||!s["*"]&&l("*")}function zt(e,t){var n,r,i=k.ajaxSettings.flatOptions||{};for(n in t)void 0!==t[n]&&((i[n]?e:r||(r={}))[n]=t[n]);return r&&k.extend(!0,e,r),e}Ft.href=Et.href,k.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:Et.href,type:"GET",isLocal:/^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(Et.protocol),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":$t,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/\bxml\b/,html:/\bhtml/,json:/\bjson\b/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":JSON.parse,"text xml":k.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(e,t){return t?zt(zt(e,k.ajaxSettings),t):zt(k.ajaxSettings,e)},ajaxPrefilter:Bt(It),ajaxTransport:Bt(Wt),ajax:function(e,t){"object"==typeof e&&(t=e,e=void 0),t=t||{};var c,f,p,n,d,r,h,g,i,o,v=k.ajaxSetup({},t),y=v.context||v,m=v.context&&(y.nodeType||y.jquery)?k(y):k.event,x=k.Deferred(),b=k.Callbacks("once memory"),w=v.statusCode||{},a={},s={},u="canceled",T={readyState:0,getResponseHeader:function(e){var t;if(h){if(!n){n={};while(t=Pt.exec(p))n[t[1].toLowerCase()+" "]=(n[t[1].toLowerCase()+" "]||[]).concat(t[2])}t=n[e.toLowerCase()+" "]}return null==t?null:t.join(", ")},getAllResponseHeaders:function(){return h?p:null},setRequestHeader:function(e,t){return null==h&&(e=s[e.toLowerCase()]=s[e.toLowerCase()]||e,a[e]=t),this},overrideMimeType:function(e){return null==h&&(v.mimeType=e),this},statusCode:function(e){var t;if(e)if(h)T.always(e[T.status]);else for(t in e)w[t]=[w[t],e[t]];return this},abort:function(e){var t=e||u;return c&&c.abort(t),l(0,t),this}};if(x.promise(T),v.url=((e||v.url||Et.href)+"").replace(Mt,Et.protocol+"//"),v.type=t.method||t.type||v.method||v.type,v.dataTypes=(v.dataType||"*").toLowerCase().match(R)||[""],null==v.crossDomain){r=E.createElement("a");try{r.href=v.url,r.href=r.href,v.crossDomain=Ft.protocol+"//"+Ft.host!=r.protocol+"//"+r.host}catch(e){v.crossDomain=!0}}if(v.data&&v.processData&&"string"!=typeof v.data&&(v.data=k.param(v.data,v.traditional)),_t(It,v,t,T),h)return T;for(i in(g=k.event&&v.global)&&0==k.active++&&k.event.trigger("ajaxStart"),v.type=v.type.toUpperCase(),v.hasContent=!Rt.test(v.type),f=v.url.replace(Ht,""),v.hasContent?v.data&&v.processData&&0===(v.contentType||"").indexOf("application/x-www-form-urlencoded")&&(v.data=v.data.replace(Lt,"+")):(o=v.url.slice(f.length),v.data&&(v.processData||"string"==typeof v.data)&&(f+=(St.test(f)?"&":"?")+v.data,delete v.data),!1===v.cache&&(f=f.replace(Ot,"$1"),o=(St.test(f)?"&":"?")+"_="+kt+++o),v.url=f+o),v.ifModified&&(k.lastModified[f]&&T.setRequestHeader("If-Modified-Since",k.lastModified[f]),k.etag[f]&&T.setRequestHeader("If-None-Match",k.etag[f])),(v.data&&v.hasContent&&!1!==v.contentType||t.contentType)&&T.setRequestHeader("Content-Type",v.contentType),T.setRequestHeader("Accept",v.dataTypes[0]&&v.accepts[v.dataTypes[0]]?v.accepts[v.dataTypes[0]]+("*"!==v.dataTypes[0]?", "+$t+"; q=0.01":""):v.accepts["*"]),v.headers)T.setRequestHeader(i,v.headers[i]);if(v.beforeSend&&(!1===v.beforeSend.call(y,T,v)||h))return T.abort();if(u="abort",b.add(v.complete),T.done(v.success),T.fail(v.error),c=_t(Wt,v,t,T)){if(T.readyState=1,g&&m.trigger("ajaxSend",[T,v]),h)return T;v.async&&0<v.timeout&&(d=C.setTimeout(function(){T.abort("timeout")},v.timeout));try{h=!1,c.send(a,l)}catch(e){if(h)throw e;l(-1,e)}}else l(-1,"No Transport");function l(e,t,n,r){var i,o,a,s,u,l=t;h||(h=!0,d&&C.clearTimeout(d),c=void 0,p=r||"",T.readyState=0<e?4:0,i=200<=e&&e<300||304===e,n&&(s=function(e,t,n){var r,i,o,a,s=e.contents,u=e.dataTypes;while("*"===u[0])u.shift(),void 0===r&&(r=e.mimeType||t.getResponseHeader("Content-Type"));if(r)for(i in s)if(s[i]&&s[i].test(r)){u.unshift(i);break}if(u[0]in n)o=u[0];else{for(i in n){if(!u[0]||e.converters[i+" "+u[0]]){o=i;break}a||(a=i)}o=o||a}if(o)return o!==u[0]&&u.unshift(o),n[o]}(v,T,n)),s=function(e,t,n,r){var i,o,a,s,u,l={},c=e.dataTypes.slice();if(c[1])for(a in e.converters)l[a.toLowerCase()]=e.converters[a];o=c.shift();while(o)if(e.responseFields[o]&&(n[e.responseFields[o]]=t),!u&&r&&e.dataFilter&&(t=e.dataFilter(t,e.dataType)),u=o,o=c.shift())if("*"===o)o=u;else if("*"!==u&&u!==o){if(!(a=l[u+" "+o]||l["* "+o]))for(i in l)if((s=i.split(" "))[1]===o&&(a=l[u+" "+s[0]]||l["* "+s[0]])){!0===a?a=l[i]:!0!==l[i]&&(o=s[0],c.unshift(s[1]));break}if(!0!==a)if(a&&e["throws"])t=a(t);else try{t=a(t)}catch(e){return{state:"parsererror",error:a?e:"No conversion from "+u+" to "+o}}}return{state:"success",data:t}}(v,s,T,i),i?(v.ifModified&&((u=T.getResponseHeader("Last-Modified"))&&(k.lastModified[f]=u),(u=T.getResponseHeader("etag"))&&(k.etag[f]=u)),204===e||"HEAD"===v.type?l="nocontent":304===e?l="notmodified":(l=s.state,o=s.data,i=!(a=s.error))):(a=l,!e&&l||(l="error",e<0&&(e=0))),T.status=e,T.statusText=(t||l)+"",i?x.resolveWith(y,[o,l,T]):x.rejectWith(y,[T,l,a]),T.statusCode(w),w=void 0,g&&m.trigger(i?"ajaxSuccess":"ajaxError",[T,v,i?o:a]),b.fireWith(y,[T,l]),g&&(m.trigger("ajaxComplete",[T,v]),--k.active||k.event.trigger("ajaxStop")))}return T},getJSON:function(e,t,n){return k.get(e,t,n,"json")},getScript:function(e,t){return k.get(e,void 0,t,"script")}}),k.each(["get","post"],function(e,i){k[i]=function(e,t,n,r){return m(t)&&(r=r||n,n=t,t=void 0),k.ajax(k.extend({url:e,type:i,dataType:r,data:t,success:n},k.isPlainObject(e)&&e))}}),k._evalUrl=function(e,t){return k.ajax({url:e,type:"GET",dataType:"script",cache:!0,async:!1,global:!1,converters:{"text script":function(){}},dataFilter:function(e){k.globalEval(e,t)}})},k.fn.extend({wrapAll:function(e){var t;return this[0]&&(m(e)&&(e=e.call(this[0])),t=k(e,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&t.insertBefore(this[0]),t.map(function(){var e=this;while(e.firstElementChild)e=e.firstElementChild;return e}).append(this)),this},wrapInner:function(n){return m(n)?this.each(function(e){k(this).wrapInner(n.call(this,e))}):this.each(function(){var e=k(this),t=e.contents();t.length?t.wrapAll(n):e.append(n)})},wrap:function(t){var n=m(t);return this.each(function(e){k(this).wrapAll(n?t.call(this,e):t)})},unwrap:function(e){return this.parent(e).not("body").each(function(){k(this).replaceWith(this.childNodes)}),this}}),k.expr.pseudos.hidden=function(e){return!k.expr.pseudos.visible(e)},k.expr.pseudos.visible=function(e){return!!(e.offsetWidth||e.offsetHeight||e.getClientRects().length)},k.ajaxSettings.xhr=function(){try{return new C.XMLHttpRequest}catch(e){}};var Ut={0:200,1223:204},Xt=k.ajaxSettings.xhr();y.cors=!!Xt&&"withCredentials"in Xt,y.ajax=Xt=!!Xt,k.ajaxTransport(function(i){var o,a;if(y.cors||Xt&&!i.crossDomain)return{send:function(e,t){var n,r=i.xhr();if(r.open(i.type,i.url,i.async,i.username,i.password),i.xhrFields)for(n in i.xhrFields)r[n]=i.xhrFields[n];for(n in i.mimeType&&r.overrideMimeType&&r.overrideMimeType(i.mimeType),i.crossDomain||e["X-Requested-With"]||(e["X-Requested-With"]="XMLHttpRequest"),e)r.setRequestHeader(n,e[n]);o=function(e){return function(){o&&(o=a=r.onload=r.onerror=r.onabort=r.ontimeout=r.onreadystatechange=null,"abort"===e?r.abort():"error"===e?"number"!=typeof r.status?t(0,"error"):t(r.status,r.statusText):t(Ut[r.status]||r.status,r.statusText,"text"!==(r.responseType||"text")||"string"!=typeof r.responseText?{binary:r.response}:{text:r.responseText},r.getAllResponseHeaders()))}},r.onload=o(),a=r.onerror=r.ontimeout=o("error"),void 0!==r.onabort?r.onabort=a:r.onreadystatechange=function(){4===r.readyState&&C.setTimeout(function(){o&&a()})},o=o("abort");try{r.send(i.hasContent&&i.data||null)}catch(e){if(o)throw e}},abort:function(){o&&o()}}}),k.ajaxPrefilter(function(e){e.crossDomain&&(e.contents.script=!1)}),k.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/\b(?:java|ecma)script\b/},converters:{"text script":function(e){return k.globalEval(e),e}}}),k.ajaxPrefilter("script",function(e){void 0===e.cache&&(e.cache=!1),e.crossDomain&&(e.type="GET")}),k.ajaxTransport("script",function(n){var r,i;if(n.crossDomain||n.scriptAttrs)return{send:function(e,t){r=k("<script>").attr(n.scriptAttrs||{}).prop({charset:n.scriptCharset,src:n.url}).on("load error",i=function(e){r.remove(),i=null,e&&t("error"===e.type?404:200,e.type)}),E.head.appendChild(r[0])},abort:function(){i&&i()}}});var Vt,Gt=[],Yt=/(=)\?(?=&|$)|\?\?/;k.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var e=Gt.pop()||k.expando+"_"+kt++;return this[e]=!0,e}}),k.ajaxPrefilter("json jsonp",function(e,t,n){var r,i,o,a=!1!==e.jsonp&&(Yt.test(e.url)?"url":"string"==typeof e.data&&0===(e.contentType||"").indexOf("application/x-www-form-urlencoded")&&Yt.test(e.data)&&"data");if(a||"jsonp"===e.dataTypes[0])return r=e.jsonpCallback=m(e.jsonpCallback)?e.jsonpCallback():e.jsonpCallback,a?e[a]=e[a].replace(Yt,"$1"+r):!1!==e.jsonp&&(e.url+=(St.test(e.url)?"&":"?")+e.jsonp+"="+r),e.converters["script json"]=function(){return o||k.error(r+" was not called"),o[0]},e.dataTypes[0]="json",i=C[r],C[r]=function(){o=arguments},n.always(function(){void 0===i?k(C).removeProp(r):C[r]=i,e[r]&&(e.jsonpCallback=t.jsonpCallback,Gt.push(r)),o&&m(i)&&i(o[0]),o=i=void 0}),"script"}),y.createHTMLDocument=((Vt=E.implementation.createHTMLDocument("").body).innerHTML="<form></form><form></form>",2===Vt.childNodes.length),k.parseHTML=function(e,t,n){return"string"!=typeof e?[]:("boolean"==typeof t&&(n=t,t=!1),t||(y.createHTMLDocument?((r=(t=E.implementation.createHTMLDocument("")).createElement("base")).href=E.location.href,t.head.appendChild(r)):t=E),o=!n&&[],(i=D.exec(e))?[t.createElement(i[1])]:(i=we([e],t,o),o&&o.length&&k(o).remove(),k.merge([],i.childNodes)));var r,i,o},k.fn.load=function(e,t,n){var r,i,o,a=this,s=e.indexOf(" ");return-1<s&&(r=mt(e.slice(s)),e=e.slice(0,s)),m(t)?(n=t,t=void 0):t&&"object"==typeof t&&(i="POST"),0<a.length&&k.ajax({url:e,type:i||"GET",dataType:"html",data:t}).done(function(e){o=arguments,a.html(r?k("<div>").append(k.parseHTML(e)).find(r):e)}).always(n&&function(e,t){a.each(function(){n.apply(this,o||[e.responseText,t,e])})}),this},k.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(e,t){k.fn[t]=function(e){return this.on(t,e)}}),k.expr.pseudos.animated=function(t){return k.grep(k.timers,function(e){return t===e.elem}).length},k.offset={setOffset:function(e,t,n){var r,i,o,a,s,u,l=k.css(e,"position"),c=k(e),f={};"static"===l&&(e.style.position="relative"),s=c.offset(),o=k.css(e,"top"),u=k.css(e,"left"),("absolute"===l||"fixed"===l)&&-1<(o+u).indexOf("auto")?(a=(r=c.position()).top,i=r.left):(a=parseFloat(o)||0,i=parseFloat(u)||0),m(t)&&(t=t.call(e,n,k.extend({},s))),null!=t.top&&(f.top=t.top-s.top+a),null!=t.left&&(f.left=t.left-s.left+i),"using"in t?t.using.call(e,f):c.css(f)}},k.fn.extend({offset:function(t){if(arguments.length)return void 0===t?this:this.each(function(e){k.offset.setOffset(this,t,e)});var e,n,r=this[0];return r?r.getClientRects().length?(e=r.getBoundingClientRect(),n=r.ownerDocument.defaultView,{top:e.top+n.pageYOffset,left:e.left+n.pageXOffset}):{top:0,left:0}:void 0},position:function(){if(this[0]){var e,t,n,r=this[0],i={top:0,left:0};if("fixed"===k.css(r,"position"))t=r.getBoundingClientRect();else{t=this.offset(),n=r.ownerDocument,e=r.offsetParent||n.documentElement;while(e&&(e===n.body||e===n.documentElement)&&"static"===k.css(e,"position"))e=e.parentNode;e&&e!==r&&1===e.nodeType&&((i=k(e).offset()).top+=k.css(e,"borderTopWidth",!0),i.left+=k.css(e,"borderLeftWidth",!0))}return{top:t.top-i.top-k.css(r,"marginTop",!0),left:t.left-i.left-k.css(r,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var e=this.offsetParent;while(e&&"static"===k.css(e,"position"))e=e.offsetParent;return e||ie})}}),k.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(t,i){var o="pageYOffset"===i;k.fn[t]=function(e){return _(this,function(e,t,n){var r;if(x(e)?r=e:9===e.nodeType&&(r=e.defaultView),void 0===n)return r?r[i]:e[t];r?r.scrollTo(o?r.pageXOffset:n,o?n:r.pageYOffset):e[t]=n},t,e,arguments.length)}}),k.each(["top","left"],function(e,n){k.cssHooks[n]=ze(y.pixelPosition,function(e,t){if(t)return t=_e(e,n),$e.test(t)?k(e).position()[n]+"px":t})}),k.each({Height:"height",Width:"width"},function(a,s){k.each({padding:"inner"+a,content:s,"":"outer"+a},function(r,o){k.fn[o]=function(e,t){var n=arguments.length&&(r||"boolean"!=typeof e),i=r||(!0===e||!0===t?"margin":"border");return _(this,function(e,t,n){var r;return x(e)?0===o.indexOf("outer")?e["inner"+a]:e.document.documentElement["client"+a]:9===e.nodeType?(r=e.documentElement,Math.max(e.body["scroll"+a],r["scroll"+a],e.body["offset"+a],r["offset"+a],r["client"+a])):void 0===n?k.css(e,t,i):k.style(e,t,n,i)},s,n?e:void 0,n)}})}),k.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "),function(e,n){k.fn[n]=function(e,t){return 0<arguments.length?this.on(n,null,e,t):this.trigger(n)}}),k.fn.extend({hover:function(e,t){return this.mouseenter(e).mouseleave(t||e)}}),k.fn.extend({bind:function(e,t,n){return this.on(e,null,t,n)},unbind:function(e,t){return this.off(e,null,t)},delegate:function(e,t,n,r){return this.on(t,e,n,r)},undelegate:function(e,t,n){return 1===arguments.length?this.off(e,"**"):this.off(t,e||"**",n)}}),k.proxy=function(e,t){var n,r,i;if("string"==typeof t&&(n=e[t],t=e,e=n),m(e))return r=s.call(arguments,2),(i=function(){return e.apply(t||this,r.concat(s.call(arguments)))}).guid=e.guid=e.guid||k.guid++,i},k.holdReady=function(e){e?k.readyWait++:k.ready(!0)},k.isArray=Array.isArray,k.parseJSON=JSON.parse,k.nodeName=A,k.isFunction=m,k.isWindow=x,k.camelCase=V,k.type=w,k.now=Date.now,k.isNumeric=function(e){var t=k.type(e);return("number"===t||"string"===t)&&!isNaN(e-parseFloat(e))},"function"==typeof define&&define.amd&&define("jquery",[],function(){return k});var Qt=C.jQuery,Jt=C.$;return k.noConflict=function(e){return C.$===k&&(C.$=Jt),e&&C.jQuery===k&&(C.jQuery=Qt),k},e||(C.jQuery=C.$=k),k});

;/*!
  * Bootstrap v4.4.1 (https://getbootstrap.com/)
  * Copyright 2011-2019 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
  */
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("jquery")):"function"==typeof define&&define.amd?define(["exports","jquery"],t):t((e=e||self).bootstrap={},e.jQuery)}(this,function(e,p){"use strict";function i(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function s(e,t,n){return t&&i(e.prototype,t),n&&i(e,n),e}function t(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),n.push.apply(n,i)}return n}function l(o){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?t(Object(r),!0).forEach(function(e){var t,n,i;t=o,i=r[n=e],n in t?Object.defineProperty(t,n,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[n]=i}):Object.getOwnPropertyDescriptors?Object.defineProperties(o,Object.getOwnPropertyDescriptors(r)):t(Object(r)).forEach(function(e){Object.defineProperty(o,e,Object.getOwnPropertyDescriptor(r,e))})}return o}p=p&&p.hasOwnProperty("default")?p.default:p;var n="transitionend";function o(e){var t=this,n=!1;return p(this).one(m.TRANSITION_END,function(){n=!0}),setTimeout(function(){n||m.triggerTransitionEnd(t)},e),this}var m={TRANSITION_END:"bsTransitionEnd",getUID:function(e){for(;e+=~~(1e6*Math.random()),document.getElementById(e););return e},getSelectorFromElement:function(e){var t=e.getAttribute("data-target");if(!t||"#"===t){var n=e.getAttribute("href");t=n&&"#"!==n?n.trim():""}try{return document.querySelector(t)?t:null}catch(e){return null}},getTransitionDurationFromElement:function(e){if(!e)return 0;var t=p(e).css("transition-duration"),n=p(e).css("transition-delay"),i=parseFloat(t),o=parseFloat(n);return i||o?(t=t.split(",")[0],n=n.split(",")[0],1e3*(parseFloat(t)+parseFloat(n))):0},reflow:function(e){return e.offsetHeight},triggerTransitionEnd:function(e){p(e).trigger(n)},supportsTransitionEnd:function(){return Boolean(n)},isElement:function(e){return(e[0]||e).nodeType},typeCheckConfig:function(e,t,n){for(var i in n)if(Object.prototype.hasOwnProperty.call(n,i)){var o=n[i],r=t[i],s=r&&m.isElement(r)?"element":(a=r,{}.toString.call(a).match(/\s([a-z]+)/i)[1].toLowerCase());if(!new RegExp(o).test(s))throw new Error(e.toUpperCase()+': Option "'+i+'" provided type "'+s+'" but expected type "'+o+'".')}var a},findShadowRoot:function(e){if(!document.documentElement.attachShadow)return null;if("function"!=typeof e.getRootNode)return e instanceof ShadowRoot?e:e.parentNode?m.findShadowRoot(e.parentNode):null;var t=e.getRootNode();return t instanceof ShadowRoot?t:null},jQueryDetection:function(){if("undefined"==typeof p)throw new TypeError("Bootstrap's JavaScript requires jQuery. jQuery must be included before Bootstrap's JavaScript.");var e=p.fn.jquery.split(" ")[0].split(".");if(e[0]<2&&e[1]<9||1===e[0]&&9===e[1]&&e[2]<1||4<=e[0])throw new Error("Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0")}};m.jQueryDetection(),p.fn.emulateTransitionEnd=o,p.event.special[m.TRANSITION_END]={bindType:n,delegateType:n,handle:function(e){if(p(e.target).is(this))return e.handleObj.handler.apply(this,arguments)}};var r="alert",a="bs.alert",c="."+a,h=p.fn[r],u={CLOSE:"close"+c,CLOSED:"closed"+c,CLICK_DATA_API:"click"+c+".data-api"},f="alert",d="fade",g="show",_=function(){function i(e){this._element=e}var e=i.prototype;return e.close=function(e){var t=this._element;e&&(t=this._getRootElement(e)),this._triggerCloseEvent(t).isDefaultPrevented()||this._removeElement(t)},e.dispose=function(){p.removeData(this._element,a),this._element=null},e._getRootElement=function(e){var t=m.getSelectorFromElement(e),n=!1;return t&&(n=document.querySelector(t)),n=n||p(e).closest("."+f)[0]},e._triggerCloseEvent=function(e){var t=p.Event(u.CLOSE);return p(e).trigger(t),t},e._removeElement=function(t){var n=this;if(p(t).removeClass(g),p(t).hasClass(d)){var e=m.getTransitionDurationFromElement(t);p(t).one(m.TRANSITION_END,function(e){return n._destroyElement(t,e)}).emulateTransitionEnd(e)}else this._destroyElement(t)},e._destroyElement=function(e){p(e).detach().trigger(u.CLOSED).remove()},i._jQueryInterface=function(n){return this.each(function(){var e=p(this),t=e.data(a);t||(t=new i(this),e.data(a,t)),"close"===n&&t[n](this)})},i._handleDismiss=function(t){return function(e){e&&e.preventDefault(),t.close(this)}},s(i,null,[{key:"VERSION",get:function(){return"4.4.1"}}]),i}();p(document).on(u.CLICK_DATA_API,'[data-dismiss="alert"]',_._handleDismiss(new _)),p.fn[r]=_._jQueryInterface,p.fn[r].Constructor=_,p.fn[r].noConflict=function(){return p.fn[r]=h,_._jQueryInterface};var v="button",y="bs.button",E="."+y,b=".data-api",w=p.fn[v],T="active",C="btn",S="focus",D='[data-toggle^="button"]',I='[data-toggle="buttons"]',A='[data-toggle="button"]',O='[data-toggle="buttons"] .btn',N='input:not([type="hidden"])',k=".active",L=".btn",P={CLICK_DATA_API:"click"+E+b,FOCUS_BLUR_DATA_API:"focus"+E+b+" blur"+E+b,LOAD_DATA_API:"load"+E+b},x=function(){function n(e){this._element=e}var e=n.prototype;return e.toggle=function(){var e=!0,t=!0,n=p(this._element).closest(I)[0];if(n){var i=this._element.querySelector(N);if(i){if("radio"===i.type)if(i.checked&&this._element.classList.contains(T))e=!1;else{var o=n.querySelector(k);o&&p(o).removeClass(T)}else"checkbox"===i.type?"LABEL"===this._element.tagName&&i.checked===this._element.classList.contains(T)&&(e=!1):e=!1;e&&(i.checked=!this._element.classList.contains(T),p(i).trigger("change")),i.focus(),t=!1}}this._element.hasAttribute("disabled")||this._element.classList.contains("disabled")||(t&&this._element.setAttribute("aria-pressed",!this._element.classList.contains(T)),e&&p(this._element).toggleClass(T))},e.dispose=function(){p.removeData(this._element,y),this._element=null},n._jQueryInterface=function(t){return this.each(function(){var e=p(this).data(y);e||(e=new n(this),p(this).data(y,e)),"toggle"===t&&e[t]()})},s(n,null,[{key:"VERSION",get:function(){return"4.4.1"}}]),n}();p(document).on(P.CLICK_DATA_API,D,function(e){var t=e.target;if(p(t).hasClass(C)||(t=p(t).closest(L)[0]),!t||t.hasAttribute("disabled")||t.classList.contains("disabled"))e.preventDefault();else{var n=t.querySelector(N);if(n&&(n.hasAttribute("disabled")||n.classList.contains("disabled")))return void e.preventDefault();x._jQueryInterface.call(p(t),"toggle")}}).on(P.FOCUS_BLUR_DATA_API,D,function(e){var t=p(e.target).closest(L)[0];p(t).toggleClass(S,/^focus(in)?$/.test(e.type))}),p(window).on(P.LOAD_DATA_API,function(){for(var e=[].slice.call(document.querySelectorAll(O)),t=0,n=e.length;t<n;t++){var i=e[t],o=i.querySelector(N);o.checked||o.hasAttribute("checked")?i.classList.add(T):i.classList.remove(T)}for(var r=0,s=(e=[].slice.call(document.querySelectorAll(A))).length;r<s;r++){var a=e[r];"true"===a.getAttribute("aria-pressed")?a.classList.add(T):a.classList.remove(T)}}),p.fn[v]=x._jQueryInterface,p.fn[v].Constructor=x,p.fn[v].noConflict=function(){return p.fn[v]=w,x._jQueryInterface};var j="carousel",H="bs.carousel",R="."+H,F=".data-api",M=p.fn[j],W={interval:5e3,keyboard:!0,slide:!1,pause:"hover",wrap:!0,touch:!0},U={interval:"(number|boolean)",keyboard:"boolean",slide:"(boolean|string)",pause:"(string|boolean)",wrap:"boolean",touch:"boolean"},B="next",q="prev",K="left",Q="right",V={SLIDE:"slide"+R,SLID:"slid"+R,KEYDOWN:"keydown"+R,MOUSEENTER:"mouseenter"+R,MOUSELEAVE:"mouseleave"+R,TOUCHSTART:"touchstart"+R,TOUCHMOVE:"touchmove"+R,TOUCHEND:"touchend"+R,POINTERDOWN:"pointerdown"+R,POINTERUP:"pointerup"+R,DRAG_START:"dragstart"+R,LOAD_DATA_API:"load"+R+F,CLICK_DATA_API:"click"+R+F},Y="carousel",z="active",X="slide",G="carousel-item-right",$="carousel-item-left",J="carousel-item-next",Z="carousel-item-prev",ee="pointer-event",te=".active",ne=".active.carousel-item",ie=".carousel-item",oe=".carousel-item img",re=".carousel-item-next, .carousel-item-prev",se=".carousel-indicators",ae="[data-slide], [data-slide-to]",le='[data-ride="carousel"]',ce={TOUCH:"touch",PEN:"pen"},he=function(){function r(e,t){this._items=null,this._interval=null,this._activeElement=null,this._isPaused=!1,this._isSliding=!1,this.touchTimeout=null,this.touchStartX=0,this.touchDeltaX=0,this._config=this._getConfig(t),this._element=e,this._indicatorsElement=this._element.querySelector(se),this._touchSupported="ontouchstart"in document.documentElement||0<navigator.maxTouchPoints,this._pointerEvent=Boolean(window.PointerEvent||window.MSPointerEvent),this._addEventListeners()}var e=r.prototype;return e.next=function(){this._isSliding||this._slide(B)},e.nextWhenVisible=function(){!document.hidden&&p(this._element).is(":visible")&&"hidden"!==p(this._element).css("visibility")&&this.next()},e.prev=function(){this._isSliding||this._slide(q)},e.pause=function(e){e||(this._isPaused=!0),this._element.querySelector(re)&&(m.triggerTransitionEnd(this._element),this.cycle(!0)),clearInterval(this._interval),this._interval=null},e.cycle=function(e){e||(this._isPaused=!1),this._interval&&(clearInterval(this._interval),this._interval=null),this._config.interval&&!this._isPaused&&(this._interval=setInterval((document.visibilityState?this.nextWhenVisible:this.next).bind(this),this._config.interval))},e.to=function(e){var t=this;this._activeElement=this._element.querySelector(ne);var n=this._getItemIndex(this._activeElement);if(!(e>this._items.length-1||e<0))if(this._isSliding)p(this._element).one(V.SLID,function(){return t.to(e)});else{if(n===e)return this.pause(),void this.cycle();var i=n<e?B:q;this._slide(i,this._items[e])}},e.dispose=function(){p(this._element).off(R),p.removeData(this._element,H),this._items=null,this._config=null,this._element=null,this._interval=null,this._isPaused=null,this._isSliding=null,this._activeElement=null,this._indicatorsElement=null},e._getConfig=function(e){return e=l({},W,{},e),m.typeCheckConfig(j,e,U),e},e._handleSwipe=function(){var e=Math.abs(this.touchDeltaX);if(!(e<=40)){var t=e/this.touchDeltaX;(this.touchDeltaX=0)<t&&this.prev(),t<0&&this.next()}},e._addEventListeners=function(){var t=this;this._config.keyboard&&p(this._element).on(V.KEYDOWN,function(e){return t._keydown(e)}),"hover"===this._config.pause&&p(this._element).on(V.MOUSEENTER,function(e){return t.pause(e)}).on(V.MOUSELEAVE,function(e){return t.cycle(e)}),this._config.touch&&this._addTouchEventListeners()},e._addTouchEventListeners=function(){var t=this;if(this._touchSupported){var n=function(e){t._pointerEvent&&ce[e.originalEvent.pointerType.toUpperCase()]?t.touchStartX=e.originalEvent.clientX:t._pointerEvent||(t.touchStartX=e.originalEvent.touches[0].clientX)},i=function(e){t._pointerEvent&&ce[e.originalEvent.pointerType.toUpperCase()]&&(t.touchDeltaX=e.originalEvent.clientX-t.touchStartX),t._handleSwipe(),"hover"===t._config.pause&&(t.pause(),t.touchTimeout&&clearTimeout(t.touchTimeout),t.touchTimeout=setTimeout(function(e){return t.cycle(e)},500+t._config.interval))};p(this._element.querySelectorAll(oe)).on(V.DRAG_START,function(e){return e.preventDefault()}),this._pointerEvent?(p(this._element).on(V.POINTERDOWN,function(e){return n(e)}),p(this._element).on(V.POINTERUP,function(e){return i(e)}),this._element.classList.add(ee)):(p(this._element).on(V.TOUCHSTART,function(e){return n(e)}),p(this._element).on(V.TOUCHMOVE,function(e){return function(e){e.originalEvent.touches&&1<e.originalEvent.touches.length?t.touchDeltaX=0:t.touchDeltaX=e.originalEvent.touches[0].clientX-t.touchStartX}(e)}),p(this._element).on(V.TOUCHEND,function(e){return i(e)}))}},e._keydown=function(e){if(!/input|textarea/i.test(e.target.tagName))switch(e.which){case 37:e.preventDefault(),this.prev();break;case 39:e.preventDefault(),this.next()}},e._getItemIndex=function(e){return this._items=e&&e.parentNode?[].slice.call(e.parentNode.querySelectorAll(ie)):[],this._items.indexOf(e)},e._getItemByDirection=function(e,t){var n=e===B,i=e===q,o=this._getItemIndex(t),r=this._items.length-1;if((i&&0===o||n&&o===r)&&!this._config.wrap)return t;var s=(o+(e===q?-1:1))%this._items.length;return-1==s?this._items[this._items.length-1]:this._items[s]},e._triggerSlideEvent=function(e,t){var n=this._getItemIndex(e),i=this._getItemIndex(this._element.querySelector(ne)),o=p.Event(V.SLIDE,{relatedTarget:e,direction:t,from:i,to:n});return p(this._element).trigger(o),o},e._setActiveIndicatorElement=function(e){if(this._indicatorsElement){var t=[].slice.call(this._indicatorsElement.querySelectorAll(te));p(t).removeClass(z);var n=this._indicatorsElement.children[this._getItemIndex(e)];n&&p(n).addClass(z)}},e._slide=function(e,t){var n,i,o,r=this,s=this._element.querySelector(ne),a=this._getItemIndex(s),l=t||s&&this._getItemByDirection(e,s),c=this._getItemIndex(l),h=Boolean(this._interval);if(o=e===B?(n=$,i=J,K):(n=G,i=Z,Q),l&&p(l).hasClass(z))this._isSliding=!1;else if(!this._triggerSlideEvent(l,o).isDefaultPrevented()&&s&&l){this._isSliding=!0,h&&this.pause(),this._setActiveIndicatorElement(l);var u=p.Event(V.SLID,{relatedTarget:l,direction:o,from:a,to:c});if(p(this._element).hasClass(X)){p(l).addClass(i),m.reflow(l),p(s).addClass(n),p(l).addClass(n);var f=parseInt(l.getAttribute("data-interval"),10);f?(this._config.defaultInterval=this._config.defaultInterval||this._config.interval,this._config.interval=f):this._config.interval=this._config.defaultInterval||this._config.interval;var d=m.getTransitionDurationFromElement(s);p(s).one(m.TRANSITION_END,function(){p(l).removeClass(n+" "+i).addClass(z),p(s).removeClass(z+" "+i+" "+n),r._isSliding=!1,setTimeout(function(){return p(r._element).trigger(u)},0)}).emulateTransitionEnd(d)}else p(s).removeClass(z),p(l).addClass(z),this._isSliding=!1,p(this._element).trigger(u);h&&this.cycle()}},r._jQueryInterface=function(i){return this.each(function(){var e=p(this).data(H),t=l({},W,{},p(this).data());"object"==typeof i&&(t=l({},t,{},i));var n="string"==typeof i?i:t.slide;if(e||(e=new r(this,t),p(this).data(H,e)),"number"==typeof i)e.to(i);else if("string"==typeof n){if("undefined"==typeof e[n])throw new TypeError('No method named "'+n+'"');e[n]()}else t.interval&&t.ride&&(e.pause(),e.cycle())})},r._dataApiClickHandler=function(e){var t=m.getSelectorFromElement(this);if(t){var n=p(t)[0];if(n&&p(n).hasClass(Y)){var i=l({},p(n).data(),{},p(this).data()),o=this.getAttribute("data-slide-to");o&&(i.interval=!1),r._jQueryInterface.call(p(n),i),o&&p(n).data(H).to(o),e.preventDefault()}}},s(r,null,[{key:"VERSION",get:function(){return"4.4.1"}},{key:"Default",get:function(){return W}}]),r}();p(document).on(V.CLICK_DATA_API,ae,he._dataApiClickHandler),p(window).on(V.LOAD_DATA_API,function(){for(var e=[].slice.call(document.querySelectorAll(le)),t=0,n=e.length;t<n;t++){var i=p(e[t]);he._jQueryInterface.call(i,i.data())}}),p.fn[j]=he._jQueryInterface,p.fn[j].Constructor=he,p.fn[j].noConflict=function(){return p.fn[j]=M,he._jQueryInterface};var ue="collapse",fe="bs.collapse",de="."+fe,pe=p.fn[ue],me={toggle:!0,parent:""},ge={toggle:"boolean",parent:"(string|element)"},_e={SHOW:"show"+de,SHOWN:"shown"+de,HIDE:"hide"+de,HIDDEN:"hidden"+de,CLICK_DATA_API:"click"+de+".data-api"},ve="show",ye="collapse",Ee="collapsing",be="collapsed",we="width",Te="height",Ce=".show, .collapsing",Se='[data-toggle="collapse"]',De=function(){function a(t,e){this._isTransitioning=!1,this._element=t,this._config=this._getConfig(e),this._triggerArray=[].slice.call(document.querySelectorAll('[data-toggle="collapse"][href="#'+t.id+'"],[data-toggle="collapse"][data-target="#'+t.id+'"]'));for(var n=[].slice.call(document.querySelectorAll(Se)),i=0,o=n.length;i<o;i++){var r=n[i],s=m.getSelectorFromElement(r),a=[].slice.call(document.querySelectorAll(s)).filter(function(e){return e===t});null!==s&&0<a.length&&(this._selector=s,this._triggerArray.push(r))}this._parent=this._config.parent?this._getParent():null,this._config.parent||this._addAriaAndCollapsedClass(this._element,this._triggerArray),this._config.toggle&&this.toggle()}var e=a.prototype;return e.toggle=function(){p(this._element).hasClass(ve)?this.hide():this.show()},e.show=function(){var e,t,n=this;if(!this._isTransitioning&&!p(this._element).hasClass(ve)&&(this._parent&&0===(e=[].slice.call(this._parent.querySelectorAll(Ce)).filter(function(e){return"string"==typeof n._config.parent?e.getAttribute("data-parent")===n._config.parent:e.classList.contains(ye)})).length&&(e=null),!(e&&(t=p(e).not(this._selector).data(fe))&&t._isTransitioning))){var i=p.Event(_e.SHOW);if(p(this._element).trigger(i),!i.isDefaultPrevented()){e&&(a._jQueryInterface.call(p(e).not(this._selector),"hide"),t||p(e).data(fe,null));var o=this._getDimension();p(this._element).removeClass(ye).addClass(Ee),this._element.style[o]=0,this._triggerArray.length&&p(this._triggerArray).removeClass(be).attr("aria-expanded",!0),this.setTransitioning(!0);var r="scroll"+(o[0].toUpperCase()+o.slice(1)),s=m.getTransitionDurationFromElement(this._element);p(this._element).one(m.TRANSITION_END,function(){p(n._element).removeClass(Ee).addClass(ye).addClass(ve),n._element.style[o]="",n.setTransitioning(!1),p(n._element).trigger(_e.SHOWN)}).emulateTransitionEnd(s),this._element.style[o]=this._element[r]+"px"}}},e.hide=function(){var e=this;if(!this._isTransitioning&&p(this._element).hasClass(ve)){var t=p.Event(_e.HIDE);if(p(this._element).trigger(t),!t.isDefaultPrevented()){var n=this._getDimension();this._element.style[n]=this._element.getBoundingClientRect()[n]+"px",m.reflow(this._element),p(this._element).addClass(Ee).removeClass(ye).removeClass(ve);var i=this._triggerArray.length;if(0<i)for(var o=0;o<i;o++){var r=this._triggerArray[o],s=m.getSelectorFromElement(r);if(null!==s)p([].slice.call(document.querySelectorAll(s))).hasClass(ve)||p(r).addClass(be).attr("aria-expanded",!1)}this.setTransitioning(!0);this._element.style[n]="";var a=m.getTransitionDurationFromElement(this._element);p(this._element).one(m.TRANSITION_END,function(){e.setTransitioning(!1),p(e._element).removeClass(Ee).addClass(ye).trigger(_e.HIDDEN)}).emulateTransitionEnd(a)}}},e.setTransitioning=function(e){this._isTransitioning=e},e.dispose=function(){p.removeData(this._element,fe),this._config=null,this._parent=null,this._element=null,this._triggerArray=null,this._isTransitioning=null},e._getConfig=function(e){return(e=l({},me,{},e)).toggle=Boolean(e.toggle),m.typeCheckConfig(ue,e,ge),e},e._getDimension=function(){return p(this._element).hasClass(we)?we:Te},e._getParent=function(){var e,n=this;m.isElement(this._config.parent)?(e=this._config.parent,"undefined"!=typeof this._config.parent.jquery&&(e=this._config.parent[0])):e=document.querySelector(this._config.parent);var t='[data-toggle="collapse"][data-parent="'+this._config.parent+'"]',i=[].slice.call(e.querySelectorAll(t));return p(i).each(function(e,t){n._addAriaAndCollapsedClass(a._getTargetFromElement(t),[t])}),e},e._addAriaAndCollapsedClass=function(e,t){var n=p(e).hasClass(ve);t.length&&p(t).toggleClass(be,!n).attr("aria-expanded",n)},a._getTargetFromElement=function(e){var t=m.getSelectorFromElement(e);return t?document.querySelector(t):null},a._jQueryInterface=function(i){return this.each(function(){var e=p(this),t=e.data(fe),n=l({},me,{},e.data(),{},"object"==typeof i&&i?i:{});if(!t&&n.toggle&&/show|hide/.test(i)&&(n.toggle=!1),t||(t=new a(this,n),e.data(fe,t)),"string"==typeof i){if("undefined"==typeof t[i])throw new TypeError('No method named "'+i+'"');t[i]()}})},s(a,null,[{key:"VERSION",get:function(){return"4.4.1"}},{key:"Default",get:function(){return me}}]),a}();p(document).on(_e.CLICK_DATA_API,Se,function(e){"A"===e.currentTarget.tagName&&e.preventDefault();var n=p(this),t=m.getSelectorFromElement(this),i=[].slice.call(document.querySelectorAll(t));p(i).each(function(){var e=p(this),t=e.data(fe)?"toggle":n.data();De._jQueryInterface.call(e,t)})}),p.fn[ue]=De._jQueryInterface,p.fn[ue].Constructor=De,p.fn[ue].noConflict=function(){return p.fn[ue]=pe,De._jQueryInterface};var Ie="undefined"!=typeof window&&"undefined"!=typeof document&&"undefined"!=typeof navigator,Ae=function(){for(var e=["Edge","Trident","Firefox"],t=0;t<e.length;t+=1)if(Ie&&0<=navigator.userAgent.indexOf(e[t]))return 1;return 0}();var Oe=Ie&&window.Promise?function(e){var t=!1;return function(){t||(t=!0,window.Promise.resolve().then(function(){t=!1,e()}))}}:function(e){var t=!1;return function(){t||(t=!0,setTimeout(function(){t=!1,e()},Ae))}};function Ne(e){return e&&"[object Function]"==={}.toString.call(e)}function ke(e,t){if(1!==e.nodeType)return[];var n=e.ownerDocument.defaultView.getComputedStyle(e,null);return t?n[t]:n}function Le(e){return"HTML"===e.nodeName?e:e.parentNode||e.host}function Pe(e){if(!e)return document.body;switch(e.nodeName){case"HTML":case"BODY":return e.ownerDocument.body;case"#document":return e.body}var t=ke(e),n=t.overflow,i=t.overflowX,o=t.overflowY;return/(auto|scroll|overlay)/.test(n+o+i)?e:Pe(Le(e))}function xe(e){return e&&e.referenceNode?e.referenceNode:e}var je=Ie&&!(!window.MSInputMethodContext||!document.documentMode),He=Ie&&/MSIE 10/.test(navigator.userAgent);function Re(e){return 11===e?je:10===e?He:je||He}function Fe(e){if(!e)return document.documentElement;for(var t=Re(10)?document.body:null,n=e.offsetParent||null;n===t&&e.nextElementSibling;)n=(e=e.nextElementSibling).offsetParent;var i=n&&n.nodeName;return i&&"BODY"!==i&&"HTML"!==i?-1!==["TH","TD","TABLE"].indexOf(n.nodeName)&&"static"===ke(n,"position")?Fe(n):n:e?e.ownerDocument.documentElement:document.documentElement}function Me(e){return null!==e.parentNode?Me(e.parentNode):e}function We(e,t){if(!(e&&e.nodeType&&t&&t.nodeType))return document.documentElement;var n=e.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_FOLLOWING,i=n?e:t,o=n?t:e,r=document.createRange();r.setStart(i,0),r.setEnd(o,0);var s=r.commonAncestorContainer;if(e!==s&&t!==s||i.contains(o))return function(e){var t=e.nodeName;return"BODY"!==t&&("HTML"===t||Fe(e.firstElementChild)===e)}(s)?s:Fe(s);var a=Me(e);return a.host?We(a.host,t):We(e,Me(t).host)}function Ue(e,t){var n="top"===(1<arguments.length&&void 0!==t?t:"top")?"scrollTop":"scrollLeft",i=e.nodeName;if("BODY"!==i&&"HTML"!==i)return e[n];var o=e.ownerDocument.documentElement;return(e.ownerDocument.scrollingElement||o)[n]}function Be(e,t){var n="x"===t?"Left":"Top",i="Left"==n?"Right":"Bottom";return parseFloat(e["border"+n+"Width"],10)+parseFloat(e["border"+i+"Width"],10)}function qe(e,t,n,i){return Math.max(t["offset"+e],t["scroll"+e],n["client"+e],n["offset"+e],n["scroll"+e],Re(10)?parseInt(n["offset"+e])+parseInt(i["margin"+("Height"===e?"Top":"Left")])+parseInt(i["margin"+("Height"===e?"Bottom":"Right")]):0)}function Ke(e){var t=e.body,n=e.documentElement,i=Re(10)&&getComputedStyle(n);return{height:qe("Height",t,n,i),width:qe("Width",t,n,i)}}var Qe=function(e,t,n){return t&&Ve(e.prototype,t),n&&Ve(e,n),e};function Ve(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function Ye(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var ze=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e};function Xe(e){return ze({},e,{right:e.left+e.width,bottom:e.top+e.height})}function Ge(e){var t={};try{if(Re(10)){t=e.getBoundingClientRect();var n=Ue(e,"top"),i=Ue(e,"left");t.top+=n,t.left+=i,t.bottom+=n,t.right+=i}else t=e.getBoundingClientRect()}catch(e){}var o={left:t.left,top:t.top,width:t.right-t.left,height:t.bottom-t.top},r="HTML"===e.nodeName?Ke(e.ownerDocument):{},s=r.width||e.clientWidth||o.width,a=r.height||e.clientHeight||o.height,l=e.offsetWidth-s,c=e.offsetHeight-a;if(l||c){var h=ke(e);l-=Be(h,"x"),c-=Be(h,"y"),o.width-=l,o.height-=c}return Xe(o)}function $e(e,t,n){var i=2<arguments.length&&void 0!==n&&n,o=Re(10),r="HTML"===t.nodeName,s=Ge(e),a=Ge(t),l=Pe(e),c=ke(t),h=parseFloat(c.borderTopWidth,10),u=parseFloat(c.borderLeftWidth,10);i&&r&&(a.top=Math.max(a.top,0),a.left=Math.max(a.left,0));var f=Xe({top:s.top-a.top-h,left:s.left-a.left-u,width:s.width,height:s.height});if(f.marginTop=0,f.marginLeft=0,!o&&r){var d=parseFloat(c.marginTop,10),p=parseFloat(c.marginLeft,10);f.top-=h-d,f.bottom-=h-d,f.left-=u-p,f.right-=u-p,f.marginTop=d,f.marginLeft=p}return(o&&!i?t.contains(l):t===l&&"BODY"!==l.nodeName)&&(f=function(e,t,n){var i=2<arguments.length&&void 0!==n&&n,o=Ue(t,"top"),r=Ue(t,"left"),s=i?-1:1;return e.top+=o*s,e.bottom+=o*s,e.left+=r*s,e.right+=r*s,e}(f,t)),f}function Je(e){if(!e||!e.parentElement||Re())return document.documentElement;for(var t=e.parentElement;t&&"none"===ke(t,"transform");)t=t.parentElement;return t||document.documentElement}function Ze(e,t,n,i,o){var r=4<arguments.length&&void 0!==o&&o,s={top:0,left:0},a=r?Je(e):We(e,xe(t));if("viewport"===i)s=function(e,t){var n=1<arguments.length&&void 0!==t&&t,i=e.ownerDocument.documentElement,o=$e(e,i),r=Math.max(i.clientWidth,window.innerWidth||0),s=Math.max(i.clientHeight,window.innerHeight||0),a=n?0:Ue(i),l=n?0:Ue(i,"left");return Xe({top:a-o.top+o.marginTop,left:l-o.left+o.marginLeft,width:r,height:s})}(a,r);else{var l=void 0;"scrollParent"===i?"BODY"===(l=Pe(Le(t))).nodeName&&(l=e.ownerDocument.documentElement):l="window"===i?e.ownerDocument.documentElement:i;var c=$e(l,a,r);if("HTML"!==l.nodeName||function e(t){var n=t.nodeName;if("BODY"===n||"HTML"===n)return!1;if("fixed"===ke(t,"position"))return!0;var i=Le(t);return!!i&&e(i)}(a))s=c;else{var h=Ke(e.ownerDocument),u=h.height,f=h.width;s.top+=c.top-c.marginTop,s.bottom=u+c.top,s.left+=c.left-c.marginLeft,s.right=f+c.left}}var d="number"==typeof(n=n||0);return s.left+=d?n:n.left||0,s.top+=d?n:n.top||0,s.right-=d?n:n.right||0,s.bottom-=d?n:n.bottom||0,s}function et(e,t,i,n,o,r){var s=5<arguments.length&&void 0!==r?r:0;if(-1===e.indexOf("auto"))return e;var a=Ze(i,n,s,o),l={top:{width:a.width,height:t.top-a.top},right:{width:a.right-t.right,height:a.height},bottom:{width:a.width,height:a.bottom-t.bottom},left:{width:t.left-a.left,height:a.height}},c=Object.keys(l).map(function(e){return ze({key:e},l[e],{area:function(e){return e.width*e.height}(l[e])})}).sort(function(e,t){return t.area-e.area}),h=c.filter(function(e){var t=e.width,n=e.height;return t>=i.clientWidth&&n>=i.clientHeight}),u=0<h.length?h[0].key:c[0].key,f=e.split("-")[1];return u+(f?"-"+f:"")}function tt(e,t,n,i){var o=3<arguments.length&&void 0!==i?i:null;return $e(n,o?Je(t):We(t,xe(n)),o)}function nt(e){var t=e.ownerDocument.defaultView.getComputedStyle(e),n=parseFloat(t.marginTop||0)+parseFloat(t.marginBottom||0),i=parseFloat(t.marginLeft||0)+parseFloat(t.marginRight||0);return{width:e.offsetWidth+i,height:e.offsetHeight+n}}function it(e){var t={left:"right",right:"left",bottom:"top",top:"bottom"};return e.replace(/left|right|bottom|top/g,function(e){return t[e]})}function ot(e,t,n){n=n.split("-")[0];var i=nt(e),o={width:i.width,height:i.height},r=-1!==["right","left"].indexOf(n),s=r?"top":"left",a=r?"left":"top",l=r?"height":"width",c=r?"width":"height";return o[s]=t[s]+t[l]/2-i[l]/2,o[a]=n===a?t[a]-i[c]:t[it(a)],o}function rt(e,t){return Array.prototype.find?e.find(t):e.filter(t)[0]}function st(e,n,t){return(void 0===t?e:e.slice(0,function(e,t,n){if(Array.prototype.findIndex)return e.findIndex(function(e){return e[t]===n});var i=rt(e,function(e){return e[t]===n});return e.indexOf(i)}(e,"name",t))).forEach(function(e){e.function&&console.warn("`modifier.function` is deprecated, use `modifier.fn`!");var t=e.function||e.fn;e.enabled&&Ne(t)&&(n.offsets.popper=Xe(n.offsets.popper),n.offsets.reference=Xe(n.offsets.reference),n=t(n,e))}),n}function at(e,n){return e.some(function(e){var t=e.name;return e.enabled&&t===n})}function lt(e){for(var t=[!1,"ms","Webkit","Moz","O"],n=e.charAt(0).toUpperCase()+e.slice(1),i=0;i<t.length;i++){var o=t[i],r=o?""+o+n:e;if("undefined"!=typeof document.body.style[r])return r}return null}function ct(e){var t=e.ownerDocument;return t?t.defaultView:window}function ht(e,t,n,i){n.updateBound=i,ct(e).addEventListener("resize",n.updateBound,{passive:!0});var o=Pe(e);return function e(t,n,i,o){var r="BODY"===t.nodeName,s=r?t.ownerDocument.defaultView:t;s.addEventListener(n,i,{passive:!0}),r||e(Pe(s.parentNode),n,i,o),o.push(s)}(o,"scroll",n.updateBound,n.scrollParents),n.scrollElement=o,n.eventsEnabled=!0,n}function ut(){this.state.eventsEnabled&&(cancelAnimationFrame(this.scheduleUpdate),this.state=function(e,t){return ct(e).removeEventListener("resize",t.updateBound),t.scrollParents.forEach(function(e){e.removeEventListener("scroll",t.updateBound)}),t.updateBound=null,t.scrollParents=[],t.scrollElement=null,t.eventsEnabled=!1,t}(this.reference,this.state))}function ft(e){return""!==e&&!isNaN(parseFloat(e))&&isFinite(e)}function dt(n,i){Object.keys(i).forEach(function(e){var t="";-1!==["width","height","top","right","bottom","left"].indexOf(e)&&ft(i[e])&&(t="px"),n.style[e]=i[e]+t})}function pt(e,t){function n(e){return e}var i=e.offsets,o=i.popper,r=i.reference,s=Math.round,a=Math.floor,l=s(r.width),c=s(o.width),h=-1!==["left","right"].indexOf(e.placement),u=-1!==e.placement.indexOf("-"),f=t?h||u||l%2==c%2?s:a:n,d=t?s:n;return{left:f(l%2==1&&c%2==1&&!u&&t?o.left-1:o.left),top:d(o.top),bottom:d(o.bottom),right:f(o.right)}}var mt=Ie&&/Firefox/i.test(navigator.userAgent);function gt(e,t,n){var i=rt(e,function(e){return e.name===t}),o=!!i&&e.some(function(e){return e.name===n&&e.enabled&&e.order<i.order});if(!o){var r="`"+t+"`",s="`"+n+"`";console.warn(s+" modifier is required by "+r+" modifier in order to work, be sure to include it before "+r+"!")}return o}var _t=["auto-start","auto","auto-end","top-start","top","top-end","right-start","right","right-end","bottom-end","bottom","bottom-start","left-end","left","left-start"],vt=_t.slice(3);function yt(e,t){var n=1<arguments.length&&void 0!==t&&t,i=vt.indexOf(e),o=vt.slice(i+1).concat(vt.slice(0,i));return n?o.reverse():o}var Et="flip",bt="clockwise",wt="counterclockwise";function Tt(e,o,r,t){var s=[0,0],a=-1!==["right","left"].indexOf(t),n=e.split(/(\+|\-)/).map(function(e){return e.trim()}),i=n.indexOf(rt(n,function(e){return-1!==e.search(/,|\s/)}));n[i]&&-1===n[i].indexOf(",")&&console.warn("Offsets separated by white space(s) are deprecated, use a comma (,) instead.");var l=/\s*,\s*|\s+/,c=-1!==i?[n.slice(0,i).concat([n[i].split(l)[0]]),[n[i].split(l)[1]].concat(n.slice(i+1))]:[n];return(c=c.map(function(e,t){var n=(1===t?!a:a)?"height":"width",i=!1;return e.reduce(function(e,t){return""===e[e.length-1]&&-1!==["+","-"].indexOf(t)?(e[e.length-1]=t,i=!0,e):i?(e[e.length-1]+=t,i=!1,e):e.concat(t)},[]).map(function(e){return function(e,t,n,i){var o=e.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),r=+o[1],s=o[2];if(!r)return e;if(0!==s.indexOf("%"))return"vh"!==s&&"vw"!==s?r:("vh"===s?Math.max(document.documentElement.clientHeight,window.innerHeight||0):Math.max(document.documentElement.clientWidth,window.innerWidth||0))/100*r;var a=void 0;switch(s){case"%p":a=n;break;case"%":case"%r":default:a=i}return Xe(a)[t]/100*r}(e,n,o,r)})})).forEach(function(n,i){n.forEach(function(e,t){ft(e)&&(s[i]+=e*("-"===n[t-1]?-1:1))})}),s}var Ct={placement:"bottom",positionFixed:!1,eventsEnabled:!0,removeOnDestroy:!1,onCreate:function(){},onUpdate:function(){},modifiers:{shift:{order:100,enabled:!0,fn:function(e){var t=e.placement,n=t.split("-")[0],i=t.split("-")[1];if(i){var o=e.offsets,r=o.reference,s=o.popper,a=-1!==["bottom","top"].indexOf(n),l=a?"left":"top",c=a?"width":"height",h={start:Ye({},l,r[l]),end:Ye({},l,r[l]+r[c]-s[c])};e.offsets.popper=ze({},s,h[i])}return e}},offset:{order:200,enabled:!0,fn:function(e,t){var n=t.offset,i=e.placement,o=e.offsets,r=o.popper,s=o.reference,a=i.split("-")[0],l=void 0;return l=ft(+n)?[+n,0]:Tt(n,r,s,a),"left"===a?(r.top+=l[0],r.left-=l[1]):"right"===a?(r.top+=l[0],r.left+=l[1]):"top"===a?(r.left+=l[0],r.top-=l[1]):"bottom"===a&&(r.left+=l[0],r.top+=l[1]),e.popper=r,e},offset:0},preventOverflow:{order:300,enabled:!0,fn:function(e,i){var t=i.boundariesElement||Fe(e.instance.popper);e.instance.reference===t&&(t=Fe(t));var n=lt("transform"),o=e.instance.popper.style,r=o.top,s=o.left,a=o[n];o.top="",o.left="",o[n]="";var l=Ze(e.instance.popper,e.instance.reference,i.padding,t,e.positionFixed);o.top=r,o.left=s,o[n]=a,i.boundaries=l;var c=i.priority,h=e.offsets.popper,u={primary:function(e){var t=h[e];return h[e]<l[e]&&!i.escapeWithReference&&(t=Math.max(h[e],l[e])),Ye({},e,t)},secondary:function(e){var t="right"===e?"left":"top",n=h[t];return h[e]>l[e]&&!i.escapeWithReference&&(n=Math.min(h[t],l[e]-("right"===e?h.width:h.height))),Ye({},t,n)}};return c.forEach(function(e){var t=-1!==["left","top"].indexOf(e)?"primary":"secondary";h=ze({},h,u[t](e))}),e.offsets.popper=h,e},priority:["left","right","top","bottom"],padding:5,boundariesElement:"scrollParent"},keepTogether:{order:400,enabled:!0,fn:function(e){var t=e.offsets,n=t.popper,i=t.reference,o=e.placement.split("-")[0],r=Math.floor,s=-1!==["top","bottom"].indexOf(o),a=s?"right":"bottom",l=s?"left":"top",c=s?"width":"height";return n[a]<r(i[l])&&(e.offsets.popper[l]=r(i[l])-n[c]),n[l]>r(i[a])&&(e.offsets.popper[l]=r(i[a])),e}},arrow:{order:500,enabled:!0,fn:function(e,t){var n;if(!gt(e.instance.modifiers,"arrow","keepTogether"))return e;var i=t.element;if("string"==typeof i){if(!(i=e.instance.popper.querySelector(i)))return e}else if(!e.instance.popper.contains(i))return console.warn("WARNING: `arrow.element` must be child of its popper element!"),e;var o=e.placement.split("-")[0],r=e.offsets,s=r.popper,a=r.reference,l=-1!==["left","right"].indexOf(o),c=l?"height":"width",h=l?"Top":"Left",u=h.toLowerCase(),f=l?"left":"top",d=l?"bottom":"right",p=nt(i)[c];a[d]-p<s[u]&&(e.offsets.popper[u]-=s[u]-(a[d]-p)),a[u]+p>s[d]&&(e.offsets.popper[u]+=a[u]+p-s[d]),e.offsets.popper=Xe(e.offsets.popper);var m=a[u]+a[c]/2-p/2,g=ke(e.instance.popper),_=parseFloat(g["margin"+h],10),v=parseFloat(g["border"+h+"Width"],10),y=m-e.offsets.popper[u]-_-v;return y=Math.max(Math.min(s[c]-p,y),0),e.arrowElement=i,e.offsets.arrow=(Ye(n={},u,Math.round(y)),Ye(n,f,""),n),e},element:"[x-arrow]"},flip:{order:600,enabled:!0,fn:function(m,g){if(at(m.instance.modifiers,"inner"))return m;if(m.flipped&&m.placement===m.originalPlacement)return m;var _=Ze(m.instance.popper,m.instance.reference,g.padding,g.boundariesElement,m.positionFixed),v=m.placement.split("-")[0],y=it(v),E=m.placement.split("-")[1]||"",b=[];switch(g.behavior){case Et:b=[v,y];break;case bt:b=yt(v);break;case wt:b=yt(v,!0);break;default:b=g.behavior}return b.forEach(function(e,t){if(v!==e||b.length===t+1)return m;v=m.placement.split("-")[0],y=it(v);var n=m.offsets.popper,i=m.offsets.reference,o=Math.floor,r="left"===v&&o(n.right)>o(i.left)||"right"===v&&o(n.left)<o(i.right)||"top"===v&&o(n.bottom)>o(i.top)||"bottom"===v&&o(n.top)<o(i.bottom),s=o(n.left)<o(_.left),a=o(n.right)>o(_.right),l=o(n.top)<o(_.top),c=o(n.bottom)>o(_.bottom),h="left"===v&&s||"right"===v&&a||"top"===v&&l||"bottom"===v&&c,u=-1!==["top","bottom"].indexOf(v),f=!!g.flipVariations&&(u&&"start"===E&&s||u&&"end"===E&&a||!u&&"start"===E&&l||!u&&"end"===E&&c),d=!!g.flipVariationsByContent&&(u&&"start"===E&&a||u&&"end"===E&&s||!u&&"start"===E&&c||!u&&"end"===E&&l),p=f||d;(r||h||p)&&(m.flipped=!0,(r||h)&&(v=b[t+1]),p&&(E=function(e){return"end"===e?"start":"start"===e?"end":e}(E)),m.placement=v+(E?"-"+E:""),m.offsets.popper=ze({},m.offsets.popper,ot(m.instance.popper,m.offsets.reference,m.placement)),m=st(m.instance.modifiers,m,"flip"))}),m},behavior:"flip",padding:5,boundariesElement:"viewport",flipVariations:!1,flipVariationsByContent:!1},inner:{order:700,enabled:!1,fn:function(e){var t=e.placement,n=t.split("-")[0],i=e.offsets,o=i.popper,r=i.reference,s=-1!==["left","right"].indexOf(n),a=-1===["top","left"].indexOf(n);return o[s?"left":"top"]=r[n]-(a?o[s?"width":"height"]:0),e.placement=it(t),e.offsets.popper=Xe(o),e}},hide:{order:800,enabled:!0,fn:function(e){if(!gt(e.instance.modifiers,"hide","preventOverflow"))return e;var t=e.offsets.reference,n=rt(e.instance.modifiers,function(e){return"preventOverflow"===e.name}).boundaries;if(t.bottom<n.top||t.left>n.right||t.top>n.bottom||t.right<n.left){if(!0===e.hide)return e;e.hide=!0,e.attributes["x-out-of-boundaries"]=""}else{if(!1===e.hide)return e;e.hide=!1,e.attributes["x-out-of-boundaries"]=!1}return e}},computeStyle:{order:850,enabled:!0,fn:function(e,t){var n=t.x,i=t.y,o=e.offsets.popper,r=rt(e.instance.modifiers,function(e){return"applyStyle"===e.name}).gpuAcceleration;void 0!==r&&console.warn("WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!");var s=void 0!==r?r:t.gpuAcceleration,a=Fe(e.instance.popper),l=Ge(a),c={position:o.position},h=pt(e,window.devicePixelRatio<2||!mt),u="bottom"===n?"top":"bottom",f="right"===i?"left":"right",d=lt("transform"),p=void 0,m=void 0;if(m="bottom"==u?"HTML"===a.nodeName?-a.clientHeight+h.bottom:-l.height+h.bottom:h.top,p="right"==f?"HTML"===a.nodeName?-a.clientWidth+h.right:-l.width+h.right:h.left,s&&d)c[d]="translate3d("+p+"px, "+m+"px, 0)",c[u]=0,c[f]=0,c.willChange="transform";else{var g="bottom"==u?-1:1,_="right"==f?-1:1;c[u]=m*g,c[f]=p*_,c.willChange=u+", "+f}var v={"x-placement":e.placement};return e.attributes=ze({},v,e.attributes),e.styles=ze({},c,e.styles),e.arrowStyles=ze({},e.offsets.arrow,e.arrowStyles),e},gpuAcceleration:!0,x:"bottom",y:"right"},applyStyle:{order:900,enabled:!0,fn:function(e){return dt(e.instance.popper,e.styles),function(t,n){Object.keys(n).forEach(function(e){!1!==n[e]?t.setAttribute(e,n[e]):t.removeAttribute(e)})}(e.instance.popper,e.attributes),e.arrowElement&&Object.keys(e.arrowStyles).length&&dt(e.arrowElement,e.arrowStyles),e},onLoad:function(e,t,n,i,o){var r=tt(o,t,e,n.positionFixed),s=et(n.placement,r,t,e,n.modifiers.flip.boundariesElement,n.modifiers.flip.padding);return t.setAttribute("x-placement",s),dt(t,{position:n.positionFixed?"fixed":"absolute"}),n},gpuAcceleration:void 0}}},St=(Qe(Dt,[{key:"update",value:function(){return function(){if(!this.state.isDestroyed){var e={instance:this,styles:{},arrowStyles:{},attributes:{},flipped:!1,offsets:{}};e.offsets.reference=tt(this.state,this.popper,this.reference,this.options.positionFixed),e.placement=et(this.options.placement,e.offsets.reference,this.popper,this.reference,this.options.modifiers.flip.boundariesElement,this.options.modifiers.flip.padding),e.originalPlacement=e.placement,e.positionFixed=this.options.positionFixed,e.offsets.popper=ot(this.popper,e.offsets.reference,e.placement),e.offsets.popper.position=this.options.positionFixed?"fixed":"absolute",e=st(this.modifiers,e),this.state.isCreated?this.options.onUpdate(e):(this.state.isCreated=!0,this.options.onCreate(e))}}.call(this)}},{key:"destroy",value:function(){return function(){return this.state.isDestroyed=!0,at(this.modifiers,"applyStyle")&&(this.popper.removeAttribute("x-placement"),this.popper.style.position="",this.popper.style.top="",this.popper.style.left="",this.popper.style.right="",this.popper.style.bottom="",this.popper.style.willChange="",this.popper.style[lt("transform")]=""),this.disableEventListeners(),this.options.removeOnDestroy&&this.popper.parentNode.removeChild(this.popper),this}.call(this)}},{key:"enableEventListeners",value:function(){return function(){this.state.eventsEnabled||(this.state=ht(this.reference,this.options,this.state,this.scheduleUpdate))}.call(this)}},{key:"disableEventListeners",value:function(){return ut.call(this)}}]),Dt);function Dt(e,t){var n=this,i=2<arguments.length&&void 0!==arguments[2]?arguments[2]:{};!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,Dt),this.scheduleUpdate=function(){return requestAnimationFrame(n.update)},this.update=Oe(this.update.bind(this)),this.options=ze({},Dt.Defaults,i),this.state={isDestroyed:!1,isCreated:!1,scrollParents:[]},this.reference=e&&e.jquery?e[0]:e,this.popper=t&&t.jquery?t[0]:t,this.options.modifiers={},Object.keys(ze({},Dt.Defaults.modifiers,i.modifiers)).forEach(function(e){n.options.modifiers[e]=ze({},Dt.Defaults.modifiers[e]||{},i.modifiers?i.modifiers[e]:{})}),this.modifiers=Object.keys(this.options.modifiers).map(function(e){return ze({name:e},n.options.modifiers[e])}).sort(function(e,t){return e.order-t.order}),this.modifiers.forEach(function(e){e.enabled&&Ne(e.onLoad)&&e.onLoad(n.reference,n.popper,n.options,e,n.state)}),this.update();var o=this.options.eventsEnabled;o&&this.enableEventListeners(),this.state.eventsEnabled=o}St.Utils=("undefined"!=typeof window?window:global).PopperUtils,St.placements=_t,St.Defaults=Ct;var It="dropdown",At="bs.dropdown",Ot="."+At,Nt=".data-api",kt=p.fn[It],Lt=new RegExp("38|40|27"),Pt={HIDE:"hide"+Ot,HIDDEN:"hidden"+Ot,SHOW:"show"+Ot,SHOWN:"shown"+Ot,CLICK:"click"+Ot,CLICK_DATA_API:"click"+Ot+Nt,KEYDOWN_DATA_API:"keydown"+Ot+Nt,KEYUP_DATA_API:"keyup"+Ot+Nt},xt="disabled",jt="show",Ht="dropup",Rt="dropright",Ft="dropleft",Mt="dropdown-menu-right",Wt="position-static",Ut='[data-toggle="dropdown"]',Bt=".dropdown form",qt=".dropdown-menu",Kt=".navbar-nav",Qt=".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)",Vt="top-start",Yt="top-end",zt="bottom-start",Xt="bottom-end",Gt="right-start",$t="left-start",Jt={offset:0,flip:!0,boundary:"scrollParent",reference:"toggle",display:"dynamic",popperConfig:null},Zt={offset:"(number|string|function)",flip:"boolean",boundary:"(string|element)",reference:"(string|element)",display:"string",popperConfig:"(null|object)"},en=function(){function c(e,t){this._element=e,this._popper=null,this._config=this._getConfig(t),this._menu=this._getMenuElement(),this._inNavbar=this._detectNavbar(),this._addEventListeners()}var e=c.prototype;return e.toggle=function(){if(!this._element.disabled&&!p(this._element).hasClass(xt)){var e=p(this._menu).hasClass(jt);c._clearMenus(),e||this.show(!0)}},e.show=function(e){if(void 0===e&&(e=!1),!(this._element.disabled||p(this._element).hasClass(xt)||p(this._menu).hasClass(jt))){var t={relatedTarget:this._element},n=p.Event(Pt.SHOW,t),i=c._getParentFromElement(this._element);if(p(i).trigger(n),!n.isDefaultPrevented()){if(!this._inNavbar&&e){if("undefined"==typeof St)throw new TypeError("Bootstrap's dropdowns require Popper.js (https://popper.js.org/)");var o=this._element;"parent"===this._config.reference?o=i:m.isElement(this._config.reference)&&(o=this._config.reference,"undefined"!=typeof this._config.reference.jquery&&(o=this._config.reference[0])),"scrollParent"!==this._config.boundary&&p(i).addClass(Wt),this._popper=new St(o,this._menu,this._getPopperConfig())}"ontouchstart"in document.documentElement&&0===p(i).closest(Kt).length&&p(document.body).children().on("mouseover",null,p.noop),this._element.focus(),this._element.setAttribute("aria-expanded",!0),p(this._menu).toggleClass(jt),p(i).toggleClass(jt).trigger(p.Event(Pt.SHOWN,t))}}},e.hide=function(){if(!this._element.disabled&&!p(this._element).hasClass(xt)&&p(this._menu).hasClass(jt)){var e={relatedTarget:this._element},t=p.Event(Pt.HIDE,e),n=c._getParentFromElement(this._element);p(n).trigger(t),t.isDefaultPrevented()||(this._popper&&this._popper.destroy(),p(this._menu).toggleClass(jt),p(n).toggleClass(jt).trigger(p.Event(Pt.HIDDEN,e)))}},e.dispose=function(){p.removeData(this._element,At),p(this._element).off(Ot),this._element=null,(this._menu=null)!==this._popper&&(this._popper.destroy(),this._popper=null)},e.update=function(){this._inNavbar=this._detectNavbar(),null!==this._popper&&this._popper.scheduleUpdate()},e._addEventListeners=function(){var t=this;p(this._element).on(Pt.CLICK,function(e){e.preventDefault(),e.stopPropagation(),t.toggle()})},e._getConfig=function(e){return e=l({},this.constructor.Default,{},p(this._element).data(),{},e),m.typeCheckConfig(It,e,this.constructor.DefaultType),e},e._getMenuElement=function(){if(!this._menu){var e=c._getParentFromElement(this._element);e&&(this._menu=e.querySelector(qt))}return this._menu},e._getPlacement=function(){var e=p(this._element.parentNode),t=zt;return e.hasClass(Ht)?(t=Vt,p(this._menu).hasClass(Mt)&&(t=Yt)):e.hasClass(Rt)?t=Gt:e.hasClass(Ft)?t=$t:p(this._menu).hasClass(Mt)&&(t=Xt),t},e._detectNavbar=function(){return 0<p(this._element).closest(".navbar").length},e._getOffset=function(){var t=this,e={};return"function"==typeof this._config.offset?e.fn=function(e){return e.offsets=l({},e.offsets,{},t._config.offset(e.offsets,t._element)||{}),e}:e.offset=this._config.offset,e},e._getPopperConfig=function(){var e={placement:this._getPlacement(),modifiers:{offset:this._getOffset(),flip:{enabled:this._config.flip},preventOverflow:{boundariesElement:this._config.boundary}}};return"static"===this._config.display&&(e.modifiers.applyStyle={enabled:!1}),l({},e,{},this._config.popperConfig)},c._jQueryInterface=function(t){return this.each(function(){var e=p(this).data(At);if(e||(e=new c(this,"object"==typeof t?t:null),p(this).data(At,e)),"string"==typeof t){if("undefined"==typeof e[t])throw new TypeError('No method named "'+t+'"');e[t]()}})},c._clearMenus=function(e){if(!e||3!==e.which&&("keyup"!==e.type||9===e.which))for(var t=[].slice.call(document.querySelectorAll(Ut)),n=0,i=t.length;n<i;n++){var o=c._getParentFromElement(t[n]),r=p(t[n]).data(At),s={relatedTarget:t[n]};if(e&&"click"===e.type&&(s.clickEvent=e),r){var a=r._menu;if(p(o).hasClass(jt)&&!(e&&("click"===e.type&&/input|textarea/i.test(e.target.tagName)||"keyup"===e.type&&9===e.which)&&p.contains(o,e.target))){var l=p.Event(Pt.HIDE,s);p(o).trigger(l),l.isDefaultPrevented()||("ontouchstart"in document.documentElement&&p(document.body).children().off("mouseover",null,p.noop),t[n].setAttribute("aria-expanded","false"),r._popper&&r._popper.destroy(),p(a).removeClass(jt),p(o).removeClass(jt).trigger(p.Event(Pt.HIDDEN,s)))}}}},c._getParentFromElement=function(e){var t,n=m.getSelectorFromElement(e);return n&&(t=document.querySelector(n)),t||e.parentNode},c._dataApiKeydownHandler=function(e){if((/input|textarea/i.test(e.target.tagName)?!(32===e.which||27!==e.which&&(40!==e.which&&38!==e.which||p(e.target).closest(qt).length)):Lt.test(e.which))&&(e.preventDefault(),e.stopPropagation(),!this.disabled&&!p(this).hasClass(xt))){var t=c._getParentFromElement(this),n=p(t).hasClass(jt);if(n||27!==e.which)if(n&&(!n||27!==e.which&&32!==e.which)){var i=[].slice.call(t.querySelectorAll(Qt)).filter(function(e){return p(e).is(":visible")});if(0!==i.length){var o=i.indexOf(e.target);38===e.which&&0<o&&o--,40===e.which&&o<i.length-1&&o++,o<0&&(o=0),i[o].focus()}}else{if(27===e.which){var r=t.querySelector(Ut);p(r).trigger("focus")}p(this).trigger("click")}}},s(c,null,[{key:"VERSION",get:function(){return"4.4.1"}},{key:"Default",get:function(){return Jt}},{key:"DefaultType",get:function(){return Zt}}]),c}();p(document).on(Pt.KEYDOWN_DATA_API,Ut,en._dataApiKeydownHandler).on(Pt.KEYDOWN_DATA_API,qt,en._dataApiKeydownHandler).on(Pt.CLICK_DATA_API+" "+Pt.KEYUP_DATA_API,en._clearMenus).on(Pt.CLICK_DATA_API,Ut,function(e){e.preventDefault(),e.stopPropagation(),en._jQueryInterface.call(p(this),"toggle")}).on(Pt.CLICK_DATA_API,Bt,function(e){e.stopPropagation()}),p.fn[It]=en._jQueryInterface,p.fn[It].Constructor=en,p.fn[It].noConflict=function(){return p.fn[It]=kt,en._jQueryInterface};var tn="modal",nn="bs.modal",on="."+nn,rn=p.fn[tn],sn={backdrop:!0,keyboard:!0,focus:!0,show:!0},an={backdrop:"(boolean|string)",keyboard:"boolean",focus:"boolean",show:"boolean"},ln={HIDE:"hide"+on,HIDE_PREVENTED:"hidePrevented"+on,HIDDEN:"hidden"+on,SHOW:"show"+on,SHOWN:"shown"+on,FOCUSIN:"focusin"+on,RESIZE:"resize"+on,CLICK_DISMISS:"click.dismiss"+on,KEYDOWN_DISMISS:"keydown.dismiss"+on,MOUSEUP_DISMISS:"mouseup.dismiss"+on,MOUSEDOWN_DISMISS:"mousedown.dismiss"+on,CLICK_DATA_API:"click"+on+".data-api"},cn="modal-dialog-scrollable",hn="modal-scrollbar-measure",un="modal-backdrop",fn="modal-open",dn="fade",pn="show",mn="modal-static",gn=".modal-dialog",_n=".modal-body",vn='[data-toggle="modal"]',yn='[data-dismiss="modal"]',En=".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",bn=".sticky-top",wn=function(){function o(e,t){this._config=this._getConfig(t),this._element=e,this._dialog=e.querySelector(gn),this._backdrop=null,this._isShown=!1,this._isBodyOverflowing=!1,this._ignoreBackdropClick=!1,this._isTransitioning=!1,this._scrollbarWidth=0}var e=o.prototype;return e.toggle=function(e){return this._isShown?this.hide():this.show(e)},e.show=function(e){var t=this;if(!this._isShown&&!this._isTransitioning){p(this._element).hasClass(dn)&&(this._isTransitioning=!0);var n=p.Event(ln.SHOW,{relatedTarget:e});p(this._element).trigger(n),this._isShown||n.isDefaultPrevented()||(this._isShown=!0,this._checkScrollbar(),this._setScrollbar(),this._adjustDialog(),this._setEscapeEvent(),this._setResizeEvent(),p(this._element).on(ln.CLICK_DISMISS,yn,function(e){return t.hide(e)}),p(this._dialog).on(ln.MOUSEDOWN_DISMISS,function(){p(t._element).one(ln.MOUSEUP_DISMISS,function(e){p(e.target).is(t._element)&&(t._ignoreBackdropClick=!0)})}),this._showBackdrop(function(){return t._showElement(e)}))}},e.hide=function(e){var t=this;if(e&&e.preventDefault(),this._isShown&&!this._isTransitioning){var n=p.Event(ln.HIDE);if(p(this._element).trigger(n),this._isShown&&!n.isDefaultPrevented()){this._isShown=!1;var i=p(this._element).hasClass(dn);if(i&&(this._isTransitioning=!0),this._setEscapeEvent(),this._setResizeEvent(),p(document).off(ln.FOCUSIN),p(this._element).removeClass(pn),p(this._element).off(ln.CLICK_DISMISS),p(this._dialog).off(ln.MOUSEDOWN_DISMISS),i){var o=m.getTransitionDurationFromElement(this._element);p(this._element).one(m.TRANSITION_END,function(e){return t._hideModal(e)}).emulateTransitionEnd(o)}else this._hideModal()}}},e.dispose=function(){[window,this._element,this._dialog].forEach(function(e){return p(e).off(on)}),p(document).off(ln.FOCUSIN),p.removeData(this._element,nn),this._config=null,this._element=null,this._dialog=null,this._backdrop=null,this._isShown=null,this._isBodyOverflowing=null,this._ignoreBackdropClick=null,this._isTransitioning=null,this._scrollbarWidth=null},e.handleUpdate=function(){this._adjustDialog()},e._getConfig=function(e){return e=l({},sn,{},e),m.typeCheckConfig(tn,e,an),e},e._triggerBackdropTransition=function(){var e=this;if("static"===this._config.backdrop){var t=p.Event(ln.HIDE_PREVENTED);if(p(this._element).trigger(t),t.defaultPrevented)return;this._element.classList.add(mn);var n=m.getTransitionDurationFromElement(this._element);p(this._element).one(m.TRANSITION_END,function(){e._element.classList.remove(mn)}).emulateTransitionEnd(n),this._element.focus()}else this.hide()},e._showElement=function(e){var t=this,n=p(this._element).hasClass(dn),i=this._dialog?this._dialog.querySelector(_n):null;this._element.parentNode&&this._element.parentNode.nodeType===Node.ELEMENT_NODE||document.body.appendChild(this._element),this._element.style.display="block",this._element.removeAttribute("aria-hidden"),this._element.setAttribute("aria-modal",!0),p(this._dialog).hasClass(cn)&&i?i.scrollTop=0:this._element.scrollTop=0,n&&m.reflow(this._element),p(this._element).addClass(pn),this._config.focus&&this._enforceFocus();function o(){t._config.focus&&t._element.focus(),t._isTransitioning=!1,p(t._element).trigger(r)}var r=p.Event(ln.SHOWN,{relatedTarget:e});if(n){var s=m.getTransitionDurationFromElement(this._dialog);p(this._dialog).one(m.TRANSITION_END,o).emulateTransitionEnd(s)}else o()},e._enforceFocus=function(){var t=this;p(document).off(ln.FOCUSIN).on(ln.FOCUSIN,function(e){document!==e.target&&t._element!==e.target&&0===p(t._element).has(e.target).length&&t._element.focus()})},e._setEscapeEvent=function(){var t=this;this._isShown&&this._config.keyboard?p(this._element).on(ln.KEYDOWN_DISMISS,function(e){27===e.which&&t._triggerBackdropTransition()}):this._isShown||p(this._element).off(ln.KEYDOWN_DISMISS)},e._setResizeEvent=function(){var t=this;this._isShown?p(window).on(ln.RESIZE,function(e){return t.handleUpdate(e)}):p(window).off(ln.RESIZE)},e._hideModal=function(){var e=this;this._element.style.display="none",this._element.setAttribute("aria-hidden",!0),this._element.removeAttribute("aria-modal"),this._isTransitioning=!1,this._showBackdrop(function(){p(document.body).removeClass(fn),e._resetAdjustments(),e._resetScrollbar(),p(e._element).trigger(ln.HIDDEN)})},e._removeBackdrop=function(){this._backdrop&&(p(this._backdrop).remove(),this._backdrop=null)},e._showBackdrop=function(e){var t=this,n=p(this._element).hasClass(dn)?dn:"";if(this._isShown&&this._config.backdrop){if(this._backdrop=document.createElement("div"),this._backdrop.className=un,n&&this._backdrop.classList.add(n),p(this._backdrop).appendTo(document.body),p(this._element).on(ln.CLICK_DISMISS,function(e){t._ignoreBackdropClick?t._ignoreBackdropClick=!1:e.target===e.currentTarget&&t._triggerBackdropTransition()}),n&&m.reflow(this._backdrop),p(this._backdrop).addClass(pn),!e)return;if(!n)return void e();var i=m.getTransitionDurationFromElement(this._backdrop);p(this._backdrop).one(m.TRANSITION_END,e).emulateTransitionEnd(i)}else if(!this._isShown&&this._backdrop){p(this._backdrop).removeClass(pn);var o=function(){t._removeBackdrop(),e&&e()};if(p(this._element).hasClass(dn)){var r=m.getTransitionDurationFromElement(this._backdrop);p(this._backdrop).one(m.TRANSITION_END,o).emulateTransitionEnd(r)}else o()}else e&&e()},e._adjustDialog=function(){var e=this._element.scrollHeight>document.documentElement.clientHeight;!this._isBodyOverflowing&&e&&(this._element.style.paddingLeft=this._scrollbarWidth+"px"),this._isBodyOverflowing&&!e&&(this._element.style.paddingRight=this._scrollbarWidth+"px")},e._resetAdjustments=function(){this._element.style.paddingLeft="",this._element.style.paddingRight=""},e._checkScrollbar=function(){var e=document.body.getBoundingClientRect();this._isBodyOverflowing=e.left+e.right<window.innerWidth,this._scrollbarWidth=this._getScrollbarWidth()},e._setScrollbar=function(){var o=this;if(this._isBodyOverflowing){var e=[].slice.call(document.querySelectorAll(En)),t=[].slice.call(document.querySelectorAll(bn));p(e).each(function(e,t){var n=t.style.paddingRight,i=p(t).css("padding-right");p(t).data("padding-right",n).css("padding-right",parseFloat(i)+o._scrollbarWidth+"px")}),p(t).each(function(e,t){var n=t.style.marginRight,i=p(t).css("margin-right");p(t).data("margin-right",n).css("margin-right",parseFloat(i)-o._scrollbarWidth+"px")});var n=document.body.style.paddingRight,i=p(document.body).css("padding-right");p(document.body).data("padding-right",n).css("padding-right",parseFloat(i)+this._scrollbarWidth+"px")}p(document.body).addClass(fn)},e._resetScrollbar=function(){var e=[].slice.call(document.querySelectorAll(En));p(e).each(function(e,t){var n=p(t).data("padding-right");p(t).removeData("padding-right"),t.style.paddingRight=n||""});var t=[].slice.call(document.querySelectorAll(""+bn));p(t).each(function(e,t){var n=p(t).data("margin-right");"undefined"!=typeof n&&p(t).css("margin-right",n).removeData("margin-right")});var n=p(document.body).data("padding-right");p(document.body).removeData("padding-right"),document.body.style.paddingRight=n||""},e._getScrollbarWidth=function(){var e=document.createElement("div");e.className=hn,document.body.appendChild(e);var t=e.getBoundingClientRect().width-e.clientWidth;return document.body.removeChild(e),t},o._jQueryInterface=function(n,i){return this.each(function(){var e=p(this).data(nn),t=l({},sn,{},p(this).data(),{},"object"==typeof n&&n?n:{});if(e||(e=new o(this,t),p(this).data(nn,e)),"string"==typeof n){if("undefined"==typeof e[n])throw new TypeError('No method named "'+n+'"');e[n](i)}else t.show&&e.show(i)})},s(o,null,[{key:"VERSION",get:function(){return"4.4.1"}},{key:"Default",get:function(){return sn}}]),o}();p(document).on(ln.CLICK_DATA_API,vn,function(e){var t,n=this,i=m.getSelectorFromElement(this);i&&(t=document.querySelector(i));var o=p(t).data(nn)?"toggle":l({},p(t).data(),{},p(this).data());"A"!==this.tagName&&"AREA"!==this.tagName||e.preventDefault();var r=p(t).one(ln.SHOW,function(e){e.isDefaultPrevented()||r.one(ln.HIDDEN,function(){p(n).is(":visible")&&n.focus()})});wn._jQueryInterface.call(p(t),o,this)}),p.fn[tn]=wn._jQueryInterface,p.fn[tn].Constructor=wn,p.fn[tn].noConflict=function(){return p.fn[tn]=rn,wn._jQueryInterface};var Tn=["background","cite","href","itemtype","longdesc","poster","src","xlink:href"],Cn={"*":["class","dir","id","lang","role",/^aria-[\w-]*$/i],a:["target","href","title","rel"],area:[],b:[],br:[],col:[],code:[],div:[],em:[],hr:[],h1:[],h2:[],h3:[],h4:[],h5:[],h6:[],i:[],img:["src","alt","title","width","height"],li:[],ol:[],p:[],pre:[],s:[],small:[],span:[],sub:[],sup:[],strong:[],u:[],ul:[]},Sn=/^(?:(?:https?|mailto|ftp|tel|file):|[^&:/?#]*(?:[/?#]|$))/gi,Dn=/^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+/]+=*$/i;function In(e,r,t){if(0===e.length)return e;if(t&&"function"==typeof t)return t(e);for(var n=(new window.DOMParser).parseFromString(e,"text/html"),s=Object.keys(r),a=[].slice.call(n.body.querySelectorAll("*")),i=function(e){var t=a[e],n=t.nodeName.toLowerCase();if(-1===s.indexOf(t.nodeName.toLowerCase()))return t.parentNode.removeChild(t),"continue";var i=[].slice.call(t.attributes),o=[].concat(r["*"]||[],r[n]||[]);i.forEach(function(e){!function(e,t){var n=e.nodeName.toLowerCase();if(-1!==t.indexOf(n))return-1===Tn.indexOf(n)||Boolean(e.nodeValue.match(Sn)||e.nodeValue.match(Dn));for(var i=t.filter(function(e){return e instanceof RegExp}),o=0,r=i.length;o<r;o++)if(n.match(i[o]))return!0;return!1}(e,o)&&t.removeAttribute(e.nodeName)})},o=0,l=a.length;o<l;o++)i(o);return n.body.innerHTML}var An="tooltip",On="bs.tooltip",Nn="."+On,kn=p.fn[An],Ln="bs-tooltip",Pn=new RegExp("(^|\\s)"+Ln+"\\S+","g"),xn=["sanitize","whiteList","sanitizeFn"],jn={animation:"boolean",template:"string",title:"(string|element|function)",trigger:"string",delay:"(number|object)",html:"boolean",selector:"(string|boolean)",placement:"(string|function)",offset:"(number|string|function)",container:"(string|element|boolean)",fallbackPlacement:"(string|array)",boundary:"(string|element)",sanitize:"boolean",sanitizeFn:"(null|function)",whiteList:"object",popperConfig:"(null|object)"},Hn={AUTO:"auto",TOP:"top",RIGHT:"right",BOTTOM:"bottom",LEFT:"left"},Rn={animation:!0,template:'<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,selector:!1,placement:"top",offset:0,container:!1,fallbackPlacement:"flip",boundary:"scrollParent",sanitize:!0,sanitizeFn:null,whiteList:Cn,popperConfig:null},Fn="show",Mn="out",Wn={HIDE:"hide"+Nn,HIDDEN:"hidden"+Nn,SHOW:"show"+Nn,SHOWN:"shown"+Nn,INSERTED:"inserted"+Nn,CLICK:"click"+Nn,FOCUSIN:"focusin"+Nn,FOCUSOUT:"focusout"+Nn,MOUSEENTER:"mouseenter"+Nn,MOUSELEAVE:"mouseleave"+Nn},Un="fade",Bn="show",qn=".tooltip-inner",Kn=".arrow",Qn="hover",Vn="focus",Yn="click",zn="manual",Xn=function(){function i(e,t){if("undefined"==typeof St)throw new TypeError("Bootstrap's tooltips require Popper.js (https://popper.js.org/)");this._isEnabled=!0,this._timeout=0,this._hoverState="",this._activeTrigger={},this._popper=null,this.element=e,this.config=this._getConfig(t),this.tip=null,this._setListeners()}var e=i.prototype;return e.enable=function(){this._isEnabled=!0},e.disable=function(){this._isEnabled=!1},e.toggleEnabled=function(){this._isEnabled=!this._isEnabled},e.toggle=function(e){if(this._isEnabled)if(e){var t=this.constructor.DATA_KEY,n=p(e.currentTarget).data(t);n||(n=new this.constructor(e.currentTarget,this._getDelegateConfig()),p(e.currentTarget).data(t,n)),n._activeTrigger.click=!n._activeTrigger.click,n._isWithActiveTrigger()?n._enter(null,n):n._leave(null,n)}else{if(p(this.getTipElement()).hasClass(Bn))return void this._leave(null,this);this._enter(null,this)}},e.dispose=function(){clearTimeout(this._timeout),p.removeData(this.element,this.constructor.DATA_KEY),p(this.element).off(this.constructor.EVENT_KEY),p(this.element).closest(".modal").off("hide.bs.modal",this._hideModalHandler),this.tip&&p(this.tip).remove(),this._isEnabled=null,this._timeout=null,this._hoverState=null,this._activeTrigger=null,this._popper&&this._popper.destroy(),this._popper=null,this.element=null,this.config=null,this.tip=null},e.show=function(){var t=this;if("none"===p(this.element).css("display"))throw new Error("Please use show on visible elements");var e=p.Event(this.constructor.Event.SHOW);if(this.isWithContent()&&this._isEnabled){p(this.element).trigger(e);var n=m.findShadowRoot(this.element),i=p.contains(null!==n?n:this.element.ownerDocument.documentElement,this.element);if(e.isDefaultPrevented()||!i)return;var o=this.getTipElement(),r=m.getUID(this.constructor.NAME);o.setAttribute("id",r),this.element.setAttribute("aria-describedby",r),this.setContent(),this.config.animation&&p(o).addClass(Un);var s="function"==typeof this.config.placement?this.config.placement.call(this,o,this.element):this.config.placement,a=this._getAttachment(s);this.addAttachmentClass(a);var l=this._getContainer();p(o).data(this.constructor.DATA_KEY,this),p.contains(this.element.ownerDocument.documentElement,this.tip)||p(o).appendTo(l),p(this.element).trigger(this.constructor.Event.INSERTED),this._popper=new St(this.element,o,this._getPopperConfig(a)),p(o).addClass(Bn),"ontouchstart"in document.documentElement&&p(document.body).children().on("mouseover",null,p.noop);var c=function(){t.config.animation&&t._fixTransition();var e=t._hoverState;t._hoverState=null,p(t.element).trigger(t.constructor.Event.SHOWN),e===Mn&&t._leave(null,t)};if(p(this.tip).hasClass(Un)){var h=m.getTransitionDurationFromElement(this.tip);p(this.tip).one(m.TRANSITION_END,c).emulateTransitionEnd(h)}else c()}},e.hide=function(e){function t(){n._hoverState!==Fn&&i.parentNode&&i.parentNode.removeChild(i),n._cleanTipClass(),n.element.removeAttribute("aria-describedby"),p(n.element).trigger(n.constructor.Event.HIDDEN),null!==n._popper&&n._popper.destroy(),e&&e()}var n=this,i=this.getTipElement(),o=p.Event(this.constructor.Event.HIDE);if(p(this.element).trigger(o),!o.isDefaultPrevented()){if(p(i).removeClass(Bn),"ontouchstart"in document.documentElement&&p(document.body).children().off("mouseover",null,p.noop),this._activeTrigger[Yn]=!1,this._activeTrigger[Vn]=!1,this._activeTrigger[Qn]=!1,p(this.tip).hasClass(Un)){var r=m.getTransitionDurationFromElement(i);p(i).one(m.TRANSITION_END,t).emulateTransitionEnd(r)}else t();this._hoverState=""}},e.update=function(){null!==this._popper&&this._popper.scheduleUpdate()},e.isWithContent=function(){return Boolean(this.getTitle())},e.addAttachmentClass=function(e){p(this.getTipElement()).addClass(Ln+"-"+e)},e.getTipElement=function(){return this.tip=this.tip||p(this.config.template)[0],this.tip},e.setContent=function(){var e=this.getTipElement();this.setElementContent(p(e.querySelectorAll(qn)),this.getTitle()),p(e).removeClass(Un+" "+Bn)},e.setElementContent=function(e,t){"object"!=typeof t||!t.nodeType&&!t.jquery?this.config.html?(this.config.sanitize&&(t=In(t,this.config.whiteList,this.config.sanitizeFn)),e.html(t)):e.text(t):this.config.html?p(t).parent().is(e)||e.empty().append(t):e.text(p(t).text())},e.getTitle=function(){var e=this.element.getAttribute("data-original-title");return e=e||("function"==typeof this.config.title?this.config.title.call(this.element):this.config.title)},e._getPopperConfig=function(e){var t=this;return l({},{placement:e,modifiers:{offset:this._getOffset(),flip:{behavior:this.config.fallbackPlacement},arrow:{element:Kn},preventOverflow:{boundariesElement:this.config.boundary}},onCreate:function(e){e.originalPlacement!==e.placement&&t._handlePopperPlacementChange(e)},onUpdate:function(e){return t._handlePopperPlacementChange(e)}},{},this.config.popperConfig)},e._getOffset=function(){var t=this,e={};return"function"==typeof this.config.offset?e.fn=function(e){return e.offsets=l({},e.offsets,{},t.config.offset(e.offsets,t.element)||{}),e}:e.offset=this.config.offset,e},e._getContainer=function(){return!1===this.config.container?document.body:m.isElement(this.config.container)?p(this.config.container):p(document).find(this.config.container)},e._getAttachment=function(e){return Hn[e.toUpperCase()]},e._setListeners=function(){var i=this;this.config.trigger.split(" ").forEach(function(e){if("click"===e)p(i.element).on(i.constructor.Event.CLICK,i.config.selector,function(e){return i.toggle(e)});else if(e!==zn){var t=e===Qn?i.constructor.Event.MOUSEENTER:i.constructor.Event.FOCUSIN,n=e===Qn?i.constructor.Event.MOUSELEAVE:i.constructor.Event.FOCUSOUT;p(i.element).on(t,i.config.selector,function(e){return i._enter(e)}).on(n,i.config.selector,function(e){return i._leave(e)})}}),this._hideModalHandler=function(){i.element&&i.hide()},p(this.element).closest(".modal").on("hide.bs.modal",this._hideModalHandler),this.config.selector?this.config=l({},this.config,{trigger:"manual",selector:""}):this._fixTitle()},e._fixTitle=function(){var e=typeof this.element.getAttribute("data-original-title");!this.element.getAttribute("title")&&"string"==e||(this.element.setAttribute("data-original-title",this.element.getAttribute("title")||""),this.element.setAttribute("title",""))},e._enter=function(e,t){var n=this.constructor.DATA_KEY;(t=t||p(e.currentTarget).data(n))||(t=new this.constructor(e.currentTarget,this._getDelegateConfig()),p(e.currentTarget).data(n,t)),e&&(t._activeTrigger["focusin"===e.type?Vn:Qn]=!0),p(t.getTipElement()).hasClass(Bn)||t._hoverState===Fn?t._hoverState=Fn:(clearTimeout(t._timeout),t._hoverState=Fn,t.config.delay&&t.config.delay.show?t._timeout=setTimeout(function(){t._hoverState===Fn&&t.show()},t.config.delay.show):t.show())},e._leave=function(e,t){var n=this.constructor.DATA_KEY;(t=t||p(e.currentTarget).data(n))||(t=new this.constructor(e.currentTarget,this._getDelegateConfig()),p(e.currentTarget).data(n,t)),e&&(t._activeTrigger["focusout"===e.type?Vn:Qn]=!1),t._isWithActiveTrigger()||(clearTimeout(t._timeout),t._hoverState=Mn,t.config.delay&&t.config.delay.hide?t._timeout=setTimeout(function(){t._hoverState===Mn&&t.hide()},t.config.delay.hide):t.hide())},e._isWithActiveTrigger=function(){for(var e in this._activeTrigger)if(this._activeTrigger[e])return!0;return!1},e._getConfig=function(e){var t=p(this.element).data();return Object.keys(t).forEach(function(e){-1!==xn.indexOf(e)&&delete t[e]}),"number"==typeof(e=l({},this.constructor.Default,{},t,{},"object"==typeof e&&e?e:{})).delay&&(e.delay={show:e.delay,hide:e.delay}),"number"==typeof e.title&&(e.title=e.title.toString()),"number"==typeof e.content&&(e.content=e.content.toString()),m.typeCheckConfig(An,e,this.constructor.DefaultType),e.sanitize&&(e.template=In(e.template,e.whiteList,e.sanitizeFn)),e},e._getDelegateConfig=function(){var e={};if(this.config)for(var t in this.config)this.constructor.Default[t]!==this.config[t]&&(e[t]=this.config[t]);return e},e._cleanTipClass=function(){var e=p(this.getTipElement()),t=e.attr("class").match(Pn);null!==t&&t.length&&e.removeClass(t.join(""))},e._handlePopperPlacementChange=function(e){var t=e.instance;this.tip=t.popper,this._cleanTipClass(),this.addAttachmentClass(this._getAttachment(e.placement))},e._fixTransition=function(){var e=this.getTipElement(),t=this.config.animation;null===e.getAttribute("x-placement")&&(p(e).removeClass(Un),this.config.animation=!1,this.hide(),this.show(),this.config.animation=t)},i._jQueryInterface=function(n){return this.each(function(){var e=p(this).data(On),t="object"==typeof n&&n;if((e||!/dispose|hide/.test(n))&&(e||(e=new i(this,t),p(this).data(On,e)),"string"==typeof n)){if("undefined"==typeof e[n])throw new TypeError('No method named "'+n+'"');e[n]()}})},s(i,null,[{key:"VERSION",get:function(){return"4.4.1"}},{key:"Default",get:function(){return Rn}},{key:"NAME",get:function(){return An}},{key:"DATA_KEY",get:function(){return On}},{key:"Event",get:function(){return Wn}},{key:"EVENT_KEY",get:function(){return Nn}},{key:"DefaultType",get:function(){return jn}}]),i}();p.fn[An]=Xn._jQueryInterface,p.fn[An].Constructor=Xn,p.fn[An].noConflict=function(){return p.fn[An]=kn,Xn._jQueryInterface};var Gn="popover",$n="bs.popover",Jn="."+$n,Zn=p.fn[Gn],ei="bs-popover",ti=new RegExp("(^|\\s)"+ei+"\\S+","g"),ni=l({},Xn.Default,{placement:"right",trigger:"click",content:"",template:'<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'}),ii=l({},Xn.DefaultType,{content:"(string|element|function)"}),oi="fade",ri="show",si=".popover-header",ai=".popover-body",li={HIDE:"hide"+Jn,HIDDEN:"hidden"+Jn,SHOW:"show"+Jn,SHOWN:"shown"+Jn,INSERTED:"inserted"+Jn,CLICK:"click"+Jn,FOCUSIN:"focusin"+Jn,FOCUSOUT:"focusout"+Jn,MOUSEENTER:"mouseenter"+Jn,MOUSELEAVE:"mouseleave"+Jn},ci=function(e){function i(){return e.apply(this,arguments)||this}!function(e,t){e.prototype=Object.create(t.prototype),(e.prototype.constructor=e).__proto__=t}(i,e);var t=i.prototype;return t.isWithContent=function(){return this.getTitle()||this._getContent()},t.addAttachmentClass=function(e){p(this.getTipElement()).addClass(ei+"-"+e)},t.getTipElement=function(){return this.tip=this.tip||p(this.config.template)[0],this.tip},t.setContent=function(){var e=p(this.getTipElement());this.setElementContent(e.find(si),this.getTitle());var t=this._getContent();"function"==typeof t&&(t=t.call(this.element)),this.setElementContent(e.find(ai),t),e.removeClass(oi+" "+ri)},t._getContent=function(){return this.element.getAttribute("data-content")||this.config.content},t._cleanTipClass=function(){var e=p(this.getTipElement()),t=e.attr("class").match(ti);null!==t&&0<t.length&&e.removeClass(t.join(""))},i._jQueryInterface=function(n){return this.each(function(){var e=p(this).data($n),t="object"==typeof n?n:null;if((e||!/dispose|hide/.test(n))&&(e||(e=new i(this,t),p(this).data($n,e)),"string"==typeof n)){if("undefined"==typeof e[n])throw new TypeError('No method named "'+n+'"');e[n]()}})},s(i,null,[{key:"VERSION",get:function(){return"4.4.1"}},{key:"Default",get:function(){return ni}},{key:"NAME",get:function(){return Gn}},{key:"DATA_KEY",get:function(){return $n}},{key:"Event",get:function(){return li}},{key:"EVENT_KEY",get:function(){return Jn}},{key:"DefaultType",get:function(){return ii}}]),i}(Xn);p.fn[Gn]=ci._jQueryInterface,p.fn[Gn].Constructor=ci,p.fn[Gn].noConflict=function(){return p.fn[Gn]=Zn,ci._jQueryInterface};var hi="scrollspy",ui="bs.scrollspy",fi="."+ui,di=p.fn[hi],pi={offset:10,method:"auto",target:""},mi={offset:"number",method:"string",target:"(string|element)"},gi={ACTIVATE:"activate"+fi,SCROLL:"scroll"+fi,LOAD_DATA_API:"load"+fi+".data-api"},_i="dropdown-item",vi="active",yi='[data-spy="scroll"]',Ei=".nav, .list-group",bi=".nav-link",wi=".nav-item",Ti=".list-group-item",Ci=".dropdown",Si=".dropdown-item",Di=".dropdown-toggle",Ii="offset",Ai="position",Oi=function(){function n(e,t){var n=this;this._element=e,this._scrollElement="BODY"===e.tagName?window:e,this._config=this._getConfig(t),this._selector=this._config.target+" "+bi+","+this._config.target+" "+Ti+","+this._config.target+" "+Si,this._offsets=[],this._targets=[],this._activeTarget=null,this._scrollHeight=0,p(this._scrollElement).on(gi.SCROLL,function(e){return n._process(e)}),this.refresh(),this._process()}var e=n.prototype;return e.refresh=function(){var t=this,e=this._scrollElement===this._scrollElement.window?Ii:Ai,o="auto"===this._config.method?e:this._config.method,r=o===Ai?this._getScrollTop():0;this._offsets=[],this._targets=[],this._scrollHeight=this._getScrollHeight(),[].slice.call(document.querySelectorAll(this._selector)).map(function(e){var t,n=m.getSelectorFromElement(e);if(n&&(t=document.querySelector(n)),t){var i=t.getBoundingClientRect();if(i.width||i.height)return[p(t)[o]().top+r,n]}return null}).filter(function(e){return e}).sort(function(e,t){return e[0]-t[0]}).forEach(function(e){t._offsets.push(e[0]),t._targets.push(e[1])})},e.dispose=function(){p.removeData(this._element,ui),p(this._scrollElement).off(fi),this._element=null,this._scrollElement=null,this._config=null,this._selector=null,this._offsets=null,this._targets=null,this._activeTarget=null,this._scrollHeight=null},e._getConfig=function(e){if("string"!=typeof(e=l({},pi,{},"object"==typeof e&&e?e:{})).target){var t=p(e.target).attr("id");t||(t=m.getUID(hi),p(e.target).attr("id",t)),e.target="#"+t}return m.typeCheckConfig(hi,e,mi),e},e._getScrollTop=function(){return this._scrollElement===window?this._scrollElement.pageYOffset:this._scrollElement.scrollTop},e._getScrollHeight=function(){return this._scrollElement.scrollHeight||Math.max(document.body.scrollHeight,document.documentElement.scrollHeight)},e._getOffsetHeight=function(){return this._scrollElement===window?window.innerHeight:this._scrollElement.getBoundingClientRect().height},e._process=function(){var e=this._getScrollTop()+this._config.offset,t=this._getScrollHeight(),n=this._config.offset+t-this._getOffsetHeight();if(this._scrollHeight!==t&&this.refresh(),n<=e){var i=this._targets[this._targets.length-1];this._activeTarget!==i&&this._activate(i)}else{if(this._activeTarget&&e<this._offsets[0]&&0<this._offsets[0])return this._activeTarget=null,void this._clear();for(var o=this._offsets.length;o--;){this._activeTarget!==this._targets[o]&&e>=this._offsets[o]&&("undefined"==typeof this._offsets[o+1]||e<this._offsets[o+1])&&this._activate(this._targets[o])}}},e._activate=function(t){this._activeTarget=t,this._clear();var e=this._selector.split(",").map(function(e){return e+'[data-target="'+t+'"],'+e+'[href="'+t+'"]'}),n=p([].slice.call(document.querySelectorAll(e.join(","))));n.hasClass(_i)?(n.closest(Ci).find(Di).addClass(vi),n.addClass(vi)):(n.addClass(vi),n.parents(Ei).prev(bi+", "+Ti).addClass(vi),n.parents(Ei).prev(wi).children(bi).addClass(vi)),p(this._scrollElement).trigger(gi.ACTIVATE,{relatedTarget:t})},e._clear=function(){[].slice.call(document.querySelectorAll(this._selector)).filter(function(e){return e.classList.contains(vi)}).forEach(function(e){return e.classList.remove(vi)})},n._jQueryInterface=function(t){return this.each(function(){var e=p(this).data(ui);if(e||(e=new n(this,"object"==typeof t&&t),p(this).data(ui,e)),"string"==typeof t){if("undefined"==typeof e[t])throw new TypeError('No method named "'+t+'"');e[t]()}})},s(n,null,[{key:"VERSION",get:function(){return"4.4.1"}},{key:"Default",get:function(){return pi}}]),n}();p(window).on(gi.LOAD_DATA_API,function(){for(var e=[].slice.call(document.querySelectorAll(yi)),t=e.length;t--;){var n=p(e[t]);Oi._jQueryInterface.call(n,n.data())}}),p.fn[hi]=Oi._jQueryInterface,p.fn[hi].Constructor=Oi,p.fn[hi].noConflict=function(){return p.fn[hi]=di,Oi._jQueryInterface};var Ni="bs.tab",ki="."+Ni,Li=p.fn.tab,Pi={HIDE:"hide"+ki,HIDDEN:"hidden"+ki,SHOW:"show"+ki,SHOWN:"shown"+ki,CLICK_DATA_API:"click"+ki+".data-api"},xi="dropdown-menu",ji="active",Hi="disabled",Ri="fade",Fi="show",Mi=".dropdown",Wi=".nav, .list-group",Ui=".active",Bi="> li > .active",qi='[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',Ki=".dropdown-toggle",Qi="> .dropdown-menu .active",Vi=function(){function i(e){this._element=e}var e=i.prototype;return e.show=function(){var n=this;if(!(this._element.parentNode&&this._element.parentNode.nodeType===Node.ELEMENT_NODE&&p(this._element).hasClass(ji)||p(this._element).hasClass(Hi))){var e,i,t=p(this._element).closest(Wi)[0],o=m.getSelectorFromElement(this._element);if(t){var r="UL"===t.nodeName||"OL"===t.nodeName?Bi:Ui;i=(i=p.makeArray(p(t).find(r)))[i.length-1]}var s=p.Event(Pi.HIDE,{relatedTarget:this._element}),a=p.Event(Pi.SHOW,{relatedTarget:i});if(i&&p(i).trigger(s),p(this._element).trigger(a),!a.isDefaultPrevented()&&!s.isDefaultPrevented()){o&&(e=document.querySelector(o)),this._activate(this._element,t);var l=function(){var e=p.Event(Pi.HIDDEN,{relatedTarget:n._element}),t=p.Event(Pi.SHOWN,{relatedTarget:i});p(i).trigger(e),p(n._element).trigger(t)};e?this._activate(e,e.parentNode,l):l()}}},e.dispose=function(){p.removeData(this._element,Ni),this._element=null},e._activate=function(e,t,n){function i(){return o._transitionComplete(e,r,n)}var o=this,r=(!t||"UL"!==t.nodeName&&"OL"!==t.nodeName?p(t).children(Ui):p(t).find(Bi))[0],s=n&&r&&p(r).hasClass(Ri);if(r&&s){var a=m.getTransitionDurationFromElement(r);p(r).removeClass(Fi).one(m.TRANSITION_END,i).emulateTransitionEnd(a)}else i()},e._transitionComplete=function(e,t,n){if(t){p(t).removeClass(ji);var i=p(t.parentNode).find(Qi)[0];i&&p(i).removeClass(ji),"tab"===t.getAttribute("role")&&t.setAttribute("aria-selected",!1)}if(p(e).addClass(ji),"tab"===e.getAttribute("role")&&e.setAttribute("aria-selected",!0),m.reflow(e),e.classList.contains(Ri)&&e.classList.add(Fi),e.parentNode&&p(e.parentNode).hasClass(xi)){var o=p(e).closest(Mi)[0];if(o){var r=[].slice.call(o.querySelectorAll(Ki));p(r).addClass(ji)}e.setAttribute("aria-expanded",!0)}n&&n()},i._jQueryInterface=function(n){return this.each(function(){var e=p(this),t=e.data(Ni);if(t||(t=new i(this),e.data(Ni,t)),"string"==typeof n){if("undefined"==typeof t[n])throw new TypeError('No method named "'+n+'"');t[n]()}})},s(i,null,[{key:"VERSION",get:function(){return"4.4.1"}}]),i}();p(document).on(Pi.CLICK_DATA_API,qi,function(e){e.preventDefault(),Vi._jQueryInterface.call(p(this),"show")}),p.fn.tab=Vi._jQueryInterface,p.fn.tab.Constructor=Vi,p.fn.tab.noConflict=function(){return p.fn.tab=Li,Vi._jQueryInterface};var Yi="toast",zi="bs.toast",Xi="."+zi,Gi=p.fn[Yi],$i={CLICK_DISMISS:"click.dismiss"+Xi,HIDE:"hide"+Xi,HIDDEN:"hidden"+Xi,SHOW:"show"+Xi,SHOWN:"shown"+Xi},Ji="fade",Zi="hide",eo="show",to="showing",no={animation:"boolean",autohide:"boolean",delay:"number"},io={animation:!0,autohide:!0,delay:500},oo='[data-dismiss="toast"]',ro=function(){function i(e,t){this._element=e,this._config=this._getConfig(t),this._timeout=null,this._setListeners()}var e=i.prototype;return e.show=function(){var e=this,t=p.Event($i.SHOW);if(p(this._element).trigger(t),!t.isDefaultPrevented()){this._config.animation&&this._element.classList.add(Ji);var n=function(){e._element.classList.remove(to),e._element.classList.add(eo),p(e._element).trigger($i.SHOWN),e._config.autohide&&(e._timeout=setTimeout(function(){e.hide()},e._config.delay))};if(this._element.classList.remove(Zi),m.reflow(this._element),this._element.classList.add(to),this._config.animation){var i=m.getTransitionDurationFromElement(this._element);p(this._element).one(m.TRANSITION_END,n).emulateTransitionEnd(i)}else n()}},e.hide=function(){if(this._element.classList.contains(eo)){var e=p.Event($i.HIDE);p(this._element).trigger(e),e.isDefaultPrevented()||this._close()}},e.dispose=function(){clearTimeout(this._timeout),this._timeout=null,this._element.classList.contains(eo)&&this._element.classList.remove(eo),p(this._element).off($i.CLICK_DISMISS),p.removeData(this._element,zi),this._element=null,this._config=null},e._getConfig=function(e){return e=l({},io,{},p(this._element).data(),{},"object"==typeof e&&e?e:{}),m.typeCheckConfig(Yi,e,this.constructor.DefaultType),e},e._setListeners=function(){var e=this;p(this._element).on($i.CLICK_DISMISS,oo,function(){return e.hide()})},e._close=function(){function e(){t._element.classList.add(Zi),p(t._element).trigger($i.HIDDEN)}var t=this;if(this._element.classList.remove(eo),this._config.animation){var n=m.getTransitionDurationFromElement(this._element);p(this._element).one(m.TRANSITION_END,e).emulateTransitionEnd(n)}else e()},i._jQueryInterface=function(n){return this.each(function(){var e=p(this),t=e.data(zi);if(t||(t=new i(this,"object"==typeof n&&n),e.data(zi,t)),"string"==typeof n){if("undefined"==typeof t[n])throw new TypeError('No method named "'+n+'"');t[n](this)}})},s(i,null,[{key:"VERSION",get:function(){return"4.4.1"}},{key:"DefaultType",get:function(){return no}},{key:"Default",get:function(){return io}}]),i}();p.fn[Yi]=ro._jQueryInterface,p.fn[Yi].Constructor=ro,p.fn[Yi].noConflict=function(){return p.fn[Yi]=Gi,ro._jQueryInterface},e.Alert=_,e.Button=x,e.Carousel=he,e.Collapse=De,e.Dropdown=en,e.Modal=wn,e.Popover=ci,e.Scrollspy=Oi,e.Tab=Vi,e.Toast=ro,e.Tooltip=Xn,e.Util=m,Object.defineProperty(e,"__esModule",{value:!0})});
//# sourceMappingURL=bootstrap.bundle.min.js.map
;/*!
 * AdminLTE v3.0.2 (https://adminlte.io)
 * Copyright 2014-2020 Colorlib <http://colorlib.com>
 * Licensed under MIT (https://github.com/ColorlibHQ/AdminLTE/blob/master/LICENSE)
 */
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e((t=t||self).adminlte={})}(this,(function(t){"use strict";var e=function(t){var e="ControlSidebar",i="lte.controlsidebar",n=t.fn[e],s={COLLAPSED:"collapsed.lte.controlsidebar",EXPANDED:"expanded.lte.controlsidebar"},o=".control-sidebar",a=".control-sidebar-content",r='[data-widget="control-sidebar"]',l=".main-header",d=".main-footer",c="control-sidebar-animate",h="control-sidebar-open",f="control-sidebar-slide-open",u="layout-fixed",g="layout-navbar-fixed",p="layout-sm-navbar-fixed",_="layout-md-navbar-fixed",m="layout-lg-navbar-fixed",C="layout-xl-navbar-fixed",v="layout-footer-fixed",y="layout-sm-footer-fixed",b="layout-md-footer-fixed",D="layout-lg-footer-fixed",E="layout-xl-footer-fixed",w={controlsidebarSlide:!0,scrollbarTheme:"os-theme-light",scrollbarAutoHide:"l"},A=function(){function e(t,e){this._element=t,this._config=e,this._init()}var n=e.prototype;return n.collapse=function(){this._config.controlsidebarSlide?(t("html").addClass(c),t("body").removeClass(f).delay(300).queue((function(){t(o).hide(),t("html").removeClass(c),t(this).dequeue()}))):t("body").removeClass(h);var e=t.Event(s.COLLAPSED);t(this._element).trigger(e)},n.show=function(){this._config.controlsidebarSlide?(t("html").addClass(c),t(o).show().delay(10).queue((function(){t("body").addClass(f).delay(300).queue((function(){t("html").removeClass(c),t(this).dequeue()})),t(this).dequeue()}))):t("body").addClass(h);var e=t.Event(s.EXPANDED);t(this._element).trigger(e)},n.toggle=function(){t("body").hasClass(h)||t("body").hasClass(f)?this.collapse():this.show()},n._init=function(){var e=this;this._fixHeight(),this._fixScrollHeight(),t(window).resize((function(){e._fixHeight(),e._fixScrollHeight()})),t(window).scroll((function(){(t("body").hasClass(h)||t("body").hasClass(f))&&e._fixScrollHeight()}))},n._fixScrollHeight=function(){var e={scroll:t(document).height(),window:t(window).height(),header:t(l).outerHeight(),footer:t(d).outerHeight()},i=Math.abs(e.window+t(window).scrollTop()-e.scroll),n=t(window).scrollTop(),s=!1,r=!1;t("body").hasClass(u)&&((t("body").hasClass(g)||t("body").hasClass(p)||t("body").hasClass(_)||t("body").hasClass(m)||t("body").hasClass(C))&&"fixed"===t(l).css("position")&&(s=!0),(t("body").hasClass(v)||t("body").hasClass(y)||t("body").hasClass(b)||t("body").hasClass(D)||t("body").hasClass(E))&&"fixed"===t(d).css("position")&&(r=!0),0===n&&0===i?(t(o).css("bottom",e.footer),t(o).css("top",e.header),t(o+", "+o+" "+a).css("height",e.window-(e.header+e.footer))):i<=e.footer?!1===r?(t(o).css("bottom",e.footer-i),t(o+", "+o+" "+a).css("height",e.window-(e.footer-i))):t(o).css("bottom",e.footer):n<=e.header?!1===s?(t(o).css("top",e.header-n),t(o+", "+o+" "+a).css("height",e.window-(e.header-n))):t(o).css("top",e.header):!1===s?(t(o).css("top",0),t(o+", "+o+" "+a).css("height",e.window)):t(o).css("top",e.header))},n._fixHeight=function(){var e=t(window).height(),i=t(l).outerHeight(),n=t(d).outerHeight();if(t("body").hasClass(u)){var s=e-i;(t("body").hasClass(v)||t("body").hasClass(y)||t("body").hasClass(b)||t("body").hasClass(D)||t("body").hasClass(E))&&"fixed"===t(d).css("position")&&(s=e-i-n),t(o+" "+a).css("height",s),"undefined"!=typeof t.fn.overlayScrollbars&&t(o+" "+a).overlayScrollbars({className:this._config.scrollbarTheme,sizeAutoCapable:!0,scrollbars:{autoHide:this._config.scrollbarAutoHide,clickScrolling:!0}})}},e._jQueryInterface=function(n){return this.each((function(){var s=t(this).data(i),o=t.extend({},w,t(this).data());if(s||(s=new e(this,o),t(this).data(i,s)),"undefined"===s[n])throw new Error(n+" is not a function");s[n]()}))},e}();return t(document).on("click",r,(function(e){e.preventDefault(),A._jQueryInterface.call(t(this),"toggle")})),t.fn[e]=A._jQueryInterface,t.fn[e].Constructor=A,t.fn[e].noConflict=function(){return t.fn[e]=n,A._jQueryInterface},A}(jQuery),i=function(t){var e="Layout",i=t.fn[e],n=".main-header",s=".main-sidebar",o=".main-sidebar .sidebar",a=".content-wrapper",r=".control-sidebar-content",l='[data-widget="control-sidebar"]',d=".main-footer",c='[data-widget="pushmenu"]',h=".login-box",f=".register-box",u="sidebar-focused",g="layout-fixed",p="login-page",_="register-page",m="control-sidebar-slide-open",C="control-sidebar-open",v={scrollbarTheme:"os-theme-light",scrollbarAutoHide:"l"},y=function(){function e(t,e){this._config=e,this._element=t,this._init()}var i=e.prototype;return i.fixLayoutHeight=function(e){void 0===e&&(e=null);var i=0;(t("body").hasClass(m)||t("body").hasClass(C)||"control_sidebar"==e)&&(i=t(r).height());var s={window:t(window).height(),header:0!==t(n).length?t(n).outerHeight():0,footer:0!==t(d).length?t(d).outerHeight():0,sidebar:0!==t(o).length?t(o).height():0,control_sidebar:i},l=this._max(s);l==s.control_sidebar?t(a).css("min-height",l):l==s.window?t(a).css("min-height",l-s.header-s.footer):t(a).css("min-height",l-s.header),t("body").hasClass(g)&&(t(a).css("min-height",l-s.header-s.footer),"undefined"!=typeof t.fn.overlayScrollbars&&t(o).overlayScrollbars({className:this._config.scrollbarTheme,sizeAutoCapable:!0,scrollbars:{autoHide:this._config.scrollbarAutoHide,clickScrolling:!0}}))},i._init=function(){var e=this;if(this.fixLayoutHeight(),t(o).on("collapsed.lte.treeview expanded.lte.treeview",(function(){e.fixLayoutHeight()})),t(c).on("collapsed.lte.pushmenu shown.lte.pushmenu",(function(){e.fixLayoutHeight()})),t(l).on("collapsed.lte.controlsidebar",(function(){e.fixLayoutHeight()})).on("expanded.lte.controlsidebar",(function(){e.fixLayoutHeight("control_sidebar")})),t(window).resize((function(){e.fixLayoutHeight()})),t("body").hasClass(p)||t("body").hasClass(_)){if(t("body").hasClass(p)||t("body").hasClass(_)){var i=t(h+", "+f).height();t("body").css("min-height",i)}}else t("body, html").css("height","auto");t("body.hold-transition").removeClass("hold-transition")},i._max=function(t){var e=0;return Object.keys(t).forEach((function(i){t[i]>e&&(e=t[i])})),e},e._jQueryInterface=function(i){return void 0===i&&(i=""),this.each((function(){var n=t(this).data("lte.layout"),s=t.extend({},v,t(this).data());n||(n=new e(t(this),s),t(this).data("lte.layout",n)),"init"!==i&&""!==i||n._init()}))},e}();return t(window).on("load",(function(){y._jQueryInterface.call(t("body"))})),t(o+" a").on("focusin",(function(){t(s).addClass(u)})),t(o+" a").on("focusout",(function(){t(s).removeClass(u)})),t.fn[e]=y._jQueryInterface,t.fn[e].Constructor=y,t.fn[e].noConflict=function(){return t.fn[e]=i,y._jQueryInterface},y}(jQuery),n=function(t){var e="PushMenu",i=".lte.pushmenu",n=t.fn[e],s={COLLAPSED:"collapsed"+i,SHOWN:"shown"+i},o={autoCollapseSize:992,enableRemember:!1,noTransitionAfterReload:!0},a={TOGGLE_BUTTON:'[data-widget="pushmenu"]',SIDEBAR_MINI:".sidebar-mini",SIDEBAR_COLLAPSED:".sidebar-collapse",BODY:"body",OVERLAY:"#sidebar-overlay",WRAPPER:".wrapper"},r="sidebar-collapse",l="sidebar-open",d=function(){function e(e,i){this._element=e,this._options=t.extend({},o,i),t(a.OVERLAY).length||this._addOverlay(),this._init()}var n=e.prototype;return n.expand=function(){this._options.autoCollapseSize&&t(window).width()<=this._options.autoCollapseSize&&t(a.BODY).addClass(l),t(a.BODY).removeClass(r),this._options.enableRemember&&localStorage.setItem("remember"+i,l);var e=t.Event(s.SHOWN);t(this._element).trigger(e)},n.collapse=function(){this._options.autoCollapseSize&&t(window).width()<=this._options.autoCollapseSize&&t(a.BODY).removeClass(l),t(a.BODY).addClass(r),this._options.enableRemember&&localStorage.setItem("remember"+i,r);var e=t.Event(s.COLLAPSED);t(this._element).trigger(e)},n.toggle=function(){t(a.BODY).hasClass(r)?this.expand():this.collapse()},n.autoCollapse=function(e){void 0===e&&(e=!1),this._options.autoCollapseSize&&(t(window).width()<=this._options.autoCollapseSize?t(a.BODY).hasClass(l)||this.collapse():1==e&&t(a.BODY).hasClass(l)&&t(a.BODY).removeClass(l))},n.remember=function(){this._options.enableRemember&&(localStorage.getItem("remember"+i)==r?this._options.noTransitionAfterReload?t("body").addClass("hold-transition").addClass(r).delay(50).queue((function(){t(this).removeClass("hold-transition"),t(this).dequeue()})):t("body").addClass(r):this._options.noTransitionAfterReload?t("body").addClass("hold-transition").removeClass(r).delay(50).queue((function(){t(this).removeClass("hold-transition"),t(this).dequeue()})):t("body").removeClass(r))},n._init=function(){var e=this;this.remember(),this.autoCollapse(),t(window).resize((function(){e.autoCollapse(!0)}))},n._addOverlay=function(){var e=this,i=t("<div />",{id:"sidebar-overlay"});i.on("click",(function(){e.collapse()})),t(a.WRAPPER).append(i)},e._jQueryInterface=function(i){return this.each((function(){var n=t(this).data("lte.pushmenu"),s=t.extend({},o,t(this).data());n||(n=new e(this,s),t(this).data("lte.pushmenu",n)),"string"==typeof i&&i.match(/collapse|expand|toggle/)&&n[i]()}))},e}();return t(document).on("click",a.TOGGLE_BUTTON,(function(e){e.preventDefault();var i=e.currentTarget;"pushmenu"!==t(i).data("widget")&&(i=t(i).closest(a.TOGGLE_BUTTON)),d._jQueryInterface.call(t(i),"toggle")})),t(window).on("load",(function(){d._jQueryInterface.call(t(a.TOGGLE_BUTTON))})),t.fn[e]=d._jQueryInterface,t.fn[e].Constructor=d,t.fn[e].noConflict=function(){return t.fn[e]=n,d._jQueryInterface},d}(jQuery),s=function(t){var e="Treeview",i=t.fn[e],n={SELECTED:"selected.lte.treeview",EXPANDED:"expanded.lte.treeview",COLLAPSED:"collapsed.lte.treeview",LOAD_DATA_API:"load.lte.treeview"},s=".nav-item",o=".nav-treeview",a=".menu-open",r='[data-widget="treeview"]',l="menu-open",d="sidebar-collapse",c={trigger:r+" "+".nav-link",animationSpeed:300,accordion:!0,expandSidebar:!1,sidebarButtonSelector:'[data-widget="pushmenu"]'},h=function(){function e(t,e){this._config=e,this._element=t}var i=e.prototype;return i.init=function(){this._setupListeners()},i.expand=function(e,i){var s=this,r=t.Event(n.EXPANDED);if(this._config.accordion){var d=i.siblings(a).first(),c=d.find(o).first();this.collapse(c,d)}e.stop().slideDown(this._config.animationSpeed,(function(){i.addClass(l),t(s._element).trigger(r)})),this._config.expandSidebar&&this._expandSidebar()},i.collapse=function(e,i){var s=this,r=t.Event(n.COLLAPSED);e.stop().slideUp(this._config.animationSpeed,(function(){i.removeClass(l),t(s._element).trigger(r),e.find(a+" > "+o).slideUp(),e.find(a).removeClass(l)}))},i.toggle=function(e){var i=t(e.currentTarget),n=i.parent(),a=n.find("> "+o);if(a.is(o)||(n.is(s)||(a=n.parent().find("> "+o)),a.is(o))){e.preventDefault();var r=i.parents(s).first();r.hasClass(l)?this.collapse(t(a),r):this.expand(t(a),r)}},i._setupListeners=function(){var e=this;t(document).on("click",this._config.trigger,(function(t){e.toggle(t)}))},i._expandSidebar=function(){t("body").hasClass(d)&&t(this._config.sidebarButtonSelector).PushMenu("expand")},e._jQueryInterface=function(i){return this.each((function(){var n=t(this).data("lte.treeview"),s=t.extend({},c,t(this).data());n||(n=new e(t(this),s),t(this).data("lte.treeview",n)),"init"===i&&n[i]()}))},e}();return t(window).on(n.LOAD_DATA_API,(function(){t(r).each((function(){h._jQueryInterface.call(t(this),"init")}))})),t.fn[e]=h._jQueryInterface,t.fn[e].Constructor=h,t.fn[e].noConflict=function(){return t.fn[e]=i,h._jQueryInterface},h}(jQuery),o=function(t){var e="DirectChat",i=t.fn[e],n="toggled{EVENT_KEY}",s='[data-widget="chat-pane-toggle"]',o=".direct-chat",a="direct-chat-contacts-open",r=function(){function e(t,e){this._element=t}return e.prototype.toggle=function(){t(this._element).parents(o).first().toggleClass(a);var e=t.Event(n);t(this._element).trigger(e)},e._jQueryInterface=function(i){return this.each((function(){var n=t(this).data("lte.directchat");n||(n=new e(t(this)),t(this).data("lte.directchat",n)),n[i]()}))},e}();return t(document).on("click",s,(function(e){e&&e.preventDefault(),r._jQueryInterface.call(t(this),"toggle")})),t.fn[e]=r._jQueryInterface,t.fn[e].Constructor=r,t.fn[e].noConflict=function(){return t.fn[e]=i,r._jQueryInterface},r}(jQuery),a=function(t){var e="TodoList",i=t.fn[e],n='[data-widget="todo-list"]',s="done",o={onCheck:function(t){return t},onUnCheck:function(t){return t}},a=function(){function e(t,e){this._config=e,this._element=t,this._init()}var i=e.prototype;return i.toggle=function(e){e.parents("li").toggleClass(s),t(e).prop("checked")?this.check(e):this.unCheck(t(e))},i.check=function(t){this._config.onCheck.call(t)},i.unCheck=function(t){this._config.onUnCheck.call(t)},i._init=function(){var e=this;t(n).find("input:checkbox:checked").parents("li").toggleClass(s),t(n).on("change","input:checkbox",(function(i){e.toggle(t(i.target))}))},e._jQueryInterface=function(i){return this.each((function(){var n=t(this).data("lte.todolist"),s=t.extend({},o,t(this).data());n||(n=new e(t(this),s),t(this).data("lte.todolist",n)),"init"===i&&n[i]()}))},e}();return t(window).on("load",(function(){a._jQueryInterface.call(t(n))})),t.fn[e]=a._jQueryInterface,t.fn[e].Constructor=a,t.fn[e].noConflict=function(){return t.fn[e]=i,a._jQueryInterface},a}(jQuery),r=function(t){var e="CardWidget",i=".lte.cardwidget",n=t.fn[e],s={EXPANDED:"expanded"+i,COLLAPSED:"collapsed"+i,MAXIMIZED:"maximized"+i,MINIMIZED:"minimized"+i,REMOVED:"removed"+i},o={CARD:"card",COLLAPSED:"collapsed-card",WAS_COLLAPSED:"was-collapsed",MAXIMIZED:"maximized-card"},a={DATA_REMOVE:'[data-card-widget="remove"]',DATA_COLLAPSE:'[data-card-widget="collapse"]',DATA_MAXIMIZE:'[data-card-widget="maximize"]',CARD:"."+o.CARD,CARD_HEADER:".card-header",CARD_BODY:".card-body",CARD_FOOTER:".card-footer",COLLAPSED:"."+o.COLLAPSED},r={animationSpeed:"normal",collapseTrigger:a.DATA_COLLAPSE,removeTrigger:a.DATA_REMOVE,maximizeTrigger:a.DATA_MAXIMIZE,collapseIcon:"fa-minus",expandIcon:"fa-plus",maximizeIcon:"fa-expand",minimizeIcon:"fa-compress"},l=function(){function e(e,i){this._element=e,this._parent=e.parents(a.CARD).first(),e.hasClass(o.CARD)&&(this._parent=e),this._settings=t.extend({},r,i)}var i=e.prototype;return i.collapse=function(){var e=this;this._parent.children(a.CARD_BODY+", "+a.CARD_FOOTER).slideUp(this._settings.animationSpeed,(function(){e._parent.addClass(o.COLLAPSED)})),this._parent.find("> "+a.CARD_HEADER+" "+this._settings.collapseTrigger+" ."+this._settings.collapseIcon).addClass(this._settings.expandIcon).removeClass(this._settings.collapseIcon);var i=t.Event(s.COLLAPSED);this._element.trigger(i,this._parent)},i.expand=function(){var e=this;this._parent.children(a.CARD_BODY+", "+a.CARD_FOOTER).slideDown(this._settings.animationSpeed,(function(){e._parent.removeClass(o.COLLAPSED)})),this._parent.find("> "+a.CARD_HEADER+" "+this._settings.collapseTrigger+" ."+this._settings.expandIcon).addClass(this._settings.collapseIcon).removeClass(this._settings.expandIcon);var i=t.Event(s.EXPANDED);this._element.trigger(i,this._parent)},i.remove=function(){this._parent.slideUp();var e=t.Event(s.REMOVED);this._element.trigger(e,this._parent)},i.toggle=function(){this._parent.hasClass(o.COLLAPSED)?this.expand():this.collapse()},i.maximize=function(){this._parent.find(this._settings.maximizeTrigger+" ."+this._settings.maximizeIcon).addClass(this._settings.minimizeIcon).removeClass(this._settings.maximizeIcon),this._parent.css({height:this._parent.height(),width:this._parent.width(),transition:"all .15s"}).delay(150).queue((function(){t(this).addClass(o.MAXIMIZED),t("html").addClass(o.MAXIMIZED),t(this).hasClass(o.COLLAPSED)&&t(this).addClass(o.WAS_COLLAPSED),t(this).dequeue()}));var e=t.Event(s.MAXIMIZED);this._element.trigger(e,this._parent)},i.minimize=function(){this._parent.find(this._settings.maximizeTrigger+" ."+this._settings.minimizeIcon).addClass(this._settings.maximizeIcon).removeClass(this._settings.minimizeIcon),this._parent.css("cssText","height:"+this._parent[0].style.height+" !important;width:"+this._parent[0].style.width+" !important; transition: all .15s;").delay(10).queue((function(){t(this).removeClass(o.MAXIMIZED),t("html").removeClass(o.MAXIMIZED),t(this).css({height:"inherit",width:"inherit"}),t(this).hasClass(o.WAS_COLLAPSED)&&t(this).removeClass(o.WAS_COLLAPSED),t(this).dequeue()}));var e=t.Event(s.MINIMIZED);this._element.trigger(e,this._parent)},i.toggleMaximize=function(){this._parent.hasClass(o.MAXIMIZED)?this.minimize():this.maximize()},i._init=function(e){var i=this;this._parent=e,t(this).find(this._settings.collapseTrigger).click((function(){i.toggle()})),t(this).find(this._settings.maximizeTrigger).click((function(){i.toggleMaximize()})),t(this).find(this._settings.removeTrigger).click((function(){i.remove()}))},e._jQueryInterface=function(i){var n=t(this).data("lte.cardwidget"),s=t.extend({},r,t(this).data());n||(n=new e(t(this),s),t(this).data("lte.cardwidget","string"==typeof i?n:i)),"string"==typeof i&&i.match(/collapse|expand|remove|toggle|maximize|minimize|toggleMaximize/)?n[i]():"object"==typeof i&&n._init(t(this))},e}();return t(document).on("click",a.DATA_COLLAPSE,(function(e){e&&e.preventDefault(),l._jQueryInterface.call(t(this),"toggle")})),t(document).on("click",a.DATA_REMOVE,(function(e){e&&e.preventDefault(),l._jQueryInterface.call(t(this),"remove")})),t(document).on("click",a.DATA_MAXIMIZE,(function(e){e&&e.preventDefault(),l._jQueryInterface.call(t(this),"toggleMaximize")})),t.fn[e]=l._jQueryInterface,t.fn[e].Constructor=l,t.fn[e].noConflict=function(){return t.fn[e]=n,l._jQueryInterface},l}(jQuery),l=function(t){var e="CardRefresh",i=t.fn[e],n={LOADED:"loaded.lte.cardrefresh",OVERLAY_ADDED:"overlay.added.lte.cardrefresh",OVERLAY_REMOVED:"overlay.removed.lte.cardrefresh"},s={CARD:"card"},o={CARD:"."+s.CARD,DATA_REFRESH:'[data-card-widget="card-refresh"]'},a={source:"",sourceSelector:"",params:{},trigger:o.DATA_REFRESH,content:".card-body",loadInContent:!0,loadOnInit:!0,responseType:"",overlayTemplate:'<div class="overlay"><i class="fas fa-2x fa-sync-alt fa-spin"></i></div>',onLoadStart:function(){},onLoadDone:function(t){return t}},r=function(){function e(e,i){if(this._element=e,this._parent=e.parents(o.CARD).first(),this._settings=t.extend({},a,i),this._overlay=t(this._settings.overlayTemplate),e.hasClass(s.CARD)&&(this._parent=e),""===this._settings.source)throw new Error("Source url was not defined. Please specify a url in your CardRefresh source option.");this._init(),this._settings.loadOnInit&&this.load()}var i=e.prototype;return i.load=function(){this._addOverlay(),this._settings.onLoadStart.call(t(this)),t.get(this._settings.source,this._settings.params,function(e){this._settings.loadInContent&&(""!=this._settings.sourceSelector&&(e=t(e).find(this._settings.sourceSelector).html()),this._parent.find(this._settings.content).html(e)),this._settings.onLoadDone.call(t(this),e),this._removeOverlay()}.bind(this),""!==this._settings.responseType&&this._settings.responseType);var e=t.Event(n.LOADED);t(this._element).trigger(e)},i._addOverlay=function(){this._parent.append(this._overlay);var e=t.Event(n.OVERLAY_ADDED);t(this._element).trigger(e)},i._removeOverlay=function(){this._parent.find(this._overlay).remove();var e=t.Event(n.OVERLAY_REMOVED);t(this._element).trigger(e)},i._init=function(e){var i=this;t(this).find(this._settings.trigger).on("click",(function(){i.load()}))},e._jQueryInterface=function(i){var n=t(this).data("lte.cardrefresh"),s=t.extend({},a,t(this).data());n||(n=new e(t(this),s),t(this).data("lte.cardrefresh","string"==typeof i?n:i)),"string"==typeof i&&i.match(/load/)?n[i]():"object"==typeof i&&n._init(t(this))},e}();return t(document).on("click",o.DATA_REFRESH,(function(e){e&&e.preventDefault(),r._jQueryInterface.call(t(this),"load")})),t.fn[e]=r._jQueryInterface,t.fn[e].Constructor=r,t.fn[e].noConflict=function(){return t.fn[e]=i,r._jQueryInterface},r}(jQuery),d=function(t){var e="Dropdown",i=t.fn[e],n="ul.dropdown-menu",s='[data-toggle="dropdown"]',o={},a=function(){function e(t,e){this._config=e,this._element=t}return e.prototype.toggleSubmenu=function(){this._element.siblings().show().toggleClass("show"),this._element.next().hasClass("show")||this._element.parents(".dropdown-menu").first().find(".show").removeClass("show").hide(),this._element.parents("li.nav-item.dropdown.show").on("hidden.bs.dropdown",(function(e){t(".dropdown-submenu .show").removeClass("show").hide()}))},e._jQueryInterface=function(i){return this.each((function(){var n=t(this).data("lte.dropdown"),s=t.extend({},o,t(this).data());n||(n=new e(t(this),s),t(this).data("lte.dropdown",n)),"toggleSubmenu"===i&&n[i]()}))},e}();return t(n+" "+s).on("click",(function(e){e.preventDefault(),e.stopPropagation(),a._jQueryInterface.call(t(this),"toggleSubmenu")})),t.fn[e]=a._jQueryInterface,t.fn[e].Constructor=a,t.fn[e].noConflict=function(){return t.fn[e]=i,a._jQueryInterface},a}(jQuery),c=function(t){var e="Toasts",i=t.fn[e],n={INIT:"init.lte.toasts",CREATED:"created.lte.toasts",REMOVED:"removed.lte.toasts"},s="#toastsContainerTopRight",o="#toastsContainerTopLeft",a="#toastsContainerBottomRight",r="#toastsContainerBottomLeft",l="toasts-top-right",d="toasts-top-left",c="toasts-bottom-right",h="toasts-bottom-left",f="topRight",u="topLeft",g="bottomRight",p="bottomLeft",_={position:f,fixed:!0,autohide:!1,autoremove:!0,delay:1e3,fade:!0,icon:null,image:null,imageAlt:null,imageHeight:"25px",title:null,subtitle:null,close:!0,body:null,class:null},m=function(){function e(e,i){this._config=i,this._prepareContainer();var s=t.Event(n.INIT);t("body").trigger(s)}var i=e.prototype;return i.create=function(){var e=t('<div class="toast" role="alert" aria-live="assertive" aria-atomic="true"/>');e.data("autohide",this._config.autohide),e.data("animation",this._config.fade),this._config.class&&e.addClass(this._config.class),this._config.delay&&500!=this._config.delay&&e.data("delay",this._config.delay);var i=t('<div class="toast-header">');if(null!=this._config.image){var s=t("<img />").addClass("rounded mr-2").attr("src",this._config.image).attr("alt",this._config.imageAlt);null!=this._config.imageHeight&&s.height(this._config.imageHeight).width("auto"),i.append(s)}if(null!=this._config.icon&&i.append(t("<i />").addClass("mr-2").addClass(this._config.icon)),null!=this._config.title&&i.append(t("<strong />").addClass("mr-auto").html(this._config.title)),null!=this._config.subtitle&&i.append(t("<small />").html(this._config.subtitle)),1==this._config.close){var o=t('<button data-dismiss="toast" />').attr("type","button").addClass("ml-2 mb-1 close").attr("aria-label","Close").append('<span aria-hidden="true">&times;</span>');null==this._config.title&&o.toggleClass("ml-2 ml-auto"),i.append(o)}e.append(i),null!=this._config.body&&e.append(t('<div class="toast-body" />').html(this._config.body)),t(this._getContainerId()).prepend(e);var a=t.Event(n.CREATED);t("body").trigger(a),e.toast("show"),this._config.autoremove&&e.on("hidden.bs.toast",(function(){t(this).delay(200).remove();var e=t.Event(n.REMOVED);t("body").trigger(e)}))},i._getContainerId=function(){return this._config.position==f?s:this._config.position==u?o:this._config.position==g?a:this._config.position==p?r:void 0},i._prepareContainer=function(){if(0===t(this._getContainerId()).length){var e=t("<div />").attr("id",this._getContainerId().replace("#",""));this._config.position==f?e.addClass(l):this._config.position==u?e.addClass(d):this._config.position==g?e.addClass(c):this._config.position==p&&e.addClass(h),t("body").append(e)}this._config.fixed?t(this._getContainerId()).addClass("fixed"):t(this._getContainerId()).removeClass("fixed")},e._jQueryInterface=function(i,n){return this.each((function(){var s=t.extend({},_,n),o=new e(t(this),s);"create"===i&&o[i]()}))},e}();return t.fn[e]=m._jQueryInterface,t.fn[e].Constructor=m,t.fn[e].noConflict=function(){return t.fn[e]=i,m._jQueryInterface},m}(jQuery);t.CardRefresh=l,t.CardWidget=r,t.ControlSidebar=e,t.DirectChat=o,t.Dropdown=d,t.Layout=i,t.PushMenu=n,t.Toasts=c,t.TodoList=a,t.Treeview=s,Object.defineProperty(t,"__esModule",{value:!0})}));
//# sourceMappingURL=adminlte.min.js.map
;/*! alertifyjs - v1.13.1 - Mohammad Younes <Mohammad@alertifyjs.com> (http://alertifyjs.com) */
!function(a){"use strict";function b(a,b){a.className+=" "+b}function c(a,b){for(var c=a.className.split(" "),d=b.split(" "),e=0;e<d.length;e+=1){var f=c.indexOf(d[e]);f>-1&&c.splice(f,1)}a.className=c.join(" ")}function d(){return"rtl"===a.getComputedStyle(document.body).direction}function e(){return document.documentElement&&document.documentElement.scrollTop||document.body.scrollTop}function f(){return document.documentElement&&document.documentElement.scrollLeft||document.body.scrollLeft}function g(a){for(;a.lastChild;)a.removeChild(a.lastChild)}function h(a){if(null===a)return a;var b;if(Array.isArray(a)){b=[];for(var c=0;c<a.length;c+=1)b.push(h(a[c]));return b}if(a instanceof Date)return new Date(a.getTime());if(a instanceof RegExp)return b=new RegExp(a.source),b.global=a.global,b.ignoreCase=a.ignoreCase,b.multiline=a.multiline,b.lastIndex=a.lastIndex,b;if("object"==typeof a){b={};for(var d in a)a.hasOwnProperty(d)&&(b[d]=h(a[d]));return b}return a}function i(a,b){if(a.elements){var c=a.elements.root;c.parentNode.removeChild(c),delete a.elements,a.settings=h(a.__settings),a.__init=b,delete a.__internal}}function j(a,b){return function(){if(arguments.length>0){for(var c=[],d=0;d<arguments.length;d+=1)c.push(arguments[d]);return c.push(a),b.apply(a,c)}return b.apply(a,[null,a])}}function k(a,b){return{index:a,button:b,cancel:!1}}function l(a,b){if("function"==typeof b.get(a))return b.get(a).call(b)}function m(){function a(a,b){for(var c in b)b.hasOwnProperty(c)&&(a[c]=b[c]);return a}function b(a){var b=d[a].dialog;return b&&"function"==typeof b.__init&&b.__init(b),b}function c(b,c,e,f){var g={dialog:null,factory:c};return void 0!==f&&(g.factory=function(){return a(new d[f].factory,new c)}),e||(g.dialog=a(new g.factory,w)),d[b]=g}var d={};return{defaults:p,dialog:function(d,e,f,g){if("function"!=typeof e)return b(d);if(this.hasOwnProperty(d))throw new Error("alertify.dialog: name already exists");var h=c(d,e,f,g);this[d]=f?function(){if(0===arguments.length)return h.dialog;var b=a(new h.factory,w);return b&&"function"==typeof b.__init&&b.__init(b),b.main.apply(b,arguments),b.show.apply(b)}:function(){if(h.dialog&&"function"==typeof h.dialog.__init&&h.dialog.__init(h.dialog),0===arguments.length)return h.dialog;var a=h.dialog;return a.main.apply(h.dialog,arguments),a.show.apply(h.dialog)}},closeAll:function(a){for(var b=q.slice(0),c=0;c<b.length;c+=1){var d=b[c];void 0!==a&&a===d||d.close()}},setting:function(a,c,d){if("notifier"===a)return x.setting(c,d);var e=b(a);return e?e.setting(c,d):void 0},set:function(a,b,c){return this.setting(a,b,c)},get:function(a,b){return this.setting(a,b)},notify:function(a,b,c,d){return x.create(b,d).push(a,c)},message:function(a,b,c){return x.create(null,c).push(a,b)},success:function(a,b,c){return x.create("success",c).push(a,b)},error:function(a,b,c){return x.create("error",c).push(a,b)},warning:function(a,b,c){return x.create("warning",c).push(a,b)},dismissAll:function(){x.dismissAll()}}}var n=":not(:disabled):not(.ajs-reset)",o={ENTER:13,ESC:27,F1:112,F12:123,LEFT:37,RIGHT:39,TAB:9},p={autoReset:!0,basic:!1,closable:!0,closableByDimmer:!0,invokeOnCloseOff:!1,frameless:!1,defaultFocusOff:!1,maintainFocus:!0,maximizable:!0,modal:!0,movable:!0,moveBounded:!1,overflow:!0,padding:!0,pinnable:!0,pinned:!0,preventBodyShift:!1,resizable:!0,startMaximized:!1,transition:"pulse",transitionOff:!1,tabbable:["button","[href]","input","select","textarea",'[tabindex]:not([tabindex^="-"])'+n].join(n+","),notifier:{delay:5,position:"bottom-right",closeButton:!1,classes:{base:"alertify-notifier",prefix:"ajs-",message:"ajs-message",top:"ajs-top",right:"ajs-right",bottom:"ajs-bottom",left:"ajs-left",center:"ajs-center",visible:"ajs-visible",hidden:"ajs-hidden",close:"ajs-close"}},glossary:{title:"AlertifyJS",ok:"OK",cancel:"Cancel",acccpt:"Accept",deny:"Deny",confirm:"Confirm",decline:"Decline",close:"Close",maximize:"Maximize",restore:"Restore"},theme:{input:"ajs-input",ok:"ajs-ok",cancel:"ajs-cancel"},hooks:{preinit:function(){},postinit:function(){}}},q=[],r=!1;try{var s=Object.defineProperty({},"passive",{get:function(){r=!0}});a.addEventListener("test",s,s),a.removeEventListener("test",s,s)}catch(z){}var t=function(a,b,c,d,e){a.addEventListener(b,c,r?{capture:d,passive:e}:!0===d)},u=function(a,b,c,d,e){a.removeEventListener(b,c,r?{capture:d,passive:e}:!0===d)},v=function(){var a,b,c=!1,d={animation:"animationend",OAnimation:"oAnimationEnd oanimationend",msAnimation:"MSAnimationEnd",MozAnimation:"animationend",WebkitAnimation:"webkitAnimationEnd"};for(a in d)if(void 0!==document.documentElement.style[a]){b=d[a],c=!0;break}return{type:b,supported:c}}(),w=function(){function m(a){if(!a.__internal){y.defaults.hooks.preinit(a),delete a.__init,a.__settings||(a.__settings=h(a.settings));var c;"function"==typeof a.setup?(c=a.setup(),c.options=c.options||{},c.focus=c.focus||{}):c={buttons:[],focus:{element:null,select:!1},options:{}},"object"!=typeof a.hooks&&(a.hooks={});var d=[];if(Array.isArray(c.buttons))for(var e=0;e<c.buttons.length;e+=1){var f=c.buttons[e],g={};for(var i in f)f.hasOwnProperty(i)&&(g[i]=f[i]);d.push(g)}var k=a.__internal={isOpen:!1,activeElement:document.body,timerIn:void 0,timerOut:void 0,buttons:d,focus:c.focus,options:{title:void 0,modal:void 0,basic:void 0,frameless:void 0,defaultFocusOff:void 0,pinned:void 0,movable:void 0,moveBounded:void 0,resizable:void 0,autoReset:void 0,closable:void 0,closableByDimmer:void 0,invokeOnCloseOff:void 0,maximizable:void 0,startMaximized:void 0,pinnable:void 0,transition:void 0,transitionOff:void 0,padding:void 0,overflow:void 0,onshow:void 0,onclosing:void 0,onclose:void 0,onfocus:void 0,onmove:void 0,onmoved:void 0,onresize:void 0,onresized:void 0,onmaximize:void 0,onmaximized:void 0,onrestore:void 0,onrestored:void 0},resetHandler:void 0,beginMoveHandler:void 0,beginResizeHandler:void 0,bringToFrontHandler:void 0,modalClickHandler:void 0,buttonsClickHandler:void 0,commandsClickHandler:void 0,transitionInHandler:void 0,transitionOutHandler:void 0,destroy:void 0},l={};l.root=document.createElement("div"),l.root.style.display="none",l.root.className=Ha.base+" "+Ha.hidden+" ",l.root.innerHTML=Ga.dimmer+Ga.modal,l.dimmer=l.root.firstChild,l.modal=l.root.lastChild,l.modal.innerHTML=Ga.dialog,l.dialog=l.modal.firstChild,l.dialog.innerHTML=Ga.reset+Ga.commands+Ga.header+Ga.body+Ga.footer+Ga.resizeHandle+Ga.reset,l.reset=[],l.reset.push(l.dialog.firstChild),l.reset.push(l.dialog.lastChild),l.commands={},l.commands.container=l.reset[0].nextSibling,l.commands.pin=l.commands.container.firstChild,l.commands.maximize=l.commands.pin.nextSibling,l.commands.close=l.commands.maximize.nextSibling,l.header=l.commands.container.nextSibling,l.body=l.header.nextSibling,l.body.innerHTML=Ga.content,l.content=l.body.firstChild,l.footer=l.body.nextSibling,l.footer.innerHTML=Ga.buttons.auxiliary+Ga.buttons.primary,l.resizeHandle=l.footer.nextSibling,l.buttons={},l.buttons.auxiliary=l.footer.firstChild,l.buttons.primary=l.buttons.auxiliary.nextSibling,l.buttons.primary.innerHTML=Ga.button,l.buttonTemplate=l.buttons.primary.firstChild,l.buttons.primary.removeChild(l.buttonTemplate);for(var m=0;m<a.__internal.buttons.length;m+=1){var n=a.__internal.buttons[m];Ca.indexOf(n.key)<0&&Ca.push(n.key),n.element=l.buttonTemplate.cloneNode(),n.element.innerHTML=n.text,"string"==typeof n.className&&""!==n.className&&b(n.element,n.className);for(var o in n.attrs)"className"!==o&&n.attrs.hasOwnProperty(o)&&n.element.setAttribute(o,n.attrs[o]);"auxiliary"===n.scope?l.buttons.auxiliary.appendChild(n.element):l.buttons.primary.appendChild(n.element)}a.elements=l,k.resetHandler=j(a,Z),k.beginMoveHandler=j(a,ea),k.beginResizeHandler=j(a,ka),k.bringToFrontHandler=j(a,D),k.modalClickHandler=j(a,T),k.buttonsClickHandler=j(a,V),k.commandsClickHandler=j(a,H),k.transitionInHandler=j(a,aa),k.transitionOutHandler=j(a,ba);for(var p in k.options)void 0!==c.options[p]?a.set(p,c.options[p]):y.defaults.hasOwnProperty(p)?a.set(p,y.defaults[p]):"title"===p&&a.set(p,y.defaults.glossary[p]);"function"==typeof a.build&&a.build(),y.defaults.hooks.postinit(a)}document.body.appendChild(a.elements.root)}function n(){Aa=f(),Ba=e()}function r(){a.scrollTo(Aa,Ba)}function s(){for(var a=0,d=0;d<q.length;d+=1){var e=q[d];(e.isModal()||e.isMaximized())&&(a+=1)}0===a&&document.body.className.indexOf(Ha.noOverflow)>=0?(c(document.body,Ha.noOverflow),w(!1)):a>0&&document.body.className.indexOf(Ha.noOverflow)<0&&(w(!0),b(document.body,Ha.noOverflow))}function w(d){y.defaults.preventBodyShift&&(d&&document.documentElement.scrollHeight>document.documentElement.clientHeight?(Ja=Ba,Ia=a.getComputedStyle(document.body).top,b(document.body,Ha.fixed),document.body.style.top=-Ba+"px"):d||(Ba=Ja,document.body.style.top=Ia,c(document.body,Ha.fixed),r()))}function x(a,d,e){"string"==typeof e&&c(a.elements.root,Ha.prefix+e),b(a.elements.root,Ha.prefix+d),Da=a.elements.root.offsetWidth}function z(a){a.get("transitionOff")?b(a.elements.root,Ha.noTransition):c(a.elements.root,Ha.noTransition)}function A(a){a.get("modal")?(c(a.elements.root,Ha.modeless),a.isOpen()&&(ta(a),P(a),s())):(b(a.elements.root,Ha.modeless),a.isOpen()&&(sa(a),P(a),s()))}function B(a){a.get("basic")?b(a.elements.root,Ha.basic):c(a.elements.root,Ha.basic)}function C(a){a.get("frameless")?b(a.elements.root,Ha.frameless):c(a.elements.root,Ha.frameless)}function D(a,b){for(var c=q.indexOf(b),d=c+1;d<q.length;d+=1)if(q[d].isModal())return;return document.body.lastChild!==b.elements.root&&(document.body.appendChild(b.elements.root),q.splice(q.indexOf(b),1),q.push(b),Y(b)),!1}function E(a,d,e,f){switch(d){case"title":a.setHeader(f);break;case"modal":A(a);break;case"basic":B(a);break;case"frameless":C(a);break;case"pinned":Q(a);break;case"closable":S(a);break;case"maximizable":R(a);break;case"pinnable":M(a);break;case"movable":ia(a);break;case"resizable":oa(a);break;case"padding":f?c(a.elements.root,Ha.noPadding):a.elements.root.className.indexOf(Ha.noPadding)<0&&b(a.elements.root,Ha.noPadding);break;case"overflow":f?c(a.elements.root,Ha.noOverflow):a.elements.root.className.indexOf(Ha.noOverflow)<0&&b(a.elements.root,Ha.noOverflow);break;case"transition":x(a,f,e);break;case"transitionOff":z(a)}"function"==typeof a.hooks.onupdate&&a.hooks.onupdate.call(a,d,e,f)}function F(a,b,c,d,e){var f={op:void 0,items:[]};if(void 0===e&&"string"==typeof d)f.op="get",b.hasOwnProperty(d)?(f.found=!0,f.value=b[d]):(f.found=!1,f.value=void 0);else{var g;if(f.op="set","object"==typeof d){var h=d;for(var i in h)b.hasOwnProperty(i)?(b[i]!==h[i]&&(g=b[i],b[i]=h[i],c.call(a,i,g,h[i])),f.items.push({key:i,value:h[i],found:!0})):f.items.push({key:i,value:h[i],found:!1})}else{if("string"!=typeof d)throw new Error("args must be a string or object");b.hasOwnProperty(d)?(b[d]!==e&&(g=b[d],b[d]=e,c.call(a,d,g,e)),f.items.push({key:d,value:e,found:!0})):f.items.push({key:d,value:e,found:!1})}}return f}function G(a){var b;U(a,function(c){return b=!0!==a.get("invokeOnCloseOff")&&!0===c.invokeOnClose}),!b&&a.isOpen()&&a.close()}function H(a,b){switch(a.srcElement||a.target){case b.elements.commands.pin:b.isPinned()?J(b):I(b);break;case b.elements.commands.maximize:b.isMaximized()?L(b):K(b);break;case b.elements.commands.close:G(b)}return!1}function I(a){a.set("pinned",!0)}function J(a){a.set("pinned",!1)}function K(a){l("onmaximize",a),b(a.elements.root,Ha.maximized),a.isOpen()&&s(),l("onmaximized",a)}function L(a){l("onrestore",a),c(a.elements.root,Ha.maximized),a.isOpen()&&s(),l("onrestored",a)}function M(a){a.get("pinnable")?b(a.elements.root,Ha.pinnable):c(a.elements.root,Ha.pinnable)}function N(a){var b=f();a.elements.modal.style.marginTop=e()+"px",a.elements.modal.style.marginLeft=b+"px",a.elements.modal.style.marginRight=-b+"px"}function O(a){var b=parseInt(a.elements.modal.style.marginTop,10),c=parseInt(a.elements.modal.style.marginLeft,10);if(a.elements.modal.style.marginTop="",a.elements.modal.style.marginLeft="",a.elements.modal.style.marginRight="",a.isOpen()){var d=0,g=0;""!==a.elements.dialog.style.top&&(d=parseInt(a.elements.dialog.style.top,10)),a.elements.dialog.style.top=d+(b-e())+"px",""!==a.elements.dialog.style.left&&(g=parseInt(a.elements.dialog.style.left,10)),a.elements.dialog.style.left=g+(c-f())+"px"}}function P(a){a.get("modal")||a.get("pinned")?O(a):N(a)}function Q(a){a.get("pinned")?(c(a.elements.root,Ha.unpinned),a.isOpen()&&O(a)):(b(a.elements.root,Ha.unpinned),a.isOpen()&&!a.isModal()&&N(a))}function R(a){a.get("maximizable")?b(a.elements.root,Ha.maximizable):c(a.elements.root,Ha.maximizable)}function S(a){a.get("closable")?(b(a.elements.root,Ha.closable),ya(a)):(c(a.elements.root,Ha.closable),za(a))}function T(a,b){if(a.timeStamp-La>200&&(La=a.timeStamp)&&!Ka){var c=a.srcElement||a.target;!0===b.get("closableByDimmer")&&c===b.elements.modal&&G(b)}Ka=!1}function U(a,b){if(Date.now()-Ma>200&&(Ma=Date.now()))for(var c=0;c<a.__internal.buttons.length;c+=1){var d=a.__internal.buttons[c];if(!d.element.disabled&&b(d)){var e=k(c,d);"function"==typeof a.callback&&a.callback.apply(a,[e]),!1===e.cancel&&a.close();break}}}function V(a,b){var c=a.srcElement||a.target;U(b,function(a){return a.element===c&&(Na=!0)})}function W(a){if(Na)return void(Na=!1);var b=q[q.length-1],c=a.keyCode;return 0===b.__internal.buttons.length&&c===o.ESC&&!0===b.get("closable")?(G(b),!1):Ca.indexOf(c)>-1?(U(b,function(a){return a.key===c}),!1):void 0}function X(a){var b=q[q.length-1],c=a.keyCode;if(c===o.LEFT||c===o.RIGHT){for(var d=b.__internal.buttons,e=0;e<d.length;e+=1)if(document.activeElement===d[e].element)switch(c){case o.LEFT:return void d[(e||d.length)-1].element.focus();case o.RIGHT:return void d[(e+1)%d.length].element.focus()}}else if(c<o.F12+1&&c>o.F1-1&&Ca.indexOf(c)>-1)return a.preventDefault(),a.stopPropagation(),U(b,function(a){return a.key===c}),!1}function Y(a,b){if(b)b.focus();else{var c=a.__internal.focus,d=c.element;switch(typeof c.element){case"number":a.__internal.buttons.length>c.element&&(d=!0===a.get("basic")?a.elements.reset[0]:a.__internal.buttons[c.element].element);break;case"string":d=a.elements.body.querySelector(c.element);break;case"function":d=c.element.call(a)}!0!==a.get("defaultFocusOff")&&(void 0!==d&&null!==d||0!==a.__internal.buttons.length)||(d=a.elements.reset[0]),d&&d.focus&&(d.focus(),c.select&&d.select&&d.select())}}function Z(a,b){if(!b)for(var c=q.length-1;c>-1;c-=1)if(q[c].isModal()){b=q[c];break}if(b&&b.isModal()){var d,e=b.elements.reset[0],f=b.elements.reset[1],g=a.relatedTarget,h=b.elements.root.contains(g),i=a.srcElement||a.target;if(i===e&&!h||i===f&&g===e)return;i===f||i===document.body?d=e:i===e&&g===f?d=$(b):i===e&&h&&(d=$(b,!0)),Y(b,d)}}function $(a,b){var c=[].slice.call(a.elements.dialog.querySelectorAll(p.tabbable));b&&c.reverse();for(var d=0;d<c.length;d+=1){var e=c[d];if(e.offsetParent||e.offsetWidth||e.offsetHeight||e.getClientRects().length)return e}}function _(a){var b=q[q.length-1];b&&a.shiftKey&&a.keyCode===o.TAB&&b.elements.reset[1].focus()}function aa(a,b){clearTimeout(b.__internal.timerIn),Y(b),Na=!1,l("onfocus",b),u(b.elements.dialog,v.type,b.__internal.transitionInHandler),c(b.elements.root,Ha.animationIn)}function ba(a,b){clearTimeout(b.__internal.timerOut),u(b.elements.dialog,v.type,b.__internal.transitionOutHandler),ha(b),na(b),b.isMaximized()&&!b.get("startMaximized")&&L(b),"function"==typeof b.__internal.destroy&&b.__internal.destroy.apply(b)}function ca(a,b){var c=a[Ra]-Pa,d=a[Sa]-Qa;Ua&&(d-=document.body.scrollTop),b.style.left=c+"px",b.style.top=d+"px"}function da(a,b){var c=a[Ra]-Pa,d=a[Sa]-Qa;Ua&&(d-=document.body.scrollTop),b.style.left=Math.min(Ta.maxLeft,Math.max(Ta.minLeft,c))+"px",b.style.top=Ua?Math.min(Ta.maxTop,Math.max(Ta.minTop,d))+"px":Math.max(Ta.minTop,d)+"px"}function ea(a,c){if(null===Wa&&!c.isMaximized()&&c.get("movable")){var d,e=0,f=0;if("touchstart"===a.type?(a.preventDefault(),d=a.targetTouches[0],Ra="clientX",Sa="clientY"):0===a.button&&(d=a),d){var g=c.elements.dialog;if(b(g,Ha.capture),g.style.left&&(e=parseInt(g.style.left,10)),g.style.top&&(f=parseInt(g.style.top,10)),Pa=d[Ra]-e,Qa=d[Sa]-f,c.isModal()?Qa+=c.elements.modal.scrollTop:c.isPinned()&&(Qa-=document.body.scrollTop),c.get("moveBounded")){var h=g,i=-e,j=-f;do{i+=h.offsetLeft,j+=h.offsetTop}while(h=h.offsetParent);Ta={maxLeft:i,minLeft:-i,maxTop:document.documentElement.clientHeight-g.clientHeight-j,minTop:-j},Va=da}else Ta=null,Va=ca;return l("onmove",c),Ua=!c.isModal()&&c.isPinned(),Oa=c,Va(d,g),b(document.body,Ha.noSelection),!1}}}function fa(a){if(Oa){var b;"touchmove"===a.type?(a.preventDefault(),b=a.targetTouches[0]):0===a.button&&(b=a),b&&Va(b,Oa.elements.dialog)}}function ga(){if(Oa){var a=Oa;Oa=Ta=null,c(document.body,Ha.noSelection),c(a.elements.dialog,Ha.capture),l("onmoved",a)}}function ha(a){Oa=null;var b=a.elements.dialog;b.style.left=b.style.top=""}function ia(a){a.get("movable")?(b(a.elements.root,Ha.movable),a.isOpen()&&ua(a)):(ha(a),c(a.elements.root,Ha.movable),a.isOpen()&&va(a))}function ja(a,b,c){var e=b,f=0,g=0;do{f+=e.offsetLeft,g+=e.offsetTop}while(e=e.offsetParent);var h,i;!0===c?(h=a.pageX,i=a.pageY):(h=a.clientX,i=a.clientY);var j=d();if(j&&(h=document.body.offsetWidth-h,isNaN(Xa)||(f=document.body.offsetWidth-f-b.offsetWidth)),b.style.height=i-g+$a+"px",b.style.width=h-f+$a+"px",!isNaN(Xa)){var k=.5*Math.abs(b.offsetWidth-Ya);j&&(k*=-1),b.offsetWidth>Ya?b.style.left=Xa+k+"px":b.offsetWidth>=Za&&(b.style.left=Xa-k+"px")}}function ka(a,c){if(!c.isMaximized()){var d;if("touchstart"===a.type?(a.preventDefault(),d=a.targetTouches[0]):0===a.button&&(d=a),d){l("onresize",c),Wa=c,$a=c.elements.resizeHandle.offsetHeight/2;var e=c.elements.dialog;return b(e,Ha.capture),Xa=parseInt(e.style.left,10),e.style.height=e.offsetHeight+"px",e.style.minHeight=c.elements.header.offsetHeight+c.elements.footer.offsetHeight+"px",e.style.width=(Ya=e.offsetWidth)+"px","none"!==e.style.maxWidth&&(e.style.minWidth=(Za=e.offsetWidth)+"px"),e.style.maxWidth="none",b(document.body,Ha.noSelection),!1}}}function la(a){if(Wa){var b;"touchmove"===a.type?(a.preventDefault(),b=a.targetTouches[0]):0===a.button&&(b=a),b&&ja(b,Wa.elements.dialog,!Wa.get("modal")&&!Wa.get("pinned"))}}function ma(){if(Wa){var a=Wa;Wa=null,c(document.body,Ha.noSelection),c(a.elements.dialog,Ha.capture),Ka=!0,l("onresized",a)}}function na(a){Wa=null;var b=a.elements.dialog;"none"===b.style.maxWidth&&(b.style.maxWidth=b.style.minWidth=b.style.width=b.style.height=b.style.minHeight=b.style.left="",Xa=Number.Nan,Ya=Za=$a=0)}function oa(a){a.get("resizable")?(b(a.elements.root,Ha.resizable),a.isOpen()&&wa(a)):(na(a),c(a.elements.root,Ha.resizable),a.isOpen()&&xa(a))}function pa(){for(var a=0;a<q.length;a+=1){var b=q[a];b.get("autoReset")&&(ha(b),na(b))}}function qa(b){1===q.length&&(t(a,"resize",pa),t(document.body,"keyup",W),t(document.body,"keydown",X),t(document.body,"focus",Z),t(document.documentElement,"mousemove",fa),t(document.documentElement,"touchmove",fa,!1,!1),t(document.documentElement,"mouseup",ga),t(document.documentElement,"touchend",ga),t(document.documentElement,"mousemove",la),t(document.documentElement,"touchmove",la,!1,!1),t(document.documentElement,"mouseup",ma),t(document.documentElement,"touchend",ma)),t(b.elements.commands.container,"click",b.__internal.commandsClickHandler),t(b.elements.footer,"click",b.__internal.buttonsClickHandler),t(b.elements.reset[0],"focusin",b.__internal.resetHandler),t(b.elements.reset[0],"keydown",_),t(b.elements.reset[1],"focusin",b.__internal.resetHandler),Na=!0,t(b.elements.dialog,v.type,b.__internal.transitionInHandler),b.get("modal")||sa(b),b.get("resizable")&&wa(b),b.get("movable")&&ua(b)}function ra(b){1===q.length&&(u(a,"resize",pa),u(document.body,"keyup",W),u(document.body,"keydown",X),u(document.body,"focus",Z),u(document.documentElement,"mousemove",fa),u(document.documentElement,"mouseup",ga),u(document.documentElement,"mousemove",la),u(document.documentElement,"mouseup",ma)),u(b.elements.commands.container,"click",b.__internal.commandsClickHandler),u(b.elements.footer,"click",b.__internal.buttonsClickHandler),u(b.elements.reset[0],"focusin",b.__internal.resetHandler),u(b.elements.reset[0],"keydown",_),u(b.elements.reset[1],"focusin",b.__internal.resetHandler),t(b.elements.dialog,v.type,b.__internal.transitionOutHandler),b.get("modal")||ta(b),b.get("movable")&&va(b),b.get("resizable")&&xa(b)}function sa(a){t(a.elements.dialog,"focus",a.__internal.bringToFrontHandler,!0)}function ta(a){u(a.elements.dialog,"focus",a.__internal.bringToFrontHandler,!0)}function ua(a){t(a.elements.header,"mousedown",a.__internal.beginMoveHandler),t(a.elements.header,"touchstart",a.__internal.beginMoveHandler,!1,!1)}function va(a){u(a.elements.header,"mousedown",a.__internal.beginMoveHandler),u(a.elements.header,"touchstart",a.__internal.beginMoveHandler,!1,!1)}function wa(a){t(a.elements.resizeHandle,"mousedown",a.__internal.beginResizeHandler),t(a.elements.resizeHandle,"touchstart",a.__internal.beginResizeHandler,!1,!1)}function xa(a){u(a.elements.resizeHandle,"mousedown",a.__internal.beginResizeHandler),u(a.elements.resizeHandle,"touchstart",a.__internal.beginResizeHandler,!1,!1)}function ya(a){t(a.elements.modal,"click",a.__internal.modalClickHandler)}function za(a){u(a.elements.modal,"click",a.__internal.modalClickHandler)}var Aa,Ba,Ca=[],Da=null,Ea=!1,Fa=a.navigator.userAgent.indexOf("Safari")>-1&&a.navigator.userAgent.indexOf("Chrome")<0,Ga={dimmer:'<div class="ajs-dimmer"></div>',modal:'<div class="ajs-modal" tabindex="0"></div>',dialog:'<div class="ajs-dialog" tabindex="0"></div>',reset:'<button class="ajs-reset"></button>',commands:'<div class="ajs-commands"><button class="ajs-pin"></button><button class="ajs-maximize"></button><button class="ajs-close"></button></div>',header:'<div class="ajs-header"></div>',body:'<div class="ajs-body"></div>',content:'<div class="ajs-content"></div>',footer:'<div class="ajs-footer"></div>',buttons:{primary:'<div class="ajs-primary ajs-buttons"></div>',auxiliary:'<div class="ajs-auxiliary ajs-buttons"></div>'},button:'<button class="ajs-button"></button>',resizeHandle:'<div class="ajs-handle"></div>'},Ha={animationIn:"ajs-in",animationOut:"ajs-out",base:"alertify",basic:"ajs-basic",capture:"ajs-capture",closable:"ajs-closable",fixed:"ajs-fixed",frameless:"ajs-frameless",hidden:"ajs-hidden",maximize:"ajs-maximize",maximized:"ajs-maximized",maximizable:"ajs-maximizable",modeless:"ajs-modeless",movable:"ajs-movable",noSelection:"ajs-no-selection",noOverflow:"ajs-no-overflow",noPadding:"ajs-no-padding",pin:"ajs-pin",pinnable:"ajs-pinnable",prefix:"ajs-",resizable:"ajs-resizable",restore:"ajs-restore",shake:"ajs-shake",unpinned:"ajs-unpinned",noTransition:"ajs-no-transition"},Ia="",Ja=0,Ka=!1,La=0,Ma=0,Na=!1,Oa=null,Pa=0,Qa=0,Ra="pageX",Sa="pageY",Ta=null,Ua=!1,Va=null,Wa=null,Xa=Number.Nan,Ya=0,Za=0,$a=0;return{__init:m,isOpen:function(){return this.__internal.isOpen},isModal:function(){return this.elements.root.className.indexOf(Ha.modeless)<0},isMaximized:function(){return this.elements.root.className.indexOf(Ha.maximized)>-1},isPinned:function(){return this.elements.root.className.indexOf(Ha.unpinned)<0},maximize:function(){return this.isMaximized()||K(this),this},restore:function(){return this.isMaximized()&&L(this),this},pin:function(){return this.isPinned()||I(this),this},unpin:function(){return this.isPinned()&&J(this),this},bringToFront:function(){return D(null,this),this},moveTo:function(a,b){if(!isNaN(a)&&!isNaN(b)){l("onmove",this);var c=this.elements.dialog,e=c,f=0,g=0;c.style.left&&(f-=parseInt(c.style.left,10)),c.style.top&&(g-=parseInt(c.style.top,10));do{f+=e.offsetLeft,g+=e.offsetTop}while(e=e.offsetParent);var h=a-f,i=b-g;d()&&(h*=-1),c.style.left=h+"px",c.style.top=i+"px",l("onmoved",this)}return this},resizeTo:function(a,b){var c=parseFloat(a),d=parseFloat(b),e=/(\d*\.\d+|\d+)%/;if(!isNaN(c)&&!isNaN(d)&&!0===this.get("resizable")){l("onresize",this),(""+a).match(e)&&(c=c/100*document.documentElement.clientWidth),(""+b).match(e)&&(d=d/100*document.documentElement.clientHeight);var f=this.elements.dialog;"none"!==f.style.maxWidth&&(f.style.minWidth=(Za=f.offsetWidth)+"px"),f.style.maxWidth="none",f.style.minHeight=this.elements.header.offsetHeight+this.elements.footer.offsetHeight+"px",f.style.width=c+"px",f.style.height=d+"px",l("onresized",this)}return this},setting:function(a,b){var c=this,d=F(this,this.__internal.options,function(a,b,d){E(c,a,b,d)},a,b);if("get"===d.op)return d.found?d.value:void 0!==this.settings?F(this,this.settings,this.settingUpdated||function(){},a,b).value:void 0;if("set"===d.op){if(d.items.length>0)for(var e=this.settingUpdated||function(){},f=0;f<d.items.length;f+=1){var g=d.items[f];g.found||void 0===this.settings||F(this,this.settings,e,g.key,g.value)}return this}},set:function(a,b){return this.setting(a,b),this},get:function(a){return this.setting(a)},setHeader:function(b){return"string"==typeof b?(g(this.elements.header),this.elements.header.innerHTML=b):b instanceof a.HTMLElement&&this.elements.header.firstChild!==b&&(g(this.elements.header),this.elements.header.appendChild(b)),this},setContent:function(b){return"string"==typeof b?(g(this.elements.content),this.elements.content.innerHTML=b):b instanceof a.HTMLElement&&this.elements.content.firstChild!==b&&(g(this.elements.content),this.elements.content.appendChild(b)),this},showModal:function(a){return this.show(!0,a)},show:function(a,d){if(m(this),this.__internal.isOpen){ha(this),na(this),b(this.elements.dialog,Ha.shake);var e=this;setTimeout(function(){c(e.elements.dialog,Ha.shake)},200)}else{if(this.__internal.isOpen=!0,q.push(this),y.defaults.maintainFocus&&(this.__internal.activeElement=document.activeElement),document.body.hasAttribute("tabindex")||document.body.setAttribute("tabindex",Ea="0"),"function"==typeof this.prepare&&this.prepare(),qa(this),void 0!==a&&this.set("modal",a),n(),s(),"string"==typeof d&&""!==d&&(this.__internal.className=d,b(this.elements.root,d)),this.get("startMaximized")?this.maximize():this.isMaximized()&&L(this),P(this),this.elements.root.removeAttribute("style"),c(this.elements.root,Ha.animationOut),b(this.elements.root,Ha.animationIn),clearTimeout(this.__internal.timerIn),this.__internal.timerIn=setTimeout(this.__internal.transitionInHandler,v.supported?1e3:100),Fa){var f=this.elements.root;f.style.display="none",setTimeout(function(){f.style.display="block"},0)}Da=this.elements.root.offsetWidth,c(this.elements.root,Ha.hidden),r(),"function"==typeof this.hooks.onshow&&this.hooks.onshow.call(this),l("onshow",this)}return this},close:function(){return this.__internal.isOpen&&!1!==l("onclosing",this)&&(ra(this),c(this.elements.root,Ha.animationIn),b(this.elements.root,Ha.animationOut),clearTimeout(this.__internal.timerOut),this.__internal.timerOut=setTimeout(this.__internal.transitionOutHandler,v.supported?1e3:100),b(this.elements.root,Ha.hidden),Da=this.elements.modal.offsetWidth,y.defaults.maintainFocus&&this.__internal.activeElement&&(this.__internal.activeElement.focus(),this.__internal.activeElement=null),void 0!==this.__internal.className&&""!==this.__internal.className&&c(this.elements.root,this.__internal.className),"function"==typeof this.hooks.onclose&&this.hooks.onclose.call(this),l("onclose",this),q.splice(q.indexOf(this),1),this.__internal.isOpen=!1,s()),q.length||"0"!==Ea||document.body.removeAttribute("tabindex"),this},closeOthers:function(){return y.closeAll(this),this},destroy:function(){return this.__internal&&(this.__internal.isOpen?(this.__internal.destroy=function(){i(this,m)},this.close()):this.__internal.destroy||i(this,m)),this}}}(),x=function(){function d(a){if(!a.__internal){a.__internal={position:y.defaults.notifier.position,delay:y.defaults.notifier.delay},l=document.createElement("DIV");("transitionOff"in p.notifier?p.notifier.transitionOff:p.transitionOff)&&(o=n.base+" ajs-no-transition"),h(a)}l.parentNode!==document.body&&document.body.appendChild(l)}function e(a){a.__internal.pushed=!0,m.push(a)}function f(a){m.splice(m.indexOf(a),1),a.__internal.pushed=!1}function h(a){switch(l.className=o,a.__internal.position){case"top-right":b(l,n.top+" "+n.right);break;case"top-left":b(l,n.top+" "+n.left);break;case"top-center":b(l,n.top+" "+n.center);break;case"bottom-left":b(l,n.bottom+" "+n.left);break;case"bottom-center":b(l,n.bottom+" "+n.center);break;default:case"bottom-right":b(l,n.bottom+" "+n.right)}}function i(d,h){function i(a,b){b.__internal.closeButton&&"true"!==a.target.getAttribute("data-close")||b.dismiss(!0)}function m(a,b){u(b.element,v.type,m),l.removeChild(b.element)}function o(a){return a.__internal||(a.__internal={pushed:!1,delay:void 0,timer:void 0,clickHandler:void 0,transitionEndHandler:void 0,transitionTimeout:void 0},a.__internal.clickHandler=j(a,i),a.__internal.transitionEndHandler=j(a,m)),a}function p(a){clearTimeout(a.__internal.timer),clearTimeout(a.__internal.transitionTimeout)}return o({element:d,push:function(a,c){if(!this.__internal.pushed){e(this),p(this);var d,f;switch(arguments.length){case 0:f=this.__internal.delay;break;case 1:"number"==typeof a?f=a:(d=a,f=this.__internal.delay);break;case 2:d=a,f=c}return this.__internal.closeButton=y.defaults.notifier.closeButton,void 0!==d&&this.setContent(d),x.__internal.position.indexOf("top")<0?l.appendChild(this.element):l.insertBefore(this.element,l.firstChild),k=this.element.offsetWidth,b(this.element,n.visible),t(this.element,"click",this.__internal.clickHandler),this.delay(f)}return this},ondismiss:function(){},callback:h,dismiss:function(a){return this.__internal.pushed&&(p(this),"function"==typeof this.ondismiss&&!1===this.ondismiss.call(this)||(u(this.element,"click",this.__internal.clickHandler),void 0!==this.element&&this.element.parentNode===l&&(this.__internal.transitionTimeout=setTimeout(this.__internal.transitionEndHandler,v.supported?1e3:100),c(this.element,n.visible),"function"==typeof this.callback&&this.callback.call(this,a)),f(this))),this},delay:function(a){if(p(this),this.__internal.delay=void 0===a||isNaN(+a)?x.__internal.delay:+a,this.__internal.delay>0){var b=this;this.__internal.timer=setTimeout(function(){b.dismiss()},1e3*this.__internal.delay)}return this},setContent:function(c){if("string"==typeof c?(g(this.element),this.element.innerHTML=c):c instanceof a.HTMLElement&&this.element.firstChild!==c&&(g(this.element),this.element.appendChild(c)),this.__internal.closeButton){var d=document.createElement("span");b(d,n.close),d.setAttribute("data-close",!0),this.element.appendChild(d)}return this},dismissOthers:function(){return x.dismissAll(this),this}})}var k,l,m=[],n=p.notifier.classes,o=n.base;return{setting:function(a,b){if(d(this),void 0===b)return this.__internal[a];switch(a){case"position":this.__internal.position=b,h(this);break;case"delay":this.__internal.delay=b}return this},set:function(a,b){return this.setting(a,b),this},get:function(a){return this.setting(a)},create:function(a,b){d(this);var c=document.createElement("div");return c.className=n.message+("string"==typeof a&&""!==a?" "+n.prefix+a:""),i(c,b)},dismissAll:function(a){for(var b=m.slice(0),c=0;c<b.length;c+=1){var d=b[c];void 0!==a&&a===d||d.dismiss()}}}}(),y=new m;y.dialog("alert",function(){return{main:function(a,b,c){var d,e,f;switch(arguments.length){case 1:e=a;break;case 2:"function"==typeof b?(e=a,f=b):(d=a,e=b);break;case 3:d=a,e=b,f=c}return this.set("title",d),this.set("message",e),this.set("onok",f),this},setup:function(){return{buttons:[{text:y.defaults.glossary.ok,key:o.ESC,invokeOnClose:!0,className:y.defaults.theme.ok}],focus:{element:0,select:!1},options:{maximizable:!1,resizable:!1}}},build:function(){},prepare:function(){},setMessage:function(a){this.setContent(a)},settings:{message:void 0,onok:void 0,label:void 0},settingUpdated:function(a,b,c){switch(a){case"message":this.setMessage(c);break;case"label":this.__internal.buttons[0].element&&(this.__internal.buttons[0].element.innerHTML=c)}},
callback:function(a){if("function"==typeof this.get("onok")){var b=this.get("onok").call(this,a);void 0!==b&&(a.cancel=!b)}}}}),y.dialog("confirm",function(){function a(a){null!==c.timer&&(clearInterval(c.timer),c.timer=null,a.__internal.buttons[c.index].element.innerHTML=c.text)}function b(b,d,e){a(b),c.duration=e,c.index=d,c.text=b.__internal.buttons[d].element.innerHTML,c.timer=setInterval(j(b,c.task),1e3),c.task(null,b)}var c={timer:null,index:null,text:null,duration:null,task:function(b,d){if(d.isOpen()){if(d.__internal.buttons[c.index].element.innerHTML=c.text+" (&#8207;"+c.duration+"&#8207;) ",c.duration-=1,-1===c.duration){a(d);var e=d.__internal.buttons[c.index],f=k(c.index,e);"function"==typeof d.callback&&d.callback.apply(d,[f]),!1!==f.close&&d.close()}}else a(d)}};return{main:function(a,b,c,d){var e,f,g,h;switch(arguments.length){case 1:f=a;break;case 2:f=a,g=b;break;case 3:f=a,g=b,h=c;break;case 4:e=a,f=b,g=c,h=d}return this.set("title",e),this.set("message",f),this.set("onok",g),this.set("oncancel",h),this},setup:function(){return{buttons:[{text:y.defaults.glossary.ok,key:o.ENTER,className:y.defaults.theme.ok},{text:y.defaults.glossary.cancel,key:o.ESC,invokeOnClose:!0,className:y.defaults.theme.cancel}],focus:{element:0,select:!1},options:{maximizable:!1,resizable:!1}}},build:function(){},prepare:function(){},setMessage:function(a){this.setContent(a)},settings:{message:null,labels:null,onok:null,oncancel:null,defaultFocus:null,reverseButtons:null},settingUpdated:function(a,b,c){switch(a){case"message":this.setMessage(c);break;case"labels":"ok"in c&&this.__internal.buttons[0].element&&(this.__internal.buttons[0].text=c.ok,this.__internal.buttons[0].element.innerHTML=c.ok),"cancel"in c&&this.__internal.buttons[1].element&&(this.__internal.buttons[1].text=c.cancel,this.__internal.buttons[1].element.innerHTML=c.cancel);break;case"reverseButtons":!0===c?this.elements.buttons.primary.appendChild(this.__internal.buttons[0].element):this.elements.buttons.primary.appendChild(this.__internal.buttons[1].element);break;case"defaultFocus":this.__internal.focus.element="ok"===c?0:1}},callback:function(b){a(this);var c;switch(b.index){case 0:"function"==typeof this.get("onok")&&void 0!==(c=this.get("onok").call(this,b))&&(b.cancel=!c);break;case 1:"function"==typeof this.get("oncancel")&&void 0!==(c=this.get("oncancel").call(this,b))&&(b.cancel=!c)}},autoOk:function(a){return b(this,0,a),this},autoCancel:function(a){return b(this,1,a),this}}}),y.dialog("prompt",function(){var b=document.createElement("INPUT"),c=document.createElement("P");return{main:function(a,b,c,d,e){var f,g,h,i,j;switch(arguments.length){case 1:g=a;break;case 2:g=a,h=b;break;case 3:g=a,h=b,i=c;break;case 4:g=a,h=b,i=c,j=d;break;case 5:f=a,g=b,h=c,i=d,j=e}return this.set("title",f),this.set("message",g),this.set("value",h),this.set("onok",i),this.set("oncancel",j),this},setup:function(){return{buttons:[{text:y.defaults.glossary.ok,key:o.ENTER,className:y.defaults.theme.ok},{text:y.defaults.glossary.cancel,key:o.ESC,invokeOnClose:!0,className:y.defaults.theme.cancel}],focus:{element:b,select:!0},options:{maximizable:!1,resizable:!1}}},build:function(){b.className=y.defaults.theme.input,b.setAttribute("type","text"),b.value=this.get("value"),this.elements.content.appendChild(c),this.elements.content.appendChild(b)},prepare:function(){},setMessage:function(b){"string"==typeof b?(g(c),c.innerHTML=b):b instanceof a.HTMLElement&&c.firstChild!==b&&(g(c),c.appendChild(b))},settings:{message:void 0,labels:void 0,onok:void 0,oncancel:void 0,value:"",type:"text",reverseButtons:void 0},settingUpdated:function(a,c,d){switch(a){case"message":this.setMessage(d);break;case"value":b.value=d;break;case"type":switch(d){case"text":case"color":case"date":case"datetime-local":case"email":case"month":case"number":case"password":case"search":case"tel":case"time":case"week":b.type=d;break;default:b.type="text"}break;case"labels":d.ok&&this.__internal.buttons[0].element&&(this.__internal.buttons[0].element.innerHTML=d.ok),d.cancel&&this.__internal.buttons[1].element&&(this.__internal.buttons[1].element.innerHTML=d.cancel);break;case"reverseButtons":!0===d?this.elements.buttons.primary.appendChild(this.__internal.buttons[0].element):this.elements.buttons.primary.appendChild(this.__internal.buttons[1].element)}},callback:function(a){var c;switch(a.index){case 0:this.settings.value=b.value,"function"==typeof this.get("onok")&&void 0!==(c=this.get("onok").call(this,a,this.settings.value))&&(a.cancel=!c);break;case 1:"function"==typeof this.get("oncancel")&&void 0!==(c=this.get("oncancel").call(this,a))&&(a.cancel=!c),a.cancel||(b.value=this.settings.value)}}}}),"object"==typeof module&&"object"==typeof module.exports?module.exports=y:"function"==typeof define&&define.amd?define([],function(){return y}):a.alertify||(a.alertify=y)}("undefined"!=typeof window?window:this);
;/*!
* sweetalert2 v9.10.6
* Released under the MIT License.
*/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.Sweetalert2 = factory());
}(this, function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _construct(Parent, args, Class) {
    if (isNativeReflectConstruct()) {
      _construct = Reflect.construct;
    } else {
      _construct = function _construct(Parent, args, Class) {
        var a = [null];
        a.push.apply(a, args);
        var Constructor = Function.bind.apply(Parent, a);
        var instance = new Constructor();
        if (Class) _setPrototypeOf(instance, Class.prototype);
        return instance;
      };
    }

    return _construct.apply(null, arguments);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _superPropBase(object, property) {
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
      object = _getPrototypeOf(object);
      if (object === null) break;
    }

    return object;
  }

  function _get(target, property, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.get) {
      _get = Reflect.get;
    } else {
      _get = function _get(target, property, receiver) {
        var base = _superPropBase(target, property);

        if (!base) return;
        var desc = Object.getOwnPropertyDescriptor(base, property);

        if (desc.get) {
          return desc.get.call(receiver);
        }

        return desc.value;
      };
    }

    return _get(target, property, receiver || target);
  }

  var consolePrefix = 'SweetAlert2:';
  /**
   * Filter the unique values into a new array
   * @param arr
   */

  var uniqueArray = function uniqueArray(arr) {
    var result = [];

    for (var i = 0; i < arr.length; i++) {
      if (result.indexOf(arr[i]) === -1) {
        result.push(arr[i]);
      }
    }

    return result;
  };
  /**
   * Capitalize the first letter of a string
   * @param str
   */

  var capitalizeFirstLetter = function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  /**
   * Returns the array ob object values (Object.values isn't supported in IE11)
   * @param obj
   */

  var objectValues = function objectValues(obj) {
    return Object.keys(obj).map(function (key) {
      return obj[key];
    });
  };
  /**
   * Convert NodeList to Array
   * @param nodeList
   */

  var toArray = function toArray(nodeList) {
    return Array.prototype.slice.call(nodeList);
  };
  /**
   * Standardise console warnings
   * @param message
   */

  var warn = function warn(message) {
    console.warn("".concat(consolePrefix, " ").concat(message));
  };
  /**
   * Standardise console errors
   * @param message
   */

  var error = function error(message) {
    console.error("".concat(consolePrefix, " ").concat(message));
  };
  /**
   * Private global state for `warnOnce`
   * @type {Array}
   * @private
   */

  var previousWarnOnceMessages = [];
  /**
   * Show a console warning, but only if it hasn't already been shown
   * @param message
   */

  var warnOnce = function warnOnce(message) {
    if (!(previousWarnOnceMessages.indexOf(message) !== -1)) {
      previousWarnOnceMessages.push(message);
      warn(message);
    }
  };
  /**
   * Show a one-time console warning about deprecated params/methods
   */

  var warnAboutDepreation = function warnAboutDepreation(deprecatedParam, useInstead) {
    warnOnce("\"".concat(deprecatedParam, "\" is deprecated and will be removed in the next major release. Please use \"").concat(useInstead, "\" instead."));
  };
  /**
   * If `arg` is a function, call it (with no arguments or context) and return the result.
   * Otherwise, just pass the value through
   * @param arg
   */

  var callIfFunction = function callIfFunction(arg) {
    return typeof arg === 'function' ? arg() : arg;
  };
  var isPromise = function isPromise(arg) {
    return arg && Promise.resolve(arg) === arg;
  };

  var DismissReason = Object.freeze({
    cancel: 'cancel',
    backdrop: 'backdrop',
    close: 'close',
    esc: 'esc',
    timer: 'timer'
  });

  var isJqueryElement = function isJqueryElement(elem) {
    return _typeof(elem) === 'object' && elem.jquery;
  };

  var isElement = function isElement(elem) {
    return elem instanceof Element || isJqueryElement(elem);
  };

  var argsToParams = function argsToParams(args) {
    var params = {};

    if (_typeof(args[0]) === 'object' && !isElement(args[0])) {
      _extends(params, args[0]);
    } else {
      ['title', 'html', 'icon'].forEach(function (name, index) {
        var arg = args[index];

        if (typeof arg === 'string' || isElement(arg)) {
          params[name] = arg;
        } else if (arg !== undefined) {
          error("Unexpected type of ".concat(name, "! Expected \"string\" or \"Element\", got ").concat(_typeof(arg)));
        }
      });
    }

    return params;
  };

  var swalPrefix = 'swal2-';
  var prefix = function prefix(items) {
    var result = {};

    for (var i in items) {
      result[items[i]] = swalPrefix + items[i];
    }

    return result;
  };
  var swalClasses = prefix(['container', 'shown', 'height-auto', 'iosfix', 'popup', 'modal', 'no-backdrop', 'no-transition', 'toast', 'toast-shown', 'toast-column', 'show', 'hide', 'close', 'title', 'header', 'content', 'html-container', 'actions', 'confirm', 'cancel', 'footer', 'icon', 'icon-content', 'image', 'input', 'file', 'range', 'select', 'radio', 'checkbox', 'label', 'textarea', 'inputerror', 'validation-message', 'progress-steps', 'active-progress-step', 'progress-step', 'progress-step-line', 'loading', 'styled', 'top', 'top-start', 'top-end', 'top-left', 'top-right', 'center', 'center-start', 'center-end', 'center-left', 'center-right', 'bottom', 'bottom-start', 'bottom-end', 'bottom-left', 'bottom-right', 'grow-row', 'grow-column', 'grow-fullscreen', 'rtl', 'timer-progress-bar', 'timer-progress-bar-container', 'scrollbar-measure', 'icon-success', 'icon-warning', 'icon-info', 'icon-question', 'icon-error']);
  var iconTypes = prefix(['success', 'warning', 'info', 'question', 'error']);

  var getContainer = function getContainer() {
    return document.body.querySelector(".".concat(swalClasses.container));
  };
  var elementBySelector = function elementBySelector(selectorString) {
    var container = getContainer();
    return container ? container.querySelector(selectorString) : null;
  };

  var elementByClass = function elementByClass(className) {
    return elementBySelector(".".concat(className));
  };

  var getPopup = function getPopup() {
    return elementByClass(swalClasses.popup);
  };
  var getIcons = function getIcons() {
    var popup = getPopup();
    return toArray(popup.querySelectorAll(".".concat(swalClasses.icon)));
  };
  var getIcon = function getIcon() {
    var visibleIcon = getIcons().filter(function (icon) {
      return isVisible(icon);
    });
    return visibleIcon.length ? visibleIcon[0] : null;
  };
  var getTitle = function getTitle() {
    return elementByClass(swalClasses.title);
  };
  var getContent = function getContent() {
    return elementByClass(swalClasses.content);
  };
  var getHtmlContainer = function getHtmlContainer() {
    return elementByClass(swalClasses['html-container']);
  };
  var getImage = function getImage() {
    return elementByClass(swalClasses.image);
  };
  var getProgressSteps = function getProgressSteps() {
    return elementByClass(swalClasses['progress-steps']);
  };
  var getValidationMessage = function getValidationMessage() {
    return elementByClass(swalClasses['validation-message']);
  };
  var getConfirmButton = function getConfirmButton() {
    return elementBySelector(".".concat(swalClasses.actions, " .").concat(swalClasses.confirm));
  };
  var getCancelButton = function getCancelButton() {
    return elementBySelector(".".concat(swalClasses.actions, " .").concat(swalClasses.cancel));
  };
  var getActions = function getActions() {
    return elementByClass(swalClasses.actions);
  };
  var getHeader = function getHeader() {
    return elementByClass(swalClasses.header);
  };
  var getFooter = function getFooter() {
    return elementByClass(swalClasses.footer);
  };
  var getTimerProgressBar = function getTimerProgressBar() {
    return elementByClass(swalClasses['timer-progress-bar']);
  };
  var getCloseButton = function getCloseButton() {
    return elementByClass(swalClasses.close);
  }; // https://github.com/jkup/focusable/blob/master/index.js

  var focusable = "\n  a[href],\n  area[href],\n  input:not([disabled]),\n  select:not([disabled]),\n  textarea:not([disabled]),\n  button:not([disabled]),\n  iframe,\n  object,\n  embed,\n  [tabindex=\"0\"],\n  [contenteditable],\n  audio[controls],\n  video[controls],\n  summary\n";
  var getFocusableElements = function getFocusableElements() {
    var focusableElementsWithTabindex = toArray(getPopup().querySelectorAll('[tabindex]:not([tabindex="-1"]):not([tabindex="0"])')) // sort according to tabindex
    .sort(function (a, b) {
      a = parseInt(a.getAttribute('tabindex'));
      b = parseInt(b.getAttribute('tabindex'));

      if (a > b) {
        return 1;
      } else if (a < b) {
        return -1;
      }

      return 0;
    });
    var otherFocusableElements = toArray(getPopup().querySelectorAll(focusable)).filter(function (el) {
      return el.getAttribute('tabindex') !== '-1';
    });
    return uniqueArray(focusableElementsWithTabindex.concat(otherFocusableElements)).filter(function (el) {
      return isVisible(el);
    });
  };
  var isModal = function isModal() {
    return !isToast() && !document.body.classList.contains(swalClasses['no-backdrop']);
  };
  var isToast = function isToast() {
    return document.body.classList.contains(swalClasses['toast-shown']);
  };
  var isLoading = function isLoading() {
    return getPopup().hasAttribute('data-loading');
  };

  var states = {
    previousBodyPadding: null
  };
  var hasClass = function hasClass(elem, className) {
    if (!className) {
      return false;
    }

    var classList = className.split(/\s+/);

    for (var i = 0; i < classList.length; i++) {
      if (!elem.classList.contains(classList[i])) {
        return false;
      }
    }

    return true;
  };

  var removeCustomClasses = function removeCustomClasses(elem, params) {
    toArray(elem.classList).forEach(function (className) {
      if (!(objectValues(swalClasses).indexOf(className) !== -1) && !(objectValues(iconTypes).indexOf(className) !== -1) && !(objectValues(params.showClass).indexOf(className) !== -1)) {
        elem.classList.remove(className);
      }
    });
  };

  var applyCustomClass = function applyCustomClass(elem, params, className) {
    removeCustomClasses(elem, params);

    if (params.customClass && params.customClass[className]) {
      if (typeof params.customClass[className] !== 'string' && !params.customClass[className].forEach) {
        return warn("Invalid type of customClass.".concat(className, "! Expected string or iterable object, got \"").concat(_typeof(params.customClass[className]), "\""));
      }

      addClass(elem, params.customClass[className]);
    }
  };
  function getInput(content, inputType) {
    if (!inputType) {
      return null;
    }

    switch (inputType) {
      case 'select':
      case 'textarea':
      case 'file':
        return getChildByClass(content, swalClasses[inputType]);

      case 'checkbox':
        return content.querySelector(".".concat(swalClasses.checkbox, " input"));

      case 'radio':
        return content.querySelector(".".concat(swalClasses.radio, " input:checked")) || content.querySelector(".".concat(swalClasses.radio, " input:first-child"));

      case 'range':
        return content.querySelector(".".concat(swalClasses.range, " input"));

      default:
        return getChildByClass(content, swalClasses.input);
    }
  }
  var focusInput = function focusInput(input) {
    input.focus(); // place cursor at end of text in text input

    if (input.type !== 'file') {
      // http://stackoverflow.com/a/2345915
      var val = input.value;
      input.value = '';
      input.value = val;
    }
  };
  var toggleClass = function toggleClass(target, classList, condition) {
    if (!target || !classList) {
      return;
    }

    if (typeof classList === 'string') {
      classList = classList.split(/\s+/).filter(Boolean);
    }

    classList.forEach(function (className) {
      if (target.forEach) {
        target.forEach(function (elem) {
          condition ? elem.classList.add(className) : elem.classList.remove(className);
        });
      } else {
        condition ? target.classList.add(className) : target.classList.remove(className);
      }
    });
  };
  var addClass = function addClass(target, classList) {
    toggleClass(target, classList, true);
  };
  var removeClass = function removeClass(target, classList) {
    toggleClass(target, classList, false);
  };
  var getChildByClass = function getChildByClass(elem, className) {
    for (var i = 0; i < elem.childNodes.length; i++) {
      if (hasClass(elem.childNodes[i], className)) {
        return elem.childNodes[i];
      }
    }
  };
  var applyNumericalStyle = function applyNumericalStyle(elem, property, value) {
    if (value || parseInt(value) === 0) {
      elem.style[property] = typeof value === 'number' ? "".concat(value, "px") : value;
    } else {
      elem.style.removeProperty(property);
    }
  };
  var show = function show(elem) {
    var display = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'flex';
    elem.style.opacity = '';
    elem.style.display = display;
  };
  var hide = function hide(elem) {
    elem.style.opacity = '';
    elem.style.display = 'none';
  };
  var toggle = function toggle(elem, condition, display) {
    condition ? show(elem, display) : hide(elem);
  }; // borrowed from jquery $(elem).is(':visible') implementation

  var isVisible = function isVisible(elem) {
    return !!(elem && (elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length));
  };
  /* istanbul ignore next */

  var isScrollable = function isScrollable(elem) {
    return !!(elem.scrollHeight > elem.clientHeight);
  }; // borrowed from https://stackoverflow.com/a/46352119

  var hasCssAnimation = function hasCssAnimation(elem) {
    var style = window.getComputedStyle(elem);
    var animDuration = parseFloat(style.getPropertyValue('animation-duration') || '0');
    var transDuration = parseFloat(style.getPropertyValue('transition-duration') || '0');
    return animDuration > 0 || transDuration > 0;
  };
  var contains = function contains(haystack, needle) {
    if (typeof haystack.contains === 'function') {
      return haystack.contains(needle);
    }
  };
  var animateTimerProgressBar = function animateTimerProgressBar(timer) {
    var reset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var timerProgressBar = getTimerProgressBar();

    if (isVisible(timerProgressBar)) {
      if (reset) {
        timerProgressBar.style.transition = 'none';
        timerProgressBar.style.width = '100%';
      }

      setTimeout(function () {
        timerProgressBar.style.transition = "width ".concat(timer / 1000, "s linear");
        timerProgressBar.style.width = '0%';
      }, 10);
    }
  };
  var stopTimerProgressBar = function stopTimerProgressBar() {
    var timerProgressBar = getTimerProgressBar();
    var timerProgressBarWidth = parseInt(window.getComputedStyle(timerProgressBar).width);
    timerProgressBar.style.removeProperty('transition');
    timerProgressBar.style.width = '100%';
    var timerProgressBarFullWidth = parseInt(window.getComputedStyle(timerProgressBar).width);
    var timerProgressBarPercent = parseInt(timerProgressBarWidth / timerProgressBarFullWidth * 100);
    timerProgressBar.style.removeProperty('transition');
    timerProgressBar.style.width = "".concat(timerProgressBarPercent, "%");
  };

  // Detect Node env
  var isNodeEnv = function isNodeEnv() {
    return typeof window === 'undefined' || typeof document === 'undefined';
  };

  var sweetHTML = "\n <div aria-labelledby=\"".concat(swalClasses.title, "\" aria-describedby=\"").concat(swalClasses.content, "\" class=\"").concat(swalClasses.popup, "\" tabindex=\"-1\">\n   <div class=\"").concat(swalClasses.header, "\">\n     <ul class=\"").concat(swalClasses['progress-steps'], "\"></ul>\n     <div class=\"").concat(swalClasses.icon, " ").concat(iconTypes.error, "\"></div>\n     <div class=\"").concat(swalClasses.icon, " ").concat(iconTypes.question, "\"></div>\n     <div class=\"").concat(swalClasses.icon, " ").concat(iconTypes.warning, "\"></div>\n     <div class=\"").concat(swalClasses.icon, " ").concat(iconTypes.info, "\"></div>\n     <div class=\"").concat(swalClasses.icon, " ").concat(iconTypes.success, "\"></div>\n     <img class=\"").concat(swalClasses.image, "\" />\n     <h2 class=\"").concat(swalClasses.title, "\" id=\"").concat(swalClasses.title, "\"></h2>\n     <button type=\"button\" class=\"").concat(swalClasses.close, "\"></button>\n   </div>\n   <div class=\"").concat(swalClasses.content, "\">\n     <div id=\"").concat(swalClasses.content, "\" class=\"").concat(swalClasses['html-container'], "\"></div>\n     <input class=\"").concat(swalClasses.input, "\" />\n     <input type=\"file\" class=\"").concat(swalClasses.file, "\" />\n     <div class=\"").concat(swalClasses.range, "\">\n       <input type=\"range\" />\n       <output></output>\n     </div>\n     <select class=\"").concat(swalClasses.select, "\"></select>\n     <div class=\"").concat(swalClasses.radio, "\"></div>\n     <label for=\"").concat(swalClasses.checkbox, "\" class=\"").concat(swalClasses.checkbox, "\">\n       <input type=\"checkbox\" />\n       <span class=\"").concat(swalClasses.label, "\"></span>\n     </label>\n     <textarea class=\"").concat(swalClasses.textarea, "\"></textarea>\n     <div class=\"").concat(swalClasses['validation-message'], "\" id=\"").concat(swalClasses['validation-message'], "\"></div>\n   </div>\n   <div class=\"").concat(swalClasses.actions, "\">\n     <button type=\"button\" class=\"").concat(swalClasses.confirm, "\">OK</button>\n     <button type=\"button\" class=\"").concat(swalClasses.cancel, "\">Cancel</button>\n   </div>\n   <div class=\"").concat(swalClasses.footer, "\"></div>\n   <div class=\"").concat(swalClasses['timer-progress-bar-container'], "\">\n     <div class=\"").concat(swalClasses['timer-progress-bar'], "\"></div>\n   </div>\n </div>\n").replace(/(^|\n)\s*/g, '');

  var resetOldContainer = function resetOldContainer() {
    var oldContainer = getContainer();

    if (!oldContainer) {
      return false;
    }

    oldContainer.parentNode.removeChild(oldContainer);
    removeClass([document.documentElement, document.body], [swalClasses['no-backdrop'], swalClasses['toast-shown'], swalClasses['has-column']]);
    return true;
  };

  var oldInputVal; // IE11 workaround, see #1109 for details

  var resetValidationMessage = function resetValidationMessage(e) {
    if (Swal.isVisible() && oldInputVal !== e.target.value) {
      Swal.resetValidationMessage();
    }

    oldInputVal = e.target.value;
  };

  var addInputChangeListeners = function addInputChangeListeners() {
    var content = getContent();
    var input = getChildByClass(content, swalClasses.input);
    var file = getChildByClass(content, swalClasses.file);
    var range = content.querySelector(".".concat(swalClasses.range, " input"));
    var rangeOutput = content.querySelector(".".concat(swalClasses.range, " output"));
    var select = getChildByClass(content, swalClasses.select);
    var checkbox = content.querySelector(".".concat(swalClasses.checkbox, " input"));
    var textarea = getChildByClass(content, swalClasses.textarea);
    input.oninput = resetValidationMessage;
    file.onchange = resetValidationMessage;
    select.onchange = resetValidationMessage;
    checkbox.onchange = resetValidationMessage;
    textarea.oninput = resetValidationMessage;

    range.oninput = function (e) {
      resetValidationMessage(e);
      rangeOutput.value = range.value;
    };

    range.onchange = function (e) {
      resetValidationMessage(e);
      range.nextSibling.value = range.value;
    };
  };

  var getTarget = function getTarget(target) {
    return typeof target === 'string' ? document.querySelector(target) : target;
  };

  var setupAccessibility = function setupAccessibility(params) {
    var popup = getPopup();
    popup.setAttribute('role', params.toast ? 'alert' : 'dialog');
    popup.setAttribute('aria-live', params.toast ? 'polite' : 'assertive');

    if (!params.toast) {
      popup.setAttribute('aria-modal', 'true');
    }
  };

  var setupRTL = function setupRTL(targetElement) {
    if (window.getComputedStyle(targetElement).direction === 'rtl') {
      addClass(getContainer(), swalClasses.rtl);
    }
  };
  /*
   * Add modal + backdrop to DOM
   */


  var init = function init(params) {
    // Clean up the old popup container if it exists
    var oldContainerExisted = resetOldContainer();
    /* istanbul ignore if */

    if (isNodeEnv()) {
      error('SweetAlert2 requires document to initialize');
      return;
    }

    var container = document.createElement('div');
    container.className = swalClasses.container;

    if (oldContainerExisted) {
      addClass(container, swalClasses['no-transition']);
    }

    container.innerHTML = sweetHTML;
    var targetElement = getTarget(params.target);
    targetElement.appendChild(container);
    setupAccessibility(params);
    setupRTL(targetElement);
    addInputChangeListeners();
  };

  var parseHtmlToContainer = function parseHtmlToContainer(param, target) {
    // DOM element
    if (param instanceof HTMLElement) {
      target.appendChild(param); // Object
    } else if (_typeof(param) === 'object') {
      handleObject(param, target); // Plain string
    } else if (param) {
      target.innerHTML = param;
    }
  };

  var handleObject = function handleObject(param, target) {
    // JQuery element(s)
    if (param.jquery) {
      handleJqueryElem(target, param); // For other objects use their string representation
    } else {
      target.innerHTML = param.toString();
    }
  };

  var handleJqueryElem = function handleJqueryElem(target, elem) {
    target.innerHTML = '';

    if (0 in elem) {
      for (var i = 0; i in elem; i++) {
        target.appendChild(elem[i].cloneNode(true));
      }
    } else {
      target.appendChild(elem.cloneNode(true));
    }
  };

  var animationEndEvent = function () {
    // Prevent run in Node env

    /* istanbul ignore if */
    if (isNodeEnv()) {
      return false;
    }

    var testEl = document.createElement('div');
    var transEndEventNames = {
      WebkitAnimation: 'webkitAnimationEnd',
      OAnimation: 'oAnimationEnd oanimationend',
      animation: 'animationend'
    };

    for (var i in transEndEventNames) {
      if (Object.prototype.hasOwnProperty.call(transEndEventNames, i) && typeof testEl.style[i] !== 'undefined') {
        return transEndEventNames[i];
      }
    }

    return false;
  }();

  // https://github.com/twbs/bootstrap/blob/master/js/src/modal.js

  var measureScrollbar = function measureScrollbar() {
    var scrollDiv = document.createElement('div');
    scrollDiv.className = swalClasses['scrollbar-measure'];
    document.body.appendChild(scrollDiv);
    var scrollbarWidth = scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth;
    document.body.removeChild(scrollDiv);
    return scrollbarWidth;
  };

  var renderActions = function renderActions(instance, params) {
    var actions = getActions();
    var confirmButton = getConfirmButton();
    var cancelButton = getCancelButton(); // Actions (buttons) wrapper

    if (!params.showConfirmButton && !params.showCancelButton) {
      hide(actions);
    } // Custom class


    applyCustomClass(actions, params, 'actions'); // Render confirm button

    renderButton(confirmButton, 'confirm', params); // render Cancel Button

    renderButton(cancelButton, 'cancel', params);

    if (params.buttonsStyling) {
      handleButtonsStyling(confirmButton, cancelButton, params);
    } else {
      removeClass([confirmButton, cancelButton], swalClasses.styled);
      confirmButton.style.backgroundColor = confirmButton.style.borderLeftColor = confirmButton.style.borderRightColor = '';
      cancelButton.style.backgroundColor = cancelButton.style.borderLeftColor = cancelButton.style.borderRightColor = '';
    }

    if (params.reverseButtons) {
      confirmButton.parentNode.insertBefore(cancelButton, confirmButton);
    }
  };

  function handleButtonsStyling(confirmButton, cancelButton, params) {
    addClass([confirmButton, cancelButton], swalClasses.styled); // Buttons background colors

    if (params.confirmButtonColor) {
      confirmButton.style.backgroundColor = params.confirmButtonColor;
    }

    if (params.cancelButtonColor) {
      cancelButton.style.backgroundColor = params.cancelButtonColor;
    } // Loading state


    var confirmButtonBackgroundColor = window.getComputedStyle(confirmButton).getPropertyValue('background-color');
    confirmButton.style.borderLeftColor = confirmButtonBackgroundColor;
    confirmButton.style.borderRightColor = confirmButtonBackgroundColor;
  }

  function renderButton(button, buttonType, params) {
    toggle(button, params["show".concat(capitalizeFirstLetter(buttonType), "Button")], 'inline-block');
    button.innerHTML = params["".concat(buttonType, "ButtonText")]; // Set caption text

    button.setAttribute('aria-label', params["".concat(buttonType, "ButtonAriaLabel")]); // ARIA label
    // Add buttons custom classes

    button.className = swalClasses[buttonType];
    applyCustomClass(button, params, "".concat(buttonType, "Button"));
    addClass(button, params["".concat(buttonType, "ButtonClass")]);
  }

  function handleBackdropParam(container, backdrop) {
    if (typeof backdrop === 'string') {
      container.style.background = backdrop;
    } else if (!backdrop) {
      addClass([document.documentElement, document.body], swalClasses['no-backdrop']);
    }
  }

  function handlePositionParam(container, position) {
    if (position in swalClasses) {
      addClass(container, swalClasses[position]);
    } else {
      warn('The "position" parameter is not valid, defaulting to "center"');
      addClass(container, swalClasses.center);
    }
  }

  function handleGrowParam(container, grow) {
    if (grow && typeof grow === 'string') {
      var growClass = "grow-".concat(grow);

      if (growClass in swalClasses) {
        addClass(container, swalClasses[growClass]);
      }
    }
  }

  var renderContainer = function renderContainer(instance, params) {
    var container = getContainer();

    if (!container) {
      return;
    }

    handleBackdropParam(container, params.backdrop);

    if (!params.backdrop && params.allowOutsideClick) {
      warn('"allowOutsideClick" parameter requires `backdrop` parameter to be set to `true`');
    }

    handlePositionParam(container, params.position);
    handleGrowParam(container, params.grow); // Custom class

    applyCustomClass(container, params, 'container'); // Set queue step attribute for getQueueStep() method

    var queueStep = document.body.getAttribute('data-swal2-queue-step');

    if (queueStep) {
      container.setAttribute('data-queue-step', queueStep);
      document.body.removeAttribute('data-swal2-queue-step');
    }
  };

  /**
   * This module containts `WeakMap`s for each effectively-"private  property" that a `Swal` has.
   * For example, to set the private property "foo" of `this` to "bar", you can `privateProps.foo.set(this, 'bar')`
   * This is the approach that Babel will probably take to implement private methods/fields
   *   https://github.com/tc39/proposal-private-methods
   *   https://github.com/babel/babel/pull/7555
   * Once we have the changes from that PR in Babel, and our core class fits reasonable in *one module*
   *   then we can use that language feature.
   */
  var privateProps = {
    promise: new WeakMap(),
    innerParams: new WeakMap(),
    domCache: new WeakMap()
  };

  var inputTypes = ['input', 'file', 'range', 'select', 'radio', 'checkbox', 'textarea'];
  var renderInput = function renderInput(instance, params) {
    var content = getContent();
    var innerParams = privateProps.innerParams.get(instance);
    var rerender = !innerParams || params.input !== innerParams.input;
    inputTypes.forEach(function (inputType) {
      var inputClass = swalClasses[inputType];
      var inputContainer = getChildByClass(content, inputClass); // set attributes

      setAttributes(inputType, params.inputAttributes); // set class

      inputContainer.className = inputClass;

      if (rerender) {
        hide(inputContainer);
      }
    });

    if (params.input) {
      if (rerender) {
        showInput(params);
      } // set custom class


      setCustomClass(params);
    }
  };

  var showInput = function showInput(params) {
    if (!renderInputType[params.input]) {
      return error("Unexpected type of input! Expected \"text\", \"email\", \"password\", \"number\", \"tel\", \"select\", \"radio\", \"checkbox\", \"textarea\", \"file\" or \"url\", got \"".concat(params.input, "\""));
    }

    var inputContainer = getInputContainer(params.input);
    var input = renderInputType[params.input](inputContainer, params);
    show(input); // input autofocus

    setTimeout(function () {
      focusInput(input);
    });
  };

  var removeAttributes = function removeAttributes(input) {
    for (var i = 0; i < input.attributes.length; i++) {
      var attrName = input.attributes[i].name;

      if (!(['type', 'value', 'style'].indexOf(attrName) !== -1)) {
        input.removeAttribute(attrName);
      }
    }
  };

  var setAttributes = function setAttributes(inputType, inputAttributes) {
    var input = getInput(getContent(), inputType);

    if (!input) {
      return;
    }

    removeAttributes(input);

    for (var attr in inputAttributes) {
      // Do not set a placeholder for <input type="range">
      // it'll crash Edge, #1298
      if (inputType === 'range' && attr === 'placeholder') {
        continue;
      }

      input.setAttribute(attr, inputAttributes[attr]);
    }
  };

  var setCustomClass = function setCustomClass(params) {
    var inputContainer = getInputContainer(params.input);

    if (params.customClass) {
      addClass(inputContainer, params.customClass.input);
    }
  };

  var setInputPlaceholder = function setInputPlaceholder(input, params) {
    if (!input.placeholder || params.inputPlaceholder) {
      input.placeholder = params.inputPlaceholder;
    }
  };

  var getInputContainer = function getInputContainer(inputType) {
    var inputClass = swalClasses[inputType] ? swalClasses[inputType] : swalClasses.input;
    return getChildByClass(getContent(), inputClass);
  };

  var renderInputType = {};

  renderInputType.text = renderInputType.email = renderInputType.password = renderInputType.number = renderInputType.tel = renderInputType.url = function (input, params) {
    if (typeof params.inputValue === 'string' || typeof params.inputValue === 'number') {
      input.value = params.inputValue;
    } else if (!isPromise(params.inputValue)) {
      warn("Unexpected type of inputValue! Expected \"string\", \"number\" or \"Promise\", got \"".concat(_typeof(params.inputValue), "\""));
    }

    setInputPlaceholder(input, params);
    input.type = params.input;
    return input;
  };

  renderInputType.file = function (input, params) {
    setInputPlaceholder(input, params);
    return input;
  };

  renderInputType.range = function (range, params) {
    var rangeInput = range.querySelector('input');
    var rangeOutput = range.querySelector('output');
    rangeInput.value = params.inputValue;
    rangeInput.type = params.input;
    rangeOutput.value = params.inputValue;
    return range;
  };

  renderInputType.select = function (select, params) {
    select.innerHTML = '';

    if (params.inputPlaceholder) {
      var placeholder = document.createElement('option');
      placeholder.innerHTML = params.inputPlaceholder;
      placeholder.value = '';
      placeholder.disabled = true;
      placeholder.selected = true;
      select.appendChild(placeholder);
    }

    return select;
  };

  renderInputType.radio = function (radio) {
    radio.innerHTML = '';
    return radio;
  };

  renderInputType.checkbox = function (checkboxContainer, params) {
    var checkbox = getInput(getContent(), 'checkbox');
    checkbox.value = 1;
    checkbox.id = swalClasses.checkbox;
    checkbox.checked = Boolean(params.inputValue);
    var label = checkboxContainer.querySelector('span');
    label.innerHTML = params.inputPlaceholder;
    return checkboxContainer;
  };

  renderInputType.textarea = function (textarea, params) {
    textarea.value = params.inputValue;
    setInputPlaceholder(textarea, params);

    if ('MutationObserver' in window) {
      // #1699
      var initialPopupWidth = parseInt(window.getComputedStyle(getPopup()).width);
      var popupPadding = parseInt(window.getComputedStyle(getPopup()).paddingLeft) + parseInt(window.getComputedStyle(getPopup()).paddingRight);

      var outputsize = function outputsize() {
        var contentWidth = textarea.offsetWidth + popupPadding;

        if (contentWidth > initialPopupWidth) {
          getPopup().style.width = "".concat(contentWidth, "px");
        } else {
          getPopup().style.width = null;
        }
      };

      new MutationObserver(outputsize).observe(textarea, {
        attributes: true,
        attributeFilter: ['style']
      });
    }

    return textarea;
  };

  var renderContent = function renderContent(instance, params) {
    var content = getContent().querySelector("#".concat(swalClasses.content)); // Content as HTML

    if (params.html) {
      parseHtmlToContainer(params.html, content);
      show(content, 'block'); // Content as plain text
    } else if (params.text) {
      content.textContent = params.text;
      show(content, 'block'); // No content
    } else {
      hide(content);
    }

    renderInput(instance, params); // Custom class

    applyCustomClass(getContent(), params, 'content');
  };

  var renderFooter = function renderFooter(instance, params) {
    var footer = getFooter();
    toggle(footer, params.footer);

    if (params.footer) {
      parseHtmlToContainer(params.footer, footer);
    } // Custom class


    applyCustomClass(footer, params, 'footer');
  };

  var renderCloseButton = function renderCloseButton(instance, params) {
    var closeButton = getCloseButton();
    closeButton.innerHTML = params.closeButtonHtml; // Custom class

    applyCustomClass(closeButton, params, 'closeButton');
    toggle(closeButton, params.showCloseButton);
    closeButton.setAttribute('aria-label', params.closeButtonAriaLabel);
  };

  var renderIcon = function renderIcon(instance, params) {
    var innerParams = privateProps.innerParams.get(instance); // if the give icon already rendered, apply the custom class without re-rendering the icon

    if (innerParams && params.icon === innerParams.icon && getIcon()) {
      applyCustomClass(getIcon(), params, 'icon');
      return;
    }

    hideAllIcons();

    if (!params.icon) {
      return;
    }

    if (Object.keys(iconTypes).indexOf(params.icon) !== -1) {
      var icon = elementBySelector(".".concat(swalClasses.icon, ".").concat(iconTypes[params.icon]));
      show(icon); // Custom or default content

      setContent(icon, params);
      adjustSuccessIconBackgoundColor(); // Custom class

      applyCustomClass(icon, params, 'icon'); // Animate icon

      addClass(icon, params.showClass.icon);
    } else {
      error("Unknown icon! Expected \"success\", \"error\", \"warning\", \"info\" or \"question\", got \"".concat(params.icon, "\""));
    }
  };

  var hideAllIcons = function hideAllIcons() {
    var icons = getIcons();

    for (var i = 0; i < icons.length; i++) {
      hide(icons[i]);
    }
  }; // Adjust success icon background color to match the popup background color


  var adjustSuccessIconBackgoundColor = function adjustSuccessIconBackgoundColor() {
    var popup = getPopup();
    var popupBackgroundColor = window.getComputedStyle(popup).getPropertyValue('background-color');
    var successIconParts = popup.querySelectorAll('[class^=swal2-success-circular-line], .swal2-success-fix');

    for (var i = 0; i < successIconParts.length; i++) {
      successIconParts[i].style.backgroundColor = popupBackgroundColor;
    }
  };

  var setContent = function setContent(icon, params) {
    icon.innerHTML = '';

    if (params.iconHtml) {
      icon.innerHTML = iconContent(params.iconHtml);
    } else if (params.icon === 'success') {
      icon.innerHTML = "\n      <div class=\"swal2-success-circular-line-left\"></div>\n      <span class=\"swal2-success-line-tip\"></span> <span class=\"swal2-success-line-long\"></span>\n      <div class=\"swal2-success-ring\"></div> <div class=\"swal2-success-fix\"></div>\n      <div class=\"swal2-success-circular-line-right\"></div>\n    ";
    } else if (params.icon === 'error') {
      icon.innerHTML = "\n      <span class=\"swal2-x-mark\">\n        <span class=\"swal2-x-mark-line-left\"></span>\n        <span class=\"swal2-x-mark-line-right\"></span>\n      </span>\n    ";
    } else {
      var defaultIconHtml = {
        question: '?',
        warning: '!',
        info: 'i'
      };
      icon.innerHTML = iconContent(defaultIconHtml[params.icon]);
    }
  };

  var iconContent = function iconContent(content) {
    return "<div class=\"".concat(swalClasses['icon-content'], "\">").concat(content, "</div>");
  };

  var renderImage = function renderImage(instance, params) {
    var image = getImage();

    if (!params.imageUrl) {
      return hide(image);
    }

    show(image); // Src, alt

    image.setAttribute('src', params.imageUrl);
    image.setAttribute('alt', params.imageAlt); // Width, height

    applyNumericalStyle(image, 'width', params.imageWidth);
    applyNumericalStyle(image, 'height', params.imageHeight); // Class

    image.className = swalClasses.image;
    applyCustomClass(image, params, 'image');
  };

  var currentSteps = [];
  /*
   * Global function for chaining sweetAlert popups
   */

  var queue = function queue(steps) {
    var Swal = this;
    currentSteps = steps;

    var resetAndResolve = function resetAndResolve(resolve, value) {
      currentSteps = [];
      resolve(value);
    };

    var queueResult = [];
    return new Promise(function (resolve) {
      (function step(i, callback) {
        if (i < currentSteps.length) {
          document.body.setAttribute('data-swal2-queue-step', i);
          Swal.fire(currentSteps[i]).then(function (result) {
            if (typeof result.value !== 'undefined') {
              queueResult.push(result.value);
              step(i + 1, callback);
            } else {
              resetAndResolve(resolve, {
                dismiss: result.dismiss
              });
            }
          });
        } else {
          resetAndResolve(resolve, {
            value: queueResult
          });
        }
      })(0);
    });
  };
  /*
   * Global function for getting the index of current popup in queue
   */

  var getQueueStep = function getQueueStep() {
    return getContainer().getAttribute('data-queue-step');
  };
  /*
   * Global function for inserting a popup to the queue
   */

  var insertQueueStep = function insertQueueStep(step, index) {
    if (index && index < currentSteps.length) {
      return currentSteps.splice(index, 0, step);
    }

    return currentSteps.push(step);
  };
  /*
   * Global function for deleting a popup from the queue
   */

  var deleteQueueStep = function deleteQueueStep(index) {
    if (typeof currentSteps[index] !== 'undefined') {
      currentSteps.splice(index, 1);
    }
  };

  var createStepElement = function createStepElement(step) {
    var stepEl = document.createElement('li');
    addClass(stepEl, swalClasses['progress-step']);
    stepEl.innerHTML = step;
    return stepEl;
  };

  var createLineElement = function createLineElement(params) {
    var lineEl = document.createElement('li');
    addClass(lineEl, swalClasses['progress-step-line']);

    if (params.progressStepsDistance) {
      lineEl.style.width = params.progressStepsDistance;
    }

    return lineEl;
  };

  var renderProgressSteps = function renderProgressSteps(instance, params) {
    var progressStepsContainer = getProgressSteps();

    if (!params.progressSteps || params.progressSteps.length === 0) {
      return hide(progressStepsContainer);
    }

    show(progressStepsContainer);
    progressStepsContainer.innerHTML = '';
    var currentProgressStep = parseInt(params.currentProgressStep === undefined ? getQueueStep() : params.currentProgressStep);

    if (currentProgressStep >= params.progressSteps.length) {
      warn('Invalid currentProgressStep parameter, it should be less than progressSteps.length ' + '(currentProgressStep like JS arrays starts from 0)');
    }

    params.progressSteps.forEach(function (step, index) {
      var stepEl = createStepElement(step);
      progressStepsContainer.appendChild(stepEl);

      if (index === currentProgressStep) {
        addClass(stepEl, swalClasses['active-progress-step']);
      }

      if (index !== params.progressSteps.length - 1) {
        var lineEl = createLineElement(step);
        progressStepsContainer.appendChild(lineEl);
      }
    });
  };

  var renderTitle = function renderTitle(instance, params) {
    var title = getTitle();
    toggle(title, params.title || params.titleText);

    if (params.title) {
      parseHtmlToContainer(params.title, title);
    }

    if (params.titleText) {
      title.innerText = params.titleText;
    } // Custom class


    applyCustomClass(title, params, 'title');
  };

  var renderHeader = function renderHeader(instance, params) {
    var header = getHeader(); // Custom class

    applyCustomClass(header, params, 'header'); // Progress steps

    renderProgressSteps(instance, params); // Icon

    renderIcon(instance, params); // Image

    renderImage(instance, params); // Title

    renderTitle(instance, params); // Close button

    renderCloseButton(instance, params);
  };

  var renderPopup = function renderPopup(instance, params) {
    var popup = getPopup(); // Width

    applyNumericalStyle(popup, 'width', params.width); // Padding

    applyNumericalStyle(popup, 'padding', params.padding); // Background

    if (params.background) {
      popup.style.background = params.background;
    } // Classes


    addClasses(popup, params);
  };

  var addClasses = function addClasses(popup, params) {
    // Default Class + showClass when updating Swal.update({})
    popup.className = "".concat(swalClasses.popup, " ").concat(isVisible(popup) ? params.showClass.popup : '');

    if (params.toast) {
      addClass([document.documentElement, document.body], swalClasses['toast-shown']);
      addClass(popup, swalClasses.toast);
    } else {
      addClass(popup, swalClasses.modal);
    } // Custom class


    applyCustomClass(popup, params, 'popup');

    if (typeof params.customClass === 'string') {
      addClass(popup, params.customClass);
    } // Icon class (#1842)


    if (params.icon) {
      addClass(popup, swalClasses["icon-".concat(params.icon)]);
    }
  };

  var render = function render(instance, params) {
    renderPopup(instance, params);
    renderContainer(instance, params);
    renderHeader(instance, params);
    renderContent(instance, params);
    renderActions(instance, params);
    renderFooter(instance, params);

    if (typeof params.onRender === 'function') {
      params.onRender(getPopup());
    }
  };

  /*
   * Global function to determine if SweetAlert2 popup is shown
   */

  var isVisible$1 = function isVisible$$1() {
    return isVisible(getPopup());
  };
  /*
   * Global function to click 'Confirm' button
   */

  var clickConfirm = function clickConfirm() {
    return getConfirmButton() && getConfirmButton().click();
  };
  /*
   * Global function to click 'Cancel' button
   */

  var clickCancel = function clickCancel() {
    return getCancelButton() && getCancelButton().click();
  };

  function fire() {
    var Swal = this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _construct(Swal, args);
  }

  /**
   * Returns an extended version of `Swal` containing `params` as defaults.
   * Useful for reusing Swal configuration.
   *
   * For example:
   *
   * Before:
   * const textPromptOptions = { input: 'text', showCancelButton: true }
   * const {value: firstName} = await Swal.fire({ ...textPromptOptions, title: 'What is your first name?' })
   * const {value: lastName} = await Swal.fire({ ...textPromptOptions, title: 'What is your last name?' })
   *
   * After:
   * const TextPrompt = Swal.mixin({ input: 'text', showCancelButton: true })
   * const {value: firstName} = await TextPrompt('What is your first name?')
   * const {value: lastName} = await TextPrompt('What is your last name?')
   *
   * @param mixinParams
   */
  function mixin(mixinParams) {
    var MixinSwal = /*#__PURE__*/function (_this) {
      _inherits(MixinSwal, _this);

      function MixinSwal() {
        _classCallCheck(this, MixinSwal);

        return _possibleConstructorReturn(this, _getPrototypeOf(MixinSwal).apply(this, arguments));
      }

      _createClass(MixinSwal, [{
        key: "_main",
        value: function _main(params) {
          return _get(_getPrototypeOf(MixinSwal.prototype), "_main", this).call(this, _extends({}, mixinParams, params));
        }
      }]);

      return MixinSwal;
    }(this);

    return MixinSwal;
  }

  /**
   * Show spinner instead of Confirm button
   */

  var showLoading = function showLoading() {
    var popup = getPopup();

    if (!popup) {
      Swal.fire();
    }

    popup = getPopup();
    var actions = getActions();
    var confirmButton = getConfirmButton();
    show(actions);
    show(confirmButton, 'inline-block');
    addClass([popup, actions], swalClasses.loading);
    confirmButton.disabled = true;
    popup.setAttribute('data-loading', true);
    popup.setAttribute('aria-busy', true);
    popup.focus();
  };

  var RESTORE_FOCUS_TIMEOUT = 100;

  var globalState = {};

  var focusPreviousActiveElement = function focusPreviousActiveElement() {
    if (globalState.previousActiveElement && globalState.previousActiveElement.focus) {
      globalState.previousActiveElement.focus();
      globalState.previousActiveElement = null;
    } else if (document.body) {
      document.body.focus();
    }
  }; // Restore previous active (focused) element


  var restoreActiveElement = function restoreActiveElement() {
    return new Promise(function (resolve) {
      var x = window.scrollX;
      var y = window.scrollY;
      globalState.restoreFocusTimeout = setTimeout(function () {
        focusPreviousActiveElement();
        resolve();
      }, RESTORE_FOCUS_TIMEOUT); // issues/900

      /* istanbul ignore if */

      if (typeof x !== 'undefined' && typeof y !== 'undefined') {
        // IE doesn't have scrollX/scrollY support
        window.scrollTo(x, y);
      }
    });
  };

  /**
   * If `timer` parameter is set, returns number of milliseconds of timer remained.
   * Otherwise, returns undefined.
   */

  var getTimerLeft = function getTimerLeft() {
    return globalState.timeout && globalState.timeout.getTimerLeft();
  };
  /**
   * Stop timer. Returns number of milliseconds of timer remained.
   * If `timer` parameter isn't set, returns undefined.
   */

  var stopTimer = function stopTimer() {
    if (globalState.timeout) {
      stopTimerProgressBar();
      return globalState.timeout.stop();
    }
  };
  /**
   * Resume timer. Returns number of milliseconds of timer remained.
   * If `timer` parameter isn't set, returns undefined.
   */

  var resumeTimer = function resumeTimer() {
    if (globalState.timeout) {
      var remaining = globalState.timeout.start();
      animateTimerProgressBar(remaining);
      return remaining;
    }
  };
  /**
   * Resume timer. Returns number of milliseconds of timer remained.
   * If `timer` parameter isn't set, returns undefined.
   */

  var toggleTimer = function toggleTimer() {
    var timer = globalState.timeout;
    return timer && (timer.running ? stopTimer() : resumeTimer());
  };
  /**
   * Increase timer. Returns number of milliseconds of an updated timer.
   * If `timer` parameter isn't set, returns undefined.
   */

  var increaseTimer = function increaseTimer(n) {
    if (globalState.timeout) {
      var remaining = globalState.timeout.increase(n);
      animateTimerProgressBar(remaining, true);
      return remaining;
    }
  };
  /**
   * Check if timer is running. Returns true if timer is running
   * or false if timer is paused or stopped.
   * If `timer` parameter isn't set, returns undefined
   */

  var isTimerRunning = function isTimerRunning() {
    return globalState.timeout && globalState.timeout.isRunning();
  };

  var defaultParams = {
    title: '',
    titleText: '',
    text: '',
    html: '',
    footer: '',
    icon: undefined,
    iconHtml: undefined,
    toast: false,
    animation: true,
    showClass: {
      popup: 'swal2-show',
      backdrop: 'swal2-backdrop-show',
      icon: 'swal2-icon-show'
    },
    hideClass: {
      popup: 'swal2-hide',
      backdrop: 'swal2-backdrop-hide',
      icon: 'swal2-icon-hide'
    },
    customClass: undefined,
    target: 'body',
    backdrop: true,
    heightAuto: true,
    allowOutsideClick: true,
    allowEscapeKey: true,
    allowEnterKey: true,
    stopKeydownPropagation: true,
    keydownListenerCapture: false,
    showConfirmButton: true,
    showCancelButton: false,
    preConfirm: undefined,
    confirmButtonText: 'OK',
    confirmButtonAriaLabel: '',
    confirmButtonColor: undefined,
    cancelButtonText: 'Cancel',
    cancelButtonAriaLabel: '',
    cancelButtonColor: undefined,
    buttonsStyling: true,
    reverseButtons: false,
    focusConfirm: true,
    focusCancel: false,
    showCloseButton: false,
    closeButtonHtml: '&times;',
    closeButtonAriaLabel: 'Close this dialog',
    showLoaderOnConfirm: false,
    imageUrl: undefined,
    imageWidth: undefined,
    imageHeight: undefined,
    imageAlt: '',
    timer: undefined,
    timerProgressBar: false,
    width: undefined,
    padding: undefined,
    background: undefined,
    input: undefined,
    inputPlaceholder: '',
    inputValue: '',
    inputOptions: {},
    inputAutoTrim: true,
    inputAttributes: {},
    inputValidator: undefined,
    validationMessage: undefined,
    grow: false,
    position: 'center',
    progressSteps: [],
    currentProgressStep: undefined,
    progressStepsDistance: undefined,
    onBeforeOpen: undefined,
    onOpen: undefined,
    onRender: undefined,
    onClose: undefined,
    onAfterClose: undefined,
    onDestroy: undefined,
    scrollbarPadding: true
  };
  var updatableParams = ['title', 'titleText', 'text', 'html', 'icon', 'hideClass', 'customClass', 'allowOutsideClick', 'allowEscapeKey', 'showConfirmButton', 'showCancelButton', 'confirmButtonText', 'confirmButtonAriaLabel', 'confirmButtonColor', 'cancelButtonText', 'cancelButtonAriaLabel', 'cancelButtonColor', 'buttonsStyling', 'reverseButtons', 'imageUrl', 'imageWidth', 'imageHeight', 'imageAlt', 'progressSteps', 'currentProgressStep'];
  var deprecatedParams = {
    animation: 'showClass" and "hideClass'
  };
  var toastIncompatibleParams = ['allowOutsideClick', 'allowEnterKey', 'backdrop', 'focusConfirm', 'focusCancel', 'heightAuto', 'keydownListenerCapture'];
  /**
   * Is valid parameter
   * @param {String} paramName
   */

  var isValidParameter = function isValidParameter(paramName) {
    return Object.prototype.hasOwnProperty.call(defaultParams, paramName);
  };
  /**
   * Is valid parameter for Swal.update() method
   * @param {String} paramName
   */

  var isUpdatableParameter = function isUpdatableParameter(paramName) {
    return updatableParams.indexOf(paramName) !== -1;
  };
  /**
   * Is deprecated parameter
   * @param {String} paramName
   */

  var isDeprecatedParameter = function isDeprecatedParameter(paramName) {
    return deprecatedParams[paramName];
  };

  var checkIfParamIsValid = function checkIfParamIsValid(param) {
    if (!isValidParameter(param)) {
      warn("Unknown parameter \"".concat(param, "\""));
    }
  };

  var checkIfToastParamIsValid = function checkIfToastParamIsValid(param) {
    if (toastIncompatibleParams.indexOf(param) !== -1) {
      warn("The parameter \"".concat(param, "\" is incompatible with toasts"));
    }
  };

  var checkIfParamIsDeprecated = function checkIfParamIsDeprecated(param) {
    if (isDeprecatedParameter(param)) {
      warnAboutDepreation(param, isDeprecatedParameter(param));
    }
  };
  /**
   * Show relevant warnings for given params
   *
   * @param params
   */


  var showWarningsForParams = function showWarningsForParams(params) {
    for (var param in params) {
      checkIfParamIsValid(param);

      if (params.toast) {
        checkIfToastParamIsValid(param);
      }

      checkIfParamIsDeprecated(param);
    }
  };



  var staticMethods = /*#__PURE__*/Object.freeze({
    isValidParameter: isValidParameter,
    isUpdatableParameter: isUpdatableParameter,
    isDeprecatedParameter: isDeprecatedParameter,
    argsToParams: argsToParams,
    isVisible: isVisible$1,
    clickConfirm: clickConfirm,
    clickCancel: clickCancel,
    getContainer: getContainer,
    getPopup: getPopup,
    getTitle: getTitle,
    getContent: getContent,
    getHtmlContainer: getHtmlContainer,
    getImage: getImage,
    getIcon: getIcon,
    getIcons: getIcons,
    getCloseButton: getCloseButton,
    getActions: getActions,
    getConfirmButton: getConfirmButton,
    getCancelButton: getCancelButton,
    getHeader: getHeader,
    getFooter: getFooter,
    getTimerProgressBar: getTimerProgressBar,
    getFocusableElements: getFocusableElements,
    getValidationMessage: getValidationMessage,
    isLoading: isLoading,
    fire: fire,
    mixin: mixin,
    queue: queue,
    getQueueStep: getQueueStep,
    insertQueueStep: insertQueueStep,
    deleteQueueStep: deleteQueueStep,
    showLoading: showLoading,
    enableLoading: showLoading,
    getTimerLeft: getTimerLeft,
    stopTimer: stopTimer,
    resumeTimer: resumeTimer,
    toggleTimer: toggleTimer,
    increaseTimer: increaseTimer,
    isTimerRunning: isTimerRunning
  });

  /**
   * Enables buttons and hide loader.
   */

  function hideLoading() {
    // do nothing if popup is closed
    var innerParams = privateProps.innerParams.get(this);

    if (!innerParams) {
      return;
    }

    var domCache = privateProps.domCache.get(this);

    if (!innerParams.showConfirmButton) {
      hide(domCache.confirmButton);

      if (!innerParams.showCancelButton) {
        hide(domCache.actions);
      }
    }

    removeClass([domCache.popup, domCache.actions], swalClasses.loading);
    domCache.popup.removeAttribute('aria-busy');
    domCache.popup.removeAttribute('data-loading');
    domCache.confirmButton.disabled = false;
    domCache.cancelButton.disabled = false;
  }

  function getInput$1(instance) {
    var innerParams = privateProps.innerParams.get(instance || this);
    var domCache = privateProps.domCache.get(instance || this);

    if (!domCache) {
      return null;
    }

    return getInput(domCache.content, innerParams.input);
  }

  var fixScrollbar = function fixScrollbar() {
    // for queues, do not do this more than once
    if (states.previousBodyPadding !== null) {
      return;
    } // if the body has overflow


    if (document.body.scrollHeight > window.innerHeight) {
      // add padding so the content doesn't shift after removal of scrollbar
      states.previousBodyPadding = parseInt(window.getComputedStyle(document.body).getPropertyValue('padding-right'));
      document.body.style.paddingRight = "".concat(states.previousBodyPadding + measureScrollbar(), "px");
    }
  };
  var undoScrollbar = function undoScrollbar() {
    if (states.previousBodyPadding !== null) {
      document.body.style.paddingRight = "".concat(states.previousBodyPadding, "px");
      states.previousBodyPadding = null;
    }
  };

  /* istanbul ignore file */

  var iOSfix = function iOSfix() {
    var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream || navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;

    if (iOS && !hasClass(document.body, swalClasses.iosfix)) {
      var offset = document.body.scrollTop;
      document.body.style.top = "".concat(offset * -1, "px");
      addClass(document.body, swalClasses.iosfix);
      lockBodyScroll();
    }
  };

  var lockBodyScroll = function lockBodyScroll() {
    // #1246
    var container = getContainer();
    var preventTouchMove;

    container.ontouchstart = function (e) {
      preventTouchMove = e.target === container || !isScrollable(container) && e.target.tagName !== 'INPUT' // #1603
      ;
    };

    container.ontouchmove = function (e) {
      if (preventTouchMove) {
        e.preventDefault();
        e.stopPropagation();
      }
    };
  };

  var undoIOSfix = function undoIOSfix() {
    if (hasClass(document.body, swalClasses.iosfix)) {
      var offset = parseInt(document.body.style.top, 10);
      removeClass(document.body, swalClasses.iosfix);
      document.body.style.top = '';
      document.body.scrollTop = offset * -1;
    }
  };

  /* istanbul ignore file */

  var isIE11 = function isIE11() {
    return !!window.MSInputMethodContext && !!document.documentMode;
  }; // Fix IE11 centering sweetalert2/issues/933


  var fixVerticalPositionIE = function fixVerticalPositionIE() {
    var container = getContainer();
    var popup = getPopup();
    container.style.removeProperty('align-items');

    if (popup.offsetTop < 0) {
      container.style.alignItems = 'flex-start';
    }
  };

  var IEfix = function IEfix() {
    if (typeof window !== 'undefined' && isIE11()) {
      fixVerticalPositionIE();
      window.addEventListener('resize', fixVerticalPositionIE);
    }
  };
  var undoIEfix = function undoIEfix() {
    if (typeof window !== 'undefined' && isIE11()) {
      window.removeEventListener('resize', fixVerticalPositionIE);
    }
  };

  // Adding aria-hidden="true" to elements outside of the active modal dialog ensures that
  // elements not within the active modal dialog will not be surfaced if a user opens a screen
  // reader’s list of elements (headings, form controls, landmarks, etc.) in the document.

  var setAriaHidden = function setAriaHidden() {
    var bodyChildren = toArray(document.body.children);
    bodyChildren.forEach(function (el) {
      if (el === getContainer() || contains(el, getContainer())) {
        return;
      }

      if (el.hasAttribute('aria-hidden')) {
        el.setAttribute('data-previous-aria-hidden', el.getAttribute('aria-hidden'));
      }

      el.setAttribute('aria-hidden', 'true');
    });
  };
  var unsetAriaHidden = function unsetAriaHidden() {
    var bodyChildren = toArray(document.body.children);
    bodyChildren.forEach(function (el) {
      if (el.hasAttribute('data-previous-aria-hidden')) {
        el.setAttribute('aria-hidden', el.getAttribute('data-previous-aria-hidden'));
        el.removeAttribute('data-previous-aria-hidden');
      } else {
        el.removeAttribute('aria-hidden');
      }
    });
  };

  /**
   * This module containts `WeakMap`s for each effectively-"private  property" that a `Swal` has.
   * For example, to set the private property "foo" of `this` to "bar", you can `privateProps.foo.set(this, 'bar')`
   * This is the approach that Babel will probably take to implement private methods/fields
   *   https://github.com/tc39/proposal-private-methods
   *   https://github.com/babel/babel/pull/7555
   * Once we have the changes from that PR in Babel, and our core class fits reasonable in *one module*
   *   then we can use that language feature.
   */
  var privateMethods = {
    swalPromiseResolve: new WeakMap()
  };

  /*
   * Instance method to close sweetAlert
   */

  function removePopupAndResetState(instance, container, isToast$$1, onAfterClose) {
    if (isToast$$1) {
      triggerOnAfterCloseAndDispose(instance, onAfterClose);
    } else {
      restoreActiveElement().then(function () {
        return triggerOnAfterCloseAndDispose(instance, onAfterClose);
      });
      globalState.keydownTarget.removeEventListener('keydown', globalState.keydownHandler, {
        capture: globalState.keydownListenerCapture
      });
      globalState.keydownHandlerAdded = false;
    }

    if (container.parentNode && !document.body.getAttribute('data-swal2-queue-step')) {
      container.parentNode.removeChild(container);
    }

    if (isModal()) {
      undoScrollbar();
      undoIOSfix();
      undoIEfix();
      unsetAriaHidden();
    }

    removeBodyClasses();
  }

  function removeBodyClasses() {
    removeClass([document.documentElement, document.body], [swalClasses.shown, swalClasses['height-auto'], swalClasses['no-backdrop'], swalClasses['toast-shown'], swalClasses['toast-column']]);
  }

  function close(resolveValue) {
    var popup = getPopup();

    if (!popup) {
      return;
    }

    var innerParams = privateProps.innerParams.get(this);

    if (!innerParams || hasClass(popup, innerParams.hideClass.popup)) {
      return;
    }

    var swalPromiseResolve = privateMethods.swalPromiseResolve.get(this);
    removeClass(popup, innerParams.showClass.popup);
    addClass(popup, innerParams.hideClass.popup);
    var backdrop = getContainer();
    removeClass(backdrop, innerParams.showClass.backdrop);
    addClass(backdrop, innerParams.hideClass.backdrop);
    handlePopupAnimation(this, popup, innerParams); // Resolve Swal promise

    swalPromiseResolve(resolveValue || {});
  }

  var handlePopupAnimation = function handlePopupAnimation(instance, popup, innerParams) {
    var container = getContainer(); // If animation is supported, animate

    var animationIsSupported = animationEndEvent && hasCssAnimation(popup);
    var onClose = innerParams.onClose,
        onAfterClose = innerParams.onAfterClose;

    if (onClose !== null && typeof onClose === 'function') {
      onClose(popup);
    }

    if (animationIsSupported) {
      animatePopup(instance, popup, container, onAfterClose);
    } else {
      // Otherwise, remove immediately
      removePopupAndResetState(instance, container, isToast(), onAfterClose);
    }
  };

  var animatePopup = function animatePopup(instance, popup, container, onAfterClose) {
    globalState.swalCloseEventFinishedCallback = removePopupAndResetState.bind(null, instance, container, isToast(), onAfterClose);
    popup.addEventListener(animationEndEvent, function (e) {
      if (e.target === popup) {
        globalState.swalCloseEventFinishedCallback();
        delete globalState.swalCloseEventFinishedCallback;
      }
    });
  };

  var triggerOnAfterCloseAndDispose = function triggerOnAfterCloseAndDispose(instance, onAfterClose) {
    setTimeout(function () {
      if (typeof onAfterClose === 'function') {
        onAfterClose();
      }

      instance._destroy();
    });
  };

  function setButtonsDisabled(instance, buttons, disabled) {
    var domCache = privateProps.domCache.get(instance);
    buttons.forEach(function (button) {
      domCache[button].disabled = disabled;
    });
  }

  function setInputDisabled(input, disabled) {
    if (!input) {
      return false;
    }

    if (input.type === 'radio') {
      var radiosContainer = input.parentNode.parentNode;
      var radios = radiosContainer.querySelectorAll('input');

      for (var i = 0; i < radios.length; i++) {
        radios[i].disabled = disabled;
      }
    } else {
      input.disabled = disabled;
    }
  }

  function enableButtons() {
    setButtonsDisabled(this, ['confirmButton', 'cancelButton'], false);
  }
  function disableButtons() {
    setButtonsDisabled(this, ['confirmButton', 'cancelButton'], true);
  }
  function enableInput() {
    return setInputDisabled(this.getInput(), false);
  }
  function disableInput() {
    return setInputDisabled(this.getInput(), true);
  }

  function showValidationMessage(error) {
    var domCache = privateProps.domCache.get(this);
    domCache.validationMessage.innerHTML = error;
    var popupComputedStyle = window.getComputedStyle(domCache.popup);
    domCache.validationMessage.style.marginLeft = "-".concat(popupComputedStyle.getPropertyValue('padding-left'));
    domCache.validationMessage.style.marginRight = "-".concat(popupComputedStyle.getPropertyValue('padding-right'));
    show(domCache.validationMessage);
    var input = this.getInput();

    if (input) {
      input.setAttribute('aria-invalid', true);
      input.setAttribute('aria-describedBy', swalClasses['validation-message']);
      focusInput(input);
      addClass(input, swalClasses.inputerror);
    }
  } // Hide block with validation message

  function resetValidationMessage$1() {
    var domCache = privateProps.domCache.get(this);

    if (domCache.validationMessage) {
      hide(domCache.validationMessage);
    }

    var input = this.getInput();

    if (input) {
      input.removeAttribute('aria-invalid');
      input.removeAttribute('aria-describedBy');
      removeClass(input, swalClasses.inputerror);
    }
  }

  function getProgressSteps$1() {
    var domCache = privateProps.domCache.get(this);
    return domCache.progressSteps;
  }

  var Timer = /*#__PURE__*/function () {
    function Timer(callback, delay) {
      _classCallCheck(this, Timer);

      this.callback = callback;
      this.remaining = delay;
      this.running = false;
      this.start();
    }

    _createClass(Timer, [{
      key: "start",
      value: function start() {
        if (!this.running) {
          this.running = true;
          this.started = new Date();
          this.id = setTimeout(this.callback, this.remaining);
        }

        return this.remaining;
      }
    }, {
      key: "stop",
      value: function stop() {
        if (this.running) {
          this.running = false;
          clearTimeout(this.id);
          this.remaining -= new Date() - this.started;
        }

        return this.remaining;
      }
    }, {
      key: "increase",
      value: function increase(n) {
        var running = this.running;

        if (running) {
          this.stop();
        }

        this.remaining += n;

        if (running) {
          this.start();
        }

        return this.remaining;
      }
    }, {
      key: "getTimerLeft",
      value: function getTimerLeft() {
        if (this.running) {
          this.stop();
          this.start();
        }

        return this.remaining;
      }
    }, {
      key: "isRunning",
      value: function isRunning() {
        return this.running;
      }
    }]);

    return Timer;
  }();

  var defaultInputValidators = {
    email: function email(string, validationMessage) {
      return /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9-]{2,24}$/.test(string) ? Promise.resolve() : Promise.resolve(validationMessage || 'Invalid email address');
    },
    url: function url(string, validationMessage) {
      // taken from https://stackoverflow.com/a/3809435 with a small change from #1306
      return /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,63}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)$/.test(string) ? Promise.resolve() : Promise.resolve(validationMessage || 'Invalid URL');
    }
  };

  function setDefaultInputValidators(params) {
    // Use default `inputValidator` for supported input types if not provided
    if (!params.inputValidator) {
      Object.keys(defaultInputValidators).forEach(function (key) {
        if (params.input === key) {
          params.inputValidator = defaultInputValidators[key];
        }
      });
    }
  }

  function validateCustomTargetElement(params) {
    // Determine if the custom target element is valid
    if (!params.target || typeof params.target === 'string' && !document.querySelector(params.target) || typeof params.target !== 'string' && !params.target.appendChild) {
      warn('Target parameter is not valid, defaulting to "body"');
      params.target = 'body';
    }
  }
  /**
   * Set type, text and actions on popup
   *
   * @param params
   * @returns {boolean}
   */


  function setParameters(params) {
    setDefaultInputValidators(params); // showLoaderOnConfirm && preConfirm

    if (params.showLoaderOnConfirm && !params.preConfirm) {
      warn('showLoaderOnConfirm is set to true, but preConfirm is not defined.\n' + 'showLoaderOnConfirm should be used together with preConfirm, see usage example:\n' + 'https://sweetalert2.github.io/#ajax-request');
    } // params.animation will be actually used in renderPopup.js
    // but in case when params.animation is a function, we need to call that function
    // before popup (re)initialization, so it'll be possible to check Swal.isVisible()
    // inside the params.animation function


    params.animation = callIfFunction(params.animation);
    validateCustomTargetElement(params); // Replace newlines with <br> in title

    if (typeof params.title === 'string') {
      params.title = params.title.split('\n').join('<br />');
    }

    init(params);
  }

  /**
   * Open popup, add necessary classes and styles, fix scrollbar
   *
   * @param {Array} params
   */

  var openPopup = function openPopup(params) {
    var container = getContainer();
    var popup = getPopup();

    if (typeof params.onBeforeOpen === 'function') {
      params.onBeforeOpen(popup);
    }

    addClasses$1(container, popup, params); // scrolling is 'hidden' until animation is done, after that 'auto'

    setScrollingVisibility(container, popup);

    if (isModal()) {
      fixScrollContainer(container, params.scrollbarPadding);
    }

    if (!isToast() && !globalState.previousActiveElement) {
      globalState.previousActiveElement = document.activeElement;
    }

    if (typeof params.onOpen === 'function') {
      setTimeout(function () {
        return params.onOpen(popup);
      });
    }

    removeClass(container, swalClasses['no-transition']);
  };

  function swalOpenAnimationFinished(event) {
    var popup = getPopup();

    if (event.target !== popup) {
      return;
    }

    var container = getContainer();
    popup.removeEventListener(animationEndEvent, swalOpenAnimationFinished);
    container.style.overflowY = 'auto';
  }

  var setScrollingVisibility = function setScrollingVisibility(container, popup) {
    if (animationEndEvent && hasCssAnimation(popup)) {
      container.style.overflowY = 'hidden';
      popup.addEventListener(animationEndEvent, swalOpenAnimationFinished);
    } else {
      container.style.overflowY = 'auto';
    }
  };

  var fixScrollContainer = function fixScrollContainer(container, scrollbarPadding) {
    iOSfix();
    IEfix();
    setAriaHidden();

    if (scrollbarPadding) {
      fixScrollbar();
    } // sweetalert2/issues/1247


    setTimeout(function () {
      container.scrollTop = 0;
    });
  };

  var addClasses$1 = function addClasses(container, popup, params) {
    addClass(container, params.showClass.backdrop);
    show(popup); // Animate popup right after showing it

    addClass(popup, params.showClass.popup);
    addClass([document.documentElement, document.body], swalClasses.shown);

    if (params.heightAuto && params.backdrop && !params.toast) {
      addClass([document.documentElement, document.body], swalClasses['height-auto']);
    }
  };

  var handleInputOptionsAndValue = function handleInputOptionsAndValue(instance, params) {
    if (params.input === 'select' || params.input === 'radio') {
      handleInputOptions(instance, params);
    } else if (['text', 'email', 'number', 'tel', 'textarea'].indexOf(params.input) !== -1 && isPromise(params.inputValue)) {
      handleInputValue(instance, params);
    }
  };
  var getInputValue = function getInputValue(instance, innerParams) {
    var input = instance.getInput();

    if (!input) {
      return null;
    }

    switch (innerParams.input) {
      case 'checkbox':
        return getCheckboxValue(input);

      case 'radio':
        return getRadioValue(input);

      case 'file':
        return getFileValue(input);

      default:
        return innerParams.inputAutoTrim ? input.value.trim() : input.value;
    }
  };

  var getCheckboxValue = function getCheckboxValue(input) {
    return input.checked ? 1 : 0;
  };

  var getRadioValue = function getRadioValue(input) {
    return input.checked ? input.value : null;
  };

  var getFileValue = function getFileValue(input) {
    return input.files.length ? input.getAttribute('multiple') !== null ? input.files : input.files[0] : null;
  };

  var handleInputOptions = function handleInputOptions(instance, params) {
    var content = getContent();

    var processInputOptions = function processInputOptions(inputOptions) {
      return populateInputOptions[params.input](content, formatInputOptions(inputOptions), params);
    };

    if (isPromise(params.inputOptions)) {
      showLoading();
      params.inputOptions.then(function (inputOptions) {
        instance.hideLoading();
        processInputOptions(inputOptions);
      });
    } else if (_typeof(params.inputOptions) === 'object') {
      processInputOptions(params.inputOptions);
    } else {
      error("Unexpected type of inputOptions! Expected object, Map or Promise, got ".concat(_typeof(params.inputOptions)));
    }
  };

  var handleInputValue = function handleInputValue(instance, params) {
    var input = instance.getInput();
    hide(input);
    params.inputValue.then(function (inputValue) {
      input.value = params.input === 'number' ? parseFloat(inputValue) || 0 : "".concat(inputValue);
      show(input);
      input.focus();
      instance.hideLoading();
    })["catch"](function (err) {
      error("Error in inputValue promise: ".concat(err));
      input.value = '';
      show(input);
      input.focus();
      instance.hideLoading();
    });
  };

  var populateInputOptions = {
    select: function select(content, inputOptions, params) {
      var select = getChildByClass(content, swalClasses.select);
      inputOptions.forEach(function (inputOption) {
        var optionValue = inputOption[0];
        var optionLabel = inputOption[1];
        var option = document.createElement('option');
        option.value = optionValue;
        option.innerHTML = optionLabel;

        if (params.inputValue.toString() === optionValue.toString()) {
          option.selected = true;
        }

        select.appendChild(option);
      });
      select.focus();
    },
    radio: function radio(content, inputOptions, params) {
      var radio = getChildByClass(content, swalClasses.radio);
      inputOptions.forEach(function (inputOption) {
        var radioValue = inputOption[0];
        var radioLabel = inputOption[1];
        var radioInput = document.createElement('input');
        var radioLabelElement = document.createElement('label');
        radioInput.type = 'radio';
        radioInput.name = swalClasses.radio;
        radioInput.value = radioValue;

        if (params.inputValue.toString() === radioValue.toString()) {
          radioInput.checked = true;
        }

        var label = document.createElement('span');
        label.innerHTML = radioLabel;
        label.className = swalClasses.label;
        radioLabelElement.appendChild(radioInput);
        radioLabelElement.appendChild(label);
        radio.appendChild(radioLabelElement);
      });
      var radios = radio.querySelectorAll('input');

      if (radios.length) {
        radios[0].focus();
      }
    }
  };
  /**
   * Converts `inputOptions` into an array of `[value, label]`s
   * @param inputOptions
   */

  var formatInputOptions = function formatInputOptions(inputOptions) {
    var result = [];

    if (typeof Map !== 'undefined' && inputOptions instanceof Map) {
      inputOptions.forEach(function (value, key) {
        result.push([key, value]);
      });
    } else {
      Object.keys(inputOptions).forEach(function (key) {
        result.push([key, inputOptions[key]]);
      });
    }

    return result;
  };

  var handleConfirmButtonClick = function handleConfirmButtonClick(instance, innerParams) {
    instance.disableButtons();

    if (innerParams.input) {
      handleConfirmWithInput(instance, innerParams);
    } else {
      confirm(instance, innerParams, true);
    }
  };
  var handleCancelButtonClick = function handleCancelButtonClick(instance, dismissWith) {
    instance.disableButtons();
    dismissWith(DismissReason.cancel);
  };

  var handleConfirmWithInput = function handleConfirmWithInput(instance, innerParams) {
    var inputValue = getInputValue(instance, innerParams);

    if (innerParams.inputValidator) {
      instance.disableInput();
      var validationPromise = Promise.resolve().then(function () {
        return innerParams.inputValidator(inputValue, innerParams.validationMessage);
      });
      validationPromise.then(function (validationMessage) {
        instance.enableButtons();
        instance.enableInput();

        if (validationMessage) {
          instance.showValidationMessage(validationMessage);
        } else {
          confirm(instance, innerParams, inputValue);
        }
      });
    } else if (!instance.getInput().checkValidity()) {
      instance.enableButtons();
      instance.showValidationMessage(innerParams.validationMessage);
    } else {
      confirm(instance, innerParams, inputValue);
    }
  };

  var succeedWith = function succeedWith(instance, value) {
    instance.closePopup({
      value: value
    });
  };

  var confirm = function confirm(instance, innerParams, value) {
    if (innerParams.showLoaderOnConfirm) {
      showLoading(); // TODO: make showLoading an *instance* method
    }

    if (innerParams.preConfirm) {
      instance.resetValidationMessage();
      var preConfirmPromise = Promise.resolve().then(function () {
        return innerParams.preConfirm(value, innerParams.validationMessage);
      });
      preConfirmPromise.then(function (preConfirmValue) {
        if (isVisible(getValidationMessage()) || preConfirmValue === false) {
          instance.hideLoading();
        } else {
          succeedWith(instance, typeof preConfirmValue === 'undefined' ? value : preConfirmValue);
        }
      });
    } else {
      succeedWith(instance, value);
    }
  };

  var addKeydownHandler = function addKeydownHandler(instance, globalState, innerParams, dismissWith) {
    if (globalState.keydownTarget && globalState.keydownHandlerAdded) {
      globalState.keydownTarget.removeEventListener('keydown', globalState.keydownHandler, {
        capture: globalState.keydownListenerCapture
      });
      globalState.keydownHandlerAdded = false;
    }

    if (!innerParams.toast) {
      globalState.keydownHandler = function (e) {
        return keydownHandler(instance, e, dismissWith);
      };

      globalState.keydownTarget = innerParams.keydownListenerCapture ? window : getPopup();
      globalState.keydownListenerCapture = innerParams.keydownListenerCapture;
      globalState.keydownTarget.addEventListener('keydown', globalState.keydownHandler, {
        capture: globalState.keydownListenerCapture
      });
      globalState.keydownHandlerAdded = true;
    }
  }; // Focus handling

  var setFocus = function setFocus(innerParams, index, increment) {
    var focusableElements = getFocusableElements(); // search for visible elements and select the next possible match

    for (var i = 0; i < focusableElements.length; i++) {
      index = index + increment; // rollover to first item

      if (index === focusableElements.length) {
        index = 0; // go to last item
      } else if (index === -1) {
        index = focusableElements.length - 1;
      }

      return focusableElements[index].focus();
    } // no visible focusable elements, focus the popup


    getPopup().focus();
  };
  var arrowKeys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Left', 'Right', 'Up', 'Down' // IE11
  ];
  var escKeys = ['Escape', 'Esc' // IE11
  ];

  var keydownHandler = function keydownHandler(instance, e, dismissWith) {
    var innerParams = privateProps.innerParams.get(instance);

    if (innerParams.stopKeydownPropagation) {
      e.stopPropagation();
    } // ENTER


    if (e.key === 'Enter') {
      handleEnter(instance, e, innerParams); // TAB
    } else if (e.key === 'Tab') {
      handleTab(e, innerParams); // ARROWS - switch focus between buttons
    } else if (arrowKeys.indexOf(e.key) !== -1) {
      handleArrows(); // ESC
    } else if (escKeys.indexOf(e.key) !== -1) {
      handleEsc(e, innerParams, dismissWith);
    }
  };

  var handleEnter = function handleEnter(instance, e, innerParams) {
    // #720 #721
    if (e.isComposing) {
      return;
    }

    if (e.target && instance.getInput() && e.target.outerHTML === instance.getInput().outerHTML) {
      if (['textarea', 'file'].indexOf(innerParams.input) !== -1) {
        return; // do not submit
      }

      clickConfirm();
      e.preventDefault();
    }
  };

  var handleTab = function handleTab(e, innerParams) {
    var targetElement = e.target;
    var focusableElements = getFocusableElements();
    var btnIndex = -1;

    for (var i = 0; i < focusableElements.length; i++) {
      if (targetElement === focusableElements[i]) {
        btnIndex = i;
        break;
      }
    }

    if (!e.shiftKey) {
      // Cycle to the next button
      setFocus(innerParams, btnIndex, 1);
    } else {
      // Cycle to the prev button
      setFocus(innerParams, btnIndex, -1);
    }

    e.stopPropagation();
    e.preventDefault();
  };

  var handleArrows = function handleArrows() {
    var confirmButton = getConfirmButton();
    var cancelButton = getCancelButton(); // focus Cancel button if Confirm button is currently focused

    if (document.activeElement === confirmButton && isVisible(cancelButton)) {
      cancelButton.focus(); // and vice versa
    } else if (document.activeElement === cancelButton && isVisible(confirmButton)) {
      confirmButton.focus();
    }
  };

  var handleEsc = function handleEsc(e, innerParams, dismissWith) {
    if (callIfFunction(innerParams.allowEscapeKey)) {
      e.preventDefault();
      dismissWith(DismissReason.esc);
    }
  };

  var handlePopupClick = function handlePopupClick(instance, domCache, dismissWith) {
    var innerParams = privateProps.innerParams.get(instance);

    if (innerParams.toast) {
      handleToastClick(instance, domCache, dismissWith);
    } else {
      // Ignore click events that had mousedown on the popup but mouseup on the container
      // This can happen when the user drags a slider
      handleModalMousedown(domCache); // Ignore click events that had mousedown on the container but mouseup on the popup

      handleContainerMousedown(domCache);
      handleModalClick(instance, domCache, dismissWith);
    }
  };

  var handleToastClick = function handleToastClick(instance, domCache, dismissWith) {
    // Closing toast by internal click
    domCache.popup.onclick = function () {
      var innerParams = privateProps.innerParams.get(instance);

      if (innerParams.showConfirmButton || innerParams.showCancelButton || innerParams.showCloseButton || innerParams.input) {
        return;
      }

      dismissWith(DismissReason.close);
    };
  };

  var ignoreOutsideClick = false;

  var handleModalMousedown = function handleModalMousedown(domCache) {
    domCache.popup.onmousedown = function () {
      domCache.container.onmouseup = function (e) {
        domCache.container.onmouseup = undefined; // We only check if the mouseup target is the container because usually it doesn't
        // have any other direct children aside of the popup

        if (e.target === domCache.container) {
          ignoreOutsideClick = true;
        }
      };
    };
  };

  var handleContainerMousedown = function handleContainerMousedown(domCache) {
    domCache.container.onmousedown = function () {
      domCache.popup.onmouseup = function (e) {
        domCache.popup.onmouseup = undefined; // We also need to check if the mouseup target is a child of the popup

        if (e.target === domCache.popup || domCache.popup.contains(e.target)) {
          ignoreOutsideClick = true;
        }
      };
    };
  };

  var handleModalClick = function handleModalClick(instance, domCache, dismissWith) {
    domCache.container.onclick = function (e) {
      var innerParams = privateProps.innerParams.get(instance);

      if (ignoreOutsideClick) {
        ignoreOutsideClick = false;
        return;
      }

      if (e.target === domCache.container && callIfFunction(innerParams.allowOutsideClick)) {
        dismissWith(DismissReason.backdrop);
      }
    };
  };

  function _main(userParams) {
    showWarningsForParams(userParams);

    if (globalState.currentInstance) {
      globalState.currentInstance._destroy();
    }

    globalState.currentInstance = this;
    var innerParams = prepareParams(userParams);
    setParameters(innerParams);
    Object.freeze(innerParams); // clear the previous timer

    if (globalState.timeout) {
      globalState.timeout.stop();
      delete globalState.timeout;
    } // clear the restore focus timeout


    clearTimeout(globalState.restoreFocusTimeout);
    var domCache = populateDomCache(this);
    render(this, innerParams);
    privateProps.innerParams.set(this, innerParams);
    return swalPromise(this, domCache, innerParams);
  }

  var prepareParams = function prepareParams(userParams) {
    var showClass = _extends({}, defaultParams.showClass, userParams.showClass);

    var hideClass = _extends({}, defaultParams.hideClass, userParams.hideClass);

    var params = _extends({}, defaultParams, userParams);

    params.showClass = showClass;
    params.hideClass = hideClass; // @deprecated

    if (userParams.animation === false) {
      params.showClass = {
        popup: 'swal2-noanimation',
        backdrop: 'swal2-noanimation'
      };
      params.hideClass = {};
    }

    return params;
  };

  var swalPromise = function swalPromise(instance, domCache, innerParams) {
    return new Promise(function (resolve) {
      // functions to handle all closings/dismissals
      var dismissWith = function dismissWith(dismiss) {
        instance.closePopup({
          dismiss: dismiss
        });
      };

      privateMethods.swalPromiseResolve.set(instance, resolve);

      domCache.confirmButton.onclick = function () {
        return handleConfirmButtonClick(instance, innerParams);
      };

      domCache.cancelButton.onclick = function () {
        return handleCancelButtonClick(instance, dismissWith);
      };

      domCache.closeButton.onclick = function () {
        return dismissWith(DismissReason.close);
      };

      handlePopupClick(instance, domCache, dismissWith);
      addKeydownHandler(instance, globalState, innerParams, dismissWith);

      if (innerParams.toast && (innerParams.input || innerParams.footer || innerParams.showCloseButton)) {
        addClass(document.body, swalClasses['toast-column']);
      } else {
        removeClass(document.body, swalClasses['toast-column']);
      }

      handleInputOptionsAndValue(instance, innerParams);
      openPopup(innerParams);
      setupTimer(globalState, innerParams, dismissWith);
      initFocus(domCache, innerParams); // Scroll container to top on open (#1247)

      domCache.container.scrollTop = 0;
    });
  };

  var populateDomCache = function populateDomCache(instance) {
    var domCache = {
      popup: getPopup(),
      container: getContainer(),
      content: getContent(),
      actions: getActions(),
      confirmButton: getConfirmButton(),
      cancelButton: getCancelButton(),
      closeButton: getCloseButton(),
      validationMessage: getValidationMessage(),
      progressSteps: getProgressSteps()
    };
    privateProps.domCache.set(instance, domCache);
    return domCache;
  };

  var setupTimer = function setupTimer(globalState$$1, innerParams, dismissWith) {
    var timerProgressBar = getTimerProgressBar();
    hide(timerProgressBar);

    if (innerParams.timer) {
      globalState$$1.timeout = new Timer(function () {
        dismissWith('timer');
        delete globalState$$1.timeout;
      }, innerParams.timer);

      if (innerParams.timerProgressBar) {
        show(timerProgressBar);
        setTimeout(function () {
          if (globalState$$1.timeout.running) {
            // timer can be already stopped at this point
            animateTimerProgressBar(innerParams.timer);
          }
        });
      }
    }
  };

  var initFocus = function initFocus(domCache, innerParams) {
    if (innerParams.toast) {
      return;
    }

    if (!callIfFunction(innerParams.allowEnterKey)) {
      return blurActiveElement();
    }

    if (innerParams.focusCancel && isVisible(domCache.cancelButton)) {
      return domCache.cancelButton.focus();
    }

    if (innerParams.focusConfirm && isVisible(domCache.confirmButton)) {
      return domCache.confirmButton.focus();
    }

    setFocus(innerParams, -1, 1);
  };

  var blurActiveElement = function blurActiveElement() {
    if (document.activeElement && typeof document.activeElement.blur === 'function') {
      document.activeElement.blur();
    }
  };

  /**
   * Updates popup parameters.
   */

  function update(params) {
    var popup = getPopup();
    var innerParams = privateProps.innerParams.get(this);

    if (!popup || hasClass(popup, innerParams.hideClass.popup)) {
      return warn("You're trying to update the closed or closing popup, that won't work. Use the update() method in preConfirm parameter or show a new popup.");
    }

    var validUpdatableParams = {}; // assign valid params from `params` to `defaults`

    Object.keys(params).forEach(function (param) {
      if (Swal.isUpdatableParameter(param)) {
        validUpdatableParams[param] = params[param];
      } else {
        warn("Invalid parameter to update: \"".concat(param, "\". Updatable params are listed here: https://github.com/sweetalert2/sweetalert2/blob/master/src/utils/params.js"));
      }
    });

    var updatedParams = _extends({}, innerParams, validUpdatableParams);

    render(this, updatedParams);
    privateProps.innerParams.set(this, updatedParams);
    Object.defineProperties(this, {
      params: {
        value: _extends({}, this.params, params),
        writable: false,
        enumerable: true
      }
    });
  }

  function _destroy() {
    var domCache = privateProps.domCache.get(this);
    var innerParams = privateProps.innerParams.get(this);

    if (!innerParams) {
      return; // This instance has already been destroyed
    } // Check if there is another Swal closing


    if (domCache.popup && globalState.swalCloseEventFinishedCallback) {
      globalState.swalCloseEventFinishedCallback();
      delete globalState.swalCloseEventFinishedCallback;
    } // Check if there is a swal disposal defer timer


    if (globalState.deferDisposalTimer) {
      clearTimeout(globalState.deferDisposalTimer);
      delete globalState.deferDisposalTimer;
    }

    if (typeof innerParams.onDestroy === 'function') {
      innerParams.onDestroy();
    }

    disposeSwal(this);
  }

  var disposeSwal = function disposeSwal(instance) {
    // Unset this.params so GC will dispose it (#1569)
    delete instance.params; // Unset globalState props so GC will dispose globalState (#1569)

    delete globalState.keydownHandler;
    delete globalState.keydownTarget; // Unset WeakMaps so GC will be able to dispose them (#1569)

    unsetWeakMaps(privateProps);
    unsetWeakMaps(privateMethods);
  };

  var unsetWeakMaps = function unsetWeakMaps(obj) {
    for (var i in obj) {
      obj[i] = new WeakMap();
    }
  };



  var instanceMethods = /*#__PURE__*/Object.freeze({
    hideLoading: hideLoading,
    disableLoading: hideLoading,
    getInput: getInput$1,
    close: close,
    closePopup: close,
    closeModal: close,
    closeToast: close,
    enableButtons: enableButtons,
    disableButtons: disableButtons,
    enableInput: enableInput,
    disableInput: disableInput,
    showValidationMessage: showValidationMessage,
    resetValidationMessage: resetValidationMessage$1,
    getProgressSteps: getProgressSteps$1,
    _main: _main,
    update: update,
    _destroy: _destroy
  });

  var currentInstance; // SweetAlert constructor

  function SweetAlert() {
    // Prevent run in Node env

    /* istanbul ignore if */
    if (typeof window === 'undefined') {
      return;
    } // Check for the existence of Promise

    /* istanbul ignore if */


    if (typeof Promise === 'undefined') {
      error('This package requires a Promise library, please include a shim to enable it in this browser (See: https://github.com/sweetalert2/sweetalert2/wiki/Migration-from-SweetAlert-to-SweetAlert2#1-ie-support)');
    }

    currentInstance = this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var outerParams = Object.freeze(this.constructor.argsToParams(args));
    Object.defineProperties(this, {
      params: {
        value: outerParams,
        writable: false,
        enumerable: true,
        configurable: true
      }
    });

    var promise = this._main(this.params);

    privateProps.promise.set(this, promise);
  } // `catch` cannot be the name of a module export, so we define our thenable methods here instead


  SweetAlert.prototype.then = function (onFulfilled) {
    var promise = privateProps.promise.get(this);
    return promise.then(onFulfilled);
  };

  SweetAlert.prototype["finally"] = function (onFinally) {
    var promise = privateProps.promise.get(this);
    return promise["finally"](onFinally);
  }; // Assign instance methods from src/instanceMethods/*.js to prototype


  _extends(SweetAlert.prototype, instanceMethods); // Assign static methods from src/staticMethods/*.js to constructor


  _extends(SweetAlert, staticMethods); // Proxy to instance methods to constructor, for now, for backwards compatibility


  Object.keys(instanceMethods).forEach(function (key) {
    SweetAlert[key] = function () {
      if (currentInstance) {
        var _currentInstance;

        return (_currentInstance = currentInstance)[key].apply(_currentInstance, arguments);
      }
    };
  });
  SweetAlert.DismissReason = DismissReason;
  SweetAlert.version = '9.10.6';

  var Swal = SweetAlert;
  Swal["default"] = Swal;

  return Swal;

}));
if (typeof this !== 'undefined' && this.Sweetalert2){  this.swal = this.sweetAlert = this.Swal = this.SweetAlert = this.Sweetalert2}

;/*\
|*| ========================================================================
|*| Bootstrap Toggle: bootstrap4-toggle.js v3.6.1
|*| https://gitbrent.github.io/bootstrap4-toggle/
|*| ========================================================================
|*| Copyright 2018-2019 Brent Ely
|*| Licensed under MIT
|*| ========================================================================
\*/
!function(a){"use strict";function l(t,e){this.$element=a(t),this.options=a.extend({},this.defaults(),e),this.render()}l.VERSION="3.6.0",l.DEFAULTS={on:"On",off:"Off",onstyle:"primary",offstyle:"light",size:"normal",style:"",width:null,height:null},l.prototype.defaults=function(){return{on:this.$element.attr("data-on")||l.DEFAULTS.on,off:this.$element.attr("data-off")||l.DEFAULTS.off,onstyle:this.$element.attr("data-onstyle")||l.DEFAULTS.onstyle,offstyle:this.$element.attr("data-offstyle")||l.DEFAULTS.offstyle,size:this.$element.attr("data-size")||l.DEFAULTS.size,style:this.$element.attr("data-style")||l.DEFAULTS.style,width:this.$element.attr("data-width")||l.DEFAULTS.width,height:this.$element.attr("data-height")||l.DEFAULTS.height}},l.prototype.render=function(){this._onstyle="btn-"+this.options.onstyle,this._offstyle="btn-"+this.options.offstyle;var t="large"===this.options.size||"lg"===this.options.size?"btn-lg":"small"===this.options.size||"sm"===this.options.size?"btn-sm":"mini"===this.options.size||"xs"===this.options.size?"btn-xs":"",e=a('<label for="'+this.$element.prop("id")+'" class="btn">').html(this.options.on).addClass(this._onstyle+" "+t),s=a('<label for="'+this.$element.prop("id")+'" class="btn">').html(this.options.off).addClass(this._offstyle+" "+t),o=a('<span class="toggle-handle btn btn-light">').addClass(t),i=a('<div class="toggle-group">').append(e,s,o),l=a('<div class="toggle btn" data-toggle="toggle" role="button">').addClass(this.$element.prop("checked")?this._onstyle:this._offstyle+" off").addClass(t).addClass(this.options.style);this.$element.wrap(l),a.extend(this,{$toggle:this.$element.parent(),$toggleOn:e,$toggleOff:s,$toggleGroup:i}),this.$toggle.append(i);var n=this.options.width||Math.max(e.outerWidth(),s.outerWidth())+o.outerWidth()/2,h=this.options.height||Math.max(e.outerHeight(),s.outerHeight());e.addClass("toggle-on"),s.addClass("toggle-off"),this.$toggle.css({width:n,height:h}),this.options.height&&(e.css("line-height",e.height()+"px"),s.css("line-height",s.height()+"px")),this.update(!0),this.trigger(!0)},l.prototype.toggle=function(){this.$element.prop("checked")?this.off():this.on()},l.prototype.on=function(t){if(this.$element.prop("disabled"))return!1;this.$toggle.removeClass(this._offstyle+" off").addClass(this._onstyle),this.$element.prop("checked",!0),t||this.trigger()},l.prototype.off=function(t){if(this.$element.prop("disabled"))return!1;this.$toggle.removeClass(this._onstyle).addClass(this._offstyle+" off"),this.$element.prop("checked",!1),t||this.trigger()},l.prototype.enable=function(){this.$toggle.removeClass("disabled"),this.$toggle.removeAttr("disabled"),this.$element.prop("disabled",!1)},l.prototype.disable=function(){this.$toggle.addClass("disabled"),this.$toggle.attr("disabled","disabled"),this.$element.prop("disabled",!0)},l.prototype.update=function(t){this.$element.prop("disabled")?this.disable():this.enable(),this.$element.prop("checked")?this.on(t):this.off(t)},l.prototype.trigger=function(t){this.$element.off("change.bs.toggle"),t||this.$element.change(),this.$element.on("change.bs.toggle",a.proxy(function(){this.update()},this))},l.prototype.destroy=function(){this.$element.off("change.bs.toggle"),this.$toggleGroup.remove(),this.$element.removeData("bs.toggle"),this.$element.unwrap()};var t=a.fn.bootstrapToggle;a.fn.bootstrapToggle=function(o){var i=Array.prototype.slice.call(arguments,1)[0];return this.each(function(){var t=a(this),e=t.data("bs.toggle"),s="object"==typeof o&&o;e||t.data("bs.toggle",e=new l(this,s)),"string"==typeof o&&e[o]&&"boolean"==typeof i?e[o](i):"string"==typeof o&&e[o]&&e[o]()})},a.fn.bootstrapToggle.Constructor=l,a.fn.toggle.noConflict=function(){return a.fn.bootstrapToggle=t,this},a(function(){a("input[type=checkbox][data-toggle^=toggle]").bootstrapToggle()}),a(document).on("click.bs.toggle","div[data-toggle^=toggle]",function(t){a(this).find("input[type=checkbox]").bootstrapToggle("toggle"),t.preventDefault()})}(jQuery);
//# sourceMappingURL=bootstrap4-toggle.min.js.map

;