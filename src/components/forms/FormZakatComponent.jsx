import { ButtonComponent } from '@/components/partials/ButtonComponent';
import { InputTextComponent } from '@/components/partials/InputComponent';
import { UseKalkulator } from '@/hooks/useKalkulator';
import { formatRupiah, onlyNumber } from '@/utils/formatNumber';
import { Fieldset, Legend } from '@headlessui/react';
import { useForm } from 'react-hook-form';

export const FormZakatMaalComponent = () => {
  const {
    nishabPertahun,
    setShowResult,
    setWajibZakat,
    setCalculateResult,
    setModalTitle,
  } = UseKalkulator();

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  const onChangeValue = (event) => {
    const { name, value } = event;
    event.value = formatRupiah(onlyNumber(value));
    setValue(name, formatRupiah(onlyNumber(value)));
  };

  const submitForm = (data) => {
    const totalPenghasilan =
      parseInt(data.tabungan.replaceAll('.', '')) +
      parseInt(data.property.replaceAll('.', '')) +
      parseInt(data.perhiasan.replaceAll('.', ''));

    totalPenghasilan >= nishabPertahun
      ? setWajibZakat(true)
      : setWajibZakat(false);

    setShowResult(true);
    setModalTitle('Zakat Maal');
    setCalculateResult(Math.ceil(totalPenghasilan * parseFloat(0.025)));
  };

  return (
    <Fieldset
      as='form'
      onSubmit={handleSubmit(submitForm)}
      className='flex flex-col space-y-4'
    >
      <Legend className='text-sm font-semibold'>Zakat Maal</Legend>
      <InputTextComponent
        label={'Nilai Deposito/Giro/Tabungan'}
        placeholder={'Nilai Deposito/Giro/Tabungan'}
        errors={errors.tabungan && errors.tabungan.message}
        helperText={errors.tabungan && errors.tabungan.message}
        onChange={(e) => onChangeValue(e.target)}
        register={{
          ...register('tabungan', {
            required: 'This tabungan is required',
          }),
        }}
      />
      <InputTextComponent
        label={'Nilai Property dan Kendaraan'}
        placeholder={'Nilai Property dan Kendaraan'}
        errors={errors.property ? true : false}
        helperText={errors.property && errors.property.message}
        onChange={(e) => onChangeValue(e.target)}
        register={{
          ...register('property', {
            required: 'This property is required',
          }),
        }}
      />
      <InputTextComponent
        label={'Nilai Perhiasan (emas, perak, permata, dll)'}
        placeholder={'Nilai Perhiasan (emas, perak, permata, dll)'}
        errors={errors.perhiasan ? true : false}
        helperText={errors.perhiasan && errors.perhiasan.message}
        onChange={(e) => onChangeValue(e.target)}
        register={{
          ...register('perhiasan', {
            required: 'This perhiasan is required',
          }),
        }}
      />
      <ButtonComponent type='submit' text='Hitung Zakat' fullWidth={true} />
    </Fieldset>
  );
};

export const FormZakatProfesiComponent = () => {
  const {
    nishabPerbulan,
    setShowResult,
    setWajibZakat,
    setCalculateResult,
    setModalTitle,
  } = UseKalkulator();

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  const onChangeValue = (event) => {
    const { name, value } = event;
    event.value = formatRupiah(onlyNumber(value));
    setValue(name, formatRupiah(onlyNumber(value)));
  };

  const submitForm = (data) => {
    const totalPenghasilan =
      parseInt(data.penghasilan.replaceAll('.', '')) +
      parseInt(data.penghasilanlain.replaceAll('.', ''));

    totalPenghasilan >= nishabPerbulan
      ? setWajibZakat(true)
      : setWajibZakat(false);

    setShowResult(true);
    setModalTitle('Zakat Profesi');
    setCalculateResult(Math.ceil(totalPenghasilan * parseFloat(0.025)));
  };

  return (
    <Fieldset
      as='form'
      onSubmit={handleSubmit(submitForm)}
      className='flex flex-col space-y-4'
    >
      <Legend className='text-sm font-semibold'>Zakat Profesi</Legend>
      <InputTextComponent
        label={'Penghasilan (Perbulan)'}
        placeholder={'Nominal Penghasilan (Perbulan)'}
        errors={errors.penghasilan && errors.penghasilan.message}
        helperText={errors.penghasilan && errors.penghasilan.message}
        onChange={(e) => onChangeValue(e.target)}
        register={{
          ...register('penghasilan', {
            required: 'This penghasilan is required',
          }),
        }}
      />
      <InputTextComponent
        label={'Penghasilan Lain-lain (Perbulan)'}
        placeholder={'Nominal Penghasilan Lain-lain (Perbulan)'}
        errors={errors.penghasilanlain ? true : false}
        helperText={errors.penghasilanlain && errors.penghasilanlain.message}
        onChange={(e) => onChangeValue(e.target)}
        register={{
          ...register('penghasilanlain', {
            required: 'This penghasilan lain is required',
          }),
        }}
      />
      <ButtonComponent type='submit' text='Hitung Zakat' fullWidth={true} />
    </Fieldset>
  );
};

export const FormZakatPerdaganganComponent = () => {
  const {
    nishabPertahun,
    setShowResult,
    setWajibZakat,
    setCalculateResult,
    setModalTitle,
  } = UseKalkulator();

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  const onChangeValue = (event) => {
    const { name, value } = event;
    event.value = formatRupiah(onlyNumber(value));
    setValue(name, formatRupiah(onlyNumber(value)));
  };

  const submitForm = (data) => {
    const totalPenghasilan =
      parseInt(data.modal.replaceAll('.', '')) +
      parseInt(data.keuntungan.replaceAll('.', ''));

    totalPenghasilan >= nishabPertahun
      ? setWajibZakat(true)
      : setWajibZakat(false);

    setShowResult(true);
    setModalTitle('Zakat Perdagangan');
    setCalculateResult(Math.ceil(totalPenghasilan * parseFloat(0.025)));
  };

  return (
    <Fieldset
      as='form'
      onSubmit={handleSubmit(submitForm)}
      className='flex flex-col space-y-4'
    >
      <Legend className='text-sm font-semibold'>Zakat Perdagangan</Legend>
      <InputTextComponent
        label={'Jumlah Perputaran Modal (Pertahun)'}
        placeholder={'Jumlah Perputaran Modal'}
        errors={errors.modal && errors.modal.message}
        helperText={errors.modal && errors.modal.message}
        onChange={(e) => onChangeValue(e.target)}
        register={{
          ...register('modal', {
            required: 'This Jumlah Modal is required',
          }),
        }}
      />
      <InputTextComponent
        label={'Jumlah Keuntungan (Pertahun)'}
        placeholder={'Jumlah Keuntungan'}
        errors={errors.keuntungan ? true : false}
        helperText={errors.keuntungan && errors.keuntungan.message}
        onChange={(e) => onChangeValue(e.target)}
        register={{
          ...register('keuntungan', {
            required: 'This Jumlah Keuntungan is required',
          }),
        }}
      />
      <ButtonComponent type='submit' text='Hitung Zakat' fullWidth={true} />
    </Fieldset>
  );
};

export const FormZakatEmasComponent = () => {
  const {
    emasPerGram,
    setShowResult,
    setWajibZakat,
    setCalculateResult,
    setModalTitle,
  } = UseKalkulator();

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  const onChangeValue = (event) => {
    const { name, value } = event;
    event.value = formatRupiah(onlyNumber(value));
    setValue(name, formatRupiah(onlyNumber(value)));
  };

  const submitForm = (data) => {
    const jumlahEmas = parseInt(data.jumlahemas.replaceAll('.', ''));

    jumlahEmas >= 85 ? setWajibZakat(true) : setWajibZakat(false);

    setShowResult(true);
    setModalTitle('Zakat Emas');
    setCalculateResult(Math.ceil(jumlahEmas * emasPerGram * parseFloat(0.025)));
  };

  return (
    <Fieldset
      as='form'
      onSubmit={handleSubmit(submitForm)}
      className='flex flex-col space-y-4'
    >
      <Legend className='text-sm font-semibold'>Zakat Emas</Legend>
      <InputTextComponent
        label='Jumlah Emas/gram'
        placeholder='Gram'
        errors={errors.jumlahemas && errors.jumlahemas.message}
        helperText={errors.jumlahemas && errors.jumlahemas.message}
        onChange={(e) => onChangeValue(e.target)}
        register={{
          ...register('jumlahemas', {
            required: 'This jumlah emas is required',
          }),
        }}
      />
      <ButtonComponent type='submit' text='Hitung Zakat' fullWidth={true} />
    </Fieldset>
  );
};
