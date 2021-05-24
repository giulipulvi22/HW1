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
fetch('stampe.php?t=foto').then(onResponse).then(onJson);
function onResponse(response){
    return response.json();
}
function onJson(json){
    const foto=json.foto;
    for(let f of foto){
        fetch('stampe.php?t=stampa&foto='+f.ID).then(onResponse).then(onJsonStampe);
    }
}
function onJsonStampe(promise){ 
        console.log(promise);
        const article=document.querySelector('article');
        const stampa=promise.foto[0];
        const it=document.createElement('div');
        it.classList.add('item');
        it.dataset.id=stampa.foto;
        let gmin=0;
        let gmax=0;

        if(parseInt(stampa.larghezza)<parseInt(stampa.altezza)){
            it.dataset.gmin=parseInt(stampa.larghezza);
        }
        else {it.dataset.gmin=parseInt(stampa.altezza);}
        if(parseInt(stampa.larghezza)<parseInt(stampa.altezza)){
            it.dataset.gmax=parseInt(stampa.altezza);
        }
        else {it.dataset.gmax=parseInt(stampa.larghezza);}

        it.dataset.pmin=parseFloat(stampa.prezzo);
        it.dataset.pmax=parseFloat(stampa.prezzo);
        let c=0;
        for(let stmp of promise.foto){
            if((parseInt(stmp.larghezza))<(parseInt(stmp.altezza))){
                gmin=parseInt(stmp.larghezza);
            }
            else {gmin=parseInt(stmp.altezza)};
            if(gmin<(parseInt(it.dataset.gmin))) {it.dataset.gmin=gmin;}
            if((parseInt(stmp.larghezza))<(parseInt(stmp.altezza))){
                gmax=parseInt(stmp.altezza);
            }
            else {gmax=parseInt(stmp.larghezza);}
            if(gmax>parseInt(it.dataset.gmax)) {it.dataset.gmax=gmax;}
            if(parseFloat(stmp.prezzo)<parseFloat(it.dataset.pmin)) {it.dataset.pmin=parseFloat(stmp.prezzo)}
            if(parseFloat(stmp.prezzo)>parseFloat(it.dataset.pmax)) {it.dataset.pmax=parseFloat(stmp.prezzo);}
            c++
        }
        article.appendChild(it);
        const newTitle = document.createElement('h1');
        newTitle.textContent=stampa.titolo;
        it.appendChild(newTitle);
        const newDiv = document.createElement('div');
        newDiv.style.backgroundImage = "url('"+stampa.file+"')";
        newDiv.classList.add('background');
        it.appendChild(newDiv);
        const newFoto = document.createElement('div');
        newFoto.classList.add('foto');
        it.appendChild(newFoto);
        const bottoni=document.createElement('div');
        bottoni.classList.add('interazioni');
        newFoto.appendChild(bottoni);
        const but1 = document.createElement('img');
        but1.classList.add('button1');
        but1.src='../immagini/info.png';
        but1.dataset.id=id=stampa.foto;
        but1.addEventListener('click', mostraInfo);
        bottoni.appendChild(but1);
        const but2 = document.createElement('img');
        but2.classList.add('button1');
        but2.src='../immagini/like.png';
        but2.dataset.id=id=stampa.foto;
        but2.addEventListener('click', addSalvato);
        bottoni.appendChild(but2);
        const but3 = document.createElement('img');
        but3.classList.add('button1');
        but3.src='../immagini/carrello.png';
        but3.dataset.id=id=stampa.foto;
        but3.addEventListener('click', addCarrello);
        bottoni.appendChild(but3);
}
function addCarrello(event){
    const button=event.currentTarget;
    const items=document.querySelectorAll('.item');
    for(let item of items){
        if(item.dataset.id===button.dataset.id){
            fetch('stampe.php?t=stampa&foto='+item.dataset.id).then(onResponse).then(onJsonSceltaCarrello);
        }
    }
}

function addSalvato(event){
    const button=event.currentTarget;
    const items=document.querySelectorAll('.item');
    for(let item of items){
        if(item.dataset.id===button.dataset.id){
            fetch('stampe.php?t=stampa&foto='+item.dataset.id).then(onResponse).then(onJsonScelta);
        }
    }
}

function onJsonScelta(promise){
    console.log(promise);
    const stampe=promise.foto;
    const corpo= document.querySelector('article');
    const el = document.createElement('div');
    const text = document.createElement('div');
    el.appendChild(text);
    text.classList.add('choice');
    el.classList.add('visualizza');
    document.body.classList.add('no-scroll');
    corpo.appendChild(el);

    const info=document.createElement('div');
    text.appendChild(info);
    info.setAttribute('id', 'datiStampa');
    const rece=document.createElement('div');
    text.appendChild(rece);
    rece.classList.add('dimensioni');
    const titolo=document.createElement('strong');
    titolo.textContent=stampe[0].titolo;
    info.appendChild(titolo);
    const autore=document.createElement('em');
    autore.textContent=stampe[0].nome+' '+stampe[0].cognome;
    info.appendChild(autore);
    const data=document.createElement('p');
    data.textContent=stampe[0].data_scatto;
    info.appendChild(data);

    for(let stampa of stampe){
        const blocco=document.createElement('label');
        blocco.classList.add('dim');
        rece.appendChild(blocco);
        const input=document.createElement('input');
        input.setAttribute('type', 'radio');
        input.setAttribute('name', 'dimensioni');
        input.setAttribute('id', stampa.ID);
        input.setAttribute('value', stampa.ID);
        input.addEventListener('click', scelta);
        blocco.appendChild(input);
        input.style.display='none';
        const div=document.createElement('div');
        blocco.appendChild(div);
        const misure=document.createElement('p');
        misure.textContent= stampa.altezza+'cm x '+stampa.larghezza+'cm';
        div.appendChild(misure);
        const materiale=document.createElement('p');
        materiale.textContent= stampa.materiale;
        div.appendChild(materiale);
        const prezzo=document.createElement('p');
        prezzo.textContent= stampa.prezzo+'$';
        div.appendChild(prezzo);
    }
}

function onJsonSceltaCarrello(promise){
    console.log(promise);
    const stampe=promise.foto;
    const corpo= document.querySelector('article');
    const el = document.createElement('div');
    const text = document.createElement('div');
    el.appendChild(text);
    text.classList.add('choice');
    el.classList.add('visualizza');
    document.body.classList.add('no-scroll');
    corpo.appendChild(el);

    const info=document.createElement('div');
    text.appendChild(info);
    info.setAttribute('id', 'datiStampa');
    const rece=document.createElement('div');
    text.appendChild(rece);
    rece.classList.add('dimensioni');
    const titolo=document.createElement('strong');
    titolo.textContent=stampe[0].titolo;
    info.appendChild(titolo);
    const autore=document.createElement('em');
    autore.textContent=stampe[0].nome+' '+stampe[0].cognome;
    info.appendChild(autore);
    const data=document.createElement('p');
    data.textContent=stampe[0].data_scatto;
    info.appendChild(data);

    for(let stampa of stampe){
        const blocco=document.createElement('label');
        blocco.classList.add('dim');
        rece.appendChild(blocco);
        const input=document.createElement('input');
        input.setAttribute('type', 'radio');
        input.setAttribute('name', 'dimensioni');
        input.setAttribute('id', stampa.ID);
        input.setAttribute('value', stampa.ID);
        input.addEventListener('click', sceltaCarrello);
        blocco.appendChild(input);
        input.style.display='none';
        const div=document.createElement('div');
        blocco.appendChild(div);
        const misure=document.createElement('p');
        misure.textContent= stampa.altezza+'cm x '+stampa.larghezza+'cm';
        div.appendChild(misure);
        const materiale=document.createElement('p');
        materiale.textContent= stampa.materiale;
        div.appendChild(materiale);
        const prezzo=document.createElement('p');
        prezzo.textContent= stampa.prezzo+'$';
        div.appendChild(prezzo);
    }
}

function scelta(event){
    const button=event.currentTarget;
    console.log(button.value);
    fetch('addSalvato.php?stampa='+button.value).then(onResponse).then(onJsonSalvato);
}

function sceltaCarrello(event){
    const button=event.currentTarget;
    console.log(button.value);
    fetch('addCarrello.php?stampa='+button.value).then(onResponse).then(onJsonAggiunto);
}

function onJsonAggiunto(promise){
    console.log(promise);
    const corpo= document.querySelector('.choice');
    corpo.innerHTML='';
    if(promise.type==='no'){
        corpo.style.display='flex';
        corpo.style.flexDirection='column';
        corpo.style.alignItems='center';
        corpo.style.justifyContent='space-around';
        corpo.style.textAlign='center';
        const message=document.createElement('p');
        message.textContent=promise.response;
        corpo.appendChild(message);
        const buttons=document.createElement('div');
        buttons.classList.add('interazioni');
        const registrati=document.createElement('a');
        registrati.href='../Log/registrazione.php';
        registrati.classList.add('linkLog');
        buttons.appendChild(registrati);
        registrati.innerText='Registrati';
        const login=document.createElement('a');
        login.href='../Log/login.php';
        login.classList.add('linkLog');
        login.innerText='Login';
        buttons.appendChild(login);
        corpo.appendChild(buttons);
        document.querySelector('.visualizza').addEventListener('click', nascondiFoto);
    }
    if(promise.type==='si'){
        corpo.style.display='flex';
        corpo.style.flexDirection='column';
        corpo.style.alignItems='center';
        corpo.style.justifyContent='space-around';
        corpo.style.textAlign='center';
        const message=document.createElement('p');
        message.textContent=promise.response;
        corpo.appendChild(message);
        const buttons=document.createElement('div');
        buttons.classList.add('interazioni');
        const userArea=document.createElement('a');
        userArea.href='../User Area/userArea.php';
        userArea.classList.add('linkLog');
        buttons.appendChild(userArea);
        userArea.innerText='Area Personale';
        corpo.appendChild(buttons);
        document.querySelector('.visualizza').addEventListener('click', nascondiFoto);
    }
    if(promise.type==='proprietario'){
        corpo.style.display='flex';
        corpo.style.flexDirection='column';
        corpo.style.alignItems='center';
        corpo.style.justifyContent='space-around';
        corpo.style.textAlign='center';
        const message=document.createElement('p');
        message.textContent=promise.response;
        corpo.appendChild(message);
        document.querySelector('.visualizza').addEventListener('click', nascondiFoto);
    }
}

function onJsonSalvato(promise){
    console.log(promise);
    const corpo= document.querySelector('.choice');
    corpo.innerHTML='';
    if(promise.type==='no'){
        corpo.style.display='flex';
        corpo.style.flexDirection='column';
        corpo.style.alignItems='center';
        corpo.style.justifyContent='space-around';
        corpo.style.textAlign='center';
        const message=document.createElement('p');
        message.textContent=promise.response;
        corpo.appendChild(message);
        const buttons=document.createElement('div');
        buttons.classList.add('interazioni');
        const registrati=document.createElement('a');
        registrati.href='../Log/registrazione.php';
        registrati.classList.add('linkLog');
        buttons.appendChild(registrati);
        registrati.innerText='Registrati';
        const login=document.createElement('a');
        login.href='../Log/login.php';
        login.classList.add('linkLog');
        login.innerText='Login';
        buttons.appendChild(login);
        corpo.appendChild(buttons);
        document.querySelector('.visualizza').addEventListener('click', nascondiFoto);
    }

    if(promise.type==='done'){
        corpo.style.display='flex';
        corpo.style.flexDirection='column';
        corpo.style.alignItems='center';
        corpo.style.justifyContent='space-around';
        corpo.style.textAlign='center';
        const message=document.createElement('p');
        message.textContent=promise.response;
        corpo.appendChild(message);
        document.querySelector('.visualizza').addEventListener('click', nascondiFoto);
    }

    if(promise.type==='proprietario'){
        corpo.style.display='flex';
        corpo.style.flexDirection='column';
        corpo.style.alignItems='center';
        corpo.style.justifyContent='space-around';
        corpo.style.textAlign='center';
        const message=document.createElement('p');
        message.textContent=promise.response;
        corpo.appendChild(message);
        document.querySelector('.visualizza').addEventListener('click', nascondiFoto);
    }

    if(promise.type==='si'){
        corpo.style.display='flex';
        corpo.style.flexDirection='column';
        corpo.style.alignItems='center';
        corpo.style.justifyContent='space-around';
        corpo.style.textAlign='center';
        const message=document.createElement('p');
        message.textContent=promise.response;
        corpo.appendChild(message);
        const buttons=document.createElement('div');
        buttons.classList.add('interazioni');
        const userArea=document.createElement('a');
        userArea.href='../User Area/userArea.php';
        userArea.classList.add('linkLog');
        buttons.appendChild(userArea);
        userArea.innerText='Area Personale';
        corpo.appendChild(buttons);
        document.querySelector('.visualizza').addEventListener('click', nascondiFoto);
    }
}

function mostraInfo(event){
    const button=event.currentTarget;
    const items=document.querySelectorAll('.item');
    for(let item of items){
        if(item.dataset.id===button.dataset.id){
            fetch('stampe.php?t=stampa&foto='+item.dataset.id).then(onResponse).then(onJsonInfo);
        }
    }
}

function onJsonInfo(promise){
    console.log(promise);
    const stampe=promise.foto;
    const corpo= document.querySelector('article');
    const el = document.createElement('div');
    const image=document.createElement('img');
    image.setAttribute('id', 'fullFoto');
    image.src=stampe[0].file;
    el.appendChild(image)
    const text = document.createElement('div');
    el.appendChild(text);
    text.setAttribute('id', 'container');
    el.classList.add('visualizza');
    el.setAttribute('id', 'showMore');
    document.body.classList.add('no-scroll');
    corpo.appendChild(el);

    const info=document.createElement('div');
    text.appendChild(info);
    info.setAttribute('id', 'datiStampa');
    const rece=document.createElement('div');
    text.appendChild(rece);
    rece.setAttribute('id', 'recensioni');
    const titolo=document.createElement('strong');
    titolo.textContent=stampe[0].titolo;
    info.appendChild(titolo);
    const autore=document.createElement('em');
    autore.textContent=stampe[0].nome+' '+stampe[0].cognome;
    info.appendChild(autore);
    const data=document.createElement('p');
    data.textContent=stampe[0].data_scatto;
    info.appendChild(data);
    const descrizione=document.createElement('p');
    descrizione.textContent=stampe[0].descrizione;
    info.appendChild(descrizione);
    const misure=document.createElement('p');
    misure.textContent='Dimensioni disponibili: ';
    const materiali=document.createElement('p');
    materiali.textContent='Materiali disponibili: ';
    const prezzo=stampe[0].prezzo;
    for(let stampa of stampe){
        misure.textContent=misure.textContent+' '+stampa.altezza+'cm x '+stampa.larghezza+'cm   ';
        materiali.textContent=materiali.textContent+' '+stampa.materiale+'  ';
        if(stampa.prezzo<prezzo){
            prezzo=stampa.prezzo;
        }
    }
    const valore=document.createElement('p');
    valore.textContent="A partire da: "+prezzo+'$';
    info.appendChild(misure);
    info.appendChild(materiali);
    info.appendChild(valore);
    el.addEventListener('click', nascondiFoto);
    fetch('recensioni.php?t='+stampe[0].foto).then(onResponse).then(onJsonRecensioni);
}

function nascondiFoto(event){
    const item=event.currentTarget;
    item.remove();
    document.body.classList.remove('no-scroll');
}

function onJsonRecensioni(json){
    console.log(json);
    const recensioni=json.items;
    const blocco=document.getElementById('recensioni');
    if(recensioni.length==0){
        const noRec=document.createElement('strong');
        noRec.textContent='Non sono state ancora create recensioni per questa foto.';
        noRec.style.fontSize='36px';
        blocco.appendChild(noRec);
    }
    else{
        for(let item of recensioni){
            const block=document.createElement('div');
            block.classList.add('block');
            blocco.appendChild(block);

            const dati = document.createElement('div');
            dati.classList.add('list');
            block.appendChild(dati);

            const titolo=document.createElement('p');
            titolo.textContent= item.utente;
            titolo.classList.add('descrizione');

            const materiale=document.createElement('p');
            materiale.textContent='Materiale: '+item.materiale;
            materiale.classList.add('descrizione');

            const misure=document.createElement('p');
            misure.textContent="Dimensioni: "+item.altezza + "cm x " + item.larghezza + "cm";
            misure.classList.add('descrizione');

            dati.appendChild(titolo);
            dati.appendChild(materiale);
            dati.appendChild(misure);

            const recensione = document.createElement('div');
            block.appendChild(recensione);
            const stelle=document.createElement('div');
            recensione.appendChild(stelle);
            stelle.setAttribute('id', 'ratings');
            for(let i=0; i<item.voto; i++){
                const star=document.createElement('img');
                star.src='../immagini/filledstar.png';
                stelle.appendChild(star);
            }
            const area=document.createElement('div');
            recensione.appendChild(area);
            area.classList.add('testoRec');
            area.innerText=item.testo;
        }

    }
}

function find(){
    const barra = document.getElementById('barra');
    const key=barra.value.toUpperCase();
    const item = document.getElementsByClassName('item');
    for(let it=0; it< item.length; it++){
        let nome=item[it].querySelector('h1');
        if(nome){
            let txt = nome.textContent;
            if(txt.toUpperCase().indexOf(key)>-1){
                item[it].style.display='';
            }
            else{
                item[it].style.display='none';
            }
        }
    }
}

const filtrigmin=document.querySelectorAll('#gmin p');
for(let filtro of filtrigmin){
    filtro.addEventListener('click', filtroGMin);
}
function filtroGMin(event){
    const gmin=event.currentTarget;
    const valore = parseInt(gmin.dataset.gmin);
    const items=document.querySelectorAll('.item');
    console.log(valore);
    for(let item of items){
        item.classList.remove('hidden');
        if((parseInt(item.dataset.gmax)<valore)) {
            item.classList.add('hidden');
        }
    }
}

const filtrigmax=document.querySelectorAll('#gmax p');
for(let filtro of filtrigmax){
    filtro.addEventListener('click', filtroGMax);
}
function filtroGMax(event){
    const gmax=event.currentTarget;
    const valore = parseInt(gmax.dataset.gmax);
    const items=document.querySelectorAll('.item');
    for(let item of items){
        item.classList.remove('hidden');
        if((parseInt(item.dataset.gmax)>valore)||(parseInt(item.dataset.gmin)>valore)){
            item.classList.add('hidden');
        }
    }
}

const filtripmin=document.querySelectorAll('#pmin p');
for(let filtro of filtripmin){
    filtro.addEventListener('click', filtroPMin);
}
function filtroPMin(event){
    const gmin=event.currentTarget;
    const valore = parseInt(gmin.dataset.pmin);
    const items=document.querySelectorAll('.item');
    console.log(valore);
    for(let item of items){
        item.classList.remove('hidden');
        if((parseInt(item.dataset.pmax)<valore)) {
            item.classList.add('hidden');
        }
    }
}

const filtripmax=document.querySelectorAll('#pmax p');
for(let filtro of filtripmax){
    filtro.addEventListener('click', filtroPMax);
}
function filtroPMax(event){
    const gmax=event.currentTarget;
    const valore = parseInt(gmax.dataset.pmax);
    const items=document.querySelectorAll('.item');
    for(let item of items){
        item.classList.remove('hidden');
        if((parseInt(item.dataset.pmax)>valore)||(parseInt(item.dataset.pmin)>valore)){
            item.classList.add('hidden');
        }
    }
}

