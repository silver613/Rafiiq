import { Component, OnInit } from "@angular/core";
import { APIservicesService } from "src/app/core/services/data-service/apiservices.service";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
})
export class FooterComponent implements OnInit {
  Aboutrafiq: any;
  language = localStorage.getItem("locale");

  constructor(private _service: APIservicesService) {}

  ngOnInit() {
    this.showAboutUs();
  }
  showAboutUs = () => {
    this._service.show_aboutus("ar").subscribe((data) => {
      let resources: any = data["data"];
      this.Aboutrafiq = resources;
    });
  };
}
