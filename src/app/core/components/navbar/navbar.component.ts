import { Component, OnInit } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import $ from "jquery";
import { APIservicesService } from "src/app/core/services/data-service/apiservices.service";
var style = document.createElement("style");
function changeLanguageAr() {
  document.head.appendChild(style);

  /*******************end add language************* */
}
function changeLanguageEn() {
  document.head.removeChild(style);
}
@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit {
  Psychological: any[];
  errorrequest;
  notification: any[];
  specialists: any[];

  social: any;
  userid: string = localStorage.getItem("user_id");
  messagerequest;
  confirmvalue: string = "yes";
  deletevaue: string = "no";
  language = localStorage.getItem("locale");
  ImageURl = "./assets/img/logo.png";

  email: string = localStorage.getItem("email");

  imageURL = localStorage.setItem(
    "imageURL",
    "https://rafikapi.codecaique.com"
  );

  count;
  first_name: string = localStorage.getItem("first_name");
  last_name: string = localStorage.getItem("last_name_name");
  constructor(
    private router: Router,
    public translate: TranslateService,
    private _service: APIservicesService
  ) {}

  ngOnInit() {
    this.first_name = localStorage.getItem("first_name");
    this.last_name = localStorage.getItem("last_name");

    this.userid = localStorage.getItem("user_id");

    localStorage.setItem("imageURL", "https://rafikapi.codecaique.com");

    var d = localStorage.getItem("user_id");

    var down = false;

    $("#bell").click(function (e) {
      var color = $(this).text();
      if (down) {
        $("#box").css("height", "0px");
        $("#box").css("opacity", "0");
        down = false;
      } else {
        $("#box").css("height", "auto");
        $("#box").css("opacity", "1");
        down = true;
      }
    });

    $(".belldropdown").click(function () {
      $(".dropdown-menu1").toggle();
    });

    if (d === null || d === "null" || d === "" || d.length <= 0) {
      $(".loginbtn").css("display", "inline");
      $(".user-client").css("display", "none");
      $(".client-res").css("display", "none");
      $("#menu").css("display", "none");

      console.log("logouttttttttt");
    } else if (d != null || d != "" || d != "") {
      $(".loginbtn").css("display", "none");
      $(".user-client").css("display", "inline");
      $(".client-res").css("display", "inline");
      $("#menu").css("display", "block");
      console.log("loginnnnnn -> ", localStorage.getItem("user_id"));
      console.log("loginnnnnn", this.userid.length);
    } else {
      $(".loginbtn").css("display", "inline");
      $(".user-client").css("display", "none");
      $(".client-res").css("display", "none");
      $("#menu").css("display", "none");
      console.log("loginnnnnn", this.userid);

      console.log("logouttttttttt");
    }

    //Psychological Tests//
    this._service.show_subofcategory(this.language).subscribe((data) => {
      let resources: any[] = data["data"];
      this.Psychological = resources;
      console.log(this.language);
    });

    //show_userNotification/
    this._service
      .show_userNotification(this.userid, this.language)
      .subscribe((data) => {
        let resources: any[] = data["data"];
        let count: number = data["count"];
        this.count = count;
        this.notification = resources;
      });

    //show_aboutus//

    //show_allspecialists//
    this._service.show_allspecialists(this.language).subscribe((data) => {
      let resources: any[] = data["data"];
      this.specialists = resources;
    });

    //social//
    this._service.social().subscribe((data) => {
      let resources: any = data["data"];
      this.social = resources;
    });

    if (localStorage.getItem("locale") == "ar") {
      var myBody = document.getElementById("body");
      myBody.classList.add("rtl");
    }

    //scroll-top//
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }

      var scrollToTop = window.setInterval(function () {
        var pos = window.pageYOffset;
        if (pos > 0) {
          window.scrollTo(0, pos - 20); // how far to scroll on each step
        } else {
          window.clearInterval(scrollToTop);
        }
      }, 0); // how fast to scroll (this equals roughly 60 fps)
    });

    //firebase notification
  }

  openNav() {
    document.getElementById("mySidenav").style.width = "250px";
  }

  testtrainer(dept) {
    this.router.navigate(["/GridList2", dept]).then(() => {
      window.location.reload();
    });
  }

  changeLang(language: string) {
    localStorage.setItem("locale", language);
    this.translate.use(language);
    window.location.reload();
  }

  profileclicked() {
    $(".widget-shopping-cart-content").css("display", "none");
  }

  logout() {
    this._service.user_logout(this.userid).subscribe();
    localStorage.clear();
    $(".user-client").css("display", "none");
    $(".loginbtn").css("display", "inline");
    $(".client-res").css("display", "none");
    $("#menu").css("display", "block");

    this.router.navigate(["/index"]).then(() => {
      window.location.reload();
    });

    this.ngOnInit();
  }

  shownotification() {
    $(".dropdown-menu1").css("display", "block") &&
      // $(".widget-shopping-cart-content").toggle();
      $(".badge").css("display", "none");

    //show_userNotification/
    this._service
      .show_userNotification(this.userid, this.language)
      .subscribe((data) => {
        let resources: any[] = data["data"];
        let count: number = data["count"];
        this.count = count;
        this.notification = resources;
      });
  }

  confirmedrequest(notify_id) {
    this._service
      .accept_parent_request(this.userid, this.confirmvalue, notify_id)
      .subscribe((data) => {
        let error: number = data["error"];
        let message: string = data["message"];

        this.errorrequest = error;
        this.messagerequest = message;
      });
  }

  deletedrequest(notify_id) {
    this._service
      .accept_parent_request(this.userid, this.deletevaue, notify_id)
      .subscribe((data) => {
        let error: number = data["error"];
        let message: string = data["message"];
        this.errorrequest = error;
        this.messagerequest = message;
      });
  }

  closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }
  myAccFunc() {
    var dropdown = document.getElementsByClassName("dropdown-btn");
    var i;

    for (i = 0; i < dropdown.length; i++) {
      dropdown[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var dropdownContent = this.nextElementSibling;
        if (dropdownContent.style.display === "block") {
          dropdownContent.style.display = "none";
        } else {
          dropdownContent.style.display = "block";
        }
      });
    }
  }
}
