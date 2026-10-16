/**
 * Grimório do Mestre - Base de Dados de Classes & Subclasses (D&D 5e em Português)
 * Progressão completa de níveis 1 a 20, dados de vida, salvaguardas,
 * espaços de magia e características de classes e subclasses.
 */

const DND5E_CLASSES = {
  "Bárbaro": {
    name: "Bárbaro",
    nameEn: "Barbarian",
    hitDie: "d12",
    primaryAttr: "str",
    saves: ["str", "con"],
    spellcasting: null,
    levels: {
      1: [
        { name: "Fúria", desc: "Em combate você entra em frenesi de batalha com uma ação bônus. Vantagem em testes e salvaguardas de Força; bônus no dano corpo a corpo (+2 no Nv 1, +3 no Nv 9, +4 no Nv 16); e resistência a dano de concussão, cortante e perfurante. Dura 1 minuto." },
        { name: "Defesa Sem Armadura (Bárbaro)", desc: "Enquanto não estiver vestindo armadura, sua CA é igual a 10 + Mod. DES + Mod. CON. Você pode empunhar um escudo e ainda receber esse benefício." }
      ],
      2: [
        { name: "Ataque Descuidado (Reckless Attack)", desc: "Ao fazer seu primeiro ataque no turno, você pode optar por ter vantagem nas jogadas de ataque corpo a corpo com Força neste turno. Porém, todas as jogadas de ataque contra você ganham vantagem até seu próximo turno." },
        { name: "Sentido de Perigo (Danger Sense)", desc: "Vantagem em salvaguardas de Destreza contra armadilhas, magias e efeitos que você possa ver, desde que não esteja cego, surdo ou incapacitado." }
      ],
      3: [
        { name: "Caminho Primitivo", desc: "Você escolhe o Caminho Primitivo que molda a natureza da sua fúria, concedendo características adicionais nos níveis 3, 6, 10 e 14." }
      ],
      4: [
        { name: "Aumento no Valor de Habilidade (ASI)", desc: "Você pode aumentar um atributo à sua escolha em +2, ou dois atributos em +1 (ou escolher um Talento se a regra opcional estiver ativa)." }
      ],
      5: [
        { name: "Ataque Adicional", desc: "Você pode atacar duas vezes, em vez de uma, sempre que realizar a ação de Ataque no seu turno." },
        { name: "Movimento Rápido", desc: "Seu deslocamento aumenta em +3 metros enquanto você não estiver vestindo armadura pesada." }
      ],
      6: [], // Recurso da Subclasse
      7: [
        { name: "Instinto Selvagem", desc: "Seus instintos aguçados concedem vantagem nas jogadas de iniciativa. Se for surpreendido no início do combate, pode agir normalmente se entrar em fúria no início do seu turno." }
      ],
      8: [
        { name: "Aumento no Valor de Habilidade (ASI)", desc: "Aumente um atributo em +2 ou dois atributos em +1." }
      ],
      9: [
        { name: "Crítico Brutal (1 dado)", desc: "Você pode rolar um dado de dano de arma adicional ao determinar o dano extra de um acerto crítico com um ataque corpo a corpo." }
      ],
      10: [], // Recurso da Subclasse
      11: [
        { name: "Fúria Implacável", desc: "Se cair a 0 PV enquanto estiver em fúria e não morrer instantaneamente, pode fazer uma Salvaguarda de CON CD 10. Se tiver sucesso, seus PV caem para 1 em vez disso. Cada uso sucessivo aumenta a CD em 5 até um descanso." }
      ],
      12: [
        { name: "Aumento no Valor de Habilidade (ASI)", desc: "Aumente um atributo em +2 ou dois atributos em +1." }
      ],
      13: [
        { name: "Crítico Brutal (2 dados)", desc: "Você rola dois dados de dano de arma adicionais em acertos críticos corpo a corpo." }
      ],
      14: [], // Recurso da Subclasse
      15: [
        { name: "Fúria Persistente", desc: "Sua fúria é tão feroz que só termina antes de 1 minuto se você cair inconsciente ou se decidir encerrá-la voluntariamente." }
      ],
      16: [
        { name: "Aumento no Valor de Habilidade (ASI)", desc: "Aumente um atributo em +2 ou dois atributos em +1." }
      ],
      17: [
        { name: "Crítico Brutal (3 dados)", desc: "Você rola três dados de dano de arma adicionais em acertos críticos corpo a corpo." }
      ],
      18: [
        { name: "Poder Indomável", desc: "Se o total de um teste de Força for menor que seu valor de Força, você pode usar seu valor de Força no lugar do resultado da rolagem." }
      ],
      19: [
        { name: "Aumento no Valor de Habilidade (ASI)", desc: "Aumente um atributo em +2 ou dois atributos em +1." }
      ],
      20: [
        { name: "Campeão Primitivo", desc: "Você incorpora o poder da selva. Seus valores de Força e Constituição aumentam em +4 cada, e o valor máximo para esses atributos agora se torna 24!" }
      ]
    },
    subclasses: {
      "Caminho do Furioso": {
        name: "Caminho do Furioso (Berserker)",
        levels: {
          3: [{ name: "Frenesi", desc: "Você pode optar por entrar em Frenesi ao enfurecer-se. Enquanto durar a fúria, você pode realizar um ataque corpo a corpo adicional com arma como Ação Bônus em cada turno. Ao término, você sofre 1 nível de exaustão." }],
          6: [{ name: "Fúria Cega", desc: "Você não pode ser enfeitiçado ou amedrontado enquanto estiver em fúria. Se já estiver enfeitiçado ou amedrontado ao entrar em fúria, o efeito é suspenso pela duração da fúria." }],
          10: [{ name: "Presença Intimidadora", desc: "Você pode usar sua ação para aterrorizar alguém com sua presença intimidadora. O alvo a até 9m deve passar numa Salvaguarda de SAB (CD 8 + prof + Carisma) ou ficará amedrontado até o fim do seu próximo turno." }],
          14: [{ name: "Retaliação", desc: "Ao sofrer dano de uma criatura que esteja a até 1,5 metro de você, você pode usar sua reação para desferir um ataque corpo a corpo com arma contra ela." }]
        }
      },
      "Caminho do Guerreiro Totêmico": {
        name: "Caminho do Guerreiro Totêmico (Totem)",
        levels: {
          3: [
            { name: "Buscador Espiritual", desc: "Você adquire a habilidade de conjurar as magias Sentido Animal e Falar com Animais como rituais." },
            { name: "Espírito Totêmico (Urso/Águia/Lobo)", desc: "Escolha um espírito animal: Urso (enquanto em fúria, você tem resistência a todos os danos exceto psíquico); Águia (pode disparar e desengajar com ação bônus); ou Lobo (seus aliados têm vantagem em ataques corpo a corpo contra inimigos a até 1,5m de você)." }
          ],
          6: [{ name: "Aspecto da Fera", desc: "Ganha um benefício místico baseado no animal escolhido: Urso (dobra capacidade de carga e vantagem em empurrar/levantar objetos); Águia (enxerga detalhes até 1,5km sem esforço e visão na penumbra não impõe desvantagem); Lobo (rastreia criaturas em ritmo rápido e move-se furtivamente em ritmo normal)." }],
          10: [{ name: "Andarilho Espiritual", desc: "Você pode conjurar a magia Comunhão com a Natureza como ritual, invocando uma versão espiritual de um dos seus animais totêmicos para revelar segredos da região." }],
          14: [{ name: "Sintonia Totêmica", desc: "Urso (qualquer criatura a até 1,5m tem desvantagem em atacar alvos que não sejam você); Águia (você adquire deslocamento de voo igual ao seu deslocamento terrestre enquanto em fúria); Lobo (ao atingir uma criatura Grande ou menor com ataque corpo a corpo durante a fúria, pode derrubá-la no chão como ação bônus)." }]
        }
      },
      "Caminho do Guardião Ancestral": {
        name: "Caminho do Guardião Ancestral",
        levels: {
          3: [{ name: "Protetores Ancestrais", desc: "O primeiro inimigo que você acertar com ataque de arma durante a fúria tem desvantagem nos ataques contra qualquer pessoa exceto você, e se atingir outra pessoa, o alvo tem resistência ao dano." }],
          6: [{ name: "Escudo Espiritual", desc: "Se um aliado a até 9m sofrer dano, você usa sua reação para reduzir o dano sofrido em 2d6 (3d6 no Nv 10, 4d6 no Nv 14)." }],
          10: [{ name: "Consultar os Espíritos", desc: "Pode conjurar Vidência ou Clarividência sem gastar espaços de magia ou componentes materiais." }],
          14: [{ name: "Ancestrais Vingativos", desc: "Quando seu Escudo Espiritual previne dano, o atacante sofre o mesmo valor em dano de força." }]
        }
      },
      "Caminho do Fanático": {
        name: "Caminho do Fanático (Zealot)",
        levels: {
          3: [
            { name: "Fúria Divina", desc: "O primeiro golpe de arma que acertar no seu turno causa 1d6 + metade do nível de bárbaro em dano radiante ou necrótico adicional." },
            { name: "Guerreiro dos Deuses", desc: "Magias que ressuscitam você (Reviver os Mortos, Ressurreição, etc.) não exigem componentes materiais caros de diamante." }
          ],
          6: [{ name: "Foco Fanático", desc: "Se falhar numa salvaguarda enquanto em fúria, pode re-rolar o teste e usar o novo resultado (1/fúria)." }],
          10: [{ name: "Presença Zelosa", desc: "Como ação bônus, brade um brado de guerra: até 10 aliados a até 18m ganham vantagem em jogadas de ataque e salvaguardas até o início do seu próximo turno (1/descanso longo)." }],
          14: [{ name: "Fúria Além da Morte", desc: "Estar a 0 PV não faz você cair inconsciente enquanto estiver em fúria! Você ainda faz testes de morte e sofre dano, mas só morre se ainda estiver a 0 PV quando sua fúria terminar." }]
        }
      }
    }
  },

  "Guerreiro": {
    name: "Guerreiro",
    nameEn: "Fighter",
    hitDie: "d10",
    primaryAttr: "str",
    saves: ["str", "con"],
    spellcasting: null,
    levels: {
      1: [
        { name: "Estilo de Luta", desc: "Escolha uma especialização: Arquearia (+2 em ataques com armas à distância), Defesa (+1 na CA ao usar armadura), Duelo (+2 de dano em ataques com uma mão), Armas Grandes (re-rola 1 e 2 no dado de dano com armas de duas mãos), Proteção (reação para impor desvantagem em ataque contra aliado adjacente usando escudo), ou Duas Armas (soma modificador de atributo no dano da segunda arma)." },
        { name: "Retomar o Fôlego (Second Wind)", desc: "Com uma Ação Bônus, recupere 1d10 + Nível de Guerreiro em Pontos de Vida (1 vez por descanso curto ou longo)." }
      ],
      2: [
        { name: "Surto de Ação (Action Surge)", desc: "Você ultrapassa seus limites normais e pode realizar uma Ação adicional no seu turno (1 uso por descanso curto/longo; 2 usos no Nv 17)." }
      ],
      3: [
        { name: "Arquétipo Marcial", desc: "Você escolhe o modelo de guerreiro que aspira seguir, recebendo características no 3º, 7º, 10º, 15º e 18º nível." }
      ],
      4: [
        { name: "Aumento no Valor de Habilidade (ASI)", desc: "Aumente um atributo em +2 ou dois atributos em +1." }
      ],
      5: [
        { name: "Ataque Adicional (2 ataques)", desc: "Você pode atacar duas vezes, em vez de uma, na ação de Ataque." }
      ],
      6: [
        { name: "Aumento no Valor de Habilidade (ASI)", desc: "Guerreiro recebe um aumento de habilidade extra no 6º nível (+2 em um atributo ou +1 em dois)." }
      ],
      7: [], // Subclasse
      8: [
        { name: "Aumento no Valor de Habilidade (ASI)", desc: "Aumente um atributo em +2 ou dois atributos em +1." }
      ],
      9: [
        { name: "Indomável (1 uso)", desc: "Você pode re-rolar uma Salvaguarda na qual falhou. Você é obrigado a usar o novo resultado (1/descanso longo; 2 usos no Nv 13; 3 usos no Nv 17)." }
      ],
      10: [], // Subclasse
      11: [
        { name: "Ataque Adicional (3 ataques)", desc: "Você pode atacar três vezes, em vez de duas, na ação de Ataque!" }
      ],
      12: [
        { name: "Aumento no Valor de Habilidade (ASI)", desc: "Aumente um atributo em +2 ou dois atributos em +1." }
      ],
      13: [
        { name: "Indomável (2 usos)", desc: "Você agora pode usar Indomável duas vezes entre descansos longos." }
      ],
      14: [
        { name: "Aumento no Valor de Habilidade (ASI)", desc: "Guerreiro recebe mais um aumento de atributo extra no 14º nível." }
      ],
      15: [], // Subclasse
      16: [
        { name: "Aumento no Valor de Habilidade (ASI)", desc: "Aumente um atributo em +2 ou dois atributos em +1." }
      ],
      17: [
        { name: "Surto de Ação (2 usos)", desc: "Você agora pode usar Surto de Ação duas vezes entre descansos curtos ou longos (apenas um uso por turno)." },
        { name: "Indomável (3 usos)", desc: "Você agora pode usar Indomável três vezes entre descansos longos." }
      ],
      18: [], // Subclasse
      19: [
        { name: "Aumento no Valor de Habilidade (ASI)", desc: "Aumente um atributo em +2 ou dois atributos em +1." }
      ],
      20: [
        { name: "Ataque Adicional Supremo (4 ataques)", desc: "O ápice do combate físico: você pode atacar quatro vezes em cada ação de Ataque!" }
      ]
    },
    subclasses: {
      "Campeão": {
        name: "Campeão (Champion)",
        levels: {
          3: [{ name: "Crítico Aprimorado", desc: "Suas jogadas de ataque com arma obtêm um Acerto Crítico com uma rolagem de 19 ou 20 no d20." }],
          7: [{ name: "Atleta Extraordinário", desc: "Adiciona metade do seu bônus de proficiência em qualquer teste de FOR, DES ou CON que não utilize proficiência. Além disso, a distância de salto em extensão aumenta em +Mod. FOR pés." }],
          10: [{ name: "Estilo de Luta Adicional", desc: "Você pode escolher um segundo Estilo de Luta da lista de guerreiro." }],
          15: [{ name: "Crítico Superior", desc: "Suas jogadas de ataque com arma agora obtêm um Acerto Crítico com rolagens de 18, 19 ou 20 no d20!" }],
          18: [{ name: "Sobrevivente", desc: "No início de cada um dos seus turnos, você recupera 5 + Mod. CON em PV se estiver com menos da metade do seu máximo de vida e não tiver 0 PV." }]
        }
      },
      "Mestre de Batalha": {
        name: "Mestre de Batalha (Battle Master)",
        levels: {
          3: [
            { name: "Superioridade Marcial (4d8)", desc: "Você adquire 4 Dados de Superioridade (d8) que recarregam em descansos curtos ou longos. Aprende 3 Manobras à sua escolha (ex: Ataque Provocador, Golpe Aparador, Finta, Ataque Ameaçador, Ataque Derrubador)." },
            { name: "Estudioso da Guerra", desc: "Você ganha proficiência com um tipo de ferramenta de artesão à sua escolha." }
          ],
          7: [{ name: "Conheça seu Inimigo", desc: "Observando ou interagindo com uma criatura por 1 minuto fora de combate, você discerne se ela é superior, igual ou inferior a você em FOR, DES, CON, CA ou PV." }],
          10: [{ name: "Dados de Superioridade Aprimorados (d10)", desc: "Seus dados de superioridade tornam-se d10. Você aprende duas manobras adicionais." }],
          15: [{ name: "Implacável", desc: "Ao rolar iniciativa e não possuir nenhum dado de superioridade restante, você recupera 1 dado de superioridade imediatamente." }],
          18: [{ name: "Dados de Superioridade Aprimorados (d12)", desc: "Seus dados de superioridade tornam-se d12 poderosos." }]
        }
      },
      "Cavaleiro Arcano": {
        name: "Cavaleiro Arcano (Eldritch Knight)",
        levels: {
          3: [
            { name: "Conjuração Arcana", desc: "Você conjura magias de mago (principalmente Abjuração e Evocação) usando Inteligência como atributo-chave. Conhece truques e espaços de magia." },
            { name: "Vínculo com Arma", desc: "Você realiza um ritual com até 2 armas. Você não pode ser desarmado dessa arma a menos que esteja incapacitado, e pode invocá-la instantaneamente para sua mão com uma Ação Bônus se estiver no mesmo plano." }
          ],
          7: [{ name: "Magia de Guerra", desc: "Quando você usar sua ação para conjurar um Truque, pode realizar um ataque com arma como Ação Bônus." }],
          10: [{ name: "Golpe Místico", desc: "Ao acertar uma criatura com arma, ela tem desvantagem na próxima salvaguarda contra uma magia que você conjurar até o fim do seu próximo turno." }],
          15: [{ name: "Investida Arcana", desc: "Ao usar seu Surto de Ação, você pode se teletransportar magicamente até 9 metros para um espaço desocupado que possa ver (antes ou depois da ação extra)." }],
          18: [{ name: "Magia de Guerra Aprimorada", desc: "Ao usar sua ação para conjurar qualquer Magia, pode fazer um ataque com arma como Ação Bônus." }]
        }
      }
    }
  },

  "Ladino": {
    name: "Ladino",
    nameEn: "Rogue",
    hitDie: "d8",
    primaryAttr: "dex",
    saves: ["dex", "int"],
    spellcasting: null,
    levels: {
      1: [
        { name: "Especialização (2 perícias)", desc: "Dobre seu bônus de proficiência em duas perícias nas quais você seja proficiente (ou em uma perícia e ferramentas de ladrão)." },
        { name: "Ataque Furtivo (1d6)", desc: "Uma vez por turno, cause 1d6 de dano extra a uma criatura atingida por arma de acuidade ou à distância, se tiver vantagem na jogada OU se outro inimigo do alvo estiver a 1,5m dele e você não tiver desvantagem." },
        { name: "Gíria de Ladrão", desc: "Você conhece o dialeto secreto e os sinais codificados do submundo usados para passar mensagens ocultas." }
      ],
      2: [
        { name: "Ação Astuta (Cunning Action)", desc: "Com uma Ação Bônus em cada um de seus turnos de combate, você pode Correr (Dash), Desengajar (Disengage) ou Esconder-se (Hide)." }
      ],
      3: [
        { name: "Arquétipo de Ladino", desc: "Escolha seu arquétipo (Assassino, Ladrão, Trapaceiro Arcano, Espadachim), recebendo recursos no 3º, 9º, 13º e 17º nível." },
        { name: "Ataque Furtivo (2d6)", desc: "Seu dano de Ataque Furtivo aumenta para 2d6." }
      ],
      4: [
        { name: "Aumento no Valor de Habilidade (ASI)", desc: "Aumente um atributo em +2 ou dois atributos em +1." }
      ],
      5: [
        { name: "Esquiva Sobrenatural (Uncanny Dodge)", desc: "Ao ser atingido por um ataque de um agressor que você possa ver, use sua Reação para reduzir o dano do ataque pela metade!" },
        { name: "Ataque Furtivo (3d6)", desc: "Seu dano de Ataque Furtivo aumenta para 3d6." }
      ],
      6: [
        { name: "Especialização Adicional", desc: "Escolha mais duas perícias com as quais seja proficiente para dobrar seu bônus de proficiência." }
      ],
      7: [
        { name: "Evasão", desc: "Sua agilidade permite esquivar-se de explosões e sopros: em qualquer efeito que permita salvaguarda de DES para sofrer metade do dano, você não sofre dano se passar, e sofre apenas metade se falhar." },
        { name: "Ataque Furtivo (4d6)", desc: "Seu dano de Ataque Furtivo aumenta para 4d6." }
      ],
      8: [
        { name: "Aumento no Valor de Habilidade (ASI)", desc: "Aumente um atributo em +2 ou dois atributos em +1." }
      ],
      9: [
        { name: "Ataque Furtivo (5d6)", desc: "Seu dano de Ataque Furtivo aumenta para 5d6." }
      ],
      10: [
        { name: "Aumento no Valor de Habilidade (ASI)", desc: "Ladino ganha um aumento de atributo extra no 10º nível." }
      ],
      11: [
        { name: "Talento Confiável (Reliable Talent)", desc: "Sempre que fizer um teste de habilidade com d20 que adicione seu bônus de proficiência, qualquer resultado de 9 ou menor no dado é tratado como um 10!" },
        { name: "Ataque Furtivo (6d6)", desc: "Seu dano de Ataque Furtivo aumenta para 6d6." }
      ],
      12: [
        { name: "Aumento no Valor de Habilidade (ASI)", desc: "Aumente um atributo em +2 ou dois atributos em +1." }
      ],
      13: [
        { name: "Ataque Furtivo (7d6)", desc: "Seu dano de Ataque Furtivo aumenta para 7d6." }
      ],
      14: [
        { name: "Sentido Cego (Blindsense)", desc: "Se puder ouvir, você está ciente da localização exata de qualquer criatura escondida ou invisível a até 3 metros de você." }
      ],
      15: [
        { name: "Mente Escorregadia (Slippery Mind)", desc: "Você adquire proficiência nas Salvaguardas de Sabedoria." },
        { name: "Ataque Furtivo (8d6)", desc: "Seu dano de Ataque Furtivo aumenta para 8d6." }
      ],
      16: [
        { name: "Aumento no Valor de Habilidade (ASI)", desc: "Aumente um atributo em +2 ou dois atributos em +1." }
      ],
      17: [
        { name: "Ataque Furtivo (9d6)", desc: "Seu dano de Ataque Furtivo aumenta para 9d6." }
      ],
      18: [
        { name: "Elusivo", desc: "Nenhuma jogada de ataque contra você pode ter vantagem enquanto você não estiver incapacitado." }
      ],
      19: [
        { name: "Aumento no Valor de Habilidade (ASI)", desc: "Aumente um atributo em +2 ou dois atributos em +1." },
        { name: "Ataque Furtivo (10d6)", desc: "Seu dano de Ataque Furtivo atinge a marca máxima de 10d6!" }
      ],
      20: [
        { name: "Golpe de Sorte (Stroke of Luck)", desc: "Se errar um ataque contra um alvo ao seu alcance, pode transformar o erro em acerto. Ou, se falhar em um teste de habilidade, trate o d20 como um 20 natural (1 vez por descanso curto/longo)." }
      ]
    },
    subclasses: {
      "Assassino": {
        name: "Assassino (Assassin)",
        levels: {
          3: [
            { name: "Assassinar", desc: "Você tem Vantagem em jogadas de ataque contra qualquer criatura que ainda não tenha agido no combate. Além disso, qualquer acerto contra uma criatura que esteja Surpresa é um Acerto Crítico automático!" },
            { name: "Proficiências Bônus (Assassino)", desc: "Proficiência com kit de disfarce e kit de venenos." }
          ],
          9: [{ name: "Infiltração Especializada", desc: "Você pode forjar com perfeição identidades falsas, passaportes, cartas de recomendação e histórico pessoal impecável gastando 7 dias e 25 PO." }],
          13: [{ name: "Impostor", desc: "Você mimetiza com perfeição a fala, sotaque, tom de voz, caligrafia e comportamento de outra pessoa após observá-la por pelo menos 3 horas." }],
          17: [{ name: "Golpe Mortal", desc: "Ao atingir uma criatura surpresa, ela deve passar em Salvaguarda de CON (CD 8 + prof + DES). Se falhar, todo o dano do seu ataque contra ela é dobrado!" }]
        }
      },
      "Ladrão": {
        name: "Ladrão (Thief)",
        levels: {
          3: [
            { name: "Mãos Rápidas", desc: "Você pode usar sua Ação Astuta para fazer testes de Prestidigitação, operar armadilhas/gazuas ou usar a ação Usar um Objeto." },
            { name: "Andarilho de Telhados", desc: "Escalar não custa deslocamento adicional. Ao dar um salto com corrida, a distância saltada aumenta em Mod. DES pés." }
          ],
          9: [{ name: "Furtividade Suprema", desc: "Você tem vantagem em testes de Furtividade se não se mover mais do que a metade do seu deslocamento no mesmo turno." }],
          13: [{ name: "Usar Dispositivo Mágico", desc: "Você ignora todos os requisitos de classe, raça e nível para sintonizar e usar qualquer item mágico!" }],
          17: [{ name: "Reflexos de Ladrão", desc: "Você realiza dois turnos durante a primeira rodada de qualquer combate (um no seu valor de iniciativa e outro no seu valor menos 10)." }]
        }
      },
      "Trapaceiro Arcano": {
        name: "Trapaceiro Arcano (Arcane Trickster)",
        levels: {
          3: [
            { name: "Conjuração de Trapaceiro", desc: "Você aprende truques (incluindo Mãos Mágicas) e magias de Ilusão e Encantamento de mago usando Inteligência." },
            { name: "Mãos Mágicas Trapaceiras", desc: "Sua Mão Mágica é invisível e pode guardar/pegar itens de recipientes alheios e operar ferramentas de ladrão à distância." }
          ],
          9: [{ name: "Emboscada Mágica", desc: "Se estiver escondido de uma criatura ao conjurar uma magia contra ela, ela tem desvantagem em qualquer salvaguarda contra a magia neste turno." }],
          13: [{ name: "Trapaça Versátil", desc: "Você pode usar uma ação bônus para distrair um alvo com sua Mão Mágica, ganhando vantagem em ataques contra ele até o fim do turno." }],
          17: [{ name: "Ladrão de Magia", desc: "Ao ser alvo de magia ou incluído em sua área, use sua reação para forçar o conjurador a uma salvaguarda. Se falhar, anula o efeito em você e você rouba o conhecimento da magia por 8 horas!" }]
        }
      }
    }
  },

  "Clérigo": {
    name: "Clérigo",
    nameEn: "Cleric",
    hitDie: "d8",
    primaryAttr: "wis",
    saves: ["wis", "cha"],
    spellcasting: "full",
    levels: {
      1: [
        { name: "Conjuração Divina", desc: "Você conjura magias divinas concedidas pela sua fé usando Sabedoria como atributo-chave. Conhece rituais e prepara magias diariamente." },
        { name: "Domínio Divino", desc: "Você escolhe o Domínio Divino da sua divindade (Vida, Guerra, Luz, Tempestade, Trapaça, Forja), recebendo magias e dons sagrados." }
      ],
      2: [
        { name: "Canalizar Divindade (1/descanso)", desc: "Você adquire a capacidade de canalizar energia divina para alimentar efeitos sagrados: Expulsar Mortos-Vivos e a habilidade única do seu domínio." },
        { name: "Expulsar Mortos-Vivos", desc: "Com uma ação, erga seu símbolo sagrado: mortos-vivos a até 9m devem passar em Salvaguarda de SAB ou fugirão de você por 1 minuto." }
      ],
      4: [
        { name: "Aumento no Valor de Habilidade (ASI)", desc: "Aumente um atributo em +2 ou dois atributos em +1." }
      ],
      5: [
        { name: "Destruir Mortos-Vivos (ND 1/2)", desc: "Mortos-vivos com ND 1/2 ou menor que falharem na salvaguarda contra seu Expulsar Mortos-Vivos são destruídos instantaneamente em cinzas!" }
      ],
      6: [
        { name: "Canalizar Divindade (2/descanso)", desc: "Você pode usar Canalizar Divindade duas vezes entre descansos curtos ou longos." }
      ],
      8: [
        { name: "Aumento no Valor de Habilidade (ASI)", desc: "Aumente um atributo em +2 ou dois atributos em +1." },
        { name: "Destruir Mortos-Vivos (ND 1)", desc: "Destrói mortos-vivos com ND 1 ou menor instantaneamente." }
      ],
      10: [
        { name: "Intervenção Divina", desc: "Você suplica auxílio à sua divindade. Role 1d100: se tirar um número igual ou menor que seu nível de clérigo, a divindade atende ao seu pedido diretamente (1/7 dias)!" }
      ],
      11: [
        { name: "Destruir Mortos-Vivos (ND 2)", desc: "Destrói mortos-vivos com ND 2 ou menor." }
      ],
      12: [
        { name: "Aumento no Valor de Habilidade (ASI)", desc: "Aumente um atributo em +2 ou dois atributos em +1." }
      ],
      14: [
        { name: "Destruir Mortos-Vivos (ND 3)", desc: "Destrói mortos-vivos com ND 3 ou menor." }
      ],
      16: [
        { name: "Aumento no Valor de Habilidade (ASI)", desc: "Aumente um atributo em +2 ou dois atributos em +1." }
      ],
      17: [
        { name: "Destruir Mortos-Vivos (ND 4)", desc: "Destrói mortos-vivos com ND 4 ou menor." }
      ],
      18: [
        { name: "Canalizar Divindade (3/descanso)", desc: "Você pode usar Canalizar Divindade três vezes entre descansos." }
      ],
      19: [
        { name: "Aumento no Valor de Habilidade (ASI)", desc: "Aumente um atributo em +2 ou dois atributos em +1." }
      ],
      20: [
        { name: "Intervenção Divina Aprimorada", desc: "Sua Intervenção Divina passa a ter SUCESSO AUTOMÁTICO, sem necessidade de rolagem de dados!" }
      ]
    },
    subclasses: {
      "Domínio da Vida": {
        name: "Domínio da Vida (Life)",
        levels: {
          1: [
            { name: "Proficiência Bônus (Vida)", desc: "Ganha proficiência com armaduras pesadas." },
            { name: "Discípulo da Vida", desc: "Suas magias de cura restauram PV adicionais iguais a 2 + círculo da magia." }
          ],
          2: [{ name: "Canalizar Divindade: Preservar a Vida", desc: "Cure uma reserva de vida igual a 5 × nível de clérigo dividida entre quaisquer criaturas a até 9m (cura até metade do PV máximo delas)." }],
          6: [{ name: "Curandeiro Abençoado", desc: "Ao conjurar magia de cura em outra criatura, você próprio recupera 2 + círculo da magia em Pontos de Vida." }],
          8: [{ name: "Golpe Divino (Vida)", desc: "Uma vez por turno adiciona +1d8 de dano radiante aos seus ataques com arma (+2d8 no Nv 14)." }],
          17: [{ name: "Cura Suprema", desc: "Ao rolar dados para restaurar PV com magias, use sempre o valor máximo em cada dado (ex: 1d8 vira 8 automático)!" }]
        }
      },
      "Domínio da Guerra": {
        name: "Domínio da Guerra (War)",
        levels: {
          1: [
            { name: "Proficiência Bônus (Guerra)", desc: "Ganha proficiência com armas marciais e armaduras pesadas." },
            { name: "Sacerdote da Guerra", desc: "Ao realizar a ação de Ataque, pode desferir um ataque com arma adicional como Ação Bônus (Mod. SAB vezes/descanso longo)." }
          ],
          2: [{ name: "Canalizar Divindade: Golpe Guiado", desc: "Ao fazer uma jogada de ataque, adicione um bônus sagrado de +10 ao resultado da rolagem." }],
          6: [{ name: "Canalizar Divindade: Bênção do Deus da Guerra", desc: "Use sua reação para conceder +10 na jogada de ataque de um aliado a até 9 metros." }],
          8: [{ name: "Golpe Divino (Guerra)", desc: "Uma vez por turno adiciona +1d8 de dano de arma extra (+2d8 no Nv 14)." }],
          17: [{ name: "Avatar da Batalha", desc: "Resistência a dano de concussão, cortante e perfurante de armas não-mágicas." }]
        }
      },
      "Domínio da Luz": {
        name: "Domínio da Luz (Light)",
        levels: {
          1: [
            { name: "Truque Bônus (Luz)", desc: "Aprende o truque Luz." },
            { name: "Clarão de Proteção", desc: "Quando atacado por criatura a até 9m, use sua reação para impor desvantagem no ataque dela com um feixe ofuscante (Mod. SAB vezes/descanso longo)." }
          ],
          2: [{ name: "Canalizar Divindade: Radiação do Alvorecer", desc: "Dissipa qualquer escuridão mágica a até 9m e causa 2d10 + Nível de clérigo em dano radiante a inimigos (Salvaguarda de CON para metade)." }],
          6: [{ name: "Clarão Aprimorado", desc: "Você agora pode usar Clarão de Proteção quando um aliado a até 9 metros for atacado." }],
          8: [{ name: "Conjuração Potente", desc: "Adiciona seu Mod. SAB ao dano de qualquer truque de clérigo que você conjurar." }],
          17: [{ name: "Coroa de Luz", desc: "Com uma ação irradia luz solar a até 18m. Inimigos na luz têm desvantagem em salvaguardas contra magias de dano de fogo ou radiante." }]
        }
      }
    }
  },

  "Druida": {
    name: "Druida",
    nameEn: "Druid",
    hitDie: "d8",
    primaryAttr: "wis",
    saves: ["int", "wis"],
    spellcasting: "full",
    levels: {
      1: [
        { name: "Druídico", desc: "Você conhece o Druídico, o idioma secreto e código dos druidas. Deixar mensagens em druídico só pode ser decifrado por outros druidas." },
        { name: "Conjuração Druídica", desc: "Você canaliza os poderes da natureza usando Sabedoria como atributo-chave. Prepara magias diariamente e pode conjurar rituais." }
      ],
      2: [
        { name: "Forma Selvagem (2 usos)", desc: "Com uma ação, você assume magicamente a forma de uma besta que já tenha visto (2 usos por descanso curto ou longo). Duração em horas = metade do nível de druida." },
        { name: "Círculo Druídico", desc: "Você escolhe seu Círculo Druídico (Círculo da Lua, Círculo da Terra, Círculo das Estrelas, Pastores), recebendo recursos no 2º, 6º, 10º e 14º nível." }
      ],
      4: [
        { name: "Aumento no Valor de Habilidade (ASI)", desc: "Aumente um atributo em +2 ou dois atributos em +1." },
        { name: "Melhoria da Forma Selvagem (ND 1/2, natação)", desc: "Pode se transformar em bestas de ND até 1/2 com deslocamento de natação (sem voo)." }
      ],
      8: [
        { name: "Aumento no Valor de Habilidade (ASI)", desc: "Aumente um atributo em +2 ou dois atributos em +1." },
        { name: "Melhoria da Forma Selvagem (ND 1, voo)", desc: "Pode se transformar em bestas com ND até 1 com deslocamento de voo." }
      ],
      12: [
        { name: "Aumento no Valor de Habilidade (ASI)", desc: "Aumente um atributo em +2 ou dois atributos em +1." }
      ],
      16: [
        { name: "Aumento no Valor de Habilidade (ASI)", desc: "Aumente um atributo em +2 ou dois atributos em +1." }
      ],
      18: [
        { name: "Corpo Atemporal", desc: "A magia primal retarda seu envelhecimento: para cada 10 anos que passam, seu corpo envelhece apenas 1 ano." },
        { name: "Magias de Fera", desc: "Você pode conjurar muitas das suas magias de druida enquanto transformado em Forma Selvagem, desde que não exijam componentes materiais caros." }
      ],
      19: [
        { name: "Aumento no Valor de Habilidade (ASI)", desc: "Aumente um atributo em +2 ou dois atributos em +1." }
      ],
      20: [
        { name: "Arquidruida", desc: "Você adquire usos ILIMITADOS de Forma Selvagem! Além disso, você ignora os componentes verbais e somáticos de todas as suas magias de druida." }
      ]
    },
    subclasses: {
      "Círculo da Lua": {
        name: "Círculo da Lua (Moon)",
        levels: {
          2: [
            { name: "Forma Selvagem de Combate", desc: "Você pode usar Forma Selvagem como Ação Bônus. Enquanto transformado, você pode gastar um espaço de magia com ação bônus para recuperar 1d8 PV por círculo do espaço gasto." },
            { name: "Formas de Círculo (ND elevado)", desc: "Você pode se transformar em bestas com ND até 1 imediatamente (ND = Nível de Druida ÷ 3 a partir do 6º nível, ex: ND 2 no Nv 6, ND 3 no Nv 9, ND 4 no Nv 12, ND 5 no Nv 15, ND 6 no Nv 18)." }
          ],
          6: [{ name: "Golpe Primordial", desc: "Seus ataques em forma de besta contam como mágicos para o propósito de superar resistência e imunidade a ataques e danos não-mágicos." }],
          10: [{ name: "Forma Selvagem Elemental", desc: "Você pode gastar dois usos de Forma Selvagem ao mesmo tempo para se transformar em um Elemental do Ar, Terra, Fogo ou Água!" }],
          14: [{ name: "Mil Formas", desc: "Você pode conjurar a magia Alterar-se à vontade, sem gastar espaços de magia." }]
        }
      },
      "Círculo da Terra": {
        name: "Círculo da Terra (Land)",
        levels: {
          2: [
            { name: "Truque Adicional (Terra)", desc: "Aprende um truque adicional de druida." },
            { name: "Recuperação Natural", desc: "Durante um descanso curto, você recupera espaços de magia gastos cuja soma de círculos seja igual a até metade do seu nível de druida (1/dia)." }
          ],
          3: [{ name: "Magias do Círculo", desc: "Ganha magias preparadas fixas baseadas no bioma escolhido (Ártico, Costa, Deserto, Floresta, Montanha, Pântano, Planície ou Subterrâneo)." }],
          6: [{ name: "Passo da Terra", desc: "Mover-se através de terreno difícil não-mágico não custa deslocamento adicional. Vantagem em salvaguardas contra plantas com efeito de constrição." }],
          10: [{ name: "Proteção da Natureza", desc: "Você não pode ser enfeitiçado ou amedrontado por elementais ou fadas, e é imune a veneno e doenças." }],
          14: [{ name: "Santuário da Natureza", desc: "Criaturas do tipo besta ou planta devem passar numa Salvaguarda de SAB para atacar você. Se falharem, devem escolher outro alvo ou perder o ataque." }]
        }
      }
    }
  },

  "Mago": {
    name: "Mago",
    nameEn: "Wizard",
    hitDie: "d6",
    primaryAttr: "int",
    saves: ["int", "wis"],
    spellcasting: "full",
    levels: {
      1: [
        { name: "Grimório e Conjuração Arcana", desc: "Você estuda as artes arcanas usando Inteligência como atributo-chave. Conhece rituais e escreve magias em seu grimório pessoal." },
        { name: "Recuperação Arcana", desc: "Uma vez por dia durante um descanso curto, você pode recuperar espaços de magia gastos cuja soma de círculos seja até metade do seu nível de mago (máximo 5º círculo)." }
      ],
      2: [
        { name: "Tradição Arcana", desc: "Você escolhe sua Escola de Magia (Evocação, Abjuração, Necromancia, Adivinhação, Ilusão, etc.), recebendo poderes no 2º, 6º, 10º e 14º nível." }
      ],
      4: [
        { name: "Aumento no Valor de Habilidade (ASI)", desc: "Aumente um atributo em +2 ou dois atributos em +1." }
      ],
      6: [], // Subclasse
      8: [
        { name: "Aumento no Valor de Habilidade (ASI)", desc: "Aumente um atributo em +2 ou dois atributos em +1." }
      ],
      10: [], // Subclasse
      12: [
        { name: "Aumento no Valor de Habilidade (ASI)", desc: "Aumente um atributo em +2 ou dois atributos em +1." }
      ],
      14: [], // Subclasse
      16: [
        { name: "Aumento no Valor de Habilidade (ASI)", desc: "Aumente um atributo em +2 ou dois atributos em +1." }
      ],
      18: [
        { name: "Maestria em Magia (Spell Mastery)", desc: "Você domina uma magia de 1º círculo e uma de 2º círculo do seu grimório: você pode conjurá-las no menor círculo à vontade, sem gastar espaços de magia!" }
      ],
      19: [
        { name: "Aumento no Valor de Habilidade (ASI)", desc: "Aumente um atributo em +2 ou dois atributos em +1." }
      ],
      20: [
        { name: "Magias de Assinatura", desc: "Escolha duas magias de 3º círculo do seu grimório: elas estão sempre preparadas e você pode conjurar cada uma no 3º círculo uma vez sem gastar espaço (1/descanso curto ou longo)." }
      ]
    },
    subclasses: {
      "Escola de Evocação": {
        name: "Escola de Evocação (Evocation)",
        levels: {
          2: [
            { name: "Especialista em Evocação", desc: "O ouro e tempo necessários para copiar magias de Evocação para seu grimório são reduzidos pela metade." },
            { name: "Esculpir Magias", desc: "Ao conjurar uma magia de evocação em área, você pode escolher até 1 + círculo da magia em criaturas protegidas: elas passam automaticamente na salvaguarda e não sofrem dano algum!" }
          ],
          6: [{ name: "Truque Potente", desc: "Quando uma criatura for bem-sucedida em uma salvaguarda contra um dos seus truques, ela ainda sofre metade do dano total." }],
          10: [{ name: "Evocação Potencializada", desc: "Você adiciona seu modificador de Inteligência a uma rolagem de dano de qualquer magia de evocação de mago que você conjurar." }],
          14: [{ name: "Sobrecarga (Overchannel)", desc: "Ao conjurar uma magia de dano de 1º a 5º círculo, cause o dano máximo em todos os dados. Usos subsequentes antes de descanso longo causam 2d12 de dano necrótico irredutível ao próprio mago por círculo." }]
        }
      },
      "Escola de Abjuração": {
        name: "Escola de Abjuração (Abjuration)",
        levels: {
          2: [
            { name: "Especialista em Abjuração", desc: "Metade do tempo e ouro para copiar magias de abjuração." },
            { name: "Proteção Arcana (Arcane Ward)", desc: "Ao conjurar magia de abjuração de 1º círculo ou maior, cria uma barreira com PV igual a (2 × nível de mago) + Mod. INT que absorve dano direcionado a você." }
          ],
          6: [{ name: "Proteção Projetada", desc: "Use sua reação para que sua Proteção Arcana intercepte o dano sofrido por uma criatura visível a até 9 metros." }],
          10: [{ name: "Abjuração Aprimorada", desc: "Soma seu bônus de proficiência a testes de habilidade para magias como Dissipar Magia e Contramágica." }],
          14: [{ name: "Resistência à Magia", desc: "Você tem Vantagem em salvaguardas contra todas as magias e resistência ao dano causado por magias!" }]
        }
      }
    }
  },

  "Paladino": {
    name: "Paladino",
    nameEn: "Paladin",
    hitDie: "d10",
    primaryAttr: "str",
    saves: ["wis", "cha"],
    spellcasting: "half",
    levels: {
      1: [
        { name: "Sentido Divino", desc: "Como ação, você detecta a presença de celestiais, corruptores, mortos-vivos ou terras consagradas a até 18 metros (1 + Mod. CAR usos/descanso longo)." },
        { name: "Cura Pelas Mãos (Lay on Hands)", desc: "Você tem uma reserva de cura igual a 5 × nível de paladino. Toque criaturas para restaurar PV ou gaste 5 pontos para purificar uma doença ou neutralizar um veneno." }
      ],
      2: [
        { name: "Estilo de Luta", desc: "Escolha: Defesa (+1 CA), Duelo (+2 dano), Armas Grandes (re-rola 1 e 2), ou Proteção." },
        { name: "Conjuração Sagrada", desc: "Meio-conjurador sagrado usando Carisma como atributo de conjuração." },
        { name: "Destruição Divina (Divine Smite)", desc: "Ao acertar uma criatura com ataque de arma corpo a corpo, você pode gastar um espaço de magia para causar +2d8 de dano radiante (1º círculo) + 1d8 por círculo extra (máximo 5d8), mais +1d8 extra contra mortos-vivos ou corruptores!" }
      ],
      3: [
        { name: "Saúde Divina", desc: "A magia sagrada concede imunidade absoluta a todas as doenças." },
        { name: "Juramento Sagrado", desc: "Você faz seu Juramento Sagrado (Devoção, Vingança, Anciões, Conquista), recebendo Canalizar Divindade e auras protetoras." }
      ],
      4: [
        { name: "Aumento no Valor de Habilidade (ASI)", desc: "Aumente um atributo em +2 ou dois atributos em +1." }
      ],
      5: [
        { name: "Ataque Adicional", desc: "Você ataca duas vezes na ação de Ataque." }
      ],
      6: [
        { name: "Aura de Proteção", desc: "Você e aliados a até 3 metros somam seu Modificador de Carisma (mínimo +1) a TODAS as salvaguardas! (Raio aumenta para 9 metros no Nv 18)." }
      ],
      7: [], // Subclasse
      8: [
        { name: "Aumento no Valor de Habilidade (ASI)", desc: "Aumente um atributo em +2 ou dois atributos em +1." }
      ],
      10: [
        { name: "Aura de Coragem", desc: "Você e aliados a até 3 metros não podem ser amedrontados enquanto você estiver consciente (aumenta para 9m no Nv 18)." }
      ],
      11: [
        { name: "Destruição Divina Aprimorada", desc: "Seus ataques com armas corpo a corpo causam automaticamente +1d8 de dano radiante em cada acerto!" }
      ],
      12: [
        { name: "Aumento no Valor de Habilidade (ASI)", desc: "Aumente um atributo em +2 ou dois atributos em +1." }
      ],
      14: [
        { name: "Toque Purificador", desc: "Com uma ação, você encerra uma magia ativa em você ou em uma criatura voluntária que você tocar (Mod. CAR usos/descanso longo)." }
      ],
      15: [], // Subclasse
      16: [
        { name: "Aumento no Valor de Habilidade (ASI)", desc: "Aumente um atributo em +2 ou dois atributos em +1." }
      ],
      18: [
        { name: "Melhoria das Auras (9 metros)", desc: "O raio da sua Aura de Proteção, Aura de Coragem e da aura do seu Juramento aumenta de 3 para 9 metros!" }
      ],
      19: [
        { name: "Aumento no Valor de Habilidade (ASI)", desc: "Aumente um atributo em +2 ou dois atributos em +1." }
      ],
      20: [] // Recurso Supremo do Juramento
    },
    subclasses: {
      "Juramento de Devoção": {
        name: "Juramento de Devoção (Devotion)",
        levels: {
          3: [
            { name: "Canalizar Divindade: Arma Sagrada", desc: "Com ação bônus, adiciona seu Mod. CAR às jogadas de ataque da arma por 1 minuto e emite luz brilhante." },
            { name: "Canalizar Divindade: Expulsar os Ímpios", desc: "Corruptores e mortos-vivos a até 9m devem passar em Salvaguarda de SAB ou fugirão por 1 minuto." }
          ],
          7: [{ name: "Aura de Devoção", desc: "Você e aliados a até 3m (9m no Nv 18) não podem ser enfeitiçados." }],
          15: [{ name: "Pureza de Espírito", desc: "Você está sempre sob o efeito permanente da magia Proteção contra o Bem e Mal." }],
          20: [{ name: "Halo Sagrado", desc: "Como ação, irradia luz solar a até 9m por 1 minuto: causa 10 de dano radiante a inimigos no início do turno e você tem vantagem em salvaguardas contra magias de corruptores e mortos-vivos." }]
        }
      },
      "Juramento de Vingança": {
        name: "Juramento de Vingança (Vengeance)",
        levels: {
          3: [
            { name: "Canalizar Divindade: Voto de Inimizade", desc: "Com ação bônus, escolha um inimigo a até 9m: você ganha Vantagem em todas as jogadas de ataque contra ele por 1 minuto!" },
            { name: "Canalizar Divindade: Abjurar o Inimigo", desc: "Amedronta e reduz o deslocamento de um inimigo a zero." }
          ],
          7: [{ name: "Vingador Implacável", desc: "Ao acertar um ataque de oportunidade, pode mover-se até metade do seu deslocamento como parte da reação sem provocar ataques de oportunidade." }],
          15: [{ name: "Alma da Vingança", desc: "Quando o alvo do seu Voto de Inimizade realizar um ataque, você pode usar sua reação para desferir um ataque corpo a corpo contra ele se estiver ao alcance." }],
          20: [{ name: "Anjo Vingador", desc: "Transforma-se em um anjo da vingança com asas escuras por 1 hora: ganha deslocamento de voo de 18m e aura aterrorizante de 9m." }]
        }
      }
    }
  },

  "Bardo": {
    name: "Bardo",
    nameEn: "Bard",
    hitDie: "d8",
    primaryAttr: "cha",
    saves: ["dex", "cha"],
    spellcasting: "full",
    levels: {
      1: [
        { name: "Inspiração de Bardo (d6)", desc: "Com ação bônus, conceda 1 dado de Inspiração (d6) a um aliado a até 18m. Ele pode somar a um teste, ataque ou salvaguarda nos próximos 10 minutos (Mod. CAR usos/descanso longo)." },
        { name: "Conjuração de Bardo", desc: "Conjurador pleno usando Carisma como atributo de magia e instrumento musical como foco." }
      ],
      2: [
        { name: "Pau pra Toda Obra (Jack of All Trades)", desc: "Adiciona metade do seu bônus de proficiência a qualquer teste de habilidade que você ainda não adicione proficiência." },
        { name: "Canção do Descanso (d6)", desc: "Aliados que recuperarem PV durante descanso curto recuperam +1d6 PV adicionais (+1d8 no Nv 9, +1d10 no Nv 13, +1d12 no Nv 17)." }
      ],
      3: [
        { name: "Colégio de Bardo", desc: "Escolha seu Colégio (Conhecimento, Bravura, Espadas, Glamour), recebendo dons artísticos." },
        { name: "Especialização (2 perícias)", desc: "Dobre seu bônus de proficiência em duas perícias à sua escolha." }
      ],
      4: [
        { name: "Aumento no Valor de Habilidade (ASI)", desc: "Aumente um atributo em +2 ou dois atributos em +1." }
      ],
      5: [
        { name: "Fonte de Inspiração (Font of Inspiration)", desc: "Seus dados de Inspiração de Bardo agora recarregam em descansos curtos e longos!" },
        { name: "Inspiração de Bardo (d8)", desc: "Seu dado de Inspiração melhora para d8." }
      ],
      6: [
        { name: "Contra-Encanto (Countercharm)", desc: "Com uma ação, inicie uma melodia: você e aliados a até 9m ganham vantagem em salvaguardas contra ser amedrontado ou enfeitiçado." }
      ],
      8: [
        { name: "Aumento no Valor de Habilidade (ASI)", desc: "Aumente um atributo em +2 ou dois atributos em +1." }
      ],
      10: [
        { name: "Inspiração de Bardo (d10)", desc: "Seu dado de Inspiração melhora para d10." },
        { name: "Segredos Mágicos (2 magias)", desc: "Escolha duas magias de qualquer classe no jogo: elas contam como magias de bardo para você!" },
        { name: "Especialização Adicional", desc: "Dobre o bônus de proficiência em mais duas perícias." }
      ],
      12: [
        { name: "Aumento no Valor de Habilidade (ASI)", desc: "Aumente um atributo em +2 ou dois atributos em +1." }
      ],
      14: [
        { name: "Segredos Mágicos (2 magias)", desc: "Aprende mais duas magias de qualquer classe." }
      ],
      15: [
        { name: "Inspiração de Bardo (d12)", desc: "Seu dado de Inspiração atinge a potência máxima de d12!" }
      ],
      16: [
        { name: "Aumento no Valor de Habilidade (ASI)", desc: "Aumente um atributo em +2 ou dois atributos em +1." }
      ],
      18: [
        { name: "Segredos Mágicos (2 magias)", desc: "Aprende mais duas magias de qualquer classe." }
      ],
      19: [
        { name: "Aumento no Valor de Habilidade (ASI)", desc: "Aumente um atributo em +2 ou dois atributos em +1." }
      ],
      20: [
        { name: "Inspiração Superior", desc: "Ao rolar iniciativa sem dados de Inspiração restantes, você recupera 1 dado imediatamente." }
      ]
    },
    subclasses: {
      "Colégio do Conhecimento": {
        name: "Colégio do Conhecimento (Lore)",
        levels: {
          3: [
            { name: "Proficiências Bônus (Conhecimento)", desc: "Ganha proficiência em 3 perícias quaisquer à sua escolha." },
            { name: "Palavras Cortantes", desc: "Com sua reação, gaste 1 dado de Inspiração para subtrair o valor de uma jogada de ataque, teste de dano ou teste de habilidade de um inimigo a até 18m." }
          ],
          6: [{ name: "Segredos Mágicos Adicionais", desc: "Aprende duas magias de qualquer classe já no 6º nível!" }],
          14: [{ name: "Habilidade Inigualável", desc: "Ao fazer um teste de habilidade, pode rolar um de seus dados de Inspiração e somar ao total para evitar falhas." }]
        }
      },
      "Colégio da Bravura": {
        name: "Colégio da Bravura (Valor)",
        levels: {
          3: [
            { name: "Proficiências de Combate", desc: "Ganha proficiência com armaduras médias, escudos e armas marciais." },
            { name: "Inspiração em Combate", desc: "Aliados com sua Inspiração podem somar o dado à jogada de dano de arma ou à CA como reação contra um ataque." }
          ],
          6: [{ name: "Ataque Adicional (Bardo)", desc: "Pode atacar duas vezes na ação de Ataque." }],
          14: [{ name: "Magia de Batalha", desc: "Ao conjurar uma magia de bardo com sua ação, pode fazer um ataque com arma como ação bônus." }]
        }
      }
    }
  },

  "Monge": {
    name: "Monge",
    nameEn: "Monk",
    hitDie: "d8",
    primaryAttr: "dex",
    saves: ["str", "dex"],
    spellcasting: null,
    levels: {
      1: [
        { name: "Defesa Sem Armadura (Monge)", desc: "Enquanto não estiver vestindo armadura e sem escudo, sua CA é 10 + Mod. DES + Mod. SAB." },
        { name: "Artes Marciais (1d4)", desc: "Usa Destreza para ataques desarmados e armas de monge; dano desarmado escala (1d4 no Nv 1, 1d6 no Nv 5, 1d8 no Nv 11, 1d10 no Nv 17); ataque desarmado bônus ao atacar com arma de monge." }
      ],
      2: [
        { name: "Ki (Pontos de Energia)", desc: "Você tem pontos de Ki iguais ao seu nível de monge (recarregam em descanso curto/longo). Opções: Rajada de Golpes (2 ataques desarmados bônus por 1 Ki), Defesa Paciente (Esquiva com ação bônus por 1 Ki) e Passo do Vento (Desengajar ou Correr com ação bônus e dobra saltos por 1 Ki)." },
        { name: "Movimento Sem Armadura", desc: "Seu deslocamento aumenta em +3 metros enquanto não estiver vestindo armadura (aumenta para +4,5m no Nv 6, +6m no Nv 10, +7,5m no Nv 14, +9m no Nv 18)." }
      ],
      3: [
        { name: "Tradição Monástica", desc: "Escolha seu monastério (Mão Aberta, Sombra, Quatro Elementos, Kensei)." },
        { name: "Defletir Projéteis", desc: "Com sua reação, reduza o dano de ataque à distância por 1d10 + Mod. DES + Nível de monge. Se reduzir a 0, pode gastar 1 Ki para arremessar o projétil de volta!" }
      ],
      4: [
        { name: "Aumento no Valor de Habilidade (ASI)", desc: "Aumente um atributo em +2 ou dois atributos em +1." },
        { name: "Queda Lenta", desc: "Com sua reação, reduza o dano de queda em 5 × seu nível de monge." }
      ],
      5: [
        { name: "Ataque Adicional", desc: "Ataca duas vezes na ação de Ataque." },
        { name: "Golpe Atordoante (Stunning Strike)", desc: "Ao acertar uma criatura com ataque de arma corpo a corpo, gaste 1 Ki: o alvo deve passar em Salvaguarda de CON ou ficará ATORDOADO até o final do seu próximo turno!" }
      ],
      6: [
        { name: "Golpes Místicos de Ki", desc: "Seus ataques desarmados contam como mágicos para superar resistências e imunidades." }
      ],
      7: [
        { name: "Evasão", desc: "Salvaguardas de Destreza de meio-dano: sucesso anula todo o dano, falha causa metade." },
        { name: "Tranquilidade da Mente", desc: "Com sua ação, encerre um efeito de Enfeitiçado ou Amedrontado ativo em você." }
      ],
      8: [
        { name: "Aumento no Valor de Habilidade (ASI)", desc: "Aumente um atributo em +2 ou dois atributos em +1." }
      ],
      10: [
        { name: "Pureza Corporal", desc: "Seu Ki o torna imune a doenças e a todo veneno." }
      ],
      12: [
        { name: "Aumento no Valor de Habilidade (ASI)", desc: "Aumente um atributo em +2 ou dois atributos em +1." }
      ],
      13: [
        { name: "Língua do Sol e da Lua", desc: "Você compreende todos os idiomas falados e qualquer criatura com idioma compreende você." }
      ],
      14: [
        { name: "Alma de Diamante", desc: "Ganha proficiência em TODAS as Salvaguardas! Se falhar, pode gastar 1 Ki para re-rolar o teste." }
      ],
      15: [
        { name: "Corpo Atemporal", desc: "Não sofre penalidades de velhice e não precisa de comida ou água para sobreviver." }
      ],
      16: [
        { name: "Aumento no Valor de Habilidade (ASI)", desc: "Aumente um atributo em +2 ou dois atributos em +1." }
      ],
      18: [
        { name: "Corpo Vazio", desc: "Gaste 4 Ki para ficar invisível por 1 minuto e ter resistência a todo dano exceto de força. Gaste 8 Ki para conjurar Projeção Astral." }
      ],
      19: [
        { name: "Aumento no Valor de Habilidade (ASI)", desc: "Aumente um atributo em +2 ou dois atributos em +1." }
      ],
      20: [
        { name: "Auto-Perfeição", desc: "Ao rolar iniciativa sem nenhum ponto de Ki restante, recupere 4 pontos de Ki na hora." }
      ]
    },
    subclasses: {
      "Caminho da Mão Aberta": {
        name: "Caminho da Mão Aberta (Open Hand)",
        levels: {
          3: [{ name: "Técnica da Mão Aberta", desc: "Ao acertar uma criatura com a Rajada de Golpes, imponha um efeito: derrubá-la no chão (salvaguarda DES), empurrá-la 4,5m (salvaguarda FOR) ou impedi-la de usar reações." }],
          6: [{ name: "Integridade Corporal", desc: "Como ação, recupere PV igual a 3 × seu nível de monge (1/descanso longo)." }],
          11: [{ name: "Tranquilidade", desc: "Você ganha o efeito da magia Santuário ao final de cada descanso longo até atacar." }],
          17: [{ name: "Palma Trêmula (Quivering Palm)", desc: "Acerte uma criatura desarmada e gaste 3 Ki para colocar vibrações letais. Mais tarde, use sua ação para forçá-la a Salvaguarda de CON: se falhar, cai para 0 PV imediatamente; se passar, sofre 10d10 de dano necrótico!" }]
        }
      }
    }
  },

  "Patrulheiro": {
    name: "Patrulheiro",
    nameEn: "Ranger",
    hitDie: "d10",
    primaryAttr: "dex",
    saves: ["str", "dex"],
    spellcasting: "half",
    levels: {
      1: [
        { name: "Inimigo Favorito", desc: "Vantagem em testes de Sobrevivência para rastrear e Inteligência para lembrar informações sobre o tipo de inimigo escolhido. Aprende um de seus idiomas." },
        { name: "Explorador Natural", desc: "Especialista em terreno escolhido: terreno difícil não atrasa o grupo, não se perde exceto por meios mágicos, vigia mesmo em outras atividades e rastreia com precisão." }
      ],
      2: [
        { name: "Estilo de Luta", desc: "Escolha entre Arquearia (+2 atk), Defesa (+1 CA), Duelo (+2 dano), ou Duas Armas." },
        { name: "Conjuração de Patrulheiro", desc: "Meio-conjurador primal usando Sabedoria como atributo de magia." }
      ],
      3: [
        { name: "Consciência Primitiva", desc: "Gaste um espaço de magia para sentir se aberrações, celestiais, dragões, elementais, fadas, corruptores ou mortos-vivos estão a até 1,5 km." },
        { name: "Arquétipo de Patrulheiro", desc: "Escolha seu arquétipo (Caçador, Mestre das Feras, Conquistador das Sombras)." }
      ],
      4: [
        { name: "Aumento no Valor de Habilidade (ASI)", desc: "Aumente um atributo em +2 ou dois atributos em +1." }
      ],
      5: [
        { name: "Ataque Adicional", desc: "Ataca duas vezes na ação de Ataque." }
      ],
      8: [
        { name: "Aumento no Valor de Habilidade (ASI)", desc: "Aumente um atributo em +2 ou dois atributos em +1." },
        { name: "Passo da Terra", desc: "Mover-se através de terreno difícil não-mágico não custa deslocamento adicional." }
      ],
      10: [
        { name: "Camuflagem (Hide in Plain Sight)", desc: "Gaste 1 minuto criando camuflagem natural com lama e folhagens para receber +10 em testes de Furtividade enquanto permanecer imóvel." }
      ],
      12: [
        { name: "Aumento no Valor de Habilidade (ASI)", desc: "Aumente um atributo em +2 ou dois atributos em +1." }
      ],
      14: [
        { name: "Desaparecer", desc: "Você pode usar a ação Esconder-se como Ação Bônus. Não pode ser rastreado por meios não-mágicos a menos que queira." }
      ],
      16: [
        { name: "Aumento no Valor de Habilidade (ASI)", desc: "Aumente um atributo em +2 ou dois atributos em +1." }
      ],
      18: [
        { name: "Sentidos Selvagens", desc: "Não tem desvantagem em atacar criaturas que não possa ver a até 9 metros." }
      ],
      19: [
        { name: "Aumento no Valor de Habilidade (ASI)", desc: "Aumente um atributo em +2 ou dois atributos em +1." }
      ],
      20: [
        { name: "Matador de Inimigos", desc: "Uma vez em cada um dos seus turnos, adicione seu Modificador de Sabedoria na jogada de ataque ou no dano contra um de seus Inimigos Favoritos." }
      ]
    },
    subclasses: {
      "Caçador": {
        name: "Caçador (Hunter)",
        levels: {
          3: [{ name: "Presa do Caçador", desc: "Escolha: Colosso (causa +1d8 de dano contra alvo já ferido 1x/turno); Enxame (ataque livre contra inimigo a até 1,5m do alvo); ou Matador de Gigantes (reação para contra-atacar criatura Grande ou maior que erre você)." }],
          7: [{ name: "Táticas Defensivas", desc: "Escolha: Escapar da Horda (ataques de oportunidade contra você têm desvantagem); Defesa Contra Ataques Múltiplos (+4 CA após sofrer primeiro acerto); ou Vontade de Ferro (vantagem contra ser amedrontado)." }],
          11: [{ name: "Ataque Múltiplo", desc: "Ataque em Salve (ataque à distância contra qualquer número de criaturas em um círculo de 3m) ou Ataque Giratório (ataque corpo a corpo contra qualquer número de criaturas a 1,5m)." }],
          15: [{ name: "Defesa Superior do Caçador", desc: "Escolha: Evasão (como a habilidade de Ladino); Esquiva Sobrenatural (metade do dano como reação); ou Desviar o Golpe." }]
        }
      }
    }
  },

  "Feiticeiro": {
    name: "Feiticeiro",
    nameEn: "Sorcerer",
    hitDie: "d6",
    primaryAttr: "cha",
    saves: ["con", "cha"],
    spellcasting: "full",
    levels: {
      1: [
        { name: "Origem da Feitiçaria", desc: "A fonte do seu poder inato (Linhagem Dracônica, Magia Selvagem, Alma Divina)." },
        { name: "Conjuração de Feiticeiro", desc: "Conjurador pleno usando Carisma inato sem necessidade de preparar magias." }
      ],
      2: [
        { name: "Fonte de Magia (Pontos de Feitiçaria)", desc: "Você tem Pontos de Feitiçaria iguais ao seu nível de feiticeiro. Pode converter pontos em espaços de magia e vice-versa durante o combate." }
      ],
      3: [
        { name: "Metamagia (2 opções)", desc: "Adquire 2 opções de Metamagia para moldar magias com Pontos de Feitiçaria (ex: Magia Acelerada [ação bônus], Magia Gêmea [2 alvos], Magia Sutil [sem componentes], Magia Potencializada)." }
      ],
      4: [
        { name: "Aumento no Valor de Habilidade (ASI)", desc: "Aumente um atributo em +2 ou dois atributos em +1." }
      ],
      8: [
        { name: "Aumento no Valor de Habilidade (ASI)", desc: "Aumente um atributo em +2 ou dois atributos em +1." }
      ],
      10: [
        { name: "Metamagia Adicional", desc: "Aprende uma terceira opção de Metamagia." }
      ],
      12: [
        { name: "Aumento no Valor de Habilidade (ASI)", desc: "Aumente um atributo em +2 ou dois atributos em +1." }
      ],
      16: [
        { name: "Aumento no Valor de Habilidade (ASI)", desc: "Aumente um atributo em +2 ou dois atributos em +1." }
      ],
      17: [
        { name: "Metamagia Adicional", desc: "Aprende uma quarta opção de Metamagia." }
      ],
      19: [
        { name: "Aumento no Valor de Habilidade (ASI)", desc: "Aumente um atributo em +2 ou dois atributos em +1." }
      ],
      20: [
        { name: "Restauração de Feitiçaria", desc: "Você recupera 4 pontos de feitiçaria gastos sempre que terminar um descanso curto." }
      ]
    },
    subclasses: {
      "Linhagem Dracônica": {
        name: "Linhagem Dracônica (Draconic Bloodline)",
        levels: {
          1: [
            { name: "Ancestral Dracônico", desc: "Escolha uma cor de dragão (Vermelho = Fogo, Azul = Eletricidade, Branco = Frio, Preto = Ácido, Verde = Veneno). Fala Dracônico." },
            { name: "Resiliência Dracônica", desc: "Seu PV máximo aumenta em +1 por nível de feiticeiro. Enquanto não vestir armadura, sua CA é 13 + Mod. DES graças às escamas mágicas." }
          ],
          6: [{ name: "Afinidade Elemental", desc: "Ao conjurar magia que cause o dano do seu tipo dracônico, adicione seu Mod. CAR a uma rolagem de dano. Pode gastar 1 ponto de feitiçaria para ter resistência a esse dano por 1 hora." }],
          14: [{ name: "Asas de Dragão", desc: "Com ação bônus, brote um par de asas de dragão das suas costas, ganhando deslocamento de voo igual ao seu deslocamento terrestre." }],
          18: [{ name: "Presença Dracônica", desc: "Gaste 5 pontos de feitiçaria para emanar aura de terror ou fascínio de 18 metros por 1 minuto." }]
        }
      }
    }
  },

  "Bruxo": {
    name: "Bruxo",
    nameEn: "Warlock",
    hitDie: "d8",
    primaryAttr: "cha",
    saves: ["wis", "cha"],
    spellcasting: "pact",
    levels: {
      1: [
        { name: "Patrono Transcendental", desc: "Pacto com uma entidade de outro mundo (O Corruptor, A Arquifada, O Grande Antigo, A Lâmina Maldita)." },
        { name: "Magia de Pacto", desc: "Você conjura magias usando Carisma. Todos os seus espaços de magia são do MAIOR círculo disponível e recarregam em DESCANSOS CURTOS e longos!" }
      ],
      2: [
        { name: "Invocações Místicas (2 invocações)", desc: "Aprende 2 Invocações Místicas (ex: Rajada Agonizante [soma Mod. CAR no Rajada Mística], Visão Diabólica [enxerga no escuro mágico 36m], Armadura das Sombras, etc.)." }
      ],
      3: [
        { name: "Dádiva do Pacto", desc: "Seu patrono concede uma dádiva: Pacto da Lâmina (cria arma mágica), Pacto do Tomo (livro com 3 truques quaisquer) ou Pacto da Corrente (familiar aprimorado como diabrete ou pseudodragão)." }
      ],
      4: [
        { name: "Aumento no Valor de Habilidade (ASI)", desc: "Aumente um atributo em +2 ou dois atributos em +1." }
      ],
      5: [
        { name: "Invocações Místicas (3 invocações)", desc: "Aprende uma terceira invocação mística." }
      ],
      7: [
        { name: "Invocações Místicas (4 invocações)", desc: "Aprende uma quarta invocação mística." }
      ],
      8: [
        { name: "Aumento no Valor de Habilidade (ASI)", desc: "Aumente um atributo em +2 ou dois atributos em +1." }
      ],
      9: [
        { name: "Invocações Místicas (5 invocações)", desc: "Aprende uma quinta invocação mística." }
      ],
      11: [
        { name: "Arcano Místico (6º círculo)", desc: "Escolha uma magia de 6º círculo da lista de bruxo: você pode conjurá-la 1 vez por descanso longo sem gastar espaços de magia." }
      ],
      12: [
        { name: "Aumento no Valor de Habilidade (ASI)", desc: "Aumente um atributo em +2 ou dois atributos em +1." },
        { name: "Invocações Místicas (6 invocações)", desc: "Aprende mais uma invocação mística." }
      ],
      13: [
        { name: "Arcano Místico (7º círculo)", desc: "Pode conjurar uma magia de 7º círculo 1x/descanso longo." }
      ],
      15: [
        { name: "Arcano Místico (8º círculo)", desc: "Pode conjurar uma magia de 8º círculo 1x/descanso longo." },
        { name: "Invocações Místicas (7 invocações)", desc: "Aprende mais uma invocação mística." }
      ],
      16: [
        { name: "Aumento no Valor de Habilidade (ASI)", desc: "Aumente um atributo em +2 ou dois atributos em +1." }
      ],
      17: [
        { name: "Arcano Místico (9º círculo)", desc: "Pode conjurar uma magia de 9º círculo supremo 1x/descanso longo." }
      ],
      18: [
        { name: "Invocações Místicas (8 invocações)", desc: "Atinge o ápice com 8 invocações místicas." }
      ],
      19: [
        { name: "Aumento no Valor de Habilidade (ASI)", desc: "Aumente um atributo em +2 ou dois atributos em +1." }
      ],
      20: [
        { name: "Mestre dos Mistérios", desc: "Gaste 1 minuto suplicando ao seu patrono para recuperar todos os seus espaços de Magia de Pacto gastos (1 vez por descanso longo)." }
      ]
    },
    subclasses: {
      "O Corruptor": {
        name: "O Corruptor (The Fiend)",
        levels: {
          1: [{ name: "Bênção do Obscuro", desc: "Ao reduzir um inimigo a 0 PV, você recebe PV Temporários iguais ao seu Mod. CAR + seu nível de bruxo." }],
          6: [{ name: "Sorte do Próprio Obscuro", desc: "Ao fazer um teste de habilidade ou salvaguarda, adicione 1d10 ao resultado (1/descanso curto ou longo)." }],
          10: [{ name: "Resiliência Demoníaca", desc: "Escolha um tipo de dano ao terminar descanso curto ou longo: você ganha resistência a esse dano." }],
          14: [{ name: "Atirar no Inferno (Hurl Through Hell)", desc: "Ao acertar uma criatura com ataque, teletransporte-a através dos planos inferiores por 1 rodada. Ela desaparece e ao retornar sofre 10d10 de dano psíquico (1/descanso longo)!" }]
        }
      }
    }
  }
};

/**
 * Tabela oficial de Espaços de Magia por Nível de Conjurador D&D 5e
 */
const DND5E_SPELL_SLOTS = {
  // Conjuradores Plenos (Mago, Clérigo, Druida, Feiticeiro, Bardo)
  full: {
    1:  { 1: 2 },
    2:  { 1: 3 },
    3:  { 1: 4, 2: 2 },
    4:  { 1: 4, 2: 3 },
    5:  { 1: 4, 2: 3, 3: 2 },
    6:  { 1: 4, 2: 3, 3: 3 },
    7:  { 1: 4, 2: 3, 3: 3, 4: 1 },
    8:  { 1: 4, 2: 3, 3: 3, 4: 2 },
    9:  { 1: 4, 2: 3, 3: 3, 4: 3, 5: 1 },
    10: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2 },
    11: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1 },
    12: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1 },
    13: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1, 7: 1 },
    14: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1, 7: 1 },
    15: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1, 7: 1, 8: 1 },
    16: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1, 7: 1, 8: 1 },
    17: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1, 7: 1, 8: 1, 9: 1 },
    18: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 3, 6: 1, 7: 1, 8: 1, 9: 1 },
    19: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 3, 6: 2, 7: 1, 8: 1, 9: 1 },
    20: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 3, 6: 2, 7: 2, 8: 1, 9: 1 }
  },

  // Meio-Conjuradores (Paladino, Patrulheiro)
  half: {
    1:  {},
    2:  { 1: 2 },
    3:  { 1: 3 },
    4:  { 1: 3 },
    5:  { 1: 4, 2: 2 },
    6:  { 1: 4, 2: 2 },
    7:  { 1: 4, 2: 3 },
    8:  { 1: 4, 2: 3 },
    9:  { 1: 4, 2: 3, 3: 2 },
    10: { 1: 4, 2: 3, 3: 2 },
    11: { 1: 4, 2: 3, 3: 3 },
    12: { 1: 4, 2: 3, 3: 3 },
    13: { 1: 4, 2: 3, 3: 3, 4: 1 },
    14: { 1: 4, 2: 3, 3: 3, 4: 1 },
    15: { 1: 4, 2: 3, 3: 3, 4: 2 },
    16: { 1: 4, 2: 3, 3: 3, 4: 2 },
    17: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 1 },
    18: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 1 },
    19: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2 },
    20: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2 }
  },

  // Um-Terço Conjuradores (Cavaleiro Arcano, Trapaceiro Arcano)
  third: {
    1:  {},
    2:  {},
    3:  { 1: 2 },
    4:  { 1: 3 },
    5:  { 1: 3 },
    6:  { 1: 3 },
    7:  { 1: 4, 2: 2 },
    8:  { 1: 4, 2: 2 },
    9:  { 1: 4, 2: 2 },
    10: { 1: 4, 2: 3 },
    11: { 1: 4, 2: 3 },
    12: { 1: 4, 2: 3 },
    13: { 1: 4, 2: 3, 3: 2 },
    14: { 1: 4, 2: 3, 3: 2 },
    15: { 1: 4, 2: 3, 3: 2 },
    16: { 1: 4, 2: 3, 3: 3 },
    17: { 1: 4, 2: 3, 3: 3 },
    18: { 1: 4, 2: 3, 3: 3 },
    19: { 1: 4, 2: 3, 3: 3, 4: 1 },
    20: { 1: 4, 2: 3, 3: 3, 4: 1 }
  },

  // Magia de Pacto do Bruxo (Warlock)
  pact: {
    1:  { 1: 1 },
    2:  { 1: 2 },
    3:  { 2: 2 },
    4:  { 2: 2 },
    5:  { 3: 2 },
    6:  { 3: 2 },
    7:  { 4: 2 },
    8:  { 4: 2 },
    9:  { 5: 2 },
    10: { 5: 2 },
    11: { 5: 3 },
    12: { 5: 3 },
    13: { 5: 3 },
    14: { 5: 3 },
    15: { 5: 3 },
    16: { 5: 3 },
    17: { 5: 4 },
    18: { 5: 4 },
    19: { 5: 4 },
    20: { 5: 4 }
  }
};

/**
 * Motor de Gerenciamento e Progressão Automática de Classes (ClassEngine)
 */
const ClassEngine = {
  normalize(str) {
    if (!str) return '';
    return str.trim().toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  },

  findClassKey(input) {
    if (!input) return null;
    const clean = this.normalize(input);
    for (const key of Object.keys(DND5E_CLASSES)) {
      const cls = DND5E_CLASSES[key];
      if (this.normalize(key) === clean || this.normalize(cls.nameEn) === clean) {
        return key;
      }
      if (clean.includes(this.normalize(key)) || this.normalize(key).includes(clean)) {
        return key;
      }
    }
    return null;
  },

  findSubclassKey(classKey, subInput) {
    if (!classKey || !subInput) return null;
    const cls = DND5E_CLASSES[classKey];
    if (!cls || !cls.subclasses) return null;
    const clean = this.normalize(subInput);

    for (const key of Object.keys(cls.subclasses)) {
      const sub = cls.subclasses[key];
      if (this.normalize(key) === clean || this.normalize(sub.name).includes(clean) || clean.includes(this.normalize(key))) {
        return key;
      }
    }
    return null;
  },

  getClassData(className) {
    const key = this.findClassKey(className);
    return key ? DND5E_CLASSES[key] : null;
  },

  getAllClassNames() {
    return Object.keys(DND5E_CLASSES);
  },

  getSubclassesForClass(className) {
    const cls = this.getClassData(className);
    if (!cls || !cls.subclasses) return [];
    return Object.keys(cls.subclasses);
  },

  /**
   * Coleta todas as características oficiais até determinado nível
   */
  getClassFeatures(className, subclassName, level) {
    const lvl = Math.max(1, Math.min(20, parseInt(level, 10) || 1));
    const clsKey = this.findClassKey(className);
    if (!clsKey) return [];

    const cls = DND5E_CLASSES[clsKey];
    const features = [];

    // Recursos da Classe Base
    for (let l = 1; l <= lvl; l++) {
      if (cls.levels && cls.levels[l]) {
        cls.levels[l].forEach(f => {
          features.push({
            name: f.name,
            desc: f.desc,
            level: l,
            source: cls.name,
            isClassFeature: true
          });
        });
      }
    }

    // Recursos da Subclasse
    const subKey = this.findSubclassKey(clsKey, subclassName);
    if (subKey && cls.subclasses && cls.subclasses[subKey]) {
      const sub = cls.subclasses[subKey];
      for (let l = 1; l <= lvl; l++) {
        if (sub.levels && sub.levels[l]) {
          sub.levels[l].forEach(f => {
            features.push({
              name: f.name,
              desc: f.desc,
              level: l,
              source: sub.name,
              isClassFeature: true
            });
          });
        }
      }
    }

    return features;
  },

  /**
   * Calcula a matriz de espaços de magia de acordo com classe, subclasse e nível
   */
  calculateSpellSlots(className, subclassName, level, existingSlots = {}) {
    const lvl = Math.max(1, Math.min(20, parseInt(level, 10) || 1));
    const clsKey = this.findClassKey(className);
    let casterType = null;

    if (clsKey) {
      const cls = DND5E_CLASSES[clsKey];
      casterType = cls.spellcasting;

      // Subclasses de 1/3 (Cavaleiro Arcano ou Trapaceiro Arcano)
      const subKey = this.findSubclassKey(clsKey, subclassName);
      if (subKey === "Cavaleiro Arcano" || subKey === "Trapaceiro Arcano") {
        casterType = "third";
      }
    }

    const resultSlots = {};
    for (let c = 1; c <= 9; c++) {
      resultSlots[c] = {
        max: 0,
        used: (existingSlots && existingSlots[c] && existingSlots[c].used) || 0
      };
    }

    if (!casterType || !DND5E_SPELL_SLOTS[casterType]) {
      return resultSlots;
    }

    const table = DND5E_SPELL_SLOTS[casterType][lvl] || {};
    for (const [circ, max] of Object.entries(table)) {
      if (resultSlots[circ]) {
        resultSlots[circ].max = max;
      }
    }

    return resultSlots;
  },

  /**
   * Aplica a progressão automática de classe ao personagem:
   * 1. Preserva características customizadas/raciais existentes criadas pelo usuário
   * 2. Adiciona/atualiza características de classe e subclasse para o nível atual
   * 3. Atualiza Dados de Vida oficiais (ex: 5d12 para Bárbaro, 3d8 para Druida)
   * 4. Atualiza espaços de magia se a classe tiver capacidade de conjuração
   */
  applyClassProgression(char, options = {}) {
    if (!char) return { char, addedCount: 0, newFeatures: [] };

    const level = Math.max(1, Math.min(20, parseInt(char.level, 10) || 1));
    char.level = level;

    const clsKey = this.findClassKey(char.characterClass);
    if (!clsKey) {
      // Classe customizada: apenas garante formato
      if (!char.hitDice) char.hitDice = `${level}d8`;
      else char.hitDice = char.hitDice.replace(/^\d+d/, `${level}d`);
      return { char, addedCount: 0, newFeatures: [] };
    }

    const cls = DND5E_CLASSES[clsKey];
    char.characterClass = cls.name; // Normaliza nome da classe para português oficial

    // Atualiza Dado de Vida de acordo com a classe
    char.hitDice = `${level}${cls.hitDie}`;

    // Obtém características oficiais da classe e subclasse para o nível
    const classFeatures = this.getClassFeatures(cls.name, char.subclass, level);

    // Identifica e preserva traços customizados / raciais criados pelo mestre
    const existingTraits = Array.isArray(char.traits) ? char.traits : [];
    const customTraits = existingTraits.filter(t => !t.isClassFeature);

    // Lista de nomes de traços já existentes para identificar novos desbloqueios
    const existingTraitNames = new Set(existingTraits.map(t => this.normalize(t.name)));
    const newFeaturesUnlocked = [];

    // Mescla características
    const finalTraits = [...customTraits];
    const seenNames = new Set(customTraits.map(t => this.normalize(t.name)));

    classFeatures.forEach(cf => {
      const norm = this.normalize(cf.name);
      if (!seenNames.has(norm)) {
        seenNames.add(norm);
        finalTraits.push(cf);
        if (!existingTraitNames.has(norm)) {
          newFeaturesUnlocked.push(cf.name);
        }
      }
    });

    char.traits = finalTraits;

    // Atualiza espaços de magia para classes conjuradoras
    const updatedSlots = this.calculateSpellSlots(cls.name, char.subclass, level, char.spellSlots);
    const hasAnySpellSlots = Object.values(updatedSlots).some(s => s.max > 0);
    if (hasAnySpellSlots || cls.spellcasting) {
      char.spellSlots = updatedSlots;
    }

    return {
      char,
      addedCount: newFeaturesUnlocked.length,
      newFeatures: newFeaturesUnlocked
    };
  }
};
