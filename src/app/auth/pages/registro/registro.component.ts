import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailValidatorService } from 'src/app/shared/validator/email-validator.service';

import { ValidatorService } from 'src/app/shared/validator/validator.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html'
})
export class RegistroComponent implements OnInit {


  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.pattern( this.validatorServices.nombreApellidoPattern )] ],
    email: ['', [Validators.required, Validators.pattern( this.validatorServices.emailPattern) ], [ this.emailValidator ] ],
    username: ['', [Validators.required, this.validatorServices.noPuedeSerStrider ] ],
    password: ['', [Validators.required, Validators.minLength(6) ] ],
    password2: ['', [Validators.required ] ], 
  },{
    validators: [ this.validatorServices.camposIguales('password','password2')]
  });


  get emailErrorMsg(): string {

      const errors = this.miFormulario.get('email')?.errors;
      if( errors?.['required']){
        return 'Email es obligatorio';
      } else if ( errors?.['pattern']){
        return 'Email no cumple con el formato';
      } else if ( errors?.['emailTomado']){
        return 'El email ya existe';
      }
      return '';
  }
  
  constructor(private fb: FormBuilder,
              private validatorServices: ValidatorService,
              private emailValidator: EmailValidatorService) { }

  ngOnInit(): void {

    this.miFormulario.reset({
      nombre: 'Maria Rodriguez',
      email: 'test1@test.com',
      username: 'Mariale_ro',
      password: '1234567',
      password2: '1234567',

    })
  }

  campoNoValido( campo: string ){
    return this.miFormulario.get(campo)?.invalid
            && this.miFormulario.get(campo)?.touched;
  }

  // emailRequired(){
  //   return this.miFormulario.get('email')?.errors?.['required']
  //         && this.miFormulario.get('email')?.touched;
  // }

  // emailFormato(){
  //   return this.miFormulario.get('email')?.errors?.['pattern']
  //         && this.miFormulario.get('email')?.touched;
  // }

  // emailTomado(){
  //   return this.miFormulario.get('email')?.errors?.['emailTomado']
  //         && this.miFormulario.get('email')?.touched;
  // }


  submitFormulario(){
    console.log(this.miFormulario.value);
    this.miFormulario.markAllAsTouched();
  }

}
