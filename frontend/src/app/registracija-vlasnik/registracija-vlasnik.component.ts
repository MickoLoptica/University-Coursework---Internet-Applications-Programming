import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { KorisnikService } from '../services/korisnik.service';

@Component({
  selector: 'app-registracija-vlasnik',
  templateUrl: './registracija-vlasnik.component.html',
  styleUrls: ['./registracija-vlasnik.component.css']
})
export class RegistracijaVlasnikComponent {

  korisnickoIme: string = "";
  lozinka: string = "";
  ime: string = "";
  prezime: string = "";
  pol: string = "";
  adresa: string = "";
  telefon: string = "";
  imejl: string = "";
  brojKartice: string = "";
  profilnaSlika: File | null = null;

  tip: string = "vlasnik";

  greska: string = "";

  regexDiners: RegExp = /^(300|301|302|303)\d{12}$|^(36|38)\d{13}$/
  regexMasterCard: RegExp = /^5[1-5]\d{14}$/
  regexVisa: RegExp = /^(4539|4556|4916|4532|4929|4485|4716)\d{12}$/

  constructor(private router: Router, private korisnikService: KorisnikService) {}

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      let fajl: File = event.target.files[0];
      let dozvoljeniFormati = ['image/jpeg', 'image/png'];
      if (!dozvoljeniFormati.includes(fajl.type)) {
        this.greska = "Слика није у дозвољеном формату!"
        return;
      }
      let img = new Image();
      img.src = URL.createObjectURL(fajl);
      img.onload = () => {
        let sirina = img.width;
        let visina = img.height;
        if (sirina < 100 || visina < 100) {
          this.greska = 'Слика је мања од минималне величине (100x100 пиксела).';
          this.profilnaSlika = null;
        } 
        else if (sirina > 300 || visina > 300) {
          this.greska = 'Слика је већа од максималне величине (300x300 пиксела).';
          this.profilnaSlika = null;
        } 
        else {
          this.profilnaSlika = fajl;
        }
      };
    }
  }

  registracija() {
    const regexLozinka = /^(?=.*[A-Z])(?=(?:.*[a-z]){3})(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;"'<>,.?~`])[a-zA-Z][a-zA-Z\d!@#$%^&*()_+{}\[\]:;"'<>,.?~`]{5,9}$/  
    const regexTelefon = /^\+?[0-9]{1,4}?[0-9]{7,14}$/
    const regexImejl = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const regexBrojKartice = /^(300|301|302|303|36|38)\d{13}$|^(51|52|53|54|55)\d{14}$|^(4539|4556|4916|4532|4929|4485|4716)\d{12}$/
    if (this.korisnickoIme == "" || this.lozinka == "" || this.ime == "" || this.prezime == "" || this.pol == "" || this.adresa == "" || this.telefon == "" || this.imejl == "" || this.brojKartice == "") {
      this.greska = "Нису унети сви подаци!"
      return;
    }
    else if (!regexLozinka.test(this.lozinka)) {
        this.greska = "Лозинка није у одговарајућем формату!"
        return;
    }
    else if (!regexTelefon.test(this.telefon)) {
      this.greska = "Телефон није у одговарајућем формату!"
      return;
    }
    else if (!regexImejl.test(this.imejl)) {
      this.greska = "Имејл адреса није у одговарајућем формату!"
      return;
    }
    else if (!regexBrojKartice.test(this.brojKartice)) {
      this.greska = "Број Картице није у одговарајћем формату!"
      return;
    }
    else {
      this.korisnikService.dohvatiKorisnika(this.korisnickoIme).subscribe(korisnik => {
        if (korisnik) {
          this.greska = "Корисничко име је заузето!"
          return;
        }
        else {
          this.korisnikService.dohvatiKorisnikaNaOsnovuMejla(this.imejl).subscribe(mejl => {
            if (mejl) {
              this.greska = "Овај имејл већ има кориснички налог!"
              return;
            }
            else {
              const formData = new FormData();
              formData.append('korisnickoIme', this.korisnickoIme);
              formData.append('lozinka', this.lozinka);
              formData.append('ime', this.ime);
              formData.append('prezime', this.prezime);
              formData.append('pol', this.pol);
              formData.append('adresa', this.adresa);
              formData.append('telefon', this.telefon);
              formData.append('imejl', this.imejl);
              formData.append('brojKartice', this.brojKartice);
              formData.append('tip', this.tip);
              formData.append('odobren', 'ne');
              if (this.profilnaSlika) {
                formData.append('profilnaSlika', this.profilnaSlika, this.profilnaSlika.name);
              }
              this.korisnikService.registracijaVlasnika(formData).subscribe(m => {
                if (m.msg !== 'ok') {
                  alert("Грешка при регистрацији!");
                } 
                else {
                  alert("Захтев за регистрацију послат!");
                  this.router.navigate(['']);
                }
              });
            }
          });
        }
      });
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

  odustani() {
    this.router.navigate([''])
  }

}
