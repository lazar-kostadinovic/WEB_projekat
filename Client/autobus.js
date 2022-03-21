import { Voznja } from "./voznja.js";
import { Odrediste } from "./odrediste.js";
import { AutobuskaStanica } from "./autobuskastanica.js";

export class Autobus {
    constructor(id, registracija,marka,model,brojSedista) {
       this.id=id;
       this.registracija=registracija;
       this.marka=marka;
       this.model=model;
       this.brojSedista=brojSedista;
       this.kontejner = null;

    }
     
    DodajAutobus(divAutobus) {
        var naslov = document.createElement("h2");
        naslov.innerHTML = "Kreiranje autobusa";
        divAutobus.appendChild(naslov);

        var noviRed = document.createElement("br");
        divAutobus.appendChild(noviRed);

        var labReg = document.createElement("label");
        labReg.innerHTML = "Unesite registraciju autobusa:";
        divAutobus.appendChild(labReg);

        noviRed = document.createElement("br");
        divAutobus.appendChild(noviRed);

        var input = document.createElement("input");
        input.className = "regAutobusa";
        input.type = "text";
        divAutobus.appendChild(input);

        noviRed = document.createElement("br");
        divAutobus.appendChild(noviRed);

        var labMarka = document.createElement("label");
        labMarka.innerHTML = "Unesite marku autobusa:";
        divAutobus.appendChild(labMarka);

        noviRed = document.createElement("br");
        divAutobus.appendChild(noviRed);

        var input = document.createElement("input");
        input.className = "markaAutobus";
        input.type = "text";
        divAutobus.appendChild(input);

        noviRed = document.createElement("br");
        divAutobus.appendChild(noviRed);

        var labModel = document.createElement("label");
        labModel.innerHTML = "Unesite model autobusa:";
        divAutobus.appendChild(labModel);

        noviRed = document.createElement("br");
        divAutobus.appendChild(noviRed);

        var input = document.createElement("input");
        input.className = "modelAutobus";
        input.type = "text";
        divAutobus.appendChild(input);

        noviRed = document.createElement("br");
        divAutobus.appendChild(noviRed);

        var labSedista = document.createElement("label");
        labSedista.innerHTML = "Unesite broj sedista:";
        divAutobus.appendChild(labSedista);

        noviRed = document.createElement("br");
        divAutobus.appendChild(noviRed);

        input = document.createElement("input");
        input.className = "brojSedista";
        input.type = "number";
        divAutobus.appendChild(input);

        noviRed = document.createElement("br");
        divAutobus.appendChild(noviRed);

        var labSelect = document.createElement("label");
        labSelect.innerHTML = "Izaberite autobusku stanicu:";
        divAutobus.appendChild(labSelect);

        noviRed = document.createElement("br");
        divAutobus.appendChild(noviRed);

        var izaberiStanicu = document.createElement("select");
        izaberiStanicu.name = "sel";
        izaberiStanicu.required = true;
        divAutobus.appendChild(izaberiStanicu);

        fetch("https://localhost:5001/Autobuskastanica/PreuzimanjeStanice", {

            method: "GET"
        }).then(p => p.json().then(data => {
            data.forEach(autobuskastanica => {
                var opcija = document.createElement("option");
                opcija.value = autobuskastanica.id;
                opcija.innerHTML = autobuskastanica.naziv + " " + autobuskastanica.lokacija;
                izaberiStanicu.appendChild(opcija);

            });
        }));

        noviRed = document.createElement("br");
        divAutobus.appendChild(noviRed);
        noviRed = document.createElement("br");
        divAutobus.appendChild(noviRed);
        var dugme = document.createElement("button");
        dugme.innerHTML = "Dodaj autobus";
        dugme.className = "dodajAutobus";
        divAutobus.appendChild(dugme);

        dugme.onclick = (ev) => {
            var registracija = divAutobus.querySelector(".regAutobusa").value;
            var marka = divAutobus.querySelector(".markaAutobus").value;
            var model = divAutobus.querySelector(".modelAutobus").value;
            var brojSedista = divAutobus.querySelector(".brojSedista").value;
            var idStanice = divAutobus.querySelector('select[name="sel"]').value;

          

            if ((registracija == "")||(marka=="")||(model=="")||(brojSedista==""))
                alert("Neophodno je popuniti sva polja!");
            else
                fetch("https://localhost:5001/Autobus/DodajAutobus/" + idStanice, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        "Registacija": registracija,
                        "Marka": marka,
                        "Model": model,
                        "brojSedista": brojSedista,
                       
                    })
                   
                        
                        
                }).then(p => {
                    if (p.ok) {
     
                        alert("Uspesno ste dodali autobus");
                    } else {
                        alert("Broj sedista mora biti u opsegu od 20 do 200!");
                    }
                });
        }
        
    }
    prikaz(divStanica) { 
        let divPrikazAutobusa = document.createElement("div");
        divPrikazAutobusa.className = "divPrikazAutobusa";
        divStanica.appendChild(divPrikazAutobusa);
        this.kontejner = divPrikazAutobusa;

        let divNaslov = document.createElement("div");
        divNaslov.className = "divNaslov";
        divPrikazAutobusa.appendChild(divNaslov);

        let labStanica = document.createElement("h5");
        labStanica.className = "labStanica";
        labStanica.innerHTML = "Autobus: " + this.model+" "+this.brojSedista;
       

        divNaslov.appendChild(labStanica);

        let divVoznja = document.createElement("div");
        divVoznja.className = "divVoznja";
        divPrikazAutobusa.appendChild(divVoznja);

        let dugmeObrisi = document.createElement("button");
        dugmeObrisi.className = "dugmeObrisi";
        dugmeObrisi.innerHTML = "obriši";
        divNaslov.appendChild(dugmeObrisi);
        dugmeObrisi.onclick = (ev) => {
            this.BrisanjeAutobusa(ev);
        }

        fetch("https://localhost:5001/Voznja/PreuzmiVoznju/" + this.id, {

            method: "GET"
        }).then(p => p.json().then(data => {
            data.forEach(elem => {
                let voznja = new Voznja(elem.id, elem.idAutobus, elem.idOdredista, elem.vreme, elem.ocekivanaDuzinaPuta, elem.dolazniOdlazni ,elem.brojPresedanja);
             // console.log(voznja);

                fetch("https://localhost:5001/Odrediste/PreuzmiOdredisteSaId/" + voznja.odrediste, {
                    method: "GET"
                }).then(p => p.json().then(data => {
                    let odrediste = new Odrediste(data.id,data.grad, data.zemljaOdrediste, data.nazivStanice);
                    odrediste.iscrtavanjePodatakaOOdredistu(divVoznja, voznja.id, voznja.vreme,voznja.DolazniOdlazni,voznja.ocekivanaDuzinaPuta,voznja.brojPresedanja);
                }));

            })
        }));

    }

    BrisanjeAutobusa(ev) {
        fetch("https://localhost:5001/Autobus/ObrisiAutobus/" + this.id, {
            method: "DELETE"
        }).then(p => {
            if (p.ok) {
                (this.kontejner).style.display = "none";
                if ((this.kontejner.parentNode.parentNode.parentNode.querySelector(".autobus" + this.id).style.display) != null) {
                    (this.kontejner.parentNode.parentNode.parentNode.querySelector(".autobus" + this.id)).style.display = "none";

                } else {
                    alert("Doslo je do greske!");
                }
            }
        });
    }
}
