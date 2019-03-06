import {IEvent} from "../../interfaces/IEvent";
import {INewsContent} from "../../interfaces/INewsContent";
import {IEventData} from '../../interfaces/IEventData';
import {EventAbstract} from "./EventAbstract";
import {ElementBuilder} from '../../helpers/ElementBuilder'; 
import { IFormField } from '../../interfaces/IFormField';

export class EventNews extends EventAbstract implements IEvent{

    public content:INewsContent
    
    constructor(event: IEventData){
        super(event)
    }
    
    createElement(): HTMLElement{
        const element = super.createElement();
        const head = element.querySelector('.timeline-event-item-head');
        const title:HTMLElement = new ElementBuilder('p', {'html': '<i class="fa fa-bullhorn" aria-hidden="true"></i> Новость'}).build();
        head.append(title);
        
        const body = element.querySelector('.timeline-event-item-body');
        const header :HTMLElement = new ElementBuilder('span', {'text': this.content.head}).build();
        body.append(header);
        
        const footer = element.querySelector('.timeline-event-item-footer');
        const mark:HTMLElement = new ElementBuilder('i', {'class': (this.content.isRead === true) ? 'fa fa-envelope-open-o' : 'fa fa-envelope-o', 'aria-hidden' : "true"}).build();
        footer.classList.add(this.content.isRead ? 'readed' : 'unread'); 
        footer.append(mark);
        
        return element;
    }

    public getFormFields():IFormField[]{
        return [
            {
                label: 'Заголовок',
                tag: 'input',
                type: 'text',
                id: 'head',
            },
            {
                label: 'Содержание',
                tag: 'textarea',
                id: 'message',
            },
            {
                label: 'Дата',
                tag: 'input',
                type: 'date',
                id: 'date',
            },
        ]
    };

    prependInfoForShow():{title: string, content: string[], footer: HTMLElement}{
        const btnElement = new ElementBuilder('button', {type: 'button', class: 'btn btn-primary', text: this.content.isRead ? 'Не ознакомлен' : 'Ознакомлен'}).build();
        btnElement.addEventListener('click', this.readed.bind(this));
        return {
            title: 'Новость, ' + this.date.toLocaleDateString(),
            content: [
                `Заголовок: ${this.content.head}`,
                `Содержание: ${this.content.message}`,
                `Ознакомлен: ${(this.content.isRead === true) ? 'Да' : 'Нет'}`,,
            ],
            footer: btnElement,
        }
    }

    create(data:FormData):IEventData{
        let type = data.get('event') as string;
        let date =  data.get('date') as string;
        let head = data.get('head') as string;
        let message = data.get('message') as string;

        return {
            id: 0,
            type: type,
            content: {
                head: head,
                message: message,
                isRead: false,
            },
            date: new Date(date),
        }
    }

    readed():void{
        const event = new CustomEvent('check-readed', {detail: {id:this.id}});
        document.dispatchEvent(event);;
    }

}