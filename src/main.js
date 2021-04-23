// ****** variables -> globlal ****** //
let html = document.querySelector('html');
let body = document.querySelector('body');
let darkTheme = document.querySelector('#dark-theme');
let darkThemeContainer = document.querySelector('#dark-theme-container');
let arrowReturnUp = document.querySelector('#arrow-return-up');

// ****** variables -> form ****** //
let submitBtn = document.querySelector('#submit-btn');
let selectSearch = document.querySelector('#select-search');
let mainInput = document.querySelector('#main-input');
let userInstruction = document.querySelector('#user-instruction');

// ****** variables -> request ****** //
let resultRequestHeader = document.querySelector('#result-request-header');
let resultRequestBody = document.querySelector('#result-request-body');
let displayResult = document.querySelector('#nb-result');
let msgEndResult = document.querySelector('#msg-end-result');
let msgNoneResult = document.querySelector('#msg-none-result');
let isLoading = document.querySelector('#is-loading');
let loadingModal = document.querySelector('#loadingModal');
let msgSearchResult = document.querySelector('#msg-search-result');
let currentSearch;
let artistName;
let artistTitle;
let artistRelease;
let releaseId;
let titleId;
let resultCount; 
let nbResult;
let countResultAll;
let limit = 50;
let offset = 0;
displayResult.textContent =' 0';

// ****** variables -> modal ****** //
let modalContainer = document.querySelector('#modal-container');
let modalTemp = document.querySelector('#modal-temp');
let modalBox = document.querySelector('#modal-box');
let headerModal = document.querySelector('#header-modal');
let callTitle = document.querySelector('#call-title');
let callArtist = document.querySelector('#call-artist');
let callRelease = document.querySelector('#call-release');
let callGenre = document.querySelector('#call-genre');
let callLength = document.querySelector('#call-length');
let callRating = document.querySelector('#call-rating');
let coverContent = document.querySelector('#cover-content');
let msgErrorModal = document.querySelector('#msg-error-modal');
let btnDeleteContainer = document.querySelector('#btn-delete-container');
let rateContainer = document.querySelector('#rate-container');
let rateContent = document.querySelector('#rate-content');
let starRate = document.querySelector('#star-rate');


// ****** Function -> listener main input ****** //
submitBtn.addEventListener('click', function (e) {
    e.preventDefault();
    resultRequestBody.innerHTML = '';
    msgEndResult.innerHTML = '';
    offset = 0;
    resultCount = 0;
    countResultAll = 0;
    currentSearch = mainInput.value;
    msgEndResult.style.display='none';
    currentSelection = selectSearch.value;
    if(selectSearch.value != 'default' && mainInput.value != false){
        isLoading.style.display=null;
    }
    mainSearching(currentSelection)
})


// ****** function -> selected request ****** //
function mainSearching (currentSelection) {
    let regex = /^<|>$/.test(mainInput.value);
    if (regex){
        alert("Caractères non valides")
        isLoading.style.display='none';
        mainInput.focus();
    }
    else if(!mainInput.value || currentSelection ==='default'){
        alert('Merci de renseigner le champs principal \n puis sélectionner le type de sélection')
        mainInput.focus();
    }else {
        switch (currentSelection){
            case 'artist':
                searchByArtist(); 
                break;
            case 'title':
                searchByTitle();
                break;
            case 'release':
                searchByRelease();
                break;
            case 'all':
                searchByAll();
            break;
        }
    }
}


// ****** function more results ****** //
window.addEventListener('scroll', () => {
    let position = Math.max(document.documentElement.scrollTop,document.body.scrollTop);
    if(((position + document.documentElement.clientHeight) >= document.documentElement.scrollHeight) && nbResult>0){
        if(resultCount < nbResult){
            isLoading.style.display=null;
            offset+= 50;
            mainSearching(currentSelection) 
        } else {
            msgEndResult.style.display=null;
            msgEndResult.textContent = "Tous les résultats sont affichés !"
            userInstruction.textContent = "Lancer une nouvelle recherche ?"
            mainInput.value ='';
            selectSearch.value = 'default';
        }
    }
    if(window.scrollY <= '500'){
        arrowReturnUp.setAttribute('class', 'transition-opacity duration-1000 opacity-0')
    }
    if(window.scrollY > '1000'){
        arrowReturnUp.setAttribute('class', 'transition-opacity duration-1000 opacity-70')
    }
})

// ****** function focus after return top ****** //
arrowReturnUp.addEventListener('click', ()=>{mainInput.focus()})


// ****** function dark theme ****** //
darkThemeContainer.addEventListener('click', () =>{
    if(!html.getAttribute('class')){
        html.setAttribute('class', 'dark')
        darkThemeContainer.setAttribute('class','dark-theme-container')
        darkTheme.setAttribute('class', 'dark-theme-content')
        darkTheme.textContent="Ligth"
    } else {
        html.removeAttribute('class')
        darkThemeContainer.setAttribute('class','ligth-theme-container')
        darkTheme.setAttribute('class', 'ligth-theme-content')
        darkTheme.textContent="Dark";
    }
})