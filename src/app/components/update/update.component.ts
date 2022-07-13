import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Categorias } from 'src/app/interfaces/categorias';
import { Cursos } from 'src/app/interfaces/cursos';
import { CursosService } from 'src/app/services/cursos.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  categorias: Categorias[] = [
    { id: 1, nome: "Multiplataforma" },
    { id: 2, nome: "Banco de dados" },
    { id: 3, nome: "Metodologia" },
    { id: 4, nome: "Comportamento" },
    { id: 5, nome: "Comunicação" },
  ]


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
  formUpdate!: FormGroup;
  constructor(
    private router: Router,
    private cursosService: CursosService,
    private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.id_curso = this.route.snapshot.paramMap.get('id')!;
    // this.findById();
    this.formUpdate = new FormGroup({
      idCurso : new FormControl('', [Validators.minLength(1), Validators.required]),
      categoria : new FormControl('', [Validators.minLength(1), Validators.required]),
      dataAbertura : new FormControl('', [Validators.minLength(10), Validators.required]),
      dataFechamento : new FormControl('', [Validators.minLength(10), Validators.required]),
      descricao : new FormControl('', [Validators.minLength(1), Validators.required]),
      qtdAluno : new FormControl('', [Validators.minLength(500), Validators.required])
    });

    this.buscaCurso();


  }


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

  update(): void {
    this.cursosService.update(this.curso)
      .subscribe({
        next: () => {
          alert("Curso editado com sucesso!")
          this.router.navigate(['/']);


        }, error: (error: any) => {

        }
      })
  }

  // update(): void {
  //   this.cursosService.update(this.id_curso).subscribe(resp => {
  //     this.router.navigate(['/']);
  //     this.cursosService.message('Curso editado com sucesso!');
  //     console.log("entrou")
  //   }, err => {
  //     console.log(err)
  //   })
  // }


  // update(): void {

  //   this.service.update(this.curso).subscribe((resp) => {

  //     this.router.navigate(['cursos'])
  //     this.service.message('Curso atualizado com sucesso!')

  //   }, err => {
  //     if (err.error.error.match('já cadastrado')) {
  //       console.log('Log', err.error.error);
  //       this.service.message(err.error.error);
  //     } else if (err.error.errors[0].message === "número do registro de contribuinte individual brasileiro (CPF) inválido"){
  //       this.service.message(err.error.errors[0].message);
  //     }
  //   })
  // }

  // findById(): void {
  //   this.service.findById(this.id_curso).subscribe(resp => {
  //     this.curso = resp;
  //   })
  // }

  cancel(): void {
    this.router.navigate(['cursos'])
  }

  errorValidIdCurso() {
    if (this.formUpdate.get('idCurso')!.invalid) {
      return 'O campo deve ter no minimo 5 letras e não é permitido caracteres especiais'
    }
    return false;
  }
  errorValidCategoria() {

    if (this.formUpdate.get('categoria')!.invalid) {
      console.log("errossss")
      return 'O campo deve ser selecionado'
    }
    return false;
  }

  errorValidDescricao() {
    if (this.formUpdate.get('descricao')!.invalid) {
      return 'O campo deve ter  número no mínimo'
    }
    return false;
  }

  errorValidDataAbertura() {
    if (this.formUpdate.get('dataAbertura')!.invalid) {
      return 'O campo deve ter entre 10 a 11 números'
    }
    return false;
  }
  errorValidDataFechamento() {
    if (this.formUpdate.get('dataFechamento')!.invalid) {
      return 'O campo deve ter entre 10 a 11 números'
    }
    return false;
  }
  errorValidQtdAluno() {
    if (this.formUpdate.get('qtdAluno')!.invalid) {
      return 'O campo deve ter entre 10 a 11 números'
    }
    return false;
  }

  navigateToCreate(): void {
    this.router.navigate(['cursos/create'])
  }
}
