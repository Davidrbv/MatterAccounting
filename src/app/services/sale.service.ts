import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { Sale } from '../model/sale';
import { addDoc, collection, collectionData, doc, Firestore, deleteDoc, setDoc, docData } from '@angular/fire/firestore';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class SaleService {

  constructor(private fireStore: Firestore,
              private authService : AuthService) {}

  /* Get one Sale */
  getSale(id : string): Observable<Sale>{
    return docData(doc(this.fireStore,`users/${this.authService.getCurrentUser().uid}/sales/${id}`),{
      idField: 'saleId',
    }) as Observable<Sale>
  }

  /* Get All Sale */
  getSales(): Observable<Sale[]>{
    return collectionData(collection(this.fireStore, `users/${this.authService.getCurrentUser().uid}/sales`), {
      idField: 'saleId',
    }) as Observable<Sale[]>;
  }

  /* Add Sale */
  async addSale(sale : Sale){
    await addDoc(collection(this.fireStore, `users/${this.authService.getCurrentUser().uid}/sales`),sale);
  }

  /* Delete Sale */
  async deleteSale(id: string){
    await deleteDoc(doc(this.fireStore,`users/${this.authService.getCurrentUser().uid}/sales/${id}`));
  }

  /* Update Sale */
  async updateSale(sale : Sale){
    await setDoc(doc(this.fireStore,`users/${this.authService.getCurrentUser().uid}/sales/${sale.saleId}`),sale)
  }
}
