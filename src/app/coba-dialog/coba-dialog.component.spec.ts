import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CobaDialogComponent } from './coba-dialog.component';

describe('CobaDialogComponent', () => {
  let component: CobaDialogComponent;
  let fixture: ComponentFixture<CobaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CobaDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CobaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
