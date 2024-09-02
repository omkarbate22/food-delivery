import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './List.css'

const List = () => {
  const url = "http://localhost:4000";
  const [list, setList] = useState([]);
  const listRef = useRef(null);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      console.log(response.data);

      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Error: Failed to fetch list");
      }
    } catch (error) {
      toast.error("Error: " + error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  useEffect(() => {
    console.log("List state updated:", list);
    
    // Log the rendered structure
    if (listRef.current) {
      console.log("Rendered structure:", listRef.current.outerHTML);
    }
  }, [list]);

  const listContent = (
    <div ref={listRef} className="list add flex-col">
      <p>All Foods</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        
        <div>
          {list.map((item, index) => {
            return (
              <div key={index} className="list-table-format">
                <img src={`${url}/images/${item.image}`} alt="" />
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>${item.price}</p>
                <p>X</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  console.log("JSX Structure:", listContent);

  return listContent;
};

export default List;