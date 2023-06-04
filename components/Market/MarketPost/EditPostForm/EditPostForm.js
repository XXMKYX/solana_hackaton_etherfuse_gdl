import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useProgramState } from "@/hooks/useProgram";
import styles from "./EditPostFrom.module.scss";

export default function EditPostModal({
  currentEditListing,
  editPostModalOpen,
  setEditPostModalOpen,
  currentEditPostID,
  data,
  titleOwner,
  imageOwner,
  descriptionOwner,
  priceOwner,
  priceOfferOwner
}) {
  //To get staticGetPost updatePost,
  const [available, setAvailable] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [priceOffer, setPriceOffer] = useState("");
  const [yes, setYes] = useState(["0", "1"]);
  //SOLANA STUFF
  const { updatePost, wallet } = useProgramState();
  const { account } = data;
  console.log("ID to send", currentEditPostID);
  const closeModal = () => {
    setEditPostModalOpen(false);
  };
  
  const staticUpdatePost = (
    wallet = "1111111111",
    currentEditPostID,
    available
  ) => {
    console.log(
      `Editing post... userKey: ${wallet} with Id: ${currentEditPostID} and new available of ${available} `
    );
  };

  const onEdit = (e) => {
    e.preventDefault();

    // editListing({
    //     airbnbPda: currentEditListing?.publicKey,
    //     airbnbIdx: currentEditListing?.account.idx,
    //     location,
    //     country,
    //     price,
    //     imageURL,
    // })

    if (title.toString().length == 0) setTitle(titleOwner);
    alert(title.toString().length);
    updatePost(
      wallet?.publicKey,
      currentEditPostID,
      available,
      title,
      image,
      description,
      price,
      priceOffer
    );
    closeModal();
  };

  return (
    <Transition appear show={editPostModalOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className={styles.editPost_wrapper1}>
          <div className={styles.editPost_transition}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className={styles.editPost_panel}>
                <Dialog.Title as="h3" className={styles.editPost_title}>
                  Edit Post
                </Dialog.Title>

                <div className={styles.editPost_wrapper}>
                <div className={styles.editPost_wrapper_form}>
                  <div className={styles.editPost_form}>
                    <label htmlFor="location">
                      <span>Disponibilidad</span>

                      <select
                        type="text"
                        onChange={(e) => setAvailable(e.target.value)}
                      >
                        <option>Selecciona una opcion</option>
                        <option value={yes[1].toString()}>Disponible</option>
                        <option value={yes[0].toString()}>No Disponible</option>
                      </select>
                    </label>

                    <label htmlFor="location">
                      <span>Nombre</span>
                      <input
                        //placeholder={currentEditListing?.account.location}
                        onChange={(e) => setTitle(e.target.value)}
                        type="text"
                        id="location"
                        name="location"
                        placeholder={titleOwner}
                      />
                    </label>

                    <label htmlFor="location">
                      <span>Imagen</span>
                      <input
                        //placeholder={currentEditListing?.account.location}
                        onChange={(e) => setImage(e.target.value)}
                        type="text"
                        id="location"
                        name="location"
                        placeholder={imageOwner}
                      />
                    </label>
                    </div>
                    <div className={styles.editPost_form2}>

                    <label htmlFor="location">
                      <span>Descripción</span>
                      <input
                        //placeholder={currentEditListing?.account.location}
                        onChange={(e) => setDescription(e.target.value)}
                        type="text"
                        id="location"
                        name="location"
                        placeholder={descriptionOwner}
                      />
                    </label>

                    <label htmlFor="location">
                      <span>Precio</span>
                      <input
                        //placeholder={currentEditListing?.account.location}
                        onChange={(e) => setPrice(e.target.value)}
                        type="text"
                        id="location"
                        name="location"
                        placeholder={priceOwner}
                      />
                    </label>

                    <label htmlFor="location">
                      <span>Precio descuento</span>
                      <input
                        //placeholder={currentEditListing?.account.location}
                        onChange={(e) => setPriceOffer(e.target.value)}
                        type="text"
                        id="location"
                        name="location"
                        placeholder={priceOfferOwner}
                      />
                    </label>
                   </div>
                   </div>
                  
                  <div className={styles.editPost_button}>
                    <button onClick={onEdit} type="button">
                      Confirmar
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
