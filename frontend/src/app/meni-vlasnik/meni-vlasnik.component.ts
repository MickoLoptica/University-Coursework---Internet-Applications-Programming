import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-meni-vlasnik',
  templateUrl: './meni-vlasnik.component.html',
  styleUrls: ['./meni-vlasnik.component.css']
})
export class MeniVlasnikComponent {

  constructor (private router: Router) {}

  proveriAktivnuStranicu(ruta: string) {
    return this.router.url == ruta;
  }

}
