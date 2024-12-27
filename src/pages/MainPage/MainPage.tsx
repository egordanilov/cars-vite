import React, {useState} from 'react';

import Modal from "../../shared/Modal/Modal";
import {OpenModal} from "../../features/InfiniteNewsFetch/OpenModal/OpenModal";
import InfiniteNewsFetch from "../../features/InfiniteNewsFetch/InfiniteNewsFetch";
import {AddArticle} from "../../features/AddArticle/AddArticle";

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
            <OpenModal openModal={handleOpenModal} />
            <h1>Автомобильные новости</h1>
            <Modal show={showModal} onClose={handleCloseModal}>
                <AddArticle closeModal={handleCloseModal} />
            </Modal>
            <InfiniteNewsFetch/>
        </section>
    );
};

export default MainPage;
