import { Component, OnInit } from "@angular/core";
import { APIservicesService } from "../../services/data-service/apiservices.service";

@Component({
  selector: "app-all-news",
  templateUrl: "./all-news.component.html",
  styleUrls: ["./all-news.component.css"],
})
export class AllNEWSComponent implements OnInit {
  language = localStorage.getItem("locale");
  showSpinner: boolean = true;
  allnews: any[];

  imageURL: string = localStorage.getItem("imageURL");

  constructor(private _service: APIservicesService) {}

  ngOnInit() {
    //show_allNews//
    this._service.show_allNews().subscribe((data) => {
      let resources: any[] = data["data"];
      this.allnews = resources;
      this.showSpinner = false;
    });
  }
}
