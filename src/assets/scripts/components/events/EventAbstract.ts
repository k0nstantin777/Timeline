import {IEvent} from '../../interfaces/IEvent';
import {IEventData} from '../../interfaces/IEventData';
import {AnyObj} from '../../interfaces/AnyObj'; 
import {ElementBuilder} from '../../helpers/ElementBuilder'; 
import { IFormField } from '../../interfaces/IFormField';

export abstract class EventAbstract implements IEvent {
    public id:number;
    public type:string;
    public content:AnyObj;
    public date:Date;
    
    constructor(event:IEventData){
        this.id = event.id;
        this.type = event.type;
        this.content = event.content;
        this.date = event.date;
    }    
    
    public createElement():HTMLElement{
        const eventElement:HTMLElement = document.createElement('div');
        eventElement.classList.add('timeline-event', 'timeline-event-item', this.type);
        
        const head:HTMLElement = new ElementBuilder('div', {'class': 'timeline-event-item-head flex align-center justify-space-between'}).build();
        eventElement.append(head);
        
        const body:HTMLElement = new ElementBuilder('div', {'class': 'timeline-event-item-body flex flex-wrap align-center'}).build();
        eventElement.append(body);
        
        const footer:HTMLElement = new ElementBuilder('div', {'class': 'timeline-event-item-footer'}).build();
        eventElement.append(footer);
        
        const dataContent:HTMLElement = new ElementBuilder('div', {'class': 'date-content'}).build();
        const dateWrapper:HTMLElement = new ElementBuilder('div', {'class': 'date-content-wrapper'}).build();
        const point:HTMLElement = new ElementBuilder('span', {'class': 'point'}).build();
        const line:HTMLElement = new ElementBuilder('span', {'class': 'line'}).build();
        const date:HTMLElement = new ElementBuilder('p', {'class': 'date', 'text': this.date.toLocaleDateString()}).build();
        dateWrapper.append(point);
        dateWrapper.append(line);
        dateWrapper.append(date);
        dataContent.append(dateWrapper);
        eventElement.append(dataContent);

        eventElement.addEventListener('click', this.show.bind(this));
        return eventElement;
    }

    abstract create(data:FormData):IEventData;

    abstract getFormFields():IFormField[];

    private show():void{
        const data = this.prependInfoForShow();
        const event = new CustomEvent('show-modal-info', {detail: data});
        document.dispatchEvent(event);
    };

    protected abstract prependInfoForShow():void;
}