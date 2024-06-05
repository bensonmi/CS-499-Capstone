import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Trip } from '../models/trip'




@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent implements OnInit{
  //constructor(private authenticationService: AuthenticationService) {}
  
  constructor(private router:Router,
    private authenticationService: AuthenticationService
  ) {}
  ngOnInit() {}

  public isLoggedIn(): boolean { 
    return this.authenticationService.isLoggedIn();
  }
  public onLogin(): void {
    this.router.navigate(['login']);  
  }


  public onLogout(): void {
    console.log("onLogout")
      this.authenticationService.logout();
  }
}
