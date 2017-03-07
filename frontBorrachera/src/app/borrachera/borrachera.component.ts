import {Component, OnInit} from '@angular/core';
import {Http, Response} from "@angular/http";
import {MasterURLService} from "../services/master-url.service";
import {ActivatedRoute} from "@angular/router";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-borrachera',
  templateUrl: './borrachera.component.html',
  styleUrls: ['./borrachera.component.css']
})
export class BorracheraComponent implements OnInit {
  title: string = "Bienvenido a Ingresar sus Borracheras";
  private _parametros: any;
  usuario = {};
  borracheras = [];
  nuevaBorrachera = {};
  borracheraEditada = {};
  disabledButtons = {
    NuevaBorracheraFormSubmitButton: false,
    EditarBorracheraForm: false,
    buttonEditForm: false
  };

  constructor(private _http: Http, private _masterURL: MasterURLService, private _ActivatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.disabledButtons.NuevaBorracheraFormSubmitButton = true;
    this._ActivatedRoute
      .params
      .subscribe(parametros => {
        this._parametros = parametros;
        this._http.get(this._masterURL.url + 'Borrachera?idUsuario=' + this._parametros.idUsuario)
          .subscribe(
            (res: Response) => {
              this.disabledButtons.NuevaBorracheraFormSubmitButton = false;
              this.borracheras = res.json();
            },
            (err) => {
              this.disabledButtons.NuevaBorracheraFormSubmitButton = false;
              console.log(err)
            }
          )
      });
    this._http
      .get(this._masterURL.url + 'Usuario?id=' + this._parametros.idUsuario)
      .subscribe(
        res => {
          this.usuario = res.json()
        },
        err => {
          console.log('Error GET: ', err)
        }
      );
  }

  crearBorrachera(form: NgForm) {
    this.disabledButtons.NuevaBorracheraFormSubmitButton = true;
    let borrachera = {
      motivo: form.value.motivo,
      latitudEmpezo: form.value.latitudEmpezo,
      longitudEmpezo: form.value.longitudEmpezo,
      idUsuario: this._parametros.idUsuario
    };
    this._http.post(this._masterURL.url + 'Borrachera', borrachera)
      .subscribe(
        (res: Response) => {
          this.borracheras.push(res.json());
          this.nuevaBorrachera = {};
          this.disabledButtons.NuevaBorracheraFormSubmitButton = false;
        },
        (err) => {
          this.disabledButtons.NuevaBorracheraFormSubmitButton = false;
          console.log(err)
        }
      )
  }

  actualizarBorrachera(borrachera: any) {
    let parametros = {
      motivo: borrachera.motivo,
      latitudEmpezo: borrachera.latitudEmpezo,
      longitudEmpezo: borrachera.longitudEmpezo
    };

    if (parametros.motivo == ' ') {
      delete parametros.motivo
    }
    if (parametros.latitudEmpezo == ' ') {
      delete parametros.latitudEmpezo
    }
    if (parametros.longitudEmpezo == ' ') {
      delete parametros.longitudEmpezo
    }

    this._http
      .put(this._masterURL.url + 'Borrachera/' + borrachera.id, parametros)
      .subscribe(
        res => {
          this.borracheras = this.borracheras.map(function (value) {
            return value.id == borrachera.id ? res.json() : value;
          });
          this.disabledButtons.EditarBorracheraForm = false;
          this.disabledButtons.buttonEditForm = false;
        },
        err => {
          console.log('Error: ', err)
        }
      )
  }

  borrarBorrachera(id: number) {
    let parametros = {
      id: id
    };
    this._http
      .delete(this._masterURL.url + "Borrachera/" + parametros.id)
      .subscribe(
        res => {
          let borracheraBorrada = res.json();
          this.borracheras = this.borracheras.filter(value => borracheraBorrada.id != value.id)
        },
        err => {
          console.log(err)
        }
      )
  }

}

