
CREATE TABLE IF NOT EXISTS public.claim_status_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  claim_id uuid NOT NULL,
  from_status text,
  to_status text NOT NULL,
  notes text,
  changed_by uuid,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.claim_status_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own claim history"
  ON public.claim_status_history FOR SELECT
  USING (EXISTS (SELECT 1 FROM public.claims c WHERE c.id = claim_status_history.claim_id AND c.user_id = auth.uid()));

CREATE POLICY "Admins manage claim history"
  ON public.claim_status_history FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Agents view assigned claim history"
  ON public.claim_status_history FOR SELECT
  USING (EXISTS (SELECT 1 FROM public.claims c WHERE c.id = claim_status_history.claim_id AND c.assigned_agent = auth.uid()));

CREATE INDEX IF NOT EXISTS idx_claim_history_claim ON public.claim_status_history(claim_id, created_at DESC);

CREATE OR REPLACE FUNCTION public.log_claim_status_change()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF (TG_OP = 'INSERT') THEN
    INSERT INTO public.claim_status_history (claim_id, from_status, to_status, notes, changed_by)
    VALUES (NEW.id, NULL, NEW.status::text, 'Claim submitted', NEW.user_id);
  ELSIF (NEW.status IS DISTINCT FROM OLD.status) THEN
    INSERT INTO public.claim_status_history (claim_id, from_status, to_status, notes, changed_by)
    VALUES (NEW.id, OLD.status::text, NEW.status::text, NEW.resolution_notes, auth.uid());
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_claim_status_history ON public.claims;
CREATE TRIGGER trg_claim_status_history
  AFTER INSERT OR UPDATE OF status ON public.claims
  FOR EACH ROW EXECUTE FUNCTION public.log_claim_status_change();

ALTER TABLE public.claims REPLICA IDENTITY FULL;
ALTER TABLE public.claim_status_history REPLICA IDENTITY FULL;

DO $$ BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE public.claims;
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE public.claim_status_history;
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
