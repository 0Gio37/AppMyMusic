// ****** if ok request fetch ****** //
function returnTrueServerApi(response){
    const resp = response.json()
    resp.then(data => {
        const array = data.recordings;
        nbResult = data.count;
        countResultAll += nbResult;
        if(nbResult === 0){
            userInstruction.textContent = '" Aucun résultat pour cette recheche ... "';
            msgSearchResult.style.display='none';
            msgEndResult.style.display='none';
            mainInput.focus();
        } else {
            msgSearchResult.style.display=null;
            array.map(el => {
                artistName = el['artist-credit'][0].name;
                artistTitle = el.title
                artistRelease = (el.releases) ? el.releases[0].title : "- Non renseigné";
                titleId= el.id;
                resultCount +=1;
                displayDomArt(countResultAll, nbResult, resultCount, artistName, artistTitle, artistRelease, titleId)})
        }
    })
}

// ****** if ko request fetch ****** //
function returnFalseServerApi(){
    userInstruction.classList.add('errorMsg');
    userInstruction.textContent = ' Erreur lors du chargemenent de la requête. Code erreur '+response.status+' : Merci de rafraichir la page et renouveller la recherche'
}

// ****** error message .catch ****** //
function msgErreur (err){
    alert(err+'Vous êtes hors-connexion ou le serveur est injoingnable. \n Si le problème persite, merci de contacter l\'administrateur : \n admin@help.com');
}

// ****** Search by : ****** // 
    // ****** Artist ****** //
function searchByArtist () {
    fetch('http://musicbrainz.org/ws/2/recording/?query=artistname:%22'+currentSearch+'%22&fmt=json&offset='+offset+'&limit='+limit)
    .then(response => {
        if (response.status === 200 && response.ok){
            returnTrueServerApi(response);
        } else {
            returnFalseServerApi();
        }
        isLoading.style.display='none';
    })
    .catch((err) => msgErreur(err));
}

    // ****** Title ****** //
function searchByTitle () {
    fetch('https://musicbrainz.org/ws/2/recording?query=%22'+currentSearch+'%22&offset='+offset+'&limit='+limit+'&fmt=json')
    .then(response => {
        if (response.status === 200 && response.ok){
            returnTrueServerApi(response);
        } else {
            returnFalseServerApi();
        }
        isLoading.style.display='none';
    })
    .catch((err) => msgErreur(err));
}

    // ****** Release ****** //
function searchByRelease () {
    fetch('http://musicbrainz.org/ws/2/recording/?query=release:%22'+currentSearch+'%22&offset='+offset+'&limit='+limit+'&fmt=json')
    .then(response => {
        if (response.status === 200 && response.ok){
            returnTrueServerApi(response);
        } else {
            returnFalseServerApi();
        }
        isLoading.style.display='none';
    })
    .catch((err) => msgErreur(err));
}

    // ****** All ****** //
function searchByAll(){
    searchByArtist();
    searchByTitle();
    searchByRelease();
}