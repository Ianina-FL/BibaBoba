import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/client_addresses/client_addressesSlice';
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

const Client_addressesView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { client_addresses } = useAppSelector(
    (state) => state.client_addresses,
  );

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
        <title>{getPageTitle('View client_addresses')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={removeLastCharacter('View client_addresses')}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Client</p>

            <p>{client_addresses?.client?.name ?? 'No data'}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Street</p>
            <p>{client_addresses?.street}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>HouseNumber</p>
            <p>{client_addresses?.house_number}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Code</p>
            <p>{client_addresses?.code}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>FlatNumber</p>
            <p>{client_addresses?.flat_number}</p>
          </div>

          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() =>
              router.push('/client_addresses/client_addresses-list')
            }
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

Client_addressesView.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'READ_CLIENT_ADDRESSES'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default Client_addressesView;
