import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-single-list',
  templateUrl: './single-list.page.html',
  styleUrls: ['./single-list.page.scss'],
})
export class SingleListPage implements OnInit {
  // res:Result;
  books:ResultRanking_Book;
  list_name:string;

  constructor(
    private Route:ActivatedRoute,
    private http:HttpClient,
    private router:NavController
    ) { }

  ngOnInit() {
    // console.log(this.Route);
    let list_id = this.Route.snapshot.params.list_id;
    this.list_name = this.Route.snapshot.params.list_name
    let url = "/home/ranking/"+list_id;
    this.http.get(url).subscribe((res:Result)=>{
      console.log(res);
      // this.res = res;
      this.books = res.ranking.books;
      console.log(this.books);
      
    })
  }

  // 点击时间：跳转到书籍详情页
  jump(book_id,book_title){
    // 对象属性和值相同时 book_id:book_id 可以用语法糖简化
    this.router.navigateForward(["book-detail",{book_id,book_title}]);
  }

}

interface Result{
  ok: boolean,
  ranking:ResultRanking
}
interface ResultRanking{
  biTag: string,
  books: ResultRanking_Book,
  collapse: false
  cover: string,
  created: string,
  gender: string,
  icon: string,
  id: string,
  isSub: false
  monthRank: string,
  new: true
  priority: number,
  shortTitle: string,
  tag: string,
  title: string,
  total: number,
  totalRank: string,
  updated: string,
  __v: number,
  _id: string
}
interface ResultRanking_Book{
  allowMonthly: boolean,
  author: string,
  banned: number,
  cover: string,
  latelyFollower: number,
  majorCate: string,
  minorCate: string,
  retentionRatio: string,
  shortIntro: string,
  site: string,
  title: string,
  _id: string
}