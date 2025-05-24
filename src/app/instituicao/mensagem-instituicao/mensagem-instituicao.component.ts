import { Component } from '@angular/core';

interface MensagemChat {
  remetente: 'usuário' | 'bot';
  texto: string;
}

@Component({
  selector: 'app-mensagem-instituicao',
  templateUrl: './mensagem-instituicao.component.html',
  styleUrls: ['./mensagem-instituicao.component.css']
})
export class MensagemInstituicaoComponent {
  searchQuery: string = '';
  sidebarOpen: boolean = true;

  mensagens: string[] = [
    'Fulano',
    'Sicrano',
    'Zé da Silva',
    'Beltrano',
    'Armando',
    'Zezé',
    'Tião',
    'Saratiel'
  ];

  chatbotMensagens: MensagemChat[] = [];

  perguntasRespostas = [
    { pergunta: 'Como funciona o processo de voluntariado?', resposta: 'Você se inscreve na vaga desejada e nossa equipe entrará em contato.' },
    { pergunta: 'Quais são os requisitos para voluntariado?', resposta: 'Ter mais de 18 anos e disponibilidade mínima de 4h semanais.' },
    { pergunta: 'A instituição fornece certificado?', resposta: 'Sim, fornecemos certificado de participação para todos os voluntários ativos.' },
    { pergunta: 'Como posso entrar em contato com a instituição?', resposta: 'Você pode usar o menu de mensagens ou enviar um e-mail para contato@instituicao.org.' },
    { pergunta: 'Onde ficam localizadas as atividades?', resposta: 'As atividades ocorrem na sede da instituição ou em locais parceiros.' },
    { pergunta: 'Posso sugerir novas atividades ou projetos?', resposta: 'Claro! Envie sua sugestão pelo formulário de contato ou por aqui.' },

    { pergunta: 'Olá! Tenho interesse em atuar como voluntário na instituição. Como posso me inscrever?', resposta: 'Você pode se inscrever acessando a aba "Vagas" e preenchendo o formulário de inscrição.' },
    { pergunta: 'Gostaria de saber se há vagas disponíveis para trabalho voluntário.', resposta: 'Sim! Confira as oportunidades disponíveis na aba "Vagas" do sistema.' },
    { pergunta: 'Tenho disponibilidade aos finais de semana e adoraria contribuir com as atividades da instituição.', resposta: 'Ótimo! Temos atividades de fim de semana. Veja mais na seção de vagas.' },
    { pergunta: 'Sou estudante e gostaria de participar como voluntário para adquirir experiência e ajudar. Há oportunidades nesse sentido?', resposta: 'Sim! Estudantes são muito bem-vindos. Verifique as vagas disponíveis e candidate-se.' },
    { pergunta: 'Quero muito fazer parte do time de voluntários de vocês. Qual o próximo passo?', resposta: 'Ficamos felizes! Basta se inscrever na aba "Vagas" e aguardar nosso contato.' },

    { pergunta: 'Qual é a carga horária semanal exigida para voluntários?', resposta: 'A carga mínima é de 4 horas semanais, podendo variar conforme a vaga.' },
    { pergunta: 'Há necessidade de experiência prévia para se candidatar como voluntário?', resposta: 'Não. Toda ajuda é bem-vinda, com ou sem experiência.' },
    { pergunta: 'O voluntariado pode ser feito de forma remota ou apenas presencialmente?', resposta: 'Temos vagas presenciais e remotas, de acordo com o projeto.' },
    { pergunta: 'Existe algum tipo de capacitação ou treinamento para novos voluntários?', resposta: 'Sim, oferecemos uma capacitação inicial antes do início das atividades.' },

    { pergunta: 'Olá, tudo bem? Gostaria de saber como posso acessar meu cronograma de atividades da semana.', resposta: 'Você pode acessar seu cronograma na área do voluntário, após login.' },
    { pergunta: 'Tenho uma dúvida sobre minha função atual como voluntário. Com quem posso falar sobre isso?', resposta: 'Entre em contato com seu coordenador de atividades ou envie sua dúvida pelo formulário.' },
    { pergunta: 'É possível alterar meus dias de disponibilidade neste mês?', resposta: 'Sim! Acesse seu perfil e atualize sua disponibilidade.' },
    { pergunta: 'Gostaria de saber se haverá algum evento ou capacitação para os voluntários nos próximos dias.', resposta: 'As informações sobre eventos estão disponíveis na área do voluntário.' },
    { pergunta: 'Preciso justificar uma ausência em um dos dias de atividade. Como devo proceder?', resposta: 'Informe sua ausência com antecedência ao seu coordenador ou pela plataforma.' },
    { pergunta: 'Existe um canal direto para feedback ou sugestões dos voluntários?', resposta: 'Sim, você pode usar o formulário de sugestões na sua área pessoal.' },
    { pergunta: 'Quem devo procurar caso precise de apoio durante as atividades presenciais?', resposta: 'Procure o coordenador responsável pela atividade do dia.' },
    { pergunta: 'Quais são os critérios para participar de outras frentes de voluntariado da instituição?', resposta: 'Basta demonstrar interesse. Verificaremos sua disponibilidade e perfil.' },
    { pergunta: 'Há alguma documentação que preciso preencher ou atualizar neste período?', resposta: 'Verifique na área do voluntário se há pendências de documentação.' },
    { pergunta: 'Tenho interesse em atuar em outra área dentro da instituição. Existe essa possibilidade?', resposta: 'Sim. Entre em contato com a coordenação para realocação ou novas oportunidades.' }
  ];

  instituicaoNome: string = 'Instituição'; // Nome padrão, será substituído após o login

  sidebarItems = [
    { label: 'Perfil', icon: 'pi pi-user', route: '/perfil-instituicao' },
    { label: 'Vagas', icon: 'pi pi-bookmark', route: '/vagas-instituicao' },
    { label: 'Candidatos', icon: 'pi pi-user', route: '/candidatos'},
    { label: 'Feedback', icon: 'pi pi-chart-line', route: '/feedback-instituicao' },
    { label: 'Gestão', icon: 'pi pi-chart-line', route: '/gestao' },
    { label: 'Mensagens', icon: 'pi pi-comments', route: '/mensagem-instituicao' },
    { label: 'Ranking', icon: 'pi pi-star-fill', route: '/ranking-instituicao' },
    { label: 'Relatórios', icon: 'pi pi-copy', route: '/relatorios-instituicao' },
    { label: 'Sair', icon: 'pi pi-sign-out', route: '/login-instituicao' }
  ];

  constructor() {}

  ngOnInit(): void {
    // Recupera o nome da instituição do localStorage
    const nomeSalvo = localStorage.getItem('userName');
    if (nomeSalvo) {
      this.instituicaoNome = nomeSalvo; // Atualiza o nome da instituição no menu
    }
  }

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  selecionarPergunta(pergunta: string): void {
    const item = this.perguntasRespostas.find(p => p.pergunta === pergunta);
    if (item) {
      this.chatbotMensagens.push({ remetente: 'usuário', texto: item.pergunta });
      this.chatbotMensagens.push({ remetente: 'bot', texto: item.resposta });
    }
  }

}
