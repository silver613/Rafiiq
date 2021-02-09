import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { APIservicesService } from "../../services/data-service/apiservices.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-disease-test",
  templateUrl: "./disease-test.component.html",
  styleUrls: ["./disease-test.component.css"],
})
export class DiseaseTESTComponent implements OnInit {
  testID: string = localStorage.getItem("idtest");
  language = localStorage.getItem("locale");
  questionanswers: any[];
  count: number;
  test;
  ay7aga;
  error1: number;
  showSpinner: boolean = true;
  imageURL: string = localStorage.getItem("imageURL");
  idimag: string = localStorage.getItem("idimag");
  groupNum: number = 1;
  testtype: string = localStorage.getItem("testtype");
  reportid;
  userid: string = localStorage.getItem("user_id");
  report_id: string = localStorage.getItem("report_id");

  constructor(
    private _service: APIservicesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    //show_question_answers//
    this._service
      .test_questions(
        this.testID,
        this.userid,
        this.groupNum,
        this.testtype,
        this.report_id,
        this.idimag
      )
      .subscribe((data) => {
        this.error1 = data["error"];

        let resources: any[] = data["data"];
        let count = data["count"];
        this.questionanswers = resources;
        this.count = count;
        this.showSpinner = false;
      });
  }

  list: any[] = [];
  ansv(question, answer) {
    this.test = answer;
    console.log("qusid test:", question, "ansid", answer);

    this.list.push({ id: question, answer: answer });
    console.log("list1:", JSON.stringify(this.list));
  }

  submitForm() {
    this.showSpinner = true;

    this._service
      .answer_atest22(
        this.userid,
        this.testID,
        this.groupNum,
        this.testtype,
        this.idimag,
        this.report_id,
        this.list
      )
      .subscribe((data) => {
        let reportid: number = data["data"];
        this.reportid = reportid;
        localStorage.setItem("reportid", this.reportid);

        let error: number = data["error"];

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
          this._service
            .test_questions(
              this.testID,
              this.userid,
              this.groupNum,
              this.testtype,
              this.report_id,
              this.idimag
            )
            .subscribe((data) => {
              this.error1 = data["error"];

              let resources: any[] = data["data"];
              let count = data["count"];
              this.questionanswers = resources;
              this.count = count;
              this.showSpinner = false;
            });

          window.location.reload();
        } else {
          if (localStorage.getItem("locale") == "en") {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "retest may be occur something wrong",
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "اوبس...",
              text: "اختر مرة اخري ربما حدث خطأ في الارسال",
            });
          }
        }
        this.showSpinner = false;
      });
  }
}
