import { IEventData } from '../interfaces/IEventData';
import { EventFactory } from "./events/EventFactory";
import { IFormField } from '../interfaces/IFormField';

export class TimelineItem {

    private eventFactory: EventFactory;
    
    constructor(private event: IEventData){
        this.eventFactory = new EventFactory(event.type);
    }

    build():HTMLElement{
        const eventObject = this.eventFactory.getEventObject(this.event);
        return eventObject.create();
    }

    getCreateFormFields():IFormField[]{
        const eventObject = this.eventFactory.getEventObject(this.event);
        return eventObject.getFormFields();
    }
}