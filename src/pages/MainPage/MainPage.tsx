import {useState} from 'react';

// @ts-ignore
import {AddArticle, InfiniteNewsFetch} from "@/features";
import {Modal, OpenModalButton} from "@/shared";

const MainPage = () => {
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <section className="main-page-wrapper">
            <OpenModalButton openModal={handleOpenModal} />
            <h1>Автомобильные новости</h1>
            <Modal show={showModal} onClose={handleCloseModal}>
                <AddArticle closeModal={handleCloseModal} />
            </Modal>
            <InfiniteNewsFetch/>
        </section>
    );
};

export default MainPage;
