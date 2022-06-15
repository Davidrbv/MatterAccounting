import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Invoice } from "../model/invoice";
import { AuthService } from "./auth.service";
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  docData,
  Firestore,
  setDoc
} from "@angular/fire/firestore";

@Injectable({
  providedIn: "root"
})
export class InvoiceService {
  constructor(private authService: AuthService, private fireStore: Firestore) {}

  /* Get one Invoice */
  getInvoice(id: string): Observable<Invoice> {
    return docData(
      doc(
        this.fireStore,
        `users/${this.authService.getCurrentUser().uid}/invoices/${id}`
      ),
      {
        idField: "invoiceId"
      }
    ) as Observable<Invoice>;
  }

  /* Get All Invoices */
  getInvoices(): Observable<Invoice[]> {
    return collectionData(
      collection(
        this.fireStore,
        `users/${this.authService.getCurrentUser().uid}/invoices`
      ),
      {
        idField: "invoiceId"
      }
    ) as Observable<Invoice[]>;
  }

  /* Get Invoices to delete info by admin */
  getInvoicesToDelete(id : string): Observable<Invoice[]> {
    return collectionData(
      collection(
        this.fireStore,
        `users/${id}/invoices`
      ),
      {
        idField: "invoiceId"
      }
    ) as Observable<Invoice[]>;
  }

  /* Add Invoice */
  async addInvoice(invoice: Invoice) {
    await addDoc(
      collection(
        this.fireStore,
        `users/${this.authService.getCurrentUser().uid}/invoices`
      ),
      invoice
    );
  }

  /* Delete Invoice */
  async deleteInvoice(id: string) {
    await deleteDoc(
      doc(
        this.fireStore,
        `users/${this.authService.getCurrentUser().uid}/invoices/${id}`
      )
    );
  }

  /* Delete Invoice Info by Admin */
  async deleteInvoiceInfo(id: string,uid: string) {
    await deleteDoc(
      doc(
        this.fireStore,
        `users/${uid}/invoices/${id}`
      )
    );
  }

  /* Update Invoice */
  async updateInvoice(invoice: Invoice) {
    await setDoc(
      doc(
        this.fireStore,
        `users/${this.authService.getCurrentUser()
          .uid}/invoices/${invoice.invoiceId}`
      ),
      invoice
    );
  }
}
