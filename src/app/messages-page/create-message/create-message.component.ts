import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable, Subscription} from "rxjs";
import {MessagesService} from "../../shared/services/messages.service";
import {Contact} from "../../shared/interfaces";
import {ContactService} from "../../shared/services/contact.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-message',
  templateUrl: './create-message.component.html',
  styleUrls: ['./create-message.component.css']
})
export class CreateMessageComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  aSub!: Subscription
  contacts$!: Observable<Contact[]>;

  checked: Array<number> = [];

  private type = 1;

  constructor(private messagesService: MessagesService, private contactService: ContactService, private router: Router) {
  }

  ngOnDestroy(): void {
    if (this.aSub != null) {
      this.aSub.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      message: new FormControl(null, [Validators.required, Validators.maxLength(4096)])
    })
    this.contacts$ = this.contactService.fetch();
  }


  onSubmit() {
    this.form.disable()

    let object = {
      message: this.form.get("message")?.value,
      contacts: this.checked,
      type: this.type
    };
    this.aSub = this.messagesService.createMessage(object).subscribe(() => {
      this.router.navigate(["messages"])
    }, error => {
      this.form.enable()
    })

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

  onChangeType(event: Event) {
    // @ts-ignore
    let value = Number(event.target.value)
    this.type = value;

  }
}
