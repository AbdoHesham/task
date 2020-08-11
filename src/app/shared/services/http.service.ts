import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  apiUrl: string ;

  constructor( private _httpClient:HttpClient) {
      this.apiUrl =  environment.baseUrl;
    }
  

getdata( ) : Observable<any> {

  return this._httpClient.get(`${this.apiUrl}posts`)
}

GetPostByid(id): Observable<any> {

  return this._httpClient.get(`${this.apiUrl}posts/${id}`)
}

Updatedata(id) : Observable<any> {

  return this._httpClient.put(`${this.apiUrl}posts`,id)
}

  // delete post
  deletePost(id): Observable<any> {
    return this._httpClient.delete(`${this.apiUrl}posts/${id}`);
  }

}
