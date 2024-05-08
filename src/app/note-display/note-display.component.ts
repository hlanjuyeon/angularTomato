import { Component, Input } from '@angular/core';

import { Note } from '../note';

@Component({
  selector: 'app-note-display',
  templateUrl: './note-display.component.html',
  styleUrl: './note-display.component.css'
})
export class NoteDisplayComponent {
  @Input() note: Note;
}
