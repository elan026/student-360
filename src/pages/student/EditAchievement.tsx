
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { getAchievements, updateAchievementDetails, Achievement } from '@/integrations/supabase/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';

const achievementSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  category: z.string().min(1, 'Category is required'),
  file_url: z.string().optional(),
});

export default function EditAchievement() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [achievement, setAchievement] = useState<Achievement | null>(null);

  const form = useForm<z.infer<typeof achievementSchema>>({
    resolver: zodResolver(achievementSchema),
    defaultValues: {
      title: '',
      description: '',
      category: '',
      file_url: '',
    },
  });

  useEffect(() => {
    const fetchAchievement = async () => {
      if (!id) return;
      const achievements = await getAchievements(); // This is not ideal, should be a getById
      const currentAchievement = achievements.find(a => a.id === id);
      if (currentAchievement) {
        if (currentAchievement.status !== 'pending' && currentAchievement.status !== 'rejected') {
          toast({ title: 'Cannot Edit', description: 'This achievement is locked and cannot be edited.', variant: 'destructive' });
          navigate('/student/achievements');
        }
        setAchievement(currentAchievement);
        form.reset(currentAchievement);
      } else {
        toast({ title: 'Error', description: 'Achievement not found.', variant: 'destructive' });
        navigate('/student/achievements');
      }
    };
    fetchAchievement();
  }, [id, navigate, toast, form]);

  const onSubmit = async (values: z.infer<typeof achievementSchema>) => {
    if (!id) return;
    try {
      await updateAchievementDetails(id, values);
      toast({ title: 'Success', description: 'Achievement updated successfully!' });
      navigate('/student/achievements');
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    }
  };

  if (!achievement) {
    return <div>Loading...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Achievement</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? 'Saving...' : 'Save Changes'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
