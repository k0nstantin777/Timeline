import { IEvent } from "../../interfaces/IEvent";
import { INewsContent } from "../../interfaces/INewsContent";
import { EventAbstract } from "./EventAbstract";
import {ElementBuilder} from '../../helpers/ElementBuilder'; 

export class EventNews extends EventAbstract implements IEvent{

    create(event: {type:string, content:INewsContent, date:string}): HTMLElement{
        const element = super.create(event);
        const head = element.querySelector('.timeline-event-item-head');
        const title:HTMLElement = new ElementBuilder('p', {'html': '<i class="fa fa-bullhorn" aria-hidden="true"></i> Новость'}).build();
        head.append(title);
        const body = element.querySelector('.timeline-event-item-body');
        const header :HTMLElement = new ElementBuilder('span', {'text': event.content.head}).build();
        body.append(header);
        return element;
    }

}