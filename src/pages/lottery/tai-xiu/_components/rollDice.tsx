//@ts-nocheck
import { useEffect, useState } from "react";
import * as PIXI from "pixi.js";
import { Spine } from "pixi-spine";
import "../../../../rollDice.css";
import ReactHowler from "react-howler";
// PIXI.settings.SORTABLE_CHILDREN = true;
const app = new PIXI.Application({
  width: 280,
  height: 400,
  backgroundAlpha: 0,
});
const container = new PIXI.Container();

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
const SpineAnimation = ({
  result,
  time,
  maxTime = 60,
  setIsLoading,
  id,
  muted,
}) => {
  const [value, setValue] = useState(result);
  const [roll, setRoll] = useState(false);
  const [play, setPlay] = useState(false);
  const [source, setSource] = useState();
  const [lastOpen, setLastOpen] = useState(result);
  const [spineData, setSpineData] = useState();
  function generateAnimationNames(name, value) {
    let [n, i, r] = name === "begin" ? lastOpen.split(",") : value.split(",");

    return (
      (n = n?.padStart(2, "0")),
      (i = i?.padStart(2, "0")),
      (r = r?.padStart(2, "0")),
      [
        name + "_shaizhong_di",
        "shaizhong_top",
        name + "_a_" + n,
        name + "_b_" + i,
        name + "_c_" + r,
      ]
    );
  }
  const initAnimation = async () => {
    container.position.set(0, 0);
    app.stage.addChild(container);
    document.getElementById("rollContainer").appendChild(app.view);
    const data = await PIXI.Assets.load("/sicbo/dice/bingo_kj.json");
    window.spineData = data;
    setSource(data);
    setSpineData(data?.spineData);
    startAnimation(data, "ending", false);
    setRoll(true);
  };
  const startAnimation = (data, action = "begin", time = false) => {
    if (data?.spineData || source || window?.spineData) {
      const dataAni = generateAnimationNames(action, result);

      container.children = [];

      for (let t = 0; t < dataAni.length; t++) {
        const i = new Spine(
          data?.spineData || source?.spineData || window?.spineData?.spineData
        );

        i.scale.set(0.5);
        i.x = 280 / 2;
        i.y = 400 / 2;

        container.addChild(i);

        handleCompleted(i);

        if (i.state.hasAnimation(dataAni[t])) {
          i.state.setAnimation(0, dataAni[t], false);
          i.state.timeScale = 0.7;
          i.autoUpdate = !0;
          if (time && i.state.tracks && i.state.tracks?.length > 0)
            i.state.tracks[0].trackTime = i.state.tracks[0]?.animationEnd;
        }
      }
    }
  };

  const handleCompleted = (t) => {
    t.state.addListener({
      complete: (t) => {
        const e = t?.animation?.name || "begin_c";
        if (e.indexOf("begin_c") === 0) {
          startAnimation(source, "rolling", false);
        } else if (e.indexOf("rolling_c") === 0) {
          startAnimation(source, "ending", false);
        } else if (0 === e.indexOf("ending_c")) {
          setLastOpen(result);
          setPlay(false);
        }
      },
      end: function () { },
      dispose: function () { },
      interrupted: function () { },
    });
  };

  useEffect(() => {
    if (time && maxTime && time === maxTime) {
      setPlay(true);
      startAnimation(null, "ending");
    }
  }, [time, result]);
  useEffect(() => {
    initAnimation();
  }, [result, id]);
  return (
    <div id="rollContainer" className="absolute top-14 border-0">
      <ReactHowler src="/sicbo/dice/dice.mp3" playing={play} mute={muted} />
    </div>
  );
};

export default SpineAnimation;
