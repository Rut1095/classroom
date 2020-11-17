import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ClassComponent } from './components/class/class.component';
import { ShowCameraComponent } from './components/show-camera/show-camera.component';
import { RegisterComponent } from './components/register/register.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { ViewClassComponent } from './components/view-class/view-class.component';
import { ViewUserComponent } from './components/view-user/view-user.component';
import { LessonslistComponent } from './components/lessonslist/lessonslist.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import { LessonComponent } from './components/lesson/lesson.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
// import { FormControl, Validators } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { UserCameraComponent } from './components/user-camera/user-camera.component';
import { TeacherLessonListComponent } from './components/teacher-lesson-list/teacher-lesson-list.component';
import { ChatComponent } from './components/chat/chat.component';
// @import {}  from '~@angular/material/core/theming/all-theme
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCardModule} from '@angular/material/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { LoaderComponent } from './components/loader/loader.component';
import { DocumentsListComponent } from './components/documents-list/documents-list.component';
import { DocumentAddComponent } from './components/document-add/document-add.component';
import {MatTableModule} from '@angular/material/table';
import { DocumentsAttachmentComponent } from './components/documents-attachment/documents-attachment.component';

// import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ShowCameraComponent,
    ClassComponent,
    RegisterComponent,
    ViewClassComponent,
    ViewUserComponent,
    LessonslistComponent,
    LessonComponent,
    UserCameraComponent,
    TeacherLessonListComponent,
    ChatComponent,
    LoaderComponent,
    DocumentsListComponent,
    DocumentAddComponent,
    DocumentsAttachmentComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule ,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatExpansionModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatTableModule
    // MatProgressSpinnerModule
    // FormControl,
    // Validators
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
