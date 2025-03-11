export default class Zakazivanje {
    korisnik: string = "";
    firma: string = "";
    datumVreme: string = "";
    kvadraturaUkupno: number = 0;
    tip: string = "";
    opis: string = "";
    usluge: Array<string> = [];
    kvadraturaZelenilo: number = 0;
    status: string = "";
    trenutakZakazivanja: string = "";
    komentar: string = "";
    ocena: number = 0;
    dekorater: string = "";
    slikaPosla: string = "";
    poslednjeOdrzavanje: string = "";
    izgledBaste: any[] = [];

    kvadraturaBazen: number = 0;
    kvadraturaNamestaj: number = 0;

    kvadraturaFontana: number = 0;
    brojStolova: number = 0;
    brojStolica: number = 0;
}