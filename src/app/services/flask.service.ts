import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from "@angular/fire/auth";
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Invoice } from '../model/invoice';
import { Sale } from '../model/sale';
import { Employee } from '../model/employee';

@Injectable({
  providedIn: 'root'
})
export class FlaskService {

  constructor(private http: HttpClient,
              private authService: AuthService) { }


  // API CALLS
  /* Get invoices information */
  getInvoices(): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(`http://localhost:8080/invoice`, {
      params: { id: this.authService.getCurrentUser().uid }
    });
  }

  /* Get Sales information */
  getSales(): Observable<Sale[]> {
    return this.http.get<Sale[]>(`http://localhost:8080/sale`, {
      params: { id: this.authService.getCurrentUser().uid }
    });
  }

  /* Get employees information */
  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(
      `http://localhost:8080/employee/${this.authService.getCurrentUser().uid}`
    );
  }

  //Get app users
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`http://localhost:8080/users`);
  }

  //Delete app user
  deleteUser(uid : string):Observable<any>{
    return this.http.get<any>(`http://localhost:8080/delete`, {
      params: { id: uid}
    });
  }
}
