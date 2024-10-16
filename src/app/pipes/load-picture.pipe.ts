import { Pipe, PipeTransform } from '@angular/core';

export const IMAGES_ROOT = 'assets/images/';

export const layoutPaths = {
  images: {
    root: IMAGES_ROOT
  }
};

@Pipe({
  name: 'loadPicture'
})
export class LoadPicturePipe implements PipeTransform {

  transform(value: any, ext: string = 'png'): any {
    return layoutPaths.images.root + value + '.' + ext;
  }

}
