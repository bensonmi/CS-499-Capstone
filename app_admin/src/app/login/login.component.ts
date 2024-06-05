import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models/user';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { TripDataService } from '../services/trip-data.service';
import { Trip } from '../models/trip';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
//   })


  @Component({
    selector: 'app-login',
    standalone: false,
    //imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
    providers: [FormBuilder] // Add FormBuilder as a provider
  })

export class LoginComponent implements OnInit {
  public formError: string = '';
  public credentials = {
    name: '',
    email: '',
    password: ''
  };
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {}

  public onLoginSubmit(): void {
    this.formError = '';
    if (!this.credentials.email || !this.credentials.password) {
      this.formError = 'All fields are required, please try again';
    } else {
      console.log("***********onLoginSubmit***************")
      this.doLogin();
    }
  }
  private doLogin(): void {
    this.authenticationService.login(this.credentials)
    .subscribe(
      () => {
        this.router.navigateByUrl('#'); // Navigate to desired URL on success
      },
      (error) => {
        this.formError = error; // Handle error message on login failure
      }
    );
  }
}
// private doLogin(): void {
// this.authenticationService.login(this.credentials)
// .then(() => this.router.navigateByUrl('#'))
// .catch((message) => this.formError = message);
// }
