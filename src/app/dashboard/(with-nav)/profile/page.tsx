import ProfileClientPage from './profile-client-page';
import { getProfile, getProfileStats } from '@/actions/profile';
import { redirect } from 'next/navigation';

export default async function ProfilePage() {
  try {
    const [profile, stats] = await Promise.all([getProfile(), getProfileStats()]);

    // Serialize Date objects to strings to avoid "Date objects are not supported" warning
    const serializedProfile = {
      ...profile,
      birthDate: profile.birthDate ? profile.birthDate.toISOString() : null,
    };

    return <ProfileClientPage initialProfile={serializedProfile} initialStats={stats} />;
  } catch (error) {
    // If authentication fails or other errors occur, redirect to login
    // In a real app, you might want to check the error type
    redirect('/');
  }
}
