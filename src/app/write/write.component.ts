import { Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NoteService } from '../note.service';
import { ActivatedRoute, Params, Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-write',
  templateUrl: './write.component.html',
  styleUrl: './write.component.css'
})
export class WriteComponent implements OnInit {
  id: number;
  editMode = false;
  noteForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private noteService: NoteService,
    private router: Router,
    private http: HttpClient) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          let noteListCount = +params['noteListCount']; // 문자열을 숫자로 변환
          if(isNaN(noteListCount)) {
            this.id = 0;
          } else {
            this.id = ++noteListCount;
          }
          this.initForm();
        }
      );
  }

  onSubmit() {
    this.noteService.addNote(this.noteForm.value);
    this.http
    .post('https://myfirstapp-d9c15-default-rtdb.firebaseio.com/posts.json', this.noteForm.value)
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

    let noteId = this.id;
    let noteTitle = '';
    let noteContent = '';
    let noteWriteday = today;

    this.noteForm = new FormGroup({
      'id' : new FormControl(noteId, Validators.required),
      'title' : new FormControl(noteTitle, Validators.required),
      'content' : new FormControl(noteContent, Validators.required),
      'writeday' : new FormControl(noteWriteday, Validators.required)
    })
  }

  onClearNote() {
    this.noteForm.reset();
    this.editMode = false;
    this.router.navigate(['/']);
  }
}  
