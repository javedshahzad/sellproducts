import { Component } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { ApiserviceService } from './services/apiservice.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  islogin:boolean=false;
  public appPages = [
    { title: 'Inbox', url: '/folder/Inbox', icon: 'mail' },
    { title: 'Outbox', url: '/folder/Outbox', icon: 'paper-plane' },
    { title: 'Favorites', url: '/folder/Favorites', icon: 'heart' },
    { title: 'Archived', url: '/folder/Archived', icon: 'archive' },
    { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
    { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(
    private menu : MenuController,
    private nav : NavController,
    private api : ApiserviceService
    ) {
      this.api.configApp();
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
    this.nav.navigateForward("loginvia");
    this.menu.close();
    // this.api.isupdateLogin.next(true);
  }

}
