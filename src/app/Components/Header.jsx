import React from "react";
import Link from "next/link";
import { Space } from "antd";
import "../globals.css";

function Header() {
  return (
    < >
    <div className=" header h-24">
        <div className="logo">
        <img className="pl-16" src="https://freelogopng.com/images/all_img/1656181621shopee-logo-white.png" alt="Shopee Logo" />
      </div>
      <div className="search-bar ">
        <input type="text" placeholder="ค้นหาสินค้า, แบรนด์ หรือชื่อร้าน" />
        <button>ค้นหา</button>
      </div>
      <nav className="">
        <ul>
          <Space >
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
