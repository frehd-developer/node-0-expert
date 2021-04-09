const fs = require('fs');
const axios = require("axios");
const { worker } = require('cluster');

class Searches {
  record = [
    'Ayacucho, Ayachucho, Peru',
    'Cusco, Cusco, Peru',
    'Ica, Ica, Peru'
  ];

  dbPath = './db/database.json';

  constructor() {
    this.readDB();
  }

  get recordCapitalize() {
    return this.record.map(r => {
      let words = r.split(' ');
      words = words.map(word => `${word[0].toUpperCase()}${word.substring(1)}`);
      return words.join(' ');
    });
  }

  get paramsMapbox() {
    return {
      'access_token': process.env.MAPBOX_KEY,
      'limit': 5,
      'language': 'es'
    };
  }

  get paramsWeather() {
    return {
      appid: process.env.OPENWEATHER_KEY,
      units: 'metric',
      lang: 'es'
    }
  }

  async places(place = '') {
    // console.log(place);

    const _axios = axios.create({
      baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
      params: this.paramsMapbox
    });

    try {
      const results = await _axios.get();
      // console.log(results.data);
      return results.data.features.map(place => ({
        id: place.id,
        name: place.place_name_es,
        latitude: place.center[0],
        longitude: place.center[1],
      }));
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async weather(lat, lon) {
    const _axios = axios.create({
      baseURL: 'https://api.openweathermap.org/data/2.5/weather',
      params: { ...this.paramsWeather, lat, lon}
    });

    try {
      const result = await _axios.get();
      // console.log('axios'.red, result.data.weather[0].description);
      const {weather, main} = result.data;
      return {
        description: weather[0].description,
        maximum: main.temp_max,
        minimum: main.temp_min,
        temperature: main.temp,
      }
      
    } catch (error) {
      console.log('On error ocurred'.red, error)
    }
  }

  addRecord(placeDesc = '') {
    // console.log('place'.red, placeDesc);
    if (!this.record.includes(placeDesc.toLocaleLowerCase())) {
      this.record = this.record.splice(0, 5);
      this.record.unshift(placeDesc.toLocaleLowerCase());
      // console.log('Record'.red, this.record);
    }
  }

  saveDB() {
    const payload = {
      record: this.record
    };

    fs.writeFileSync(this.dbPath, JSON.stringify(payload));
  }

  readDB() {
    if (fs.existsSync(this.dbPath)) {
      const data = JSON.parse(fs.readFileSync(this.dbPath, {encoding: 'utf-8'}));
      this.record = data.record;

      // console.log('Read DB'.green, this.record);
    }
  }
}

module.exports = Searches;