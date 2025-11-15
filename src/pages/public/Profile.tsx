
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getPublicProfile } from '@/integrations/supabase/portfolio';

export default function PublicProfile() {
  const { userId } = useParams<{ userId: string }>();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!userId) return;
      try {
        setLoading(true);
        const profileData = await getPublicProfile(userId);
        setProfile(profileData);
        setError(null);
      } catch (err) {
        setError('Failed to fetch public profile. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  if (loading) {
    return <div>Loading public profile...</div>;
  }

  if (error || !profile) {
    return <div className="text-red-500 p-4">{error || 'Profile not found.'}</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <header className="text-center my-8">
        <Avatar className="w-32 h-32 mx-auto mb-4">
          <AvatarImage src={profile.avatarUrl} alt={profile.name} />
          <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <h1 className="text-4xl font-bold">{profile.name}</h1>
        <p className="text-xl text-muted-foreground mt-2">{profile.bio}</p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Verified Achievements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {profile.achievements.map((achievement: any) => (
              <div key={achievement.id} className="p-3 bg-muted/50 rounded-lg">
                <p className="font-semibold">{achievement.title}</p>
                <p className="text-sm text-muted-foreground">{achievement.category} - {achievement.date}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
