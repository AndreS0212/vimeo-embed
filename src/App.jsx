import { useState } from "react";
import axios from "axios";
import Search from "./components/Search";
import { useMutation } from "@tanstack/react-query";

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [embedData, setEmbedData] = useState(null);

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  //fetch a la api
  const { mutate, isLoading, isIdle, error, data } = useMutation(
    ["vimeo", searchValue],
    async () => {
      const { data } = await axios.get(
        `https://vimeo.com/api/oembed.json?url=${searchValue}`
      );
      return data;
    },
    {
      onSuccess: (data) => {
        setEmbedData(data);
      },
    }
  );
  //si se apreta enter se hace el fetch
  const handleOnKeyDown = async (e) => {
    if (e.key === "Enter") {
      mutate();
    } else {
      return;
    }
  };

  const parseEmbedHtml = (html, width, height) => {
    return html
      .replace(/width="\d+"/, `width="${width}"`)
      .replace(/height="\d+"/, `height="${height}"`);
  };
  return (
    <div
      className={`${
        isIdle || isLoading
          ? "flex flex-col max-h-[190px]  rounded-xl  bg-white text-black"
          : ` rounded-xl text-white bg-[#141414] h-[240px] `
      } mx-auto my-12 p-4 max-w-[390px]   shadow-2xl rounded-3x `}
    >
      {isLoading ? (
        <p className="text-black text-center">Loading...</p>
      ) : error ? (
        <div className="flex flex-col items-center justify-center h-full">
          <p className="text-2xl text-center">URL de video incorrecto.</p>
        </div>
      ) : data ? (
        <div>
          <div
            dangerouslySetInnerHTML={{
              __html: parseEmbedHtml(embedData.html, 360, 210),
            }}
          />
        </div>
      ) : (
        <Search
          searchValue={searchValue}
          handleSearchChange={handleSearchChange}
          handleOnKeyDown={handleOnKeyDown}
        />
      )}
    </div>
  );
}

export default App;
