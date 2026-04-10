import StudentHomeView from "@/components/student/home/StudentHomeView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Student Home",
  description:
    "Welcome back to your reading journey! Check your daily goals and start your next practice session.",
  keywords: [
    "student dashboard",
    "reading practice",
    "literacy goals",
    "learning journey",
  ],
};

export default function StudentHome() {
  return <StudentHomeView />;
}
