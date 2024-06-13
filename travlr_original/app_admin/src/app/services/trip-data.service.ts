import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';
// import { Observable } from 'rxjs';
import { Trip } from '../models/trip';


@Injectable({
  providedIn: 'root'
})

export class TripDataService {
  constructor(private http: HttpClient) { }
  url = 'http://localhost:3000/api/trips'; 
  
  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.url);
  }

  addTrip(formData:Trip): Observable<Trip>{
    return this.http.post<Trip>(this.url,formData)
  }
  
  getTrip(tripCode:string): Observable<Trip[]>{
    return this.http.get<Trip[]>(this.url + '/' + tripCode);
  }

  updateTrip(formData:Trip): Observable<Trip>{
    return this.http.put<Trip>(this.url +'/' + formData.code, formData)
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
