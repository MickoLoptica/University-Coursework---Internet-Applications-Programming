import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KorisnikService } from '../services/korisnik.service';

@Component({
  selector: 'app-login',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent implements OnInit {

  constructor(private router: Router, private korisnikService: KorisnikService) { }
  korisnickoIme: string = "";
  lozinka: string = "";
  greska: string = "";
  ngOnInit(): void {
  }

  prijava() {
    if (this.korisnickoIme == "" || this.lozinka == "") {
      this.greska = "Нисте унели све податке!";
      return;
    }
    this.greska = "";
    this.korisnikService.prijava(this.korisnickoIme, this.lozinka).subscribe(k => {
      if (k) {
        if (k.tip === 'administrator') {
          localStorage.setItem("ulogovan", k.korisnickoIme)
          this.router.navigate([k.tip])
        }
        else {
          this.greska = "Не можете да се улогујете преко овог сервиса!"
        }
      } else {
        this.greska = "Лоши подаци!";
        return;
      }
    })

  }
}