// import { NotFoundException } from '@nestjs/common';
import { isDevelopment } from 'src/config/config';

/**
 * Gunakan untuk mempermudah response balik
 */
export function useResponse(
  succes: boolean,
  message: string,
  data?: any,
  // exception: any = NotFoundException,
) {
  // if (!succes) {
  //   throw new exception(
  //     {
  //       succes: succes,
  //       message: message,
  //     },
  //     message,
  //   );
  // }

  if (data) {
    return {
      succes: succes,
      message: message,
      data: data,
    };
  }

  if (!data) {
    return {
      succes: succes,
      message: message,
    };
  }
}

/**
 * write in console with style
 * @param data any data
 * @param title title for note
 * @param end_note end note
 * @param theLog default console.log
 */
export function useLog(
  data: any,
  title = '#',
  end_note = '***',
  theLog = console.log,
) {
  if (isDevelopment()) {
    console.log(
      `===================================* ${title} *===================================`,
    );

    theLog(data);

    if (end_note) {
      console.log(
        `===================================# ${end_note} #===================================`,
      );
    }
  }
}

export function pagination(limit: number, page: number) {
  return limit * (page === 1 ? 0 : page - 1);
}
