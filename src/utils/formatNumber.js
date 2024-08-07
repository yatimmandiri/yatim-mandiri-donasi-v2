export const onlyNumber = (value) => {
  return value.replace(/\D+/g, '');
};

export const formatPhone = (value) => {
  const phoneNumber = onlyNumber(value);

  return phoneNumber.substring(0, 2) == '08'
    ? '628' + phoneNumber.substring(2)
    : phoneNumber;
};

export const formatRupiah = (angka, prefix) => {
  var number_string = angka.replace(/[^,\d]/g, '').toString();
  var split = number_string.split(',');
  var sisa = split[0].length % 3;
  var rupiah = split[0].substr(0, sisa);
  var ribuan = split[0].substr(sisa).match(/\d{3}/gi);

  if (ribuan) {
    var separator = sisa ? '.' : '';
    rupiah += separator + ribuan.join('.');
  }

  rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
  return prefix == undefined ? rupiah : rupiah ? 'Rp. ' + rupiah : '';
};
