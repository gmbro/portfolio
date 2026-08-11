declare module "@typebot.io/react" {
  import type { ComponentType } from "react";

  interface BubbleProps {
    typebot: string;
    apiHost?: string;
    previewMessage?: {
      message: string;
      autoShowDelay?: number;
      avatarUrl?: string;
    };
    theme?: {
      position?: "fixed" | "static";
      button?: {
        backgroundColor?: string;
        customIconSrc?: string;
        iconColor?: string;
        size?: "medium" | "large" | `${number}px`;
      };
      previewMessage?: {
        backgroundColor?: string;
        textColor?: string;
      };
    };
  }

  export const Bubble: ComponentType<BubbleProps>;
  export const hidePreviewMessage: () => void;
}
