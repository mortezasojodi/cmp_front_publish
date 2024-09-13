"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import toast from "react-hot-toast";
import { RotatingLines } from "react-loader-spinner";
import { AppConfig, AppConfigHeader } from "../../shared/app_config";
import { statusApi } from "../../data/api/status/status_api";
import { APP_ROUTES } from "../../shared/route/app_route";

const SplashPage = () => {
  useEffect(() => {
    init();
  }, []);

  const { push } = useRouter();

  async function init() {
    if (await AppConfigHeader.hastoken()) {
      checkStatus();
    } else {
      push(APP_ROUTES.Login, undefined);
    }
  }

  async function checkStatus() {
    var result = await statusApi();
    result.fold(
      (s) => {
        console.log("");
      },
      (data) => {
        appNavigator(data);
      }
    );
  }

  function appNavigator(status) {

    switch (status) {
      case "NotRegistered":
        push(`${APP_ROUTES.SignUp}?step=${1}`, undefined);
        toast.error("You are not registred");
        break;
      case "ProfessionalInformation":

        push(`${APP_ROUTES.SignUp}?step=${2}`, undefined);
        toast.error("Please Complete your registration!");
        break;
      case "DocumentSubmission":
        push(`${APP_ROUTES.SignUp}?step=${3}`, undefined);
        toast.error("Please Complete your registration!");
        break;
      case "BillingDetails":
        push(`${APP_ROUTES.SignUp}?step=${4}`, undefined);
        toast.error("Please Complete your registration!");
        break;
      case "NotActivate":
        push(`${APP_ROUTES.Activation}`, undefined);
        toast.error("Check your email for the activation link!");
        break;
      case "Registered":
        push(`${APP_ROUTES.Dashboard}`, undefined);
        break;

      default:
        break;
    }
  }

  return <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh' // Full viewport height to center vertically
  }}>
    <RotatingLines
      visible={true}
      width="100"
      strokeWidth="5"
      animationDuration="0.75"
      ariaLabel="rotating-lines-loading"
    />
  </div>;
};

export default SplashPage;
