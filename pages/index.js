//Layout
import MainLayout from "../layouts/MainLayout/";
import CreateUserModal from "@/components/modals/CreateUserModal";
import CreatePostModal from "@/components/modals/CreatePostModal";
//components
//hooks
import { useProfile } from "@/hooks/useProfile";
import { useProgramState } from "@/hooks/useProgram";
import { useState } from "react";

const image =
  "https://scontent-qro1-2.xx.fbcdn.net/v/t39.30808-6/339736635_1417065962458765_7019775077283824177_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=0debeb&_nc_eui2=AeH7RL2bHtgS4KFh-IDWo18KhmHk2uTfvpeGYeTa5N--l1ar8-HuYbh0T11yPgwXg2KQiiQQivzJ7g_Ewv0djQu_&_nc_ohc=E47koFW36aMAX-mglJ0&_nc_ht=scontent-qro1-2.xx&oh=00_AfCiKfnUo1Ra90pSkqIVSJl02y9EQfOrgkgVgp9xk9hAqw&oe=643F0E85";

export default function Home() {
  //La imagen vendra del SmartContract
  const { userAddress } = useProfile();
  //const { posts } = useProgramState();
  //console.log(posts);

  const staticCreateUser = () => {
    console.log(`Creating User!!`);
  };

  const staticCreatePost = () => {
    console.log(`Creating Post!!`);
  };
  //To define
  const wallet = "111111111111111111";

  return (
    <>
      <MainLayout></MainLayout>
    </>
  );
}
