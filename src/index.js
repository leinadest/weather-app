import './style.css';
import './images/partly-cloudy-day.svg';
import './images/cloud.svg';
import './images/sun.svg';
import './images/rain.svg';
import './images/snow.svg';
import './images/hail.svg';
import './images/fog.svg';
import './images/storm.svg';
import './images/sunny.jpg';
import './images/cloudy.jpg';
import './images/raining.jpg';
import './images/snowing.png';
import './images/hailing.jpg';
import './images/foggy.jpeg';
import './images/stormy.jpg';
import { Header, Main, Aside, InfoSection } from './modules/ui';
import * as Data from './modules/data';

const body = document.querySelector('body');

export const header = new Header(body);
export const main = new Main(body);
export const aside = new Aside(body);
export const infoSection = new InfoSection(body);

header.render();
main.render();

