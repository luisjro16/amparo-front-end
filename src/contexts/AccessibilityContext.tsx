import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type FontSizeLevel = 'normal' | 'large' | 'xlarge';

export interface ColorPalette {
  background: string;
  surface: string;
  primary: string;
  primaryLight: string;
  text: string;
  textSecondary: string;
  textOnPrimary: string;
  border: string;
  navBar: string;
  navBarIcon: string;
  navBarIconActive: string;
  error: string;
  cardBlue: string;
  cardBlueText: string;
  cardBlueSubtext: string;
  inputBackground: string;
}

export const COLORS_NORMAL: ColorPalette = {
  background: '#f5f5f5',
  surface: '#ffffff',
  primary: '#3F7EE4',
  primaryLight: '#A9D6FF',
  text: '#333333',
  textSecondary: '#888888',
  textOnPrimary: '#ffffff',
  border: '#eeeeee',
  navBar: '#558DC2',
  navBarIcon: '#A9D6FF',
  navBarIconActive: '#ffffff',
  error: '#D92D2D',
  cardBlue: 'rgba(79, 131, 217, 1)',
  cardBlueText: '#ffffff',
  cardBlueSubtext: '#A9D6FF',
  inputBackground: '#ffffff',
};

export const COLORS_HIGH_CONTRAST: ColorPalette = {
  background: '#000000',
  surface: '#1A1A1A',
  primary: '#FFD700',
  primaryLight: '#FFD700',
  text: '#FFFFFF',
  textSecondary: '#CCCCCC',
  textOnPrimary: '#000000',
  border: '#555555',
  navBar: '#111111',
  navBarIcon: '#AAAAAA',
  navBarIconActive: '#FFD700',
  error: '#FF5555',
  cardBlue: '#1A1A1A',
  cardBlueText: '#FFFFFF',
  cardBlueSubtext: '#CCCCCC',
  inputBackground: '#1A1A1A',
};

const FONT_SCALE: Record<FontSizeLevel, number> = {
  normal: 1.0,
  large: 1.2,
  xlarge: 1.4,
};

interface AccessibilityContextType {
  highContrast: boolean;
  fontSizeLevel: FontSizeLevel;
  fontScale: number;
  colors: ColorPalette;
  toggleHighContrast: () => void;
  setFontSizeLevel: (level: FontSizeLevel) => void;
}

const AccessibilityContext = createContext<AccessibilityContextType>({
  highContrast: false,
  fontSizeLevel: 'normal',
  fontScale: 1.0,
  colors: COLORS_NORMAL,
  toggleHighContrast: () => {},
  setFontSizeLevel: () => {},
});

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [highContrast, setHighContrast] = useState(false);
  const [fontSizeLevel, setFontSizeLevelState] = useState<FontSizeLevel>('normal');

  useEffect(() => {
    Promise.all([
      AsyncStorage.getItem('@amparo:highContrast'),
      AsyncStorage.getItem('@amparo:fontSize'),
    ])
      .then(([hc, fs]) => {
        if (hc !== null) setHighContrast(hc === 'true');
        if (fs !== null && fs in FONT_SCALE) setFontSizeLevelState(fs as FontSizeLevel);
      })
      .catch(() => {});
  }, []);

  const toggleHighContrast = () => {
    setHighContrast(prev => {
      const next = !prev;
      AsyncStorage.setItem('@amparo:highContrast', String(next)).catch(() => {});
      return next;
    });
  };

  const setFontSizeLevel = (level: FontSizeLevel) => {
    setFontSizeLevelState(level);
    AsyncStorage.setItem('@amparo:fontSize', level).catch(() => {});
  };

  const colors = useMemo(
    () => (highContrast ? COLORS_HIGH_CONTRAST : COLORS_NORMAL),
    [highContrast],
  );

  return (
    <AccessibilityContext.Provider
      value={{
        highContrast,
        fontSizeLevel,
        fontScale: FONT_SCALE[fontSizeLevel],
        colors,
        toggleHighContrast,
        setFontSizeLevel,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => useContext(AccessibilityContext);
