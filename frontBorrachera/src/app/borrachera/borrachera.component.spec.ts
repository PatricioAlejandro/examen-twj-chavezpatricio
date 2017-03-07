import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BorracheraComponent } from './borrachera.component';

describe('BorracheraComponent', () => {
  let component: BorracheraComponent;
  let fixture: ComponentFixture<BorracheraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BorracheraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BorracheraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
