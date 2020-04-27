import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _database: AngularFirestore, private _databaseAuth: AngularFireAuth) { }

  async createUser(form) {
    const {correo, contrasena} = form;
    delete form.correo;
    delete form.contrasena;
    try {
      const user_auth = await this._databaseAuth.createUserWithEmailAndPassword(correo, contrasena);
      await this._database.collection('usuarios').doc(user_auth.user.uid).set(form);
      return true;
    } catch (error) {
      return error;
    }
  }
}
