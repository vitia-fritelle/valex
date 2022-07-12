function dateFormat(date: Date) {
    const month = date.getMonth().toString(10);
    const year = (date.getFullYear()+5).toString(10).slice(-2);
    return month.length > 1?`${month}/${year}`:`0${month}/${year}`;
}

function nameFormat(fullName: string) {
    const nameArray = fullName.split(' ');
    const cardholderName = [];
    for (let i = 0; i < nameArray.length; i++) {
        const name = nameArray[i];
        if(i === 0 || i === nameArray.length-1) {
            cardholderName.push(name);
        } else if(name.length >= 3 && name[0] === name[0].toUpperCase()) {
            cardholderName.push(name[0]);
        }
    }
    return cardholderName.join(' ').toUpperCase();
}

const formatUtils = {
    dateFormat,
    nameFormat,
}

export default formatUtils;