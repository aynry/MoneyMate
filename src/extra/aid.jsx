export const toDay=()=>{
    let firstday = new Date();
    firstday.setHours(0);firstday.setMinutes(0);firstday.setSeconds(0);firstday.setMilliseconds(0);
    let lastday = new Date();
    lastday.setHours(11);lastday.setMinutes(59);lastday.setSeconds(59); lastday.setMilliseconds(999);
    return {firstday, lastday};
}
export const weekDays=()=>{
    let curr = new Date(); // get current date  
    let first = curr.getDate() - curr.getDay(); // First day is the  day of the month - the day of the week  
    let firstday = new Date(curr.setDate(first));
    firstday.setHours(0);firstday.setMinutes(0);firstday.setSeconds(0);firstday.setMilliseconds(0);
    let lastday = new Date(curr.setDate(curr.getDate()+6));
    lastday.setHours(11);lastday.setMinutes(59);lastday.setSeconds(59); lastday.setMilliseconds(999);
    return {firstday, lastday};
}

export const monthDays=()=>{
    var date = new Date();
    var firstday = new Date(date.getFullYear(), date.getMonth(), 1);
    firstday.setHours(0);firstday.setMinutes(0);firstday.setSeconds(0);firstday.setMilliseconds(0);
    var lastday = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    lastday.setHours(11);lastday.setMinutes(59);lastday.setSeconds(59);lastday.setMilliseconds(999);
    return {firstday, lastday};
}
export const getFirstAndLastDayOfLastMonth=()=> {
    const today = new Date();
    const firstDayOfThisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDayOfLastMonth = new Date(firstDayOfThisMonth);
    lastDayOfLastMonth.setDate(0); // Set to the last day of the previous month
  
    const firstDayOfLastMonth = new Date(lastDayOfLastMonth.getFullYear(), lastDayOfLastMonth.getMonth(), 1);
    firstDayOfLastMonth.setHours(0);firstDayOfLastMonth.setMinutes(0);firstDayOfLastMonth.setSeconds(0);firstDayOfLastMonth.setMilliseconds(0);
    lastDayOfLastMonth.setHours(11);lastDayOfLastMonth.setMinutes(59);lastDayOfLastMonth.setSeconds(59);lastDayOfLastMonth.setMilliseconds(999);
    return { firstday:firstDayOfLastMonth, lastday:lastDayOfLastMonth };
  }
  export const getFirstAndLastDayOfLastWeek=()=>{
    const today = new Date();
    const dayOfWeek = today.getDay(); // Get the current day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
    const startOfWeek = new Date(today); // Clone the current date
  
    // Adjust the start date to the beginning of the week (assuming Monday is the start of the week)
    const daysToSubtract = (dayOfWeek === 0 ? 6 : dayOfWeek - 1); // If Sunday, subtract 6 days, otherwise subtract (dayOfWeek - 1) days
    startOfWeek.setDate(today.getDate() - daysToSubtract);
  
    const endOfWeek = new Date(startOfWeek); // Clone the start date
    endOfWeek.setDate(startOfWeek.getDate() + 6); // Add 6 days to get to the end of the week
  
    // To get the last week, subtract 7 days from the start of the week
    const startOfLastWeek = new Date(startOfWeek);
    startOfLastWeek.setDate(startOfWeek.getDate() - 7);
    startOfLastWeek.setHours(0);startOfLastWeek.setMinutes(0);startOfLastWeek.setSeconds(0);startOfLastWeek.setMilliseconds(0);
    const endOfLastWeek = new Date(endOfWeek);
    endOfLastWeek.setDate(endOfWeek.getDate() - 7);
    endOfLastWeek.setHours(11);endOfLastWeek.setMinutes(59);endOfLastWeek.setSeconds(59);endOfLastWeek.setMilliseconds(999);
  
    return { firstday:startOfLastWeek, lastday:endOfLastWeek };
  }

  export const getMonthBoundaries=(year = new Date().getFullYear()) =>{
    const months = [];
    for (let month = 0; month < 12; month++) {
      const firstDay = new Date(year, month, 1);
      firstDay.setHours(0);firstDay.setMinutes(0);firstDay.setSeconds(0);firstDay.setMilliseconds(0);
      const lastDay = new Date(year, month + 1, 0); // Day 0 of the next month represents the last day of the current month
      lastDay.setHours(11);lastDay.setMinutes(59);lastDay.setSeconds(59);lastDay.setMilliseconds(999);
      months.push({
        firstdate: firstDay, // Format for US English locale
        lastdate: lastDay,
      });
    }
    return months;
  }
  export const getRandomColor=()=> {
    // Generate a random integer between 0 and 0xFFFFFF (representing all hex digits)
    const randomHex = Math.floor(Math.random() * 0xFFFFFF);
  
    // Convert the random integer to a hexadecimal string with leading zeroes
    const color = randomHex.toString(16).padStart(6, '0');
  
    return `#${color}`;
  }
  