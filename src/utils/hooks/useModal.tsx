import {
  setOpenCreateModal,
  setOpenDeleteModal,
  setOpenDetailImageModal,
  setOpenEditModal,
} from "@store/features/modal.slice";
import { useAppSelector } from "@store/store";
import { useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";

export const useModal = () => {
  const dispatch = useDispatch();
  const { openedCreateModal, openedEditModal, openedDeleteModal, openedDetailImageModal, } =
    useAppSelector((state) => state.modal);

  const openModalCreate = useCallback(
    () => dispatch(setOpenCreateModal(true)),
    [dispatch]
  );
  const closeModalCreate = useCallback(
    () => dispatch(setOpenCreateModal(false)),
    [dispatch]
  );
  const openModalEdit = useCallback(
    () => dispatch(setOpenEditModal(true)),
    [dispatch]
  );
  const closeModalEdit = useCallback(
    () => dispatch(setOpenEditModal(false)),
    [dispatch]
  );
  const openModalDelete = useCallback(
    () => dispatch(setOpenDeleteModal(true)),
    [dispatch]
  );
  const closeModalDelete = useCallback(
    () => dispatch(setOpenDeleteModal(false)),
    [dispatch]
  );
  const openModalDetailImage = useCallback(
    () => dispatch(setOpenDetailImageModal(true)),
    [dispatch]
  );
  const closeModalDetailImage = useCallback(
    () => dispatch(setOpenDetailImageModal(false)),
    [dispatch]
  );

  return useMemo(
    () => ({
      openedDetailImage: openedDetailImageModal,
      openedCreate: openedCreateModal,
      openedEdit: openedEditModal,
      openedDelete: openedDeleteModal,
      openModalCreate,
      closeModalCreate,
      openModalEdit,
      closeModalEdit,
      openModalDelete,
      closeModalDelete,
      openModalDetailImage,
      closeModalDetailImage,
    }),
    [
      openedDetailImageModal,
      openedCreateModal,
      openedEditModal,
      openedDeleteModal,
      openModalCreate,
      closeModalCreate,
      openModalEdit,
      closeModalEdit,
      openModalDelete,
      closeModalDelete,
      openModalDetailImage,
      closeModalDetailImage,
    ]
  );
};
