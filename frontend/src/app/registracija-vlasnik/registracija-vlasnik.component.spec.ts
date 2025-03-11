import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistracijaVlasnikComponent } from './registracija-vlasnik.component';

describe('RegistracijaVlasnikComponent', () => {
  let component: RegistracijaVlasnikComponent;
  let fixture: ComponentFixture<RegistracijaVlasnikComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistracijaVlasnikComponent]
    });
    fixture = TestBed.createComponent(RegistracijaVlasnikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
