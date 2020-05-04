import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { Caso } from "../shared/caso.class";

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"],
})
export class Tab1Page implements OnInit {
  caso: Caso = new Caso();
  constructor(private router: Router, private authSvc: AuthService) {}

  ngOnInit() {
    if (sessionStorage.getItem("uid") != null) {
      console.log("Todo bien");
    } else {
      this.router.navigateByUrl("login");
    }
  }

  async saveCaso() {
    const caso = {
      caso: this.caso.caso,
      uid: sessionStorage.getItem("uid"),
    };
    this.authSvc.saveCaso(caso);
  }

  async selectCaso() {
    this.authSvc.selectCaso();
  }

  async logOut() {
    this.router.navigateByUrl("login");
    this.authSvc.logOut();
  }
}
