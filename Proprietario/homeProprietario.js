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

const div3=document.getElementById('form3');
const div2=document.getElementById('form2');
const div1=document.getElementById('form1');

const articles=document.querySelectorAll('article');
for(let article of articles){
    const title=document.createElement('h5');
    const div=article.querySelector('div');
    title.textContent=article.dataset.type;
    fetch("dataManagement.php?q="+article.dataset.type).then(onResponse).then(onJsonCaricamento);
    article.insertBefore(title, div);
}

function onResponse(response){
    return response.json();
}
function onJsonCaricamento(promise){
    console.log(promise);
    if(promise.type==='fotografi'){
        const article=document.querySelectorAll("[data-type='fotografi']")[0];
        const table=document.createElement('table');
        table.setAttribute('id', 'fotografi');
        const titles=document.createElement('tr');

        const t0=document.createElement('th');
        titles.appendChild(t0);
        t0.style.width='50px';

        const t1=document.createElement('th');
        t1.textContent="Nome";
        titles.appendChild(t1);

        const t2=document.createElement('th');
        t2.textContent="Cognome";
        titles.appendChild(t2);

        const t3=document.createElement('th');
        t3.textContent="Città di nascita";
        titles.appendChild(t3);

        const t4=document.createElement('th');
        t4.textContent="Data di nascita";
        titles.appendChild(t4);

        const t5=document.createElement('th');
        t5.textContent="Codice Fiscale";
        titles.appendChild(t5);

        const t6=document.createElement('th');
        t6.textContent="Data inizio";
        titles.appendChild(t6);

        const t9=document.createElement('th');
        t9.textContent="Playlist";
        titles.appendChild(t9);

        const t10=document.createElement('th');
        t10.textContent="Profile Picture";
        titles.appendChild(t10);

        table.appendChild(titles);
        article.insertBefore(table, div1);

        for(let fotografo of promise.items){
            const row=document.createElement('tr');
            row.dataset.row=fotografo.CF;            
            row.dataset.nome=fotografo.nome;
            row.dataset.cognome=fotografo.cognome;

            const remove=document.createElement('td');
            remove.style.width='50px';
            const img=document.createElement('img');
            img.src="../immagini/delete.png";
            remove.appendChild(img);
            img.dataset.ID=fotografo.CF;
            img.addEventListener('click', deleteFotografo);
            row.appendChild(remove);

            const nome=document.createElement('td');
            nome.textContent=fotografo.nome;
            row.appendChild(nome);

            const cognome=document.createElement('td');
            cognome.textContent=fotografo.cognome;
            row.appendChild(cognome);
            
            const citta=document.createElement('td');
            citta.textContent=fotografo.citta;
            row.appendChild(citta);
            
            const data=document.createElement('td');
            data.textContent=fotografo.data_nascita;
            row.appendChild(data);
            
            const CF=document.createElement('td');
            CF.textContent=fotografo.CF;
            row.appendChild(CF);
            
            const dataIn=document.createElement('td');
            dataIn.textContent=fotografo.data_inizio;
            row.appendChild(dataIn);

            const sp=document.createElement('td');
            sp.textContent=fotografo.playlist;
            row.appendChild(sp);

            const propic=document.createElement('td');
            const im=document.createElement('img');
            im.src=fotografo.propic;
            propic.appendChild(im);
            im.classList.add('file');           
            im.style.opacity='1';
            im.style.width='150px';
            row.appendChild(propic);
            
            table.appendChild(row); 
            console.log(row);           
        }

        const add = document.createElement('img');
        add.src='../immagini/add.png';
        article.insertBefore(add, div1);
        add.classList.add("add");
        add.addEventListener('click', addFotografo);

    }

    if(promise.type==='foto'){
        const article=document.querySelectorAll("[data-type='foto']")[0];
        const table=document.createElement('table');
        table.setAttribute('id', 'foto');
        const titles=document.createElement('tr');

        const t0=document.createElement('th');
        titles.appendChild(t0);
        t0.style.width='50px';

        const t1=document.createElement('th');
        t1.textContent="Codice";
        titles.appendChild(t1);

        const t2=document.createElement('th');
        t2.textContent="Data scatto";
        titles.appendChild(t2);

        const t3=document.createElement('th');
        t3.textContent="descrizione";
        titles.appendChild(t3);

        const t4=document.createElement('th');
        t4.textContent="Fotografo";
        titles.appendChild(t4);

        const t5=document.createElement('th');
        t5.textContent="Genere";
        titles.appendChild(t5);

        const t6=document.createElement('th');
        t6.textContent="Titolo";
        titles.appendChild(t6);

        const t9=document.createElement('th');
        t9.textContent="Foto";
        titles.appendChild(t9);

        table.appendChild(titles);
        article.insertBefore(table, div2);

        for(let fot of promise.items){
            console.log(fot);
            const row=document.createElement('tr');
            row.dataset.row=fot.ID;
            row.dataset.titolo=fot.titolo;

            const remove=document.createElement('td');
            remove.style.width='50px';
            const img=document.createElement('img');
            img.src="../immagini/delete.png";
            remove.appendChild(img);
            img.dataset.ID=fot.ID;
            img.addEventListener('click', deleteFoto);
            row.appendChild(remove);

            const id=document.createElement('td');
            id.textContent=fot.ID;
            row.appendChild(id);

            const data=document.createElement('td');
            data.textContent=fot.data_scatto;
            row.appendChild(data);
            
            const desc=document.createElement('td');
            desc.textContent=fot.descrizione;
            row.appendChild(desc);
            
            const fotografo=document.createElement('td');
            fotografo.textContent=fot.fotografo;
            row.appendChild(fotografo);
            
            const genere=document.createElement('td');
            genere.textContent=fot.genere;
            row.appendChild(genere);
            
            const titolo=document.createElement('td');
            titolo.textContent=fot.titolo;
            row.appendChild(titolo);

            const foto=document.createElement('td');
            const file=document.createElement('img');
            file.src=fot.file;
            file.style.opacity='1';
            file.style.width='150px';
            foto.appendChild(file);
            file.classList.add('file');
            row.appendChild(foto);
            
            table.appendChild(row); 
            console.log(row);           
        }

        const add = document.createElement('img');
        add.src='../immagini/add.png';
        article.insertBefore(add, div2);
        add.classList.add("add");
        add.addEventListener('click', addFoto);

    }

    if(promise.type==='stampe'){
        const article=document.querySelectorAll("[data-type='stampe']")[0];
        const table=document.createElement('table');
        table.setAttribute('id', 'stampe');
        const titles=document.createElement('tr');

        const t0=document.createElement('th');
        titles.appendChild(t0);
        t0.style.width='50px';

        const t1=document.createElement('th');
        t1.textContent="Codice";
        titles.appendChild(t1);

        const t2=document.createElement('th');
        t2.textContent="Altezza";
        titles.appendChild(t2);

        const t3=document.createElement('th');
        t3.textContent="Larghezza";
        titles.appendChild(t3);

        const t4=document.createElement('th');
        t4.textContent="Materiale";
        titles.appendChild(t4);

        const t5=document.createElement('th');
        t5.textContent="Prezzo";
        titles.appendChild(t5);

        const t7=document.createElement('th');
        t7.textContent="Likes";
        titles.appendChild(t7);

        const t8=document.createElement('th');
        t8.textContent="Ordini";
        titles.appendChild(t8);

        const t6=document.createElement('th');
        t6.textContent="Foto";
        titles.appendChild(t6);

        table.appendChild(titles);
        article.insertBefore(table, div3);

        for(let i=0; i<promise.items.length; i++){
            let stampa = promise.items[i];
            const row=document.createElement('tr');
            row.dataset.rowS=stampa.ID;
            row.dataset.fotoID=stampa.foto;
            const remove=document.createElement('td');
            remove.style.width='50px';
            const img=document.createElement('img');
            img.src="../immagini/delete.png";
            remove.appendChild(img);
            img.dataset.IDS=stampa.ID;
            img.addEventListener('click', deleteStampa);
            row.appendChild(remove);

            const id=document.createElement('td');
            id.textContent=stampa.ID;
            row.appendChild(id);

            const altezza=document.createElement('td');
            altezza.textContent=stampa.altezza;
            row.appendChild(altezza);
            
            const larghezza=document.createElement('td');
            larghezza.textContent=stampa.larghezza;
            row.appendChild(larghezza);
            
            const materiale=document.createElement('td');
            materiale.textContent=stampa.materiale;
            row.appendChild(materiale);
            
            const prezzo=document.createElement('td');
            prezzo.textContent=stampa.prezzo+'$';
            row.appendChild(prezzo);

            const likes=document.createElement('td');
            likes.textContent=promise.likes[i].liked;
            row.appendChild(likes);

            const saved=document.createElement('td');
            saved.textContent=promise.ordered[i].ordered;
            row.appendChild(saved);


            
            const fotoID=document.createElement('td');
            fotoID.textContent=stampa.foto;
            row.appendChild(fotoID);

            table.appendChild(row); 
            console.log(row);           
        }

        const add = document.createElement('img');
        add.src='../immagini/add.png';
        article.insertBefore(add, div3);
        add.classList.add("add");
        add.addEventListener('click', addStampa);

    }
}
function addStampa(event){
    const button=event.currentTarget;
    button.removeEventListener('click', addStampa);

    div3.classList.remove('hidden');

    const fotoID= document.getElementById('idFoto');
    const results=document.querySelectorAll('[data-type="foto"] tr');
    const rows=[];
    for(let result of results){
        rows.push(result);
    }
    rows.shift();
    for(let rw of rows){
        const opt=document.createElement('option');
        opt.setAttribute('value', rw.dataset.row);
        const txt=document.createElement('p');
        txt.textContent=rw.dataset.titolo+ ' (ID '+rw.dataset.row+')';
        console.log(rw.dataset.titolo);
        opt.appendChild(txt);
        fotoID.appendChild(opt);
    }
    
    const invia= document.getElementById('button3');
    invia.addEventListener('click', sendStampa);
}

function addFoto(event){
    const button=event.currentTarget;
    button.removeEventListener('click', addFoto);

    div2.classList.remove('hidden');

    const fotografo= document.getElementById('cfFotografo');
    const results=document.querySelectorAll('[data-type="fotografi"] tr');
    console.log(results)
    const rows=[];
    for(let result of results){
        rows.push(result);
    }
    rows.shift();
    for(let rw of rows){
        const opt=document.createElement('option');
        opt.setAttribute('value', rw.dataset.row);
        const txt=document.createElement('p');
        txt.textContent=rw.dataset.nome+' '+rw.dataset.cognome;
        opt.appendChild(txt);
        fotografo.appendChild(opt);
    }
}

function addFotografo(event){
    const button=event.currentTarget;
    button.removeEventListener('click', addFotografo);

    div1.classList.remove('hidden');
}

function sendStampa(event){
    const button=event.currentTarget;
    const div=button.parentNode;
    const altezza=document.getElementsByName('altezza')[0];
    const larghezza=document.getElementsByName('larghezza')[0];
    const materiale=document.getElementsByName('materiale')[0];
    const prezzo=document.getElementsByName('prezzo')[0];
    const foto=document.getElementsByName('idFoto')[0];

    if((altezza.value!=0)&&(larghezza.value!=0)&&(materiale.value!=0)&&(prezzo.value!=0)&&(foto.value!=0)){
        const error=div.querySelector('#error-stampa');
        if(error){
            error.remove();
        }
        div.classList.add('hidden');
        const add=document.querySelectorAll(".add")[2];
        add.addEventListener('click', addStampa);
        fetch("dataManagement.php?q=addS&n="+encodeURIComponent(String(altezza.value))+'&c='+encodeURIComponent(String(larghezza.value))+'&ci='+encodeURIComponent(String(materiale.value))+'&dn='+encodeURIComponent(String(prezzo.value))+'&cf='+encodeURIComponent(String(foto.value))).then(onResponse).then(onJsonInsertStampa);
    }
    else{
        const txt=document.getElementById('error-stampa');
        if(txt) txt.remove();
        const error=document.createElement('p');
        error.classList.add('error');
        error.setAttribute('id', 'error-stampa');
        error.textContent='Compila correttamente tutti i campi.';
        div.appendChild(error);
    }
}

function onJsonInsertStampa(stampa){
    const table=document.getElementById('stampe');
    const row=document.createElement('tr');
    row.dataset.rowS=stampa.ID;
    row.dataset.fotoID=stampa.foto;

    const remove=document.createElement('td');
    remove.style.width='50px';
    const img=document.createElement('img');
    img.src="../immagini/delete.png";
    remove.appendChild(img);
    img.dataset.IDS=stampa.ID;
    img.addEventListener('click', deleteStampa);
    row.appendChild(remove);

    const id=document.createElement('td');
    id.textContent=stampa.ID;
    row.appendChild(id);

    const altezza=document.createElement('td');
    altezza.textContent=stampa.altezza;
    row.appendChild(altezza);
    
    const larghezza=document.createElement('td');
    larghezza.textContent=stampa.larghezza;
    row.appendChild(larghezza);
    
    const materiale=document.createElement('td');
    materiale.textContent=stampa.materiale;
    row.appendChild(materiale);
    
    const prezzo=document.createElement('td');
    prezzo.textContent=stampa.prezzo+'$';
    row.appendChild(prezzo);
    
    const fotoID=document.createElement('td');
    fotoID.textContent=stampa.foto;
    row.appendChild(fotoID);

    table.appendChild(row);
}

function deleteFotografo(event){
    fetch("dataManagement.php?q=removeFo&cf="+event.currentTarget.dataset.ID).then(onResponse).then(onJsonRemoveFotografo);
}
function deleteFoto(event){
    fetch("dataManagement.php?q=removeF&cf="+event.currentTarget.dataset.ID).then(onResponse).then(onJsonRemoveFoto);
}
function onJsonRemoveFoto(promise){
    const row=document.querySelector("[data-row='"+promise+"']");
    row.remove();
    const rows=document.querySelectorAll("[data-foto-i-d='"+promise+"']");
    for(let r of rows) r.remove();
}
function onJsonRemoveFotografo(promise){
    const row=document.querySelector("[data-row='"+promise.cf+"']");
    row.remove();

    for(let foto of promise.foto){
        const rowf=document.querySelectorAll("[data-row='"+foto.ID+"']");
        for(let r of rowf) r.remove();
    
        const rows=document.querySelectorAll("[data-foto-i-d='"+foto.ID+"']");
        for(let rs of rows) rs.remove();
    }
}
function deleteStampa(event){
    fetch("dataManagement.php?q=removeS&cf="+event.currentTarget.dataset.IDS).then(onResponse).then(onJsonRemoveStampa);
}
function onJsonRemoveStampa(promise){
    console.log(promise);
    const row=document.querySelector("[data-row-s='"+promise+"']");
    console.log(row);
    row.remove();
}
