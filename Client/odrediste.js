import { Voznja } from "./voznja.js";
export class Odrediste {
    constructor(id, grad, zemljaOdrediste, nazivStanice) {
        this.id = id;
        this.grad = grad;
        this.zemljaOdrediste = zemljaOdrediste;
        this.nazivStanice = nazivStanice; 
        this.kontejner = null;
    }

    crtanjeDodavanjeOdredista(divOdrediste) {
            var h2 = document.createElement("h2");
            h2.innerHTML = "Kreiranje odredista";
            divOdrediste.appendChild(h2);

            var newLine = document.createElement("br");
            divOdrediste.appendChild(newLine);

            var labgrad = document.createElement("label");
            labgrad.innerHTML = "Unesite grad odredista:";
            divOdrediste.appendChild(labgrad);

            newLine = document.createElement("br");
            divOdrediste.appendChild(newLine);

            var input = document.createElement("input");
            input.className = "gradOdrediste";
            input.type = "text";
            divOdrediste.appendChild(input);

            newLine = document.createElement("br");
            divOdrediste.appendChild(newLine);

            var labzemlja = document.createElement("label");
            labzemlja.innerHTML = "Unesite državu odredista:";
            divOdrediste.appendChild(labzemlja);

            newLine = document.createElement("br");
            divOdrediste.appendChild(newLine);

            input = document.createElement("input");
            input.className = "zemljaOdrediste";
            input.type = "text";
            divOdrediste.appendChild(input);

            newLine = document.createElement("br");
            divOdrediste.appendChild(newLine);

            var nazivStanice = document.createElement("label");
            nazivStanice.innerHTML = "Naziv stanice:";
            divOdrediste.appendChild(nazivStanice);

            newLine = document.createElement("br");
            divOdrediste.appendChild(newLine);

            input = document.createElement("input");
            input.className = "nazivStanice";
            input.type = "text";
            divOdrediste.appendChild(input);

            newLine = document.createElement("br");
            divOdrediste.appendChild(newLine);

            var dugme = document.createElement("button");
            dugme.innerHTML = "Dodaj odrediste";
            dugme.className = "Dodavanjeodrediste";

            divOdrediste.appendChild(dugme);

            dugme.onclick = (ev) => {
                var gradOdrediste = divOdrediste.querySelector(".gradOdrediste").value;
                var zemljaOdrediste = divOdrediste.querySelector(".zemljaOdrediste").value;
                var nazivStanice= divOdrediste.querySelector(".nazivStanice ").value;

                if ((gradOdrediste == "") || (zemljaOdrediste == "") || (nazivStanice== "")) {
                    alert("Neophodno je uneti pravilne podatke"); 
                } else {
                    fetch("https://localhost:5001/Odrediste/DodajOdrediste", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            "Grad": gradOdrediste,
                            "Zemlja": zemljaOdrediste,
                            "nazivStanice": nazivStanice
                ,
                        })
                    }).then(p => {
                        if (p.ok) {
                            alert("Uspesno ste dodali odrediste!");
                        } else {
                            alert("Greska prilikom dodavanja odredista!");
                        }
                    });
                }
            }
        }
       

    iscrtavanjePodatakaOOdredistu(divVoznja, idVoznje, novTermin, odlazniDolazni, novaOcekivanaDuzinaPuta,noviBrojPresedanja) {
        let voznjeAutobusa = document.createElement("div");
        voznjeAutobusa.className = "voznjeAutobusa";
        divVoznja.appendChild(voznjeAutobusa)
        this.kontejner = voznjeAutobusa;

        

        var lab = document.createElement("label");
        lab.innerHTML = "Grad odredista";
        voznjeAutobusa.appendChild(lab);

        var select = document.createElement("select");
        select.className = "selectOdrediste";
        select.style.display = "none"
        voznjeAutobusa.appendChild(select);

        fetch("https://localhost:5001/Odrediste/PreuzmiOdrediste", {

            method: "GET"
        }).then(p => p.json().then(data => {
            data.forEach(odrediste => {
                let option = document.createElement("option");
                option.value = odrediste.id;
                option.innerHTML = odrediste.grad+" "+odrediste.zemlja;
                select.appendChild(option);
            });
        }));
       
        var inputGrad = document.createElement("input");
        inputGrad.value = this.grad;
        voznjeAutobusa.appendChild(inputGrad);

        var newLine = document.createElement("br");
        voznjeAutobusa.appendChild(newLine);

        var labZemlja = document.createElement("label");
        labZemlja.innerHTML = "Zemlja odredista";
        //voznjeAutobusa.appendChild(labZemlja);

        var inputZemlja = document.createElement("input");
        inputZemlja.value = this.zemljaOdrediste;
        //voznjeAutobusa.appendChild(inputZemlja);

       

        var lab = document.createElement("label");
        lab.innerHTML = "Naziv stanice";
        voznjeAutobusa.appendChild(lab);

        var inputNazivStanice = document.createElement("input");
        inputNazivStanice.value = this.nazivStanice;
        voznjeAutobusa.appendChild(inputNazivStanice);

        var newLine = document.createElement("br");
        voznjeAutobusa.appendChild(newLine);

        var lab = document.createElement("label");
        var dolazniOdlazni = (odlazniDolazni == 1) ? "stizanja na odrediste " : "polaska";
        lab.innerHTML = "Vreme " + dolazniOdlazni;
        voznjeAutobusa.appendChild(lab);

        var inputVreme = document.createElement("input");
        inputVreme.value = novTermin;
        inputVreme.type = "datetime";
        inputVreme.className = "inputVreme";
        voznjeAutobusa.appendChild(inputVreme);

        var newLine = document.createElement("br");
        voznjeAutobusa.appendChild(newLine);

        var lab = document.createElement("label");
        lab.innerHTML = "Ocekivano trajanje puta";
        voznjeAutobusa.appendChild(lab);
        

        var inputDuzina = document.createElement("input");
        inputDuzina.value = novaOcekivanaDuzinaPuta;
        inputDuzina.type = "input";
        inputDuzina.className = "inputDuzina";
        voznjeAutobusa.appendChild(inputDuzina);

        var newLine = document.createElement("br");
        voznjeAutobusa.appendChild(newLine);

        var presedanja = document.createElement("label");
        presedanja.innerHTML = "Presedanja";
        voznjeAutobusa.appendChild(presedanja);

        var inputPresedanja = document.createElement("input");
        inputPresedanja.value = noviBrojPresedanja;
        inputPresedanja.type="input";
        inputPresedanja.className="inputPresedanja";
        voznjeAutobusa.appendChild(inputPresedanja);

        var newLine = document.createElement("br");
        voznjeAutobusa.appendChild(newLine);


        let dugmeUpdate = document.createElement("button");
        dugmeUpdate.innerHTML = "Izmena"; 
        voznjeAutobusa.appendChild(dugmeUpdate);

        let dugmeSave = document.createElement("button");
        dugmeSave.innerHTML = "Sacuvaj"; 
        dugmeSave.style.display = "none";
        voznjeAutobusa.appendChild(dugmeSave);

        let dugmeObrisi = document.createElement("button");
        dugmeObrisi.innerHTML = "Brisanje";
        voznjeAutobusa.appendChild(dugmeObrisi);

        dugmeObrisi.onclick = (ev) => {
            fetch("https://localhost:5001/Voznja/ObrisiVoznju/" + idVoznje, {
                method: "DELETE"
            }).then(p => {
                if (p.ok) {
                    this.kontejner.style.display = "none";
                } else {
                    alert("Doslo je do greske!");
                }
            });
        }
        

        inputVreme.disabled = true;
        inputNazivStanice.disabled = true;
        inputZemlja.disabled = true;
        inputGrad.disabled = true;
        inputDuzina.disabled = true;
        inputPresedanja.disabled=true;

        dugmeUpdate.onclick = (ev) => { 
            inputVreme.disabled = false;
            inputDuzina.disabled = false;
            inputPresedanja.disabled=false;
            select.style.display = "block";
            inputGrad.style.display = "none";
            dugmeUpdate.style.display = "none";
            dugmeSave.style.display = "block";

            dugmeSave.onclick = (ev) => {
                let novoVreme = this.kontejner.querySelector(".inputVreme").value;
                let noviIdOdredista = this.kontejner.querySelector(".selectOdrediste").value; 
                let odredisteNovi = this.kontejner.querySelector(".selectOdrediste")[noviIdOdredista - 1].text;
                let novaOcekivanaDuzinaPuta= this.kontejner.querySelector(".inputDuzina").value;
                let noviBrojPresedanja =this.kontejner.querySelector(".inputPresedanja").value;
                
              
                fetch("https://localhost:5001/Voznja/IzmenaVoznje/" + idVoznje + "/" + novoVreme + "/" + noviIdOdredista + "/" + novaOcekivanaDuzinaPuta
    , {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                }).then(p => {
                    if (p.ok) {
                        fetch("https://localhost:5001/Odrediste/PreuzmiOdredisteSaId/" + noviIdOdredista, {
                            method: "GET"
                        }).then(p => p.json().then(data => {
                            let preuzetaodrediste = new Odrediste(data.id, data.grad, data.zemljaOdrediste, data.nazivStanice );
                            inputZemlja.value = preuzetaodrediste.zemljaOdrediste;
                            inputNazivStanice.value = preuzetaodrediste.nazivStanice
                ;
                        }));;
                        inputGrad.value = odredisteNovi;
                        inputVreme.innerHTML = novoVreme.value;
                        inputDuzina.innerHTML = novaOcekivanaDuzinaPuta.value;
                        inputPresedanja.innerHTML=noviBrojPresedanja;

                        inputGrad.style.display = "block";
                        select.style.display = "none ";
                        inputZemlja.style.display = "block";
                        dugmeSave.style.display = "none";
                        dugmeUpdate.style.display = "block";
                        inputVreme.disabled = true;
                        inputDuzina.disabled = true;
                        inputNazivStanice.disabled = true;
                        inputZemlja.disabled = true;
                        inputGrad.disabled = true;
                        inputPresedanja.disabled=true;
                    } else {
                        alert("Izmena nije uspesna");
                    }
                });
            }
        }

    }
}