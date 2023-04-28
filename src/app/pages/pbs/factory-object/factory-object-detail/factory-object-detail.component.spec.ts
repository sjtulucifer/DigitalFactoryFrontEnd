import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactoryObjectDetailComponent } from './factory-object-detail.component';

describe('FactoryObjectDetailComponent', () => {
  let component: FactoryObjectDetailComponent;
  let fixture: ComponentFixture<FactoryObjectDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FactoryObjectDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FactoryObjectDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
