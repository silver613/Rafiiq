import { Component, LOCALE_ID, Inject } from "@angular/core";
import { NgwWowService } from "ngx-wow";
import { Router } from "@angular/router";
import { NavigationEnd } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { APIservicesService } from "./core/services/data-service/apiservices.service";
var style = document.createElement("style");

//firebase notification
import { AngularFireMessaging } from "@angular/fire/messaging";
import { BehaviorSubject } from "rxjs";
//end notification

import $ from "jquery";
import { MessagingService } from "./core/services/messaging-service/messaging.service";

function changeLanguageAr() {
  document.head.appendChild(style);

  /*******************end add language************* */
}
function changeLanguageEn() {
  document.head.removeChild(style);
}

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "rafiik-WEBSITE";
  language = localStorage.getItem("locale");
  Psychological: any[];
  errorrequest;
  messagerequest;
  social: any;
  userid: string = localStorage.getItem("user_id");
  notification: any[];
  ImageURl = "./assets/img/logo.png";
  count;
  first_name: string = localStorage.getItem("first_name");
  last_name: string = localStorage.getItem("last_name_name");
  email: string = localStorage.getItem("email");

  specialists: any[];
  imageURL = localStorage.setItem(
    "imageURL",
    "https://rafikapi.codecaique.com"
  );
  confirmvalue: string = "yes";
  deletevaue: string = "no";
  //firebase notification
  currentMessage = new BehaviorSubject(null);
  tit = "";
  bod = "";
  test;
  test1;
  show;

  constructor(
    private messagingService: MessagingService,
    private angularFireMessaging: AngularFireMessaging,
    public translate: TranslateService,
    private wowService: NgwWowService,
    private _service: APIservicesService,
    private router: Router
  ) {
    //firebase notification

    this.angularFireMessaging.messaging.subscribe((msgings) => {
      msgings.onMessage = msgings.onMessage.bind(msgings);
      msgings.onTokenRefresh = msgings.onTokenRefresh.bind(msgings);
    });
    //end firebase
    this.wowService.init();

    translate.addLangs(["ar", "en"]);
    if (localStorage.getItem("locale")) {
      const browserLang = localStorage.getItem("locale");
      translate.use(browserLang.match(/en|ar/) ? browserLang : "en");
    } else {
      localStorage.setItem("locale", "en");
      translate.setDefaultLang("en");
    }
  }

  changeLang(language: string) {
    localStorage.setItem("locale", language);
    this.translate.use(language);
    window.location.reload();
    // if (language == "ar") {
    //   myBody.classList.add("rtl");
    // } else if (language == "en") {
    //   myBody.classList.remove("rtl");
    //   myBody.classList.add("ltr");
    // }
  }

  ngOnInit() {
    document.getElementById("zmmtg-root").style.display = "none";
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

    this.messagingService.requestPermission();
    this.messagingService.receiveMessage();
    this.show = this.messagingService.currentMessage;

    $(".pic-chat").click(function () {
      $("#root").show(0, function () {
        $(".pic-chat").hide();
      });
    });

    $(".minus").click(function () {
      $("#root").hide(0, function () {
        $(".pic-chat").show();
      });
    });

    this.first_name = localStorage.getItem("first_name");
    this.last_name = localStorage.getItem("last_name");

    this.userid = localStorage.getItem("user_id");

    localStorage.setItem("imageURL", "https://rafikapi.codecaique.com");

    var d = localStorage.getItem("user_id");

    if (!d) {
      $(".loginbtn").css("display", "inline");
      $(".user-client").css("display", "none");
      $(".client-res").css("display", "none");
      $("#menu").css("display", "none");
    } else if (d) {
      $(".loginbtn").css("display", "none");
      $(".user-client").css("display", "inline");
      $(".client-res").css("display", "inline");
      $("#menu").css("display", "block");
    } else {
      $(".loginbtn").css("display", "inline");
      $(".user-client").css("display", "none");
      $(".client-res").css("display", "none");
      $("#menu").css("display", "none");
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
  }
  //firebase notification

  requestPermission() {
    this.angularFireMessaging.requestToken.subscribe((token) => {
      console.log(token);
      localStorage.setItem("tokenfirebase", token);
    });
  }

  receiveMessage() {
    this.angularFireMessaging.messages.subscribe((msg) => {
      this.tit = msg["notification"]["title"];
      this.bod = msg["notification"]["body"];

      console.log("userid", this.tit);
      console.log("testtttt --->   ", this.bod);
      this.currentMessage.next(msg);
      return msg;
    });
  }

  //end firebase

  switchLanguage(language: string) {
    this.translate.use(language);
    console.log("langwebsite", language);
    localStorage.setItem("locale", language);
  }

  addAr() {
    changeLanguageAr();
    document.getElementById("english").style.display = "inline";
    document.getElementById("arabic").style.display = "none";
    var myBody = document.getElementById("page");
    myBody.classList.add("rtl");
    window.location.reload();
  }

  addEn() {
    changeLanguageEn();
    document.getElementById("english").style.display = "none";
    document.getElementById("arabic").style.display = "inline";
    var myBody = document.getElementById("page");
    myBody.classList.add("ltr");
    window.location.reload();
  }

  testtrainer(dept) {
    this.router.navigate(["/GridList2", dept]).then(() => {
      window.location.reload();
    });
  }

  openNav() {
    document.getElementById("mySidenav").style.width = "250px";
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

  profileclicked() {
    $(".widget-shopping-cart-content").css("display", "none");
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
}
