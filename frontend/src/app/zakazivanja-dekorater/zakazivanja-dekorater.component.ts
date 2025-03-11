import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Korisnik from '../models/korisnik';
import { KorisnikService } from '../services/korisnik.service';
import Zakazivanje from '../models/zakazivanje';
import { ZakazivanjeService } from '../services/zakazivanje.service';

@Component({
  selector: 'app-zakazivanja-dekorater',
  templateUrl: './zakazivanja-dekorater.component.html',
  styleUrls: ['./zakazivanja-dekorater.component.css']
})
export class ZakazivanjaDekoraterComponent implements OnInit {

  korisnik: Korisnik = new Korisnik();
  zakazivanja: Zakazivanje[] = [];
  poslovi: Zakazivanje[] = [];

  odbijanjeZakazivanja: boolean = false;
  izabranoZakazivanje: Zakazivanje = new Zakazivanje();
  komentar: string = "";

  zavrsavanjePosla: boolean = false;
  izabraniPosao: Zakazivanje = new Zakazivanje();
  slikaPosla: File | null = null;

  greska1: string = "";
  greska2: string = "";

  constructor(private router: Router, private korisnikService: KorisnikService, private zakazivanjeService: ZakazivanjeService) {}

  ngOnInit(): void {
    let ulogovan = localStorage.getItem('ulogovan');
    if (ulogovan) {
      this.korisnikService.dohvatiKorisnika(ulogovan).subscribe(k => {
        this.korisnik = k;
        this.zakazivanjeService.dohvatiZakazivanjaFirme(this.korisnik.firma).subscribe(z => {
          this.zakazivanja = z;
          this.zakazivanja.sort((a, b) => {
            let datumA = new Date(a.datumVreme).getTime();
            let datumB = new Date(b.datumVreme).getTime();
            return datumB - datumA;
          });
        });
        this.zakazivanjeService.dohvatiZakazivanjaDekoratera(this.korisnik.korisnickoIme).subscribe(p => {
          this.poslovi = p;
        })
      })
    }
    this.greska1 = "";
    this.greska2 = "";
  }

  ispisDatuma(datum: string) {
    let datumVremeObjekat = new Date(datum);
    let godina = datumVremeObjekat.getFullYear();
    let mesec = datumVremeObjekat.getMonth() + 1;
    let dan = datumVremeObjekat.getDate();
    let ispis = dan + "." + mesec + "." + godina + ".";
    return ispis;
  }

  ispisUsluga(zakazivanje: Zakazivanje) {
    let uslugeString = "";
    if (zakazivanje.usluge.length > 0) {
      uslugeString = zakazivanje.usluge.join(', ');
      return uslugeString;
    }
    else {
      return "/";
    }
  }

  potvrdi(zakazivanje: Zakazivanje) {
    this.zakazivanjeService.potvrdiZakazivanje(zakazivanje.korisnik, zakazivanje.firma, zakazivanje.trenutakZakazivanja, this.korisnik.korisnickoIme).subscribe(m => {
      if (m.msg != "ok") {
        alert("Грешка при потврђивању заказивања!");
      }
      else {
        alert("Заказивање успешно потврђено!");
        this.ngOnInit();
      }
    })
  }

  odbijanje(zakazivanje: Zakazivanje) {
    this.izabranoZakazivanje = zakazivanje;
    this.odbijanjeZakazivanja = true;
  }

  odbijZakazivanje() {
    if (this.komentar != "") {
      this.zakazivanjeService.odbijZakazivanje(this.izabranoZakazivanje.korisnik, this.izabranoZakazivanje.firma, this.izabranoZakazivanje.trenutakZakazivanja, this.komentar).subscribe(m => {
        if (m.msg != "ok") {
          alert("Грешка при одбијању заказивања!");
        }
        else {
          alert("Заказивање успешно одбијено!");
          this.izabranoZakazivanje = new Zakazivanje();
          this.odbijanjeZakazivanja = false;
          this.ngOnInit();
        }
      })
    }
    else {
      this.greska1 = "Потребно је оставити објашњење зашто је заказивање одбијено!";
    }
  }

  odustaniOdPreuzimanjaZakazivanja() {
    this.izabranoZakazivanje = new Zakazivanje();
    this.odbijanjeZakazivanja = false;
  }

  mogucZavrsetak(zakazivanje: Zakazivanje) {
    let sadasnjost = new Date().getTime();
    let zakazano = new Date(zakazivanje.datumVreme).getTime();
    if (sadasnjost - zakazano > 0) {
      return true;
    }
    else {
      return false;
    }
  }

  zavrsi(zakazivanje: Zakazivanje) {
    this.izabraniPosao = zakazivanje;
    this.zavrsavanjePosla = true;
  }

  zavrsiPosao() {
    if (this.slikaPosla) {
      const formData = new FormData();
      formData.append('korisnik', this.izabraniPosao.korisnik);
      formData.append('firma', this.izabraniPosao.firma);
      formData.append('trenutakZakazivanja', this.izabraniPosao.trenutakZakazivanja);
      formData.append('slikaPosla', this.slikaPosla);
      this.zakazivanjeService.zavrsiPosao(formData).subscribe(m => {
        if (m.msg !== 'ok') {
          alert("Грешка при завршавању посла!");
        } 
        else {
          alert("Посао успешно завршен!");
          this.ngOnInit();
        }
      });
    } 
    else {
      this.greska2 = "Морате приложити слику!";
    }
  }

  odustaniOdZavrsavanjaPosla() {
    this.izabraniPosao = new Zakazivanje();
    this.zavrsavanjePosla = false;
  }

  onFileChange(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.slikaPosla = event.target.files[0];
    }
  }

}
