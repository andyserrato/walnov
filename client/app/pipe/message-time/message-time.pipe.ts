import { Pipe, ChangeDetectorRef, PipeTransform } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AsyncPipe} from '@angular/common';

@Pipe({
    name: 'messageTime',
    pure: false
})
export class MessageTimePipe extends AsyncPipe
{
    value:Date;
    timer:Observable<string>;

    constructor(ref:ChangeDetectorRef)
    {
        super(ref);
    }

    transform(obj:any, args?:any[]):any
    {
        if (obj instanceof Date)
        {
            this.value = obj;

            if(!this.timer)
            {
                this.timer = this.getObservable();
            }

            return super.transform(this.timer);
        }

        return super.transform(obj);
    }

    private getObservable()
    {
        return Observable.interval(1000).startWith(0).map(()=>
        {
            var result:string;
            // current time
            let now = new Date().getTime();

            // time since message was sent in seconds
            let delta = (now - this.value.getTime()) / 1000;

            // format string
            if (delta < 10)
            {
                result = 'Ahora mismo';
            }
            else if (delta < 60)
            { // sent in last minute
                result = 'hace ' + Math.floor(delta) + ' segundos';
            }
            else if (delta < 3600)
            { // sent in last hour
                result = 'hace ' + Math.floor(delta / 60) + ' minutos';
            }
            else if (delta < 86400)
            { // sent on last day
                result = 'hace ' + Math.floor(delta / 3600) + ' horas';
            }
            else
            { // sent more than one day ago
                result = 'hace ' + Math.floor(delta / 86400) + ' días';
            }
            return result;
        });
    };
}
