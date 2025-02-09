import { Timestamp } from "firebase/firestore";

export enum ActivityType {
    Walking = "Walking",
    Running = "Running",
    Swimming = "Swimming",
    Weights = "Weights",
    Yoga = "Yoga",
    Cycling = "Cycling",
    Hiking = "Hiking",
  }

export interface BasicItem{
    id?: string;
    date: Timestamp;
    important: boolean;
}

export interface Activity extends BasicItem{
    activity: ActivityType;
    duration: number;
}

export interface Diet extends BasicItem{
    description: string;
    calories: number;
}

export type Item = Activity | Diet;