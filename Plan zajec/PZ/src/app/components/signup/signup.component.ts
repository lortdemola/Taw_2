import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public credentials = {
    name: '',
    email: '',
    password: '', passwordRE: ''

  };
  isSubmitted = false;

  constructor(private authService: AuthService, public router: Router,private formBuilder: FormBuilder) {
  }

  ngOnInit() {

  }

  create() {
    this.isSubmitted = true;

    if (!this.credentials.email || !this.credentials.name || !this.credentials.password || this.credentials.password !=this.credentials.passwordRE ) {

      return;
    }
    this.authService.createOrUpdate(this.credentials).subscribe((result) => {
      return result;
    });
    this.router.navigate(['/']);
  }

  passwordPatternValid() {
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{5,15}$/;
    return pattern.test(this.credentials.password) && this.credentials.password?.length >= 5 && this.credentials.password?.length <= 15;
  }
}
