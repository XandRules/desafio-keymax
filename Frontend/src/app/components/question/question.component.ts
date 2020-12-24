import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { AlertService } from 'src/app/resources/services/alert.service';
import { AuthService } from 'src/app/resources/services/auth.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  public data : any
  public isLogged: any

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
    private app: AppComponent,
    private alertService: AlertService,
    private router: Router) { }

  ngOnInit(): void {
    console.log('Dashboard') 
    
    this.app.load();

    console.log(this.authService.role);

    this.httpClient.get('http://localhost:3333/question').subscribe((data)=> {
      this.data = data;
      console.log(this.data);
    });  

    this.isLogged = this.authService.isAuthenticated();
    
  }

  public doSurveyEnd(id,survey_end): void{


    let dataQuestion = {
      survey_end: !survey_end
    }

    this.httpClient.put(`http://localhost:3333/question/${id}`, dataQuestion).subscribe((data) =>{
      console.log(data);
      if(survey_end){
        this.alertService.success('Feito', 'Enquete Reaberta!');
      }else{
        this.alertService.success('Feito', 'Enquete Finalizada!');
      }
      this.ngOnInit();
    },
    error => {
      this.alertService.error('Oops!', error.error.message);
    })
  }

  public doDelete(id): void{
    this.httpClient.delete(`http://localhost:3333/question/${id}`).subscribe((data) =>{
      console.log(data);
      this.alertService.success('Feito', 'Enquete Apagada!');
      this.ngOnInit();
    },
    error => {
      this.alertService.error('Oops!', error.error.message);
    })
  }

}
