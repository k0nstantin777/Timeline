import {IEventData} from '../interfaces/IEventData'; 
export interface IEvent extends IEventData {
    create():HTMLElement;
}