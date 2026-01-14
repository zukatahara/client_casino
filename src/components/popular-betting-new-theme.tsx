import { useTranslation } from "react-i18next";
import { NS } from "@/constants/ns";
import useWebSocket from "react-use-websocket";
import { URL } from "@/constants/url";
import { useEffect, useState } from "react";
import { formatSeconds2 } from "@/utils/utils";
import { mockLatestLottery, type MockLotteryItem } from "@/data/mock-home-data";
import { useNavigate } from "react-router-dom";

type LotteryItem = MockLotteryItem;

const PopularBettingNewTheme = () => {
  const { t } = useTranslation([NS["HOME"]]);
  const navigate = useNavigate();
  const { lastMessage } = useWebSocket(URL.webSocketUrl);
  // Use mock data by default - will be replaced by websocket data when available
  const [latestLottery, setLatestLottery] = useState<LotteryItem[]>(mockLatestLottery);

  useEffect(() => {
    // Listen to websocket for real-time updates, but keep mock data as fallback
    if (!lastMessage) return;
    try {
      const data = JSON.parse(lastMessage.data);
      if (data.lottery && data.lottery.latestLottery && Array.isArray(data.lottery.latestLottery) && data.lottery.latestLottery.length > 0) {
        setLatestLottery(data.lottery.latestLottery);
      }
    } catch (e) {
      console.error("Error parsing websocket message", e);
    }
  }, [lastMessage]);

  const intercept = (text: string) => {
    return text && text.length > 14 ? text.substring(0, 14) : text;
  };

  const enterTheGameToPlay = (lottery: LotteryItem, playPageId?: number) => {
    if (lottery.id) {
      navigate(`/lottery?tabName=Lottery&id=${lottery.id}${playPageId ? `&playId=${playPageId}` : ''}`);
    }
  };

  const enterTheGame = (lottery: LotteryItem) => {
    if (lottery.id) {
      navigate(`/lottery?tabName=Lottery&id=${lottery.id}`);
    }
  };

  // Show placeholder or empty state if no data
  if (!latestLottery || latestLottery.length === 0) {
    return (
      <div className="popularBettingNewTheme" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', margin: 'auto', width: '100%', maxWidth: '1400px', padding: '20px' }}>
        <div style={{ color: '#fff', textAlign: 'center' }}>{t("categories.dang_tai_du_lieu", { ns: "home", defaultValue: "Đang tải dữ liệu..." })}</div>
      </div>
    );
  }

  return (
    <div className="popularBettingNewTheme" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', margin: 'auto', width: '1400px', maxWidth: '100%' }}>
      {latestLottery.map((lottery, idx) => (
        <div
          key={idx}
          className="popularBetting"
          style={{
            borderRadius: '16px',
            flex: '0 32%',
            margin: '10px 0 0',
            padding: '20px 0 20px 30px',
            position: 'relative',
            height: '179px',
            overflow: 'hidden',
            minWidth: '300px'
          }}
        >
          <div className="countdown-wp" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <span className="iconfont icon-icon_clock"></span>
            <div className="countdown">
              {lottery.time ? formatSeconds2(lottery.time) : '00:00'}
            </div>
          </div>
          <div className="popularBetting-inner" style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            <div className="image-wrapper" style={{ width: '80px', height: '80px', flexShrink: 0 }}>
              <img 
                src={lottery.icon || "/assets/images/img_bg.46e55575.png"} 
                alt={lottery.name} 
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/assets/images/img_bg.46e55575.png";
                }}
              />
            </div>
            <div className="lottery-info-wp" style={{ flex: 1 }}>
              <div className="lottery-name" style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff', marginBottom: '8px' }}>
                {lottery.name}
              </div>
              <div className="play-info-wp" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {lottery.extra?.playinfo?.map((play, playIdx) => (
                  <div
                    key={playIdx}
                    onClick={() => enterTheGameToPlay(lottery, play.play_page_id)}
                    style={{
                      padding: '4px 12px',
                      background: 'rgba(255,255,255,0.1)',
                      borderRadius: '4px',
                      color: '#fff',
                      fontSize: '12px',
                      cursor: 'pointer'
                    }}
                  >
                    {intercept(play.name)}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="popularBetting-inner" style={{ marginTop: '10px' }}>
            {lottery.series_id === 7 ? (
              // Sicbo games - show dice and sum results
              <div className="open-numbers" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                {lottery.open_result?.sumTotal !== undefined && (
                  <div className="open_results" style={{ background: '#4A90E2', color: '#fff', padding: '4px 12px', borderRadius: '4px', fontWeight: 'bold', fontSize: '16px' }}>
                    {lottery.open_result.sumTotal}
                  </div>
                )}
                {lottery.open_result?.bigSmall && (
                  <div className={`open_results name ${lottery.open_result.bigSmall.result}`} style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', padding: '4px 12px', borderRadius: '4px', fontSize: '14px' }}>
                    {lottery.open_result.bigSmall.name}
                  </div>
                )}
                {lottery.open_result?.oddEven && (
                  <div className={`open_results name ${lottery.open_result.oddEven.result}`} style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', padding: '4px 12px', borderRadius: '4px', fontSize: '14px' }}>
                    {lottery.open_result.oddEven.name}
                  </div>
                )}
                {lottery.open_numbers_formatted?.map((num, numIdx) => (
                  <div key={numIdx} className={`dice dice-${num}`} style={{ width: '30px', height: '30px' }}></div>
                ))}
              </div>
            ) : (
              // Lottery games - show numbered balls
              <div className="open-numbers" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {lottery.open_numbers_formatted?.map((num, numIdx) => (
                  <div key={numIdx} className="ball" style={{ width: '30px', height: '30px', borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', fontWeight: 'bold', fontSize: '14px' }}>
                    {num}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div
            className="betting"
            onClick={() => enterTheGame(lottery)}
            style={{
              position: 'absolute',
              bottom: '10px',
              right: '10px',
              padding: '8px 16px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '8px',
              color: '#fff',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 'bold'
            }}
          >
            <span className="iconfont icon-icon_flash">{t("categories.dat_cuoc", { ns: "home" })}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PopularBettingNewTheme;
