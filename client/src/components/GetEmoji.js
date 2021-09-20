import React from "react";

export default function GetEmoji(props) {
  const choose = (val) => {
    switch (val) {
      case "1":
        return "😡 Very Bad";
      case "2":
        return "🙁 Not Good";
      case "3":
        return "🙂 Average";
      case "4":
        return "😄 Good";
      case "5":
        return "😍 Very Good";
      default:
        return "";
    }
  };

  return (
    <div className="m-2 mapadd">
      <h4>{choose(props.score)}</h4>
    </div>
  );
}
