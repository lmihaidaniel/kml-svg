import {addClass} from './dom';
import loadSprite from './ajax';
const svgns = "http://www.w3.org/2000/svg";
const xlinkns = "http://www.w3.org/1999/xlink";

export default class svg{
	constructor(cb){
		this.check(cb);
	}
	create(namespace,parent){
		// Create a <svg> wrapper element
		var ws = document.createElementNS(svgns, "svg");
		// Create a <use> element
		let use = document.createElementNS(svgns, "use");
		// Add an 'href' attribute (using the "xlink" namespace)
		use.setAttributeNS(xlinkns, "href", "#"+namespace);
		ws.appendChild(use);
		if(parent){
			if(parent.nodeName){
				addClass(parent,'kml-icon '+namespace);
				parent.appendChild(ws);
			}
		}
		return ws;
	}
	check(cb){
		//check if "#kml-icons" exists. If not use ajax to inject it into the body
		loadSprite('kml-icons.svg', 'svg-icons',cb);
	}
}
