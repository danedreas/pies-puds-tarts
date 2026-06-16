import { redirect } from "next/navigation";

/** FAQ lives on the about page */
export default function FaqPage() {
  redirect("/about#faq");
}
