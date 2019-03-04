import {IEvent} from '../../interfaces/IEvent';
import {AnyObj} from '../../interfaces/AnyObj'; 
import {ElementBuilder} from '../../helpers/ElementBuilder'; 
export abstract class EventAbstract implements IEvent {
    public type:string;
    public content:AnyObj;
    public date:string;
    
    create(event: {type:string, content:AnyObj, date:string}):HTMLElement{
        let eventElement:HTMLElement = document.createElement('div');
        eventElement.classList.add('timeline-event', 'timeline-event-item', event.type);
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
        let date:HTMLElement = new ElementBuilder('p', {'class': 'date', 'text': event.date}).build();
        dateWrapper.append(point);
        dateWrapper.append(line);
        dateWrapper.append(date);
        dataContent.append(dateWrapper);
        eventElement.append(dataContent);
        return eventElement;
    }
}