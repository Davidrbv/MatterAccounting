import { Component, OnInit } from "@angular/core";
import { EmployeeService } from "src/app/services/employee.service";
import { InvoiceService } from "src/app/services/invoice.service";
import { SaleService } from "src/app/services/sale.service";

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
    private invoiceService: InvoiceService,
    private saleService: SaleService,
    private employeeService: EmployeeService
  ) {}

  ngOnInit() {
    this.invoicesCostMonthly();
    this.invoicesCostAnnually();
    this.salesIngressMonthly();
    this.salesIngressAnnually();
    this.employeesCostAnnually();

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

  //  INVOICES COST  //
  invoicesCostMonthly() {
    this.invoiceService.getInvoices().subscribe(item => {
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
    this.invoiceService.getInvoices().subscribe(item => {
      item.forEach(invoice => {
        this.invoice += invoice.cantidad;
      });
      this.invoiceAnnually.push(this.invoice);
    });
  }

  //  SALES INGRESS  //
  salesIngressMonthly() {
    this.saleService.getSales().subscribe(item => {
      item.forEach(sale => {
        const fecha = new Date(sale.fecha);
        const saleDate = fecha.getMonth();
        const saleTemp = sale.total + this.salesMonthly[saleDate];
        this.salesMonthly.splice(saleDate, 1, saleTemp);
      });
    });
  }

  salesIngressAnnually() {
    this.saleService.getSales().subscribe(item => {
      item.forEach(sale => {
        this.sale += sale.total;
      });
      this.saleAnnually.push(this.sale);
    });
  }

  //  EMPLOYEES COST  //
  employeesCostAnnually() {
    this.employeeService.getEmployees().subscribe(item => {
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
