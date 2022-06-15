import { Component, OnDestroy, OnInit } from "@angular/core";
import { FlaskService } from "src/app/services/flask.service";
import { AuthService } from "src/app/services/auth.service";
import { UserService } from "src/app/services/user.service";
import { EmployeeService } from "src/app/services/employee.service";
import { InvoiceService } from "src/app/services/invoice.service";
import { SaleService } from "src/app/services/sale.service";
import { PhotoService } from "src/app/services/photo.service";
import { User } from "src/app/model/user";
import { MessageService } from "primeng/api";

@Component({
  selector: "app-administration",
  templateUrl: "./administration.component.html",
  styleUrls: ["./administration.component.scss"]
})
export class AdministrationComponent implements OnInit, OnDestroy {
  users: User[] = [] as User[];
  user: User = {} as User;
  admin: boolean = false;
  loading: boolean = true;
  noLoad: boolean = true;

  constructor(
    private flaskService: FlaskService,
    private userService: UserService,
    private employeeService: EmployeeService,
    private invoiceService: InvoiceService,
    private saleService: SaleService,
    private photoService: PhotoService,
    public authService: AuthService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  //Load users information
  loadData() {
    this.flaskService.getUsers().subscribe(data => {
      const ids = Object.values(data);
      ids.forEach(id => {
        this.userService.getUsersToDelete(id.toString()).subscribe(users => {
          if (
            this.noLoad == true &&
            id.toString() !== this.authService.getCurrentUser().uid &&
            !this.users.includes(users[0])
          ) {
            this.users.push(users[0]);
          }
        });
      });
    });

    this.userService
      .getUsersToDelete(this.authService.getCurrentUser().uid)
      .subscribe(users => {
        this.admin = users[0].admin ? users[0].admin : false;
      });
  }

  //Change Admin Status
  changeAdmin(user: User) {
    this.flaskService.getUsers().subscribe(data => {
      const ids = Object.values(data);
      ids.forEach(id => {
        const stop = this.userService
          .getUsersToDelete(id.toString())
          .subscribe(users => {
            this.loading = false;
            if (users[0].userId === user.userId) {
              user.admin = !user.admin!!;
              this.userService.updateAdmin(id.toString(), user);
              stop.unsubscribe();
              setTimeout(() => {
                this.loading = true;
              }, 2000);
            }
          });
      });
    });
    this.noLoad = false;
  }

  //Delete authentication and infor user
  deleteUser(uid: string) {
    this.flaskService.getUsers().subscribe(data => {
      const ids = Object.values(data);
      ids.forEach(id => {
        this.userService.getUsersToDelete(id.toString()).subscribe(users => {
          if (users[0].userId === uid) {
            this.selectDelete(id.toString());
          }
        });
      });
    });
    this.loading = false;
    setTimeout(() => {
      window.location.reload();
      this.loading = true;
    }, 1200);
  }

  selectDelete(uid: string) {
    this.flaskService.deleteUser(uid).subscribe(data => {
      if (data["success"] === true) {
        this.userService.getUsersToDelete(uid).subscribe(user => {
          this.userService.deleteUser(uid, user[0].userId!!);
        });
        this.employeeService.getEmployeesToDelete(uid).subscribe(employees => {
          employees.forEach(employee => {
            this.employeeService.deleteEmployeeInfo(employee.employeeId, uid);
          });
        });
        this.saleService.getSalesToDelete(uid).subscribe(sales => {
          sales.forEach(sale => {
            this.saleService.deleteSaleInfo(sale.saleId, uid);
          });
        });
        this.invoiceService.getInvoicesToDelete(uid).subscribe(invoices => {
          invoices.forEach(invoice => {
            this.invoiceService.deleteInvoiceInfo(invoice.invoiceId, uid);
          });
        });
        this.photoService.getPhotosToDelete(uid).subscribe(photos => {
          photos.forEach(photo => {
            this.photoService.deletePhotoInfo(photo.photoId, uid);
          });
        });
        this.messageService.add({
          severity: "success",
          summary: `Delete User`,
          detail: "Well..."
        });
      } else {
        this.messageService.add({
          severity: "error",
          summary: `User not deleted`,
          detail: "Thanks!"
        });
      }
    });
  }

  // Reset variables
  ngOnDestroy(): void {
    this.users = [] as User[];
    this.user = {} as User;
    this.admin = false;
    this.loading = true;
    this.noLoad = true;
  }
}
