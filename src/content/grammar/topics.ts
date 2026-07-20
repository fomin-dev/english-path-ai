export interface GrammarTopicSeed {
  slug: string;
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  category: string; // e.g. "tenses", "conditionals", "modals", "articles", "passive-voice", "reported-speech", "prepositions", "relative-clauses", "gerunds-infinitives"
  order: number;
  content: {
    en: { title: string; explanation: string; examples: string[] };
    ru: { title: string; explanation: string; examples: string[] };
    uk: { title: string; explanation: string; examples: string[] };
  };
  questions: Array<{ question: string; options: string[]; correctIndex: number; explanation: string }>;
}

export const grammarTopics: GrammarTopicSeed[] = [
  // ===== A1 =====
  {
    slug: 'a1-verb-to-be',
    level: 'A1',
    category: 'tenses',
    order: 1,
    content: {
      en: {
        title: 'The Verb "To Be"',
        explanation:
          'The verb "to be" (am / is / are) is one of the first things you learn in English. Use "am" with "I", "is" with "he / she / it" and singular nouns, and "are" with "you / we / they" and plural nouns. It is used to talk about names, jobs, feelings, and where things are. To make a negative, add "not" after the verb. To make a question, put the verb before the subject.',
        examples: ['I am a student.', 'She is happy.', 'They are from Spain.', 'He is not at home.', 'Are you tired?'],
      },
      ru: {
        title: 'Глагол "to be" (быть)',
        explanation:
          'Глагол "to be" (am / is / are) — одна из первых тем в английском языке. Используйте "am" с "I", "is" с "he / she / it" и единственным числом существительных, "are" с "you / we / they" и множественным числом. Он используется, чтобы говорить об именах, профессиях, чувствах и местоположении. Для отрицания добавьте "not" после глагола. Для вопроса поставьте глагол перед подлежащим.',
        examples: ['I am a student.', 'She is happy.', 'They are from Spain.', 'He is not at home.', 'Are you tired?'],
      },
      uk: {
        title: 'Дієслово "to be" (бути)',
        explanation:
          'Дієслово "to be" (am / is / are) — одна з перших тем в англійській мові. Використовуйте "am" з "I", "is" з "he / she / it" та одниною іменників, "are" з "you / we / they" та множиною. Воно вживається, щоб говорити про імена, професії, почуття та місцезнаходження. Для заперечення додайте "not" після дієслова. Для питання поставте дієслово перед підметом.',
        examples: ['I am a student.', 'She is happy.', 'They are from Spain.', 'He is not at home.', 'Are you tired?'],
      },
    },
    questions: [
      {
        question: 'I ___ a teacher.',
        options: ['is', 'am', 'are', 'be'],
        correctIndex: 1,
        explanation: 'Use "am" with the subject "I".',
      },
      {
        question: 'She ___ my sister.',
        options: ['am', 'are', 'is', 'be'],
        correctIndex: 2,
        explanation: 'Use "is" with "she" (third person singular).',
      },
      {
        question: 'We ___ from Italy.',
        options: ['is', 'am', 'are', 'be'],
        correctIndex: 2,
        explanation: 'Use "are" with "we".',
      },
      {
        question: 'He ___ not busy right now.',
        options: ['is', 'am', 'are', 'do'],
        correctIndex: 0,
        explanation: 'The negative is formed with "is not" for "he".',
      },
      {
        question: '___ you a doctor?',
        options: ['Is', 'Am', 'Are', 'Do'],
        correctIndex: 2,
        explanation: 'Questions put the verb "are" before "you".',
      },
    ],
  },
  {
    slug: 'a1-present-simple',
    level: 'A1',
    category: 'tenses',
    order: 2,
    content: {
      en: {
        title: 'Present Simple',
        explanation:
          'We use the present simple for habits, routines, facts, and things that are always true. With "I / you / we / they" the verb stays in its base form. With "he / she / it" we add "-s" or "-es" to the verb. To make negatives and questions, we use "do / does" plus "not". Present simple is often used with time words like "always", "usually", "every day", and "never".',
        examples: ['I play tennis on Sundays.', 'She works in a bank.', 'They do not like coffee.', 'Does he speak French?', 'Water boils at 100 degrees.'],
      },
      ru: {
        title: 'Present Simple (простое настоящее время)',
        explanation:
          'Present Simple используется для привычек, распорядка дня, фактов и вещей, которые всегда истинны. С "I / you / we / they" глагол остаётся в базовой форме. С "he / she / it" добавляется "-s" или "-es". Для отрицаний и вопросов используются "do / does" плюс "not". Present Simple часто употребляется со словами времени: "always", "usually", "every day", "never".',
        examples: ['I play tennis on Sundays.', 'She works in a bank.', 'They do not like coffee.', 'Does he speak French?', 'Water boils at 100 degrees.'],
      },
      uk: {
        title: 'Present Simple (простий теперішній час)',
        explanation:
          'Present Simple використовується для звичок, розпорядку дня, фактів і речей, які завжди правдиві. З "I / you / we / they" дієслово залишається в базовій формі. З "he / she / it" додається "-s" або "-es". Для заперечень і питань використовуються "do / does" плюс "not". Present Simple часто вживається зі словами часу: "always", "usually", "every day", "never".',
        examples: ['I play tennis on Sundays.', 'She works in a bank.', 'They do not like coffee.', 'Does he speak French?', 'Water boils at 100 degrees.'],
      },
    },
    questions: [
      {
        question: 'He ___ to work by bus every day.',
        options: ['go', 'goes', 'going', 'gone'],
        correctIndex: 1,
        explanation: 'Add "-es" to "go" for "he/she/it".',
      },
      {
        question: 'I ___ coffee in the morning.',
        options: ['drinks', 'drink', 'drinking', 'am drink'],
        correctIndex: 1,
        explanation: '"I" uses the base form of the verb.',
      },
      {
        question: 'She ___ not eat meat.',
        options: ['do', 'does', 'is', 'are'],
        correctIndex: 1,
        explanation: 'The negative for "she" is formed with "does not".',
      },
      {
        question: '___ they live in London?',
        options: ['Does', 'Is', 'Do', 'Are'],
        correctIndex: 2,
        explanation: 'Questions with "they" use "do".',
      },
      {
        question: 'My mother ___ dinner every evening.',
        options: ['cook', 'cooks', 'cooking', 'is cook'],
        correctIndex: 1,
        explanation: '"Mother" is third person singular, so add "-s".',
      },
    ],
  },
  {
    slug: 'a1-plurals-articles',
    level: 'A1',
    category: 'articles',
    order: 3,
    content: {
      en: {
        title: 'Plural Nouns and Articles A/An/The',
        explanation:
          'Most nouns add "-s" to become plural (book → books), but some are irregular (child → children, man → men). Use "a" before a consonant sound and "an" before a vowel sound for singular, countable nouns when mentioning something for the first time. Use "the" when both speaker and listener know exactly which thing is meant, or when there is only one of something.',
        examples: ['I have two cats.', 'There are three children in the garden.', 'She bought a book.', 'He ate an apple.', 'The sun is bright today.'],
      },
      ru: {
        title: 'Множественное число и артикли A/An/The',
        explanation:
          'Большинство существительных образуют множественное число с "-s" (book → books), но некоторые неправильные (child → children, man → men). Используйте "a" перед согласным звуком и "an" перед гласным звуком для исчисляемых существительных в единственном числе при первом упоминании. Используйте "the", когда и говорящий, и слушающий точно знают, о чём речь, или когда предмет единственный в своём роде.',
        examples: ['I have two cats.', 'There are three children in the garden.', 'She bought a book.', 'He ate an apple.', 'The sun is bright today.'],
      },
      uk: {
        title: 'Множина іменників та артиклі A/An/The',
        explanation:
          'Більшість іменників утворюють множину додаванням "-s" (book → books), але деякі є неправильними (child → children, man → men). Використовуйте "a" перед приголосним звуком і "an" перед голосним звуком для злічуваних іменників в однині при першій згадці. Використовуйте "the", коли і мовець, і слухач точно знають, про що йдеться, або коли предмет єдиний у своєму роді.',
        examples: ['I have two cats.', 'There are three children in the garden.', 'She bought a book.', 'He ate an apple.', 'The sun is bright today.'],
      },
    },
    questions: [
      {
        question: 'I have two ___.',
        options: ['book', 'books', 'a book', 'the book'],
        correctIndex: 1,
        explanation: 'Add "-s" to make "book" plural after "two".',
      },
      {
        question: 'There are five ___ in my class.',
        options: ['child', 'childs', 'children', 'childrens'],
        correctIndex: 2,
        explanation: '"Child" has the irregular plural form "children".',
      },
      {
        question: 'She has ___ orange for lunch.',
        options: ['a', 'an', 'the', 'no article'],
        correctIndex: 1,
        explanation: '"Orange" starts with a vowel sound, so we use "an".',
      },
      {
        question: 'Look at ___ moon tonight — it is so big!',
        options: ['a', 'an', 'the', 'no article'],
        correctIndex: 2,
        explanation: 'There is only one moon, so we use "the".',
      },
      {
        question: 'He works as ___ engineer.',
        options: ['a', 'an', 'the', 'no article'],
        correctIndex: 1,
        explanation: '"Engineer" begins with a vowel sound, so "an" is used.',
      },
    ],
  },
  {
    slug: 'a1-questions-word-order',
    level: 'A1',
    category: 'word-order',
    order: 4,
    content: {
      en: {
        title: 'Basic Questions and Word Order',
        explanation:
          'English word order in a statement is Subject + Verb + Object. To make a yes/no question, we often move the auxiliary verb (is, are, do, does) before the subject. Wh-questions start with a question word (what, where, who, when, why, how) followed by the auxiliary verb and then the subject. Getting the word order right is essential for being understood clearly in English.',
        examples: ['You are happy. → Are you happy?', 'She likes tea. → Does she like tea?', 'Where do you live?', 'What is your name?', 'How old are you?'],
      },
      ru: {
        title: 'Базовые вопросы и порядок слов',
        explanation:
          'Порядок слов в утвердительном предложении: подлежащее + глагол + дополнение. Чтобы задать общий вопрос, вспомогательный глагол (is, are, do, does) обычно ставится перед подлежащим. Специальные вопросы начинаются с вопросительного слова (what, where, who, when, why, how), затем идёт вспомогательный глагол и подлежащее. Правильный порядок слов очень важен для понятной речи на английском.',
        examples: ['You are happy. → Are you happy?', 'She likes tea. → Does she like tea?', 'Where do you live?', 'What is your name?', 'How old are you?'],
      },
      uk: {
        title: 'Базові питання та порядок слів',
        explanation:
          'Порядок слів у стверджувальному реченні: підмет + дієслово + додаток. Щоб поставити загальне питання, допоміжне дієслово (is, are, do, does) зазвичай ставиться перед підметом. Спеціальні питання починаються з питального слова (what, where, who, when, why, how), потім допоміжне дієслово і підмет. Правильний порядок слів дуже важливий для зрозумілого мовлення англійською.',
        examples: ['You are happy. → Are you happy?', 'She likes tea. → Does she like tea?', 'Where do you live?', 'What is your name?', 'How old are you?'],
      },
    },
    questions: [
      {
        question: 'Choose the correct question: "___ you like pizza?"',
        options: ['Do', 'Does', 'Are', 'Is'],
        correctIndex: 0,
        explanation: '"You" uses "do" to form a question.',
      },
      {
        question: '___ is your favorite color?',
        options: ['Who', 'What', 'Where', 'When'],
        correctIndex: 1,
        explanation: '"What" is used to ask about things like colors.',
      },
      {
        question: 'Choose the correctly ordered question.',
        options: ['Live where you do?', 'Where do you live?', 'You where live do?', 'Where you do live?'],
        correctIndex: 1,
        explanation: 'The correct order is: question word + auxiliary + subject + verb.',
      },
      {
        question: '___ old is your brother?',
        options: ['What', 'How', 'Who', 'Which'],
        correctIndex: 1,
        explanation: '"How old" is the fixed phrase used to ask about age.',
      },
      {
        question: 'Choose the correct question: "___ she a nurse?"',
        options: ['Do', 'Does', 'Is', 'Are'],
        correctIndex: 2,
        explanation: 'With "she" and the verb "to be", we use "Is" before the subject.',
      },
    ],
  },

  // ===== A2 =====
  {
    slug: 'a2-past-simple',
    level: 'A2',
    category: 'tenses',
    order: 5,
    content: {
      en: {
        title: 'Past Simple',
        explanation:
          'The past simple describes finished actions or situations in the past. Regular verbs add "-ed" (work → worked), while irregular verbs change form completely (go → went, see → saw). Negatives are formed with "did not" (didn\'t) plus the base verb, and questions use "did" plus the subject and base verb. The past simple is often used with time expressions like "yesterday", "last week", and "in 2010".',
        examples: ['I visited my grandmother yesterday.', 'They went to the beach last summer.', 'She did not call me.', 'Did you see that movie?', 'We lived in Paris in 2015.'],
      },
      ru: {
        title: 'Past Simple (простое прошедшее время)',
        explanation:
          'Past Simple описывает завершённые действия или ситуации в прошлом. Правильные глаголы добавляют "-ed" (work → worked), а неправильные меняют форму полностью (go → went, see → saw). Отрицания образуются с "did not" (didn\'t) плюс базовая форма глагола, а вопросы — с "did" плюс подлежащее и базовая форма. Past Simple часто используется со словами времени: "yesterday", "last week", "in 2010".',
        examples: ['I visited my grandmother yesterday.', 'They went to the beach last summer.', 'She did not call me.', 'Did you see that movie?', 'We lived in Paris in 2015.'],
      },
      uk: {
        title: 'Past Simple (простий минулий час)',
        explanation:
          'Past Simple описує завершені дії або ситуації в минулому. Правильні дієслова додають "-ed" (work → worked), а неправильні змінюють форму повністю (go → went, see → saw). Заперечення утворюються з "did not" (didn\'t) плюс базова форма дієслова, а питання — з "did" плюс підмет і базова форма. Past Simple часто вживається зі словами часу: "yesterday", "last week", "in 2010".',
        examples: ['I visited my grandmother yesterday.', 'They went to the beach last summer.', 'She did not call me.', 'Did you see that movie?', 'We lived in Paris in 2015.'],
      },
    },
    questions: [
      {
        question: 'She ___ to the party last night.',
        options: ['go', 'goes', 'went', 'going'],
        correctIndex: 2,
        explanation: '"Go" is irregular; its past form is "went".',
      },
      {
        question: 'We ___ football yesterday afternoon.',
        options: ['play', 'played', 'plays', 'playing'],
        correctIndex: 1,
        explanation: 'Regular verbs add "-ed" in the past simple.',
      },
      {
        question: 'He ___ not finish his homework.',
        options: ['do', 'does', 'did', 'was'],
        correctIndex: 2,
        explanation: 'The negative in past simple uses "did not".',
      },
      {
        question: '___ you watch the news yesterday?',
        options: ['Do', 'Does', 'Did', 'Are'],
        correctIndex: 2,
        explanation: 'Past simple questions are formed with "did".',
      },
      {
        question: 'I ___ my keys this morning, so I was late.',
        options: ['lose', 'loses', 'lost', 'losing'],
        correctIndex: 2,
        explanation: '"Lose" is irregular; its past form is "lost".',
      },
    ],
  },
  {
    slug: 'a2-comparatives-superlatives',
    level: 'A2',
    category: 'comparatives',
    order: 6,
    content: {
      en: {
        title: 'Comparatives and Superlatives',
        explanation:
          'We use comparatives to compare two things and superlatives to compare three or more things. Short adjectives (one syllable) add "-er" / "-est" (tall → taller → tallest). Longer adjectives use "more" / "the most" (expensive → more expensive → the most expensive). Some adjectives are irregular (good → better → best, bad → worse → worst). Comparatives are often followed by "than".',
        examples: ['This car is faster than that one.', 'She is the tallest student in the class.', 'This phone is more expensive than mine.', 'Today is worse than yesterday.', 'He is the best player on the team.'],
      },
      ru: {
        title: 'Сравнительная и превосходная степень',
        explanation:
          'Сравнительная степень используется для сравнения двух вещей, превосходная — для сравнения трёх и более. Короткие прилагательные (один слог) добавляют "-er" / "-est" (tall → taller → tallest). Длинные прилагательные используют "more" / "the most" (expensive → more expensive → the most expensive). Некоторые прилагательные неправильные (good → better → best, bad → worse → worst). После сравнительной степени часто идёт "than".',
        examples: ['This car is faster than that one.', 'She is the tallest student in the class.', 'This phone is more expensive than mine.', 'Today is worse than yesterday.', 'He is the best player on the team.'],
      },
      uk: {
        title: 'Ступені порівняння прикметників',
        explanation:
          'Вищий ступінь використовується для порівняння двох речей, найвищий — для порівняння трьох і більше. Короткі прикметники (один склад) додають "-er" / "-est" (tall → taller → tallest). Довгі прикметники використовують "more" / "the most" (expensive → more expensive → the most expensive). Деякі прикметники неправильні (good → better → best, bad → worse → worst). Після вищого ступеня часто йде "than".',
        examples: ['This car is faster than that one.', 'She is the tallest student in the class.', 'This phone is more expensive than mine.', 'Today is worse than yesterday.', 'He is the best player on the team.'],
      },
    },
    questions: [
      {
        question: 'This box is ___ than that one.',
        options: ['heavy', 'heavier', 'heaviest', 'more heavy'],
        correctIndex: 1,
        explanation: '"Heavy" is a short adjective, so it adds "-er".',
      },
      {
        question: 'She is ___ student in the school.',
        options: ['smart', 'smarter', 'the smartest', 'more smart'],
        correctIndex: 2,
        explanation: 'Superlative form with "the" is used to compare with the whole group.',
      },
      {
        question: 'This laptop is ___ than the old one.',
        options: ['expensiver', 'more expensive', 'most expensive', 'expensivest'],
        correctIndex: 1,
        explanation: 'Longer adjectives use "more" instead of "-er".',
      },
      {
        question: 'My cooking is ___ than my sister\'s.',
        options: ['bad', 'worse', 'worst', 'more bad'],
        correctIndex: 1,
        explanation: '"Bad" is irregular: bad → worse → worst.',
      },
      {
        question: 'This is ___ movie I have ever seen.',
        options: ['good', 'better', 'the best', 'more good'],
        correctIndex: 2,
        explanation: '"Good" is irregular: good → better → the best.',
      },
    ],
  },
  {
    slug: 'a2-going-to-future',
    level: 'A2',
    category: 'future',
    order: 7,
    content: {
      en: {
        title: '"Going to" Future',
        explanation:
          'We use "be going to" + base verb to talk about plans and intentions we have already decided on, and to make predictions based on present evidence. The structure is: subject + am/is/are + going to + verb. It differs from "will", which is often used for spontaneous decisions or promises. "Going to" is very common in everyday spoken English for talking about the near future.',
        examples: ['I am going to visit my aunt this weekend.', 'Look at those clouds — it is going to rain.', 'They are going to buy a new car.', 'She is not going to attend the meeting.', 'Are you going to study tonight?'],
      },
      ru: {
        title: 'Будущее время "going to"',
        explanation:
          'Конструкция "be going to" + базовый глагол используется для планов и намерений, которые уже решены, а также для предсказаний на основе текущих признаков. Структура: подлежащее + am/is/are + going to + глагол. Она отличается от "will", которое чаще используется для спонтанных решений или обещаний. "Going to" очень распространена в повседневной устной речи для разговора о ближайшем будущем.',
        examples: ['I am going to visit my aunt this weekend.', 'Look at those clouds — it is going to rain.', 'They are going to buy a new car.', 'She is not going to attend the meeting.', 'Are you going to study tonight?'],
      },
      uk: {
        title: 'Майбутній час "going to"',
        explanation:
          'Конструкція "be going to" + базове дієслово використовується для планів і намірів, які вже вирішені, а також для прогнозів на основі поточних ознак. Структура: підмет + am/is/are + going to + дієслово. Вона відрізняється від "will", яке частіше вживається для спонтанних рішень або обіцянок. "Going to" дуже поширена в повсякденному усному мовленні для розмови про найближче майбутнє.',
        examples: ['I am going to visit my aunt this weekend.', 'Look at those clouds — it is going to rain.', 'They are going to buy a new car.', 'She is not going to attend the meeting.', 'Are you going to study tonight?'],
      },
    },
    questions: [
      {
        question: 'We ___ going to travel to Greece next month.',
        options: ['am', 'is', 'are', 'be'],
        correctIndex: 2,
        explanation: '"We" takes "are" in the "going to" structure.',
      },
      {
        question: 'Look at the sky! It ___ going to rain.',
        options: ['am', 'is', 'are', 'was'],
        correctIndex: 1,
        explanation: '"It" takes "is" in the "going to" structure.',
      },
      {
        question: 'She is ___ going to start a new job.',
        options: ['no', 'not', 'don\'t', 'never'],
        correctIndex: 1,
        explanation: 'The negative is formed by adding "not" after the "be" verb.',
      },
      {
        question: '___ you going to come to the party?',
        options: ['Do', 'Does', 'Are', 'Is'],
        correctIndex: 2,
        explanation: 'Questions with "you" use "are" before the subject.',
      },
      {
        question: 'I have already decided: I ___ going to learn Spanish.',
        options: ['am', 'is', 'are', 'were'],
        correctIndex: 0,
        explanation: '"I" takes "am" in the "going to" structure.',
      },
    ],
  },
  {
    slug: 'a2-quantifiers',
    level: 'A2',
    category: 'quantifiers',
    order: 8,
    content: {
      en: {
        title: 'Some, Any, Much, Many',
        explanation:
          'We use "some" in positive sentences and offers, and "any" in negatives and questions. "Many" is used with plural countable nouns (many books), and "much" is used with uncountable nouns (much water). In informal speech, "a lot of" can replace both "many" and "much" in positive sentences. These words help us talk about quantities without giving an exact number.',
        examples: ['I have some apples.', 'Do you have any bread?', 'There are not many chairs.', 'She does not drink much coffee.', 'We have a lot of homework.'],
      },
      ru: {
        title: 'Some, Any, Much, Many',
        explanation:
          '"Some" используется в утвердительных предложениях и предложениях-просьбах, а "any" — в отрицаниях и вопросах. "Many" используется с исчисляемыми существительными во множественном числе (many books), а "much" — с неисчисляемыми (much water). В неформальной речи "a lot of" может заменить и "many", и "much" в утвердительных предложениях. Эти слова помогают говорить о количестве без точного числа.',
        examples: ['I have some apples.', 'Do you have any bread?', 'There are not many chairs.', 'She does not drink much coffee.', 'We have a lot of homework.'],
      },
      uk: {
        title: 'Some, Any, Much, Many',
        explanation:
          '"Some" використовується в стверджувальних реченнях і проханнях, а "any" — у запереченнях і питаннях. "Many" використовується зі злічуваними іменниками в множині (many books), а "much" — з незлічуваними (much water). У неформальному мовленні "a lot of" може замінити і "many", і "much" у стверджувальних реченнях. Ці слова допомагають говорити про кількість без точного числа.',
        examples: ['I have some apples.', 'Do you have any bread?', 'There are not many chairs.', 'She does not drink much coffee.', 'We have a lot of homework.'],
      },
    },
    questions: [
      {
        question: 'I would like ___ tea, please.',
        options: ['some', 'any', 'many', 'much'],
        correctIndex: 0,
        explanation: '"Some" is used in offers and polite requests.',
      },
      {
        question: 'Is there ___ sugar left in the jar?',
        options: ['some', 'any', 'many', 'much'],
        correctIndex: 1,
        explanation: '"Any" is used in questions.',
      },
      {
        question: 'There are not ___ people in the park today.',
        options: ['much', 'many', 'a', 'some'],
        correctIndex: 1,
        explanation: '"People" is a plural countable noun, so we use "many".',
      },
      {
        question: 'She does not have ___ time to relax.',
        options: ['many', 'much', 'some', 'a few'],
        correctIndex: 1,
        explanation: '"Time" is uncountable, so we use "much".',
      },
      {
        question: 'We have ___ friends in this city.',
        options: ['much', 'a lot of', 'any', 'less'],
        correctIndex: 1,
        explanation: '"A lot of" works with plural countable nouns in positive sentences.',
      },
    ],
  },

  // ===== B1 =====
  {
    slug: 'b1-present-perfect',
    level: 'B1',
    category: 'tenses',
    order: 9,
    content: {
      en: {
        title: 'Present Perfect',
        explanation:
          'The present perfect (have/has + past participle) connects the past to the present. We use it for experiences without a specific time ("I have visited Rome"), for actions that started in the past and continue now (often with "for" or "since"), and for recent actions with present relevance (often with "just", "already", "yet"). Unlike the past simple, present perfect does not use a specific finished time like "yesterday" or "in 2010".',
        examples: ['I have never eaten sushi.', 'She has lived here for ten years.', 'We have just finished dinner.', 'Have you already done your homework?', 'They have not arrived yet.'],
      },
      ru: {
        title: 'Present Perfect',
        explanation:
          'Present Perfect (have/has + причастие прошедшего времени) связывает прошлое с настоящим. Используется для опыта без конкретного времени ("I have visited Rome"), для действий, начавшихся в прошлом и продолжающихся сейчас (часто с "for" или "since"), и для недавних действий, важных для настоящего (часто с "just", "already", "yet"). В отличие от Past Simple, Present Perfect не используется с конкретным завершённым временем, например "yesterday" или "in 2010".',
        examples: ['I have never eaten sushi.', 'She has lived here for ten years.', 'We have just finished dinner.', 'Have you already done your homework?', 'They have not arrived yet.'],
      },
      uk: {
        title: 'Present Perfect',
        explanation:
          'Present Perfect (have/has + дієприкметник минулого часу) пов\'язує минуле з теперішнім. Використовується для досвіду без конкретного часу ("I have visited Rome"), для дій, що почалися в минулому і тривають зараз (часто з "for" або "since"), і для недавніх дій, важливих для теперішнього (часто з "just", "already", "yet"). На відміну від Past Simple, Present Perfect не вживається з конкретним завершеним часом, наприклад "yesterday" чи "in 2010".',
        examples: ['I have never eaten sushi.', 'She has lived here for ten years.', 'We have just finished dinner.', 'Have you already done your homework?', 'They have not arrived yet.'],
      },
    },
    questions: [
      {
        question: 'I ___ never ___ to Australia.',
        options: ['have / been', 'has / been', 'have / was', 'had / be'],
        correctIndex: 0,
        explanation: '"I" takes "have", and the past participle of "be" is "been".',
      },
      {
        question: 'She has lived in Berlin ___ 2018.',
        options: ['for', 'since', 'from', 'during'],
        correctIndex: 1,
        explanation: '"Since" is used with a specific starting point in time.',
      },
      {
        question: 'They ___ finished the project yet.',
        options: ['have not', 'did not', 'do not', 'has not'],
        correctIndex: 0,
        explanation: '"Yet" is typically used with present perfect negatives.',
      },
      {
        question: '___ you ever tried Thai food?',
        options: ['Do', 'Did', 'Have', 'Are'],
        correctIndex: 2,
        explanation: 'Experience questions without a specific time use present perfect.',
      },
      {
        question: 'We have ___ eaten lunch, so we are not hungry.',
        options: ['yet', 'ago', 'already', 'since'],
        correctIndex: 2,
        explanation: '"Already" is used to show something happened before now, often sooner than expected.',
      },
    ],
  },
  {
    slug: 'b1-first-conditional',
    level: 'B1',
    category: 'conditionals',
    order: 10,
    content: {
      en: {
        title: 'First Conditional',
        explanation:
          'The first conditional describes real and possible situations in the future. The structure is: If + present simple, ... will + base verb. It is used to talk about likely consequences of a possible future action. The "if" clause can come first or second in the sentence; when it comes first, we use a comma. We can also use modal verbs like "can", "might", or "should" instead of "will" in the main clause.',
        examples: ['If it rains, we will stay home.', 'She will pass the exam if she studies hard.', 'If you heat ice, it will melt.', 'If I have time, I might visit you.', 'You will feel better if you get some rest.'],
      },
      ru: {
        title: 'Первое условное предложение',
        explanation:
          'Первое условное предложение описывает реальные и возможные ситуации в будущем. Структура: If + present simple, ... will + базовый глагол. Используется для разговора о вероятных последствиях возможного будущего действия. Придаточное "if" может стоять в начале или в конце предложения; если оно в начале, ставится запятая. Вместо "will" в главном предложении можно использовать модальные глаголы, такие как "can", "might" или "should".',
        examples: ['If it rains, we will stay home.', 'She will pass the exam if she studies hard.', 'If you heat ice, it will melt.', 'If I have time, I might visit you.', 'You will feel better if you get some rest.'],
      },
      uk: {
        title: 'Перший тип умовних речень',
        explanation:
          'Перший тип умовних речень описує реальні й можливі ситуації в майбутньому. Структура: If + present simple, ... will + базове дієслово. Використовується для розмови про ймовірні наслідки можливої майбутньої дії. Підрядне речення з "if" може стояти на початку або в кінці речення; якщо воно на початку, ставиться кома. Замість "will" у головному реченні можна використовувати модальні дієслова, такі як "can", "might" або "should".',
        examples: ['If it rains, we will stay home.', 'She will pass the exam if she studies hard.', 'If you heat ice, it will melt.', 'If I have time, I might visit you.', 'You will feel better if you get some rest.'],
      },
    },
    questions: [
      {
        question: 'If she ___ hard, she will pass the test.',
        options: ['study', 'studies', 'will study', 'studied'],
        correctIndex: 1,
        explanation: 'The "if" clause uses present simple in the first conditional.',
      },
      {
        question: 'If it rains tomorrow, we ___ the trip.',
        options: ['cancel', 'will cancel', 'cancelled', 'canceling'],
        correctIndex: 1,
        explanation: 'The main clause uses "will" plus the base verb.',
      },
      {
        question: '___ you don\'t hurry, you will miss the bus.',
        options: ['If', 'Unless', 'When', 'Because'],
        correctIndex: 0,
        explanation: '"If" introduces the condition here.',
      },
      {
        question: 'She might come to the party if she ___ time.',
        options: ['has', 'have', 'will have', 'had'],
        correctIndex: 0,
        explanation: 'The "if" clause always uses present simple, not "will".',
      },
      {
        question: 'If you touch fire, you ___ burned.',
        options: ['get', 'will get', 'got', 'getting'],
        correctIndex: 1,
        explanation: 'The result clause uses "will" for a likely future consequence.',
      },
    ],
  },
  {
    slug: 'b1-second-conditional',
    level: 'B1',
    category: 'conditionals',
    order: 11,
    content: {
      en: {
        title: 'Second Conditional',
        explanation:
          'The second conditional talks about imaginary, unlikely, or impossible situations in the present or future. The structure is: If + past simple, ... would + base verb. Even though it uses a past tense form, it does not refer to the past — it refers to something unreal or hypothetical. With the verb "to be", we often use "were" for all subjects in formal English (If I were you...).',
        examples: ['If I won the lottery, I would travel the world.', 'If I were you, I would apologize.', 'She would be happier if she changed jobs.', 'What would you do if you saw a ghost?', 'If we had a car, we could go to the mountains.'],
      },
      ru: {
        title: 'Второе условное предложение',
        explanation:
          'Второе условное предложение говорит о воображаемых, маловероятных или невозможных ситуациях в настоящем или будущем. Структура: If + past simple, ... would + базовый глагол. Несмотря на использование прошедшего времени, оно не относится к прошлому — оно относится к нереальному или гипотетическому. С глаголом "to be" в формальном английском часто используется "were" для всех лиц (If I were you...).',
        examples: ['If I won the lottery, I would travel the world.', 'If I were you, I would apologize.', 'She would be happier if she changed jobs.', 'What would you do if you saw a ghost?', 'If we had a car, we could go to the mountains.'],
      },
      uk: {
        title: 'Другий тип умовних речень',
        explanation:
          'Другий тип умовних речень говорить про уявні, малоймовірні або неможливі ситуації в теперішньому чи майбутньому. Структура: If + past simple, ... would + базове дієслово. Незважаючи на використання минулого часу, воно не стосується минулого — воно стосується нереального чи гіпотетичного. З дієсловом "to be" у формальній англійській часто використовується "were" для всіх осіб (If I were you...).',
        examples: ['If I won the lottery, I would travel the world.', 'If I were you, I would apologize.', 'She would be happier if she changed jobs.', 'What would you do if you saw a ghost?', 'If we had a car, we could go to the mountains.'],
      },
    },
    questions: [
      {
        question: 'If I ___ more money, I would buy a new house.',
        options: ['have', 'had', 'has', 'will have'],
        correctIndex: 1,
        explanation: 'The "if" clause uses past simple in the second conditional.',
      },
      {
        question: 'If I were you, I ___ take that job.',
        options: ['will', 'would', 'do', 'am'],
        correctIndex: 1,
        explanation: 'The main clause uses "would" plus the base verb.',
      },
      {
        question: 'If she ___ taller, she would join the basketball team.',
        options: ['is', 'was', 'were', 'be'],
        correctIndex: 2,
        explanation: 'With "to be" in the second conditional, "were" is often used for all subjects.',
      },
      {
        question: 'What ___ you do if you found a wallet on the street?',
        options: ['will', 'would', 'do', 'did'],
        correctIndex: 1,
        explanation: 'Hypothetical questions in the second conditional use "would".',
      },
      {
        question: 'If they ___ harder, they would achieve their goals.',
        options: ['try', 'tries', 'tried', 'will try'],
        correctIndex: 2,
        explanation: 'The "if" clause requires the past simple form "tried".',
      },
    ],
  },
  {
    slug: 'b1-modals-obligation',
    level: 'B1',
    category: 'modals',
    order: 12,
    content: {
      en: {
        title: 'Modals of Obligation: Must, Have to, Should',
        explanation:
          '"Must" and "have to" express obligation, but "must" often comes from the speaker\'s own feeling (a rule they believe in), while "have to" often expresses an external rule or requirement. "Mustn\'t" means something is prohibited, while "don\'t have to" means something is not necessary. "Should" is weaker — it expresses advice or a recommendation, not a strict obligation.',
        examples: ['You must wear a seatbelt.', 'I have to finish this report by Friday.', 'You mustn\'t smoke here.', 'You don\'t have to come if you are busy.', 'You should drink more water.'],
      },
      ru: {
        title: 'Модальные глаголы обязанности: Must, Have to, Should',
        explanation:
          '"Must" и "have to" выражают обязанность, но "must" часто исходит из собственного убеждения говорящего (правило, в которое он верит), а "have to" часто выражает внешнее правило или требование. "Mustn\'t" означает, что что-то запрещено, а "don\'t have to" означает, что что-то не является необходимым. "Should" слабее — оно выражает совет или рекомендацию, а не строгую обязанность.',
        examples: ['You must wear a seatbelt.', 'I have to finish this report by Friday.', 'You mustn\'t smoke here.', 'You don\'t have to come if you are busy.', 'You should drink more water.'],
      },
      uk: {
        title: 'Модальні дієслова обов\'язку: Must, Have to, Should',
        explanation:
          '"Must" і "have to" виражають обов\'язок, але "must" часто походить із власного переконання мовця (правило, в яке він вірить), а "have to" часто виражає зовнішнє правило чи вимогу. "Mustn\'t" означає, що щось заборонено, а "don\'t have to" означає, що щось не є необхідним. "Should" слабше — воно виражає пораду чи рекомендацію, а не суворий обов\'язок.',
        examples: ['You must wear a seatbelt.', 'I have to finish this report by Friday.', 'You mustn\'t smoke here.', 'You don\'t have to come if you are busy.', 'You should drink more water.'],
      },
    },
    questions: [
      {
        question: 'You ___ show your passport at the airport. It\'s a rule.',
        options: ['must', 'should', 'could', 'might'],
        correctIndex: 0,
        explanation: '"Must" expresses a strong, rule-based obligation.',
      },
      {
        question: 'You ___ park here — it is forbidden.',
        options: ['don\'t have to', 'mustn\'t', 'should', 'can'],
        correctIndex: 1,
        explanation: '"Mustn\'t" expresses prohibition.',
      },
      {
        question: 'You ___ come to the meeting if you don\'t want to; it\'s optional.',
        options: ['mustn\'t', 'have to', 'don\'t have to', 'shouldn\'t'],
        correctIndex: 2,
        explanation: '"Don\'t have to" shows something is not necessary.',
      },
      {
        question: 'I think you ___ apologize to her — it would be the kind thing to do.',
        options: ['must', 'should', 'mustn\'t', 'don\'t have to'],
        correctIndex: 1,
        explanation: '"Should" gives advice rather than a strict obligation.',
      },
      {
        question: 'Employees ___ wear a uniform at this company. It is company policy.',
        options: ['should', 'have to', 'might', 'could'],
        correctIndex: 1,
        explanation: '"Have to" expresses an external rule imposed by the company.',
      },
    ],
  },

  // ===== B2 =====
  {
    slug: 'b2-passive-voice',
    level: 'B2',
    category: 'passive-voice',
    order: 13,
    content: {
      en: {
        title: 'Passive Voice',
        explanation:
          'We use the passive voice when the action is more important than who did it, or when the doer is unknown or unimportant. The structure is: subject + be (in the correct tense) + past participle. Compare "Someone built this house in 1990" (active) with "This house was built in 1990" (passive). The passive is common in formal writing, news reports, and scientific descriptions.',
        examples: ['The letter was sent yesterday.', 'This bridge was built in 1930.', 'English is spoken all over the world.', 'The report will be finished tomorrow.', 'Many trees have been planted this year.'],
      },
      ru: {
        title: 'Пассивный залог',
        explanation:
          'Пассивный залог используется, когда действие важнее, чем тот, кто его совершил, или когда исполнитель неизвестен либо неважен. Структура: подлежащее + be (в нужном времени) + причастие прошедшего времени. Сравните "Someone built this house in 1990" (активный) и "This house was built in 1990" (пассивный). Пассивный залог часто встречается в официальном письме, новостях и научных описаниях.',
        examples: ['The letter was sent yesterday.', 'This bridge was built in 1930.', 'English is spoken all over the world.', 'The report will be finished tomorrow.', 'Many trees have been planted this year.'],
      },
      uk: {
        title: 'Пасивний стан',
        explanation:
          'Пасивний стан використовується, коли дія важливіша за того, хто її виконав, або коли виконавець невідомий чи неважливий. Структура: підмет + be (у потрібному часі) + дієприкметник минулого часу. Порівняйте "Someone built this house in 1990" (активний) і "This house was built in 1990" (пасивний). Пасивний стан часто трапляється в офіційному письмі, новинах і наукових описах.',
        examples: ['The letter was sent yesterday.', 'This bridge was built in 1930.', 'English is spoken all over the world.', 'The report will be finished tomorrow.', 'Many trees have been planted this year.'],
      },
    },
    questions: [
      {
        question: 'This novel ___ by a famous author in 1920.',
        options: ['wrote', 'was written', 'has written', 'writes'],
        correctIndex: 1,
        explanation: 'Passive past simple: subject + was/were + past participle.',
      },
      {
        question: 'The new stadium ___ next year.',
        options: ['will build', 'will be built', 'is building', 'was built'],
        correctIndex: 1,
        explanation: 'Passive future: subject + will be + past participle.',
      },
      {
        question: 'Portuguese ___ in Brazil and Portugal.',
        options: ['speaks', 'is spoken', 'is speaking', 'spoke'],
        correctIndex: 1,
        explanation: 'Passive present simple: subject + is/are + past participle.',
      },
      {
        question: 'The documents ___ by the manager yet.',
        options: ['haven\'t signed', 'haven\'t been signed', 'didn\'t sign', 'aren\'t signing'],
        correctIndex: 1,
        explanation: 'Passive present perfect: subject + have/has been + past participle.',
      },
      {
        question: 'My car ___ while I was on holiday.',
        options: ['was stolen', 'stole', 'has stolen', 'steals'],
        correctIndex: 0,
        explanation: 'Passive past simple describes the action happening to the subject.',
      },
    ],
  },
  {
    slug: 'b2-reported-speech',
    level: 'B2',
    category: 'reported-speech',
    order: 14,
    content: {
      en: {
        title: 'Reported Speech',
        explanation:
          'Reported speech is used to tell someone what another person said, without quoting their exact words. When the reporting verb is in the past ("said", "told"), the tense in the reported clause usually shifts back: present simple → past simple, present perfect → past perfect, "will" → "would". Pronouns and time/place expressions often change too (today → that day, here → there).',
        examples: ['"I am tired," she said. → She said she was tired.', '"I will call you," he said. → He said he would call me.', '"We have finished," they said. → They said they had finished.', '"I saw him yesterday," she said. → She said she had seen him the day before.', 'He asked me where I lived.'],
      },
      ru: {
        title: 'Косвенная речь',
        explanation:
          'Косвенная речь используется, чтобы передать слова другого человека, не цитируя их дословно. Когда глагол сообщения стоит в прошедшем времени ("said", "told"), время в придаточном предложении обычно сдвигается назад: present simple → past simple, present perfect → past perfect, "will" → "would". Местоимения и выражения времени/места также часто меняются (today → that day, here → there).',
        examples: ['"I am tired," she said. → She said she was tired.', '"I will call you," he said. → He said he would call me.', '"We have finished," they said. → They said they had finished.', '"I saw him yesterday," she said. → She said she had seen him the day before.', 'He asked me where I lived.'],
      },
      uk: {
        title: 'Непряма мова',
        explanation:
          'Непряма мова використовується, щоб передати слова іншої людини, не цитуючи їх дослівно. Коли дієслово повідомлення стоїть у минулому часі ("said", "told"), час у підрядному реченні зазвичай зсувається назад: present simple → past simple, present perfect → past perfect, "will" → "would". Займенники та вирази часу/місця також часто змінюються (today → that day, here → there).',
        examples: ['"I am tired," she said. → She said she was tired.', '"I will call you," he said. → He said he would call me.', '"We have finished," they said. → They said they had finished.', '"I saw him yesterday," she said. → She said she had seen him the day before.', 'He asked me where I lived.'],
      },
    },
    questions: [
      {
        question: '"I am busy," she said. → She said she ___ busy.',
        options: ['is', 'was', 'has been', 'be'],
        correctIndex: 1,
        explanation: 'Present simple shifts back to past simple in reported speech.',
      },
      {
        question: '"I will help you," he said. → He said he ___ help me.',
        options: ['will', 'would', 'can', 'shall'],
        correctIndex: 1,
        explanation: '"Will" shifts back to "would".',
      },
      {
        question: '"We have already eaten," they said. → They said they ___ already eaten.',
        options: ['have', 'has', 'had', 'having'],
        correctIndex: 2,
        explanation: 'Present perfect shifts back to past perfect.',
      },
      {
        question: '"I am going to Paris tomorrow," she said. → She said she was going to Paris ___.',
        options: ['tomorrow', 'the next day', 'yesterday', 'today'],
        correctIndex: 1,
        explanation: '"Tomorrow" changes to "the next day" in reported speech.',
      },
      {
        question: '"Where do you live?" he asked me. → He asked me where I ___.',
        options: ['live', 'lived', 'am living', 'have lived'],
        correctIndex: 1,
        explanation: 'Reported questions also shift tenses back: present simple → past simple.',
      },
    ],
  },
  {
    slug: 'b2-third-conditional',
    level: 'B2',
    category: 'conditionals',
    order: 15,
    content: {
      en: {
        title: 'Third Conditional',
        explanation:
          'The third conditional talks about imaginary situations in the past — things that did not actually happen, and their imagined results. The structure is: If + past perfect, ... would have + past participle. It is often used to express regret or to imagine how the past could have been different. Both clauses refer to unreal past events.',
        examples: ['If I had studied harder, I would have passed the exam.', 'She would have called you if she had known your number.', 'If we had left earlier, we would not have missed the train.', 'They would have won if they had played better.', 'I wouldn\'t have been late if the bus had arrived on time.'],
      },
      ru: {
        title: 'Третье условное предложение',
        explanation:
          'Третье условное предложение говорит о воображаемых ситуациях в прошлом — о том, что на самом деле не произошло, и о воображаемых последствиях. Структура: If + past perfect, ... would have + причастие прошедшего времени. Оно часто используется для выражения сожаления или для того, чтобы представить, как прошлое могло бы быть иным. Оба придаточных относятся к нереальным прошлым событиям.',
        examples: ['If I had studied harder, I would have passed the exam.', 'She would have called you if she had known your number.', 'If we had left earlier, we would not have missed the train.', 'They would have won if they had played better.', 'I wouldn\'t have been late if the bus had arrived on time.'],
      },
      uk: {
        title: 'Третій тип умовних речень',
        explanation:
          'Третій тип умовних речень говорить про уявні ситуації в минулому — про те, що насправді не сталося, та про уявні наслідки. Структура: If + past perfect, ... would have + дієприкметник минулого часу. Він часто використовується для вираження жалю або щоб уявити, як минуле могло би бути іншим. Обидва підрядні речення стосуються нереальних минулих подій.',
        examples: ['If I had studied harder, I would have passed the exam.', 'She would have called you if she had known your number.', 'If we had left earlier, we would not have missed the train.', 'They would have won if they had played better.', 'I wouldn\'t have been late if the bus had arrived on time.'],
      },
    },
    questions: [
      {
        question: 'If I ___ known about the meeting, I would have attended.',
        options: ['have', 'had', 'has', 'would have'],
        correctIndex: 1,
        explanation: 'The "if" clause uses past perfect in the third conditional.',
      },
      {
        question: 'She would have passed the exam if she ___ harder.',
        options: ['studied', 'had studied', 'studies', 'would study'],
        correctIndex: 1,
        explanation: 'Past perfect "had studied" is required in the "if" clause.',
      },
      {
        question: 'If they had left earlier, they ___ the flight.',
        options: ['would catch', 'would have caught', 'caught', 'had caught'],
        correctIndex: 1,
        explanation: 'The main clause uses "would have" plus past participle.',
      },
      {
        question: 'I ___ have called you if I had had your number.',
        options: ['will', 'would', 'was', 'did'],
        correctIndex: 1,
        explanation: 'The main clause uses "would have" for the imagined past result.',
      },
      {
        question: 'If she hadn\'t missed the bus, she ___ late for work.',
        options: ['wouldn\'t be', 'wouldn\'t have been', 'isn\'t', 'hadn\'t been'],
        correctIndex: 1,
        explanation: 'A pure third conditional keeps "would have been" in the result clause.',
      },
    ],
  },
  {
    slug: 'b2-relative-clauses',
    level: 'B2',
    category: 'relative-clauses',
    order: 16,
    content: {
      en: {
        title: 'Relative Clauses',
        explanation:
          'Relative clauses give extra information about a noun using relative pronouns: "who" (people), "which" (things), "that" (people or things, mainly in defining clauses), "whose" (possession), and "where" (places). Defining relative clauses give essential information and use no commas. Non-defining relative clauses give extra, non-essential information and are separated by commas.',
        examples: ['The woman who lives next door is a doctor.', 'This is the book that I told you about.', 'The car, which was very old, broke down.', 'I know a man whose son is a famous singer.', 'That is the café where we first met.'],
      },
      ru: {
        title: 'Относительные придаточные предложения',
        explanation:
          'Относительные придаточные предложения дают дополнительную информацию о существительном с помощью относительных местоимений: "who" (люди), "which" (вещи), "that" (люди или вещи, в основном в ограничительных придаточных), "whose" (принадлежность) и "where" (места). Ограничительные придаточные дают важную информацию и не выделяются запятыми. Неограничительные придаточные дают дополнительную, второстепенную информацию и выделяются запятыми.',
        examples: ['The woman who lives next door is a doctor.', 'This is the book that I told you about.', 'The car, which was very old, broke down.', 'I know a man whose son is a famous singer.', 'That is the café where we first met.'],
      },
      uk: {
        title: 'Підрядні означальні речення',
        explanation:
          'Підрядні означальні речення дають додаткову інформацію про іменник за допомогою відносних займенників: "who" (люди), "which" (речі), "that" (люди або речі, переважно в обмежувальних підрядних), "whose" (приналежність) та "where" (місця). Обмежувальні підрядні дають важливу інформацію і не виділяються комами. Необмежувальні підрядні дають додаткову, другорядну інформацію і виділяються комами.',
        examples: ['The woman who lives next door is a doctor.', 'This is the book that I told you about.', 'The car, which was very old, broke down.', 'I know a man whose son is a famous singer.', 'That is the café where we first met.'],
      },
    },
    questions: [
      {
        question: 'The man ___ helped me yesterday is my neighbor.',
        options: ['which', 'who', 'whose', 'where'],
        correctIndex: 1,
        explanation: '"Who" refers to people as the subject of the clause.',
      },
      {
        question: 'This is the house ___ I grew up.',
        options: ['which', 'who', 'where', 'whose'],
        correctIndex: 2,
        explanation: '"Where" is used to refer to a place.',
      },
      {
        question: 'I have a friend ___ brother is a famous actor.',
        options: ['who', 'which', 'whose', 'that'],
        correctIndex: 2,
        explanation: '"Whose" shows possession.',
      },
      {
        question: 'The book, ___ was published last year, became a bestseller.',
        options: ['that', 'which', 'who', 'whose'],
        correctIndex: 1,
        explanation: 'Non-defining clauses (with commas) use "which", not "that".',
      },
      {
        question: 'She is the person ___ I told you about.',
        options: ['whose', 'where', 'that', 'when'],
        correctIndex: 2,
        explanation: '"That" can refer to people in defining relative clauses.',
      },
    ],
  },

  // ===== C1 =====
  {
    slug: 'c1-mixed-conditionals',
    level: 'C1',
    category: 'conditionals',
    order: 17,
    content: {
      en: {
        title: 'Mixed Conditionals',
        explanation:
          'Mixed conditionals combine different time frames within one sentence, usually a past condition with a present result, or a present condition with a past result. Type 1: If + past perfect, ... would + base verb (a past action affecting the present). Type 2: If + past simple, ... would have + past participle (a permanent present state affecting a past event). These structures let us express nuanced, realistic connections between different time periods.',
        examples: ['If I had taken that job, I would be rich now.', 'If she were more organized, she would have finished the project on time.', 'If he hadn\'t missed the flight, he would be at the conference now.', 'If I weren\'t so busy, I would have joined you yesterday.', 'If they had invested wisely, they would be financially secure today.'],
      },
      ru: {
        title: 'Смешанные условные предложения',
        explanation:
          'Смешанные условные предложения объединяют разные временные рамки в одном предложении, обычно прошлое условие с настоящим результатом или настоящее условие с прошлым результатом. Тип 1: If + past perfect, ... would + базовый глагол (прошлое действие, влияющее на настоящее). Тип 2: If + past simple, ... would have + причастие прошедшего времени (постоянное состояние настоящего, повлиявшее на прошлое событие). Эти конструкции позволяют выразить тонкие, реалистичные связи между разными периодами времени.',
        examples: ['If I had taken that job, I would be rich now.', 'If she were more organized, she would have finished the project on time.', 'If he hadn\'t missed the flight, he would be at the conference now.', 'If I weren\'t so busy, I would have joined you yesterday.', 'If they had invested wisely, they would be financially secure today.'],
      },
      uk: {
        title: 'Змішані умовні речення',
        explanation:
          'Змішані умовні речення поєднують різні часові рамки в одному реченні, зазвичай минулу умову з теперішнім результатом або теперішню умову з минулим результатом. Тип 1: If + past perfect, ... would + базове дієслово (минула дія, що впливає на теперішнє). Тип 2: If + past simple, ... would have + дієприкметник минулого часу (постійний теперішній стан, що вплинув на минулу подію). Ці конструкції дозволяють виразити тонкі, реалістичні зв\'язки між різними періодами часу.',
        examples: ['If I had taken that job, I would be rich now.', 'If she were more organized, she would have finished the project on time.', 'If he hadn\'t missed the flight, he would be at the conference now.', 'If I weren\'t so busy, I would have joined you yesterday.', 'If they had invested wisely, they would be financially secure today.'],
      },
    },
    questions: [
      {
        question: 'If I ___ that offer, I would be working in Paris now.',
        options: ['accepted', 'had accepted', 'accept', 'would accept'],
        correctIndex: 1,
        explanation: 'The past condition uses past perfect, affecting a present result.',
      },
      {
        question: 'If he were more careful, he ___ the accident yesterday.',
        options: ['wouldn\'t have', 'wouldn\'t have had', 'doesn\'t have', 'hadn\'t had'],
        correctIndex: 1,
        explanation: 'A permanent present characteristic affects a past event, so we use "would have had".',
      },
      {
        question: 'If she hadn\'t left her job, she ___ so stressed right now.',
        options: ['isn\'t', 'wasn\'t', 'wouldn\'t be', 'wouldn\'t have been'],
        correctIndex: 2,
        explanation: 'A past condition (didn\'t leave) affects a present state, so "wouldn\'t be" is used.',
      },
      {
        question: 'If I weren\'t so afraid of flying, I ___ to Japan last year.',
        options: ['would go', 'would have gone', 'went', 'had gone'],
        correctIndex: 1,
        explanation: 'A present characteristic (fear of flying) affects a past decision, so "would have gone" is used.',
      },
      {
        question: 'If they had planned better, the event ___ a success today.',
        options: ['is', 'was', 'would be', 'would have been'],
        correctIndex: 2,
        explanation: 'A past action affects a present result, so "would be" is correct.',
      },
    ],
  },
  {
    slug: 'c1-inversion',
    level: 'C1',
    category: 'inversion',
    order: 18,
    content: {
      en: {
        title: 'Inversion for Emphasis',
        explanation:
          'Inversion means reversing the normal subject-verb word order, usually after a negative or limiting adverbial placed at the start of a sentence, to create a more formal or emphatic effect. Common triggers include "never", "rarely", "not only", "no sooner", "hardly", and conditional inversions like "Had I known" (instead of "If I had known"). After the trigger, an auxiliary verb comes before the subject.',
        examples: ['Never have I seen such a beautiful sunset.', 'Not only did she win the race, but she also broke the record.', 'Rarely do we see such dedication.', 'Had I known the truth, I would have acted differently.', 'No sooner had we arrived than it started to rain.'],
      },
      ru: {
        title: 'Инверсия для выразительности',
        explanation:
          'Инверсия означает обратный порядок слов подлежащего и сказуемого, обычно после отрицательного или ограничивающего наречия в начале предложения, чтобы создать более формальный или выразительный эффект. Частые триггеры: "never", "rarely", "not only", "no sooner", "hardly", а также условная инверсия типа "Had I known" (вместо "If I had known"). После триггера вспомогательный глагол ставится перед подлежащим.',
        examples: ['Never have I seen such a beautiful sunset.', 'Not only did she win the race, but she also broke the record.', 'Rarely do we see such dedication.', 'Had I known the truth, I would have acted differently.', 'No sooner had we arrived than it started to rain.'],
      },
      uk: {
        title: 'Інверсія для виразності',
        explanation:
          'Інверсія означає зворотний порядок слів підмета і присудка, зазвичай після заперечного чи обмежувального прислівника на початку речення, щоб створити більш формальний або виразний ефект. Часті тригери: "never", "rarely", "not only", "no sooner", "hardly", а також умовна інверсія на кшталт "Had I known" (замість "If I had known"). Після тригера допоміжне дієслово ставиться перед підметом.',
        examples: ['Never have I seen such a beautiful sunset.', 'Not only did she win the race, but she also broke the record.', 'Rarely do we see such dedication.', 'Had I known the truth, I would have acted differently.', 'No sooner had we arrived than it started to rain.'],
      },
    },
    questions: [
      {
        question: 'Never ___ such a difficult exam before.',
        options: ['I have seen', 'have I seen', 'I saw', 'did I see'],
        correctIndex: 1,
        explanation: 'After "never" at the start, the auxiliary "have" comes before the subject.',
      },
      {
        question: 'Not only ___ late, but he also forgot the documents.',
        options: ['he was', 'was he', 'he did', 'did he'],
        correctIndex: 1,
        explanation: 'After "not only", inversion places "was" before "he".',
      },
      {
        question: '___ known about the storm, we would have cancelled the trip.',
        options: ['If we had', 'Had we', 'We had', 'We would have'],
        correctIndex: 1,
        explanation: '"Had we known" is an inverted form of "If we had known".',
      },
      {
        question: 'Rarely ___ such generosity from a stranger.',
        options: ['we see', 'do we see', 'we saw', 'did we saw'],
        correctIndex: 1,
        explanation: 'After "rarely", the auxiliary "do" is used before the subject.',
      },
      {
        question: 'No sooner ___ than the phone rang.',
        options: ['I sat down', 'had I sat down', 'I had sat down', 'did I sit down'],
        correctIndex: 1,
        explanation: '"No sooner" triggers inversion with past perfect: "had I sat down".',
      },
    ],
  },
  {
    slug: 'c1-cleft-sentences',
    level: 'C1',
    category: 'emphasis',
    order: 19,
    content: {
      en: {
        title: 'Cleft Sentences',
        explanation:
          'Cleft sentences split a single idea into two clauses to emphasize a particular part of the sentence. "It" clefts use the pattern "It was/is + [emphasized element] + that/who ...". "What" clefts use the pattern "What + clause + is/was + [emphasized element]". These structures are especially useful in writing and speech to draw attention to what matters most in a sentence.',
        examples: ['It was Maria who solved the problem.', 'It was on Friday that we signed the contract.', 'What I need is a good night\'s sleep.', 'What surprised me most was his honesty.', 'It is hard work that leads to success.'],
      },
      ru: {
        title: 'Расщеплённые предложения (Cleft Sentences)',
        explanation:
          'Расщеплённые предложения разделяют одну идею на два придаточных, чтобы выделить определённую часть предложения. Конструкции с "It" используют модель "It was/is + [выделяемый элемент] + that/who ...". Конструкции с "What" используют модель "What + придаточное + is/was + [выделяемый элемент]". Эти конструкции особенно полезны в письме и речи, чтобы привлечь внимание к самому важному в предложении.',
        examples: ['It was Maria who solved the problem.', 'It was on Friday that we signed the contract.', 'What I need is a good night\'s sleep.', 'What surprised me most was his honesty.', 'It is hard work that leads to success.'],
      },
      uk: {
        title: 'Розщеплені речення (Cleft Sentences)',
        explanation:
          'Розщеплені речення розділяють одну ідею на два підрядних, щоб виділити певну частину речення. Конструкції з "It" використовують модель "It was/is + [виділюваний елемент] + that/who ...". Конструкції з "What" використовують модель "What + підрядне + is/was + [виділюваний елемент]". Ці конструкції особливо корисні в письмі та мовленні, щоб привернути увагу до найважливішого в реченні.',
        examples: ['It was Maria who solved the problem.', 'It was on Friday that we signed the contract.', 'What I need is a good night\'s sleep.', 'What surprised me most was his honesty.', 'It is hard work that leads to success.'],
      },
    },
    questions: [
      {
        question: '___ was Tom who broke the vase, not his sister.',
        options: ['This', 'It', 'That', 'He'],
        correctIndex: 1,
        explanation: '"It" clefts start with "It was/is" to emphasize a specific element.',
      },
      {
        question: 'What I really need ___ some peace and quiet.',
        options: ['am', 'is', 'are', 'be'],
        correctIndex: 1,
        explanation: '"What" clefts use "is/was" to link to the emphasized element.',
      },
      {
        question: 'It was the manager ___ made the final decision.',
        options: ['which', 'who', 'whom', 'whose'],
        correctIndex: 1,
        explanation: 'For people, "It was ... who" is used in cleft sentences.',
      },
      {
        question: '___ surprised everyone was how calm she remained.',
        options: ['It', 'What', 'That', 'This'],
        correctIndex: 1,
        explanation: '"What" clefts begin with "What" followed by a clause.',
      },
      {
        question: 'It was in 2019 ___ the company was founded.',
        options: ['who', 'which', 'that', 'when'],
        correctIndex: 2,
        explanation: '"It was ... that" emphasizes a time expression in a cleft sentence.',
      },
    ],
  },
  {
    slug: 'c1-advanced-modals',
    level: 'C1',
    category: 'modals',
    order: 20,
    content: {
      en: {
        title: 'Advanced Modals: Speculation and Deduction',
        explanation:
          'Modal verbs combined with "have + past participle" let us speculate about the past. "Must have" expresses a confident conclusion, "might/could have" expresses a possibility, and "can\'t/couldn\'t have" expresses a confident negative conclusion. "Needn\'t have" means an action was done but was unnecessary, while "shouldn\'t have" expresses criticism of a past action that did happen.',
        examples: ['She must have left already; her coat is gone.', 'He might have forgotten about the meeting.', 'They can\'t have arrived yet — it\'s too early.', 'You needn\'t have bought a gift; it wasn\'t necessary.', 'You shouldn\'t have shouted at him.'],
      },
      ru: {
        title: 'Продвинутые модальные глаголы: предположение и вывод',
        explanation:
          'Модальные глаголы в сочетании с "have + причастие прошедшего времени" позволяют делать предположения о прошлом. "Must have" выражает уверенный вывод, "might/could have" выражает возможность, а "can\'t/couldn\'t have" выражает уверенный отрицательный вывод. "Needn\'t have" означает, что действие было выполнено, но было ненужным, а "shouldn\'t have" выражает критику совершённого прошлого действия.',
        examples: ['She must have left already; her coat is gone.', 'He might have forgotten about the meeting.', 'They can\'t have arrived yet — it\'s too early.', 'You needn\'t have bought a gift; it wasn\'t necessary.', 'You shouldn\'t have shouted at him.'],
      },
      uk: {
        title: 'Просунуті модальні дієслова: припущення та висновок',
        explanation:
          'Модальні дієслова в поєднанні з "have + дієприкметник минулого часу" дозволяють робити припущення про минуле. "Must have" виражає впевнений висновок, "might/could have" виражає можливість, а "can\'t/couldn\'t have" виражає впевнений заперечний висновок. "Needn\'t have" означає, що дія була виконана, але була непотрібною, а "shouldn\'t have" виражає критику здійсненої минулої дії.',
        examples: ['She must have left already; her coat is gone.', 'He might have forgotten about the meeting.', 'They can\'t have arrived yet — it\'s too early.', 'You needn\'t have bought a gift; it wasn\'t necessary.', 'You shouldn\'t have shouted at him.'],
      },
    },
    questions: [
      {
        question: 'The lights are off. They ___ gone out already.',
        options: ['must have', 'can\'t have', 'needn\'t have', 'should have'],
        correctIndex: 0,
        explanation: '"Must have" shows a confident conclusion based on evidence.',
      },
      {
        question: 'He ___ seen the email; he never mentioned it and never replied.',
        options: ['must have', 'can\'t have', 'should have', 'needn\'t have'],
        correctIndex: 1,
        explanation: '"Can\'t have" expresses a confident negative conclusion.',
      },
      {
        question: 'You ___ brought an umbrella; it didn\'t rain at all.',
        options: ['must have', 'shouldn\'t have', 'needn\'t have', 'can\'t have'],
        correctIndex: 2,
        explanation: '"Needn\'t have" shows the action happened but was not necessary.',
      },
      {
        question: 'I ___ forgotten my keys — I can\'t find them anywhere.',
        options: ['must have', 'needn\'t have', 'shouldn\'t have', 'can\'t have'],
        correctIndex: 0,
        explanation: '"Must have" expresses a strong deduction about a past event.',
      },
      {
        question: 'You ___ spoken to her like that; it really hurt her feelings.',
        options: ['must have', 'shouldn\'t have', 'needn\'t have', 'might have'],
        correctIndex: 1,
        explanation: '"Shouldn\'t have" criticizes a past action that did happen.',
      },
    ],
  },

  // ===== C2 =====
  {
    slug: 'c2-subjunctive-mood',
    level: 'C2',
    category: 'subjunctive',
    order: 21,
    content: {
      en: {
        title: 'The Subjunctive Mood',
        explanation:
          'The subjunctive mood uses the base form of the verb regardless of subject, and it appears after certain verbs and expressions of demand, suggestion, or necessity, such as "insist", "suggest", "recommend", "demand", and "it is essential/important that". This form is more common in formal and American English. The subjunctive is also used in fixed expressions like "If I were" and "So be it".',
        examples: ['The doctor recommended that he rest for a week.', 'It is essential that everyone be on time.', 'She insisted that he apologize immediately.', 'The committee demanded that the report be revised.', 'If I were in your position, I would resign.'],
      },
      ru: {
        title: 'Сослагательное наклонение',
        explanation:
          'Сослагательное наклонение использует базовую форму глагола независимо от подлежащего и появляется после определённых глаголов и выражений требования, предложения или необходимости, таких как "insist", "suggest", "recommend", "demand" и "it is essential/important that". Эта форма чаще встречается в формальном и американском английском. Сослагательное наклонение также используется в устойчивых выражениях, таких как "If I were" и "So be it".',
        examples: ['The doctor recommended that he rest for a week.', 'It is essential that everyone be on time.', 'She insisted that he apologize immediately.', 'The committee demanded that the report be revised.', 'If I were in your position, I would resign.'],
      },
      uk: {
        title: 'Умовний спосіб (Subjunctive Mood)',
        explanation:
          'Умовний спосіб використовує базову форму дієслова незалежно від підмета і з\'являється після певних дієслів і виразів вимоги, пропозиції чи необхідності, таких як "insist", "suggest", "recommend", "demand" та "it is essential/important that". Ця форма частіше трапляється у формальній і американській англійській. Умовний спосіб також використовується у сталих виразах, таких як "If I were" та "So be it".',
        examples: ['The doctor recommended that he rest for a week.', 'It is essential that everyone be on time.', 'She insisted that he apologize immediately.', 'The committee demanded that the report be revised.', 'If I were in your position, I would resign.'],
      },
    },
    questions: [
      {
        question: 'The manager insists that everyone ___ on time.',
        options: ['is', 'be', 'was', 'being'],
        correctIndex: 1,
        explanation: 'After "insist that", the subjunctive uses the base form "be".',
      },
      {
        question: 'It is important that she ___ informed of the changes.',
        options: ['is', 'was', 'be', 'being'],
        correctIndex: 2,
        explanation: '"It is important that" triggers the subjunctive base form "be".',
      },
      {
        question: 'The lawyer recommended that he ___ the contract carefully.',
        options: ['reads', 'read', 'reading', 'to read'],
        correctIndex: 1,
        explanation: 'After "recommend that", the subjunctive base form is used regardless of subject.',
      },
      {
        question: 'The board demanded that the CEO ___ immediately.',
        options: ['resigns', 'resign', 'resigned', 'resigning'],
        correctIndex: 1,
        explanation: '"Demand that" is followed by the subjunctive base form.',
      },
      {
        question: 'If I ___ you, I would reconsider that decision.',
        options: ['am', 'was', 'were', 'be'],
        correctIndex: 2,
        explanation: '"If I were" is the fixed subjunctive form used for hypothetical advice.',
      },
    ],
  },
  {
    slug: 'c2-discourse-markers',
    level: 'C2',
    category: 'discourse-markers',
    order: 22,
    content: {
      en: {
        title: 'Nuanced Discourse Markers',
        explanation:
          'Advanced discourse markers help writers and speakers signal subtle logical relationships between ideas: concession ("granted", "admittedly"), contrast ("whereas", "that said"), consequence ("consequently", "as a result"), and addition ("furthermore", "moreover"). Choosing precisely the right marker communicates the exact relationship intended and marks a speaker as highly fluent, so these words should not be used interchangeably despite loosely overlapping meanings.',
        examples: ['Admittedly, the plan has flaws, but it is still our best option.', 'The results were promising; consequently, funding was extended.', 'That said, we should proceed with caution.', 'Furthermore, the study did not account for external variables.', 'Granted, mistakes were made, yet the project ultimately succeeded.'],
      },
      ru: {
        title: 'Тонкие дискурсивные маркеры',
        explanation:
          'Продвинутые дискурсивные маркеры помогают писателям и говорящим обозначить тонкие логические связи между идеями: уступка ("granted", "admittedly"), контраст ("whereas", "that said"), следствие ("consequently", "as a result") и добавление ("furthermore", "moreover"). Выбор точно подходящего маркера передаёт именно ту связь, которая имеется в виду, и указывает на высокий уровень владения языком, поэтому эти слова нельзя использовать взаимозаменяемо, несмотря на частично совпадающие значения.',
        examples: ['Admittedly, the plan has flaws, but it is still our best option.', 'The results were promising; consequently, funding was extended.', 'That said, we should proceed with caution.', 'Furthermore, the study did not account for external variables.', 'Granted, mistakes were made, yet the project ultimately succeeded.'],
      },
      uk: {
        title: 'Тонкі дискурсивні маркери',
        explanation:
          'Просунуті дискурсивні маркери допомагають авторам і мовцям позначати тонкі логічні зв\'язки між ідеями: поступка ("granted", "admittedly"), контраст ("whereas", "that said"), наслідок ("consequently", "as a result") та додавання ("furthermore", "moreover"). Вибір саме потрібного маркера передає точно той зв\'язок, який мається на увазі, і свідчить про високий рівень володіння мовою, тому ці слова не можна використовувати взаємозамінно, попри частково подібні значення.',
        examples: ['Admittedly, the plan has flaws, but it is still our best option.', 'The results were promising; consequently, funding was extended.', 'That said, we should proceed with caution.', 'Furthermore, the study did not account for external variables.', 'Granted, mistakes were made, yet the project ultimately succeeded.'],
      },
    },
    questions: [
      {
        question: 'The project was over budget; ___, the client remained satisfied.',
        options: ['consequently', 'nevertheless', 'furthermore', 'therefore'],
        correctIndex: 1,
        explanation: '"Nevertheless" signals contrast between the two facts.',
      },
      {
        question: '___, the theory has some merit, but it lacks empirical support.',
        options: ['Admittedly', 'Consequently', 'Furthermore', 'Therefore'],
        correctIndex: 0,
        explanation: '"Admittedly" introduces a concession before a contrasting point.',
      },
      {
        question: 'Sales declined sharply; ___, the company cut its workforce.',
        options: ['whereas', 'granted', 'as a result', 'that said'],
        correctIndex: 2,
        explanation: '"As a result" signals a consequence.',
      },
      {
        question: 'The design is elegant. ___, it is expensive to manufacture.',
        options: ['Moreover', 'However', 'Consequently', 'Admittedly'],
        correctIndex: 1,
        explanation: '"However" signals a contrasting point.',
      },
      {
        question: 'The report was thorough; ___, it addressed every stakeholder concern.',
        options: ['whereas', 'moreover', 'that said', 'granted'],
        correctIndex: 1,
        explanation: '"Moreover" adds a further supporting point in the same direction.',
      },
    ],
  },
  {
    slug: 'c2-hedging-language',
    level: 'C2',
    category: 'hedging',
    order: 23,
    content: {
      en: {
        title: 'Hedging and Softening Language',
        explanation:
          'Hedging language allows speakers to soften claims, express caution, or avoid sounding overly direct — an important skill in academic, diplomatic, and professional contexts. Common hedges include modal verbs ("might", "could"), tentative verbs ("seems to", "tends to", "appears to"), and adverbs of possibility ("arguably", "presumably", "ostensibly"). Skilled speakers use hedging to sound nuanced and credible rather than uncertain or evasive.',
        examples: ['The data would seem to suggest a correlation.', 'It could be argued that the policy was premature.', 'The results appear to support our hypothesis.', 'Arguably, the decision was the right one at the time.', 'This is, admittedly, a somewhat simplified account.'],
      },
      ru: {
        title: 'Смягчающие языковые конструкции (Hedging)',
        explanation:
          'Смягчающий язык позволяет говорящим смягчить утверждения, выразить осторожность или избежать излишней прямолинейности — важный навык в академическом, дипломатическом и профессиональном контексте. Распространённые способы смягчения включают модальные глаголы ("might", "could"), осторожные глаголы ("seems to", "tends to", "appears to") и наречия возможности ("arguably", "presumably", "ostensibly"). Опытные говорящие используют смягчение, чтобы звучать взвешенно и убедительно, а не неуверенно или уклончиво.',
        examples: ['The data would seem to suggest a correlation.', 'It could be argued that the policy was premature.', 'The results appear to support our hypothesis.', 'Arguably, the decision was the right one at the time.', 'This is, admittedly, a somewhat simplified account.'],
      },
      uk: {
        title: 'Пом\'якшувальні мовні конструкції (Hedging)',
        explanation:
          'Пом\'якшувальна мова дозволяє мовцям пом\'якшити твердження, висловити обережність або уникнути надмірної прямолінійності — важлива навичка в академічному, дипломатичному та професійному контексті. Поширені способи пом\'якшення включають модальні дієслова ("might", "could"), обережні дієслова ("seems to", "tends to", "appears to") та прислівники можливості ("arguably", "presumably", "ostensibly"). Досвідчені мовці використовують пом\'якшення, щоб звучати виважено й переконливо, а не невпевнено чи ухильно.',
        examples: ['The data would seem to suggest a correlation.', 'It could be argued that the policy was premature.', 'The results appear to support our hypothesis.', 'Arguably, the decision was the right one at the time.', 'This is, admittedly, a somewhat simplified account.'],
      },
    },
    questions: [
      {
        question: 'The evidence ___ to indicate a link between the two factors.',
        options: ['certainly proves', 'would seem', 'absolutely shows', 'definitely confirms'],
        correctIndex: 1,
        explanation: '"Would seem to" is a hedging phrase that softens the claim.',
      },
      {
        question: '___, the strategy could have been implemented sooner.',
        options: ['Definitely', 'Arguably', 'Absolutely', 'Undoubtedly'],
        correctIndex: 1,
        explanation: '"Arguably" hedges a claim, presenting it as a reasonable opinion rather than a fact.',
      },
      {
        question: 'It ___ be argued that the results were inconclusive.',
        options: ['must', 'could', 'will', 'shall'],
        correctIndex: 1,
        explanation: '"Could be argued" is a common hedge in academic writing.',
      },
      {
        question: 'The findings ___ to support the initial hypothesis, though further research is needed.',
        options: ['definitely prove', 'appear', 'absolutely confirm', 'undeniably show'],
        correctIndex: 1,
        explanation: '"Appear to" softens the claim, acknowledging some uncertainty.',
      },
      {
        question: 'This explanation is, ___, a simplification of a complex issue.',
        options: ['certainly', 'admittedly', 'undoubtedly', 'definitely'],
        correctIndex: 1,
        explanation: '"Admittedly" hedges by conceding a limitation.',
      },
    ],
  },
  {
    slug: 'c2-idiomatic-structures',
    level: 'C2',
    category: 'idiomatic-structures',
    order: 24,
    content: {
      en: {
        title: 'Advanced Idiomatic Structures',
        explanation:
          'Near-native fluency requires control of idiomatic structures that go beyond literal grammar rules: fixed emphatic patterns ("far be it from me to..."), concessive idioms ("be that as it may"), and formulaic hedges ("for what it\'s worth", "if anything"). These expressions rarely follow predictable grammatical patterns and must be learned as whole chunks. Using them naturally, in the right context, is often what distinguishes advanced learners from native-like speakers.',
        examples: ['Far be it from me to criticize, but the plan has flaws.', 'Be that as it may, we must proceed as planned.', 'For what it\'s worth, I think you made the right choice.', 'If anything, the situation has improved slightly.', 'Suffice it to say, the meeting did not go well.'],
      },
      ru: {
        title: 'Продвинутые идиоматические конструкции',
        explanation:
          'Владение языком на уровне, близком к носителю, требует контроля над идиоматическими конструкциями, выходящими за рамки буквальных грамматических правил: устойчивые эмфатические модели ("far be it from me to..."), уступительные идиомы ("be that as it may") и формульные смягчения ("for what it\'s worth", "if anything"). Эти выражения редко следуют предсказуемым грамматическим шаблонам, и их нужно учить целыми блоками. Естественное использование в нужном контексте часто отличает продвинутых учеников от носителей языка.',
        examples: ['Far be it from me to criticize, but the plan has flaws.', 'Be that as it may, we must proceed as planned.', 'For what it\'s worth, I think you made the right choice.', 'If anything, the situation has improved slightly.', 'Suffice it to say, the meeting did not go well.'],
      },
      uk: {
        title: 'Просунуті ідіоматичні конструкції',
        explanation:
          'Володіння мовою на рівні, близькому до носія, вимагає контролю над ідіоматичними конструкціями, що виходять за межі буквальних граматичних правил: сталі емфатичні моделі ("far be it from me to..."), поступальні ідіоми ("be that as it may") та формульні пом\'якшення ("for what it\'s worth", "if anything"). Ці вирази рідко слідують передбачуваним граматичним шаблонам, і їх потрібно вивчати цілими блоками. Природне використання в потрібному контексті часто відрізняє просунутих учнів від носіїв мови.',
        examples: ['Far be it from me to criticize, but the plan has flaws.', 'Be that as it may, we must proceed as planned.', 'For what it\'s worth, I think you made the right choice.', 'If anything, the situation has improved slightly.', 'Suffice it to say, the meeting did not go well.'],
      },
    },
    questions: [
      {
        question: '___ from me to tell you what to do, but I would reconsider.',
        options: ['Far be it', 'It far be', 'Be far it', 'Far it be'],
        correctIndex: 0,
        explanation: '"Far be it from me to..." is a fixed idiomatic pattern used to soften advice or criticism.',
      },
      {
        question: '___ as it may, the decision has already been made.',
        options: ['Be that', 'That be', 'It be that', 'Be it that'],
        correctIndex: 0,
        explanation: '"Be that as it may" is a fixed concessive idiom meaning "nevertheless".',
      },
      {
        question: 'For what it\'s ___, I think the proposal is sound.',
        options: ['cost', 'worth', 'value', 'price'],
        correctIndex: 1,
        explanation: '"For what it\'s worth" is a fixed hedging phrase introducing an opinion.',
      },
      {
        question: 'If ___, the new policy has made things worse, not better.',
        options: ['anything', 'something', 'nothing', 'everything'],
        correctIndex: 0,
        explanation: '"If anything" is used to suggest the opposite or an even stronger version of what was expected.',
      },
      {
        question: '___ it to say, the negotiations did not end well.',
        options: ['Suffice', 'Enough', 'Sufficient', 'Sufficing'],
        correctIndex: 0,
        explanation: '"Suffice it to say" is a fixed idiom meaning "it is enough to say".',
      },
    ],
  },
];
