export const URL = {
  baseUrl:
    window.location.hostname === "localhost"
      ? "http://localhost:8000"
      : `https://api.${window.location.hostname}`,
  webSocketUrl:
    window.location.hostname === "localhost"
      ? "ws://localhost:8080/connect"
      : `wss://game.${window.location.hostname}/connect`,
  siteKey: "0x4AAAAAAAc-kdZSc9r3kA9u",
};
