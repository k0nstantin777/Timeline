import {EventSearcher} from './events/EventSearcher';
export class Timeline {
    public events: object[];
    private head: string = 'Timeline';
    constructor(private eventSearcher:EventSearcher){
        this.init();
    }

    public init(){
        this.events = this.eventSearcher.getEvents();
        console.log(this.events);
    }

    private build(){
        
    } 
}