import * as React from "react";
import Avatar from "@mui/material/Avatar";

export default function BeepAvatar(props) {

  // const avatarHex = {
  //   A: "#6aff93",
  //   B: "#A2A2F5",
  //   C: "#fafce7",
  //   D: "#1ebf3b",
  //   E: "#efa324",
  //   F: "#d1922b",
  //   G: "#4d588c",
  //   H: "#10384e",
  //   I: "#60f4e9",
  //   J: "#eb51b0",
  //   K: "#e4082b",
  //   L: "#A370D0",
  //   M: "#D096AE",
  //   N: "#8C1955",
  //   O: "#585F5B",
  //   P: "#D96842",
  //   Q: "#9C6066",
  //   R: "#6ECB9D",
  //   S: "#079CD4",
  //   T: "#B6C04D",
  //   U: "#0D40D8",
  //   V: "#ECD55D",
  //   W: "#200A84",
  //   X: "#0E083A",
  //   Y: "#C64853",
  //   Z: "#842E2F",
  // };
  return <Avatar sx={{ bgcolor: props.sx.bgcolor }}>{props.children}</Avatar>;
}
