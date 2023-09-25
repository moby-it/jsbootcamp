begin;

alter table "user" add column if not exists created_at timestamp default current_timestamp;
alter table "pokemon" add column if not exists created_at timestamp default current_timestamp;
alter table "daily_pokemon" add column if not exists created_at timestamp default current_timestamp;
alter table "daily_pokemon" add column if not exists caught BOOLEAN;
alter table "user_pokemon" add column if not exists created_at timestamp default current_timestamp;

commit;