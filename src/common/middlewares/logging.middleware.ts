import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(`req: `, {
      headers: req.headers,
      body: req.body,
      params: req.params,
      query: req.query,
      originalURL: req.originalUrl,
    });
    next();
  }
}
