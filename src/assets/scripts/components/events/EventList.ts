import {events} from './EventFakeData';
import { IEventData } from "../../interfaces/IEventData";
export class EventList {
    
    private events: IEventData[];
    constructor(){
        this.events = events;
        this.sortByDate();
        this.init();
    }
    
    public get(): IEventData[]{
        return this.events;
    }

    public delete(id:number){
        const index = this.events.findIndex((event:IEventData) => event.id === id);
        this.events.splice(index, 1);
    }

    public checkReaded(id:number){
        const event = this.events.find((event:IEventData) => event.id === id);
        event.content.isRead = !event.content.isRead;
    }

    private init(){
        document.addEventListener('remove-element', this.removeElementHandler.bind(this));
        document.addEventListener('check-readed', this.checkReadedHandler.bind(this));
    }

    private sortByDate():void{
        this.events.sort(function(a:IEventData, b:IEventData) {
            return a.date>b.date ? -1 : a.date<b.date ? 1 : 0;
        });
    }

    private removeElementHandler(event:CustomEvent):void{
        this.delete(event.detail.id);
        document.dispatchEvent(new Event('close-modal'));
        document.dispatchEvent(new Event('update-events'));
    }

    private checkReadedHandler(event:CustomEvent):void{
        this.checkReaded(event.detail.id);
        document.dispatchEvent(new Event('close-modal'));
        document.dispatchEvent(new Event('update-events'));
    }

}