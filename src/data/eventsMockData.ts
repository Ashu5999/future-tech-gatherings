
export interface Event {
  id: string;
  name: string;
  description: string;
  date: string;
  time: string;
  location: string;
  college: string;
  type: 'hackathon' | 'tech-talk' | 'workshop';
  link: string;
  imageUrl?: string;
}

export const events: Event[] = [
  {
    id: '1',
    name: 'AI & Machine Learning Workshop',
    description: 'Learn the fundamentals of AI and ML with hands-on exercises using TensorFlow and PyTorch.',
    date: '2025-06-15',
    time: '10:00 AM - 4:00 PM',
    location: 'CS Building, Room 105',
    college: 'MIT',
    type: 'workshop',
    link: 'https://example.edu/ai-workshop',
    imageUrl: 'https://images.unsplash.com/photo-1591453089816-0fbb971b454c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
  },
  {
    id: '2',
    name: 'Blockchain Hackathon',
    description: 'A 48-hour hackathon focused on building innovative blockchain applications for real-world problems.',
    date: '2025-07-20',
    time: '9:00 AM (48 hours)',
    location: 'Innovation Center',
    college: 'Stanford',
    type: 'hackathon',
    link: 'https://example.edu/blockchain-hackathon',
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
  },
  {
    id: '3',
    name: 'Future of Quantum Computing',
    description: 'Tech talk by Dr. Jane Smith on the latest advancements in quantum computing and its implications.',
    date: '2025-06-05',
    time: '6:00 PM - 8:00 PM',
    location: 'Physics Auditorium',
    college: 'Caltech',
    type: 'tech-talk',
    link: 'https://example.edu/quantum-talk',
    imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
  },
  {
    id: '4',
    name: 'Web3 Development Workshop',
    description: 'Hands-on workshop covering the basics of Web3 development using Ethereum and Solidity.',
    date: '2025-06-25',
    time: '1:00 PM - 5:00 PM',
    location: 'Engineering Building, Room 302',
    college: 'UC Berkeley',
    type: 'workshop',
    link: 'https://example.edu/web3-workshop',
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
  },
  {
    id: '5',
    name: 'Cybersecurity Challenge',
    description: 'A competitive event where participants tackle real-world security challenges and ethical hacking scenarios.',
    date: '2025-07-10',
    time: '10:00 AM - 6:00 PM',
    location: 'Computer Science Building',
    college: 'CMU',
    type: 'hackathon',
    link: 'https://example.edu/cybersecurity-challenge',
    imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
  },
  {
    id: '6',
    name: 'Product Design in Tech',
    description: 'Tech talk by leading product designers from major tech companies discussing the future of product design.',
    date: '2025-06-20',
    time: '5:30 PM - 7:30 PM',
    location: 'Design Studio',
    college: 'RISD',
    type: 'tech-talk',
    link: 'https://example.edu/design-talk',
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
  },
  {
    id: '7',
    name: 'IoT Innovation Hackathon',
    description: 'Build innovative IoT solutions for smart cities, homes, or healthcare applications.',
    date: '2025-08-05',
    time: '9:00 AM (36 hours)',
    location: 'Engineering Innovation Center',
    college: 'Georgia Tech',
    type: 'hackathon',
    link: 'https://example.edu/iot-hackathon',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
  },
  {
    id: '8',
    name: 'Cloud Computing Workshop',
    description: 'Learn to deploy applications using AWS, Azure, and Google Cloud with this hands-on workshop.',
    date: '2025-06-30',
    time: '11:00 AM - 3:00 PM',
    location: 'Tech Hub, Room 405',
    college: 'University of Washington',
    type: 'workshop',
    link: 'https://example.edu/cloud-workshop',
    imageUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
  }
];
