const path = require("path");
const fs = require("fs");
const axios = require("axios");

class Searches {
    history = [];
    dbPath = path.join(process.cwd(), "/src/db/history.json");

    get mapboxParams() {
        return {
            "access_token": process.env.MAPBOX_KEY,
            "limit": 5,
            "language": "es"
        }
    }

    get openweatherParams() {
        return {
            appid: process.env.OPENWEATHER_KEY,
            units: "metric",
            lang: "es"
        }
    }

    constructor() {
        this.readDb();
    }

    async city(place = "") {

        try {

            const instance = axios.default.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
                params: this.mapboxParams
            });

            const { data } = await instance.get();

            return data.features.map(place => ({
                id: place.id,
                name: place.place_name,
                lng: place.center[0],
                lat: place.center[1]
            }));
        } catch (err) {
            throw err;
        }
    }

    async getWeather(lat, lon) {
        try {
            const instance = axios.default.create({
                baseURL: "https://api.openweathermap.org/data/2.5/weather",
                params: { ...this.openweatherParams, lat, lon }
            });

            const { data } = await instance.get();

            return {
                temp: data.main.temp,
                max: data.main.temp_max,
                min: data.main.temp_min,
                desc: data.weather[0].description
            }
        } catch (err) {
            throw err;
        }
    }

    async addHistory(place = "") {
        if (this.history.includes(place.name.toLocaleLowerCase())) {
            return;
        }

        if (place) this.history.unshift(place.name.toLocaleLowerCase());

        this.saveDb();
    }

    saveDb() {
        fs.writeFileSync(this.dbPath, JSON.stringify({ history: this.history }));
    }

    readDb() {
        if (!fs.existsSync(this.dbPath)) return;

        const data = fs.readFileSync(this.dbPath, { encoding: "utf-8" });

        let { history } = JSON.parse(data);

        this.history = history;
    }
};

module.exports = Searches;
