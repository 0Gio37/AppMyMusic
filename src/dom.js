// ****** insert requests ****** //
function displayDomArt(countResultAll, nbResult, resultCount, artistName, artistTitle, artistRelease, titleId) {

    userInstruction.textContent = '" Défiler vers le bas pour plus de résultats - Bouton \'ACTION\' pour plus de détails " ';
    displayResult.textContent = (selectSearch.value === 'all') ? countResultAll : nbResult;

    let newUl = document.createElement('ul');
    if(resultCount % 2){
        newUl.setAttribute('class', 'ul-displayed py-5');
    } else {
        newUl.setAttribute('class', 'ul-displayed bg-gray-500 text-gray-100 py-5');
    }

    let newLiCount = document.createElement('li');
    newLiCount.setAttribute('class', 'li-displayed');
    let newCount = document.createTextNode(resultCount);
    newLiCount.appendChild(newCount);
    newUl.appendChild(newLiCount);

    let newLiArt = document.createElement('li');
    newLiArt.setAttribute('class', 'li-displayed');
    let newArt = document.createTextNode(artistName);
    newLiArt.appendChild(newArt);
    newUl.appendChild(newLiArt);

    let newLiTitle = document.createElement('li');
    newLiTitle.setAttribute('class', 'li-displayed');
    let newTitlte = document.createTextNode(artistTitle);
    newLiTitle.appendChild(newTitlte);
    newUl.appendChild(newLiTitle);

    let newLiRelease = document.createElement('li');
    newLiRelease.setAttribute('class', 'li-displayed');
    let newRelease = document.createTextNode(artistRelease);
    newLiRelease.appendChild(newRelease);
    newUl.appendChild(newLiRelease);

    // ****** add button 'ACTION' more details  ****** //
    let newLiAction = document.createElement('li');
    newLiAction.setAttribute('class', 'li-displayed');
    let newAction = document.createElement('button');
    newAction.setAttribute('class', 'btn-more cursor-pointer');
    newLiAction.appendChild(newAction);
    newUl.appendChild(newLiAction);
    resultRequestBody.appendChild(newUl);

    // ****** add listener button for modal ****** //
    newAction.addEventListener("click", () => {
        modalTemp.style.display = null;
        loadingModal.style.display=null;
        searchModalItems(artistName, artistTitle, titleId)
    }) 
}