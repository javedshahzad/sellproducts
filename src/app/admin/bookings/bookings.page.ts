import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { UtilService } from 'src/app/services/util.service';
import firebase from 'firebase';


@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit {
  bookings:any=[];
  deliverd="delivered"
  constructor(
    private util : UtilService,
    private nav : NavController,
    public alertController: AlertController
  ) {
    this.allbookings();
   }

  ngOnInit() {
  }
  allbookings(){
    this.util.startLoad();
    firebase.firestore().collection("orders").onSnapshot((res:any)=>{
      let temp=[];
      res.forEach((products)=>{
        temp.push({key:products.id, ...products.data()});
      });
      console.log(temp);
      this.bookings = temp;
      this.util.dismissLoader();
      console.log(this.bookings);
    })
  }
  gotomap(town){
    this.nav.navigateForward("admin/location/"+town)
  }

  async presentAlertPrompt(id) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Reason of postpond',
      inputs: [
        {
          name: 'reason',
          type: 'text',
          placeholder: 'Describe Reason'
        },
  
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            this.util.startLoad();
            firebase.firestore().collection("orders/").doc(id).update({
              status:"pending"
            })
            console.log(data);
            firebase.firestore().collection("postpond/").add({
              order_id:id,
              reason:data.reason,
              created_at:Date.now(),
              timestamp: firebase.firestore.FieldValue.serverTimestamp()

            }).then((resd)=>{
              console.log(resd);
              this.util.presentToast("Order Postponded!");
              this.util.dismissLoader();
            })
          }
        }
      ]
    });

    await alert.present();
  }
  deliverditem(id){
    firebase.firestore().collection("orders/").doc(id).update({
      status:"delivered"
    })
  }
  chat(item){
    localStorage.setItem("userName",item.userName);
    localStorage.setItem("userTown",item.userTown);
    localStorage.setItem("userProfile",item.userProfile);
    this.nav.navigateForward("admin/chat/"+item.user_id)
  }
}
