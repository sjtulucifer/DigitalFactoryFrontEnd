import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactoryTypeTreeComponent } from './factory-type-tree.component';

describe('FactoryTypeTreeComponent', () => {
  let component: FactoryTypeTreeComponent;
  let fixture: ComponentFixture<FactoryTypeTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FactoryTypeTreeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FactoryTypeTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
