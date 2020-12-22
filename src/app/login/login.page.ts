import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavController } from '@ionic/angular';
import { UserInfoService } from '../user-info.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  regist = false;
  uname = "";
  upwd = "";
  // 密码是否可见
  // hiddenPwd = true;
  hiddenPwd1 = true;
  hiddenPwd2 = true;
  hiddenPwd3 = true;
  // 根据密码是否可见修改密码输入框的类型是 text 还是 password
  PwdInputType1 = "password";
  PwdInputType2 = "password";
  PwdInputType3 = "password";
  // PwdInputType = this.hiddenPwd ? "password" : "text"; //此处的三目运算符没有生效
  // 当用户名输入框失去焦点时，判断用户名是否存在
  userExistence = false;
  // 存储用户登录状态信息
  Login = false;
  registerUname = "";
  registerUpwd = "";
  registerUpwdRe = "";
  // 通过服务，组件间共享 用户信息,将服务内容存储到变量，后续可以读取修改
  userInfo:UserInfoService;

  constructor(
    private http: HttpClient,
    UserInfo:UserInfoService,
    public router:NavController
    ) { 
      this.userInfo = UserInfo;
    }

  ngOnInit() {
  }

  changeSlide(params) {
    if (params == 'regist') {
      this.regist = true;
    } else if (params == "login") {
      this.regist = false;
    }
  };

  test() {

  }

  userExist() {
    let uname = this.uname;
    if (uname == "") {
      console.log("用户名不能为空");
      return;
    }
    let url = "http://127.0.0.1:3000/users/user?uname=" + uname;
    this.http.get(url).subscribe((res: any) => {
      console.log(res);
      if (res.state == 200) {
        this.userExistence = true;
      } else {
        this.userExistence = false;
      }
    })
  }

  changehiddenPwd(num) {
    num = num * 1;
    switch (num) {
      case 1: {
        this.hiddenPwd1 = !this.hiddenPwd1;
        if (this.hiddenPwd1 == true) {
          this.PwdInputType1 = "password";
        } else {
          this.PwdInputType1 = "false";
        };
        break;
      }
      case 2: {
        this.hiddenPwd2 = !this.hiddenPwd2;
        if (this.hiddenPwd2 == true) {
          this.PwdInputType2 = "password";
        } else {
          this.PwdInputType2 = "false";
        };
        break;
      }
      case 3: {
        this.hiddenPwd3 = !this.hiddenPwd3;
        if (this.hiddenPwd3 == true) {
          this.PwdInputType3 = "password";
        } else {
          this.PwdInputType3 = "false";
        };
        break;
      }
      default: break;
    }

  }

  login() {
    let uname = this.uname;
    let upwd = this.upwd;
    if (upwd == "") {
      console.log("用户名不存在");
      return;
    }
    if (!this.userExistence) {
      console.log("用户名不存在");
    } else {
      let url = `http://127.0.0.1:3000/users/upwd?uname=${uname}&upwd=${upwd}`;
      this.http.get(url).subscribe((res: any) => {
        console.log(res);
        if (res.state == 200) {
          this.Login = true;
          // console.log("登录成功");
          // 将数据库中用户书架的数据添加到服务，从而让全局可用用户信息及用户网络书架
          // 返回的数据格式
          // {"state":"200","data":[{"book_id":"5a4e0cb28408f11c495a29e9"},{"book_id":"50864bf69dacd30e3a000014"}]}
          let books = [];
          for (let index = 0; index < res.data.length; index++) {
            let obj = res.data[index];
            let book_id = obj.book_id;
            books.push(book_id);
          }
          // console.log(books);
          this.userInfo.userInfo.userName = this.uname;
          this.userInfo.userInfo.bookList = books;
          this.userInfo.userInfo.userId = res.data[0].user_id;
          console.log(this.userInfo);
          // 登录成功并获得数据后返回上一页
          this.router.navigateBack(this.userInfo.lastRoute);
        } else {
          console.log("用户名或密码错误");
        }
      })
    }
  }

  judgeRegisterInfo(type) {
    let registerUname = this.registerUname;
    let registerUpwd = this.registerUpwd;
    let registerUpwdRe = this.registerUpwdRe;
    if (type == "uname") {
      if (registerUname == "") console.log(`用户名不能为空`);
    }
    if (type == "upwd") {
      if (registerUpwd == "") console.log(`密码不能为空`);
    }
    if (type == "upwdRe") {
      if (registerUpwd != registerUpwdRe) console.log(`二次输入的密码不一致`);
    }
  }

  register() {
    let registerUname = this.registerUname;
    let registerUpwd = this.registerUpwd;
    let registerUpwdRe = this.registerUpwdRe;
    // 判断两次密码是否一致
    if (registerUpwd == registerUpwdRe) {
      if (registerUname != "") {
        // 当用户名不为空时，发送请求，判断数据库中是否存在这个用户名
        let url1 = "http://127.0.0.1:3000/users/user?uname=" + registerUname;
        this.http.get(url1).subscribe((res: any) => {
          // console.log(res);
          if (res.state == 200) {
            console.log("该用户名已被注册");
          } else {
            // 当两次密码一致，用户名不为空且未被注册，发送请求，注册用户
            // http://127.0.0.1:3000/users/register?uname=dudu&upwd=123
            let url2 = `http://127.0.0.1:3000/users/register?uname=${registerUname}&upwd=${registerUpwd}`
            this.http.get(url2).subscribe((res:any)=>{
              if(res.state == 200){
                console.log("注册成功");
                // 此处还需补充代码完成以下效果：滑动回到登录界面
              }
            })
          }
        })
      }else{
        console.log("用户名不能为空");
      }
    }else{
      console.log("两次输入密码不一致");
    }

  }


  weixinLogin() {
  }
}
