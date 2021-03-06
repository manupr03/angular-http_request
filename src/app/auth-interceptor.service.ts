import { HttpInterceptor,HttpRequest,HttpHandler, HttpEventType } from '@angular/common/http'
import { tap } from 'rxjs/operators'

export class AuthInterceptorService implements HttpInterceptor{
    intercept(req:HttpRequest<any>,next:HttpHandler){
        // if(req.body) conditions 
        console.log("Request is on the way")
        console.log(req.url)
        const modifiedRequest = req.clone({
            headers: req.headers.append('Auth','xyz')
        })
        return next.handle(modifiedRequest).pipe(tap(event=>{
            console.log(event)
            if(event.type === HttpEventType.Response){
                console.log('Response arrived, body data:')
                console.log(event.body)
            }
        }))
    }
}