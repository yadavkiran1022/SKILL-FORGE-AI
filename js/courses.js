// COURSES DATASET PART 1 - Categories + Technology 1-5
const COURSE_CATEGORIES = [
  { id: 'tech', name: 'Technology', icon: '💻', color: '#3b82f6' },
  { id: 'business', name: 'Business & Career', icon: '📈', color: '#10b981' },
  { id: 'creativity', name: 'Creativity & Design', icon: '🎨', color: '#8b5cf6' },
  { id: 'communication', name: 'Communication & Soft Skills', icon: '🗣️', color: '#f59e0b' },
  { id: 'personal', name: 'Personal Development', icon: '🌱', color: '#ef4444' }
];

const COURSES = [
  { id:'tech-html', category:'tech', icon:'🌐', title:'HTML & CSS Fundamentals', description:'Learn to build beautiful, structured web pages from scratch with modern HTML5 and CSS3.', duration:'4 weeks', level:'Beginner', lessons:[
    { title:'HTML Basics', theory:'HTML (HyperText Markup Language) is the skeleton of every website. It uses tags like <h1>, <p>, and <div> to structure content. Semantic tags (<header>, <nav>, <main>, <footer>) make code readable and accessible.', quiz:[
      { q:'What does HTML stand for?', options:['HyperText Markup Language','HighText Machine Language','Hyperlink Text Model Language','Home Tool Markup Language'], answer:0 },
      { q:'Which tag creates a paragraph?', options:['<h1>','<p>','<div>','<span>'], answer:1 },
      { q:'Semantic tags help with:', options:['Faster loading','Readability and accessibility','Smaller file size','Better colors'], answer:1 }
    ]},
    { title:'CSS Styling', theory:'CSS controls how HTML looks. Selectors target elements: element (p), class (.card), id (#hero). The box model (margin, border, padding, content) defines spacing. Flexbox and Grid create layouts.', quiz:[
      { q:'Which CSS selector targets a class?', options:['#id','.class','element','*'], answer:1 },
      { q:'Flexbox is best used for:', options:['One-dimensional layouts','Printing','Databases','Backend logic'], answer:0 },
      { q:'CSS custom properties start with:', options:['$','@','--','#'], answer:2 }
    ]},
    { title:'Responsive Design', theory:'Responsive design makes websites work on any screen. Media queries (@media) apply styles based on viewport width. Mobile-first design starts small and scales up.', quiz:[
      { q:'Media queries respond to:', options:['Viewport size','Font choice','Server speed','User password'], answer:0 },
      { q:'A mobile-first approach means:', options:['Starting with desktop','Starting small and scaling up','No styling','Only apps'], answer:1 },
      { q:'Which is a flexible unit?', options:['px','pt','vw','cm'], answer:2 }
    ]}
  ]},
  { id:'tech-js', category:'tech', icon:'⚡', title:'JavaScript Essentials', description:'Master the language of the web — variables, functions, DOM manipulation, and events.', duration:'5 weeks', level:'Beginner', lessons:[
    { title:'Variables & Data Types', theory:'JavaScript stores data in variables using let, const, and var. Types include strings, numbers, booleans, arrays, and objects. const values cannot be reassigned.', quiz:[
      { q:'Which keyword prevents reassignment?', options:['let','var','const','static'], answer:2 },
      { q:'An array is written with:', options:['{}','[]','()','<>'], answer:1 },
      { q:'What type is true?', options:['string','number','boolean','object'], answer:2 }
    ]},
    { title:'Functions & Logic', theory:'Functions are reusable blocks of code. Arrow functions (() => {}) are concise. Conditionals, loops, and logical operators (&&, ||) control program flow.', quiz:[
      { q:'An arrow function looks like:', options:['function()','=> {}','=>()','() => {}'], answer:3 },
      { q:'Which operator means AND?', options:['||','&&','!','==='], answer:1 },
      { q:'return inside a function:', options:['Ends the loop','Sends back a value','Deletes it','Logs to console'], answer:1 }
    ]},
    { title:'DOM & Events', theory:'The DOM represents your page. Use document.getElementById() to select elements, addEventListener() to handle clicks and keypresses, and innerHTML to update content.', quiz:[
      { q:'Which selects an element by ID?', options:['getElementByClass','getElementById','queryId','selectId'], answer:1 },
      { q:'addEventListener listens for:', options:['Events','Errors','Colors','Comments'], answer:0 },
      { q:'textContent updates:', options:['Styles','Text inside an element','Page title','Image src'], answer:1 }
    ]}
  ]},
  { id:'tech-python', category:'tech', icon:'🐍', title:'Python for Beginners', description:'Start your programming journey with Python — the most beginner-friendly language.', duration:'4 weeks', level:'Beginner', lessons:[
    { title:'Python Basics', theory:'Python uses indentation instead of braces. Print with print(). Variables need no type declaration. Comments start with #.', quiz:[
      { q:'Python blocks are defined by:', options:['Braces {}','Indentation','Semicolons','Parentheses'], answer:1 },
      { q:'How do you output text?', options:['echo','console.log','print()','display'], answer:2 },
      { q:'Comments in Python start with:', options:['//','#','/*','<!--'], answer:1 }
    ]},
    { title:'Data Structures', theory:'Python has lists [], tuples (), dicts {}, and sets. Lists are ordered and mutable. Dicts store key-value pairs. Use len() for size.', quiz:[
      { q:'A dictionary stores:', options:['Key-value pairs','Only numbers','Fixed sizes','Styles'], answer:0 },
      { q:'len() returns:', options:['Type','Length','First item','Last item'], answer:1 },
      { q:'my_list[1:3] extracts:', options:['One item','Two items','Three items','All items'], answer:1 }
    ]},
    { title:'Functions & Loops', theory:'Define functions with def name():. Loops: for item in list: and while condition:. The range() function generates sequences.', quiz:[
      { q:'Define a function with:', options:['function','def','fun','fn'], answer:1 },
      { q:'for x in range(3) runs:', options:['2 times','3 times','4 times','Once'], answer:1 },
      { q:'A function returns using:', options:['yield','return','print','end'], answer:1 }
    ]}
  ]},
  { id:'tech-ai', category:'tech', icon:'🤖', title:'AI & Machine Learning Basics', description:'Understand artificial intelligence, how it works, and its real-world applications.', duration:'6 weeks', level:'Intermediate', lessons:[
    { title:'What is AI?', theory:'Artificial Intelligence lets machines mimic human intelligence. Narrow AI performs specific tasks (recommendations, chatbots). Machine Learning is a subset where systems learn from data.', quiz:[
      { q:'Machine Learning means:', options:['Hardcoded rules','Learning from data','Copying humans','Faster computers'], answer:1 },
      { q:'Chatbots are an example of:', options:['General AI','Narrow AI','Super AI','No AI'], answer:1 },
      { q:'Neural networks mimic:', options:['The brain','The heart','A calculator','Memory chips'], answer:0 }
    ]},
    { title:'How Models Learn', theory:'Supervised learning uses labeled data. Unsupervised learning finds patterns without labels. Training optimizes a model to reduce error.', quiz:[
      { q:'Labeled data is used in:', options:['Unsupervised','Supervised','Reinforcement only','All equally'], answer:1 },
      { q:'Features are:', options:['Outputs','Inputs','Errors','Labels only'], answer:1 },
      { q:'Training reduces:', options:['Speed','Error','Data','Models'], answer:1 }
    ]},
    { title:'AI in Daily Life', theory:'AI powers recommendation engines (Netflix, YouTube), voice assistants (Siri, Alexa), fraud detection, and healthcare diagnostics.', quiz:[
      { q:'Recommendation engines are:', options:['Random','AI-driven','Manual','Offline'], answer:1 },
      { q:'Voice assistants use:', options:['NLP','Photoshop','Spreadsheets','Only GPS'], answer:0 },
      { q:'AI can help in healthcare by:', options:['Cooking','Diagnostics','Driving buses','Building houses'], answer:1 }
    ]}
  ]},
  { id:'tech-cyber', category:'tech', icon:'🔐', title:'Cybersecurity Awareness', description:'Protect yourself online — passwords, phishing, and safe browsing habits.', duration:'3 weeks', level:'Beginner', lessons:[
    { title:'Password Security', theory:'Strong passwords are long and unique. Use a passphrase with numbers and symbols. Never reuse passwords across sites. Enable 2-factor authentication whenever possible.', quiz:[
      { q:'A strong password is:', options:['Short and simple','Long and unique','Your birthday','123456'], answer:1 },
      { q:'Reusing passwords is:', options:['Safe','Risky','Recommended','Fastest'], answer:1 },
      { q:'2FA adds:', options:['A second check','More storage','Faster speed','More colors'], answer:0 }
    ]},
    { title:'Phishing Attacks', theory:'Phishing tricks you into revealing data via fake emails/links. Red flags: urgency, unknown senders, spelling errors, and mismatched URLs.', quiz:[
      { q:'Phishing is:', options:['A fishing sport','A scam to steal data','A type of virus','A firewall'], answer:1 },
      { q:'A red flag in emails is:', options:['Known sender','Urgency','Spell-checked text','Official logos'], answer:1 },
      { q:'Before clicking a link:', options:['Click fast','Hover to verify URL','Ignore it','Forward it'], answer:1 }
    ]},
    { title:'Safe Browsing', theory:'Use HTTPS (lock icon), keep software updated, avoid public Wi-Fi for sensitive transactions, use a VPN when needed.', quiz:[
      { q:'HTTPS means:', options:['Encrypted connection','Faster internet','Free access','No ads'], answer:0 },
      { q:'Updates matter because they:', options:['Add games','Patch security','Slow you down','Cost money'], answer:1 },
      { q:'Public Wi-Fi is:', options:['Always safe','Risky for transactions','Faster','Encrypted'], answer:1 }
    ]}
  ]}
,// COURSES DATASET PART 2 - Technology 6-10

  { id:'tech-data', category:'tech', icon:'📊', title:'Data Science & Analytics', description:'Turn raw data into insights with statistics, visualization, and analysis.', duration:'6 weeks', level:'Intermediate', lessons:[
    { title:'The Data Pipeline', theory:'Data science flows: collect → clean → analyze → visualize → decide. Raw data is messy. Cleaning removes errors and duplicates.', quiz:[
      { q:'The first step is:', options:['Visualize','Collect','Delete','Sell'], answer:1 },
      { q:'Cleaning data means:', options:['Removing errors','Adding colors','Deleting everything','Printing it'], answer:0 },
      { q:'Charts help:', options:['Hide data','Communicate insights','Slow down','Confuse'], answer:1 }
    ]},
    { title:'Statistics Essentials', theory:'Mean is average, median is middle value, mode is most frequent. Standard deviation measures spread. Correlation does not prove causation.', quiz:[
      { q:'The median is:', options:['Average','Middle value','Most frequent','Largest'], answer:1 },
      { q:'Correlation implies:', options:['Causation','Relationship','Randomness','Nothing'], answer:1 },
      { q:'The mode is:', options:['Most frequent','Average','Middle','Total'], answer:0 }
    ]},
    { title:'Data Visualization', theory:'Bar charts compare categories, line charts show trends over time, pie charts show proportions, scatter plots reveal correlations.', quiz:[
      { q:'Line charts are best for:', options:['Trends over time','Categories','Percentages','Nothing'], answer:0 },
      { q:'Scatter plots reveal:', options:['Correlations','Menu items','Passwords','Fonts'], answer:0 },
      { q:'A good chart has:', options:['No labels','Clear message','Many colors','Random data'], answer:1 }
    ]}
  ]},
  { id:'tech-excel', category:'tech', icon:'📗', title:'Excel & Spreadsheets Mastery', description:'Boost productivity with formulas, functions, pivot tables, and data tools.', duration:'3 weeks', level:'Beginner', lessons:[
    { title:'Spreadsheet Basics', theory:'Excel cells hold data and formulas. Formulas start with =. AutoFill copies patterns. Freeze panes keep headers visible.', quiz:[
      { q:'Formulas start with:', options:['#','=','@','$'], answer:1 },
      { q:'AutoFill helps:', options:['Copy patterns','Print','Delete','Color'], answer:0 },
      { q:'Freeze Panes keeps:', options:['Rows hidden','Headers visible','Data locked','Formulas secret'], answer:1 }
    ]},
    { title:'Key Formulas', theory:'SUM adds, AVERAGE averages, COUNT counts, IF makes decisions, VLOOKUP finds values. Use $A$1 for absolute references.', quiz:[
      { q:'SUM does what?', options:['Averages','Adds values','Counts cells','Sorts'], answer:1 },
      { q:'IF is used for:', options:['Decisions','Colors','Printing','Email'], answer:0 },
      { q:'Absolute reference uses:', options:['$','#','@','&'], answer:0 }
    ]},
    { title:'Pivot Tables & Charts', theory:'Pivot tables summarize large datasets quickly. Drag fields to rows/columns/values. Conditional formatting highlights trends.', quiz:[
      { q:'Pivot tables:', options:['Summarize data','Write emails','Draw shapes','Play music'], answer:0 },
      { q:'Conditional formatting:', options:['Deletes cells','Highlights by rules','Sorts randomly','Prints'], answer:1 },
      { q:'Filters help you:', options:['Narrow data','Add columns','Hide sheets','Share files'], answer:0 }
    ]}
  ]},
  { id:'tech-webapp', category:'tech', icon:'🛠️', title:'Web Development with React', description:'Build modern single-page applications using React components and hooks.', duration:'7 weeks', level:'Intermediate', lessons:[
    { title:'React Fundamentals', theory:'React builds UI from components — reusable pieces of code. JSX mixes HTML and JavaScript. State holds data that changes; props pass data between components.', quiz:[
      { q:'React UI is built from:', options:['Files','Components','Images','Plugins'], answer:1 },
      { q:'JSX is:', options:['HTML only','A mix of HTML and JS','CSS','A database'], answer:1 },
      { q:'State is:', options:['Static text','Changing data','A file','A server'], answer:1 }
    ]},
    { title:'Hooks & State', theory:'useState creates state, useEffect handles side effects (fetching, timers), useContext shares data. Hooks start with "use".', quiz:[
      { q:'useState is for:', options:['State','Styling','Routing','Printing'], answer:0 },
      { q:'useEffect handles:', options:['Side effects','Colors','Layout','Fonts'], answer:0 },
      { q:'Hooks start with:', options:['#','use','do','run'], answer:1 }
    ]},
    { title:'Components & Props', theory:'Components are functions returning JSX. Props are arguments passed to components (like attributes). Props are read-only.', quiz:[
      { q:'Props are:', options:['Passed data','Local only','Always mutable','CSS classes'], answer:0 },
      { q:'Props are read-only means:', options:['Cannot change them','Can delete','Only numbers','Global'], answer:0 },
      { q:'Nesting components:', options:['Builds complex UIs','Breaks code','Slows down','Hides data'], answer:0 }
    ]}
  ]},
  { id:'tech-mobile', category:'tech', icon:'📱', title:'Mobile App Development', description:'Learn to design and build mobile apps for Android and iOS.', duration:'6 weeks', level:'Intermediate', lessons:[
    { title:'App Fundamentals', theory:'Mobile apps run on Android (Java/Kotlin) and iOS (Swift). Cross-platform tools (Flutter, React Native) use one codebase for both.', quiz:[
      { q:'Android apps use:', options:['Swift','Kotlin','Only Python','HTML'], answer:1 },
      { q:'Flutter is:', options:['Cross-platform','An iOS only tool','A game','A server'], answer:0 },
      { q:'Navigation means:', options:['Moving between screens','GPS only','Drawing','Backend'], answer:0 }
    ]},
    { title:'UI/UX for Apps', theory:'Design touch-friendly UIs with big buttons and clear spacing. Follow platform conventions. Test usability with real users.', quiz:[
      { q:'Touch targets should be:', options:['Tiny','Large','Invisible','Animated'], answer:1 },
      { q:'Material Design is for:', options:['Android','iOS only','Desktop','Printers'], answer:0 },
      { q:'Usability testing uses:', options:['Real users','Robots','Only developers','Random code'], answer:0 }
    ]},
    { title:'Data & APIs', theory:'Apps fetch data from APIs. REST APIs use JSON. Store local data with databases. Use async calls to keep the UI responsive.', quiz:[
      { q:'APIs provide:', options:['Data','Colors','Fonts','Ads'], answer:0 },
      { q:'REST APIs typically use:', options:['XML only','JSON','CSV','MP3'], answer:1 },
      { q:'Async calls keep:', options:['UI responsive','Files small','Code short','Users logged in'], answer:0 }
    ]}
  ]},
  { id:'tech-cloud', category:'tech', icon:'☁️', title:'Cloud Computing & DevOps', description:'Understand cloud services, deployment, and modern development workflows.', duration:'5 weeks', level:'Intermediate', lessons:[
    { title:'Cloud Basics', theory:'Cloud computing provides on-demand resources over the internet. IaaS, PaaS, SaaS. Providers: AWS, Azure, Google Cloud.', quiz:[
      { q:'SaaS means:', options:['Software as a Service','Servers and Storage','Small apps','System files'], answer:0 },
      { q:'A cloud provider is:', options:['AWS','Photoshop','Excel','Notepad'], answer:0 },
      { q:'Clouds offer:', options:['Scalability','Physical stores','Paper storage','No internet'], answer:0 }
    ]},
    { title:'DevOps & CI/CD', theory:'DevOps combines development and operations. CI/CD automates testing and deployment. Version control (Git) tracks code changes.', quiz:[
      { q:'DevOps merges:', options:['Dev & Ops','Design & Sales','HR & Legal','UI & UX'], answer:0 },
      { q:'Git is for:', options:['Version control','Designing','Testing only','Hosting'], answer:0 },
      { q:'CD in CI/CD means:', options:['Continuous Deployment','Central Data','Code Design','Cloud Docs'], answer:0 }
    ]},
    { title:'Containers & Docker', theory:'Containers package apps with dependencies so they run anywhere. Docker creates containers; Kubernetes orchestrates them.', quiz:[
      { q:'Containers package:', options:['App + dependencies','Only images','Passwords','Logs'], answer:0 },
      { q:'Docker creates:', options:['Containers','Websites','Databases','Emails'], answer:0 },
      { q:'Kubernetes:', options:['Orchestrates containers','Designs UIs','Compiles code','Sends emails'], answer:0 }
    ]}
  ]}
,// COURSES DATASET PART 3 - Business & Career

  { id:'biz-entre', category:'business', icon:'🚀', title:'Entrepreneurship 101', description:'Turn your idea into a startup — validation, MVP, marketing, and funding.', duration:'6 weeks', level:'Beginner', lessons:[
    { title:'Finding & Validating Ideas', theory:'Great startups solve real problems. Validate your idea by interviewing potential customers before building.', quiz:[
      { q:'Great startups solve:', options:['Real problems','Their own hobbies','Only big issues','Theories'], answer:0 },
      { q:'Validation means:', options:['Building fast','Testing with customers','Hiring','Quitting'], answer:1 },
      { q:'Talk to ___ before building:', options:['Customers','Only friends','Nobody','Investors only'], answer:0 }
    ]},
    { title:'Building an MVP', theory:'MVP (Minimum Viable Product) is the simplest version that solves the core problem. Focus on one key feature. Launch fast, iterate.', quiz:[
      { q:'MVP stands for:', options:['Most Valuable Product','Minimum Viable Product','Major Version Plan','Marketing Value'], answer:1 },
      { q:'The MVP should have:', options:['Every feature','One core feature','No features','Only design'], answer:1 },
      { q:'After launching, you should:', options:['Iterate on feedback','Stop','Sell the company','Delete it'], answer:0 }
    ]},
    { title:'Marketing & Sales Basics', theory:'Marketing attracts attention; sales converts it. Identify your target audience and craft a clear value proposition.', quiz:[
      { q:'Marketing attracts:', options:['Attention','Refunds','Employees','Taxes'], answer:0 },
      { q:'A value proposition explains:', options:['Why your product matters','Your logo','Office address','Team names'], answer:0 },
      { q:'Metrics help you:', options:['Learn what works','Hide data','Spend more','Confuse investors'], answer:0 }
    ]}
  ]},
  { id:'biz-marketing', category:'business', icon:'📣', title:'Digital Marketing Strategy', description:'Master SEO, social media, content marketing, and paid ads to grow brands.', duration:'5 weeks', level:'Beginner', lessons:[
    { title:'Digital Marketing Overview', theory:'Digital marketing promotes brands online. Channels: search, social media, email, content. Funnel: awareness → interest → decision → action.', quiz:[
      { q:'The marketing funnel ends with:', options:['Awareness','Action','Interest','Confusion'], answer:1 },
      { q:'Analytics help track:', options:['Performance','Colors','Design','Fonts'], answer:0 },
      { q:'Content marketing uses:', options:['Valuable content','Only ads','Spam','Cold calls'], answer:0 }
    ]},
    { title:'SEO Fundamentals', theory:'SEO (Search Engine Optimization) helps pages rank higher. Use relevant keywords naturally, optimize titles and meta descriptions, build backlinks.', quiz:[
      { q:'SEO improves:', options:['Search rankings','Battery life','File size','Server speed'], answer:0 },
      { q:'Keywords should be:', options:['Relevant and natural','Random','Hidden','Only in images'], answer:0 },
      { q:'Backlinks are:', options:['Links from other sites','Password links','Broken links','Internal only'], answer:0 }
    ]},
    { title:'Social Media & Ads', theory:'Each platform has its audience (LinkedIn for B2B, Instagram for visuals). Paid ads target specific users. A/B testing compares versions.', quiz:[
      { q:'LinkedIn is best for:', options:['B2B and careers','Cooking videos','Memes','Games'], answer:0 },
      { q:'A/B testing means:', options:['Comparing two versions','Deleting content','Hiring two teams','Buying ads'], answer:0 },
      { q:'Paid ads target:', options:['Specific users','Everyone','Only friends','Robots'], answer:0 }
    ]}
  ]},
  { id:'biz-finance', category:'business', icon:'💰', title:'Personal Finance Literacy', description:'Budget, save, invest, and build wealth — essential money skills for life.', duration:'4 weeks', level:'Beginner', lessons:[
    { title:'Budgeting Basics', theory:'A budget tracks income and expenses. The 50/30/20 rule: 50% needs, 30% wants, 20% savings.', quiz:[
      { q:'The 50/30/20 rule covers:', options:['Needs/Wants/Savings','Food/Clothes/Rent','Taxes/Insurance/Invest','All equal'], answer:0 },
      { q:'A budget helps you:', options:['Track money','Earn interest','Avoid taxes','Get loans'], answer:0 },
      { q:'Savings should be:', options:['At least 20%','0%','100%','Only spare change'], answer:0 }
    ]},
    { title:'Saving & Emergency Funds', theory:'An emergency fund covers 3-6 months of expenses. Automate savings — pay yourself first. Use high-yield savings accounts.', quiz:[
      { q:'Emergency funds cover:', options:['3-6 months','1 day','1 year of luxuries','No expenses'], answer:0 },
      { q:'Pay yourself first means:', options:['Save before spending','Buy things first','Pay debts last','Skip saving'], answer:0 },
      { q:'An emergency fund is for:', options:['Unexpected expenses','Vacations','New gadgets','Gifts'], answer:0 }
    ]},
    { title:'Investing for Beginners', theory:'Investing grows money over time. Stocks, bonds, index funds. Compounding earns returns on returns. Start early and diversify.', quiz:[
      { q:'Index funds are:', options:['Diversified investments','Individual stocks','Loans','Cash only'], answer:0 },
      { q:'Compounding means:', options:['Returns on returns','Losing money','Paying interest','Splitting shares'], answer:0 },
      { q:'Diversification reduces:', options:['Risk','Returns','Taxes','Effort'], answer:0 }
    ]}
  ]},
  { id:'biz-resume', category:'business', icon:'📄', title:'Resume & LinkedIn Mastery', description:'Craft a resume and LinkedIn profile that gets you interviews.', duration:'3 weeks', level:'Beginner', lessons:[
    { title:'Resume Structure', theory:'A strong resume has: contact info, summary, skills, experience (with achievements), and education. Use action verbs and quantify results.', quiz:[
      { q:'Use ___ verbs in resumes:', options:['Action','Passive','Weak','Random'], answer:0 },
      { q:'Quantifying results means:', options:['Adding numbers','Removing data','Long sentences','No details'], answer:0 },
      { q:'The summary section:', options:['Highlights your value','Lists hobbies','Repeats resume','Is optional always'], answer:0 }
    ]},
    { title:'Tailoring Applications', theory:'Customize your resume for each job. Match keywords from the job description. ATS scans resumes for keywords.', quiz:[
      { q:'Tailoring means:', options:['Customizing per job','Using one resume','Random edits','No changes'], answer:0 },
      { q:'ATS scans for:', options:['Keywords','Colors','Images','Fonts only'], answer:0 },
      { q:'Match keywords from:', options:['Job description','Random sites','Movies','News'], answer:0 }
    ]},
    { title:'LinkedIn Optimization', theory:'LinkedIn is your professional brand. Use a professional photo, strong headline, detailed experience, and recommendations.', quiz:[
      { q:'Your headline should:', options:['Show value','Be blank','Only say student','List emojis'], answer:0 },
      { q:'Recommendations are:', options:['Endorsements from others','Ads','Auto-generated','Not useful'], answer:0 },
      { q:'Posting insights helps:', options:['Build your brand','Hide your profile','Annoy people','Nothing'], answer:0 }
    ]}
  ]},
  { id:'biz-interview', category:'business', icon:'🤝', title:'Interview Skills That Win', description:'Prepare for interviews — STAR method, common questions, and confidence.', duration:'3 weeks', level:'Beginner', lessons:[
    { title:'Preparing for Interviews', theory:'Research the company, its products, culture, and competitors. Practice common questions aloud. Prepare questions to ask.', quiz:[
      { q:'Before an interview, research:', options:['The company','Your hobbies','Movie times','Weather'], answer:0 },
      { q:'Practice questions:', options:['Aloud','Silently only','Never','Afterwards'], answer:0 },
      { q:'Asking questions shows:', options:['Interest','Confusion','Laziness','Anger'], answer:0 }
    ]},
    { title:'The STAR Method', theory:'STAR answers behavior questions: Situation (context), Task (your goal), Action (what you did), Result (outcome).', quiz:[
      { q:'STAR stands for:', options:['Situation Task Action Result','Speed Time Action Run','Study Test Apply Review','None'], answer:0 },
      { q:'Action describes:', options:['What you did','The problem only','The company','The salary'], answer:0 },
      { q:'Result shows:', options:['Your impact','Your hobbies','Your commute','Your age'], answer:0 }
    ]},
    { title:'Body Language & Confidence', theory:'Confidence shows in posture, eye contact, and tone. Firm handshake, sit up straight, listen actively, pause before answering.', quiz:[
      { q:'Eye contact shows:', options:['Confidence','Fear','Boredom','Anger'], answer:0 },
      { q:'Pausing before answering:', options:['Shows thoughtfulness','Is rude','Means you forgot','Slows things'], answer:0 },
      { q:'Interviews are:', options:['Two-way','One-way','Exams','Monologues'], answer:0 }
    ]}
  ]},
  { id:'biz-project', category:'business', icon:'📋', title:'Project Management Essentials', description:'Plan, execute, and deliver projects on time using proven frameworks.', duration:'5 weeks', level:'Beginner', lessons:[
    { title:'What is Project Management?', theory:'Project management organizes work to achieve goals within constraints (scope, time, budget). A project has a clear start and end.', quiz:[
      { q:'Projects have:', options:['Clear start and end','No goals','Infinite scope','No budget'], answer:0 },
      { q:'The three constraints are:', options:['Scope, time, budget','Speed, color, size','Team, office, chair','None'], answer:0 },
      { q:'Communication is:', options:['Key','Optional','Rare','Avoidable'], answer:0 }
    ]},
    { title:'Planning & Scheduling', theory:'Break work into tasks (WBS), estimate durations, sequence dependencies, and create a timeline. Gantt charts visualize schedules.', quiz:[
      { q:'WBS breaks work into:', options:['Tasks','Colors','Teams','Offices'], answer:0 },
      { q:'Dependencies mean:', options:['Task order matters','Random order','No order','Parallel always'], answer:0 },
      { q:'Milestones mark:', options:['Major progress','Small edits','Breaks','Meetings only'], answer:0 }
    ]},
    { title:'Agile & Scrum', theory:'Agile delivers in small increments (sprints). Scrum roles: Product Owner, Scrum Master, Developers. Daily standups and retrospectives keep teams aligned.', quiz:[
      { q:'Sprints are:', options:['Short cycles','Long years','One-time events','Meetings only'], answer:0 },
      { q:'The Scrum Master:', options:['Facilitates the team','Owns the product','Writes all code','Sells it'], answer:0 },
      { q:'Retrospectives:', options:['Improve the process','End the project','Cancel sprints','Hire people'], answer:0 }
    ]}
  ]},
  { id:'biz-netzwerk', category:'business', icon:'🌐', title:'Networking & Personal Branding', description:'Build meaningful professional relationships and stand out in your field.', duration:'3 weeks', level:'Beginner', lessons:[
    { title:'Why Networking Matters', theory:'Networking opens doors to opportunities, mentors, and knowledge. Most jobs come through connections. Give value first.', quiz:[
      { q:'Most jobs come through:', options:['Connections','Ads only','Cold email','Lottery'], answer:0 },
      { q:'Good networkers give:', options:['Value first','Nothing','Only requests','Money'], answer:0 },
      { q:'Networking requires:', options:['Genuine relationships','Fake friends','Only contacts','No effort'], answer:0 }
    ]},
    { title:'Building Your Brand', theory:'Your personal brand is how others perceive you. Be consistent online, share your expertise, and stay authentic.', quiz:[
      { q:'Your brand is:', options:['How others see you','Your logo only','Your salary','Your school'], answer:0 },
      { q:'Consistency builds:', options:['Trust','Confusion','Doubt','Chaos'], answer:0 },
      { q:'A niche means:', options:['Focus area','Bigger audience','No work','Random topics'], answer:0 }
    ]},
    { title:'Effective Conversations', theory:'Listen actively, ask open-ended questions, remember names, and follow up after meetings within 24-48 hours.', quiz:[
      { q:'Open-ended questions:', options:['Encourage detail','Need yes/no','End talks','Confuse'], answer:0 },
      { q:'Follow up within:', options:['24-48 hours','A month','A year','Never'], answer:0 },
      { q:'Active listening means:', options:['Fully focusing','Checking phones','Interrupting','Planning replies'], answer:0 }
    ]}
  ]},
  { id:'biz-negotiation', category:'business', icon:'⚖️', title:'Negotiation & Persuasion', description:'Win-win negotiation tactics, persuasion principles, and closing deals.', duration:'4 weeks', level:'Intermediate', lessons:[
    { title:'Negotiation Principles', theory:'Negotiation is a dialogue to reach agreement, not a fight. Prepare with your best alternative (BATNA). Aim for win-win outcomes.', quiz:[
      { q:'BATNA is:', options:['Your backup plan','A type of coffee','A contract','A meeting'], answer:0 },
      { q:'Win-win means:', options:['Both benefit','Only you win','Only them win','No deal'], answer:0 },
      { q:'Walk-away point is:', options:['Your limit','Your salary','The start','A break'], answer:0 }
    ]},
    { title:'Persuasion Techniques', theory:'Cialdini principles: reciprocity, scarcity, authority, consistency, liking, social proof. Use logic and emotion together.', quiz:[
      { q:'Scarcity means:', options:['Limited availability','Too many options','Free stuff','No demand'], answer:0 },
      { q:'Social proof uses:', options:['Others actions','Your opinions','Random facts','Silence'], answer:0 },
      { q:'Reciprocity means:', options:['Give to receive','Take always','Avoid others','No exchange'], answer:0 }
    ]},
    { title:'Closing the Deal', theory:'Summarize agreements clearly, confirm next steps, and put key terms in writing. Handle objections by addressing them.', quiz:[
      { q:'Key terms should be:', options:['In writing','Secret','Verbal only','Deleted'], answer:0 },
      { q:'Objections should be:', options:['Addressed','Ignored','Shouted at','Avoided'], answer:0 },
      { q:'Summarizing helps:', options:['Confirm clarity','Confuse','End badly','Delay'], answer:0 }
    ]}
  ]},
  { id:'biz-leadership', category:'business', icon:'🏛️', title:'Leadership & Management', description:'Lead teams effectively — vision, delegation, feedback, and motivation.', duration:'5 weeks', level:'Intermediate', lessons:[
    { title:'Leadership vs Management', theory:'Leaders inspire and set direction; managers organize and execute. Good leaders build trust and empower others.', quiz:[
      { q:'Leaders primarily:', options:['Inspire and set vision','Only assign tasks','Do all work','Avoid people'], answer:0 },
      { q:'Trust is built through:', options:['Consistency','Secrets','Fear','Luck'], answer:0 },
      { q:'Leadership is:', options:['Developable','Born only','Not needed','Random'], answer:0 }
    ]},
    { title:'Delegation & Feedback', theory:'Delegation frees you to focus on strategy. Give specific, timely, constructive feedback — praise in public, correct in private.', quiz:[
      { q:'Delegation means:', options:['Assigning work','Doing everything','Micromanaging','Avoiding work'], answer:0 },
      { q:'Feedback should be:', options:['Specific and timely','Vague','Delayed','Only negative'], answer:0 },
      { q:'Praise should be:', options:['Public','Secret','Rare','Embarrassing'], answer:0 }
    ]},
    { title:'Motivating Teams', theory:'People are motivated by purpose, autonomy, and mastery. Celebrate wins and remove obstacles.', quiz:[
      { q:'Motivation drivers include:', options:['Purpose and autonomy','Only salary','Fear','Long hours'], answer:0 },
      { q:'Celebrating wins:', options:['Boosts morale','Wastes time','Is unnecessary','Demotivates'], answer:0 },
      { q:'Recognize:', options:['Effort and results','Only mistakes','Nothing','Only luck'], answer:0 }
    ]}
  ]},
  { id:'biz-sales', category:'business', icon:'💼', title:'Sales Fundamentals', description:'Learn the sales process — prospecting, discovery, presenting, and closing.', duration:'4 weeks', level:'Beginner', lessons:[
    { title:'The Sales Process', theory:'Sales follows: prospecting → discovery → presentation → handling objections → closing → follow-up. Listen more than you talk.', quiz:[
      { q:'Discovery means:', options:['Learning the need','Talking fast','Selling instantly','Leaving'], answer:0 },
      { q:'Good salespeople:', options:['Listen more','Talk constantly','Ignore needs','Rush'], answer:0 },
      { q:'Follow-up after closing:', options:['Builds relationships','Is pointless','Annoys only','Ends deals'], answer:0 }
    ]},
    { title:'Building Rapport', theory:'Rapport builds trust. Mirror body language, use the customer name, and find common ground.', quiz:[
      { q:'Rapport creates:', options:['Trust','Tension','Distrust','Silence'], answer:0 },
      { q:'People buy from:', options:['People they trust','Strangers','Robots','Who shout'], answer:0 },
      { q:'Common ground means:', options:['Shared interests','Same office','Same age','No talk'], answer:0 }
    ]},
    { title:'Handling Objections', theory:'Objections are buying signals. Acknowledge the concern, ask questions, and address it with evidence.', quiz:[
      { q:'Objections are:', options:['Buying signals','Rejections only','Endings','Mistakes'], answer:0 },
      { q:'First, ___ the objection:', options:['Acknowledge','Ignore','Argue','Hide'], answer:0 },
      { q:'Price objections need:', options:['Value evidence','Discounts only','Silence','Anger'], answer:0 }
    ]}
  ]}
,// COURSES DATASET PART 4 - Creativity & Design

  { id:'cre-graphic', category:'creativity', icon:'🎨', title:'Graphic Design Basics', description:'Learn design principles, color theory, typography, and layout.', duration:'5 weeks', level:'Beginner', lessons:[
    { title:'Design Principles', theory:'Key principles: alignment, contrast, hierarchy, repetition, proximity, balance. These guide the eye and create harmony. White space is as important as content.', quiz:[
      { q:'Hierarchy guides:', options:['The eye','Color','File size','Fonts only'], answer:0 },
      { q:'Contrast creates:', options:['Emphasis','Confusion','Blandness','Noise'], answer:0 },
      { q:'White space is:', options:['Important','Wasteful','Avoidable','An error'], answer:0 }
    ]},
    { title:'Color Theory', theory:'Colors evoke emotions: blue = trust, red = energy, green = growth. Use the color wheel for harmonies: complementary, analogous, triadic.', quiz:[
      { q:'Blue often represents:', options:['Trust','Anger','Hunger','Danger'], answer:0 },
      { q:'Complementary colors are:', options:['Opposite on the wheel','The same','Random','Only black/white'], answer:0 },
      { q:'Good palettes use:', options:['2-3 main colors','Every color','One only','No color'], answer:0 }
    ]},
    { title:'Typography', theory:'Typography is the art of text. Use 2-3 fonts max: a display font for headlines, a body font for text. Serif = formal, sans-serif = modern.', quiz:[
      { q:'Use this many font families:', options:['2-3','10','1 per word','Unlimited'], answer:0 },
      { q:'Serif fonts feel:', options:['Formal','Modern','Loud','Invisible'], answer:0 },
      { q:'Line-height affects:', options:['Readability','Colors','Images','Loading'], answer:0 }
    ]}
  ]},
  { id:'cre-uxui', category:'creativity', icon:'🖥️', title:'UX/UI Design Fundamentals', description:'Design user-friendly interfaces with UX research and UI patterns.', duration:'6 weeks', level:'Beginner', lessons:[
    { title:'UX vs UI', theory:'UX (User Experience) is how it works; UI (User Interface) is how it looks. UX involves research, wireframes, and testing. UI covers visual design.', quiz:[
      { q:'UX focuses on:', options:['How it works','Colors only','Fonts only','Ads'], answer:0 },
      { q:'Wireframes are:', options:['Low-fi layouts','Final designs','Code files','Animations'], answer:0 },
      { q:'UI is about:', options:['Visual design','Backend logic','Servers','Marketing'], answer:0 }
    ]},
    { title:'User Research', theory:'Research reveals what users need. Methods: interviews, surveys, usability tests, analytics. Create personas and user journeys.', quiz:[
      { q:'Personas represent:', options:['Fictional users','Real employees','Robots','Competitors'], answer:0 },
      { q:'Usability tests observe:', options:['Real users','Designers only','Managers','Nobody'], answer:0 },
      { q:'Journeys map:', options:['User flows','Server paths','Color routes','Code lines'], answer:0 }
    ]},
    { title:'Design Systems', theory:'Design systems ensure consistency: colors, typography, spacing, components. Reusable elements speed up design and development.', quiz:[
      { q:'Design systems ensure:', options:['Consistency','Randomness','Slower design','More bugs'], answer:0 },
      { q:'Reusable components:', options:['Speed up work','Create confusion','Are expensive','Never change'], answer:0 },
      { q:'Material Design is:', options:['A design system','A font','A color','A server'], answer:0 }
    ]}
  ]},
  { id:'cre-write', category:'creativity', icon:'✍️', title:'Creative Writing & Storytelling', description:'Unlock your imagination with stories, characters, and narrative techniques.', duration:'4 weeks', level:'Beginner', lessons:[
    { title:'Finding Your Voice', theory:'Every writer has a unique voice. Read widely, write daily, and experiment with styles. Your voice develops with practice.', quiz:[
      { q:'Your voice develops through:', options:['Practice','Copying others','Only reading','Never writing'], answer:0 },
      { q:'First drafts should be:', options:['Free and messy','Perfect','Published','Deleted'], answer:0 },
      { q:'Reading widely helps:', options:['Inspire your writing','Copy others','Waste time','Judge others'], answer:0 }
    ]},
    { title:'Story Structure', theory:'Classic structure: exposition → rising action → climax → falling action → resolution. Show, don\'t tell — use sensory details.', quiz:[
      { q:'The climax is:', options:['The peak of action','The beginning','The end','A side note'], answer:0 },
      { q:'Show, don\'t tell means:', options:['Use sensory details','Explain everything','Skip details','Be vague'], answer:0 },
      { q:'The protagonist is:', options:['The main character','The villain','The narrator','The reader'], answer:0 }
    ]},
    { title:'Editing & Revising', theory:'Good writing is rewriting. First edit for structure, then for clarity, finally proofread for typos.', quiz:[
      { q:'First edit for:', options:['Structure','Spelling','Fonts','Page numbers'], answer:0 },
      { q:'Reading aloud helps:', options:['Catch errors','Add words','Print faster','Delete content'], answer:0 },
      { q:'Proofreading checks:', options:['Typos','Story plot','Character names','Chapter order'], answer:0 }
    ]}
  ]},
  { id:'cre-video', category:'creativity', icon:'🎬', title:'Video Production & Editing', description:'Plan, shoot, and edit professional videos for social media and beyond.', duration:'5 weeks', level:'Beginner', lessons:[
    { title:'Pre-Production Planning', theory:'Plan before you shoot: define your message, write a script, create a storyboard, and gather equipment.', quiz:[
      { q:'Storyboarding means:', options:['Visualizing scenes','Writing only','Editing','Posting'], answer:0 },
      { q:'Pre-production saves:', options:['Time and money','Nothing','Only storage','Battery'], answer:0 },
      { q:'Know your audience:', options:['Shapes your content','Doesn\'t matter','Slows you','Is optional'], answer:0 }
    ]},
    { title:'Filming Techniques', theory:'Good lighting, clear audio, and stable shots are key. Use the rule of thirds for composition. An external microphone improves audio dramatically.', quiz:[
      { q:'Rule of thirds helps with:', options:['Composition','Audio','Color','Speed'], answer:0 },
      { q:'Audio quality is:', options:['Crucial','Optional','Not important','Only for music'], answer:0 },
      { q:'Natural light is:', options:['A great resource','Always bad','Too dark','For experts only'], answer:0 }
    ]},
    { title:'Editing Basics', theory:'Cut unnecessary footage, add transitions, insert music, and adjust colors. Keep pacing tight.', quiz:[
      { q:'Editing should:', options:['Tighten the story','Add more footage','Make it longer','Remove all sound'], answer:0 },
      { q:'Transitions help:', options:['Connect scenes','Confuse viewers','Slow pace','Add ads'], answer:0 },
      { q:'Export format depends on:', options:['Your platform','Your camera','Your age','Your location'], answer:0 }
    ]}
  ]},
  { id:'cre-photo', category:'creativity', icon:'📸', title:'Photography for Beginners', description:'Master composition, lighting, and editing to take stunning photos.', duration:'4 weeks', level:'Beginner', lessons:[
    { title:'Camera Basics', theory:'Exposure: aperture (f-stop), shutter speed, and ISO. Aperture controls depth of field, shutter speed freezes motion, ISO affects brightness.', quiz:[
      { q:'Aperture controls:', options:['Depth of field','Motion blur','Brightness only','Focus'], answer:0 },
      { q:'Fast shutter speed:', options:['Freezes motion','Blurs motion','Darkens image','Zooms in'], answer:0 },
      { q:'The exposure triangle:', options:['Balances Aperture, Shutter, ISO','Mixes colors','Adjusts white balance','Crops'], answer:0 }
    ]},
    { title:'Composition & Lighting', theory:'Rule of thirds, leading lines, framing, and symmetry create strong compositions. Golden hour provides beautiful warm light.', quiz:[
      { q:'Leading lines:', options:['Guide the eye','Block the image','Add noise','Change color'], answer:0 },
      { q:'Golden hour provides:', options:['Beautiful warm light','Harsh shadows','No light','Blue light'], answer:0 },
      { q:'Rule of thirds divides into:', options:['9 sections','3 sections','4 sections','2 sections'], answer:0 }
    ]},
    { title:'Editing & Post-Processing', theory:'Editing enhances, not fixes. Adjust exposure, contrast, white balance, and saturation. Less is often more.', quiz:[
      { q:'Editing should:', options:['Enhance the photo','Fix bad photos','Add effects only','Change everything'], answer:0 },
      { q:'White balance adjusts:', options:['Color temperature','Brightness','Sharpness','Size'], answer:0 },
      { q:'Less is more means:', options:['Subtle edits are better','More edits are better','No edits needed','Always crop'], answer:0 }
    ]}
  ]},
  { id:'cre-music', category:'creativity', icon:'🎵', title:'Music Production Fundamentals', description:'Create beats, melodies, and songs using digital audio workstations.', duration:'6 weeks', level:'Beginner', lessons:[
    { title:'DAW & Setup', theory:'A Digital Audio Workstation (DAW) is your studio. Popular DAWs: Ableton Live, FL Studio, Logic Pro.', quiz:[
      { q:'DAW stands for:', options:['Digital Audio Workstation','Desktop Audio Wave','Drum And Waves','Digital Analog Work'], answer:0 },
      { q:'The timeline shows:', options:['Arrangement','Only volume','Colors','Text'], answer:0 },
      { q:'Virtual instruments:', options:['Produce sounds digitally','Are real guitars','Record audio','Mix only'], answer:0 }
    ]},
    { title:'Rhythm & Beats', theory:'Music is built on rhythm. BPM sets the tempo. A typical drum pattern has kick, snare, and hi-hat. Quantize to fix timing.', quiz:[
      { q:'BPM measures:', options:['Tempo','Volume','Pitch','Duration'], answer:0 },
      { q:'A drum pattern includes:', options:['Kick, snare, hi-hat','Only melody','Vocals','Bass'], answer:0 },
      { q:'Quantize fixes:', options:['Timing','Pitch','Volume','Color'], answer:0 }
    ]},
    { title:'Melody & Harmony', theory:'Melody is a sequence of notes; harmony is chords supporting it. Scales (major/minor) define the mood.', quiz:[
      { q:'Melody is:', options:['A sequence of notes','The background noise','A drum pattern','A volume change'], answer:0 },
      { q:'Major scales sound:', options:['Happy','Sad','Angry','Dark'], answer:0 },
      { q:'Harmony supports:', options:['The melody','The beat only','The lyrics','The silence'], answer:0 }
    ]}
  ]},
  { id:'cre-animation', category:'creativity', icon:'✨', title:'2D Animation & Motion Graphics', description:'Bring ideas to life with animation principles and motion design tools.', duration:'6 weeks', level:'Intermediate', lessons:[
    { title:'Animation Principles', theory:'12 principles: squash & stretch, anticipation, staging, follow through, slow in/out, arcs, timing, exaggeration, solid drawing, appeal.', quiz:[
      { q:'Squash and stretch creates:', options:['Elasticity','Stiffness','Stillness','Noise'], answer:0 },
      { q:'Anticipation means:', options:['Preparing for action','Delaying action','Skipping action','Ending action'], answer:0 },
      { q:'Timing refers to:', options:['Speed of movement','Color duration','Sound sync','Frame size'], answer:0 }
    ]},
    { title:'2D Animation Tools', theory:'Popular tools: Adobe After Effects, Toon Boom, Blender. Use keyframes to define start and end positions.', quiz:[
      { q:'Keyframes define:', options:['Start and end positions','Only colors','Audio tracks','File names'], answer:0 },
      { q:'Tweening means:', options:['Interpolating frames','Adding text','Exporting','Recording'], answer:0 },
      { q:'After Effects is for:', options:['Motion graphics','3D modeling','Coding','Writing'], answer:0 }
    ]},
    { title:'Motion Graphics for Media', theory:'Motion graphics combine text, shapes, and movement. Used in explainer videos, social media, and title sequences.', quiz:[
      { q:'Motion graphics use:', options:['Text, shapes, and movement','Only photos','Live action','Audio only'], answer:0 },
      { q:'Explainer videos use:', options:['Motion graphics to explain','Only text','No visuals','Only music'], answer:0 },
      { q:'Keep motion graphics:', options:['Simple and purposeful','Complex and busy','Very slow','Without color'], answer:0 }
    ]}
  ]},
  { id:'cre-arch', category:'creativity', icon:'🏛️', title:'Architecture & Interior Design', description:'Understand spatial design, aesthetics, and functional living spaces.', duration:'5 weeks', level:'Beginner', lessons:[
    { title:'Design Fundamentals', theory:'Architecture balances form and function. Key elements: space, line, texture, light, color.', quiz:[
      { q:'Architecture balances:', options:['Form and function','Cost and speed','Size and color','Height and width'], answer:0 },
      { q:'Proportion refers to:', options:['Relative size','Cost','Material','Location'], answer:0 },
      { q:'User experience in design:', options:['Matters a lot','Doesn\'t matter','Only for apps','Is optional'], answer:0 }
    ]},
    { title:'Interior Design Principles', theory:'Balance, rhythm, emphasis, scale, and harmony. Choose a color palette for mood. Lighting layers: ambient, task, accent.', quiz:[
      { q:'Balance in design means:', options:['Visual equilibrium','Equal cost','Same colors','Identical furniture'], answer:0 },
      { q:'Ambient lighting is:', options:['General illumination','Task lighting','Accent lighting','Natural only'], answer:0 },
      { q:'A color palette sets:', options:['The mood','The budget','The size','The location'], answer:0 }
    ]},
    { title:'Sustainable Design', theory:'Sustainable design reduces environmental impact. Use natural materials, energy-efficient systems, and passive solar design.', quiz:[
      { q:'Sustainable design reduces:', options:['Environmental impact','Cost always','Space','Natural light'], answer:0 },
      { q:'Passive solar design uses:', options:['Sun for heating/cooling','Only electricity','Gas','Wind only'], answer:0 },
      { q:'Biophilic design connects:', options:['People with nature','Buildings with roads','Rooms with furniture','Colors with textures'], answer:0 }
    ]}
  ]},
  { id:'cre-fashion', category:'creativity', icon:'👗', title:'Fashion Design & Styling', description:'Explore fashion design, fabric selection, and personal styling.', duration:'4 weeks', level:'Beginner', lessons:[
    { title:'Fashion Fundamentals', theory:'Fashion is wearable art. Learn about silhouettes, fabrics, and color theory. Build a capsule wardrobe.', quiz:[
      { q:'Fashion is:', options:['Wearable art','Only expensive','Just clothing','Not important'], answer:0 },
      { q:'A capsule wardrobe has:', options:['Versatile staples','Only trendy items','One color','Many duplicates'], answer:0 },
      { q:'Trends:', options:['Come and go','Last forever','Never change','Are universal'], answer:0 }
    ]},
    { title:'Fabric & Textiles', theory:'Natural fibers: cotton, linen, wool, silk. Synthetic: polyester, nylon, acrylic. Each has different properties.', quiz:[
      { q:'Cotton is:', options:['Natural fiber','Synthetic','Metal','Plastic'], answer:0 },
      { q:'Polyester is:', options:['Synthetic','Natural','From plants','Edible'], answer:0 },
      { q:'Fabric choice depends on:', options:['Garment purpose','Only color','Only price','Only brand'], answer:0 }
    ]},
    { title:'Personal Styling', theory:'Dress for your body type, skin tone, and lifestyle. Fit is the most important factor. Accessories elevate any outfit.', quiz:[
      { q:'The most important factor is:', options:['Fit','Brand','Price','Trend'], answer:0 },
      { q:'Accessories:', options:['Elevate outfits','Hide flaws','Are unnecessary','Cost too much'], answer:0 },
      { q:'Style should reflect:', options:['Your personality','Only trends','What others wear','The cheapest option'], answer:0 }
    ]}
  ]},
  { id:'cre-game', category:'creativity', icon:'🎮', title:'Game Design & Development', description:'Design engaging games — mechanics, storytelling, and prototyping.', duration:'6 weeks', level:'Intermediate', lessons:[
    { title:'Game Design Fundamentals', theory:'Games are interactive with rules, goals, and feedback. Core mechanics are repeatable actions. MDA: Mechanics, Dynamics, Aesthetics.', quiz:[
      { q:'Core mechanics are:', options:['Repeatable actions','The story','Graphics','Sound effects'], answer:0 },
      { q:'MDA stands for:', options:['Mechanics, Dynamics, Aesthetics','Motion, Design, Art','Memory, Data, Audio','Menu, Display, Action'], answer:0 },
      { q:'Fun comes from:', options:['Meaningful choices','Random luck','Long cutscenes','No interaction'], answer:0 }
    ]},
    { title:'Game Engines', theory:'Popular engines: Unity (C#), Unreal (C++), Godot. Prototype with simple shapes. Focus on gameplay first.', quiz:[
      { q:'Unity uses:', options:['C#','C++','Python','JavaScript'], answer:0 },
      { q:'Prototype with:', options:['Simple shapes','Final art only','No code','Only sound'], answer:0 },
      { q:'Version control is:', options:['Essential for teams','Optional','Not needed','Only for code'], answer:0 }
    ]},
    { title:'Level Design', theory:'Level design guides the player through challenges. Introduce mechanics one at a time. Use pacing.', quiz:[
      { q:'Level design should:', options:['Guide the player','Confuse the player','Be random','Have no goals'], answer:0 },
      { q:'Introduce mechanics:', options:['One at a time','All at once','Never','At the end'], answer:0 },
      { q:'Player testing:', options:['Improves the game','Wastes time','Is impossible','Only for experts'], answer:0 }
    ]}
  ]}
,// COURSES DATASET PART 5 - Communication & Soft Skills

  { id:'com-pub', category:'communication', icon:'🎤', title:'Public Speaking Mastery', description:'Overcome stage fright and deliver powerful presentations with confidence.', duration:'5 weeks', level:'Beginner', lessons:[
    { title:'Conquering Stage Fright', theory:'Stage fright is normal — even pros get nervous. Reframe anxiety as excitement. Prepare thoroughly, practice deep breathing.', quiz:[
      { q:'Stage fright is:', options:['Normal and manageable','Unusual','A sign of weakness','Only for beginners'], answer:0 },
      { q:'Reframe anxiety as:', options:['Excitement','Fear','Anger','Worry'], answer:0 },
      { q:'Deep breathing helps:', options:['Calm nerves','Increase volume','Speed up talking','Nothing'], answer:0 }
    ]},
    { title:'Speech Structure', theory:'A strong speech has: opening (hook), body (3 key points), and conclusion (call to action). Tell stories to connect emotionally.', quiz:[
      { q:'A speech needs:', options:['Opening, body, conclusion','Only the body','Random topics','No structure'], answer:0 },
      { q:'Stories help:', options:['Connect emotionally','Confuse','Add time','Fill silence'], answer:0 },
      { q:'A call to action:', options:['Asks audience to act','Ends the speech','Introduces topic','Is optional'], answer:0 }
    ]},
    { title:'Voice & Body Language', theory:'Vary your pace, pitch, and volume. Use pauses for emphasis. Gestures should be natural. Eye contact builds trust.', quiz:[
      { q:'Pauses create:', options:['Emphasis','Confusion','Boredom','Noise'], answer:0 },
      { q:'Eye contact builds:', options:['Trust','Distraction','Fear','Silence'], answer:0 },
      { q:'Gestures should be:', options:['Natural','Rehearsed','Random','None'], answer:0 }
    ]}
  ]},
  { id:'com-write', category:'communication', icon:'✉️', title:'Business Writing & Communication', description:'Write clear emails, reports, and proposals that get results.', duration:'3 weeks', level:'Beginner', lessons:[
    { title:'Email Etiquette', theory:'Clear subject lines, professional greetings, concise body, and clear call to action. Use bullet points for readability.', quiz:[
      { q:'Subject lines should be:', options:['Clear and descriptive','Blank','All caps','Just hi'], answer:0 },
      { q:'Bullet points improve:', options:['Readability','Length','Confusion','Formatting'], answer:0 },
      { q:'Always proofread:', options:['Before sending','Never','After replying','Only long emails'], answer:0 }
    ]},
    { title:'Report Writing', theory:'Structure: executive summary, introduction, findings, analysis, recommendations. Use data visualizations.', quiz:[
      { q:'Executive summary is:', options:['A brief overview','The conclusion','The introduction','The appendix'], answer:0 },
      { q:'Data visualizations:', options:['Clarify findings','Add noise','Replace text','Are optional'], answer:0 },
      { q:'Write for:', options:['Your audience','Yourself','Your manager only','Everyone'], answer:0 }
    ]},
    { title:'Persuasive Writing', theory:'Use AIDA: Attention, Interest, Desire, Action. Focus on benefits, not features. Use social proof and urgency ethically.', quiz:[
      { q:'AIDA stands for:', options:['Attention, Interest, Desire, Action','Add, Insert, Delete, Add','Action, Idea, Data, Analysis','None'], answer:0 },
      { q:'Benefits vs features:', options:['Focus on benefits','Focus on features','Both same','Neither'], answer:0 },
      { q:'Urgency should be:', options:['Ethical','Fake','Always urgent','Never used'], answer:0 }
    ]}
  ]},
  { id:'com-team', category:'communication', icon:'👥', title:'Team Collaboration & Dynamics', description:'Work effectively in teams — communication, conflict resolution, and trust.', duration:'4 weeks', level:'Beginner', lessons:[
    { title:'Team Roles & Norms', theory:'Teams form through stages: forming, storming, norming, performing, adjourning. Clear roles and norms improve collaboration.', quiz:[
      { q:'Tuckman stages end with:', options:['Adjourning','Forming','Storming','Performing'], answer:0 },
      { q:'Diversity:', options:['Strengthens teams','Weakens teams','Slows work','Creates conflict'], answer:0 },
      { q:'Norms are:', options:['Shared expectations','Rules from management','Optional','Always written'], answer:0 }
    ]},
    { title:'Communication in Teams', theory:'Use clear, respectful language. Listen actively. Give and receive feedback constructively.', quiz:[
      { q:'Active listening means:', options:['Fully engaging','Nodding only','Multi-tasking','Interrupting'], answer:0 },
      { q:'Feedback should be:', options:['Constructive','Only positive','Only negative','Vague'], answer:0 },
      { q:'Choose channel based on:', options:['Message urgency','Your preference','Available tools','Mood'], answer:0 }
    ]},
    { title:'Conflict Resolution', theory:'Address conflicts early. Focus on interests, not positions. Use I statements. Seek win-win solutions.', quiz:[
      { q:'Address conflicts:', options:['Early','Never','Later','Publicly'], answer:0 },
      { q:'Focus on:', options:['Interests','Positions','Blame','Winning'], answer:0 },
      { q:'I statements:', options:['Express feelings','Assign blame','Accuse others','Ignore issues'], answer:0 }
    ]}
  ]},
  { id:'com-lead', category:'communication', icon:'🌟', title:'Emotional Intelligence at Work', description:'Develop self-awareness, empathy, and relationship management skills.', duration:'4 weeks', level:'Beginner', lessons:[
    { title:'What is EQ?', theory:'Emotional Intelligence (EQ) is the ability to recognize and manage emotions. Components: self-awareness, self-regulation, motivation, empathy, social skills.', quiz:[
      { q:'EQ is about:', options:['Managing emotions','IQ only','Physical strength','Memory'], answer:0 },
      { q:'Self-awareness means:', options:['Understanding your emotions','Ignoring feelings','Controlling others','Hiding emotions'], answer:0 },
      { q:'Empathy means:', options:['Understanding others feelings','Sympathy only','Agreeing always','Pity'], answer:0 }
    ]},
    { title:'Self-Regulation', theory:'Pause before reacting. Practice mindfulness. Manage stress with healthy habits. Respond vs react.', quiz:[
      { q:'Pausing helps you:', options:['Respond thoughtfully','React fast','Avoid issues','Forget'], answer:0 },
      { q:'Mindfulness means:', options:['Being present','Daydreaming','Multi-tasking','Rushing'], answer:0 },
      { q:'React vs respond:', options:['Respond is thoughtful','React is better','They are same','Neither matters'], answer:0 }
    ]},
    { title:'Social Skills', theory:'Build rapport, influence positively, lead with empathy, manage conflicts, and inspire others.', quiz:[
      { q:'Rapport builds:', options:['Trust','Tension','Distance','Competition'], answer:0 },
      { q:'Influence requires:', options:['Trust and credibility','Power only','Authority','Money'], answer:0 },
      { q:'Good social skills:', options:['Improve relationships','Isolate you','Create conflict','Slow work'], answer:0 }
    ]}
  ]},
  { id:'com-negotiate', category:'communication', icon:'🤝', title:'Everyday Negotiation', description:'Negotiate better in daily life — salary, purchases, and agreements.', duration:'3 weeks', level:'Beginner', lessons:[
    { title:'Negotiation Mindset', theory:'Negotiation is a conversation, not a battle. Prepare with your interests and options. Aim for win-win.', quiz:[
      { q:'Negotiation is:', options:['A conversation','A battle','A competition','A lecture'], answer:0 },
      { q:'Walk-away point is:', options:['Your minimum acceptable','Your ideal','A starting point','A demand'], answer:0 },
      { q:'Win-win means:', options:['Both benefit','You win','They win','Compromise equally'], answer:0 }
    ]},
    { title:'Salary Negotiation', theory:'Research market rates, know your value, practice the conversation. Focus on total compensation.', quiz:[
      { q:'Research before:', options:['Market rates','Company food','Parking','Office size'], answer:0 },
      { q:'Total compensation includes:', options:['Salary, benefits, perks','Only salary','Only vacation','Only bonus'], answer:0 },
      { q:'Be:', options:['Confident and collaborative','Aggressive','Passive','Silent'], answer:0 }
    ]},
    { title:'Everyday Negotiations', theory:'Negotiate purchases, services, and agreements. Use anchoring, ask questions, and offer trade-offs.', quiz:[
      { q:'Anchoring means:', options:['Setting the first number','Lowering the price','Walking away','Accepting'], answer:0 },
      { q:'Trade-offs:', options:['Exchange value','Concede','Demand','Reject'], answer:0 },
      { q:'Relationships matter for:', options:['Long-term success','Single deals only','Never','Only in sales'], answer:0 }
    ]}
  ]},
  { id:'com-culture', category:'communication', icon:'🌍', title:'Cross-Cultural Communication', description:'Work effectively across cultures with awareness and respect.', duration:'3 weeks', level:'Beginner', lessons:[
    { title:'Cultural Awareness', theory:'Culture shapes communication styles, values, and behaviors. High-context vs low-context cultures.', quiz:[
      { q:'High-context cultures:', options:['Rely on implicit cues','Use direct words','Avoid context','Only text'], answer:0 },
      { q:'Cultural awareness:', options:['Improves communication','Doesn\'t matter','Slows work','Creates bias'], answer:0 },
      { q:'Learn about:', options:['Others cultures','Only your culture','Nothing','Stereotypes'], answer:0 }
    ]},
    { title:'Global Communication', theory:'Use clear, simple language. Avoid idioms and slang. Be patient with accents. Confirm understanding.', quiz:[
      { q:'Use:', options:['Clear, simple language','Complex vocabulary','Local slang','Idioms'], answer:0 },
      { q:'Confirm:', options:['Understanding','Dominance','Speed','Authority'], answer:0 },
      { q:'Respect:', options:['Time zones and holidays','Only your time','Deadlines only','Urgency'], answer:0 }
    ]},
    { title:'Building Global Teams', theory:'Virtual teams need clear goals, regular check-ins, and inclusive practices. Use async communication.', quiz:[
      { q:'Virtual teams need:', options:['Clear goals and check-ins','No communication','Only email','Random meetings'], answer:0 },
      { q:'Async communication:', options:['Works across time zones','Is outdated','Too slow','Not effective'], answer:0 },
      { q:'Celebrate:', options:['Diversity','Uniformity','Only results','Same culture'], answer:0 }
    ]}
  ]},
  { id:'com-present', category:'communication', icon:'📊', title:'Presentation Design & Delivery', description:'Create stunning slides and deliver memorable presentations.', duration:'4 weeks', level:'Beginner', lessons:[
    { title:'Slide Design', theory:'Less is more. One idea per slide, minimal text, high-quality visuals. Follow the 10-20-30 rule.', quiz:[
      { q:'One slide should have:', options:['One idea','Multiple ideas','Full text','No text'], answer:0 },
      { q:'10-20-30 rule means:', options:['10 slides, 20 min, 30pt','10 min, 20 slides, 30pt','10pt, 20 slides, 30 min','None'], answer:0 },
      { q:'Visuals should be:', options:['High-quality','Low-res','Text-heavy','Random'], answer:0 }
    ]},
    { title:'Storytelling with Data', theory:'Data alone is boring. Frame data with context, highlight key insights, and use charts effectively.', quiz:[
      { q:'Data needs:', options:['Context and narrative','Just numbers','No explanation','Only charts'], answer:0 },
      { q:'Highlight:', options:['Key insights','Every number','All details','Raw data'], answer:0 },
      { q:'Charts should:', options:['Clarify the message','Confuse','Be decorative','Stand alone'], answer:0 }
    ]},
    { title:'Handling Q&A', theory:'Anticipate questions, prepare answers, and stay calm. If you don\'t know, say so and offer to follow up.', quiz:[
      { q:'If you don\'t know:', options:['Say so and follow up','Guess','Ignore','Deflect'], answer:0 },
      { q:'Anticipate questions:', options:['Before the presentation','During','Never','After'], answer:0 },
      { q:'Thanking questioners:', options:['Shows respect','Is unnecessary','Wastes time','Confuses'], answer:0 }
    ]}
  ]},
  { id:'com-listening', category:'communication', icon:'👂', title:'Active Listening & Empathy', description:'Become a better listener and build deeper connections.', duration:'3 weeks', level:'Beginner', lessons:[
    { title:'Why Listening Matters', theory:'Listening builds trust, reduces misunderstandings, and deepens relationships. Most people listen to reply, not to understand.', quiz:[
      { q:'Most people listen to:', options:['Reply','Understand','Learn','Help'], answer:0 },
      { q:'Listening builds:', options:['Trust','Arguments','Distance','Confusion'], answer:0 },
      { q:'Being the exception means:', options:['Listening to understand','Talking more','Interrupting','Winning'], answer:0 }
    ]},
    { title:'Listening Techniques', theory:'Paraphrase, ask questions, and avoid interrupting. Use SOLER: Sit squarely, Open posture, Lean in, Eye contact, Relax.', quiz:[
      { q:'Paraphrasing shows:', options:['You understand','You agree','You disagree','You\'re bored'], answer:0 },
      { q:'SOLER includes:', options:['Sit, Open, Lean, Eye, Relax','Speak, Organize, Listen, Evaluate, Respond','None of these'], answer:0 },
      { q:'Interrupting:', options:['Hinders understanding','Shows interest','Speeds conversation','Is helpful'], answer:0 }
    ]},
    { title:'Empathy in Practice', theory:'Empathy is understanding feelings, not fixing them. Validate emotions. Use phrases like "That sounds difficult."', quiz:[
      { q:'Empathy means:', options:['Understanding feelings','Fixing problems','Giving advice','Agreeing'], answer:0 },
      { q:'"At least..." can:', options:['Invalidate feelings','Help','Comfort','Encourage'], answer:0 },
      { q:'Validation means:', options:['Acknowledging emotions','Agreeing','Solving','Judging'], answer:0 }
    ]}
  ]},
  { id:'com-feedback', category:'communication', icon:'🔄', title:'Giving & Receiving Feedback', description:'Master the art of constructive feedback and continuous improvement.', duration:'3 weeks', level:'Beginner', lessons:[
    { title:'Why Feedback Matters', theory:'Feedback fuels growth. Without it, we don\'t know what to improve. Treat it as a gift, not criticism.', quiz:[
      { q:'Feedback fuels:', options:['Growth','Ego','Comfort','Stagnation'], answer:0 },
      { q:'Seek feedback:', options:['Regularly','Never','Only from bosses','Yearly'], answer:0 },
      { q:'Treat feedback as:', options:['A gift','Criticism','An attack','Optional'], answer:0 }
    ]},
    { title:'SBI Model', theory:'Situation, Behavior, Impact. Describe the specific situation, the observed behavior, and the impact it had.', quiz:[
      { q:'SBI stands for:', options:['Situation, Behavior, Impact','Start, Be, Improve','Same, Better, Ideal','None'], answer:0 },
      { q:'Describe:', options:['Specific behavior','Personality','Assumptions','Feelings'], answer:0 },
      { q:'Avoid:', options:['Generalizations','Specifics','Examples','Data'], answer:0 }
    ]},
    { title:'Receiving Feedback', theory:'Listen without defensiveness. Ask clarifying questions. Thank the giver. Reflect and decide what to act on.', quiz:[
      { q:'Listen:', options:['Without defensiveness','With counter-arguments','While planning reply','With anger'], answer:0 },
      { q:'Ask:', options:['Clarifying questions','To stop','Why they are wrong','For examples only'], answer:0 },
      { q:'Separate:', options:['Intent from impact','Good from bad','People from problems','Facts from opinions'], answer:0 }
    ]}
  ]},
  { id:'com-digital', category:'communication', icon:'📱', title:'Digital Communication & Social Media', description:'Communicate effectively online — personal brand, content, and networking.', duration:'3 weeks', level:'Beginner', lessons:[
    { title:'Digital Presence', theory:'Your online presence is your digital brand. Be consistent across platforms. Share valuable content.', quiz:[
      { q:'Your digital presence is:', options:['Your online brand','Optional','Not important','Only for work'], answer:0 },
      { q:'Be consistent:', options:['Across platforms','Only on one','Randomly','Never'], answer:0 },
      { q:'Engage:', options:['Authentically','Anonymously','Rarely','Passively'], answer:0 }
    ]},
    { title:'Content Creation', theory:'Create content that educates, entertains, or inspires. Use a content calendar. Quality over quantity.', quiz:[
      { q:'Content should:', options:['Educate, entertain, inspire','Only sell','Be random','Be long'], answer:0 },
      { q:'Content calendar helps:', options:['Stay organized','Post randomly','Forget topics','Skip planning'], answer:0 },
      { q:'Quality over:', options:['Quantity','Consistency','Effort','Time'], answer:0 }
    ]},
    { title:'Online Communities', theory:'Join communities where your audience hangs out. Give value before asking. Build relationships.', quiz:[
      { q:'Join communities:', options:['Where your audience is','Randomly','Only for promotion','Once'], answer:0 },
      { q:'Give value:', options:['Before asking for anything','Always take','Never help','Only promote'], answer:0 },
      { q:'Build:', options:['Relationships','Followers only','Vanity metrics','Numbers'], answer:0 }
    ]}
  ]}
,// COURSES DATASET PART 6 - Personal Development

  { id:'per-time', category:'personal', icon:'⏰', title:'Time Management & Productivity', description:'Master your time, beat procrastination, and get more done.', duration:'4 weeks', level:'Beginner', lessons:[
    { title:'The Pomodoro Technique', theory:'Work in 25-minute focused sprints, then take 5-minute breaks. After 4 sprints, take a longer break (15-30 min).', quiz:[
      { q:'A Pomodoro sprint is:', options:['25 minutes','10 minutes','60 minutes','5 minutes'], answer:0 },
      { q:'After 4 sprints, take:', options:['15-30 min break','5 min break','No break','1 hour break'], answer:0 },
      { q:'The technique prevents:', options:['Burnout','Sleep','Work','Eating'], answer:0 }
    ]},
    { title:'Eisenhower Matrix', theory:'Urgent vs Important: Do First (urgent+important), Schedule (important, not urgent), Delegate (urgent, not important), Eliminate (neither).', quiz:[
      { q:'Do First tasks are:', options:['Urgent and important','Important only','Urgent only','Neither'], answer:0 },
      { q:'Schedule tasks are:', options:['Important, not urgent','Urgent, not important','Neither','Both'], answer:0 },
      { q:'Eliminate tasks are:', options:['Neither urgent nor important','Important','Urgent','Both'], answer:0 }
    ]},
    { title:'Beating Procrastination', theory:'Break tasks into small steps. Use the 2-minute rule: if it takes <2 min, do it now. Remove distractions.', quiz:[
      { q:'The 2-minute rule says:', options:['Do it now if under 2 min','Wait 2 minutes','Do it later','Skip it'], answer:0 },
      { q:'Break tasks into:', options:['Small steps','Big chunks','One huge task','Random parts'], answer:0 },
      { q:'Rewards help:', options:['Reinforce progress','Avoid work','Distract','Delay'], answer:0 }
    ]}
  ]},
  { id:'per-mind', category:'personal', icon:'🧘', title:'Mindfulness & Meditation', description:'Reduce stress, improve focus, and find inner peace through mindfulness.', duration:'4 weeks', level:'Beginner', lessons:[
    { title:'What is Mindfulness?', theory:'Mindfulness is paying attention to the present moment without judgment. It reduces stress and improves focus.', quiz:[
      { q:'Mindfulness means:', options:['Present moment awareness','Daydreaming','Multi-tasking','Worrying'], answer:0 },
      { q:'Mindfulness reduces:', options:['Stress','Energy','Focus','Creativity'], answer:0 },
      { q:'It is:', options:['Non-judgmental','Critical','Judgmental','Competitive'], answer:0 }
    ]},
    { title:'Breathing Techniques', theory:'Box breathing: inhale 4s, hold 4s, exhale 4s, hold 4s. 4-7-8 breathing: inhale 4s, hold 7s, exhale 8s.', quiz:[
      { q:'Box breathing has:', options:['4 equal parts','3 parts','5 parts','2 parts'], answer:0 },
      { q:'4-7-8 breathing:', options:['Calms the nervous system','Energizes','Increases heart rate','Wakes you up'], answer:0 },
      { q:'Breathing techniques help:', options:['Reduce anxiety','Increase stress','Confuse','Distract'], answer:0 }
    ]},
    { title:'Building a Meditation Practice', theory:'Start with 5 minutes daily. Use guided meditations. Consistency matters more than duration.', quiz:[
      { q:'Start with:', options:['5 minutes daily','1 hour daily','10 minutes weekly','Random times'], answer:0 },
      { q:'Consistency matters:', options:['More than duration','Less than duration','Not at all','Only for experts'], answer:0 },
      { q:'Focus on:', options:['Your breath','Your phone','Noise','Thoughts'], answer:0 }
    ]}
  ]},
  { id:'per-goal', category:'personal', icon:'🎯', title:'Goal Setting & Achievement', description:'Set meaningful goals and create a plan to achieve them.', duration:'3 weeks', level:'Beginner', lessons:[
    { title:'SMART Goals', theory:'Specific, Measurable, Achievable, Relevant, Time-bound. Vague goals are hard to achieve. Write goals down.', quiz:[
      { q:'SMART stands for:', options:['Specific, Measurable, Achievable, Relevant, Time-bound','Simple, Manageable, Accurate, Realistic, Tested','None'], answer:0 },
      { q:'Written goals are:', options:['More likely to be achieved','Same as unwritten','Less effective','Optional'], answer:0 },
      { q:'Review goals:', options:['Weekly','Once','Never','Yearly'], answer:0 }
    ]},
    { title:'Breaking Down Goals', theory:'Big goals need small steps. Break yearly goals into monthly, weekly, and daily actions.', quiz:[
      { q:'Break goals into:', options:['Monthly, weekly, daily steps','Only the end goal','Random steps','No steps'], answer:0 },
      { q:'Focus on:', options:['Processes and outcomes','Only outcomes','Only processes','Neither'], answer:0 },
      { q:'Daily actions:', options:['Build momentum','Don\'t matter','Are optional','Distract'], answer:0 }
    ]},
    { title:'Overcoming Obstacles', theory:'Anticipate obstacles and plan for them. Use if-then planning: "If X happens, then I will do Y."', quiz:[
      { q:'If-then planning:', options:['Prepares for obstacles','Prevents all issues','Guarantees success','Is unnecessary'], answer:0 },
      { q:'Setbacks are:', options:['Learning opportunities','Failures','Endings','Mistakes'], answer:0 },
      { q:'Anticipate:', options:['Potential obstacles','Only success','Nothing','Only the end'], answer:0 }
    ]}
  ]},
  { id:'per-grit', category:'personal', icon:'💪', title:'Grit, Resilience & Growth Mindset', description:'Develop the perseverance to overcome challenges and keep growing.', duration:'4 weeks', level:'Beginner', lessons:[
    { title:'Growth vs Fixed Mindset', theory:'Growth mindset: abilities can be developed. Fixed mindset: abilities are fixed. Embrace challenges, learn from criticism.', quiz:[
      { q:'Growth mindset believes:', options:['Abilities can develop','Abilities are fixed','Talent is everything','Effort doesn\'t matter'], answer:0 },
      { q:'Fixed mindset:', options:['Avoids challenges','Embraces challenges','Learns from criticism','Persists'], answer:0 },
      { q:'Criticism is:', options:['A learning opportunity','A personal attack','To be ignored','A sign of failure'], answer:0 }
    ]},
    { title:'Building Resilience', theory:'Resilience is bouncing back from adversity. Build it through strong relationships, self-care, and realistic optimism.', quiz:[
      { q:'Resilience means:', options:['Bouncing back from adversity','Never failing','Ignoring problems','Avoiding challenges'], answer:0 },
      { q:'Strong relationships:', options:['Build resilience','Weaken you','Distract','Don\'t matter'], answer:0 },
      { q:'Realistic optimism:', options:['Balances hope and reality','Ignores reality','Always positive','Never hopeful'], answer:0 }
    ]},
    { title:'The Power of Yet', theory:'Add "yet" to limitations: "I don\'t know this... yet." This shifts from failure to learning.', quiz:[
      { q:'Adding "yet" shifts to:', options:['Learning mindset','Fixed mindset','Giving up','Excuses'], answer:0 },
      { q:'Celebrate:', options:['Effort and results','Only results','Only perfection','Winning only'], answer:0 },
      { q:'The power of yet:', options:['Encourages growth','Promotes fixed mindset','Discourages effort','Limits potential'], answer:0 }
    ]}
  ]},
  { id:'per-health', category:'personal', icon:'🏋️', title:'Health, Fitness & Wellness', description:'Build sustainable healthy habits for body and mind.', duration:'5 weeks', level:'Beginner', lessons:[
    { title:'Nutrition Basics', theory:'Eat whole foods: vegetables, fruits, lean proteins, whole grains, healthy fats. Stay hydrated.', quiz:[
      { q:'Whole foods include:', options:['Vegetables, fruits, lean proteins','Only processed food','Only supplements','Fast food'], answer:0 },
      { q:'Hydration is:', options:['Essential','Optional','Not important','Only during exercise'], answer:0 },
      { q:'Balance means:', options:['Moderation in all things','Only eating healthy','Never indulging','Strict diet'], answer:0 }
    ]},
    { title:'Exercise Fundamentals', theory:'Mix cardio, strength, and flexibility. Aim for 150 min moderate exercise per week.', quiz:[
      { q:'Weekly exercise goal:', options:['150 min moderate','30 min','10 hours','Just weekends'], answer:0 },
      { q:'Exercise types:', options:['Cardio, strength, flexibility','Only running','Only weights','Only stretching'], answer:0 },
      { q:'Consistency:', options:['Matters most','Doesn\'t matter','Only intensity','Only duration'], answer:0 }
    ]},
    { title:'Sleep & Recovery', theory:'Sleep 7-9 hours per night. Maintain a consistent schedule. Create a bedtime routine.', quiz:[
      { q:'Recommended sleep:', options:['7-9 hours','4-5 hours','10-12 hours','Any amount'], answer:0 },
      { q:'Bedtime routine:', options:['Improves sleep quality','Wastes time','Is optional','Only for kids'], answer:0 },
      { q:'Screens before bed:', options:['Disrupt sleep','Help sleep','Don\'t matter','Improve focus'], answer:0 }
    ]}
  ]},
  { id:'per-career', category:'personal', icon:'🧭', title:'Career Planning & Development', description:'Design a career path aligned with your values, skills, and passions.', duration:'4 weeks', level:'Beginner', lessons:[
    { title:'Self-Assessment', theory:'Know yourself: values, interests, skills, personality. Use tools like SWOT analysis and Ikigai.', quiz:[
      { q:'Self-assessment helps:', options:['Know your values and skills','Find any job','Make money fast','Avoid work'], answer:0 },
      { q:'Ikigai means:', options:['Reason for being','Career path','Job title','Salary'], answer:0 },
      { q:'SWOT stands for:', options:['Strengths, Weaknesses, Opportunities, Threats','Skills, Work, Options, Time','None'], answer:0 }
    ]},
    { title:'Skill Development', theory:'Identify skills gaps in your target field. Use the 80/20 rule: focus on the 20% of skills that give 80% of results.', quiz:[
      { q:'The 80/20 rule means:', options:['20% skills give 80% results','80% skills give 20% results','Equal split','Random'], answer:0 },
      { q:'Skill gaps are:', options:['Areas to improve','Your strengths','Not important','Fixed'], answer:0 },
      { q:'A learning plan:', options:['Structures your growth','Is unnecessary','Limits you','Is too rigid'], answer:0 }
    ]},
    { title:'Building Your Career', theory:'Network, gain experience, seek mentors, and update your skills. Your career is a journey.', quiz:[
      { q:'Networking helps:', options:['Open opportunities','Close doors','Isolate','Stress'], answer:0 },
      { q:'Mentors provide:', options:['Guidance and wisdom','Money','Jobs','Grades'], answer:0 },
      { q:'Career is a:', options:['Journey','Destination','Race','Fixed path'], answer:0 }
    ]}
  ]},
  { id:'per-habit', category:'personal', icon:'🔄', title:'Habit Formation & Behavior Change', description:'Understand the science of habits and transform your daily routines.', duration:'4 weeks', level:'Beginner', lessons:[
    { title:'The Habit Loop', theory:'Cue → Craving → Response → Reward. Make cues obvious, responses easy, and rewards satisfying.', quiz:[
      { q:'The habit loop has:', options:['4 parts: Cue, Craving, Response, Reward','3 parts','2 parts','5 parts'], answer:0 },
      { q:'Make cues:', options:['Obvious','Hidden','Complex','Random'], answer:0 },
      { q:'Rewards should be:', options:['Satisfying','Delayed','Punishing','Boring'], answer:0 }
    ]},
    { title:'Atomic Habits Strategy', theory:'1% improvement daily compounds. Identity-based habits: "I am a healthy person". System over goals.', quiz:[
      { q:'1% daily improvement:', options:['Compounds over time','Doesn\'t matter','Is too slow','Is instant'], answer:0 },
      { q:'Identity-based habits:', options:['Focus on who you are','Focus on outcomes','Are less effective','Are harder'], answer:0 },
      { q:'System over:', options:['Goals','Process','Effort','Time'], answer:0 }
    ]},
    { title:'Breaking Bad Habits', theory:'Invert the habit loop: make cues invisible, cravings unattractive, responses difficult, and rewards unsatisfying.', quiz:[
      { q:'To break habits:', options:['Invert the loop','Strengthen cues','Make it easier','Ignore it'], answer:0 },
      { q:'Make responses:', options:['Difficult','Easy','Fun','Instant'], answer:0 },
      { q:'Make cues:', options:['Invisible','Obvious','Attractive','Rewarding'], answer:0 }
    ]}
  ]},
  { id:'per-stress', category:'personal', icon:'🧠', title:'Stress Management & Burnout Prevention', description:'Manage stress effectively and maintain long-term well-being.', duration:'4 weeks', level:'Beginner', lessons:[
    { title:'Understanding Stress', theory:'Stress is a response to demands. Eustress (positive) motivates; distress (negative) harms.', quiz:[
      { q:'Eustress is:', options:['Positive stress','Negative stress','No stress','Extreme stress'], answer:0 },
      { q:'Recognize signals:', options:['Early to prevent burnout','After burnout','Never','Only when severe'], answer:0 },
      { q:'Stress is:', options:['A response to demands','Always bad','Avoidable','A weakness'], answer:0 }
    ]},
    { title:'Coping Strategies', theory:'Healthy coping: exercise, sleep, social connection, hobbies, mindfulness. Build a coping toolkit.', quiz:[
      { q:'Healthy coping includes:', options:['Exercise, sleep, social connection','Isolation','Overwork','Avoidance'], answer:0 },
      { q:'Build a:', options:['Coping toolkit','Stress list','Avoidance plan','Burnout schedule'], answer:0 },
      { q:'Unhealthy coping:', options:['Makes things worse','Helps long-term','Is effective','Reduces stress'], answer:0 }
    ]},
    { title:'Preventing Burnout', theory:'Burnout has 3 dimensions: exhaustion, cynicism, inefficacy. Prevent with boundaries and recovery time.', quiz:[
      { q:'Burnout dimensions:', options:['Exhaustion, cynicism, inefficacy','Tired, hungry, bored','Stress, worry, fear','None'], answer:0 },
      { q:'Set:', options:['Boundaries','No limits','Unlimited work','Always yes'], answer:0 },
      { q:'Support systems:', options:['Prevent burnout','Cause burnout','Don\'t matter','Are optional'], answer:0 }
    ]}
  ]},
  { id:'per-learn', category:'personal', icon:'📚', title:'Learning How to Learn', description:'Master effective learning techniques to acquire any skill faster.', duration:'4 weeks', level:'Beginner', lessons:[
    { title:'How Learning Works', theory:'Learning involves focused and diffuse modes. Focused mode concentrates; diffuse mode connects ideas.', quiz:[
      { q:'Focused mode:', options:['Concentrates on details','Connects big ideas','Daydreams','Relaxes'], answer:0 },
      { q:'Diffuse mode:', options:['Connects ideas broadly','Focuses narrowly','Ignores context','Is unproductive'], answer:0 },
      { q:'Alternate between:', options:['Focused and diffuse modes','Only focused','Only diffuse','Neither'], answer:0 }
    ]},
    { title:'Active Recall & Spaced Repetition', theory:'Test yourself instead of re-reading. Space out reviews over time. Use flashcards (Anki).', quiz:[
      { q:'Active recall means:', options:['Testing yourself','Re-reading','Highlighting','Summarizing'], answer:0 },
      { q:'Spaced repetition:', options:['Spaces reviews over time','Crams all at once','Reviews once','Ignores review'], answer:0 },
      { q:'Flashcards use:', options:['Active recall','Passive reading','Watching','Listening'], answer:0 }
    ]},
    { title:'Feynman Technique', theory:'Explain a concept in simple terms as if teaching a child. Identify gaps in your understanding.', quiz:[
      { q:'Feynman technique:', options:['Explain simply to learn','Complicate concepts','Avoid teaching','Use jargon'], answer:0 },
      { q:'Gaps indicate:', options:['What you don\'t understand','What you know','Completion','Expertise'], answer:0 },
      { q:'Simplify until:', options:['You can explain clearly','It\'s complex','You give up','It\'s perfect'], answer:0 }
    ]}
  ]},
  { id:'per-conf', category:'personal', icon:'🦋', title:'Self-Confidence & Self-Esteem', description:'Build unshakable confidence and a positive self-image.', duration:'4 weeks', level:'Beginner', lessons:[
    { title:'Understanding Confidence', theory:'Confidence is trust in your abilities. It comes from competence and experience. Action creates confidence.', quiz:[
      { q:'Confidence comes from:', options:['Competence and experience','Natural talent','Luck','Money'], answer:0 },
      { q:'Fake it till you make it:', options:['Action creates confidence','Is dishonest','Doesn\'t work','Only for actors'], answer:0 },
      { q:'Confidence is:', options:['Trust in your abilities','Arrogance','Perfection','Know-it-all'], answer:0 }
    ]},
    { title:'Overcoming Self-Doubt', theory:'Challenge negative self-talk. Keep a success journal. Focus on past wins. Take action despite fear.', quiz:[
      { q:'Challenge:', options:['Negative self-talk','All criticism','Feedback','Others'], answer:0 },
      { q:'Success journal:', options:['Tracks wins and growth','Lists failures','Compares to others','Ignores progress'], answer:0 },
      { q:'Take action:', options:['Despite fear','Only when confident','Never','Wait for perfect'], answer:0 }
    ]},
    { title:'Building Self-Esteem', theory:'Self-esteem is your overall sense of worth. Separate your worth from achievements. Practice self-compassion.', quiz:[
      { q:'Self-esteem is about:', options:['Your sense of worth','Your achievements','Others opinions','Your salary'], answer:0 },
      { q:'Self-compassion means:', options:['Being kind to yourself','Being hard on yourself','Ignoring mistakes','Comparing'], answer:0 },
      { q:'Boundaries:', options:['Protect your well-being','Limit your growth','Push others away','Show weakness'], answer:0 }
    ]}
  ]}
];