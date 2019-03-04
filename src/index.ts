import './assets/styles/style.scss';
import {Timeline} from './assets/scripts/components/Timeline';
import {EventList} from './assets/scripts/components/events/EventList';

const timeline = new Timeline(new EventList());
timeline.run();