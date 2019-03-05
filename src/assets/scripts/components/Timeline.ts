import {EventList} from './events/EventList';
import {TimelineItem} from './TimelineItem';
import {IEventData} from '../interfaces/IEventData';

export class Timeline {
    public events: IEventData[];
    private element: HTMLElement;
    private lineElement: HTMLElement;
    private leftColumnElement: HTMLElement;
    private rightColumnElement: HTMLElement;
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
        
        document.addEventListener('update-events', this.updateEventsHandler.bind(this));
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

    private clearTimeline(){
        while (this.leftColumnElement.firstChild) {
            this.leftColumnElement.removeChild(this.leftColumnElement.firstChild);
        }
        while (this.rightColumnElement.firstChild) {
            this.rightColumnElement.removeChild(this.rightColumnElement.firstChild);
        }
    }

}