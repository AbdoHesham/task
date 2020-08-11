import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  apiUrl:"https://jsonplaceholder.typicode.com/";


  constructor( private _httpClient:HttpClient) {
    }
  

getdata( ) : Observable<any> {

  return this._httpClient.get(`${this.apiUrl}posts`)
}

GetPostByid(id): Observable<any> {

  return this._httpClient.get(`${this.apiUrl}posts/${id}`)
}

Updatedata(id,body) : Observable<any> {

  return this._httpClient.put(`${this.apiUrl}posts/${id}`,body)
}

  // delete post
  deletePost(id): Observable<any> {
    return this._httpClient.delete(`${this.apiUrl}posts/${id}`);
  }

}
