import {IEventData} from '../interfaces/IEventData'; 
import { IFormField } from '../interfaces/IFormField';

export interface IEvent extends IEventData {
    create():HTMLElement;
    getFormFields():IFormField[];
}