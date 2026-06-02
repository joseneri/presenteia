export const themes = {
  theme1: {
    id: "theme1",
    name: "Green Yellow",
    colors: {
      primary: "#0F766E",
      primaryDark: "#115E59",
      primaryLight: "#CCFBF1",
      accent: "#F6C453",
      accentDark: "#D99A00",
      accentLight: "#FFF3C4",
      background: "#FFF8ED",
      sectionBackground: "#FFF4E3",
      surface: "#FFFFFF",
      heading: "#111827",
      text: "#1F2933",
      muted: "#5F6B7A",
      border: "#E8DCCB",
      borderSoft: "#F0E4D4",
      badgeBg: "#FFF3C4",
      badgeText: "#5A3A00",
      badgeBorder: "#F6C453",
      logoIcon: "#0F766E",
      logoAccent: "#F6C453",
      logoText: "#1F2933",
      logoIA: "#0F766E"
    }
  },
  theme2: {
    id: "theme2",
    name: "Warm Gift",
    colors: {
      primary: "#C05666",
      primaryDark: "#9F3F4E",
      primaryLight: "#F9D9DE",
      accent: "#E7B94E",
      accentDark: "#C78A14",
      accentLight: "#FFF4CC",
      background: "#FFF7F0",
      sectionBackground: "#FFF1E6",
      surface: "#FFFFFF",
      heading: "#241C15",
      text: "#4A3F35",
      muted: "#6F6258",
      border: "#E7D6C5",
      borderSoft: "#F0E2D4",
      badgeBg: "#FFF4CC",
      badgeText: "#6A4300",
      badgeBorder: "#E7B94E",
      logoIcon: "#C05666",
      logoAccent: "#E7B94E",
      logoText: "#241C15",
      logoIA: "#C05666"
    }
  }
} as const;

export type ThemeId = keyof typeof themes;

export const activeTheme = themes.theme2;
