import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { APIservicesService } from "../../services/data-service/apiservices.service";

import { ChartOptions, ChartType, ChartDataSets } from "chart.js";
import { Label } from "ng2-charts";

@Component({
  selector: "app-result-test",
  templateUrl: "./result-test.component.html",
  styleUrls: ["./result-test.component.css"],
})
export class ResultTestComponent implements OnInit {
  reportid22;
  reportid2: string = localStorage.getItem("reportid2");
  userdata: any[];
  tablenames: any[];
  codedescription: any[];
  characterictic: any[];
  missionsjobs: any[];
  suitablejob: any[];
  description;
  suggestions;

  showSpinner: boolean = true;
  public barChartLabels: Label[];
  public barChartData: ChartDataSets[];

  public barChartLabels1: Label[];
  public barChartData1: ChartDataSets[];

  public barChartLabels2: Label[];
  public barChartData2: ChartDataSets[];

  public barChartLabels3: Label[];
  public barChartData3: ChartDataSets[];

  public barChartLabels4: Label[];
  public barChartData4: ChartDataSets[];

  public barChartLabels5: Label[];
  public barChartData5: ChartDataSets[];

  public barChartLabels6: Label[];
  public barChartData6: ChartDataSets[];

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: "end",
        align: "end",
      },
    },
  };

  public barChartType: ChartType = "bar";
  public barChartLegend = false;

  constructor(
    private _service: APIservicesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    ///////myol-r2esya
    this.reportid22 = +this.route.snapshot.paramMap.get("id");

    this.barChartLabels = [];
    this.barChartData = [];

    this._service.main_degree(this.reportid22).subscribe((data) => {
      let resources: any[] = data["all"];

      this.barChartData = resources;
      this.showSpinner = false;
    });

    this._service.code_chart().subscribe((data) => {
      let resources: any[];

      resources = data["Date"];
      this.barChartLabels = resources;
      this.showSpinner = false;
    });

    ///////////////////////////

    ///////nmt-monzm

    this.barChartLabels1 = [];
    this.barChartData1 = [];

    this._service.C_degree(this.reportid22).subscribe((data) => {
      let resources: any[] = data["all"];

      this.barChartData1 = resources;
      this.showSpinner = false;
    });

    this._service.C_chart().subscribe((data) => {
      let resources: any[];

      resources = data["Date"];
      this.barChartLabels1 = resources;
      this.showSpinner = false;
    });

    ///////////////////////////

    ///////nmt-wak3y

    this.barChartLabels2 = [];
    this.barChartData2 = [];

    this._service.R_degree(this.reportid22).subscribe((data) => {
      let resources: any[] = data["all"];

      this.barChartData2 = resources;
      this.showSpinner = false;
    });

    this._service.R_chart().subscribe((data) => {
      let resources: any[];

      resources = data["Date"];
      this.barChartLabels2 = resources;
      this.showSpinner = false;
    });

    ///////////////////////////

    ///////nmt-b7sy

    this.barChartLabels3 = [];
    this.barChartData3 = [];

    this._service.I_degree(this.reportid22).subscribe((data) => {
      let resources: any[] = data["all"];

      this.barChartData3 = resources;
      this.showSpinner = false;
    });

    this._service.I_chart().subscribe((data) => {
      let resources: any[];

      resources = data["Date"];
      this.barChartLabels3 = resources;
      this.showSpinner = false;
    });

    ///////////////////////////

    ///////nmt-fnan

    this.barChartLabels4 = [];
    this.barChartData4 = [];

    this._service.A_degree(this.reportid22).subscribe((data) => {
      let resources: any[] = data["all"];

      this.barChartData4 = resources;
      this.showSpinner = false;
    });

    this._service.A_chart().subscribe((data) => {
      let resources: any[];

      resources = data["Date"];
      this.barChartLabels4 = resources;
      this.showSpinner = false;
    });

    ///////////////////////////

    ///////nmt-egtma3y

    this.barChartLabels5 = [];
    this.barChartData5 = [];

    this._service.S_degree(this.reportid22).subscribe((data) => {
      let resources: any[] = data["all"];

      this.barChartData5 = resources;
      this.showSpinner = false;
    });

    this._service.S_chart().subscribe((data) => {
      let resources: any[];

      resources = data["Date"];
      this.barChartLabels5 = resources;
      this.showSpinner = false;
    });

    ///////////////////////////

    ///////nmt-mo8amer

    this.barChartLabels6 = [];
    this.barChartData6 = [];

    this._service.E_degree(this.reportid22).subscribe((data) => {
      let resources: any[] = data["all"];

      this.barChartData6 = resources;
      this.showSpinner = false;
    });

    this._service.E_chart().subscribe((data) => {
      let resources: any[];

      resources = data["Date"];
      this.barChartLabels6 = resources;
      this.showSpinner = false;
    });

    ///////////////////////////

    console.log("ريبورت id", this.reportid22);
    this._service.show_digram(this.reportid22).subscribe((data) => {
      let resources: any[] = data["user_data"];
      let resources1: any[] = data["table_names"];
      let resources2: any[] = data["code_description"];
      let resources3: any[] = data["characterictic"];
      let resources4: any[] = data["missions_jobs"];
      let resources5: any[] = data["suitable_job"];

      let description: String = data["description"];

      let suggestions: String = data["suggestions"];

      this.userdata = resources;
      this.tablenames = resources1;
      this.codedescription = resources2;
      this.characterictic = resources3;
      this.missionsjobs = resources4;

      this.description = description;
      this.suggestions = suggestions;
      this.suitablejob = resources5;
      this.showSpinner = false;
    });
  }

  // events
  public chartClicked({
    event,
    active,
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }
}
