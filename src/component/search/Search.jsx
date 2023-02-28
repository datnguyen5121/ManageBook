import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import "./Search.scss";
import { useDispatch } from "react-redux";
import { doSearch } from "../../redux/action/bookAction";
const Search = (props) => {
  const dispatch = useDispatch();
  const { valueText, setValueText } = props;
  const handleSearch = () => {
    props.handleBtnSearch();
  };
  return (
    <>
      <div className="search-content">
        <input
          placeholder="Bạn muốn tìm cuốn sách nào ?"
          value={valueText}
          onChange={(event) => setValueText(event.target.value)}
        ></input>
        <div className="btn-search" onClick={handleSearch}>
          <BsSearch />
        </div>
      </div>
    </>
  );
};
export default Search;
