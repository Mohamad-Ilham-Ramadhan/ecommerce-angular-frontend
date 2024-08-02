import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomModalContentComponent } from './custom-modal-content.component';

describe('CustomModalContentComponent', () => {
  let component: CustomModalContentComponent;
  let fixture: ComponentFixture<CustomModalContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomModalContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomModalContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
