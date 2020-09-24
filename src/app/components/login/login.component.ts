import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginModels } from '../../models/login.models';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  logusuario:LoginModels;

  constructor(private auth:AuthService) { 
  }

  ngOnInit(): void {
    this.logusuario = new LoginModels();

}
onSubmit(form:NgForm)
{
  if(form.invalid) { return }
  //console.log("formulario enviado")
//  console.log(this.logusuario)
 // console.log(form);
  this.auth.login(this.logusuario)
     .subscribe (resp=>{
       console.log(resp);
       console.log('listo');
      
      
     },(err) => {
      console.log(err.error.error.message)
    })

}
  }