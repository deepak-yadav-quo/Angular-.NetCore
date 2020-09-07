import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { environment } from './../../environments/environment';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';

import { User } from './user.model';
import { Router } from '@angular/router';

export interface AuthResponsePayload {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
    user = new BehaviorSubject<User>(null);
    expirationTimer: any;

    constructor(private http: HttpClient,
                private router: Router){}

    signup(email: string, password: string) {
        return this.http.post<AuthResponsePayload>(
            // Post request URL
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseApiKey,
            //Request Body
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        )
        .pipe(
            catchError(this.handleError),
            tap(responseData => {
                this.handleAuthentication(
                    responseData.email,
                    responseData.idToken,
                    responseData.idToken,
                    +responseData.expiresIn
                )
            })
        );
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponsePayload>(
            // Request URL
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseApiKey,
            // Request Body
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        )
        .pipe(
            catchError(this.handleError),
            tap(responseData => {
                this.handleAuthentication(
                    responseData.email,
                    responseData.idToken,
                    responseData.idToken,
                    +responseData.expiresIn
                )
            })
        );
    }

    private handleError(errorResponse: HttpErrorResponse) {
        let errorMessage = 'An unknown error occurred';

        if(!errorResponse.error || !errorResponse.error.error) {
            return throwError(errorMessage);
        }

        switch(errorResponse.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = "This email already exists!";
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = "This email does not exist!";
                break;
            case 'INVALID_PASSWORD':
                errorMessage = "This password is incorrect!";
                break;
        }

        return throwError(errorMessage);
    }

    private handleAuthentication(
        email: string,
        id: string,
        token: string,
        expiresIn: number
    ) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(email, id, token, expirationDate);
        this.user.next(user);
        this.autoLogout(expiresIn * 1000);
        localStorage.setItem('userData', JSON.stringify(user));
        this.router.navigate(['/books']);
    }  
    
    logout() {
        this.user.next(null);
        localStorage.removeItem('userData');
        this.router.navigate(['/auth']);

        if(this.expirationTimer) {
            clearTimeout(this.expirationTimer);
        }

        this.expirationTimer = null;
    }

    autoLogin() {
        const userData: {
            email: string,
            id: string,
            _token: string,
            _tokenExpirationDate: string
        } = JSON.parse(localStorage.getItem('userData'));

        if(!userData) {
            return;
        }

        const loadedUser = new User(
            userData.email,
            userData.id,
            userData._token,
            new Date(userData._tokenExpirationDate)
        )

        if(loadedUser.token) {
            this.user.next(loadedUser);
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration);
        }
    }

    autoLogout(expirationDuration: number) {
        this.expirationTimer = setTimeout(()=> {
            this.logout()
        }, expirationDuration);
    }

}