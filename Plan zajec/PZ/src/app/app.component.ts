import { Component } from '@angular/core';
import {AuthService} from "./services/auth.service";
import {DataService} from "./services/data.service";
import {FormBuilder} from "@angular/forms";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Shedule';
  constructor(public authService: AuthService) {

  }
}
