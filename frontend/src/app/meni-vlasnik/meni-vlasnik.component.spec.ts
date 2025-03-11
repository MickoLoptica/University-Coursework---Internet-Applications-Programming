import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeniVlasnikComponent } from './meni-vlasnik.component';

describe('MeniVlasnikComponent', () => {
  let component: MeniVlasnikComponent;
  let fixture: ComponentFixture<MeniVlasnikComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MeniVlasnikComponent]
    });
    fixture = TestBed.createComponent(MeniVlasnikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
