import { HttpClient, HttpParams } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Employee } from "src/app/model/employee";
import { Invoice } from "src/app/model/invoice";
import { Sale } from "src/app/model/sale";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-estadisticas",
  templateUrl: "./estadisticas.component.html",
  styleUrls: ["./estadisticas.component.scss"]
})
export class EstadisticasComponent implements OnInit {
  employeesOptions: any;
  salesInvoicesOptions: any;
  resultsOptions: any;
  months: string[] = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre"
  ];

  invoice: number = 0;
  sale: number = 0;
  waiterSalary: number = 0;
  chefSalary: number = 0;
  employeesSalarys: number = 0;

  invoiceAnnually: number[] = [];
  invoicesMonthly: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  saleAnnually: number[] = [];
  salesMonthly: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  employeesAnnually: number[] = [];
  waitersSalarys: number[] = [];
  chefsSalarys: number[] = [];

  constructor(
    private http: HttpClient,
    private authService : AuthService
  ) {}

  ngOnInit() {
    this.invoicesCostMonthly();
    this.invoicesCostAnnually();
    this.salesIngressMonthly();
    this.salesIngressAnnually();
    this.employeesCostAnnually();

    console.log(this.saleAnnually);
    console.log(this.invoiceAnnually);
    console.log(this.employeesAnnually);

    // Employees
    this.employeesOptions = {
      labels: this.months,
      datasets: [
        {
          type: "bar",
          label: "Waiter",
          backgroundColor: "#8A17F7",
          data: this.waitersSalarys,
          borderColor: "#6A0062",
          borderWidth: 2
        },
        {
          type: "bar",
          label: "Chef",
          backgroundColor: "#F69B40",
          data: this.chefsSalarys,
          borderColor: "#EF7400",
          borderWidth: 2
        }
      ]
    };

    // Sales & Invoices
    this.salesInvoicesOptions = {
      labels: this.months,
      datasets: [
        {
          type: "bar",
          label: "Sales",
          backgroundColor: "#00BB2D",
          data: this.salesMonthly,
          borderColor: "black",
          borderWidth: 2
        },
        {
          type: "bar",
          label: "Invoices",
          backgroundColor: "#FF0000",
          data: this.invoicesMonthly,
          borderColor: "black",
          borderWidth: 2
        }
      ]
    };

    // Results
    this.resultsOptions = {
      labels: ["Sales", "Invoices", "Employees"],
      datasets: [
        {
          data: [
            this.saleAnnually,
            this.invoiceAnnually,
            this.employeesAnnually
          ],
          backgroundColor: ["#13A30A", "#A60000", "#1B88BE"],
          hoverBackgroundColor: ["#1BD70F", "#FF6C6C", "#20B4FE"]
        }
      ]
    };
  }

  // API CALLS
  getInvoices(): Observable<Invoice[]>{
    return this.http.get<Invoice[]>(`http://localhost:8080/invoice`,{params : {id:this.authService.getCurrentUser().uid}})
  }

  getSales(): Observable<Sale[]>{
    return this.http.get<Sale[]>(`http://localhost:8080/sale`,{params : {id:this.authService.getCurrentUser().uid}})
  }

  getEmployees(): Observable<Employee[]>{
    return this.http.get<Employee[]>(`http://localhost:8080/employee`,{params : {id:this.authService.getCurrentUser().uid}})
  }

  //  INVOICES COST  //
  invoicesCostMonthly() {
   this.getInvoices().subscribe(item => {
      item.forEach(invoice => {
        const tempDate = new Date(invoice.fecha);
        const invoiceDate = tempDate.getMonth();
        const invoiceTemp =
        invoice.cantidad + this.invoicesMonthly[invoiceDate];
        this.invoicesMonthly.splice(invoiceDate, 1, invoiceTemp);
      });
    });
  }

  invoicesCostAnnually() {
    this.getInvoices().subscribe(item => {
      item.forEach(invoice => {
        this.invoice += invoice.cantidad;
      });
      this.invoiceAnnually.push(this.invoice);
    });
  }

  //  SALES INGRESS  //
  salesIngressMonthly() {
    this.getSales().subscribe(item => {
      item.forEach(sale => {
        const fecha = new Date(sale.fecha);
        const saleDate = fecha.getMonth();
        const saleTemp = sale.total + this.salesMonthly[saleDate];
        this.salesMonthly.splice(saleDate, 1, saleTemp);
      });
    });
  }

  salesIngressAnnually() {
    this.getSales().subscribe(item => {
      item.forEach(sale => {
        this.sale += sale.total;
      });
      this.saleAnnually.push(this.sale);
    });
  }

  //  EMPLOYEES COST  //
  employeesCostAnnually() {
    this.getEmployees().subscribe(item => {
      const months = new Date().getMonth();
      item.forEach(employee => {
        if (employee.puesto === "chef") {
          this.chefSalary += employee.salario;
        } else if (employee.puesto === "Waiter") {
          this.waiterSalary += employee.salario;
        }
        this.employeesSalarys += employee.salario;
      });
      this.employeesAnnually.push(this.employeesSalarys);
      for (let i = 0; i < months; i++) {
        this.chefsSalarys.push(this.chefSalary);
        this.waitersSalarys.push(this.waiterSalary);
      }
    });
  }
}
