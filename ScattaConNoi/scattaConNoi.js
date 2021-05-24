const KEY = 'AmChAPfiNKbB8dXXlgyw_4z1aAdYZ2A-bNrhJ5VGf5jQrty97t1zIsHcCIGMhdFG';//API KEY bing maps

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
function GetMap(latitudine, longitudine) {
    //inizializzo la mappa
    const map = new Microsoft.Maps.Map('#map', {
        credentials: KEY,
        center: new Microsoft.Maps.Location(latitudine, longitudine)
    });

    //attribuisco al pushpin il centro della mappa che corrisponde alla località richiesta
    const center = map.getCenter();

    const pin = new Microsoft.Maps.Pushpin(center, {
        color: 'red',
        title: 'Here you are!'
    })
        
    //inserisco il pushpin nella mappa
    map.entities.push(pin);
}

function onResponse(response){
    return response.json();
}

function onJson(promise){

    const article = document.querySelector('article');
    article.innerHTML='';

    const mappa = document.createElement('div');
    mappa.setAttribute('id', 'map');
    article.appendChild(mappa);

    const lat=promise.location.latitude;
    const long=promise.location.longitude;

    const div = document.createElement('div');
    article.appendChild(div);
   
    GetMap(lat, long);
    
    const newState = promise.location.state;
    const newCountry = promise.location.country;
    const newMoonAltitude = promise.moon_altitude;
    const newMoonAzimuth = promise.moon_azimuth;
    const newMoonDistance = promise.moon_distance;
    const newMoonParallacticAngle = promise.moon_parallactic_angle;
    const newMoonRise = promise.moonrise;
    const newMoonSet = promise.moonset;
    const newSolarNoon = promise.solar_noon;
    const newSunAltitude = promise.sun_altitude;
    const newSunAzimuth = promise.sun_azimuth;
    const newSunDistance = promise.sun_distance;
    const newSunrise = promise.sunrise;
    const newSunset = promise.sunset;

    const state = document.createElement('p');
    state.textContent=('State: ' + newState);
    div.appendChild(state);

    const country = document.createElement('p');
    country.textContent=('Country: ' + newCountry);
    div.appendChild(country);

    const moonAltitude = document.createElement('p');
    moonAltitude.textContent=('Moon altitude: ' + newMoonAltitude);
    div.appendChild(moonAltitude);

    const moonAzimuth = document.createElement('p');
    moonAzimuth.textContent=('Moon azimuth: ' + newMoonAzimuth);
    div.appendChild(moonAzimuth);

    const moonDistance = document.createElement('p');
    moonDistance.textContent=('Moon distance: ' + newMoonDistance);
    div.appendChild(moonDistance);

    const moonParallacticAngle = document.createElement('p');
    moonParallacticAngle.textContent=('Moon parallactic angle: ' + newMoonParallacticAngle);
    div.appendChild(moonParallacticAngle);

    const moonRise = document.createElement('p');
    moonRise.textContent=('Moonrise: ' + newMoonRise);
    div.appendChild(moonRise);

    const moonSet = document.createElement('p');
    moonSet.textContent=('Moonset: ' + newMoonSet);
    div.appendChild(moonSet);

    const solarNoon = document.createElement('p');
    solarNoon.textContent=('Solar noon: ' + newSolarNoon);
    div.appendChild(solarNoon);

    const sunAltitude = document.createElement('p');
    sunAltitude.textContent=('Sun altitude: ' + newSunAltitude);
    div.appendChild(sunAltitude);

    const sunAzimuth = document.createElement('p');
    sunAzimuth.textContent=('Sun azimuth: ' + newSunAzimuth);
    div.appendChild(sunAzimuth);

    const sunDistance = document.createElement('p');
    sunDistance.textContent=('Sun distance: ' + newSunDistance);
    div.appendChild(sunDistance);

    const sunrise = document.createElement('p');
    sunrise.textContent=('Sunrise: ' + newSunrise);
    div.appendChild(sunrise);

    const sunset = document.createElement('p');
    sunset.textContent=('Sunset: ' + newSunset);
    div.appendChild(sunset);

}

function findPlace(event){
    event.preventDefault();
    let input1 = document.querySelector('#citta');
    let citta = input1.value;
    citta=(citta.split(' ').join(''));
    let input2 = document.querySelector('#data');
    let data = input2.value;

    fetch('IPGeolocation.php?' + 'location=' + citta + '&date=' + data).then(onResponse).then(onJson);
}
const search = document.querySelector('#submit');
search.addEventListener('click', findPlace);



//youtube
let tag = document.createElement('script');



      tag.src = "https://www.youtube.com/iframe_api";

      let firstScriptTag = document.getElementsByTagName('script')[0];

      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      let player;

      function onYouTubeIframeAPIReady() {

        player = new YT.Player('player', {

          videoId: 'kTl2dJHn9_E',

          events: {

            'onReady': onPlayerReady,

            'onStateChange': onPlayerStateChange

          }

        });

      }

      function onPlayerReady(event) {

        event.target.playVideo();

      }



      // 5. The API calls this function when the player's state changes.

      //    The function indicates that when playing a video (state=1),

      //    the player should play for six seconds and then stop.

      let done = false;

      function onPlayerStateChange(event) {

        if (event.data == YT.PlayerState.PLAYING && !done) {

          setTimeout(stopVideo, 6000);

          done = true;

        }

      }

      function stopVideo() {

        player.stopVideo();}
