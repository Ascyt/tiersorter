import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultValueListComponent } from './default-value-list.component';

describe('DefaultValueListComponent', () => {
  let component: DefaultValueListComponent;
  let fixture: ComponentFixture<DefaultValueListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefaultValueListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DefaultValueListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
