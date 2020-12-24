
import { Component, OnInit } from '@angular/core';

// amCharts imports
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/resources/services/auth.service';
import { AppComponent } from 'src/app/app.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit{

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

    this.httpClient.get('http://localhost:3333/dashboard').subscribe((data)=> {
      this.data = data;
      console.log(this.data);
    });   

    
  }
  public openQuestion(id: number): void {
    this.router.navigate(['/answer', id]);
  }

}
