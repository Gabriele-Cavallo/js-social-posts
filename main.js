const posts = [
    {
        "id": 1,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/300?image=171",
        "author": {
            "name": "Phil Mangione",
            "image": "https://unsplash.it/300/300?image=15"
        },
        "likes": 80,
        "created": "2021-06-25"
    },
    {
        "id": 2,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=112",
        "author": {
            "name": "Sofia Perlari",
            "image": "https://unsplash.it/300/300?image=10"
        },
        "likes": 120,
        "created": "2021-09-03"
    },
    {
        "id": 3,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=234",
        "author": {
            "name": "Chiara Passaro",
            "image": "https://unsplash.it/300/300?image=20"
        },
        "likes": 78,
        "created": "2021-05-15"
    },
    {
        "id": 4,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=24",
        "author": {
            "name": "Luca Formicola",
            "image": null
        },
        "likes": 56,
        "created": "2021-04-03"
    },
    {
        "id": 5,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=534",
        "author": {
            "name": "Alessandro Sainato",
            "image": "https://unsplash.it/300/300?image=29"
        },
        "likes": 95,
        "created": "2021-03-05"
    }
];

// Ricreiamo un feed social aggiungendo al layout di base fornito, il nostro script JS in cui:

// Milestone 1 - Prendendo come riferimento il layout di esempio presente nell'html, stampiamo i post del nostro feed.

// Stampo in pagina tutti i post presenti nell'array di oggetti
// Creo l'elemento del DOM che andrò a popolare
const domPosts = document.querySelector('#container');
// Per ogni oggetto riempio il DOM con il template HTML
posts.forEach((singlePost) => {
    let postTemplate = singleTemplate (singlePost);
    domPosts.innerHTML += postTemplate;
});

// Milestone 2 - Se clicchiamo sul tasto "Mi Piace" cambiamo il colore al testo del bottone e incrementiamo il counter dei likes relativo.
// Salviamo in un secondo array gli id dei post ai quali abbiamo messo il like.
    // Creo l'array che andrà a contenere gli id dei post ai quali viene messo il like
    let likedPost = [];
    // Creo tutti gli elementi del DOM a cui associare l'evento click
    const likeButton = document.querySelectorAll('.js-like-button');
    // Creo tutti gli elementi del DOM che faranno da counter per il numero di like
    const likeCounter = document.querySelectorAll('.js-likes-counter');
    // Richiamo la funzione che regola i like button e i like counter
    counterLikeButton(likeButton, likeCounter, likedPost);
    
// FUNCTIONS

// funzione per generare il singolo template
// createNewPost oggetto che passa le chiavi alla funzione
// return: singolo post template
function singleTemplate (createNewPost){
    // Destrutturo gli oggetti per poter utilizzare le variabili nel DOM
    let {id , content, media, author, likes, created} = createNewPost;
    // Formattare le date in formato italiano (gg/mm/aaaa)
    let italianDate;
    // divido gli elementi della chiave created
    let splitDate = created.split('-');
    // riordino gli elementi per creare la sintassi di data italiana e utilizzo quella variabile per popolare dinamicamente il DOM
    italianDate = splitDate[2] + '/' + splitDate[1] + '/' + splitDate[0];
    // Gestire l'assenza dell'immagine profilo con un elemento di fallback che contiene le iniziali dell'utente (es. Luca Formicola > LF).
    // creo il template del DOM da creare ad ogni ciclo
    let newPost =`
    <div class="post">
        <div class="post__header">
            <div class="post-meta">                    
                <div class="post-meta__icon">
                ${picImage(author.image, author.name)}
                </div>
                <div class="post-meta__data">
                    <div class="post-meta__author">${author.name}</div>
                    <div class="post-meta__time">${italianDate}</div>
                </div>                    
            </div>
        </div>
        <div class="post__text">${content}</div>
        <div class="post__image">
            <img src="${media}" alt="">
        </div>
        <div class="post__footer">
            <div class="likes js-likes">
                <div class="likes__cta">
                    <a class="like-button  js-like-button" href="#" data-postid="${id}">
                        <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
                        <span class="like-button__label">Mi Piace</span>
                    </a>
                </div>
                <div class="likes__counter">
                    Piace a <b id="like-counter-${id}" class="js-likes-counter">${likes}</b> persone
                </div>
            </div> 
        </div>            
    </div>
    `;
    return newPost;
}


// funzione per popolare la pic image con l'immagine o un test alternativo 
// image ---> valore dell'immagine da stampare tramite la funzione
// authorImage ---> stampa HTML dell'immagine o del valore sostitutivo
// return---> immagine/testo che popola il DOM
function picImage (image, splitName){
    // divido il nome completo in firstName e lastName
    let splitNameArray = splitName.split(' ');
    let firstName = splitNameArray[0];
    let lastName = splitNameArray[1];
    // creo le variabili che contengono la prima lettera di firstName e di lastName per popolare dinamicamente il DOM
    let firstNameLetter = firstName[0];
    let firstLastNameLetter = lastName[0];
    let authorImage;
    if(image){
        authorImage = `<img class="profile-pic" src="${image}" alt="${splitName}">`; 
    }else{
        // popolo dinamicamente lo span con le variabili ricavate prima
        authorImage = `
        <div class="profile-pic profile-pic-default">
        <span>${firstNameLetter}${firstLastNameLetter}</span>
        </div>`; 

    }
    return authorImage;
};

// Al click su un pulsante "Mi Piace" di un post, se abbiamo già cliccato dobbiamo decrementare il contatore e cambiare il colore del bottone.
// funzione per cambiare colore del bottone e counter like al click
// like---> tutti gli elementi da ciclare a cui associare l'eventListener
// counterLike---> elementi del DOM che conterranno il counter che deve aggiornarsi al click sul bottone "Mi piace"
// likeArray---> array che conterrà gli indici dei like a cui è stato messo "Mi piace"
function counterLikeButton (like, counterLike, likeArray){
    // metto in ascolto l'elemento del DOM con un ciclo forEach
    like.forEach((button, index) => {
        button.addEventListener('click', function(event){
            // blocco i comportamenti di default del browser
            event.preventDefault();
            // creo l'elemento del DOM counter da aggiornare al click
            let counter = counterLike[index];
            // valore numerico dei like messi al post
            let counterNumber = parseInt(counter.innerHTML);
            if (!this.classList.contains('like-button--liked')){
                // aggiungo la classe css che modifica il colore del testo del botton
                button.classList.add('like-button--liked');
                // incremento il valore del numero di counter di 1
                counter.innerHTML = counterNumber + 1;
                // pusho l'id del posto nell'array dei post a cui è stato messo il like
                likeArray.push(index)
                }else {
                    // rimuovo la classe css quando viene tolto il like
                    button.classList.remove('like-button--liked');
                    // riduco di 1 il numero del counter dei like al post
                    counter.innerHTML = counterNumber - 1;
                }
            });
        })
};