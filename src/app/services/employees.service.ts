import { Injectable } from '@angular/core';

import { Employee } from '../models/employee';
import { Observable} from 'rxjs';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
    handleError: any;

  constructor(private http: HttpClient) { }
 getListJobAdFiltred(): Observable<Employee[]> {
    return new Observable(observer => {
      this.http.get<Employee[]>('http://localhost:8080/employees')
        .subscribe(data => {
          if (data) {
            observer.next(data)
          }
          else {
            observer.error(" la liste des salariés est momentanement indisponible !! ")
          }
          observer.complete;
        });
    });
  }
  saveEmployees(employees: Employee[]): Observable<any> {

    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(employees);
    console.log(body)
    return new Observable(observer => {
      this.http.post<Employee>('http://localhost:8080/employees', body, { 'headers': headers }).subscribe(data => {
        if (data) {
          observer.next(data)
        }
        else {
          observer.error(" la liste des salariés est momentanement indisponible !! ")
        }
        observer.complete;
      });
    });
  }

  
}
