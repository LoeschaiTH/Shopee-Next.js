"use client";
import React from "react";
import Link from "next/link";
import { Space, Input, Button } from "antd";
import { useState, useEffect } from "react";
import "../globals.css";
import { useRouter } from "next/navigation";

function Header() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  function search(event) {
    setSearchTerm(event.target.value);
    console.log("Searching for:", event.target.value);
  }
  useEffect(() => {
    if (searchTerm) {
      setSearchTerm(searchTerm);
    }
  }, [searchTerm]);

  const handleSearch = () => {
    router.push(`/Search/?keyword=${searchTerm}`);
  };

  return (
    <>
      <div className=" header h-24">
        <div className="logo">
          <Link href="/">
            <img
              className="pl-16"
              src="https://freelogopng.com/images/all_img/1656181621shopee-logo-white.png"
              alt="Shopee Logo"
            />
          </Link>
        </div>
        <div className="search-bar ">
          <Space size={1}>
            <Input
              onChange={search}
              type="text"
              placeholder="ค้นหาสินค้า, แบรนด์ หรือชื่อร้าน"
            />
            <Button
              onClick={() => {
                handleSearch();
              }}
              className="h-10"
            >
              ค้นหา
            </Button>
          </Space>
        </div>
        <nav className="">
          <ul>
            <Space>
              <li>
                <Link href="/">หน้าแรก</Link>
              </li>
              <li>
                <Link href="/products">สินค้า</Link>
              </li>
              <li>
                <Link href="/promotions">โปรโมชั่น</Link>
              </li>
              <li>
                <Link href="/stores">ร้านค้า</Link>
              </li>
              <li>
                <Link href="/Cart">ตะกร้า</Link>
              </li>
            </Space>
          </ul>
        </nav>
        <div className="user">
          <Link href="/login">เข้าสู่ระบบ</Link>
          <Link href="/register">สมัครสมาชิก</Link>
        </div>
      </div>
    </>
  );
}

export default Header;
