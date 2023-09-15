alter table daily_pokemon alter caught drop default;
UPDATE daily_pokemon SET caught = NULL;