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
          this.data = data[0];
          
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

    var chart = am4core.create("chartdiv", am4charts.XYChart);

    chart.data = dado;

    chart.padding(40, 40, 40, 40);

    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = 'Perfil';
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 30;
    categoryAxis.renderer.labels.template.horizontalCenter = "right";
    categoryAxis.renderer.labels.template.verticalCenter = "middle";
    categoryAxis.renderer.labels.template.rotation = 270;
    categoryAxis.tooltip!.disabled = true;
    categoryAxis.renderer.minHeight = 110;

    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.min = 0;
    valueAxis.extraMax = 0.1;
    //valueAxis.rangeChangeEasing = am4core.ease.linear;
    //valueAxis.rangeChangeDuration = 1500;

    var series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.categoryX = 'Perfil';
    series.dataFields.valueY = "Total";
    series.tooltipText = "{valueY.value}"
    series.columns.template.strokeOpacity = 0;
    series.columns.template.column.cornerRadiusTopRight = 10;
    series.columns.template.column.cornerRadiusTopLeft = 10;

    var labelBullet = series.bullets.push(new am4charts.LabelBullet());
    labelBullet.label.verticalCenter = "bottom";
    labelBullet.label.dy = -10;
    labelBullet.label.text = "{values.valueY.workingValue.formatNumber('#.')}";
    series.tooltip!.pointerOrientation = "horizontal";

    chart.zoomOutButton.disabled = true;

    // as by default columns of the same series are of the same color, we add adapter which takes colors from chart.colors color set
    series.columns.template.adapter.add("fill", function (fill, target) {
    return chart.colors.getIndex(target.dataItem!.index);
    });

    categoryAxis.sortBySeries = series;
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

