import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Response } from 'express';

@Catch() // Catch all exceptions
export class GeneralExceptionFilter
  extends BaseExceptionFilter
  implements ExceptionFilter
{
  catch(exception: unknown, host: ArgumentsHost) {
    console.error('Unhandled exception:', exception);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status = HttpStatus.INTERNAL_SERVER_ERROR; // Default to 500
    const responseMessage =
      exception instanceof Error ? exception.message : 'Internal server error';

    response.status(status).json({
      statusCode: status,
      message: responseMessage,
    });
  }
}
