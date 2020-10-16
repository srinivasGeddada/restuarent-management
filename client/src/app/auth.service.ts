import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from "@angular/common/http";
import { Observable } from "rxjs";
@Injectable()
export class AuthService implements HttpInterceptor {
  constructor() {}
  intercept(req: HttpRequest<any>,next: HttpHandler): Observable<HttpEvent<any>> {
    var token = localStorage.getItem("token");
    if (token) {
      var cloned = req.clone({
        headers: req.headers.set("Authorization", token)
      });
      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}
