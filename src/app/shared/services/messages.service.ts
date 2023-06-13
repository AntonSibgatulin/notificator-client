import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Message} from "../interfaces";

@Injectable({
  providedIn: 'root'
})
export class MessagesService {


  constructor(private http: HttpClient) {
  }


  createMessage(object: { message: any; type: number; contacts: Array<number> }) {

    return this.http.put("/api/v1/messages/addNewMessage" + this.getStartTokenString(), object);

  }

  getTokenString() {
    return "token=" + localStorage.getItem("auth-token")
  }

  getStartTokenString() {
    return "?" + this.getTokenString();
  }

  fetch():Observable<Message[]> {
    return this.http.get<Message[]>("/api/v1/messages/getMyMessages" + this.getStartTokenString())
  }

  fetchOne(id:Number) : Observable<Message>{
    return this.http.get<Message>("/api/v1/messages/getMessage/"+id+""+this.getStartTokenString());
  }


  deleteOne(id:Number){
    return this.http.delete("/api/v1/messages/deleteMessage/"+id+this.getStartTokenString());
  }

    editMessage(object: { id:any,message: any; type: number; contacts: Array<number> }) {
    return this.http.put("/api/v1/messages/editMessage/"+object.id + this.getStartTokenString(), object);

  }

  mailing(id: Number) {
    return this.http.get("/api/v1/mailing/sendMessage/"+id+this.getStartTokenString())
  }
}
