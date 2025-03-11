import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KorisnikService } from '../services/korisnik.service';

@Component({
  selector: 'app-promena-lozinke',
  templateUrl: './promena-lozinke.component.html',
  styleUrls: ['./promena-lozinke.component.css']
})
export class PromenaLozinkeComponent implements OnInit {

  constructor(private router: Router, private korisnikService: KorisnikService) {}
  korisnickoIme: string =  "";
  staraLozinka: string = "";
  novaLozinka: string = "";
  ponovljenaNovaLozinka: string = "";
  greska: string = "";
  ngOnInit(): void {
  }

  promeni() {
    const regexLozinka = /^(?=.*[A-Z])(?=(?:.*[a-z]){3})(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;"'<>,.?~`])[a-zA-Z][a-zA-Z\d!@#$%^&*()_+{}\[\]:;"'<>,.?~`]{5,9}$/
    if (this.novaLozinka !== this.ponovljenaNovaLozinka) {
      this.greska = "Не слажу се два уноса нове лозинке!"
    }
    else if (!regexLozinka.test(this.novaLozinka)) {
      this.greska = "Нова лозинка није у одговарајућем формату!"
    }
    else {
      this.korisnikService.promeniLozinku(this.korisnickoIme, this.staraLozinka, this.novaLozinka).subscribe(m => {
        if (m.msg != "ok") {
          alert("Грешка! Лозинка није промењена.")
        }
        else {
          alert("Лозинка је успешно промењена!")
          this.router.navigate([''])
        }
      })
    }
  }

  odustani() {
    this.router.navigate([''])
  }


}
