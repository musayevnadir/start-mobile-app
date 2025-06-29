import { Platform, TextStyle } from 'react-native';

import { scale } from './metrics';

const fonts = Platform.select({
  android: {
    400: 'Roboto-Regular',
    500: 'Roboto-Medium',
    700: 'Roboto-Bold',
  },
  ios: {
    400: 'SFProDisplay-Regular',
    500: 'SFProDisplay-Medium',
    700: 'SFProDisplay-Bold',
  },
}) as { [key: string]: string };

const sizes = {
  font40: scale.moderate(40),
  font32: scale.moderate(32),
  font24: scale.moderate(24),
  font20: scale.moderate(20),
  font18: scale.moderate(18),
  font16: scale.moderate(16),
  font14: scale.moderate(14),
  font12: scale.moderate(12),
  font10: scale.moderate(10),
  font8: scale.moderate(8),
};

const commonFontStyling: TextStyle = {
  includeFontPadding: false,
  padding: 0,
};

export const typography = {
  LargeTitleMedium40: {
    ...commonFontStyling,
    fontFamily: fonts[500],
    fontSize: sizes.font40,
  } as TextStyle,
  LargeTitleRegular40: {
    ...commonFontStyling,
    fontFamily: fonts[400],
    fontSize: sizes.font40,
  } as TextStyle,
  LargeTitleRegular32: {
    ...commonFontStyling,
    fontFamily: fonts[500],
    fontSize: sizes.font32,
  } as TextStyle,
  HeadlineRegular24: {
    ...commonFontStyling,
    fontFamily: fonts[500],
    fontSize: sizes.font24,
  } as TextStyle,
  HeadlineRegular20: {
    ...commonFontStyling,
    fontFamily: fonts[400],
    fontSize: sizes.font20,
  } as TextStyle,
  HeadlineMedium20: {
    ...commonFontStyling,
    fontFamily: fonts[500],
    fontSize: sizes.font20,
  } as TextStyle,
  HeadlineMedium18: {
    ...commonFontStyling,
    fontFamily: fonts[500],
    fontSize: sizes.font18,
  } as TextStyle,
  HeadlineBold18: {
    ...commonFontStyling,
    fontFamily: fonts[700],
    fontSize: sizes.font18,
  } as TextStyle,
  HeadlineRegular18: {
    ...commonFontStyling,
    fontFamily: fonts[400],
    fontSize: sizes.font18,
  } as TextStyle,
  HeadlineRegular16: {
    ...commonFontStyling,
    fontFamily: fonts[400],
    fontSize: sizes.font16,
  } as TextStyle,
  HeadlineMedium16: {
    ...commonFontStyling,
    fontFamily: fonts[500],
    fontSize: sizes.font16,
  } as TextStyle,
  BodyRegular16: {
    ...commonFontStyling,
    fontFamily: fonts[400],
    fontSize: sizes.font16,
  } as TextStyle,
  BodyMedium14: {
    ...commonFontStyling,
    fontFamily: fonts[500],
    fontSize: sizes.font14,
  } as TextStyle,
  HeadlineRegular14: {
    ...commonFontStyling,
    fontFamily: fonts[400],
    fontSize: sizes.font14,
  } as TextStyle,
  HeadlineMedium14: {
    ...commonFontStyling,
    fontFamily: fonts[500],
    fontSize: sizes.font14,
  } as TextStyle,
  BodyRegular14: {
    ...commonFontStyling,
    fontFamily: fonts[400],
    fontSize: sizes.font14,
  } as TextStyle,
  HeadlineMedium12: {
    ...commonFontStyling,
    fontFamily: fonts[500],
    fontSize: sizes.font12,
  } as TextStyle,
  FootnoteRegular12: {
    ...commonFontStyling,
    fontFamily: fonts[400],
    fontSize: sizes.font12,
  } as TextStyle,
  FootnoteBold12: {
    ...commonFontStyling,
    fontFamily: fonts[700],
    fontSize: sizes.font12,
  } as TextStyle,
  FootnoteRegular10: {
    ...commonFontStyling,
    fontFamily: fonts[400],
    fontSize: sizes.font10,
  } as TextStyle,
  FootnoteRegular8: {
    ...commonFontStyling,
    fontFamily: fonts[400],
    fontSize: sizes.font8,
  } as TextStyle,
  centered: {
    textAlign: 'center',
  } as TextStyle,
  textDecorationLineThrough: {
    textDecorationLine: 'line-through',
  } as TextStyle,
};
