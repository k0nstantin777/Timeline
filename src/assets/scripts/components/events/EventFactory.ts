import {IEvent} from '../../interfaces/IEvent';
import {IEventData} from '../../interfaces/IEventData';
import { EventTransaction } from "./EventTransaction";
import { EventNews } from "./EventNews";

export class EventFactory{

    constructor(private type: string){}

    getEventObject(event: IEventData):IEvent{
        switch (this.type){
            case 'transaction' : return new EventTransaction(event);
            case 'news' : return new EventNews(event);
        }
    }
}