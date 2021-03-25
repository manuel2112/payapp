import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'modal',
    loadChildren: () => import('./pages/modal/modal.module').then( m => m.ModalPageModule)
  },
  {
    path: 'nosotros',
    loadChildren: () => import('./pages/nosotros/nosotros.module').then( m => m.NosotrosPageModule)
  },
  {
    path: 'horario',
    loadChildren: () => import('./pages/horario/horario.module').then( m => m.HorarioPageModule)
  },
  {
    path: 'producto',
    loadChildren: () => import('./pages/producto/producto.module').then( m => m.ProductoPageModule)
  },
  {
    path: 'zoom-imagen',
    loadChildren: () => import('./pages/zoom-imagen/zoom-imagen.module').then( m => m.ZoomImagenPageModule)
  },
  {
    path: 'shop',
    loadChildren: () => import('./pages/shop/shop.module').then( m => m.ShopPageModule)
  },
  {
    path: 'mapa',
    loadChildren: () => import('./pages/mapa/mapa.module').then( m => m.MapaPageModule)
  },
  {
    path: 'notificacion',
    loadChildren: () => import('./pages/notificacion/notificacion.module').then( m => m.NotificacionPageModule)
  },
  {
    path: 'detalle-compra',
    loadChildren: () => import('./pages/detalle-compra/detalle-compra.module').then( m => m.DetalleCompraPageModule)
  },
  {
    path: 'compras',
    loadChildren: () => import('./pages/compras/compras.module').then( m => m.ComprasPageModule)
  },  {
    path: 'compra-single',
    loadChildren: () => import('./pages/compra-single/compra-single.module').then( m => m.CompraSinglePageModule)
  },
  {
    path: 'combo',
    loadChildren: () => import('./pages/combo/combo.module').then( m => m.ComboPageModule)
  }


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
