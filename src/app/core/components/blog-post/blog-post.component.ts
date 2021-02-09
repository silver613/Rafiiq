import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { APIservicesService } from "../../services/data-service/apiservices.service";
@Component({
  selector: "app-blog-post",
  template: `
    <main class="margin_60_35">
      <div id="breadcrumb">
        <div class="container">
          <ul>
            <li>
              <a>{{ "Blog" | translate }}</a>
            </li>
          </ul>
        </div>
      </div>

      <div class="container margin_60">
        <div class="row">
          <div class="col-lg-9">
            <div class="bloglist singlepost">
              <p>
                <img
                  alt=""
                  class="img-fluid"
                  src="{{ imageURL }}/uploads/posts/{{ posts?.image }}"
                />
              </p>
              <h1>{{ posts?.title }}</h1>

              <div class="post-content">
                <p>{{ posts?.description }}</p>

                <p>{{ posts?.details }}</p>
              </div>
            </div>
          </div>

          <aside class="col-lg-3">
            <div class="widget">
              <div class="widget-title">
                <h4>{{ "Recent Posts" | translate }}</h4>
              </div>
              <ul class="comments-list" *ngFor="let s of recent_posts">
                <li>
                  <div class="alignleft">
                    <img
                      src="{{ imageURL }}/uploads/posts/{{ s.image }}"
                      alt=""
                    />
                  </div>
                  <small>{{ s.created_at }}</small>
                  <h3>{{ s.title }}</h3>
                </li>
              </ul>
            </div>

            <div class="widget">
              <div class="widget-title">
                <h4>{{ "Blog Categories" | translate }}</h4>
              </div>
              <ul class="cats" *ngFor="let s of category">
                <li>
                  <a [routerLink]="['/postscategory', s.id]"
                    >{{ s.name }} <span>({{ s.count }})</span></a
                  >
                </li>
              </ul>
            </div>
          </aside>
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
export class BlogPostComponent implements OnInit {
  showSpinner: boolean = true;
  blogid: number;
  language = localStorage.getItem("locale");
  posts: any;
  recent_posts: any[];
  category: any[];
  imageURL: string = localStorage.getItem("imageURL");

  constructor(
    private _service: APIservicesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.blogid = +this.route.snapshot.paramMap.get("id");

    //show_question_answers//
    this._service.show_onepost(this.blogid, this.language).subscribe((data) => {
      let resources: any = data["posts"];
      let resources1: any[] = data["recent_posts"];
      let resources2: any[] = data["category"];

      this.posts = resources;
      this.recent_posts = resources1;
      this.category = resources2;
      this.showSpinner = false;
    });
  }
}
