import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import Tts from 'react-native-tts';

const TTSComponent = ({ text }) => {
  useEffect(() => {
    Tts.setDefaultLanguage('ko-KR');
    Tts.setDefaultRate(0.5);
    Tts.addEventListener('tts-finish', handleTTSFinish);

    return () => {
      Tts.removeEventListener('tts-finish', handleTTSFinish);
    };
  }, []);

  const handleTTSFinish = () => {
    // TTS 재생 완료 시 호출되는 콜백 함수
    // 필요한 경우 추가 로직 구현
  };

  const speakText = () => {
    Tts.speak(text);
  };

  return null; // TTS를 사용하는 화면에 렌더링되지 않아야 하므로 null을 반환합니다.
};

export default TTSComponent;
