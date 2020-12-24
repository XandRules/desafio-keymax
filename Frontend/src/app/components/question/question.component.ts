import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { AuthService } from 'src/app/resources/services/auth.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  public data : any

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
    private app: AppComponent,
    private router: Router) { }

  ngOnInit(): void {
    console.log('Dashboard') 
    
    this.app.load();

    console.log(this.authService.role);

    this.httpClient.get('http://localhost:3333/question').subscribe((data)=> {
      this.data = data;
      console.log(this.data);
    });   

    
  }

}
