import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KorisnikService } from '../services/korisnik.service';
import Firma from '../models/firma';
import { FirmaService } from '../services/firma.service';
import Zakazivanje from '../models/zakazivanje';
import { ZakazivanjeService } from '../services/zakazivanje.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  korisnickoIme: string = "";
  lozinka: string = "";
  greska: string = "";
  brojDekorisanihBasti: number = 0;
  brojVlasnika: number = 0;
  brojDekoratera: number = 0;
  firme: Firma[] = [];

  pretragaNaziv: string = "";
  pretragaAdresa: string = "";

  parametarSortiranja: string = "";
  neopadajuceSortiranje: boolean = true;

  zavrseneBaste: Zakazivanje[] = [];

  prvaSlika: string = "";
  drugaSlika: string = "";
  trecaSlika: string = "";

  constructor(private router: Router, private korisnikService: KorisnikService, private firmaService: FirmaService, private zakazivanjeService: ZakazivanjeService) { }
  
  ngOnInit(): void {
    this.korisnikService.dohvatiBrojDekorisanihBasti().subscribe(brojDekorisanihBasti => {
      this.brojDekorisanihBasti = brojDekorisanihBasti
    });
    this.korisnikService.dohvatiBrojVlasnika().subscribe(brojVlasnika => {
      this.brojVlasnika = brojVlasnika
    });
    this.korisnikService.dohvatiBrojDekoratera().subscribe(brojDekoratera => {
      this.brojDekoratera = brojDekoratera
    });
    this.firmaService.dohvatiFirme().subscribe(f => {
      this.firme = f;
    });
    this.zakazivanjeService.dohvatiZavrsenaZakazivanja().subscribe(z => {
      this.zavrseneBaste = z;
      this.brojDekorisanihBasti = this.zavrseneBaste.length;
      this.zavrseneBaste.sort((a, b) => {
        return new Date(b.datumVreme).getTime() - new Date(a.datumVreme).getTime();
      });
      if (this.zavrseneBaste.length > 0) {
        this.prvaSlika = this.zavrseneBaste[0].slikaPosla || "";
      }
      if (this.zavrseneBaste.length > 1) {
        this.drugaSlika = this.zavrseneBaste[1].slikaPosla || "";
      }
      if (this.zavrseneBaste.length > 2) {
        this.trecaSlika = this.zavrseneBaste[2].slikaPosla || "";
      }
    })
  }

  prijava() {
    if (this.korisnickoIme == "" || this.lozinka == "") {
      this.greska = "Нисте унели све податке!";
      return;
    }
    this.greska = "";
    this.korisnikService.prijava(this.korisnickoIme, this.lozinka).subscribe(k => {
      if (k) {
        if (k.deaktiviran === 'da') {
          this.greska = "Овај налог је деактивиран од стране администратора."
        }
        else if (k.odobren === 'ne') {
          this.greska = "Налог још није одобрио администратор. Молимо Вас, сачекајте."
        }
        else if (k.tip === 'administrator') {
          this.greska = 'Не можете да се улогујете преко овог сервиса!'
        }
        else {
          localStorage.setItem("ulogovan", k.korisnickoIme)
          if (k.tip == "dekorater") {
            this.zakazivanjeService.dohvatiZakazivanjaDekoratera(k.korisnickoIme).subscribe(zakazivanja => {
              if (zakazivanja.length > 0) {
                let sadasnjost = new Date().getTime();
                for (let z of zakazivanja) {
                  let zakazano = new Date(z.datumVreme).getTime();
                  if (sadasnjost - zakazano > 86400000) {
                    this.korisnikService.blokirajDekoratera(k.korisnickoIme).subscribe(m => {
                      if (m.msg != 'ok') {} 
                      else {}
                    });
                  }
                }
              }
            });
          }
          this.router.navigate([k.tip])
        }
      } else {
        this.greska = "Лоши подаци!";
        return;
      }
    })
  }


  registracija() {
    this.router.navigate(['registracijaVlasnik'])
  }

  promeniLozinku() {
    this.router.navigate(['promenaLozinke'])
  }

  sortirajPo(parametar: string) {
    if (this.parametarSortiranja == parametar) {
      this.neopadajuceSortiranje = !this.neopadajuceSortiranje;
    }
    else {
      this.parametarSortiranja = parametar
      this.neopadajuceSortiranje = true
    }
  }

  sortirajFirme(): Firma[] {
    let filtriraneFirme = this.firme;
    if (this.pretragaNaziv) {
      filtriraneFirme = filtriraneFirme.filter(firma => 
        firma.naziv.toLowerCase().includes(this.pretragaNaziv.toLowerCase()));
    }
    if (this.pretragaAdresa) {
      filtriraneFirme = filtriraneFirme.filter(firma => 
        firma.adresa.toLowerCase().includes(this.pretragaAdresa.toLowerCase()));
    }
    return filtriraneFirme.sort((a, b) => {
      let poljeA = ""
      let poljeB = ""
      if (this.parametarSortiranja == "naziv") {
        poljeA = a.naziv
        poljeB = b.naziv
      }
      else {
        poljeA = a.adresa
        poljeB = b.adresa
      }
      if (poljeA < poljeB) {
        return this.neopadajuceSortiranje ? -1 : 1;
      }
      if (poljeA > poljeB) {
        return this.neopadajuceSortiranje ? 1 : -1;
      }
      return 0;
    })
  }

  brojBastiDanas() {
    let broj = 0;
    let sadasnjost = new Date().getTime();
    for (let zakazivanje of this.zavrseneBaste) {
      let zakazano = new Date(zakazivanje.datumVreme).getTime();
      if (sadasnjost - zakazano < 86400000) {
        broj++;
      }
    }
    return broj;
  }

  brojBastiNedelja() {
    let broj = 0;
    let sadasnjost = new Date().getTime();
    for (let zakazivanje of this.zavrseneBaste) {
      let zakazano = new Date(zakazivanje.datumVreme).getTime();
      if (sadasnjost - zakazano < 86400000 * 7) {
        broj++;
      }
    }
    return broj;
  }

  brojBastiMesec() {
    let broj = 0;
    let sadasnjost = new Date().getTime();
    for (let zakazivanje of this.zavrseneBaste) {
      let zakazano = new Date(zakazivanje.datumVreme).getTime();
      if (sadasnjost - zakazano < 86400000 * 30) {
        broj++;
      }
    }
    return broj;
  }

}