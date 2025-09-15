import { redirect } from 'next/navigation';

export default function AlyticsPage() {
  // Redirect to homepage since Alytics content is now the main homepage
  redirect('/');
}