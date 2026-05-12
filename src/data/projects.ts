import Docurious from "../assets/docurious.png";
import ChefPortal from "../assets/chef-portal.png";
import Charity from "../assets/charity.png";
import HealthCare from "../assets/health_care.png";
import Betki from "../assets/marketing.png";
import Cloves from "../assets/cloves.mp4";

export type ProjectMediaType = "image" | "video";

export interface Project {
  title: string;
  category: string;
  url: string;
  description: string;
  tags: string[];
  image: string;
  type: ProjectMediaType;
}

export const PROJECTS: Project[] = [
  {
    title: "Event & Challenge Platform",
    category: "Full Stack",
    url: "https://portal.docurious.com",
    description:
      "A platform that connects users and service providers, where vendors organize challenges (events) for users to participate in.It automates key processes such as participation tracking and payouts, ensuring a seamless experience for all parties.",
    tags: ["Laravel", "MySQL", "React", "REST APIs"],
    image: Docurious,
    type: "image",
  },
  {
    title: "Chef Portal & Order Management Platform",
    category: "Full Stack",
    url: "https://prepbychef.com",
    description:
      "A platform connecting chefs and users, managing orders, deliveries, and commissions seamlessly. The system automates key processes to make the experience smooth and efficient for everyone..",
    tags: ["Laravel", "MySQL"],
    image: ChefPortal,
    type: "image",
  },
  
  {
    title: "Secure Online Charity & Donation Platform",
    category: "Full Stack",
    url: "https://demo-customlinks.com/nationempower_dev",
    description:
      "This charity website is a full-stack web application that enables users to donate online using PayPal and Stripe payment gateways. It includes secure payment processing, responsive UI, donation management, and a scalable backend architecture.",
    tags: ["Laravel", "MySQL"],
    image: Charity,
    type: "image",
  },
  {
    title: "Biteki Marketing – Creative Agency Platform",
    category: "Full Stack",
    url: "https://demo-customlinks.com/biteki_dev",
    description:
      "Creative social media marketing and food photography website for UK restaurants, offering content shoots, short-form videos, and flexible, no-contract marketing plans.",
    tags: ["Laravel", "MySQL"],
    image: Betki,
    type: "image",
  },
  {
    title: "Healthcare Staffing NW",
    category: "Full Stack",
    url: "https://demo-customlinks.com/health_care_dev",
    description:
      "A modern healthcare staffing agency website designed to support medical professionals by simplifying job placement, promoting work–life balance, and building long-term partnerships through flexible and supportive staffing solutions.",
    tags: ["Laravel", "MySQL"],
    image: HealthCare,
    type: "image",
  },
  {
    title: "ClovesRX Global — Prescription Delivery",
    category: "Full Stack",
    url: "#",
    description:
      "A prescription delivery platform built to support secure and on-time medication delivery for pharmacies across Southern California, helping streamline prescription fulfillment and improve patient access to essential medications.",
    tags: ["Laravel", "MySQL"],
    image: Cloves,
    type: "video",
  },
];

export function projectCategories(): string[] {
  const set = new Set(PROJECTS.map((p) => p.category));
  return Array.from(set).sort();
}
