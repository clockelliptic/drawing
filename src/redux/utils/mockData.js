const LETTERS = [...'qwertyuiopasdfghjklzxcvbnm']
const NUMBERS = [...'1234567890']
const isEven = n => n%2===0
const selectFrom = SET => SET[Math.floor(Math.random()*SET.length)]

export const makeUserId = () => Array(256).fill().map((x, i) => {
    const whichSet = isEven(Math.floor(Math.random()*2)) && isEven(i)
    return (whichSet) ? selectFrom(LETTERS) : selectFrom(NUMBERS)
}).join('')