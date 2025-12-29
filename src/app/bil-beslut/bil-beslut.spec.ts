import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BilBeslut } from './bil-beslut';

describe('BilBeslut', () => {
  let component: BilBeslut;
  let fixture: ComponentFixture<BilBeslut>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BilBeslut]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BilBeslut);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
