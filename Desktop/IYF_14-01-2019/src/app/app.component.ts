import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = '';

  pages: Array<{title: string, component: any, icon: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Search', component: 'HomePage', icon: './assets/imgs/Search.png' },
      { title: 'Events', component: 'HomePage', icon: './assets/imgs/Events.png'  },
      { title: 'My Reminder', component: 'MyReminderPage', icon: './assets/imgs/My Reminder.png'  },
      // { title: 'Schedule', component: 'ShedulePage', icon: './assets/imgs/Schedule.png'  },
      // { title: 'Traveler Information', component: 'ListPage', icon: './assets/imgs/Traveler Information.png'  },
      { title: 'Appoinment', component: 'HomePage', icon: './assets/imgs/Appointment.png'  },
      { title: 'Settings', component: 'HomePage', icon: './assets/imgs/Settings.png'  },
      { title: 'About Us', component: 'AboutUsPage', icon: './assets/imgs/About us.png'  },
      { title: 'Contact Us', component: 'ContactUsPage', icon: './assets/imgs/About us.png'  },
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      if (localStorage.getItem('token')) {
        this.rootPage = 'HomePage';
      } else {
        this.rootPage = 'LoginPage'
      }
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

  doLogout() {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('token');
    this.nav.setRoot('LoginPage');
  }
}
