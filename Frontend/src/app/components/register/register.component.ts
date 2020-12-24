import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RegisterQuestion } from 'src/app/resources/models/RegisterQuestion';
import { AlertService } from 'src/app/resources/services/alert.service';
import { AuthService } from 'src/app/resources/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  Roles: any = ['Administrador', 'Técnico', 'Proprietário'];

  registerQuestion: any;
  token: any;

  constructor(private httpClient: HttpClient,
    private alertService: AlertService,
    private authService: AuthService) { }

  ngOnInit() {

    this.registerQuestion = new RegisterQuestion();
    this.token = this.authService.token;
  }


  public registerNewQuestion(): void {
    this.httpClient.post("http://localhost:3333/question",
      this.registerQuestion).subscribe(data => {
        console.log(data);
        this.registerQuestion = null;
        console.log(this.registerQuestion);
        this.alertService.success('Cadastro Realizado!', 'Emquete criada com sucesso!');
        this.registerQuestion = null;
      },
        error => {
          this.alertService.error('Oops!', error.error.message);
        }
      );
  }

}