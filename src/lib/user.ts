import { portrait } from "@/images";

const user = {
  first_name: "Sarah",
  middle_name: "Jane",
  last_name: "Adebayo",
  email: "sarahexample@xyz.com",
  phone_number: "+234 123 456 7890",
  state: "Oyo",
  lga: "Ibadan North",
  image: portrait,
  weeksPregnant: 34,
};

const sampleMessages = [
  {
    id: 1,
    sender: "Dr. Adebayo",
    content: `Hello Amina, how are you feeling today?`,
    type: "text",
    timestamp: "2024-09-27T10:30:00",
  },
  {
    id: 2,
    sender: "Amina",
    content: `Hi Dr. Adebayo, I'm feeling good. Just a bit tired.`,
    type: "text",
    timestamp: "2024-09-27T10:32:00",
  },
  {
    id: 3,
    sender: "Dr. Adebayo",
    content: "diet_plan_week24.pdf",
    type: "file",
    timestamp: "2024-09-27T10:35:00",
  },
  {
    id: 4,
    sender: "Amina",
    content: `Thank you for the diet plan. I'll start following it right away.`,
    type: "text",
    timestamp: "2024-09-27T10:40:00",
  },
  {
    id: 5,
    sender: "Dr. Adebayo",
    content: "You're welcome Amina. Let me know if you have any questions.",
    type: "text",
    timestamp: "2024-09-27T10:45:00",
  },
  {
    id: 6,
    sender: "Amina",
    content: `I will. Thanks again.`,
    type: "text",
    timestamp: "2024-09-27T10:50:00",
  },
  {
    id: 7,
    sender: "Dr. Adebayo",
    content: `You're welcome.`,
    type: "text",
    timestamp: "2024-09-27T10:55:00",
  },
  {
    id: 8,
    sender: "Dr. Adebayo",
    content: `Hello Amina, how are you feeling today?`,
    type: "text",
    timestamp: "2024-09-27T10:30:00",
  },
  {
    id: 9,
    sender: "Amina",
    content: `Hi Dr. Adebayo, I'm feeling good. Just a bit tired.`,
    type: "text",
    timestamp: "2024-09-27T10:32:00",
  },
  {
    id: 10,
    sender: "Dr. Adebayo",
    content: "diet_plan_week24.pdf",
    type: "file",
    timestamp: "2024-09-27T10:35:00",
  },
  {
    id: 11,
    sender: "Amina",
    content: `Thank you for the diet plan. I'll start following it right away.`,
    type: "text",
    timestamp: "2024-09-27T10:40:00",
  },
  {
    id: 12,
    sender: "Dr. Adebayo",
    content: "You're welcome Amina. Let me know if you have any questions.",
    type: "text",
    timestamp: "2024-09-27T10:45:00",
  },
  {
    id: 13,
    sender: "Amina",
    content: `I will. Thanks again.`,
    type: "text",
    timestamp: "2024-09-27T10:50:00",
  },
  {
    id: 14,
    sender: "Dr. Adebayo",
    content: `You're welcome.`,
    type: "text",
    timestamp: "2024-09-27T10:55:00",
  },
];

const userList = [
  {
    id: 1,
    name: "Amina",
    image: portrait,
    lastMessage: "I will. Thanks again.",
  },
  {
    id: 2,
    name: "Shayo",
    image: portrait,
    lastMessage: "You're welcome.",
  },
  {
    id: 3,
    name: "Bola",
    image: portrait,
    lastMessage: "I will. Thanks again.",
  },
  {
    id: 4,
    name: "Tolu",
    image: portrait,
    lastMessage: "You're welcome.",
  },
  {
    id: 5,
    name: "Amina",
    image: portrait,
    lastMessage: "I will. Thanks again.",
  },
  {
    id: 6,
    name: "Shayo",
    image: portrait,
    lastMessage: "You're welcome.",
  },
  {
    id: 7,
    name: "Bola",
    image: portrait,
    lastMessage: "I will. Thanks again.",
  },
  {
    id: 8,
    name: "Tolu",
    image: portrait,
    lastMessage: "You're welcome.",
  },
  {
    id: 9,
    name: "Amina",
    image: portrait,
    lastMessage: "I will. Thanks again.",
  },
  {
    id: 10,
    name: "Shayo",
    image: portrait,
    lastMessage: "You're welcome.",
  },
  {
    id: 11,
    name: "Bola",
    image: portrait,
    lastMessage: "I will. Thanks again.",
  },
  {
    id: 12,
    name: "Tolu",
    image: portrait,
    lastMessage: "You're welcome.",
  },
  {
    id: 13,
    name: "Amina",
    image: portrait,
    lastMessage: "I will. Thanks again.",
  },
  {
    id: 14,
    name: "Shayo",
    image: portrait,
    lastMessage: "You're welcome.",
  },
  {
    id: 15,
    name: "Bola",
    image: portrait,
    lastMessage: "I will. Thanks again.",
  },
  {
    id: 16,
    name: "Tolu",
    image: portrait,
    lastMessage: "You're welcome.",
  },
  {
    id: 17,
    name: "Amina",
    image: portrait,
    lastMessage: "I will. Thanks again.",
  },
  {
    id: 18,
    name: "Shayo",
    image: portrait,
    lastMessage: "You're welcome.",
  },
];

const requests = [
  {
    name: "Emily Johnson",
    message: "Excited to start this journey!",
    image: portrait,
  },
  {
    name: "Michael Chen",
    message: "Looking forward to expert guidance.",
    image: portrait,
  },
  {
    name: "Sophia Rodriguez",
    message: "First-time mom, feeling nervous but happy!",
    image: portrait,
  },
  {
    name: "Aiden Patel",
    message: "Here to support my wife. Any tips for partners?",
    image: portrait,
  },
  {
    name: "Olivia Thompson",
    message: "Second pregnancy, each one is unique!",
    image: portrait,
  },
  {
    name: "Liam O'Connor",
    message: "Twins on the way! Double the excitement.",
    image: portrait,
  },
  {
    name: "Zoe Nakamura",
    message: "High-risk pregnancy, seeking extra care.",
    image: portrait,
  },
  {
    name: "Hassan Al-Farsi",
    message: "Interested in natural birthing methods.",
    image: portrait,
  },
  {
    name: "Isabella Rossi",
    message: "Questions about prenatal nutrition.",
    image: portrait,
  },
  {
    name: "Jamal Williams",
    message: "First-time dad, eager to learn!",
    image: portrait,
  },
];

export { user, sampleMessages, userList, requests };
