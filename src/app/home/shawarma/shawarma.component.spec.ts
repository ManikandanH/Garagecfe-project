import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShawarmaComponent } from './shawarma.component';

describe('ShawarmaComponent', () => {
  let component: ShawarmaComponent;
  let fixture: ComponentFixture<ShawarmaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShawarmaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShawarmaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
