import { Component, OnInit } from '@angular/core';
import { CountriesServiceService } from '../services/countries-service.service';

@Component({
    selector: 'app-country-details',
    templateUrl: './country-details.component.html',
    styleUrls: ['./country-details.component.css']
})
export class CountryDetailsComponent implements OnInit {
    countriesList: any = []
    serverLink: string = "http://localhost:8080/";
    country: any = null
    constructor(private apiService: CountriesServiceService) { }
    async ngOnInit() {
        let response = await this.apiService.getCountries()
        // console.log(response);
        if (response['status']) {
            this.countriesList = response['data']
        }
    }
    async selectedCountry(event) {
        if (event.target.value) {
            let response = await this.apiService.getSelectedCountries(event.target.value)
            if (response['status']) {
                this.country = response['data']
                console.log(this.country);

            }
        }
    }
}
