import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  getData(search: string) {
    return this.http.get(`https://pht-api-munonj7kmq-ew.a.run.app/api/chemicals/get?search=${search}`);
  }

  postData(data: string) {
    return this.http.post(`https://pht-api-munonj7kmq-ew.a.run.app/api/chemicals/create`, data);
  }

  putData(data: string) {
     return this.http.put(`https://pht-api-munonj7kmq-ew.a.run.app/api/chemicals/update`, data);
  }

  deleteData(id: number) {
     return this.http.delete(`https://pht-api-munonj7kmq-ew.a.run.app/api/chemicals/delete/${id}`);
  }
}
