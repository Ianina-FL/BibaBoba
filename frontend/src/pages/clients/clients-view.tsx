import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/clients/clientsSlice';
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

const ClientsView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { clients } = useAppSelector((state) => state.clients);

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
        <title>{getPageTitle('View clients')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={removeLastCharacter('View clients')}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Name</p>
            <p>{clients?.name}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Phone</p>
            <p>{clients?.phone}</p>
          </div>

          <>
            <p className={'block font-bold mb-2'}>Client_addresses Client</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>Street</th>

                      <th>HouseNumber</th>

                      <th>Code</th>

                      <th>FlatNumber</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clients.client_addresses_client &&
                      Array.isArray(clients.client_addresses_client) &&
                      clients.client_addresses_client.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(
                              `/client_addresses/client_addresses-view/?id=${item.id}`,
                            )
                          }
                        >
                          <td data-label='street'>{item.street}</td>

                          <td data-label='house_number'>{item.house_number}</td>

                          <td data-label='code'>{item.code}</td>

                          <td data-label='flat_number'>{item.flat_number}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!clients?.client_addresses_client?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Orders Client</p>
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
                    {clients.orders_client &&
                      Array.isArray(clients.orders_client) &&
                      clients.orders_client.map((item: any) => (
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
              {!clients?.orders_client?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() => router.push('/clients/clients-list')}
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

ClientsView.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'READ_CLIENTS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default ClientsView;
