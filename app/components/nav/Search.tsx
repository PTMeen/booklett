import { AiOutlineSearch } from "react-icons/ai";

function Search() {
  return (
    <div className="flex items-center  border-[1px] rounded-full py-2 flex-grow lg:flex-grow-0 gap-3  pl-4 pr-2 justify-between hover:shadow-md transition cursor-pointer">
      <div className="px-2 font-semibold">Any where</div>
      <div className="font-semibold border-x-[1px] flex-grow text-center px-2 hidden sm:block">
        Any week
      </div>
      <div className="flex items-center gap-3 pl-2">
        <p className="hidden text-neutral-600 sm:inline">Add guests</p>
        <div className="flex items-center justify-center p-2 text-white bg-orange-600 rounded-full">
          <AiOutlineSearch size={20} />
        </div>
      </div>
    </div>
  );
}
export default Search;
