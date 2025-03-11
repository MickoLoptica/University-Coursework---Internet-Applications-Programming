import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { VlasnikComponent } from './vlasnik/vlasnik.component';
import { DekoraterComponent } from './dekorater/dekorater.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { AdministratorComponent } from './administrator/administrator.component';
import { RegistracijaVlasnikComponent } from './registracija-vlasnik/registracija-vlasnik.component';
import { PromenaLozinkeComponent } from './promena-lozinke/promena-lozinke.component';
import { AzuriranjePodatakaComponent } from './azuriranje-podataka/azuriranje-podataka.component';
import { FirmeVlasnikComponent } from './firme-vlasnik/firme-vlasnik.component';
import { ZakazivanjaVlasnikComponent } from './zakazivanja-vlasnik/zakazivanja-vlasnik.component';
import { OdrzavanjeVlasnikComponent } from './odrzavanje-vlasnik/odrzavanje-vlasnik.component';
import { ZakazivanjaDekoraterComponent } from './zakazivanja-dekorater/zakazivanja-dekorater.component';
import { OdrzavanjeDekoraterComponent } from './odrzavanje-dekorater/odrzavanje-dekorater.component';
import { StatistikaComponent } from './statistika/statistika.component';
import { RegistracijaDekoraterComponent } from './registracija-dekorater/registracija-dekorater.component';
import { RegistracijaFirmaComponent } from './registracija-firma/registracija-firma.component';
import { FirmaComponent } from './firma/firma.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'vlasnik', component: VlasnikComponent },
  { path: 'dekorater', component: DekoraterComponent },
  { path: 'adminlogin', component: AdminloginComponent },
  { path: 'administrator', component: AdministratorComponent },
  { path: 'registracijaVlasnik', component: RegistracijaVlasnikComponent },
  { path: 'promenaLozinke', component: PromenaLozinkeComponent},
  { path: 'azuriranjePodataka', component: AzuriranjePodatakaComponent },
  { path: 'firmeVlasnik', component: FirmeVlasnikComponent },
  { path: 'zakazivanjaVlasnik', component: ZakazivanjaVlasnikComponent },
  { path: 'odrzavanjeVlasnik', component: OdrzavanjeVlasnikComponent },
  { path: 'zakazivanjaDekorater', component: ZakazivanjaDekoraterComponent },
  { path: 'odrzavanjeDekorater', component: OdrzavanjeDekoraterComponent },
  { path: 'statistika', component: StatistikaComponent },
  { path: 'registracijaDekorater', component: RegistracijaDekoraterComponent },
  { path: 'registracijaFirma', component: RegistracijaFirmaComponent },
  { path: 'firma', component: FirmaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
