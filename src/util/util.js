import moment from 'moment';

export function isValidEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(email)
}
 
export function isEmpty(param) {
    if (param === '')
        return true
}

export function isEightChar(param) {
    if (param.length >= 8)
        return true
}

export function isEqual(firstValue, secondValue) {
    if (firstValue === secondValue)
        return true
}

export const roundNumber = (number) => {
    return Math.round((number + Number.EPSILON) * 100) / 100
}

export const productExist = (array, value) => {
   
    return array.some((object) => {
        return object.product === value;
    })
}

export const dateNow = () => {
    const today = moment().format('MM-DD-YYYY, HH:MM:SS A')
    return today
}

export const totalAmount = (array) => {
    return array
    .map(items => items.total_price)
    .reduce((prev, curr) => prev + curr, 0)
}

export const totalItems = (array) => {
    return array
    .map(items => items.quantity)
    .reduce((prev, curr) => prev + curr, 0)
}