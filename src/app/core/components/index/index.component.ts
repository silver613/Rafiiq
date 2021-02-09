import { Component, OnInit } from "@angular/core";
import { APIservicesService } from "../../services/data-service/apiservices.service";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { NgbDate, NgbCalendar } from "@ng-bootstrap/ng-bootstrap";

import Swal from "sweetalert2";
import { MessagingService } from "../../services/messaging-service/messaging.service";

declare var $;

@Component({
  selector: "app-index",
  templateUrl: "./index.component.html",
  styleUrls: ["./index.component.css"],
})
export class IndexComponent implements OnInit {
  hoveredDate: NgbDate | null = null;
  iduserzoom;
  fromDate: NgbDate;
  toDate: NgbDate | null = null;
  closeResult = "";
  show;

  urlSafe: SafeResourceUrl;
  E3lan: any;
  language = localStorage.getItem("locale");
  specialists: any[];
  opinions: any[];
  news: any[];
  doctorcountry: any[];
  doctorspecialists: any[];
  headerdata: any;
  recent_posts: any[];
  posts: any[];
  rafik_work1: any;
  rafik_work2: any;
  imageURL: string = localStorage.getItem("imageURL");
  ImageURl = "./assets/img/default.png";
  userid: string = localStorage.getItem("user_id");
  showSpinner: boolean = true;
  id = parseInt(localStorage.getItem("id"));
  ay7aga = localStorage.getItem("iduserzoom");

  tokenfirebase = localStorage.getItem("tokenfirebase");
  test = localStorage.getItem("title");
  test1 = localStorage.getItem("body");

  constructor(
    calendar: NgbCalendar,
    private messagingService: MessagingService,
    private modalService: NgbModal,
    private _service: APIservicesService,
    public sanitizer: DomSanitizer
  ) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday());
  }

  ngOnInit() {
    //     console.log("iduserzoom1111",this.ay7aga)

    // console.log("test",this.test)
    this.messagingService.requestPermission();
    this.messagingService.receiveMessage();
    this.show = this.messagingService.currentMessage;

    // console.log("fff",localStorage.getItem('first_name'))

    //show_allspecialists//
    this._service
      .home_data(localStorage.getItem("locale"))
      .subscribe((data) => {
        let resources: any = data["data"];
        this.headerdata = resources;
      });

    this._service.getUser("aminabdo43@gmail.com").subscribe((data) => {
      let resources: any = data["users"][0];
      this.iduserzoom = resources["id"];
      // console.log("zooomrafik",this.iduserzoom)
      localStorage.setItem("id_user_zoom", this.iduserzoom);
    });

    //rafik_work1//
    this._service
      .rafik_work1(localStorage.getItem("locale"))
      .subscribe((data) => {
        let resources: any = data["data"];
        this.rafik_work1 = resources;
      });

    //rafik_work2//
    this._service
      .rafik_work2(localStorage.getItem("locale"))
      .subscribe((data) => {
        let resources: any = data["data"];
        this.rafik_work2 = resources;
        this.showSpinner = false;
      });

    //show_allspecialists//
    this._service
      .show_allspecialists(localStorage.getItem("locale"))
      .subscribe((data) => {
        let resources: any[] = data["data"];
        this.specialists = resources;
      });

    //home_blog//
    this._service
      .home_blog(localStorage.getItem("locale"))
      .subscribe((data) => {
        let resources: any[] = data["posts"];
        let resources1: any[] = data["recent_posts"];

        this.posts = resources;
        this.recent_posts = resources1;
      });

    //show_opinions//
    this._service.show_opinions().subscribe((data) => {
      let resources: any[] = data["data"];
      this.opinions = resources;
    });

    //show_someNews//
    this._service.show_someNews().subscribe((data) => {
      let resources: any[] = data["data"];
      this.news = resources;
    });

    //show_doctorcountry//
    this._service
      .show_doctorcountry(localStorage.getItem("locale"))
      .subscribe((data) => {
        let resources: any[] = data["data"];
        this.doctorcountry = resources;
      });

    //show_doctorspecialists//
    this._service
      .show_doctorspecialists(localStorage.getItem("locale"))
      .subscribe((data) => {
        let resources: any[] = data["data"];
        this.doctorspecialists = resources;
      });

    //show_E3lan//
    this._service.show_E3lan().subscribe((data) => {
      let resources: any = data["data"];
      this.E3lan = resources;
      $(window).load(function () {
        $("#myModal").modal("show");
      });
    });
  }
  open(content) {
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }

  submitForm(content) {
    this.showSpinner = true;
    // console.log(content.value,this.userid)
    this._service.make_opinion(this.userid, content.value).subscribe((data) => {
      let error = data["error"];
      if (error == 0) {
        if (localStorage.getItem("locale") == "en") {
          Swal.fire({
            icon: "success",
            title: "send successfully",
            showConfirmButton: false,
            timer: 2000,
          });
        } else {
          Swal.fire({
            icon: "success",
            title: "تم الارسال بنجاح",
            showConfirmButton: false,
            timer: 2000,
          });
        }

        this.modalService.dismissAll(content);
      } else if (error == 1) {
        if (localStorage.getItem("locale") == "en") {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "you must send opinion!",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "اوبس...",
            text: "دخل رأيك اولا!",
          });
        }
      } else {
        if (localStorage.getItem("locale") == "en") {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "something went wrong!",
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
