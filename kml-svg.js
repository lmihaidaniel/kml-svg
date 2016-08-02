/*! kml-svg - v0.4.1 */
var kmlSvg = (function () {
  'use strict';

  /**
   * @module dom
   * Module for easing the manipulation of dom elements
   */var classReg=function classReg(c){return new RegExp("(^|\\s+)"+c+"(\\s+|$)");};var _hasClass;
  var _addClass;
  var _removeClass;
  if('classList'in document.documentElement){_hasClass=function _hasClass(elem,c){return elem.classList.contains(c);};_addClass=function _addClass(elem,c){if(c!=null){c=c.split(' ');for(var k in c){if(c[k]!='')elem.classList.add(c[k]);}}};_removeClass=function _removeClass(elem,c){if(c!=null){c=c.split(' ');for(var k in c){if(c[k]!='')elem.classList.remove(c[k]);}}};}else{_hasClass=function _hasClass(elem,c){return classReg(c).test(elem.className);};_addClass=function _addClass(elem,c){if(!hasClass(elem,c)){elem.className=elem.className+' '+c;}};_removeClass=function _removeClass(elem,c){elem.className=elem.className.replace(classReg(c),' ');};}var hasClass=_hasClass;var addClass=_addClass;

  var loadSprite = (function(){// Load a sprite
  function loadSprite(url,id,cb){var x=new XMLHttpRequest();// If the id is set and sprite exists, bail
  if(typeof id==='string'&&document.querySelector('#'+id)!==null){if(typeof cb==='function')cb(document.querySelector('#'+id));return;}x.open('GET',url,true);// Inject hidden div with sprite on load
  x.onload=function(){var c=document.createElement('div');c.setAttribute('hidden','');if(typeof id==='string'){c.setAttribute('id',id);}c.innerHTML=x.responseText;document.body.insertBefore(c,document.body.childNodes[0]);if(typeof cb==='function')cb(c);};x.onerror=function(){alert('error');};x.send();}return loadSprite;})();

  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var svgns="http://www.w3.org/2000/svg";var xlinkns="http://www.w3.org/1999/xlink";var svg=function(){function svg(cb){classCallCheck(this,svg);this.check(cb);}svg.prototype.create=function create(namespace,parent){// Create a <svg> wrapper element
  var ws=document.createElementNS(svgns,"svg");// Create a <use> element
  var use=document.createElementNS(svgns,"use");// Add an 'href' attribute (using the "xlink" namespace)
  use.setAttributeNS(xlinkns,"href","#"+namespace);ws.appendChild(use);if(parent){if(parent.nodeName){addClass(parent,'kml-icon '+namespace);parent.appendChild(ws);}}return ws;};svg.prototype.check=function check(cb){//check if "#kml-icons" exists. If not use ajax to inject it into the body
  loadSprite('kml-icons.svg','svg-icons',cb);};return svg;}();

  return svg;

}());
//# sourceMappingURL=kml-svg.js.map
