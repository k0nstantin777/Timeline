import {EventList} from './events/EventList';
import {TimelineItem} from './TimelineItem';
import {IEventData} from '../interfaces/IEventData';
export class Timeline {
    public events: IEventData[];
    private head: string = 'Timeline';
    private element: HTMLElement;
    private lineElement: HTMLElement;
    private leftColumnElement: HTMLElement;
    private rightColumnElement: HTMLElement;
    
    constructor(private eventList:EventList){
        this.init();
    }

    public init(): void{
        this.element = document.querySelector('.timeline');
        this.lineElement = document.querySelector('.timeline-line');
        this.leftColumnElement = document.querySelector('.timeline-column.left');
        this.rightColumnElement = document.querySelector('.timeline-column.right');
        this.events = this.eventList.getEvents();
        console.log(this);
    }

    public run(){
        this.setHeightLine();
        this.events.forEach((event, index) => {
            if(index%2 !==0){
                this.leftColumnElement.append(this.getTimeLineItem(event));
            } else {
                this.rightColumnElement.append(this.getTimeLineItem(event));
            }
        })
    } 

    private setHeightLine():void{
        this.lineElement.style.height = this.events.length * 150 + 'px';
    }

    private getTimeLineItem(event: IEventData):HTMLElement{
        const timeLineItem = new TimelineItem(event);
        return timeLineItem.build();
    }

}