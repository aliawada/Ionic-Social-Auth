import { Component } from "@angular/core";
import { NavController } from "ionic-angular";

import { Facebook } from "@ionic-native/facebook";
import { GooglePlus } from "@ionic-native/google-plus";
import { Usuario } from "../../model/Usuario";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  constructor(
    public navCtrl: NavController,
    private facebook: Facebook,
    public googleplus: GooglePlus
  ) {}

  //método para chamar api do facebook e salvar no banco o usuario
  loginFacebook() {
    let permissions = new Array<string>();
    permissions = ["public_profile", "email"];

    this.facebook.login(permissions).then(
      response => {
        let params = new Array<string>();

        this.facebook.api("/me?fields=name,email", params).then(
          res => {
            console.log("res" + res);
            //estou usando o model para criar os usuarios
            let usuario = new Usuario();
            usuario.nome = res.name;
            usuario.email = res.email;
            usuario.senha = res.id;
            usuario.login = res.email;

            console.log(usuario + "foi logado com sucesso!");

            this.navCtrl.push("DashboardPage", {
              usuario: usuario
            });
          },
          error => {
            alert("erro");
            console.log("ERRO LOGIN: ", error);
          }
        );
      },
      error => {
        alert("erro");
        console.log(error);
      }
    );
  }

  loginGoogle() {
    this.googleplus
      .login({})
      .then(res => {
        console.log(res);
        let usuario = new Usuario();
        usuario.nome = res.displayName;
        usuario.email = res.email;
        usuario.senha = res.id;
        usuario.login = res.email;

        this.navCtrl.push("DashboardPage", {
          usuario: usuario
        });
      })
      .catch(err => console.error(err));
  }
}
