import { ICtaCards } from '@interfaces/cta-cards.interface';

export const CTA_CARDS:ICtaCards[] = [

  {
    title: 'Listar Usuarios',
    icon: 'person_search',
    routerLink: '/admin/usuarios/list'
  },
  {
    title: 'Mi Perfil',
    icon: 'manage_accounts',
    routerLink: '/admin/perfil'
  },

]
