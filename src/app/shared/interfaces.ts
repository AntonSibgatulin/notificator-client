export interface Auth {
  message:string
  code:number
  token:string

}



export interface AuthUser {
  phone:string
}



export interface AuthCode {
  phone:string
  code:Number
}

export interface Contact{
  id:number
  email:string,
  name:string,
  phone:string,
  relative:boolean,
  tg:boolean
  vk:boolean,
  ws:boolean
}

export interface Message{
  id:number
  message:string
  typeMessage:number
  contacts:Contact[]
}

export enum CronType{
  MINUTES_5,MINUTES_15,MINUTES_30,HOUR,HOURS_3,HOURS_6,HOURS_12,HOURS_24
}
export enum CronStatus{
  RUNNING,OK,ERROR
}

export interface Cron{
  id:Number
  codeFine:Number
  message:String
  http:String
  contacts:Contact[]
  cronType:CronType
  cronStatus:CronStatus
}
