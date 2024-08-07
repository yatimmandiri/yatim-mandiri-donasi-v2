export const onlyNumber = (value) => {
  return value.replace(/\D+/g, '');
};

export const formatPhone = (value) => {
  const numericalChar = new Set([
    '+',
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
  ]);

  let str = value
    .split('')
    .filter((char) => numericalChar.has(char))
    .join('');

  str = str.substring(0, 2) == '08' ? '628' + str.substring(2) : str;

  return str;
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
