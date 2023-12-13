import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  private url = "http://localhost:3000";

    constructor(private http: HttpClient) {
}

  getAllSchedules() {
    return this.http.get(this.url + '/api/schedules');
  }
  getScheduleByUserId(id: string) {
    return this.http.get(this.url + '/api/schedule/by-owner/' + id);
  }
  getScheduleById(id: string) {
    return this.http.get(this.url + '/api/schedule/byId/' + id);
  }
  getScheduleAmountByUserId(id: string) {
    return this.http.get(this.url + '/api/schedule/by-owner/amount/' + id);
  }
  updateSchedule(id: string, Data: any) {
    return this.http.put(this.url + '/api/Schedule/update/' + id, Data);
  }

  createSchedule(scheduleData: any) {
    return this.http.post(this.url + '/api/createSchedule', scheduleData);
  }
  deleteSchedule(id: string) {
    return this.http.put(this.url + '/api/deleteSchedule/'+ id,null);
  }




}
