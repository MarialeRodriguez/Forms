import { Component } from '@angular/core';



interface Persona {
  nombre: string;
  favoritos: Favoritos [];
}

interface Favoritos {
  id:number;
  nombre: string
}

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html'
})
export class DinamicosComponent {

  nuevoJuego: string = '';

  persona: Persona = {
    nombre: 'Arthur',
    favoritos: [
      { id: 1, nombre: 'Futbol'},
      { id: 2, nombre: 'Voleibol'}
    ]
  }

  agregarJuego(){
    const nuevoFavorito: Favoritos = {
      id: this.persona.favoritos.length + 1,
      nombre: this.nuevoJuego
    }
    this.persona.favoritos.push( nuevoFavorito );
    this.nuevoJuego = '';
  }

  eliminar( index: number){
    this.persona.favoritos.splice(index, 1);
  }

  

  guardar(){
    console.log('formulario posteado');
  }

}
