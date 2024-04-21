/* eslint-disable react/prop-types */
import { socket } from "../utils/socket";
import { Modal } from "antd";
import { useEffect, useState } from "react";
import { useAtomValue } from "jotai";
import { userAtom } from "../context/atoms/userAtom";
import { BadgeModal } from "./BadgeModal";

export const CustomModal = ({
  modal,
  setModal,
  setCrearScreen,
  activityId,
  setActivityScreen,
}) => {
  const [activity, setActivity] = useState({});
  const [kindQuestion, setKindQuestion] = useState([]);
  const [open] = useState(modal);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const getUser = useAtomValue(userAtom);
  const [modalText, setModalText] = useState(
    getUser.isProfessor
      ? "Al confirmar, podrás editar los detalles necesarios para mantener la información de la actividad actualizada."
      : "Al confirmar, podrás realizar la actividad propuesta por el profesor para evaluar tus conocimientos."
  );

  useEffect(() => {
    socket.emit("getActivity", { id: activityId });
  }, [modal, activityId]);

  useEffect(() => {
    socket.on("getActivity", (obj) => {
      console.log("ACTIVITY Nidak", obj);
      setActivity(obj.activity);
    });
  }, []);

  useEffect(() => {
    setKindQuestion(
      activity.questions?.map((question) => question.kindOfQuestion)
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activity]);

  useEffect(() => {
    console.log("KIND QUESTION", kindQuestion);
  }, [kindQuestion]);

  const handleOk = () => {
    setModalText(
      "Cargando la información de la actividad... Por favor, espera..."
    );
    setConfirmLoading(true);
    setTimeout(() => {
      setModal(false);
      setConfirmLoading(false);
      socket.emit("move");

      if (getUser.isProfessor) {
        setCrearScreen(true);
        console.log("activityId", activityId);
        socket.emit("getActivity", { id: activityId });
      } else {
        console.log("Realizando actividad...");
        setActivityScreen(true);
        socket.emit("NoMove");
        socket.emit("startActivity", { id: activityId, activity: activity });
      }
    }, 2000);
  };

  const handleCancel = () => {
    setModal(false);
    socket.emit("move");
  };

  const kindQuestionCount = (kindQuestion ?? []).reduce((acc, kind) => {
    acc[kind] = (acc[kind] || 0) + 1;
    return acc;
  }, {});

  return (
    <>
      <Modal
        title={
          getUser.isProfessor
            ? "¿Quieres modificar la actividad?"
            : "¿Quieres realizar la actividad?"
        }
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        cancelText="Cancelar"
        okText={"Confirmar"}
        okButtonProps={{ className: "bg-blue-500" }}
        centered={true}
      >
        <p>{modalText}</p>

        <p className=" text-md font-semibold mt-2">
          {`Actividad con ${activity.questions?.length} pregunta${
            activity.questions?.length === 1 ? "" : "s"
          } dónde hay:`}{" "}
        </p>
        <div className="py-1 w-fit mt-2 font-semibold flex justify-center items-center">
          {kindQuestion &&
            Object.entries(kindQuestionCount).map(([kind, count]) => {
              if (kind === "Test") {
                return (
                  <BadgeModal
                    key={kind}
                    count={count}
                    kind={`${kind}${count === 1 ? "" : "s"}`}
                    style="bg-green-500 text-green-700"
                  />
                );
              }
              if (kind === "Redacción") {
                const kindText = count === 1? "Redacción" : "Redacciones"
                return (
                  <BadgeModal
                    key={kind}
                    count={count}
                    kind={kindText}
                    style="bg-yellow-400 text-yellow-600"
                  />
                );
              }
              return null;
            })}
        </div>
      </Modal>
    </>
  );
};
