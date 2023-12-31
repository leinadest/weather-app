export default function changeDate(date, change) {
    if (change === 0) return date;

    const increment = (change > 0) ? 1 : -1;
    let year = parseInt(date.slice(0, 4), 10);
    let month = parseInt(date.slice(5, 7), 10);
    let day = parseInt(date.slice(8, 10), 10) + increment;
    
    const [jan, feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dec,] = [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12
    ];

    if ([jan, aug].includes(month)) {
        if (day < 1 || day > 31) month += increment;
        if (day < 1) day = 31;
        if (day > 31) day = 1;
    }

    if (month === feb) {
        if (day < 1 || day > 29) month += increment;
        if (day < 1) day = 31;
        if (day > 29) day = 1;
    }

    if (month === mar) {
        if (day < 1 || day > 31) month += increment;
        if (day < 1) day = 29;
        if (day > 31) day = 1;
    }

    if ([apr, jun, sep, nov].includes(month)) {
        if (day < 1 || day > 30) month += increment;
        if (day < 1) day = 31;
        if (day > 30) day = 1;
    }

    if ([may, jul, oct, dec].includes(month)) {
        if (day < 1 || day > 31) month += increment;
        if (day < 1) day = 30;
        if (day > 31) day = 1;
    }

    if (month < 1 || month > 12) year += increment;
    if (month < 1) month = 12;
    if (month > 12) month = 1;

    const newRepetitions = change - increment;
    month = String(month).padStart(2, '0');
    day = String(day).padStart(2, '0');

    return changeDate(`${year}-${month}-${day}`, newRepetitions);
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
    if (
        conditionToLowerCase.includes('hail')
        || conditionToLowerCase.includes('sleet')
    ) {
        return 'hailing';
    }
    if (
        conditionToLowerCase.includes('mist')
        || conditionToLowerCase.includes('fog')
    ) {
        return 'foggy';
    }
    return null;
}

export function getIcon(condition) {
    if (condition === 'sunny') return 'sun.svg';
    if (condition === 'cloudy') return 'cloud.svg';
    if (condition === 'raining') return 'rain.svg';
    if (condition === 'snowing') return 'snow.svg';
    if (condition === 'hailing') return 'hail.svg';
    return null;
}

export function getImage(condition) {
    if (condition === 'sunny') return 'sunny.jpg';
    if (condition === 'cloudy') return 'cloudy.jpg';
    if (condition === 'raining') return 'raining.jpg';
    if (condition === 'snowing') return 'snowing.png';
    if (condition === 'hailing') return 'hailing.png';
    if (condition === 'foggy') return 'foggy.jpeg';
    return null;
}