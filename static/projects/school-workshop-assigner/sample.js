// Sample roster for the school-workshop-assigner live demo on jfrondeau.fr.
//
// The 29 people in the 5th Solvay Conference photograph (October 1927, class
// "Solvay 1927") and France's 22-man 1998 football World Cup-winning squad —
// 8 workshops, reproducible seeded pseudo-random choices (seed 1927), and 101
// exclusions (every pair of people whose family name shares its first letter).
// This is the exact fixture used by the "Classificateur" screen in Le Tableau
// Noir; the module never parses CSV itself (see its README "Input contract"),
// so the objects are provided ready to pass to assignStudentsToWorkshops().

export const SAMPLE_WORKSHOPS = [
  {
    "name": "Football",
    "maxCapacity": "9"
  },
  {
    "name": "Juggling",
    "maxCapacity": "10"
  },
  {
    "name": "Fluid Mechanics",
    "maxCapacity": "14"
  },
  {
    "name": "Field Theory",
    "maxCapacity": "9"
  },
  {
    "name": "Organic Chemistry",
    "maxCapacity": "5"
  },
  {
    "name": "Sliding Tackles",
    "maxCapacity": "4"
  },
  {
    "name": "Refereeing",
    "maxCapacity": "2"
  },
  {
    "name": "Third Half",
    "maxCapacity": "3"
  }
];

export const SAMPLE_STUDENTS = [
  {
    "lastName": "Piccard",
    "firstName": "Auguste",
    "className": "Solvay 1927",
    "choice1": "Third Half",
    "choice2": "Sliding Tackles",
    "choice3": "Refereeing"
  },
  {
    "lastName": "Henriot",
    "firstName": "Émile",
    "className": "Solvay 1927",
    "choice1": "Fluid Mechanics",
    "choice2": "Organic Chemistry",
    "choice3": "Refereeing"
  },
  {
    "lastName": "Ehrenfest",
    "firstName": "Paul",
    "className": "Solvay 1927",
    "choice1": "Third Half",
    "choice2": "Fluid Mechanics",
    "choice3": "Field Theory"
  },
  {
    "lastName": "Herzen",
    "firstName": "Édouard",
    "className": "Solvay 1927",
    "choice1": "Field Theory",
    "choice2": "Third Half",
    "choice3": "Fluid Mechanics"
  },
  {
    "lastName": "de Donder",
    "firstName": "Théophile",
    "className": "Solvay 1927",
    "choice1": "Refereeing",
    "choice2": "Juggling",
    "choice3": "Football"
  },
  {
    "lastName": "Schrödinger",
    "firstName": "Erwin",
    "className": "Solvay 1927",
    "choice1": "Refereeing",
    "choice2": "Juggling",
    "choice3": "Sliding Tackles"
  },
  {
    "lastName": "Verschaffelt",
    "firstName": "Jules-Émile",
    "className": "Solvay 1927",
    "choice1": "Refereeing",
    "choice2": "Football",
    "choice3": "Field Theory"
  },
  {
    "lastName": "Pauli",
    "firstName": "Wolfgang",
    "className": "Solvay 1927",
    "choice1": "Juggling",
    "choice2": "Sliding Tackles",
    "choice3": "Third Half"
  },
  {
    "lastName": "Heisenberg",
    "firstName": "Werner",
    "className": "Solvay 1927",
    "choice1": "Field Theory",
    "choice2": "Juggling",
    "choice3": "Organic Chemistry"
  },
  {
    "lastName": "Fowler",
    "firstName": "Ralph",
    "className": "Solvay 1927",
    "choice1": "Organic Chemistry",
    "choice2": "Football",
    "choice3": "Third Half"
  },
  {
    "lastName": "Brillouin",
    "firstName": "Léon",
    "className": "Solvay 1927",
    "choice1": "Refereeing",
    "choice2": "Fluid Mechanics",
    "choice3": "Third Half"
  },
  {
    "lastName": "Debye",
    "firstName": "Peter",
    "className": "Solvay 1927",
    "choice1": "Juggling",
    "choice2": "Sliding Tackles",
    "choice3": "Football"
  },
  {
    "lastName": "Knudsen",
    "firstName": "Martin",
    "className": "Solvay 1927",
    "choice1": "Sliding Tackles",
    "choice2": "Football",
    "choice3": "Third Half"
  },
  {
    "lastName": "Bragg",
    "firstName": "William",
    "className": "Solvay 1927",
    "choice1": "Juggling",
    "choice2": "Field Theory",
    "choice3": "Refereeing"
  },
  {
    "lastName": "Kramers",
    "firstName": "Hendrik",
    "className": "Solvay 1927",
    "choice1": "Fluid Mechanics",
    "choice2": "Sliding Tackles",
    "choice3": "Third Half"
  },
  {
    "lastName": "Dirac",
    "firstName": "Paul",
    "className": "Solvay 1927",
    "choice1": "Third Half",
    "choice2": "Field Theory",
    "choice3": "Organic Chemistry"
  },
  {
    "lastName": "Compton",
    "firstName": "Arthur",
    "className": "Solvay 1927",
    "choice1": "Refereeing",
    "choice2": "Fluid Mechanics",
    "choice3": "Sliding Tackles"
  },
  {
    "lastName": "de Broglie",
    "firstName": "Louis",
    "className": "Solvay 1927",
    "choice1": "Sliding Tackles",
    "choice2": "Juggling",
    "choice3": "Organic Chemistry"
  },
  {
    "lastName": "Born",
    "firstName": "Max",
    "className": "Solvay 1927",
    "choice1": "Third Half",
    "choice2": "Juggling",
    "choice3": "Football"
  },
  {
    "lastName": "Bohr",
    "firstName": "Niels",
    "className": "Solvay 1927",
    "choice1": "Refereeing",
    "choice2": "Juggling",
    "choice3": "Football"
  },
  {
    "lastName": "Langmuir",
    "firstName": "Irving",
    "className": "Solvay 1927",
    "choice1": "Field Theory",
    "choice2": "Organic Chemistry",
    "choice3": "Juggling"
  },
  {
    "lastName": "Planck",
    "firstName": "Max",
    "className": "Solvay 1927",
    "choice1": "Football",
    "choice2": "Sliding Tackles",
    "choice3": "Refereeing"
  },
  {
    "lastName": "Curie",
    "firstName": "Marie",
    "className": "Solvay 1927",
    "choice1": "Juggling",
    "choice2": "Field Theory",
    "choice3": "Sliding Tackles"
  },
  {
    "lastName": "Lorentz",
    "firstName": "Hendrik",
    "className": "Solvay 1927",
    "choice1": "Juggling",
    "choice2": "Field Theory",
    "choice3": "Football"
  },
  {
    "lastName": "Einstein",
    "firstName": "Albert",
    "className": "Solvay 1927",
    "choice1": "Fluid Mechanics",
    "choice2": "Organic Chemistry",
    "choice3": "Field Theory"
  },
  {
    "lastName": "Langevin",
    "firstName": "Paul",
    "className": "Solvay 1927",
    "choice1": "Third Half",
    "choice2": "Juggling",
    "choice3": "Football"
  },
  {
    "lastName": "Guye",
    "firstName": "Charles-Eugène",
    "className": "Solvay 1927",
    "choice1": "Organic Chemistry",
    "choice2": "Field Theory",
    "choice3": "Juggling"
  },
  {
    "lastName": "Wilson",
    "firstName": "Charles",
    "className": "Solvay 1927",
    "choice1": "Sliding Tackles",
    "choice2": "Juggling",
    "choice3": "Football"
  },
  {
    "lastName": "Richardson",
    "firstName": "Owen",
    "className": "Solvay 1927",
    "choice1": "Field Theory",
    "choice2": "Football",
    "choice3": "Third Half"
  },
  {
    "lastName": "Lama",
    "firstName": "Bernard",
    "className": "France 98",
    "choice1": "Juggling",
    "choice2": "Sliding Tackles",
    "choice3": "Refereeing"
  },
  {
    "lastName": "Barthez",
    "firstName": "Fabien",
    "className": "France 98",
    "choice1": "Field Theory",
    "choice2": "Sliding Tackles",
    "choice3": "Juggling"
  },
  {
    "lastName": "Charbonnier",
    "firstName": "Lionel",
    "className": "France 98",
    "choice1": "Refereeing",
    "choice2": "Field Theory",
    "choice3": "Fluid Mechanics"
  },
  {
    "lastName": "Blanc",
    "firstName": "Laurent",
    "className": "France 98",
    "choice1": "Juggling",
    "choice2": "Fluid Mechanics",
    "choice3": "Refereeing"
  },
  {
    "lastName": "Desailly",
    "firstName": "Marcel",
    "className": "France 98",
    "choice1": "Field Theory",
    "choice2": "Organic Chemistry",
    "choice3": "Fluid Mechanics"
  },
  {
    "lastName": "Lizarazu",
    "firstName": "Bixente",
    "className": "France 98",
    "choice1": "Refereeing",
    "choice2": "Third Half",
    "choice3": "Field Theory"
  },
  {
    "lastName": "Candela",
    "firstName": "Vincent",
    "className": "France 98",
    "choice1": "Fluid Mechanics",
    "choice2": "Juggling",
    "choice3": "Third Half"
  },
  {
    "lastName": "Karembeu",
    "firstName": "Christian",
    "className": "France 98",
    "choice1": "Third Half",
    "choice2": "Refereeing",
    "choice3": "Field Theory"
  },
  {
    "lastName": "Thuram",
    "firstName": "Lilian",
    "className": "France 98",
    "choice1": "Refereeing",
    "choice2": "Football",
    "choice3": "Field Theory"
  },
  {
    "lastName": "Leboeuf",
    "firstName": "Frank",
    "className": "France 98",
    "choice1": "Third Half",
    "choice2": "Football",
    "choice3": "Field Theory"
  },
  {
    "lastName": "Deschamps",
    "firstName": "Didier",
    "className": "France 98",
    "choice1": "Sliding Tackles",
    "choice2": "Organic Chemistry",
    "choice3": "Third Half"
  },
  {
    "lastName": "Petit",
    "firstName": "Emmanuel",
    "className": "France 98",
    "choice1": "Fluid Mechanics",
    "choice2": "Juggling",
    "choice3": "Refereeing"
  },
  {
    "lastName": "Zidane",
    "firstName": "Zinedine",
    "className": "France 98",
    "choice1": "Fluid Mechanics",
    "choice2": "Organic Chemistry",
    "choice3": "Sliding Tackles"
  },
  {
    "lastName": "Djorkaeff",
    "firstName": "Youri",
    "className": "France 98",
    "choice1": "Third Half",
    "choice2": "Refereeing",
    "choice3": "Field Theory"
  },
  {
    "lastName": "Pirès",
    "firstName": "Robert",
    "className": "France 98",
    "choice1": "Juggling",
    "choice2": "Organic Chemistry",
    "choice3": "Sliding Tackles"
  },
  {
    "lastName": "Vieira",
    "firstName": "Patrick",
    "className": "France 98",
    "choice1": "Football",
    "choice2": "Field Theory",
    "choice3": "Third Half"
  },
  {
    "lastName": "Boghossian",
    "firstName": "Alain",
    "className": "France 98",
    "choice1": "Field Theory",
    "choice2": "Sliding Tackles",
    "choice3": "Third Half"
  },
  {
    "lastName": "Diomède",
    "firstName": "Bernard",
    "className": "France 98",
    "choice1": "Refereeing",
    "choice2": "Organic Chemistry",
    "choice3": "Fluid Mechanics"
  },
  {
    "lastName": "Guivarc'h",
    "firstName": "Stéphane",
    "className": "France 98",
    "choice1": "Football",
    "choice2": "Refereeing",
    "choice3": "Organic Chemistry"
  },
  {
    "lastName": "Dugarry",
    "firstName": "Christophe",
    "className": "France 98",
    "choice1": "Refereeing",
    "choice2": "Juggling",
    "choice3": "Sliding Tackles"
  },
  {
    "lastName": "Henry",
    "firstName": "Thierry",
    "className": "France 98",
    "choice1": "Football",
    "choice2": "Fluid Mechanics",
    "choice3": "Sliding Tackles"
  },
  {
    "lastName": "Trezeguet",
    "firstName": "David",
    "className": "France 98",
    "choice1": "Fluid Mechanics",
    "choice2": "Organic Chemistry",
    "choice3": "Sliding Tackles"
  }
];

export const SAMPLE_EXCLUSIONS = [
  {
    "studentA": {
      "lastName": "Piccard",
      "firstName": "Auguste",
      "className": "Solvay 1927"
    },
    "studentB": {
      "lastName": "Pauli",
      "firstName": "Wolfgang",
      "className": "Solvay 1927"
    }
  },
  {
    "studentA": {
      "lastName": "Piccard",
      "firstName": "Auguste",
      "className": "Solvay 1927"
    },
    "studentB": {
      "lastName": "Planck",
      "firstName": "Max",
      "className": "Solvay 1927"
    }
  },
  {
    "studentA": {
      "lastName": "Piccard",
      "firstName": "Auguste",
      "className": "Solvay 1927"
    },
    "studentB": {
      "lastName": "Petit",
      "firstName": "Emmanuel",
      "className": "France 98"
    }
  },
  {
    "studentA": {
      "lastName": "Piccard",
      "firstName": "Auguste",
      "className": "Solvay 1927"
    },
    "studentB": {
      "lastName": "Pirès",
      "firstName": "Robert",
      "className": "France 98"
    }
  },
  {
    "studentA": {
      "lastName": "Henriot",
      "firstName": "Émile",
      "className": "Solvay 1927"
    },
    "studentB": {
      "lastName": "Herzen",
      "firstName": "Édouard",
      "className": "Solvay 1927"
    }
  },
  {
    "studentA": {
      "lastName": "Henriot",
      "firstName": "Émile",
      "className": "Solvay 1927"
    },
    "studentB": {
      "lastName": "Heisenberg",
      "firstName": "Werner",
      "className": "Solvay 1927"
    }
  },
  {
    "studentA": {
      "lastName": "Henriot",
      "firstName": "Émile",
      "className": "Solvay 1927"
    },
    "studentB": {
      "lastName": "Henry",
      "firstName": "Thierry",
      "className": "France 98"
    }
  },
  {
    "studentA": {
      "lastName": "Ehrenfest",
      "firstName": "Paul",
      "className": "Solvay 1927"
    },
    "studentB": {
      "lastName": "Einstein",
      "firstName": "Albert",
      "className": "Solvay 1927"
    }
  },
  {
    "studentA": {
      "lastName": "Herzen",
      "firstName": "Édouard",
      "className": "Solvay 1927"
    },
    "studentB": {
      "lastName": "Heisenberg",
      "firstName": "Werner",
      "className": "Solvay 1927"
    }
  },
  {
    "studentA": {
      "lastName": "Herzen",
      "firstName": "Édouard",
      "className": "Solvay 1927"
    },
    "studentB": {
      "lastName": "Henry",
      "firstName": "Thierry",
      "className": "France 98"
    }
  },
  {
    "studentA": {
      "lastName": "de Donder",
      "firstName": "Théophile",
      "className": "Solvay 1927"
    },
    "studentB": {
      "lastName": "Debye",
      "firstName": "Peter",
      "className": "Solvay 1927"
    }
  },
  {
    "studentA": {
      "lastName": "de Donder",
      "firstName": "Théophile",
      "className": "Solvay 1927"
    },
    "studentB": {
      "lastName": "Dirac",
      "firstName": "Paul",
      "className": "Solvay 1927"
    }
  },
  {
    "studentA": {
      "lastName": "de Donder",
      "firstName": "Théophile",
      "className": "Solvay 1927"
    },
    "studentB": {
      "lastName": "de Broglie",
      "firstName": "Louis",
      "className": "Solvay 1927"
    }
  },
  {
    "studentA": {
      "lastName": "de Donder",
      "firstName": "Théophile",
      "className": "Solvay 1927"
    },
    "studentB": {
      "lastName": "Desailly",
      "firstName": "Marcel",
      "className": "France 98"
    }
  },
  {
    "studentA": {
      "lastName": "de Donder",
      "firstName": "Théophile",
      "className": "Solvay 1927"
    },
    "studentB": {
      "lastName": "Deschamps",
      "firstName": "Didier",
      "className": "France 98"
    }
  },
  {
    "studentA": {
      "lastName": "de Donder",
      "firstName": "Théophile",
      "className": "Solvay 1927"
    },
    "studentB": {
      "lastName": "Djorkaeff",
      "firstName": "Youri",
      "className": "France 98"
    }
  },
  {
    "studentA": {
      "lastName": "de Donder",
      "firstName": "Théophile",
      "className": "Solvay 1927"
    },
    "studentB": {
      "lastName": "Diomède",
      "firstName": "Bernard",
      "className": "France 98"
    }
  },
  {
    "studentA": {
      "lastName": "de Donder",
      "firstName": "Théophile",
      "className": "Solvay 1927"
    },
    "studentB": {
      "lastName": "Dugarry",
      "firstName": "Christophe",
      "className": "France 98"
    }
  },
  {
    "studentA": {
      "lastName": "Verschaffelt",
      "firstName": "Jules-Émile",
      "className": "Solvay 1927"
    },
    "studentB": {
      "lastName": "Vieira",
      "firstName": "Patrick",
      "className": "France 98"
    }
  },
  {
    "studentA": {
      "lastName": "Pauli",
      "firstName": "Wolfgang",
      "className": "Solvay 1927"
    },
    "studentB": {
      "lastName": "Planck",
      "firstName": "Max",
      "className": "Solvay 1927"
    }
  },
  {
    "studentA": {
      "lastName": "Pauli",
      "firstName": "Wolfgang",
      "className": "Solvay 1927"
    },
    "studentB": {
      "lastName": "Petit",
      "firstName": "Emmanuel",
      "className": "France 98"
    }
  },
  {
    "studentA": {
      "lastName": "Pauli",
      "firstName": "Wolfgang",
      "className": "Solvay 1927"
    },
    "studentB": {
      "lastName": "Pirès",
      "firstName": "Robert",
      "className": "France 98"
    }
  },
  {
    "studentA": {
      "lastName": "Heisenberg",
      "firstName": "Werner",
      "className": "Solvay 1927"
    },
    "studentB": {
      "lastName": "Henry",
      "firstName": "Thierry",
      "className": "France 98"
    }
  },
  {
    "studentA": {
      "lastName": "Brillouin",
      "firstName": "Léon",
      "className": "Solvay 1927"
    },
    "studentB": {
      "lastName": "Bragg",
      "firstName": "William",
      "className": "Solvay 1927"
    }
  },
  {
    "studentA": {
      "lastName": "Brillouin",
      "firstName": "Léon",
      "className": "Solvay 1927"
    },
    "studentB": {
      "lastName": "Born",
      "firstName": "Max",
      "className": "Solvay 1927"
    }
  },
  {
    "studentA": {
      "lastName": "Brillouin",
      "firstName": "Léon",
      "className": "Solvay 1927"
    },
    "studentB": {
      "lastName": "Bohr",
      "firstName": "Niels",
      "className": "Solvay 1927"
    }
  },
  {
    "studentA": {
      "lastName": "Brillouin",
      "firstName": "Léon",
      "className": "Solvay 1927"
    },
    "studentB": {
      "lastName": "Barthez",
      "firstName": "Fabien",
      "className": "France 98"
    }
  },
  {
    "studentA": {
      "lastName": "Brillouin",
      "firstName": "Léon",
      "className": "Solvay 1927"
    },
    "studentB": {
      "lastName": "Blanc",
      "firstName": "Laurent",
      "className": "France 98"
    }
  },
  {
    "studentA": {
      "lastName": "Brillouin",
      "firstName": "Léon",
      "className": "Solvay 1927"
    },
    "studentB": {
      "lastName": "Boghossian",
      "firstName": "Alain",
      "className": "France 98"
    }
  },
  {
    "studentA": {
      "lastName": "Debye",
      "firstName": "Peter",
      "className": "Solvay 1927"
    },
    "studentB": {
      "lastName": "Dirac",
      "firstName": "Paul",
      "className": "Solvay 1927"
    }
  },
  {
    "studentA": {
      "lastName": "Debye",
      "firstName": "Peter",
      "className": "Solvay 1927"
    },
    "studentB": {
      "lastName": "de Broglie",
      "firstName": "Louis",
      "className": "Solvay 1927"
    }
  },
  {
    "studentA": {
      "lastName": "Debye",
      "firstName": "Peter",
      "className": "Solvay 1927"
    },
    "studentB": {
      "lastName": "Desailly",
      "firstName": "Marcel",
      "className": "France 98"
    }
  },
  {
    "studentA": {
      "lastName": "Debye",
      "firstName": "Peter",
      "className": "Solvay 1927"
    },
    "studentB": {
      "lastName": "Deschamps",
      "firstName": "Didier",
      "className": "France 98"
    }
  },
  {
    "studentA": {
      "lastName": "Debye",
      "firstName": "Peter",
      "className": "Solvay 1927"
    },
    "studentB": {
      "lastName": "Djorkaeff",
      "firstName": "Youri",
      "className": "France 98"
    }
  },
  {
    "studentA": {
      "lastName": "Debye",
      "firstName": "Peter",
      "className": "Solvay 1927"
    },
    "studentB": {
      "lastName": "Diomède",
      "firstName": "Bernard",
      "className": "France 98"
    }
  },
  {
    "studentA": {
      "lastName": "Debye",
      "firstName": "Peter",
      "className": "Solvay 1927"
    },
    "studentB": {
      "lastName": "Dugarry",
      "firstName": "Christophe",
      "className": "France 98"
    }
  },
  {
    "studentA": {
      "lastName": "Knudsen",
      "firstName": "Martin",
      "className": "Solvay 1927"
    },
    "studentB": {
      "lastName": "Kramers",
      "firstName": "Hendrik",
      "className": "Solvay 1927"
    }
  },
  {
    "studentA": {
      "lastName": "Knudsen",
      "firstName": "Martin",
      "className": "Solvay 1927"
    },
    "studentB": {
      "lastName": "Karembeu",
      "firstName": "Christian",
      "className": "France 98"
    }
  },
  {
    "studentA": {
      "lastName": "Bragg",
      "firstName": "William",
      "className": "Solvay 1927"
    },
    "studentB": {
      "lastName": "Born",
      "firstName": "Max",
      "className": "Solvay 1927"
    }
  },
  {
    "studentA": {
      "lastName": "Bragg",
      "firstName": "William",
      "className": "Solvay 1927"
    },
    "studentB": {
      "lastName": "Bohr",
      "firstName": "Niels",
      "className": "Solvay 1927"
    }
  },
  {
    "studentA": {
      "lastName": "Bragg",
      "firstName": "William",
      "className": "Solvay 1927"
    },
    "studentB": {
      "lastName": "Barthez",
      "firstName": "Fabien",
      "className": "France 98"
    }
  },
  {
    "studentA": {
      "lastName": "Bragg",
      "firstName": "William",
      "className": "Solvay 1927"
    },
    "studentB": {
      "lastName": "Blanc",
      "firstName": "Laurent",
      "className": "France 98"
    }
  },
  {
    "studentA": {
      "lastName": "Bragg",
      "firstName": "William",
      "className": "Solvay 1927"
    },
    "studentB": {
      "lastName": "Boghossian",
      "firstName": "Alain",
      "className": "France 98"
    }
  },
  {
    "studentA": {
      "lastName": "Kramers",
      "firstName": "Hendrik",
      "className": "Solvay 1927"
    },
    "studentB": {
      "lastName": "Karembeu",
      "firstName": "Christian",
      "className": "France 98"
    }
  },
  {
    "studentA": {
      "lastName": "Dirac",
      "firstName": "Paul",
      "className": "Solvay 1927"
    },
    "studentB": {
      "lastName": "de Broglie",
      "firstName": "Louis",
      "className": "Solvay 1927"
    }
  },
  {
    "studentA": {
      "lastName": "Dirac",
      "firstName": "Paul",
      "className": "Solvay 1927"
    },
    "studentB": {
      "lastName": "Desailly",
      "firstName": "Marcel",
      "className": "France 98"
    }
  },
  {
    "studentA": {
      "lastName": "Dirac",
      "firstName": "Paul",
      "className": "Solvay 1927"
    },
    "studentB": {
      "lastName": "Deschamps",
      "firstName": "Didier",
      "className": "France 98"
    }
  },
  {
    "studentA": {
      "lastName": "Dirac",
      "firstName": "Paul",
      "className": "Solvay 1927"
    },
    "studentB": {
      "lastName": "Djorkaeff",
      "firstName": "Youri",
      "className": "France 98"
    }
  },
  {
    "studentA": {
      "lastName": "Dirac",
      "firstName": "Paul",
      "className": "Solvay 1927"
    },
    "studentB": {
      "lastName": "Diomède",
      "firstName": "Bernard",
      "className": "France 98"
    }
  },
  {
    "studentA": {
      "lastName": "Dirac",
      "firstName": "Paul",
      "className": "Solvay 1927"
    },
    "studentB": {
      "lastName": "Dugarry",
      "firstName": "Christophe",
      "className": "France 98"
    }
  },
  {
    "studentA": {
      "lastName": "Compton",
      "firstName": "Arthur",
      "className": "Solvay 1927"
    },
    "studentB": {
      "lastName": "Curie",
      "firstName": "Marie",
      "className": "Solvay 1927"
    }
  },
  {
    "studentA": {
      "lastName": "Compton",
      "firstName": "Arthur",
      "className": "Solvay 1927"
    },
    "studentB": {
      "lastName": "Charbonnier",
      "firstName": "Lionel",
      "className": "France 98"
    }
  },
  {
    "studentA": {
      "lastName": "Compton",
      "firstName": "Arthur",
      "className": "Solvay 1927"
    },
    "studentB": {
      "lastName": "Candela",
      "firstName": "Vincent",
      "className": "France 98"
    }
  },
  {
    "studentA": {
      "lastName": "de Broglie",
      "firstName": "Louis",
      "className": "Solvay 1927"
    },
    "studentB": {
      "lastName": "Desailly",
      "firstName": "Marcel",
      "className": "France 98"
    }
  },
  {
    "studentA": {
      "lastName": "de Broglie",
      "firstName": "Louis",
      "className": "Solvay 1927"
    },
    "studentB": {
      "lastName": "Deschamps",
      "firstName": "Didier",
      "className": "France 98"
    }
  },
  {
    "studentA": {
      "lastName": "de Broglie",
      "firstName": "Louis",
      "className": "Solvay 1927"
    },
    "studentB": {
      "lastName": "Djorkaeff",
      "firstName": "Youri",
      "className": "France 98"
    }
  },
  {
    "studentA": {
      "lastName": "de Broglie",
      "firstName": "Louis",
      "className": "Solvay 1927"
    },
    "studentB": {
      "lastName": "Diomède",
      "firstName": "Bernard",
      "className": "France 98"
    }
  },
  {
    "studentA": {
      "lastName": "de Broglie",
      "firstName": "Louis",
      "className": "Solvay 1927"
    },
    "studentB": {
      "lastName": "Dugarry",
      "firstName": "Christophe",
      "className": "France 98"
    }
  },
  {
    "studentA": {
      "lastName": "Born",
      "firstName": "Max",
      "className": "Solvay 1927"
    },
    "studentB": {
      "lastName": "Bohr",
      "firstName": "Niels",
      "className": "Solvay 1927"
    }
  },
  {
    "studentA": {
      "lastName": "Born",
      "firstName": "Max",
      "className": "Solvay 1927"
    },
    "studentB": {
      "lastName": "Barthez",
      "firstName": "Fabien",
      "className": "France 98"
    }
  },
  {
    "studentA": {
      "lastName": "Born",
      "firstName": "Max",
      "className": "Solvay 1927"
    },
    "studentB": {
      "lastName": "Blanc",
      "firstName": "Laurent",
      "className": "France 98"
    }
  },
  {
    "studentA": {
      "lastName": "Born",
      "firstName": "Max",
      "className": "Solvay 1927"
    },
    "studentB": {
      "lastName": "Boghossian",
      "firstName": "Alain",
      "className": "France 98"
    }
  },
  {
    "studentA": {
      "lastName": "Bohr",
      "firstName": "Niels",
      "className": "Solvay 1927"
    },
    "studentB": {
      "lastName": "Barthez",
      "firstName": "Fabien",
      "className": "France 98"
    }
  },
  {
    "studentA": {
      "lastName": "Bohr",
      "firstName": "Niels",
      "className": "Solvay 1927"
    },
    "studentB": {
      "lastName": "Blanc",
      "firstName": "Laurent",
      "className": "France 98"
    }
  },
  {
    "studentA": {
      "lastName": "Bohr",
      "firstName": "Niels",
      "className": "Solvay 1927"
    },
    "studentB": {
      "lastName": "Boghossian",
      "firstName": "Alain",
      "className": "France 98"
    }
  },
  {
    "studentA": {
      "lastName": "Langmuir",
      "firstName": "Irving",
      "className": "Solvay 1927"
    },
    "studentB": {
      "lastName": "Lorentz",
      "firstName": "Hendrik",
      "className": "Solvay 1927"
    }
  },
  {
    "studentA": {
      "lastName": "Langmuir",
      "firstName": "Irving",
      "className": "Solvay 1927"
    },
    "studentB": {
      "lastName": "Langevin",
      "firstName": "Paul",
      "className": "Solvay 1927"
    }
  },
  {
    "studentA": {
      "lastName": "Langmuir",
      "firstName": "Irving",
      "className": "Solvay 1927"
    },
    "studentB": {
      "lastName": "Lama",
      "firstName": "Bernard",
      "className": "France 98"
    }
  },
  {
    "studentA": {
      "lastName": "Langmuir",
      "firstName": "Irving",
      "className": "Solvay 1927"
    },
    "studentB": {
      "lastName": "Lizarazu",
      "firstName": "Bixente",
      "className": "France 98"
    }
  },
  {
    "studentA": {
      "lastName": "Langmuir",
      "firstName": "Irving",
      "className": "Solvay 1927"
    },
    "studentB": {
      "lastName": "Leboeuf",
      "firstName": "Frank",
      "className": "France 98"
    }
  },
  {
    "studentA": {
      "lastName": "Planck",
      "firstName": "Max",
      "className": "Solvay 1927"
    },
    "studentB": {
      "lastName": "Petit",
      "firstName": "Emmanuel",
      "className": "France 98"
    }
  },
  {
    "studentA": {
      "lastName": "Planck",
      "firstName": "Max",
      "className": "Solvay 1927"
    },
    "studentB": {
      "lastName": "Pirès",
      "firstName": "Robert",
      "className": "France 98"
    }
  },
  {
    "studentA": {
      "lastName": "Curie",
      "firstName": "Marie",
      "className": "Solvay 1927"
    },
    "studentB": {
      "lastName": "Charbonnier",
      "firstName": "Lionel",
      "className": "France 98"
    }
  },
  {
    "studentA": {
      "lastName": "Curie",
      "firstName": "Marie",
      "className": "Solvay 1927"
    },
    "studentB": {
      "lastName": "Candela",
      "firstName": "Vincent",
      "className": "France 98"
    }
  },
  {
    "studentA": {
      "lastName": "Lorentz",
      "firstName": "Hendrik",
      "className": "Solvay 1927"
    },
    "studentB": {
      "lastName": "Langevin",
      "firstName": "Paul",
      "className": "Solvay 1927"
    }
  },
  {
    "studentA": {
      "lastName": "Lorentz",
      "firstName": "Hendrik",
      "className": "Solvay 1927"
    },
    "studentB": {
      "lastName": "Lama",
      "firstName": "Bernard",
      "className": "France 98"
    }
  },
  {
    "studentA": {
      "lastName": "Lorentz",
      "firstName": "Hendrik",
      "className": "Solvay 1927"
    },
    "studentB": {
      "lastName": "Lizarazu",
      "firstName": "Bixente",
      "className": "France 98"
    }
  },
  {
    "studentA": {
      "lastName": "Lorentz",
      "firstName": "Hendrik",
      "className": "Solvay 1927"
    },
    "studentB": {
      "lastName": "Leboeuf",
      "firstName": "Frank",
      "className": "France 98"
    }
  },
  {
    "studentA": {
      "lastName": "Langevin",
      "firstName": "Paul",
      "className": "Solvay 1927"
    },
    "studentB": {
      "lastName": "Lama",
      "firstName": "Bernard",
      "className": "France 98"
    }
  },
  {
    "studentA": {
      "lastName": "Langevin",
      "firstName": "Paul",
      "className": "Solvay 1927"
    },
    "studentB": {
      "lastName": "Lizarazu",
      "firstName": "Bixente",
      "className": "France 98"
    }
  },
  {
    "studentA": {
      "lastName": "Langevin",
      "firstName": "Paul",
      "className": "Solvay 1927"
    },
    "studentB": {
      "lastName": "Leboeuf",
      "firstName": "Frank",
      "className": "France 98"
    }
  },
  {
    "studentA": {
      "lastName": "Guye",
      "firstName": "Charles-Eugène",
      "className": "Solvay 1927"
    },
    "studentB": {
      "lastName": "Guivarc'h",
      "firstName": "Stéphane",
      "className": "France 98"
    }
  },
  {
    "studentA": {
      "lastName": "Lama",
      "firstName": "Bernard",
      "className": "France 98"
    },
    "studentB": {
      "lastName": "Lizarazu",
      "firstName": "Bixente",
      "className": "France 98"
    }
  },
  {
    "studentA": {
      "lastName": "Lama",
      "firstName": "Bernard",
      "className": "France 98"
    },
    "studentB": {
      "lastName": "Leboeuf",
      "firstName": "Frank",
      "className": "France 98"
    }
  },
  {
    "studentA": {
      "lastName": "Barthez",
      "firstName": "Fabien",
      "className": "France 98"
    },
    "studentB": {
      "lastName": "Blanc",
      "firstName": "Laurent",
      "className": "France 98"
    }
  },
  {
    "studentA": {
      "lastName": "Barthez",
      "firstName": "Fabien",
      "className": "France 98"
    },
    "studentB": {
      "lastName": "Boghossian",
      "firstName": "Alain",
      "className": "France 98"
    }
  },
  {
    "studentA": {
      "lastName": "Charbonnier",
      "firstName": "Lionel",
      "className": "France 98"
    },
    "studentB": {
      "lastName": "Candela",
      "firstName": "Vincent",
      "className": "France 98"
    }
  },
  {
    "studentA": {
      "lastName": "Blanc",
      "firstName": "Laurent",
      "className": "France 98"
    },
    "studentB": {
      "lastName": "Boghossian",
      "firstName": "Alain",
      "className": "France 98"
    }
  },
  {
    "studentA": {
      "lastName": "Desailly",
      "firstName": "Marcel",
      "className": "France 98"
    },
    "studentB": {
      "lastName": "Deschamps",
      "firstName": "Didier",
      "className": "France 98"
    }
  },
  {
    "studentA": {
      "lastName": "Desailly",
      "firstName": "Marcel",
      "className": "France 98"
    },
    "studentB": {
      "lastName": "Djorkaeff",
      "firstName": "Youri",
      "className": "France 98"
    }
  },
  {
    "studentA": {
      "lastName": "Desailly",
      "firstName": "Marcel",
      "className": "France 98"
    },
    "studentB": {
      "lastName": "Diomède",
      "firstName": "Bernard",
      "className": "France 98"
    }
  },
  {
    "studentA": {
      "lastName": "Desailly",
      "firstName": "Marcel",
      "className": "France 98"
    },
    "studentB": {
      "lastName": "Dugarry",
      "firstName": "Christophe",
      "className": "France 98"
    }
  },
  {
    "studentA": {
      "lastName": "Lizarazu",
      "firstName": "Bixente",
      "className": "France 98"
    },
    "studentB": {
      "lastName": "Leboeuf",
      "firstName": "Frank",
      "className": "France 98"
    }
  },
  {
    "studentA": {
      "lastName": "Thuram",
      "firstName": "Lilian",
      "className": "France 98"
    },
    "studentB": {
      "lastName": "Trezeguet",
      "firstName": "David",
      "className": "France 98"
    }
  },
  {
    "studentA": {
      "lastName": "Deschamps",
      "firstName": "Didier",
      "className": "France 98"
    },
    "studentB": {
      "lastName": "Djorkaeff",
      "firstName": "Youri",
      "className": "France 98"
    }
  },
  {
    "studentA": {
      "lastName": "Deschamps",
      "firstName": "Didier",
      "className": "France 98"
    },
    "studentB": {
      "lastName": "Diomède",
      "firstName": "Bernard",
      "className": "France 98"
    }
  },
  {
    "studentA": {
      "lastName": "Deschamps",
      "firstName": "Didier",
      "className": "France 98"
    },
    "studentB": {
      "lastName": "Dugarry",
      "firstName": "Christophe",
      "className": "France 98"
    }
  },
  {
    "studentA": {
      "lastName": "Petit",
      "firstName": "Emmanuel",
      "className": "France 98"
    },
    "studentB": {
      "lastName": "Pirès",
      "firstName": "Robert",
      "className": "France 98"
    }
  },
  {
    "studentA": {
      "lastName": "Djorkaeff",
      "firstName": "Youri",
      "className": "France 98"
    },
    "studentB": {
      "lastName": "Diomède",
      "firstName": "Bernard",
      "className": "France 98"
    }
  },
  {
    "studentA": {
      "lastName": "Djorkaeff",
      "firstName": "Youri",
      "className": "France 98"
    },
    "studentB": {
      "lastName": "Dugarry",
      "firstName": "Christophe",
      "className": "France 98"
    }
  },
  {
    "studentA": {
      "lastName": "Diomède",
      "firstName": "Bernard",
      "className": "France 98"
    },
    "studentB": {
      "lastName": "Dugarry",
      "firstName": "Christophe",
      "className": "France 98"
    }
  }
];
