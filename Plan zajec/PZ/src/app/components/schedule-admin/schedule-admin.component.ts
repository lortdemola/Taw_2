import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormArray, Validators, AbstractControl} from '@angular/forms';
import { ValidatorFn } from '@angular/forms';
import {AuthService} from "../../services/auth.service";
import {DataService} from "../../services/data.service";




@Component({
  selector: 'app-schedule-admin',
  templateUrl: './schedule-admin.component.html',
  styleUrls: ['./schedule-admin.component.css']
})
export class ScheduleAdminComponent implements OnInit {
  hmm!: any ;
  hmm2!: any ;
  hmm3: FormGroup = this.formBuilder.group({});
  scheduleList!: FormGroup;
  weekdays: string[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  formatTimeRange(timeF: HTMLInputElement,timeT: HTMLInputElement,Course: any): string {
    const timeFrom = timeF.value;
    const timeTo = timeT.value;
    return `${timeFrom} - ${timeTo}`;
  }
  constructor(public authService: AuthService,private dataService: DataService,private formBuilder: FormBuilder) {
    this.createContactForm();
    this.loadSchedule();
  }
  ngOnInit(): void {
  }

  createContactForm() {
    this.scheduleList = this.formBuilder.group({
      usersSchedule: this.formBuilder.array([])
    });
  }
  get formArr2() {
    return this.scheduleList.get('usersSchedule') as FormArray;
  }
  deleteSchedule(id:string){
    this.dataService.deleteSchedule(id).subscribe(()=>
    {
      window.location.reload();
    });
  }
  loadSchedule() {
    this.dataService.getAllSchedules().subscribe(data => {

      let temp:any = data as JSON;
      let temp2:any;

      for (const datum of temp) {

        this.authService.getUserById(datum['owner']).subscribe(data2=>
        {
          let schedule: string = '';
          temp2=data2 as JSON;

          for (const sss of datum['scheduleEntries']) {

            schedule += sss['dayOfWeek']+' ,Courses Amount: '+sss['courses'].length+'  |  ';

          }
          this.formArr2.push(this.formBuilder.group({
            name: [temp2['name']],
            scheduleData: [schedule],
            id:[datum['id']]
          }));


        });
      }








    });
  }
  submitSchedule(): void {
    if (this.scheduleList.valid) {

      console.log("ok");
      // Send the form data to your backend API for saving to the database
      // You can use Angular's HttpClient to make the API request
      this.dataService.createSchedule(this.scheduleList.value).subscribe(()=>
      {
        console.log("created");
      });
    }else{
      console.log("!ok");
    }
  }

  protected readonly FormArray = FormArray;
  protected readonly AbstractControl = AbstractControl;

}
