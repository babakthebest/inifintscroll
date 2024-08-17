"use client";
import React, { useMemo, useRef, useState } from "react";

export default function Search() {
  const [items, setItems] = useState<string[]>([]);
  const [query, setQuery] = useState<string>("");
  console.log("rendering");
  const inputRef = useRef<HTMLInputElement>(null);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputRef.current) {
      const value = inputRef.current.value;
      if (value.trim() !== "") {
        setItems([...items, value]);
      }
      inputRef.current.value = ""; // Clear the input after submission
    }
  };
  // const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     const value = e.target.value
  //     setItems((prev) => {
  //         return prev.filter((item) => {
  //             item.toLowerCase().includes(value.toLowerCase())
  //         })
  //     })
  // };
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      return item.toLowerCase().includes(query.toLowerCase());
    });
  }, [items, query]);

  return (
    <div className='p-4'>
      <div className='flex gap-2'>
        <p>search</p>
        <input
          type='search'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <br />
      <div className='flex gap-2'>
        <form onSubmit={handleSubmit}>
          <h1>New Items</h1>
          <input ref={inputRef} type='text' />
          <button type='submit'>Add</button>
        </form>
      </div>
      <br />
      <div className='flex flex-col'>
        {filteredItems.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </div>
    </div>
  );
}
