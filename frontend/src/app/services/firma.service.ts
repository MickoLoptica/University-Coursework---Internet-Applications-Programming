import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Firma from '../models/firma';
import Lokacija from '../models/lokacija';
import Datum from '../models/datum';
import Usluga from '../models/usluga';
import { Poruka } from '../models/poruka';

@Injectable({
  providedIn: 'root'
})
export class FirmaService {

  constructor(private http: HttpClient) { }

  uri = "http://localhost:4000/firma";

  dohvatiFirme() {
    return this.http.get<Firma[]>(`${this.uri}/dohvatiFirme`)
  }

  registracijaFirme(naziv: string, adresa: string, lokacija: Lokacija, odmorPocetak: Datum, odmorKraj: Datum, telefon: string, dekorateri: string[], usluge: Usluga[]) {
    let data = {
      naziv: naziv,
      adresa: adresa,
      lokacija: lokacija,
      odmorPocetak: odmorPocetak,
      odmorKraj: odmorKraj,
      telefon: telefon,
      dekorateri: dekorateri,
      usluge: usluge
    }
    return this.http.post<Poruka>(`${this.uri}/registracijaFirme`, data);
  }

  zaposliUFirmu(firma: string, imeIPrezime: string) {
    let data = {
      firma: firma,
      dekorater: imeIPrezime
    }
    return this.http.post<Poruka>(`${this.uri}/zaposliUFirmu`, data)
  }

  dohvatiFirmu(naziv: string) {
    let data = {
      naziv: naziv
    }
    return this.http.post<Firma>(`${this.uri}/dohvatiFirmu`, data)
  }

}