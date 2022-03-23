import { LivroService } from './../../services/livro.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-livros',
  templateUrl: './create-livros.component.html',
  styleUrls: ['./create-livros.component.css']
})

export class CreateLivrosComponent implements OnInit {
  createLivro: FormGroup;
  submitted = false;
  loading = false;
  id: string | null;
  tituloPagina = 'Adidionar livro...';

  constructor(private fb: FormBuilder,
              private _livroService: LivroService,
              private router: Router,
              private toastr: ToastrService,
              private aRoute: ActivatedRoute) {
    this.createLivro = this.fb.group({
      autor: ['', Validators.required],
      titulo: ['', Validators.required],
      editora: ['', Validators.required],
      sinopse: ['', Validators.required]
    })
    this.id = this.aRoute.snapshot.paramMap.get('id');
    console.log(this.id)
  }

  ngOnInit(): void {
    this.esEditar();
  }

  adicionarEditarLivro() {
    this.submitted = true;
    if(this.createLivro.invalid){
      return;
    }

    if(this.id === null) {
      this.adicionarLivro();
    }else{
      this.editarLivro(this.id);
    }
  }

  adicionarLivro() {
    const livro: any = {
      autor: this.createLivro.value.autor,
      titulo: this.createLivro.value.titulo,
      editora: this.createLivro.value.editora,
      sinopse: this.createLivro.value.sinopse,
      fechaCreate: new Date(),
      fechaAtualizacao: new Date()
    }

    this.loading = true;
    this._livroService.adicionarLivro(livro).then(() =>{
      this.toastr.success('O livro foi registrado com sucesso!', 'Livro Registrado!', {
        positionClass: 'toast-bottom-right'
      });
      this.loading = false;
      this.router.navigate(['/list-livros']);
    }).catch(error => {
      console.log(error);
      this.loading = false;
    });

  }

  editarLivro(id: string) {
    const livro: any = {
      autor: this.createLivro.value.autor,
      titulo: this.createLivro.value.titulo,
      editora: this.createLivro.value.editora,
      sinopse: this.createLivro.value.sinopse,
      fechaAtualizacao: new Date()
    }

    this.loading = true;
    this._livroService.atualizarLivro(id, livro).then(() => {
      this.loading = false;
      this.toastr.info('O registro foi editado com sucesso!', 'Registro Editado!', {
        positionClass: 'toast-bottom-right'
      });
      this.router.navigate(['/list-livros']);
    });
  }

  esEditar() {
    this.tituloPagina = 'Editar livro...'
    if(this.id !== null) {
      this.loading = true;
      this._livroService.getLivro(this.id).subscribe(data => {
        this.loading = false;
        console.log(data.payload.data()['autor']);
        this.createLivro.setValue({
          autor: data.payload.data()['autor'],
          titulo: data.payload.data()['titulo'],
          editora: data.payload.data()['editora'],
          sinopse: data.payload.data()['sinopse']
        });
      });
    }
  }

}
