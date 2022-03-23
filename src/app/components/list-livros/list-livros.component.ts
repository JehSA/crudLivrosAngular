import { LivroService } from './../../services/livro.service';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { elementAt, Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-livros',
  templateUrl: './list-livros.component.html',
  styleUrls: ['./list-livros.component.css']
})

export class ListLivrosComponent implements OnInit {

  livros: any[] = [];

  constructor(private _livroService: LivroService,
              private toastr: ToastrService) {

  }

  ngOnInit(): void {
    this.getLivros()
  }

  getLivros() {
    this._livroService.getLivros().subscribe(data => {
      this.livros = [];
      data.forEach((element:any) => {
        //console.log(element.payload.doc.id);
        //console.log(element.payload.doc.data());
        this.livros.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
      console.log(this.livros);
    });
  }

  deletarLivro(id: string){
    this._livroService.deletarLivro(id).then(() => {
      console.log('Livro excluído com sucesso!');
      this.toastr.error('O livro foi deletado com sucesso!', 'Livro Deletado!', {
        positionClass: 'toast-bottom-right'
      });
    }).catch(error => {
      console.log(error);
    });
  }

}
