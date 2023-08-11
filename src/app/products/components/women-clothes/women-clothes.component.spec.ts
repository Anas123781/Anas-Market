import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WomenClothesComponent } from './women-clothes.component';

describe('WomenClothesComponent', () => {
  let component: WomenClothesComponent;
  let fixture: ComponentFixture<WomenClothesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WomenClothesComponent]
    });
    fixture = TestBed.createComponent(WomenClothesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
