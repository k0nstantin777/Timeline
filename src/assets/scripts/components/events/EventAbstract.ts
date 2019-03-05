import {IEvent} from '../../interfaces/IEvent';
import {IEventData} from '../../interfaces/IEventData';
import {AnyObj} from '../../interfaces/AnyObj'; 
import {ElementBuilder} from '../../helpers/ElementBuilder'; 
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
    
    create():HTMLElement{
        let eventElement:HTMLElement = document.createElement('div');
        eventElement.classList.add('timeline-event', 'timeline-event-item', this.type);
        let head:HTMLElement = new ElementBuilder('div', {'class': 'timeline-event-item-head flex align-center justify-space-between'}).build();
        eventElement.append(head);
        let body:HTMLElement = new ElementBuilder('div', {'class': 'timeline-event-item-body flex flex-wrap align-center'}).build();
        eventElement.append(body);
        let footer:HTMLElement = new ElementBuilder('div', {'class': 'timeline-event-item-footer'}).build();
        eventElement.append(footer);
        
        let dataContent:HTMLElement = new ElementBuilder('div', {'class': 'date-content'}).build();
        let dateWrapper:HTMLElement = new ElementBuilder('div', {'class': 'date-content-wrapper'}).build();
        let point:HTMLElement = new ElementBuilder('span', {'class': 'point'}).build();
        let line:HTMLElement = new ElementBuilder('span', {'class': 'line'}).build();
        let date:HTMLElement = new ElementBuilder('p', {'class': 'date', 'text': this.date.toLocaleDateString()}).build();
        dateWrapper.append(point);
        dateWrapper.append(line);
        dateWrapper.append(date);
        dataContent.append(dateWrapper);
        eventElement.append(dataContent);

        eventElement.addEventListener('click', this.clickEventHandler.bind(this));
        return eventElement;
    }

    abstract clickEventHandler():void;
}