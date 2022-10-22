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
  const weekdays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  const giveway = document.querySelector('.giveaway');
  const deadline = document.querySelector('.deadline');
  const items = document.querySelectorAll('.deadline-format h4');
  
  //offer end date and time
  const tempDate = new Date();
  const tempYear = tempDate.getFullYear();
  const tempMonth = tempDate.getMonth();
  const tempDay = tempDate.getDate(); 
  //const futureDate = new Date(2022,11,14,11,30,0);
  const futureDate = new Date(tempYear,tempMonth,tempDay + 50,2,30,0);

  //console.log(futureDate);
  const year = futureDate.getFullYear();
  const hours = futureDate.getHours();
  const minutes = futureDate.getMinutes();

  let month = futureDate.getMonth();
  month = months[month];

  let weekday = futureDate.getDay();
  weekday = weekdays[weekday];

  const date = futureDate.getDate();

  giveway.innerHTML = `Giveway end on ${weekday},${date} ${month} ${year} ${hours}:${minutes}am`;

  //future time in ms
  const futureTime = futureDate.getTime();

  function getTimeRemaining(){
    const today = new Date().getTime();
    const t = futureTime - today;
    //console.log(t);
    // 1s = 1000ms
    // 1min = 60s
    // 1hr = 60min
    //1 day = 24hrs
    const oneDay = 24*60*60*1000;
    const oneHour = 60*60*1000;
    const oneMinute = 60*1000;
    //calculate the values
    let days = t / oneDay;
    days = Math.floor(days);
    let hours  = Math.floor((t % oneDay) / oneHour);
    let minutes  = Math.floor((t % oneHour) / oneMinute);
    let seconds  = Math.floor((t % oneMinute) / 1000);

    //set values array
    const values = [days,hours,minutes,seconds];
    function format(item){
        if (item < 10) {
            return item = `0${item}`;
        }
        return item;
    }

    items.forEach(function(item,index){
        item.innerHTML = format(values[index]);
    });
    
    //clear count down
    if (t < 0) {
        clearInterval(countDown);
        deadline.innerHTML = `<h4 class='expired'>Sorry, this giveway has expired!</h4>`
    }
 
  }
  // countdown
  let countDown = setInterval(getTimeRemaining,1000);
  getTimeRemaining();