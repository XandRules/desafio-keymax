import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RegisterQuestion } from 'src/app/resources/models/RegisterQuestion';
import { AlertService } from 'src/app/resources/services/alert.service';

@Component({
  selector: 'app-question-answer',
  templateUrl: './question-answer.component.html',
  styleUrls: ['./question-answer.component.css']
})
export class QuestionAnswerComponent implements OnInit {

  public order: string = '';
  public data: any;
  public question_title!: string;
  public answer_a: string = '';
  public answer_b: string = '';
  public answer_c: string = '';
  public answer_d: string = '';
  public id: number = 0;

  constructor(private route: ActivatedRoute,
    private httpClient: HttpClient,
    private alertService: AlertService) { }

  ngOnInit(): void {
    this.route.params
    .subscribe(params => {
      console.log(params); // { order: "id" }

      this.order = params["id"];

      this.httpClient.get(`http://localhost:3333/question/${this.order}`).subscribe((data)=> {
        this.data = data[0];
        this.question_title = this.data.question_title;
        this.answer_a = this.data.answer_a;
        this.answer_b = this.data.answer_b;
        this.answer_c = this.data.answer_c;
        this.answer_d = this.data.answer_d;
        this.id = this.data.id;
        console.log(this.data);
      }); 
      
    }
  );
  }

  public doAnswer(): void{
    const answer = document.querySelector('input[name="answer"]:checked')?.id;

    const answer_question = this.data[answer!];

    if(answer_question == undefined){
      this.alertService.error('Oops!', 'Você deve escolher uma das opções!');
    }else{
      let data ={
        answer_select: answer_question,
        question_id : this.data.id
      }
  
      this.httpClient.post('http://localhost:3333/answer', data).subscribe((data) =>{
        console.log(data);
        this.alertService.success('Obrigado pela participação', 'Sua resposta foi armazenada!');
      },
      error => {
        this.alertService.error('Oops!', error.error.message);
      })
    }
  }

}
