import { Component, OnInit } from "@angular/core";
import { APIservicesService } from "../../services/data-service/apiservices.service";
import { Router } from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: "app-login2",
  template: `<main class="margin_60_35">
      <div class="bg_color_2">
        <div class="container margin_60_35">
          <div id="login">
            <h1>{{ "Please Enter the Code!" | translate }}</h1>
            <div class="box_form">
              <form #form="ngForm" (ngSubmit)="submitForm(code)">
                <div class="form-group">
                  <label>{{ "Enter the Code" | translate }}</label>
                  <input #code name="code" type="number" class="form-control" />
                </div>

                <div class="form-group text-center add_top_20">
                  <input
                    class="btn_1 medium"
                    value="{{ 'Submit' | translate }}"
                    type="submit"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
    <!-- /main -->

    <div id="page-preloader" *ngIf="showSpinner">
      <div id="spinner-three">
        <div id="inner"></div>
        <div id="outer"></div>
      </div>
    </div> `,
})
export class Login2Component implements OnInit {
  showSpinner: boolean = false;
  userid: string = localStorage.getItem("user_id");
  idtest: string = localStorage.getItem("idtest");
  ID: string = localStorage.getItem("id");
  report_id;

  constructor(private _service: APIservicesService, private router: Router) {}
  ngOnInit() {}

  submitForm(code) {
    this.showSpinner = true;

    console.log(this.userid, code.value, this.idtest);
    this._service
      .el3amil_code(this.userid, code.value, this.idtest)
      .subscribe((data) => {
        let error: number = data["error"];

        if (error == 0) {
          if (localStorage.getItem("locale") == "en") {
            Swal.fire({
              icon: "success",
              title: "code entered successfully",
              showConfirmButton: false,
              timer: 2000,
            });
          } else {
            Swal.fire({
              icon: "success",
              title: "تم ادخال الكود بنجاح  ",
              showConfirmButton: false,
              timer: 2000,
            });
          }

          this.router.navigate(["/DiseaseTEST", this.ID]);
        } else {
          if (localStorage.getItem("locale") == "en") {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "code incorrect, write correct code",
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "اوبس...",
              text: "الكود خظأ ,اكتب الكود الصحيح",
            });
          }

          this.showSpinner = false;
        }

        let report_id: number = data["report_id"];
        this.report_id = report_id;
        localStorage.setItem("report_id", this.report_id);
      });
  }
}
