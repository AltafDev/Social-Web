"use client";
import { React, useEffect, useState } from "react";
export default function News() {
  const [news, setnews] = useState([]);
  const [article, setarticle] = useState(7);
  console.log(news);

  useEffect(() => {
    fetch("https://saurav.tech/NewsAPI/top-headlines/category/business/us.json")
      .then((res) => res.json())
      .then((data) => setnews(data.articles));
  }, []);

  return (
    <>
      <div className="">
        {news.slice(2, article).map((news) => (
          <div className="  flex gap-4 m-2 bg-white rounded-xl shadow mb-4">
            <a href={news.url} target="blank">
              <img src={news.urlToImage} alt="" className="rounded-xl" />
              <div className="p-2">
                <h3 className="text-start text-xs	font-bold text-black font-sans">
                  {news.author}
                </h3>
                <p className="text-start text-xs text-black font-sans">
                  {news.description}
                </p>
              </div>
            </a>
          </div>
        ))}
        <div className="flex gap-4">
          <button
            onClick={() => {
              setarticle(article + 5);
            }}
          >
            {" "}
            Load more
          </button>
          <button
            onClick={() => {
              setarticle(article - 5);
            }}
          >
            previous{" "}
          </button>
        </div>
      </div>
    </>
  );
}
