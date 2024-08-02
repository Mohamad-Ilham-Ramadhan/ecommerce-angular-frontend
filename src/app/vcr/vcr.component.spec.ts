import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VcrComponent } from './vcr.component';

describe('VcrComponent', () => {
  let component: VcrComponent;
  let fixture: ComponentFixture<VcrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VcrComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VcrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
