import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Observable, of, BehaviorSubject } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { Time } from "@angular/common";
const httpOptions = {
  headers: new HttpHeaders({ content: "application/json" }),
};
@Injectable({
  providedIn: "root",
})
export class APIservicesService {
  token: string =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImlzcyI6IlkzVXBDdlJwUk0tLW02SEVBXzBTcFEiLCJleHAiOjE2NjQxODMyMjAsImlhdCI6MTYwMDUwNjQ5OX0.cJOaxVug60tuo3VPf7VnCP4OJK2ttfzqK8O5moBbJ_w";
  constructor(private http: HttpClient) {}
  baseurl: string = "https://rafikapi.codecaique.com/api";
  httpOptions = {
    headers: new HttpHeaders({
      content: "application/json",
      Authorization: "Bearer " + this.token,
    }),
  };
  TimeByMinutes$ = new BehaviorSubject<any>(5);
  ZoomDetails$ = new BehaviorSubject<any>(null);
  MeetingTime$ = new BehaviorSubject<any>(1000000);
  //social_navbar
  getMeeting(
    meetingNumber: number,
    role: number,
    api_key: string,
    api_secret: string
  ): Observable<any[]> {
    const formData: FormData = new FormData();

    formData.append("meetingNumber", meetingNumber + "");
    formData.append("role", role + "");
    formData.append("api_key", api_key);
    formData.append("api_secret", api_secret);

    return this.http.post<any[]>(
      "https://rafikapi.codecaique.com/api/getMeeting",
      formData
    );
  }
  social(): Observable<any> {
    return this.http.get(this.baseurl + "/social");
  }

  //show_header_home

  home_data(lang): Observable<any> {
    return this.http.get(this.baseurl + "/home_data?lang=" + lang);
  }

  //show_allspecialists in home
  show_allspecialists(lang): Observable<any> {
    return this.http.get(this.baseurl + "/show_allspecialists?lang=" + lang);
  }

  //show_opinions in home
  show_opinions(): Observable<any> {
    return this.http.get(this.baseurl + "/show_opinions");
  }

  //rafik_work2 in home
  rafik_work2(lang): Observable<any> {
    return this.http.get(this.baseurl + "/rafik_work2?lang=" + lang);
  }

  //rafik_work1 in home
  rafik_work1(lang): Observable<any> {
    return this.http.get(this.baseurl + "/rafik_work1?lang=" + lang);
  }

  //home_blog in home
  home_blog(lang): Observable<any> {
    return this.http.get(this.baseurl + "/home_blog?lang=" + lang);
  }

  //show_someNews in home
  show_someNews(): Observable<any> {
    return this.http.get(this.baseurl + "/show_someNews");
  }

  //show_doctorcountry in home
  show_doctorcountry(lang): Observable<any> {
    return this.http.get(this.baseurl + "/show_doctorcountry?lang=" + lang);
  }

  //show_doctorspecialists in home
  show_doctorspecialists(lang): Observable<any> {
    return this.http.get(this.baseurl + "/show_doctorspecialists?lang=" + lang);
  }

  //show_allNews
  show_allNews(): Observable<any> {
    return this.http.get(this.baseurl + "/show_allNews");
  }

  //show_Trainer
  show_Trainer(): Observable<any> {
    return this.http.get(this.baseurl + "/show_Trainer");
  }

  //show_Trainer
  show_oneTrainer(trainer_id, lang): Observable<any> {
    return this.http.get(
      this.baseurl +
        "/show_oneTrainer?trainer_id=" +
        trainer_id +
        "&lang=" +
        lang
    );
  }

  //show_Educational_tests
  show_subofcategory(lang): Observable<any> {
    return this.http.get(this.baseurl + "/show_subofcategory?lang=" + lang);
  }

  //Psychological Tests//
  show_secondcategory(lang): Observable<any> {
    return this.http.get(this.baseurl + "/show_secondcategory?lang=" + lang);
  }

  //show_Educational_tests
  test_questions(
    sub_id,
    user_token,
    group_number,
    test_type,
    report_id,
    id
  ): Observable<any> {
    return this.http.get(
      this.baseurl +
        "/test_questions?sub_id=" +
        sub_id +
        "&user_token=" +
        user_token +
        "&group_number=" +
        group_number +
        "&test_type=" +
        test_type +
        "&report_id=" +
        report_id +
        "&id=" +
        id
    );
  }

  //testA_questions_group2
  testA_questions_group2(sub_id): Observable<any> {
    return this.http.get(
      this.baseurl + "/testA_questions_group2?sub_id=" + sub_id
    );
  }

  //show_Educational_tests
  show_TrainerByid(trainer_id, lang): Observable<any> {
    return this.http.get(
      this.baseurl +
        "/show_TrainerByid?trainer_id=" +
        trainer_id +
        "&lang=" +
        lang
    );
  }

  //show_allquestiontype //
  show_allquestiontype(lang): Observable<any> {
    return this.http.get(this.baseurl + "/show_allquestiontype?lang=" + lang);
  }

  //show_Educational_tests
  show_typequestions(lang, id): Observable<any> {
    return this.http.get(
      this.baseurl + "/show_typequestions?lang=" + lang + "&id=" + id
    );
  }
  //show_Trainer
  show_doctorincountry(country_id, type): Observable<any> {
    return this.http.get(
      this.baseurl +
        "/show_doctorincountry?country_id=" +
        country_id +
        "&type=" +
        type
    );
  }

  //show_aboutus
  show_aboutus(lang): Observable<any> {
    return this.http.get(this.baseurl + "/show_aboutus?lang=" + lang);
  }

  //show_allopinions
  show_allopinions(): Observable<any> {
    return this.http.get(this.baseurl + "/show_allopinions");
  }

  //show_PrivacePolicy
  show_PrivacePolicy(lang): Observable<any> {
    return this.http.get(this.baseurl + "/show_PrivacePolicy?lang=" + lang);
  }

  //show_roles_conditions
  show_roles_conditions(lang): Observable<any> {
    return this.http.get(this.baseurl + "/show_roles_conditions?lang=" + lang);
  }

  //searchspecialist
  show_TrainerByspecialist(specialist): Observable<any> {
    return this.http.get(
      this.baseurl + "/show_TrainerByspecialist?specialist=" + specialist
    );
  }

  //searname
  show_TrainerByname(name): Observable<any> {
    return this.http.get(this.baseurl + "/show_TrainerByname?name=" + name);
  }

  //searchform
  show_TrainerByname_and_specialist(name, specialist): Observable<any> {
    return this.http.get(
      this.baseurl +
        "/show_TrainerByname_and_specialist?name" +
        name +
        "&specialist=" +
        specialist
    );
  }

  //searchsort
  sort_Trainer(sort_id): Observable<any> {
    return this.http.get(this.baseurl + "/sort_Trainer?sort_id=" + sort_id);
  }

  //registration_srudent
  /*    regesteration(first_name: string,last_name: string,user_name:string,email: string,state_id:string,passwords: string): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('first_name', first_name);
    formData.append('last_name', last_name);
    formData.append('user_name', user_name);
    formData.append('email', email);
    formData.append('state_id', state_id);
    formData.append('passwords', passwords);

    return this.http.post(this.baseurl + '/regesteration', formData)

  } */
  regesteration(body): Observable<any> {
    const formData: FormData = new FormData();
    formData.append("first_name", body.value.first_name);
    formData.append("last_name", body.value.last_name);
    formData.append("user_name", body.value.user_name);
    formData.append("email", body.value.email);
    formData.append("state_id", body.value.state_id);
    formData.append("passwords", body.value.passwords);

    console.log(body);
    return this.http.post(this.baseurl + "/regesteration", formData);
  }
  //Reset_password
  Reset_password(body, email): Observable<any> {
    const formData: FormData = new FormData();
    formData.append("email", email);
    formData.append("code", body.value.code);
    formData.append("password", body.value.password);

    return this.http.post(this.baseurl + "/Reset_password", formData);
  }
  //create_El3mail_account

  create_El3mail_account(
    body,
    user_token: string,
    test_category: string
  ): Observable<any> {
    const formData: FormData = new FormData();
    formData.append("email", body.value.email);

    formData.append("user_name", body.value.user_name);

    formData.append("password", body.value.password);
    formData.append("user_token", user_token);
    formData.append("test_category", test_category);

    return this.http.post(this.baseurl + "/create_El3mail_account", formData);
  }

  train_regesteration(body): Observable<any> {
    const formData: FormData = new FormData();
    formData.append("first_name", body.value.first_name);
    formData.append("last_name", body.value.last_name);
    formData.append("user_name", body.value.user_name);
    formData.append("email", body.value.email);
    formData.append("country", body.value.country);
    formData.append("phone", body.value.phone);
    formData.append("passwords", body.value.passwords);

    console.log(body);
    return this.http.post(this.baseurl + "/train_regesteration", formData);
  }
  //show_allcountry
  show_allcountry(lang): Observable<any> {
    return this.http.get(this.baseurl + "/show_allcountry?lang=" + lang);
  }

  //show_social_status
  show_social_status(): Observable<any> {
    return this.http.get(this.baseurl + "/show_social_status");
  }

  //show_roles
  show_roles(lang): Observable<any> {
    return this.http.get(this.baseurl + "/show_roles?&lang=" + lang);
  }

  //show_allchildern
  show_allchildern(user_token): Observable<any> {
    return this.http.get(
      this.baseurl + "/show_allchildern?user_token=" + user_token
    );
  }

  //login
  user_login(
    email: string,
    passwords: string,
    firebase_token: string
  ): Observable<any> {
    const formData: FormData = new FormData();
    formData.append("email", email);
    formData.append("passwords", passwords);
    formData.append("firebase_token", firebase_token);

    console.log("login token ---> ", firebase_token);

    return this.http.post(this.baseurl + "/user_login", formData);
  }

  //forget_password
  forget_password(email: string): Observable<any> {
    const formData: FormData = new FormData();
    formData.append("email", email);
    return this.http.post(this.baseurl + "/forget_password", formData);
  }

  //show_user
  show_user(user_token, lang): Observable<any> {
    return this.http.get(
      this.baseurl + "/show_user?user_token=" + user_token + "&lang=" + lang
    );
  }

  //show_allinstitutions
  show_allinstitutions(): Observable<any> {
    return this.http.get(this.baseurl + "/show_allinstitutions");
  }

  //change_password
  /*      change_password(user_token:string,passwords: string): Observable<any> {
                    const formData: FormData = new FormData();
                    
                    formData.append('user_token', user_token);
                    formData.append('passwords', passwords);
                   
    
                    return this.http.post(this.baseurl + '/change_password', formData)
                
                  } */

  change_password(body, user_token): Observable<any> {
    const formData: FormData = new FormData();
    formData.append("user_token", user_token);

    formData.append("passwords", body.value.passwords);

    console.log(body);
    return this.http.post(this.baseurl + "/change_password", formData);
  }

  //show_usernext_session
  show_usernext_session(user_token): Observable<any> {
    return this.http.get(
      this.baseurl + "/show_usernext_session?user_token=" + user_token
    );
  }

  //show_user_previouse_sessions
  show_user_previouse_sessions(user_token): Observable<any> {
    return this.http.get(
      this.baseurl + "/show_user_previouse_sessions?user_token=" + user_token
    );
  }

  //show_trainernext_session
  show_trainernext_session(user_token): Observable<any> {
    return this.http.get(
      this.baseurl + "/show_trainernext_session?user_token=" + user_token
    );
  }

  //show_user_previouse_sessions
  cancel_usersession(reservation_id, user_token): Observable<any> {
    return this.http.get(
      this.baseurl +
        "/cancel_usersession?reservation_id=" +
        reservation_id +
        "&user_token=" +
        user_token
    );
  }

  //show_Trainerreports
  show_Trainerreports(user_token): Observable<any> {
    return this.http.get(
      this.baseurl + "/show_Trainerreports?user_token=" + user_token
    );
  }

  //show_wallet
  show_wallet(user_token): Observable<any> {
    return this.http.get(
      this.baseurl + "/show_wallet?user_token=" + user_token
    );
  }

  //transfer_money
  transfer_money(
    emails: string,
    balnce: string,
    user_token: string
  ): Observable<any> {
    const formData: FormData = new FormData();

    formData.append("emails", emails);
    formData.append("balnce", balnce);
    formData.append("user_token", user_token);

    return this.http.post(this.baseurl + "/transfer_money", formData);
  }

  //show_PreviousDealings
  show_PreviousDealings(user_token): Observable<any> {
    return this.http.get(
      this.baseurl + "/show_PreviousDealings?user_token=" + user_token
    );
  }

  add_child1(child_id: string, user_token: string): Observable<any> {
    const formData: FormData = new FormData();

    formData.append("child_id", child_id);
    formData.append("user_token", user_token);

    return this.http.post(this.baseurl + "/add_child1", formData);
  }

  add_child(body, user_token: string): Observable<any> {
    const formData: FormData = new FormData();

    formData.append("first_name", body.value.first_name);
    formData.append("user_name", body.value.user_name);
    formData.append("email", body.value.email);
    formData.append("passwords", body.value.passwords);
    formData.append("user_token", user_token);

    return this.http.post(this.baseurl + "/add_child", formData);
  }

  //insert_timeline
  insert_timeline(
    date: string,
    time_from: Date,
    time_to: string,
    price: string,
    user_token: string
  ): Observable<any> {
    const formData: FormData = new FormData();

    formData.append("date", date);
    formData.append("time_from", time_from.toString());
    formData.append("time_to", time_to);
    formData.append("price", price);
    formData.append("user_token", user_token);

    return this.http.post(this.baseurl + "/insert_timeline", formData);
  }

  //update_timeline
  update_timeline(
    id: string,
    time_from: string,
    time_to: string,
    price: string,
    user_token: string
  ): Observable<any> {
    const formData: FormData = new FormData();
    formData.append("id", id);

    formData.append("time_from", time_from);
    formData.append("time_to", time_to);
    formData.append("price", price);
    formData.append("user_token", user_token);

    return this.http.post(this.baseurl + "/update_timeline", formData);
  }

  //show_child
  show_child(user_token): Observable<any> {
    return this.http.get(this.baseurl + "/show_child?user_token=" + user_token);
  }

  //show_Timeline
  show_Timeline(user_token): Observable<any> {
    return this.http.get(
      this.baseurl + "/show_Timeline?user_token=" + user_token
    );
  }

  deleteSelectedTimeline = (arr, user_token, lang) => {
    console.log(
      this.baseurl +
        "/delete_Timeline_range?user_token=" +
        user_token +
        "&lang=" +
        lang +
        "&timeline_id=" +
        arr
    );
    return this.http.get(
      this.baseurl +
        "/delete_Timeline_range?user_token=" +
        user_token +
        "&lang=" +
        lang +
        "&timeline_id=" +
        arr
    );
  };

  //fill-out-ness-info

  //make_atest
  make_atest(
    test_category: string,
    name: string,
    birth_date: string,
    examiner_name: string,
    app_date: string,
    nationality: string,
    language: string,
    main_hand: string,
    gender: string,
    school: string
  ): Observable<any> {
    const formData: FormData = new FormData();

    formData.append("test_category", test_category);
    formData.append("name", name);
    formData.append("birth_date", birth_date);
    formData.append("examiner_name", examiner_name);
    formData.append("app_date", app_date);
    formData.append("nationality", nationality);
    formData.append("language", language);
    formData.append("main_hand", main_hand);
    formData.append("gender", gender);
    formData.append("school", school);

    return this.http.post(this.baseurl + "/make_atest", formData);
  }

  //el3amil_code
  el3amil_code(
    user_token: string,
    code: string,
    test_category: string
  ): Observable<any> {
    const formData: FormData = new FormData();
    formData.append("user_token", user_token);
    formData.append("code", code);
    formData.append("test_category", test_category);

    return this.http.post(this.baseurl + "/el3amil_code", formData);
  }

  //create_El3mail_account
  /*       create_El3mail_account(user_token: string, user_name: string,password:string,test_category:string): Observable<any> {
            const formData: FormData = new FormData();
            formData.append('user_token', user_token);
            formData.append('user_name', user_name);
            formData.append('password', password);
            formData.append('test_category', test_category);
    
            return this.http.post(this.baseurl + '/create_El3mail_account', formData)
        
          } */

  //show_Timelinebyid
  show_Timelinebyid(idtimline, user_token): Observable<any> {
    return this.http.get(
      this.baseurl +
        "/show_Timelinebyid?id=" +
        idtimline +
        "&user_token=" +
        user_token
    );
  }

  //show_Timelinebyid
  delete_Timeline(timeline_id, user_token): Observable<any> {
    return this.http.get(
      this.baseurl +
        "/delete_Timeline?timeline_id=" +
        timeline_id +
        "&user_token=" +
        user_token
    );
  }

  //show_TrainerLanguages
  show_TrainerLanguages(user_token, lang): Observable<any> {
    return this.http.get(
      this.baseurl +
        "/show_TrainerLanguages?user_token=" +
        user_token +
        "&lang=" +
        lang
    );
  }

  //delete_trainerlanguage
  delete_trainerlanguage(id, user_token): Observable<any> {
    return this.http.get(
      this.baseurl +
        "/delete_trainerlanguage?id=" +
        id +
        "&user_token=" +
        user_token
    );
  }

  //insert_trainerlanguage
  insert_trainerlanguage(
    language_id: string,
    user_token: string
  ): Observable<any> {
    const formData: FormData = new FormData();

    formData.append("language_id", language_id);
    formData.append("user_token", user_token);

    return this.http.post(this.baseurl + "/insert_trainerlanguage", formData);
  }

  //show_allLanguages
  show_allLanguages(lang): Observable<any> {
    return this.http.get(this.baseurl + "/show_allLanguages?lang=" + lang);
  }

  //show_certificate
  show_certificate(user_token): Observable<any> {
    return this.http.get(
      this.baseurl + "/show_certificate?user_token=" + user_token
    );
  }

  //insert_certficate
  insert_certficate(
    name: string,
    from_institution: string,
    user_token: string
  ): Observable<any> {
    const formData: FormData = new FormData();

    formData.append("name", name);
    formData.append("from_institution", from_institution);

    formData.append("user_token", user_token);

    return this.http.post(this.baseurl + "/insert_certficate", formData);
  }
  //delete_certificate?
  delete_certificate(user_token, id): Observable<any> {
    return this.http.get(
      this.baseurl +
        "/delete_certificate?user_token=" +
        user_token +
        "&id=" +
        id
    );
  }

  //show_certificateByid
  show_certificateByid(id, user_token): Observable<any> {
    return this.http.get(
      this.baseurl +
        "/show_certificateByid?id=" +
        id +
        "&user_token=" +
        user_token
    );
  }

  //update_certificate
  update_certificate(
    user_token: string,
    id: string,
    name: string,
    from_institution: string
  ): Observable<any> {
    const formData: FormData = new FormData();
    formData.append("user_token", user_token);

    formData.append("id", id);
    formData.append("name", name);
    formData.append("from_institution", from_institution);

    return this.http.post(this.baseurl + "/update_certificate", formData);
  }

  //show_Trainerspecialists
  show_Trainerspecialists(user_token, lang): Observable<any> {
    return this.http.get(
      this.baseurl +
        "/show_Trainerspecialists?user_token=" +
        user_token +
        "&lang= " +
        lang
    );
  }
  //delete_trainerSpecialist
  delete_trainerSpecialist(id, user_token): Observable<any> {
    return this.http.get(
      this.baseurl +
        "/delete_trainerSpecialist?id=" +
        id +
        "&user_token=" +
        user_token
    );
  }

  //insert_trainerSpecialist
  insert_trainerSpecialist(
    specialist_id: string,
    user_token: string
  ): Observable<any> {
    const formData: FormData = new FormData();

    formData.append("specialist_id", specialist_id);
    formData.append("user_token", user_token);

    return this.http.post(this.baseurl + "/insert_trainerSpecialist", formData);
  }

  //show_video-in-trainer
  show_video(user_token): Observable<any> {
    return this.http.get(this.baseurl + "/show_video?user_token=" + user_token);
  }

  //upload_video
  upload_video(user_token: string, fileToUpload3: File): Observable<any> {
    const formData: FormData = new FormData();

    if (fileToUpload3 != null) {
      formData.append("video", fileToUpload3, fileToUpload3.name);
    }
    console.log("user_token", user_token);
    formData.append("user_token", user_token);

    return this.http.post(this.baseurl + "/upload_video", formData);
  }

  //show_blog
  show_blog(lang): Observable<any> {
    return this.http.get(this.baseurl + "/show_blog?lang=" + lang);
  }

  //show_onepost
  show_onepost(id, lang): Observable<any> {
    return this.http.get(
      this.baseurl + "/show_onepost?id=" + id + "&lang=" + lang
    );
  }

  //show_posts_incategory
  show_posts_incategory(id, lang): Observable<any> {
    return this.http.get(
      this.baseurl +
        "/show_posts_incategory?category_id=" +
        id +
        "&lang=" +
        lang
    );
  }

  // answer_atest
  answer_atest22(
    user_token: string,
    test_id: string,
    group_number: number,
    test_type: string,
    id: string,
    report_id: string,
    list: any[]
  ): Observable<any[]> {
    const formData: FormData = new FormData();
    console.log(
      "list1",
      user_token,
      test_id,
      group_number,
      test_type,
      id,
      report_id,
      list
    );

    formData.append("user_token", user_token);
    formData.append("test_id", test_id);
    formData.append("group_number", group_number.toString());
    formData.append("test_type", test_type);
    formData.append("id", id);
    formData.append("report_id", report_id);
    formData.append("list", JSON.stringify(list));

    return this.http.post<any[]>(
      this.baseurl + "/answer_atest22",
      formData,
      httpOptions
    );
  }

  // answer_Btest
  answer_Btest(report_id: string, list: any[]): Observable<any[]> {
    const formData: FormData = new FormData();

    formData.append("report_id", report_id);

    formData.append("list", JSON.stringify(list));

    return this.http.post<any[]>(
      this.baseurl + "/answer_Btest",
      formData,
      httpOptions
    );
  }

  //show_digram
  show_digram(report_id): Observable<any> {
    return this.http.get(this.baseurl + "/show_digram?report_id=" + report_id);
  }

  //show_mychart
  show_mychart(): Observable<any> {
    return this.http.get(this.baseurl + "/show_mychart");
  }

  main_degree(report_id): Observable<any[]> {
    return this.http.get<any[]>(
      this.baseurl + "/main_degree?report_id=" + report_id
    );
  }

  code_chart(): Observable<any[]> {
    return this.http.get<any[]>(this.baseurl + "/code_chart");
  }

  C_degree(report_id): Observable<any[]> {
    return this.http.get<any[]>(
      this.baseurl + "/C_degree?report_id=" + report_id
    );
  }

  C_chart(): Observable<any[]> {
    return this.http.get<any[]>(this.baseurl + "/C_chart");
  }

  R_degree(report_id): Observable<any[]> {
    return this.http.get<any[]>(
      this.baseurl + "/R_degree?report_id=" + report_id
    );
  }

  R_chart(): Observable<any[]> {
    return this.http.get<any[]>(this.baseurl + "/R_chart");
  }

  I_degree(report_id): Observable<any[]> {
    return this.http.get<any[]>(
      this.baseurl + "/I_degree?report_id=" + report_id
    );
  }

  I_chart(): Observable<any[]> {
    return this.http.get<any[]>(this.baseurl + "/I_chart");
  }

  A_degree(report_id): Observable<any[]> {
    return this.http.get<any[]>(
      this.baseurl + "/A_degree?report_id=" + report_id
    );
  }

  A_chart(): Observable<any[]> {
    return this.http.get<any[]>(this.baseurl + "/A_chart");
  }

  S_degree(report_id): Observable<any[]> {
    return this.http.get<any[]>(
      this.baseurl + "/S_degree?report_id=" + report_id
    );
  }

  S_chart(): Observable<any[]> {
    return this.http.get<any[]>(this.baseurl + "/S_chart");
  }

  E_degree(report_id): Observable<any[]> {
    return this.http.get<any[]>(
      this.baseurl + "/E_degree?report_id=" + report_id
    );
  }

  E_chart(): Observable<any[]> {
    return this.http.get<any[]>(this.baseurl + "/E_chart");
  }

  //show_Timelinebyday
  show_Timelinebyday(trainer_id, day, month, lang): Observable<any> {
    return this.http.get(
      this.baseurl +
        "/show_Timelinebyday?trainer_id=" +
        trainer_id +
        "&day=" +
        day +
        "&month=" +
        month +
        "&lang=" +
        lang
    );
  }

  //show_oneTimeline
  show_oneTimeline(user_token, id): Observable<any> {
    return this.http.get(
      this.baseurl + "/show_oneTimeline?user_token=" + user_token + "&id=" + id
    );
  }

  //reserve_timeline
  reserve_timeline(user_token, timeline_id, payment_id, pay): Observable<any> {
    return this.http.get(
      this.baseurl +
        "/reserve_timeline?user_token=" +
        user_token +
        "&timeline_id=" +
        timeline_id +
        "&payment_id=" +
        payment_id +
        "&pay=" +
        pay
    );
  }

  //show_E3lan
  show_E3lan(): Observable<any> {
    return this.http.get(this.baseurl + "/show_E3lan");
  }

  //my_tests
  my_tests(user_token): Observable<any> {
    return this.http.get(this.baseurl + "/my_tests?user_token=" + user_token);
  }

  //my_shared_reports
  my_shared_reports(user_token): Observable<any> {
    return this.http.get(
      this.baseurl + "/my_shared_reports?user_token=" + user_token
    );
  }

  //shared_student_result
  shared_student_result(user_token): Observable<any> {
    return this.http.get(
      this.baseurl + "/shared_student_result?user_token=" + user_token
    );
  }

  //shared_class_result
  shared_class_result(user_token): Observable<any> {
    return this.http.get(
      this.baseurl + "/shared_class_result?user_token=" + user_token
    );
  }

  //show_myclasses
  show_myclasses(user_token, lang): Observable<any> {
    return this.http.get(
      this.baseurl +
        "/show_myclasses?user_token=" +
        user_token +
        "&lang=" +
        lang
    );
  }

  //show_oneClass
  show_oneClass(user_token, class_id): Observable<any> {
    return this.http.get(
      this.baseurl +
        "/show_oneClass?user_token=" +
        user_token +
        "&class_id=" +
        class_id
    );
  }
  //show_onestudent
  show_onestudent(user_token, user_id): Observable<any> {
    return this.http.get(
      this.baseurl +
        "/show_onestudent?user_token=" +
        user_token +
        "&user_id=" +
        user_id
    );
  }

  //make_rating
  make_rating(
    user_token: string,
    user_id: string,
    rate: string,
    comment: string
  ): Observable<any> {
    const formData: FormData = new FormData();

    formData.append("user_token", user_token);
    formData.append("user_id", user_id);
    formData.append("rate", rate);
    formData.append("comment", comment);

    return this.http.post(this.baseurl + "/make_rating", formData);
  }

  //rate_school
  rate_school(
    user_token: string,
    rate: number,
    comment: string
  ): Observable<any> {
    const formData: FormData = new FormData();

    formData.append("user_token", user_token);
    formData.append("rate", rate.toString());
    formData.append("comment", comment);

    return this.http.post(this.baseurl + "/rate_school", formData);
  }

  //make_opinion
  make_opinion(user_token: string, content: string): Observable<any> {
    const formData: FormData = new FormData();

    formData.append("user_token", user_token);
    formData.append("content", content);

    return this.http.post(this.baseurl + "/make_opinion", formData);
  }

  //rate_management
  rate_management(
    user_token: string,
    rate: number,
    comment: string
  ): Observable<any> {
    const formData: FormData = new FormData();

    formData.append("user_token", user_token);
    formData.append("rate", rate.toString());
    formData.append("comment", comment);

    return this.http.post(this.baseurl + "/rate_management", formData);
  }

  //rate_myself
  rate_myself(user_token: string, rate: number): Observable<any> {
    const formData: FormData = new FormData();

    formData.append("user_token", user_token);
    formData.append("rate", rate.toString());

    return this.http.post(this.baseurl + "/rate_myself", formData);
  }

  //check_testbuy
  check_testbuy(user_token, test_id): Observable<any> {
    return this.http.get(
      this.baseurl +
        "/check_testbuy?user_token=" +
        user_token +
        "&test_id=" +
        test_id
    );
  }

  //buy_atest
  buy_atest(
    user_token: string,
    test_id: string,
    payment_id: string,
    paid: string
  ): Observable<any> {
    const formData: FormData = new FormData();

    formData.append("user_token", user_token);
    formData.append("test_id", test_id);
    formData.append("payment_id", payment_id);
    formData.append("paid", paid);

    return this.http.post(this.baseurl + "/buy_atest", formData);
  }

  edit_userProfile(
    user_token: string,
    fileToUpload: File,
    first_name: string,
    last_name: string,
    user_name: string,
    phone: string,
    email: string,
    gender: string,
    country_id: string,
    birth_date: string,
    nationality: string,
    job: string
  ): Observable<any> {
    const formData: FormData = new FormData();
    if (fileToUpload != null) {
      formData.append("image", fileToUpload, fileToUpload.name);
    }
    formData.append("user_token", user_token);
    formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    formData.append("user_name", user_name);
    formData.append("phone", phone);
    formData.append("email", email);
    formData.append("gender", gender);
    formData.append("country_id", country_id);
    formData.append("birth_date", birth_date);
    formData.append("nationality", nationality);
    formData.append("job", job);

    return this.http.post(this.baseurl + "/edit_userProfile", formData);
  }

  //show_userNotification
  show_userNotification(user_token, lang): Observable<any> {
    return this.http.get(
      this.baseurl +
        "/show_userNotification?user_token=" +
        user_token +
        "&lang=" +
        lang
    );
  }

  //user_logout
  user_logout(user_token): Observable<any> {
    return this.http.get(
      this.baseurl + "/user_logout?user_token=" + user_token
    );
  }

  //user_logout
  accept_parent_request(user_token, action, notify_id): Observable<any> {
    return this.http.get(
      this.baseurl +
        "/accept_parent_request?user_token=" +
        user_token +
        "&action=" +
        action +
        "&notify_id=" +
        notify_id
    );
  }
  //zoooom
  //getUser
  getUser(email): Observable<any> {
    return this.http.get(this.baseurl + "/getUser?email=" + email);
  }

  //createMeeting
  createMeeting(userId, start_time, end_time, password, date): Observable<any> {
    return this.http.get(
      this.baseurl +
        "/createMeeting?userId=" +
        userId +
        "&start_time=" +
        start_time +
        "&end_time=" +
        end_time +
        "&password=" +
        password +
        "&date=" +
        date +
        "@host_email=" +
        "apprafiiq@gmaail.com"
    );
  }

  //insert_timeline
  make_sessionReport(
    user_id: string,
    reservation_id: string,
    content: string,
    fileToUpload: File,
    user_token: string
  ): Observable<any> {
    const formData: FormData = new FormData();
    if (fileToUpload != null) {
      formData.append("image", fileToUpload, fileToUpload.name);
    }
    formData.append("user_id", user_id);
    formData.append("reservation_id", reservation_id);
    formData.append("content", content);
    formData.append("user_token", user_token);

    return this.http.post(this.baseurl + "/make_sessionReport", formData);
  }

  show_sessionReports(user_token): Observable<any> {
    return this.http.get(
      this.baseurl + "/show_sessionReports?user_token=" + user_token
    );
  }
}
