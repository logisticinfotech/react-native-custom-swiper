// Type definitions for react-native-modal-dropdown 0.6
// Project: https://github.com/sohobloo/react-native-modal-dropdown
// Definitions by: Carlos Li <https://github.com/echoulen>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.8

import * as React from 'react';

import Swiper = RNSwiper.Swiper;
export = Swiper;

declare namespace RNSwiper {
  interface SwiperProps {
    swipeData?: Array<any>;
    style?: StyleSheet;
    backgroundColor?: String;
    containerWidth?: Number;
    currentSelectIndex?: Number;
    leftButtonImage?: any;
    rightButtonImage?: any;
    showSwipeBtn?: Boolean;
    autoplay?: Boolean;
    autoplayTimeout?: Number;
    renderSwipeItem?: (item: any) => void;
    onScreenChange?: (index: Number) => void;
  }

  class Swiper extends React.Component<SwiperProps> {
    static default: typeof Swiper;
  }
}
