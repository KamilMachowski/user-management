import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  getData(search: string) {
    return this.http.get(`http://localhost:3000/read?search=${search}`);
  }

  postData(data: string) {
    return this.http.post(`http://localhost:3000/create`, data);
  }

  putData(data: string) {
     return this.http.put(`http://localhost:3000/update`, data);
  }

  deleteData(id: number) {
     return this.http.delete(`http://localhost:3000/delete/${id}`);
  }
}
