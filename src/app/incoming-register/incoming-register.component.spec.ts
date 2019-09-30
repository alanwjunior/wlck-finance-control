import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomingRegisterComponent } from './incoming-register.component';

describe('IncomingRegisterComponent', () => {
  let component: IncomingRegisterComponent;
  let fixture: ComponentFixture<IncomingRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncomingRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomingRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
