// Classe de erro personalizada
class CustomError extends Error {
    constructor(statusCode, message) {
      super(message);
      this.statusCode = statusCode;
      this.message = message;
    }
  }
  
  // Função que cria um objeto de erro personalizado com status 400
  function badRequest(message) {
    return new CustomError(400, message);
  }
  
  // Função que cria um objeto de erro personalizado com status 401
  function unauthorized(message) {
    return new CustomError(401, message);
  }
  
  // Função que cria um objeto de erro personalizado com status 403
  function forbidden(message) {
    return new CustomError(403, message);
  }
  
  // Função que cria um objeto de erro personalizado com status 404
  function notFound(message) {
    return new CustomError(404, message);
  }
  
  // Função que cria um objeto de erro personalizado com status 409
  function conflict(message) {
    return new CustomError(409, message);
  }
  
  // Função que cria um objeto de erro personalizado com status 500
  function internalServerError(message) {
    return new CustomError(500, message);
  }
  
  // Exporta as funções para serem usadas em outros arquivos
  module.exports = {
    CustomError,
    badRequest,
    unauthorized,
    forbidden,
    notFound,
    conflict,
    internalServerError
  };