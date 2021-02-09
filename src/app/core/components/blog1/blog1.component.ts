import { Component, OnInit } from "@angular/core";
import { APIservicesService } from "../../services/data-service/apiservices.service";

@Component({
  selector: "app-blog1",
  templateUrl: "./blog1.component.html",
})
export class Blog1Component implements OnInit {
  language = localStorage.getItem("locale");

  posts: any[];
  recent_posts: any[];
  category: any[];
  imageURL: string = localStorage.getItem("imageURL");
  showSpinner: boolean = true;
  constructor(private _service: APIservicesService) {}

  ngOnInit() {
    //show_blog//
    this._service.show_blog(this.language).subscribe((data) => {
      let resources: any = data["posts"];
      let resources1: any = data["recent_posts"];
      let resources2: any = data["category"];

      this.posts = resources;
      this.recent_posts = resources1;
      this.category = resources2;
      this.showSpinner = false;
    });
  }
}
