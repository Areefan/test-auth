import { Component } from '@angular/core';

import { Storage } from "@ionic/storage";
import { NavController } from "@ionic/angular";
import { GlobalService } from '../global.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  postData = {
    email: "",
    password: "",
  };

  constructor(
    private storage: Storage,
    public navCtrl: NavController,
    public globalService : GlobalService
  ) {
    this.getDataUser();
  }
  validateInputs() {
    let username = this.postData.email.trim();
    let password = this.postData.password.trim();

    return (
      this.postData.email &&
      this.postData.password &&
      username.length > 0 &&
      password.length > 0
    );
  }

  async loginAction() {
    if (this.validateInputs()) {

      this.globalService.login(this.postData).subscribe(
        (res: any) => {
          // console.log(res.original.token);
          if (res.original.token) {
            // Storing the User data.
            this.storage.set("userInfo", res.original);
            this.storage.set("userData", this.postData);
            this.navCtrl.navigateRoot(["dashboard"]);
          } else {
            console.log("Incorrect username and password.");
          }
        },
        (error: any) => {
          console.log(error.message);
        }
      );
    } else {
      console.log("Please enter username or password.");
    }
  }

  async getDataUser() {
    await this.storage.get("userData").then((val) => {
      //console.log(val);
      if (val != null) {
        this.postData = val;
        this.loginAction();
      }
    });
  }
}
