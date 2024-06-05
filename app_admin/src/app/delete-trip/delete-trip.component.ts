import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { TripDataService } from '../services/trip-data.service';

@Component({
  selector: 'app-delete-trip',
  standalone: true,
  imports: [],
  templateUrl: './delete-trip.component.html',
  styleUrls: ['./delete-trip.component.css']
})
export class DeleteTripComponent implements OnInit {

  constructor(
    private router: Router,
    private tripService: TripDataService
  ) { }

  ngOnInit() {
    let tripCode = localStorage.getItem("tripCode");
    if (!tripCode) {
      alert("Something wrong, couldn't find where I stashed the tripCode!");
      this.router.navigate(['']);
      return;
    }

    console.log("DeleteTripComponent found tripCode: " + tripCode);

    this.tripService.deleteTrip(tripCode).subscribe({
      next: data => {
        console.log("*****after next*****************");
        console.log(data);
        this.router.navigate(['']);
      },
      error: error => {
        console.error('There was an error deleting the trip!', error);
        alert('There was an error deleting the trip!');
      }
    });
  }
}



// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { Router } from "@angular/router";
// import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
// import { TripDataService } from '../services/trip-data.service';
// import { Trip } from '../models/trip';

// // import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';


// @Component({
//   selector: 'app-delete-trip',
//   standalone: true,
//   imports: [],
//   templateUrl: './delete-trip.component.html',
//   styleUrl: './delete-trip.component.css'
// })

// // TODO delete trip fix


// export class DeleteTripComponent implements OnInit {

//   constructor(
//     private router: Router,
//     private tripService: TripDataService
//   ) { }

//   ngOnInit() {
//     let tripCode = localStorage.getItem("tripCode");
//     if (!tripCode) {
//       alert("Something wrong, couldn't find where I stashed the tripCode!");
//       this.router.navigate(['']);
//       return;
//     }

//     console.log("DeleteTripComponent found tripCode " + tripCode);

//     this.tripService.deleteTrip(tripCode).subscribe({
//       next: data => {
//         console.log(data);
//         this.router.navigate(['list-trips']);
//       },
//       error: error => {
//         console.error('There was an error deleting the trip!', error);
//         alert('There was an error deleting the trip!');
//       }
//     });
//   }

// }
