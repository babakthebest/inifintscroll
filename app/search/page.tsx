import React from "react";
import Search from "./search";

export default function page() {
  return (
    <div className='w-full h-full flex items-center justify-center'>
      <div className='h-[70%] w-[70%] bg-slate-200'>
        <Search />
      </div>
    </div>
  );
}
