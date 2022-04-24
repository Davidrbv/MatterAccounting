import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Observable } from "rxjs";
import { Invoice } from "src/app/model/invoice";
import { InvoiceService } from "src/app/services/invoice.service";
import {
  ConfirmationService,
  ConfirmEventType,
  MessageService
} from "primeng/api";

@Component({
  selector: "app-formulario-facturas",
  templateUrl: "./formulario-facturas.component.html",
  styleUrls: ["./formulario-facturas.component.scss"]
})
export class FormularioFacturasComponent implements OnInit {
  invoices: Observable<Invoice[]> = {} as Observable<Invoice[]>;
  invoiceForm: FormGroup;
  stateOptions: any[];
  displayEditForm: boolean = false;

  constructor(
    public invoiceService: InvoiceService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.invoiceForm = new FormGroup({
      invoiceId: new FormControl(),
      codigo: new FormControl(),
      fecha: new FormControl(),
      cantidad: new FormControl(),
      proveedor: new FormControl(),
      estado: new FormControl()
    });
    this.stateOptions = [
      { label: "Unpaid", value: false},
      { label: "Paid", value: true }
    ];
  }

  ngOnInit(): void {
    this.invoices = this.invoiceService.getInvoices();
  }

  onSubmit() {
    if (
      this.invoiceForm.value.codigo !== null &&
      this.invoiceForm.value.fecha !== null &&
      this.invoiceForm.value.cantidad !== null &&
      this.invoiceForm.value.proveedor !== null &&
      this.invoiceForm.value.estado !== null
    ) {
      this.invoiceService.addInvoice(this.invoiceForm.value);
      this.messageService.add({
        severity: "success",
        summary: `Saving invoice!`,
        detail: "Thanks!"
      });
    } else {
      this.messageService.add({
        severity: "error",
        summary: `You must field the fileds`,
        detail: "Try again!"
      });
    }
    this.invoiceForm.reset();
  }

  /* Update edit invoice */

  async updateInvoice() {
    if (
      this.invoiceForm.value.codigo !== null &&
      this.invoiceForm.value.fecha !== null &&
      this.invoiceForm.value.cantidad !== null &&
      this.invoiceForm.value.proveedor !== null &&
      this.invoiceForm.value.estado !== null &&
      this.invoiceForm.value.codigo !== '' &&
      this.invoiceForm.value.proveedor !== ''
    ) {
      await this.invoiceService.updateInvoice(this.invoiceForm.value);
      setTimeout(() => {
        this.invoiceForm.reset();
      }, 1000);
      this.messageService.add({
        severity: "info",
        summary: "Editing invoice..",
        detail: "Have a nice day.."
      });
      this.displayEditForm = false;
    } else {
      this.messageService.add({
        severity: "error",
        summary: "Must fill the fileds..",
        detail: "Please.."
      });
    }
  }

  /* Delete invoice */
  editInvoice(invoice: Invoice) {
    this.displayEditForm = true;
    this.invoiceService.getInvoice(invoice.invoiceId).subscribe(data => {
      this.invoiceForm.patchValue(data);
    });
  }

  editCancel() {
    this.messageService.add({
      severity: "info",
      summary: "Editing cancel..",
      detail: "Have a nice day.."
    });
    this.displayEditForm = false;
  }

  /* Confirm delete invoice */

  confirmDeleteInvoice(invoice: Invoice) {
    this.confirmationService.confirm({
      message: "Are you sure that you want to delete this invoice?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.messageService.add({
          severity: "info",
          summary: "Deleting invoice",
          detail: "Good job.."
        });
        this.invoiceService.deleteInvoice(invoice.invoiceId);
      },
      reject: (type: any) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({
              severity: "error",
              summary: "Sale delete cancel..",
              detail: "Have a nice day.."
            });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({
              severity: "warn",
              summary: "Cancelled",
              detail: "Have a nice day.."
            });
            break;
        }
      }
    });
  }
}
