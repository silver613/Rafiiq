import { Component, OnInit } from "@angular/core";
import { APIservicesService } from "../../services/data-service/apiservices.service";
import { ActivatedRoute, Router } from "@angular/router";
@Component({
  selector: "app-details-faq",
  templateUrl: "./details-faq.component.html",
  styleUrls: ["./details-faq.component.css"],
})
export class DetailsFAQComponent implements OnInit {
  showSpinner: boolean = true;
  language = localStorage.getItem("locale");
  typequestions: any[];
  FAQID: number;
  imageURL: string = localStorage.getItem("imageURL");

  constructor(
    private _service: APIservicesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.FAQID = +this.route.snapshot.paramMap.get("id");

    //show_question_answers//
    this._service
      .show_typequestions(this.language, this.FAQID)
      .subscribe((data) => {
        let resources: any[] = data["data"];
        this.typequestions = resources;
        this.showSpinner = false;
      });
  }
}
