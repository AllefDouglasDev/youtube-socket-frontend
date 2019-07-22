import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TokenInterceptor implements HttpInterceptor 
{
    intercept( req: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> 
    {
        const reqUrl: Array<any> = req.url.split("/");
        const apiUrlStr = "http://localhost:8081/api";
        const apiUrlNum = "http://127.0.0.1:8081/api";
        const apiUrlS: Array<any> = apiUrlStr.split("/");
        const apiUrlN: Array<any> = apiUrlNum.split("/");
        const token = localStorage.getItem("token");
        
        if (token && (reqUrl[2] === apiUrlS[2] || reqUrl[2] === apiUrlN[2])) {
            const newReq = req.clone({ setHeaders: {'Authorization': `Bearer ${ token }`}});
            return next.handle(newReq);
        } else {
            return next.handle(req);
        }
    }
}