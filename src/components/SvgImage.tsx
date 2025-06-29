import React, { memo } from 'react';
import { Insets, Pressable, StyleProp, View, ViewStyle } from 'react-native';
import { SvgProps } from 'react-native-svg';

import { scale } from 'theme/metrics';

export interface SvgImageProps extends SvgProps {
  source: any;
  hide?: boolean;
  rootStyle?: StyleProp<ViewStyle>;
  pressable?: boolean;
  pressableHitSlop?: null | Insets | number;
  onPress?: () => void;
}

export const SvgImage: React.FC<SvgImageProps> = memo(
  ({
    source,
    pressable,
    onPress,
    children,
    pressableHitSlop,
    rootStyle,
    ...props
  }) => {
    if (!source?.default || props.hide) {
      return null;
    }

    if (props.width) {
      props.width = scale.moderate(Number(props.width));
    }

    if (props.height) {
      props.height = scale.moderate(Number(props.height));
    }

    const svgElement = React.createElement(source.default, props, children);

    if (pressable) {
      return (
        <Pressable
          hitSlop={pressableHitSlop}
          onPress={onPress}
          style={rootStyle}
        >
          {svgElement}
        </Pressable>
      );
    }

    if (rootStyle) {
      return <View style={rootStyle}>{svgElement}</View>;
    }

    return svgElement;
  },
);
