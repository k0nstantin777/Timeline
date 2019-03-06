export interface IFormField{
    label:string;
    tag: string;
    type?:string; 
    id: string; 
    options?:{
        label:string,
        value:string
    }[],
    onchangeEvent?:Function;
}