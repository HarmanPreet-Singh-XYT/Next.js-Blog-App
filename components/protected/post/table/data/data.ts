import {
  Sparkles,
  Leaf,
  Globe,
  Apple,
  Heart,
  Lightbulb,
  Hammer,
  Gavel, // For Marriage, as a stand-in for commitment/legal aspect
  Monitor,
  Plane,
  Activity,
  Briefcase,
  Brush, // For Cleaning
  Book,
  Users,
  Martini,
  Home,
  Laptop,
  Flower,
  PiggyBank,
  Wallet,
  Share2, // For Social Media
  Compass,
  MonitorPlay, // For Film & TV
  Bone, // For Pet Care
  Dice5, // For Board Games
  Megaphone, // For Digital Marketing
  Pencil,
  Layout, // For Web Design
  Map, // For Travel Guide
  GraduationCap,
  Atom, // For Science News
  Utensils, // For Food Recipes
  Droplet, // For Holistic Living
  TrendingUp, // For Personal Development
  Sword, // For Survivalism
  Building,
  LightbulbOff, // For Digital Marketing Tips (could be a more specific icon if available)
  Palette, // For Home Decor Ideas
  BarChart, // For Personal Growth
  Camera,
  Dumbbell,
  Package, // For Dropshipping
  Smile, // For Self-Improvement
  Scroll, // For Journaling
  Sparkle, // For Beauty & Skincare
  Salad, // For Local Food
  Brain, // For Mindfulness
  Newspaper, // For Current Events
  Car, // For Vehicle Maintenance
  Calculator, // For Budgeting
  Coins, // For Frugal Living
  Wrench, // For Home Improvement
  Banknote, // For Financial Planning
  Paintbrush, // For Art & Design
  Tv, // For Pop Culture
  BookOpen, // For History
  AlertTriangle, // For Issue & Impact
  Coffee, // For Productivity

  BookText, // For Reading
  Dog, // For Pet Care Tips
  Shield, // For Cybersecurity
  Code, // For Software Reviews
  Star, // For Product Reviews
  BrainCircuit, // For AI & Machine Learning
  BookOpenText, // For Online Courses
  Caravan, // For Van Life
  Mail, // For Career Advice (as a stand-in for communication/networking)
  HeartPulse, // For Mental Health
  Target, // For Digital Marketing Strategy
  Clock, // For Habits & Routines
  Crown, // For Career Growth (as a stand-in for achievement)
  ShieldCheck, // For Home Security
  Wine,
  PlaneTakeoff,
  CookingPot,
  Cake, // For Food & Drink
} from 'lucide-react';
import {
  Pencil2Icon as DraftIcon,
  CheckCircledIcon as PublishedIcon,
} from "@radix-ui/react-icons";

export const statuses = [
  {
    value: "published",
    label: "Published",
    icon: PublishedIcon,
  },
  {
    value: "draft",
    label: "Draft",
    icon: DraftIcon,
  },
];



export const categories = [
  {
    value: "03fddbbe-3d3f-4e08-bfb5-a131809299",
    label: "Product Research",
    icon: Sparkles,
  },
  {
    value: "1e1a5a82-fcf3-4402-a16f-7038168f184d",
    label: "Sustainable",
    icon: Leaf,
  },
  {
    value: "f1f3e9c4-9721-4f1e-8e4d-045b84d4361e",
    label: "Digital Nomad",
    icon: Globe,
  },
  {
    value: "148384ee-fcf2-4a0b-99d9-19e9159f470a",
    label: "Nutrition",
    icon: Apple,
  },
  {
    value: "182b456e-82b5-412f-923f-e18e8d87a419",
    label: "Lifestyle",
    icon: Heart,
  },
  {
    value: "1f9159bb-7b56-4b8c-8f9f-0929f95f4b5f",
    label: "AI",
    icon: BrainCircuit, // Using BrainCircuit for AI
  },
  {
    value: "1a9f59f4-0b5c-4b8c-8f9f-0929f95f4b5f",
    label: "DIY Project",
    icon: Hammer,
  },
  {
    value: "2a9f59f4-1b5c-4b8c-8f9f-0929f95f4b5f",
    label: "Marriage",
    icon: Gavel,
  },
  {
    value: "2e8f59f4-2c5d-4b8c-8f9f-0929f95f4b5f",
    label: "Online",
    icon: Monitor,
  },
  {
    value: "2d33f9f7-0d0e-4b8c-8f9f-0929f95f4b5f",
    label: "Budget Travel",
    icon: Plane,
  },
  {
    value: "3a41f9f7-1e0e-4b8c-8f9f-0929f95f4b5f",
    label: "Health & Fitness",
    icon: Activity,
  },
  {
    value: "3a4140a6-1e0e-4b8c-8f9f-0929f95f4b5f",
    label: "Baking",
    icon: Cake,
  },
  {
    value: "3b4140a6-1e0e-4b8c-8f9f-0929f95f4b5f",
    label: "Jobs",
    icon: Briefcase,
  },
  {
    value: "418c40a6-1e0e-4b8c-8f9f-0929f95f4b5f",
    label: "Cleaning",
    icon: Brush,
  },
  {
    value: "4d78c1d8-0e0e-4b8c-8f9f-0929f95f4b5f",
    label: "Life Lessons",
    icon: Book,
  },
  {
    value: "51c1d8a8-0e0e-4b8c-8f9f-0929f95f4b5f",
    label: "Parenting",
    icon: Users,
  },
  {
    value: "51ff2fe4-0e0e-4b8c-8f9f-0929f95f4b5f",
    label: "Drinks & Cocktails",
    icon: Martini,
  },
  {
    value: "57cc2fe4-0e0e-4b8c-8f9f-0929f95f4b5f",
    label: "Home Decor",
    icon: Home,
  },
  {
    value: "59cf1201-0e0e-4b8c-8f9f-0929f95f4b5f",
    label: "Tech Review",
    icon: Laptop,
  },
  {
    value: "5bcf1201-0e0e-4b8c-8f9f-0929f95f4b5f",
    label: "Gardening",
    icon: Flower,
  },
  {
    value: "5c0ec290-0e0e-4b8c-8f9f-0929f95f4b5f",
    label: "Saving Money",
    icon: PiggyBank,
  },
  {
    value: "5d0ec290-0e0e-4b8c-8f9f-0929f95f4b5f",
    label: "Personal Finance",
    icon: Wallet,
  },
  {
    value: "60d1b20b-0e0e-4b8c-8f9f-0929f95f4b5f",
    label: "Social Media",
    icon: Share2,
  },
  {
    value: "61d1b20b-0e0e-4b8c-8f9f-0929f95f4b5f",
    label: "Travel",
    icon: Compass,
  },
  {
    value: "64e0e3c9-0e0e-4b8c-8f9f-0929f95f4b5f",
    label: "Film & TV",
    icon: MonitorPlay,
  },
  {
    value: "69e0e3c9-0e0e-4b8c-8f9f-0929f95f4b5f",
    label: "Pet Care",
    icon: Bone,
  },
  {
    value: "691a6031-0e0e-4b8c-8f9f-0929f95f4b5f",
    label: "Board Games",
    icon: Dice5,
  },
  {
    value: "6c1a6031-0e0e-4b8c-8f9f-0929f95f4b5f",
    label: "Digital Marketing",
    icon: Megaphone,
  },
  {
    value: "72b663af-0e0e-4b8c-8f9f-0929f95f4b5f",
    label: "Writing",
    icon: Pencil,
  },
  {
    value: "73b663af-0e0e-4b8c-8f9f-0929f95f4b5f",
    label: "Web Design",
    icon: Layout,
  },
  {
    value: "756f5dff-0e0e-4b8c-8f9f-0929f95f4b5f",
    label: "Travel Guide",
    icon: Map,
  },
  {
    value: "766f5dff-0e0e-4b8c-8f9f-0929f95f4b5f",
    label: "Education",
    icon: GraduationCap,
  },
  {
    value: "7d080fcf-0e0e-4b8c-8f9f-0929f95f4b5f",
    label: "Science News",
    icon: Atom,
  },
  {
    value: "7f080fcf-0e0e-4b8c-8f9f-0929f95f4b5f",
    label: "Food Recipes",
    icon: Utensils,
  },
  {
    value: "82c45ed7-0e0e-4b8c-8f9f-0929f95f4b5f",
    label: "Holistic Living",
    icon: Droplet,
  },
  {
    value: "84c45ed7-0e0e-4b8c-8f9f-0929f95f4b5f",
    label: "Personal Development",
    icon: TrendingUp,
  },
  {
    value: "891b989f-0e0e-4b8c-8f9f-0929f95f4b5f",
    label: "Survivalism",
    icon: Sword,
  },
  {
    value: "8c1b989f-0e0e-4b8c-8f9f-0929f95f4b5f",
    label: "Business",
    icon: Building,
  },
  {
    value: "8c75c832-0e0e-4b8c-8f9f-0929f95f4b5f",
    label: "Digital Marketing Tips",
    icon: LightbulbOff,
  },
  {
    value: "9075c832-0e0e-4b8c-8f9f-0929f95f4b5f",
    label: "Cooking",
    icon: CookingPot,
  },
  {
    value: "90551193-0e0e-4b8c-8f9f-0929f95f4b5f",
    label: "Home Decor Ideas",
    icon: Palette,
  },
  {
    value: "92551193-0e0e-4b8c-8f9f-0929f95f4b5f",
    label: "Personal Growth",
    icon: BarChart,
  },
  {
    value: "9224a823-0e0e-4b8c-8f9f-0929f95f4b5f",
    label: "Photography",
    icon: Camera,
  },
  {
    value: "9324a823-0e0e-4b8c-8f9f-0929f95f4b5f",
    label: "Fitness Routines",
    icon: Dumbbell,
  },
  {
    value: "970f8132-0e0e-4b8c-8f9f-0929f95f4b5f",
    label: "Dropshipping",
    icon: Package,
  },
  {
    value: "9a0f8132-0e0e-4b8c-8f9f-0929f95f4b5f",
    label: "Self-Improvement",
    icon: Smile,
  },
  {
    value: "9ac51391-0e0e-4b8c-8f9f-0929f95f4b5f",
    label: "Journaling",
    icon: Scroll,
  },
  {
    value: "9b951391-0e0e-4b8c-8f9f-0929f95f4b5f",
    label: "Beauty & Skincare",
    icon: Sparkle,
  },
  {
    value: "a062b891-0e0e-4b8c-8f9f-0929f95f4b5f",
    label: "Household Tips",
    icon: Home,
  },
  {
    value: "a362b891-0e0e-4b8c-8f9f-0929f95f4b5f",
    label: "Career",
    icon: Briefcase,
  },
  {
    value: "a55c637a-0e0e-4b8c-8f9f-0929f95f4b5f",
    label: "Local Food",
    icon: Salad,
  },
  {
    value: "a65c637a-0e0e-4b8c-8f9f-0929f95f4b5f",
    label: "Mindfulness",
    icon: Brain,
  },
  {
    value: "ad941e1b-0e0e-4b8c-8f9f-0929f95f4b5f",
    label: "Current Events",
    icon: Newspaper,
  },
  {
    value: "ae941e1b-0e0e-4b8c-8f9f-0929f95f4b5f",
    label: "Vehicle Maintenance",
    icon: Car,
  },
  {
    value: "b1025ef8-0e0e-4b8c-8f9f-0929f95f4b5f",
    label: "Budgeting",
    icon: Calculator,
  },
  {
    value: "b2025ef8-0e0e-4b8c-8f9f-0929f95f4b5f",
    label: "Frugal Living",
    icon: Coins,
  },
  {
    value: "bd025ef8-0e0e-4b8c-8f9f-0929f95f4b5f",
    label: "Home Improvement",
    icon: Wrench,
  },
  {
    value: "bd8e7c15-0e0e-4b8c-8f9f-0929f95f4b5f",
    label: "Financial Planning",
    icon: Banknote,
  },
  {
    value: "c18e7c15-0e0e-4b8c-8f9f-0929f95f4b5f",
    label: "Art & Design",
    icon: Paintbrush,
  },
  {
    value: "c2fe3cbb-0e0e-4b8c-8f9f-0929f95f4b5f",
    label: "Pop Culture",
    icon: Tv,
  },
  {
    value: "c7fe3cbb-0e0e-4b8c-8f9f-0929f95f4b5f",
    label: "Technology Tips",
    icon: Laptop,
  },
  {
    value: "c91c457b-0e0e-4b8c-8f9f-0929f95f4b5f",
    label: "History",
    icon: BookOpen,
  },
  {
    value: "ca1c457b-0e0e-4b8c-8f9f-0929f95f4b5f",
    label: "Issue & Impact",
    icon: AlertTriangle,
  },
  {
    value: "cb1c457b-0e0e-4b8c-8f9f-0929f95f4b5f",
    label: "Productivity",
    icon: Coffee,
  },
  {
    value: "cb7c457b-0e0e-4b8c-8f9f-0929f95f4b5f",
    label: "Study Tips",
    icon: GraduationCap,
  },
  {
    value: "cc1c457b-0e0e-4b8c-8f9f-0929f95f4b5f",
    label: "Reading",
    icon: BookText,
  },
  {
    value: "ce8e5de8-0e0e-4b8c-8f9f-0929f95f4b5f",
    label: "Pet Care Tips",
    icon: Dog,
  },
  {
    value: "cf8e5de8-0e0e-4b8c-8f9f-0929f95f4b5f",
    label: "Home Improvement Tips",
    icon: Home,
  },
  {
    value: "d0fbb370-0e0e-4b8c-8f9f-0929f95f4b5f",
    label: "Cybersecurity",
    icon: Shield,
  },
  {
    value: "d1fbb370-0e0e-4b8c-8f9f-0929f95f4b5f",
    label: "Software Reviews",
    icon: Code,
  },
  {
    value: "d460a27d-0e0e-4b8c-8f9f-0929f95f4b5f",
    label: "Investing",
    icon: TrendingUp,
  },
  {
    value: "d560a27d-0e0e-4b8c-8f9f-0929f95f4b5f",
    label: "Product Reviews",
    icon: Star,
  },
  {
    value: "d9f82d00-0e0e-4b8c-8f9f-0929f95f4b5f",
    label: "AI & Machine Learning",
    icon: BrainCircuit,
  },
  {
    value: "dbf82d00-0e0e-4b8c-8f9f-0929f95f4b5f",
    label: "Online Courses",
    icon: BookOpenText,
  },
  {
    value: "dc6d55ae-0e0e-4b8c-8f9f-0929f95f4b5f",
    label: "Van Life",
    icon: Caravan,
  },
  {
    value: "dd6d55ae-0e0e-4b8c-8f9f-0929f95f4b5f",
    label: "Career Advice",
    icon: Mail,
  },
  {
    value: "e062f5cf-0e0e-4b8c-8f9f-0929f95f4b5f",
    label: "Solo Travel",
    icon: Plane, // Using Plane again for Solo Travel
  },
  {
    value: "e162f5cf-0e0e-4b8c-8f9f-0929f95f4b5f",
    label: "Mental Health",
    icon: HeartPulse,
  },
  {
    value: "e512f5cf-0e0e-4b8c-8f9f-0929f95f4b5f",
    label: "Digital Marketing Strategy",
    icon: Target,
  },
  {
    value: "e615e0dd-0e0e-4b8c-8f9f-0929f95f4b5f",
    label: "Habits & Routines",
    icon: Clock,
  },
  {
    value: "e715e0dd-0e0e-4b8c-8f9f-0929f95f4b5f",
    label: "Drones",
    icon: PlaneTakeoff,
  },
  {
    value: "ed2f7b56-0e0e-4b8c-8f9f-0929f95f4b5f",
    label: "Fitness",
    icon: Heart,
  },
  {
    value: "ef2f7b56-0e0e-4b8c-8f9f-0929f95f4b5f",
    label: "Career Growth",
    icon: Crown,
  },
  {
    value: "ee2f7b56-0e0e-4b8c-8f9f-0929f95f4b5f",
    label: "Home Security",
    icon: ShieldCheck,
  },
  {
    value: "ef9a16a0-0e0e-4b8c-8f9f-0929f95f4b5f",
    label: "Freelancing",
    icon: Briefcase,
  },
  {
    value: "f09a16a0-0e0e-4b8c-8f9f-0929f95f4b5f",
    label: "Business Tips",
    icon: Lightbulb,
  },
  {
    value: "f341b74d-0e0e-4b8c-8f9f-0929f95f4b5f",
    label: "Frugal Living Tips",
    icon: Coins,
  },
  {
    value: "f441b74d-0e0e-4b8c-8f9f-0929f95f4b5f",
    label: "Food & Drink",
    icon: Wine,
  },
  {
    value: "f4127159-0e0e-4b8c-8f9f-0929f95f4b5f",
    label: "Health & Wellness",
    icon: Heart,
  },
  {
    value: "f7127159-0e0e-4b8c-8f9f-0929f95f4b5f",
    label: "Family",
    icon: Users,
  },
  {
    value: "fb36d061-0e0e-4b8c-8f9f-0929f95f4b5f",
    label: "Self Improvement",
    icon: Smile,
  },
  {
    value: "fd36d061-0e0e-4b8c-8f9f-0929f95f4b5f",
    label: "Personal Finance Tips",
    icon: Wallet,
  },
  {
    value: "fe36d061-0e0e-4b8c-8f9f-0929f95f4b5f",
    label: "Productivity Tips",
    icon: Lightbulb,
  },
  {
    value: "ff451b4b-0e0e-4b8c-8f9f-0929f95f4b5f",
    label: "Art & Design Ideas",
    icon: Palette,
  },
];