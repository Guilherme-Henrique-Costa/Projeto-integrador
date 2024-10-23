import { Component, OnInit } from '@angular/core';
import { VagasVoluntarioService, Vaga } from './vagas-voluntario.service';  // Importa o serviço e a interface

@Component({
  selector: 'app-vagas-voluntario',
  templateUrl: './vagas-voluntario.component.html',
  styleUrls: ['./vagas-voluntario.component.css']
})
export class VagasVoluntarioComponent implements OnInit {
  searchQuery: string = '';
  sidebarOpen: boolean = true;

  voluntarioNome: string = 'Aluno';

  vagas: Vaga[] = [];
  vagaSelecionada: Vaga | null = null;

  sidebarItems = [
    { label: 'Perfil', icon: 'pi pi-user', route: '/perfil' },
    { label: 'Vagas', icon: 'pi pi-bookmark', route: '/vagas' },
    { label: 'Feedback', icon: 'pi pi-chart-line', route: '/feedback' },
    { label: 'Mensagens', icon: 'pi pi-comments', route: '/mensagens' },
    { label: 'Recompensa', icon: 'pi pi-star-fill', route: '/ranking' },
    { label: 'Logout', icon: 'pi pi-sign-out', route: '/login' }
  ];

  constructor(private vagasVoluntarioService: VagasVoluntarioService) {}

  ngOnInit(): void {
    this.carregarVagas();
    const nomeSalvo = localStorage.getItem('userName');
    console.log('Nome salvo no localStorage:', nomeSalvo);  // Exibe o nome salvo no console

    if (nomeSalvo) {
      this.voluntarioNome = nomeSalvo;
    } else {
      this.voluntarioNome = 'Aluno'; // Nome padrão se não encontrado
    }
  }

  // Função para alternar a barra lateral (abrir/fechar)
  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

   // Método que carrega as vagas do serviço
   carregarVagas(): void {
    this.vagasVoluntarioService.getVagas().subscribe(vagas => {
      this.vagas = vagas;  // Atribui as vagas recebidas à variável
      console.log('Vagas carregadas:', vagas);  // Exibe as vagas no console
    }, error => {
      console.error('Erro ao carregar vagas:', error);  // Loga erros
    });
  }


  // Seleciona uma vaga para exibir os detalhes
  selecionarVaga(vaga: Vaga): void {
    this.vagaSelecionada = vaga;
  }

  // Função para filtrar as vagas com base na pesquisa
  get vagasFiltradas(): Vaga[] {
    return this.vagas.filter(vaga =>
      vaga.titulo.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      vaga.instituicao.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      vaga.cargo.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  // Método para criar uma nova vaga
  criarVaga(): void {
    const novaVaga: Vaga = {
      titulo: 'Nova Vaga Exemplo',
      instituicao: 'Instituição X',
      cargo: 'Cargo Exemplo',
      localidade: 'São Paulo - SP',
      descricao: 'Descrição da vaga exemplo.',
      especificacoes: ['Especificação 1', 'Especificação 2']
    };

    this.vagasVoluntarioService.criarVaga(novaVaga).subscribe(vagaCriada => {
      console.log('Vaga criada com sucesso!', vagaCriada);
      this.carregarVagas();  // Atualiza a lista de vagas
    });
  }

  // Método para o botão "Candidatar-se!"
  candidatarVaga(): void {
    if (this.vagaSelecionada) {
      console.log(`Candidatando-se à vaga: ${this.vagaSelecionada.titulo}`);
      // Aqui você pode adicionar a lógica para candidatar-se, por exemplo, enviar uma requisição ao backend.
    }
  }
}
