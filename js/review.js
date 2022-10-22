// total review data
const reviews = [
    {
        id: 1,
        name:"Jhone",
        job:"Developer",
        text:"Some representative placeholder content for the three columns of text below the carousel. This is the first column.",
        img:"https://www.w3schools.com/howto/img_avatar.png",
    },
    {
        id: 2,
        name:"Karry Sue",
        job:"UI/UX Designer",
        text:"Another exciting bit of representative placeholder content. This time, we've moved on to the second column.",
        img:"https://www.w3schools.com/howto/img_avatar2.png",
    },
    {
        id: 3,
        name:"Marry Kan",
        job:"Marketer",
        text:"And lastly this, the third column of representative placeholder content.",
        img:"https://www.w3schools.com/howto/img_avatar.png",
    },
];

// get items
const personImg = document.getElementById('person-img');
const author = document.getElementById('author');
const job = document.getElementById('job');
const info = document.getElementById('info');

const prevBtn = document.querySelector('.prev-btn')
const nextBtn = document.querySelector('.next-btn')
const randomBtn = document.querySelector('.random-btn')

//set staring item
let currentItem = 0;

// load initial item
window.addEventListener("DOMContentLoaded", function(){
    showperson(currentItem)

});

//show person base item
function showperson(person){
    const item = reviews[person];
    personImg.src = item.img;
    author.textContent = item.name;
    job.textContent = item.job;
    info.textContent = item.text;
}

//show next person item
nextBtn.addEventListener('click', function(){
    currentItem++;
    if (currentItem > reviews.length - 1) {
        currentItem = 0;
    }
    showperson(currentItem);
});
prevBtn.addEventListener('click', function(){
    currentItem--;
    if (currentItem < 0) {
        currentItem = reviews.length - 1;
    }
    showperson(currentItem);
});

randomBtn.addEventListener('click', function(){
    const currentItem = Math.floor(Math.random() * reviews.length);
    showperson(currentItem);
});

