import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { TripDataService } from '../services/trip-data.service';
import { Trip } from '../models/trip';







@Component({
  selector: 'app-edit-trip',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-trip.component.html',
  styleUrl: './edit-trip.component.css',
  providers: [FormBuilder] // Add FormBuilder as a provider
})







export class EditTripComponent implements OnInit {
    public editForm!: FormGroup;
    trip!: Trip;
    submitted = false;
    message : string = '';
    
    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private tripDataService: TripDataService
    ) {}


      

    private formatDate(dateString: string | undefined): string {
        try {
          if (!dateString) {
            throw new Error('Invalid date string: undefined');
          }
      
          // Create a new Date object from the input date string
          const date = new Date(dateString);
      
          // Check if the date is valid
          if (isNaN(date.getTime())) {
            throw new Error('Invalid date');
          }
      
          // Extract date components
          const year = date.getFullYear();
          const month = ('0' + (date.getMonth() + 1)).slice(-2); // Month is zero-based
          const day = ('0' + date.getDate()).slice(-2);
      
          // Format as "yyyy-MM-dd"
          const formattedDate = `${year}-${month}-${day}`;
          return formattedDate;
        } catch (error) {
          console.error('Error formatting date:', error);
          return ''; // Return empty string or handle the error as needed
        }
      }
      

   
      
    ngOnInit() : void{
            // Retrieve stashed trip ID
            let tripCode = localStorage.getItem("tripCode");
            if (!tripCode) {
                alert("Something wrong, couldn’t find where I stashed tripCode!");
                this.router.navigate(['']);
                return;
            }
            console.log('EditTripComponent::ngOnInit');
            console.log('************tripcode:' + tripCode);
            this.editForm = this.formBuilder.group({
                _id: [],
                code: [tripCode, Validators.required],
                name: ['', Validators.required],
                length: ['', Validators.required],
                start: ['', Validators.required],
                resort: ['', Validators.required],
                perPerson: ['', Validators.required],
                image: ['', Validators.required],
                description: ['', Validators.required]
            })



            this.tripDataService.getTrip(tripCode)
                .subscribe({
                    next: (value: any) => {
                        if (Array.isArray(value) && value.length > 0) {
                            // Make a copy of the first trip object from the array
                            const tripCopy = { ...value[0] };
                  
                            // Modify the desired property in the copied trip object
                            tripCopy.start = this.formatDate(tripCopy.start); // Example modification
                  
                            // Patch the form with the modified trip object
                            this.editForm.patchValue(tripCopy);
                  
                            this.message = `Trip: ${tripCode} retrieved`;
                            console.log(this.message);
                          }                        
                    },
                    error: (error: any) => {
                        console.log('Error: ' + error);
                    }
                })
        }
    public onSubmit(){
        this.submitted = true;
        if(this.editForm.valid){
            this.tripDataService.updateTrip(this.editForm.value)
            .subscribe({
            next: (value: any) => {
                console.log(value);
                this.router.navigate(['']);
            },
            error: (error: any) => {
                console.log('Error: ' + error);
            }
            })
        }
    }
    // get the form short name to access the form fields
    get f() { return this.editForm.controls; }
  }