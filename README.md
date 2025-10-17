<div align="center">
  <img width="150px" height="150px" src="public/assets/img/LOGOTIPO1.png">
  <h1>Dlux Barbearia</h1>
</div>

<div align="center">
  <img alt="License" src="https://img.shields.io/static/v1?label=license&message=CC0 1.0 Universal&color=3abcbf&labelColor=333333">
  <img src="https://img.shields.io/static/v1?label=Deploy&message=Vercel&color=3abcbf&labelColor=333333" />
  <img src="https://img.shields.io/static/v1?label=NextJS&message=v11.0.1&color=3abcbf&labelColor=333333" />
  <img src="https://img.shields.io/static/v1?label=React&message=v17.0.2&color=3abcbf&labelColor=333333" />
  <img src="https://img.shields.io/static/v1?label=Styled Components&message=v5.3.0&color=3abcbf&labelColor=333333" />
</div>

## :fire: Acesso ao Projeto

[Clique aqui](https://dlux-barbearia.vercel.app) para acessar o projeto.

[Clique aqui](https://dlux-barbearia-storybook.netlify.app/) para acessar a nossa documentação da UI.

## :dart: Objetivo

Com a proposta de criar um projeto para a **Dlux Barbearia**, desenvolvemos um website moderno e elegante que traz uma nova forma de comunicação com os clientes. Foi realizado um estudo de caso para entender as necessidades do público-alvo da empresa, permitindo escolher fontes, formas e cores capazes de estabelecer uma comunicação eficiente com os clientes.

O projeto foi desenvolvido com foco em:
- **Performance otimizada** com NextJS
- **Design responsivo** e moderno
- **Experiência do usuário** intuitiva
- **SEO otimizado** para melhor indexação no Google
- **Sistema de avaliações** integrado

## :hammer_and_wrench: Ferramentas

- [TypeScript](https://www.typescriptlang.org/)
- [NextJS](https://nextjs.org/)
- [Styled Components](https://styled-components.com/)
- [Storybook](https://storybook.js.org/)
- [Jest](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro)
- [Eslint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Husky](https://github.com/typicode/husky)
- [Axios](https://axios-http.com/docs/intro)
- [GraphQL](https://graphql.org)

## :construction: Variáveis de Ambiente

Chave | Descrição |
---------|--------|
`GRAPHQL_HOST` | URL da API que utiliza comunicação GraphQL. |
`GRAPHQL_TOKEN` | Token para o acesso da API ser aceito. |
`MODEL_ID` | Caso utilize o Dato CMS insira o ID da model em que se armazenará os dados, caso contrário adapte da forma da qual será usada. |
`NEXT_PUBLIC_MAPBOX_API_KEY` | Token de acesso ao mapbox. |
`NEXT_PUBLIC_MAPBOX_USERID` | Nome do usuário da conta do mapbox |
`NEXT_PUBLIC_MAPBOX_STYLEID` | ID para acesso a estilização do mapbox. |

## :rocket: Como iniciar a aplicação localmente
 
 ### Faça um clone desse repositório
 
 ```bash
 git clone https://github.com/pkzinx/Dlux-Barbearia
 ```
 
### Instale as dependências

```bash
 yarn install
 ```
 
 ### Configure as variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```bash
GRAPHQL_HOST=https://graphql.datocms.com/
GRAPHQL_TOKEN=demo-token
NODE_OPTIONS=--openssl-legacy-provider
```

 ### Dê start ao projeto
 
 ```bash
 yarn dev
 ```

Para acessar pelo celular na mesma rede Wi-Fi:
```bash
yarn dev --hostname 0.0.0.0
```

## :star: Funcionalidades

- **Design Responsivo**: Adaptado para desktop, tablet e mobile
- **Slider Horizontal**: Banner principal com navegação intuitiva
- **Sistema de Serviços**: Corte, barba e combo com tempos estimados
- **Equipe**: Apresentação dos 5 profissionais com fotos em formato bolha
- **Avaliações**: Sistema de feedback integrado com DatoCMS
- **Formulário de Contato**: Com seleção de profissional que atendeu
- **Mapa Interativo**: Localização da barbearia
- **SEO Otimizado**: Meta tags e estrutura para melhor indexação

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

## :phone: Contato

- **Instagram**: [@dlux_barbearia_](https://www.instagram.com/dlux_barbearia_/)
- **WhatsApp**: +55 11 98654-8715
- **Endereço**: Rua Caminho Encanto 334 - Guarulhos - SP
