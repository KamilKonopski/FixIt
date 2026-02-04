import type { NavigateFunction } from "react-router-dom";
import {
  startNavigationProgress,
  completeNavigationProgress,
} from "@mantine/nprogress";

export function navigateWithLoader(
  navigate: NavigateFunction,
  path: string,
  delay = 300,
) {
  if (window.location.pathname === path) return;

  startNavigationProgress();

  setTimeout(() => {
    navigate(path);
    completeNavigationProgress();
  }, delay);
}
