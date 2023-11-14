ALTER TABLE "user"
ADD column IF NOT EXISTS created_at TIMESTAMP DEFAULT current_timestamp;

ALTER TABLE "pokemon"
ADD column IF NOT EXISTS created_at TIMESTAMP DEFAULT current_timestamp;

ALTER TABLE "daily_pokemon"
ADD column IF NOT EXISTS created_at TIMESTAMP DEFAULT current_timestamp;

ALTER TABLE "daily_pokemon"
ADD column IF NOT EXISTS caught BOOLEAN;

ALTER TABLE "user_pokemon"
ADD column IF NOT EXISTS created_at TIMESTAMP DEFAULT current_timestamp;