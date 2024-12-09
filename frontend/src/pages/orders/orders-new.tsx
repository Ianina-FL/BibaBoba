import {
  mdiAccount,
  mdiChartTimelineVariant,
  mdiMail,
  mdiUpload,
} from '@mdi/js';
import Head from 'next/head';
import React, { ReactElement } from 'react';
import 'react-toastify/dist/ReactToastify.min.css';
import CardBox from '../../components/CardBox';
import LayoutAuthenticated from '../../layouts/Authenticated';
import SectionMain from '../../components/SectionMain';
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton';
import { getPageTitle } from '../../config';

import { Field, Form, Formik } from 'formik';
import FormField from '../../components/FormField';
import BaseDivider from '../../components/BaseDivider';
import BaseButtons from '../../components/BaseButtons';
import BaseButton from '../../components/BaseButton';
import FormCheckRadio from '../../components/FormCheckRadio';
import FormCheckRadioGroup from '../../components/FormCheckRadioGroup';
import FormFilePicker from '../../components/FormFilePicker';
import FormImagePicker from '../../components/FormImagePicker';
import { SwitchField } from '../../components/SwitchField';

import { SelectField } from '../../components/SelectField';
import { SelectFieldMany } from '../../components/SelectFieldMany';
import { RichTextField } from '../../components/RichTextField';

import { create } from '../../stores/orders/ordersSlice';
import { useAppDispatch } from '../../stores/hooks';
import { useRouter } from 'next/router';
import moment from 'moment';

const initialValues = {
  client: '',

  source: '',

  order_received: '',

  order_ready: '',

  order_delivered: '',

  order_rejected: '',

  repeated: false,
};

const OrdersNew = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  // get from url params
  const { dateRangeStart, dateRangeEnd } = router.query;

  const handleSubmit = async (data) => {
    await dispatch(create(data));
    await router.push('/orders/orders-list');
  };
  return (
    <>
      <Head>
        <title>{getPageTitle('New Item')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title='New Item'
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            initialValues={
              dateRangeStart && dateRangeEnd
                ? {
                    ...initialValues,
                    order_received:
                      moment(dateRangeStart).format('YYYY-MM-DDTHH:mm'),
                    order_delivered:
                      moment(dateRangeEnd).format('YYYY-MM-DDTHH:mm'),
                  }
                : initialValues
            }
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>
              <FormField label='Client' labelFor='client'>
                <Field
                  name='client'
                  id='client'
                  component={SelectField}
                  options={[]}
                  itemRef={'clients'}
                ></Field>
              </FormField>

              <FormField label='Source' labelFor='source'>
                <Field
                  name='source'
                  id='source'
                  component={SelectField}
                  options={[]}
                  itemRef={'sources'}
                ></Field>
              </FormField>

              <FormField label='OrderReceived'>
                <Field
                  type='datetime-local'
                  name='order_received'
                  placeholder='OrderReceived'
                />
              </FormField>

              <FormField label='OrderReady'>
                <Field
                  type='datetime-local'
                  name='order_ready'
                  placeholder='OrderReady'
                />
              </FormField>

              <FormField label='OrderDelivered'>
                <Field
                  type='datetime-local'
                  name='order_delivered'
                  placeholder='OrderDelivered'
                />
              </FormField>

              <FormField label='OrderRejected'>
                <Field
                  type='datetime-local'
                  name='order_rejected'
                  placeholder='OrderRejected'
                />
              </FormField>

              <FormField label='Repeated' labelFor='repeated'>
                <Field
                  name='repeated'
                  id='repeated'
                  component={SwitchField}
                ></Field>
              </FormField>

              <BaseDivider />
              <BaseButtons>
                <BaseButton type='submit' color='info' label='Submit' />
                <BaseButton type='reset' color='info' outline label='Reset' />
                <BaseButton
                  type='reset'
                  color='danger'
                  outline
                  label='Cancel'
                  onClick={() => router.push('/orders/orders-list')}
                />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

OrdersNew.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'CREATE_ORDERS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default OrdersNew;
