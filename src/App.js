import "./App.css";
import Paginate from "react-paginate";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [items, setItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);

  let limit = 12;

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(
        `http://localhost:3000/posts?_page=1&_limit=${limit}`
      );
      const data = await res.json();
      const total = res.headers.get("x-total-count");
      setPageCount(Math.ceil(total / 12));
      setItems(data);
    };
    getData();
  }, []);

  const fetchData = async (pages) => {
    const res = await fetch(
      `http://localhost:3000/posts?_page=${pages}&_limit=${limit}`
    );
    const data = await res.json();
    return data;
  };

  const handlePageClick = async (data) => {
    let currentPage = data.selected + 1;
    let postFromServer = await fetchData(currentPage);
    setItems(postFromServer);
  };

  return (
    <div className="container">
      <div className="row-m-2">
        {items.map((item, index) => {
          return (
            <div className="col-sm-6 col-md-4 my-2" key={index}>
              <div className="card shadow-sm w-100 " style={{ minHeight: 225 }}>
                <div className="card-body">
                  <h5 className="card-title text-center h2">ID : {item.id} </h5>
                  <h5 className="card-title text-center h2">
                    Name : {item.name}
                  </h5>
                  <h6 className="card-subtitle mb-2 text-muted text-center">
                    {item.email}
                  </h6>
                  <p className="card-text">{item.adderss}</p>
                </div>
              </div>
            </div>
          );
        })}
        <Paginate
          previousLabel={"previous"}
          nextLabel={"next"}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName={"pagination justify-content-center"} //css class name
          pageClassName={"page-item"} //classname for each pages
          pageLinkClassName={"page-link"} //classname for a tag
          previousClassName={"page-item"} // previous button
          previousLinkClassName={"page-link"} // previous button
          nextClassName={"page-item"} // next button
          nextLinkClassName={"page-link"} // next button
          breakClassName={"page-item"} // break button
          breakLinkClassName={"page-link"} // break button
          activeClassName={"active"}
        />
      </div>
    </div>
  );
}

export default App;

// `https://jsonplaceholder.typicode.com/posts?_page=1&_limit=${limit}`
//   `https://jsonplaceholder.typicode.com/posts?_page=${pages}&_limit=${limit}`
