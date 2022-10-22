const currrentDate = document.querySelector(".current-date");
const daysTag = document.querySelector(".days");
const prevNextIcon = document.querySelectorAll(".icons span");

//getting new date, current year and  month
let date = new Date();
currYear = date.getFullYear();
currMonth = date.getMonth();
const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

const rendarCalendar = () => {
    let firstDayOfMonth = new Date(currYear, currMonth, 1).getDay(); //getting first date of month
    let lastDateOfMonth = new Date(currYear, currMonth + 1, 0).getDate(); //getting last date of month
    let lastDayOfMonth = new Date(currYear, currMonth, lastDateOfMonth).getDay(); //getting last date of previous month
    let lastDateOfLastMonth = new Date(currYear, currMonth, 0).getDate(); //getting last date of previous month
    let liTag = "";

    for (let i = firstDayOfMonth; i > 0; i--) {// creating li of previous month last days
        liTag += `<li class="inactive">${lastDateOfLastMonth - i + 1}</li>`;
        
    }

    for (let i = 1; i <= lastDateOfMonth; i++) {// creating li of current month
        let isToday = i === date.getDate() && currMonth === date.getMonth() && currYear === date.getFullYear() ? "active" : "";
        liTag += `<li class="${isToday}">${i}</li>`;
    }

    for (let i = lastDayOfMonth; i < 6; i++) {// cratingli of next month of first days
        liTag += `<li class="inactive">${i - lastDayOfMonth + 1}</li>`;
    }
    
    currrentDate.innerHTML = `${months[currMonth]} ${currYear}`;
    daysTag.innerHTML = liTag;
}
rendarCalendar();

//previous monthe and next month icon
prevNextIcon.forEach(icon => {
    icon.addEventListener('click', () => { //adding click event on both icons
        currMonth = icon.id === 'prev' ? currMonth - 1 : currMonth +1;
        if (currMonth < 0 || currMonth > 11) {
            date = new Date(currYear,currMonth);
            currYear = date.getFullYear();
            currMonth = date.getMonth();            
        }else{
            date = new Date();
        }
        rendarCalendar();
    })
})