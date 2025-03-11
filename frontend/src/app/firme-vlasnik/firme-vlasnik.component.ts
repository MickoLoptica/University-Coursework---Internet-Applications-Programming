import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirmaService } from '../services/firma.service';
import Firma from '../models/firma';
import { ZakazivanjeService } from '../services/zakazivanje.service';
import Zakazivanje from '../models/zakazivanje';

@Component({
  selector: 'app-firme-vlasnik',
  templateUrl: './firme-vlasnik.component.html',
  styleUrls: ['./firme-vlasnik.component.css']
})
export class FirmeVlasnikComponent implements OnInit {

  firme: Firma[] = [];
  zakazivanja: Zakazivanje[] = [];

  pretragaNaziv: string = "";
  pretragaAdresa: string = "";

  parametarSortiranja: string = "";
  neopadajuceSortiranje: boolean = true;

  constructor(private router: Router, private firmaService: FirmaService, private zakazivanjeService: ZakazivanjeService) {}

  ngOnInit(): void {
    this.firmaService.dohvatiFirme().subscribe(f => {
      this.firme = f;
    });
    this.zakazivanjeService.dohvatiOcenjenaZakazivanja().subscribe(z => {
      this.zakazivanja = z;
    });
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

  izracunajOcenu(firma: Firma) {
    if (this.zakazivanja.length > 0) {
      let ocena = 0;
      let brojOcena = 0
      for (let z of this.zakazivanja) {
        if (z.firma == firma.naziv && z.ocena > 0) {
          ocena += z.ocena;
          brojOcena++;
        }
      }
      if (brojOcena > 0) {
        ocena /= brojOcena;
        return ocena;
      }
      else {
        return 0
      }
    }
    else {
      return 0;
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
      if (this.parametarSortiranja == "naziv" || this.parametarSortiranja == "adresa") {
        let poljeA = ""
        let poljeB = ""
        if (this.parametarSortiranja == "naziv") {
          poljeA = a.naziv
          poljeB = b.naziv
        }
        else if (this.parametarSortiranja == "adresa") {
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
      }
      else {
        let ocenaA = this.izracunajOcenu(a);
        let ocenaB = this.izracunajOcenu(b);
        if (ocenaA > ocenaB) {
          return this.neopadajuceSortiranje ? -1 : 1;
        }
        if (ocenaA < ocenaB) {
          return this.neopadajuceSortiranje ? 1 : -1;
        }
        return 0;
      }
    })
  }

  nacrtajZvezdice(firma: Firma) {
    let zvezdice = "";
    let ocena = this.izracunajOcenu(firma);
    for (let i = 0; i < Math.floor(ocena); i++) {
      zvezdice += '★';
    }
    for (let i = Math.floor(ocena); i < 5; i++) {
      zvezdice += '☆';
    }
    return zvezdice;
  }

  profilFirme(naziv: string) {
    localStorage.setItem("profilFirme", naziv)
    this.router.navigate(["firma"])
  }

}
