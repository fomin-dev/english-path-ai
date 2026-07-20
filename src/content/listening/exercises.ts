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
];
