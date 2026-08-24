import {
  Component,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ComponentType,
  type ErrorInfo,
  type FormEvent,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import type { BubbleProps } from "@typebot.io/react";
import JdBriefForm from "@/components/JdBriefForm";
import {
  chatbotAvatar,
  chatbotGuide,
  chatbotStarterQuestions,
  getChatbotFollowupQuestions,
  resolveChatbotQuestionPath,
  validateChatbotQuestion,
  type ChatbotQuestionPath,
} from "@/data/chatbot";
import {
  trackChatInteraction,
  trackPortfolioEvent,
  type ChatQuestionSource,
} from "@/lib/analytics";
import { PORTFOLIO_OPEN_CHAT_EVENT, type PortfolioOpenChatDetail } from "@/lib/chat";

const TYPEBOT_ID = "portfolio-typebot";
const TYPEBOT_GUIDE_MOUNT_ID = "portfolio-chat-window-guide-mount";
const TYPEBOT_LOAD_TIMEOUT_MS = 10_000;
const TYPEBOT_REPLY_TIMEOUT_MS = 45_000;

type TypebotModule = typeof import("@typebot.io/react");

let typebotModulePromise: Promise<TypebotModule> | undefined;

const loadTypebotModule = () => {
  if (!typebotModulePromise) {
    typebotModulePromise = import("@typebot.io/react").catch((error) => {
      typebotModulePromise = undefined;
      throw error;
    });
  }

  return typebotModulePromise;
};

const withTimeout = <T,>(promise: Promise<T>, timeoutMs: number) =>
  new Promise<T>((resolve, reject) => {
    const timeout = window.setTimeout(
      () => reject(new Error("Typebot load timeout")),
      timeoutMs,
    );

    promise.then(
      (value) => {
        window.clearTimeout(timeout);
        resolve(value);
      },
      (error) => {
        window.clearTimeout(timeout);
        reject(error);
      },
    );
  });

const closeIcon =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'%3E%3Crect width='48' height='48' rx='24' fill='%23f4f4f5'/%3E%3Cpath d='m17 17 14 14M31 17 17 31' fill='none' stroke='%23111111' stroke-width='2.6' stroke-linecap='round'/%3E%3C/svg%3E";

const guideStyles = `
  #${TYPEBOT_GUIDE_MOUNT_ID} {
    position: absolute;
    inset: 0;
    z-index: 10;
    width: 100%;
    height: 100%;
    font-family: "Pretendard Variable", Pretendard, sans-serif;
    pointer-events: none;
  }

  #${TYPEBOT_GUIDE_MOUNT_ID}:empty { display: none; }

  .portfolio-chat-window-guide {
    position: relative;
    display: flex;
    height: 100%;
    min-height: 0;
    flex-direction: column;
    overflow: hidden;
    border: 0;
    border-radius: 23px;
    background: #ffffff;
    color: #111111;
    box-shadow: none;
    word-break: keep-all;
    animation: portfolio-chat-window-guide-in 180ms ease-out both;
    pointer-events: none;
  }

  .portfolio-chat-window-guide--intro { background: #ffffff; }

  .portfolio-chat-window-guide--conversation { background: transparent; }

  [part="bot"] * {
    font-family: "Pretendard Variable", Pretendard, sans-serif !important;
  }

  [part="bot"][data-portfolio-chat-mode="conversation"] .typebot-container {
    padding-top: 64px !important;
    padding-bottom: 256px !important;
    background: #ffffff !important;
  }

  [part="bot"][data-portfolio-chat-mode="conversation"] .typebot-input-form {
    position: absolute !important;
    width: 1px !important;
    height: 1px !important;
    overflow: hidden !important;
    clip: rect(0 0 0 0) !important;
    clip-path: inset(50%) !important;
    opacity: 0 !important;
    pointer-events: none !important;
  }

  [part="bot"] .typebot-button {
    background: linear-gradient(135deg, #e94f35 0%, #ff6645 54%, #ff9b45 100%) !important;
    color: #ffffff !important;
  }

  .portfolio-chat-window-guide__header {
    display: grid;
    min-height: 64px;
    grid-template-columns: 40px minmax(0, 1fr) 44px;
    gap: 10px;
    align-items: center;
    padding: 10px 12px;
    background: linear-gradient(135deg, #e94f35 0%, #ff6645 54%, #ff9b45 100%);
    color: #ffffff;
    pointer-events: auto;
  }

  .portfolio-chat-window-guide__avatar {
    position: relative;
    display: grid;
    width: 40px;
    height: 40px;
    overflow: hidden;
    place-items: center;
    border: 1px solid rgb(255 255 255 / 0.72);
    border-radius: 14px;
    background: #111111;
    color: #ffffff;
    font-size: 11px;
    font-weight: 800;
  }

  .portfolio-chat-window-guide__avatar img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .portfolio-chat-window-guide__heading { min-width: 0; }

  .portfolio-chat-window-guide__heading strong {
    overflow-wrap: anywhere;
    font-size: 16px;
    font-weight: 800;
    line-height: 1.3;
  }

  .portfolio-chat-window-guide__close {
    display: grid;
    width: 44px;
    height: 44px;
    place-items: center;
    border: 1px solid rgb(255 255 255 / 0.28);
    border-radius: 9999px;
    background: rgb(17 17 17 / 0.16);
    color: #ffffff;
    cursor: pointer;
  }

  .portfolio-chat-window-guide__close svg {
    width: 22px;
    height: 22px;
    fill: none;
    stroke: currentcolor;
    stroke-width: 2;
    stroke-linecap: round;
  }

  .portfolio-chat-window-guide__body {
    min-height: 0;
    flex: 1;
    overflow-x: hidden;
    overflow-y: auto;
    overscroll-behavior: contain;
    padding: 16px 18px 14px;
    background: #ffffff;
    pointer-events: auto;
    scrollbar-gutter: stable;
  }

  .portfolio-chat-window-guide__tabs {
    display: grid;
    flex: 0 0 auto;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 4px;
    padding: 10px 18px 0;
    background: #ffffff;
    pointer-events: auto;
  }

  .portfolio-chat-window-guide__tab {
    min-width: 0;
    min-height: 44px;
    padding: 8px 10px;
    border: 1px solid transparent;
    border-radius: 12px;
    background: #f4f4f5;
    color: #71717a;
    font-family: inherit;
    font-size: 12px;
    font-weight: 750;
    line-height: 1.3;
    cursor: pointer;
  }

  .portfolio-chat-window-guide__tab[aria-selected="true"] {
    border-color: rgb(255 102 69 / 0.35);
    background: #fff1ed;
    color: #c73822;
  }

  .portfolio-chat-window-guide__panel {
    display: flex;
    min-height: 0;
    flex: 1;
    flex-direction: column;
  }

  #portfolio-chat-jd-brief-panel .portfolio-chat-window-guide__body {
    padding-bottom: 60px;
  }

  .portfolio-chat-window-guide__message {
    display: grid;
    grid-template-columns: 32px minmax(0, 1fr);
    gap: 9px;
    align-items: start;
  }

  .portfolio-chat-window-guide__message-avatar {
    position: relative;
    display: grid;
    width: 32px;
    height: 32px;
    overflow: hidden;
    place-items: center;
    border: 1px solid #e4e4e7;
    border-radius: 11px;
    background: #ffffff;
  }

  .portfolio-chat-window-guide__message-avatar img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .portfolio-chat-window-guide__intro {
    padding: 13px 14px;
    border-radius: 4px 17px 17px;
    background: #f4f4f5;
    color: #27272a;
    font-size: 14px;
    font-weight: 520;
    line-height: 1.55;
  }

  .portfolio-chat-window-guide__label {
    margin: 14px 0 8px;
    color: #52525b;
    font-size: 12px;
    font-weight: 750;
  }

  .portfolio-chat-window-guide__starters {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 8px;
  }

  .portfolio-chat-window-guide__starters button {
    display: flex;
    height: 58px;
    min-width: 0;
    min-height: 58px;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    padding: 10px 11px;
    border: 1px solid #e4e4e7;
    border-radius: 14px;
    background: #ffffff;
    color: #27272a;
    font-family: inherit;
    font-size: 12px;
    font-weight: 750;
    line-height: 1.35;
    text-align: left;
    cursor: pointer;
  }

  .portfolio-chat-window-guide__starters button span:first-child {
    min-width: 0;
    overflow-wrap: anywhere;
  }

  .portfolio-chat-window-guide__starters button span:last-child {
    flex: 0 0 auto;
    color: #ff6645;
    font-size: 15px;
  }

  .portfolio-jd-brief {
    display: flex;
    min-height: 100%;
    flex-direction: column;
    color: #27272a;
  }

  .portfolio-jd-brief__intro {
    display: grid;
    gap: 4px;
    padding: 13px 14px;
    border-radius: 16px;
    background: #f4f4f5;
  }

  .portfolio-jd-brief__intro strong {
    color: #18181b;
    font-size: 14px;
    font-weight: 800;
    line-height: 1.45;
  }

  .portfolio-jd-brief__intro span {
    color: #52525b;
    font-size: 11px;
    line-height: 1.5;
  }

  .portfolio-jd-brief__source-switch {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 6px;
    margin-top: 12px;
  }

  .portfolio-jd-brief__source-switch button {
    min-height: 44px;
    padding: 8px 6px;
    border: 1px solid #e4e4e7;
    border-radius: 12px;
    background: #ffffff;
    color: #52525b;
    font-family: inherit;
    font-size: 11px;
    font-weight: 750;
    cursor: pointer;
  }

  .portfolio-jd-brief__source-switch button.is-active {
    border-color: rgb(255 102 69 / 0.5);
    background: #fff8f6;
    color: #c73822;
  }

  .portfolio-jd-brief__reader-form { margin-top: 11px; }

  .portfolio-jd-brief__field label {
    display: block;
    margin-bottom: 7px;
    color: #3f3f46;
    font-size: 12px;
    font-weight: 750;
  }

  .portfolio-jd-brief__field input,
  .portfolio-jd-brief__field textarea {
    width: 100%;
    border: 1px solid #d4d4d8;
    border-radius: 12px;
    background: #fafafa;
    color: #111111;
    font-family: inherit;
    font-size: 14px;
    line-height: 1.4;
  }

  .portfolio-jd-brief__field input {
    min-height: 48px;
    padding: 0 12px;
  }

  .portfolio-jd-brief__field textarea {
    min-height: 146px;
    max-height: 260px;
    padding: 11px 12px;
    resize: vertical;
  }

  .portfolio-jd-brief__field input[type="file"] {
    min-height: 52px;
    padding: 7px;
    color: #52525b;
    font-size: 11px;
  }

  .portfolio-jd-brief__field input[type="file"]::file-selector-button {
    min-height: 36px;
    margin-right: 8px;
    padding: 6px 10px;
    border: 1px solid #d4d4d8;
    border-radius: 9px;
    background: #ffffff;
    color: #27272a;
    font-family: inherit;
    font-weight: 750;
    cursor: pointer;
  }

  .portfolio-jd-brief__field input::placeholder,
  .portfolio-jd-brief__field textarea::placeholder { color: #8b8b92; opacity: 1; }

  .portfolio-jd-brief__file-name {
    display: block;
    margin-top: 5px;
    overflow-wrap: anywhere;
    color: #71717a;
    font-size: 10px;
    line-height: 1.4;
  }

  .portfolio-jd-brief__read-button,
  .portfolio-jd-brief__create-button {
    display: inline-flex;
    width: 100%;
    min-height: 48px;
    align-items: center;
    justify-content: center;
    gap: 8px;
    border-radius: 12px;
    font-family: inherit;
    font-size: 13px;
    font-weight: 800;
    cursor: pointer;
  }

  .portfolio-jd-brief__read-button {
    margin-top: 9px;
    border: 1px solid #d4d4d8;
    background: #ffffff;
    color: #27272a;
  }

  .portfolio-jd-brief__create-button {
    margin-top: 10px;
    border: 0;
    background: linear-gradient(135deg, #e94f35 0%, #ff6645 52%, #ff9b45 100%);
    color: #ffffff;
  }

  .portfolio-jd-brief__status,
  .portfolio-jd-brief__error,
  .portfolio-jd-brief__notice {
    margin: 8px 0 0;
    font-size: 10px;
    line-height: 1.5;
  }

  .portfolio-jd-brief__status { color: #3f3f46; font-weight: 700; }
  .portfolio-jd-brief__error { color: #b42318; font-weight: 650; }
  .portfolio-jd-brief__notice { color: #71717a; }

  .portfolio-jd-brief__preview {
    margin-top: 9px;
    border: 1px solid #e4e4e7;
    border-radius: 12px;
    background: #fafafa;
  }

  .portfolio-jd-brief__preview summary {
    display: flex;
    min-height: 42px;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    padding: 8px 10px;
    color: #3f3f46;
    font-size: 11px;
    font-weight: 800;
    cursor: pointer;
  }

  .portfolio-jd-brief__preview summary span:last-child {
    min-width: 0;
    color: #c73822;
    font-size: 9px;
    text-align: right;
    overflow-wrap: anywhere;
  }

  .portfolio-jd-brief__preview > p {
    max-height: 146px;
    overflow: auto;
    margin: 0;
    padding: 0 10px 10px;
    color: #52525b;
    font-size: 10px;
    line-height: 1.55;
    overflow-wrap: anywhere;
    white-space: pre-wrap;
  }

  .portfolio-jd-brief__quality-warning {
    display: grid;
    gap: 5px;
    margin-top: 9px;
    padding: 10px;
    border: 1px solid #fecaca;
    border-radius: 12px;
    background: #fff7f6;
    color: #991b1b;
    font-size: 10px;
    line-height: 1.5;
  }

  .portfolio-jd-brief__quality-warning strong { font-size: 11px; }

  .portfolio-jd-brief__quality-warning ul {
    display: grid;
    gap: 2px;
    margin: 0;
    padding-left: 16px;
  }

  .portfolio-jd-result {
    display: grid;
    gap: 10px;
    margin-top: 14px;
    padding: 13px;
    border: 1px solid #fed7cc;
    border-radius: 16px;
    background: #fffaf8;
    overflow-wrap: anywhere;
  }

  .portfolio-jd-result__header {
    display: flex;
    min-width: 0;
    align-items: flex-start;
    justify-content: space-between;
    gap: 10px;
  }

  .portfolio-jd-result__header p {
    margin: 0 0 2px;
    color: #71717a;
    font-size: 10px;
    font-weight: 750;
  }

  .portfolio-jd-result__header h3 {
    margin: 0;
    color: #18181b;
    font-size: 18px;
    font-weight: 850;
    line-height: 1.15;
  }

  .portfolio-jd-result__header h3 span {
    color: #e94f35;
    font-size: 34px;
    letter-spacing: -0.04em;
  }

  .portfolio-jd-result__beta {
    flex: 0 0 auto;
    padding: 5px 7px;
    border: 1px solid #fed7cc;
    border-radius: 9999px;
    background: #ffffff;
    color: #c73822;
    font-size: 9px;
    font-weight: 800;
    letter-spacing: 0.04em;
  }

  .portfolio-jd-result__summary {
    margin: 0;
    color: #27272a;
    font-size: 12px;
    font-weight: 700;
    line-height: 1.55;
  }

  .portfolio-jd-result__requirements {
    display: grid;
    gap: 8px;
  }

  .portfolio-jd-result__requirement {
    min-width: 0;
    padding: 10px;
    border: 1px solid #e4e4e7;
    border-radius: 12px;
    background: #ffffff;
  }

  .portfolio-jd-result__requirement > header {
    display: flex;
    min-width: 0;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  }

  .portfolio-jd-result__requirement h4 {
    min-width: 0;
    margin: 0;
    color: #18181b;
    font-size: 13px;
    font-weight: 850;
  }

  .portfolio-jd-result__requirement > header > span {
    flex: 0 0 auto;
    color: #c73822;
    font-size: 9px;
    font-weight: 800;
  }

  .portfolio-jd-result__signals {
    margin: 5px 0 0;
    color: #71717a;
    font-size: 9px;
    line-height: 1.45;
  }

  .portfolio-jd-result__requirement ul,
  .portfolio-jd-result__details ul,
  .portfolio-jd-result__details ol {
    display: grid;
    gap: 7px;
    margin: 8px 0 0;
    padding: 0;
    list-style: none;
  }

  .portfolio-jd-result__requirement li {
    display: grid;
    gap: 3px;
    padding-top: 8px;
    border-top: 1px solid #f1f1f3;
  }

  .portfolio-jd-result__requirement li strong {
    color: #27272a;
    font-size: 11px;
    font-weight: 800;
    line-height: 1.45;
  }

  .portfolio-jd-result__requirement li span {
    color: #c73822;
    font-size: 9px;
    font-weight: 750;
    line-height: 1.4;
  }

  .portfolio-jd-result__requirement li p,
  .portfolio-jd-result__gap {
    margin: 0;
    color: #52525b;
    font-size: 10px;
    line-height: 1.5;
  }

  .portfolio-jd-result__gap {
    margin-top: 8px;
    padding-top: 8px;
    border-top: 1px solid #f1f1f3;
    color: #a13c2b;
    font-weight: 700;
  }

  .portfolio-jd-result__details {
    border-top: 1px solid #fed7cc;
    padding-top: 9px;
    color: #52525b;
    font-size: 10px;
    line-height: 1.5;
  }

  .portfolio-jd-result__details summary {
    color: #3f3f46;
    font-size: 11px;
    font-weight: 800;
    cursor: pointer;
  }

  .portfolio-jd-result__details li {
    position: relative;
    padding-left: 12px;
  }

  .portfolio-jd-result__details li::before {
    position: absolute;
    top: 0;
    left: 0;
    color: #ff6645;
    content: "·";
  }

  .portfolio-jd-result__formula p {
    margin: 7px 0 0;
  }

  .portfolio-jd-result__disclaimer {
    margin: 0;
    color: #71717a;
    font-size: 9px;
    line-height: 1.5;
  }

  .portfolio-jd-result__ask-button {
    display: inline-flex;
    width: 100%;
    min-height: 46px;
    align-items: center;
    justify-content: center;
    gap: 7px;
    border: 0;
    border-radius: 12px;
    background: #18181b;
    color: #ffffff;
    font-family: inherit;
    font-size: 12px;
    font-weight: 800;
    cursor: pointer;
  }

  .portfolio-jd-result__insufficient {
    display: grid;
    gap: 5px;
    padding: 3px;
  }

  .portfolio-jd-result__insufficient strong {
    color: #a13c2b;
    font-size: 13px;
  }

  .portfolio-jd-result__insufficient p {
    margin: 0;
    color: #52525b;
    font-size: 11px;
    line-height: 1.55;
  }

  .portfolio-chat-window-guide__form { margin-top: 14px; }

  .portfolio-chat-window-guide__intro-composer {
    flex: 0 0 auto;
    padding: 11px 18px 58px;
    border-top: 1px solid #e4e4e7;
    background: rgb(255 255 255 / 0.98);
    box-shadow: 0 -14px 32px rgb(24 24 27 / 0.08);
    pointer-events: auto;
  }

  .portfolio-chat-window-guide__intro-composer .portfolio-chat-window-guide__form {
    margin-top: 0;
  }

  .portfolio-chat-window-guide__conversation {
    position: relative;
    display: flex;
    width: 100%;
    flex: 0 0 auto;
    flex-direction: column;
    gap: 8px;
    margin-top: auto;
    padding: 10px 14px 58px;
    border-top: 1px solid #e4e4e7;
    background: rgb(255 255 255 / 0.98);
    box-shadow: 0 -14px 32px rgb(24 24 27 / 0.08);
    pointer-events: auto;
  }

  .portfolio-chat-window-guide__followup-label {
    margin: 0;
    color: #52525b;
    font-size: 11px;
    font-weight: 750;
    line-height: 1.35;
  }

  .portfolio-chat-window-guide__followups {
    display: flex;
    gap: 7px;
    overflow-x: auto;
    overscroll-behavior-inline: contain;
    padding: 1px 1px 4px;
    scroll-snap-type: inline proximity;
    scrollbar-width: none;
    touch-action: pan-x;
  }

  .portfolio-chat-window-guide__followups::-webkit-scrollbar { display: none; }

  .portfolio-chat-window-guide__followups button {
    display: flex;
    width: auto;
    min-width: max-content;
    min-height: 44px;
    flex: 0 0 auto;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    padding: 8px 12px;
    border: 1px solid #e4e4e7;
    border-radius: 9999px;
    background: #fff8f6;
    color: #3f3f46;
    font-family: inherit;
    font-size: 11px;
    font-weight: 700;
    line-height: 1.35;
    text-align: left;
    cursor: pointer;
    scroll-snap-align: start;
    white-space: nowrap;
  }

  .portfolio-chat-window-guide__followups button span:first-child {
    min-width: 0;
    overflow-wrap: anywhere;
  }

  .portfolio-chat-window-guide__followups button span:last-child {
    flex: 0 0 auto;
    color: #ff6645;
  }

  .portfolio-chat-window-guide__conversation .portfolio-chat-window-guide__form {
    margin-top: 0;
  }

  .portfolio-chat-window-guide__form--conversation label {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    white-space: nowrap;
  }

  .portfolio-chat-window-guide__form label {
    display: block;
    margin-bottom: 7px;
    color: #3f3f46;
    font-size: 12px;
    font-weight: 750;
  }

  .portfolio-chat-window-guide__form input {
    width: 100%;
    min-height: 50px;
    padding: 0 14px;
    border: 1px solid #d4d4d8;
    border-radius: 14px;
    background: #fafafa;
    color: #111111;
    font-family: inherit;
    font-size: 16px;
    line-height: 1.4;
  }

  .portfolio-chat-window-guide__form input::placeholder { color: #8b8b92; opacity: 1; }

  .portfolio-chat-window-guide__error {
    margin-top: 7px;
    color: #b42318;
    font-size: 12px;
    font-weight: 650;
    line-height: 1.4;
  }

  .portfolio-chat-window-guide__status,
  .portfolio-chat-window-guide__privacy {
    margin-top: 8px;
    color: #71717a;
    font-size: 10px;
    line-height: 1.45;
  }

  .portfolio-chat-window-guide__submit {
    display: inline-flex;
    width: 100%;
    min-height: 50px;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin-top: 9px;
    border: 0;
    border-radius: 14px;
    background: linear-gradient(135deg, #e94f35 0%, #ff6645 52%, #ff9b45 100%);
    color: #ffffff;
    font-family: inherit;
    font-size: 14px;
    font-weight: 800;
    cursor: pointer;
  }

  .portfolio-chat-window-guide__submit svg {
    width: 19px;
    height: 19px;
    fill: none;
    stroke: currentcolor;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .portfolio-chat-window-guide button:disabled,
  .portfolio-chat-window-guide input:disabled,
  .portfolio-chat-window-guide textarea:disabled { cursor: wait; opacity: 0.58; }

  .portfolio-chat-window-guide button:focus-visible,
  .portfolio-chat-window-guide input:focus-visible,
  .portfolio-chat-window-guide textarea:focus-visible { outline: 2px solid #111111; outline-offset: 3px; }

  @keyframes portfolio-chat-window-guide-in {
    from { opacity: 0; transform: translateY(8px) scale(0.99); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }

  @media (max-width: 639px) {
    .portfolio-chat-window-guide { border-radius: 22px; }
    .portfolio-chat-window-guide__header { min-height: 62px; padding: 9px 10px; }
    .portfolio-chat-window-guide__body {
      padding: 12px;
      scrollbar-gutter: auto;
    }
    .portfolio-chat-window-guide__tabs { padding: 8px 12px 0; }
    .portfolio-chat-window-guide__tab { padding-inline: 7px; font-size: 11px; }
    .portfolio-chat-window-guide__starters {
      grid-template-columns: minmax(0, 1fr);
      gap: 7px;
    }
    .portfolio-chat-window-guide__starters button {
      height: 50px;
      min-height: 50px;
      padding: 8px 11px;
    }
    .portfolio-chat-window-guide__intro-composer { padding: 9px 12px 54px; }
    .portfolio-jd-brief__intro { padding: 11px 12px; }
    .portfolio-jd-brief__source-switch { gap: 4px; }
    .portfolio-jd-brief__source-switch button { padding-inline: 4px; font-size: 10px; }
    [part="bot"][data-portfolio-chat-mode="conversation"] .typebot-container {
      padding-top: 62px !important;
      padding-bottom: 252px !important;
    }
    .portfolio-chat-window-guide__conversation { padding: 9px 12px 56px; }
  }

  @media (hover: hover) and (pointer: fine) {
    .portfolio-chat-window-guide__starters button:hover:not(:focus-visible) {
      border-color: rgb(255 102 69 / 0.42);
      background: #fff8f6;
    }
    .portfolio-chat-window-guide__followups button:hover:not(:focus-visible) {
      border-color: rgb(255 102 69 / 0.46);
      background: #fff1ed;
    }
    .portfolio-chat-window-guide__submit:hover:not(:focus-visible) { filter: brightness(1.04); }
  }

  @media (prefers-reduced-motion: reduce) {
    .portfolio-chat-window-guide,
    .portfolio-chat-window-guide button { animation: none; transition: none; }
  }
`;

interface TypebotErrorBoundaryProps {
  children: ReactNode;
  onError: () => void;
}

interface TypebotErrorBoundaryState {
  hasError: boolean;
}

class TypebotErrorBoundary extends Component<TypebotErrorBoundaryProps, TypebotErrorBoundaryState> {
  state: TypebotErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): TypebotErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(_error: Error, _info: ErrorInfo) {
    this.props.onError();
  }

  render() {
    return this.state.hasError ? null : this.props.children;
  }
}

const stripQueryBeforeThirdPartyLoad = () => {
  if (typeof window === "undefined" || !window.location.search) return;
  const cleanUrl = `${window.location.pathname}${window.location.hash}`;
  window.history.replaceState(window.history.state, "", cleanUrl);
};

interface TypebotBubbleProps {
  observeAnalyticsConsent?: boolean;
}

const TypebotBubble = ({ observeAnalyticsConsent = false }: TypebotBubbleProps) => {
  const [analyticsConsentVisible, setAnalyticsConsentVisible] = useState(false);
  const [introTab, setIntroTab] = useState<"career" | "jd-brief">("career");
  const [question, setQuestion] = useState("");
  const [questionError, setQuestionError] = useState("");
  const [activeQuestionPath, setActiveQuestionPath] = useState<ChatbotQuestionPath>("career-fit");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [hasRequestedBot, setHasRequestedBot] = useState(false);
  const [inputReady, setInputReady] = useState(false);
  const [guideVisible, setGuideVisible] = useState(true);
  const [loadFailed, setLoadFailed] = useState(false);
  const [renderAttempt, setRenderAttempt] = useState(0);
  const [guidePortalTarget, setGuidePortalTarget] = useState<HTMLElement | null>(null);
  const [BubbleComponent, setBubbleComponent] = useState<ComponentType<BubbleProps> | null>(null);
  const chatTriggerRef = useRef<HTMLElement | null>(null);
  const guideInputRef = useRef<HTMLInputElement>(null);
  const guideCloseRef = useRef<HTMLButtonElement>(null);
  const moduleRef = useRef<TypebotModule>();
  const loadAttemptRef = useRef(0);
  const readyTimeoutRef = useRef<number>();
  const replyTimeoutRef = useRef<number>();
  const submitFrameRef = useRef<number>();
  const focusFrameRef = useRef<number>();
  const bubbleReadyRef = useRef(false);
  const userRequestedOpen = useRef(false);
  const trackedOpen = useRef(false);
  const mountedRef = useRef(true);
  const awaitingReplyRef = useRef(false);
  const conversationStartedRef = useRef(false);
  const questionCountRef = useRef(0);

  const clearReadyTimeout = useCallback(() => {
    if (readyTimeoutRef.current === undefined) return;
    window.clearTimeout(readyTimeoutRef.current);
    readyTimeoutRef.current = undefined;
  }, []);

  const clearReplyTimeout = useCallback(() => {
    if (replyTimeoutRef.current === undefined) return;
    window.clearTimeout(replyTimeoutRef.current);
    replyTimeoutRef.current = undefined;
  }, []);

  const rememberTypebotModule = useCallback((typebot: TypebotModule) => {
    if (!mountedRef.current) return typebot;
    moduleRef.current = typebot;
    setBubbleComponent(() => typebot.Bubble);
    return typebot;
  }, []);

  const focusChatTrigger = useCallback(() => {
    if (focusFrameRef.current !== undefined) window.cancelAnimationFrame(focusFrameRef.current);
    focusFrameRef.current = window.requestAnimationFrame(() => {
      chatTriggerRef.current?.focus({ preventScroll: true });
      focusFrameRef.current = undefined;
    });
  }, []);

  const cancelPendingSubmission = useCallback(() => {
    if (submitFrameRef.current !== undefined) {
      window.cancelAnimationFrame(submitFrameRef.current);
      submitFrameRef.current = undefined;
      moduleRef.current?.setInputValue("", { id: TYPEBOT_ID });
    }
    awaitingReplyRef.current = false;
    clearReplyTimeout();
    setIsLoading(false);
  }, [clearReplyTimeout]);

  const closeChat = useCallback(() => {
    cancelPendingSubmission();
    clearReadyTimeout();
    clearReplyTimeout();
    userRequestedOpen.current = false;
    setIsOpen(false);
    setQuestionError("");
    setIsLoading(false);

    if (!bubbleReadyRef.current) {
      loadAttemptRef.current += 1;
      setHasRequestedBot(false);
      setInputReady(false);
      setGuidePortalTarget(null);
    }

    focusChatTrigger();
  }, [cancelPendingSubmission, clearReadyTimeout, clearReplyTimeout, focusChatTrigger]);

  const handleLoadError = useCallback(() => {
    loadAttemptRef.current += 1;
    clearReadyTimeout();
    cancelPendingSubmission();
    userRequestedOpen.current = false;
    bubbleReadyRef.current = false;
    setHasRequestedBot(false);
    setInputReady(false);
    setGuidePortalTarget(null);
    setIsOpen(false);
    setIsLoading(false);
    setGuideVisible(true);
    setLoadFailed(true);
  }, [cancelPendingSubmission, clearReadyTimeout]);

  useEffect(
    () => () => {
      mountedRef.current = false;
      loadAttemptRef.current += 1;
      clearReadyTimeout();
      clearReplyTimeout();
      if (submitFrameRef.current !== undefined) window.cancelAnimationFrame(submitFrameRef.current);
      if (focusFrameRef.current !== undefined) window.cancelAnimationFrame(focusFrameRef.current);
    },
    [clearReadyTimeout, clearReplyTimeout],
  );

  useLayoutEffect(() => {
    if (!observeAnalyticsConsent) {
      setAnalyticsConsentVisible(false);
      return;
    }
    const consentSelector = '[data-analytics-consent-banner="true"]';
    const syncConsentVisibility = () => setAnalyticsConsentVisible(Boolean(document.querySelector(consentSelector)));
    const includesConsentBanner = (node: Node) =>
      node instanceof Element && (node.matches(consentSelector) || Boolean(node.querySelector(consentSelector)));
    syncConsentVisibility();
    const observer = new MutationObserver((mutations) => {
      const consentChanged = mutations.some((mutation) =>
        [...mutation.addedNodes, ...mutation.removedNodes].some(includesConsentBanner),
      );
      if (consentChanged) syncConsentVisibility();
    });
    observer.observe(document.getElementById("root") ?? document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [observeAnalyticsConsent]);

  useEffect(() => {
    if (analyticsConsentVisible && isOpen) closeChat();
  }, [analyticsConsentVisible, closeChat, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleDialogKeyboard = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeChat();
        return;
      }
      if (event.key !== "Tab" || !guidePortalTarget) return;

      const focusable = Array.from(
        guidePortalTarget.querySelectorAll<HTMLElement>(
          'button:not(:disabled), input:not(:disabled), a[href], details > summary',
        ),
      ).filter((element) => !element.closest('[inert], [aria-hidden="true"]'));
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = guidePortalTarget.getRootNode() instanceof ShadowRoot
        ? (guidePortalTarget.getRootNode() as ShadowRoot).activeElement
        : document.activeElement;
      if (event.shiftKey && (active === first || !focusable.includes(active as HTMLElement))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (active === last || !focusable.includes(active as HTMLElement))) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", handleDialogKeyboard);
    return () => window.removeEventListener("keydown", handleDialogKeyboard);
  }, [closeChat, guidePortalTarget, guideVisible, inputReady, introTab, isOpen]);

  useEffect(() => {
    if (!guidePortalTarget || !isOpen) return;
    const focusFrame = window.requestAnimationFrame(() => {
      const focusTarget = inputReady
        ? guideInputRef.current
          ?? guidePortalTarget.querySelector<HTMLInputElement>("input:not(:disabled)")
          ?? guideCloseRef.current
        : guideCloseRef.current;
      focusTarget?.focus({ preventScroll: true });
    });
    return () => window.cancelAnimationFrame(focusFrame);
  }, [guidePortalTarget, guideVisible, inputReady, introTab, isOpen]);

  useEffect(() => {
    const botWindow = guidePortalTarget?.parentElement;
    if (!botWindow || !isOpen) return;
    botWindow.dataset.portfolioChatMode = guideVisible ? "intro" : "conversation";
    return () => {
      delete botWindow.dataset.portfolioChatMode;
    };
  }, [guidePortalTarget, guideVisible, isOpen]);

  useEffect(() => {
    if (!guidePortalTarget || !guideVisible || !isOpen || inputReady) return;
    const fallbackTimer = window.setTimeout(handleLoadError, TYPEBOT_LOAD_TIMEOUT_MS);
    return () => window.clearTimeout(fallbackTimer);
  }, [guidePortalTarget, guideVisible, handleLoadError, inputReady, isOpen]);

  useEffect(() => {
    const botWindow = guidePortalTarget?.parentElement;
    if (!botWindow || !guideVisible || !isOpen) return;

    const previousState = new Map<HTMLElement, { inert: boolean; ariaHidden: string | null }>();
    const protectManagedChildren = () => {
      Array.from(botWindow.children).forEach((child) => {
        if (!(child instanceof HTMLElement) || child === guidePortalTarget) return;
        if (!previousState.has(child)) {
          previousState.set(child, {
            inert: child.hasAttribute("inert"),
            ariaHidden: child.getAttribute("aria-hidden"),
          });
        }
        child.setAttribute("inert", "");
        child.setAttribute("aria-hidden", "true");
      });
    };

    protectManagedChildren();
    const observer = new MutationObserver(protectManagedChildren);
    observer.observe(botWindow, { childList: true });

    return () => {
      observer.disconnect();
      previousState.forEach(({ inert, ariaHidden }, child) => {
        if (!inert) child.removeAttribute("inert");
        if (ariaHidden === null) child.removeAttribute("aria-hidden");
        else child.setAttribute("aria-hidden", ariaHidden);
      });
    };
  }, [guidePortalTarget, guideVisible, isOpen]);

  useEffect(() => {
    if (!hasRequestedBot || !BubbleComponent) return;
    let shadowObserver: MutationObserver | undefined;
    let retryTimer: number | undefined;
    let mountPoint: HTMLDivElement | undefined;

    const syncTypebot = () => {
      const root = document.querySelector(`typebot-bubble#${TYPEBOT_ID}`)?.shadowRoot;
      if (!root) return false;

      if (!root.querySelector('style[data-portfolio-chat-window-guide="true"]')) {
        const style = document.createElement("style");
        style.dataset.portfolioChatWindowGuide = "true";
        style.textContent = guideStyles;
        root.appendChild(style);
      }

      const button = root.querySelector<HTMLButtonElement>('button[part="button"]');
      const botWindow = root.querySelector<HTMLElement>('[part="bot"]');
      if (botWindow) {
        mountPoint = botWindow.querySelector<HTMLDivElement>(`#${TYPEBOT_GUIDE_MOUNT_ID}`) ?? undefined;
        if (!mountPoint) {
          mountPoint = document.createElement("div");
          mountPoint.id = TYPEBOT_GUIDE_MOUNT_ID;
          botWindow.appendChild(mountPoint);
        }
        setGuidePortalTarget((current) => (current === mountPoint ? current : mountPoint ?? null));
      }
      if (button) {
        const label = button.getAttribute("aria-pressed") === "true" ? "물어보기 닫기" : "물어보기 열기";
        if (button.getAttribute("aria-label") !== label) button.setAttribute("aria-label", label);
      }

      const previewClose = root.querySelector<HTMLButtonElement>('[part="preview-message-close-button"]');
      if (previewClose?.getAttribute("aria-label") !== "미리보기 닫기") {
        previewClose?.setAttribute("aria-label", "미리보기 닫기");
      }
      root.querySelectorAll<HTMLImageElement>('img[part="button-icon"]').forEach((image) => {
        if (image.alt !== "") image.alt = "";
      });

      const input = root.querySelector<HTMLInputElement>(".typebot-input-form input, .typebot-input-form textarea");
      const nativeInputForm = root.querySelector<HTMLElement>(".typebot-input-form");
      if (input) {
        if (input.placeholder !== chatbotGuide.placeholder) input.placeholder = chatbotGuide.placeholder;
        if (input.getAttribute("aria-label") !== chatbotGuide.placeholder) input.setAttribute("aria-label", chatbotGuide.placeholder);
        input.tabIndex = -1;
      }
      const sendButton = root.querySelector<HTMLButtonElement>(".typebot-input-form button.typebot-button");
      if (sendButton) {
        if (sendButton.getAttribute("aria-label") !== "질문 보내기") sendButton.setAttribute("aria-label", "질문 보내기");
        sendButton.tabIndex = -1;
      }
      nativeInputForm?.setAttribute("aria-hidden", "true");
      if (!input) setInputReady(false);
      else if (!awaitingReplyRef.current) setInputReady(true);

      if (botWindow) {
        bubbleReadyRef.current = true;
        if (!awaitingReplyRef.current) setIsLoading(false);
        clearReadyTimeout();
        if (userRequestedOpen.current) {
          userRequestedOpen.current = false;
          if (!trackedOpen.current) {
            trackedOpen.current = true;
            trackPortfolioEvent("chat_open");
          }
        }
      }

      if (!shadowObserver) {
        shadowObserver = new MutationObserver(syncTypebot);
        shadowObserver.observe(root, {
          attributes: true,
          attributeFilter: ["aria-label", "aria-pressed", "alt", "placeholder"],
          childList: true,
          subtree: true,
        });
      }
      return true;
    };

    const hostObserver = new MutationObserver(() => {
      if (syncTypebot()) hostObserver.disconnect();
    });
    hostObserver.observe(document.body, { childList: true, subtree: true });
    if (syncTypebot()) hostObserver.disconnect();
    retryTimer = window.setInterval(() => {
      if (syncTypebot() && retryTimer !== undefined) {
        window.clearInterval(retryTimer);
        retryTimer = undefined;
      }
    }, 250);

    return () => {
      hostObserver.disconnect();
      shadowObserver?.disconnect();
      if (retryTimer !== undefined) window.clearInterval(retryTimer);
      mountPoint?.remove();
      setGuidePortalTarget(null);
    };
  }, [BubbleComponent, clearReadyTimeout, hasRequestedBot, renderAttempt]);

  const openChat = (event?: Event) => {
    if (isLoading) return;
    const trigger = event instanceof CustomEvent
      ? (event as CustomEvent<PortfolioOpenChatDetail>).detail?.trigger
      : undefined;
    if (trigger instanceof HTMLElement) chatTriggerRef.current = trigger;
    else if (!chatTriggerRef.current && document.activeElement instanceof HTMLElement && document.activeElement !== document.body) {
      chatTriggerRef.current = document.activeElement;
    }
    stripQueryBeforeThirdPartyLoad();
    const loadAttempt = loadAttemptRef.current + 1;
    loadAttemptRef.current = loadAttempt;
    userRequestedOpen.current = true;
    bubbleReadyRef.current = false;
    setQuestionError("");
    setLoadFailed(false);
    setIntroTab("career");
    setGuideVisible(true);
    setInputReady(false);
    setIsLoading(true);
    setIsOpen(true);
    setHasRequestedBot(true);
    setRenderAttempt(loadAttempt);
    clearReadyTimeout();
    readyTimeoutRef.current = window.setTimeout(() => {
      if (loadAttemptRef.current === loadAttempt && !bubbleReadyRef.current) handleLoadError();
    }, TYPEBOT_LOAD_TIMEOUT_MS);

    void withTimeout(loadTypebotModule(), TYPEBOT_LOAD_TIMEOUT_MS)
      .then((typebot) => {
        if (loadAttemptRef.current === loadAttempt) rememberTypebotModule(typebot);
      })
      .catch(() => {
        if (loadAttemptRef.current === loadAttempt) handleLoadError();
      });
  };

  useEffect(() => {
    window.addEventListener(PORTFOLIO_OPEN_CHAT_EVENT, openChat);
    return () => window.removeEventListener(PORTFOLIO_OPEN_CHAT_EVENT, openChat);
  });

  const startConversation = (
    value: string,
    path = resolveChatbotQuestionPath(value),
    maxLength = 500,
    source: ChatQuestionSource = "freeform",
    questionId?: string,
    position?: number,
  ) => {
    const validation = validateChatbotQuestion(value, maxLength);
    setQuestion(validation.question);
    setQuestionError(validation.error);
    if (validation.error) {
      guideInputRef.current?.focus({ preventScroll: true });
      return;
    }

    const typebot = moduleRef.current;
    if (!typebot || !inputReady) {
      setQuestionError("채팅 입력을 준비하고 있습니다. 잠시 후 다시 시도해 주세요.");
      guideInputRef.current?.focus({ preventScroll: true });
      return;
    }

    const questionIndex = questionCountRef.current + 1;
    if (!conversationStartedRef.current) {
      trackChatInteraction("chat_start", { path, source, questionIndex });
      conversationStartedRef.current = true;
    }
    trackChatInteraction("chat_question_submit", { path, source, questionIndex });
    if (questionId && position) {
      trackChatInteraction("chat_recommendation_click", {
        path,
        source,
        questionId,
        position,
      });
    }
    questionCountRef.current = questionIndex;

    awaitingReplyRef.current = true;
    setActiveQuestionPath(path);
    clearReplyTimeout();
    setInputReady(false);
    setIsLoading(true);
    typebot.setInputValue(validation.question, { id: TYPEBOT_ID });
    submitFrameRef.current = window.requestAnimationFrame(() => {
      typebot.submitInput({ id: TYPEBOT_ID });
      submitFrameRef.current = undefined;
      setQuestion("");
      setQuestionError("");
      setGuideVisible(false);
      replyTimeoutRef.current = window.setTimeout(() => {
        if (!awaitingReplyRef.current) return;
        setQuestionError("답변이 늦어지고 있습니다. 잠시 후 다시 시도해 주세요.");
      }, TYPEBOT_REPLY_TIMEOUT_MS);
    });
  };

  const handleNewInputBlock = useCallback(() => {
    awaitingReplyRef.current = false;
    clearReplyTimeout();
    setInputReady(true);
    setIsLoading(false);
    setQuestionError("");
  }, [clearReplyTimeout]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isLoading) startConversation(question);
  };

  const questionForm = (isConversation: boolean) => (
    <form
      className={`portfolio-chat-window-guide__form${isConversation ? " portfolio-chat-window-guide__form--conversation" : ""}`}
      onSubmit={handleSubmit}
      noValidate
    >
      <label htmlFor="portfolio-chat-window-question">
        {isConversation ? "후속 질문" : "직접 질문하기"}
      </label>
      <input
        ref={guideInputRef}
        id="portfolio-chat-window-question"
        type="text"
        value={question}
        minLength={2}
        maxLength={500}
        autoComplete="off"
        enterKeyHint="send"
        placeholder={chatbotGuide.placeholder}
        aria-invalid={Boolean(questionError)}
        aria-describedby={questionError
          ? "portfolio-chat-window-question-error portfolio-chat-window-guide-privacy"
          : "portfolio-chat-window-guide-privacy"}
        disabled={!inputReady || isLoading}
        onChange={(event) => {
          setQuestion(event.target.value);
          if (questionError) setQuestionError("");
        }}
      />
      {questionError && (
        <p id="portfolio-chat-window-question-error" className="portfolio-chat-window-guide__error" role="alert">{questionError}</p>
      )}
      {!inputReady && (
        <p className="portfolio-chat-window-guide__status" role="status">
          {isLoading && !guideVisible ? "답변을 준비하고 있어요." : "채팅 입력을 준비하고 있어요."}
        </p>
      )}
      <button type="submit" className="portfolio-chat-window-guide__submit" disabled={!inputReady || isLoading}>
        질문 보내기
        <svg aria-hidden="true" viewBox="0 0 24 24"><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></svg>
      </button>
      <p id="portfolio-chat-window-guide-privacy" className="portfolio-chat-window-guide__privacy">
        {isConversation ? "개인정보·회사 내부 정보는 입력하지 마세요." : chatbotGuide.privacy}
      </p>
    </form>
  );

  const guidePortal = guidePortalTarget && isOpen
    ? createPortal(
        <section
          className={`portfolio-chat-window-guide ${guideVisible ? "portfolio-chat-window-guide--intro" : "portfolio-chat-window-guide--conversation"}`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="portfolio-chat-window-guide-title"
          aria-describedby={guideVisible
            ? introTab === "career"
              ? "portfolio-chat-window-guide-description portfolio-chat-window-guide-privacy"
              : "portfolio-jd-brief-notice"
            : undefined}
          aria-busy={isLoading}
        >
          <header className="portfolio-chat-window-guide__header">
            <span className="portfolio-chat-window-guide__avatar" aria-hidden="true">
              <img src={chatbotAvatar} alt="" width="40" height="40" decoding="async" />
            </span>
            <span className="portfolio-chat-window-guide__heading">
              <strong id="portfolio-chat-window-guide-title">{chatbotGuide.title}</strong>
            </span>
            <button ref={guideCloseRef} type="button" className="portfolio-chat-window-guide__close" aria-label="채팅 닫기" onClick={closeChat}>
              <svg aria-hidden="true" viewBox="0 0 24 24"><path d="m7 7 10 10M17 7 7 17" /></svg>
            </button>
          </header>

          {guideVisible ? <>
            <div className="portfolio-chat-window-guide__tabs" role="tablist" aria-label="이경민 AI 사용 방식">
              <button
                id="portfolio-chat-career-tab"
                type="button"
                role="tab"
                className="portfolio-chat-window-guide__tab"
                aria-selected={introTab === "career"}
                aria-controls="portfolio-chat-career-panel"
                onClick={() => setIntroTab("career")}
              >
                경력 질문
              </button>
              <button
                id="portfolio-chat-jd-brief-tab"
                type="button"
                role="tab"
                className="portfolio-chat-window-guide__tab"
                aria-selected={introTab === "jd-brief"}
                aria-controls="portfolio-chat-jd-brief-panel"
                onClick={() => setIntroTab("jd-brief")}
              >
                채용 브리프 Beta
              </button>
            </div>

            {introTab === "career" ? (
              <div
                id="portfolio-chat-career-panel"
                className="portfolio-chat-window-guide__panel"
                role="tabpanel"
                aria-labelledby="portfolio-chat-career-tab"
              >
                <div className="portfolio-chat-window-guide__body">
                  <div className="portfolio-chat-window-guide__message">
                    <span className="portfolio-chat-window-guide__message-avatar" aria-hidden="true">
                      <img src={chatbotAvatar} alt="" width="32" height="32" decoding="async" />
                    </span>
                    <p id="portfolio-chat-window-guide-description" className="portfolio-chat-window-guide__intro">{chatbotGuide.intro}</p>
                  </div>

                  <p className="portfolio-chat-window-guide__label">추천 질문 6개</p>
                  <div className="portfolio-chat-window-guide__starters">
                    {chatbotStarterQuestions.map((starter, index) => (
                      <button
                        key={starter.id}
                        type="button"
                        disabled={!inputReady || isLoading}
                        aria-label={`${starter.label}: ${starter.question}`}
                        onClick={() => startConversation(
                          starter.question,
                          starter.path,
                          500,
                          "starter",
                          starter.id,
                          index + 1,
                        )}
                      >
                        <span>{starter.label}</span><span aria-hidden="true">↗</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="portfolio-chat-window-guide__intro-composer">
                  {questionForm(false)}
                </div>
              </div>
            ) : (
              <div
                id="portfolio-chat-jd-brief-panel"
                className="portfolio-chat-window-guide__panel"
                role="tabpanel"
                aria-labelledby="portfolio-chat-jd-brief-tab"
              >
                <div className="portfolio-chat-window-guide__body">
                  <JdBriefForm
                    disabled={!inputReady || isLoading}
                    onReadStart={(inputKind) => trackChatInteraction("jd_brief_start", {
                      path: "jd-brief",
                      source: "jd-brief",
                      inputKind,
                    })}
                    onExtracted={(inputKind) => trackChatInteraction("jd_brief_ready", {
                      path: "jd-brief",
                      source: "jd-brief",
                      inputKind,
                    })}
                    onCreateBrief={(prompt) => startConversation(
                      prompt,
                      "jd-brief",
                      500,
                      "jd-brief",
                    )}
                  />
                </div>
              </div>
            )}
          </> : (
            <div className="portfolio-chat-window-guide__conversation">
              <p id="portfolio-chat-window-followup-label" className="portfolio-chat-window-guide__followup-label">
                이어서 이런 질문을 해보세요
              </p>
              <div
                className="portfolio-chat-window-guide__followups"
                role="group"
                aria-labelledby="portfolio-chat-window-followup-label"
              >
                {getChatbotFollowupQuestions(activeQuestionPath).map((followup, index) => (
                  <button
                    key={followup.id}
                    type="button"
                    disabled={!inputReady || isLoading}
                    aria-label={followup.question}
                    onClick={() => startConversation(
                      followup.question,
                      activeQuestionPath,
                      500,
                      "followup",
                      followup.id,
                      index + 1,
                    )}
                  >
                    <span>{followup.label}</span><span aria-hidden="true">↗</span>
                  </button>
                ))}
              </div>
              {questionForm(true)}
            </div>
          )}
        </section>,
        guidePortalTarget,
      )
    : null;

  return (
    <>
      {loadFailed && (
        <div className="portfolio-chat-load-error" role="alert">
          <p>{chatbotGuide.loadError}</p>
          <div>
            <button type="button" onClick={() => openChat()}>다시 연결</button>
            <a href="#case-studies">프로젝트 직접 보기</a>
          </div>
        </div>
      )}

      {hasRequestedBot && BubbleComponent && (
        <TypebotErrorBoundary key={renderAttempt} onError={handleLoadError}>
          <BubbleComponent
            id={TYPEBOT_ID}
            typebot="gmbro"
            apiHost="https://typebot.io"
            isOpen={isOpen}
            inlineStyle={{
              "--container-bottom": "var(--portfolio-chat-bottom)",
              "--bot-max-width": "min(560px, calc(100vw - 24px))",
              "--bot-max-height": "min(860px, calc(100dvh - 24px))",
              "--typebot-container-font-family": '"Pretendard Variable", Pretendard',
              "--typebot-container-bg-color": "#ffffff",
              "--typebot-host-bubble-bg-rgb": "244, 244, 245",
              "--typebot-host-bubble-color": "#111111",
              "--typebot-host-bubble-border-radius": "18px",
              "--typebot-guest-bubble-bg-rgb": "255, 102, 69",
              "--typebot-guest-bubble-color": "#ffffff",
              "--typebot-guest-bubble-border-radius": "18px",
              "--typebot-input-bg-color": "#ffffff",
              "--typebot-input-bg-rgb": "255, 255, 255",
              "--typebot-input-color": "#111111",
              "--typebot-input-placeholder-color": "#71717a",
              "--typebot-input-border-rgb": "212, 212, 216",
              "--typebot-input-border-opacity": "1",
              "--typebot-input-border-radius": "16px",
              "--typebot-button-bg-rgb": "255, 102, 69",
              "--typebot-button-bg-color": "#ff6645",
              "--typebot-button-color": "#ffffff",
              "--typebot-button-border-radius": "16px",
            }}
            onOpen={() => setIsOpen(true)}
            onClose={closeChat}
            onNewInputBlock={handleNewInputBlock}
            theme={{
              position: "fixed",
              button: {
                backgroundColor: "#FFFFFF",
                iconColor: "#111111",
                customIconSrc: chatbotAvatar,
                customCloseIconSrc: closeIcon,
                isHidden: true,
                size: "large",
              },
            }}
          />
        </TypebotErrorBoundary>
      )}

      {guidePortal}
    </>
  );
};

export default TypebotBubble;
