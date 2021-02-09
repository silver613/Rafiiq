import { Component, OnInit, TemplateRef } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { APIservicesService } from "../../services/data-service/apiservices.service";
import Swal from "sweetalert2";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";

@Component({
  selector: "app-booking-page",
  templateUrl: "./booking-page.component.html",
})
export class BookingPageComponent implements OnInit {
  modalRef: BsModalRef;

  showSpinner: boolean = true;

  timelineid: number;
  payway;
  payment: number = 1;
  description: any[];
  language = localStorage.getItem("locale");
  userid: string = localStorage.getItem("user_id");
  imageURL: string = localStorage.getItem("imageURL");

  constructor(
    private modalService: BsModalService,
    private _service: APIservicesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.timelineid = +this.route.snapshot.paramMap.get("id");
    console.log("timeline", this.timelineid, this.userid);

    //show_oneTimeline//
    this._service
      .show_oneTimeline(this.userid, this.timelineid)
      .subscribe((data) => {
        let resources: any = data["data"];
        this.description = resources;
        this.showSpinner = false;
      });
  }
  onpayway(event) {
    this.payway = event.target.value;
    console.log(this.payway);
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  pay() {
    this.showSpinner = true;

    console.log(this.userid, this.timelineid, this.payway, this.payment);
    this._service
      .reserve_timeline(this.userid, this.timelineid, this.payway, this.payment)
      .subscribe((data) => {
        let error: number = data["error"];

        if (error == 0) {
          if (localStorage.getItem("locale") == "en") {
            Swal.fire({
              icon: "success",
              title: "baid successfully",
              showConfirmButton: false,
              timer: 2000,
            });
          } else {
            Swal.fire({
              icon: "success",
              title: "تم الدفع بنجاح",
              showConfirmButton: false,
              timer: 2000,
            });
          }

          this.router.navigate(["/Confirm"]);
        } else if (error == 6) {
          if (localStorage.getItem("locale") == "en") {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "you must recharge your wallet",
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "اوبس...",
              text: "محفظتك لا تكفي يجب اعادة شحن المحفظة",
            });
          }
        } else if (error == 7) {
          if (localStorage.getItem("locale") == "en") {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "you cant reserve a session of you",
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "اوبس...",
              text: "لا تستطيع حجز جلسة لنفسك",
            });
          }
        } else if (error == 8) {
          if (localStorage.getItem("locale") == "en") {
            Swal.fire("waiting for baid soon");
          } else {
            Swal.fire("في انتظار دفعك قريبا");
          }

          this.router.navigate(["/GridList"]);
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
