import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  clearConstructor,
  getConstructorItems
} from '../../services/slices/constructorSlice';
import {
  clearOrder,
  createAndSubmitOrder,
  getIsOrderLoading,
  getOrder
} from '../../services/slices/orderSlice';
import { getUser } from '../../services/slices/userSlice';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();

  const constructorItems = useSelector(getConstructorItems);

  const orderRequest = useSelector(getIsOrderLoading);

  const orderModalData = useSelector(getOrder);

  const user = useSelector(getUser);

  const navigate = useNavigate();

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
    if (!orderRequest) {
      dispatch(clearConstructor());
      dispatch(clearOrder());
    }
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
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
