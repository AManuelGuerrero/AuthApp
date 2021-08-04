import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthResponse, Usuario } from '../interfaces/interfaces';
import { catchError, map, tap } from 'rxjs/operators';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private basUrl: string = environment.baseUrl;
  private  _usuario: Usuario = null!;

  get usuario(){
    return {...this._usuario};
  }

  constructor(
    private http: HttpClient
  ) { }

  login(email: string, password:string):Observable<boolean|string>{

    const url = `${this.basUrl}/auth`;
    const body = {email,password};
    return this.http.post<AuthResponse>(url,body)
      .pipe(
        tap(resp=>{
          if(resp.ok){
            localStorage.setItem('token',resp.token!);
          }
        }),
        map(value => value.ok),
        catchError(err=>of(err.error.msg))
      );

  }


  registro(name: string, email: string, password: string):Observable<boolean|string>{
    const url = `${this.basUrl}/auth/new`;
    const body = {name,email,password};
    return this.http.post<AuthResponse>(url,body).pipe(
      tap(resp=>{
        if(resp.ok){
          localStorage.setItem('token',resp.token!);
          
        }
      }),
      map(value => value.ok),
      catchError(err=>of(err.error.msg))
    );
  }

  validarRoken():Observable<boolean>{
    const url = `${this.basUrl}/auth/renew`;
    const headers = new HttpHeaders()
      .set('x-token',localStorage.getItem('token') || '');
    return this.http.get<AuthResponse>(url,{headers})
      .pipe(
        map(resp => {
          localStorage.setItem('token',resp.token!);
            const {uid, name, email} = resp;
            this._usuario = {
              uid: uid!,
              name: name!,
              email: email!
            }
          return resp.ok
        }),
        catchError(err => of(false))
      );
  }

  logout(){
    localStorage.removeItem('token');
  }
}
