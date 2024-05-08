import { Component } from '@angular/core';
import { Note } from '../note';
import { NoteService } from '../note.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  noteList: Note[] = [];
  noteListCount: number;

  constructor(
    private noteService: NoteService,
  ) {
    this.noteService.getAllNote()
    .subscribe(posts => {
      console.log(posts);
      this.noteList = posts;
      this.noteListCount = this.noteList.length;
    })
  }

  // ngOnInit(): void {
  //   // 'refreshed'라는 키로 localStorage에서 값을 가져옵니다.
  //   const isRefreshed = localStorage.getItem('refreshed');

  //   // 값이 없다면, 페이지를 새로고침하지 않았다는 의미입니다.
  //   if (!isRefreshed) {
  //     localStorage.setItem('refreshed', 'true'); // 새로고침 했다는 값을 저장합니다.
  //     window.location.reload(); // 페이지를 새로고침합니다.
  //   } else {
  //     localStorage.removeItem('refreshed'); // 다음 로드에 대비하여 값을 삭제합니다.
  //   }
  // }

}