import { Component, NgModule, OnInit  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';


import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";

import { TripDataService } from '../services/trip-data.service';

// @Component({
//   selector: 'app-home',
//   standalone: true,
//   imports: [],
//   templateUrl: './home.component.html',
//   styleUrl: './home.component.css'
// })


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }

  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }
}




// export class HomeComponent {
//     constructor(private router:Router,
//         private authenticationService: AuthenticationService
//     ) {}
//     ngOnInit(): void {
//     }
//     public isLoggedIn(): boolean {
//         return this.authenticationService.isLoggedIn();
//         }
// }

