import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Cursos } from '../interfaces/cursos';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  api: String = environment.api;

  constructor(
    private http : HttpClient
  ) { }

  buscarTodosCursos():Observable<Cursos[]> {
    const url = this.api + "/cursos";
    return this.http.get<Cursos[]>(url);
  }

}
