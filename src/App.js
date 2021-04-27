import "./style.css";
import React, { useState, useEffect } from "react";
import _ from "lodash";
import StatesList from "./States";
import Frame from "./Frame";
import Arrow from "./Arrow";
import loaderImage from "./loading.gif";

export default function App() {
  const [filter, setFilter] = useState("");
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [location, setLocation] = useState({ lat: 0, lng: 0 });
  const [isMapPage, setIsMapPage] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      statesListCall();
    }, 3000);
  }, []);

  const statesListCall = async () => {
    const response = await fetch(
      "https://malachite.datausa.io/api/searchLegacy?dimension=Geography&hierarchy=State&limit=50000"
    );
    const json = await response.json();
    setIsLoading(false);
    setList(json.results);
  };

  const toMapCall = async (stateName) => {
    const response = await fetch(
      "https://maps.googleapis.com/maps/api/geocode/json?address=" +
        stateName +
        "&key=AIzaSyAH6NQKiUkLXBcAYfJLi3zVhqJOHz4iC-8"
    );
    const json = await response.json();
    setIsMapPage(true);
    setIsLoading(false);
    setLocation(json.results[0].geometry.location);
  };

  useEffect(() => {
    if (isMapPage === true) {
      searchCall();
    }
  }, [filter]);

  const searchCall = async () => {
    const response = await fetch(
      "https://maps.googleapis.com/maps/api/geocode/json?address=" +
        filter +
        "&key=AIzaSyAH6NQKiUkLXBcAYfJLi3zVhqJOHz4iC-8"
    );
    const json = await response.json();
    if (!json.results[0]) {
      return;
    }
    setLocation(json.results[0].geometry.location);
  };

  const toMap = (stateName) => {
    setFilter("");
    setList([]);
    setIsLoading(true);
    toMapCall(stateName);
  };

  const backToList = () => {
    setIsMapPage(false);
    setFilter("");
    setIsLoading(true);
    setLocation({ lat: 0, lng: 0 });
    statesListCall();
  };

  const handleChange = (event) => {
    setFilter(event.target.value);
    event.preventDefault();
  };

  const deleteElement = (selectedElement) => {
    const selectedIndex = list.findIndex(
      (element) => element.id === selectedElement.id
    );
    list.splice(selectedIndex, 1);
    setList([...list]);
  };

  const getFilteredList = () => {
    if (!filter) {
      return list;
    } else {
      const newList = _.filter(
        list,
        (listElement) =>
          listElement.id.includes(filter) ||
          listElement.name.includes(filter) ||
          listElement.score.toString().includes(filter)
      );
      return newList;
    }
  };

  const filteredList = getFilteredList();

  return (
    <div className="App">
      <div
        className={isMapPage === true ? "main_container_map" : "main_container"}
      >
        <div
          className={
            isMapPage === true ? "input_container_map" : "input_container"
          }
        >
          <input
            className="input_field"
            type="text"
            placeholder="Search"
            value={filter}
            onChange={handleChange}
          />
        </div>
      </div>
      {isLoading ? (
        <img className="loading_image" src={loaderImage} alt="..." />
      ) : null}
      {isMapPage === true ? (
        <>
          <Arrow backToList={backToList} />
          <Frame center={location} />
        </>
      ) : (
        <StatesList
          elementDeletion={deleteElement}
          filteredList={filteredList}
          toMap={toMap}
        />
      )}
    </div>
  );
}
