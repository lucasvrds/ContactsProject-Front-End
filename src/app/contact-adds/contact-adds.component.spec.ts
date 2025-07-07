import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactAddsComponent } from './contact-adds.component';

describe('ContactAddsComponent', () => {
  let component: ContactAddsComponent;
  let fixture: ComponentFixture<ContactAddsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContactAddsComponent]
    });
    fixture = TestBed.createComponent(ContactAddsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
