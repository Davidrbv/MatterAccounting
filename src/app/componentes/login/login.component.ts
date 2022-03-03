import { Component, OnInit } from '@angular/core';
import { Message, MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService],
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  msg: Message[] = [];

  constructor(
    private authService: AuthService,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {}

  async login() {
    if (this.email !== '' && this.password !== '') {
      const connectionSuccess = await this.authService.login(
        this.email,
        this.password
      );
      if (connectionSuccess) {
        this.msg = [
          {
            severity: 'success',
            summary: 'Welcome',
            detail: 'What do you want to do today? ',
          },
        ];
        setTimeout(() => {
          this.msg = [];
        }, 2000);
      }
    } else {
      this.msg = [
        {
          severity: 'error',
          summary: 'Error',
          detail: 'Email & Password not found. Please, try again.',
        },
      ];
      setTimeout(() => {
        this.msg = [];
      }, 2000);
    }
  }

  logOut() {
    this.authService.logOut();
    if (this.authService.getCurrentUser()) {
      this.messageService.add({
        severity: 'success',
        summary: `Have a Nice Day!!`,
        detail: 'Bye Bye!',
      });
    } else {
      this.msg = [
        { severity: 'error', summary: 'Error', detail: 'You are not logged.' },
      ];
      setTimeout(() => {
        this.msg = [];
      }, 2000);
    }
  }
}
