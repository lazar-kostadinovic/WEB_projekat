import { Odrediste } from "./odrediste.js";

export class Voznja {
    constructor(id, idAutobus, idOdredista, vreme, ocekivanaDuzinaPuta, dolazniOdlazni, brojPresedanja) {
      this.id=id;
      this.autobus=idAutobus;
      this.odrediste=idOdredista;
      this.vreme=vreme;
      this.ocekivanaDuzinaPuta=ocekivanaDuzinaPuta;
      this.dolazniOdlazni=dolazniOdlazni;
      this.brojPresedanja=brojPresedanja;
    }
}