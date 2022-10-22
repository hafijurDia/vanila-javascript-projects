//********Tab js********** */
const btns = document.querySelectorAll('.tab-btn');
const about = document.querySelector('.about');
const articles = document.querySelectorAll('.content');

about.addEventListener('click', function(e){
    const id = e.target.dataset.id;
    if (id) {
        //remove active class from all buttons
        btns.forEach(function(btn){
            btn.classList.remove('active');
            e.target.classList.add('active');
        });

        articles.forEach(function(article){
            const articleId  = article.id;
            article.classList.remove('active');
            if (articleId === id) {
                article.classList.add('active');
            }
        })

    }
});


