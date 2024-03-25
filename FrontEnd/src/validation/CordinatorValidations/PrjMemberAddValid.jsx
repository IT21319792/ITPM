
export const validateFirstName = (firstName) => {
  return firstName.trim() ? null : 'First name is required';
};

export const validateLastName = (lastName) => {
  return lastName.trim() ? null : 'Last name is required';
};

export const validateEmail = (email) => {
  const emailRegex = /^\S+@\S+\.\S+$/;
  return emailRegex.test(email) ? null : 'Invalid email format';
};

export const validateContactNo = (contactNo) => {
  const contactNoRegex = /^\d{10}$/;
  return contactNoRegex.test(contactNo) ? null : 'Invalid contact number format (10 digits required)';
};
