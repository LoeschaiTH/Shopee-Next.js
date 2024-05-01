"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { Col, Row , Space, Button } from "antd";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import Rating from "@mui/material/Rating";
import React from "react";

function ShowProduct({ params }) {
  const [product, setProduct] = useState(null);
  const id = params.id;
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  useEffect(() => {
    console.log("ID P", id);
    if (id) {
      axios
        .get(`https://dummyjson.com/products/${id}`)
        .then((response) => {
          setProduct(response.data);
        })
        .catch((error) => {
          console.error("Error fetching product:", error);
        });
    }
  }, [id]);

  const labels = {
    0.5: "Useless",
    1: "Useless+",
    1.5: "Poor",
    2: "Poor+",
    2.5: "Ok",
    3: "Ok+",
    3.5: "Good",
    4: "Good+",
    4.5: "Excellent",
    5: "Excellent+",
  };
  return (
    <div>
      {product ? (
        <div className=" flex justify-center">
          <div className="w-[1200px] h-[800px]  bg-white flex flex-row  overflow-hidden border border-gray-300 my-10 ">
            <div
              className="w-[700px] h-[600px] bg-white border border-gray-300"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <img
                src={product.images[0]}
                alt={product.title}
                style={{ maxWidth: "100%", maxHeight: "500px" }}
              />

              <div className=" mt-6">
                <Row gutter={[8, 8]}>
                  {product.images.map((img) => (
                    <Space>
                      <Col span={4} key={img}>
                        <img
                          src={img}
                          alt={`Product Image ${img}`}
                          style={{ maxWidth: "120px", maxHeight: "50px" }}
                        />
                      </Col>
                    </Space>
                  ))}
                </Row>
              </div>
            </div>

            <div className=" my-7 mx-5">
              <h1>{product.title}</h1>
              <p>{product.description}</p>
              <Box
                sx={{
                  width: 200,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Rating
                  name="hover-feedback"
                  value={product.rating}
                  precision={0.5}
                  size="small"
                  emptyIcon={
                    <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                  }
                />
                <Box
                  sx={{
                    ml: 1,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <h2 className="text-xs ">
                    {labels[Math.round(product.rating * 2) / 2]}
                  </h2>
                </Box>
              </Box>
              <h1 className=" text-sm">&nbsp;{`(${product.rating})`}</h1>
              <div className="flex flex-row ">
                <h2 className="my-2 text-xl text-orange-600">
                  $
                  {(
                    (product.price * (100 - product.discountPercentage)) /
                    100
                  ).toFixed(0)}
                  <span
                    className="mx-1"
                    style={{ textDecoration: "line-through" }}
                  >
                    &nbsp;
                  </span>
                </h2>

                <h2 className="my-2 text-gray-400 text-base">
                  <span style={{ textDecoration: "line-through" }}>
                    ${product.price}
                  </span>
                  <span
                    className="mx-1"
                    style={{ textDecoration: "line-through" }}
                  >
                    &nbsp;
                  </span>
                </h2>
                <h2 className="text-orange-600 relative top-[-5px] border p-1 bg-orange-100 rounded-lg text-xs h-6 mt-4">
                  <span>-{product.discountPercentage}%</span>
                </h2>
                <div></div>
              </div>
              <h2 className="text-orange-600 relative top-[-5px] border p-1 bg-orange-100 rounded-lg text-xs h-6 mt-4 w-24">
                  <span>ส่วนลด 10 บาท</span>
                </h2>
                <h2 className="text-orange-600 relative top-[-5px] border p-1 bg-orange-100 rounded-lg text-xs h-6 mt-4 w-24">
                  <span>ส่วนลด 20 บาท</span>
                </h2>
                <h2 className="text-orange-600 relative top-[-5px] border p-1 bg-orange-100 rounded-lg text-xs h-6 mt-4 w-24">
                  <span>ส่วนลด 5 %</span>
                </h2>
              <div className="flex mt-10">
                <Button onClick={decrement}>-</Button>
                <div
                  className="border  border-gray-300 rounded-md  w-8 h-8 flex justify-center items-center"
                >
                  <span>{count}</span>
                </div>
                <Button onClick={increment}>+</Button>
              </div>
              <Space className="mt-6">
                <Button >เพิ่มไปยังรถเข็น</Button>
              <Button>สั่งซื้อสินค้า</Button>
              </Space>
              
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default ShowProduct;
