import './assets/styles/style.scss';
import {Timeline} from './assets/scripts/Timeline';
import {EventSearcher} from './assets/scripts/events/EventSearcher';

const timeline = new Timeline(new EventSearcher());