### 🌍 Quiz de Países com Bandeiras
Um jogo interativo de perguntas e respostas sobre países e suas bandeiras.
O objetivo é testar seus conhecimentos de geografia de forma divertida e dinâmica.

#### 🚀 Funcionalidades
- Exibe a bandeira de um país e o jogador deve escolher o nome correto.
- 20 questões por partida.
- Cada questão tem 10 segundos para ser respondida.
- Se o tempo acabar ou o jogador responder, o quiz mostra a resposta correta e avança automaticamente após 5 segundos.
- Tradução dos nomes dos países para português do Brasil usando o arquivo countries-pt.json.
- Barra de progresso mostrando o avanço no quiz.
- Exibição da pontuação em tempo real.
- Botão Iniciar para começar o jogo.
- Botão Tentar novamente no fim do quiz para reiniciar.
- Bloqueio dos botões após uma resposta (somente uma tentativa por questão).

#### 📂 Estrutura do Projeto

```
quiz-paises/
│
├── index.html        # Estrutura principal da aplicação
├── style.css         # Estilos visuais
├── script.js         # Lógica do jogo
└── countries-pt.json # Lista completa de países traduzidos para português
```

#### ⚙️ Como executar
- Clone ou baixe este repositório.
- Certifique-se de que todos os arquivos (index.html, style.css, script.js, countries-pt.json) estejam na mesma pasta.
- Abra o arquivo index.html em um navegador moderno (Chrome, Edge, Firefox).
- Clique em Iniciar para começar o quiz.

#### 📖 Dependências
- RestCountries API – fornece dados de países e bandeiras.
- Arquivo countries-pt.json – contém os nomes dos países traduzidos para português do Brasil.

#### 📝 Personalização
- Alterar o tempo de resposta (timeLeft) no script.js.
- Alterar o tempo de intervalo entre questões (atualmente 5 segundos).
- Modificar o número de questões (atualmente 20).
- Estilizar os botões e layout editando o style.css.

#### 🎯 Objetivo
Este projeto é ideal para:
- Estudantes de geografia.
- Professores que desejam usar como recurso didático.
- Jogadores que gostam de desafios rápidos e educativos.

#### 📜 Licença
Este projeto é de uso livre para fins educacionais e pessoais.