import { HttpInterceptorFn } from '@angular/common/http';

export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('loggingInterceptor req.url: ', req.url);
  return next(req);
};
