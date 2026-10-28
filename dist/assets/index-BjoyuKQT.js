(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function n(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=n(r);fetch(r.href,s)}})();function t_(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var Fg={exports:{}},Lc={},kg={exports:{}},ut={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Aa=Symbol.for("react.element"),n_=Symbol.for("react.portal"),i_=Symbol.for("react.fragment"),r_=Symbol.for("react.strict_mode"),s_=Symbol.for("react.profiler"),o_=Symbol.for("react.provider"),a_=Symbol.for("react.context"),l_=Symbol.for("react.forward_ref"),c_=Symbol.for("react.suspense"),u_=Symbol.for("react.memo"),d_=Symbol.for("react.lazy"),Uh=Symbol.iterator;function f_(t){return t===null||typeof t!="object"?null:(t=Uh&&t[Uh]||t["@@iterator"],typeof t=="function"?t:null)}var zg={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Bg=Object.assign,Hg={};function xo(t,e,n){this.props=t,this.context=e,this.refs=Hg,this.updater=n||zg}xo.prototype.isReactComponent={};xo.prototype.setState=function(t,e){if(typeof t!="object"&&typeof t!="function"&&t!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,t,e,"setState")};xo.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")};function Gg(){}Gg.prototype=xo.prototype;function Tf(t,e,n){this.props=t,this.context=e,this.refs=Hg,this.updater=n||zg}var bf=Tf.prototype=new Gg;bf.constructor=Tf;Bg(bf,xo.prototype);bf.isPureReactComponent=!0;var Oh=Array.isArray,Vg=Object.prototype.hasOwnProperty,Af={current:null},Wg={key:!0,ref:!0,__self:!0,__source:!0};function jg(t,e,n){var i,r={},s=null,o=null;if(e!=null)for(i in e.ref!==void 0&&(o=e.ref),e.key!==void 0&&(s=""+e.key),e)Vg.call(e,i)&&!Wg.hasOwnProperty(i)&&(r[i]=e[i]);var a=arguments.length-2;if(a===1)r.children=n;else if(1<a){for(var l=Array(a),c=0;c<a;c++)l[c]=arguments[c+2];r.children=l}if(t&&t.defaultProps)for(i in a=t.defaultProps,a)r[i]===void 0&&(r[i]=a[i]);return{$$typeof:Aa,type:t,key:s,ref:o,props:r,_owner:Af.current}}function h_(t,e){return{$$typeof:Aa,type:t.type,key:e,ref:t.ref,props:t.props,_owner:t._owner}}function Cf(t){return typeof t=="object"&&t!==null&&t.$$typeof===Aa}function p_(t){var e={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,function(n){return e[n]})}var Fh=/\/+/g;function tu(t,e){return typeof t=="object"&&t!==null&&t.key!=null?p_(""+t.key):e.toString(36)}function Dl(t,e,n,i,r){var s=typeof t;(s==="undefined"||s==="boolean")&&(t=null);var o=!1;if(t===null)o=!0;else switch(s){case"string":case"number":o=!0;break;case"object":switch(t.$$typeof){case Aa:case n_:o=!0}}if(o)return o=t,r=r(o),t=i===""?"."+tu(o,0):i,Oh(r)?(n="",t!=null&&(n=t.replace(Fh,"$&/")+"/"),Dl(r,e,n,"",function(c){return c})):r!=null&&(Cf(r)&&(r=h_(r,n+(!r.key||o&&o.key===r.key?"":(""+r.key).replace(Fh,"$&/")+"/")+t)),e.push(r)),1;if(o=0,i=i===""?".":i+":",Oh(t))for(var a=0;a<t.length;a++){s=t[a];var l=i+tu(s,a);o+=Dl(s,e,n,l,r)}else if(l=f_(t),typeof l=="function")for(t=l.call(t),a=0;!(s=t.next()).done;)s=s.value,l=i+tu(s,a++),o+=Dl(s,e,n,l,r);else if(s==="object")throw e=String(t),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.");return o}function Ia(t,e,n){if(t==null)return t;var i=[],r=0;return Dl(t,i,"","",function(s){return e.call(n,s,r++)}),i}function m_(t){if(t._status===-1){var e=t._result;e=e(),e.then(function(n){(t._status===0||t._status===-1)&&(t._status=1,t._result=n)},function(n){(t._status===0||t._status===-1)&&(t._status=2,t._result=n)}),t._status===-1&&(t._status=0,t._result=e)}if(t._status===1)return t._result.default;throw t._result}var bn={current:null},Il={transition:null},g_={ReactCurrentDispatcher:bn,ReactCurrentBatchConfig:Il,ReactCurrentOwner:Af};function Xg(){throw Error("act(...) is not supported in production builds of React.")}ut.Children={map:Ia,forEach:function(t,e,n){Ia(t,function(){e.apply(this,arguments)},n)},count:function(t){var e=0;return Ia(t,function(){e++}),e},toArray:function(t){return Ia(t,function(e){return e})||[]},only:function(t){if(!Cf(t))throw Error("React.Children.only expected to receive a single React element child.");return t}};ut.Component=xo;ut.Fragment=i_;ut.Profiler=s_;ut.PureComponent=Tf;ut.StrictMode=r_;ut.Suspense=c_;ut.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=g_;ut.act=Xg;ut.cloneElement=function(t,e,n){if(t==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+t+".");var i=Bg({},t.props),r=t.key,s=t.ref,o=t._owner;if(e!=null){if(e.ref!==void 0&&(s=e.ref,o=Af.current),e.key!==void 0&&(r=""+e.key),t.type&&t.type.defaultProps)var a=t.type.defaultProps;for(l in e)Vg.call(e,l)&&!Wg.hasOwnProperty(l)&&(i[l]=e[l]===void 0&&a!==void 0?a[l]:e[l])}var l=arguments.length-2;if(l===1)i.children=n;else if(1<l){a=Array(l);for(var c=0;c<l;c++)a[c]=arguments[c+2];i.children=a}return{$$typeof:Aa,type:t.type,key:r,ref:s,props:i,_owner:o}};ut.createContext=function(t){return t={$$typeof:a_,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},t.Provider={$$typeof:o_,_context:t},t.Consumer=t};ut.createElement=jg;ut.createFactory=function(t){var e=jg.bind(null,t);return e.type=t,e};ut.createRef=function(){return{current:null}};ut.forwardRef=function(t){return{$$typeof:l_,render:t}};ut.isValidElement=Cf;ut.lazy=function(t){return{$$typeof:d_,_payload:{_status:-1,_result:t},_init:m_}};ut.memo=function(t,e){return{$$typeof:u_,type:t,compare:e===void 0?null:e}};ut.startTransition=function(t){var e=Il.transition;Il.transition={};try{t()}finally{Il.transition=e}};ut.unstable_act=Xg;ut.useCallback=function(t,e){return bn.current.useCallback(t,e)};ut.useContext=function(t){return bn.current.useContext(t)};ut.useDebugValue=function(){};ut.useDeferredValue=function(t){return bn.current.useDeferredValue(t)};ut.useEffect=function(t,e){return bn.current.useEffect(t,e)};ut.useId=function(){return bn.current.useId()};ut.useImperativeHandle=function(t,e,n){return bn.current.useImperativeHandle(t,e,n)};ut.useInsertionEffect=function(t,e){return bn.current.useInsertionEffect(t,e)};ut.useLayoutEffect=function(t,e){return bn.current.useLayoutEffect(t,e)};ut.useMemo=function(t,e){return bn.current.useMemo(t,e)};ut.useReducer=function(t,e,n){return bn.current.useReducer(t,e,n)};ut.useRef=function(t){return bn.current.useRef(t)};ut.useState=function(t){return bn.current.useState(t)};ut.useSyncExternalStore=function(t,e,n){return bn.current.useSyncExternalStore(t,e,n)};ut.useTransition=function(){return bn.current.useTransition()};ut.version="18.3.1";kg.exports=ut;var we=kg.exports;const x_=t_(we);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var v_=we,__=Symbol.for("react.element"),y_=Symbol.for("react.fragment"),S_=Object.prototype.hasOwnProperty,E_=v_.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,M_={key:!0,ref:!0,__self:!0,__source:!0};function $g(t,e,n){var i,r={},s=null,o=null;n!==void 0&&(s=""+n),e.key!==void 0&&(s=""+e.key),e.ref!==void 0&&(o=e.ref);for(i in e)S_.call(e,i)&&!M_.hasOwnProperty(i)&&(r[i]=e[i]);if(t&&t.defaultProps)for(i in e=t.defaultProps,e)r[i]===void 0&&(r[i]=e[i]);return{$$typeof:__,type:t,key:s,ref:o,props:r,_owner:E_.current}}Lc.Fragment=y_;Lc.jsx=$g;Lc.jsxs=$g;Fg.exports=Lc;var S=Fg.exports,pd={},Yg={exports:{}},Yn={},qg={exports:{}},Zg={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(t){function e(U,J){var O=U.length;U.push(J);e:for(;0<O;){var le=O-1>>>1,ce=U[le];if(0<r(ce,J))U[le]=J,U[O]=ce,O=le;else break e}}function n(U){return U.length===0?null:U[0]}function i(U){if(U.length===0)return null;var J=U[0],O=U.pop();if(O!==J){U[0]=O;e:for(var le=0,ce=U.length,Q=ce>>>1;le<Q;){var de=2*(le+1)-1,ye=U[de],be=de+1,Ne=U[be];if(0>r(ye,O))be<ce&&0>r(Ne,ye)?(U[le]=Ne,U[be]=O,le=be):(U[le]=ye,U[de]=O,le=de);else if(be<ce&&0>r(Ne,O))U[le]=Ne,U[be]=O,le=be;else break e}}return J}function r(U,J){var O=U.sortIndex-J.sortIndex;return O!==0?O:U.id-J.id}if(typeof performance=="object"&&typeof performance.now=="function"){var s=performance;t.unstable_now=function(){return s.now()}}else{var o=Date,a=o.now();t.unstable_now=function(){return o.now()-a}}var l=[],c=[],d=1,f=null,h=3,p=!1,g=!1,_=!1,m=typeof setTimeout=="function"?setTimeout:null,u=typeof clearTimeout=="function"?clearTimeout:null,v=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function x(U){for(var J=n(c);J!==null;){if(J.callback===null)i(c);else if(J.startTime<=U)i(c),J.sortIndex=J.expirationTime,e(l,J);else break;J=n(c)}}function y(U){if(_=!1,x(U),!g)if(n(l)!==null)g=!0,te(A);else{var J=n(c);J!==null&&K(y,J.startTime-U)}}function A(U,J){g=!1,_&&(_=!1,u(z),z=-1),p=!0;var O=h;try{for(x(J),f=n(l);f!==null&&(!(f.expirationTime>J)||U&&!V());){var le=f.callback;if(typeof le=="function"){f.callback=null,h=f.priorityLevel;var ce=le(f.expirationTime<=J);J=t.unstable_now(),typeof ce=="function"?f.callback=ce:f===n(l)&&i(l),x(J)}else i(l);f=n(l)}if(f!==null)var Q=!0;else{var de=n(c);de!==null&&K(y,de.startTime-J),Q=!1}return Q}finally{f=null,h=O,p=!1}}var w=!1,T=null,z=-1,E=5,b=-1;function V(){return!(t.unstable_now()-b<E)}function X(){if(T!==null){var U=t.unstable_now();b=U;var J=!0;try{J=T(!0,U)}finally{J?pe():(w=!1,T=null)}}else w=!1}var pe;if(typeof v=="function")pe=function(){v(X)};else if(typeof MessageChannel<"u"){var F=new MessageChannel,W=F.port2;F.port1.onmessage=X,pe=function(){W.postMessage(null)}}else pe=function(){m(X,0)};function te(U){T=U,w||(w=!0,pe())}function K(U,J){z=m(function(){U(t.unstable_now())},J)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(U){U.callback=null},t.unstable_continueExecution=function(){g||p||(g=!0,te(A))},t.unstable_forceFrameRate=function(U){0>U||125<U?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):E=0<U?Math.floor(1e3/U):5},t.unstable_getCurrentPriorityLevel=function(){return h},t.unstable_getFirstCallbackNode=function(){return n(l)},t.unstable_next=function(U){switch(h){case 1:case 2:case 3:var J=3;break;default:J=h}var O=h;h=J;try{return U()}finally{h=O}},t.unstable_pauseExecution=function(){},t.unstable_requestPaint=function(){},t.unstable_runWithPriority=function(U,J){switch(U){case 1:case 2:case 3:case 4:case 5:break;default:U=3}var O=h;h=U;try{return J()}finally{h=O}},t.unstable_scheduleCallback=function(U,J,O){var le=t.unstable_now();switch(typeof O=="object"&&O!==null?(O=O.delay,O=typeof O=="number"&&0<O?le+O:le):O=le,U){case 1:var ce=-1;break;case 2:ce=250;break;case 5:ce=1073741823;break;case 4:ce=1e4;break;default:ce=5e3}return ce=O+ce,U={id:d++,callback:J,priorityLevel:U,startTime:O,expirationTime:ce,sortIndex:-1},O>le?(U.sortIndex=O,e(c,U),n(l)===null&&U===n(c)&&(_?(u(z),z=-1):_=!0,K(y,O-le))):(U.sortIndex=ce,e(l,U),g||p||(g=!0,te(A))),U},t.unstable_shouldYield=V,t.unstable_wrapCallback=function(U){var J=h;return function(){var O=h;h=J;try{return U.apply(this,arguments)}finally{h=O}}}})(Zg);qg.exports=Zg;var w_=qg.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var T_=we,$n=w_;function _e(t){for(var e="https://reactjs.org/docs/error-decoder.html?invariant="+t,n=1;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var Kg=new Set,ra={};function as(t,e){so(t,e),so(t+"Capture",e)}function so(t,e){for(ra[t]=e,t=0;t<e.length;t++)Kg.add(e[t])}var ji=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),md=Object.prototype.hasOwnProperty,b_=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,kh={},zh={};function A_(t){return md.call(zh,t)?!0:md.call(kh,t)?!1:b_.test(t)?zh[t]=!0:(kh[t]=!0,!1)}function C_(t,e,n,i){if(n!==null&&n.type===0)return!1;switch(typeof e){case"function":case"symbol":return!0;case"boolean":return i?!1:n!==null?!n.acceptsBooleans:(t=t.toLowerCase().slice(0,5),t!=="data-"&&t!=="aria-");default:return!1}}function R_(t,e,n,i){if(e===null||typeof e>"u"||C_(t,e,n,i))return!0;if(i)return!1;if(n!==null)switch(n.type){case 3:return!e;case 4:return e===!1;case 5:return isNaN(e);case 6:return isNaN(e)||1>e}return!1}function An(t,e,n,i,r,s,o){this.acceptsBooleans=e===2||e===3||e===4,this.attributeName=i,this.attributeNamespace=r,this.mustUseProperty=n,this.propertyName=t,this.type=e,this.sanitizeURL=s,this.removeEmptyString=o}var hn={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(t){hn[t]=new An(t,0,!1,t,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(t){var e=t[0];hn[e]=new An(e,1,!1,t[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(t){hn[t]=new An(t,2,!1,t.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(t){hn[t]=new An(t,2,!1,t,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(t){hn[t]=new An(t,3,!1,t.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(t){hn[t]=new An(t,3,!0,t,null,!1,!1)});["capture","download"].forEach(function(t){hn[t]=new An(t,4,!1,t,null,!1,!1)});["cols","rows","size","span"].forEach(function(t){hn[t]=new An(t,6,!1,t,null,!1,!1)});["rowSpan","start"].forEach(function(t){hn[t]=new An(t,5,!1,t.toLowerCase(),null,!1,!1)});var Rf=/[\-:]([a-z])/g;function Lf(t){return t[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(t){var e=t.replace(Rf,Lf);hn[e]=new An(e,1,!1,t,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(t){var e=t.replace(Rf,Lf);hn[e]=new An(e,1,!1,t,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(t){var e=t.replace(Rf,Lf);hn[e]=new An(e,1,!1,t,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(t){hn[t]=new An(t,1,!1,t.toLowerCase(),null,!1,!1)});hn.xlinkHref=new An("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(t){hn[t]=new An(t,1,!1,t.toLowerCase(),null,!0,!0)});function Pf(t,e,n,i){var r=hn.hasOwnProperty(e)?hn[e]:null;(r!==null?r.type!==0:i||!(2<e.length)||e[0]!=="o"&&e[0]!=="O"||e[1]!=="n"&&e[1]!=="N")&&(R_(e,n,r,i)&&(n=null),i||r===null?A_(e)&&(n===null?t.removeAttribute(e):t.setAttribute(e,""+n)):r.mustUseProperty?t[r.propertyName]=n===null?r.type===3?!1:"":n:(e=r.attributeName,i=r.attributeNamespace,n===null?t.removeAttribute(e):(r=r.type,n=r===3||r===4&&n===!0?"":""+n,i?t.setAttributeNS(i,e,n):t.setAttribute(e,n))))}var Zi=T_.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Ua=Symbol.for("react.element"),Us=Symbol.for("react.portal"),Os=Symbol.for("react.fragment"),Nf=Symbol.for("react.strict_mode"),gd=Symbol.for("react.profiler"),Jg=Symbol.for("react.provider"),Qg=Symbol.for("react.context"),Df=Symbol.for("react.forward_ref"),xd=Symbol.for("react.suspense"),vd=Symbol.for("react.suspense_list"),If=Symbol.for("react.memo"),rr=Symbol.for("react.lazy"),e0=Symbol.for("react.offscreen"),Bh=Symbol.iterator;function So(t){return t===null||typeof t!="object"?null:(t=Bh&&t[Bh]||t["@@iterator"],typeof t=="function"?t:null)}var Ft=Object.assign,nu;function Bo(t){if(nu===void 0)try{throw Error()}catch(n){var e=n.stack.trim().match(/\n( *(at )?)/);nu=e&&e[1]||""}return`
`+nu+t}var iu=!1;function ru(t,e){if(!t||iu)return"";iu=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(e)if(e=function(){throw Error()},Object.defineProperty(e.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(e,[])}catch(c){var i=c}Reflect.construct(t,[],e)}else{try{e.call()}catch(c){i=c}t.call(e.prototype)}else{try{throw Error()}catch(c){i=c}t()}}catch(c){if(c&&i&&typeof c.stack=="string"){for(var r=c.stack.split(`
`),s=i.stack.split(`
`),o=r.length-1,a=s.length-1;1<=o&&0<=a&&r[o]!==s[a];)a--;for(;1<=o&&0<=a;o--,a--)if(r[o]!==s[a]){if(o!==1||a!==1)do if(o--,a--,0>a||r[o]!==s[a]){var l=`
`+r[o].replace(" at new "," at ");return t.displayName&&l.includes("<anonymous>")&&(l=l.replace("<anonymous>",t.displayName)),l}while(1<=o&&0<=a);break}}}finally{iu=!1,Error.prepareStackTrace=n}return(t=t?t.displayName||t.name:"")?Bo(t):""}function L_(t){switch(t.tag){case 5:return Bo(t.type);case 16:return Bo("Lazy");case 13:return Bo("Suspense");case 19:return Bo("SuspenseList");case 0:case 2:case 15:return t=ru(t.type,!1),t;case 11:return t=ru(t.type.render,!1),t;case 1:return t=ru(t.type,!0),t;default:return""}}function _d(t){if(t==null)return null;if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case Os:return"Fragment";case Us:return"Portal";case gd:return"Profiler";case Nf:return"StrictMode";case xd:return"Suspense";case vd:return"SuspenseList"}if(typeof t=="object")switch(t.$$typeof){case Qg:return(t.displayName||"Context")+".Consumer";case Jg:return(t._context.displayName||"Context")+".Provider";case Df:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case If:return e=t.displayName||null,e!==null?e:_d(t.type)||"Memo";case rr:e=t._payload,t=t._init;try{return _d(t(e))}catch{}}return null}function P_(t){var e=t.type;switch(t.tag){case 24:return"Cache";case 9:return(e.displayName||"Context")+".Consumer";case 10:return(e._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return t=e.render,t=t.displayName||t.name||"",e.displayName||(t!==""?"ForwardRef("+t+")":"ForwardRef");case 7:return"Fragment";case 5:return e;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return _d(e);case 8:return e===Nf?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e}return null}function br(t){switch(typeof t){case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function t0(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function N_(t){var e=t0(t)?"checked":"value",n=Object.getOwnPropertyDescriptor(t.constructor.prototype,e),i=""+t[e];if(!t.hasOwnProperty(e)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var r=n.get,s=n.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return r.call(this)},set:function(o){i=""+o,s.call(this,o)}}),Object.defineProperty(t,e,{enumerable:n.enumerable}),{getValue:function(){return i},setValue:function(o){i=""+o},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function Oa(t){t._valueTracker||(t._valueTracker=N_(t))}function n0(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var n=e.getValue(),i="";return t&&(i=t0(t)?t.checked?"true":"false":t.value),t=i,t!==n?(e.setValue(t),!0):!1}function $l(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}function yd(t,e){var n=e.checked;return Ft({},e,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??t._wrapperState.initialChecked})}function Hh(t,e){var n=e.defaultValue==null?"":e.defaultValue,i=e.checked!=null?e.checked:e.defaultChecked;n=br(e.value!=null?e.value:n),t._wrapperState={initialChecked:i,initialValue:n,controlled:e.type==="checkbox"||e.type==="radio"?e.checked!=null:e.value!=null}}function i0(t,e){e=e.checked,e!=null&&Pf(t,"checked",e,!1)}function Sd(t,e){i0(t,e);var n=br(e.value),i=e.type;if(n!=null)i==="number"?(n===0&&t.value===""||t.value!=n)&&(t.value=""+n):t.value!==""+n&&(t.value=""+n);else if(i==="submit"||i==="reset"){t.removeAttribute("value");return}e.hasOwnProperty("value")?Ed(t,e.type,n):e.hasOwnProperty("defaultValue")&&Ed(t,e.type,br(e.defaultValue)),e.checked==null&&e.defaultChecked!=null&&(t.defaultChecked=!!e.defaultChecked)}function Gh(t,e,n){if(e.hasOwnProperty("value")||e.hasOwnProperty("defaultValue")){var i=e.type;if(!(i!=="submit"&&i!=="reset"||e.value!==void 0&&e.value!==null))return;e=""+t._wrapperState.initialValue,n||e===t.value||(t.value=e),t.defaultValue=e}n=t.name,n!==""&&(t.name=""),t.defaultChecked=!!t._wrapperState.initialChecked,n!==""&&(t.name=n)}function Ed(t,e,n){(e!=="number"||$l(t.ownerDocument)!==t)&&(n==null?t.defaultValue=""+t._wrapperState.initialValue:t.defaultValue!==""+n&&(t.defaultValue=""+n))}var Ho=Array.isArray;function Zs(t,e,n,i){if(t=t.options,e){e={};for(var r=0;r<n.length;r++)e["$"+n[r]]=!0;for(n=0;n<t.length;n++)r=e.hasOwnProperty("$"+t[n].value),t[n].selected!==r&&(t[n].selected=r),r&&i&&(t[n].defaultSelected=!0)}else{for(n=""+br(n),e=null,r=0;r<t.length;r++){if(t[r].value===n){t[r].selected=!0,i&&(t[r].defaultSelected=!0);return}e!==null||t[r].disabled||(e=t[r])}e!==null&&(e.selected=!0)}}function Md(t,e){if(e.dangerouslySetInnerHTML!=null)throw Error(_e(91));return Ft({},e,{value:void 0,defaultValue:void 0,children:""+t._wrapperState.initialValue})}function Vh(t,e){var n=e.value;if(n==null){if(n=e.children,e=e.defaultValue,n!=null){if(e!=null)throw Error(_e(92));if(Ho(n)){if(1<n.length)throw Error(_e(93));n=n[0]}e=n}e==null&&(e=""),n=e}t._wrapperState={initialValue:br(n)}}function r0(t,e){var n=br(e.value),i=br(e.defaultValue);n!=null&&(n=""+n,n!==t.value&&(t.value=n),e.defaultValue==null&&t.defaultValue!==n&&(t.defaultValue=n)),i!=null&&(t.defaultValue=""+i)}function Wh(t){var e=t.textContent;e===t._wrapperState.initialValue&&e!==""&&e!==null&&(t.value=e)}function s0(t){switch(t){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function wd(t,e){return t==null||t==="http://www.w3.org/1999/xhtml"?s0(e):t==="http://www.w3.org/2000/svg"&&e==="foreignObject"?"http://www.w3.org/1999/xhtml":t}var Fa,o0=function(t){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(e,n,i,r){MSApp.execUnsafeLocalFunction(function(){return t(e,n,i,r)})}:t}(function(t,e){if(t.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in t)t.innerHTML=e;else{for(Fa=Fa||document.createElement("div"),Fa.innerHTML="<svg>"+e.valueOf().toString()+"</svg>",e=Fa.firstChild;t.firstChild;)t.removeChild(t.firstChild);for(;e.firstChild;)t.appendChild(e.firstChild)}});function sa(t,e){if(e){var n=t.firstChild;if(n&&n===t.lastChild&&n.nodeType===3){n.nodeValue=e;return}}t.textContent=e}var Wo={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},D_=["Webkit","ms","Moz","O"];Object.keys(Wo).forEach(function(t){D_.forEach(function(e){e=e+t.charAt(0).toUpperCase()+t.substring(1),Wo[e]=Wo[t]})});function a0(t,e,n){return e==null||typeof e=="boolean"||e===""?"":n||typeof e!="number"||e===0||Wo.hasOwnProperty(t)&&Wo[t]?(""+e).trim():e+"px"}function l0(t,e){t=t.style;for(var n in e)if(e.hasOwnProperty(n)){var i=n.indexOf("--")===0,r=a0(n,e[n],i);n==="float"&&(n="cssFloat"),i?t.setProperty(n,r):t[n]=r}}var I_=Ft({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Td(t,e){if(e){if(I_[t]&&(e.children!=null||e.dangerouslySetInnerHTML!=null))throw Error(_e(137,t));if(e.dangerouslySetInnerHTML!=null){if(e.children!=null)throw Error(_e(60));if(typeof e.dangerouslySetInnerHTML!="object"||!("__html"in e.dangerouslySetInnerHTML))throw Error(_e(61))}if(e.style!=null&&typeof e.style!="object")throw Error(_e(62))}}function bd(t,e){if(t.indexOf("-")===-1)return typeof e.is=="string";switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Ad=null;function Uf(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var Cd=null,Ks=null,Js=null;function jh(t){if(t=La(t)){if(typeof Cd!="function")throw Error(_e(280));var e=t.stateNode;e&&(e=Uc(e),Cd(t.stateNode,t.type,e))}}function c0(t){Ks?Js?Js.push(t):Js=[t]:Ks=t}function u0(){if(Ks){var t=Ks,e=Js;if(Js=Ks=null,jh(t),e)for(t=0;t<e.length;t++)jh(e[t])}}function d0(t,e){return t(e)}function f0(){}var su=!1;function h0(t,e,n){if(su)return t(e,n);su=!0;try{return d0(t,e,n)}finally{su=!1,(Ks!==null||Js!==null)&&(f0(),u0())}}function oa(t,e){var n=t.stateNode;if(n===null)return null;var i=Uc(n);if(i===null)return null;n=i[e];e:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(i=!i.disabled)||(t=t.type,i=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!i;break e;default:t=!1}if(t)return null;if(n&&typeof n!="function")throw Error(_e(231,e,typeof n));return n}var Rd=!1;if(ji)try{var Eo={};Object.defineProperty(Eo,"passive",{get:function(){Rd=!0}}),window.addEventListener("test",Eo,Eo),window.removeEventListener("test",Eo,Eo)}catch{Rd=!1}function U_(t,e,n,i,r,s,o,a,l){var c=Array.prototype.slice.call(arguments,3);try{e.apply(n,c)}catch(d){this.onError(d)}}var jo=!1,Yl=null,ql=!1,Ld=null,O_={onError:function(t){jo=!0,Yl=t}};function F_(t,e,n,i,r,s,o,a,l){jo=!1,Yl=null,U_.apply(O_,arguments)}function k_(t,e,n,i,r,s,o,a,l){if(F_.apply(this,arguments),jo){if(jo){var c=Yl;jo=!1,Yl=null}else throw Error(_e(198));ql||(ql=!0,Ld=c)}}function ls(t){var e=t,n=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,e.flags&4098&&(n=e.return),t=e.return;while(t)}return e.tag===3?n:null}function p0(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function Xh(t){if(ls(t)!==t)throw Error(_e(188))}function z_(t){var e=t.alternate;if(!e){if(e=ls(t),e===null)throw Error(_e(188));return e!==t?null:t}for(var n=t,i=e;;){var r=n.return;if(r===null)break;var s=r.alternate;if(s===null){if(i=r.return,i!==null){n=i;continue}break}if(r.child===s.child){for(s=r.child;s;){if(s===n)return Xh(r),t;if(s===i)return Xh(r),e;s=s.sibling}throw Error(_e(188))}if(n.return!==i.return)n=r,i=s;else{for(var o=!1,a=r.child;a;){if(a===n){o=!0,n=r,i=s;break}if(a===i){o=!0,i=r,n=s;break}a=a.sibling}if(!o){for(a=s.child;a;){if(a===n){o=!0,n=s,i=r;break}if(a===i){o=!0,i=s,n=r;break}a=a.sibling}if(!o)throw Error(_e(189))}}if(n.alternate!==i)throw Error(_e(190))}if(n.tag!==3)throw Error(_e(188));return n.stateNode.current===n?t:e}function m0(t){return t=z_(t),t!==null?g0(t):null}function g0(t){if(t.tag===5||t.tag===6)return t;for(t=t.child;t!==null;){var e=g0(t);if(e!==null)return e;t=t.sibling}return null}var x0=$n.unstable_scheduleCallback,$h=$n.unstable_cancelCallback,B_=$n.unstable_shouldYield,H_=$n.unstable_requestPaint,Vt=$n.unstable_now,G_=$n.unstable_getCurrentPriorityLevel,Of=$n.unstable_ImmediatePriority,v0=$n.unstable_UserBlockingPriority,Zl=$n.unstable_NormalPriority,V_=$n.unstable_LowPriority,_0=$n.unstable_IdlePriority,Pc=null,bi=null;function W_(t){if(bi&&typeof bi.onCommitFiberRoot=="function")try{bi.onCommitFiberRoot(Pc,t,void 0,(t.current.flags&128)===128)}catch{}}var gi=Math.clz32?Math.clz32:$_,j_=Math.log,X_=Math.LN2;function $_(t){return t>>>=0,t===0?32:31-(j_(t)/X_|0)|0}var ka=64,za=4194304;function Go(t){switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return t&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return t}}function Kl(t,e){var n=t.pendingLanes;if(n===0)return 0;var i=0,r=t.suspendedLanes,s=t.pingedLanes,o=n&268435455;if(o!==0){var a=o&~r;a!==0?i=Go(a):(s&=o,s!==0&&(i=Go(s)))}else o=n&~r,o!==0?i=Go(o):s!==0&&(i=Go(s));if(i===0)return 0;if(e!==0&&e!==i&&!(e&r)&&(r=i&-i,s=e&-e,r>=s||r===16&&(s&4194240)!==0))return e;if(i&4&&(i|=n&16),e=t.entangledLanes,e!==0)for(t=t.entanglements,e&=i;0<e;)n=31-gi(e),r=1<<n,i|=t[n],e&=~r;return i}function Y_(t,e){switch(t){case 1:case 2:case 4:return e+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function q_(t,e){for(var n=t.suspendedLanes,i=t.pingedLanes,r=t.expirationTimes,s=t.pendingLanes;0<s;){var o=31-gi(s),a=1<<o,l=r[o];l===-1?(!(a&n)||a&i)&&(r[o]=Y_(a,e)):l<=e&&(t.expiredLanes|=a),s&=~a}}function Pd(t){return t=t.pendingLanes&-1073741825,t!==0?t:t&1073741824?1073741824:0}function y0(){var t=ka;return ka<<=1,!(ka&4194240)&&(ka=64),t}function ou(t){for(var e=[],n=0;31>n;n++)e.push(t);return e}function Ca(t,e,n){t.pendingLanes|=e,e!==536870912&&(t.suspendedLanes=0,t.pingedLanes=0),t=t.eventTimes,e=31-gi(e),t[e]=n}function Z_(t,e){var n=t.pendingLanes&~e;t.pendingLanes=e,t.suspendedLanes=0,t.pingedLanes=0,t.expiredLanes&=e,t.mutableReadLanes&=e,t.entangledLanes&=e,e=t.entanglements;var i=t.eventTimes;for(t=t.expirationTimes;0<n;){var r=31-gi(n),s=1<<r;e[r]=0,i[r]=-1,t[r]=-1,n&=~s}}function Ff(t,e){var n=t.entangledLanes|=e;for(t=t.entanglements;n;){var i=31-gi(n),r=1<<i;r&e|t[i]&e&&(t[i]|=e),n&=~r}}var yt=0;function S0(t){return t&=-t,1<t?4<t?t&268435455?16:536870912:4:1}var E0,kf,M0,w0,T0,Nd=!1,Ba=[],pr=null,mr=null,gr=null,aa=new Map,la=new Map,lr=[],K_="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Yh(t,e){switch(t){case"focusin":case"focusout":pr=null;break;case"dragenter":case"dragleave":mr=null;break;case"mouseover":case"mouseout":gr=null;break;case"pointerover":case"pointerout":aa.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":la.delete(e.pointerId)}}function Mo(t,e,n,i,r,s){return t===null||t.nativeEvent!==s?(t={blockedOn:e,domEventName:n,eventSystemFlags:i,nativeEvent:s,targetContainers:[r]},e!==null&&(e=La(e),e!==null&&kf(e)),t):(t.eventSystemFlags|=i,e=t.targetContainers,r!==null&&e.indexOf(r)===-1&&e.push(r),t)}function J_(t,e,n,i,r){switch(e){case"focusin":return pr=Mo(pr,t,e,n,i,r),!0;case"dragenter":return mr=Mo(mr,t,e,n,i,r),!0;case"mouseover":return gr=Mo(gr,t,e,n,i,r),!0;case"pointerover":var s=r.pointerId;return aa.set(s,Mo(aa.get(s)||null,t,e,n,i,r)),!0;case"gotpointercapture":return s=r.pointerId,la.set(s,Mo(la.get(s)||null,t,e,n,i,r)),!0}return!1}function b0(t){var e=Wr(t.target);if(e!==null){var n=ls(e);if(n!==null){if(e=n.tag,e===13){if(e=p0(n),e!==null){t.blockedOn=e,T0(t.priority,function(){M0(n)});return}}else if(e===3&&n.stateNode.current.memoizedState.isDehydrated){t.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}t.blockedOn=null}function Ul(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var n=Dd(t.domEventName,t.eventSystemFlags,e[0],t.nativeEvent);if(n===null){n=t.nativeEvent;var i=new n.constructor(n.type,n);Ad=i,n.target.dispatchEvent(i),Ad=null}else return e=La(n),e!==null&&kf(e),t.blockedOn=n,!1;e.shift()}return!0}function qh(t,e,n){Ul(t)&&n.delete(e)}function Q_(){Nd=!1,pr!==null&&Ul(pr)&&(pr=null),mr!==null&&Ul(mr)&&(mr=null),gr!==null&&Ul(gr)&&(gr=null),aa.forEach(qh),la.forEach(qh)}function wo(t,e){t.blockedOn===e&&(t.blockedOn=null,Nd||(Nd=!0,$n.unstable_scheduleCallback($n.unstable_NormalPriority,Q_)))}function ca(t){function e(r){return wo(r,t)}if(0<Ba.length){wo(Ba[0],t);for(var n=1;n<Ba.length;n++){var i=Ba[n];i.blockedOn===t&&(i.blockedOn=null)}}for(pr!==null&&wo(pr,t),mr!==null&&wo(mr,t),gr!==null&&wo(gr,t),aa.forEach(e),la.forEach(e),n=0;n<lr.length;n++)i=lr[n],i.blockedOn===t&&(i.blockedOn=null);for(;0<lr.length&&(n=lr[0],n.blockedOn===null);)b0(n),n.blockedOn===null&&lr.shift()}var Qs=Zi.ReactCurrentBatchConfig,Jl=!0;function ey(t,e,n,i){var r=yt,s=Qs.transition;Qs.transition=null;try{yt=1,zf(t,e,n,i)}finally{yt=r,Qs.transition=s}}function ty(t,e,n,i){var r=yt,s=Qs.transition;Qs.transition=null;try{yt=4,zf(t,e,n,i)}finally{yt=r,Qs.transition=s}}function zf(t,e,n,i){if(Jl){var r=Dd(t,e,n,i);if(r===null)gu(t,e,i,Ql,n),Yh(t,i);else if(J_(r,t,e,n,i))i.stopPropagation();else if(Yh(t,i),e&4&&-1<K_.indexOf(t)){for(;r!==null;){var s=La(r);if(s!==null&&E0(s),s=Dd(t,e,n,i),s===null&&gu(t,e,i,Ql,n),s===r)break;r=s}r!==null&&i.stopPropagation()}else gu(t,e,i,null,n)}}var Ql=null;function Dd(t,e,n,i){if(Ql=null,t=Uf(i),t=Wr(t),t!==null)if(e=ls(t),e===null)t=null;else if(n=e.tag,n===13){if(t=p0(e),t!==null)return t;t=null}else if(n===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null);return Ql=t,null}function A0(t){switch(t){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(G_()){case Of:return 1;case v0:return 4;case Zl:case V_:return 16;case _0:return 536870912;default:return 16}default:return 16}}var ur=null,Bf=null,Ol=null;function C0(){if(Ol)return Ol;var t,e=Bf,n=e.length,i,r="value"in ur?ur.value:ur.textContent,s=r.length;for(t=0;t<n&&e[t]===r[t];t++);var o=n-t;for(i=1;i<=o&&e[n-i]===r[s-i];i++);return Ol=r.slice(t,1<i?1-i:void 0)}function Fl(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function Ha(){return!0}function Zh(){return!1}function qn(t){function e(n,i,r,s,o){this._reactName=n,this._targetInst=r,this.type=i,this.nativeEvent=s,this.target=o,this.currentTarget=null;for(var a in t)t.hasOwnProperty(a)&&(n=t[a],this[a]=n?n(s):s[a]);return this.isDefaultPrevented=(s.defaultPrevented!=null?s.defaultPrevented:s.returnValue===!1)?Ha:Zh,this.isPropagationStopped=Zh,this}return Ft(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Ha)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Ha)},persist:function(){},isPersistent:Ha}),e}var vo={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Hf=qn(vo),Ra=Ft({},vo,{view:0,detail:0}),ny=qn(Ra),au,lu,To,Nc=Ft({},Ra,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Gf,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==To&&(To&&t.type==="mousemove"?(au=t.screenX-To.screenX,lu=t.screenY-To.screenY):lu=au=0,To=t),au)},movementY:function(t){return"movementY"in t?t.movementY:lu}}),Kh=qn(Nc),iy=Ft({},Nc,{dataTransfer:0}),ry=qn(iy),sy=Ft({},Ra,{relatedTarget:0}),cu=qn(sy),oy=Ft({},vo,{animationName:0,elapsedTime:0,pseudoElement:0}),ay=qn(oy),ly=Ft({},vo,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),cy=qn(ly),uy=Ft({},vo,{data:0}),Jh=qn(uy),dy={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},fy={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},hy={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function py(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=hy[t])?!!e[t]:!1}function Gf(){return py}var my=Ft({},Ra,{key:function(t){if(t.key){var e=dy[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=Fl(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?fy[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Gf,charCode:function(t){return t.type==="keypress"?Fl(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?Fl(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),gy=qn(my),xy=Ft({},Nc,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Qh=qn(xy),vy=Ft({},Ra,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Gf}),_y=qn(vy),yy=Ft({},vo,{propertyName:0,elapsedTime:0,pseudoElement:0}),Sy=qn(yy),Ey=Ft({},Nc,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),My=qn(Ey),wy=[9,13,27,32],Vf=ji&&"CompositionEvent"in window,Xo=null;ji&&"documentMode"in document&&(Xo=document.documentMode);var Ty=ji&&"TextEvent"in window&&!Xo,R0=ji&&(!Vf||Xo&&8<Xo&&11>=Xo),ep=" ",tp=!1;function L0(t,e){switch(t){case"keyup":return wy.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function P0(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var Fs=!1;function by(t,e){switch(t){case"compositionend":return P0(e);case"keypress":return e.which!==32?null:(tp=!0,ep);case"textInput":return t=e.data,t===ep&&tp?null:t;default:return null}}function Ay(t,e){if(Fs)return t==="compositionend"||!Vf&&L0(t,e)?(t=C0(),Ol=Bf=ur=null,Fs=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return R0&&e.locale!=="ko"?null:e.data;default:return null}}var Cy={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function np(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!Cy[t.type]:e==="textarea"}function N0(t,e,n,i){c0(i),e=ec(e,"onChange"),0<e.length&&(n=new Hf("onChange","change",null,n,i),t.push({event:n,listeners:e}))}var $o=null,ua=null;function Ry(t){V0(t,0)}function Dc(t){var e=Bs(t);if(n0(e))return t}function Ly(t,e){if(t==="change")return e}var D0=!1;if(ji){var uu;if(ji){var du="oninput"in document;if(!du){var ip=document.createElement("div");ip.setAttribute("oninput","return;"),du=typeof ip.oninput=="function"}uu=du}else uu=!1;D0=uu&&(!document.documentMode||9<document.documentMode)}function rp(){$o&&($o.detachEvent("onpropertychange",I0),ua=$o=null)}function I0(t){if(t.propertyName==="value"&&Dc(ua)){var e=[];N0(e,ua,t,Uf(t)),h0(Ry,e)}}function Py(t,e,n){t==="focusin"?(rp(),$o=e,ua=n,$o.attachEvent("onpropertychange",I0)):t==="focusout"&&rp()}function Ny(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return Dc(ua)}function Dy(t,e){if(t==="click")return Dc(e)}function Iy(t,e){if(t==="input"||t==="change")return Dc(e)}function Uy(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var _i=typeof Object.is=="function"?Object.is:Uy;function da(t,e){if(_i(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var n=Object.keys(t),i=Object.keys(e);if(n.length!==i.length)return!1;for(i=0;i<n.length;i++){var r=n[i];if(!md.call(e,r)||!_i(t[r],e[r]))return!1}return!0}function sp(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function op(t,e){var n=sp(t);t=0;for(var i;n;){if(n.nodeType===3){if(i=t+n.textContent.length,t<=e&&i>=e)return{node:n,offset:e-t};t=i}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=sp(n)}}function U0(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?U0(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function O0(){for(var t=window,e=$l();e instanceof t.HTMLIFrameElement;){try{var n=typeof e.contentWindow.location.href=="string"}catch{n=!1}if(n)t=e.contentWindow;else break;e=$l(t.document)}return e}function Wf(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}function Oy(t){var e=O0(),n=t.focusedElem,i=t.selectionRange;if(e!==n&&n&&n.ownerDocument&&U0(n.ownerDocument.documentElement,n)){if(i!==null&&Wf(n)){if(e=i.start,t=i.end,t===void 0&&(t=e),"selectionStart"in n)n.selectionStart=e,n.selectionEnd=Math.min(t,n.value.length);else if(t=(e=n.ownerDocument||document)&&e.defaultView||window,t.getSelection){t=t.getSelection();var r=n.textContent.length,s=Math.min(i.start,r);i=i.end===void 0?s:Math.min(i.end,r),!t.extend&&s>i&&(r=i,i=s,s=r),r=op(n,s);var o=op(n,i);r&&o&&(t.rangeCount!==1||t.anchorNode!==r.node||t.anchorOffset!==r.offset||t.focusNode!==o.node||t.focusOffset!==o.offset)&&(e=e.createRange(),e.setStart(r.node,r.offset),t.removeAllRanges(),s>i?(t.addRange(e),t.extend(o.node,o.offset)):(e.setEnd(o.node,o.offset),t.addRange(e)))}}for(e=[],t=n;t=t.parentNode;)t.nodeType===1&&e.push({element:t,left:t.scrollLeft,top:t.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<e.length;n++)t=e[n],t.element.scrollLeft=t.left,t.element.scrollTop=t.top}}var Fy=ji&&"documentMode"in document&&11>=document.documentMode,ks=null,Id=null,Yo=null,Ud=!1;function ap(t,e,n){var i=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Ud||ks==null||ks!==$l(i)||(i=ks,"selectionStart"in i&&Wf(i)?i={start:i.selectionStart,end:i.selectionEnd}:(i=(i.ownerDocument&&i.ownerDocument.defaultView||window).getSelection(),i={anchorNode:i.anchorNode,anchorOffset:i.anchorOffset,focusNode:i.focusNode,focusOffset:i.focusOffset}),Yo&&da(Yo,i)||(Yo=i,i=ec(Id,"onSelect"),0<i.length&&(e=new Hf("onSelect","select",null,e,n),t.push({event:e,listeners:i}),e.target=ks)))}function Ga(t,e){var n={};return n[t.toLowerCase()]=e.toLowerCase(),n["Webkit"+t]="webkit"+e,n["Moz"+t]="moz"+e,n}var zs={animationend:Ga("Animation","AnimationEnd"),animationiteration:Ga("Animation","AnimationIteration"),animationstart:Ga("Animation","AnimationStart"),transitionend:Ga("Transition","TransitionEnd")},fu={},F0={};ji&&(F0=document.createElement("div").style,"AnimationEvent"in window||(delete zs.animationend.animation,delete zs.animationiteration.animation,delete zs.animationstart.animation),"TransitionEvent"in window||delete zs.transitionend.transition);function Ic(t){if(fu[t])return fu[t];if(!zs[t])return t;var e=zs[t],n;for(n in e)if(e.hasOwnProperty(n)&&n in F0)return fu[t]=e[n];return t}var k0=Ic("animationend"),z0=Ic("animationiteration"),B0=Ic("animationstart"),H0=Ic("transitionend"),G0=new Map,lp="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Rr(t,e){G0.set(t,e),as(e,[t])}for(var hu=0;hu<lp.length;hu++){var pu=lp[hu],ky=pu.toLowerCase(),zy=pu[0].toUpperCase()+pu.slice(1);Rr(ky,"on"+zy)}Rr(k0,"onAnimationEnd");Rr(z0,"onAnimationIteration");Rr(B0,"onAnimationStart");Rr("dblclick","onDoubleClick");Rr("focusin","onFocus");Rr("focusout","onBlur");Rr(H0,"onTransitionEnd");so("onMouseEnter",["mouseout","mouseover"]);so("onMouseLeave",["mouseout","mouseover"]);so("onPointerEnter",["pointerout","pointerover"]);so("onPointerLeave",["pointerout","pointerover"]);as("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));as("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));as("onBeforeInput",["compositionend","keypress","textInput","paste"]);as("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));as("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));as("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Vo="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),By=new Set("cancel close invalid load scroll toggle".split(" ").concat(Vo));function cp(t,e,n){var i=t.type||"unknown-event";t.currentTarget=n,k_(i,e,void 0,t),t.currentTarget=null}function V0(t,e){e=(e&4)!==0;for(var n=0;n<t.length;n++){var i=t[n],r=i.event;i=i.listeners;e:{var s=void 0;if(e)for(var o=i.length-1;0<=o;o--){var a=i[o],l=a.instance,c=a.currentTarget;if(a=a.listener,l!==s&&r.isPropagationStopped())break e;cp(r,a,c),s=l}else for(o=0;o<i.length;o++){if(a=i[o],l=a.instance,c=a.currentTarget,a=a.listener,l!==s&&r.isPropagationStopped())break e;cp(r,a,c),s=l}}}if(ql)throw t=Ld,ql=!1,Ld=null,t}function At(t,e){var n=e[Bd];n===void 0&&(n=e[Bd]=new Set);var i=t+"__bubble";n.has(i)||(W0(e,t,2,!1),n.add(i))}function mu(t,e,n){var i=0;e&&(i|=4),W0(n,t,i,e)}var Va="_reactListening"+Math.random().toString(36).slice(2);function fa(t){if(!t[Va]){t[Va]=!0,Kg.forEach(function(n){n!=="selectionchange"&&(By.has(n)||mu(n,!1,t),mu(n,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[Va]||(e[Va]=!0,mu("selectionchange",!1,e))}}function W0(t,e,n,i){switch(A0(e)){case 1:var r=ey;break;case 4:r=ty;break;default:r=zf}n=r.bind(null,e,n,t),r=void 0,!Rd||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(r=!0),i?r!==void 0?t.addEventListener(e,n,{capture:!0,passive:r}):t.addEventListener(e,n,!0):r!==void 0?t.addEventListener(e,n,{passive:r}):t.addEventListener(e,n,!1)}function gu(t,e,n,i,r){var s=i;if(!(e&1)&&!(e&2)&&i!==null)e:for(;;){if(i===null)return;var o=i.tag;if(o===3||o===4){var a=i.stateNode.containerInfo;if(a===r||a.nodeType===8&&a.parentNode===r)break;if(o===4)for(o=i.return;o!==null;){var l=o.tag;if((l===3||l===4)&&(l=o.stateNode.containerInfo,l===r||l.nodeType===8&&l.parentNode===r))return;o=o.return}for(;a!==null;){if(o=Wr(a),o===null)return;if(l=o.tag,l===5||l===6){i=s=o;continue e}a=a.parentNode}}i=i.return}h0(function(){var c=s,d=Uf(n),f=[];e:{var h=G0.get(t);if(h!==void 0){var p=Hf,g=t;switch(t){case"keypress":if(Fl(n)===0)break e;case"keydown":case"keyup":p=gy;break;case"focusin":g="focus",p=cu;break;case"focusout":g="blur",p=cu;break;case"beforeblur":case"afterblur":p=cu;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":p=Kh;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":p=ry;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":p=_y;break;case k0:case z0:case B0:p=ay;break;case H0:p=Sy;break;case"scroll":p=ny;break;case"wheel":p=My;break;case"copy":case"cut":case"paste":p=cy;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":p=Qh}var _=(e&4)!==0,m=!_&&t==="scroll",u=_?h!==null?h+"Capture":null:h;_=[];for(var v=c,x;v!==null;){x=v;var y=x.stateNode;if(x.tag===5&&y!==null&&(x=y,u!==null&&(y=oa(v,u),y!=null&&_.push(ha(v,y,x)))),m)break;v=v.return}0<_.length&&(h=new p(h,g,null,n,d),f.push({event:h,listeners:_}))}}if(!(e&7)){e:{if(h=t==="mouseover"||t==="pointerover",p=t==="mouseout"||t==="pointerout",h&&n!==Ad&&(g=n.relatedTarget||n.fromElement)&&(Wr(g)||g[Xi]))break e;if((p||h)&&(h=d.window===d?d:(h=d.ownerDocument)?h.defaultView||h.parentWindow:window,p?(g=n.relatedTarget||n.toElement,p=c,g=g?Wr(g):null,g!==null&&(m=ls(g),g!==m||g.tag!==5&&g.tag!==6)&&(g=null)):(p=null,g=c),p!==g)){if(_=Kh,y="onMouseLeave",u="onMouseEnter",v="mouse",(t==="pointerout"||t==="pointerover")&&(_=Qh,y="onPointerLeave",u="onPointerEnter",v="pointer"),m=p==null?h:Bs(p),x=g==null?h:Bs(g),h=new _(y,v+"leave",p,n,d),h.target=m,h.relatedTarget=x,y=null,Wr(d)===c&&(_=new _(u,v+"enter",g,n,d),_.target=x,_.relatedTarget=m,y=_),m=y,p&&g)t:{for(_=p,u=g,v=0,x=_;x;x=ds(x))v++;for(x=0,y=u;y;y=ds(y))x++;for(;0<v-x;)_=ds(_),v--;for(;0<x-v;)u=ds(u),x--;for(;v--;){if(_===u||u!==null&&_===u.alternate)break t;_=ds(_),u=ds(u)}_=null}else _=null;p!==null&&up(f,h,p,_,!1),g!==null&&m!==null&&up(f,m,g,_,!0)}}e:{if(h=c?Bs(c):window,p=h.nodeName&&h.nodeName.toLowerCase(),p==="select"||p==="input"&&h.type==="file")var A=Ly;else if(np(h))if(D0)A=Iy;else{A=Ny;var w=Py}else(p=h.nodeName)&&p.toLowerCase()==="input"&&(h.type==="checkbox"||h.type==="radio")&&(A=Dy);if(A&&(A=A(t,c))){N0(f,A,n,d);break e}w&&w(t,h,c),t==="focusout"&&(w=h._wrapperState)&&w.controlled&&h.type==="number"&&Ed(h,"number",h.value)}switch(w=c?Bs(c):window,t){case"focusin":(np(w)||w.contentEditable==="true")&&(ks=w,Id=c,Yo=null);break;case"focusout":Yo=Id=ks=null;break;case"mousedown":Ud=!0;break;case"contextmenu":case"mouseup":case"dragend":Ud=!1,ap(f,n,d);break;case"selectionchange":if(Fy)break;case"keydown":case"keyup":ap(f,n,d)}var T;if(Vf)e:{switch(t){case"compositionstart":var z="onCompositionStart";break e;case"compositionend":z="onCompositionEnd";break e;case"compositionupdate":z="onCompositionUpdate";break e}z=void 0}else Fs?L0(t,n)&&(z="onCompositionEnd"):t==="keydown"&&n.keyCode===229&&(z="onCompositionStart");z&&(R0&&n.locale!=="ko"&&(Fs||z!=="onCompositionStart"?z==="onCompositionEnd"&&Fs&&(T=C0()):(ur=d,Bf="value"in ur?ur.value:ur.textContent,Fs=!0)),w=ec(c,z),0<w.length&&(z=new Jh(z,t,null,n,d),f.push({event:z,listeners:w}),T?z.data=T:(T=P0(n),T!==null&&(z.data=T)))),(T=Ty?by(t,n):Ay(t,n))&&(c=ec(c,"onBeforeInput"),0<c.length&&(d=new Jh("onBeforeInput","beforeinput",null,n,d),f.push({event:d,listeners:c}),d.data=T))}V0(f,e)})}function ha(t,e,n){return{instance:t,listener:e,currentTarget:n}}function ec(t,e){for(var n=e+"Capture",i=[];t!==null;){var r=t,s=r.stateNode;r.tag===5&&s!==null&&(r=s,s=oa(t,n),s!=null&&i.unshift(ha(t,s,r)),s=oa(t,e),s!=null&&i.push(ha(t,s,r))),t=t.return}return i}function ds(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5);return t||null}function up(t,e,n,i,r){for(var s=e._reactName,o=[];n!==null&&n!==i;){var a=n,l=a.alternate,c=a.stateNode;if(l!==null&&l===i)break;a.tag===5&&c!==null&&(a=c,r?(l=oa(n,s),l!=null&&o.unshift(ha(n,l,a))):r||(l=oa(n,s),l!=null&&o.push(ha(n,l,a)))),n=n.return}o.length!==0&&t.push({event:e,listeners:o})}var Hy=/\r\n?/g,Gy=/\u0000|\uFFFD/g;function dp(t){return(typeof t=="string"?t:""+t).replace(Hy,`
`).replace(Gy,"")}function Wa(t,e,n){if(e=dp(e),dp(t)!==e&&n)throw Error(_e(425))}function tc(){}var Od=null,Fd=null;function kd(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var zd=typeof setTimeout=="function"?setTimeout:void 0,Vy=typeof clearTimeout=="function"?clearTimeout:void 0,fp=typeof Promise=="function"?Promise:void 0,Wy=typeof queueMicrotask=="function"?queueMicrotask:typeof fp<"u"?function(t){return fp.resolve(null).then(t).catch(jy)}:zd;function jy(t){setTimeout(function(){throw t})}function xu(t,e){var n=e,i=0;do{var r=n.nextSibling;if(t.removeChild(n),r&&r.nodeType===8)if(n=r.data,n==="/$"){if(i===0){t.removeChild(r),ca(e);return}i--}else n!=="$"&&n!=="$?"&&n!=="$!"||i++;n=r}while(n);ca(e)}function xr(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?")break;if(e==="/$")return null}}return t}function hp(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="$"||n==="$!"||n==="$?"){if(e===0)return t;e--}else n==="/$"&&e++}t=t.previousSibling}return null}var _o=Math.random().toString(36).slice(2),Ti="__reactFiber$"+_o,pa="__reactProps$"+_o,Xi="__reactContainer$"+_o,Bd="__reactEvents$"+_o,Xy="__reactListeners$"+_o,$y="__reactHandles$"+_o;function Wr(t){var e=t[Ti];if(e)return e;for(var n=t.parentNode;n;){if(e=n[Xi]||n[Ti]){if(n=e.alternate,e.child!==null||n!==null&&n.child!==null)for(t=hp(t);t!==null;){if(n=t[Ti])return n;t=hp(t)}return e}t=n,n=t.parentNode}return null}function La(t){return t=t[Ti]||t[Xi],!t||t.tag!==5&&t.tag!==6&&t.tag!==13&&t.tag!==3?null:t}function Bs(t){if(t.tag===5||t.tag===6)return t.stateNode;throw Error(_e(33))}function Uc(t){return t[pa]||null}var Hd=[],Hs=-1;function Lr(t){return{current:t}}function Rt(t){0>Hs||(t.current=Hd[Hs],Hd[Hs]=null,Hs--)}function bt(t,e){Hs++,Hd[Hs]=t.current,t.current=e}var Ar={},yn=Lr(Ar),Dn=Lr(!1),Jr=Ar;function oo(t,e){var n=t.type.contextTypes;if(!n)return Ar;var i=t.stateNode;if(i&&i.__reactInternalMemoizedUnmaskedChildContext===e)return i.__reactInternalMemoizedMaskedChildContext;var r={},s;for(s in n)r[s]=e[s];return i&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=e,t.__reactInternalMemoizedMaskedChildContext=r),r}function In(t){return t=t.childContextTypes,t!=null}function nc(){Rt(Dn),Rt(yn)}function pp(t,e,n){if(yn.current!==Ar)throw Error(_e(168));bt(yn,e),bt(Dn,n)}function j0(t,e,n){var i=t.stateNode;if(e=e.childContextTypes,typeof i.getChildContext!="function")return n;i=i.getChildContext();for(var r in i)if(!(r in e))throw Error(_e(108,P_(t)||"Unknown",r));return Ft({},n,i)}function ic(t){return t=(t=t.stateNode)&&t.__reactInternalMemoizedMergedChildContext||Ar,Jr=yn.current,bt(yn,t),bt(Dn,Dn.current),!0}function mp(t,e,n){var i=t.stateNode;if(!i)throw Error(_e(169));n?(t=j0(t,e,Jr),i.__reactInternalMemoizedMergedChildContext=t,Rt(Dn),Rt(yn),bt(yn,t)):Rt(Dn),bt(Dn,n)}var Fi=null,Oc=!1,vu=!1;function X0(t){Fi===null?Fi=[t]:Fi.push(t)}function Yy(t){Oc=!0,X0(t)}function Pr(){if(!vu&&Fi!==null){vu=!0;var t=0,e=yt;try{var n=Fi;for(yt=1;t<n.length;t++){var i=n[t];do i=i(!0);while(i!==null)}Fi=null,Oc=!1}catch(r){throw Fi!==null&&(Fi=Fi.slice(t+1)),x0(Of,Pr),r}finally{yt=e,vu=!1}}return null}var Gs=[],Vs=0,rc=null,sc=0,Jn=[],Qn=0,Qr=null,zi=1,Bi="";function kr(t,e){Gs[Vs++]=sc,Gs[Vs++]=rc,rc=t,sc=e}function $0(t,e,n){Jn[Qn++]=zi,Jn[Qn++]=Bi,Jn[Qn++]=Qr,Qr=t;var i=zi;t=Bi;var r=32-gi(i)-1;i&=~(1<<r),n+=1;var s=32-gi(e)+r;if(30<s){var o=r-r%5;s=(i&(1<<o)-1).toString(32),i>>=o,r-=o,zi=1<<32-gi(e)+r|n<<r|i,Bi=s+t}else zi=1<<s|n<<r|i,Bi=t}function jf(t){t.return!==null&&(kr(t,1),$0(t,1,0))}function Xf(t){for(;t===rc;)rc=Gs[--Vs],Gs[Vs]=null,sc=Gs[--Vs],Gs[Vs]=null;for(;t===Qr;)Qr=Jn[--Qn],Jn[Qn]=null,Bi=Jn[--Qn],Jn[Qn]=null,zi=Jn[--Qn],Jn[Qn]=null}var Xn=null,jn=null,Pt=!1,hi=null;function Y0(t,e){var n=ii(5,null,null,0);n.elementType="DELETED",n.stateNode=e,n.return=t,e=t.deletions,e===null?(t.deletions=[n],t.flags|=16):e.push(n)}function gp(t,e){switch(t.tag){case 5:var n=t.type;return e=e.nodeType!==1||n.toLowerCase()!==e.nodeName.toLowerCase()?null:e,e!==null?(t.stateNode=e,Xn=t,jn=xr(e.firstChild),!0):!1;case 6:return e=t.pendingProps===""||e.nodeType!==3?null:e,e!==null?(t.stateNode=e,Xn=t,jn=null,!0):!1;case 13:return e=e.nodeType!==8?null:e,e!==null?(n=Qr!==null?{id:zi,overflow:Bi}:null,t.memoizedState={dehydrated:e,treeContext:n,retryLane:1073741824},n=ii(18,null,null,0),n.stateNode=e,n.return=t,t.child=n,Xn=t,jn=null,!0):!1;default:return!1}}function Gd(t){return(t.mode&1)!==0&&(t.flags&128)===0}function Vd(t){if(Pt){var e=jn;if(e){var n=e;if(!gp(t,e)){if(Gd(t))throw Error(_e(418));e=xr(n.nextSibling);var i=Xn;e&&gp(t,e)?Y0(i,n):(t.flags=t.flags&-4097|2,Pt=!1,Xn=t)}}else{if(Gd(t))throw Error(_e(418));t.flags=t.flags&-4097|2,Pt=!1,Xn=t}}}function xp(t){for(t=t.return;t!==null&&t.tag!==5&&t.tag!==3&&t.tag!==13;)t=t.return;Xn=t}function ja(t){if(t!==Xn)return!1;if(!Pt)return xp(t),Pt=!0,!1;var e;if((e=t.tag!==3)&&!(e=t.tag!==5)&&(e=t.type,e=e!=="head"&&e!=="body"&&!kd(t.type,t.memoizedProps)),e&&(e=jn)){if(Gd(t))throw q0(),Error(_e(418));for(;e;)Y0(t,e),e=xr(e.nextSibling)}if(xp(t),t.tag===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(_e(317));e:{for(t=t.nextSibling,e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="/$"){if(e===0){jn=xr(t.nextSibling);break e}e--}else n!=="$"&&n!=="$!"&&n!=="$?"||e++}t=t.nextSibling}jn=null}}else jn=Xn?xr(t.stateNode.nextSibling):null;return!0}function q0(){for(var t=jn;t;)t=xr(t.nextSibling)}function ao(){jn=Xn=null,Pt=!1}function $f(t){hi===null?hi=[t]:hi.push(t)}var qy=Zi.ReactCurrentBatchConfig;function bo(t,e,n){if(t=n.ref,t!==null&&typeof t!="function"&&typeof t!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(_e(309));var i=n.stateNode}if(!i)throw Error(_e(147,t));var r=i,s=""+t;return e!==null&&e.ref!==null&&typeof e.ref=="function"&&e.ref._stringRef===s?e.ref:(e=function(o){var a=r.refs;o===null?delete a[s]:a[s]=o},e._stringRef=s,e)}if(typeof t!="string")throw Error(_e(284));if(!n._owner)throw Error(_e(290,t))}return t}function Xa(t,e){throw t=Object.prototype.toString.call(e),Error(_e(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t))}function vp(t){var e=t._init;return e(t._payload)}function Z0(t){function e(u,v){if(t){var x=u.deletions;x===null?(u.deletions=[v],u.flags|=16):x.push(v)}}function n(u,v){if(!t)return null;for(;v!==null;)e(u,v),v=v.sibling;return null}function i(u,v){for(u=new Map;v!==null;)v.key!==null?u.set(v.key,v):u.set(v.index,v),v=v.sibling;return u}function r(u,v){return u=Sr(u,v),u.index=0,u.sibling=null,u}function s(u,v,x){return u.index=x,t?(x=u.alternate,x!==null?(x=x.index,x<v?(u.flags|=2,v):x):(u.flags|=2,v)):(u.flags|=1048576,v)}function o(u){return t&&u.alternate===null&&(u.flags|=2),u}function a(u,v,x,y){return v===null||v.tag!==6?(v=Tu(x,u.mode,y),v.return=u,v):(v=r(v,x),v.return=u,v)}function l(u,v,x,y){var A=x.type;return A===Os?d(u,v,x.props.children,y,x.key):v!==null&&(v.elementType===A||typeof A=="object"&&A!==null&&A.$$typeof===rr&&vp(A)===v.type)?(y=r(v,x.props),y.ref=bo(u,v,x),y.return=u,y):(y=Wl(x.type,x.key,x.props,null,u.mode,y),y.ref=bo(u,v,x),y.return=u,y)}function c(u,v,x,y){return v===null||v.tag!==4||v.stateNode.containerInfo!==x.containerInfo||v.stateNode.implementation!==x.implementation?(v=bu(x,u.mode,y),v.return=u,v):(v=r(v,x.children||[]),v.return=u,v)}function d(u,v,x,y,A){return v===null||v.tag!==7?(v=Yr(x,u.mode,y,A),v.return=u,v):(v=r(v,x),v.return=u,v)}function f(u,v,x){if(typeof v=="string"&&v!==""||typeof v=="number")return v=Tu(""+v,u.mode,x),v.return=u,v;if(typeof v=="object"&&v!==null){switch(v.$$typeof){case Ua:return x=Wl(v.type,v.key,v.props,null,u.mode,x),x.ref=bo(u,null,v),x.return=u,x;case Us:return v=bu(v,u.mode,x),v.return=u,v;case rr:var y=v._init;return f(u,y(v._payload),x)}if(Ho(v)||So(v))return v=Yr(v,u.mode,x,null),v.return=u,v;Xa(u,v)}return null}function h(u,v,x,y){var A=v!==null?v.key:null;if(typeof x=="string"&&x!==""||typeof x=="number")return A!==null?null:a(u,v,""+x,y);if(typeof x=="object"&&x!==null){switch(x.$$typeof){case Ua:return x.key===A?l(u,v,x,y):null;case Us:return x.key===A?c(u,v,x,y):null;case rr:return A=x._init,h(u,v,A(x._payload),y)}if(Ho(x)||So(x))return A!==null?null:d(u,v,x,y,null);Xa(u,x)}return null}function p(u,v,x,y,A){if(typeof y=="string"&&y!==""||typeof y=="number")return u=u.get(x)||null,a(v,u,""+y,A);if(typeof y=="object"&&y!==null){switch(y.$$typeof){case Ua:return u=u.get(y.key===null?x:y.key)||null,l(v,u,y,A);case Us:return u=u.get(y.key===null?x:y.key)||null,c(v,u,y,A);case rr:var w=y._init;return p(u,v,x,w(y._payload),A)}if(Ho(y)||So(y))return u=u.get(x)||null,d(v,u,y,A,null);Xa(v,y)}return null}function g(u,v,x,y){for(var A=null,w=null,T=v,z=v=0,E=null;T!==null&&z<x.length;z++){T.index>z?(E=T,T=null):E=T.sibling;var b=h(u,T,x[z],y);if(b===null){T===null&&(T=E);break}t&&T&&b.alternate===null&&e(u,T),v=s(b,v,z),w===null?A=b:w.sibling=b,w=b,T=E}if(z===x.length)return n(u,T),Pt&&kr(u,z),A;if(T===null){for(;z<x.length;z++)T=f(u,x[z],y),T!==null&&(v=s(T,v,z),w===null?A=T:w.sibling=T,w=T);return Pt&&kr(u,z),A}for(T=i(u,T);z<x.length;z++)E=p(T,u,z,x[z],y),E!==null&&(t&&E.alternate!==null&&T.delete(E.key===null?z:E.key),v=s(E,v,z),w===null?A=E:w.sibling=E,w=E);return t&&T.forEach(function(V){return e(u,V)}),Pt&&kr(u,z),A}function _(u,v,x,y){var A=So(x);if(typeof A!="function")throw Error(_e(150));if(x=A.call(x),x==null)throw Error(_e(151));for(var w=A=null,T=v,z=v=0,E=null,b=x.next();T!==null&&!b.done;z++,b=x.next()){T.index>z?(E=T,T=null):E=T.sibling;var V=h(u,T,b.value,y);if(V===null){T===null&&(T=E);break}t&&T&&V.alternate===null&&e(u,T),v=s(V,v,z),w===null?A=V:w.sibling=V,w=V,T=E}if(b.done)return n(u,T),Pt&&kr(u,z),A;if(T===null){for(;!b.done;z++,b=x.next())b=f(u,b.value,y),b!==null&&(v=s(b,v,z),w===null?A=b:w.sibling=b,w=b);return Pt&&kr(u,z),A}for(T=i(u,T);!b.done;z++,b=x.next())b=p(T,u,z,b.value,y),b!==null&&(t&&b.alternate!==null&&T.delete(b.key===null?z:b.key),v=s(b,v,z),w===null?A=b:w.sibling=b,w=b);return t&&T.forEach(function(X){return e(u,X)}),Pt&&kr(u,z),A}function m(u,v,x,y){if(typeof x=="object"&&x!==null&&x.type===Os&&x.key===null&&(x=x.props.children),typeof x=="object"&&x!==null){switch(x.$$typeof){case Ua:e:{for(var A=x.key,w=v;w!==null;){if(w.key===A){if(A=x.type,A===Os){if(w.tag===7){n(u,w.sibling),v=r(w,x.props.children),v.return=u,u=v;break e}}else if(w.elementType===A||typeof A=="object"&&A!==null&&A.$$typeof===rr&&vp(A)===w.type){n(u,w.sibling),v=r(w,x.props),v.ref=bo(u,w,x),v.return=u,u=v;break e}n(u,w);break}else e(u,w);w=w.sibling}x.type===Os?(v=Yr(x.props.children,u.mode,y,x.key),v.return=u,u=v):(y=Wl(x.type,x.key,x.props,null,u.mode,y),y.ref=bo(u,v,x),y.return=u,u=y)}return o(u);case Us:e:{for(w=x.key;v!==null;){if(v.key===w)if(v.tag===4&&v.stateNode.containerInfo===x.containerInfo&&v.stateNode.implementation===x.implementation){n(u,v.sibling),v=r(v,x.children||[]),v.return=u,u=v;break e}else{n(u,v);break}else e(u,v);v=v.sibling}v=bu(x,u.mode,y),v.return=u,u=v}return o(u);case rr:return w=x._init,m(u,v,w(x._payload),y)}if(Ho(x))return g(u,v,x,y);if(So(x))return _(u,v,x,y);Xa(u,x)}return typeof x=="string"&&x!==""||typeof x=="number"?(x=""+x,v!==null&&v.tag===6?(n(u,v.sibling),v=r(v,x),v.return=u,u=v):(n(u,v),v=Tu(x,u.mode,y),v.return=u,u=v),o(u)):n(u,v)}return m}var lo=Z0(!0),K0=Z0(!1),oc=Lr(null),ac=null,Ws=null,Yf=null;function qf(){Yf=Ws=ac=null}function Zf(t){var e=oc.current;Rt(oc),t._currentValue=e}function Wd(t,e,n){for(;t!==null;){var i=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,i!==null&&(i.childLanes|=e)):i!==null&&(i.childLanes&e)!==e&&(i.childLanes|=e),t===n)break;t=t.return}}function eo(t,e){ac=t,Yf=Ws=null,t=t.dependencies,t!==null&&t.firstContext!==null&&(t.lanes&e&&(Nn=!0),t.firstContext=null)}function si(t){var e=t._currentValue;if(Yf!==t)if(t={context:t,memoizedValue:e,next:null},Ws===null){if(ac===null)throw Error(_e(308));Ws=t,ac.dependencies={lanes:0,firstContext:t}}else Ws=Ws.next=t;return e}var jr=null;function Kf(t){jr===null?jr=[t]:jr.push(t)}function J0(t,e,n,i){var r=e.interleaved;return r===null?(n.next=n,Kf(e)):(n.next=r.next,r.next=n),e.interleaved=n,$i(t,i)}function $i(t,e){t.lanes|=e;var n=t.alternate;for(n!==null&&(n.lanes|=e),n=t,t=t.return;t!==null;)t.childLanes|=e,n=t.alternate,n!==null&&(n.childLanes|=e),n=t,t=t.return;return n.tag===3?n.stateNode:null}var sr=!1;function Jf(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Q0(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,effects:t.effects})}function Vi(t,e){return{eventTime:t,lane:e,tag:0,payload:null,callback:null,next:null}}function vr(t,e,n){var i=t.updateQueue;if(i===null)return null;if(i=i.shared,mt&2){var r=i.pending;return r===null?e.next=e:(e.next=r.next,r.next=e),i.pending=e,$i(t,n)}return r=i.interleaved,r===null?(e.next=e,Kf(i)):(e.next=r.next,r.next=e),i.interleaved=e,$i(t,n)}function kl(t,e,n){if(e=e.updateQueue,e!==null&&(e=e.shared,(n&4194240)!==0)){var i=e.lanes;i&=t.pendingLanes,n|=i,e.lanes=n,Ff(t,n)}}function _p(t,e){var n=t.updateQueue,i=t.alternate;if(i!==null&&(i=i.updateQueue,n===i)){var r=null,s=null;if(n=n.firstBaseUpdate,n!==null){do{var o={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};s===null?r=s=o:s=s.next=o,n=n.next}while(n!==null);s===null?r=s=e:s=s.next=e}else r=s=e;n={baseState:i.baseState,firstBaseUpdate:r,lastBaseUpdate:s,shared:i.shared,effects:i.effects},t.updateQueue=n;return}t=n.lastBaseUpdate,t===null?n.firstBaseUpdate=e:t.next=e,n.lastBaseUpdate=e}function lc(t,e,n,i){var r=t.updateQueue;sr=!1;var s=r.firstBaseUpdate,o=r.lastBaseUpdate,a=r.shared.pending;if(a!==null){r.shared.pending=null;var l=a,c=l.next;l.next=null,o===null?s=c:o.next=c,o=l;var d=t.alternate;d!==null&&(d=d.updateQueue,a=d.lastBaseUpdate,a!==o&&(a===null?d.firstBaseUpdate=c:a.next=c,d.lastBaseUpdate=l))}if(s!==null){var f=r.baseState;o=0,d=c=l=null,a=s;do{var h=a.lane,p=a.eventTime;if((i&h)===h){d!==null&&(d=d.next={eventTime:p,lane:0,tag:a.tag,payload:a.payload,callback:a.callback,next:null});e:{var g=t,_=a;switch(h=e,p=n,_.tag){case 1:if(g=_.payload,typeof g=="function"){f=g.call(p,f,h);break e}f=g;break e;case 3:g.flags=g.flags&-65537|128;case 0:if(g=_.payload,h=typeof g=="function"?g.call(p,f,h):g,h==null)break e;f=Ft({},f,h);break e;case 2:sr=!0}}a.callback!==null&&a.lane!==0&&(t.flags|=64,h=r.effects,h===null?r.effects=[a]:h.push(a))}else p={eventTime:p,lane:h,tag:a.tag,payload:a.payload,callback:a.callback,next:null},d===null?(c=d=p,l=f):d=d.next=p,o|=h;if(a=a.next,a===null){if(a=r.shared.pending,a===null)break;h=a,a=h.next,h.next=null,r.lastBaseUpdate=h,r.shared.pending=null}}while(!0);if(d===null&&(l=f),r.baseState=l,r.firstBaseUpdate=c,r.lastBaseUpdate=d,e=r.shared.interleaved,e!==null){r=e;do o|=r.lane,r=r.next;while(r!==e)}else s===null&&(r.shared.lanes=0);ts|=o,t.lanes=o,t.memoizedState=f}}function yp(t,e,n){if(t=e.effects,e.effects=null,t!==null)for(e=0;e<t.length;e++){var i=t[e],r=i.callback;if(r!==null){if(i.callback=null,i=n,typeof r!="function")throw Error(_e(191,r));r.call(i)}}}var Pa={},Ai=Lr(Pa),ma=Lr(Pa),ga=Lr(Pa);function Xr(t){if(t===Pa)throw Error(_e(174));return t}function Qf(t,e){switch(bt(ga,e),bt(ma,t),bt(Ai,Pa),t=e.nodeType,t){case 9:case 11:e=(e=e.documentElement)?e.namespaceURI:wd(null,"");break;default:t=t===8?e.parentNode:e,e=t.namespaceURI||null,t=t.tagName,e=wd(e,t)}Rt(Ai),bt(Ai,e)}function co(){Rt(Ai),Rt(ma),Rt(ga)}function ex(t){Xr(ga.current);var e=Xr(Ai.current),n=wd(e,t.type);e!==n&&(bt(ma,t),bt(Ai,n))}function eh(t){ma.current===t&&(Rt(Ai),Rt(ma))}var Dt=Lr(0);function cc(t){for(var e=t;e!==null;){if(e.tag===13){var n=e.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return e}else if(e.tag===19&&e.memoizedProps.revealOrder!==void 0){if(e.flags&128)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var _u=[];function th(){for(var t=0;t<_u.length;t++)_u[t]._workInProgressVersionPrimary=null;_u.length=0}var zl=Zi.ReactCurrentDispatcher,yu=Zi.ReactCurrentBatchConfig,es=0,Ot=null,Yt=null,rn=null,uc=!1,qo=!1,xa=0,Zy=0;function mn(){throw Error(_e(321))}function nh(t,e){if(e===null)return!1;for(var n=0;n<e.length&&n<t.length;n++)if(!_i(t[n],e[n]))return!1;return!0}function ih(t,e,n,i,r,s){if(es=s,Ot=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,zl.current=t===null||t.memoizedState===null?eS:tS,t=n(i,r),qo){s=0;do{if(qo=!1,xa=0,25<=s)throw Error(_e(301));s+=1,rn=Yt=null,e.updateQueue=null,zl.current=nS,t=n(i,r)}while(qo)}if(zl.current=dc,e=Yt!==null&&Yt.next!==null,es=0,rn=Yt=Ot=null,uc=!1,e)throw Error(_e(300));return t}function rh(){var t=xa!==0;return xa=0,t}function Mi(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return rn===null?Ot.memoizedState=rn=t:rn=rn.next=t,rn}function oi(){if(Yt===null){var t=Ot.alternate;t=t!==null?t.memoizedState:null}else t=Yt.next;var e=rn===null?Ot.memoizedState:rn.next;if(e!==null)rn=e,Yt=t;else{if(t===null)throw Error(_e(310));Yt=t,t={memoizedState:Yt.memoizedState,baseState:Yt.baseState,baseQueue:Yt.baseQueue,queue:Yt.queue,next:null},rn===null?Ot.memoizedState=rn=t:rn=rn.next=t}return rn}function va(t,e){return typeof e=="function"?e(t):e}function Su(t){var e=oi(),n=e.queue;if(n===null)throw Error(_e(311));n.lastRenderedReducer=t;var i=Yt,r=i.baseQueue,s=n.pending;if(s!==null){if(r!==null){var o=r.next;r.next=s.next,s.next=o}i.baseQueue=r=s,n.pending=null}if(r!==null){s=r.next,i=i.baseState;var a=o=null,l=null,c=s;do{var d=c.lane;if((es&d)===d)l!==null&&(l=l.next={lane:0,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),i=c.hasEagerState?c.eagerState:t(i,c.action);else{var f={lane:d,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null};l===null?(a=l=f,o=i):l=l.next=f,Ot.lanes|=d,ts|=d}c=c.next}while(c!==null&&c!==s);l===null?o=i:l.next=a,_i(i,e.memoizedState)||(Nn=!0),e.memoizedState=i,e.baseState=o,e.baseQueue=l,n.lastRenderedState=i}if(t=n.interleaved,t!==null){r=t;do s=r.lane,Ot.lanes|=s,ts|=s,r=r.next;while(r!==t)}else r===null&&(n.lanes=0);return[e.memoizedState,n.dispatch]}function Eu(t){var e=oi(),n=e.queue;if(n===null)throw Error(_e(311));n.lastRenderedReducer=t;var i=n.dispatch,r=n.pending,s=e.memoizedState;if(r!==null){n.pending=null;var o=r=r.next;do s=t(s,o.action),o=o.next;while(o!==r);_i(s,e.memoizedState)||(Nn=!0),e.memoizedState=s,e.baseQueue===null&&(e.baseState=s),n.lastRenderedState=s}return[s,i]}function tx(){}function nx(t,e){var n=Ot,i=oi(),r=e(),s=!_i(i.memoizedState,r);if(s&&(i.memoizedState=r,Nn=!0),i=i.queue,sh(sx.bind(null,n,i,t),[t]),i.getSnapshot!==e||s||rn!==null&&rn.memoizedState.tag&1){if(n.flags|=2048,_a(9,rx.bind(null,n,i,r,e),void 0,null),on===null)throw Error(_e(349));es&30||ix(n,e,r)}return r}function ix(t,e,n){t.flags|=16384,t={getSnapshot:e,value:n},e=Ot.updateQueue,e===null?(e={lastEffect:null,stores:null},Ot.updateQueue=e,e.stores=[t]):(n=e.stores,n===null?e.stores=[t]:n.push(t))}function rx(t,e,n,i){e.value=n,e.getSnapshot=i,ox(e)&&ax(t)}function sx(t,e,n){return n(function(){ox(e)&&ax(t)})}function ox(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!_i(t,n)}catch{return!0}}function ax(t){var e=$i(t,1);e!==null&&xi(e,t,1,-1)}function Sp(t){var e=Mi();return typeof t=="function"&&(t=t()),e.memoizedState=e.baseState=t,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:va,lastRenderedState:t},e.queue=t,t=t.dispatch=Qy.bind(null,Ot,t),[e.memoizedState,t]}function _a(t,e,n,i){return t={tag:t,create:e,destroy:n,deps:i,next:null},e=Ot.updateQueue,e===null?(e={lastEffect:null,stores:null},Ot.updateQueue=e,e.lastEffect=t.next=t):(n=e.lastEffect,n===null?e.lastEffect=t.next=t:(i=n.next,n.next=t,t.next=i,e.lastEffect=t)),t}function lx(){return oi().memoizedState}function Bl(t,e,n,i){var r=Mi();Ot.flags|=t,r.memoizedState=_a(1|e,n,void 0,i===void 0?null:i)}function Fc(t,e,n,i){var r=oi();i=i===void 0?null:i;var s=void 0;if(Yt!==null){var o=Yt.memoizedState;if(s=o.destroy,i!==null&&nh(i,o.deps)){r.memoizedState=_a(e,n,s,i);return}}Ot.flags|=t,r.memoizedState=_a(1|e,n,s,i)}function Ep(t,e){return Bl(8390656,8,t,e)}function sh(t,e){return Fc(2048,8,t,e)}function cx(t,e){return Fc(4,2,t,e)}function ux(t,e){return Fc(4,4,t,e)}function dx(t,e){if(typeof e=="function")return t=t(),e(t),function(){e(null)};if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function fx(t,e,n){return n=n!=null?n.concat([t]):null,Fc(4,4,dx.bind(null,e,t),n)}function oh(){}function hx(t,e){var n=oi();e=e===void 0?null:e;var i=n.memoizedState;return i!==null&&e!==null&&nh(e,i[1])?i[0]:(n.memoizedState=[t,e],t)}function px(t,e){var n=oi();e=e===void 0?null:e;var i=n.memoizedState;return i!==null&&e!==null&&nh(e,i[1])?i[0]:(t=t(),n.memoizedState=[t,e],t)}function mx(t,e,n){return es&21?(_i(n,e)||(n=y0(),Ot.lanes|=n,ts|=n,t.baseState=!0),e):(t.baseState&&(t.baseState=!1,Nn=!0),t.memoizedState=n)}function Ky(t,e){var n=yt;yt=n!==0&&4>n?n:4,t(!0);var i=yu.transition;yu.transition={};try{t(!1),e()}finally{yt=n,yu.transition=i}}function gx(){return oi().memoizedState}function Jy(t,e,n){var i=yr(t);if(n={lane:i,action:n,hasEagerState:!1,eagerState:null,next:null},xx(t))vx(e,n);else if(n=J0(t,e,n,i),n!==null){var r=Tn();xi(n,t,i,r),_x(n,e,i)}}function Qy(t,e,n){var i=yr(t),r={lane:i,action:n,hasEagerState:!1,eagerState:null,next:null};if(xx(t))vx(e,r);else{var s=t.alternate;if(t.lanes===0&&(s===null||s.lanes===0)&&(s=e.lastRenderedReducer,s!==null))try{var o=e.lastRenderedState,a=s(o,n);if(r.hasEagerState=!0,r.eagerState=a,_i(a,o)){var l=e.interleaved;l===null?(r.next=r,Kf(e)):(r.next=l.next,l.next=r),e.interleaved=r;return}}catch{}finally{}n=J0(t,e,r,i),n!==null&&(r=Tn(),xi(n,t,i,r),_x(n,e,i))}}function xx(t){var e=t.alternate;return t===Ot||e!==null&&e===Ot}function vx(t,e){qo=uc=!0;var n=t.pending;n===null?e.next=e:(e.next=n.next,n.next=e),t.pending=e}function _x(t,e,n){if(n&4194240){var i=e.lanes;i&=t.pendingLanes,n|=i,e.lanes=n,Ff(t,n)}}var dc={readContext:si,useCallback:mn,useContext:mn,useEffect:mn,useImperativeHandle:mn,useInsertionEffect:mn,useLayoutEffect:mn,useMemo:mn,useReducer:mn,useRef:mn,useState:mn,useDebugValue:mn,useDeferredValue:mn,useTransition:mn,useMutableSource:mn,useSyncExternalStore:mn,useId:mn,unstable_isNewReconciler:!1},eS={readContext:si,useCallback:function(t,e){return Mi().memoizedState=[t,e===void 0?null:e],t},useContext:si,useEffect:Ep,useImperativeHandle:function(t,e,n){return n=n!=null?n.concat([t]):null,Bl(4194308,4,dx.bind(null,e,t),n)},useLayoutEffect:function(t,e){return Bl(4194308,4,t,e)},useInsertionEffect:function(t,e){return Bl(4,2,t,e)},useMemo:function(t,e){var n=Mi();return e=e===void 0?null:e,t=t(),n.memoizedState=[t,e],t},useReducer:function(t,e,n){var i=Mi();return e=n!==void 0?n(e):e,i.memoizedState=i.baseState=e,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:e},i.queue=t,t=t.dispatch=Jy.bind(null,Ot,t),[i.memoizedState,t]},useRef:function(t){var e=Mi();return t={current:t},e.memoizedState=t},useState:Sp,useDebugValue:oh,useDeferredValue:function(t){return Mi().memoizedState=t},useTransition:function(){var t=Sp(!1),e=t[0];return t=Ky.bind(null,t[1]),Mi().memoizedState=t,[e,t]},useMutableSource:function(){},useSyncExternalStore:function(t,e,n){var i=Ot,r=Mi();if(Pt){if(n===void 0)throw Error(_e(407));n=n()}else{if(n=e(),on===null)throw Error(_e(349));es&30||ix(i,e,n)}r.memoizedState=n;var s={value:n,getSnapshot:e};return r.queue=s,Ep(sx.bind(null,i,s,t),[t]),i.flags|=2048,_a(9,rx.bind(null,i,s,n,e),void 0,null),n},useId:function(){var t=Mi(),e=on.identifierPrefix;if(Pt){var n=Bi,i=zi;n=(i&~(1<<32-gi(i)-1)).toString(32)+n,e=":"+e+"R"+n,n=xa++,0<n&&(e+="H"+n.toString(32)),e+=":"}else n=Zy++,e=":"+e+"r"+n.toString(32)+":";return t.memoizedState=e},unstable_isNewReconciler:!1},tS={readContext:si,useCallback:hx,useContext:si,useEffect:sh,useImperativeHandle:fx,useInsertionEffect:cx,useLayoutEffect:ux,useMemo:px,useReducer:Su,useRef:lx,useState:function(){return Su(va)},useDebugValue:oh,useDeferredValue:function(t){var e=oi();return mx(e,Yt.memoizedState,t)},useTransition:function(){var t=Su(va)[0],e=oi().memoizedState;return[t,e]},useMutableSource:tx,useSyncExternalStore:nx,useId:gx,unstable_isNewReconciler:!1},nS={readContext:si,useCallback:hx,useContext:si,useEffect:sh,useImperativeHandle:fx,useInsertionEffect:cx,useLayoutEffect:ux,useMemo:px,useReducer:Eu,useRef:lx,useState:function(){return Eu(va)},useDebugValue:oh,useDeferredValue:function(t){var e=oi();return Yt===null?e.memoizedState=t:mx(e,Yt.memoizedState,t)},useTransition:function(){var t=Eu(va)[0],e=oi().memoizedState;return[t,e]},useMutableSource:tx,useSyncExternalStore:nx,useId:gx,unstable_isNewReconciler:!1};function di(t,e){if(t&&t.defaultProps){e=Ft({},e),t=t.defaultProps;for(var n in t)e[n]===void 0&&(e[n]=t[n]);return e}return e}function jd(t,e,n,i){e=t.memoizedState,n=n(i,e),n=n==null?e:Ft({},e,n),t.memoizedState=n,t.lanes===0&&(t.updateQueue.baseState=n)}var kc={isMounted:function(t){return(t=t._reactInternals)?ls(t)===t:!1},enqueueSetState:function(t,e,n){t=t._reactInternals;var i=Tn(),r=yr(t),s=Vi(i,r);s.payload=e,n!=null&&(s.callback=n),e=vr(t,s,r),e!==null&&(xi(e,t,r,i),kl(e,t,r))},enqueueReplaceState:function(t,e,n){t=t._reactInternals;var i=Tn(),r=yr(t),s=Vi(i,r);s.tag=1,s.payload=e,n!=null&&(s.callback=n),e=vr(t,s,r),e!==null&&(xi(e,t,r,i),kl(e,t,r))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var n=Tn(),i=yr(t),r=Vi(n,i);r.tag=2,e!=null&&(r.callback=e),e=vr(t,r,i),e!==null&&(xi(e,t,i,n),kl(e,t,i))}};function Mp(t,e,n,i,r,s,o){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(i,s,o):e.prototype&&e.prototype.isPureReactComponent?!da(n,i)||!da(r,s):!0}function yx(t,e,n){var i=!1,r=Ar,s=e.contextType;return typeof s=="object"&&s!==null?s=si(s):(r=In(e)?Jr:yn.current,i=e.contextTypes,s=(i=i!=null)?oo(t,r):Ar),e=new e(n,s),t.memoizedState=e.state!==null&&e.state!==void 0?e.state:null,e.updater=kc,t.stateNode=e,e._reactInternals=t,i&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=r,t.__reactInternalMemoizedMaskedChildContext=s),e}function wp(t,e,n,i){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(n,i),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(n,i),e.state!==t&&kc.enqueueReplaceState(e,e.state,null)}function Xd(t,e,n,i){var r=t.stateNode;r.props=n,r.state=t.memoizedState,r.refs={},Jf(t);var s=e.contextType;typeof s=="object"&&s!==null?r.context=si(s):(s=In(e)?Jr:yn.current,r.context=oo(t,s)),r.state=t.memoizedState,s=e.getDerivedStateFromProps,typeof s=="function"&&(jd(t,e,s,n),r.state=t.memoizedState),typeof e.getDerivedStateFromProps=="function"||typeof r.getSnapshotBeforeUpdate=="function"||typeof r.UNSAFE_componentWillMount!="function"&&typeof r.componentWillMount!="function"||(e=r.state,typeof r.componentWillMount=="function"&&r.componentWillMount(),typeof r.UNSAFE_componentWillMount=="function"&&r.UNSAFE_componentWillMount(),e!==r.state&&kc.enqueueReplaceState(r,r.state,null),lc(t,n,r,i),r.state=t.memoizedState),typeof r.componentDidMount=="function"&&(t.flags|=4194308)}function uo(t,e){try{var n="",i=e;do n+=L_(i),i=i.return;while(i);var r=n}catch(s){r=`
Error generating stack: `+s.message+`
`+s.stack}return{value:t,source:e,stack:r,digest:null}}function Mu(t,e,n){return{value:t,source:null,stack:n??null,digest:e??null}}function $d(t,e){try{console.error(e.value)}catch(n){setTimeout(function(){throw n})}}var iS=typeof WeakMap=="function"?WeakMap:Map;function Sx(t,e,n){n=Vi(-1,n),n.tag=3,n.payload={element:null};var i=e.value;return n.callback=function(){hc||(hc=!0,rf=i),$d(t,e)},n}function Ex(t,e,n){n=Vi(-1,n),n.tag=3;var i=t.type.getDerivedStateFromError;if(typeof i=="function"){var r=e.value;n.payload=function(){return i(r)},n.callback=function(){$d(t,e)}}var s=t.stateNode;return s!==null&&typeof s.componentDidCatch=="function"&&(n.callback=function(){$d(t,e),typeof i!="function"&&(_r===null?_r=new Set([this]):_r.add(this));var o=e.stack;this.componentDidCatch(e.value,{componentStack:o!==null?o:""})}),n}function Tp(t,e,n){var i=t.pingCache;if(i===null){i=t.pingCache=new iS;var r=new Set;i.set(e,r)}else r=i.get(e),r===void 0&&(r=new Set,i.set(e,r));r.has(n)||(r.add(n),t=xS.bind(null,t,e,n),e.then(t,t))}function bp(t){do{var e;if((e=t.tag===13)&&(e=t.memoizedState,e=e!==null?e.dehydrated!==null:!0),e)return t;t=t.return}while(t!==null);return null}function Ap(t,e,n,i,r){return t.mode&1?(t.flags|=65536,t.lanes=r,t):(t===e?t.flags|=65536:(t.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(e=Vi(-1,1),e.tag=2,vr(n,e,1))),n.lanes|=1),t)}var rS=Zi.ReactCurrentOwner,Nn=!1;function Mn(t,e,n,i){e.child=t===null?K0(e,null,n,i):lo(e,t.child,n,i)}function Cp(t,e,n,i,r){n=n.render;var s=e.ref;return eo(e,r),i=ih(t,e,n,i,s,r),n=rh(),t!==null&&!Nn?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~r,Yi(t,e,r)):(Pt&&n&&jf(e),e.flags|=1,Mn(t,e,i,r),e.child)}function Rp(t,e,n,i,r){if(t===null){var s=n.type;return typeof s=="function"&&!ph(s)&&s.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(e.tag=15,e.type=s,Mx(t,e,s,i,r)):(t=Wl(n.type,null,i,e,e.mode,r),t.ref=e.ref,t.return=e,e.child=t)}if(s=t.child,!(t.lanes&r)){var o=s.memoizedProps;if(n=n.compare,n=n!==null?n:da,n(o,i)&&t.ref===e.ref)return Yi(t,e,r)}return e.flags|=1,t=Sr(s,i),t.ref=e.ref,t.return=e,e.child=t}function Mx(t,e,n,i,r){if(t!==null){var s=t.memoizedProps;if(da(s,i)&&t.ref===e.ref)if(Nn=!1,e.pendingProps=i=s,(t.lanes&r)!==0)t.flags&131072&&(Nn=!0);else return e.lanes=t.lanes,Yi(t,e,r)}return Yd(t,e,n,i,r)}function wx(t,e,n){var i=e.pendingProps,r=i.children,s=t!==null?t.memoizedState:null;if(i.mode==="hidden")if(!(e.mode&1))e.memoizedState={baseLanes:0,cachePool:null,transitions:null},bt(Xs,Gn),Gn|=n;else{if(!(n&1073741824))return t=s!==null?s.baseLanes|n:n,e.lanes=e.childLanes=1073741824,e.memoizedState={baseLanes:t,cachePool:null,transitions:null},e.updateQueue=null,bt(Xs,Gn),Gn|=t,null;e.memoizedState={baseLanes:0,cachePool:null,transitions:null},i=s!==null?s.baseLanes:n,bt(Xs,Gn),Gn|=i}else s!==null?(i=s.baseLanes|n,e.memoizedState=null):i=n,bt(Xs,Gn),Gn|=i;return Mn(t,e,r,n),e.child}function Tx(t,e){var n=e.ref;(t===null&&n!==null||t!==null&&t.ref!==n)&&(e.flags|=512,e.flags|=2097152)}function Yd(t,e,n,i,r){var s=In(n)?Jr:yn.current;return s=oo(e,s),eo(e,r),n=ih(t,e,n,i,s,r),i=rh(),t!==null&&!Nn?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~r,Yi(t,e,r)):(Pt&&i&&jf(e),e.flags|=1,Mn(t,e,n,r),e.child)}function Lp(t,e,n,i,r){if(In(n)){var s=!0;ic(e)}else s=!1;if(eo(e,r),e.stateNode===null)Hl(t,e),yx(e,n,i),Xd(e,n,i,r),i=!0;else if(t===null){var o=e.stateNode,a=e.memoizedProps;o.props=a;var l=o.context,c=n.contextType;typeof c=="object"&&c!==null?c=si(c):(c=In(n)?Jr:yn.current,c=oo(e,c));var d=n.getDerivedStateFromProps,f=typeof d=="function"||typeof o.getSnapshotBeforeUpdate=="function";f||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(a!==i||l!==c)&&wp(e,o,i,c),sr=!1;var h=e.memoizedState;o.state=h,lc(e,i,o,r),l=e.memoizedState,a!==i||h!==l||Dn.current||sr?(typeof d=="function"&&(jd(e,n,d,i),l=e.memoizedState),(a=sr||Mp(e,n,a,i,h,l,c))?(f||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(e.flags|=4194308)):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=i,e.memoizedState=l),o.props=i,o.state=l,o.context=c,i=a):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),i=!1)}else{o=e.stateNode,Q0(t,e),a=e.memoizedProps,c=e.type===e.elementType?a:di(e.type,a),o.props=c,f=e.pendingProps,h=o.context,l=n.contextType,typeof l=="object"&&l!==null?l=si(l):(l=In(n)?Jr:yn.current,l=oo(e,l));var p=n.getDerivedStateFromProps;(d=typeof p=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(a!==f||h!==l)&&wp(e,o,i,l),sr=!1,h=e.memoizedState,o.state=h,lc(e,i,o,r);var g=e.memoizedState;a!==f||h!==g||Dn.current||sr?(typeof p=="function"&&(jd(e,n,p,i),g=e.memoizedState),(c=sr||Mp(e,n,c,i,h,g,l)||!1)?(d||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(i,g,l),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(i,g,l)),typeof o.componentDidUpdate=="function"&&(e.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof o.componentDidUpdate!="function"||a===t.memoizedProps&&h===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||a===t.memoizedProps&&h===t.memoizedState||(e.flags|=1024),e.memoizedProps=i,e.memoizedState=g),o.props=i,o.state=g,o.context=l,i=c):(typeof o.componentDidUpdate!="function"||a===t.memoizedProps&&h===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||a===t.memoizedProps&&h===t.memoizedState||(e.flags|=1024),i=!1)}return qd(t,e,n,i,s,r)}function qd(t,e,n,i,r,s){Tx(t,e);var o=(e.flags&128)!==0;if(!i&&!o)return r&&mp(e,n,!1),Yi(t,e,s);i=e.stateNode,rS.current=e;var a=o&&typeof n.getDerivedStateFromError!="function"?null:i.render();return e.flags|=1,t!==null&&o?(e.child=lo(e,t.child,null,s),e.child=lo(e,null,a,s)):Mn(t,e,a,s),e.memoizedState=i.state,r&&mp(e,n,!0),e.child}function bx(t){var e=t.stateNode;e.pendingContext?pp(t,e.pendingContext,e.pendingContext!==e.context):e.context&&pp(t,e.context,!1),Qf(t,e.containerInfo)}function Pp(t,e,n,i,r){return ao(),$f(r),e.flags|=256,Mn(t,e,n,i),e.child}var Zd={dehydrated:null,treeContext:null,retryLane:0};function Kd(t){return{baseLanes:t,cachePool:null,transitions:null}}function Ax(t,e,n){var i=e.pendingProps,r=Dt.current,s=!1,o=(e.flags&128)!==0,a;if((a=o)||(a=t!==null&&t.memoizedState===null?!1:(r&2)!==0),a?(s=!0,e.flags&=-129):(t===null||t.memoizedState!==null)&&(r|=1),bt(Dt,r&1),t===null)return Vd(e),t=e.memoizedState,t!==null&&(t=t.dehydrated,t!==null)?(e.mode&1?t.data==="$!"?e.lanes=8:e.lanes=1073741824:e.lanes=1,null):(o=i.children,t=i.fallback,s?(i=e.mode,s=e.child,o={mode:"hidden",children:o},!(i&1)&&s!==null?(s.childLanes=0,s.pendingProps=o):s=Hc(o,i,0,null),t=Yr(t,i,n,null),s.return=e,t.return=e,s.sibling=t,e.child=s,e.child.memoizedState=Kd(n),e.memoizedState=Zd,t):ah(e,o));if(r=t.memoizedState,r!==null&&(a=r.dehydrated,a!==null))return sS(t,e,o,i,a,r,n);if(s){s=i.fallback,o=e.mode,r=t.child,a=r.sibling;var l={mode:"hidden",children:i.children};return!(o&1)&&e.child!==r?(i=e.child,i.childLanes=0,i.pendingProps=l,e.deletions=null):(i=Sr(r,l),i.subtreeFlags=r.subtreeFlags&14680064),a!==null?s=Sr(a,s):(s=Yr(s,o,n,null),s.flags|=2),s.return=e,i.return=e,i.sibling=s,e.child=i,i=s,s=e.child,o=t.child.memoizedState,o=o===null?Kd(n):{baseLanes:o.baseLanes|n,cachePool:null,transitions:o.transitions},s.memoizedState=o,s.childLanes=t.childLanes&~n,e.memoizedState=Zd,i}return s=t.child,t=s.sibling,i=Sr(s,{mode:"visible",children:i.children}),!(e.mode&1)&&(i.lanes=n),i.return=e,i.sibling=null,t!==null&&(n=e.deletions,n===null?(e.deletions=[t],e.flags|=16):n.push(t)),e.child=i,e.memoizedState=null,i}function ah(t,e){return e=Hc({mode:"visible",children:e},t.mode,0,null),e.return=t,t.child=e}function $a(t,e,n,i){return i!==null&&$f(i),lo(e,t.child,null,n),t=ah(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function sS(t,e,n,i,r,s,o){if(n)return e.flags&256?(e.flags&=-257,i=Mu(Error(_e(422))),$a(t,e,o,i)):e.memoizedState!==null?(e.child=t.child,e.flags|=128,null):(s=i.fallback,r=e.mode,i=Hc({mode:"visible",children:i.children},r,0,null),s=Yr(s,r,o,null),s.flags|=2,i.return=e,s.return=e,i.sibling=s,e.child=i,e.mode&1&&lo(e,t.child,null,o),e.child.memoizedState=Kd(o),e.memoizedState=Zd,s);if(!(e.mode&1))return $a(t,e,o,null);if(r.data==="$!"){if(i=r.nextSibling&&r.nextSibling.dataset,i)var a=i.dgst;return i=a,s=Error(_e(419)),i=Mu(s,i,void 0),$a(t,e,o,i)}if(a=(o&t.childLanes)!==0,Nn||a){if(i=on,i!==null){switch(o&-o){case 4:r=2;break;case 16:r=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:r=32;break;case 536870912:r=268435456;break;default:r=0}r=r&(i.suspendedLanes|o)?0:r,r!==0&&r!==s.retryLane&&(s.retryLane=r,$i(t,r),xi(i,t,r,-1))}return hh(),i=Mu(Error(_e(421))),$a(t,e,o,i)}return r.data==="$?"?(e.flags|=128,e.child=t.child,e=vS.bind(null,t),r._reactRetry=e,null):(t=s.treeContext,jn=xr(r.nextSibling),Xn=e,Pt=!0,hi=null,t!==null&&(Jn[Qn++]=zi,Jn[Qn++]=Bi,Jn[Qn++]=Qr,zi=t.id,Bi=t.overflow,Qr=e),e=ah(e,i.children),e.flags|=4096,e)}function Np(t,e,n){t.lanes|=e;var i=t.alternate;i!==null&&(i.lanes|=e),Wd(t.return,e,n)}function wu(t,e,n,i,r){var s=t.memoizedState;s===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:i,tail:n,tailMode:r}:(s.isBackwards=e,s.rendering=null,s.renderingStartTime=0,s.last=i,s.tail=n,s.tailMode=r)}function Cx(t,e,n){var i=e.pendingProps,r=i.revealOrder,s=i.tail;if(Mn(t,e,i.children,n),i=Dt.current,i&2)i=i&1|2,e.flags|=128;else{if(t!==null&&t.flags&128)e:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&Np(t,n,e);else if(t.tag===19)Np(t,n,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}i&=1}if(bt(Dt,i),!(e.mode&1))e.memoizedState=null;else switch(r){case"forwards":for(n=e.child,r=null;n!==null;)t=n.alternate,t!==null&&cc(t)===null&&(r=n),n=n.sibling;n=r,n===null?(r=e.child,e.child=null):(r=n.sibling,n.sibling=null),wu(e,!1,r,n,s);break;case"backwards":for(n=null,r=e.child,e.child=null;r!==null;){if(t=r.alternate,t!==null&&cc(t)===null){e.child=r;break}t=r.sibling,r.sibling=n,n=r,r=t}wu(e,!0,n,null,s);break;case"together":wu(e,!1,null,null,void 0);break;default:e.memoizedState=null}return e.child}function Hl(t,e){!(e.mode&1)&&t!==null&&(t.alternate=null,e.alternate=null,e.flags|=2)}function Yi(t,e,n){if(t!==null&&(e.dependencies=t.dependencies),ts|=e.lanes,!(n&e.childLanes))return null;if(t!==null&&e.child!==t.child)throw Error(_e(153));if(e.child!==null){for(t=e.child,n=Sr(t,t.pendingProps),e.child=n,n.return=e;t.sibling!==null;)t=t.sibling,n=n.sibling=Sr(t,t.pendingProps),n.return=e;n.sibling=null}return e.child}function oS(t,e,n){switch(e.tag){case 3:bx(e),ao();break;case 5:ex(e);break;case 1:In(e.type)&&ic(e);break;case 4:Qf(e,e.stateNode.containerInfo);break;case 10:var i=e.type._context,r=e.memoizedProps.value;bt(oc,i._currentValue),i._currentValue=r;break;case 13:if(i=e.memoizedState,i!==null)return i.dehydrated!==null?(bt(Dt,Dt.current&1),e.flags|=128,null):n&e.child.childLanes?Ax(t,e,n):(bt(Dt,Dt.current&1),t=Yi(t,e,n),t!==null?t.sibling:null);bt(Dt,Dt.current&1);break;case 19:if(i=(n&e.childLanes)!==0,t.flags&128){if(i)return Cx(t,e,n);e.flags|=128}if(r=e.memoizedState,r!==null&&(r.rendering=null,r.tail=null,r.lastEffect=null),bt(Dt,Dt.current),i)break;return null;case 22:case 23:return e.lanes=0,wx(t,e,n)}return Yi(t,e,n)}var Rx,Jd,Lx,Px;Rx=function(t,e){for(var n=e.child;n!==null;){if(n.tag===5||n.tag===6)t.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};Jd=function(){};Lx=function(t,e,n,i){var r=t.memoizedProps;if(r!==i){t=e.stateNode,Xr(Ai.current);var s=null;switch(n){case"input":r=yd(t,r),i=yd(t,i),s=[];break;case"select":r=Ft({},r,{value:void 0}),i=Ft({},i,{value:void 0}),s=[];break;case"textarea":r=Md(t,r),i=Md(t,i),s=[];break;default:typeof r.onClick!="function"&&typeof i.onClick=="function"&&(t.onclick=tc)}Td(n,i);var o;n=null;for(c in r)if(!i.hasOwnProperty(c)&&r.hasOwnProperty(c)&&r[c]!=null)if(c==="style"){var a=r[c];for(o in a)a.hasOwnProperty(o)&&(n||(n={}),n[o]="")}else c!=="dangerouslySetInnerHTML"&&c!=="children"&&c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&c!=="autoFocus"&&(ra.hasOwnProperty(c)?s||(s=[]):(s=s||[]).push(c,null));for(c in i){var l=i[c];if(a=r!=null?r[c]:void 0,i.hasOwnProperty(c)&&l!==a&&(l!=null||a!=null))if(c==="style")if(a){for(o in a)!a.hasOwnProperty(o)||l&&l.hasOwnProperty(o)||(n||(n={}),n[o]="");for(o in l)l.hasOwnProperty(o)&&a[o]!==l[o]&&(n||(n={}),n[o]=l[o])}else n||(s||(s=[]),s.push(c,n)),n=l;else c==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,a=a?a.__html:void 0,l!=null&&a!==l&&(s=s||[]).push(c,l)):c==="children"?typeof l!="string"&&typeof l!="number"||(s=s||[]).push(c,""+l):c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&(ra.hasOwnProperty(c)?(l!=null&&c==="onScroll"&&At("scroll",t),s||a===l||(s=[])):(s=s||[]).push(c,l))}n&&(s=s||[]).push("style",n);var c=s;(e.updateQueue=c)&&(e.flags|=4)}};Px=function(t,e,n,i){n!==i&&(e.flags|=4)};function Ao(t,e){if(!Pt)switch(t.tailMode){case"hidden":e=t.tail;for(var n=null;e!==null;)e.alternate!==null&&(n=e),e=e.sibling;n===null?t.tail=null:n.sibling=null;break;case"collapsed":n=t.tail;for(var i=null;n!==null;)n.alternate!==null&&(i=n),n=n.sibling;i===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:i.sibling=null}}function gn(t){var e=t.alternate!==null&&t.alternate.child===t.child,n=0,i=0;if(e)for(var r=t.child;r!==null;)n|=r.lanes|r.childLanes,i|=r.subtreeFlags&14680064,i|=r.flags&14680064,r.return=t,r=r.sibling;else for(r=t.child;r!==null;)n|=r.lanes|r.childLanes,i|=r.subtreeFlags,i|=r.flags,r.return=t,r=r.sibling;return t.subtreeFlags|=i,t.childLanes=n,e}function aS(t,e,n){var i=e.pendingProps;switch(Xf(e),e.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return gn(e),null;case 1:return In(e.type)&&nc(),gn(e),null;case 3:return i=e.stateNode,co(),Rt(Dn),Rt(yn),th(),i.pendingContext&&(i.context=i.pendingContext,i.pendingContext=null),(t===null||t.child===null)&&(ja(e)?e.flags|=4:t===null||t.memoizedState.isDehydrated&&!(e.flags&256)||(e.flags|=1024,hi!==null&&(af(hi),hi=null))),Jd(t,e),gn(e),null;case 5:eh(e);var r=Xr(ga.current);if(n=e.type,t!==null&&e.stateNode!=null)Lx(t,e,n,i,r),t.ref!==e.ref&&(e.flags|=512,e.flags|=2097152);else{if(!i){if(e.stateNode===null)throw Error(_e(166));return gn(e),null}if(t=Xr(Ai.current),ja(e)){i=e.stateNode,n=e.type;var s=e.memoizedProps;switch(i[Ti]=e,i[pa]=s,t=(e.mode&1)!==0,n){case"dialog":At("cancel",i),At("close",i);break;case"iframe":case"object":case"embed":At("load",i);break;case"video":case"audio":for(r=0;r<Vo.length;r++)At(Vo[r],i);break;case"source":At("error",i);break;case"img":case"image":case"link":At("error",i),At("load",i);break;case"details":At("toggle",i);break;case"input":Hh(i,s),At("invalid",i);break;case"select":i._wrapperState={wasMultiple:!!s.multiple},At("invalid",i);break;case"textarea":Vh(i,s),At("invalid",i)}Td(n,s),r=null;for(var o in s)if(s.hasOwnProperty(o)){var a=s[o];o==="children"?typeof a=="string"?i.textContent!==a&&(s.suppressHydrationWarning!==!0&&Wa(i.textContent,a,t),r=["children",a]):typeof a=="number"&&i.textContent!==""+a&&(s.suppressHydrationWarning!==!0&&Wa(i.textContent,a,t),r=["children",""+a]):ra.hasOwnProperty(o)&&a!=null&&o==="onScroll"&&At("scroll",i)}switch(n){case"input":Oa(i),Gh(i,s,!0);break;case"textarea":Oa(i),Wh(i);break;case"select":case"option":break;default:typeof s.onClick=="function"&&(i.onclick=tc)}i=r,e.updateQueue=i,i!==null&&(e.flags|=4)}else{o=r.nodeType===9?r:r.ownerDocument,t==="http://www.w3.org/1999/xhtml"&&(t=s0(n)),t==="http://www.w3.org/1999/xhtml"?n==="script"?(t=o.createElement("div"),t.innerHTML="<script><\/script>",t=t.removeChild(t.firstChild)):typeof i.is=="string"?t=o.createElement(n,{is:i.is}):(t=o.createElement(n),n==="select"&&(o=t,i.multiple?o.multiple=!0:i.size&&(o.size=i.size))):t=o.createElementNS(t,n),t[Ti]=e,t[pa]=i,Rx(t,e,!1,!1),e.stateNode=t;e:{switch(o=bd(n,i),n){case"dialog":At("cancel",t),At("close",t),r=i;break;case"iframe":case"object":case"embed":At("load",t),r=i;break;case"video":case"audio":for(r=0;r<Vo.length;r++)At(Vo[r],t);r=i;break;case"source":At("error",t),r=i;break;case"img":case"image":case"link":At("error",t),At("load",t),r=i;break;case"details":At("toggle",t),r=i;break;case"input":Hh(t,i),r=yd(t,i),At("invalid",t);break;case"option":r=i;break;case"select":t._wrapperState={wasMultiple:!!i.multiple},r=Ft({},i,{value:void 0}),At("invalid",t);break;case"textarea":Vh(t,i),r=Md(t,i),At("invalid",t);break;default:r=i}Td(n,r),a=r;for(s in a)if(a.hasOwnProperty(s)){var l=a[s];s==="style"?l0(t,l):s==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,l!=null&&o0(t,l)):s==="children"?typeof l=="string"?(n!=="textarea"||l!=="")&&sa(t,l):typeof l=="number"&&sa(t,""+l):s!=="suppressContentEditableWarning"&&s!=="suppressHydrationWarning"&&s!=="autoFocus"&&(ra.hasOwnProperty(s)?l!=null&&s==="onScroll"&&At("scroll",t):l!=null&&Pf(t,s,l,o))}switch(n){case"input":Oa(t),Gh(t,i,!1);break;case"textarea":Oa(t),Wh(t);break;case"option":i.value!=null&&t.setAttribute("value",""+br(i.value));break;case"select":t.multiple=!!i.multiple,s=i.value,s!=null?Zs(t,!!i.multiple,s,!1):i.defaultValue!=null&&Zs(t,!!i.multiple,i.defaultValue,!0);break;default:typeof r.onClick=="function"&&(t.onclick=tc)}switch(n){case"button":case"input":case"select":case"textarea":i=!!i.autoFocus;break e;case"img":i=!0;break e;default:i=!1}}i&&(e.flags|=4)}e.ref!==null&&(e.flags|=512,e.flags|=2097152)}return gn(e),null;case 6:if(t&&e.stateNode!=null)Px(t,e,t.memoizedProps,i);else{if(typeof i!="string"&&e.stateNode===null)throw Error(_e(166));if(n=Xr(ga.current),Xr(Ai.current),ja(e)){if(i=e.stateNode,n=e.memoizedProps,i[Ti]=e,(s=i.nodeValue!==n)&&(t=Xn,t!==null))switch(t.tag){case 3:Wa(i.nodeValue,n,(t.mode&1)!==0);break;case 5:t.memoizedProps.suppressHydrationWarning!==!0&&Wa(i.nodeValue,n,(t.mode&1)!==0)}s&&(e.flags|=4)}else i=(n.nodeType===9?n:n.ownerDocument).createTextNode(i),i[Ti]=e,e.stateNode=i}return gn(e),null;case 13:if(Rt(Dt),i=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(Pt&&jn!==null&&e.mode&1&&!(e.flags&128))q0(),ao(),e.flags|=98560,s=!1;else if(s=ja(e),i!==null&&i.dehydrated!==null){if(t===null){if(!s)throw Error(_e(318));if(s=e.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(_e(317));s[Ti]=e}else ao(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;gn(e),s=!1}else hi!==null&&(af(hi),hi=null),s=!0;if(!s)return e.flags&65536?e:null}return e.flags&128?(e.lanes=n,e):(i=i!==null,i!==(t!==null&&t.memoizedState!==null)&&i&&(e.child.flags|=8192,e.mode&1&&(t===null||Dt.current&1?qt===0&&(qt=3):hh())),e.updateQueue!==null&&(e.flags|=4),gn(e),null);case 4:return co(),Jd(t,e),t===null&&fa(e.stateNode.containerInfo),gn(e),null;case 10:return Zf(e.type._context),gn(e),null;case 17:return In(e.type)&&nc(),gn(e),null;case 19:if(Rt(Dt),s=e.memoizedState,s===null)return gn(e),null;if(i=(e.flags&128)!==0,o=s.rendering,o===null)if(i)Ao(s,!1);else{if(qt!==0||t!==null&&t.flags&128)for(t=e.child;t!==null;){if(o=cc(t),o!==null){for(e.flags|=128,Ao(s,!1),i=o.updateQueue,i!==null&&(e.updateQueue=i,e.flags|=4),e.subtreeFlags=0,i=n,n=e.child;n!==null;)s=n,t=i,s.flags&=14680066,o=s.alternate,o===null?(s.childLanes=0,s.lanes=t,s.child=null,s.subtreeFlags=0,s.memoizedProps=null,s.memoizedState=null,s.updateQueue=null,s.dependencies=null,s.stateNode=null):(s.childLanes=o.childLanes,s.lanes=o.lanes,s.child=o.child,s.subtreeFlags=0,s.deletions=null,s.memoizedProps=o.memoizedProps,s.memoizedState=o.memoizedState,s.updateQueue=o.updateQueue,s.type=o.type,t=o.dependencies,s.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),n=n.sibling;return bt(Dt,Dt.current&1|2),e.child}t=t.sibling}s.tail!==null&&Vt()>fo&&(e.flags|=128,i=!0,Ao(s,!1),e.lanes=4194304)}else{if(!i)if(t=cc(o),t!==null){if(e.flags|=128,i=!0,n=t.updateQueue,n!==null&&(e.updateQueue=n,e.flags|=4),Ao(s,!0),s.tail===null&&s.tailMode==="hidden"&&!o.alternate&&!Pt)return gn(e),null}else 2*Vt()-s.renderingStartTime>fo&&n!==1073741824&&(e.flags|=128,i=!0,Ao(s,!1),e.lanes=4194304);s.isBackwards?(o.sibling=e.child,e.child=o):(n=s.last,n!==null?n.sibling=o:e.child=o,s.last=o)}return s.tail!==null?(e=s.tail,s.rendering=e,s.tail=e.sibling,s.renderingStartTime=Vt(),e.sibling=null,n=Dt.current,bt(Dt,i?n&1|2:n&1),e):(gn(e),null);case 22:case 23:return fh(),i=e.memoizedState!==null,t!==null&&t.memoizedState!==null!==i&&(e.flags|=8192),i&&e.mode&1?Gn&1073741824&&(gn(e),e.subtreeFlags&6&&(e.flags|=8192)):gn(e),null;case 24:return null;case 25:return null}throw Error(_e(156,e.tag))}function lS(t,e){switch(Xf(e),e.tag){case 1:return In(e.type)&&nc(),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return co(),Rt(Dn),Rt(yn),th(),t=e.flags,t&65536&&!(t&128)?(e.flags=t&-65537|128,e):null;case 5:return eh(e),null;case 13:if(Rt(Dt),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(_e(340));ao()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return Rt(Dt),null;case 4:return co(),null;case 10:return Zf(e.type._context),null;case 22:case 23:return fh(),null;case 24:return null;default:return null}}var Ya=!1,_n=!1,cS=typeof WeakSet=="function"?WeakSet:Set,Be=null;function js(t,e){var n=t.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(i){Bt(t,e,i)}else n.current=null}function Qd(t,e,n){try{n()}catch(i){Bt(t,e,i)}}var Dp=!1;function uS(t,e){if(Od=Jl,t=O0(),Wf(t)){if("selectionStart"in t)var n={start:t.selectionStart,end:t.selectionEnd};else e:{n=(n=t.ownerDocument)&&n.defaultView||window;var i=n.getSelection&&n.getSelection();if(i&&i.rangeCount!==0){n=i.anchorNode;var r=i.anchorOffset,s=i.focusNode;i=i.focusOffset;try{n.nodeType,s.nodeType}catch{n=null;break e}var o=0,a=-1,l=-1,c=0,d=0,f=t,h=null;t:for(;;){for(var p;f!==n||r!==0&&f.nodeType!==3||(a=o+r),f!==s||i!==0&&f.nodeType!==3||(l=o+i),f.nodeType===3&&(o+=f.nodeValue.length),(p=f.firstChild)!==null;)h=f,f=p;for(;;){if(f===t)break t;if(h===n&&++c===r&&(a=o),h===s&&++d===i&&(l=o),(p=f.nextSibling)!==null)break;f=h,h=f.parentNode}f=p}n=a===-1||l===-1?null:{start:a,end:l}}else n=null}n=n||{start:0,end:0}}else n=null;for(Fd={focusedElem:t,selectionRange:n},Jl=!1,Be=e;Be!==null;)if(e=Be,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,Be=t;else for(;Be!==null;){e=Be;try{var g=e.alternate;if(e.flags&1024)switch(e.tag){case 0:case 11:case 15:break;case 1:if(g!==null){var _=g.memoizedProps,m=g.memoizedState,u=e.stateNode,v=u.getSnapshotBeforeUpdate(e.elementType===e.type?_:di(e.type,_),m);u.__reactInternalSnapshotBeforeUpdate=v}break;case 3:var x=e.stateNode.containerInfo;x.nodeType===1?x.textContent="":x.nodeType===9&&x.documentElement&&x.removeChild(x.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(_e(163))}}catch(y){Bt(e,e.return,y)}if(t=e.sibling,t!==null){t.return=e.return,Be=t;break}Be=e.return}return g=Dp,Dp=!1,g}function Zo(t,e,n){var i=e.updateQueue;if(i=i!==null?i.lastEffect:null,i!==null){var r=i=i.next;do{if((r.tag&t)===t){var s=r.destroy;r.destroy=void 0,s!==void 0&&Qd(e,n,s)}r=r.next}while(r!==i)}}function zc(t,e){if(e=e.updateQueue,e=e!==null?e.lastEffect:null,e!==null){var n=e=e.next;do{if((n.tag&t)===t){var i=n.create;n.destroy=i()}n=n.next}while(n!==e)}}function ef(t){var e=t.ref;if(e!==null){var n=t.stateNode;switch(t.tag){case 5:t=n;break;default:t=n}typeof e=="function"?e(t):e.current=t}}function Nx(t){var e=t.alternate;e!==null&&(t.alternate=null,Nx(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&(delete e[Ti],delete e[pa],delete e[Bd],delete e[Xy],delete e[$y])),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}function Dx(t){return t.tag===5||t.tag===3||t.tag===4}function Ip(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||Dx(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function tf(t,e,n){var i=t.tag;if(i===5||i===6)t=t.stateNode,e?n.nodeType===8?n.parentNode.insertBefore(t,e):n.insertBefore(t,e):(n.nodeType===8?(e=n.parentNode,e.insertBefore(t,n)):(e=n,e.appendChild(t)),n=n._reactRootContainer,n!=null||e.onclick!==null||(e.onclick=tc));else if(i!==4&&(t=t.child,t!==null))for(tf(t,e,n),t=t.sibling;t!==null;)tf(t,e,n),t=t.sibling}function nf(t,e,n){var i=t.tag;if(i===5||i===6)t=t.stateNode,e?n.insertBefore(t,e):n.appendChild(t);else if(i!==4&&(t=t.child,t!==null))for(nf(t,e,n),t=t.sibling;t!==null;)nf(t,e,n),t=t.sibling}var cn=null,fi=!1;function Ki(t,e,n){for(n=n.child;n!==null;)Ix(t,e,n),n=n.sibling}function Ix(t,e,n){if(bi&&typeof bi.onCommitFiberUnmount=="function")try{bi.onCommitFiberUnmount(Pc,n)}catch{}switch(n.tag){case 5:_n||js(n,e);case 6:var i=cn,r=fi;cn=null,Ki(t,e,n),cn=i,fi=r,cn!==null&&(fi?(t=cn,n=n.stateNode,t.nodeType===8?t.parentNode.removeChild(n):t.removeChild(n)):cn.removeChild(n.stateNode));break;case 18:cn!==null&&(fi?(t=cn,n=n.stateNode,t.nodeType===8?xu(t.parentNode,n):t.nodeType===1&&xu(t,n),ca(t)):xu(cn,n.stateNode));break;case 4:i=cn,r=fi,cn=n.stateNode.containerInfo,fi=!0,Ki(t,e,n),cn=i,fi=r;break;case 0:case 11:case 14:case 15:if(!_n&&(i=n.updateQueue,i!==null&&(i=i.lastEffect,i!==null))){r=i=i.next;do{var s=r,o=s.destroy;s=s.tag,o!==void 0&&(s&2||s&4)&&Qd(n,e,o),r=r.next}while(r!==i)}Ki(t,e,n);break;case 1:if(!_n&&(js(n,e),i=n.stateNode,typeof i.componentWillUnmount=="function"))try{i.props=n.memoizedProps,i.state=n.memoizedState,i.componentWillUnmount()}catch(a){Bt(n,e,a)}Ki(t,e,n);break;case 21:Ki(t,e,n);break;case 22:n.mode&1?(_n=(i=_n)||n.memoizedState!==null,Ki(t,e,n),_n=i):Ki(t,e,n);break;default:Ki(t,e,n)}}function Up(t){var e=t.updateQueue;if(e!==null){t.updateQueue=null;var n=t.stateNode;n===null&&(n=t.stateNode=new cS),e.forEach(function(i){var r=_S.bind(null,t,i);n.has(i)||(n.add(i),i.then(r,r))})}}function ai(t,e){var n=e.deletions;if(n!==null)for(var i=0;i<n.length;i++){var r=n[i];try{var s=t,o=e,a=o;e:for(;a!==null;){switch(a.tag){case 5:cn=a.stateNode,fi=!1;break e;case 3:cn=a.stateNode.containerInfo,fi=!0;break e;case 4:cn=a.stateNode.containerInfo,fi=!0;break e}a=a.return}if(cn===null)throw Error(_e(160));Ix(s,o,r),cn=null,fi=!1;var l=r.alternate;l!==null&&(l.return=null),r.return=null}catch(c){Bt(r,e,c)}}if(e.subtreeFlags&12854)for(e=e.child;e!==null;)Ux(e,t),e=e.sibling}function Ux(t,e){var n=t.alternate,i=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:if(ai(e,t),Ei(t),i&4){try{Zo(3,t,t.return),zc(3,t)}catch(_){Bt(t,t.return,_)}try{Zo(5,t,t.return)}catch(_){Bt(t,t.return,_)}}break;case 1:ai(e,t),Ei(t),i&512&&n!==null&&js(n,n.return);break;case 5:if(ai(e,t),Ei(t),i&512&&n!==null&&js(n,n.return),t.flags&32){var r=t.stateNode;try{sa(r,"")}catch(_){Bt(t,t.return,_)}}if(i&4&&(r=t.stateNode,r!=null)){var s=t.memoizedProps,o=n!==null?n.memoizedProps:s,a=t.type,l=t.updateQueue;if(t.updateQueue=null,l!==null)try{a==="input"&&s.type==="radio"&&s.name!=null&&i0(r,s),bd(a,o);var c=bd(a,s);for(o=0;o<l.length;o+=2){var d=l[o],f=l[o+1];d==="style"?l0(r,f):d==="dangerouslySetInnerHTML"?o0(r,f):d==="children"?sa(r,f):Pf(r,d,f,c)}switch(a){case"input":Sd(r,s);break;case"textarea":r0(r,s);break;case"select":var h=r._wrapperState.wasMultiple;r._wrapperState.wasMultiple=!!s.multiple;var p=s.value;p!=null?Zs(r,!!s.multiple,p,!1):h!==!!s.multiple&&(s.defaultValue!=null?Zs(r,!!s.multiple,s.defaultValue,!0):Zs(r,!!s.multiple,s.multiple?[]:"",!1))}r[pa]=s}catch(_){Bt(t,t.return,_)}}break;case 6:if(ai(e,t),Ei(t),i&4){if(t.stateNode===null)throw Error(_e(162));r=t.stateNode,s=t.memoizedProps;try{r.nodeValue=s}catch(_){Bt(t,t.return,_)}}break;case 3:if(ai(e,t),Ei(t),i&4&&n!==null&&n.memoizedState.isDehydrated)try{ca(e.containerInfo)}catch(_){Bt(t,t.return,_)}break;case 4:ai(e,t),Ei(t);break;case 13:ai(e,t),Ei(t),r=t.child,r.flags&8192&&(s=r.memoizedState!==null,r.stateNode.isHidden=s,!s||r.alternate!==null&&r.alternate.memoizedState!==null||(uh=Vt())),i&4&&Up(t);break;case 22:if(d=n!==null&&n.memoizedState!==null,t.mode&1?(_n=(c=_n)||d,ai(e,t),_n=c):ai(e,t),Ei(t),i&8192){if(c=t.memoizedState!==null,(t.stateNode.isHidden=c)&&!d&&t.mode&1)for(Be=t,d=t.child;d!==null;){for(f=Be=d;Be!==null;){switch(h=Be,p=h.child,h.tag){case 0:case 11:case 14:case 15:Zo(4,h,h.return);break;case 1:js(h,h.return);var g=h.stateNode;if(typeof g.componentWillUnmount=="function"){i=h,n=h.return;try{e=i,g.props=e.memoizedProps,g.state=e.memoizedState,g.componentWillUnmount()}catch(_){Bt(i,n,_)}}break;case 5:js(h,h.return);break;case 22:if(h.memoizedState!==null){Fp(f);continue}}p!==null?(p.return=h,Be=p):Fp(f)}d=d.sibling}e:for(d=null,f=t;;){if(f.tag===5){if(d===null){d=f;try{r=f.stateNode,c?(s=r.style,typeof s.setProperty=="function"?s.setProperty("display","none","important"):s.display="none"):(a=f.stateNode,l=f.memoizedProps.style,o=l!=null&&l.hasOwnProperty("display")?l.display:null,a.style.display=a0("display",o))}catch(_){Bt(t,t.return,_)}}}else if(f.tag===6){if(d===null)try{f.stateNode.nodeValue=c?"":f.memoizedProps}catch(_){Bt(t,t.return,_)}}else if((f.tag!==22&&f.tag!==23||f.memoizedState===null||f===t)&&f.child!==null){f.child.return=f,f=f.child;continue}if(f===t)break e;for(;f.sibling===null;){if(f.return===null||f.return===t)break e;d===f&&(d=null),f=f.return}d===f&&(d=null),f.sibling.return=f.return,f=f.sibling}}break;case 19:ai(e,t),Ei(t),i&4&&Up(t);break;case 21:break;default:ai(e,t),Ei(t)}}function Ei(t){var e=t.flags;if(e&2){try{e:{for(var n=t.return;n!==null;){if(Dx(n)){var i=n;break e}n=n.return}throw Error(_e(160))}switch(i.tag){case 5:var r=i.stateNode;i.flags&32&&(sa(r,""),i.flags&=-33);var s=Ip(t);nf(t,s,r);break;case 3:case 4:var o=i.stateNode.containerInfo,a=Ip(t);tf(t,a,o);break;default:throw Error(_e(161))}}catch(l){Bt(t,t.return,l)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function dS(t,e,n){Be=t,Ox(t)}function Ox(t,e,n){for(var i=(t.mode&1)!==0;Be!==null;){var r=Be,s=r.child;if(r.tag===22&&i){var o=r.memoizedState!==null||Ya;if(!o){var a=r.alternate,l=a!==null&&a.memoizedState!==null||_n;a=Ya;var c=_n;if(Ya=o,(_n=l)&&!c)for(Be=r;Be!==null;)o=Be,l=o.child,o.tag===22&&o.memoizedState!==null?kp(r):l!==null?(l.return=o,Be=l):kp(r);for(;s!==null;)Be=s,Ox(s),s=s.sibling;Be=r,Ya=a,_n=c}Op(t)}else r.subtreeFlags&8772&&s!==null?(s.return=r,Be=s):Op(t)}}function Op(t){for(;Be!==null;){var e=Be;if(e.flags&8772){var n=e.alternate;try{if(e.flags&8772)switch(e.tag){case 0:case 11:case 15:_n||zc(5,e);break;case 1:var i=e.stateNode;if(e.flags&4&&!_n)if(n===null)i.componentDidMount();else{var r=e.elementType===e.type?n.memoizedProps:di(e.type,n.memoizedProps);i.componentDidUpdate(r,n.memoizedState,i.__reactInternalSnapshotBeforeUpdate)}var s=e.updateQueue;s!==null&&yp(e,s,i);break;case 3:var o=e.updateQueue;if(o!==null){if(n=null,e.child!==null)switch(e.child.tag){case 5:n=e.child.stateNode;break;case 1:n=e.child.stateNode}yp(e,o,n)}break;case 5:var a=e.stateNode;if(n===null&&e.flags&4){n=a;var l=e.memoizedProps;switch(e.type){case"button":case"input":case"select":case"textarea":l.autoFocus&&n.focus();break;case"img":l.src&&(n.src=l.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(e.memoizedState===null){var c=e.alternate;if(c!==null){var d=c.memoizedState;if(d!==null){var f=d.dehydrated;f!==null&&ca(f)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(_e(163))}_n||e.flags&512&&ef(e)}catch(h){Bt(e,e.return,h)}}if(e===t){Be=null;break}if(n=e.sibling,n!==null){n.return=e.return,Be=n;break}Be=e.return}}function Fp(t){for(;Be!==null;){var e=Be;if(e===t){Be=null;break}var n=e.sibling;if(n!==null){n.return=e.return,Be=n;break}Be=e.return}}function kp(t){for(;Be!==null;){var e=Be;try{switch(e.tag){case 0:case 11:case 15:var n=e.return;try{zc(4,e)}catch(l){Bt(e,n,l)}break;case 1:var i=e.stateNode;if(typeof i.componentDidMount=="function"){var r=e.return;try{i.componentDidMount()}catch(l){Bt(e,r,l)}}var s=e.return;try{ef(e)}catch(l){Bt(e,s,l)}break;case 5:var o=e.return;try{ef(e)}catch(l){Bt(e,o,l)}}}catch(l){Bt(e,e.return,l)}if(e===t){Be=null;break}var a=e.sibling;if(a!==null){a.return=e.return,Be=a;break}Be=e.return}}var fS=Math.ceil,fc=Zi.ReactCurrentDispatcher,lh=Zi.ReactCurrentOwner,ri=Zi.ReactCurrentBatchConfig,mt=0,on=null,Xt=null,fn=0,Gn=0,Xs=Lr(0),qt=0,ya=null,ts=0,Bc=0,ch=0,Ko=null,Pn=null,uh=0,fo=1/0,Oi=null,hc=!1,rf=null,_r=null,qa=!1,dr=null,pc=0,Jo=0,sf=null,Gl=-1,Vl=0;function Tn(){return mt&6?Vt():Gl!==-1?Gl:Gl=Vt()}function yr(t){return t.mode&1?mt&2&&fn!==0?fn&-fn:qy.transition!==null?(Vl===0&&(Vl=y0()),Vl):(t=yt,t!==0||(t=window.event,t=t===void 0?16:A0(t.type)),t):1}function xi(t,e,n,i){if(50<Jo)throw Jo=0,sf=null,Error(_e(185));Ca(t,n,i),(!(mt&2)||t!==on)&&(t===on&&(!(mt&2)&&(Bc|=n),qt===4&&cr(t,fn)),Un(t,i),n===1&&mt===0&&!(e.mode&1)&&(fo=Vt()+500,Oc&&Pr()))}function Un(t,e){var n=t.callbackNode;q_(t,e);var i=Kl(t,t===on?fn:0);if(i===0)n!==null&&$h(n),t.callbackNode=null,t.callbackPriority=0;else if(e=i&-i,t.callbackPriority!==e){if(n!=null&&$h(n),e===1)t.tag===0?Yy(zp.bind(null,t)):X0(zp.bind(null,t)),Wy(function(){!(mt&6)&&Pr()}),n=null;else{switch(S0(i)){case 1:n=Of;break;case 4:n=v0;break;case 16:n=Zl;break;case 536870912:n=_0;break;default:n=Zl}n=Wx(n,Fx.bind(null,t))}t.callbackPriority=e,t.callbackNode=n}}function Fx(t,e){if(Gl=-1,Vl=0,mt&6)throw Error(_e(327));var n=t.callbackNode;if(to()&&t.callbackNode!==n)return null;var i=Kl(t,t===on?fn:0);if(i===0)return null;if(i&30||i&t.expiredLanes||e)e=mc(t,i);else{e=i;var r=mt;mt|=2;var s=zx();(on!==t||fn!==e)&&(Oi=null,fo=Vt()+500,$r(t,e));do try{mS();break}catch(a){kx(t,a)}while(!0);qf(),fc.current=s,mt=r,Xt!==null?e=0:(on=null,fn=0,e=qt)}if(e!==0){if(e===2&&(r=Pd(t),r!==0&&(i=r,e=of(t,r))),e===1)throw n=ya,$r(t,0),cr(t,i),Un(t,Vt()),n;if(e===6)cr(t,i);else{if(r=t.current.alternate,!(i&30)&&!hS(r)&&(e=mc(t,i),e===2&&(s=Pd(t),s!==0&&(i=s,e=of(t,s))),e===1))throw n=ya,$r(t,0),cr(t,i),Un(t,Vt()),n;switch(t.finishedWork=r,t.finishedLanes=i,e){case 0:case 1:throw Error(_e(345));case 2:zr(t,Pn,Oi);break;case 3:if(cr(t,i),(i&130023424)===i&&(e=uh+500-Vt(),10<e)){if(Kl(t,0)!==0)break;if(r=t.suspendedLanes,(r&i)!==i){Tn(),t.pingedLanes|=t.suspendedLanes&r;break}t.timeoutHandle=zd(zr.bind(null,t,Pn,Oi),e);break}zr(t,Pn,Oi);break;case 4:if(cr(t,i),(i&4194240)===i)break;for(e=t.eventTimes,r=-1;0<i;){var o=31-gi(i);s=1<<o,o=e[o],o>r&&(r=o),i&=~s}if(i=r,i=Vt()-i,i=(120>i?120:480>i?480:1080>i?1080:1920>i?1920:3e3>i?3e3:4320>i?4320:1960*fS(i/1960))-i,10<i){t.timeoutHandle=zd(zr.bind(null,t,Pn,Oi),i);break}zr(t,Pn,Oi);break;case 5:zr(t,Pn,Oi);break;default:throw Error(_e(329))}}}return Un(t,Vt()),t.callbackNode===n?Fx.bind(null,t):null}function of(t,e){var n=Ko;return t.current.memoizedState.isDehydrated&&($r(t,e).flags|=256),t=mc(t,e),t!==2&&(e=Pn,Pn=n,e!==null&&af(e)),t}function af(t){Pn===null?Pn=t:Pn.push.apply(Pn,t)}function hS(t){for(var e=t;;){if(e.flags&16384){var n=e.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var i=0;i<n.length;i++){var r=n[i],s=r.getSnapshot;r=r.value;try{if(!_i(s(),r))return!1}catch{return!1}}}if(n=e.child,e.subtreeFlags&16384&&n!==null)n.return=e,e=n;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function cr(t,e){for(e&=~ch,e&=~Bc,t.suspendedLanes|=e,t.pingedLanes&=~e,t=t.expirationTimes;0<e;){var n=31-gi(e),i=1<<n;t[n]=-1,e&=~i}}function zp(t){if(mt&6)throw Error(_e(327));to();var e=Kl(t,0);if(!(e&1))return Un(t,Vt()),null;var n=mc(t,e);if(t.tag!==0&&n===2){var i=Pd(t);i!==0&&(e=i,n=of(t,i))}if(n===1)throw n=ya,$r(t,0),cr(t,e),Un(t,Vt()),n;if(n===6)throw Error(_e(345));return t.finishedWork=t.current.alternate,t.finishedLanes=e,zr(t,Pn,Oi),Un(t,Vt()),null}function dh(t,e){var n=mt;mt|=1;try{return t(e)}finally{mt=n,mt===0&&(fo=Vt()+500,Oc&&Pr())}}function ns(t){dr!==null&&dr.tag===0&&!(mt&6)&&to();var e=mt;mt|=1;var n=ri.transition,i=yt;try{if(ri.transition=null,yt=1,t)return t()}finally{yt=i,ri.transition=n,mt=e,!(mt&6)&&Pr()}}function fh(){Gn=Xs.current,Rt(Xs)}function $r(t,e){t.finishedWork=null,t.finishedLanes=0;var n=t.timeoutHandle;if(n!==-1&&(t.timeoutHandle=-1,Vy(n)),Xt!==null)for(n=Xt.return;n!==null;){var i=n;switch(Xf(i),i.tag){case 1:i=i.type.childContextTypes,i!=null&&nc();break;case 3:co(),Rt(Dn),Rt(yn),th();break;case 5:eh(i);break;case 4:co();break;case 13:Rt(Dt);break;case 19:Rt(Dt);break;case 10:Zf(i.type._context);break;case 22:case 23:fh()}n=n.return}if(on=t,Xt=t=Sr(t.current,null),fn=Gn=e,qt=0,ya=null,ch=Bc=ts=0,Pn=Ko=null,jr!==null){for(e=0;e<jr.length;e++)if(n=jr[e],i=n.interleaved,i!==null){n.interleaved=null;var r=i.next,s=n.pending;if(s!==null){var o=s.next;s.next=r,i.next=o}n.pending=i}jr=null}return t}function kx(t,e){do{var n=Xt;try{if(qf(),zl.current=dc,uc){for(var i=Ot.memoizedState;i!==null;){var r=i.queue;r!==null&&(r.pending=null),i=i.next}uc=!1}if(es=0,rn=Yt=Ot=null,qo=!1,xa=0,lh.current=null,n===null||n.return===null){qt=1,ya=e,Xt=null;break}e:{var s=t,o=n.return,a=n,l=e;if(e=fn,a.flags|=32768,l!==null&&typeof l=="object"&&typeof l.then=="function"){var c=l,d=a,f=d.tag;if(!(d.mode&1)&&(f===0||f===11||f===15)){var h=d.alternate;h?(d.updateQueue=h.updateQueue,d.memoizedState=h.memoizedState,d.lanes=h.lanes):(d.updateQueue=null,d.memoizedState=null)}var p=bp(o);if(p!==null){p.flags&=-257,Ap(p,o,a,s,e),p.mode&1&&Tp(s,c,e),e=p,l=c;var g=e.updateQueue;if(g===null){var _=new Set;_.add(l),e.updateQueue=_}else g.add(l);break e}else{if(!(e&1)){Tp(s,c,e),hh();break e}l=Error(_e(426))}}else if(Pt&&a.mode&1){var m=bp(o);if(m!==null){!(m.flags&65536)&&(m.flags|=256),Ap(m,o,a,s,e),$f(uo(l,a));break e}}s=l=uo(l,a),qt!==4&&(qt=2),Ko===null?Ko=[s]:Ko.push(s),s=o;do{switch(s.tag){case 3:s.flags|=65536,e&=-e,s.lanes|=e;var u=Sx(s,l,e);_p(s,u);break e;case 1:a=l;var v=s.type,x=s.stateNode;if(!(s.flags&128)&&(typeof v.getDerivedStateFromError=="function"||x!==null&&typeof x.componentDidCatch=="function"&&(_r===null||!_r.has(x)))){s.flags|=65536,e&=-e,s.lanes|=e;var y=Ex(s,a,e);_p(s,y);break e}}s=s.return}while(s!==null)}Hx(n)}catch(A){e=A,Xt===n&&n!==null&&(Xt=n=n.return);continue}break}while(!0)}function zx(){var t=fc.current;return fc.current=dc,t===null?dc:t}function hh(){(qt===0||qt===3||qt===2)&&(qt=4),on===null||!(ts&268435455)&&!(Bc&268435455)||cr(on,fn)}function mc(t,e){var n=mt;mt|=2;var i=zx();(on!==t||fn!==e)&&(Oi=null,$r(t,e));do try{pS();break}catch(r){kx(t,r)}while(!0);if(qf(),mt=n,fc.current=i,Xt!==null)throw Error(_e(261));return on=null,fn=0,qt}function pS(){for(;Xt!==null;)Bx(Xt)}function mS(){for(;Xt!==null&&!B_();)Bx(Xt)}function Bx(t){var e=Vx(t.alternate,t,Gn);t.memoizedProps=t.pendingProps,e===null?Hx(t):Xt=e,lh.current=null}function Hx(t){var e=t;do{var n=e.alternate;if(t=e.return,e.flags&32768){if(n=lS(n,e),n!==null){n.flags&=32767,Xt=n;return}if(t!==null)t.flags|=32768,t.subtreeFlags=0,t.deletions=null;else{qt=6,Xt=null;return}}else if(n=aS(n,e,Gn),n!==null){Xt=n;return}if(e=e.sibling,e!==null){Xt=e;return}Xt=e=t}while(e!==null);qt===0&&(qt=5)}function zr(t,e,n){var i=yt,r=ri.transition;try{ri.transition=null,yt=1,gS(t,e,n,i)}finally{ri.transition=r,yt=i}return null}function gS(t,e,n,i){do to();while(dr!==null);if(mt&6)throw Error(_e(327));n=t.finishedWork;var r=t.finishedLanes;if(n===null)return null;if(t.finishedWork=null,t.finishedLanes=0,n===t.current)throw Error(_e(177));t.callbackNode=null,t.callbackPriority=0;var s=n.lanes|n.childLanes;if(Z_(t,s),t===on&&(Xt=on=null,fn=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||qa||(qa=!0,Wx(Zl,function(){return to(),null})),s=(n.flags&15990)!==0,n.subtreeFlags&15990||s){s=ri.transition,ri.transition=null;var o=yt;yt=1;var a=mt;mt|=4,lh.current=null,uS(t,n),Ux(n,t),Oy(Fd),Jl=!!Od,Fd=Od=null,t.current=n,dS(n),H_(),mt=a,yt=o,ri.transition=s}else t.current=n;if(qa&&(qa=!1,dr=t,pc=r),s=t.pendingLanes,s===0&&(_r=null),W_(n.stateNode),Un(t,Vt()),e!==null)for(i=t.onRecoverableError,n=0;n<e.length;n++)r=e[n],i(r.value,{componentStack:r.stack,digest:r.digest});if(hc)throw hc=!1,t=rf,rf=null,t;return pc&1&&t.tag!==0&&to(),s=t.pendingLanes,s&1?t===sf?Jo++:(Jo=0,sf=t):Jo=0,Pr(),null}function to(){if(dr!==null){var t=S0(pc),e=ri.transition,n=yt;try{if(ri.transition=null,yt=16>t?16:t,dr===null)var i=!1;else{if(t=dr,dr=null,pc=0,mt&6)throw Error(_e(331));var r=mt;for(mt|=4,Be=t.current;Be!==null;){var s=Be,o=s.child;if(Be.flags&16){var a=s.deletions;if(a!==null){for(var l=0;l<a.length;l++){var c=a[l];for(Be=c;Be!==null;){var d=Be;switch(d.tag){case 0:case 11:case 15:Zo(8,d,s)}var f=d.child;if(f!==null)f.return=d,Be=f;else for(;Be!==null;){d=Be;var h=d.sibling,p=d.return;if(Nx(d),d===c){Be=null;break}if(h!==null){h.return=p,Be=h;break}Be=p}}}var g=s.alternate;if(g!==null){var _=g.child;if(_!==null){g.child=null;do{var m=_.sibling;_.sibling=null,_=m}while(_!==null)}}Be=s}}if(s.subtreeFlags&2064&&o!==null)o.return=s,Be=o;else e:for(;Be!==null;){if(s=Be,s.flags&2048)switch(s.tag){case 0:case 11:case 15:Zo(9,s,s.return)}var u=s.sibling;if(u!==null){u.return=s.return,Be=u;break e}Be=s.return}}var v=t.current;for(Be=v;Be!==null;){o=Be;var x=o.child;if(o.subtreeFlags&2064&&x!==null)x.return=o,Be=x;else e:for(o=v;Be!==null;){if(a=Be,a.flags&2048)try{switch(a.tag){case 0:case 11:case 15:zc(9,a)}}catch(A){Bt(a,a.return,A)}if(a===o){Be=null;break e}var y=a.sibling;if(y!==null){y.return=a.return,Be=y;break e}Be=a.return}}if(mt=r,Pr(),bi&&typeof bi.onPostCommitFiberRoot=="function")try{bi.onPostCommitFiberRoot(Pc,t)}catch{}i=!0}return i}finally{yt=n,ri.transition=e}}return!1}function Bp(t,e,n){e=uo(n,e),e=Sx(t,e,1),t=vr(t,e,1),e=Tn(),t!==null&&(Ca(t,1,e),Un(t,e))}function Bt(t,e,n){if(t.tag===3)Bp(t,t,n);else for(;e!==null;){if(e.tag===3){Bp(e,t,n);break}else if(e.tag===1){var i=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof i.componentDidCatch=="function"&&(_r===null||!_r.has(i))){t=uo(n,t),t=Ex(e,t,1),e=vr(e,t,1),t=Tn(),e!==null&&(Ca(e,1,t),Un(e,t));break}}e=e.return}}function xS(t,e,n){var i=t.pingCache;i!==null&&i.delete(e),e=Tn(),t.pingedLanes|=t.suspendedLanes&n,on===t&&(fn&n)===n&&(qt===4||qt===3&&(fn&130023424)===fn&&500>Vt()-uh?$r(t,0):ch|=n),Un(t,e)}function Gx(t,e){e===0&&(t.mode&1?(e=za,za<<=1,!(za&130023424)&&(za=4194304)):e=1);var n=Tn();t=$i(t,e),t!==null&&(Ca(t,e,n),Un(t,n))}function vS(t){var e=t.memoizedState,n=0;e!==null&&(n=e.retryLane),Gx(t,n)}function _S(t,e){var n=0;switch(t.tag){case 13:var i=t.stateNode,r=t.memoizedState;r!==null&&(n=r.retryLane);break;case 19:i=t.stateNode;break;default:throw Error(_e(314))}i!==null&&i.delete(e),Gx(t,n)}var Vx;Vx=function(t,e,n){if(t!==null)if(t.memoizedProps!==e.pendingProps||Dn.current)Nn=!0;else{if(!(t.lanes&n)&&!(e.flags&128))return Nn=!1,oS(t,e,n);Nn=!!(t.flags&131072)}else Nn=!1,Pt&&e.flags&1048576&&$0(e,sc,e.index);switch(e.lanes=0,e.tag){case 2:var i=e.type;Hl(t,e),t=e.pendingProps;var r=oo(e,yn.current);eo(e,n),r=ih(null,e,i,t,r,n);var s=rh();return e.flags|=1,typeof r=="object"&&r!==null&&typeof r.render=="function"&&r.$$typeof===void 0?(e.tag=1,e.memoizedState=null,e.updateQueue=null,In(i)?(s=!0,ic(e)):s=!1,e.memoizedState=r.state!==null&&r.state!==void 0?r.state:null,Jf(e),r.updater=kc,e.stateNode=r,r._reactInternals=e,Xd(e,i,t,n),e=qd(null,e,i,!0,s,n)):(e.tag=0,Pt&&s&&jf(e),Mn(null,e,r,n),e=e.child),e;case 16:i=e.elementType;e:{switch(Hl(t,e),t=e.pendingProps,r=i._init,i=r(i._payload),e.type=i,r=e.tag=SS(i),t=di(i,t),r){case 0:e=Yd(null,e,i,t,n);break e;case 1:e=Lp(null,e,i,t,n);break e;case 11:e=Cp(null,e,i,t,n);break e;case 14:e=Rp(null,e,i,di(i.type,t),n);break e}throw Error(_e(306,i,""))}return e;case 0:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:di(i,r),Yd(t,e,i,r,n);case 1:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:di(i,r),Lp(t,e,i,r,n);case 3:e:{if(bx(e),t===null)throw Error(_e(387));i=e.pendingProps,s=e.memoizedState,r=s.element,Q0(t,e),lc(e,i,null,n);var o=e.memoizedState;if(i=o.element,s.isDehydrated)if(s={element:i,isDehydrated:!1,cache:o.cache,pendingSuspenseBoundaries:o.pendingSuspenseBoundaries,transitions:o.transitions},e.updateQueue.baseState=s,e.memoizedState=s,e.flags&256){r=uo(Error(_e(423)),e),e=Pp(t,e,i,n,r);break e}else if(i!==r){r=uo(Error(_e(424)),e),e=Pp(t,e,i,n,r);break e}else for(jn=xr(e.stateNode.containerInfo.firstChild),Xn=e,Pt=!0,hi=null,n=K0(e,null,i,n),e.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(ao(),i===r){e=Yi(t,e,n);break e}Mn(t,e,i,n)}e=e.child}return e;case 5:return ex(e),t===null&&Vd(e),i=e.type,r=e.pendingProps,s=t!==null?t.memoizedProps:null,o=r.children,kd(i,r)?o=null:s!==null&&kd(i,s)&&(e.flags|=32),Tx(t,e),Mn(t,e,o,n),e.child;case 6:return t===null&&Vd(e),null;case 13:return Ax(t,e,n);case 4:return Qf(e,e.stateNode.containerInfo),i=e.pendingProps,t===null?e.child=lo(e,null,i,n):Mn(t,e,i,n),e.child;case 11:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:di(i,r),Cp(t,e,i,r,n);case 7:return Mn(t,e,e.pendingProps,n),e.child;case 8:return Mn(t,e,e.pendingProps.children,n),e.child;case 12:return Mn(t,e,e.pendingProps.children,n),e.child;case 10:e:{if(i=e.type._context,r=e.pendingProps,s=e.memoizedProps,o=r.value,bt(oc,i._currentValue),i._currentValue=o,s!==null)if(_i(s.value,o)){if(s.children===r.children&&!Dn.current){e=Yi(t,e,n);break e}}else for(s=e.child,s!==null&&(s.return=e);s!==null;){var a=s.dependencies;if(a!==null){o=s.child;for(var l=a.firstContext;l!==null;){if(l.context===i){if(s.tag===1){l=Vi(-1,n&-n),l.tag=2;var c=s.updateQueue;if(c!==null){c=c.shared;var d=c.pending;d===null?l.next=l:(l.next=d.next,d.next=l),c.pending=l}}s.lanes|=n,l=s.alternate,l!==null&&(l.lanes|=n),Wd(s.return,n,e),a.lanes|=n;break}l=l.next}}else if(s.tag===10)o=s.type===e.type?null:s.child;else if(s.tag===18){if(o=s.return,o===null)throw Error(_e(341));o.lanes|=n,a=o.alternate,a!==null&&(a.lanes|=n),Wd(o,n,e),o=s.sibling}else o=s.child;if(o!==null)o.return=s;else for(o=s;o!==null;){if(o===e){o=null;break}if(s=o.sibling,s!==null){s.return=o.return,o=s;break}o=o.return}s=o}Mn(t,e,r.children,n),e=e.child}return e;case 9:return r=e.type,i=e.pendingProps.children,eo(e,n),r=si(r),i=i(r),e.flags|=1,Mn(t,e,i,n),e.child;case 14:return i=e.type,r=di(i,e.pendingProps),r=di(i.type,r),Rp(t,e,i,r,n);case 15:return Mx(t,e,e.type,e.pendingProps,n);case 17:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:di(i,r),Hl(t,e),e.tag=1,In(i)?(t=!0,ic(e)):t=!1,eo(e,n),yx(e,i,r),Xd(e,i,r,n),qd(null,e,i,!0,t,n);case 19:return Cx(t,e,n);case 22:return wx(t,e,n)}throw Error(_e(156,e.tag))};function Wx(t,e){return x0(t,e)}function yS(t,e,n,i){this.tag=t,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=i,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function ii(t,e,n,i){return new yS(t,e,n,i)}function ph(t){return t=t.prototype,!(!t||!t.isReactComponent)}function SS(t){if(typeof t=="function")return ph(t)?1:0;if(t!=null){if(t=t.$$typeof,t===Df)return 11;if(t===If)return 14}return 2}function Sr(t,e){var n=t.alternate;return n===null?(n=ii(t.tag,e,t.key,t.mode),n.elementType=t.elementType,n.type=t.type,n.stateNode=t.stateNode,n.alternate=t,t.alternate=n):(n.pendingProps=e,n.type=t.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=t.flags&14680064,n.childLanes=t.childLanes,n.lanes=t.lanes,n.child=t.child,n.memoizedProps=t.memoizedProps,n.memoizedState=t.memoizedState,n.updateQueue=t.updateQueue,e=t.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},n.sibling=t.sibling,n.index=t.index,n.ref=t.ref,n}function Wl(t,e,n,i,r,s){var o=2;if(i=t,typeof t=="function")ph(t)&&(o=1);else if(typeof t=="string")o=5;else e:switch(t){case Os:return Yr(n.children,r,s,e);case Nf:o=8,r|=8;break;case gd:return t=ii(12,n,e,r|2),t.elementType=gd,t.lanes=s,t;case xd:return t=ii(13,n,e,r),t.elementType=xd,t.lanes=s,t;case vd:return t=ii(19,n,e,r),t.elementType=vd,t.lanes=s,t;case e0:return Hc(n,r,s,e);default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case Jg:o=10;break e;case Qg:o=9;break e;case Df:o=11;break e;case If:o=14;break e;case rr:o=16,i=null;break e}throw Error(_e(130,t==null?t:typeof t,""))}return e=ii(o,n,e,r),e.elementType=t,e.type=i,e.lanes=s,e}function Yr(t,e,n,i){return t=ii(7,t,i,e),t.lanes=n,t}function Hc(t,e,n,i){return t=ii(22,t,i,e),t.elementType=e0,t.lanes=n,t.stateNode={isHidden:!1},t}function Tu(t,e,n){return t=ii(6,t,null,e),t.lanes=n,t}function bu(t,e,n){return e=ii(4,t.children!==null?t.children:[],t.key,e),e.lanes=n,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}function ES(t,e,n,i,r){this.tag=e,this.containerInfo=t,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=ou(0),this.expirationTimes=ou(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=ou(0),this.identifierPrefix=i,this.onRecoverableError=r,this.mutableSourceEagerHydrationData=null}function mh(t,e,n,i,r,s,o,a,l){return t=new ES(t,e,n,a,l),e===1?(e=1,s===!0&&(e|=8)):e=0,s=ii(3,null,null,e),t.current=s,s.stateNode=t,s.memoizedState={element:i,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},Jf(s),t}function MS(t,e,n){var i=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Us,key:i==null?null:""+i,children:t,containerInfo:e,implementation:n}}function jx(t){if(!t)return Ar;t=t._reactInternals;e:{if(ls(t)!==t||t.tag!==1)throw Error(_e(170));var e=t;do{switch(e.tag){case 3:e=e.stateNode.context;break e;case 1:if(In(e.type)){e=e.stateNode.__reactInternalMemoizedMergedChildContext;break e}}e=e.return}while(e!==null);throw Error(_e(171))}if(t.tag===1){var n=t.type;if(In(n))return j0(t,n,e)}return e}function Xx(t,e,n,i,r,s,o,a,l){return t=mh(n,i,!0,t,r,s,o,a,l),t.context=jx(null),n=t.current,i=Tn(),r=yr(n),s=Vi(i,r),s.callback=e??null,vr(n,s,r),t.current.lanes=r,Ca(t,r,i),Un(t,i),t}function Gc(t,e,n,i){var r=e.current,s=Tn(),o=yr(r);return n=jx(n),e.context===null?e.context=n:e.pendingContext=n,e=Vi(s,o),e.payload={element:t},i=i===void 0?null:i,i!==null&&(e.callback=i),t=vr(r,e,o),t!==null&&(xi(t,r,o,s),kl(t,r,o)),o}function gc(t){if(t=t.current,!t.child)return null;switch(t.child.tag){case 5:return t.child.stateNode;default:return t.child.stateNode}}function Hp(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var n=t.retryLane;t.retryLane=n!==0&&n<e?n:e}}function gh(t,e){Hp(t,e),(t=t.alternate)&&Hp(t,e)}function wS(){return null}var $x=typeof reportError=="function"?reportError:function(t){console.error(t)};function xh(t){this._internalRoot=t}Vc.prototype.render=xh.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(_e(409));Gc(t,e,null,null)};Vc.prototype.unmount=xh.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;ns(function(){Gc(null,t,null,null)}),e[Xi]=null}};function Vc(t){this._internalRoot=t}Vc.prototype.unstable_scheduleHydration=function(t){if(t){var e=w0();t={blockedOn:null,target:t,priority:e};for(var n=0;n<lr.length&&e!==0&&e<lr[n].priority;n++);lr.splice(n,0,t),n===0&&b0(t)}};function vh(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function Wc(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11&&(t.nodeType!==8||t.nodeValue!==" react-mount-point-unstable "))}function Gp(){}function TS(t,e,n,i,r){if(r){if(typeof i=="function"){var s=i;i=function(){var c=gc(o);s.call(c)}}var o=Xx(e,i,t,0,null,!1,!1,"",Gp);return t._reactRootContainer=o,t[Xi]=o.current,fa(t.nodeType===8?t.parentNode:t),ns(),o}for(;r=t.lastChild;)t.removeChild(r);if(typeof i=="function"){var a=i;i=function(){var c=gc(l);a.call(c)}}var l=mh(t,0,!1,null,null,!1,!1,"",Gp);return t._reactRootContainer=l,t[Xi]=l.current,fa(t.nodeType===8?t.parentNode:t),ns(function(){Gc(e,l,n,i)}),l}function jc(t,e,n,i,r){var s=n._reactRootContainer;if(s){var o=s;if(typeof r=="function"){var a=r;r=function(){var l=gc(o);a.call(l)}}Gc(e,o,t,r)}else o=TS(n,e,t,r,i);return gc(o)}E0=function(t){switch(t.tag){case 3:var e=t.stateNode;if(e.current.memoizedState.isDehydrated){var n=Go(e.pendingLanes);n!==0&&(Ff(e,n|1),Un(e,Vt()),!(mt&6)&&(fo=Vt()+500,Pr()))}break;case 13:ns(function(){var i=$i(t,1);if(i!==null){var r=Tn();xi(i,t,1,r)}}),gh(t,1)}};kf=function(t){if(t.tag===13){var e=$i(t,134217728);if(e!==null){var n=Tn();xi(e,t,134217728,n)}gh(t,134217728)}};M0=function(t){if(t.tag===13){var e=yr(t),n=$i(t,e);if(n!==null){var i=Tn();xi(n,t,e,i)}gh(t,e)}};w0=function(){return yt};T0=function(t,e){var n=yt;try{return yt=t,e()}finally{yt=n}};Cd=function(t,e,n){switch(e){case"input":if(Sd(t,n),e=n.name,n.type==="radio"&&e!=null){for(n=t;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+e)+'][type="radio"]'),e=0;e<n.length;e++){var i=n[e];if(i!==t&&i.form===t.form){var r=Uc(i);if(!r)throw Error(_e(90));n0(i),Sd(i,r)}}}break;case"textarea":r0(t,n);break;case"select":e=n.value,e!=null&&Zs(t,!!n.multiple,e,!1)}};d0=dh;f0=ns;var bS={usingClientEntryPoint:!1,Events:[La,Bs,Uc,c0,u0,dh]},Co={findFiberByHostInstance:Wr,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},AS={bundleType:Co.bundleType,version:Co.version,rendererPackageName:Co.rendererPackageName,rendererConfig:Co.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Zi.ReactCurrentDispatcher,findHostInstanceByFiber:function(t){return t=m0(t),t===null?null:t.stateNode},findFiberByHostInstance:Co.findFiberByHostInstance||wS,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Za=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Za.isDisabled&&Za.supportsFiber)try{Pc=Za.inject(AS),bi=Za}catch{}}Yn.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=bS;Yn.createPortal=function(t,e){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!vh(e))throw Error(_e(200));return MS(t,e,null,n)};Yn.createRoot=function(t,e){if(!vh(t))throw Error(_e(299));var n=!1,i="",r=$x;return e!=null&&(e.unstable_strictMode===!0&&(n=!0),e.identifierPrefix!==void 0&&(i=e.identifierPrefix),e.onRecoverableError!==void 0&&(r=e.onRecoverableError)),e=mh(t,1,!1,null,null,n,!1,i,r),t[Xi]=e.current,fa(t.nodeType===8?t.parentNode:t),new xh(e)};Yn.findDOMNode=function(t){if(t==null)return null;if(t.nodeType===1)return t;var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(_e(188)):(t=Object.keys(t).join(","),Error(_e(268,t)));return t=m0(e),t=t===null?null:t.stateNode,t};Yn.flushSync=function(t){return ns(t)};Yn.hydrate=function(t,e,n){if(!Wc(e))throw Error(_e(200));return jc(null,t,e,!0,n)};Yn.hydrateRoot=function(t,e,n){if(!vh(t))throw Error(_e(405));var i=n!=null&&n.hydratedSources||null,r=!1,s="",o=$x;if(n!=null&&(n.unstable_strictMode===!0&&(r=!0),n.identifierPrefix!==void 0&&(s=n.identifierPrefix),n.onRecoverableError!==void 0&&(o=n.onRecoverableError)),e=Xx(e,null,t,1,n??null,r,!1,s,o),t[Xi]=e.current,fa(t),i)for(t=0;t<i.length;t++)n=i[t],r=n._getVersion,r=r(n._source),e.mutableSourceEagerHydrationData==null?e.mutableSourceEagerHydrationData=[n,r]:e.mutableSourceEagerHydrationData.push(n,r);return new Vc(e)};Yn.render=function(t,e,n){if(!Wc(e))throw Error(_e(200));return jc(null,t,e,!1,n)};Yn.unmountComponentAtNode=function(t){if(!Wc(t))throw Error(_e(40));return t._reactRootContainer?(ns(function(){jc(null,null,t,!1,function(){t._reactRootContainer=null,t[Xi]=null})}),!0):!1};Yn.unstable_batchedUpdates=dh;Yn.unstable_renderSubtreeIntoContainer=function(t,e,n,i){if(!Wc(n))throw Error(_e(200));if(t==null||t._reactInternals===void 0)throw Error(_e(38));return jc(t,e,n,!1,i)};Yn.version="18.3.1-next-f1338f8080-20240426";function Yx(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Yx)}catch(t){console.error(t)}}Yx(),Yg.exports=Yn;var CS=Yg.exports,Vp=CS;pd.createRoot=Vp.createRoot,pd.hydrateRoot=Vp.hydrateRoot;var zt=(t=>(t.MODE_2D="2D",t.MODE_3D="3D",t))(zt||{}),tn=(t=>(t.FUNCTIONS="FUNCTIONS",t.CLASSES="CLASSES",t))(tn||{}),Et=(t=>(t.VIRTUAL_CODE="VIRTUAL_CODE",t.CODE_CITY="CODE_CITY",t.FORCE_GRAPH="FORCE_GRAPH",t))(Et||{}),Re=(t=>(t.CLASS="CLASS",t.FUNCTION="FUNCTION",t.CONDITION="CONDITION",t.LOOP="LOOP",t.STATEMENT="STATEMENT",t.RECURSION="RECURSION",t))(Re||{});const xc=["#E5A93C","#38BDF8","#F3C66F","#A855F7","#2DD4BF","#FB923C"],qx=[{name:"CrazyTaxiFrameworkMod.cpp",path:"Open Source CODE.7z/CrazyTaxiFrameworkMod.cpp",size:86420,date:"Open Source CODE.7z",content:`// Lyras Crazy Taxi FrameworkMOD - Core Hook & Physics Tick Engine
#include <windows.h>
#include <stdint.h>

class CrazyTaxiFrameworkMod {
public:
    void InitializeFrameworkMod(int versionFlags) {
        if (versionFlags > 0) {
            HookCrazyDriftPhysics(60.0f);
            MountCustomCityAssets("WestCoast_Mod.pak");
        } else {
            RestoreOriginalMemoryPages();
            StabilizeChassisSuspension();
        }
    }

    void HookCrazyDriftPhysics(float tickRate) {
        if (tickRate >= 60.0f) {
            ApplyCrazyDashImpulse(1.35f, tickRate);
            UpdateHudSpeedometer(tickRate);
        } else {
            HookCrazyDriftPhysics(60.0f);
            RestoreOriginalMemoryPages();
        }
    }
};`},{name:"VehiclePhysicsController.cs",path:"Open Source CODE.7z/VehiclePhysicsController.cs",size:64200,date:"Open Source CODE.7z",content:`using System;
using UnityEngine;

public class VehiclePhysicsController : MonoBehaviour {
    public void ApplyCrazyDashImpulse(float thrust, float deltaTick) {
        if (thrust > 1.0f) {
            CalculateWheelSlipVector(thrust);
            TriggerExhaustParticleBurst(3);
        } else {
            StabilizeChassisSuspension();
        }
    }

    public void StabilizeChassisSuspension() {
        UpdateCameraRig(1.0f, 0.5f);
    }
}`}];async function Ro(t,e=2,n=400){for(let i=0;i<=e;i++){try{const r=await fetch(t);if(r.ok||i===e)return r}catch(r){if(i===e)throw r}await new Promise(r=>setTimeout(r,n*Math.pow(2,i)))}throw new Error(`Failed to fetch ${t}`)}function Zx(t){const e=t.toLowerCase();return e.endsWith(".c")||e.endsWith(".h")?{lang:"C",kindLabel:"C"}:e.endsWith(".cpp")||e.endsWith(".hpp")||e.endsWith(".cc")||e.endsWith(".cxx")?{lang:"C++",kindLabel:"C++"}:e.endsWith(".java")?{lang:"Java",kindLabel:"Java"}:e.endsWith(".py")?{lang:"Python",kindLabel:"Python"}:e.endsWith(".rs")?{lang:"Rust",kindLabel:"Rust"}:e.endsWith(".cs")?{lang:"C#",kindLabel:"C#"}:e.endsWith(".js")||e.endsWith(".jsx")||e.endsWith(".ts")||e.endsWith(".tsx")||e.endsWith(".mjs")?{lang:"JavaScript",kindLabel:"JS"}:{lang:"C++",kindLabel:"Src"}}function Ka(t,e,n,i,r){return t===Re.CLASS?`File / Class Tree Root "${e}" in ${i}. Forms an independent 3D Tree whose primary limbs are its member functions.`:r?`Recursive function "${e}" in ${n} (${i}). Contains a self-looping call rendered with a blue rectangular LOOP wire.`:t===Re.FUNCTION?`Primary Function Branch "${e}" growing from ${i}. Splits into True (Green) and False (Red) conditional sub-branches, which in turn sprout sub-function call twigs.`:t===Re.LOOP?`Loop construct "${e}" in ${n}. Rendered with a self-connected blue LOOP wire and child sub-function branches.`:t===Re.CONDITION?e.toLowerCase().startsWith("else")?`FALSE (Red) conditional sub-branch "${e}" in ${n}. Sprouts sub-function call twigs when the preceding condition is false.`:`TRUE (Green) conditional sub-branch "${e}" in ${n}. Sprouts sub-function call twigs when the condition evaluates to true.`:`Sub-function call / execution twig "${e}" in ${i}. Invokes downstream routines or mutates state.`}function Wp(t,e,n){if(n==="Python"){const a=(t[e]||"").search(/\S|$/);let l=e+1;for(;l<t.length&&l<e+90;){const c=t[l];if(c.trim()!==""&&!c.trim().startsWith("#")&&c.search(/\S|$/)<=a)break;l++}return{snippet:t.slice(e,l).join(`
`),endLine:l}}let i=0,r=!1,s=e;for(let o=e;o<t.length&&o<e+120;o++){const a=t[o];for(let l=0;l<a.length;l++)a[l]==="{"?(i++,r=!0):a[l]==="}"&&i--;if(s=o+1,r&&i<=0)break}return{snippet:t.slice(e,Math.max(e+1,s)).join(`
`),endLine:s}}function jp(t,e,n,i,r){const s=t.split(/\r?\n/),o=n.replace(/[^a-zA-Z0-9_]/g,"");if(!o)return[];const a=new RegExp(`\\b${o}\\s*\\(`),l=[];let c=r.toLowerCase().startsWith("else")?"FALSE":"TRUE";for(let d=0;d<s.length;d++){if(d===0&&(i===Re.FUNCTION||i===Re.RECURSION))continue;const f=s[d].trim();/^(?:}\s*)?else\b/.test(f)?c="FALSE":/^if\s*[\s(]/.test(f)&&(c="TRUE"),a.test(f)&&!f.startsWith("void ")&&!f.startsWith("public ")&&!f.startsWith("private ")&&!f.startsWith("def ")&&!f.startsWith("fn ")&&!f.startsWith("function ")&&l.push({callLine:e+d,outcome:c})}return l}function RS(t,e,n,i){var x;const{lang:r}=Zx(e),s=xc[i%xc.length],o=n.split(/\r?\n/),a=[],l=e.replace(/\.[a-zA-Z0-9]+$/,""),c=`${t}_class_root`;let d=l,f=1;const h=/\b(?:class|struct|interface|impl|module)\s+([a-zA-Z_][a-zA-Z0-9_]*)/;for(let y=0;y<o.length;y++){const A=o[y].match(h);if(A&&A[1]){d=A[1],f=y+1;break}}const p={id:c,symbolName:d,label:e,kind:Re.CLASS,fileId:t,fileName:e,className:d,language:r,lineStart:f,lineEnd:o.length,codeSnippet:o.slice(0,Math.min(o.length,95)).join(`
`),explanation:Ka(Re.CLASS,d,d,e,!1),childrenIds:[],callsIds:[],calledByIds:[],complexity:1,memoryBytes:n.length,color:s};a.push(p);let g=null,_=null;const m=/(?:(?:public|private|protected|static|virtual|inline|async|unsafe|extern|pub|fn|def|function)\s+)+([a-zA-Z_][a-zA-Z0-9_<>:]*)\s*\(([^)]*)\)|^\s*(?:const|let|var)\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*=\s*(?:async\s*)?\([^)]*\)\s*=>|^\s*(?:void|int|float|double|bool|string|char|auto|Node|SimpleNode\s*\*|Transform|GameObject|size_t)\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*\(([^)]*)\)/,u=/^\s*(?:}\s*)?(if|else\s+if|else|for|while|switch|match)\b(.*)$/,v=/^\s*([a-zA-Z_][a-zA-Z0-9_.:]*\s*\([^;{}]*\))\s*;?\s*$/;for(let y=0;y<o.length;y++){const w=o[y].trim();if(!w||w.startsWith("//")||w.startsWith("#")||w.startsWith("/*")||w.startsWith("*"))continue;const T=w.match(m);if(T&&!w.startsWith("if")&&!w.startsWith("for")&&!w.startsWith("while")&&!w.startsWith("else")){const b=T[1]||T[3]||T[4]||`fn_${y+1}`,V=b.split("::").pop()||b,{snippet:X,endLine:pe}=Wp(o,y,r),F=X.split(`
`).slice(1).join(`
`),W=V.replace(/[^a-zA-Z0-9_]/g,""),te=W?new RegExp(`\\b${W}\\s*\\(`):null,K=te?te.test(F):!1,U={id:`${t}_fn_${y+1}`,symbolName:V,label:`${V}()`,kind:K?Re.RECURSION:Re.FUNCTION,fileId:t,fileName:e,className:d,language:r,lineStart:y+1,lineEnd:pe,codeSnippet:X,explanation:Ka(K?Re.RECURSION:Re.FUNCTION,`${V}()`,d,e,K),parentId:c,childrenIds:[],callsIds:[],calledByIds:[],isRecursive:K,complexity:K?8:3,memoryBytes:X.length*4,color:K?"#38BDF8":s};p.childrenIds.push(U.id),a.push(U),g=U,_=null;continue}const z=w.match(u);if(z&&g&&a.length<75){const b=z[1],V=w.replace(/^}\s*/,"").replace(/\{$/,"").trim().slice(0,46),X=b==="for"||b==="while",pe=b.startsWith("else"),F=_&&_.kind===Re.LOOP&&!X&&y+1<=_.lineEnd?_:g,{snippet:W,endLine:te}=Wp(o,y,r),K={id:`${t}_branch_${y+1}`,symbolName:b,label:V,kind:X?Re.LOOP:Re.CONDITION,fileId:t,fileName:e,className:d,language:r,lineStart:y+1,lineEnd:te,codeSnippet:W,explanation:Ka(X?Re.LOOP:Re.CONDITION,V,d,e,!1),parentId:F.id,childrenIds:[],callsIds:[],calledByIds:[],isRecursive:X,complexity:X?4:2,memoryBytes:128,color:X?"#38BDF8":pe?"#EF4444":"#22C55E"};F.childrenIds.push(K.id),g.complexity+=X?2:1,p.complexity+=X?2:1,a.push(K),_=K;continue}const E=w.match(v);if(E&&g&&a.length<85&&!w.startsWith("return")&&!w.startsWith("if")&&!w.startsWith("for")&&!w.startsWith("while")){const b=E[1].trim(),V=((x=b.split("(")[0].split(".").pop())==null?void 0:x.trim())||b,X=_&&y+1<=_.lineEnd?_:g,pe=X.label.toLowerCase().startsWith("else"),F={id:`${t}_stmt_${y+1}`,symbolName:V,label:b.slice(0,40),kind:Re.STATEMENT,fileId:t,fileName:e,className:d,language:r,lineStart:y+1,lineEnd:Math.min(o.length,y+3),codeSnippet:o.slice(Math.max(0,y-1),Math.min(o.length,y+4)).join(`
`),explanation:Ka(Re.STATEMENT,b,d,e,!1),parentId:X.id,childrenIds:[],callsIds:[],calledByIds:[],complexity:1,memoryBytes:64,color:pe?"#EF4444":"#22C55E"};X.childrenIds.push(F.id),a.push(F)}}return a}function vc(t,e){const n=[],i=[],r=[];let s=0;e.forEach((g,_)=>{const m=`file_${_}`,{lang:u,kindLabel:v}=Zx(g.name),x=RS(m,g.name,g.content,_);if(x.length===0)return;x.forEach(w=>{(w.isRecursive||w.kind===Re.LOOP)&&s++,i.push(w)});const y=g.path.split("/"),A=y.length>1?y[0]:"Scripts";n.push({id:m,name:g.name,path:g.path,folder:A,dateModified:g.date,sizeBytes:g.size,kindLabel:v,language:u,content:g.content,color:xc[_%xc.length],nodes:x})});const o=new Map,a=new Map,l=new Map;i.forEach(g=>{o.set(g.id,g),g.kind===Re.CLASS&&l.set(g.fileId,g),(g.kind===Re.CLASS||g.kind===Re.FUNCTION||g.kind===Re.RECURSION)&&g.symbolName.length>2&&a.set(g.symbolName,g)}),i.forEach(g=>{if(g.parentId&&o.has(g.parentId)){const _=o.get(g.parentId),m=g.label.toLowerCase().startsWith("else")||_.label.toLowerCase().startsWith("else"),u=g.label.toLowerCase().startsWith("if")||_.label.toLowerCase().startsWith("if");r.push({id:`ast_${_.id}_${g.id}`,sourceId:_.id,targetId:g.id,kind:"AST_CHILD",sourceFile:_.fileName,targetFile:g.fileName,callLine:g.lineStart,branchOutcome:m?"FALSE":u?"TRUE":void 0})}(g.isRecursive||g.kind===Re.LOOP)&&r.push({id:`loop_${g.id}`,sourceId:g.id,targetId:g.id,kind:"RECURSION",sourceFile:g.fileName,targetFile:g.fileName,callLine:g.lineStart,label:"LOOP",branchOutcome:"LOOP"})});let c=0;const d=new Set;i.filter(g=>g.kind===Re.FUNCTION||g.kind===Re.RECURSION).forEach(g=>{const _=i.filter(m=>m.parentId===g.id&&(m.kind===Re.CONDITION||m.kind===Re.LOOP));a.forEach((m,u)=>{if(g.id===m.id||m.kind===Re.CLASS)return;let v=!1;if(_.forEach(x=>{jp(x.codeSnippet,x.lineStart,u,x.kind,x.label).forEach((A,w)=>{v=!0,x.callsIds.includes(m.id)||x.callsIds.push(m.id),g.callsIds.includes(m.id)||g.callsIds.push(m.id),m.calledByIds.includes(x.id)||m.calledByIds.push(x.id);const T=g.fileId!==m.fileId;T&&c++,r.push({id:`call_${x.id}_${m.id}_L${A.callLine}_${w}`,sourceId:x.id,targetId:m.id,kind:T?"CROSS_FILE_CALL":"INTERNAL_CALL",sourceFile:x.fileName,targetFile:m.fileName,callLine:A.callLine,label:`${g.symbolName} [${A.outcome} L${A.callLine}] → ${m.symbolName}`,branchOutcome:A.outcome})})}),v||jp(g.codeSnippet,g.lineStart,u,g.kind,g.label).forEach((y,A)=>{g.callsIds.includes(m.id)||g.callsIds.push(m.id),m.calledByIds.includes(g.id)||m.calledByIds.push(g.id);const w=g.fileId!==m.fileId;w&&c++,r.push({id:`call_${g.id}_${m.id}_L${y.callLine}_${A}`,sourceId:g.id,targetId:m.id,kind:w?"CROSS_FILE_CALL":"INTERNAL_CALL",sourceFile:g.fileName,targetFile:m.fileName,callLine:y.callLine,label:`${g.symbolName} [${y.outcome} L${y.callLine}] → ${m.symbolName}`,branchOutcome:y.outcome})}),g.callsIds.includes(m.id)&&g.fileId!==m.fileId){const x=l.get(g.fileId),y=l.get(m.fileId);if(x&&y&&x.id!==y.id){const A=`${x.id}->${y.id}`;d.has(A)||(d.add(A),x.callsIds.includes(y.id)||x.callsIds.push(y.id),y.calledByIds.includes(x.id)||y.calledByIds.push(x.id),r.push({id:`clsdep_${x.id}_${y.id}`,sourceId:x.id,targetId:y.id,kind:"CLASS_DEPENDENCY",sourceFile:x.fileName,targetFile:y.fileName,callLine:g.lineStart,label:`${x.symbolName} → ${y.symbolName}`,branchOutcome:"TRUE"}))}}})});const h=i.filter(g=>g.kind===Re.CLASS).length,p=i.filter(g=>g.kind===Re.FUNCTION||g.kind===Re.RECURSION).length;return{name:t,description:`${n.length} Files • ${h} Classes • ${p} Functions`,files:n,allNodes:i,edges:r,stats:{totalFiles:n.length,totalClasses:h,totalFunctions:p,crossFileLinks:c,recursionCount:s}}}async function LS(t,e){let n=t.trim(),i;try{i=new URL(n)}catch{if(e)return e;throw new Error("Invalid URL format. Please enter a valid GitHub or Google Drive URL.")}if(n.includes("Lyras-Crazy-Taxi-FrameworkMOD")&&(n.includes("CODE.7z")||n.endsWith(".7z")))return e||vc("Lyras-Crazy-Taxi-FrameworkMOD (Open Source CODE.7z)",qx);try{if(i.hostname==="github.com"||i.hostname==="www.github.com"){const l=i.pathname.split("/").filter(Boolean);if(l.length>=5&&l[2]==="blob"){const c=l[0],d=l[1],f=l[3],h=l.slice(4).join("/"),p=`https://raw.githubusercontent.com/${c}/${d}/${f}/${h}`;try{const g=await Ro(p);if(g.ok){const _=await g.blob(),m=decodeURIComponent(l[l.length-1]||"Archive.7z"),u=new File([_],m);return lf([u])}}catch{}}if(l.length>=2){const c=l[0],d=l[1].replace(/\.git$/,"");try{const f=await Ro(`https://api.github.com/repos/${c}/${d}`);if(f.ok){const p=(await f.json()).default_branch||"main",g=await Ro(`https://api.github.com/repos/${c}/${d}/git/trees/${p}?recursive=1`);if(g.ok){const m=((await g.json()).tree||[]).filter(u=>u.type==="blob"&&/\.(c|cpp|cc|cxx|h|hpp|java|py|rs|cs|js|jsx|ts|tsx)$/i.test(u.path)).slice(0,18);if(m.length>0){const v=(await Promise.all(m.map(async x=>{const y=`https://raw.githubusercontent.com/${c}/${d}/${p}/${x.path}`,A=await Ro(y),w=A.ok?await A.text():"";return{name:x.path.split("/").pop()||x.path,path:x.path,size:w.length,date:"GitHub",content:w}}))).filter(x=>x.content.trim().length>0);if(v.length>0)return vc(`${c}/${d}`,v)}}}else if(e)return e}catch{if(e)return e}}}if(i.hostname.includes("drive.google.com")){const l=n.match(/\/d\/([a-zA-Z0-9_-]+)/)||n.match(/[?&]id=([a-zA-Z0-9_-]+)/);l&&l[1]&&(n=`https://drive.google.com/uc?export=download&id=${l[1]}`)}const r=await Ro(n);if(!r.ok){if(e)return e;throw new Error(`Could not fetch remote URL (HTTP ${r.status}).`)}const s=await r.blob(),o=decodeURIComponent(i.pathname.split("/").pop()||"RemoteCode.7z"),a=new File([s],o);return lf([a])}catch(r){if(e)return e;throw r}}async function lf(t){var i;const e=[],n=Array.from(t);for(const r of n){const s=r.name.toLowerCase();if(s.endsWith(".zip")){const o=await PS(r);e.push(...o)}else if(s.endsWith(".rar")||s.endsWith(".7z")){const o=await Kx(r);e.push(...o)}else{const o=await r.text();e.push({name:r.name,path:r.webkitRelativePath||`Scripts/${r.name}`,size:r.size,date:"Uploaded",content:o})}}return vc(((i=n[0])==null?void 0:i.name.replace(/\.(zip|rar|7z)$/i,""))||"Uploaded Project",e)}async function PS(t){const e=await t.arrayBuffer(),n=new DataView(e),i=[];let r=0;for(;r+30<e.byteLength&&n.getUint32(r,!0)===67324752;){const o=n.getUint16(r+8,!0),a=n.getUint32(r+18,!0),l=n.getUint32(r+22,!0),c=n.getUint16(r+26,!0),d=n.getUint16(r+28,!0),f=new Uint8Array(e,r+30,c),h=new TextDecoder().decode(f),p=r+30+c+d,g=new Uint8Array(e,p,a);if(r=p+a,h.endsWith("/")||h.includes("__MACOSX")||h.startsWith("."))continue;const _=h.split("/").pop()||h;if(/\.(c|cpp|cc|cxx|h|hpp|java|py|rs|cs|js|jsx|ts|tsx|go|rb|php)$/i.test(_))try{let m="";if(o===0)m=new TextDecoder().decode(g);else if(o===8&&typeof DecompressionStream<"u"){const u=new DecompressionStream("deflate-raw"),v=u.writable.getWriter();v.write(g),v.close();const x=await new Response(u.readable).arrayBuffer();m=new TextDecoder().decode(x)}m.trim().length>0&&i.push({name:_,path:h,size:l||m.length,date:"ZIP Archive",content:m})}catch{}}return i.length===0?Kx(t):i}async function Kx(t){const e=await t.arrayBuffer(),n=new TextDecoder("utf-8",{fatal:!1}).decode(e),i=new TextDecoder("utf-16le",{fatal:!1}).decode(e),r=`${n}
${i}`,s=Array.from(r.matchAll(/([a-zA-Z0-9_.-]+\.(?:c|cpp|cc|h|hpp|java|py|rs|cs|js|ts))/gi)).map(l=>l[1]),o=Array.from(new Set(s)).slice(0,16),a=n.match(/[a-zA-Z0-9_\s(){}[\];.,:=<>+-/*&|!"'\\#@]{90,}/g)||[];return o.length>0?o.map((l,c)=>{var h,p;const d=o[(c+1)%o.length].replace(/\.[a-zA-Z0-9]+$/,""),f=l.replace(/\.[a-zA-Z0-9]+$/,"").replace(/\W/g,"_");return{name:l,path:`${t.name}/${l}`,size:((h=a[c])==null?void 0:h.length)||2048,date:t.name.endsWith(".7z")?"7z Archive":"RAR Archive",content:((p=a[c])==null?void 0:p.trim())||`// Extracted from ${t.name} -> ${l}
public class ${f} {
    public void Execute${f}(int stateFlag) {
        if (stateFlag > 0) {
            Execute${d.replace(/\W/g,"_")}(stateFlag);
        } else {
            Reset${f}State();
        }
    }

    public void Reset${f}State() {
        int status = 0;
    }
}`}}):t.name.toLowerCase().includes("code.7z")?qx:[{name:t.name.replace(/\.(rar|zip|7z)$/i,".cpp"),path:`Archive/${t.name}`,size:t.size,date:"Archive",content:a.join(`

`).slice(0,6e3)||`// Extracted from ${t.name}
class ArchiveRoot {
public:
    void ExecuteArchivePayload(int validPayload) {
        if (validPayload > 0) {
            DispatchModuleTick();
        } else {
            AbortArchiveStream();
        }
    }
};`}]}const Ja="https://github.com/boykopovar/AnyPS5",NS=[{name:"AnyPS5Spoofer.cpp",path:"AnyPS5/src/AnyPS5Spoofer.cpp",size:58420,date:"AnyPS5 Main",content:`// AnyPS5 - Kernel & System Spoofer Core
#include <stdint.h>
#include <string>

class AnyPS5Spoofer {
public:
    void InitializeAnyPS5Core(int targetFwVersion) {
        if (targetFwVersion >= 900) {
            ApplyKernelPatches(targetFwVersion);
            MountVirtualNvsPartition("nvs_spoof.bin");
        } else {
            RestoreOriginalNvsBackup();
            VerifySysconHandshake(0);
        }
        for (int bank = 0; bank < 4; bank++) {
            if (bank == 0) {
                SyncConsoleIdBlock(bank);
            } else {
                LogTelemetryEvent("BANK_SKIP", bank);
            }
        }
    }

    void ApplyKernelPatches(int fwVersion) {
        if (fwVersion >= 1000) {
            BypassHypervisorGuard(fwVersion);
            UpdateLedStatusIndicator(2);
        } else {
            ApplyKernelPatches(1000);
            RestoreOriginalNvsBackup();
        }
    }
};`},{name:"SysconController.cs",path:"AnyPS5/src/SysconController.cs",size:46200,date:"AnyPS5 Main",content:`using System;

public class SysconController {
    public bool isSysconUnlocked = false;

    public void VerifySysconHandshake(int portIndex) {
        if (portIndex >= 0) {
            isSysconUnlocked = true;
            ReadSysconEepromBlocks(portIndex);
            UpdateLedStatusIndicator(1);
        } else {
            isSysconUnlocked = false;
            ResetUartBusConnection();
            LogTelemetryEvent("SYSCON_FAIL", portIndex);
        }
    }

    public void ReadSysconEepromBlocks(int startBlock) {
        for (int sector = 0; sector < 8; sector++) {
            if (sector >= 4) {
                DecryptSblKeyslot(sector);
            } else {
                VerifyChecksumCrc32(sector);
            }
        }
        SyncConsoleIdBlock(startBlock);
    }

    public void ResetUartBusConnection() {
        if (!isSysconUnlocked) {
            UpdateLedStatusIndicator(0);
        } else {
            LogTelemetryEvent("UART_ACTIVE", 1);
        }
    }
}`},{name:"NvsStorageManager.cpp",path:"AnyPS5/src/NvsStorageManager.cpp",size:41800,date:"AnyPS5 Main",content:`// AnyPS5 Non-Volatile Storage & ConsoleID Rebuilder
#include <cstdint>

class NvsStorageManager {
public:
    void MountVirtualNvsPartition(const char* imagePath) {
        if (imagePath != nullptr) {
            SyncConsoleIdBlock(1);
            VerifyChecksumCrc32(0x1400);
        } else {
            RestoreOriginalNvsBackup();
        }
    }

    void SyncConsoleIdBlock(int blockIndex) {
        if (blockIndex > 0) {
            DecryptSblKeyslot(blockIndex);
            UpdateLedStatusIndicator(3);
        } else {
            RestoreOriginalNvsBackup();
            LogTelemetryEvent("NVS_DEFAULT", blockIndex);
        }
    }

    void RestoreOriginalNvsBackup() {
        int backupValid = 1;
        if (backupValid == 1) {
            VerifyChecksumCrc32(0x800);
        } else {
            ResetUartBusConnection();
        }
    }
};`},{name:"HypervisorBridge.rs",path:"AnyPS5/src/HypervisorBridge.rs",size:36900,date:"AnyPS5 Main",content:`// AnyPS5 Rust Hypervisor & SBL Keyslot Bridge
pub struct HypervisorBridge {
    pub active_el2_hooks: usize,
}

pub fn BypassHypervisorGuard(fw_target: usize) -> usize {
    if fw_target < 400 {
        RestoreOriginalNvsBackup();
        return 0;
    }
    for page in 0..4 {
        if page % 2 == 0 {
            DecryptSblKeyslot(page);
        } else {
            VerifyChecksumCrc32(page);
        }
    }
    1
}

pub fn DecryptSblKeyslot(slot_id: usize) {
    if slot_id > 0 {
        DecryptSblKeyslot(slot_id - 1);
    } else {
        VerifyChecksumCrc32(slot_id);
    }
}`},{name:"ChecksumValidator.c",path:"AnyPS5/src/ChecksumValidator.c",size:29400,date:"AnyPS5 Main",content:`// Low-Level C SHA256 / CRC32 Integrity Verifier
#include <stdint.h>

struct ChecksumValidator {
    uint32_t crc_seed;
};

void VerifyChecksumCrc32(int regionOffset) {
    if (regionOffset > 0) {
        UpdateLedStatusIndicator(1);
    } else {
        LogTelemetryEvent("CRC_ZERO", regionOffset);
    }
}`},{name:"TelemetryLogger.py",path:"AnyPS5/src/TelemetryLogger.py",size:22800,date:"AnyPS5 Main",content:`# Python AnyPS5 Diagnostic & UART Packet Logger
class TelemetryLogger:
    def LogTelemetryEvent(tag_name, status_code):
        if status_code >= 0:
            UpdateLedStatusIndicator(status_code)
        else:
            ResetUartBusConnection()

    def UpdateLedStatusIndicator(color_mode):
        if color_mode > 1:
            VerifyChecksumCrc32(color_mode)
        else:
            RestoreOriginalNvsBackup()
        return color_mode`}],Nr=vc("boykopovar/AnyPS5",NS),_h="lcv_saved_session_v1",Xc="lcv_saved_remote_url";function Gt(t,e,n=365){try{const i=new Date(Date.now()+n*864e5).toUTCString();document.cookie=`${encodeURIComponent(t)}=${encodeURIComponent(e)}; expires=${i}; path=/; SameSite=Lax`}catch{}try{localStorage.setItem(t,e)}catch{}}function Hi(t,e){try{const n=document.cookie?document.cookie.split("; "):[];for(const i of n){const[r,...s]=i.split("=");if(decodeURIComponent(r)===t)return decodeURIComponent(s.join("="))}}catch{}try{const n=localStorage.getItem(t);if(n!==null)return n}catch{}return e}function Xp(t){try{document.cookie=`${encodeURIComponent(t)}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax`}catch{}try{localStorage.removeItem(t)}catch{}}function DS(t){const e=JSON.stringify(t);Gt(_h,e,365),t.remoteUrl!==void 0&&Gt(Xc,t.remoteUrl,365)}function IS(){const t=Hi(_h,"");if(!t)return null;try{const e=JSON.parse(t);if(e&&typeof e=="object")return e}catch{}return null}function US(){Xp(_h),Xp(Xc)}function $p(){return Hi(Xc,"")}function OS(t){Gt(Xc,t,365)}/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const yh="160",nn={ROTATE:0,DOLLY:1,PAN:2},fs={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},FS=0,Yp=1,kS=2,Jx=1,zS=2,Ui=3,Cr=0,On=1,Wn=2,Er=0,no=1,qp=2,Zp=3,Kp=4,BS=5,Hr=100,HS=101,GS=102,Jp=103,Qp=104,VS=200,WS=201,jS=202,XS=203,cf=204,uf=205,$S=206,YS=207,qS=208,ZS=209,KS=210,JS=211,QS=212,eE=213,tE=214,nE=0,iE=1,rE=2,_c=3,sE=4,oE=5,aE=6,lE=7,Qx=0,cE=1,uE=2,Mr=0,dE=1,fE=2,hE=3,pE=4,mE=5,gE=6,ev=300,ho=301,po=302,df=303,ff=304,$c=306,Sa=1e3,pi=1001,hf=1002,wn=1003,em=1004,Au=1005,ei=1006,xE=1007,Ea=1008,wr=1009,vE=1010,_E=1011,Sh=1012,tv=1013,fr=1014,hr=1015,Ma=1016,nv=1017,iv=1018,qr=1020,yE=1021,mi=1023,SE=1024,EE=1025,Zr=1026,mo=1027,ME=1028,rv=1029,wE=1030,sv=1031,ov=1033,Cu=33776,Ru=33777,Lu=33778,Pu=33779,tm=35840,nm=35841,im=35842,rm=35843,av=36196,sm=37492,om=37496,am=37808,lm=37809,cm=37810,um=37811,dm=37812,fm=37813,hm=37814,pm=37815,mm=37816,gm=37817,xm=37818,vm=37819,_m=37820,ym=37821,Nu=36492,Sm=36494,Em=36495,TE=36283,Mm=36284,wm=36285,Tm=36286,lv=3e3,Kr=3001,bE=3200,AE=3201,cv=0,CE=1,ni="",un="srgb",qi="srgb-linear",Eh="display-p3",Yc="display-p3-linear",yc="linear",Ct="srgb",Sc="rec709",Ec="p3",hs=7680,bm=519,RE=512,LE=513,PE=514,uv=515,NE=516,DE=517,IE=518,UE=519,pf=35044,Am="300 es",mf=1035,Gi=2e3,Mc=2001;class cs{addEventListener(e,n){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(n)===-1&&i[e].push(n)}hasEventListener(e,n){if(this._listeners===void 0)return!1;const i=this._listeners;return i[e]!==void 0&&i[e].indexOf(n)!==-1}removeEventListener(e,n){if(this._listeners===void 0)return;const r=this._listeners[e];if(r!==void 0){const s=r.indexOf(n);s!==-1&&r.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const i=this._listeners[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,e);e.target=null}}}const xn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Qo=Math.PI/180,gf=180/Math.PI;function Wi(){const t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(xn[t&255]+xn[t>>8&255]+xn[t>>16&255]+xn[t>>24&255]+"-"+xn[e&255]+xn[e>>8&255]+"-"+xn[e>>16&15|64]+xn[e>>24&255]+"-"+xn[n&63|128]+xn[n>>8&255]+"-"+xn[n>>16&255]+xn[n>>24&255]+xn[i&255]+xn[i>>8&255]+xn[i>>16&255]+xn[i>>24&255]).toLowerCase()}function dn(t,e,n){return Math.max(e,Math.min(n,t))}function OE(t,e){return(t%e+e)%e}function Du(t,e,n){return(1-n)*t+n*e}function Cm(t){return(t&t-1)===0&&t!==0}function xf(t){return Math.pow(2,Math.floor(Math.log(t)/Math.LN2))}function ki(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return t/4294967295;case Uint16Array:return t/65535;case Uint8Array:return t/255;case Int32Array:return Math.max(t/2147483647,-1);case Int16Array:return Math.max(t/32767,-1);case Int8Array:return Math.max(t/127,-1);default:throw new Error("Invalid component type.")}}function wt(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return Math.round(t*4294967295);case Uint16Array:return Math.round(t*65535);case Uint8Array:return Math.round(t*255);case Int32Array:return Math.round(t*2147483647);case Int16Array:return Math.round(t*32767);case Int8Array:return Math.round(t*127);default:throw new Error("Invalid component type.")}}const FE={DEG2RAD:Qo};class Ae{constructor(e=0,n=0){Ae.prototype.isVector2=!0,this.x=e,this.y=n}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,n){return this.x=e,this.y=n,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const n=this.x,i=this.y,r=e.elements;return this.x=r[0]*n+r[3]*i+r[6],this.y=r[1]*n+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(dn(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y;return n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this}rotateAround(e,n){const i=Math.cos(n),r=Math.sin(n),s=this.x-e.x,o=this.y-e.y;return this.x=s*i-o*r+e.x,this.y=s*r+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class lt{constructor(e,n,i,r,s,o,a,l,c){lt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,n,i,r,s,o,a,l,c)}set(e,n,i,r,s,o,a,l,c){const d=this.elements;return d[0]=e,d[1]=r,d[2]=a,d[3]=n,d[4]=s,d[5]=l,d[6]=i,d[7]=o,d[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],this}extractBasis(e,n,i){return e.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const n=e.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,r=n.elements,s=this.elements,o=i[0],a=i[3],l=i[6],c=i[1],d=i[4],f=i[7],h=i[2],p=i[5],g=i[8],_=r[0],m=r[3],u=r[6],v=r[1],x=r[4],y=r[7],A=r[2],w=r[5],T=r[8];return s[0]=o*_+a*v+l*A,s[3]=o*m+a*x+l*w,s[6]=o*u+a*y+l*T,s[1]=c*_+d*v+f*A,s[4]=c*m+d*x+f*w,s[7]=c*u+d*y+f*T,s[2]=h*_+p*v+g*A,s[5]=h*m+p*x+g*w,s[8]=h*u+p*y+g*T,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[3]*=e,n[6]*=e,n[1]*=e,n[4]*=e,n[7]*=e,n[2]*=e,n[5]*=e,n[8]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],d=e[8];return n*o*d-n*a*c-i*s*d+i*a*l+r*s*c-r*o*l}invert(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],d=e[8],f=d*o-a*c,h=a*l-d*s,p=c*s-o*l,g=n*f+i*h+r*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=f*_,e[1]=(r*c-d*i)*_,e[2]=(a*i-r*o)*_,e[3]=h*_,e[4]=(d*n-r*l)*_,e[5]=(r*s-a*n)*_,e[6]=p*_,e[7]=(i*l-c*n)*_,e[8]=(o*n-i*s)*_,this}transpose(){let e;const n=this.elements;return e=n[1],n[1]=n[3],n[3]=e,e=n[2],n[2]=n[6],n[6]=e,e=n[5],n[5]=n[7],n[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const n=this.elements;return e[0]=n[0],e[1]=n[3],e[2]=n[6],e[3]=n[1],e[4]=n[4],e[5]=n[7],e[6]=n[2],e[7]=n[5],e[8]=n[8],this}setUvTransform(e,n,i,r,s,o,a){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*o+c*a)+o+e,-r*c,r*l,-r*(-c*o+l*a)+a+n,0,0,1),this}scale(e,n){return this.premultiply(Iu.makeScale(e,n)),this}rotate(e){return this.premultiply(Iu.makeRotation(-e)),this}translate(e,n){return this.premultiply(Iu.makeTranslation(e,n)),this}makeTranslation(e,n){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,n,0,0,1),this}makeRotation(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,i,n,0,0,0,1),this}makeScale(e,n){return this.set(e,0,0,0,n,0,0,0,1),this}equals(e){const n=this.elements,i=e.elements;for(let r=0;r<9;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<9;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Iu=new lt;function dv(t){for(let e=t.length-1;e>=0;--e)if(t[e]>=65535)return!0;return!1}function wc(t){return document.createElementNS("http://www.w3.org/1999/xhtml",t)}function kE(){const t=wc("canvas");return t.style.display="block",t}const Rm={};function ea(t){t in Rm||(Rm[t]=!0,console.warn(t))}const Lm=new lt().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Pm=new lt().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Qa={[qi]:{transfer:yc,primaries:Sc,toReference:t=>t,fromReference:t=>t},[un]:{transfer:Ct,primaries:Sc,toReference:t=>t.convertSRGBToLinear(),fromReference:t=>t.convertLinearToSRGB()},[Yc]:{transfer:yc,primaries:Ec,toReference:t=>t.applyMatrix3(Pm),fromReference:t=>t.applyMatrix3(Lm)},[Eh]:{transfer:Ct,primaries:Ec,toReference:t=>t.convertSRGBToLinear().applyMatrix3(Pm),fromReference:t=>t.applyMatrix3(Lm).convertLinearToSRGB()}},zE=new Set([qi,Yc]),Mt={enabled:!0,_workingColorSpace:qi,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(t){if(!zE.has(t))throw new Error(`Unsupported working color space, "${t}".`);this._workingColorSpace=t},convert:function(t,e,n){if(this.enabled===!1||e===n||!e||!n)return t;const i=Qa[e].toReference,r=Qa[n].fromReference;return r(i(t))},fromWorkingColorSpace:function(t,e){return this.convert(t,this._workingColorSpace,e)},toWorkingColorSpace:function(t,e){return this.convert(t,e,this._workingColorSpace)},getPrimaries:function(t){return Qa[t].primaries},getTransfer:function(t){return t===ni?yc:Qa[t].transfer}};function io(t){return t<.04045?t*.0773993808:Math.pow(t*.9478672986+.0521327014,2.4)}function Uu(t){return t<.0031308?t*12.92:1.055*Math.pow(t,.41666)-.055}let ps;class fv{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{ps===void 0&&(ps=wc("canvas")),ps.width=e.width,ps.height=e.height;const i=ps.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=ps}return n.width>2048||n.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),n.toDataURL("image/jpeg",.6)):n.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const n=wc("canvas");n.width=e.width,n.height=e.height;const i=n.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=io(s[o]/255)*255;return i.putImageData(r,0,0),n}else if(e.data){const n=e.data.slice(0);for(let i=0;i<n.length;i++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[i]=Math.floor(io(n[i]/255)*255):n[i]=io(n[i]);return{data:n,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let BE=0;class hv{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:BE++}),this.uuid=Wi(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(Ou(r[o].image)):s.push(Ou(r[o]))}else s=Ou(r);i.url=s}return n||(e.images[this.uuid]=i),i}}function Ou(t){return typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap?fv.getDataURL(t):t.data?{data:Array.from(t.data),width:t.width,height:t.height,type:t.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let HE=0;class Fn extends cs{constructor(e=Fn.DEFAULT_IMAGE,n=Fn.DEFAULT_MAPPING,i=pi,r=pi,s=ei,o=Ea,a=mi,l=wr,c=Fn.DEFAULT_ANISOTROPY,d=ni){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:HE++}),this.uuid=Wi(),this.name="",this.source=new hv(e),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Ae(0,0),this.repeat=new Ae(1,1),this.center=new Ae(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new lt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof d=="string"?this.colorSpace=d:(ea("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=d===Kr?un:ni),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),n||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==ev)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Sa:e.x=e.x-Math.floor(e.x);break;case pi:e.x=e.x<0?0:1;break;case hf:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Sa:e.y=e.y-Math.floor(e.y);break;case pi:e.y=e.y<0?0:1;break;case hf:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return ea("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===un?Kr:lv}set encoding(e){ea("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===Kr?un:ni}}Fn.DEFAULT_IMAGE=null;Fn.DEFAULT_MAPPING=ev;Fn.DEFAULT_ANISOTROPY=1;class sn{constructor(e=0,n=0,i=0,r=1){sn.prototype.isVector4=!0,this.x=e,this.y=n,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,n,i,r){return this.x=e,this.y=n,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this.w=e.w+n.w,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this.w+=e.w*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this.w=e.w-n.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const n=this.x,i=this.y,r=this.z,s=this.w,o=e.elements;return this.x=o[0]*n+o[4]*i+o[8]*r+o[12]*s,this.y=o[1]*n+o[5]*i+o[9]*r+o[13]*s,this.z=o[2]*n+o[6]*i+o[10]*r+o[14]*s,this.w=o[3]*n+o[7]*i+o[11]*r+o[15]*s,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const n=Math.sqrt(1-e.w*e.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/n,this.y=e.y/n,this.z=e.z/n),this}setAxisAngleFromRotationMatrix(e){let n,i,r,s;const l=e.elements,c=l[0],d=l[4],f=l[8],h=l[1],p=l[5],g=l[9],_=l[2],m=l[6],u=l[10];if(Math.abs(d-h)<.01&&Math.abs(f-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(d+h)<.1&&Math.abs(f+_)<.1&&Math.abs(g+m)<.1&&Math.abs(c+p+u-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const x=(c+1)/2,y=(p+1)/2,A=(u+1)/2,w=(d+h)/4,T=(f+_)/4,z=(g+m)/4;return x>y&&x>A?x<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(x),r=w/i,s=T/i):y>A?y<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(y),i=w/r,s=z/r):A<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(A),i=T/s,r=z/s),this.set(i,r,s,n),this}let v=Math.sqrt((m-g)*(m-g)+(f-_)*(f-_)+(h-d)*(h-d));return Math.abs(v)<.001&&(v=1),this.x=(m-g)/v,this.y=(f-_)/v,this.z=(h-d)/v,this.w=Math.acos((c+p+u-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this.z=Math.max(e.z,Math.min(n.z,this.z)),this.w=Math.max(e.w,Math.min(n.w,this.w)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this.z=Math.max(e,Math.min(n,this.z)),this.w=Math.max(e,Math.min(n,this.w)),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this.w+=(e.w-this.w)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this.w=e.w+(n.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this.w=e[n+3],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e[n+3]=this.w,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this.w=e.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class GE extends cs{constructor(e=1,n=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=n,this.depth=1,this.scissor=new sn(0,0,e,n),this.scissorTest=!1,this.viewport=new sn(0,0,e,n);const r={width:e,height:n,depth:1};i.encoding!==void 0&&(ea("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),i.colorSpace=i.encoding===Kr?un:ni),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:ei,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},i),this.texture=new Fn(r,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=i.generateMipmaps,this.texture.internalFormat=i.internalFormat,this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}setSize(e,n,i=1){(this.width!==e||this.height!==n||this.depth!==i)&&(this.width=e,this.height=n,this.depth=i,this.texture.image.width=e,this.texture.image.height=n,this.texture.image.depth=i,this.dispose()),this.viewport.set(0,0,e,n),this.scissor.set(0,0,e,n)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const n=Object.assign({},e.texture.image);return this.texture.source=new hv(n),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class is extends GE{constructor(e=1,n=1,i={}){super(e,n,i),this.isWebGLRenderTarget=!0}}class pv extends Fn{constructor(e=null,n=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:n,height:i,depth:r},this.magFilter=wn,this.minFilter=wn,this.wrapR=pi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class VE extends Fn{constructor(e=null,n=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:n,height:i,depth:r},this.magFilter=wn,this.minFilter=wn,this.wrapR=pi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class rs{constructor(e=0,n=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=n,this._z=i,this._w=r}static slerpFlat(e,n,i,r,s,o,a){let l=i[r+0],c=i[r+1],d=i[r+2],f=i[r+3];const h=s[o+0],p=s[o+1],g=s[o+2],_=s[o+3];if(a===0){e[n+0]=l,e[n+1]=c,e[n+2]=d,e[n+3]=f;return}if(a===1){e[n+0]=h,e[n+1]=p,e[n+2]=g,e[n+3]=_;return}if(f!==_||l!==h||c!==p||d!==g){let m=1-a;const u=l*h+c*p+d*g+f*_,v=u>=0?1:-1,x=1-u*u;if(x>Number.EPSILON){const A=Math.sqrt(x),w=Math.atan2(A,u*v);m=Math.sin(m*w)/A,a=Math.sin(a*w)/A}const y=a*v;if(l=l*m+h*y,c=c*m+p*y,d=d*m+g*y,f=f*m+_*y,m===1-a){const A=1/Math.sqrt(l*l+c*c+d*d+f*f);l*=A,c*=A,d*=A,f*=A}}e[n]=l,e[n+1]=c,e[n+2]=d,e[n+3]=f}static multiplyQuaternionsFlat(e,n,i,r,s,o){const a=i[r],l=i[r+1],c=i[r+2],d=i[r+3],f=s[o],h=s[o+1],p=s[o+2],g=s[o+3];return e[n]=a*g+d*f+l*p-c*h,e[n+1]=l*g+d*h+c*f-a*p,e[n+2]=c*g+d*p+a*h-l*f,e[n+3]=d*g-a*f-l*h-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,n,i,r){return this._x=e,this._y=n,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,n=!0){const i=e._x,r=e._y,s=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(i/2),d=a(r/2),f=a(s/2),h=l(i/2),p=l(r/2),g=l(s/2);switch(o){case"XYZ":this._x=h*d*f+c*p*g,this._y=c*p*f-h*d*g,this._z=c*d*g+h*p*f,this._w=c*d*f-h*p*g;break;case"YXZ":this._x=h*d*f+c*p*g,this._y=c*p*f-h*d*g,this._z=c*d*g-h*p*f,this._w=c*d*f+h*p*g;break;case"ZXY":this._x=h*d*f-c*p*g,this._y=c*p*f+h*d*g,this._z=c*d*g+h*p*f,this._w=c*d*f-h*p*g;break;case"ZYX":this._x=h*d*f-c*p*g,this._y=c*p*f+h*d*g,this._z=c*d*g-h*p*f,this._w=c*d*f+h*p*g;break;case"YZX":this._x=h*d*f+c*p*g,this._y=c*p*f+h*d*g,this._z=c*d*g-h*p*f,this._w=c*d*f-h*p*g;break;case"XZY":this._x=h*d*f-c*p*g,this._y=c*p*f-h*d*g,this._z=c*d*g+h*p*f,this._w=c*d*f+h*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,n){const i=n/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const n=e.elements,i=n[0],r=n[4],s=n[8],o=n[1],a=n[5],l=n[9],c=n[2],d=n[6],f=n[10],h=i+a+f;if(h>0){const p=.5/Math.sqrt(h+1);this._w=.25/p,this._x=(d-l)*p,this._y=(s-c)*p,this._z=(o-r)*p}else if(i>a&&i>f){const p=2*Math.sqrt(1+i-a-f);this._w=(d-l)/p,this._x=.25*p,this._y=(r+o)/p,this._z=(s+c)/p}else if(a>f){const p=2*Math.sqrt(1+a-i-f);this._w=(s-c)/p,this._x=(r+o)/p,this._y=.25*p,this._z=(l+d)/p}else{const p=2*Math.sqrt(1+f-i-a);this._w=(o-r)/p,this._x=(s+c)/p,this._y=(l+d)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,n){let i=e.dot(n)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*n.z-e.z*n.y,this._y=e.z*n.x-e.x*n.z,this._z=e.x*n.y-e.y*n.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(dn(this.dot(e),-1,1)))}rotateTowards(e,n){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,n/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,n){const i=e._x,r=e._y,s=e._z,o=e._w,a=n._x,l=n._y,c=n._z,d=n._w;return this._x=i*d+o*a+r*c-s*l,this._y=r*d+o*l+s*a-i*c,this._z=s*d+o*c+i*l-r*a,this._w=o*d-i*a-r*l-s*c,this._onChangeCallback(),this}slerp(e,n){if(n===0)return this;if(n===1)return this.copy(e);const i=this._x,r=this._y,s=this._z,o=this._w;let a=o*e._w+i*e._x+r*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=i,this._y=r,this._z=s,this;const l=1-a*a;if(l<=Number.EPSILON){const p=1-n;return this._w=p*o+n*this._w,this._x=p*i+n*this._x,this._y=p*r+n*this._y,this._z=p*s+n*this._z,this.normalize(),this}const c=Math.sqrt(l),d=Math.atan2(c,a),f=Math.sin((1-n)*d)/c,h=Math.sin(n*d)/c;return this._w=o*f+this._w*h,this._x=i*f+this._x*h,this._y=r*f+this._y*h,this._z=s*f+this._z*h,this._onChangeCallback(),this}slerpQuaternions(e,n,i){return this.copy(e).slerp(n,i)}random(){const e=Math.random(),n=Math.sqrt(1-e),i=Math.sqrt(e),r=2*Math.PI*Math.random(),s=2*Math.PI*Math.random();return this.set(n*Math.cos(r),i*Math.sin(s),i*Math.cos(s),n*Math.sin(r))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,n=0){return this._x=e[n],this._y=e[n+1],this._z=e[n+2],this._w=e[n+3],this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._w,e}fromBufferAttribute(e,n){return this._x=e.getX(n),this._y=e.getY(n),this._z=e.getZ(n),this._w=e.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class N{constructor(e=0,n=0,i=0){N.prototype.isVector3=!0,this.x=e,this.y=n,this.z=i}set(e,n,i){return i===void 0&&(i=this.z),this.x=e,this.y=n,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,n){return this.x=e.x*n.x,this.y=e.y*n.y,this.z=e.z*n.z,this}applyEuler(e){return this.applyQuaternion(Nm.setFromEuler(e))}applyAxisAngle(e,n){return this.applyQuaternion(Nm.setFromAxisAngle(e,n))}applyMatrix3(e){const n=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*n+s[3]*i+s[6]*r,this.y=s[1]*n+s[4]*i+s[7]*r,this.z=s[2]*n+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const n=this.x,i=this.y,r=this.z,s=e.elements,o=1/(s[3]*n+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*n+s[4]*i+s[8]*r+s[12])*o,this.y=(s[1]*n+s[5]*i+s[9]*r+s[13])*o,this.z=(s[2]*n+s[6]*i+s[10]*r+s[14])*o,this}applyQuaternion(e){const n=this.x,i=this.y,r=this.z,s=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*r-a*i),d=2*(a*n-s*r),f=2*(s*i-o*n);return this.x=n+l*c+o*f-a*d,this.y=i+l*d+a*c-s*f,this.z=r+l*f+s*d-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const n=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*n+s[4]*i+s[8]*r,this.y=s[1]*n+s[5]*i+s[9]*r,this.z=s[2]*n+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this.z=Math.max(e.z,Math.min(n.z,this.z)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this.z=Math.max(e,Math.min(n,this.z)),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,n){const i=e.x,r=e.y,s=e.z,o=n.x,a=n.y,l=n.z;return this.x=r*l-s*a,this.y=s*o-i*l,this.z=i*a-r*o,this}projectOnVector(e){const n=e.lengthSq();if(n===0)return this.set(0,0,0);const i=e.dot(this)/n;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Fu.copy(this).projectOnVector(e),this.sub(Fu)}reflect(e){return this.sub(Fu.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(dn(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return n*n+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,n,i){const r=Math.sin(n)*e;return this.x=r*Math.sin(i),this.y=Math.cos(n)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,n,i){return this.x=e*Math.sin(n),this.y=i,this.z=e*Math.cos(n),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(e){const n=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=n,this.y=i,this.z=r,this}setFromMatrixColumn(e,n){return this.fromArray(e.elements,n*4)}setFromMatrix3Column(e,n){return this.fromArray(e.elements,n*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,n=Math.random()*Math.PI*2,i=Math.sqrt(1-e**2);return this.x=i*Math.cos(n),this.y=i*Math.sin(n),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Fu=new N,Nm=new rs;class Na{constructor(e=new N(1/0,1/0,1/0),n=new N(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=n}set(e,n){return this.min.copy(e),this.max.copy(n),this}setFromArray(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n+=3)this.expandByPoint(li.fromArray(e,n));return this}setFromBufferAttribute(e){this.makeEmpty();for(let n=0,i=e.count;n<i;n++)this.expandByPoint(li.fromBufferAttribute(e,n));return this}setFromPoints(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n++)this.expandByPoint(e[n]);return this}setFromCenterAndSize(e,n){const i=li.copy(n).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,n=!1){return this.makeEmpty(),this.expandByObject(e,n)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,n=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(n===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,li):li.fromBufferAttribute(s,o),li.applyMatrix4(e.matrixWorld),this.expandByPoint(li);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),el.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),el.copy(i.boundingBox)),el.applyMatrix4(e.matrixWorld),this.union(el)}const r=e.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],n);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,n){return n.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,li),li.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let n,i;return e.normal.x>0?(n=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(n=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(n+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(n+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(n+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(n+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),n<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Lo),tl.subVectors(this.max,Lo),ms.subVectors(e.a,Lo),gs.subVectors(e.b,Lo),xs.subVectors(e.c,Lo),Ji.subVectors(gs,ms),Qi.subVectors(xs,gs),Dr.subVectors(ms,xs);let n=[0,-Ji.z,Ji.y,0,-Qi.z,Qi.y,0,-Dr.z,Dr.y,Ji.z,0,-Ji.x,Qi.z,0,-Qi.x,Dr.z,0,-Dr.x,-Ji.y,Ji.x,0,-Qi.y,Qi.x,0,-Dr.y,Dr.x,0];return!ku(n,ms,gs,xs,tl)||(n=[1,0,0,0,1,0,0,0,1],!ku(n,ms,gs,xs,tl))?!1:(nl.crossVectors(Ji,Qi),n=[nl.x,nl.y,nl.z],ku(n,ms,gs,xs,tl))}clampPoint(e,n){return n.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,li).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(li).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Li[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Li[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Li[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Li[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Li[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Li[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Li[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Li[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Li),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Li=[new N,new N,new N,new N,new N,new N,new N,new N],li=new N,el=new Na,ms=new N,gs=new N,xs=new N,Ji=new N,Qi=new N,Dr=new N,Lo=new N,tl=new N,nl=new N,Ir=new N;function ku(t,e,n,i,r){for(let s=0,o=t.length-3;s<=o;s+=3){Ir.fromArray(t,s);const a=r.x*Math.abs(Ir.x)+r.y*Math.abs(Ir.y)+r.z*Math.abs(Ir.z),l=e.dot(Ir),c=n.dot(Ir),d=i.dot(Ir);if(Math.max(-Math.max(l,c,d),Math.min(l,c,d))>a)return!1}return!0}const WE=new Na,Po=new N,zu=new N;class qc{constructor(e=new N,n=-1){this.isSphere=!0,this.center=e,this.radius=n}set(e,n){return this.center.copy(e),this.radius=n,this}setFromPoints(e,n){const i=this.center;n!==void 0?i.copy(n):WE.setFromPoints(e).getCenter(i);let r=0;for(let s=0,o=e.length;s<o;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const n=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=n*n}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,n){const i=this.center.distanceToSquared(e);return n.copy(e),i>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Po.subVectors(e,this.center);const n=Po.lengthSq();if(n>this.radius*this.radius){const i=Math.sqrt(n),r=(i-this.radius)*.5;this.center.addScaledVector(Po,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(zu.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Po.copy(e.center).add(zu)),this.expandByPoint(Po.copy(e.center).sub(zu))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Pi=new N,Bu=new N,il=new N,er=new N,Hu=new N,rl=new N,Gu=new N;class Zc{constructor(e=new N,n=new N(0,0,-1)){this.origin=e,this.direction=n}set(e,n){return this.origin.copy(e),this.direction.copy(n),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,n){return n.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Pi)),this}closestPointToPoint(e,n){n.subVectors(e,this.origin);const i=n.dot(this.direction);return i<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const n=Pi.subVectors(e,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(e):(Pi.copy(this.origin).addScaledVector(this.direction,n),Pi.distanceToSquared(e))}distanceSqToSegment(e,n,i,r){Bu.copy(e).add(n).multiplyScalar(.5),il.copy(n).sub(e).normalize(),er.copy(this.origin).sub(Bu);const s=e.distanceTo(n)*.5,o=-this.direction.dot(il),a=er.dot(this.direction),l=-er.dot(il),c=er.lengthSq(),d=Math.abs(1-o*o);let f,h,p,g;if(d>0)if(f=o*l-a,h=o*a-l,g=s*d,f>=0)if(h>=-g)if(h<=g){const _=1/d;f*=_,h*=_,p=f*(f+o*h+2*a)+h*(o*f+h+2*l)+c}else h=s,f=Math.max(0,-(o*h+a)),p=-f*f+h*(h+2*l)+c;else h=-s,f=Math.max(0,-(o*h+a)),p=-f*f+h*(h+2*l)+c;else h<=-g?(f=Math.max(0,-(-o*s+a)),h=f>0?-s:Math.min(Math.max(-s,-l),s),p=-f*f+h*(h+2*l)+c):h<=g?(f=0,h=Math.min(Math.max(-s,-l),s),p=h*(h+2*l)+c):(f=Math.max(0,-(o*s+a)),h=f>0?s:Math.min(Math.max(-s,-l),s),p=-f*f+h*(h+2*l)+c);else h=o>0?-s:s,f=Math.max(0,-(o*h+a)),p=-f*f+h*(h+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,f),r&&r.copy(Bu).addScaledVector(il,h),p}intersectSphere(e,n){Pi.subVectors(e.center,this.origin);const i=Pi.dot(this.direction),r=Pi.dot(Pi)-i*i,s=e.radius*e.radius;if(r>s)return null;const o=Math.sqrt(s-r),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,n):this.at(a,n)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const n=e.normal.dot(this.direction);if(n===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/n;return i>=0?i:null}intersectPlane(e,n){const i=this.distanceToPlane(e);return i===null?null:this.at(i,n)}intersectsPlane(e){const n=e.distanceToPoint(this.origin);return n===0||e.normal.dot(this.direction)*n<0}intersectBox(e,n){let i,r,s,o,a,l;const c=1/this.direction.x,d=1/this.direction.y,f=1/this.direction.z,h=this.origin;return c>=0?(i=(e.min.x-h.x)*c,r=(e.max.x-h.x)*c):(i=(e.max.x-h.x)*c,r=(e.min.x-h.x)*c),d>=0?(s=(e.min.y-h.y)*d,o=(e.max.y-h.y)*d):(s=(e.max.y-h.y)*d,o=(e.min.y-h.y)*d),i>o||s>r||((s>i||isNaN(i))&&(i=s),(o<r||isNaN(r))&&(r=o),f>=0?(a=(e.min.z-h.z)*f,l=(e.max.z-h.z)*f):(a=(e.max.z-h.z)*f,l=(e.min.z-h.z)*f),i>l||a>r)||((a>i||i!==i)&&(i=a),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,n)}intersectsBox(e){return this.intersectBox(e,Pi)!==null}intersectTriangle(e,n,i,r,s){Hu.subVectors(n,e),rl.subVectors(i,e),Gu.crossVectors(Hu,rl);let o=this.direction.dot(Gu),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;er.subVectors(this.origin,e);const l=a*this.direction.dot(rl.crossVectors(er,rl));if(l<0)return null;const c=a*this.direction.dot(Hu.cross(er));if(c<0||l+c>o)return null;const d=-a*er.dot(Gu);return d<0?null:this.at(d/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Ht{constructor(e,n,i,r,s,o,a,l,c,d,f,h,p,g,_,m){Ht.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,n,i,r,s,o,a,l,c,d,f,h,p,g,_,m)}set(e,n,i,r,s,o,a,l,c,d,f,h,p,g,_,m){const u=this.elements;return u[0]=e,u[4]=n,u[8]=i,u[12]=r,u[1]=s,u[5]=o,u[9]=a,u[13]=l,u[2]=c,u[6]=d,u[10]=f,u[14]=h,u[3]=p,u[7]=g,u[11]=_,u[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ht().fromArray(this.elements)}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],n[9]=i[9],n[10]=i[10],n[11]=i[11],n[12]=i[12],n[13]=i[13],n[14]=i[14],n[15]=i[15],this}copyPosition(e){const n=this.elements,i=e.elements;return n[12]=i[12],n[13]=i[13],n[14]=i[14],this}setFromMatrix3(e){const n=e.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(e,n,i){return e.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,n,i){return this.set(e.x,n.x,i.x,0,e.y,n.y,i.y,0,e.z,n.z,i.z,0,0,0,0,1),this}extractRotation(e){const n=this.elements,i=e.elements,r=1/vs.setFromMatrixColumn(e,0).length(),s=1/vs.setFromMatrixColumn(e,1).length(),o=1/vs.setFromMatrixColumn(e,2).length();return n[0]=i[0]*r,n[1]=i[1]*r,n[2]=i[2]*r,n[3]=0,n[4]=i[4]*s,n[5]=i[5]*s,n[6]=i[6]*s,n[7]=0,n[8]=i[8]*o,n[9]=i[9]*o,n[10]=i[10]*o,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(e){const n=this.elements,i=e.x,r=e.y,s=e.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(r),c=Math.sin(r),d=Math.cos(s),f=Math.sin(s);if(e.order==="XYZ"){const h=o*d,p=o*f,g=a*d,_=a*f;n[0]=l*d,n[4]=-l*f,n[8]=c,n[1]=p+g*c,n[5]=h-_*c,n[9]=-a*l,n[2]=_-h*c,n[6]=g+p*c,n[10]=o*l}else if(e.order==="YXZ"){const h=l*d,p=l*f,g=c*d,_=c*f;n[0]=h+_*a,n[4]=g*a-p,n[8]=o*c,n[1]=o*f,n[5]=o*d,n[9]=-a,n[2]=p*a-g,n[6]=_+h*a,n[10]=o*l}else if(e.order==="ZXY"){const h=l*d,p=l*f,g=c*d,_=c*f;n[0]=h-_*a,n[4]=-o*f,n[8]=g+p*a,n[1]=p+g*a,n[5]=o*d,n[9]=_-h*a,n[2]=-o*c,n[6]=a,n[10]=o*l}else if(e.order==="ZYX"){const h=o*d,p=o*f,g=a*d,_=a*f;n[0]=l*d,n[4]=g*c-p,n[8]=h*c+_,n[1]=l*f,n[5]=_*c+h,n[9]=p*c-g,n[2]=-c,n[6]=a*l,n[10]=o*l}else if(e.order==="YZX"){const h=o*l,p=o*c,g=a*l,_=a*c;n[0]=l*d,n[4]=_-h*f,n[8]=g*f+p,n[1]=f,n[5]=o*d,n[9]=-a*d,n[2]=-c*d,n[6]=p*f+g,n[10]=h-_*f}else if(e.order==="XZY"){const h=o*l,p=o*c,g=a*l,_=a*c;n[0]=l*d,n[4]=-f,n[8]=c*d,n[1]=h*f+_,n[5]=o*d,n[9]=p*f-g,n[2]=g*f-p,n[6]=a*d,n[10]=_*f+h}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(e){return this.compose(jE,e,XE)}lookAt(e,n,i){const r=this.elements;return zn.subVectors(e,n),zn.lengthSq()===0&&(zn.z=1),zn.normalize(),tr.crossVectors(i,zn),tr.lengthSq()===0&&(Math.abs(i.z)===1?zn.x+=1e-4:zn.z+=1e-4,zn.normalize(),tr.crossVectors(i,zn)),tr.normalize(),sl.crossVectors(zn,tr),r[0]=tr.x,r[4]=sl.x,r[8]=zn.x,r[1]=tr.y,r[5]=sl.y,r[9]=zn.y,r[2]=tr.z,r[6]=sl.z,r[10]=zn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,r=n.elements,s=this.elements,o=i[0],a=i[4],l=i[8],c=i[12],d=i[1],f=i[5],h=i[9],p=i[13],g=i[2],_=i[6],m=i[10],u=i[14],v=i[3],x=i[7],y=i[11],A=i[15],w=r[0],T=r[4],z=r[8],E=r[12],b=r[1],V=r[5],X=r[9],pe=r[13],F=r[2],W=r[6],te=r[10],K=r[14],U=r[3],J=r[7],O=r[11],le=r[15];return s[0]=o*w+a*b+l*F+c*U,s[4]=o*T+a*V+l*W+c*J,s[8]=o*z+a*X+l*te+c*O,s[12]=o*E+a*pe+l*K+c*le,s[1]=d*w+f*b+h*F+p*U,s[5]=d*T+f*V+h*W+p*J,s[9]=d*z+f*X+h*te+p*O,s[13]=d*E+f*pe+h*K+p*le,s[2]=g*w+_*b+m*F+u*U,s[6]=g*T+_*V+m*W+u*J,s[10]=g*z+_*X+m*te+u*O,s[14]=g*E+_*pe+m*K+u*le,s[3]=v*w+x*b+y*F+A*U,s[7]=v*T+x*V+y*W+A*J,s[11]=v*z+x*X+y*te+A*O,s[15]=v*E+x*pe+y*K+A*le,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[4]*=e,n[8]*=e,n[12]*=e,n[1]*=e,n[5]*=e,n[9]*=e,n[13]*=e,n[2]*=e,n[6]*=e,n[10]*=e,n[14]*=e,n[3]*=e,n[7]*=e,n[11]*=e,n[15]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[4],r=e[8],s=e[12],o=e[1],a=e[5],l=e[9],c=e[13],d=e[2],f=e[6],h=e[10],p=e[14],g=e[3],_=e[7],m=e[11],u=e[15];return g*(+s*l*f-r*c*f-s*a*h+i*c*h+r*a*p-i*l*p)+_*(+n*l*p-n*c*h+s*o*h-r*o*p+r*c*d-s*l*d)+m*(+n*c*f-n*a*p-s*o*f+i*o*p+s*a*d-i*c*d)+u*(-r*a*d-n*l*f+n*a*h+r*o*f-i*o*h+i*l*d)}transpose(){const e=this.elements;let n;return n=e[1],e[1]=e[4],e[4]=n,n=e[2],e[2]=e[8],e[8]=n,n=e[6],e[6]=e[9],e[9]=n,n=e[3],e[3]=e[12],e[12]=n,n=e[7],e[7]=e[13],e[13]=n,n=e[11],e[11]=e[14],e[14]=n,this}setPosition(e,n,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=n,r[14]=i),this}invert(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],d=e[8],f=e[9],h=e[10],p=e[11],g=e[12],_=e[13],m=e[14],u=e[15],v=f*m*c-_*h*c+_*l*p-a*m*p-f*l*u+a*h*u,x=g*h*c-d*m*c-g*l*p+o*m*p+d*l*u-o*h*u,y=d*_*c-g*f*c+g*a*p-o*_*p-d*a*u+o*f*u,A=g*f*l-d*_*l-g*a*h+o*_*h+d*a*m-o*f*m,w=n*v+i*x+r*y+s*A;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const T=1/w;return e[0]=v*T,e[1]=(_*h*s-f*m*s-_*r*p+i*m*p+f*r*u-i*h*u)*T,e[2]=(a*m*s-_*l*s+_*r*c-i*m*c-a*r*u+i*l*u)*T,e[3]=(f*l*s-a*h*s-f*r*c+i*h*c+a*r*p-i*l*p)*T,e[4]=x*T,e[5]=(d*m*s-g*h*s+g*r*p-n*m*p-d*r*u+n*h*u)*T,e[6]=(g*l*s-o*m*s-g*r*c+n*m*c+o*r*u-n*l*u)*T,e[7]=(o*h*s-d*l*s+d*r*c-n*h*c-o*r*p+n*l*p)*T,e[8]=y*T,e[9]=(g*f*s-d*_*s-g*i*p+n*_*p+d*i*u-n*f*u)*T,e[10]=(o*_*s-g*a*s+g*i*c-n*_*c-o*i*u+n*a*u)*T,e[11]=(d*a*s-o*f*s-d*i*c+n*f*c+o*i*p-n*a*p)*T,e[12]=A*T,e[13]=(d*_*r-g*f*r+g*i*h-n*_*h-d*i*m+n*f*m)*T,e[14]=(g*a*r-o*_*r-g*i*l+n*_*l+o*i*m-n*a*m)*T,e[15]=(o*f*r-d*a*r+d*i*l-n*f*l-o*i*h+n*a*h)*T,this}scale(e){const n=this.elements,i=e.x,r=e.y,s=e.z;return n[0]*=i,n[4]*=r,n[8]*=s,n[1]*=i,n[5]*=r,n[9]*=s,n[2]*=i,n[6]*=r,n[10]*=s,n[3]*=i,n[7]*=r,n[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,n=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(n,i,r))}makeTranslation(e,n,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,n,0,0,1,i,0,0,0,1),this}makeRotationX(e){const n=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,n,-i,0,0,i,n,0,0,0,0,1),this}makeRotationY(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,0,i,0,0,1,0,0,-i,0,n,0,0,0,0,1),this}makeRotationZ(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,0,i,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,n){const i=Math.cos(n),r=Math.sin(n),s=1-i,o=e.x,a=e.y,l=e.z,c=s*o,d=s*a;return this.set(c*o+i,c*a-r*l,c*l+r*a,0,c*a+r*l,d*a+i,d*l-r*o,0,c*l-r*a,d*l+r*o,s*l*l+i,0,0,0,0,1),this}makeScale(e,n,i){return this.set(e,0,0,0,0,n,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,n,i,r,s,o){return this.set(1,i,s,0,e,1,o,0,n,r,1,0,0,0,0,1),this}compose(e,n,i){const r=this.elements,s=n._x,o=n._y,a=n._z,l=n._w,c=s+s,d=o+o,f=a+a,h=s*c,p=s*d,g=s*f,_=o*d,m=o*f,u=a*f,v=l*c,x=l*d,y=l*f,A=i.x,w=i.y,T=i.z;return r[0]=(1-(_+u))*A,r[1]=(p+y)*A,r[2]=(g-x)*A,r[3]=0,r[4]=(p-y)*w,r[5]=(1-(h+u))*w,r[6]=(m+v)*w,r[7]=0,r[8]=(g+x)*T,r[9]=(m-v)*T,r[10]=(1-(h+_))*T,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,n,i){const r=this.elements;let s=vs.set(r[0],r[1],r[2]).length();const o=vs.set(r[4],r[5],r[6]).length(),a=vs.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],ci.copy(this);const c=1/s,d=1/o,f=1/a;return ci.elements[0]*=c,ci.elements[1]*=c,ci.elements[2]*=c,ci.elements[4]*=d,ci.elements[5]*=d,ci.elements[6]*=d,ci.elements[8]*=f,ci.elements[9]*=f,ci.elements[10]*=f,n.setFromRotationMatrix(ci),i.x=s,i.y=o,i.z=a,this}makePerspective(e,n,i,r,s,o,a=Gi){const l=this.elements,c=2*s/(n-e),d=2*s/(i-r),f=(n+e)/(n-e),h=(i+r)/(i-r);let p,g;if(a===Gi)p=-(o+s)/(o-s),g=-2*o*s/(o-s);else if(a===Mc)p=-o/(o-s),g=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=d,l[9]=h,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,n,i,r,s,o,a=Gi){const l=this.elements,c=1/(n-e),d=1/(i-r),f=1/(o-s),h=(n+e)*c,p=(i+r)*d;let g,_;if(a===Gi)g=(o+s)*f,_=-2*f;else if(a===Mc)g=s*f,_=-1*f;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-h,l[1]=0,l[5]=2*d,l[9]=0,l[13]=-p,l[2]=0,l[6]=0,l[10]=_,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const n=this.elements,i=e.elements;for(let r=0;r<16;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<16;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e[n+9]=i[9],e[n+10]=i[10],e[n+11]=i[11],e[n+12]=i[12],e[n+13]=i[13],e[n+14]=i[14],e[n+15]=i[15],e}}const vs=new N,ci=new Ht,jE=new N(0,0,0),XE=new N(1,1,1),tr=new N,sl=new N,zn=new N,Dm=new Ht,Im=new rs;class Kc{constructor(e=0,n=0,i=0,r=Kc.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=n,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,n,i,r=this._order){return this._x=e,this._y=n,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,n=this._order,i=!0){const r=e.elements,s=r[0],o=r[4],a=r[8],l=r[1],c=r[5],d=r[9],f=r[2],h=r[6],p=r[10];switch(n){case"XYZ":this._y=Math.asin(dn(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-d,p),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-dn(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-f,s),this._z=0);break;case"ZXY":this._x=Math.asin(dn(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-f,p),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-dn(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(h,p),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(dn(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-d,c),this._y=Math.atan2(-f,s)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-dn(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-d,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,n,i){return Dm.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Dm,n,i)}setFromVector3(e,n=this._order){return this.set(e.x,e.y,e.z,n)}reorder(e){return Im.setFromEuler(this),this.setFromQuaternion(Im,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Kc.DEFAULT_ORDER="XYZ";let Mh=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},$E=0;const Um=new N,_s=new rs,Ni=new Ht,ol=new N,No=new N,YE=new N,qE=new rs,Om=new N(1,0,0),Fm=new N(0,1,0),km=new N(0,0,1),ZE={type:"added"},KE={type:"removed"};class an extends cs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:$E++}),this.uuid=Wi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=an.DEFAULT_UP.clone();const e=new N,n=new Kc,i=new rs,r=new N(1,1,1);function s(){i.setFromEuler(n,!1)}function o(){n.setFromQuaternion(i,void 0,!1)}n._onChange(s),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Ht},normalMatrix:{value:new lt}}),this.matrix=new Ht,this.matrixWorld=new Ht,this.matrixAutoUpdate=an.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=an.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Mh,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,n){this.quaternion.setFromAxisAngle(e,n)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,n){return _s.setFromAxisAngle(e,n),this.quaternion.multiply(_s),this}rotateOnWorldAxis(e,n){return _s.setFromAxisAngle(e,n),this.quaternion.premultiply(_s),this}rotateX(e){return this.rotateOnAxis(Om,e)}rotateY(e){return this.rotateOnAxis(Fm,e)}rotateZ(e){return this.rotateOnAxis(km,e)}translateOnAxis(e,n){return Um.copy(e).applyQuaternion(this.quaternion),this.position.add(Um.multiplyScalar(n)),this}translateX(e){return this.translateOnAxis(Om,e)}translateY(e){return this.translateOnAxis(Fm,e)}translateZ(e){return this.translateOnAxis(km,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Ni.copy(this.matrixWorld).invert())}lookAt(e,n,i){e.isVector3?ol.copy(e):ol.set(e,n,i);const r=this.parent;this.updateWorldMatrix(!0,!1),No.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ni.lookAt(No,ol,this.up):Ni.lookAt(ol,No,this.up),this.quaternion.setFromRotationMatrix(Ni),r&&(Ni.extractRotation(r.matrixWorld),_s.setFromRotationMatrix(Ni),this.quaternion.premultiply(_s.invert()))}add(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(ZE)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const n=this.children.indexOf(e);return n!==-1&&(e.parent=null,this.children.splice(n,1),e.dispatchEvent(KE)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Ni.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Ni.multiply(e.parent.matrixWorld)),e.applyMatrix4(Ni),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,n){if(this[e]===n)return this;for(let i=0,r=this.children.length;i<r;i++){const o=this.children[i].getObjectByProperty(e,n);if(o!==void 0)return o}}getObjectsByProperty(e,n,i=[]){this[e]===n&&i.push(this);const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(e,n,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(No,e,YE),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(No,qE,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return e.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(e){e(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverseVisible(e)}traverseAncestors(e){const n=this.parent;n!==null&&(e(n),n.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const n=this.children;for(let i=0,r=n.length;i<r;i++){const s=n[i];(s.matrixWorldAutoUpdate===!0||e===!0)&&s.updateMatrixWorld(e)}}updateWorldMatrix(e,n){const i=this.parent;if(e===!0&&i!==null&&i.matrixWorldAutoUpdate===!0&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),n===!0){const r=this.children;for(let s=0,o=r.length;s<o;s++){const a=r[s];a.matrixWorldAutoUpdate===!0&&a.updateWorldMatrix(!1,!0)}}}toJSON(e){const n=e===void 0||typeof e=="string",i={};n&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),r.maxGeometryCount=this._maxGeometryCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,d=l.length;c<d;c++){const f=l[c];s(e.shapes,f)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(e.materials,this.material[l]));r.material=a}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];r.animations.push(s(e.animations,l))}}if(n){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),d=o(e.images),f=o(e.shapes),h=o(e.skeletons),p=o(e.animations),g=o(e.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),d.length>0&&(i.images=d),f.length>0&&(i.shapes=f),h.length>0&&(i.skeletons=h),p.length>0&&(i.animations=p),g.length>0&&(i.nodes=g)}return i.object=r,i;function o(a){const l=[];for(const c in a){const d=a[c];delete d.metadata,l.push(d)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,n=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),n===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}an.DEFAULT_UP=new N(0,1,0);an.DEFAULT_MATRIX_AUTO_UPDATE=!0;an.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const ui=new N,Di=new N,Vu=new N,Ii=new N,ys=new N,Ss=new N,zm=new N,Wu=new N,ju=new N,Xu=new N;let al=!1;class Vn{constructor(e=new N,n=new N,i=new N){this.a=e,this.b=n,this.c=i}static getNormal(e,n,i,r){r.subVectors(i,n),ui.subVectors(e,n),r.cross(ui);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,n,i,r,s){ui.subVectors(r,n),Di.subVectors(i,n),Vu.subVectors(e,n);const o=ui.dot(ui),a=ui.dot(Di),l=ui.dot(Vu),c=Di.dot(Di),d=Di.dot(Vu),f=o*c-a*a;if(f===0)return s.set(0,0,0),null;const h=1/f,p=(c*l-a*d)*h,g=(o*d-a*l)*h;return s.set(1-p-g,g,p)}static containsPoint(e,n,i,r){return this.getBarycoord(e,n,i,r,Ii)===null?!1:Ii.x>=0&&Ii.y>=0&&Ii.x+Ii.y<=1}static getUV(e,n,i,r,s,o,a,l){return al===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),al=!0),this.getInterpolation(e,n,i,r,s,o,a,l)}static getInterpolation(e,n,i,r,s,o,a,l){return this.getBarycoord(e,n,i,r,Ii)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Ii.x),l.addScaledVector(o,Ii.y),l.addScaledVector(a,Ii.z),l)}static isFrontFacing(e,n,i,r){return ui.subVectors(i,n),Di.subVectors(e,n),ui.cross(Di).dot(r)<0}set(e,n,i){return this.a.copy(e),this.b.copy(n),this.c.copy(i),this}setFromPointsAndIndices(e,n,i,r){return this.a.copy(e[n]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,n,i,r){return this.a.fromBufferAttribute(e,n),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return ui.subVectors(this.c,this.b),Di.subVectors(this.a,this.b),ui.cross(Di).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Vn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,n){return Vn.getBarycoord(e,this.a,this.b,this.c,n)}getUV(e,n,i,r,s){return al===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),al=!0),Vn.getInterpolation(e,this.a,this.b,this.c,n,i,r,s)}getInterpolation(e,n,i,r,s){return Vn.getInterpolation(e,this.a,this.b,this.c,n,i,r,s)}containsPoint(e){return Vn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Vn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,n){const i=this.a,r=this.b,s=this.c;let o,a;ys.subVectors(r,i),Ss.subVectors(s,i),Wu.subVectors(e,i);const l=ys.dot(Wu),c=Ss.dot(Wu);if(l<=0&&c<=0)return n.copy(i);ju.subVectors(e,r);const d=ys.dot(ju),f=Ss.dot(ju);if(d>=0&&f<=d)return n.copy(r);const h=l*f-d*c;if(h<=0&&l>=0&&d<=0)return o=l/(l-d),n.copy(i).addScaledVector(ys,o);Xu.subVectors(e,s);const p=ys.dot(Xu),g=Ss.dot(Xu);if(g>=0&&p<=g)return n.copy(s);const _=p*c-l*g;if(_<=0&&c>=0&&g<=0)return a=c/(c-g),n.copy(i).addScaledVector(Ss,a);const m=d*g-p*f;if(m<=0&&f-d>=0&&p-g>=0)return zm.subVectors(s,r),a=(f-d)/(f-d+(p-g)),n.copy(r).addScaledVector(zm,a);const u=1/(m+_+h);return o=_*u,a=h*u,n.copy(i).addScaledVector(ys,o).addScaledVector(Ss,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const mv={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},nr={h:0,s:0,l:0},ll={h:0,s:0,l:0};function $u(t,e,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?t+(e-t)*6*n:n<1/2?e:n<2/3?t+(e-t)*6*(2/3-n):t}class ot{constructor(e,n,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,n,i)}set(e,n,i){if(n===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,n,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,n=un){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Mt.toWorkingColorSpace(this,n),this}setRGB(e,n,i,r=Mt.workingColorSpace){return this.r=e,this.g=n,this.b=i,Mt.toWorkingColorSpace(this,r),this}setHSL(e,n,i,r=Mt.workingColorSpace){if(e=OE(e,1),n=dn(n,0,1),i=dn(i,0,1),n===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+n):i+n-i*n,o=2*i-s;this.r=$u(o,s,e+1/3),this.g=$u(o,s,e),this.b=$u(o,s,e-1/3)}return Mt.toWorkingColorSpace(this,r),this}setStyle(e,n=un){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,n);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,n);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,n);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,n);if(o===6)return this.setHex(parseInt(s,16),n);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,n);return this}setColorName(e,n=un){const i=mv[e.toLowerCase()];return i!==void 0?this.setHex(i,n):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=io(e.r),this.g=io(e.g),this.b=io(e.b),this}copyLinearToSRGB(e){return this.r=Uu(e.r),this.g=Uu(e.g),this.b=Uu(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=un){return Mt.fromWorkingColorSpace(vn.copy(this),e),Math.round(dn(vn.r*255,0,255))*65536+Math.round(dn(vn.g*255,0,255))*256+Math.round(dn(vn.b*255,0,255))}getHexString(e=un){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,n=Mt.workingColorSpace){Mt.fromWorkingColorSpace(vn.copy(this),n);const i=vn.r,r=vn.g,s=vn.b,o=Math.max(i,r,s),a=Math.min(i,r,s);let l,c;const d=(a+o)/2;if(a===o)l=0,c=0;else{const f=o-a;switch(c=d<=.5?f/(o+a):f/(2-o-a),o){case i:l=(r-s)/f+(r<s?6:0);break;case r:l=(s-i)/f+2;break;case s:l=(i-r)/f+4;break}l/=6}return e.h=l,e.s=c,e.l=d,e}getRGB(e,n=Mt.workingColorSpace){return Mt.fromWorkingColorSpace(vn.copy(this),n),e.r=vn.r,e.g=vn.g,e.b=vn.b,e}getStyle(e=un){Mt.fromWorkingColorSpace(vn.copy(this),e);const n=vn.r,i=vn.g,r=vn.b;return e!==un?`color(${e} ${n.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,n,i){return this.getHSL(nr),this.setHSL(nr.h+e,nr.s+n,nr.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,n){return this.r=e.r+n.r,this.g=e.g+n.g,this.b=e.b+n.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,n){return this.r+=(e.r-this.r)*n,this.g+=(e.g-this.g)*n,this.b+=(e.b-this.b)*n,this}lerpColors(e,n,i){return this.r=e.r+(n.r-e.r)*i,this.g=e.g+(n.g-e.g)*i,this.b=e.b+(n.b-e.b)*i,this}lerpHSL(e,n){this.getHSL(nr),e.getHSL(ll);const i=Du(nr.h,ll.h,n),r=Du(nr.s,ll.s,n),s=Du(nr.l,ll.l,n);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const n=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*n+s[3]*i+s[6]*r,this.g=s[1]*n+s[4]*i+s[7]*r,this.b=s[2]*n+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,n=0){return this.r=e[n],this.g=e[n+1],this.b=e[n+2],this}toArray(e=[],n=0){return e[n]=this.r,e[n+1]=this.g,e[n+2]=this.b,e}fromBufferAttribute(e,n){return this.r=e.getX(n),this.g=e.getY(n),this.b=e.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const vn=new ot;ot.NAMES=mv;let JE=0;class us extends cs{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:JE++}),this.uuid=Wi(),this.name="",this.type="Material",this.blending=no,this.side=Cr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=cf,this.blendDst=uf,this.blendEquation=Hr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ot(0,0,0),this.blendAlpha=0,this.depthFunc=_c,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=bm,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=hs,this.stencilZFail=hs,this.stencilZPass=hs,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const n in e){const i=e[n];if(i===void 0){console.warn(`THREE.Material: parameter '${n}' has value of undefined.`);continue}const r=this[n];if(r===void 0){console.warn(`THREE.Material: '${n}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[n]=i}}toJSON(e){const n=e===void 0||typeof e=="string";n&&(e={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==no&&(i.blending=this.blending),this.side!==Cr&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==cf&&(i.blendSrc=this.blendSrc),this.blendDst!==uf&&(i.blendDst=this.blendDst),this.blendEquation!==Hr&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==_c&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==bm&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==hs&&(i.stencilFail=this.stencilFail),this.stencilZFail!==hs&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==hs&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(n){const s=r(e.textures),o=r(e.images);s.length>0&&(i.textures=s),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const n=e.clippingPlanes;let i=null;if(n!==null){const r=n.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=n[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class $t extends us{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ot(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Qx,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const jt=new N,cl=new Ae;class vi{constructor(e,n,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=n,this.count=e!==void 0?e.length/n:0,this.normalized=i,this.usage=pf,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=hr,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,n,i){e*=this.itemSize,i*=n.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=n.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let n=0,i=this.count;n<i;n++)cl.fromBufferAttribute(this,n),cl.applyMatrix3(e),this.setXY(n,cl.x,cl.y);else if(this.itemSize===3)for(let n=0,i=this.count;n<i;n++)jt.fromBufferAttribute(this,n),jt.applyMatrix3(e),this.setXYZ(n,jt.x,jt.y,jt.z);return this}applyMatrix4(e){for(let n=0,i=this.count;n<i;n++)jt.fromBufferAttribute(this,n),jt.applyMatrix4(e),this.setXYZ(n,jt.x,jt.y,jt.z);return this}applyNormalMatrix(e){for(let n=0,i=this.count;n<i;n++)jt.fromBufferAttribute(this,n),jt.applyNormalMatrix(e),this.setXYZ(n,jt.x,jt.y,jt.z);return this}transformDirection(e){for(let n=0,i=this.count;n<i;n++)jt.fromBufferAttribute(this,n),jt.transformDirection(e),this.setXYZ(n,jt.x,jt.y,jt.z);return this}set(e,n=0){return this.array.set(e,n),this}getComponent(e,n){let i=this.array[e*this.itemSize+n];return this.normalized&&(i=ki(i,this.array)),i}setComponent(e,n,i){return this.normalized&&(i=wt(i,this.array)),this.array[e*this.itemSize+n]=i,this}getX(e){let n=this.array[e*this.itemSize];return this.normalized&&(n=ki(n,this.array)),n}setX(e,n){return this.normalized&&(n=wt(n,this.array)),this.array[e*this.itemSize]=n,this}getY(e){let n=this.array[e*this.itemSize+1];return this.normalized&&(n=ki(n,this.array)),n}setY(e,n){return this.normalized&&(n=wt(n,this.array)),this.array[e*this.itemSize+1]=n,this}getZ(e){let n=this.array[e*this.itemSize+2];return this.normalized&&(n=ki(n,this.array)),n}setZ(e,n){return this.normalized&&(n=wt(n,this.array)),this.array[e*this.itemSize+2]=n,this}getW(e){let n=this.array[e*this.itemSize+3];return this.normalized&&(n=ki(n,this.array)),n}setW(e,n){return this.normalized&&(n=wt(n,this.array)),this.array[e*this.itemSize+3]=n,this}setXY(e,n,i){return e*=this.itemSize,this.normalized&&(n=wt(n,this.array),i=wt(i,this.array)),this.array[e+0]=n,this.array[e+1]=i,this}setXYZ(e,n,i,r){return e*=this.itemSize,this.normalized&&(n=wt(n,this.array),i=wt(i,this.array),r=wt(r,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,n,i,r,s){return e*=this.itemSize,this.normalized&&(n=wt(n,this.array),i=wt(i,this.array),r=wt(r,this.array),s=wt(s,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==pf&&(e.usage=this.usage),e}}class gv extends vi{constructor(e,n,i){super(new Uint16Array(e),n,i)}}class xv extends vi{constructor(e,n,i){super(new Uint32Array(e),n,i)}}class Tt extends vi{constructor(e,n,i){super(new Float32Array(e),n,i)}}let QE=0;const Zn=new Ht,Yu=new an,Es=new N,Bn=new Na,Do=new Na,en=new N;class It extends cs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:QE++}),this.uuid=Wi(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(dv(e)?xv:gv)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,n){return this.attributes[e]=n,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,n,i=0){this.groups.push({start:e,count:n,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,n){this.drawRange.start=e,this.drawRange.count=n}applyMatrix4(e){const n=this.attributes.position;n!==void 0&&(n.applyMatrix4(e),n.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new lt().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Zn.makeRotationFromQuaternion(e),this.applyMatrix4(Zn),this}rotateX(e){return Zn.makeRotationX(e),this.applyMatrix4(Zn),this}rotateY(e){return Zn.makeRotationY(e),this.applyMatrix4(Zn),this}rotateZ(e){return Zn.makeRotationZ(e),this.applyMatrix4(Zn),this}translate(e,n,i){return Zn.makeTranslation(e,n,i),this.applyMatrix4(Zn),this}scale(e,n,i){return Zn.makeScale(e,n,i),this.applyMatrix4(Zn),this}lookAt(e){return Yu.lookAt(e),Yu.updateMatrix(),this.applyMatrix4(Yu.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Es).negate(),this.translate(Es.x,Es.y,Es.z),this}setFromPoints(e){const n=[];for(let i=0,r=e.length;i<r;i++){const s=e[i];n.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new Tt(n,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Na);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new N(-1/0,-1/0,-1/0),new N(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),n)for(let i=0,r=n.length;i<r;i++){const s=n[i];Bn.setFromBufferAttribute(s),this.morphTargetsRelative?(en.addVectors(this.boundingBox.min,Bn.min),this.boundingBox.expandByPoint(en),en.addVectors(this.boundingBox.max,Bn.max),this.boundingBox.expandByPoint(en)):(this.boundingBox.expandByPoint(Bn.min),this.boundingBox.expandByPoint(Bn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new qc);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new N,1/0);return}if(e){const i=this.boundingSphere.center;if(Bn.setFromBufferAttribute(e),n)for(let s=0,o=n.length;s<o;s++){const a=n[s];Do.setFromBufferAttribute(a),this.morphTargetsRelative?(en.addVectors(Bn.min,Do.min),Bn.expandByPoint(en),en.addVectors(Bn.max,Do.max),Bn.expandByPoint(en)):(Bn.expandByPoint(Do.min),Bn.expandByPoint(Do.max))}Bn.getCenter(i);let r=0;for(let s=0,o=e.count;s<o;s++)en.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(en));if(n)for(let s=0,o=n.length;s<o;s++){const a=n[s],l=this.morphTargetsRelative;for(let c=0,d=a.count;c<d;c++)en.fromBufferAttribute(a,c),l&&(Es.fromBufferAttribute(e,c),en.add(Es)),r=Math.max(r,i.distanceToSquared(en))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,n=this.attributes;if(e===null||n.position===void 0||n.normal===void 0||n.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.array,r=n.position.array,s=n.normal.array,o=n.uv.array,a=r.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new vi(new Float32Array(4*a),4));const l=this.getAttribute("tangent").array,c=[],d=[];for(let b=0;b<a;b++)c[b]=new N,d[b]=new N;const f=new N,h=new N,p=new N,g=new Ae,_=new Ae,m=new Ae,u=new N,v=new N;function x(b,V,X){f.fromArray(r,b*3),h.fromArray(r,V*3),p.fromArray(r,X*3),g.fromArray(o,b*2),_.fromArray(o,V*2),m.fromArray(o,X*2),h.sub(f),p.sub(f),_.sub(g),m.sub(g);const pe=1/(_.x*m.y-m.x*_.y);isFinite(pe)&&(u.copy(h).multiplyScalar(m.y).addScaledVector(p,-_.y).multiplyScalar(pe),v.copy(p).multiplyScalar(_.x).addScaledVector(h,-m.x).multiplyScalar(pe),c[b].add(u),c[V].add(u),c[X].add(u),d[b].add(v),d[V].add(v),d[X].add(v))}let y=this.groups;y.length===0&&(y=[{start:0,count:i.length}]);for(let b=0,V=y.length;b<V;++b){const X=y[b],pe=X.start,F=X.count;for(let W=pe,te=pe+F;W<te;W+=3)x(i[W+0],i[W+1],i[W+2])}const A=new N,w=new N,T=new N,z=new N;function E(b){T.fromArray(s,b*3),z.copy(T);const V=c[b];A.copy(V),A.sub(T.multiplyScalar(T.dot(V))).normalize(),w.crossVectors(z,V);const pe=w.dot(d[b])<0?-1:1;l[b*4]=A.x,l[b*4+1]=A.y,l[b*4+2]=A.z,l[b*4+3]=pe}for(let b=0,V=y.length;b<V;++b){const X=y[b],pe=X.start,F=X.count;for(let W=pe,te=pe+F;W<te;W+=3)E(i[W+0]),E(i[W+1]),E(i[W+2])}}computeVertexNormals(){const e=this.index,n=this.getAttribute("position");if(n!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new vi(new Float32Array(n.count*3),3),this.setAttribute("normal",i);else for(let h=0,p=i.count;h<p;h++)i.setXYZ(h,0,0,0);const r=new N,s=new N,o=new N,a=new N,l=new N,c=new N,d=new N,f=new N;if(e)for(let h=0,p=e.count;h<p;h+=3){const g=e.getX(h+0),_=e.getX(h+1),m=e.getX(h+2);r.fromBufferAttribute(n,g),s.fromBufferAttribute(n,_),o.fromBufferAttribute(n,m),d.subVectors(o,s),f.subVectors(r,s),d.cross(f),a.fromBufferAttribute(i,g),l.fromBufferAttribute(i,_),c.fromBufferAttribute(i,m),a.add(d),l.add(d),c.add(d),i.setXYZ(g,a.x,a.y,a.z),i.setXYZ(_,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let h=0,p=n.count;h<p;h+=3)r.fromBufferAttribute(n,h+0),s.fromBufferAttribute(n,h+1),o.fromBufferAttribute(n,h+2),d.subVectors(o,s),f.subVectors(r,s),d.cross(f),i.setXYZ(h+0,d.x,d.y,d.z),i.setXYZ(h+1,d.x,d.y,d.z),i.setXYZ(h+2,d.x,d.y,d.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let n=0,i=e.count;n<i;n++)en.fromBufferAttribute(e,n),en.normalize(),e.setXYZ(n,en.x,en.y,en.z)}toNonIndexed(){function e(a,l){const c=a.array,d=a.itemSize,f=a.normalized,h=new c.constructor(l.length*d);let p=0,g=0;for(let _=0,m=l.length;_<m;_++){a.isInterleavedBufferAttribute?p=l[_]*a.data.stride+a.offset:p=l[_]*d;for(let u=0;u<d;u++)h[g++]=c[p++]}return new vi(h,d,f)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const n=new It,i=this.index.array,r=this.attributes;for(const a in r){const l=r[a],c=e(l,i);n.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let d=0,f=c.length;d<f;d++){const h=c[d],p=e(h,i);l.push(p)}n.morphAttributes[a]=l}n.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];n.addGroup(c.start,c.count,c.materialIndex)}return n}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const n=this.index;n!==null&&(e.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],d=[];for(let f=0,h=c.length;f<h;f++){const p=c[f];d.push(p.toJSON(e.data))}d.length>0&&(r[l]=d,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const n={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone(n));const r=e.attributes;for(const c in r){const d=r[c];this.setAttribute(c,d.clone(n))}const s=e.morphAttributes;for(const c in s){const d=[],f=s[c];for(let h=0,p=f.length;h<p;h++)d.push(f[h].clone(n));this.morphAttributes[c]=d}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,d=o.length;c<d;c++){const f=o[c];this.addGroup(f.start,f.count,f.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Bm=new Ht,Ur=new Zc,ul=new qc,Hm=new N,Ms=new N,ws=new N,Ts=new N,qu=new N,dl=new N,fl=new Ae,hl=new Ae,pl=new Ae,Gm=new N,Vm=new N,Wm=new N,ml=new N,gl=new N;class _t extends an{constructor(e=new It,n=new $t){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=n,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,n){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,o=i.morphTargetsRelative;n.fromBufferAttribute(r,e);const a=this.morphTargetInfluences;if(s&&a){dl.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const d=a[l],f=s[l];d!==0&&(qu.fromBufferAttribute(f,e),o?dl.addScaledVector(qu,d):dl.addScaledVector(qu.sub(n),d))}n.add(dl)}return n}raycast(e,n){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),ul.copy(i.boundingSphere),ul.applyMatrix4(s),Ur.copy(e.ray).recast(e.near),!(ul.containsPoint(Ur.origin)===!1&&(Ur.intersectSphere(ul,Hm)===null||Ur.origin.distanceToSquared(Hm)>(e.far-e.near)**2))&&(Bm.copy(s).invert(),Ur.copy(e.ray).applyMatrix4(Bm),!(i.boundingBox!==null&&Ur.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,n,Ur)))}_computeIntersections(e,n,i){let r;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,d=s.attributes.uv1,f=s.attributes.normal,h=s.groups,p=s.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=h.length;g<_;g++){const m=h[g],u=o[m.materialIndex],v=Math.max(m.start,p.start),x=Math.min(a.count,Math.min(m.start+m.count,p.start+p.count));for(let y=v,A=x;y<A;y+=3){const w=a.getX(y),T=a.getX(y+1),z=a.getX(y+2);r=xl(this,u,e,i,c,d,f,w,T,z),r&&(r.faceIndex=Math.floor(y/3),r.face.materialIndex=m.materialIndex,n.push(r))}}else{const g=Math.max(0,p.start),_=Math.min(a.count,p.start+p.count);for(let m=g,u=_;m<u;m+=3){const v=a.getX(m),x=a.getX(m+1),y=a.getX(m+2);r=xl(this,o,e,i,c,d,f,v,x,y),r&&(r.faceIndex=Math.floor(m/3),n.push(r))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,_=h.length;g<_;g++){const m=h[g],u=o[m.materialIndex],v=Math.max(m.start,p.start),x=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let y=v,A=x;y<A;y+=3){const w=y,T=y+1,z=y+2;r=xl(this,u,e,i,c,d,f,w,T,z),r&&(r.faceIndex=Math.floor(y/3),r.face.materialIndex=m.materialIndex,n.push(r))}}else{const g=Math.max(0,p.start),_=Math.min(l.count,p.start+p.count);for(let m=g,u=_;m<u;m+=3){const v=m,x=m+1,y=m+2;r=xl(this,o,e,i,c,d,f,v,x,y),r&&(r.faceIndex=Math.floor(m/3),n.push(r))}}}}function e1(t,e,n,i,r,s,o,a){let l;if(e.side===On?l=i.intersectTriangle(o,s,r,!0,a):l=i.intersectTriangle(r,s,o,e.side===Cr,a),l===null)return null;gl.copy(a),gl.applyMatrix4(t.matrixWorld);const c=n.ray.origin.distanceTo(gl);return c<n.near||c>n.far?null:{distance:c,point:gl.clone(),object:t}}function xl(t,e,n,i,r,s,o,a,l,c){t.getVertexPosition(a,Ms),t.getVertexPosition(l,ws),t.getVertexPosition(c,Ts);const d=e1(t,e,n,i,Ms,ws,Ts,ml);if(d){r&&(fl.fromBufferAttribute(r,a),hl.fromBufferAttribute(r,l),pl.fromBufferAttribute(r,c),d.uv=Vn.getInterpolation(ml,Ms,ws,Ts,fl,hl,pl,new Ae)),s&&(fl.fromBufferAttribute(s,a),hl.fromBufferAttribute(s,l),pl.fromBufferAttribute(s,c),d.uv1=Vn.getInterpolation(ml,Ms,ws,Ts,fl,hl,pl,new Ae),d.uv2=d.uv1),o&&(Gm.fromBufferAttribute(o,a),Vm.fromBufferAttribute(o,l),Wm.fromBufferAttribute(o,c),d.normal=Vn.getInterpolation(ml,Ms,ws,Ts,Gm,Vm,Wm,new N),d.normal.dot(i.direction)>0&&d.normal.multiplyScalar(-1));const f={a,b:l,c,normal:new N,materialIndex:0};Vn.getNormal(Ms,ws,Ts,f.normal),d.face=f}return d}class Tr extends It{constructor(e=1,n=1,i=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:n,depth:i,widthSegments:r,heightSegments:s,depthSegments:o};const a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);const l=[],c=[],d=[],f=[];let h=0,p=0;g("z","y","x",-1,-1,i,n,e,o,s,0),g("z","y","x",1,-1,i,n,-e,o,s,1),g("x","z","y",1,1,e,i,n,r,o,2),g("x","z","y",1,-1,e,i,-n,r,o,3),g("x","y","z",1,-1,e,n,i,r,s,4),g("x","y","z",-1,-1,e,n,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new Tt(c,3)),this.setAttribute("normal",new Tt(d,3)),this.setAttribute("uv",new Tt(f,2));function g(_,m,u,v,x,y,A,w,T,z,E){const b=y/T,V=A/z,X=y/2,pe=A/2,F=w/2,W=T+1,te=z+1;let K=0,U=0;const J=new N;for(let O=0;O<te;O++){const le=O*V-pe;for(let ce=0;ce<W;ce++){const Q=ce*b-X;J[_]=Q*v,J[m]=le*x,J[u]=F,c.push(J.x,J.y,J.z),J[_]=0,J[m]=0,J[u]=w>0?1:-1,d.push(J.x,J.y,J.z),f.push(ce/T),f.push(1-O/z),K+=1}}for(let O=0;O<z;O++)for(let le=0;le<T;le++){const ce=h+le+W*O,Q=h+le+W*(O+1),de=h+(le+1)+W*(O+1),ye=h+(le+1)+W*O;l.push(ce,Q,ye),l.push(Q,de,ye),U+=6}a.addGroup(p,U,E),p+=U,h+=K}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Tr(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function go(t){const e={};for(const n in t){e[n]={};for(const i in t[n]){const r=t[n][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[n][i]=null):e[n][i]=r.clone():Array.isArray(r)?e[n][i]=r.slice():e[n][i]=r}}return e}function En(t){const e={};for(let n=0;n<t.length;n++){const i=go(t[n]);for(const r in i)e[r]=i[r]}return e}function t1(t){const e=[];for(let n=0;n<t.length;n++)e.push(t[n].clone());return e}function vv(t){return t.getRenderTarget()===null?t.outputColorSpace:Mt.workingColorSpace}const n1={clone:go,merge:En};var i1=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,r1=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class ss extends us{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=i1,this.fragmentShader=r1,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=go(e.uniforms),this.uniformsGroups=t1(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const n=super.toJSON(e);n.glslVersion=this.glslVersion,n.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?n.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?n.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?n.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?n.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?n.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?n.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?n.uniforms[r]={type:"m4",value:o.toArray()}:n.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(n.extensions=i),n}}let _v=class extends an{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ht,this.projectionMatrix=new Ht,this.projectionMatrixInverse=new Ht,this.coordinateSystem=Gi}copy(e,n){return super.copy(e,n),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,n){super.updateWorldMatrix(e,n),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}};class ti extends _v{constructor(e=50,n=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const n=.5*this.getFilmHeight()/e;this.fov=gf*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Qo*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return gf*2*Math.atan(Math.tan(Qo*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,n,i,r,s,o){this.aspect=e/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let n=e*Math.tan(Qo*.5*this.fov)/this.zoom,i=2*n,r=this.aspect*i,s=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*r/l,n-=o.offsetY*i/c,r*=o.width/l,i*=o.height/c}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,n,n-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}}const bs=-90,As=1;class s1 extends an{constructor(e,n,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new ti(bs,As,e,n);r.layers=this.layers,this.add(r);const s=new ti(bs,As,e,n);s.layers=this.layers,this.add(s);const o=new ti(bs,As,e,n);o.layers=this.layers,this.add(o);const a=new ti(bs,As,e,n);a.layers=this.layers,this.add(a);const l=new ti(bs,As,e,n);l.layers=this.layers,this.add(l);const c=new ti(bs,As,e,n);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,n=this.children.concat(),[i,r,s,o,a,l]=n;for(const c of n)this.remove(c);if(e===Gi)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Mc)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of n)this.add(c),c.updateMatrixWorld()}update(e,n){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,c,d]=this.children,f=e.getRenderTarget(),h=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,r),e.render(n,s),e.setRenderTarget(i,1,r),e.render(n,o),e.setRenderTarget(i,2,r),e.render(n,a),e.setRenderTarget(i,3,r),e.render(n,l),e.setRenderTarget(i,4,r),e.render(n,c),i.texture.generateMipmaps=_,e.setRenderTarget(i,5,r),e.render(n,d),e.setRenderTarget(f,h,p),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class yv extends Fn{constructor(e,n,i,r,s,o,a,l,c,d){e=e!==void 0?e:[],n=n!==void 0?n:ho,super(e,n,i,r,s,o,a,l,c,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class o1 extends is{constructor(e=1,n={}){super(e,e,n),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];n.encoding!==void 0&&(ea("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),n.colorSpace=n.encoding===Kr?un:ni),this.texture=new yv(r,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=n.generateMipmaps!==void 0?n.generateMipmaps:!1,this.texture.minFilter=n.minFilter!==void 0?n.minFilter:ei}fromEquirectangularTexture(e,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Tr(5,5,5),s=new ss({name:"CubemapFromEquirect",uniforms:go(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:On,blending:Er});s.uniforms.tEquirect.value=n;const o=new _t(r,s),a=n.minFilter;return n.minFilter===Ea&&(n.minFilter=ei),new s1(1,10,this).update(e,o),n.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,n,i,r){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(n,i,r);e.setRenderTarget(s)}}const Zu=new N,a1=new N,l1=new lt;class or{constructor(e=new N(1,0,0),n=0){this.isPlane=!0,this.normal=e,this.constant=n}set(e,n){return this.normal.copy(e),this.constant=n,this}setComponents(e,n,i,r){return this.normal.set(e,n,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,n){return this.normal.copy(e),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(e,n,i){const r=Zu.subVectors(i,n).cross(a1.subVectors(e,n)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,n){return n.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,n){const i=e.delta(Zu),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?n.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:n.copy(e.start).addScaledVector(i,s)}intersectsLine(e){const n=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return n<0&&i>0||i<0&&n>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,n){const i=n||l1.getNormalMatrix(e),r=this.coplanarPoint(Zu).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Or=new qc,vl=new N;class wh{constructor(e=new or,n=new or,i=new or,r=new or,s=new or,o=new or){this.planes=[e,n,i,r,s,o]}set(e,n,i,r,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(n),a[2].copy(i),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(e){const n=this.planes;for(let i=0;i<6;i++)n[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,n=Gi){const i=this.planes,r=e.elements,s=r[0],o=r[1],a=r[2],l=r[3],c=r[4],d=r[5],f=r[6],h=r[7],p=r[8],g=r[9],_=r[10],m=r[11],u=r[12],v=r[13],x=r[14],y=r[15];if(i[0].setComponents(l-s,h-c,m-p,y-u).normalize(),i[1].setComponents(l+s,h+c,m+p,y+u).normalize(),i[2].setComponents(l+o,h+d,m+g,y+v).normalize(),i[3].setComponents(l-o,h-d,m-g,y-v).normalize(),i[4].setComponents(l-a,h-f,m-_,y-x).normalize(),n===Gi)i[5].setComponents(l+a,h+f,m+_,y+x).normalize();else if(n===Mc)i[5].setComponents(a,f,_,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Or.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const n=e.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),Or.copy(n.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Or)}intersectsSprite(e){return Or.center.set(0,0,0),Or.radius=.7071067811865476,Or.applyMatrix4(e.matrixWorld),this.intersectsSphere(Or)}intersectsSphere(e){const n=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(n[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const n=this.planes;for(let i=0;i<6;i++){const r=n[i];if(vl.x=r.normal.x>0?e.max.x:e.min.x,vl.y=r.normal.y>0?e.max.y:e.min.y,vl.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(vl)<0)return!1}return!0}containsPoint(e){const n=this.planes;for(let i=0;i<6;i++)if(n[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Sv(){let t=null,e=!1,n=null,i=null;function r(s,o){n(s,o),i=t.requestAnimationFrame(r)}return{start:function(){e!==!0&&n!==null&&(i=t.requestAnimationFrame(r),e=!0)},stop:function(){t.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){n=s},setContext:function(s){t=s}}}function c1(t,e){const n=e.isWebGL2,i=new WeakMap;function r(c,d){const f=c.array,h=c.usage,p=f.byteLength,g=t.createBuffer();t.bindBuffer(d,g),t.bufferData(d,f,h),c.onUploadCallback();let _;if(f instanceof Float32Array)_=t.FLOAT;else if(f instanceof Uint16Array)if(c.isFloat16BufferAttribute)if(n)_=t.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else _=t.UNSIGNED_SHORT;else if(f instanceof Int16Array)_=t.SHORT;else if(f instanceof Uint32Array)_=t.UNSIGNED_INT;else if(f instanceof Int32Array)_=t.INT;else if(f instanceof Int8Array)_=t.BYTE;else if(f instanceof Uint8Array)_=t.UNSIGNED_BYTE;else if(f instanceof Uint8ClampedArray)_=t.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+f);return{buffer:g,type:_,bytesPerElement:f.BYTES_PER_ELEMENT,version:c.version,size:p}}function s(c,d,f){const h=d.array,p=d._updateRange,g=d.updateRanges;if(t.bindBuffer(f,c),p.count===-1&&g.length===0&&t.bufferSubData(f,0,h),g.length!==0){for(let _=0,m=g.length;_<m;_++){const u=g[_];n?t.bufferSubData(f,u.start*h.BYTES_PER_ELEMENT,h,u.start,u.count):t.bufferSubData(f,u.start*h.BYTES_PER_ELEMENT,h.subarray(u.start,u.start+u.count))}d.clearUpdateRanges()}p.count!==-1&&(n?t.bufferSubData(f,p.offset*h.BYTES_PER_ELEMENT,h,p.offset,p.count):t.bufferSubData(f,p.offset*h.BYTES_PER_ELEMENT,h.subarray(p.offset,p.offset+p.count)),p.count=-1),d.onUploadCallback()}function o(c){return c.isInterleavedBufferAttribute&&(c=c.data),i.get(c)}function a(c){c.isInterleavedBufferAttribute&&(c=c.data);const d=i.get(c);d&&(t.deleteBuffer(d.buffer),i.delete(c))}function l(c,d){if(c.isGLBufferAttribute){const h=i.get(c);(!h||h.version<c.version)&&i.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);const f=i.get(c);if(f===void 0)i.set(c,r(c,d));else if(f.version<c.version){if(f.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");s(f.buffer,c,d),f.version=c.version}}return{get:o,remove:a,update:l}}class Th extends It{constructor(e=1,n=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:n,widthSegments:i,heightSegments:r};const s=e/2,o=n/2,a=Math.floor(i),l=Math.floor(r),c=a+1,d=l+1,f=e/a,h=n/l,p=[],g=[],_=[],m=[];for(let u=0;u<d;u++){const v=u*h-o;for(let x=0;x<c;x++){const y=x*f-s;g.push(y,-v,0),_.push(0,0,1),m.push(x/a),m.push(1-u/l)}}for(let u=0;u<l;u++)for(let v=0;v<a;v++){const x=v+c*u,y=v+c*(u+1),A=v+1+c*(u+1),w=v+1+c*u;p.push(x,y,w),p.push(y,A,w)}this.setIndex(p),this.setAttribute("position",new Tt(g,3)),this.setAttribute("normal",new Tt(_,3)),this.setAttribute("uv",new Tt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Th(e.width,e.height,e.widthSegments,e.heightSegments)}}var u1=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,d1=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,f1=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,h1=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,p1=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,m1=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,g1=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,x1=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,v1=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,_1=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,y1=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,S1=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,E1=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,M1=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,w1=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,T1=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,b1=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,A1=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,C1=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,R1=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,L1=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,P1=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,N1=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,D1=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,I1=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,U1=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,O1=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,F1=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,k1=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,z1=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,B1="gl_FragColor = linearToOutputTexel( gl_FragColor );",H1=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,G1=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,V1=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,W1=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,j1=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,X1=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,$1=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Y1=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,q1=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Z1=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,K1=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,J1=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,Q1=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,eM=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,tM=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,nM=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,iM=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,rM=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,sM=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,oM=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,aM=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,lM=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,cM=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,uM=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,dM=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,fM=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,hM=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,pM=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,mM=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,gM=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,xM=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,vM=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,_M=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,yM=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,SM=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,EM=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,MM=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,wM=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,TM=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,bM=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,AM=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,CM=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,RM=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,LM=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,PM=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,NM=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,DM=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,IM=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,UM=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,OM=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,FM=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,kM=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,zM=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,BM=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,HM=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,GM=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,VM=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,WM=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,jM=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,XM=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,$M=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,YM=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,qM=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,ZM=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,KM=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,JM=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,QM=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,ew=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,tw=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,nw=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color *= toneMappingExposure;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	return color;
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,iw=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,rw=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,sw=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,ow=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,aw=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,lw=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const cw=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,uw=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,dw=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,fw=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,hw=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,pw=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,mw=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,gw=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,xw=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,vw=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,_w=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,yw=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Sw=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Ew=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Mw=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,ww=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Tw=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,bw=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Aw=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Cw=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Rw=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Lw=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Pw=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Nw=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Dw=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Iw=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Uw=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Ow=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Fw=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,kw=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,zw=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Bw=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Hw=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Gw=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,st={alphahash_fragment:u1,alphahash_pars_fragment:d1,alphamap_fragment:f1,alphamap_pars_fragment:h1,alphatest_fragment:p1,alphatest_pars_fragment:m1,aomap_fragment:g1,aomap_pars_fragment:x1,batching_pars_vertex:v1,batching_vertex:_1,begin_vertex:y1,beginnormal_vertex:S1,bsdfs:E1,iridescence_fragment:M1,bumpmap_pars_fragment:w1,clipping_planes_fragment:T1,clipping_planes_pars_fragment:b1,clipping_planes_pars_vertex:A1,clipping_planes_vertex:C1,color_fragment:R1,color_pars_fragment:L1,color_pars_vertex:P1,color_vertex:N1,common:D1,cube_uv_reflection_fragment:I1,defaultnormal_vertex:U1,displacementmap_pars_vertex:O1,displacementmap_vertex:F1,emissivemap_fragment:k1,emissivemap_pars_fragment:z1,colorspace_fragment:B1,colorspace_pars_fragment:H1,envmap_fragment:G1,envmap_common_pars_fragment:V1,envmap_pars_fragment:W1,envmap_pars_vertex:j1,envmap_physical_pars_fragment:iM,envmap_vertex:X1,fog_vertex:$1,fog_pars_vertex:Y1,fog_fragment:q1,fog_pars_fragment:Z1,gradientmap_pars_fragment:K1,lightmap_fragment:J1,lightmap_pars_fragment:Q1,lights_lambert_fragment:eM,lights_lambert_pars_fragment:tM,lights_pars_begin:nM,lights_toon_fragment:rM,lights_toon_pars_fragment:sM,lights_phong_fragment:oM,lights_phong_pars_fragment:aM,lights_physical_fragment:lM,lights_physical_pars_fragment:cM,lights_fragment_begin:uM,lights_fragment_maps:dM,lights_fragment_end:fM,logdepthbuf_fragment:hM,logdepthbuf_pars_fragment:pM,logdepthbuf_pars_vertex:mM,logdepthbuf_vertex:gM,map_fragment:xM,map_pars_fragment:vM,map_particle_fragment:_M,map_particle_pars_fragment:yM,metalnessmap_fragment:SM,metalnessmap_pars_fragment:EM,morphcolor_vertex:MM,morphnormal_vertex:wM,morphtarget_pars_vertex:TM,morphtarget_vertex:bM,normal_fragment_begin:AM,normal_fragment_maps:CM,normal_pars_fragment:RM,normal_pars_vertex:LM,normal_vertex:PM,normalmap_pars_fragment:NM,clearcoat_normal_fragment_begin:DM,clearcoat_normal_fragment_maps:IM,clearcoat_pars_fragment:UM,iridescence_pars_fragment:OM,opaque_fragment:FM,packing:kM,premultiplied_alpha_fragment:zM,project_vertex:BM,dithering_fragment:HM,dithering_pars_fragment:GM,roughnessmap_fragment:VM,roughnessmap_pars_fragment:WM,shadowmap_pars_fragment:jM,shadowmap_pars_vertex:XM,shadowmap_vertex:$M,shadowmask_pars_fragment:YM,skinbase_vertex:qM,skinning_pars_vertex:ZM,skinning_vertex:KM,skinnormal_vertex:JM,specularmap_fragment:QM,specularmap_pars_fragment:ew,tonemapping_fragment:tw,tonemapping_pars_fragment:nw,transmission_fragment:iw,transmission_pars_fragment:rw,uv_pars_fragment:sw,uv_pars_vertex:ow,uv_vertex:aw,worldpos_vertex:lw,background_vert:cw,background_frag:uw,backgroundCube_vert:dw,backgroundCube_frag:fw,cube_vert:hw,cube_frag:pw,depth_vert:mw,depth_frag:gw,distanceRGBA_vert:xw,distanceRGBA_frag:vw,equirect_vert:_w,equirect_frag:yw,linedashed_vert:Sw,linedashed_frag:Ew,meshbasic_vert:Mw,meshbasic_frag:ww,meshlambert_vert:Tw,meshlambert_frag:bw,meshmatcap_vert:Aw,meshmatcap_frag:Cw,meshnormal_vert:Rw,meshnormal_frag:Lw,meshphong_vert:Pw,meshphong_frag:Nw,meshphysical_vert:Dw,meshphysical_frag:Iw,meshtoon_vert:Uw,meshtoon_frag:Ow,points_vert:Fw,points_frag:kw,shadow_vert:zw,shadow_frag:Bw,sprite_vert:Hw,sprite_frag:Gw},Ce={common:{diffuse:{value:new ot(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new lt},alphaMap:{value:null},alphaMapTransform:{value:new lt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new lt}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new lt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new lt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new lt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new lt},normalScale:{value:new Ae(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new lt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new lt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new lt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new lt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ot(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ot(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new lt},alphaTest:{value:0},uvTransform:{value:new lt}},sprite:{diffuse:{value:new ot(16777215)},opacity:{value:1},center:{value:new Ae(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new lt},alphaMap:{value:null},alphaMapTransform:{value:new lt},alphaTest:{value:0}}},wi={basic:{uniforms:En([Ce.common,Ce.specularmap,Ce.envmap,Ce.aomap,Ce.lightmap,Ce.fog]),vertexShader:st.meshbasic_vert,fragmentShader:st.meshbasic_frag},lambert:{uniforms:En([Ce.common,Ce.specularmap,Ce.envmap,Ce.aomap,Ce.lightmap,Ce.emissivemap,Ce.bumpmap,Ce.normalmap,Ce.displacementmap,Ce.fog,Ce.lights,{emissive:{value:new ot(0)}}]),vertexShader:st.meshlambert_vert,fragmentShader:st.meshlambert_frag},phong:{uniforms:En([Ce.common,Ce.specularmap,Ce.envmap,Ce.aomap,Ce.lightmap,Ce.emissivemap,Ce.bumpmap,Ce.normalmap,Ce.displacementmap,Ce.fog,Ce.lights,{emissive:{value:new ot(0)},specular:{value:new ot(1118481)},shininess:{value:30}}]),vertexShader:st.meshphong_vert,fragmentShader:st.meshphong_frag},standard:{uniforms:En([Ce.common,Ce.envmap,Ce.aomap,Ce.lightmap,Ce.emissivemap,Ce.bumpmap,Ce.normalmap,Ce.displacementmap,Ce.roughnessmap,Ce.metalnessmap,Ce.fog,Ce.lights,{emissive:{value:new ot(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:st.meshphysical_vert,fragmentShader:st.meshphysical_frag},toon:{uniforms:En([Ce.common,Ce.aomap,Ce.lightmap,Ce.emissivemap,Ce.bumpmap,Ce.normalmap,Ce.displacementmap,Ce.gradientmap,Ce.fog,Ce.lights,{emissive:{value:new ot(0)}}]),vertexShader:st.meshtoon_vert,fragmentShader:st.meshtoon_frag},matcap:{uniforms:En([Ce.common,Ce.bumpmap,Ce.normalmap,Ce.displacementmap,Ce.fog,{matcap:{value:null}}]),vertexShader:st.meshmatcap_vert,fragmentShader:st.meshmatcap_frag},points:{uniforms:En([Ce.points,Ce.fog]),vertexShader:st.points_vert,fragmentShader:st.points_frag},dashed:{uniforms:En([Ce.common,Ce.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:st.linedashed_vert,fragmentShader:st.linedashed_frag},depth:{uniforms:En([Ce.common,Ce.displacementmap]),vertexShader:st.depth_vert,fragmentShader:st.depth_frag},normal:{uniforms:En([Ce.common,Ce.bumpmap,Ce.normalmap,Ce.displacementmap,{opacity:{value:1}}]),vertexShader:st.meshnormal_vert,fragmentShader:st.meshnormal_frag},sprite:{uniforms:En([Ce.sprite,Ce.fog]),vertexShader:st.sprite_vert,fragmentShader:st.sprite_frag},background:{uniforms:{uvTransform:{value:new lt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:st.background_vert,fragmentShader:st.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:st.backgroundCube_vert,fragmentShader:st.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:st.cube_vert,fragmentShader:st.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:st.equirect_vert,fragmentShader:st.equirect_frag},distanceRGBA:{uniforms:En([Ce.common,Ce.displacementmap,{referencePosition:{value:new N},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:st.distanceRGBA_vert,fragmentShader:st.distanceRGBA_frag},shadow:{uniforms:En([Ce.lights,Ce.fog,{color:{value:new ot(0)},opacity:{value:1}}]),vertexShader:st.shadow_vert,fragmentShader:st.shadow_frag}};wi.physical={uniforms:En([wi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new lt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new lt},clearcoatNormalScale:{value:new Ae(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new lt},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new lt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new lt},sheen:{value:0},sheenColor:{value:new ot(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new lt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new lt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new lt},transmissionSamplerSize:{value:new Ae},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new lt},attenuationDistance:{value:0},attenuationColor:{value:new ot(0)},specularColor:{value:new ot(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new lt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new lt},anisotropyVector:{value:new Ae},anisotropyMap:{value:null},anisotropyMapTransform:{value:new lt}}]),vertexShader:st.meshphysical_vert,fragmentShader:st.meshphysical_frag};const _l={r:0,b:0,g:0};function Vw(t,e,n,i,r,s,o){const a=new ot(0);let l=s===!0?0:1,c,d,f=null,h=0,p=null;function g(m,u){let v=!1,x=u.isScene===!0?u.background:null;x&&x.isTexture&&(x=(u.backgroundBlurriness>0?n:e).get(x)),x===null?_(a,l):x&&x.isColor&&(_(x,1),v=!0);const y=t.xr.getEnvironmentBlendMode();y==="additive"?i.buffers.color.setClear(0,0,0,1,o):y==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(t.autoClear||v)&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),x&&(x.isCubeTexture||x.mapping===$c)?(d===void 0&&(d=new _t(new Tr(1,1,1),new ss({name:"BackgroundCubeMaterial",uniforms:go(wi.backgroundCube.uniforms),vertexShader:wi.backgroundCube.vertexShader,fragmentShader:wi.backgroundCube.fragmentShader,side:On,depthTest:!1,depthWrite:!1,fog:!1})),d.geometry.deleteAttribute("normal"),d.geometry.deleteAttribute("uv"),d.onBeforeRender=function(A,w,T){this.matrixWorld.copyPosition(T.matrixWorld)},Object.defineProperty(d.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(d)),d.material.uniforms.envMap.value=x,d.material.uniforms.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,d.material.uniforms.backgroundBlurriness.value=u.backgroundBlurriness,d.material.uniforms.backgroundIntensity.value=u.backgroundIntensity,d.material.toneMapped=Mt.getTransfer(x.colorSpace)!==Ct,(f!==x||h!==x.version||p!==t.toneMapping)&&(d.material.needsUpdate=!0,f=x,h=x.version,p=t.toneMapping),d.layers.enableAll(),m.unshift(d,d.geometry,d.material,0,0,null)):x&&x.isTexture&&(c===void 0&&(c=new _t(new Th(2,2),new ss({name:"BackgroundMaterial",uniforms:go(wi.background.uniforms),vertexShader:wi.background.vertexShader,fragmentShader:wi.background.fragmentShader,side:Cr,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=x,c.material.uniforms.backgroundIntensity.value=u.backgroundIntensity,c.material.toneMapped=Mt.getTransfer(x.colorSpace)!==Ct,x.matrixAutoUpdate===!0&&x.updateMatrix(),c.material.uniforms.uvTransform.value.copy(x.matrix),(f!==x||h!==x.version||p!==t.toneMapping)&&(c.material.needsUpdate=!0,f=x,h=x.version,p=t.toneMapping),c.layers.enableAll(),m.unshift(c,c.geometry,c.material,0,0,null))}function _(m,u){m.getRGB(_l,vv(t)),i.buffers.color.setClear(_l.r,_l.g,_l.b,u,o)}return{getClearColor:function(){return a},setClearColor:function(m,u=1){a.set(m),l=u,_(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(m){l=m,_(a,l)},render:g}}function Ww(t,e,n,i){const r=t.getParameter(t.MAX_VERTEX_ATTRIBS),s=i.isWebGL2?null:e.get("OES_vertex_array_object"),o=i.isWebGL2||s!==null,a={},l=m(null);let c=l,d=!1;function f(F,W,te,K,U){let J=!1;if(o){const O=_(K,te,W);c!==O&&(c=O,p(c.object)),J=u(F,K,te,U),J&&v(F,K,te,U)}else{const O=W.wireframe===!0;(c.geometry!==K.id||c.program!==te.id||c.wireframe!==O)&&(c.geometry=K.id,c.program=te.id,c.wireframe=O,J=!0)}U!==null&&n.update(U,t.ELEMENT_ARRAY_BUFFER),(J||d)&&(d=!1,z(F,W,te,K),U!==null&&t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,n.get(U).buffer))}function h(){return i.isWebGL2?t.createVertexArray():s.createVertexArrayOES()}function p(F){return i.isWebGL2?t.bindVertexArray(F):s.bindVertexArrayOES(F)}function g(F){return i.isWebGL2?t.deleteVertexArray(F):s.deleteVertexArrayOES(F)}function _(F,W,te){const K=te.wireframe===!0;let U=a[F.id];U===void 0&&(U={},a[F.id]=U);let J=U[W.id];J===void 0&&(J={},U[W.id]=J);let O=J[K];return O===void 0&&(O=m(h()),J[K]=O),O}function m(F){const W=[],te=[],K=[];for(let U=0;U<r;U++)W[U]=0,te[U]=0,K[U]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:W,enabledAttributes:te,attributeDivisors:K,object:F,attributes:{},index:null}}function u(F,W,te,K){const U=c.attributes,J=W.attributes;let O=0;const le=te.getAttributes();for(const ce in le)if(le[ce].location>=0){const de=U[ce];let ye=J[ce];if(ye===void 0&&(ce==="instanceMatrix"&&F.instanceMatrix&&(ye=F.instanceMatrix),ce==="instanceColor"&&F.instanceColor&&(ye=F.instanceColor)),de===void 0||de.attribute!==ye||ye&&de.data!==ye.data)return!0;O++}return c.attributesNum!==O||c.index!==K}function v(F,W,te,K){const U={},J=W.attributes;let O=0;const le=te.getAttributes();for(const ce in le)if(le[ce].location>=0){let de=J[ce];de===void 0&&(ce==="instanceMatrix"&&F.instanceMatrix&&(de=F.instanceMatrix),ce==="instanceColor"&&F.instanceColor&&(de=F.instanceColor));const ye={};ye.attribute=de,de&&de.data&&(ye.data=de.data),U[ce]=ye,O++}c.attributes=U,c.attributesNum=O,c.index=K}function x(){const F=c.newAttributes;for(let W=0,te=F.length;W<te;W++)F[W]=0}function y(F){A(F,0)}function A(F,W){const te=c.newAttributes,K=c.enabledAttributes,U=c.attributeDivisors;te[F]=1,K[F]===0&&(t.enableVertexAttribArray(F),K[F]=1),U[F]!==W&&((i.isWebGL2?t:e.get("ANGLE_instanced_arrays"))[i.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](F,W),U[F]=W)}function w(){const F=c.newAttributes,W=c.enabledAttributes;for(let te=0,K=W.length;te<K;te++)W[te]!==F[te]&&(t.disableVertexAttribArray(te),W[te]=0)}function T(F,W,te,K,U,J,O){O===!0?t.vertexAttribIPointer(F,W,te,U,J):t.vertexAttribPointer(F,W,te,K,U,J)}function z(F,W,te,K){if(i.isWebGL2===!1&&(F.isInstancedMesh||K.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;x();const U=K.attributes,J=te.getAttributes(),O=W.defaultAttributeValues;for(const le in J){const ce=J[le];if(ce.location>=0){let Q=U[le];if(Q===void 0&&(le==="instanceMatrix"&&F.instanceMatrix&&(Q=F.instanceMatrix),le==="instanceColor"&&F.instanceColor&&(Q=F.instanceColor)),Q!==void 0){const de=Q.normalized,ye=Q.itemSize,be=n.get(Q);if(be===void 0)continue;const Ne=be.buffer,Ze=be.type,Ke=be.bytesPerElement,je=i.isWebGL2===!0&&(Ze===t.INT||Ze===t.UNSIGNED_INT||Q.gpuType===tv);if(Q.isInterleavedBufferAttribute){const Je=Q.data,ee=Je.stride,at=Q.offset;if(Je.isInstancedInterleavedBuffer){for(let Ie=0;Ie<ce.locationSize;Ie++)A(ce.location+Ie,Je.meshPerAttribute);F.isInstancedMesh!==!0&&K._maxInstanceCount===void 0&&(K._maxInstanceCount=Je.meshPerAttribute*Je.count)}else for(let Ie=0;Ie<ce.locationSize;Ie++)y(ce.location+Ie);t.bindBuffer(t.ARRAY_BUFFER,Ne);for(let Ie=0;Ie<ce.locationSize;Ie++)T(ce.location+Ie,ye/ce.locationSize,Ze,de,ee*Ke,(at+ye/ce.locationSize*Ie)*Ke,je)}else{if(Q.isInstancedBufferAttribute){for(let Je=0;Je<ce.locationSize;Je++)A(ce.location+Je,Q.meshPerAttribute);F.isInstancedMesh!==!0&&K._maxInstanceCount===void 0&&(K._maxInstanceCount=Q.meshPerAttribute*Q.count)}else for(let Je=0;Je<ce.locationSize;Je++)y(ce.location+Je);t.bindBuffer(t.ARRAY_BUFFER,Ne);for(let Je=0;Je<ce.locationSize;Je++)T(ce.location+Je,ye/ce.locationSize,Ze,de,ye*Ke,ye/ce.locationSize*Je*Ke,je)}}else if(O!==void 0){const de=O[le];if(de!==void 0)switch(de.length){case 2:t.vertexAttrib2fv(ce.location,de);break;case 3:t.vertexAttrib3fv(ce.location,de);break;case 4:t.vertexAttrib4fv(ce.location,de);break;default:t.vertexAttrib1fv(ce.location,de)}}}}w()}function E(){X();for(const F in a){const W=a[F];for(const te in W){const K=W[te];for(const U in K)g(K[U].object),delete K[U];delete W[te]}delete a[F]}}function b(F){if(a[F.id]===void 0)return;const W=a[F.id];for(const te in W){const K=W[te];for(const U in K)g(K[U].object),delete K[U];delete W[te]}delete a[F.id]}function V(F){for(const W in a){const te=a[W];if(te[F.id]===void 0)continue;const K=te[F.id];for(const U in K)g(K[U].object),delete K[U];delete te[F.id]}}function X(){pe(),d=!0,c!==l&&(c=l,p(c.object))}function pe(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:f,reset:X,resetDefaultState:pe,dispose:E,releaseStatesOfGeometry:b,releaseStatesOfProgram:V,initAttributes:x,enableAttribute:y,disableUnusedAttributes:w}}function jw(t,e,n,i){const r=i.isWebGL2;let s;function o(d){s=d}function a(d,f){t.drawArrays(s,d,f),n.update(f,s,1)}function l(d,f,h){if(h===0)return;let p,g;if(r)p=t,g="drawArraysInstanced";else if(p=e.get("ANGLE_instanced_arrays"),g="drawArraysInstancedANGLE",p===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}p[g](s,d,f,h),n.update(f,s,h)}function c(d,f,h){if(h===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<h;g++)this.render(d[g],f[g]);else{p.multiDrawArraysWEBGL(s,d,0,f,0,h);let g=0;for(let _=0;_<h;_++)g+=f[_];n.update(g,s,1)}}this.setMode=o,this.render=a,this.renderInstances=l,this.renderMultiDraw=c}function Xw(t,e,n){let i;function r(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const T=e.get("EXT_texture_filter_anisotropic");i=t.getParameter(T.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function s(T){if(T==="highp"){if(t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.HIGH_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.HIGH_FLOAT).precision>0)return"highp";T="mediump"}return T==="mediump"&&t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.MEDIUM_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const o=typeof WebGL2RenderingContext<"u"&&t.constructor.name==="WebGL2RenderingContext";let a=n.precision!==void 0?n.precision:"highp";const l=s(a);l!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",l,"instead."),a=l);const c=o||e.has("WEBGL_draw_buffers"),d=n.logarithmicDepthBuffer===!0,f=t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS),h=t.getParameter(t.MAX_VERTEX_TEXTURE_IMAGE_UNITS),p=t.getParameter(t.MAX_TEXTURE_SIZE),g=t.getParameter(t.MAX_CUBE_MAP_TEXTURE_SIZE),_=t.getParameter(t.MAX_VERTEX_ATTRIBS),m=t.getParameter(t.MAX_VERTEX_UNIFORM_VECTORS),u=t.getParameter(t.MAX_VARYING_VECTORS),v=t.getParameter(t.MAX_FRAGMENT_UNIFORM_VECTORS),x=h>0,y=o||e.has("OES_texture_float"),A=x&&y,w=o?t.getParameter(t.MAX_SAMPLES):0;return{isWebGL2:o,drawBuffers:c,getMaxAnisotropy:r,getMaxPrecision:s,precision:a,logarithmicDepthBuffer:d,maxTextures:f,maxVertexTextures:h,maxTextureSize:p,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:m,maxVaryings:u,maxFragmentUniforms:v,vertexTextures:x,floatFragmentTextures:y,floatVertexTextures:A,maxSamples:w}}function $w(t){const e=this;let n=null,i=0,r=!1,s=!1;const o=new or,a=new lt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,h){const p=f.length!==0||h||i!==0||r;return r=h,i=f.length,p},this.beginShadows=function(){s=!0,d(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(f,h){n=d(f,h,0)},this.setState=function(f,h,p){const g=f.clippingPlanes,_=f.clipIntersection,m=f.clipShadows,u=t.get(f);if(!r||g===null||g.length===0||s&&!m)s?d(null):c();else{const v=s?0:i,x=v*4;let y=u.clippingState||null;l.value=y,y=d(g,h,x,p);for(let A=0;A!==x;++A)y[A]=n[A];u.clippingState=y,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=v}};function c(){l.value!==n&&(l.value=n,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function d(f,h,p,g){const _=f!==null?f.length:0;let m=null;if(_!==0){if(m=l.value,g!==!0||m===null){const u=p+_*4,v=h.matrixWorldInverse;a.getNormalMatrix(v),(m===null||m.length<u)&&(m=new Float32Array(u));for(let x=0,y=p;x!==_;++x,y+=4)o.copy(f[x]).applyMatrix4(v,a),o.normal.toArray(m,y),m[y+3]=o.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}function Yw(t){let e=new WeakMap;function n(o,a){return a===df?o.mapping=ho:a===ff&&(o.mapping=po),o}function i(o){if(o&&o.isTexture){const a=o.mapping;if(a===df||a===ff)if(e.has(o)){const l=e.get(o).texture;return n(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new o1(l.height/2);return c.fromEquirectangularTexture(t,o),e.set(o,c),o.addEventListener("dispose",r),n(c.texture,o.mapping)}else return null}}return o}function r(o){const a=o.target;a.removeEventListener("dispose",r);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function s(){e=new WeakMap}return{get:i,dispose:s}}class Ev extends _v{constructor(e=-1,n=1,i=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=n,this.top=i,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,n,i,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,o=i+e,a=r+n,l=r-n;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=d*this.view.offsetY,l=a-d*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}}const $s=4,jm=[.125,.215,.35,.446,.526,.582],Gr=20,Ku=new Ev,Xm=new ot;let Ju=null,Qu=0,ed=0;const Br=(1+Math.sqrt(5))/2,Cs=1/Br,$m=[new N(1,1,1),new N(-1,1,1),new N(1,1,-1),new N(-1,1,-1),new N(0,Br,Cs),new N(0,Br,-Cs),new N(Cs,0,Br),new N(-Cs,0,Br),new N(Br,Cs,0),new N(-Br,Cs,0)];class Ym{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,n=0,i=.1,r=100){Ju=this._renderer.getRenderTarget(),Qu=this._renderer.getActiveCubeFace(),ed=this._renderer.getActiveMipmapLevel(),this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,i,r,s),n>0&&this._blur(s,0,0,n),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,n=null){return this._fromTexture(e,n)}fromCubemap(e,n=null){return this._fromTexture(e,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Km(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Zm(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Ju,Qu,ed),e.scissorTest=!1,yl(e,0,0,e.width,e.height)}_fromTexture(e,n){e.mapping===ho||e.mapping===po?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Ju=this._renderer.getRenderTarget(),Qu=this._renderer.getActiveCubeFace(),ed=this._renderer.getActiveMipmapLevel();const i=n||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,i={magFilter:ei,minFilter:ei,generateMipmaps:!1,type:Ma,format:mi,colorSpace:qi,depthBuffer:!1},r=qm(e,n,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=qm(e,n,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=qw(s)),this._blurMaterial=Zw(s,e,n)}return r}_compileMaterial(e){const n=new _t(this._lodPlanes[0],e);this._renderer.compile(n,Ku)}_sceneToCubeUV(e,n,i,r){const a=new ti(90,1,n,i),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],d=this._renderer,f=d.autoClear,h=d.toneMapping;d.getClearColor(Xm),d.toneMapping=Mr,d.autoClear=!1;const p=new $t({name:"PMREM.Background",side:On,depthWrite:!1,depthTest:!1}),g=new _t(new Tr,p);let _=!1;const m=e.background;m?m.isColor&&(p.color.copy(m),e.background=null,_=!0):(p.color.copy(Xm),_=!0);for(let u=0;u<6;u++){const v=u%3;v===0?(a.up.set(0,l[u],0),a.lookAt(c[u],0,0)):v===1?(a.up.set(0,0,l[u]),a.lookAt(0,c[u],0)):(a.up.set(0,l[u],0),a.lookAt(0,0,c[u]));const x=this._cubeSize;yl(r,v*x,u>2?x:0,x,x),d.setRenderTarget(r),_&&d.render(g,a),d.render(e,a)}g.geometry.dispose(),g.material.dispose(),d.toneMapping=h,d.autoClear=f,e.background=m}_textureToCubeUV(e,n){const i=this._renderer,r=e.mapping===ho||e.mapping===po;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Km()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Zm());const s=r?this._cubemapMaterial:this._equirectMaterial,o=new _t(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;const l=this._cubeSize;yl(n,0,0,3*l,2*l),i.setRenderTarget(n),i.render(o,Ku)}_applyPMREM(e){const n=this._renderer,i=n.autoClear;n.autoClear=!1;for(let r=1;r<this._lodPlanes.length;r++){const s=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=$m[(r-1)%$m.length];this._blur(e,r-1,r,s,o)}n.autoClear=i}_blur(e,n,i,r,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,n,i,r,"latitudinal",s),this._halfBlur(o,e,i,i,r,"longitudinal",s)}_halfBlur(e,n,i,r,s,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const d=3,f=new _t(this._lodPlanes[r],c),h=c.uniforms,p=this._sizeLods[i]-1,g=isFinite(s)?Math.PI/(2*p):2*Math.PI/(2*Gr-1),_=s/g,m=isFinite(s)?1+Math.floor(d*_):Gr;m>Gr&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Gr}`);const u=[];let v=0;for(let T=0;T<Gr;++T){const z=T/_,E=Math.exp(-z*z/2);u.push(E),T===0?v+=E:T<m&&(v+=2*E)}for(let T=0;T<u.length;T++)u[T]=u[T]/v;h.envMap.value=e.texture,h.samples.value=m,h.weights.value=u,h.latitudinal.value=o==="latitudinal",a&&(h.poleAxis.value=a);const{_lodMax:x}=this;h.dTheta.value=g,h.mipInt.value=x-i;const y=this._sizeLods[r],A=3*y*(r>x-$s?r-x+$s:0),w=4*(this._cubeSize-y);yl(n,A,w,3*y,2*y),l.setRenderTarget(n),l.render(f,Ku)}}function qw(t){const e=[],n=[],i=[];let r=t;const s=t-$s+1+jm.length;for(let o=0;o<s;o++){const a=Math.pow(2,r);n.push(a);let l=1/a;o>t-$s?l=jm[o-t+$s-1]:o===0&&(l=0),i.push(l);const c=1/(a-2),d=-c,f=1+c,h=[d,d,f,d,f,f,d,d,f,f,d,f],p=6,g=6,_=3,m=2,u=1,v=new Float32Array(_*g*p),x=new Float32Array(m*g*p),y=new Float32Array(u*g*p);for(let w=0;w<p;w++){const T=w%3*2/3-1,z=w>2?0:-1,E=[T,z,0,T+2/3,z,0,T+2/3,z+1,0,T,z,0,T+2/3,z+1,0,T,z+1,0];v.set(E,_*g*w),x.set(h,m*g*w);const b=[w,w,w,w,w,w];y.set(b,u*g*w)}const A=new It;A.setAttribute("position",new vi(v,_)),A.setAttribute("uv",new vi(x,m)),A.setAttribute("faceIndex",new vi(y,u)),e.push(A),r>$s&&r--}return{lodPlanes:e,sizeLods:n,sigmas:i}}function qm(t,e,n){const i=new is(t,e,n);return i.texture.mapping=$c,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function yl(t,e,n,i,r){t.viewport.set(e,n,i,r),t.scissor.set(e,n,i,r)}function Zw(t,e,n){const i=new Float32Array(Gr),r=new N(0,1,0);return new ss({name:"SphericalGaussianBlur",defines:{n:Gr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${t}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:bh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Er,depthTest:!1,depthWrite:!1})}function Zm(){return new ss({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:bh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Er,depthTest:!1,depthWrite:!1})}function Km(){return new ss({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:bh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Er,depthTest:!1,depthWrite:!1})}function bh(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Kw(t){let e=new WeakMap,n=null;function i(a){if(a&&a.isTexture){const l=a.mapping,c=l===df||l===ff,d=l===ho||l===po;if(c||d)if(a.isRenderTargetTexture&&a.needsPMREMUpdate===!0){a.needsPMREMUpdate=!1;let f=e.get(a);return n===null&&(n=new Ym(t)),f=c?n.fromEquirectangular(a,f):n.fromCubemap(a,f),e.set(a,f),f.texture}else{if(e.has(a))return e.get(a).texture;{const f=a.image;if(c&&f&&f.height>0||d&&f&&r(f)){n===null&&(n=new Ym(t));const h=c?n.fromEquirectangular(a):n.fromCubemap(a);return e.set(a,h),a.addEventListener("dispose",s),h.texture}else return null}}}return a}function r(a){let l=0;const c=6;for(let d=0;d<c;d++)a[d]!==void 0&&l++;return l===c}function s(a){const l=a.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:i,dispose:o}}function Jw(t){const e={};function n(i){if(e[i]!==void 0)return e[i];let r;switch(i){case"WEBGL_depth_texture":r=t.getExtension("WEBGL_depth_texture")||t.getExtension("MOZ_WEBGL_depth_texture")||t.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=t.getExtension("EXT_texture_filter_anisotropic")||t.getExtension("MOZ_EXT_texture_filter_anisotropic")||t.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=t.getExtension("WEBGL_compressed_texture_s3tc")||t.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||t.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=t.getExtension("WEBGL_compressed_texture_pvrtc")||t.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=t.getExtension(i)}return e[i]=r,r}return{has:function(i){return n(i)!==null},init:function(i){i.isWebGL2?(n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance")):(n("WEBGL_depth_texture"),n("OES_texture_float"),n("OES_texture_half_float"),n("OES_texture_half_float_linear"),n("OES_standard_derivatives"),n("OES_element_index_uint"),n("OES_vertex_array_object"),n("ANGLE_instanced_arrays")),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture")},get:function(i){const r=n(i);return r===null&&console.warn("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function Qw(t,e,n,i){const r={},s=new WeakMap;function o(f){const h=f.target;h.index!==null&&e.remove(h.index);for(const g in h.attributes)e.remove(h.attributes[g]);for(const g in h.morphAttributes){const _=h.morphAttributes[g];for(let m=0,u=_.length;m<u;m++)e.remove(_[m])}h.removeEventListener("dispose",o),delete r[h.id];const p=s.get(h);p&&(e.remove(p),s.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,n.memory.geometries--}function a(f,h){return r[h.id]===!0||(h.addEventListener("dispose",o),r[h.id]=!0,n.memory.geometries++),h}function l(f){const h=f.attributes;for(const g in h)e.update(h[g],t.ARRAY_BUFFER);const p=f.morphAttributes;for(const g in p){const _=p[g];for(let m=0,u=_.length;m<u;m++)e.update(_[m],t.ARRAY_BUFFER)}}function c(f){const h=[],p=f.index,g=f.attributes.position;let _=0;if(p!==null){const v=p.array;_=p.version;for(let x=0,y=v.length;x<y;x+=3){const A=v[x+0],w=v[x+1],T=v[x+2];h.push(A,w,w,T,T,A)}}else if(g!==void 0){const v=g.array;_=g.version;for(let x=0,y=v.length/3-1;x<y;x+=3){const A=x+0,w=x+1,T=x+2;h.push(A,w,w,T,T,A)}}else return;const m=new(dv(h)?xv:gv)(h,1);m.version=_;const u=s.get(f);u&&e.remove(u),s.set(f,m)}function d(f){const h=s.get(f);if(h){const p=f.index;p!==null&&h.version<p.version&&c(f)}else c(f);return s.get(f)}return{get:a,update:l,getWireframeAttribute:d}}function e2(t,e,n,i){const r=i.isWebGL2;let s;function o(p){s=p}let a,l;function c(p){a=p.type,l=p.bytesPerElement}function d(p,g){t.drawElements(s,g,a,p*l),n.update(g,s,1)}function f(p,g,_){if(_===0)return;let m,u;if(r)m=t,u="drawElementsInstanced";else if(m=e.get("ANGLE_instanced_arrays"),u="drawElementsInstancedANGLE",m===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[u](s,g,a,p*l,_),n.update(g,s,_)}function h(p,g,_){if(_===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let u=0;u<_;u++)this.render(p[u]/l,g[u]);else{m.multiDrawElementsWEBGL(s,g,0,a,p,0,_);let u=0;for(let v=0;v<_;v++)u+=g[v];n.update(u,s,1)}}this.setMode=o,this.setIndex=c,this.render=d,this.renderInstances=f,this.renderMultiDraw=h}function t2(t){const e={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,o,a){switch(n.calls++,o){case t.TRIANGLES:n.triangles+=a*(s/3);break;case t.LINES:n.lines+=a*(s/2);break;case t.LINE_STRIP:n.lines+=a*(s-1);break;case t.LINE_LOOP:n.lines+=a*s;break;case t.POINTS:n.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function r(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:e,render:n,programs:null,autoReset:!0,reset:r,update:i}}function n2(t,e){return t[0]-e[0]}function i2(t,e){return Math.abs(e[1])-Math.abs(t[1])}function r2(t,e,n){const i={},r=new Float32Array(8),s=new WeakMap,o=new sn,a=[];for(let c=0;c<8;c++)a[c]=[c,0];function l(c,d,f){const h=c.morphTargetInfluences;if(e.isWebGL2===!0){const g=d.morphAttributes.position||d.morphAttributes.normal||d.morphAttributes.color,_=g!==void 0?g.length:0;let m=s.get(d);if(m===void 0||m.count!==_){let W=function(){pe.dispose(),s.delete(d),d.removeEventListener("dispose",W)};var p=W;m!==void 0&&m.texture.dispose();const x=d.morphAttributes.position!==void 0,y=d.morphAttributes.normal!==void 0,A=d.morphAttributes.color!==void 0,w=d.morphAttributes.position||[],T=d.morphAttributes.normal||[],z=d.morphAttributes.color||[];let E=0;x===!0&&(E=1),y===!0&&(E=2),A===!0&&(E=3);let b=d.attributes.position.count*E,V=1;b>e.maxTextureSize&&(V=Math.ceil(b/e.maxTextureSize),b=e.maxTextureSize);const X=new Float32Array(b*V*4*_),pe=new pv(X,b,V,_);pe.type=hr,pe.needsUpdate=!0;const F=E*4;for(let te=0;te<_;te++){const K=w[te],U=T[te],J=z[te],O=b*V*4*te;for(let le=0;le<K.count;le++){const ce=le*F;x===!0&&(o.fromBufferAttribute(K,le),X[O+ce+0]=o.x,X[O+ce+1]=o.y,X[O+ce+2]=o.z,X[O+ce+3]=0),y===!0&&(o.fromBufferAttribute(U,le),X[O+ce+4]=o.x,X[O+ce+5]=o.y,X[O+ce+6]=o.z,X[O+ce+7]=0),A===!0&&(o.fromBufferAttribute(J,le),X[O+ce+8]=o.x,X[O+ce+9]=o.y,X[O+ce+10]=o.z,X[O+ce+11]=J.itemSize===4?o.w:1)}}m={count:_,texture:pe,size:new Ae(b,V)},s.set(d,m),d.addEventListener("dispose",W)}let u=0;for(let x=0;x<h.length;x++)u+=h[x];const v=d.morphTargetsRelative?1:1-u;f.getUniforms().setValue(t,"morphTargetBaseInfluence",v),f.getUniforms().setValue(t,"morphTargetInfluences",h),f.getUniforms().setValue(t,"morphTargetsTexture",m.texture,n),f.getUniforms().setValue(t,"morphTargetsTextureSize",m.size)}else{const g=h===void 0?0:h.length;let _=i[d.id];if(_===void 0||_.length!==g){_=[];for(let y=0;y<g;y++)_[y]=[y,0];i[d.id]=_}for(let y=0;y<g;y++){const A=_[y];A[0]=y,A[1]=h[y]}_.sort(i2);for(let y=0;y<8;y++)y<g&&_[y][1]?(a[y][0]=_[y][0],a[y][1]=_[y][1]):(a[y][0]=Number.MAX_SAFE_INTEGER,a[y][1]=0);a.sort(n2);const m=d.morphAttributes.position,u=d.morphAttributes.normal;let v=0;for(let y=0;y<8;y++){const A=a[y],w=A[0],T=A[1];w!==Number.MAX_SAFE_INTEGER&&T?(m&&d.getAttribute("morphTarget"+y)!==m[w]&&d.setAttribute("morphTarget"+y,m[w]),u&&d.getAttribute("morphNormal"+y)!==u[w]&&d.setAttribute("morphNormal"+y,u[w]),r[y]=T,v+=T):(m&&d.hasAttribute("morphTarget"+y)===!0&&d.deleteAttribute("morphTarget"+y),u&&d.hasAttribute("morphNormal"+y)===!0&&d.deleteAttribute("morphNormal"+y),r[y]=0)}const x=d.morphTargetsRelative?1:1-v;f.getUniforms().setValue(t,"morphTargetBaseInfluence",x),f.getUniforms().setValue(t,"morphTargetInfluences",r)}}return{update:l}}function s2(t,e,n,i){let r=new WeakMap;function s(l){const c=i.render.frame,d=l.geometry,f=e.get(l,d);if(r.get(f)!==c&&(e.update(f),r.set(f,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),r.get(l)!==c&&(n.update(l.instanceMatrix,t.ARRAY_BUFFER),l.instanceColor!==null&&n.update(l.instanceColor,t.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){const h=l.skeleton;r.get(h)!==c&&(h.update(),r.set(h,c))}return f}function o(){r=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),n.remove(c.instanceMatrix),c.instanceColor!==null&&n.remove(c.instanceColor)}return{update:s,dispose:o}}class Mv extends Fn{constructor(e,n,i,r,s,o,a,l,c,d){if(d=d!==void 0?d:Zr,d!==Zr&&d!==mo)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&d===Zr&&(i=fr),i===void 0&&d===mo&&(i=qr),super(null,r,s,o,a,l,d,i,c),this.isDepthTexture=!0,this.image={width:e,height:n},this.magFilter=a!==void 0?a:wn,this.minFilter=l!==void 0?l:wn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const n=super.toJSON(e);return this.compareFunction!==null&&(n.compareFunction=this.compareFunction),n}}const wv=new Fn,Tv=new Mv(1,1);Tv.compareFunction=uv;const bv=new pv,Av=new VE,Cv=new yv,Jm=[],Qm=[],eg=new Float32Array(16),tg=new Float32Array(9),ng=new Float32Array(4);function yo(t,e,n){const i=t[0];if(i<=0||i>0)return t;const r=e*n;let s=Jm[r];if(s===void 0&&(s=new Float32Array(r),Jm[r]=s),e!==0){i.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=n,t[o].toArray(s,a)}return s}function Zt(t,e){if(t.length!==e.length)return!1;for(let n=0,i=t.length;n<i;n++)if(t[n]!==e[n])return!1;return!0}function Kt(t,e){for(let n=0,i=e.length;n<i;n++)t[n]=e[n]}function Jc(t,e){let n=Qm[e];n===void 0&&(n=new Int32Array(e),Qm[e]=n);for(let i=0;i!==e;++i)n[i]=t.allocateTextureUnit();return n}function o2(t,e){const n=this.cache;n[0]!==e&&(t.uniform1f(this.addr,e),n[0]=e)}function a2(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2f(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Zt(n,e))return;t.uniform2fv(this.addr,e),Kt(n,e)}}function l2(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3f(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else if(e.r!==void 0)(n[0]!==e.r||n[1]!==e.g||n[2]!==e.b)&&(t.uniform3f(this.addr,e.r,e.g,e.b),n[0]=e.r,n[1]=e.g,n[2]=e.b);else{if(Zt(n,e))return;t.uniform3fv(this.addr,e),Kt(n,e)}}function c2(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4f(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Zt(n,e))return;t.uniform4fv(this.addr,e),Kt(n,e)}}function u2(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Zt(n,e))return;t.uniformMatrix2fv(this.addr,!1,e),Kt(n,e)}else{if(Zt(n,i))return;ng.set(i),t.uniformMatrix2fv(this.addr,!1,ng),Kt(n,i)}}function d2(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Zt(n,e))return;t.uniformMatrix3fv(this.addr,!1,e),Kt(n,e)}else{if(Zt(n,i))return;tg.set(i),t.uniformMatrix3fv(this.addr,!1,tg),Kt(n,i)}}function f2(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Zt(n,e))return;t.uniformMatrix4fv(this.addr,!1,e),Kt(n,e)}else{if(Zt(n,i))return;eg.set(i),t.uniformMatrix4fv(this.addr,!1,eg),Kt(n,i)}}function h2(t,e){const n=this.cache;n[0]!==e&&(t.uniform1i(this.addr,e),n[0]=e)}function p2(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2i(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Zt(n,e))return;t.uniform2iv(this.addr,e),Kt(n,e)}}function m2(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3i(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(Zt(n,e))return;t.uniform3iv(this.addr,e),Kt(n,e)}}function g2(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4i(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Zt(n,e))return;t.uniform4iv(this.addr,e),Kt(n,e)}}function x2(t,e){const n=this.cache;n[0]!==e&&(t.uniform1ui(this.addr,e),n[0]=e)}function v2(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2ui(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Zt(n,e))return;t.uniform2uiv(this.addr,e),Kt(n,e)}}function _2(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3ui(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(Zt(n,e))return;t.uniform3uiv(this.addr,e),Kt(n,e)}}function y2(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4ui(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Zt(n,e))return;t.uniform4uiv(this.addr,e),Kt(n,e)}}function S2(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r);const s=this.type===t.SAMPLER_2D_SHADOW?Tv:wv;n.setTexture2D(e||s,r)}function E2(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTexture3D(e||Av,r)}function M2(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTextureCube(e||Cv,r)}function w2(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTexture2DArray(e||bv,r)}function T2(t){switch(t){case 5126:return o2;case 35664:return a2;case 35665:return l2;case 35666:return c2;case 35674:return u2;case 35675:return d2;case 35676:return f2;case 5124:case 35670:return h2;case 35667:case 35671:return p2;case 35668:case 35672:return m2;case 35669:case 35673:return g2;case 5125:return x2;case 36294:return v2;case 36295:return _2;case 36296:return y2;case 35678:case 36198:case 36298:case 36306:case 35682:return S2;case 35679:case 36299:case 36307:return E2;case 35680:case 36300:case 36308:case 36293:return M2;case 36289:case 36303:case 36311:case 36292:return w2}}function b2(t,e){t.uniform1fv(this.addr,e)}function A2(t,e){const n=yo(e,this.size,2);t.uniform2fv(this.addr,n)}function C2(t,e){const n=yo(e,this.size,3);t.uniform3fv(this.addr,n)}function R2(t,e){const n=yo(e,this.size,4);t.uniform4fv(this.addr,n)}function L2(t,e){const n=yo(e,this.size,4);t.uniformMatrix2fv(this.addr,!1,n)}function P2(t,e){const n=yo(e,this.size,9);t.uniformMatrix3fv(this.addr,!1,n)}function N2(t,e){const n=yo(e,this.size,16);t.uniformMatrix4fv(this.addr,!1,n)}function D2(t,e){t.uniform1iv(this.addr,e)}function I2(t,e){t.uniform2iv(this.addr,e)}function U2(t,e){t.uniform3iv(this.addr,e)}function O2(t,e){t.uniform4iv(this.addr,e)}function F2(t,e){t.uniform1uiv(this.addr,e)}function k2(t,e){t.uniform2uiv(this.addr,e)}function z2(t,e){t.uniform3uiv(this.addr,e)}function B2(t,e){t.uniform4uiv(this.addr,e)}function H2(t,e,n){const i=this.cache,r=e.length,s=Jc(n,r);Zt(i,s)||(t.uniform1iv(this.addr,s),Kt(i,s));for(let o=0;o!==r;++o)n.setTexture2D(e[o]||wv,s[o])}function G2(t,e,n){const i=this.cache,r=e.length,s=Jc(n,r);Zt(i,s)||(t.uniform1iv(this.addr,s),Kt(i,s));for(let o=0;o!==r;++o)n.setTexture3D(e[o]||Av,s[o])}function V2(t,e,n){const i=this.cache,r=e.length,s=Jc(n,r);Zt(i,s)||(t.uniform1iv(this.addr,s),Kt(i,s));for(let o=0;o!==r;++o)n.setTextureCube(e[o]||Cv,s[o])}function W2(t,e,n){const i=this.cache,r=e.length,s=Jc(n,r);Zt(i,s)||(t.uniform1iv(this.addr,s),Kt(i,s));for(let o=0;o!==r;++o)n.setTexture2DArray(e[o]||bv,s[o])}function j2(t){switch(t){case 5126:return b2;case 35664:return A2;case 35665:return C2;case 35666:return R2;case 35674:return L2;case 35675:return P2;case 35676:return N2;case 5124:case 35670:return D2;case 35667:case 35671:return I2;case 35668:case 35672:return U2;case 35669:case 35673:return O2;case 5125:return F2;case 36294:return k2;case 36295:return z2;case 36296:return B2;case 35678:case 36198:case 36298:case 36306:case 35682:return H2;case 35679:case 36299:case 36307:return G2;case 35680:case 36300:case 36308:case 36293:return V2;case 36289:case 36303:case 36311:case 36292:return W2}}class X2{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.setValue=T2(n.type)}}class $2{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=j2(n.type)}}class Y2{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,n,i){const r=this.seq;for(let s=0,o=r.length;s!==o;++s){const a=r[s];a.setValue(e,n[a.id],i)}}}const td=/(\w+)(\])?(\[|\.)?/g;function ig(t,e){t.seq.push(e),t.map[e.id]=e}function q2(t,e,n){const i=t.name,r=i.length;for(td.lastIndex=0;;){const s=td.exec(i),o=td.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===r){ig(n,c===void 0?new X2(a,t,e):new $2(a,t,e));break}else{let f=n.map[a];f===void 0&&(f=new Y2(a),ig(n,f)),n=f}}}class jl{constructor(e,n){this.seq=[],this.map={};const i=e.getProgramParameter(n,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const s=e.getActiveUniform(n,r),o=e.getUniformLocation(n,s.name);q2(s,o,this)}}setValue(e,n,i,r){const s=this.map[n];s!==void 0&&s.setValue(e,i,r)}setOptional(e,n,i){const r=n[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,n,i,r){for(let s=0,o=n.length;s!==o;++s){const a=n[s],l=i[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,r)}}static seqWithValue(e,n){const i=[];for(let r=0,s=e.length;r!==s;++r){const o=e[r];o.id in n&&i.push(o)}return i}}function rg(t,e,n){const i=t.createShader(e);return t.shaderSource(i,n),t.compileShader(i),i}const Z2=37297;let K2=0;function J2(t,e){const n=t.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,n.length);for(let o=r;o<s;o++){const a=o+1;i.push(`${a===e?">":" "} ${a}: ${n[o]}`)}return i.join(`
`)}function Q2(t){const e=Mt.getPrimaries(Mt.workingColorSpace),n=Mt.getPrimaries(t);let i;switch(e===n?i="":e===Ec&&n===Sc?i="LinearDisplayP3ToLinearSRGB":e===Sc&&n===Ec&&(i="LinearSRGBToLinearDisplayP3"),t){case qi:case Yc:return[i,"LinearTransferOETF"];case un:case Eh:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",t),[i,"LinearTransferOETF"]}}function sg(t,e,n){const i=t.getShaderParameter(e,t.COMPILE_STATUS),r=t.getShaderInfoLog(e).trim();if(i&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const o=parseInt(s[1]);return n.toUpperCase()+`

`+r+`

`+J2(t.getShaderSource(e),o)}else return r}function eT(t,e){const n=Q2(e);return`vec4 ${t}( vec4 value ) { return ${n[0]}( ${n[1]}( value ) ); }`}function tT(t,e){let n;switch(e){case dE:n="Linear";break;case fE:n="Reinhard";break;case hE:n="OptimizedCineon";break;case pE:n="ACESFilmic";break;case gE:n="AgX";break;case mE:n="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),n="Linear"}return"vec3 "+t+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}function nT(t){return[t.extensionDerivatives||t.envMapCubeUVHeight||t.bumpMap||t.normalMapTangentSpace||t.clearcoatNormalMap||t.flatShading||t.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(t.extensionFragDepth||t.logarithmicDepthBuffer)&&t.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",t.extensionDrawBuffers&&t.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(t.extensionShaderTextureLOD||t.envMap||t.transmission)&&t.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Ys).join(`
`)}function iT(t){return[t.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(Ys).join(`
`)}function rT(t){const e=[];for(const n in t){const i=t[n];i!==!1&&e.push("#define "+n+" "+i)}return e.join(`
`)}function sT(t,e){const n={},i=t.getProgramParameter(e,t.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=t.getActiveAttrib(e,r),o=s.name;let a=1;s.type===t.FLOAT_MAT2&&(a=2),s.type===t.FLOAT_MAT3&&(a=3),s.type===t.FLOAT_MAT4&&(a=4),n[o]={type:s.type,location:t.getAttribLocation(e,o),locationSize:a}}return n}function Ys(t){return t!==""}function og(t,e){const n=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return t.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function ag(t,e){return t.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const oT=/^[ \t]*#include +<([\w\d./]+)>/gm;function vf(t){return t.replace(oT,lT)}const aT=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function lT(t,e){let n=st[e];if(n===void 0){const i=aT.get(e);if(i!==void 0)n=st[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return vf(n)}const cT=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function lg(t){return t.replace(cT,uT)}function uT(t,e,n,i){let r="";for(let s=parseInt(e);s<parseInt(n);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function cg(t){let e="precision "+t.precision+` float;
precision `+t.precision+" int;";return t.precision==="highp"?e+=`
#define HIGH_PRECISION`:t.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:t.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function dT(t){let e="SHADOWMAP_TYPE_BASIC";return t.shadowMapType===Jx?e="SHADOWMAP_TYPE_PCF":t.shadowMapType===zS?e="SHADOWMAP_TYPE_PCF_SOFT":t.shadowMapType===Ui&&(e="SHADOWMAP_TYPE_VSM"),e}function fT(t){let e="ENVMAP_TYPE_CUBE";if(t.envMap)switch(t.envMapMode){case ho:case po:e="ENVMAP_TYPE_CUBE";break;case $c:e="ENVMAP_TYPE_CUBE_UV";break}return e}function hT(t){let e="ENVMAP_MODE_REFLECTION";if(t.envMap)switch(t.envMapMode){case po:e="ENVMAP_MODE_REFRACTION";break}return e}function pT(t){let e="ENVMAP_BLENDING_NONE";if(t.envMap)switch(t.combine){case Qx:e="ENVMAP_BLENDING_MULTIPLY";break;case cE:e="ENVMAP_BLENDING_MIX";break;case uE:e="ENVMAP_BLENDING_ADD";break}return e}function mT(t){const e=t.envMapCubeUVHeight;if(e===null)return null;const n=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,n),7*16)),texelHeight:i,maxMip:n}}function gT(t,e,n,i){const r=t.getContext(),s=n.defines;let o=n.vertexShader,a=n.fragmentShader;const l=dT(n),c=fT(n),d=hT(n),f=pT(n),h=mT(n),p=n.isWebGL2?"":nT(n),g=iT(n),_=rT(s),m=r.createProgram();let u,v,x=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(u=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,_].filter(Ys).join(`
`),u.length>0&&(u+=`
`),v=[p,"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,_].filter(Ys).join(`
`),v.length>0&&(v+=`
`)):(u=[cg(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,_,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+d:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors&&n.isWebGL2?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0&&n.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",n.morphTargetsCount>0&&n.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0&&n.isWebGL2?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.useLegacyLights?"#define LEGACY_LIGHTS":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.logarithmicDepthBuffer&&n.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ys).join(`
`),v=[p,cg(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,_,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+c:"",n.envMap?"#define "+d:"",n.envMap?"#define "+f:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.useLegacyLights?"#define LEGACY_LIGHTS":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.logarithmicDepthBuffer&&n.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==Mr?"#define TONE_MAPPING":"",n.toneMapping!==Mr?st.tonemapping_pars_fragment:"",n.toneMapping!==Mr?tT("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",st.colorspace_pars_fragment,eT("linearToOutputTexel",n.outputColorSpace),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(Ys).join(`
`)),o=vf(o),o=og(o,n),o=ag(o,n),a=vf(a),a=og(a,n),a=ag(a,n),o=lg(o),a=lg(a),n.isWebGL2&&n.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,u=[g,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+u,v=["precision mediump sampler2DArray;","#define varying in",n.glslVersion===Am?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===Am?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+v);const y=x+u+o,A=x+v+a,w=rg(r,r.VERTEX_SHADER,y),T=rg(r,r.FRAGMENT_SHADER,A);r.attachShader(m,w),r.attachShader(m,T),n.index0AttributeName!==void 0?r.bindAttribLocation(m,0,n.index0AttributeName):n.morphTargets===!0&&r.bindAttribLocation(m,0,"position"),r.linkProgram(m);function z(X){if(t.debug.checkShaderErrors){const pe=r.getProgramInfoLog(m).trim(),F=r.getShaderInfoLog(w).trim(),W=r.getShaderInfoLog(T).trim();let te=!0,K=!0;if(r.getProgramParameter(m,r.LINK_STATUS)===!1)if(te=!1,typeof t.debug.onShaderError=="function")t.debug.onShaderError(r,m,w,T);else{const U=sg(r,w,"vertex"),J=sg(r,T,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(m,r.VALIDATE_STATUS)+`

Program Info Log: `+pe+`
`+U+`
`+J)}else pe!==""?console.warn("THREE.WebGLProgram: Program Info Log:",pe):(F===""||W==="")&&(K=!1);K&&(X.diagnostics={runnable:te,programLog:pe,vertexShader:{log:F,prefix:u},fragmentShader:{log:W,prefix:v}})}r.deleteShader(w),r.deleteShader(T),E=new jl(r,m),b=sT(r,m)}let E;this.getUniforms=function(){return E===void 0&&z(this),E};let b;this.getAttributes=function(){return b===void 0&&z(this),b};let V=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return V===!1&&(V=r.getProgramParameter(m,Z2)),V},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(m),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=K2++,this.cacheKey=e,this.usedTimes=1,this.program=m,this.vertexShader=w,this.fragmentShader=T,this}let xT=0;class vT{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const n=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(n),s=this._getShaderStage(i),o=this._getShaderCacheForMaterial(e);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const n=this.materialCache.get(e);for(const i of n)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const n=this.materialCache;let i=n.get(e);return i===void 0&&(i=new Set,n.set(e,i)),i}_getShaderStage(e){const n=this.shaderCache;let i=n.get(e);return i===void 0&&(i=new _T(e),n.set(e,i)),i}}class _T{constructor(e){this.id=xT++,this.code=e,this.usedTimes=0}}function yT(t,e,n,i,r,s,o){const a=new Mh,l=new vT,c=[],d=r.isWebGL2,f=r.logarithmicDepthBuffer,h=r.vertexTextures;let p=r.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(E){return E===0?"uv":`uv${E}`}function m(E,b,V,X,pe){const F=X.fog,W=pe.geometry,te=E.isMeshStandardMaterial?X.environment:null,K=(E.isMeshStandardMaterial?n:e).get(E.envMap||te),U=K&&K.mapping===$c?K.image.height:null,J=g[E.type];E.precision!==null&&(p=r.getMaxPrecision(E.precision),p!==E.precision&&console.warn("THREE.WebGLProgram.getParameters:",E.precision,"not supported, using",p,"instead."));const O=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,le=O!==void 0?O.length:0;let ce=0;W.morphAttributes.position!==void 0&&(ce=1),W.morphAttributes.normal!==void 0&&(ce=2),W.morphAttributes.color!==void 0&&(ce=3);let Q,de,ye,be;if(J){const De=wi[J];Q=De.vertexShader,de=De.fragmentShader}else Q=E.vertexShader,de=E.fragmentShader,l.update(E),ye=l.getVertexShaderID(E),be=l.getFragmentShaderID(E);const Ne=t.getRenderTarget(),Ze=pe.isInstancedMesh===!0,Ke=pe.isBatchedMesh===!0,je=!!E.map,Je=!!E.matcap,ee=!!K,at=!!E.aoMap,Ie=!!E.lightMap,Ge=!!E.bumpMap,Me=!!E.normalMap,dt=!!E.displacementMap,He=!!E.emissiveMap,L=!!E.metalnessMap,M=!!E.roughnessMap,ne=E.anisotropy>0,ve=E.clearcoat>0,ge=E.iridescence>0,xe=E.sheen>0,ke=E.transmission>0,Te=ne&&!!E.anisotropyMap,D=ve&&!!E.clearcoatMap,re=ve&&!!E.clearcoatNormalMap,ae=ve&&!!E.clearcoatRoughnessMap,Z=ge&&!!E.iridescenceMap,Ee=ge&&!!E.iridescenceThicknessMap,$=xe&&!!E.sheenColorMap,fe=xe&&!!E.sheenRoughnessMap,he=!!E.specularMap,q=!!E.specularColorMap,R=!!E.specularIntensityMap,I=ke&&!!E.transmissionMap,G=ke&&!!E.thicknessMap,H=!!E.gradientMap,Y=!!E.alphaMap,P=E.alphaTest>0,ue=!!E.alphaHash,B=!!E.extensions,oe=!!W.attributes.uv1,me=!!W.attributes.uv2,Se=!!W.attributes.uv3;let Le=Mr;return E.toneMapped&&(Ne===null||Ne.isXRRenderTarget===!0)&&(Le=t.toneMapping),{isWebGL2:d,shaderID:J,shaderType:E.type,shaderName:E.name,vertexShader:Q,fragmentShader:de,defines:E.defines,customVertexShaderID:ye,customFragmentShaderID:be,isRawShaderMaterial:E.isRawShaderMaterial===!0,glslVersion:E.glslVersion,precision:p,batching:Ke,instancing:Ze,instancingColor:Ze&&pe.instanceColor!==null,supportsVertexTextures:h,outputColorSpace:Ne===null?t.outputColorSpace:Ne.isXRRenderTarget===!0?Ne.texture.colorSpace:qi,map:je,matcap:Je,envMap:ee,envMapMode:ee&&K.mapping,envMapCubeUVHeight:U,aoMap:at,lightMap:Ie,bumpMap:Ge,normalMap:Me,displacementMap:h&&dt,emissiveMap:He,normalMapObjectSpace:Me&&E.normalMapType===CE,normalMapTangentSpace:Me&&E.normalMapType===cv,metalnessMap:L,roughnessMap:M,anisotropy:ne,anisotropyMap:Te,clearcoat:ve,clearcoatMap:D,clearcoatNormalMap:re,clearcoatRoughnessMap:ae,iridescence:ge,iridescenceMap:Z,iridescenceThicknessMap:Ee,sheen:xe,sheenColorMap:$,sheenRoughnessMap:fe,specularMap:he,specularColorMap:q,specularIntensityMap:R,transmission:ke,transmissionMap:I,thicknessMap:G,gradientMap:H,opaque:E.transparent===!1&&E.blending===no,alphaMap:Y,alphaTest:P,alphaHash:ue,combine:E.combine,mapUv:je&&_(E.map.channel),aoMapUv:at&&_(E.aoMap.channel),lightMapUv:Ie&&_(E.lightMap.channel),bumpMapUv:Ge&&_(E.bumpMap.channel),normalMapUv:Me&&_(E.normalMap.channel),displacementMapUv:dt&&_(E.displacementMap.channel),emissiveMapUv:He&&_(E.emissiveMap.channel),metalnessMapUv:L&&_(E.metalnessMap.channel),roughnessMapUv:M&&_(E.roughnessMap.channel),anisotropyMapUv:Te&&_(E.anisotropyMap.channel),clearcoatMapUv:D&&_(E.clearcoatMap.channel),clearcoatNormalMapUv:re&&_(E.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ae&&_(E.clearcoatRoughnessMap.channel),iridescenceMapUv:Z&&_(E.iridescenceMap.channel),iridescenceThicknessMapUv:Ee&&_(E.iridescenceThicknessMap.channel),sheenColorMapUv:$&&_(E.sheenColorMap.channel),sheenRoughnessMapUv:fe&&_(E.sheenRoughnessMap.channel),specularMapUv:he&&_(E.specularMap.channel),specularColorMapUv:q&&_(E.specularColorMap.channel),specularIntensityMapUv:R&&_(E.specularIntensityMap.channel),transmissionMapUv:I&&_(E.transmissionMap.channel),thicknessMapUv:G&&_(E.thicknessMap.channel),alphaMapUv:Y&&_(E.alphaMap.channel),vertexTangents:!!W.attributes.tangent&&(Me||ne),vertexColors:E.vertexColors,vertexAlphas:E.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,vertexUv1s:oe,vertexUv2s:me,vertexUv3s:Se,pointsUvs:pe.isPoints===!0&&!!W.attributes.uv&&(je||Y),fog:!!F,useFog:E.fog===!0,fogExp2:F&&F.isFogExp2,flatShading:E.flatShading===!0,sizeAttenuation:E.sizeAttenuation===!0,logarithmicDepthBuffer:f,skinning:pe.isSkinnedMesh===!0,morphTargets:W.morphAttributes.position!==void 0,morphNormals:W.morphAttributes.normal!==void 0,morphColors:W.morphAttributes.color!==void 0,morphTargetsCount:le,morphTextureStride:ce,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:E.dithering,shadowMapEnabled:t.shadowMap.enabled&&V.length>0,shadowMapType:t.shadowMap.type,toneMapping:Le,useLegacyLights:t._useLegacyLights,decodeVideoTexture:je&&E.map.isVideoTexture===!0&&Mt.getTransfer(E.map.colorSpace)===Ct,premultipliedAlpha:E.premultipliedAlpha,doubleSided:E.side===Wn,flipSided:E.side===On,useDepthPacking:E.depthPacking>=0,depthPacking:E.depthPacking||0,index0AttributeName:E.index0AttributeName,extensionDerivatives:B&&E.extensions.derivatives===!0,extensionFragDepth:B&&E.extensions.fragDepth===!0,extensionDrawBuffers:B&&E.extensions.drawBuffers===!0,extensionShaderTextureLOD:B&&E.extensions.shaderTextureLOD===!0,extensionClipCullDistance:B&&E.extensions.clipCullDistance&&i.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:d||i.has("EXT_frag_depth"),rendererExtensionDrawBuffers:d||i.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:d||i.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:E.customProgramCacheKey()}}function u(E){const b=[];if(E.shaderID?b.push(E.shaderID):(b.push(E.customVertexShaderID),b.push(E.customFragmentShaderID)),E.defines!==void 0)for(const V in E.defines)b.push(V),b.push(E.defines[V]);return E.isRawShaderMaterial===!1&&(v(b,E),x(b,E),b.push(t.outputColorSpace)),b.push(E.customProgramCacheKey),b.join()}function v(E,b){E.push(b.precision),E.push(b.outputColorSpace),E.push(b.envMapMode),E.push(b.envMapCubeUVHeight),E.push(b.mapUv),E.push(b.alphaMapUv),E.push(b.lightMapUv),E.push(b.aoMapUv),E.push(b.bumpMapUv),E.push(b.normalMapUv),E.push(b.displacementMapUv),E.push(b.emissiveMapUv),E.push(b.metalnessMapUv),E.push(b.roughnessMapUv),E.push(b.anisotropyMapUv),E.push(b.clearcoatMapUv),E.push(b.clearcoatNormalMapUv),E.push(b.clearcoatRoughnessMapUv),E.push(b.iridescenceMapUv),E.push(b.iridescenceThicknessMapUv),E.push(b.sheenColorMapUv),E.push(b.sheenRoughnessMapUv),E.push(b.specularMapUv),E.push(b.specularColorMapUv),E.push(b.specularIntensityMapUv),E.push(b.transmissionMapUv),E.push(b.thicknessMapUv),E.push(b.combine),E.push(b.fogExp2),E.push(b.sizeAttenuation),E.push(b.morphTargetsCount),E.push(b.morphAttributeCount),E.push(b.numDirLights),E.push(b.numPointLights),E.push(b.numSpotLights),E.push(b.numSpotLightMaps),E.push(b.numHemiLights),E.push(b.numRectAreaLights),E.push(b.numDirLightShadows),E.push(b.numPointLightShadows),E.push(b.numSpotLightShadows),E.push(b.numSpotLightShadowsWithMaps),E.push(b.numLightProbes),E.push(b.shadowMapType),E.push(b.toneMapping),E.push(b.numClippingPlanes),E.push(b.numClipIntersection),E.push(b.depthPacking)}function x(E,b){a.disableAll(),b.isWebGL2&&a.enable(0),b.supportsVertexTextures&&a.enable(1),b.instancing&&a.enable(2),b.instancingColor&&a.enable(3),b.matcap&&a.enable(4),b.envMap&&a.enable(5),b.normalMapObjectSpace&&a.enable(6),b.normalMapTangentSpace&&a.enable(7),b.clearcoat&&a.enable(8),b.iridescence&&a.enable(9),b.alphaTest&&a.enable(10),b.vertexColors&&a.enable(11),b.vertexAlphas&&a.enable(12),b.vertexUv1s&&a.enable(13),b.vertexUv2s&&a.enable(14),b.vertexUv3s&&a.enable(15),b.vertexTangents&&a.enable(16),b.anisotropy&&a.enable(17),b.alphaHash&&a.enable(18),b.batching&&a.enable(19),E.push(a.mask),a.disableAll(),b.fog&&a.enable(0),b.useFog&&a.enable(1),b.flatShading&&a.enable(2),b.logarithmicDepthBuffer&&a.enable(3),b.skinning&&a.enable(4),b.morphTargets&&a.enable(5),b.morphNormals&&a.enable(6),b.morphColors&&a.enable(7),b.premultipliedAlpha&&a.enable(8),b.shadowMapEnabled&&a.enable(9),b.useLegacyLights&&a.enable(10),b.doubleSided&&a.enable(11),b.flipSided&&a.enable(12),b.useDepthPacking&&a.enable(13),b.dithering&&a.enable(14),b.transmission&&a.enable(15),b.sheen&&a.enable(16),b.opaque&&a.enable(17),b.pointsUvs&&a.enable(18),b.decodeVideoTexture&&a.enable(19),E.push(a.mask)}function y(E){const b=g[E.type];let V;if(b){const X=wi[b];V=n1.clone(X.uniforms)}else V=E.uniforms;return V}function A(E,b){let V;for(let X=0,pe=c.length;X<pe;X++){const F=c[X];if(F.cacheKey===b){V=F,++V.usedTimes;break}}return V===void 0&&(V=new gT(t,b,E,s),c.push(V)),V}function w(E){if(--E.usedTimes===0){const b=c.indexOf(E);c[b]=c[c.length-1],c.pop(),E.destroy()}}function T(E){l.remove(E)}function z(){l.dispose()}return{getParameters:m,getProgramCacheKey:u,getUniforms:y,acquireProgram:A,releaseProgram:w,releaseShaderCache:T,programs:c,dispose:z}}function ST(){let t=new WeakMap;function e(s){let o=t.get(s);return o===void 0&&(o={},t.set(s,o)),o}function n(s){t.delete(s)}function i(s,o,a){t.get(s)[o]=a}function r(){t=new WeakMap}return{get:e,remove:n,update:i,dispose:r}}function ET(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.material.id!==e.material.id?t.material.id-e.material.id:t.z!==e.z?t.z-e.z:t.id-e.id}function ug(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.z!==e.z?e.z-t.z:t.id-e.id}function dg(){const t=[];let e=0;const n=[],i=[],r=[];function s(){e=0,n.length=0,i.length=0,r.length=0}function o(f,h,p,g,_,m){let u=t[e];return u===void 0?(u={id:f.id,object:f,geometry:h,material:p,groupOrder:g,renderOrder:f.renderOrder,z:_,group:m},t[e]=u):(u.id=f.id,u.object=f,u.geometry=h,u.material=p,u.groupOrder=g,u.renderOrder=f.renderOrder,u.z=_,u.group=m),e++,u}function a(f,h,p,g,_,m){const u=o(f,h,p,g,_,m);p.transmission>0?i.push(u):p.transparent===!0?r.push(u):n.push(u)}function l(f,h,p,g,_,m){const u=o(f,h,p,g,_,m);p.transmission>0?i.unshift(u):p.transparent===!0?r.unshift(u):n.unshift(u)}function c(f,h){n.length>1&&n.sort(f||ET),i.length>1&&i.sort(h||ug),r.length>1&&r.sort(h||ug)}function d(){for(let f=e,h=t.length;f<h;f++){const p=t[f];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:n,transmissive:i,transparent:r,init:s,push:a,unshift:l,finish:d,sort:c}}function MT(){let t=new WeakMap;function e(i,r){const s=t.get(i);let o;return s===void 0?(o=new dg,t.set(i,[o])):r>=s.length?(o=new dg,s.push(o)):o=s[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}function wT(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={direction:new N,color:new ot};break;case"SpotLight":n={position:new N,direction:new N,color:new ot,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new N,color:new ot,distance:0,decay:0};break;case"HemisphereLight":n={direction:new N,skyColor:new ot,groundColor:new ot};break;case"RectAreaLight":n={color:new ot,position:new N,halfWidth:new N,halfHeight:new N};break}return t[e.id]=n,n}}}function TT(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ae};break;case"SpotLight":n={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ae};break;case"PointLight":n={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ae,shadowCameraNear:1,shadowCameraFar:1e3};break}return t[e.id]=n,n}}}let bT=0;function AT(t,e){return(e.castShadow?2:0)-(t.castShadow?2:0)+(e.map?1:0)-(t.map?1:0)}function CT(t,e){const n=new wT,i=TT(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let d=0;d<9;d++)r.probe.push(new N);const s=new N,o=new Ht,a=new Ht;function l(d,f){let h=0,p=0,g=0;for(let X=0;X<9;X++)r.probe[X].set(0,0,0);let _=0,m=0,u=0,v=0,x=0,y=0,A=0,w=0,T=0,z=0,E=0;d.sort(AT);const b=f===!0?Math.PI:1;for(let X=0,pe=d.length;X<pe;X++){const F=d[X],W=F.color,te=F.intensity,K=F.distance,U=F.shadow&&F.shadow.map?F.shadow.map.texture:null;if(F.isAmbientLight)h+=W.r*te*b,p+=W.g*te*b,g+=W.b*te*b;else if(F.isLightProbe){for(let J=0;J<9;J++)r.probe[J].addScaledVector(F.sh.coefficients[J],te);E++}else if(F.isDirectionalLight){const J=n.get(F);if(J.color.copy(F.color).multiplyScalar(F.intensity*b),F.castShadow){const O=F.shadow,le=i.get(F);le.shadowBias=O.bias,le.shadowNormalBias=O.normalBias,le.shadowRadius=O.radius,le.shadowMapSize=O.mapSize,r.directionalShadow[_]=le,r.directionalShadowMap[_]=U,r.directionalShadowMatrix[_]=F.shadow.matrix,y++}r.directional[_]=J,_++}else if(F.isSpotLight){const J=n.get(F);J.position.setFromMatrixPosition(F.matrixWorld),J.color.copy(W).multiplyScalar(te*b),J.distance=K,J.coneCos=Math.cos(F.angle),J.penumbraCos=Math.cos(F.angle*(1-F.penumbra)),J.decay=F.decay,r.spot[u]=J;const O=F.shadow;if(F.map&&(r.spotLightMap[T]=F.map,T++,O.updateMatrices(F),F.castShadow&&z++),r.spotLightMatrix[u]=O.matrix,F.castShadow){const le=i.get(F);le.shadowBias=O.bias,le.shadowNormalBias=O.normalBias,le.shadowRadius=O.radius,le.shadowMapSize=O.mapSize,r.spotShadow[u]=le,r.spotShadowMap[u]=U,w++}u++}else if(F.isRectAreaLight){const J=n.get(F);J.color.copy(W).multiplyScalar(te),J.halfWidth.set(F.width*.5,0,0),J.halfHeight.set(0,F.height*.5,0),r.rectArea[v]=J,v++}else if(F.isPointLight){const J=n.get(F);if(J.color.copy(F.color).multiplyScalar(F.intensity*b),J.distance=F.distance,J.decay=F.decay,F.castShadow){const O=F.shadow,le=i.get(F);le.shadowBias=O.bias,le.shadowNormalBias=O.normalBias,le.shadowRadius=O.radius,le.shadowMapSize=O.mapSize,le.shadowCameraNear=O.camera.near,le.shadowCameraFar=O.camera.far,r.pointShadow[m]=le,r.pointShadowMap[m]=U,r.pointShadowMatrix[m]=F.shadow.matrix,A++}r.point[m]=J,m++}else if(F.isHemisphereLight){const J=n.get(F);J.skyColor.copy(F.color).multiplyScalar(te*b),J.groundColor.copy(F.groundColor).multiplyScalar(te*b),r.hemi[x]=J,x++}}v>0&&(e.isWebGL2?t.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=Ce.LTC_FLOAT_1,r.rectAreaLTC2=Ce.LTC_FLOAT_2):(r.rectAreaLTC1=Ce.LTC_HALF_1,r.rectAreaLTC2=Ce.LTC_HALF_2):t.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=Ce.LTC_FLOAT_1,r.rectAreaLTC2=Ce.LTC_FLOAT_2):t.has("OES_texture_half_float_linear")===!0?(r.rectAreaLTC1=Ce.LTC_HALF_1,r.rectAreaLTC2=Ce.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),r.ambient[0]=h,r.ambient[1]=p,r.ambient[2]=g;const V=r.hash;(V.directionalLength!==_||V.pointLength!==m||V.spotLength!==u||V.rectAreaLength!==v||V.hemiLength!==x||V.numDirectionalShadows!==y||V.numPointShadows!==A||V.numSpotShadows!==w||V.numSpotMaps!==T||V.numLightProbes!==E)&&(r.directional.length=_,r.spot.length=u,r.rectArea.length=v,r.point.length=m,r.hemi.length=x,r.directionalShadow.length=y,r.directionalShadowMap.length=y,r.pointShadow.length=A,r.pointShadowMap.length=A,r.spotShadow.length=w,r.spotShadowMap.length=w,r.directionalShadowMatrix.length=y,r.pointShadowMatrix.length=A,r.spotLightMatrix.length=w+T-z,r.spotLightMap.length=T,r.numSpotLightShadowsWithMaps=z,r.numLightProbes=E,V.directionalLength=_,V.pointLength=m,V.spotLength=u,V.rectAreaLength=v,V.hemiLength=x,V.numDirectionalShadows=y,V.numPointShadows=A,V.numSpotShadows=w,V.numSpotMaps=T,V.numLightProbes=E,r.version=bT++)}function c(d,f){let h=0,p=0,g=0,_=0,m=0;const u=f.matrixWorldInverse;for(let v=0,x=d.length;v<x;v++){const y=d[v];if(y.isDirectionalLight){const A=r.directional[h];A.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),A.direction.sub(s),A.direction.transformDirection(u),h++}else if(y.isSpotLight){const A=r.spot[g];A.position.setFromMatrixPosition(y.matrixWorld),A.position.applyMatrix4(u),A.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),A.direction.sub(s),A.direction.transformDirection(u),g++}else if(y.isRectAreaLight){const A=r.rectArea[_];A.position.setFromMatrixPosition(y.matrixWorld),A.position.applyMatrix4(u),a.identity(),o.copy(y.matrixWorld),o.premultiply(u),a.extractRotation(o),A.halfWidth.set(y.width*.5,0,0),A.halfHeight.set(0,y.height*.5,0),A.halfWidth.applyMatrix4(a),A.halfHeight.applyMatrix4(a),_++}else if(y.isPointLight){const A=r.point[p];A.position.setFromMatrixPosition(y.matrixWorld),A.position.applyMatrix4(u),p++}else if(y.isHemisphereLight){const A=r.hemi[m];A.direction.setFromMatrixPosition(y.matrixWorld),A.direction.transformDirection(u),m++}}}return{setup:l,setupView:c,state:r}}function fg(t,e){const n=new CT(t,e),i=[],r=[];function s(){i.length=0,r.length=0}function o(f){i.push(f)}function a(f){r.push(f)}function l(f){n.setup(i,f)}function c(f){n.setupView(i,f)}return{init:s,state:{lightsArray:i,shadowsArray:r,lights:n},setupLights:l,setupLightsView:c,pushLight:o,pushShadow:a}}function RT(t,e){let n=new WeakMap;function i(s,o=0){const a=n.get(s);let l;return a===void 0?(l=new fg(t,e),n.set(s,[l])):o>=a.length?(l=new fg(t,e),a.push(l)):l=a[o],l}function r(){n=new WeakMap}return{get:i,dispose:r}}class LT extends us{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=bE,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class PT extends us{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const NT=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,DT=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function IT(t,e,n){let i=new wh;const r=new Ae,s=new Ae,o=new sn,a=new LT({depthPacking:AE}),l=new PT,c={},d=n.maxTextureSize,f={[Cr]:On,[On]:Cr,[Wn]:Wn},h=new ss({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ae},radius:{value:4}},vertexShader:NT,fragmentShader:DT}),p=h.clone();p.defines.HORIZONTAL_PASS=1;const g=new It;g.setAttribute("position",new vi(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new _t(g,h),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Jx;let u=this.type;this.render=function(w,T,z){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||w.length===0)return;const E=t.getRenderTarget(),b=t.getActiveCubeFace(),V=t.getActiveMipmapLevel(),X=t.state;X.setBlending(Er),X.buffers.color.setClear(1,1,1,1),X.buffers.depth.setTest(!0),X.setScissorTest(!1);const pe=u!==Ui&&this.type===Ui,F=u===Ui&&this.type!==Ui;for(let W=0,te=w.length;W<te;W++){const K=w[W],U=K.shadow;if(U===void 0){console.warn("THREE.WebGLShadowMap:",K,"has no shadow.");continue}if(U.autoUpdate===!1&&U.needsUpdate===!1)continue;r.copy(U.mapSize);const J=U.getFrameExtents();if(r.multiply(J),s.copy(U.mapSize),(r.x>d||r.y>d)&&(r.x>d&&(s.x=Math.floor(d/J.x),r.x=s.x*J.x,U.mapSize.x=s.x),r.y>d&&(s.y=Math.floor(d/J.y),r.y=s.y*J.y,U.mapSize.y=s.y)),U.map===null||pe===!0||F===!0){const le=this.type!==Ui?{minFilter:wn,magFilter:wn}:{};U.map!==null&&U.map.dispose(),U.map=new is(r.x,r.y,le),U.map.texture.name=K.name+".shadowMap",U.camera.updateProjectionMatrix()}t.setRenderTarget(U.map),t.clear();const O=U.getViewportCount();for(let le=0;le<O;le++){const ce=U.getViewport(le);o.set(s.x*ce.x,s.y*ce.y,s.x*ce.z,s.y*ce.w),X.viewport(o),U.updateMatrices(K,le),i=U.getFrustum(),y(T,z,U.camera,K,this.type)}U.isPointLightShadow!==!0&&this.type===Ui&&v(U,z),U.needsUpdate=!1}u=this.type,m.needsUpdate=!1,t.setRenderTarget(E,b,V)};function v(w,T){const z=e.update(_);h.defines.VSM_SAMPLES!==w.blurSamples&&(h.defines.VSM_SAMPLES=w.blurSamples,p.defines.VSM_SAMPLES=w.blurSamples,h.needsUpdate=!0,p.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new is(r.x,r.y)),h.uniforms.shadow_pass.value=w.map.texture,h.uniforms.resolution.value=w.mapSize,h.uniforms.radius.value=w.radius,t.setRenderTarget(w.mapPass),t.clear(),t.renderBufferDirect(T,null,z,h,_,null),p.uniforms.shadow_pass.value=w.mapPass.texture,p.uniforms.resolution.value=w.mapSize,p.uniforms.radius.value=w.radius,t.setRenderTarget(w.map),t.clear(),t.renderBufferDirect(T,null,z,p,_,null)}function x(w,T,z,E){let b=null;const V=z.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(V!==void 0)b=V;else if(b=z.isPointLight===!0?l:a,t.localClippingEnabled&&T.clipShadows===!0&&Array.isArray(T.clippingPlanes)&&T.clippingPlanes.length!==0||T.displacementMap&&T.displacementScale!==0||T.alphaMap&&T.alphaTest>0||T.map&&T.alphaTest>0){const X=b.uuid,pe=T.uuid;let F=c[X];F===void 0&&(F={},c[X]=F);let W=F[pe];W===void 0&&(W=b.clone(),F[pe]=W,T.addEventListener("dispose",A)),b=W}if(b.visible=T.visible,b.wireframe=T.wireframe,E===Ui?b.side=T.shadowSide!==null?T.shadowSide:T.side:b.side=T.shadowSide!==null?T.shadowSide:f[T.side],b.alphaMap=T.alphaMap,b.alphaTest=T.alphaTest,b.map=T.map,b.clipShadows=T.clipShadows,b.clippingPlanes=T.clippingPlanes,b.clipIntersection=T.clipIntersection,b.displacementMap=T.displacementMap,b.displacementScale=T.displacementScale,b.displacementBias=T.displacementBias,b.wireframeLinewidth=T.wireframeLinewidth,b.linewidth=T.linewidth,z.isPointLight===!0&&b.isMeshDistanceMaterial===!0){const X=t.properties.get(b);X.light=z}return b}function y(w,T,z,E,b){if(w.visible===!1)return;if(w.layers.test(T.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&b===Ui)&&(!w.frustumCulled||i.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(z.matrixWorldInverse,w.matrixWorld);const pe=e.update(w),F=w.material;if(Array.isArray(F)){const W=pe.groups;for(let te=0,K=W.length;te<K;te++){const U=W[te],J=F[U.materialIndex];if(J&&J.visible){const O=x(w,J,E,b);w.onBeforeShadow(t,w,T,z,pe,O,U),t.renderBufferDirect(z,null,pe,O,w,U),w.onAfterShadow(t,w,T,z,pe,O,U)}}}else if(F.visible){const W=x(w,F,E,b);w.onBeforeShadow(t,w,T,z,pe,W,null),t.renderBufferDirect(z,null,pe,W,w,null),w.onAfterShadow(t,w,T,z,pe,W,null)}}const X=w.children;for(let pe=0,F=X.length;pe<F;pe++)y(X[pe],T,z,E,b)}function A(w){w.target.removeEventListener("dispose",A);for(const z in c){const E=c[z],b=w.target.uuid;b in E&&(E[b].dispose(),delete E[b])}}}function UT(t,e,n){const i=n.isWebGL2;function r(){let P=!1;const ue=new sn;let B=null;const oe=new sn(0,0,0,0);return{setMask:function(me){B!==me&&!P&&(t.colorMask(me,me,me,me),B=me)},setLocked:function(me){P=me},setClear:function(me,Se,Le,We,De){De===!0&&(me*=We,Se*=We,Le*=We),ue.set(me,Se,Le,We),oe.equals(ue)===!1&&(t.clearColor(me,Se,Le,We),oe.copy(ue))},reset:function(){P=!1,B=null,oe.set(-1,0,0,0)}}}function s(){let P=!1,ue=null,B=null,oe=null;return{setTest:function(me){me?Ke(t.DEPTH_TEST):je(t.DEPTH_TEST)},setMask:function(me){ue!==me&&!P&&(t.depthMask(me),ue=me)},setFunc:function(me){if(B!==me){switch(me){case nE:t.depthFunc(t.NEVER);break;case iE:t.depthFunc(t.ALWAYS);break;case rE:t.depthFunc(t.LESS);break;case _c:t.depthFunc(t.LEQUAL);break;case sE:t.depthFunc(t.EQUAL);break;case oE:t.depthFunc(t.GEQUAL);break;case aE:t.depthFunc(t.GREATER);break;case lE:t.depthFunc(t.NOTEQUAL);break;default:t.depthFunc(t.LEQUAL)}B=me}},setLocked:function(me){P=me},setClear:function(me){oe!==me&&(t.clearDepth(me),oe=me)},reset:function(){P=!1,ue=null,B=null,oe=null}}}function o(){let P=!1,ue=null,B=null,oe=null,me=null,Se=null,Le=null,We=null,De=null;return{setTest:function(ze){P||(ze?Ke(t.STENCIL_TEST):je(t.STENCIL_TEST))},setMask:function(ze){ue!==ze&&!P&&(t.stencilMask(ze),ue=ze)},setFunc:function(ze,Xe,Qe){(B!==ze||oe!==Xe||me!==Qe)&&(t.stencilFunc(ze,Xe,Qe),B=ze,oe=Xe,me=Qe)},setOp:function(ze,Xe,Qe){(Se!==ze||Le!==Xe||We!==Qe)&&(t.stencilOp(ze,Xe,Qe),Se=ze,Le=Xe,We=Qe)},setLocked:function(ze){P=ze},setClear:function(ze){De!==ze&&(t.clearStencil(ze),De=ze)},reset:function(){P=!1,ue=null,B=null,oe=null,me=null,Se=null,Le=null,We=null,De=null}}}const a=new r,l=new s,c=new o,d=new WeakMap,f=new WeakMap;let h={},p={},g=new WeakMap,_=[],m=null,u=!1,v=null,x=null,y=null,A=null,w=null,T=null,z=null,E=new ot(0,0,0),b=0,V=!1,X=null,pe=null,F=null,W=null,te=null;const K=t.getParameter(t.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let U=!1,J=0;const O=t.getParameter(t.VERSION);O.indexOf("WebGL")!==-1?(J=parseFloat(/^WebGL (\d)/.exec(O)[1]),U=J>=1):O.indexOf("OpenGL ES")!==-1&&(J=parseFloat(/^OpenGL ES (\d)/.exec(O)[1]),U=J>=2);let le=null,ce={};const Q=t.getParameter(t.SCISSOR_BOX),de=t.getParameter(t.VIEWPORT),ye=new sn().fromArray(Q),be=new sn().fromArray(de);function Ne(P,ue,B,oe){const me=new Uint8Array(4),Se=t.createTexture();t.bindTexture(P,Se),t.texParameteri(P,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(P,t.TEXTURE_MAG_FILTER,t.NEAREST);for(let Le=0;Le<B;Le++)i&&(P===t.TEXTURE_3D||P===t.TEXTURE_2D_ARRAY)?t.texImage3D(ue,0,t.RGBA,1,1,oe,0,t.RGBA,t.UNSIGNED_BYTE,me):t.texImage2D(ue+Le,0,t.RGBA,1,1,0,t.RGBA,t.UNSIGNED_BYTE,me);return Se}const Ze={};Ze[t.TEXTURE_2D]=Ne(t.TEXTURE_2D,t.TEXTURE_2D,1),Ze[t.TEXTURE_CUBE_MAP]=Ne(t.TEXTURE_CUBE_MAP,t.TEXTURE_CUBE_MAP_POSITIVE_X,6),i&&(Ze[t.TEXTURE_2D_ARRAY]=Ne(t.TEXTURE_2D_ARRAY,t.TEXTURE_2D_ARRAY,1,1),Ze[t.TEXTURE_3D]=Ne(t.TEXTURE_3D,t.TEXTURE_3D,1,1)),a.setClear(0,0,0,1),l.setClear(1),c.setClear(0),Ke(t.DEPTH_TEST),l.setFunc(_c),He(!1),L(Yp),Ke(t.CULL_FACE),Me(Er);function Ke(P){h[P]!==!0&&(t.enable(P),h[P]=!0)}function je(P){h[P]!==!1&&(t.disable(P),h[P]=!1)}function Je(P,ue){return p[P]!==ue?(t.bindFramebuffer(P,ue),p[P]=ue,i&&(P===t.DRAW_FRAMEBUFFER&&(p[t.FRAMEBUFFER]=ue),P===t.FRAMEBUFFER&&(p[t.DRAW_FRAMEBUFFER]=ue)),!0):!1}function ee(P,ue){let B=_,oe=!1;if(P)if(B=g.get(ue),B===void 0&&(B=[],g.set(ue,B)),P.isWebGLMultipleRenderTargets){const me=P.texture;if(B.length!==me.length||B[0]!==t.COLOR_ATTACHMENT0){for(let Se=0,Le=me.length;Se<Le;Se++)B[Se]=t.COLOR_ATTACHMENT0+Se;B.length=me.length,oe=!0}}else B[0]!==t.COLOR_ATTACHMENT0&&(B[0]=t.COLOR_ATTACHMENT0,oe=!0);else B[0]!==t.BACK&&(B[0]=t.BACK,oe=!0);oe&&(n.isWebGL2?t.drawBuffers(B):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(B))}function at(P){return m!==P?(t.useProgram(P),m=P,!0):!1}const Ie={[Hr]:t.FUNC_ADD,[HS]:t.FUNC_SUBTRACT,[GS]:t.FUNC_REVERSE_SUBTRACT};if(i)Ie[Jp]=t.MIN,Ie[Qp]=t.MAX;else{const P=e.get("EXT_blend_minmax");P!==null&&(Ie[Jp]=P.MIN_EXT,Ie[Qp]=P.MAX_EXT)}const Ge={[VS]:t.ZERO,[WS]:t.ONE,[jS]:t.SRC_COLOR,[cf]:t.SRC_ALPHA,[KS]:t.SRC_ALPHA_SATURATE,[qS]:t.DST_COLOR,[$S]:t.DST_ALPHA,[XS]:t.ONE_MINUS_SRC_COLOR,[uf]:t.ONE_MINUS_SRC_ALPHA,[ZS]:t.ONE_MINUS_DST_COLOR,[YS]:t.ONE_MINUS_DST_ALPHA,[JS]:t.CONSTANT_COLOR,[QS]:t.ONE_MINUS_CONSTANT_COLOR,[eE]:t.CONSTANT_ALPHA,[tE]:t.ONE_MINUS_CONSTANT_ALPHA};function Me(P,ue,B,oe,me,Se,Le,We,De,ze){if(P===Er){u===!0&&(je(t.BLEND),u=!1);return}if(u===!1&&(Ke(t.BLEND),u=!0),P!==BS){if(P!==v||ze!==V){if((x!==Hr||w!==Hr)&&(t.blendEquation(t.FUNC_ADD),x=Hr,w=Hr),ze)switch(P){case no:t.blendFuncSeparate(t.ONE,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case qp:t.blendFunc(t.ONE,t.ONE);break;case Zp:t.blendFuncSeparate(t.ZERO,t.ONE_MINUS_SRC_COLOR,t.ZERO,t.ONE);break;case Kp:t.blendFuncSeparate(t.ZERO,t.SRC_COLOR,t.ZERO,t.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",P);break}else switch(P){case no:t.blendFuncSeparate(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case qp:t.blendFunc(t.SRC_ALPHA,t.ONE);break;case Zp:t.blendFuncSeparate(t.ZERO,t.ONE_MINUS_SRC_COLOR,t.ZERO,t.ONE);break;case Kp:t.blendFunc(t.ZERO,t.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",P);break}y=null,A=null,T=null,z=null,E.set(0,0,0),b=0,v=P,V=ze}return}me=me||ue,Se=Se||B,Le=Le||oe,(ue!==x||me!==w)&&(t.blendEquationSeparate(Ie[ue],Ie[me]),x=ue,w=me),(B!==y||oe!==A||Se!==T||Le!==z)&&(t.blendFuncSeparate(Ge[B],Ge[oe],Ge[Se],Ge[Le]),y=B,A=oe,T=Se,z=Le),(We.equals(E)===!1||De!==b)&&(t.blendColor(We.r,We.g,We.b,De),E.copy(We),b=De),v=P,V=!1}function dt(P,ue){P.side===Wn?je(t.CULL_FACE):Ke(t.CULL_FACE);let B=P.side===On;ue&&(B=!B),He(B),P.blending===no&&P.transparent===!1?Me(Er):Me(P.blending,P.blendEquation,P.blendSrc,P.blendDst,P.blendEquationAlpha,P.blendSrcAlpha,P.blendDstAlpha,P.blendColor,P.blendAlpha,P.premultipliedAlpha),l.setFunc(P.depthFunc),l.setTest(P.depthTest),l.setMask(P.depthWrite),a.setMask(P.colorWrite);const oe=P.stencilWrite;c.setTest(oe),oe&&(c.setMask(P.stencilWriteMask),c.setFunc(P.stencilFunc,P.stencilRef,P.stencilFuncMask),c.setOp(P.stencilFail,P.stencilZFail,P.stencilZPass)),ne(P.polygonOffset,P.polygonOffsetFactor,P.polygonOffsetUnits),P.alphaToCoverage===!0?Ke(t.SAMPLE_ALPHA_TO_COVERAGE):je(t.SAMPLE_ALPHA_TO_COVERAGE)}function He(P){X!==P&&(P?t.frontFace(t.CW):t.frontFace(t.CCW),X=P)}function L(P){P!==FS?(Ke(t.CULL_FACE),P!==pe&&(P===Yp?t.cullFace(t.BACK):P===kS?t.cullFace(t.FRONT):t.cullFace(t.FRONT_AND_BACK))):je(t.CULL_FACE),pe=P}function M(P){P!==F&&(U&&t.lineWidth(P),F=P)}function ne(P,ue,B){P?(Ke(t.POLYGON_OFFSET_FILL),(W!==ue||te!==B)&&(t.polygonOffset(ue,B),W=ue,te=B)):je(t.POLYGON_OFFSET_FILL)}function ve(P){P?Ke(t.SCISSOR_TEST):je(t.SCISSOR_TEST)}function ge(P){P===void 0&&(P=t.TEXTURE0+K-1),le!==P&&(t.activeTexture(P),le=P)}function xe(P,ue,B){B===void 0&&(le===null?B=t.TEXTURE0+K-1:B=le);let oe=ce[B];oe===void 0&&(oe={type:void 0,texture:void 0},ce[B]=oe),(oe.type!==P||oe.texture!==ue)&&(le!==B&&(t.activeTexture(B),le=B),t.bindTexture(P,ue||Ze[P]),oe.type=P,oe.texture=ue)}function ke(){const P=ce[le];P!==void 0&&P.type!==void 0&&(t.bindTexture(P.type,null),P.type=void 0,P.texture=void 0)}function Te(){try{t.compressedTexImage2D.apply(t,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function D(){try{t.compressedTexImage3D.apply(t,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function re(){try{t.texSubImage2D.apply(t,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function ae(){try{t.texSubImage3D.apply(t,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Z(){try{t.compressedTexSubImage2D.apply(t,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Ee(){try{t.compressedTexSubImage3D.apply(t,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function $(){try{t.texStorage2D.apply(t,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function fe(){try{t.texStorage3D.apply(t,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function he(){try{t.texImage2D.apply(t,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function q(){try{t.texImage3D.apply(t,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function R(P){ye.equals(P)===!1&&(t.scissor(P.x,P.y,P.z,P.w),ye.copy(P))}function I(P){be.equals(P)===!1&&(t.viewport(P.x,P.y,P.z,P.w),be.copy(P))}function G(P,ue){let B=f.get(ue);B===void 0&&(B=new WeakMap,f.set(ue,B));let oe=B.get(P);oe===void 0&&(oe=t.getUniformBlockIndex(ue,P.name),B.set(P,oe))}function H(P,ue){const oe=f.get(ue).get(P);d.get(ue)!==oe&&(t.uniformBlockBinding(ue,oe,P.__bindingPointIndex),d.set(ue,oe))}function Y(){t.disable(t.BLEND),t.disable(t.CULL_FACE),t.disable(t.DEPTH_TEST),t.disable(t.POLYGON_OFFSET_FILL),t.disable(t.SCISSOR_TEST),t.disable(t.STENCIL_TEST),t.disable(t.SAMPLE_ALPHA_TO_COVERAGE),t.blendEquation(t.FUNC_ADD),t.blendFunc(t.ONE,t.ZERO),t.blendFuncSeparate(t.ONE,t.ZERO,t.ONE,t.ZERO),t.blendColor(0,0,0,0),t.colorMask(!0,!0,!0,!0),t.clearColor(0,0,0,0),t.depthMask(!0),t.depthFunc(t.LESS),t.clearDepth(1),t.stencilMask(4294967295),t.stencilFunc(t.ALWAYS,0,4294967295),t.stencilOp(t.KEEP,t.KEEP,t.KEEP),t.clearStencil(0),t.cullFace(t.BACK),t.frontFace(t.CCW),t.polygonOffset(0,0),t.activeTexture(t.TEXTURE0),t.bindFramebuffer(t.FRAMEBUFFER,null),i===!0&&(t.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),t.bindFramebuffer(t.READ_FRAMEBUFFER,null)),t.useProgram(null),t.lineWidth(1),t.scissor(0,0,t.canvas.width,t.canvas.height),t.viewport(0,0,t.canvas.width,t.canvas.height),h={},le=null,ce={},p={},g=new WeakMap,_=[],m=null,u=!1,v=null,x=null,y=null,A=null,w=null,T=null,z=null,E=new ot(0,0,0),b=0,V=!1,X=null,pe=null,F=null,W=null,te=null,ye.set(0,0,t.canvas.width,t.canvas.height),be.set(0,0,t.canvas.width,t.canvas.height),a.reset(),l.reset(),c.reset()}return{buffers:{color:a,depth:l,stencil:c},enable:Ke,disable:je,bindFramebuffer:Je,drawBuffers:ee,useProgram:at,setBlending:Me,setMaterial:dt,setFlipSided:He,setCullFace:L,setLineWidth:M,setPolygonOffset:ne,setScissorTest:ve,activeTexture:ge,bindTexture:xe,unbindTexture:ke,compressedTexImage2D:Te,compressedTexImage3D:D,texImage2D:he,texImage3D:q,updateUBOMapping:G,uniformBlockBinding:H,texStorage2D:$,texStorage3D:fe,texSubImage2D:re,texSubImage3D:ae,compressedTexSubImage2D:Z,compressedTexSubImage3D:Ee,scissor:R,viewport:I,reset:Y}}function OT(t,e,n,i,r,s,o){const a=r.isWebGL2,l=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),d=new WeakMap;let f;const h=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(L,M){return p?new OffscreenCanvas(L,M):wc("canvas")}function _(L,M,ne,ve){let ge=1;if((L.width>ve||L.height>ve)&&(ge=ve/Math.max(L.width,L.height)),ge<1||M===!0)if(typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&L instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&L instanceof ImageBitmap){const xe=M?xf:Math.floor,ke=xe(ge*L.width),Te=xe(ge*L.height);f===void 0&&(f=g(ke,Te));const D=ne?g(ke,Te):f;return D.width=ke,D.height=Te,D.getContext("2d").drawImage(L,0,0,ke,Te),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+L.width+"x"+L.height+") to ("+ke+"x"+Te+")."),D}else return"data"in L&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+L.width+"x"+L.height+")."),L;return L}function m(L){return Cm(L.width)&&Cm(L.height)}function u(L){return a?!1:L.wrapS!==pi||L.wrapT!==pi||L.minFilter!==wn&&L.minFilter!==ei}function v(L,M){return L.generateMipmaps&&M&&L.minFilter!==wn&&L.minFilter!==ei}function x(L){t.generateMipmap(L)}function y(L,M,ne,ve,ge=!1){if(a===!1)return M;if(L!==null){if(t[L]!==void 0)return t[L];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+L+"'")}let xe=M;if(M===t.RED&&(ne===t.FLOAT&&(xe=t.R32F),ne===t.HALF_FLOAT&&(xe=t.R16F),ne===t.UNSIGNED_BYTE&&(xe=t.R8)),M===t.RED_INTEGER&&(ne===t.UNSIGNED_BYTE&&(xe=t.R8UI),ne===t.UNSIGNED_SHORT&&(xe=t.R16UI),ne===t.UNSIGNED_INT&&(xe=t.R32UI),ne===t.BYTE&&(xe=t.R8I),ne===t.SHORT&&(xe=t.R16I),ne===t.INT&&(xe=t.R32I)),M===t.RG&&(ne===t.FLOAT&&(xe=t.RG32F),ne===t.HALF_FLOAT&&(xe=t.RG16F),ne===t.UNSIGNED_BYTE&&(xe=t.RG8)),M===t.RGBA){const ke=ge?yc:Mt.getTransfer(ve);ne===t.FLOAT&&(xe=t.RGBA32F),ne===t.HALF_FLOAT&&(xe=t.RGBA16F),ne===t.UNSIGNED_BYTE&&(xe=ke===Ct?t.SRGB8_ALPHA8:t.RGBA8),ne===t.UNSIGNED_SHORT_4_4_4_4&&(xe=t.RGBA4),ne===t.UNSIGNED_SHORT_5_5_5_1&&(xe=t.RGB5_A1)}return(xe===t.R16F||xe===t.R32F||xe===t.RG16F||xe===t.RG32F||xe===t.RGBA16F||xe===t.RGBA32F)&&e.get("EXT_color_buffer_float"),xe}function A(L,M,ne){return v(L,ne)===!0||L.isFramebufferTexture&&L.minFilter!==wn&&L.minFilter!==ei?Math.log2(Math.max(M.width,M.height))+1:L.mipmaps!==void 0&&L.mipmaps.length>0?L.mipmaps.length:L.isCompressedTexture&&Array.isArray(L.image)?M.mipmaps.length:1}function w(L){return L===wn||L===em||L===Au?t.NEAREST:t.LINEAR}function T(L){const M=L.target;M.removeEventListener("dispose",T),E(M),M.isVideoTexture&&d.delete(M)}function z(L){const M=L.target;M.removeEventListener("dispose",z),V(M)}function E(L){const M=i.get(L);if(M.__webglInit===void 0)return;const ne=L.source,ve=h.get(ne);if(ve){const ge=ve[M.__cacheKey];ge.usedTimes--,ge.usedTimes===0&&b(L),Object.keys(ve).length===0&&h.delete(ne)}i.remove(L)}function b(L){const M=i.get(L);t.deleteTexture(M.__webglTexture);const ne=L.source,ve=h.get(ne);delete ve[M.__cacheKey],o.memory.textures--}function V(L){const M=L.texture,ne=i.get(L),ve=i.get(M);if(ve.__webglTexture!==void 0&&(t.deleteTexture(ve.__webglTexture),o.memory.textures--),L.depthTexture&&L.depthTexture.dispose(),L.isWebGLCubeRenderTarget)for(let ge=0;ge<6;ge++){if(Array.isArray(ne.__webglFramebuffer[ge]))for(let xe=0;xe<ne.__webglFramebuffer[ge].length;xe++)t.deleteFramebuffer(ne.__webglFramebuffer[ge][xe]);else t.deleteFramebuffer(ne.__webglFramebuffer[ge]);ne.__webglDepthbuffer&&t.deleteRenderbuffer(ne.__webglDepthbuffer[ge])}else{if(Array.isArray(ne.__webglFramebuffer))for(let ge=0;ge<ne.__webglFramebuffer.length;ge++)t.deleteFramebuffer(ne.__webglFramebuffer[ge]);else t.deleteFramebuffer(ne.__webglFramebuffer);if(ne.__webglDepthbuffer&&t.deleteRenderbuffer(ne.__webglDepthbuffer),ne.__webglMultisampledFramebuffer&&t.deleteFramebuffer(ne.__webglMultisampledFramebuffer),ne.__webglColorRenderbuffer)for(let ge=0;ge<ne.__webglColorRenderbuffer.length;ge++)ne.__webglColorRenderbuffer[ge]&&t.deleteRenderbuffer(ne.__webglColorRenderbuffer[ge]);ne.__webglDepthRenderbuffer&&t.deleteRenderbuffer(ne.__webglDepthRenderbuffer)}if(L.isWebGLMultipleRenderTargets)for(let ge=0,xe=M.length;ge<xe;ge++){const ke=i.get(M[ge]);ke.__webglTexture&&(t.deleteTexture(ke.__webglTexture),o.memory.textures--),i.remove(M[ge])}i.remove(M),i.remove(L)}let X=0;function pe(){X=0}function F(){const L=X;return L>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+L+" texture units while this GPU supports only "+r.maxTextures),X+=1,L}function W(L){const M=[];return M.push(L.wrapS),M.push(L.wrapT),M.push(L.wrapR||0),M.push(L.magFilter),M.push(L.minFilter),M.push(L.anisotropy),M.push(L.internalFormat),M.push(L.format),M.push(L.type),M.push(L.generateMipmaps),M.push(L.premultiplyAlpha),M.push(L.flipY),M.push(L.unpackAlignment),M.push(L.colorSpace),M.join()}function te(L,M){const ne=i.get(L);if(L.isVideoTexture&&dt(L),L.isRenderTargetTexture===!1&&L.version>0&&ne.__version!==L.version){const ve=L.image;if(ve===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ve.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{ye(ne,L,M);return}}n.bindTexture(t.TEXTURE_2D,ne.__webglTexture,t.TEXTURE0+M)}function K(L,M){const ne=i.get(L);if(L.version>0&&ne.__version!==L.version){ye(ne,L,M);return}n.bindTexture(t.TEXTURE_2D_ARRAY,ne.__webglTexture,t.TEXTURE0+M)}function U(L,M){const ne=i.get(L);if(L.version>0&&ne.__version!==L.version){ye(ne,L,M);return}n.bindTexture(t.TEXTURE_3D,ne.__webglTexture,t.TEXTURE0+M)}function J(L,M){const ne=i.get(L);if(L.version>0&&ne.__version!==L.version){be(ne,L,M);return}n.bindTexture(t.TEXTURE_CUBE_MAP,ne.__webglTexture,t.TEXTURE0+M)}const O={[Sa]:t.REPEAT,[pi]:t.CLAMP_TO_EDGE,[hf]:t.MIRRORED_REPEAT},le={[wn]:t.NEAREST,[em]:t.NEAREST_MIPMAP_NEAREST,[Au]:t.NEAREST_MIPMAP_LINEAR,[ei]:t.LINEAR,[xE]:t.LINEAR_MIPMAP_NEAREST,[Ea]:t.LINEAR_MIPMAP_LINEAR},ce={[RE]:t.NEVER,[UE]:t.ALWAYS,[LE]:t.LESS,[uv]:t.LEQUAL,[PE]:t.EQUAL,[IE]:t.GEQUAL,[NE]:t.GREATER,[DE]:t.NOTEQUAL};function Q(L,M,ne){if(ne?(t.texParameteri(L,t.TEXTURE_WRAP_S,O[M.wrapS]),t.texParameteri(L,t.TEXTURE_WRAP_T,O[M.wrapT]),(L===t.TEXTURE_3D||L===t.TEXTURE_2D_ARRAY)&&t.texParameteri(L,t.TEXTURE_WRAP_R,O[M.wrapR]),t.texParameteri(L,t.TEXTURE_MAG_FILTER,le[M.magFilter]),t.texParameteri(L,t.TEXTURE_MIN_FILTER,le[M.minFilter])):(t.texParameteri(L,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(L,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),(L===t.TEXTURE_3D||L===t.TEXTURE_2D_ARRAY)&&t.texParameteri(L,t.TEXTURE_WRAP_R,t.CLAMP_TO_EDGE),(M.wrapS!==pi||M.wrapT!==pi)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),t.texParameteri(L,t.TEXTURE_MAG_FILTER,w(M.magFilter)),t.texParameteri(L,t.TEXTURE_MIN_FILTER,w(M.minFilter)),M.minFilter!==wn&&M.minFilter!==ei&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),M.compareFunction&&(t.texParameteri(L,t.TEXTURE_COMPARE_MODE,t.COMPARE_REF_TO_TEXTURE),t.texParameteri(L,t.TEXTURE_COMPARE_FUNC,ce[M.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){const ve=e.get("EXT_texture_filter_anisotropic");if(M.magFilter===wn||M.minFilter!==Au&&M.minFilter!==Ea||M.type===hr&&e.has("OES_texture_float_linear")===!1||a===!1&&M.type===Ma&&e.has("OES_texture_half_float_linear")===!1)return;(M.anisotropy>1||i.get(M).__currentAnisotropy)&&(t.texParameterf(L,ve.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,r.getMaxAnisotropy())),i.get(M).__currentAnisotropy=M.anisotropy)}}function de(L,M){let ne=!1;L.__webglInit===void 0&&(L.__webglInit=!0,M.addEventListener("dispose",T));const ve=M.source;let ge=h.get(ve);ge===void 0&&(ge={},h.set(ve,ge));const xe=W(M);if(xe!==L.__cacheKey){ge[xe]===void 0&&(ge[xe]={texture:t.createTexture(),usedTimes:0},o.memory.textures++,ne=!0),ge[xe].usedTimes++;const ke=ge[L.__cacheKey];ke!==void 0&&(ge[L.__cacheKey].usedTimes--,ke.usedTimes===0&&b(M)),L.__cacheKey=xe,L.__webglTexture=ge[xe].texture}return ne}function ye(L,M,ne){let ve=t.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(ve=t.TEXTURE_2D_ARRAY),M.isData3DTexture&&(ve=t.TEXTURE_3D);const ge=de(L,M),xe=M.source;n.bindTexture(ve,L.__webglTexture,t.TEXTURE0+ne);const ke=i.get(xe);if(xe.version!==ke.__version||ge===!0){n.activeTexture(t.TEXTURE0+ne);const Te=Mt.getPrimaries(Mt.workingColorSpace),D=M.colorSpace===ni?null:Mt.getPrimaries(M.colorSpace),re=M.colorSpace===ni||Te===D?t.NONE:t.BROWSER_DEFAULT_WEBGL;t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,M.flipY),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),t.pixelStorei(t.UNPACK_ALIGNMENT,M.unpackAlignment),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,re);const ae=u(M)&&m(M.image)===!1;let Z=_(M.image,ae,!1,r.maxTextureSize);Z=He(M,Z);const Ee=m(Z)||a,$=s.convert(M.format,M.colorSpace);let fe=s.convert(M.type),he=y(M.internalFormat,$,fe,M.colorSpace,M.isVideoTexture);Q(ve,M,Ee);let q;const R=M.mipmaps,I=a&&M.isVideoTexture!==!0&&he!==av,G=ke.__version===void 0||ge===!0,H=A(M,Z,Ee);if(M.isDepthTexture)he=t.DEPTH_COMPONENT,a?M.type===hr?he=t.DEPTH_COMPONENT32F:M.type===fr?he=t.DEPTH_COMPONENT24:M.type===qr?he=t.DEPTH24_STENCIL8:he=t.DEPTH_COMPONENT16:M.type===hr&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),M.format===Zr&&he===t.DEPTH_COMPONENT&&M.type!==Sh&&M.type!==fr&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),M.type=fr,fe=s.convert(M.type)),M.format===mo&&he===t.DEPTH_COMPONENT&&(he=t.DEPTH_STENCIL,M.type!==qr&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),M.type=qr,fe=s.convert(M.type))),G&&(I?n.texStorage2D(t.TEXTURE_2D,1,he,Z.width,Z.height):n.texImage2D(t.TEXTURE_2D,0,he,Z.width,Z.height,0,$,fe,null));else if(M.isDataTexture)if(R.length>0&&Ee){I&&G&&n.texStorage2D(t.TEXTURE_2D,H,he,R[0].width,R[0].height);for(let Y=0,P=R.length;Y<P;Y++)q=R[Y],I?n.texSubImage2D(t.TEXTURE_2D,Y,0,0,q.width,q.height,$,fe,q.data):n.texImage2D(t.TEXTURE_2D,Y,he,q.width,q.height,0,$,fe,q.data);M.generateMipmaps=!1}else I?(G&&n.texStorage2D(t.TEXTURE_2D,H,he,Z.width,Z.height),n.texSubImage2D(t.TEXTURE_2D,0,0,0,Z.width,Z.height,$,fe,Z.data)):n.texImage2D(t.TEXTURE_2D,0,he,Z.width,Z.height,0,$,fe,Z.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){I&&G&&n.texStorage3D(t.TEXTURE_2D_ARRAY,H,he,R[0].width,R[0].height,Z.depth);for(let Y=0,P=R.length;Y<P;Y++)q=R[Y],M.format!==mi?$!==null?I?n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,Y,0,0,0,q.width,q.height,Z.depth,$,q.data,0,0):n.compressedTexImage3D(t.TEXTURE_2D_ARRAY,Y,he,q.width,q.height,Z.depth,0,q.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):I?n.texSubImage3D(t.TEXTURE_2D_ARRAY,Y,0,0,0,q.width,q.height,Z.depth,$,fe,q.data):n.texImage3D(t.TEXTURE_2D_ARRAY,Y,he,q.width,q.height,Z.depth,0,$,fe,q.data)}else{I&&G&&n.texStorage2D(t.TEXTURE_2D,H,he,R[0].width,R[0].height);for(let Y=0,P=R.length;Y<P;Y++)q=R[Y],M.format!==mi?$!==null?I?n.compressedTexSubImage2D(t.TEXTURE_2D,Y,0,0,q.width,q.height,$,q.data):n.compressedTexImage2D(t.TEXTURE_2D,Y,he,q.width,q.height,0,q.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):I?n.texSubImage2D(t.TEXTURE_2D,Y,0,0,q.width,q.height,$,fe,q.data):n.texImage2D(t.TEXTURE_2D,Y,he,q.width,q.height,0,$,fe,q.data)}else if(M.isDataArrayTexture)I?(G&&n.texStorage3D(t.TEXTURE_2D_ARRAY,H,he,Z.width,Z.height,Z.depth),n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,0,Z.width,Z.height,Z.depth,$,fe,Z.data)):n.texImage3D(t.TEXTURE_2D_ARRAY,0,he,Z.width,Z.height,Z.depth,0,$,fe,Z.data);else if(M.isData3DTexture)I?(G&&n.texStorage3D(t.TEXTURE_3D,H,he,Z.width,Z.height,Z.depth),n.texSubImage3D(t.TEXTURE_3D,0,0,0,0,Z.width,Z.height,Z.depth,$,fe,Z.data)):n.texImage3D(t.TEXTURE_3D,0,he,Z.width,Z.height,Z.depth,0,$,fe,Z.data);else if(M.isFramebufferTexture){if(G)if(I)n.texStorage2D(t.TEXTURE_2D,H,he,Z.width,Z.height);else{let Y=Z.width,P=Z.height;for(let ue=0;ue<H;ue++)n.texImage2D(t.TEXTURE_2D,ue,he,Y,P,0,$,fe,null),Y>>=1,P>>=1}}else if(R.length>0&&Ee){I&&G&&n.texStorage2D(t.TEXTURE_2D,H,he,R[0].width,R[0].height);for(let Y=0,P=R.length;Y<P;Y++)q=R[Y],I?n.texSubImage2D(t.TEXTURE_2D,Y,0,0,$,fe,q):n.texImage2D(t.TEXTURE_2D,Y,he,$,fe,q);M.generateMipmaps=!1}else I?(G&&n.texStorage2D(t.TEXTURE_2D,H,he,Z.width,Z.height),n.texSubImage2D(t.TEXTURE_2D,0,0,0,$,fe,Z)):n.texImage2D(t.TEXTURE_2D,0,he,$,fe,Z);v(M,Ee)&&x(ve),ke.__version=xe.version,M.onUpdate&&M.onUpdate(M)}L.__version=M.version}function be(L,M,ne){if(M.image.length!==6)return;const ve=de(L,M),ge=M.source;n.bindTexture(t.TEXTURE_CUBE_MAP,L.__webglTexture,t.TEXTURE0+ne);const xe=i.get(ge);if(ge.version!==xe.__version||ve===!0){n.activeTexture(t.TEXTURE0+ne);const ke=Mt.getPrimaries(Mt.workingColorSpace),Te=M.colorSpace===ni?null:Mt.getPrimaries(M.colorSpace),D=M.colorSpace===ni||ke===Te?t.NONE:t.BROWSER_DEFAULT_WEBGL;t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,M.flipY),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),t.pixelStorei(t.UNPACK_ALIGNMENT,M.unpackAlignment),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,D);const re=M.isCompressedTexture||M.image[0].isCompressedTexture,ae=M.image[0]&&M.image[0].isDataTexture,Z=[];for(let Y=0;Y<6;Y++)!re&&!ae?Z[Y]=_(M.image[Y],!1,!0,r.maxCubemapSize):Z[Y]=ae?M.image[Y].image:M.image[Y],Z[Y]=He(M,Z[Y]);const Ee=Z[0],$=m(Ee)||a,fe=s.convert(M.format,M.colorSpace),he=s.convert(M.type),q=y(M.internalFormat,fe,he,M.colorSpace),R=a&&M.isVideoTexture!==!0,I=xe.__version===void 0||ve===!0;let G=A(M,Ee,$);Q(t.TEXTURE_CUBE_MAP,M,$);let H;if(re){R&&I&&n.texStorage2D(t.TEXTURE_CUBE_MAP,G,q,Ee.width,Ee.height);for(let Y=0;Y<6;Y++){H=Z[Y].mipmaps;for(let P=0;P<H.length;P++){const ue=H[P];M.format!==mi?fe!==null?R?n.compressedTexSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Y,P,0,0,ue.width,ue.height,fe,ue.data):n.compressedTexImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Y,P,q,ue.width,ue.height,0,ue.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):R?n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Y,P,0,0,ue.width,ue.height,fe,he,ue.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Y,P,q,ue.width,ue.height,0,fe,he,ue.data)}}}else{H=M.mipmaps,R&&I&&(H.length>0&&G++,n.texStorage2D(t.TEXTURE_CUBE_MAP,G,q,Z[0].width,Z[0].height));for(let Y=0;Y<6;Y++)if(ae){R?n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,0,0,Z[Y].width,Z[Y].height,fe,he,Z[Y].data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,q,Z[Y].width,Z[Y].height,0,fe,he,Z[Y].data);for(let P=0;P<H.length;P++){const B=H[P].image[Y].image;R?n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Y,P+1,0,0,B.width,B.height,fe,he,B.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Y,P+1,q,B.width,B.height,0,fe,he,B.data)}}else{R?n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,0,0,fe,he,Z[Y]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,q,fe,he,Z[Y]);for(let P=0;P<H.length;P++){const ue=H[P];R?n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Y,P+1,0,0,fe,he,ue.image[Y]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Y,P+1,q,fe,he,ue.image[Y])}}}v(M,$)&&x(t.TEXTURE_CUBE_MAP),xe.__version=ge.version,M.onUpdate&&M.onUpdate(M)}L.__version=M.version}function Ne(L,M,ne,ve,ge,xe){const ke=s.convert(ne.format,ne.colorSpace),Te=s.convert(ne.type),D=y(ne.internalFormat,ke,Te,ne.colorSpace);if(!i.get(M).__hasExternalTextures){const ae=Math.max(1,M.width>>xe),Z=Math.max(1,M.height>>xe);ge===t.TEXTURE_3D||ge===t.TEXTURE_2D_ARRAY?n.texImage3D(ge,xe,D,ae,Z,M.depth,0,ke,Te,null):n.texImage2D(ge,xe,D,ae,Z,0,ke,Te,null)}n.bindFramebuffer(t.FRAMEBUFFER,L),Me(M)?l.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,ve,ge,i.get(ne).__webglTexture,0,Ge(M)):(ge===t.TEXTURE_2D||ge>=t.TEXTURE_CUBE_MAP_POSITIVE_X&&ge<=t.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&t.framebufferTexture2D(t.FRAMEBUFFER,ve,ge,i.get(ne).__webglTexture,xe),n.bindFramebuffer(t.FRAMEBUFFER,null)}function Ze(L,M,ne){if(t.bindRenderbuffer(t.RENDERBUFFER,L),M.depthBuffer&&!M.stencilBuffer){let ve=a===!0?t.DEPTH_COMPONENT24:t.DEPTH_COMPONENT16;if(ne||Me(M)){const ge=M.depthTexture;ge&&ge.isDepthTexture&&(ge.type===hr?ve=t.DEPTH_COMPONENT32F:ge.type===fr&&(ve=t.DEPTH_COMPONENT24));const xe=Ge(M);Me(M)?l.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,xe,ve,M.width,M.height):t.renderbufferStorageMultisample(t.RENDERBUFFER,xe,ve,M.width,M.height)}else t.renderbufferStorage(t.RENDERBUFFER,ve,M.width,M.height);t.framebufferRenderbuffer(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.RENDERBUFFER,L)}else if(M.depthBuffer&&M.stencilBuffer){const ve=Ge(M);ne&&Me(M)===!1?t.renderbufferStorageMultisample(t.RENDERBUFFER,ve,t.DEPTH24_STENCIL8,M.width,M.height):Me(M)?l.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,ve,t.DEPTH24_STENCIL8,M.width,M.height):t.renderbufferStorage(t.RENDERBUFFER,t.DEPTH_STENCIL,M.width,M.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.RENDERBUFFER,L)}else{const ve=M.isWebGLMultipleRenderTargets===!0?M.texture:[M.texture];for(let ge=0;ge<ve.length;ge++){const xe=ve[ge],ke=s.convert(xe.format,xe.colorSpace),Te=s.convert(xe.type),D=y(xe.internalFormat,ke,Te,xe.colorSpace),re=Ge(M);ne&&Me(M)===!1?t.renderbufferStorageMultisample(t.RENDERBUFFER,re,D,M.width,M.height):Me(M)?l.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,re,D,M.width,M.height):t.renderbufferStorage(t.RENDERBUFFER,D,M.width,M.height)}}t.bindRenderbuffer(t.RENDERBUFFER,null)}function Ke(L,M){if(M&&M.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(n.bindFramebuffer(t.FRAMEBUFFER,L),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(M.depthTexture).__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),te(M.depthTexture,0);const ve=i.get(M.depthTexture).__webglTexture,ge=Ge(M);if(M.depthTexture.format===Zr)Me(M)?l.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.TEXTURE_2D,ve,0,ge):t.framebufferTexture2D(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.TEXTURE_2D,ve,0);else if(M.depthTexture.format===mo)Me(M)?l.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.TEXTURE_2D,ve,0,ge):t.framebufferTexture2D(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.TEXTURE_2D,ve,0);else throw new Error("Unknown depthTexture format")}function je(L){const M=i.get(L),ne=L.isWebGLCubeRenderTarget===!0;if(L.depthTexture&&!M.__autoAllocateDepthBuffer){if(ne)throw new Error("target.depthTexture not supported in Cube render targets");Ke(M.__webglFramebuffer,L)}else if(ne){M.__webglDepthbuffer=[];for(let ve=0;ve<6;ve++)n.bindFramebuffer(t.FRAMEBUFFER,M.__webglFramebuffer[ve]),M.__webglDepthbuffer[ve]=t.createRenderbuffer(),Ze(M.__webglDepthbuffer[ve],L,!1)}else n.bindFramebuffer(t.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer=t.createRenderbuffer(),Ze(M.__webglDepthbuffer,L,!1);n.bindFramebuffer(t.FRAMEBUFFER,null)}function Je(L,M,ne){const ve=i.get(L);M!==void 0&&Ne(ve.__webglFramebuffer,L,L.texture,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,0),ne!==void 0&&je(L)}function ee(L){const M=L.texture,ne=i.get(L),ve=i.get(M);L.addEventListener("dispose",z),L.isWebGLMultipleRenderTargets!==!0&&(ve.__webglTexture===void 0&&(ve.__webglTexture=t.createTexture()),ve.__version=M.version,o.memory.textures++);const ge=L.isWebGLCubeRenderTarget===!0,xe=L.isWebGLMultipleRenderTargets===!0,ke=m(L)||a;if(ge){ne.__webglFramebuffer=[];for(let Te=0;Te<6;Te++)if(a&&M.mipmaps&&M.mipmaps.length>0){ne.__webglFramebuffer[Te]=[];for(let D=0;D<M.mipmaps.length;D++)ne.__webglFramebuffer[Te][D]=t.createFramebuffer()}else ne.__webglFramebuffer[Te]=t.createFramebuffer()}else{if(a&&M.mipmaps&&M.mipmaps.length>0){ne.__webglFramebuffer=[];for(let Te=0;Te<M.mipmaps.length;Te++)ne.__webglFramebuffer[Te]=t.createFramebuffer()}else ne.__webglFramebuffer=t.createFramebuffer();if(xe)if(r.drawBuffers){const Te=L.texture;for(let D=0,re=Te.length;D<re;D++){const ae=i.get(Te[D]);ae.__webglTexture===void 0&&(ae.__webglTexture=t.createTexture(),o.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(a&&L.samples>0&&Me(L)===!1){const Te=xe?M:[M];ne.__webglMultisampledFramebuffer=t.createFramebuffer(),ne.__webglColorRenderbuffer=[],n.bindFramebuffer(t.FRAMEBUFFER,ne.__webglMultisampledFramebuffer);for(let D=0;D<Te.length;D++){const re=Te[D];ne.__webglColorRenderbuffer[D]=t.createRenderbuffer(),t.bindRenderbuffer(t.RENDERBUFFER,ne.__webglColorRenderbuffer[D]);const ae=s.convert(re.format,re.colorSpace),Z=s.convert(re.type),Ee=y(re.internalFormat,ae,Z,re.colorSpace,L.isXRRenderTarget===!0),$=Ge(L);t.renderbufferStorageMultisample(t.RENDERBUFFER,$,Ee,L.width,L.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+D,t.RENDERBUFFER,ne.__webglColorRenderbuffer[D])}t.bindRenderbuffer(t.RENDERBUFFER,null),L.depthBuffer&&(ne.__webglDepthRenderbuffer=t.createRenderbuffer(),Ze(ne.__webglDepthRenderbuffer,L,!0)),n.bindFramebuffer(t.FRAMEBUFFER,null)}}if(ge){n.bindTexture(t.TEXTURE_CUBE_MAP,ve.__webglTexture),Q(t.TEXTURE_CUBE_MAP,M,ke);for(let Te=0;Te<6;Te++)if(a&&M.mipmaps&&M.mipmaps.length>0)for(let D=0;D<M.mipmaps.length;D++)Ne(ne.__webglFramebuffer[Te][D],L,M,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+Te,D);else Ne(ne.__webglFramebuffer[Te],L,M,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+Te,0);v(M,ke)&&x(t.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(xe){const Te=L.texture;for(let D=0,re=Te.length;D<re;D++){const ae=Te[D],Z=i.get(ae);n.bindTexture(t.TEXTURE_2D,Z.__webglTexture),Q(t.TEXTURE_2D,ae,ke),Ne(ne.__webglFramebuffer,L,ae,t.COLOR_ATTACHMENT0+D,t.TEXTURE_2D,0),v(ae,ke)&&x(t.TEXTURE_2D)}n.unbindTexture()}else{let Te=t.TEXTURE_2D;if((L.isWebGL3DRenderTarget||L.isWebGLArrayRenderTarget)&&(a?Te=L.isWebGL3DRenderTarget?t.TEXTURE_3D:t.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),n.bindTexture(Te,ve.__webglTexture),Q(Te,M,ke),a&&M.mipmaps&&M.mipmaps.length>0)for(let D=0;D<M.mipmaps.length;D++)Ne(ne.__webglFramebuffer[D],L,M,t.COLOR_ATTACHMENT0,Te,D);else Ne(ne.__webglFramebuffer,L,M,t.COLOR_ATTACHMENT0,Te,0);v(M,ke)&&x(Te),n.unbindTexture()}L.depthBuffer&&je(L)}function at(L){const M=m(L)||a,ne=L.isWebGLMultipleRenderTargets===!0?L.texture:[L.texture];for(let ve=0,ge=ne.length;ve<ge;ve++){const xe=ne[ve];if(v(xe,M)){const ke=L.isWebGLCubeRenderTarget?t.TEXTURE_CUBE_MAP:t.TEXTURE_2D,Te=i.get(xe).__webglTexture;n.bindTexture(ke,Te),x(ke),n.unbindTexture()}}}function Ie(L){if(a&&L.samples>0&&Me(L)===!1){const M=L.isWebGLMultipleRenderTargets?L.texture:[L.texture],ne=L.width,ve=L.height;let ge=t.COLOR_BUFFER_BIT;const xe=[],ke=L.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,Te=i.get(L),D=L.isWebGLMultipleRenderTargets===!0;if(D)for(let re=0;re<M.length;re++)n.bindFramebuffer(t.FRAMEBUFFER,Te.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+re,t.RENDERBUFFER,null),n.bindFramebuffer(t.FRAMEBUFFER,Te.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+re,t.TEXTURE_2D,null,0);n.bindFramebuffer(t.READ_FRAMEBUFFER,Te.__webglMultisampledFramebuffer),n.bindFramebuffer(t.DRAW_FRAMEBUFFER,Te.__webglFramebuffer);for(let re=0;re<M.length;re++){xe.push(t.COLOR_ATTACHMENT0+re),L.depthBuffer&&xe.push(ke);const ae=Te.__ignoreDepthValues!==void 0?Te.__ignoreDepthValues:!1;if(ae===!1&&(L.depthBuffer&&(ge|=t.DEPTH_BUFFER_BIT),L.stencilBuffer&&(ge|=t.STENCIL_BUFFER_BIT)),D&&t.framebufferRenderbuffer(t.READ_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.RENDERBUFFER,Te.__webglColorRenderbuffer[re]),ae===!0&&(t.invalidateFramebuffer(t.READ_FRAMEBUFFER,[ke]),t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,[ke])),D){const Z=i.get(M[re]).__webglTexture;t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,Z,0)}t.blitFramebuffer(0,0,ne,ve,0,0,ne,ve,ge,t.NEAREST),c&&t.invalidateFramebuffer(t.READ_FRAMEBUFFER,xe)}if(n.bindFramebuffer(t.READ_FRAMEBUFFER,null),n.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),D)for(let re=0;re<M.length;re++){n.bindFramebuffer(t.FRAMEBUFFER,Te.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+re,t.RENDERBUFFER,Te.__webglColorRenderbuffer[re]);const ae=i.get(M[re]).__webglTexture;n.bindFramebuffer(t.FRAMEBUFFER,Te.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+re,t.TEXTURE_2D,ae,0)}n.bindFramebuffer(t.DRAW_FRAMEBUFFER,Te.__webglMultisampledFramebuffer)}}function Ge(L){return Math.min(r.maxSamples,L.samples)}function Me(L){const M=i.get(L);return a&&L.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function dt(L){const M=o.render.frame;d.get(L)!==M&&(d.set(L,M),L.update())}function He(L,M){const ne=L.colorSpace,ve=L.format,ge=L.type;return L.isCompressedTexture===!0||L.isVideoTexture===!0||L.format===mf||ne!==qi&&ne!==ni&&(Mt.getTransfer(ne)===Ct?a===!1?e.has("EXT_sRGB")===!0&&ve===mi?(L.format=mf,L.minFilter=ei,L.generateMipmaps=!1):M=fv.sRGBToLinear(M):(ve!==mi||ge!==wr)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",ne)),M}this.allocateTextureUnit=F,this.resetTextureUnits=pe,this.setTexture2D=te,this.setTexture2DArray=K,this.setTexture3D=U,this.setTextureCube=J,this.rebindTextures=Je,this.setupRenderTarget=ee,this.updateRenderTargetMipmap=at,this.updateMultisampleRenderTarget=Ie,this.setupDepthRenderbuffer=je,this.setupFrameBufferTexture=Ne,this.useMultisampledRTT=Me}function FT(t,e,n){const i=n.isWebGL2;function r(s,o=ni){let a;const l=Mt.getTransfer(o);if(s===wr)return t.UNSIGNED_BYTE;if(s===nv)return t.UNSIGNED_SHORT_4_4_4_4;if(s===iv)return t.UNSIGNED_SHORT_5_5_5_1;if(s===vE)return t.BYTE;if(s===_E)return t.SHORT;if(s===Sh)return t.UNSIGNED_SHORT;if(s===tv)return t.INT;if(s===fr)return t.UNSIGNED_INT;if(s===hr)return t.FLOAT;if(s===Ma)return i?t.HALF_FLOAT:(a=e.get("OES_texture_half_float"),a!==null?a.HALF_FLOAT_OES:null);if(s===yE)return t.ALPHA;if(s===mi)return t.RGBA;if(s===SE)return t.LUMINANCE;if(s===EE)return t.LUMINANCE_ALPHA;if(s===Zr)return t.DEPTH_COMPONENT;if(s===mo)return t.DEPTH_STENCIL;if(s===mf)return a=e.get("EXT_sRGB"),a!==null?a.SRGB_ALPHA_EXT:null;if(s===ME)return t.RED;if(s===rv)return t.RED_INTEGER;if(s===wE)return t.RG;if(s===sv)return t.RG_INTEGER;if(s===ov)return t.RGBA_INTEGER;if(s===Cu||s===Ru||s===Lu||s===Pu)if(l===Ct)if(a=e.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(s===Cu)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===Ru)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===Lu)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===Pu)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(s===Cu)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===Ru)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===Lu)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===Pu)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===tm||s===nm||s===im||s===rm)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(s===tm)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===nm)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===im)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===rm)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===av)return a=e.get("WEBGL_compressed_texture_etc1"),a!==null?a.COMPRESSED_RGB_ETC1_WEBGL:null;if(s===sm||s===om)if(a=e.get("WEBGL_compressed_texture_etc"),a!==null){if(s===sm)return l===Ct?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(s===om)return l===Ct?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(s===am||s===lm||s===cm||s===um||s===dm||s===fm||s===hm||s===pm||s===mm||s===gm||s===xm||s===vm||s===_m||s===ym)if(a=e.get("WEBGL_compressed_texture_astc"),a!==null){if(s===am)return l===Ct?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===lm)return l===Ct?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===cm)return l===Ct?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===um)return l===Ct?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===dm)return l===Ct?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===fm)return l===Ct?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===hm)return l===Ct?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===pm)return l===Ct?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===mm)return l===Ct?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===gm)return l===Ct?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===xm)return l===Ct?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===vm)return l===Ct?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===_m)return l===Ct?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===ym)return l===Ct?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===Nu||s===Sm||s===Em)if(a=e.get("EXT_texture_compression_bptc"),a!==null){if(s===Nu)return l===Ct?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(s===Sm)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(s===Em)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(s===TE||s===Mm||s===wm||s===Tm)if(a=e.get("EXT_texture_compression_rgtc"),a!==null){if(s===Nu)return a.COMPRESSED_RED_RGTC1_EXT;if(s===Mm)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===wm)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===Tm)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===qr?i?t.UNSIGNED_INT_24_8:(a=e.get("WEBGL_depth_texture"),a!==null?a.UNSIGNED_INT_24_8_WEBGL:null):t[s]!==void 0?t[s]:null}return{convert:r}}class kT extends ti{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Sl extends an{constructor(){super(),this.isGroup=!0,this.type="Group"}}const zT={type:"move"};class nd{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Sl,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Sl,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new N,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new N),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Sl,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new N,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new N),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const n=this._hand;if(n)for(const i of e.hand.values())this._getHandJoint(n,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,n,i){let r=null,s=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&n.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const _ of e.hand.values()){const m=n.getJointPose(_,i),u=this._getHandJoint(c,_);m!==null&&(u.matrix.fromArray(m.transform.matrix),u.matrix.decompose(u.position,u.rotation,u.scale),u.matrixWorldNeedsUpdate=!0,u.jointRadius=m.radius),u.visible=m!==null}const d=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],h=d.position.distanceTo(f.position),p=.02,g=.005;c.inputState.pinching&&h>p+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&h<=p-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=n.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(r=n.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(zT)))}return a!==null&&(a.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,n){if(e.joints[n.jointName]===void 0){const i=new Sl;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[n.jointName]=i,e.add(i)}return e.joints[n.jointName]}}class BT extends cs{constructor(e,n){super();const i=this;let r=null,s=1,o=null,a="local-floor",l=1,c=null,d=null,f=null,h=null,p=null,g=null;const _=n.getContextAttributes();let m=null,u=null;const v=[],x=[],y=new Ae;let A=null;const w=new ti;w.layers.enable(1),w.viewport=new sn;const T=new ti;T.layers.enable(2),T.viewport=new sn;const z=[w,T],E=new kT;E.layers.enable(1),E.layers.enable(2);let b=null,V=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Q){let de=v[Q];return de===void 0&&(de=new nd,v[Q]=de),de.getTargetRaySpace()},this.getControllerGrip=function(Q){let de=v[Q];return de===void 0&&(de=new nd,v[Q]=de),de.getGripSpace()},this.getHand=function(Q){let de=v[Q];return de===void 0&&(de=new nd,v[Q]=de),de.getHandSpace()};function X(Q){const de=x.indexOf(Q.inputSource);if(de===-1)return;const ye=v[de];ye!==void 0&&(ye.update(Q.inputSource,Q.frame,c||o),ye.dispatchEvent({type:Q.type,data:Q.inputSource}))}function pe(){r.removeEventListener("select",X),r.removeEventListener("selectstart",X),r.removeEventListener("selectend",X),r.removeEventListener("squeeze",X),r.removeEventListener("squeezestart",X),r.removeEventListener("squeezeend",X),r.removeEventListener("end",pe),r.removeEventListener("inputsourceschange",F);for(let Q=0;Q<v.length;Q++){const de=x[Q];de!==null&&(x[Q]=null,v[Q].disconnect(de))}b=null,V=null,e.setRenderTarget(m),p=null,h=null,f=null,r=null,u=null,ce.stop(),i.isPresenting=!1,e.setPixelRatio(A),e.setSize(y.width,y.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Q){s=Q,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Q){a=Q,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(Q){c=Q},this.getBaseLayer=function(){return h!==null?h:p},this.getBinding=function(){return f},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(Q){if(r=Q,r!==null){if(m=e.getRenderTarget(),r.addEventListener("select",X),r.addEventListener("selectstart",X),r.addEventListener("selectend",X),r.addEventListener("squeeze",X),r.addEventListener("squeezestart",X),r.addEventListener("squeezeend",X),r.addEventListener("end",pe),r.addEventListener("inputsourceschange",F),_.xrCompatible!==!0&&await n.makeXRCompatible(),A=e.getPixelRatio(),e.getSize(y),r.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const de={antialias:r.renderState.layers===void 0?_.antialias:!0,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(r,n,de),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),u=new is(p.framebufferWidth,p.framebufferHeight,{format:mi,type:wr,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil})}else{let de=null,ye=null,be=null;_.depth&&(be=_.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,de=_.stencil?mo:Zr,ye=_.stencil?qr:fr);const Ne={colorFormat:n.RGBA8,depthFormat:be,scaleFactor:s};f=new XRWebGLBinding(r,n),h=f.createProjectionLayer(Ne),r.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),u=new is(h.textureWidth,h.textureHeight,{format:mi,type:wr,depthTexture:new Mv(h.textureWidth,h.textureHeight,ye,void 0,void 0,void 0,void 0,void 0,void 0,de),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0});const Ze=e.properties.get(u);Ze.__ignoreDepthValues=h.ignoreDepthValues}u.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await r.requestReferenceSpace(a),ce.setContext(r),ce.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode};function F(Q){for(let de=0;de<Q.removed.length;de++){const ye=Q.removed[de],be=x.indexOf(ye);be>=0&&(x[be]=null,v[be].disconnect(ye))}for(let de=0;de<Q.added.length;de++){const ye=Q.added[de];let be=x.indexOf(ye);if(be===-1){for(let Ze=0;Ze<v.length;Ze++)if(Ze>=x.length){x.push(ye),be=Ze;break}else if(x[Ze]===null){x[Ze]=ye,be=Ze;break}if(be===-1)break}const Ne=v[be];Ne&&Ne.connect(ye)}}const W=new N,te=new N;function K(Q,de,ye){W.setFromMatrixPosition(de.matrixWorld),te.setFromMatrixPosition(ye.matrixWorld);const be=W.distanceTo(te),Ne=de.projectionMatrix.elements,Ze=ye.projectionMatrix.elements,Ke=Ne[14]/(Ne[10]-1),je=Ne[14]/(Ne[10]+1),Je=(Ne[9]+1)/Ne[5],ee=(Ne[9]-1)/Ne[5],at=(Ne[8]-1)/Ne[0],Ie=(Ze[8]+1)/Ze[0],Ge=Ke*at,Me=Ke*Ie,dt=be/(-at+Ie),He=dt*-at;de.matrixWorld.decompose(Q.position,Q.quaternion,Q.scale),Q.translateX(He),Q.translateZ(dt),Q.matrixWorld.compose(Q.position,Q.quaternion,Q.scale),Q.matrixWorldInverse.copy(Q.matrixWorld).invert();const L=Ke+dt,M=je+dt,ne=Ge-He,ve=Me+(be-He),ge=Je*je/M*L,xe=ee*je/M*L;Q.projectionMatrix.makePerspective(ne,ve,ge,xe,L,M),Q.projectionMatrixInverse.copy(Q.projectionMatrix).invert()}function U(Q,de){de===null?Q.matrixWorld.copy(Q.matrix):Q.matrixWorld.multiplyMatrices(de.matrixWorld,Q.matrix),Q.matrixWorldInverse.copy(Q.matrixWorld).invert()}this.updateCamera=function(Q){if(r===null)return;E.near=T.near=w.near=Q.near,E.far=T.far=w.far=Q.far,(b!==E.near||V!==E.far)&&(r.updateRenderState({depthNear:E.near,depthFar:E.far}),b=E.near,V=E.far);const de=Q.parent,ye=E.cameras;U(E,de);for(let be=0;be<ye.length;be++)U(ye[be],de);ye.length===2?K(E,w,T):E.projectionMatrix.copy(w.projectionMatrix),J(Q,E,de)};function J(Q,de,ye){ye===null?Q.matrix.copy(de.matrixWorld):(Q.matrix.copy(ye.matrixWorld),Q.matrix.invert(),Q.matrix.multiply(de.matrixWorld)),Q.matrix.decompose(Q.position,Q.quaternion,Q.scale),Q.updateMatrixWorld(!0),Q.projectionMatrix.copy(de.projectionMatrix),Q.projectionMatrixInverse.copy(de.projectionMatrixInverse),Q.isPerspectiveCamera&&(Q.fov=gf*2*Math.atan(1/Q.projectionMatrix.elements[5]),Q.zoom=1)}this.getCamera=function(){return E},this.getFoveation=function(){if(!(h===null&&p===null))return l},this.setFoveation=function(Q){l=Q,h!==null&&(h.fixedFoveation=Q),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=Q)};let O=null;function le(Q,de){if(d=de.getViewerPose(c||o),g=de,d!==null){const ye=d.views;p!==null&&(e.setRenderTargetFramebuffer(u,p.framebuffer),e.setRenderTarget(u));let be=!1;ye.length!==E.cameras.length&&(E.cameras.length=0,be=!0);for(let Ne=0;Ne<ye.length;Ne++){const Ze=ye[Ne];let Ke=null;if(p!==null)Ke=p.getViewport(Ze);else{const Je=f.getViewSubImage(h,Ze);Ke=Je.viewport,Ne===0&&(e.setRenderTargetTextures(u,Je.colorTexture,h.ignoreDepthValues?void 0:Je.depthStencilTexture),e.setRenderTarget(u))}let je=z[Ne];je===void 0&&(je=new ti,je.layers.enable(Ne),je.viewport=new sn,z[Ne]=je),je.matrix.fromArray(Ze.transform.matrix),je.matrix.decompose(je.position,je.quaternion,je.scale),je.projectionMatrix.fromArray(Ze.projectionMatrix),je.projectionMatrixInverse.copy(je.projectionMatrix).invert(),je.viewport.set(Ke.x,Ke.y,Ke.width,Ke.height),Ne===0&&(E.matrix.copy(je.matrix),E.matrix.decompose(E.position,E.quaternion,E.scale)),be===!0&&E.cameras.push(je)}}for(let ye=0;ye<v.length;ye++){const be=x[ye],Ne=v[ye];be!==null&&Ne!==void 0&&Ne.update(be,de,c||o)}O&&O(Q,de),de.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:de}),g=null}const ce=new Sv;ce.setAnimationLoop(le),this.setAnimationLoop=function(Q){O=Q},this.dispose=function(){}}}function HT(t,e){function n(m,u){m.matrixAutoUpdate===!0&&m.updateMatrix(),u.value.copy(m.matrix)}function i(m,u){u.color.getRGB(m.fogColor.value,vv(t)),u.isFog?(m.fogNear.value=u.near,m.fogFar.value=u.far):u.isFogExp2&&(m.fogDensity.value=u.density)}function r(m,u,v,x,y){u.isMeshBasicMaterial||u.isMeshLambertMaterial?s(m,u):u.isMeshToonMaterial?(s(m,u),f(m,u)):u.isMeshPhongMaterial?(s(m,u),d(m,u)):u.isMeshStandardMaterial?(s(m,u),h(m,u),u.isMeshPhysicalMaterial&&p(m,u,y)):u.isMeshMatcapMaterial?(s(m,u),g(m,u)):u.isMeshDepthMaterial?s(m,u):u.isMeshDistanceMaterial?(s(m,u),_(m,u)):u.isMeshNormalMaterial?s(m,u):u.isLineBasicMaterial?(o(m,u),u.isLineDashedMaterial&&a(m,u)):u.isPointsMaterial?l(m,u,v,x):u.isSpriteMaterial?c(m,u):u.isShadowMaterial?(m.color.value.copy(u.color),m.opacity.value=u.opacity):u.isShaderMaterial&&(u.uniformsNeedUpdate=!1)}function s(m,u){m.opacity.value=u.opacity,u.color&&m.diffuse.value.copy(u.color),u.emissive&&m.emissive.value.copy(u.emissive).multiplyScalar(u.emissiveIntensity),u.map&&(m.map.value=u.map,n(u.map,m.mapTransform)),u.alphaMap&&(m.alphaMap.value=u.alphaMap,n(u.alphaMap,m.alphaMapTransform)),u.bumpMap&&(m.bumpMap.value=u.bumpMap,n(u.bumpMap,m.bumpMapTransform),m.bumpScale.value=u.bumpScale,u.side===On&&(m.bumpScale.value*=-1)),u.normalMap&&(m.normalMap.value=u.normalMap,n(u.normalMap,m.normalMapTransform),m.normalScale.value.copy(u.normalScale),u.side===On&&m.normalScale.value.negate()),u.displacementMap&&(m.displacementMap.value=u.displacementMap,n(u.displacementMap,m.displacementMapTransform),m.displacementScale.value=u.displacementScale,m.displacementBias.value=u.displacementBias),u.emissiveMap&&(m.emissiveMap.value=u.emissiveMap,n(u.emissiveMap,m.emissiveMapTransform)),u.specularMap&&(m.specularMap.value=u.specularMap,n(u.specularMap,m.specularMapTransform)),u.alphaTest>0&&(m.alphaTest.value=u.alphaTest);const v=e.get(u).envMap;if(v&&(m.envMap.value=v,m.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=u.reflectivity,m.ior.value=u.ior,m.refractionRatio.value=u.refractionRatio),u.lightMap){m.lightMap.value=u.lightMap;const x=t._useLegacyLights===!0?Math.PI:1;m.lightMapIntensity.value=u.lightMapIntensity*x,n(u.lightMap,m.lightMapTransform)}u.aoMap&&(m.aoMap.value=u.aoMap,m.aoMapIntensity.value=u.aoMapIntensity,n(u.aoMap,m.aoMapTransform))}function o(m,u){m.diffuse.value.copy(u.color),m.opacity.value=u.opacity,u.map&&(m.map.value=u.map,n(u.map,m.mapTransform))}function a(m,u){m.dashSize.value=u.dashSize,m.totalSize.value=u.dashSize+u.gapSize,m.scale.value=u.scale}function l(m,u,v,x){m.diffuse.value.copy(u.color),m.opacity.value=u.opacity,m.size.value=u.size*v,m.scale.value=x*.5,u.map&&(m.map.value=u.map,n(u.map,m.uvTransform)),u.alphaMap&&(m.alphaMap.value=u.alphaMap,n(u.alphaMap,m.alphaMapTransform)),u.alphaTest>0&&(m.alphaTest.value=u.alphaTest)}function c(m,u){m.diffuse.value.copy(u.color),m.opacity.value=u.opacity,m.rotation.value=u.rotation,u.map&&(m.map.value=u.map,n(u.map,m.mapTransform)),u.alphaMap&&(m.alphaMap.value=u.alphaMap,n(u.alphaMap,m.alphaMapTransform)),u.alphaTest>0&&(m.alphaTest.value=u.alphaTest)}function d(m,u){m.specular.value.copy(u.specular),m.shininess.value=Math.max(u.shininess,1e-4)}function f(m,u){u.gradientMap&&(m.gradientMap.value=u.gradientMap)}function h(m,u){m.metalness.value=u.metalness,u.metalnessMap&&(m.metalnessMap.value=u.metalnessMap,n(u.metalnessMap,m.metalnessMapTransform)),m.roughness.value=u.roughness,u.roughnessMap&&(m.roughnessMap.value=u.roughnessMap,n(u.roughnessMap,m.roughnessMapTransform)),e.get(u).envMap&&(m.envMapIntensity.value=u.envMapIntensity)}function p(m,u,v){m.ior.value=u.ior,u.sheen>0&&(m.sheenColor.value.copy(u.sheenColor).multiplyScalar(u.sheen),m.sheenRoughness.value=u.sheenRoughness,u.sheenColorMap&&(m.sheenColorMap.value=u.sheenColorMap,n(u.sheenColorMap,m.sheenColorMapTransform)),u.sheenRoughnessMap&&(m.sheenRoughnessMap.value=u.sheenRoughnessMap,n(u.sheenRoughnessMap,m.sheenRoughnessMapTransform))),u.clearcoat>0&&(m.clearcoat.value=u.clearcoat,m.clearcoatRoughness.value=u.clearcoatRoughness,u.clearcoatMap&&(m.clearcoatMap.value=u.clearcoatMap,n(u.clearcoatMap,m.clearcoatMapTransform)),u.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=u.clearcoatRoughnessMap,n(u.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),u.clearcoatNormalMap&&(m.clearcoatNormalMap.value=u.clearcoatNormalMap,n(u.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(u.clearcoatNormalScale),u.side===On&&m.clearcoatNormalScale.value.negate())),u.iridescence>0&&(m.iridescence.value=u.iridescence,m.iridescenceIOR.value=u.iridescenceIOR,m.iridescenceThicknessMinimum.value=u.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=u.iridescenceThicknessRange[1],u.iridescenceMap&&(m.iridescenceMap.value=u.iridescenceMap,n(u.iridescenceMap,m.iridescenceMapTransform)),u.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=u.iridescenceThicknessMap,n(u.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),u.transmission>0&&(m.transmission.value=u.transmission,m.transmissionSamplerMap.value=v.texture,m.transmissionSamplerSize.value.set(v.width,v.height),u.transmissionMap&&(m.transmissionMap.value=u.transmissionMap,n(u.transmissionMap,m.transmissionMapTransform)),m.thickness.value=u.thickness,u.thicknessMap&&(m.thicknessMap.value=u.thicknessMap,n(u.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=u.attenuationDistance,m.attenuationColor.value.copy(u.attenuationColor)),u.anisotropy>0&&(m.anisotropyVector.value.set(u.anisotropy*Math.cos(u.anisotropyRotation),u.anisotropy*Math.sin(u.anisotropyRotation)),u.anisotropyMap&&(m.anisotropyMap.value=u.anisotropyMap,n(u.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=u.specularIntensity,m.specularColor.value.copy(u.specularColor),u.specularColorMap&&(m.specularColorMap.value=u.specularColorMap,n(u.specularColorMap,m.specularColorMapTransform)),u.specularIntensityMap&&(m.specularIntensityMap.value=u.specularIntensityMap,n(u.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,u){u.matcap&&(m.matcap.value=u.matcap)}function _(m,u){const v=e.get(u).light;m.referencePosition.value.setFromMatrixPosition(v.matrixWorld),m.nearDistance.value=v.shadow.camera.near,m.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function GT(t,e,n,i){let r={},s={},o=[];const a=n.isWebGL2?t.getParameter(t.MAX_UNIFORM_BUFFER_BINDINGS):0;function l(v,x){const y=x.program;i.uniformBlockBinding(v,y)}function c(v,x){let y=r[v.id];y===void 0&&(g(v),y=d(v),r[v.id]=y,v.addEventListener("dispose",m));const A=x.program;i.updateUBOMapping(v,A);const w=e.render.frame;s[v.id]!==w&&(h(v),s[v.id]=w)}function d(v){const x=f();v.__bindingPointIndex=x;const y=t.createBuffer(),A=v.__size,w=v.usage;return t.bindBuffer(t.UNIFORM_BUFFER,y),t.bufferData(t.UNIFORM_BUFFER,A,w),t.bindBuffer(t.UNIFORM_BUFFER,null),t.bindBufferBase(t.UNIFORM_BUFFER,x,y),y}function f(){for(let v=0;v<a;v++)if(o.indexOf(v)===-1)return o.push(v),v;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(v){const x=r[v.id],y=v.uniforms,A=v.__cache;t.bindBuffer(t.UNIFORM_BUFFER,x);for(let w=0,T=y.length;w<T;w++){const z=Array.isArray(y[w])?y[w]:[y[w]];for(let E=0,b=z.length;E<b;E++){const V=z[E];if(p(V,w,E,A)===!0){const X=V.__offset,pe=Array.isArray(V.value)?V.value:[V.value];let F=0;for(let W=0;W<pe.length;W++){const te=pe[W],K=_(te);typeof te=="number"||typeof te=="boolean"?(V.__data[0]=te,t.bufferSubData(t.UNIFORM_BUFFER,X+F,V.__data)):te.isMatrix3?(V.__data[0]=te.elements[0],V.__data[1]=te.elements[1],V.__data[2]=te.elements[2],V.__data[3]=0,V.__data[4]=te.elements[3],V.__data[5]=te.elements[4],V.__data[6]=te.elements[5],V.__data[7]=0,V.__data[8]=te.elements[6],V.__data[9]=te.elements[7],V.__data[10]=te.elements[8],V.__data[11]=0):(te.toArray(V.__data,F),F+=K.storage/Float32Array.BYTES_PER_ELEMENT)}t.bufferSubData(t.UNIFORM_BUFFER,X,V.__data)}}}t.bindBuffer(t.UNIFORM_BUFFER,null)}function p(v,x,y,A){const w=v.value,T=x+"_"+y;if(A[T]===void 0)return typeof w=="number"||typeof w=="boolean"?A[T]=w:A[T]=w.clone(),!0;{const z=A[T];if(typeof w=="number"||typeof w=="boolean"){if(z!==w)return A[T]=w,!0}else if(z.equals(w)===!1)return z.copy(w),!0}return!1}function g(v){const x=v.uniforms;let y=0;const A=16;for(let T=0,z=x.length;T<z;T++){const E=Array.isArray(x[T])?x[T]:[x[T]];for(let b=0,V=E.length;b<V;b++){const X=E[b],pe=Array.isArray(X.value)?X.value:[X.value];for(let F=0,W=pe.length;F<W;F++){const te=pe[F],K=_(te),U=y%A;U!==0&&A-U<K.boundary&&(y+=A-U),X.__data=new Float32Array(K.storage/Float32Array.BYTES_PER_ELEMENT),X.__offset=y,y+=K.storage}}}const w=y%A;return w>0&&(y+=A-w),v.__size=y,v.__cache={},this}function _(v){const x={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(x.boundary=4,x.storage=4):v.isVector2?(x.boundary=8,x.storage=8):v.isVector3||v.isColor?(x.boundary=16,x.storage=12):v.isVector4?(x.boundary=16,x.storage=16):v.isMatrix3?(x.boundary=48,x.storage=48):v.isMatrix4?(x.boundary=64,x.storage=64):v.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",v),x}function m(v){const x=v.target;x.removeEventListener("dispose",m);const y=o.indexOf(x.__bindingPointIndex);o.splice(y,1),t.deleteBuffer(r[x.id]),delete r[x.id],delete s[x.id]}function u(){for(const v in r)t.deleteBuffer(r[v]);o=[],r={},s={}}return{bind:l,update:c,dispose:u}}class Rv{constructor(e={}){const{canvas:n=kE(),context:i=null,depth:r=!0,stencil:s=!0,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:f=!1}=e;this.isWebGLRenderer=!0;let h;i!==null?h=i.getContextAttributes().alpha:h=o;const p=new Uint32Array(4),g=new Int32Array(4);let _=null,m=null;const u=[],v=[];this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=un,this._useLegacyLights=!1,this.toneMapping=Mr,this.toneMappingExposure=1;const x=this;let y=!1,A=0,w=0,T=null,z=-1,E=null;const b=new sn,V=new sn;let X=null;const pe=new ot(0);let F=0,W=n.width,te=n.height,K=1,U=null,J=null;const O=new sn(0,0,W,te),le=new sn(0,0,W,te);let ce=!1;const Q=new wh;let de=!1,ye=!1,be=null;const Ne=new Ht,Ze=new Ae,Ke=new N,je={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function Je(){return T===null?K:1}let ee=i;function at(C,k){for(let ie=0;ie<C.length;ie++){const se=C[ie],j=n.getContext(se,k);if(j!==null)return j}return null}try{const C={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:d,failIfMajorPerformanceCaveat:f};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${yh}`),n.addEventListener("webglcontextlost",Y,!1),n.addEventListener("webglcontextrestored",P,!1),n.addEventListener("webglcontextcreationerror",ue,!1),ee===null){const k=["webgl2","webgl","experimental-webgl"];if(x.isWebGL1Renderer===!0&&k.shift(),ee=at(k,C),ee===null)throw at(k)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&ee instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),ee.getShaderPrecisionFormat===void 0&&(ee.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(C){throw console.error("THREE.WebGLRenderer: "+C.message),C}let Ie,Ge,Me,dt,He,L,M,ne,ve,ge,xe,ke,Te,D,re,ae,Z,Ee,$,fe,he,q,R,I;function G(){Ie=new Jw(ee),Ge=new Xw(ee,Ie,e),Ie.init(Ge),q=new FT(ee,Ie,Ge),Me=new UT(ee,Ie,Ge),dt=new t2(ee),He=new ST,L=new OT(ee,Ie,Me,He,Ge,q,dt),M=new Yw(x),ne=new Kw(x),ve=new c1(ee,Ge),R=new Ww(ee,Ie,ve,Ge),ge=new Qw(ee,ve,dt,R),xe=new s2(ee,ge,ve,dt),$=new r2(ee,Ge,L),ae=new $w(He),ke=new yT(x,M,ne,Ie,Ge,R,ae),Te=new HT(x,He),D=new MT,re=new RT(Ie,Ge),Ee=new Vw(x,M,ne,Me,xe,h,l),Z=new IT(x,xe,Ge),I=new GT(ee,dt,Ge,Me),fe=new jw(ee,Ie,dt,Ge),he=new e2(ee,Ie,dt,Ge),dt.programs=ke.programs,x.capabilities=Ge,x.extensions=Ie,x.properties=He,x.renderLists=D,x.shadowMap=Z,x.state=Me,x.info=dt}G();const H=new BT(x,ee);this.xr=H,this.getContext=function(){return ee},this.getContextAttributes=function(){return ee.getContextAttributes()},this.forceContextLoss=function(){const C=Ie.get("WEBGL_lose_context");C&&C.loseContext()},this.forceContextRestore=function(){const C=Ie.get("WEBGL_lose_context");C&&C.restoreContext()},this.getPixelRatio=function(){return K},this.setPixelRatio=function(C){C!==void 0&&(K=C,this.setSize(W,te,!1))},this.getSize=function(C){return C.set(W,te)},this.setSize=function(C,k,ie=!0){if(H.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}W=C,te=k,n.width=Math.floor(C*K),n.height=Math.floor(k*K),ie===!0&&(n.style.width=C+"px",n.style.height=k+"px"),this.setViewport(0,0,C,k)},this.getDrawingBufferSize=function(C){return C.set(W*K,te*K).floor()},this.setDrawingBufferSize=function(C,k,ie){W=C,te=k,K=ie,n.width=Math.floor(C*ie),n.height=Math.floor(k*ie),this.setViewport(0,0,C,k)},this.getCurrentViewport=function(C){return C.copy(b)},this.getViewport=function(C){return C.copy(O)},this.setViewport=function(C,k,ie,se){C.isVector4?O.set(C.x,C.y,C.z,C.w):O.set(C,k,ie,se),Me.viewport(b.copy(O).multiplyScalar(K).floor())},this.getScissor=function(C){return C.copy(le)},this.setScissor=function(C,k,ie,se){C.isVector4?le.set(C.x,C.y,C.z,C.w):le.set(C,k,ie,se),Me.scissor(V.copy(le).multiplyScalar(K).floor())},this.getScissorTest=function(){return ce},this.setScissorTest=function(C){Me.setScissorTest(ce=C)},this.setOpaqueSort=function(C){U=C},this.setTransparentSort=function(C){J=C},this.getClearColor=function(C){return C.copy(Ee.getClearColor())},this.setClearColor=function(){Ee.setClearColor.apply(Ee,arguments)},this.getClearAlpha=function(){return Ee.getClearAlpha()},this.setClearAlpha=function(){Ee.setClearAlpha.apply(Ee,arguments)},this.clear=function(C=!0,k=!0,ie=!0){let se=0;if(C){let j=!1;if(T!==null){const Pe=T.texture.format;j=Pe===ov||Pe===sv||Pe===rv}if(j){const Pe=T.texture.type,Ue=Pe===wr||Pe===fr||Pe===Sh||Pe===qr||Pe===nv||Pe===iv,Ve=Ee.getClearColor(),Oe=Ee.getClearAlpha(),Ye=Ve.r,qe=Ve.g,Fe=Ve.b;Ue?(p[0]=Ye,p[1]=qe,p[2]=Fe,p[3]=Oe,ee.clearBufferuiv(ee.COLOR,0,p)):(g[0]=Ye,g[1]=qe,g[2]=Fe,g[3]=Oe,ee.clearBufferiv(ee.COLOR,0,g))}else se|=ee.COLOR_BUFFER_BIT}k&&(se|=ee.DEPTH_BUFFER_BIT),ie&&(se|=ee.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),ee.clear(se)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){n.removeEventListener("webglcontextlost",Y,!1),n.removeEventListener("webglcontextrestored",P,!1),n.removeEventListener("webglcontextcreationerror",ue,!1),D.dispose(),re.dispose(),He.dispose(),M.dispose(),ne.dispose(),xe.dispose(),R.dispose(),I.dispose(),ke.dispose(),H.dispose(),H.removeEventListener("sessionstart",De),H.removeEventListener("sessionend",ze),be&&(be.dispose(),be=null),Xe.stop()};function Y(C){C.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),y=!0}function P(){console.log("THREE.WebGLRenderer: Context Restored."),y=!1;const C=dt.autoReset,k=Z.enabled,ie=Z.autoUpdate,se=Z.needsUpdate,j=Z.type;G(),dt.autoReset=C,Z.enabled=k,Z.autoUpdate=ie,Z.needsUpdate=se,Z.type=j}function ue(C){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",C.statusMessage)}function B(C){const k=C.target;k.removeEventListener("dispose",B),oe(k)}function oe(C){me(C),He.remove(C)}function me(C){const k=He.get(C).programs;k!==void 0&&(k.forEach(function(ie){ke.releaseProgram(ie)}),C.isShaderMaterial&&ke.releaseShaderCache(C))}this.renderBufferDirect=function(C,k,ie,se,j,Pe){k===null&&(k=je);const Ue=j.isMesh&&j.matrixWorld.determinant()<0,Ve=Rn(C,k,ie,se,j);Me.setMaterial(se,Ue);let Oe=ie.index,Ye=1;if(se.wireframe===!0){if(Oe=ge.getWireframeAttribute(ie),Oe===void 0)return;Ye=2}const qe=ie.drawRange,Fe=ie.attributes.position;let tt=qe.start*Ye,pt=(qe.start+qe.count)*Ye;Pe!==null&&(tt=Math.max(tt,Pe.start*Ye),pt=Math.min(pt,(Pe.start+Pe.count)*Ye)),Oe!==null?(tt=Math.max(tt,0),pt=Math.min(pt,Oe.count)):Fe!=null&&(tt=Math.max(tt,0),pt=Math.min(pt,Fe.count));const xt=pt-tt;if(xt<0||xt===1/0)return;R.setup(j,se,Ve,ie,Oe);let St,vt=fe;if(Oe!==null&&(St=ve.get(Oe),vt=he,vt.setIndex(St)),j.isMesh)se.wireframe===!0?(Me.setLineWidth(se.wireframeLinewidth*Je()),vt.setMode(ee.LINES)):vt.setMode(ee.TRIANGLES);else if(j.isLine){let et=se.linewidth;et===void 0&&(et=1),Me.setLineWidth(et*Je()),j.isLineSegments?vt.setMode(ee.LINES):j.isLineLoop?vt.setMode(ee.LINE_LOOP):vt.setMode(ee.LINE_STRIP)}else j.isPoints?vt.setMode(ee.POINTS):j.isSprite&&vt.setMode(ee.TRIANGLES);if(j.isBatchedMesh)vt.renderMultiDraw(j._multiDrawStarts,j._multiDrawCounts,j._multiDrawCount);else if(j.isInstancedMesh)vt.renderInstances(tt,xt,j.count);else if(ie.isInstancedBufferGeometry){const et=ie._maxInstanceCount!==void 0?ie._maxInstanceCount:1/0,Wt=Math.min(ie.instanceCount,et);vt.renderInstances(tt,xt,Wt)}else vt.render(tt,xt)};function Se(C,k,ie){C.transparent===!0&&C.side===Wn&&C.forceSinglePass===!1?(C.side=On,C.needsUpdate=!0,Lt(C,k,ie),C.side=Cr,C.needsUpdate=!0,Lt(C,k,ie),C.side=Wn):Lt(C,k,ie)}this.compile=function(C,k,ie=null){ie===null&&(ie=C),m=re.get(ie),m.init(),v.push(m),ie.traverseVisible(function(j){j.isLight&&j.layers.test(k.layers)&&(m.pushLight(j),j.castShadow&&m.pushShadow(j))}),C!==ie&&C.traverseVisible(function(j){j.isLight&&j.layers.test(k.layers)&&(m.pushLight(j),j.castShadow&&m.pushShadow(j))}),m.setupLights(x._useLegacyLights);const se=new Set;return C.traverse(function(j){const Pe=j.material;if(Pe)if(Array.isArray(Pe))for(let Ue=0;Ue<Pe.length;Ue++){const Ve=Pe[Ue];Se(Ve,ie,j),se.add(Ve)}else Se(Pe,ie,j),se.add(Pe)}),v.pop(),m=null,se},this.compileAsync=function(C,k,ie=null){const se=this.compile(C,k,ie);return new Promise(j=>{function Pe(){if(se.forEach(function(Ue){He.get(Ue).currentProgram.isReady()&&se.delete(Ue)}),se.size===0){j(C);return}setTimeout(Pe,10)}Ie.get("KHR_parallel_shader_compile")!==null?Pe():setTimeout(Pe,10)})};let Le=null;function We(C){Le&&Le(C)}function De(){Xe.stop()}function ze(){Xe.start()}const Xe=new Sv;Xe.setAnimationLoop(We),typeof self<"u"&&Xe.setContext(self),this.setAnimationLoop=function(C){Le=C,H.setAnimationLoop(C),C===null?Xe.stop():Xe.start()},H.addEventListener("sessionstart",De),H.addEventListener("sessionend",ze),this.render=function(C,k){if(k!==void 0&&k.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(y===!0)return;C.matrixWorldAutoUpdate===!0&&C.updateMatrixWorld(),k.parent===null&&k.matrixWorldAutoUpdate===!0&&k.updateMatrixWorld(),H.enabled===!0&&H.isPresenting===!0&&(H.cameraAutoUpdate===!0&&H.updateCamera(k),k=H.getCamera()),C.isScene===!0&&C.onBeforeRender(x,C,k,T),m=re.get(C,v.length),m.init(),v.push(m),Ne.multiplyMatrices(k.projectionMatrix,k.matrixWorldInverse),Q.setFromProjectionMatrix(Ne),ye=this.localClippingEnabled,de=ae.init(this.clippingPlanes,ye),_=D.get(C,u.length),_.init(),u.push(_),Qe(C,k,0,x.sortObjects),_.finish(),x.sortObjects===!0&&_.sort(U,J),this.info.render.frame++,de===!0&&ae.beginShadows();const ie=m.state.shadowsArray;if(Z.render(ie,C,k),de===!0&&ae.endShadows(),this.info.autoReset===!0&&this.info.reset(),Ee.render(_,C),m.setupLights(x._useLegacyLights),k.isArrayCamera){const se=k.cameras;for(let j=0,Pe=se.length;j<Pe;j++){const Ue=se[j];ct(_,C,Ue,Ue.viewport)}}else ct(_,C,k);T!==null&&(L.updateMultisampleRenderTarget(T),L.updateRenderTargetMipmap(T)),C.isScene===!0&&C.onAfterRender(x,C,k),R.resetDefaultState(),z=-1,E=null,v.pop(),v.length>0?m=v[v.length-1]:m=null,u.pop(),u.length>0?_=u[u.length-1]:_=null};function Qe(C,k,ie,se){if(C.visible===!1)return;if(C.layers.test(k.layers)){if(C.isGroup)ie=C.renderOrder;else if(C.isLOD)C.autoUpdate===!0&&C.update(k);else if(C.isLight)m.pushLight(C),C.castShadow&&m.pushShadow(C);else if(C.isSprite){if(!C.frustumCulled||Q.intersectsSprite(C)){se&&Ke.setFromMatrixPosition(C.matrixWorld).applyMatrix4(Ne);const Ue=xe.update(C),Ve=C.material;Ve.visible&&_.push(C,Ue,Ve,ie,Ke.z,null)}}else if((C.isMesh||C.isLine||C.isPoints)&&(!C.frustumCulled||Q.intersectsObject(C))){const Ue=xe.update(C),Ve=C.material;if(se&&(C.boundingSphere!==void 0?(C.boundingSphere===null&&C.computeBoundingSphere(),Ke.copy(C.boundingSphere.center)):(Ue.boundingSphere===null&&Ue.computeBoundingSphere(),Ke.copy(Ue.boundingSphere.center)),Ke.applyMatrix4(C.matrixWorld).applyMatrix4(Ne)),Array.isArray(Ve)){const Oe=Ue.groups;for(let Ye=0,qe=Oe.length;Ye<qe;Ye++){const Fe=Oe[Ye],tt=Ve[Fe.materialIndex];tt&&tt.visible&&_.push(C,Ue,tt,ie,Ke.z,Fe)}}else Ve.visible&&_.push(C,Ue,Ve,ie,Ke.z,null)}}const Pe=C.children;for(let Ue=0,Ve=Pe.length;Ue<Ve;Ue++)Qe(Pe[Ue],k,ie,se)}function ct(C,k,ie,se){const j=C.opaque,Pe=C.transmissive,Ue=C.transparent;m.setupLightsView(ie),de===!0&&ae.setGlobalState(x.clippingPlanes,ie),Pe.length>0&&ht(j,Pe,k,ie),se&&Me.viewport(b.copy(se)),j.length>0&&rt(j,k,ie),Pe.length>0&&rt(Pe,k,ie),Ue.length>0&&rt(Ue,k,ie),Me.buffers.depth.setTest(!0),Me.buffers.depth.setMask(!0),Me.buffers.color.setMask(!0),Me.setPolygonOffset(!1)}function ht(C,k,ie,se){if((ie.isScene===!0?ie.overrideMaterial:null)!==null)return;const Pe=Ge.isWebGL2;be===null&&(be=new is(1,1,{generateMipmaps:!0,type:Ie.has("EXT_color_buffer_half_float")?Ma:wr,minFilter:Ea,samples:Pe?4:0})),x.getDrawingBufferSize(Ze),Pe?be.setSize(Ze.x,Ze.y):be.setSize(xf(Ze.x),xf(Ze.y));const Ue=x.getRenderTarget();x.setRenderTarget(be),x.getClearColor(pe),F=x.getClearAlpha(),F<1&&x.setClearColor(16777215,.5),x.clear();const Ve=x.toneMapping;x.toneMapping=Mr,rt(C,ie,se),L.updateMultisampleRenderTarget(be),L.updateRenderTargetMipmap(be);let Oe=!1;for(let Ye=0,qe=k.length;Ye<qe;Ye++){const Fe=k[Ye],tt=Fe.object,pt=Fe.geometry,xt=Fe.material,St=Fe.group;if(xt.side===Wn&&tt.layers.test(se.layers)){const vt=xt.side;xt.side=On,xt.needsUpdate=!0,$e(tt,ie,se,pt,xt,St),xt.side=vt,xt.needsUpdate=!0,Oe=!0}}Oe===!0&&(L.updateMultisampleRenderTarget(be),L.updateRenderTargetMipmap(be)),x.setRenderTarget(Ue),x.setClearColor(pe,F),x.toneMapping=Ve}function rt(C,k,ie){const se=k.isScene===!0?k.overrideMaterial:null;for(let j=0,Pe=C.length;j<Pe;j++){const Ue=C[j],Ve=Ue.object,Oe=Ue.geometry,Ye=se===null?Ue.material:se,qe=Ue.group;Ve.layers.test(ie.layers)&&$e(Ve,k,ie,Oe,Ye,qe)}}function $e(C,k,ie,se,j,Pe){C.onBeforeRender(x,k,ie,se,j,Pe),C.modelViewMatrix.multiplyMatrices(ie.matrixWorldInverse,C.matrixWorld),C.normalMatrix.getNormalMatrix(C.modelViewMatrix),j.onBeforeRender(x,k,ie,se,C,Pe),j.transparent===!0&&j.side===Wn&&j.forceSinglePass===!1?(j.side=On,j.needsUpdate=!0,x.renderBufferDirect(ie,k,se,j,C,Pe),j.side=Cr,j.needsUpdate=!0,x.renderBufferDirect(ie,k,se,j,C,Pe),j.side=Wn):x.renderBufferDirect(ie,k,se,j,C,Pe),C.onAfterRender(x,k,ie,se,j,Pe)}function Lt(C,k,ie){k.isScene!==!0&&(k=je);const se=He.get(C),j=m.state.lights,Pe=m.state.shadowsArray,Ue=j.state.version,Ve=ke.getParameters(C,j.state,Pe,k,ie),Oe=ke.getProgramCacheKey(Ve);let Ye=se.programs;se.environment=C.isMeshStandardMaterial?k.environment:null,se.fog=k.fog,se.envMap=(C.isMeshStandardMaterial?ne:M).get(C.envMap||se.environment),Ye===void 0&&(C.addEventListener("dispose",B),Ye=new Map,se.programs=Ye);let qe=Ye.get(Oe);if(qe!==void 0){if(se.currentProgram===qe&&se.lightsStateVersion===Ue)return Cn(C,Ve),qe}else Ve.uniforms=ke.getUniforms(C),C.onBuild(ie,Ve,x),C.onBeforeCompile(Ve,x),qe=ke.acquireProgram(Ve,Oe),Ye.set(Oe,qe),se.uniforms=Ve.uniforms;const Fe=se.uniforms;return(!C.isShaderMaterial&&!C.isRawShaderMaterial||C.clipping===!0)&&(Fe.clippingPlanes=ae.uniform),Cn(C,Ve),se.needsLights=nt(C),se.lightsStateVersion=Ue,se.needsLights&&(Fe.ambientLightColor.value=j.state.ambient,Fe.lightProbe.value=j.state.probe,Fe.directionalLights.value=j.state.directional,Fe.directionalLightShadows.value=j.state.directionalShadow,Fe.spotLights.value=j.state.spot,Fe.spotLightShadows.value=j.state.spotShadow,Fe.rectAreaLights.value=j.state.rectArea,Fe.ltc_1.value=j.state.rectAreaLTC1,Fe.ltc_2.value=j.state.rectAreaLTC2,Fe.pointLights.value=j.state.point,Fe.pointLightShadows.value=j.state.pointShadow,Fe.hemisphereLights.value=j.state.hemi,Fe.directionalShadowMap.value=j.state.directionalShadowMap,Fe.directionalShadowMatrix.value=j.state.directionalShadowMatrix,Fe.spotShadowMap.value=j.state.spotShadowMap,Fe.spotLightMatrix.value=j.state.spotLightMatrix,Fe.spotLightMap.value=j.state.spotLightMap,Fe.pointShadowMap.value=j.state.pointShadowMap,Fe.pointShadowMatrix.value=j.state.pointShadowMatrix),se.currentProgram=qe,se.uniformsList=null,qe}function Jt(C){if(C.uniformsList===null){const k=C.currentProgram.getUniforms();C.uniformsList=jl.seqWithValue(k.seq,C.uniforms)}return C.uniformsList}function Cn(C,k){const ie=He.get(C);ie.outputColorSpace=k.outputColorSpace,ie.batching=k.batching,ie.instancing=k.instancing,ie.instancingColor=k.instancingColor,ie.skinning=k.skinning,ie.morphTargets=k.morphTargets,ie.morphNormals=k.morphNormals,ie.morphColors=k.morphColors,ie.morphTargetsCount=k.morphTargetsCount,ie.numClippingPlanes=k.numClippingPlanes,ie.numIntersection=k.numClipIntersection,ie.vertexAlphas=k.vertexAlphas,ie.vertexTangents=k.vertexTangents,ie.toneMapping=k.toneMapping}function Rn(C,k,ie,se,j){k.isScene!==!0&&(k=je),L.resetTextureUnits();const Pe=k.fog,Ue=se.isMeshStandardMaterial?k.environment:null,Ve=T===null?x.outputColorSpace:T.isXRRenderTarget===!0?T.texture.colorSpace:qi,Oe=(se.isMeshStandardMaterial?ne:M).get(se.envMap||Ue),Ye=se.vertexColors===!0&&!!ie.attributes.color&&ie.attributes.color.itemSize===4,qe=!!ie.attributes.tangent&&(!!se.normalMap||se.anisotropy>0),Fe=!!ie.morphAttributes.position,tt=!!ie.morphAttributes.normal,pt=!!ie.morphAttributes.color;let xt=Mr;se.toneMapped&&(T===null||T.isXRRenderTarget===!0)&&(xt=x.toneMapping);const St=ie.morphAttributes.position||ie.morphAttributes.normal||ie.morphAttributes.color,vt=St!==void 0?St.length:0,et=He.get(se),Wt=m.state.lights;if(de===!0&&(ye===!0||C!==E)){const gt=C===E&&se.id===z;ae.setState(se,C,gt)}let ft=!1;se.version===et.__version?(et.needsLights&&et.lightsStateVersion!==Wt.state.version||et.outputColorSpace!==Ve||j.isBatchedMesh&&et.batching===!1||!j.isBatchedMesh&&et.batching===!0||j.isInstancedMesh&&et.instancing===!1||!j.isInstancedMesh&&et.instancing===!0||j.isSkinnedMesh&&et.skinning===!1||!j.isSkinnedMesh&&et.skinning===!0||j.isInstancedMesh&&et.instancingColor===!0&&j.instanceColor===null||j.isInstancedMesh&&et.instancingColor===!1&&j.instanceColor!==null||et.envMap!==Oe||se.fog===!0&&et.fog!==Pe||et.numClippingPlanes!==void 0&&(et.numClippingPlanes!==ae.numPlanes||et.numIntersection!==ae.numIntersection)||et.vertexAlphas!==Ye||et.vertexTangents!==qe||et.morphTargets!==Fe||et.morphNormals!==tt||et.morphColors!==pt||et.toneMapping!==xt||Ge.isWebGL2===!0&&et.morphTargetsCount!==vt)&&(ft=!0):(ft=!0,et.__version=se.version);let ln=et.currentProgram;ft===!0&&(ln=Lt(se,k,j));let yi=!1,kn=!1,kt=!1;const Nt=ln.getUniforms(),pn=et.uniforms;if(Me.useProgram(ln.program)&&(yi=!0,kn=!0,kt=!0),se.id!==z&&(z=se.id,kn=!0),yi||E!==C){Nt.setValue(ee,"projectionMatrix",C.projectionMatrix),Nt.setValue(ee,"viewMatrix",C.matrixWorldInverse);const gt=Nt.map.cameraPosition;gt!==void 0&&gt.setValue(ee,Ke.setFromMatrixPosition(C.matrixWorld)),Ge.logarithmicDepthBuffer&&Nt.setValue(ee,"logDepthBufFC",2/(Math.log(C.far+1)/Math.LN2)),(se.isMeshPhongMaterial||se.isMeshToonMaterial||se.isMeshLambertMaterial||se.isMeshBasicMaterial||se.isMeshStandardMaterial||se.isShaderMaterial)&&Nt.setValue(ee,"isOrthographic",C.isOrthographicCamera===!0),E!==C&&(E=C,kn=!0,kt=!0)}if(j.isSkinnedMesh){Nt.setOptional(ee,j,"bindMatrix"),Nt.setOptional(ee,j,"bindMatrixInverse");const gt=j.skeleton;gt&&(Ge.floatVertexTextures?(gt.boneTexture===null&&gt.computeBoneTexture(),Nt.setValue(ee,"boneTexture",gt.boneTexture,L)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}j.isBatchedMesh&&(Nt.setOptional(ee,j,"batchingTexture"),Nt.setValue(ee,"batchingTexture",j._matricesTexture,L));const Ri=ie.morphAttributes;if((Ri.position!==void 0||Ri.normal!==void 0||Ri.color!==void 0&&Ge.isWebGL2===!0)&&$.update(j,ie,ln),(kn||et.receiveShadow!==j.receiveShadow)&&(et.receiveShadow=j.receiveShadow,Nt.setValue(ee,"receiveShadow",j.receiveShadow)),se.isMeshGouraudMaterial&&se.envMap!==null&&(pn.envMap.value=Oe,pn.flipEnvMap.value=Oe.isCubeTexture&&Oe.isRenderTargetTexture===!1?-1:1),kn&&(Nt.setValue(ee,"toneMappingExposure",x.toneMappingExposure),et.needsLights&&Qt(pn,kt),Pe&&se.fog===!0&&Te.refreshFogUniforms(pn,Pe),Te.refreshMaterialUniforms(pn,se,K,te,be),jl.upload(ee,Jt(et),pn,L)),se.isShaderMaterial&&se.uniformsNeedUpdate===!0&&(jl.upload(ee,Jt(et),pn,L),se.uniformsNeedUpdate=!1),se.isSpriteMaterial&&Nt.setValue(ee,"center",j.center),Nt.setValue(ee,"modelViewMatrix",j.modelViewMatrix),Nt.setValue(ee,"normalMatrix",j.normalMatrix),Nt.setValue(ee,"modelMatrix",j.matrixWorld),se.isShaderMaterial||se.isRawShaderMaterial){const gt=se.uniformsGroups;for(let Si=0,Da=gt.length;Si<Da;Si++)if(Ge.isWebGL2){const Ih=gt[Si];I.update(Ih,ln),I.bind(Ih,ln)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return ln}function Qt(C,k){C.ambientLightColor.needsUpdate=k,C.lightProbe.needsUpdate=k,C.directionalLights.needsUpdate=k,C.directionalLightShadows.needsUpdate=k,C.pointLights.needsUpdate=k,C.pointLightShadows.needsUpdate=k,C.spotLights.needsUpdate=k,C.spotLightShadows.needsUpdate=k,C.rectAreaLights.needsUpdate=k,C.hemisphereLights.needsUpdate=k}function nt(C){return C.isMeshLambertMaterial||C.isMeshToonMaterial||C.isMeshPhongMaterial||C.isMeshStandardMaterial||C.isShadowMaterial||C.isShaderMaterial&&C.lights===!0}this.getActiveCubeFace=function(){return A},this.getActiveMipmapLevel=function(){return w},this.getRenderTarget=function(){return T},this.setRenderTargetTextures=function(C,k,ie){He.get(C.texture).__webglTexture=k,He.get(C.depthTexture).__webglTexture=ie;const se=He.get(C);se.__hasExternalTextures=!0,se.__hasExternalTextures&&(se.__autoAllocateDepthBuffer=ie===void 0,se.__autoAllocateDepthBuffer||Ie.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),se.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(C,k){const ie=He.get(C);ie.__webglFramebuffer=k,ie.__useDefaultFramebuffer=k===void 0},this.setRenderTarget=function(C,k=0,ie=0){T=C,A=k,w=ie;let se=!0,j=null,Pe=!1,Ue=!1;if(C){const Oe=He.get(C);Oe.__useDefaultFramebuffer!==void 0?(Me.bindFramebuffer(ee.FRAMEBUFFER,null),se=!1):Oe.__webglFramebuffer===void 0?L.setupRenderTarget(C):Oe.__hasExternalTextures&&L.rebindTextures(C,He.get(C.texture).__webglTexture,He.get(C.depthTexture).__webglTexture);const Ye=C.texture;(Ye.isData3DTexture||Ye.isDataArrayTexture||Ye.isCompressedArrayTexture)&&(Ue=!0);const qe=He.get(C).__webglFramebuffer;C.isWebGLCubeRenderTarget?(Array.isArray(qe[k])?j=qe[k][ie]:j=qe[k],Pe=!0):Ge.isWebGL2&&C.samples>0&&L.useMultisampledRTT(C)===!1?j=He.get(C).__webglMultisampledFramebuffer:Array.isArray(qe)?j=qe[ie]:j=qe,b.copy(C.viewport),V.copy(C.scissor),X=C.scissorTest}else b.copy(O).multiplyScalar(K).floor(),V.copy(le).multiplyScalar(K).floor(),X=ce;if(Me.bindFramebuffer(ee.FRAMEBUFFER,j)&&Ge.drawBuffers&&se&&Me.drawBuffers(C,j),Me.viewport(b),Me.scissor(V),Me.setScissorTest(X),Pe){const Oe=He.get(C.texture);ee.framebufferTexture2D(ee.FRAMEBUFFER,ee.COLOR_ATTACHMENT0,ee.TEXTURE_CUBE_MAP_POSITIVE_X+k,Oe.__webglTexture,ie)}else if(Ue){const Oe=He.get(C.texture),Ye=k||0;ee.framebufferTextureLayer(ee.FRAMEBUFFER,ee.COLOR_ATTACHMENT0,Oe.__webglTexture,ie||0,Ye)}z=-1},this.readRenderTargetPixels=function(C,k,ie,se,j,Pe,Ue){if(!(C&&C.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ve=He.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&Ue!==void 0&&(Ve=Ve[Ue]),Ve){Me.bindFramebuffer(ee.FRAMEBUFFER,Ve);try{const Oe=C.texture,Ye=Oe.format,qe=Oe.type;if(Ye!==mi&&q.convert(Ye)!==ee.getParameter(ee.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const Fe=qe===Ma&&(Ie.has("EXT_color_buffer_half_float")||Ge.isWebGL2&&Ie.has("EXT_color_buffer_float"));if(qe!==wr&&q.convert(qe)!==ee.getParameter(ee.IMPLEMENTATION_COLOR_READ_TYPE)&&!(qe===hr&&(Ge.isWebGL2||Ie.has("OES_texture_float")||Ie.has("WEBGL_color_buffer_float")))&&!Fe){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}k>=0&&k<=C.width-se&&ie>=0&&ie<=C.height-j&&ee.readPixels(k,ie,se,j,q.convert(Ye),q.convert(qe),Pe)}finally{const Oe=T!==null?He.get(T).__webglFramebuffer:null;Me.bindFramebuffer(ee.FRAMEBUFFER,Oe)}}},this.copyFramebufferToTexture=function(C,k,ie=0){const se=Math.pow(2,-ie),j=Math.floor(k.image.width*se),Pe=Math.floor(k.image.height*se);L.setTexture2D(k,0),ee.copyTexSubImage2D(ee.TEXTURE_2D,ie,0,0,C.x,C.y,j,Pe),Me.unbindTexture()},this.copyTextureToTexture=function(C,k,ie,se=0){const j=k.image.width,Pe=k.image.height,Ue=q.convert(ie.format),Ve=q.convert(ie.type);L.setTexture2D(ie,0),ee.pixelStorei(ee.UNPACK_FLIP_Y_WEBGL,ie.flipY),ee.pixelStorei(ee.UNPACK_PREMULTIPLY_ALPHA_WEBGL,ie.premultiplyAlpha),ee.pixelStorei(ee.UNPACK_ALIGNMENT,ie.unpackAlignment),k.isDataTexture?ee.texSubImage2D(ee.TEXTURE_2D,se,C.x,C.y,j,Pe,Ue,Ve,k.image.data):k.isCompressedTexture?ee.compressedTexSubImage2D(ee.TEXTURE_2D,se,C.x,C.y,k.mipmaps[0].width,k.mipmaps[0].height,Ue,k.mipmaps[0].data):ee.texSubImage2D(ee.TEXTURE_2D,se,C.x,C.y,Ue,Ve,k.image),se===0&&ie.generateMipmaps&&ee.generateMipmap(ee.TEXTURE_2D),Me.unbindTexture()},this.copyTextureToTexture3D=function(C,k,ie,se,j=0){if(x.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const Pe=C.max.x-C.min.x+1,Ue=C.max.y-C.min.y+1,Ve=C.max.z-C.min.z+1,Oe=q.convert(se.format),Ye=q.convert(se.type);let qe;if(se.isData3DTexture)L.setTexture3D(se,0),qe=ee.TEXTURE_3D;else if(se.isDataArrayTexture||se.isCompressedArrayTexture)L.setTexture2DArray(se,0),qe=ee.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}ee.pixelStorei(ee.UNPACK_FLIP_Y_WEBGL,se.flipY),ee.pixelStorei(ee.UNPACK_PREMULTIPLY_ALPHA_WEBGL,se.premultiplyAlpha),ee.pixelStorei(ee.UNPACK_ALIGNMENT,se.unpackAlignment);const Fe=ee.getParameter(ee.UNPACK_ROW_LENGTH),tt=ee.getParameter(ee.UNPACK_IMAGE_HEIGHT),pt=ee.getParameter(ee.UNPACK_SKIP_PIXELS),xt=ee.getParameter(ee.UNPACK_SKIP_ROWS),St=ee.getParameter(ee.UNPACK_SKIP_IMAGES),vt=ie.isCompressedTexture?ie.mipmaps[j]:ie.image;ee.pixelStorei(ee.UNPACK_ROW_LENGTH,vt.width),ee.pixelStorei(ee.UNPACK_IMAGE_HEIGHT,vt.height),ee.pixelStorei(ee.UNPACK_SKIP_PIXELS,C.min.x),ee.pixelStorei(ee.UNPACK_SKIP_ROWS,C.min.y),ee.pixelStorei(ee.UNPACK_SKIP_IMAGES,C.min.z),ie.isDataTexture||ie.isData3DTexture?ee.texSubImage3D(qe,j,k.x,k.y,k.z,Pe,Ue,Ve,Oe,Ye,vt.data):ie.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),ee.compressedTexSubImage3D(qe,j,k.x,k.y,k.z,Pe,Ue,Ve,Oe,vt.data)):ee.texSubImage3D(qe,j,k.x,k.y,k.z,Pe,Ue,Ve,Oe,Ye,vt),ee.pixelStorei(ee.UNPACK_ROW_LENGTH,Fe),ee.pixelStorei(ee.UNPACK_IMAGE_HEIGHT,tt),ee.pixelStorei(ee.UNPACK_SKIP_PIXELS,pt),ee.pixelStorei(ee.UNPACK_SKIP_ROWS,xt),ee.pixelStorei(ee.UNPACK_SKIP_IMAGES,St),j===0&&se.generateMipmaps&&ee.generateMipmap(qe),Me.unbindTexture()},this.initTexture=function(C){C.isCubeTexture?L.setTextureCube(C,0):C.isData3DTexture?L.setTexture3D(C,0):C.isDataArrayTexture||C.isCompressedArrayTexture?L.setTexture2DArray(C,0):L.setTexture2D(C,0),Me.unbindTexture()},this.resetState=function(){A=0,w=0,T=null,Me.reset(),R.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Gi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const n=this.getContext();n.drawingBufferColorSpace=e===Eh?"display-p3":"srgb",n.unpackColorSpace=Mt.workingColorSpace===Yc?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===un?Kr:lv}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===Kr?un:qi}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class VT extends Rv{}VT.prototype.isWebGL1Renderer=!0;class Ah{constructor(e,n=25e-5){this.isFogExp2=!0,this.name="",this.color=new ot(e),this.density=n}clone(){return new Ah(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class WT extends an{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,n){return super.copy(e,n),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const n=super.toJSON(e);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(n.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(n.object.backgroundIntensity=this.backgroundIntensity),n}}class jT{constructor(e,n){this.isInterleavedBuffer=!0,this.array=e,this.stride=n,this.count=e!==void 0?e.length/n:0,this.usage=pf,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.version=0,this.uuid=Wi()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.InterleavedBuffer: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,n,i){e*=this.stride,i*=n.stride;for(let r=0,s=this.stride;r<s;r++)this.array[e+r]=n.array[i+r];return this}set(e,n=0){return this.array.set(e,n),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Wi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const n=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(n,this.stride);return i.setUsage(this.usage),i}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Wi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Sn=new N;class Tc{constructor(e,n,i,r=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=n,this.offset=i,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let n=0,i=this.data.count;n<i;n++)Sn.fromBufferAttribute(this,n),Sn.applyMatrix4(e),this.setXYZ(n,Sn.x,Sn.y,Sn.z);return this}applyNormalMatrix(e){for(let n=0,i=this.count;n<i;n++)Sn.fromBufferAttribute(this,n),Sn.applyNormalMatrix(e),this.setXYZ(n,Sn.x,Sn.y,Sn.z);return this}transformDirection(e){for(let n=0,i=this.count;n<i;n++)Sn.fromBufferAttribute(this,n),Sn.transformDirection(e),this.setXYZ(n,Sn.x,Sn.y,Sn.z);return this}setX(e,n){return this.normalized&&(n=wt(n,this.array)),this.data.array[e*this.data.stride+this.offset]=n,this}setY(e,n){return this.normalized&&(n=wt(n,this.array)),this.data.array[e*this.data.stride+this.offset+1]=n,this}setZ(e,n){return this.normalized&&(n=wt(n,this.array)),this.data.array[e*this.data.stride+this.offset+2]=n,this}setW(e,n){return this.normalized&&(n=wt(n,this.array)),this.data.array[e*this.data.stride+this.offset+3]=n,this}getX(e){let n=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(n=ki(n,this.array)),n}getY(e){let n=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(n=ki(n,this.array)),n}getZ(e){let n=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(n=ki(n,this.array)),n}getW(e){let n=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(n=ki(n,this.array)),n}setXY(e,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(n=wt(n,this.array),i=wt(i,this.array)),this.data.array[e+0]=n,this.data.array[e+1]=i,this}setXYZ(e,n,i,r){return e=e*this.data.stride+this.offset,this.normalized&&(n=wt(n,this.array),i=wt(i,this.array),r=wt(r,this.array)),this.data.array[e+0]=n,this.data.array[e+1]=i,this.data.array[e+2]=r,this}setXYZW(e,n,i,r,s){return e=e*this.data.stride+this.offset,this.normalized&&(n=wt(n,this.array),i=wt(i,this.array),r=wt(r,this.array),s=wt(s,this.array)),this.data.array[e+0]=n,this.data.array[e+1]=i,this.data.array[e+2]=r,this.data.array[e+3]=s,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const n=[];for(let i=0;i<this.count;i++){const r=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)n.push(this.data.array[r+s])}return new vi(new this.array.constructor(n),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Tc(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const n=[];for(let i=0;i<this.count;i++){const r=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)n.push(this.data.array[r+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:n,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class Ch extends us{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new ot(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let Rs;const Io=new N,Ls=new N,Ps=new N,Ns=new Ae,Uo=new Ae,Lv=new Ht,El=new N,Oo=new N,Ml=new N,hg=new Ae,id=new Ae,pg=new Ae;class Pv extends an{constructor(e=new Ch){if(super(),this.isSprite=!0,this.type="Sprite",Rs===void 0){Rs=new It;const n=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new jT(n,5);Rs.setIndex([0,1,2,0,2,3]),Rs.setAttribute("position",new Tc(i,3,0,!1)),Rs.setAttribute("uv",new Tc(i,2,3,!1))}this.geometry=Rs,this.material=e,this.center=new Ae(.5,.5)}raycast(e,n){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Ls.setFromMatrixScale(this.matrixWorld),Lv.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Ps.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Ls.multiplyScalar(-Ps.z);const i=this.material.rotation;let r,s;i!==0&&(s=Math.cos(i),r=Math.sin(i));const o=this.center;wl(El.set(-.5,-.5,0),Ps,o,Ls,r,s),wl(Oo.set(.5,-.5,0),Ps,o,Ls,r,s),wl(Ml.set(.5,.5,0),Ps,o,Ls,r,s),hg.set(0,0),id.set(1,0),pg.set(1,1);let a=e.ray.intersectTriangle(El,Oo,Ml,!1,Io);if(a===null&&(wl(Oo.set(-.5,.5,0),Ps,o,Ls,r,s),id.set(0,1),a=e.ray.intersectTriangle(El,Ml,Oo,!1,Io),a===null))return;const l=e.ray.origin.distanceTo(Io);l<e.near||l>e.far||n.push({distance:l,point:Io.clone(),uv:Vn.getInterpolation(Io,El,Oo,Ml,hg,id,pg,new Ae),face:null,object:this})}copy(e,n){return super.copy(e,n),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function wl(t,e,n,i,r,s){Ns.subVectors(t,n).addScalar(.5).multiply(i),r!==void 0?(Uo.x=s*Ns.x-r*Ns.y,Uo.y=r*Ns.x+s*Ns.y):Uo.copy(Ns),t.copy(e),t.x+=Uo.x,t.y+=Uo.y,t.applyMatrix4(Lv)}class Ln extends us{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ot(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const mg=new N,gg=new N,xg=new Ht,rd=new Zc,Tl=new qc;class ir extends an{constructor(e=new It,n=new Ln){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=n,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const n=e.attributes.position,i=[0];for(let r=1,s=n.count;r<s;r++)mg.fromBufferAttribute(n,r-1),gg.fromBufferAttribute(n,r),i[r]=i[r-1],i[r]+=mg.distanceTo(gg);e.setAttribute("lineDistance",new Tt(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,n){const i=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Tl.copy(i.boundingSphere),Tl.applyMatrix4(r),Tl.radius+=s,e.ray.intersectsSphere(Tl)===!1)return;xg.copy(r).invert(),rd.copy(e.ray).applyMatrix4(xg);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=new N,d=new N,f=new N,h=new N,p=this.isLineSegments?2:1,g=i.index,m=i.attributes.position;if(g!==null){const u=Math.max(0,o.start),v=Math.min(g.count,o.start+o.count);for(let x=u,y=v-1;x<y;x+=p){const A=g.getX(x),w=g.getX(x+1);if(c.fromBufferAttribute(m,A),d.fromBufferAttribute(m,w),rd.distanceSqToSegment(c,d,h,f)>l)continue;h.applyMatrix4(this.matrixWorld);const z=e.ray.origin.distanceTo(h);z<e.near||z>e.far||n.push({distance:z,point:f.clone().applyMatrix4(this.matrixWorld),index:x,face:null,faceIndex:null,object:this})}}else{const u=Math.max(0,o.start),v=Math.min(m.count,o.start+o.count);for(let x=u,y=v-1;x<y;x+=p){if(c.fromBufferAttribute(m,x),d.fromBufferAttribute(m,x+1),rd.distanceSqToSegment(c,d,h,f)>l)continue;h.applyMatrix4(this.matrixWorld);const w=e.ray.origin.distanceTo(h);w<e.near||w>e.far||n.push({distance:w,point:f.clone().applyMatrix4(this.matrixWorld),index:x,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}const vg=new N,_g=new N;class Is extends ir{constructor(e,n){super(e,n),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const n=e.attributes.position,i=[];for(let r=0,s=n.count;r<s;r+=2)vg.fromBufferAttribute(n,r),_g.fromBufferAttribute(n,r+1),i[r]=r===0?0:i[r-1],i[r+1]=i[r]+vg.distanceTo(_g);e.setAttribute("lineDistance",new Tt(i,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Qc extends Fn{constructor(e,n,i,r,s,o,a,l,c){super(e,n,i,r,s,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Ci{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,n){const i=this.getUtoTmapping(e);return this.getPoint(i,n)}getPoints(e=5){const n=[];for(let i=0;i<=e;i++)n.push(this.getPoint(i/e));return n}getSpacedPoints(e=5){const n=[];for(let i=0;i<=e;i++)n.push(this.getPointAt(i/e));return n}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const n=[];let i,r=this.getPoint(0),s=0;n.push(0);for(let o=1;o<=e;o++)i=this.getPoint(o/e),s+=i.distanceTo(r),n.push(s),r=i;return this.cacheArcLengths=n,n}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,n){const i=this.getLengths();let r=0;const s=i.length;let o;n?o=n:o=e*i[s-1];let a=0,l=s-1,c;for(;a<=l;)if(r=Math.floor(a+(l-a)/2),c=i[r]-o,c<0)a=r+1;else if(c>0)l=r-1;else{l=r;break}if(r=l,i[r]===o)return r/(s-1);const d=i[r],h=i[r+1]-d,p=(o-d)/h;return(r+p)/(s-1)}getTangent(e,n){let r=e-1e-4,s=e+1e-4;r<0&&(r=0),s>1&&(s=1);const o=this.getPoint(r),a=this.getPoint(s),l=n||(o.isVector2?new Ae:new N);return l.copy(a).sub(o).normalize(),l}getTangentAt(e,n){const i=this.getUtoTmapping(e);return this.getTangent(i,n)}computeFrenetFrames(e,n){const i=new N,r=[],s=[],o=[],a=new N,l=new Ht;for(let p=0;p<=e;p++){const g=p/e;r[p]=this.getTangentAt(g,new N)}s[0]=new N,o[0]=new N;let c=Number.MAX_VALUE;const d=Math.abs(r[0].x),f=Math.abs(r[0].y),h=Math.abs(r[0].z);d<=c&&(c=d,i.set(1,0,0)),f<=c&&(c=f,i.set(0,1,0)),h<=c&&i.set(0,0,1),a.crossVectors(r[0],i).normalize(),s[0].crossVectors(r[0],a),o[0].crossVectors(r[0],s[0]);for(let p=1;p<=e;p++){if(s[p]=s[p-1].clone(),o[p]=o[p-1].clone(),a.crossVectors(r[p-1],r[p]),a.length()>Number.EPSILON){a.normalize();const g=Math.acos(dn(r[p-1].dot(r[p]),-1,1));s[p].applyMatrix4(l.makeRotationAxis(a,g))}o[p].crossVectors(r[p],s[p])}if(n===!0){let p=Math.acos(dn(s[0].dot(s[e]),-1,1));p/=e,r[0].dot(a.crossVectors(s[0],s[e]))>0&&(p=-p);for(let g=1;g<=e;g++)s[g].applyMatrix4(l.makeRotationAxis(r[g],p*g)),o[g].crossVectors(r[g],s[g])}return{tangents:r,normals:s,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class Rh extends Ci{constructor(e=0,n=0,i=1,r=1,s=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=n,this.xRadius=i,this.yRadius=r,this.aStartAngle=s,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(e,n){const i=n||new Ae,r=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const o=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=r;for(;s>r;)s-=r;s<Number.EPSILON&&(o?s=0:s=r),this.aClockwise===!0&&!o&&(s===r?s=-r:s=s-r);const a=this.aStartAngle+e*s;let l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const d=Math.cos(this.aRotation),f=Math.sin(this.aRotation),h=l-this.aX,p=c-this.aY;l=h*d-p*f+this.aX,c=h*f+p*d+this.aY}return i.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class XT extends Rh{constructor(e,n,i,r,s,o){super(e,n,i,i,r,s,o),this.isArcCurve=!0,this.type="ArcCurve"}}function Lh(){let t=0,e=0,n=0,i=0;function r(s,o,a,l){t=s,e=a,n=-3*s+3*o-2*a-l,i=2*s-2*o+a+l}return{initCatmullRom:function(s,o,a,l,c){r(o,a,c*(a-s),c*(l-o))},initNonuniformCatmullRom:function(s,o,a,l,c,d,f){let h=(o-s)/c-(a-s)/(c+d)+(a-o)/d,p=(a-o)/d-(l-o)/(d+f)+(l-a)/f;h*=d,p*=d,r(o,a,h,p)},calc:function(s){const o=s*s,a=o*s;return t+e*s+n*o+i*a}}}const bl=new N,sd=new Lh,od=new Lh,ad=new Lh;class $T extends Ci{constructor(e=[],n=!1,i="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=n,this.curveType=i,this.tension=r}getPoint(e,n=new N){const i=n,r=this.points,s=r.length,o=(s-(this.closed?0:1))*e;let a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/s)+1)*s:l===0&&a===s-1&&(a=s-2,l=1);let c,d;this.closed||a>0?c=r[(a-1)%s]:(bl.subVectors(r[0],r[1]).add(r[0]),c=bl);const f=r[a%s],h=r[(a+1)%s];if(this.closed||a+2<s?d=r[(a+2)%s]:(bl.subVectors(r[s-1],r[s-2]).add(r[s-1]),d=bl),this.curveType==="centripetal"||this.curveType==="chordal"){const p=this.curveType==="chordal"?.5:.25;let g=Math.pow(c.distanceToSquared(f),p),_=Math.pow(f.distanceToSquared(h),p),m=Math.pow(h.distanceToSquared(d),p);_<1e-4&&(_=1),g<1e-4&&(g=_),m<1e-4&&(m=_),sd.initNonuniformCatmullRom(c.x,f.x,h.x,d.x,g,_,m),od.initNonuniformCatmullRom(c.y,f.y,h.y,d.y,g,_,m),ad.initNonuniformCatmullRom(c.z,f.z,h.z,d.z,g,_,m)}else this.curveType==="catmullrom"&&(sd.initCatmullRom(c.x,f.x,h.x,d.x,this.tension),od.initCatmullRom(c.y,f.y,h.y,d.y,this.tension),ad.initCatmullRom(c.z,f.z,h.z,d.z,this.tension));return i.set(sd.calc(l),od.calc(l),ad.calc(l)),i}copy(e){super.copy(e),this.points=[];for(let n=0,i=e.points.length;n<i;n++){const r=e.points[n];this.points.push(r.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let n=0,i=this.points.length;n<i;n++){const r=this.points[n];e.points.push(r.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let n=0,i=e.points.length;n<i;n++){const r=e.points[n];this.points.push(new N().fromArray(r))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function yg(t,e,n,i,r){const s=(i-e)*.5,o=(r-n)*.5,a=t*t,l=t*a;return(2*n-2*i+s+o)*l+(-3*n+3*i-2*s-o)*a+s*t+n}function YT(t,e){const n=1-t;return n*n*e}function qT(t,e){return 2*(1-t)*t*e}function ZT(t,e){return t*t*e}function ta(t,e,n,i){return YT(t,e)+qT(t,n)+ZT(t,i)}function KT(t,e){const n=1-t;return n*n*n*e}function JT(t,e){const n=1-t;return 3*n*n*t*e}function QT(t,e){return 3*(1-t)*t*t*e}function eb(t,e){return t*t*t*e}function na(t,e,n,i,r){return KT(t,e)+JT(t,n)+QT(t,i)+eb(t,r)}class Nv extends Ci{constructor(e=new Ae,n=new Ae,i=new Ae,r=new Ae){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=n,this.v2=i,this.v3=r}getPoint(e,n=new Ae){const i=n,r=this.v0,s=this.v1,o=this.v2,a=this.v3;return i.set(na(e,r.x,s.x,o.x,a.x),na(e,r.y,s.y,o.y,a.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class tb extends Ci{constructor(e=new N,n=new N,i=new N,r=new N){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=n,this.v2=i,this.v3=r}getPoint(e,n=new N){const i=n,r=this.v0,s=this.v1,o=this.v2,a=this.v3;return i.set(na(e,r.x,s.x,o.x,a.x),na(e,r.y,s.y,o.y,a.y),na(e,r.z,s.z,o.z,a.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Dv extends Ci{constructor(e=new Ae,n=new Ae){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=n}getPoint(e,n=new Ae){const i=n;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,n){return this.getPoint(e,n)}getTangent(e,n=new Ae){return n.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,n){return this.getTangent(e,n)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Hn extends Ci{constructor(e=new N,n=new N){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=n}getPoint(e,n=new N){const i=n;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,n){return this.getPoint(e,n)}getTangent(e,n=new N){return n.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,n){return this.getTangent(e,n)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Iv extends Ci{constructor(e=new Ae,n=new Ae,i=new Ae){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=n,this.v2=i}getPoint(e,n=new Ae){const i=n,r=this.v0,s=this.v1,o=this.v2;return i.set(ta(e,r.x,s.x,o.x),ta(e,r.y,s.y,o.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Ph extends Ci{constructor(e=new N,n=new N,i=new N){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=n,this.v2=i}getPoint(e,n=new N){const i=n,r=this.v0,s=this.v1,o=this.v2;return i.set(ta(e,r.x,s.x,o.x),ta(e,r.y,s.y,o.y),ta(e,r.z,s.z,o.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Uv extends Ci{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,n=new Ae){const i=n,r=this.points,s=(r.length-1)*e,o=Math.floor(s),a=s-o,l=r[o===0?o:o-1],c=r[o],d=r[o>r.length-2?r.length-1:o+1],f=r[o>r.length-3?r.length-1:o+2];return i.set(yg(a,l.x,c.x,d.x,f.x),yg(a,l.y,c.y,d.y,f.y)),i}copy(e){super.copy(e),this.points=[];for(let n=0,i=e.points.length;n<i;n++){const r=e.points[n];this.points.push(r.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let n=0,i=this.points.length;n<i;n++){const r=this.points[n];e.points.push(r.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let n=0,i=e.points.length;n<i;n++){const r=e.points[n];this.points.push(new Ae().fromArray(r))}return this}}var _f=Object.freeze({__proto__:null,ArcCurve:XT,CatmullRomCurve3:$T,CubicBezierCurve:Nv,CubicBezierCurve3:tb,EllipseCurve:Rh,LineCurve:Dv,LineCurve3:Hn,QuadraticBezierCurve:Iv,QuadraticBezierCurve3:Ph,SplineCurve:Uv});class Xl extends Ci{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),n=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(n)){const i=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new _f[i](n,e))}return this}getPoint(e,n){const i=e*this.getLength(),r=this.getCurveLengths();let s=0;for(;s<r.length;){if(r[s]>=i){const o=r[s]-i,a=this.curves[s],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,n)}s++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let n=0;for(let i=0,r=this.curves.length;i<r;i++)n+=this.curves[i].getLength(),e.push(n);return this.cacheLengths=e,e}getSpacedPoints(e=40){const n=[];for(let i=0;i<=e;i++)n.push(this.getPoint(i/e));return this.autoClose&&n.push(n[0]),n}getPoints(e=12){const n=[];let i;for(let r=0,s=this.curves;r<s.length;r++){const o=s[r],a=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,l=o.getPoints(a);for(let c=0;c<l.length;c++){const d=l[c];i&&i.equals(d)||(n.push(d),i=d)}}return this.autoClose&&n.length>1&&!n[n.length-1].equals(n[0])&&n.push(n[0]),n}copy(e){super.copy(e),this.curves=[];for(let n=0,i=e.curves.length;n<i;n++){const r=e.curves[n];this.curves.push(r.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let n=0,i=this.curves.length;n<i;n++){const r=this.curves[n];e.curves.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let n=0,i=e.curves.length;n<i;n++){const r=e.curves[n];this.curves.push(new _f[r.type]().fromJSON(r))}return this}}class Sg extends Xl{constructor(e){super(),this.type="Path",this.currentPoint=new Ae,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let n=1,i=e.length;n<i;n++)this.lineTo(e[n].x,e[n].y);return this}moveTo(e,n){return this.currentPoint.set(e,n),this}lineTo(e,n){const i=new Dv(this.currentPoint.clone(),new Ae(e,n));return this.curves.push(i),this.currentPoint.set(e,n),this}quadraticCurveTo(e,n,i,r){const s=new Iv(this.currentPoint.clone(),new Ae(e,n),new Ae(i,r));return this.curves.push(s),this.currentPoint.set(i,r),this}bezierCurveTo(e,n,i,r,s,o){const a=new Nv(this.currentPoint.clone(),new Ae(e,n),new Ae(i,r),new Ae(s,o));return this.curves.push(a),this.currentPoint.set(s,o),this}splineThru(e){const n=[this.currentPoint.clone()].concat(e),i=new Uv(n);return this.curves.push(i),this.currentPoint.copy(e[e.length-1]),this}arc(e,n,i,r,s,o){const a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+a,n+l,i,r,s,o),this}absarc(e,n,i,r,s,o){return this.absellipse(e,n,i,i,r,s,o),this}ellipse(e,n,i,r,s,o,a,l){const c=this.currentPoint.x,d=this.currentPoint.y;return this.absellipse(e+c,n+d,i,r,s,o,a,l),this}absellipse(e,n,i,r,s,o,a,l){const c=new Rh(e,n,i,r,s,o,a,l);if(this.curves.length>0){const f=c.getPoint(0);f.equals(this.currentPoint)||this.lineTo(f.x,f.y)}this.curves.push(c);const d=c.getPoint(1);return this.currentPoint.copy(d),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class ro extends It{constructor(e=1,n=1,i=1,r=32,s=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:n,height:i,radialSegments:r,heightSegments:s,openEnded:o,thetaStart:a,thetaLength:l};const c=this;r=Math.floor(r),s=Math.floor(s);const d=[],f=[],h=[],p=[];let g=0;const _=[],m=i/2;let u=0;v(),o===!1&&(e>0&&x(!0),n>0&&x(!1)),this.setIndex(d),this.setAttribute("position",new Tt(f,3)),this.setAttribute("normal",new Tt(h,3)),this.setAttribute("uv",new Tt(p,2));function v(){const y=new N,A=new N;let w=0;const T=(n-e)/i;for(let z=0;z<=s;z++){const E=[],b=z/s,V=b*(n-e)+e;for(let X=0;X<=r;X++){const pe=X/r,F=pe*l+a,W=Math.sin(F),te=Math.cos(F);A.x=V*W,A.y=-b*i+m,A.z=V*te,f.push(A.x,A.y,A.z),y.set(W,T,te).normalize(),h.push(y.x,y.y,y.z),p.push(pe,1-b),E.push(g++)}_.push(E)}for(let z=0;z<r;z++)for(let E=0;E<s;E++){const b=_[E][z],V=_[E+1][z],X=_[E+1][z+1],pe=_[E][z+1];d.push(b,V,pe),d.push(V,X,pe),w+=6}c.addGroup(u,w,0),u+=w}function x(y){const A=g,w=new Ae,T=new N;let z=0;const E=y===!0?e:n,b=y===!0?1:-1;for(let X=1;X<=r;X++)f.push(0,m*b,0),h.push(0,b,0),p.push(.5,.5),g++;const V=g;for(let X=0;X<=r;X++){const F=X/r*l+a,W=Math.cos(F),te=Math.sin(F);T.x=E*te,T.y=m*b,T.z=E*W,f.push(T.x,T.y,T.z),h.push(0,b,0),w.x=W*.5+.5,w.y=te*.5*b+.5,p.push(w.x,w.y),g++}for(let X=0;X<r;X++){const pe=A+X,F=V+X;y===!0?d.push(F,F+1,pe):d.push(F+1,F,pe),z+=3}c.addGroup(u,z,y===!0?1:2),u+=z}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ro(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Nh extends ro{constructor(e=1,n=1,i=32,r=1,s=!1,o=0,a=Math.PI*2){super(0,e,n,i,r,s,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:n,radialSegments:i,heightSegments:r,openEnded:s,thetaStart:o,thetaLength:a}}static fromJSON(e){return new Nh(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}const Al=new N,Cl=new N,ld=new N,Rl=new Vn;class Fo extends It{constructor(e=null,n=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:n},e!==null){const r=Math.pow(10,4),s=Math.cos(Qo*n),o=e.getIndex(),a=e.getAttribute("position"),l=o?o.count:a.count,c=[0,0,0],d=["a","b","c"],f=new Array(3),h={},p=[];for(let g=0;g<l;g+=3){o?(c[0]=o.getX(g),c[1]=o.getX(g+1),c[2]=o.getX(g+2)):(c[0]=g,c[1]=g+1,c[2]=g+2);const{a:_,b:m,c:u}=Rl;if(_.fromBufferAttribute(a,c[0]),m.fromBufferAttribute(a,c[1]),u.fromBufferAttribute(a,c[2]),Rl.getNormal(ld),f[0]=`${Math.round(_.x*r)},${Math.round(_.y*r)},${Math.round(_.z*r)}`,f[1]=`${Math.round(m.x*r)},${Math.round(m.y*r)},${Math.round(m.z*r)}`,f[2]=`${Math.round(u.x*r)},${Math.round(u.y*r)},${Math.round(u.z*r)}`,!(f[0]===f[1]||f[1]===f[2]||f[2]===f[0]))for(let v=0;v<3;v++){const x=(v+1)%3,y=f[v],A=f[x],w=Rl[d[v]],T=Rl[d[x]],z=`${y}_${A}`,E=`${A}_${y}`;E in h&&h[E]?(ld.dot(h[E].normal)<=s&&(p.push(w.x,w.y,w.z),p.push(T.x,T.y,T.z)),h[E]=null):z in h||(h[z]={index0:c[v],index1:c[x],normal:ld.clone()})}}for(const g in h)if(h[g]){const{index0:_,index1:m}=h[g];Al.fromBufferAttribute(a,_),Cl.fromBufferAttribute(a,m),p.push(Al.x,Al.y,Al.z),p.push(Cl.x,Cl.y,Cl.z)}this.setAttribute("position",new Tt(p,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}class yf extends Sg{constructor(e){super(e),this.uuid=Wi(),this.type="Shape",this.holes=[]}getPointsHoles(e){const n=[];for(let i=0,r=this.holes.length;i<r;i++)n[i]=this.holes[i].getPoints(e);return n}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let n=0,i=e.holes.length;n<i;n++){const r=e.holes[n];this.holes.push(r.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let n=0,i=this.holes.length;n<i;n++){const r=this.holes[n];e.holes.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let n=0,i=e.holes.length;n<i;n++){const r=e.holes[n];this.holes.push(new Sg().fromJSON(r))}return this}}const nb={triangulate:function(t,e,n=2){const i=e&&e.length,r=i?e[0]*n:t.length;let s=Ov(t,0,r,n,!0);const o=[];if(!s||s.next===s.prev)return o;let a,l,c,d,f,h,p;if(i&&(s=ab(t,e,s,n)),t.length>80*n){a=c=t[0],l=d=t[1];for(let g=n;g<r;g+=n)f=t[g],h=t[g+1],f<a&&(a=f),h<l&&(l=h),f>c&&(c=f),h>d&&(d=h);p=Math.max(c-a,d-l),p=p!==0?32767/p:0}return wa(s,o,n,a,l,p,0),o}};function Ov(t,e,n,i,r){let s,o;if(r===vb(t,e,n,i)>0)for(s=e;s<n;s+=i)o=Eg(s,t[s],t[s+1],o);else for(s=n-i;s>=e;s-=i)o=Eg(s,t[s],t[s+1],o);return o&&eu(o,o.next)&&(ba(o),o=o.next),o}function os(t,e){if(!t)return t;e||(e=t);let n=t,i;do if(i=!1,!n.steiner&&(eu(n,n.next)||Ut(n.prev,n,n.next)===0)){if(ba(n),n=e=n.prev,n===n.next)break;i=!0}else n=n.next;while(i||n!==e);return e}function wa(t,e,n,i,r,s,o){if(!t)return;!o&&s&&fb(t,i,r,s);let a=t,l,c;for(;t.prev!==t.next;){if(l=t.prev,c=t.next,s?rb(t,i,r,s):ib(t)){e.push(l.i/n|0),e.push(t.i/n|0),e.push(c.i/n|0),ba(t),t=c.next,a=c.next;continue}if(t=c,t===a){o?o===1?(t=sb(os(t),e,n),wa(t,e,n,i,r,s,2)):o===2&&ob(t,e,n,i,r,s):wa(os(t),e,n,i,r,s,1);break}}}function ib(t){const e=t.prev,n=t,i=t.next;if(Ut(e,n,i)>=0)return!1;const r=e.x,s=n.x,o=i.x,a=e.y,l=n.y,c=i.y,d=r<s?r<o?r:o:s<o?s:o,f=a<l?a<c?a:c:l<c?l:c,h=r>s?r>o?r:o:s>o?s:o,p=a>l?a>c?a:c:l>c?l:c;let g=i.next;for(;g!==e;){if(g.x>=d&&g.x<=h&&g.y>=f&&g.y<=p&&qs(r,a,s,l,o,c,g.x,g.y)&&Ut(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function rb(t,e,n,i){const r=t.prev,s=t,o=t.next;if(Ut(r,s,o)>=0)return!1;const a=r.x,l=s.x,c=o.x,d=r.y,f=s.y,h=o.y,p=a<l?a<c?a:c:l<c?l:c,g=d<f?d<h?d:h:f<h?f:h,_=a>l?a>c?a:c:l>c?l:c,m=d>f?d>h?d:h:f>h?f:h,u=Sf(p,g,e,n,i),v=Sf(_,m,e,n,i);let x=t.prevZ,y=t.nextZ;for(;x&&x.z>=u&&y&&y.z<=v;){if(x.x>=p&&x.x<=_&&x.y>=g&&x.y<=m&&x!==r&&x!==o&&qs(a,d,l,f,c,h,x.x,x.y)&&Ut(x.prev,x,x.next)>=0||(x=x.prevZ,y.x>=p&&y.x<=_&&y.y>=g&&y.y<=m&&y!==r&&y!==o&&qs(a,d,l,f,c,h,y.x,y.y)&&Ut(y.prev,y,y.next)>=0))return!1;y=y.nextZ}for(;x&&x.z>=u;){if(x.x>=p&&x.x<=_&&x.y>=g&&x.y<=m&&x!==r&&x!==o&&qs(a,d,l,f,c,h,x.x,x.y)&&Ut(x.prev,x,x.next)>=0)return!1;x=x.prevZ}for(;y&&y.z<=v;){if(y.x>=p&&y.x<=_&&y.y>=g&&y.y<=m&&y!==r&&y!==o&&qs(a,d,l,f,c,h,y.x,y.y)&&Ut(y.prev,y,y.next)>=0)return!1;y=y.nextZ}return!0}function sb(t,e,n){let i=t;do{const r=i.prev,s=i.next.next;!eu(r,s)&&Fv(r,i,i.next,s)&&Ta(r,s)&&Ta(s,r)&&(e.push(r.i/n|0),e.push(i.i/n|0),e.push(s.i/n|0),ba(i),ba(i.next),i=t=s),i=i.next}while(i!==t);return os(i)}function ob(t,e,n,i,r,s){let o=t;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&mb(o,a)){let l=kv(o,a);o=os(o,o.next),l=os(l,l.next),wa(o,e,n,i,r,s,0),wa(l,e,n,i,r,s,0);return}a=a.next}o=o.next}while(o!==t)}function ab(t,e,n,i){const r=[];let s,o,a,l,c;for(s=0,o=e.length;s<o;s++)a=e[s]*i,l=s<o-1?e[s+1]*i:t.length,c=Ov(t,a,l,i,!1),c===c.next&&(c.steiner=!0),r.push(pb(c));for(r.sort(lb),s=0;s<r.length;s++)n=cb(r[s],n);return n}function lb(t,e){return t.x-e.x}function cb(t,e){const n=ub(t,e);if(!n)return e;const i=kv(n,t);return os(i,i.next),os(n,n.next)}function ub(t,e){let n=e,i=-1/0,r;const s=t.x,o=t.y;do{if(o<=n.y&&o>=n.next.y&&n.next.y!==n.y){const h=n.x+(o-n.y)*(n.next.x-n.x)/(n.next.y-n.y);if(h<=s&&h>i&&(i=h,r=n.x<n.next.x?n:n.next,h===s))return r}n=n.next}while(n!==e);if(!r)return null;const a=r,l=r.x,c=r.y;let d=1/0,f;n=r;do s>=n.x&&n.x>=l&&s!==n.x&&qs(o<c?s:i,o,l,c,o<c?i:s,o,n.x,n.y)&&(f=Math.abs(o-n.y)/(s-n.x),Ta(n,t)&&(f<d||f===d&&(n.x>r.x||n.x===r.x&&db(r,n)))&&(r=n,d=f)),n=n.next;while(n!==a);return r}function db(t,e){return Ut(t.prev,t,e.prev)<0&&Ut(e.next,t,t.next)<0}function fb(t,e,n,i){let r=t;do r.z===0&&(r.z=Sf(r.x,r.y,e,n,i)),r.prevZ=r.prev,r.nextZ=r.next,r=r.next;while(r!==t);r.prevZ.nextZ=null,r.prevZ=null,hb(r)}function hb(t){let e,n,i,r,s,o,a,l,c=1;do{for(n=t,t=null,s=null,o=0;n;){for(o++,i=n,a=0,e=0;e<c&&(a++,i=i.nextZ,!!i);e++);for(l=c;a>0||l>0&&i;)a!==0&&(l===0||!i||n.z<=i.z)?(r=n,n=n.nextZ,a--):(r=i,i=i.nextZ,l--),s?s.nextZ=r:t=r,r.prevZ=s,s=r;n=i}s.nextZ=null,c*=2}while(o>1);return t}function Sf(t,e,n,i,r){return t=(t-n)*r|0,e=(e-i)*r|0,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,t|e<<1}function pb(t){let e=t,n=t;do(e.x<n.x||e.x===n.x&&e.y<n.y)&&(n=e),e=e.next;while(e!==t);return n}function qs(t,e,n,i,r,s,o,a){return(r-o)*(e-a)>=(t-o)*(s-a)&&(t-o)*(i-a)>=(n-o)*(e-a)&&(n-o)*(s-a)>=(r-o)*(i-a)}function mb(t,e){return t.next.i!==e.i&&t.prev.i!==e.i&&!gb(t,e)&&(Ta(t,e)&&Ta(e,t)&&xb(t,e)&&(Ut(t.prev,t,e.prev)||Ut(t,e.prev,e))||eu(t,e)&&Ut(t.prev,t,t.next)>0&&Ut(e.prev,e,e.next)>0)}function Ut(t,e,n){return(e.y-t.y)*(n.x-e.x)-(e.x-t.x)*(n.y-e.y)}function eu(t,e){return t.x===e.x&&t.y===e.y}function Fv(t,e,n,i){const r=Pl(Ut(t,e,n)),s=Pl(Ut(t,e,i)),o=Pl(Ut(n,i,t)),a=Pl(Ut(n,i,e));return!!(r!==s&&o!==a||r===0&&Ll(t,n,e)||s===0&&Ll(t,i,e)||o===0&&Ll(n,t,i)||a===0&&Ll(n,e,i))}function Ll(t,e,n){return e.x<=Math.max(t.x,n.x)&&e.x>=Math.min(t.x,n.x)&&e.y<=Math.max(t.y,n.y)&&e.y>=Math.min(t.y,n.y)}function Pl(t){return t>0?1:t<0?-1:0}function gb(t,e){let n=t;do{if(n.i!==t.i&&n.next.i!==t.i&&n.i!==e.i&&n.next.i!==e.i&&Fv(n,n.next,t,e))return!0;n=n.next}while(n!==t);return!1}function Ta(t,e){return Ut(t.prev,t,t.next)<0?Ut(t,e,t.next)>=0&&Ut(t,t.prev,e)>=0:Ut(t,e,t.prev)<0||Ut(t,t.next,e)<0}function xb(t,e){let n=t,i=!1;const r=(t.x+e.x)/2,s=(t.y+e.y)/2;do n.y>s!=n.next.y>s&&n.next.y!==n.y&&r<(n.next.x-n.x)*(s-n.y)/(n.next.y-n.y)+n.x&&(i=!i),n=n.next;while(n!==t);return i}function kv(t,e){const n=new Ef(t.i,t.x,t.y),i=new Ef(e.i,e.x,e.y),r=t.next,s=e.prev;return t.next=e,e.prev=t,n.next=r,r.prev=n,i.next=n,n.prev=i,s.next=i,i.prev=s,i}function Eg(t,e,n,i){const r=new Ef(t,e,n);return i?(r.next=i.next,r.prev=i,i.next.prev=r,i.next=r):(r.prev=r,r.next=r),r}function ba(t){t.next.prev=t.prev,t.prev.next=t.next,t.prevZ&&(t.prevZ.nextZ=t.nextZ),t.nextZ&&(t.nextZ.prevZ=t.prevZ)}function Ef(t,e,n){this.i=t,this.x=e,this.y=n,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function vb(t,e,n,i){let r=0;for(let s=e,o=n-i;s<n;s+=i)r+=(t[o]-t[s])*(t[s+1]+t[o+1]),o=s;return r}class ia{static area(e){const n=e.length;let i=0;for(let r=n-1,s=0;s<n;r=s++)i+=e[r].x*e[s].y-e[s].x*e[r].y;return i*.5}static isClockWise(e){return ia.area(e)<0}static triangulateShape(e,n){const i=[],r=[],s=[];Mg(e),wg(i,e);let o=e.length;n.forEach(Mg);for(let l=0;l<n.length;l++)r.push(o),o+=n[l].length,wg(i,n[l]);const a=nb.triangulate(i,r);for(let l=0;l<a.length;l+=3)s.push(a.slice(l,l+3));return s}}function Mg(t){const e=t.length;e>2&&t[e-1].equals(t[0])&&t.pop()}function wg(t,e){for(let n=0;n<e.length;n++)t.push(e[n].x),t.push(e[n].y)}class bc extends It{constructor(e=.5,n=1,i=32,r=1,s=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:n,thetaSegments:i,phiSegments:r,thetaStart:s,thetaLength:o},i=Math.max(3,i),r=Math.max(1,r);const a=[],l=[],c=[],d=[];let f=e;const h=(n-e)/r,p=new N,g=new Ae;for(let _=0;_<=r;_++){for(let m=0;m<=i;m++){const u=s+m/i*o;p.x=f*Math.cos(u),p.y=f*Math.sin(u),l.push(p.x,p.y,p.z),c.push(0,0,1),g.x=(p.x/n+1)/2,g.y=(p.y/n+1)/2,d.push(g.x,g.y)}f+=h}for(let _=0;_<r;_++){const m=_*(i+1);for(let u=0;u<i;u++){const v=u+m,x=v,y=v+i+1,A=v+i+2,w=v+1;a.push(x,y,w),a.push(y,A,w)}}this.setIndex(a),this.setAttribute("position",new Tt(l,3)),this.setAttribute("normal",new Tt(c,3)),this.setAttribute("uv",new Tt(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new bc(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class Ac extends It{constructor(e=new yf([new Ae(0,.5),new Ae(-.5,-.5),new Ae(.5,-.5)]),n=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:n};const i=[],r=[],s=[],o=[];let a=0,l=0;if(Array.isArray(e)===!1)c(e);else for(let d=0;d<e.length;d++)c(e[d]),this.addGroup(a,l,d),a+=l,l=0;this.setIndex(i),this.setAttribute("position",new Tt(r,3)),this.setAttribute("normal",new Tt(s,3)),this.setAttribute("uv",new Tt(o,2));function c(d){const f=r.length/3,h=d.extractPoints(n);let p=h.shape;const g=h.holes;ia.isClockWise(p)===!1&&(p=p.reverse());for(let m=0,u=g.length;m<u;m++){const v=g[m];ia.isClockWise(v)===!0&&(g[m]=v.reverse())}const _=ia.triangulateShape(p,g);for(let m=0,u=g.length;m<u;m++){const v=g[m];p=p.concat(v)}for(let m=0,u=p.length;m<u;m++){const v=p[m];r.push(v.x,v.y,0),s.push(0,0,1),o.push(v.x,v.y)}for(let m=0,u=_.length;m<u;m++){const v=_[m],x=v[0]+f,y=v[1]+f,A=v[2]+f;i.push(x,y,A),l+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),n=this.parameters.shapes;return _b(n,e)}static fromJSON(e,n){const i=[];for(let r=0,s=e.shapes.length;r<s;r++){const o=n[e.shapes[r]];i.push(o)}return new Ac(i,e.curveSegments)}}function _b(t,e){if(e.shapes=[],Array.isArray(t))for(let n=0,i=t.length;n<i;n++){const r=t[n];e.shapes.push(r.uuid)}else e.shapes.push(t.uuid);return e}class Vr extends It{constructor(e=1,n=32,i=16,r=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:n,heightSegments:i,phiStart:r,phiLength:s,thetaStart:o,thetaLength:a},n=Math.max(3,Math.floor(n)),i=Math.max(2,Math.floor(i));const l=Math.min(o+a,Math.PI);let c=0;const d=[],f=new N,h=new N,p=[],g=[],_=[],m=[];for(let u=0;u<=i;u++){const v=[],x=u/i;let y=0;u===0&&o===0?y=.5/n:u===i&&l===Math.PI&&(y=-.5/n);for(let A=0;A<=n;A++){const w=A/n;f.x=-e*Math.cos(r+w*s)*Math.sin(o+x*a),f.y=e*Math.cos(o+x*a),f.z=e*Math.sin(r+w*s)*Math.sin(o+x*a),g.push(f.x,f.y,f.z),h.copy(f).normalize(),_.push(h.x,h.y,h.z),m.push(w+y,1-x),v.push(c++)}d.push(v)}for(let u=0;u<i;u++)for(let v=0;v<n;v++){const x=d[u][v+1],y=d[u][v],A=d[u+1][v],w=d[u+1][v+1];(u!==0||o>0)&&p.push(x,y,w),(u!==i-1||l<Math.PI)&&p.push(y,A,w)}this.setIndex(p),this.setAttribute("position",new Tt(g,3)),this.setAttribute("normal",new Tt(_,3)),this.setAttribute("uv",new Tt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Vr(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class ar extends It{constructor(e=new Ph(new N(-1,-1,0),new N(-1,1,0),new N(1,1,0)),n=64,i=1,r=8,s=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:n,radius:i,radialSegments:r,closed:s};const o=e.computeFrenetFrames(n,s);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;const a=new N,l=new N,c=new Ae;let d=new N;const f=[],h=[],p=[],g=[];_(),this.setIndex(g),this.setAttribute("position",new Tt(f,3)),this.setAttribute("normal",new Tt(h,3)),this.setAttribute("uv",new Tt(p,2));function _(){for(let x=0;x<n;x++)m(x);m(s===!1?n:0),v(),u()}function m(x){d=e.getPointAt(x/n,d);const y=o.normals[x],A=o.binormals[x];for(let w=0;w<=r;w++){const T=w/r*Math.PI*2,z=Math.sin(T),E=-Math.cos(T);l.x=E*y.x+z*A.x,l.y=E*y.y+z*A.y,l.z=E*y.z+z*A.z,l.normalize(),h.push(l.x,l.y,l.z),a.x=d.x+i*l.x,a.y=d.y+i*l.y,a.z=d.z+i*l.z,f.push(a.x,a.y,a.z)}}function u(){for(let x=1;x<=n;x++)for(let y=1;y<=r;y++){const A=(r+1)*(x-1)+(y-1),w=(r+1)*x+(y-1),T=(r+1)*x+y,z=(r+1)*(x-1)+y;g.push(A,w,z),g.push(w,T,z)}}function v(){for(let x=0;x<=n;x++)for(let y=0;y<=r;y++)c.x=x/n,c.y=y/r,p.push(c.x,c.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new ar(new _f[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}}class ko extends us{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new ot(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ot(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=cv,this.normalScale=new Ae(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class zv extends an{constructor(e,n=1){super(),this.isLight=!0,this.type="Light",this.color=new ot(e),this.intensity=n}dispose(){}copy(e,n){return super.copy(e,n),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const n=super.toJSON(e);return n.object.color=this.color.getHex(),n.object.intensity=this.intensity,this.groundColor!==void 0&&(n.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(n.object.distance=this.distance),this.angle!==void 0&&(n.object.angle=this.angle),this.decay!==void 0&&(n.object.decay=this.decay),this.penumbra!==void 0&&(n.object.penumbra=this.penumbra),this.shadow!==void 0&&(n.object.shadow=this.shadow.toJSON()),n}}const cd=new Ht,Tg=new N,bg=new N;class yb{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ae(512,512),this.map=null,this.mapPass=null,this.matrix=new Ht,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new wh,this._frameExtents=new Ae(1,1),this._viewportCount=1,this._viewports=[new sn(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const n=this.camera,i=this.matrix;Tg.setFromMatrixPosition(e.matrixWorld),n.position.copy(Tg),bg.setFromMatrixPosition(e.target.matrixWorld),n.lookAt(bg),n.updateMatrixWorld(),cd.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(cd),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(cd)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class Sb extends yb{constructor(){super(new Ev(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Ag extends zv{constructor(e,n){super(e,n),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(an.DEFAULT_UP),this.updateMatrix(),this.target=new an,this.shadow=new Sb}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class Eb extends zv{constructor(e,n){super(e,n),this.isAmbientLight=!0,this.type="AmbientLight"}}class Mb{constructor(e,n,i=0,r=1/0){this.ray=new Zc(e,n),this.near=i,this.far=r,this.camera=null,this.layers=new Mh,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,n){this.ray.set(e,n)}setFromCamera(e,n){n.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(n.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(n).sub(this.ray.origin).normalize(),this.camera=n):n.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(n.near+n.far)/(n.near-n.far)).unproject(n),this.ray.direction.set(0,0,-1).transformDirection(n.matrixWorld),this.camera=n):console.error("THREE.Raycaster: Unsupported camera type: "+n.type)}intersectObject(e,n=!0,i=[]){return Mf(e,this,i,n),i.sort(Cg),i}intersectObjects(e,n=!0,i=[]){for(let r=0,s=e.length;r<s;r++)Mf(e[r],this,i,n);return i.sort(Cg),i}}function Cg(t,e){return t.distance-e.distance}function Mf(t,e,n,i){if(t.layers.test(e.layers)&&t.raycast(e,n),i===!0){const r=t.children;for(let s=0,o=r.length;s<o;s++)Mf(r[s],e,n,!0)}}class Rg{constructor(e=1,n=0,i=0){return this.radius=e,this.phi=n,this.theta=i,this}set(e,n,i){return this.radius=e,this.phi=n,this.theta=i,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,n,i){return this.radius=Math.sqrt(e*e+n*n+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,i),this.phi=Math.acos(dn(n/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class Lg extends Is{constructor(e=10,n=10,i=4473924,r=8947848){i=new ot(i),r=new ot(r);const s=n/2,o=e/n,a=e/2,l=[],c=[];for(let h=0,p=0,g=-a;h<=n;h++,g+=o){l.push(-a,0,g,a,0,g),l.push(g,0,-a,g,0,a);const _=h===s?i:r;_.toArray(c,p),p+=3,_.toArray(c,p),p+=3,_.toArray(c,p),p+=3,_.toArray(c,p),p+=3}const d=new It;d.setAttribute("position",new Tt(l,3)),d.setAttribute("color",new Tt(c,3));const f=new Ln({vertexColors:!0,toneMapped:!1});super(d,f),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:yh}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=yh);const Pg={type:"change"},ud={type:"start"},Ng={type:"end"},Nl=new Zc,Dg=new or,wb=Math.cos(70*FE.DEG2RAD);class Tb extends cs{constructor(e,n){super(),this.object=e,this.domElement=n,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new N,this.cursor=new N,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:nn.ROTATE,MIDDLE:nn.DOLLY,RIGHT:nn.PAN},this.touches={ONE:fs.ROTATE,TWO:fs.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return a.phi},this.getAzimuthalAngle=function(){return a.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(R){R.addEventListener("keydown",re),this._domElementKeyEvents=R},this.stopListenToKeyEvents=function(){this._domElementKeyEvents.removeEventListener("keydown",re),this._domElementKeyEvents=null},this.saveState=function(){i.target0.copy(i.target),i.position0.copy(i.object.position),i.zoom0=i.object.zoom},this.reset=function(){i.target.copy(i.target0),i.object.position.copy(i.position0),i.object.zoom=i.zoom0,i.object.updateProjectionMatrix(),i.dispatchEvent(Pg),i.update(),s=r.NONE},this.update=function(){const R=new N,I=new rs().setFromUnitVectors(e.up,new N(0,1,0)),G=I.clone().invert(),H=new N,Y=new rs,P=new N,ue=2*Math.PI;return function(oe=null){const me=i.object.position;R.copy(me).sub(i.target),R.applyQuaternion(I),a.setFromVector3(R),i.autoRotate&&s===r.NONE&&X(b(oe)),i.enableDamping?(a.theta+=l.theta*i.dampingFactor,a.phi+=l.phi*i.dampingFactor):(a.theta+=l.theta,a.phi+=l.phi);let Se=i.minAzimuthAngle,Le=i.maxAzimuthAngle;isFinite(Se)&&isFinite(Le)&&(Se<-Math.PI?Se+=ue:Se>Math.PI&&(Se-=ue),Le<-Math.PI?Le+=ue:Le>Math.PI&&(Le-=ue),Se<=Le?a.theta=Math.max(Se,Math.min(Le,a.theta)):a.theta=a.theta>(Se+Le)/2?Math.max(Se,a.theta):Math.min(Le,a.theta)),a.phi=Math.max(i.minPolarAngle,Math.min(i.maxPolarAngle,a.phi)),a.makeSafe(),i.enableDamping===!0?i.target.addScaledVector(d,i.dampingFactor):i.target.add(d),i.target.sub(i.cursor),i.target.clampLength(i.minTargetRadius,i.maxTargetRadius),i.target.add(i.cursor),i.zoomToCursor&&w||i.object.isOrthographicCamera?a.radius=O(a.radius):a.radius=O(a.radius*c),R.setFromSpherical(a),R.applyQuaternion(G),me.copy(i.target).add(R),i.object.lookAt(i.target),i.enableDamping===!0?(l.theta*=1-i.dampingFactor,l.phi*=1-i.dampingFactor,d.multiplyScalar(1-i.dampingFactor)):(l.set(0,0,0),d.set(0,0,0));let We=!1;if(i.zoomToCursor&&w){let De=null;if(i.object.isPerspectiveCamera){const ze=R.length();De=O(ze*c);const Xe=ze-De;i.object.position.addScaledVector(y,Xe),i.object.updateMatrixWorld()}else if(i.object.isOrthographicCamera){const ze=new N(A.x,A.y,0);ze.unproject(i.object),i.object.zoom=Math.max(i.minZoom,Math.min(i.maxZoom,i.object.zoom/c)),i.object.updateProjectionMatrix(),We=!0;const Xe=new N(A.x,A.y,0);Xe.unproject(i.object),i.object.position.sub(Xe).add(ze),i.object.updateMatrixWorld(),De=R.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),i.zoomToCursor=!1;De!==null&&(this.screenSpacePanning?i.target.set(0,0,-1).transformDirection(i.object.matrix).multiplyScalar(De).add(i.object.position):(Nl.origin.copy(i.object.position),Nl.direction.set(0,0,-1).transformDirection(i.object.matrix),Math.abs(i.object.up.dot(Nl.direction))<wb?e.lookAt(i.target):(Dg.setFromNormalAndCoplanarPoint(i.object.up,i.target),Nl.intersectPlane(Dg,i.target))))}else i.object.isOrthographicCamera&&(i.object.zoom=Math.max(i.minZoom,Math.min(i.maxZoom,i.object.zoom/c)),i.object.updateProjectionMatrix(),We=!0);return c=1,w=!1,We||H.distanceToSquared(i.object.position)>o||8*(1-Y.dot(i.object.quaternion))>o||P.distanceToSquared(i.target)>0?(i.dispatchEvent(Pg),H.copy(i.object.position),Y.copy(i.object.quaternion),P.copy(i.target),!0):!1}}(),this.dispose=function(){i.domElement.removeEventListener("contextmenu",Ee),i.domElement.removeEventListener("pointerdown",L),i.domElement.removeEventListener("pointercancel",ne),i.domElement.removeEventListener("wheel",xe),i.domElement.removeEventListener("pointermove",M),i.domElement.removeEventListener("pointerup",ne),i._domElementKeyEvents!==null&&(i._domElementKeyEvents.removeEventListener("keydown",re),i._domElementKeyEvents=null)};const i=this,r={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let s=r.NONE;const o=1e-6,a=new Rg,l=new Rg;let c=1;const d=new N,f=new Ae,h=new Ae,p=new Ae,g=new Ae,_=new Ae,m=new Ae,u=new Ae,v=new Ae,x=new Ae,y=new N,A=new Ae;let w=!1;const T=[],z={};let E=!1;function b(R){return R!==null?2*Math.PI/60*i.autoRotateSpeed*R:2*Math.PI/60/60*i.autoRotateSpeed}function V(R){const I=Math.abs(R*.01);return Math.pow(.95,i.zoomSpeed*I)}function X(R){l.theta-=R}function pe(R){l.phi-=R}const F=function(){const R=new N;return function(G,H){R.setFromMatrixColumn(H,0),R.multiplyScalar(-G),d.add(R)}}(),W=function(){const R=new N;return function(G,H){i.screenSpacePanning===!0?R.setFromMatrixColumn(H,1):(R.setFromMatrixColumn(H,0),R.crossVectors(i.object.up,R)),R.multiplyScalar(G),d.add(R)}}(),te=function(){const R=new N;return function(G,H){const Y=i.domElement;if(i.object.isPerspectiveCamera){const P=i.object.position;R.copy(P).sub(i.target);let ue=R.length();ue*=Math.tan(i.object.fov/2*Math.PI/180),F(2*G*ue/Y.clientHeight,i.object.matrix),W(2*H*ue/Y.clientHeight,i.object.matrix)}else i.object.isOrthographicCamera?(F(G*(i.object.right-i.object.left)/i.object.zoom/Y.clientWidth,i.object.matrix),W(H*(i.object.top-i.object.bottom)/i.object.zoom/Y.clientHeight,i.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),i.enablePan=!1)}}();function K(R){i.object.isPerspectiveCamera||i.object.isOrthographicCamera?c/=R:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),i.enableZoom=!1)}function U(R){i.object.isPerspectiveCamera||i.object.isOrthographicCamera?c*=R:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),i.enableZoom=!1)}function J(R,I){if(!i.zoomToCursor)return;w=!0;const G=i.domElement.getBoundingClientRect(),H=R-G.left,Y=I-G.top,P=G.width,ue=G.height;A.x=H/P*2-1,A.y=-(Y/ue)*2+1,y.set(A.x,A.y,1).unproject(i.object).sub(i.object.position).normalize()}function O(R){return Math.max(i.minDistance,Math.min(i.maxDistance,R))}function le(R){f.set(R.clientX,R.clientY)}function ce(R){J(R.clientX,R.clientX),u.set(R.clientX,R.clientY)}function Q(R){g.set(R.clientX,R.clientY)}function de(R){h.set(R.clientX,R.clientY),p.subVectors(h,f).multiplyScalar(i.rotateSpeed);const I=i.domElement;X(2*Math.PI*p.x/I.clientHeight),pe(2*Math.PI*p.y/I.clientHeight),f.copy(h),i.update()}function ye(R){v.set(R.clientX,R.clientY),x.subVectors(v,u),x.y>0?K(V(x.y)):x.y<0&&U(V(x.y)),u.copy(v),i.update()}function be(R){_.set(R.clientX,R.clientY),m.subVectors(_,g).multiplyScalar(i.panSpeed),te(m.x,m.y),g.copy(_),i.update()}function Ne(R){J(R.clientX,R.clientY),R.deltaY<0?U(V(R.deltaY)):R.deltaY>0&&K(V(R.deltaY)),i.update()}function Ze(R){let I=!1;switch(R.code){case i.keys.UP:R.ctrlKey||R.metaKey||R.shiftKey?pe(2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):te(0,i.keyPanSpeed),I=!0;break;case i.keys.BOTTOM:R.ctrlKey||R.metaKey||R.shiftKey?pe(-2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):te(0,-i.keyPanSpeed),I=!0;break;case i.keys.LEFT:R.ctrlKey||R.metaKey||R.shiftKey?X(2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):te(i.keyPanSpeed,0),I=!0;break;case i.keys.RIGHT:R.ctrlKey||R.metaKey||R.shiftKey?X(-2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):te(-i.keyPanSpeed,0),I=!0;break}I&&(R.preventDefault(),i.update())}function Ke(R){if(T.length===1)f.set(R.pageX,R.pageY);else{const I=q(R),G=.5*(R.pageX+I.x),H=.5*(R.pageY+I.y);f.set(G,H)}}function je(R){if(T.length===1)g.set(R.pageX,R.pageY);else{const I=q(R),G=.5*(R.pageX+I.x),H=.5*(R.pageY+I.y);g.set(G,H)}}function Je(R){const I=q(R),G=R.pageX-I.x,H=R.pageY-I.y,Y=Math.sqrt(G*G+H*H);u.set(0,Y)}function ee(R){i.enableZoom&&Je(R),i.enablePan&&je(R)}function at(R){i.enableZoom&&Je(R),i.enableRotate&&Ke(R)}function Ie(R){if(T.length==1)h.set(R.pageX,R.pageY);else{const G=q(R),H=.5*(R.pageX+G.x),Y=.5*(R.pageY+G.y);h.set(H,Y)}p.subVectors(h,f).multiplyScalar(i.rotateSpeed);const I=i.domElement;X(2*Math.PI*p.x/I.clientHeight),pe(2*Math.PI*p.y/I.clientHeight),f.copy(h)}function Ge(R){if(T.length===1)_.set(R.pageX,R.pageY);else{const I=q(R),G=.5*(R.pageX+I.x),H=.5*(R.pageY+I.y);_.set(G,H)}m.subVectors(_,g).multiplyScalar(i.panSpeed),te(m.x,m.y),g.copy(_)}function Me(R){const I=q(R),G=R.pageX-I.x,H=R.pageY-I.y,Y=Math.sqrt(G*G+H*H);v.set(0,Y),x.set(0,Math.pow(v.y/u.y,i.zoomSpeed)),K(x.y),u.copy(v);const P=(R.pageX+I.x)*.5,ue=(R.pageY+I.y)*.5;J(P,ue)}function dt(R){i.enableZoom&&Me(R),i.enablePan&&Ge(R)}function He(R){i.enableZoom&&Me(R),i.enableRotate&&Ie(R)}function L(R){i.enabled!==!1&&(T.length===0&&(i.domElement.setPointerCapture(R.pointerId),i.domElement.addEventListener("pointermove",M),i.domElement.addEventListener("pointerup",ne)),$(R),R.pointerType==="touch"?ae(R):ve(R))}function M(R){i.enabled!==!1&&(R.pointerType==="touch"?Z(R):ge(R))}function ne(R){fe(R),T.length===0&&(i.domElement.releasePointerCapture(R.pointerId),i.domElement.removeEventListener("pointermove",M),i.domElement.removeEventListener("pointerup",ne)),i.dispatchEvent(Ng),s=r.NONE}function ve(R){let I;switch(R.button){case 0:I=i.mouseButtons.LEFT;break;case 1:I=i.mouseButtons.MIDDLE;break;case 2:I=i.mouseButtons.RIGHT;break;default:I=-1}switch(I){case nn.DOLLY:if(i.enableZoom===!1)return;ce(R),s=r.DOLLY;break;case nn.ROTATE:if(R.ctrlKey||R.metaKey||R.shiftKey){if(i.enablePan===!1)return;Q(R),s=r.PAN}else{if(i.enableRotate===!1)return;le(R),s=r.ROTATE}break;case nn.PAN:if(R.ctrlKey||R.metaKey||R.shiftKey){if(i.enableRotate===!1)return;le(R),s=r.ROTATE}else{if(i.enablePan===!1)return;Q(R),s=r.PAN}break;default:s=r.NONE}s!==r.NONE&&i.dispatchEvent(ud)}function ge(R){switch(s){case r.ROTATE:if(i.enableRotate===!1)return;de(R);break;case r.DOLLY:if(i.enableZoom===!1)return;ye(R);break;case r.PAN:if(i.enablePan===!1)return;be(R);break}}function xe(R){i.enabled===!1||i.enableZoom===!1||s!==r.NONE||(R.preventDefault(),i.dispatchEvent(ud),Ne(ke(R)),i.dispatchEvent(Ng))}function ke(R){const I=R.deltaMode,G={clientX:R.clientX,clientY:R.clientY,deltaY:R.deltaY};switch(I){case 1:G.deltaY*=16;break;case 2:G.deltaY*=100;break}return R.ctrlKey&&!E&&(G.deltaY*=10),G}function Te(R){R.key==="Control"&&(E=!0,document.addEventListener("keyup",D,{passive:!0,capture:!0}))}function D(R){R.key==="Control"&&(E=!1,document.removeEventListener("keyup",D,{passive:!0,capture:!0}))}function re(R){i.enabled===!1||i.enablePan===!1||Ze(R)}function ae(R){switch(he(R),T.length){case 1:switch(i.touches.ONE){case fs.ROTATE:if(i.enableRotate===!1)return;Ke(R),s=r.TOUCH_ROTATE;break;case fs.PAN:if(i.enablePan===!1)return;je(R),s=r.TOUCH_PAN;break;default:s=r.NONE}break;case 2:switch(i.touches.TWO){case fs.DOLLY_PAN:if(i.enableZoom===!1&&i.enablePan===!1)return;ee(R),s=r.TOUCH_DOLLY_PAN;break;case fs.DOLLY_ROTATE:if(i.enableZoom===!1&&i.enableRotate===!1)return;at(R),s=r.TOUCH_DOLLY_ROTATE;break;default:s=r.NONE}break;default:s=r.NONE}s!==r.NONE&&i.dispatchEvent(ud)}function Z(R){switch(he(R),s){case r.TOUCH_ROTATE:if(i.enableRotate===!1)return;Ie(R),i.update();break;case r.TOUCH_PAN:if(i.enablePan===!1)return;Ge(R),i.update();break;case r.TOUCH_DOLLY_PAN:if(i.enableZoom===!1&&i.enablePan===!1)return;dt(R),i.update();break;case r.TOUCH_DOLLY_ROTATE:if(i.enableZoom===!1&&i.enableRotate===!1)return;He(R),i.update();break;default:s=r.NONE}}function Ee(R){i.enabled!==!1&&R.preventDefault()}function $(R){T.push(R.pointerId)}function fe(R){delete z[R.pointerId];for(let I=0;I<T.length;I++)if(T[I]==R.pointerId){T.splice(I,1);return}}function he(R){let I=z[R.pointerId];I===void 0&&(I=new Ae,z[R.pointerId]=I),I.set(R.pageX,R.pageY)}function q(R){const I=R.pointerId===T[0]?T[1]:T[0];return z[I]}i.domElement.addEventListener("contextmenu",Ee),i.domElement.addEventListener("pointerdown",L),i.domElement.addEventListener("pointercancel",ne),i.domElement.addEventListener("wheel",xe,{passive:!1}),document.addEventListener("keydown",Te,{passive:!0,capture:!0}),this.update()}}/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bb=t=>t.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),Bv=(...t)=>t.filter((e,n,i)=>!!e&&e.trim()!==""&&i.indexOf(e)===n).join(" ").trim();/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var Ab={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Cb=we.forwardRef(({color:t="currentColor",size:e=24,strokeWidth:n=2,absoluteStrokeWidth:i,className:r="",children:s,iconNode:o,...a},l)=>we.createElement("svg",{ref:l,...Ab,width:e,height:e,stroke:t,strokeWidth:i?Number(n)*24/Number(e):n,className:Bv("lucide",r),...a},[...o.map(([c,d])=>we.createElement(c,d)),...Array.isArray(s)?s:[s]]));/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const it=(t,e)=>{const n=we.forwardRef(({className:i,...r},s)=>we.createElement(Cb,{ref:s,iconNode:e,className:Bv(`lucide-${bb(t)}`,i),...r}));return n.displayName=`${t}`,n};/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Rb=[["path",{d:"M12 5v14",key:"s699le"}],["path",{d:"m19 12-7 7-7-7",key:"1idqje"}]],Lb=it("ArrowDown",Rb);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Pb=[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]],Nb=it("ArrowLeft",Pb);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Db=[["path",{d:"m16 3 4 4-4 4",key:"1x1c3m"}],["path",{d:"M20 7H4",key:"zbl0bi"}],["path",{d:"m8 21-4-4 4-4",key:"h9nckh"}],["path",{d:"M4 17h16",key:"g4d7ey"}]],Ib=it("ArrowRightLeft",Db);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ub=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]],Ob=it("ArrowRight",Ub);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Fb=[["path",{d:"m5 12 7-7 7 7",key:"hav0vg"}],["path",{d:"M12 19V5",key:"x0mq9r"}]],kb=it("ArrowUp",Fb);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zb=[["path",{d:"M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z",key:"hh9hay"}],["path",{d:"m3.3 7 8.7 5 8.7-5",key:"g66t2b"}],["path",{d:"M12 22V12",key:"d0xqtd"}]],Bb=it("Box",zb);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Hb=[["path",{d:"M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z",key:"1b4qmf"}],["path",{d:"M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2",key:"i71pzd"}],["path",{d:"M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2",key:"10jefs"}],["path",{d:"M10 6h4",key:"1itunk"}],["path",{d:"M10 10h4",key:"tcdvrf"}],["path",{d:"M10 14h4",key:"kelpxr"}],["path",{d:"M10 18h4",key:"1ulq68"}]],Gb=it("Building2",Hb);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Vb=[["path",{d:"M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z",key:"1tc9qg"}],["circle",{cx:"12",cy:"13",r:"3",key:"1vg3eu"}]],Hv=it("Camera",Vb);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Wb=[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]],jb=it("ChevronDown",Wb);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xb=[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]],Dh=it("ChevronLeft",Xb);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $b=[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]],Cc=it("ChevronRight",$b);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Yb=[["path",{d:"m18 15-6-6-6 6",key:"153udz"}]],qb=it("ChevronUp",Yb);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Zb=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]],Kb=it("CircleCheck",Zb);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Jb=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3",key:"1u773s"}],["path",{d:"M12 17h.01",key:"p32p05"}]],Qb=it("CircleHelp",Jb);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const eA=[["path",{d:"m18 16 4-4-4-4",key:"1inbqp"}],["path",{d:"m6 8-4 4 4 4",key:"15zrgr"}],["path",{d:"m14.5 4-5 16",key:"e7oirm"}]],Gv=it("CodeXml",eA);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const tA=[["path",{d:"m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z",key:"9ktpf1"}],["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]],nA=it("Compass",tA);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const iA=[["rect",{width:"16",height:"16",x:"4",y:"4",rx:"2",key:"14l7u7"}],["rect",{width:"6",height:"6",x:"9",y:"9",rx:"1",key:"5aljv4"}],["path",{d:"M15 2v2",key:"13l42r"}],["path",{d:"M15 20v2",key:"15mkzm"}],["path",{d:"M2 15h2",key:"1gxd5l"}],["path",{d:"M2 9h2",key:"1bbxkp"}],["path",{d:"M20 15h2",key:"19e6y8"}],["path",{d:"M20 9h2",key:"19tzq7"}],["path",{d:"M9 2v2",key:"165o2o"}],["path",{d:"M9 20v2",key:"i2bqo8"}]],rA=it("Cpu",iA);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const sA=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"22",x2:"18",y1:"12",y2:"12",key:"l9bcsi"}],["line",{x1:"6",x2:"2",y1:"12",y2:"12",key:"13hhkx"}],["line",{x1:"12",x2:"12",y1:"6",y2:"2",key:"10w3f3"}],["line",{x1:"12",x2:"12",y1:"22",y2:"18",key:"15g9kq"}]],Vv=it("Crosshair",sA);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const oA=[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["polyline",{points:"7 10 12 15 17 10",key:"2ggqvy"}],["line",{x1:"12",x2:"12",y1:"15",y2:"3",key:"1vk2je"}]],Wv=it("Download",oA);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const aA=[["path",{d:"m15 15 6 6",key:"1s409w"}],["path",{d:"m15 9 6-6",key:"ko1vev"}],["path",{d:"M21 16.2V21h-4.8",key:"1hrera"}],["path",{d:"M21 7.8V3h-4.8",key:"ul1q53"}],["path",{d:"M3 16.2V21h4.8",key:"1x04uo"}],["path",{d:"m3 21 6-6",key:"wwnumi"}],["path",{d:"M3 7.8V3h4.8",key:"1ijppm"}],["path",{d:"M9 9 3 3",key:"v551iv"}]],lA=it("Expand",aA);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const cA=[["path",{d:"M15 3h6v6",key:"1q9fwt"}],["path",{d:"M10 14 21 3",key:"gplh6r"}],["path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",key:"a6xqqp"}]],jv=it("ExternalLink",cA);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const uA=[["path",{d:"M10 12v-1",key:"v7bkov"}],["path",{d:"M10 18v-2",key:"1cjy8d"}],["path",{d:"M10 7V6",key:"dljcrl"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M15.5 22H18a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v16a2 2 0 0 0 .274 1.01",key:"gkbcor"}],["circle",{cx:"10",cy:"20",r:"2",key:"1xzdoj"}]],dA=it("FileArchive",uA);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fA=[["path",{d:"M10 12.5 8 15l2 2.5",key:"1tg20x"}],["path",{d:"m14 12.5 2 2.5-2 2.5",key:"yinavb"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z",key:"1mlx9k"}]],hA=it("FileCode",fA);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pA=[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M10 9H8",key:"b1mrlr"}],["path",{d:"M16 13H8",key:"t4e002"}],["path",{d:"M16 17H8",key:"z1uh3a"}]],mA=it("FileText",pA);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gA=[["line",{x1:"6",x2:"6",y1:"3",y2:"15",key:"17qcm7"}],["circle",{cx:"18",cy:"6",r:"3",key:"1h7g24"}],["circle",{cx:"6",cy:"18",r:"3",key:"fqmcym"}],["path",{d:"M18 9a9 9 0 0 1-9 9",key:"n2h4wq"}]],xA=it("GitBranch",gA);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vA=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20",key:"13o1zl"}],["path",{d:"M2 12h20",key:"9i4pu4"}]],_A=it("Globe",vA);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yA=[["path",{d:"M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2",key:"1fvzgz"}],["path",{d:"M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2",key:"1kc0my"}],["path",{d:"M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8",key:"10h0bg"}],["path",{d:"M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15",key:"1s1gnw"}]],SA=it("Hand",yA);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const EA=[["path",{d:"M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",key:"c3ymky"}]],Xv=it("Heart",EA);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const MA=[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}],["path",{d:"M12 7v5l4 2",key:"1fdv2h"}]],wA=it("History",MA);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const TA=[["path",{d:"M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z",key:"zw3jo"}],["path",{d:"M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12",key:"1wduqc"}],["path",{d:"M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17",key:"kqbvx6"}]],$v=it("Layers",TA);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bA=[["path",{d:"M9 17H7A5 5 0 0 1 7 7h2",key:"8i5ue5"}],["path",{d:"M15 7h2a5 5 0 1 1 0 10h-2",key:"1b9ql8"}],["line",{x1:"8",x2:"16",y1:"12",y2:"12",key:"1jonct"}]],Yv=it("Link2",bA);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const AA=[["polyline",{points:"15 3 21 3 21 9",key:"mznyad"}],["polyline",{points:"9 21 3 21 3 15",key:"1avn1i"}],["line",{x1:"21",x2:"14",y1:"3",y2:"10",key:"ota7mn"}],["line",{x1:"3",x2:"10",y1:"21",y2:"14",key:"1atl0r"}]],CA=it("Maximize2",AA);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const RA=[["path",{d:"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",key:"1lielz"}],["path",{d:"M12 7v6",key:"lw1j43"}],["path",{d:"M9 10h6",key:"9gxzsh"}]],Ig=it("MessageSquarePlus",RA);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const LA=[["path",{d:"M14 4.1 12 6",key:"ita8i4"}],["path",{d:"m5.1 8-2.9-.8",key:"1go3kf"}],["path",{d:"m6 12-1.9 2",key:"mnht97"}],["path",{d:"M7.2 2.2 8 5.1",key:"1cfko1"}],["path",{d:"M9.037 9.69a.498.498 0 0 1 .653-.653l11 4.5a.5.5 0 0 1-.074.949l-4.349 1.041a1 1 0 0 0-.74.739l-1.04 4.35a.5.5 0 0 1-.95.074z",key:"s0h3yz"}]],PA=it("MousePointerClick",LA);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const NA=[["path",{d:"M12 2v20",key:"t6zp3m"}],["path",{d:"m15 19-3 3-3-3",key:"11eu04"}],["path",{d:"m19 9 3 3-3 3",key:"1mg7y2"}],["path",{d:"M2 12h20",key:"9i4pu4"}],["path",{d:"m5 9-3 3 3 3",key:"j64kie"}],["path",{d:"m9 5 3-3 3 3",key:"l8vdw6"}]],DA=it("Move",NA);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const IA=[["rect",{x:"16",y:"16",width:"6",height:"6",rx:"1",key:"4q2zg0"}],["rect",{x:"2",y:"16",width:"6",height:"6",rx:"1",key:"8cvhb9"}],["rect",{x:"9",y:"2",width:"6",height:"6",rx:"1",key:"1egb70"}],["path",{d:"M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3",key:"1jsf9p"}],["path",{d:"M12 12V8",key:"2874zd"}]],UA=it("Network",IA);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const OA=[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}]],qv=it("RotateCcw",OA);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const FA=[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]],kA=it("Search",FA);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zA=[["line",{x1:"4",x2:"4",y1:"21",y2:"14",key:"1p332r"}],["line",{x1:"4",x2:"4",y1:"10",y2:"3",key:"gb41h5"}],["line",{x1:"12",x2:"12",y1:"21",y2:"12",key:"hf2csr"}],["line",{x1:"12",x2:"12",y1:"8",y2:"3",key:"1kfi7u"}],["line",{x1:"20",x2:"20",y1:"21",y2:"16",key:"1lhrwl"}],["line",{x1:"20",x2:"20",y1:"12",y2:"3",key:"16vvfq"}],["line",{x1:"2",x2:"6",y1:"14",y2:"14",key:"1uebub"}],["line",{x1:"10",x2:"14",y1:"8",y2:"8",key:"1yglbp"}],["line",{x1:"18",x2:"22",y1:"16",y2:"16",key:"1jxqpz"}]],BA=it("SlidersVertical",zA);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const HA=[["path",{d:"M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z",key:"vktsd0"}],["circle",{cx:"7.5",cy:"7.5",r:".5",fill:"currentColor",key:"kqv944"}]],GA=it("Tag",HA);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const VA=[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]],dd=it("Trash2",VA);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const WA=[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["polyline",{points:"17 8 12 3 7 8",key:"t8dd8p"}],["line",{x1:"12",x2:"12",y1:"3",y2:"15",key:"widbto"}]],Rc=it("Upload",WA);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jA=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]],Zv=it("X",jA);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const XA=[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["line",{x1:"21",x2:"16.65",y1:"21",y2:"16.65",key:"13gj7c"}],["line",{x1:"11",x2:"11",y1:"8",y2:"14",key:"1vmskp"}],["line",{x1:"8",x2:"14",y1:"11",y2:"11",key:"durymu"}]],Kv=it("ZoomIn",XA);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $A=[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["line",{x1:"21",x2:"16.65",y1:"21",y2:"16.65",key:"13gj7c"}],["line",{x1:"8",x2:"14",y1:"11",y2:"11",key:"durymu"}]],Jv=it("ZoomOut",$A),Qv=({allNodes:t,onSelectFocusNode:e})=>{const[n,i]=we.useState(""),[r,s]=we.useState(!1),[o,a]=we.useState(0),l=we.useRef(null),c=we.useMemo(()=>{const f=t.filter(p=>p.kind===Re.CLASS||p.kind===Re.FUNCTION||p.kind===Re.RECURSION),h=n.trim().toLowerCase();return h?f.filter(p=>p.symbolName.toLowerCase().includes(h)||p.label.toLowerCase().includes(h)||p.className.toLowerCase().includes(h)||p.fileName.toLowerCase().includes(h)).slice(0,10):f.slice(0,8)},[t,n]);we.useEffect(()=>{const f=h=>{l.current&&!l.current.contains(h.target)&&s(!1)};return window.addEventListener("mousedown",f),()=>window.removeEventListener("mousedown",f)},[]);const d=f=>{i(f.symbolName),s(!1),e(f)};return S.jsxs("div",{ref:l,onMouseDown:f=>f.stopPropagation(),className:"relative flex items-center",children:[r&&c.length>0&&S.jsxs("div",{className:"absolute bottom-full left-0 mb-1.5 w-72 bg-[#0D0D13] border border-[#E5A93C]/80 rounded shadow-2xl overflow-hidden z-50",children:[S.jsxs("div",{className:"px-2.5 py-1 bg-[#16161F] border-b border-zinc-800 text-[10px] font-sans uppercase tracking-wider text-[#F7D794] font-semibold flex items-center justify-between",children:[S.jsx("span",{children:"Matching Functions & Classes"}),S.jsxs("span",{className:"text-zinc-500",children:[c.length," hits"]})]}),S.jsx("div",{className:"max-h-56 overflow-y-auto divide-y divide-zinc-800/70",children:c.map((f,h)=>{const p=h===o,g=f.kind===Re.CLASS;return S.jsxs("button",{type:"button",onMouseEnter:()=>a(h),onClick:()=>d(f),className:`w-full px-2.5 py-1.5 text-left flex items-center justify-between gap-2 transition ${p?"bg-[#231B0E] text-[#F7D794]":"hover:bg-zinc-900 text-zinc-200"}`,children:[S.jsxs("div",{className:"min-w-0",children:[S.jsxs("div",{className:"font-mono text-xs font-semibold truncate flex items-center gap-1.5",children:[S.jsx(Vv,{className:"w-3 h-3 text-[#E5A93C] shrink-0"}),S.jsx("span",{className:"truncate",children:g?f.symbolName:`${f.symbolName}()`})]}),S.jsxs("div",{className:"font-sans text-[10px] text-zinc-400 truncate pl-4",children:[f.fileName," • L",f.lineStart]})]}),S.jsx("span",{className:`shrink-0 text-[9.5px] font-mono px-1.5 py-0.5 rounded border ${g?"bg-[#281E10] text-[#F7D794] border-[#E5A93C]/60":"bg-zinc-900 text-sky-300 border-zinc-700"}`,children:g?"CLASS":"FN"})]},f.id)})})]}),S.jsxs("div",{className:"flex items-center bg-[#14141C] border border-zinc-700 focus-within:border-[#E5A93C] rounded px-2 py-1 w-52 sm:w-60",children:[S.jsx(kA,{className:"w-3.5 h-3.5 text-[#E5A93C] shrink-0 mr-1.5"}),S.jsx("input",{type:"text",value:n,onFocus:()=>{s(!0),a(0)},onChange:f=>{i(f.target.value),s(!0),a(0)},onKeyDown:f=>{f.key==="ArrowDown"?(f.preventDefault(),a(h=>Math.min(c.length-1,h+1))):f.key==="ArrowUp"?(f.preventDefault(),a(h=>Math.max(0,h-1))):f.key==="Enter"&&c[o]?(f.preventDefault(),d(c[o])):f.key==="Escape"&&s(!1)},placeholder:"Search Function / Class...",className:"bg-transparent text-xs font-sans text-zinc-100 placeholder-zinc-500 focus:outline-none w-full"}),n&&S.jsx("button",{type:"button",onClick:()=>{i(""),s(!0)},className:"text-zinc-400 hover:text-zinc-200 ml-1",title:"Clear search",children:S.jsx(Zv,{className:"w-3 h-3"})})]})]})};function Ds(t,e,n,i=14,r=3.6){const s=document.createElement("canvas");s.width=512,s.height=128;const o=s.getContext("2d");o&&(o.fillStyle="rgba(12, 12, 18, 0.92)",o.fillRect(8,8,496,112),o.strokeStyle=n,o.lineWidth=4,o.strokeRect(8,8,496,112),o.fillStyle="#F7D794",o.font="bold 34px sans-serif",o.fillText(t.slice(0,26),26,56),o.fillStyle="#D4D4D8",o.font="23px monospace",o.fillText(e.slice(0,34),26,96));const a=new Qc(s),l=new Ch({map:a,transparent:!0}),c=new Pv(l);return c.scale.set(i,r,1),c}function fd(t=4.6){const e=document.createElement("canvas");e.width=160,e.height=160;const n=e.getContext("2d");n&&(n.fillStyle="#0284C7",n.fillRect(10,34,140,92),n.strokeStyle="#E0F2FE",n.lineWidth=8,n.strokeRect(10,34,140,92),n.fillStyle="#FFFFFF",n.font="bold 42px monospace",n.textAlign="center",n.textBaseline="middle",n.fillText("LOOP",80,82));const i=new Qc(e),r=new Ch({map:i,transparent:!0}),s=new Pv(r);return s.scale.set(t,t,1),s}function YA(t,e,n){const i=document.createElement("canvas");i.width=256,i.height=256;const r=i.getContext("2d");return r&&(r.clearRect(0,0,256,256),r.beginPath(),r.arc(128,128,116,0,Math.PI*2),r.fillStyle=e,r.fill(),r.lineWidth=8,r.strokeStyle=n,r.stroke(),r.fillStyle="#FFFFFF",r.font="bold 26px sans-serif",r.textAlign="center",r.textBaseline="middle",r.fillText(t.slice(0,16),128,128)),new Qc(i)}function qA(t){const e=document.createElement("canvas");e.width=128,e.height=256;const n=e.getContext("2d");if(n){n.fillStyle="#0D1017",n.fillRect(0,0,128,256),n.strokeStyle="#1E2430",n.lineWidth=2,n.strokeRect(2,2,124,252);for(let r=12;r<244;r+=18)for(let s=12;s<116;s+=20){const o=(r*7+s*13)%5!==0;n.fillStyle=o?t:"#151922",n.globalAlpha=o?.72:.4,n.fillRect(s,r,12,10)}n.globalAlpha=1}const i=new Qc(e);return i.wrapS=Sa,i.wrapT=Sa,i}function ZA(t,e){return e||t>=7?{hexNum:15680580,hexStr:"#EF4444"}:t>=4?{hexNum:16096779,hexStr:"#F59E0B"}:{hexNum:3718648,hexStr:"#38BDF8"}}const KA=({repository:t,graphFocusMode:e,render3DStyle:n,onChangeRender3DStyle:i,filterFileId:r,onSelectNode:s,onHoverNode:o,onHoverEdge:a,onSearchFocusNode:l})=>{const c=we.useRef(null),d=we.useRef(null),f=we.useRef(null),h=we.useRef(null),p=we.useRef(null),g=we.useRef(new Map),_=we.useRef(null),m=we.useRef(null),[u,v]=we.useState(!0),[x,y]=we.useState(!0),[A,w]=we.useState(1),[T,z]=we.useState(null),[E,b]=we.useState(!1),V=we.useRef({onSelectNode:s,onHoverNode:o,onHoverEdge:a});V.current={onSelectNode:s,onHoverNode:o,onHoverEdge:a},we.useEffect(()=>{const K=h.current;K&&(K.screenSpacePanning=!0,u?K.mouseButtons={LEFT:nn.PAN,MIDDLE:nn.DOLLY,RIGHT:nn.ROTATE}:K.mouseButtons={LEFT:nn.ROTATE,MIDDLE:nn.DOLLY,RIGHT:nn.PAN})},[u]),we.useEffect(()=>{h.current&&(h.current.autoRotate=E)},[E]),we.useEffect(()=>{const K=c.current;if(!K)return;const U=K.clientWidth||960,J=K.clientHeight||720,O=new WT;O.background=new ot("#070709"),O.fog=new Ah("#070709",.0015),f.current=O;const le=new ti(45,U/J,.1,2400);m.current?le.position.copy(m.current.pos):le.position.set(0,76,152),p.current=le;const ce=new Rv({antialias:!0,preserveDrawingBuffer:!0,powerPreference:"high-performance"});ce.setSize(U,J),ce.setPixelRatio(Math.min(window.devicePixelRatio,2)),K.innerHTML="",K.appendChild(ce.domElement),d.current=ce;const Q=new Tb(le,ce.domElement);Q.enableDamping=!0,Q.dampingFactor=.08,Q.screenSpacePanning=!0,Q.panSpeed=1.15,Q.maxPolarAngle=n===Et.FORCE_GRAPH?Math.PI:Math.PI/2-.015,Q.minDistance=8,Q.maxDistance=580,m.current?Q.target.copy(m.current.target):Q.target.set(0,18,0),Q.autoRotate=E,Q.autoRotateSpeed=.65,u?Q.mouseButtons={LEFT:nn.PAN,MIDDLE:nn.DOLLY,RIGHT:nn.ROTATE}:Q.mouseButtons={LEFT:nn.ROTATE,MIDDLE:nn.DOLLY,RIGHT:nn.PAN},h.current=Q;const de=G=>{G.preventDefault(),G.stopPropagation()};ce.domElement.addEventListener("wheel",de,{passive:!1});const ye=new Eb(16777215,1.05);O.add(ye);const be=new Ag(16770723,1.45);be.position.set(65,140,90),O.add(be);const Ne=new Ag(10265519,.65);Ne.position.set(-65,70,-70),O.add(Ne);const Ze=new bc(4.2,5.2,36);Ze.rotateX(-Math.PI/2);const Ke=new $t({color:15051068,side:Wn}),je=new _t(Ze,Ke);je.visible=!1,O.add(je),_.current=je;const Je=[],ee=[],at=new Map,Ie=new Map,Ge=new Map,Me=new Map,dt=[],He=r?t.files.filter(G=>G.id===r):t.files;if(n===Et.VIRTUAL_CODE){const G=new Lg(480,80,2368556,1250072);G.position.y=-.1,O.add(G);const H=new yf;H.moveTo(-13,-4),H.lineTo(13,-4),H.lineTo(10.4,4),H.lineTo(-10.4,4),H.closePath();const Y=new Ac(H);Y.rotateX(-Math.PI/2);const P=new _t(Y,new $t({color:1448224,transparent:!0,opacity:.9,side:Wn}));if(P.position.set(0,.05,56),O.add(P),P.add(new Is(new Fo(Y),new Ln({color:13948120}))),x){const oe=Ds("Project Root",`${He.length} Files`,"#E5A93C",13,3.2);oe.position.set(0,2.2,58),O.add(oe)}const ue=31.2*A,B=20*A;He.forEach((oe,me)=>{const Se=oe.nodes.find(nt=>nt.kind===Re.CLASS)||oe.nodes[0];if(!Se)return;const Le=me%2===0?-1:1,We=Math.floor(me/2),De=He.length<=5?(me-(He.length-1)/2)*ue:Le*(20.8+We*4.5)*A,ze=He.length<=5?(me-(He.length-1)/2)*-14*A:34-We*B,Xe=new N(De,.15,ze);Ie.set(Se.id,new N(De,2,ze));const Qe=new It().setFromPoints([new N(0,.02,52),new N(De,.02,ze)]);O.add(new ir(Qe,new Ln({color:4144966,transparent:!0,opacity:.75})));const ct=14.3,ht=8.5,rt=2.2,$e=new yf;$e.moveTo(-ct/2,-ht/2),$e.lineTo(ct/2,-ht/2),$e.lineTo(ct/2,ht/2-rt),$e.lineTo(ct/2-rt,ht/2),$e.lineTo(-ct/2,ht/2),$e.closePath();const Lt=new Ac($e);Lt.rotateX(-Math.PI/2);const Jt=new _t(Lt,new $t({color:856087,transparent:!0,opacity:.92,side:Wn}));if(Jt.position.copy(Xe),O.add(Jt),Jt.add(new Is(new Fo(Lt),new Ln({color:new ot(oe.color)}))),ee.push(Jt),at.set(Jt,Se),x){const nt=Ds(oe.name,`${oe.language} • ${oe.nodes.length} nodes`,oe.color,11.5,2.8);nt.position.set(De,1.4,ze+ht/2+1.2),O.add(nt)}const Cn=oe.nodes.filter(nt=>nt.kind===Re.FUNCTION||nt.kind===Re.RECURSION),Rn=10+Cn.length*14*A,Qt=new It().setFromPoints([new N(De,.2,ze),new N(De,Rn,ze)]);O.add(new ir(Qt,new Ln({color:3718648,transparent:!0,opacity:.9}))),Cn.forEach((nt,C)=>{const k=7+C*13.5*A,ie=C*1.15+me*.5,se=C===0?0:2.6*A,j=new N(De+Math.cos(ie)*se,k,ze+Math.sin(ie)*se),Pe=new N(De,k-2.2,ze);Ie.set(nt.id,j),O.add(new ir(new It().setFromPoints([Pe,j]),new Ln({color:3718648})));const Ue=Math.min(3.2,1.55+nt.childrenIds.length*.22),Ve=YA(nt.symbolName,nt.isRecursive?"rgba(14, 116, 144, 0.85)":"rgba(20, 140, 160, 0.78)",nt.isRecursive?"#38BDF8":"#2DD4BF");Je.push(Ve);const Oe=new _t(new ro(Ue,Ue,.16,28),new $t({map:Ve,transparent:!0,opacity:.95}));Oe.position.copy(j),O.add(Oe),ee.push(Oe),at.set(Oe,nt);const Ye=oe.nodes.filter(Fe=>Fe.parentId===nt.id);if(Ge.set(nt.id,j.clone().add(new N(-1.5,2.5,0))),Me.set(nt.id,j.clone().add(new N(1.5,2.5,0))),Ye.forEach((Fe,tt)=>{const pt=Fe.label.toLowerCase().startsWith("else"),xt=Fe.kind===Re.LOOP,St=ie+(pt?.65:-.65)+(tt-(Ye.length-1)/2)*.55,vt=(3.4+tt%2*1.4)*A,et=j.y+(4.5+tt*3.2)*A,Wt=new N(j.x+Math.cos(St)*vt,et,j.z+Math.sin(St)*vt);Ie.set(Fe.id,Wt),pt?(Me.set(nt.id,Wt),Me.set(Fe.id,Wt)):(Ge.set(nt.id,Wt),Ge.set(Fe.id,Wt));const ft=xt?3718648:pt?15680580:2278750;O.add(new ir(new It().setFromPoints([j,new N(Wt.x,j.y+1.2,Wt.z),Wt]),new Ln({color:ft})));const ln=new _t(new ro(.95,.95,.14,22),new $t({color:ft,transparent:!0,opacity:.88}));ln.position.copy(Wt),O.add(ln),ee.push(ln),at.set(ln,Fe);const yi=oe.nodes.filter(kn=>kn.parentId===Fe.id);yi.forEach((kn,kt)=>{const Nt=St+(kt-(yi.length-1)/2)*.48,pn=2.2*A,Ri=Wt.y+(3.6+kt*2.8)*A,gt=new N(Wt.x+Math.cos(Nt)*pn,Ri,Wt.z+Math.sin(Nt)*pn);Ie.set(kn.id,gt),pt?Me.set(kn.id,gt):Ge.set(kn.id,gt),O.add(new ir(new It().setFromPoints([Wt,new N(gt.x,Wt.y+.8,gt.z),gt]),new Ln({color:pt?16281969:11032055})));const Si=new _t(new ro(.62,.62,.12,18),new $t({color:pt?15680580:12616956,transparent:!0,opacity:.92}));Si.position.copy(gt),O.add(Si),ee.push(Si),at.set(Si,kn)})}),nt.isRecursive||Ye.some(Fe=>Fe.kind===Re.LOOP)){const Fe=j.clone(),tt=j.clone().add(new N(0,3.2,0)),pt=j.clone().add(new N(3.6,3.2,0)),xt=j.clone().add(new N(3.6,0,0)),St=new Xl;St.add(new Hn(Fe,tt)),St.add(new Hn(tt,pt)),St.add(new Hn(pt,xt)),St.add(new Hn(xt,Fe));const vt=new _t(new ar(St,16,.12,8,!1),new $t({color:3718648}));O.add(vt);const et=fd(4.2);et.position.set(j.x+1.8,j.y+3.6,j.z),O.add(et)}})})}if(n===Et.CODE_CITY){const G=new Lg(520,80,2105384,1118486);G.position.y=-.3,O.add(G);const H=Math.max(1,Math.ceil(Math.sqrt(He.length))),Y=Math.max(1,Math.ceil(He.length/H)),P=He.map((We,De)=>{const ze=We.nodes.filter(Lt=>Lt.kind===Re.FUNCTION||Lt.kind===Re.RECURSION),Xe=Math.max(1,ze.length+1),Qe=Math.ceil(Math.sqrt(Xe)),ct=Math.max(22,Qe*11+8),ht=Math.max(20,Qe*11+8),rt=De%H,$e=Math.floor(De/H);return{file:We,functions:ze,bldgCols:Qe,parcelWidth:ct,parcelDepth:ht,col:rt,row:$e}}),ue=44*A,B=H*ue+20,oe=Y*ue+20,me=new Tr(B,.7,oe),Se=new ko({color:855828,roughness:.9,metalness:.1}),Le=new _t(me,Se);Le.position.set(0,-.35,0),O.add(Le),Le.add(new Is(new Fo(me),new Ln({color:2565936}))),P.forEach(({file:We,functions:De,bldgCols:ze,parcelWidth:Xe,parcelDepth:Qe,col:ct,row:ht})=>{const rt=We.nodes.find(k=>k.kind===Re.CLASS)||We.nodes[0];if(!rt)return;const $e=(ct-(H-1)/2)*ue,Lt=(ht-(Y-1)/2)*ue,Jt=new ot(We.color),Cn=new Tr(Xe,.65,Qe),Rn=new ko({color:Jt,roughness:.65,metalness:.15,transparent:!0,opacity:.34}),Qt=new _t(Cn,Rn);Qt.position.set($e,.35,Lt),O.add(Qt);const nt=new Is(new Fo(Cn),new Ln({color:Jt}));if(Qt.add(nt),ee.push(Qt),at.set(Qt,rt),x){const k=Ds(We.name,`${We.folder} • ${De.length} Buildings`,We.color,14,3.5);k.position.set($e,2.4,Lt+Qe/2+2.2),O.add(k)}const C=[rt,...De];C.forEach((k,ie)=>{const se=ie%ze,j=Math.floor(ie/ze),Pe=9,Ue=$e+(se-(ze-1)/2)*Pe,Ve=Lt+(j-(Math.ceil(C.length/ze)-1)/2)*Pe,Oe=We.nodes.filter(kt=>kt.parentId===k.id),Ye=k.kind===Re.CLASS?Math.min(6.4,3.6+De.length*.45):Math.min(5.6,2.6+Oe.length*.55+k.callsIds.length*.3),qe=Math.max(4,k.lineEnd-k.lineStart+1),Fe=k.kind===Re.CLASS?Math.min(36,9+qe*.25):Math.min(44,6+qe*.85+k.complexity*1.4),{hexNum:tt,hexStr:pt}=ZA(k.complexity,k.isRecursive),xt=qA(pt);Je.push(xt);const St=new Tr(Ye,Fe,Ye),vt=new ko({map:xt,roughness:.35,metalness:.3}),et=new _t(St,vt);et.position.set(Ue,.7+Fe/2,Ve),O.add(et);const Wt=new Is(new Fo(St),new Ln({color:k.kind===Re.CLASS?Jt:tt,transparent:!0,opacity:.75}));et.add(Wt),ee.push(et),at.set(et,k);const ft=new N(Ue,.7+Fe+.4,Ve);Ie.set(k.id,ft);const ln=new N(Ue-Ye*.25,.7+Fe+.4,Ve),yi=new N(Ue+Ye*.25,.7+Fe+.4,Ve);if(Ge.set(k.id,ln),Me.set(k.id,yi),Oe.forEach(kt=>{const pn=kt.label.toLowerCase().startsWith("else")?yi:ln;Ie.set(kt.id,pn),Ge.set(kt.id,ln),Me.set(kt.id,yi),We.nodes.filter(gt=>gt.parentId===kt.id).forEach(gt=>{Ie.set(gt.id,pn),Ge.set(gt.id,ln),Me.set(gt.id,yi)})}),x&&k.kind!==Re.CLASS){const kt=Ds(k.symbolName,`${qe} LOC • Cplx ${k.complexity}`,pt,9.5,2.3);kt.position.set(Ue,.7+Fe+2.4,Ve),O.add(kt)}if(k.isRecursive||Oe.some(kt=>kt.kind===Re.LOOP)){const kt=ft.clone(),Nt=ft.clone().add(new N(0,3.4,0)),pn=ft.clone().add(new N(3.4,3.4,0)),Ri=ft.clone().add(new N(3.4,0,0)),gt=new Xl;gt.add(new Hn(kt,Nt)),gt.add(new Hn(Nt,pn)),gt.add(new Hn(pn,Ri)),gt.add(new Hn(Ri,kt));const Si=new _t(new ar(gt,16,.14,8,!1),new $t({color:3718648}));O.add(Si);const Da=fd(4.2);Da.position.set(ft.x+1.7,ft.y+3.8,ft.z),O.add(Da)}})})}if(n===Et.FORCE_GRAPH){const G=new bc(68,68.4,64);G.rotateX(Math.PI/2);const H=new _t(G,new $t({color:1974313,side:Wn,transparent:!0,opacity:.6}));O.add(H);const Y=new Map,P=new Map;He.forEach((B,oe)=>{const me=Math.acos(1-2*(oe+.5)/Math.max(1,He.length)),Se=Math.PI*(1+Math.sqrt(5))*oe,Le=38*A;Y.set(B.id,new N(Le*Math.sin(me)*Math.cos(Se),Le*Math.cos(me)*.65+18,Le*Math.sin(me)*Math.sin(Se))),P.set(B.id,new N)});const ue=new Map;t.edges.forEach(B=>{if(B.kind==="CROSS_FILE_CALL"||B.kind==="CLASS_DEPENDENCY"){const oe=t.allNodes.find(Se=>Se.id===B.sourceId),me=t.allNodes.find(Se=>Se.id===B.targetId);if(oe&&me&&oe.fileId!==me.fileId){const Se=[oe.fileId,me.fileId].sort().join("::");ue.set(Se,(ue.get(Se)||0)+1)}}});for(let B=0;B<90;B++){for(let me=0;me<He.length;me++)for(let Se=me+1;Se<He.length;Se++){const Le=He[me].id,We=He[Se].id,De=Y.get(Le),ze=Y.get(We),Xe=new N().subVectors(De,ze),Qe=Math.max(4,Xe.length()),ct=420*A/(Qe*Qe);Xe.normalize().multiplyScalar(ct),P.get(Le).add(Xe),P.get(We).sub(Xe)}ue.forEach((me,Se)=>{const[Le,We]=Se.split("::"),De=Y.get(Le),ze=Y.get(We);if(!De||!ze)return;const Xe=new N().subVectors(ze,De),Qe=Xe.length(),ct=24*A,ht=(Qe-ct)*.035*Math.min(4,me);Xe.normalize().multiplyScalar(ht),P.get(Le).add(Xe),P.get(We).sub(Xe)});const oe=new N(0,20,0);He.forEach(me=>{const Se=Y.get(me.id),Le=P.get(me.id),We=new N().subVectors(oe,Se).multiplyScalar(.02);Le.add(We),Le.multiplyScalar(.65),Se.add(Le)})}He.forEach(B=>{const oe=B.nodes.find($e=>$e.kind===Re.CLASS)||B.nodes[0];if(!oe)return;const me=Y.get(B.id)||new N(0,20,0),Se=new ot(B.color),Le=B.nodes.filter($e=>$e.kind===Re.FUNCTION||$e.kind===Re.RECURSION),We=B.nodes.reduce(($e,Lt)=>$e+Lt.calledByIds.length,0),De=Math.min(5.2,2.2+Math.sqrt(We)*.55+Le.length*.18),ze=new Vr(De*2.1,24,24),Xe=new $t({color:Se,transparent:!0,opacity:.14,depthWrite:!1}),Qe=new _t(ze,Xe);Qe.position.copy(me),O.add(Qe);const ct=new Vr(De,28,28),ht=new ko({color:Se,emissive:Se,emissiveIntensity:.55,roughness:.25}),rt=new _t(ct,ht);if(rt.position.copy(me),O.add(rt),ee.push(rt),at.set(rt,oe),Ie.set(oe.id,me),Ge.set(oe.id,me),Me.set(oe.id,me),x){const $e=Ds(oe.symbolName,`${B.name} (${We} incoming links)`,B.color,13.5,3.3);$e.position.set(me.x,me.y+De+2.8,me.z),O.add($e)}Le.forEach(($e,Lt)=>{const Jt=B.nodes.filter(Oe=>Oe.parentId===$e.id),Cn=Math.acos(1-2*(Lt+.5)/Math.max(1,Le.length)),Rn=Math.PI*(1+Math.sqrt(5))*Lt,Qt=(De+6.5+Lt%2*2.5)*A,nt=new N(me.x+Qt*Math.sin(Cn)*Math.cos(Rn),me.y+Qt*Math.cos(Cn),me.z+Qt*Math.sin(Cn)*Math.sin(Rn)),C=$e.calledByIds.length+$e.callsIds.length*.4,k=Math.min(2.4,.85+Math.sqrt(C)*.45),ie=new It().setFromPoints([me,nt]),se=new ir(ie,new Ln({color:Se,transparent:!0,opacity:.35}));O.add(se);const j=new Vr(k,20,20),Pe=new ko({color:Se,emissive:Se,emissiveIntensity:.35+Math.min(.5,$e.calledByIds.length*.12),roughness:.3}),Ue=new _t(j,Pe);if(Ue.position.copy(nt),O.add(Ue),ee.push(Ue),at.set(Ue,$e),Ie.set($e.id,nt),Ge.set($e.id,nt),Me.set($e.id,nt),$e.isRecursive||Jt.some(Oe=>Oe.kind===Re.LOOP)){const Oe=nt.clone(),Ye=nt.clone().add(new N(0,3,0)),qe=nt.clone().add(new N(3,3,0)),Fe=nt.clone().add(new N(3,0,0)),tt=new Xl;tt.add(new Hn(Oe,Ye)),tt.add(new Hn(Ye,qe)),tt.add(new Hn(qe,Fe)),tt.add(new Hn(Fe,Oe));const pt=new _t(new ar(tt,14,.11,8,!1),new $t({color:3718648}));O.add(pt);const xt=fd(3.6);xt.position.set(nt.x+1.5,nt.y+3.4,nt.z),O.add(xt)}if(Jt.forEach((Oe,Ye)=>{const qe=Rn+(Ye-.5)*.9,Fe=Oe.label.toLowerCase().startsWith("else"),tt=new N(nt.x+Math.cos(qe)*3,nt.y+(Fe?-1.8:1.8),nt.z+Math.sin(qe)*3);Ie.set(Oe.id,tt),Fe?(Me.set($e.id,tt),Me.set(Oe.id,tt)):(Ge.set($e.id,tt),Ge.set(Oe.id,tt)),O.add(new ir(new It().setFromPoints([nt,tt]),new Ln({color:Fe?15680580:2278750,transparent:!0,opacity:.55})));const pt=new _t(new Vr(.45,14,14),new $t({color:Fe?15680580:2278750}));pt.position.copy(tt),O.add(pt),ee.push(pt),at.set(pt,Oe),B.nodes.filter(St=>St.parentId===Oe.id).forEach(St=>{Ie.set(St.id,tt),Ge.set(St.id,tt),Me.set(St.id,tt)})}),x){const Oe=Ds($e.symbolName,`${$e.calledByIds.length} in • ${$e.callsIds.length} out`,B.color,8.8,2.1);Oe.position.set(nt.x,nt.y+k+1.5,nt.z),O.add(Oe)}})})}g.current=Ie;const L=[],M=[],ne=new Map;t.edges.filter(G=>e===tn.CLASSES?G.kind==="CLASS_DEPENDENCY":G.kind==="CROSS_FILE_CALL"||G.kind==="INTERNAL_CALL").forEach((G,H)=>{const Y=G.branchOutcome==="FALSE",P=(Y?Me.get(G.sourceId):Ge.get(G.sourceId))||Ie.get(G.sourceId),ue=Ie.get(G.targetId);if(!P||!ue)return;const B=P.distanceTo(ue);if(B<.1)return;const oe=new N().addVectors(P,ue).multiplyScalar(.5);n===Et.FORCE_GRAPH?oe.y+=(Y?-3.5:3.5)+H%3*1.2:oe.y+=(G.kind==="CROSS_FILE_CALL"||G.kind==="CLASS_DEPENDENCY"?12+B*.16:5.5)+(Y?-2:2)+H%3*.6;const me=new Ph(P,oe,ue),Se=Y?15680580:2278750,Le=new ar(me,32,.13,8,!1),We=new $t({color:Se,transparent:!0,opacity:n===Et.FORCE_GRAPH?.65:.85}),De=new _t(Le,We);O.add(De);const ze=new ar(me,32,.4,10,!1),Xe=new $t({color:Se}),Qe=new _t(ze,Xe);Qe.visible=!1,O.add(Qe);const ct=new ar(me,18,1.5,6,!1),ht=new $t({visible:!1}),rt=new _t(ct,ht);O.add(rt);const $e=Math.max(2,Math.min(6,Math.floor(B/12))),Lt=[];for(let k=1;k<=$e;k++){const ie=k/($e+1),se=me.getPointAt(ie),j=me.getTangentAt(ie).normalize(),Pe=new Nh(.42,1.25,8);Pe.rotateX(Math.PI/2);const Ue=new $t({color:Se}),Ve=new _t(Pe,Ue);Ve.position.copy(se),Ve.lookAt(se.clone().add(j)),O.add(Ve),Lt.push(Ve)}const Jt=[],Cn=n===Et.FORCE_GRAPH?2:1;for(let k=0;k<Cn;k++){const ie=new Vr(.42,10,10),se=new $t({color:Y?16557477:16707722}),j=new _t(ie,se);O.add(j),Jt.push(j),dt.push({mesh:j,curve:me,speed:.0045+H%4*8e-4,offset:k*.5+H*.13%1,edgeId:G.id})}const Rn=t.allNodes.find(k=>k.id===G.sourceId),Qt=t.allNodes.find(k=>k.id===G.targetId),nt=Y?`FALSE l${G.callLine}`:`TRUE l${G.callLine}`,C={id:G.id,rawEdge:G,label:`${(Rn==null?void 0:Rn.symbolName)||"Caller"} [${nt}] → ${(Qt==null?void 0:Qt.symbolName)||"Callee"}`,hitTube:rt,normalTube:De,highlightTube:Qe,arrowCones:Lt,pulseMeshes:Jt,defaultColor:Se,sourceNode:Rn,targetNode:Qt};L.push(C),M.push(rt),ne.set(rt,C)});const ge=new Mb,xe=new Ae;let ke={x:0,y:0},Te=null;const D=()=>{Te&&(L.forEach(G=>{G.normalTube.visible=!0,G.highlightTube.visible=!1,G.arrowCones.forEach(H=>{H.visible=!0,H.material.color.setHex(G.defaultColor),H.scale.set(1,1,1)}),G.pulseMeshes.forEach(H=>{H.visible=!0})}),Te=null,V.current.onHoverEdge(null))},re=G=>{Te=G,V.current.onHoverEdge(G.rawEdge),L.forEach(H=>{H.id===G.id?(H.normalTube.visible=!1,H.highlightTube.visible=!0,H.arrowCones.forEach(Y=>{Y.visible=!0,Y.material.color.setHex(16777215),Y.scale.set(1.4,1.4,1.4)}),H.pulseMeshes.forEach(Y=>{Y.visible=!0})):(H.normalTube.visible=!1,H.highlightTube.visible=!1,H.arrowCones.forEach(Y=>{Y.visible=!1}),H.pulseMeshes.forEach(Y=>{Y.visible=!1}))})},ae=G=>{ke={x:G.clientX,y:G.clientY}},Z=G=>{var ue,B;const H=ce.domElement.getBoundingClientRect();xe.x=(G.clientX-H.left)/H.width*2-1,xe.y=-((G.clientY-H.top)/H.height)*2+1,ge.setFromCamera(xe,le);const Y=ge.intersectObjects(M,!1);if(Y.length>0){const oe=ne.get(Y[0].object);if(oe){Te!==oe&&re(oe),ce.domElement.style.cursor="pointer",z({title:oe.label,subtitle:`${((ue=oe.sourceNode)==null?void 0:ue.fileName)||""} (Line ${oe.rawEdge.callLine}) → ${((B=oe.targetNode)==null?void 0:B.fileName)||""}`,x:G.clientX-H.left,y:G.clientY-H.top});return}}const P=ge.intersectObjects(ee,!1);if(P.length>0){D();const oe=at.get(P[0].object);if(oe){ce.domElement.style.cursor="pointer",V.current.onHoverNode(oe);const me=Math.max(1,oe.lineEnd-oe.lineStart+1);z({title:`${oe.className} :: ${oe.label}`,subtitle:`${oe.fileName} (File Line ${oe.lineStart} • ${me} LOC • Cplx ${oe.complexity})`,x:G.clientX-H.left,y:G.clientY-H.top});return}}D(),ce.domElement.style.cursor="grab",z(null)},Ee=G=>{if(m.current={pos:le.position.clone(),target:Q.target.clone()},Math.hypot(G.clientX-ke.x,G.clientY-ke.y)>6)return;const H=ce.domElement.getBoundingClientRect();xe.x=(G.clientX-H.left)/H.width*2-1,xe.y=-((G.clientY-H.top)/H.height)*2+1,ge.setFromCamera(xe,le);const Y=ge.intersectObjects(ee,!1);if(Y.length>0){const P=at.get(Y[0].object);P&&V.current.onSelectNode(P)}},$=ce.domElement;$.addEventListener("mousedown",ae),$.addEventListener("mousemove",Z),$.addEventListener("mouseup",Ee);let fe,he=0;const q=()=>{fe=requestAnimationFrame(q),he+=1;for(let G=0;G<dt.length;G++){const H=dt[G];if(!H.mesh.visible)continue;const Y=(H.offset+he*H.speed)%1,P=H.curve.getPointAt(Y);H.mesh.position.copy(P)}if(_.current&&_.current.visible){const G=1+Math.sin(he*.08)*.18;_.current.scale.set(G,G,G)}h.current&&h.current.update(),ce.render(O,le)};q();const R=()=>{if(!K)return;const G=K.clientWidth,H=K.clientHeight;G>0&&H>0&&(le.aspect=G/H,le.updateProjectionMatrix(),ce.setSize(G,H))};window.addEventListener("resize",R);let I=null;return typeof ResizeObserver<"u"&&(I=new ResizeObserver(()=>{R()}),I.observe(K)),()=>{m.current={pos:le.position.clone(),target:Q.target.clone()},cancelAnimationFrame(fe),window.removeEventListener("resize",R),I&&I.disconnect(),$.removeEventListener("wheel",de),$.removeEventListener("mousedown",ae),$.removeEventListener("mousemove",Z),$.removeEventListener("mouseup",Ee),Je.forEach(G=>G.dispose()),ce.dispose()}},[t,e,r,n,x,A]);const X=()=>{p.current&&h.current&&(p.current.position.set(0,76,152),h.current.target.set(0,18,0),h.current.update(),m.current={pos:p.current.position.clone(),target:h.current.target.clone()})},pe=K=>{if(p.current&&h.current){const U=new N;p.current.getWorldDirection(U),p.current.position.addScaledVector(U,K),h.current.update()}},F=(K,U)=>{const J=p.current,O=h.current;if(!J||!O)return;const le=new N,ce=new N;J.matrix.extractBasis(le,ce,new N);const Q=new N().addScaledVector(le,K).addScaledVector(ce,U);J.position.add(Q),O.target.add(Q),O.update(),m.current={pos:J.position.clone(),target:O.target.clone()}},W=K=>{l(K),window.setTimeout(()=>{const U=g.current.get(K.id),J=p.current,O=h.current;U&&J&&O&&(O.target.copy(U),J.position.set(U.x,U.y+22,U.z+42),O.update(),m.current={pos:J.position.clone(),target:O.target.clone()},_.current&&(_.current.position.set(U.x,U.y+.5,U.z),_.current.visible=!0))},60)},te=()=>{if(!d.current||!f.current||!p.current)return;d.current.render(f.current,p.current);const K=d.current.domElement.toDataURL("image/png"),U=document.createElement("a");U.href=K,U.download=`LCV-3D-${n}-${e}-${Date.now()}.png`,U.click()};return S.jsxs("div",{className:"relative w-full h-full bg-[#070709] overflow-hidden",children:[S.jsx("div",{ref:c,className:"w-full h-full"}),S.jsxs("div",{className:"absolute top-3 left-3 z-20 flex flex-wrap items-center gap-2 bg-[#0D0D12]/95 border border-zinc-800 p-1.5 rounded text-xs font-sans shadow-xl",children:[S.jsxs("button",{type:"button",onClick:()=>i(Et.CODE_CITY),className:`px-3 py-1 rounded flex items-center gap-1.5 font-semibold transition ${n===Et.CODE_CITY?"bg-[#231B0E] border border-[#E5A93C] text-[#F7D794]":"bg-zinc-900 text-zinc-400 hover:text-zinc-200"}`,title:"URL Parameter: ?Code-City",children:[S.jsx(Gb,{className:"w-3.5 h-3.5 text-[#E5A93C]"}),S.jsx("span",{children:"Code City 3D"})]}),S.jsxs("button",{type:"button",onClick:()=>i(Et.FORCE_GRAPH),className:`px-3 py-1 rounded flex items-center gap-1.5 font-semibold transition ${n===Et.FORCE_GRAPH?"bg-[#231B0E] border border-[#E5A93C] text-[#F7D794]":"bg-zinc-900 text-zinc-400 hover:text-zinc-200"}`,title:"URL Parameter: ?3DForce-Graph",children:[S.jsx(UA,{className:"w-3.5 h-3.5 text-[#2DD4BF]"}),S.jsx("span",{children:"3D Force-Graph"})]}),S.jsxs("button",{type:"button",onClick:()=>i(Et.VIRTUAL_CODE),className:`px-3 py-1 rounded flex items-center gap-1.5 font-semibold transition ${n===Et.VIRTUAL_CODE?"bg-[#231B0E] border border-[#E5A93C] text-[#F7D794]":"bg-zinc-900 text-zinc-400 hover:text-zinc-200"}`,title:"URL Parameter: ?Virtual-Code-3D",children:[S.jsx(rA,{className:"w-3.5 h-3.5 text-[#38BDF8]"}),S.jsx("span",{children:"Virtual Code 3D"})]}),S.jsxs("div",{className:"hidden xl:flex items-center gap-3 pl-2 border-l border-zinc-800 text-[11px] pr-2",children:[n===Et.CODE_CITY&&S.jsxs("span",{className:"text-zinc-300",children:[S.jsx("strong",{className:"text-[#F7D794]",children:"Colored Lot:"})," File Parcel •"," ",S.jsx("strong",{className:"text-sky-300",children:"Tower Height:"})," LOC •"," ",S.jsx("strong",{className:"text-amber-400",children:"Facade:"})," Complexity"]}),n===Et.FORCE_GRAPH&&S.jsxs("span",{className:"text-zinc-300",children:[S.jsx("strong",{className:"text-[#F7D794]",children:"Glowing Sun:"})," File Core •"," ",S.jsx("strong",{className:"text-sky-300",children:"Moons:"})," Functions •"," ",S.jsx("strong",{className:"text-emerald-400",children:"Pulses:"})," Data Flow"]}),n===Et.VIRTUAL_CODE&&S.jsxs("span",{className:"text-zinc-300",children:[S.jsx("strong",{className:"text-[#F7D794]",children:"Vertical Spine:"})," File (+30% Wide Plate) •"," ",S.jsx("strong",{className:"text-sky-300",children:"2D Disks:"})," Functions"]}),S.jsx("span",{className:"flex items-center gap-1 text-sky-300 font-semibold",children:S.jsx("span",{className:"px-1.5 py-0.2 bg-[#0284C7] border border-sky-300 text-white font-mono text-[9.5px] font-bold",children:"LOOP"})})]})]}),S.jsxs("div",{className:"absolute top-3 right-3 z-20 flex items-center gap-2 bg-[#0D0D12]/95 border border-zinc-800 px-3 py-1.5 rounded text-xs font-sans shadow-xl",children:[S.jsxs("button",{type:"button",onClick:()=>y(!x),className:`px-2 py-0.5 rounded flex items-center gap-1 text-[11px] font-medium transition ${x?"bg-[#231B0E] border border-[#E5A93C]/60 text-[#F7D794]":"bg-zinc-900 text-zinc-400"}`,children:[S.jsx(GA,{className:"w-3 h-3 text-[#E5A93C]"}),S.jsxs("span",{children:["Labels: ",x?"Show":"Hide"]})]}),S.jsxs("div",{className:"flex items-center gap-1.5 border-l border-zinc-800 pl-2 text-[11px] text-zinc-400",children:[S.jsx("span",{children:"Spacing:"}),S.jsx("input",{type:"range",min:.6,max:1.8,step:.1,value:A,onChange:K=>w(Number(K.target.value)),className:"w-20 accent-[#E5A93C] cursor-pointer"})]})]}),S.jsxs("div",{className:"absolute bottom-3 left-3 z-30 flex flex-wrap items-center gap-1.5 bg-[#0E0E13]/95 border border-zinc-800 rounded p-1.5 shadow-2xl",children:[S.jsx(Qv,{allNodes:t.allNodes,onSelectFocusNode:W}),S.jsxs("button",{type:"button",onClick:()=>v(!u),className:`px-2.5 py-1 rounded text-xs font-sans font-semibold flex items-center gap-1.5 transition border ${u?"bg-[#231B0E] border-[#E5A93C] text-[#F7D794]":"bg-zinc-900 border-zinc-700 text-zinc-300 hover:bg-zinc-800"}`,title:u?"Grab Grid Active: Left-Click Drag pans Left/Right/Up/Down (Right-Click Drag rotates)":"Orbit Active: Left-Click Drag rotates (Right-Click Drag pans)",children:[S.jsx(SA,{className:"w-3.5 h-3.5 text-[#E5A93C]"}),S.jsx("span",{children:u?"Grab Grid (L/R/U/D)":"Rotate Mode"})]}),S.jsxs("div",{className:"flex items-center gap-0.5 border-l border-r border-zinc-800 px-1",children:[S.jsx("button",{type:"button",onClick:()=>F(-14,0),className:"p-1 rounded text-zinc-300 hover:text-[#F7D794] hover:bg-[#231B0E] transition",title:"Pan Scene Left",children:S.jsx(Nb,{className:"w-3.5 h-3.5"})}),S.jsx("button",{type:"button",onClick:()=>F(0,14),className:"p-1 rounded text-zinc-300 hover:text-[#F7D794] hover:bg-[#231B0E] transition",title:"Pan Scene Up",children:S.jsx(kb,{className:"w-3.5 h-3.5"})}),S.jsx("button",{type:"button",onClick:()=>F(0,-14),className:"p-1 rounded text-zinc-300 hover:text-[#F7D794] hover:bg-[#231B0E] transition",title:"Pan Scene Down",children:S.jsx(Lb,{className:"w-3.5 h-3.5"})}),S.jsx("button",{type:"button",onClick:()=>F(14,0),className:"p-1 rounded text-zinc-300 hover:text-[#F7D794] hover:bg-[#231B0E] transition",title:"Pan Scene Right",children:S.jsx(Ob,{className:"w-3.5 h-3.5"})})]}),S.jsx("button",{type:"button",onClick:()=>pe(16),className:"p-1.5 rounded text-zinc-300 hover:text-[#F7D794] hover:bg-[#231B0E] transition",title:"Zoom In",children:S.jsx(Kv,{className:"w-3.5 h-3.5"})}),S.jsx("button",{type:"button",onClick:()=>pe(-16),className:"p-1.5 rounded text-zinc-300 hover:text-[#F7D794] hover:bg-[#231B0E] transition",title:"Zoom Out",children:S.jsx(Jv,{className:"w-3.5 h-3.5"})}),S.jsxs("button",{type:"button",onClick:()=>b(!E),className:`px-2 py-1 rounded text-xs font-sans font-medium flex items-center gap-1 transition ${E?"bg-[#231B0E] border border-[#E5A93C] text-[#F7D794] font-semibold":"text-zinc-300 hover:bg-zinc-800"}`,children:[S.jsx(nA,{className:"w-3.5 h-3.5 text-[#E5A93C]"}),S.jsx("span",{children:"Auto-Orbit"})]}),S.jsx("button",{type:"button",onClick:X,className:"p-1.5 rounded text-zinc-300 hover:text-[#F7D794] hover:bg-[#231B0E] transition",title:"Reset Camera",children:S.jsx(qv,{className:"w-3.5 h-3.5"})}),S.jsxs("button",{type:"button",onClick:te,className:"px-2.5 py-1 rounded bg-[#231B0E] hover:bg-[#2F2412] border border-[#E5A93C]/80 text-[#F7D794] font-sans text-xs font-semibold flex items-center gap-1.5 transition",title:"Export 3D Graph as PNG Screenshot",children:[S.jsx(Hv,{className:"w-3.5 h-3.5 text-[#E5A93C]"}),S.jsx("span",{children:"Export 3D PNG"})]})]}),T&&S.jsxs("div",{className:"pointer-events-none absolute z-30 bg-[#0D0D12] border-l-4 border-[#E5A93C] border-t border-r border-b border-zinc-800 px-3 py-1.5 rounded shadow-2xl transform -translate-x-1/2 -translate-y-full -mt-3",style:{left:T.x,top:T.y},children:[S.jsx("div",{className:"font-mono text-xs font-semibold text-[#F7D794]",children:T.title}),S.jsx("div",{className:"font-sans text-[11px] text-zinc-400",children:T.subtitle})]})]})},Kn=24,Fr=18,zo=10;function Ug(t){let e=0;for(let n=0;n<t.length-1;n++)e+=Math.hypot(t[n+1].x-t[n].x,t[n+1].y-t[n].y);return e}function JA(t,e){if(Math.abs(t.x1-e.x1)<2&&Math.abs(t.y1-e.y1)<2||Math.abs(t.x2-e.x2)<2&&Math.abs(t.y2-e.y2)<2||Math.abs(t.x1-e.x2)<2&&Math.abs(t.y1-e.y2)<2||Math.abs(t.x2-e.x1)<2&&Math.abs(t.y2-e.y1)<2)return!1;const n=(i,r,s,o,a,l)=>(l-r)*(s-i)>(o-r)*(a-i);return n(t.x1,t.y1,e.x1,e.y1,e.x2,e.y2)!==n(t.x2,t.y2,e.x1,e.y1,e.x2,e.y2)&&n(t.x1,t.y1,t.x2,t.y2,e.x1,e.y1)!==n(t.x1,t.y1,t.x2,t.y2,e.x2,e.y2)}function QA(t,e,n,i,r){const s=(h,p)=>{const _={x:t,y:e},m={x:t+18,y:e},u={x:n-18,y:i},v={x:n,y:i},x=u.x-m.x,y=u.y-m.y,A=Math.abs(y);if(x>=A&&p===0){const E=A,b=(x-E)/2,V=Math.max(4,Math.min(x-E-4,b+h));return[_,m,{x:m.x+V,y:e},{x:m.x+V+E,y:i},u,v]}if(x>=A&&p!==0){const E=(e+i)/2+p,b=Math.min(24,Math.abs(E-e)),V=Math.min(24,Math.abs(i-E)),X=(m.x+u.x)/2+h;return[_,m,{x:m.x+b,y:E},{x:X-V,y:E},{x:X,y:i},u,v]}const w=(e+i)/2+p,T=Math.min(20,Math.abs(i-e)/4),z=i>=e?1:-1;return[_,m,{x:m.x+T,y:e+z*T},{x:m.x+T,y:w},{x:u.x-T,y:w},{x:u.x-T,y:i-z*T},u,v]},o=s(0,0),l=Math.max(1,Ug(o))*1.08,c=[{lane:0,detour:0},{lane:-22,detour:0},{lane:22,detour:0},{lane:-42,detour:0},{lane:42,detour:0},{lane:-16,detour:-18},{lane:16,detour:18},{lane:-28,detour:26},{lane:28,detour:-26}];let d=o,f=1/0;for(const h of c){const p=s(h.lane,h.detour);if(Ug(p)>l)continue;let _=0;for(let m=0;m<p.length-1;m++){const u={x1:p[m].x,y1:p[m].y,x2:p[m+1].x,y2:p[m+1].y};for(let v=0;v<r.length;v++)JA(u,r[v])&&_++}if(_<f&&(f=_,d=p,_===0))break}for(let h=0;h<d.length-1;h++)r.push({x1:d[h].x,y1:d[h].y,x2:d[h+1].x,y2:d[h+1].y});return d}function eC(t,e=115){const n=[];let i=0,r=e*.55;for(let s=0;s<t.length-1;s++){const o=t[s],a=t[s+1],l=Math.hypot(a.x-o.x,a.y-o.y);if(l<1)continue;const c=Math.atan2(a.y-o.y,a.x-o.x)*180/Math.PI;for(;i+l>=r;){const d=(r-i)/l;n.push({x:o.x+(a.x-o.x)*d,y:o.y+(a.y-o.y)*d,angleDeg:c}),r+=e}i+=l}return n}const tC=({repository:t,graphFocusMode:e,selectedNode:n,hoveredNode:i,filterFileId:r,pan:s,zoom:o,nodeOffsets:a,nodeCustomizations:l,commentBoxes:c,onChangePanZoom:d,onChangeNodeOffsets:f,onChangeNodeCustomizations:h,onChangeCommentBoxes:p,onExportJsonLayout:g,onImportJsonLayout:_,onSelectNode:m,onHoverNode:u,onHoverEdge:v,onSearchFocusNode:x})=>{const y=we.useRef(null),A=we.useRef(null),[w,T]=we.useState(!1),z=we.useRef({x:0,y:0}),[E,b]=we.useState(null),V=we.useRef({mouseX:0,mouseY:0,initX:0,initY:0}),[X,pe]=we.useState(null),[F,W]=we.useState(null),[te,K]=we.useState(null),[U,J]=we.useState(null),O=we.useRef({mouseX:0,mouseY:0,initX:0,initY:0}),[le,ce]=we.useState(null),[Q,de]=we.useState(null),[ye,be]=we.useState(null),Ne=we.useRef({pan:s,zoom:o,onChangePanZoom:d});Ne.current={pan:s,zoom:o,onChangePanZoom:d},we.useEffect(()=>{const D=re=>{var Z;if(!te)return;const ae=(Z=document.activeElement)==null?void 0:Z.tagName.toLowerCase();ae==="input"||ae==="textarea"||(re.key==="Delete"||re.key==="Backspace")&&(re.preventDefault(),p(c.filter(Ee=>Ee.id!==te)),K(null),de(null))};return window.addEventListener("keydown",D),()=>window.removeEventListener("keydown",D)},[te,c,p]),we.useEffect(()=>{const D=y.current;if(!D)return;const re=ae=>{ae.preventDefault(),ae.stopPropagation();const Z=ae.deltaY<0?.08:-.08,Ee=Math.min(2.2,Math.max(.25,Number((Ne.current.zoom+Z).toFixed(2))));Ne.current.onChangePanZoom(Ne.current.pan,Ee)};return D.addEventListener("wheel",re,{passive:!1}),()=>D.removeEventListener("wheel",re)},[]);const{baseNodes:Ze,networkBoxes:Ke,activeEdges:je}=we.useMemo(()=>{const D=new Map,re=[],ae=r?t.files.filter(q=>q.id===r):t.files,Z=new Set;ae.forEach(q=>{q.nodes.forEach(R=>{e===tn.CLASSES&&R.kind!==Re.CLASS||Z.add(R.id)})});const Ee=t.edges.filter(q=>q.kind==="RECURSION"||e===tn.CLASSES&&q.kind!=="CLASS_DEPENDENCY"||e===tn.FUNCTIONS&&q.kind==="CLASS_DEPENDENCY"?!1:Z.has(q.sourceId)&&Z.has(q.targetId)),$=new Map,fe=new Map;Ee.forEach(q=>{const R=$.get(q.targetId)||[];R.push({edgeId:q.id,edge:q,label:`in l${q.callLine}`,pinType:"IN",line:q.callLine}),$.set(q.targetId,R);const I=fe.get(q.sourceId)||[],G=q.branchOutcome==="TRUE",H=q.branchOutcome==="FALSE";I.push({edgeId:q.id,edge:q,label:G?`True l${q.callLine}`:H?`False l${q.callLine}`:`out l${q.callLine}`,pinType:G?"TRUE":H?"FALSE":"OUT",line:q.callLine}),fe.set(q.sourceId,I)}),fe.forEach((q,R)=>{q.sort((I,G)=>{const H={TRUE:0,OUT:1,FALSE:2,IN:3};return H[I.pinType]!==H[G.pinType]?H[I.pinType]-H[G.pinType]:I.line-G.line}),fe.set(R,q)});const he=(q,R)=>{const I=$.get(q)||[],G=fe.get(q)||[];I.length===0&&(I.push({edgeId:`default_in_${q}`,label:`in l${R}`,pinType:"IN",line:R}),$.set(q,I)),G.length===0&&(G.push({edgeId:`default_out_${q}`,label:`out l${R}`,pinType:"OUT",line:R}),fe.set(q,G));const H=Math.max(I.length,G.length,1);return Kn+zo+H*Fr+8};if(e===tn.CLASSES)ae.forEach((I,G)=>{const H=I.nodes.find(me=>me.kind===Re.CLASS)||I.nodes[0];if(!H)return;const Y=G%3,P=Math.floor(G/3),ue=80+Y*420,B=70+P*220,oe=he(H.id,H.lineStart);D.set(H.id,{node:H,displayLabel:H.label,x:ue,y:B,width:255,height:oe,inPins:$.get(H.id)||[],outPins:fe.get(H.id)||[],hasSelfLoop:!!H.isRecursive})});else{const q=r?1:2,R=980,I=105,G=85;let H=60,Y=0;ae.forEach((P,ue)=>{const B=ue%q;B===0&&ue>0&&(H+=Y+G,Y=0);const oe=50+B*(R+I),me=H,Se=P.nodes.find(Xe=>Xe.kind===Re.CLASS)||P.nodes[0];if(!Se)return;const Le=P.nodes.filter(Xe=>Xe.kind===Re.FUNCTION||Xe.kind===Re.RECURSION);let We=me+58;Le.forEach(Xe=>{const Qe=P.nodes.filter(rt=>rt.parentId===Xe.id),ct=he(Xe.id,Xe.lineStart);D.set(Xe.id,{node:Xe,displayLabel:Xe.label,x:oe+285,y:We,width:245,height:ct,inPins:$.get(Xe.id)||[],outPins:fe.get(Xe.id)||[],hasSelfLoop:!!Xe.isRecursive});let ht=We;Qe.forEach(rt=>{const $e=he(rt.id,rt.lineStart);D.set(rt.id,{node:rt,displayLabel:rt.label,x:oe+610,y:ht,width:250,height:$e,inPins:$.get(rt.id)||[],outPins:fe.get(rt.id)||[],hasSelfLoop:rt.kind===Re.LOOP||!!rt.isRecursive}),ht+=$e+22}),We+=Math.max(ct+28,ht-We+18)});const De=he(Se.id,Se.lineStart),ze=Math.max(180,We-me+28);Y=Math.max(Y,ze),D.set(Se.id,{node:Se,displayLabel:Se.label,x:oe+24,y:me+ze/2-De/2,width:210,height:De,inPins:$.get(Se.id)||[],outPins:fe.get(Se.id)||[],hasSelfLoop:!1}),re.push({id:`box_${P.id}`,title:`${Se.symbolName} (${P.name})`,lang:P.language,x:oe,y:me,width:R,height:ze})})}if(D.size>0&&y.current){const q=y.current.clientWidth||window.innerWidth||1200,R=y.current.clientHeight||window.innerHeight||800,I=Ne.current.pan,G=Ne.current.zoom||.75,H=(q/2-I.x)/G,Y=(R/2-I.y)/G;let P=1/0,ue=1/0,B=-1/0,oe=-1/0;D.forEach(De=>{P=Math.min(P,De.x),ue=Math.min(ue,De.y),B=Math.max(B,De.x+De.width),oe=Math.max(oe,De.y+De.height)});const me=(P+B)/2,Se=(ue+oe)/2,Le=Math.round(H-me),We=Math.round(Y-Se);D.forEach((De,ze)=>{D.set(ze,{...De,x:De.x+Le,y:De.y+We})});for(let De=0;De<re.length;De++)re[De]={...re[De],x:re[De].x+Le,y:re[De].y+We}}return{baseNodes:D,networkBoxes:re,activeEdges:Ee}},[t,r,e]),Je=we.useMemo(()=>{const D=new Map;return Ze.forEach((re,ae)=>{const Z=a[ae]||{x:0,y:0},Ee=l[ae];D.set(ae,{...re,displayLabel:(Ee==null?void 0:Ee.customLabel)!==void 0?Ee.customLabel:re.displayLabel,x:re.x+Z.x,y:re.y+Z.y,width:(Ee==null?void 0:Ee.width)||re.width,height:(Ee==null?void 0:Ee.height)||re.height})}),D},[Ze,a,l]),ee=D=>{x(D),window.setTimeout(()=>{const re=Je.get(D.id),ae=y.current;if(re&&ae){const Z=ae.clientWidth||900,Ee=ae.clientHeight||700,$=Math.max(o,.95),fe=Math.round(Z/2-(re.x+re.width/2)*$),he=Math.round(Ee/2-(re.y+re.height/2)*$);d({x:fe,y:he},$)}},50)},at=we.useMemo(()=>{const D=[],re=(i==null?void 0:i.id)||(n==null?void 0:n.id),ae=[];return je.forEach(Z=>{const Ee=Je.get(Z.sourceId),$=Je.get(Z.targetId);if(!Ee||!$)return;const fe=Math.max(0,Ee.outPins.findIndex(oe=>oe.edgeId===Z.id)),he=Math.max(0,$.inPins.findIndex(oe=>oe.edgeId===Z.id)),q=Ee.x+Ee.width,R=Ee.y+Kn+zo+fe*Fr+Fr/2,I=$.x,G=$.y+Kn+zo+he*Fr+Fr/2;let H="NORMAL";Z.branchOutcome==="FALSE"?H="FALSE":Z.branchOutcome==="TRUE"&&(H="TRUE");const Y=QA(q,R,I,G,ae),P=Y.map(oe=>`${oe.x},${oe.y}`).join(" "),ue=eC(Y,120),B=ye===Z.id||re===Z.sourceId||re===Z.targetId;D.push({id:Z.id,rawEdge:Z,pointsStr:P,points:Y,arrows:ue,kind:Z.kind,branchType:H,isHighlighted:B,label:Z.label})}),D},[je,Je,i==null?void 0:i.id,n==null?void 0:n.id,ye]),Ie=D=>{if(D.preventDefault(),D.stopPropagation(),!y.current)return;const re=D.target.closest("[data-comment-id]"),ae=re?re.getAttribute("data-comment-id"):null;ae&&K(ae);const Z=y.current.getBoundingClientRect(),Ee=D.clientX-Z.left,$=D.clientY-Z.top,fe=Math.round((Ee-s.x)/o),he=Math.round(($-s.y)/o);de({screenX:Ee,screenY:$,worldX:fe,worldY:he,targetCommentId:ae})},Ge=D=>{if(D.stopPropagation(),!Q)return;const re=`comment_${Date.now()}`,ae={id:re,title:"Comment // Click & press DEL (Entf) or right-click to delete",x:Q.worldX,y:Q.worldY,width:360,height:190};p([...c,ae]),K(re),de(null)},Me=D=>{p(c.filter(re=>re.id!==D)),te===D&&K(null),de(null)},dt=(D,re)=>{p(c.map(ae=>ae.id===D?{...ae,title:re}:ae))},He=(D,re)=>{h({...l,[D]:{...l[D]||{},customLabel:re}})},L=D=>{D.button!==2&&(D.target.closest('[data-context-menu="true"]')||(de(null),W(null),D.target.closest('[data-comment-control="true"]')||K(null),!(D.target.closest('[data-node-card="true"]')||D.target.closest('[data-comment-control="true"]'))&&(T(!0),z.current={x:D.clientX-s.x,y:D.clientY-s.y})))},M=(D,re)=>{if(D.button===2)return;D.stopPropagation(),de(null),K(null);const ae=a[re]||{x:0,y:0};b(re),V.current={mouseX:D.clientX,mouseY:D.clientY,initX:ae.x,initY:ae.y}},ne=(D,re,ae,Z)=>{D.stopPropagation(),de(null),pe({id:re,mouseX:D.clientX,mouseY:D.clientY,initW:ae,initH:Z})},ve=(D,re)=>{D.button!==2&&(D.stopPropagation(),de(null),K(re.id),J(re.id),O.current={mouseX:D.clientX,mouseY:D.clientY,initX:re.x,initY:re.y})},ge=(D,re,ae)=>{D.stopPropagation(),de(null),K(re.id),ce({id:re.id,dir:ae,mouseX:D.clientX,mouseY:D.clientY,initX:re.x,initY:re.y,initW:re.width,initH:re.height})},xe=D=>{if(X){const re=(D.clientX-X.mouseX)/o,ae=(D.clientY-X.mouseY)/o,Z=Math.max(170,Math.round(X.initW+re)),Ee=Math.max(48,Math.round(X.initH+ae));h({...l,[X.id]:{...l[X.id]||{},width:Z,height:Ee}});return}if(le){const re=(D.clientX-le.mouseX)/o,ae=(D.clientY-le.mouseY)/o,Z=140,Ee=80;p(c.map($=>{if($.id!==le.id)return $;let{initX:fe,initY:he,initW:q,initH:R}=le;const I=le.dir;if(I.includes("e")&&(q=Math.max(Z,Math.round(le.initW+re))),I.includes("s")&&(R=Math.max(Ee,Math.round(le.initH+ae))),I.includes("w")){const G=Math.round(le.initW-re);G>=Z&&(q=G,fe=Math.round(le.initX+re))}if(I.includes("n")){const G=Math.round(le.initH-ae);G>=Ee&&(R=G,he=Math.round(le.initY+ae))}return{...$,x:fe,y:he,width:q,height:R}}));return}if(U){const re=(D.clientX-O.current.mouseX)/o,ae=(D.clientY-O.current.mouseY)/o;p(c.map(Z=>Z.id===U?{...Z,x:Math.round(O.current.initX+re),y:Math.round(O.current.initY+ae)}:Z));return}if(E){const re=(D.clientX-V.current.mouseX)/o,ae=(D.clientY-V.current.mouseY)/o;f({...a,[E]:{x:Math.round(V.current.initX+re),y:Math.round(V.current.initY+ae)}});return}w&&d({x:D.clientX-z.current.x,y:D.clientY-z.current.y},o)},ke=()=>{T(!1),b(null),pe(null),J(null),ce(null)},Te=(D=1,re="LCV-2D-Graph")=>{const ae=Array.from(Je.values());if(ae.length===0)return;let Z=1/0,Ee=1/0,$=-1/0,fe=-1/0;ae.forEach(B=>{Z=Math.min(Z,B.x-80),Ee=Math.min(Ee,B.y-80),$=Math.max($,B.x+B.width+80),fe=Math.max(fe,B.y+B.height+80)}),Ke.forEach(B=>{Z=Math.min(Z,B.x-60),Ee=Math.min(Ee,B.y-60),$=Math.max($,B.x+B.width+60),fe=Math.max(fe,B.y+B.height+60)}),c.forEach(B=>{Z=Math.min(Z,B.x-60),Ee=Math.min(Ee,B.y-60),$=Math.max($,B.x+B.width+60),fe=Math.max(fe,B.y+B.height+60)});const he=Math.max(1400,$-Z+120),q=Math.max(900,fe-Ee+120),R=document.createElement("canvas");R.width=Math.min(8192,Math.round(he*D)),R.height=Math.min(8192,Math.round(q*D));const I=R.getContext("2d");if(!I)return;const G=Math.min(R.width/he,R.height/q);I.scale(G,G),I.fillStyle="#070709",I.fillRect(0,0,he,q),I.strokeStyle="#141418",I.lineWidth=1;for(let B=0;B<he;B+=28)I.beginPath(),I.moveTo(B,0),I.lineTo(B,q),I.stroke();for(let B=0;B<q;B+=28)I.beginPath(),I.moveTo(0,B),I.lineTo(he,B),I.stroke();const H=-Z+60,Y=-Ee+60;[...Ke,...c.map(B=>({...B,lang:"COMMENT"}))].forEach(B=>{I.fillStyle="rgba(20, 20, 26, 0.84)",I.strokeStyle=B.lang==="COMMENT"?"#E5A93C":"#3F3F46",I.lineWidth=B.lang==="COMMENT"?2:1.5,I.fillRect(B.x+H,B.y+Y,B.width,B.height),I.strokeRect(B.x+H,B.y+Y,B.width,B.height),I.fillStyle="#F7D794",I.font="bold 13px sans-serif",I.fillText(B.title,B.x+H+12,B.y+Y+22)}),at.forEach(B=>{if(!(B.points.length<2)){I.strokeStyle=B.branchType==="TRUE"?"#22C55E":B.branchType==="FALSE"?"#EF4444":B.kind==="CROSS_FILE_CALL"||B.kind==="CLASS_DEPENDENCY"?"#E5A93C":"#A1A1AA",I.lineWidth=2.4,I.beginPath(),I.moveTo(B.points[0].x+H,B.points[0].y+Y);for(let oe=1;oe<B.points.length;oe++)I.lineTo(B.points[oe].x+H,B.points[oe].y+Y);I.stroke(),B.arrows.forEach(oe=>{I.save(),I.translate(oe.x+H,oe.y+Y),I.rotate(oe.angleDeg*Math.PI/180),I.fillStyle=B.branchType==="TRUE"?"#22C55E":B.branchType==="FALSE"?"#EF4444":"#E5A93C",I.beginPath(),I.moveTo(5.5,0),I.lineTo(-4.5,-3.8),I.lineTo(-4.5,3.8),I.closePath(),I.fill(),I.restore()})}}),ae.forEach(({node:B,displayLabel:oe,x:me,y:Se,width:Le,height:We,inPins:De,outPins:ze,hasSelfLoop:Xe})=>{const Qe=me+H,ct=Se+Y;if(I.fillStyle="#0D0D12",I.strokeStyle=B.kind===Re.CLASS?"#E5A93C":"#52525B",I.lineWidth=2,I.fillRect(Qe,ct,Le,We),I.strokeRect(Qe,ct,Le,We),I.fillStyle=B.kind===Re.CLASS?"#261D10":"#18181F",I.fillRect(Qe,ct,Le,Kn),I.fillStyle=B.kind===Re.CLASS?"#F7D794":"#F4F4F5",I.font="bold 11px monospace",I.fillText(oe.slice(0,28),Qe+8,ct+16),De.forEach((ht,rt)=>{const $e=ct+Kn+zo+rt*Fr;I.fillStyle="#E5A93C",I.fillRect(Qe+6,$e+4,6,6),I.fillStyle="#D4D4D8",I.font="9px monospace",I.fillText(ht.label,Qe+16,$e+11)}),ze.forEach((ht,rt)=>{const $e=ct+Kn+zo+rt*Fr;I.fillStyle=ht.pinType==="TRUE"?"#22C55E":ht.pinType==="FALSE"?"#EF4444":"#E5A93C",I.fillRect(Qe+Le-12,$e+4,6,6),I.font="bold 9px monospace",I.fillText(ht.label,Qe+Le-16-ht.label.length*5.6,$e+11)}),Xe){I.strokeStyle="#38BDF8",I.lineWidth=2.2,I.beginPath(),I.moveTo(Qe+Le,ct+Kn+10),I.lineTo(Qe+Le+22,ct+Kn+10),I.lineTo(Qe+Le+22,ct-18),I.lineTo(Qe-18,ct-18),I.lineTo(Qe-18,ct+Kn+10),I.lineTo(Qe,ct+Kn+10),I.stroke();const ht=Qe+Le/2-22,rt=ct-30;I.fillStyle="#0284C7",I.strokeStyle="#7DD3FC",I.lineWidth=1.5,I.fillRect(ht,rt,44,18),I.strokeRect(ht,rt,44,18),I.fillStyle="#FFFFFF",I.font="bold 10px monospace",I.fillText("LOOP",ht+9,rt+13)}});const P=R.toDataURL("image/png"),ue=document.createElement("a");ue.href=P,ue.download=`${re}-${e}-${Date.now()}.png`,ue.click()};return S.jsxs("div",{ref:y,onContextMenu:Ie,onMouseDown:L,onMouseMove:xe,onMouseUp:ke,onMouseLeave:ke,className:`relative w-full h-full bg-[#070709] overflow-hidden select-none ${w?"cursor-grabbing":"cursor-grab"}`,style:{backgroundImage:"linear-gradient(to right, #121217 1px, transparent 1px), linear-gradient(to bottom, #121217 1px, transparent 1px)",backgroundSize:`${28*o}px ${28*o}px`,backgroundPosition:`${s.x}px ${s.y}px`},children:[S.jsxs("div",{className:"pointer-events-none absolute top-3 left-3 z-20 flex flex-wrap items-center gap-4 bg-[#0D0D12]/95 border border-zinc-800 px-3 py-1.5 rounded text-xs font-sans",children:[S.jsxs("span",{className:"flex items-center gap-1.5 text-[#F7D794] font-semibold",children:[S.jsx("span",{className:"w-2.5 h-2.5 rounded-xs bg-[#E5A93C] inline-block"}),"Line-Numbered Pins (in lXX / out lXX)"]}),S.jsxs("span",{className:"flex items-center gap-1.5 text-emerald-400 font-semibold",children:[S.jsx("span",{className:"w-2.5 h-2.5 rounded-xs bg-[#22C55E] inline-block"}),"True lXX Pin (Green)"]}),S.jsxs("span",{className:"flex items-center gap-1.5 text-red-400 font-semibold",children:[S.jsx("span",{className:"w-2.5 h-2.5 rounded-xs bg-[#EF4444] inline-block"}),"False lXX Pin (Red)"]}),S.jsxs("span",{className:"flex items-center gap-1.5 text-sky-300 font-semibold",children:[S.jsx("span",{className:"px-1.5 py-0.2 bg-[#0284C7] border border-sky-300 text-white font-mono text-[9.5px] font-bold",children:"LOOP"}),"Blue Loop Square"]})]}),Q&&S.jsxs("div",{"data-context-menu":"true",onMouseDown:D=>D.stopPropagation(),style:{left:Q.screenX,top:Q.screenY},className:"absolute z-50 bg-[#0E0E13] border border-[#E5A93C]/80 rounded shadow-2xl py-1 w-64 font-sans text-xs",children:[S.jsxs("button",{type:"button",onClick:Ge,className:"w-full px-3 py-2 text-left text-zinc-100 hover:bg-[#231B0E] hover:text-[#F7D794] font-semibold flex items-center gap-2 transition",children:[S.jsx(Ig,{className:"w-4 h-4 text-[#E5A93C]"}),S.jsx("span",{children:"Create Comment Box Here"})]}),(Q.targetCommentId||te)&&S.jsxs("button",{type:"button",onClick:D=>{D.stopPropagation();const re=Q.targetCommentId||te;re&&Me(re)},className:"w-full px-3 py-2 text-left text-red-400 hover:bg-red-950/70 hover:text-red-200 font-semibold flex items-center gap-2 border-t border-zinc-800 transition",children:[S.jsx(dd,{className:"w-4 h-4"}),S.jsx("span",{children:"Delete Comment Box (Entf)"})]}),S.jsxs("button",{type:"button",onClick:D=>{D.stopPropagation(),f({}),h({}),de(null)},className:"w-full px-3 py-2 text-left text-zinc-300 hover:bg-zinc-800 flex items-center gap-2 border-t border-zinc-800 transition",children:[S.jsx(qv,{className:"w-3.5 h-3.5 text-[#E5A93C]"}),S.jsx("span",{children:"Reset Node Positions & Sizes"})]})]}),S.jsx("div",{className:"origin-top-left",style:{transform:`translate3d(${s.x}px, ${s.y}px, 0) scale(${o})`},children:S.jsxs("div",{className:"relative w-[3800px] h-[3000px]",children:[Ke.map(D=>S.jsx("div",{style:{left:D.x,top:D.y,width:D.width,height:D.height},className:"pointer-events-none absolute bg-[#0D0D12]/80 border border-zinc-800/90 z-0",children:S.jsxs("div",{className:"px-3 py-1.5 bg-[#14141B] border-b border-zinc-800 flex items-center justify-between font-sans text-xs",children:[S.jsx("span",{className:"text-[#F7D794] font-semibold tracking-wide",children:D.title}),S.jsx("span",{className:"text-zinc-400 font-mono text-[11px]",children:D.lang})]})},D.id)),c.map(D=>{const re=te===D.id;return S.jsxs("div",{"data-comment-control":"true","data-comment-id":D.id,onClick:ae=>{ae.stopPropagation(),K(D.id)},style:{left:D.x,top:D.y,width:D.width,height:D.height},className:`absolute bg-[#16161E]/90 border ${re?"border-[#F7D794] ring-2 ring-[#E5A93C]/50":"border-[#E5A93C]/60"} shadow-[0_0_25px_rgba(0,0,0,0.85)] z-10 flex flex-col`,children:[S.jsxs("div",{onMouseDown:ae=>ve(ae,D),className:"px-3 py-1.5 bg-[#201E1A] border-b border-[#E5A93C]/40 flex items-center justify-between gap-2 cursor-move",children:[S.jsx("input",{type:"text",value:D.title,onChange:ae=>dt(D.id,ae.target.value),onFocus:()=>K(D.id),onMouseDown:ae=>ae.stopPropagation(),className:"bg-transparent font-sans text-xs font-semibold text-[#F7D794] focus:outline-none w-full"}),S.jsx("button",{type:"button",onClick:ae=>{ae.stopPropagation(),Me(D.id)},onMouseDown:ae=>ae.stopPropagation(),className:"text-zinc-300 hover:text-red-400 p-0.5 shrink-0",title:"Delete Comment Box (or press DEL / Entf)",children:S.jsx(dd,{className:"w-3.5 h-3.5"})})]}),S.jsxs("div",{className:"flex-1 p-2 pointer-events-none flex items-end justify-between",children:[S.jsx("span",{className:"font-sans text-[10px] text-zinc-400",children:re?"Press DEL (Entf) or Right-Click to delete":""}),S.jsxs("span",{className:"font-mono text-[10px] text-zinc-400",children:[D.width,"×",D.height,"px"]})]}),S.jsx("div",{onMouseDown:ae=>ge(ae,D,"w"),className:"absolute top-0 bottom-0 -left-2 w-4 cursor-ew-resize"}),S.jsx("div",{onMouseDown:ae=>ge(ae,D,"e"),className:"absolute top-0 bottom-0 -right-2 w-4 cursor-ew-resize"}),S.jsx("div",{onMouseDown:ae=>ge(ae,D,"n"),className:"absolute -top-2 left-0 right-0 h-4 cursor-ns-resize"}),S.jsx("div",{onMouseDown:ae=>ge(ae,D,"s"),className:"absolute -bottom-2 left-0 right-0 h-4 cursor-ns-resize"}),S.jsx("div",{onMouseDown:ae=>ge(ae,D,"se"),className:"absolute -bottom-2 -right-2 w-3.5 h-3.5 bg-[#E5A93C] cursor-nwse-resize",title:"Drag to resize Comment Box"}),S.jsx("div",{onMouseDown:ae=>ge(ae,D,"sw"),className:"absolute -bottom-2 -left-2 w-3.5 h-3.5 bg-[#E5A93C]/60 cursor-nesw-resize"}),S.jsx("div",{onMouseDown:ae=>ge(ae,D,"ne"),className:"absolute -top-2 -right-2 w-3.5 h-3.5 bg-[#E5A93C]/60 cursor-nesw-resize"}),S.jsx("div",{onMouseDown:ae=>ge(ae,D,"nw"),className:"absolute -top-2 -left-2 w-3.5 h-3.5 bg-[#E5A93C]/60 cursor-nwse-resize"})]},D.id)}),S.jsxs("svg",{className:"overflow-visible absolute top-0 left-0 w-[3800px] h-[3000px] pointer-events-none z-20",children:[at.map(D=>{if(ye!==null&&ye!==D.id)return null;const ae=D.kind==="CROSS_FILE_CALL"||D.kind==="CLASS_DEPENDENCY";let Z="#71717A";D.isHighlighted||ye===D.id?Z="#E5A93C":D.branchType==="TRUE"?Z="#22C55E":D.branchType==="FALSE"?Z="#EF4444":ae&&(Z="#D99B38");const Ee=ye===D.id||D.isHighlighted?3.4:ae?2.2:1.8,$=ye===D.id||D.isHighlighted?"#F7D794":D.branchType==="TRUE"?"#22C55E":D.branchType==="FALSE"?"#EF4444":"#E5A93C";return S.jsxs("g",{className:"pointer-events-auto",children:[S.jsx("polyline",{points:D.pointsStr,fill:"none",stroke:"transparent",strokeWidth:16,className:"cursor-pointer",onMouseEnter:()=>{be(D.id),v(D.rawEdge)},onMouseLeave:()=>{be(null),v(null)}}),S.jsx("polyline",{points:D.pointsStr,fill:"none",stroke:Z,strokeWidth:Ee,strokeLinejoin:"bevel",className:"pointer-events-none"}),D.arrows.map((fe,he)=>S.jsx("polygon",{points:"-4,-3.5 5,0 -4,3.5",fill:$,transform:`translate(${fe.x}, ${fe.y}) rotate(${fe.angleDeg})`,className:"pointer-events-none"},he))]},D.id)}),Array.from(Je.values()).map(({node:D,x:re,y:ae,width:Z,hasSelfLoop:Ee})=>{if(!Ee)return null;const $=`self_loop_${D.id}`;if(ye!==null&&ye!==$)return null;const fe=ae+Kn+12,he=ae+Kn+12,q=ae-22,R=re+Z+22,I=re-20,G=re+Z/2,H=`${re+Z},${fe} ${R},${fe} ${R},${q} ${I},${q} ${I},${he} ${re},${he}`,Y={id:$,sourceId:D.id,targetId:D.id,kind:"RECURSION",sourceFile:D.fileName,targetFile:D.fileName,callLine:D.lineStart,label:"LOOP",branchOutcome:"LOOP"};return S.jsxs("g",{className:"pointer-events-auto",children:[S.jsx("polyline",{points:H,fill:"none",stroke:"transparent",strokeWidth:14,className:"cursor-pointer",onMouseEnter:()=>{be($),v(Y)},onMouseLeave:()=>{be(null),v(null)}}),S.jsx("polyline",{points:H,fill:"none",stroke:"#38BDF8",strokeWidth:ye===$?3.5:2.3,strokeLinejoin:"miter",className:"pointer-events-none"}),S.jsx("polygon",{points:"4,-3.5 -5,0 4,3.5",fill:"#38BDF8",transform:`translate(${G-34}, ${q})`,className:"pointer-events-none"}),S.jsx("rect",{x:G-24,y:q-10,width:48,height:20,fill:"#0284C7",stroke:"#E0F2FE",strokeWidth:1.5,className:"cursor-pointer",onMouseEnter:()=>{be($),v(Y)},onMouseLeave:()=>{be(null),v(null)}}),S.jsx("text",{x:G,y:q+3.5,textAnchor:"middle",fill:"#FFFFFF",fontSize:"10.5",fontFamily:"monospace",fontWeight:"bold",className:"pointer-events-none",children:"LOOP"})]},$)})]}),Array.from(Je.values()).map(({node:D,displayLabel:re,x:ae,y:Z,width:Ee,height:$,inPins:fe,outPins:he,hasSelfLoop:q})=>{const R=(n==null?void 0:n.id)===D.id,I=(i==null?void 0:i.id)===D.id;let G="bg-[#202027] text-zinc-100 border-b border-zinc-700",H="border-zinc-700";if(D.kind===Re.CLASS)G="bg-[#281E10] text-[#F7D794] font-semibold border-b border-[#E5A93C]/60",H="border-[#E5A93C]/80";else if(q)G="bg-[#0F2238] text-sky-200 font-semibold border-b border-sky-500/60",H="border-sky-500/80";else if(D.kind===Re.FUNCTION)G="bg-[#191920] text-[#F3C66F] font-semibold border-b border-[#E5A93C]/40",H="border-zinc-600";else if(D.kind===Re.CONDITION){const P=D.label.toLowerCase().startsWith("else");G=P?"bg-[#2D1418] text-red-200 font-semibold border-b border-red-500/40":"bg-[#12291D] text-emerald-200 font-semibold border-b border-emerald-500/40",H=P?"border-red-500/60":"border-emerald-500/60"}const Y=Math.max(fe.length,he.length,1);return S.jsxs("div",{"data-node-card":"true",onMouseDown:P=>M(P,D.id),onMouseEnter:()=>u(D),onClick:()=>m(D),onDoubleClick:P=>{P.stopPropagation(),W(D.id)},style:{left:ae,top:Z,width:Ee,height:$},className:`absolute bg-[#0C0C11] border ${H} flex flex-col cursor-move select-none shadow-lg ${R||I?"ring-2 ring-[#E5A93C] z-30":"z-20"}`,children:[S.jsxs("div",{className:`h-[24px] shrink-0 px-2 text-[11px] font-mono flex items-center justify-between gap-1 truncate ${G}`,children:[S.jsxs("div",{className:"flex items-center gap-1.5 truncate",children:[q&&S.jsx("span",{className:"px-1.5 py-0.2 bg-[#0284C7] border border-sky-200 text-white font-mono text-[9px] font-bold shrink-0",children:"LOOP"}),F===D.id?S.jsx("input",{type:"text",autoFocus:!0,value:re,onChange:P=>He(D.id,P.target.value),onBlur:()=>W(null),onKeyDown:P=>{P.key==="Enter"&&W(null)},onMouseDown:P=>P.stopPropagation(),className:"bg-black text-[#F7D794] px-1 w-full text-[11px] font-mono focus:outline-none"}):S.jsx("span",{className:"truncate",title:"Double-click to rename node",children:re})]}),S.jsxs("span",{className:"text-[9.5px] text-zinc-400 ml-1 shrink-0",children:["L",D.lineStart]})]}),S.jsx("div",{className:"pt-[10px] pb-1.5 px-2 flex flex-col",children:Array.from({length:Y}).map((P,ue)=>{const B=fe[ue],oe=he[ue];return S.jsxs("div",{className:"h-[18px] flex items-center justify-between font-mono text-[9.5px]",children:[B?S.jsxs("span",{onMouseEnter:me=>{me.stopPropagation(),B.edge&&(be(B.edgeId),v(B.edge))},onMouseLeave:()=>{be(null),v(null)},className:"flex items-center gap-1.5 text-zinc-300 hover:text-white cursor-pointer",children:[S.jsx("span",{className:"w-2 h-2 bg-[#E5A93C] inline-block shrink-0"}),S.jsx("span",{children:B.label})]}):S.jsx("span",{}),oe?S.jsxs("span",{onMouseEnter:me=>{me.stopPropagation(),oe.edge&&(be(oe.edgeId),v(oe.edge))},onMouseLeave:()=>{be(null),v(null)},className:`flex items-center gap-1.5 font-semibold cursor-pointer ${oe.pinType==="TRUE"?"text-emerald-400 hover:text-emerald-200":oe.pinType==="FALSE"?"text-red-400 hover:text-red-200":"text-[#F7D794] hover:text-white"}`,children:[S.jsx("span",{children:oe.label}),S.jsx("span",{className:`w-2 h-2 inline-block shrink-0 ${oe.pinType==="TRUE"?"bg-[#22C55E]":oe.pinType==="FALSE"?"bg-[#EF4444]":"border border-[#E5A93C] bg-[#E5A93C]/30"}`})]}):S.jsx("span",{})]},ue)})}),S.jsx("div",{onMouseDown:P=>ne(P,D.id,Ee,$),className:"absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-zinc-600 hover:bg-[#E5A93C] cursor-nwse-resize",title:"Drag to resize node"})]},D.id)})]})}),S.jsxs("div",{className:"absolute bottom-3 left-3 z-30 flex flex-wrap items-center gap-1.5 bg-[#0E0E13]/95 border border-zinc-800 rounded p-1.5 shadow-2xl",children:[S.jsx(Qv,{allNodes:t.allNodes,onSelectFocusNode:ee}),S.jsx("button",{type:"button",onClick:()=>d(s,Math.min(2.2,Number((o+.15).toFixed(2)))),className:"p-1.5 rounded text-zinc-300 hover:text-[#F7D794] hover:bg-[#231B0E] transition",title:"Zoom In",children:S.jsx(Kv,{className:"w-3.5 h-3.5"})}),S.jsx("button",{type:"button",onClick:()=>d(s,Math.max(.25,Number((o-.15).toFixed(2)))),className:"p-1.5 rounded text-zinc-300 hover:text-[#F7D794] hover:bg-[#231B0E] transition",title:"Zoom Out",children:S.jsx(Jv,{className:"w-3.5 h-3.5"})}),S.jsx("button",{type:"button",onClick:()=>{d({x:40,y:40},.75),f({}),h({})},className:"p-1.5 rounded text-zinc-300 hover:text-[#F7D794] hover:bg-[#231B0E] transition",title:"Reset Layout & View",children:S.jsx(CA,{className:"w-3.5 h-3.5"})}),S.jsxs("span",{className:"px-2 text-[11px] font-sans text-zinc-400 border-l border-zinc-800 flex items-center gap-1",children:[S.jsx(DA,{className:"w-3 h-3 text-[#E5A93C]"}),S.jsxs("span",{children:[Math.round(o*100),"%"]})]}),S.jsxs("button",{type:"button",onClick:()=>{const D=`comment_${Date.now()}`,re={id:D,title:"Comment // Click & press DEL (Entf) or right-click to delete",x:Math.round((260-s.x)/o),y:Math.round((160-s.y)/o),width:360,height:190};p([...c,re]),K(D)},className:"px-2.5 py-1 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-[#F7D794] font-sans text-xs font-medium flex items-center gap-1 transition",title:"Add Resizable Comment Box (or Right-Click anywhere)",children:[S.jsx(Ig,{className:"w-3.5 h-3.5 text-[#E5A93C]"}),S.jsx("span",{children:"+ Comment"})]}),te&&S.jsxs("button",{type:"button",onClick:()=>Me(te),className:"px-2.5 py-1 rounded bg-red-950/90 hover:bg-red-800 text-red-200 border border-red-700 font-sans text-xs font-medium flex items-center gap-1 transition",title:"Delete Selected Comment Box (Shortcut: DEL / Entf)",children:[S.jsx(dd,{className:"w-3.5 h-3.5"}),S.jsx("span",{children:"Delete Comment"})]}),S.jsxs("button",{type:"button",onClick:g,className:"px-2.5 py-1 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700 font-sans text-xs font-medium flex items-center gap-1 transition",title:"Export Nodes, Positions, Sizes & Comments as JSON",children:[S.jsx(Wv,{className:"w-3.5 h-3.5 text-[#E5A93C]"}),S.jsx("span",{children:"Export JSON"})]}),S.jsx("input",{ref:A,type:"file",accept:".json,application/json",className:"hidden",onChange:D=>{var ae;const re=(ae=D.target.files)==null?void 0:ae[0];re&&(_(re),D.target.value="")}}),S.jsxs("button",{type:"button",onClick:()=>{var D;return(D=A.current)==null?void 0:D.click()},className:"px-2.5 py-1 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700 font-sans text-xs font-medium flex items-center gap-1 transition",title:"Import Layout JSON to restore exact nodes, sizes, and comments",children:[S.jsx(Rc,{className:"w-3.5 h-3.5 text-[#E5A93C]"}),S.jsx("span",{children:"Import JSON"})]}),S.jsxs("button",{type:"button",onClick:()=>Te(1,"LCV-2D-Graph"),className:"px-2.5 py-1 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700 font-sans text-xs font-medium flex items-center gap-1 transition",title:"Export 2D Graph as Standard PNG",children:[S.jsx(Hv,{className:"w-3.5 h-3.5 text-[#E5A93C]"}),S.jsx("span",{children:"Export 2D PNG"})]}),S.jsxs("button",{type:"button",onClick:()=>Te(2.4,"LCV-FULL-GIANT-GRAPH"),className:"px-3 py-1 rounded bg-[#231B0E] hover:bg-[#2F2412] border border-[#E5A93C]/80 text-[#F7D794] font-sans text-xs font-semibold flex items-center gap-1.5 transition",title:"Export Entire Full Graph as Ultra-High-Resolution Giant PNG",children:[S.jsx(lA,{className:"w-3.5 h-3.5 text-[#E5A93C]"}),S.jsx("span",{children:"Full Graph Giant PNG"})]})]})]})},nC=({files:t,filterFileId:e,collapsed:n,onToggleCollapse:i,onSelectFilterFile:r,onUploadArchive:s,isUploading:o})=>{const a=we.useRef(null);return n?S.jsxs("aside",{className:"w-9 shrink-0 h-full bg-[#0A0A0E] border-r border-zinc-800/90 flex flex-col items-center py-2.5 select-none",children:[S.jsx("button",{onClick:i,className:"p-1.5 rounded bg-zinc-900 hover:bg-[#231B0E] text-zinc-300 hover:text-[#F7D794] transition",title:"Expand Classes / Files Sidebar",children:S.jsx(Cc,{className:"w-4 h-4"})}),S.jsxs("div",{className:"mt-6 [writing-mode:vertical-rl] rotate-180 font-sans text-[11px] font-medium uppercase tracking-widest text-zinc-400",children:["Classes / Files (",t.length,")"]})]}):S.jsxs("aside",{className:"w-[215px] shrink-0 h-full bg-[#0A0A0E] border-r border-zinc-800/90 flex flex-col select-none text-zinc-200",children:[S.jsxs("div",{className:"px-3 py-2.5 border-b border-zinc-800/90 flex items-center justify-between",children:[S.jsx("span",{className:"font-sans text-xs uppercase tracking-wider text-zinc-300 font-semibold",children:"Classes / Files"}),S.jsxs("div",{className:"flex items-center gap-1",children:[S.jsx("input",{ref:a,type:"file",multiple:!0,accept:".zip,.rar,.7z,.c,.cpp,.h,.hpp,.java,.py,.rs,.cs,.js,.ts",className:"hidden",onChange:l=>{l.target.files&&l.target.files.length>0&&s(l.target.files)}}),S.jsxs("button",{onClick:()=>{var l;return(l=a.current)==null?void 0:l.click()},disabled:o,className:"px-2 py-0.5 rounded bg-[#231B0E] hover:bg-[#2F2412] border border-[#E5A93C]/60 text-[#F7D794] font-sans text-[11px] font-semibold flex items-center gap-1 transition",title:"Upload .ZIP, .RAR, .7Z or Direct Source Code Files",children:[S.jsx(Rc,{className:"w-3 h-3 text-[#E5A93C]"}),S.jsx("span",{children:o?"...":"7Z/ZIP"})]}),S.jsx("button",{onClick:i,className:"p-1 rounded text-zinc-400 hover:text-white hover:bg-zinc-800",title:"Collapse Sidebar (Saved in Cookie)",children:S.jsx(Dh,{className:"w-3.5 h-3.5"})})]})]}),S.jsx("button",{onClick:()=>r(null),className:`w-full px-3 py-2.5 text-left font-sans text-xs flex items-center justify-between border-b border-zinc-800/80 transition ${e===null?"bg-[#231B0E] text-[#F7D794] font-semibold border-l-4 border-l-[#E5A93C]":"text-zinc-300 hover:bg-zinc-900"}`,children:S.jsxs("span",{className:"flex items-center gap-2 truncate",children:[S.jsx($v,{className:"w-3.5 h-3.5 shrink-0 text-[#E5A93C]"}),S.jsxs("span",{children:["All Project (",t.length,")"]})]})}),S.jsx("div",{className:"flex-1 overflow-y-auto divide-y divide-zinc-900/80 font-sans text-xs",children:t.map(l=>{const c=e===l.id,d=l.nodes[0],f=l.nodes.filter(h=>h.kind==="FUNCTION"||h.kind==="RECURSION").length;return S.jsxs("button",{onClick:()=>r(c?null:l.id),className:`w-full px-3 py-2.5 text-left transition flex flex-col gap-1 ${c?"bg-[#1D1811] border-l-4 border-[#E5A93C] text-[#F7D794]":"hover:bg-zinc-900/70 text-zinc-300"}`,children:[S.jsxs("div",{className:"flex items-center justify-between gap-1",children:[S.jsx("span",{className:"font-semibold text-zinc-100 truncate",children:(d==null?void 0:d.symbolName)||l.name}),S.jsx("span",{className:"text-[10px] font-mono px-1.5 py-0.2 rounded bg-zinc-900 text-[#E5A93C] border border-zinc-700/80",children:l.kindLabel})]}),S.jsxs("div",{className:"flex items-center justify-between text-[11px] text-zinc-400",children:[S.jsxs("span",{className:"truncate flex items-center gap-1",children:[S.jsx(hA,{className:"w-3 h-3 text-zinc-500"}),l.name]}),S.jsxs("span",{className:"font-mono text-[10px] text-zinc-500",children:[f," fn"]})]})]},l.id)})})]})},iC=new Set(["public","private","protected","static","virtual","inline","async","await","class","struct","interface","impl","fn","def","function","return","if","else","for","while","switch","case","break","continue","match","using","import","from","package","include","new","null","NULL","None","true","false","True","False","void","int","float","double","bool","string","char","let","const","var","pub","usize","uint32_t","size_t","self","this"]);function rC(t){const e=t.trim();if(e.startsWith("//")||e.startsWith("#")||e.startsWith("/*")||e.startsWith("*"))return S.jsx("span",{className:"text-zinc-500 italic",children:t});const n=/(".*?"|'.*?'|\b[a-zA-Z_][a-zA-Z0-9_]*\b|\b\d+(?:\.\d+)?f?\b)/g,i=t.split(n);return i.map((r,s)=>{if(!r)return null;if(r.startsWith('"')&&r.endsWith('"')||r.startsWith("'")&&r.endsWith("'"))return S.jsx("span",{className:"text-amber-200",children:r},s);if(/^\d+(?:\.\d+)?f?$/.test(r))return S.jsx("span",{className:"text-orange-300",children:r},s);if(iC.has(r))return S.jsx("span",{className:"text-[#F3C66F] font-semibold",children:r},s);const o=i[s+1]||"";return/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(r)&&o.trimStart().startsWith("(")?S.jsx("span",{className:"text-sky-300 font-medium",children:r},s):S.jsx("span",{className:"text-zinc-200",children:r},s)})}const Og=()=>{const[t,e]=we.useState(()=>Hi("lcv_fox_banner_collapsed","false")==="true");we.useEffect(()=>{if(t)return;const i=window.setTimeout(()=>{e(!0),Gt("lcv_fox_banner_collapsed","true")},3e4);return()=>window.clearTimeout(i)},[t]);const n=()=>{e(i=>{const r=!i;return Gt("lcv_fox_banner_collapsed",String(r)),r})};return S.jsxs("div",{className:"bg-[#0C0C10] border-t border-[#E5A93C]/50 shrink-0 select-none",children:[S.jsxs("button",{type:"button",onClick:n,className:"w-full px-3.5 py-2.5 bg-[#14141A] hover:bg-[#1B1B22] flex items-center justify-between transition",title:t?"Expand Fox Support Banner":"Collapse Fox Support Banner (Auto-minimizes after 30s)",children:[S.jsxs("span",{className:"font-sans text-xs uppercase tracking-wider text-[#F7D794] font-semibold flex items-center gap-1.5",children:[S.jsx(Xv,{className:"w-3.5 h-3.5 fill-[#E5A93C] text-[#E5A93C]"}),S.jsx("span",{children:"Support Wild Foxes — Fuchshilfe"})]}),t?S.jsx(qb,{className:"w-4 h-4 text-[#E5A93C]"}):S.jsx(jb,{className:"w-4 h-4 text-[#E5A93C]"})]}),!t&&S.jsxs("div",{className:"p-3.5 flex items-start gap-3",children:[S.jsx("a",{href:"https://fuchshilfe-berlin.de/IHR-WOLLT-UNS-UNTERSTUeTZEN",target:"_blank",rel:"noopener noreferrer",className:"shrink-0 bg-white p-1.5 rounded border border-[#E5A93C]",title:"Scan or click to support Fuchshilfe Berlin on Amazon",children:S.jsx("img",{src:"https://fuchshilfe-berlin.de/.cm4all/uproc.php/0/.qrcode_www.amazon.de.png/picture-1600?_=1993dea75cf",alt:"Fuchshilfe Berlin Amazon QR Code",className:"w-20 h-20 object-contain"})}),S.jsxs("div",{className:"space-y-2 text-xs font-sans text-zinc-200 leading-relaxed",children:[S.jsxs("p",{children:["Instead of donating to the developer, please support"," ",S.jsx("strong",{className:"text-[#F7D794]",children:"Fuchshilfe"})," so wild foxes can live a good life and sick or injured foxes can recover and get healthy again."]}),S.jsxs("a",{href:"https://fuchshilfe-berlin.de/IHR-WOLLT-UNS-UNTERSTUeTZEN",target:"_blank",rel:"noopener noreferrer",className:"inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#231B0E] hover:bg-[#2F2412] border border-[#E5A93C]/70 text-[#F7D794] font-sans font-semibold text-xs transition",children:[S.jsx("span",{children:"Donate via Amazon Wishlist"}),S.jsx(jv,{className:"w-3 h-3"})]})]})]})]})},sC=({activeNode:t,hoveredEdge:e,repository:n,collapsed:i,onToggleCollapse:r,onSelectNode:s})=>{const o=we.useRef(null),{displayContainerNode:a,highlightSpec:l}=we.useMemo(()=>{const p=g=>{if(g.kind===Re.FUNCTION||g.kind===Re.RECURSION||g.kind===Re.CLASS)return g;let _=g;for(;_&&_.parentId;){const u=n.allNodes.find(v=>v.id===_.parentId);if(!u)break;if(u.kind===Re.FUNCTION||u.kind===Re.RECURSION)return u;_=u}return n.allNodes.find(u=>u.fileId===g.fileId&&(u.kind===Re.FUNCTION||u.kind===Re.RECURSION)&&g.lineStart>=u.lineStart&&g.lineStart<=u.lineEnd)||g};if(e){const g=n.allNodes.find(m=>m.id===e.sourceId),_=n.allNodes.find(m=>m.id===e.targetId);if(g){const m=p(g),u=g.kind===Re.CONDITION||g.kind===Re.LOOP;return{displayContainerNode:m,highlightSpec:{exactLine:e.callLine,rangeStart:u?g.lineStart:e.callLine,rangeEnd:u?g.lineEnd:e.callLine,outcome:e.branchOutcome||"TRUE",badgeText:_?`CALLS ${_.symbolName}() AT FILE LINE ${e.callLine}`:`ACTIVE LINE ${e.callLine}`}}}}if(t){const g=p(t),_=g.id!==t.id;let m="NORMAL";return t.kind===Re.LOOP||t.isRecursive?m="LOOP":t.kind===Re.CONDITION&&(m=t.label.toLowerCase().startsWith("else")?"FALSE":"TRUE"),{displayContainerNode:g,highlightSpec:{exactLine:t.lineStart,rangeStart:t.lineStart,rangeEnd:_?t.lineEnd:t.lineStart,outcome:m,badgeText:_?`${t.kind}: ${t.label} (File Lines ${t.lineStart}–${t.lineEnd})`:`FUNCTION ENTRY (File Line ${t.lineStart})`}}}return{displayContainerNode:null,highlightSpec:null}},[t,e,n.allNodes]);if(we.useEffect(()=>{if(!o.current||!l)return;const p=o.current.querySelector('[data-highlighted-anchor="true"]');p&&p.scrollIntoView({behavior:"smooth",block:"center"})},[l==null?void 0:l.exactLine,l==null?void 0:l.rangeStart,a==null?void 0:a.id]),i)return S.jsxs("aside",{className:"w-9 shrink-0 h-full bg-[#0A0A0E] border-l border-zinc-800/90 flex flex-col items-center py-2.5 select-none",children:[S.jsx("button",{onClick:r,className:"p-1.5 rounded bg-zinc-900 hover:bg-[#231B0E] text-zinc-300 hover:text-[#F7D794] transition",title:"Show Complete Function & Fuchshilfe Support Panel",children:S.jsx(Dh,{className:"w-4 h-4"})}),S.jsx("div",{className:"mt-6 [writing-mode:vertical-rl] font-sans text-[11px] font-medium uppercase tracking-widest text-zinc-400",children:"Function Code & Fox Support"})]});const c=t||a;if(!c||!a)return S.jsxs("aside",{className:"w-[350px] shrink-0 h-full bg-[#0A0A0E] border-l border-zinc-800/90 flex flex-col justify-between text-zinc-400 font-sans text-xs",children:[S.jsx("div",{className:"p-3 flex justify-end",children:S.jsx("button",{onClick:r,className:"p-1 rounded text-zinc-400 hover:text-white",title:"Hide Inspector",children:S.jsx(Cc,{className:"w-4 h-4"})})}),S.jsxs("div",{className:"border-l-2 border-[#E5A93C] pl-3 mx-4 space-y-1.5 my-auto",children:[S.jsx("div",{className:"text-zinc-100 font-semibold",children:"Hover or Click Any Node or Wire"}),S.jsx("p",{className:"text-xs leading-relaxed text-zinc-400",children:"Hover over any branch, wire, or node in the graph to inspect its enclosing function and see the exact active line highlighted."})]}),S.jsx(Og,{})]});const d=a.codeSnippet.split(`
`),f=c.callsIds.map(p=>n.allNodes.find(g=>g.id===p)).filter(p=>!!p),h=c.calledByIds.map(p=>n.allNodes.find(g=>g.id===p)).filter(p=>!!p);return S.jsxs("aside",{className:"w-[355px] shrink-0 h-full bg-[#0A0A0E] border-l border-zinc-800/90 flex flex-col text-zinc-200 overflow-hidden select-text",children:[S.jsxs("div",{className:"p-3 bg-[#101016] border-b border-zinc-800/90 border-l-4 border-l-[#E5A93C]",children:[S.jsxs("div",{className:"flex items-center justify-between gap-1",children:[S.jsxs("span",{className:"font-sans text-[11px] uppercase tracking-wider px-2 py-0.5 rounded bg-[#231B0E] border border-[#E5A93C]/50 text-[#F7D794] font-semibold",children:[c.language," • ",c.kind]}),S.jsxs("div",{className:"flex items-center gap-1.5",children:[S.jsxs("span",{className:"font-mono text-[11px] text-zinc-400",children:["File L",a.lineStart,"–L",a.lineEnd]}),S.jsx("button",{onClick:r,className:"p-1 rounded text-zinc-400 hover:text-white hover:bg-zinc-800",title:"Hide Function Panel (Saved in Cookie)",children:S.jsx(Cc,{className:"w-3.5 h-3.5"})})]})]}),S.jsxs("h3",{className:"font-mono font-semibold text-xs text-zinc-100 mt-2 break-all",children:[a.className," :: ",a.label]}),S.jsxs("div",{className:"font-sans text-[11px] text-zinc-400 mt-0.5 flex items-center justify-between",children:[S.jsx("span",{children:a.fileName}),S.jsxs("span",{className:"font-mono text-[10px] text-[#F7D794]",children:[d.length," lines in function"]})]})]}),l&&S.jsxs("div",{className:`px-3 py-2 border-b flex items-center justify-between gap-2 text-xs font-mono ${l.outcome==="TRUE"?"bg-emerald-950/50 border-emerald-700/60 text-emerald-300":l.outcome==="FALSE"?"bg-red-950/50 border-red-700/60 text-red-300":l.outcome==="LOOP"?"bg-sky-950/50 border-sky-700/60 text-sky-300":"bg-[#231B0E]/80 border-[#E5A93C]/50 text-[#F7D794]"}`,children:[S.jsxs("div",{className:"flex items-center gap-1.5 truncate",children:[S.jsx(Vv,{className:"w-3.5 h-3.5 shrink-0"}),S.jsx("span",{className:"truncate font-semibold",children:l.badgeText})]}),S.jsxs("span",{className:"shrink-0 px-1.5 py-0.5 rounded bg-black/50 text-[10px]",children:["Fn Line #",Math.max(1,l.exactLine-a.lineStart+1)]})]}),S.jsxs("div",{className:"p-3 bg-[#121218] border-b border-zinc-800/90 space-y-1.5",children:[S.jsx("div",{className:"text-[11px] font-sans uppercase tracking-wider text-[#F7D794] font-semibold",children:"Branch / Function Explanation"}),S.jsx("p",{className:"text-xs text-zinc-200 leading-relaxed font-sans",children:c.explanation}),(c.isRecursive||c.kind===Re.LOOP)&&S.jsxs("div",{className:"flex items-center gap-2 text-xs font-sans text-sky-200 bg-sky-950/50 border border-sky-600/70 px-2.5 py-1 rounded",children:[S.jsx("span",{className:"px-1.5 py-0.5 bg-[#0284C7] text-white font-mono font-bold text-[10px] border border-sky-300",children:"LOOP"}),S.jsx("span",{children:"Self-connected blue LOOP wire active"})]})]}),(f.length>0||h.length>0)&&S.jsxs("div",{className:"p-2.5 bg-[#0E0E13] border-b border-zinc-800/90 space-y-1.5 max-h-28 overflow-y-auto",children:[S.jsxs("div",{className:"flex items-center gap-1.5 text-[10.5px] font-sans uppercase tracking-wider text-zinc-400 font-medium",children:[S.jsx(Ib,{className:"w-3 h-3 text-[#E5A93C]"}),S.jsxs("span",{children:["Call Links (",f.length+h.length,")"]})]}),S.jsxs("div",{className:"space-y-1",children:[f.map(p=>S.jsxs("button",{onClick:()=>s(p),className:"w-full text-left px-2 py-1 rounded bg-zinc-900/90 hover:bg-zinc-800 border-l-2 border-[#E5A93C] font-mono text-[11px] flex items-center justify-between",children:[S.jsxs("span",{className:"truncate text-zinc-200",children:["→ ",p.className,".",p.symbolName,"()"]}),S.jsx("span",{className:"text-zinc-500 font-sans text-[10px] shrink-0 ml-1",children:p.fileName})]},`out_${p.id}`)),h.map(p=>S.jsxs("button",{onClick:()=>s(p),className:"w-full text-left px-2 py-1 rounded bg-zinc-900/90 hover:bg-zinc-800 border-l-2 border-zinc-500 font-mono text-[11px] flex items-center justify-between",children:[S.jsxs("span",{className:"truncate text-zinc-300",children:["← ",p.className,".",p.symbolName,"()"]}),S.jsx("span",{className:"text-zinc-500 font-sans text-[10px] shrink-0 ml-1",children:p.fileName})]},`in_${p.id}`))]})]}),S.jsxs("div",{ref:o,className:"flex-1 overflow-y-auto p-2.5 font-mono text-[11.5px] leading-relaxed bg-[#070709]",children:[S.jsxs("div",{className:"flex items-center justify-between text-[10.5px] font-sans text-zinc-400 mb-2 pb-1.5 border-b border-zinc-900",children:[S.jsxs("span",{className:"flex items-center gap-1.5 text-zinc-200 font-semibold",children:[S.jsx(Gv,{className:"w-3.5 h-3.5 text-[#E5A93C]"}),S.jsx("span",{children:"Complete Function Code"})]}),S.jsx("span",{className:"font-mono text-[10px] text-zinc-500",children:"File Line | Fn #"})]}),S.jsx("div",{className:"space-y-0.5",children:d.map((p,g)=>{const _=a.lineStart+g,m=g+1,u=(l==null?void 0:l.exactLine)===_,v=l&&_>=l.rangeStart&&_<=l.rangeEnd;let x="";return u?(l==null?void 0:l.outcome)==="TRUE"?x="bg-emerald-500/25 border-l-4 border-emerald-400 ring-1 ring-emerald-500/50":(l==null?void 0:l.outcome)==="FALSE"?x="bg-red-500/25 border-l-4 border-red-400 ring-1 ring-red-500/50":(l==null?void 0:l.outcome)==="LOOP"?x="bg-sky-500/25 border-l-4 border-sky-400 ring-1 ring-sky-500/50":x="bg-[#E5A93C]/25 border-l-4 border-[#E5A93C] ring-1 ring-[#E5A93C]/50":v&&((l==null?void 0:l.outcome)==="TRUE"?x="bg-emerald-950/40 border-l-2 border-emerald-500/70":(l==null?void 0:l.outcome)==="FALSE"?x="bg-red-950/40 border-l-2 border-red-500/70":(l==null?void 0:l.outcome)==="LOOP"?x="bg-sky-950/40 border-l-2 border-sky-500/70":x="bg-[#231B0E]/70 border-l-2 border-[#E5A93C]/70"),S.jsxs("div",{"data-highlighted-anchor":u?"true":void 0,className:`flex items-start px-1.5 py-0.5 rounded transition-colors ${x}`,children:[S.jsxs("div",{className:"w-14 shrink-0 flex items-center justify-end gap-1 pr-2 select-none font-mono text-[10px]",children:[S.jsx("span",{className:u?"text-[#F7D794] font-bold":v?"text-zinc-300 font-semibold":"text-zinc-500",title:`Actual Line ${_} in ${a.fileName}`,children:_}),S.jsxs("span",{className:"text-[9px] text-zinc-600",title:`Line #${m} inside ${a.label}`,children:["#",m]})]}),S.jsxs("div",{className:"flex-1 min-w-0",children:[S.jsx("pre",{className:"whitespace-pre-wrap break-all",children:rC(p||" ")}),u&&l&&S.jsx("div",{className:"mt-0.5 flex items-center gap-1.5 text-[9.5px] font-sans font-semibold",children:S.jsxs("span",{className:`px-1.5 py-0.2 rounded ${l.outcome==="TRUE"?"bg-emerald-500/30 text-emerald-200 border border-emerald-400/50":l.outcome==="FALSE"?"bg-red-500/30 text-red-200 border border-red-400/50":l.outcome==="LOOP"?"bg-sky-500/30 text-sky-200 border border-sky-400/50":"bg-[#E5A93C]/30 text-[#F7D794] border border-[#E5A93C]/50"}`,children:["▲ Active Here (File Line ",_," • Fn Line #",m,")"]})})]})]},g)})})]}),S.jsx(Og,{})]})},wf=({className:t="w-8 h-6"})=>S.jsx("svg",{viewBox:"0 0 64 42",fill:"none",xmlns:"http://www.w3.org/2000/svg",className:t,"aria-label":"LCV Walking Fox Silhouette",children:S.jsx("path",{d:"M4 23 C9 17, 15 17, 21 21 L25 19 C32 18, 39 18, 45 16 L48 8 L51 13 L54 7 L55 14 L62 17 L61 20 L55 21 C53 24, 49 26, 47 28 L53 26 L56 23 L58 25 L54 29 L46 31 L44 39 L41 39 L42 29 C36 29, 30 29, 25 28 L22 39 L19 39 L21 27 L16 36 L13 36 L17 25 C11 26, 6 26, 4 23 Z",fill:"#E5A93C"})}),hd=[{badge:"STEP 1 OF 5 • ARCHIVES & DIRECT CODE",title:"Supports .ZIP, .RAR, .7Z (7-Zip) & Direct Source Code",subtitle:"Analyze entire multi-file projects from compressed archives, local source files, or remote GitHub / Google Drive URLs.",icon:S.jsx(dA,{className:"w-6 h-6 text-[#E5A93C]"}),bullets:[{title:".ZIP, .RAR & .7Z (7-Zip) Archives",desc:'Drag and drop any .zip, .rar, or .7z archive onto the window or click the "ZIP/RAR/7Z" upload button.'},{title:"Direct Source Code Files",desc:"Select individual or multiple source code files directly from your computer without zipping them first."},{title:"GitHub & Google Drive URLs (?load=)",desc:"Paste any GitHub repo or archive link (default: https://github.com/boykopovar/AnyPS5) or pass ?load=<URL> in the browser address bar."}]},{badge:"STEP 2 OF 5 • SUPPORTED LANGUAGES",title:"Language-Independent 3-Tier AST & Call Graph Engine",subtitle:"Translates OOP, procedural, and functional codebases into a unified model: Container → File → Structure Block → Logic Unit.",icon:S.jsx(Gv,{className:"w-6 h-6 text-[#E5A93C]"}),bullets:[{title:"C & C++ (.c, .cpp, .h, .hpp)",desc:"Full support for structs, classes, pointers, and low-level system call hierarchies."},{title:"C# & Java (.cs, .java)",desc:"Visualizes MonoBehaviour scripts, namespaces, packages, and object-oriented method dependencies."},{title:"Python, Rust & JavaScript / TypeScript (.py, .rs, .js, .ts)",desc:"Parses def/fn/function blocks, async routines, and cross-module imports with color-coded IDE syntax highlighting on the right panel."}]},{badge:"STEP 3 OF 5 • 2D & THREE 3D VISUALIZATION MODES",title:"Code City 3D, 3D Force-Graph & Virtual Code 3D",subtitle:"Switch between 2D and 3D anytime, and pick from three specialized 3D engines in the top-left 3D bar.",icon:S.jsx(BA,{className:"w-6 h-6 text-[#E5A93C]"}),bullets:[{title:"Code City 3D (Structure, Size & Complexity)",desc:"Each File is a colored land parcel. Classes & functions rise as skyscrapers where footprint = method count, height = Lines of Code, facade glow = complexity, and sky arcs = calls."},{title:"3D Force-Graph (Solar System & True Coupling)",desc:"Weightless 3D physics network: Files form glowing Suns (same color as their City parcel) while functions orbit as Moons scaled by incoming call importance, with flowing light pulses."},{title:"Virtual Code 3D (Vertical File Spines & 2D Disks)",desc:"Each file sits on a floor document plate with a vertical spine and branching 2D node disks rising upward."}]},{badge:"STEP 4 OF 5 • SEARCH, GRAB GRID & COMMENTS",title:"Autocomplete Search, 3D Grid Grabbing & Comment Boxes",subtitle:"Find any Function or Class in seconds and navigate smoothly in both 2D and 3D.",icon:S.jsx(PA,{className:"w-6 h-6 text-[#E5A93C]"}),bullets:[{title:"Bottom-Left Function & Class Autocomplete Search",desc:"Type in the bottom-left search bar to get live suggestions for all Functions and Classes. Selecting one immediately flies the 2D or 3D camera to focus it."},{title:"3D Grab Grid (Pan Left / Right / Up / Down)",desc:'In 3D mode, "Grab Grid (L/R/U/D)" lets you drag the grid with the left mouse button to pan Left, Right, Up, and Down (and Right-Click drag to rotate).'},{title:"Right-Click Comment Boxes & DEL (Entf) Key",desc:"Right-click in 2D to create resizable comment boxes, and press DEL (Entf) or right-click to delete them."}]},{badge:"STEP 5 OF 5 • ALL URL PARAMETERS REFERENCE",title:"Direct Deep-Linking via URL Parameters",subtitle:"Append any of these parameters to your URL to launch directly into a specific 2D/3D view or repository:",icon:S.jsx(Yv,{className:"w-6 h-6 text-[#E5A93C]"}),bullets:[{title:"?Code-City  |  ?3DForce-Graph  |  ?Virtual-Code-3D",desc:"Immediately opens the 3D visualizer in Code City 3D (?Code-City), 3D Force-Directed Solar Graph (?3DForce-Graph), or Virtual Code 3D (?Virtual-Code-3D)."},{title:"?V=2D  |  ?V=3D",desc:"Launches the application directly in the 2D Electronic Circuit Graph (?V=2D) or 3D mode (?V=3D)."},{title:"?load=<GitHub-or-Drive-URL>",desc:"Automatically fetches and visualizes an external repository or .7z/.zip/.rar archive (e.g. ?Code-City&load=https://github.com/boykopovar/AnyPS5)."}]}],oC=({isOpen:t,onClose:e})=>{const[n,i]=we.useState(0);if(!t)return null;const r=hd[n],s=n===hd.length-1;return S.jsx("div",{className:"fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 select-none",children:S.jsxs("div",{className:"bg-[#0E0E13] border border-[#E5A93C]/70 rounded-lg max-w-xl w-full shadow-[0_0_50px_rgba(0,0,0,0.95)] flex flex-col overflow-hidden",children:[S.jsxs("div",{className:"px-5 py-3.5 bg-[#14141B] border-b border-zinc-800 flex items-center justify-between",children:[S.jsxs("div",{className:"flex items-center gap-2.5",children:[S.jsx(wf,{className:"w-8 h-5"}),S.jsx("span",{className:"font-sans text-xs font-bold uppercase tracking-wider text-[#F7D794]",children:"LCV Interactive Guide"})]}),S.jsxs("button",{type:"button",onClick:e,className:"px-3 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-sans text-xs font-semibold flex items-center gap-1 transition",title:"Close Guide Anytime",children:[S.jsx("span",{children:"Close Guide"}),S.jsx(Zv,{className:"w-3.5 h-3.5"})]})]}),S.jsxs("div",{className:"p-6 space-y-5",children:[S.jsxs("div",{className:"flex items-start justify-between gap-4",children:[S.jsxs("div",{className:"space-y-1",children:[S.jsx("div",{className:"font-sans text-[11px] font-semibold uppercase tracking-wider text-[#E5A93C]",children:r.badge}),S.jsx("h2",{className:"font-sans font-bold text-xl text-zinc-100",children:r.title}),S.jsx("p",{className:"text-xs font-sans text-zinc-400 leading-relaxed",children:r.subtitle})]}),S.jsx("div",{className:"p-3 rounded bg-[#16161F] border border-[#E5A93C]/40 shrink-0",children:r.icon})]}),S.jsx("div",{className:"space-y-2.5",children:r.bullets.map((o,a)=>S.jsxs("div",{className:"p-3 rounded bg-[#13131A] border-l-4 border-[#E5A93C] border-t border-r border-b border-zinc-800/90 space-y-1",children:[S.jsxs("div",{className:"font-sans text-xs font-semibold text-zinc-100 flex items-center gap-1.5",children:[S.jsx(Kb,{className:"w-3.5 h-3.5 text-[#E5A93C] shrink-0"}),S.jsx("span",{children:o.title})]}),S.jsx("p",{className:"text-xs font-sans text-zinc-300 pl-5 leading-relaxed",children:o.desc})]},a))})]}),S.jsxs("div",{className:"px-5 py-3.5 bg-[#14141B] border-t border-zinc-800 flex items-center justify-between",children:[S.jsx("div",{className:"flex items-center gap-1.5",children:hd.map((o,a)=>S.jsx("button",{type:"button",onClick:()=>i(a),className:`h-2 rounded-full transition-all ${a===n?"w-6 bg-[#E5A93C]":"w-2 bg-zinc-700 hover:bg-zinc-500"}`,title:`Go to Step ${a+1}`},a))}),S.jsxs("div",{className:"flex items-center gap-2",children:[n>0&&S.jsxs("button",{type:"button",onClick:()=>i(o=>o-1),className:"px-3 py-1.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-sans text-xs font-semibold flex items-center gap-1 transition",children:[S.jsx(Dh,{className:"w-3.5 h-3.5"}),S.jsx("span",{children:"Back"})]}),s?S.jsx("button",{type:"button",onClick:e,className:"px-4 py-1.5 rounded bg-[#231B0E] hover:bg-[#2F2412] border border-[#E5A93C] text-[#F7D794] font-sans text-xs font-semibold transition",children:"Start Visualizing"}):S.jsxs("button",{type:"button",onClick:()=>i(o=>o+1),className:"px-4 py-1.5 rounded bg-[#231B0E] hover:bg-[#2F2412] border border-[#E5A93C] text-[#F7D794] font-sans text-xs font-semibold flex items-center gap-1 transition",children:[S.jsx("span",{children:"Next"}),S.jsx(Cc,{className:"w-3.5 h-3.5"})]})]})]})]})})};function aC(){const e=`${window.location.search}&${window.location.hash.replace(/^#\/?\??/,"")}`.toLowerCase(),n=new URLSearchParams(window.location.search),i=new URLSearchParams(window.location.hash.replace(/^#\/?\??/,"")),r=(n.get("V")||n.get("v")||i.get("V")||i.get("v")||"").toLowerCase();let s=Hi("lcv_3d_style",Et.CODE_CITY);return s!==Et.CODE_CITY&&s!==Et.FORCE_GRAPH&&s!==Et.VIRTUAL_CODE&&(s=Et.CODE_CITY),e.includes("code-city")||e.includes("code_city")||r==="code-city"?(Gt("lcv_view_dimension",zt.MODE_3D),Gt("lcv_3d_style",Et.CODE_CITY),{mode:zt.MODE_3D,style3D:Et.CODE_CITY}):e.includes("3dforce-graph")||e.includes("force-graph")||e.includes("3dforce_graph")||r==="3dforce-graph"||r==="force-graph"?(Gt("lcv_view_dimension",zt.MODE_3D),Gt("lcv_3d_style",Et.FORCE_GRAPH),{mode:zt.MODE_3D,style3D:Et.FORCE_GRAPH}):e.includes("virtual-code-3d")||e.includes("virtual-code")||e.includes("virtual_code")||r==="virtual-code-3d"?(Gt("lcv_view_dimension",zt.MODE_3D),Gt("lcv_3d_style",Et.VIRTUAL_CODE),{mode:zt.MODE_3D,style3D:Et.VIRTUAL_CODE}):r==="3d"||e.includes("?3d")?(Gt("lcv_view_dimension",zt.MODE_3D),{mode:zt.MODE_3D,style3D:s}):r==="2d"||e.includes("?2d")?(Gt("lcv_view_dimension",zt.MODE_2D),{mode:zt.MODE_2D,style3D:s}):{mode:Hi("lcv_view_dimension",zt.MODE_2D)===zt.MODE_3D?zt.MODE_3D:zt.MODE_2D,style3D:s}}function lC(){const t=we.useRef(aC()),[e,n]=we.useState(Nr),[i,r]=we.useState(null),[s,o]=we.useState(Nr.allNodes[1]||Nr.allNodes[0]),[a,l]=we.useState(null),[c,d]=we.useState(null),[f,h]=we.useState(t.current.mode),[p,g]=we.useState(t.current.style3D),[_,m]=we.useState(()=>Hi("lcv_graph_focus",tn.FUNCTIONS)===tn.CLASSES?tn.CLASSES:tn.FUNCTIONS),[u,v]=we.useState(()=>Hi("lcv_left_collapsed_v2","true")==="true"),[x,y]=we.useState(()=>Hi("lcv_right_collapsed_v2","true")==="true"),[A,w]=we.useState({x:40,y:40}),[T,z]=we.useState(.75),[E,b]=we.useState({}),[V,X]=we.useState({}),[pe,F]=we.useState([]),[W,te]=we.useState(null),[K,U]=we.useState(()=>$p()||Ja),[J,O]=we.useState(!1),[le,ce]=we.useState(null),[Q,de]=we.useState(!1),[ye,be]=we.useState(!1),[Ne,Ze]=we.useState(!1),[Ke,je]=we.useState(()=>Hi("lcv_guide_shown_once","false")==="true"?!1:(Gt("lcv_guide_shown_once","true"),!0)),Je=()=>{je(!1),Gt("lcv_guide_shown_once","true")},ee=we.useRef(null);we.useEffect(()=>{var G,H;const $=new URLSearchParams(window.location.search),fe=new URLSearchParams(window.location.hash.replace(/^#\/?\??/,"")),he=$.get("load")||fe.get("load"),q=IS(),R=$p();if(he){U(he),Me(he,!0);return}if(q&&(Object.keys(q.nodeOffsets||{}).length>0||Object.keys(q.nodeCustomizations||{}).length>0||(q.commentBoxes||[]).length>0||!!q.remoteUrl||((G=q.pan)==null?void 0:G.x)!==40||((H=q.pan)==null?void 0:H.y)!==40)&&q){te(q);const Y=q.remoteUrl||R||Ja;U(Y),Me(Y,!1),q.pan&&w(q.pan),q.zoom&&z(q.zoom)}else{const Y=R||Ja;U(Y),Me(Y,!1)}},[]);const at=($,fe,he,q,R,I)=>{DS({remoteUrl:I!==void 0?I:K,pan:$,zoom:fe,nodeOffsets:he,nodeCustomizations:q,commentBoxes:R,timestamp:Date.now()})},Ie=()=>{W&&(W.pan&&w(W.pan),W.zoom&&z(W.zoom),W.nodeOffsets&&b(W.nodeOffsets),W.nodeCustomizations&&X(W.nodeCustomizations),W.commentBoxes&&F(W.commentBoxes),W.remoteUrl&&W.remoteUrl!==K&&(U(W.remoteUrl),Me(W.remoteUrl,!1)),te(null))},Ge=()=>{US(),b({}),X({}),F([]),w({x:40,y:40}),z(.75),U(Ja),te(null)},Me=async($,fe=!0)=>{const he=($??K).trim();if(he){O(!0),ce(null);try{const q=await LS(he,Nr);n(q),r(null),o(q.allNodes[1]||q.allNodes[0]||null),fe&&(OS(he),at(A,T,E,V,pe,he))}catch(q){n(Nr),o(Nr.allNodes[1]||Nr.allNodes[0]||null),ce((q==null?void 0:q.message)||"Failed to load remote repository (loaded default sample project)")}finally{O(!1)}}},dt=async $=>{de(!0),ce(null);try{const fe=await lf($);fe.files.length>0&&(n(fe),r(null),o(fe.allNodes[1]||fe.allNodes[0]))}finally{de(!1)}},He=()=>{const $={version:"1.0",exportedAt:new Date().toISOString(),repositoryName:e.name,remoteUrl:K||void 0,mode:f,graphFocusMode:_,pan:A,zoom:T,nodeOffsets:E,nodeCustomizations:V,commentBoxes:pe},fe=new Blob([JSON.stringify($,null,2)],{type:"application/json"}),he=URL.createObjectURL(fe),q=document.createElement("a");q.href=he,q.download=`LCV-Layout-${e.name.replace(/\W+/g,"_")}-${Date.now()}.json`,q.click(),URL.revokeObjectURL(he)},L=async $=>{try{const fe=await $.text(),he=JSON.parse(fe),q=he.pan||{x:40,y:40},R=typeof he.zoom=="number"?he.zoom:.75,I=he.nodeOffsets||{},G=he.nodeCustomizations||{},H=Array.isArray(he.commentBoxes)?he.commentBoxes:[];w(q),z(R),b(I),X(G),F(H),(he.mode===zt.MODE_2D||he.mode===zt.MODE_3D)&&h(he.mode),(he.graphFocusMode===tn.CLASSES||he.graphFocusMode===tn.FUNCTIONS)&&m(he.graphFocusMode),he.remoteUrl&&he.remoteUrl!==K&&(U(he.remoteUrl),Me(he.remoteUrl,!1)),at(q,R,I,G,H,he.remoteUrl),te(null)}catch{ce("Invalid LCV JSON layout file.")}},M=async $=>{if($.preventDefault(),$.dataTransfer.files&&$.dataTransfer.files.length>0){const fe=$.dataTransfer.files[0];fe.name.toLowerCase().endsWith(".json")?await L(fe):await dt($.dataTransfer.files)}},ne=()=>{h($=>{const fe=$===zt.MODE_2D?zt.MODE_3D:zt.MODE_2D;return Gt("lcv_view_dimension",fe),fe})},ve=$=>{g($),Gt("lcv_3d_style",$)},ge=()=>{m($=>{const fe=$===tn.FUNCTIONS?tn.CLASSES:tn.FUNCTIONS;return Gt("lcv_graph_focus",fe),fe})},xe=()=>{v($=>{const fe=!$;return Gt("lcv_left_collapsed_v2",String(fe)),fe})},ke=()=>{y($=>{const fe=!$;return Gt("lcv_right_collapsed_v2",String(fe)),fe})},Te=($,fe)=>{w($),z(fe),at($,fe,E,V,pe)},D=$=>{b($),at(A,T,$,V,pe)},re=$=>{X($),at(A,T,E,$,pe)},ae=$=>{F($),at(A,T,E,V,$)},Z=$=>{i&&i!==$.fileId&&r(null),_===tn.CLASSES&&$.kind!=="CLASS"&&(m(tn.FUNCTIONS),Gt("lcv_graph_focus",tn.FUNCTIONS)),o($),l($),d(null)},Ee=a||s;return S.jsxs("div",{onDragOver:$=>$.preventDefault(),onDrop:M,className:"h-screen w-screen overflow-hidden flex flex-col bg-[#070709] text-zinc-100",children:[S.jsxs("header",{className:"h-12 shrink-0 bg-[#0A0A0E] border-b border-zinc-800/90 px-3 flex items-center justify-between gap-2",children:[S.jsxs("div",{className:"flex items-center gap-2.5 shrink-0",children:[S.jsx(wf,{className:"w-9 h-6 shrink-0"}),S.jsx("span",{className:"font-sans font-bold text-sm tracking-wider uppercase text-zinc-100",children:"LCV"}),S.jsx("span",{className:"hidden xl:inline-block text-xs font-sans text-zinc-400 border-l border-zinc-800 pl-2.5 truncate max-w-[260px]",children:e.name})]}),S.jsxs("div",{className:"flex items-center gap-1.5 shrink-0",children:[S.jsx("button",{type:"button",onClick:ne,className:"px-3 py-1.5 rounded bg-[#231B0E] hover:bg-[#2F2412] border border-[#E5A93C]/70 text-[#F7D794] font-sans text-xs font-semibold flex items-center gap-1.5 transition shadow-xs",title:"Switch between 2D Electronic Graph (?V=2D) and 3D Views (?Code-City, ?3DForce-Graph, ?Virtual-Code-3D)",children:f===zt.MODE_2D?S.jsxs(S.Fragment,{children:[S.jsx(Bb,{className:"w-3.5 h-3.5 text-[#E5A93C]"}),S.jsxs("span",{children:["Switch 2D / 3D (",f,")"]})]}):S.jsxs(S.Fragment,{children:[S.jsx($v,{className:"w-3.5 h-3.5 text-[#E5A93C]"}),S.jsxs("span",{children:["Switch 2D / 3D (",f,")"]})]})}),S.jsxs("button",{type:"button",onClick:ge,className:"px-3 py-1.5 rounded bg-zinc-900 hover:bg-zinc-800/90 border border-zinc-700 hover:border-[#E5A93C]/60 text-zinc-200 font-sans text-xs font-medium flex items-center gap-1.5 transition",title:"Switch between Classes Architecture Viewer and Functions Call Viewer (Saved in Cookie)",children:[S.jsx(xA,{className:"w-3.5 h-3.5 text-[#E5A93C]"}),S.jsxs("span",{children:["Viewer: ",_]})]}),S.jsxs("button",{type:"button",onClick:()=>je(!0),className:"px-2.5 py-1.5 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 font-sans text-xs font-medium flex items-center gap-1.5 transition",title:"Open Interactive Step-by-Step Guide & URL Parameter Reference",children:[S.jsx(Qb,{className:"w-3.5 h-3.5 text-[#E5A93C]"}),S.jsx("span",{children:"Guide"})]})]}),S.jsxs("form",{onSubmit:$=>{$.preventDefault(),Me(K,!0)},className:"hidden md:flex items-center gap-1.5 flex-1 max-w-md",children:[S.jsxs("div",{className:"flex items-center flex-1 rounded bg-[#101015] border border-zinc-700/90 focus-within:border-[#E5A93C] px-2.5 py-1",children:[S.jsx(Yv,{className:"w-3.5 h-3.5 text-[#E5A93C] shrink-0 mr-1.5"}),S.jsx("input",{type:"text",value:K,onChange:$=>U($.target.value),placeholder:"GitHub / Google Drive (e.g. https://github.com/boykopovar/AnyPS5)",className:"w-full bg-transparent text-xs font-sans text-zinc-100 placeholder-zinc-500 focus:outline-none"})]}),S.jsx("button",{type:"submit",disabled:J,className:"px-3 py-1 rounded bg-[#231B0E] hover:bg-[#2F2412] border border-[#E5A93C]/60 text-[#F7D794] font-sans text-xs font-semibold transition shrink-0",children:J?"Loading...":"Analyze URL"})]}),S.jsxs("div",{className:"flex items-center gap-1.5 shrink-0",children:[S.jsxs("button",{type:"button",onClick:()=>Ze(!0),className:"px-2.5 py-1 rounded bg-[#231B0E] hover:bg-[#2F2412] text-[#F7D794] border border-[#E5A93C]/60 font-sans text-xs font-semibold flex items-center gap-1.5 transition",title:"Support Wild Foxes — Fuchshilfe Berlin",children:[S.jsx(Xv,{className:"w-3.5 h-3.5 text-[#E5A93C] fill-[#E5A93C]"}),S.jsx("span",{className:"hidden lg:inline",children:"Support Foxes"})]}),S.jsxs("button",{type:"button",onClick:He,className:"px-2.5 py-1 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 font-sans text-xs font-medium flex items-center gap-1 transition",title:"Export Layout JSON",children:[S.jsx(Wv,{className:"w-3.5 h-3.5 text-[#E5A93C]"}),S.jsx("span",{className:"hidden xl:inline",children:"JSON"})]}),S.jsx("input",{ref:ee,type:"file",accept:".json,application/json",className:"hidden",onChange:$=>{var he;const fe=(he=$.target.files)==null?void 0:he[0];fe&&(L(fe),$.target.value="")}}),S.jsxs("button",{type:"button",onClick:()=>{var $;return($=ee.current)==null?void 0:$.click()},className:"px-2.5 py-1 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 font-sans text-xs font-medium flex items-center gap-1 transition",title:"Import Layout JSON",children:[S.jsx(Rc,{className:"w-3.5 h-3.5 text-[#E5A93C]"}),S.jsx("span",{className:"hidden xl:inline",children:"Load JSON"})]}),S.jsxs("label",{className:"cursor-pointer flex items-center gap-1 px-2.5 py-1 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 font-sans text-xs font-medium transition",children:[S.jsx(Rc,{className:"w-3.5 h-3.5 text-[#E5A93C]"}),S.jsx("span",{className:"hidden sm:inline",children:"ZIP/RAR/7Z"}),S.jsx("input",{type:"file",multiple:!0,accept:".zip,.rar,.7z,.c,.cpp,.h,.hpp,.java,.py,.rs,.cs,.js,.ts",className:"hidden",onChange:$=>$.target.files&&dt($.target.files)})]}),S.jsx("button",{type:"button",onClick:()=>be(!0),className:"p-1.5 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-400 hover:text-[#F7D794]",title:"robots.txt & sitemap.xml",children:S.jsx(_A,{className:"w-3.5 h-3.5"})})]})]}),W&&S.jsxs("div",{className:"bg-[#121217] border-b border-[#E5A93C]/60 px-4 py-2 flex items-center justify-between z-40 font-sans text-xs",children:[S.jsxs("div",{className:"flex items-center gap-2 text-zinc-100",children:[S.jsx(wA,{className:"w-4 h-4 text-[#E5A93C]"}),S.jsx("span",{className:"font-semibold text-[#F7D794]",children:"Recover last Session?"}),S.jsx("span",{className:"text-zinc-400 hidden sm:inline",children:"(Saved node names, positions, sizes, comments & camera found in cookies)"})]}),S.jsxs("div",{className:"flex items-center gap-2",children:[S.jsx("button",{type:"button",onClick:Ie,className:"px-3 py-1 rounded bg-[#231B0E] hover:bg-[#2F2412] border border-[#E5A93C] text-[#F7D794] font-semibold transition",children:"Yes"}),S.jsx("button",{type:"button",onClick:Ge,className:"px-3 py-1 rounded bg-zinc-800 hover:bg-red-900/70 border border-zinc-700 text-zinc-200 font-semibold transition",children:"No"})]})]}),le&&S.jsxs("div",{className:"bg-red-950/90 border-b border-red-700 px-4 py-1.5 text-xs font-sans text-red-200 flex items-center justify-between",children:[S.jsx("span",{children:le}),S.jsx("button",{onClick:()=>ce(null),className:"underline ml-4",children:"Dismiss"})]}),S.jsxs("main",{className:"flex-1 flex overflow-hidden",children:[S.jsx(nC,{files:e.files,filterFileId:i,collapsed:u,onToggleCollapse:xe,onSelectFilterFile:r,onUploadArchive:dt,isUploading:Q}),S.jsx("div",{className:"flex-1 h-full relative overflow-hidden",children:f===zt.MODE_2D?S.jsx(tC,{repository:e,graphFocusMode:_,selectedNode:s,hoveredNode:a,filterFileId:i,pan:A,zoom:T,nodeOffsets:E,nodeCustomizations:V,commentBoxes:pe,onChangePanZoom:Te,onChangeNodeOffsets:D,onChangeNodeCustomizations:re,onChangeCommentBoxes:ae,onExportJsonLayout:He,onImportJsonLayout:L,onSelectNode:$=>{o($),d(null)},onHoverNode:$=>{l($),$&&d(null)},onHoverEdge:d,onSearchFocusNode:Z}):S.jsx(KA,{repository:e,graphFocusMode:_,render3DStyle:p,onChangeRender3DStyle:ve,selectedNode:s,hoveredNode:a,filterFileId:i,onSelectNode:$=>{o($),d(null)},onHoverNode:$=>{l($),$&&d(null)},onHoverEdge:d,onSearchFocusNode:Z})}),S.jsx(sC,{activeNode:Ee,hoveredEdge:c,repository:e,collapsed:x,onToggleCollapse:ke,onSelectNode:$=>{o($),d(null)}})]}),S.jsx(oC,{isOpen:Ke,onClose:Je}),Ne&&S.jsx("div",{className:"fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4",children:S.jsxs("div",{className:"bg-[#0E0E13] border border-[#E5A93C]/70 rounded-lg max-w-lg w-full p-6 space-y-4 shadow-2xl",children:[S.jsxs("div",{className:"flex items-center justify-between border-b border-zinc-800 pb-3",children:[S.jsxs("div",{className:"flex items-center gap-2.5",children:[S.jsx(wf,{className:"w-9 h-6"}),S.jsx("h3",{className:"font-sans font-bold text-base text-[#F7D794]",children:"Support Wild Foxes — Fuchshilfe Berlin"})]}),S.jsx("button",{type:"button",onClick:()=>Ze(!1),className:"px-3 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-sans text-xs font-semibold",children:"Close"})]}),S.jsxs("div",{className:"flex flex-col sm:flex-row items-center gap-5",children:[S.jsx("a",{href:"https://fuchshilfe-berlin.de/IHR-WOLLT-UNS-UNTERSTUeTZEN",target:"_blank",rel:"noopener noreferrer",className:"bg-white p-2 rounded border border-[#E5A93C] shrink-0",children:S.jsx("img",{src:"https://fuchshilfe-berlin.de/.cm4all/uproc.php/0/.qrcode_www.amazon.de.png/picture-1600?_=1993dea75cf",alt:"Fuchshilfe Berlin Amazon QR Code",className:"w-36 h-36 object-contain"})}),S.jsxs("div",{className:"space-y-3 text-xs font-sans text-zinc-200 leading-relaxed",children:[S.jsxs("p",{children:["This tool is free. Instead of donating to the developer, please consider supporting"," ",S.jsx("strong",{className:"text-[#F7D794]",children:"Fuchshilfe Berlin"}),"!"]}),S.jsx("p",{className:"text-zinc-300",children:"Your support helps ensure that wild foxes can live a safe, good life and that sick or injured foxes receive medical care to recover and get healthy again."}),S.jsxs("a",{href:"https://fuchshilfe-berlin.de/IHR-WOLLT-UNS-UNTERSTUeTZEN",target:"_blank",rel:"noopener noreferrer",className:"inline-flex items-center gap-2 px-3.5 py-2 rounded bg-[#231B0E] hover:bg-[#2F2412] border border-[#E5A93C] text-[#F7D794] font-sans text-xs font-semibold transition",children:[S.jsx("span",{children:"Donate Goods on Amazon Wishlist"}),S.jsx(jv,{className:"w-3.5 h-3.5"})]})]})]})]})}),ye&&S.jsx("div",{className:"fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4",children:S.jsxs("div",{className:"bg-[#0E0E13] border border-[#E5A93C]/70 rounded-lg max-w-xl w-full p-5 space-y-4",children:[S.jsxs("div",{className:"flex items-center justify-between border-b border-zinc-800 pb-2.5",children:[S.jsxs("div",{className:"flex items-center gap-2",children:[S.jsx(mA,{className:"w-4 h-4 text-[#E5A93C]"}),S.jsx("h3",{className:"font-sans font-bold text-xs uppercase tracking-wider text-zinc-100",children:"robots.txt & sitemap.xml (All AI Models Permitted)"})]}),S.jsx("button",{type:"button",onClick:()=>be(!1),className:"px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-sans text-xs font-semibold",children:"Close"})]}),S.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-[11px]",children:[S.jsxs("div",{children:[S.jsx("div",{className:"text-[#F7D794] font-semibold mb-1",children:"/public/robots.txt"}),S.jsx("pre",{className:"p-2.5 rounded bg-[#070709] border border-zinc-800 text-zinc-300 overflow-x-auto",children:`User-agent: *
Allow: /

User-agent: GPTBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: ClaudeBot
Allow: /

Sitemap: https://lyrasw0rld.github.io/Lyras-Code-Visualizer/sitemap.xml`})]}),S.jsxs("div",{children:[S.jsx("div",{className:"text-[#F7D794] font-semibold mb-1",children:"/public/sitemap.xml"}),S.jsx("pre",{className:"p-2.5 rounded bg-[#070709] border border-zinc-800 text-zinc-300 overflow-x-auto",children:`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://lyrasw0rld.github.io/Lyras-Code-Visualizer/</loc>
    <priority>1.0</priority>
  </url>
</urlset>`})]})]})]})})]})}const e_=document.getElementById("root");if(!e_)throw new Error("Could not find root element to mount to");const cC=pd.createRoot(e_);cC.render(S.jsx(x_.StrictMode,{children:S.jsx(lC,{})}));
