"use client";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { useState, useEffect } from "react";
import { Col, Row, Space, Select } from "antd";
import Link from "next/link";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import Rating from "@mui/material/Rating";

function SearchPage() {
  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword") ?? "1";
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://dummyjson.com/products/search?q=${keyword}`
        );
        setProducts(response.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, [keyword]);

  function truncateTitle(title, maxLength) {
    if (title.length <= maxLength) {
      return title;
    } else {
      const truncatedTitle = title.substring(0, maxLength).trim();
      return truncatedTitle + "...";
    }
  }

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
    <main className="flex">
      {console.log("key", keyword)}
      {console.log("search", products)}
      <div className="my-20 mx-32">
        <Row gutter={[8, 24]}>
          {console.log("data", products)}
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product.id} product={product}>
                <Col span={4}>
                  <Link href={`/ShowProduct/${product.id}`} passHref>
                    <div
                      className="bg-white"
                      style={{ width: "230px", height: "450px" }}
                    >
                      <div className="w-[230px] h-[300px] bg-white flex items-center justify-center overflow-hidden border border-gray-300">
                        <img
                          src={product.thumbnail}
                          alt={product.title}
                          className="object-contain"
                          style={{ maxWidth: "100%", maxHeight: "100%" }}
                        />
                      </div>
                      <div className="flex flex-col justify-center items-center pt-2 ">
                        <h1 className="my-2">
                          {truncateTitle(product.title, 25)}
                        </h1>
                        <div className="flex flex-row ">
                          <h2 className="my-2 text-xl text-orange-600">
                            $
                            {(
                              (product.price *
                                (100 - product.discountPercentage)) /
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
                        </div>
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
                              <StarIcon
                                style={{ opacity: 0.55 }}
                                fontSize="inherit"
                              />
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
                          <h1 className=" text-sm">
                            &nbsp;{`(${product.rating})`}
                          </h1>
                        </Box>
                      </div>
                    </div>
                  </Link>
                </Col>
              </div>
            ))
          ) : (
            <div className=" flex justify-center items-center text-center ml-96  w-96 h-96 ">
              <h2 className=" text-5xl text-orange-600">ไม่พบสินค้า {keyword}</h2>
            </div>
          )}
        </Row>
      </div>
    </main>
  );
}

export default SearchPage;
