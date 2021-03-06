import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';
import { Posts } from 'src/app/shared/models/models';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { Router } from '@angular/router';
import { title } from 'process';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  data;

  DeletePostId: any;
  totalPosts;
  userInfo: any = {
    id: ''
  }
  PostObj = {
    title: "",
    body: "",
    id: "",
    userid: ""
  }
  // using this Obj in modal
  editObj = {
    title: '',
    body: '',
    id: ''
  }
  closeResult: string;
  constructor(
    private HttpServie: HttpService,
    private toastr: ToastrService,
    private router: Router,
    private modalService: NgbModal

  ) { }

  ngOnInit() {
    this.getPosts();
  }


  getPosts() {
    this.HttpServie.getdata().subscribe(
      res => {
        this.data = res as Posts
        this.totalPosts = res['length']
        console.log(res)
      }
    )
  }


  onDeletePost(user) {
    this.DeletePostId = user.id;

    this.setUserData(user.id)
    console.log(user.id)

    if (window.confirm('Are you sure you want to delete this post ' + user.id + ' ?')) {

      this.HttpServie.deletePost(user.id).subscribe(
        data => {

          this.toastr.success("post" + user.id + " had been deleted");
          this.sliceEvents(this.DeletePostId)

        },
        err => {
          this.toastr.error("post" + user.id + " hadn't been deleted");
          console.log(err);
        }
      );
    }
  }

  Updatedata(id) {

    this.editObj.id = id;
    console.log(this.editObj.id)
    this.HttpServie.Updatedata(id, this.editObj).subscribe(
      data => {

        this.toastr.success("post" + id + " had been Updated");
        this.modalService.dismissAll();
      },
      err => {
        this.toastr.error("post" + id + " hadn't been Updated");
        console.log(err);
      }
    );
  }


  //this function to open Modal ////
  open(post, content) {
    this.DeletePostId = post.id
    console.log(post)
    this.setUserData(post.id)
    this.editObj.body = post.body;
    this.editObj.title = post.title;
    this.editObj.id = post.id;



    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  // This function is used in open
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


  setUserData(id) {
    this.userInfo.id = id;
    return this.userInfo
  }


  //slice elements after delete
  sliceEvents(id) {
    this.data = this.data.filter(x => x != id)
  }

  onUserRowSelect(event) {
    console.log(event)
  }

}
