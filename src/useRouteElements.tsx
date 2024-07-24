import { lazy, Suspense, useContext } from "react";
import { Navigate, Outlet, useRoutes } from "react-router-dom";
import MainLayout from "./layouts/main-layout";
import { AppContext } from "./contexts/app.context";
import SettingsLayout from "./layouts/settings-layout";
import ChargePage from "./pages/settings/charge";
import DrawPage from "./pages/settings/draw";
import CapitalHistory from "./pages/settings/capital-history";
import BetRefundHistory from "./pages/settings/bet-refund-history";
import LotteryLayout from "./layouts/lottery-layout";
import TaiXiuPage from "./pages/lottery/tai-xiu";
import XosoPage from "./pages/lottery/xo-so";
import DiscountPage from "./pages/discount";
import AuthPage from "./pages/auth";
import TaiXiuMobile from "./pages/mobile/tai-xiu";
import MobileLayout from "./layouts/mobile-layout";
import XosoMobilePage from "./pages/mobile/xoso";
import ProfilePage from "./pages/mobile/profile";
import RechargeMobilePage from "./pages/mobile/recharge";
import WithdrawMobilePage from "./pages/mobile/withdraw";
import FundPageHome from "./pages/mobile/funds";
import PersonalPage from "./pages/mobile/personal";
import ChangePasswordMobilePage from "./pages/mobile/change-password";
import BettingRecord from "./pages/mobile/betting-record";
import TransactionPage from "./pages/mobile/transaction";
import WithdrawHistory from "./pages/mobile/with-draw-history";
import XoSoList from "./pages/home/_components/mobile/xo-so-list";
import GameList from "./pages/home/_components/mobile/game-list";
import LotteryResult from "./pages/settings/lottery-result";
import HelpPage from "./pages/help";
import ResultHistory from "./pages/mobile/results-history";
import Message from "./pages/message";
import MegaMobilePage from "./pages/mobile/mega";
import AgencyPage from "./pages/agency";
import AgencyMobilePage from "./pages/mobile/agency";
import KenoMobilePage from "./pages/mobile/keno";
import BankDetail from "./pages/mobile/bank-detail";
import WalletPage from "./pages/mobile/wallet";
import MessageMobile from "./pages/mobile/message";
import AllGame from "./pages/mobile/all_game";
import HelpMobilePage from "./pages/mobile/help";
import DiscountMobilePage from "./pages/mobile/discount";
import CasinoPage from "./pages/casino";
import FishPage from "./pages/fish";
import ChessPage from "./pages/chess";
import SlotPage from "./pages/slot";
import MyPursePage from "./pages/settings/my-purse";
import CockfightingPage from "./pages/cockfighting";
import SportPage from "./pages/sport";
import VipPage from "./pages/vip";
import RefundHistory from "./pages/mobile/refund-history";
import VipAwardHistory from "./pages/mobile/vip-award-history";
import VipPageMobile from "./pages/mobile/vip";
import MyVip from "./pages/settings/vip-history";
import VipHistory from "./pages/settings/vip-history/history";
import MyVipMobile from "./pages/mobile/my-vip";
import MyTransaction from "./pages/mobile/my_transaction";
import InstructionDownload from "./pages/downloadApp/instructionDownload";

const Home = lazy(() => import("./pages/home"));
const Settings = lazy(() => import("./pages/settings"));
const BetHistory = lazy(() => import("./pages/settings/bet-history"));
const KenoPage = lazy(() => import("./pages/lottery/keno"));
const MegaPage = lazy(() => import("./pages/lottery/mega"));

function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext);
  const isMobile = window.innerWidth <= 768;
  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to={isMobile ? "/auth" : "/"} />
  );
}

function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext);
  return !isAuthenticated ? <Outlet /> : <Navigate to="/" />;
}

export default function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: "",
      element: <ProtectedRoute />,
      children: [
        {
          path: "/settings",
          element: (
            <MainLayout>
              <SettingsLayout>
                <Suspense>
                  <Settings />
                </Suspense>
              </SettingsLayout>
            </MainLayout>
          ),
        },
        {
          path: "/settings/bet-history",
          element: (
            <MainLayout>
              <SettingsLayout>
                <Suspense>
                  <BetHistory />
                </Suspense>
              </SettingsLayout>
            </MainLayout>
          ),
        },
        {
          path: "/settings/lottery-result",
          element: (
            <MainLayout>
              <SettingsLayout>
                <Suspense>
                  <LotteryResult />
                </Suspense>
              </SettingsLayout>
            </MainLayout>
          ),
        },
        {
          path: "/settings/charge",
          element: (
            <MainLayout>
              <SettingsLayout>
                <Suspense>
                  <ChargePage />
                </Suspense>
              </SettingsLayout>
            </MainLayout>
          ),
        },
        {
          path: "/settings/draw",
          element: (
            <MainLayout>
              <SettingsLayout>
                <Suspense>
                  <DrawPage />
                </Suspense>
              </SettingsLayout>
            </MainLayout>
          ),
        },
        {
          path: "/settings/message",
          element: (
            <MainLayout>
              <SettingsLayout>
                <Suspense>
                  <Message />
                </Suspense>
              </SettingsLayout>
            </MainLayout>
          ),
        },
        {
          path: "/settings/capital-history",
          element: (
            <MainLayout>
              <SettingsLayout>
                <Suspense>
                  <CapitalHistory />
                </Suspense>
              </SettingsLayout>
            </MainLayout>
          ),
        },
        {
          path: "/settings/bet-refund-history",
          element: (
            <MainLayout>
              <SettingsLayout>
                <Suspense>
                  <BetRefundHistory />
                </Suspense>
              </SettingsLayout>
            </MainLayout>
          ),
        },
        {
          path: "/settings/vip-history",
          element: (
            <MainLayout>
              <SettingsLayout>
                <Suspense>
                  <MyVip />
                </Suspense>
              </SettingsLayout>
            </MainLayout>
          ),
        },
        {
          path: "/settings/vip-history/history",
          element: (
            <MainLayout>
              <SettingsLayout>
                <Suspense>
                  <VipHistory />
                </Suspense>
              </SettingsLayout>
            </MainLayout>
          ),
        },
        {
          path: "/settings/my-purse",
          element: (
            <MainLayout>
              <SettingsLayout>
                <Suspense>
                  <MyPursePage />
                </Suspense>
              </SettingsLayout>
            </MainLayout>
          ),
        },
        // mobile
        {
          path: "/mobile/profile",
          element: (
            <MainLayout>
              <Suspense>
                <ProfilePage />
              </Suspense>
            </MainLayout>
          ),
        },
        {
          path: "/mobile/recharge",
          element: (
            <MainLayout>
              <Suspense>
                <RechargeMobilePage />
              </Suspense>
            </MainLayout>
          ),
        },
        {
          path: "/mobile/withdraw",
          element: (
            <MainLayout>
              <Suspense>
                <WithdrawMobilePage />
              </Suspense>
            </MainLayout>
          ),
        },
        {
          path: "/mobile/vip",
          element: (
            <MobileLayout>
              <Suspense>
                <VipPageMobile />
              </Suspense>
            </MobileLayout>
          ),
        },
        {
          path: "/mobile/discount",
          element: (
            <MainLayout>
              <Suspense>
                <DiscountMobilePage />
              </Suspense>
            </MainLayout>
          ),
        },
        {
          path: "/mobile/fund",
          element: (
            <MainLayout>
              <Suspense>
                <FundPageHome />
              </Suspense>
            </MainLayout>
          ),
        },
        {
          path: "/mobile/wallet",
          element: (
            <MainLayout>
              <Suspense>
                <WalletPage />
              </Suspense>
            </MainLayout>
          ),
        },
        {
          path: "/mobile/personal",
          element: (
            <MainLayout>
              <Suspense>
                <PersonalPage />
              </Suspense>
            </MainLayout>
          ),
        },
        {
          path: "/mobile/change-password",
          element: (
            <MainLayout>
              <Suspense>
                <ChangePasswordMobilePage />
              </Suspense>
            </MainLayout>
          ),
        },
        {
          path: "/mobile/betting-record",
          element: (
            <MainLayout>
              <Suspense>
                <BettingRecord />
              </Suspense>
            </MainLayout>
          ),
        },
        {
          path: "/mobile/refund-history",
          element: (
            <MainLayout>
              <Suspense>
                <RefundHistory />
              </Suspense>
            </MainLayout>
          ),
        },
        {
          path: "/mobile/my-vip",
          element: (
            <MobileLayout>
              <Suspense>
                <MyVipMobile />
              </Suspense>
            </MobileLayout>
          ),
        },
        {
          path: "/mobile/vip-award",
          element: (
            <MainLayout>
              <Suspense>
                <VipAwardHistory />
              </Suspense>
            </MainLayout>
          ),
        },
        {
          path: "/mobile/transaction",
          element: (
            <MainLayout>
              <Suspense>
                <TransactionPage />
              </Suspense>
            </MainLayout>
          ),
        },
        {
          path: "/mobile/withdraw-history",
          element: (
            <MainLayout>
              <Suspense>
                <WithdrawHistory />
              </Suspense>
            </MainLayout>
          ),
        },
        {
          path: "/mobile/agency",
          element: (
            <MainLayout>
              <Suspense>
                <AgencyMobilePage />
              </Suspense>
            </MainLayout>
          ),
        },
      ],
    },
    {
      path: "",
      element: <RejectedRoute />,
      children: [
        {
          path: "/auth",
          element: (
            <Suspense>
              <MobileLayout>
                <AuthPage />
              </MobileLayout>
            </Suspense>
          ),
        },
      ],
    },
    {
      path: "",
      index: true,
      element: (
        <MainLayout>
          <Suspense>
            <Home />
          </Suspense>
        </MainLayout>
      ),
    },
    {
      path: "/instruction-download",
      index: true,
      element: (
        <Suspense>
          <InstructionDownload />
        </Suspense>
      ),
    },
    {
      path: "/register",
      index: true,
      element: (
        <MainLayout>
          <Suspense>
            <Home />
          </Suspense>
        </MainLayout>
      ),
    },
    {
      path: "/discount",
      element: (
        <MainLayout>
          <Suspense>
            <DiscountPage />
          </Suspense>
        </MainLayout>
      ),
    },
    {
      path: "/vip",
      element: (
        <MainLayout>
          <Suspense>
            <VipPage />
          </Suspense>
        </MainLayout>
      ),
    },
    {
      path: "/help",
      element: (
        <MainLayout>
          <Suspense>
            <HelpPage />
          </Suspense>
        </MainLayout>
      ),
    },
    {
      path: "/agency",
      element: (
        <MainLayout>
          <Suspense>
            <AgencyPage />
          </Suspense>
        </MainLayout>
      ),
    },
    {
      path: "/lottery/tai-xiu/:id",
      element: (
        <MainLayout>
          <LotteryLayout>
            <Suspense>
              <TaiXiuPage />
            </Suspense>
          </LotteryLayout>
        </MainLayout>
      ),
    },
    {
      path: "/lottery/mega/:id",
      element: (
        <MainLayout>
          <LotteryLayout>
            <Suspense>
              <MegaPage />
            </Suspense>
          </LotteryLayout>
        </MainLayout>
      ),
    },
    {
      path: "/lottery/keno/:id",
      element: (
        <MainLayout>
          <LotteryLayout>
            <Suspense>
              <KenoPage />
            </Suspense>
          </LotteryLayout>
        </MainLayout>
      ),
    },
    {
      path: "/casino",
      element: (
        <MainLayout>
          <Suspense>
            <CasinoPage />
          </Suspense>
        </MainLayout>
      ),
    },
    {
      path: "/sport",
      element: (
        <MainLayout>
          <Suspense>
            <SportPage />
          </Suspense>
        </MainLayout>
      ),
    },
    {
      path: "/cock-fighting",
      element: (
        <MainLayout>
          <Suspense>
            <CockfightingPage />
          </Suspense>
        </MainLayout>
      ),
    },
    {
      path: "/fish",
      element: (
        <MainLayout>
          <Suspense>
            <FishPage />
          </Suspense>
        </MainLayout>
      ),
    },
    {
      path: "/chess",
      element: (
        <MainLayout>
          <Suspense>
            <ChessPage />
          </Suspense>
        </MainLayout>
      ),
    },
    {
      path: "/slot",
      element: (
        <MainLayout>
          <Suspense>
            <SlotPage />
          </Suspense>
        </MainLayout>
      ),
    },
    {
      path: "/mobile/tai-xiu/:id",
      element: (
        <MobileLayout>
          <Suspense>
            <TaiXiuMobile />
          </Suspense>
        </MobileLayout>
      ),
    },
    {
      path: "/mobile/xo-so/:id",
      element: (
        <MobileLayout>
          <Suspense>
            <XosoMobilePage />
          </Suspense>
        </MobileLayout>
      ),
    },
    {
      path: "/mobile/mega/:id",
      element: (
        <MobileLayout>
          <Suspense>
            <MegaMobilePage />
          </Suspense>
        </MobileLayout>
      ),
    },
    {
      path: "/mobile/keno/:id",
      element: (
        <MobileLayout>
          <Suspense>
            <KenoMobilePage />
          </Suspense>
        </MobileLayout>
      ),
    },
    // {
    //   path: "/mobile/keno/:id",
    //   element: (
    //     <MobileLayout>
    //       <Suspense>
    //         <KenoMobilePage />
    //       </Suspense>
    //     </MobileLayout>
    //   ),
    // },
    {
      path: "/mobile/result-history",
      element: (
        <MobileLayout>
          <Suspense>
            <ResultHistory />
          </Suspense>
        </MobileLayout>
      ),
    },
    {
      path: "/mobile/my-transaction",
      element: (
        <MobileLayout>
          <Suspense>
            <MyTransaction />
          </Suspense>
        </MobileLayout>
      ),
    },
    {
      path: "/mobile/message",
      element: (
        <MobileLayout>
          <Suspense>
            <MessageMobile />
          </Suspense>
        </MobileLayout>
      ),
    },
    {
      path: "/mobile/all-game",
      element: (
        <MobileLayout>
          <Suspense>
            <AllGame />
          </Suspense>
        </MobileLayout>
      ),
    },
    {
      path: "/mobile/bank-detail",
      element: (
        <MobileLayout>
          <Suspense>
            <BankDetail />
          </Suspense>
        </MobileLayout>
      ),
    },
    {
      path: "/mobile/help",
      element: (
        <MainLayout>
          <Suspense>
            <HelpMobilePage />
          </Suspense>
        </MainLayout>
      ),
    },

    {
      path: "/lottery/xo-so/:id",
      element: (
        <MainLayout>
          <LotteryLayout>
            <Suspense>
              <XosoPage />
            </Suspense>
          </LotteryLayout>
        </MainLayout>
      ),
    },
    {
      path: "/mobile/xo-so-list",
      element: (
        <MainLayout>
          <Suspense>
            <XoSoList />
          </Suspense>
        </MainLayout>
      ),
    },
    {
      path: "/mobile/game-list/:type",
      element: (
        <MainLayout>
          <Suspense>
            <GameList />
          </Suspense>
        </MainLayout>
      ),
    },
  ]);
  return routeElements;
}
