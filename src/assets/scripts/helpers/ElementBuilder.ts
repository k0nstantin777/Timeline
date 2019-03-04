import {AnyObj} from '../interfaces/AnyObj';

export class ElementBuilder {
    constructor(private tagname:string, private attrs: AnyObj){
        
    }

    build():HTMLElement{
        const element:HTMLElement = document.createElement(this.tagname);
        if(Object.keys(this.attrs).length > 0){
            for(let name in this.attrs){
                if (name === 'text'){
                    element.innerText =  this.attrs[name];
                    continue;
                }
                if (name === 'html'){
                    element.innerHTML =  this.attrs[name];
                    continue;
                }
                // if (name === 'value'){
                //     element.value =  this.attrs[name];
                //     continue;
                // }
                element.setAttribute(name, this.attrs[name]);
            }
        }
        return element;
    }
}