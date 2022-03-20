import Head from 'next/head'
import Image from 'next/image'
import React from 'react'
import styles from '../styles/Home.module.css'
import {Button, themePacks, Theme} from "@nexts-stack/desktop-uix";

const theme = new Theme(themePacks.darkTheme);
theme.load();

export default function Home() {
  return (
    <Button>Click Me</Button>
  )
}
