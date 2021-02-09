import { Component, OnInit } from "@angular/core";
import { APIservicesService } from "../../services/data-service/apiservices.service";

@Component({
  selector: "app-privacy",
  templateUrl: "./privacy.component.html",
  styleUrls: ["./privacy.component.css"],
})
export class PrivacyComponent implements OnInit {
  language = localStorage.getItem("locale");

  PrivacePolicy: any[];
  subjects: any[];
  imageURL: string = localStorage.getItem("imageURL");
  showSpinner: boolean = true;
  constructor(private _service: APIservicesService) {}

  ngOnInit() {
    //show_PrivacePolicy//
    this._service.show_PrivacePolicy(this.language).subscribe((data) => {
      let resources: any[] = data["data"];
      let resources1: any[] = data["subjects"];

      this.PrivacePolicy = resources;
      this.subjects = resources1;
      this.showSpinner = false;
    });
  }
}
