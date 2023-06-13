import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Cron} from "../interfaces";

@Injectable({providedIn:"root"})
export class CronService{



  constructor(private http:HttpClient) {
  }


  getMyCrons() : Observable<Cron[]>{
    return this.http.get<Cron[]>("/api/v1/cron/getMyCrons"+this.getStartTokenString());
  }

  getTokenString() {
    return "token=" + localStorage.getItem("auth-token")
  }

  getStartTokenString() {
    return "?" + this.getTokenString();
  }

  createCron(object: { cronType: String; http: any; codeFine: number; message: any; contacts: Array<number> }) {
    return this.http.put("/api/v1/cron/create" + this.getStartTokenString(), object);

  }

  delete(a: String) {
    return this.http.get("/api/v1/cron/delete/"+a+this.getStartTokenString());
  }
}
