import { redirect } from 'next/navigation';

export default function Home() {
  // Redirect to dashboard/automation by default
  redirect('/dashboard');
}
