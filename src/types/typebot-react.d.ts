declare module "@typebot.io/react" {
  import type { ComponentType } from "react";

  interface BubbleProps {
    id?: string;
    typebot: string;
    apiHost?: string;
    isOpen?: boolean;
    inlineStyle?: Record<string, string>;
    onOpen?: () => void;
    onClose?: () => void;
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
        customCloseIconSrc?: string;
        iconColor?: string;
        isHidden?: boolean;
        size?: "medium" | "large" | `${number}px`;
      };
      previewMessage?: {
        backgroundColor?: string;
        textColor?: string;
      };
    };
  }

  export const Bubble: ComponentType<BubbleProps>;
  export const open: () => void;
  export const hidePreviewMessage: () => void;
  export const showPreviewMessage: () => void;
}
