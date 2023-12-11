'use client';

import useSelectCart from '@/queries/mypage/cart/useSelectCart';
import CartItem from './CartItem';
import Link from 'next/link';
import { useState } from 'react';

type ItemInfo = {
  product_id: number;
  quantity: 1;
};

type SelectedItem = {
  product_id: number;
  quantity: 1;
};

export type IsSelectedItem = {
  itemInfo: ItemInfo;
  isChecked: boolean;
};
const Cart = () => {
  const { data: cartData } = useSelectCart();
  const [selectedItemList, setSelectedItemList] = useState<SelectedItem[]>([]);

  //상품 체크박스 선택 시 구매 list로 선택/해제하기
  //- CartItem의 checkbox가 선택되면 setSelectedItemList에 추가
  //- CartItem의 checkbox가 취소되면 setSelectedItemList에 제거
  const managingCartItemList = (item: IsSelectedItem) => {
    if (item.isChecked) {
      setSelectedItemList(state => [...state, item.itemInfo]);
    }
    if (!item.isChecked) {
      setSelectedItemList(state =>
        state.filter(acc => acc.product_id !== item.itemInfo.product_id),
      );
    }
  };
  //전체 선택 시 모든 상품 구매 list로 선택하기
  //선택 삭제 클릭 시 장바구니에서 물건 삭제하기
  //'POINT로 결제하기' 클릭 시 결제 진행하기.
  //보유보인트보다 구매포인트가 크면 결제 반려하기.

  return (
    <>
      <section className="w-full border-b border-gray-300">
        <div className="flex justify-between items-end">
          <div>
            <section className="flex gap-2">
              <p>전체 커피챗 개수</p>
              <p className="text-light-main">{cartData?.length}</p>
            </section>
          </div>
          <div>
            <section className="flex gap-2">
              <p>전체 선택</p>
              <p>|</p>
              <p>선택 삭제</p>
            </section>
          </div>
        </div>
      </section>
      <section>
        <ul role="list" className="divide-y divide-gray-100">
          {cartData?.map((item: {}) => (
            <CartItem data={item} managingCartItemList={managingCartItemList} key={item._id} />
          ))}
        </ul>
      </section>
      <section className="w-full pb-40 border-t border-gray-300">
        <div className="flex justify-between items-end mb-2 mt-2">
          <div>
            <section className="flex flex-col gap-2">
              <p>현재 보유 포인트 {} point</p>
              <p className="text-lg">
                총 결제 포인트 <span className="text-light-main">{10000} point</span>
              </p>
            </section>
          </div>
          <div>
            <section className="flex gap-2">
              <div className="w-fit h-fit px-3 py-3 text-white bg-light-main rounded-md hover:bg-dark-main focus:outline-none">
                <Link href={''}>POINT로 결제하기</Link>
              </div>
            </section>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
