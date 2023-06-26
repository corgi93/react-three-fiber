import React, { useEffect, useState } from "react";

export default function Box({createBoxStyle}) {
  const [style, setStyle] = useState({});

  useEffect(() => {
    console.log("box키우기");
    setStyle(createBoxStyle());
  }, [createBoxStyle]);

  return <div style={style}>Box</div>;
}
