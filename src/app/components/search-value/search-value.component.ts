import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-search-value',
  templateUrl: './search-value.component.html',
  styleUrls: ['./search-value.component.scss'],
})
export class SearchValueComponent implements OnInit {
  //跨域配置文件中通过 /home 代替 https://api.zhuishushenqi.com/        /home == "https://api.zhuishushenqi.com/";
  res:Result;
  // bookList:Array<Array<any>> = new Array<Array<any>>();
  bookList:Array<any> = new Array<any>();
  searchValue:string;
  searchRes:SearchResult;
  start = 0;
  limit = 20;
  total = 0;
  // 存放返回顶部按钮的状态信息
  // toTop = false;

  constructor(
    private http:HttpClient,
    private router:NavController
  ) { }

  ngOnInit(): void {
    this.http.get('/home/ranking/gender').subscribe((res:Result)=>{
      console.log(res);
      this.res = res;
  
      let bookList =  [];
      //遍历数组，将每个榜单的书籍信息存在遍历中，通过二位数组存储；格式为：bookList[0]=arr[榜1书籍数组];
      for (let index = 0; index < res.epub.length; index++) {
        bookList[index] = [];
        this.http.get('/home/ranking/' + res.epub[index]._id).subscribe((res1:any)=>{
          console.log(res1);
          let books = res1.ranking.books;
          // bookList.push(books);
          bookList.concat(books);
          bookList[index]=bookList[index].concat(books);
        })
      }
      this.bookList = bookList;
      console.log(this.bookList);
      
    })
  }

  jump(id,title){
    this.router.navigateForward(["/single-list",{list_id:id,list_name:title}]);
  };
  detail(book_id,book_title){
    this.router.navigateForward(["/book-detail",{book_id,book_title}]);
  };
  search(){
    // http://api.zhuishushenqi.com/book/fuzzy-search?query=斗破苍穹&start=1&limit=20
    // console.log("开始搜索");
    // this.toTop = false;
    let searchUrl = `/home/book/fuzzy-search?query=${this.searchValue}&start=${this.start}&limit=${this.limit}`
    this.http.get(searchUrl).subscribe((res:SearchResult)=>{
      console.log(res);
      this.searchRes =res;
      // this.total = res.total;
    })
  };
  loadData(e){
    console.log("触底");
    console.log(`start:${this.start}---limit:${this.limit}----total:${this.total}`);
    
    let nextPageStart = this.start + this.limit;
    let searchUrl = `/home/book/fuzzy-search?query=${this.searchValue}&start=${nextPageStart}&limit=${this.limit}`;
    this.http.get(searchUrl).subscribe((res:SearchResult)=>{
      console.log(res);
      let books= this.searchRes.books.concat(res.books);
      this.searchRes.books = books;
      this.start = nextPageStart;
      // if(this.start>40) this.toTop = true;
      // 加载更多结束后，通知 加载更多组件 本次操作已经结束
      e.target.complete();
    })
    
  }

}


interface Result{
  epub: ResultEpub[],
  female: ResultGender[],
  male: ResultGender[]
}
interface ResultEpub{
  collapse: boolean,
  cover: string,
  shortTitle: string,
  title: string,
  _id: string
}
interface ResultGender{
  ollapse: boolean,
  cover: string,
  monthRank: string,
  shortTitle: string,
  title: string,
  totalRank: string,
  _id: string
}

interface SearchResult{
  books:books[],
  ok: boolean,
  total:number
}
interface books{
  aliases: string,
  allowMonthly: false
  author: string,
  banned: number,
  cat: string,
  contentType: string,
  cover: string,
  hasCp: true
  highlight: any,
  lastChapter: string,
  latelyFollower: number,
  retentionRatio: number,
  shortIntro: string,
  site: string,
  sizetype: number,
  superscript: string,
  title: string,
  wordCount: number,
  _id: string,
}
