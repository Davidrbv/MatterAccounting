import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user';
import { AuthService } from './auth.service';
import { addDoc, collection, collectionData, deleteDoc, doc, docData, Firestore, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(private authService : AuthService,
              private fireStore : Firestore) {}

  
  /* Get one User */
  getUser(id : string): Observable<User>{
    return docData(doc(this.fireStore,`users/${this.authService.getCurrentUser().uid}/user/${id}`),{
      idField: 'userId',
    }) as Observable<User>
  }

  /* Get the only user in getCurrent User's Firebase */
  getUsers(): Observable<User[]>{
    return collectionData(collection(this.fireStore, `users/${this.authService.getCurrentUser().uid}/user`), {
      idField: 'userId',
    }) as Observable<User[]>;
  }

  /* Add User */
  async addUser(user : User){
    await addDoc(collection(this.fireStore, `users/${this.authService.getCurrentUser().uid}/user`), user);
  }

  /* Delete User */
  async deleteUser(id: string){
    await deleteDoc(doc(this.fireStore,`users/${this.authService.getCurrentUser().uid}/user/${id}`));
  }

  /* Update User */
  async updateUser(user : User){
    await setDoc(doc(this.fireStore,`users/${this.authService.getCurrentUser().uid}/user/${user.userId}`),user)
  }
}
