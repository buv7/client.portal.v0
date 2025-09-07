export interface CalendarEvent {
  id: string
  title: string
  date: string
  time: string
  category: "workout" | "nutrition" | "session" | "supplement" | "other"
  location?: string
  description?: string
  capacity?: {
    current: number
    max: number
  }
}

export const mockEvents: CalendarEvent[] = [
  {
    id: "1",
    title: "Upper Body Workout",
    date: "2024-03-15",
    time: "09:00",
    category: "workout",
    location: "Gym Floor 2",
    description: "Focus on chest, shoulders, and triceps. Bring water bottle and towel.",
  },
  {
    id: "2",
    title: "Protein Shake",
    date: "2024-03-15",
    time: "11:00",
    category: "supplement",
    description: "Post-workout protein shake with banana and berries.",
  },
  {
    id: "3",
    title: "Lunch - Chicken & Rice",
    date: "2024-03-15",
    time: "13:00",
    category: "nutrition",
    description: "Grilled chicken breast with brown rice and vegetables.",
  },
  {
    id: "4",
    title: "1-on-1 Coaching Session",
    date: "2024-03-15",
    time: "15:00",
    category: "session",
    location: "Virtual Meeting",
    description: "Weekly check-in with Coach Sarah to review progress and adjust plan.",
    capacity: {
      current: 1,
      max: 1,
    },
  },
  {
    id: "5",
    title: "Evening Supplements",
    date: "2024-03-15",
    time: "20:00",
    category: "supplement",
    description: "Magnesium and Vitamin D before bed.",
  },
  {
    id: "6",
    title: "Lower Body Workout",
    date: "2024-03-16",
    time: "09:00",
    category: "workout",
    location: "Gym Floor 1",
    description: "Squats, deadlifts, and leg accessories.",
  },
  {
    id: "7",
    title: "Group Fitness Class",
    date: "2024-03-17",
    time: "10:00",
    category: "workout",
    location: "Studio A",
    description: "High-intensity interval training class.",
    capacity: {
      current: 12,
      max: 20,
    },
  },
  {
    id: "8",
    title: "Meal Prep Session",
    date: "2024-03-17",
    time: "14:00",
    category: "nutrition",
    location: "Kitchen",
    description: "Prepare meals for the upcoming week.",
  },
]
