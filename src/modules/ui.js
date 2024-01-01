import { translateCondition, getIcon, getImage } from './utils';

export class Header {
  static createHeader() {
    const header = document.createElement('header');
    const logoImg = document.createElement('img');
    const titleH1 = document.createElement('h1');
    const containerDiv = document.createElement('div');
    const metricButton = document.createElement('button');
    const imperialButton = document.createElement('button');
    const searchForm = document.createElement('form');
    const searchInput = document.createElement('input');
    const searchButton = document.createElement('button');

    logoImg.src = './images/partly-cloudy-day.svg';
    titleH1.textContent = 'Weather';
    containerDiv.classList = 'container';
    containerDiv.textContent = 'System:';
    metricButton.textContent = 'Metric';
    imperialButton.textContent = 'Imperial';
    searchInput.type = 'text';
    searchInput.placeholder = 'Enter location';
    searchButton.classList = 'search';

    header.appendChild(logoImg);
    header.appendChild(titleH1);
    header.appendChild(containerDiv);
    header.appendChild(searchForm);
    containerDiv.appendChild(metricButton);
    containerDiv.appendChild(imperialButton);
    searchForm.appendChild(searchInput);
    searchForm.appendChild(searchButton);
    document.querySelector('body').appendChild(header);
  }
}

export class Main {
  static createMain() {
    const main = document.createElement('main');
    const darkBgDiv = document.createElement('div');
    const locationH3 = document.createElement('h3');
    const tempH2 = document.createElement('h2');
    const conditionH3 = document.createElement('h3');
    const extremaH3 = document.createElement('h3');

    darkBgDiv.classList = 'dark-bg';
    locationH3.textContent = 'Enter a location to see its weather information';
    locationH3.classList = 'location';
    tempH2.classList = 'temp';
    conditionH3.classList = 'condition';
    extremaH3.classList = 'extrema';

    main.appendChild(darkBgDiv);
    darkBgDiv.appendChild(locationH3);
    darkBgDiv.appendChild(tempH2);
    darkBgDiv.appendChild(conditionH3);
    darkBgDiv.appendChild(extremaH3);
    document.querySelector('body').appendChild(main);
  }

  static updateWeatherData(location, temp, condition, maxTemp, minTemp) {
    const tempH2 = document.querySelector('.temp');
    const locationH3 = document.querySelector('.location');
    const conditionH3 = document.querySelector('.condition');
    const extremaH3 = document.querySelector('.extrema');
    const main = document.querySelector('main');

    tempH2.textContent = temp;
    locationH3.textContent = `Location: ${location}`;
    conditionH3.textContent = condition;
    extremaH3.textContent = `Max: ${maxTemp}, Min: ${minTemp}`;

    const image = getImage(translateCondition(condition));
    main.style.backgroundImage = `url("./images/${image}")`;
  }
}

export class Aside {
  static createAside() {
    const aside = document.createElement('aside');

    const divs = {};
    for (let i = 0; i < 5; i += 1) {
      divs[i] = document.createElement('div');
      divs[i].classList = 'other-weather';
      aside.appendChild(divs[i]);
    }

    document.querySelector('body').appendChild(aside);
  }

  static updateOtherWeathersData(otherWeathersData) {
    const divs = document.querySelectorAll('.other-weather');

    otherWeathersData.forEach((data, i) => {
      const [description, avgTemp, condition] = data;
      const icon = getIcon(translateCondition(condition));

      divs[i].innerHTML = description;
      divs[i].style.backgroundImage = `url("./images/${icon}")`;

      const avgTempH3 = document.createElement('h3');
      avgTempH3.textContent = avgTemp;

      divs[i].appendChild(avgTempH3);
    });
  }
}

export class InfoSection {
  static createInfoSection() {
    const infoSection = document.createElement('section');
    const titleH2 = document.createElement('h2');
    const flexDiv = document.createElement('div');
    const sections = {};
    for (let i = 0; i < 7; i += 1) {
      sections[i] = document.createElement('section');
      flexDiv.appendChild(sections[i]);
    }

    infoSection.classList = 'additional-info';
    titleH2.textContent = 'Additional Information';
    flexDiv.classList = 'flex-container';

    infoSection.appendChild(titleH2);
    infoSection.appendChild(flexDiv);
    document.querySelector('body').appendChild(infoSection);
  }

  static updateInfo(additionalData) {
    const sections = document.querySelectorAll('.additional-info section');

    additionalData.forEach((sectionData, i) => {
      const [title, content] = sectionData;

      sections[i].innerHTML = `<h3>${title}<h3>`;
      if (content instanceof Array) {
        content.forEach((info) => {
          sections[i].innerHTML += `${info}<br>`;
        });
        return;
      }

      sections[i].innerHTML += content;
    });
  }
}
