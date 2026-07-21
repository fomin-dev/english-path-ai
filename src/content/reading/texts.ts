export interface ReadingTextSeed {
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  title: string;
  topic?: string;
  body: string;
  wordCount: number;
  questions: Array<{ question: string; options: string[]; correctIndex: number }>;
  newWords: string[];
}

export const readingTexts: ReadingTextSeed[] = [
  // ===== A1 =====
  {
    level: 'A1',
    title: 'My Weekend',
    topic: 'everyday life',
    body: 'On Saturday, I get up late and eat a big breakfast. Then I clean my room and wash the dishes. In the afternoon, I meet my friends in the park. We play football and talk. On Sunday, I visit my grandparents. My grandmother cooks a big dinner for the whole family. After dinner, we watch a film together. I love my weekends because I can relax and see the people I love.',
    wordCount: 72,
    questions: [
      {
        question: 'What does the writer do on Saturday morning?',
        options: [
          'Plays football',
          'Gets up late and eats breakfast',
          'Visits grandparents',
          'Watches a film',
        ],
        correctIndex: 1,
      },
      {
        question: 'Where does the writer meet friends?',
        options: ['At school', 'At home', 'In the park', 'At the cinema'],
        correctIndex: 2,
      },
      {
        question: 'Who cooks dinner on Sunday?',
        options: ['The writer', 'A friend', 'The grandmother', 'The father'],
        correctIndex: 2,
      },
      {
        question: 'Why does the writer love weekends?',
        options: ['To work', 'To relax and see loved ones', 'To clean the house', 'To study'],
        correctIndex: 1,
      },
    ],
    newWords: ['weekend', 'clean', 'relax', 'grandparents', 'together'],
  },
  {
    level: 'A1',
    title: 'The Little Garden',
    topic: 'nature',
    body: 'Behind our house, there is a small garden. My mother grows flowers and vegetables there. In spring, the flowers are pink and yellow. In summer, we pick tomatoes and carrots. I help my mother every weekend. We water the plants and pull out the weeds. My favorite flower is the sunflower because it is tall and bright. The garden makes our house beautiful and happy.',
    wordCount: 65,
    questions: [
      {
        question: 'Who grows the flowers and vegetables?',
        options: ['The father', 'The mother', 'The writer', 'A neighbor'],
        correctIndex: 1,
      },
      {
        question: 'What color are the flowers in spring?',
        options: ['Red and blue', 'Pink and yellow', 'White and green', 'Purple and orange'],
        correctIndex: 1,
      },
      {
        question: 'What do they pick in summer?',
        options: ['Apples and pears', 'Tomatoes and carrots', 'Flowers only', 'Potatoes'],
        correctIndex: 1,
      },
      {
        question: "What is the writer's favorite flower?",
        options: ['The rose', 'The tulip', 'The sunflower', 'The daisy'],
        correctIndex: 2,
      },
    ],
    newWords: ['garden', 'grow', 'weeds', 'water (verb)', 'sunflower'],
  },
  {
    level: 'A1',
    title: 'A Trip to the Zoo',
    topic: 'animals',
    body: 'Last Saturday, my family and I went to the zoo. We saw lions, elephants, and monkeys. The monkeys were very funny because they climbed the trees quickly. My little sister liked the elephants best. She gave them some water from a bottle. At lunchtime, we ate sandwiches near the lake. In the afternoon, we watched the birds fly in a big cage. It was a hot day, so we bought ice cream before we went home. I want to visit the zoo again next month.',
    wordCount: 85,
    questions: [
      {
        question: 'Where did the family go last Saturday?',
        options: ['The park', 'The zoo', 'The beach', 'The lake'],
        correctIndex: 1,
      },
      {
        question: 'Why were the monkeys funny?',
        options: [
          'They climbed the trees quickly',
          'They ate ice cream',
          'They slept all day',
          'They swam in the lake',
        ],
        correctIndex: 0,
      },
      {
        question: 'What did the little sister give the elephants?',
        options: ['Some bread', 'Some water', 'Some fruit', 'Some ice cream'],
        correctIndex: 1,
      },
      {
        question: 'What did they buy before going home?',
        options: ['Sandwiches', 'Ice cream', 'Bottled water', 'Bird food'],
        correctIndex: 1,
      },
    ],
    newWords: ['zoo', 'monkey', 'climb', 'lake', 'cage'],
  },
  {
    level: 'A1',
    title: 'My Daily Routine',
    topic: 'everyday life',
    body: "I wake up at seven o'clock every morning. First, I brush my teeth and take a shower. Then I eat breakfast with my family. I usually have eggs and tea. After breakfast, I walk to school with my brother. School starts at eight thirty. In the evening, I do my homework and play video games. I have dinner at seven o'clock. Before I go to bed, I read a book for ten minutes. I go to sleep at ten o'clock.",
    wordCount: 80,
    questions: [
      {
        question: 'What time does the writer wake up?',
        options: ["Six o'clock", "Seven o'clock", "Eight o'clock", "Nine o'clock"],
        correctIndex: 1,
      },
      {
        question: 'Who does the writer walk to school with?',
        options: ['A friend', 'A sister', 'A brother', 'Alone'],
        correctIndex: 2,
      },
      {
        question: 'What does the writer do in the evening?',
        options: ['Cook dinner', 'Homework and video games', 'Go to the zoo', 'Sleep'],
        correctIndex: 1,
      },
      {
        question: 'What does the writer do before going to bed?',
        options: ['Watch TV', 'Read a book', 'Eat dinner', 'Do homework'],
        correctIndex: 1,
      },
    ],
    newWords: ['routine', 'brush (teeth)', 'shower', 'homework', 'evening'],
  },

  // ===== A2 =====
  {
    level: 'A2',
    title: 'A Visit to the Market',
    topic: 'culture',
    body: 'Every Saturday morning, hundreds of people visit the old market in the town center. Sellers arrive early to set up their stalls, filling the street with the smell of fresh bread and spices. You can buy fruit, vegetables, cheese, and handmade clothes there. Many tourists like to visit the market because it shows the real life of the town. Local musicians often play music near the entrance, and children dance to the songs. Last weekend, I bought a basket of strawberries and a scarf made by a local artist. It was a wonderful morning full of colors, sounds, and delicious smells.',
    wordCount: 101,
    questions: [
      {
        question: 'When does the market take place?',
        options: [
          'Every evening',
          'Every Saturday morning',
          'Only in summer',
          'Every Sunday night',
        ],
        correctIndex: 1,
      },
      {
        question: 'Why do many tourists like the market?',
        options: [
          'It is cheap',
          'It shows the real life of the town',
          'It sells only clothes',
          'It is far from the center',
        ],
        correctIndex: 1,
      },
      {
        question: 'What do local musicians do at the market?',
        options: [
          'Sell instruments',
          'Play music near the entrance',
          'Teach dancing',
          'Clean the stalls',
        ],
        correctIndex: 1,
      },
      {
        question: 'What did the writer buy?',
        options: [
          'Bread and cheese',
          'A basket of strawberries and a scarf',
          'Vegetables only',
          'A musical instrument',
        ],
        correctIndex: 1,
      },
    ],
    newWords: ['market', 'stall', 'spices', 'tourist', 'handmade'],
  },
  {
    level: 'A2',
    title: 'Learning to Cook',
    topic: 'daily life',
    body: 'When I moved into my first apartment, I did not know how to cook anything. I always ate sandwiches or ordered food from restaurants. One day, my neighbor invited me for dinner and taught me how to make a simple pasta dish. I loved it so much that I started watching cooking videos online every evening. Now I cook dinner for myself almost every day, and sometimes I even invite friends over. My favorite dish to make is a vegetable soup with fresh herbs. Cooking has become a relaxing hobby, and it also helps me save money because I eat out much less than before.',
    wordCount: 105,
    questions: [
      {
        question: 'What did the writer usually eat before learning to cook?',
        options: [
          'Home-cooked meals',
          'Sandwiches or restaurant food',
          'Only soup',
          'Nothing at all',
        ],
        correctIndex: 1,
      },
      {
        question: 'Who taught the writer to cook?',
        options: ['A cooking teacher', 'A parent', 'A neighbor', 'A friend online'],
        correctIndex: 2,
      },
      {
        question: 'What is the favorite dish to make now?',
        options: ['Pasta', 'Vegetable soup', 'Sandwiches', 'Salad'],
        correctIndex: 1,
      },
      {
        question: 'How has cooking helped the writer?',
        options: [
          'It made them famous',
          'It helps them save money',
          'It made them tired',
          'It cost more money',
        ],
        correctIndex: 1,
      },
    ],
    newWords: ['apartment', 'neighbor', 'herbs', 'hobby', 'eat out'],
  },
  {
    level: 'A2',
    title: 'Starting a New Job',
    topic: 'work',
    body: "Last month, I started a new job at a small company in the city. On my first day, I was very nervous because I did not know anyone. My manager introduced me to the team, and everyone was friendly and helpful. During my first week, I learned how to use the computer systems and met with different departments. It took me some time to remember everyone's names, but now I feel much more comfortable. My favorite part of the job is working with my colleagues on new projects. We usually have lunch together, and I have already made two good friends. I am excited to see what I will learn in the coming months.",
    wordCount: 114,
    questions: [
      {
        question: 'Why was the writer nervous on the first day?',
        options: [
          'The job was difficult',
          'They did not know anyone',
          'The manager was unfriendly',
          'They were late',
        ],
        correctIndex: 1,
      },
      {
        question: 'What did the writer learn during the first week?',
        options: [
          'How to cook',
          'How to use the computer systems',
          'How to drive',
          'How to manage people',
        ],
        correctIndex: 1,
      },
      {
        question: "What is the writer's favorite part of the job?",
        options: [
          'Working alone',
          'Working with colleagues on new projects',
          'The salary',
          'The commute',
        ],
        correctIndex: 1,
      },
      {
        question: 'How many good friends has the writer made?',
        options: ['None', 'One', 'Two', 'Five'],
        correctIndex: 2,
      },
    ],
    newWords: ['nervous', 'manager', 'colleague', 'department', 'comfortable'],
  },
  {
    level: 'A2',
    title: 'A Rainy Day in the City',
    topic: 'travel',
    body: 'Yesterday, it rained all day in the city, so my plans changed completely. I wanted to go to the park with my friends, but instead we decided to visit a museum downtown. The museum was surprisingly interesting, and we spent almost three hours looking at old paintings and photographs. Afterwards, we found a small cafe near the river and ordered hot chocolate to warm up. We watched the rain through the window and talked about our favorite films. Although the weather was disappointing at first, the day turned into one of the most enjoyable afternoons I have had this year. Sometimes unexpected changes lead to the best experiences.',
    wordCount: 108,
    questions: [
      {
        question: 'What did the writer originally want to do?',
        options: ['Visit a museum', 'Go to the park', 'Stay at home', 'Go shopping'],
        correctIndex: 1,
      },
      {
        question: 'Where did they go instead?',
        options: ['A restaurant', 'A museum', 'A cinema', 'A library'],
        correctIndex: 1,
      },
      {
        question: 'What did they do after the museum?',
        options: ['Went home', 'Had hot chocolate at a cafe', 'Went to the park', 'Watched a film'],
        correctIndex: 1,
      },
      {
        question: 'How did the writer feel about the day in the end?',
        options: [
          'Disappointed',
          'Bored',
          'It became one of the most enjoyable afternoons',
          'Tired',
        ],
        correctIndex: 2,
      },
    ],
    newWords: ['downtown', 'afterwards', 'cafe', 'disappointing', 'unexpected'],
  },

  // ===== B1 =====
  {
    level: 'B1',
    title: 'The History of Coffee',
    topic: 'history',
    body: 'Coffee is one of the most popular drinks in the world today, but its history goes back many centuries. According to legend, coffee was discovered in Ethiopia by a goat herder who noticed his goats became energetic after eating berries from a certain plant. Word of this discovery eventually spread to the Arabian Peninsula, where coffee houses began to appear in cities like Mecca and Cairo. These coffee houses quickly became important places for conversation, music, and even political discussion. By the seventeenth century, coffee had reached Europe, where it was initially viewed with suspicion by some religious leaders. Over time, however, coffee houses opened across major European cities and became centers of intellectual life, attracting writers, artists, and scientists. Today, coffee is grown in more than seventy countries and remains a central part of daily routines for millions of people around the world.',
    wordCount: 144,
    questions: [
      {
        question: 'According to legend, who discovered coffee?',
        options: ['A king', 'A goat herder', 'A scientist', 'A merchant'],
        correctIndex: 1,
      },
      {
        question: 'Where did coffee houses first appear?',
        options: ['Europe', 'The Arabian Peninsula', 'South America', 'Asia'],
        correctIndex: 1,
      },
      {
        question: 'How did some religious leaders in Europe first view coffee?',
        options: ['With enthusiasm', 'With suspicion', 'With indifference', 'With approval'],
        correctIndex: 1,
      },
      {
        question: 'What did European coffee houses become centers of?',
        options: ['Farming', 'Intellectual life', 'Sports', 'Fashion'],
        correctIndex: 1,
      },
    ],
    newWords: ['legend', 'herder', 'suspicion', 'intellectual', 'routine'],
  },
  {
    level: 'B1',
    title: 'The Rise of Community Gardens',
    topic: 'environment',
    body: 'In many cities around the world, empty lots and unused spaces are being transformed into community gardens. These small green areas allow neighbors to grow their own vegetables, flowers, and herbs together. Community gardens offer more than just fresh produce; they also give people a chance to meet their neighbors and build stronger relationships within the local area. Studies have shown that spending time gardening can reduce stress and improve mental health, which makes these spaces especially valuable in busy urban environments. In addition to the social and health benefits, community gardens also help the environment by increasing green space and supporting local wildlife such as bees and butterflies. Some cities now offer free land and tools to residents who want to start their own community garden, hoping to encourage more people to get involved in this growing movement.',
    wordCount: 139,
    questions: [
      {
        question: 'What are empty lots being transformed into?',
        options: ['Parking lots', 'Community gardens', 'Shopping centers', 'Playgrounds'],
        correctIndex: 1,
      },
      {
        question: 'What benefit do studies link to gardening?',
        options: [
          'Increased stress',
          'Reduced stress and better mental health',
          'Higher food prices',
          'Less social contact',
        ],
        correctIndex: 1,
      },
      {
        question: 'How do community gardens help the environment?',
        options: [
          'By reducing green space',
          'By increasing green space and supporting wildlife',
          'By using more concrete',
          'By reducing the number of bees',
        ],
        correctIndex: 1,
      },
      {
        question: 'What do some cities offer residents to start a garden?',
        options: ['Nothing', 'Free land and tools', 'Only money', 'Free food'],
        correctIndex: 1,
      },
    ],
    newWords: ['community', 'produce (noun)', 'urban', 'wildlife', 'movement'],
  },
  {
    level: 'B1',
    title: 'The Benefits of Learning a Second Language',
    topic: 'education',
    body: 'Learning a second language offers far more benefits than simply being able to communicate with people from other countries. Research has shown that bilingual people often develop stronger problem-solving skills and better memory compared to those who speak only one language. This happens because switching between languages requires the brain to constantly manage two different systems, which strengthens mental flexibility over time. In addition to these cognitive advantages, speaking another language can open up new career opportunities, since many companies now operate internationally and value employees who can communicate across cultures. Language learning also deepens cultural understanding, allowing people to enjoy literature, films, and music in their original form rather than through translation. Although becoming fluent takes time and consistent practice, most language learners agree that the effort brings lasting rewards, both personally and professionally.',
    wordCount: 135,
    questions: [
      {
        question: 'What cognitive skill do bilingual people often develop, according to research?',
        options: [
          'Weaker memory',
          'Stronger problem-solving skills and better memory',
          'Slower thinking',
          'Reduced mental flexibility',
        ],
        correctIndex: 1,
      },
      {
        question: 'Why does switching between languages strengthen mental flexibility?',
        options: [
          'It confuses the brain',
          'It requires managing two different systems',
          'It slows down thinking',
          'It has no effect',
        ],
        correctIndex: 1,
      },
      {
        question: "How can a second language help someone's career?",
        options: [
          'It has no effect on careers',
          'It can open up international opportunities',
          'It only helps teachers',
          'It reduces job opportunities',
        ],
        correctIndex: 1,
      },
      {
        question: 'What does language learning allow people to enjoy in original form?',
        options: [
          'Only news articles',
          'Literature, films, and music',
          'Only textbooks',
          'Nothing new',
        ],
        correctIndex: 1,
      },
    ],
    newWords: ['bilingual', 'cognitive', 'fluent', 'flexibility', 'consistent'],
  },
  {
    level: 'B1',
    title: 'How Recycling Changed My Neighborhood',
    topic: 'environment',
    body: 'Five years ago, my neighborhood did not have a proper recycling system, and most of our waste ended up in a single landfill outside the city. A small group of residents, including myself, decided to organize weekly meetings to discuss how we could reduce the amount of waste we produced. We started by setting up separate bins for paper, plastic, and glass on our street, and we asked the local government for support. Slowly, more neighbors began to join the effort, and within a year, almost every household was sorting its rubbish correctly. The city eventually noticed our success and introduced official recycling collection across the whole district. Today, our neighborhood produces significantly less landfill waste than before, and many residents say they feel proud of what the community achieved together. This experience taught me that small local actions can lead to much bigger changes.',
    wordCount: 145,
    questions: [
      {
        question: 'What problem did the neighborhood have five years ago?',
        options: ['Too much traffic', 'No proper recycling system', 'No parks', 'Too much noise'],
        correctIndex: 1,
      },
      {
        question: 'What did the residents set up on their street?',
        options: [
          'New shops',
          'Separate bins for paper, plastic, and glass',
          'A community garden',
          'A playground',
        ],
        correctIndex: 1,
      },
      {
        question: 'What did the city eventually do?',
        options: [
          'Ignored the effort',
          'Introduced official recycling collection across the district',
          'Closed the landfill only',
          'Fined the residents',
        ],
        correctIndex: 1,
      },
      {
        question: 'What lesson did the writer learn from this experience?',
        options: [
          'Recycling is too difficult',
          'Small local actions can lead to bigger changes',
          'Change is impossible',
          'The government must act alone',
        ],
        correctIndex: 1,
      },
    ],
    newWords: ['recycling', 'landfill', 'resident', 'household', 'district'],
  },

  // ===== B2 =====
  {
    level: 'B2',
    title: 'The Science of Sleep',
    topic: 'science',
    body: 'Sleep has long been regarded as a passive state in which the body and brain simply rest, but modern research reveals it to be a remarkably active process essential for both physical and mental health. During sleep, the brain cycles through several distinct stages, including deep sleep and REM sleep, each serving different biological functions. Deep sleep is thought to be crucial for physical recovery, including muscle repair and immune system strengthening, while REM sleep plays a central role in memory consolidation and emotional processing. Chronic sleep deprivation has been linked to a wide range of health problems, from impaired concentration and mood disorders to more serious long-term risks such as cardiovascular disease and weakened immunity. Despite growing awareness of its importance, many people in modern society continue to sacrifice sleep in favor of work, entertainment, or social obligations. Sleep researchers now argue that treating sleep as a luxury rather than a biological necessity may be one of the most underestimated public health issues of our time, urging both individuals and institutions to reconsider how they prioritize rest.',
    wordCount: 178,
    questions: [
      {
        question: 'How does modern research describe sleep?',
        options: [
          'A passive, unimportant state',
          'A remarkably active and essential process',
          'A waste of time',
          'A purely physical event',
        ],
        correctIndex: 1,
      },
      {
        question: 'What is deep sleep thought to be crucial for?',
        options: [
          'Memory consolidation only',
          'Physical recovery and immune strengthening',
          'Emotional processing only',
          'Digestion',
        ],
        correctIndex: 1,
      },
      {
        question: 'What has chronic sleep deprivation been linked to?',
        options: [
          'Improved mood',
          'A wide range of health problems',
          'Better concentration',
          'Stronger immunity',
        ],
        correctIndex: 1,
      },
      {
        question: 'What do sleep researchers argue about how sleep is treated?',
        options: [
          'It is treated with too much importance',
          'It is often wrongly treated as a luxury',
          'It should be eliminated',
          'It has no real biological function',
        ],
        correctIndex: 1,
      },
    ],
    newWords: ['deprivation', 'consolidation', 'cardiovascular', 'immunity', 'underestimated'],
  },
  {
    level: 'B2',
    title: 'Urban Green Spaces and Wellbeing',
    topic: 'city life',
    body: 'As cities continue to expand, urban planners are increasingly recognizing the importance of green spaces for the wellbeing of residents. Parks, tree-lined streets, and rooftop gardens do more than simply improve the appearance of a city; they play a measurable role in reducing air pollution, lowering urban temperatures, and providing residents with places to exercise and socialize. Research conducted in several major cities has found that people living near accessible green spaces report lower levels of stress and higher overall life satisfaction compared to those in areas with limited access to nature. Some architects have gone further, designing entire buildings with vertical gardens and green roofs to bring nature directly into dense urban environments. Critics, however, point out that access to these green spaces is often unevenly distributed, with wealthier neighborhoods typically enjoying far more parks and trees than lower-income areas. Addressing this imbalance, they argue, should be treated as a matter of public health and social equity rather than simply an aesthetic concern for city planners to consider when convenient.',
    wordCount: 171,
    questions: [
      {
        question: 'What do green spaces do besides improving appearance?',
        options: [
          'Increase pollution',
          'Reduce pollution and lower temperatures',
          'Raise urban temperatures',
          'Nothing measurable',
        ],
        correctIndex: 1,
      },
      {
        question: 'What did research find about people near green spaces?',
        options: [
          'Higher stress levels',
          'Lower stress and higher life satisfaction',
          'No difference in wellbeing',
          'Lower life satisfaction',
        ],
        correctIndex: 1,
      },
      {
        question: 'What have some architects designed to bring nature into cities?',
        options: [
          'Underground tunnels',
          'Vertical gardens and green roofs',
          'Larger parking lots',
          'Taller skyscrapers only',
        ],
        correctIndex: 1,
      },
      {
        question: 'What concern do critics raise about green spaces?',
        options: [
          'They cost too much to build',
          'Access is unevenly distributed by income',
          'They attract too much wildlife',
          'They are only found in poor areas',
        ],
        correctIndex: 1,
      },
    ],
    newWords: ['wellbeing', 'accessible', 'aesthetic', 'equity', 'unevenly'],
  },
  {
    level: 'B2',
    title: 'The Rise of Remote Work',
    topic: 'work',
    body: 'Over the past decade, and especially following the global disruptions of recent years, remote work has shifted from being a rare perk to a mainstream expectation for many employees. Companies that once required staff to be physically present in an office have discovered that productivity does not necessarily depend on location, provided that employees have reliable technology and clear communication channels. For many workers, the ability to work from home has brought significant benefits, including reduced commuting time, greater flexibility to manage personal responsibilities, and, in some cases, improved overall job satisfaction. However, this shift has not been without its challenges. Some employees report feeling isolated without the daily social interaction of an office, while others struggle to separate their professional and personal lives when both take place within the same physical space. Employers, meanwhile, face new questions about how to maintain company culture and ensure fair opportunities for career advancement when teams are geographically dispersed. As organizations continue to experiment with hybrid models that combine remote and in-person work, it remains uncertain which arrangement will ultimately prove most sustainable in the long term.',
    wordCount: 184,
    questions: [
      {
        question: 'What has remote work shifted from being, according to the passage?',
        options: [
          'A mainstream expectation to a rare perk',
          'A rare perk to a mainstream expectation',
          'A legal requirement',
          'A temporary trend with no future',
        ],
        correctIndex: 1,
      },
      {
        question: 'What do companies need for remote productivity, according to the text?',
        options: [
          'A large office',
          'Reliable technology and clear communication',
          'Strict supervision',
          'Fewer employees',
        ],
        correctIndex: 1,
      },
      {
        question: 'What challenge do some employees report with remote work?',
        options: [
          'Too much social interaction',
          'Feeling isolated without daily office interaction',
          'Too little flexibility',
          'Longer commutes',
        ],
        correctIndex: 1,
      },
      {
        question: 'What question do employers face regarding remote teams?',
        options: [
          'How to reduce salaries',
          'How to maintain culture and fair career advancement',
          'How to eliminate remote work',
          'How to increase commuting',
        ],
        correctIndex: 1,
      },
    ],
    newWords: ['disruption', 'commuting', 'isolated', 'dispersed', 'sustainable'],
  },
  {
    level: 'B2',
    title: 'Why We Forget: The Psychology of Memory',
    topic: 'psychology',
    body: 'Forgetting is often seen as a flaw in human memory, yet many psychologists now argue that it serves an important cognitive function rather than being simply a failure of the brain. According to this view, the brain is constantly filtering enormous amounts of information, and forgetting allows us to discard details that are no longer relevant, making space for information that is more useful for our current goals. One influential theory suggests that memories do not disappear completely but instead become harder to access over time, particularly when they are not reinforced through repetition or emotional significance. This explains why a smell or a piece of music can suddenly bring back a memory that seemed completely forgotten. Researchers have also found that stress and lack of sleep significantly impair our ability to both form new memories and recall existing ones, which may explain why students often struggle to remember material studied the night before an exam without adequate rest. Understanding these mechanisms has practical implications, from improving study techniques to developing treatments for memory-related conditions such as dementia.',
    wordCount: 178,
    questions: [
      {
        question: 'What do many psychologists argue about forgetting?',
        options: [
          'It is always a flaw',
          'It serves an important cognitive function',
          'It never happens naturally',
          'It only affects older people',
        ],
        correctIndex: 1,
      },
      {
        question: 'Why does forgetting help the brain, according to the passage?',
        options: [
          'It has no benefit',
          'It discards irrelevant details, making space for useful information',
          'It increases stress',
          'It slows down thinking',
        ],
        correctIndex: 1,
      },
      {
        question: 'What can trigger a memory that seemed forgotten?',
        options: [
          'Only conscious effort',
          'A smell or piece of music',
          'Only sleep',
          'Nothing can trigger it',
        ],
        correctIndex: 1,
      },
      {
        question: 'What do stress and lack of sleep impair, according to researchers?',
        options: [
          'Only physical health',
          'Forming and recalling memories',
          'Only emotional responses',
          'Nothing significant',
        ],
        correctIndex: 1,
      },
    ],
    newWords: ['flaw', 'filtering', 'reinforced', 'impair', 'mechanism'],
  },

  // ===== C1 =====
  {
    level: 'C1',
    title: 'The Paradox of Choice',
    topic: 'psychology',
    body: "Modern consumer societies are often built on the assumption that more choice inevitably leads to greater satisfaction, yet a growing body of psychological research suggests the opposite may sometimes be true. Psychologist Barry Schwartz popularized the idea of the 'paradox of choice,' arguing that while a moderate amount of choice is beneficial, an overwhelming number of options can produce anxiety, decision paralysis, and ultimately lower satisfaction with whatever is eventually chosen. This phenomenon has been observed across a wide range of contexts, from selecting a jar of jam in a supermarket to choosing a career path or a retirement investment plan. One proposed explanation is that as the number of options increases, so does the cognitive burden of comparing them, along with the fear of making the wrong decision and missing out on a better alternative. Furthermore, having many options can raise our expectations of finding the perfect choice, which makes any imperfect outcome feel more disappointing than it otherwise would. Some economists and designers have responded by advocating for 'choice architecture,' a practice of deliberately structuring the presentation of options to reduce cognitive load without eliminating meaningful freedom of choice. Critics of Schwartz's theory, however, note that the effect is not universal and may depend heavily on individual personality traits, cultural context, and the perceived importance of the decision at hand, suggesting that the relationship between choice and satisfaction is more nuanced than a simple paradox.",
    wordCount: 237,
    questions: [
      {
        question: 'What does the "paradox of choice" suggest about too many options?',
        options: [
          'They always increase satisfaction',
          'They can produce anxiety and lower satisfaction',
          'They have no psychological effect',
          'They only affect career decisions',
        ],
        correctIndex: 1,
      },
      {
        question: 'What is one proposed explanation for this phenomenon?',
        options: [
          'Options reduce cognitive burden',
          'The cognitive burden of comparing options increases',
          'People prefer fewer choices intrinsically',
          'It only applies to expensive purchases',
        ],
        correctIndex: 1,
      },
      {
        question: 'What is "choice architecture"?',
        options: [
          'A building design style',
          'Structuring options to reduce cognitive load',
          'Removing all choices from consumers',
          'A marketing slogan',
        ],
        correctIndex: 1,
      },
      {
        question: "What do critics of Schwartz's theory point out?",
        options: [
          'The effect is universal for everyone',
          'The effect may depend on personality and context',
          'Choice never affects satisfaction',
          'The theory has no critics',
        ],
        correctIndex: 1,
      },
    ],
    newWords: ['paradox', 'paralysis', 'cognitive', 'architecture (choice)', 'nuanced'],
  },
  {
    level: 'C1',
    title: 'The Silk Road Revisited',
    topic: 'history',
    body: "For centuries, the term 'Silk Road' has evoked images of camel caravans crossing vast deserts, carrying silk, spices, and precious stones between East and West. In reality, historians increasingly emphasize that the Silk Road was never a single road at all, but rather a shifting network of interconnected trade routes spanning thousands of kilometers, from the Mediterranean coast to the heart of China. These routes facilitated not only the exchange of goods but also the transmission of ideas, religions, technologies, and diseases, making the Silk Road one of the earliest and most consequential examples of globalization in human history. Buddhism spread from India into Central Asia and eventually China largely along these trade routes, while papermaking technology traveled in the opposite direction, eventually reaching Europe centuries later and transforming the spread of written knowledge. The Silk Road also played a tragic role in history as a conduit for the spread of the bubonic plague, which devastated populations across Eurasia in the fourteenth century. Contemporary scholars caution against romanticizing this network as a purely peaceful exchange of culture, pointing out that trade along these routes was often accompanied by military conquest, forced labor, and the exploitation of local populations by dominant empires. Understanding the Silk Road in this more complex light offers valuable lessons for how we think about globalization today, revealing that interconnected trade has always carried both tremendous opportunity and considerable risk in equal measure.",
    wordCount: 236,
    questions: [
      {
        question: 'What do historians increasingly emphasize about the Silk Road?',
        options: [
          'It was a single paved road',
          'It was a shifting network of trade routes',
          'It only existed in Europe',
          'It carried only silk',
        ],
        correctIndex: 1,
      },
      {
        question: 'What besides goods did the Silk Road transmit?',
        options: [
          'Nothing else',
          'Ideas, religions, technologies, and diseases',
          'Only military technology',
          'Only currency',
        ],
        correctIndex: 1,
      },
      {
        question: 'What tragic role did the Silk Road play in the fourteenth century?',
        options: [
          'It spread the bubonic plague',
          'It caused a famine',
          'It ended all trade',
          'It caused a world war',
        ],
        correctIndex: 0,
      },
      {
        question: 'What do contemporary scholars caution against?',
        options: [
          'Studying the Silk Road at all',
          'Romanticizing it as purely peaceful exchange',
          'Comparing it to modern trade',
          'Teaching it in schools',
        ],
        correctIndex: 1,
      },
    ],
    newWords: ['caravan', 'conduit', 'consequential', 'romanticizing', 'exploitation'],
  },
  {
    level: 'C1',
    title: 'The Myth of Multitasking',
    topic: 'psychology',
    body: "In an age that prizes efficiency and constant connectivity, the ability to multitask is frequently celebrated as a valuable professional skill, yet a substantial body of cognitive research suggests that what we call multitasking is, for the vast majority of people, something closer to an illusion. Rather than genuinely processing multiple complex tasks simultaneously, the human brain typically switches rapidly between tasks, a phenomenon researchers term 'task-switching.' Each switch, however brief, imposes what is known as a switching cost: a measurable delay and increase in error rate as the brain reorients itself to the demands of the new task. Studies conducted in controlled laboratory settings have consistently found that individuals who attempt to juggle multiple demanding activities, such as writing an email while participating in a conference call, perform measurably worse on both tasks than they would if the tasks were completed sequentially. Perhaps more troubling, some research indicates that habitual multitaskers may actually become less effective at filtering out irrelevant information over time, suggesting that the practice can erode rather than enhance cognitive performance. Despite this evidence, workplace cultures continue to reward visible busyness and rapid task-switching, often mistaking the appearance of productivity for its substance. Some researchers now argue that organizations seeking genuine gains in output would be better served by encouraging focused, single-task work supported by clearly protected blocks of uninterrupted time.",
    wordCount: 225,
    questions: [
      {
        question: 'What does cognitive research suggest about multitasking?',
        options: [
          'It is a valuable and efficient skill',
          'It is largely an illusion for most people',
          'It has no cognitive cost',
          'It improves accuracy',
        ],
        correctIndex: 1,
      },
      {
        question: 'What is a "switching cost"?',
        options: [
          'A financial cost of technology',
          'A delay and increased errors when switching tasks',
          'A benefit of multitasking',
          'A type of workplace bonus',
        ],
        correctIndex: 1,
      },
      {
        question:
          'What did laboratory studies find about performing tasks simultaneously versus sequentially?',
        options: [
          'Simultaneous performance was better',
          'Simultaneous performance was measurably worse',
          'There was no difference',
          'Sequential tasks took longer',
        ],
        correctIndex: 1,
      },
      {
        question: 'What do some researchers recommend organizations do instead?',
        options: [
          'Encourage more multitasking',
          'Encourage focused, single-task work with protected time',
          'Reward visible busyness',
          'Eliminate all breaks',
        ],
        correctIndex: 1,
      },
    ],
    newWords: ['multitask', 'illusion', 'sequentially', 'habitual', 'erode'],
  },
  {
    level: 'C1',
    title: 'Reconsidering Economic Growth',
    topic: 'economics',
    body: "For much of the twentieth century, economic growth, typically measured as an increase in gross domestic product, was treated by policymakers and economists alike as a reliable proxy for national wellbeing and progress. In recent decades, however, this assumption has come under sustained scrutiny from a diverse range of critics who argue that GDP growth, while useful as a narrow economic indicator, fails to capture much of what actually determines quality of life. Critics point out that GDP does not account for the depletion of natural resources, the degradation of ecosystems, or the unpaid labor performed within households, and that it can rise even as inequality widens and social cohesion deteriorates. Proponents of alternative frameworks, such as the 'wellbeing economy' or 'doughnut economics,' propose replacing or supplementing GDP with metrics that more directly measure health, education, environmental sustainability, and equitable distribution of resources. Skeptics of this shift, however, caution that abandoning growth as a central policy objective could undermine the very mechanisms, such as job creation and public revenue, that fund the social programs these alternative frameworks aim to support. This tension reflects a broader and unresolved debate about whether it is possible to design an economic system that delivers genuine prosperity without depending on continual expansion of production and consumption, particularly in a world confronting the finite limits of its natural environment.",
    wordCount: 223,
    questions: [
      {
        question: 'What was GDP growth traditionally treated as?',
        options: [
          'An unreliable measure',
          'A reliable proxy for national wellbeing and progress',
          'A purely environmental measure',
          'An outdated concept',
        ],
        correctIndex: 1,
      },
      {
        question: 'What do critics say GDP fails to account for?',
        options: [
          'Only military spending',
          'Resource depletion, ecosystem degradation, and unpaid labor',
          'Only stock market performance',
          'Nothing important',
        ],
        correctIndex: 1,
      },
      {
        question: 'What do "wellbeing economy" proponents propose?',
        options: [
          'Ignoring all economic measurement',
          'Replacing or supplementing GDP with broader wellbeing metrics',
          'Increasing GDP as fast as possible',
          'Abolishing public services',
        ],
        correctIndex: 1,
      },
      {
        question: 'What concern do skeptics raise about moving away from growth?',
        options: [
          'It could undermine funding for social programs',
          'It would have no effect on anything',
          'It would immediately solve inequality',
          'It is legally impossible',
        ],
        correctIndex: 0,
      },
    ],
    newWords: ['proxy', 'scrutiny', 'depletion', 'cohesion', 'equitable'],
  },

  // ===== C2 =====
  {
    level: 'C2',
    title: 'Artificial Intelligence and the Question of Creativity',
    topic: 'technology',
    body: 'As generative artificial intelligence systems produce increasingly sophisticated text, images, and music, a longstanding philosophical question has resurfaced with new urgency: can a machine truly be creative, or is it merely recombining patterns extracted from vast quantities of human-made work? Proponents of the view that these systems exhibit genuine creativity point to instances in which generative models produce outputs that surprise even their own developers, arguing that novelty and unpredictability, rather than any metaphysical claim about consciousness, should be the operative criteria for creativity. Skeptics counter that this framing conflates statistical novelty with the kind of intentional, meaning-driven creativity that characterizes human artistic expression, noting that a generative model has no lived experience, no stakes in the world, and no capacity to mean anything by what it produces. This distinction, they argue, is not merely academic: it bears directly on questions of authorship, copyright, and the economic displacement of human artists whose work was used, often without consent or compensation, to train the very systems now competing with them commercially. Further complicating the debate is the observation that human creativity itself is rarely conjured from nothing; artists have always drawn on inherited traditions, influences, and techniques absorbed through years of exposure to the work of others, raising uncomfortable questions about where derivative influence ends and original creation begins for both human and machine alike. Some scholars propose a middle path, suggesting that these systems be understood not as autonomous creative agents but as sophisticated collaborative tools whose creative value emerges only in interaction with a discerning human editor who selects, refines, and recontextualizes their raw output. Whether this framing will satisfy either the most enthusiastic proponents of machine creativity or its most committed skeptics remains, for now, an open and contested question that legal systems, cultural institutions, and artists themselves are only beginning to confront in earnest.',
    wordCount: 307,
    questions: [
      {
        question: 'What criteria do proponents of machine creativity propose?',
        options: [
          'Consciousness and lived experience',
          'Novelty and unpredictability',
          'Market value',
          'Speed of production',
        ],
        correctIndex: 1,
      },
      {
        question: 'What do skeptics say generative models lack?',
        options: [
          'Processing speed',
          'Lived experience and intentional meaning',
          'Access to training data',
          'Technical sophistication',
        ],
        correctIndex: 1,
      },
      {
        question:
          'What real-world issue does this debate bear directly on, according to the passage?',
        options: [
          'Only aesthetic preferences',
          'Authorship, copyright, and economic displacement of artists',
          'Internet speed',
          'Weather prediction',
        ],
        correctIndex: 1,
      },
      {
        question: 'What "middle path" do some scholars propose?',
        options: [
          'Banning generative AI entirely',
          'Viewing these systems as collaborative tools requiring human editing',
          'Granting AI full legal authorship',
          'Ignoring the question altogether',
        ],
        correctIndex: 1,
      },
    ],
    newWords: ['conflates', 'derivative', 'recontextualizes', 'autonomous', 'displacement'],
  },
  {
    level: 'C2',
    title: 'The Ethics of Genetic Engineering',
    topic: 'science',
    body: 'The advent of precise gene-editing technologies such as CRISPR has transformed genetic engineering from a slow, imprecise endeavor into a remarkably efficient tool capable of altering the genetic code of living organisms with unprecedented accuracy. While the therapeutic potential of these technologies is difficult to overstate, offering the prospect of curing previously untreatable genetic diseases and eliminating inherited disorders before birth, their emergence has also reignited longstanding ethical debates that were once largely theoretical and are now acutely practical. Central to this debate is the distinction between somatic gene editing, which alters cells in a single individual and is not passed to offspring, and germline editing, which modifies reproductive cells in ways that are inherited by all future descendants, raising the specter of permanent, irreversible changes to the human gene pool. Proponents of permitting germline editing for serious medical conditions argue that withholding a technology capable of eliminating devastating hereditary diseases constitutes its own moral failing, one rooted in an excessive and perhaps sentimental attachment to genetic status quo. Critics, however, warn that the line between therapeutic editing and enhancement is far blurrier than proponents suggest, and that permitting germline modification for disease prevention establishes a precedent that could gradually normalize more contentious interventions aimed at enhancing intelligence, physical appearance, or other traits with no clear medical justification. Such a trajectory, critics contend, risks entrenching genetic inequality along existing lines of wealth and access, effectively creating a biological underclass unable to afford enhancements available to the privileged. International regulatory bodies remain deeply divided on how to proceed, with some countries imposing strict moratoriums on germline editing while others permit narrowly defined therapeutic applications under tight oversight, reflecting a broader and unresolved societal ambivalence about how much control humanity should exercise over its own genetic future.',
    wordCount: 295,
    questions: [
      {
        question: 'What is the key distinction discussed between somatic and germline editing?',
        options: [
          'Cost and availability',
          'Whether changes are inherited by future generations',
          'Speed of the procedure',
          'Which organisms can be edited',
        ],
        correctIndex: 1,
      },
      {
        question: 'What do proponents of germline editing argue?',
        options: [
          'It should never be used',
          'Withholding it for serious diseases is itself a moral failing',
          'It has no medical benefit',
          'It is purely cosmetic',
        ],
        correctIndex: 1,
      },
      {
        question:
          'What risk do critics associate with permitting germline editing for disease prevention?',
        options: [
          'It could normalize non-medical enhancement and entrench inequality',
          'It would immediately cure all diseases',
          'It has no long-term consequences',
          'It would be too expensive to ever use',
        ],
        correctIndex: 0,
      },
      {
        question: 'How do international regulatory bodies currently approach germline editing?',
        options: [
          'They are unanimous in banning it',
          'They are unanimous in permitting it freely',
          'They remain deeply divided in their approaches',
          'They have not considered the issue',
        ],
        correctIndex: 2,
      },
    ],
    newWords: ['advent', 'somatic', 'germline', 'moratorium', 'entrenching'],
  },
  {
    level: 'C2',
    title: 'The Limits of Rational Choice Theory',
    topic: 'economics',
    body: "For much of the twentieth century, mainstream economics rested on the foundational assumption that individuals act as rational agents, consistently making decisions that maximize their own self-interest based on a careful weighing of available information. This framework, known as rational choice theory, provided elegant and mathematically tractable models capable of predicting market behavior with considerable precision under idealized conditions. However, the emergence of behavioral economics over the past several decades, drawing heavily on insights from cognitive psychology, has systematically dismantled many of the theory's core assumptions by demonstrating that human decision-making is pervasively shaped by cognitive biases, heuristics, and emotional influences that deviate predictably from strict rationality. Pioneering researchers such as Daniel Kahneman and Amos Tversky documented numerous instances in which individuals consistently violate the axioms of rational choice, from overweighting vivid but statistically improbable risks to exhibiting pronounced loss aversion that leads people to make markedly different decisions depending on how a choice is framed, even when the underlying outcomes are mathematically identical. Rather than dismissing rational choice theory entirely, most contemporary economists now regard it as a useful idealization, a simplifying baseline against which the systematic and predictable ways in which real human behavior deviates can be productively measured and incorporated into more sophisticated models. This reconciliation has proven especially influential in the design of public policy, where so-called 'nudge' interventions, informed by an understanding of predictable irrationality, are increasingly used to guide individuals toward outcomes they themselves would endorse upon reflection, without resorting to outright coercion or the elimination of choice altogether.",
    wordCount: 255,
    questions: [
      {
        question: 'What did rational choice theory traditionally assume about individuals?',
        options: [
          'They act randomly',
          'They consistently act to maximize self-interest rationally',
          'They never make decisions',
          'They always cooperate with others',
        ],
        correctIndex: 1,
      },
      {
        question: 'What has behavioral economics demonstrated about decision-making?',
        options: [
          'It is always perfectly rational',
          'It is pervasively shaped by cognitive biases and emotion',
          'It has no predictable patterns',
          'It is unrelated to psychology',
        ],
        correctIndex: 1,
      },
      {
        question: 'What did Kahneman and Tversky document?',
        options: [
          'That people never violate rational choice',
          'Consistent violations of rational choice axioms, such as loss aversion',
          'That framing has no effect on decisions',
          'That economics has no biases',
        ],
        correctIndex: 1,
      },
      {
        question: 'How do most contemporary economists now regard rational choice theory?',
        options: [
          'As completely false and useless',
          'As a useful idealization and simplifying baseline',
          'As the final word on human behavior',
          'As irrelevant to policy',
        ],
        correctIndex: 1,
      },
    ],
    newWords: ['tractable', 'heuristic', 'aversion', 'idealization', 'coercion'],
  },
  {
    level: 'C2',
    title: 'Digital Privacy in the Age of Surveillance Capitalism',
    topic: 'technology',
    body: "The proliferation of digital platforms that generate revenue by collecting, analyzing, and monetizing vast quantities of personal data has given rise to what scholar Shoshana Zuboff terms 'surveillance capitalism,' an economic logic in which human experience itself becomes the raw material for a new kind of commercial extraction. Unlike earlier forms of industrial capitalism, which primarily transformed natural resources and labor into marketable commodities, surveillance capitalism claims as its input the previously unmonetized aspects of everyday life: browsing habits, physical movements, emotional reactions, and social relationships, all rendered into behavioral data that can be aggregated, analyzed, and ultimately sold to predict and, increasingly, to influence future behavior. Proponents of this data-driven economy argue that the resulting personalization delivers genuine value to consumers, from more relevant advertising to more convenient services tailored to individual preferences, and that users implicitly consent to this exchange each time they accept a platform's terms of service. Critics counter that such consent is largely illusory, extracted through opaque and lengthy agreements that few users meaningfully read or understand, and that the asymmetry of power between individual users and the corporations that possess their data undermines any meaningful notion of informed choice. This asymmetry becomes particularly consequential when behavioral data is used not merely to predict preferences but to actively shape them, raising profound questions about autonomy and free will in an environment engineered to maximize engagement and, by extension, profit. Regulatory responses have varied considerably across jurisdictions, with some governments enacting stringent data protection frameworks while others have been comparatively slow to act, leaving many observers to conclude that meaningful oversight of surveillance capitalism remains, for now, substantially outpaced by the rapid evolution of the technologies it seeks to govern.",
    wordCount: 284,
    questions: [
      {
        question: 'What does "surveillance capitalism" refer to, according to the passage?',
        options: [
          'Government spying on citizens',
          'An economic logic that turns human experience into commercial data',
          'Traditional industrial manufacturing',
          'A type of banking fraud',
        ],
        correctIndex: 1,
      },
      {
        question: 'What do proponents argue about data-driven personalization?',
        options: [
          'It has no value to consumers',
          'It delivers genuine value through personalization',
          'It is illegal',
          'It requires no consent',
        ],
        correctIndex: 1,
      },
      {
        question: 'Why do critics say user consent is "largely illusory"?',
        options: [
          'Users are forced to sign contracts',
          'It is extracted through opaque agreements few people read',
          'Consent is not required',
          'Users are paid for their data',
        ],
        correctIndex: 1,
      },
      {
        question: 'How have regulatory responses to surveillance capitalism varied?',
        options: [
          'All governments have banned it',
          'Responses vary, with some strict and others slow to act',
          'No government has responded',
          'All countries have identical laws',
        ],
        correctIndex: 1,
      },
    ],
    newWords: ['proliferation', 'monetize', 'asymmetry', 'autonomy', 'jurisdiction'],
  },
];
