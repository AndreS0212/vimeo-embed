import vimeo from "../assets/vimeo.svg";
const Search = ({ searchValue, handleSearchChange, handleOnKeyDown }) => {
  return (
    <div className="flex flex-row">
      <img src={vimeo} alt="Vimeo Icon" className="h-[30px] mb-1 " />
      <input
        className="flex mx-3 max-w-[85%] w-[85%] outline-none "
        type="text"
        placeholder={"https://www.vimeo.com/*******"}
        onKeyDown={handleOnKeyDown}
        onChange={handleSearchChange}
        value={searchValue}
      />
    </div>
  );
};

export default Search;
