import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { VlasnikComponent } from './vlasnik/vlasnik.component';
import { DekoraterComponent } from './dekorater/dekorater.component';
import { AdministratorComponent } from './administrator/administrator.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { RegistracijaVlasnikComponent } from './registracija-vlasnik/registracija-vlasnik.component';
import { PromenaLozinkeComponent } from './promena-lozinke/promena-lozinke.component';
import { MeniVlasnikComponent } from './meni-vlasnik/meni-vlasnik.component';
import { FirmeVlasnikComponent } from './firme-vlasnik/firme-vlasnik.component';
import { ZakazivanjaVlasnikComponent } from './zakazivanja-vlasnik/zakazivanja-vlasnik.component';
import { OdrzavanjeVlasnikComponent } from './odrzavanje-vlasnik/odrzavanje-vlasnik.component';
import { MeniDekoraterComponent } from './meni-dekorater/meni-dekorater.component';
import { ZakazivanjaDekoraterComponent } from './zakazivanja-dekorater/zakazivanja-dekorater.component';
import { OdrzavanjeDekoraterComponent } from './odrzavanje-dekorater/odrzavanje-dekorater.component';
import { StatistikaComponent } from './statistika/statistika.component';
import { AzuriranjePodatakaComponent } from './azuriranje-podataka/azuriranje-podataka.component';
import { RegistracijaDekoraterComponent } from './registracija-dekorater/registracija-dekorater.component';
import { RegistracijaFirmaComponent } from './registracija-firma/registracija-firma.component';
import { FirmaComponent } from './firma/firma.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    VlasnikComponent,
    DekoraterComponent,
    AdministratorComponent,
    AdminloginComponent,
    RegistracijaDekoraterComponent,
    PromenaLozinkeComponent,
    MeniVlasnikComponent,
    FirmeVlasnikComponent,
    ZakazivanjaVlasnikComponent,
    OdrzavanjeVlasnikComponent,
    MeniDekoraterComponent,
    ZakazivanjaDekoraterComponent,
    OdrzavanjeDekoraterComponent,
    StatistikaComponent,
    AzuriranjePodatakaComponent,
    RegistracijaVlasnikComponent,
    RegistracijaFirmaComponent,
    FirmaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
