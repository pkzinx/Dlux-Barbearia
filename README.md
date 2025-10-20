<div align="center">
  <img width="150px" height="150px" src="public/assets/img/LOGOTIPO1.png">
  <h1>Dlux Barbearia</h1>
  <p>Sistema completo de gestão para barbearia com frontend moderno e backend robusto</p>
</div>

<div align="center">
  <img alt="License" src="https://img.shields.io/static/v1?label=license&message=CC0 1.0 Universal&color=3abcbf&labelColor=333333">
  <img src="https://img.shields.io/static/v1?label=Deploy&message=Vercel&color=3abcbf&labelColor=333333" />
  <img src="https://img.shields.io/static/v1?label=NextJS&message=v11.0.1&color=3abcbf&labelColor=333333" />
  <img src="https://img.shields.io/static/v1?label=React&message=v17.0.2&color=3abcbf&labelColor=333333" />
  <img src="https://img.shields.io/static/v1?label=Django&message=v4.2&color=3abcbf&labelColor=333333" />
  <img src="https://img.shields.io/static/v1?label=Styled Components&message=v5.3.0&color=3abcbf&labelColor=333333" />
</div>

## :fire: Acesso ao Projeto

[Clique aqui](https://dlux-barbearia.vercel.app) para acessar o projeto.

[Clique aqui](https://dlux-barbearia-storybook.netlify.app/) para acessar a nossa documentação da UI.

## :dart: Objetivo

Com a proposta de criar um projeto completo para a **Dlux Barbearia**, desenvolvemos um sistema moderno e elegante que traz uma nova forma de comunicação com os clientes e gestão interna. O projeto foi desenvolvido com arquitetura full-stack, oferecendo tanto uma experiência pública para clientes quanto um painel administrativo para gestão.

### Características Principais:
- **Frontend moderno** com NextJS e TypeScript
- **Backend robusto** com Django REST Framework
- **Design responsivo** e intuitivo
- **Sistema de agendamentos** completo
- **Painel administrativo** para gestão
- **API REST** para integração
- **SEO otimizado** para melhor indexação

## 🏗️ Arquitetura do Projeto

```
Dlux-Barbearia/
├── frontend/                 # Aplicação Next.js
│   ├── src/
│   │   ├── components/      # Componentes UI (Atomic Design)
│   │   ├── pages/          # Páginas e rotas
│   │   ├── contexts/       # Contextos React
│   │   ├── graphql/        # Queries e tipos GraphQL
│   │   ├── styles/         # Estilos globais e tema
│   │   └── utils/          # Utilitários e helpers
│   └── public/             # Assets estáticos
└── backend/                # API Django
    ├── core/               # Configurações Django
    ├── scheduler/          # App de agendamentos
    └── manage.py           # Script de gerenciamento
```

## :hammer_and_wrench: Tecnologias

### Frontend
- [TypeScript](https://www.typescriptlang.org/) - Tipagem estática
- [NextJS](https://nextjs.org/) - Framework React
- [Styled Components](https://styled-components.com/) - CSS-in-JS
- [Storybook](https://storybook.js.org/) - Documentação de componentes
- [Jest](https://jestjs.io/) - Testes unitários
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro) - Testes de componentes
- [Eslint](https://eslint.org/) - Linting
- [Prettier](https://prettier.io/) - Formatação de código
- [Husky](https://github.com/typicode/husky) - Git hooks
- [Axios](https://axios-http.com/docs/intro) - Cliente HTTP
- [GraphQL](https://graphql.org) - Query language

### Backend
- [Django](https://www.djangoproject.com/) - Framework Python
- [Django REST Framework](https://www.django-rest-framework.org/) - API REST
- [SQLite](https://www.sqlite.org/) - Banco de dados
- [Python](https://www.python.org/) - Linguagem de programação

## :construction: Variáveis de Ambiente

### Frontend (.env.local)
```bash
GRAPHQL_HOST=https://graphql.datocms.com/
GRAPHQL_TOKEN=demo-token
NODE_OPTIONS=--openssl-legacy-provider
NEXT_PUBLIC_MAPBOX_API_KEY=your_mapbox_key
NEXT_PUBLIC_MAPBOX_USERID=your_mapbox_user
NEXT_PUBLIC_MAPBOX_STYLEID=your_mapbox_style
```

### Backend (.env)
```bash
SECRET_KEY=your_django_secret_key
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
DATABASE_URL=sqlite:///db.sqlite3
```

## :rocket: Como iniciar a aplicação localmente

### Pré-requisitos
- Node.js (v16 ou superior)
- Python (v3.8 ou superior)
- Yarn ou npm

### 1. Clone o repositório
```bash
git clone https://github.com/pkzinx/Dlux-Barbearia
cd Dlux-Barbearia
```

### 2. Frontend (Next.js)

```bash
# Instale as dependências
yarn install

# Configure as variáveis de ambiente
cp .env.example .env.local

# Inicie o servidor de desenvolvimento
yarn dev
```

Para acessar pelo celular na mesma rede Wi-Fi:
```bash
yarn dev --hostname 0.0.0.0
```

### 3. Backend (Django)

```bash
cd backend

# Crie um ambiente virtual
python -m venv venv

# Ative o ambiente virtual
# Windows
venv\Scripts\activate
# Linux/Mac
source venv/bin/activate

# Instale as dependências
pip install -r requirements.txt

# Execute as migrações
python manage.py migrate

# Crie um superusuário (opcional)
python manage.py createsuperuser

# Inicie o servidor
python manage.py runserver
```

## :star: Funcionalidades

### 🎨 Frontend Público
- **Design Responsivo**: Adaptado para desktop, tablet e mobile
- **Slider Horizontal**: Banner principal com navegação intuitiva
- **Sistema de Serviços**: Corte, barba e combo com tempos estimados
- **Equipe**: Apresentação dos profissionais com fotos
- **Avaliações**: Sistema de feedback integrado
- **Formulário de Contato**: Com seleção de profissional
- **Mapa Interativo**: Localização da barbearia
- **SEO Otimizado**: Meta tags e estrutura para melhor indexação

### 🔧 Painel Administrativo
- **Dashboard**: Visão geral dos agendamentos
- **Gestão de Agendamentos**: Visualização e edição de agendamentos
- **Controle Financeiro**: Relatórios de receita
- **Perfil do Barbeiro**: Gerenciamento de dados pessoais
- **Sistema de Login**: Autenticação segura

### 🚀 Backend API
- **REST API**: Endpoints para CRUD de agendamentos
- **Autenticação**: Sistema de permissões
- **Modelos de Dados**: Barbeiros, serviços, agendamentos
- **Admin Interface**: Painel administrativo Django

## 📱 Componentes UI (Atomic Design)

### Atoms
- Button, Input, Title, Subtitle
- Background, Container, Logotipo
- SocialMedia, Stars, UserInfo

### Molecules
- InputGroup, SelectGroup, TextAreaGroup
- NavBar, MenuMobile, Slider
- ModalForm, ReviewBox, ServiceBox

### Organisms
- Header, Footer, Banner
- MainServices, Review, SectionAbout
- SectionContact, SectionContributors

### Templates
- HomePage, PanelLayout

## :team: Equipe

- **Rikelv** - Barbeiro
- **Emerso** - Barbeiro  
- **Kaue** - Barbeiro
- **Kevin** - Barbeiro
- **Alafi** - Barbeiro

## :gear: Serviços Oferecidos

- **Corte de Cabelo Masculino** - R$ 30,00 (30 min)
- **Barba** - R$ 20,00 (20 min)
- **Corte + Barba** - R$ 35,00 (50 min)

## 🧪 Testes

```bash
# Frontend
yarn test
yarn test:coverage

# Backend
python manage.py test
```

## 📚 Documentação

- **Storybook**: Documentação visual dos componentes
- **API Docs**: Documentação da API REST (quando disponível)
- **README**: Este arquivo com instruções completas

## :phone: Contato

- **Instagram**: [@dlux_barbearia_](https://www.instagram.com/dlux_barbearia_/)
- **WhatsApp**: +55 11 98654-8715
- **Endereço**: Rua Caminho Encanto 334 - Guarulhos - SP

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença CC0 1.0 Universal. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

<div align="center">
  <p>Desenvolvido com ❤️ para a Dlux Barbearia</p>
</div>