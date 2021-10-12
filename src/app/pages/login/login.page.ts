import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { UtilService } from 'src/app/services/util.service';
import firebase from 'firebase';
import { ApiserviceService } from 'src/app/services/apiservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  users:any={}
  constructor(private nav : NavController,
    private util : UtilService,
    private api : ApiserviceService
    ) { }

  ngOnInit() {
  }
  login(){
    this.util.startLoad();
    if(this.users.email !=undefined  && this.users.password !=undefined){
      firebase.auth().signInWithEmailAndPassword(this.users.email,this.users.password).then( (res)=>{
    console.log(res);
    localStorage.setItem('uid',res.user.uid);
    this.util.dismissLoader();
    this.util.presentToast("Login Succefull")
    if(this.users.email == "admin@gmail.com"){
      console.log("admin");
      localStorage.setItem("usertype","admin")
      this.api.isupdateLogin.next(true);
      this.nav.navigateForward("admin");
    }else{
      console.log("users");
      localStorage.setItem("usertype","users")
      this.api.isupdateLogin.next(true);
      this.nav.navigateForward("products");
    }

  }).catch(e=>{
   this.util.presentToast("The password is invalid or the user does not have a password.");
  });
   }else{
    this.util.presentToast("The password is invalid or the user does not have a password.");
   }
    // localStorage.setItem("uid",this.user.id);
    // localStorage.setItem("name",this.user.name);
    // this.nav.navigateForward("home");
    // this.api.isupdateLogin.next(true);
  }



}
