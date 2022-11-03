import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WelcomeComponent} from './welcome/welcome.component';
import {FormularioComponent} from './formulario/formulario.component';
import {ContenidoComponent} from './contenido/contenido.component';
import {FormularioFinishComponent} from './formulario-finish/formulario-finish.component';
import {CambioDatosComponent} from './cambio-datos/cambio-datos.component';
import {FormularioConsultanteComponent} from './formulario-consultante/formulario-consultante.component';
import {FormularioCausasComponent} from './formulario-causas/formulario-causas.component';
import {FlujoFormulariosComponent} from './flujo-formularios/flujo-formularios.component';
import {MisConsultasComponent} from './mis-consultas/mis-consultas.component';
import {TemasConsultaComponent} from './temas-consulta/temas-consulta.component';
import {ReconocimientoComponent} from './reconocimiento/reconocimiento.component';
import {CausasEstresComponent} from './causas-estres/causas-estres.component';
import {CargaExcelComponent} from './carga-excel/carga-excel.component';
import {SpCausasEstresComponent} from './sp-causas-estres/sp-causas-estres.component';
import {CuerpoComponent} from './cuerpo/cuerpo.component';
import {PartesCuerpoComponent} from './partes-cuerpo/partes-cuerpo.component';
import {TpCerebroComponent} from './tp-cerebro/tp-cerebro.component';
import {DiarioVivirComponent} from './diario-vivir/diario-vivir.component';
import {InicioComponent} from './inicio/inicio.component';
import {MisActividadesComponent} from './mis-actividades/mis-actividades.component';
import {HomeComponent} from './home/home.component';
import {ConocimientoComponent} from './conocimiento/conocimiento.component';
import {PropositoDevidaComponent} from './proposito-devida/proposito-devida.component';
import {MiHistoriaComponent} from "./mi-historia/mi-historia.component";


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'cambio',
        component: CambioDatosComponent
      },
      {
        path: 'formularioConsultante',
        component: FormularioConsultanteComponent
      },
      {
        path: 'flujoFormularios/:id',
        component: FlujoFormulariosComponent
      }, {
        path: 'formularioCausas',
        component: FormularioCausasComponent
      },
      {
        path: 'misConsultas',
        component: MisConsultasComponent
      },
      {
        path: 'temas/:id',
        component: TemasConsultaComponent
      },
      {
        path: 'reconocimiento',
        component: ReconocimientoComponent
      },
      {
        path: 'causasEstres/:id',
        component: CausasEstresComponent
      },
      {
        path: 'carga',
        component: CargaExcelComponent
      },
      {
        path: 'spCausaEstres',
        component: SpCausasEstresComponent
      },
      {
        path: 'cuerpo',
        component: CuerpoComponent
      },
      {
        path: 'partesCuerpo',
        component: PartesCuerpoComponent
      },
      {
        path: 'tpCerebro',
        component: TpCerebroComponent
      },
      {
        path: 'diarioVivir',
        component: DiarioVivirComponent
      },
      {
        path: 'inicio',
        component: InicioComponent
      },
      {
        path: 'misActividades',
        component: MisActividadesComponent
      },
      {
        path: 'Conocimiento',
        component: ConocimientoComponent
      },
      {
        path: 'proposito',
        component: PropositoDevidaComponent
      },
      {
        path: 'miHistoria',
        component: MiHistoriaComponent
      }
    ]
  },
  {
    path: 'welcome',
    component: WelcomeComponent
  },
  {
    path: 'formulario/:id',
    component: FormularioComponent
  },
  {
    path: 'formulario/finish/:idFormulario',
    component: FormularioFinishComponent
  },
  {
    path: 'formulario/:id/:idPregunta',
    component: FormularioComponent
  },
  {
    path: 'contenido/:id',
    component: ContenidoComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
