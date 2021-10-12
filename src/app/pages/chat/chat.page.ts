import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import firebase from 'firebase';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  user_id: string;
  message:any;
  userName: string;
  userTown: string;
  userProfile: string;
  chatsms:any=[];
  constructor(
    private util: UtilService,
    private activeroute: ActivatedRoute
  ) { 
    this.user_id=localStorage.getItem("uid");
    this.userName= localStorage.getItem("userName");
    this.userTown=localStorage.getItem("userTown");
    this.userProfile= localStorage.getItem("userProfile");
    this.getchat();
  }

  ngOnInit() {
  }
  sendmsg(){
    if(this.message !=undefined){
      // console.log(this.product);
      firebase.firestore().collection("chat/").add({
      message:this.message,
      user_id:this.user_id,
      type:"user",
      userName:this.userName,
      userProfile:this.userProfile,
      userTown:this.userTown,
      created_at:Date.now(),
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then((resd)=>{
      console.log(resd);
      this.message=""
      this.util.presentToast("Message sent!");
      this.util.dismissLoader();
    })
    }else{
      this.util.presentToast("Please fill all fields");
    }
  }

  getchat(){
    this.util.startLoad();
    firebase.firestore().collection("chat").where("user_id","==",localStorage.getItem("uid")).onSnapshot((res:any)=>{
      let temp=[];
      res.forEach((products)=>{
        temp.push({key:products.id, ...products.data()});
      });
      console.log(temp);
      this.chatsms = temp;
      this.chatsms.sort(this.sortDate);
      this.util.dismissLoader();
      console.log(this.chatsms);
    })
  }

  sortDate(a, b) {  
    var dateA = new Date(a.timestamp.toDate()); 
    var dateB = new Date(b.timestamp.toDate()); 
    return dateA > dateB ? 1 : -1;  
  };


}
