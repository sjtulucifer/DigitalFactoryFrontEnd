import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactoryTypeDetailComponent } from './factory-type-detail.component';

describe('FactoryTypeDetailComponent', () => {
  let component: FactoryTypeDetailComponent;
  let fixture: ComponentFixture<FactoryTypeDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FactoryTypeDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FactoryTypeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
