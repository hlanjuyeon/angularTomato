import { Injectable } from '@angular/core';
import { Note } from './note';
import { HttpClient } from '@angular/common/http';
import { map, Subject, Observable, of } from 'rxjs';
import { FormGroup } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class NoteService {
  noteListCount: number;
  noteForm: FormGroup;
  noteListChanged = new Subject<Note[]>();

  protected noteList: Note[] = [];

  constructor(public http: HttpClient) {

  }

  getAllNote(): Observable<Note[]> {
    return this.http
      .get<Note[]>('https://myfirstapp-d9c15-default-rtdb.firebaseio.com/posts.json')
      .pipe(
        map(responseData => {
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              this.noteList.push({ ...responseData[key], no: key });
            }
          }
          return this.noteList;
        })
      );
  }

  getNoteById(id: number): Note {
    return this.noteList.find(note => note.id === id);
  }

  addNote(note: Note) {
    this.noteList.push(note);
    this.noteListChanged.next(this.noteList);
  }

  updateNote(id: number, newNote: Note) {
    const noteIndex = this.noteList.findIndex(note => note.id === id);
    this.noteList[noteIndex] = { ...this.noteList[noteIndex], ...newNote };
    this.noteListChanged.next(this.noteList.slice());
  }

  deleteNote(id: number) {
    let noteIndex = this.noteList.findIndex(note => note.id === id);
    this.noteList.splice(noteIndex, 1);
    this.noteListChanged.next(this.noteList.slice());
  }

  /* GET: 입력된 문구가 이름에 포함된 히어로 목록을 반환합니다. */
  searchNote(term: string): Observable<Note[]> {
    if (!term.trim()) {
      // 입력된 내용이 없으면 빈 배열을 반환합니다.
      return of([]);
    }

    // 쿼리 파라미터를 올바르게 인코딩합니다.
    const encodedTerm = encodeURIComponent(`"${term}"`);
    const url = `https://myfirstapp-d9c15-default-rtdb.firebaseio.com/notes.json?orderBy="title"&equalTo=${encodedTerm}`;

    return this.http.get<{ [key: string]: Note }>(url)
      .pipe(
        map(responseData => {
          const notes: Note[] = [];
          // 노트 목록을 새로 초기화합니다.
          this.noteList = []; // 이전 검색 결과를 초기화
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              // Firebase 키를 노트 객체에 추가합니다.
              this.noteList.push({ ...responseData[key], no: key });
            }
          }
          return this.noteList;
        })
      );
  }
}
