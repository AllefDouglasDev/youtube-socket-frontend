import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from './../../shared/services/user.service';

@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.scss']
})
export class SingUpComponent implements OnInit 
{
  /** Referente ao formulário de cadastro */
  form: FormGroup;
  /** Informa o erro ao tentar submeter o cadastro */
  error: string = '';
  /** Mostrar ou não mensagem de erro */
  hasError: boolean;

  constructor(
    private _fb: FormBuilder,
    private _userService: UserService,
    private _router: Router
  ) { }

  ngOnInit() 
  {
    this.form = this._fb.group({
      name: [ '', Validators.required ],
      email: [ '', [ Validators.required, Validators.email ] ],
      pass: [ '', Validators.required ],
      repPass: [ '', Validators.required ],
    });
  }

  onSubmit() 
  {
    if (this.form.valid) {
      let name = this.form.get('name').value,
          email = this.form.get('email').value,
          pass = this.form.get('pass').value,
          repPass = this.form.get('repPass').value;
      
      if (pass === repPass) {
        let user = {
          name: name,
          email: email,
          password: pass
        }

        this._userService.createUser(user)
        .then(res => this._router.navigate(['/login/singin']))
        .catch(err => {
          this.showError("O e-mail escolhido já existe.");
        });
      } else {
        this.showError("Senhas não correspondem");
      }
    } else {
      this.showError("Por favor, preencha todos os campos");
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
