import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import "./Search.scss";
const Search = () => {
  const [valueText, setValueText] = useState("");
  const handleBtnSearch = () => {
    console.log(valueText);
  };
  return (
    <>
      <div className="search-content">
        <input
          placeholder="Bạn muốn tìm cuốn sách nào ?"
          value={valueText}
          onChange={(event) => setValueText(event.target.value)}
        ></input>
        <div className="btn-search" onClick={handleBtnSearch}>
          <BsSearch />
        </div>
      </div>
    </>
  );
};
export default Search;
