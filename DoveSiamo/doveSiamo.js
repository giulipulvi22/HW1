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
const KEY = 'AmChAPfiNKbB8dXXlgyw_4z1aAdYZ2A-bNrhJ5VGf5jQrty97t1zIsHcCIGMhdFG';
function onResponse(response){
    return response.json();
}
function onJson(promise){
    console.log(promise);
    const info=document.getElementById('info');
    const div = document.createElement('div');
    div.setAttribute('id', 'contatti');
    const dato1=document.createElement('div');
    const img1=document.createElement('img');
    img1.src='../immagini/posizione.png';
    const testo1=document.createElement('p');
    testo1.textContent= 'Indirizzo: '+promise.indirizzo+', '+promise.numCiv+', '+promise.prov+'.';
    div.appendChild(dato1);
    dato1.appendChild(img1);
    dato1.appendChild(testo1);

    const dato2=document.createElement('div');
    const img2=document.createElement('img');
    img2.src='../immagini/Proprietario.png';
    const testo2=document.createElement('p');
    testo2.textContent= 'Proprietario: '+promise.nome+' '+promise.cognome+'.';
    div.appendChild(dato2);
    dato2.appendChild(img2);
    dato2.appendChild(testo2);

    const dato3=document.createElement('div');
    const img3=document.createElement('img');
    img3.src='../immagini/telefono.png';
    const testo3=document.createElement('p');
    testo3.textContent= 'Telefono: '+promise.telefono+'.';
    div.appendChild(dato3);
    dato3.appendChild(img3);
    dato3.appendChild(testo3);

    const dato4=document.createElement('div');
    const img4=document.createElement('img');
    img4.src='../immagini/email.png';
    const testo4=document.createElement('p');
    testo4.textContent= 'Email: '+promise.email+'.';
    div.appendChild(dato4);
    dato4.appendChild(img4);
    dato4.appendChild(testo4);
    info.appendChild(div);
    const map = new Microsoft.Maps.Map('#map', {
        credentials: KEY,
        center: new Microsoft.Maps.Location(promise.latitudine, promise.longitudine)
    });

    //attribuisco al pushpin il centro della mappa che corrisponde alla località richiesta
    const center = map.getCenter();

    const pin = new Microsoft.Maps.Pushpin(center, {
        color: 'rgba(94, 43, 43, 0.5)',
        title: 'Polo Foto',
    })
        
    //inserisco il pushpin nella mappa
    map.entities.push(pin);
}
function GetMap() {
    fetch ('negozio.php').then(onResponse).then(onJson);
}
