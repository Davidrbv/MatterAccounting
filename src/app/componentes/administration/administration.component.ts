import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "src/app/model/user";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-administration",
  templateUrl: "./administration.component.html",
  styleUrls: ["./administration.component.scss"]
})
export class AdministrationComponent implements OnInit {
  users: Observable<User[]> = {} as Observable<User[]>;

  constructor(private userService: UserService, private http: HttpClient) {}

  ngOnInit(): void {}

  getAdministration(): Observable<string> {
    return this.http.get<string>(`http://localhost:8080/administration`);
  }
}
