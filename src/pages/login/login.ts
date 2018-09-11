import { HomePage } from './../home/home';
import { SocialLoginProvider } from './../../providers/socialLogin-service/login-service';
import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { UserData } from '../../providers/userData.model';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  userData: UserData;
  nodeServerLogin = 'node';
  facebookLogin = 'facebook';
  googleLogin = 'google'

  curentData = null;

  constructor(public navCtrl: NavController,
              private sociaLoginProvider: SocialLoginProvider) {
  }

  loginWithFb() {
    this.sociaLoginProvider.facebookGetLoginStatus()
    .then( data => {
              if (data.status === 'connected') {
                console.log( 'It is already logged in', data );

                this.getsocialUserProfile();

              } else {
                console.log( 'it is not logged in ');
                this.sociaLoginProvider.facebookLogin()
                    .then( data => {
                      this.getsocialUserProfile();
                    })
                    .catch( err  => console.log( err ));
              }
    }).catch( error => console.log( error ));
  }

  getsocialUserProfile() {

    this.sociaLoginProvider.facebookGetUserProfile()
    .then( profile => {

          console.log(profile['id']);
          console.log(profile['name']);
          console.log(profile['email']);
          console.log(profile['picture_large']['data']['url']);

          this.userData = new UserData(profile['id'],
                                       profile['name'],
                                       profile['email'],
                                       profile['picture_large']['data']['url'],
                                       this.facebookLogin);

          this.navCtrl.setRoot(HomePage, {userData: this.userData});
      })
    .catch( e => console.log( e ));
  }


  loginWithGoogle() {

    this.sociaLoginProvider.googleLogin().then((result) => {
            console.log('result', JSON.stringify(result));
            console.log( result.accessToken);
            console.log( result.email);
            console.log( result.displayName);
            console.log( result.userId);
            console.log( result.givenName);
            console.log( result.imageUrl);

            this.userData = new UserData(result.userId,
                                         result.displayName,
                                         result.email,
                                         result.imageUrl,
                                         this.googleLogin);

            this.navCtrl.setRoot(HomePage, {userData: this.userData});

    }).catch((err) => {
            console.log( err );
    });


  }

}
