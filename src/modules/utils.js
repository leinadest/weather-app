export default function decrementDate(date, repetitions) {
    if (repetitions === 0) return date;

    let year = parseInt(date.slice(0, 4), 10);
    let month = parseInt(date.slice(5, 7), 10);
    let day = parseInt(date.slice(8, 10), 10) - 1;

    if (day === 0) {
        month -= 1;
    }

    if (month === 0) {
        month = 12;
        year -= 1;
    }

    if (month % 2 === 1 || month === 8) {
        day = 31;
    }
    
    if ([4, 6, 9, 11].includes(month)) {
        day = 30;
    }

    if (month === 2) {
        day = 29;
    }

    const newRepetitions = repetitions - 1;

    return decrementDate(`${year}-${month}-${day}`, newRepetitions);
}

export function translateCondition(condition) {
    const conditionToLowerCase = condition.toLowerCase();
    if (
        conditionToLowerCase.includes('sunny')
        || conditionToLowerCase.includes('clear')
    ) {
        return 'sunny';
    }
    if (
        conditionToLowerCase.includes('rain')
        || conditionToLowerCase.includes('drizzle')
    ) {
        return 'raining';
    }
    if (
        conditionToLowerCase.includes('overcast')
        || conditionToLowerCase.includes('cloud')
    ) {
        return 'cloudy';
    }
    if (
        conditionToLowerCase.includes('snow')
        || conditionToLowerCase.includes('blizzard')
    ) {
        return 'snowing';
    }
    return null;
}

export function getIcon(condition) {
    if (condition === 'sunny') return 'sun.svg';
    if (condition === 'cloudy') return 'cloud.svg';
    if (condition === 'raining') return 'rain.svg';
    if (condition === 'snowing') return 'snow.svg';
    return null;
}

export function getImage(condition) {
    if (condition === 'sunny') return 'sunny.jpg';
    if (condition === 'cloudy') return 'cloudy.jpg';
    if (condition === 'raining') return 'raining.jpg';
    if (condition === 'snowing') return 'snowing.png';
    return null;
}