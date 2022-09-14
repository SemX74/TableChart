import { FC, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addData, sortByName, sortByNameDown } from "../App/DataSlice";
import { useAppDispatch, useAppSelector } from "../Hooks/useRedux";
import Find from "../Misc/Icon.svg";
import { useGetDataListQuery } from "../Services/FetchData";
import { IList } from "../Services/Interfaces";
import "../Style/Style.css";
interface ListPageProps {}

const ListPage: FC<ListPageProps> = () => {
  const [fetched, setFetched] = useState<IList[]>([]);
  const [sortedName, setSortedName] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const { data, isLoading, isError } = useGetDataListQuery("");

  useEffect(() => {
    data && setFetched(data);
  }, [data]);

  const sortByName = () => {
    let sortedPosts = [...fetched];
    if (sortedName) {
      sortedPosts.sort((a, b) => b.name.localeCompare(a.name));
    } else {
      sortedPosts.sort((a, b) => a.name.localeCompare(b.name));
    }
    setFetched(sortedPosts);
    setSortedName((prev) => !prev);
  };

  const sortByState = () => {
    let sortedPosts = [...fetched];
    if (sortedName) {
      sortedPosts.sort((x, y) => {
        if (x.isActive === y.isActive) return 0;
        if (x.isActive) return -1;
        return 1;
      });
    } else {
      sortedPosts.sort((x, y) => {
        if (x.isActive === y.isActive) return 0;
        if (x.isActive) return 1;
        return -1;
      });
    }
    setFetched(sortedPosts);
    setSortedName((prev) => !prev);
  };

  const sortById = () => {
    let sortedPosts = [...fetched];
    if (sortedName) {
      sortedPosts.sort((a, b) => b._id.localeCompare(a._id));
    } else {
      sortedPosts.sort((a, b) => a._id.localeCompare(b._id));
    }
    setFetched(sortedPosts);
    setSortedName((prev) => !prev);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearchValue(e.target.value);

  const newData = fetched.filter((el) => {
    if (searchValue === "") {
      return el;
    } else {
      return el.name.toLowerCase().includes(searchValue.toLowerCase());
    }
  });
  const navigate = useNavigate();
  return (
    <div className="App">
      <div className="App_wrapper">
        <div className="input_wrapper">
          <input
            onChange={handleChange}
            value={searchValue}
            placeholder="Search"
            className="search"
            type="search"
          />
          <img src={Find} alt="" />
        </div>
        <ul>
          <li className="title row">
            <div className="nameCell cell">
              <span onClick={sortByName}>Name</span>
            </div>
            <div className="dateCell cell">
              <span onClick={sortById}>ID</span>
            </div>
            <div className="stateCell cell">
              <span onClick={sortByState}>State</span>
            </div>
          </li>

          {isError && <h1>Error!</h1>}
          {isLoading && <p style={{ textAlign: "center" }}>Loading...</p>}
          {fetched &&
            newData.map((el) => (
              <li className="row"  onClick={() => navigate(`chart/${el.id}`)}>
                <div className="nameTableCell nameCell cell ">
                  <span>{el.name}</span>
                </div>
                <div className="dateTableCell dateCell cell ">
                  <span>{el._id}</span>
                </div>
                <div className="stateTableCell stateCell cell">
                  {el.isActive ? (
                    <span>Active</span>
                  ) : (
                    <span className="red">Disable</span>
                  )}
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default ListPage;
