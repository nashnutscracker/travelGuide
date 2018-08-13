import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MultiuseService } from '../multiuse.service';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  email: any;
  form: FormGroup;
  constructor(private formBuilder: FormBuilder, private multi: MultiuseService, private router: Router) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: [null, Validators.required],
      email: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  enter1(name, email, password) {
    this.multi.getData(email).subscribe(res => {
      this.email = res
      // console.log(JSON.stringify(this.itemname.mes))
      if (this.email.mes == "User exists") {
        // console.log(this.itemname.mes)
        alert("User already exists");
        this.router.navigate(["registration"]);
        this.form.reset();
      }
      else {
        this.multi.addUser(name, email, password);
        alert("User added successfully!");
        this.router.navigate(["login"]);
      }
    });
  }
}
