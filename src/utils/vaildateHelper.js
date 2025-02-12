exports.validateInput = (data, requiredFields) => {
    const errors = [];
  
    requiredFields.forEach(field => {
      if (!data[field]) {
        errors.push(`${field} is required.`);
      } else if (typeof data[field] !== 'string' && typeof data[field] !== 'number') {
        errors.push(`${field} must be a string or number.`);
      }
    });
  
    return errors;
  };