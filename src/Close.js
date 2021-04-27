import React from "react";

export default function Close(props) {
  return (
    <div className="close" onClick={() => props.elementDeletion(props.element)}>
      X
    </div>
  );
}
