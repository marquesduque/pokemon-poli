import { createHashRouter } from "react-router-dom";

import { Applayout } from "./components/layouts/AppLayout";

import NoMatch from "./pages/NoMatch";
import PokemonList from "./pages/PokemonList";
import Curriculo from "./pages/Curriculo";


export const router = createHashRouter([
    {
        path: "/",
        element: <Applayout />,
        children: [
            {
                path: "",
                element: <PokemonList />,
            }
        ],
    },
    {
        path: "/curriculo",
        element: <Applayout />,
        children: [
            {
                path: "",
                element: <Curriculo />,
            },
        ],
    },
    {
        path: "*",
        element: <NoMatch />,
    },
])
