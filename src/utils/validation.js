function loginValidation(email, password) {
    const errors = [];
  
    // Verifica se o email foi informado
    if (!email) {
      errors.push({ message: 'Email is required' });
    }
  
    // Verifica se a senha foi informada
    if (!password) {
      errors.push({ message: 'Password is required' });
    }
  
    // Retorna o objeto com o resultado da validação
    return {
      errors,
      isValid: errors.length === 0
    };
  }
  
  // Exporta a função loginValidation para que possa ser usada em outros arquivos
  module.exports = {
    loginValidation
  };