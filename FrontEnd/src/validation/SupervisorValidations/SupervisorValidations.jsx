export const validateForm = (reportType, selectedGroup, Mark1, Mark2, Mark3, Mark4) => {
  const errors = {};

  // Validate reportType
  if (!reportType.trim()) {
    errors.reportType = 'Report type is required';
  }

  // Validate selectedGroup
  if (!selectedGroup.trim()) {
    errors.selectedGroup = 'Group is required';
  }

  // Validate Marks
  const marks = [Mark1, Mark2, Mark3, Mark4];
  marks.forEach((mark, index) => {
    const markNumber = Number(mark);
    if (isNaN(markNumber) || markNumber < 0 || markNumber > 100) {
      errors[`Mark${index + 1}`] = `Mark ${index + 1} must be a number between 0 and 100`;
    }
  });

  return errors;
};
