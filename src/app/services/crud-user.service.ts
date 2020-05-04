import { Injectable } from "@angular/core";
import { User } from "../shared/user.class";
import * as firebase from "firebase/app";

@Injectable({
  providedIn: "root",
})
export class CrudUserService {
  constructor(public firedata = firebase.database()) {}

  async saveUser(user: User) {
    try {
      this.firedata.ref("mujer/users/" + user.uid).set(user);
      console.log("Todo bien");
    } catch (error) {
      console.log("Error on insert user", error);
    }
  }
}
