import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { UserService } from './../../shared/services/user.service';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-sing-in',
  templateUrl: './sing-in.component.html',
  styleUrls: ['./sing-in.component.scss']
})
export class SingInComponent implements OnInit 
{
  /** Referente ao formulário de cadastro */
  form: FormGroup;
  /** Informa o erro ao tentar submeter o cadastro */
  error: string = '';
  /** Mostrar ou não mensagem de erro */
  hasError: boolean;
  /** Valor do checkbox de lembrar do usuário */
  ckbValue: boolean;

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _router: Router
  ) { }

  ngOnInit() 
  {
    this.form = this._fb.group({
      email: [ '', [ Validators.required, Validators.email ] ],
      pass: [ '', Validators.required ]
    });
  }

  onSubmit() 
  {
    if (this.form.valid) {
      let email = this.form.get('email').value,
          pass = this.form.get('pass').value;
      
        let user = {
          email: email,
          password: pass
        }

        this._authService.login(user)
        .then(res => {
          let user = res.json();
          localStorage.setItem('token', user.token);
          localStorage.setItem('data', btoa(user.user.name));
          this._router.navigate(['/user']);
        })
        .catch(err => {
          this.showError("O e-mail e/ou senha inválidos.");
        });
    } else {
      this.showError("Por favor, preencha todos os campos corretamente.");
    }
  }

  /** Mostra ou esconde o label de erro */
  showError(err) 
  {
    this.hasError = !this.hasError;
    this.error = err;
    setTimeout(() =>  this.hasError = !this.hasError, 2000);
  }
}
