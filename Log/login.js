function checkNome(event){
    const element=event.currentTarget;
    if(formStatus[element.name] = element.value.length > 0){
        element.classList.remove('showError');
    }
    else{
        element.classList.add('showError');
    }

    checkformStatus();
}
function checkCognome(event){
    const element=event.currentTarget;
    if(formStatus[element.name] = element.value.length > 0){
        element.classList.remove('showError');
    }
    else{
        element.classList.add('showError');
    }

    checkformStatus();
}

function checkCitta(event){
    const element=event.currentTarget;
    if(formStatus[element.name] = element.value.length > 0){
        element.classList.remove('showError');
    }
    else{
        element.classList.add('showError');
    }

    checkformStatus();
}

function checkData(event){
    const element=event.currentTarget;
    const data = new Date(element.value);
    const today = new Date();
    let years = (today.getFullYear() - data.getFullYear());
    if (today.getMonth() < data.getMonth() ||        
        today.getMonth() == data.getMonth() && 
        today.getDate() < data.getDate()){ 

            years--;
    }

    if(years>=16){
        element.classList.remove('showError');
        document.getElementsByName('data')[0].parentNode.querySelector('span').textContent = "";
    }
    else{   
        element.classList.add('showError');
        document.getElementsByName('data')[0].parentNode.querySelector('span').textContent = "Devi avere almeno 16 anni per poterti registrare";
    }

    checkformStatus();
}

function onJsonEmail(json) {
    if (formStatus.email = !json.exists) {
        document.getElementsByName('email')[0].classList.remove('showError');
        document.getElementsByName('email')[0].parentNode.querySelector('span').textContent = "";
    } else {
        document.getElementsByName('email')[0].parentNode.querySelector('span').textContent = "Email già utilizzata";
        document.getElementsByName('email')[0].classList.add('showError');
    }
    checkformStatus();
}

function checkEmail(event) {
    const element=event.currentTarget;
    if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(element.value).toLowerCase())) {
        document.getElementsByName('email')[0].parentNode.querySelector('span').textContent = "Email non valida";
        document.getElementsByName('email')[0].classList.add('showError');
        formStatus.email = false;
        checkformStatus();
    } else {
        fetch("checkEmail.php?q="+encodeURIComponent(String(element.value).toLowerCase())).then(onResponse).then(onJsonEmail);
    }
}

function onJsonUsername(json) {
    if (formStatus.username = !json.exists) {
        document.getElementsByName('username')[0].classList.remove('showError');
        document.getElementsByName('username')[0].parentNode.querySelector('span').textContent = "";
    } else {
        document.getElementsByName('username')[0].parentNode.querySelector('span').textContent = "Nome utente non disponibile.";
        document.getElementsByName('username')[0].classList.add('showError');
    }
    checkformStatus();
}

function onResponse(response) {
    if (!response.ok) return null;
    return response.json();
}

function checkUsername(event) {
    const element = event.currentTarget;

    if(!/^[a-zA-Z0-9]{1,16}$/.test(element.value)) {
        element.parentNode.querySelector('span').textContent = "Sono ammesse lettere e numeri per un massimo di 16 caratteri.";
        element.classList.add('showError');
        formStatus.username = false;
        checkformStatus();
    } 
    else {
        fetch("checkUsername.php?q="+encodeURIComponent(element.value)).then(onResponse).then(onJsonUsername);
    }    
}

function checkPassword(event) {
    const element = event.currentTarget;
    if (formStatus.password = element.value.length >= 8) {
        element.classList.remove('showError');
        document.getElementsByName('password')[0].parentNode.querySelector('span').textContent = "";
    } else {
        element.classList.add('showError');
        document.getElementsByName('password')[0].parentNode.querySelector('span').textContent = "La password deve avere almeno 8 caratteri";
    }
    checkformStatus();
}

function checkConfPassword(event) {
    const element = event.currentTarget;
    if (formStatus.confPassord = element.value === document.getElementsByName('password')[0].value) {
        element.classList.remove('showError');
        document.getElementsByName('confpassword')[0].parentNode.querySelector('span').textContent = "";
    } else {
        element.classList.add('showError');
        document.getElementsByName('confpassword')[0].parentNode.querySelector('span').textContent = "Le password non coincidono.";
    }
    checkformStatus();
}


function checkformStatus(){
    Object.keys(formStatus).length !== 8 || Object.values(formStatus).includes(false);
}
const formStatus = {
    'upload': true
};
document.getElementsByName('nome')[0].addEventListener('blur', checkNome);
document.getElementsByName('cognome')[0].addEventListener('blur', checkCognome);
document.getElementsByName('data')[0].addEventListener('blur', checkData);
document.getElementsByName('citta')[0].addEventListener('blur', checkCitta);
document.getElementsByName('email')[0].addEventListener('blur', checkEmail);
document.getElementsByName('username')[0].addEventListener('blur', checkUsername);
document.getElementsByName('password')[0].addEventListener('blur', checkPassword);
document.getElementsByName('confpassword')[0].addEventListener('blur', checkConfPassword);
