import { right, left, Either } from '@/shared/core/either';
import { SignUpCommand } from '@/domain/command/signUp_command';
import { AppConfig } from '@/shared/app_config';
import { saveToken } from '@/shared/service/auth/save_token';
import { Netwrok } from '@/shared/network/api_constants';

export async function signUp(command: SignUpCommand): Promise<Either<Error, boolean>> {

  try {
    const response = await fetch(`${Netwrok.apiUrl}/RegisterCompany`, {
      method: 'POST',
      headers: {
        'accept': '*/*',
        'Content-Type': 'application/json-patch+json'
      },
      body: JSON.stringify(command)
    });
    const data = await response.json();
    // const parsed: BaseResponse<object> = data;
    saveToken(data.token);
    AppConfig.token = data.token;
    return right(true);
  } catch (error) {
    return left(new Error("Error parsing JSON:"));
  }
}
