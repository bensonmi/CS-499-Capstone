import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; 
import { routes } from './app.routes'; 
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
// import { TripListingComponent } from './trip-listing/trip-listing.component';
// import { TripCardComponent } from './trip-card/trip-card.component';
// import { AddTripComponent } from './add-trip/add-trip.component';
// import { EditTripComponent } from './edit-trip/edit-trip.component';
// import { DeleteTripComponent } from './delete-trip/delete-trip.component';
// import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthenticationService } from './services/authentication.service';
import { TripDataService } from './services/trip-data.service';


@NgModule({
  imports: [
    
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes) // Use RouterModule.forRoot() with defined routes
  ],
  declarations: [
    LoginComponent
  ],
  exports: [],
  providers: [
    AuthenticationService,
    TripDataService
  ],
  bootstrap: [AppComponent] // Specify AppComponent as the root component to bootstrap
})
export class AppModule { }

