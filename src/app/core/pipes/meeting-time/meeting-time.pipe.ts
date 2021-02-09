import { Pipe, PipeTransform } from "@angular/core";
import { APIservicesService } from "../../services/data-service/apiservices.service";

@Pipe({
  name: "meetingTime",
  pure: false,
})
export class MeetingTimePipe implements PipeTransform {
  constructor(private _service: APIservicesService) {}
  transform(timeFrom: any, timeTo: any): any {
    timeFrom = timeFrom.split(":");
    timeTo = timeTo.split(":");
    let meetingTime = timeTo[0] - timeFrom[0];
    if (meetingTime < 0) {
      meetingTime = meetingTime + 24;
      meetingTime = meetingTime + (timeTo[1] - timeFrom[1]) / 60;
    } else {
      meetingTime = meetingTime + (timeTo[1] - timeFrom[1]) / 60;
    }
    meetingTime = Math.floor(meetingTime * 60);
    let endMeeting = meetingTime * 60 * 1000;
    this._service.TimeByMinutes$.subscribe((res) => {
      if (res < -1) {
        endMeeting = res * 60 * 1000 + endMeeting;
      }
      this._service.MeetingTime$.next(endMeeting);
    });
    return -meetingTime;
  }
}
