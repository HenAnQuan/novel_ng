import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.page.html',
  styleUrls: ['./book-detail.page.scss'],
})
export class BookDetailPage implements OnInit {
  res:Result;
  book_title:string;
  // 控制简介的2显示还是全部显示
  longIntroHidden=true;
  controlHidden="展开";
  // 存储评论内容
  review:Review;

  constructor(
    private Route:ActivatedRoute,
    private http:HttpClient,
  ) { }

  ngOnInit() { 

    let book_id = this.Route.snapshot.params.book_id;
    let book_title = this.Route.snapshot.params.book_title;
    this.book_title = book_title;
    let url_bookDetail = "/home/book/"+book_id;
    this.http.get(url_bookDetail).subscribe((res:Result)=>{
      console.log(res);
      this.res = res;
    });
    let sort = "updated";
    // sort=updated&start=0&limit=20
    let url_review =  `/home/post/review/by-book?book=${book_id}&sort=${sort}&start=0&limit=20`
    this.http.get(url_review).subscribe((res:Review)=>{
      // console.log(res);
      this.review = res;
    })
  }

  Count(count){
    if(count<10000) return (count+"千字");
    else return ((count/10000).toFixed(1) + "万字");
  }
  UpdateTime(str:string){
    if(str!==""){
      let date = str.substr(0,10)
      // console.log(date);
      let time = str.substr(11,8)
      // console.log(time);
      return (date+" "+time)
    }
  }
  changeIntroHidden(){
    if(this.longIntroHidden == true){
      this.longIntroHidden = false;
      this.controlHidden = "收起";
    }else{
      this.longIntroHidden = true;
      this.controlHidden = "展开";
    }
  }
  change(e){
    console.log(e);
      console.log("e.target.className",e.target.className);
        if(e.target.className=="review_hidden"){
          e.target.className = "review_show";
        }else if(e.target.className=="review_show"){
          e.target.className = "review_hidden";
        }
  }

}

interface Result{
  advertRead: boolean,
  allowBeanVoucher: boolean,
  allowFree: boolean,
  allowMonthly: boolean,
  allowVoucher: boolean,
  anchors: []
  author: string,
  authorDesc: string,
  banned: number,
  bookVideos: {
    video: [], 
    cover: string},
  buytype: number,
  cat: string,
  chaptersCount: number,
  contentLevel: number,
  contentType: string,
  copyright: string,
  copyrightDesc: string,
  cover: string,
  currency: number,
  discount: null
  donate: boolean,
  enSource: string,
  followerCount: number,
  gender: [string]
  hasCopyright: boolean,
  hasCp: boolean,
  isAllowNetSearch: boolean,
  isBigVip: boolean,
  isFineBook: boolean,
  isForbidForFreeApp: boolean,
  isMakeMoneyLimit: boolean,
  isSerial: boolean,
  lastChapter: string,
  latelyFollower: number,
  latelyFollowerBase: number,
  limit: boolean,
  longIntro: string,
  majorCate: string,
  majorCateV2: string,
  minRetentionRatio: number,
  minorCate: string,
  minorCateV2: string,
  originalAuthor: string,
  postCount: number,
  rating: {
    score: number, 
    count: number, 
    tip: string, 
    isEffect: boolean},
  retentionRatio: string,
  safelevel: number,
  serializeWordCount: number,
  sizetype: number,
  starRatingCount: number,
  starRatings:[string]
  superscript: string,
  tags:[string]
  title: string,
  totalFollower: number,
  updated: string,
  wordCount: number,
  _gg: boolean,
  _id: string,
  _le: boolean,
}
interface Review{
  ok: boolean
  reviews: Reviews[]
  today: number,
  total: number
}
interface Reviews{
  author: Author,
  commentCount: 0
  content: string,
  created: string,
  helpful: {total: -3, no: 4, yes: 1}
  likeCount: 0
  rating: 5
  state: string,
  title: string,
  updated: Date,
  _id: string,
}

interface Author{
  activityAvatar: string,
  avatar: string,
  gender: string,
  lv: number
  nickname: string,
  type: string,
  _id: string
}
