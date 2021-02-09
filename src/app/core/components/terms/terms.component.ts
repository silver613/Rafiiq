import { Component, OnInit } from "@angular/core";
import { APIservicesService } from "../../services/data-service/apiservices.service";

@Component({
  selector: "app-terms",
  templateUrl: "./terms.component.html",
  styleUrls: ["./terms.component.css"],
})
export class TermsComponent implements OnInit {
  language = localStorage.getItem("locale");

  showSpinner: boolean = true;
  conditions: any[];
  subjects: any[];
  imageURL: string = localStorage.getItem("imageURL");

  constructor(private _service: APIservicesService) {}

  ngOnInit() {
    //show_roles_conditions//
    this._service.show_roles_conditions(this.language).subscribe((data) => {
      let resources: any[] = data["data"];
      let resources1: any[] = data["subjects"];

      this.conditions = resources;
      this.subjects = resources1;
      this.showSpinner = false;
    });
  }
}
