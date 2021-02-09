import { Component, OnInit } from "@angular/core";
import { APIservicesService } from "../../services/data-service/apiservices.service";
import { Router } from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  showSpinner: boolean = false;
  first_name: string;
  last_name: string;
  user_id: string;
  ID: string;
  email: string;
  passwords: string;
  state: string;
  fieldTextType: boolean;
  tokenfirebase = localStorage.getItem("tokenfirebase");
  emailzom = "aminabdo43@gmail.com";
  // iduserzoom:string;
  constructor(private _service: APIservicesService, private router: Router) {}
  ngOnInit() {}

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
  submitForm(email, passwords) {
    this.showSpinner = true;

    this._service
      .user_login(email.value, passwords.value, this.tokenfirebase)
      .subscribe((data) => {
        let error: number = data["error"];

        if (error == 0) {
          if (localStorage.getItem("locale") == "en") {
            Swal.fire({
              icon: "success",

              title: "login succussfully",
              showConfirmButton: false,
              timer: 1000,
            });
          } else {
            Swal.fire({
              icon: "success",
              title: "تم الدخول بنجاح",
              showConfirmButton: false,
              timer: 1000,
            });
          }

          this.router.navigate(["/index"]).then(() => {
            window.location.reload();
          });
        } else if (error == 6) {
          if (localStorage.getItem("locale") == "en") {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "you must enter email and password!",
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "اوبس...",
              text: "من فضلك اكتب البريد الالكتروني وكلمة السر  !",
            });
          }
        } else if (error == 8) {
          if (localStorage.getItem("locale") == "en") {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "waiting for accepting from admin!",
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "اوبس...",
              text: "في انتظار قبولك من الادمن!",
            });
          }
        } else if (error == 1) {
          if (localStorage.getItem("locale") == "en") {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "you must enter valid email and password!",
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "اوبس...",
              text: "اكتب البريد الالكتروني وكلمة السر بشكل صحيح!",
            });
          }
        } else if (error == 3) {
          if (localStorage.getItem("locale") == "en") {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "please verify your email first",
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "اوبس...",
              text: "افحص بريدك الالكتروني لتفعيل الحساب!",
            });
          }
        } else {
          if (localStorage.getItem("locale") == "en") {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "something went wrong",
            });
          } else {
            Swal.fire({
              icon: "success",
              title: "ربما حدث خطأ",
              showConfirmButton: false,
              timer: 2000,
            });
          }

          this.showSpinner = false;
        }

        this.showSpinner = false;

        let res: any = data["data"];
        this.first_name = res["first_name"];
        this.last_name = res["last_name"];
        this.email = res["email"];
        this.passwords = res["passwods"];
        this.state = res["state"];
        this.user_id = res["user_token"];
        this.ID = res["id"];

        localStorage.setItem("id", this.ID);

        localStorage.setItem("first_name", this.first_name);
        localStorage.setItem("last_name", this.last_name);
        localStorage.setItem("email", this.email);
        localStorage.setItem("passwords", this.passwords);
        localStorage.setItem("state", this.state);

        localStorage.setItem("user_id", this.user_id);
        // localStorage.setItem( 'iduserzoom',this.iduserzoom);

        // console.log("iduserzoom",this.iduserzoom)
      });
  }
}
