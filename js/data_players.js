const DEFAULT_PLAYERS = [
  {
    id: "char_1",
    name: "Jeremias",
    playerName: "Bicas",
    race: "Meio-Orc",
    characterClass: "Bárbaro",
    level: 2,
    xp: 300,
    alignment: "Caótico e Bom",
    avatar: "assets/characters/thorin.jpg",
    ac: 16,
    hpMax: 27,
    hpCurrent: 7,
    hpTemp: 0,
    hitDice: "2d12",
    speed: 30,
    initiativeMod: 3,
    passivePerception: 10,
    proficiencyBonus: 2,
    inspiration: false,
    stats: {
      str: 16,
      dex: 16,
      con: 16,
      int: 10,
      wis: 12,
      cha: 10
    },
    saves: {
      str: true,
      con: true,
      dex: false,
      int: false,
      wis: false,
      cha: false
    },
    skills: {
      athletics: true,
      intimidation: true,
      survival: true,
      perception: false
    },
    traits: [
      { name: "Fúria", desc: "2 vezes por descanso longo. +2 dano corpo a corpo, vantagem em testes de Força, resistência a concussão, cortante e perfurante." },
      { name: "Defesa Sem Armadura", desc: "CA = 10 + mod Des + mod Con (16)." },
      { name: "Ataque Descuidado", desc: "Vantagem nos ataques corpo a corpo com Força, mas ataques contra você também têm vantagem até seu próximo turno." },
      { name: "Sentido do Perigo", desc: "Vantagem em salvaguardas de Destreza contra armadilhas e magias visíveis." },
      { name: "Resistência Implacável", desc: "Uma vez por descanso longo, ao cair a 0 PV cai a 1 PV em vez disso." }
    ],
    attacks: [
      { name: "Machado Grande", bonus: "+5", damage: "1d12+3 Cortante (+2 em fúria)" },
      { name: "Azagaia (Alcance 9/36m)", bonus: "+5", damage: "1d6+3 Perfurante" }
    ],
    spellSlots: {},
    spells: [],
    inventory: "Mochila do Explorador, 4x Azagaias, Amuleto de osso orc, Roupas de viajante, 10 PO.",
    notes: "Campanha: A Mina Perdida de Phandelver. Ferido no último confronto."
  },
  {
    id: "char_2",
    name: "Fiora",
    playerName: "Bruna",
    race: "Elfo da Floresta",
    characterClass: "Druida",
    level: 2,
    xp: 300,
    alignment: "Neutro e Bom",
    avatar: "assets/characters/lyra.jpg",
    ac: 15,
    hpMax: 16,
    hpCurrent: 16,
    hpTemp: 0,
    hitDice: "2d8",
    speed: 35,
    initiativeMod: 2,
    passivePerception: 14,
    proficiencyBonus: 2,
    inspiration: true,
    stats: {
      str: 10,
      dex: 14,
      con: 15,
      int: 12,
      wis: 16,
      cha: 10
    },
    saves: {
      int: true,
      wis: true,
      str: false,
      dex: false,
      con: false,
      cha: false
    },
    skills: {
      nature: true,
      perception: true,
      animalHandling: true,
      survival: true
    },
    traits: [
      { name: "Ancestralidade Feérica", desc: "Vantagem contra ser encantado; magia não pode colocar para dormir." },
      { name: "Forma Selvagem", desc: "2 vezes por descanso curto/longo. Transforma-se em besta de ND 1/4 (sem voo/natação)." },
      { name: "Máscara da Natureza", desc: "Pode tentar se esconder mesmo em folhagem leve, chuva forte ou névoa." }
    ],
    attacks: [
      { name: "Bordão (Foco Druídico)", bonus: "+2", damage: "1d6 Contundente" },
      { name: "Cimitarra", bonus: "+4", damage: "1d6+2 Cortante" }
    ],
    spellSlots: {
      1: { max: 3, used: 1 }
    },
    spells: [
      { name: "Bordão Místico (Shillelagh)", level: 0, school: "Transmutação", desc: "Arma causa 1d8+3 com Sabedoria." },
      { name: "Criar Chamas", level: 0, school: "Conjuração", desc: "1d8 de fogo ou ilumina 3m." },
      { name: "Curar Ferimentos", level: 1, school: "Evocação", desc: "Cura 1d8 + 3 PV." },
      { name: "Emaranhar", level: 1, school: "Conjuração", desc: "Área de 6m prende inimigos (Força CD 13)." },
      { name: "Falar com Animais", level: 1, school: "Adivinhação", desc: "Comunicação com bestas por 10 min." }
    ],
    inventory: "Gibão de couro, Escudo de madeira, Foco druídico (ramo de visco), Kit de herbalismo, 15 PO.",
    notes: "Protetora da floresta ao redor de Phandalin e Neverwinter Wood."
  },
  {
    id: "char_3",
    name: "Andarna",
    playerName: "Carol",
    race: "Draconata (Dourada)",
    characterClass: "Feiticeira",
    level: 2,
    xp: 300,
    alignment: "Caótico e Bom",
    avatar: "assets/characters/eldrin.jpg",
    ac: 15,
    hpMax: 14,
    hpCurrent: 14,
    hpTemp: 0,
    hitDice: "2d6",
    speed: 30,
    initiativeMod: 2,
    passivePerception: 14,
    proficiencyBonus: 2,
    inspiration: false,
    stats: {
      str: 10,
      dex: 14,
      con: 14,
      int: 12,
      wis: 10,
      cha: 16
    },
    saves: {
      con: true,
      cha: true,
      str: false,
      dex: false,
      int: false,
      wis: false
    },
    skills: {
      arcana: true,
      persuasion: true,
      intimidation: true
    },
    traits: [
      { name: "Arma de Sopro (Fogo)", desc: "Cone de 4,5m de chamas. Causa 2d6 de fogo (Destreza CD 12 metade). 1x por descanso." },
      { name: "Resistência Dracônica", desc: "Resistência a dano de fogo. CA sem armadura = 13 + Des (15)." },
      { name: "Fonte de Magia", desc: "2 Pontos de Feitiçaria para converter em espaços de magia ou metamagia futura." }
    ],
    attacks: [
      { name: "Raio de Fogo (Truque)", bonus: "+5", damage: "1d10 Fogo (Alcance 36m)" },
      { name: "Adaga Cerimonial", bonus: "+4", damage: "1d4+2 Perfurante" }
    ],
    spellSlots: {
      1: { max: 3, used: 0 }
    },
    spells: [
      { name: "Raio de Fogo", level: 0, school: "Evocação", desc: "1d10 dano de fogo." },
      { name: "Prestidigitação", level: 0, school: "Transmutação", desc: "Efeitos mágicos menores." },
      { name: "Mãos Mágicas", level: 0, school: "Conjuração", desc: "Mão espectral manipuladora." },
      { name: "Mãos Flamejantes", level: 1, school: "Evocação", desc: "Cone de 4,5m, 3d6 de fogo (Des CD 13)." },
      { name: "Escudo Arcano (Shield)", level: 1, school: "Abjuração", desc: "Reação: +5 CA e imune a Mísseis Mágicos." },
      { name: "Orbe Cromática", level: 1, school: "Evocação", desc: "3d8 de dano elemental à escolha." }
    ],
    inventory: "Bolsa de componentes arcanos, Adaga dourada, Foco arcano de cristal âmbar, Roupas nobres, 25 PO.",
    notes: "Carrega o sangue dos dragões dourados ancestrais."
  },
  {
    id: "char_4",
    name: "Fargo",
    playerName: "Daniel",
    race: "Humano",
    characterClass: "Ladino",
    level: 2,
    xp: 300,
    alignment: "Neutro",
    avatar: "assets/characters/lyra.jpg",
    ac: 14,
    hpMax: 15,
    hpCurrent: 15,
    hpTemp: 0,
    hitDice: "2d8",
    speed: 30,
    initiativeMod: 3,
    passivePerception: 13,
    proficiencyBonus: 2,
    inspiration: false,
    stats: {
      str: 9,
      dex: 16,
      con: 16,
      int: 14,
      wis: 12,
      cha: 12
    },
    saves: {
      dex: true,
      int: true,
      str: false,
      con: false,
      wis: false,
      cha: false
    },
    skills: {
      stealth: true,
      sleightOfHand: true,
      investigation: true,
      acrobatics: true,
      deception: true
    },
    traits: [
      { name: "Especialização (Expertise)", desc: "Bônus de proficiência duplicado em Furtividade (+7) e Ferramentas de Ladrão (+7)." },
      { name: "Ataque Furtivo", desc: "Causa +1d6 de dano extra uma vez por turno se tiver vantagem ou aliado adjacente." },
      { name: "Ação Astuta (Cunning Action)", desc: "Pode usar Ação Bônus para Correr, Disparar ou Esconder-se a cada turno." },
      { name: "Gíria de Ladrão", desc: "Conhece dialetos e símbolos secretos do submundo." }
    ],
    attacks: [
      { name: "Espada Curta", bonus: "+5", damage: "1d6+3 Perfurante (+1d6 furtivo)" },
      { name: "Arco Curto (Alcance 24/96m)", bonus: "+5", damage: "1d6+3 Perfurante (+1d6 furtivo)" },
      { name: "Adaga Oculta", bonus: "+5", damage: "1d4+3 Perfurante" }
    ],
    spellSlots: {},
    spells: [],
    inventory: "Armadura de couro batido, Ferramentas de Ladrão, Pé de cabra, 20 flechas, Corda de seda (15m), 18 PO.",
    notes: "Especialista em desarmar armadilhas nas masmorras de Phandelver."
  },
  {
    id: "char_5",
    name: "Melque Sedeque",
    playerName: "Estevão",
    race: "Anão da Colina",
    characterClass: "Clérigo",
    level: 2,
    xp: 300,
    alignment: "Leal e Bom",
    avatar: "assets/characters/alistair.jpg",
    ac: 18,
    hpMax: 20,
    hpCurrent: 20,
    hpTemp: 0,
    hitDice: "2d8",
    speed: 25,
    initiativeMod: 3,
    passivePerception: 15,
    proficiencyBonus: 2,
    inspiration: false,
    stats: {
      str: 10,
      dex: 16,
      con: 16,
      int: 10,
      wis: 16,
      cha: 12
    },
    saves: {
      wis: true,
      cha: true,
      str: false,
      dex: false,
      con: false,
      int: false
    },
    skills: {
      religion: true,
      insight: true,
      medicine: true,
      history: true
    },
    traits: [
      { name: "Resiliência dos Anões", desc: "Vantagem contra veneno e resistência a dano de veneno." },
      { name: "Tenacidade dos Anões", desc: "+1 PV adicional a cada nível (já computado no HP máx 20)." },
      { name: "Discípulo da Vida", desc: "Magias de cura restauram 2 + nível da magia de PV adicionais." },
      { name: "Canalizar Divindade: Preservar a Vida", desc: "1x por descanso. Cura até 10 PV divididos entre aliados abaixo de 50% de PV." }
    ],
    attacks: [
      { name: "Maça Abençoada", bonus: "+2", damage: "1d6 Contundente" },
      { name: "Chama Sagrada (Truque)", bonus: "CD 13 Des", damage: "1d8 Radiante (Alcance 18m, sem cobertura)" }
    ],
    spellSlots: {
      1: { max: 3, used: 0 }
    },
    spells: [
      { name: "Chama Sagrada", level: 0, school: "Evocação", desc: "1d8 dano radiante." },
      { name: "Orientação (Guidance)", level: 0, school: "Adivinhação", desc: "+1d4 em um teste de habilidade." },
      { name: "Luz", level: 0, school: "Evocação", desc: "Objeto emite luz brilhante por 6m." },
      { name: "Bênção (Bless)", level: 1, school: "Encantamento", desc: "+1d4 em ataques e salvaguardas de 3 aliados." },
      { name: "Curar Ferimentos", level: 1, school: "Evocação", desc: "Cura 1d8 + 3 + 3 (Vida) = 1d8+6 PV." },
      { name: "Palavra de Cura (Healing Word)", level: 1, school: "Evocação", desc: "Ação bônus, alcance 18m: cura 1d4 + 3 + 3 (Vida)." },
      { name: "Escudo da Fé", level: 1, school: "Abjuração", desc: "+2 CA para um aliado por até 10 min." }
    ],
    inventory: "Cota de Escamas, Escudo de aço com símbolo solar de Lathander, Símbolo Sagrado, Mochila do Sacerdote, 12 PO.",
    notes: "Clérigo devoto do Domínio da Vida, guardião da esperança em Phandalin."
  }
];
