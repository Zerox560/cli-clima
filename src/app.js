require("colors");
require("dotenv").config();

const Searches = require("./models/searches");
const { inquirerMenu, pause, readInput, listPlaces } = require("./helpers/inquire");

(async () => {
    let searches = new Searches();
    let option;

    do {
        option = await inquirerMenu();

        switch (option) {
            case 1:

                const place = await readInput("Ciudad:  ");

                const places = await searches.city(place);

                const placeId = await listPlaces(places);

                if (placeId === "0") continue;

                const selectedPlace = places.find(place => place.id = placeId);
                const { lat, lng, name } = selectedPlace;
                searches.addHistory(selectedPlace);

                const { temp, max, min, desc } = await searches.getWeather(lat, lng);

                console.clear();
                console.log("\nInformación de la ciudad\n");
                console.log("Ciudad: ", name);
                console.log("Lat: ", lat);
                console.log("Lng: ", lng);
                console.log("Temperatura: ", temp);
                console.log("Mínima: ", min);
                console.log("Máxima: ", max);
                console.log("Descripción: ", desc);
                break;
            case 2:
                searches.history.forEach(place => {
                    console.log(place)
                });
                break;
        }

        if (option !== 0) await pause();
    } while (option !== 0);


})();
