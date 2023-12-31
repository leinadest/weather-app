import getCurrentWeatherData, {
  getLocationData,
  getForecastData,
  getHistoryData,
  getMeasurementSystem,
} from './data';
import handleForm from './events';
import { translateCondition, getIcon, getImage } from './utils';

export class Header {
  constructor(containerElement) {
    this.containerElement = containerElement;
  }

  render() {
    const header = document.createElement('header');

    const logoImg = document.createElement('img');
    logoImg.src = './images/partly-cloudy-day.svg';
    header.appendChild(logoImg);

    const titleH1 = document.createElement('h1');
    titleH1.textContent = 'Weather';
    header.appendChild(titleH1);

    const containerDiv = document.createElement('div');
    containerDiv.classList = 'container';
    containerDiv.textContent = 'System:';
    header.appendChild(containerDiv);

    const metricButton = document.createElement('button');
    metricButton.textContent = 'Metric';
    containerDiv.appendChild(metricButton);

    const imperialButton = document.createElement('button');
    imperialButton.textContent = 'Imperial';
    containerDiv.appendChild(imperialButton);

    const searchForm = document.createElement('form');
    searchForm.addEventListener('submit', handleForm);
    header.appendChild(searchForm);

    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Enter location';
    searchForm.appendChild(searchInput);

    const searchButton = document.createElement('button');
    searchButton.classList = 'search';
    searchForm.appendChild(searchButton);

    this.containerElement.appendChild(header);
  }
}

export class Main {
  constructor(containerElement) {
    this.containerElement = containerElement;
  }

  render() {
    this.main = document.createElement('main');

    const darkBgDiv = document.createElement('div');
    darkBgDiv.classList = 'dark-bg';
    this.main.appendChild(darkBgDiv);

    this.locationH3 = document.createElement('h3');
    this.locationH3.classList = 'location';
    this.locationH3.textContent =
      'Enter a location to see its weather information';
    darkBgDiv.appendChild(this.locationH3);

    this.tempH2 = document.createElement('h2');
    this.tempH2.classList = 'temp';
    darkBgDiv.appendChild(this.tempH2);

    this.conditionH3 = document.createElement('h3');
    this.conditionH3.classList = 'condition';
    darkBgDiv.appendChild(this.conditionH3);

    this.extremaH3 = document.createElement('h3');
    this.extremaH3.classList = 'extrema';
    darkBgDiv.appendChild(this.extremaH3);

    this.containerElement.appendChild(this.main);
  }

  updateWeatherData(location, temp, condition, maxTemp, minTemp) {
    this.tempH2.textContent = temp;
    this.locationH3.textContent = `Location: ${location}`;
    this.conditionH3.textContent = condition;
    this.extremaH3.textContent = `Max: ${maxTemp}, Min: ${minTemp}`;

    const image = getImage(translateCondition(condition));
    this.main.style.backgroundImage = `url("./images/${image}")`;
  }
}

export class Aside {
  constructor(containerElement) {
    this.containerElement = containerElement;
  }

  render() {
    const aside = document.createElement('aside');

    this.divs = {};
    for (let i = 0; i < 5; i += 1) {
      this.divs[i] = document.createElement('div');
      this.divs[i].classList = 'other-weather';
      aside.appendChild(this.divs[i]);
    }

    this.containerElement.appendChild(aside);
  }

  updateOtherWeathersData(otherWeathersData) {
    otherWeathersData.forEach((data, i) => {
      const [description, avgTemp, condition] = data;
      const icon = getIcon(translateCondition(condition));

      this.divs[i].innerHTML = description;
      this.divs[i].style.backgroundImage = `url("./images/${icon}")`;

      const avgTempH3 = document.createElement('h3');
      avgTempH3.textContent = avgTemp;

      this.divs[i].appendChild(avgTempH3);
    });
  }
}

export class InfoSection {
  constructor(containerElement) {
    this.containerElement = containerElement;
  }

  render() {
    const infoSection = document.createElement('section');
    infoSection.classList = 'additional-info';

    const titleH2 = document.createElement('h2');
    titleH2.textContent = 'Additional Information';
    infoSection.appendChild(titleH2);

    const flexDiv = document.createElement('div');
    flexDiv.classList = 'flex-container';
    infoSection.appendChild(flexDiv);

    this.sections = {};
    for (let i = 0; i < 7; i += 1) {
      this.sections[i] = document.createElement('section');
      flexDiv.appendChild(this.sections[i]);
    }

    this.containerElement.appendChild(infoSection);
  }

  updateInfo(additionalData) {
    additionalData.forEach((sectionData, i) => {
      const [title, content] = sectionData;

      this.sections[i].innerHTML = `<h3>${title}<h3>`;

      if (content instanceof Array) {
        content.forEach((info) => {
          this.sections[i].innerHTML += `${info}<br>`;
        });
        return;
      }

      this.sections[i].innerHTML += content;
    });
  }
}
