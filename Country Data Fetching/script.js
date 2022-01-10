'use strict';

// const renderError = function (msg) {
//   countriesContainer.insertAdjacentText('beforeend', msg);
//   countriesContainer.style.opacity = 1;
// };

// const getJSON = function (url, errorMsg = 'Something went wrong') {
//   return fetch(url).then(response => {
//     if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

//     return response.json();
//   });
// };

// const get3Countries = async function (c1, c2, c3) {
//   try {
//     const [data1] = await getJSON(
//       `https://restcountries.com/v3.1/name/portugal`
//     );
//     const [data2] = await getJSON(`https://restcountries.com/v3.1/name/canada`);
//     const [data3] = await getJSON(
//       `https://restcountries.com/v3.1/name/germany`
//     );
//     console.log(data1.area, data2.area, data3.area);

//     const data = await Promise.all([
//       getJSON(`https://restcountries.com/v3.1/name/portugal`),
//       getJSON(`https://restcountries.com/v3.1/name/canada`),
//       getJSON(`https://restcountries.com/v3.1/name/germany`),
//     ]);

//     // console.log(data.map(d => d[0].area));
//   } catch (err) {
//     // console.log(err);
//   }
// };
// get3Countries();

// (async function () {
//   const res = await Promise.race([
//     getJSON(`https://restcountries.com/v3.1/name/portugal`),
//     getJSON(`https://restcountries.com/v3.1/name/canada`),
//     getJSON(`https://restcountries.com/v3.1/name/germany`),
//   ]);

//   //   console.log('pp');
//   //   console.log(res);
// })();

// //set a function to resolve promise if it takes too long in slow connection
// const timeout = function (sec) {
//   return new Promise(function (_, reject) {
//     setTimeout(function () {
//       reject(new Error('request too long'));
//       //race aganist timeout
//     }, sec * 1000);
//   });
// };

// Promise.race([
//   getJSON(`https://restcountries.com/v3.1/name/portugal`),
//   timeout(5),
// ]).then(res => console.log(res));

// Promise.any([
//   Promise.resolve('sucess'),
//   Promise.resolve('another sucess'),
//   Promise.reject('reject'),
// ]).then(res => console.log(res));

// console.log('Test Start');
// setTimeout(() => console.log('0 sec timer'), 0);
// Promise.resolve('Resolved promise 1').then(res => console.log(res));
// Promise.resolve('Resolved promise 2').then(res => {
//   for (let i = 0; i < 1000000000; i++) {}

//   console.log(res);
// });
// console.log('Test End');

// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };
// const whereAmI = async function (country) {
//   try {
//     //Geolocation
//     const pos = await getPosition();

//     const { latitude: lat, longitude: lng } = pos.coords;
//     //   console.log(lat, lng);
//     //reverse GEo coding
//     const resGeo = await fetch(`https://geocode.xyz/37,111?geoit=json`);
//     // console.log(resGeo);
//     const dataGeo = await resGeo.json();
//     if (!resGeo.ok) throw new Error('problecm location data');
//     //   console.log(dataGeo);
//     //country data
//     const res = await fetch(`https://restcountries.com/v3.1/name/portugal`);
//     if (!res.ok) throw new Error('problecm location data');

//     console.log(res);
//     const data = await res.json();
//     return `you are in dataGEo`;
//   } catch (err) {
//     console.log(err);
//     throw err;
//   }
// };
// console.log('FIRST');
// //is async will run in backgrpund
// // const str = whereAmI('portugal');
// whereAmI().then(str => console.log(str));
// //will print third along with frst in beginning

// console.log('third');

// (async function () {
//   console.log('adad');
//   try {
//     const city = await whereAmI();
//     console.log(city);
//   } catch (err) {
//     console.log(err);
//   }
// })();

// console.log('getting position');
////////////////////////////////////////////////////////////////////////////////////////
// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     navigator.geolocation.getCurrentPosition(resolve, reject);

//     // navigator.geolocation.getCurrentPosition(
//     //   pos => resolve(pos),
//     //   err => reject(err)
//     // );
//   });
// };

///use this funciton to show where you are in teh world based on geolocaiton of device

// getPosition().then(pos => console.log(pos));

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

// const getJSON = function (url, errorMsg = 'Something went wrong') {
//   return fetch(url).then(response => {
//     console.log(response);
//     if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

//     return response.json();
//     //   err => alert(err)
//   });
// };

//modern AJAX easier to understand
//coruntry one
// const getCountryData = function (country) {
//   getJSON(`https://restcountries.com/v3.1/name/${country}`, 'Country not found')
//     .then(datas => {
//       let [data] = datas;
//       console.log(data);
//       //reder country one
//       renderCountry(data);

//       const neighbour = data.borders;
//       if (!neighbour) throw new Error('No neighbour found!');
//       console.log(neighbour);

//       //country 2
//       return getJSON(
//         `https://restcountries.com/v3.1/alpha?codes=${neighbour}`,
//         'Country not found'
//       );
//     })
//     .then(datas => {
//       console.log(datas);
//       let [data] = datas;

//       renderCountry(data, 'neighbour');
//       const neighbour = data.borders;
//       console.log(neighbour);
//     })
//     .catch(err => {
//       console.error(`${err}✨🦚🪁`);
//       renderError(`${err.message}`);
//     });
//   // .finally(() => (countriesContainer.style.opacity = 1));
// };
// let country = '';
// const data = {};
// let currencies = {};
// let language = {};

// const whereAmI = function (lat, lng) {
//   getPosition()
//     .then(pos => {
//       console.log(pos.coords);
//       const { latitude: lat, longitude: lng } = pos.coords;
//       console.log(lat, lng);

//       return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
//     })
//     .then(response => {
//       let country = '';
//       if (!response.ok)
//         throw new Error(`Max Capacity Geocoding ${response.status}`);

//       return response.json();
//     })
//     .then(data => {
//       console.log(data);
//       const city = data.city;
//       country = data.country;
//       console.log(`You are in ${city}, ${country}. `);
//       console.log(city, country);
//       //   getCountryData(country);
//       return fetch(`https://restcountries.com/v3.1/name/${country}`);
//     })
//     .then(response => {
//       if (!response.ok) throw new Error('error');
//       return response.json();
//     })
//     .then(datas => {
//       let [data] = datas;

//       const neighbour = data.borders;
//       if (!neighbour) throw new Error('No neighbour found!');
//       console.log(neighbour);

//       console.log(data);
//       renderCountry(data);
//     })
//     .finally(() => (countriesContainer.style.opacity = 1));
//   //.catch(err => console.log(`${err.message}`));
// };

// //btn.addEventListener('click', whereAmI);

// whereAmI(52.508, 13.381);

// const lotteryPromise = new Promise(function (resolve, reject) {
//   console.log('Lottery draw happening');
//   setTimeout(function () {
//     if (Math.random() >= 0.5) {
//       resolve('win');
//     } else {
//       reject(new Error('lost'));
//     }
//   }, 2000);
// });

// lotteryPromise
//   .then(response => console.log(response))
//   .catch(err => console.error(err));

// const wait = function (seconds) {
//   return new Promise(function (resolve, _) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };

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
//   })
//   .then(() => {
//     console.log('wait 3 seconds');
//     //here is code to excute after waited 2 secodns
//     return wait(1);
//   })
//   .then(() => {
//     console.log('wait 4 seconds');
//     //here is code to excute after waited 2 secodns
//     return wait(1);
//   });

// Promise.resolve();

// // setTimeout(() => {
// //   console.log('1 second passed');
// //   setTimeout(() => {
// //     console.log('2 seconds passed');
// //     setTimeout(() => {
// //       console.log('3 second passed');
// //       setTimeout(() => {
// //         console.log('4 second passed');
// //       }, 1000);
// //     }, 1000);
// //   }, 1000);
// // }, 1000);

// console.log('Test Start');
// setTimeout(() => console.log('0 sec timer'), 0);
// Promise.resolve('Resolved promise 1').then(res => console.log(res));
// Promise.resolve('Resolved promise 2').then(res => {
//   for (let i = 0; i < 1000000000; i++) {}

//   console.log(res);
// });
// console.log('Test End');

// const btn = document.querySelector('.btn-country');
// const countriesContainer = document.querySelector('.countries');

// ///////////////////////////////////////
// const data = {};

// const renderError = function (msg) {
//   countriesContainer.insertAdjacentText('beforeend', msg);
//   //put in inally
//   //   countriesContainer.style.opacity = 1;
// };

let currencies = {};
let language = {};
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
  //   countriesContainer.style.opacity = 1;
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

      const neighbour = '';
      if (!neighbour) throw new Error('No neighbour found!');
      console.log(neighbour);

      [neighbour] = data.borders;

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
      const [neighbour] = data.borders;
      console.log(neighbour);
    })
    .catch(err => {
      console.error(`${err}✨🦚🪁`);
      // renderError(`${err.message}`);
    })
    .finally(() => (countriesContainer.style.opacity = 1));
};

//getCountryData('germany');
// const request2 = new XMLHttpRequest();

// request2.open('GET', `https://restcountries.com/v3.1/alpha?codes=${neighbour}`);

// request2.send();

const getCountryAndNeighbour = function (country) {
  //AJAX call country one
  const request = new XMLHttpRequest();

  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);

  request.send();

  request.addEventListener('load', function () {
    //console.log(this.responseText);
    //convert string to object

    const [data] = JSON.parse(this.responseText);
    console.log(data);

    currencies = Object.keys(data.currencies)[0];

    language = Object.keys(data.languages)[0];
    console.log(language);
    //reder country one
    renderCountry(data);

    //get neighbor countries TWO
    const [neighbour] = data.borders;
    console.log(neighbour);
    if (!neighbour) return;

    const request2 = new XMLHttpRequest();

    request2.open(
      'GET',
      `https://restcountries.com/v3.1/alpha?codes=${neighbour}`
    );

    request2.send();

    request2.addEventListener('load', function () {
      const [data2] = JSON.parse(this.responseText);
      console.log(data2);
      renderCountry(data2, 'neighbour');
    });
  });
};

btn.addEventListener('click', function () {
  getCountryData('france');
  getCountryData('portugal');
  getCountryData('usa');
});

// getCountryAndNeighbour('france');

// const getCountryData = function (country) {
//   const request = new XMLHttpRequest();

//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);

//   request.send();

//   request.addEventListener('load', function () {
//     //console.log(this.responseText);
//     //convert string to object

//     const [data] = JSON.parse(this.responseText);
//     console.log(data);

//     const currencies = Object.keys(data.currencies)[0];

//     const language = Object.keys(data.languages)[0];
//     console.log(language);

//     const html = `<article class="country">
//   <img class="country__img" src="${data.flags.png}" />
//   <div class="country__data">
//     <h3 class="country__name">${data.name.common}</h3>
//     <h4 class="country__region">${data.region}</h4>
//     <p class="country__row"><span>👫</span>${(
//       +data.population / 1000000
//     ).toFixed(1)} people</p>
//     <p class="country__row"><span>🗣️</span>${data.languages[`${language}`]}</p>
//     <p class="country__row"><span>💰</span>${currencies}</p>
//   </div>
// </article>`;
//     countriesContainer.insertAdjacentHTML('beforeend', html);
//     countriesContainer.style.opacity = 1;
//   });
// };
