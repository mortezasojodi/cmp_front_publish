import { right, left, Either, CusomerError } from "@/shared/core/either";
import { BaseResponse } from "@/shared/core/response/api_response";
import { AppConfig, AppConfigHeader } from "@/shared/app_config";
import { Netwrok } from "@/shared/network/api_constants";
import { String_Const } from "@/shared/constants/string_constants";
import { OtherCompanyLocationCommand } from "@/domain/command/other_company_location_command";
import { CompanyEntity } from "@/domain/entity/company_entity";
import { LocationCompanyEntity } from "@/domain/entity/location_company_entity";

export async function getOtherCompanyLocation(
  oprId: number
): Promise<Either<Error, LocationCompanyEntity[]>> {
  try {
    var header = await AppConfigHeader.header();
    const response = await fetch(
      `${Netwrok.apiUrl}/RegisterCompanyLocation/OperationalAddress/${oprId}`,
      {
        method: "GET",
        headers: header
      }
    );
    const data = await response.json();
    const result: BaseResponse<LocationCompanyEntity[]> = data;
    if (result.Success) {
      return right(result.Data);
    } else {
      return left(new CusomerError(result.Message));
    }
  } catch (error) {
    return left(new Error(String_Const.Error));
  }
}
