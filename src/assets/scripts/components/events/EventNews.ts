import {IEvent} from "../../interfaces/IEvent";
import {INewsContent} from "../../interfaces/INewsContent";
import {IEventData} from '../../interfaces/IEventData';
import {EventAbstract} from "./EventAbstract";
import {ElementBuilder} from '../../helpers/ElementBuilder'; 
import {Modal} from '../Modal'; 

export class EventNews extends EventAbstract implements IEvent{

    public content:INewsContent
    
    constructor(event: IEventData){
        super(event)
    }
    
    create(): HTMLElement{
        const element = super.create();
        const head = element.querySelector('.timeline-event-item-head');
        const title:HTMLElement = new ElementBuilder('p', {'html': '<i class="fa fa-bullhorn" aria-hidden="true"></i> Новость'}).build();
        head.append(title);
        const body = element.querySelector('.timeline-event-item-body');
        const header :HTMLElement = new ElementBuilder('span', {'text': this.content.head}).build();
        body.append(header);
        return element;
    }

    prependInfoForShow():{title: string, content: string[], footer: HTMLElement}{
        const modal:Modal = new Modal;
        const btnElement = new ElementBuilder('button', {type: 'button', class: 'btn btn-primary', text: this.content.isRead ? 'Не прочитано' : 'Прочитано'}).build();
        btnElement.addEventListener('click', this.remove.bind(this));
        return {
            title: 'Новость, ' + this.date,
            content: [
                `Заголовок: ${this.content.head}`,
                `Содержание: ${this.content.message}`,
                `Прочитана: ${(this.content.isRead === 1) ? 'Да' : 'Нет'}`,,
            ],
            footer: btnElement,
        }
    }

    clickEventHandler(){
        const modal:Modal = new Modal;
        const data = this.prependInfoForShow();
        modal.showInfo(data);
    }

    remove():void{
        console.log('remove' + this.id);
    }

}