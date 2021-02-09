import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { IndexComponent } from "./core/components/index/index.component";
import { AboutComponent } from "./core/components/about/about.component";
import { Blog1Component } from "./core/components/blog1/blog1.component";
import { BlogPostComponent } from "./core/components/blog-post/blog-post.component";
import { PostsCatogeriesComponent } from "./core/components/posts-catogeries/posts-catogeries.component";
import { UpdateProfileComponent } from "./core/components/update-profile/update-profile.component";
import { BookingPageComponent } from "./core/components/booking-page/booking-page.component";
import { ConfirmComponent } from "./core/components/confirm/confirm.component";
import { DetailPage2Component } from "./core/components/detail-page2/detail-page2.component";
import { FaqComponent } from "./core/components/faq/faq.component";
import { DetailsFAQComponent } from "./core/components/details-faq/details-faq.component";
import { GridListComponent } from "./core/components/grid-list/grid-list.component";
import { Fridlist2Component } from "./core/components/fridlist2/fridlist2.component";
import { LoginComponent } from "./core/components/login/login.component";
import { Login2Component } from "./core/components/code/login2.component";
import { CreateClientComponent } from "./core/components/create-client/create-client.component";
import { RegisterComponent } from "./core/components/register/register.component";
import { RegisterDoctorComponent } from "./core/components/register-doctor/register-doctor.component";
import { SubmitReviewComponent } from "./core/components/submit-review/submit-review.component";
import { PsychologicalComponent } from "./core/components/psychological/psychological.component";
import { FortherapistsComponent } from "./core/components/fortherapists/fortherapists.component";
import { AllNEWSComponent } from "./core/components/all-news/all-news.component";
import { PrivacyComponent } from "./core/components/privacy/privacy.component";
import { TermsComponent } from "./core/components/terms/terms.component";
import { DiseaseTESTComponent } from "./core/components/disease-test/disease-test.component";
import { DiseaseTest2Component } from "./core/components/disease-test2/disease-test2.component";
import { ResultTestComponent } from "./core/components/result-test/result-test.component";
import { ImportInFoComponent } from "./core/components/import-in-fo/import-in-fo.component";
import { ForgetPasswordComponent } from "./core/components/forget-password/forget-password.component";
import { ResetPasswordComponent } from "./core/components/reset-password/reset-password.component";
import { ProfileComponent } from "./core/components/profile/profile.component";
import { AuthenticationService } from "./core/guards/authentication-guard/authentication.service";
import { ZoomMeetingComponent } from "./core/components/zoom-meeting/zoom-meeting.component";

const routes: Routes = [
  { path: "", redirectTo: "index", pathMatch: "full" },
  { path: "index", component: IndexComponent },
  { path: "about", component: AboutComponent },
  { path: "Blog1", component: Blog1Component },
  { path: "BlogPost/:id", component: BlogPostComponent },
  { path: "postscategory/:id", component: PostsCatogeriesComponent },
  {
    path: "updateprofile",
    component: UpdateProfileComponent,
    canActivate: [AuthenticationService],
  },
  {
    path: "zoom-meeting",
    component: ZoomMeetingComponent,
    canActivate: [AuthenticationService],
  },

  {
    path: "BookingPage/:id",
    component: BookingPageComponent,
    canActivate: [AuthenticationService],
  },
  { path: "Confirm", component: ConfirmComponent },
  { path: "DetailPage2/:id", component: DetailPage2Component },
  { path: "Faq", component: FaqComponent },
  { path: "Faq/:id", component: DetailsFAQComponent },
  { path: "GridList", component: GridListComponent },
  { path: "GridList2/:id", component: Fridlist2Component },

  {
    path: "Login",
    component: LoginComponent,
  },
  {
    path: "code",
    component: Login2Component,
    canActivate: [AuthenticationService],
  },
  {
    path: "CreateClient",
    component: CreateClientComponent,
    canActivate: [AuthenticationService],
  },

  { path: "Register", component: RegisterComponent },
  { path: "RegisterDoctor", component: RegisterDoctorComponent },
  {
    path: "SubmitReview/:id",
    component: SubmitReviewComponent,
    canActivate: [AuthenticationService],
  },

  { path: "Psychological", component: PsychologicalComponent },
  { path: "Fortherapists", component: FortherapistsComponent },
  { path: "AllNEWS", component: AllNEWSComponent },
  { path: "Privacy", component: PrivacyComponent },
  { path: "Terms", component: TermsComponent },
  {
    path: "DiseaseTEST/:id",
    component: DiseaseTESTComponent,
    canActivate: [AuthenticationService],
  },
  {
    path: "DiseaseTEST2",
    component: DiseaseTest2Component,
    canActivate: [AuthenticationService],
  },
  {
    path: "ResultTest/:id",
    component: ResultTestComponent,
    canActivate: [AuthenticationService],
  },
  { path: "importinfo", component: ImportInFoComponent },
  { path: "forgetpassword", component: ForgetPasswordComponent },
  { path: "resetpassword", component: ResetPasswordComponent },

  {
    path: "profile",
    component: ProfileComponent,
    canActivate: [AuthenticationService],
  },

  { path: "**", redirectTo: "index", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
