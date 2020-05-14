import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  public user = {
    email: '',
    name: '',
    uid: ''
  }

  constructor(private _auth: AuthService, private router: Router) { }

  ngOnInit() {
    this._auth.getUserAuth().subscribe(user => {
      this.user = {
        email: user.email,
        name: user.displayName,
        uid: user.uid
      }
    });
  }

  logout(){
    this._auth.LogOut();
  }

  changeName(){
    this._auth.getUserAuth().subscribe( user => {
      user.updateProfile({
        displayName: 'Mario Lopez Casas'
      }).then( function () {
        return user.displayName;
      }).then( nombre => {
        this.user.name = nombre;
      })
    });
  }

}
