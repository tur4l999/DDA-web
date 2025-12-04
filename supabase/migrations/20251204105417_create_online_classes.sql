/*
  # Canlı dərslər cədvəli

  1. Yeni Cədvəl
    - `online_classes`
      - `id` (uuid, birincil açar)
      - `title` (mətn)
      - `instructor` (mətn)
      - `date` (timestamp)
      - `duration_minutes` (tam ədəd)
      - `status` (mətn - waiting, started, completed, cancelled)
      - `classroom` (uuid, məktəb ref)
      - `created_at` (timestamp)
  
  2. Təhlükəsizlik
    - RLS cədvəldə aktivdir
    - Hamı üçün oxu icazəsi (public dərslərdən)
*/

CREATE TABLE IF NOT EXISTS online_classes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  instructor text NOT NULL,
  date timestamptz NOT NULL,
  duration_minutes integer NOT NULL DEFAULT 60,
  status text NOT NULL DEFAULT 'waiting',
  subject text NOT NULL,
  description text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE online_classes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Hər kəs canlı dərsləri görə bilər"
  ON online_classes
  FOR SELECT
  USING (true);

INSERT INTO online_classes (title, instructor, date, duration_minutes, status, subject, description) VALUES
  ('Mənzil 3.1. Yol nişanları', 'Ə.Talibov', now() + interval '7 days' + interval '16 hours 50 minutes', 60, 'waiting', 'Yol nişanları', 'Yol nişanlarının təsnifi və mənası'),
  ('Sual-Cavab Sessiyası', 'Moderator', now() + interval '3 days' + interval '19 hours 50 minutes', 45, 'started', 'Ümumi', 'Sürücülük qanunları haqqında sual-cavab');
