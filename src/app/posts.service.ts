import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {Post} from "./post.model";
import {map,catchError} from "rxjs/operators"
import { Subject,throwError } from "rxjs";

@Injectable({providedIn: 'root'})
export class PostService {
    error = new Subject<string>()
    constructor(private http : HttpClient) {}
    createAndStorePost(title : string, content : string) {
        const postData: Post = {
            title: title,
            content: content
        }
        this.http.post<{name:string}>('https://ng-complete-guide-e0be1-default-rtdb.firebaseio.com/posts.json', postData).subscribe(responseData => {
            console.log(responseData);
        },error => {
            this.error.next(error.message)
        });

    }
    fetchPosts() {
        return this.http
        .get<{[key:string]:Post}>('https://ng-complete-guide-e0be1-default-rtdb.firebaseio.com/posts.json',
        {
            headers: new HttpHeaders({'Custom-Header':'Hello'})
        })
        
        .pipe(map(responseData => {
            const postArray: Post[] = []
            for (const key in responseData) {
                if (responseData.hasOwnProperty(key)) {
                    postArray.push({
                        ...responseData[key],
                        id: key
                    })
                }
            }
            return postArray

        }),catchError(errRes => {
            // send to analytics
            return throwError(errRes)
        }))


    }

deletePosts(){
    return this.http.delete('https://ng-complete-guide-e0be1-default-rtdb.firebaseio.com/posts.json')
}
}
