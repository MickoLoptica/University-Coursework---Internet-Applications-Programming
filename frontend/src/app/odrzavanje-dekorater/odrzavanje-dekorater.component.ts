import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Korisnik from '../models/korisnik';
import { KorisnikService } from '../services/korisnik.service';
import Zakazivanje from '../models/zakazivanje';
import { ZakazivanjeService } from '../services/zakazivanje.service';

@Component({
  selector: 'app-odrzavanje-dekorater',
  templateUrl: './odrzavanje-dekorater.component.html',
  styleUrls: ['./odrzavanje-dekorater.component.css']
})
export class OdrzavanjeDekoraterComponent implements OnInit {

  korisnik: Korisnik = new Korisnik();
  zahtevi: Zakazivanje[] = [];
  trenutnoVreme: string = "";

  odrzavaSe: boolean = false;
  izabranoOdrzavanje: Zakazivanje = new Zakazivanje();

  vremeOdrzavanja: string = "";

  constructor(private router: Router, private korisnikService: KorisnikService, private zakazivanjeService: ZakazivanjeService) {}

  ngOnInit(): void {
    let ulogovan = localStorage.getItem('ulogovan');
    if (ulogovan) {
      this.korisnikService.dohvatiKorisnika(ulogovan).subscribe(k => {
        this.korisnik = k;
        this.zakazivanjeService.dohvatiOdrzavanjaFirme(this.korisnik.firma).subscribe(o => {
          this.zahtevi = o;
        });
      });
    }
    let sadasnjost = new Date();
    this.trenutnoVreme = sadasnjost.toISOString().slice(0, 16);
  }

  prihvatiOdrzavanje(zahtev: Zakazivanje) {
    this.odrzavaSe = true;
    this.izabranoOdrzavanje = zahtev;
    this.vremeOdrzavanja = "";
  }

  odbijOdrzavanje(zahtev: Zakazivanje) {
    this.zakazivanjeService.odbijOdrzavanje(zahtev.korisnik, zahtev.firma, zahtev.trenutakZakazivanja).subscribe(m => {
      if (m.msg != 'ok') {
        alert("Грешка при обради захтева!")
      } else {
        alert("Одржавање успешно одбијено!")
        this.ngOnInit();
      }
    })
  }

  odrzi() {
    this.zakazivanjeService.obaviOdrzavanje(this.izabranoOdrzavanje.korisnik, this.izabranoOdrzavanje.firma, this.izabranoOdrzavanje.trenutakZakazivanja, this.vremeOdrzavanja).subscribe(m => {
      if (m.msg != 'ok') {
        alert("Грешка при обради захтева!")
      } else {
        alert("Одржавање успешно заказано!")
        this.ngOnInit();
      }
    })
  }

  odustani() {
    this.odrzavaSe = false;
    this.izabranoOdrzavanje = new Zakazivanje();
    this.vremeOdrzavanja = "";
  }

}
