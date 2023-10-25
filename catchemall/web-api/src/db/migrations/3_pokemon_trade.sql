BEGIN
CREATE OR REPLACE FUNCTION swap_pokemon() RETURNS trigger
    LAGNAUGE plpgsql
AS
$$
    DECLARE
        tempID int;
BEGIN
    IF NEW.accepted = TRUE THEN

        tempID = (SELECT pokedex_id FROM user_pokemon WHERE id = NEW.initiator_user_pokemon_id);
        UPDATE user_pokemon SET pokedex_id = (
            SELECT pokedex_id FROM user_pokemon WHERE id = NEW.responder_user_pokemon_id)
                            WHERE id = NEW.initiator_user_pokemon_id;
        UPDATE user_pokemon
        SET pokedex_id = tempID
        WHERE id = NEW.responder_user_pokemon_id;
        UPDATE pokemon_trade
        SET accepted = false
        WHERE initiator_user_pokemon_id = NEW.initiator_user_pokemon_id
            AND pokemon_trade.id != NEW.id;

        UPDATE pokemon_trade
        SET accepted = false
        WHERE responder_user_pokemon_id = NEW.responder_user_pokemon_id
          AND pokemon_trade.id != NEW.id;
        END IF;
    RETURN NEW;
END;
$$;

CREATE OR REPLACE TRIGGER swap_pokemon
AFTER UPDATE
ON pokemon_trade
FOR EACH ROW
EXECUTE PROCEDURE swap_pokemon()