import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AllcountriesComponent } from './allcountries/allcountries.component';
import { CountryDetailsComponent } from './country-details/country-details.component';
import { AddcountryComponent } from './addcountry/addcountry.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { CommonServiceService } from './services/common-service.service';
import { CountriesServiceService } from './services/countries-service.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    AllcountriesComponent,
    CountryDetailsComponent,
    AddcountryComponent,
    NotfoundComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [CommonServiceService, CountriesServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
