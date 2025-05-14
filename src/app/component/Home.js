"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Home = () => {
  const [originalData, setOriginalData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchname, setSearchname] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 10;

  const router = useRouter();

  const HandleGetDate = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "https://app.ticketmaster.com/discovery/v2/events?apikey=ZQpAm1jeTmh4lKrx7K8ihYylvLMZdte5"
      );
      const events = res?.data?._embedded?.events || [];
      localStorage.setItem("Alldata", JSON.stringify(events));

      setOriginalData(events);
      setFilteredData(events);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handlepass = (data) => {
    localStorage.setItem("dataid", JSON.stringify(data));
    router.push(`home/${data.id}`);
  };

  const [fromdt, setFromdt] = useState("");
  const [todt, settodt] = useState("");

  const applyFilters = () => {
    const filtered = originalData.filter((event) => {
      const eventDateStr = event.dates?.start?.dateTime;
      const venueName = event._embedded?.venues?.[0]?.name?.toLowerCase() || "";

      const eventDate = eventDateStr
        ? new Date(eventDateStr.split("T")[0])
        : null;
      const fromDate = fromdt ? new Date(fromdt) : null;
      const toDate = todt ? new Date(todt) : null;

      const matchesDate =
        (!fromDate || eventDate >= fromDate) &&
        (!toDate || eventDate <= toDate);

      const matchesName =
        !searchname || venueName.includes(searchname.toLowerCase());

      return matchesDate && matchesName;
    });

    setFilteredData(filtered);
    setCurrentPage(1);
  };

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredData.slice(indexOfFirstEvent, indexOfLastEvent);

  //   useEffect(() => {
  //     HandleGetDate();
  //   }, [searchname, todt, fromdt]);

  useEffect(() => {
    HandleGetDate();
  }, []);

  return (
    <div className="p-4">
      <div className="flex gap-3 mb-4">
        <div>
          <input
            placeholder="Start Date"
            value={fromdt}
            type="date"
            className="border-2 rounded-xl p-1"
            onChange={(e) => setFromdt(e.target.value)}
          />
        </div>
        <div>
          <input
            placeholder="end Date"
            value={todt}
            type="date"
            className="border-2 rounded-xl p-1"
            onChange={(e) => settodt(e.target.value)}
          />
        </div>
        <div>
          <input
            placeholder="Search Venue"
            type="text"
            value={searchname}
            className="border-2 rounded-xl p-1"
            onChange={(e) => setSearchname(e.target.value)}
          />
        </div>
        <button onClick={applyFilters} className="border-2 px-4 rounded">
          Apply Filter
        </button>
      </div>

      <div className="mt-6">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="w-full border-2 text-sm">
            <thead className="border">
              <tr className="">
                <th className="border p-2">Name</th>
                <th className="border p-2">Description</th>
                <th className="border p-2">Date & Time</th>
                <th className="border p-2">Location</th>
                <th className="border p-2">View</th>
              </tr>
            </thead>
            <tbody>
              {currentEvents
                ?.slice()
                .sort(
                  (a, b) =>
                    new Date(a.dates?.start?.dateTime) -
                    new Date(b.dates?.start?.dateTime)
                )
                .map((res, i) => (
                  <tr key={i} className="text-center">
                    <td className="border p-2">{res.name}</td>
                    <td className="border p-2">
                      {res.promoter?.description || "-"}
                    </td>
                    <td className="border p-2">{res.dates?.start?.dateTime}</td>
                    <td className="border p-2">
                      {res._embedded?.venues?.[0]?.name || "-"}
                    </td>
                    <td className="border p-2">
                      <button
                        onClick={() => handlepass(res)}
                        className=" px-3 py-1 "
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              {currentEvents.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-4 text-gray-500">
                    No events found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      <div className="flex gap-2 mt-4 flex-wrap">
        {Array.from({
          length: Math.ceil(filteredData.length / eventsPerPage),
        }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded border
                ${currentPage === i + 1 ? "bg-black text-white" : "bg-gray-200"}
              `}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Home;
