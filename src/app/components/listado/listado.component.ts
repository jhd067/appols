
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { RegistroModels } from '../../models/registro.models';
import { NgForm } from '@angular/forms';
import { map,delay } from 'rxjs/operators';
import { from, Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {
  usuarios: RegistroModels [] = [];
  cargando= false ;
  constructor(private auth:AuthService) { }

  ngOnInit(): void {
    this.cargando=true;  

    this.auth.getUsuarios()
    .subscribe (resp =>{this.usuarios=resp
                this.cargando = false;
    })
  }
  borrarusuario(usuario:RegistroModels,i:number){
    Swal.fire({
      text: `Estas seguro que deseas borrar? ${usuario.nombre}`,
        icon: 'question',
        showConfirmButton: true,
        showCancelButton: true,
             
        
     }).then( resp=>{
       if(resp.value){
        this.usuarios.splice(i,1);
        this.auth.borrarusuario(usuario.id).subscribe();
       }
     
     })
   
  }

}