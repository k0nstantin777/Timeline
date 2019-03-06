import { EventList } from './events/EventList';
import { TimelineItem } from './TimelineItem';
import { IEventData } from '../interfaces/IEventData';
import { IFormField } from '../interfaces/IFormField';
import { ElementBuilder } from '../helpers/ElementBuilder';

export class Timeline {
    public events: IEventData[];
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
    private element: HTMLElement;
    private lineElement: HTMLElement;
    private leftColumnElement: HTMLElement;
    private rightColumnElement: HTMLElement;
    private buttonCreateEventElement: HTMLElement;
    private eventList: EventList;
    constructor(){
        this.init();
    }

    public init(): void{
        this.eventList = new EventList;
        this.element = document.querySelector('.timeline');
        this.lineElement = document.querySelector('.timeline-line');
        this.leftColumnElement = document.querySelector('.timeline-column.left');
        this.rightColumnElement = document.querySelector('.timeline-column.right');
        this.buttonCreateEventElement = document.querySelector('#create-event');
        
        document.addEventListener('update-events', this.updateEventsHandler.bind(this));
        this.buttonCreateEventElement.addEventListener('click', this.createEventsHandler.bind(this));
    }

    public build(){
        this.clearTimeline();
        this.events = this.eventList.get();
        console.log(this.events);
        this.setHeightLine();
        let marginTop = 20;
        this.events.forEach((event, index) => {
            const element = this.getTimeLineItem(event); 
            element.style.marginTop = marginTop + 'px';
            if(index%2 === 0){
                this.leftColumnElement.append(element);
            } else {
                this.rightColumnElement.append(element);
            }
            marginTop = element.clientHeight + 30;
        })
    } 

    private setHeightLine():void{
        this.lineElement.style.height = this.events.length * 150 + 'px';
    }

    private getTimeLineItem(event: IEventData):HTMLElement{
        const timeLineItem = new TimelineItem(event);
        return timeLineItem.build();
    }

    private updateEventsHandler(){
        this.build();
    }

    private createEventsHandler(){
        const body = this.createFormNewEvents();
        body.append(this.createDefaultFormField());
        const data:{title: string, body:HTMLElement, footer: HTMLElement} = {
                title: 'Создать событие',
                body: body,
                footer: document.createElement('div')
            };
        const event = new CustomEvent('show-modal-form', {detail: data});
        document.dispatchEvent(event);
    }

    private getCreateOptionsForm():{label:string, value:string}[]{
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

    private getDefaultFieildForm():IFormField{
        return {
            label: 'Тип события',
            tag: 'select',
            id: 'event',
            options: this.getCreateOptionsForm(),
            onchangeEvent: this.changeEventsHandler,
        }
        
    }

    private changeEventsHandler(e:Event){
        const type = (<HTMLInputElement>e.target).value;
        let data:HTMLElement;
        if(type === '0'){
            data = document.createElement('div');
        } else {
            const timeLineItem = new TimelineItem({
                id: 0,
                type: type,
                content: [],
                date: new Date(),
            });
            const fields = timeLineItem.getCreateFormFields();
            data = this.createEventFormFields(fields);

        }
        const event = new CustomEvent('update-modal-form', {detail: {target: '.modal-form' , element:data}});
        document.dispatchEvent(event);
    }

    private createFormNewEvents():HTMLElement{
        const modalFormElement:HTMLElement = document.createElement('div');
        modalFormElement.classList.add('modal-form');
    
        return modalFormElement;
    }

    private createDefaultFormField():HTMLElement{
        const field = this.getDefaultFieildForm();
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
            fieldElement = new ElementBuilder(field.tag, {text: field.label, id: field.id}).build()
            field.options.forEach(option => {
                fieldElement.append(new ElementBuilder('option', {text: option.label, value: option.value}).build());
            }); 
        } else {
            fieldElement = new ElementBuilder(field.tag, {text: field.label, type:field.type ? field.type : 'text', id: field.id}).build()
        }
        if(field.onchangeEvent){
            fieldElement.addEventListener('change', field.onchangeEvent.bind(this));
        }
        formFieldElement.append(fieldElement);
        return formFieldElement;
    }

    private clearTimeline(){
        while (this.leftColumnElement.firstChild) {
            this.leftColumnElement.removeChild(this.leftColumnElement.firstChild);
        }
        while (this.rightColumnElement.firstChild) {
            this.rightColumnElement.removeChild(this.rightColumnElement.firstChild);
        }
    }

}