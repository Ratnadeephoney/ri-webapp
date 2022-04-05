import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'avatarfilter'
})
export class AvatarFilter implements PipeTransform {
  transform(value: any): string {
  let avatar : any;
  if(!!value && value != 'Name:Not Available'){
    if (value.length != 0) {
        for (let i = 0; i < value.length; i++) {
            let textArray = value.split(' ');
            let letter;
            if (textArray.length > 1) {
              letter = textArray[0].substr(0, 1) + '' + (textArray.length > 1 ? textArray[1].substr(0, 1) : '');
            }
            else {
              letter = textArray[0].substr(0, 2);
            }
            letter = letter.toUpperCase();
            avatar = letter;
        }
    }
    return avatar;
  }
  else{
    return 'RI';
  }
  }
}