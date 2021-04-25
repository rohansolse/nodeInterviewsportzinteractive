import { Component, OnInit } from '@angular/core';
import { CountriesServiceService } from '../services/countries-service.service';

@Component({
  selector: 'app-allcountries',
  templateUrl: './allcountries.component.html',
  styleUrls: ['./allcountries.component.css']
})
export class AllcountriesComponent implements OnInit {
  countriesList: any = []
  serverLink: string = "http://localhost:8080/"
  constructor(private apiService: CountriesServiceService) { }
  async ngOnInit() {
    let response = await this.apiService.getCountries()
    // console.log(response);
    if (response['status']) {
      this.countriesList = response['data']
    }
  }

}
