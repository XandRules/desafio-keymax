import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { QuestionAnswerComponent } from './components/question-answer/question-answer.component';
import { QuestionResultComponent } from './components/question-result/question-result.component';
import { QuestionComponent } from './components/question/question.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuardService } from './resources/services/auth-guard.service';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  { path: 'login', component: LogInComponent },
  { path: 'questions', component: QuestionComponent },
  { path: 'register/question', component: RegisterComponent },
  { path: 'question/answer/:id', component: QuestionAnswerComponent },
  { path: 'question/result/:id', component: QuestionResultComponent },
  {
    path: 'dashboard', component : DashboardComponent
  },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
