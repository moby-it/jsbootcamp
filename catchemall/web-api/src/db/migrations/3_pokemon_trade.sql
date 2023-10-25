BEGIN;
CREATE TABLE IF NOT EXISTS pokemon_trade (
    id SERIAL PRIMARY KEY,
    initiator_user_pokemon_id INT NOT NULL,
    responder_user_pokemon_id INT NOT NULL,
    accepted bool,
    created_at TIMESTAMP DEFAULT current_timestamp,
    CONSTRAINT fk_initiator_user_pokemon_id FOREIGN KEY(initiator_user_pokemon_id) REFERENCES user_pokemon(id),
    CONSTRAINT fk_responder_user_pokemon_id FOREIGN KEY(responder_user_pokemon_id) REFERENCES user_pokemon(id)
);

CREATE OR REPLACE FUNCTION swap_pokemon()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.accepted = TRUE THEN
        UPDATE user_pokemon SET pokedex_id = (
            SELECT pokedex_id FROM user_pokemon WHERE id = NEW.responder_user_pokemon_id)
                            WHERE id = NEW.initiator_user_pokemon_id;

        UPDATE user_pokemon
        SET pokedex_id = (SELECT pokedex_id FROM user_pokemon WHERE id = NEW.initiator_user_pokemon_id)
        WHERE id = NEW.responder_user_pokemon_id;
        END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER swap_pokemon
AFTER UPDATE
ON pokemon_trade
FOR EACH ROW
EXECUTE PROCEDURE swap_pokemon();

COMMIT;
