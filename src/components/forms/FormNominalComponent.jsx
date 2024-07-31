'use client';
import { InputTextComponent } from '@/components/partials/InputComponent';
import { UseTransaction } from '@/hooks/useTransaction';
import { formatRupiah, onlyNumber } from '@/utils/formatNumber';
import { Fieldset } from '@headlessui/react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

export const FormNominalComponent = ({
  nominalField = false,
  quantityField = false,
}) => {
  const {
    campaigns,
    currentNominal,
    setCurrentNominal,
    currentQuantity,
    setCurrentQuantity,
    setShowFormDonasi,
    setTotalNominal,
  } = UseTransaction();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  const onChangeValue = (event) => {
    const { name, value } = event;

    if (name == 'nominal_donasi') {
      event.value = formatRupiah(value.toString());
      setValue(name, formatRupiah(value.toString()));
      setCurrentNominal(formatRupiah(value.toString()));
    } else {
      event.value = onlyNumber(value);
      setValue(name, value);
      setCurrentQuantity(value);
    }
  };

  const submitForm = (credentials) => {
    let total =
      parseInt(credentials.nominal_donasi.toString().replaceAll('.', '')) *
      parseInt(credentials.quantity);

    setTotalNominal(total.toString());
    setShowFormDonasi(true);
  };

  useEffect(() => {
    setValue('nominal_donasi', currentNominal);
    setValue('quantity', currentQuantity);

    setTotalNominal(
      currentQuantity * currentNominal.toString().replaceAll('.', '')
    );
  }, [campaigns, currentNominal, currentQuantity, setValue, setTotalNominal]);

  return (
    <Fieldset
      as='form'
      id='formDonasi'
      onSubmit={handleSubmit(submitForm)}
      className='flex flex-col space-y-3'
    >
      {nominalField && (
        <InputTextComponent
          type='text'
          placeholder='Nominal'
          errors={errors.nominal_donasi && errors.nominal_donasi.message}
          helperText={errors.nominal_donasi && errors.nominal_donasi.message}
          onChange={(e) => onChangeValue(e.target)}
          register={{
            ...register('nominal_donasi', {
              required: {
                value: true,
                message: 'This nominal is required',
              },
            }),
          }}
        />
      )}
      {quantityField && (
        <InputTextComponent
          type='text'
          placeholder='Quantity'
          errors={errors.quantity && errors.quantity.message}
          helperText={errors.quantity && errors.quantity.message}
          onChange={(e) => onChangeValue(e.target)}
          register={{
            ...register('quantity', {
              required: { value: true, message: 'This quantity is required' },
            }),
          }}
        />
      )}
    </Fieldset>
  );
};
