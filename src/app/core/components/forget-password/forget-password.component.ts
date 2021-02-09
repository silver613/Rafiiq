import { Component, OnInit } from "@angular/core";
import { APIservicesService } from "../../services/data-service/apiservices.service";
import { Router } from "@angular/router";
import Swal from "sweetalert2";

declare var $;
@Component({
  selector: "app-forget-password",
  templateUrl: "./forget-password.component.html",
  styleUrls: ["./forget-password.component.css"],
})
export class ForgetPasswordComponent implements OnInit {
  showSpinner: boolean = false;

  email: string;

  constructor(private _service: APIservicesService, private router: Router) {}
  ngOnInit() {}

  submitForm(email) {
    this.showSpinner = true;

    this._service.forget_password(email.value).subscribe((data) => {
      let error: number = data["error"];
      let data1: string = data["data"];
      localStorage.setItem("email-reset", data1);

      if (error == 0) {
        if (localStorage.getItem("locale") == "en") {
          Swal.fire({
            icon: "success",
            title: "Done check your email",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          Swal.fire({
            icon: "success",
            title: "تم بنجاح افحص بريدك الألكتروني",
            showConfirmButton: false,
            timer: 2000,
          });
        }

        this.router.navigate(["/resetpassword"]);
      } else {
        if (localStorage.getItem("locale") == "en") {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "please enter a correct email!",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "اوبس...",
            text: "من فضلك دخل بريدك الألكتروني الصحيح!",
          });
        }

        this.showSpinner = false;
      }
    });
  }
}
