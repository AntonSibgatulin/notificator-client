import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {Cron} from "../shared/interfaces";
import {FormGroup} from "@angular/forms";
import {CronService} from "../shared/services/cron.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-cron-page',
  templateUrl: './cron-page.component.html',
  styleUrls: ['./cron-page.component.css']
})
export class CronPageComponent implements OnInit,OnDestroy{
  private aSub!:Subscription

  public crons$!:Observable<Cron[]>

  constructor(private cronService:CronService,
              private router:Router) {
  }

  ngOnDestroy(): void {
    if(this.aSub!=null){
      this.aSub.unsubscribe()
    }
  }

  ngOnInit(): void {
    this.crons$ = this.cronService.getMyCrons();
  }

  delete(a:Number) {
    this.aSub = this.cronService.delete(String(a)).subscribe(()=>{
        window.location.reload()
      }
    ,error => {})
  }
}
