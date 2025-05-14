"use client";
import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";

const Page = () => {
  //   const searchParams = useSearchParams();
  //   const search = searchParams.get("id");
  //   console.log(search);

  //   const getdata = useParams("dataid");

  //   console.log(getdata.slug);

  const getdata = JSON.parse(localStorage.getItem("dataid"));

  console.log(getdata);

  return (
    <div>
      <div className="p-10 ">
        <div className="p-2 border-2">
          <p>{`name : ${getdata?.name}`}</p>
          <p>{`Description : ${getdata?.promoter?.description}`}</p>
          <p>{`date & time : ${getdata?.dates?.start?.dateTim || "---"}`}</p>
          <p>{`location : ${getdata?._embedded?.venues[0]?.name}`}</p>
        </div>
      </div>
    </div>
  );
};

export default Page;
