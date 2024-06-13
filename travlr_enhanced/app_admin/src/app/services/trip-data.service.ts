import { Injectable, Inject, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';
// import { Observable } from 'rxjs';
import { Trip } from '../models/trip';
import { catchError } from 'rxjs/operators'

import { User } from '../models/user';
import { AuthResponse } from '../models/authresponse';
import { BROWSER_STORAGE } from '../storage';



@Injectable({
   providedIn: 'root'
})


@Injectable()
export class TripDataService {
  constructor(private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage) {}
  //url = 'http://localhost:3000/api/trips'; 

  private apiBaseUrl = 'http://localhost:3000/api/';
  private tripsUrl = `${this.apiBaseUrl}trips/`;
  private tripUrl = `${this.apiBaseUrl}trip/`;
  
  private handleError(error: any): Promise<any> {
    console.error('Something has gone wrong', error);
    return Promise.reject(error.message || error);
  }

  
  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.tripsUrl);
  }

  addTrip(formData:Trip): Observable<Trip>{
    return this.http.post<Trip>(this.tripsUrl,formData)
  }
  
  getTrip(tripCode:string): Observable<Trip[]>{
    return this.http.get<Trip[]>(this.tripsUrl + tripCode);
  }

  updateTrip(formData:Trip): Observable<Trip>{
    console.log("**********************")
    console.log(this.tripsUrl + formData.code)
    console.log(formData)
    return this.http.put<Trip>(this.tripsUrl + formData.code, formData)
  }
  
  deleteTrip(tripCode: string): Observable<Trip> {
    console.log("*****delete****************");
    console.log(this.tripsUrl + tripCode);
    return this.http.delete<Trip>(this.tripsUrl + tripCode);// as Observable<Trip>;

  }
  private makeAuthApiCall(urlPath: string, user: User): Observable<AuthResponse> {
    const urlApiCall: string = `${this.apiBaseUrl}/${urlPath}`;
    return this.http.post<AuthResponse>(urlApiCall, user)
      .pipe(
        catchError(this.handleError)
      );
  }

  public register(user: User): Observable<AuthResponse> {
    return this.makeAuthApiCall('register', user);
  }

  public login(user: User): Observable<AuthResponse> {
    return this.makeAuthApiCall('login', user);
  }
  // public async getTrip(tripCode: string): Promise<Trip> {
  //   console.log('Inside TripDataService#getTrip');
  //   try {
  //     const response = await firstValueFrom(this.http.get<Trip>(this.url + tripCode));
  //     return response;
  //   } catch (error) {
  //     // Handle error appropriately
  //     console.error('Error fetching trip:', error);
  //     throw error; // Re-throw the error to the caller
  //   }
  // }


}
