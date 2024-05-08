import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';

import { Note } from '../note';
import { NoteService } from '../note.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrl: './select.component.css'
})
export class SelectComponent implements OnInit {
  id: number;
  noteList: Note[] = [];
  editMode = false;
  noteForm: FormGroup;
  @Input() note: Note;

  constructor(
    private noteService: NoteService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      console.log(this.editMode);
      this.loadPosts();
    });
  }

  loadPosts() {
    this.noteService.getAllNote()
    .subscribe(posts => {
      console.log(posts);
      this.noteList = posts;
      this.note = this.noteService.getNoteById(this.id);
      this.initForm();
    })
  }

  onSubmit() {
    this.noteService.updateNote(this.id, this.noteForm.value);
    const noteToUpdate = this.noteList.find(note => note.id === this.id);
    this.http
    .put(`https://myfirstapp-d9c15-default-rtdb.firebaseio.com/posts/${noteToUpdate.no
    }.json`, this.noteForm.value)
    .subscribe(responseData => {
      console.log(responseData);
      window.location.reload();
    });
    this.router.navigate(['/']);
  }

  private initForm() {
    const newDate = new Date();
    let year = newDate.getFullYear();
    let month = ('0' + (newDate.getMonth() + 1)).slice(-2);
    let day = ('0' + newDate.getDate()).slice(-2);
    let hours = ('0' + newDate.getHours()).slice(-2); 
    let minutes = ('0' + newDate.getMinutes()).slice(-2);
    let seconds = ('0' + newDate.getSeconds()).slice(-2); 

    let today = year + "/" + month + "/" + day + "/ " + hours + ":" + minutes + ":" + seconds;

    let noteId = 0;
    let noteTitle = '';
    let noteContent = '';
    let noteUpdateday = '';

    if(this.editMode) {
      noteId = this.note.id;
      noteTitle = this.note.title;
      noteContent = this.note.content;
      noteUpdateday = today + " update";
    }

    this.noteForm = new FormGroup({
      'id' : new FormControl(noteId, Validators.required),
      'title' : new FormControl(noteTitle, Validators.required),
      'content' : new FormControl(noteContent, Validators.required),
      'updateday' : new FormControl(noteUpdateday, Validators.required)
    })
  }

  onDeleteNote() {
    this.noteService.deleteNote(this.id);
    const noteToDelete = this.noteList.find(note => note.id === this.id);
    this.http
    .delete(`https://myfirstapp-d9c15-default-rtdb.firebaseio.com/posts/${noteToDelete.no
    }.json`)
    .subscribe(responseData => {
      console.log(responseData);
      window.location.reload();
    });
    this.router.navigate(['/']);
  }
}
