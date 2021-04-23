// ****** 1 -> call api ****** //
function searchModalItems (artistName, artistTitle, titleId) {
    fetch('https://musicbrainz.org/ws/2/recording/' + titleId + '?inc=genres+ratings+releases&fmt=json')
    .then(response => {
        if (response.status === 200 && response.ok){
            const resp = response.json();
            resp.then(data => {
                let AllTitleRelease =[];
                let AllIdRelease = [];
                if(data.releases.length === 0){
                    AllTitleRelease = null;
                    AllIdRelease = null;
                } else {
                    data.releases.map(rel =>{
                        AllTitleRelease.push(rel.title)
                    })
                    data.releases.map(rel =>{
                        AllIdRelease.push(rel.id)
                    })
                }
                let titleGenre = [];
                if(data.genres.length === 0){
                    titleGenre = null
                } else {
                    data.genres.map(genr =>{
                        titleGenre.push(genr.name)
                    })
                }
                let titleLength = new Date();
                titleLength.setTime(data.length);
                titleRate = data.rating.value;
                insertTextModal(artistName, artistTitle, AllTitleRelease, titleGenre, titleLength, titleRate, AllIdRelease)
            })
    } else {
        msgErrorModal.classList.add('errorMsg');
        msgErrorModal.textContent = ' Erreur lors du chargemenent des informations. Code '+response.status;
        }
    })
    .catch((err) => alert('Erreur. ('+err+') Merci de contacter l\'administrateur : admin@help.com'));
}

// ****** 2 -> insert text ****** //
function insertTextModal (artistName, artistTitle, AllTitleRelease, titleGenre, titleLength, titleRate, AllIdRelease) {
    headerModal.textContent = artistName.toUpperCase() + ' -  ' + artistTitle;
    callTitle.textContent = artistTitle;
    callArtist.textContent = artistName;
    if (AllTitleRelease === null){
        callRelease.textContent = '- Non renseigné'
    } else { AllTitleRelease.map(rel => {
        callRelease.textContent += '- '+rel;})
    }
    if (titleGenre === null){
        callGenre.textContent = '- Non renseigné'
    } else { titleGenre.map(gen => {
        callGenre.textContent += '- '+gen;})
    }
    if (titleLength === null || (titleLength.getMinutes()=== 0 && titleLength.getSeconds() === 0)){
        callLength.textContent = '- Non renseigné'
    }else {
        callLength.textContent = (((titleLength.getMinutes()<10) ? '0' : '') + titleLength.getMinutes()) + ':' +  (((titleLength.getSeconds()<10) ? '0' : '') + titleLength.getSeconds());
    }
    if(titleRate === null ){
        callRating.textContent = '(Non noté)'
        if(html.getAttribute('class')){
            starRate.setAttribute('src','../img/starsDark.png')
        } else {
            starRate.setAttribute('src','../img/starsLight.png')
        }
    }else {
        callRating.textContent = '( ' + titleRate + ' )';
        if(html.getAttribute('class')){
            starRate.setAttribute('src','../img/starsDark.png')
            let pourcentRate = (titleRate/5) * 100;
            rateContent.style.width= pourcentRate+"%";
        } else {
            starRate.setAttribute('src','../img/starsLight.png')
            let pourRate = (titleRate/5) * 100;
            rateContent.style.width= pourRate+"%";
        }
    }



    // ****** add delete modal ****** //
    let btnDeleteText = document.createTextNode('- Fermer -');
    let btnDelete = document.createElement('button');
    btnDelete.appendChild(btnDeleteText);
    btnDelete.setAttribute('id', 'btn-delete-modal');
    btnDelete.setAttribute('class', 'btn-delete-modal hover:bg-yellow-500 focus:bg-yellow-500 autofocus');
    btnDeleteContainer.appendChild(btnDelete);
    // appel de la suppression
    btnDelete.addEventListener('click', () => closeModal(btnDelete));
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' || e.key === 'Esc'){
            closeModal(btnDelete)
        }
    })
    insertCoverModale(AllIdRelease);
}


// ****** 3 -> insert covers ****** //
function insertCoverModale (AllIdRelease) {
    if (AllIdRelease === null){
        coverContent.textContent = "Images non disponibles"
    } else {
        AllIdRelease.map(el => {
            fetch('https://coverartarchive.org/release/' + el + '?fmt=json')
            .then(response => {
                if (response.status === 200 && response.ok){
                const resp = response.json();
                resp.then(data => {
                    data.images.map(el => {
                        let cover;
                        if(el.thumbnails.small === undefined){
                            cover = el.thumbnails['250']
                        } else{
                            cover = el.thumbnails.small;
                        }
                        let creaImg = document.createElement('img');
                        creaImg.setAttribute('src', cover);
                        coverContent.appendChild(creaImg);
                    })
                })
                } else {
                    msgErrorModal.classList.add('errorMsg');
                    msgErrorModal.textContent = 'Avertissement : Toutes les images n\'ont pu être affichées. (code '+response.status+')'; 
                }
            openModal();
            })
            .catch((err) => alert('Erreur : '+err+' Merci de rafraichir la page'));
        })
    }
}


// ****** 4 -> modal visible ****** //
function openModal () {
    modalContainer.style.display = null;
    body.style.overflow = 'hidden'; 
}

// ****** 4bis -> safe keybord ****** //
window.addEventListener('keydown', (e) => {
    if (modalContainer.style.display===""){
        if (e.key === 'Enter' || e.key === 'Esc' || e.key ===' ' || e.key === 'Tab'){
            e.preventDefault()};
        }
    });



// ****** 5 -> modal hidden ****** //
function closeModal (btnDelete) {
    modalContainer.style.display = 'none';
    modalTemp.style.display = 'none';
    loadingModal.style.display='none';
    headerModal.textContent = '';
    callTitle.textContent = ''; 
    callArtist.textContent = ''; 
    callRelease.textContent = '';
    callGenre.textContent = ''; 
    callLength.textContent = '';  
    callRating.textContent = '';  
    coverContent.textContent = ''; 
    msgErrorModal.textContent = '';
    btnDeleteContainer.removeChild(btnDelete);
    body.style.overflow = 'auto';
    rateContent.style.width= '0%';
}