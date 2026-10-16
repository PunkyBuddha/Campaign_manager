# 📜 Grimório do Mestre (RPG Campaign Manager) - D&D 5e

> **Aplicativo completo e autônomo para gerenciamento de campanhas de RPG de mesa (D&D 5ª Edição).**  
> Desenvolvido para uso pessoal com integração total ao acervo de livros e fichas do mestre, incluindo as campanhas **A Mina Perdida de Phandelver** e **A Tirania dos Dragões**.

---

## 🌟 Funcionalidades Principais

- 🛡️ **Fichas Completas dos Jogadores**: Fichas dinâmicas D&D 5e com cálculo automático de modificadores, bônus de proficiência, dados de vida, espaços de magia (1º ao 9º círculo), ataques rápidos com rolagem de dados em 1 clique, inventário e histórico.
- 🐉 **Bestiário com +1.000 Criaturas**: Base de dados integrada extraída da sua planilha e manuais oficiais (*Monster Manual*, *Volo's Guide to Monsters*, *Mordenkainen's Tome of Foes*). Inclui busca instantânea, filtros por Nível de Desafio (ND de 0 a 30) e Tipo, Statblocks autênticos e formulário para cadastro/importação em lote (JSON).
- ⚔️ **Rastreador de Iniciativa & Combate**: Adicione todo o grupo com 1 clique, role iniciativas somando Destreza automaticamente, avance turnos e rodadas com destaque visual pulsante, controle PV em tempo real e gerencie 15 condições oficiais do D&D 5e.
- 🗺️ **Módulo de Mapas & Pins de História**: Navegador de mapas com suporte a Pan e Zoom fluidos (50% a 400%), modo Tela Cheia, marcadores interativos com pulso radar, anotações visíveis para jogadores e **anotações secretas exclusivas do mestre** (armadilhas, monstros, enigmas).
- 🎵 **Estúdio de Áudio & Ambiência (100% Offline)**: Sintetizadores de áudio via Web Audio API que funcionam sem internet (Chuva & Tempestade, Fogueira, Vento de Masmorra, Tambores de Guerra, Caverna Mística), mesa de efeitos sonoros imediatos (espadas, magia de bola de fogo, crítico, dados) e player para suas músicas MP3 locais.
- 📖 **Grimório de Magias (468) & Itens Mágicos (441)**: Catálogo rápido para consulta de regras durante a sessão.
- ⚙️ **Segurança & Portabilidade Total**: Todos os dados são salvos localmente e podem ser exportados/importados em arquivos JSON de backup a qualquer momento.

---

## 🚀 Como Executar

O aplicativo é 100% autônomo e não necessita de instalação de Node.js, compiladores ou servidores externos.

### Opção 1: Executável Rápido (Windows)
Dê um duplo clique no arquivo:
```
iniciar.bat
```

### Opção 2: Pelo Navegador
Abra o arquivo `index.html` em qualquer navegador moderno (**Google Chrome, Microsoft Edge, Brave, Mozilla Firefox, Opera**):
```
duplo clique em index.html
```

---

## 👥 Heróis da Campanha Ativa (*A Mina Perdida de Phandelver*)

O aplicativo já vem pré-configurado com os 5 heróis da sua mesa real:

| Personagem | Jogador | Raça | Classe & Nível | CA | PV Atual / Máx | Percepção Passiva | Destaque |
| :--- | :--- | :--- | :--- | :---: | :---: | :---: | :--- |
| **Jeremias** | Bicas | Meio-Orc | Bárbaro Nv 2 | **16** | **7** / 27 | 10 | Defesa sem Armadura, Fúria, Ataque Descuidado |
| **Fiora** | Bruna | Elfo da Floresta | Druida Nv 2 | **15** | **16** / 16 | 14 | Ancestralidade Feérica, Forma Selvagem, Curas |
| **Andarna** | Carol | Draconata | Feiticeira Nv 2 | **15** | **14** / 14 | 14 | Sopro Flamejante, Resiliência Dracônica, Magias |
| **Fargo** | Daniel | Humano | Ladino Nv 2 | **14** | **15** / 15 | 13 | Especialização em Furtividade (+7), Ataque Furtivo |
| **Melque Sedeque** | Estevão | Anão da Colina | Clérigo da Vida Nv 2 | **18** | **20** / 20 | 15 | Resiliência dos Anões, Canalizar Divindade, Discípulo da Vida |

---

## 🗺️ Mapas Incluídos

1. **Mapa Regional de Phandalin e Costa da Espada** (`assets/maps/phandalin_map.jpg`):
   - Inclui pins cadastrados: *Vila de Phandalin*, *Esconderijo Presa de Crag (Cragmaw Hideout)*, *Mansão Tresendar*, *Caverna Onda de Eco (Wave Echo Cave)* e *Floresta de Neverwinter*.
2. **Trilha do Culto & Costa da Espada - A Tirania dos Dragões** (`assets/maps/tyranny_dragons_map.jpg`):
   - Inclui pins da rota da caravana: *Greenest*, *Elturel*, *Portão de Baldur*, *Águas Profundas (Waterdeep)* e *Poço dos Dragões (Well of Dragons)*.
3. **Cripta Tática Subterrânea** (`assets/maps/dungeon_crypt.jpg`):
   - Mapa tático para exploração de masmorras com enigmas e baús de tesouro.
4. **Mundo Conhecido (Aethelgard)** (`assets/maps/world_map.jpg`):
   - Mapa de visão geral continental.

---

## 📁 Estrutura de Pastas do Projeto

```
Campaign_manager/
│
├── index.html                   # Página principal da aplicação
├── iniciar.bat                  # Inicializador 1-clique para Windows
├── README.md                    # Documentação detalhada
│
├── css/                         # Folhas de estilo modulares
│   ├── main.css                 # Design system, layout, tipografia e botões
│   ├── sheets.css               # Estilos da ficha oficial D&D 5e e modal
│   ├── bestiary.css             # Statblocks oficiais e catálogo de monstros
│   ├── combat.css               # Rastreador de iniciativa e cartões de combate
│   ├── maps.css                 # Viewport de pan/zoom e marcadores pulsantes
│   └── audio.css                # Estúdio de ambiência e mesa de SFX
│
├── js/                          # Lógica modular em JavaScript
│   ├── app.js                   # Orquestrador geral e atalhos de teclado
│   ├── db.js                    # Mecanismo de persistência local e backup
│   ├── audio_engine.js          # Síntese Web Audio API e reprodutor offline
│   ├── dice_roller.js           # Rolador de dados com vantagem/desvantagem
│   ├── sheets.js                # Gestão de personagens dos jogadores
│   ├── bestiary.js              # Navegação no bestiário e filtros
│   ├── combat.js                # Lógica de turnos, rodadas e condições
│   ├── maps.js                  # Controle interativo de mapas e segredos
│   ├── data_monsters.js         # Base de dados com 1.075 monstros
│   ├── data_spells.js           # Catálogo com 468 magias
│   ├── data_items.js            # Catálogo com 441 itens mágicos
│   ├── data_players.js          # Dados dos 5 heróis da campanha
│   └── data_campaigns.js        # Dados de Phandelver e Tirania dos Dragões
│
├── assets/                      # Imagens e ilustrações em alta resolução
│   ├── banner.jpg               # Arte principal do dragão vermelho
│   ├── maps/                    # Mapas de campanha e táticos
│   └── characters/              # Retratos oficiais dos heróis
│
└── Base de dados/               # Acervo original de manuais, fichas e planilhas
    ├── a-mina-perdida-de-phandelver-v1-7.pdf
    ├── dd-5e-guia-do-mestre-biblioteca-elfica.pdf
    ├── dd-5e-homebrew-acertos-criticos-revisitados-biblioteca-elfica.pdf
    ├── Encounter Builder 2 (version 1).xlsb.xlsm
    └── D&D/
        ├── Fichas/              # Modelos de fichas editáveis em PDF
        ├── Erratas/             # Erratas oficiais do Livro do Jogador e Monstros
        └── [Manuais em PDF]     # Livro do Jogador, Tasha, Xanathar, Volo, etc.
```

---

## ⌨️ Atalhos Rápidos de Teclado

- Pressione a tecla **`D`** em qualquer tela para abrir ou fechar a **Bandeja Universal de Dados**.
- Pressione **`Esc`** para fechar qualquer ficha, statblock ou modal aberto.

---

## 💾 Backup e Segurança dos Dados

Todas as alterações feitas durante a sua sessão (pontos de vida alterados, novos monstros cadastrados, anotações de sessão, pins colocados no mapa) são gravadas instantaneamente no seu navegador.

Para transferir sua campanha para outro computador:
1. Abra a aba **⚙️ Backup**;
2. Clique em **💾 Baixar Arquivo de Backup (JSON)**;
3. No outro computador, use o campo **📥 Restaurar Backup** para carregar o arquivo exportado.

---

*Feito exclusivamente para uso pessoal de mesa de RPG. D&D 5e e seus termos são marcas registradas da Wizards of the Coast LLC.*
