import { Banner } from "./Banner.js";
import { CardContainer } from "./CardContainer.js";
import { HorizontalLine } from "./HorizontalLine.js";
import { Footer } from "./Footer.js";
import { PokemonContext } from "./PokemonContextProvider.js";

export function Game() {

    return (
        <>
            <div>
                <Banner />
                <PokemonContext>
                    <CardContainer />
                </PokemonContext>
                <HorizontalLine />
                <PokemonContext>
                <Footer />
                </PokemonContext>
            </div>
        </>
    )
}
