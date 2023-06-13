import {Component, OnDestroy, OnInit} from '@angular/core';
import {CronService} from "../../shared/services/cron.service";
import {Observable, Subscription} from "rxjs";
import {FormControl, FormGroup} from "@angular/forms";
import {ContactService} from "../../shared/services/contact.service";
import {Contact} from "../../shared/interfaces";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.css']
})
export class CreatePageComponent implements OnInit,OnDestroy{
  private aSub!:Subscription
  public form!: FormGroup;
  public contacts$!:Observable<Contact[]>
  type:String="HOUR"
  checked: Array<number> = [];

  constructor(private cronService:CronService,
              private contactService:ContactService,
              private router:Router) {
  }

  ngOnDestroy(): void {
    if(this.aSub!=null){
      this.aSub.unsubscribe()
    }
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      message: new FormControl(),
      http_code: new FormControl(),
      http_url: new FormControl(),

    });



    this.contacts$ = this.contactService.fetch();
  }


  onSubmit() {
    this.form.disable()

    let object = {
      message: this.form.get("message")?.value,
      contacts: this.checked,
      http: this.form.get("http_url")?.value,
      codeFine: Number(this.form.get("http_code")?.value),
      cronType: this.type
    };
    this.aSub = this.cronService.createCron(object).subscribe(() => {
      this.router.navigate(["cron"])
    }, error => {
      this.form.enable()
    })
  }

  onChangeType(event: Event) {
    // @ts-ignore
    let value = (event.target.value)
    this.type = value;

  }



  onCheckChange(event: Event) {
    // @ts-ignore
    let value = Number(event.target.value)
    // @ts-ignore
    let checked = (event.target.checked)

    if (checked) {
      this.checked.push(value)
    } else {
      this.checked.splice(this.checked.indexOf(checked), 1)
    }
  }

  getSocialNetwork(contact: Contact) {
    let arr = [];
    if (contact.email.length > 0) {
      arr.push("Email")
    }
    if (contact.phone.length > 0) {
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

  getRelative(contact: Contact) {
    if(contact.email!=null){
      return contact.email;
    }
    if (contact.relative) {
      return "Семья"
    } else {
      return "Не родственник"
    }
  }
}
