import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Cursos } from 'src/app/interfaces/cursos';
import { CursosService } from 'src/app/services/cursos.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  cursos: Cursos[] = [];

  colunas: string[] = ['idCurso', 'curso', 'categoria', 'descricao',  'dataAbertura', 'dataFechamento', 'qtdAluno', 'acoes'];
  dataSource = new MatTableDataSource<Cursos>(this.cursos);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private router : Router,
    private cursosService: CursosService,
  ) { }
 
  ngOnInit(): void {
    this.buscaTodosCursos();
  }

  public buscaTodosCursos(): void {
    this.cursosService.buscarTodosCursos().subscribe((resp => {
      this.cursos = resp;
      console.log(this.cursos);
      this.dataSource = new MatTableDataSource<Cursos>(this.cursos);
      this.dataSource.paginator = this.paginator;
    }))
  }

  public adicionarNovoCurso(): void {
    this.router.navigate(['create-cursos'])
  }
}