import { SocialLoginProvider } from './../../providers/socialLogin-service/login-service';
import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { LoginPage } from './../login/login';
import { UserData } from './../../providers/userData.model';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  currentUserData: UserData;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private socialLoginProvider: SocialLoginProvider) { }


  ngOnInit() {

    this.currentUserData = this.navParams.data.userData;
            console.log(this.currentUserData);
            console.log( this.currentUserData.loginType);
            console.log( this.currentUserData.uid);
            console.log( this.currentUserData.userName);
            console.log( this.currentUserData.userEmail);
            console.log( this.currentUserData.userPhotoUrl);
  }


  logOut() {

    if (this.currentUserData.loginType === 'facebook') {
      this.socialLoginProvider.facebookLogout().then( () => {
        this.navCtrl.setRoot(LoginPage);
      })
    } else if (this.currentUserData.loginType === 'google') {
      this.socialLoginProvider.googleLogout().then( () => {
        this.navCtrl.setRoot(LoginPage);
      })
    }
  }
}
