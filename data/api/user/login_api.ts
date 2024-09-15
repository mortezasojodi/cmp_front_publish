import { right, left, Either, CusomerError } from '@/shared/core/either';
import { BaseResponse } from '@/shared/core/response/api_response';
import { AppConfig } from '@/shared/app_config';
import { saveToken } from '@/shared/service/auth/save_token';
import { LoginCommand } from '@/domain/command/login_command';
import { Netwrok } from '@/shared/network/api_constants';
import { String_Const } from '@/shared/constants/string_constants';

export async function loginApi(command: LoginCommand): Promise<Either<Error, boolean>> {

  try {
    const response = await fetch(`${Netwrok.apiUrl}/User/Login`, {
      method: 'POST',
      headers: {
        'accept': '*/*',
        'Content-Type': 'application/json-patch+json'
      },
      body: JSON.stringify(command)
    });
    const data = await response.json();
    if (data.token || data.Success) {
      saveToken(data.token);
      AppConfig.token = data.token;
      return right(data.registered);
    } else {
      return left(new CusomerError(data.Message));
    }
  } catch (error) {
    return left(new Error(String_Const.Error));
  }
}
