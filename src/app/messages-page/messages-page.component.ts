import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {Observable, Subscription} from "rxjs";
import {Message} from "../shared/interfaces";
import {MessagesService} from "../shared/services/messages.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-messages-page',
  templateUrl: './messages-page.component.html',
  styleUrls: ['./messages-page.component.css']
})
export class MessagesPageComponent implements OnInit ,OnDestroy{
  form!:FormGroup
  aSub!:Subscription
  messages$!:Observable<Message[]>;

  constructor(private messageService:MessagesService,private activateRoute:ActivatedRoute) {


  }

  ngOnDestroy(): void {
    if(this.aSub!=null){
      this.aSub.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.messages$=this.messageService.fetch()
  }


}
