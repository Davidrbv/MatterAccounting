import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Observable } from "rxjs";
import { Sale } from "src/app/model/sale";
import { SaleService } from "src/app/services/sale.service";
import {
  ConfirmationService,
  ConfirmEventType,
  MessageService
} from "primeng/api";

@Component({
  selector: "app-formulario-ventas",
  templateUrl: "./formulario-ventas.component.html",
  styleUrls: ["./formulario-ventas.component.scss"]
})
export class FormularioVentasComponent implements OnInit {
  sales: Observable<Sale[]> = {} as Observable<Sale[]>;
  saleForm: FormGroup = {} as FormGroup;
  checked: boolean = false;
  displayEditForm: boolean = false;

  constructor(
    private saleService: SaleService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.saleForm = new FormGroup({
      saleId: new FormControl(),
      fecha: new FormControl(),
      efectivo: new FormControl(),
      tarjeta: new FormControl(),
      total: new FormControl()
    });
  }

  ngOnInit(): void {
    this.sales = this.saleService.getSales();
  }

  onSubmit() {
    if (
      this.saleForm.value.fecha !== null &&
      this.saleForm.value.efectivo !== null &&
      this.saleForm.value.tarjeta !== null
    ) {
      this.saleForm.value.total =
        this.saleForm.value.efectivo + this.saleForm.value.tarjeta;
      this.saleService.addSale(this.saleForm.value);
      this.messageService.add({
        severity: "success",
        summary: `Saving sale!`,
        detail: "Thanks!"
      });
    } else {
      this.messageService.add({
        severity: "error",
        summary: `You must field the fileds`,
        detail: "Try again!"
      });
    }
    this.saleForm.reset();
  }

  deleteSale(sale: Sale) {
    this.saleService.deleteSale(sale.saleId);
  }

  editSale(sale: Sale) {
    this.displayEditForm = true;
    this.saleService.getSale(sale.saleId).subscribe(data => {
      this.saleForm.patchValue(data);
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

  async updateSale() {
    if (
      this.saleForm.value.fecha !== null &&
      this.saleForm.value.efectivo !== null &&
      this.saleForm.value.tarjeta !== null
    ) {
      this.saleForm.value.total =
        this.saleForm.value.efectivo + this.saleForm.value.tarjeta;
      await this.saleService.updateSale(this.saleForm.value);
      this.displayEditForm = false;
      setTimeout(() => {
        this.saleForm.reset();
      }, 1000);
      this.messageService.add({
        severity: "info",
        summary: "Editing sale..",
        detail: "Have a nice day.."
      });
    } else {
      this.messageService.add({
        severity: "error",
        summary: "Must fill fileds",
        detail: "Please"
      });
    }
  }

  confirmDeleteSale(sale: Sale) {
    this.confirmationService.confirm({
      message: "Are you sure that you want to delete Sale?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.messageService.add({
          severity: "info",
          summary: "Deleting sale",
          detail: "Good job.."
        });
        this.deleteSale(sale);
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
            this.saleForm.reset({ fecha: undefined, efectivo: 0, tarjeta: 0 });
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
