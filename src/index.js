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
import './modules/data';
import { Header, Main } from './modules/ui';
import { handleForm, handleButton, handleInput } from './modules/events';

document.addEventListener('DOMContentLoaded', () => {
  Header.createHeader();
  Main.createMain();

  document.querySelector('input').addEventListener('input', handleInput);
  document.querySelector('form').addEventListener('submit', handleForm);
  document.querySelectorAll('.container button').forEach((button) => {
    button.addEventListener('click', handleButton);
  });
});
