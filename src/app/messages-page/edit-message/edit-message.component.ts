import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable, Subscription} from "rxjs";
import {Contact, Message} from "../../shared/interfaces";
import {MessagesService} from "../../shared/services/messages.service";
import {ContactService} from "../../shared/services/contact.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-edit-message',
  templateUrl: './edit-message.component.html',
  styleUrls: ['./edit-message.component.css']
})
export class EditMessageComponent implements OnInit,OnDestroy{
  form!: FormGroup;
  aSub!: Subscription
  contacts$!: Observable<Contact[]>;
  message$!:Observable<Message>;

  checked: Array<number> = [];

  private type = 1;

  id!:Number


  constructor(private messagesService: MessagesService, private contactService: ContactService, private router: Router,private route:ActivatedRoute) {
    this.id = route.snapshot.params['id'];
  }

  ngOnDestroy(): void {
    if (this.aSub != null) {
      this.aSub.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.contacts$ = this.contactService.fetch();
    this.message$ = this.messagesService.fetchOne(this.id);



    this.aSub = this.message$.subscribe((data)=>{
      this.form = new FormGroup({
        message: new FormControl(data.message, [Validators.required, Validators.maxLength(4096)])
      })
    })


  }


  onSubmit() {
    this.form.disable()

    let object = {
      id:this.id,
      message: this.form.get("message")?.value,
      contacts: this.checked,
      type: this.type
    };
    this.aSub = this.messagesService.editMessage(object).subscribe(() => {
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

  isChecked(contacts: Contact[], contact: Contact) {
    for(let i =0;i<contacts.length;i++){
      if (contact.id == contacts[i].id){
        this.checked.push(contact.id)
        return true
      }
    }
    return false;
  }
}
