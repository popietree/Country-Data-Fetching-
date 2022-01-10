'use strict';

// Coding Challenge #2

// TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.

// PART 1
// 1. Create a function 'createImage' which receives imgPath as an input. This function returns a promise which creates a new image (use document.createElement('img')) and sets the .src attribute to the provided image path. When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise. The fulfilled value should be the image element itself. In case there is an error loading the image ('error' event), reject the promise.
// PART 2
// 2. Comsume the promise using .then and also add an error handler;
// 3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
// 4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image (HINT: Use the image element returned by the createImage promise to hide the current image. You will need a global variable for that 😉);
// 5. After the second image has loaded, pause execution for 2 seconds again;
// 6. After the 2 seconds have passed, hide the current image.

let imageContainer = document.querySelector('.images');

let img = '';
const wait = function (seconds) {
  return new Promise(function (resolve, _) {
    setTimeout(resolve, seconds * 1000);
  });
};

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    img = document.createElement('img');
    img.src = imgPath;

    // document.querySelector('.images img').src = `${imgPath}`;
    // const image = document.querySelector('.images img');
    img.addEventListener('load', function () {
      //   image.classList.add('images');
      imageContainer.append(img);
      resolve(img);
    });
    img.addEventListener('error', function () {
      reject(new Error('image not found'));
    });
  });
};
// const loadNPause = async function () {
//   try {
//     //Load img one
//     let img = await createImage('img-1.jpg');
//     console.log(img);

//     await wait(2);
//     img.style.display = 'none';

//     img = await createImage('img-2.jpg');
//     console.log(img);
//     await wait(2);
//   } catch (err) {
//     console.log(err);
//   }
// };

//loadNPause();
const arr = ['img-1.jpg', 'img-2.jpg', 'img-3.jpg'];

const loadAll = async function (imgArr) {
  try {
    const imgs = imgArr.map(async img => await createImage(img));
    const imgsEl = await Promise.all(imgs);
    console.log(imgsEl);
    imgsEl.forEach(img => img.classList.add('parallel'));
  } catch (err) {
    console.error(err);
  }
};
loadAll(arr);

// const loadAll = async function (imgArr) {
//   try {
//     const imgs = imgArr.map(async img => await createImage(img));
//     //array of promises in
//     console.log(imgs);

//     const imgsEl = await Promise.all(imgs);

//     //loop array and add parallel class
//     imgsEl.forEach(img => img.classList.add('parallel'));
//     console.log(imgsEl);
//   } catch (err) {
//     console.log(err);
//   }
// };

//create image returns a new promise, so call back in map news to be special to consume to promise
loadAll(arr);

// createImage('img-1.jpg')
//   .then(img => {
//     console.log(img);
//     return wait(2);
//   })
//   .then(() => {
//     img.style.display = 'none';
//     return createImage('img-2.jpg');
//   })
//   .then(img => {
//     return wait(2);
//   })
//   .then(() => {
//     img.style.display = 'none';
//   });

//.catch(err => console.error(`${err}`));
//createImage('img-1.jpg');

// wait(2)
//   .then(() => {
//     console.log('wait 1 seconds');
//     //here is code to excute after waited 2 secodns
//     return wait(1);
//   })
//   .then(() => {
//     console.log('wait 2 seconds');
//     //here is code to excute after waited 2 secodns
//     return wait(1);
//   });

/* 
///////////////////////////////////////
// Coding Challenge #1 
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.

Here are your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).

2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. 

Use this API to do reverse geocoding: https://geocode.xyz/api.

The AJAX call will be done to a URL with this format: 
https://geocode.xyz/52.508,13.381?geoit=json.

Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes that you recieved about the provided location. 
Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, you will get
 this error with code 403. 
 This is an error with the request. Remember, fetch() does NOT reject the promise in this case. 
 
 So create an error to reject the promise yourself, with a meaningful error message.

PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)

TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474

GOOD LUCK 😀


const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const data = {};
let currencies = {};
let language = {};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  //put in inally
  //   countriesContainer.style.opacity = 1;
};
const renderCountry = function (data, className = '') {
  const curr = Object.keys(data.currencies);
  currencies = Object.values(data.currencies[`${curr}`])[0];
  console.log(currencies);

  language = Object.values(data.languages);
  console.log(language);

  const html = `<article class="country ${className}">
      <img class="country__img" src="${data.flags.png}" />
      <div class="country__data">
        <h3 class="country__name">${data.name.common}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(
          +data.population / 1000000
        ).toFixed(1)} people</p>
        <p class="country__row"><span>🗣️</span>${language}</p>
        <p class="country__row"><span>💰</span>${currencies}</p>
      </div>
    </article>`;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  //put in finally
  countriesContainer.style.opacity = 1;
};

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    console.log(response);
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

    return response.json();
    //   err => alert(err)
  });
};

//modern AJAX easier to understand
//coruntry one
const getCountryData = function (country) {
  getJSON(`https://restcountries.com/v3.1/name/${country}`, 'Country not found')
    .then(datas => {
      let [data] = datas;
      console.log(data);
      //reder country one
      renderCountry(data);

      const neighbour = data.borders;
      if (!neighbour) throw new Error('No neighbour found!');
      console.log(neighbour);

      //country 2
      return getJSON(
        `https://restcountries.com/v3.1/alpha?codes=${neighbour}`,
        'Country not found'
      );
    })
    .then(datas => {
      console.log(datas);
      let [data] = datas;

      renderCountry(data, 'neighbour');
      const neighbour = data.borders;
      console.log(neighbour);
    })
    .catch(err => {
      console.error(`${err}✨🦚🪁`);
      renderError(`${err.message}`);
    });
  // .finally(() => (countriesContainer.style.opacity = 1));
};

const whereAmI = function (lat, lng) {
  console.log(lat, lng);
  //reverse geocoding change lat lng to lcoation
  //fetch API and promises to get data
  let country = '';
  fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
    .then(response => {
      if (!response.ok)
        throw new Error(`Max Capacity Geocoding ${response.status}`);

      return response.json();
    })
    .then(data => {
      console.log(data);
      const city = data.city;
      country = data.country;
      console.log(`You are in ${city}, ${country}. `);
      console.log(city, country);
      getCountryData(country);
    })
    .catch(err => console.log(`${err.message}`));
};

whereAmI(52.508, 13.381);
*/
