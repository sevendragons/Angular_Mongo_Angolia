import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { RestApiService } from '../rest-api.service';
import { DataService } from '../data.service';



@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  name = '';
  email = '';
  password = '';
  password1 = '';
  isSeller = false;
  btnDisabled = false;

  constructor(private router: Router, private data: DataService, private rest: RestApiService) {}

  ngOnInit() {
  }

  validate() {
    if (this.name) {
      if (this.email) {
        if (this.password) {
          if (this.password1) {
            if (this.password === this.password1) {
              return true;
            } else {
              this.data.error('Password do not match.');
            }
          } else {
            this.data.error('Confirmation Password id not entered');
          }
        } else {
          this.data.error('Password is not entered');
        }
      } else {
        this.data.error('Email is not entered');
      }
    } else {
      this.data.error('Name is not entered');
    }
  }

  async register() {
    this.btnDisabled = true;
    try {
      if ( this.validate() ) {
        const data = await this.rest.post(
          'http://localhost:3030/api/account/signup',
          {
            name: this.name,
            email: this.email,
            password: this.password,
            isSeller: this.isSeller
          }
        );
        if (data['success']) {
          localStorage.setItem('token', data['token']);
          this.data.success('Registration Successful \u{1F603}');
          await this.data.getProfile();

          this.router.navigate(['profile/address'])
            .then(() => {
             this.data.success(
               'Registration Successful! Please enter your shipping below.'
             );
            }).catch( error => this.data.error(error));
        } else {
          this.data.error(data['message']);
        }
      }
    } catch (error) {
      this.data.error(error['message']);
    }
    this.btnDisabled = false;
  }



}
