import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app'; import 'firebase/auth';
import { UsuarioInfo } from '../interfaces/usuarios-info';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _database: AngularFirestore, private _databaseAuth: AngularFireAuth, private router: Router) { }

  async createUser(form: UsuarioInfo): Promise<void> {
    const {usuario_email: correo, usuario_password: password } = form;
    try {
      const user_auth = await this._databaseAuth.createUserWithEmailAndPassword(correo, password);
      return await this._database.collection('usuarios').doc(user_auth.user.uid).set(form);
    } catch (error) {
      return error.message;
    }
  }

  async singIn(form: {email: string, password: string}){
    return await this._databaseAuth.signInWithEmailAndPassword(form.email, form.password);
  }

  async singInWithGoogle(){
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      return await this._databaseAuth.signInWithPopup(provider);
    } catch (error) {
      return error;
    }
  }





  /* async pruebaGoogle(): Promise<firebase.auth.UserCredential>{
    try {
      // Login Web
      const provider = new firebase.auth.GoogleAuthProvider();
      return await this._databaseAuth.signInWithPopup(provider);    
    } catch (error) {
      return error;
    }
  } */

  getUserAuth(){
    return this._databaseAuth.authState;
  }

  userExist(uid: string) {

    /* this._database.collection('usuarios', ref => ref.where('apellido', '==', 'Aguirre')).get().subscribe( res => {
      res.forEach(doc => {
        console.log(doc.data());
      })
    }) */
    return this._database.collection('usuarios').doc(uid).get()
  }

  async LogOut(){
    await this._databaseAuth.signOut();
    this.router.navigate(['/login']);
  }
  







}
