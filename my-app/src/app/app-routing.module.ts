import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { ViewClassComponent } from './components/view-class/view-class.component';
import { HomeComponent } from './components/home/home.component';
import { ViewUserComponent } from './components/view-user/view-user.component';
import { LessonComponent } from './lesson/lesson.component';
import { LessonslistComponent } from './components/lessonslist/lessonslist.component';


const routes: Routes = [   
  {
    path:"register",
    component:RegisterComponent
  },
  {
    path:"classroom",
    component:ViewClassComponent,
    children:[
      {
        path:"lesson/:id",
        component:LessonComponent
      }
      
    ]
  },
  {
    path:"lessons-list",
    component:LessonslistComponent
  },
  {
    path:"user",
    component:ViewUserComponent
  },
  
  {
    path:"",
    component:HomeComponent
  }
  
  // ,{
  //   path:"",
  //   redirectTo:"classroom",
  //   pathMatch:"full"
  // }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
