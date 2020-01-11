import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, filter, switchMap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  getData(query: string) {
    return this.http.get(`http://localhost:3000/read?query=${query}`);
  }

  postData(data: string) {
    return this.http.post(`http://localhost:3000/create`, data);
  }

  putData(data: string) {
     return this.http.put(`http://localhost:3000/update`, data);
  }

  deleteData(id: string) {
     return this.http.delete(`http://localhost:3000/delete/${id}`);
  }
}
