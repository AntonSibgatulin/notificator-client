import {Injectable} from "@angular/core";
import {Auth, AuthCode, AuthUser} from "../interfaces";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService{
  private token!:String
  constructor(private http:HttpClient,private router:Router) {
  }
  login(auth:AuthUser) : Observable<Auth>{
    return this.http.get<Auth>('/api/v1/auth?phone='+auth.phone)
  }
  check(auth:AuthCode,type:String) : Observable<Auth>{
    return this.http.get<Auth>('/api/v1/auth'+type+'?phone='+auth.phone+'&code='+auth.code)
  }

  auth_check_token(){
    return this.http.get("/api/v1/auth_token_check/"+this.getStartTokenString())
  }
  isAuthGlobal(){
    if(this.isAuthentication()){
      this.auth_check_token().subscribe(()=>{
        this.router.navigate(["dashboard"])
      })
    }else{

    }
  }
  getTokenString() {
    return "token=" + localStorage.getItem("auth-token")
  }

  getStartTokenString() {
    return "?" + this.getTokenString();
  }

  registration(){

  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('auth-token',token)

  }

  getToken():String{
    return this.token;
  }
  isAuthentication():boolean{
    return !!this.token
  }
  logout(){
    // @ts-ignore
    this.token = null;
    localStorage.clear()

  }

  setTokenLoad(potentialToken: String) {
    this.token = potentialToken
  }
}
