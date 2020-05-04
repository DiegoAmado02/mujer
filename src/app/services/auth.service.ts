import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { User } from "../shared/user.class";
import * as firebase from "firebase/app";
import { Caso } from "../shared/caso.class";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  public isLogged: any = false;
  constructor(public afAuth: AngularFireAuth) {
    afAuth.authState.subscribe((user) => (this.isLogged = user));
  }

  //LOGIN
  async onLogin(user: User) {
    try {
      return await this.afAuth.signInWithEmailAndPassword(
        user.email,
        user.password
      );
    } catch (error) {
      console.log("Error on login user", error);
    }
  }

  //REGISTER

  async onRegister(user: User) {
    try {
      return await this.afAuth.createUserWithEmailAndPassword(
        user.email,
        user.password
      );
    } catch (error) {
      console.log("Error on register user", error);
    }
  }

  //LOGIN WITH GOOGLE

  async loginGoogle() {
    try {
      return await this.afAuth.signInWithPopup(
        new firebase.auth.GoogleAuthProvider()
      );
    } catch (error) {
      console.log("Error on login google", error);
    }
  }

  //LOGIN WITH FACEBOOK
  async loginFacebook() {
    try {
      return await this.afAuth.signInWithPopup(
        new firebase.auth.FacebookAuthProvider()
      );
    } catch (error) {
      console.log("Error on login facebook", error);
    }
  }

  //LOGIN WITH TWITTER

  async loginTwitter() {
    try {
      return await this.afAuth.signInWithPopup(
        new firebase.auth.TwitterAuthProvider()
      );
    } catch (error) {
      console.log("Error on login twitter", error);
    }
  }

  async logOut() {
    this.afAuth.signOut();
    sessionStorage.clear();
  }

  async saveUser(user: User) {
    try {
      firebase
        .database()
        .ref("mujer/users/" + user.uid)
        .set(user);
      console.log("Todo bien");
    } catch (error) {
      console.log("Error on insert user", error);
    }
  }

  //INSERT CASO
  async saveCaso(caso: Caso) {
    try {
      firebase.database().ref("mujer/casos/").push().set(caso);
    } catch (error) {
      console.log("Error on insert caso", error);
    }
  }

  //SELECT CASO
  async selectCaso() {
    try {
      firebase
        .database()
        .ref("mujer/casos/")
        .on(
          "value",
          function (snapshot) {
            console.log(snapshot.val());
          },
          function (errorObject) {
            console.log("The read failed: " + errorObject.code);
          }
        );
    } catch (error) {
      console.log("Error on select caso", error);
    }
  }
}
