export interface SatReadingSet {
  title: string;
  passage: string;
  questions: Array<{ question: string; options: string[]; correctIndex: number }>;
}

export interface SatGrammarQuestion {
  sentence: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface SatVocabQuestion {
  sentenceWithBlank: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const satReadingSets: SatReadingSet[] = [
  {
    title: 'Excerpt: The Cartographer\'s Dilemma (fiction)',
    passage:
      'Elena had drawn maps for thirty years, long enough to know that every map was, in some sense, a lie — a flat and static thing pretending to represent a world that never stopped moving. Rivers shifted their courses after floods. Borders redrew themselves after wars nobody had asked her opinion on. Even mountains, which she had once assumed were the one reliably permanent feature of any landscape, eroded by fractions of an inch each year, invisible within a single lifetime but unmistakable across the sweep of a century. Still, people trusted maps with a confidence that always struck her as slightly absurd, as though ink on paper carried more authority than the ground itself. When her granddaughter asked her, that afternoon, why she kept redrawing the same coastline over and over, Elena did not have a tidy answer. She only knew that the alternative — freezing a single version of the world and calling it finished — felt like a much larger kind of lie than the ones she told with her pen every day.',
    questions: [
      {
        question: 'Which choice best states the main idea of the passage?',
        options: [
          'Elena believes maps are useless and should not be trusted at all.',
          'Elena recognizes that maps are necessarily imperfect representations of a constantly changing world, yet she continues to update them rather than treat any version as final.',
          'Elena is frustrated that her granddaughter does not understand cartography.',
          'Elena believes mountains are the only permanent geographic feature.',
        ],
        correctIndex: 1,
      },
      {
        question: 'As used in the passage, "absurd" most nearly means:',
        options: ['practical', 'ridiculous', 'admirable', 'expected'],
        correctIndex: 1,
      },
      {
        question: 'The passage suggests that Elena views "freezing a single version of the world" as:',
        options: [
          'the most honest approach to mapmaking',
          'a bigger falsehood than the small inaccuracies inherent in an updated map',
          'something she has never considered',
          'a technique she uses regularly',
        ],
        correctIndex: 1,
      },
      {
        question: 'Which detail from the passage best supports the idea that change happens at different speeds?',
        options: [
          'The mention of Elena\'s thirty years of experience',
          'The contrast between rivers shifting after floods and mountains eroding across centuries',
          'The reference to her granddaughter\'s question',
          'The description of ink on paper',
        ],
        correctIndex: 1,
      },
      {
        question: 'The overall tone of the passage can best be described as:',
        options: ['comically exaggerated', 'reflective and philosophical', 'angry and accusatory', 'purely technical'],
        correctIndex: 1,
      },
    ],
  },
  {
    title: 'Excerpt: Coral Reefs and Ocean Acidification (science)',
    passage:
      'Coral reefs, often described as the rainforests of the sea, occupy less than one percent of the ocean floor yet support roughly a quarter of all known marine species. This disproportionate biodiversity depends on a fragile chemical balance: reef-building corals secrete calcium carbonate skeletons, a process that becomes markedly more difficult as ocean water absorbs increasing amounts of atmospheric carbon dioxide. As CO2 dissolves into seawater, it reacts to form carbonic acid, gradually lowering the water\'s pH in a process scientists term ocean acidification. Lower pH does not merely slow skeletal growth; it can actively dissolve existing calcium carbonate structures, undermining reefs that took centuries to form. Some researchers had hoped that certain coral species might adapt quickly enough to keep pace with acidification, and early laboratory studies did identify a handful of resilient strains. However, longer-term field observations have complicated this optimism: reefs exposed to more acidic conditions in the wild show reduced structural complexity even when individual coral colonies survive, because the diminished density of their skeletons leaves them more vulnerable to storm damage and grazing by fish. The cumulative effect, several marine biologists now argue, may matter more than the survival of any single coral species: a structurally weakened reef supports far less biodiversity even while nominally remaining "alive."',
    questions: [
      {
        question: 'What is the primary purpose of the passage?',
        options: [
          'To argue that coral reefs are no longer worth studying',
          'To explain how ocean acidification threatens coral reef structure and the biodiversity it supports',
          'To describe the process of photosynthesis in marine algae',
          'To compare coral reefs to rainforests in terms of tourism value',
        ],
        correctIndex: 1,
      },
      {
        question: 'According to the passage, what happens chemically as CO2 dissolves into seawater?',
        options: [
          'It immediately kills coral polyps',
          'It reacts to form carbonic acid, lowering the water\'s pH',
          'It increases the water\'s pH',
          'It has no measurable chemical effect',
        ],
        correctIndex: 1,
      },
      {
        question: 'What did longer-term field observations reveal that complicated earlier optimism?',
        options: [
          'All coral species died within a year',
          'Reefs in more acidic conditions show reduced structural complexity even when colonies survive',
          'Acidification has no effect on reef structure',
          'Coral reefs are unaffected by storm damage',
        ],
        correctIndex: 1,
      },
      {
        question: 'As used in the passage, "disproportionate" most nearly means:',
        options: ['expected and average', 'unusually large relative to their size/area', 'declining rapidly', 'evenly distributed'],
        correctIndex: 1,
      },
      {
        question: 'Which statement best reflects the marine biologists\' argument mentioned at the end of the passage?',
        options: [
          'Individual coral species survival is the only factor that matters',
          'A structurally weakened reef can support far less biodiversity even if corals are technically still alive',
          'Ocean acidification does not affect biodiversity',
          'Reefs recover fully within a few years regardless of pH',
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    title: 'Excerpt: The Case for Public Libraries in the Digital Age (argumentative)',
    passage:
      'It has become fashionable to ask whether public libraries still matter in an age when nearly any book, article, or database can be summoned instantly to a device in one\'s pocket. The question, however, tends to rest on a narrow view of what a library actually provides. Certainly, the function of the library as the sole gatekeeper of printed information has diminished. But libraries have never been merely warehouses for books; they have long served as one of the few remaining public spaces where entry costs nothing, where a person can sit for hours without being expected to purchase anything, and where access to a computer, a quiet workspace, or a knowledgeable research librarian does not depend on one\'s income. In many communities, the library is also the only institution offering free tutoring, job-application assistance, or a safe afternoon destination for children whose parents work until evening. Critics who measure a library\'s relevance purely by circulation statistics — how many physical books are checked out each month — are, in effect, measuring a nineteenth-century institution by a nineteenth-century yardstick, missing entirely the twenty-first-century roles libraries have quietly taken on in their place.',
    questions: [
      {
        question: 'What is the author\'s main argument in the passage?',
        options: [
          'Libraries are obsolete because of digital access to information',
          'Libraries remain valuable for reasons beyond book lending, including as free, accessible public spaces and community resources',
          'Public libraries should charge admission to remain funded',
          'Circulation statistics are the best way to measure a library\'s value',
        ],
        correctIndex: 1,
      },
      {
        question: 'The author criticizes measuring a library\'s relevance by circulation statistics because:',
        options: [
          'circulation statistics are always inaccurate',
          'this measure ignores the library\'s other twenty-first-century community roles',
          'libraries no longer track circulation',
          'the author believes books should not be counted at all',
        ],
        correctIndex: 1,
      },
      {
        question: 'As used in the passage, "yardstick" most nearly means:',
        options: ['a physical measuring tool only', 'a standard of comparison or measurement', 'a type of library card', 'a historical document'],
        correctIndex: 1,
      },
      {
        question: 'Which of the following does the passage NOT mention as a service libraries provide?',
        options: ['Free tutoring', 'Job-application assistance', 'A safe afternoon destination for children', 'Free legal representation'],
        correctIndex: 3,
      },
      {
        question: 'The tone of the passage is best described as:',
        options: ['dismissive of libraries', 'persuasive in defense of libraries\' continued relevance', 'neutral and purely statistical', 'nostalgic without any argument'],
        correctIndex: 1,
      },
    ],
  },
];

export const satGrammarQuestions: SatGrammarQuestion[] = [
  {
    sentence: 'Neither of the two proposals [have] been approved by the committee yet.',
    options: ['NO CHANGE', 'has', 'having', 'were'],
    correctIndex: 1,
    explanation: '"Neither" is singular, so it takes the singular verb "has," not the plural "have."',
  },
  {
    sentence: 'The museum\'s new exhibit, [which feature] artifacts from three continents, opens next month.',
    options: ['NO CHANGE', 'which features', 'featuring', 'features'],
    correctIndex: 1,
    explanation: 'The subject "exhibit" is singular, so the relative clause verb must be "features," not "feature."',
  },
  {
    sentence: 'I bought apples, bread, and [cheese, I also picked] up some milk.',
    options: ['NO CHANGE', 'cheese, and I also picked', 'cheese I also picked', 'cheese; I also picked'],
    correctIndex: 3,
    explanation: 'This is a comma splice joining two independent clauses; a semicolon (or a period, or "and") is needed to correctly separate them.',
  },
  {
    sentence: 'The company\'s [employee\'s] were given an extra day of paid leave this year.',
    options: ['NO CHANGE', 'employees', "employees'", 'employee'],
    correctIndex: 1,
    explanation: 'The sentence needs a plural noun ("employees"), not a possessive singular ("employee\'s") — no apostrophe is needed here.',
  },
  {
    sentence: 'Running every morning, eating a balanced diet, and [to get] enough sleep are the keys to good health.',
    options: ['NO CHANGE', 'getting', 'to have gotten', 'get'],
    correctIndex: 1,
    explanation: 'Parallel structure requires all three items in the list to share the same form: "Running," "eating," and "getting" (all gerunds).',
  },
  {
    sentence: 'Walking through the old town, [the cathedral was seen by] the tourists in the distance.',
    options: ['NO CHANGE', 'the tourists saw the cathedral', 'it was the cathedral that the tourists saw', 'the cathedral, seen by tourists,'],
    correctIndex: 1,
    explanation: 'This is a dangling modifier: "Walking through the old town" must modify the tourists (who were walking), not the cathedral, so "the tourists saw the cathedral" fixes it.',
  },
  {
    sentence: 'By the time the guests arrive, she [will cook] dinner for two hours.',
    options: ['NO CHANGE', 'will have been cooking', 'cooked', 'cooks'],
    correctIndex: 1,
    explanation: 'An action continuing up to a future point needs the future perfect continuous: "will have been cooking."',
  },
  {
    sentence: 'The report concluded that the new policy was, [in fact], effective at reducing costs.',
    options: ['NO CHANGE', 'in fact,', 'in fact', 'in-fact,'],
    correctIndex: 0,
    explanation: 'The parenthetical phrase "in fact" is correctly set off by commas on both sides here — no change needed.',
  },
  {
    sentence: 'Scientists have discovered a new species of frog; [however] its habitat is already under threat.',
    options: ['NO CHANGE', 'however,', 'however;', 'but however,'],
    correctIndex: 1,
    explanation: 'A conjunctive adverb like "however" that follows a semicolon and begins a new independent clause needs a comma directly after it.',
  },
  {
    sentence: 'Each of the students [were] required to submit the assignment by Friday.',
    options: ['NO CHANGE', 'was', 'have been', 'are'],
    correctIndex: 1,
    explanation: '"Each" is singular, so it takes the singular verb "was," not the plural "were."',
  },
  {
    sentence: 'The committee will announce its decision [tomorrow, the results will be published online too].',
    options: [
      'NO CHANGE',
      'tomorrow; the results will also be published online.',
      'tomorrow the results will be published online too.',
      'tomorrow, and, the results will be published online too.',
    ],
    correctIndex: 1,
    explanation: 'This corrects the comma splice by joining two independent clauses with a semicolon instead of just a comma.',
  },
  {
    sentence: 'Of all the candidates, she is the [more qualified] for the position.',
    options: ['NO CHANGE', 'most qualified', 'more qualifying', 'qualifiedest'],
    correctIndex: 1,
    explanation: 'When comparing among three or more (all the candidates), the superlative "most qualified" is required, not the comparative "more qualified."',
  },
  {
    sentence: 'The professor, along with several graduate students, [were] conducting research over the summer.',
    options: ['NO CHANGE', 'was', 'have been', 'are'],
    correctIndex: 1,
    explanation: 'The subject is "the professor" (singular); "along with several graduate students" is a parenthetical phrase and does not make the subject plural.',
  },
  {
    sentence: 'She is one of those writers who [captures] the reader\'s attention from the first sentence.',
    options: ['NO CHANGE', 'capture', 'is capturing', 'captured'],
    correctIndex: 1,
    explanation: 'In "one of those writers who...", the relative pronoun "who" refers to "writers" (plural), so the verb must be plural: "capture."',
  },
  {
    sentence: 'Its important to proofread your essay [before you\'re] final submission.',
    options: ['NO CHANGE', 'before your', 'before you are', 'before you\'ll'],
    correctIndex: 1,
    explanation: "The possessive 'your' (belonging to you) is needed before the noun 'final submission,' not the contraction 'you're' (you are).",
  },
];

export const satVocabQuestions: SatVocabQuestion[] = [
  {
    sentenceWithBlank:
      'Despite the committee\'s attempts to reach a decision quickly, the negotiations remained frustratingly ______, dragging on for months without resolution.',
    options: ['protracted', 'concise', 'ephemeral', 'unanimous'],
    correctIndex: 0,
    explanation: '"Protracted" means drawn out or extended in time, which fits negotiations "dragging on for months."',
  },
  {
    sentenceWithBlank:
      'The scientist\'s findings were so ______ that even experts outside her narrow field struggled to grasp their full implications.',
    options: ['esoteric', 'obvious', 'trivial', 'superficial'],
    correctIndex: 0,
    explanation: '"Esoteric" means understood by only a small, specialized group, matching the idea that even outside experts struggled to understand.',
  },
  {
    sentenceWithBlank:
      'Rather than confronting the problem directly, the manager chose a more ______ approach, hinting at concerns without ever stating them outright.',
    options: ['oblique', 'blunt', 'candid', 'forthright'],
    correctIndex: 0,
    explanation: '"Oblique" means indirect, which matches "hinting... without ever stating them outright."',
  },
  {
    sentenceWithBlank:
      'The critic praised the novel\'s ______ prose, noting that not a single word felt unnecessary or out of place.',
    options: ['economical', 'verbose', 'redundant', 'convoluted'],
    correctIndex: 0,
    explanation: '"Economical" here means efficient and sparing with words, consistent with "not a single word felt unnecessary."',
  },
  {
    sentenceWithBlank:
      'Although the two colleagues had once been ______ rivals, years of working together gradually transformed their relationship into a close friendship.',
    options: ['bitter', 'amicable', 'indifferent', 'cordial'],
    correctIndex: 0,
    explanation: '"Bitter rivals" fits the contrast with "gradually transformed... into a close friendship" — a strong initial opposition softening over time.',
  },
  {
    sentenceWithBlank:
      'The company\'s new policy was widely seen as ______, offering only a superficial response to a much deeper structural problem.',
    options: ['a palliative', 'a comprehensive solution', 'an innovation', 'a mandate'],
    correctIndex: 0,
    explanation: '"A palliative" refers to something that relieves symptoms without addressing the underlying cause — matching "superficial response to a much deeper... problem."',
  },
  {
    sentenceWithBlank: 'Her ______ replies to even the simplest questions left the interviewer unsure whether she fully understood what was being asked.',
    options: ['ambiguous', 'precise', 'unequivocal', 'lucid'],
    correctIndex: 0,
    explanation: '"Ambiguous" (unclear, open to multiple interpretations) matches the interviewer being "unsure" of her meaning.',
  },
  {
    sentenceWithBlank:
      'The old bridge, once a marvel of engineering, has since fallen into such ______ that engineers now consider it unsafe to cross.',
    options: ['disrepair', 'renovation', 'prominence', 'utility'],
    correctIndex: 0,
    explanation: '"Disrepair" (a state of being in poor condition due to neglect) fits "engineers now consider it unsafe."',
  },
  {
    sentenceWithBlank:
      'The professor\'s lecture was praised for its ______ clarity, managing to explain a highly technical subject in terms a general audience could follow.',
    options: ['remarkable', 'baffling', 'negligible', 'presumed'],
    correctIndex: 0,
    explanation: '"Remarkable clarity" fits with the lecture being praised and understandable to a general audience — the other options contradict "clarity" or "praised."',
  },
  {
    sentenceWithBlank:
      'Rather than accept the criticism gracefully, the author responded with a surprisingly ______ letter, attacking the reviewer\'s credentials and character.',
    options: ['vitriolic', 'gracious', 'measured', 'diplomatic'],
    correctIndex: 0,
    explanation: '"Vitriolic" means bitterly harsh or scathing, matching "attacking the reviewer\'s credentials and character."',
  },
  {
    sentenceWithBlank:
      'The evidence for the new theory remains ______ at best, with most researchers withholding judgment until further studies are conducted.',
    options: ['inconclusive', 'irrefutable', 'overwhelming', 'definitive'],
    correctIndex: 0,
    explanation: '"Inconclusive" fits with researchers "withholding judgment until further studies" — the evidence does not yet settle the question.',
  },
  {
    sentenceWithBlank: 'The town\'s economy, once dependent entirely on a single factory, has become considerably more ______ in the past decade.',
    options: ['diversified', 'stagnant', 'homogeneous', 'dependent'],
    correctIndex: 0,
    explanation: '"Diversified" (spread across multiple sources) contrasts with "dependent entirely on a single factory."',
  },
  {
    sentenceWithBlank:
      'The senator\'s speech was carefully ______, avoiding any direct commitment while still sounding supportive of the proposal.',
    options: ['equivocal', 'decisive', 'categorical', 'transparent'],
    correctIndex: 0,
    explanation: '"Equivocal" means deliberately vague or ambiguous, matching "avoiding any direct commitment."',
  },
  {
    sentenceWithBlank:
      'Despite his usually ______ manner, the coach delivered a surprisingly emotional speech before the final match.',
    options: ['stoic', 'excitable', 'volatile', 'expressive'],
    correctIndex: 0,
    explanation: '"Stoic" (showing little emotion) contrasts with the "surprisingly emotional speech," signaled by "despite."',
  },
  {
    sentenceWithBlank:
      'The research team\'s findings were met with ______ from the wider scientific community, as several independent labs failed to replicate the results.',
    options: ['skepticism', 'admiration', 'endorsement', 'certainty'],
    correctIndex: 0,
    explanation: '"Skepticism" (doubt) fits with other labs "failing to replicate the results," which would cast doubt on the findings.',
  },
];
