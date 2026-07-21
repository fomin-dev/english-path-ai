export interface IeltsReadingSet {
  title: string;
  passage: string;
  questions: Array<{ question: string; options: string[]; correctIndex: number }>;
}

export interface IeltsListeningSet {
  title: string;
  script: string;
  questions: Array<{ question: string; options: string[]; correctIndex: number }>;
}

export interface IeltsWritingTask {
  taskNumber: 1 | 2;
  prompt: string;
  minWords: number;
}

export interface IeltsSpeakingCue {
  part: 1 | 2 | 3;
  cueCard: string;
  followUpQuestions: string[];
}

export const ieltsReadingSets: IeltsReadingSet[] = [
  {
    title: 'The Rise of Urban Beekeeping',
    passage:
      'Over the past two decades, beekeeping has quietly moved from the countryside into some of the world\'s largest cities. Rooftops in New York, London, and Paris now host thousands of hives, and municipal governments increasingly encourage the practice as part of broader biodiversity strategies. Proponents argue that urban environments, perhaps counterintuitively, can be surprisingly hospitable to bees: parks, gardens, and even roadside verges provide a longer and more varied flowering season than the monoculture fields common in intensive agriculture, where a single crop blooms briefly and pesticide use is heavy. Urban hives have, in several studies, produced higher honey yields and shown lower mortality rates than their rural counterparts. Critics, however, caution against treating urban beekeeping as a simple solution to pollinator decline. They point out that a sudden proliferation of managed honeybee colonies can create intense competition for limited floral resources, potentially crowding out wild bee species that are already under pressure and, unlike honeybees, cannot be relocated or fed by a keeper during lean periods. Several ecologists now recommend that cities cap the density of registered hives and invest equally in wildflower planting, arguing that a city can easily have "enough" bees while still lacking sufficient forage to sustain them all. The debate illustrates a broader tension in conservation: an intervention that looks unambiguously positive in isolation can have more complicated effects once its wider ecological context is taken into account.',
    questions: [
      {
        question: 'According to the passage, why might urban environments suit bees well?',
        options: [
          'Cities have fewer natural predators of bees',
          'Urban areas offer a longer, more varied flowering season than monoculture farmland',
          'Municipal governments provide free honey to keepers',
          'Urban temperatures are more stable year-round',
        ],
        correctIndex: 1,
      },
      {
        question: 'What is the main concern critics raise about urban beekeeping?',
        options: [
          'Honeybees produce lower-quality honey in cities',
          'Urban hives are more expensive to maintain',
          'Managed honeybees may outcompete wild bee species for limited forage',
          'City councils are unwilling to regulate the practice',
        ],
        correctIndex: 2,
      },
      {
        question: 'What do several ecologists now recommend?',
        options: [
          'Banning beekeeping in cities entirely',
          'Capping hive density and increasing wildflower planting',
          'Moving all hives back to rural farmland',
          'Only allowing wild bee species in urban parks',
        ],
        correctIndex: 1,
      },
      {
        question: 'The word "proliferation" in the passage most nearly means:',
        options: ['decline', 'rapid increase', 'regulation', 'relocation'],
        correctIndex: 1,
      },
      {
        question: 'What broader point does the passage use the beekeeping debate to illustrate?',
        options: [
          'Conservation interventions can seem positive in isolation but have complex effects in context',
          'Cities are always better for wildlife than farmland',
          'Wild bee species are no longer at risk',
          'Honeybee farming should be banned in agriculture',
        ],
        correctIndex: 0,
      },
      {
        question: 'Compared to rural hives, urban hives in several studies showed:',
        options: [
          'lower honey yields and higher mortality',
          'higher honey yields and lower mortality',
          'no measurable difference',
          'higher costs but identical output',
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    title: 'Sleep and Memory Consolidation',
    passage:
      'For much of the twentieth century, sleep was regarded by many scientists as a largely passive state — a period of rest during which the brain, having been active all day, simply idled. Research over the last thirty years has overturned this view almost entirely. Sleep, particularly the deep, slow-wave stage that dominates the first half of the night, now appears to play an active and indispensable role in transforming fragile, recently acquired memories into stable, long-term ones, a process researchers call consolidation. During waking hours, the hippocampus, a seahorse-shaped structure central to forming new memories, rapidly encodes information but stores it in a form that is easily disrupted. During slow-wave sleep, the hippocampus appears to "replay" the day\'s experiences in compressed bursts, and this replay is thought to gradually transfer the memory trace to the cortex, where it becomes integrated with existing knowledge and far more resistant to interference. Experiments in which participants are woken periodically to prevent deep sleep, without significantly reducing total sleep time, consistently show impaired recall the following day compared with participants allowed uninterrupted slow-wave sleep, even though both groups report feeling similarly rested. Some researchers further argue that a second sleep stage, REM sleep, plays a complementary role, helping to integrate new memories with emotional context and to support creative problem-solving by strengthening unusual associations between unrelated pieces of information. If this dual model is correct, it would suggest that both major categories of sleep are not merely restorative but actively constructive, each contributing a distinct step to how experience becomes durable knowledge.',
    questions: [
      {
        question: 'How was sleep generally viewed by scientists for much of the twentieth century?',
        options: [
          'As an active process essential to memory',
          'As a largely passive, restful state',
          'As harmful to long-term memory formation',
          'As identical in function to waking rest',
        ],
        correctIndex: 1,
      },
      {
        question: 'What is the role of the hippocampus during waking hours, according to the passage?',
        options: [
          'It stores memories permanently',
          'It rapidly encodes new information in an easily disrupted form',
          'It has no involvement in memory formation',
          'It only functions during slow-wave sleep',
        ],
        correctIndex: 1,
      },
      {
        question: 'What happened to participants who were woken periodically to prevent deep sleep?',
        options: [
          'They reported feeling much less rested',
          'Their recall the next day was impaired despite similar total sleep time',
          'Their memory improved compared to the control group',
          'They experienced no measurable effects',
        ],
        correctIndex: 1,
      },
      {
        question: 'According to some researchers, what additional role might REM sleep play?',
        options: [
          'Physically repairing muscle tissue',
          'Integrating memories with emotional context and supporting creative problem-solving',
          'Preventing the hippocampus from encoding new information',
          'Replacing the need for slow-wave sleep entirely',
        ],
        correctIndex: 1,
      },
      {
        question: 'The word "consolidation" in the passage refers to:',
        options: [
          'the process of forgetting irrelevant information',
          'the transformation of fragile memories into stable, long-term ones',
          'the initial encoding of a memory during the day',
          'a disorder that disrupts sleep',
        ],
        correctIndex: 1,
      },
      {
        question: 'What conclusion does the "dual model" mentioned at the end of the passage suggest?',
        options: [
          'Only slow-wave sleep matters for memory',
          'Both slow-wave and REM sleep are actively constructive, not merely restful',
          'REM sleep is more important than slow-wave sleep',
          'Sleep has no measurable effect on cognition',
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    title: 'The Economics of Fast Fashion',
    passage:
      'Fast fashion — the business model built around rapidly translating catwalk trends into inexpensive, mass-produced clothing — has transformed retail over the past twenty-five years, compressing what was once a months-long design-to-shelf cycle into a matter of weeks. Proponents of the model point to its evident democratising effect: clothing that would once have been accessible only to wealthier consumers is now available to nearly anyone, and the industry has created millions of manufacturing jobs, disproportionately in developing economies where alternative employment can be scarce. Critics, however, argue that these benefits obscure a set of costs that rarely appear on a price tag. Environmentally, the sheer volume of production is difficult to overstate: textile manufacturing is now estimated to account for a meaningful share of global carbon emissions, and the synthetic fibres used in many garments shed microplastics with every wash, a problem that recycling programmes have so far failed to meaningfully address. Socially, the same speed that makes fast fashion appealing to consumers places intense pressure on supply chains, and labour advocates have documented repeated instances of unsafe working conditions and wages that fall well below a living standard in garment-producing regions. A further complication, often overlooked in the debate, is that many of the jobs created are themselves precarious: contracts are frequently short-term, and factories can relocate quickly to whichever country currently offers the lowest labour costs, leaving workers with little long-term security even when conditions are otherwise acceptable. Some economists have proposed that extended producer responsibility laws, which would hold companies financially accountable for the full lifecycle of garments they sell, could realign incentives without eliminating the accessibility that made fast fashion popular in the first place. Whether such measures could be implemented at a scale sufficient to matter, however, remains an open and contested question.',
    questions: [
      {
        question: 'What is the passage primarily concerned with?',
        options: [
          'Celebrating the rise of fast fashion',
          'Weighing the economic and social benefits of fast fashion against its environmental and labour costs',
          'Explaining how clothing is manufactured step by step',
          'Arguing that fast fashion should be banned immediately',
        ],
        correctIndex: 1,
      },
      {
        question: 'According to the passage, what is one argument in favour of fast fashion?',
        options: [
          'It reduces global carbon emissions',
          'It has made clothing accessible to more people and created manufacturing jobs',
          'It guarantees living wages for all workers',
          'It has eliminated microplastic pollution',
        ],
        correctIndex: 1,
      },
      {
        question: 'What does the passage say about synthetic fibres?',
        options: [
          'They are more durable than natural fibres',
          'They shed microplastics that recycling has so far failed to address',
          'They are being phased out entirely',
          'They reduce the need for washing clothes',
        ],
        correctIndex: 1,
      },
      {
        question: 'The word "precarious" in the passage most nearly means:',
        options: ['secure and stable', 'unstable and insecure', 'highly regulated', 'well compensated'],
        correctIndex: 1,
      },
      {
        question: 'What do some economists propose as a possible solution?',
        options: [
          'Banning synthetic fibres outright',
          'Extended producer responsibility laws holding companies accountable for garment lifecycles',
          'Eliminating manufacturing jobs in developing countries',
          'Increasing production speed further',
        ],
        correctIndex: 1,
      },
      {
        question: 'What "further complication" regarding jobs does the passage mention?',
        options: [
          'Jobs in the industry pay too much',
          'Many jobs are precarious because factories can relocate quickly to cheaper countries',
          'There are not enough jobs created',
          'Jobs require years of formal training',
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    title: 'Octopus Cognition',
    passage:
      "Octopuses present something of a puzzle for researchers interested in the evolution of intelligence. Unlike vertebrates, in which sophisticated cognition is generally associated with a centralised brain and a long evolutionary lineage shared with other intelligent species, octopuses diverged from the lineage leading to vertebrates roughly five hundred million years ago, and possess a nervous system organised in a radically different way: around two-thirds of an octopus's neurons are distributed throughout its eight arms rather than concentrated in a central brain, allowing each arm a striking degree of functional independence. An amputated octopus arm, remarkably, can continue to react to stimuli and even manipulate objects for a short period after separation from the body, a feat that would be inconceivable in a vertebrate limb. Despite — or perhaps because of — this unusual architecture, octopuses display behaviours that researchers have historically associated with advanced cognition: they can navigate mazes, open jars to reach food, and in laboratory settings, have demonstrated the ability to distinguish between individual human caretakers, sometimes squirting water preferentially at people who have treated them poorly. Some researchers argue that these abilities represent a case of convergent evolution, in which intelligence arose independently along a completely separate evolutionary path, driven by different pressures than those that shaped vertebrate cognition; for a soft-bodied animal with no protective shell, behavioural flexibility and rapid problem-solving may have been essential survival tools in a way they were not for many vertebrate lineages. Other scientists caution against over-interpreting these behaviours, noting that \"intelligence\" is notoriously difficult to define across species and that an octopus's distributed nervous system may simply produce complex-looking behaviour through mechanisms fundamentally unlike anything resembling thought as humans understand it. Whichever interpretation proves correct, the octopus's evolutionary distance from humans makes it one of the most valuable — and challenging — subjects available for studying how, and how many times, intelligence has evolved.",
    questions: [
      {
        question: 'What makes octopuses valuable subjects for studying the evolution of intelligence?',
        options: [
          'Their close evolutionary relationship to vertebrates',
          'Their evolutionary distance from vertebrates combined with apparently sophisticated behaviour',
          'Their inability to solve problems',
          'Their centralised brain structure similar to mammals',
        ],
        correctIndex: 1,
      },
      {
        question: "How is an octopus's nervous system organised, according to the passage?",
        options: [
          'Entirely within a central brain',
          'Mostly distributed throughout its eight arms',
          'Split evenly between two brains',
          'Located only in its eyes',
        ],
        correctIndex: 1,
      },
      {
        question: 'What is notable about a separated octopus arm?',
        options: [
          'It immediately stops functioning',
          'It can still react to stimuli and manipulate objects briefly',
          'It regenerates within seconds',
          'It becomes a separate octopus',
        ],
        correctIndex: 1,
      },
      {
        question: 'What behaviour do octopuses show toward caretakers who have treated them poorly, according to the passage?',
        options: [
          'They avoid all humans equally',
          'They sometimes squirt water preferentially at those individuals',
          'They become more affectionate',
          'They stop eating entirely',
        ],
        correctIndex: 1,
      },
      {
        question: 'What do some researchers suggest octopus intelligence represents?',
        options: [
          'A case of convergent evolution along a separate evolutionary path',
          'Proof that all animals are equally intelligent',
          'A direct evolutionary link to vertebrates',
          'An accident with no adaptive value',
        ],
        correctIndex: 0,
      },
      {
        question: 'What caution do other scientists raise?',
        options: [
          'That octopuses are not really animals',
          '"Intelligence" is hard to define across species and complex behaviour may not resemble human-like thought',
          'That octopuses should not be studied further',
          'That octopus arms are not really independent',
        ],
        correctIndex: 1,
      },
    ],
  },
];

export const ieltsListeningSets: IeltsListeningSet[] = [
  {
    title: 'University Accommodation Office',
    script:
      "Advisor: Good morning, University Accommodation Office, how can I help you? Student: Hi, I just got accepted for the autumn semester and I need to sort out housing. Advisor: Congratulations! OK, we have three main options for new students: the Halls of Residence on North Campus, shared apartments on South Campus, and a homestay program with local families. Student: What's the price difference? Advisor: Halls of Residence are the cheapest at around four hundred pounds a month, meals not included. The South Campus apartments are about five hundred and fifty a month, but they include a kitchen so you can cook for yourself. The homestay option is six hundred and twenty a month, and that includes two meals a day. Student: I think I'd prefer the apartment, actually — I like cooking. How do I apply? Advisor: You'll need to fill out the housing form on the student portal before the fifteenth of August. After that date, we can't guarantee South Campus availability, and you'd likely be placed in Halls instead. Student: Got it, before the fifteenth. Is there a deposit? Advisor: Yes, a two hundred pound deposit, refundable at the end of the tenancy provided there's no damage. Student: Perfect, thank you so much for your help. Advisor: You're welcome, and welcome to the university!",
    questions: [
      {
        question: 'How many housing options does the advisor mention?',
        options: ['Two', 'Three', 'Four', 'Five'],
        correctIndex: 1,
      },
      {
        question: 'Which option is the cheapest?',
        options: ['Halls of Residence', 'South Campus apartments', 'Homestay program', 'They cost the same'],
        correctIndex: 0,
      },
      {
        question: 'Why does the student prefer the apartment option?',
        options: ['It is closest to campus', 'It includes two meals a day', 'It has a kitchen so she can cook', 'It has no deposit'],
        correctIndex: 2,
      },
      {
        question: 'What is the application deadline mentioned?',
        options: ['1st August', '15th August', '30th August', '15th September'],
        correctIndex: 1,
      },
      {
        question: 'What happens to the deposit at the end of the tenancy?',
        options: [
          'It is never returned',
          "It's refundable if there's no damage",
          'It is donated to the university',
          'It is automatically renewed',
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    title: 'Introduction to a Museum Guided Tour',
    script:
      "Guide: Good afternoon everyone, and welcome to the National History Museum. My name is Priya and I'll be your guide for the next ninety minutes. Before we begin, a few housekeeping notes. Photography is allowed in most galleries, but flash photography is strictly prohibited in the Ancient Textiles room because it can damage the fabrics. We'll start on the ground floor with the Natural World exhibit, then move up to the first floor for Ancient Civilizations, and finish on the second floor with the Modern Innovations gallery. If at any point you'd like to take a break, the café is located on the ground floor near the main entrance, and it's open until five p.m. Restrooms are available on every floor, next to the lifts. Please stay together as a group, especially in the Ancient Civilizations gallery, since some of the display cases are quite close to the walking path. If you have questions at any point, feel free to ask me directly rather than waiting until the end — I'm happy to pause. Right, let's begin with the Natural World exhibit just through these doors.",
    questions: [
      {
        question: 'How long will the tour last?',
        options: ['Sixty minutes', 'Ninety minutes', 'Two hours', 'Thirty minutes'],
        correctIndex: 1,
      },
      {
        question: 'Where is flash photography prohibited?',
        options: ['Everywhere in the museum', 'The Modern Innovations gallery', 'The Ancient Textiles room', 'The café'],
        correctIndex: 2,
      },
      {
        question: 'What is the correct order of the tour?',
        options: [
          'Modern Innovations, Ancient Civilizations, Natural World',
          'Natural World, Ancient Civilizations, Modern Innovations',
          'Ancient Civilizations, Natural World, Modern Innovations',
          'Natural World, Modern Innovations, Ancient Civilizations',
        ],
        correctIndex: 1,
      },
      {
        question: 'Until what time is the café open?',
        options: ['4 p.m.', '5 p.m.', '6 p.m.', '3 p.m.'],
        correctIndex: 1,
      },
      {
        question: 'Why does the guide ask the group to stay together in the Ancient Civilizations gallery?',
        options: [
          'Because photography is banned there',
          'Because some display cases are close to the walking path',
          'Because it is the smallest room',
          'Because there is no lighting',
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    title: 'Booking a Car Rental',
    script:
      "Agent: Good afternoon, Riverside Car Rentals, how can I help you? Customer: Hi, I'd like to rent a car for a week, starting this Friday. Agent: Sure, what type of vehicle are you after? Customer: Something compact, just for city driving. Agent: We have a compact hatchback available at thirty-five dollars a day, or an economy model at twenty-eight dollars a day. Customer: I'll go with the economy one, that sounds fine. Agent: Great choice. Will you need insurance included? Basic insurance is included in the price, but we also offer full coverage for an extra nine dollars a day, which covers windscreen and tyre damage as well. Customer: I think I'll add the full coverage, just to be safe. Agent: No problem. And will you be returning the car to this same branch? Customer: Actually, I'll be flying out of the airport, so I'd like to drop it at the airport branch instead. Agent: That's fine, there's a small drop-off fee of fifteen dollars for a different branch. Customer: That's fine. One more thing — is there a minimum age requirement? Agent: Yes, drivers must be at least twenty-one, and under twenty-fives pay a young driver surcharge. Customer: I'm twenty-seven, so that's not a problem. Agent: Perfect, I'll get your booking confirmed and email the details shortly.",
    questions: [
      {
        question: 'What type of car does the customer choose?',
        options: ['Compact hatchback', 'Economy model', 'Luxury sedan', 'SUV'],
        correctIndex: 1,
      },
      {
        question: 'How much extra does full coverage insurance cost per day?',
        options: ['Five dollars', 'Nine dollars', 'Fifteen dollars', 'Twenty-eight dollars'],
        correctIndex: 1,
      },
      {
        question: 'Where will the customer return the car?',
        options: ['The same branch', 'A different city', 'The airport branch', 'They are not sure yet'],
        correctIndex: 2,
      },
      {
        question: 'Why is there an extra fee for the return?',
        options: [
          'The car will be returned late',
          'It is being returned to a different branch',
          'The customer damaged the car',
          'Insurance was not purchased',
        ],
        correctIndex: 1,
      },
      {
        question: 'What is the minimum age to rent a car according to the agent?',
        options: ['Eighteen', 'Twenty-one', 'Twenty-five', 'Thirty'],
        correctIndex: 1,
      },
    ],
  },
  {
    title: 'Orientation for New Library Volunteers',
    script:
      "Welcome, everyone, and thank you for volunteering with us at the Central Public Library. I just want to run through a few key points before we start your training. First, shifts: most of you will be scheduled for either the morning shift, from nine until noon, or the afternoon shift, from one until four. If you ever need to swap a shift with someone, just let the volunteer coordinator know at least twenty-four hours in advance so we can update the roster. Second, your main responsibilities will include shelving returned books, helping visitors locate materials using the catalogue computers near the entrance, and assisting with our weekly children's reading session, which runs every Wednesday afternoon. You are not expected to handle any technical IT issues yourselves — if a computer stops working, just note it in the logbook at the front desk and our technician will deal with it during his Tuesday visit. Third, a quick word on dress code: there isn't a strict uniform, but we do ask that you wear the green volunteer badge at all times while on shift, which you'll receive today. Finally, if you're ever unsure about anything while working, the reference desk on the second floor is staffed throughout opening hours, and the librarians there are always happy to help. We're really glad to have you all on board, and I hope you enjoy your time here.",
    questions: [
      {
        question: 'What time does the morning shift end?',
        options: ['Ten', 'Eleven', 'Noon', 'One'],
        correctIndex: 2,
      },
      {
        question: 'How much notice should volunteers give to swap a shift?',
        options: ['No notice needed', 'At least twenty-four hours', 'One week', 'Forty-eight hours'],
        correctIndex: 1,
      },
      {
        question: "When does the children's reading session take place?",
        options: ['Monday morning', 'Wednesday afternoon', 'Friday evening', 'Every day'],
        correctIndex: 1,
      },
      {
        question: 'What should volunteers do if a computer stops working?',
        options: ['Fix it themselves', 'Note it in the logbook at the front desk', 'Call the technician directly', 'Ignore it'],
        correctIndex: 1,
      },
      {
        question: 'What must volunteers wear while on shift?',
        options: ['A full uniform', 'The green volunteer badge', 'A name tag only', 'Nothing specific'],
        correctIndex: 1,
      },
    ],
  },
];

export const ieltsWritingTasks: IeltsWritingTask[] = [
  {
    taskNumber: 1,
    minWords: 150,
    prompt:
      'The table below shows the percentage of households with home internet access in four countries between 2005 and 2020. Country A: 32% (2005) → 91% (2020). Country B: 18% (2005) → 76% (2020). Country C: 45% (2005) → 96% (2020). Country D: 9% (2005) → 58% (2020). Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.',
  },
  {
    taskNumber: 1,
    minWords: 150,
    prompt:
      'The diagram (described here in words, since no image is shown) illustrates the process of producing bottled orange juice: 1) Oranges are harvested by hand. 2) They are washed and sorted by size. 3) Oranges are squeezed by industrial presses to extract juice. 4) The juice is pasteurised by rapid heating and cooling. 5) The juice is bottled and sealed. 6) Bottles are labelled and shipped to distributors. Summarise the information by describing the main stages of the process. Write at least 150 words.',
  },
  {
    taskNumber: 1,
    minWords: 150,
    prompt:
      'The bar chart below shows average weekly hours spent on leisure activities by three age groups (16-24, 25-49, 50+) in one country. Watching TV: 16-24 group 9 hrs, 25-49 group 11 hrs, 50+ group 15 hrs. Socialising: 16-24 group 8 hrs, 25-49 group 4 hrs, 50+ group 3 hrs. Exercise: 16-24 group 5 hrs, 25-49 group 3 hrs, 50+ group 4 hrs. Reading: 16-24 group 2 hrs, 25-49 group 2 hrs, 50+ group 6 hrs. Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.',
  },
  {
    taskNumber: 2,
    minWords: 250,
    prompt:
      'Some people believe that universities should focus on providing academic skills, while others think universities should prepare students for their future careers with practical, job-related skills. Discuss both views and give your own opinion. Write at least 250 words.',
  },
  {
    taskNumber: 2,
    minWords: 250,
    prompt:
      'In many countries, the amount of crime committed by young people is increasing. What do you think are the causes of this? What solutions can you suggest? Write at least 250 words.',
  },
  {
    taskNumber: 2,
    minWords: 250,
    prompt:
      'Some people think that governments should invest more money in public transport instead of building new roads. To what extent do you agree or disagree with this statement? Write at least 250 words.',
  },
];

export const ieltsSpeakingCues: IeltsSpeakingCue[] = [
  {
    part: 1,
    cueCard: 'Let\'s talk about your hometown. Where is it, and what do you like most about it?',
    followUpQuestions: [
      'Has your hometown changed much in recent years?',
      'Would you like to live there in the future? Why or why not?',
    ],
  },
  {
    part: 1,
    cueCard: 'Let\'s talk about technology. How often do you use your smartphone every day?',
    followUpQuestions: [
      'What app do you find most useful, and why?',
      'Do you think people rely on technology too much nowadays?',
    ],
  },
  {
    part: 2,
    cueCard:
      'Describe a skill you would like to learn. You should say:\n• what the skill is\n• why you want to learn it\n• how you would learn it\nand explain how this skill would be useful to you in the future.',
    followUpQuestions: [],
  },
  {
    part: 2,
    cueCard:
      'Describe a memorable trip you have taken. You should say:\n• where you went\n• who you went with\n• what you did there\nand explain why this trip was memorable for you.',
    followUpQuestions: [],
  },
  {
    part: 3,
    cueCard: 'Do you think the skills people need to learn are different now compared to 50 years ago?',
    followUpQuestions: [
      'How do you think education will change in the next 20 years?',
      'Is it better to learn a skill formally (in a course) or informally (by yourself)? Why?',
    ],
  },
  {
    part: 3,
    cueCard: 'Why do you think some people prefer travelling alone, while others prefer travelling in groups?',
    followUpQuestions: [
      'How has tourism changed the way people in your country live?',
      'Do you think tourism always has a positive effect on local communities?',
    ],
  },
];
