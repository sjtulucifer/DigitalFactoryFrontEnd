import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactoryObjectTreeComponent } from './factory-object-tree.component';

describe('FactoryObjectTreeComponent', () => {
  let component: FactoryObjectTreeComponent;
  let fixture: ComponentFixture<FactoryObjectTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FactoryObjectTreeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FactoryObjectTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
