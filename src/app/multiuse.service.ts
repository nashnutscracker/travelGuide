import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { error } from '@angular/compiler/src/util';
import { URLSearchParams } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class MultiuseService {

  constructor(private http: Http) { }

  getPune() {
    return this.http
      .get('http://localhost:3000/showPune')
      .pipe(map((response: Response) => response.json()));
  }

  getMumbai() {
    return this.http
      .get('http://localhost:3000/showMumbai')
      .pipe(map((response: Response) => response.json()));
  }

  addUser(name, email, password) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded')

    let body = new URLSearchParams();
    body.append('name', name);
    body.append('email', email);
    body.append('password', password);
    // console.log(body);
    return this.http.post('http://localhost:3000/addUser', body).subscribe(
      data => {
      },
      error => {
        console.log(JSON.stringify(error.json()));
      }
    )
  }

  editUser(email, password) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded')

    let body = new URLSearchParams();
    body.append('email', email);
    // let body2 = new URLSearchParams();
    body.append('password', password);
    // console.log(body);
    return this.http.post('http://localhost:3000/editUser', body).subscribe(
      data => {
      },
      error => {
        console.log(JSON.stringify(error.json()));
      }
    )
  }

  getData(email) {
    return this.http.get(`${'http://localhost:3000/getData'}/${email}`)
      .pipe(map((response) => response.json()));
  }
}


