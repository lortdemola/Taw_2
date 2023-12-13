import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormArray, Validators, AbstractControl, FormControl} from '@angular/forms';
import { ValidatorFn } from '@angular/forms';
import {AuthService} from "../../services/auth.service";
import {DataService} from "../../services/data.service";
import {Router} from "@angular/router";
@Component({
  selector: 'app-schedule-form-edit',
  templateUrl: './schedule-form-edit.component.html',
  styleUrls: ['./schedule-form-edit.component.css']
})
export class ScheduleFormEditComponent implements OnInit {
  hmm2!: any ;
  scheduleForm!: FormGroup;
  weekdays: string[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  formatTimeRange(timeF: HTMLInputElement,timeT: HTMLInputElement,Course: any): string {
    const timeFrom = timeF.value;
    const timeTo = timeT.value;
    return `${timeFrom} - ${timeTo}`;
  }
  constructor(public authService: AuthService,public router: Router,private dataService: DataService,private formBuilder: FormBuilder) {
    this.createContactForm();
    this.loadSchedule();
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
  get formArr2() {
    return this.scheduleForm.get('scheduleEntries') as FormArray;
  }
  former(x: AbstractControl) {
    return x.get('courses') as FormArray;
  }
  addCol() {

    return this.formBuilder.group({
      dayOfWeek: ['', Validators.required],
      courses: this.formBuilder.array([this.createCourseFormGroup()])
    });

  }
  addNewCol() {
    let obj1 = {
      time: '',
      course: '',
    };
    if(this.formArr2.length <6){
      this.formArr2.push(this.addCol());

    }
    return 0;
  }
  addRow({obj}: { obj: any }) {
    return this.formBuilder.group({
      timeFrom: [obj.timeFrom,Validators.required],
      timeTo: [obj.timeTo,Validators.required],
      course: [obj.course,[Validators.required]],
    });
  }
  addNewRow(t : any) {
    let obj1 = {
      timeFrom:'',
      timeTo: '',
      course: '',
    };
    t.get('courses').push(this.addRow({obj: obj1}));


  }
  ngOnInit(): void {
  }


  addCourse(): void {
    const coursesArray = this.scheduleForm.get('courses') as FormArray;
    coursesArray.push(this.createCourseFormGroup());
  }

  removeCourse(index: number,t : any): void {
    const coursesArray = t.get('courses') as FormArray;
    coursesArray.removeAt(index);
  }
  removeDay(index: number): void {
    const coursesArray = this.formArr2 as FormArray;
    coursesArray.removeAt(index);
  }
  loadSchedule() {
    this.dataService.getScheduleByUserId(this.authService.currentUser.userId).subscribe(data => {

     // console.log(this.scheduleForm);
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
        }

       this.formArr2.push(forms);
      }






    });
  }
  submitSchedule(): void {
    if (this.scheduleForm.valid) {
      this.dataService.updateSchedule(this.hmm2['_id'],this.scheduleForm.value).subscribe(()=>
      {

      });
      this.router.navigate(['/']);
    }
  }

  protected readonly FormArray = FormArray;
  protected readonly AbstractControl = AbstractControl;
}
