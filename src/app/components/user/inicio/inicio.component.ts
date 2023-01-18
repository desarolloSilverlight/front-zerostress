import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {ModalCalificacionComponent} from '../modal-calificacion/modal-calificacion.component';
import {ModalConfirmacionComponent} from '../modal-confirmacion/modal-confirmacion.component';
import {ModalEvaluarComponent} from '../modal-evaluar/modal-evaluar.component';
import {ConsultantesService} from '../../../core/services/consultantes.service';
import {AuthService} from '../../../core/services/auth.service';
import {GlobalsUser} from '../../../core/globals/globalsUser';
import {ModalSindatosComponent} from '../modal-sindatos/modal-sindatos.component';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})


export class InicioComponent implements OnInit {

  constructor(private router: Router, private dialog: MatDialog, private consultanteService: ConsultantesService,
              private authService: AuthService,
              private globals: GlobalsUser) {
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.authService.protected().toPromise().then((r) => {
        this.globals.claimsUser = r;
        if (r.idConsultante !== null) {
          this.globals.loadedClaims.next(true);
          this.consultanteService.get(r.idConsultante).toPromise().then(res => {
            this.globals.consultante = res;

            // if (res.primerIngreso && !this.globals.formularioPrimerIngreso) {
            //   this.router.navigate(['/', 'app', 'reconocimiento']);
            // }

          });
        } else {
          this.authService.protected().toPromise().then((res) => {
            this.globals.claimsUser = res;
            if (r.idConsultante !== null) {
              this.globals.loadedClaims.next(true);
              this.consultanteService.get(res.idConsultante).toPromise().then(resp => {
                this.globals.consultante = resp;

                // if (resp.primerIngreso && !this.globals.formularioPrimerIngreso) {
                //   this.router.navigate(['/', 'app', 'reconocimiento']);
                // }

              });
            }
          });
        }

      });
    }, 500);
  }

  OpenDialog(): void {
    const dialogRef = this.dialog.open(ModalConfirmacionComponent, {});
    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
    });
  }

  OpenDialogE(): void {
    const dialogRef = this.dialog.open(ModalEvaluarComponent, {});
    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
    });
  }

  OpenDialogC(): void {
    const dialogRef = this.dialog.open(ModalCalificacionComponent, {width: '670px'});
    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
    });
  }

  OpenDialogS(): void{
    const dialogRef = this.dialog.open(ModalSindatosComponent, {width: '670px'});
    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
    });
  }

}
