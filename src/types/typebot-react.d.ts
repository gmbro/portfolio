declare module "@typebot.io/react" {
  import type { ComponentType } from "react";

  interface BubbleProps {
    typebot: string;
    apiHost?: string;
    theme?: {
      position?: "fixed" | "static";
      button?: {
        backgroundColor?: string;
        customIconSrc?: string;
        iconColor?: string;
        size?: "medium" | "large" | `${number}px`;
      };
    };
  }

  export const Bubble: ComponentType<BubbleProps>;
}
