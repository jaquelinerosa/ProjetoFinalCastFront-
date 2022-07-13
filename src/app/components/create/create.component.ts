import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Categorias } from 'src/app/interfaces/categorias';
import { Cursos } from 'src/app/interfaces/cursos';
import { CursosService } from 'src/app/services/cursos.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})

export class CreateComponent implements OnInit {

  categorias: Categorias[] = [
    {categoria: {id: 1, nome: "Multiplataforma"}},
    {categoria: {id: 2, nome: "Banco de dados"}},
    {categoria: {id: 3, nome: "Metodologia"}},
    {categoria: {id: 4, nome: "Comportamento"}},
    {categoria: {id: 5, nome: "Comunicação"}},
  ]

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

  categoria = new FormControl('',[Validators.minLength(1), Validators.required]);
  dataAbertura = new FormControl('',[Validators.minLength(10), Validators.required])
  dataFechamento = new FormControl('',[Validators.minLength(10), Validators.required])
  descricao = new FormControl('',[Validators.minLength(5), Validators.required])
  qtdAluno = new FormControl('', [Validators.minLength(500),Validators.required])

  constructor(
    private router : Router,
    private cursosService: CursosService,
  ) { }

  ngOnInit(): void {
  }

  exit():void {
    this.router.navigate(['/']);
  }

  create():void {

    const ajusteDataAbertura = String(this.curso.dataAbertura); 
    const ajusteDataFechamento = String(this.curso.dataFechamento); 

    this.curso.dataAbertura = ajusteDataAbertura;
    this.curso.dataFechamento = ajusteDataFechamento;
  
    this.cursosService.adicionarCurso(this.curso).subscribe((resp) => {
      this.cursosService.alert("Curso gravados com sucesso!");
      this.router.navigate(['/']);
    },err => {
      this.cursosService.alert(err.error);
    })
  }

  validDescricao() {
    if (this.descricao.invalid) {
      return "Campo obrigatório e não é permitido números e nem caracteres especiais";
    } 
    return false;
  }

  validDataAbertura() {
    if (this.dataAbertura.invalid) {
      return "Campo obrigatório";
    } 
    return false;
  }

  validDataFechamento() {
    if (this.dataFechamento.invalid) {
      return "Campo obrigatório";
    } 
    return false;
  }

  validQtdAluno() {
    if (this.qtdAluno.invalid) {
      return "Campo obrigatório e não é permitido texto e caracteres especiais";
    } 
    return false;
  }

}
