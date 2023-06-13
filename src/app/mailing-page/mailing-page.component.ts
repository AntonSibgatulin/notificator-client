import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {MailingService} from "../shared/services/mailing.service";
import {MessagesService} from "../shared/services/messages.service";
import {Message} from "../shared/interfaces";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-mailing-page',
  templateUrl: './mailing-page.component.html',
  styleUrls: ['./mailing-page.component.css']
})
export class MailingPageComponent implements OnInit,OnDestroy{
  aSub!:Subscription
  id!:Number

  messages$!:Observable<Message[]>

  constructor(private mailingService:MailingService,private messageService:MessagesService,private route:ActivatedRoute) {
    this.id = route.snapshot.params['id'];
  }

  ngOnDestroy(): void {
    if(this.aSub!=null){
      this.aSub.unsubscribe()
    }

  }

  ngOnInit(): void {

  }

}
