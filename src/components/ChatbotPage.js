import React from "react";
import ChatBot from "react-simple-chatbot";
import { Segment } from "semantic-ui-react";
import './ChatbotPage.css';
import 'semantic-ui-css/semantic.min.css';

const SupportMessage = () => (
  <div>
    For further information, contact our support team at <a href="mailto:support@kidgage.com">support@kidgage.com</a>.
  </div>
);

function ChatbotPage() {
  const steps = [
    {
      id: 'Greet',
      message: 'Hello, Welcome to KidGage! How can I assist you today?',
      trigger: 'AskName'
    },
    {
      id: 'AskName',
      message: 'Please enter your name',
      trigger: 'Name'
    },
    {
      id: "Name",
      user: true,
      trigger: "mainOptions",
    },
    {
      id: "mainOptions",
      options: [
        { value: "Activities", label: "Activities", trigger: "Activities" },
        { value: "Schedule", label: "Schedule", trigger: "Schedule" },
        { value: "Fees", label: "Fees", trigger: "Fees" },
        { value: "Instructors", label: "Instructors", trigger: "Instructors" },
        { value: "Registration", label: "Registration", trigger: "Registration" },
      ],
    },
    {
      id: "Activities",
      message: 'We offer various activities such as Swimming, Dancing, Art, Music, Martial Arts, and Coding. Please select one to know more.',
      trigger: "activities",
    },
    {
      id: "activities",
      options: [
        { value: "Swimming", label: "Swimming", trigger: "Swimming" },
        { value: "Dancing", label: "Dancing", trigger: "Dancing" },
        { value: "Art", label: "Art", trigger: "Art" },
        { value: "Music", label: "Music", trigger: "Music" },
        { value: "Martial Arts", label: "Martial Arts", trigger: "MartialArts" },
        { value: "Coding", label: "Coding", trigger: "Coding" },
      ],
    },
    {
      id: 'Swimming',
      message: 'Great! You selected Swimming. Please visit our swimming classes section to book a session or ask about class timings.',
      trigger: 'Support'
    },
    {
      id: 'Dancing',
      message: 'Great! You selected Dancing. Please visit our dancing classes section to book a session or inquire about the schedule.',
      trigger: 'Support'
    },
    {
      id: 'Art',
      message: 'Great! You selected Art. Please visit our art classes section to book a session or ask about art materials.',
      trigger: 'Support'
    },
    {
      id: 'Music',
      message: 'Great! You selected Music. Please visit our music classes section to book a session or learn about the different music programs we offer.',
      trigger: 'Support'
    },
    {
      id: 'MartialArts',
      message: 'Great! You selected Martial Arts. Please visit our martial arts classes section to book a session or find out about our martial arts instructors.',
      trigger: 'Support'
    },
    {
      id: 'Coding',
      message: 'Great! You selected Coding. Please visit our coding classes section to book a session or ask about our coding curriculum.',
      trigger: 'Support'
    },
    {
      id: 'Schedule',
      message: 'Our classes are scheduled throughout the week. Please visit our schedule page for more details or let me know if you need a specific class schedule.',
      trigger: 'Support'
    },
    {
      id: 'Fees',
      message: 'The fees for each activity vary. You can check the detailed fee structure on our fees page or let me know if you need specific information.',
      trigger: 'Support'
    },
    {
      id: 'Instructors',
      message: 'Our instructors are highly qualified and experienced. For detailed information about our instructors, please visit our instructors page or ask about a specific instructor.',
      trigger: 'Support'
    },
    {
      id: 'Registration',
      message: 'To register for a class, please visit our registration page. If you need help with the registration process, feel free to ask!',
      trigger: 'Support'
    },
    {
      id: 'Support',
      message: 'If you have further questions, our support team is here to help!',
      component: <SupportMessage />,
      end: true
    }
  ];

  return (
    <Segment floated="right">
      <ChatBot steps={steps} />
    </Segment>
  );
}

export default ChatbotPage;
