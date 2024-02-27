import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinationNotFoundComponent } from './destination-not-found.component';

describe('DestinationNotFoundComponent', () => {
  let component: DestinationNotFoundComponent;
  let fixture: ComponentFixture<DestinationNotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DestinationNotFoundComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DestinationNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
