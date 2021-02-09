import { Component, OnInit } from "@angular/core";
import $ from "jquery";
import { Router, ActivatedRoute } from "@angular/router";
import { APIservicesService } from "../../services/data-service/apiservices.service";
import {
  NgbDateStruct,
  NgbCalendar,
  NgbDatepickerConfig,
} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-detail-page2",
  templateUrl: "./detail-page2.component.html",
  styleUrls: ["./detail-page2.component.css"],
  providers: [NgbDatepickerConfig],
})
export class DetailPage2Component implements OnInit {
  model: NgbDateStruct;

  docDESC: any;
  docSERV: any[];
  docReview: any[];
  doccertificate: any[];
  docarticle: any[];
  doclang: any[];
  docid: number;
  timeline: any[];
  date: any[];
  language = localStorage.getItem("locale");
  showSpinner: boolean = true;

  imageURL: string = localStorage.getItem("imageURL");
  ay7aga;
  ratttt;
  constructor(
    config: NgbDatepickerConfig,
    private calendar: NgbCalendar,
    private _service: APIservicesService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    const current = new Date();
    config.minDate = {
      year: current.getFullYear(),
      month: current.getMonth() + 1,
      day: current.getDate(),
    };
    //config.maxDate = { year: 2099, month: 12, day: 31 };
    config.outsideDays = "hidden";
  }

  ngOnInit() {
    this.docid = +this.route.snapshot.paramMap.get("id");

    this.showSpinner = true;

    //show_question_answers//
    this._service
      .show_TrainerByid(this.docid, this.language)
      .subscribe((data) => {
        let resources: any = data["data"];
        let resources1: any[] = data["service"];
        let resources2: any[] = data["rating"];
        let resources3: any[] = data["certificate"];
        let resources4: any[] = data["articles"];
        let resources5: any[] = data["language"];
        let resources6: any = data["data"];

        this.ratttt = resources6;
        console.log(this.ratttt.rate);
        this.docDESC = resources;
        this.docSERV = resources1;
        this.docReview = resources2;
        this.doccertificate = resources3;
        this.docarticle = resources4;
        this.doclang = resources5;
        this.ay7aga = this.ratttt.rate;

        this.showSpinner = false;

        console.log("really", this.ratttt);
      });
  }

  onDateSelection(d) {
    $(".noresr").css("display", "block");
    console.log(this.docid, d.day, d.month);
    this._service
      .show_Timelinebyday(this.docid, d.day, d.month, this.language)
      .subscribe((data) => {
        let resources: any[] = data["data"];
        let resources1: any[] = data["date"];

        this.timeline = resources;
        this.date = resources1;
      });
  }

  submitreview() {
    this.router.navigate(["/SubmitReview", this.docid]);
  }
}
