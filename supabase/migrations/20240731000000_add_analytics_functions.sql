
CREATE OR REPLACE FUNCTION get_overall_stats()
RETURNS TABLE(status text, count bigint)
SECURITY DEFINER
AS $$
BEGIN
  -- Ensure only admins can run this
  IF NOT (SELECT get_my_claim('user_role') ->> 0 = '"admin"') THEN
    RAISE EXCEPTION 'User is not authorized to perform this action';
  END IF;

  RETURN QUERY
    SELECT a.status, COUNT(a.id)
    FROM public.achievements AS a
    GROUP BY a.status;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get_achievement_distribution()
RETURNS TABLE(category text, count bigint)
SECURITY DEFINER
AS $$
BEGIN
  IF NOT (SELECT get_my_claim('user_role') ->> 0 = '"admin"') THEN
    RAISE EXCEPTION 'User is not authorized to perform this action';
  END IF;

  RETURN QUERY
    SELECT a.category, COUNT(a.id)
    FROM public.achievements AS a
    GROUP BY a.category;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get_student_participation_over_time()
RETURNS TABLE(month text, student_count bigint)
SECURITY DEFINER
AS $$
BEGIN
  IF NOT (SELECT get_my_claim('user_role') ->> 0 = '"admin"') THEN
    RAISE EXCEPTION 'User is not authorized to perform this action';
  END IF;

  RETURN QUERY
    SELECT TO_CHAR(created_at, 'YYYY-MM') as month, COUNT(DISTINCT user_id)
    FROM public.achievements
    GROUP BY month
    ORDER BY month;
END;
$$ LANGUAGE plpgsql;
