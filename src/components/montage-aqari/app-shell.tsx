import { Moon, Sun } from "lucide-react";
import { type ReactNode, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

type Theme = "light" | "dark";

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const applySystemTheme = () => setTheme(media.matches ? "dark" : "light");
    applySystemTheme();
    media.addEventListener("change", applySystemTheme);
    return () => media.removeEventListener("change", applySystemTheme);
  }, []);

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <div className="min-h-screen bg-background text-foreground transition-colors">
        <Header theme={theme} onThemeChange={setTheme} />
        <main className="mx-auto w-full max-w-[704px] px-4 py-6 sm:px-8 sm:py-10">{children}</main>
        <Footer />
      </div>
    </div>
  );
}

interface HeaderProps {
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
}

export function Header({ theme, onThemeChange }: HeaderProps) {
  const isDark = theme === "dark";
  return (
    <header className="brand-gradient sticky top-0 z-50 border-b border-brand-gold/30 shadow-lg">
      <div className="mx-auto flex min-h-20 max-w-5xl items-center justify-between gap-4 px-4 sm:px-8">
        <div className="min-w-0 leading-none" aria-label="MontageAqari مونتاج عقاري">
          <div className="font-display text-[1.7rem] font-semibold text-primary-foreground sm:text-3xl">
            MontageAqari
          </div>
          <div dir="rtl" className="mt-1 font-sans text-[0.68rem] font-medium text-brand-gold-light sm:text-xs">
            مونتاج عقاري
          </div>
        </div>
        <ThemeToggle theme={theme} onThemeChange={onThemeChange} />
      </div>
    </header>
  );
}

export function ThemeToggle({ theme, onThemeChange }: HeaderProps) {
  const isDark = theme === "dark";
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className="size-11 shrink-0 border border-primary-foreground/25 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
      onClick={() => onThemeChange(isDark ? "light" : "dark")}
      aria-label={isDark ? "Use light mode" : "Use dark mode"}
      title={isDark ? "Use light mode" : "Use dark mode"}
    >
      {isDark ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
    </Button>
  );
}

export function Footer() {
  return (
    <footer className="px-4 pb-8 pt-2 text-center text-xs text-muted-foreground">
      By Mohsen Sami Angawi · <span dir="rtl">محسن سامي عنقاوي</span>
    </footer>
  );
}