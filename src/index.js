import './style.css';
import './images/partly-cloudy-day.svg';
import './images/cloud.svg';
import './images/sun.svg';
import './images/rain.svg';
import './images/snow.svg';
import './images/sunny.jpg';
import './images/cloudy.jpg';
import './images/raining.jpg';
import './images/snowing.png';
import { Header, Main, Aside, OverallInfoSection } from './modules/ui';

const body = document.querySelector('body');

export const header = new Header(body);
export const main = new Main(body);
export const aside = new Aside(body);

header.render();
main.render();
