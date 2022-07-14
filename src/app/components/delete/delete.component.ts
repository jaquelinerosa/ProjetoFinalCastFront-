import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Cursos } from 'src/app/interfaces/cursos';
import { CursosService } from 'src/app/services/cursos.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  id_curso = ''

  curso: Cursos = {
    categoria: {
      id: undefined,
      nome: '',
    },
    idCurso: undefined,
    descricao: '',
    dataAbertura: '',
    dataFechamento: '',
    qtdAluno: undefined,
  }

  snack: any;

  constructor(
    private router: Router,
    private cursosService: CursosService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id_curso = this.route.snapshot.paramMap.get('id')!
    this.buscaCurso();
  }

  // findById(): void {
  //   this.cursosService.findById(this.id_curso).subscribe(resp => {
  //     this.curso = resp;
  //     console.log(resp)
  //   })
  // }

  public buscaCurso(): void {
    this.cursosService.buscarTodosCursos().subscribe((resp => {
      console.log("resp", resp);
      for (let i = 0; i < resp.length; i++) {
        if (resp[i].idCurso == Number(this.id_curso)) {
          this.curso = resp[i];
          console.log("this.curso", this.curso)
        }
      }
    }
    ))
  }

  delete(): void {
    this.cursosService.delete(this.id_curso)
      .subscribe({
        next: resp => {
          alert("Curso deletado com sucesso!")
          this.router.navigate(['/']);


        }, error: error => {
          alert("Não deve permitir a exclusão de cursos já realizados!")
        }
      })
  }

  message(msg: string): void {
    this.snack.open(msg, 'ok', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 6000
    })
  }

  exit(): void {
    this.router.navigate(['/']);
  }
}
