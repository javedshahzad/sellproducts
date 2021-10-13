import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import firebase from 'firebase';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { UtilService } from 'src/app/services/util.service';



@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
  getproducts:any=[];
  deliveryman:any;
  newpwermission: any;
  usertype: string;

  constructor(
    private util : UtilService,
    private nav : NavController,
    private api : ApiserviceService,
  ) { 


    this.getallProducts();
  }

  ngOnInit() {
  }
  getallProducts(){
    this.util.startLoad();
    firebase.firestore().collection("products").onSnapshot((res:any)=>{
      let temp=[];
      res.forEach((products)=>{
        temp.push({key:products.id, ...products.data()});
      });
      this.getproducts = temp;
      this.api.isupdateLogin.subscribe(_isLogin=>{
        this.usertype = localStorage.getItem("usertype");
        console.log(this.usertype)
        this.deliveryman = this.api.allopermission;
      });
   
      // console.log(this.deliveryman)
      this.util.dismissLoader();
     
    })
  }
  addtocart(data){
    if(localStorage.getItem("uid")){
      console.log(data);
      var today3 = new Date();
      var date = today3.getFullYear()+'-'+(today3.getMonth()+1)+'-'+today3.getDate();
      var time = today3.getHours() + ":" + today3.getMinutes() + ":" + today3.getSeconds();
      var dateTime = date+' '+time;
      console.log(dateTime);
      firebase.firestore().collection("caritems/").add({
      user_id:localStorage.getItem("uid"),
      productkey:data.key,
      productname:data.productname,
      description:data.description,
      quantity:data.quantity,
      price:data.price,
      product_image:data.product_image,
      town:data.town,
      start_date:dateTime,
      created_at:Date.now(),
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then((resd)=>{
      console.log(resd);
      this.util.presentToast("Product Added To cart!");
      this.util.dismissLoader();
      this.nav.navigateForward("mycart")
    });

    }else{
      this.util.presentToast("Please register to add Cart items!");
      this.nav.navigateForward("loginvia")
    }



  }

  addproduct(){
    if(this.deliveryman){
      this.nav.navigateForward("admin/addproduct")
    }else{
      this.util.presentToast("You have not permissioon to add products!");
    }
    
  }

}
