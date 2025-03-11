import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-meni-dekorater',
  templateUrl: './meni-dekorater.component.html',
  styleUrls: ['./meni-dekorater.component.css']
})
export class MeniDekoraterComponent {

  constructor (private router: Router) {}

  proveriAktivnuStranicu(ruta: string) {
    return this.router.url == ruta;
  }

}
