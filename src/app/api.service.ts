import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Wth } from './_models/wth';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  temp: string;
  hum: number;
  constructor(private http: HttpClient) {}
  getWeather(city: string) {
    this.temp = undefined;
    this.hum = undefined;
    return this.http
      .get(
        `http://api.openweathermap.org/data/2.5/weather?appid=908e2c3cb8ff258f815e132836373030&q=${city}`
      )
      .pipe(
        map((data: Wth) => {
          this.temp = (data.main.temp - 273.15).toFixed(0);
          this.hum = data.main.humidity;
          console.log(this.temp, this.hum);
        })
      );
  }
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
