import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(
    private http: HttpClient,
  ) { }

  url = 'https://dashboard.ant.in.th/api/user/';
  
  login(postData: any): Observable<any> {
    //console.log(postData);
    return this.http.post(this.url+'login', postData);
  }

  getOrder(token:any){
    //console.log(token);
    let httpOptions = {
      headers: new HttpHeaders({
        Accept: "application/json",
        Authorization: "Bearer " + token
      })
    };
    //console.log(httpOptions);
    let url = this.url+'myOrder?lid=0';
    return this.http.get(url,httpOptions);
  }
}
