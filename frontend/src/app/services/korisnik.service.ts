import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Korisnik from '../models/korisnik';
import { Poruka } from '../models/poruka';

@Injectable({
  providedIn: 'root'
})
export class KorisnikService {

  constructor(private http: HttpClient) { }

  uri = "http://localhost:4000/korisnik";

  prijava(korisnickoIme: string, lozinka: string) {
    let data = {
      korisnickoIme: korisnickoIme,
      lozinka: lozinka
    }
    return this.http.post<Korisnik>(`${this.uri}/prijava`, data)
  }

  dohvatiBrojDekorisanihBasti() {
    return this.http.get<number>(`${this.uri}/dohvatiBrojDekorisanihBasti`)
  }

  dohvatiBrojVlasnika() {
    return this.http.get<number>(`${this.uri}/dohvatiBrojVlasnika`)
  }

  dohvatiBrojDekoratera() {
    return this.http.get<number>(`${this.uri}/dohvatiBrojDekoratera`)
  }

  promeniLozinku(korisnickoIme: string, staraLozinka: string, novaLozinka: string) {
    let data = {
      korisnickoIme: korisnickoIme,
      staraLozinka: staraLozinka,
      novaLozinka: novaLozinka
    }
    return this.http.post<Poruka>(`${this.uri}/promeniLozinku`, data)
  }

  registracijaVlasnika(formData: FormData): Observable<any> {
    return this.http.post<Poruka>(`${this.uri}/registracijaVlasnika`, formData);
  }

  dohvatiKorisnika(korisnickoIme: string) {
    let data = {
      korisnickoIme: korisnickoIme
    }
    return this.http.post<Korisnik>(`${this.uri}/dohvatiKorisnika`, data)
  }

  dohvatiKorisnikaNaOsnovuMejla(imejl: string) {
    let data = {
      imejl: imejl
    }
    return this.http.post<Korisnik>(`${this.uri}/dohvatiKorisnikaNaOsnovuMejla`, data)
  }

  dohvatiVlasnike() {
    return this.http.get<Korisnik[]>(`${this.uri}/dohvatiVlasnike`)
  }

  dohvatiDekoratere() {
    return this.http.get<Korisnik[]>(`${this.uri}/dohvatiDekoratere`)
  }

  dohvatiZahteve() {
    return this.http.get<Korisnik[]>(`${this.uri}/dohvatiZahteve`)
  }

  odobriVlasnika(korisnickoIme: string) {
    let data = {
      korisnickoIme: korisnickoIme
    }
    return this.http.post<Poruka>(`${this.uri}/odobriVlasnika`, data)
  }

  aktivirajKorisnika(korisnickoIme: string) {
    let data = {
      korisnickoIme: korisnickoIme
    }
    return this.http.post<Poruka>(`${this.uri}/aktivirajKorisnika`, data)
  }

  deaktivirajKorisnika(korisnickoIme: string) {
    let data = {
      korisnickoIme: korisnickoIme
    }
    return this.http.post<Poruka>(`${this.uri}/deaktivirajKorisnika`, data)
  }

  blokirajDekoratera(korisnickoIme: string) {
    let data = {
      korisnickoIme: korisnickoIme
    }
    return this.http.post<Poruka>(`${this.uri}/blokirajDekoratera`, data)
  }

  odblokirajDekoratera(korisnickoIme: string) {
    let data = {
      korisnickoIme: korisnickoIme
    }
    return this.http.post<Poruka>(`${this.uri}/odblokirajDekoratera`, data)
  }

  azurirajPodatke(formData: FormData): Observable<any> {
    return this.http.post<Poruka>(`${this.uri}/azurirajPodatke`, formData);
  }

  registracijaDekoratera(formData: FormData): Observable<any> {
    return this.http.post<Poruka>(`${this.uri}/registracijaDekoratera`, formData);
  }

  registracijaDekorateraUOkviruFirme(korisnickoIme: string, lozinka: string, ime: string, prezime: string, pol: string, adresa: string, telefon: string, imejl: string, firma: string, profilnaSlika: string): Observable<any> {
    let data = {
      korisnickoIme: korisnickoIme,
      lozinka: lozinka,
      ime: ime,
      prezime: prezime,
      pol: pol,
      adresa: adresa,
      telefon: telefon,
      imejl: imejl,
      firma: firma,
      profilnaSlika: profilnaSlika
    }
    return this.http.post<Poruka>(`${this.uri}/registracijaDekorateraUOkviruFirme`, data);
  }

  aploudujSliku(formData: FormData): Observable<any> {
    return this.http.post<String>(`${this.uri}/aploudujSliku`, formData);
  }

  dohvatiRadnike(nazivFirme: string) {
    let data = {
      nazivFirme: nazivFirme
    }
    return this.http.post<Korisnik[]>(`${this.uri}/dohvatiRadnike`, data);
  }

}