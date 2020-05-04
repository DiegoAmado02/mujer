import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { User } from "../shared/user.class";
import * as firebase from "firebase/app";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  user: User = new User();
  picture;
  name;
  email;
  constructor(
    private router: Router,
    private authSvc: AuthService //private crudUser: CrudUserService
  ) {}

  ngOnInit() {}

  async loginGoogle() {
    /*const res = await this.afAuth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    );

    console.log(res);

    const user = res.user;
    console.log(user);
    this.picture = user.photoURL;
    this.name = user.displayName;
    this.email = user.email;
    this.router.navigateByUrl("/tabs/tab1");*/

    const res = await this.authSvc.loginGoogle();
    const user = res.user;

    this.login(user);
  }

  async loginFacebook() {
    const res = await this.authSvc.loginFacebook();
    const user = res.user;

    this.login(user);
  }

  async loginTwitter() {
    const res = await this.authSvc.loginTwitter();
    const user = res.user;

    this.login(user);
  }

  async onLogin() {
    const user = await this.authSvc.onLogin(this.user);
    if (user) {
      console.log("Successfully logge in!");
      //this.router.navigateByUrl("/tabs/tab1");
    }
  }

  async login(user) {
    if (user) {
      console.log(user);

      //DANDO VALORES AL OBJETO USER
      this.user.uid = user.uid;
      this.user.nombre = user.displayName;
      this.user.email = user.email;
      this.user.imgen = user.photoURL;

      //CREACION DE SESSION
      sessionStorage.setItem("uid", user.uid);
      sessionStorage.setItem("user", JSON.stringify(this.user));

      //INSERTANDO USUARIO
      this.authSvc.saveUser(this.user);
      this.router.navigateByUrl("/tabs/tab1");
    }
  }
}
