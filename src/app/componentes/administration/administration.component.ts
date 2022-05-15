import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { UserService } from "src/app/services/user.service";
import { User } from "@angular/fire/auth";

@Component({
  selector: "app-administration",
  templateUrl: "./administration.component.html",
  styleUrls: ["./administration.component.scss"]
})
export class AdministrationComponent implements OnInit {
  users: User[] = {} as User[];

  constructor(private userService: UserService, private http: HttpClient) {}

  ngOnInit(): void {
    this.showUsers();
  }

  getAdministration(): Observable<string> {
    return this.http.get<string>(`http://localhost:8080/administration`);
  }

  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(`http://localhost:8080/users`);
  }

  showUsers(){
    this.getUsers().subscribe(item => {
      item.forEach(user => {
        this.users.push(user);
      })
    })
  }
}
