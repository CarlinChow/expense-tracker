
export const daysRemainingInMonth = ():number => {
    let today = new Date()
    let lastDayOfTheMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    return lastDayOfTheMonth.getDate() - today.getDate()
}