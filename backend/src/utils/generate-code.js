const generateCode = (string) => {
  const board = string.split(' ');
  let code = board[0].substring(0, 1).toUpperCase();

  if (board.length > 1) {
    code += board[board.length - 1].substring(0, 1).toUpperCase();
  }
  return code;
};

module.exports = generateCode;
