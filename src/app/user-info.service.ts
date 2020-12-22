import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  noUserBooks =["59b896a11585803534c5d4ad","5953714a528d4b0616217012","597998e14a7c8bb308f6653d","5a4e0cb2797ca21b7182ff89"];
  userInfo = {
    userName:"",
    bookList:[],
    userId:""
  };
  // 存储上一个页面的路由
  // 在跳转登录页面后,登录成功可以返回上一个页面
  lastRoute="";
  

  constructor() { }
}
