import { AutobuskaStanica } from "./AutobuskaStanica.js";


export class PregledStanica {
    constructor() {
        this.kontejner = null;
    }
    prikaz(host) {
       
        fetch("https://localhost:5001/AutobuskaStanica/PreuzimanjeStanice", {

            method: "GET"
        }).then(p => 
            p.json().then(data => {
            data.forEach(elem => {

                this.kontejner = divDisplay;
                var divDisplay = document.createElement("div");
                divDisplay.className = "divDisplay";
                host.appendChild(divDisplay);


                var divUnosPodataka = document.createElement("div");
                divUnosPodataka.className = "divUnosPodataka";
                divDisplay.appendChild(divUnosPodataka);


                var divDisplayTermina = document.createElement("div");
                divDisplayTermina.className = "divPrikaz";
                divDisplay.appendChild(divDisplayTermina);


                let as = new AutobuskaStanica(elem.id,elem.naziv,elem.lokacija);
                let divAutobuskaStanica = document.createElement("div");
                divAutobuskaStanica.className = "divAutobuskaStanica";
                divDisplay.appendChild(divAutobuskaStanica);


                as.crtanjeAutobuskeStanice(divAutobuskaStanica,as.id);
                as.crtanjeDodavanjeAutobusaAutobuskojStanici(divUnosPodataka);


            });
        }));
    }
}