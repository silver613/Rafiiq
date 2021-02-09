import { Component, OnInit } from "@angular/core";
import { APIservicesService } from "../../services/data-service/apiservices.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-fridlist2",
  templateUrl: "./fridlist2.component.html",
  styleUrls: ["./fridlist2.component.css"],
})
export class Fridlist2Component implements OnInit {
  showSpinner: boolean = true;

  language = localStorage.getItem("locale");
  specialists: any[];
  trainerid: number;
  imageURL: string = localStorage.getItem("imageURL");

  constructor(
    private _service: APIservicesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.trainerid = +this.route.snapshot.paramMap.get("id");

    //show_allNews//
    this._service.show_TrainerByspecialist(this.trainerid).subscribe((data) => {
      let resources: any[] = data["data"];
      this.specialists = resources;
      this.showSpinner = false;
    });
  }
}
