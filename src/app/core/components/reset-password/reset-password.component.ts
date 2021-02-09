import { Component, OnInit } from "@angular/core";

import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { APIservicesService } from "../../services/data-service/apiservices.service";

@Component({
  selector: "app-reset-password",
  templateUrl: "./reset-password.component.html",
  styleUrls: ["./reset-password.component.css"],
})
export class ResetPasswordComponent implements OnInit {
  showSpinner: boolean = false;
  emailreset: string = localStorage.getItem("email-reset");
  email: string;
  typeingpasswords: boolean;

  resetpassword = new FormGroup({
    code: new FormControl("", Validators.required),

    password: new FormControl("", [
      Validators.required,
      Validators.pattern("^(?=.*d)(?=.*[a-z])|(?=.*[A-Z])(?!.*s).{10,15}$"),
    ]),

    conpassword: new FormControl("", Validators.required),
  });
  constructor(private _service: APIservicesService, private router: Router) {}
  ngOnInit() {}

  get f() {
    return this.resetpassword.controls;
  }
  checkpassword(event) {
    this.typeingpasswords = true;
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

  submitForm(fromDate) {
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
          .Reset_password(fromDate, this.emailreset)
          .subscribe((response) => {
            let error: number = response["error"];

            if (error == 3) {
              if (localStorage.getItem("locale") == "en") {
                Swal.fire("please enter a correct Code!");
              } else {
                Swal.fire("من فضلك دخل الكود الصحيح!");
              }
            } else if (error == 1) {
              if (localStorage.getItem("locale") == "en") {
                Swal.fire("please fill all the data!");
              } else {
                Swal.fire("من فضلك دخل املئ البيانات !");
              }
            } else if (error == 0) {
              if (localStorage.getItem("locale") == "en") {
                Swal.fire({
                  icon: "success",
                  title: "password changed",
                  showConfirmButton: false,
                  timer: 2000,
                });
              } else {
                Swal.fire({
                  icon: "success",
                  title: "تم تغيير كلمة المرور",
                  showConfirmButton: false,
                  timer: 2000,
                });
              }

              this.router.navigate(["/Login"]);
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
