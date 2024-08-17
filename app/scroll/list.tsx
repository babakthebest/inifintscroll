"use client";
import React, { useEffect, useRef, useState } from "react";
import useSaveSCrollPosition from "./useSaveSCrollPosition";
import { useScrollStore } from "./pageScroll";
import { useRouter } from "next/navigation";
import useSaveScrollPositionV3 from "./savescrollPositionv3";
import axios from "axios";
import { Indie_Flower } from "next/dist/compiled/@next/font/dist/google";
import InifintScroll from "./inifintScroll";

export default function List() {
  const router = useRouter();
  const itemsArray = Array.from(
    { length: 50 },
    (_, index) => `item${index + 1}`
  );

  const fetchdata = async () => {
    const res = await axios.get(
      "https://66c061c4ba6f27ca9a567408.mockapi.io/todos?page=1&limit=10"
    );
    return res.data;
  };
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  useSaveScrollPositionV3("adsPage", scrollContainerRef);
  return (
    <div className='h-full w-full flex'>
      <InifintScroll>
        <div
          ref={scrollContainerRef}
          className='w-[50%] h-[50%] bg-emerald-300 overflow-y-auto  p-4'>
          {itemsArray.map((item) => (
            <div className='w-full flex justify-center p-4 ' key={item}>
              <div className=''>{item}</div>
            </div>
          ))}
        </div>
      </InifintScroll>

      <button onClick={() => router.push("/search")}>go to other page </button>
    </div>
  );
}
