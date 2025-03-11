import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Poruka } from '../models/poruka';
import Zakazivanje from '../models/zakazivanje';

@Injectable({
  providedIn: 'root'
})
export class ZakazivanjeService {

  constructor(private http: HttpClient) { }

  uri = "http://localhost:4000/zakazivanje";

  zakazivanjePrivatno(korisnik: string, firma: string, datumVreme: string, kvadraturaUkupno: number, tip: string, opis: string, usluge: Array<string>, kvadraturaZelenilo: number, kvadraturaBazen: number, kvadraturaNamestaj: number, izgledBaste: any[]): Observable<any> {
    let data = {
      korisnik: korisnik,
      firma: firma,
      datumVreme: datumVreme,
      kvadraturaUkupno: kvadraturaUkupno,
      tip: tip,
      opis: opis,
      usluge: usluge,
      kvadraturaZelenilo: kvadraturaZelenilo,
      kvadraturaBazen: kvadraturaBazen,
      kvadraturaNamestaj: kvadraturaNamestaj,
      izgledBaste: izgledBaste
    }
    return this.http.post<Poruka>(`${this.uri}/zakazivanjePrivatno`, data);
  }

  zakazivanjeRestoransko(korisnik: string, firma: string, datumVreme: string, kvadraturaUkupno: number, tip: string, opis: string, usluge: Array<string>, kvadraturaZelenilo: number, kvadraturaFontana: number, brojStolova: number, brojStolica: number, izgledBaste: any[]): Observable<any> {
    let data = {
      korisnik: korisnik,
      firma: firma,
      datumVreme: datumVreme,
      kvadraturaUkupno: kvadraturaUkupno,
      tip: tip,
      opis: opis,
      usluge: usluge,
      kvadraturaZelenilo: kvadraturaZelenilo,
      kvadraturaFontana: kvadraturaFontana,
      brojStolova: brojStolova,
      brojStolica: brojStolica,
      izgledBaste: izgledBaste
    }
    return this.http.post<Poruka>(`${this.uri}/zakazivanjeRestoransko`, data);
  }

  dohvatiZakazivanjaVlasnika(korisnik: string) {
    let data = {
      korisnik: korisnik
    }
    return this.http.post<Zakazivanje[]>(`${this.uri}/dohvatiZakazivanjaVlasnika`, data);
  }

  dohvatiArhivuVlasnika(korisnik: string) {
    let data = {
      korisnik: korisnik
    }
    return this.http.post<Zakazivanje[]>(`${this.uri}/dohvatiArhivuVlasnika`, data);
  }

  dohvatiArhivuDekoratera(dekorater: string) {
    let data = {
      dekorater: dekorater
    }
    return this.http.post<Zakazivanje[]>(`${this.uri}/dohvatiArhivuDekoratera`, data);
  }

  dohvatiArhivuFirme(firma: string) {
    let data = {
      firma: firma
    }
    return this.http.post<Zakazivanje[]>(`${this.uri}/dohvatiArhivuFirme`, data);
  }

  dohvatiArhivuVlasnikaBezOdrzavanja(korisnik: string) {
    let data = {
      korisnik: korisnik
    }
    return this.http.post<Zakazivanje[]>(`${this.uri}/dohvatiArhivuVlasnikaBezOdrzavanja`, data);
  }

  dohvatiZakazivanjaFirme(firma: string) {
    let data = {
      firma: firma
    }
    return this.http.post<Zakazivanje[]>(`${this.uri}/dohvatiZakazivanjaFirme`, data);
  }

  dohvatiZakazivanjaDekoratera(dekorater: string) {
    let data = {
      dekorater: dekorater
    }
    return this.http.post<Zakazivanje[]>(`${this.uri}/dohvatiZakazivanjaDekoratera`, data);
  }

  otkaziZakazivanje(korisnik: string, firma: string, trenutakZakazivanja: string) {
    let data = {
      korisnik: korisnik,
      firma: firma,
      trenutakZakazivanja: trenutakZakazivanja
    }
    return this.http.post<Poruka>(`${this.uri}/otkaziZakazivanje`, data)
  }

  dohvatiOcenjenaZakazivanja() {
    return this.http.get<Zakazivanje[]>(`${this.uri}/dohvatiOcenjenaZakazivanja`);
  }

  dohvatiOcenjenaZakazivanjaFirme(firma: string) {
    let data = {
      firma: firma
    }
    return this.http.post<Zakazivanje[]>(`${this.uri}/dohvatiOcenjenaZakazivanjaFirme`, data);
  }

  dohvatiZavrsenaZakazivanja() {
    return this.http.get<Zakazivanje[]>(`${this.uri}/dohvatiZavrsenaZakazivanja`);
  }

  ostaviKomentar(korisnik: string, firma: string, trenutakZakazivanja: string, komentar: string, ocena: number) {
    let data = {
      korisnik: korisnik,
      firma: firma,
      trenutakZakazivanja: trenutakZakazivanja,
      komentar: komentar,
      ocena: ocena
    }
    return this.http.post<Poruka>(`${this.uri}/ostaviKomentar`, data)
  }

  odbijZakazivanje(korisnik: string, firma: string, trenutakZakazivanja: string, komentar: string) {
    let data = {
      korisnik: korisnik,
      firma: firma,
      trenutakZakazivanja: trenutakZakazivanja,
      komentar: komentar
    }
    return this.http.post<Poruka>(`${this.uri}/odbijZakazivanje`, data)
  }

  potvrdiZakazivanje(korisnik: string, firma: string, trenutakZakazivanja: string, dekorater: string) {
    let data = {
      korisnik: korisnik,
      firma: firma,
      trenutakZakazivanja: trenutakZakazivanja,
      dekorater: dekorater
    }
    return this.http.post<Poruka>(`${this.uri}/potvrdiZakazivanje`, data)
  }

  zavrsiPosao(formData: FormData): Observable<any> {
    return this.http.post<Poruka>(`${this.uri}/zavrsiPosao`, formData);
  }

  oznaciZaOdrzavanje(korisnik: string, firma: string, trenutakZakazivanja: string) {
    let data = {
      korisnik: korisnik,
      firma: firma,
      trenutakZakazivanja: trenutakZakazivanja,
    }
    return this.http.post<Poruka>(`${this.uri}/oznaciZaOdrzavanje`, data)
  }

  dohvatiOdrzavanjaVlasnika(korisnik: string) {
    let data = {
      korisnik: korisnik
    }
    return this.http.post<Zakazivanje[]>(`${this.uri}/dohvatiOdrzavanjaVlasnika`, data);
  }

  dohvatiOdrzavanjaFirme(firma: string) {
    let data = {
      firma: firma
    }
    return this.http.post<Zakazivanje[]>(`${this.uri}/dohvatiOdrzavanjaFirme`, data);
  }

  odbijOdrzavanje(korisnik: string, firma: string, trenutakZakazivanja: string) {
    let data = {
      korisnik: korisnik,
      firma: firma,
      trenutakZakazivanja: trenutakZakazivanja
    }
    return this.http.post<Poruka>(`${this.uri}/odbijOdrzavanje`, data)
  }

  obaviOdrzavanje(korisnik: string, firma: string, trenutakZakazivanja: string, vremeOdrzavanja: string) {
    let data = {
      korisnik: korisnik,
      firma: firma,
      trenutakZakazivanja: trenutakZakazivanja,
      vremeOdrzavanja: vremeOdrzavanja
    }
    return this.http.post<Poruka>(`${this.uri}/obaviOdrzavanje`, data)
  }

}
