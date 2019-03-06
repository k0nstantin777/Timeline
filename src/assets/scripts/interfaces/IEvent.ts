import {IEventData} from '../interfaces/IEventData'; 
import { IFormField } from '../interfaces/IFormField';

export interface IEvent extends IEventData {
    createElement():HTMLElement;
    getFormFields():IFormField[];
    create(data:FormData):IEventData;
}