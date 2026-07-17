import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyMeasurements } from './body-measurements';

describe('BodyMeasurements', () => {
  let component: BodyMeasurements;
  let fixture: ComponentFixture<BodyMeasurements>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BodyMeasurements]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BodyMeasurements);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
