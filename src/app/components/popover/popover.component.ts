import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { UserInfoService } from 'src/app/user-info.service';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {
  userInfo:UserInfoService;
  // 以下变量是村春获取到的popover在页面中的实例，每个item点击后，第一时间要执行以下代码关闭popover
  // this.popover.dismiss().then(() => { this.popover = null; });
  popover:any;

  constructor(
    UserInfo:UserInfoService,
    public toastController:ToastController,
    public router:NavController,
    public http:HttpClient
    ) {
      this.userInfo = UserInfo;
      console.log(UserInfo);
      
   }


   async presentToast() {
    this.popover.dismiss().then(() => { this.popover = null; });
    const toast = await this.toastController.create({
      message: '该功能还没有完善',
      duration: 2000
    });
    toast.present();
  }

  ngOnInit() {
    var s = document.querySelector('.popover-content');
    s['style'].width = '150px';
    // s['style'].background = '#999999';
    // var a = document.getElementsByClassName('.popover-arrow');
    this.popover = document.querySelector('ion-popover');
  }

  click(){
    alert('恭喜')
  }
  upload(){
    let noUserBooks = this.userInfo.noUserBooks;
    let bookList = this.userInfo.userInfo.bookList;
    let userName = this.userInfo.userInfo.userName;
    let userId = this.userInfo.userInfo.userId;
    this.popover.dismiss().then(() => { this.popover = null; });
    if(userName==""){
      this.router.navigateForward("/login")
    }else{
      // 读取本地书架中的书籍id,并一一比较云端书架中书籍id,如果没有，则添加到云端书架中
      // 双层循环，外层本地书架，内层云端书架
      let UploadBooks = [];
      let urlTest = '?'   //测试用，拼接参数，发送get请求
      for (let i = 0; i < noUserBooks.length; i++) {
        let same = false;
        for (let j = 0; j < bookList.length; j++) {
          if(noUserBooks[i]==bookList[j]) same=true;
        }
        if(same == false) {
          UploadBooks.push(noUserBooks[i]);
          if(i==0) urlTest = urlTest + `bookId=` + noUserBooks[i];   //测试用，拼接参数，发送get请求
          else if(i>=0) urlTest = urlTest + `&bookId=` + noUserBooks[i];
        }
      }
      // 如果本地书架中没有相比云端书架新增的书籍，直接返回，不会向服务器发送请求
      if(urlTest=='?') return;
      // 开始上传本地书架
      let url = "http://127.0.0.1:3000/users/test";
      urlTest = "http://127.0.0.1:3000/users/test" + urlTest + `&user_id=${userId}`;
      console.log(urlTest);
      this.http.get(url).subscribe((res:any)=>{
        if(res.state==200){
          console.log("上传成功,上传了"+res.affectedRows);
        }
      })
    }
  }
  // 判断登录状态，登录页面的ts可以把云端的书架读取存到服务的 useInfo.bookList 中
  // 登录状态后， userInfo.bookList中有值 循环该数组，比较本地书架 noUserBooks 的书籍内容
  // 如果本地书架没有该书籍，把该书籍添加到本地书架中
  download(){
    let noUserBooks = this.userInfo.noUserBooks;
    let bookList = this.userInfo.userInfo.bookList;
    let userName = this.userInfo.userInfo.userName;
    let tempList = [];
    this.popover.dismiss().then(() => { this.popover = null; });
    if(userName==""){
      this.router.navigateForward("/login")
    }else{
      // 读取云端事假的书籍id,并一一比较本地书架中书籍id,如果没有，则添加一个临时数组中，等玄幻完成后，再一并添加到本地书架中
      // 双层循环，外层云端书架，内层本地书架
      for (let i = 0; i < bookList.length; i++) {
        let same = false;
        for (let j = 0; j < noUserBooks.length; j++) {
          if(noUserBooks[j]==bookList[i]) same=true;
        }
        if(same == true) {
          tempList.push(bookList[i])
        }
      }
      // 把临时数组中的书架信息添加到本地书架中
      if(bookList.length>0){
        noUserBooks = noUserBooks.concat(bookList);
        this.userInfo.noUserBooks = noUserBooks;
      }
      console.log(this.userInfo);
      // this.router.navigateBack('/tabs/tab1');
      // location.reload();
      // location.replace('/tabs/tab1')
    }
  }

}
