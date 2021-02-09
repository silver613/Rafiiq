import { Component, OnInit } from "@angular/core";
import { APIservicesService } from "../../services/data-service/apiservices.service";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import Swal from "sweetalert2";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-create-client",
  templateUrl: "./create-client.component.html",
  styleUrls: ["./create-client.component.css"],
})
export class CreateClientComponent implements OnInit {
  showSpinner: boolean = false;
  userid: string = localStorage.getItem("user_id");
  idtest: string = localStorage.getItem("idtest");
  ID: string = localStorage.getItem("id");
  report_id;
  fieldTextType2: boolean;
  fieldTextType1: boolean;
  typeingpassword: boolean;
  typeingemail: boolean;

  createclient = new FormGroup({
    email: new FormControl("", [
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"),
    ]),
    user_name: new FormControl("", Validators.required),
    password: new FormControl("", [
      Validators.required,
      Validators.pattern("^(?=.*d)(?=.*[a-z])|(?=.*[A-Z])(?!.*s).{10,15}$"),
    ]),

    conpassword: new FormControl("", Validators.required),
  });

  constructor(private _service: APIservicesService, private router: Router) {}
  ngOnInit() {}

  get f() {
    return this.createclient.controls;
  }
  toggleFieldTextType1() {
    this.fieldTextType1 = !this.fieldTextType1;
  }

  toggleFieldTextType2() {
    this.fieldTextType2 = !this.fieldTextType2;
  }
  checkpassword(event) {
    this.typeingpassword = true;
    if (
      !/^(?=.*\d)(?=.*[a-z])|(?=.*[A-Z])(?!.*\s).{10,15}$/.test(
        event.target.value
      )
    ) {
      event.target.classList.add("is-invalid");
    } else {
      event.target.classList.remove("is-invalid");
    }
  }
  checkemail(event) {
    this.typeingemail = true;
    if (!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(event.target.value)) {
      event.target.classList.add("is-invalid");
    } else {
      event.target.classList.remove("is-invalid");
    }
  }
  submitclient(fromDate) {
    console.log("ffff", fromDate.controls.password.value);
    if (fromDate.valid) {
      if (
        fromDate.controls.password.value != fromDate.controls.conpassword.value
      ) {
        if (localStorage.getItem("locale") == "en") {
          Swal.fire("Please verify the password matches");
        } else {
          Swal.fire("يرجي التحقق من مطابقة  كلمة المرور");
        }
      } else {
        this.showSpinner = true;

        this._service
          .create_El3mail_account(fromDate, this.userid, this.idtest)
          .subscribe((response) => {
            this.showSpinner = true;

            let error: number = response["error"];
            let data: number = response["report_id"];
            this.report_id = data;
            console.log("ay7aga", this.report_id);

            localStorage.setItem("report_id", this.report_id);

            console.log("error", error);

            if (error == 0) {
              if (localStorage.getItem("locale") == "en") {
                Swal.fire({
                  icon: "success",
                  title: " successfully",
                  showConfirmButton: false,
                  timer: 2000,
                });
              } else {
                Swal.fire({
                  icon: "success",
                  title: "تم الاضافة بنجاح",
                  showConfirmButton: false,
                  timer: 2000,
                });
              }

              this.router.navigate(["/DiseaseTEST", this.ID]);
            } else if (error == 3) {
              if (localStorage.getItem("locale") == "en") {
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "this userbame existed!",
                });
              } else {
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "هذا المستخدم موجود مسبقا!",
                });
              }
            } else if (error == 7) {
              if (localStorage.getItem("locale") == "en") {
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "this email existed!",
                });
              } else {
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "هذا المستخدم موجود مسبقا!",
                });
              }
            } else {
              if (localStorage.getItem("locale") == "en") {
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "Something went wrong!",
                });
              } else {
                Swal.fire({
                  icon: "error",
                  title: "اوبس...",
                  text: "ربما حدث شئ خطأ!",
                });
              }
            }

            this.showSpinner = false;
          });
      }
    } else {
      if (localStorage.getItem("locale") == "en") {
        Swal.fire("Please fill in the fields correctly");
      } else {
        Swal.fire("برجاء ملئ الحقول بشكل صحيح");
      }
    }
  }
}
