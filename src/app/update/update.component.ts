import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MultiuseService } from '../multiuse.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  form: FormGroup;
  email: any;

  constructor(private formBuilder: FormBuilder, private multi: MultiuseService, private router: Router) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: [null, Validators.required],
      oldpassword: [null, Validators.required],
      newpassword: [null, Validators.required],
    });
  }
  
  edit1(email, password) {
    this.multi.getData(email).subscribe(res => {
      this.email = res
      // console.log(JSON.stringify(this.itemname.mes))
      if (this.email.mes == "User doesn't exist") {
        // console.log(this.itemname.mes)
        alert("No user found to edit");
        this.router.navigate(["update"]);
        this.form.reset();
      }
      else {
        this.multi.editUser(email, password);
        alert("User edited successfully!");
        this.router.navigate(["explore"]);
      }
    });
  }
}
