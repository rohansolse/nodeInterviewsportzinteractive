import { Injectable } from '@angular/core';
import { CommonServiceService } from './common-service.service';

@Injectable({
  providedIn: 'root'
})
export class CountriesServiceService {

  constructor(private commonService: CommonServiceService,) { }

  getCountries() {
    return new Promise((resolve, reject) => {
      return this.commonService.getData("/countries",).subscribe(result => {
        resolve(result);
      })
    })
  }

  getSelectedCountries(data) {
    return new Promise((resolve, reject) => {
      return this.commonService.getData("/countries/" + data).subscribe(result => {
        resolve(result);
      })
    })
  }

  checkImage(data) {
    return new Promise((resolve, reject) => {
      return this.commonService.getPostData("/countries/flag", data).subscribe(result => {
        resolve(result);
      })
    })
  }

  checkExistingRank(data) {
    return new Promise((resolve, reject) => {
      return this.commonService.getData("/countries/rank/" + data).subscribe(result => {
        resolve(result);
      })
    })
  }

  saveCountry(data) {
    return new Promise((resolve, reject) => {
      return this.commonService.getPostData("/countries", data).subscribe(result => {
        resolve(result);
      })
    })
  }
}
