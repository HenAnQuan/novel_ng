import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  // 存放获取到的所有榜单
  res:Result;
  // 存放获取到的男生榜单的图片
  list_img1:any;
  // 存放获取到的女生榜单的图片
  list_img2:any;

  constructor(
    private http:HttpClient,
    private router:NavController,
    ) {}
  ngOnInit(): void {
    this.http.get('/home/ranking/gender').subscribe((res:Result)=>{
      console.log(res);

      // 从服务器端获取到的结果数组中男生部分有一个榜单是空的，这里暂时手动过滤掉这个榜单
      for (let index = 0; index < res.male.length; index++) {
        if(res.male[index].title=="纵横月票榜"){
          res.male.splice(index,1);
        }
      }

      this.res = res;   
      // 1. 通过获取到的女生各个榜单的id，分别发送请求获取单一榜单榜首的图片
      let list1 = res.female;
      // 使用getImage函数获取女生图片
      this.list_img1 = this.getImage(list1,"female");

      // 获取男生榜单图片
      let list2 = res.male;
      this.list_img2 = this.getImage(list2,"male");   
      
    })
  }

  // 封装函数，男生女生都可以通过这个函数获取榜单图片，以榜单列表为参数
  getImage(list,sex){
    // 2. 创建榜单图片数组，用于存放单一榜首书籍图片地址
    let list_img = [];
    // 3. 循环榜单，获取每一个榜单中的数据
    list.forEach((item,index)=>{
      let list_id = item._id;
      // 3.1 再次发送请求获取单一榜单榜首图片
      this.http.get('/home/ranking/'+list_id).subscribe((result1:any)=>{
        // 3.2 获取单一榜首书籍的id]
        
        let book_id = result1.ranking.books[0]._id;
        // 3.3 通过书籍id获取书籍详情中的cover(图片地址)
        this.http.get("/home/book/"+book_id).subscribe((result2:any)=>{
          // console.log(result2.cover);
          // 3.4 将获取到的单一图片地址存储单局部变量数组list_img中
          list_img.push( "http://statics.zhuishushenqi.com" + result2.cover );
        })
      })
    })
    // 4. 将结果数组list_img返回，便于后续赋值给全局属性，作为属性便于html页面使用
    return list_img;
  }

  // 点击事件:点击榜单进入榜单单一榜单页面
  jump(id,title){
    this.router.navigateForward(["/single-list",{list_id:id,list_name:title}]);
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

// interface RankingRes{
//   ok: boolean,
//   ranking:RankingResContent,
// }
// interface RankingResContent{
//   biTag: "false"
//   books: RankingBooksList[],
//   collapse: boolean,
//   cover: string,
//   created: string,
//   gender: string,
//   icon:string,
//   id: string,
//   isSub: boolean,
//   monthRank: string,
//   new: boolean,
//   priority: number,
//   shortTitle: string,
//   tag: string,
//   title: string,
//   total: number,
//   totalRank: string,
//   updated: string,
//   __v: number,
//   _id:string
// }
// interface RankingBooksList{
//   allowMonthly: boolean,
//   author: string,
//   banned: number,
//   cover: string,
//   latelyFollower: number,
//   majorCate: string,
//   minorCate: string,
//   retentionRatio: string,
//   shortIntro: string,
//   site: string,
//   title: string,
//   _id: string,
// }
