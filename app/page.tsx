import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

export default async function Home() {
  // Remove any headers() calls that might be causing the error
  const session = await getServerSession();
  
  if (!session) {
    redirect("/login");
  } else {
    redirect("/dashboard");
  }
  
  return null;
}