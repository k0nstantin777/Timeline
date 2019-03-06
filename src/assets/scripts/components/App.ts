import {Timeline} from './Timeline';
import {EventList} from './events/EventList';
import {AnyObj} from '../interfaces/AnyObj'; 
import { Modal } from './Modal';
export class App {
    public timeline:Timeline;
    public eventList:EventList;
    public modal:Modal;
    constructor(){
        this.timeline = new Timeline();
        this.modal = new Modal;
        this.init();
    }   

    public run():void{
        this.timeline.build();
    }

    private init():void{
        document.addEventListener('show-modal-info',  this.showModalInfo.bind(this));
        document.addEventListener('show-modal-form',  this.showModalForm.bind(this));
        document.addEventListener('update-modal-form',  this.updateModalForm.bind(this));
        document.addEventListener('close-modal',  this.closeModal.bind(this));
    }

    private showModalInfo(event:CustomEvent){
        this.modal.showInfo(event.detail);
    }

    private showModalForm(event:CustomEvent){
        this.modal.showForm(event.detail);
    }

    private updateModalForm(event:CustomEvent){
        this.modal.updateForm(event.detail);
    }

    private closeModal():void{ 
        this.modal.close();
    }
}