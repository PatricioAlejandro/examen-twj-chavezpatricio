import { Component, OnInit } from '@angular/core';
import {Response, Http} from "@angular/http";
import {MasterURLService} from "../services/master-url.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  title: string = "Bienvenido a Ingresar Usuarios";
  nuevoUsuario = {};
  usuarios = [];
  disabledButtons = {
    NuevoUsuarioFormSubmitButton: false,
    EditBorracheraForm: false
  };

  constructor(private _http: Http,
              private _masterURL: MasterURLService) {
  }

  ngOnInit() {
    this._http.get(this._masterURL.url + "Usuario")
      .subscribe(
        (res: Response) => {
          this.usuarios = res.json()
            .map((value) => {
              value.FormularioCerrado = true;
              return value;
            });
        },
        (err) => {
          console.log(err);
        }
      )
  }

  crearUsuario(formulario: NgForm) {
    this.disabledButtons.NuevoUsuarioFormSubmitButton = true;
    this._http.post(this._masterURL.url + "Usuario", {
      nombre: formulario.value.nombre,
      ciudadResidencia: formulario.value.ciudadResidencia,
      fechaNacimiento: formulario.value.fechaNacimiento
    }).subscribe(
      (res) => {
        this.usuarios.push(res.json());
        this.nuevoUsuario = {};
        this.disabledButtons.NuevoUsuarioFormSubmitButton = false;
      },
      (err) => {
        this.disabledButtons.NuevoUsuarioFormSubmitButton = false;
        console.log("Ocurrio un error", err);
      },
      () => {
        console.log("Termino la función vamos a las casas")
      }
    );
  }

  borrarUsuario(id: number) {
    this._http.delete(this._masterURL.url + "Usuario/" + id)
      .subscribe(
        (res) => {
          let usuarioBorrado = res.json();
          this.usuarios = this.usuarios.filter(value => usuarioBorrado.id != value.id);
        },
        (err) => {
          console.log(err);
        }
      )
  }

  actualizarUsuario(usuario: any) {
    let parametos = {
      nombre: usuario.nombre,
      ciudadResidencia: usuario.ciudadResidencia,
      fechaNacimiento: usuario.fechaNacimiento
    };
    this._http.put(this._masterURL.url + "Usuario/" + usuario.id, parametos)
      .subscribe(
        (res: Response) => {
          usuario.FormularioCerrado = !usuario.FormularioCerrado;
          console.log("Respuesta:", res.json());
        },
        (err) => {
          console.log("Error:", err);
        }
      )
  }

}
