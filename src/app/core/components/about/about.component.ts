import { Component, OnInit } from "@angular/core";
import { APIservicesService } from "../../services/data-service/apiservices.service";

@Component({
  selector: "app-about",
  template: `
    <main class="margin_60_35">
      <div id="breadcrumb">
        <div class="container">
          <ul>
            <li><a></a></li>
          </ul>
        </div>
      </div>

      <div class="container margin_120_95">
        <div class="main_title">
          <h1>{{ "About RafiQ" | translate }}</h1>
        </div>
        <div class="row justify-content-between">
          <div class="col-lg-6">
            <figure class="add_bottom_30">
              <img src="./assets/img/about_1.jpg" class="img-fluid" alt="" />
            </figure>
          </div>
          <div class="col-lg-5 aboutDetailes">
            <p>{{ about?.details }}</p>
          </div>
        </div>
      </div>

      <div class="bg_color_1">
        <div class="container margin_120_95">
          <div class="main_title">
            <h2>{{ "What our customers are saying about us" | translate }}</h2>
          </div>
          <div class="row">
            <div class="col-md-4" *ngFor="let s of allopinions">
              <div class="about-review">
                <div style="font-size: large; color: #ffc107 ;">
                  <rating
                    [(ngModel)]="s.rate"
                    [max]="max"
                    [readonly]="isReadonly"
                    style="color: #ffc107"
                    class="rating"
                  ></rating>
                </div>

                <p>{{ s.content }}</p>
                <div class="user_review">
                  <figure>
                    <img
                      *ngIf="s.image != null"
                      src="{{ imageURL }}/uploads/users/{{ s.image }}"
                    />
                  </figure>
                  <figure>
                    <img *ngIf="s.image == null" src="{{ ImageURl }}" />
                  </figure>

                  <h4>
                    {{ s.first_name }} {{ s.last_name
                    }}<span>{{ s.state }}</span>
                  </h4>
                </div>
              </div>
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
export class AboutComponent implements OnInit {
  language = localStorage.getItem("locale");
  max: number = 5;
  isReadonly: boolean = true;
  about: any;
  allopinions: any[];
  showSpinner: boolean = true;
  imageURL: string = localStorage.getItem("imageURL");
  ImageURl = "./assets/img/default.png";

  constructor(private _service: APIservicesService) {}

  ngOnInit() {
    //show_aboutus//
    this._service.show_aboutus(this.language).subscribe((data) => {
      let resources: any = data["data"];
      this.about = resources;
      this.showSpinner = false;
    });

    //show_allopinions//
    this._service.show_allopinions().subscribe((data) => {
      let resources: any[] = data["data"];
      this.allopinions = resources;
      this.showSpinner = false;
    });
  }
}
