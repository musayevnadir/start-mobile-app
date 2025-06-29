import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

export const CommonStyles = StyleSheet.create({
  flex: {
    flex: 1,
  } as ViewStyle | TextStyle,
  flexGrow: {
    flexGrow: 1,
  } as ViewStyle | TextStyle,
  flexGrowNone: {
    flexGrow: 0,
  } as ViewStyle | TextStyle,
  flexWrap: {
    flexWrap: 'wrap',
  } as ViewStyle | TextStyle,
  flexShrink: {
    flexShrink: 1,
  } as ViewStyle | TextStyle,
  flexJustifyCenter: {
    flex: 1,
    justifyContent: 'center',
  } as ViewStyle,
  flexAlignCenter: {
    flex: 1,
    alignItems: 'center',
  } as ViewStyle,
  flexRow: {
    flex: 1,
    flexDirection: 'row',
  } as ViewStyle,
  flexAlignRow: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
  } as ViewStyle,
  flexAlignJustifyCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  } as ViewStyle,
  row: {
    flexDirection: 'row',
  } as ViewStyle,
  rowReverse: {
    flexDirection: 'row-reverse',
  } as ViewStyle,
  justifyCenterRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  } as ViewStyle,
  alignCenterRow: {
    flexDirection: 'row',
    alignItems: 'center',
  } as ViewStyle,
  alignJustifyCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  } as ViewStyle,
  alignJustifyCenterRow: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  } as ViewStyle,
  flexAlignJustifyCenterRow: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  } as ViewStyle,
  flexJustifyBetween: {
    flex: 1,
    justifyContent: 'space-between',
  } as ViewStyle,
  flexAlignCenterJustifyBetweenRow: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  } as ViewStyle,
  alignCenterJustifyBetweenRow: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  } as ViewStyle,
  justifyBetweenRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  } as ViewStyle,
  flexJustifyEnd: {
    flex: 1,
    justifyContent: 'flex-end',
  } as ViewStyle,
  justifyEnd: {
    justifyContent: 'flex-end',
  } as ViewStyle,
  justifyStart: {
    justifyContent: 'flex-start',
  } as ViewStyle,
  justifyContentCenter: {
    justifyContent: 'center',
  } as ViewStyle,
  alginSelfCenter: {
    alignSelf: 'center',
  } as ViewStyle,
  alginSelfEnd: {
    alignSelf: 'flex-end',
  } as ViewStyle,
  alginSelfStart: {
    alignSelf: 'flex-start',
  } as ViewStyle,
  alginStart: {
    alignItems: 'flex-start',
  } as ViewStyle,
  absolute: {
    position: 'absolute',
  } as ViewStyle,
  fullWidth: {
    width: '100%',
  } as ViewStyle | TextStyle,
  fullHeight: {
    height: '100%',
  } as ViewStyle | TextStyle,
  fullWidthHeight: {
    width: '100%',
    height: '100%',
  } as ViewStyle,
  none: {
    display: 'none',
  } as ViewStyle,
  overflowHidden: {
    overflow: 'hidden',
  } as ViewStyle,
  paddingLeftZero: {
    paddingLeft: 0,
  } as ViewStyle,
  paddingRightZero: {
    paddingRight: 0,
  } as ViewStyle,
  paddingTopZero: {
    paddingTop: 0,
  } as ViewStyle,
  paddingBottomZero: {
    paddingBottom: 0,
  } as ViewStyle,
  paddingZero: {
    padding: 0,
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
  } as ViewStyle,
});
