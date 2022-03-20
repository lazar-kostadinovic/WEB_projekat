import { AutobuskaStanica } from "./autobuskastanica.js";
import { Autobus } from "./autobus.js"
import { Odrediste } from "./odrediste.js";

export class Dodavanje {
    constructor() {
        this.kontejner = null;
    }
    prikaz(host) {

        var mainDiv = document.createElement("div");
        mainDiv.className = "mainDiv";
        this.kontejner = mainDiv;
        host.appendChild(this.kontejner);

        var divDodavanje = document.createElement("div");
        divDodavanje.className = "divDodavanje";
        this.kontejner.appendChild(divDodavanje);

        var divAutobuskaStanica = document.createElement("div");
        divAutobuskaStanica.className = "divAutobuskaStanicaa";
        divDodavanje.appendChild(divAutobuskaStanica);

        var divAutobus = document.createElement("div");
        divAutobus.className = "divAutobus";
        divDodavanje.appendChild(divAutobus);

        var divOdrediste = document.createElement("div");
        divOdrediste.className = "divOdrediste";
        divDodavanje.appendChild(divOdrediste);

        var divDisplay = document.createElement("div");
        divDisplay.className = "divDisplay";
        mainDiv.appendChild(divDisplay);

        var divUnosPodataka = document.createElement("div");
        divUnosPodataka.className = "divUnosPodataka";
        divDisplay.appendChild(divUnosPodataka);

        var divDisplayTermina = document.createElement("div");
        divDisplayTermina.className = "divPrikaz";
        divDisplay.appendChild(divDisplayTermina);

        let AStanica = new AutobuskaStanica();
        AStanica.crtanjeDodavanjeStanice(divAutobuskaStanica);

        let autobus = new Autobus();
        autobus.DodajAutobus(divAutobus);

        let odrediste = new Odrediste();
        odrediste.crtanjeDodavanjeOdredista(divOdrediste);

    }
}