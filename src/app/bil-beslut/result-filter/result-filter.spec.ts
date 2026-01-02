import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultFilter } from './result-filter';

describe('ResultFilter', () => {
  let component: ResultFilter;
  let fixture: ComponentFixture<ResultFilter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultFilter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultFilter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
