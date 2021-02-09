import { Component, OnInit, TemplateRef } from "@angular/core";
import { APIservicesService } from "../../services/data-service/apiservices.service";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";

@Component({
  selector: "app-psychological",
  templateUrl: "./psychological.component.html",
  styleUrls: ["./psychological.component.css"],
})
export class PsychologicalComponent implements OnInit {
  showSpinner: boolean = true;
  testtype: string = localStorage.getItem("testtype");
  userid: string = localStorage.getItem("user_id");
  ID: string = localStorage.getItem("id");
  state: string = localStorage.getItem("state");
  TESTID: string;
  language = localStorage.getItem("locale");
  Psychological: any[];
  loginbuy;
  imageURL: string = localStorage.getItem("imageURL");
  payway;
  paid: string = "1";
  modalRef: BsModalRef;
  constructor(
    private _service: APIservicesService,
    private router: Router,
    private modalService: BsModalService
  ) {}
  ngOnInit() {
    console.log("ayhary", this.testtype);

    //Psychological Tests//
    this._service.show_subofcategory(this.language).subscribe((data) => {
      let resources: any[] = data["data"];
      this.Psychological = resources;
      console.log(this.language);
      this.showSpinner = false;
    });
  }

  onpayway(event) {
    this.payway = event.target.value;
  }
  checktest(testtype) {
    testtype = 1;
    localStorage.setItem("testtype", testtype);
    if (
      localStorage.getItem("user_id") != "null" &&
      localStorage.getItem("user_id") != ""
    ) {
      this.router.navigate(["/DiseaseTEST", this.ID]);
    } else this.router.navigate(["/Login"]);
  }
  idtestt;
  takeId(idtest) {
    localStorage.setItem("idtest", idtest);

    this.idtestt = idtest;

    //check_testbuy//
    this._service.check_testbuy(this.userid, idtest).subscribe((data) => {
      let loginbuy: number = data["data"];
      this.loginbuy = loginbuy;
      console.log("buylogin", loginbuy);
    });
  }
  checktest2(testtype) {
    testtype = 2;
    localStorage.setItem("testtype", testtype);
  }

  openModal2(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  submitForm() {
    this.showSpinner = true;
    console.log(this.userid, this.idtestt, this.payway, this.paid);
    this._service
      .buy_atest(this.userid, this.idtestt, this.payway, this.paid)
      .subscribe((data) => {
        let error: number = data["error"];
        if (error == 0) {
          Swal.fire({
            icon: "success",
            title: "baid successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
        }
        this.showSpinner = false;
      });
  }
}
