import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {
  projectPath: any = "http://localhost:8080/api"
  constructor(private http: HttpClient, private router: Router) { }

  getData(url: any) {
    return this.http.get(this.projectPath + url)
  }

  getPostData(url: any, data: any) {
    return this.http.post(this.projectPath + url, data)
  }

}
