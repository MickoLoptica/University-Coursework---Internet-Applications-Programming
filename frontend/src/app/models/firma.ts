import Lokacija from "./lokacija";
import Datum from "./datum";
import Usluga from "./usluga";
import Korisnik from "./korisnik";

export default class Firma {
    naziv: string = "";
    adresa: string = "";
    lokacija: Lokacija = new Lokacija();
    odmorPocetak: Datum = new Datum();
    odmorKraj: Datum = new Datum();
    usluge: Array<Usluga> = [];
    dekorateri: Array<Korisnik> = [];
    telefon: string = "";
}