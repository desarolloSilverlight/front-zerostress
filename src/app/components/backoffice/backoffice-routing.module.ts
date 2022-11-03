import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BackofficeComponent} from './backoffice.component';

const routes: Routes = [
  {
    path: '',
    component: BackofficeComponent
  },
  {
    path: 'modulos',
    component: BackofficeComponent,
    loadChildren: () => import('./modulos/modulos.module').then(m => m.ModulosModule)
  },
  {
    path: 'roles',
    component: BackofficeComponent,
    loadChildren: () => import('./roles/roles.module').then(m => m.RolesModule)
  },
  {
    path: 'modulosOpciones',
    component: BackofficeComponent,
    loadChildren: () => import('./opciones/modulosOpciones.module').then(m => m.ModulosOpcionesModule)
  },
  {
    path: 'empresas',
    component: BackofficeComponent,
    loadChildren: () => import('./empresas/empresas.module').then(m => m.EmpresasModule)
  },
  {
    path: 'neurofacilitadores',
    component: BackofficeComponent,
    loadChildren: () => import('./neurofacilitadores/neurofacilitadores.module').then(m => m.NeurofacilitadoresModule)
  },
  {
    path: 'tpParametros',
    component: BackofficeComponent,
    loadChildren: () => import('./tpParametros/tpParametros.module').then(m => m.TpParametrosModule)
  },
  {
    path: 'parametros',
    component: BackofficeComponent,
    loadChildren: () => import('./parametros/parametros.module').then(m => m.ParametrosModule)
  },
  {
    path: 'consultantes',
    component: BackofficeComponent,
    loadChildren: () => import('./consultantes/consultantes.module').then(m => m.ConsultantesModule)
  },
  {
    path: 'usuarios',
    component: BackofficeComponent,
    loadChildren: () => import('./usuarios/usuarios.module').then(m => m.UsuariosModule)
  },
  {
    path: 'formularios',
    component: BackofficeComponent,
    loadChildren: () => import('./formularios/formularios.module').then(m => m.FormulariosModule)
  },
  {
    path: 'preguntas',
    component: BackofficeComponent,
    loadChildren: () => import('./preguntas/preguntas.module').then(m => m.PreguntasModule)
  },
  {
    path: 'respuestas',
    component: BackofficeComponent,
    loadChildren: () => import('./respuestas/respuestas.module').then(m => m.RespuestasModule)
  },
  {
    path: 'grupoTrabajo',
    component: BackofficeComponent,
    loadChildren: () => import('./grupoTrabajo/grupoTrabajo.module').then(m => m.GrupoTrabajoModule)
  },
  {
    path: 'usuarioGrupoTrabajo',
    component: BackofficeComponent,
    loadChildren: () => import('./usuarioGrupoTrabajo/usuarioGrupoTrabajo.module').then(m => m.UsuarioGrupoTrabajoModule)
  },
  {
    path: 'notificaciones',
    component: BackofficeComponent,
    loadChildren: () => import('./notificaciones/notificaciones.module').then(m => m.NotificacionesModule)
  },
  {
    path: 'reporte',
    component: BackofficeComponent,
    loadChildren: () => import('./reporte/reporte.module').then(m => m.ReporteModule)
  },
  {
    path: 'tpNotificaciones',
    component: BackofficeComponent,
    loadChildren: () => import('./tpNotificaciones/tpNotificaciones.module').then(m => m.TpNotificacionesModule)
  },
  {
    path: 'contenidos',
    component: BackofficeComponent,
    loadChildren: () => import('./contenidos/contenidos.module').then(m => m.ContenidosModule)
  },
  {
    path: 'formulariosEmpresas',
    component: BackofficeComponent,
    loadChildren: () => import('./formulariosEmpresas/formulariosEmpresas.module').then(m => m.FormulariosEmpresasModule)
  },
  {
    path: 'reglasPregunta',
    component: BackofficeComponent,
    loadChildren: () => import('./reglasPregunta/reglasPregunta.module').then(m => m.ReglasPreguntaModule)
  },
  {
    path: 'reporte',
    component: BackofficeComponent,
    loadChildren: () => import('./reporte/reporte.module').then(m => m.ReporteModule)
  },
  {
    path: 'tpNotificaciones',
    component: BackofficeComponent,
    loadChildren: () => import('./tpNotificaciones/tpNotificaciones.module').then(m => m.TpNotificacionesModule)
  },
  {
    path: 'reporteEmpresa',
    component: BackofficeComponent,
    loadChildren: () => import('./reporteEmpresa/reportesEmpresa.module').then(m => m.ReportesEmpresaModule)
  },
  {
    path: 'cabReportes',
    component: BackofficeComponent,
    loadChildren: () => import('./cabReportes/cabReportes.module').then(m => m.CabReportesModule)
  },
  {
    path: 'cabReportesParam',
    component: BackofficeComponent,
    loadChildren: () => import('./cabReportesParam/cabReportesParam.module').then(m => m.CabReportesParamModule)
  },
  {
    path: 'rutasRegla',
    component: BackofficeComponent,
    loadChildren: () => import('./rutasRegla/rutasRegla.module').then(m => m.RutasReglaModule)
  },
  {
    path: 'reglasFormulario',
    component: BackofficeComponent,
    loadChildren: () => import('./reglasFormulario/reglasFormulario.module').then(m => m.ReglasFormularioModule)
  },
  {
    path: 'gruposDiagnostico',
    component: BackofficeComponent,
    loadChildren: () => import('./gruposDiagnostico/gruposDiagnostico.module').then(m => m.GruposDiagnosticoModule)
  },
  {
    path: 'formulariosConsultante',
    component: BackofficeComponent,
    loadChildren: () => import('./formulariosConsultante/formulariosConsultante.module').then(m => m.FormulariosConsultanteModule)
  },
  {
    path: 'consultas',
    component: BackofficeComponent,
    loadChildren: () => import('./consultas/consultas.module').then(m => m.ConsultasModule)
  },
  {
    path: 'temasConsulta',
    component: BackofficeComponent,
    loadChildren: () => import('./temasConsulta/temasConsulta.module').then(m => m.TemasConsultaModule)
  },
  {
    path: 'sbCausasEstres',
    component: BackofficeComponent,
    loadChildren: () => import('./sbCausasEstres/sbCausasEstres.module').then(m => m.SbCausasEstresModule)
  },
  {
    path: 'usrCausaEstres',
    component: BackofficeComponent,
    loadChildren: () => import('./usrCausaEstres/usrCausaEstres.module').then(m => m.UsrCausaEstresModule)
  },
  {
    path: 'usrCausaEstres',
    component: BackofficeComponent,
    loadChildren: () => import('./usrCausaEstres/usrCausaEstres.module').then(m => m.UsrCausaEstresModule)
  },
  {
    path: 'baseTpNotificacines',
    component: BackofficeComponent,
    loadChildren: () => import('./baseTpNotificacines/baseTpNotificacines.module').then(m => m.BaseTpNotificacinesModule)
  },
  {
    path: 'baseNotificacines',
    component: BackofficeComponent,
    loadChildren: () => import('./baseNotificaciones/baseNotificaciones.module').then(m => m.BaseNotificacionesModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackofficeRoutingModule {
}
