import { Component, OnInit } from "@angular/core";
import { APIservicesService } from "../../services/data-service/apiservices.service";

import { Router } from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: "app-update-profile",
  templateUrl: "./update-profile.component.html",
  styleUrls: ["./update-profile.component.css"],
})
export class UpdateProfileComponent implements OnInit {
  userid: string = localStorage.getItem("user_id");
  passwords: string = localStorage.getItem("passwords");
  state: string = localStorage.getItem("state");
  imageURL: string = localStorage.getItem("imageURL");
  language = localStorage.getItem("locale");
  showSpinner: boolean = true;
  ImageURl = "./assets/img/default.png";
  ImageURl1 = "./assets/img/default.png";
  userdata: any;
  gender;
  allcountry: any[];
  social: any[];
  selectedImage: File;

  constructor(private _service: APIservicesService, private router: Router) {}
  handlefileInput(file: FileList) {
    this.selectedImage = file.item(0);
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.ImageURl = event.target.result;
    };
    reader.readAsDataURL(this.selectedImage);
  }

  ngOnInit() {
    //show_allcountry//
    this._service.show_allcountry(this.language).subscribe((data) => {
      let resources: any[] = data["data"];
      this.allcountry = resources;
    });

    //show_social_status//
    this._service.show_social_status().subscribe((data) => {
      let resources: any[] = data["data"];
      this.social = resources;
    });

    //show_user//
    this._service.show_user(this.userid, this.language).subscribe((data) => {
      let resources: any = data["data"];
      this.userdata = resources;
      this.showSpinner = false;
    });
  }

  ongender(event) {
    this.gender = event.target.value;
    console.log(this.gender);
  }

  submitForm(
    first_name,
    last_name,
    user_name,
    phone,
    email,
    country_id,
    birth_date,
    nationality,
    job
  ) {
    this.showSpinner = true;
    console.log(
      "update",
      this.userid,
      this.selectedImage,
      first_name.value,
      last_name.value,
      user_name.value,
      phone.value,
      email.value,
      this.gender,
      country_id.value,
      birth_date.value,
      nationality.value,
      job.value
    );
    this._service
      .edit_userProfile(
        this.userid,
        this.selectedImage,
        first_name.value,
        last_name.value,
        user_name.value,
        phone.value,
        email.value,
        this.gender,
        country_id.value,
        birth_date.value,
        nationality.value,
        job.value
      )
      .subscribe((data) => {
        let error = data["error"];
        let message = data["message"];
        if (error == 0) {
          if (localStorage.getItem("locale") == "en") {
            Swal.fire({
              icon: "success",
              title: "updated successfuly",
              showConfirmButton: false,
              timer: 2000,
            });
          } else {
            Swal.fire({
              icon: "success",
              title: "تم التعديل بنجاح",
              showConfirmButton: false,
              timer: 2000,
            });
          }

          this.router.navigate(["/profile"]);
        } else if (error == 4) {
          if (localStorage.getItem("locale") == "en") {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Phone Number already exists",
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "اوبسس...",
              text: " رقم الموبايل موجود مسبقا",
            });
          }
        } else if (error == 6) {
          if (localStorage.getItem("locale") == "en") {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "userName already exists",
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "اوبسس...",
              text: "اسم المستخدم موجود مسبقا",
            });
          }
        } else if (error == 5) {
          if (localStorage.getItem("locale") == "en") {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Email already exists",
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "اوبسس...",
              text: "البريد الألكتروني موجود مسبقا",
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
              text: "ربما حدث خطأ!",
            });
          }
        }

        this.showSpinner = false;
      });
  }
}
