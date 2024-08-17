"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function Comp() {
  const [iamgeSrc, setIamgeSrc] = useState<null | string>(null);
  useEffect(() => {
    const fetchImages = async () => {
      const res = await fetch(
        "https://chatimages.storage.iran.liara.space/66461cff4f2ca2676bda762a/1715971430519.jpg"
      );
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setIamgeSrc(url);
      console.log(res);
    };
    fetchImages();
  }, []);
  return (
    <div>
      <Image
        src={iamgeSrc ? iamgeSrc : "./next.svg"}
        width={500}
        height={500}
        alt='hhh'
      />
    </div>
  );
}
