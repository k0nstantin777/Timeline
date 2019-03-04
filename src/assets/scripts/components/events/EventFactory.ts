import {IEvent} from '../../interfaces/IEvent';
import { EventTransaction } from "./EventTransaction";
import { EventNews } from "./EventNews";
export class EventFactory{

    constructor(private type: string){
    }

    getEventObject():IEvent{
        switch (this.type){
            case 'transaction' : return new EventTransaction();
            case 'news' : return new EventNews();
        }
    }
}