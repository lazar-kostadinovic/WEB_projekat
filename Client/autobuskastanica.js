import { Autobus } from "./autobus.js";

export class AutobuskaStanica {
    constructor(id, naziv, lokacija) {
        this.id = id;
        this.naziv = naziv;
        this.lokacija = lokacija;
        this.autobusi = new Array();
        this.kontejner = null;
        this.formaKontejner = null; 
    }

    

    crtanjeDodavanjeStanice(divAutobuska) {
        var h3 = document.createElement("h2");
        h3.innerHTML = "Kreiranje autobuske stanice";
        divAutobuska.appendChild(h3);

        var newLine = document.createElement("br");
        divAutobuska.appendChild(newLine);

        var labNaziv = document.createElement("label");
        labNaziv.innerHTML = "Unesite naziv autobuske stanice:";
        divAutobuska.appendChild(labNaziv);

        newLine = document.createElement("br");
        divAutobuska.appendChild(newLine);

        var input = document.createElement("input");
        input.className = "nazivAutobuske";
        input.type = "text";
        divAutobuska.appendChild(input);

        newLine = document.createElement("br");
        divAutobuska.appendChild(newLine);

        var lok = document.createElement("label");
        lok.innerHTML = "Unesite lokaciju autobuske stanice:";
        divAutobuska.appendChild(lok);

        newLine = document.createElement("br");
        divAutobuska.appendChild(newLine);

        input = document.createElement("input");
        input.className = "lokacijaAutobuske";
        input.type = "text";
        divAutobuska.appendChild(input);

        newLine = document.createElement("br");
        divAutobuska.appendChild(newLine);

        var dugme = document.createElement("button");
        dugme.innerHTML = "Dodaj stanicu";
        dugme.className = "dodavanjeAutobuske";
        divAutobuska.appendChild(dugme);

        dugme.onclick = (ev) => {
            var naziv = divAutobuska.querySelector(".nazivAutobuske").value;
            var lokacija = divAutobuska.querySelector(".lokacijaAutobuske").value;

            if ((naziv != "") && (lokacija != "")) {
                fetch("https://localhost:5001/AutobuskaStanica/DodajAutobuskuStanicu", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        "Naziv": naziv,
                        "Lokacija": lokacija
                    })
                }).then(p => {
                    if (p.ok) {
                        fetch("https://localhost:5001/AutobuskaStanica/PreuzimanjeStanice", {

                            method: "GET"
                        }).then(p => p.json().then(data => {
                            var opcija1 = document.createElement("option");
                            opcija1.value = data[data.length - 1].id;
                            opcija1.innerHTML = data[data.length - 1].naziv + " " + data[data.length - 1].lokacija;
                            var selectAS = document.querySelector('select[name="sel"]'); //////////////////////////////////////
                            selectAS.appendChild(opcija1);

                        }));
                        alert("Uspesno dodata autobuska stanica!");
                    } else {
                        alert("Nepravilno uneti podaci");
                    }
                })
            } else alert("Nepravilno uneti podaci");
        }
    }
    
    crtanjeDodavanjeAutobusaAutobuskojStanici(divUnosPodataka) {
        var divDodavanjeAutobusa=document.createElement("div")
        divDodavanjeAutobusa.className="divDodavanjeAutobusa";
        divUnosPodataka.appendChild(divDodavanjeAutobusa);

        var divDodavanjeNoveVoznjeAutobusa=document.createElement("div");
        divDodavanjeNoveVoznjeAutobusa.className="divDodavanjeNoveVoznjeAutobusa";
        divUnosPodataka.appendChild(divDodavanjeNoveVoznjeAutobusa);

        var h3 = document.createElement("h3");
        h3.innerHTML = "Dodavanje autobusa";
        divDodavanjeAutobusa.appendChild(h3);
        this.formaKontejner = divUnosPodataka;;

        var newLine = document.createElement("br");

        var labReg = document.createElement("label");
        labReg.innerHTML = "Unesite registraciju autobusa:";
        divDodavanjeAutobusa.appendChild(labReg);

        var input = document.createElement("input");
        input.className = "registracijaAutobusa";
        input.type = "text";
        divDodavanjeAutobusa.appendChild(input);

        var newLine = document.createElement("br");

        var labMarka = document.createElement("label");
        labMarka.innerHTML = "Unesite marku autobusa:";
        divDodavanjeAutobusa.appendChild(labMarka);

        var input = document.createElement("input");
        input.className = "markaAutobusa";
        input.type = "text";
        divDodavanjeAutobusa.appendChild(input);

        var newLine = document.createElement("br");

        var labModel = document.createElement("label");
        labModel.innerHTML = "Unesite model autobusa:";
        divDodavanjeAutobusa.appendChild(labModel);

        var input = document.createElement("input");
        input.className = "modelAutobusa";
        input.type = "text";
        divDodavanjeAutobusa.appendChild(input);

        var labSedista = document.createElement("label");
        labSedista.innerHTML = "Unesite broj sedista:";
        divDodavanjeAutobusa.appendChild(labSedista);

        input = document.createElement("input");
        input.className = "brojSedista";
        input.type = "number";
        divDodavanjeAutobusa.appendChild(input);

        newLine = document.createElement("br");
        divDodavanjeAutobusa.appendChild(newLine);

        var dugme = document.createElement("button");
        dugme.innerHTML = "Dodaj autobus";
        dugme.className = "dodajautobus";
        divDodavanjeAutobusa.appendChild(dugme);

        newLine = document.createElement("br");
        divDodavanjeAutobusa.appendChild(newLine);

        var dugmeUcitajAutobuse = document.createElement("button");
        dugmeUcitajAutobuse.className = "dugmeUcitajAutobuse";
        dugmeUcitajAutobuse.innerHTML = "Dodavanje nove voznje autobusu";
        divDodavanjeNoveVoznjeAutobusa.appendChild(dugmeUcitajAutobuse);

        var divPrikazAutobusaZaRezervisanje = document.createElement("div");
        divPrikazAutobusaZaRezervisanje.className = "divPrikazAutobusaZaRezervisanje";
        divDodavanjeNoveVoznjeAutobusa.appendChild(divPrikazAutobusaZaRezervisanje);

        dugme.onclick = (ev) => {
            var registracijaAutobusa= divDodavanjeAutobusa.querySelector(".registracijaAutobusa").value;
            var markaAutobusa = divDodavanjeAutobusa.querySelector(".markaAutobusa").value;
            var modelAutobusa = divDodavanjeAutobusa.querySelector(".modelAutobusa").value;
            var brojSedista = divDodavanjeAutobusa.querySelector(".brojSedista").value;
            var idAs = this.id;
     if ((registracijaAutobusa !="")&&(markaAutobusa != "") &&(modelAutobusa != "") && (brojSedista != "")) {
        fetch("https://localhost:5001/Autobus/DodajAutobus/" + idAs,  {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "Registacija": registracijaAutobusa,
                "Marka": markaAutobusa,
                "Model": modelAutobusa,
                "brojSedista":brojSedista,
            })
        }).then(p => {
            if (p.ok) {

                fetch("https://localhost:5001/Autobus/PreuzimanjePoslednjegAutobusaIzStanice/ " + this.id, {
                    method: "GET"
                }).then(p => p.json().then(data => {

                    let autobus = new Autobus(data.id, data.Registracija,data.Marka,data.Model, data.brojSedista);
                    autobus.prikaz(this.kontejner);
                    this.autobusi.push(autobus);
                }));
                let dugmeUcitajAutobuse = this.formaKontejner.querySelector(".dugmeUcitajAutobuse");
                this.pravljenjeTermina(divPrikazAutobusaZaRezervisanje, dugmeUcitajAutobuse); 

                dugmeUcitajAutobuse.disabled = false;
            } else {
                alert("Broj sedista mora biti u opsegu od 20 do 200!");
            }
        });
    } else alert("Neophodno je uneti sve ispravne podatke!");
}

this.pravljenjeTermina(divPrikazAutobusaZaRezervisanje, dugmeUcitajAutobuse);

}
    crtanjeDodavanjeOdredistaUnutarStanice(divOdrediste) {
        var h3 = document.createElement("h3");
        h3.innerHTML = "Dodavanje novog odredista";
        divOdrediste.appendChild(h3);

        var newLine = document.createElement("br");
        divOdrediste.appendChild(newLine);

        var labGrad = document.createElement("label");
        labGrad.innerHTML = "Unesite grad odredista:";
        divOdrediste.appendChild(labGrad);

        var input = document.createElement("input");
        input.className = "gradOdredista";
        input.type = "text";
        divOdrediste.appendChild(input);


        var labzemlja = document.createElement("label");
        labzemlja.innerHTML = "Unesite drzavu odredista:";
        divOdrediste.appendChild(labzemlja);

        input = document.createElement("input");
        input.className = "zemljaodredistea";
        input.type = "text";
        divOdrediste.appendChild(input);

        var labNazivStanice = document.createElement("label");
        labNazivStanice.innerHTML = "Naziv stanice:";
        divOdrediste.appendChild(labNazivStanice);

        input = document.createElement("input");
        input.className = "nazivStanice";
        input.type = "text";
        divOdrediste.appendChild(input);

        var dugme = document.createElement("button");
        dugme.innerHTML = "Dodaj odrediste";
        dugme.className = "Dodavanjeodrediste";

        divOdrediste.appendChild(newLine);

        divOdrediste.appendChild(dugme);

        dugme.onclick = (ev) => {
            var grad = divOdrediste.querySelector(".gradOdredista").value;
            var zemlja = divOdrediste.querySelector(".zemljaodredistea").value;
            var nazivStanice = divOdrediste.querySelector(".nazivStanice").value;

            if ((grad == "") || (zemlja == "") || (nazivStanice == "")) {
                alert("Neophodno je uneti pravilne podatke"); 
            } else {
                fetch("https://localhost:5001/Odrediste/DodajOdrediste", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        "Grad": grad,
                        "zemlja": zemlja,
                        "nazivStanice": nazivStanice,
                    })
                }).then(p => {
                    if (p.ok) {

                        let divCheckOdrediste = document.querySelector(".divCheck");
                        (divCheckOdrediste.parentNode).appendChild(divCheckOdrediste);

                        fetch("https://localhost:5001/Odrediste/PreuzimanjePoslednjeDodatoOdrediste", {
                            method: "GET"
                        }).then(p => p.json().then(data => {

                            var checkboxOdr = document.createElement("input");
                            checkboxOdr.type = "checkbox";
                            checkboxOdr.value = data.id;
                            divCheckOdrediste.appendChild(checkboxOdr);

                            var labOdrediste = document.createElement("label");
                            labOdrediste.innerHTML = data.naziv;
                            divCheckOdrediste.appendChild(labOdrediste);

                        }));
                    } else {
                        alert("Greska prilikom dodavanja odredista!");
                    }
                });
            }
        }
    }
    pravljenjeTermina(divPrikazAutobusaZaRezervisanje, dugmeUcitajAutobuse) {
        var pronadjenDiv = this.formaKontejner.querySelector(".divPrikazAutobusaZaRezervisanje1");
        if (pronadjenDiv != null) {
            pronadjenDiv.remove();
        }

        var divPrikazAutobusaZaRezervisanje1 = document.createElement("div");
        divPrikazAutobusaZaRezervisanje1.className = "divDodavanjeNoveVoznjeAutobusu";
        divPrikazAutobusaZaRezervisanje.appendChild(divPrikazAutobusaZaRezervisanje1);

        var h4 = document.createElement("h4");
        h4.innerHTML = "Kreiranje voznje";
        divPrikazAutobusaZaRezervisanje1.appendChild(h4);

        var newLine = document.createElement("br");
        divPrikazAutobusaZaRezervisanje1.appendChild(newLine);

        var labOdrediste = document.createElement("label");
        labOdrediste.innerHTML = "Izbor odredista:";
        labOdrediste.className = "labOdrediste";
        divPrikazAutobusaZaRezervisanje1.appendChild(labOdrediste);

        newLine = document.createElement("br");
        divPrikazAutobusaZaRezervisanje1.appendChild(newLine);

        var divPrikazOdredista = document.createElement("div");
        divPrikazOdredista.className = "divPrikazOdredista";
        divPrikazAutobusaZaRezervisanje1.appendChild(divPrikazOdredista);

        var divCheckOdrediste = document.createElement("div");
        divCheckOdrediste.className = "divCheck";
        divPrikazOdredista.appendChild(divCheckOdrediste);

        fetch("https://localhost:5001/Odrediste/PreuzmiOdrediste", {
            method: "GET"
        }).then(p =>
             p.json().then(data => {
            data.forEach(odrediste => {
                var checkboxOdr = document.createElement("input");
                checkboxOdr.type = "checkbox";
                checkboxOdr.value = odrediste.id;
                divCheckOdrediste.appendChild(checkboxOdr);

                var labOdrediste = document.createElement("label");
                labOdrediste.innerHTML = odrediste.grad;
                divCheckOdrediste.appendChild(labOdrediste);

            });
        }));
        newLine = document.createElement("br");
        divPrikazAutobusaZaRezervisanje1.appendChild(newLine);

        newLine = document.createElement("br");
        divPrikazAutobusaZaRezervisanje1.appendChild(newLine);

        dugmeUcitajAutobuse.onclick = (ev) => {

            var divIzborAutobusa = document.createElement("div");
            divIzborAutobusa.className = "divIzborAutobusa" + this.id;
            divIzborAutobusa.innerHTML = "Izbor autobusa:"
            divPrikazAutobusaZaRezervisanje1.appendChild(divIzborAutobusa);

            fetch("https://localhost:5001/Autobus/PreuzimanjeAutobusaIzStanice/" + this.id, {

                method: "GET"
            }).then(p =>
                 p.json().then(data => {
                data.forEach(autobus => {
                    var divCheck = document.createElement("div");
                    divCheck.className = "autobus" + autobus.id; 
                    divIzborAutobusa.appendChild(divCheck);

                    var cb = document.createElement("input");
                    cb.type = "checkbox";
                    cb.name = "autobus";
                    cb.value = autobus.id;
                    divCheck.appendChild(cb);

                    var markaModel = document.createElement("label");
                    markaModel.innerHTML = autobus.marka+" "+autobus.model;
                    markaModel.className = "labRadio";
                    divCheck.appendChild(markaModel);

                    var br = document.createElement("br");
                    divCheck.appendChild(br);

                    var labOdlazni = document.createElement("label");
                    labOdlazni.innerHTML = "odlazni";
                    labOdlazni.className = "odlazni";
                    divCheck.appendChild(labOdlazni);

                    var rbOdlazni = document.createElement("input");
                    rbOdlazni.type = "radio";
                    rbOdlazni.name = "odlazniDolazni" + autobus.id;
                    rbOdlazni.value = "odlazni" + autobus.id;
                    divCheck.appendChild(rbOdlazni);

                    var labDolazni = document.createElement("label");
                    labDolazni.innerHTML = "dolazni";
                    labDolazni.className = "dolazni";
                    divCheck.appendChild(labDolazni);

                    var rbDolazni = document.createElement("input");
                    rbDolazni.type = "radio";
                    rbDolazni.name = "odlazniDolazni" + autobus.id; 
                    rbDolazni.value = "dolazni" + autobus.id;
                    divCheck.appendChild(rbDolazni);

                    var br = document.createElement("br");
                    divCheck.appendChild(br);
                });
            }));
            
            var br = document.createElement("br");
            divPrikazAutobusaZaRezervisanje1.appendChild(br);

            var labOdDol = document.createElement("label");
            labOdDol.innerHTML = "Unos vremene polaska voznje";
            divPrikazAutobusaZaRezervisanje1.appendChild(labOdDol);

            var input = document.createElement("input");
            input.type = "date";
            input.className = "datum";
            input.name = "datum";
            divPrikazAutobusaZaRezervisanje1.appendChild(input); 

            var input = document.createElement("input");
            input.type = "time";
            input.className = "vreme";
            input.name = "vreme";
            divPrikazAutobusaZaRezervisanje1.appendChild(input);

            newLine = document.createElement("br");
            divPrikazAutobusaZaRezervisanje1.appendChild(newLine);

            var labOcekivana=document.createElement("label");
            labOcekivana.innerHTML="Unesite ocekivano vreme voznje";
            divPrikazAutobusaZaRezervisanje1.appendChild(labOcekivana);

            var input1 = document.createElement("input");
            input1.type = "input";
            input1.className = "duzina";
            input1.name = "duzina";
            divPrikazAutobusaZaRezervisanje1.appendChild(input1);

            newLine = document.createElement("br");
            divPrikazAutobusaZaRezervisanje1.appendChild(newLine);

            var labPresedanja=document.createElement("label");
            labPresedanja.innerHTML="Unesite broj presedanja";
            divPrikazAutobusaZaRezervisanje1.appendChild(labPresedanja);

            var br = document.createElement("br");
            divPrikazAutobusaZaRezervisanje1.appendChild(br);
            var input2 = document.createElement("input");
            input2.type = "input";
            input2.className = "presedanja";
            input2.name = "presedanja";
            divPrikazAutobusaZaRezervisanje1.appendChild(input2);
            var br = document.createElement("br");
            divPrikazAutobusaZaRezervisanje1.appendChild(br);
            dugmeUcitajAutobuse.disabled = true;

            var dugmeDodajTerminVoznje = document.createElement("button");
            dugmeDodajTerminVoznje.innerHTML = "Dodaj novu voznju autobusu";
            dugmeDodajTerminVoznje.className = "dodajTerminZaAutobus";
            dugmeDodajTerminVoznje.disabled = false;
            divPrikazAutobusaZaRezervisanje1.appendChild(dugmeDodajTerminVoznje);

            dugmeDodajTerminVoznje.onclick = (ev) => {
                divCheckOdrediste = this.formaKontejner.querySelector(".divCheck");
                if (divCheckOdrediste.querySelector('input[type="checkbox"]:checked') != null) {
                    var odredisteIzabranaID = divCheckOdrediste.querySelector('input[type="checkbox"]:checked').value;
                } else alert("Nije izabrano nijedno odrediste!");

                var autobusIzabranID = divIzborAutobusa.querySelector('input[type="checkbox"]:checked').value;

                let dt = this.formaKontejner.querySelector('input[name="datum"]').value;
                let vr = this.formaKontejner.querySelector('input[name="vreme"]').value;
                let ocekivanaDuzivnaVoznje = this.formaKontejner.querySelector('input[name="duzina"]').value;
                let brojPresedanja = this.formaKontejner.querySelector('input[name="presedanja"]').value;

                let datumIVreme = dt + " " + vr;
                let odlazni = this.formaKontejner.querySelector('input[name="odlazniDolazni' + autobusIzabranID + '"]:checked').value;
                var odlazniDolazni = 0;
                var odDol = "pristizanja";
                if (odlazni.substring(0, 7) == "odlazni") {
                    odlazniDolazni = 1;
                    odDol = "odlaska";
                    labOdDol.innerHTML = " Unos vremena " + odDol + " i dužine trajanja voznje u minutima ";
                } else labOdDol.innerHTML = " Unos vremena " + odDol + " i dužine trajanja voznje u minutima ";
                


                console.log(odredisteIzabranaID,autobusIzabranID,datumIVreme);
                fetch("https://localhost:5001/Voznja/DodelaVoznjeAutobusu/ " + odredisteIzabranaID + " / " + autobusIzabranID + " / " + datumIVreme, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        //"idAutobus":autobusIzabranID,
                        //"idOdredista":odredisteIzabranaID,
                        //"vreme":datumIVreme,

                        "DolazniOdlazni": odlazniDolazni,
                        "ocekivanaDuzinaPuta": ocekivanaDuzivnaVoznje,
                        "BrojPresedanja":brojPresedanja,
                    })
                    

                }).then(p => {
                    if (p.ok) {
                        this.crtanjeIzmenjenogAutobusaIzStanice(autobusIzabranID);

                    } else {
                        alert("Doslo je do greske!");
                    }
                });
            }
        }
    }

    crtanjeAutobuskeStanice(host) {
        let divNaslov = document.createElement("div");
        divNaslov.className = "divNaslov";
        host.appendChild(divNaslov);
        
        let divAStanice = document.createElement("div");
        divAStanice.className = "divPrikaziAutobusa";
        this.kontejner = divAStanice;
        host.appendChild(this.kontejner);

        let labNaziv = document.createElement("label");
        labNaziv.className = "labNaziv";
        labNaziv.innerHTML = this.naziv;
        divNaslov.appendChild(labNaziv);

       

        let dugmeObrisi = document.createElement("button");
        dugmeObrisi.innerHTML = "obriši";
        dugmeObrisi.className = "dugmeObrisi";
        divNaslov.appendChild(dugmeObrisi);

        dugmeObrisi.onclick = (ev) => {
            fetch("https://localhost:5001/AutobuskaStanica/BrisanjeAutobuskeStanice/" + this.id, {
                method: "DELETE"
            }).then(p => {
                if (p.ok) {
                    this.kontejner.parentNode.parentNode.style.display = "none";
                } else {
                    alert("Doslo je do greske!");
                }
            });
        }
        this.crtanjeAutobusaIzStanice(divAStanice);


    }
    crtanjeAutobusaIzStanice(divAutobuska) {
        fetch("https://localhost:5001/Autobus/PreuzimanjeAutobusaIzStanice/" + this.id, {

            method: "GET"
        }).then(p => p.json().then(data => {

            data.forEach(el => {

                let autobus = new Autobus(el.id, el.registracija, el.brojSedista, el.marka, el.model);
                autobus.prikaz(divAutobuska);

                this.autobusi.push(autobus); 
            })
        }));
    }
    crtanjeIzmenjenogAutobusaIzStanice(idAutobusaZaMenjanje) {

        let i = 0;
        this.autobusi.forEach(el => {
            let autobus = new Autobus(el.id, el.registracija, el.brojSedista,el.marka, el.model);
            var decaDivovi = (this.kontejner).childNodes;
            if (el.id == idAutobusaZaMenjanje) {
                (decaDivovi[i].parentNode).removeChild(decaDivovi[i]);
                (this.autobusi).splice(i, 1);
                autobus.prikaz(this.kontejner);
                (this.autobusi).push(el);

            }
            i++;
        })
    }
}