import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistracijaFirmaComponent } from './registracija-firma.component';

describe('RegistracijaFirmaComponent', () => {
  let component: RegistracijaFirmaComponent;
  let fixture: ComponentFixture<RegistracijaFirmaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistracijaFirmaComponent]
    });
    fixture = TestBed.createComponent(RegistracijaFirmaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
