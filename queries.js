const Getall = (data) => {
  return `SELECT * FROM ${data}`;
};

const GetId = (data) => {
  return `SELECT * FROM ${data} WHERE id =$1`;
};
module.exports = {
  Getall,
  GetId,
};
