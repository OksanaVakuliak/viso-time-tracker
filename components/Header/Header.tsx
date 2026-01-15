"use client";

import { Layout, Menu } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import css from "./Header.module.css";

const { Header: AntHeader } = Layout;

export default function Header() {
  const pathname = usePathname();

  const menuItems = [
    {
      key: "/",
      label: <Link href="/">Home</Link>,
    },
    {
      key: "/add",
      label: <Link href="/add">Add Entry</Link>,
    },
    {
      key: "/history",
      label: <Link href="/history">History</Link>,
    },
  ];

  const selectedKey = pathname === "/" ? "/" : `/${pathname.split("/")[1]}`;

  return (
    <AntHeader className={css.header}>
      <Link href="/" className={css.logo}>
        VISO Tracker
      </Link>
      <Menu
        mode="horizontal"
        selectedKeys={[selectedKey]}
        items={menuItems}
        className={css.menu}
      />
    </AntHeader>
  );
}
