import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormArray, Validators, AbstractControl} from '@angular/forms';
import { ValidatorFn } from '@angular/forms';
import {AuthService} from "../../services/auth.service";
import {DataService} from "../../services/data.service";
import {Router} from "@angular/router";




@Component({
  selector: 'app-schedule-form',
  templateUrl: './schedule-form.component.html',
  styleUrls: ['./schedule-form.component.css']
})
export class ScheduleFormComponent  implements OnInit {
  hmm!:any;
  scheduleForm!: FormGroup;
  weekdays: string[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  formatTimeRange(timeF: HTMLInputElement,timeT: HTMLInputElement,Course: any): string {
    const timeFrom = timeF.value;
    const timeTo = timeT.value;
    Course.get('time')?.setValue((timeFrom+"-"+timeTo).toString());
    return `${timeFrom} - ${timeTo}`;
  }
  constructor(public authService: AuthService,public router: Router,private dataService: DataService,private formBuilder: FormBuilder) {
    this.createContactForm();
    this.loadSchedule();
  }
  createContactForm() {
    this.scheduleForm = this.formBuilder.group({
      owner: ['', Validators.required],
      scheduleEntries: this.formBuilder.array([this.createScheduleEntryFormGroup()])
    });
    this.scheduleForm.get('owner')?.setValue(this.authService.currentUser.userId);
  }
  createScheduleEntryFormGroup(): FormGroup {
    return this.formBuilder.group({
      dayOfWeek: ['', Validators.required],
      courses: this.formBuilder.array([this.createCourseFormGroup()])
    });
  }
  createCourseFormGroup(): FormGroup {
    return this.formBuilder.group({
      timeFrom: ['',[Validators.required]],
      timeTo: ['',[Validators.required]],
      course: ['',[Validators.required,Validators.minLength(2)]]
    });
  }
  get formArr() {
    return this.formArr2.at(0).get('courses') as FormArray;
  }

  get formArr2() {
    return this.scheduleForm.get('scheduleEntries') as FormArray;
  }

   former(x: AbstractControl) {
    return x.get('courses') as FormArray;
  }
  addRow({obj}: { obj: any }) {
    return this.formBuilder.group({
      timeFrom: [obj.timeFrom,[Validators.required]],
      timeTo: [obj.timeTo,[Validators.required]],
      course: [obj.course,[Validators.required,Validators.minLength(2)]],
    });
  }
  addCol() {

      return this.formBuilder.group({
        dayOfWeek: ['', Validators.required],
        courses: this.formBuilder.array([this.createCourseFormGroup()])
      });

  }
  addNewRow(t : any) {
    let obj1 = {
      timeFrom: '',
      timeTo: '',
      course: '',
    };
    t.get('courses').push(this.addRow({obj: obj1}));


  }
  addNewCol() {
    if(this.formArr2.length <6){
    this.formArr2.push(this.addCol());

    }
    return 0;
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
    this.dataService.getScheduleAmountByUserId(this.authService.currentUser.userId).subscribe(data => {
      console.log(data);
      this.hmm = data;
    });
  }
  submitSchedule(): void {
    if (this.scheduleForm.valid) {


      this.dataService.createSchedule(this.scheduleForm.value).subscribe(()=>
      {

      });
      this.router.navigate(['/']);


    }else{
    }
  }

  protected readonly FormArray = FormArray;
  protected readonly AbstractControl = AbstractControl;
}
