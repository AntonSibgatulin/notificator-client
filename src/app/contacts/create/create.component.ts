import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {ContactService} from "../../shared/services/contact.service";
import {Subscription} from "rxjs";
import {Route, Router} from "@angular/router";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit, OnDestroy {
  form!: FormGroup
  aSub!: Subscription

  constructor(private contactService: ContactService,private router:Router) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      phone: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required,Validators.email]),
      name: new FormControl(null, [Validators.required])

    })
  }


  onSubmit() {
    this.form.disable()
    this.aSub = this.contactService.create(this.form).subscribe(
      () => {
        this.router.navigate(['/contacts'])
      }, error => {
        console.log(error)
        this.form.enable()
      })

  }

  ngOnDestroy(): void {
    if(this.aSub!=null)
    this.aSub.unsubscribe()
  }
}
