import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyGrillDialogComponent } from './my-grill-dialog.component';

describe('MyGrillDialogComponent', () => {
  let component: MyGrillDialogComponent;
  let fixture: ComponentFixture<MyGrillDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyGrillDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyGrillDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
