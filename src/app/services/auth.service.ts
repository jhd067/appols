import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { RegistroModels } from '../models/registro.models';
import { LoginModels } from '../models/login.models';
import { map,delay } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute}from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  usuario = new RegistroModels;
private url = 'https://ols-sof.firebaseio.com'
userToken:string;
  constructor(private http: HttpClient,
    ) {
      this.leerToken();
    
   }
   
   
  login(usuario: LoginModels)
  {
    const authData ={
      ...usuario,
      //returnSecureToken:true
    };
   
        return this.http.get(`${ this.url }/usuarios${ usuario.password }.json`,
        
      ).pipe(
        map( resp=>{
          console.log('entro al map');
            this.guardarToken( resp['idToken']);
            return resp;
            
        })
      );
  }

  nuevousuario(usuario:RegistroModels)
  {
    
      return this.http.post(`${this.url}/usuarios.json`,usuario)
    
    .pipe(
      map((resp:any)=>{
        usuario.id = resp.name;
        usuario.password=resp.password;
        return usuario;
      })
    )
    }
      private guardarToken (idToken:string){
        //this.userToken = idToken;
        idToken=this.usuario.password
        localStorage.setItem('token',idToken)
      }
    
      leerToken(){
    
        if(localStorage.getItem('token')){
        this.userToken = localStorage.getItem('token');
        }else{
          this.userToken=''
        }
      }
    

  
  actualizarusuario(usuario:RegistroModels)
  {
    const usuarioTemp={
      ...usuario
    };
    delete usuarioTemp.id;
    return this.http.put(`${this.url}/usuarios/${usuario.id}.json`,usuarioTemp)

  }
  getusuario(id:string){
    return this.http.get(`${this.url}/usuarios/${id}.json`)
  }
  getUsuarios()
  {
    return this.http.get(`${this.url}/usuarios.json`)
    .pipe(
      map(this.creararreglo),
      delay(2000)
    );
  }
  
  borrarusuario(id:string)
  {
    return this.http.delete(`${this.url}/usuarios/${id}.json`)

  }
  private creararreglo(usuariosobj: object){
    const usuarios: RegistroModels[]=[];
    //console.log(heroesobj);
    Object.keys(usuariosobj).forEach( key =>{
      const usuario: RegistroModels= usuariosobj[key];
      usuario.id=key;
      usuarios.push(usuario);
    });
    return usuarios
    if (usuariosobj=== null) {return [];}
  }

 

  
}
