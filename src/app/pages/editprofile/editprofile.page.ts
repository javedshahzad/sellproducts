import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { UtilService } from 'src/app/services/util.service';
import firebase from 'firebase';


@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.page.html',
  styleUrls: ['./editprofile.page.scss'],
})
export class EditprofilePage implements OnInit {
userdata:any={};
  userImage: any;
  userprofile1: any;
  constructor(
    private nav : NavController,
    private api : ApiserviceService,
    private util : UtilService,
  ) { 
    this.userdata=this.api.userprofile;
    console.log(this.userdata);
  }

  ngOnInit() {
  }
  updateprofile(){
        // firebase.auth().currentUser.updateEmail(this.userdata.email)
        // .then((res) => {
        // console.log(res);
        // });
        // firebase.auth().currentUser.updatePassword(this.userdata.password)
        // .then((res) => {
        // console.log(res);
        // });
        console.log("imaaaaa"+ this.userImage)
        if( this.userImage == "" || this.userImage == undefined){
          this.userprofile1=this.userdata.userProfile
        }else{
          this.userprofile1=this.userImage
        }
        console.log(this.userprofile1)
    firebase.firestore().collection("users").doc(this.userdata.key).update({
      email:this.userdata.email,
      password:this.userdata.password,
      user_name:this.userdata.user_name,
      phone:this.userdata.phone,
      userProfile:this.userprofile1,
      town:this.userdata.town,
      user_id:localStorage.getItem("uid"),
      created_at:Date.now(),
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then((resd)=>{
      console.log(resd);
      this.util.presentToast("Profile updated Successfull");
      this.util.dismissLoader();
      this.nav.navigateForward('products')
    })
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

}
