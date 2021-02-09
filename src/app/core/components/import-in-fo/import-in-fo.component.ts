import { Component, OnInit } from "@angular/core";
import $ from "jquery";
import { APIservicesService } from "../../services/data-service/apiservices.service";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: "app-import-in-fo",
  templateUrl: "./import-in-fo.component.html",
})
export class ImportInFoComponent implements OnInit {
  gender: string;
  allinstitutions: any[];
  userid: string = localStorage.getItem("user_id");
  language = localStorage.getItem("locale");
  showSpinner: boolean = false;
  imageURL: string = localStorage.getItem("imageURL");
  idtest: string = localStorage.getItem("idtest");
  ID: string = localStorage.getItem("id");
  report_id;
  constructor(private _service: APIservicesService, private router: Router) {}

  ngOnInit() {
    console.log("idtest=", this.idtest);

    //show_allinstitutions//
    this._service.show_allinstitutions().subscribe((data) => {
      let resources: any[] = data["data"];
      this.allinstitutions = resources;
    });
  }
  ongender(event) {
    this.gender = event.target.value;
    console.log(this.gender);
  }

  submitForm(
    name,
    birth_date,
    examiner_name,
    app_date,
    nationality,
    language,
    main_hand,
    gender,
    school
  ) {
    this.showSpinner = true;

    console.log(
      this.idtest,
      name.value,
      birth_date.value,
      examiner_name.value,
      app_date.value,
      nationality.value,
      language.value,
      main_hand.value,
      this.gender,
      school.value
    );
    this._service
      .make_atest(
        this.idtest,
        name.value,
        birth_date.value,
        examiner_name.value,
        app_date.value,
        nationality.value,
        language.value,
        main_hand.value,
        this.gender,
        school.value
      )
      .subscribe((data) => {
        let error = data["error"];
        let report_id: number = data["report_id"];
        this.report_id = report_id;
        localStorage.setItem("report_id", this.report_id);
        if (error == 0) {
          if (localStorage.getItem("locale") == "en") {
            Swal.fire({
              icon: "success",
              title: "successfully",
              showConfirmButton: false,
              timer: 2000,
            });
          } else {
            Swal.fire({
              icon: "success",
              title: "تم ملئ الاستمارة بنجاح  ",
              showConfirmButton: false,
              timer: 2000,
            });
          }

          this.router.navigate(["/DiseaseTEST", this.idtest]);
        } else {
          if (localStorage.getItem("locale") == "en") {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "refill form may be occur something wrong",
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "املئ الاستمارة مرة اخري ربما حدث خطأ في الارسال",
            });
          }
        }

        this.showSpinner = false;
      });
  }
}
