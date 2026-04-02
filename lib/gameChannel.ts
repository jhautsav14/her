export const gameChannel =
  typeof window !== "undefined"
    ? new BroadcastChannel("game_channel")
    : null;