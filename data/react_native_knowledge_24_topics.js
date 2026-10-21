import topics from "./react_native_knowledge_24_topics.json";

const topicImages = {
  RN01: require("../assets/images/rn01.png"),
  RN02: require("../assets/images/rn02.png"),
  RN03: require("../assets/images/rn03.png"),
  RN04: require("../assets/images/rn04.png"),
  RN05: require("../assets/images/rn05.png"),
  RN06: require("../assets/images/rn06.png"),
  RN07: require("../assets/images/rn07.png"),
  RN08: require("../assets/images/rn08.png"),
  RN09: require("../assets/images/rn09.png"),
  RN10: require("../assets/images/rn10.png"),
  RN11: require("../assets/images/rn11.png"),
  RN12: require("../assets/images/rn12.png"),
  RN13: require("../assets/images/rn13.png"),
  RN14: require("../assets/images/rn14.png"),
  RN15: require("../assets/images/rn15.png"),
  RN16: require("../assets/images/rn16.png"),
  RN17: require("../assets/images/rn17.png"),
  RN18: require("../assets/images/rn18.png"),
  RN19: require("../assets/images/rn19.png"),
  RN20: require("../assets/images/rn20.png"),
  RN21: require("../assets/images/rn21.png"),
  RN22: require("../assets/images/rn22.png"),
  RN23: require("../assets/images/rn23.png"),
  RN24: require("../assets/images/rn24.png"),
};

const react_native_knowledge_24_topics = topics.map((topic) => ({
  ...topic,
  image: topicImages[topic.id],
}));

export default react_native_knowledge_24_topics;