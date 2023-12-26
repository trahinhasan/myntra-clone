import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const FetchItems = () => {
  const fetchStatus = useSelector((store) => store.fetchStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    if (fetchStatus.fetchDone) return;

    const controller = new AbortController();
    const signal = controller.signal;

    fetch("http://localhost:8080/items", { signal })
      .then((res) => res.json())
      .then(({ items }) => {
        console.log("items fetched", items);
      });

    return () => {
      controller.abort();
    };
  }, [fetchStatus]);

  return (
    <>
      <div>
        Fetch Done: {fetchStatus.fetchDone}
        currently Fetching: {fetchStatus.currentlyFetching}
      </div>
    </>
  );
};

export default FetchItems;
