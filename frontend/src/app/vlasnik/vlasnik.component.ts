import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Korisnik from '../models/korisnik';
import { KorisnikService } from '../services/korisnik.service';

@Component({
  selector: 'app-vlasnik',
  templateUrl: './vlasnik.component.html',
  styleUrls: ['./vlasnik.component.css']
})
export class VlasnikComponent implements OnInit {

  constructor(private router: Router, private korisnikService: KorisnikService) {}
  
  korisnik: Korisnik = new Korisnik();
  
  ngOnInit(): void {
    let ulogovan = localStorage.getItem("ulogovan");
    ulogovan = ulogovan == null ? "" : ulogovan;
    this.korisnikService.dohvatiKorisnika(ulogovan).subscribe(k => {
      this.korisnik = k;
    })
  }

  azuriranje() {
    localStorage.setItem("azuriranje", this.korisnik.korisnickoIme)
    this.router.navigate(['azuriranjePodataka'])
  }

  odjava() {
    localStorage.clear()
    this.router.navigate([''])
  }

}
