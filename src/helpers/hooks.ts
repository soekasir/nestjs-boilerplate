import { isDevelopment } from 'src/config/config';

/**
 * Gunakan untuk mempermudah response balik
 */
export const useResponse = (succes: boolean, message: string, data?: any) => {
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
};

/**
 * write in console with style
 * @param data any data
 * @param title title for note
 * @param end_note end note
 * @param theLog default console.log
 */
export const useLog = (
  data: any,
  title = '#',
  end_note = '***',
  theLog = console.log,
) => {
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
};
