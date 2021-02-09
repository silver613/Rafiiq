import { Component, OnInit } from "@angular/core";
import { APIservicesService } from "../../services/data-service/apiservices.service";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  language = localStorage.getItem("locale");
  showSpinner: boolean = false;
  imageURL: string = localStorage.getItem("imageURL");
  allcountry: any[];
  roles: any[];

  typeingfirst_name: boolean;
  typeinglast_name: boolean;
  typeingemail: boolean;
  typeingpasswords: boolean;
  fieldTextType1: boolean;
  fieldTextType2: boolean;

  register = new FormGroup({
    first_name: new FormControl("", [
      Validators.required,
      Validators.pattern("^[\u0621-\u064A\u0660-\u0669a-zA-Z ]*$"),
    ]),
    last_name: new FormControl("", [
      Validators.required,
      Validators.pattern("^[\u0621-\u064A\u0660-\u0669a-zA-Z ]*$"),
    ]),
    user_name: new FormControl("", Validators.required),
    state_id: new FormControl("", Validators.required),
    email: new FormControl("", [
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"),
    ]),
    passwords: new FormControl("", [
      Validators.required,
      Validators.pattern("^(?=.*d)(?=.*[a-z])|(?=.*[A-Z])(?!.*s).{10,15}$"),
    ]),
    conpassword: new FormControl("", Validators.required),
  });

  constructor(private _service: APIservicesService, private router: Router) {}

  ngOnInit() {
    console.log(this.language);

    //show_allcountry//
    this._service.show_allcountry(this.language).subscribe((data) => {
      let resources: any[] = data["data"];
      this.allcountry = resources;
    });

    //show_roles//
    this._service.show_roles(this.language).subscribe((data) => {
      let resources: any[] = data["data"];
      this.roles = resources;
    });
  }

  toggleFieldTextType1() {
    this.fieldTextType1 = !this.fieldTextType1;
  }

  toggleFieldTextType2() {
    this.fieldTextType2 = !this.fieldTextType2;
  }
  get f() {
    return this.register.controls;
  }
  checkfirst_name(event) {
    this.typeingfirst_name = true;
    if (!/^[\u0621-\u064A\u0660-\u0669a-zA-Z ]*$/.test(event.target.value)) {
      event.target.classList.add("is-invalid");
    } else {
      event.target.classList.remove("is-invalid");
    }
  }
  checklast_name(event) {
    this.typeinglast_name = true;
    if (!/^[\u0621-\u064A\u0660-\u0669a-zA-Z ]*$/.test(event.target.value)) {
      event.target.classList.add("is-invalid");
    } else {
      event.target.classList.remove("is-invalid");
    }
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

  checkemail(event) {
    this.typeingemail = true;
    if (!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(event.target.value)) {
      event.target.classList.add("is-invalid");
    } else {
      event.target.classList.remove("is-invalid");
    }
  }

  onSubmit(fromDate) {
    console.log("ffff", fromDate.controls.passwords.value);
    if (fromDate.valid) {
      if (
        fromDate.controls.passwords.value != fromDate.controls.conpassword.value
      ) {
        if (localStorage.getItem("locale") == "en") {
          Swal.fire("Please verify the password matches");
        } else {
          Swal.fire("يرجي التحقق من مطابقة  كلمة المرور");
        }
      } else {
        this.showSpinner = true;
        this._service.regesteration(fromDate).subscribe((response) => {
          let error: number = response["error"];

          console.log("error", error);
          if (error == 1) {
            if (localStorage.getItem("locale") == "en") {
              Swal.fire("please fill all data!");
            } else {
              Swal.fire("من فضلك املئ البيانات");
            }
          } else if (error == 2) {
            if (localStorage.getItem("locale") == "en") {
              Swal.fire("this email is exist");
            } else {
              Swal.fire("البريد الألكتروني موجود مسبقا");
            }
          } else if (error == 5) {
            if (localStorage.getItem("locale") == "en") {
              Swal.fire("user name is exist");
            } else {
              Swal.fire("اسم المستخدم موجود مسبقا");
            }
          } else {
            if (localStorage.getItem("locale") == "en") {
              Swal.fire({
                icon: "success",
                title: "succussfully,check your email",
                showConfirmButton: false,
                timer: 2000,
              });
            } else {
              Swal.fire({
                icon: "success",
                title: "تم التسجيل بنجاح تابع ايميلك",
                showConfirmButton: false,
                timer: 2000,
              });
            }

            this.router.navigate(["/Login"]);

            this.showSpinner = false;
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
