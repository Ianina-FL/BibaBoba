import { mdiChartTimelineVariant, mdiUpload } from '@mdi/js';
import Head from 'next/head';
import React, { ReactElement, useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';

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
import { SelectField } from '../../components/SelectField';
import { SelectFieldMany } from '../../components/SelectFieldMany';
import { SwitchField } from '../../components/SwitchField';
import { RichTextField } from '../../components/RichTextField';

import {
  update,
  fetch,
} from '../../stores/client_addresses/client_addressesSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

const EditClient_addresses = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    client: '',

    street: '',

    house_number: '',

    code: '',

    flat_number: '',
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { client_addresses } = useAppSelector(
    (state) => state.client_addresses,
  );

  const { client_addressesId } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: client_addressesId }));
  }, [client_addressesId]);

  useEffect(() => {
    if (typeof client_addresses === 'object') {
      setInitialValues(client_addresses);
    }
  }, [client_addresses]);

  useEffect(() => {
    if (typeof client_addresses === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = client_addresses[el] || ''),
      );

      setInitialValues(newInitialVal);
    }
  }, [client_addresses]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: client_addressesId, data }));
    await router.push('/client_addresses/client_addresses-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit client_addresses')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit client_addresses'}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>
              <FormField label='Client' labelFor='client'>
                <Field
                  name='client'
                  id='client'
                  component={SelectField}
                  options={initialValues.client}
                  itemRef={'clients'}
                  showField={'name'}
                ></Field>
              </FormField>

              <FormField label='Street'>
                <Field name='street' placeholder='Street' />
              </FormField>

              <FormField label='HouseNumber'>
                <Field name='house_number' placeholder='HouseNumber' />
              </FormField>

              <FormField label='Code'>
                <Field name='code' placeholder='Code' />
              </FormField>

              <FormField label='FlatNumber'>
                <Field name='flat_number' placeholder='FlatNumber' />
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
                  onClick={() =>
                    router.push('/client_addresses/client_addresses-list')
                  }
                />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

EditClient_addresses.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_CLIENT_ADDRESSES'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditClient_addresses;
