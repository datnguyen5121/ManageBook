import { useState, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import "./Search.scss";
import { useDispatch } from "react-redux";
import { doSearch } from "../../redux/action/bookAction";
import * as React from "react";
import { useSearchParams } from "react-router-dom";
const Search = (props) => {
  const dispatch = useDispatch();
  // const { valueText, setValueText } = props;
  const [valueText, setValueText] = useState("");
  let [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("keyword");
  useEffect(() => {
    console.log("dat");
  }, [keyword]);
  // const handleSearch = () => {
  //   props.handleBtnSearch();
  // };
  const handleSearch = (event) => {
    event.preventDefault();
    searchParams.set("keyword", event.target.value);
    setSearchParams(searchParams);
    setValueText(event.target.value);
    dispatch(doSearch(event.target.value));
  };

  return (
    <>
      <div className="search-content">
        <input
          placeholder="Bạn muốn tìm cuốn sách nào ?"
          value={valueText}
          onChange={(event) => handleSearch(event)}
        ></input>
        <div className="btn-search" onClick={handleSearch}>
          <BsSearch />
        </div>
      </div>
    </>
  );
};
export default Search;
