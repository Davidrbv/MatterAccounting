import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "src/app/model/user";
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
import { Storage } from "@capacitor/storage";

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(private authService: AuthService, private fireStore: Firestore) {}

  /* Get the only user in getCurrent User's Firebase */
  getUsers(): Observable<User[]> {
    return collectionData(
      collection(
        this.fireStore,
        `users/${this.authService.getCurrentUser().uid}/user`
      ),
      {
        idField: "userId"
      }
    ) as Observable<User[]>;
  }

  /* Get info user to delete by admin */
  getUsersToDelete(id : string): Observable<User[]> {
    return collectionData(
      collection(
        this.fireStore,
        `users/${id}/user`
      ),
      {
        idField: "userId"
      }
    ) as Observable<User[]>;
  }

  /* Add User */
  async addUser(user: User) {
    await addDoc(
      collection(
        this.fireStore,
        `users/${this.authService.getCurrentUser().uid}/user`
      ),
      user
    );
  }

  /* Delete User */
  async deleteUser(uid:string,id: string) {
    await deleteDoc(
      doc(
        this.fireStore,
        `users/${uid}/user/${id}`
      )
    );
  }

  /* Update User */
  async updateUser(user: User) {
    await setDoc(
      doc(
        this.fireStore,
        `users/${this.authService.getCurrentUser().uid}/user/${user.userId}`
      ),
      user
    );
  }

  /* Update Admin Status User */
  async updateAdmin(uid: string, user: User) {
    await setDoc(
      doc(
        this.fireStore,
        `users/${uid}/user/${user.userId}`
      ),
      user
    );
  }

  async saveDateIntoStorage(): Promise<Boolean> {
    const date = new Date();
    await Storage.set({
      key: "date",
      value: date.toString()
    });
    return true;
  }

  async getDateFromStorage(): Promise<String> {
    const tc = await Storage.get({ key: "date" });
    return tc.value!.toString() ? tc.value!.toString() : "Welcome human!!";
  }
}
