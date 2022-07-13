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

  formUpdate!: FormGroup;
  constructor(
    private router: Router,
    private cursosService: CursosService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    let idCurso = this.route.snapshot.paramMap.get('id')!;
    // this.findById();
    this.formUpdate = new FormGroup({
      idCurso: new FormControl('', [Validators.minLength(1), Validators.required]),
      categoria: new FormControl('', [Validators.minLength(1), Validators.required]),
      dataAbertura: new FormControl('', [Validators.minLength(10), Validators.required]),
      dataFechamento: new FormControl('', [Validators.minLength(10), Validators.required]),
      descricao: new FormControl('', [Validators.minLength(1), Validators.required]),
      qtdAluno: new FormControl('')
    });

    this.buscaCurso(idCurso);
  }

  public buscaCurso(idCurso: string): void {
    this.cursosService.buscarTodosCursos().subscribe((resp => {
      console.log("resp", resp);
      for (let i = 0; i < resp.length; i++) {
        if (resp[i].idCurso == Number(idCurso)) {
          let curso = resp[i];
          this.formUpdate.patchValue({ idCurso: curso.idCurso });
          this.formUpdate.patchValue({ categoria: curso.categoria });
          this.formUpdate.patchValue({ descricao: curso.descricao });
          this.formUpdate.patchValue({ dataAbertura: curso.dataAbertura });
          this.formUpdate.patchValue({ dataFechamento: curso.dataFechamento });
          this.formUpdate.patchValue({ qtdAluno: curso.qtdAluno });
        }
      }
    }));
  }

  update(): void {
    this.cursosService.update(this.formUpdate.value)
      .subscribe({
        next: () => {
          alert("Curso editado com sucesso!")
          this.router.navigate(['/']);


        }, error: (error: any) => {

        }
      })
  }

  cancel(): void {
    this.router.navigate(['/'])
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
