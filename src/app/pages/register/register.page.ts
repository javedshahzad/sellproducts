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
  userImage: any;
  constructor(
    private nav : NavController,
    private modalCtrl : ModalController,
    private util : UtilService,
    private api : ApiserviceService,
    // private storage: AngularFireStorage, 
    // private database:AngularFirestore,
    // private authobj : AngularFireAuth,
    ) { }

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
    if(this.users.email && this.users.password){
      firebase.auth().createUserWithEmailAndPassword(this.users.email,this.users.password).then( (res)=>{
        console.log(res);
        console.log(res.user.uid);
        localStorage.setItem('uid',res.user.uid);
        let key = this.generateRandomString(16);
        firebase.firestore().collection("users/").add({
          email:this.users.email,
          password:this.users.password,
          user_name:this.users.name,
          phone:this.users.phone,
          userProfile:this.userImage,
          town:this.users.town,
          created_at:Date.now(),
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }).then((resd)=>{
          console.log(resd);
          this.util.presentToast("Signup Successfull");
          this.util.dismissLoader();
          this.nav.navigateForward('login')
        })
     
      }).catch(e=>{
        console.log(e);
        this.util.presentToast("Please check detals!");
      });
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

}
