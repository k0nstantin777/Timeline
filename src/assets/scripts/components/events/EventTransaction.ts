import { IEvent } from "../../interfaces/IEvent";
import { IEventData } from '../../interfaces/IEventData';
import { ITransactionContent } from "../../interfaces/ITransactionContent";
import { EventAbstract } from "./EventAbstract";
import { ElementBuilder } from '../../helpers/ElementBuilder'; 
import { IFormField } from '../../interfaces/IFormField';

export class EventTransaction extends EventAbstract implements IEvent{

    public content:ITransactionContent
    
    constructor(event: IEventData){
        super(event)
    }

    public createElement(): HTMLElement{
        const element = super.createElement();
        const head = element.querySelector('.timeline-event-item-head');
        const title:HTMLElement = new ElementBuilder('p', {'html': '<i class="fa fa-money" aria-hidden="true"></i> Финансовая транзакция'}).build();
        head.append(title);

        const body = element.querySelector('.timeline-event-item-body');
        const summ :HTMLElement = new ElementBuilder('span', {'text': 'Сумма: ' + this.content.summ}).build();
        const currency :HTMLElement = new ElementBuilder('span', {'text': 'Валюта: ' + this.content.currency}).build();
        const author :HTMLElement = new ElementBuilder('span', {'text': 'Автор: ' + this.content.author}).build();
        body.append(summ);
        body.append(currency);
        body.append(author);

        const footer = element.querySelector('.timeline-event-item-footer');
        footer.classList.add(this.content.move); 
        const mark:HTMLElement = new ElementBuilder('i', {'class': (this.content.move === 'positive') ? 'fa fa-plus' : 'fa fa-minus', 'aria-hidden' : "true"}).build();
        footer.append(mark);
        return element;
    }

    public getFormFields():IFormField[]{
        return [
            {
                label: 'Сумма транзакции',
                tag: 'input',
                type: 'text',
                id: 'summ',
            },
            {
                label: 'Валюта',
                tag: 'input',
                type: 'text',
                id: 'currency',
            },
            {
                label: 'Вид',
                tag: 'select',
                options: [
                    {
                        label: 'Приход',
                        value: 'positive'
                    },
                    {
                        label: 'Расход',
                        value: 'negative'
                    }
                ],
                id: 'move',
            },
            {
                label: 'Автор',
                tag: 'input',
                type: 'text',
                id: 'author',
            },
            {
                label: 'Описание',
                tag: 'textArea',
                id: 'description',
            },
            {
                label: 'Дата',
                tag: 'input',
                type: 'date',
                id: 'date',
            },
        ]
    };

    protected prependInfoForShow():{title: string, content: string[], footer: HTMLElement}{
        const btnElement = new ElementBuilder('button', {type: 'button', class: 'btn btn-danger', text: 'Удалить'}).build();
        btnElement.addEventListener('click', this.remove.bind(this));
        return {
            title: 'Финансовая транзакция, ' + this.date.toLocaleDateString(),
            content: [
                `Cумма: ${this.content.summ} ${this.content.currency}`,
                `Вид: ${(this.content.move === 'positive') ? 'Приход' : 'Расход'}`,
                `Автор: ${this.content.author}`,
                `Описание: ${this.content.description}`,
            ],
            footer: btnElement,
        }
    }

    create(data:FormData):IEventData{
        const type = data.get('event') as string;
        const date =  data.get('date') as string;
        const summ = data.get('summ') as string;
        const currency = data.get('currency') as string;
        const move = data.get('move') as string;
        const author = data.get('author') as string;
        const description = data.get('description') as string;

        return {
            id: 0,
            type: type,
            content: {
                summ: summ,
                currency: currency,
                move:move,
                author:author,
                description:description,
            },
            date: new Date(date),
        }
    }

    private remove(e:Event):void{
        const event = new CustomEvent('remove-element', {detail: {id:this.id}});
        document.dispatchEvent(event);
    }

}