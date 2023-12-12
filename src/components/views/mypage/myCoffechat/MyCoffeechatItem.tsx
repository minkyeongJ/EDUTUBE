'use client';

import { formatDate } from '@/helper/utils/datetime';
import { MyCoffeechat } from '@/queries/coffeechat/myCoffeechat/useSelectMyCoffeechat';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  data: MyCoffeechat;
}

const MyCoffeechatItem = ({ data }: Props) => {
  const datetimeList = data.extra.datetimeList;
  datetimeList.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const firstDate = formatDate(datetimeList[0].date);
  const lastDate = formatDate(datetimeList[datetimeList.length - 1].date);

  return (
    <Link href={`/mypage/my-coffeechat/${data._id}`}>
      <li className="flex justify-between gap-x-6 py-5 border-b border-solid">
        <div className="flex min-w-0 gap-x-4 ">
          <Image
            className="h-28 w-40 flex-none rounded-md bg-cover"
            src={`https://localhost:443${data.mainImages[0]}`}
            alt=""
            width={80}
            height={80}
            unoptimized={true}
          />
          <div className="min-w-0 flex flex-col justify-between">
            <div>
              <div className="text-xs font-semibold bg-light-main text-white w-fit px-2 py-1 rounded-xl">
                {data.extra.jobCategory}
              </div>
            </div>
            <p className="text-sm font-semibold leading-6 text-gray-900">{data.name}</p>
            <p className="text-sm leading-6 text-gray-900">
              {firstDate} ~ {lastDate}
            </p>
          </div>
        </div>
        <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end justify-between">
          <p className="text-sm leading-6 text-gray-900">
            <span className="font-semibold">{data.price}</span> point
          </p>
          <p className="text-sm font-semibold leading-6 text-gray-900">
            예약 인원 | <span className="text-light-main">{data.buyQuantity}</span> /{data.quantity}
          </p>
        </div>
      </li>
    </Link>
  );
};
export default MyCoffeechatItem;
