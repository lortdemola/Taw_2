import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {DataService} from "../../services/data.service";
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,

  ApexPlotOptions,
  ApexXAxis,
  ApexFill,
  ApexLegend, ApexDataLabels, ApexTooltip
} from "ng-apexcharts";
import * as moment from "moment";
import {JsonpInterceptor} from "@angular/common/http";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  fill: ApexFill;
  legend: ApexLegend;
  xaxis: ApexXAxis;
  tooltip: ApexTooltip;
  plotOptions: ApexPlotOptions;
};
@Component({
  selector: 'Home_SITE',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class Home_SITE implements OnInit{

  ngOnInit() {


  }



// 👇️ call function every 3 seconds

  scheduleForm!: FormGroup;
  hmm2!: any ;
  hmmJSON: any[] =[];
  hmmJSON2: any[] =  [
    {

      data: [

        {
          x: "Validation",
          y: [
            new Date(this.currentDateSimple()+" "+" 09:09:00").getTime(),
            new Date( this.currentDateSimple()+" "+" 10:33:00").getTime()
          ]
        }
      ]
    }
  ] ;

  @ViewChild("chart", {static: false}) chart?: ChartComponent;
  public chartOptions!: ChartOptions;

currentDateSimple(){
  let s:any =new Date(Date.now()).getFullYear()+'-'+(new Date(Date.now()).getMonth()+1)+'-'+new Date(Date.now()).getUTCDate();
  return s;
}
  get formArr2() {
    return this.scheduleForm.get('scheduleEntries') as FormArray;
  }
  createContactForm() {
    this.scheduleForm = this.formBuilder.group({
      scheduleEntries: this.formBuilder.array([this.createScheduleEntryFormGroup()])
    });
  }
  createScheduleEntryFormGroup(): FormGroup {
    return this.formBuilder.group({
      dayOfWeek: ['', Validators.required],
      courses: this.formBuilder.array([this.createCourseFormGroup()])
    });
  }
  createCourseFormGroup(): FormGroup {
    return this.formBuilder.group({
      timeFrom: ['',Validators.required],
      timeTo: ['',Validators.required],
      course: ['',[Validators.required,Validators.minLength(2)]]
    });
  }

  former(x: AbstractControl) {
    return x.get('courses') as FormArray;
  }
  constructor(public authService: AuthService,private dataService: DataService,private formBuilder: FormBuilder) {
    this.createContactForm();
    this.createChart();

    this.loadSchedule();

    //this.chart?.updateSeries(this.hmmJSON);

  }
  createChart(){

    this.chartOptions = {
      series: this.hmmJSON2,
      chart: {
        height: 450,

        type: "rangeBar",
        width: 800,
        foreColor:'white',
        zoom:{
          enabled:true,
          type: 'x',
          autoScaleYaxis: true,
        },
        toolbar:{
          tools: { download: true, zoom: false, selection: false, zoomin: false, zoomout: false, pan: false, reset: false },
        }

      },
      plotOptions: {
        bar: {
          horizontal: true,
          barHeight: "80%"
        }
      },
      tooltip:{
        theme:'dark',
        x: {
          show: true,
          format: '',
          formatter : function(val, timestamp) {

      return (Number(moment(val).format("HH"))).toString()+ moment(val).format(":mm");
        },
        },
      },
      xaxis: {
        min:new Date(this.currentDateSimple()+" "+"06:00:00").getTime(),
        max:new Date(this.currentDateSimple()+" "+"21:00:00").getTime(),
        type: undefined,
        labels: {
          formatter: function(val, timestamp) {

            return (Number(moment(val).format("HH"))).toString()+ moment(val).format(":mm");
          }},
      },

      fill: {
        type: "gradient",
        gradient: {
          shade: "light",
          type: "vertical",
          shadeIntensity: 0.25,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [50, 0, 100, 100]
        }
      },
      legend: {
        show:false
      },

    };
  }
  removeDay(index: number): void {
    const coursesArray = this.formArr2 as FormArray;
    coursesArray.removeAt(index);
  }
  loadSchedule() {
    this.dataService.getScheduleByUserId(this.authService.currentUser.userId).subscribe(data => {
      let currentDate: Date=new Date(Date.now());
      this.chartOptions.series.pop()
      this.removeDay(0);
      let temp:any =data as JSON;
      this.hmm2 =temp[0];
      let forms:any;
      for (const datum of this.hmm2['scheduleEntries']) {
        forms = this.formBuilder.group({
          dayOfWeek: [datum['dayOfWeek'], Validators.required],
          courses: this.formBuilder.array([])
        });
        for (const datum2 of datum['courses']) {

          forms.get('courses').push(this.formBuilder.group({
            timeFrom: [datum2['timeFrom'],Validators.required],
            timeTo: [datum2['timeTo'],Validators.required],
            course: [datum2['course'],Validators.required],
          }));

          this.chartOptions.series.push({
            name: datum2['course'],
            data: [
              {
                x: datum['dayOfWeek'],
                y: [
                  new Date(currentDate.getFullYear()+'-'+(currentDate.getMonth()+1)+'-'+currentDate.getUTCDate()+" "+datum2['timeFrom']+":00").getTime(),
                  new Date(currentDate.getFullYear()+'-'+(currentDate.getMonth()+1)+'-'+currentDate.getUTCDate()+" "+datum2['timeTo']+":00").getTime()
                ]
              }
            ]
          })
        }

        this.formArr2.push(forms);
      }


     // @ts-ignore
      document.getElementById("here").style.width = "101px";
    });

  }

}
//<pre style="color: white">{{scheduleForm.value | json}}</pre>
