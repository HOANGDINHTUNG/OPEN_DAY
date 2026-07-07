import { useCallback, useRef } from "react";

export function useAudio() {
  const selectAudio = useRef(new Audio("/sounds/select.mp3"));
  const correctAudio = useRef(new Audio("/sounds/correct.mp3"));
  const wrongAudio = useRef(new Audio("/sounds/wrong.mp3"));
  const tickAudio = useRef(new Audio("/sounds/tick.mp3"));

  const playSafe = async (
    audioRef: React.MutableRefObject<HTMLAudioElement>,
  ) => {
    try {
      audioRef.current.currentTime = 0;
      await audioRef.current.play();
    } catch (e) {
      // Bỏ qua lỗi play() nếu file không tồn tại hoặc user chưa tương tác màn hình
    }
  };

  const playSelect = useCallback(() => playSafe(selectAudio), []);
  const playCorrect = useCallback(() => playSafe(correctAudio), []);
  const playWrong = useCallback(() => playSafe(wrongAudio), []);
  const playTick = useCallback(() => playSafe(tickAudio), []);

  return {
    playSelect,
    playCorrect,
    playWrong,
    playTick,
  };
}
