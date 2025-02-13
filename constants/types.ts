import { Timestamp } from "firebase/firestore";

export interface Diet {
  id?: string;
  calories: string;
  description: string;
  date: Timestamp;
}

export enum ActivityType {
  Walking = "Walking",
  Running = "Running",
  Swimming = "Swimming",
  Weights = "Weights",
  Yoga = "Yoga",
  Cycling = "Cycling",
  Hiking = "Hiking",
}

export interface Activity {
  id?: string;
  duration: number;
  activity: ActivityType;
  date: Timestamp;
  important: boolean;
}

