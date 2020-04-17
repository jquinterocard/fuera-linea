import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarAreaComponent } from './buscar-area.component';

describe('BuscarAreaComponent', () => {
  let component: BuscarAreaComponent;
  let fixture: ComponentFixture<BuscarAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscarAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
