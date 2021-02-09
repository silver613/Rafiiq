import { Component, OnInit } from "@angular/core";

import { ActivatedRoute } from "@angular/router";
import { APIservicesService } from "../../services/data-service/apiservices.service";

import Swal from "sweetalert2";

const now = new Date();

@Component({
  selector: "app-submit-review",
  templateUrl: "./submit-review.component.html",
})
export class SubmitReviewComponent implements OnInit {
  max = 5;
  rate: number;
  isReadonly = false;
  showSpinner: boolean = false;
  overStar: string;
  percent: string;

  hoveringOver(value: string): void {
    this.overStar = value;
    this.percent = value;
  }

  userid: string = localStorage.getItem("user_id");

  docid: string;

  imageURL: string = localStorage.getItem("imageURL");

  constructor(
    private _service: APIservicesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.docid = this.route.snapshot.paramMap.get("id");
  }

  submitform(comment) {
    console.log("hgg", comment.value, this.overStar);
    this.showSpinner = true;
    this._service
      .make_rating(this.userid, this.docid, this.overStar, comment.value)
      .subscribe((data) => {
        let error = data["error"];
        if (error == 0) {
          if (localStorage.getItem("locale") == "en") {
            Swal.fire({
              icon: "success",
              title: "send successfully",
              showConfirmButton: false,
              timer: 2000,
            });
          } else {
            Swal.fire({
              icon: "success",
              title: "تم الارسال بنجاح",
              showConfirmButton: false,
              timer: 2000,
            });
          }
        } else if (error == 1) {
          if (localStorage.getItem("locale") == "en") {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "you must enter rating!",
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "اوبس...",
              text: "دخل تقييمك اولا!",
            });
          }
        } else {
          if (localStorage.getItem("locale") == "en") {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "something went wrong!",
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "اوبس...",
              text: "ربما حدث خطأ!",
            });
          }
        }

        this.showSpinner = false;
      });
  }
}
