import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { NoteDisplayComponent } from './note-display/note-display.component';
import { SearchComponent } from './search/search.component';
import { SelectComponent } from './select/select.component';
import { SortComponent } from './sort/sort.component';
import { WriteComponent } from './write/write.component';

import { NoteService } from './note.service';
import { BrowserModule } from '@angular/platform-browser';
import routeConfig from './routes';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    NoteDisplayComponent,
    SearchComponent,
    SelectComponent,
    SortComponent,
    WriteComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routeConfig),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [NoteService],
  bootstrap: [AppComponent]
})
export class AppModule { }

