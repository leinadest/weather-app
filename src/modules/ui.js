import getCurrentWeatherData, {
    getLocationData,
    getForecastData,
    getHistory,
    getMeasurementSystem
} from './data';
import { handleForm } from './events';

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

        const containerDiv = document.createElement('div');
        containerDiv.classList = 'container';
        containerDiv.textContent = 'System:'
        header.appendChild(containerDiv);

        const metricButton = document.createElement('button');
        metricButton.textContent = 'Metric';
        containerDiv.appendChild(metricButton);

        const imperialButton = document.createElement('button');
        imperialButton.textContent = 'Imperial';
        containerDiv.appendChild(imperialButton);

        this.containerElement.appendChild(header);
    }
}

export class Main {
    constructor(containerElement) {
        this.containerElement = containerElement;
    }

    render() {
        const main = document.createElement('main');

        const darkBgDiv = document.createElement('div');
        darkBgDiv.classList = 'dark-bg';
        main.appendChild(darkBgDiv);

        this.locationH3 = document.createElement('h3');
        this.locationH3.classList = 'location';
        this.locationH3.textContent = 'Enter a location to see its weather information';
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

        this.containerElement.appendChild(main);
    }

    async updateWeatherData(
        location, 
        temp, 
        condition, 
        maxTemp, 
        minTemp,
        measurementSystem
    ) {
        if (measurementSystem === 'Metric') {
            this.tempH2.textContent = `${temp}°C`;
            this.extremaH3.textContent = `Max: ${maxTemp}°C, Min: ${minTemp}°C`;
        } else {
            this.tempH2.textContent = `${temp}°F`;
            this.extremaH3.textContent = `Max: ${maxTemp}°F, Min: ${minTemp}°F`;
        }

        this.locationH3.textContent = `Location: ${location}`;
        this.conditionH3.textContent = condition;
    }
}

export class Aside {
    constructor(containerElement) {
        this.containerElement = containerElement;
    }

    render() {
        const aside = document.createElement('aside');

        for (let i = 0; i < 5; i += 1) {
            const div = document.createElement('div');
            div.classList = 'past-weather';
            aside.appendChild(div);
        }

        this.containerElement.appendChild(aside);
    }
}

export class OverallInfoSection {
    constructor(containerElement) {
        this.containerElement = containerElement;
    }

    render() {
        const overallInfoSection = document.createElement('section');

        this.containerElement.appendChild(overallInfoSection);
    }
}