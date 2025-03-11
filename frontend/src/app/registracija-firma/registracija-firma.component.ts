import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as l from 'leaflet'
import Lokacija from '../models/lokacija';
import Usluga from '../models/usluga';
import { KorisnikService } from '../services/korisnik.service';
import Korisnik from '../models/korisnik';
import { FirmaService } from '../services/firma.service';
import { HttpClient } from '@angular/common/http';
import Datum from '../models/datum';

@Component({
  selector: 'app-registracija-firma',
  templateUrl: './registracija-firma.component.html',
  styleUrls: ['./registracija-firma.component.css']
})
export class RegistracijaFirmaComponent implements OnInit {

  naziv: string = "";
  adresa: string = "";
  lokacija: Lokacija = new Lokacija();
  usluge: Usluga[] = [];
  odmorPocetak: Datum = new Datum();
  odmorKraj: Datum = new Datum();
  dekorateri: Korisnik[] = [];
  telefon: string = "";

  greska: string = "";

  cioda: l.Marker | null = null;

  nazivNoveUsluge: string = "";
  cenaNoveUsluge: number = 0;

  daniPocetak: number[] = [];
  daniKraj: number[] = [];
  meseci: { naziv: string, duzina: number }[] = [
    { naziv: 'Januar', duzina: 31 },
    { naziv: 'Februar', duzina: 29 },
    { naziv: 'Mart', duzina: 31 },
    { naziv: 'April', duzina: 30 },
    { naziv: 'Maj', duzina: 31 },
    { naziv: 'Jun', duzina: 30 },
    { naziv: 'Jul', duzina: 31 },
    { naziv: 'Avgust', duzina: 31 },
    { naziv: 'Septembar', duzina: 30 },
    { naziv: 'Oktobar', duzina: 31 },
    { naziv: 'Novembar', duzina: 30 },
    { naziv: 'Decembar', duzina: 31 }
  ];

  constructor(private router: Router, private firmaService: FirmaService, private korisnikService: KorisnikService, private http: HttpClient) {}

  ngOnInit(): void {  
    let dataFirma = localStorage.getItem("firma")
      if (dataFirma) {
        let firma = JSON.parse(dataFirma)
        this.naziv = firma.naziv;
        this.adresa = firma.adresa;
        this.lokacija = firma.lokacija;
        this.odmorPocetak = firma.odmorPocetak;
        this.odmorKraj = firma.odmorKraj;
        this.usluge = firma.usluge;
        this.dekorateri = firma.dekorateri;
        this.telefon = firma.telefon;
      }

      this.inicijalizacijaMape()

      this.azurirajPocetneDane(0);
      this.azurirajKrajnjeDane(0);

      let dataDekorater = localStorage.getItem("dekorater")
      if (dataDekorater) {
        let dekorater = JSON.parse(dataDekorater)
        if (this.dekorateri.length > 0) {
          if (this.dekorateri[this.dekorateri.length - 1].korisnickoIme != dekorater.korisnickoIme) {
            this.dekorateri.push(dekorater)
          }
        }
        else {
          this.dekorateri.push(dekorater)
        }
      }
      localStorage.removeItem("dekorater")

  }

  inicijalizacijaMape() {
    const map = l.map('map').setView([44.814337, 20.456699], 13);
    l.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
    }).addTo(map);
    map.on('click', (e: any) => {
      let latlng = e.latlng;
      if (this.cioda) {
        this.cioda.remove();
      }
      this.cioda = l.marker([latlng.lat, latlng.lng]).addTo(map);
      this.lokacija.geografskaSirina = latlng.lat;
      this.lokacija.geografskaDuzina = latlng.lng
    });
    if (this.lokacija.geografskaSirina && this.lokacija.geografskaDuzina) {
      this.cioda = l.marker([this.lokacija.geografskaSirina, this.lokacija.geografskaDuzina]).addTo(map);
      map.setView([this.lokacija.geografskaSirina, this.lokacija.geografskaDuzina], 13);
    }
  }

  azurirajPocetneDane(mesec: number): void {
    let brojDana = this.meseci[mesec]?.duzina || 31;
    this.daniPocetak = Array.from({ length: brojDana }, (_, i) => i + 1);
    if (this.odmorPocetak.dan > brojDana) {
        this.odmorPocetak.dan = brojDana;
    }
  }

  azurirajKrajnjeDane(mesec: number): void {
    let brojDana = this.meseci[mesec]?.duzina || 31;
    this.daniKraj = Array.from({ length: brojDana }, (_, i) => i + 1);
    if (this.odmorKraj.dan > brojDana) {
        this.odmorKraj.dan = brojDana;
    }
  }

  dodajUslugu() {
    if (this.nazivNoveUsluge && this.cenaNoveUsluge > 0) {
      let novaUsluga: Usluga = new Usluga();
      novaUsluga.naziv = this.nazivNoveUsluge;
      novaUsluga.cena = this.cenaNoveUsluge;
      this.usluge.push(novaUsluga);
      this.nazivNoveUsluge = "";
      this.cenaNoveUsluge = 0;
    } 
    else {
      this.greska = "Поља о подацима о услузи не могу остати празна!";
    }
  }

  pripremiDekoratera() {
    localStorage.setItem("proslaStranica", "registracijaFirma")
    let data = {
      naziv: this.naziv,
      adresa: this.adresa,
      lokacija: this.lokacija,
      odmorPocetak: this.odmorPocetak,
      odmorKraj: this.odmorKraj,
      usluge: this.usluge,
      dekorateri: this.dekorateri,
      telefon: this.telefon
    }
    localStorage.setItem("firma", JSON.stringify(data))
    this.router.navigate(['registracijaDekorater'])
  }

  registracija() {
    if (this.naziv == "" || this.adresa == "" || this.lokacija.geografskaDuzina == 0 || this.lokacija.geografskaSirina == 0 || this.odmorPocetak.dan == 0 || this.odmorKraj.dan == 0) {
      this.greska = "Нису унети сви подаци!"
    }
    else if (this.dekorateri.length < 2) {
      this.greska = "Потребно је регистровати барем два радника!"
    }
    else if (this.telefon == "") {
      this.greska = "Потребно је изабрати контакт особу!"
    }
    else {
      this.firmaService.dohvatiFirmu(this.naziv).subscribe(firma => {
        if (firma) {
          this.greska = "Већ постоји фирма са датим називом!";
          return;
        }
        else {
          let imenaIPrezimena = this.dekorateri.map(dekorater => `${dekorater.ime} ${dekorater.prezime}`);
          this.firmaService.registracijaFirme(this.naziv, this.adresa, this.lokacija, this.odmorPocetak, this.odmorKraj, this.telefon, imenaIPrezimena, this.usluge).subscribe(m => {
            if (m.msg !== 'ok') {
              alert("Грешка при регистрацији!");
            } 
            else {
              for (let dekorater of this.dekorateri) {
                this.korisnikService.registracijaDekorateraUOkviruFirme(dekorater.korisnickoIme, dekorater.lozinka, dekorater.ime, dekorater.prezime, dekorater.pol, dekorater.adresa, dekorater.telefon, dekorater.imejl, this.naziv, dekorater.profilnaSlika).subscribe(m => {
                  if (m.msg !== 'ok') {
                    alert("Грешка при регистрацији!");
                  }
                });
              }
              alert("Фирма успешно регистрована!");
              localStorage.removeItem("firma")
              this.router.navigate(['administrator'])
            }
          });
        }
      });
    }
  }

  odustani() {
    let data = localStorage.getItem("dekorater");
    if (data) {
      let dekoraterData = JSON.parse(data);
      if (dekoraterData.profilnaSlika) {
        this.http.delete(`/delete-image?path=${encodeURIComponent(dekoraterData.profilnaSlika)}`)
          .subscribe(() => {
            console.log('Privremena slika dekoratera je obrisana');
          });
      }
    }
    localStorage.removeItem("firma")
    localStorage.removeItem("proslaStranica")
    localStorage.removeItem("dekorater")
    this.router.navigate(['administrator'])
  }

}
