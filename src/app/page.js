"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { Col, Row, Space, Select } from "antd";
import Link from "next/link";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import Rating from "@mui/material/Rating";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [value, setValue] = useState("All");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://dummyjson.com/products");
        setProducts(response.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);

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

  const handleChange = (value) => {
    setValue(value);
    console.log(`selected ${value}`);
  };
  // if(searchTerm){

  // }
  // else{
  //   const MapProducts = value === "All" ? products : products.filter((product) => product.category === value);
  // }
  const MapProducts = value === "All" ? products : products.filter((product) => product.category === value);


  return (
    <main className="flex">
      <div className="my-20 ml-14">
        <Select
          defaultValue="All"
          style={{
            width: 120,
          }}
          onChange={handleChange}
          options={[
            {
              value: "All",
              label: "ทั้งหมด",
            },
            {
              value: "smartphones",
              label: "สมาร์ทโฟน",
            },
            {
              value: "home-decoration",
              label: "ของตกแต่งบ้าน",
            },
            {
              value: "fragrances",
              label: "น้ำหอม",
            },
          ]}
        />

        <Row gutter={[8, 24]}>
          {console.log("data", products)}
          {MapProducts.map((product) => (
            <div   key={product.id} product={product}>
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
                          sx={{ ml: 1, display: "flex", alignItems: "center" }}
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
          ))}
        </Row>
      </div>
    </main>
  );
}
