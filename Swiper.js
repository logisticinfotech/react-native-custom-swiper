import React from "react";
import { View, TouchableWithoutFeedback, FlatList, Dimensions, StyleSheet, Image, Text } from "react-native";

import PropTypes from "prop-types";

const { width, height } = Dimensions.get("window");

const leftArrow = require("./resource/leftIcon.png");
const rightArrow = require("./resource/rightIcon.png");

class Swiper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showSwipeBtn: this.props.showSwipeBtn,
            arrSwipeData: this.props.swipeData,
            currentSelectIndex:
                this.props.currentSelectIndex < this.props.swipeData.length
                    ? this.props.currentSelectIndex
                    : this.props.swipeData.length - 1,
            childViewHeight: height,
        };

        this.viewabilityConfig = { viewAreaCoveragePercentThreshold: 50 };
    }

    componentDidMount = () => {
        if (this.swiper) {
            this.swiper.scrollToIndex({
                animated: false,
                index: this.state.currentSelectIndex,
            });
        }
    };

    // OnPress Methods

    _onPressNextBtn = () => {
        if (this.state.currentSelectIndex < this.state.arrSwipeData.length - 1) {
            this.swiper.scrollToIndex({
                index: this.state.currentSelectIndex + 1,
                animated: true,
            });
        }
    };
    
    _onPressBackBtn = () => {
        if (this.state.currentSelectIndex != 0) {
            this.swiper.scrollToIndex({
                index: this.state.currentSelectIndex - 1,
                animated: true,
            });
        }
    };

    onViewableItemsChanged = ({ viewableItems, changed }) => {
        if (viewableItems && viewableItems.length > 0) {
            this.props.onScreenChange(viewableItems[0].index);
            this.setState({
                currentSelectIndex: viewableItems[0].index,
            });
        }
    };

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
                        <TouchableWithoutFeedback onPress={this._onPressBackBtn}>
                            <Image style={styles.IconImageView} source={this.props.leftButtonImage} />
                        </TouchableWithoutFeedback>
                    </View>
                ) : null}

                {this.state.currentSelectIndex < this.state.arrSwipeData.length - 1 && this.state.showSwipeBtn ? (
                    <View style={[styles.IconStyle, { right: 15, height: this.state.childViewHeight }]}>
                        <TouchableWithoutFeedback onPress={this._onPressNextBtn}>
                            <Image style={styles.IconImageView} source={this.props.rightButtonImage} />
                        </TouchableWithoutFeedback>
                    </View>
                ) : null}
            </View>
        );
    }
}

Swiper.propTypes = {
    swipeData: PropTypes.array.isRequired,
    renderSwipeItem: PropTypes.func.isRequired,
    leftButtonImage: PropTypes.string,
    rightButtonImage: PropTypes.string,
    showSwipeBtn: PropTypes.bool,
    currentSelectIndex: PropTypes.number,
    containerWidth: PropTypes.number,
    style: PropTypes.object,
    onScreenChange: PropTypes.func,
};

Swiper.defaultProps = {
    swipeData: ["green", "yellow", "red", "pink", "blue"],
    leftButtonImage: leftArrow,
    rightButtonImage: rightArrow,
    showSwipeBtn: true,
    currentSelectIndex: 0,
    containerWidth: width,
    style: { flex: 1 },
    onScreenChange: () => {},
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
        width: 50,
        height: 50,
    },
    swipeBtnStyle: { fontSize: 50, color: "white", justifyContent: "center" },
});
