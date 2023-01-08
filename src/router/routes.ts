import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('src/pages/Home.vue')
      },
      {
        path: 'settings',
        component: () => import('pages/Settings.vue')
      },
      {
        path: 'documents',
        component: () => import('pages/Documents.vue')
      },
      {
        path: 'upload',
        component: () => import('pages/Upload.vue')
      },
      // Footer
      {
        path: '/home',
        component: () => import('pages/Home.vue'),
      },
      {
        path: '/spenden',
        component: () => import('src/pages/Spenden.vue'),
      },
      {
        path: '/informationen',
        component: () => import('pages/Informationen.vue'),
      },
      {
        path: '/profil',
        component: () => import('src/pages/Profil.vue'),
      },
      // Drawer
      {
        path: '/notification',
        component: () => import('src/pages/Notification.vue'),
      },
      {
        path: '/datenschutz',
        component: () => import('src/pages/Datenschutz.vue'),
      },
      {
        path: 'impressum',
        component: () => import('pages/Impressum.vue')
      },
      // Home Pages
      {
        path: 'events',
        component: () => import('pages/BlutspendeEvents.vue')
      },
      {
        path: 'blutspendedienste',
        component: () => import('pages/BlutspendeDienste.vue')
      },
      {
        path: '/barometer',
        component: () => import('src/pages/BlutspendeBarometer.vue'),
      },
      // Spenden Pages
      {
        path: '/check',
        component: () => import('src/pages/VorabCheck.vue'),
      },
      {
        path: '/termin',
        component: () => import('src/pages/TerminVereinbarung.vue'),
      },
      {
        path: '/fragebogen',
        component: () => import('src/pages/FrageBogen.vue'),
      },
      // Info Pages
      {
        path: 'vorblutspende',
        component: () => import('pages/VorBlutspende.vue')
      },
      {
        path: 'nachblutspende',
        component: () => import('pages/NachBlutspende.vue')
      },
    ]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
];

export default routes;
