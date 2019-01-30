

### React Native custom swiper using Flatlist

### Use images or custom views for swiping, let's follow [this blog](https://www.logisticinfotech.com/blog/react-native-custom-swiper/) to use this library.
.

# Guide

# Installation
```
npm i react-native-custom-swiper
```

# Usage
```
import Swiper from "react-native-custom-swiper";

<Swiper
    style={{ flex: 1 }}
    currentSelectIndex={0}
    swipeData={this.state.imgArray}
    renderSwipeItem={this.renderImageSwipeItem}
    onScreenChange={this.screenChange}
/>

```



# Example:
### Write below code inside App.js File.

```
constructor(props) {
    super(props);
    this.state = {
        imgArray: [
                require("./src/Resource/Images/bridge.jpg"),
                require("./src/Resource/Images/Hill.jpg"),
                require("./src/Resource/Images/animal.jpg"),
        ],
        currentIndex: 0,
    };
}

// Handled swipe position change
screenChange = index => {
    console.log("index when change :=> \n", index);
    this.setState({ currentIndex: index });
};

// Render Rows
renderImageSwipeItem = item => {
    return (
        <View>
            <Image style={{ height: 340, width: width }} source={item}  resizeMode="contain" />
        </View>
    );
};


render() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={{ width: width, height: height }}>
                <View style={{ backgroundColor: "rgb(221,244,253)", width: width }}>
                    <Text
                        style={{ marginTop: 60, fontWeight: "bold", textAlign: "center", fontSize: 26, color: "black" }}
                    >
                        RN Custom Swiper
                    </Text>
                    <Text
                        style={{ marginTop: 5, textAlign: "center", fontSize: 23, fontStyle: "italic", color: "black" }}
                    >
                        Current Index : {this.state.currentIndex}
                    </Text>
                </View>
                <Swiper
                    currentSelectIndex={0}
                    backgroundColor="rgb(221,244,253)"
                    swipeData={this.state.imgArray}
                    renderSwipeItem={this.renderImageSwipeItem}
                    onScreenChange={this.screenChange}
                />
        </SafeAreaView>
    );
}

```
### You can see output Below

# Results:
![](RNCustomSwiper.gif)


### Properties

#### Basic

| Prop               |                          Default                          |    Type    | Description                                     |
| :----------------- | :-------------------------------------------------------: | :--------: | :---------------------------------------------- |
| swipeData          |                            []                             |  `array`   | Array of data which user want to show in swiper |
| renderSwipeItem    |                          ()=>{}                           | `function` | Create element of swiper                        |
| currentSelectIndex |                             0                             |  `number`  | Index of initial screen.                        |
| showSwipeBtn       |                           true                            |   `bool`   | For hide or show left/right button              |
| style              |                       Default style                       |  `object`  | Change swiper style                             |
| onScreenChange     |                       (index) => {}                       |   `func`   | Function call when screen changed               |
| leftButtonImage    |  Default left Arrow source {required("leftArrowString")}  |  `string`  | Modify left arrow image                         |
| rightButtonImage   | Default right Arrow source {required("rightArrowString")} |  `string`  | Modify right arrow image                        |
| containerWidth     |                       Screen width                        |  `number`  | Customize swiper screen width                   |
| backgroundColor    |                          "white"                          |  `string`  | Customize swiper background color               |


