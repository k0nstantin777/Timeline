import {events} from './EventFakeData';
import { IEventData } from "../../interfaces/IEventData";
export class EventList {
    
    private events: IEventData[];
    constructor(){
        this.events = events;
        this.sortByDateDESC();
        this.init();
    }
    
    public get(): IEventData[]{
        return this.events;
    }

    public delete(id:number){
        const index = this.events.findIndex((event:IEventData) => event.id === id);
        this.events.splice(index, 1);
    }

    public create(event:IEventData){
        event.id = this.events[this.events.length-1].id + 1;
        this.events.push(event);
    }

    public checkReaded(id:number){
        const event = this.events.find((event:IEventData) => event.id === id);
        event.content.isRead = !event.content.isRead;
    }

    private init(){
        document.addEventListener('remove-element', this.removeElementHandler.bind(this));
        document.addEventListener('check-readed', this.checkReadedHandler.bind(this));
        document.addEventListener('store-event', this.storeEventHandler.bind(this));
    }

    private storeEventHandler(event:CustomEvent){
        this.create(event.detail);
        this.sortByDateDESC();
        document.dispatchEvent(new Event('close-modal'));
        document.dispatchEvent(new Event('update-events'));
    }

    public sortByDateDESC():void{
        this.events.sort(function(a:IEventData, b:IEventData) {
            return a.date>b.date ? -1 : a.date<b.date ? 1 : 0;
        });
    }

    public sortByDateASC():void{
        this.events.sort(function(a:IEventData, b:IEventData) {
            return a.date<b.date ? -1 : a.date>b.date ? 1 : 0;
        });
    }

    public sortByTypeDESC():void{
        this.events.sort(function(a:IEventData, b:IEventData) {
            return a.type.toUpperCase()>b.type.toUpperCase() ? -1 : a.type.toUpperCase()<b.type.toUpperCase() ? 1 : 0;
        });
    }

    public sortByTypeASC():void{
        this.events.sort(function(a:IEventData, b:IEventData) {
            return a.type.toUpperCase()<b.type.toUpperCase() ? -1 : a.type.toUpperCase()>b.type.toUpperCase() ? 1 : 0;
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