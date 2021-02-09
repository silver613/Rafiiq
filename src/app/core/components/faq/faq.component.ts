import { Component, OnInit } from "@angular/core";
import { APIservicesService } from "../../services/data-service/apiservices.service";

@Component({
  selector: "app-faq",
  template: `
    <main style="transform: none" class="margin_60_35">
      <div id="breadcrumb">
        <div class="container">
          <ul>
            <li>
              <a>{{ "FaQ" | translate }}</a>
            </li>
          </ul>
        </div>
      </div>
      <!-- /breadcrumb -->
      <div class="container margin_60" style="transform: none">
        <div class="content educate_content">
          <div class="section" *ngFor="let s of allquestiontype">
            <div class="">
              <a [routerLink]="['/Faq', s.id]" class="paper">
                <div class="collection">
                  <div class="collection__photo">
                    <i
                      class="icon-help-circled-alt"
                      style="font-size: 50px"
                    ></i>
                  </div>
                  <div class="faqgroup">
                    <h3 class="c__primary">{{ s.name }}</h3>
                    <div class="Written">
                      <span style="color: #4f5e6b">
                        {{ s.question_num }}
                        {{ "articles in this collection" | translate }}
                      </span>
                      <br />
                      {{ "Written by" | translate }}
                      <span style="color: #4f5e6b"> {{ s.writer }}</span>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>

    <div id="page-preloader" *ngIf="showSpinner">
      <div id="spinner-three">
        <div id="inner"></div>
        <div id="outer"></div>
      </div>
    </div>
  `,
})
export class FaqComponent implements OnInit {
  language = localStorage.getItem("locale");
  allquestiontype: any[];
  showSpinner: boolean = true;
  imageURL: string = localStorage.getItem("imageURL");

  constructor(private _service: APIservicesService) {}

  ngOnInit() {
    console.log(this.language);

    //show_allquestiontype//
    this._service.show_allquestiontype(this.language).subscribe((data) => {
      let resources: any[] = data["data"];
      this.allquestiontype = resources;
      this.showSpinner = false;
    });
  }
}
