import { FC, useEffect, useMemo, useState } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { getConstructorItems } from '../../services/slices/constructorSlice';
import {
  createAndSubmitOrder,
  getIsOrderLoading,
  getOrder
} from '../../services/slices/orderSlice';
import { getUser } from '../../services/slices/userSlice';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch();

  const constructorItems = useSelector(getConstructorItems);

  const orderRequest = useSelector(getIsOrderLoading);

  const orderModalData = useSelector(getOrder);

  const user = useSelector(getUser);

  const navigate = useNavigate();

  useEffect(() => {
    if (orderModalData) {
      setIsModalOpen(true);
    }
  }, [orderModalData]);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!user) {
      navigate('/login');
      return;
    } else {
      dispatch(createAndSubmitOrder(constructorItems));
    }
  };
  const closeOrderModal = () => {
    setIsModalOpen(false);
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={isModalOpen ? orderModalData : null}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
