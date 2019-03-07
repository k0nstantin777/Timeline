import {events} from './EventFakeData';
import { IEventData } from "../../interfaces/IEventData";
enum SortFields {date = 'date', type='type'}
enum SortDirections {asc = 'asc', desc='desc'}

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

    public sortByDateDESC():void{
        this.sortElements(SortFields.date, SortDirections.desc);
    }

    public sortByDateASC():void{
        this.sortElements(SortFields.date, SortDirections.asc);
    }

    public sortByTypeDESC():void{
        this.sortElements(SortFields.type, SortDirections.desc);
    }

    public sortByTypeASC():void{
        this.sortElements(SortFields.type, SortDirections.asc);
    }

    private sortElements(field:SortFields, direction:SortDirections){
        this.events.sort(function(a:IEventData, b:IEventData) {
            switch (direction){
                case SortDirections.asc:  return a[field] < b[field] ? -1 : a[field] > b[field] ? 1 : 0;
                case SortDirections.desc:  return a[field] > b[field] ? -1 : a[field] < b[field] ? 1 : 0;
                default:  return a[field] > b[field] ? -1 : a[field] < b[field] ? 1 : 0;
            }
        });
    }

    private init(){
        document.addEventListener('remove-element', this.removeElementHandler.bind(this));
        document.addEventListener('check-readed', this.checkReadedHandler.bind(this));
        document.addEventListener('store-event', this.storeEventHandler.bind(this));
    }

    private storeEventHandler(event:CustomEvent):void{
        this.create(event.detail);
        this.sortByDateDESC();
        this.emitUpdateEvent();
    }

    private removeElementHandler(event:CustomEvent):void{
        this.delete(event.detail.id);
        this.emitUpdateEvent();
    }

    private checkReadedHandler(event:CustomEvent):void{
        this.checkReaded(event.detail.id);
        this.emitUpdateEvent();
    }

    private emitUpdateEvent():void{
        document.dispatchEvent(new Event('close-modal'));
        document.dispatchEvent(new Event('update-events'));
    }

}