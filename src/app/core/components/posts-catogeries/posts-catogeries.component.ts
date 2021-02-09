import { Component, OnInit } from "@angular/core";
import { APIservicesService } from "../../services/data-service/apiservices.service";
import { ActivatedRoute } from "@angular/router";
@Component({
  selector: "app-posts-catogeries",
  template: `
    <main class="margin_60_35">
      <div id="breadcrumb">
        <div class="container">
          <ul>
            <li>
              <a>{{ "Blogs" | translate }}</a>
            </li>
          </ul>
        </div>
      </div>
      <!-- /breadcrumb -->

      <div class="container margin_60">
        <div class="main_title">
          <h1>{{ "Rafiq blogs" | translate }}</h1>
          <p>
            {{
              "We Provide answers to your most commonly asked questions or provide advice to areas within your niche that your interests resides."
                | translate
            }}
          </p>
        </div>
        <div class="row">
          <aside class="col-lg-1"></aside>
          <div class="col-lg-10">
            <article class="blog wow fadeIn" *ngFor="let s of posts">
              <div class="row no-gutters">
                <div class="col-lg-7">
                  <figure>
                    <a [routerLink]="['/BlogPost', s.id]"
                      ><img
                        src="{{ imageURL }}/uploads/posts/{{ s.image }}"
                        alt=""
                      />
                      <div class="preview">
                        <span>{{ "Read more" | translate }}</span>
                      </div></a
                    >
                  </figure>
                </div>
                <div class="col-lg-5">
                  <div class="post_info">
                    <small>{{ s.created_at }}</small>
                    <h3>
                      <a [routerLink]="['/BlogPost', s.id]">{{ s.title }}</a>
                    </h3>
                    <p>{{ s.description }}</p>
                  </div>
                </div>
              </div>
            </article>
            <!-- /article -->

            <!-- /pagination -->
          </div>
          <!-- /col -->

          <aside class="col-lg-1"></aside>
          <!-- /aside -->
        </div>
        <!-- /row -->
      </div>
      <!-- /container -->
    </main>
    <!-- /main -->

    <div id="page-preloader" *ngIf="showSpinner">
      <div id="spinner-three">
        <div id="inner"></div>
        <div id="outer"></div>
      </div>
    </div>
  `,
})
export class PostsCatogeriesComponent implements OnInit {
  language = localStorage.getItem("locale");
  blogid: number;
  recent_posts: any[];
  category: any[];
  posts: any[];
  imageURL: string = localStorage.getItem("imageURL");
  showSpinner: boolean = true;
  constructor(
    private _service: APIservicesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.blogid = +this.route.snapshot.paramMap.get("id");

    //show_posts_incategory//
    this._service
      .show_posts_incategory(this.blogid, this.language)
      .subscribe((data) => {
        let resources: any = data["data"];
        this.posts = resources;
        this.showSpinner = false;
      });
  }
}
