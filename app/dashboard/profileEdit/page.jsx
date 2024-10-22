import Title from "@/components/forms/title/title"
import ProfileEditForm from "@/components/forms/profileEditForm/profileEditForm";
// import styles from './shoppingCard.module.css';

export default function ProfileEditPage() {
  return (
    <div className="pagecontent">
      <Title title={"Edit client information"} icon={"/editProfile.svg"}></Title>
      <ProfileEditForm />
    </div>
  );
};
