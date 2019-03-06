import {ElementBuilder} from '../helpers/ElementBuilder'; 

export class Modal {
    private element:HTMLElement;
    private windowElement:HTMLElement;
    private bodyWindowElement:HTMLElement;
    private headWindowElement:HTMLElement;
    private footerWindowElement:HTMLElement;
    private closeBtnElement:HTMLElement; 

    constructor(){
        this.init();
    }

    public showInfo(data: {title: string, content: string[], footer: HTMLElement}) {
        this.insertTitle(data.title);
        const modalInfoElement:HTMLElement = document.createElement('div');
        modalInfoElement.classList.add('modal-info');
        data.content.forEach(string => {
            modalInfoElement.append(new ElementBuilder('p', {text: string}).build());
        });
        this.bodyWindowElement.append(modalInfoElement);
        this.footerWindowElement.append(data.footer);

        this.show();
    }

    public show(){
        this.element.style.display = 'block';
    }

    public close(){
        while (this.bodyWindowElement.firstChild) {
            this.bodyWindowElement.removeChild(this.bodyWindowElement.firstChild);
        }
        while (this.footerWindowElement.firstChild) {
            this.footerWindowElement.removeChild(this.footerWindowElement.firstChild);
        }
        this.element.style.display = 'none';
    }

    private init():void{
        this.element = document.querySelector('.modal');
        this.windowElement = document.querySelector('.modal-window');
        this.closeBtnElement = document.querySelector('.modal-window .close');
        this.bodyWindowElement = this.windowElement.querySelector('.modal-body');
        this.headWindowElement = this.windowElement.querySelector('.modal-head');
        this.footerWindowElement = this.windowElement.querySelector('.modal-footer');

        this.closeBtnElement.addEventListener('click', this.close.bind(this));
    }

    private insertTitle(title: string){
        const titleElement:HTMLElement = document.querySelector('.modal-title');
        titleElement.innerText = title;
    }

    
}