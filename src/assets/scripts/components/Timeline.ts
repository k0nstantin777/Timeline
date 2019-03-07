import { EventList } from './events/EventList';
import { TimelineFormItem } from './TimelineFormItem';
import { TimelineItem } from './TimelineItem';
import { IEventData } from '../interfaces/IEventData';

export class Timeline {
    public events: IEventData[];
    
    private element: HTMLElement;
    private lineElement: HTMLElement;
    private leftColumnElement: HTMLElement;
    private rightColumnElement: HTMLElement;
    private buttonCreateEventElement: HTMLElement;
    private eventList: EventList;
    private timelineFormItem: TimelineFormItem;
    private sortByDateElement: HTMLElement;
    private sortByTypeElement: HTMLElement;

    constructor(){
        this.init();
    }

    public init(): void{
        this.eventList = new EventList;
        this.timelineFormItem = new TimelineFormItem;
        this.element = document.querySelector('.timeline');
        this.sortByDateElement = document.querySelector('#sort-date');
        this.sortByTypeElement = document.querySelector('#sort-type');
        this.lineElement = document.querySelector('.timeline-line');
        this.leftColumnElement = document.querySelector('.timeline-column.left');
        this.rightColumnElement = document.querySelector('.timeline-column.right');
        this.buttonCreateEventElement = document.querySelector('#create-event');
        
        document.addEventListener('update-events', this.updateEventsHandler.bind(this));
        this.sortByDateElement.addEventListener('click', this.sortByDate.bind(this));
        this.sortByTypeElement.addEventListener('click', this.sortByType.bind(this));
        this.buttonCreateEventElement.addEventListener('click', this.createEventsHandler.bind(this));
    }

    public build(){
        this.clearTimeline();
        this.events = this.eventList.get();
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

    private sortByDate(e:Event){
        if(this.sortByDateElement.classList.contains('asc')){
            this.eventList.sortByDateDESC();
            this.sortByDateElement.innerHTML = 'По дате <i class="fa fa-sort-desc" aria-hidden="true">';
        } else {
            this.eventList.sortByDateASC();
            this.sortByDateElement.innerHTML = 'По дате <i class="fa fa-sort-asc" aria-hidden="true">';
        }
        this.sortByDateElement.classList.toggle('asc');
        this.sortByDateElement.classList.toggle('desc');
        this.sortByDateElement.classList.add('active');
        this.sortByTypeElement.classList.remove('active');
        this.sortByTypeElement.innerHTML = 'По типу <i class="fa fa-sort" aria-hidden="true"></i>';
        this.build();
    }

    private sortByType(e:Event){
        if(this.sortByTypeElement.classList.contains('asc')){
            this.eventList.sortByTypeDESC();
            this.sortByTypeElement.innerHTML = 'По типу <i class="fa fa-sort-desc" aria-hidden="true"></i>';
        } else {
            this.eventList.sortByTypeASC();
            this.sortByTypeElement.innerHTML = 'По типу <i class="fa fa-sort-asc" aria-hidden="true"></i>';
        }
        this.sortByTypeElement.classList.toggle('asc');
        this.sortByTypeElement.classList.toggle('desc');
        this.sortByTypeElement.classList.add('active');
        this.sortByDateElement.classList.remove('active');
        this.sortByDateElement.innerHTML = 'По дате <i class="fa fa-sort" aria-hidden="true"></i>';
        this.build();
    }

    private setHeightLine():void{
        this.lineElement.style.height = this.events.length * 150 + 'px';
    }

    private getTimeLineItem(event: IEventData):HTMLElement{
        const timeLineItem = new TimelineItem(event);
        return timeLineItem.build();
    }

    private updateEventsHandler():void{
        this.build();
    }

    private createEventsHandler():void{
        this.timelineFormItem.createForm();
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