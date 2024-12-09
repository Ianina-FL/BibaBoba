import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/ingredients/ingredientsSlice';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';
import LayoutAuthenticated from '../../layouts/Authenticated';
import { getPageTitle } from '../../config';
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton';
import SectionMain from '../../components/SectionMain';
import CardBox from '../../components/CardBox';
import BaseButton from '../../components/BaseButton';
import BaseDivider from '../../components/BaseDivider';
import { mdiChartTimelineVariant } from '@mdi/js';
import { SwitchField } from '../../components/SwitchField';
import FormField from '../../components/FormField';

const IngredientsView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { ingredients } = useAppSelector((state) => state.ingredients);

  const { id } = router.query;

  function removeLastCharacter(str) {
    console.log(str, `str`);
    return str.slice(0, -1);
  }

  useEffect(() => {
    dispatch(fetch({ id }));
  }, [dispatch, id]);

  return (
    <>
      <Head>
        <title>{getPageTitle('View ingredients')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={removeLastCharacter('View ingredients')}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Name</p>
            <p>{ingredients?.name}</p>
          </div>

          <>
            <p className={'block font-bold mb-2'}>
              Dish_ingredients Ingredient 1
            </p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ingredients.dish_ingredients_ingredient_1 &&
                      Array.isArray(
                        ingredients.dish_ingredients_ingredient_1,
                      ) &&
                      ingredients.dish_ingredients_ingredient_1.map(
                        (item: any) => (
                          <tr
                            key={item.id}
                            onClick={() =>
                              router.push(
                                `/dish_ingredients/dish_ingredients-view/?id=${item.id}`,
                              )
                            }
                          >
                            <td data-label='quantity'>{item.quantity}</td>
                          </tr>
                        ),
                      )}
                  </tbody>
                </table>
              </div>
              {!ingredients?.dish_ingredients_ingredient_1?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>
              Dish_ingredients Ingredient 2
            </p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ingredients.dish_ingredients_ingredient_2 &&
                      Array.isArray(
                        ingredients.dish_ingredients_ingredient_2,
                      ) &&
                      ingredients.dish_ingredients_ingredient_2.map(
                        (item: any) => (
                          <tr
                            key={item.id}
                            onClick={() =>
                              router.push(
                                `/dish_ingredients/dish_ingredients-view/?id=${item.id}`,
                              )
                            }
                          >
                            <td data-label='quantity'>{item.quantity}</td>
                          </tr>
                        ),
                      )}
                  </tbody>
                </table>
              </div>
              {!ingredients?.dish_ingredients_ingredient_2?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>
              Dish_ingredients Ingredient 3
            </p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ingredients.dish_ingredients_ingredient_3 &&
                      Array.isArray(
                        ingredients.dish_ingredients_ingredient_3,
                      ) &&
                      ingredients.dish_ingredients_ingredient_3.map(
                        (item: any) => (
                          <tr
                            key={item.id}
                            onClick={() =>
                              router.push(
                                `/dish_ingredients/dish_ingredients-view/?id=${item.id}`,
                              )
                            }
                          >
                            <td data-label='quantity'>{item.quantity}</td>
                          </tr>
                        ),
                      )}
                  </tbody>
                </table>
              </div>
              {!ingredients?.dish_ingredients_ingredient_3?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() => router.push('/ingredients/ingredients-list')}
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

IngredientsView.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'READ_INGREDIENTS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default IngredientsView;
