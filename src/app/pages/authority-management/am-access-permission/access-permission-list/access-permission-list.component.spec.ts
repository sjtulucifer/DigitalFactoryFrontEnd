import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessPermissionListComponent } from './access-permission-list.component';

describe('AccessPermissionListComponent', () => {
  let component: AccessPermissionListComponent;
  let fixture: ComponentFixture<AccessPermissionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccessPermissionListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessPermissionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
