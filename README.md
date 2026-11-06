# 🛡️ Portal de Segurança Digital e Cidadania Online

Portal educativo, em português (pt-BR), sobre **segurança digital, privacidade e cidadania online**. Reúne orientações práticas para que jovens, famílias e comunidades naveguem na internet com mais privacidade, segurança e consciência — acompanhado de um **quiz interativo** para fixar o aprendizado.

Projeto de extensão. 
---

## ✨ Funcionalidades

- **Conteúdo educativo** organizado em três eixos:
  1. **Privacidade Digital e Superexposição** — pegada digital, *oversharing* e engenharia social.
  2. **Segurança da Informação** — senhas e gerenciadores, *phishing*/golpes financeiros, Wi-Fi público e autenticação multifator (MFA/2FA).
  3. **Cyberbullying e Saúde Mental** — manifestações, consequências e como agir e se defender legalmente.
- **Quiz interativo** (`quiz.html`) com:
  - Banco de 7 perguntas, sorteando **5 por rodada**.
  - Embaralhamento de perguntas e alternativas (algoritmo **Fisher-Yates**).
  - Feedback visual imediato (acerto/erro) e tela de resultado com pontuação.
  - Botão para jogar novamente.
- **Seletor de temas** (Padrão, Ocean, Sunset, Forest) com preferência salva em `localStorage` e sincronizada entre as páginas.
- **Layout responsivo** com navegação por âncoras, cards e acordeões.
- **Infográficos** complementares em HTML e PDF.

---

## 📁 Estrutura do projeto

```
Guia-Seg-Digital/
├── index.html              # Página principal do portal (conteúdo educativo)
├── quiz.html               # Página do quiz interativo
├── quiz.js                 # Lógica do quiz (banco de perguntas, sorteio, pontuação)
├── script.js               # Seletor de temas + ano do rodapé (página principal)
├── styles.css              # Estilos e variáveis de tema (CSS)
├── infografico.html        # Infográfico (versão escura)
├── infografico.pdf
├── infografico-claro.html  # Infográfico (versão clara)
└── infografico-claro.pdf
```

---

## 🚀 Como executar

O projeto é estático (HTML, CSS e JavaScript puro), sem dependências ou build.

### Opção 1 — Abrir direto no navegador
Abra o arquivo `index.html` no navegador.

### Opção 2 — Servidor local (recomendado)
Servir via HTTP garante o funcionamento correto do `localStorage` e dos caminhos relativos.

```bash
# Python 3
python -m http.server 8000
```

Depois acesse: <http://localhost:8000>

> No Windows com PowerShell, o comando acima funciona da mesma forma caso o Python esteja instalado.

---

## 🎨 Temas disponíveis

| Tema    | Cor primária |
|---------|--------------|
| Padrão  | Azul         |
| Ocean   | Ciano        |
| Sunset  | Rosa/laranja |
| Forest  | Verde        |

A escolha é persistida no navegador e aplicada também na página do quiz.

---

## 🧰 Tecnologias

- HTML5
- CSS3 (variáveis CSS para temas)
- JavaScript (vanilla, sem frameworks)

---


