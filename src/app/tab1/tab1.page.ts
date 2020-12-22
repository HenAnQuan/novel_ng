import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { PopoverController } from "@ionic/angular";
import { PopoverComponent } from "../components/popover/popover.component"
import { UserInfoService } from '../user-info.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  userInfo:UserInfoService;
  login = false;
  bookList = [];
  books =[];
  // 双向绑定搜索框输入的值
  searchValue="";
  searchBooks = [];

  constructor(
    private http:HttpClient,
    public popoverController: PopoverController, UserInfo:UserInfoService
    ) {
      this.userInfo = UserInfo;
    }

  ngOnInit(): void {
    this.userInfo.lastRoute = '/tabs/tab1';
    console.log(this.userInfo);
    
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    let userInfo = this.userInfo.userInfo;
    let noUserBooks = this.userInfo.noUserBooks;
    // 初始化时判断是否登录状态
    if(userInfo.userName != ''){
      this.login = true;
    }else if(userInfo.userName == ''){
      this.login = false;
      if(noUserBooks.length > 0){
        // 当用户未登录，把本地的书架的书籍信息读取出来并存到this.books中然后展示
        let books = [];
        for (let index = 0; index < noUserBooks.length; index++) {
          // http://api.zhuishushenqi.com/book/5816b415b06d1d32157790b1
          let url = "/home/book/" + noUserBooks[index];
          this.http.get(url).subscribe((res)=>{
            books.push(res);
          })
        }
        this.books = books;
        console.log(this.books);
      }else{
        console.log("用户未登录,且书架为空");
      }
    }
  }

  async presentPopover(ev: any) {
    console.log(ev);
    // let updata=this.updataUserInfo();
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true,
    });
    return await popover.present();
  }
  

  search(e){
    let searchValue = this.searchValue;
    let searchBooks = [];
    let books = this.books;
    if(books.length==0) return ;
    var reg = new RegExp("[^\n\r]*"+searchValue+"[^\n\r]*",'ig')
    
    books.forEach(element => {
      let i = element.author.search(reg);
      let j = element.title.search(reg);
      if(i==0 || j==0){
        searchBooks.push(element);
      }
      // console.log(`${element.author}***${element.title}***${i}***${j}`);
    });
    // this.searchBooks = searchBooks;
    // console.log(this.searchBooks);
  }

}
