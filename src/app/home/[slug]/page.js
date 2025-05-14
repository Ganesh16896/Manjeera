"use client";
import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";

const Page = () => {
  //   const searchParams = useSearchParams();
  //   const search = searchParams.get("id");
  //   console.log(search);

  const getdata = useParams("dataid");

  console.log(getdata.slug);

  //   const getdata = JSON.parse(localStorage.getItem("dataid"));
  const alldata = JSON.parse(localStorage.getItem("Alldata"));

  const fliterdate = alldata.filter((res) => res.id === getdata.slug);

  console.log(fliterdate);

  return (
    <div>
      <div className="p-10 ">
        <div className="p-2 border-2">
          <p>{`name : ${fliterdate[0]?.name}`}</p>
          <p>{`Description : ${fliterdate[0]?.promoter?.description}`}</p>
          <p>{`date & time : ${
            fliterdate[0]?.dates?.start?.dateTim || "---"
          }`}</p>
          <p>{`location : ${fliterdate[0]?._embedded?.venues[0]?.name}`}</p>
        </div>
      </div>
    </div>
  );
};

export default Page;
