import {Injectable} from '@angular/core';
import {Observable, Observer} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ServiceService {

    constructor() {}

    getData(): Observable<{ html, questions }> {
        return new Observable((observer: Observer<any>) => {
            const data = {
                html: `<div>
                <span>Ivan Ivanov</span>
                <div>Country:<span>UA</span></div>
                <div>Postcode:<b>65000</b></div>
               </div>`,
                questions: [
                    {
                        id: 1,
                        text: 'Where is fullname?'
                    },
                    {
                        id: 2,
                        text: `Where is the country?`
                    },
                    {
                        id: 3,
                        text: `Where is the postcode?`
                    }
                ]
            };

            observer.next(data);
            observer.complete();
        });
    }

    sendDataOnServer(aasd: {questionId: number, selectedText: string}): void {
        console.log('finish : ', aasd);
    }
}
