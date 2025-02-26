-- Create enum for trainer type
CREATE TYPE trainer_type AS ENUM ('language', 'flag');

-- Create table for user scores
CREATE TABLE user_scores (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    trainer_type trainer_type NOT NULL,
    score INTEGER NOT NULL DEFAULT 0,
    best_streak INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    UNIQUE(user_id, trainer_type)
);

-- Create table for learning progress
CREATE TABLE learning_progress (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    trainer_type trainer_type NOT NULL,
    item_id TEXT NOT NULL, -- language code or country code
    correct_attempts INTEGER NOT NULL DEFAULT 0,
    wrong_attempts INTEGER NOT NULL DEFAULT 0,
    last_attempt_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    UNIQUE(user_id, trainer_type, item_id)
);

-- Create table for practice history
CREATE TABLE practice_sessions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    trainer_type trainer_type NOT NULL,
    items_attempted INTEGER NOT NULL DEFAULT 0,
    items_correct INTEGER NOT NULL DEFAULT 0,
    session_duration_seconds INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create detailed tracking table for flag attempts
CREATE TABLE flag_attempts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    flag_code VARCHAR(10) NOT NULL,
    is_correct BOOLEAN NOT NULL,
    attempt_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    correct_answer VARCHAR(100) NOT NULL,
    user_answer VARCHAR(100) NOT NULL
);

-- Create view for flag statistics
CREATE VIEW flag_statistics AS
SELECT 
    user_id,
    flag_code,
    COUNT(*) as total_attempts,
    COUNT(*) FILTER (WHERE is_correct) as correct_attempts,
    COUNT(*) FILTER (WHERE NOT is_correct) as incorrect_attempts,
    MAX(attempt_date) as last_attempt_date,
    (COUNT(*) FILTER (WHERE is_correct)::FLOAT / COUNT(*)::FLOAT * 100) as success_rate
FROM flag_attempts
GROUP BY user_id, flag_code;

-- Create RLS policies
ALTER TABLE user_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE practice_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE flag_attempts ENABLE ROW LEVEL SECURITY;

-- Policy for user_scores
CREATE POLICY "Users can view own scores"
    ON user_scores FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can update own scores"
    ON user_scores FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own scores"
    ON user_scores FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Policy for learning_progress
CREATE POLICY "Users can view own progress"
    ON learning_progress FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can update own progress"
    ON learning_progress FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress"
    ON learning_progress FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Policy for practice_sessions
CREATE POLICY "Users can view own sessions"
    ON practice_sessions FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own sessions"
    ON practice_sessions FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Policy for flag_attempts
CREATE POLICY "Users can view their own flag attempts"
    ON flag_attempts
    FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own flag attempts"
    ON flag_attempts
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX idx_user_scores_user_id ON user_scores(user_id);
CREATE INDEX idx_learning_progress_user_id ON learning_progress(user_id);
CREATE INDEX idx_practice_sessions_user_id ON practice_sessions(user_id);
CREATE INDEX idx_learning_progress_item ON learning_progress(user_id, trainer_type, item_id);
CREATE INDEX idx_flag_attempts_user_id ON flag_attempts(user_id);
