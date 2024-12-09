import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/sources/sourcesSlice';
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

const SourcesView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { sources } = useAppSelector((state) => state.sources);

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
        <title>{getPageTitle('View sources')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={removeLastCharacter('View sources')}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>SourceName</p>
            <p>{sources?.source_name}</p>
          </div>

          <>
            <p className={'block font-bold mb-2'}>Orders Source</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>OrderReceived</th>

                      <th>OrderReady</th>

                      <th>OrderDelivered</th>

                      <th>OrderRejected</th>

                      <th>Repeated</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sources.orders_source &&
                      Array.isArray(sources.orders_source) &&
                      sources.orders_source.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(`/orders/orders-view/?id=${item.id}`)
                          }
                        >
                          <td data-label='order_received'>
                            {dataFormatter.dateTimeFormatter(
                              item.order_received,
                            )}
                          </td>

                          <td data-label='order_ready'>
                            {dataFormatter.dateTimeFormatter(item.order_ready)}
                          </td>

                          <td data-label='order_delivered'>
                            {dataFormatter.dateTimeFormatter(
                              item.order_delivered,
                            )}
                          </td>

                          <td data-label='order_rejected'>
                            {dataFormatter.dateTimeFormatter(
                              item.order_rejected,
                            )}
                          </td>

                          <td data-label='repeated'>
                            {dataFormatter.booleanFormatter(item.repeated)}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!sources?.orders_source?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() => router.push('/sources/sources-list')}
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

SourcesView.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'READ_SOURCES'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default SourcesView;
