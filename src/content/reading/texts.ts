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
    body: "On Saturday, I get up late and eat a big breakfast. Then I clean my room and wash the dishes. In the afternoon, I meet my friends in the park. We play football and talk. On Sunday, I visit my grandparents. My grandmother cooks a big dinner for the whole family. After dinner, we watch a film together. I love my weekends because I can relax and see the people I love.",
    wordCount: 78,
    questions: [
      { question: 'What does the writer do on Saturday morning?', options: ['Plays football', 'Gets up late and eats breakfast', 'Visits grandparents', 'Watches a film'], correctIndex: 1 },
      { question: 'Where does the writer meet friends?', options: ['At school', 'At home', 'In the park', 'At the cinema'], correctIndex: 2 },
      { question: 'Who cooks dinner on Sunday?', options: ['The writer', 'A friend', 'The grandmother', 'The father'], correctIndex: 2 },
      { question: 'Why does the writer love weekends?', options: ['To work', 'To relax and see loved ones', 'To clean the house', 'To study'], correctIndex: 1 },
    ],
    newWords: ['weekend', 'clean', 'relax', 'grandparents', 'together'],
  },
  {
    level: 'A1',
    title: 'The Little Garden',
    topic: 'nature',
    body: "Behind our house, there is a small garden. My mother grows flowers and vegetables there. In spring, the flowers are pink and yellow. In summer, we pick tomatoes and carrots. I help my mother every weekend. We water the plants and pull out the weeds. My favorite flower is the sunflower because it is tall and bright. The garden makes our house beautiful and happy.",
    wordCount: 71,
    questions: [
      { question: 'Who grows the flowers and vegetables?', options: ['The father', 'The mother', 'The writer', 'A neighbor'], correctIndex: 1 },
      { question: 'What color are the flowers in spring?', options: ['Red and blue', 'Pink and yellow', 'White and green', 'Purple and orange'], correctIndex: 1 },
      { question: 'What do they pick in summer?', options: ['Apples and pears', 'Tomatoes and carrots', 'Flowers only', 'Potatoes'], correctIndex: 1 },
      { question: "What is the writer's favorite flower?", options: ['The rose', 'The tulip', 'The sunflower', 'The daisy'], correctIndex: 2 },
    ],
    newWords: ['garden', 'grow', 'weeds', 'water (verb)', 'sunflower'],
  },

  // ===== A2 =====
  {
    level: 'A2',
    title: 'A Visit to the Market',
    topic: 'culture',
    body: "Every Saturday morning, hundreds of people visit the old market in the town center. Sellers arrive early to set up their stalls, filling the street with the smell of fresh bread and spices. You can buy fruit, vegetables, cheese, and handmade clothes there. Many tourists like to visit the market because it shows the real life of the town. Local musicians often play music near the entrance, and children dance to the songs. Last weekend, I bought a basket of strawberries and a scarf made by a local artist. It was a wonderful morning full of colors, sounds, and delicious smells.",
    wordCount: 104,
    questions: [
      { question: 'When does the market take place?', options: ['Every evening', 'Every Saturday morning', 'Only in summer', 'Every Sunday night'], correctIndex: 1 },
      { question: 'Why do many tourists like the market?', options: ['It is cheap', 'It shows the real life of the town', 'It sells only clothes', 'It is far from the center'], correctIndex: 1 },
      { question: 'What do local musicians do at the market?', options: ['Sell instruments', 'Play music near the entrance', 'Teach dancing', 'Clean the stalls'], correctIndex: 1 },
      { question: 'What did the writer buy?', options: ['Bread and cheese', 'A basket of strawberries and a scarf', 'Vegetables only', 'A musical instrument'], correctIndex: 1 },
    ],
    newWords: ['market', 'stall', 'spices', 'tourist', 'handmade'],
  },
  {
    level: 'A2',
    title: 'Learning to Cook',
    topic: 'daily life',
    body: "When I moved into my first apartment, I did not know how to cook anything. I always ate sandwiches or ordered food from restaurants. One day, my neighbor invited me for dinner and taught me how to make a simple pasta dish. I loved it so much that I started watching cooking videos online every evening. Now I cook dinner for myself almost every day, and sometimes I even invite friends over. My favorite dish to make is a vegetable soup with fresh herbs. Cooking has become a relaxing hobby, and it also helps me save money because I eat out much less than before.",
    wordCount: 106,
    questions: [
      { question: 'What did the writer usually eat before learning to cook?', options: ['Home-cooked meals', 'Sandwiches or restaurant food', 'Only soup', 'Nothing at all'], correctIndex: 1 },
      { question: 'Who taught the writer to cook?', options: ['A cooking teacher', 'A parent', 'A neighbor', 'A friend online'], correctIndex: 2 },
      { question: 'What is the favorite dish to make now?', options: ['Pasta', 'Vegetable soup', 'Sandwiches', 'Salad'], correctIndex: 1 },
      { question: 'How has cooking helped the writer?', options: ['It made them famous', 'It helps them save money', 'It made them tired', 'It cost more money'], correctIndex: 1 },
    ],
    newWords: ['apartment', 'neighbor', 'herbs', 'hobby', 'eat out'],
  },

  // ===== B1 =====
  {
    level: 'B1',
    title: 'The History of Coffee',
    topic: 'history',
    body: "Coffee is one of the most popular drinks in the world today, but its history goes back many centuries. According to legend, coffee was discovered in Ethiopia by a goat herder who noticed his goats became energetic after eating berries from a certain plant. Word of this discovery eventually spread to the Arabian Peninsula, where coffee houses began to appear in cities like Mecca and Cairo. These coffee houses quickly became important places for conversation, music, and even political discussion. By the seventeenth century, coffee had reached Europe, where it was initially viewed with suspicion by some religious leaders. Over time, however, coffee houses opened across major European cities and became centers of intellectual life, attracting writers, artists, and scientists. Today, coffee is grown in more than seventy countries and remains a central part of daily routines for millions of people around the world.",
    wordCount: 145,
    questions: [
      { question: 'According to legend, who discovered coffee?', options: ['A king', 'A goat herder', 'A scientist', 'A merchant'], correctIndex: 1 },
      { question: 'Where did coffee houses first appear?', options: ['Europe', 'The Arabian Peninsula', 'South America', 'Asia'], correctIndex: 1 },
      { question: 'How did some religious leaders in Europe first view coffee?', options: ['With enthusiasm', 'With suspicion', 'With indifference', 'With approval'], correctIndex: 1 },
      { question: 'What did European coffee houses become centers of?', options: ['Farming', 'Intellectual life', 'Sports', 'Fashion'], correctIndex: 1 },
    ],
    newWords: ['legend', 'herder', 'suspicion', 'intellectual', 'routine'],
  },
  {
    level: 'B1',
    title: 'The Rise of Community Gardens',
    topic: 'environment',
    body: "In many cities around the world, empty lots and unused spaces are being transformed into community gardens. These small green areas allow neighbors to grow their own vegetables, flowers, and herbs together. Community gardens offer more than just fresh produce; they also give people a chance to meet their neighbors and build stronger relationships within the local area. Studies have shown that spending time gardening can reduce stress and improve mental health, which makes these spaces especially valuable in busy urban environments. In addition to the social and health benefits, community gardens also help the environment by increasing green space and supporting local wildlife such as bees and butterflies. Some cities now offer free land and tools to residents who want to start their own community garden, hoping to encourage more people to get involved in this growing movement.",
    wordCount: 141,
    questions: [
      { question: 'What are empty lots being transformed into?', options: ['Parking lots', 'Community gardens', 'Shopping centers', 'Playgrounds'], correctIndex: 1 },
      { question: 'What benefit do studies link to gardening?', options: ['Increased stress', 'Reduced stress and better mental health', 'Higher food prices', 'Less social contact'], correctIndex: 1 },
      { question: 'How do community gardens help the environment?', options: ['By reducing green space', 'By increasing green space and supporting wildlife', 'By using more concrete', 'By reducing the number of bees'], correctIndex: 1 },
      { question: 'What do some cities offer residents to start a garden?', options: ['Nothing', 'Free land and tools', 'Only money', 'Free food'], correctIndex: 1 },
    ],
    newWords: ['community', 'produce (noun)', 'urban', 'wildlife', 'movement'],
  },

  // ===== B2 =====
  {
    level: 'B2',
    title: 'The Science of Sleep',
    topic: 'science',
    body: "Sleep has long been regarded as a passive state in which the body and brain simply rest, but modern research reveals it to be a remarkably active process essential for both physical and mental health. During sleep, the brain cycles through several distinct stages, including deep sleep and REM sleep, each serving different biological functions. Deep sleep is thought to be crucial for physical recovery, including muscle repair and immune system strengthening, while REM sleep plays a central role in memory consolidation and emotional processing. Chronic sleep deprivation has been linked to a wide range of health problems, from impaired concentration and mood disorders to more serious long-term risks such as cardiovascular disease and weakened immunity. Despite growing awareness of its importance, many people in modern society continue to sacrifice sleep in favor of work, entertainment, or social obligations. Sleep researchers now argue that treating sleep as a luxury rather than a biological necessity may be one of the most underestimated public health issues of our time, urging both individuals and institutions to reconsider how they prioritize rest.",
    wordCount: 175,
    questions: [
      { question: 'How does modern research describe sleep?', options: ['A passive, unimportant state', 'A remarkably active and essential process', 'A waste of time', 'A purely physical event'], correctIndex: 1 },
      { question: 'What is deep sleep thought to be crucial for?', options: ['Memory consolidation only', 'Physical recovery and immune strengthening', 'Emotional processing only', 'Digestion'], correctIndex: 1 },
      { question: 'What has chronic sleep deprivation been linked to?', options: ['Improved mood', 'A wide range of health problems', 'Better concentration', 'Stronger immunity'], correctIndex: 1 },
      { question: 'What do sleep researchers argue about how sleep is treated?', options: ['It is treated with too much importance', 'It is often wrongly treated as a luxury', 'It should be eliminated', 'It has no real biological function'], correctIndex: 1 },
    ],
    newWords: ['deprivation', 'consolidation', 'cardiovascular', 'immunity', 'underestimated'],
  },
  {
    level: 'B2',
    title: 'Urban Green Spaces and Wellbeing',
    topic: 'city life',
    body: "As cities continue to expand, urban planners are increasingly recognizing the importance of green spaces for the wellbeing of residents. Parks, tree-lined streets, and rooftop gardens do more than simply improve the appearance of a city; they play a measurable role in reducing air pollution, lowering urban temperatures, and providing residents with places to exercise and socialize. Research conducted in several major cities has found that people living near accessible green spaces report lower levels of stress and higher overall life satisfaction compared to those in areas with limited access to nature. Some architects have gone further, designing entire buildings with vertical gardens and green roofs to bring nature directly into dense urban environments. Critics, however, point out that access to these green spaces is often unevenly distributed, with wealthier neighborhoods typically enjoying far more parks and trees than lower-income areas. Addressing this imbalance, they argue, should be treated as a matter of public health and social equity rather than simply an aesthetic concern for city planners to consider when convenient.",
    wordCount: 172,
    questions: [
      { question: 'What do green spaces do besides improving appearance?', options: ['Increase pollution', 'Reduce pollution and lower temperatures', 'Raise urban temperatures', 'Nothing measurable'], correctIndex: 1 },
      { question: 'What did research find about people near green spaces?', options: ['Higher stress levels', 'Lower stress and higher life satisfaction', 'No difference in wellbeing', 'Lower life satisfaction'], correctIndex: 1 },
      { question: 'What have some architects designed to bring nature into cities?', options: ['Underground tunnels', 'Vertical gardens and green roofs', 'Larger parking lots', 'Taller skyscrapers only'], correctIndex: 1 },
      { question: 'What concern do critics raise about green spaces?', options: ['They cost too much to build', 'Access is unevenly distributed by income', 'They attract too much wildlife', 'They are only found in poor areas'], correctIndex: 1 },
    ],
    newWords: ['wellbeing', 'accessible', 'aesthetic', 'equity', 'unevenly'],
  },

  // ===== C1 =====
  {
    level: 'C1',
    title: 'The Paradox of Choice',
    topic: 'psychology',
    body: "Modern consumer societies are often built on the assumption that more choice inevitably leads to greater satisfaction, yet a growing body of psychological research suggests the opposite may sometimes be true. Psychologist Barry Schwartz popularized the idea of the 'paradox of choice,' arguing that while a moderate amount of choice is beneficial, an overwhelming number of options can produce anxiety, decision paralysis, and ultimately lower satisfaction with whatever is eventually chosen. This phenomenon has been observed across a wide range of contexts, from selecting a jar of jam in a supermarket to choosing a career path or a retirement investment plan. One proposed explanation is that as the number of options increases, so does the cognitive burden of comparing them, along with the fear of making the wrong decision and missing out on a better alternative. Furthermore, having many options can raise our expectations of finding the perfect choice, which makes any imperfect outcome feel more disappointing than it otherwise would. Some economists and designers have responded by advocating for 'choice architecture,' a practice of deliberately structuring the presentation of options to reduce cognitive load without eliminating meaningful freedom of choice. Critics of Schwartz's theory, however, note that the effect is not universal and may depend heavily on individual personality traits, cultural context, and the perceived importance of the decision at hand, suggesting that the relationship between choice and satisfaction is more nuanced than a simple paradox.",
    wordCount: 249,
    questions: [
      { question: 'What does the "paradox of choice" suggest about too many options?', options: ['They always increase satisfaction', 'They can produce anxiety and lower satisfaction', 'They have no psychological effect', 'They only affect career decisions'], correctIndex: 1 },
      { question: 'What is one proposed explanation for this phenomenon?', options: ['Options reduce cognitive burden', 'The cognitive burden of comparing options increases', 'People prefer fewer choices intrinsically', 'It only applies to expensive purchases'], correctIndex: 1 },
      { question: 'What is "choice architecture"?', options: ['A building design style', 'Structuring options to reduce cognitive load', 'Removing all choices from consumers', 'A marketing slogan'], correctIndex: 1 },
      { question: "What do critics of Schwartz's theory point out?", options: ['The effect is universal for everyone', 'The effect may depend on personality and context', 'Choice never affects satisfaction', 'The theory has no critics'], correctIndex: 1 },
    ],
    newWords: ['paradox', 'paralysis', 'cognitive', 'architecture (choice)', 'nuanced'],
  },
  {
    level: 'C1',
    title: 'The Silk Road Revisited',
    topic: 'history',
    body: "For centuries, the term 'Silk Road' has evoked images of camel caravans crossing vast deserts, carrying silk, spices, and precious stones between East and West. In reality, historians increasingly emphasize that the Silk Road was never a single road at all, but rather a shifting network of interconnected trade routes spanning thousands of kilometers, from the Mediterranean coast to the heart of China. These routes facilitated not only the exchange of goods but also the transmission of ideas, religions, technologies, and diseases, making the Silk Road one of the earliest and most consequential examples of globalization in human history. Buddhism spread from India into Central Asia and eventually China largely along these trade routes, while papermaking technology traveled in the opposite direction, eventually reaching Europe centuries later and transforming the spread of written knowledge. The Silk Road also played a tragic role in history as a conduit for the spread of the bubonic plague, which devastated populations across Eurasia in the fourteenth century. Contemporary scholars caution against romanticizing this network as a purely peaceful exchange of culture, pointing out that trade along these routes was often accompanied by military conquest, forced labor, and the exploitation of local populations by dominant empires. Understanding the Silk Road in this more complex light offers valuable lessons for how we think about globalization today, revealing that interconnected trade has always carried both tremendous opportunity and considerable risk in equal measure.",
    wordCount: 246,
    questions: [
      { question: 'What do historians increasingly emphasize about the Silk Road?', options: ['It was a single paved road', 'It was a shifting network of trade routes', 'It only existed in Europe', 'It carried only silk'], correctIndex: 1 },
      { question: 'What besides goods did the Silk Road transmit?', options: ['Nothing else', 'Ideas, religions, technologies, and diseases', 'Only military technology', 'Only currency'], correctIndex: 1 },
      { question: 'What tragic role did the Silk Road play in the fourteenth century?', options: ['It spread the bubonic plague', 'It caused a famine', 'It ended all trade', 'It caused a world war'], correctIndex: 0 },
      { question: 'What do contemporary scholars caution against?', options: ['Studying the Silk Road at all', 'Romanticizing it as purely peaceful exchange', 'Comparing it to modern trade', 'Teaching it in schools'], correctIndex: 1 },
    ],
    newWords: ['caravan', 'conduit', 'consequential', 'romanticizing', 'exploitation'],
  },

  // ===== C2 =====
  {
    level: 'C2',
    title: 'Artificial Intelligence and the Question of Creativity',
    topic: 'technology',
    body: "As generative artificial intelligence systems produce increasingly sophisticated text, images, and music, a longstanding philosophical question has resurfaced with new urgency: can a machine truly be creative, or is it merely recombining patterns extracted from vast quantities of human-made work? Proponents of the view that these systems exhibit genuine creativity point to instances in which generative models produce outputs that surprise even their own developers, arguing that novelty and unpredictability, rather than any metaphysical claim about consciousness, should be the operative criteria for creativity. Skeptics counter that this framing conflates statistical novelty with the kind of intentional, meaning-driven creativity that characterizes human artistic expression, noting that a generative model has no lived experience, no stakes in the world, and no capacity to mean anything by what it produces. This distinction, they argue, is not merely academic: it bears directly on questions of authorship, copyright, and the economic displacement of human artists whose work was used, often without consent or compensation, to train the very systems now competing with them commercially. Further complicating the debate is the observation that human creativity itself is rarely conjured from nothing; artists have always drawn on inherited traditions, influences, and techniques absorbed through years of exposure to the work of others, raising uncomfortable questions about where derivative influence ends and original creation begins for both human and machine alike. Some scholars propose a middle path, suggesting that these systems be understood not as autonomous creative agents but as sophisticated collaborative tools whose creative value emerges only in interaction with a discerning human editor who selects, refines, and recontextualizes their raw output. Whether this framing will satisfy either the most enthusiastic proponents of machine creativity or its most committed skeptics remains, for now, an open and contested question that legal systems, cultural institutions, and artists themselves are only beginning to confront in earnest.",
    wordCount: 320,
    questions: [
      { question: 'What criteria do proponents of machine creativity propose?', options: ['Consciousness and lived experience', 'Novelty and unpredictability', 'Market value', 'Speed of production'], correctIndex: 1 },
      { question: 'What do skeptics say generative models lack?', options: ['Processing speed', 'Lived experience and intentional meaning', 'Access to training data', 'Technical sophistication'], correctIndex: 1 },
      { question: 'What real-world issue does this debate bear directly on, according to the passage?', options: ['Only aesthetic preferences', 'Authorship, copyright, and economic displacement of artists', 'Internet speed', 'Weather prediction'], correctIndex: 1 },
      { question: 'What "middle path" do some scholars propose?', options: ['Banning generative AI entirely', 'Viewing these systems as collaborative tools requiring human editing', 'Granting AI full legal authorship', 'Ignoring the question altogether'], correctIndex: 1 },
    ],
    newWords: ['conflates', 'derivative', 'recontextualizes', 'autonomous', 'displacement'],
  },
  {
    level: 'C2',
    title: 'The Ethics of Genetic Engineering',
    topic: 'science',
    body: "The advent of precise gene-editing technologies such as CRISPR has transformed genetic engineering from a slow, imprecise endeavor into a remarkably efficient tool capable of altering the genetic code of living organisms with unprecedented accuracy. While the therapeutic potential of these technologies is difficult to overstate, offering the prospect of curing previously untreatable genetic diseases and eliminating inherited disorders before birth, their emergence has also reignited longstanding ethical debates that were once largely theoretical and are now acutely practical. Central to this debate is the distinction between somatic gene editing, which alters cells in a single individual and is not passed to offspring, and germline editing, which modifies reproductive cells in ways that are inherited by all future descendants, raising the specter of permanent, irreversible changes to the human gene pool. Proponents of permitting germline editing for serious medical conditions argue that withholding a technology capable of eliminating devastating hereditary diseases constitutes its own moral failing, one rooted in an excessive and perhaps sentimental attachment to genetic status quo. Critics, however, warn that the line between therapeutic editing and enhancement is far blurrier than proponents suggest, and that permitting germline modification for disease prevention establishes a precedent that could gradually normalize more contentious interventions aimed at enhancing intelligence, physical appearance, or other traits with no clear medical justification. Such a trajectory, critics contend, risks entrenching genetic inequality along existing lines of wealth and access, effectively creating a biological underclass unable to afford enhancements available to the privileged. International regulatory bodies remain deeply divided on how to proceed, with some countries imposing strict moratoriums on germline editing while others permit narrowly defined therapeutic applications under tight oversight, reflecting a broader and unresolved societal ambivalence about how much control humanity should exercise over its own genetic future.",
    wordCount: 306,
    questions: [
      { question: 'What is the key distinction discussed between somatic and germline editing?', options: ['Cost and availability', 'Whether changes are inherited by future generations', 'Speed of the procedure', 'Which organisms can be edited'], correctIndex: 1 },
      { question: 'What do proponents of germline editing argue?', options: ['It should never be used', 'Withholding it for serious diseases is itself a moral failing', 'It has no medical benefit', 'It is purely cosmetic'], correctIndex: 1 },
      { question: 'What risk do critics associate with permitting germline editing for disease prevention?', options: ['It could normalize non-medical enhancement and entrench inequality', 'It would immediately cure all diseases', 'It has no long-term consequences', 'It would be too expensive to ever use'], correctIndex: 0 },
      { question: 'How do international regulatory bodies currently approach germline editing?', options: ['They are unanimous in banning it', 'They are unanimous in permitting it freely', 'They remain deeply divided in their approaches', 'They have not considered the issue'], correctIndex: 2 },
    ],
    newWords: ['advent', 'somatic', 'germline', 'moratorium', 'entrenching'],
  },
];
