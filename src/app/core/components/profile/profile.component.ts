import {
  Component,
  OnInit,
  TemplateRef,
  AfterViewInit,
  ElementRef,
  ViewChild,
} from "@angular/core";
import $ from "jquery";
import { APIservicesService } from "../../services/data-service/apiservices.service";

import { Router } from "@angular/router";

import Swal from "sweetalert2";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";

import { NotifierService } from "angular-notifier";
import { FileUploader } from "ng2-file-upload";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { Observable } from "rxjs";
declare var require: any;
const FileSaver = require("file-saver");

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
})
export class ProfileComponent implements OnInit {
  @ViewChild("sessionInfo", { static: false }) sessionInfo: ElementRef;
  Timeline = [];
  TimeByMinutes$: Observable<number>;
  isShowSessionTime = false;
  isChecked = false;
  select = "Select All";
  enableDelete = false;
  listOfAllCheckedTimlineIds = [];
  listOfTimelineIds = [];
  closeResult = "";
  showSpinner: boolean = true;
  uploader = new FileUploader({
    maxFileSize: 1024 * 1024 * 1,
  });
  max = 5;
  rate: number;
  isReadonly = false;

  overStar: number;
  percent: number;
  reservation_id;
  useriD;
  myVar = "http://localhost:2456/72928470942";

  deleteSelectedTimlines() {
    const language = localStorage.getItem("locale");
    const user_token = localStorage.getItem("user_id");

    if (localStorage.getItem("locale") == "en") {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        this.showSpinner = true;

        if (result.value) {
          this._service
            .deleteSelectedTimeline(
              this.listOfTimelineIds,
              user_token,
              language
            )
            .subscribe((data) => {
              let error: number = data["error"];
              if (error == 0) {
                Swal.fire(
                  "Deleted!",
                  "Your appointment has been deleted.",
                  "success"
                );
              } else {
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "Something went wrong!",
                });
              }
            });
        }

        //show_Timeline//
        this._service.show_Timeline(this.userid).subscribe((data) => {
          let resources: any[] = data["day"];

          this.Timeline = resources;

          this.showSpinner = false;
        });

        this.showSpinner = false;
      });
    } else {
      Swal.fire({
        title: "هل انت متأكد؟",
        text: "لا تستطيع اعادة هذا مرة اخري",
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "انهاء",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "نعم ,احذف!",
      }).then((result) => {
        this.showSpinner = true;

        if (result.value) {
          this._service
            .deleteSelectedTimeline(
              this.listOfTimelineIds,
              user_token,
              language
            )
            .subscribe((data) => {
              let error: number = data["error"];
              if (error == 0) {
                Swal.fire({
                  icon: "success",
                  confirmButtonText: "تم",
                  title: "حذفت!",
                  text: "تم حذف المعاد",
                });
              } else {
                Swal.fire({
                  icon: "error",
                  title: "اوبس...",
                  text: "ربما حدث خطأ,حاول مرة اخري!",
                });
              }
            });
        }

        //show_Timeline//
        this._service.show_Timeline(this.userid).subscribe((data) => {
          let resources: any[] = data["day"];

          this.Timeline = resources;
          this.showSpinner = false;
        });

        this.showSpinner = false;
      });
    }
    this.showSpinner = false;
  }

  handleChange(id) {
    let element = <HTMLInputElement>document.getElementById(id);

    var n = this.listOfTimelineIds.includes(id);

    if (element.checked) {
      if (!n) {
        this.listOfTimelineIds.push(id);
      }
      this.enableDelete = true;
    } else {
      for (var i = 0; i < this.listOfTimelineIds.length; i++) {
        if (this.listOfTimelineIds[i] === id) {
          this.listOfTimelineIds.splice(i, 1);
        }
      }
      if (this.listOfTimelineIds.length > 0) {
        this.enableDelete = true;
      } else {
        this.enableDelete = false;
      }
    }
  }
  toggleSelectAll() {
    this.isChecked = !this.isChecked;
    if (this.isChecked) {
      this.enableDelete = true;
      this.select = "Un Select All";
      for (var i = 0; i < this.listOfAllCheckedTimlineIds.length; i++) {
        this.listOfTimelineIds.push(this.listOfAllCheckedTimlineIds[i]);
      }
    } else {
      this.enableDelete = false;
      this.select = "Select All";
      for (var i = 0; i < this.listOfAllCheckedTimlineIds.length + 1; i++) {
        this.listOfTimelineIds.pop();
      }
    }
  }
  hoveringOver(value: number): void {
    this.overStar = value;
    this.percent = value;
  }

  rate1: number;

  overStar1: number;
  percent1: number;
  hoveringOver1(value: number): void {
    this.overStar1 = value;
    this.percent1 = value;
  }

  rate2: number;

  overStar2: number;
  percent2: number;

  hoveringOver2(value: number): void {
    this.overStar2 = value;
    this.percent2 = value;
  }

  uploadvideo(file: FileList) {
    this.selectedvideo = file.item(0);
    var reader = new FileReader();

    reader.readAsDataURL(this.selectedvideo);
  }

  private readonly notifier: NotifierService;

  modalRef: BsModalRef;
  modalRef1: BsModalRef;
  modalRef2: BsModalRef;
  modalRef7: BsModalRef;
  modalRef8: BsModalRef;
  modalRef9: BsModalRef;
  modalRef78: BsModalRef;
  selectfilereport: File;
  urlSafe: SafeResourceUrl;
  userid: string = localStorage.getItem("user_id");
  passwords: string = localStorage.getItem("passwords");
  state: string = localStorage.getItem("state");
  imageURL: string = localStorage.getItem("imageURL");
  language = localStorage.getItem("locale");

  ImageURl = "./assets/img/default.png";
  ImageURl1 = "./assets/img/default.png";
  allcountry: any[];
  social: any[];
  childrens: any[];
  gender: string;
  selectedvideo: File;
  userdata: any;
  nextsession: any[];
  zoomreports: any[];
  allinstitutions: any[];
  previoussession: any[];
  trainerseesions: any[];
  trainercount;
  nextcount;
  previousecount;
  reports: any[];
  video;
  credit;
  PreviousDealings: any[];
  Psychological: any[];
  Educational: any[];
  children: any[];
  idtimeline: string;
  timelinedata: any;
  languages: any[];
  showlangs: any[];
  certificate: any[];
  tests: any[];
  cerdata: any;
  shared_reports: any[];
  student_result: any[];
  class_result: any[];
  idtcertifacate: string;
  specialists: any[];
  allspecial: any[];
  myclasses: any[];
  teachers: any[];
  students: any[];
  onestudents: any[];
  typeingpasswords: boolean;
  typeingemail: boolean;
  selectvideo: File;
  typeingfirst_name: boolean;
  fieldTextType1: boolean;
  fieldTextType2: boolean;
  fieldTextType3: boolean;
  fieldTextType4: boolean;
  fieldTextType5: boolean;
  typeingpasswords1: boolean;
  typeingemail1: boolean;
  typeingfirst_name1: boolean;
  selectedImage: File;
  id_user_zoom = localStorage.getItem("id_user_zoom");
  password_zoom = "123456";
  numbermeeting;
  join_url;
  start_url;
  type;
  password;
  pstn_password;
  selectImagechild1: File;
  passwordsss = new FormGroup({
    currentpassword: new FormControl("", Validators.required),
    passwords: new FormControl("", [
      Validators.required,
      Validators.pattern("^(?=.*d)(?=.*[a-z])|(?=.*[A-Z])(?!.*s).{10,15}$"),
    ]),

    conpassword: new FormControl("", Validators.required),
  });

  newchild = new FormGroup({
    first_name: new FormControl("", [
      Validators.required,
      Validators.pattern("^[\u0621-\u064A\u0660-\u0669a-zA-Z ]*$"),
    ]),
    user_name: new FormControl("", Validators.required),
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

  constructor(
    private modalService1: NgbModal,
    private _service: APIservicesService,
    private notifierService: NotifierService,
    public sanitizer: DomSanitizer,
    private modalService: BsModalService,
    private router: Router
  ) {
    this.notifier = notifierService;
  }
  goMeeting = (meeting_id, password, type, start_url) => {
    const obj = { meeting_id, password, type, start_url };
    this._service.ZoomDetails$.next(obj);
    this.router.navigate(["/zoom-meeting"]);
  };
  uploadfile(file: FileList) {
    this.selectfilereport = file.item(0);
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.ImageURl = event.target.result;
    };
    reader.readAsDataURL(this.selectfilereport);
  }
  handleimageInput(file: FileList) {
    this.selectedImage = file.item(0);
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.ImageURl = event.target.result;
    };
    reader.readAsDataURL(this.selectedImage);
  }

  handimgechild1(file: FileList) {
    this.selectImagechild1 = file.item(0);
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.ImageURl = event.target.result;
    };
    reader.readAsDataURL(this.selectImagechild1);
  }

  handlefileInput(file: FileList) {
    if (file == null) {
      console.log("null file 1111");
    } else {
      console.log("good jop");
    }
    this.selectvideo = file.item(0);
  }
  downloadFile = (report) => {
    let baseurl = this.imageURL + "/uploads/sessionReports/";
    const url = report.pdf || report.image || report.video;
    baseurl = baseurl + url;
    FileSaver.saveAs(baseurl, url);
  };
  get f() {
    return this.passwordsss.controls;
  }

  get ff() {
    return this.newchild.controls;
  }
  get sortData() {
    if (this.Timeline) {
      return this.Timeline.sort((a, b) => {
        return <any>new Date(a.date) - <any>new Date(b.date);
      });
    } else return;
  }

  ngOnInit() {
    
    this.TimeByMinutes$ = this._service.TimeByMinutes$;
    this.userid = localStorage.getItem("user_id");
    this.state = localStorage.getItem("state");

    //show_allcountry//
    this._service.show_allcountry(this.language).subscribe((data) => {
      let resources: any[] = data["data"];
      this.allcountry = resources;
    });

    //show_sessionReports//
    this._service.show_sessionReports(this.userid).subscribe((data) => {
      let resources: any[] = data["data"];
      this.zoomreports = resources;
    });

    //show_allchildern//
    this._service.show_allchildern(this.userid).subscribe((data) => {
      this.showSpinner = true;

      let error: number = data["error"];
      if (error == 0) {
        let resources: any[] = data["data"];
        this.childrens = resources;
        this.showSpinner = false;
      } else if (error == 3) {
        this.router.navigate(["/Login"]);
        this.showSpinner = false;
      }
    });

    //show_social_status//
    this._service.show_social_status().subscribe((data) => {
      let resources: any[] = data["data"];
      this.social = resources;
    });

    //show_user//
    this._service.show_user(this.userid, this.language).subscribe((data) => {
      this.showSpinner = true;

      let error: number = data["error"];
      if (error == 0) {
        let resources: any = data["data"];
        this.userdata = resources;
        this.showSpinner = false;
      } else if (error == 3) {
        this.router.navigate(["/Login"]);
        this.showSpinner = false;
      }
    });

    //show_allinstitutions//
    this._service.show_allinstitutions().subscribe((data) => {
      let resources: any = data["data"];
      this.allinstitutions = resources;
    });

    //show_usernext_session//
    this._service.show_usernext_session(this.userid).subscribe((data) => {
      let error: number = data["error"];
      if (error == 0) {
        let resources: any[] = data["data"];
        let nextcount: number = data["count"];
        this.nextcount = nextcount;

        this.nextsession = resources;
      } else if (error == 3) {
        this.router.navigate(["/Login"]);
      }

      this.showSpinner = false;
    });
    //show_trainernext_session//
    this._service.show_trainernext_session(this.userid).subscribe((data) => {
      let error: number = data["error"];
      if (error == 0 || error == 1) {
        let resources: any[] = data["data"];
        let trainercount: number = data["count"];
        this.trainercount = trainercount;

        this.trainerseesions = resources;
      } else if (error == 3) {
        this.router.navigate(["/Login"]);
      }

      this.showSpinner = false;
    });

    //show_user_previouse_sessions//
    this._service
      .show_user_previouse_sessions(this.userid)
      .subscribe((data) => {
        let error: number = data["error"];
        if (error == 0) {
          let resources: any[] = data["data"];
          let previousecount: number = data["count"];
          this.previousecount = previousecount;

          this.previoussession = resources;
        } else if (error == 3) {
          this.router.navigate(["/Login"]);
        }
        this.showSpinner = false;
      });

    //show_reports//
    this._service.show_Trainerreports(this.userid).subscribe((data) => {
      let resources: any[] = data["data"];

      this.reports = resources;
      this.showSpinner = false;
    });

    //show_video//
    this._service.show_video(this.userid).subscribe((data) => {
      let video: any = data["video"];

      this.video = video;
      this.showSpinner = false;
    });

    //show_wallet//
    this._service.show_wallet(this.userid).subscribe((data) => {
      let credit: number = data["credit"];

      this.credit = credit;
      console.log(credit);
      this.showSpinner = false;
    });

    //show_PreviousDealings//
    this._service.show_PreviousDealings(this.userid).subscribe((data) => {
      let resources: any[] = data["data"];
      this.PreviousDealings = resources;
      this.showSpinner = false;
    });

    //Educational//
    this._service.show_subofcategory(this.language).subscribe((data) => {
      let resources: any[] = data["data"];
      this.Educational = resources;
      console.log(this.language);
      this.showSpinner = false;
    });

    //show_child//
    this._service.show_child(this.userid).subscribe((data) => {
      let resources: any[] = data["data"];
      this.children = resources;
      this.showSpinner = false;
    });

    //show_Timeline//
    this._service.show_Timeline(this.userid).subscribe((data) => {
      let resources: any[] = data["day"];
      this.Timeline = resources;
      this.showSpinner = false;
      if (this.Timeline) {
        for (var i = 0; i < this.Timeline.length; i++) {
          this.listOfAllCheckedTimlineIds.push(this.Timeline[i].id);
        }
      }
    });

    //show_TrainerLanguages//
    this._service
      .show_TrainerLanguages(this.userid, this.language)
      .subscribe((data) => {
        let resources: any[] = data["data"];

        this.languages = resources;
        this.showSpinner = false;
      });

    //show_allLanguages//
    this._service.show_allLanguages(this.language).subscribe((data) => {
      let resources: any[] = data["data"];
      this.showlangs = resources;
      this.showSpinner = false;
    });

    //show_certificate//
    this._service.show_certificate(this.userid).subscribe((data) => {
      let resources: any[] = data["data"];

      this.certificate = resources;
      this.showSpinner = false;
    });

    //show_Trainerspecialists//
    this._service
      .show_Trainerspecialists(this.userid, this.language)
      .subscribe((data) => {
        let resources: any[] = data["data"];
        this.specialists = resources;
        this.showSpinner = false;
      });

    //show_allspecialists//
    this._service.show_allspecialists(this.language).subscribe((data) => {
      let resources: any[] = data["data"];
      this.allspecial = resources;
      this.showSpinner = false;
    });

    //my_tests//
    this._service.my_tests(this.userid).subscribe((data) => {
      let resources: any[] = data["data"];

      this.tests = resources;
      this.showSpinner = false;
    });

    //my_shared_reports//
    this._service.my_shared_reports(this.userid).subscribe((data) => {
      let resources: any[] = data["data"];

      this.shared_reports = resources;
      this.showSpinner = false;
    });

    //shared_student_result//
    this._service.shared_student_result(this.userid).subscribe((data) => {
      let resources: any[] = data["data"];

      this.student_result = resources;
      this.showSpinner = false;
    });

    //shared_class_result//
    this._service.shared_class_result(this.userid).subscribe((data) => {
      let resources: any[] = data["data"];

      this.class_result = resources;
      this.showSpinner = false;
    });

    //show_myclasses//
    this._service
      .show_myclasses(this.userid, this.language)
      .subscribe((data) => {
        let resources: any[] = data["data"];

        this.myclasses = resources;
        this.showSpinner = false;
      });
  }
  convertTime12to24 = (time12h) => {
    const [time, modifier] = time12h.split(" ");

    let [hours, minutes] = time.split(":");

    if (hours === "12") {
      hours = "00";
    }

    if (modifier === "PM") {
      hours = parseInt(hours, 10) + 12;
    }

    return `${hours}:${minutes}`;
  };

  open23(content23, reservationid, userid) {
    this.modalService1
      .open(content23, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
    this.reservation_id = reservationid;
    this.useriD = userid;
  }

  checkfirst_name1(event) {
    this.typeingfirst_name1 = true;
    if (!/^[\u0621-\u064A\u0660-\u0669a-zA-Z ]*$/.test(event.target.value)) {
      event.target.classList.add("is-invalid");
    } else {
      event.target.classList.remove("is-invalid");
    }
  }

  checkpassword1(event) {
    this.typeingpasswords1 = true;
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

  checkemail1(event) {
    this.typeingemail1 = true;
    if (!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(event.target.value)) {
      event.target.classList.add("is-invalid");
    } else {
      event.target.classList.remove("is-invalid");
    }
  }

  toggleFieldTextType1() {
    this.fieldTextType1 = !this.fieldTextType1;
  }

  toggleFieldTextType2() {
    this.fieldTextType2 = !this.fieldTextType2;
  }

  toggleFieldTextType3() {
    this.fieldTextType3 = !this.fieldTextType3;
  }

  toggleFieldTextType4() {
    this.fieldTextType4 = !this.fieldTextType4;
  }

  toggleFieldTextType5() {
    this.fieldTextType5 = !this.fieldTextType5;
  }
  checkfirstname(event) {
    this.typeingfirst_name = true;
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

  cancel(dept) {
    if (localStorage.getItem("locale") == "en") {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        this.showSpinner = true;

        if (result.value) {
          //check_testbuy//
          this._service
            .cancel_usersession(dept, this.userid)
            .subscribe((data) => {
              let error: number = data["error"];
              if (error == 0) {
                Swal.fire("Deleted!", "Your file has been deleted.", "success");
              } else {
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "Something went wrong!",
                });
              }
            });
        }

        //show_usernext_session//
        this._service.show_usernext_session(this.userid).subscribe((data) => {
          let resources: any[] = data["data"];
          let nextcount: number = data["count"];
          this.nextcount = nextcount;

          this.nextsession = resources;
        });
        //show_trainernext_session//
        this._service
          .show_trainernext_session(this.userid)
          .subscribe((data) => {
            let resources: any[] = data["data"];
            let trainercount: number = data["count"];
            this.trainercount = trainercount;

            this.trainerseesions = resources;
          });
        this.showSpinner = false;
      });
    } else {
      Swal.fire({
        title: "هل انت متأكد؟",
        text: "لا تستطيع اعادة هذا مرة اخري",
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "انهاء",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "نعم ,احذف!",
      }).then((result) => {
        this.showSpinner = true;

        if (result.value) {
          //check_testbuy//
          this._service
            .cancel_usersession(dept, this.userid)
            .subscribe((data) => {
              let error: number = data["error"];
              if (error == 0) {
                if (localStorage.getItem("locale") == "en") {
                  Swal.fire(
                    "Deleted!",
                    "Your session has been deleted.",
                    "success"
                  );
                } else {
                  Swal.fire({
                    icon: "success",
                    confirmButtonText: "تم",
                    title: "حذفت!",
                    text: "تم حذف الجلسة",
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
                    text: "ربما حدث خطأ,حاول مرة اخري!",
                  });
                }
              }
            });
        }

        //show_usernext_session//
        this._service.show_usernext_session(this.userid).subscribe((data) => {
          let resources: any[] = data["data"];
          let nextcount: number = data["count"];
          this.nextcount = nextcount;

          this.nextsession = resources;
        });
        //show_trainernext_session//
        this._service
          .show_trainernext_session(this.userid)
          .subscribe((data) => {
            let resources: any[] = data["data"];
            let trainercount: number = data["count"];
            this.trainercount = trainercount;

            this.trainerseesions = resources;
          });
        this.showSpinner = false;
      });
    }
    this.showSpinner = false;
  }
  videocam() {
    $(".test1").css("display", "block") &&
      $("#cam-test-start").css("display", "none") &&
      $(".icon-videocam").css("display", "none");
  }
  passed1() {
    $(".test1").css("display", "none") &&
      $(".icon-ok1").css("display", "block");
  }
  faild1() {
    $(".test1").css("display", "none") &&
      $(".icon-cancel1").css("display", "block");
  }
  iconmic() {
    $(".test2").css("display", "block") &&
      $("#mic-test-start").css("display", "none") &&
      $(".icon-mic").css("display", "none");
  }

  passed2() {
    $(".test2").css("display", "none") &&
      $(".icon-ok2").css("display", "block");
  }
  faild2() {
    $(".test2").css("display", "none") &&
      $(".icon-cancel2").css("display", "block");
  }

  iconvolumeup() {
    $(".test3").css("display", "block") &&
      $("#spk-test-start").css("display", "none") &&
      $(".icon-volume-up").css("display", "none");
  }

  passed3() {
    $(".test3").css("display", "none") &&
      $(".icon-ok3").css("display", "block");
  }
  faild3() {
    $(".test3").css("display", "none") &&
      $(".icon-cancel3").css("display", "block");
  }
  takeidtimeline(dept) {
    this.idtimeline = dept;
    //show_Timelinebyid//
    this._service.show_Timelinebyid(dept, this.userid).subscribe((data) => {
      let resources: any = data["data"];
      this.timelinedata = resources;
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  openModal4(template4: TemplateRef<any>) {
    this.modalRef1 = this.modalService.show(template4);
  }

  openModal5(template5: TemplateRef<any>) {
    this.modalRef2 = this.modalService.show(template5);
  }

  childModa4(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  openModal7(template7: TemplateRef<any>) {
    this.modalRef7 = this.modalService.show(template7);
  }

  openModal8(template8: TemplateRef<any>) {
    this.modalRef8 = this.modalService.show(template8);
  }
  openModal9(template9: TemplateRef<any>) {
    this.modalRef9 = this.modalService.show(template9);
  }

  openModal1(template1: TemplateRef<any>, dept) {
    this.modalRef = this.modalService.show(template1);
    this.idtimeline = dept;
    //show_Timelinebyid//
    this._service.show_Timelinebyid(dept, this.userid).subscribe((data) => {
      let resources: any = data["data"];
      this.timelinedata = resources;
    });
  }

  deletetimeline(dept1) {
    if (localStorage.getItem("locale") == "en") {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        this.showSpinner = true;

        if (result.value) {
          this._service
            .delete_Timeline(dept1, this.userid)
            .subscribe((data) => {
              let error: number = data["error"];
              if (error == 0) {
                Swal.fire(
                  "Deleted!",
                  "Your appointment has been deleted.",
                  "success"
                );
              } else {
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "Something went wrong!",
                });
              }
            });
        }

        //show_Timeline//
        this._service.show_Timeline(this.userid).subscribe((data) => {
          let resources: any[] = data["day"];

          this.Timeline = resources;
          this.showSpinner = false;
        });

        this.showSpinner = false;
      });
    } else {
      Swal.fire({
        title: "هل انت متأكد؟",
        text: "لا تستطيع اعادة هذا مرة اخري",
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "انهاء",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "نعم ,احذف!",
      }).then((result) => {
        this.showSpinner = true;

        if (result.value) {
          this._service
            .delete_Timeline(dept1, this.userid)
            .subscribe((data) => {
              let error: number = data["error"];
              if (error == 0) {
                Swal.fire({
                  icon: "success",
                  confirmButtonText: "تم",
                  title: "حذفت!",
                  text: "تم حذف المعاد",
                });
              } else {
                Swal.fire({
                  icon: "error",
                  title: "اوبس...",
                  text: "ربما حدث خطأ,حاول مرة اخري!",
                });
              }
            });
        }

        //show_Timeline//
        this._service.show_Timeline(this.userid).subscribe((data) => {
          let resources: any[] = data["day"];

          this.Timeline = resources;
          this.showSpinner = false;
        });

        this.showSpinner = false;
      });
    }
    this.showSpinner = false;
  }

  deletelang(dept2) {
    if (localStorage.getItem("locale") == "en") {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        this.showSpinner = true;

        if (result.value) {
          this._service
            .delete_trainerlanguage(dept2, this.userid)
            .subscribe((data) => {
              let error: number = data["error"];
              if (error == 0) {
                Swal.fire(
                  "Deleted!",
                  "Your language has been deleted.",
                  "success"
                );
              } else {
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "Something went wrong!",
                });
              }
            });
        }

        //show_TrainerLanguages//
        this._service
          .show_TrainerLanguages(this.userid, this.language)
          .subscribe((data) => {
            let resources: any[] = data["data"];

            this.languages = resources;
            this.showSpinner = false;
          });

        this.showSpinner = false;
      });
    } else {
      Swal.fire({
        title: "هل انت متأكد؟",
        text: "لا تستطيع اعادة هذا مرة اخري",
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "انهاء",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "نعم ,احذف!",
      }).then((result) => {
        this.showSpinner = true;

        if (result.value) {
          this._service
            .delete_trainerlanguage(dept2, this.userid)
            .subscribe((data) => {
              let error: number = data["error"];
              if (error == 0) {
                Swal.fire({
                  icon: "success",
                  confirmButtonText: "تم",
                  title: "حذفت!",
                  text: "تم حذف اللغة",
                });
              } else {
                Swal.fire({
                  icon: "error",
                  title: "اوبس...",
                  text: "ربما حدث خطأ,حاول مرة اخري!",
                });
              }
            });
        }

        //show_TrainerLanguages//
        this._service
          .show_TrainerLanguages(this.userid, this.language)
          .subscribe((data) => {
            let resources: any[] = data["data"];

            this.languages = resources;
            this.showSpinner = false;
          });

        this.showSpinner = false;
      });
    }
    this.showSpinner = false;
  }

  deletecertificate(dept3) {
    if (localStorage.getItem("locale") == "en") {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        this.showSpinner = true;

        if (result.value) {
          //check_testbuy//
          this._service
            .delete_certificate(this.userid, dept3)
            .subscribe((data) => {
              let error: number = data["error"];
              if (error == 0) {
                Swal.fire(
                  "Deleted!",
                  "Your certification has been deleted.",
                  "success"
                );
              } else {
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "Something went wrong!",
                });
              }
            });
        }

        //show_certificate//
        this._service.show_certificate(this.userid).subscribe((data) => {
          let resources: any[] = data["data"];

          this.certificate = resources;
          this.showSpinner = false;
        });

        this.showSpinner = false;
      });
    } else {
      Swal.fire({
        title: "هل انت متأكد؟",
        text: "لا تستطيع اعادة هذا مرة اخري",
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "انهاء",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "نعم ,احذف!",
      }).then((result) => {
        this.showSpinner = true;

        if (result.value) {
          //check_testbuy//
          this._service
            .delete_certificate(this.userid, dept3)
            .subscribe((data) => {
              let error: number = data["error"];
              if (error == 0) {
                Swal.fire({
                  icon: "success",
                  confirmButtonText: "تم",
                  title: "حذفت!",
                  text: "تم حذف الشهادة",
                });
              } else {
                Swal.fire({
                  icon: "error",
                  title: "اوبس...",
                  text: "ربما حدث خطأ,حاول مرة اخري!",
                });
              }
            });
          //show_certificate//
          this._service.show_certificate(this.userid).subscribe((data) => {
            let resources: any[] = data["data"];

            this.certificate = resources;
            this.showSpinner = false;
          });
        }

        this.showSpinner = false;
      });
    }
  }
  openModal2(template2: TemplateRef<any>, dept) {
    this.modalRef78 = this.modalService.show(template2);
    this.idtcertifacate = dept;
    //show_certificateByid//
    this._service
      .show_certificateByid(this.idtcertifacate, this.userid)
      .subscribe((data) => {
        let resources: any = data["data"];
        this.cerdata = resources;
      });
  }

  openModal3(template3: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template3);
  }

  deletespacial(dept6) {
    if (localStorage.getItem("locale") == "en") {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        this.showSpinner = true;

        if (result.value) {
          //check_testbuy//
          this._service
            .delete_trainerSpecialist(dept6, this.userid)
            .subscribe((data) => {
              let error: number = data["error"];
              if (error == 0) {
                Swal.fire(
                  "Deleted!",
                  "Your specialiset has been deleted.",
                  "success"
                );
              } else {
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "Something went wrong!",
                });
              }
            });
        }

        //show_Trainerspecialists//
        this._service
          .show_Trainerspecialists(this.userid, this.language)
          .subscribe((data) => {
            let resources: any[] = data["data"];
            this.specialists = resources;
            console.log(this.language);
          });

        this.showSpinner = false;
      });
    } else {
      Swal.fire({
        title: "هل انت متأكد؟",
        text: "لا تستطيع اعادة هذا مرة اخري",
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "انهاء",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "نعم ,احذف!",
      }).then((result) => {
        this.showSpinner = true;

        if (result.value) {
          //check_testbuy//
          this._service
            .delete_trainerSpecialist(dept6, this.userid)
            .subscribe((data) => {
              let error: number = data["error"];
              if (error == 0) {
                Swal.fire({
                  icon: "success",
                  confirmButtonText: "تم",
                  title: "حذفت!",
                  text: "تم حذف المدرب",
                });
              } else {
                Swal.fire({
                  icon: "error",
                  title: "اوبس...",
                  text: "ربما حدث خطأ,حاول مرة اخري!",
                });
              }
            });
        }
        //show_Trainerspecialists//
        this._service
          .show_Trainerspecialists(this.userid, this.language)
          .subscribe((data) => {
            let resources: any[] = data["data"];
            this.specialists = resources;
            console.log(this.language);
          });

        this.showSpinner = false;
      });
    }
  }

  /*   submitchild(fromDate){
  console.log("ffff",fromDate.controls.passwords.value);
  if(fromDate.valid)
  {
    if(fromDate.controls.passwords.value!=fromDate.controls.conpassword.value)
    {

      if(localStorage.getItem('locale')=='en')
      {
       Swal.fire('Please verify the password matches')


      }

      else
      {

       Swal.fire('يرجي التحقق من مطابقة  كلمة المرور')


      }


    } 


    else{
      this.showSpinner=true;
     this._service.add_child(fromDate,this.selectImagechild,this.userid).subscribe(response =>{
      this.showSpinner=true;

     let error:number= response["error"];

      console.log("error",error)

      if(error==0){
        
        if( localStorage.getItem('locale')=='en' )
        {

          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'added successfully',
            showConfirmButton: false,
            timer: 2000
          })

        }

        else
        {

             Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'تم الاضافة بنجاح',
            showConfirmButton: false,
            timer: 2000
          })

        }


       
        }

        else if(error==4){
        
          if( localStorage.getItem('locale')=='en' )
          {
  
            Swal.fire({

              icon: 'error',
              title: 'Oops...',
              text: 'this child exits ,must change this name',
          
            })
  
          }
  
          else
          {
  
               Swal.fire({

                icon: 'error',
                title: 'اويس...',
                text: 'هذا الطفل موجود ,يجب تغيير الاسم',
         
            })
  
          }
  
  
         
          }

          else if(error==5){
        
            if( localStorage.getItem('locale')=='en' )
            {
    
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'this username exits ,must change username!',
              
              })
    
            }
    
            else
            {
    
                 Swal.fire({
                  icon: 'error',
                  title: 'اوبس...',
                  text: 'اسم المستخدم موجود مسبقا يجب تغييره',
              
              })
    
            }
    
    
           
            }
      
        else
        {
          if( localStorage.getItem('locale')=='en' )
          {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
            })

          }
          else
          {
            Swal.fire({
              icon: 'error',
              title: 'اوبس...',
              text: 'ربما حدث شئ خطأ!',
            })

          }

         
        }



        this.showSpinner=false;


   })


         //show_child//
         this._service.show_child(this.userid)
         .subscribe(
           data => {
             let resources: any[] = data["data"];
              this.children = resources;
              this.showSpinner=false

      });
    }

  }

  else{

    if(localStorage.getItem('locale')=='en')
    {
     Swal.fire('Please fill in the fields correctly')


    }
    else
    {

     Swal.fire('برجاء ملئ الحقول بشكل صحيح')

    }


}







}  */

  submitFormPass(fromDate) {
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
      } else if (this.passwords != fromDate.controls.currentpassword.value) {
        if (localStorage.getItem("locale") == "en") {
          Swal.fire("current password is incorect");
        } else {
          Swal.fire("كلمة السر الحالية غير صحيحة");
        }
      } else {
        this._service
          .change_password(fromDate, this.userid)
          .subscribe((response) => {
            this.showSpinner = true;
            let error: number = response["error"];

            console.log("error", error);

            if (error == 0) {
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
                  title: "تم تغيير كلمة السر",
                  showConfirmButton: false,
                  timer: 2000,
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

  submitForm1(emails, balnce) {
    this.showSpinner = true;

    this._service
      .transfer_money(emails.value, balnce.value, this.userid)
      .subscribe((data) => {
        let error: number = data["error"];

        if (error == 6) {
          if (localStorage.getItem("locale") == "en") {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "you must enter transferred data first",
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "اوبس...",
              text: "دخل البيانات لكي تتم عملية التحويل",
            });
          }
        } else if (error == 4) {
          if (localStorage.getItem("locale") == "en") {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "this data is not exist in our system",
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "اوبس...",
              text: "هذا العميل غير مسجل علي الموقع",
            });
          }
        } else if (error == 5) {
          if (localStorage.getItem("locale") == "en") {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "your credit is not Enough",
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "اوبس...",
              text: "اموالك غبر كافية لتنفيذ العملية",
            });
          }
        } else {
          if (localStorage.getItem("locale") == "ar") {
            Swal.fire({
              icon: "success",
              title: "تمت العملية بنجاح",

              showConfirmButton: false,
              timer: 2000,
            });
          } else {
            Swal.fire({
              icon: "success",
              title: "Done successfully",

              showConfirmButton: false,
              timer: 2000,
            });
          }
        }

        console.log(emails.value, balnce.value, this.userid);

        //show_wallet//
        this._service.show_wallet(this.userid).subscribe((data) => {
          let credit: number = data["credit"];

          this.credit = credit;
          console.log(credit);
          this.showSpinner = false;
        });

        this.showSpinner = false;
      });

    //show_wallet//
    this._service.show_wallet(this.userid).subscribe((data) => {
      let credit: number = data["credit"];

      this.credit = credit;
    });
  }

  submitForm3(date, time_from, time_to, price) {
    this.showSpinner = true;

    console.log("time", time_to.value);

    console.log("datereal", date.value);
    this._service
      .insert_timeline(
        date.value,
        time_from.value,
        time_to.value,
        price.value,
        this.userid
      )
      .subscribe((data) => {
        console.log("time", time_from.value, time_to.value);

        let error: number = data["error"];

        if (error == 0) {
          if (localStorage.getItem("locale") == "en") {
            Swal.fire({
              icon: "success",
              title: "added successfully",
              showConfirmButton: false,
              timer: 2000,
            });
          } else {
            Swal.fire({
              icon: "success",
              title: "تم الاضافة بنجاح",
              showConfirmButton: false,
              timer: 2000,
            });
          }
          this.modalService1.dismissAll();
        } else if (error == 5) {
          if (localStorage.getItem("locale") == "en") {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "please choose a date!",
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "من فضلك اختار تاريخ!",
            });
          }
        } else if (error == 6) {
          if (localStorage.getItem("locale") == "en") {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "please choose time!",
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "من فضلك اختار وقت!",
            });
          }
        } else if (error == 7) {
          if (localStorage.getItem("locale") == "en") {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "please choose a price!",
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "من فضلك اختار سعر!",
            });
          }
        }

        //show_Timeline//
        this._service.show_Timeline(this.userid).subscribe((data) => {
          let resources: any[] = data["day"];

          this.Timeline = resources;
        });
        this.showSpinner = false;
      });
  }

  submitForm4(time_from, time_to, price) {
    this.showSpinner = true;

    this._service
      .update_timeline(
        this.idtimeline,
        time_from.value,
        time_to.value,
        price.value,
        this.userid
      )
      .subscribe((data) => {
        let error = data["error"];
        if (error == 0) {
          if (localStorage.getItem("locale") == "en") {
            Swal.fire({
              icon: "success",
              title: "updated successfully",
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

          this.modalRef.hide();
        } else {
          if (localStorage.getItem("locale") == "en") {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "may something wrong!",
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "اوبس...",
              text: "ربما حدث خطأ!",
            });
          }
        }

        //show_Timeline//
        this._service.show_Timeline(this.userid).subscribe((data) => {
          let resources: any[] = data["day"];

          this.Timeline = resources;
        });
        this.showSpinner = false;
      });
  }

  submitForm5(language_id) {
    this.showSpinner = true;
    console.log("idlang", language_id);
    this._service
      .insert_trainerlanguage(language_id.value, this.userid)
      .subscribe((data) => {
        let error = data["error"];
        if (error == 0) {
          if (localStorage.getItem("locale") == "en") {
            Swal.fire({
              icon: "success",
              title: "added successfully",
              showConfirmButton: false,
              timer: 2000,
            });
          } else {
            Swal.fire({
              icon: "success",
              title: "تم الاضافة بنجاح",
              showConfirmButton: false,
              timer: 2000,
            });
          }
          this.modalRef7.hide();
        } else if (error == 4) {
          if (localStorage.getItem("locale") == "en") {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "this language is exist!",
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "اوبس...",
              text: "اللغة موجودة بالتأكيد!",
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
              text: "ربما حدث شئ خطأ!",
            });
          }
        }

        //show_TrainerLanguages//
        this._service
          .show_TrainerLanguages(this.userid, this.language)
          .subscribe((data) => {
            let resources: any[] = data["data"];

            this.languages = resources;
          });
        this.showSpinner = false;
      });
  }

  submitForm6(name, from_institution) {
    this.showSpinner = true;

    this._service
      .insert_certficate(name.value, from_institution.value, this.userid)
      .subscribe((data) => {
        let error: number = data["error"];
        if (error == 0) {
          if (localStorage.getItem("locale") == "en") {
            Swal.fire({
              icon: "success",
              title: "added successfully",
              showConfirmButton: false,
              timer: 2000,
            });
          } else {
            Swal.fire({
              icon: "success",
              title: "تم الاضافة بنجاح",
              showConfirmButton: false,
              timer: 2000,
            });
          }

          this.modalRef9.hide();
        } else if (error == 4) {
          if (localStorage.getItem("locale") == "en") {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "this certification exits!",
            });
          } else {
            Swal.fire({
              icon: "success",
              title: "الشهادة مودجودة مسبقا",
              showConfirmButton: false,
              timer: 2000,
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
              text: "ربما حدث شئ خطأ!",
            });
          }
        }

        //show_certificate//
        this._service.show_certificate(this.userid).subscribe((data) => {
          let resources: any[] = data["data"];

          this.certificate = resources;
          this.showSpinner = false;
        });

        this.showSpinner = false;
      });
  }

  submitForm7(name, from_institution) {
    this.showSpinner = true;

    this._service
      .update_certificate(
        this.userid,
        this.idtcertifacate,
        name.value,
        from_institution.value
      )
      .subscribe((data) => {
        let error: number = data["error"];
        if (error == 0) {
          if (localStorage.getItem("locale") == "en") {
            Swal.fire({
              icon: "success",
              title: "updated successfully",
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

          this.modalRef78.hide();
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
              text: "ربما حدث شئ خطأ!",
            });
          }
        }

        //show_certificate//
        this._service.show_certificate(this.userid).subscribe((data) => {
          let resources: any[] = data["data"];

          this.certificate = resources;
          this.showSpinner = false;
        });
        this.showSpinner = false;
      });
  }

  submitForm8(specialist_id) {
    this.showSpinner = true;

    this._service
      .insert_trainerSpecialist(specialist_id.value, this.userid)
      .subscribe((data) => {
        let error: number = data["error"];
        if (error == 0) {
          if (localStorage.getItem("locale") == "en") {
            Swal.fire({
              icon: "success",
              title: "added successfully",
              showConfirmButton: false,
              timer: 2000,
            });
          } else {
            Swal.fire({
              icon: "success",
              title: "تم الاضافة بنجاح",
              showConfirmButton: false,
              timer: 2000,
            });
          }
          this.modalRef8.hide();
        } else if (error == 4) {
          if (localStorage.getItem("locale") == "en") {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "this spacialist is exist!",
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "اوبس...",
              text: "المدرب موجود بالتأكيد!",
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
              text: "ربما حدث شئ خطأ!",
            });
          }
        }

        //show_Trainerspecialists//
        this._service
          .show_Trainerspecialists(this.userid, this.language)
          .subscribe((data) => {
            let resources: any[] = data["data"];
            this.specialists = resources;
            console.log(this.language);
          });
        this.showSpinner = false;
      });
  }

  submitForm9(child_id) {
    this.showSpinner = true;
    console.log(child_id.value);

    this._service.add_child1(child_id.value, this.userid).subscribe((data) => {
      let error: number = data["error"];
      console.log(error);

      if (error == 0) {
        if (localStorage.getItem("locale") == "en") {
          Swal.fire({
            icon: "success",
            title: "waiting to accepted from this child",
            showConfirmButton: false,
            timer: 2000,
          });
        } else {
          Swal.fire({
            icon: "success",
            title: "في انتظار موافقة الابن",
            showConfirmButton: false,
            timer: 2000,
          });
        }
      } else if (error == 4) {
        if (localStorage.getItem("locale") == "en") {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "sending request to this child before!",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "اوبس...",
            text: "تم ارسال طلب للابن من قبل!",
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
            text: "ربما حدث شئ خطأ!",
          });
        }
      }

      //show_child//
      this._service.show_child(this.userid).subscribe((data) => {
        let resources: any[] = data["data"];
        this.children = resources;
        this.showSpinner = false;
      });

      this.showSpinner = false;
      this.modalRef1.hide();
    });
  }

  submitForm23(content) {
    this.showSpinner = true;

    console.log("content", content.value);
    console.log(
      this.useriD,
      this.reservation_id,
      content.value,
      this.userid,
      content.value,
      this.selectfilereport
    );
    this._service
      .make_sessionReport(
        this.useriD,
        this.reservation_id,
        content.value,
        this.selectfilereport,
        this.userid
      )
      .subscribe((data) => {
        let error: number = data["error"];

        if (error == 0) {
          if (localStorage.getItem("locale") == "en") {
            Swal.fire({
              icon: "success",
              title: "added successfully",
              showConfirmButton: false,
              timer: 2000,
            });
          } else {
            Swal.fire({
              icon: "success",
              title: "تم الاضافة بنجاح",
              showConfirmButton: false,
              timer: 2000,
            });
          }
          this.modalService1.dismissAll();
        } else if (error == 4) {
          if (localStorage.getItem("locale") == "en") {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "please Enter a content!",
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "من فضلك ادخل المحتوي !",
            });
          }
        }

        this.showSpinner = false;
      });
  }
  getid(idimag) {
    this.router.navigate(["/DiseaseTEST", idimag]);
    localStorage.setItem("idimag", idimag);
  }

  showsoneClass(idclass) {
    //show_oneClass//
    this._service.show_oneClass(this.userid, idclass).subscribe((data) => {
      let resources: any[] = data["teachers"];
      let resources1: any[] = data["students"];

      this.teachers = resources;
      this.students = resources1;
    });
  }

  showonestudent(idstudent) {
    //show_oneClass//
    this._service.show_onestudent(this.userid, idstudent).subscribe((data) => {
      let resources: any[] = data["data"];

      this.onestudents = resources;
    });
  }

  submitformSchool(comment1) {
    this.showSpinner = true;
    this._service
      .rate_school(this.userid, this.overStar, comment1.value)
      .subscribe((data) => {
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
        } else if (error == 1) {
          if (localStorage.getItem("locale") == "en") {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "you must enter rating!",
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "اوبس...",
              text: "دخل تقييمك اولا!",
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

  submitformMangement(comment) {
    this.showSpinner = true;

    this._service
      .rate_management(this.userid, this.overStar1, comment.value)
      .subscribe((data) => {
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
        } else if (error == 1) {
          if (localStorage.getItem("locale") == "en") {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "you must enter rating!",
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "اوبس...",
              text: "دخل تقييمك اولا!",
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

  submitformmyself() {
    this.showSpinner = true;
    this._service.rate_myself(this.userid, this.overStar2).subscribe((data) => {
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
      } else if (error == 1) {
        if (localStorage.getItem("locale") == "en") {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "you must enter rating!",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "اوبس...",
            text: "دخل تقييمك اولا!",
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

  SUbmitVIdeo() {
    this.showSpinner = true;

    this._service
      .upload_video(this.userid, this.selectvideo)
      .subscribe((data) => {
        let error = data["error"];
        let message = data["message"];

        if (error == 0) {
          Swal.fire({
            icon: "success",
            title: "تم الاضافة بنجاح",
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

        if (this.selectedvideo == null) {
        }
      });
  }

  submitaddchild(fromDate) {
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
        this._service.add_child(fromDate, this.userid).subscribe((response) => {
          let error: number = response["error"];

          console.log("error", error);
          if (error == 0) {
            if (localStorage.getItem("locale") == "en") {
              Swal.fire({
                icon: "success",
                title: "added succussfully",
                showConfirmButton: false,
                timer: 2000,
              });
            } else {
              Swal.fire({
                icon: "success",
                title: "تمت الاضافة بنجاح",
                showConfirmButton: false,
                timer: 2000,
              });
            }
          } else if (error == 5) {
            if (localStorage.getItem("locale") == "en") {
              Swal.fire("this username is exist");
            } else {
              Swal.fire("الاسم المستخدم موجود مسبقا");
            }
          } else if (error == 4) {
            if (localStorage.getItem("locale") == "en") {
              Swal.fire("this child exists");
            } else {
              Swal.fire("هذا الطفل موجود مسبقا");
            }
          } else if (error == 6) {
            if (localStorage.getItem("locale") == "en") {
              Swal.fire("this email is exist before");
            } else {
              Swal.fire("البريد الألكتروني موجود مسبقا");
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
                icon: "error",
                title: "اوبس...",
                text: "ربما حدث خطأ!",
              });
            }

            this.showSpinner = false;
          }

          //show_child//
          this._service.show_child(this.userid).subscribe((data) => {
            let resources: any[] = data["data"];
            this.children = resources;
            this.showSpinner = false;
          });
          this.showSpinner = false;
          this.modalRef2.hide();
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

  open1(content1) {
    this.modalService1
      .open(content1, { ariaLabelledBy: "modal-basic-title" })
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
}
