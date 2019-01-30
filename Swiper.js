import React from "react";
import { View, TouchableWithoutFeedback, FlatList, Dimensions, StyleSheet, Image, Text } from "react-native";

import PropTypes from "prop-types";

const { width, height } = Dimensions.get("window");

const leftArrow = require("./resource/leftIcon.png");
const rightArrow = require("./resource/rightIcon.png");

autoplayTimer = null;

class Swiper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showSwipeBtn: this.props.showSwipeBtn,
            autoplay : this.props.autoplay,
            autoplayTimeout : this.props.autoplayTimeout,
            arrSwipeData: this.props.swipeData,
            currentSelectIndex:
                this.props.currentSelectIndex < this.props.swipeData.length
                    ? this.props.currentSelectIndex
                    : this.props.swipeData.length - 1,
            childViewHeight: height,
        };

        this.viewabilityConfig = { viewAreaCoveragePercentThreshold: 50 };
    }

    
    componentWillReceiveProps (nextProps) {
        clearTimeout(autoplayTimer)
    }

    componentDidMount = () => {
        if (this.swiper) {
            this.swiper.scrollToIndex({
                animated: false,
                index: this.state.currentSelectIndex,
            });

            this.autoplay()
        }
    };

    // OnPress Methods

    _onPressNextBtn = () => {
        if (this.state.currentSelectIndex < this.state.arrSwipeData.length - 1) {
            this.swiper.scrollToIndex({
                index: this.state.currentSelectIndex + 1,
                animated: true,
            });
            this.autoplay()
        }
    };

    _onPressBackBtn = () => {
        if (this.state.currentSelectIndex != 0) {
            this.swiper.scrollToIndex({
                index: this.state.currentSelectIndex - 1,
                animated: true,
            });
            this.autoplay()
        }
    };

    onViewableItemsChanged = ({ viewableItems, changed }) => {
        if (viewableItems && viewableItems.length > 0) {
            this.props.onScreenChange(viewableItems[0].index);
            this.setState({
                currentSelectIndex: viewableItems[0].index,
            });
            let that = this;
            // setTimeout(function(){
            //     if (that.state.currentSelectIndex < that.state.arrSwipeData.length - 1) {
            //         that.swiper.scrollToIndex({
            //             index: that.state.currentSelectIndex + 1,
            //             animated: true,
            //         });
            //     }
            // }, 5000);
            
        }
    };

    autoplay = () => {
        if(this.state.autoplay){
            clearInterval(this._interval)
            this._interval = setInterval(() => {
                this._onPressNextBtn()
            }, this.props.autoplayTimeout * 1000);
        }
        
    }

    getItemLayout = (data, index) => ({
        length: this.props.containerWidth,
        offset: this.props.containerWidth * index,
        index,
    });

    onViewLayout = event => {
        let contentHeight = event.nativeEvent.layout.height;
        this.setState({ childViewHeight: contentHeight });
    };

    // Render Methods.

    renderItem = ({ item, index }) => {
        return (
            <View
                style={[
                    {
                        width: this.props.containerWidth,
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: this.state.arrSwipeData[index],
                    },
                ]}
                onLayout={this.onViewLayout}
            >
                {this.props.renderSwipeItem ? this.props.renderSwipeItem(item, index) : <Text>{index}</Text>}
            </View>
        );
    };

    render() {
        return (
            <View style={[this.props.style, { width: this.props.containerWidth }]}>
                <FlatList
                    ref={flatList => {
                        this.swiper = flatList;
                    }}
                    scrollEnabled={true}
                    backgroundColor={this.props.backgroundColor}
                    data={this.state.arrSwipeData}
                    extraData={this.state}
                    keyExtractor={index => index}
                    renderItem={this.renderItem}
                    onViewableItemsChanged={this.onViewableItemsChanged}
                    viewabilityConfig={this.viewabilityConfig}
                    getItemLayout={this.getItemLayout}
                    horizontal
                    directionalLockEnabled
                    pagingEnabled
                    overScrollMode="never"
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                />

                {this.state.currentSelectIndex > 0 && this.state.showSwipeBtn ? (
                    <View style={[styles.IconStyle, { left: 15, height: this.state.childViewHeight }]}>
                        <View style={styles.viewBtn}>
                            <TouchableWithoutFeedback onPress={this._onPressBackBtn}>
                                <Image style={styles.IconImageView} source={this.props.leftButtonImage} />
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                ) : null}

                {this.state.currentSelectIndex < this.state.arrSwipeData.length - 1 && this.state.showSwipeBtn ? (
                    <View style={[styles.IconStyle, { right: 15, height: this.state.childViewHeight }]}>
                        <View style={styles.viewBtn}>
                            <TouchableWithoutFeedback onPress={this._onPressNextBtn}>
                                <Image style={styles.IconImageView} source={this.props.rightButtonImage} />
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                ) : null}
            </View>
        );
    }
}

Swiper.propTypes = {
    swipeData: PropTypes.array.isRequired,
    renderSwipeItem: PropTypes.func.isRequired,
    leftButtonImage: PropTypes.any,
    rightButtonImage: PropTypes.any,
    showSwipeBtn: PropTypes.bool,
    autoplay: PropTypes.bool,
    autoplayTimeout: PropTypes.number,
    currentSelectIndex: PropTypes.number,
    containerWidth: PropTypes.number,
    style: PropTypes.object,
    onScreenChange: PropTypes.func,
    backgroundColor: PropTypes.string,
};

Swiper.defaultProps = {
    swipeData: ["green", "yellow", "red", "pink", "blue"],
    leftButtonImage: leftArrow,
    rightButtonImage: rightArrow,
    showSwipeBtn: true,
    autoplayTimeout:5000,
    currentSelectIndex: 0,
    autoplay: false,
    containerWidth: width,
    style: { flex: 1, backgroundColor: "white" },
    onScreenChange: () => {},
    backgroundColor: "white",
};

export default Swiper;

const styles = StyleSheet.create({
    swiper: {
        flex: 1,
    },
    flexOne: {
        flex: 1,
        backgroundColor: "white",
    },
    IconStyle: {
        position: "absolute",
        backgroundColor: "transparent",
        justifyContent: "center",
        top: -8,
    },
    IconImageView: {
        width: 40,
        height: 40,
    },
    viewBtn: {
        height: 60,
        width: 60,
        borderRadius: 60 / 2,
        backgroundColor: "white",
        opacity: 0.3,
        justifyContent: "center",
        alignItems: "center",
    },
    swipeBtnStyle: { fontSize: 50, color: "white", justifyContent: "center" },
});
