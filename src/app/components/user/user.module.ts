import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UserRoutingModule} from './user-routing.module';
import {AngularMaterialModule} from '../../core/modules/angular-material.module';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {ReactiveFormsModule} from '@angular/forms';
import {NgSelectModule} from '@ng-select/ng-select';
import {WelcomeComponent} from './welcome/welcome.component';
import {FormularioComponent} from './formulario/formulario.component';
import {ContenidoComponent, DialogRatingComponent} from './contenido/contenido.component';
import {GlobalsUser} from '../../core/globals/globalsUser';
import {NavbarComponent} from './navbar/navbar.component';
import {CambioDatosComponent} from './cambio-datos/cambio-datos.component';
import {FormularioConsultanteComponent} from './formulario-consultante/formulario-consultante.component';
import {FormulariosGeneradosComponent} from './formularios-generados/formularios-generados.component';
import {FlujoFormulariosComponent} from './flujo-formularios/flujo-formularios.component';
import {HomeComponent} from './home/home.component';
import {FormularioFinishComponent} from './formulario-finish/formulario-finish.component';
import {FormularioCausasComponent} from './formulario-causas/formulario-causas.component';
import {MisConsultasComponent} from './mis-consultas/mis-consultas.component';
import {TemasConsultaComponent} from './temas-consulta/temas-consulta.component';
import {RatingComponent} from './rating/rating.component';
import {PipesModule} from '../../core/pipes/pipes.module';
import {ReconocimientoComponent} from './reconocimiento/reconocimiento.component';
import {CausasEstresComponent} from './causas-estres/causas-estres.component';
import {ProgresoReconocimientoComponent} from './progreso-reconocimiento/progreso-reconocimiento.component';
import {CargaExcelComponent} from './carga-excel/carga-excel.component';
import {SpCausasEstresComponent} from './sp-causas-estres/sp-causas-estres.component';
import {CuerpoComponent} from './cuerpo/cuerpo.component';
import {PartesCuerpoComponent} from './partes-cuerpo/partes-cuerpo.component';
import {TpCerebroComponent} from './tp-cerebro/tp-cerebro.component';
import {DiarioVivirComponent} from './diario-vivir/diario-vivir.component';
import {InicioComponent} from './inicio/inicio.component';
import {ModalConfirmacionComponent} from './modal-confirmacion/modal-confirmacion.component';
import {ModalEvaluarComponent} from './modal-evaluar/modal-evaluar.component';
import {ModalCalificacionComponent} from './modal-calificacion/modal-calificacion.component';
import {MisActividadesComponent} from './mis-actividades/mis-actividades.component';
import {ModalvideoComponent} from './modalvideo/modalvideo.component';
import {ModalSindatosComponent} from './modal-sindatos/modal-sindatos.component';
import {ConocimientoComponent} from './conocimiento/conocimiento.component';
import {PropositoDevidaComponent} from './proposito-devida/proposito-devida.component';
import {ModalFinalizacionComponent} from './modal-finalizacion/modal-finalizacion.component';
import {ModalRecursoComponent} from './modal-recurso/modal-recurso.component';
import {MiHistoriaComponent} from './mi-historia/mi-historia.component';
import {ModalContrasenaComponent} from './modal-contrasena/modal-contrasena.component';


@NgModule({
  declarations: [WelcomeComponent, HomeComponent, FormularioComponent, ContenidoComponent,
    FormularioFinishComponent, NavbarComponent
    , CambioDatosComponent, FormularioConsultanteComponent, FormulariosGeneradosComponent,
    FlujoFormulariosComponent, FormularioCausasComponent, MisConsultasComponent, TemasConsultaComponent, RatingComponent,
    DialogRatingComponent,
    ReconocimientoComponent,
    CausasEstresComponent,
    ProgresoReconocimientoComponent,
    CargaExcelComponent,
    SpCausasEstresComponent,
    CuerpoComponent,
    PartesCuerpoComponent,
    TpCerebroComponent,
    DiarioVivirComponent,
    InicioComponent,
    ModalConfirmacionComponent,
    ModalEvaluarComponent,
    ModalCalificacionComponent,
    MisActividadesComponent,
    ModalvideoComponent,
    ModalSindatosComponent,
    ConocimientoComponent,
    PropositoDevidaComponent,
    ModalFinalizacionComponent,
    ModalRecursoComponent, MiHistoriaComponent, ModalContrasenaComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    AngularMaterialModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    NgSelectModule,
    PipesModule
  ],
  providers: [GlobalsUser]
})
export class UserModule {
}
