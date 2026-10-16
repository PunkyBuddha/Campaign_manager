/**
 * Grimório do Mestre - Motor de Tradução Oficial D&D 5e para Português
 * Traduz nomes de monstros, tipos, tamanhos, fontes, armaduras, sentidos, deslocamento e ações.
 */
const MonsterTranslator = {
  // Dicionário exato de nomes traduzidos oficiais D&D 5e
  EXACT_NAMES: {
    "Aarakocra": "Aarakocra",
    "Aboleth": "Aboleth",
    "Abominable Yeti": "Yeti Abominável",
    "Abyssal Wretch": "Desgraçado Abissal",
    "Acolyte": "Acólito",
    "Adult Blue Dracolich": "Dracolich Azul Adulto",
    "Air Elemental": "Elemental do Ar",
    "Air Elemental Myrmidon": "Mirmidão Elemental do Ar",
    "Albino Dwarf Warrior": "Guerreiro Anão Albino",
    "Aldani (Lobsterfolk)": "Aldani (Povo-Lagosta)",
    "Alhoon": "Alhoon (Devorador de Mentes Morto-vivo)",
    "Alkilith": "Alkilith",
    "Allcorn": "Unicórnio Alado",
    "Allip": "Allip",
    "Allosaurus": "Alossauro",
    "Almiraj": "Almiraj (Lebre-Unicórnio)",
    "Ambush Drake": "Drake de Emboscada",
    "Amnizu": "Amnizu",
    "Anarch": "Anarquista",
    "Androsphinx": "Androesfinge",
    "Animated Armor": "Armadura Animada",
    "Animated Object, Table": "Objeto Animado, Mesa",
    "Ankheg": "Ankheg",
    "Ankylosaurus": "Anquilossauro",
    "Annis Hag": "Bruxa Annis",
    "Ape": "Macaco / Primata",
    "Arcanaloth": "Arcanaloth",
    "Archmage": "Arquimago",
    "Archon of the Triumvirate": "Arconte do Triunvirato",
    "Arclight Phoenix": "Fênix Elétrica",
    "Armanite": "Armanita",
    "Ash Marshall": "Marechal das Cinzas",
    "Assassin": "Assassino",
    "Assassin Vine": "Videira Assassina",
    "Astral Dreadnought": "Dreadnought Astral",
    "Atropal": "Atropal",
    "Aurelia": "Aurélia",
    "Aurochs": "Auroque",
    "Authority": "Autoridade Celestial",
    "Autumn Eladrin": "Eladrin do Outono",
    "Avatar of Death": "Avatar da Morte",
    "Awakened Shrub": "Arbusto Desperto",
    "Awakened Tree": "Árvore Desperta",
    "Awakened Zurkhwood": "Zurkhwood Desperto",
    "Axe Beak": "Bico-de-Machado",
    "Azer": "Azer",
    "Baba Lysaga's Creeping Hut": "Cabana Rastejante de Baba Lysaga",
    "Babau": "Babau",
    "Baboon": "Babuíno",
    "Badger": "Texugo",
    "Bael": "Bael",
    "Balhanoth": "Balhanoth",
    "Ballista": "Balista",
    "Balor": "Balor",
    "Banderhobb": "Banderhobb",
    "Bandit": "Bandido",
    "Bandit Captain": "Capitão dos Bandidos",
    "Banshee": "Banshee",
    "Baphomet": "Baphomet",
    "Barbed Devil": "Diabo Espinhoso",
    "Barghest": "Barghest",
    "Barlgura": "Barlgura",
    "Baron Malgas": "Barão Malgas",
    "Basilisk": "Basilisco",
    "Bat": "Morcego",
    "Battleforce Angel": "Anjo da Força de Batalha",
    "Bearded Devil": "Diabo Barbado",
    "Behir": "Behir",
    "Beholder": "Observador (Beholder)",
    "Beholder Zombie": "Zumbi Beholder",
    "Berbalang": "Berbalang",
    "Berzerker": "Berserker / Furioso",
    "Berserker": "Berserker / Furioso",
    "Bheur Hag": "Bruxa Bheur",
    "Biomancer": "Biomante",
    "Black Abishai": "Abishai Negro",
    "Black Bear": "Urso Negro",
    "Black Earth Guard": "Guarda da Terra Negra",
    "Black Earth Priest": "Sacerdote da Terra Negra",
    "Black Pudding": "Pudim Negro",
    "Blink Dog": "Cão Teleportador (Blink Dog)",
    "Blistercoil Weird": "Estranho Serpentino",
    "Blood Drinker Vampire": "Vampiro Bebedor de Sangue",
    "Blood Hawk": "Falcão de Sangue",
    "Blood Witch": "Bruxa de Sangue",
    "Bloodfray Giant": "Gigante Fratura Sangrenta",
    "Blue Abishai": "Abishai Azul",
    "Blue Slaad": "Slaad Azul",
    "Boar": "Javali",
    "Bodak": "Bodak",
    "Boggle": "Boggle",
    "Bone Devil": "Diabo de Ossos",
    "Bone Naga": "Naga Óssea",
    "Bonebreaker Dorokor": "Dorokor Quebra-Ossos",
    "Boneclaw": "Garra de Osso",
    "Borborygmos": "Borborygmos",
    "Brontosaurus": "Brontossauro",
    "Bronze Scout": "Batedor de Bronze",
    "Broom of Attack": "Vassoura de Ataque",
    "Brown Bear": "Urso Pardo",
    "Bugbear": "Bugbear",
    "Bugbear Chief": "Chefe Bugbear",
    "Bulette": "Bulette",
    "Bulezau": "Bulezau",
    "Bullywug": "Bullywug",
    "Burrowshark": "Tubarão da Terra",
    "Cackler": "Gargalhador",
    "Cadaver Collector": "Coletor de Cadáveres",
    "Cambion": "Cambion",
    "Camel": "Camelo",
    "Cannon": "Canhão",
    "Canoloth": "Canoloth",
    "Carrion Crawler": "Verme Carniceiro (Carrion Crawler)",
    "Cat": "Gato",
    "Catoblepas": "Catóblepa",
    "Cauldron, Suspended": "Caldeirão Suspenso",
    "Cave Fisher": "Pescador das Cavernas",
    "Centaur": "Centauro",
    "Centaur Mummy": "Múmia de Centauro",
    "Chain Devil": "Diabo das Correntes",
    "Change": "Mudança",
    "Chasme": "Chasme",
    "Chimera": "Quimera",
    "Chitine": "Quitina",
    "Choker": "Sufocador",
    "Choldrith": "Choldrith",
    "Chuul": "Chuul",
    "Chwinga": "Chwinga",
    "Clay Golem": "Golem de Barro",
    "Cloaker": "Manto Sombrio (Cloaker)",
    "Cloud Giant": "Gigante das Nuvens",
    "Cloud Giant Smiling One": "Gigante das Nuvens Sorridente",
    "Cockatrice": "Cocatrice",
    "Commoner": "Plebeu",
    "Conclave Dryad": "Dríade do Conclave",
    "Constrictor Snake": "Cobra Constritora",
    "Corpse Flower": "Flor de Cadáver",
    "Cosmotronic Blastseeker": "Buscador Cosmotrônico",
    "Couatl": "Couatl",
    "Counterflux Blastseeker": "Buscador de Contrafluxo",
    "Cow": "Vaca / Boi",
    "Crab": "Caranguejo",
    "Crag Cat": "Gato dos Penhascos",
    "Cranium Rat": "Rato Crânio",
    "Crawling Claw": "Garra Rastejante",
    "Crocodile": "Crocodilo",
    "Crushing Wave Priest": "Sacerdote da Onda Esmagadora",
    "Crushing Wave Reaver": "Saqueador da Onda Esmagadora",
    "Cult Fanatic": "Fanático do Culto",
    "Cultist": "Cultista",
    "Cyclops": "Ciclope",
    "Dao": "Dao (Gênio da Terra)",
    "Dark Tide Knight": "Cavaleiro da Maré Sombria",
    "Darkling": "Darkling",
    "Darkling Elder": "Ancião Darkling",
    "Darkmantle": "Manto Escuro (Darkmantle)",
    "Death": "Morte",
    "Death Dog": "Cão da Morte",
    "Death Kiss": "Beijo da Morte",
    "Death Knight": "Cavaleiro da Morte",
    "Death Slaad": "Slaad da Morte",
    "Death Tyrant": "Tirano da Morte",
    "Deathlock": "Deathlock",
    "Deep Gnome (Svirfneblin)": "Gnomo das Profundezas (Svirfneblin)",
    "Deep Scion": "Herdeiro das Profundezas",
    "Deer": "Cervo",
    "Deinonychus": "Deinonico",
    "Demilich": "Semilich",
    "Demogorgon": "Demogorgon",
    "Derro": "Derro",
    "Deva": "Deva",
    "Dimetrodon": "Dimetrodonte",
    "Dire Troll": "Troll Atroz",
    "Dire Wolf": "Lobo Atroz",
    "Displacer Beast": "Besta Trêmula (Displacer Beast)",
    "Djinni": "Djinni (Gênio do Ar)",
    "Doppelganger": "Doppelganger (Metamorfo)",
    "Draft Horse": "Cavalo de Tração",
    "Dragon Turtle": "Tartaruga Dragão",
    "Dretch": "Dretch",
    "Drider": "Drider",
    "Drow": "Drow (Elfo Negro)",
    "Drow Elite Warrior": "Guerreiro de Elite Drow",
    "Drow Favored Consort": "Consorte Favorecido Drow",
    "Drow House Captain": "Capitão de Casa Drow",
    "Drow Inquisitor": "Inquisidor Drow",
    "Drow Mage": "Mago Drow",
    "Drow Matron Mother": "Madre Matrona Drow",
    "Drow Priestess of Lolth": "Sacerdotisa Drow de Lolth",
    "Drow Shadowblade": "Lâmina Sombria Drow",
    "Druid": "Druida",
    "Dryad": "Dríade",
    "Duergar": "Duergar (Anão Cinzento)",
    "Duergar Despot": "Déspota Duergar",
    "Duergar Hammerer": "Martelador Duergar",
    "Duergar Kavalrachni": "Kavalrachni Duergar",
    "Duergar Mind Master": "Mestre Mental Duergar",
    "Duergar Screamer": "Gritador Duergar",
    "Duergar Soulblade": "Lâmina Espiritual Duergar",
    "Duergar Stone Guard": "Guarda da Pedra Duergar",
    "Duergar Warlord": "Senhor da Guerra Duergar",
    "Duergar Xarrorn": "Xarrorn Duergar",
    "Duodrone": "Duodrone",
    "Dust Mephit": "Mefite da Poeira",
    "Eagle": "Águia",
    "Earth Elemental": "Elemental da Terra",
    "Earth Elemental Myrmidon": "Mirmidão Elemental da Terra",
    "Efreeti": "Efreeti (Gênio do Fogo)",
    "Elder Brain": "Cérebro Ancião",
    "Elder Tempest": "Tempestade Anciã",
    "Elephant": "Elefante",
    "Elk": "Alce",
    "Empyrean": "Empíreo",
    "Erinyes": "Erínia",
    "Ettercap": "Ettercap",
    "Ettin": "Ettin",
    "Evil Mage": "Mago Maligno",
    "Faerie Dragon (Blue)": "Dragão Fada (Azul)",
    "Faerie Dragon (Green)": "Dragão Fada (Verde)",
    "Faerie Dragon (Indigo)": "Dragão Fada (Índigo)",
    "Faerie Dragon (Orange)": "Dragão Fada (Laranja)",
    "Faerie Dragon (Red)": "Dragão Fada (Vermelho)",
    "Faerie Dragon (Violet)": "Dragão Fada (Violeta)",
    "Faerie Dragon (Yellow)": "Dragão Fada (Amarelo)",
    "Fire Elemental": "Elemental do Fogo",
    "Fire Elemental Myrmidon": "Mirmidão Elemental do Fogo",
    "Fire Giant": "Gigante do Fogo",
    "Fire Giant Dreadnought": "Dreadnought Gigante do Fogo",
    "Fire Snake": "Serpente de Fogo",
    "Firenewt Warlock of Imix": "Bruxo Tritonita de Imix",
    "Firenewt Warrior": "Guerreiro Tritonita de Fogo",
    "Flail Snail": "Caracol Flagelo",
    "Flameskull": "Crânio Flamejante",
    "Flesh Golem": "Golem de Carne",
    "Flumph": "Flumph",
    "Flying Snake": "Serpente Voadora",
    "Flying Sword": "Espada Voadora",
    "Fomorian": "Fomoriano",
    "Frog": "Sapo",
    "Froghemoth": "Sapo-Hemoth",
    "Frost Giant": "Gigante do Gelo",
    "Frost Giant Everlasting One": "Gigante do Gelo Eterno",
    "Frost Salamander": "Salamandra do Gelo",
    "Gargoyle": "Gárgula",
    "Gas Spore": "Esporo de Gás",
    "Gelatinous Cube": "Cubo Gelatinoso",
    "Ghast": "Carniçal Superior (Ghast)",
    "Ghost": "Fantasma",
    "Ghoul": "Carniçal (Ghoul)",
    "Giant Ape": "Macaco Gigante",
    "Giant Badger": "Texugo Gigante",
    "Giant Bat": "Morcego Gigante",
    "Giant Boar": "Javali Gigante",
    "Giant Centipede": "Centopeia Gigante",
    "Giant Constrictor Snake": "Cobra Constritora Gigante",
    "Giant Crab": "Caranguejo Gigante",
    "Giant Crocodile": "Crocodilo Gigante",
    "Giant Eagle": "Águia Gigante",
    "Giant Elk": "Alce Gigante",
    "Giant Fire Beetle": "Besouro de Fogo Gigante",
    "Giant Frog": "Sapo Gigante",
    "Giant Goat": "Bode Gigante",
    "Giant Hyena": "Hiena Gigante",
    "Giant Lizard": "Lagarto Gigante",
    "Giant Octopus": "Polvo Gigante",
    "Giant Owl": "Coruja Gigante",
    "Giant Poisonous Snake": "Serpente Venenosa Gigante",
    "Giant Rat": "Rato Gigante",
    "Giant Scorpion": "Escorpião Gigante",
    "Giant Sea Horse": "Cavalo-Marinho Gigante",
    "Giant Shark": "Tubarão Gigante",
    "Giant Skeleton": "Esqueleto Gigante",
    "Giant Snapping Turtle": "Tartaruga Mordedora Gigante",
    "Giant Spider": "Aranha Gigante",
    "Giant Strider": "Pássaro Strider Gigante",
    "Giant Subterranean Lizard": "Lagarto Subterrâneo Gigante",
    "Giant Toad": "Sapo-Boi Gigante",
    "Giant Vulture": "Abutre Gigante",
    "Giant Wasp": "Vespa Gigante",
    "Giant Weasel": "Doninha Gigante",
    "Giant Wolf Spider": "Aranha-Lobo Gigante",
    "Gibbering Mouther": "Boca Balbuciante",
    "Giff": "Giff (Hipopótamo Guerreiro)",
    "Girallon": "Girallon",
    "Githyanki Knight": "Cavaleiro Githyanki",
    "Githyanki Supreme Commander": "Comandante Supremo Githyanki",
    "Githyanki Warrior": "Guerreiro Githyanki",
    "Githzerai Anarch": "Anarquista Githzerai",
    "Githzerai Enlightened": "Iluminado Githzerai",
    "Githzerai Monk": "Monge Githzerai",
    "Githzerai Zerth": "Zerth Githzerai",
    "Glabrezu": "Glabrezu",
    "Gloom Weaver": "Tecelão da Penumbra",
    "Gnoll": "Gnoll",
    "Gnoll Fang of Yeenoghu": "Presa de Yeenoghu Gnoll",
    "Gnoll Flesh Gnawer": "Roedor de Carne Gnoll",
    "Gnoll Hunter": "Caçador Gnoll",
    "Gnoll Pack Lord": "Senhor da Matilha Gnoll",
    "Gnoll Witherling": "Gnoll Ressequido",
    "Goat": "Bode",
    "Goblin": "Goblin",
    "Goblin Boss": "Chefe Goblin",
    "Gorgon": "Górgona (Touro de Ferro)",
    "Goristro": "Goristro",
    "Grave Hound": "Cão da Sepultura",
    "Gray Ooze": "Limo Cinzento",
    "Gray Slaad": "Slaad Cinzento",
    "Green Hag": "Bruxa Verde",
    "Green Slaad": "Slaad Verde",
    "Gremlin": "Gremlin",
    "Grell": "Grell",
    "Grick": "Grick",
    "Grick Alpha": "Grick Alfa",
    "Griffon": "Grifo",
    "Grimlock": "Grimlock",
    "Grumbo": "Grumbo",
    "Guard": "Guarda",
    "Guardian Naga": "Naga Guardiã",
    "Gynosphinx": "Ginoesfinge",
    "Hadrosaurus": "Hadrossauro",
    "Half-Ogre": "Meio-Ogro",
    "Half-Red Dragon Veteran": "Veterano Meio-Dragão Vermelho",
    "Harpy": "Harpia",
    "Hawk": "Falcão",
    "Hell Hound": "Cão do Inferno",
    "Helmed Horror": "Horror de Elmo",
    "Hezrou": "Hezrou",
    "Hill Giant": "Gigante das Colinas",
    "Hippogriff": "Hipogrifo",
    "Hobgoblin": "Hobgoblin",
    "Hobgoblin Captain": "Capitão Hobgoblin",
    "Hobgoblin Devastator": "Devastador Hobgoblin",
    "Hobgoblin Iron Shadow": "Sombra de Ferro Hobgoblin",
    "Hobgoblin Warlord": "Senhor da Guerra Hobgoblin",
    "Homunculus": "Homúnculo",
    "Horned Devil": "Diabo Chifrudo",
    "Howler": "Uivador",
    "Hunter Shark": "Tubarão Caçador",
    "Hydra": "Hidra",
    "Hyena": "Hiena",
    "Ice Devil": "Diabo do Gelo",
    "Ice Mephit": "Mefite do Gelo",
    "Imp": "Diabrete (Imp)",
    "Incubus": "Íncubo",
    "Iron Cobra": "Cobra de Ferro",
    "Iron Golem": "Golem de Ferro",
    "Jackal": "Chacal",
    "Jackalwere": "Chacal-Homem",
    "Juiblex": "Juiblex",
    "Kenku": "Kenku",
    "Killer Whale": "Baleia Assassina (Orca)",
    "Knight": "Cavaleiro",
    "Kobold": "Kobold",
    "Kobold Dragonshield": "Kobold Escudo-de-Dragão",
    "Kobold Inventor": "Inventor Kobold",
    "Kobold Scale Sorcerer": "Feiticeiro Escama Kobold",
    "Korred": "Korred",
    "Kraken": "Kraken",
    "Kraken Priest": "Sacerdote do Kraken",
    "Kuo-toa": "Kuo-toa",
    "Kuo-toa Archpriest": "Arcipreste Kuo-toa",
    "Kuo-toa Whip": "Chicote Kuo-toa",
    "Lamia": "Lâmia",
    "Lemure": "Lêmure",
    "Leucrotta": "Leucrota",
    "Lich": "Lich",
    "Lion": "Leão",
    "Lizard": "Lagarto",
    "Lizardfolk": "Povo-Lagarto",
    "Lizardfolk King/Queen": "Rei/Rainha Povo-Lagarto",
    "Lizardfolk Shaman": "Xamã Povo-Lagarto",
    "Mage": "Mago",
    "Magma Mephit": "Mefite do Magma",
    "Magmin": "Magmin",
    "Mammoth": "Mamute",
    "Manes": "Manes",
    "Manticore": "Manticora",
    "Marid": "Marid (Gênio da Água)",
    "Marilith": "Marilith",
    "Mastiff": "Mastim",
    "Medusa": "Medusa",
    "Meenlock": "Meenlock",
    "Merfolk": "Tritão / Povo do Mar",
    "Merregon": "Merregon",
    "Merrow": "Merrow",
    "Mimic": "Mímico",
    "Mind Flayer": "Devorador de Mentes (Illithid)",
    "Mind Flayer Arcanist": "Arcanista Devorador de Mentes",
    "Minotaur": "Minotauro",
    "Minotaur Skeleton": "Esqueleto de Minotauro",
    "Mormesk the Wraith": "Mormesk o Espectro (Phandelver)",
    "Mud Mephit": "Mefite da Lama",
    "Mule": "Mula",
    "Mummy": "Múmia",
    "Mummy Lord": "Senhor das Múmias",
    "Myconid Adult": "Micônide Adulto",
    "Myconid Sovereign": "Soberano Micônide",
    "Myconid Sprout": "Broto Micônide",
    "Nalfeshnee": "Nalfeshnee",
    "Necromancer": "Necromante",
    "Neogi": "Neogi",
    "Neogi Hatchling": "Filhote de Neogi",
    "Neogi Master": "Mestre Neogi",
    "Nezznar the Black Spider": "Nezznar a Aranha Negra (Phandelver)",
    "Night Hag": "Bruxa da Noite",
    "Nightmare": "Pesadelo",
    "Noble": "Nobre",
    "Nothic": "Nótico",
    "Ochre Jelly": "Gelatina Ocre",
    "Octopus": "Polvo",
    "Ogre": "Ogro",
    "Ogre Battering Ram": "Ogro Aríete",
    "Ogre Bolt Launcher": "Ogro Lança-Virotes",
    "Ogre Chain Brute": "Ogro Bruto de Correntes",
    "Ogre Howdah": "Ogro com Torrete",
    "Ogre Zombie": "Zumbi Ogro",
    "Oni": "Oni (Ogro Mago)",
    "Orc": "Orc",
    "Orc Blade of Ilneval": "Lâmina de Ilneval Orc",
    "Orc Claw of Luthic": "Garra de Luthic Orc",
    "Orc Eye of Gruumsh": "Olho de Gruumsh Orc",
    "Orc Hand of Yurtrus": "Mão de Yurtrus Orc",
    "Orc Nurtured One of Yurtrus": "Nutrido de Yurtrus Orc",
    "Orc Red Fang of Shargaas": "Presa Vermelha de Shargaas Orc",
    "Orc War Chief": "Chefe de Guerra Orc",
    "Orog": "Orog",
    "Otyugh": "Otyugh",
    "Owl": "Coruja",
    "Owlbear": "Urso-Coruja",
    "Ox": "Boi de Carga",
    "Panther": "Pantera",
    "Pegasus": "Pégaso",
    "Peryton": "Peryton",
    "Phase Spider": "Aranha de Fase",
    "Piercer": "Perfurador",
    "Pit Fiend": "Diabo do Fosso",
    "Pixie": "Pixie",
    "Planetar": "Planetar",
    "Plesiosaurus": "Plesiossauro",
    "Poisonous Snake": "Serpente Venenosa",
    "Polar Bear": "Urso Polar",
    "Poltergeist": "Poltergeist",
    "Pony": "Pônei",
    "Priest": "Clérigo / Sacerdote",
    "Pseudodragon": "Pseudodragão",
    "Pteranodon": "Pteranodonte",
    "Purple Worm": "Verme Púrpura",
    "Quaggoth": "Quaggoth",
    "Quaggoth Spore Servant": "Servo de Esporos Quaggoth",
    "Quaggoth Thonot": "Thonot Quaggoth",
    "Quasit": "Quasit",
    "Quickling": "Quickling",
    "Quipper": "Quipper (Peixe Carnívoro)",
    "Rakshasa": "Rakshasa",
    "Rat": "Rato",
    "Raven": "Corvo",
    "Redcap": "Capuz Vermelho (Redcap)",
    "Redbrand Ruffian": "Espoliador Capa Vermelha (Phandelver)",
    "Reef Shark": "Tubarão de Recife",
    "Remorhaz": "Remorhaz",
    "Revenant": "Retornado (Revenant)",
    "Rhinoceros": "Rinoceronte",
    "Riding Horse": "Cavalo de Montaria",
    "Roc": "Roc (Pássaro Roc)",
    "Roper": "Roper (Cordame)",
    "Rot Troll": "Troll da Podridão",
    "Rust Monster": "Monstro da Ferrugem",
    "Saber-Toothed Tiger": "Tigre-Dente-de-Sabre",
    "Sahuagin": "Sahuagin",
    "Sahuagin Baron": "Barão Sahuagin",
    "Sahuagin Champion": "Campeão Sahuagin",
    "Sahuagin High Priestess": "Alta Sacerdotisa Sahuagin",
    "Sahuagin Priestess": "Sacerdotisa Sahuagin",
    "Salamander": "Salamandra",
    "Satyr": "Sátiro",
    "Scarecrow": "Espantalho",
    "Scout": "Batedor",
    "Sea Hag": "Bruxa do Mar",
    "Sea Horse": "Cavalo-Marinho",
    "Sea Spawn": "Cria do Mar",
    "Shadow": "Sombra",
    "Shadow Demon": "Demônio das Sombras",
    "Shadow Mastiff": "Mastim das Sombras",
    "Shambling Mound": "Montículo Cambaleante",
    "Shield Guardian": "Guardião do Escudo",
    "Shoosuva": "Shoosuva",
    "Shrieker": "Gritador",
    "Silver Dragon Wyrmling": "Dragão de Prata Filhote",
    "Skeleton": "Esqueleto",
    "Skulk": "Furtivo (Skulk)",
    "Skull Lord": "Senhor dos Crânios",
    "Slaad Tadpole": "Girino de Slaad",
    "Smoke Mephit": "Mefite da Fumaça",
    "Solar": "Solar",
    "Spectator": "Espectador",
    "Specter": "Espectro",
    "Spider": "Aranha",
    "Spined Devil": "Diabo Espinhoso",
    "Spirit Naga": "Naga Espiritual",
    "Sprite": "Sprite",
    "Spy": "Espião",
    "Star Spawn Grue": "Cria Estelar Grue",
    "Star Spawn Hulk": "Cria Estelar Hulk",
    "Star Spawn Larva Mage": "Mago de Larvas Cria Estelar",
    "Star Spawn Mangler": "Dilacerador Cria Estelar",
    "Star Spawn Seer": "Vidente Cria Estelar",
    "Steam Mephit": "Mefite do Vapor",
    "Stegosaurus": "Estegossauro",
    "Stirge": "Estrige",
    "Stone Giant": "Gigante da Pedra",
    "Stone Giant Dreamwalker": "Andarilho dos Sonhos Gigante da Pedra",
    "Stone Golem": "Golem de Pedra",
    "Storm Giant": "Gigante da Tempestade",
    "Succubus": "Súcubo",
    "Swarm of Bats": "Enxame de Morcegos",
    "Swarm of Centipedes": "Enxame de Centopeias",
    "Swarm of Insects": "Enxame de Insetos",
    "Swarm of Poisonous Snakes": "Enxame de Serpentes Venenosas",
    "Swarm of Quippers": "Enxame de Quippers",
    "Swarm of Rats": "Enxame de Ratos",
    "Swarm of Ravens": "Enxame de Corvos",
    "Swarm of Rot Grubs": "Enxame de Larvas da Podridão",
    "Swarm of Spiders": "Enxame de Aranhas",
    "Swarm of Wasps": "Enxame de Vespas",
    "Sword Wraith Commander": "Comandante Espectro da Espada",
    "Sword Wraith Warrior": "Guerreiro Espectro da Espada",
    "Tanarukk": "Tanarukk",
    "Tarrasque": "Tarrasque",
    "Thief": "Ladrão",
    "Thorn Slinger": "Lança-Espinhos",
    "Thri-kreen": "Thri-kreen",
    "Thug": "Capanga / Valentão",
    "Tiamat": "Tiamat (Rainha dos Dragões)",
    "Tiger": "Tigre",
    "Titanothere": "Titanotério",
    "Tortle": "Tortle (Povo Tartaruga)",
    "Tortle Druid": "Druida Tortle",
    "Trapper": "Apanhador",
    "Treant": "Ente (Treant)",
    "Tribal Warrior": "Guerreiro Tribal",
    "Triceratops": "Triceratops",
    "Troglodyte": "Troglodita",
    "Troll": "Troll",
    "Twig Blight": "Flagelo dos Ramos",
    "Tyrannosaurus Rex": "Tiranossauro Rex",
    "Ulitharid": "Ulitharid",
    "Umber Hulk": "Umber Hulk",
    "Unicorn": "Unicórnio",
    "Vampire": "Vampiro",
    "Vampire Spawn": "Cria de Vampiro",
    "Vargouille": "Vargouille",
    "Vegepygmy": "Vegetanão",
    "Vegepygmy Chief": "Chefe Vegetanão",
    "Velociraptor": "Velociraptor",
    "Venom Troll": "Troll do Veneno",
    "Veteran": "Veterano",
    "Vine Blight": "Flagelo das Vinhas",
    "Vrock": "Vrock",
    "Vulture": "Abutre",
    "War Priest": "Sacerdote de Guerra",
    "Warhorse": "Cavalo de Guerra",
    "Warhorse Skeleton": "Esqueleto de Cavalo de Guerra",
    "Warlock of the Archfey": "Bruxo da Arquifada",
    "Warlock of the Fiend": "Bruxo do Corruptor",
    "Warlock of the Great Old One": "Bruxo do Grande Antigo",
    "Warlord": "Senhor da Guerra",
    "Water Elemental": "Elemental da Água",
    "Water Elemental Myrmidon": "Mirmidão Elemental da Água",
    "Water Weird": "Estranho da Água (Water Weird)",
    "Weasel": "Doninha",
    "Werebear": "Urso-Homem (Licantropo)",
    "Wereboar": "Javali-Homem (Licantropo)",
    "Wererat": "Rato-Homem (Licantropo)",
    "Weretiger": "Tigre-Homem (Licantropo)",
    "Werewolf": "Lobisomem",
    "White Abishai": "Abishai Branco",
    "Wight": "Wight (Aparição)",
    "Will-o'-Wisp": "Fogo-Fátuo",
    "Winter Wolf": "Lobo do Inverno",
    "Wolf": "Lobo",
    "Wood Woad": "Homem-Madeira",
    "Worg": "Worg",
    "Wraith": "Espectro (Wraith)",
    "Wyvern": "Wyvern",
    "Xorn": "Xorn",
    "Yagnoloth": "Yagnoloth",
    "Yeth Hound": "Cão de Yeth",
    "Yeti": "Yeti",
    "Yochlol": "Yochlol",
    "Young Remorhaz": "Remorhaz Jovem",
    "Yuan-ti Abomination": "Abominação Yuan-ti",
    "Yuan-ti Anathema": "Anátema Yuan-ti",
    "Yuan-ti Broodguard": "Guarda de Ninhada Yuan-ti",
    "Yuan-ti Malison": "Malison Yuan-ti",
    "Yuan-ti Mind Whisperer": "Sussurrador Mental Yuan-ti",
    "Yuan-ti Nightmare Speaker": "Orador dos Pesadelos Yuan-ti",
    "Yuan-ti Pit Master": "Mestre do Fosso Yuan-ti",
    "Yuan-ti Pureblood": "Puro-Sangue Yuan-ti",
    "Zaratan": "Zaratan",
    "Zombie": "Zumbi"
  },

  // Tradução de cores / tipos de dragão
  DRAGON_COLORS: {
    "Black": "Negro",
    "Blue": "Azul",
    "Brass": "de Latão",
    "Bronze": "de Bronze",
    "Copper": "de Cobre",
    "Emerald": "de Esmeralda",
    "Gold": "Dourado",
    "Green": "Verde",
    "Red": "Vermelho",
    "Ruby": "de Rubi",
    "Sapphire": "de Safira",
    "Silver": "Prateado",
    "Topaz": "de Topázio",
    "White": "Branco",
    "Amethyst": "de Ametista",
    "Shadow": "das Sombras",
    "Deep": "das Profundezas",
    "Moonstone": "da Pedra da Lua",
    "Crystal": "de Cristal"
  },

  // Tradução de Fontes / Livros
  SOURCES: {
    "Monster Manual": "Manual dos Monstros",
    "Volo's Guide to Monsters": "Guia do Volo sobre Monstros",
    "Volo\u0027s Guide to Monsters": "Guia do Volo sobre Monstros",
    "Mordenkainen's Tome of Foes": "Mordenkainen: Guia dos Inimigos",
    "Mordenkainen\u0027s Tome of Foes": "Mordenkainen: Guia dos Inimigos",
    "Hoard of the Dragon Queen": "O Tesouro da Rainha Dragão (Tirania)",
    "The Rise of Tiamat": "A Ascensão de Tiamat (Tirania)",
    "Rise of Tiamat": "A Ascensão de Tiamat (Tirania)",
    "Lost Mine of Phandelver": "A Mina Perdida de Phandelver",
    "Curse of Strahd": "A Maldição de Strahd",
    "Princes of the Apocalypse": "Príncipes do Apocalipse",
    "Out of the Abyss": "Fora do Abismo",
    "Tomb of Annihilation": "Tumba da Aniquilação",
    "Tales from the Yawning Portal": "Contos do Portal Bocejante",
    "Guildmasters' Guide to Ravnica": "Guia de Ravnica",
    "Guildmasters\u0027 Guide to Ravnica": "Guia de Ravnica",
    "Strongholds & Followers": "Fortalezas & Seguidores",
    "Strongholds \u0026 Followers": "Fortalezas & Seguidores",
    "Dungeon Master's Guide": "Guia do Mestre",
    "Dungeon Master\u0027s Guide": "Guia do Mestre",
    "Storm King's Thunder": "A Tormenta do Rei da Tempestade",
    "Storm King\u0027s Thunder": "A Tormenta do Rei da Tempestade",
    "Icewind Dale": "Vale do Vento Gélido",
    "Van Richten's Guide to Ravenloft": "Guia de Ravenloft"
  },

  // Tradução de Armaduras
  ARMOR_NOTES: {
    "Leather Armor": "Armadura de Couro",
    "Studded Leather": "Couro Batido",
    "Hide Armor": "Armadura de Peles",
    "Chain Shirt": "Camisa de Malha",
    "Scale Mail": "Cota de Escamas",
    "Breastplate": "Peitoral de Aço",
    "Half Plate": "Meia-Armadura",
    "Ring Mail": "Cota de Anéis",
    "Chain Mail": "Cota de Malha",
    "Splint": "Cota de Talas",
    "Plate Armor": "Armadura de Placas",
    "Plate": "Armadura de Placas",
    "natural armor": "armadura natural",
    "Natural Armor": "armadura natural",
    "with mage armor": "com armadura arcana",
    "shield": "escudo",
    "Shield": "escudo",
    "padded": "acolchoada"
  },

  // Tradução de Tamanhos
  SIZES: {
    "Tiny": "Miúdo",
    "Small": "Pequeno",
    "Medium": "Médio",
    "Large": "Grande",
    "Huge": "Enorme",
    "Gargantuan": "Gargantuesco",
    "Miúdo": "Miúdo",
    "Pequeno": "Pequeno",
    "Médio": "Médio",
    "Grande": "Grande",
    "Enorme": "Enorme",
    "Gargantuesco": "Gargantuesco"
  },

  // Tradução de Tipos Principais
  TYPES: {
    "humanoid": "Humanoide",
    "beast": "Besta",
    "monstrosity": "Monstruosidade",
    "dragon": "Dragão",
    "undead": "Morto-vivo",
    "fiend": "Corruptor",
    "aberration": "Aberração",
    "elemental": "Elemental",
    "giant": "Gigante",
    "fey": "Fada",
    "construct": "Constructo",
    "ooze": "Limo",
    "plant": "Planta",
    "celestial": "Celestial",
    "Humanoide": "Humanoide",
    "Besta": "Besta",
    "Monstruosidade": "Monstruosidade",
    "Dragão": "Dragão",
    "Morto-vivo": "Morto-vivo",
    "Corruptor": "Corruptor",
    "Aberração": "Aberração",
    "Elemental": "Elemental",
    "Gigante": "Gigante",
    "Fada": "Fada",
    "Constructo": "Constructo",
    "Limo": "Limo",
    "Planta": "Planta",
    "Celestial": "Celestial"
  },

  translateName(name) {
    if (!name) return "Criatura";
    if (this.EXACT_NAMES[name]) return this.EXACT_NAMES[name];

    // Dragões Adultos
    let m = name.match(/^Adult (\w+) Dragon$/i);
    if (m) {
      const color = this.DRAGON_COLORS[m[1]] || m[1];
      return `Dragão ${color} Adulto`;
    }
    // Dragões Anciões
    m = name.match(/^Ancient (\w+) Dragon$/i);
    if (m) {
      const color = this.DRAGON_COLORS[m[1]] || m[1];
      return `Dragão ${color} Ancião`;
    }
    // Dragões Jovens
    m = name.match(/^Young (\w+) Dragon$/i);
    if (m) {
      const color = this.DRAGON_COLORS[m[1]] || m[1];
      return `Dragão ${color} Jovem`;
    }
    // Dragões Filhotes
    m = name.match(/^(\w+) Dragon Wyrmling$/i) || name.match(/^(\w+) Wyrmling$/i);
    if (m) {
      const color = this.DRAGON_COLORS[m[1]] || m[1];
      return `Dragão ${color} Filhote`;
    }
    // Dracoliches
    m = name.match(/^Adult (\w+) Dracolich$/i);
    if (m) {
      const color = this.DRAGON_COLORS[m[1]] || m[1];
      return `Dracolich ${color} Adulto`;
    }
    m = name.match(/^Ancient (\w+) Dracolich$/i);
    if (m) {
      const color = this.DRAGON_COLORS[m[1]] || m[1];
      return `Dracolich ${color} Ancião`;
    }
    // Enxames
    m = name.match(/^Swarm of (.*)$/i);
    if (m) {
      const sub = this.EXACT_NAMES[m[1]] || m[1];
      return `Enxame de ${sub}`;
    }
    // Gigantes
    m = name.match(/^Giant (.*)$/i);
    if (m) {
      const sub = this.EXACT_NAMES[m[1]] || m[1];
      return `${sub} Gigante`;
    }
    // Zumbis & Esqueletos
    m = name.match(/^(.*?)\s+Zombie$/i);
    if (m) {
      const sub = this.EXACT_NAMES[m[1]] || m[1];
      return `Zumbi de ${sub}`;
    }
    m = name.match(/^(.*?)\s+Skeleton$/i);
    if (m) {
      const sub = this.EXACT_NAMES[m[1]] || m[1];
      return `Esqueleto de ${sub}`;
    }

    return name;
  },

  translateSource(source) {
    if (!source) return "Livro dos Monstros";
    for (const [en, pt] of Object.entries(this.SOURCES)) {
      if (source.includes(en)) return pt;
    }
    return source;
  },

  translateAC(ac) {
    if (!ac) return "10";
    let res = String(ac);
    for (const [en, pt] of Object.entries(this.ARMOR_NOTES)) {
      res = res.replace(new RegExp(en, "gi"), pt);
    }
    return res;
  },

  translateRawType(rawType, fallbackType, size) {
    if (!rawType) return `${this.SIZES[size] || size} • ${this.TYPES[fallbackType] || fallbackType}`;
    let res = rawType;
    // Tamanhos
    for (const [en, pt] of Object.entries(this.SIZES)) {
      res = res.replace(new RegExp(`\\b${en}\\b`, "gi"), pt);
    }
    // Tipos
    for (const [en, pt] of Object.entries(this.TYPES)) {
      res = res.replace(new RegExp(`\\b${en}\\b`, "gi"), pt);
    }
    // Subtipos comuns
    const subMap = {
      "any race": "qualquer raça",
      "demon": "demônio",
      "devil": "diabo",
      "yugoloth": "yugoloth",
      "shapechanger": "metamorfo",
      "titan": "titã",
      "dwarf": "anão",
      "elf": "elfo",
      "human": "humano",
      "orc": "orc",
      "goblinoid": "goblinoide",
      "kobold": "kobold",
      "lizardfolk": "povo-lagarto",
      "gnoll": "gnoll"
    };
    for (const [en, pt] of Object.entries(subMap)) {
      res = res.replace(new RegExp(en, "gi"), pt);
    }
    return res;
  },

  translateSpeed(speed) {
    if (!speed) return "9m (6 quadrados)";
    let s = String(speed);
    // 30 ft. -> 9m (6 sq)
    s = s.replace(/(\d+)\s*ft\.?/gi, (match, p1) => {
      const feet = parseInt(p1, 10);
      const meters = Math.round((feet * 0.3) * 10) / 10;
      const sq = Math.round(feet / 5);
      return `${meters}m (${sq} sq)`;
    });
    s = s.replace(/\bfly\b/gi, "Voo")
         .replace(/\bswim\b/gi, "Natação")
         .replace(/\bburrow\b/gi, "Escavação")
         .replace(/\bclimb\b/gi, "Escalada");
    return s;
  },

  translateSenses(senses) {
    if (!senses) return "Percepção passiva 10";
    let s = String(senses);
    s = s.replace(/darkvision/gi, "Visão no escuro")
         .replace(/blindsight/gi, "Visão às cegas")
         .replace(/tremorsense/gi, "Sentido sísmico")
         .replace(/truesight/gi, "Visão verdadeira")
         .replace(/passive Perception/gi, "Percepção passiva")
         .replace(/(\d+)\s*ft\.?/gi, (m, p1) => `${Math.round(parseInt(p1, 10) * 0.3)}m`);
    return s;
  },

  translateLanguages(lang) {
    if (!lang || lang === "--" || lang === "—") return "Nenhum";
    let l = String(lang);
    const map = {
      "Common": "Comum",
      "Draconic": "Dracônico",
      "Elvish": "Élfico",
      "Dwarvish": "Anão",
      "Goblin": "Goblinoide",
      "Orc": "Orc",
      "Abyssal": "Abissal",
      "Infernal": "Infernal",
      "Celestial": "Celestial",
      "Undercommon": "Subcomum",
      "Sylvan": "Silvestre",
      "Aquan": "Aquan",
      "Auran": "Auran",
      "Ignan": "Ignan",
      "Terran": "Terran",
      "Giant": "Gigante",
      "Gnomish": "Gnômico",
      "Halfling": "Halfling",
      "telepathy": "telepatia",
      "understands": "compreende",
      "can't speak": "não pode falar",
      "cannot speak": "não pode falar"
    };
    for (const [en, pt] of Object.entries(map)) {
      l = l.replace(new RegExp(`\\b${en}\\b`, "gi"), pt);
    }
    l = l.replace(/(\d+)\s*ft\.?/gi, (m, p1) => `${Math.round(parseInt(p1, 10) * 0.3)}m`);
    return l;
  },

  translateActionText(text) {
    if (!text) return "";
    let t = String(text);
    t = t.replace(/Melee or Ranged Weapon Attack:/gi, "Ataque com Arma Corpo a Corpo ou à Distância:")
         .replace(/Melee Weapon Attack:/gi, "Ataque Corpo a Corpo com Arma:")
         .replace(/Ranged Weapon Attack:/gi, "Ataque à Distância com Arma:")
         .replace(/Melee Spell Attack:/gi, "Ataque Mágico Corpo a Corpo:")
         .replace(/Ranged Spell Attack:/gi, "Ataque Mágico à Distância:")
         .replace(/reach\s*(\d+)\s*ft\.?/gi, (m, p1) => `alcance ${Math.round(parseInt(p1, 10) * 0.3)}m`)
         .replace(/range\s*(\d+)\/(\d+)\s*ft\.?/gi, (m, p1, p2) => `distância ${Math.round(parseInt(p1, 10) * 0.3)}/${Math.round(parseInt(p2, 10) * 0.3)}m`)
         .replace(/range\s*(\d+)\s*ft\.?/gi, (m, p1) => `distância ${Math.round(parseInt(p1, 10) * 0.3)}m`)
         .replace(/to hit/gi, "para acertar")
         .replace(/one target/gi, "um alvo")
         .replace(/one creature/gi, "uma criatura")
         .replace(/\bHit:\b/gi, "Acerto:")
         .replace(/\bslashing damage\b/gi, "dano cortante")
         .replace(/\bpiercing damage\b/gi, "dano perfurante")
         .replace(/\bbludgeoning damage\b/gi, "dano de concussão")
         .replace(/\bfire damage\b/gi, "dano de fogo")
         .replace(/\bcold damage\b/gi, "dano de frio")
         .replace(/\blightning damage\b/gi, "dano elétrico")
         .replace(/\bacid damage\b/gi, "dano ácido")
         .replace(/\bpoison damage\b/gi, "dano de veneno")
         .replace(/\bradiant damage\b/gi, "dano radiante")
         .replace(/\bnecrotic damage\b/gi, "dano necrótico")
         .replace(/\bpsychic damage\b/gi, "dano psíquico")
         .replace(/\bforce damage\b/gi, "dano de energia")
         .replace(/saving throw/gi, "salvaguarda")
         .replace(/failed save/gi, "falha na salvaguarda")
         .replace(/successful save/gi, "sucesso na salvaguarda")
         .replace(/\bDC\b/gi, "CD");
    return t;
  },

  /**
   * Processa uma criatura individual para garantir todos os campos em Português
   */
  translateMonster(m) {
    if (!m) return m;
    const originalName = m.nameEn || m.name;
    const ptName = this.translateName(originalName);

    m.nameEn = originalName;
    m.name = ptName;
    m.size = this.SIZES[m.size] || m.size;
    m.type = this.TYPES[m.type] || m.type;
    m.rawType = this.translateRawType(m.rawType, m.type, m.size);
    m.source = this.translateSource(m.source);
    m.ac = this.translateAC(m.ac);
    m.speed = this.translateSpeed(m.speed);
    m.senses = this.translateSenses(m.senses);
    m.languages = this.translateLanguages(m.languages);

    if (m.actions && Array.isArray(m.actions)) {
      m.actions = m.actions.map(act => ({
        ...act,
        name: this.translateActionName(act.name),
        desc: this.translateActionText(act.desc)
      }));
    }

    return m;
  },

  translateActionName(name) {
    if (!name) return "Ação";
    const map = {
      "Multiattack": "Ataques Múltiplos",
      "Bite": "Mordida",
      "Claw": "Garras",
      "Claws": "Garras",
      "Tail": "Cauda",
      "Slam": "Pancada",
      "Longsword": "Espada Longa",
      "Shortsword": "Espada Curta",
      "Greatsword": "Espada Grande",
      "Scimitar": "Cimitarra",
      "Dagger": "Adaga",
      "Shortbow": "Arco Curto",
      "Longbow": "Arco Longo",
      "Crossbow, Heavy": "Besta Pesada",
      "Crossbow, Light": "Besta Leve",
      "Heavy Crossbow": "Besta Pesada",
      "Light Crossbow": "Besta Leve",
      "Javelin": "Azagaia",
      "Spear": "Lança",
      "Greataxe": "Machado Grande",
      "Battleaxe": "Machado de Batalha",
      "Handaxe": "Machadinha",
      "Mace": "Maça",
      "Club": "Clava",
      "Greatclub": "Clava Grande",
      "Quarterstaff": "Bordão",
      "Morningstar": "Maça-Estrela",
      "Warhammer": "Martelo de Guerra",
      "Fire Breath": "Sopro de Fogo",
      "Cold Breath": "Sopro de Gelo",
      "Lightning Breath": "Sopro de Relâmpago",
      "Acid Breath": "Sopro de Ácido",
      "Poison Breath": "Sopro de Veneno",
      "Tentacles": "Tentáculos",
      "Frightful Presence": "Presença Aterradora",
      "Wing Attack": "Ataque com Asas"
    };
    return map[name] || name;
  },

  /**
   * Traduz a base de dados inteira em memória
   */
  translateDatabase(list) {
    if (!Array.isArray(list)) return [];
    return list.map(m => this.translateMonster(m));
  }
};
