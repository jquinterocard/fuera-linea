import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuardarAreaComponent } from './guardar-area.component';

describe('GuardarAreaComponent', () => {
  let component: GuardarAreaComponent;
  let fixture: ComponentFixture<GuardarAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuardarAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuardarAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
