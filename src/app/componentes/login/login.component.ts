import { Component, OnInit } from "@angular/core";
import { Message, MessageService } from "primeng/api";
import { AuthService } from "src/app/services/auth.service";
import { UserService } from "src/app/services/user.service";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {
  email: string = "";
  password: string = "";
  msg: Message[] = [];
  date: string = "";
  recovery = false;
  send = false;
  control = false;

  constructor(
    public authService: AuthService,
    private messageService: MessageService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.control = false;
  }

  // LogIn
  async login() {
    this.recovery = false;
    if (this.email !== "" && this.password !== "") {
      const connectionSuccess = await this.authService.login(
        this.email,
        this.password
      );
      if (connectionSuccess) {
        this.userService.getDateFromStorage().then(data => {
          if (data !== null) this.date = data.toString();
          else this.date = "Welcome home, human!!";
          this.msg = [
            {
              severity: "success",
              summary: "Hello!!",
              detail: this.date
            }
          ];
        });
        this.userService.saveDateIntoStorage();
        setTimeout(() => {
          this.msg = [];
        }, 2000);
      }
    } else {
      if (!this.send && !this.recovery) {
        this.msg = [
          {
            severity: "error",
            summary: "Error",
            detail: "Email & Password not found. Please, try again."
          }
        ];
        setTimeout(() => {
          this.msg = [];
        }, 2000);
      }
    }
    this.email = "";
    this.password = "";
    this.send = false;
    this.recovery = false;
  }

  // LogOut
  logOut() {
    this.control= false;
    this.recovery = false;
    this.authService.logOut();
    if (this.authService.getCurrentUser()) {
      this.messageService.add({
        severity: "success",
        summary: `Have a Nice Day!!`,
        detail: "Bye Bye!"
      });
    } else {
      this.msg = [
        { severity: "error", summary: "Error", detail: "You are not logged." }
      ];
      setTimeout(() => {
        this.msg = [];
      }, 2000);
    }
  }

  // Set Buttons
  recoveryPass() {
    this.send = true;
    this.recovery = true;
  }

  // Send Email To Reset Password
  sendEmail() {
    this.send = false;
    this.recovery = false;
    if (this.email !== "") {
      this.authService
        .recoveryPass(this.email)
        .then(() => {
          this.msg = [
            {
              severity: "success",
              summary:
                "An email has been sent to you with the following information.",
              detail: "Good a nice day!!"
            }
          ];
          setTimeout(() => {
            this.msg = [];
          }, 2000);
        })
        .catch(() => {
          this.msg = [
            {
              severity: "error",
              summary: "Unregistered email address.",
              detail: "Sorry!!"
            }
          ];
          setTimeout(() => {
            this.msg = [];
          }, 2000);
        });
    } else {
      this.msg = [
        {
          severity: "warn",
          summary: "You must fill the filed.",
          detail: "Please"
        }
      ];
      setTimeout(() => {
        this.msg = [];
      }, 2000);
    }
    this.email = "";
  }

  googleAuthentication() {
    this.recovery = false;
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then(result => {
        this.userService.getUsers().subscribe(user => {
          if (user.length === 0 && !this.control) {
            this.control = true;    
            this.userService.addUser({
              admin: false,
              email: `${result.user.email}`,
              nombre: `${result.user.displayName}`,
              image: `${result.user.photoURL}`,
              delete: false
            });
          }
        });
      })
      .catch(error => {
        this.msg = [
          {
            severity: "success",
            summary: "Welcome.",
            detail: "Good a nice day!!"
          }
        ];
        setTimeout(() => {
          this.msg = [];
        }, 2000);
      });
  }
}
