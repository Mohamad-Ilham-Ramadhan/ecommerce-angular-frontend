import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CobaComponent } from './coba.component';

describe('CobaComponent', () => {
  let component: CobaComponent;
  let fixture: ComponentFixture<CobaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CobaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CobaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
