"use client";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import useSaveScrollPositionV3 from "./savescrollPositionv3";
import axios from "axios";
import InifintScroll from "./inifintScroll";
import { useListStore } from "./store";
interface Item {
  id: number;
  title: string;
}
export default function List() {
  const router = useRouter();
  ///Inoo tarif kardaim baraye akharin item toy obsever e toye infinitscroll
  const lastItemRef = useRef<HTMLDivElement>(null);

  ///Inoo tarif kardaim baraye div parent e map item ha
  //baraye ma mishe cardwrapper ke position scroll ro save kone
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const { page, mydata, setPage, addMydata } = useListStore();

  const fetchdata = async () => {
    try {
      const res = await axios.get<Item[]>(
        `https://66c061c4ba6f27ca9a567408.mockapi.io/todos?page=${page}&limit=10`
      );
      addMydata(res.data);
      setPage(page + 1);
    } catch (error) {
      console.log(error);
    }
  };
  // console.log("mydata-->", mydata);
  useSaveScrollPositionV3("adsPage", scrollContainerRef);
  return (
    <div className='h-full w-full flex'>
      <InifintScroll fn={fetchdata} data={mydata} lastItemRef={lastItemRef}>
        <div
          ref={scrollContainerRef}
          className='w-[50%] h-[50%] bg-emerald-300 overflow-y-auto  p-4'>
          {mydata.map((item, index) => (
            <div
              ref={index === mydata.length - 1 ? lastItemRef : null}
              className='w-full flex justify-center p-4 '
              key={item.id}>
              <div className=''>{item.title}</div>
            </div>
          ))}
        </div>
      </InifintScroll>

      <button onClick={() => router.push("/search")}>go to other page </button>
    </div>
  );
}
