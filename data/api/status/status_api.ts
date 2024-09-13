import { right, left, Either } from '../../../shared/core/either';
import { BaseResponse } from '../../../shared/core/response/api_response';
import { AppConfig, AppConfigHeader } from '../../../shared/app_config';
import { Netwrok } from '../../../shared/network/api_constants';
import { String_Const } from '../../../shared/constants/string_constants';

export async function statusApi(): Promise<Either<Error, string>> {
  try {
    var header = await AppConfigHeader.header();
    const response = await fetch(`${Netwrok.apiUrl}/RegisterStatus`, {
      method: 'GET',
      headers: header,
    });
    const data = await response.json();
    const parsed: BaseResponse<string> = data;
    return right(parsed.Data);
  } catch (error) {
    return left(new Error(String_Const.Error));
  }
}
