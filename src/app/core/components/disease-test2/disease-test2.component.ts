import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { APIservicesService } from "../../services/data-service/apiservices.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-disease-test2",
  templateUrl: "./disease-test2.component.html",
})
export class DiseaseTest2Component implements OnInit {
  testID: string = localStorage.getItem("idtest");
  language = localStorage.getItem("locale");
  imageURL: string = localStorage.getItem("imageURL");
  reportid2;
  showSpinner: boolean = true;
  questionanswers: any[];
  count: number;
  reportid: string = localStorage.getItem("reportid");
  groupNum: number = 1;
  testtype: string = localStorage.getItem("testtype");

  userid: string = localStorage.getItem("user_id");

  constructor(
    private _service: APIservicesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    //show_question_answers//
    this._service.testA_questions_group2(this.testID).subscribe((data) => {
      let resources: any[] = data["data"];
      let count = data["count"];
      this.questionanswers = resources;
      this.count = count;
      this.showSpinner = false;
    });
  }

  list: any[] = [];
  anslist2(question, answer) {
    console.log("qusid test:", question, "ansid", answer);

    this.list.push({ id: question, answer: answer });
    console.log("list1:", JSON.stringify(this.list));
  }
  result() {
    this.showSpinner = true;
    this._service.answer_Btest(this.reportid, this.list).subscribe((data) => {
      let reportid2: number = data["data"];
      this.reportid2 = reportid2;
      localStorage.setItem("reportid2", this.reportid2);
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
        this.router.navigate(["/ResultTest", this.reportid2]);
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

      this.showSpinner = true;
    });
  }
}
