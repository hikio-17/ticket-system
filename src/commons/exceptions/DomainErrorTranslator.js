const InvariantError = require('./InvariantError');

const DomainErrorTranslator = {
  translate(error) {
    return DomainErrorTranslator._directories[error.message] || error;
  },
};

DomainErrorTranslator._directories = {
  'REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('tidak dapat membuat user baru karena properti yang dibutuhkan tidak ada'),
  'REGISTER_USER.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('tidak dapat membuat user baru karena tipe data tidak sesuai'),
  'REGISTER_USER.USERNAME_LIMIT_CHAR': new InvariantError('tidak dapat membuat user baru karena karakter username melebihi batas limit'),
  'REGISTER_USER.USERNAME_CONTAIN_RESTRICTED_CHARACTER': new InvariantError('tidak dapat membuat user baru karena username mengandung karakter terlarang'),
  EMAIL_NOT_VALID: new InvariantError('Email yang anda masukkan tidak valid'),
  'LOGIN_USER.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('harus mengirimkan username dan password'),
  'LOGIN_USER.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('tidak dapat login karena tipe data tidak sesuai]'),
  'REFRESH_AUTHENTICATION_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN': new InvariantError('harus mengirimkan token refresh'),
  'REFRESH_AUTHENTICATION_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('refresh token harus string'),
  'DELETE_AUTHENTICATION_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN': new InvariantError('harus mengirimkan token refresh'),
  'DELETE_AUTHENTICATION_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('refresh token harus string'),
  'NEW_THREAD.NOT_COUNTAIN_NEDEED_PROPERTY': new InvariantError('tidak dapat membuat thread baru karena properti yang dibutuhkan tidak ada'),
  'NEW_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('tidak dapat membuat thread baru karena tipe data tidak seusai'),
  'NEW_THREAD.TITLE_LIMIT_CHAR': new InvariantError('tidak dapat membuat thread baru karena karakter title melebihi batas limit'),
  'NEW_COMMENT.NOT_MEET_DATA_TYPE_SPESIFICATION': new InvariantError('comment harus berupa string'),
  'ADD_LIKE_COMMENT_USE_CASE.NOT_MEET_DATA_TYPE_SPESIFICATION': new InvariantError('add like comment harus berupa string'),
  'REPLIES.NOT_MEET_DATA_TYPE_SPESIFICATION': new InvariantError('reply harus berupa string'),
  'ADD_TICKET_USE_CASE.CREDENTIAL_ID_NOT_MEET_DATA_TYPE_SPESIFICATION': new InvariantError('id user harus berupa string'),
  'NEW_TICKET.NOT_COUNTAIN_NEEDED_PROPERTY': new InvariantError('tidak dapat membuat ticket baru karena properti yang dibutuhkan tidak ada'),
  'NEW_TICKET.PAYLOAD_NOT_MEET_DATA_TYPE_SPESIFICATION': new InvariantError('tidak dapat membuat tiket baru karena tipe data tidak sesuai'),
  'UPDATE_STATUS_TICKET.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('tidak dapat memperbarui status tiket karena properti yang dibutuhkan tidak ada'),
  'UPDATE_STATUS_TICKET.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('tidak dapat memperbarui status tiket karena tipe data ditak sesuai'),
  'UPDATE_STATUS_TICKET.PAYLOAD_NOT_MEET_DATA_OPTIONS': new InvariantError('tidak dapat memperbarui status tiket karena value tidak sesuai dengan options'),
};
module.exports = DomainErrorTranslator;
