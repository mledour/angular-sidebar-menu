import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StubComponentComponent } from './stub-component.component';

describe('StubComponentComponent', () => {
  let component: StubComponentComponent;
  let fixture: ComponentFixture<StubComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StubComponentComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StubComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
