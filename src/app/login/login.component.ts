import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MultiuseService } from '../multiuse.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: any;
  form: FormGroup;
  constructor(private formBuilder: FormBuilder, private multi: MultiuseService, private router: Router) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  login1(email, password) {
    this.multi.getData(email).subscribe(res => {
      this.email = res
      // console.log(JSON.stringify(this.itemname.mes))
      if (this.email.mes == "User doesn't exist") {
        // console.log(this.itemname.mes)
        alert("User not registered");
        this.router.navigate(["registration"]);
        this.form.reset();
      }
      else {
        alert("User logged in successfully!");
        this.router.navigate(["explore"]);
      }
    });
  }

}
