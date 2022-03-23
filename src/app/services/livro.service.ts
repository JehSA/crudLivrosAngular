import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class LivroService {

  constructor(private firestore: AngularFirestore) { }

  adicionarLivro(livro: any): Promise<any> {
    return this.firestore.collection('livros').add(livro);
  }

  getLivros(): Observable<any> {
    return this.firestore.collection('livros', ref => ref.orderBy('fechaCreate', 'asc')).snapshotChanges();
  }

  deletarLivro(id: string): Promise<any> {
    return this.firestore.collection('livros').doc(id).delete();
  }

  getLivro(id: string): Observable<any> {
    return this.firestore.collection('livros').doc(id).snapshotChanges();
  }

  atualizarLivro(id: string, data: any): Promise<any> {
    return this.firestore.collection('livros').doc(id).update(data);
  }

}
