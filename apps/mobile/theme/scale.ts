import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
const shortDimension = width < height ? width : height;

const guidelineBaseWidth = 393;

export const scale = (size: number) =>
  Math.round((shortDimension / guidelineBaseWidth) * size);

export const s = scale;
