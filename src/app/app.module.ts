import { BrowserModule } from "@angular/platform-browser";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

// import ngx-translate and the http loader
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { AppComponent } from "./app.component";

import { AppRoutingModule } from "./app-routing.module";
import { CarouselModule } from "ngx-bootstrap/carousel";
import { NgwWowModule } from "ngx-wow";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { Ng2PageScrollModule } from "ng2-page-scroll";

import { AngularFontAwesomeModule } from "angular-font-awesome";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatStepperModule } from "@angular/material";

import { RatingModule } from "ngx-bootstrap/rating";
import { PaginationModule } from "ngx-bootstrap/pagination";

import { AccordionModule } from "ngx-bootstrap/accordion";
import { ModalModule } from "ngx-bootstrap/modal";

import { SafePipe } from "./core/pipes/safe-pipe/safe.pipe";

import { MatProgressBarModule } from "@angular/material";
import { TabsModule } from "ngx-bootstrap/tabs";
import { GoogleChartsModule } from "angular-google-charts";
import { ChartsModule } from "ng2-charts";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

// Angular Notifier
import { NotifierModule, NotifierOptions } from "angular-notifier";
import { TimepickerModule } from "ngx-bootstrap/timepicker";

import { CookieService } from "ngx-cookie-service";

import { AngularFireModule } from "@angular/fire";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { environment } from "../environments/environment";

import { AngularFireMessagingModule } from "@angular/fire/messaging";
import { MatTableModule } from "@angular/material/table";
import { MatSortModule } from "@angular/material/sort";
import { NavbarComponent } from "./core/components/navbar/navbar.component";
import { FooterComponent } from "./core/components/footer/footer.component";
import { AboutComponent } from "./core/components/about/about.component";
import { Blog1Component } from "./core/components/blog1/blog1.component";
import { BlogPostComponent } from "./core/components/blog-post/blog-post.component";
import { BookingPageComponent } from "./core/components/booking-page/booking-page.component";
import { ConfirmComponent } from "./core/components/confirm/confirm.component";
import { DetailPage2Component } from "./core/components/detail-page2/detail-page2.component";
import { FaqComponent } from "./core/components/faq/faq.component";
import { GridListComponent } from "./core/components/grid-list/grid-list.component";
import { IndexComponent } from "./core/components/index/index.component";
import { LoginComponent } from "./core/components/login/login.component";
import { Login2Component } from "./core/components/code/login2.component";
import { RegisterComponent } from "./core/components/register/register.component";
import { RegisterDoctorComponent } from "./core/components/register-doctor/register-doctor.component";
import { SubmitReviewComponent } from "./core/components/submit-review/submit-review.component";
import { PsychologicalComponent } from "./core/components/psychological/psychological.component";
import { FortherapistsComponent } from "./core/components/fortherapists/fortherapists.component";
import { AllNEWSComponent } from "./core/components/all-news/all-news.component";
import { PrivacyComponent } from "./core/components/privacy/privacy.component";
import { TermsComponent } from "./core/components/terms/terms.component";
import { DiseaseTESTComponent } from "./core/components/disease-test/disease-test.component";
import { ResultTestComponent } from "./core/components/result-test/result-test.component";
import { ProfileComponent } from "./core/components/profile/profile.component";
import { DetailsFAQComponent } from "./core/components/details-faq/details-faq.component";
import { ImportInFoComponent } from "./core/components/import-in-fo/import-in-fo.component";
import { CreateClientComponent } from "./core/components/create-client/create-client.component";
import { DiseaseTest2Component } from "./core/components/disease-test2/disease-test2.component";
import { ForgetPasswordComponent } from "./core/components/forget-password/forget-password.component";
import { ResetPasswordComponent } from "./core/components/reset-password/reset-password.component";
import { PostsCatogeriesComponent } from "./core/components/posts-catogeries/posts-catogeries.component";
import { Fridlist2Component } from "./core/components/fridlist2/fridlist2.component";
import { UpdateProfileComponent } from "./core/components/update-profile/update-profile.component";
import { MessagingService } from "./core/services/messaging-service/messaging.service";
import { SessionTimePipe } from "./core/pipes/session-time/session-time.pipe";
import { ZoomMeetingComponent } from "./core/components/zoom-meeting/zoom-meeting.component";
import { MeetingTimePipe } from './core/pipes/meeting-time/meeting-time.pipe';

const customNotifierOptions: NotifierOptions = {
  position: {
    horizontal: {
      position: "right",
      distance: 12,
    },
    vertical: {
      position: "top",
      distance: 12,
      gap: 10,
    },
  },
  theme: "uifort",
  behaviour: {
    autoHide: 5000,
    onClick: "hide",
    onMouseover: "pauseAutoHide",
    showDismissButton: true,
    stacking: 4,
  },
  animations: {
    enabled: true,
    show: {
      preset: "slide",
      speed: 300,
      easing: "ease",
    },
    hide: {
      preset: "fade",
      speed: 300,
      easing: "ease",
      offset: 50,
    },
    shift: {
      speed: 300,
      easing: "ease",
    },
    overlap: 150,
  },
};
// Example components
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    Blog1Component,
    BlogPostComponent,
    BookingPageComponent,
    ConfirmComponent,
    DetailPage2Component,

    FaqComponent,
    GridListComponent,
    IndexComponent,
    LoginComponent,
    Login2Component,
    RegisterComponent,
    RegisterDoctorComponent,
    SubmitReviewComponent,

    PsychologicalComponent,
    FortherapistsComponent,
    AllNEWSComponent,
    PrivacyComponent,
    TermsComponent,
    DiseaseTESTComponent,
    ResultTestComponent,
    ProfileComponent,
    DetailsFAQComponent,
    ImportInFoComponent,
    CreateClientComponent,
    SafePipe,
    DiseaseTest2Component,
    ForgetPasswordComponent,
    ResetPasswordComponent,
    PostsCatogeriesComponent,
    Fridlist2Component,
    UpdateProfileComponent,
    NavbarComponent,
    FooterComponent,
    SessionTimePipe,
    ZoomMeetingComponent,
    MeetingTimePipe,
  ],
  imports: [
    // fire base
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule, // for database

    AngularFireMessagingModule,
    BrowserModule,
    AppRoutingModule,
    NgwWowModule,
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    ChartsModule,
    MatTableModule,
    MatSortModule,

    MatProgressBarModule,
    ReactiveFormsModule,
    Ng2PageScrollModule,
    CarouselModule.forRoot(),
    AngularFontAwesomeModule,
    BrowserAnimationsModule,
    MatStepperModule,
    // ngx-translate and the loader module
    HttpClientModule,
    GoogleChartsModule,
    NgbModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),

    RatingModule.forRoot(),
    FormsModule,
    PaginationModule.forRoot(),
    AccordionModule.forRoot(),
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    NotifierModule,
    NotifierModule.withConfig(customNotifierOptions),
    TimepickerModule.forRoot(),
  ],
  providers: [CookieService, MessagingService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
