import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/shared/models/models';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-singlepost',
  templateUrl: './singlepost.component.html',
  styleUrls: ['./singlepost.component.scss']
})
export class SinglepostComponent implements OnInit {
  news: Post
  title: any;
  data;
  body: any;
  id: any
  userid: any;
  DeletePostId: any;
  userInfo: any = {
    id: ''
  }

  constructor(private route: ActivatedRoute,
    private HttpServie: HttpService,
    private router: Router,
    private toastr: ToastrService) {

  }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('id')) {
        this.router.navigateByUrl('/home/posts');
      }
      this.HttpServie.GetPostByid(paramMap.get('id')).subscribe(
        this.data = res => {
          this.title = res.title
          this.body = res.body
          this.id = res.id
          this.userid = res.userid
          this.news = res as Post;
          console.log(res)
        },
        error => {

        },
      )
    })

  }

  // onDeletePost(id) {
  //   this.DeletePostId=id
  //   this.setUserData(  id)
  //   console.log(id)

  //   if (window.confirm('Are you sure you want to delete this post ' +id+ ' ?')) {

  //     this.HttpServie.deletePost(id).subscribe(
  //       data => {
         
  //         this.toastr.success("post" +id + " had been deleted");
  //         this.router.navigateByUrl('/home/posts')
  //       },
  //       err => {
  //         this.toastr.error("post" +id + " hadn't been deleted");
  //         console.log(err);
  //       }
  //     );
  //   }
  // }

  // setUserData(id) {
  //   this.userInfo.id = id;
  //   return this.userInfo
  // }


}
