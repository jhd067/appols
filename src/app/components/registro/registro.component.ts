import { Component, OnInit } from '@angular/core';
import { RegistroModels } from '../../models/registro.models';
import { NgForm } from '@angular/forms';
//import { map,delay } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { from, Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { ActivatedRoute}from '@angular/router';



@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  //cargando= false ;
 
  regusuario= new RegistroModels();
  
  constructor(private auth: AuthService, private route: ActivatedRoute) { }   
    ngOnInit(){
      const id = this.route.snapshot.paramMap.get('id');
      if(id !=='nuevo'){
        this.auth.getusuario(id)
        .subscribe((resp:RegistroModels)=> {
         console.log(resp);    
         this.regusuario=resp;
         this.regusuario.id= id;
  
          
        })
      }
    }
  
  guardar(form:NgForm)
{

  if(form.invalid) { return }
  console.log("formulario enviado")
  console.log(this.regusuario);
  



Swal.fire({
  title: 'Espere',
  text: 'Guardando informacion',
  icon: 'info',
  confirmButtonText: 'Cool'
 });
 Swal.showLoading();
 let peticion: Observable<any>;
 if(this.regusuario.id){
 
  peticion= this.auth.actualizarusuario(this.regusuario)
         }
else{ 
peticion= this.auth.nuevousuario(this.regusuario)      
}
peticion.subscribe(resp =>{
Swal.fire({
  title: this.regusuario.nombre,
  text: 'se actualizo correctmente',
  icon: 'success',
 // confirmButtonText: 'Cool'
 });

})

}

}

