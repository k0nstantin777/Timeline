import { ElementBuilder } from '../helpers/ElementBuilder';
import { IFormField } from '../interfaces/IFormField';
import { TimelineItem } from './TimelineItem';

export class TimelineFormItem{
    private eventTypes:{type:string, name:string}[] = [
        {
            type: 'transaction',
            name: 'Финансовая транзакция'
        },
        {
            type: 'news',
            name: 'Новость'
        }
    ];

    public createForm():void{
        const modalFormElement:HTMLFormElement = document.createElement('form');
        modalFormElement.classList.add('modal-form');
        modalFormElement.setAttribute('method', 'post');
        const self = this;
        modalFormElement.addEventListener('submit', function(event){
            event.preventDefault();
            const data = new FormData(this);
            self.createNewEvent(data);
        });
        modalFormElement.append(this.createDefaultFormField());

        const data:{title: string, body:HTMLElement, footer: HTMLElement} = {
            title: 'Создать событие',
            body: modalFormElement,
            footer: document.createElement('div')
        };
        const event = new CustomEvent('show-modal-form', {detail: data});
        document.dispatchEvent(event);
    }

    private createNewEvent(data:FormData):void{
        const type:FormDataEntryValue = data.get('event') as string;
        const timeLineItem = this.getNewTimeLineItemByType(type);
        const newEvent = timeLineItem.createEvent(data);
        const event = new CustomEvent('store-event', {detail: newEvent});
        document.dispatchEvent(event);
    }

    private createSaveButton():HTMLElement{
        const button = new ElementBuilder('button', {type: 'button', text: 'Сохранить', class: 'btn btn-primary'}).build();
        button.addEventListener('click', this.saveEventHandler.bind(this));

        return button;
    }

    private getNewTimeLineItemByType(type: string): TimelineItem {
        return new TimelineItem({
                id: 0,
                type: type,
                content: [],
                date: new Date(),
            });
        
    }

    private saveEventHandler():void{
        const form:HTMLFormElement = document.querySelector('form.modal-form');
        var event = new Event("submit");
        form.dispatchEvent(event);        
    }

    private createDefaultFormField():HTMLElement{
        const field = this.getDefaultFieldForm();
        const defaultFormElement:HTMLElement = document.createElement('div');
        defaultFormElement.classList.add('default-form-event-fields');
        defaultFormElement.append(this.createInputElement(field));

        return defaultFormElement;
    }

    private createEventFormFields(fields:IFormField[]):HTMLElement{
        const eventFormElement:HTMLElement = document.createElement('div');
        eventFormElement.classList.add('form-event-fields');
        fields.forEach(field => {
            eventFormElement.append(this.createInputElement(field));
        });

        return eventFormElement;
    }

    private createInputElement(field:IFormField):HTMLElement{
        const formFieldElement = document.createElement('div');
        formFieldElement.classList.add('form-field');
        formFieldElement.append(new ElementBuilder('label', {text: field.label, for: field.id}).build());
        let fieldElement:HTMLElement;
        if(field.tag === 'select' && field.options.length){
            fieldElement = new ElementBuilder(field.tag, {id: field.id, name: field.id}).build()
            field.options.forEach(option => {
                fieldElement.append(new ElementBuilder('option', {text: option.label, value: option.value}).build());
            }); 
        } else {
            fieldElement = new ElementBuilder(field.tag, {type:field.type ? field.type : 'text', id: field.id, name: field.id}).build()
        }
        if(field.onchangeEvent){
            fieldElement.addEventListener('change', field.onchangeEvent.bind(this));
        }
        formFieldElement.append(fieldElement);
        return formFieldElement;
    }

    private getDefaultFieldForm():IFormField{
        return {
            label: 'Тип события',
            tag: 'select',
            id: 'event',
            options: this.getDefaultOptionsForm(),
            onchangeEvent: this.changeEventsHandler,
        }
        
    }

    private getDefaultOptionsForm():{label:string, value:string}[]{
        const options:{label:string, value:string}[] = [];
        options.push({
            label: 'Выбрать событие',
            value: '0',
        });
        this.eventTypes.forEach(event => {
            options.push({
                label: event.name,
                value: event.type,
            })
        });

        return options;
    }


    private changeEventsHandler(e:Event):void{
        const type = (<HTMLInputElement>e.target).value;
        let data:HTMLElement;
        let button:HTMLElement; 
        if(type === '0'){
            data = document.createElement('div');
            button = document.createElement('div');
        } else {
            const timeLineItem = this.getNewTimeLineItemByType(type);
            const fields = timeLineItem.getCreateFormFields();
            data = this.createEventFormFields(fields);
            button = this.createSaveButton();
        }
        const event = new CustomEvent('update-modal-form', {detail: [
            {target: '.modal-form' , element:data},
            {target: '.modal-footer' , element:button}
        ]});
        document.dispatchEvent(event);
    }
}