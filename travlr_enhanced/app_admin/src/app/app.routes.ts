import { Routes } from '@angular/router';
import { AddTripComponent } from './add-trip/add-trip.component';
import { EditTripComponent } from './edit-trip/edit-trip.component';
// TODO delete trip fix
import { DeleteTripComponent } from './delete-trip/delete-trip.component';
import { TripListingComponent } from './trip-listing/trip-listing.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {path: 'add-trip', component: AddTripComponent},
    {path: 'list-trips', component: AddTripComponent},
    {path: 'edit-trip', component: EditTripComponent},
    {path: 'delete-trip', component: DeleteTripComponent},// TODO delete trip fix
    {path: '', component:TripListingComponent,pathMatch:'full'},
    {path: 'login', component: LoginComponent},
    {path: '', component: HomeComponent, pathMatch: 'full' }
    
];
