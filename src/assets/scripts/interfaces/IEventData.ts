import {AnyObj} from '../interfaces/AnyObj'; 

export interface IEventData{
    id: number;
    type: string;
    content: AnyObj;
    date: Date;
}