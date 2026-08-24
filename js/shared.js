// =============================================
// SHARED UTILITIES
// =============================================

// =============================================
// AI CHAT ENGINE (Logic-Aware Intelligent Response System)
// =============================================
const AIEngine = {
  conversationHistory: [],
  maxHistory: 12,
  lastTopic: null,

  init() {
    this.conversationHistory = [];
    this.lastTopic = null;
  },

  getResponse(input) {
    const lower = input.toLowerCase().trim();
    this.conversationHistory.push({ role: 'user', text: lower });
    if (this.conversationHistory.length > this.maxHistory) {
      this.conversationHistory = this.conversationHistory.slice(-this.maxHistory);
    }

    const response = this.generateResponse(lower);
    this.conversationHistory.push({ role: 'bot', text: response });
    return response;
  },

  getLastBotMessage() {
    for (let i = this.conversationHistory.length - 1; i >= 0; i--) {
      if (this.conversationHistory[i].role === 'bot') return this.conversationHistory[i].text;
    }
    return null;
  },

  // =============================================
  // INTELLIGENT RESPONSE GENERATION
  // =============================================
  generateResponse(input) {
    // 1. Quick intents that need fast answers
    if (/\b(hi|hello|hey|howdy|greetings|sup|yo|good morning|good evening|good afternoon)\b/i.test(input) && input.length < 30) {
      return this.pick(this.greetings());
    }
    if (/\b(thanks|thank you|appreciate|grateful|helpful)\b/i.test(input)) {
      return this.pick(this.thanksResponses());
    }
    if (/\b(bye|goodbye|see you|later|farewell|cya|good night)\b/i.test(input)) {
      return this.pick(this.goodbyes());
    }

    // 2. Detect topic
    const topic = this.detectTopic(input);

    // 3. Detect question intent / logic pattern
    const intent = this.detectIntent(input);

    // 4. Handle direct calculation / logic questions
    const calc = this.tryMath(input);
    if (calc) return calc;

    // 5. Detect comparison
    const comparison = this.tryComparison(input, topic);
    if (comparison) return comparison;

    // 6. Detect study plan request
    const plan = this.tryStudyPlan(input, topic);
    if (plan) return plan;

    // 7. Follow-up context handling
    if (this.isFollowUp(input)) {
      return this.followUpResponse(input, topic);
    }

    // 8. Logic-aware structured answer
    return this.structuredAnswer(input, topic, intent);
  },

  pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  },

  greetings() {
    return [
      "Hello! 👋 Welcome to Skill Forge AI. I'm your personal growth mentor. Ask me about skills, careers, habits, studying, or anything you want to improve!",
      "Hey there! 🌟 Ready to level up your skills? I'm here to help you grow. What's on your mind?",
      "Hi! Great to see you. 🚀 I can help with skill assessment, career guidance, habit building, study plans, and more. How can I help?",
      "Greetings! 💫 I'm your AI companion for personal development. Whether it's learning, speaking, or creativity — I've got you covered!"
    ];
  },

  thanksResponses() {
    return [
      "You're very welcome! 😊 I'm here 24/7 to help you grow. Keep using the tools, tracking your habits, and challenging yourself.",
      "Glad I could help! 🌟 Don't forget to check your <strong>Dashboard</strong> to see your progress. Keep growing! 🚀",
      "Anytime! 💪 Remember: consistency is key. Every small step counts. What would you like to explore next?"
    ];
  },

  goodbyes() {
    return [
      "Take care, and keep growing! 🌱 Remember: consistency is key. Use your <strong>Habit Tracker</strong>, take on <strong>Challenges</strong>, and check your <strong>Dashboard</strong> daily. See you soon!",
      "Goodbye for now! 👋 Stay on track with your goals. Every XP counts, every habit matters. You're building a better you! 🚀"
    ];
  },

  /********************************************
   * TOPIC DETECTION
   ********************************************/
  detectTopic(input) {
    if (/\b(html|css|web dev|frontend|front-end|javascript|programming|code|coding|python|react|developer)\b/i.test(input)) return 'webdev';
    if (/\b(ai|machine learning|data science|data scien|analytics|python|algorithm)\b/i.test(input) && /\b(learn|study|career|skill|job|path)\b/i.test(input)) return 'datascience';
    if (/\b(skill|learn|learnin|study|courses|tutorial|practice|improve|master|develop|knowledge|exam|test prep)\b/i.test(input)) return 'skills';
    if (/\b(career|job|work|profession|field|industry|hire|interview|resume|salary|promotion|linkedin|portfolio)\b/i.test(input)) return 'career';
    if (/\b(habit|routine|daily|consistent|discipline|procrastinat|focus|productiv|time management|schedule|sleep)\b/i.test(input)) return 'habits';
    if (/\b(speak|present|public|stage|audience|nervous|confiden|fear|talk|speech|communicat)\b/i.test(input)) return 'speaking';
    if (/\b(creative|idea|brainstorm|innovate|think|imagin|inspire|design|art|write|invent|draw)\b/i.test(input)) return 'creativity';
    if (/\b(motivat|inspire|encourage|keep going|never give up|determin|persist|goal|dream|success|burnout|stress|anxious)\b/i.test(input)) return 'motivation';
    if (/\b(assess|test|quiz|evaluate|score|result|strength|weakness|analyze|personality)\b/i.test(input)) return 'assessment';
    if (/\b(badge|achievement|unlock|trophy|reward|level up|xp|experience point)\b/i.test(input)) return 'badges';
    if (/\b(roadmap|path|plan|route|guide|steps|road map|direction|track|pathway)\b/i.test(input)) return 'roadmap';
    if (/\b(finance|money|invest|budget|save|salary)\b/i.test(input)) return 'finance';
    if (/\b(health|exercise|fitness|diet|nutrition|meditat|wellness|sleep)\b/i.test(input)) return 'health';
    return null;
  },

  /********************************************
   * INTENT DETECTION (question logic)
   ********************************************/
  detectIntent(input) {
    if (/\b(what is|what are|define|definition|meaning of|explain|describe)\b/i.test(input)) return 'definition';
    if (/\b(why|reason|because|benefit|importance|purpose)\b/i.test(input)) return 'why';
    if (/\b(how do i|how to|how can i|steps?|guide|way to|should i)\b/i.test(input)) return 'howto';
    if (/\b(vs|versus|difference|compare|comparison|better|or )\b/i.test(input)) return 'comparison';
    if (/\b(list|types|kinds|examples? of|give me|name (some|a few)|top \d+)\b/i.test(input)) return 'list';
    if (/\b(plan|schedule|routine|timetable|study plan)\b/i.test(input)) return 'plan';
    if (/\b(what should|which should|recommend|suggest|advice|tips?)\b/i.test(input)) return 'advice';
    if (/[?]$/.test(input) || /\b(am i|is it|can i|do i|does)\b/i.test(input)) return 'question';
    return 'statement';
  },

  /********************************************
   * MATH / LOGIC EVALUATION
   ********************************************/
  tryMath(input) {
    const expr = input
      .replace(/what is|what's|calculate|compute|solve|equals|how much is|whats/g, '')
      .replace(/plus|\+/g, '+')
      .replace(/minus|-/g, '-')
      .replace(/times|multiplied by|\*/g, '*')
      .replace(/divided by|\//g, '/')
      .replace(/x\s*\^|to the power of/g, '**')
      .replace(/[?,!.]/g, '')
      .trim();
    if (!/^[\d+\-*/().\s]+$/.test(expr)) return null;
    // Ensure it actually looks like an arithmetic expression
    if (!/\d/.test(expr) || !/[+\-*/]/.test(expr)) return null;
    try {
      // eslint-disable-next-line no-eval
      const val = Function('"use strict"; return (' + expr + ')')();
      if (typeof val === 'number' && isFinite(val)) {
        return `Let me work that out: 🧮<br><strong>${expr}</strong> = <strong>${val}</strong><br><br>Tip: breaking problems into smaller steps (like this arithmetic) is exactly how you should approach tough study questions too!`;
      }
    } catch (e) { /* not a valid math expression */ }
    return null;
  },

  /********************************************
   * COMPARISON HANDLER
   ********************************************/
  tryComparison(input, topic) {
    const vsMatch = input.match(/([\w\s\-+]{2,40})\s+(?:vs\.?|versus|or|compared to|vs)\s+([\w\s\-+]{2,40})/i);
    if (!vsMatch) return null;
    const a = vsMatch[1].trim();
    const b = vsMatch[2].trim();

    const comparisons = {
      // Web dev vs data science
      'web dev': {
        'data science': "<strong>Web Development vs Data Science</strong> 🤔<br>• <strong>Web Dev</strong>: Build websites/apps. Tools: HTML, CSS, JS, React. Outcome: user-facing products. Great if you love creating things users interact with.<br>• <strong>Data Science</strong>: Extract insights from data. Tools: Python, SQL, stats, ML. Outcome: data-driven decisions. Great if you love analysis and patterns.<br>• <strong>Try this:</strong> Do our <strong>Skill Assessment</strong> to see which fits your thinking style! 🎯"
      },
      'frontend': {
        'backend': "<strong>Frontend vs Backend</strong> 💻<br>• <strong>Frontend</strong>: What users see — HTML, CSS, JavaScript, React. Focus on UI, UX, responsiveness.<br>• <strong>Backend</strong>: Server logic — Node.js, Python, databases, APIs. Focus on data, security, scaling.<br>• <strong>Analogy:</strong> Frontend is the restaurant dining room; backend is the kitchen.<br>• <strong>Tip:</strong> Learn both basics, then specialize — full-stack devs are in demand! 🚀"
      },
      'python': {
        'javascript': "<strong>Python vs JavaScript</strong> ⚡<br>• <strong>Python</strong>: Readable, great for data science, AI, backend. Indentation-based.<br>• <strong>JavaScript</strong>: Runs in the browser, essential for web interactivity, full-stack with Node.js.<br>• <strong>Which first?</strong> Web/browser things → JS. Data/AI/automation → Python. Best combo: learn both eventually! 🐍⚡"
      }
    };

    // Try reverse lookup too
    if (comparisons[b] && comparisons[b][a]) {
      return `<strong>${cap(b)} vs ${cap(a)}</strong> — see below (reversed):<br>` + comparisons[b][a];
    }
    if (comparisons[a] && comparisons[a][b]) return comparisons[a][b];

    // Generic comparison fallback with structured reasoning
    return this.genericComparison(input, a, b, topic);
  },

  genericComparison(input, a, b, topic) {
    return `<strong>Comparing "${cap(a)}" vs "${cap(b)}"</strong> 🧠<br><br>Here's how to think about it logically:<br>1) <strong>Define each</strong> — what does each one primarily do? (its core purpose)<br>2) <strong>Key differences</strong> — tools, skills, outcomes, difficulty.<br>3) <strong>Your fit</strong> — which aligns with your interests and strengths?<br><br>Try our <strong>Skill Assessment</strong> to discover which path suits you, then explore <strong>Career Roadmaps</strong> for structured steps. 🗺️`;
  },

  /********************************************
   * STUDY PLAN HANDLER
   ********************************************/
  tryStudyPlan(input, topic) {
    if (/\b(plan|schedule|routine|timetable|study plan|how (should|can) i (start|begin))\b/i.test(input)) {
      const plans = {
        webdev: `<strong>📘 Web Development — 4-Week Study Plan</strong><br><br><strong>Week 1:</strong> HTML & CSS basics → build a personal homepage.<br><strong>Week 2:</strong> JavaScript fundamentals → add interactivity (buttons, forms).<br><strong>Week 3:</strong> Build 2 projects (to-do app, landing page).<br><strong>Week 4:</strong> Learn Git, responsive design, deploy on GitHub Pages.<br><br>💡 <strong>Daily rhythm:</strong> 1 hour theory → 1 hour practice → 15 min recap. Use the <strong>Habit Tracker</strong> to stay consistent!`,
        datascience: `<strong>📊 Data Science — 4-Week Study Plan</strong><br><br><strong>Week 1:</strong> Python basics (variables, loops, functions).<br><strong>Week 2:</strong> Pandas & data cleaning + SQL.<br><strong>Week 3:</strong> Statistics essentials + visualization (Matplotlib/Seaborn).<br><strong>Week 4:</strong> Intro to ML (linear regression, classification) + a small project.<br><br>💡 Practice with real datasets on Kaggle. Track 30 min daily in the <strong>Habit Tracker</strong>.`,
        skills: `<strong>📚 General Skill-Building Plan</strong><br><br>1) <strong>Choose ONE skill</strong> — avoid spreading too thin.<br>2) <strong>Assess your level</strong> using our <strong>Skill Assessment</strong>.<br>3) <strong>20-60 min daily</strong> of focused practice (Pomodoro: 25 min focus / 5 min break).<br>4) <strong>Weekly review:</strong> what worked, what to adjust.<br>5) <strong>Apply in projects</strong> — real output beats passive reading.<br><br>Add practice sessions to your <strong>Habit Tracker</strong> and earn XP! 🔥`,
        career: `<strong>💼 Career-Readiness Plan</strong><br><br>• <strong>Month 1:</strong> Self-assessment + pick a roadmap from <strong>Career Roadmaps</strong>.<br>• <strong>Month 2:</strong> Build core skills + 2 portfolio projects.<br>• <strong>Month 3:</strong> Craft resume/LinkedIn, practice interviews (STAR method).<br>• <strong>Month 4:</strong> Network, apply, and iterate on feedback.<br><br>Use the <strong>Public Speaking</strong> module to sharpen interview confidence! 🎤`,
        default: `<strong>🗓️ Smart Study Plan</strong><br><br>1) <strong>Set a clear goal</strong> (SMART goals — Specific, Measurable, Achievable, Relevant, Time-bound).<br>2) <strong>Break it down</strong> into weekly milestones.<br>3) <strong>Schedule daily blocks</strong> (20-60 min, same time each day).<br>4) <strong>Test yourself weekly</strong> (active recall > re-reading).<br>5) <strong>Review & adjust</strong> every Sunday.<br><br>Log your study sessions in the <strong>Habit Tracker</strong> and watch your streak grow! 🌱`
      };
      const key = topic && plans[topic] ? topic : 'default';
      return plans[key] || plans.default;
    }
    return null;
  },

  /********************************************
   * FOLLOW-UP HANDLER
   ********************************************/
  isFollowUp(input) {
    if (this.conversationHistory.length < 2) return false;
    // Short, continuation-like input
    if (input.length < 40 && !this.detectTopic(input)) return true;
    if (/^(what about|and|how about|why|so|more|tell me more|like|e\.g|such as)\b/.test(input)) return true;
    return false;
  },

  followUpResponse(input, topic) {
    // Use last topic if no new topic
    const activeTopic = topic || this.lastTopic;
    if (!activeTopic) {
      return "Interesting! 🤔 Could you tell me a bit more about what you'd like to focus on — skills, career, habits, or speaking? I'll give you a deeper answer.";
    }
    this.lastTopic = activeTopic;
    const deep = {
      webdev: "Let's go deeper into web development! 🛠️ Master this order: <strong>HTML (structure)</strong> → <strong>CSS (style)</strong> → <strong>JavaScript (behavior)</strong> → <strong>React (apps)</strong> → <strong>Node.js (backend)</strong>. Build one small project per stage and keep a GitHub portfolio.",
      skills: "For deep skill growth: use the <strong>Feynman Technique</strong> — explain the concept in simple terms, find your gaps, then re-study those gaps. Pair it with <strong>spaced repetition</strong> for long-term memory. Our <strong>courses</strong> have exactly this structure! 📚",
      career: "Digging deeper into careers: the strongest candidates combine <strong>hard skills</strong> (technical) + <strong>soft skills</strong> (communication, leadership). Map your skills to a <strong>Career Roadmap</strong>, build proof (portfolio/projects), and practice articulating your value. 🚀",
      habits: "To build habits that stick, remember the <strong>Habit Loop</strong>: Cue → Craving → Response → Reward. Make the cue obvious, the action easy (start with 2 minutes), and the reward immediate. Our <strong>Habit Tracker</strong> gamifies this with XP and streaks! 🔥",
      speaking: "For speaking confidence: record a 60-second video daily, note ONE improvement, and redo it. Use the 3-point structure (opening, body, conclusion) and practice with our <strong>Public Speaking</strong> module. Progress compounds fast! 🎤",
      creativity: "To boost creativity: practice <strong>divergent thinking</strong> — generate 10 ideas before judging any. Then <strong>convergent thinking</strong> — narrow to the best. Our <strong>Creativity Challenges</strong> train both! 🎨",
      motivation: "Staying motivated is about <strong>systems, not willpower</strong>. Reduce friction to start, celebrate small wins, and track progress visibly (XP/streaks help!). Your <strong>Dashboard</strong> shows how far you've come. 💪"
    };
    return deep[activeTopic] || this.structuredAnswer(input, activeTopic, this.detectIntent(input));
  },

  /********************************************
   * STRUCTURED LOGIC-AWARE ANSWER
   ********************************************/
  structuredAnswer(input, topic, intent) {
    // Store last topic for follow-ups
    if (topic) this.lastTopic = topic;

    const base = this.topicKnowledge(topic);

    if (!base) {
      // No topic matched — ask clarifying question logically
      return this.clarify(input);
    }

    // Build answer based on intent
    switch (intent) {
      case 'definition':
        return `<strong>📖 ${base.name}</strong><br>${base.definition}<br><br><strong>💡 Why it matters:</strong> ${base.importance}<br><br>${base.action}`;
      case 'why':
        return `<strong>❓ Why ${base.name.toLowerCase()} matters</strong><br>${base.importance}<br><br><strong>✓ What to do:</strong> ${base.action}`;
      case 'howto':
        return `<strong>🛠️ How to improve ${base.name.toLowerCase()}</strong><br>${base.definition}<br><br><strong>📋 Action steps:</strong><br>${base.action.replace(/\. /g, '.<br>')}`;
      case 'list':
        return `<strong>📋 Key points about ${base.name}</strong><br>${base.bullets || base.action}`;
      case 'plan':
        return this.tryStudyPlan(`make a study plan for ${topic}`, topic) || `<strong>📘 ${base.name} plan</strong><br>${base.action}`;
      case 'advice':
      case 'question':
      case 'statement':
      default:
        return `<strong>🎯 ${base.name}</strong><br>${base.definition}<br><br><strong>💡 Advice:</strong> ${base.action}`;
    }
  },

  topicKnowledge(topic) {
    const knowledge = {
      webdev: {
        name: 'Web Development',
        definition: 'Web development is building websites and web apps. It splits into <strong>frontend</strong> (what users see — HTML, CSS, JavaScript, React) and <strong>backend</strong> (servers, databases, APIs — Node.js, Python, SQL).',
        importance: 'The web is everywhere — every business needs a web presence. Web development offers high demand, remote work, and creative + logical problem-solving.',
        action: 'Start with <strong>HTML & CSS</strong> (our <strong>HTML & CSS Fundamentals</strong> course covers this in detail), then <strong>JavaScript</strong>, then build 3 real projects. Put them on GitHub. Follow the Web Developer roadmap in <strong>Career Roadmaps</strong>.',
        bullets: '• <strong>Frontend</strong>: HTML, CSS, JS, React<br>• <strong>Backend</strong>: Node.js, Python, databases<br>• <strong>Key skills</strong>: responsive design, Git, APIs<br>• Start with: our <strong>HTML & CSS</strong> course!'
      },
      datascience: {
        name: 'Data Science & AI',
        definition: 'Data science turns raw data into insights using statistics, Python, SQL, and machine learning. AI/ML has two main pillars: <strong>supervised learning</strong> (labeled data) and <strong>unsupervised learning</strong> (finding patterns).',
        importance: 'Data-driven decisions are the gold standard in business. AI skills are the most in-demand technical skills — salaries are high and the field keeps growing.',
        action: 'Learn <strong>Python</strong>, then <strong>pandas + SQL</strong>, then <strong>statistics & visualization</strong>, then <strong>ML basics</strong>. Do the Data Scientist roadmap in <strong>Career Roadmaps</strong> and build a Kaggle project portfolio.',
        bullets: '• <strong>Foundations</strong>: Python, SQL, statistics<br>• <strong>Analysis</strong>: pandas, visualization<br>• <strong>AI/ML</strong>: regression, classification, neural nets<br>• Practical: one real dataset project!'
      },
      skills: {
        name: 'Skill Development',
        definition: 'Learning a skill requires <strong>active practice</strong>, not passive reading. The cycle is: Study → Practice → Apply → Teach → Repeat.',
        importance: 'Skills are the currency of career success. The most valuable skills combine technical ability with communication, creativity, and emotional intelligence.',
        action: 'Use the <strong>Skill Assessment</strong> to find strengths, then pick ONE skill, practice 20-60 min daily, apply it in a project, and check the <strong>Career Roadmaps</strong> for structured paths. Use the <strong>Habit Tracker</strong> to stay consistent.',
        bullets: '• <strong>Active recall</strong> > re-reading<br>• <strong>Spaced repetition</strong> for memory<br>• <strong>Learn → Practice → Teach</strong><br>• 20 minutes daily beats 3 hours weekly'
      },
      career: {
        name: 'Career Planning',
        definition: 'Career planning means aligning your skills, interests, and values with a career path, then building proof of your abilities (projects, experience, network).',
        importance: 'A clear direction prevents wasted effort. Recruiters value practical proof (portfolio, projects) plus strong soft skills (communication, teamwork).',
        action: 'Do the <strong>Skill Assessment</strong>, pick a matching <strong>Career Roadmap</strong>, build 2-3 portfolio projects, craft a strong resume/LinkedIn, and practice interviews using the STAR method.',
        bullets: '• <strong>Hard skills</strong>: technical abilities<br>• <strong>Soft skills</strong>: communication, leadership<br>• <strong>Proof</strong>: portfolio, projects, certificates<br>• <strong>Network</strong>: 70% of jobs come from connections'
      },
      habits: {
        name: 'Habit Building',
        definition: 'A habit is a behavior loop: <strong>Cue → Craving → Response → Reward</strong>. To build habits: make cues obvious, actions easy, rewards satisfying.',
        importance: 'Consistency beats intensity. Small daily 1% improvements compound into massive transformation over months and years.',
        action: 'Start with 2-3 tiny habits (5-10 min). Log them daily in the <strong>Habit Tracker</strong>, build a streak, and let the XP system reinforce you. If you miss a day, never miss two.',
        bullets: '• <strong>Make it obvious</strong> — visible cues<br>• <strong>Make it easy</strong> — 2-minute start<br>• <strong>Make it satisfying</strong> — immediate reward<br>• <strong>Never miss twice</strong>'
      },
      speaking: {
        name: 'Public Speaking',
        definition: 'Public speaking is communicating ideas to an audience with clarity, confidence, and impact. Structure: strong opening → 3 key points → memorable close.',
        importance: 'Speaking confidence transfers to interviews, presentations, leadership, and networking. It is the #1 most-cited fear — but also the #1 most trainable skill.',
        action: 'Practice daily with the <strong>Public Speaking</strong> module — pick a topic, deliver 2 minutes, record yourself, and review. Build stage presence with posture, eye contact, and voice variation.',
        bullets: '• <strong>Preparation</strong> beats natural talent<br>• Record + review yourself daily<br>• Pause for impact; vary pace and pitch<br>• Eye contact builds trust'
      },
      creativity: {
        name: 'Creativity & Innovation',
        definition: 'Creativity is generating novel, useful ideas. It combines <strong>divergent thinking</strong> (many ideas) with <strong>convergent thinking</strong> (picking the best).',
        importance: 'Creativity drives problem-solving and innovation — the most future-proof skill in an AI world. It is a trainable muscle, not a fixed talent.',
        action: 'Try the <strong>Creativity Challenges</strong> — brainstorm 10 ideas, reverse-think problems, and practice daily. Combine unrelated concepts; that is where innovation lives.',
        bullets: '• <strong>Quantity</strong> before quality in brainstorming<br>• <strong>Reverse thinking</strong> reveals solutions<br>• <strong>Constraints</strong> actually boost creativity<br>• Cross-pollinate ideas from different fields'
      },
      motivation: {
        name: 'Motivation & Growth Mindset',
        definition: 'Motivation is driven by <strong>autonomy</strong> (control), <strong>mastery</strong> (progress), and <strong>purpose</strong> (meaning). A growth mindset believes abilities are developed through effort.',
        importance: 'Motivation determines whether you keep going when things get hard. Systems (habits, tracking) beat willpower over the long run.',
        action: 'Set a compelling goal, break it into small wins, track progress (XP, streaks), and reframe failures as feedback. Check your <strong>Dashboard</strong> to see how far you have come.',
        bullets: '• <strong>Autonomy</strong> — choose your path<br>• <strong>Mastery</strong> — visible progress<br>• <strong>Purpose</strong> — connect to your why<br>• <strong>Systems</strong> beat willpower'
      },
      assessment: {
        name: 'Skill Assessment',
        definition: 'A skill assessment measures your current level across dimensions like learning style, problem-solving, speaking, creativity, time management, and habits.',
        importance: 'Self-knowledge is a superpower. Knowing your strengths and gaps helps you focus on the right skills and choose the best career path.',
        action: 'Take the <strong>Skill Assessment</strong> on the Assess page. Get your score, read the improvement theories for weak areas, then follow the recommended <strong>Career Roadmap</strong>.',
        bullets: '• Measures 6 skill dimensions<br>• Identifies strengths and gaps<br>• Gives improvement theories<br>• Recommends career paths'
      },
      roadmap: {
        name: 'Career Roadmaps',
        definition: 'Career roadmaps are structured step-by-step paths from beginner to professional in a chosen field — with skills, projects, and milestones at each stage.',
        importance: 'A roadmap removes guesswork. Instead of "what do I learn?", you always know the next 3 steps.',
        action: 'Open the <strong>Career Roadmaps</strong> page, pick a path (Web Dev, UI/UX, Data Science, Entrepreneur, and more), check off steps as you complete them, and track your progress.',
        bullets: '• 8+ career paths with visuals<br>• Flowchart visualizations<br>• Step checklists you can check off<br>• Salary & skill-level info'
      },
      finance: {
        name: 'Personal Finance',
        definition: 'Personal finance is managing money well: budgeting (50/30/20 rule), building an emergency fund (3-6 months of expenses), and investing early for compounding growth.',
        importance: 'Financial literacy reduces stress and gives you freedom. Compounding means the earlier you start, the more your money grows.',
        action: 'Create a simple budget, automate savings ("pay yourself first"), build an emergency fund, then start small with index funds. Track spending for 30 days first.',
        bullets: '• <strong>50/30/20</strong> — needs/wants/savings<br>• <strong>Emergency fund</strong> — 3-6 months<br>• <strong>Compound</strong> — start early, diversify'
      },
      health: {
        name: 'Health & Wellness',
        definition: 'Health is the foundation of performance: 7-9 hours of sleep, regular exercise (150 min/week), balanced nutrition, and stress management.',
        importance: 'Your brain and body are 80% of your learning capacity. Sleep consolidates memory; exercise boosts focus; nutrition fuels energy.',
        action: 'Prioritize sleep (consistent schedule), move daily, eat whole foods, stay hydrated, and practice mindfulness. Use our <strong>Habit Tracker</strong> to make healthy habits automatic.',
        bullets: '• <strong>Sleep 7-9h</strong> — memory consolidation<br>• <strong>Exercise</strong> — 150 min/week<br>• <strong>Hydration</strong> — brain fuel<br>• <strong>Stress</strong> — manage to prevent burnout'
      }
    };
    return knowledge[topic] || null;
  },

  clarify(input) {
    const suggestions = [
      "That's an interesting topic! 🤔 To give you a precise answer, could you tell me which area you mean — <strong>skills</strong>, <strong>career</strong>, <strong>habits</strong>, <strong>speaking</strong>, <strong>creativity</strong>, or <strong>study planning</strong>? For example: \"How do I improve my public speaking?\" 🎤",
      "Great question! 💡 I want to give you an accurate, useful answer. Which of these is closest? <strong>Learning a skill</strong>, <strong>choosing a career</strong>, <strong>building habits</strong>, or <strong>beating procrastination</strong>? The more specific, the better I can help! 🚀",
      "I'm here to help with logic and clear steps! 🧠 Try asking like: \"What is the difference between frontend and backend?\" or \"Make me a study plan for web development\" or \"Why do I procrastinate?\". What are you working on right now?"
    ];
    return this.pick(suggestions);
  }
};

function cap(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// =============================================
// COURSE HELPERS
// =============================================
function getCourseById(id) {
  if (typeof COURSES === 'undefined') return null;
  return COURSES.find(c => c.id === id) || null;
}

function getCourseProgress(id) {
  if (!state.courseProgress[id]) {
    state.courseProgress[id] = { completedLessons: [], quizScores: {}, completed: false, certificateEarned: false };
  }
  return state.courseProgress[id];
}

function isLessonCompleted(courseId, lessonIndex) {
  const progress = getCourseProgress(courseId);
  return progress.completedLessons.includes(lessonIndex);
}

function markLessonComplete(courseId, lessonIndex) {
  const progress = getCourseProgress(courseId);
  if (!progress.completedLessons.includes(lessonIndex)) {
    progress.completedLessons.push(lessonIndex);
    addXP(15);
    saveState();
    updateAllUI();
  }
}

// Support per-question records so course-detail can render analysis
function getQuizQuestionRecord(courseId, lessonIndex, questionIndex) {
  const progress = getCourseProgress(courseId);
  if (!progress.quizRecords) progress.quizRecords = {};
  if (!progress.quizRecords[lessonIndex]) progress.quizRecords[lessonIndex] = [];
  return progress.quizRecords[lessonIndex];
}

function saveQuizScore(courseId, lessonIndex, score, total) {
  const progress = getCourseProgress(courseId);
  progress.quizScores[lessonIndex] = { score, total };
  if (score >= total * 0.6) {
    // Passed — mark lesson complete
    if (!progress.completedLessons.includes(lessonIndex)) {
      progress.completedLessons.push(lessonIndex);
      addXP(15);
    }
    addXP(20);
    showToast('✅ Quiz passed! +20 XP');
    // If all lessons now complete, auto-complete course + issue certificate
    const course = getCourseById(courseId);
    if (course && progress.completedLessons.length >= course.lessons.length) {
      completeCourse(courseId);
    }
  } else {
    showToast('📖 Review the lesson and try again.');
  }
  saveState();
  updateAllUI();
}

function getCourseCompletionPercent(courseId) {
  const course = getCourseById(courseId);
  if (!course) return 0;
  const progress = getCourseProgress(courseId);
  return Math.round((progress.completedLessons.length / course.lessons.length) * 100);
}

function isCourseCompleted(courseId) {
  const course = getCourseById(courseId);
  if (!course) return false;
  const progress = getCourseProgress(courseId);
  return progress.completedLessons.length >= course.lessons.length;
}

function completeCourse(courseId) {
  const course = getCourseById(courseId);
  if (!course) return;
  const progress = getCourseProgress(courseId);
  if (isCourseCompleted(courseId) && !progress.certificateEarned) {
    progress.completed = true;
    progress.certificateEarned = true;
    state.completedCourseIds.push(courseId);
    state.certificates[courseId] = {
      courseId,
      courseTitle: course.title,
      category: course.category,
      earnedAt: new Date().toISOString(),
      code: 'SF-' + courseId.toUpperCase() + '-' + Date.now().toString(36).toUpperCase()
    };
    addXP(100);
    checkBadges();
    showToast(`🎉 Course Completed: ${course.title}! +100 XP`);
    saveState();
    updateAllUI();
    return state.certificates[courseId];
  }
  return null;
}

function getCourseCategoryIcon(category) {
  const icons = {
    'technology': '💻',
    'business': '📈',
    'creativity': '🎨',
    'communication': '🗣️',
    'personal': '🌱'
  };
  return icons[category] || '📚';
}

// =============================================
// NOTIFICATION HELPERS
// =============================================
function setNotificationsEnabled(enabled) {
  state.notificationsEnabled = !!enabled;
  saveState();
}

function syncNotificationToggle() {
  const notifToggle = document.getElementById('notifToggle');
  if (notifToggle) {
    if (state.notificationsEnabled) notifToggle.classList.add('active');
    else notifToggle.classList.remove('active');
  }
}

function requestNotificationPermission() {
  if (!('Notification' in window)) {
    showToast('ℹ️ Notifications are not supported in this browser.');
    return Promise.resolve(false);
  }
  if (Notification.permission === 'granted') return Promise.resolve(true);
  if (Notification.permission === 'denied') {
    showToast('⚠️ Notifications are blocked. Enable them in browser settings.');
    return Promise.resolve(false);
  }
  // Permission is 'default' — ask the browser (async) and resolve the outcome
  return Notification.requestPermission().then(permission => {
    if (permission === 'granted') {
      showToast('🔔 Notifications enabled!');
      return true;
    }
    showToast('ℹ️ Notifications not enabled.');
    return false;
  }).catch(() => false);
}

function fireNotification(title, body) {
  if (!state.notificationsEnabled) return;
  if (!('Notification' in window)) return;
  if (Notification.permission === 'granted') {
    try {
      const n = new Notification(title, { body: body, icon: '⚡' });
      setTimeout(() => n.close(), 5000);
    } catch (e) { /* ignore */ }
  }
}

let notificationSchedulerInterval = null;

// Daily habit-reminder scheduler (fires when notifications are enabled)
function initNotificationScheduler() {
  if (!state.notificationsEnabled) return;
  if (!('Notification' in window)) return;
  if (!state.user || !state.user.isLoggedIn) return;
  // Only arm when the browser permission is already granted — never prompt
  // automatically on page load (that would be intrusive).
  if (Notification.permission !== 'granted') return;

  // Clear any existing scheduler so we never stack duplicate intervals.
  if (notificationSchedulerInterval) {
    clearInterval(notificationSchedulerInterval);
    notificationSchedulerInterval = null;
  }

  const check = () => {
    if (!state.notificationsEnabled) return;
    if (!state.user || !state.user.isLoggedIn) return;
    const hour = new Date().getHours();
    // Send a gentle reminder within the daytime window (9am - 9pm)
    if (hour >= 9 && hour <= 21) {
      const today = new Date().toDateString();
      const lastReminder = localStorage.getItem('skillforge_reminder_date');
      if (lastReminder !== today) {
        const remaining = state.habits.filter(h => !h.completed).length;
        if (remaining > 0) {
          fireNotification(
            '⏰ Skill Forge Reminder',
            `You have ${remaining} habit${remaining > 1 ? 's' : ''} left today. Keep your streak alive! 🔥`
          );
        }
        localStorage.setItem('skillforge_reminder_date', today);
      }
    }
  };

  check();
  notificationSchedulerInterval = setInterval(check, 30 * 60 * 1000); // every 30 minutes
}

// Auto-arm the scheduler on page load so a reload keeps reminders working.
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initNotificationScheduler);
} else {
  initNotificationScheduler();
}

// =============================================
// NAVIGATION
// =============================================
function navigateTo(page) {
  // Add page transition
  document.body.classList.add('page-exit');
  setTimeout(() => {
    window.location.href = page;
  }, 300);
}

// =============================================
// AUTH ROUTE GUARD (Login is compulsory)
// Protects every page except index.html. Users must be
// logged in AND email-verified to use any feature page.
// =============================================
function isAuthProtectedPage(page) {
  const protectedPages = [
    'dashboard.html',
    'profile.html',
    'certificates.html',
    'assessment.html',
    'courses.html',
    'course-detail.html',
    'creativity.html',
    'speaking.html',
    'habits.html',
    'chat.html',
    'roadmaps.html'
  ];
  return protectedPages.indexOf(page) !== -1;
}

function initAuthGuard() {
  const current = window.location.pathname.split('/').pop() || 'index.html';
  if (!isAuthProtectedPage(current)) return; // index.html stays public

  const loggedIn = !!(state.user && state.user.isLoggedIn);
  const verified = !!(state.user && state.user.verified);

  if (!loggedIn || !verified) {
    // Remember where the user wanted to go, then send them to login
    sessionStorage.setItem('skillforge_auth_next', current + window.location.search);
    window.location.href = 'index.html?login=required';
  }
}

// =============================================
// AUTO-RUN ROUTE GUARD
// Runs as soon as shared.js loads (state is already loaded from
// state.js, which is included first on every page). Protected pages
// redirect to the login screen before any feature content renders.
// =============================================
if (typeof window !== 'undefined' && typeof document !== 'undefined' &&
    typeof sessionStorage !== 'undefined' && typeof state !== 'undefined') {
  // Give auth.js a chance to have defined helpers (it is included before
  // shared.js on every page), but delay slightly so DOM scripts still run.
  try {
    initAuthGuard();
  } catch (e) {
    // If the guard can't run for any reason, fall back to DOMContentLoaded.
    document.addEventListener('DOMContentLoaded', function () {
      try { initAuthGuard(); } catch (e2) { /* ignore */ }
    });
  }
}

// =============================================
// ESCAPE HTML
// =============================================
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Add one share action to every page's shared navigation.
function initShareButton() {
  const navActions = document.querySelector('.nav-actions');
  if (!navActions || document.getElementById('shareProjectBtn')) return;

  const shareButton = document.createElement('button');
  shareButton.type = 'button';
  shareButton.id = 'shareProjectBtn';
  shareButton.className = 'nav-btn share-project-btn';
  shareButton.textContent = '↗ Share';
  shareButton.setAttribute('aria-label', 'Share this Skill Forge page');
  shareButton.title = 'Share this Skill Forge page';
  shareButton.addEventListener('click', async function() {
    const shareData = {
      title: document.title || 'Skill Forge AI',
      text: 'Explore Skill Forge AI',
      url: window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        return;
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(shareData.url);
      } else {
        const copyArea = document.createElement('textarea');
        copyArea.value = shareData.url;
        copyArea.setAttribute('readonly', '');
        copyArea.style.position = 'fixed';
        copyArea.style.opacity = '0';
        document.body.appendChild(copyArea);
        copyArea.select();
        document.execCommand('copy');
        copyArea.remove();
      }
      showToast('🔗 Link copied to clipboard!');
    } catch (error) {
      if (error && error.name === 'AbortError') return;
      showToast('Unable to share this link. Please copy the URL from your browser.');
    }
  });

  const mobileMenuButton = navActions.querySelector('.mobile-menu-btn');
  navActions.insertBefore(shareButton, mobileMenuButton || null);
}

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', initShareButton);
}

// =============================================
// UI UPDATES
// =============================================
function updateAllUI() {
  const loggedIn = !!(state.user && state.user.isLoggedIn);

  // Update all XP/level/badge displays across pages
  const elements = {
    'heroXP': loggedIn ? state.xp : 0,
    'heroLevel': loggedIn ? state.level : 1,
    'heroStreak': loggedIn ? state.streak : 0,
    'heroBadges': loggedIn ? getBadgeCount() : 0,
    'dashXP': loggedIn ? state.xp : 0,
    'dashLevel': loggedIn ? state.level : 1,
    'dashStreak': loggedIn ? state.streak : 0,
    'dashBadges': loggedIn ? getBadgeCount() : 0,
    'dashAssessments': loggedIn ? state.assessmentCount : 0,
    'dashChats': loggedIn ? state.chatCount : 0,
    'dashCourses': loggedIn ? ((state.completedCourseIds || []).length || Object.values(state.courseProgress || {}).filter(p => p.completedLessons.length > 0).length) : 0,
    'dashCerts': loggedIn ? Object.keys(state.certificates || {}).length : 0,
    'profileLevel': loggedIn ? state.level : 1,
    'profileXP': loggedIn ? state.xp : 0,
    'profileBadges': loggedIn ? getBadgeCount() : 0,
    'profileStreak': loggedIn ? state.streak + ' days' : '0 days',
    'profileName': loggedIn ? state.user.name : 'Explorer',
    'profileEmail': loggedIn ? state.user.email : 'explorer@skillforge.ai'
  };

  for (const [id, value] of Object.entries(elements)) {
    const el = document.getElementById(id);
    if (el) {
      el.textContent = value;
    }
  }

  // Hero XP bar
  const heroXPFill = document.getElementById('heroXPFill');
  const heroNextLevel = document.getElementById('heroNextLevel');
  const heroXPProgress = document.getElementById('heroXPProgress');
  if (heroXPFill && heroNextLevel && heroXPProgress) {
    if (loggedIn) {
      const xpForNext = state.level * 100;
      const xpPercent = Math.min(100, (state.xp / xpForNext) * 100);
      heroXPFill.style.width = xpPercent + '%';
      heroNextLevel.textContent = state.level + 1;
      heroXPProgress.textContent = `${state.xp} / ${xpForNext} XP`;
    } else {
      heroXPFill.style.width = '0%';
      heroNextLevel.textContent = '2';
      heroXPProgress.textContent = '0 / 100 XP';
    }
  }

  // Toggle hero stats card vs guest CTA based on login state
  const heroStatsCard = document.getElementById('heroStatsCard');
  const heroGuestCTA = document.getElementById('heroGuestCTA');
  if (heroStatsCard && heroGuestCTA) {
    if (loggedIn) {
      heroStatsCard.style.display = 'block';
      heroGuestCTA.style.display = 'none';
    } else {
      heroStatsCard.style.display = 'none';
      heroGuestCTA.style.display = 'flex';
    }
  }

  // Hide quick profile panel for guests
  const profilePanel = document.getElementById('profilePanel');
  if (profilePanel && !loggedIn) {
    profilePanel.classList.remove('open');
  }

  // Theme
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.textContent = state.theme === 'dark' ? '🌙' : '☀️';
  }
  document.documentElement.setAttribute('data-theme', state.theme);

  // Auth UI
  if (typeof updateAuthUI === 'function') {
    updateAuthUI();
  }

  // Notifications toggle
  syncNotificationToggle();

  // Badges
  updateBadges();
}

function updateBadges() {
  const badges = document.querySelectorAll('.badge-item');
  badges.forEach(badge => {
    const badgeId = badge.dataset.badge;
    if (state.badges[badgeId]) {
      badge.classList.remove('locked');
      badge.classList.add('unlocked');
    } else {
      badge.classList.add('locked');
      badge.classList.remove('unlocked');
    }
  });
}

// =============================================
// SCROLL ANIMATIONS
// =============================================
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

// =============================================
// PAGE TRANSITION
// =============================================
function initPageTransition() {
  document.body.classList.add('page-enter');
  setTimeout(() => {
    document.body.classList.remove('page-enter');
  }, 100);
}

// =============================================
// GENERATE UNIQUE ID
// =============================================
function generateId() {
  return 'id_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

