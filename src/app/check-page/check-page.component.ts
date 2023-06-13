import {Component, OnInit} from '@angular/core';
import {Form, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../shared/services/auth.service";
import {ActivatedRoute, Params, Route, Router} from "@angular/router";

@Component({
  selector: 'app-check-page',
  templateUrl: './check-page.component.html',
  styleUrls: ['./check-page.component.css']
})
export class CheckPageComponent implements OnInit {
  form!: FormGroup
  phone!: String
  type!:String
  constructor(private auth: AuthService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.auth.isAuthGlobal()
    this.form = new FormGroup({
      code: new FormControl(null, [Validators.required, Validators.minLength(6)])
    })
    this.route.queryParams.subscribe((params: Params) => {
      if (params['phone']==null || params['type'] == null) this.router.navigate(['']);
      this.phone = params['phone']
      this.type = params['type']
    })
  }

  onSubmit() {
    var auth = {
      code: this.form.get('code')?.value,
      phone: this.phone
    }
    // @ts-ignore
    this.auth.check(auth,this.type).subscribe(
      (data) => {
        console.log(data)
        if (data.code == 200) {
          this.auth.setToken(data.token)
          this.router.navigate(['dashboard'])
        }
      },
      error => {
        alert("Код введен неверно!")
        console.log(error)
      }
    )
  }
}
