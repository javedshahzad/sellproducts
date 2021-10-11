import { Injectable } from "@angular/core";
import { ToastController, LoadingController } from "@ionic/angular";
import { BehaviorSubject } from "rxjs";
@Injectable({
  providedIn: "root"
})
export class UtilService {
  cartData = [];
  isLoading = false;
  public dataTransfer:any = [];

  singleOrder: any = {};
  discountData: any = {};
  coupon_lines = [];
  
  public isUpdateProfile = new BehaviorSubject(true);
  public isupdatelanguage = new BehaviorSubject(true);
  constructor(
    public toastController: ToastController,
    private loadingController: LoadingController
  ) {}
  
  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  async startLoad() {
    this.isLoading = true;
    return await this.loadingController
      .create({
        duration: 10000,
        spinner: "bubbles",
        message: 'Please Wait',
        backdropDismiss: true,
        cssClass:'custom-loader-class'
      
      })
      .then(a => {
        a.present().then(() => {
          if (!this.isLoading) {
            a.dismiss().then(() => {});
          }
        });
      });
  }
  
  async dismissLoader() {
    this.isLoading = false;
    return await this.loadingController.dismiss();
  }

  // cssClass:'custom-loader-class',
  // backdropDismiss:true
  // spinner: "lines",
}
