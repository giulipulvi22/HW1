const body=document.querySelector('section');
const div=document.createElement('div');
const el = document.createElement('div');
el.classList.add('visualizzaDOT');
div.classList.add('container');
body.appendChild(el);
el.appendChild(div);
document.querySelector('body').classList.add('no-scroll');
const dot1=document.createElement('div');
dot1.classList.add('dot');
dot1.setAttribute('id', 'dot1');
div.appendChild(dot1);
const dot2=document.createElement('div');
dot2.classList.add('dot');
dot2.setAttribute('id', 'dot2');
div.appendChild(dot2);
const dot3=document.createElement('div');
dot3.classList.add('dot');
dot3.setAttribute('id', 'dot3');
div.appendChild(dot3);
setTimeout(removeLoad, 4000, el);

function removeLoad(el){
    el.remove();
    document.querySelector('body').classList.remove('no-scroll');
}
function caricaFotografi(event){
    fetch('fotografi.php').then(onResponse).then(onJsonFotografi);
}

function onJsonFotografi(json){
    console.log(json);
    const section=document.querySelector('section');
    const item=section.querySelector('button');
    item.remove();
    const newSep=document.createElement('div');
    newSep.classList.add('separatore');
    section.appendChild(newSep);

    const newTit=document.createElement('h1');
    newTit.textContent='Fotografi';
    section.appendChild(newTit);

    const article = document.createElement('article');
    section.appendChild(article);
    for(let fotografo of json.fotografi){
        const newDiv = document.createElement('div');
        newDiv.classList.add('fotografo');
        article.appendChild(newDiv);
        newDiv.dataset.CF=fotografo.CF;
        newDiv.dataset.citta=fotografo.citta;
        newDiv.dataset.cognome=fotografo.cognome;
        newDiv.dataset.dataInizio=fotografo.data_inizio;
        newDiv.dataset.dataNascita=fotografo.data_nascita;
        newDiv.dataset.fb=fotografo.facebook;
        newDiv.dataset.ig=fotografo.instagram;
        newDiv.dataset.nome=fotografo.nome;
        newDiv.dataset.sp=fotografo.playlist;
        newDiv.dataset.img=fotografo.propic;
        fetch('spotify.php?play='+fotografo.playlist).then(onResponse).then(onJsonCaricaFotografi);
    }
}
function onJsonCaricaFotografi(json){
    const playlist=json;
    const fotografi=document.querySelectorAll('.fotografo');
    for(let fotografo of fotografi){
        if(fotografo.dataset.sp===playlist.id){
            const newFoto = document.createElement('img');
            newFoto.src=fotografo.dataset.img;
            newFoto.classList.add('foto');
            fotografo.appendChild(newFoto);

            const newInfo1 = document.createElement('div');
            newInfo1.classList.add('info1');
            fotografo.appendChild(newInfo1);

            const newName = document.createElement('p');
            newName.textContent=fotografo.dataset.nome+' '+fotografo.dataset.cognome;
            newName.classList.add('nome');
            newInfo1.appendChild(newName);

            const newCitt = document.createElement('p');
            newCitt.textContent=fotografo.dataset.citta+' '+fotografo.dataset.dataNascita;
            newCitt.classList.add('txt');
            newInfo1.appendChild(newCitt);

            const newInizio = document.createElement('p');
            newInizio.textContent='scatta con noi dal '+fotografo.dataset.dataInizio;
            newInizio.classList.add('txt');
            newInfo1.appendChild(newInizio);

            const newInfoSpotify = document.createElement('div');
            newInfoSpotify.classList.add('infoSpot');
            fotografo.appendChild(newInfoSpotify);

            const newPlayName = document.createElement('p');
            newPlayName.textContent="Quando scatta ascolta '"+playlist.name+"'";
            newPlayName.classList.add('musica');
            newInfoSpotify.appendChild(newPlayName);

            const newImg = document.createElement('img');
            newImg.src=playlist.images[0].url;
            newImg.classList.add('image');
            newInfoSpotify.appendChild(newImg);

            const newInfoLink = document.createElement('div');
            newInfoLink.classList.add('infoLinks');
            fotografo.appendChild(newInfoLink);

            const newUrl1 = document.createElement('a');
            newUrl1.href=fotografo.dataset.fb;
            const butt1=document.createElement('img');
            butt1.src='../immagini/facebook.png';
            butt1.classList.add('link1');
            newUrl1.appendChild(butt1);
            newInfoLink.appendChild(newUrl1);

            const newUrl2 = document.createElement('a');
            newUrl2.href=fotografo.dataset.ig;
            const butt2=document.createElement('img');
            butt2.src='../immagini/instagram.png';
            butt2.classList.add('link2');
            newUrl2.appendChild(butt2);
            newInfoLink.appendChild(newUrl2);

            const newUrl3 = document.createElement('a');
            newUrl3.href=playlist.external_urls.spotify;
            const butt3=document.createElement('img');
            butt3.src='../immagini/spotify.png';
            butt3.classList.add('link3');
            newUrl3.appendChild(butt3);
            newInfoLink.appendChild(newUrl3);
        }
    }
}

function onResponse(response){
    return response.json();
}

const button = document.querySelector('button');
button.addEventListener('click', caricaFotografi);
