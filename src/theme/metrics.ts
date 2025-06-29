import { Dimensions, PixelRatio } from 'react-native';

/**
 * Responsive scaling utility for consistent UI across different devices
 * Design reference dimensions: 390x844 (iPhone 13/14)
 */

const DESIGN_WIDTH = 390;
const DESIGN_HEIGHT = 844;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const widthRatio = windowWidth / DESIGN_WIDTH;
const heightRatio = windowHeight / DESIGN_HEIGHT;

// Determine device type based on screen dimensions
const isTablet = Math.min(windowWidth, windowHeight) >= 600;
const isLandscape = windowWidth > windowHeight;
const isLargeTablet = isTablet && (windowWidth >= 1000 || windowHeight >= 1000);
const isMediumTablet =
  isTablet && !isLargeTablet && (windowWidth >= 800 || windowHeight >= 800);
const isSmallTablet = isTablet && !isLargeTablet && !isMediumTablet;

let deviceWidthFactor = 1;
let deviceHeightFactor = 1;
let deviceFontFactor = 1;

const deviceFontScale = PixelRatio.getFontScale();

if (isLargeTablet) {
  deviceWidthFactor = 0.5;
  deviceHeightFactor = 0.6;
  deviceFontFactor = 1.4;
} else if (isMediumTablet) {
  deviceWidthFactor = 0.55;
  deviceHeightFactor = 0.65;
  deviceFontFactor = 1.3;
} else if (isSmallTablet) {
  deviceWidthFactor = 0.65;
  deviceHeightFactor = 0.75;
  deviceFontFactor = 1.2;
}

if (isLandscape) {
  deviceWidthFactor += 0.2;
  deviceHeightFactor += 0.2;
}

let fontScaleAdjustment = Math.max(-0.2, Math.min(0.1, deviceFontScale - 0.95));

if (isTablet) {
  fontScaleAdjustment = Math.max(
    -0.2,
    Math.min(0.5, (deviceFontScale - 1) * 0.5),
  );
}

/**
 * Scales horizontal dimensions (width, horizontal margins, padding)
 * @param size - Size in pixels from design
 * @returns Scaled size for current device
 */
function scaleWidth(size: number): number {
  const minSize = Math.max(1, size * 0.5);
  const scaledSize = size * widthRatio * deviceWidthFactor;
  return Math.max(minSize, Math.round(scaledSize));
}

/**
 * Scales vertical dimensions (height, vertical margins, padding, line height)
 * @param size - Size in pixels from design
 * @returns Scaled size for current device
 */
function scaleHeight(size: number): number {
  const minSize = Math.max(1, size * 0.5);
  const scaledSize = size * heightRatio * deviceHeightFactor;
  return Math.max(minSize, Math.round(scaledSize));
}

/**
 * Scales font sizes and border radius with accessibility considerations
 * @param size - Size in pixels from design
 * @param maxScale - Optional maximum scale factor (default: 1.5)
 * @param minScale - Optional minimum scale factor (default: 0.9)
 * @returns Scaled size for current device
 */
function scaleFontSize(size: number, maxScale = 1.3, minScale = 0.9): number {
  const baseSize = size * deviceFontFactor;
  const accessibilityAdjustedSize = baseSize * (1 + fontScaleAdjustment);

  const minSize = size * minScale;
  const maxSize = size * maxScale;
  const constrainedSize = Math.max(
    minSize,
    Math.min(maxSize, accessibilityAdjustedSize),
  );

  return Math.round(constrainedSize);
}

/**
 * Scaling utility for responsive UI across different devices
 */
export class scale {
  /**
   * Scales vertical dimensions (height, margins, padding, line-height).
   * @example height, marginTop, marginBottom, marginVertical, lineHeight, paddingTop
   */
  public static readonly vertical = scaleHeight;

  /**
   * Scales horizontal dimensions (width, margins, padding).
   * @example width, marginLeft, marginRight, marginHorizontal, paddingLeft
   */
  public static readonly horizontal = scaleWidth;

  /**
   * Scales font sizes and border radius with accessibility adjustments.
   * @param size - Size in pixels from design
   * @param maxScale - Optional maximum scale factor (default: 1.5)
   * @param minScale - Optional minimum scale factor (default: 0.9)
   */
  public static moderate(
    size: number,
    maxScale?: number,
    minScale?: number,
  ): number {
    return scaleFontSize(size, maxScale, minScale);
  }
}
