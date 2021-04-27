import React from "react";
import _ from "lodash";
import Close from "./Close";

export default function StatesList(props) {
  return (
    <ul className="list">
      {_.map(props.filteredList, (element, index) => {
        return (
          <li
            className={index % 2 === 0 ? "element_one" : "element_two"}
            key={element.key}
          >
            <img
              className="list_image"
              src="https://picsum.photos/200"
              alt="state"
              onClick={() => props.toMap(element.name)}
            />
            <table cellSpacing="10px">
              <tr className="fields">
                <td>ID</td>
                <td>Hierarchy</td>
                <td>Name</td>
                <td>Score</td>
              </tr>
              <tr>
                <td>{element.id + " "}</td>
                <td>{element.hierarchy + " "}</td>
                <td>{element.name + " "}</td>
                <td>{_.round(element.score, 2) + " "}</td>
              </tr>
            </table>
            <Close element={element} elementDeletion={props.elementDeletion} />
          </li>
        );
      })}
    </ul>
  );
}
