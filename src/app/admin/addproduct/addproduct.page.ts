import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import firebase from 'firebase';
import { UtilService } from 'src/app/services/util.service';
@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.page.html',
  styleUrls: ['./addproduct.page.scss'],
})
export class AddproductPage implements OnInit {
   product:any={}
  image_url: any;
  constructor(
    private util : UtilService,
    private nav : NavController
  ) { 
    
var today3 = new Date();
var date = today3.getFullYear()+'-'+(today3.getMonth()+1)+'-'+(today3.getDate()+1);
var time = today3.getHours() + ":" + today3.getMinutes() + ":" + today3.getSeconds();
var dateTime = date+' '+time;
console.log(dateTime);
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
          
          this.image_url=url;
          console.log(this.image_url);
          this.util.dismissLoader();
       
        });
      }).catch(err=>{
        console.log(err);
      })
  }

  addproduct(){
  
    if(this.product.productname !=undefined && this.product.description !=undefined && this.product.quantity !=undefined && this.product.price !=undefined){
      console.log(this.product);
      firebase.firestore().collection("products/").add({
      productname:this.product.productname,
      description:this.product.description,
      quantity:this.product.quantity,
      price:this.product.price,
      product_image:this.image_url,
      town:this.product.town,
      created_at:Date.now(),
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then((resd)=>{
      console.log(resd);
      this.util.presentToast("Product Added successfully!");
      this.util.dismissLoader();
      if(localStorage.getItem("usertype") =="deliverymen"){
        this.nav.navigateForward('products')
      }else{
        this.nav.navigateForward('admin/allproducts')
      }
     
    })
    }else{
      this.util.presentToast("Please fill all fields");
    }
  }
}
