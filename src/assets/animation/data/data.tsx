import { AnimationObject } from "lottie-react-native";

export interface OnboardingData {
  id: number;
  animation: AnimationObject;
  text: string;
  textColor: string;
  backgroundColor: string;
  description: string;
}

const data: OnboardingData[] = [
  {
    id: 1,
    animation: require("../../json/Lottie1.json"),
    text: "Find your place",
    textColor: "#1995E3",
    backgroundColor: "#FFFFFF",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc efficitur varius risus et volutpat.",
  },
  {
    id: 2,
    animation: require("../../json/Lottie2.json"),
    text: "Contact us anytime",
    textColor: "#693FE8",
    backgroundColor: "#C2C5FC",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc efficitur varius risus et volutpat.",
  },
  {
    id: 3,
    animation: require("../../json/Lottie3.json"),
    text: "Pick your food",
    textColor: "#0D47A1",
    backgroundColor: "#A9DAFC",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc efficitur varius risus et volutpat.",
  },
];

export default data;
