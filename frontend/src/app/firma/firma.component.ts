import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirmaService } from '../services/firma.service';
import Firma from '../models/firma';
import * as l from 'leaflet'
import { ZakazivanjeService } from '../services/zakazivanje.service';
import Zakazivanje from '../models/zakazivanje';

@Component({
  selector: 'app-firma',
  templateUrl: './firma.component.html',
  styleUrls: ['./firma.component.css']
})
export class FirmaComponent implements OnInit {

  korisnik: string = "";
  firma: Firma = new Firma();

  korak: number = 1;
  datumVreme: string = "";
  kvadraturaUkupno: number = 0;
  tip: string = "";
  kvadraturaZelenilo: number = 0;
  opis: string = "";
  usluge: string[] = [];
  kvadraturaBazen: number = 0;
  kvadraturaNamestaj: number = 0;
  kvadraturaFontana: number = 0;
  brojStolova: number = 0;
  brojStolica: number = 0;
  izgledBaste: any[] = [];

  zakazivanja: Zakazivanje[] = [];

  trenutnoVreme: string = "";
  greska: string = "";

  constructor(private router: Router, private firmaService: FirmaService, private zakazivanjeService: ZakazivanjeService) {}

  ngOnInit(): void {
    let ulogovan = localStorage.getItem("ulogovan");
    if (ulogovan) {
      this.korisnik = ulogovan;
    }
    let firma = localStorage.getItem("profilFirme");
    firma = firma == null ? "" : firma;
    this.firmaService.dohvatiFirmu(firma).subscribe(f => {
      this.firma = f;
      let map = l.map('map').setView([f.lokacija.geografskaSirina, f.lokacija.geografskaDuzina], 13);
      l.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
      }).addTo(map);
      if (this.firma.lokacija.geografskaSirina && this.firma.lokacija.geografskaDuzina) {
        let cioda = l.marker([this.firma.lokacija.geografskaSirina, this.firma.lokacija.geografskaDuzina]).addTo(map);
        map.setView([this.firma.lokacija.geografskaSirina, this.firma.lokacija.geografskaDuzina], 13);
      }
      this.zakazivanjeService.dohvatiOcenjenaZakazivanjaFirme(this.firma.naziv).subscribe(z => {
        this.zakazivanja = z;
      });
    })
    let sadasnjost = new Date();
    this.trenutnoVreme = sadasnjost.toISOString().slice(0, 16);
  }

  nazad() {
    this.router.navigate(["firmeVlasnik"])
  }

  naredniKorak() {
    if (this.korak == 1) {
      if (this.datumVreme == "" || this.kvadraturaUkupno <= 0 || this.tip == "") {
        this.greska = "Нисте унели све податке!";
        return;
      } 
      else {
        let datumVremeObjekat = new Date(this.datumVreme);
        let mesec = datumVremeObjekat.getMonth();
        let dan = datumVremeObjekat.getDate();
        if (this.firma.odmorPocetak.mesec > this.firma.odmorKraj.mesec) {
          if ((mesec > this.firma.odmorPocetak.mesec || mesec < this.firma.odmorKraj.mesec) || (mesec == this.firma.odmorPocetak.mesec && dan >= this.firma.odmorPocetak.dan) || (mesec == this.firma.odmorKraj.mesec && dan <= this.firma.odmorKraj.dan)) {
            this.greska = "Фирма је у изабраном тренутку на годишњем одмору. Молимо Вас, изаберите друго време.";
            return;
          }
        } 
        else {
          if ((mesec > this.firma.odmorPocetak.mesec && mesec < this.firma.odmorKraj.mesec) || (mesec == this.firma.odmorPocetak.mesec && dan >= this.firma.odmorPocetak.dan) || (mesec == this.firma.odmorKraj.mesec && dan <= this.firma.odmorKraj.dan)) {
            this.greska = "Фирма је у изабраном тренутку на годишњем одмору. Молимо Вас, изаберите друго време.";
            return;
          }
        }
      }
      this.korak++;
      this.greska = "";
    }
  }

  prethodniKorak() {
    this.kvadraturaZelenilo = 0;
    this.opis = "";
    this.usluge = [];
    this.kvadraturaBazen = 0;
    this.kvadraturaNamestaj = 0;
    this.kvadraturaFontana = 0;
    this.brojStolova = 0;
    this.brojStolica = 0;
    this.korak--;
    this.greska = "";
  }

  onCheckboxChange(cekirano: boolean, naziv: string) {
    if (cekirano) {
        this.usluge.push(naziv);
    } 
    else {
        let indeks = this.usluge.indexOf(naziv);
        if (indeks > -1) {
            this.usluge.splice(indeks, 1);
        }
    }
  }

  onFileSelected(event: any) {
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.onload = (e: any) => {
      let data = JSON.parse(e.target.result);
      this.izgledBaste = data.oblici;
      this.prikaziOblike();
    };
    reader.readAsText(file);
  }

  prikaziOblike() {
    let vrstaKanvasa = "";
    if (this.tip == "privatna") {
      vrstaKanvasa = "izgledBastePrivatna"
    }
    else {
      vrstaKanvasa = "izgledBasteRestoranska"
    }
    const kanvas = document.getElementById(vrstaKanvasa) as HTMLCanvasElement;
    const ctx = kanvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, kanvas.width, kanvas.height);
      this.izgledBaste.forEach(oblik => {
        ctx.fillStyle = oblik.boja;
        switch (oblik.tip) {
          case 'pravougaonik':
            ctx.fillRect(oblik.x, oblik.y, oblik.sirina, oblik.visina);
            break;
          case 'krug':
            ctx.beginPath();
            ctx.arc(oblik.x, oblik.y, oblik.poluprecnik, 0, Math.PI * 2);
            ctx.fill();
            break;
        }
      });
    }
  }

  zakazivanjePrivatno() {
    if (this.kvadraturaZelenilo + this.kvadraturaBazen + this.kvadraturaNamestaj > this.kvadraturaUkupno) {
      this.greska = "Унете квадратуре се не поклапају!";
      return;
    }
    else if (this.kvadraturaZelenilo < 0 || this.kvadraturaBazen < 0 || this.kvadraturaNamestaj < 0) {
      this.greska = "Квадратура не може бити негативан број!";
      return;
    }
    else if (!this.izgledBaste || this.izgledBaste.length == 0) {
      this.greska = "Молимо Вас да приложите JSON фајл са изгледом баште";
    }
    else {
      this.zakazivanjeService.zakazivanjePrivatno(this.korisnik, this.firma.naziv, this.datumVreme, this.kvadraturaUkupno, this.tip, this.opis, this.usluge, this.kvadraturaZelenilo, this.kvadraturaBazen, this.kvadraturaNamestaj, this.izgledBaste).subscribe(m => {
        if (m.msg !== 'ok') {
          alert("Грешка при регистрацији!");
        } 
        else {
          alert("Уређивање баште успешно заказано!");
          this.datumVreme = "";
          this.kvadraturaUkupno = 0;
          this.tip = "";
          this.kvadraturaZelenilo = 0;
          this.opis = "";
          this.usluge = [];
          this.kvadraturaBazen = 0;
          this.kvadraturaNamestaj = 0;
          this.kvadraturaFontana = 0;
          this.brojStolova = 0;
          this.brojStolica = 0;
          this.korak = 1;
          this.router.navigate(['firma']);
        }
      });
    }
  }

  zakazivanjeRestoransko() {
    if (this.brojStolova == 0 || this.brojStolica == 0) {
      this.greska = "Нису унети сви подаци!";
      return;
    }
    else if (!this.izgledBaste || this.izgledBaste.length == 0) {
      this.greska = "Молимо Вас да приложите JSON фајл са изгледом баште";
    }
    else if (this.kvadraturaZelenilo + this.kvadraturaFontana > this.kvadraturaUkupno) {
      this.greska = "Унете квадратуре се не поклапају!";
      return;
    }
    else if (this.kvadraturaZelenilo < 0 || this.kvadraturaFontana < 0) {
      this.greska = "Квадратура не може бити негативан број!";
      return;
    }
    else {
      this.zakazivanjeService.zakazivanjeRestoransko(this.korisnik, this.firma.naziv, this.datumVreme, this.kvadraturaUkupno, this.tip, this.opis, this.usluge, this.kvadraturaZelenilo, this.kvadraturaFontana, this.brojStolova, this.brojStolica, this.izgledBaste).subscribe(m => {
        if (m.msg !== 'ok') {
          alert("Грешка при регистрацији!");
        } 
        else {
          alert("Уређивање баште успешно заказано!");
          this.datumVreme = "";
          this.kvadraturaUkupno = 0;
          this.tip = "";
          this.kvadraturaZelenilo = 0;
          this.opis = "";
          this.usluge = [];
          this.kvadraturaBazen = 0;
          this.kvadraturaNamestaj = 0;
          this.kvadraturaFontana = 0;
          this.brojStolova = 0;
          this.brojStolica = 0;
          this.korak = 1;
          this.router.navigate(['firma']);
        }
      });
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

}
