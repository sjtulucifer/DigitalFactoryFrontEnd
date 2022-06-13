import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessPermissionDetailComponent } from './access-permission-detail.component';

describe('AccessPermissionDetailComponent', () => {
  let component: AccessPermissionDetailComponent;
  let fixture: ComponentFixture<AccessPermissionDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccessPermissionDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessPermissionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
