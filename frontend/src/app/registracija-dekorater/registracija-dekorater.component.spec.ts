import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistracijaDekoraterComponent } from './registracija-dekorater.component';

describe('RegistracijaDekoraterComponent', () => {
  let component: RegistracijaDekoraterComponent;
  let fixture: ComponentFixture<RegistracijaDekoraterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistracijaDekoraterComponent]
    });
    fixture = TestBed.createComponent(RegistracijaDekoraterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
