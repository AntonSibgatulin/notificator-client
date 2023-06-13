import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {Contact} from "../shared/interfaces";
import {ContactService} from "../shared/services/contact.service";
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit, OnDestroy {
  contacts$!: Observable<Contact[]>;
  form!: FormGroup
  checked: Array<number> = [];
  aSub!: Subscription


  constructor(private contactService: ContactService, private router: Router) {
  }

  ngOnDestroy(): void {
    if (this.aSub != null)
      this.aSub.unsubscribe()
  }

  ngOnInit(): void {
    this.contacts$ = this.contactService.fetch();
  }


  delete() {
    this.aSub = this.contactService.deleteContacts(this.checked).subscribe(
      () => {
        console.log("Allright")
        window.location.reload();
      },
      error => {
        console.log(error)
        window.location.reload();
      }
    )
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



}
