import { Component, OnInit } from "@angular/core";
import { APIservicesService } from "../../services/data-service/apiservices.service";
import { NgForm } from "@angular/forms";
import { PageChangedEvent } from "ngx-bootstrap/pagination";

@Component({
  selector: "app-grid-list",
  templateUrl: "./grid-list.component.html",
  styleUrls: ["./grid-list.component.css"],
})
export class GridListComponent implements OnInit {
  max: number = 5;
  showSpinner: boolean = true;
  isReadonly: boolean = true;
  language = localStorage.getItem("locale");
  specialists: any[];
  Trainer: any[];
  timelinetrainer: any[];
  servicetrainer: any[];
  oneTrainer: any[];
  contentArray = new Array();
  specialist: string;
  name: string;
  imageURL: string = localStorage.getItem("imageURL");

  constructor(private _service: APIservicesService) {}

  ngOnInit() {
    //show_allNews//
    this._service.show_Trainer().subscribe((data) => {
      let resources: any[] = data["data"];
      this.Trainer = resources;
      this.showSpinner = false;
    });

    //show_allspecialists//
    this._service.show_allspecialists(this.language).subscribe((data) => {
      let resources: any[] = data["data"];
      this.specialists = resources;
      this.showSpinner = false;
    });
  }
  openDoc(dept) {
    document.getElementById("mySidedoc").style.width = "320px";
    //show_allNews//
    this._service.show_oneTrainer(dept, this.language).subscribe((data) => {
      let resources: any[] = data["data"];
      let resources1: any[] = data["timeline"];
      let resources2: any[] = data["service"];

      this.oneTrainer = resources;
      this.timelinetrainer = resources1;
      this.servicetrainer = resources2;
      console.log(dept);
    });
  }

  closedoc() {
    document.getElementById("mySidedoc").style.width = "0";
  }

  openFilterPanel() {
    document.getElementById("mySideFilter").style.width = "320px";
  }

  closeFilterPanel() {
    document.getElementById("mySideFilter").style.width = "0";
  }

  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.Trainer = this.contentArray.slice(startItem, endItem);
  }

  onChangespacial(id) {
    this._service.show_TrainerByspecialist(id).subscribe((data) => {
      let resources: any[] = data["data"];
      this.Trainer = resources;
    });
  }

  onChangename(name) {
    this._service.show_TrainerByname(name).subscribe((data) => {
      let resources: any[] = data["data"];
      this.Trainer = resources;
      console.log(name);
    });
  }

  onSubmit(form?: NgForm) {
    this.name = form.value.name;
    this.specialist = form.value.specialist;

    this._service
      .show_TrainerByname_and_specialist(this.name, this.specialist)
      .subscribe((data) => {
        let resources: any[] = data["data"];

        this.Trainer = resources;
      });
  }
  onChangesort(id) {
    this._service.sort_Trainer(id).subscribe((data) => {
      let resources: any[] = data["data"];
      this.Trainer = resources;
      console.log(id);
    });
  }
}
