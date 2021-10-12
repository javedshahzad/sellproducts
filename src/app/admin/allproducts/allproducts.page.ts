import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import firebase from 'firebase';
import { UtilService } from 'src/app/services/util.service';
@Component({
  selector: 'app-allproducts',
  templateUrl: './allproducts.page.html',
  styleUrls: ['./allproducts.page.scss'],
})
export class AllproductsPage implements OnInit {
  getproducts:any=[];
  chatKeys: any = [];
  constructor(
    private util : UtilService,
    private nav : NavController
  ) { }

  ngOnInit() {
    this.getallProducts();
  }
  getallProducts(){
    this.util.startLoad();
    firebase.firestore().collection("products").onSnapshot((res:any)=>{
      let temp=[];
      res.forEach((products)=>{
        temp.push({key:products.id, ...products.data()});
      });
      console.log(temp);
      this.getproducts = temp;
      this.util.dismissLoader();
      console.log(this.getproducts);
    })
  }
  addperoduct(){
    this.nav.navigateForward('admin/addproduct');
  }
}
