import { Component, OnInit } from '@angular/core';

import { Storage } from "@ionic/storage";
import { NavController } from "@ionic/angular";
import { GlobalService } from '../global.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  constructor(
    private storage: Storage,
    public navCtrl: NavController,
    public globalService : GlobalService
  ) {
   }

   token: any = null;
   myOrder:any = null;

  ngOnInit() {
    this.getDataUser();
  }
  async getDataUser(){
    await this.storage.get("userInfo").then(val => {
     //console.log(val.token);
      if (val.token != null) {
       this.token = val.token;
       this.loadData();
      } else {
        this.navCtrl.navigateRoot(["home"]);
      }
    });
  }

  loadData(){
    this.globalService.getOrder(this.token).subscribe( (res: any) => {
      console.log(res);
      this.myOrder = res;
      },
      (error: any) => {
        console.log('Network Issue.');
        // this.toastService.presentToast('Network Issue.');
      }
    );
  }

  logOut() {
    this.storage.clear();
    this.navCtrl.navigateRoot("home");
  }
}
