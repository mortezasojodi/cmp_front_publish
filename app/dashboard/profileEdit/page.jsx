import Title from "@/components/forms/title/title"
import ProfileEditForm from "@/components/forms/profileEditForm/profileEditForm";

export default function  ProfileEditPage() {
  return (
   <>
      <Title title={"Edit client information"} icon={"/editProfile.svg"}></Title>
      <ProfileEditForm/>
   </>
  );
};
