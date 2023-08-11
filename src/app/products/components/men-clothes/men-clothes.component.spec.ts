import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenClothesComponent } from './men-clothes.component';

describe('MenClothesComponent', () => {
  let component: MenClothesComponent;
  let fixture: ComponentFixture<MenClothesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenClothesComponent]
    });
    fixture = TestBed.createComponent(MenClothesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
