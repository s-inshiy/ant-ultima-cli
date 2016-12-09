import {
  Pipe,
  PipeTransform
} from '@angular/core';

@Pipe({
  name: 'truncate'
})

export class TruncatePipe implements PipeTransform {
  transform(value: string, args: any): any {
    if (args) {
      let limit = parseInt(args, 10),
        trail = '...';
      return value.length > limit ? value.substring(0, limit) + trail : value;
    } else {
      console.log('doesnt have args!');
    }
    // let limit = args.length > 0 ? parseInt(args[0], 10) : 10;
    // console.log(args + '----------' + value.length + '-----' + limit);
    // let trail = args.length > 1 ? args[1] : ' ...';
  }
}
