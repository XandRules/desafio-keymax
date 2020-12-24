import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-question-result',
  templateUrl: './question-result.component.html',
  styleUrls: ['./question-result.component.css']
})
export class QuestionResultComponent implements OnInit {

  public order!: string;
  public data!: any;

  constructor(private route: ActivatedRoute,
    private httpClient: HttpClient) { }

  ngOnInit() {
    this.route.params
      .subscribe(params => {
        console.log(params); // { order: "id" }

        this.order = params['id'];

        this.httpClient.get(`http://localhost:3333/question/${this.order}`).subscribe((data)=> {
          this.data = data;
          console.log(this.data);
        }); 
        
      }
    );
  }

}
