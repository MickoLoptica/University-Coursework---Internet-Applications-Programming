import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Zakazivanje from '../models/zakazivanje';
import { ZakazivanjeService } from '../services/zakazivanje.service';

@Component({
  selector: 'app-odrzavanje-vlasnik',
  templateUrl: './odrzavanje-vlasnik.component.html',
  styleUrls: ['./odrzavanje-vlasnik.component.css']
})
export class OdrzavanjeVlasnikComponent implements OnInit {

  korisnik: string = "";
  arhiva: Zakazivanje[] = [];
  odrzavanja: Zakazivanje[] = [];

  constructor(private router: Router, private zakazivanjeService: ZakazivanjeService) {}

  ngOnInit(): void {
    let ulogovan = localStorage.getItem('ulogovan');
    if (ulogovan) {
      this.korisnik = ulogovan;
    }
    this.zakazivanjeService.dohvatiArhivuVlasnikaBezOdrzavanja(this.korisnik).subscribe(a => {
      this.arhiva = a;
      this.arhiva.sort((a, b) => {
        let datumA = new Date(a.datumVreme).getTime();
        let datumB = new Date(b.datumVreme).getTime();
        return datumB - datumA;
      });
    });
    this.zakazivanjeService.dohvatiOdrzavanjaVlasnika(this.korisnik).subscribe(o => {
      this.odrzavanja = o;
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

  ispisStatusa(odrzavanje: Zakazivanje) {
    if (odrzavanje.status == "odrzavanje") {
      return "Чека се мајстор";
    }
    else if (odrzavanje.status == "zavrseno") {
      return "Одржавање у току";
    }
    else {
      return "?";
    }
  }

  moguceOdrzavanje(posao: Zakazivanje) {
    let sadasnjost = new Date().getTime();
    let vreme = new Date(posao.poslednjeOdrzavanje).getTime();
    if ((sadasnjost - vreme > 86400000 * 30 * 6) && (posao.kvadraturaBazen > 0 || posao.kvadraturaFontana > 0)) {
      return true;
    }
    else {
      return false;
    }
  }

  zakaziOdrzavanje(posao: Zakazivanje) {
    this.zakazivanjeService.oznaciZaOdrzavanje(posao.korisnik, posao.firma, posao.trenutakZakazivanja).subscribe(m => {
      if (m.msg != "ok") {
        alert("Грешка при слању захтева за одржавање.");
      }
      else {
        alert("Захтев за одржавање успешно послат!");
        this.ngOnInit();
      }
    });
  }

}
