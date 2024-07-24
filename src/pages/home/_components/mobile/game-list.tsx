import NavBarMobile from "@/components/nav-bar-mobile";
import Banner from "../banner";
import SportGame from "./_components/sport-game";
import { useQuery } from "@tanstack/react-query";
import { gameApi } from "@/apis/game.api";
import { useParams } from "react-router-dom";
import CasinoGame from "./_components/casino-game";
import SlotGame from "./_components/slot-game";
import GameFeature from "./_components/game-feature";

const GameList = () => {
  const { type } = useParams();
  const { data } = useQuery({
    queryKey: ["games"],
    queryFn: () => gameApi.getListGame(),
  });
  const games = data?.data.data.data;
  const getGamesByType = (type: string) => {
    if (games && games.length > 0) {
      return games.filter((game) => {
        if (type === "DM" && game.type === "OT" && game.providercode === "DM") {
          return game;
        }
        if (game.type === "OT" && game.providercode === "DM") {
          return null;
        }
        if (game.type === type) {
          return game;
        }
      });
    }
    return [];
  };
  if (!type) return null;
  return (
    <>
      <NavBarMobile />
      <Banner />
      {type === "SB" && <SportGame games={getGamesByType(type)} />}
      {type === "LK" && <GameFeature />}
      {type === "LC" && <CasinoGame games={getGamesByType(type)} />}
      {type === "SL" && <SlotGame games={getGamesByType(type)} />}
      {type === "OT" && <SportGame games={getGamesByType(type).concat(getGamesByType("ES")).concat(getGamesByType("LK"))} />}
      {type === "KY" && <SportGame games={getGamesByType(type)} />}
      {type === "FH" && <SportGame games={getGamesByType(type)} />}
      {type === "DM" && <SportGame games={getGamesByType(type)} />}
      {type === "CB" && <SportGame games={getGamesByType("CB").concat(getGamesByType("PK"))} />}
    </>
  );
};

export default GameList;
