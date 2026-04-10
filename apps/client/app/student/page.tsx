import type { Metadata } from "next";
import StudentLoginView from "@/components/student/login/StudentLoginView";

export const metadata: Metadata = {
  title: "Student Login",
  description:
    "Enter your 4-digit student PIN to access your Reading Magic dashboard.",
  keywords: [
    "student login",
    "secure access",
    "learning portal",
    "reading dashboard",
  ],
};

export default function StudentPage() {
  return <StudentLoginView />;
}
