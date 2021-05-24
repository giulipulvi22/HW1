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
function removeCarrello(event){
    const button=event.currentTarget;
    const formData=new FormData();
    formData.append('cartID', button.parentNode.parentNode.dataset.id);
    fetch("removeCart.php", {method: 'post', body: formData}).then(onResponse).then(onJsonRemCart);
    button.parentNode.parentNode.remove();
}
function onJsonAddOrder(promise){
    console.log(promise);
    const corpo= document.querySelector('section');
    const el = document.createElement('div');
    const area=document.createElement('div');
    area.classList.add('orderRequest');
    const title=document.createElement('strong');
    title.textContent="Elemento aggiunto alla lista degli ordini ✔";
    const text=document.createElement('p');
    text.textContent="Grazie per aver effettuato un ordine.";
    const nOrdine = document.createElement('p');
    nOrdine.textContent="Ordine n. " + promise.items[0].ID_ACQUISTO;
    const utente=document.createElement('p');
    utente.textContent="Verrai contattato a breve da un nostro utente per concludere l'ordine.";
    area.appendChild(title);
    area.appendChild(text);
    area.appendChild(nOrdine);
    area.appendChild(utente);

    el.classList.add('visualizza');
    
    document.body.classList.add('no-scroll');
    corpo.appendChild(el);
    el.appendChild(area);
    setTimeout(remove, 5000, el);
    if(document.querySelector('#ordini .noOrder')){
        const div=document.querySelector('#ordini .noOrder');
        const carrello=div.parentNode;
        div.remove();
        const div4=document.createElement('div');
        div4.classList.add('content');
        carrello.appendChild(div4);
        caricaOrdini(promise.items[0], div4);
    }
    else{
        const div4=document.querySelector('#ordini .content');
        caricaOrdini(promise.items[0], div4);
    }
}
function remove(el){
    el.remove();
    document.body.classList.remove('no-scroll')
}
function buy(event){
    const button=event.currentTarget;
    const formData=new FormData();
    formData.append('stampa', button.parentNode.parentNode.dataset.stampa);
    fetch("addOrder.php", {method: 'post', body: formData}).then(onResponse).then(onJsonAddOrder);
}
function onJsonRemCart(promise){
    if(promise.npref==0){
        const image="url('../immagini/venice2.jpg')";
        const text = 'Non hai ancora elementi nel carrello.';
        const div3=document.querySelector('#carrello .content');
        fillEmpty(div3, text, image);
    }
}
function fillEmpty(div, text, image){
    div.classList.add('noOrder');
    const txt=document.createElement('p');
    div.style.backgroundImage=image;
    txt.textContent=text;
    const link=document.createElement('a');
    link.textContent='Esplora';
    link.href='../Products/Products.php';
    div.appendChild(txt);
    div.appendChild(link);
}
function onJsonCarrello(promise){
    console.log(promise);
    const carrello=document.querySelector('#carrello');
    const titolo4=document.createElement('h6');
    titolo4.textContent="carrello".toUpperCase();
    carrello.appendChild(titolo4);

    const div4=document.createElement('div');
    div4.classList.add('content');
    carrello.appendChild(div4);
    if(promise.items.length>=1){
        const items=promise.items;
        for(let item of items){
            caricaCarrello(item, div4);
        }
    }
    else{
        const image="url('../immagini/venice2.jpg')";
        const text = 'Non hai ancora elementi nel carrello.';
        const div3=document.querySelector('#carrello .content');
        fillEmpty(div3, text, image);
    }
}
function onJsonAddCart(promise){
    console.log(promise);
    if(document.querySelector('#carrello .noOrder')){
        const div=document.querySelector('#carrello .noOrder');
        const carrello=div.parentNode;
        div.remove();
        const div4=document.createElement('div');
        div4.classList.add('content');
        carrello.appendChild(div4);
        caricaCarrello(promise.items[0], div4);
    }
    else{
        const div4=document.querySelector('#carrello .content');
        caricaCarrello(promise.items[0], div4);
    }
}
function caricaOrdini(item, div2){
    const block=document.createElement('div');
            block.classList.add('block');
            div2.appendChild(block);

            block.dataset.id=item.ID_ACQUISTO;
            block.dataset.name=item.titolo;
            block.dataset.altezza=item.altezza;
            block.dataset.larghezza=item.larghezza;
            block.dataset.materiale=item.materiale;
            const background=document.createElement('div');
            background.classList.add('background');
            background.style.backgroundImage="url("+item.file+")";
            block.appendChild(background);

            const dati = document.createElement('div');
            dati.classList.add('list');
            block.appendChild(dati);

            const titolo=document.createElement('p');
            titolo.textContent='Titolo: '+item.titolo;
            titolo.classList.add('descrizione');

            const materiale=document.createElement('p');
            materiale.textContent='Materiale: '+item.materiale;
            materiale.classList.add('descrizione');

            const misure=document.createElement('p');
            misure.textContent="Dimensioni: "+item.altezza + "cm x " + item.larghezza + "cm";
            misure.classList.add('descrizione');

            const prezzo=document.createElement('p');
            prezzo.textContent="Prezzo: "+item.prezzo+'$';
            prezzo.classList.add('descrizione');

            const dataOrdine=document.createElement('p');
            dataOrdine.textContent="Data ordine: "+item.dataordine;
            dataOrdine.classList.add('descrizione');

            dati.appendChild(titolo);
            dati.appendChild(materiale);
            dati.appendChild(misure);
            dati.appendChild(prezzo);
            dati.appendChild(dataOrdine);

            const rec=document.createElement('button');
            rec.addEventListener('click', addRecensione);
            const x=document.createElement('img');
            x.src="../immagini/rece.png";
            rec.appendChild(x);
            block.appendChild(rec);
}
function addRecensione(event){
    const button=event.currentTarget;
    const block=button.parentNode;
    const corpo= document.querySelector('section');
    const el = document.createElement('div');
    const area=document.createElement('div');
    area.classList.add('orderRequest');
    const title=document.createElement('strong');
    title.textContent="Scrivi una recensione per questo articolo: " + block.dataset.name +', '+ block.dataset.altezza+'cm x '+block.dataset.larghezza+'cm, ' + block.dataset.materiale +', '+'ordine numero: '+block.dataset.id;
    const stars=document.createElement('div');
    stars.setAttribute('id', 'ratings');
    for(let i =0; i<5; i++){
        const value=i+1;
        const label=document.createElement('label');
        label.setAttribute('for', 'star_'+value);
        const star=document.createElement('input');
        star.setAttribute('type', 'radio');
        star.setAttribute('name', 'rating');
        star.setAttribute('id', 'star_'+value);
        star.setAttribute('value', value);
        stars.appendChild(star);
        stars.appendChild(label);
    }
    const input = document.createElement('textarea');
    input.setAttribute('maxlength', '100');
    const submit = document.createElement('button');
    submit.addEventListener('click', function() {
        sendRecensione(block.dataset.id, submit);
    });
    submit.value="invia";
    submit.textContent='invia';
    area.appendChild(title);
    area.appendChild(stars);
    area.appendChild(input);
    area.appendChild(submit);
    document.body.classList.add('no-scroll');
    el.classList.add('visualizza');
    corpo.appendChild(el);
    el.appendChild(area);
}
function sendRecensione(id, element){
    let voto=0;
    const submit=element;
    const parent=submit.parentNode;
    const ratings=parent.querySelectorAll('#ratings input');
    for(let rate of ratings){
        if(rate.checked){
            voto=rate.value;
        }
    }
    const description=parent.querySelector('textarea').value;
    if(voto!=0 && description!=''){
        const formData=new FormData();
        formData.append('voto', voto);
        formData.append('testo', description);
        formData.append('acquisto', id);
        remove(parent.parentNode);
        fetch("addRec.php", {method: 'post', body: formData}).then(onResponse).then(onJsonAddRec);
    }
    else window.alert("Compila correttamente tutti i campi!");
}
function onJsonAddRec(promise){
    if(document.querySelector('#recensioni .noOrder')){
        const div=document.querySelector('#recensioni .noOrder');
        const carrello=div.parentNode;
        div.remove();
        const div4=document.createElement('div');
        div4.classList.add('content');
        carrello.appendChild(div4);
        caricaRecensioni(promise.items, div4);
    }
    else{
        const div4=document.querySelector('#recensioni .content');
        caricaRecensioni(promise.items, div4);
    }
}
function caricaCarrello(item, div4){
    const block=document.createElement('div');
    block.classList.add('block');
    div4.appendChild(block);

    block.dataset.id=item.ID_CARRELLO;
    block.dataset.stampa=item.stampa;
    const background=document.createElement('div');
    background.classList.add('background');
    background.style.backgroundImage="url("+item.file+")";
    block.appendChild(background);

    const dati = document.createElement('div');
    dati.classList.add('list');
    block.appendChild(dati);

    const titolo=document.createElement('p');
    titolo.textContent='Titolo: '+item.titolo;
    titolo.classList.add('descrizione');

    const materiale=document.createElement('p');
    materiale.textContent='Materiale: '+item.materiale;
    materiale.classList.add('descrizione');

    const misure=document.createElement('p');
    misure.textContent="Dimensioni: "+item.altezza + "cm x " + item.larghezza + "cm";
    misure.classList.add('descrizione');

    const prezzo=document.createElement('p');
    prezzo.textContent="Prezzo: "+item.prezzo+'$';
    prezzo.classList.add('descrizione');

    dati.appendChild(titolo);
    dati.appendChild(materiale);
    dati.appendChild(misure);
    dati.appendChild(prezzo);

    const buttons=document.createElement('div');
    block.appendChild(buttons);
    buttons.classList.add('buttons');

    const remove=document.createElement('button');
    remove.addEventListener('click', removeCarrello);
    const x=document.createElement('img');
    x.src="../immagini/emptycart.png";
    remove.appendChild(x);
    buttons.appendChild(remove);

    const add=document.createElement('button');
    add.addEventListener('click', buy);
    add.addEventListener('click', removeCarrello);
    const plus=document.createElement('img');
    plus.src="../immagini/buy.png";
    add.appendChild(plus);
    buttons.appendChild(add);
}
function addCart(event){
    const button=event.currentTarget;
    const formData=new FormData();
    formData.append('stampa', button.parentNode.parentNode.dataset.stampa);
    fetch("addCart.php", {method: 'post', body: formData}).then(onResponse).then(onJsonAddCart);
}
function onJsonRemPref(promise){
    if(promise.npref==0){
        const image="url('../immagini/venice.jpg')";
        const text = 'Non hai ancora salvato foto.';
        const div3=document.querySelector('#preferiti .content');
        fillEmpty(div3, text, image);
    }
}
function removePref(event){
    const button=event.currentTarget;
    const formData=new FormData();
    formData.append('prefid', button.parentNode.parentNode.dataset.id);
    fetch("removePref.php", {method: 'post', body: formData}).then(onResponse).then(onJsonRemPref);
    button.parentNode.parentNode.remove();
}
function caricaPreferiti(items, div){
    for(let item of items){
        const block=document.createElement('div');
        block.classList.add('block');
        div.appendChild(block);

        block.dataset.id=item.ID_PREF;
        block.dataset.stampa=item.stampa;
        const background=document.createElement('div');
        background.classList.add('background');
        background.style.backgroundImage="url("+item.file+")";
        block.appendChild(background);

        const dati = document.createElement('div');
        dati.classList.add('list');
        block.appendChild(dati);

        const titolo=document.createElement('p');
        titolo.textContent='Titolo: '+item.titolo;
        titolo.classList.add('descrizione');

        const materiale=document.createElement('p');
        materiale.textContent='Materiale: '+item.materiale;
        materiale.classList.add('descrizione');

        const misure=document.createElement('p');
        misure.textContent="Dimensioni: "+item.altezza + "cm x " + item.larghezza + "cm";
        misure.classList.add('descrizione');

        const prezzo=document.createElement('p');
        prezzo.textContent="Prezzo: "+item.prezzo+'$';
        prezzo.classList.add('descrizione');

        dati.appendChild(titolo);
        dati.appendChild(materiale);
        dati.appendChild(misure);
        dati.appendChild(prezzo);

        const buttons=document.createElement('div');
        block.appendChild(buttons);
        buttons.classList.add('buttons');

        const remove=document.createElement('button');
        remove.addEventListener('click', removePref);
        const x=document.createElement('img');
        x.src="../immagini/remove.png";
        remove.appendChild(x);
        buttons.appendChild(remove);

        const add=document.createElement('button');
        add.addEventListener('click', addCart);
        const plus=document.createElement('img');
        plus.src="../immagini/addcart.png";
        add.appendChild(plus);
        buttons.appendChild(add);
    }
}
function onJsonPreferiti(promise){
    const preferiti=document.querySelector('#preferiti');
    const titolo3=document.createElement('h6');
    titolo3.textContent="preferiti".toUpperCase();
    preferiti.appendChild(titolo3);

    const div3=document.createElement('div');
    div3.classList.add('content');
    preferiti.appendChild(div3);

    if(promise.items.length>=1){
        const items=promise.items;
        caricaPreferiti(items, div3);
    
    }
    else{
        const image="url('../immagini/venice.jpg')";
        const text = 'Non hai ancora salvato foto.';
        fillEmpty(div3, text, image);
    }
}
function onJsonOrdini(promise){
    const ordini=document.querySelector('#ordini');
    const titolo2=document.createElement('h6');
    titolo2.textContent="i tuoi ordini".toUpperCase();
    ordini.appendChild(titolo2);

    const div2=document.createElement('div');
    div2.classList.add('content');
    ordini.appendChild(div2);

    if(promise.items.length>=1){
        const items=promise.items;
        for(let item of items){
            caricaOrdini(item, div2);
        }    
    }
    else{
        const image="url('../immagini/venicce3.jpg')";
        const text = 'Non hai ancora effettuato ordini.';
        fillEmpty(div2, text, image);
    }
}
function onJsonUser(promise){
    //sezione "I TUOI DATI"
    const dati=document.querySelector('#dati');
    const titolo=document.createElement('h6');
    titolo.textContent="i tuoi dati".toUpperCase();
    dati.appendChild(titolo);

    const div=document.createElement('div');
    div.classList.add('content');
    dati.appendChild(div);
    div.setAttribute('id', 'infoUser');

    const infoNome=document.createElement('div');
    infoNome.classList.add('linea');
    const nome=document.createElement('strong');
    nome.textContent="Nome: ";
    infoNome.appendChild(nome);
    const nomeJson=document.createElement('p');
    nomeJson.textContent=promise.nome;
    infoNome.appendChild(nomeJson);
    div.appendChild(infoNome);

    const infoCognome=document.createElement('div');
    infoCognome.classList.add('linea');
    const cognome=document.createElement('strong');
    cognome.textContent="Cognome: ";
    infoCognome.appendChild(cognome);
    const cognomeJson=document.createElement('p');
    cognomeJson.textContent=promise.cognome;
    infoCognome.appendChild(cognomeJson);
    div.appendChild(infoCognome);

    const infoData=document.createElement('div');
    infoData.classList.add('linea');
    const data=document.createElement('strong');
    data.textContent="Data di nascita: ";
    infoData.appendChild(data);
    const dataJson=document.createElement('p');
    dataJson.textContent=promise.datanascita;
    infoData.appendChild(dataJson);
    div.appendChild(infoData);
    
    const infoCitta=document.createElement('div');
    infoCitta.classList.add('linea');
    const citta=document.createElement('strong');
    citta.textContent="Città di nascita: ";
    infoCitta.appendChild(citta);
    const cittaJson=document.createElement('p');
    cittaJson.textContent=promise.citta;
    infoCitta.appendChild(cittaJson);
    div.appendChild(infoCitta);
    
    const infoEmail=document.createElement('div');
    infoEmail.classList.add('linea');
    const email=document.createElement('strong');
    email.textContent="Email: ";
    infoEmail.appendChild(email);
    const emailJson=document.createElement('p');
    emailJson.textContent=promise.email;
    infoEmail.appendChild(emailJson);
    div.appendChild(infoEmail);

    const infoUsername=document.createElement('div');
    infoUsername.classList.add('linea');
    const username=document.createElement('strong');
    username.textContent="Username: ";
    infoUsername.appendChild(username);
    const usernameJson=document.createElement('p');
    usernameJson.textContent=promise.username;
    infoUsername.appendChild(usernameJson);
    div.appendChild(infoUsername);
}
function onResponse(response){
    return response.json();
}
function caricaRecensioni(items, div){
    for(let item of items){
        const block=document.createElement('div');
        block.classList.add('block');
        div.appendChild(block);

        const dati = document.createElement('div');
        dati.classList.add('list');
        block.appendChild(dati);

        const titolo=document.createElement('p');
        titolo.textContent='Titolo: '+item.titolo;
        titolo.classList.add('descrizione');

        const materiale=document.createElement('p');
        materiale.textContent='Materiale: '+item.materiale;
        materiale.classList.add('descrizione');

        const misure=document.createElement('p');
        misure.textContent="Dimensioni: "+item.altezza + "cm x " + item.larghezza + "cm";
        misure.classList.add('descrizione');

        const prezzo=document.createElement('p');
        prezzo.textContent="Prezzo: "+item.prezzo+'$';
        prezzo.classList.add('descrizione');

        dati.appendChild(titolo);
        dati.appendChild(materiale);
        dati.appendChild(misure);
        dati.appendChild(prezzo);

        const recensione = document.createElement('div');
        block.appendChild(recensione);
        const stelle=document.createElement('div');
        recensione.appendChild(stelle);
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
function onJsonRecensioni(promise){
    const preferiti=document.querySelector('#recensioni');
    const titolo3=document.createElement('h6');
    titolo3.textContent="recensioni".toUpperCase();
    preferiti.appendChild(titolo3);

    const div3=document.createElement('div');
    div3.classList.add('content');
    preferiti.appendChild(div3);

    if(promise.items.length>=1){
        const items=promise.items;
        caricaRecensioni(items, div3);
    
    }
    else{
        const image="url('../immagini/venice4.jpg')";
        const text = 'Non hai ancora effettuato recensioni.';
        fillEmpty(div3, text, image);
    }
}
fetch("recensioni.php").then(onResponse).then(onJsonRecensioni);
fetch("carrello.php").then(onResponse).then(onJsonCarrello);
fetch("ordini.php").then(onResponse).then(onJsonOrdini);
fetch("user.php").then(onResponse).then(onJsonUser);
fetch("preferiti.php").then(onResponse).then(onJsonPreferiti);