import { Component, OnInit } from '@angular/core';
import { MenuController, NavController, Platform, ToastController,IonRouterOutlet } from '@ionic/angular';
import { ApiserviceService } from './services/apiservice.service';
import firebase from 'firebase';
import { UtilService } from './services/util.service';
import { Router } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {QueryList, ViewChildren} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  islogin:boolean=true;
  userdata:any=[];
  lastTimeBackPress = 0;
  timePeriodToExit = 2000;
  public selectedIndex = 0;
  @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;

  appPages:any;


  constructor(
    private menu : MenuController,
    private nav : NavController,
    private api : ApiserviceService,
    private util : UtilService,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private toastController: ToastController,
    ) {
      this.api.configApp();
      this.appinit();
      this.backButtonEvent();
      this.api.isupdateLogin.subscribe(_isLogin=>{
        this.userprofile();
        if(localStorage.getItem("usertype") == "admin"){
          this.appPages = [
            { title: 'Home', url: 'admin/allproducts', icon: 'mail' },
            { title: 'Add product', url: 'admin/addproduct', icon: 'paper-plane' },
            { title: 'All Bookings', url: 'admin/bookings', icon: 'heart' },
            { title: 'Delivery Mans', url: 'admin/delveryman', icon: 'heart' },
          ];
        }else{
          this.appPages = [
            { title: 'Home', url: 'products', icon: 'mail' },
            { title: 'My Cart', url: 'mycart', icon: 'paper-plane' },
            { title: 'My Orders', url: 'myorders', icon: 'heart' },
            { title: 'Chat', url: 'chat', icon: 'heart' },
          ];
        }
      })
      
    if(localStorage.getItem("usertype") == "admin"){
        this.nav.navigateRoot('admin/allproducts');
    } else if(localStorage.getItem("usertype") == "users" || localStorage.getItem("usertype") == "deliverymen") {
        this.nav.navigateRoot('/products');
    }else{
      this.nav.navigateRoot('/start');
    }

    }
    ngOnInit(): void {
      const path = window.location.pathname.split('folder/')[1];
      if (path !== undefined) {
          this.selectedIndex = this.appPages.findIndex(
              page => page.title.toLowerCase() === path.toLowerCase()
          );
      }
    }
  closemenu(){
    this.menu.close();
  }
  login(){
    this.nav.navigateForward("loginvia");
    this.menu.close();
  }
  logout(){
    localStorage.clear();
    firebase.auth().signOut();
    this.menu.close();
    this.nav.navigateForward("loginvia");
  
    // this.api.isupdateLogin.next(true);
  }
  userprofile(){

    this.util.startLoad();
    firebase.firestore().collection("users").where("user_id","==",localStorage.getItem("uid")).onSnapshot((res:any)=>{
      let temp=[];
      res.forEach((products)=>{
        temp.push({key:products.id, ...products.data()});
      });
      console.log(temp);
      this.userdata = temp;
      for(const users of this.userdata){
       console.log(users.user_name+"NNNNNNNNN");
       localStorage.setItem("userName",users.user_name);
       localStorage.setItem("userTown",users.town);
       localStorage.setItem("userProfile",users.userProfile);
       this.api.allopermission=users.permission;
       localStorage.setItem("permission",users.permission)
      }
      this.util.dismissLoader();
      // console.log(this.userdata);
    })

    for(const data of this.userdata){
      
    }  
   }
   editprofile(data){
     this.api.userprofile=data;
     this.nav.navigateForward("editprofile");
     this.menu.close();
   }

   appinit(){
    this.platform.ready().then(()=>{
      this.splashScreen.hide();
      this.statusBar.backgroundColorByHexString('#FBBE41');
    })
  }
  backButtonEvent() {
    this.platform.backButton.subscribe(async () => {
        this.routerOutlets.forEach((outlet: IonRouterOutlet) => {
            if (outlet && outlet.canGoBack()) {
                outlet.pop();
            } else if (
                this.router.url === '/home' || this.router.url === '/login' || this.router.url === '/start2'
                
            ) {
                if (
                    new Date().getTime() - this.lastTimeBackPress <
                    this.timePeriodToExit
                ) {
                    navigator['app'].exitApp();
                } else {
                    this.showToast();
                    this.lastTimeBackPress = new Date().getTime();
                }
            }
        });
    });
}

async showToast() {
  const toast = await this.toastController.create({
      message: "Press again to exit app",
      duration: 2000
  });
  toast.present();
}

}
