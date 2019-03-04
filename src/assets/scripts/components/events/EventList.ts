import events from './EventFakeData';
import { IEventData } from "../../interfaces/IEventData";
export class EventList {
    public getEvents(): IEventData[]{
        return events;
    }
}