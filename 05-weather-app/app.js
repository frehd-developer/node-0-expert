require('dotenv').config();
const { getInput, getMainOption, listPlaces, pause } = require('./helpers/inquirer');
const Searches = require('./models/searches');
require('colors');

// console.log(process.env);

const main = async () => {
  let option;
  const searches = new Searches();

  do {
    option = await getMainOption();
    const searches = new Searches();
    switch (option) {
      case 1:
        // show message
        const placeSearch = await getInput('City: ');
        // search places
        const places = await searches.places(placeSearch);
        // console.log(places);

        // select place
        const placeId = await listPlaces(places);
        // console.log('place selected :'.red, placeId.blue);
        // weather
        if (placeId == 0) continue;

        const place = places.find(place => place.id === placeId);

        searches.addRecord(place.name);

        const weather = await searches.weather(place.latitude, place.longitude);

        // show results 
        console.clear();
        console.log('\nInformation of the city\n');
        console.log('City'.blue, place.name);
        console.log('Latitude'.blue, place.latitude);
        console.log('Longitude'.blue, place.longitude);
        console.log('Temperature'.blue, weather.temperature);
        console.log('Minimum'.blue, weather.minimum);
        console.log('Maximum'.blue, weather.maximum);
        console.log('How is the weather?'.blue, weather.description);
      
        break;
    
      case 2:
        searches.recordCapitalize.map((place, index) => {
          console.log(`${`${index + 1}.`.blue} ${place}`);
        });
        break;
    }
    
    searches.saveDB();
    // console.log(option);
    if (option !== 0) await pause();
  } while (option !== 0);
};

main();