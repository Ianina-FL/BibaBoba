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

import { update, fetch } from '../../stores/dishes_ordered/dishes_orderedSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

const EditDishes_ordered = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    order: '',

    dish: '',

    quantity: '',
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { dishes_ordered } = useAppSelector((state) => state.dishes_ordered);

  const { dishes_orderedId } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: dishes_orderedId }));
  }, [dishes_orderedId]);

  useEffect(() => {
    if (typeof dishes_ordered === 'object') {
      setInitialValues(dishes_ordered);
    }
  }, [dishes_ordered]);

  useEffect(() => {
    if (typeof dishes_ordered === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = dishes_ordered[el] || ''),
      );

      setInitialValues(newInitialVal);
    }
  }, [dishes_ordered]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: dishes_orderedId, data }));
    await router.push('/dishes_ordered/dishes_ordered-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit dishes_ordered')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit dishes_ordered'}
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
              <FormField label='Order' labelFor='order'>
                <Field
                  name='order'
                  id='order'
                  component={SelectField}
                  options={initialValues.order}
                  itemRef={'orders'}
                  showField={'order_received'}
                ></Field>
              </FormField>

              <FormField label='Dish' labelFor='dish'>
                <Field
                  name='dish'
                  id='dish'
                  component={SelectField}
                  options={initialValues.dish}
                  itemRef={'dishes'}
                  showField={'name'}
                ></Field>
              </FormField>

              <FormField label='Quantity'>
                <Field type='number' name='quantity' placeholder='Quantity' />
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
                    router.push('/dishes_ordered/dishes_ordered-list')
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

EditDishes_ordered.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_DISHES_ORDERED'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditDishes_ordered;
