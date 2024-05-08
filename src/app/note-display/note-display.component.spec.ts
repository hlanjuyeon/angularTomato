import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteDisplayComponent } from './note-display.component';

describe('NoteDetailComponent', () => {
  let component: NoteDisplayComponent;
  let fixture: ComponentFixture<NoteDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NoteDisplayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NoteDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
