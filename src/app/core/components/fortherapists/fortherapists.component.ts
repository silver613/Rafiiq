import { Component, OnInit } from "@angular/core";
import { APIservicesService } from "../../services/data-service/apiservices.service";

@Component({
  selector: "app-fortherapists",
  templateUrl: "./fortherapists.component.html",
  styleUrls: ["./fortherapists.component.css"],
})
export class FortherapistsComponent implements OnInit {
  language = localStorage.getItem("locale");

  opinions: any[];
  news: any[];
  showSpinner: boolean = true;
  imageURL: string = localStorage.getItem("imageURL");

  constructor(private _service: APIservicesService) {}

  ngOnInit() {
    //show_opinions//
    this._service.show_opinions().subscribe((data) => {
      let resources: any[] = data["data"];
      this.opinions = resources;
      this.showSpinner = false;
    });

    //show_someNews//
    this._service.show_someNews().subscribe((data) => {
      let resources: any[] = data["data"];
      this.news = resources;
      this.showSpinner = false;
    });
  }
}
