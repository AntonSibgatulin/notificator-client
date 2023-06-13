import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {Contact, Message} from "../../shared/interfaces";
import {MessagesService} from "../../shared/services/messages.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-message-preview',
  templateUrl: './message-preview.component.html',
  styleUrls: ['./message-preview.component.css']
})
export class MessagePreviewComponent implements OnInit,OnDestroy{
  messages$!:Observable<Message>
  private aSub!:Subscription;

  id!:Number
  constructor(private messageService:MessagesService,private route:ActivatedRoute,private router:Router) {
    this.id = route.snapshot.params['id'];
  }


  ngOnDestroy(): void {
    if(this.aSub!=null){
      this.aSub.unsubscribe();
    }
  }

  ngOnInit(): void {
    /*this.route.queryParams.subscribe((data)=>{
      if (data['id']!==null){
        this.messages$ = this.messageService.fetchOne(data['id']);
      }
    })

     */
    this.messages$ = this.messageService.fetchOne(this.id);

  }


  getSocialNetwork(contact: Contact) {
    let arr = [];
    if(contact.email.length>0){
      arr.push("Email")
    }
    if(contact.phone.length>0){
      arr.push("Phone")
    }
    if (contact.tg) {
      arr.push("TG")
    }
    if (contact.vk) {
      arr.push("VK")
    }
    if (contact.ws) {
      arr.push("WS")
    }

    return arr.join(", ")

  }
  getRelative(contact: Contact){
    if(contact.email!=null){
      return contact.email;
    }
    if(contact.relative){
      return "Семья"
    }else{
      return "Не родственник"
    }
  }



  deleteOne(id:Number){
    this.aSub = this.messageService.deleteOne(id).subscribe(()=>{
      this.router.navigate(["messages"])
    },error => {
      this.router.navigate(["messages"])
    })
  }


  mailing() {
    this.aSub =   this.messageService.mailing(this.id).subscribe(()=>{
      console.log("data")
    },error => {console.log("error")});
  }
}
