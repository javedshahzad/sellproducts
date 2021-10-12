import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { UtilService } from 'src/app/services/util.service';
import firebase from 'firebase';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  users:any={}
  upperdiv:boolean=true;
  lowerdiv:boolean=false;
  userImage: any;
  user_id: string;
  constructor(
    private nav : NavController,
    private modalCtrl : ModalController,
    private util : UtilService,
    private api : ApiserviceService,
    // private storage: AngularFireStorage, 
    // private database:AngularFirestore,
    // private authobj : AngularFireAuth,
    ) {
      localStorage.setItem("google","0")
     }

  ngOnInit() {
  }
  imageupload($event)
  {
    let file = $event.target.files[0];
    this.util.startLoad();
      let ref = firebase.storage().ref('uploads/'+ file.name);
      ref.put(file).then(res=>{
        ref.getDownloadURL().then(url =>{
          this.util.presentToast("Image Uploaded")
          
          this.userImage=url;
          console.log(this.userImage);
          this.util.dismissLoader();
       
        });
      }).catch(err=>{
        console.log(err);
      })
  }
  register(){
    this.util.startLoad();
    console.log(this.users);
    if(this.users.email !=undefined && this.users.password !=undefined){
      firebase.auth().createUserWithEmailAndPassword(this.users.email,this.users.password).then( (res)=>{
        console.log(res);
        this.util.dismissLoader();
        console.log(res.user.uid);
        this.user_id=res.user.uid;
        localStorage.setItem('uid',res.user.uid);
        // localStorage.setItem('uid',res.user.uid);
        this.upperdiv=false;
        this.lowerdiv=true;
     
      }).catch(e=>{
        console.log(e);
        this.util.presentToast("Please check detals!");
        this.util.dismissLoader();
      });
    }else{
      this.util.presentToast("Please check detals!");
      this.util.dismissLoader();
    }
    // localStorage.setItem("uid",this.user.id);
    // localStorage.setItem("name",this.user.name);
    // this.nav.navigateForward("home");
    // this.api.isupdateLogin.next(true);
  }

  generateRandomString(length) {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < length; i++){
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }
  submit(){
    this.util.startLoad();
    let key = this.generateRandomString(16);
    firebase.firestore().collection("users/").add({
      email:this.users.email,
      password:this.users.password,
      user_name:this.users.name,
      phone:this.users.phone,
      userProfile:this.userImage,
      town:this.users.town,
      user_id:this.user_id,
      created_at:Date.now(),
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then((resd)=>{
      console.log(resd);
      this.util.presentToast("Signup Successfull");
      this.util.dismissLoader();
      if(localStorage.getItem("google") == "googlelogin"){
        localStorage.setItem("usertype","users")
        this.api.isupdateLogin.next(true);
        this.nav.navigateForward('products')
      }else{
        this.nav.navigateForward('login')
      }
     
    })
  }

  newlogingoogle(){
    firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(res=>{
      console.log("from google");
      localStorage.setItem('uid',res.user.uid);
      localStorage.setItem("google","googlelogin")
      console.log(res);
      this.user_id=res.user.uid;
      this.upperdiv=false;
      this.lowerdiv=true;
      // localStorage.setItem('uid',res.user.uid);
      this.users.email=res.user.email;
      this.users.password="123456";
      this.userImage=res.user.photoURL;
      this.users.name=res.user.displayName;
      // this.database.object('users/' + res.user.uid).set({
      //   name:res.user.displayName,
      //   email:res.user.email,
      //   class:"Inter",
      //   image:res.user.photoURL,
      //   password:"0000",
      //   created_at:Date.now()
      // }).then((resd)=>{
      //   console.log(resd);
        
      //   this.util.presentToast("Google login Successfull");
      //   this.nav.navigateForward('resturants')
      // })

    }).catch(err=>console.log(err));
  }
}
