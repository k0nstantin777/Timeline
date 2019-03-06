import { IEvent } from "../../interfaces/IEvent";
import { IEventData } from '../../interfaces/IEventData';
import { ITransactionContent } from "../../interfaces/ITransactionContent";
import { EventAbstract } from "./EventAbstract";
import { ElementBuilder } from '../../helpers/ElementBuilder'; 

export class EventTransaction extends EventAbstract implements IEvent{

    public content:ITransactionContent
    
    constructor(event: IEventData){
        super(event)
    }

    public create(): HTMLElement{
        const element = super.create();
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

    private remove(e:Event):void{
        const event = new CustomEvent('remove-element', {detail: {id:this.id}});
        document.dispatchEvent(event);
    }

}