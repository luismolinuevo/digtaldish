import React from "react";
import { Link } from "react-router-dom";

export default function UserListingCard({
  type,
  title,
  img,
  price,
  id,
  isHovered,
}) {
  const shortTitle = title.slice(0, 16) + "...";

  const negoLink = `/specneglisting/` + id;
  const bidLink = `/specbarterlisting/` + id;
  const barterLink = `/specbidlisting/` + id;

  return (
    <div>
      <Link
        to={`${
          type === "barter"
            ? "/specbarterlisting/" + id
            : type === "bid"
            ? "/specbidlisting/" + id
            : "/specneglisting/" + id
        }`}
      >
        <div className="w-[275px] h-[220px] px-[10px] mb-[20px]">
          {!isHovered ? (
            <div>
              <div
                className="w-[300px] h-[160px] bg-cover bg-no-repeat z-[-1] rounded-[4px]"
                style={{ backgroundImage: `url(${img})` }}
              >
                <div className="flex h-full items-end ">
                  <p className="text-[20px] bg-white m-[15px] p-1">
                    {type == "barter"
                      ? "Barter"
                      : type == "bid"
                      ? "Auction"
                      : "Negotiation"}
                  </p>
                </div>
              </div>
              <div className="flex justify-between text-[25px]">
                <p>{title.length > 16 ? shortTitle : title}</p>
                {type !== "barter" ? <p>${price}</p> : <p></p>}
              </div>
            </div>
          ) : (
            <div className="flex gap-4">
                <button className="bg-white rounded-[57px] border-2 border-[#DAB24E] text-[32px] px-4 py-2">View Post</button>
                <button>Edit Post</button>
                <button>Delete Post</button>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
}
