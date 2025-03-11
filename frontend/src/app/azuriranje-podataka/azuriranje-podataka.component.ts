import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Korisnik from '../models/korisnik';
import { KorisnikService } from '../services/korisnik.service';
import Firma from '../models/firma';
import { FirmaService } from '../services/firma.service';

@Component({
  selector: 'app-azuriranje-podataka',
  templateUrl: './azuriranje-podataka.component.html',
  styleUrls: ['./azuriranje-podataka.component.css']
})
export class AzuriranjePodatakaComponent implements OnInit {

  korisnickoIme: string = "";
  ime: string = "";
  prezime: string = "";
  adresa: string = "";
  telefon: string = "";
  imejl: string = "";
  tip: string = "";
  brojKartice: string = "";
  firma: string = "";
  profilnaSlika: string = "";
  novaProfilnaSlika: File | null = null;

  greska: string = "";

  regexDiners: RegExp = /^(300|301|302|303)\d{12}$|^(36|38)\d{13}$/
  regexMasterCard: RegExp = /^5[1-5]\d{14}$/
  regexVisa: RegExp = /^(4539|4556|4916|4532|4929|4485|4716)\d{12}$/

  korisnik: Korisnik = new Korisnik();
  firme: Firma[] = [];

  constructor(private router: Router, private korisnikService: KorisnikService, private firmaService: FirmaService) {}

  ngOnInit(): void {
    let zaAzuriranje = localStorage.getItem("azuriranje");
    zaAzuriranje = zaAzuriranje == null ? "" : zaAzuriranje;
    this.korisnikService.dohvatiKorisnika(zaAzuriranje).subscribe(k => {
      this.korisnik = k;
      this.korisnickoIme = this.korisnik.korisnickoIme;
      this.ime = this.korisnik.ime;
      this.prezime = this.korisnik.prezime;
      this.adresa = this.korisnik.adresa;
      this.telefon = this.korisnik.telefon;
      this.imejl = this.korisnik.imejl;
      this.tip = this.korisnik.tip;
      this.brojKartice = this.korisnik.brojKartice;
      this.firma = this.korisnik.firma;
      this.profilnaSlika = this.korisnik.profilnaSlika;
    })
    this.firmaService.dohvatiFirme().subscribe(firme => {
      this.firme = firme;
    })
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.novaProfilnaSlika = event.target.files[0];
    }
  }

  dohvatiSlikuKartice() {
    if (this.regexDiners.test(this.brojKartice)) {
      return 'http://localhost:4000/pictures/source/diners.jpg';
    } else if (this.regexMasterCard.test(this.brojKartice)) {
      return 'http://localhost:4000/pictures/source/mastercard.jpg';
    } else if (this.regexVisa.test(this.brojKartice)) {
      return 'http://localhost:4000/pictures/source/visa.jpg';
    }
    return null;
  }

  azurirajPodatke() {
    const regexTelefon = /^\+?[0-9]{1,4}?[0-9]{7,14}$/
    const regexImejl = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const regexBrojKartice = /^(300|301|302|303|36|38)\d{13}$|^(51|52|53|54|55)\d{14}$|^(4539|4556|4916|4532|4929|4485|4716)\d{12}$/
    if (this.korisnickoIme == "" || this.ime == "" || this.prezime == "" || this.adresa == "" || this.telefon == "" || this.imejl == "" || this.brojKartice == "") {
      this.greska = "Нису унети сви подаци!"
    }
    else if (!regexTelefon.test(this.telefon)) {
      this.greska = "Телефон није у одговарајућем формату!"
    }
    else if (!regexImejl.test(this.imejl)) {
      this.greska = "Имејл адреса није у одговарајућем формату!"
    }
    else if (!regexBrojKartice.test(this.brojKartice) && this.tip == "vlasnik") {
      this.greska = "Број Картице није у одговарајћем формату!"
    }
    else {
      this.korisnikService.dohvatiKorisnikaNaOsnovuMejla(this.imejl).subscribe(k => {
        if (k) {
          if (k.imejl != this.imejl) {
            this.greska = "Овај имејл већ има кориснички налог!"
            return;
          }
          else {
            const formData = new FormData();
            formData.append('tip', this.tip);
            formData.append('korisnickoIme', this.korisnickoIme);
            formData.append('ime', this.ime);
            formData.append('prezime', this.prezime);
            formData.append('adresa', this.adresa);
            formData.append('telefon', this.telefon);
            formData.append('imejl', this.imejl);
            if (this.tip == "vlasnik") {
              formData.append('brojKartice', this.brojKartice);
            }
            else if (this.tip == "dekorater") {
              formData.append("firma", this.firma);
            }
            if (this.novaProfilnaSlika) {
              formData.append('profilnaSlika', this.novaProfilnaSlika, this.novaProfilnaSlika.name);
            }
            else {
              formData.append('profilnaSlika', this.profilnaSlika);
            }
            this.korisnikService.azurirajPodatke(formData).subscribe(m => {
              if (m.msg !== 'ok') {
                alert("Грешка при ажурирању података!");
              } 
              else {
                alert("Подаци су успешно ажурирани!");
                let ulogovan = localStorage.getItem("ulogovan");
                ulogovan = ulogovan == null ? "" : ulogovan;
                this.korisnikService.dohvatiKorisnika(ulogovan).subscribe(k => {
                  this.router.navigate([k.tip]);
                });
              }
            });
          }
        }
        else {
          const formData = new FormData();
          formData.append('tip', this.tip);
          formData.append('korisnickoIme', this.korisnickoIme);
          formData.append('ime', this.ime);
          formData.append('prezime', this.prezime);
          formData.append('adresa', this.adresa);
          formData.append('telefon', this.telefon);
          formData.append('imejl', this.imejl);
          if (this.tip == "vlasnik") {
            formData.append('brojKartice', this.brojKartice);
          }
          else if (this.tip == "dekorater") {
            formData.append("firma", this.firma);
          }
          if (this.novaProfilnaSlika) {
            formData.append('profilnaSlika', this.novaProfilnaSlika, this.novaProfilnaSlika.name);
          }
          else {
            formData.append('profilnaSlika', this.profilnaSlika);
          }
          this.korisnikService.azurirajPodatke(formData).subscribe(m => {
            if (m.msg !== 'ok') {
              alert("Грешка при ажурирању података!");
            } 
            else {
              alert("Подаци су успешно ажурирани!");
              let ulogovan = localStorage.getItem("ulogovan");
              ulogovan = ulogovan == null ? "" : ulogovan;
              this.korisnikService.dohvatiKorisnika(ulogovan).subscribe(k => {
                this.router.navigate([k.tip]);
              });
            }
          });
        }
      });
    }
  }

  odustani() {
    let ulogovan = localStorage.getItem("ulogovan");
    ulogovan = ulogovan == null ? "" : ulogovan;
    this.korisnikService.dohvatiKorisnika(ulogovan).subscribe(k => {
      this.router.navigate([k.tip]);
    })
  }

}
