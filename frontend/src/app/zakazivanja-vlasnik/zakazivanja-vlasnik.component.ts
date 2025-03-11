import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Zakazivanje from '../models/zakazivanje';
import { ZakazivanjeService } from '../services/zakazivanje.service';

@Component({
  selector: 'app-zakazivanja-vlasnik',
  templateUrl: './zakazivanja-vlasnik.component.html',
  styleUrls: ['./zakazivanja-vlasnik.component.css']
})
export class ZakazivanjaVlasnikComponent implements OnInit {

  korisnik: string = "";
  zakazivanja: Zakazivanje[] = [];
  arhiva: Zakazivanje[] = [];

  pisanjeKomentara: boolean = false;
  izabranoZakazivanje: Zakazivanje = new Zakazivanje();
  ocena: number = 0;
  komentar: string = "";

  greska: string = "";

  constructor(private router: Router, private zakazivanjeService: ZakazivanjeService) {}

  ngOnInit(): void {
    let ulogovan = localStorage.getItem('ulogovan');
    if (ulogovan) {
      this.korisnik = ulogovan;
    }
    this.zakazivanjeService.dohvatiZakazivanjaVlasnika(this.korisnik).subscribe(z => {
      this.zakazivanja = z;
      this.zakazivanja.sort((a, b) => {
        let datumA = new Date(a.trenutakZakazivanja).getTime();
        let datumB = new Date(b.trenutakZakazivanja).getTime();
        return datumB - datumA;
      });
    });
    this.zakazivanjeService.dohvatiArhivuVlasnika(this.korisnik).subscribe(a => {
      this.arhiva = a;
      this.arhiva.sort((a, b) => {
        let datumA = new Date(a.datumVreme).getTime();
        let datumB = new Date(b.datumVreme).getTime();
        return datumB - datumA;
      });
    });
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
    let usluge = "";
    if (usluge.length > 0) {
      usluge = zakazivanje.usluge.join(', ');
      return usluge;
    }
    else {
      return "/";
    }
  }

  moguceOtkazivanje(zakazivanje: Zakazivanje) {
    let sadasnjost = new Date().getTime();
    let zakazano = new Date(zakazivanje.datumVreme).getTime();
    if (zakazano - sadasnjost > 86400000) {
      return true;
    }
    else {
      return false;
    }
  }

  otkazi(zakazivanje: Zakazivanje) {
    this.zakazivanjeService.otkaziZakazivanje(zakazivanje.korisnik, zakazivanje.firma, zakazivanje.trenutakZakazivanja).subscribe(m => {
      if (m.msg != 'ok') {
        alert("Грешка при обради захтева!")
      } else {
        alert("Заказивање успешно отказано!")
        this.ngOnInit();
      }
    })
  }

  ispisStatusa(zakazivanje: Zakazivanje) {
    let sadasnjost = new Date().getTime();
    let vreme = new Date(zakazivanje.poslednjeOdrzavanje).getTime();
    if (zakazivanje.status == "aktivno") {
      return "Чека се потврда";
    }
    else if (zakazivanje.status == "prihvaceno") {
      return "Прихваћено";
    }
    else if (zakazivanje.status == "zavrseno" && sadasnjost - vreme >= 0) {
      return "Завршено";
    }
    else if (zakazivanje.status == "zavrseno" && sadasnjost - vreme < 0) {
      return "Одржавање у току";
    }
    else if (zakazivanje.status == "odbijeno") {
      return "Одбијено";
    }
    else if (zakazivanje.status == "odrzavanje") {
      return "Чека се одржавање";
    }
    else {
      return "?";
    }
  }

  nacrtajZvezdice(zakazivanje: Zakazivanje) {
    let zvezdice = "";
    for (let i = 0; i < Math.floor(zakazivanje.ocena); i++) {
      zvezdice += '★';
    }
    for (let i = Math.floor(zakazivanje.ocena); i < 5; i++) {
      zvezdice += '☆';
    }
    return zvezdice;
  }

  komentarisi(zakazivanje: Zakazivanje) {
    this.izabranoZakazivanje = zakazivanje;
    this.pisanjeKomentara = true;
  }

  odaberiOcenu(zvezdica: number) {
    this.ocena = zvezdica;
  }

  ostaviKomentar() {
    if (this.ocena > 0) {
      this.zakazivanjeService.ostaviKomentar(this.izabranoZakazivanje.korisnik, this.izabranoZakazivanje.firma, this.izabranoZakazivanje.trenutakZakazivanja, this.komentar, this.ocena).subscribe(m => {
        if (m.msg != "ok") {
          alert("Грешка при слању коментара!");
        }
        else {
          alert("Коментар успешно остављен!");
          this.izabranoZakazivanje = new Zakazivanje();
          this.pisanjeKomentara = false;
          this.ngOnInit();
        }
      })
    }
    else {
      this.greska = "Потребно је бар унети оцену!";
    }
  }

  odustani() {
    this.izabranoZakazivanje = new Zakazivanje();
    this.pisanjeKomentara = false;
  }

}
