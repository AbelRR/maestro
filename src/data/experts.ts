// Mock expert data - in a real app this would come from an API or database
export const expertsData = {
  "joe-polish": {
    id: "joe-polish",
    name: "Joe Polish",
    title: "Marketing Guru, President of Piranha Marketing and Founder of Genius Network",
    image: "https://ext.same-assets.com/912308905/4211144141.jpeg",
    description: "Joe Polish is a marketing guru, founder of Genius Network, and president of Piranha Marketing. He's helped countless entrepreneurs grow their businesses through his unique approach to marketing and networking.",
    phone: "+1 (555) 123-4567",
    suggestedQuestions: [
      { id: "q1", text: "How can I build a more effective marketing strategy for my business?" },
      { id: "q2", text: "What's the best way to network with other entrepreneurs?" },
      { id: "q3", text: "How did you overcome initial marketing challenges in your career?" },
    ],
    initialMessage: "Hey it's Joe Polish. What's on your mind today?"
  },
  "brendon-burchard": {
    id: "brendon-burchard",
    name: "Brendon Burchard",
    title: "3-time NYT bestselling author",
    image: "https://ext.same-assets.com/2705240281/1000014443.jpeg",
    description: "Brendon Burchard is a 3-time New York Times bestselling author and one of the most watched, quoted, and followed personal development trainers in the world. He is a #1 New York Times bestselling author whose books include High Performance Habits, The Motivation Manifesto, and The Charge.",
    phone: "+1 (555) 987-6543",
    suggestedQuestions: [
      { id: "q1", text: "How can one's energy influence the people around them?" },
      { id: "q2", text: "How does regular exercise contribute to your mental performance and overall success?" },
      { id: "q3", text: "Does high performance correlate with personality or is it more tied to desires for growth, achievement, and contribution?" },
    ],
    initialMessage: "Hey striver! Welcome to GrowthDay. This is Brendon AI. What did you get done this week? What went well? Did you achieve your goals, or are you struggling with something? Just start sharing with me and we'll grow, together. Talk to me now I'm here for you."
  },
  "lewis-howes": {
    id: "lewis-howes",
    name: "Lewis Howes",
    title: "Your Personal 24/7 Greatness Coach",
    image: "https://ext.same-assets.com/2109823954/849522504.png",
    description: "Lewis Howes is a New York Times Bestselling author, lifestyle entrepreneur, high performance business coach and keynote speaker. A former professional football player and two-sport All-American, he is a current USA Men's National Handball Team athlete. He hosts a top 100 iTunes ranked podcast, The School of Greatness, which has over 300 million downloads and 1000 episodes since it launched in 2013.",
    phone: "+1 (555) 789-0123",
    suggestedQuestions: [
      { id: "q1", text: "How can I identify and pursue my meaningful mission in life?" },
      { id: "q2", text: "What habits or routines can help me stay consistent and focused on my vision?" },
      { id: "q3", text: "When does Make Money Easy come out?" },
    ],
    initialMessage: "Hey it's Lewis. What's on your mind today?"
  },
  "marie-forleo": {
    id: "marie-forleo",
    name: "Marie Forleo",
    title: "Entrepreneur, Writer, and Life Coach",
    image: "https://ext.same-assets.com/1923499456/3590525356.jpeg",
    description: "Marie Forleo is a #1 New York Times bestselling author, entrepreneur, and philanthropist. Named by Oprah as a thought leader for the next generation, she's the star of the award-winning show MarieTV and host of The Marie Forleo Podcast, with more than 75 million downloads. Marie has taught entrepreneurs, artists, and leaders how to transform their lives through her online programs.",
    phone: "+1 (555) 234-5678",
    suggestedQuestions: [
      { id: "q1", text: "How do I overcome perfectionism that's stopping me from starting my business?" },
      { id: "q2", text: "What's your advice for balancing multiple passions and projects?" },
      { id: "q3", text: "How can I make my marketing more authentic and effective?" },
    ],
    initialMessage: "Hey there! It's Marie. I'm so excited to chat with you. What's something you're working on or struggling with that I might be able to help with today?"
  },
  "tom-bilyeu": {
    id: "tom-bilyeu",
    name: "Tom Bilyeu",
    title: "Co-Founder of Impact Theory",
    image: "https://ext.same-assets.com/1122016266/3530258868.jpeg",
    description: "Tom Bilyeu is the co-founder of Impact Theory and Quest Nutrition, a 2014 Inc. 500 company. He is a filmmaker and serial entrepreneur who chased money for nearly a decade and came up emotionally bankrupt. He changed his focus to creating value for others and helping people develop the skills they need to improve themselves and the world.",
    phone: "+1 (555) 345-6789",
    suggestedQuestions: [
      { id: "q1", text: "How do I develop an unshakeable growth mindset?" },
      { id: "q2", text: "What books have had the biggest impact on your thinking?" },
      { id: "q3", text: "How can I build mental toughness to overcome challenges?" },
    ],
    initialMessage: "Hey, Tom Bilyeu here. I'm passionate about helping people develop the skills they need to improve themselves. What mindset challenge are you facing right now?"
  },
  "gary-vaynerchuk": {
    id: "gary-vaynerchuk",
    name: "Gary Vaynerchuk",
    title: "CEO of VaynerMedia, Entrepreneur & Content Creator",
    image: "https://ext.same-assets.com/1801423781/2486219231.jpeg",
    description: "Gary Vaynerchuk is a serial entrepreneur, and serves as the Chairman of VaynerX and the CEO of VaynerMedia. Gary is considered one of the leading global minds on what's next in culture, relevance and the internet. He's a prolific angel investor with early investments in companies such as Facebook, Twitter, Venmo and Uber.",
    phone: "+1 (555) 456-7890",
    suggestedQuestions: [
      { id: "q1", text: "What's your advice for someone starting content creation today?" },
      { id: "q2", text: "How do you manage your time with so many businesses and projects?" },
      { id: "q3", text: "What emerging platforms or technologies should entrepreneurs be watching?" },
    ],
    initialMessage: "What's up! Gary Vee here. No fluff, just straight talk. What can I help you with today?"
  },
  "mel-robbins": {
    id: "mel-robbins",
    name: "Mel Robbins",
    title: "Motivational Speaker & Author of The 5 Second Rule",
    image: "https://ext.same-assets.com/4132804743/1043940026.png",
    description: "Mel Robbins is the international bestselling author of The 5 Second Rule and four other bestselling books. She's one of the most booked female speakers in the world and a trusted voice in personal development. Her groundbreaking work on behavior change has been translated into 36 languages.",
    phone: "+1 (555) 567-8901",
    suggestedQuestions: [
      { id: "q1", text: "How can I use the 5 Second Rule to overcome procrastination?" },
      { id: "q2", text: "What techniques do you recommend for managing anxiety?" },
      { id: "q3", text: "How can I break the habit of overthinking?" },
    ],
    initialMessage: "Hi there. It's Mel Robbins. I'm here to help you push through uncertainty and self-doubt. What's something you've been hesitating on that I can help with today?"
  },
  "jay-shetty": {
    id: "jay-shetty",
    name: "Jay Shetty",
    title: "Former Monk, Purpose Coach & Host of On Purpose",
    image: "https://ext.same-assets.com/1210758745/849522504.png",
    description: "Jay Shetty is a British-American author, life coach, and former Hindu monk. He hosts the podcast On Purpose, which has featured guests including Alicia Keys, Khloe Kardashian, and Kobe Bryant. In 2019, Shetty was included in Forbes 30 Under 30 for being a game-changer in media.",
    phone: "+1 (555) 678-9012",
    suggestedQuestions: [
      { id: "q1", text: "How can I incorporate mindfulness practices into my busy day?" },
      { id: "q2", text: "What monk wisdom is most relevant for modern life challenges?" },
      { id: "q3", text: "How can I discover my purpose when I feel lost or directionless?" },
    ],
    initialMessage: "Hey, it's Jay. I believe we all have a purpose waiting to be discovered. What's on your heart and mind today?"
  },
  "tim-ferriss": {
    id: "tim-ferriss",
    name: "Tim Ferriss",
    title: "Author, Entrepreneur, Angel Investor",
    image: "https://ext.same-assets.com/1210758745/1043940026.png",
    description: "Tim Ferriss has been listed as one of Fast Company's 'Most Innovative Business People' and one of Fortune's '40 under 40.' He is an early-stage technology investor/advisor and the author of five #1 New York Times and Wall Street Journal bestsellers. Tim is best known for his podcast, The Tim Ferriss Show, which has more than 900 million downloads.",
    phone: "+1 (555) 789-0123",
    suggestedQuestions: [
      { id: "q1", text: "What are the most effective morning routines you've discovered?" },
      { id: "q2", text: "How do you evaluate potential investments or business opportunities?" },
      { id: "q3", text: "What are the most common patterns you see among high performers?" },
    ],
    initialMessage: "Hey, Tim Ferriss here. I'm all about testing and optimizing to find what works. What specific challenge are you working through that we can deconstruct together?"
  },
  "brian-armstrong": {
    id: "brian-armstrong",
    name: "Brian Armstrong",
    title: "CEO and Co-founder of Coinbase",
    image: "https://podcastnotes.org/wp-content/uploads/2022/09/brian-armstrong-headshot.png",
    description: "Brian Armstrong is the CEO and co-founder of Coinbase, the largest cryptocurrency exchange in the United States. A pioneer in the cryptocurrency space and visionary for the future of finance.",
    phone: "+1 (555) 123-4567",
    suggestedQuestions: [
      { id: "q1", text: "What's your vision for the future of cryptocurrency?" },
      { id: "q2", text: "How do you see blockchain technology evolving in the next 5 years?" },
      { id: "q3", text: "What advice would you give to someone starting in the crypto space today?" },
    ],
    initialMessage: "Hi there, I'm Brian Armstrong. As the CEO of Coinbase, I'm passionate about creating an open financial system for the world. What would you like to discuss about crypto, blockchain, or building companies?"
  }
};
