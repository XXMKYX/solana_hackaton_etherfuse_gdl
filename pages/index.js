//Layout
import MainLayout from "../layouts/MainLayout/";
import CreateUserModal from "@/components/modals/CreateUserModal";
import CreatePostModal from "@/components/modals/CreatePostModal";
//components
//hooks
import { useProfile } from "@/hooks/useProfile";
import { useProgramState } from "@/hooks/useProgram";
import { useState } from "react";
import styles from "./index.module.scss";

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
      <MainLayout>
        <div className={styles.principal_wrapper}>
          <a>Consideraciones para probar el MVP</a>
          <p>- Recargar la página al hacer registros </p>
          <p>- Las peticiones para fondear o retirar tardan un poco </p>
          <p>
            - Si las peticiones de fondeo / pago en carrito y retiro tardan mas
            de 2 min es debido a que el backend entró en hibernación y toma ese
            tiempo en reactivarse, esto por la versión gratii del host
          </p>
          <p>
            - La TDC en fondeo es dummy, usen 4242 4242 4242 42 ... Hasta que se
            canse el dedo
          </p>

          <a>Por si gustan ver el token en: </a>
          <p>
            https://translator.shyft.to/address/HJXP1SjT3w1NzmAjq7z5hUMicf4qYPcdiZvFmpECpv92?cluster=devnet
          </p>

          <a>Repo al Backend donde se implemento SHIFT: </a>
          <p>
            https://github.com/elJamesSnz/push_notifications_webapis
          </p>
        </div>
      </MainLayout>
    </>
  );
}
