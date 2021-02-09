import { Pipe, PipeTransform } from "@angular/core";
import { APIservicesService } from "../../services/data-service/apiservices.service";
import * as moment from "moment";

@Pipe({
  name: "sessionTime",
  pure: false,
})
export class SessionTimePipe implements PipeTransform {
  constructor(private _service: APIservicesService) {}

  transform(date: any, timeFrom: any): any {
    date = `${date} ${timeFrom}`;
    let now = new Date();

    if (!date) {
      return;
    }
    if (!timeFrom) {
      return;
    } else {
      let sessionTime = Date.parse(date) - Date.parse(now.toString());

      sessionTime = Math.floor(sessionTime);
      let totalminutes = Math.floor(sessionTime / (1000 * 60));
      let second = Math.floor(sessionTime / 1000);
      let minute = Math.floor(second / 60);
      let hour = Math.floor(minute / 60);
      let day = Math.floor(hour / 24);
      hour = hour % 24;
      minute = minute % 60;
      second = second % 60;
      this._service.TimeByMinutes$.next(totalminutes);

      return totalminutes;
    }
  }
}
