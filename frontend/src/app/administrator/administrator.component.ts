import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Korisnik from '../models/korisnik';
import { KorisnikService } from '../services/korisnik.service';
import Firma from '../models/firma';
import { FirmaService } from '../services/firma.service';
import { ZakazivanjeService } from '../services/zakazivanje.service';
import Zakazivanje from '../models/zakazivanje';

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.css']
})
export class AdministratorComponent implements OnInit {

  constructor(private router: Router, private korisnikService: KorisnikService, private firmaService: FirmaService, private zakazivanjeService: ZakazivanjeService) {}

  vlasnici: Korisnik[] = [];
  dekorateri: Korisnik[] = [];
  firme: Firma[] = [];
  zakazivanja: Zakazivanje[] = [];
  zahtevi: Korisnik[] = [];

  ngOnInit(): void {
    this.korisnikService.dohvatiVlasnike().subscribe(v => {
      this.vlasnici = v;
    })
    this.korisnikService.dohvatiDekoratere().subscribe(d => {
      this.dekorateri = d;
    })
    this.korisnikService.dohvatiZahteve().subscribe(z => {
      this.zahtevi = z;
    })
    this.firmaService.dohvatiFirme().subscribe(f => {
      this.firme = f;
    })
    this.zakazivanjeService.dohvatiOcenjenaZakazivanja().subscribe(z => {
      this.zakazivanja = z;
    })
  }

  odjava() {
    localStorage.clear()
    this.router.navigate(['adminlogin'])
  }

  aktivirajKorisnika(korisnik: Korisnik) {
    this.korisnikService.aktivirajKorisnika(korisnik.korisnickoIme).subscribe(m => {
      if (m.msg != 'ok') {
        alert("Грешка при обради захтева!")
      } else {
        alert("Налог успешно активиран!")
        this.ngOnInit();
      }
    });
  }

  deaktivirajKorisnika(korisnik: Korisnik) {
    this.korisnikService.deaktivirajKorisnika(korisnik.korisnickoIme).subscribe(m => {
      if (m.msg != 'ok') {
        alert("Грешка при обради захтева!")
      } else {
        alert("Налог успешно деактивиран!")
        this.ngOnInit();
      }
    });
  }

  blokirajDekoratera(dekorater: Korisnik) {
    this.korisnikService.blokirajDekoratera(dekorater.korisnickoIme).subscribe(m => {
      if (m.msg != 'ok') {
        alert("Грешка при обради захтева!")
      } else {
        alert("Налог успешно блокиран!")
        this.ngOnInit();
      }
    });
  }

  odblokirajDekoratera(dekorater: Korisnik) {
    this.korisnikService.odblokirajDekoratera(dekorater.korisnickoIme).subscribe(m => {
      if (m.msg != 'ok') {
        alert("Грешка при обради захтева!")
      } else {
        alert("Налог успешно одблокиран!")
        this.ngOnInit();
      }
    });
  }

  azuriranje(korisnik: Korisnik) {
    localStorage.setItem("azuriranje", korisnik.korisnickoIme)
    this.router.navigate(['azuriranjePodataka'])
  }

  dodajDekoratera() {
    localStorage.setItem("proslaStranica", "administrator")
    this.router.navigate(['registracijaDekorater'])
  }

  izracunajOcenu(firma: Firma) {
    let ocena = 0;
    let brojOcena = 0
    for (let z of this.zakazivanja) {
      if (z.firma == firma.naziv) {
        ocena += z.ocena;
        brojOcena++;
      }
    }
    if (brojOcena > 0) {
      ocena /= brojOcena;
      return ocena;
    }
    else {
      return 0;
    }
  }

  dodajFirmu() {
    this.router.navigate(['registracijaFirma'])
  }


  odobriZahtev(zahtev: Korisnik) {
    this.korisnikService.aktivirajKorisnika(zahtev.korisnickoIme).subscribe(m => {
      if (m.msg != 'ok') {
        alert("Грешка при обради захтева!")
      } 
      else {
        this.korisnikService.odobriVlasnika(zahtev.korisnickoIme).subscribe(m => {
          if (m.msg != 'ok') {
            alert("Грешка при обради захтева!")
          } 
          else {
            alert("Налог успешно одобрен!")
            this.ngOnInit();
          }
        });
      }
    });
  }

  odbaciZahtev(zahtev: Korisnik) {
    this.korisnikService.deaktivirajKorisnika(zahtev.korisnickoIme).subscribe(m => {
      if (m.msg != 'ok') {
        alert("Грешка при обради захтева!")
      } else {
        alert("Налог успешно одбачен!")
        this.ngOnInit();
      }
    });
  }

}
