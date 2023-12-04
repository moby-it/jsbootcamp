ALTER TABLE pokemon_trade
DROP CONSTRAINT fk_initiator_user_pokemon_id;

ALTER TABLE pokemon_trade
DROP CONSTRAINT fk_responder_user_pokemon_id;

ALTER TABLE pokemon_trade ADD CONSTRAINT fk_initiator_user_pokemon_id FOREIGN KEY (initiator_user_pokemon_id) REFERENCES "user_pokemon" (id) ON DELETE CASCADE;
ALTER TABLE pokemon_trade ADD CONSTRAINT fk_responder_user_pokemon_id FOREIGN KEY (responder_user_pokemon_id) REFERENCES "user_pokemon" (id) ON DELETE CASCADE;
