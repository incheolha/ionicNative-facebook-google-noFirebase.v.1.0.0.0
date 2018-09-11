import { GooglePlus } from '@ionic-native/google-plus';
import { Facebook } from '@ionic-native/facebook';
import { Injectable } from '@angular/core';


@Injectable()
export class SocialLoginProvider {

  googleAppConfig = {
                      'scopes': 'https://www.googleapis.com/auth/contacts https://www.googleapis.com/auth/contacts.readonly',
                      'webClientId': '873649994863-q61cao1fq33bilc63gkk5cvnicjeohm2.apps.googleusercontent.com',
                      'offline': true
  }

  userData1 = null;
  constructor(private facebook: Facebook, private googlePlus: GooglePlus) { }

  facebookLogin() {
    return this.facebook.login(['email', 'public_profile', 'user_photos']);
  }

  facebookGetLoginStatus() {
    return this.facebook.getLoginStatus();
  }

  facebookLogout() {
    return this.facebook.logout();
  }

  facebookShareStatus() {
              let options = {
                method: 'share',
                href: 'http://www.techsavvym.com',
                caption: 'My Company is',
                description: 'my company',
                hashTag: '#tsm'
              }
        return this.facebook.showDialog(options);
  }

  facebookGetUserProfile() {

    return this.facebook.api('me?fields=id,name,email,picture.width(720).height(720).as(picture_large)', []);
  }

  googleLogin() {

    return this.googlePlus.login(this.googleAppConfig);
  }

  googleSlientLogin() {
    this.googlePlus.trySilentLogin(this.googleAppConfig).then( data => {
      console.log( data.idToken );
    })
  }
  googleLogout() {
    return this.googlePlus.logout();
  }

  setUser(data) {
    this.userData1 = data;
  }

}
