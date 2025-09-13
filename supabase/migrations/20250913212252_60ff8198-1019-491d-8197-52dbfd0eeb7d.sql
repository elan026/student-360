-- Create enums for achievement status and review decisions
CREATE TYPE public.achievement_status AS ENUM ('pending', 'approved', 'rejected');
CREATE TYPE public.review_decision AS ENUM ('approved', 'rejected');

-- Create achievements table
CREATE TABLE public.achievements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  category TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  status public.achievement_status NOT NULL DEFAULT 'pending',
  file_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create faculty_reviews table
CREATE TABLE public.faculty_reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  achievement_id UUID NOT NULL REFERENCES public.achievements(id) ON DELETE CASCADE,
  faculty_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  feedback TEXT NOT NULL,
  decision public.review_decision NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faculty_reviews ENABLE ROW LEVEL SECURITY;

-- RLS Policies for achievements table

-- Students can view and manage their own achievements
CREATE POLICY "Students can view their own achievements" 
ON public.achievements 
FOR SELECT 
USING (student_id = auth.uid());

CREATE POLICY "Students can insert their own achievements" 
ON public.achievements 
FOR INSERT 
WITH CHECK (student_id = auth.uid());

CREATE POLICY "Students can update their own achievements" 
ON public.achievements 
FOR UPDATE 
USING (student_id = auth.uid());

-- Faculty and Admin can view all achievements
CREATE POLICY "Faculty and Admin can view all achievements" 
ON public.achievements 
FOR SELECT 
USING (public.get_current_user_role() IN ('faculty', 'admin'));

-- Faculty and Admin can update achievement status
CREATE POLICY "Faculty and Admin can update achievement status" 
ON public.achievements 
FOR UPDATE 
USING (public.get_current_user_role() IN ('faculty', 'admin'));

-- RLS Policies for faculty_reviews table

-- Students can view reviews for their achievements
CREATE POLICY "Students can view reviews for their achievements" 
ON public.faculty_reviews 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.achievements 
    WHERE achievements.id = faculty_reviews.achievement_id 
    AND achievements.student_id = auth.uid()
  )
);

-- Faculty and Admin can view all reviews
CREATE POLICY "Faculty and Admin can view all reviews" 
ON public.faculty_reviews 
FOR SELECT 
USING (public.get_current_user_role() IN ('faculty', 'admin'));

-- Only Faculty and Admin can create reviews
CREATE POLICY "Faculty and Admin can create reviews" 
ON public.faculty_reviews 
FOR INSERT 
WITH CHECK (
  public.get_current_user_role() IN ('faculty', 'admin') 
  AND faculty_id = auth.uid()
);

-- Faculty and Admin can update their own reviews
CREATE POLICY "Faculty and Admin can update their own reviews" 
ON public.faculty_reviews 
FOR UPDATE 
USING (
  faculty_id = auth.uid() 
  AND public.get_current_user_role() IN ('faculty', 'admin')
);

-- Create indexes for better performance
CREATE INDEX idx_achievements_student_id ON public.achievements(student_id);
CREATE INDEX idx_achievements_status ON public.achievements(status);
CREATE INDEX idx_achievements_created_at ON public.achievements(created_at DESC);
CREATE INDEX idx_faculty_reviews_achievement_id ON public.faculty_reviews(achievement_id);
CREATE INDEX idx_faculty_reviews_faculty_id ON public.faculty_reviews(faculty_id);

-- Add updated_at triggers
CREATE TRIGGER update_achievements_updated_at
  BEFORE UPDATE ON public.achievements
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_faculty_reviews_updated_at
  BEFORE UPDATE ON public.faculty_reviews
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Function to automatically update achievement status when reviewed
CREATE OR REPLACE FUNCTION public.update_achievement_status_on_review()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.achievements 
  SET status = NEW.decision::text::public.achievement_status
  WHERE id = NEW.achievement_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Trigger to auto-update achievement status when review is created
CREATE TRIGGER on_faculty_review_created
  AFTER INSERT ON public.faculty_reviews
  FOR EACH ROW 
  EXECUTE FUNCTION public.update_achievement_status_on_review();