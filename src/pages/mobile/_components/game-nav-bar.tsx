import BackButton from "@/components/back-button";
import "./style.css";
import { Link } from "react-router-dom";
import SideNavGame from "@/components/side-nav-game";
const GameNavBar = ({ title }: { title: string }) => {
  return (
    <div className="van-nav-bar van-nav-bar--fixed" id="lottery_nav">
      <div className="van-nav-bar__content">
        <div className="van-nav-bar__left">
          <BackButton back="/" />
        </div>
        <Link
          to={`/mobile/all-game?q=${title}`}
          className="van-nav-bar__title van-ellipsis"
        >
          <div className="selectAllLottery">
            <span className="allGameSelect">{title}</span>
            <span className="iconfont icon-icon_drop_down_solid" />
          </div>
        </Link>
        <div className="van-nav-bar__right">
          <SideNavGame />
        </div>
      </div>
    </div>
  );
};

export default GameNavBar;
