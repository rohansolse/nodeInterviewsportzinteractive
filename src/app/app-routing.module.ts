import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddcountryComponent } from './addcountry/addcountry.component';
import { AllcountriesComponent } from './allcountries/allcountries.component';
import { CountryDetailsComponent } from './country-details/country-details.component';
import { NotfoundComponent } from './notfound/notfound.component';

const routes: Routes = [
  { path: '', redirectTo: 'countydetails', pathMatch: 'full' },
  { path: 'countydetails', component: CountryDetailsComponent },
  { path: 'countries', component: AllcountriesComponent },
  { path: 'insertcountry', component: AddcountryComponent },
  { path: 'not-found', component: NotfoundComponent },
  { path: '**', redirectTo: 'not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
