import {IEvent} from "../../interfaces/IEvent";
import {INewsContent} from "../../interfaces/INewsContent";
import {IEventData} from '../../interfaces/IEventData';
import {EventAbstract} from "./EventAbstract";
import {ElementBuilder} from '../../helpers/ElementBuilder'; 

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

}