import {IEventData} from '../interfaces/IEventData';
import { EventFactory } from "./events/EventFactory";
export class TimelineItem {

    private eventFactory: EventFactory;
    constructor(private event: IEventData){
        this.eventFactory = new EventFactory(event.type);
    }

    build():HTMLElement{
        const eventObject = this.eventFactory.getEventObject();
        return eventObject.create(this.event);
    }
}