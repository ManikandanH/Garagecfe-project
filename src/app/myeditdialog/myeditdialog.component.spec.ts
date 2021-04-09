import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyeditdialogComponent } from './myeditdialog.component';

describe('MyeditdialogComponent', () => {
  let component: MyeditdialogComponent;
  let fixture: ComponentFixture<MyeditdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyeditdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyeditdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
