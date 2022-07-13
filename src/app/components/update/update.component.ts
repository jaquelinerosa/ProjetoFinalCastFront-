import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cursos } from 'src/app/interfaces/cursos';
import { CursosService } from 'src/app/services/cursos.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

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
  idCurso: any;
  categoria: any;
  descricao: any;
  dataAbertura: any;
  dataFechamento: any;
  qtdAluno: any;


  constructor(
    private router: Router,
    private service: CursosService,
    private route: ActivatedRoute) { }
   

  ngOnInit(): void {
    this.id_curso = this.route.snapshot.paramMap.get('id')!
    // this.findById();
  }
  
  update(): void {

    this.service.update(this.curso).subscribe((resp) => {

      this.router.navigate(['cursos'])
      this.service.message('Curso atualizado com sucesso!')

    }, err => {
      if (err.error.error.match('já cadastrado')) {
        console.log('Log', err.error.error);
        this.service.message(err.error.error);
      } else if (err.error.errors[0].message === "número do registro de contribuinte individual brasileiro (CPF) inválido"){
        this.service.message(err.error.errors[0].message);
      }
    })
  }

  // findById(): void {
  //   this.service.findById(this.id_curso).subscribe(resp => {
  //     this.curso = resp;
  //   })
  // }

  cancel(): void {
    this.router.navigate(['cursos'])
  }

  errorValidIdCurso() {
    if (this.idCurso.invalid) {
      return 'O campo deve ter no minimo 5 letras e não é permitido caracteres especiais'
    }
    return false;
  }
  errorValidCategoria() {
    if (this.categoria.invalid) {
      return 'O campo deve ser selecionado'
    }
    return false;
  }

  errorValidDescricao() {
    if (this.descricao.invalid) {
      return 'O campo deve ter 8 números'
    }
    return false;
  }

  errorValidDataAbertura() {
    if (this.dataAbertura.invalid) {
      return 'O campo deve ter entre 10 a 11 números'
    }
    return false;
  }
  errorValidDataFechamento() {
    if (this.dataFechamento.invalid) {
      return 'O campo deve ter entre 10 a 11 números'
    }
    return false;
  }
  errorValidQtdAluno() {
    if (this.qtdAluno.invalid) {
      return 'O campo deve ter entre 10 a 11 números'
    }
    return false;
  }

  navigateToCreate():void{
    this.router.navigate(['cursos/create'])
  }
}
