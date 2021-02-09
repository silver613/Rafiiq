import { Component, OnInit, Inject } from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";

import { ZoomMtg } from "@zoomus/websdk";
import { APIservicesService } from "../../services/data-service/apiservices.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-zoom-meeting",
  templateUrl: "./zoom-meeting.component.html",
  styleUrls: ["./zoom-meeting.component.css"],
})
export class ZoomMeetingComponent implements OnInit {
  [x: string]: any;
  ZoomDetails$: Observable<any>;
  id;
  pass;
  pstn_password;
  isHidden = false;

  apiKey;
  apiSecret;
  meetingNumber;
  role;
  leaveUrl;
  userName;
  userEmail;
  passWord;
  signature;
  //84243603767
  insta_link;
  face_link;
  type;

  ImageURl = "rafikapi.codecaique.com";

  constructor(
    public _service: APIservicesService,
    @Inject(DOCUMENT) document,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    //show_someNews//
    this._service.MeetingTime$.subscribe((res) => {
      setTimeout(() => {
        ZoomMtg.leaveMeeting({});
      }, res);
    });

    this.ZoomDetails$ = this._service.ZoomDetails$;
    this._service.ZoomDetails$.subscribe((res) => {
      this.meetingNumber = res.meeting_id;
      this.pass = res.password;
      this.start_url = res.start_url;
      this.type = res.type;
      this.join_url = "";

      this.pstn_password = "";

      this.apiKey = "Y3UpCvRpRM--m6HEA_0SpQ";
      this.apiSecret = "2RAbm1uKmGazFE0qmpTRlYKLO3xkXZ9uPpXL";
      this.role = 1;
      this.leaveUrl = "http://localhost:4200/profile";
      this.userName = "Rafiiq";
      this.userEmail = "apprafiiq@gmail.com";
      this.passWord = "Rafiq24680";

      ZoomMtg.preLoadWasm();
      ZoomMtg.prepareJssdk();
      this.check(this.meetingNumber, this.type);
      console.log(this.meetingNumber);
      console.log(this.pass);
    });
  }

  check(meetingnumber, type) {
    if (this.meetingNumber == null) {
      console.log("meeting number == null ");
    } else {
      console.log("meeting number != null ");
    }
    if (this.type == null) {
      console.log("type == null ");
    } else {
      console.log(" type != null ");
    }

    console.log(this.meetingNumber, this.type);
  }

  getSignature() {
    this.isHidden = true;
    this.check(this.meetingNumber, this.role);
    this._service
      .getMeeting(this.meetingNumber, this.role, this.apiKey, this.apiSecret)
      .subscribe((data) => {
        let resources: any = data["data"];
        this.signature = resources["signature"];
        console.log("signature", this.signature);

        this.startMeeting(this.signature);
      });
  }

  startMeeting(signature) {
    document.getElementById("zmmtg-root").style.display = "block";

    ZoomMtg.init({
      leaveUrl: this.leaveUrl,
      isSupportAV: true,
      success: (success) => {
        ZoomMtg.join({
          signature: signature,
          meetingNumber: this.meetingNumber,
          userName: "Rafiiq",
          apiKey: this.apiKey,
          success: (success) => {},
          error: (error) => {
            console.log(error);
          },
        });
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  check_data(d: String) {
    const meetConfig = {
      apiKey: "3239845720934223459",
      meetingNumber: "123456789",
      leaveUrl: "https://yoursite.com/meetingEnd",
      userName: "Firstname Lastname",
      userEmail: "firstname.lastname@yoursite.com",
      passWord: "password", // if required
      role: 0, // 1 for host; 0 for attendee
    };
  }
}
