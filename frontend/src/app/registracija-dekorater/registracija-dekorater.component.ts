import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KorisnikService } from '../services/korisnik.service';
import Firma from '../models/firma';
import { FirmaService } from '../services/firma.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-registracija-dekorater',
  templateUrl: './registracija-dekorater.component.html',
  styleUrls: ['./registracija-dekorater.component.css']
})
export class RegistracijaDekoraterComponent implements OnInit {

  korisnickoIme: string = "";
  lozinka: string = "";
  ime: string = "";
  prezime: string = "";
  pol: string = "";
  adresa: string = "";
  telefon: string = "";
  imejl: string = "";
  firma: string = "";
  profilnaSlika: File | null = null;
  slikaPutanja: string = "";

  firme: Firma[] = [];
  tip: string = "dekorater";

  greska: string = "";

  proslaStranica: string = "";

  constructor(private router: Router, private korisnikService: KorisnikService, private firmaService: FirmaService, private http: HttpClient) {}

  ngOnInit(): void {
    this.firmaService.dohvatiFirme().subscribe(f => {
      this.firme = f;
    });
    let stranicaData = localStorage.getItem("proslaStranica")
    if (stranicaData) {
      this.proslaStranica = stranicaData
    }
    if (this.proslaStranica == "registracijaFirma") {
      let data = localStorage.getItem("firma")
      if (data) {
        this.firma = JSON.parse(data).naziv
      }
      
    }
  }

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
    let proslaStranica = localStorage.getItem("proslaStranica")
    const regexLozinka = /^(?=.*[A-Z])(?=(?:.*[a-z]){3})(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;"'<>,.?~`])[a-zA-Z][a-zA-Z\d!@#$%^&*()_+{}\[\]:;"'<>,.?~`]{5,9}$/  
    const regexTelefon = /^\+?[0-9]{1,4}?[0-9]{7,14}$/
    const regexImejl = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (this.korisnickoIme == "" || this.lozinka == "" || this.ime == "" || this.prezime == "" || this.pol == "" || this.adresa == "" || this.telefon == "" || this.imejl == "") {
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
              if (this.proslaStranica == "registracijaFirma") {
                const formData = new FormData();
                if (this.profilnaSlika) {
                  formData.append('profilnaSlika', this.profilnaSlika, this.profilnaSlika.name);
                  this.korisnikService.aploudujSliku(formData).subscribe(s => {
                    let data = {
                      korisnickoIme: this.korisnickoIme,
                      lozinka: this.lozinka,
                      ime: this.ime,
                      prezime: this.prezime,
                      pol: this.pol,
                      adresa: this.adresa,
                      telefon: this.telefon,
                      imejl: this.imejl,
                      firma: this.firma,
                      profilnaSlika: s
                    }
                    localStorage.setItem("dekorater", JSON.stringify(data))
                  });
                
                }
                else {
                  let data = {
                    korisnickoIme: this.korisnickoIme,
                    lozinka: this.lozinka,
                    ime: this.ime,
                    prezime: this.prezime,
                    pol: this.pol,
                    adresa: this.adresa,
                    telefon: this.telefon,
                    imejl: this.imejl,
                    firma: this.firma,
                    profilnaSlika: "podrazumevanaProfilna.jpg"
                  }
                  localStorage.setItem("dekorater", JSON.stringify(data))
                }
                alert("Декоратер успешно регистрован!");
                this.router.navigate([proslaStranica]);
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
                formData.append('firma', this.firma)
                formData.append('tip', this.tip);
                formData.append('odobren', 'ne');
                if (this.profilnaSlika) {
                  formData.append('profilnaSlika', this.profilnaSlika, this.profilnaSlika.name);
                }
                this.korisnikService.registracijaDekoratera(formData).subscribe(m => {
                  if (m.msg !== 'ok') {
                    alert("Грешка при регистрацији!");
                  } 
                  else {
                    let imeIPrezime = this.ime + " " + this.prezime
                    this.firmaService.zaposliUFirmu(this.firma, imeIPrezime).subscribe(m => {
                      if (m.msg !== 'ok') {
                        alert("Грешка при регистрацији!");
                      } 
                      else {
                        alert("Декоратер успешно регистрован!");
                        this.router.navigate([proslaStranica]);
                      }
                    });
                  }
                });
              }
            }
          })
        }
      })
    }
  }

  odustani() {
    if (this.slikaPutanja) {
      this.http.delete(`/delete-image?path=${encodeURIComponent(this.slikaPutanja)}`)
        .subscribe(() => {
          console.log('Privremena slika je obrisana');
        });
    }
    let proslaStranica = localStorage.getItem("proslaStranica")
    this.router.navigate([proslaStranica])
  }

}
