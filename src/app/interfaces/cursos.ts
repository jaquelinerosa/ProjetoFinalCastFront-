export interface Cursos{
    categoria: {
      id?: number,
      nome?: string,
    },
    dataAbertura: string,
    dataFechamento: string,
    descricao?: string,
    idCurso?: number,
    qtdAluno?: number,
}
