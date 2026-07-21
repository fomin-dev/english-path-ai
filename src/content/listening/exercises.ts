export interface SeedListeningExercise {
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  title: string;
  script: string;
  questions: Array<{ question: string; options: string[]; correctIndex: number }>;
  newWords: string[];
}

export const listeningExercises: SeedListeningExercise[] = [
  {
    level: 'A1',
    title: 'At the Café',
    script: `Waiter: Hi there! What can I get you?
Anna: Hi! Can I have a coffee, please?
Waiter: Sure. Small or large?
Anna: Small, please. And a sandwich too.
Waiter: Great. Cheese or chicken sandwich?
Anna: Cheese, please.
Waiter: OK, that's a small coffee and a cheese sandwich. That'll be six dollars.
Anna: Here you go. Thank you!
Waiter: Thanks! Have a nice day.`,
    questions: [
      { question: 'What size coffee does Anna order?', options: ['Large', 'Medium', 'Small', 'Extra small'], correctIndex: 2 },
      { question: 'What kind of sandwich does she choose?', options: ['Chicken', 'Cheese', 'Egg', 'Fish'], correctIndex: 1 },
      { question: 'How much does she pay?', options: ['Four dollars', 'Five dollars', 'Six dollars', 'Seven dollars'], correctIndex: 2 },
    ],
    newWords: ['waiter', 'sandwich', 'small', 'large', 'have a nice day'],
  },
  {
    level: 'A2',
    title: 'Planning a Weekend Trip',
    script: `Tom: Hey, are you free this weekend? I was thinking we could go hiking.
Lucy: That sounds fun! Where do you want to go?
Tom: I heard Green Hill Park is really nice. It's about an hour by car.
Lucy: Perfect. Should we leave early on Saturday morning?
Tom: Yeah, let's leave at eight. We can bring some sandwiches and water.
Lucy: Good idea. What about the weather? Is it going to rain?
Tom: I checked this morning — it should be sunny all day, around twenty degrees.
Lucy: Great, that's perfect hiking weather. I'll bring my camera too.
Tom: Nice! See you Saturday at eight, then.`,
    questions: [
      { question: 'Where do Tom and Lucy plan to go?', options: ['The beach', 'Green Hill Park', 'A museum', 'The city center'], correctIndex: 1 },
      { question: 'What time are they leaving on Saturday?', options: ['Seven o’clock', 'Eight o’clock', 'Nine o’clock', 'Ten o’clock'], correctIndex: 1 },
      { question: 'What will the weather be like?', options: ['Rainy', 'Cold and windy', 'Sunny', 'Snowy'], correctIndex: 2 },
    ],
    newWords: ['hiking', 'free (available)', 'degrees', 'camera', 'weather'],
  },
  {
    level: 'B1',
    title: 'A Voicemail Message',
    script: `Hi, this is Rachel from Bright Office Supplies. I'm calling about our meeting that was scheduled for tomorrow at ten a.m. Unfortunately, something urgent has come up, and I won't be able to make it at that time. Would it be possible to move the meeting to Thursday afternoon instead, maybe around two p.m.? I know that's a bit last minute, and I'm really sorry for the inconvenience. If Thursday doesn't work for you, just let me know a couple of times that suit you, and I'll do my best to fit one of them into my schedule. You can call me back on this number, or you can send me an email — either way is completely fine. Thanks so much for understanding, and I hope to see you soon. Bye for now!`,
    questions: [
      { question: 'What was the original time for the meeting?', options: ['Tomorrow at nine a.m.', 'Tomorrow at ten a.m.', 'Today at ten a.m.', 'Thursday at ten a.m.'], correctIndex: 1 },
      { question: 'What new time does Rachel suggest?', options: ['Wednesday morning', 'Thursday at two p.m.', 'Friday at two p.m.', 'Thursday at ten a.m.'], correctIndex: 1 },
      { question: 'How can the listener contact Rachel back?', options: ['Only by phone', 'Only by email', 'By phone or email', 'By visiting the office'], correctIndex: 2 },
    ],
    newWords: ['scheduled', 'urgent', 'inconvenience', 'suit (be convenient)', 'reschedule'],
  },
  {
    level: 'B1',
    title: 'Talking About Hobbies',
    script: `Mark: So, what do you usually do in your free time?
Sofia: I've actually gotten really into painting recently. I take a class every Tuesday evening.
Mark: Oh, nice! How long have you been doing that?
Sofia: About six months now. I was terrible at first, honestly, but I've slowly improved.
Mark: That's great. I've always wanted to try something creative, but I never seem to have the time.
Sofia: You should just start small — maybe thirty minutes a week. What about you, what do you enjoy doing?
Mark: I play guitar, mostly on weekends. It really helps me relax after a stressful week at work.
Sofia: That's cool. Maybe we should organize some kind of creative evening together sometime — you play, I'll paint!
Mark: Ha, I like that idea. Let's plan something soon.`,
    questions: [
      { question: 'What hobby has Sofia recently gotten into?', options: ['Playing guitar', 'Painting', 'Cooking', 'Photography'], correctIndex: 1 },
      { question: 'How long has Sofia been doing this hobby?', options: ['Two months', 'Six months', 'One year', 'Two years'], correctIndex: 1 },
      { question: 'When does Mark usually play guitar?', options: ['Every morning', 'On weekends', 'During work breaks', 'Every Tuesday'], correctIndex: 1 },
    ],
    newWords: ['gotten into (start liking)', 'improved', 'creative', 'stressful', 'organize'],
  },
  {
    level: 'B2',
    title: 'Weather Update on the Radio',
    script: `Good morning, listeners, and welcome to your Monday weather update. Let's start with today: expect mostly cloudy skies across the region this morning, clearing up by early afternoon with temperatures reaching a pleasant twenty-two degrees. However, if you're heading out later in the evening, you might want to grab a light jacket, as temperatures will drop fairly quickly after sunset. Looking ahead to the rest of the week, Tuesday and Wednesday look fairly similar, with a mix of sun and clouds and no significant rain expected. Things change by Thursday, though — a low-pressure system moving in from the coast is likely to bring heavier rain and stronger winds, so if you have outdoor plans, you might want to consider rescheduling for earlier in the week. By the weekend, conditions should improve again, with Saturday shaping up to be the sunniest day we've seen in a couple of weeks. That's your weather for now — stay tuned for traffic updates right after this.`,
    questions: [
      { question: 'What will the weather be like this morning?', options: ['Sunny all day', 'Mostly cloudy, clearing later', 'Heavy rain', 'Snowing'], correctIndex: 1 },
      { question: 'What happens on Thursday, according to the forecast?', options: ['It stays sunny', 'A low-pressure system brings rain and wind', 'Temperatures rise sharply', 'Nothing changes'], correctIndex: 1 },
      { question: 'Which day is expected to be the sunniest?', options: ['Monday', 'Wednesday', 'Thursday', 'Saturday'], correctIndex: 3 },
    ],
    newWords: ['low-pressure system', 'shaping up to be', 'stay tuned', 'significant', 'conditions'],
  },
  {
    level: 'B2',
    title: 'A Job Interview',
    script: `Interviewer: Thanks for coming in today. Can you start by telling me a bit about your current role?
Candidate: Sure. I've been working as a project coordinator for about three years now, mainly managing timelines and communication between different teams.
Interviewer: And what would you say is the biggest challenge you've faced in that role?
Candidate: Probably learning to manage competing priorities when multiple projects overlap. Early on, I struggled with that, but I've since developed a system for prioritizing tasks that's worked really well.
Interviewer: That's good to hear. Why are you interested in leaving your current position?
Candidate: Honestly, I feel like I've grown as much as I can in my current company, and I'm looking for a role with more responsibility, ideally where I can eventually move into a full project management position.
Interviewer: Understood. And are you comfortable with occasional travel? This role involves visiting client sites roughly once a month.
Candidate: Yes, that wouldn't be a problem at all.`,
    questions: [
      { question: 'What is the candidate’s current job title?', options: ['Project manager', 'Project coordinator', 'Team leader', 'Client relations officer'], correctIndex: 1 },
      { question: 'What challenge does the candidate mention?', options: ['Learning new software', 'Managing competing priorities', 'Public speaking', 'Working with clients'], correctIndex: 1 },
      { question: 'Why does the candidate want to leave their current job?', options: ['They dislike their coworkers', 'They want more responsibility and growth', 'The pay is too low', 'The company is closing'], correctIndex: 1 },
    ],
    newWords: ['coordinator', 'overlap', 'prioritizing', 'responsibility', 'client sites'],
  },
  {
    level: 'C1',
    title: 'Podcast Introduction: Rethinking Climate Solutions',
    script: `Welcome back to the show. Today we're tackling a topic that comes up in almost every conversation about the environment: is individual action actually meaningful in the fight against climate change, or should we be putting all our energy into pressuring governments and corporations instead? For years, the dominant narrative told us that reducing our own carbon footprint — flying less, eating less meat, recycling more — was the key contribution each of us could make. More recently, though, a growing number of researchers have pushed back against that framing, pointing out that a relatively small number of companies are responsible for the vast majority of global emissions. So does that mean individual choices don't matter at all? Not exactly, according to my guest today, a climate policy researcher who argues that the two approaches aren't actually in competition. She'll explain why she thinks personal action and systemic change reinforce each other, and why framing this as an either-or debate might be doing more harm than good. Stick around — this is a conversation you won't want to miss.`,
    questions: [
      { question: 'What is the main question the episode explores?', options: ['How to recycle correctly', 'Whether individual action matters versus systemic change', 'How companies calculate emissions', 'Which countries pollute the most'], correctIndex: 1 },
      { question: 'What have some researchers pointed out recently?', options: ['Individual action is the only solution', 'A small number of companies cause most emissions', 'Climate change is not real', 'Recycling has no benefits at all'], correctIndex: 1 },
      { question: 'What does the guest argue, according to the host?', options: ['Individual and systemic action are in competition', 'Only governments can solve climate change', 'Personal action and systemic change reinforce each other', 'Neither approach matters'], correctIndex: 2 },
    ],
    newWords: ['carbon footprint', 'framing', 'systemic', 'reinforce', 'either-or debate'],
  },
  {
    level: 'C2',
    title: 'Academic Talk: Behavioral Economics and Decision-Making',
    script: `In today's lecture, I want to move away from the classical economic assumption that individuals are perfectly rational actors who always maximize their own utility. Decades of research in behavioral economics have demonstrated, quite convincingly, that human decision-making is riddled with systematic biases — patterns of deviation from rationality that occur predictably across different contexts and populations. Take, for instance, loss aversion: the well-documented tendency for people to feel the pain of a loss roughly twice as intensely as the pleasure of an equivalent gain. This asymmetry has profound implications, influencing everything from how consumers respond to pricing strategies to how investors behave during market downturns. Another compelling example is the anchoring effect, whereby an initial piece of information — even one that is entirely arbitrary — disproportionately influences subsequent judgments. Retailers exploit this constantly, displaying an inflated "original price" beside a discounted one, even when few customers ever paid the original figure. What I find particularly fascinating is that awareness of these biases does surprisingly little to eliminate them; even trained economists remain susceptible. This suggests the biases are not simply the result of ignorance, but rather deeply embedded features of human cognition itself.`,
    questions: [
      { question: 'What classical economic assumption does the lecturer challenge?', options: ['That markets are always efficient', 'That individuals are perfectly rational utility-maximizers', 'That prices always reflect true value', 'That consumers never make mistakes'], correctIndex: 1 },
      { question: 'What is "loss aversion," as explained in the talk?', options: ['A fear of losing money in general', 'Feeling losses more intensely than equivalent gains', 'An inability to make decisions', 'A preference for saving over spending'], correctIndex: 1 },
      { question: 'What does the lecturer find particularly fascinating about these biases?', options: ['They only affect uneducated people', 'Awareness of them does little to eliminate them', 'They disappear with enough training', 'They only apply to retail pricing'], correctIndex: 1 },
    ],
    newWords: ['riddled with', 'asymmetry', 'anchoring effect', 'disproportionately', 'cognition'],
  },
  {
    level: 'A1',
    title: 'Buying Tickets at the Cinema',
    script: `Clerk: Hello! How can I help you?
Ben: Hi. Two tickets for the seven o'clock film, please.
Clerk: Sure. Would you like the big screen or the small screen?
Ben: The big screen, please.
Clerk: OK, two tickets, big screen, seven o'clock. That's sixteen dollars.
Ben: Here you are.
Clerk: Thank you. Enjoy the film!`,
    questions: [
      { question: 'What time is the film?', options: ['Six o\'clock', 'Seven o\'clock', 'Eight o\'clock', 'Nine o\'clock'], correctIndex: 1 },
      { question: 'How many tickets does Ben buy?', options: ['One', 'Two', 'Three', 'Four'], correctIndex: 1 },
      { question: 'How much does he pay?', options: ['Six dollars', 'Ten dollars', 'Sixteen dollars', 'Twenty dollars'], correctIndex: 2 },
    ],
    newWords: ['ticket', 'screen', 'enjoy', 'clerk', "o'clock"],
  },
  {
    level: 'A1',
    title: 'A Phone Call with a Friend',
    script: `Maria: Hello?
Jake: Hi Maria, it's Jake. Are you busy right now?
Maria: No, not really. What's up?
Jake: I'm at the supermarket. Do we need milk at home?
Maria: Yes, please! And can you get some apples too?
Jake: Sure, no problem. Anything else?
Maria: No, that's all. Thank you, Jake!
Jake: OK, see you soon. Bye!
Maria: Bye!`,
    questions: [
      { question: 'Where is Jake?', options: ['At home', 'At the supermarket', 'At school', 'At work'], correctIndex: 1 },
      { question: 'What does Maria ask for first?', options: ['Bread', 'Milk', 'Eggs', 'Apples'], correctIndex: 1 },
      { question: 'What else does she want?', options: ['Apples', 'Bananas', 'Bread', 'Cheese'], correctIndex: 0 },
    ],
    newWords: ['busy', 'supermarket', 'apples', 'anything else', 'no problem'],
  },
  {
    level: 'A2',
    title: "At the Doctor's",
    script: `Doctor: Good morning. What seems to be the problem?
Patient: Good morning, doctor. I have a headache and a sore throat since yesterday.
Doctor: Do you have a fever?
Patient: A little, I think. I feel quite tired too.
Doctor: OK, let me check. ... Your throat is a bit red. I think it's just a cold.
Patient: Should I take any medicine?
Doctor: Yes, take these tablets twice a day, and drink plenty of water. Rest for two or three days.
Patient: Thank you, doctor.
Doctor: You're welcome. Come back if you don't feel better next week.`,
    questions: [
      { question: "What are the patient's symptoms?", options: ['Stomach ache and cough', 'Headache and sore throat', 'A broken arm', 'Toothache'], correctIndex: 1 },
      { question: 'What does the doctor think it is?', options: ['Flu', 'A cold', 'An allergy', 'Nothing at all'], correctIndex: 1 },
      { question: 'How often should the patient take the tablets?', options: ['Once a day', 'Twice a day', 'Three times a day', 'Only at night'], correctIndex: 1 },
    ],
    newWords: ['headache', 'sore throat', 'fever', 'tablets', 'plenty of'],
  },
  {
    level: 'A2',
    title: 'Ordering Food for Delivery',
    script: `Operator: Thanks for calling Luigi's Pizza. What can I get for you?
Customer: Hi, I'd like to order a large pepperoni pizza, please.
Operator: Sure. Would you like anything to drink with that?
Customer: Yes, a bottle of cola, please.
Operator: Great. And what's the delivery address?
Customer: Twelve Oak Street, near the park.
Operator: OK. That will be about thirty minutes. The total is eighteen dollars.
Customer: Perfect, thank you.
Operator: Thank you for your order. Have a good evening!`,
    questions: [
      { question: 'What size pizza does the customer order?', options: ['Small', 'Medium', 'Large', 'Extra large'], correctIndex: 2 },
      { question: 'What drink do they order?', options: ['Water', 'Juice', 'Cola', 'Coffee'], correctIndex: 2 },
      { question: 'How long will delivery take?', options: ['Fifteen minutes', 'Thirty minutes', 'One hour', 'Two hours'], correctIndex: 1 },
    ],
    newWords: ['delivery', 'address', 'pepperoni', 'total', 'order'],
  },
  {
    level: 'B1',
    title: 'Talking About a Holiday',
    script: `Dan: How was your trip to Portugal last month?
Ellie: It was amazing, actually. We spent the first few days in Lisbon, just walking around and trying different foods.
Dan: I've heard the food there is great. What did you try?
Ellie: Loads of seafood, and this custard tart called pastel de nata — I'm still thinking about it.
Dan: Sounds delicious. Did you travel outside the city as well?
Ellie: Yes, we took a train to the coast for a couple of days and just relaxed on the beach. It was exactly what I needed after such a busy year at work.
Dan: That sounds perfect. Would you go back?
Ellie: Definitely. I'd love to see more of the north next time.`,
    questions: [
      { question: 'Where did Ellie spend her holiday?', options: ['Spain', 'Portugal', 'Italy', 'Greece'], correctIndex: 1 },
      { question: 'What food does she mention especially?', options: ['Pizza', 'Pastel de nata', 'Paella', 'Croissants'], correctIndex: 1 },
      { question: 'What did she do on the coast?', options: ['Went shopping', 'Relaxed on the beach', 'Visited a museum', 'Worked remotely'], correctIndex: 1 },
    ],
    newWords: ['loads of', 'custard tart', 'coast', 'relaxed', 'definitely'],
  },
  {
    level: 'B1',
    title: 'Returning a Faulty Product',
    script: `Assistant: Hi there, how can I help you today?
Customer: Hi, I bought this blender last week, and it stopped working after just two days.
Assistant: I'm sorry to hear that. Do you still have the receipt?
Customer: Yes, here it is.
Assistant: Thank you. Would you prefer a refund or a replacement?
Customer: I think I'd like a replacement, if that's possible.
Assistant: Of course, we have the same model in stock. Let me get one for you.
Customer: Great, thank you for sorting this out so quickly.
Assistant: No problem at all. Sorry again for the inconvenience.`,
    questions: [
      { question: 'What product is the customer returning?', options: ['A toaster', 'A blender', 'A kettle', 'A microwave'], correctIndex: 1 },
      { question: 'Why is the customer unhappy?', options: ['It was too expensive', 'It stopped working', 'It was the wrong color', 'It arrived late'], correctIndex: 1 },
      { question: 'What does the customer choose?', options: ['A refund', 'A replacement', 'A repair', 'Store credit'], correctIndex: 1 },
    ],
    newWords: ['faulty', 'receipt', 'refund', 'replacement', 'in stock'],
  },
  {
    level: 'B2',
    title: 'A Restaurant Complaint',
    script: `Manager: Good evening, is everything alright with your meal?
Guest: Actually, no. I ordered the steak medium-rare, but this is well done, and it's been sitting here for quite a while.
Manager: I do apologize for that. Let me take it back to the kitchen and have a fresh one prepared right away.
Guest: I'd appreciate that. This is meant to be a special occasion, so I was hoping for a bit more attention to detail.
Manager: Completely understandable, and I'm sorry it hasn't been up to standard. I'll also speak with the chef about the wait time. In the meantime, may I offer you a complimentary drink while you wait?
Guest: That would be nice, thank you.
Manager: Of course. I'll have your new steak out within ten minutes.`,
    questions: [
      { question: "What is the guest's complaint?", options: ['The food was cold', 'The steak was overcooked', 'The service was too slow', 'The bill was wrong'], correctIndex: 1 },
      { question: 'What does the manager offer while the guest waits?', options: ['A discount', 'A free dessert', 'A complimentary drink', 'A refund'], correctIndex: 2 },
      { question: 'What kind of occasion is this for the guest?', options: ['A business meeting', 'A special occasion', 'A quick lunch', 'A first date'], correctIndex: 1 },
    ],
    newWords: ['medium-rare', 'complimentary', 'up to standard', 'occasion', 'attention to detail'],
  },
  {
    level: 'B2',
    title: 'University Orientation Talk',
    script: `Welcome, everyone, to orientation week! Over the next few days, you'll get a chance to explore campus, meet your academic advisors, and register for classes. I want to highlight a few things that will make your first semester much smoother. First, make sure you activate your student email as soon as possible — that's how the university will contact you about deadlines and events. Second, the library offers free workshops on academic writing and research skills throughout the semester; I'd strongly recommend attending at least one, even if you feel confident already. Finally, don't underestimate how much joining a club or society can help you settle in — it's one of the easiest ways to make friends outside your course. If you have any questions at all during the week, our student ambassadors in the blue T-shirts are here to help.`,
    questions: [
      { question: 'What should students do as soon as possible?', options: ['Join a club', 'Activate their student email', 'Choose a major', 'Meet the dean'], correctIndex: 1 },
      { question: 'What does the library offer?', options: ['Free meals', 'Free workshops on writing and research', 'Free textbooks', 'Free printing'], correctIndex: 1 },
      { question: 'How can students recognize the ambassadors?', options: ['By their name tags', 'By their blue T-shirts', 'By their clipboards', 'By their badges'], correctIndex: 1 },
    ],
    newWords: ['orientation', 'advisor', 'semester', 'underestimate', 'settle in'],
  },
  {
    level: 'C1',
    title: 'Interview with an Entrepreneur',
    script: `Host: You started your company with almost no funding. Looking back, what do you think made the biggest difference in those early days?
Guest: Honestly, I think it was our willingness to talk to customers constantly, even before we had a finished product. We'd show people rough prototypes and just watch how they reacted, rather than asking them what they wanted, because people are often better at reacting than predicting.
Host: That's an interesting distinction. Did that approach ever lead you somewhere you didn't expect?
Guest: Absolutely. We originally built the product for freelancers, but we noticed small agencies kept using it in ways we hadn't anticipated, so we pivoted the whole roadmap around that instead. If we'd stuck rigidly to our original plan, I doubt we'd still be around.
Host: What advice would you give to someone starting out today?
Guest: Stay obsessively close to your users, and treat your first plan as a hypothesis, not a commitment.`,
    questions: [
      { question: 'What did the guest prioritize in the early days?', options: ['Raising funding', 'Talking to customers constantly', 'Hiring quickly', 'Advertising heavily'], correctIndex: 1 },
      { question: 'Why does the guest prefer watching reactions over asking what people want?', options: ["It's cheaper", 'People are better at reacting than predicting', "It's faster", 'Customers dislike surveys'], correctIndex: 1 },
      { question: 'Who did the company end up building the product for?', options: ['Freelancers only', 'Small agencies', 'Large corporations', 'Students'], correctIndex: 1 },
    ],
    newWords: ['prototype', 'pivoted', 'roadmap', 'obsessively', 'hypothesis'],
  },
  {
    level: 'C1',
    title: 'News Report on Renewable Energy',
    script: `In today's business news, a new report suggests that renewable energy sources overtook fossil fuels for the first time in electricity generation across several major economies last quarter. Analysts attribute this shift to a combination of falling costs for solar and wind installations and increased government investment in grid infrastructure needed to handle variable energy supply. However, experts caution that the transition is far from complete. Storage technology, they note, remains the critical bottleneck — without significantly better and cheaper batteries, grids will continue to rely on fossil fuel backup during periods of low wind and sunlight. The report also highlights that emerging economies face steeper challenges, since much of the existing infrastructure investment has been concentrated in wealthier nations. Still, the overall trend is described as encouraging, with several analysts revising their long-term forecasts for renewable adoption upward.`,
    questions: [
      { question: 'What milestone does the report describe?', options: ['Renewables overtaking fossil fuels in electricity generation', 'Fossil fuels becoming cheaper', 'A ban on coal power', 'A new solar technology breakthrough'], correctIndex: 0 },
      { question: 'What do experts say is the critical bottleneck?', options: ['Government funding', 'Storage technology', 'Public opinion', 'Wind turbine design'], correctIndex: 1 },
      { question: 'What challenge do emerging economies face?', options: ['Too much investment', 'Concentrated infrastructure investment in wealthier nations', 'Lack of renewable resources', 'Overregulation'], correctIndex: 1 },
    ],
    newWords: ['overtook', 'grid infrastructure', 'bottleneck', 'adoption', 'variable'],
  },
  {
    level: 'C2',
    title: 'Panel Discussion: Artificial Intelligence Ethics',
    script: `Moderator: One recurring tension in this field is between innovation speed and regulatory caution. How do you each approach that trade-off?
Panelist A: I'd push back slightly on the premise that it's a strict trade-off at all. Well-designed regulation doesn't necessarily slow innovation — it can channel it toward applications that are more likely to be adopted sustainably, because they've earned public trust.
Panelist B: I largely agree, though I'd add that the pace of technical progress right now makes it genuinely difficult for regulatory frameworks to keep up. By the time a policy is drafted, debated, and implemented, the underlying technology has often changed substantially.
Moderator: So where does that leave policymakers?
Panelist B: I think it argues for more adaptive, principle-based regulation rather than highly prescriptive rules tied to today's specific technical architecture — rules that can flex as the technology evolves, rather than becoming obsolete within a year or two.
Panelist A: Exactly, and that requires regulators who genuinely understand the technology, which is its own considerable challenge.`,
    questions: [
      { question: 'What tension does the moderator raise?', options: ['Cost versus quality', 'Innovation speed versus regulatory caution', 'Public versus private funding', 'Domestic versus international policy'], correctIndex: 1 },
      { question: 'What does Panelist A argue about regulation?', options: ['It always slows innovation', 'It can channel innovation toward sustainably adopted applications', 'It is unnecessary', 'It should be avoided entirely'], correctIndex: 1 },
      { question: 'What kind of regulation does Panelist B advocate for?', options: ['Highly prescriptive rules', 'Adaptive, principle-based regulation', 'No regulation at all', 'Regulation written only by engineers'], correctIndex: 1 },
    ],
    newWords: ['prescriptive', 'obsolete', 'adaptive', 'premise', 'sustainably'],
  },
  {
    level: 'C2',
    title: 'Lecture: The Philosophy of Language',
    script: `This week, I want to turn to a question that has occupied philosophers of language for over a century: what exactly happens when we successfully communicate meaning to another person? One influential tradition, associated with the later work of Wittgenstein, argues that meaning is not some fixed mental entity transferred from speaker to listener, but rather something constituted by use — by the particular role a word or phrase plays within a shared practice, or what he termed a "language game." This stands in contrast to earlier referential theories, which held that words function primarily by pointing to objects or concepts in the world. The use-based view has considerable explanatory power; it accounts neatly for why context so dramatically shapes interpretation, and why seemingly nonsensical utterances can become perfectly meaningful within the right shared practice. Critics, however, argue that it struggles to explain how entirely novel sentences, never previously uttered within any established practice, can nonetheless be understood immediately by competent speakers.`,
    questions: [
      { question: 'What view is associated with the later Wittgenstein?', options: ['Meaning as a fixed mental entity', 'Meaning constituted by use within a language game', 'Meaning as pure reference to objects', 'Meaning as untranslatable'], correctIndex: 1 },
      { question: 'What do referential theories claim?', options: ['Words function primarily by pointing to objects or concepts', 'Words have no fixed meaning', 'Meaning depends only on context', 'Meaning is entirely subjective'], correctIndex: 0 },
      { question: 'What is the main criticism of the use-based view mentioned?', options: ['It cannot explain novel sentences being understood immediately', 'It is too simple', 'It ignores context entirely', 'It was never influential'], correctIndex: 0 },
    ],
    newWords: ['constituted', 'utterance', 'referential', 'novel (new)', 'competent speakers'],
  },
];
