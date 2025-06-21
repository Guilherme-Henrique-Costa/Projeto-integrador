import { Component } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import ptBrLocale from '@fullcalendar/core/locales/pt-br';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent {
  searchQuery: string = '';
  sidebarOpen: boolean = true;
  voluntarioNome: string = 'Aluno';

  sidebarItems = [
  { label: 'Perfil', icon: 'pi pi-user', route: '/perfil' },
  { label: 'Vagas', icon: 'pi pi-bookmark', route: '/vagas' },
  { label: 'Histórico', icon: 'pi pi-history', route: '/vagas-voluntario/historico' },
  { label: 'Agenda', icon: 'pi pi-calendar', route: '/agenda' },
  { label: 'Feedback', icon: 'pi pi-chart-line', route: '/feedback' },
  { label: 'Mensagens', icon: 'pi pi-comments', route: '/mensagens' },
  { label: 'Recompensa', icon: 'pi pi-star-fill', route: '/ranking' },
  { label: 'Logout', icon: 'pi pi-sign-out', route: '/login' },
];

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    locale: ptBrLocale,
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,dayGridWeek'
    },
    events: [
      {
        title: 'Mutirão no Parque',
        start: '2025-06-25T10:00:00',
        end: '2025-06-25T14:00:00',
        color: '#ad2121'
      },
      {
        title: 'Apoio em Escola',
        start: '2025-06-28T09:00:00',
        end: '2025-06-28T12:00:00',
        color: '#1e90ff'
      }
    ]
  };
}
