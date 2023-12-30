import "./style.css";
import "./images/partly-cloudy-day.svg";
import { Header, Main, Aside, OverallInfoSection } from './modules/ui';

const body = document.querySelector('body');

export const header = new Header(body);
export const main = new Main(body);

header.render();
main.render();