"use client";

import { Play } from "lucide-react";
import { useCallback, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Server {
  name: string;
  address: string;
}

interface ServerInfoProps {
  server: Server;
}

interface RGBColor {
  r: number;
  g: number;
  b: number;

  toString(): string;
}

const toHex = (n: number) => n.toString(16).padStart(2, "0");

function createRGBColor(r: number, g: number, b: number): RGBColor {
  if (r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) {
    throw new Error("RGB values must be between 0 and 255");
  }

  return {
    r,
    g,
    b,

    toString(): string {
      return `${toHex(this.r)}${toHex(this.g)}${toHex(this.b)}`;
    },
  };
}

interface IframeUrlParams {
  address: string;
  bgColor: RGBColor;
  fontColor: RGBColor;
  titleBgColor: RGBColor;
  titleColor: RGBColor;
  borderColor: RGBColor;
  linkColor: RGBColor;
  borderLinkColor: RGBColor;
  showMap: boolean;
  showBlogs: boolean;
  showCurrPlayers: boolean;
  showTopPlayers: boolean;
  currentPlayersHeight: number;
  width: number;
  height: number;
}

function buildIframeUrl(params: IframeUrlParams) {
  const {
    address,
    bgColor,
    fontColor,
    titleBgColor,
    titleColor,
    borderColor,
    linkColor,
    borderLinkColor,
    showMap,
    showBlogs,
    showCurrPlayers,
    showTopPlayers,
    currentPlayersHeight,
    width,
    height,
  } = params;
  return `https://cache.gametracker.com/components/html0/?
        host=${address}&
        bgColor=${bgColor}&
        fontColor=${fontColor}&
        titleBgColor=${titleBgColor}&
        titleColor=${titleColor}&
        borderColor=${borderColor}&
        linkColor=${linkColor}&
        borderLinkColor=${borderLinkColor}&
        showMap=${showMap ? "1" : "0"}&
        currentPlayersHeight=${currentPlayersHeight}&
        showCurrPlayers=${showCurrPlayers ? "1" : "0"}&
        showTopPlayers=${showTopPlayers ? "1" : "0"}&
        showBlogs=${showBlogs ? "1" : "0"}&
        width=${width}&
        height=${height}`;
}

function handleServerConnect(serverAddress: string) {
  window.location.href = `steam://connect/${serverAddress}`;
}

// GameTracker renders the widget at exactly the requested pixel width, so we
// request the width the card actually has (up to the widget's natural 400px).
const MAX_WIDGET_WIDTH = 400;
const WIDGET_HEIGHT = 600;
// Each width change reloads the iframe, so wait until resizing settles.
const RESIZE_DEBOUNCE_MS = 150;

function debounce(fn: () => void, ms: number) {
  let timer: ReturnType<typeof setTimeout> | undefined;
  const debounced = () => {
    clearTimeout(timer);
    timer = setTimeout(fn, ms);
  };
  debounced.cancel = () => clearTimeout(timer);
  return debounced;
}

export function ServerInfo({ server }: ServerInfoProps) {
  const { address } = server;
  const [widgetWidth, setWidgetWidth] = useState<number | null>(null);

  // React 19 ref callback with cleanup: observe the container while it's mounted.
  const widgetContainerRef = useCallback((container: HTMLDivElement | null) => {
    if (!container) return;
    const fit = () =>
      setWidgetWidth(
        Math.min(MAX_WIDGET_WIDTH, Math.floor(container.getBoundingClientRect().width)),
      );
    fit();

    const fitAfterResize = debounce(fit, RESIZE_DEBOUNCE_MS);
    const observer = new ResizeObserver(fitAfterResize);
    observer.observe(container);
    return () => {
      fitAfterResize.cancel();
      observer.disconnect();
    };
  }, []);

  const iframeUrl = buildIframeUrl({
    address,
    // Background: oklch(0.08 0 0) - card color (slightly lighter than main background)
    bgColor: createRGBColor(20, 20, 20),
    // Foreground: oklch(0.95 0 0) - main text color
    fontColor: createRGBColor(242, 242, 242),
    // Title background: oklch(0.05 0 0) - main background color for contrast
    titleBgColor: createRGBColor(13, 13, 13),
    // Title text: oklch(0.75 0.15 85) - primary gold color
    titleColor: createRGBColor(215, 185, 95),
    // Border: oklch(0.2 0 0) - border color
    borderColor: createRGBColor(51, 51, 51),
    // Links: oklch(0.75 0.15 85) - primary gold color for consistency
    linkColor: createRGBColor(215, 185, 95),
    // Border links: oklch(0.65 0 0) - muted foreground for subtle links
    borderLinkColor: createRGBColor(166, 166, 166),
    showMap: false,
    showBlogs: false,
    showCurrPlayers: true,
    showTopPlayers: false,
    currentPlayersHeight: 400,
    width: widgetWidth ?? MAX_WIDGET_WIDTH,
    height: WIDGET_HEIGHT,
  });

  return (
    <Card className="bg-card border-border hover:border-primary/50 transition-colors">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-xl text-card-foreground">{server.name}</CardTitle>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Server Info */}
        <div
          ref={widgetContainerRef}
          className="flex justify-center overflow-hidden"
          style={{ height: WIDGET_HEIGHT }}
        >
          {widgetWidth !== null && (
            <iframe
              src={iframeUrl}
              width={widgetWidth}
              height={WIDGET_HEIGHT}
              title={`${server.name} server status`}
            />
          )}
        </div>

        {/* Launch Button */}
        <Button
          onClick={() => handleServerConnect(server.address)}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3"
          size="lg"
        >
          <Play className="w-5 h-5 mr-2" />
          {"Launch Game & Connect"}
        </Button>
      </CardContent>
    </Card>
  );
}
