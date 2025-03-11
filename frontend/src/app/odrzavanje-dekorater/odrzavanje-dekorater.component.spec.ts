import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OdrzavanjeDekoraterComponent } from './odrzavanje-dekorater.component';

describe('OdrzavanjeDekoraterComponent', () => {
  let component: OdrzavanjeDekoraterComponent;
  let fixture: ComponentFixture<OdrzavanjeDekoraterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OdrzavanjeDekoraterComponent]
    });
    fixture = TestBed.createComponent(OdrzavanjeDekoraterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
