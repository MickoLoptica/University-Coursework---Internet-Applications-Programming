import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeniDekoraterComponent } from './meni-dekorater.component';

describe('MeniDekoraterComponent', () => {
  let component: MeniDekoraterComponent;
  let fixture: ComponentFixture<MeniDekoraterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MeniDekoraterComponent]
    });
    fixture = TestBed.createComponent(MeniDekoraterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
