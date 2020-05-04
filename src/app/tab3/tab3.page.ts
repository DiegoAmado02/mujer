import { Component } from "@angular/core";
import { Geolocation } from "@ionic-native/geolocation/ngx";

@Component({
  selector: "app-tab3",
  templateUrl: "tab3.page.html",
  styleUrls: ["tab3.page.scss"],
})
export class Tab3Page {
  latitude: number;
  longitude: number;
  constructor(public geolocation: Geolocation) {}
}

this.geolocation
  .getCurrentPosition()
  .then((resp) => {
    // resp.coords.latitude
    // resp.coords.longitude
  })
  .catch((error) => {
    console.log("Error getting location", error);
  });

let watch = this.geolocation.watchPosition();
watch.subscribe((data) => {
  // data can be a set of coordinates, or an error (if an error occurred).
  // data.coords.latitude
  // data.coords.longitude
});
