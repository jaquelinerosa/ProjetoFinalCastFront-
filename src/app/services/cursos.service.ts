import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Cursos } from '../interfaces/cursos';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  api: String = environment.api;

  constructor(
    private http : HttpClient,
    private snack : MatSnackBar
  ) { }

  buscarTodosCursos():Observable<Cursos[]> {
    const url = this.api + "/cursos";
    return this.http.get<Cursos[]>(url);
  }

  adicionarCurso(curso: Cursos): Observable<Cursos> {
    const url = this.api + "/cursos";
    return this.http.post<Cursos>(url, curso);
  }

  alert(mensagem : string): void {
    this.snack.open(mensagem, 'ok', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 6000
    })
  }

}
