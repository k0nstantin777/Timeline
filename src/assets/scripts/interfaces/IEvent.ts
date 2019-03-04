import {AnyObj} from '../interfaces/AnyObj'; 
import {IEventData} from '../interfaces/IEventData'; 
export interface IEvent extends IEventData {
    create(event:AnyObj):HTMLElement;
}