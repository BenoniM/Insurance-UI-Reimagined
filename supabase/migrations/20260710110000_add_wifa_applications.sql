CREATE TYPE public.wifa_application_status AS ENUM ('submitted', 'under_review', 'approved', 'rejected');

CREATE TABLE public.wifa_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  city TEXT NOT NULL,
  region TEXT,
  business_name TEXT,
  experience_level TEXT NOT NULL,
  sales_channels TEXT[] NOT NULL DEFAULT '{}',
  motivation TEXT NOT NULL,
  status public.wifa_application_status NOT NULL DEFAULT 'submitted',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.wifa_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can create own WIFA applications"
  ON public.wifa_applications
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own WIFA applications"
  ON public.wifa_applications
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage WIFA applications"
  ON public.wifa_applications
  FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_wifa_applications_updated_at
  BEFORE UPDATE ON public.wifa_applications
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
