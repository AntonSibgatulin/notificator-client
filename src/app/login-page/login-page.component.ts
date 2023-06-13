import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validator, Validators} from "@angular/forms";
import {Auth} from "../shared/interfaces";
import {AuthService} from "../shared/services/auth.service";
import {Subscription} from "rxjs";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit, OnDestroy {

  form!: FormGroup
  aSub!: Subscription

  constructor(private auth: AuthService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnDestroy(): void {
    if (this.aSub && this.aSub != null)
      this.aSub.unsubscribe()
  }

  ngOnInit(): void {
    this.auth.isAuthGlobal()
    this.form = new FormGroup({
      phone: new FormControl(null, [Validators.required, Validators.minLength(11)])
    });

    this.route.queryParams.subscribe((params:Params)=>{
      if (params['registered']){
        // now you can login on app with your data
      }else if(params['accessDenied']){
        //you should auth in system
      }
    })
  }

  onSubmit() {

    this.form.disable()
    this.aSub = this.auth.login(this.form.value).subscribe(
      (object) => {
        var type = "/check"

        if(object.message == "You must use reg link"){
          type= "/regcheck";
        }
        this.router.navigate(['/check'], {
          queryParams: {
            phone:this.form.get('phone')?.value,
            type:type
          }
        })
      },
      error => {
        this.form.enable()
        console.log(error)
      }
    )
  }

  invalid() {

    return this.form.get('phone')?.invalid;
  }

  touched() {
    return this.form.get('phone')?.touched;
  }

  isErrorRequire() {


    return this.form.get('phone')?.getError("require") == null
  }

  isPhoneNotCorrect() {
    // @ts-ignore
    return this.form.get('phone')?.getError("minlength") == null && this.form.get('phone')?.getError("minlength")['requiredLength'] != null
  }
}
