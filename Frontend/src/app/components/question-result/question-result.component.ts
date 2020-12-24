import { Component, Inject, NgZone, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

// amCharts imports
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/resources/services/auth.service';
import { AppComponent } from 'src/app/app.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-question-result',
  templateUrl: './question-result.component.html',
  styleUrls: ['./question-result.component.css']
})

export class QuestionResultComponent implements OnInit{

  public data : any
  public order: string = '';

  constructor(
    @Inject(PLATFORM_ID) private platformId, 
    private zone: NgZone,
    private httpClient: HttpClient,
    private authService: AuthService,
    private app: AppComponent,
    private route: ActivatedRoute) { }


    ngOnInit(): void {
      this.route.params
      .subscribe(params => {
        console.log(params); // { order: "id" }
  
        this.order = params["id"];
  
        this.httpClient.get(`http://localhost:3333/answer/result/${this.order}`).subscribe((data)=> {
          this.data = data;
          
          this.barGraph(this.data);
          console.log(this.data);
        }); 
        
      }
    );
    }

  private chart!: am4charts.XYChart;  

  // Run the function only in the browser
  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }

  barGraph(dado){

    console.log('dado',dado);

    let chart = am4core.create("chartdiv", am4charts.XYChart);
    chart.scrollbarX = new am4core.Scrollbar();

    // Add data
    chart.data = dado;

    // Create axes
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "answer_select";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 30;
    categoryAxis.renderer.labels.template.horizontalCenter = "right";
    categoryAxis.renderer.labels.template.verticalCenter = "middle";
    categoryAxis.renderer.labels.template.rotation = 270;
    categoryAxis.tooltip!.disabled = true;
    categoryAxis.renderer.minHeight = 110;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.minWidth = 50;

    // Create series
    let series = chart.series.push(new am4charts.ColumnSeries());
    series.sequencedInterpolation = true;
    series.dataFields.valueY = "count";
    series.dataFields.categoryX = "answer_select";
    series.tooltipText = "[{categoryX}: bold]{valueY}[/]";
    series.columns.template.strokeWidth = 0;

    series.tooltip!.pointerOrientation = "vertical";

    series.columns.template.column.cornerRadiusTopLeft = 10;
    series.columns.template.column.cornerRadiusTopRight = 10;
    series.columns.template.column.fillOpacity = 0.8;

    // on hover, make corner radiuses bigger
    let hoverState = series.columns.template.column.states.create("hover");
    hoverState.properties.cornerRadiusTopLeft = 0;
    hoverState.properties.cornerRadiusTopRight = 0;
    hoverState.properties.fillOpacity = 1;

    series.columns.template.adapter.add("fill", function(fill, target) {
      return chart.colors.getIndex(target.dataItem!.index);
    });

    // Cursor
    chart.cursor = new am4charts.XYCursor();
  }

  ngOnDestroy() {
    // Clean up chart when the component is removed
    this.browserOnly(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }
}

