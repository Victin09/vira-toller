export const generateInitials = (nameString: string) => {
  const fullName = nameString.split(' ');
  const initials = fullName.shift().charAt(0) + fullName.pop().charAt(0);
  return initials.toUpperCase();
};
