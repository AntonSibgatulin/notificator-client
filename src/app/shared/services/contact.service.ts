import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Contact} from "../interfaces";
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn:'root'
})
export class ContactService{
  constructor(private http:HttpClient) {


  }

  fetch():Observable<Contact[]> {
    return this.http.get<Contact[]>("/api/v1/contacts/getMyContacts"+this.getStartTokenString())
  }

  create(form:FormGroup){
    console.log(form.value)
    return this.http.put("/api/v1/contacts/createContact"+this.getStartTokenString(),form.value)
  }

  getTokenString(){
    return "token="+localStorage.getItem("auth-token")
  }
  getStartTokenString(){
    return "?"+this.getTokenString();
  }


  deleteContacts(checked: Array<number>) {
      var send = {
        array:checked
      }
      // @ts-ignore
    return this.http.post("/api/v1/contacts/deleteContacts"+this.getStartTokenString(),checked)
  }
}
