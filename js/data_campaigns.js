const DEFAULT_CAMPAIGNS = [
  {
    id: "camp_phandelver",
    name: "A Mina Perdida de Phandelver",
    status: "Em Andamento (Ativa)",
    levelRange: "Níveis 1 ao 5",
    description: "Os aventureiros escoltam suprimentos para a pequena vila de Phandalin e descobrem que os irmãos Buscapedra foram capturados pelos goblins Presa de Crag e pelo misterioso 'Aranha Negra'.",
    banner: "assets/maps/phandalin_map.jpg",
    currentLocation: "Trilha de Phandalin / Esconderijo Presa de Crag",
    notes: `### Registro da Campanha - A Mina Perdida de Phandelver
- **Objetivo Atual**: Investigar o paradeiro de Gundren Buscapedra e Sildar Hallwinter.
- **Grupo**: Jeremias (Bárbaro), Fiora (Druida), Andarna (Feiticeira), Fargo (Ladino), Melque Sedeque (Clérigo).
- **Último Combate**: Emboscada Goblin na Trilha Triboar. Jeremias sofreu ferimentos e está com 7 PV.
- **Locais Descobertos**:
  * Phandalin (Vila mineradora calma, mas oprimida pelos Marcas Vermelhas).
  * Esconderijo Presa de Crag (Caverna cheia de goblins e liderada pelo bugbear Klarg).
  * Mansão Tresendar (Base dos rufiões Marca Vermelha sob a vila).
  * Castelo Cragmaw (Fortaleza na floresta de Neverwinter Wood).
  * Caverna Onda de Eco (Local da lendária Forja das Magias).`,
    maps: [
      {
        id: "map_phandalin",
        title: "Mapa Regional de Phandalin e Costa da Espada",
        imageUrl: "assets/maps/phandalin_map.jpg",
        pins: [
          {
            id: "pin_1",
            x: 54.5,
            y: 57.5,
            title: "Vila de Phandalin",
            category: "Cidade",
            desc: "Pequena vila mineradora fronteiriça. Ponto de comércio e descanso.",
            secret: "Os rufiões Marca Vermelha cobram propina na Taverna Pedra de Dormir e se escondem sob a Mansão Tresendar."
          },
          {
            id: "pin_2",
            x: 77.2,
            y: 40.5,
            title: "Esconderijo Presa de Crag (Cragmaw Hideout)",
            category: "Masmorra / Covil",
            desc: "Caverna natural onde corre um riacho. Covil dos goblins que emboscaram Gundren.",
            secret: "Klarg possui um lobo chamado Ripper e guarda baús com suprimentos roubados da Companhia dos Leões."
          },
          {
            id: "pin_3",
            x: 60.5,
            y: 43.5,
            title: "Mansão Tresendar",
            category: "Ruína",
            desc: "Antiga mansão nobre em ruínas no alto da colina a leste de Phandalin.",
            secret: "Esconderijo de Glasstaff (Iarno Albrek), com um Nothic telepático nas fendas subterrâneas."
          },
          {
            id: "pin_4",
            x: 62.8,
            y: 83.5,
            title: "Caverna Onda de Eco (Wave Echo Cave)",
            category: "Lenda / Destino",
            desc: "A lendária mina perdida dos anões e gnomos do Pacto de Phandelver.",
            secret: "Nezznar, o Aranha Negra (mago drow) está tentando decifrar os segredos da Forja das Magias."
          },
          {
            id: "pin_5",
            x: 43.5,
            y: 28.5,
            title: "Floresta de Neverwinter (Neverwinter Wood)",
            category: "Ermos / Perigo",
            desc: "Vasta e ancestral floresta ao norte. Lar de aranhas gigantes, druidas e o Castelo Cragmaw.",
            secret: "Um jovem dragão verde chamado Venelith habita a vila em ruínas de Thundertree nas profundezas."
          }
        ]
      },
      {
        id: "map_dungeon_crypt",
        title: "Cripta Esquecida de Tresendar (Tático)",
        imageUrl: "assets/maps/dungeon_crypt.jpg",
        pins: [
          {
            id: "pin_c1",
            x: 50.0,
            y: 50.0,
            title: "Altar Arcano de Runas Azuis",
            category: "Enigma / Magia",
            desc: "Altar talhado em pedra vulcânica que pulsa suavemente com luz fria.",
            secret: "Inserir o símbolo de Phandelver dissipa o campo de proteção dos sarcófagos vizinhos."
          },
          {
            id: "pin_c2",
            x: 18.0,
            y: 86.0,
            title: "Câmara dos Baús",
            category: "Tesouro",
            desc: "Baús de madeira reforçada e barris de ferro.",
            secret: "Contém 120 PO, poção de cura e um pergaminho de Escudo Arcano."
          }
        ]
      }
    ]
  },
  {
    id: "camp_tyranny",
    name: "A Tirania dos Dragões",
    status: "Planejada (Futura)",
    levelRange: "Níveis 1 ao 15",
    description: "O Culto do Dragão busca libertar a rainha dos dragões cromáticos de cinco cabeças, Tiamat, dos Nove Infernos para dominar toda Faerûn.",
    banner: "assets/maps/tyranny_dragons_map.jpg",
    currentLocation: "Greenest (Em preparação)",
    notes: `### Preparação da Campanha - A Tirania dos Dragões
- **Módulo 1**: O Tesouro da Rainha Dragão (Hoard of the Dragon Queen)
- **Módulo 2**: A Ascensão de Tiamat (The Rise of Tiamat)
- **Cidades-Chave**:
  * Greenest (Início épico sob ataque do dragão azul Lennithoc).
  * Elturel (Encontro com Ontharr Frume e Leosin D'Erthel).
  * Portão de Baldur (Caravana pela Estrada do Comércio).
  * Águas Profundas (Conselho das Grandes Facções: Harpistas, Ordem da Manopla, Enclave Esmeralda, Aliança dos Lordes, Zhentarim).
  * Poço dos Dragões (O templo onde Severin tentará o ritual de invocação).`,
    maps: [
      {
        id: "map_cult_trail",
        title: "Mapa Regional da Trilha do Culto e Costa da Espada",
        imageUrl: "assets/maps/tyranny_dragons_map.jpg",
        pins: [
          {
            id: "pin_t1",
            x: 56.5,
            y: 92.0,
            title: "Greenest",
            category: "Ponto de Partida",
            desc: "Cidade pacata atacada na calada da noite por cultistas e dragão azul.",
            secret: "Severin ordenou saquear todos os assentamentos para reunir o maior tesouro dragônico da história."
          },
          {
            id: "pin_t2",
            x: 55.0,
            y: 70.0,
            title: "Elturel",
            category: "Cidade Sagrada",
            desc: "Fortaleza dos Cavaleiros do Sol e dos companheiros paladinos.",
            secret: "Base de apoio para investigar o rastro do ouro roubado que sobe para o norte."
          },
          {
            id: "pin_t3",
            x: 48.0,
            y: 53.0,
            title: "Portão de Baldur (Baldur's Gate)",
            category: "Metrópole",
            desc: "Grande cidade portuária movimentada e corrupta onde caravanas partem para Waterdeep.",
            secret: "Cultistas disfarçados de mercadores estão escondendo caixotes de tesouro na caravana."
          },
          {
            id: "pin_t4",
            x: 38.0,
            y: 30.0,
            title: "Águas Profundas (Waterdeep)",
            category: "Capital",
            desc: "A Cidade dos Esplendores, onde os Lordes de Waterdeep reúnem o Conselho Antidragões.",
            secret: "Espiões do culto infiltraram a nobreza local."
          },
          {
            id: "pin_t5",
            x: 70.0,
            y: 25.0,
            title: "Poço dos Dragões (Well of Dragons)",
            category: "Covil Final",
            desc: "Cratera vulcânica ancestral no sopé das Montanhas do Pôr do Sol.",
            secret: "Onde o altar das 5 Máscaras dos Dragões será utilizado para abrir o portal de Tiamat."
          }
        ]
      }
    ]
  }
];
